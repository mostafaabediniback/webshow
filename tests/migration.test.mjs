import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { authRedirect } from "../lib/auth-policy.js";
import {
  buildAuthState,
  getDefaultDashboardRoute,
  normalizeRole,
} from "../utils/auth.js";
import {
  getAllPaginatedItems,
  normalizePaginatedResponse,
} from "../utils/pagination.js";
import { pageMetadata, serializeJsonLd } from "../lib/seo.js";
import { decodeRouteParam } from "../lib/route-params.js";

test("the original three role guards preserve the routing matrix", () => {
  const anonymous = buildAuthState({ token: null, role: "" });
  for (const mode of ["authenticated", "user", "platform", "channel"])
    assert.equal(authRedirect(anonymous, mode), "/login");
  assert.equal(authRedirect(anonymous, "public"), null);
  for (const [role, route] of [
    ["user", "/user-dashboard"],
    ["admin", "/dashboard/user-videos"],
    ["super_admin", "/dashboard/channels"],
  ]) {
    const auth = buildAuthState({ token: "test-token", role });
    assert.equal(authRedirect(auth, "public"), route);
    assert.equal(authRedirect(auth, "authenticated"), null);
    assert.equal(getDefaultDashboardRoute(role), route);
    assert.equal(
      authRedirect(auth, "user"),
      role === "user"
        ? null
        : role === "admin"
          ? "/dashboard/user-videos"
          : "/dashboard",
    );
    assert.equal(
      authRedirect(auth, "platform"),
      role === "user"
        ? "/user-dashboard"
        : role === "admin"
          ? "/dashboard/user-videos"
          : null,
    );
    assert.equal(
      authRedirect(auth, "channel"),
      role === "user"
        ? "/user-dashboard"
        : role === "admin"
          ? null
          : "/dashboard",
    );
  }
  assert.equal(normalizeRole([{ name: "ADMIN" }]), "admin");
});
test("Laravel pagination preserves metadata and deduplicates selector results", async () => {
  const page = normalizePaginatedResponse({
    data: {
      data: [{ id: 1 }],
      meta: { current_page: 2, last_page: 4, total: 76 },
    },
  });
  assert.equal(page.totalPages, 4);
  assert.equal(page.meta.current_page, 2);
  assert.equal(page.totalItems, 76);
  const pages = [];
  const all = await getAllPaginatedItems(async (number) => {
    pages.push(number);
    return {
      items: number === 1 ? [{ id: 1 }] : [{ id: 1 }, { id: 2 }],
      totalPages: 2,
    };
  });
  assert.deepEqual(pages, [1, 2]);
  assert.deepEqual(
    all.map((item) => item.id),
    [1, 2],
  );
});
test("SEO canonicals exclude incidental query parameters and JSON-LD is script-safe", () => {
  const metadata = pageMetadata("عنوان ویدیو", "توضیحات", "/v/12");
  assert.equal(new URL(metadata.alternates.canonical).pathname, "/v/12");
  assert.equal(metadata.robots.index, true);
  assert.equal(
    pageMetadata("ورود", "ورود", "/login", { noindex: true }).robots.index,
    false,
  );
  assert.ok(
    !serializeJsonLd({ name: "</script><script>alert(1)</script>" }).includes(
      "<",
    ),
  );
});
test("page URL parameters preserve Persian text and literal percent sequences", () => {
  for (const query of ["مقاومت", "کد%20", "50% تخفیف", "a/b?x=1"])
    assert.equal(decodeRouteParam(encodeURIComponent(query)), query);
  assert.equal(decodeRouteParam("50%"), "50%");
});
test("every active original route has an independent App Router page", () => {
  const root = path.resolve(import.meta.dirname, "..");
  const routes = JSON.parse(
    fs.readFileSync(path.join(root, "reports/routes.json")),
  );
  assert.equal(routes.length, 19);
  for (const [route, page] of routes)
    assert.ok(fs.existsSync(path.join(root, page)), `${route}: ${page}`);
  const scan = (dir) =>
    fs
      .readdirSync(dir, { withFileTypes: true })
      .flatMap((entry) =>
        entry.isDirectory()
          ? scan(path.join(dir, entry.name))
          : [path.join(dir, entry.name)],
      );
  for (const dir of [
    "app",
    "components",
    "features",
    "hooks",
    "services",
    "lib",
  ])
    for (const file of scan(path.join(root, dir))) {
      if (!/\.(jsx?|mjs)$/.test(file)) continue;
      const source = fs.readFileSync(file, "utf8");
      assert.ok(!source.includes("react-router-dom"), file);
      assert.ok(!source.includes("import.meta.env"), file);
      assert.ok(!/from\s+['"][^'"]*\.\.\/src\//.test(source), file);
    }
});

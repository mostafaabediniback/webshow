# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## PWA deployment

Run `npm run build` and deploy the entire generated `dist/` directory to the HTTPS site root. The PWA uses `/` for its start URL, scope, and identity. The build validates the configured icon files' PNG signatures and declared dimensions.

Include `index.html`, `manifest.webmanifest`, `sw.js`, the generated registration/Workbox files, `assets/`, and `icons/`. Uploading only the JavaScript and CSS bundles leaves installation metadata or icons unavailable. Let Vite PWA generate the manifest link and service-worker registration; no hand-written manifest file is needed.

Verify these deployed URLs return the actual files with HTTP 200, without authentication or an HTML fallback:

- `/manifest.webmanifest`: `application/manifest+json` (or `application/json`).
- `/sw.js` and generated registration/Workbox JavaScript: a JavaScript content type.
- `/icons/app-icon-192-v2.png`: `image/png`, 192 by 192 pixels.
- `/icons/app-icon-512-v2.png`: `image/png`, 512 by 512 pixels.
- `/icons/apple-touch-icon-v2.png`: `image/png`, 192 by 192 pixels.

Serve `index.html`, `manifest.webmanifest`, and `sw.js` with cache revalidation, such as `Cache-Control: no-cache`. Refresh any CDN cache for these files during deployment. Versioned icons and hashed assets may use a long cache lifetime; change the icon filename when its content changes. Keep older icon URLs available for existing installations.

The current versioned icons are byte-for-byte copies of the existing validated artwork. They use manifest purpose `any`; this artwork is not declared maskable because its lettering extends outside the maskable safe area. The dedicated Apple touch icon uses the same 192-pixel artwork and matching size metadata.

Browsers or the operating system may retain the icon of an existing shortcut. After confirming that the new deployed manifest and icons load correctly, a previously broken home-screen shortcut may need to be removed and added again. Chrome/Edge can show a native install prompt when installation is available; on iPhone/iPad, use the browser's Share menu and **Add to Home Screen**.

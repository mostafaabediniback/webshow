import { create } from "zustand";
import { safeSessionStorage } from "../utils/safeStorage";

const useAuthStore = create((set) => ({
  token: safeSessionStorage.get("token") || null,
  roles: [],
  user: { id: null, firstname: "", lastname: "" ,nationalCode:""},

  update: (token, roles, user) => {
    set({ token, roles, user });
    safeSessionStorage.set("token", token);
  },
  clear: () => {
    set({
      token: null,
      roles: [],
      user: { id: null, firstname: "", lastname: "",nationalCode:"" },
    });
    safeSessionStorage.remove("token");
  },
}));

export default useAuthStore;

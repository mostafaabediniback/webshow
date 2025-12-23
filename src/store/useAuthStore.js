import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: sessionStorage.getItem("token") || null,
  roles: [],
  user: { id: null, firstname: "", lastname: "" ,nationalCode:""},

  update: (token, roles, user) => {
    set({ token, roles, user });
    sessionStorage.setItem("token", token);
  },
  clear: () => {
    set({
      token: null,
      roles: [],
      user: { id: null, firstname: "", lastname: "",nationalCode:"" },
    });
    sessionStorage.removeItem("token");
  },
}));

export default useAuthStore;

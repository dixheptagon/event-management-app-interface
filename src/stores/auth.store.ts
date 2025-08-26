import { create } from "zustand";
import { persist } from "zustand/middleware";

type TUseAuthStore = {
  token: string;
  fullname: string;
  role: string;

  setAuth: ({
    token,
    fullname,
    role,
  }: Omit<TUseAuthStore, "setAuth" | "clearAuth">) => void;
  clearAuth: () => void;
};

const useAuthStore = create<TUseAuthStore>()(
  persist(
    (set) => ({
      token: "",
      fullname: "",
      role: "",

      setAuth: ({
        token,
        fullname,
        role,
      }: Omit<TUseAuthStore, "setAuth" | "clearAuth">) =>
        set({
          token,
          fullname,
          role,
        }),
      clearAuth: () => set({ token: "", fullname: "", role: "" }),
    }),
    {
      name: "authentication",
      partialize: (state: TUseAuthStore) => ({
        token: state.token,
        fullname: state.fullname,
        role: state.role,
      }),
    },
  ),
);

export default useAuthStore;

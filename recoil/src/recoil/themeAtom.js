import { atom } from "recoil";

export const themeAtom = atom({
  key: "themeAtom",
  default: localStorage.getItem("app-theme") || "light", // light or dark
});

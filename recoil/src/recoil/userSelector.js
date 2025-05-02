import { selector } from "recoil";
import { userState } from "./userAtom";

export const isAdultSelector = selector({
  key: "isAdultSelector",
  get: ({ get }) => {
    const user = get(userState);
    return user.age >= 20;
  },
});

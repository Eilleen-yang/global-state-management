import { selector } from "recoil";

export const userListSelector = selector({
  key: "userListSelector",
  get: async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) throw new Error("response not ok");
      const data = await response.json();

      return {
        status: "success",
        data,
      };
    } catch (err) {
      return {
        status: "error",
        error: err.message,
      };
    }
  },
});

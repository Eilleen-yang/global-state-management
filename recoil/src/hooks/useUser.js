import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from "../recoil/userAtom";
import { isAdultSelector } from "../recoil/userSelector";

export function useUser() {
  const [user, setUser] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const isAdult = useRecoilValue(isAdultSelector);

  const updateUser = (field, value) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return { user, updateUser, resetUser, isAdult };
}

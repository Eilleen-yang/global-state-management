import { useRecoilValue } from "recoil";
import { userState } from "../recoil/userAtom";
import { useUser } from "../hooks/useUser";

export default function UserInfo() {
  // const user = useRecoilValue(userState);
  const { user, isAdult } = useUser();
  return (
    <div>
      <h3>사용자 정보</h3>
      <p>이름 : {user.name}</p>
      <p>나이 : {user.age}</p>
      <p>{isAdult ? "성인입니다." : "미성년자 입니다."}</p>
    </div>
  );
}

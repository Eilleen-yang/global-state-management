import { useRecoilState, useResetRecoilState } from "recoil";
import { userState } from "../recoil/userAtom";
import { useUser } from "../hooks/useUser";

export default function UserForm() {
  // const [user, setUser] = useRecoilState(userState);
  // const resetUser = useResetRecoilState(userState);
  const { user, updateUser, resetUser } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setUser((prev) => ({
    //   ...prev,
    //   [name]: name === "age" ? Number(value) : value,
    // }));
    updateUser(name, name === "age" ? Number(value) : value);
  };
  return (
    <div>
      <h3>사용자 입력 폼</h3>
      <input
        type="text"
        name="name"
        placeholder="이름 입력"
        value={user.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        placeholder="나이 입력"
        value={user.age}
        onChange={handleChange}
      />
      <button onClick={resetUser}>초기화</button>
    </div>
  );
}

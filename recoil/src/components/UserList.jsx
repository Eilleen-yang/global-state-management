import { useUserList } from "../hooks/useUserList";

export default function UserList() {
  const { isLoading, isError, data, error } = useUserList();

  if (isLoading) return <div>...로딩중 ...로..딩..중..</div>;
  if (isError) return <div>..에러발생 !! {error}</div>;
  return (
    <div>
      <h3>사용자 목록</h3>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age})
          </li>
        ))}
      </ul>
    </div>
  );
}

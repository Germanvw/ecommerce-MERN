import { useSelector } from "react-redux";
import { LogoutButton } from "../../Items/Buttons/LogoutButton";
import { RootState } from "../../redux/reducer/rootReducer";

export const User = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return <div>Loading...</div>;
  return (
    <>
      <LogoutButton />
      <h1>{user.username}</h1>
    </>
  );
};

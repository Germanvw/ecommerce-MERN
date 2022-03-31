import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/rootReducer";

export const User = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return <div>Loading...</div>;
  return (
    <>
      <h1>{user.username}</h1>
    </>
  );
};

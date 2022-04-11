import { useDispatch } from "react-redux";
import { confirmChangeStatusUser } from "../../hooks/useConfirmModal";

import { uiOpenModalUser, uiSetError } from "../../redux/actions/uiActions";
import { setUserActive } from "../../redux/actions/userActions";
import { headerTableBrands } from "./imports";

import "./index.scss";

export const UsersTable = ({ users }: any) => {
  const dispatch = useDispatch();

  const handleLogicDelete = (user: any) => {
    if (user.isAdmin) {
      dispatch(uiSetError("Cant disable admin account"));
    } else {
      confirmChangeStatusUser(user._id, dispatch);
    }
  };

  const handleDisplay = (user: any) => {
    dispatch(setUserActive(user));
    dispatch(uiOpenModalUser());
  };
  return (
    <table className="table custom-table">
      <thead>
        <tr>
          {headerTableBrands.map((item: string) => {
            if (item === "Id") {
              return (
                <th
                  key={item}
                  scope="col"
                  className="d-md-table-cell d-none  text-center"
                >
                  {item}
                </th>
              );
            } else {
              return (
                <th key={item} scope="col" className="text-center">
                  {item}
                </th>
              );
            }
          })}
        </tr>
      </thead>
      <tbody>
        {users &&
          users.length > 0 &&
          users.map((user: any) => (
            <tr key={user._id}>
              <td className="d-md-table-cell d-none text-center align-middle">
                {user._id}
              </td>
              <td className="text-center">
                <img src={user.picture} alt={user.picture} />
              </td>
              <td
                className={`align-middle text-center ${
                  !user.active && "cancelled"
                }`}
              >
                {user.username}
              </td>
              <td className="align-middle text-center">
                <button className="more" onClick={() => handleDisplay(user)}>
                  More Info
                </button>
              </td>
              <td className="align-middle  text-center">
                <button
                  className="delete"
                  onClick={() => handleLogicDelete(user)}
                >
                  {user.active ? "Desactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

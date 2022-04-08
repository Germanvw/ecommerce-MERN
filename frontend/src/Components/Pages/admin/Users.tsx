import { Sidebar } from "../../Items/Nav/Sidebar";

export const Users = () => {
  return (
    <div className="users-body">
      <div className="row m-0 w-100">
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>
        <div className="col-md-10 p-0">Users</div>
      </div>
    </div>
  );
};

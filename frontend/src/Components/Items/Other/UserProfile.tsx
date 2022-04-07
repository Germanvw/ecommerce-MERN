export const UserProfile = ({
  user,
  handleModalUser,
  handleModalPassword,
}: any) => {
  const { username, email, picture, gender, isAdmin } = user;
  return (
    <div className="user-info mt-5">
      <div className="row m-0 p-0 d-flex p-0">
        <img src={picture} alt={picture} />
        <div className="change-info my-2 mt-5 m-0 d-flex p-0">
          <button className="change-details" onClick={handleModalUser}>
            Details
          </button>
          <button onClick={handleModalPassword}>Password</button>
        </div>
        <h3 className="my-3">User Details:</h3>
        <div className="row m-0 ">
          <div className="d-flex justify-content-between p-0">
            <h4 className="m-0">Username: </h4>
            <span>{username}</span>
          </div>
        </div>
        <div className="row m-0">
          <div className="d-flex justify-content-between p-0">
            <h4 className="m-0">Email: </h4>
            <span>{email}</span>
          </div>
        </div>
        <div className="row m-0">
          <div className="d-flex justify-content-between p-0">
            <h4 className="m-0">Gender: </h4>
            <span>{gender}</span>
          </div>
        </div>
        <div className="row m-0">
          <div className="d-flex justify-content-between p-0">
            <h4 className="m-0">Type: </h4>
            <span>{!isAdmin ? "Customer" : "Admin"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

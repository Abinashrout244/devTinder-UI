import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(removeUser());
    console.log("logout sucessfully.");
  };
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <button className=" bg-base-300 text-xl font-semibold">
          👤DevTinder
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <div className="dropdown dropdown-end ">
          {user ? (
            <div
              tabIndex={0}
              className="btn btn-circle btn-ghost avatar "
              role="button"
            >
              <img
                alt="Tailwind CSS Navbar component"
                src={
                  user?.photoURL ||
                  "https://img.freepik.com/premium-vector/man-character_665280-46970.jpg"
                }
                className="w-24 rounded-full"
              />
            </div>
          ) : (
            <div className="btn btn-circle btn-ghost avatar ">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://tse4.mm.bing.net/th/id/OIP.dDKYQqVBsG1tIt2uJzEJHwHaHa?pid=Api&P=0&h=180"
                className="w-24 rounded-full"
              />
            </div>
          )}
          <ul
            className="dropdown-content menu z-1 rounded-box w-52 p-2  bg-neutral-300 text-black  mt-4 "
            tabIndex="-1"
          >
            <li className="hover:bg-black/20 rounded-md font-semibold">
              <a>Settings</a>
            </li>
            <li className="hover:bg-black/20 rounded-md font-semibold">
              <a>Profile</a>
            </li>
            <li
              onClick={handleLogout}
              className="hover:bg-black/20 rounded-md font-semibold"
            >
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

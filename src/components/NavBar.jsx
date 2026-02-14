import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import toast from "react-hot-toast";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeUser());
      toast.success("Logout sucessfully.");
      return navigate("/login");
    } catch (err) {
      console.log(err.response);
    }
  };
  const user = useSelector((state) => state.user);
  //console.log(user);

  return (
    <div
      className="navbar my-2 shadow-sm fixed top-0 left-0 right-0 z-20   flex justify-between items-center
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        rounded-2xl
        px-6 py-3
        shadow-lg shadow-purple-500/10 "
    >
      <div className="flex-1">
        {user ? (
          <Link to="/" className=" bg-transparent text-xl font-semibold">
            👤DevTinder
          </Link>
        ) : (
          <a
            className=" bg-transparent text-xl font-semibold cursor-pointer"
            onClick={() => {
              toast.error("Login Required!!");
            }}
          >
            👤DevTinder
          </a>
        )}
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
            className="dropdown-content menu z-1 rounded-box w-52      rounded-xl
    bg-slate-900/95
    backdrop-blur-xl
    border border-white/10
    shadow-xl
    p-3
    space-y-2
    text-white  mt-4 "
            tabIndex="-1"
          >
            <li className="hover:bg-black/20 rounded-md font-semibold">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="hover:bg-black/20 rounded-md font-semibold">
              <Link to="/connections">Connections</Link>
            </li>
            <li className="hover:bg-black/20 rounded-md font-semibold">
              <Link to="/requests">Pending Request</Link>
            </li>
            <li className="hover:bg-black/20 rounded-md font-semibold">
              <Link to="/changepassword">Change Password</Link>
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

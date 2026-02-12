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
    <div className="navbar bg-base-300 shadow-sm ">
      <div className="flex-1">
        <Link to="/" className=" bg-base-300 text-xl font-semibold">
          👤DevTinder
        </Link>
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
              <Link to="/profile">Profile</Link>
            </li>
            <li className="hover:bg-black/20 rounded-md font-semibold">
              <Link to="/connections">Connections</Link>
            </li>
            <li className="hover:bg-black/20 rounded-md font-semibold">
              <Link to="/requests">Pending Request</Link>
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

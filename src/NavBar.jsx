const NavBar = () => {
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <button className=" bg-base-300 text-xl font-semibold">
          👤DevTinder
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <div className="dropdown dropdown-end ">
          <div
            tabIndex={0}
            className="btn btn-circle btn-ghost avatar "
            role="button"
          >
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              className="w-24 rounded-full"
            />
          </div>
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
            <li className="hover:bg-black/20 rounded-md font-semibold">
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useLogged from "../hooks/useLogged";

const Navbar = () => {
  const isLogged = useLogged();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 right-0 z-10 flex flex-row items-center justify-between gap-4 h-16 bg-white px-4 md:px-7 shadow-lg">
  {isLogged === false ? (
    <>
      <NavLink to="/" className="font-medium text-gray-800 hover:text-gray-900">
        Home
      </NavLink>
      <NavLink to="/login" className="font-medium text-gray-800 hover:text-gray-900">
        Login
      </NavLink>
    </>
  ) : null}

  {isLogged &&
  location.pathname !== "/" &&
  location.pathname !== "/login" ? (
    <>
      <NavLink to="/user/profile" className="font-medium text-gray-800 hover:text-gray-900">
        Profile
      </NavLink>
      <NavLink to="/posts" className="font-medium text-gray-800 hover:text-gray-900">
        Posts
      </NavLink>
      <NavLink to="/user/friends" className="font-medium text-gray-800 hover:text-gray-900">
        My Friends
      </NavLink>
    </>
  ) : null}

  <NavLink to="/users" className="font-medium text-gray-800 hover:text-gray-900">
    Explore new friends
  </NavLink>
  {isLogged &&
  location.pathname !== "/" &&
  location.pathname !== "/login" ? (
    <button
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
      }}
      className="text-white bg-red-500 hover:bg-red-600 font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Logout
    </button>
  ) : null}
</div>

  );
};
export default Navbar;

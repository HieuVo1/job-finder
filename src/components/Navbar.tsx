import {
  NavLink,
  NavLinkRenderProps,
  useLocation,
  useNavigate,
} from "react-router-dom";
import logo from "../assets/react.svg";
import TokenService from "../services/TokenService";
import { useEffect, useState } from "react";
import { GetUserById } from "../pages/login/Login.api";
import { initialUser, saveUser, selectUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearHttpClientHeader } from "../services/api";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [IsAuthenticated, setIsAuthenticated] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    const handleFetchAccountDetail = async () => {
      try {
        const res = await GetUserById();
        if (res.isSuccess && res.data) dispatch(saveUser(res.data));
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    if (TokenService.IsAuthenticated() && user === initialUser) {
      handleFetchAccountDetail();
    }

    setIsAuthenticated(TokenService.IsAuthenticated());
  }, [location]);

  const doLogout = () => {
    TokenService.deleteToken();
    clearHttpClientHeader();
    dispatch(saveUser(initialUser));
    return navigate("/");
  };

  const linkClass = (props: NavLinkRenderProps) =>
    props.isActive
      ? "bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";
  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={logo} alt="React Blogs" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                React Jobs Finder
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/jobs" className={linkClass}>
                  Jobs
                </NavLink>
                <NavLink to="/blogs" className={linkClass}>
                  Blogs
                </NavLink>
                {IsAuthenticated ? (
                  <button
                    onClick={() => doLogout()}
                    className="text-white hover:bg-gray-900 hover:text-white hover:cursor-pointer rounded-md px-3 py-2"
                  >
                    Logout{" "}
                  </button>
                ) : (
                  <>
                    <NavLink to="/login" className={linkClass}>
                      Login
                    </NavLink>
                    <NavLink to="/register" className={linkClass}>
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

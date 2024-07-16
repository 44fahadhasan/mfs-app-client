import { Link, NavLink } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const menuItems = (
    <>
      <li>
        <NavLink
          to="send-mony"
          className={({ isActive }) =>
            isActive ? "text-primary" : "text-base-content"
          }
        >
          Send Mony
        </NavLink>
      </li>
      <li>
        <NavLink
          to="cash-out"
          className={({ isActive }) =>
            isActive ? "text-primary" : "text-base-content"
          }
        >
          Cash Out
        </NavLink>
      </li>
      <li>
        <NavLink
          to="cash-in"
          className={({ isActive }) =>
            isActive ? "text-primary" : "text-base-content"
          }
        >
          Cash In
        </NavLink>
      </li>
      <li>
        <NavLink
          to="balance-inquiry"
          className={({ isActive }) =>
            isActive ? "text-primary" : "text-base-content"
          }
        >
          Balance Inquiry
        </NavLink>
      </li>
      <li>
        <NavLink
          to="transactions-history"
          className={({ isActive }) =>
            isActive ? "text-primary" : "text-base-content"
          }
        >
          Transactions History
        </NavLink>
      </li>
    </>
  );

  const { user, handleLogout } = useAuth();
  return (
    <div className="poppins navbar bg-base-100 w-[95%] lg:w-auto mx-auto container">
      <div className="navbar-start font-medium">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-medium text-base"
          >
            {menuItems}
          </ul>
        </div>
        <div className="flex items-center ">
          <Link to="/home">
            <Logo />
          </Link>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal space-x-8 font-medium text-base">
          {menuItems}
        </ul>
      </div>

      {user?.userIsLogin && (
        <div className="navbar-end">
          <button
            onClick={handleLogout}
            className="btn btn-primary rounded-full"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;

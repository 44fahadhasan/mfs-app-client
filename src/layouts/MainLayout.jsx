import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../pages/shared/NavBar";

const MainLayout = () => {
  const { pathname } = useLocation();
  const isShow = pathname === "/login" || pathname === "/register";

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      document.title = "Plax - Home";
      return;
    }
    document.title = `Plax - ${location.pathname
      .replaceAll("/", " - ")
      .replaceAll("-", " ")}`;
  }, [location]);

  return (
    <div>
      {/* navbar */}
      {isShow || <NavBar />}

      {/* main layout */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

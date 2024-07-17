import { Link } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import useAuth from "../../hooks/useAuth";

const HomePage = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="mb-2 text-[26px] md:text-[35px] font-bold leading-[42px] text-center mt-12">
        Welcome To {<Logo />}
      </h1>

      {!user?.userIsLogin && (
        <>
          <p className="text-center">
            Please browse full application after login
          </p>
          <p className="mt-5 text-primary text-center font-medium underline hover:text-white transition-all duration-200">
            <Link to="/login">Login Here</Link>
          </p>
        </>
      )}

      {user?.userIsLogin && (
        <>
          <p className="text-center">
            Please browse full application with navigation
          </p>
        </>
      )}
    </div>
  );
};

export default HomePage;

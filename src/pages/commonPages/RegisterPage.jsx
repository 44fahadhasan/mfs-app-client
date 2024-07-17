import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const RegisterPage = () => {
  const [toggle, setToggle] = useState(true);

  const axiosPublic = useAxiosPublic();

  // react hook from
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleWindowAutoreaload = () => {
    window.location.reload();
  };

  // register from handle
  const onSubmit = (data) => {
    const fullName = data.fullName;
    const email = data.email;
    const mobileNumber = data.mobileNumber;
    const accountType = data.accountType;
    const pin = data.pin;
    const userInfo = { fullName, email, mobileNumber, accountType, pin };
    // create a new user request on database
    axiosPublic
      .post("/register", userInfo)
      .then(({ data }) => {
        console.log(data);
        if (data?.acknowledged && data?.token) {
          navigate("/");
          handleWindowAutoreaload();
          //
          localStorage.setItem("token", data?.token);
          localStorage.setItem("cruntUserIdentifier", email);
          //
          toast.success("Account created successfully", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          //
        } else if (data?.message) {
          toast.success(`${data?.message}`, {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      })
      .catch(({ message }) => {
        toast.error(message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      });

    resetField("fullName");
    resetField("email");
    resetField("mobileNumber");
    resetField("pin");
  };

  // pin view toggle
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <section className="container w-[87%] mx-auto poppins py-[70px]">
      <div className="min-w-screen min-h-screen bg-base-100 flex items-center justify-center px-5 py-5">
        <div className="text-base-content font-medium  w-full overflow-hidden ">
          <div className="w-full mx-auto md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              {/* section content */}
              <div className="">
                <h1 className="mb-2 text-[26px] md:text-[35px] font-bold leading-[42px]">
                  Open up your {<Logo />} <br /> Account now
                </h1>
                <div className="mb-5">
                  <Link to="/login">
                    <p className="text-center text-sm font-light">
                      Already registered?{" "}
                      <span className="underline text-[#FF1949]">Login</span>
                    </p>
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-1 text-base">
                  <label className="text-sm px-1 text-base-content font-medium">
                    Full Name
                  </label>
                  <input
                    {...register("fullName", { required: true })}
                    type="text"
                    name="fullName"
                    placeholder="Your full name"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-[#E9E9E9] text-secondary-content outline-none focus:border-primary bg-base-100"
                  />
                  {errors.fullName && (
                    <span className="text-base-content text-xs">
                      Full Name can&apos;t be empty
                    </span>
                  )}
                </div>
                <div className="space-y-1  text-base">
                  <label className="text-sm px-1 text-base-content font-medium">
                    Email Address
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-[#E9E9E9] text-secondary-content outline-none focus:border-primary bg-base-100"
                  />
                  {errors.email && (
                    <span className="text-base-content text-xs">
                      Email Address can&apos;t be empty
                    </span>
                  )}
                </div>
                <div className="space-y-1  text-base">
                  <label className="text-sm px-1 text-base-content font-medium">
                    Mobile Number
                  </label>
                  <input
                    {...register("mobileNumber", { required: true })}
                    type="tel"
                    name="mobileNumber"
                    placeholder="Your mobile mumber"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-[#E9E9E9] text-secondary-content outline-none focus:border-primary bg-base-100"
                  />
                  {errors.email && (
                    <span className="text-base-content text-xs">
                      Mobile mumber can&apos;t be empty
                    </span>
                  )}
                </div>

                <div className="md:flex gap-5 space-y-4 md:space-y-0">
                  <div className="space-y-1 text-base w-full">
                    <label className="text-sm px-1 text-base-content font-medium">
                      Account Type
                    </label>
                    <select
                      name="accountType"
                      {...register("accountType", {
                        required: true,
                      })}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-[#E9E9E9] text-secondary-content outline-none focus:border-primary bg-base-100"
                    >
                      <option value="normal">Normal</option>
                      <option value="agent">Agent</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1  text-base">
                  <label className="text-sm px-1 text-base-content font-medium">
                    5-digit PIN
                  </label>
                  <div className="relative flex items-center">
                    <input
                      {...register("pin", {
                        required: true,
                        pattern: /^\d{5}$/,
                      })}
                      type={toggle ? "password" : "text"}
                      name="pin"
                      placeholder="******"
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-[#E9E9E9] text-secondary-content outline-none focus:border-primary bg-base-100"
                    />
                    <span
                      className="absolute right-2 cursor-pointer"
                      onClick={handleToggle}
                    >
                      {(!toggle && (
                        <svg
                          className="w-6 h-6 text-[#9CA3AF]"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                          />
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      )) || (
                        <svg
                          className="w-6 h-6 text-[#9CA3AF] "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      )}
                    </span>
                  </div>

                  {errors?.pin?.type === "required" && (
                    <span className="text-base-content text-xs">
                      PIN can&apos;t be empty
                    </span>
                  )}
                  {errors?.pin?.type === "pattern" && (
                    <span className="text-base-content text-xs">
                      PIN must be 5-digit number
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-3 pt-3">
                  <div className="w-full px-3 mb-3">
                    <button className="btn btn-primary btn-block">
                      Register Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;

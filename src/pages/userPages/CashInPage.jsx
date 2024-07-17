import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SectionContent from "../../components/SectionContent/SectionContent";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CashInPage = () => {
  const [toggle, setToggle] = useState(true);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // react hook from
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const moenyRequestFromAgent = (requestMonyData) => {
    axiosSecure
      .post("/request-money", requestMonyData)
      .then(({ data }) => {
        if (data?.acknowledged) {
          toast.success("Money Request successfully", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          //
        } else if (data?.message) {
          toast.error(`${data?.message}`, {
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
  };

  // login  handle
  const onSubmit = (data) => {
    const identifier = data.numberOrEmail;
    const requestAmount = data.requestAmount;
    const pin = data.pin;

    const requestMonyData = {
      identifier,
      requestAmount,
      pin,
      email: user?.email,
    };

    moenyRequestFromAgent(requestMonyData);

    resetField("numberOrEmail");
    resetField("requestAmount");
    resetField("pin");
  };

  // pin view toggle
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="min-w-screen min-h-screen bg-base-100 flex items-center justify-center px-5 py-5">
      <div className="text-base-content font-medium  w-full overflow-hidden ">
        <div className="w-full mx-auto md:w-1/2 py-10 px-5 md:px-10">
          <div className="text-center mb-10">
            {/* section content */}
            <SectionContent title={"Cash In"} topContent={"without fee"} />
          </div>

          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-1  text-base">
                <label className="text-sm px-1 text-base-content font-medium">
                  Agent Mobile Number/Email
                </label>
                <input
                  {...register("numberOrEmail", { required: true })}
                  type="text"
                  placeholder="Enter number or email"
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-[#E9E9E9] text-secondary-content outline-none focus:border-primary bg-base-100"
                />
                {errors.numberOrEmail && (
                  <span className="text-base-content text-xs">
                    Mobile number or email can&apos;t be empty
                  </span>
                )}
              </div>

              <div className="space-y-1  text-base">
                <label className="text-sm px-1 text-base-content font-medium">
                  Request Amount
                </label>
                <input
                  {...register("requestAmount", { required: true })}
                  type="number"
                  placeholder="Enter given amount"
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-[#E9E9E9] text-secondary-content outline-none focus:border-primary bg-base-100"
                />
                {errors.requestAmount && (
                  <span className="text-base-content text-xs">
                    Request amount can&apos;t be empty
                  </span>
                )}
              </div>

              <div className="space-y-1  text-base">
                <label className="text-sm px-1 text-base-content font-medium">
                  Your PIN
                </label>
                <div className="relative flex items-center">
                  <input
                    {...register("pin", { required: true })}
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
                {errors.pin && (
                  <span className="text-base-content text-xs">
                    PIN can&apos;t be empty
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3 pt-3">
                <div className="w-full px-3 mb-3">
                  <button className="btn btn-primary btn-block">
                    Request Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashInPage;

import useAuth from "../../hooks/useAuth";

const BlanceInquiryPage = () => {
  const { user } = useAuth();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card glass w-52">
        <div className="card-body">
          <h2 className="card-title">Current Balance</h2>
          <div className="card-actions justify-center mt-4">
            <span className="btn font-bold text-xl btn-primary">
              {user?.balance}.00Tk
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlanceInquiryPage;

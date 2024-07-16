const LoadingSpiinner = () => {
  return (
    <div className="min-h-60 flex flex-col  border shadow-sm rounded-xl">
      <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
        <div className="flex justify-center">
          <span className="loading loading-ring loading-lg text-primary"></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpiinner;

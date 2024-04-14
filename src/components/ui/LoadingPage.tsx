import Loader from "../common/Loader";

const LoadingPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full h-full">
      <img src="/assets/images/logo.svg" alt="logo" height={50} />
      <div className="flex gap-2 items-center mt-5 flex-col">
        <Loader />
        <p> Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;

import CustomButton from "@/components/custom/reuseable/CustomButton";

const Home = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-semibold">Index page</h1>
      {/* Test div */}
      <div>
        <CustomButton
          isLink={true}
          href="/home"
          classes="bg-red-500 cursor-pointer hover:bg-blue-500"
        >
          Click on the button
        </CustomButton>
      </div>
    </div>
  );
};

export default Home;

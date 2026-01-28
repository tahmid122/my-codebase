import CustomTooltip from "@/components/custom/reuseable/CustomTooltip";

const Home = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-semibold">Index page</h1>
      {/* Test div */}
      <div className="p-5">
        <CustomTooltip text="Custom Tooltip">
          <span>Hover for details</span>
        </CustomTooltip>
      </div>
    </div>
  );
};

export default Home;

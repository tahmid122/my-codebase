"use client";
import { DatePicker } from "@/components/custom/reuseable/DatePicker";
import { useState } from "react";

const Home = () => {
  const [date, setDate] = useState<Date>();
  console.log(date);
  return (
    <div>
      <h1 className="text-center text-3xl font-semibold">Index page</h1>
      {/* Test div */}
      <div>
        <DatePicker date={date} setDate={setDate} />
      </div>
    </div>
  );
};

export default Home;

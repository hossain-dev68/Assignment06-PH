import React from "react";
import FitlogCard from "../shared/FitlogCard";


const getFitlog = async () => {
  const res = await fetch("http://localhost:3000/fitlogworker.json");
  const data = await res.json();
  return data;
};

const Fitlog = async () => {
  const fitlogData = await getFitlog();

  return (
    <section className="container mx-auto my-[70px] px-4">

     
      <div className="text-center mb-10">
       

        <h1 className="text-4xl md:text-5xl font-bold text-[#ffffff] mt-2">
          THE LIBRARY
        </h1>

        <p className="text-[#9ca3af] max-w-2xl mx-auto mt-4">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {fitlogData.map((fitlog,id) => (
          <FitlogCard
            key={id}
            fitlog={fitlog}
          />
        ))}
      </div>

    </section>
  );
};

export default Fitlog;
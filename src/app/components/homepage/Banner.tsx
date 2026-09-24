import React from 'react';
import bannerlogo from "@/asset/banner.png"
import Image from 'next/image';

const Banner = () => {
    return (
    <section className="container mx-auto px-4">
  <div className="grid grid-cols-2 gap-10 items-center bg-[#222630] rounded-[20px] p-10">

    
    <div>
      <p className="mb-4 text-[#c2f800]">
        WORKOUT LIBRARY
      </p>

      <h1 className="text-4xl font-bold mb-4">
        TRAIN WITH INTENT.
        
        LOG <br />EVERY SET.
      </h1>

      <p className="text-lg mb-6 text-[#9ca3af]">
        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
        into today's plan, and watch the week's work add up.
      </p>

      <button className="px-5 py-3 bg-[#c2f800] text-black rounded">
        BROWSE WORKOUTS
      </button>
    </div>

   
    <div>
      <Image
        src={bannerlogo}
        alt="Banner"
        className="w-full"
      />
    </div>

  </div>
</section>
    );
};

export default Banner;
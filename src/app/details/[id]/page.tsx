import React from 'react';
import Image from 'next/image';
import AddPlan from '@/app/components/Fitlogdetails/AddPlan';
import Saved from '@/app/components/Fitlogdetails/Saved';
import { WFitlog } from '@/types/fitlog.type';

interface IdPageProps {
  params: Promise<{
    id: string;
  }>
}
const getFitlog = async () => {
   try{
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/fitlogworker.json`);
  const data = await res.json();
  return data;
  }
  catch(error) {
    console.error("Error fetching data:",error);
    return[];

  }
};
const DetailsIdPage = async ({ params }: IdPageProps) => {
  const { id } = await params;
  const cardData = await getFitlog();
  const card = cardData.find((card: WFitlog) => String(card.id) === String(id)) as WFitlog;
  return (
    <div className='container mx-auto'>
      <div className="card lg:card-side bg-base-100 shadow-xl overflow-hidden border border-gray-100">

        <figure className="lg:w-2/5 bg-gray-100">
          <Image
            src={card.image}
            alt={card.name}
            width={400}
            height={400}
            className="w-full h-[280px] lg:h-[430px] object-cover"
          />
        </figure>


        <div className="card-body lg:w-3/5 p-5">


          <div>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-white">
                {card.name}
              </h2>

              <div className="badge badge-warning font-semibold px-3 py-3">
                ⭐ {card.rating}
              </div>
            </div>

            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              {card.description}
            </p>
          </div>


          <div className="grid grid-cols-2 gap-2 mt-3">

            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs text-[#FFFFFF]">Difficulty</p>
              <p className="font-bold text-blue-600">
                {card.difficulty}
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-xs text-[#FFFFFF]">Duration</p>
              <p className="font-bold text-green-600">
                {card.duration} min
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-xs text-[#FFFFFF]">Calories</p>
              <p className="font-bold text-orange-600">
                {card.caloriesBurned} kcal
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-xs text-[#FFFFFF]">Equipment</p>
              <p className="font-bold text-purple-600">
                {card.equipment}
              </p>
            </div>

          </div>


          <div className="mt-3 " >
            <h3 className="font-bold text-base text-[#FFFFFF] mb-1">
              Target Muscle Groups
            </h3>

            <div className="flex flex-wrap gap-1 ">
              {card.muscleGroups.map((muscle, index) => (
                <span
                  key={index}
                  className="badge badge-outline badge-primary"
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>


          <div className="flex gap-3 mt-3">

            <div className="flex-1 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-[#FFFFFF]">Sets</p>
              <p className="text-xl font-bold text-[#FFFFFF]">
                {card.sets}
              </p>
            </div>

            <div className="flex-1 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-[#FFFFFF]">Reps</p>
              <p className="text-xl font-bold text-[#FFFFFF]">
                {card.reps}
              </p>
            </div>

          </div>


          <div className="mt-3">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-2">
              How to Perform
            </h3>

            <div className="space-y-1">
              {card.instructions.map((instruction, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-start"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>

                  <p className="text-[#FFFFFF] text-sm leading-5">
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>


          <div className="card-actions justify-end mt-3 gap-2">
            <AddPlan card={card} />

            <Saved card={card} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailsIdPage;
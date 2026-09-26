
import Image from "next/image";
import { WFitlog } from "@/types/fitlog.type";
import Link from "next/link";

interface FitlogCardProps {
  fitlog: WFitlog;
}

const FitlogCard = ({ fitlog }: FitlogCardProps) => {
  const {
    name,
    image,
    muscleGroups,
    equipment,
    difficulty,
    duration,
    caloriesBurned,
    sets,
    reps,
    rating,
    description,
  } = fitlog;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group">


      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={600}
          height={500}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />


        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-semibold px-3 py-1.5 rounded-full shadow">
            {difficulty}
          </span>
        </div>


        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm">
          ⭐ {rating}
        </div>
      </div>


      <div className="p-5">


        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {name}
        </h2>


        <div className="flex flex-wrap gap-2 mb-4">
          {muscleGroups.map((muscle, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full"
            >
              {muscle}
            </span>
          ))}
        </div>


        <p className="text-gray-600 text-sm leading-6 mb-5">
          {description}
        </p>


        <div className="grid grid-cols-2 gap-3 mb-5">


          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500">
              Duration
            </p>
            <p className="font-semibold text-gray-800">
              ⏱️ {duration} min
            </p>
          </div>


          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500">
              Calories
            </p>
            <p className="font-semibold text-gray-800">
              🔥 {caloriesBurned} kcal
            </p>
          </div>


          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500">
              Sets
            </p>
            <p className="font-semibold text-gray-800">
              💪 {sets} sets
            </p>
          </div>


          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500">
              Reps
            </p>
            <p className="font-semibold text-gray-800">
              🔁 {reps}
            </p>
          </div>

        </div>


        <div className="border-t border-gray-100 pt-4 mb-4">
          <p className="text-xs text-gray-500 mb-1">
            Equipment
          </p>

          <p className="text-sm font-medium text-gray-800">
            🏋️ {equipment}
          </p>
        </div>


        <Link href={`/details/${fitlog.id}`}><button
          type="button"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200"
        >
          View Workout
        </button></Link>

      </div>
    </div>
  );
};

export default FitlogCard;


"use client";
import React, { useContext } from 'react';
import { WFitlog } from '@/types/fitlog.type';
import { FitlogContext } from '@/context/FitlogContext';
import { toast } from 'react-toastify';


const AddPlan = ({ card }: { card: WFitlog }) => {

    const { addPlan, setaddPlan } = useContext(FitlogContext);

    console.log(FitlogContext);

    const handleAddButton = () => {
        const alreadyPlan = addPlan.some(
            (item) => item.id === card.id
        );
        if(alreadyPlan) {
           toast.info(`"${card.name}" is already Plan!`);
            return; 
        }
        setaddPlan([...addPlan, card])
        toast.success(`You planned "${card.name}"`)
    };
    return (
     
       <button
  className="btn bg-[#ccff00] hover:bg-[#b8e600] text-black btn-sm flex-1"
  onClick={() => handleAddButton()}
>
  Add to Today's Plan
</button>
     
    );
};

export default AddPlan;
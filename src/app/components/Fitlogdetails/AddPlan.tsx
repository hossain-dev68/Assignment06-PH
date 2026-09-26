"use client";
import React, { useContext } from 'react';
import { WFitlog } from '@/types/fitlog.type';
import { FitlogContext } from '@/context/FitlogContext';
import { toast } from 'react-toastify';

const AddPlan = ({ card }: { card: WFitlog }) => {

    const { addPlan, setaddPlan } = useContext(FitlogContext);

    console.log(FitlogContext);

    const handleAddButton = () => {
        console.log("Plan ADD");
        setaddPlan([...addPlan, card])
        toast.success(`You planned "${card.name}"`)
    };
    return (
        <button className="btn btn-primary btn-sm flex-1" onClick={() => handleAddButton()}>
            Add to Today's Plan
        </button>
    );
};

export default AddPlan;
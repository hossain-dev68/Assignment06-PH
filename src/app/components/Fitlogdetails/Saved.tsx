"use client";
import React, { useContext } from 'react';
import { WFitlog } from '@/types/fitlog.type';
import { FitlogContext } from '@/context/FitlogContext';
import { toast } from 'react-toastify';

const Saved = ({ card }: { card: WFitlog }) => {

    const { addSave, setaddSave } = useContext(FitlogContext);

    console.log(FitlogContext);

    const handleAddSaved = () => {
        console.log("Plan ADD");
        setaddSave([...addSave, card])
        toast.success(`You Saved "${card.name}"`)
    };
    return (
        <button className="btn btn-outline btn-primary btn-sm flex-1" onClick={() => handleAddSaved()}>
            Save for Later
        </button>
    );
};

export default Saved;
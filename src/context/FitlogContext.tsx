"use client";

import React, { createContext, ReactNode, useState } from "react";
import { WFitlog } from "@/types/fitlog.type";

export const FitlogContext = createContext({
    addPlan: [] as WFitlog[],
    setaddPlan: (_value: WFitlog[]) => { },
    addSave: [] as WFitlog[],
    setaddSave: (_value: WFitlog[]) => { },
    removeFromPlan: (_id: number) => { },
    removeFromSave: (_id: number) => { },
});

const FitlogProvider = ({ children }: { children: ReactNode }) => {
    const [addPlan, setaddPlan] = useState<WFitlog[]>([]);
    const [addSave, setaddSave] = useState<WFitlog[]>([]);

    const removeFromPlan = (id: number) => {
        setaddPlan(addPlan.filter((item) => item.id !== id));
    };

    const removeFromSave = (id: number) => {
        setaddSave(addSave.filter((item) => item.id !== id));
    };

    return (
        <FitlogContext.Provider
            value={{
                addPlan,
                setaddPlan,
                addSave,
                setaddSave,
                removeFromPlan,
                removeFromSave,
            }}
        >
            {children}
        </FitlogContext.Provider>
    );
};

export default FitlogProvider;
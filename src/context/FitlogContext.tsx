"use client";

import React, { createContext, ReactNode, useState } from 'react';

export const FitlogContext = createContext({});

const FitlogProvider = ({ children }: { children: ReactNode }) => {

    const [addPlan, setaddPlan] = useState([]);

    const [addSave, setaddSave] = useState([]);

    const sharedData = {

        addPlan,

        setaddPlan,

        addSave,

        setaddSave,

    }

    return <FitlogContext.Provider value={sharedData}>{children}</FitlogContext.Provider>

};

export default FitlogProvider;
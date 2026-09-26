"use client";

import React, { useContext } from "react";
import { FitlogContext } from "@/context/FitlogContext";

const ListedPage = () => {
  const { addPlan, addSave } = useContext(FitlogContext);

  return (
    <div >
      Listed Card | Total Plan: {addPlan.length} | Total Save: {addSave.length}
    </div>
  );
};

export default ListedPage;
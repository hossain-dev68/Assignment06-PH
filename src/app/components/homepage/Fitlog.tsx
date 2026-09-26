import React from "react";
import fs from "fs/promises";
import path from "path";
import FitlogCard from "../shared/FitlogCard";
import { WFitlog } from "@/types/fitlog.type";

const getFitlog = async (): Promise<WFitlog[]> => {
    try {
        const filePath = path.join(
            process.cwd(),
            "public",
            "fitlogworker.json"
        );

        const file = await fs.readFile(filePath, "utf-8");

        const data: WFitlog[] = JSON.parse(file);

        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
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
                {fitlogData.map((fitlog) => (
                    <FitlogCard
                        key={fitlog.id}
                        fitlog={fitlog}
                    />
                ))}
            </div>

        </section>
    );
};

export default Fitlog;
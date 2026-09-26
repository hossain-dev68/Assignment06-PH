import React from 'react';


const Footer = () => {
    return (
        <footer className="container mx-auto">
            <div className=" px-6 py-5 flex flex-col sm:flex-row text-center justify-between gap-3">

                  
                <h2 className="text-white text-[20px] font-bold">
                    FITLOG
                </h2>

                <p className="text-gray-400 text-[18px] text-center sm:text-right">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>

            </div>
        </footer>
    );
};

export default Footer;
import tabel from "../assets/images/tabel.png";
import sliderTable from "../assets/images/sliderTable.png";
import salesLady from "../assets/images/salesLady.png";
import list from "../assets/images/list.png";
import magnet from "../assets/images/magnetBig.png";
import security from "../assets/images/security.png";
import { useState, useEffect } from "react";
import check from "../assets/images/check.png";

const steps = [
    { id: 1, text: "Manage sales, orders, and merchandising in one place." },
    { id: 2, text: "Generate secure, unique labels." },
    { id: 3, text: "Verify authenticity and track orders end to end." },
    { id: 4, text: "Build trust with transparent records." },

];

const images = [
    magnet,
    list,
    security,

];

const checks = [
    { id: 1, text: "All-in-one operations and verification", image: check },
    { id: 2, text: "Real-time visibility across teams", image: check },
    { id: 3, text: "Full traceability and compliance", image: check },
]

const SartorCrm = () => {

    const [activeStep, setActiveStep] = useState(0);


    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="px-4 md:px-0 pt-[60px] md:pt-[100px] min-h-screen font-[sfpro] max-w-[1444px]">

            <section className="bg-white px-6 py-16 md:px-16 max-w-[992px] mx-auto">
                <h1 className="text-[40px] lg:text-[58px] text-center text-[#000068] mb-4 font-semibold">Sartor CRM 360</h1>
                <p className="text-center text-[#1E1E1E] text-[32px] md:text-[38px] mb-6 font-semibold"> One Platform for Total Control</p>
                <div className="max-w-[352px] md:max-w-[480px] mx-auto">

                    <p className="text-center text-[#1E1E1E] text-[16px] sm:text-[18px] mb-8">
                        Sartor CRM 360 combines all your critical workflows into a single, integrated solution—so you can operate with clarity, confidence, and speed.                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                        <button className="bg-[#00A859] hover:bg-green-600 text-white px-6 py-2 rounded-xl font-medium">Request a Demo</button>
                        <button className="bg-[#000068] hover:bg-[#010181] text-white px-6 py-2 rounded-xl font-medium">Try it for Free</button>
                    </div>
                </div>

                {/* Sample Leads Table Preview */}
                <div className="bg-gray-50 rounded-xl shadow-md p-6 max-w-5xl mx-auto">

                    <div className="overflow-x-auto">
                        <img src={tabel} alt="" srcset="" />
                    </div>
                </div>

                {/* Key Benefits */}
                <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4 md:justify-around mt-10 text-sm text-gray-700">

                    {checks.map((check, index) => (
                        <div key={index} className="flex items-center gap-1.5">
                            <img src={check.image} alt="check icon" className="size-4" />
                            <p>{check.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white px-6 md:py-20 md:flex md:items-center md:justify-between md:px-16 max-w-[1199px] mx-auto mb-20">
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <img src={salesLady} alt="User learning" className="rounded-lg w-full h-auto" />
                </div>
                <div className="md:w-1/2 md:pl-12">
                    <h2 className="font-semibold mb-4 text-[#1E1E1E] lg:max-w-[520px] text-[28px] sm:text-2xl lg:text-[38px] lg:leading-[50px]">Too Many Tools, Not Enough Visibility</h2>
                    <p className="text-gray-600 md:max-w-[520px] text-[17px] sm:text-[14px] lg:text-[18px]">
                        Using separate systems for sales, merchandising, and product verification creates complexity, increases errors, and leaves gaps in your customer experience.                    </p>
                </div>
            </section>

            <section className="bg-gray-100 px-6 py-16 md:px-16 w-full mb-20">
                <div className="max-w-[1199px] mx-auto ">

                    <h2 className="text-[32px] md:text-[42px] font-bold mb-8 text-start text-[#000068] max-w-[420px] ">Our Key Features On Sales Navigator</h2>

                    <div className="flex flex-col-reverse text-start sm:flex-row items-center justify-between gap-8 bg-black text-white p-6 rounded-xl shadow-xl">
                        <div className="md:w-1/2 flex flex-col text-start  w-full">
                            <h3 className="text-xl font-semibold mb-3">Complete Sales & Merchandising Suite</h3>
                            <div className="flex gap-4">
                                <button className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-full">◀</button>
                                <button className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-full">▶</button>
                            </div>
                        </div>

                        <div className="md:w-1/2">
                            <img src={sliderTable} alt="" srcset="" />
                        </div>
                    </div>

                    <div className="text-[#00A859] text-right mt-4 font-bold text-[42px] lg:text-[52px] pr-4">01</div>
                </div>
            </section>

            <section className="mb-5 ">
                <h2 className="text-center text-3xl font-semibold mb-2 ">How Sales Navigator works</h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-10 p-8 max-w-7xl mx-auto px-4 py-12">

                    {/* LEFT IMAGE */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
                        <img
                            src={images[activeStep]}
                            alt="Step Illustration"
                            className="size-40 lg:size-72 object-contain transition-all duration-500"
                        />


                        <div className="flex gap-2 justify-center mt-2">

                            {steps.map((step, index) => (
                                <div
                                    key={step.id}
                                    className="flex  flex-row items-center mb-6 "
                                >
                                    {/* Slider Circle */}
                                    <div
                                        className={`size-2 flex items-center justify-center rounded-full border-2 font-bold transition-all duration-300 z-10
                                        ${activeStep === index ? " bg-[#000068] border-[#000068]" : "border-[#E8E8E8] bg-[#E8E8E8] "} `}
                                    >
                                    </div>

                                </div>))}
                        </div>
                    </div>

                    {/* RIGHT STEPS */}
                    <div className="w-full lg:w-1/2 flex flex-col relative lg:top-10">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className="flex items-center mb-6 lg:mb-8 relative "
                            >
                                {/* Circle */}
                                <div
                                    className={`size-8 flex items-center justify-center rounded-full border-2 font-bold transition-all duration-300 z-10
                                        ${activeStep === index ? "border-green-500 bg-[#000068] text-white" : "border-[#000068] bg-[#000068] text-white"} `}
                                >
                                    {step.id}
                                </div>

                                {/* Text */}
                                <p
                                    className={`ml-4 text-[12px] lg:text-[21px] md:max-w-[200px] lg:max-w-[408px] font-medium transition-all duration-300`}
                                >
                                    {step.text}
                                </p>

                                {/* Vertical Line */}
                                {index < steps.length - 1 && (
                                    <div
                                        className={`absolute left-[15px] top-8 w-[2px] h-20 lg:h-[80px] 
                                         ${activeStep > index ? "bg-green-500" : "bg-gray-300"}`}
                                    ></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-10 px-4 text-center max-w-[431px] mx-auto space-y-1.5 mb-20">
                <h2 className="text-[32px] max-w-[216px] md:max-w-[431px] mx-auto md:text-[42px] font-semibold leading-10">
                    Starting at $10 monthly
                </h2>
                <p className="text-[#767676] font-medium">
                    Per user
                </p>
                <button className="bg-[#00A859] hover:bg-green-600 text-[white] font-semibold py-3 rounded-xl shadow max-w-[254px] w-full">
                    See Pricing
                </button>
            </section>

            <section className="py-10 px-4 text-center max-w-[1199px] mx-auto space-y-1.5 bg-[#F5F5F5] rounded-xl mb-20">
                <h2 className="text-[32px] max-w-[216px] md:max-w-[431px] mx-auto md:text-[42px] font-semibold leading-10">
                    Get Started
                </h2>
                <p className="text-[#767676] max-w-[230px] text-[18px] mx-auto font-medium">
                    Use free of charge for 28 days, no credit card required. Easy signup
                </p>
                <button className="bg-[#00A859] hover:bg-green-600 text-[white] font-semibold py-3 rounded-xl shadow max-w-[254px] w-full">
                    Try it Today!
                </button>
            </section>
        </div>
    );
};

export default SartorCrm;


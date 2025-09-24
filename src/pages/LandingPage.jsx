import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import t360 from "../assets/images/360.png";
import crmplus from "../assets/images/crmplus.png";
import navigator from "../assets/images/navigator.png";
import chain from "../assets/images/sartorchain.png";
import pippics from "../assets/images/pippics.png";
import bar from "../assets/images/bar.png";
import industry from "../assets/images/industry.png";
import company from "../assets/images/company.webp";
import cream from "../assets/images/cream.png";
import tab from "../assets/images/tab.png";
import blockChain from "../assets/images/blockchain.png";
import ai from "../assets/images/brain.png";
import trend from "../assets/images/trend.png";
import list from "../assets/images/list.png";
import magnet from "../assets/images/magnetBig.png";
import security from "../assets/images/security.png";
import qoute from "../assets/images/qoute.png";

import phone from "../assets/images/phone.png";
import Navbar from "../components/Navbar";
import { Bounce, Fade, Slide } from "react-awesome-reveal";


const steps = [
    { id: 1, text: "Capture and Assign Leads" },
    { id: 2, text: "Track Orders and Inventory" },
    { id: 3, text: "Verify Authenticity with a Scan" },

];

const images = [
    magnet,
    list,
    security,

];
const LandingPage = () => {

    const [activeStep, setActiveStep] = useState(0);

    // Auto-slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const testimonials = [
        {
            quote: "OMG! I cannot believe that I have got a brand new landing page after getting Omega. It was super easy to edit and publish.",
            name: "Diego Montes",
            role: "Web Developer",
        },
        {
            quote: "Working with Omega has transformed my workflow. The components are intuitive and allow for rapid prototyping!",
            name: "Sofia Chen",
            role: "UI/UX Designer",
        },
        {
            quote: "Omega has simplified our product management. Total game changer.",
            name: "Liam Patel",
            role: "Product Manager",
        },
    ];

    const blogPosts = [
        { title: "How Smart CRM Tools Can Transform Sales in Product-Based Businesses", image: cream },
        { title: "Fighting Fakes: How AI and Blockchain Are Securing Product Authenticity", image: phone },
        { title: "Building a Smarter Workforce with Digital Training Tools", image: tab },
    ];


    const solutions = [
        {
            title: "Sartor Sales Navigator",
            description: "Essential sales and inventory management",
            image: navigator,
            alt: "Sales Navigator"
        },
        {
            title: "SartorChain",
            description: "AI + Blockchain product authentication",
            image: chain,
            alt: "SartorChain"
        },
        {
            title: "Navigator Plus",
            description: "Advanced merchandising and lead generation",
            image: crmplus,
            alt: "Navigator Plus"
        },
        {
            title: "CRM 360",
            description: "The complete ecosystem",
            image: t360,
            alt: "CRM 360"
        }
    ];


    // Partner Tabs Logic
    const partners = [
        { name: "Blockchain-Backed Security", footnote: "immutable records of every transaction", image: pippics, smallImage: blockChain, alt: "Blockchain image" },
        { name: "DORA AI Verification", footnote: "invisible finger print verified instantly", image: industry, smallImage: ai },
        { name: "Ai-Powered Forecasting", footnote: "smarter demands planning and distribution", image: company, smallImage: trend },
    ];
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="min-h-screen font-[sfpro] max-w-[1444px]">
            <Navbar />


            <div className="px-4 md:px-20 pt-[80px] md:pt-[150px]">

                <section className="bg-[#0a0a8f] text-white text-center py-10 px-4 flex flex-col justify-center items-center relative max-w-[1200px] rounded-lg">
                    <div className="max-w-[1089px]">

                        <h1 className="sm:max-w-[580px] md:max-w-[800px] font-bold mb-4 sm:text-[42px] md:text-[60px]">
                            Where Sales Meet Trust. Powered By AI And Blockchain.
                        </h1>
                        <p className="sm:max-w-[350px] lg:max-w-[550px] mx-auto text-[12px] lg:text-[20px] mb-6 font-medium">
                            Streamline sales, protect your products, and scale your distribution with one intelligent platform.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-[10px] mb-5 ">
                            <Link
                                to="https://calendly.com/nwachukwuconfidence/30min_sartorcrm_demo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#00A859] hover:bg-green-600 text-white  px-6 py-2 rounded-xl font-medium">
                                Get a free demo
                            </Link>
                            <Link className="bg-white hover:bg-gray-100 text-[#0a0a8f]  px-6 py-2 rounded-xl font-medium">
                                Join Waitlist
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <img
                            src={bar}
                            alt="Dashboard Overview"
                            className="w-full max-w-[1089px] rounded-xl shadow-lg"
                        />
                    </div>

                    {/* <div className="flex justify-center flex-wrap gap-6 mt-10 text-gray-300 text-sm">
                        <span>Logo</span>
                        <span>Logo</span>
                        <span>Logo</span>
                        <span>Logo</span>
                        <span>Logo</span>
                    </div> */}
                </section>

                {/* Solutions Section */}

                <section className="py-8 md:py-16 px-4 text-center max-w-[1199px] mx-auto">
                    <div className="md:max-w-[400px] text-left mb-10">
                        <h2 className="text-2xl md:text-4xl font-semibold mb-4">
                            Solutions for Every Step of Your Distribution Journey
                        </h2>
                    </div>

                    {/* Grid container outside the loop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
                        {solutions.map((solution, index) => (
                            <Fade key={index} direction="left" delay={index * 100} triggerOnce>
                                <div className="bg-white p-6 rounded-xl shadow max-w-[580px] max-h-[496px] border-[2px] hover:border-[#00A859]">
                                    <img
                                        src={solution.image}
                                        alt={solution.alt}
                                        className="rounded-md mb-4 h-auto w-full"
                                    />
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold mb-1">{solution.title}</h3>
                                        <p className="text-gray-600">{solution.description}</p>
                                        <button className="bg-[#00A859] hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-xl mt-4">
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </Fade>
                        ))}
                    </div>
                </section>



                <section className=" text-black py-8 md:py-16 md:px-20">
                    <div className="max-w-[1200px]">
                        <h2 className="text-center text-3xl font-semibold mb-2 md:mb-12">Why Choose Sartor CRM</h2>
                        <div className="flex flex-col lg:grid lg:grid-cols-2  gap-[5px] md:gap-10 items-stretch mx-auto w-full">


                            {/* Dynamic Images */}
                            <div className=" h-[350px] md:h-full w-full mb-5 md:mb-0">
                                <img
                                    src={partners[activeIndex].image}
                                    alt={partners[activeIndex].name}
                                    className="rounded-lg object-cover w-full h-full"
                                />
                            </div>


                            {/* Tabs List */}
                            <div className="flex flex-col justify-start h-full w-full">

                                <ul className=" space-y-4 justify-center flex-wrap md:space-y-8 md:flex md:flex-col md:flex-grow md:justify-around">
                                    {partners.map((partner, index) => (
                                        <Bounce key={index} delay={index * 100} triggerOnce>

                                            <li
                                                key={index}
                                                onClick={() => setActiveIndex(index)}
                                                className={` cursor-pointer  px-5 py-2 md:px-5 md:py-3 text-start items-center text-[#1A1A1A] text-[14px] font-semibold md:text-[24px] border rounded-md transition-all duration-200 ${index === activeIndex
                                                    ? " border-blue-800 text-black"
                                                    : "border-gray-500 text-black hover:bg-gray-200"
                                                    }`}
                                            >
                                                <div className="flex flex-col items-start md:flex-row md:items-center gap-5">
                                                    <div>
                                                        <img src={partner.smallImage} alt={partner.alt} className="size-8 md:size-16" />
                                                    </div>
                                                    <div>
                                                        <div>
                                                            {partner.name}
                                                        </div>
                                                        <div className="text-[#767676] md:text-[18px] text-[10px]">  {partner.footnote}</div>

                                                    </div>
                                                </div>
                                            </li>
                                        </Bounce>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-center text-3xl font-semibold mb-2 ">Why Choose Sartor CRM</h2>

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
                                        {/* Circle */}
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
                                    className="flex items-center mb-6 md:mb-20 relative"
                                >
                                    {/* Circle */}
                                    <div
                                        className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-bold transition-all duration-300 z-10
                                        ${activeStep === index ? "border-green-500 bg-[#000068] text-white" : "border-[#000068] bg-[#000068] text-white"} `}
                                    >
                                        {step.id}
                                    </div>

                                    {/* Text */}
                                    <p
                                        className={`ml-4 text-lg font-medium transition-all duration-300 `}
                                    >
                                        {step.text}
                                    </p>

                                    {/* Vertical Line */}
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`absolute left-[15px] top-8 w-[2px] h-8 md:h-[80px] 
                                         ${activeStep > index ? "bg-green-500" : "bg-gray-300"}`}
                                        ></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* Testimonials */}
                <section className="bg-white px-6 py-5 md:py-10 max-w-7xl mx-auto">
                    <h2 className="text-center text-2xl font-semibold text-gray-900 mb-12">
                        Client Success Stories
                    </h2>
                    <div className="grid md:grid-cols-3 gap-10 mb-10 md:mb-20">
                        {testimonials.map((t, idx) => (
                            <Slide key={idx} direction="left" delay={idx * 100} triggerOnce>

                                <div key={idx} className="text-sm">
                                    <img src={qoute} alt="Qoute" srcset="" className="mb-5" />
                                    <p className="text-gray-700 md:mb-4">"{t.quote}"</p>
                                    <p className="text-gray-600 font-medium">{t.name}</p>
                                    <p className="text-gray-400">{t.role}</p>
                                </div>
                            </Slide>
                        ))}
                    </div>


                </section>

                {/* Pricing Section */}
                <section className="py-10 px-4 text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-gray-600 mb-2">
                        Plans for businesses of all sizes
                    </p>
                    <p className="text-gray-600 mb-6">
                        no hidden fees.
                    </p>
                    <button className="bg-green-500 hover:bg-green-600 text-[white] font-semibold px-6 py-2 rounded-md shadow">
                        View Pricing
                    </button>
                </section>

            </div>
        </div>
    );
};

export default LandingPage;

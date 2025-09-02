import { useState } from "react";
import { Link } from "react-router-dom";
import smallbar from "../assets/images/smallbar.png";
import pippics from "../assets/images/pippics.png";
import bar from "../assets/images/bar.png";
import industry from "../assets/images/industry.png";
import company from "../assets/images/company.webp";
import cream from "../assets/images/cream.png";
import tab from "../assets/images/tab.png";
import blockChain from "../assets/images/blockchain.png";
import ai from "../assets/images/ai.png";
import trend from "../assets/images/trend.png";
import monitor from "../assets/images/monitor.png";
import list from "../assets/images/list.png";
import security from "../assets/images/security.png";
import magnet from "../assets/images/magnet.png";

import phone from "../assets/images/phone.png";
import Navbar from "../components/Navbar";

const LandingPage = () => {
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

    // Partner Tabs Logic
    const partners = [
        { name: "Blockchain-Backed Security", footnote: "immutable records of every transaction", image: pippics, smallImage: blockChain, alt: "Blockchain image" },
        { name: "DORA AI Verification", footnote: "invisible finger print verified instantly", image: industry, smallImage: ai },
        { name: "Ai-Powered Forecasting", footnote: "smarter demands planning and distribution", image: company, smallImage: trend },
    ];
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="min-h-screen font-[sfpro]">
            <Navbar />


            <div className="px-4 md:px-20 pt-[50px] md:pt-[150px]">

                <section className="bg-[#0a0a8f] text-white text-center py-16 px-4 flex flex-col justify-center items-center relative">

                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Where Sales Meet Trust. Powered By AI And Blockchain.
                    </h1>
                    <p className="max-w-2xl mx-auto text-base md:text-lg mb-6">
                        Streamline sales, protect your products, and scale your distribution with one intelligent platform.
                    </p>
                    <div className="flex justify-center space-x-4 mb-10">
                        <Link
                            to="https://calendly.com/nwachukwuconfidence/30min_sartorcrm_demo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#00A859] hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-md">
                            Get a free demo
                        </Link>
                        <Link className="bg-white hover:bg-gray-100 text-[#0a0a8f] font-semibold px-6 py-2 rounded-md">
                            Join Waitlist
                        </Link>
                    </div>

                    <div className="flex justify-center">
                        <img
                            src={bar}
                            alt="Dashboard Overview"
                            className="w-full max-w-5xl rounded-xl shadow-lg"
                        />
                    </div>

                    <div className="flex justify-center flex-wrap gap-6 mt-10 text-gray-300 text-sm">
                        <span>Logo</span>
                        <span>Logo</span>
                        <span>Logo</span>
                        <span>Logo</span>
                        <span>Logo</span>
                    </div>
                </section>

                {/* Solutions Section */}
                <section className=" py-8 md:py-16 px-4 text-center">


                    <div className="max-w-2xl md:max-w-[400px] md:text-left mb-10">
                        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                            Solutions for Every Step of Your Distribution Journey
                        </h2>
                        <button className="bg-[#00A859] hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-md mt-4">
                            Learn More
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Card 1 */}
                        <div className="bg-white p-6 rounded-xl shadow">
                            <img
                                src={smallbar}
                                alt="Sales Navigator"
                                className="w-full h-auto rounded-md mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-1">Sartor Sales Navigator</h3>
                            <p className="text-gray-600">Essential sales and inventory management</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-6 rounded-xl shadow">
                            <img
                                src={smallbar}
                                alt="SartorChain"
                                className="w-full h-auto rounded-md mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-1">SartorChain</h3>
                            <p className="text-gray-600">AI + Blockchain product authentication</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-6 rounded-xl shadow">
                            <img
                                src={smallbar}
                                alt="Navigator Plus"
                                className="w-full h-auto rounded-md mb-4 "
                            />
                            <h3 className="text-lg font-semibold mb-1">Navigator Plus</h3>
                            <p className="text-gray-600">Advanced merchandising and lead generation</p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white p-6 rounded-xl shadow">
                            <img
                                src={smallbar}
                                alt="CRM 360"
                                className="w-full h-auto rounded-md mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-1">CRM 360</h3>
                            <p className="text-gray-600">The complete ecosystem</p>
                        </div>
                    </div>
                </section>


                <section className=" text-black py-8 md:py-16 px-6 md:px-20">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-center text-3xl font-semibold mb-2 md:mb-12">Why Choose CRM</h2>
                        <div className="flex flex-col-reverse md:grid md:grid-cols-2  gap-[5px] md:gap-10 items-stretch">


                            {/* Dynamic Images */}
                            <div className=" h-[350px] md:max-h-full w-full">
                                <img
                                    src={partners[activeIndex].image}
                                    alt={partners[activeIndex].name}
                                    className="rounded-lg object-cover w-full h-full"
                                />
                            </div>


                            {/* Tabs List */}
                            <div className="flex flex-col justify-start h-full">

                                <ul className=" flex gap-2 justify-center flex-wrap md:space-y-4 md:flex md:flex-col md:flex-grow md:justify-around">
                                    {partners.map((partner, index) => (
                                        <li
                                            key={index}
                                            onClick={() => setActiveIndex(index)}
                                            className={` cursor-pointer  px-5 py-2 md:px-5 md:py-3 text-start items-center text-[#1A1A1A] text-[14px] font-semibold md:text-[24px] border rounded-md transition-all duration-200 ${index === activeIndex
                                                ? " border-blue-800 text-black"
                                                : "border-gray-500 text-black hover:bg-gray-200"
                                                }`}
                                        >
                                            <div className="flex items-center gap-5">
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
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>






                <section className="max-w-7xl mx-auto px-4 py-12">
                    <h2 className="text-2xl font-semibold text-center mb-10">How Sartor CRM Works</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Left: Image */}
                        <div className="flex justify-center hidden md:block">
                            <img
                                src={monitor} 
                                alt="How Sartor CRM Works"
                                className="rounded-lg shadow-lg max-w-full"
                            />
                        </div>

                        {/* Right: Steps */}
                        <div className="space-y-8">
                            {/* Step 1 */}
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-[#000068] text-white flex items-center justify-center font-bold text-lg">1</div>
                                </div>
                                <div className="ml-4">
                                    <img src={magnet} alt="magnet" className="size-8" />
                                    <h3 className="text-lg font-semibold">Capture and Assign Leads</h3>
                                    <p className="text-gray-600 text-sm mt-1">Lorem ipsum dolor sit amet consectetur. Ultricies eu morbi etiam ut urna.</p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-[#000068] text-white flex items-center justify-center font-bold text-lg">2</div>
                                </div>
                                <div className="ml-4">
                                    <img src={list} alt="list" className="size-8" />
                                    <h3 className="text-lg font-semibold">Track Orders and Inventory</h3>
                                    <p className="text-gray-600 text-sm mt-1">Lorem ipsum dolor sit amet consectetur. Ultricies eu morbi etiam ut urna.</p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-[#000068] text-white flex items-center justify-center font-bold text-lg">3</div>
                                </div>
                                <div className="ml-4">
                                    <img src={security} alt="security" className="size-8" />
                                    <h3 className="text-lg font-semibold">Verify Authenticity with a Scan</h3>
                                    <p className="text-gray-600 text-sm mt-1">Lorem ipsum dolor sit amet consectetur. Ultricies eu morbi etiam ut urna.</p>
                                </div>
                            </div>
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
                            <div key={idx} className="text-sm">
                                <div className="text-4xl text-blue-800 font-serif md:mb-4">”</div>
                                <p className="text-gray-700 md:mb-4">"{t.quote}"</p>
                                <p className="text-gray-600 font-medium">{t.name}</p>
                                <p className="text-gray-400">{t.role}</p>
                            </div>
                        ))}
                    </div>


                </section>

                {/* Pricing Section */}
                <section className="py-10 px-4 text-center">
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


                {/* Startup Insights Section */}
                <section className="py-24">
                    <div className="max-w-3xl mx-auto text-center bg-white md:bg-gray-100 rounded-lg py-10 px-6 md:px-12 shadow">
                        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                            Equip Yourself with Essential<br className="hidden md:block" /> Startup Insights
                        </h2>
                        <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
                            Download our exclusive Free Startup Checklist — a comprehensive guide to navigating the early stages
                            of building a successful product-based business in emerging markets.
                        </p>
                        <button className="bg-green-500 hover:bg-green-600 text-[white] font-semibold px-6 py-2 rounded-md shadow">
                            Get the Free Checklist
                        </button>
                    </div>
                </section>


            </div>
        </div>
    );
};

export default LandingPage;

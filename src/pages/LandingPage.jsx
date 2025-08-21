import { useState } from "react";
import { Link } from "react-router-dom";
import smallbar from "../assets/images/smallbar.png";
import pippics from "../assets/images/pippics.png";
import bar from "../assets/images/bar.png";
import industry from "../assets/images/industry.png";
import company from "../assets/images/company.webp";
import cream from "../assets/images/cream.png";
import tab from "../assets/images/tab.png";
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
        { name: "Blockchain-Backed Security", image: pippics },
        { name: "DORA AI Verification", image: industry },
        { name: "Ai-Powered Forecasting", image: company },
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
                        <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-2 rounded-md">
                            Request Demo
                        </button>
                        <button className="bg-white hover:bg-gray-100 text-[#0a0a8f] font-semibold px-6 py-2 rounded-md">
                            Join Waitlist
                        </button>
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
                        <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-2 rounded-md mt-4">
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
                        <h2 className="text-center text-3xl font-semibold mb-2 md:mb-12">Who We Partner With</h2>
                        <div className="grid md:grid-cols-2 gap-[5px] md:gap-10 items-stretch">
                            {/* Tabs List */}
                            <div className="flex flex-col justify-start h-full">
                                <p className="mb-3 md:mb-6 text-sm text-black text-center md:text-left">
                                    We are the trusted partner for:
                                </p>
                                <ul className=" flex gap-2 justify-center flex-wrap md:space-y-4 md:flex md:flex-col md:flex-grow md:justify-around">
                                    {partners.map((partner, index) => (
                                        <li
                                            key={index}
                                            onClick={() => setActiveIndex(index)}
                                            className={`cursor-pointer  px-5 py-2 md:px-5 md:py-3 text-center items-center flex text-[10px] md:text-sm border rounded-md transition-all duration-200 ${index === activeIndex
                                                ? "bg-blue-900 border-blue-800 text-black"
                                                : "border-gray-500 text-black hover:bg-gray-800"
                                                }`}
                                        >
                                            {partner.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Dynamic Images */}
                            <div className=" h-[350px] md:max-h-full w-full">
                                <img
                                    src={partners[activeIndex].image}
                                    alt={partners[activeIndex].name}
                                    className="rounded-lg object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </section>



                <section className="md:py-16 px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-10">
                        How Sartor CRM Works
                    </h2>

                    {/* For smaller screens: vertical column layout */}
                    <div className="md:hidden space-y-6 flex flex-col items-start">
                        {/* Step 1 */}
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-800 text-white font-bold rounded-full">
                                1
                            </div>
                            <span className="text-base text-gray-700">Capture and Assign Leads</span>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-800 text-white font-bold rounded-full">
                                2
                            </div>
                            <span className="text-base text-gray-700">Track Orders and Inventory</span>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-800 text-white font-bold rounded-full">
                                3
                            </div>
                            <span className="text-base text-gray-700">Verify Authenticity with a Scan</span>
                        </div>
                    </div>

                    {/* For md and up: triangle layout */}
                    <div className="hidden md:block relative max-w-lg mx-auto h-32">
                        {/* Step 1 - Left */}
                        <div className="absolute left-0 top-0 flex items-center space-x-2">
                            <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-800 text-white font-bold rounded-full">
                                1
                            </div>
                            <span className="text-base text-gray-700 text-left">
                                Capture and Assign Leads
                            </span>
                        </div>

                        {/* Step 2 - Right */}
                        <div className="absolute right-0 top-0 flex items-center space-x-2">
                            <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-800 text-white font-bold rounded-full">
                                2
                            </div>
                            <span className="text-base text-gray-700 text-left">
                                Track Orders and Inventory
                            </span>
                        </div>

                        <div className="absolute left-1/2 transform -translate-x-1/2 top-20 flex items-center space-x-2">
                            <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-800 text-white font-bold rounded-full">
                                3
                            </div>
                            <span className="text-base text-gray-700 text-left">
                                Verify Authenticity with a Scan
                            </span>
                        </div>
                    </div>

                </section>


                {/* Pricing Section */}
                <section className="py-20 px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-gray-600 mb-2">
                        Plans for businesses of all sizes
                    </p>
                    <p className="text-gray-600 mb-6">
                        no hidden fees.
                    </p>
                    <button className="bg-green-500 hover:bg-green-600 text-[#0a0a8f] font-semibold px-6 py-2 rounded-md shadow">
                        View Pricing
                    </button>
                </section>


                {/* Startup Insights Section */}
                <section className="">
                    <div className="max-w-3xl mx-auto text-center bg-white md:bg-gray-100 rounded-lg py-10 px-6 md:px-12 shadow">
                        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                            Equip Yourself with Essential<br className="hidden md:block" /> Startup Insights
                        </h2>
                        <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
                            Download our exclusive Free Startup Checklist — a comprehensive guide to navigating the early stages
                            of building a successful product-based business in emerging markets.
                        </p>
                        <button className="bg-green-500 hover:bg-green-600 text-[#0a0a8f] font-semibold px-6 py-2 rounded-md shadow">
                            Get the Free Checklist
                        </button>
                    </div>
                </section>




                {/* Testimonials */}
                <section className="bg-white px-6 py-5 md:py-20 max-w-7xl mx-auto">
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
            </div>
        </div>
    );
};

export default LandingPage;

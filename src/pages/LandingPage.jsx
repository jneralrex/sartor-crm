import { useState } from "react";
import { Link } from "react-router-dom";
import smallbar from "../assets/images/smallbar.png";
import pippics from "../assets/images/pippics.png";
import sci from "../assets/images/sci.png";
import industry from "../assets/images/industry.png"; // Add your actual images here import fmcg from "../assets/images/fmcg.png";
import founders from "../assets/images/founders.webp";
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
        { name: "Pharmaceutical Brands", image: sci },
        { name: "FMCG Manufacturers", image: industry },
        { name: "B2B Product Companies", image: company },
        { name: "Founders Scaling Distributed Teams", image: founders },
    ];
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="min-h-screen font-[sfpro]">
            <Navbar />

            {/* Hero Section */}
            <section className="text-center py-8 md:py-16 px-6 md:px-20 bg-[#EAECF0] md:min-h-screen">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight">
                    Custom Tech And Advice To <br />
                    Start, Grow, And Lead Your <br />
                    Product Business.
                </h1>
                <p className="mt-6 text-gray-600 max-w-3xl mx-auto">
                    At Sartor Limited, we help FMCG, pharma, and manufacturing businesses thrive in emerging markets through custom software and strategic consulting.
                </p>
                <div className="mt-8 flex justify-center space-x-4">
                    <Link to={'https://calendly.com/sartorlimited/1-on-1-free-30mins-introductory-consulting-call-official'} className="bg-[#00D743] text-blue-700 px-5 py-2 rounded-md text-[9px] md:text-sm" target="_blank" rel="noopener noreferrer">
                        Book a Consultation
                    </Link>
                    <button className="bg-white text-blue-700 text-[9px] md:text-sm px-5 py-2 rounded-md">
                        Learn More
                    </button>
                </div>

                {/* <div className="h-[200px] w-[200px] bg-gradient-to-r from-black to-red-500 rounded-full flex items-center justify-center mt-24 absolute left-0">
                         <div className="bg-white h-[100px] w-[100px] rounded-full" />
                    </div> */}

                <div className="hidden md:block absolute left-[-50px] md:left-[-100px] mt-[-0px] md:mt-[-63px] z-0">
                    <div className="h-[100px] w-[100px] md:h-[200px] md:w-[200px] rounded-full overflow-hidden mt-28 absolute left-0 border-2 border-gray-300">
                        {/* Outer circle */}
                        <div className="absolute top-0 right-0 h-full w-1/2 bg-[#D6DAE0]" />

                        {/* Inner white circle */}
                        <div className="absolute inset-0 flex items-center left-0 justify-center ">
                            <div className="bg-[#EAECF0] h-[50px] w-[50px] md:h-[100px] md:w-[100px] rounded-full" />
                        </div>
                    </div>
                </div>


            </section>

            {/* Services */}
            <section className="max-w-7xl mx-auto px-6 py-16 bg-white">
                <div className="mb-12 md:text-start text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto md:mx-0 md:max-w-[620px]">
                        We combine deep industry knowledge with cutting-edge technology to offer solutions that
                        are built with your unique risks and growth ambitions in mind. Explore how we can transform your operations.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="border rounded-lg p-6 shadow-sm">
                        <div className="bg-gray-50 p-4 rounded-md mb-4">
                            <img src={smallbar} alt="CRM Icon" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Sartor CRM</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Our CRM boosts sales, streamlines LPOs, maps retail, and prevents counterfeiting with AI + Blockchain.
                        </p>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-[#00D743] rounded">
                            Learn More
                        </button>
                    </div>

                    {/* Side Services */}
                    <div className="grid gap-4">
                        {[
                            { title: 'Sartor LMS', description: 'A learning platform for team onboarding, training, and building workforce excellence.' },
                            { title: 'Sartor Chain', description: 'AI tags on labels let customers verify products with a quick scan.' },
                            { title: 'Business Consulting', description: 'One-on-one support to help founders build brands, boost sales, and lead operations effectively.' },
                        ].map((service, idx) => (
                            <div key={idx} className="border rounded-lg p-5 bg-gray-50 shadow-sm">
                                <h4 className="font-semibold text-gray-900 mb-2">{service.title}</h4>
                                <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                                <button className="px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded bg-white cursor-not-allowed">
                                    Coming Soon
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Us */}
            <section className="bg-white py-16 px-6 md:px-20">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <img
                        src={pippics}
                        alt="Team meeting"
                        className="rounded-lg object-cover w-full h-full"
                    />
                    <div>
                        <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold text-gray-900 mb-4 lg:leading-[100px]">
                            About Us / Our Mission
                        </h2>
                        <p className="text-gray-700 text-sm leading-relaxed lg:text-[20px] lg:leading-[160%]">
                            Sartor Limited is dedicated to transforming businesses in emerging markets through innovative
                            technology and expert guidance. We understand the unique complexities faced by product-based
                            companies and offer tailored solutions that build confidence, optimise operations, and secure
                            market leadership. Our commitment is to partner with you from inception to scale, ensuring you
                            achieve the success you&apos;ve imagined.
                        </p>
                    </div>
                </div>
            </section>

            {/* Who We Partner With */}
            <section className="bg-black text-white py-8 md:py-16 px-6 md:px-20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-center text-3xl font-semibold mb-3 md:mb-12">Who We Partner With</h2>
                    <div className="grid md:grid-cols-2 gap-5 md:gap-10 items-stretch h-[457px]">
                        {/* Tabs List */}
                        <div className="flex flex-col justify-start h-full">
                            <p className="mb-3 md:mb-6 text-sm text-gray-300 text-center md:text-left">
                                We are the trusted partner for:
                            </p>
                            <ul className=" flex gap-2 justify-center flex-wrap md:space-y-4 md:flex md:flex-col md:flex-grow md:justify-around">
                                {partners.map((partner, index) => (
                                    <li
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        className={`cursor-pointer  px-5 py-2 md:px-5 md:py-3 text-center items-center flex text-[10px] md:text-sm border rounded-md transition-all duration-200 ${index === activeIndex
                                                ? "bg-blue-900 border-blue-800 text-white"
                                                : "border-gray-500 text-white hover:bg-gray-800"
                                            }`}
                                    >
                                        {partner.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Dynamic Image */}
                        <div className=" h-[350px] md:h-full w-full">
                            <img
                                src={partners[activeIndex].image}
                                alt={partners[activeIndex].name}
                                className="rounded-lg object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-white px-6 py-20 max-w-7xl mx-auto">
                <h2 className="text-center text-2xl font-semibold text-gray-900 mb-12">
                    Client Success Stories
                </h2>
                <div className="grid md:grid-cols-3 gap-10 mb-20">
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="text-sm">
                            <div className="text-4xl text-blue-800 font-serif mb-4">”</div>
                            <p className="text-gray-700 mb-4">"{t.quote}"</p>
                            <p className="text-gray-600 font-medium">{t.name}</p>
                            <p className="text-gray-400">{t.role}</p>
                        </div>
                    ))}
                </div>

                {/* Blog */}
                <h2 className="text-center text-2xl font-semibold text-gray-900 mb-12">
                    The Entrepreneur&apos;s Blueprint Blog
                </h2>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {blogPosts.map((post, idx) => (

                        <div key={idx} className=" p-4 rounded-lg shadow-sm w-full flex flex-col">
                            <img src={post.image} className="rounded-md mb-3" />
                            <Link className="text-sm text-gray-800 font-medium underline">{post.title}</Link>
                        </div>

                    ))}
                </div>
                <div className="text-center">
                    <button className="px-6 py-2 text-sm font-medium bg-blue-900 text-white rounded hover:bg-blue-950 transition">
                        View All Posts
                    </button>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;

import { Link } from "react-router-dom";
import bar from "../assets/images/bar.png";
import smallbar from "../assets/images/smallbar.png";
import pippics from "../assets/images/pippics.png";
import sci from "../assets/images/sci.png";


const LandingPage = () => {

    const testimonials = [
        {
            quote:
                "OMG! I cannot believe that I have got a brand new landing page after getting Omega. It was super easy to edit and publish.",
            name: "Diego Montes",
            role: "Web Developer",
        },
        {
            quote:
                "Working with Omega has transformed my workflow. The components are intuitive and allow for rapid prototyping!",
            name: "Sofia Chen",
            role: "UI/UX Designer",
        },
        {
            quote:
                "Omega has simplified our product management. Total game changer.",
            name: "Liam Patel",
            role: "Product Manager",
        },
    ];

    const blogPosts = [
        {
            title:
                "How Smart CRM Tools Can Transform Sales in Product-Based Businesses",
        },
        {
            title:
                "Fighting Fakes: How AI and Blockchain Are Securing Product Authenticity",
        },
        {
            title:
                "Building a Smarter Workforce with Digital Training Tools",
        },
    ];


    return (
        <div className="min-h-screen bg-gray-100 font-[sfpro]">

            <section className="text-center py-16 px-6 md:px-20 bg-gray-50">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight">
                    Custom Tech And Advice To <br />
                    Start, Grow, And Lead Your <br />
                    Product Business.
                </h1>
                <p className="mt-6 text-gray-600 max-w-3xl mx-auto">
                    At Sartor Limited, we help FMCG, pharma, and manufacturing businesses thrive
                    in emerging markets through custom software and strategic consulting.
                </p>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-10">
               <img src={bar} alt="" srcset="" />

                    
            </section>

            <section className="max-w-7xl mx-auto px-6 py-16 bg-white">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        We combine deep industry knowledge with cutting-edge technology to offer solutions that
                        are built with your unique risks and growth ambitions in mind. Explore how we can
                        transform your operations
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Main CRM Card */}
                    <div className="border rounded-lg p-6 shadow-sm">
                        <div className="bg-gray-50 p-4 rounded-md mb-4">
                        
                                <img src={smallbar} alt="" srcset="" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Sartor CRM</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Our CRM boosts sales, streamlines LPOs, maps retail, and prevents counterfeiting with AI + Blockchain.
                        </p>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded hover:bg-blue-900">
                            Learn More
                        </button>
                    </div>

                    {/* Side Services */}
                    <div className="grid gap-4">
                        {/* Service Item */}
                        {[
                            {
                                title: 'Sartor LMS',
                                description: 'A learning platform for team onboarding, training, and building workforce excellence.',
                            },
                            {
                                title: 'Sartor Chain',
                                description: 'AI tags on labels let customers verify products with a quick scan.',
                            },
                            {
                                title: 'Business Consulting',
                                description: 'One-on-one support to help founders build brands, boost sales, and lead operations effectively.',
                            },
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


            <section>
                {/* About Us Section */}
                <div className="bg-white py-16 px-6 md:px-20">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                        <img
                            src={pippics} 
                            alt="Team meeting"
                            className="rounded-lg object-cover w-full h-full"
                        />
                        <div>
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                                About Us / Our Mission
                            </h2>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                Sartor Limited is dedicated to transforming businesses in emerging markets through innovative
                                technology and expert guidance. We understand the unique complexities faced by product-based
                                companies and offer tailored solutions that build confidence, optimise operations, and secure
                                market leadership. Our commitment is to partner with you from inception to scale, ensuring you
                                achieve the success you’ve imagined.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Who We Partner With Section */}
                <div className="bg-black text-white py-16 px-6 md:px-20">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-center text-3xl font-semibold mb-12">Who We Partner With</h2>
                        <div className="grid md:grid-cols-2 gap-10 items-center">
                            <div>
                                <p className="mb-6 text-sm text-gray-300">
                                    We are the trusted partner for:
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Pharmaceutical Brands",
                                        "FMCG Manufacturers",
                                        "B2B Product Companies",
                                        "Founders Scaling Distributed Teams"
                                    ].map((partner, index) => (
                                        <li
                                            key={index}
                                            className={`px-5 py-3 text-sm border rounded-md ${index === 0
                                                    ? "bg-blue-900 border-blue-800 text-white"
                                                    : "border-gray-500 text-white hover:bg-gray-800"
                                                }`}
                                        >
                                            {partner}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <img
                                src={sci}
                                alt="Scientist or lab work"
                                className="rounded-lg object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white px-6 py-20 max-w-7xl mx-auto">
                {/* Testimonials Section */}
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

                {/* Blog Section */}
                <h2 className="text-center text-2xl font-semibold text-gray-900 mb-12">
                    The Entrepreneur&apos;s Blueprint Blog
                </h2>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {blogPosts.map((post, idx) => (
                        <div>

                        <div>
                            <div
                                key={idx}
                                className="bg-gray-100 rounded-md p-6 h-40 flex items-end hover:shadow-md transition"
                            >
                            </div>
                                <p className="text-sm text-gray-800 font-medium underline">{post.title}</p>
                        </div>
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

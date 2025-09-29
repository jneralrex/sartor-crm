import labelTable from "../assets/images/labelTable.png";
import qrTable from "../assets/images/qrTable.png";
import salesLady from "../assets/images/salesLady.png";
import list from "../assets/images/list.png";
import magnet from "../assets/images/magnetBig.png";
import security from "../assets/images/security.png";
import { useState, useEffect } from "react";
import check from "../assets/images/check.png";
import man from "../assets/images/man.png";
import brain from "../assets/images/brain.png";
import { ChevronDown, ChevronUp } from "lucide-react";
import qoute from "../assets/images/qoute.png";
import { Slide } from "react-awesome-reveal";


const steps = [
    { id: 1, title: "Generate Secure Labels", text: "Our Covert Label Generator creates unique, invisible identifiers embedded into each label." },
    { id: 2, title: "Apply Labels to Products", text: "Use your standard printing equipment—no special hardware needed." },
    { id: 3, title: "Distribute as Usual", text: "Products move through your normal supply chain. " },
    { id: 4, title: "Verify in Seconds", text: "Customers can scan with any smartphone. DORA AI confirms authenticity and records proof on the blockchain." },

];

const images = [
    magnet,
    list,
    security,

];

const checks = [
    { id: 1, text: "Simple smartphone scans", image: check },
    { id: 2, text: "Immutable blockchain records", image: check },
    { id: 3, text: "95% authentication accuracy", image: check },
]

const features = [
    "Proprietary invisible fingerprinting technology",
    "AI verification without specialized scanners",
    "Blockchain-backed authenticity records",
    "Easy, affordable rollout for any size business"
];

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

const FAQItem = ({ question, answer }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="">
            <button
                onClick={() => setOpen(!open)}
                className={`w-full px-4 py-6 gap-4 flex  focus:outline-none ${open ? 'bg-[#000068] text-white rounded-tl-[4px] rounded-tr-[16px] rounded-bl-[4px] rounded-br-[16px] border-l-[6px] border-[#9191FF]' : 'bg-[#fbfbfe] rounded-tl-[4px] rounded-tr-[16px] rounded-bl-[4px] rounded-br-[16px] border-l-[6px] text-[#170F49]'}`}
            >
                <span >{open ? <ChevronDown /> : <ChevronUp />}</span>
               <div  className="flex flex-col items-start text-left gap-5 ">
                 <span className="text-sm font-medium">{question}</span>
            {open && (
                <div>
                    {answer}
                </div>
            )}
               </div>
            </button>
        </div>
    );
};

const SartorChain = () => {

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
                <h1 className="text-[40px] lg:text-[58px] text-center text-[#000068] mb-4 font-semibold">SartorChain</h1>
                <p className="text-center text-[#1E1E1E] text-[32px] md:text-[38px] mb-6 font-semibold"> Invisible Fingerprints. Instant Verification.</p>
                <div className="max-w-[352px] md:max-w-[480px] mx-auto">

                    <p className="text-center text-[#1E1E1E] text-[16px] sm:text-[18px] mb-8">
                        With SartorChain, every product gets a unique, undetectable identifier. Verification is as simple as a smartphone scan—no specialized equipment, no guesswork.                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                        <button className="bg-[#00A859] hover:bg-green-600 text-white px-6 py-2 rounded-xl font-medium">Request a Demo</button>
                        <button className="bg-[#000068] hover:bg-[#010181] text-white px-6 py-2 rounded-xl font-medium">Try it for Free</button>
                    </div>
                </div>

                {/* Sample Leads Table Preview */}
                <div className="bg-gray-50 rounded-xl shadow-md p-6 max-w-5xl mx-auto">
                    <div className="overflow-x-auto">
                        <img src={labelTable} alt="" srcset="" />
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
                    <h2 className="font-semibold mb-4 text-[#1E1E1E] lg:max-w-[520px] text-[28px] sm:text-2xl lg:text-[36px] lg:leading-[50px]">Counterfeit Products Are Costing You Trust and Revenue</h2>
                    <p className="text-gray-600 md:max-w-[520px] text-[17px] sm:text-[14px] lg:text-[18px]">
                        Fake products don’t just damage your bottom line—they damage your brand. Traditional security labels and QR codes are easy to copy. Customers can’t be sure what’s genuine, and you can’t be sure what’s reaching them.
                    </p>
                </div>
            </section>

            <section className="bg-gray-100 px-6 py-16 md:px-16 w-full mb-20">
                <div className="max-w-[1199px] mx-auto ">

                    <h2 className="text-[32px] md:text-[42px] font-bold mb-8 text-start text-[#000068] max-w-[420px] ">Our Key Features On Sales Navigator</h2>

                    <div className="flex flex-col-reverse text-start sm:flex-row items-center justify-between gap-8 bg-black text-white p-6 rounded-xl shadow-xl">
                        <div className="md:w-1/2 flex flex-col text-start  w-full">
                            <h3 className="text-xl font-semibold mb-3">Invisible Protection</h3>
                            <p className="text-sm text-gray-300 mb-6">Labels can’t be copied or tampered with.</p>
                            <div className="flex gap-4">
                                <button className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-full">◀</button>
                                <button className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-full">▶</button>
                            </div>
                        </div>

                        <div className="md:w-1/2">

                            <img src={qrTable} alt="" srcset="" />
                        </div>
                    </div>

                    <div className="text-[#00A859] text-right mt-4 font-bold text-[42px] lg:text-[52px] pr-4">01</div>
                </div>
            </section>

            <section className="mb-5">
                <h2 className="text-center text-3xl font-semibold mb-2 ">How SartorChain Works</h2>

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
                                className=" grid grid-flow-col mb-6  relative"
                            >
                                {/* Circle */}
                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-bold transition-all duration-300 z-10
                                        ${activeStep === index ? "border-green-500 bg-[#000068] text-white" : "border-[#000068] bg-[#000068] text-white"} `}
                                >
                                    {step.id}
                                </div>
                                <div className="max-w-[400px]  ml-4">

                                    {/*  Title */}
                                    <h6
                                        className={` text-[20px] md:text-[22px] font-semibold transition-all duration-300`}
                                    >
                                        {step.title}
                                    </h6>

                                    {/* Text */}
                                    <p
                                        className={` lg:text-[20px] font-medium transition-all duration-300 `}
                                    >
                                        {step.text}
                                    </p>
                                </div>

                                {/* Vertical Line */}
                                {index < steps.length - 1 && (
                                    <div
                                        className={`absolute left-[15px] top-8 w-[2px] h-[120px] md:h-[100px] 
                                         ${activeStep > index ? "bg-green-500" : "bg-gray-300"}`}
                                    ></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             <section className="max-w-4xl mx-auto px-4 py-10 space-y-12">

                {/* DORA AI Section */}
                <section className="text-center w-full max-w-[600px] mx-auto">
                    <div className="flex items-center justify-center text-center gap-4">
                        <img src={brain} alt="Brain representing AI" className="size-8 mb-4" />
                    <div className="text-lg font-semibold mb-2 lg:text-[30px] text-center"> Powered by DORA AI</div>
                    </div>
                    <p className="text-gray-700 max-w-md mx-auto text-sm lg:text-[16px] leading-[30px]">
                        Our proprietary AI engine, DORA, learns and adapts to detect unique fingerprints with up to 95% accuracy, even if labels are slightly worn or faded.
                    </p>
                </section>

                {/* Features Section */}
                <section className="max-w-[1199px]  mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-2 gap-10 items-center ">
                        {/* Left: Text Features */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-semibold mb-8">
                                What Makes <span className="text-black">SartorChain</span> Different ?
                            </h2>
                            <div className="space-y-2">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="border-2 border-dotted border-green-500 rounded-lg p-4 text-[13.5px] md:text-base text-gray-800"
                                    >
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Image */}
                        <div className="w-full">
                            <img
                                src={man}
                                alt="Scanning with authenticity overlays"
                                className="w-full h-auto rounded-xl shadow-lg "
                            />
                        </div>
                    </div>
                </section>



                {/* FAQ Section */}
                <section className="max-w-[600px] mx-auto">
                    <h3 className="text-lg md:text-[42px] text-center font-semibold mb-10">Frequently Asked Questions</h3>
                    <div className="bg-white rounded-lg shadow-md divide-y space-y-3">
                        <FAQItem
                            question="Does this require special printers?"
                            answer="No, anyone with a smartphone camera can scan and check authenticity."
                        />
                        <FAQItem
                            question="Is verification complicated?"
                            answer="No, anyone with a smartphone camera can scan and check authenticity."
                        />
                        <FAQItem
                            question="How accurate is it?"
                            answer="Up to 96% accuracy even on worn or faded labels, thanks to our DORA AI."
                        />
                    </div>
                </section>
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
                <h2 className="text-[20px] max-w-[216px] md:max-w-[490px] mx-auto md:text-[42px] font-semibold md:leading-[50px]">
                   Print covert labels. Scan with any smartphone. Verify in seconds.
                </h2>
               
                <button className="bg-[#00A859] hover:bg-green-600 text-[white] font-semibold py-3 rounded-xl shadow max-w-[254px] w-full">
                    Try it Today!
                </button>
            </section>


           
        </div>
    );
};

export default SartorChain;


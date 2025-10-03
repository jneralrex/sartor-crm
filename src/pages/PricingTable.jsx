import checkIcon from "../assets/images/check.png";
import dart from "../assets/images/dart.png";
import setting from "../assets/images/setting.png";
import bip from "../assets/images/bip.png";
import key from "../assets/images/key.png";
import profile from "../assets/images/profile.png";
import tag from "../assets/images/tag.png";
import tools from "../assets/images/tools.png";
import clock from "../assets/images/clock.png";
import moneybag from "../assets/images/moneybag.png";
import merchant from "../assets/images/merchant.png";
import smallbrain from "../assets/images/smallbrain.png";
import box from "../assets/images/box.png";
import { useState } from "react";

// Pricing plans
const plans = [
  {
    name: "Sales Navigator",
    tier: "Essential Sales Operations",
    price: "$10",
    billing: "/$90yr ",
    min: "(Min. 1 user)",
    features: [true, false, false, false, false, false, false, false, false, false, false, false],
    button: "Start Free Trial",
  },
  {
    name: "Sales Navigator Plus",
    tier: "Advanced Sales & Merchandising",
    price: "$15",
    billing: "/$150yr ",
    min: "(Min. 5 user)",
    features: [true, true, true, false, true, true, true, true, true, true, false, false],
    button: "Start Free Trial",
  },
  {
    name: "SartorChain",
    tier: "AI + Blockchain Product Verification",
    price: "$20",
    billing: "/$200yr ",
    min: "(Per product)",
    features: [true, false, false, true, true, true, true, true, true, true, true, true],
    button: "Request Demo",
  },
  {
    name: "CRM 360",
    tier: "Complete Ecosystem",
    price: "$25",
    billing: "/$250yr ",
    min: "(Min. 5 user)",
    features: [true, true, true, true, true, true, true, true, true, true, true, true],
    button: "Start Free Trial",
  },
];

// Features
const featureList = [
  { name: "Core Sales & Inventory Management", icon: box },
  { name: "Lead Generation Tools", icon: dart },
  { name: "Merchandising & HCP Engagement", icon: merchant },
  { name: "Blockchain Product Authentication", icon: key },
  { name: "DORA AI Invisible Fingerprint Verification", icon: smallbrain },
  { name: "Covert Label Generator", icon: tag },
  { name: "Smart Contract Automation", icon: setting },
  { name: "Commission Tracking & Automation", icon: moneybag },
  { name: "Advanced Reporting Dashboards", icon: bip },
  { name: "Dedicated Account Manager", icon: profile },
  { name: "24/7 Priority Support", icon: tools },
  { name: "Custom Integrations & API Access", icon: clock },
];

export default function PricingTable() {

  const [active, setActive] = useState("monthly");

  return (
    <div className="px-4 md:px-0 pt-[70px] md:pt-[150px] min-h-screen font-[sfpro] max-w-[1444px]">
      {/* Heading */}
      <h2 className="text-center text-3xl md:text-5xl lg:text-[58px] font-bold text-[#000068] mb-8 leading-tight max-w-[500px] mx-auto">
        Find A Plan That Is Right For You
      </h2>

      {/* Toggle */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-[#F5F5F5] rounded-xl p-2">
          <button
            onClick={() => setActive("monthly")}
            className={`px-6 py-2 rounded-xl font-medium transition text-[20px] text-center flex justify-center items-center  ${active === "monthly"
                ? "bg-[#000068] text-white w-[97px]"
                : "text-black"
              }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setActive("yearly")}
            className={`px-6 py-2 rounded-xl font-medium transition text-[20px] text-center flex justify-center items-center ${active === "yearly"
                ? "bg-[#000068] text-white w-[97px]"
                : "text-black"
              }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="max-w-[1199px] mx-auto w-full border border-gray-200 text-sm md:text-base mb-20">
          {/* Header */}
          <thead>
            <tr>
              <th className="text-left p-4 border-b font-bold text-[#252430] w-[260px] md:text-[20px]">
                Compare plans
              </th>
              {plans.map((plan, idx) => (
                <th key={idx} className="text-center p-4 border-b border-l">
                  <div className="font-semibold text-[#252430] md:text-[20px]">{plan.name}</div>
                </th>
              ))}
            </tr>

            <tr>
              <th className="text-left p-4 border-b font-bold text-[#333] w-[260px]">

              </th>
              {plans.map((plan, idx) => (
                <th key={idx} className="text-center p-4 border-b max-w-[239.8px] mx-auto border-l">
                  <div className="text-sm text-[#252430] md:text-[14px]  max-w-[145px] mx-auto">{plan.tier}</div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Features */}
          <tbody>
            {featureList.map((feature, rowIdx) => (
              <tr key={rowIdx} className="border-t">
                <td className="flex items-center gap-2 p-4 text-gray-700 font-medium max-w-[239.8px] mx-auto">
                  <img src={feature.icon} alt={feature.name} className="w-5 h-5" />
                  <p className="max-w-[169px] md:text-[16px]">
                    {feature.name}
                  </p>
                </td>
                {plans.map((plan, colIdx) => (
                  <td key={colIdx} className="text-center p-4 border-l">
                    {plan.features[rowIdx] ? (
                      <img src={checkIcon} alt="check" className="mx-auto w-5 h-5" />
                    ) : (
                      <span className="text-{#000000} text-xl">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {/* Pricing */}
            <tr className="border-t">
              <td></td>
              {plans.map((plan, idx) => (
                <td key={idx} className="text-center p-6 border-l">
                  <div className="flex gap-2 text-center justify-center">
                    <p className="text-[40px] font-bold text-gray-900 mb-1">{plan.price} </p>
                    <p className="text-[#858BA0] mt-1 text-[14px]">{plan.billing} </p>
                  </div>
                  <div className="text-[16px] text-[#252430] py-2 font-bold">{plan.min}</div>

                </td>
              ))}
            </tr>

            <tr className="border-t">
              <td></td>
              {plans.map((plan, idx) => (
                <td key={idx} className="text-center p-6 border-l">

                  <button
                    className={`${plan.button === "Request Demo"
                        ? "bg-[#00A859] hover:bg-green-600"
                        : "bg-[#00A859] hover:bg-green-600"
                      } text-white px-6 py-2 rounded-xl font-medium transition`}
                  >
                    {plan.button}
                  </button>

                  <div className="text-xs text-gray-500 mt-2">28 days free trial</div>
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}

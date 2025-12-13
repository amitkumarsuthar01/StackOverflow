import React from "react";

const footerLinks = [
  {
    title: "STACK OVERFLOW",
    links: ["Questions", "Help", "Chat"],
  },
  {
    title: "BUSINESS",
    links: ["Stack Internal", "Stack Data Licensing", "Stack Ads"],
  },
  {
    title: "COMPANY",
    links: [
      "About",
      "Press",
      "Work Here",
      "Legal",
      "Privacy Policy",
      "Terms of Service",
      "Contact Us",
      "Cookie Settings",
      "Cookie Policy",
    ],
  },
  {
    title: "STACK EXCHANGE NETWORK",
    links: [
      "Technology",
      "Culture & recreation",
      "Life & arts",
      "Science",
      "Professional",
      "Business",
      "API",
      "Data",
    ],
  },
];

const socialLinks = ["Blog", "Facebook", "Twitter", "LinkedIn", "Instagram"];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="max-w-screen-2xl mx-auto bg-black text-gray-300 text-[13px] px-4 xl:px-32 py-6">
      <div className="mb-5">
        <img src="/short-ogo-stackoverflow.png" alt="logo" className="h-10" />
      </div>

      {/* Main Links Section */}
      <div className="grid grid-rows-1 md:grid-cols-4 gap-10 mb-6">
        {footerLinks.map((section, index) => (
          <div key={index}>
            <h4 className="font-bold mb-3 cursor-pointer">{section.title}</h4>
            <ul className="flex md:flex-col flex-wrap gap-2 md:gap-1">
              {section.links.map((item, idx) => (
                <li
                  key={idx}
                  className="hover:text-white cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer Bottom Section */}
      <div className="pt-4">
        <ul className="flex flex-wrap gap-3 mb-2">
          {socialLinks.map((link, i) => (
            <li
              key={i}
              className="hover:text-white cursor-pointer transition"
            >
              {link}
            </li>
          ))}
        </ul>

        <p className="text-[12px] leading-5">
          Site design / logo © {year} Stack Exchange Inc; user contributions
          licensed under <u>CC BY-SA 3.0</u>. rev 2025.12.4.37
        </p>
      </div>
    </footer>
  );
};

export default Footer;
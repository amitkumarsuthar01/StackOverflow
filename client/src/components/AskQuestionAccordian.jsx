import { useState } from "react";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function AccordionItem({ title, children, isOpen, onToggle }) {
  return (
    <div className="text-sm">
      <button
        className="flex justify-between w-full p-2 font-semibold"
        onClick={onToggle}
      >
        {title}
        <span>{isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</span>
      </button>

      {isOpen && (
        <div className="text-justify pl-6 text-[13px] text-gray-700">
          {children}
        </div>
      )}
    </div>
  );
}

export default function AskQuestionAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="">
      <AccordionItem
        title={
          <span>
            <span className="text-blue-600 font-bold mr-1">1.</span>
            Summarize the problem
          </span>
        }
        isOpen={openIndex === 0}
        onToggle={() => handleToggle(0)}
      >
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Include details about your goal</li>
          <li>Describe expected and actual results</li>
          <li>Include any error messages</li>
        </ul>
      </AccordionItem>

      <AccordionItem
        title={
          <span>
            <span className="text-blue-600 font-bold mr-1">2.</span>
            Describe what you tried
          </span>
        }
        isOpen={openIndex === 1}
        onToggle={() => handleToggle(1)}
      >
        Show what you've tried and what you found, and why it didn't meet your
        needs. Better answers come from good research.
      </AccordionItem>

      <AccordionItem
        title={
          <span>
            <span className="text-blue-600 font-bold mr-1">3.</span>
            Show some code
          </span>
        }
        isOpen={openIndex === 2}
        onToggle={() => handleToggle(2)}
      >
        When appropriate, share the minimum code needed to reproduce your
        problem (also called a{" "}
        <Link to="#" className="text-blue-600 underline">
          minimum, reproducible example
        </Link>
        ).
      </AccordionItem>
    </div>
  );
}

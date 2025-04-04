import React, { useContext, useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { LanguageContext } from "../../context/LanguageProvider";

const FaqsAccordion = () => {
  const [openIndexes, setOpenIndexes] = useState(new Set());
  const {t} = useContext(LanguageContext);
  const toggleFaq = (index) => {
    setOpenIndexes((prevIndexes) => {
      const newIndexes = new Set(prevIndexes);
      newIndexes.has(index) ? newIndexes.delete(index) : newIndexes.add(index);
      return newIndexes;
    });
  };
  return (
    <div className="faq-accordion">
     {t('faqSections', { returnObjects: true }).map((section, sectionIndex) => (
        <div key={sectionIndex} className="faqs">
          <h3>{section.title}</h3>
          {section.faqs.map((faq, faqIndex) => {
            const index = `${sectionIndex}-${faqIndex}`;
            const isOpen = openIndexes.has(index);
            return (
              <div key={index} className="faq-item">
                <div
                  className={`faq-question ${isOpen ? "active" : ""}`}
                  onClick={() => toggleFaq(index)}
                >
                  Q: {faq.Q}
                  {isOpen ? (
                    <GoChevronUp className="icon" />
                  ) : (
                    <GoChevronDown className="icon" />
                  )}
                </div>
                {isOpen && <div className={`faq-answer ${isOpen ? "open" : ""}`}>{faq.A}</div>}
                </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FaqsAccordion;

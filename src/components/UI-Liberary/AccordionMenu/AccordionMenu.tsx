import React, { useState } from "react";
import classNames from "classnames";
import "./AccordionMenu.scss";
import { If } from "tsx-control-statements/components";

interface AccordionProps {
  title?: string;
  children?: React.ReactNode;
}

const AccordionMenu: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classNames("accordion", { open: isOpen })}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <div className="accordion-title">{title}</div>
        <div className={classNames("accordion-icon", { open: isOpen })}></div>
      </div>
      <If condition={isOpen}>
        <div className="accordion-content">{children}</div>
      </If>
    </div>
  );
};

export default AccordionMenu;

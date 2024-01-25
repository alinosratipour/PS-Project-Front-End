import React, { ReactNode, useState } from "react";
import classNames from "classnames";
import "./ToolTip.scss";

interface TooltipProps {
  content: string;
  children: ReactNode;
  conditionToShowTooltip: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  conditionToShowTooltip,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const tooltipClasses = classNames("tooltip", {
    active: isHovered && conditionToShowTooltip,
  });

  return (
    <div className="tooltip-container">
      <div
        className={tooltipClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
        <span className="tooltip-text">{content}</span>
      </div>
    </div>
  );
};

export default Tooltip;

// ! Instruction (Remove this)
// * Send text, side (optional) as props.
// * as children send content
//  <CustomTooltip text="Custom Tooltip" side="right">
//  <span>Hover for tooltip</span>
//  </CustomTooltip>

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface Props {
  text: string;
  side?: "left" | "right" | "top" | "bottom";
  children: React.ReactNode;
}

const CustomTooltip = ({
  children,
  text = "Pass text",
  side = "top",
}: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CustomTooltip;

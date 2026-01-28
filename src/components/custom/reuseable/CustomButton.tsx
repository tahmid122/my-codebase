import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface Props {
  classes?: string;
  children: React.ReactNode;
  isLink?: boolean;
  href?: string;
}
const CustomButton = ({
  classes,
  children,
  isLink = false,
  href = "/",
}: Props) => {
  return (
    <>
      {isLink ? (
        <Link href={href}>
          <Button className={`${classes}`}>{children}</Button>
        </Link>
      ) : (
        <Button className={`${classes}`}>{children}</Button>
      )}
    </>
  );
};

export default CustomButton;

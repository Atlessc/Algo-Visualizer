import React from "react";
import { cn } from "../../lib/utils";
import { buttonVariants } from "./button-variants";

const Button = React.forwardRef(function Button(
  { className, variant, size, type = "button", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
});

export { Button };

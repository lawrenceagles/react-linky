import * as React from "react";

import Parse from "./Parse";

export type LinkyProps = {
  className?: string;
  email?: boolean;
};

const Linky: React.FC<LinkyProps> = ({ children, className, email = true }) => {
  if (typeof children === "string") {
    return <Parse email={email} className={className} text={children} />;
  } else if (
    React.isValidElement(children) &&
    children.type !== "a" &&
    children.type !== "button"
  ) {
    return React.cloneElement(
      children,
      undefined,
      <Linky email={email} className={className}>
        {children.props.children}
      </Linky>
    );
  } else if (Array.isArray(children)) {
    return (
      <>
        {children.map((child) => (
          <Linky email={email} className={className}>
            {child}
          </Linky>
        ))}
      </>
    );
  }
  return <>{children}</>;
};

export default Linky;

import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

const Button: FC<PropsWithChildren<ButtonHTMLAttributes<any>>> = ({
  children,
  className,
  ...props
}) => {
  return <button className={`btn ${className}`} {...props}>{children}</button>;
};

export default Button;
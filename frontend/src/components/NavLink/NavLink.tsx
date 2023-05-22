import { FC, HTMLProps } from "react";
import {
  getCurrentPathBase,
  getCurrentPathName,
  getPathBase,
} from "@/utils/Url/Url";

interface NavLinkProps extends HTMLProps<HTMLAnchorElement> {
  href: string;
}

const NavbarLink: FC<NavLinkProps> = (props) => {
  const active = getCurrentPathBase() === getPathBase(props.href);

  const isEntryPage =
    getCurrentPathName() === "/login" || getCurrentPathName() === "/register";

  return (
    <>
      {!isEntryPage ? (
        <a
          {...props}
          className={`nav-link ${active ? "active" : ""} ${props.className}`}
        >
          {props.children}
        </a>
      ) : null}
    </>
  );
};

export default NavbarLink;

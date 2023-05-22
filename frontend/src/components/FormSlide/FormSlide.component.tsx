import {FC, HTMLProps } from "react";

interface FormSlideProps extends HTMLProps<HTMLDivElement>{
  active:boolean;
}

const FormSlide:FC<FormSlideProps> = (props) => {
  return <div {...props} className={`form-slide ${props.active ? "active" : ""} ${props.className}`}>
    {props.children}
  </div>
}

export default FormSlide;
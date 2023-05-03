import {FC, ReactEventHandler, SyntheticEvent} from "react";
import {FieldProps} from "@/components/Field/Field";
import {assertDefined} from "@/utils/error/assert";
import "@/components/SelectField/SelectField.style.css";

export interface SelectFieldProps extends FieldProps{
  htmlId:string;
  label:string;
  options:string[];
}

const SelectField:FC<SelectFieldProps> = (props) => {
  const renderOptions = () => {
    return props.options.map((option) => <option value={option}>{option}</option>);
  }

  const onChange: ReactEventHandler = (
    e: SyntheticEvent<HTMLSelectElement>
  ) => {
    assertDefined(props.updateValue);
    props.updateValue(e.currentTarget.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return <div className={`select-field ${props.className ?? ""}`}>
    <label  className={"muted me-3"}>{props.label}</label>
    <select id={props.htmlId} onChange={onChange}>
      {
        renderOptions()
      }
    </select>
  </div>
}

export default SelectField;
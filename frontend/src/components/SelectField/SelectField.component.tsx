import { FC, ReactEventHandler, SyntheticEvent, useContext } from "react";
import { FieldProps } from "@/components/Field/Field";
import { assertDefined } from "@/utils/error/assert";
import "@/components/SelectField/SelectField.style.css";
import { FormReadonlyContext } from "@/components/Form/Form.component";

export interface SelectFieldProps extends FieldProps {
  htmlId: string;
  label: string;
  options: string[];
}

const SelectField: FC<SelectFieldProps> = (props) => {
  const readonly = useContext(FormReadonlyContext);
  const renderOptions = () => {
    return props.options.map((option) => (
      <option value={option}>{option}</option>
    ));
  };

  const onChange: ReactEventHandler = (
    e: SyntheticEvent<HTMLSelectElement>
  ) => {
    assertDefined(props.updateValue);
    props.updateValue(e.currentTarget.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className={`select-field d-flex flex-column ${props.className ?? ""}`}>
      <label className={"muted me-3"}>{props.label}</label>
      <select disabled={readonly} id={props.htmlId} onChange={onChange}>
        {renderOptions()}
      </select>
    </div>
  );
};

export default SelectField;

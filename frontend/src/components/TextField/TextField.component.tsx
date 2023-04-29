import { FieldProps } from "../Field/Field";
import {
  FC,
  ReactEventHandler,
  SyntheticEvent,
  useContext,
  useMemo,
} from "react";
import { assertDefined } from "@/utils/error/assert";
import { FormIdContext } from "../Form/Form";
import "./TextField.style.css";

export interface TextFieldProps extends FieldProps {
  label: string;
  minLength?: number;
  maxLength?: number;
}

export interface NumberFieldProps extends FieldProps{
  label:string;
  min?: number;
  max?: number;
  incrementButton ?: boolean;
  incrementSize ?: number;
}

const TextField: FC<TextFieldProps> = (props) => {
  const formId = useContext(FormIdContext);
  const htmlId = useMemo(() => `${formId}-${props.name}`, []);

  const onChange: ReactEventHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    assertDefined(props.updateValue);
    props.updateValue(e.currentTarget.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div id={htmlId} className={"text-field " + (props.className??"")}>
      <label htmlFor={htmlId + "-input"} className={"muted"}>{props.label}</label>
      <input
        id={htmlId + "-input"}
        type={props.type}
        onChange={onChange}
        maxLength={props.maxLength}
      />
    </div>
  );
};

export default TextField;

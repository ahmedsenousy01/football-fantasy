import { FieldProps } from "@/components/Field/Field";
import {
  FC,
  ReactEventHandler,
  SyntheticEvent,
  useCallback,
  useContext,
} from "react";
import { assertDefined } from "@/utils/error/assert";
import "./TextField.style.css";
import { FormReadonlyContext } from "@/components/Form/Form.component";

export interface TextFieldProps extends FieldProps {
  htmlId: string;
  label: string;
  minLength?: number;
  maxLength?: number;
}

export interface NumberFieldProps extends FieldProps {
  htmlId: string;
  label: string;
  min?: number;
  max?: number;
  incrementButton?: boolean;
  incrementSize?: number;
}

const TextField: FC<TextFieldProps> = (props) => {
  const readonly = useContext(FormReadonlyContext);

  const onChange: ReactEventHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    assertDefined(props.updateValue);
    let value;
    if (props.type === "number") {
      value = parseInt(e.currentTarget.value);
    } else {
      value = e.currentTarget.value;
    }
    props.updateValue(value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const renderField = useCallback(() => {
    return (
      <div
        id={props.htmlId}
        className={"text-field " + (props.className ?? "")}
      >
        <label htmlFor={props.htmlId + "-input"} className={"muted"}>
          {props.label}
        </label>
        <input
          id={props.htmlId + "-input"}
          type={props.type}
          onChange={onChange}
          maxLength={props.maxLength}
          readOnly={readonly}
          value={props.value}
        />
      </div>
    );
  }, [readonly, props.value]);

  return renderField();
};

export default TextField;

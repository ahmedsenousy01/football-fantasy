import { FC, ReactEventHandler, useCallback, useContext, useMemo } from "react";
import { ValidationFunc } from "@/utils/validation/validation";
import TextField, {
  TextFieldProps,
} from "@/components/TextField/TextField.component";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { FormIdContext } from "@/components/Form/Form.component";
import { addField, updateField } from "@/store/Forms/Forms.slice";
import { FieldValue } from "@/store/Forms/Forms.types";
import SelectField, {
  SelectFieldProps,
} from "@/components/SelectField/SelectField.component";
import { assertDefined } from "@/utils/error/assert";
import { useSelector } from "react-redux";
import { createFieldSelector } from "@/store/Forms/Forms.selectors";

export interface FieldProps {
  fieldName: string;
  label?: string;
  type: "number" | "text" | "select" | "radio" | "checkbox" | "password";
  options?: string[];
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
  validation?: ValidationFunc[];
  onChange?: ReactEventHandler;
  updateValue?: (nextValue: FieldValue) => void;
  updateValidation?: (validation: ValidationFunc[]) => void;
  required?: boolean;
  initialValue?: FieldValue | null;
  className?: string;
  value?: FieldValue;
}

const Field: FC<FieldProps> = (props) => {
  const dispatch = useAppDispatch();
  const formId = useContext(FormIdContext);
  const htmlId = useMemo(() => {
    return `${formId}-${props.fieldName}`;
  }, [props.fieldName]);
  const getDefaultValue = (): FieldValue => {
    if (props.initialValue != undefined) {
      return props.initialValue;
    }

    switch (props.type) {
      case "password":
      case "text":
        return "";
      case "number":
        return 0;
      case "select":
        assertDefined(props.options);
        return props.options[0];
      default:
        throw Error(`no default type implemented for ${props.type} fields"`);
    }
  };

  useMemo(() => {
    dispatch(
      addField({
        formId: formId,
        name: props.fieldName,
        value: getDefaultValue(),
      })
    );
  }, []);

  const field = useSelector(createFieldSelector(formId, props.fieldName));

  const updateValue = (nextValue: FieldValue) => {
    dispatch(
      updateField({
        formId: formId,
        name: props.fieldName,
        value: nextValue,
      })
    );
  };

  const renderField = useCallback(() => {
    const fieldProps = { ...props };
    fieldProps.updateValue = updateValue;

    switch (props.type) {
      case "password":
      case "text":
      case "number":
        const textFieldProps = fieldProps as TextFieldProps;
        return (
          <TextField value={field.value} {...textFieldProps} htmlId={htmlId} />
        );

      case "select":
        const selectFieldProps = fieldProps as SelectFieldProps;
        return (
          <SelectField
            value={field.value}
            {...selectFieldProps}
            htmlId={htmlId}
          />
        );

      default:
        throw new Error(`field type "${props.type}" not implemented`);
    }
  }, [field]);

  return <>{renderField()}</>;
};

export default Field;

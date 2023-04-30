import { FC, ReactEventHandler, useCallback, useContext, useMemo } from 'react';
import { ValidationFunc } from '@/utils/validation/validation';
import TextField, { TextFieldProps } from '@/components/TextField/TextField';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { FormIdContext } from '@/components/Form/Form';
import { addField, updateField } from '@/store/Forms/Forms.slice';
import NumberField, {
	NumberFieldProps,
} from '@/components/NumberField/NumberField';

export interface FieldProps {
	name: string;
	label?: string;
	type: 'number' | 'text' | 'select' | 'radio' | 'checkbox' | 'password';
	validation?: ValidationFunc[];
	onChange?: ReactEventHandler;
	updateValue?: (nextValue: string | number | boolean) => void;
	updateValidation?: (validation: ValidationFunc[]) => void;
	required?: boolean;
	initialValue?: string | number | boolean;
}

const Field: FC<FieldProps> = (props) => {
	const dispatch = useAppDispatch();
	const formId = useContext(FormIdContext);

	const getDefaultValue = () => {
		if (props.initialValue !== undefined) {
			return props.initialValue;
		}

		switch (props.type) {
			case 'password':
			case 'text':
				return '';
			case 'number':
				return 0;
			default:
				throw Error(
					`no default type implemented for ${props.type} fields"`
				);
		}
	};

	useMemo(() => {
		dispatch(
			addField({
				formId: formId,
				name: props.name,
				value: getDefaultValue(),
			})
		);
	}, []);

	// useEffect(() => {
	//   const validation = getValidation();
	//
	//   dispatch(
	//     setFieldValidation({
	//       formId: formId,
	//       name: props.name,
	//       validation: validation,
	//     })
	//   );
	// }, []);

	const updateValue = (nextValue: string | number | boolean) => {
		dispatch(
			updateField({
				formId: formId,
				name: props.name,
				value: nextValue,
			})
		);
	};

	const renderField = useCallback(() => {
		const fieldProps = { ...props };
		fieldProps.updateValue = updateValue;

		switch (props.type) {
			case 'password':
			case 'text':
				const textFieldProps = fieldProps as TextFieldProps;
				return <TextField {...textFieldProps} />;

			case 'number':
				const numberFieldProps = fieldProps as NumberFieldProps;
				return <NumberField {...numberFieldProps} />;

			default:
				throw new Error(`field type "${props.type}" not implemented`);
		}
	}, []);

	// const getValidation = () => {
	//   const validation: ValidationFunc[] = props.validation ?? [];
	//   const required = props.required ?? true;
	//   if (required) {
	//     validation.push(validateRequired());
	//   }
	//
	//   if (props.type === "text") {
	//     const fieldProps = props as TextFieldProps;
	//     if (fieldProps.minLength !== undefined) {
	//       validation.push(validateMinLength(fieldProps.minLength));
	//     }
	//     if (fieldProps.maxLength !== undefined) {
	//       validation.push(validateMaxLength(fieldProps.maxLength));
	//     }
	//   }
	//
	//   if (props.type === "number") {
	//     const fieldProps = props as NumberFieldProps;
	//     const min = fieldProps.min ?? 0;
	//     validation.push(validateMinValue(min));
	//
	//     if (fieldProps.max !== undefined) {
	//       validation.push(validateMaxValue(fieldProps.max));
	//     }
	//   }
	//
	//   return validation;
	// };

	return <div>{renderField()}</div>;
};

export default Field;

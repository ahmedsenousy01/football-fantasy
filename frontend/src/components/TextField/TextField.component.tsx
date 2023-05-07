import { FieldProps } from "@/components/Field/Field";
import {
  FC,
  ReactEventHandler,
  SyntheticEvent,
} from "react";
import { assertDefined } from "@/utils/error/assert";
import "./TextField.style.css";

export interface TextFieldProps extends FieldProps {
	htmlId:string;
	label: string;
	minLength?: number;
	maxLength?: number;
}

export interface NumberFieldProps extends FieldProps {
	htmlId:string;
	label: string;
	min?: number;
	max?: number;
	incrementButton?: boolean;
	incrementSize?: number;
}

const TextField: FC<TextFieldProps> = (props) => {
	const onChange: ReactEventHandler = (
		e: SyntheticEvent<HTMLInputElement>
	) => {
		assertDefined(props.updateValue);
		props.updateValue(e.currentTarget.value);
		if (props.onChange) {
			props.onChange(e);
		}
	};

	return (
		<div id={props.htmlId} className={'text-field ' + (props.className ?? '')}>
			<label htmlFor={props.htmlId + '-input'} className={'muted'}>
				{props.label}
			</label>
			<input
				id={props.htmlId + '-input'}
				type={props.type}
				onChange={onChange}
				maxLength={props.maxLength}
			/>
		</div>
	);
};

export default TextField;

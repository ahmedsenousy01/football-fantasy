import {
	FC,
	ReactEventHandler,
	SyntheticEvent,
	useContext,
	useMemo,
} from 'react';
import { FieldProps } from '@/components/Field/Field';
import { FormIdContext } from '@/components/Form/Form';
import { assertDefined } from '@/utils/error/assert';

export interface TextFieldProps extends FieldProps {
	label: string;
	minLength?: number;
	maxLength?: number;
}

const TextField: FC<TextFieldProps> = (props) => {
	const formId = useContext(FormIdContext);
	const htmlId = useMemo(() => `${formId}-${props.name}`, []);

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
		<div>
			<label htmlFor={htmlId}>{props.label}</label>
			<input
				type={props.type}
				onChange={onChange}
				maxLength={props.maxLength}
			/>
		</div>
	);
};

export default TextField;

import { FieldProps } from '../Field/Field';
import {
	FC,
	ReactEventHandler,
	SyntheticEvent,
	useContext,
	useMemo,
} from 'react';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { FormIdContext } from '@/components/Form/Form';
import { assertDefined } from '@/utils/error/assert';

export interface NumberFieldProps extends FieldProps {
	label: string;
	numberButtons?: boolean;
	numberIncrement?: number;
	min?: number;
	max?: number;
}

const NumberField: FC<NumberFieldProps> = (props) => {
	const formId = useContext(FormIdContext);
	const htmlId = useMemo(() => `${formId}-${props.name}`, []);

	const onChange: ReactEventHandler = (
		e: SyntheticEvent<HTMLInputElement>
	) => {
		assertDefined(props.updateValue);
		props.updateValue(e.currentTarget.value);
		if (props.onChange !== undefined) {
			props.onChange(e);
		}
	};

	return (
		<div>
			<label htmlFor={htmlId}>{props.label}</label>
			<input type="number" onChange={onChange} />
		</div>
	);
};

export default NumberField;

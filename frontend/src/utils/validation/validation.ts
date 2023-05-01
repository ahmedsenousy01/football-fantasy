import assert, { _ } from '@/utils/error/assert';

interface ValidationResult {
	status: boolean;
	message?: string;
}

export type ValidationFunc = (value: number | string) => ValidationResult;

export function validateMinLength(min: number): ValidationFunc {
	return (value) => {
		assert(typeof value === 'string');
		const isValid = value.length >= min;
		return {
			status: isValid,
			message: isValid ? _ : `Length < ${min}`,
		};
	};
}

export function validateMaxLength(max: number): ValidationFunc {
	return (value) => {
		assert(typeof value === 'string');
		const isValid = value.length <= max;
		return {
			status: isValid,
			message: isValid ? _ : `Length > ${max}`,
		};
	};
}

export function validateMinValue(min: number): ValidationFunc {
	return (value) => {
		assert(typeof value === 'number');
		const isValid = value >= min;
		return {
			status: isValid,
			message: isValid ? _ : `Value < min (${min})`,
		};
	};
}

export function validateMaxValue(max: number): ValidationFunc {
	return (value) => {
		assert(typeof value === 'number');
		const isValid = value <= max;
		return {
			status: isValid,
			message: isValid ? '' : 'Value should be less than or equal to max',
		};
	};
}

export function validateDigitsOnly(): ValidationFunc {
	return (value) => {
		assert(
			typeof value === 'string',
			"Validating a 'number' for being digits-only"
		);
		const isValid = /^\d+$/.test(value);
		return {
			status: isValid,
			message: isValid ? '' : 'Expected digits only',
		};
	};
}

export function validateRequired(): ValidationFunc {
	return (value) => {
		assert(typeof value === 'string', 'Checking length of empty element?');
		const isValid = value.length > 0;
		return {
			status: isValid,
			message: isValid ? '' : 'Field Required',
		};
	};
}
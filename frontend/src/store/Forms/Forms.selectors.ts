// noinspection JSUnusedGlobalSymbols

import { RootState } from '../index';
import { assertDefined } from '@/utils/error/assert';
import { FormData } from './Forms.types';

export const createFormSelector = (formId: string) => {
	return (state: RootState): FormData => {
		const form = state.forms[formId];
		assertDefined(form);
		return form;
	};
};
export const createFieldSelector = (formId: string, fieldName: string) => {
	const formSelector = createFormSelector(formId);
	return (state: RootState) => {
		const form = formSelector(state);
		const field = form.fields[fieldName];
		assertDefined(
			form.fields[fieldName],
			`${fieldName} doesn't exist in form ${formId}`
		);
		return field;
	};
};

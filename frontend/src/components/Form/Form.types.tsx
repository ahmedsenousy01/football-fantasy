import { AxiosError, AxiosResponse } from 'axios';

export type FormSubmitHandler = (
	formResult: any
) => Promise<AxiosResponse | AxiosError>;
export type FormSuccessHandler = (data: unknown) => void;
export type FormErrorHandler = (error: AxiosResponse | AxiosError) => void;

export default interface FormBehaviorHandler {
	onSubmit: FormSubmitHandler;
	onSuccess: FormSuccessHandler;
	onError: FormErrorHandler;
}

export interface Message {
	type: 'success' | 'neutral' | 'warning' | 'error';
	content: string;
}

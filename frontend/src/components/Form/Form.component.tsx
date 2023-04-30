import {
  Context,
  createContext,
  FC,
  ReactNode,
  SyntheticEvent, useEffect,
  useMemo
} from "react";
import {useAppDispatch} from "@/hooks/redux-hooks";
import {addForm, deleteForm} from "@/store/Forms/Forms.slice";
import {useSelector} from "react-redux";
import {createFormSelector} from "@/store/Forms/Forms.selectors";
import {FieldValue} from "@/store/Forms/Forms.types";
import {AxiosError, AxiosResponse} from "axios";
import {FormErrorHandler, FormSubmitHandler, FormSuccessHandler} from "@/components/Form/Form.types";


interface FormProps {
  id: string;
  onSubmit: FormSubmitHandler;
  onSuccess?: FormSuccessHandler;
  onError?: FormErrorHandler;
  children?: ReactNode;
  className?: string;
}

export const FormIdContext: Context<string> = createContext<string>('');

const Form: FC<FormProps> = (props: FormProps) => {
	const dispatch = useAppDispatch();
	useMemo(() => {
		dispatch(addForm(props.id));
	}, []);
	useEffect(() => {
		return () => {
			dispatch(deleteForm(props.id));
		};
	});

	const formData = useSelector(createFormSelector(props.id));

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		const fields = formData.fields;
		const formResult: Record<string, FieldValue> = {};
		for (let fieldName in fields) {
			formResult[fieldName] = fields[fieldName].value;
		}

		const response = await props.onSubmit(formResult);
		const success =
			!(response instanceof AxiosError) && response.status < 400;

		if (success) {
			props.onSuccess ? props.onSuccess(response.data) : null;
		} else {
			props.onError ? props.onError(response) : null;
		}
	};

  return (
    <FormIdContext.Provider value={props.id}>
      <form id={props.id + "-form"} className={"form " + (props.className ?? "")} onSubmit={handleSubmit} >
        {props.children}
      </form>
    </FormIdContext.Provider>
  );
}

export default Form;
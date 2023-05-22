import {
  Context,
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useMemo,
} from "react";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { addForm, deleteForm } from "@/store/Forms/Forms.slice";
import { useSelector } from "react-redux";
import { createFormSelector } from "@/store/Forms/Forms.selectors";
import { AxiosError } from "axios";
import {
  FormErrorHandler,
  FormSubmitHandler,
  FormSuccessHandler,
  Message,
} from "@/components/Form/Form.types";
import { Queue } from "@/types/Queue";

export const createDefaultOnError = (
  setMessage?: Dispatch<SetStateAction<Message | null>>
): FormErrorHandler => {
  return (error) => {
    if (error instanceof AxiosError) {
      const { response, status, message } = error;
      console.log("response: ", response);
      console.log("status: ", status);

      const displayMessage: Message = {
        type: "neutral",
        content: message,
      };
      if (setMessage) {
        setMessage(displayMessage);
      } else {
        console.log(displayMessage);
      }
    } else {
      const { status, data } = error;
      console.log("Request response: ", status);
      console.log(data);
      const errorMessage: Message = {
        type: "error",
        content: (data.message as string).split("|")[0],
      };
      if (setMessage) {
        setMessage(errorMessage);
      } else console.log(errorMessage);
    }
  };
};

interface FormProps {
  id: string;
  onSubmit: FormSubmitHandler;
  onSuccess?: FormSuccessHandler;
  onError?: FormErrorHandler;
  children?: ReactNode;
  className?: string;
  readonly?: boolean;
}

export const FormIdContext: Context<string> = createContext<string>("");
export const FormReadonlyContext: Context<boolean> = createContext(false);

const Form: FC<FormProps> = (props: FormProps) => {
  const dispatch = useAppDispatch();
  useMemo(() => {
    dispatch(addForm(props.id));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(deleteForm(props.id));
    };
  }, []);

  const formData = useSelector(createFormSelector(props.id));

  const handleSubmit = async (e: SyntheticEvent) => {
    const nativeEvent = e.nativeEvent as SubmitEvent;
    console.log(nativeEvent.submitter);
    e.preventDefault();

    const fields = formData.fields;
    const formResult: Record<string, any> = {};
    for (let fieldName in fields) {
      const directoryQueue = new Queue(fieldName.split("/"));
      let currentSection = formResult;

      while (directoryQueue.length > 1) {
        const sectionName = directoryQueue.pop();
        if (currentSection[sectionName] === undefined) {
          currentSection[sectionName] = {};
        }
        currentSection = currentSection[sectionName];
      }
      currentSection[directoryQueue.pop()] = fields[fieldName].value;
    }

    const response = await props.onSubmit(formResult);
    const success = !(response instanceof AxiosError) && response.status < 400;

    if (success) {
      props.onSuccess ? props.onSuccess(response.data) : null;
    } else {
      props.onError ? props.onError(response) : null;
    }
  };

  return (
    <FormIdContext.Provider value={props.id}>
      <FormReadonlyContext.Provider value={props.readonly || false}>
        <form
          id={props.id + "-form"}
          className={"form " + (props.className ?? "")}
          onSubmit={handleSubmit}
        >
          {props.children}
        </form>
      </FormReadonlyContext.Provider>
    </FormIdContext.Provider>
  );
};

export default Form;

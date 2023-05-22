import { FC } from "react";
import { Message } from "@/components/Form/Form.types";
import Loader from "@/components/Loader";

interface FormStatusProps {
  isLoading: boolean;
  message: Message | null;
}

const FormStatus: FC<FormStatusProps> = (props) => {
  return (
    <>
      {props.isLoading ? (
        <Loader />
      ) : (
        props.message && (
          <p className={`message ${props.message.type}-message`}>
            {props.message.content}
          </p>
        )
      )}
    </>
  );
};

export default FormStatus;

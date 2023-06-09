import { FC, useState } from "react";
import RegisterPage from "@/routes/RegisterPage/RegisterPage.component";
import {
  FormErrorHandler,
  FormSubmitHandler,
  FormSuccessHandler,
  Message,
} from "@/components/Form/Form.types";
import { useNavigate } from "react-router-dom";
import { createDefaultOnError } from "@/components/Form/Form.component";
import {
  registerRequest,
  RegisterRequestBody,
  RegisterResponseData,
} from "@/api/requests/User";

const RegisterPageContainer: FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [formSlide, setFormSlide] = useState(0);
  const navigate = useNavigate();

  const onSubmit: FormSubmitHandler = async (
    formResult: RegisterRequestBody
  ) => {
    setLoading(true);
    console.log("form data: ", formResult);
    const registerResponse = await registerRequest(formResult);
    setLoading(false);
    return registerResponse;
  };

  const onSuccess: FormSuccessHandler = (data: unknown) => {
    const registerResponseData = data as RegisterResponseData;
    setMessage({
      type: "success",
      content: registerResponseData.message,
    });
    navigate("/login");
  };

  const onError: FormErrorHandler = createDefaultOnError(setMessage);

  return (
    <RegisterPage
      {...{
        onSubmit,
        onSuccess,
        onError,
        setFormSlide,
        isLoading,
        message,
        formSlide,
      }}
    />
  );
};

export default RegisterPageContainer;

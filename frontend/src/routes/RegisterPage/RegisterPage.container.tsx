import { FC, useState } from "react";
import RegisterPage from "@/routes/RegisterPage/RegisterPage.component";
import {
  FormErrorHandler,
  FormSubmitHandler,
  FormSuccessHandler,
  Message,
} from "@/components/Form/Form.types";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { useNavigate } from "react-router-dom";
import registerRequest, {
  RegisterRequestBody,
  ResultResponseData,
} from "@/api/requests/authentication/register";
import { fetchUserDetails } from "@/store/User/User.slice";

const RegisterPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const navigate = useNavigate();

  const onSubmit: FormSubmitHandler = async (
    formResult: RegisterRequestBody
  ) => {
    setLoading(true);
    const registerResponse = await registerRequest(formResult);
    setLoading(false);
    return registerResponse;
  };

  const onSuccess: FormSuccessHandler = (data: unknown) => {
    const registerResponseData = data as ResultResponseData;

    setMessage({
      type: "success",
      content: registerResponseData.message,
    });
    dispatch(fetchUserDetails());
  };

  const onError: FormErrorHandler = (error) => {};

  return (
    <RegisterPage
      {...{
        onSubmit,
        onSuccess,
        onError,
        isLoading,
        message,
      }}
    />
  );
};

export default RegisterPageContainer;

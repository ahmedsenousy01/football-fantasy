import { FC, useState } from "react";
import LoginPage from "@/routes/LoginPage/LoginPage.component";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { useNavigate } from "react-router-dom";
import loginRequest, {
  LoginRequestBody, LoginResponseData,
} from "@/api/requests/authentication/login";
import { setAuthToken } from "@/utils/auth/authorization";
import { fetchUserDetails } from "@/store/User/User.slice";
import {
	FormErrorHandler,
	FormSubmitHandler,
	FormSuccessHandler,
	Message,
} from '@/components/Form/Form.types';
import { AxiosError } from 'axios';
import { assertDefined } from '@/utils/error/assert';
import {createDefaultOnError} from "@/components/Form/Form.component";

const LoginPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const navigate = useNavigate();

  const onSubmit: FormSubmitHandler = async (formResult: LoginRequestBody) => {
    setLoading(true);
    const response = await loginRequest(formResult);
    setLoading(false);
    assertDefined(response);
    return response;
  };

  const onSuccess: FormSuccessHandler = (data: unknown) => {
    const { data: loginResponseData } = data as LoginResponseData;
    assertDefined(loginResponseData.auth_token);
    setAuthToken(loginResponseData.auth_token);
    setMessage({
      type: "success",
      content: loginResponseData.message,
    });
    dispatch(fetchUserDetails());
    navigate("/profile");
  };

	const onError: FormErrorHandler = createDefaultOnError(setMessage);

  return (
    <LoginPage
      {...{
        message,
        isLoading,
        onSubmit,
        onSuccess,
        onError,
      }}
    />
  );
}

export default LoginPageContainer;

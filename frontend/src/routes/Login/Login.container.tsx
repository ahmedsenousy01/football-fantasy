import { FC, useState } from "react";
import Login from "./Login.component";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { useNavigate } from "react-router-dom";
import loginRequest, {
  LoginDetails,
} from "@/api/requests/authentication/login";
import { setAuthToken } from "@/utils/auth/authorization";
import { fetchUserDetails } from "@/store/User/User.slice";
import {
  FormErrorHandler,
  FormSubmitHandler,
  FormSuccessHandler,
  Message,
} from "@/components/Form/Form.types";
import { AxiosError } from "axios";
import { assertDefined } from "@/utils/error/assert";

const LoginContainer: FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const navigate = useNavigate();

  const onSubmit: FormSubmitHandler = async (formResult: any) => {
    setLoading(true);
    const response = await loginRequest(formResult as LoginDetails);
    setLoading(false);
    assertDefined(response);
    return response;
  };

  const onSuccess: FormSuccessHandler = (data: unknown) => {
    console.log(data);
    const { data: loginResponseData } = data as {
      data: { auth_token: string; message: string };
    };
    setAuthToken(loginResponseData.auth_token);
    setMessage({
      type: "success",
      content: loginResponseData.message,
    });
    dispatch(fetchUserDetails());
  };

  const onError: FormErrorHandler = (error) => {
    if (error instanceof AxiosError) {
      const { response, status, message } = error;
      console.log("response: ", response);
      console.log("status: ", status);
      setMessage({
        type: "neutral",
        content: message,
      });
    } else {
      const { status, data } = error;
      console.log("Request response: ", status);
      console.log(data);
      setMessage({
        type: "error",
        content: (data.message as string).split("|")[0],
      });
    }
  };

  return (
    <Login
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

export default LoginContainer;

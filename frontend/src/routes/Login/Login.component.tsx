import {FC, useState} from "react";
import Form from "@/components/Form/Form";
import Field from "@/components/Field/Field";
import loginRequest, { LoginDetails } from "@/api/requests/authentication/login";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { useNavigate } from "react-router-dom";
import { fetchUserDetails } from "@/store/User/User.slice";
import { setAuthToken } from "@/utils/auth/authorization";
import Button from "@/components/Button";
import "./login.style.css";
import { AxiosError, AxiosResponse } from "axios";
import FormBehaviorHandler, { Message } from "@/components/Form/Form.types";
import Loader from "@/components/Loader";

interface LoginProps extends FormBehaviorHandler {
  isLoading: boolean;
  message: Message | null;
}

const Login: FC<LoginProps> = (props) => {
  return (
    <div
      id="login-page"
      className={
        "form-page page-wrapper d-flex justify-content-center align-items-center"
      }
    >
      <main className={"large-form-main p-0 m-2 m-sm-0"}>
        <div className={"row h-100 flex-col flex-lg-row"}>
          <div className="front-img-container col-lg-8 p-0 h-0">
            <div className={"background-cover front-img"} />
          </div>
          <div className="col-lg-4 pe-5 d-flex flex-column justify-content-center">
            <div className={"form-container ms-3"}>
              <h3 className={"m-0"}>Login</h3>
              <p className="mb-4 muted">Login to your account</p>
              <FormComponent
                id="login"
                onSubmit={props.onSubmit}
                onSuccess={props.onSuccess}
                onError={props.onError}
              >
                <Field name={"email"} label={"email"} type={"text"} />
                <Field name={"password"} label={"password"} type={"password"} />
                {
                  props.isLoading ?
                    <Loader/>
                  :
                    (props.message && (
                    <p className={`message ${props.message.type}-message`}>
                      {props.message.content}
                    </p>))
                }
                <Button className={ props.message ? "" : "mt-4"} role={"submit"}>
                  Login
                </Button>
              </FormComponent>
              <p className="muted mt-2">
                Don't have an account? <Link to={"/register"}>signup</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Login;

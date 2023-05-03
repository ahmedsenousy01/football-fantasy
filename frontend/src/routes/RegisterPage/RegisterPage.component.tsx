import {FC} from "react";
import FormComponent from "@/components/Form/Form.component";
import Field from "@/components/Field/Field";
import Loader from "@/components/Loader";
import Button from "@/components/Button/Button";
import {Link} from "react-router-dom";
import FormBehaviorHandler, {Message} from "@/components/Form/Form.types";
import "@/routes/RegisterPage/RegisterPage.style.css"

interface RegisterPageProps extends FormBehaviorHandler {
  isLoading: boolean;
  message: Message | null;
}

const RegisterPage:FC<RegisterPageProps> = (props) => {
  return(
    <div className="page-wrapper">
      <div
        id="register-page"
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
                  id="register"
                  onSubmit={props.onSubmit}
                  onSuccess={props.onSuccess}
                  onError={props.onError}
                >
                  <Field name={"firstName"} label={"first name"} type={"text"}/>
                  <Field name={"lastName"} label={"last name"} type={"text"}/>
                  <Field name={"email"} label={"email"} type={"text"} />
                  <Field name={"password"} label={"password"} type={"password"} />
                  <Field name={"confirmPassword"} label={"confirm password"} type={"password"} />
                  {props.isLoading ? (
                    <Loader />
                  ) : (
                    props.message && (
                      <p className={`message ${props.message.type}-message`}>
                        {props.message.content}
                      </p>
                    )
                  )}
                  <Button className={props.message ? "" : "mt-4"} role={"submit"}>
                    Register
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
    </div>
  )
}

export default RegisterPage;
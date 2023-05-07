import {Dispatch, FC, SetStateAction} from "react";
import Form from "@/components/Form/Form.component";
import Field from "@/components/Field/Field";
import Button from "@/components/Button/Button";
import {Link} from "react-router-dom";
import FormBehaviorHandler, {Message} from "@/components/Form/Form.types";
import "@/routes/RegisterPage/RegisterPage.style.css";
import FormStatus from "@/components/FormStatus/FormStatus.component";

import {allLeagues} from "../../types/Game";

interface RegisterPageProps extends FormBehaviorHandler {
  isLoading: boolean;
  message: Message | null;
  formSlide: number;
  setFormSlide: Dispatch<SetStateAction<number>>;
}

const RegisterPage: FC<RegisterPageProps> = (props) => {
  return (
    <div
      id="register-page"
      className={
        "form-page page-wrapper d-flex justify-content-center align-items-center h-lg-100"
      }
    >
      <main className={"large-box-main p-0 m-2 m-lg-0"}>
        <div className={"row h-100 flex-col flex-lg-row"}>
          <div className="front-img-container col-lg-6 p-0">
            <div className={"background-cover front-img"} />
          </div>
          <div className="col-lg-6 pe-5 d-flex flex-column justify-content-center">
            <div className={"form-container ms-3"}>
              <h3 className={"m-0"}>Get Started</h3>
              <p className="mb-4 muted">Create an account</p>
              <Form
                id="register"
                onSubmit={props.onSubmit}
                onSuccess={props.onSuccess}
                onError={props.onError}
              >
                <div className={"row g-0"}>
                  <Field
                    fieldName={"firstName"}
                    label={"first name"}
                    type={"text"}
                    className={"col-6 pe-2"}
                  />
                  <Field
                    fieldName={"lastName"}
                    label={"last name"}
                    type={"text"}
                    className={"col-6"}
                  />
                </div>
                <Field fieldName={"email"} label={"email"} type={"text"} />
                <Field
                  fieldName={"password"}
                  label={"password"}
                  type={"password"}
                />
                <Field
                  fieldName={"confirmPassword"}
                  label={"confirm password"}
                  type={"password"}
                />
                <Field
                  fieldName={"accountLeague"}
                  label={"League"}
                  type={"select"}
                  options={[...allLeagues]}
                />
                <FormStatus isLoading={props.isLoading} message={props.message}/>
                <Button
                  className={props.message ? "" : "mt-4"}
                  role={"submit"}
                >
                  Register
                </Button>
              </Form>
              <p className="muted mt-2">
                Already have an account? <Link to={"/login"}>login</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;

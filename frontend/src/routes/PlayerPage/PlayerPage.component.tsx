import { FC, ReactEventHandler } from "react";
import { Player } from "@/types/Game";
import Form from "@/components/Form";
import Field from "@/components/Field/Field";
import {
  FormErrorHandler,
  FormSubmitHandler,
  Message,
} from "@/components/Form/Form.types";
import "./PlayerPage.style.css";
import { useSelector } from "react-redux";
import { selectEditingPlayer } from "@/store/Players/Players.slice";
import FormStatus from "@/components/FormStatus/FormStatus.component";
import { selectUserRole } from "@/store/User/User.slice";

interface PlayerPageProps extends Player {
  editing: boolean;
  message: Message | null;
  onSubmit: FormSubmitHandler;
  onError: FormErrorHandler;
  onCancel: ReactEventHandler;
  startEditing: ReactEventHandler;
  isLoading: boolean;
  onBuy: (playerId: string) => any;
}

const PlayerPage: FC<PlayerPageProps> = (props) => {
  const editing = useSelector(selectEditingPlayer);
  const role = useSelector(selectUserRole);

  return (
    <div className="page-wrapper">
      <main className={"container box-main p-3"}>
        <Form
          id={"player"}
          onSubmit={props.onSubmit}
          onError={props.onError}
          onSuccess={() => {}}
          readonly={!editing}
        >
          <div className="row gx-3">
            <div className="col-auto">
              <img src={props.picture} alt="" className={"rounded-2"} />
            </div>
            <div className="col">
              <Field
                label={"Name"}
                fieldName={"name"}
                type={"text"}
                initialValue={props.name}
              />
              <Field
                label={"Points"}
                fieldName={"points"}
                type={"number"}
                initialValue={props.points}
              />
            </div>
          </div>
          <hr />
          <h2 className={"row mt-4"}>Statistics</h2>
          <div className="row gx-2 gy-2">
            <div className="col-md-6 col-lg-4">
              <div className="form-section">
                <h3>Games</h3>
                <Field
                  fieldName={"games/current"}
                  label={"current"}
                  type={"number"}
                  initialValue={props.statistics.games.current}
                />
                <Field
                  fieldName={"games/total"}
                  label={"total"}
                  type={"number"}
                  initialValue={props.statistics.games.total}
                />
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="form-section">
                <h3>Minutes per game</h3>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="form-section">
                <h3>Goals</h3>
                <Field
                  fieldName={"goals/current"}
                  label={"current"}
                  type={"number"}
                  initialValue={props.statistics.goals.current}
                />
                <Field
                  fieldName={"goals/total"}
                  label={"total"}
                  type={"number"}
                  initialValue={props.statistics.goals.total}
                />
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="form-section">
                <h3>Assists</h3>
                <Field
                  label={"current"}
                  fieldName={"assists/current"}
                  type={"number"}
                  initialValue={props.statistics.assists.current}
                />
                <Field
                  label={"total"}
                  fieldName={"assists/total"}
                  type={"number"}
                  initialValue={props.statistics.assists.total}
                />
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="form-section">
                <h3>Cards</h3>
                <div className="w-50 d-inline-block pe-2">
                  <h6 className={"message warning-message"}>Yellow</h6>
                  <Field
                    label={"current"}
                    fieldName={"cards/yellow/current"}
                    type={"number"}
                    initialValue={props.statistics.cards.yellow.current}
                  />
                  <Field
                    label={"total"}
                    fieldName={"cards/yellow/total"}
                    type={"number"}
                    initialValue={props.statistics.cards.yellow.total}
                  />
                </div>
                <div className="w-50 d-inline-block">
                  <h6 className={"message error-message"}>Red</h6>
                  <Field
                    label={"current"}
                    fieldName={"cards/red/current"}
                    type={"number"}
                    initialValue={props.statistics.cards.red.current}
                  />
                  <Field
                    label={"total"}
                    fieldName={"cards/red/total"}
                    type={"number"}
                    initialValue={props.statistics.cards.red.total}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="form-section">
                <h3>Defensive</h3>
                <div className="w-50 d-inline-block pe-2">
                  <h6>Current</h6>
                  <Field
                    label={"Saves"}
                    fieldName={"defensive/current/saves"}
                    type={"number"}
                    initialValue={props.statistics.defensive.current.saves}
                  />
                  <Field
                    label={"Penalty Saves"}
                    fieldName={"defensive/current/penaltySaves"}
                    type={"number"}
                    initialValue={
                      props.statistics.defensive.current.penaltySaves
                    }
                  />
                  <Field
                    label={"Clean Sheets"}
                    fieldName={"defensive/current/cleanSheets"}
                    type={"number"}
                    initialValue={
                      props.statistics.defensive.current.cleanSheets
                    }
                  />
                </div>
                <div className="w-50 d-inline-block">
                  <h6>Total</h6>
                  <Field
                    label={"Saves"}
                    fieldName={"defensive/total/saves"}
                    type={"number"}
                    initialValue={props.statistics.defensive.total.saves}
                  />
                  <Field
                    label={"Penalty Saves"}
                    fieldName={"defensive/total/penaltySaves"}
                    type={"number"}
                    initialValue={props.statistics.defensive.total.penaltySaves}
                  />
                  <Field
                    label={"Clean Sheets"}
                    fieldName={"defensive/total/cleanSheets"}
                    type={"number"}
                    initialValue={props.statistics.defensive.total.cleanSheets}
                  />
                </div>
              </div>
            </div>

            <div className="mb-2">
              <div className="form-section">
                <h3>Team</h3>
              </div>
            </div>
          </div>

          <FormStatus isLoading={props.isLoading} message={props.message} />

          <div className={"d-flex justify-content-end"}>
            {role === "admin" ? (
              props.editing ? (
                <>
                  <button
                    className={"btn me-2"}
                    type={"button"}
                    onClick={props.onCancel}
                  >
                    Cancel
                  </button>
                  <button className={"btn"} type={"submit"}>
                    Save Changes
                  </button>
                </>
              ) : (
                <button className={"btn"} onClick={props.startEditing}>
                  Edit Player
                </button>
              )
            ) : (
              <button className={"btn"} onClick={() => props.onBuy(props._id)}>
                Buy Player
              </button>
            )}
          </div>
        </Form>
      </main>
    </div>
  );
};

export default PlayerPage;

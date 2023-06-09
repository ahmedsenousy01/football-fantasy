import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assertDefined } from "@/utils/error/assert";
import { FieldValue, FormData, makeFormData } from "./Forms.types";

type FormsState = Record<string, FormData | null>;
const initialState: FormsState = {};

export interface UpdateFieldPayload {
  formId: string;
  name: string;
  value: FieldValue;
}

// export interface SetFieldValidationPayload{
//   formId : string ;
//   name : string;
//   validation ?: ValidationFunc[];
// }

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    addForm: (
      state: FormsState,
      { payload: formId }: PayloadAction<string>
    ) => {
      state[formId] = makeFormData(formId);
    },
    addField: (
      state: FormsState,
      { payload }: PayloadAction<UpdateFieldPayload>
    ) => {
      const form = state[payload.formId];
      assertDefined(form, "form " + payload.formId);
      form.fields[payload.name] = {
        name: payload.name,
        value: payload.value,
      };
    },
    deleteForm: (
      state: FormsState,
      { payload: formId }: PayloadAction<string>
    ) => {
      const nextState = { ...state };
      const form = nextState[formId];
      assertDefined(form, "form " + formId, "deleting non-existent form");
      nextState[formId] = null;
    },
    updateField: (
      state: FormsState,
      { payload }: PayloadAction<UpdateFieldPayload>
    ) => {
      const form = state[payload.formId];
      assertDefined(form, "form " + payload.formId);
      form.fields[payload.name].value = payload.value;
    },
    // setFieldValidation : (state , {payload}:PayloadAction<SetFieldValidationPayload>) => {
    //   const nextState = {...state};
    //   const form = nextState[payload.formId];
    //   assertDefined(form, "form " + payload.formId);
    //   form.fields[payload.name].validation = payload.validation;
    //   return nextState;
    // }
  },
});

export default formsSlice.reducer;
export const { addForm, addField, updateField, deleteForm } =
  formsSlice.actions;

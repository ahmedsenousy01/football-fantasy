export type FieldValue = string | number | boolean;

export interface FieldData {
  name: string;
  value: FieldValue;
  // validation ?: ValidationFunc[];
}
export interface FormData {
  id: string;
  fields: Record<string, FieldData>;
}

export function makeFormData(id: string): FormData {
  return {
    id: id,
    fields: {},
  };
}

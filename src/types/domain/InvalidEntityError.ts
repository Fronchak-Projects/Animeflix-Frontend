export type InvalidEntityError = {
  error: string;
  message: string;
  path: string;
  timestamp: string;
  status: number;
  errors?: FieldError[];
}

type FieldError = {
  fieldName: string;
  message: string;
}

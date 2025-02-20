export interface FormInputs {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface CustomInputInterface {
  name: "FirstName" | "LastName" | "Phone" | "Email";
  lableName: string;
  errors: { [key: string]: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: (el: HTMLInputElement) => void;
}

export interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

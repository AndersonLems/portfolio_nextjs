export type ContactFormInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactFormField = keyof ContactFormInput;

export type ContactFormErrors = Partial<Record<ContactFormField, string>>;

export type ContactFormResponse = {
  success: boolean;
  message: string;
  errors?: ContactFormErrors;
};

import type {
  ContactFormErrors,
  ContactFormInput,
  ContactFormResponse,
} from "@/types/contact";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeInput(input: ContactFormInput): ContactFormInput {
  return {
    name: input.name.trim(),
    email: input.email.trim(),
    subject: input.subject.trim(),
    message: input.message.trim(),
  };
}

export function validateContactInput(input: ContactFormInput): {
  data: ContactFormInput;
  errors: ContactFormErrors;
} {
  const data = normalizeInput(input);
  const errors: ContactFormErrors = {};

  if (data.name.length < 3) {
    errors.name = "Informe um nome com pelo menos 3 caracteres.";
  }

  if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "Informe um email válido.";
  }

  if (data.subject.length < 4) {
    errors.subject = "Informe um assunto com pelo menos 4 caracteres.";
  }

  if (data.message.length < 12) {
    errors.message = "A mensagem deve ter pelo menos 12 caracteres.";
  }

  return { data, errors };
}

export function createContactResponse(
  input: ContactFormInput,
): ContactFormResponse {
  const { errors } = validateContactInput(input);

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Revise os campos destacados e tente novamente.",
      errors,
    };
  }

  return {
    success: true,
    message:
      "Mensagem recebida com sucesso. Este endpoint ainda é um modelo inicial para integração futura.",
  };
}

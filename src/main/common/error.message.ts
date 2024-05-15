export const elysiaErrorMessage = (code: string): string => {
  switch (code) {
    case "UNKNOWN":
      return "Unknown error";
    case "VALIDATION":
      return "Validation error";
    case "NOT_FOUND":
      return "Route not found";
    case "PARSE":
      return "Parse error";
    case "INTERNAL_SERVER_ERROR":
      return "INTERNAL_SERVER error";
    case "INVALID_COOKIE_SIGNATURE":
      return "INTERNAL_SERVER error;";
    default:
      return "default error.";
  }
};

export const ErrorMessage = {
  elysiaErrorMessage,
};

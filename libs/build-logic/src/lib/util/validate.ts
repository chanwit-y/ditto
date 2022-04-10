import { ValidataErrorType } from "../@types/ErrorType";

export const validate = (tabel, data): ValidataErrorType[] => {
  let result: ValidataErrorType[] = [];
  // Check data in field
  tabel?.fields?.map((field) => {
    if (!!!data[field.name]) {
      if (field.requrie) {
        result = [
          ...result,
          {
            code: "401",
            message: `${field.name} is requrie`,
          },
        ];
      }
    }
  });
  // Check data is not over field
  Object.keys(data).map((key) => {
    if (!!!tabel?.fields?.find((f) => f.name === key)) {
      result = [
        ...result,
        {
          code: "405",
          message: `${key} is outside`,
        },
      ];
    }
  });
  return result;
};

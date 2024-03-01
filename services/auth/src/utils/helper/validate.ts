import passwordValidator from "password-validator";
export const checkValidPassword = (password: string) => {
  const schema = new passwordValidator();
  schema
    .is()
    .min(8)
    .has()
    .lowercase()
    .has()
    .digits(2)
    .has()
    .has()
    .not()
    .spaces();
  // return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
  //   password
  // );
  return schema.validate(password)
};

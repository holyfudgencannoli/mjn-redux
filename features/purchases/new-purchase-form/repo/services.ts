import { SubmitErrorHandler } from "react-hook-form";

  export const onError: SubmitErrorHandler<any> = (errors, e) => {
    let { ...ref } = errors;
    let prettyErrors = ref

    return console.log("These are the errors we've encountered: ", prettyErrors)
  }

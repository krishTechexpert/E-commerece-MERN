import * as Yup from "yup";

const nameValidate = {
    name:Yup.string().required("Required")
    .min(3, 'name is too short - should be 3 chars minimum.')
}

const emailValidate ={
    email:Yup.string().email("Invalid email address").required("Required")
}
const passwordValidate = {
    password: Yup.string()
            .required('No password provided.') 
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
}

const confirmPasswordValidate = {
    confirmPassword: Yup.string()
            .required('No password provided.') 
            .test('passwords-match', 'Passwords must match', function (value) {
                return this.parent.password === value;
            })    
};

// accept term and condition validate
const acceptRule={
  acceptConditions:Yup.bool() 
  .oneOf([true], "You must accept the terms and conditions")
}

const GenderValidate={
  gender:Yup.string().required('Required') 
}
 
// Register page
 export const SchemaRegisterValidation = Yup.object().shape({
    ...nameValidate,
    ...emailValidate,
    ...passwordValidate,
    ...confirmPasswordValidate,
    ...GenderValidate,
    ...acceptRule
   
  })
 
  // Login page
  export const SchemaLoginValidation = Yup.object().shape({
    ...emailValidate,
    ...passwordValidate,
 
  })

  // Update profile Page
  export const SchemaProfileUpdateValidation = Yup.object().shape({
    ...nameValidate,
    ...emailValidate,
    ...GenderValidate,

  })


  // Change password
  export const SchemaChangePasswordValidation = Yup.object().shape({
    oldPassword:passwordValidate.password,
    newPassword:passwordValidate.password,
    confirmPassword: Yup.string()
    .required('No password provided.') 
    .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.newPassword === value;
    }) 

  })

  // Forgot Passsword 
  export const SchemaForgotPasswordValidation = Yup.object().shape({
    ...emailValidate,
  })

  // Reset Passsword 
  export const SchemaResetPasswordValidation = Yup.object().shape({
    ...passwordValidate,
    ...confirmPasswordValidate,
  })

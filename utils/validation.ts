import * as Yup from 'yup';

// signUp form validation
export const validationSignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(1, 'First name must be at least 1 characters')
    .max(25, 'First name can’t be longer than 25 characters'),

  lastName: Yup.string()
    .required('Last name is required')
    .max(25, 'Last name can’t be longer than 25 characters'),

  email: Yup.string()
    .required('Email is required')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address'
    ),

  username: Yup.string().required('Username is required'),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  // .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
  // .matches(/[0-9]/, 'Password must contain at least one number')
  // .matches(/[\W_]/, 'Password must contain at least one special character')
  phoneNumber: Yup.string()
    .matches(/^\d+$/, 'Phone number must be numeric')
    .required('Phone number is required'),

  country: Yup.number()
    .required('Country is required'),
  // .oneOf(
  //   ['nigeria', 'ghana', 'cameroon', 'south Africa', 'kenya'],
  //   'Invalid country'
  // ),

  gender: Yup.number()
    .required('Gender is required'),
  // .oneOf(['male', 'female', 'other'], 'Invalid gender'),

  termsAccepted: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
  // profilePicture: Yup.string().required('Profile picture is required'),
});

export const validationSignInSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  // .matches(
  //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  //   'Please enter a valid email address'
  // ),
  password: Yup.string().required('Password is required'),
  // .min(8, 'Password must be at least 8 characters'),
  // .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
  // .matches(/[0-9]/, 'Password must contain at least one number')
  // .matches(/[\W_]/, 'Password must contain at least one special character'),
});

// forgetPassword form validation
export const validationforgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address'
    ),
});

// setNewPassword schema
export const validationSetNewPassword = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
// editProfile schema
export const validationEditProfile = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(5, 'First name must be at least 5 characters')
    .max(25, 'First name can’t be longer than 25 characters'),

  lastName: Yup.string()
    .required('Last name is required')
    .min(5, 'Last name must be at least 5 characters')
    .max(25, 'Last name can’t be longer than 25 characters'),

  email: Yup.string()
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address'
    ),

  country: Yup.string()
    .required('Country is required')
    .oneOf(
      ['Nigeria', 'Ghana', 'Cameroon', 'South Africa', 'Kenya'],
      'Invalid country'
    ),

  phoneNumber: Yup.string()
    .matches(/^\d+$/, 'Phone number must be numeric')
    .required('Phone number is required'),

  gender: Yup.string()
    .required('Gender is required')
    .oneOf(['male', 'female', 'other'], 'Invalid gender'),

  userName: Yup.string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(25, 'Username can’t be longer than 25 characters'),
});

export const validationBVNValidation = Yup.object().shape({
  surName: Yup.string()
    .required('Surname is required')
    .max(25, 'Surname can’t be longer than 25 characters'),

  firstName: Yup.string()
    .required('First name is required')

    .max(25, 'First name can’t be longer than 25 characters'),

  bvn: Yup.string()
    .required('BVN is required')
    .matches(/^\d+$/, 'BVN must be numeric')
    .min(11, 'BVN must be 11 digits')
    .max(11, 'BVN must be 11 digits'),

  dob: Yup.date()
    .required('Date of birth is required')
});

export const validationChangePassword = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Current Password is required')
    .min(8, 'Current Password must be at least 8 characters')
    .matches(/[0-9]/, 'Current Password must contain at least one number')
  ,

  newPassword: Yup.string()
    .required('New Password is required')
    .min(8, 'New Password must be at least 8 characters')
    .matches(/[0-9]/, 'New Password must contain at least one number')
  ,

  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});

export const validationPinChange = Yup.object().shape({
  setYourPin: Yup.string()
    .required('Set Your Pin is required')
    .length(4, 'PIN must be 4 digits'),

  confirmYourPin: Yup.string()
    .required('Confirm Your Pin is required')
    .oneOf([Yup.ref('setYourPin')], 'Pins must match'),
});

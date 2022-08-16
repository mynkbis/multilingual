const Validation = (value) => {
  let errors = {};
  if (!value.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(value.email)) {
    errors.username = "Please Enter a valid email Address";
  }
  if (!value.password) {
    errors.password = "Password is mandatory";
  } else if (value.password.length < 8) {
    errors.password = "Password must have atleast 8 Characters";
  }
  return errors;
};

export default Validation;
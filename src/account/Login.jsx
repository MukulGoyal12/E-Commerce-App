import React from "react";
import { useFormik, withFormik } from "formik";
import Input from "../tools/Input";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { login } from "../api";
import { withAlert, withUser } from "../providers/withHOC";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

const handleSubmit = async (values, bag) => {
  const { addUser, addAlert } = bag.props;
  try {
    const { user, token } = await login(values.email, values.password);
    addAlert("Logged in successfully", "success");
    addUser(user, token);
  } catch (error) {
    console.error(error.message);
    addAlert("Invalid email or password", "error");
  }
};

const Login = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  addUser,
  addAlert,
}) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center max-w-7xl w-full mx-auto p-2 gap-9">
      <h1 className="text-5xl font-bold self-start">Login</h1>
      <form className="w-full p-10  border" onSubmit={handleSubmit}>
        <Input
          name="email"
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <Input
          name="password"
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <button
          type="submit"
          className="bg-orange-400 hover:bg-orange-500 p-3 px-8 text-white rounded-md"
        >
          Login
        </button>
        <h1 className="text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/Signup" className="text-blue-500">
            Sign-Up
          </Link>
        </h1>
      </form>
    </div>
  );
};

const FormikLogin = withFormik({
  initialValues,
  validationSchema,
  handleSubmit,
  validateOnMount: true,
})(Login);

export default withAlert(withUser(FormikLogin));

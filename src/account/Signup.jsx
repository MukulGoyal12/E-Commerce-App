import React from "react";
import { useFormik, withFormik } from "formik";
import Input from "../tools/Input";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { signup } from "../api";
import { withAlert, withUser } from "../providers/withHOC";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  fullName: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

const handleSubmit = async (values, bag) => {
  const { addUser, addAlert } = bag.props;
  try {
    const { user, token } = await signup(
      values.fullName,
      values.email,
      values.password,
    );
    addAlert("Signed up successfully", "success");
    addUser(user, token);
  } catch (error) {
    console.error(error.message);
    addAlert("Invalid email or password", "error");
  }
};

const Signup = ({
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
      <h1 className="text-5xl font-bold self-start">Sign-Up</h1>
      <form className="w-full p-10  border" onSubmit={handleSubmit}>
        <Input
          name="fullName"
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
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
          Sign-Up
        </button>
        <h1 className="text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </h1>
      </form>
    </div>
  );
};

const FormikSignup = withFormik({
  initialValues,
  validationSchema,
  handleSubmit,
  validateOnMount: true,
})(Signup);

export default withAlert(withUser(FormikSignup));

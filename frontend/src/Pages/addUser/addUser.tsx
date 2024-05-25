import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { AddUsers } from "../../queries";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
interface FormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const MyForm: React.FC = () => {
  const history = useNavigate();
  const mutation = useMutation({
    mutationFn: AddUsers,
    onSuccess: () => {
      toast.success("User added Successfully!");
      history("/");
    },
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Must be exactly 10 digits")
        .max(10, "Must be exactly 10 digits")
        .required("Required"),
    }),
    onSubmit: (values) => {
      mutation.mutate({
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
      });
    },
  });

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <form onSubmit={formik.handleSubmit} className='space-y-4'>
        <h1 className='uppercase'>Add User</h1>
        <div>
          <input
            id='firstName'
            name='firstName'
            type='text'
            placeholder='First Name'
            className={`input input-bordered w-full max-w-xs ${
              formik.touched.firstName && formik.errors.firstName
                ? "input-error"
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className='text-red-500 text-sm'>
              {formik.errors.firstName}
            </div>
          ) : null}
        </div>

        <div>
          <input
            id='lastName'
            name='lastName'
            type='text'
            placeholder='Last Name'
            className={`input input-bordered w-full max-w-xs ${
              formik.touched.lastName && formik.errors.lastName
                ? "input-error"
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className='text-red-500 text-sm'>{formik.errors.lastName}</div>
          ) : null}
        </div>

        <div>
          <input
            id='phoneNumber'
            name='phoneNumber'
            type='text'
            placeholder='Phone Number'
            className={`input input-bordered w-full max-w-xs ${
              formik.touched.phoneNumber && formik.errors.phoneNumber
                ? "input-error"
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className='text-red-500 text-sm'>
              {formik.errors.phoneNumber}
            </div>
          ) : null}
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default MyForm;

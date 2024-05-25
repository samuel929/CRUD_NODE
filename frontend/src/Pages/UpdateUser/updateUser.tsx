import { useNavigate, useParams } from "react-router-dom";
import { GetUser, updateUser } from "../../queries";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { User } from "../../types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

interface FormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
function UpdateUser() {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState<FormValues | null>(null);
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  const updateUserMutation = useMutation({
    mutationFn: (data: any) => updateUser(data, id),
    onSuccess: () => {
      toast.success("User Updated");
      navigate("/");
    },
  });
  const getUserMutation = useMutation({
    mutationFn: GetUser,
    onSuccess: (data: any) => {
      setUser(data.data.data);
    },
  });

  const getUserInfo = () => {
    getUserMutation.mutate(id);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (user) {
      setInitialValues({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user]);

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: initialValues || {
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
      updateUserMutation.mutate(values, id);
    },
  });

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <form onSubmit={formik.handleSubmit} className='space-y-4'>
        <h1 className='uppercase'>Update User</h1>
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
}

export default UpdateUser;

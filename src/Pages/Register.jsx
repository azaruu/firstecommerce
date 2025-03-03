import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const validation = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm password is required"),
});

const Register = () => {
  const navigate = useNavigate();
    
  const [users,setusers]=useState([])

  const handleRegister = (values, { setSubmitting, resetForm }) => {
    axios.get("http://localhost:3000/user")
      .then((response) => {
        setusers(response.data)
        
        // Check if email already exists
       const SameUser=users.find((user) => user.email === values.email)
        if (SameUser) {
          alert("Email already registered!");
          setSubmitting(false); 
        } else {
          // Register new user
          axios.post("http://localhost:3000/user", {
            name: values.name,
            email: values.email,
            password: values.password,
            cart:[],
            orders:[]
          })
          .then(() => {
            toast.success("Registration successful!");
            resetForm();
            navigate("/login"); //  Navigate to login page
          })
          .catch((error) => {
            console.error("Error registering useril:", error);
          })
          .finally(() => {
            setSubmitting(false);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setSubmitting(false);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <Formik
          initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
          validationSchema={validation}
          onSubmit={handleRegister} //  Function properly assigned
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block font-medium">Name</label>
                <Field type="text" name="name" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
                <ErrorMessage name="name" component="small" className="text-red-500" />
              </div>

              <div>
                <label className="block font-medium">Email</label>
                <Field type="email" name="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
                <ErrorMessage name="email" component="small" className="text-red-500" />
              </div>

              <div>
                <label>Password</label> 
                <Field type="password" name="password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
                <ErrorMessage name="password" component="small" className="text-red-500" />
              </div>

              <div>
                <label>Confirm Password</label>
                <Field type="password" name="confirmPassword" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
                <ErrorMessage name="confirmPassword" component="small" className="text-red-500" />
              </div>

              <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
               disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
        <button onClick={()=>navigate('/')}>Home</button>
    </div>
  );
};

export default Register;

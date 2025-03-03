import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
 

  const handleLogin = (values, { setSubmitting }) => {
    axios.get("http://localhost:3000/user")
      .then((response) => {
        const users = response.data;
        const user = users.find((u) => u.email === values.email && u.password === values.password);
         
       

        if (user && user.blocked) {
            toast.error("Your account is blocked!");
            setSubmitting(false);
            return;
        }                                                                   
               
        if (user) {
          localStorage.setItem("userId",user.id)
           if(user.id==="0049"){
            toast.success("Admin Valid...")
              navigate("/adminpage") 
           }else{
             navigate("/");
             toast.success("Login successful Completed!"); 
           }
        }else {
          toast.error("Invalid email or password!");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting ,errors}) => (
            <Form className="space-y-4">
              <div>
                <label className="block font-medium">Email</label>
                <Field type="email" name="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
                 {errors.email&&<small>{errors.email}</small>}
              </div>

              <div>
                <label>Password</label>
                <Field type="password" name="password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
               {errors.password &&<small>{errors.password}</small>}
              </div>

              <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-600 transition duration-700 b" 
               disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik><br />
        <p className=""> You Dont Register ? 
          <Link to="/register" className="text-blue-600 hover:underline"> Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
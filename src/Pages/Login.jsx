import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../../Api/ApiServices";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (values, { setSubmitting }) => {
    const obj = {
  "email": values.email,
  "password": values.password
}
  console.log(obj);
    api.post('/Authentication/LOGIN', obj)
      .then((response) => {
        const user = response.data;
        console.log(user)

        if (user) {
        //localStorage.setItem("userId", user.$id);
          localStorage.setItem("userId", user.data.userId);
          localStorage.setItem("token",user.data.token);
if(user.IsBlock){
   toast.error("User Account Is Blocked")
}
          if (obj.email === "admin@shopnbuy.com") {
            toast.success("Admin Valid...");
            navigate("/adminpage");
          } else {
            toast.success("Login successful");
          // toast.success(user.data);
            console.log(user.data);
            
            navigate("/");
          }
        } else {
          toast.error("Invalid email or password!");
        }
      })
      .catch((error) => {
        console.error("Login Error:", error);
        toast.error("Login Failed! Check credentials.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block font-medium">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <ErrorMessage name="email" component="small" className="text-red-500" />
              </div>

              <div>
                <label>Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <ErrorMessage name="password" component="small" className="text-red-500" />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-600 transition duration-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
        <br />
        <p>
          You don't have an account?
          <Link to="/register" className="text-blue-600 hover:underline"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

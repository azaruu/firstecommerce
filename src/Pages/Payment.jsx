import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context.jsx/cartContext";
import axios from "axios";
import { api } from "../../Api/ApiServices";


  const orderValidation = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10,}$/, "Enter your full phone number")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
  });

  function Payment() {
    const navigate=useNavigate()
         const {fetchCart}=useCart();

    let handleorder =async ()=>{
          const id = localStorage.getItem("userId");
     const response = await api.get(`/Orders/PlacedOrders/${id}`);
     console.log(response.data);
       await fetchCart();
     navigate('/orderplaced');
    }





//     const {toPurchase,RemoveFromCart }=useCart()
//      const [addOrder,SetAddOrder]=useState();
// const userId = localStorage.getItem("userId")
//       useEffect(()=>{
//         api.get(`${userId}`)
//         .then((res)=>SetAddOrder(res.data.cart))
//     })
 return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Payment Details</h2>
        <Formik
          initialValues={{ name: "", email: "", phone: "", address: "" }}
          validationSchema={orderValidation}
          onSubmit={(values) => console.log(values)}
        >
          {(isSubmitting) => (
            <Form className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-gray-600 font-medium">Name</label>
                <Field
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-600 font-medium">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-600 font-medium">Phone</label>
                <Field
                  type="text"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <ErrorMessage name="phone" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-600 font-medium">Address</label>
                <Field
                  type="text"
                  name="address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <ErrorMessage name="address" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-black py-2 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
                onClick={
                  handleorder
                } >
                Submit Order
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Payment;

"use client"
import React from 'react'
import { useState } from "react";
import Link from 'next/link';
import { FaTwitter } from "react-icons/fa"; 
import { SignInButton } from '@clerk/nextjs'
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { redirect, useRouter } from "next/navigation";


 const page = () => {
    

   const [isLoading, setIsLoading] = React.useState(false);
    const [Email , setEmail] = React.useState("");
    const [Password , setPassword] = React.useState("");
    const router = useRouter();

    const validation =()=>{
        if( !Email || !Password){
         setIsLoading(false);
         toast.error("Please fill all fields");
         return;
        }
   }

  const Payload = {
      email: Email,
      password: Password,
    }

     const handleSignIn = async() => {
      console.log("Sign In Payload: ", Payload);
        setIsLoading(true);
        validation();
       await axios.post("/api/users/authentication", Payload).then(result=>{
         toast.success("Signed In Successfully")
         console.log(result.data);
        setIsLoading(false);
        
        localStorage.setItem("user", JSON.stringify(result.data));
        router.push("/")
       }).catch(error => {
          setIsLoading(false);
          const message = error?.response?.data?.error || "Failed to Sign In. Please try again.";
          toast.error(message);
        console.log(error)
       })

     }

     const [formData, setFormData] = useState({
         email: '',
         password: '',
         confirmPassword: '',
       });
     
       const [errors, setErrors] = useState({});
       const [showPassword, setShowPassword] = useState(false);
       const [showConfirm, setShowConfirm] = useState(false);
     
       const handleChange = (e) => {
         setFormData({ ...formData, [e.target.name]: e.target.value });
         setErrors({ ...errors, [e.target.name]: '' }); // clear error
       };
     
       const validate = () => {
         const newErrors = {};
     
         // Email validation
         if (!formData.email.trim()) {
           newErrors.email = 'Email is required';
         } else if (
           !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
         ) {
           newErrors.email = 'Enter a valid email';
         }
     
         // Password validation
         if (!formData.password.trim()) {
           newErrors.password = 'Password is required';
         } else if (formData.password.length < 6) {
           newErrors.password = 'Password must be at least 6 characters';
         }
     
         // Confirm password
         if (formData.confirmPassword !== formData.password) {
           newErrors.confirmPassword = 'Passwords do not match';
         }
     
         setErrors(newErrors);
         return Object.keys(newErrors).length === 0;
       };
     
       const handleSubmit = (e) => {
         e.preventDefault();
         if (validate()) {
           console.log('Form submitted:', formData);
           // Handle form submission here (API call, redirect, etc.)
         }
       };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/login-bg.jpg')" }}
    >
      <div className="bg-white/10 backdrop-blur-lg shadow-xl p-10 rounded-2xl w-full max-w-md border border-white/30">
              <div className="flex justify-between p-2">
                 <h2 className="text-2xl font-bold text-primary cursor-pointer flex">
                  My Travel </h2>
              </div>
                  
                      <div className='flex justify-between gap-4 text-gray-600'>
               
                       <SignInButton mode="redirect" redirect_url="/">
                         <div className='bg-white/30 rounded-sm py-1 w-[33%] shadow-md flex items-center justify-center cursor-pointer'>
                           <img src='/google.png' alt='google' className='w-4.5'/>
                         </div>
                         </SignInButton>
               
                            <SignInButton mode="redirect" redirect_url="/">
                         <div className='bg-white/30 rounded-sm py-1 w-[33%] shadow-md flex items-center justify-center cursor-pointer'>
                           <img src='/facebook.png' alt='facebook' className='w-4.5'/>
                         </div>
                         </SignInButton>
               
                            <SignInButton mode="redirect" redirect_url="/">
                         <div className='bg-white/30 rounded-sm py-1 w-[33%] shadow-md flex items-center justify-center cursor-pointer'>
                           <img src='/instagram.png' alt='insta' className='w-7.5'/>
                         </div>   
                         </SignInButton>
                       </div>
               
                       <div className='relative flex items-center justify-between text-black/30 pt-4 pb-2'>
                         <hr className='border-1 border-black/10 w-[46%]'/>
                         <p className='text-sm mt-[-2px]'>or</p>
                         <hr className='border-1 border-black/10 w-[46%]'/>
                       </div>

        <form className="space-y-5" >
         <ToastContainer position="top-center" />
           
           <div>
            <label className="block mb-1 text-sm text-black">Email</label>
            <input
              name="email"
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="wiselu@gmail.com"
              className="w-full text-[15px] px-4 py-2 rounded-md bg-white/30 text-black placeholder-gray-600 border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
            />
           
          </div>

           <div>
            <label className="block mb-1 text-sm text-black">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-[15px] px-4 py-2 rounded-md bg-white/30 text-black placeholder-gray-600 border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

         

         <button
            type="button"
             onClick={() => handleSignIn()}
            className="w-full bg-[#1DA1F2]  text-white py-2 rounded-md font-medium"
          >
            {isLoading ? "Registering.....": "Sign In"} 
          </button>
        </form>

        <p className="text-sm text-center text-gray-700 mt-4">
          SingUp to create account?{" "}
          <Link href="/auth/signup" className="text-[#1DA1F2] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default page;

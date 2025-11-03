"use client";
import React, { useState } from "react";
import { FaTwitter } from "react-icons/fa";
import Link from 'next/link'; 
import { SignUpButton } from '@clerk/nextjs'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import {redirect, useRouter} from "next/navigation";



const Page = () => {


   const [showPassword, setShowPassword] = useState(false);
   const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name , setName] = useState("");
  const [phone_number , setPhone] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [confirmPassword , setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();
   const validation =()=>{
        if(!name || !email || !password || !confirmPassword){
         setIsLoading(false);
         toast.error("Please fill all required fields");
         return false;
        }
        if(password !== confirmPassword){
          setIsLoading(false);
         toast.error("Passwords do not match");
         return false;
        }
        return true;
   }
    // Send plain `password` — backend `POST /api/users` will hash it server-side
    const Payload = {
      name,
      email,
      password,
      phone_number,
      address,
    }
     const handleSignUp = async()=>{
         console.log("Sign Up Payload: ", Payload);
        setIsLoading(true);
        const ok = validation();
        if(!ok) return;
     try{
       const result = await axios.post("/api/users", Payload);
       toast.success("Registered Successfully");
       setIsLoading(false);
       console.log(result.data);
       router.push("/auth/signin");
     }catch(error){
       setIsLoading(false);
       const message = error?.response?.data?.error || error?.response?.data?.message || "Registration Failed. Please try again.";
       toast.error(message);
       console.log(error)
     }

     }
 


  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/login-bg.jpg')" }}
    >
      <div className="bg-white/10 backdrop-blur-lg shadow-xl px-10 py-2 rounded-2xl w-full max-w-md border border-white/30">
       <h2 className="flex items-center gap-2 text-2xl font-semibold mb-6 text-black"><FaTwitter size={28} className='text-[#1DA1F2]'/>Sign Up</h2>
        
         
       <div className='flex justify-between gap-4 text-gray-600'>

        <SignUpButton mode="redirect" redirect_url="/">
          <div className='bg-white/30 rounded-sm py-1 w-[33%] shadow-md flex items-center justify-center cursor-pointer'>
            <img src='/google.png' alt='google' className='w-4.5'/>
          </div>
          </SignUpButton>

             <SignUpButton mode="redirect" redirect_url="/">
          <div className='bg-white/30 rounded-sm py-1 w-[33%] shadow-md flex items-center justify-center cursor-pointer'>
            <img src='/facebook.png' alt='facebook' className='w-4.5'/>
          </div>
          </SignUpButton>

             <SignUpButton mode="redirect" redirect_url="/">
          <div className='bg-white/30 rounded-sm py-1 w-[33%] shadow-md flex items-center justify-center cursor-pointer'>
            <img src='/instagram.png' alt='insta' className='w-7.5'/>
          </div>   
          </SignUpButton>
        </div>

        <div className='relative flex items-center justify-between text-black/30 pt-4 pb-2'>
          <hr className='border-1 border-black/10 w-[46%]'/>
          <p className='text-sm mt-[-2px]'>or</p>
          <hr className='border-1 border-black/10 w-[46%]'/>
        </div>

        <form className="space-y-5">
           <ToastContainer position="top-center" />
           <div>
            <label className="block mb-1 text-sm text-black">Name</label>
            <input
              name="username"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="wisely cute"
              className="w-full text-[15px] px-4 py-2 rounded-md bg-white/30 text-black placeholder-gray-600 border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
            />
           
          </div>

          <div>
            <label className="block mb-1 text-sm text-black">Phone</label>
            <input
              name="phone"
              type="Phone"
              value={phone_number}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="678908765"
              className="w-full text-[15px] px-4 py-2 rounded-md bg-white/30 text-black placeholder-gray-600 border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
            />
           
          </div>

           <div>
            <label className="block mb-1 text-sm text-black">Address</label>
            <input
              name="address"
              type="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Douala"
              className="w-full text-[15px] px-4 py-2 rounded-md bg-white/30 text-black placeholder-gray-600 border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
            />
           
          </div>

           <div>
            <label className="block mb-1 text-sm text-black">Email</label>
            <input
              name="email"
              type="email"
              value={email}
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
                value={password}
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

          <div>
            <label className="block mb-1 text-sm text-black">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
             className="w-full text-[15px] px-4 py-2 rounded-md bg-white/30 text-black placeholder-gray-600 border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-700"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
           
          </div>

          <button
            type="button"
             onClick={() => handleSignUp()}
            className="w-full bg-[#1DA1F2]  text-white py-2 rounded-md font-medium"
          >
            {isLoading ? "Registering.....": "Sign Up"} 
          </button>
        </form>

        <p className="text-sm text-center text-gray-700 mt-4">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-[#1DA1F2] hover:underline">
            Sign in
          </Link>
        </p>

        {/* Social Buttons */}
        {/* <div className="flex justify-center gap-4 mt-6">
          <button className="hover:bg-[#1DA1F2] rounded-md p-2 shadow-md transition">
            <img src="/google.png" alt="Google" className="h-6 w-6" />
          </button>
          <button className="hover:bg-[#1DA1F2] rounded-md p-2 shadow-md transition">
            <img src="/facebook.png" alt="Facebook" className="h-6 w-6" />
          </button>
          <button className="hover:bg-[#1DA1F2] rounded-md p-2 shadow-md transition">
            <img src="/instagram.png" alt="Instagram" className="h-6 w-6" />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Page;

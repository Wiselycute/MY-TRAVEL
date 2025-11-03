"use cleint"
import NavbarComponent from "@/components/navbar/NavbarComponent";
import Image from "next/image";
import HeroBanner from './../components/banner/HeroBanner';
import {auth, currentUser} from '@clerk/nextjs/server'
import { redirect} from 'next/navigation'

export default async function page() {
    const { userId } = await auth()
    if (!userId) {
      redirect('/auth/signup')
    }
  return (
    <>
    <NavbarComponent />
    <HeroBanner/>
    <div className="grid  grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     
    </div>
    </>
  );
}

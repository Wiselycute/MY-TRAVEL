// components/FooterComponent/FooterComponent.jsx
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import Image                                                          from 'next/image'
import React                                                          from 'react'

const FooterComponent = () => {
  return (
    <footer className='w-full bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20'>
        
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12'>
          
          {/* Brand Column */}
          <div className='flex flex-col items-start lg:col-span-1'>
            {/* Logo */}
            <h1 className='text-red-600 font-bold text-2xl sm:text-3xl mb-4'>
              TOPCAR
            </h1>
            
            {/* Description */}
            <p className='text-sm sm:text-base text-gray-600 leading-relaxed mb-6'>
              Website to buy, sell and rent new and used cars with famous brands such as Bentley, Mercedes, Audi, Porsche, Honda, and more.
            </p>
            
            {/* Social Media Icons */}
            <div className='flex items-center gap-3'>
              <a 
                href='#' 
                className='w-10 h-10 rounded-full border-2 border-gray-300 hover:border-red-600 hover:bg-red-600 flex items-center justify-center transition-all duration-200 group'
                aria-label='Instagram'
              >
                <Instagram className='w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-200' />
              </a>
              
              <a 
                href='#' 
                className='w-10 h-10 rounded-full border-2 border-gray-300 hover:border-red-600 hover:bg-red-600 flex items-center justify-center transition-all duration-200 group'
                aria-label='Facebook'
              >
                <Facebook className='w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-200' />
              </a>
              
              <a 
                href='#' 
                className='w-10 h-10 rounded-full border-2 border-gray-300 hover:border-red-600 hover:bg-red-600 flex items-center justify-center transition-all duration-200 group'
                aria-label='Twitter'
              >
                <Twitter className='w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-200' />
              </a>
              
              <a 
                href='#' 
                className='w-10 h-10 rounded-full border-2 border-gray-300 hover:border-red-600 hover:bg-red-600 flex items-center justify-center transition-all duration-200 group'
                aria-label='Youtube'
              >
                <Youtube className='w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-200' />
              </a>
              
              <a 
                href='#' 
                className='w-10 h-10 rounded-full border-2 border-gray-300 hover:border-red-600 hover:bg-red-600 flex items-center justify-center transition-all duration-200 group'
                aria-label='TikTok'
              >
                <img 
                  src="/assets/ticktok_ico.svg" 
                  alt="TikTok" 
                  className='w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert transition-all duration-200' 
                />
              </a>
            </div>
          </div>
          
          {/* Carvago Column */}
          <div className='flex flex-col items-start'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>
              Carvago
            </h3>
            <ul className='space-y-3'>
              <li>
                <a href='#' className='text-sm sm:text-base text-gray-600 hover:text-red-600 transition-colors duration-200'>
                  Buy
                </a>
              </li>
              <li>
                <a href='#' className='text-sm sm:text-base text-gray-600 hover:text-red-600 transition-colors duration-200'>
                  Review
                </a>
              </li>
              <li>
                <a href='#' className='text-sm sm:text-base text-gray-600 hover:text-red-600 transition-colors duration-200'>
                  Site map
                </a>
              </li>
              <li>
                <a href='#' className='text-sm sm:text-base text-gray-600 hover:text-red-600 transition-colors duration-200'>
                  How it works
                </a>
              </li>
            </ul>
          </div>
          
          {/* Services Column */}
          <div className='flex flex-col items-start'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>
              Services
            </h3>
            <ul className='space-y-3'>
              <li>
                <a href='#' className='text-sm sm:text-base text-gray-600 hover:text-red-600 transition-colors duration-200'>
                  Delivery
                </a>
              </li>
              <li>
                <a href='#' className='text-sm sm:text-base text-gray-600 hover:text-red-600 transition-colors duration-200'>
                  Car Audit
                </a>
              </li>
              <li>
                <a href='#' className='text-sm sm:text-base text-gray-600 hover:text-red-600 transition-colors duration-200'>
                  Warranty
                </a>
              </li>
              <li>
                <a href='#' className='text-sm sm:text-base text-gray-600 hover:text-red-600 transition-colors duration-200'>
                  Financing
                </a>
              </li>
            </ul>
          </div>
          
          {/* Company Column */}
          <div className='flex flex-col items-start'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>
              Company
            </h3>
            <ul className='space-y-3'>
              <li>
                <a href='#' className='text-sm sm:text-base text-gray-600 hover:text-red-600 transition-colors duration-200'>
                  About us
                </a>
              </li>
              <li>
                <a href='#' className='text-sm sm:text-base text-gray-600 hover:text-red-600 transition-colors duration-200'>
                  Contact us
                </a>
              </li>
              <li>
                <a href='#' className='text-sm sm:text-base text-gray-600 hover:text-red-600 transition-colors duration-200'>
                  Terms of use
                </a>
              </li>
              <li>
                <a href='#' className='text-sm sm:text-base text-gray-600 hover:text-red-600 transition-colors duration-200'>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className='w-full border-t border-gray-300 mb-8' />
        
        {/* Bottom Footer */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
          {/* Copyright */}
          <p className='text-sm text-gray-500 text-center md:text-left'>
            &copy; 2023 TopCar. All rights reserved.
          </p>
          
          
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent

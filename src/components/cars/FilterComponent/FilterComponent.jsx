import React                         from 'react'
import { Users, DollarSign, MapPin } from 'lucide-react'

const FilterComponent = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 bg-background'>
      <div className='flex flex-col items-start'>
        
        {/* Toggle Filters */}
        <div className='flex items-center w-full sm:w-auto'>
          <button className='flex-1 sm:flex-none flex justify-center bg-[#FFA500] items-center px-8 sm:px-12 lg:px-16  text-white rounded-t-2xl py-4 lg:py-5 font-semibold text-sm sm:text-base transition-colors duration-200 hover:bg-[#3d2828]'>
            Rent Car
          </button>
          <button className='flex-1 sm:flex-none flex justify-center items-center px-8 sm:px-12 lg:px-16 bg-background border border-gray-100 rounded-t-2xl py-4 lg:py-5 text-[#A18E8E] font-semibold text-sm sm:text-base transition-colors duration-200 hover:bg-gray-50'>
            Buy Car
          </button>
        </div>
        
        {/* Filter Options Container */}
        <div className='w-full bg-background border border-secondary rounded-b-2xl rounded-tr-2xl shadow-sm p-4 sm:p-6 lg:p-8'>
          <div className='flex flex-col lg:flex-row items-stretch gap-4 lg:gap-5'>
            
            {/* Number of Seats Input */}
            <div className='w-full lg:flex-1 relative'>
              <div className='absolute left-4 top-1/2 transform -translate-y-1/2 text-[#503535]'>
                <Users size={22} className="text-primary" strokeWidth={2} />
              </div>
              <input
                type='text'
                placeholder='Number of Seats'
                className='w-full pl-12 pr-4 py-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400'
              />
            </div>
            
            {/* Price Input */}
            <div className='w-full lg:flex-1 relative'>
              <div className='absolute left-4 top-1/2 transform -translate-y-1/2 text-[#503535]'>
                <DollarSign size={22} className="text-primary" strokeWidth={2} />
              </div>
              <input
                type='text'
                placeholder='Price Range'
                className='w-full pl-12 pr-4 py-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400'
              />
            </div>
            
            {/* Location Input */}
            <div className='w-full lg:flex-1 relative'>
              <div className='absolute left-4 top-1/2 transform -translate-y-1/2 text-[#503535]'>
                <MapPin size={22} className="text-primary" strokeWidth={2} />
              </div>
              <input
                type='text'
                placeholder='Location'
                className='w-full pl-12 pr-4 py-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400'
              />
            </div>
            
            {/* Search Button */}
            <div className='w-full lg:w-auto'>
              <button className='w-full lg:w-auto lg:px-12 bg-red-500 text-white py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-red-600 active:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterComponent

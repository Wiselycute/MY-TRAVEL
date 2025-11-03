// components/NewsComponent/NewsComponent.jsx
import { newsData }     from '@/lib/carData'
import React            from 'react'
import FeaturedNewsCard from '../FeaturedNewsCard/FeaturedNewsCard'
import { ArrowRight }   from 'lucide-react'

const FeaturedComponent = () => {
  return (
    <div className='w-full bg-white py-12 md:py-16 lg:py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Section Title */}
        <div className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3D1F1F] mb-4'>
            FEATURED NEWS
          </h2>
          
        </div>
        
        {/* News Grid Section */}
        <section className='mb-12'>
          {/* Responsive Flex Layout with Better Tablet Support */}
          <div className='flex flex-wrap  lg:flex-nowrap justify-center gap-6 lg:gap-8'>
            {newsData.slice(0, 3).map((news) => (
              <div 
                key={news.id} 
                className='w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-21px)] max-w-[400px] flex-shrink-0'
              >
                <FeaturedNewsCard data={news} />
              </div>
            ))}
          </div>
        </section>
        
        {/* See All Button */}
        <div className='flex justify-center'>
          <button className='flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-base text-gray-700 hover:text-white hover:bg-red-600 transition-all duration-200 group border-2 border-gray-300 hover:border-red-600 shadow-sm hover:shadow-md'>
            <span>See all news</span>
            <ArrowRight className='w-5 h-5 transition-transform duration-200 group-hover:translate-x-1' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeaturedComponent

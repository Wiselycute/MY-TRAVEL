// lib/carData.js

// Mock data for Rent Cars
export const rentCarsData = [
  {
    id: 'rent-1',
    type: 'rent',
    title: 'Porsche Cayenne 2020',
    image: '/assets/images/car1.png',
    rating: 4.8,
    reviews: 2436,
    location: 'Hoan Kiem district, Ha Noi city',
    seats: 4,
    fuelType: 'Gas',
    transmission: 'Auto',
    price: 500,
    period: 'day'
  },
  {
    id: 'rent-2',
    type: 'rent',
    title: 'BMW X5 2021',
    image: '/assets/images/car2.png',
    rating: 4.9,
    reviews: 1823,
    location: 'Ba Dinh district, Ha Noi city',
    seats: 5,
    fuelType: 'Diesel',
    transmission: 'Auto',
    price: 650,
    period: 'day'
  },
  {
    id: 'rent-3',
    type: 'rent',
    title: 'Mercedes GLE 2022',
    image: '/assets/images/car3.png',
    rating: 4.7,
    reviews: 3120,
    location: 'Dong Da district, Ha Noi city',
    seats: 7,
    fuelType: 'Hybrid',
    transmission: 'Auto',
    price: 750,
    period: 'day'
  },
  {
    id: 'rent-4',
    type: 'rent',
    title: 'Audi Q7 2021',
    image: '/assets/images/car1.png',
    rating: 4.6,
    reviews: 2187,
    location: 'Cau Giay district, Ha Noi city',
    seats: 6,
    fuelType: 'Gas',
    transmission: 'Auto',
    price: 580,
    period: 'day'
  },
  {
    id: 'rent-5',
    type: 'rent',
    title: 'Range Rover Sport 2023',
    image: '/assets/images/car2.png',
    rating: 4.9,
    reviews: 1654,
    location: 'Tay Ho district, Ha Noi city',
    seats: 5,
    fuelType: 'Diesel',
    transmission: 'Auto',
    price: 850,
    period: 'day'
  },
  {
    id: 'rent-6',
    type: 'rent',
    title: 'Lexus RX 350 2022',
    image: '/assets/images/car3.png',
    rating: 4.8,
    reviews: 2890,
    location: 'Hoan Kiem district, Ha Noi city',
    seats: 5,
    fuelType: 'Hybrid',
    transmission: 'Auto',
    price: 700,
    period: 'day'
  }
]

// Mock data for Buy Cars
export const buyCarsData = [
  {
    id: 'buy-1',
    type: 'buy',
    title: 'Porsche Cayenne 2020',
    image: '/assets/images/car1.png',
    rating: 4.8,
    reviews: 2436,
    location: 'Hoan Kiem district, Ha Noi city',
    seats: 4,
    fuelType: 'Gas',
    transmission: 'Auto',
    price: 53000
  },
  {
    id: 'buy-2',
    type: 'buy',
    title: 'BMW X5 2021',
    image: '/assets/images/car2.png',
    rating: 4.9,
    reviews: 1823,
    location: 'Ba Dinh district, Ha Noi city',
    seats: 5,
    fuelType: 'Diesel',
    transmission: 'Auto',
    price: 68000
  },
  {
    id: 'buy-3',
    type: 'buy',
    title: 'Mercedes GLE 2022',
    image: '/assets/images/car3.png',
    rating: 4.7,
    reviews: 3120,
    location: 'Dong Da district, Ha Noi city',
    seats: 7,
    fuelType: 'Hybrid',
    transmission: 'Auto',
    price: 78000
  },
  {
    id: 'buy-4',
    type: 'buy',
    title: 'Audi Q7 2021',
    image: '/assets/images/car1.png',
    rating: 4.6,
    reviews: 2187,
    location: 'Cau Giay district, Ha Noi city',
    seats: 6,
    fuelType: 'Gas',
    transmission: 'Auto',
    price: 62000
  },
  {
    id: 'buy-5',
    type: 'buy',
    title: 'Range Rover Sport 2023',
    image: '/assets/images/car2.png',
    rating: 4.9,
    reviews: 1654,
    location: 'Tay Ho district, Ha Noi city',
    seats: 5,
    fuelType: 'Diesel',
    transmission: 'Auto',
    price: 95000
  },
  {
    id: 'buy-6',
    type: 'buy',
    title: 'Lexus RX 350 2022',
    image: '/assets/images/car3.png',
    rating: 4.8,
    reviews: 2890,
    location: 'Hoan Kiem district, Ha Noi city',
    seats: 5,
    fuelType: 'Hybrid',
    transmission: 'Auto',
    price: 72000
  }
]

// Mock data for News
export const newsData = [
  {
    id: 'news-1',
    type: 'news',
    title: '2024 Porsche 911 S/T Debuts With 518 HP, $291,650 Price Tag',
    image: '/assets/images/car1.png',
    description: 'The 2024 Porsche 911 S/T debuts combining elements from the GT3 Touring and GT3 RS to create a lightweight, road-focused masterpiece with exceptional performance capabilities.',
    trending: true,
    date: 'Sep 15, 2024',
    category: 'Automotive News'
  },
  {
    id: 'news-2',
    type: 'news',
    title: 'BMW Unveils All-Electric M5 With 700 Horsepower',
    image: '/assets/images/car2.png',
    description: 'BMW breaks tradition with the first-ever electric M5, delivering unprecedented performance with 700 HP and instant torque, revolutionizing the sports sedan segment.',
    trending: true,
    date: 'Oct 8, 2024',
    category: 'Electric Vehicles'
  },
  {
    id: 'news-3',
    type: 'news',
    title: 'Mercedes-AMG ONE Hypercar Sets New Nürburgring Record',
    image: '/assets/images/car3.png',
    description: 'The Mercedes-AMG ONE has shattered the lap record at the Nürburgring, showcasing Formula 1 technology in a road-legal package with breathtaking performance.',
    trending: false,
    date: 'Aug 22, 2024',
    category: 'Performance'
  },
  {
    id: 'news-4',
    type: 'news',
    title: 'Audi Launches Redesigned Q8 e-tron With Extended Range',
    image: '/assets/images/car1.png',
    description: 'Audi introduces the refreshed Q8 e-tron with improved battery technology, offering up to 400 miles of range and enhanced charging capabilities for long-distance travel.',
    trending: true,
    date: 'Sep 30, 2024',
    category: 'Electric Vehicles'
  },
  {
    id: 'news-5',
    type: 'news',
    title: 'Range Rover Introduces Luxury Off-Road Package',
    image: '/assets/images/car2.png',
    description: 'Range Rover announces an exclusive off-road package combining extreme capability with luxury comfort, perfect for adventurous drivers who refuse to compromise.',
    trending: false,
    date: 'Jul 18, 2024',
    category: 'Luxury SUVs'
  },
  {
    id: 'news-6',
    type: 'news',
    title: 'Lexus Reveals Next-Generation Hybrid Technology',
    image: '/assets/images/car3.png',
    description: 'Lexus showcases groundbreaking hybrid technology that promises 50% better fuel efficiency while maintaining the performance and refinement the brand is known for.',
    trending: false,
    date: 'Jun 12, 2024',
    category: 'Technology'
  }
]

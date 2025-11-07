import Image from "next/image";

const HeroComponent = () => (
  <div className="max-w-7xl bg-background mx-auto px-4 py-12 md:py-16">
    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="flex flex-col items-start w-full md:w-1/2 space-y-2">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
          <span className="block text-primary">Buy, Sell & Rent</span>
          <span className="block text-primary mt-2">reputable cars</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-md">
          Buy and Sell reputable cars. Renting a car is easy and fast with TopCar.
        </p>
        <div className="flex items-center gap-8 mt-5">
          <div>
            <span className="font-bold text-5xl text-primary">50+</span>
            <p className="text-lg font-semibold text-gray-600">Car brands</p>
          </div>
          <div className="h-16 w-px bg-gray-300" />
          <div>
            <span className="font-bold text-5xl text-primary">10k+</span>
            <p className="text-lg font-semibold text-gray-600">Clients</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-end">
        <div className="relative w-full max-w-[850px] h-[450px]">
          <Image
            src="/assets/images/car_herosec.png"
            alt="Premium car showcase"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  </div>
);

export default HeroComponent;

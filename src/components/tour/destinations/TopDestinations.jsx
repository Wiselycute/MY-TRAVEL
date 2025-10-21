export default function TopDestinations() {
  const destinations = [
    { name: "Machu Picchu, Peru", price: 99, img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800" },
    { name: "The Grand Canyon, USA", price: 70, img: "https://images.unsplash.com/photo-1508264165352-258859e62245?w=800" },
    { name: "Mount Hiking Tour", price: 89, img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800" },
  ];

  return (
    <section className="py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-6">Top Destinations - World</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {destinations.map((d, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
            <img src={d.img} alt={d.name} className="w-full h-56 object-cover" />
            <div className="p-5 text-left">
              <h3 className="font-semibold text-lg">{d.name}</h3>
              <div className="flex items-center justify-between mt-3">
                <span className="text-gray-500">${d.price}/Person</span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

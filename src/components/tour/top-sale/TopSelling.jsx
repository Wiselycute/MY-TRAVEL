export default function TopSelling() {
  const selling = [
    { name: "Rome, Italy", price: "$1.4k / 7 days", img: "https://images.unsplash.com/photo-1503264116251-35a269479413?w=800" },
    { name: "London, UK", price: "$2.3k / 10 days", img: "https://images.unsplash.com/photo-1502786129293-79981df4e689?w=800" },
    { name: "Prague, Europe", price: "$1.8k / 9 days", img: "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=800" },
  ];

  return (
    <section className="py-16 bg-blue-50/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Top Selling Destinations</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {selling.map((d, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition">
              <img src={d.img} alt={d.name} className="w-full h-56 object-cover" />
              <div className="p-5">
                <h3 className="text-lg font-semibold">{d.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-600">{d.price}</p>
                  <button className="px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                    Book Trip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

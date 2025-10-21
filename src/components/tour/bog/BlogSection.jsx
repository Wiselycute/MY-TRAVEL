export default function BlogSection() {
  const blogs = [
    {
      title: "5 Tips for Your First Solo Trip",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    },
    {
      title: "The Hidden Beaches of Greece",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    },
    {
      title: "Best Food Tours Around the World",
      img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
    },
  ];

  return (
    <section className="py-16 bg-blue-50/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">From Our Blog</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((b, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition">
              <img src={b.img} alt={b.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
                <p className="text-gray-600 text-sm">
                  Discover travel inspiration, hidden gems, and travel hacks to make your journey unforgettable.
                </p>
                <button className="mt-4 text-orange-500 font-semibold hover:underline">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

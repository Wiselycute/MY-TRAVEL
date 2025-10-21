export default function Testimonials() {
  const reviews = [
    {
      name: "Sophie M.",
      text: "Travel Fusion made my honeymoon trip to Italy unforgettable. Excellent service and easy booking!",
      img: "https://randomuser.me/api/portraits/women/47.jpg",
    },
    {
      name: "David P.",
      text: "The best travel platform I’ve ever used. The team was available 24/7 for all my questions.",
      img: "https://randomuser.me/api/portraits/men/33.jpg",
    },
    {
      name: "Elena K.",
      text: "From start to finish, it was smooth and well organized. Highly recommend!",
      img: "https://randomuser.me/api/portraits/women/32.jpg",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">What People Say About Us</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="p-6 bg-blue-50 rounded-2xl shadow hover:shadow-lg transition">
              <img src={r.img} alt={r.name} className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" />
              <p className="text-gray-600 italic mb-3">“{r.text}”</p>
              <h3 className="font-semibold text-charcoal">{r.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

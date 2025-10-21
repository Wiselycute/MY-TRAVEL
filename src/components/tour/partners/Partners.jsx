export default function Partners() {
  const brands = [
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Expedia_Logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/6/6a/Qatar_Airways_Logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/Delta_Air_Lines_Logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/3/3c/Airbnb_Logo.svg",
  ];

  return (
    <section className="py-12 bg-blue-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-center mb-8">Our Trusted Partners</h2>
        <div className="flex flex-wrap justify-center gap-10 opacity-80">
          {brands.map((b, i) => (
            <img key={i} src={b} alt="Partner logo" className="h-10 grayscale hover:grayscale-0 transition" />
          ))}
        </div>
      </div>
    </section>
  );
}

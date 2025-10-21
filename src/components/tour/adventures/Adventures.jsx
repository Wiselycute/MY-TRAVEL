import { Compass, Users, Star, Globe } from "lucide-react";

export default function Adventures() {
  const stats = [
    { icon: Users, value: "12k+", label: "Happy Travelers" },
    { icon: Compass, value: "16+", label: "Years Experience" },
    { icon: Star, value: "4.9/5", label: "Average Rating" },
    { icon: Globe, value: "20+", label: "Countries Covered" },
  ];

  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-3xl font-bold mb-10">Our Stories Have Adventures</h2>
      <div className="flex flex-wrap justify-center gap-10">
        {stats.map((s, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-blue-50/50 p-8 rounded-2xl shadow-md hover:shadow-lg transition w-64"
          >
            <s.icon className="h-10 w-10 text-orange-500 mb-3" />
            <h3 className="text-2xl font-bold text-charcoal">{s.value}</h3>
            <p className="text-gray-600">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

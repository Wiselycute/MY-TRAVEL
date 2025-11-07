"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import FeaturedNewsCard from "../FeaturedNewsCard/FeaturedNewsCard";
import { ArrowRight } from "lucide-react";

const FeaturedComponent = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("/api/news");
        setNews(res.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Featured News
        </h2>
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {news.slice(0, 3).map((item) => (
            <div key={item._id} className="max-w-[400px] w-full sm:w-[calc(50%-12px)]">
              <FeaturedNewsCard data={item} />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="flex items-center gap-2 border-2 px-6 py-3 rounded-lg text-gray-700 hover:bg-primary hover:text-white transition">
            See all news <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedComponent;

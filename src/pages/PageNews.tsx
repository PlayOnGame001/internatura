import { useState } from "react";
import NewsIcon from "../assets/react.svg?react";
import { newsData } from "../data/news";
import { NewsCard } from "../UI";
import Banner from "../UI/banner";
import type { Bidder } from "../utilits/ad";

export default function PageNews() {
  const [selectedNews, setSelectedNews] = useState<null | (typeof newsData)[0]>(null);

  const adBidders: Bidder[] = [{ bidder: "adtelligent", params: { aid: 350975 } }];

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">News feed</h1>

      <div className="flex gap-6 justify-center">
        <div className="hidden lg:block">
          <Banner id="banner-left" sizes={[[300, 250]]} bidders={adBidders} />
        </div>

        <div className="flex-1 max-w-3xl">
          <div className="flex flex-wrap gap-5 justify-center">
            {newsData.map((news) => (
              <NewsCard
                key={news.id}
                title={news.title}
                icon={NewsIcon}
                onClick={() => setSelectedNews(news)}
              />
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <Banner id="banner-right" sizes={[[300, 250]]} bidders={adBidders} />
        </div>
      </div>

      {selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-400 rounded-lg shadow-lg border-4 border-black p-6 relative max-w-lg w-full mx-4">
            <button
              type="button"
              className="absolute top-3 right-3 text-black hover:text-gray-800 text-xl font-bold bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => setSelectedNews(null)}
            >
              ×
            </button>
            <NewsIcon className="w-32 h-32 mb-4 mx-auto" />
            <h2 className="text-2xl font-bold mb-4 text-center text-black">
              {selectedNews.title}
            </h2>
            <p className="text-black leading-relaxed">{selectedNews.fullText}</p>
          </div>
        </div>
      )}
    </div>
  );
}

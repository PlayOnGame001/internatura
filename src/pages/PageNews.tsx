import { useState } from "react";
import { newsData } from "../data/news";
import NewsIcon from "../assets/react.svg?react"; 

export default function PageNews() {
  const [selectedNews, setSelectedNews] = useState<null | typeof newsData[0]>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Лента новостей</h1>

      <div className="flex flex-wrap gap-5 justify-center">
        {newsData.map((news) => (
          <div key={news.id} className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg cursor-pointer transition transform hover:scale-105 flex flex-col items-center"
          onClick={() => setSelectedNews(news)}>
            <NewsIcon className="w-32 h-32 mb-2" />
            <h2 className="font-semibold text-lg text-center">{news.title}</h2>
          </div>
        ))}
      </div>

      {selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-400 rounded-lg shadow-lg border-4 border-black p-6 relative max-w-lg w-full mx-4">
            <button className="absolute top-3 right-3 text-black hover:text-gray-800 text-xl font-bold bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
            onClick={() => setSelectedNews(null)}> × </button>
            <NewsIcon className="w-32 h-32 mb-4 mx-auto" />
            <h2 className="text-2xl font-bold mb-4 text-center text-black">{selectedNews.title}</h2>
            <p className="text-black leading-relaxed">{selectedNews.fullText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
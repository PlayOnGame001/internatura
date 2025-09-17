import { newsData } from "../data/news";
import NewsIcon from "../assets/react.svg";

export default function PageNews() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Лента новостей</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {newsData.map((news) => (
          <div
            key={news.id}
            className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-3">
              <NewsIcon/>
              <h2 className="font-semibold text-lg">{news.title}</h2>
            </div>
            <p className="text-gray-600">{news.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

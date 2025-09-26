import { lazy, Suspense } from "react";
import "./index.css";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const NewsPage = lazy(() => import("./pages/PageNews"));
const AdsDebugPagePrebidJs = lazy(() => import("./pages/PageAdsDebugPrebidJs"));

export default function App() {
  const hasPrebid =
    typeof window !== "undefined" && typeof window.pbjs !== "undefined";

  return (
    <Router>
      <Suspense fallback={<div className="text-center mt-20 text-lg">Load...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/log" />} />
          <Route path="/log" element={<LoginPage />} />
          <Route path="/reg" element={<RegisterPage />} />
          <Route path="/news" element={<NewsPage />} />
          {hasPrebid ? (
            <Route path="/ads-debug-prebidjs" element={<AdsDebugPagePrebidJs />}/>
          ) : (
            <Route path="/ads-debug-prebidjs" element={
                <div className="p-6 text-center text-red-600">
                  ⚠️ Prebid.js не загружен, логи недоступны
                </div>
              }/>
          )}
        </Routes>
      </Suspense>
    </Router>
  );
}

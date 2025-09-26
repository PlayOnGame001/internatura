import React, { useEffect } from "react";
import { initBannerAd } from "../utilits/ad";

declare global { interface Window { pbjs: any } }

interface BannerProps {
  id: string;
  sizes: number[][];
  bidders?: { bidder: string; params: Record<string, any> }[];
}

const Banner: React.FC<BannerProps> = ({ id, sizes, bidders }) => {
  useEffect(() => {
    if (import.meta.env.VITE_ENABLE_ADS !== "true") return;

    const start = () => initBannerAd(id, sizes, bidders);

    if (window.pbjs) {
      start();
    } else {
      const script = document.createElement("script");
      script.src = "/prebid10.10.0.js";
      script.async = true;
      script.onload = start;
      script.onerror = () => console.warn("⚠️ Prebid.js не удалось загрузить");
      document.body.appendChild(script);
    }
  }, [id, sizes, bidders]);

  return (
    <div
      id={id}
      style={{
        width: sizes[0][0],
        height: sizes[0][1],
        border: "1px solid #ccc",
        borderRadius: 4,
        background: "#f9f9f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {import.meta.env.VITE_ENABLE_ADS !== "true" && "Ads disabled"}
    </div>
  );
};

export default Banner;

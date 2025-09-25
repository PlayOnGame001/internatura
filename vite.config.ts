import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      include: "**/*.svg?react",
      exclude: "**/*.svg",
    }),
    {
      name: "virtual-ads",
      resolveId(id) {
        if (id === "virtual:ads/Banner") return id + ".tsx";
      },
      load(id) {
        if (id === "virtual:ads/Banner.tsx") {
          return `
            import React, { useEffect } from "react";

            declare global { interface Window { pbjs: any } }

            const Banner: React.FC<{ id: string; sizes: number[][]; bidders?: { bidder: string; params: Record<string, any> }[] }> = ({ id, sizes, bidders }) => {
              useEffect(() => {
                if (import.meta.env.VITE_ENABLE_ADS !== "true") return;

                const start = () => {
                  if (!window.pbjs) return;

                  import("/src/utilits/ad.ts").then(({ initBannerAd }) => {
                    initBannerAd(id, sizes, bidders);
                  });
                };

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
                />
              );
            };

            export default Banner;
          `;
        }
      },
    },
  ],
});

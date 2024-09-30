"use client";
import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    ELFSIGHT?: { init: () => void };
  }
}

const TopBannerWidget: React.FC = () => {
  useEffect(() => {
    if (window.ELFSIGHT) {
      window.ELFSIGHT.init();
    }
  }, []);

  return (
    <>
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        data-use-service-core
        strategy="lazyOnload"
        onLoad={() => {
          if (window.ELFSIGHT) {
            window.ELFSIGHT.init();
          }
        }}
      />
      <div
        className="elfsight-app-810b8363-647a-4317-9866-0430d475a3ec"
        data-elfsight-app-lazy
      ></div>
    </>
  );
};

export default TopBannerWidget;

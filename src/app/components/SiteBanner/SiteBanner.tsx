"use client";
import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    ELFSIGHT?: { init: () => void };
  }
}

const ElfsightWidget: React.FC = () => {
  useEffect(() => {
    if (window.ELFSIGHT) {
      window.ELFSIGHT.init();
    }
  }, []);

  return (
    <div className="elf-component">
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
        className="elfsight-app-e46d9f36-6f2e-413b-b776-7274e18df726"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
};

export default ElfsightWidget;

"use client";
import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    ELFSIGHT?: { init: () => void };
  }
}

const Calendar: React.FC = () => {
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
        className="elfsight-app-a3d492f9-18ac-48bc-a692-102872e37c4f"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
};

export default Calendar;

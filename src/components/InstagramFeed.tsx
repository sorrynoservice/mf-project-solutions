import { useEffect } from "react";

const ELFSIGHT_APP_ID = "elfsight-app-d2788800-628c-4387-b23b-8bf3a96fab77";
const PLATFORM_SRC = "https://static.elfsight.com/platform/platform.js";

const InstagramFeed = () => {
  useEffect(() => {
    if (document.querySelector(`script[src="${PLATFORM_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = PLATFORM_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="py-20 bg-[#0d3832]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-white">Follow Our Journey</h2>
          <p className="text-[#d4af37] max-w-2xl mx-auto">
            See our latest projects and behind-the-scenes moments
          </p>
        </div>
        <div className={ELFSIGHT_APP_ID} data-elfsight-app-lazy />
      </div>
    </section>
  );
};

export default InstagramFeed;

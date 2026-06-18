import Image from "next/image";
import { introConfig } from "@/config/content";

export function IntroPost() {
  return (
    <div className="bg-background text-black">
      <section className="relative flex flex-col md:flex-row justify-between px-6 md:px-10 py-20 md:py-36">
        {/* Left Section */}
        <div className="max-w-lg mb-10 md:mb-0 pr-3">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {introConfig.heading}
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-700">
            {introConfig.subheading}
          </p>
        </div>

        {/* Right Section */}
        <div className="relative flex flex-row">
          {introConfig.covers.map((cover, i) => (
            <div
              key={i}
              className={`relative w-60 h-80 bg-white shadow-lg rounded-lg overflow-hidden transform hover:-translate-y-8 transition-transform duration-300 ${i > 0 ? "-ml-24" : ""} ${i === 1 ? "mt-8" : ""} ${i === 2 ? "mt-16" : ""}`}
            >
              <Image
                src={cover.src}
                alt={cover.label}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import Image from "next/image";

export function IntroPost() {
  return (
    <div className="bg-background text-black">
      <section className="relative flex flex-col md:flex-row justify-between px-6 md:px-10 py-20 md:py-36">
        {/* Left Section */}
        <div className="max-w-lg mb-10 md:mb-0 pr-3">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Every book leaves its mark on me.
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-700">
            This is a space where I have visually organized the books and papers
            I have read since 2019. It is also a place for reflecting on the
            path I&apos;ve walked.
          </p>
        </div>

        {/* Right Section */}
        <div className="relative flex flex-row">
          <div className="relative w-60 h-80 bg-white shadow-lg rounded-lg overflow-hidden transform hover:-translate-y-8 transition-transform duration-300">
            <Image
              src="/cover1.jpg"
              alt="The timeless classics everyone should read"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="p-4 bg-white">
              <h3 className="text-sm font-semibold">-</h3>
              <span className="text-xs font-medium text-primary mt-2 inline-block">
                Paper
              </span>
            </div>
          </div>

          <div className="relative w-60 h-80 bg-white shadow-lg rounded-lg overflow-hidden transform hover:-translate-y-8 transition-transform duration-300 -ml-24 mt-8">
            <Image
              src="/cover2.jpg"
              alt="The timeless classics everyone should read"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="p-4 bg-white">
              <h3 className="text-sm font-semibold">-</h3>
              <span className="text-xs font-medium text-primary mt-2 inline-block">
                Magazine
              </span>
            </div>
          </div>

          <div className="relative w-60 h-80 bg-white shadow-lg rounded-lg overflow-hidden transform hover:-translate-y-8 transition-transform duration-300 -ml-24 mt-16">
            <Image
              src="/cover3.jpg"
              alt="The timeless classics everyone should read"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="p-4 bg-white">
              <h3 className="text-sm font-semibold">-</h3>
              <span className="text-xs font-medium text-primary mt-2 inline-block">
                Book
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

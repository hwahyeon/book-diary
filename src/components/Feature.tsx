import Image from "next/image";
import Link from "next/link";

export function FeaturePost() {
  return (
    <section className="relative w-full h-screen">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-black/10">
        <div className="flex flex-col md:flex-row items-stretch bg-white/30 backdrop-blur-md p-10 rounded-2xl shadow-lg w-4/5 max-w-4xl">
          <div className="relative w-full md:w-1/2 mb-6 md:mb-0">
            <Image
              src="/cover.jpg"
              alt="Featured Post"
              className="rounded-lg object-cover"
              width={500}
              height={300}
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center pl-0 md:pl-10">
            <h2 className="text-2xl font-bold text-black mb-4">
              Records of What I&apos;ve Read
            </h2>
            <p className="text-black leading-relaxed mb-4">
              I&apos;ve always had a habit of recording what I&apos;ve read, and
              I thought it would be great to bring them together and present
              them visually. This website is the result of that idea.
            </p>
          </div>
        </div>

        <div className="flex space-x-4 mt-6">
          <Link
            href="/book"
            className="px-6 py-3 bg-gray-500 text-white rounded-full shadow-md hover:bg-opacity-50 text-sm"
          >
            Calendar
          </Link>

          <Link
            href="/book/all"
            className="px-6 py-3 bg-gray-500 text-white rounded-full shadow-md hover:bg-opacity-50 text-sm"
          >
            All Books
          </Link>
        </div>
      </div>
    </section>
  );
}

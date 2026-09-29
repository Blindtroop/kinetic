export default function ComingSoon() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-6">
      <div className="max-w-2xl text-center">
        <span className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/70 mb-6">
          Error 404
        </span>
        <h1
        style={{ fontFamily: "Nevera" }}
        className="text-4xl text-[#89E900] mt-10"
      >
        STRYDE
      </h1>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          We're Building
          <span className="block text-[#89E900]">
            Something Amazing
          </span>
        </h1>

        <p className="text-white/60 text-lg mb-8">
          The page you're looking for doesn't exist yet.
          We're currently working on it and it'll be available soon.
        </p>

        <div className="flex justify-center">
          <a
            href="https://kaluhi-lance.vercel.app"
            className=" rounded-lg bg-[#89e900] py-3 px-3 text-black font-medium hover:opacity-90 transition"
          >
            View Portfolio
          </a>
          </div>
        <p className="mt-12 text-white/30 text-sm">
          © 2026 • Lance Kaluhi. All rights reserved.
        </p>
      </div>
      
    </section>
  );
}
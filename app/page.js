export default function Home() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/sunset.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div> {/* Subtle overlay */}
        <div className="relative z-10 text-center text-white px-6 max-w-5xl">
          {/* Main Title and CTA */}
          <h1 className="text-6xl font-extrabold leading-tight sm:text-8xl drop-shadow-md">
            Your Thoughts, <br />
            Perfectly Captured.
          </h1>
          <p className="mt-8 text-xl sm:text-2xl font-bold">
            Speak your mind, save your moments, and let Clarity do the rest.
          </p>
          <div className="mt-12">
            <a
              href="/login"
              className="px-12 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xl font-semibold shadow-lg hover:opacity-90 transition transform hover:scale-105"
            >
              Create your journal
            </a>
          </div>

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div
              className="p-8 rounded-xl shadow-lg transition transform hover:-translate-y-2 hover:scale-105"
              style={{
                backgroundColor: "#FFFFFF", // Vibrant blue background
                color: "#F97316", // White text
              }}
            >
              <h3 className="text-3xl font-bold mb-4">🎤 Voice Journaling</h3>
              <p className="text-lg">Speak freely, and we’ll save your thoughts with ease.</p>
            </div>

            {/* Feature 2 */}
            <div
              className="p-8 rounded-xl shadow-lg transition transform hover:-translate-y-2 hover:scale-105"
              style={{
                backgroundColor: "#FFFFFF", // Vibrant orange background
                color: "#F97316", // White text
              }}
            >
              <h3 className="text-3xl font-bold mb-4">😊 Instant Emojis</h3>
              <p className="text-lg">Capture your mood instantly with an assigned smiley.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-gray-400 text-center">
        <p className="text-lg">
          &copy; {new Date().getFullYear()} clarity. for the mind, and soul.
        </p>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen">
      {/* Hero Section */}
      <header className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-teal-500 to-blue-400 opacity-80 z-[-1]"></div>
        <div className="container mx-auto px-6 lg:px-12 py-24 text-center text-black">
          <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl">
            Keep Track of Your Thoughts<br />
            Anywhere. Anytime
          </h1>
          <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto">
            Clarity harnesses the power of AI to turn your quick voice recordings<br />
            into beautifully crafted entries. Start your journey of self-discovery now!
          </p>
          <div className="mt-8">
            <a
              href="/login"
              className="px-8 py-3 bg-white text-green-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
            >
              Get Started for Free
            </a>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-6 lg:px-12 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-800">Why Choose Voice-to-Journal?</h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 bg-white rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-green-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m13 4V8m-6 8V4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Voice-to-Journal Conversion</h3>
            <p className="text-gray-600 mt-2">
              Speak your thoughts and let AI turn them into cohesive, structured journals.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="p-6 bg-white rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-green-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Emotion Analysis</h3>
            <p className="text-gray-600 mt-2">
              Track your emotions and gain insights into your mental health journey.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="p-6 bg-white rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-green-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Thematic Filters</h3>
            <p className="text-gray-600 mt-2">
              Discover recurring themes like gratitude or productivity in your entries.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-br from-teal-500 to-green-500 text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-bold">Ready to Start Your Journey?</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Join thousands of users discovering their emotional trends and improving mindfulness with Voice-to-Journal.
          </p>
          <div className="mt-6">
            <a
              href="/login"
              className="px-8 py-3 bg-white text-teal-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
            >
              Create Your First Journal
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-900 text-gray-400 text-center">
        <p>&copy; 2025 Clarity. Journaling made simple and beautiful.</p>
      </footer>
    </div>
  );
}

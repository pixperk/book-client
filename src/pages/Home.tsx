import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import FeaturedBooks from "./FeaturedBooks";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <main className="container mx-auto px-6 py-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Welcome to LumineReads
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover your next favorite book and join our community of readers.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg"
          >
            <BookOpen className="h-6 w-6" /> Start Reading Now
          </Link>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-8 text-center text-purple-400">
            Featured Books
          </h2>
          <FeaturedBooks />
        </section>
      </main>
    </div>
  );
}

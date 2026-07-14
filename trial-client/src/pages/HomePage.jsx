import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function HomePage() {
  return (
    <>
      <Navbar />
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900">
            AI Fitness Coach
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-lg text-gray-600">
            Get personalized workout recommendations and improve your fitness
            with AI.
          </p>

          <Link
            to="/ai-assistant"
            className="rounded-xl bg-black px-8 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-gray-800"
          >
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}

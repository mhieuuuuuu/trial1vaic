import { useState } from "react";
import ExerciseCarousel from "./ExerciseCarousel";
import ExerciseDetail from "./ExerciseDetail";
import exercises from "../data/exercises";

export default function ExerciseSection() {
  const [selected, setSelected] = useState(exercises[0]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="mb-4 text-3xl font-bold text-gray-900 text-center">
        Choose Your Exercise
      </h2>
      <p className="mb-10 text-gray-500 text-center">
        Select an exercise below to watch the tutorial and learn the correct
        technique.
      </p>
      <ExerciseCarousel
        exercises={exercises}
        selected={selected}
        onSelect={setSelected}
      />

      <ExerciseDetail exercise={selected} />
    </section>
  );
}

import react from "react";
import Navbar from "./components/Navbar";
import ExerciseCarousel from "./components/ExerciseCarousel";
import exercises from "./data/exercises";
import { useState } from "react";

function App() {
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
  return (
    <div>
      <Navbar />
      <ExerciseCarousel
        exercises={exercises}
        selectedExercise={selectedExercise}
        onSelect={setSelectedExercise}
      />
    </div>
  );
}

export default App;

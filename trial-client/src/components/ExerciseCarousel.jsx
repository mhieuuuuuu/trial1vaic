export default function ExerciseCarousel({ exercises, selected, onSelect }) {
  return (
    <div className="mb-12 flex justify-center">
      <div className="overflow-x-auto">
        <div className="flex w-max gap-4 pb-2">
          {exercises.map((exercise) => (
            <button
              key={exercise.id}
              onClick={() => onSelect(exercise)}
              className={`whitespace-nowrap rounded-full px-6 py-3 font-medium transition-all duration-300 ${
                selected.id === exercise.id
                  ? "bg-black text-yellow-400 shadow-lg"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {exercise.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

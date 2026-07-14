export default function ExerciseDetail({ exercise }) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Video */}
      <div className="overflow-hidden rounded-3xl shadow-xl">
        <video controls className="aspect-video w-full object-cover">
          <source src={exercise.video} type="video/mp4" />
        </video>
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center rounded-3xl bg-white p-8 shadow-xl">
        <h2 className="mb-4 text-4xl font-bold">{exercise.name}</h2>

        <p className="mb-8 text-gray-600">{exercise.description}</p>

        <div className="space-y-4">
          <div>
            <span className="font-semibold">Target Muscles:</span>
            <p>{exercise.muscles}</p>
          </div>

          <div>
            <span className="font-semibold">Difficulty:</span>
            <p>{exercise.difficulty}</p>
          </div>

          <div>
            <span className="font-semibold">Recommendation:</span>
            <p>{exercise.reps}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

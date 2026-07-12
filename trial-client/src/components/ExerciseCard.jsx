export default function ExerciseCard({ exercise, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        group
        flex
        h-[500px]
        w-72
        shrink-0
        flex-col
        overflow-hidden
        rounded-3xl
        border
        transition-all
        duration-300

        ${
          selected
            ? "scale-[1.03] border-blue-500 bg-blue-50 shadow-xl"
            : "border-slate-200 bg-white hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl"
        }
      `}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-slate-200">
        {exercise.image ? (
          <img
            src={exercise.image}
            alt={exercise.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 text-7xl">
            {exercise.emoji}
          </div>
        )}

        <span className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow">
          {exercise.level}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 text-left">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{exercise.name}</h2>

          <p className="mt-2 text-lg text-slate-500">{exercise.target}</p>

          {/* Tags */}
          <div className="mt-5 flex min-h-[72px] flex-wrap content-start gap-2">
            {exercise.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="mt-auto pt-4">
          <div
            className={`
              flex
              h-14
              items-center
              justify-center
              rounded-2xl
              font-semibold
              text-lg
              transition-all

              ${
                selected
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 group-hover:bg-blue-600 group-hover:text-white"
              }
            `}
          >
            {selected ? "Selected" : "Choose Exercise"}
          </div>
        </div>
      </div>
    </button>
  );
}

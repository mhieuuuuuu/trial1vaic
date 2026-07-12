import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ExerciseCard from "./ExerciseCard";

export default function ExerciseCarousel({
  exercises,
  selectedExercise,
  onSelect,
}) {
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const index = exercises.findIndex(
      (item) => item.id === selectedExercise.id,
    );

    if (cardRefs.current[index]) {
      cardRefs.current[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedExercise, exercises]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-10">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Choose Exercise
            </h2>

            <p className="mt-1 text-slate-500">
              Select an exercise to view the tutorial and upload your video.
            </p>
          </div>

          {/* Desktop buttons */}
          <div className="hidden gap-3 md:flex">
            <button
              onClick={scrollLeft}
              className="rounded-full border bg-white p-3 shadow transition hover:bg-slate-100"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={scrollRight}
              className="rounded-full border bg-white p-3 shadow transition hover:bg-slate-100"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="
            flex
            gap-6
            overflow-x-auto
            scroll-smooth
            snap-x
            snap-mandatory
            pb-4
            scrollbar-hide
          "
        >
          {exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="snap-center"
            >
              <ExerciseCard
                exercise={exercise}
                selected={exercise.id === selectedExercise.id}
                onClick={() => onSelect(exercise)}
              />
            </div>
          ))}
        </div>

        {/* Mobile arrows */}
        <div className="mt-6 flex justify-center gap-4 md:hidden">
          <button
            onClick={scrollLeft}
            className="rounded-full border bg-white p-3 shadow"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={scrollRight}
            className="rounded-full border bg-white p-3 shadow"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

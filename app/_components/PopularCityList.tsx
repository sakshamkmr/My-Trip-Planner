"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950">
      <h2 className="max-w-7xl pl-4 mx-auto text-2xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
        Popular destinations you’ll love ✈️
      </h2>
      <p className="max-w-7xl pl-4 mx-auto mt-4 text-neutral-600 dark:text-neutral-400 text-base md:text-lg">
        Explore iconic cities, hidden gems, and unforgettable experiences —
        hand-picked for your next adventure.
      </p>

      <div className="mt-12">
        <Carousel items={cards} />
      </div>
    </div>
  );
}


const DummyContent = () => {
  return (
    <>
      {[...new Array(2)].map((_, index) => (
        <div
          key={"city-content-" + index}
          className="bg-white dark:bg-neutral-900 p-8 md:p-14 rounded-3xl mb-6 shadow-sm border border-neutral-200/60 dark:border-neutral-800"
        >
          <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-xl font-sans max-w-3xl mx-auto leading-relaxed">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              A destination worth remembering.
            </span>{" "}
            From iconic landmarks to local streets full of culture, food, and
            stories — this city has something special waiting for you.
          </p>

          <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-3xl mx-auto">
            Let AI plan your itinerary with the best time to visit, must-see
            places, travel tips, and experiences tailored just for you.
          </p>

          <img
            src="https://assets.aceternity.com/macbook.png"
            alt="Travel planning preview"
            className="mt-10 md:w-1/2 w-full mx-auto object-contain rounded-xl"
          />
        </div>
      ))}
    </>
  );
};

const data = [
  {
    category: "Paris, France",
    title: "Explore the City of Lights – Eiffel Tower, Louvre & more",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "New York, USA",
    title: "Experience NYC – Times Square, Central Park, Broadway",
    src: "https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Tokyo, Japan",
    title: "Discover Tokyo – Shibuya, Cherry Blossoms, Temples",
    src: "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Rome, Italy",
    title: "Walk through History – Colosseum, Vatican, Roman Forum",
    src: "https://plus.unsplash.com/premium_photo-1675975678457-d70708bf77c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Dubai, UAE",
    title: "Luxury and Innovation – Burj Khalifa, Desert Safari",
    src: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "India",
    title: "Harbour Views – Opera House, Bondi Beach & Wildlife",
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
];


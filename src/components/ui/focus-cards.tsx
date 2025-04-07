import React, { useState } from "react";
import { cn } from "../../lib/utils";

// Type for a single card
type CardType = {
  title: string;
  src: string;
  href: string;
};

// Card Component
const Card: React.FC<{
  card: CardType;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}> = React.memo(({ card, index, hovered, setHovered }) => (
  <a
    href={card.href}
    target="_blank"
    rel="noopener noreferrer"
    className="block"
  >
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-2xl relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-72 sm:h-[22rem] md:h-[26rem] lg:h-[30rem] w-full transition-all duration-300 ease-out shadow-lg",
        hovered !== null && hovered !== index && "blur-sm scale-[0.97]"
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0 w-full h-full"
      />
      <div
        className={cn(
          "absolute inset-0 flex items-end p-6 sm:p-8 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-2xl sm:text-3xl lg:text-2xl font-grotesk text-zinc-100 drop-shadow-lg bg-black/60 px-4 py-2 rounded-lg">
          {card.title}
        </div>
      </div>
    </div>
  </a>
));

Card.displayName = "Card";

// FocusCards Wrapper Component
export const FocusCards: React.FC<{ cards: CardType[] }> = ({ cards }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 mx-auto  max-w-screen-xl">
        {cards.map((card, index) => (
          <Card
            key={card.title}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
      </div>
    </>
  );
};

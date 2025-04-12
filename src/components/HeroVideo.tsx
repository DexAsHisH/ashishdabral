import React, { useState } from "react";

const HeroVideo: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h2 className="mb-6 mt-6 text-lg md:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 uppercase tracking-widest text-center">
        mini-cursor AI agent
      </h2>

      {!showVideo ? (
        <div
          className="cursor-pointer w-64 h-36 md:w-96 md:h-52 overflow-hidden rounded-xl shadow-lg border-2 border-white/20 hover:scale-105 transition-transform duration-300"
          onClick={() => setShowVideo(true)}
        >
          
          <img
            className="w-full h-full object-cover"
            src={`https://img.youtube.com/vi/9EcLnXhtbqM/hqdefault.jpg`}
            alt="AI agent video thumbnail"
          />
        </div>
      ) : (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black cursor-pointer"
          onClick={() => setShowVideo(false)}
        >
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/9EcLnXhtbqM"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default HeroVideo;

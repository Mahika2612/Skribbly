import React from 'react';
import catImage from '../assets/ratelimitcat.png'; // ✅ corrected path

const RateLimitedUI = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-pink-50 px-4">
      <img
        src={catImage}
        alt="Rate Limit Cat"
        className="w-52 h-52 object-contain mb-6 animate-bounce"
      />
      <h2 className="text-3xl font-bold text-pink-800 mb-2">Whoa there!</h2>
      <p className="text-pink-700 text-lg max-w-md">
        You've been creating notes too quickly. Please slow down, or take a little cat nap while we cool things down. 😺
      </p>
      <p className="mt-4 text-sm text-pink-600 italic">
        (Try again after a few seconds.)
      </p>
    </div>
  );
};

export default RateLimitedUI;

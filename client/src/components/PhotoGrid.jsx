import React from "react";

function PhotoGrid({ placeInfo, setShowPhotos }) {
  return (
    <div className="hidden md:grid md:grid-rows-1 md:grid-cols-[2fr_1fr_1fr] mt-5 rounded-2xl gap-2 h-[32rem] md:overflow-hidden relative">
      <div className="flex">
        <img src={placeInfo.photos[0]} alt="" className="object-cover w-full" />
      </div>
      <div className="grid grid-rows-2 gap-2">
        <div className="flex">
          <img
            src={placeInfo.photos[1]}
            alt=""
            className="object-cover w-full"
          />
        </div>
        <div className="flex">
          <img
            src={placeInfo.photos[2]}
            alt=""
            className="object-cover w-full"
          />
        </div>
      </div>
      <div className="grid grid-rows-2 gap-2">
        <div className="flex">
          <img
            src={placeInfo.photos[3]}
            alt=""
            className="object-cover w-full"
          />
        </div>
        <div className="flex">
          <img
            src={placeInfo.photos[4]}
            alt=""
            className="object-cover w-full"
          />
        </div>
      </div>
      <button
        className="absolute bottom-5 right-3 p-2 rounded-2xl bg-white shadow-sm shadow-black bg-opacity-90 flex gap-2"
        onClick={() => setShowPhotos(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        Show all photos
      </button>
    </div>
  );
}

export default PhotoGrid;

import React, { useState } from "react";

function ShowAllPhotos({ placeInfo }) {
  const [pn, setPn] = useState(0);
  return (
    <div className="flex md:hidden mt-4 relative">
      <img
        src={placeInfo.photos[pn]}
        alt=""
        className="w-full object-cover aspect-square"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 bg-black text-white absolute top-1/2 left-0 bg-opacity-70 cursor-pointer"
        onClick={() => {
          if (pn === 0) {
            return setPn(pn);
          }
          setPn(pn - 1);
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 bg-black text-white absolute top-1/2 right-0 bg-opacity-70 cursor-pointer"
        onClick={() => {
          if (pn === placeInfo.photos.length - 1) {
            return setPn(pn);
          }
          setPn(pn + 1);
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
}

export default ShowAllPhotos;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import PhotoGrid from "../components/PhotoGrid";
import ShowAllPhotos from "../components/ShowAllPhotos";
import BookingWidget from "../components/BookingWidget";

function PlacePage() {
  const { placeId } = useParams();
  const [pn, setPn] = useState(0);
  const [loading, setLoading] = useState(true);
  const [placeInfo, setPlaceInfo] = useState({});
  useEffect(() => {
    const getInfo = async () => {
      const data = await (await axios.get(`/places/${placeId}`)).data;
      setPlaceInfo(data);
      setLoading(false);
    };
    getInfo();
  }, []);
  const [showPhotos, setShowPhotos] = useState(false);
  if (loading) {
    return (
      <div className="absolute top-0 left-0 w-full h-full bg-gray-100 grid grid-cols-1 place-items-center overflow-hidden">
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
  if (showPhotos) {
    return (
      <div className="flex mt-4 relative h-[42rem]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 absolute right-0 bg-white bg-opacity-75 cursor-pointer"
          onClick={() => setShowPhotos(false)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>

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
          className="w-8 h-8 bg-black text-white absolute top-1/2 left-0 bg-opacity-70 cursor-pointer"
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
          className="w-8 h-8 bg-black text-white absolute top-1/2 right-0 bg-opacity-70 cursor-pointer"
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
  return (
    <div className="mt-8">
      <h1 className="text-3xl truncate font-semibold">{placeInfo.title}</h1>
      <p className="text-md font-medium underline">{placeInfo.address}</p>

      <PhotoGrid placeInfo={placeInfo} setShowPhotos={setShowPhotos} />

      <ShowAllPhotos
        placeInfo={placeInfo}
        showPhotos={showPhotos}
        setShowPhotos={setShowPhotos}
      />

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-4 gap-10">
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Description</h2>
          <p className="mt-2">{placeInfo.description}</p>
          <h2 className="text-2xl font-semibold mt-4">Extra Info</h2>
          <p className="mt-2">{placeInfo.extraInfo}</p>
          <div className="grid md:grid-cols-2 mt-4 gap-5">
            <div className=" bg-gray-200 p-5 rounded-2xl">
              <p className="font-semibold text-lg text-center">Perks</p>
              {placeInfo.perks.map((perk, i) => {
                return <li key={i}>{perk}</li>;
              })}
            </div>
            <div className=" bg-gray-200 p-5 rounded-2xl">
              <p>CheckIn Time :- {placeInfo.checkIn}</p>
              <p>CheckOut Time :- {placeInfo.checkOut}</p>
              <p>Max number of guest :- {placeInfo.maxGuest}</p>
            </div>
          </div>
        </div>
        <BookingWidget placeInfo={placeInfo} />
      </div>
    </div>
  );
}

export default PlacePage;

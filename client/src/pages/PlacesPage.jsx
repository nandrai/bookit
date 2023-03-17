import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { TailSpin } from "react-loader-spinner";

function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const data = await (await axios.get("/places/my-places")).data;
        setPlaces(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPlaces();
  });

  const deleteHandler = async (str, i) => {
    await axios.delete("places/my-places", {
      data: { _id: str },
    });
    let arr = places;
    arr.splice(i, 1);
    setPlaces([...arr]);
  };

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

  return (
    <div className=" w-full text-center">
      <AccountNav />
      <Link
        to={"/account/places/new"}
        className="inline-flex bg-primary text-white px-4 py-2 rounded-full gap-1 items-center"
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add New Place
      </Link>
      {places.length > 0 &&
        places.map((place, i) => {
          return (
            <div className="relative" key={place._id}>
              <Link
                to={`/account/places/${place._id}`}
                className="grid grid-cols-1 md:grid-cols-[1fr_2fr] items-center justify-center mt-6 bg-gray-100 rounded-2xl p-3"
              >
                <div className="flex h-56">
                  <img
                    src={place.photos[0]}
                    alt={place.title}
                    className="w-full object-cover"
                  />
                </div>

                <div className="text-left ml-4">
                  <span className="text-2xl">{place.title}</span>
                  <br />
                  <span className=" text-gray-700">{place.address}</span>
                  <br />
                  <span className="block mt-3 text-md">
                    {place.description}
                  </span>
                </div>
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                onClick={() => {
                  deleteHandler(place._id, i);
                }}
                className="w-7 h-7 absolute top-3 right-3 cursor-pointer hover:scale-125 text-white bg-black p-1 rounded-full bg-opacity-70"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          );
        })}
    </div>
  );
}

export default PlacesPage;

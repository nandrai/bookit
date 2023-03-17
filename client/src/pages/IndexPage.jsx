import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

function IndexPage() {
  const [allPlaces, setAllPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAllPlaces = async () => {
      try {
        const result = await (await axios.get("/places")).data;
        setAllPlaces(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPlaces();
  }, []);
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
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {allPlaces.map((place, i) => {
        return (
          <Link to={`/place/${place._id}`} className="flex flex-col" key={i}>
            <img
              src={place.photos[0]}
              alt=""
              className="rounded-2xl aspect-square object-cover"
            />
            <p className="font-semibold text-sm">{place.address}</p>
            <h2 className="text-sm truncate">{place.title}</h2>
            <p>
              <span className="font-semibold">₹{place.price}</span> per night
            </p>
          </Link>
        );
      })}
    </div>
  );
}

export default IndexPage;

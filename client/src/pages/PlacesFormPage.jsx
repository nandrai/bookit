import React, { useEffect, useState } from "react";
import axios from "axios";
import Perks from "../components/Perks";
import { ProgressBar, TailSpin } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";

function PlacesFormPage() {
  const navigate = useNavigate();
  const preInput = (heading, text) => {
    return (
      <>
        <h2 className="mt-4 text-2xl">{heading}</h2>
        <p className=" text-gray-500">{text}</p>
      </>
    );
  };
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");

  const [address, setAddress] = useState("");

  const [addedPhotos, setAddedPhotos] = useState([]);

  const [description, setDescription] = useState("");

  const [perks, setPerks] = useState([]);

  const [extraInfo, setExtraInfo] = useState("");

  const [checkIn, setCheckIn] = useState("");

  const [checkOut, setCheckOut] = useState("");

  const [maxGuest, setMaxGuest] = useState(1);

  const [price, setPrice] = useState(2000);

  const [pLoading, setPLoading] = useState(true);

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAddedPhotos((prev) => [...prev, reader.result]);
    };
  };

  const photoUploadHandler = (ev) => {
    const file = ev.target.files;
    for (let i of file) {
      previewFiles(i);
    }
  };

  const saveHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (id) {
        const result = await axios.put(`/places/${id}`, {
          title,
          address,
          addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuest,
          price,
        });
        console.log(result);
      } else {
        const result = await axios.post("/places", {
          title,
          address,
          addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuest,
          price,
        });
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    navigate("/account/places");
  };

  useEffect(() => {
    const getAPlace = async () => {
      if (!id) {
        setPLoading(false);
        return null;
      }
      const placeDoc = await (await axios.get(`/places/${id}`)).data;
      console.log(placeDoc);
      if (placeDoc) {
        setTitle(placeDoc.title);
        setAddress(placeDoc.address);
        setAddedPhotos(placeDoc.photos);
        setDescription(placeDoc.description);
        setPerks(placeDoc.perks);
        setExtraInfo(placeDoc.extraInfo);
        setCheckIn(placeDoc.checkIn);
        setCheckOut(placeDoc.checkOut);
        setMaxGuest(placeDoc.maxGuest);
        setPrice(placeDoc.price);
        setPLoading(false);
      }
    };
    getAPlace();
  }, [id]);

  if (pLoading) {
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
    <form className="" onSubmit={saveHandler}>
      {preInput(
        "Title",
        "Title for your place should be short and catchy as in advertisement"
      )}
      <input
        type="text"
        placeholder="title, for example: My lovely apartment"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {preInput("Address", "Address to this place")}
      <input
        type="text"
        placeholder="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      {preInput("Photos", "more = better")}
      <div className="mt-2 gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <label className="h-32 flex justify-center items-center gap-1 bg-transparent border rounded-2xl p-8 text-2xl text-gray-600 cursor-pointer">
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
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
          <input
            className="hidden"
            type="file"
            onChange={photoUploadHandler}
            multiple
          />
        </label>

        {addedPhotos.map((img, i) => {
          return (
            <div key={i} className="h-32 flex relative">
              <img src={img} className="rounded-2xl w-full object-cover" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 absolute bottom-2 right-1 cursor-pointer hover:scale-125 text-white bg-black p-1 rounded-full bg-opacity-70"
                onClick={() =>
                  setAddedPhotos((prev) => {
                    const arr = [...prev];
                    arr.splice(i, 1);
                    return arr;
                  })
                }
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

      {preInput("Description", "description of the place")}
      <textarea
        type="text"
        placeholder="describe your place"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      {preInput("Perks", "select all perks of your place")}
      <Perks perks={perks} setPerks={setPerks} />

      {preInput("Extra info", "house rules, etc")}
      <textarea
        type="text"
        placeholder=""
        className="h-12"
        value={extraInfo}
        onChange={(e) => setExtraInfo(e.target.value)}
      />

      {preInput(
        "Check in&out times",
        "add check in and out times, remember to have some time window for cleaning the room between guests"
      )}
      <div className="grid sm:grid-cols-3 gap-2">
        <div>
          <h1 className="mt-2 -mb-1">Check in time</h1>
          <input
            type="text"
            placeholder="14:00"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>
        <div>
          <h1 className="mt-2 -mb-1">Check out time</h1>
          <input
            type="text"
            placeholder="11"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>
        <div>
          <h1 className="mt-2 -mb-1">Max number of guests</h1>
          <input
            type="number"
            value={maxGuest}
            onChange={(e) => setMaxGuest(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <h1 className="mt-4 text-2xl">Rent per day</h1>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="primary my-4 flex justify-center">
        {loading ? (
          <span className="flex gap-10 justify-center">
            Please wait... this may take up to a minute
            <TailSpin
              height="25"
              width="25"
              color="#fff"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </span>
        ) : (
          "Save"
        )}
      </button>
    </form>
  );
}

export default PlacesFormPage;

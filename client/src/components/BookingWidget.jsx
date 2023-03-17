import React, { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { contextProvider } from "../Context";
import { useContext } from "react";

function BookingWidget({ placeInfo }) {
  const navigate = useNavigate();
  const { user } = useContext(contextProvider);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [checkInDate, setCheckInDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfGuest, setNumberOfGuest] = useState(1);
  const [numberOfNights, setNumberOfNights] = useState(0);

  const bookingHandler = (e) => {
    e.preventDefault();
    const addBooking = async () => {
      const response = await axios.post("/bookings", {
        placeId: placeInfo._id,
        name,
        phone,
        checkInDate,
        checkOutDate,
        numberOfGuest,
        numberOfNights,
        totalPrice: numberOfNights * placeInfo.price,
        rate: placeInfo.price,
      });
      console.log(response);
      navigate("/account/bookings");
    };
    addBooking();
  };

  useEffect(() => {
    setNumberOfNights(
      differenceInCalendarDays(new Date(checkOutDate), new Date(checkInDate))
    );
  }, [checkOutDate, checkInDate]);

  if (!user) {
    return (
      <form
        className="md:mt-4 flex flex-col gap-2 bg-gray-300 p-5 rounded-2xl justify-center"
        onSubmit={() => navigate("/account")}
      >
        <button className="primary" type="submit">
          Login first
        </button>
      </form>
    );
  }
  return (
    <form
      onSubmit={bookingHandler}
      className="md:mt-4 flex flex-col gap-2 bg-gray-300 p-5 rounded-2xl"
    >
      <h2 className="text-center text-xl">Price: ₹{placeInfo.price} / Night</h2>
      <hr className="text-black" />
      <label>
        <p>Full Name:</p>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          value={name}
          required
        />
      </label>
      <label>
        <p>Phone Number:</p>
        <input
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          value={phone}
          required
        />
      </label>
      <div className="flex gap-1 ">
        <label>
          <p className="ml-2 text-lg">CheckIn Date:</p>
          <input
            onChange={(e) => {
              if (e.target.value < new Date().toISOString().slice(0, 10)) {
                return setCheckInDate(new Date().toISOString().slice(0, 10));
              }
              return setCheckInDate(e.target.value);
            }}
            type="date"
            name=""
            id=""
            value={checkInDate}
            required
          />
        </label>
        <label>
          <p className="ml-2 text-lg">CheckOut Date:</p>
          <input
            onChange={async (e) => {
              if (e.target.value <= checkInDate) {
                return setCheckOutDate("");
              } else {
                setCheckOutDate(e.target.value);
              }
            }}
            type="date"
            name=""
            id=""
            value={checkOutDate}
            required
          />
        </label>
      </div>
      <label>
        <p className="ml-2 text-lg">Number of Guest:</p>
        <input
          onChange={(e) => setNumberOfGuest(e.target.value)}
          type="number"
          name=""
          id=""
          value={numberOfGuest}
          required
        />
      </label>
      <button type="submit" className="primary">
        Book Now{" "}
        {numberOfNights > 0 ? `(₹${numberOfNights * placeInfo.price})` : ""}
      </button>
    </form>
  );
}

export default BookingWidget;

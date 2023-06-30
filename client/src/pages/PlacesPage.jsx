import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Perks from "../components/Perks";
import axios from "axios";
import AccountNav from "./AccountNav";
const PlacesPage = () => {
  let [places, setPlaces] = useState([]);
  const { action } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/user-places").then((response) => {
      setPlaces(response.data);
      console.log(places);
    });
  }, []);
  return (
    <div>
      <AccountNav />

      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
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
          Add new place
        </Link>
      </div>
      <h3 className="bg-green-700 text-white ml-17 mt-3 rounded-2xl px-8 py-2 w-48">
        My added Places
      </h3>
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={"/place/" + place._id}>
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {place?.image && (
                  <img
                    className="rounded-2xl object-cover aspect-square h-30"
                    src={place.image}
                    alt=""
                  />
                )}
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold">${place.price}</span> per night
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;

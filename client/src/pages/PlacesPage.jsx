import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../components/Perks";
import axios from "axios";
const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhoto, setAddedPhoto] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  async function addPhotoByLink(e){
    e.preventDefault()
    const{data:filename}=await axios.post('/upload-by-link',{link:photoLink})
    setAddedPhoto(prev=>{
        return[...prev,filename]
    })
    setPhotoLink('')
  }
  function uploadPhoto(e){
    // const files=e.target.files;
    // const data=new FormData()
    // data.set('files',files)
  }
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
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
      )}
      {action == "new" && (
        <div>
          <form action="">
            {preInput(
              "Title",
              "Title for your place,should be short and catchy as in advertisement"
            )}

            <input
              type="text"
              value={title} onChange={(e)=>setTitle(e.target.value)}

              placeholder="title, for example: My lovely apt"
            />
            {preInput("Address", "Address to this place")}

            <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="address" />
            {preInput("Photos", "more=better")}

            <div className="flex gap-2">
              <input type="text" value={photoLink} onChange={(e)=>setPhotoLink(e.target.value)} placeholder="Add using a link  ....jpg" />
              <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">
                Add&nbsp;photo
              </button>
            </div>

            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhoto.length>0 && addedPhoto.map(link=>(
                <div className="h-32 flex">{<img className="rounded-2xl " src={'http://localhost:3000/uploads/'+link} alt="" />}</div>
              ))}
              <label className="flex cursor-pointer items-center justify-center gap-1 border bg-transparent text-2xl text-gray-600 rounded-2xl p-2">
              <input type="file" className="hidden" onChange={uploadPhoto} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
                    clipRule="evenodd"
                  />
                </svg>
                Upload
              </label>
            </div>
            {preInput("Description", "description of the place")}

            <textarea value={description} onChange={(e)=>setDescription(e.target.value)}/>
            {preInput("Perks", "select all the perks of your place")}

            <Perks selected={perks} onChange={setPerks} />
            {preInput("Extra info", "house rules, etc")}

            <textarea value={extraInfo} onChange={(e)=>setExtraInfo(e.target.value)}/>
            {preInput(
              "Check in & out times",
              "add check in and out times, remember to have some time window for cleaning the room between guests"
            )}

            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} type="text" placeholder="14" />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input value={checkOut} onChange={(e)=>setCheckOut(e.target.value)} type="text" placeholder="11"/>
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input value={maxGuests} onChange={(e)=>setMaxGuests(e.target.value)} type="text" />
              </div>
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;

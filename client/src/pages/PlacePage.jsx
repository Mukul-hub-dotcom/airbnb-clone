import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>

      <img src={place.image} alt="" className="h-60" />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Exercitationem iste ab sapiente odit hic voluptatem in quaerat
            quidem, maxime provident!
          </div>
          Check-in: 10 Am
          <br />
          Check-out: 8 Pm
          <br />
          Max number of guests: 400
        </div>
        <div></div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quos
          ducimus tempora reiciendis minima consectetur ad eveniet vero suscipit
          illo. Facilis ex fuga quo repudiandae voluptatem consequatur
          voluptates temporibus ab tempora, necessitatibus doloribus eaque natus
          ipsam quas tenetur? Inventore eveniet voluptate debitis illo minus eum
          repudiandae molestias nihil minima accusamus.
        </div>
      </div>
    </div>
  );
}

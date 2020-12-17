import React from "react";

interface IRestaurantProps {
  id: string;
  coverImg?: string;
  name: string;
  address?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  coverImg,
  name,
  address,
}) => (
  <div className="flex flex-col">
    <div
      className="bg-yellow-600 py-28 bg-cover mb-3"
      style={{ backgroundImage: `url(${coverImg})` }}
    ></div>
    <h3 className="text-xl font-medium">{name}</h3>
    <span className=" border-t mt-3 py-3  text-xs opacity-70 font-extralight">
      {address}
    </span>
  </div>
);
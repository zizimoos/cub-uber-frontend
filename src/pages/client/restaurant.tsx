import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  restaurant,
  restaurantVariables,
} from "../../__generated__/restaurant";

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      error
      ok
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IRestaurantParams {
  id: string;
}

export const Restaurant = () => {
  const params = useParams<IRestaurantParams>();
  // eslint-disable-next-line
  const { loading, data } = useQuery<restaurant, restaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: { restaurantId: +params.id },
      },
    }
  );
  console.log(data);
  return (
    <div>
      <div
        className=" bg-gray-800 py-48 bg-cover bg-top"
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
        }}
      >
        <div className="bg-white w-3/12 py-8 pl-44">
          <h4 className="text-2xl mb-3">{data?.restaurant.restaurant?.name}</h4>
          <h5 className=" text-sm font-light mb-2">
            {data?.restaurant.restaurant?.address}
          </h5>
        </div>
      </div>
    </div>
  );
};

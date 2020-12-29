import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
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
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
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
      <div className="container grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
        {data?.restaurant.restaurant?.menu?.map((dish, index) => (
          <Dish
            key={index}
            name={dish.name}
            description={dish.description}
            price={dish.price}
            isCustomer={true}
            options={dish.options}
          />
        ))}
      </div>
    </div>
  );
};

import { gql, useQuery } from "@apollo/client";
import React from "react";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        categoryImg
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = () => {
  const { data, loading, error } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });
  console.log(data);
  return (
    <div>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          className="input rounded-md border-0 w-3/12 focus:ring-gray-800"
          type="Search"
          placeholder="Search Restaurants..."
        ></input>
      </form>
      {!loading && (
        <div className="max-w-screen-2xl mx-auto mt-8">
          <div className="flex justify-around  max-w-screen-sm mx-auto">
            {data?.allCategories.categories?.map((category, index) => (
              <div className="flex flex-col justify-center items-center group">
                <div
                  className="w-16 h-16  bg-cover rounded-full group-hover:opacity-50 cursor-pointer bg-yellow-600"
                  key={index}
                  style={{ backgroundImage: `url(${category.categoryImg})` }}
                ></div>
                <span className=" mt-2  text-xs text-center font-medium">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-x-5 gap-y-10 mt-10">
            {data?.restaurants?.results?.map((restaurant) => (
              <div>
                <div
                  className="bg-yellow-600 py-28 bg-cover mb-3"
                  style={{ backgroundImage: `url(${restaurant?.coverImg})` }}
                ></div>
                <h3 className="text-xl font-medium">{restaurant.name}</h3>
                <span className="text-sm font-extralight">
                  {restaurant?.address}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

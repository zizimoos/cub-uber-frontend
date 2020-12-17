import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Restaurant } from "../../components/restaurant";
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
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  const { register } = useForm();
  return (
    <div>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          className="input rounded-md border-0 w-3/4 md:w-3/12 focus:ring-gray-800"
          type="Search"
          placeholder="Search Restaurants..."
        ></input>
      </form>
      {!loading && (
        <div className="max-w-screen-2xl pb-20  mx-auto mt-8">
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
          <div className="grid md:grid-cols-3 gap-x-5 gap-y-10 mt-10">
            {data?.restaurants?.results?.map((restaurant) => (
              <Restaurant
                id={restaurant.id + ""}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                address={restaurant.address}
              ></Restaurant>
            ))}
          </div>
          <div className="grid grid-cols-3 text-center max-w-sm items-center mx-auto mt-10">
            {page > 1 ? (
              <button
                className=" focus:outline-none font-medium text-2xl"
                onClick={onPrevPageClick}
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span className="mx-5">
              page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <button
                className=" focus:outline-none font-medium text-2xl"
                onClick={onNextPageClick}
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

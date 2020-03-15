import React from "react";
import { server } from "../../lib/api";
import {
  DeleteListingData,
  DeleteListingVariables,
  ListingsData
} from "./types";

const LISTINGS = `
  query Listings {
    listings {
      id,
      title,
      image,
      price,
      address,
      numberOfBedrooms,
      numberOfBathrooms,
      rating
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id,
      title,
      image,
      price,
      address,
      numberOfBedrooms,
      numberOfBathrooms,
      rating
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(data);
  };

  const deleteListing = async () => {
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTING,
      variables: { id: "" }
    });
    console.log(data);
  };

  return (
    <main>
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <button onClick={fetchListings} id="Listings">
          Get Listings
        </button>
      </div>
      <div>
        <button onClick={deleteListing} id="Delete">
          Delete a listing
        </button>
      </div>
    </main>
  );
};

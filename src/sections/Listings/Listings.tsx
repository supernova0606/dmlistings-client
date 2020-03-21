import React, { useState, useEffect } from "react";
import { server } from "../../lib/api";
import {
  DeleteListingData,
  DeleteListingVariables,
  Listing,
  ListingsData
} from "./types";

const LISTING_PROPS = `{
  id,
  title,
  image,
  price,
  address,
  numberOfBedrooms,
  numberOfBathrooms,
  rating
}`;

const LISTINGS = `
  query Listings {
    listings ${LISTING_PROPS}
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) ${LISTING_PROPS}
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const [listings, setListings] = useState<Listing[] | null>(null);

  useEffect(
    () => {
      // on first render fetch listings
      fetchListings();
      // optionally add return callback below for cleanup after component unmounts
    },
    [] // ensures only runs on first render (component mount).
    // Optionally pass listings as dependency to run on changes to listings
  );

  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    setListings(data.listings);
  };

  const deleteListing = async (id: string) => {
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTING,
      variables: { id: id }
    });
    fetchListings();
    console.log(data.deleteListing);
  };

  const listingsList =
    listings === null ? null : (
      // ternary expression: return JSX list of listings if not null, null otherwise
      <div>
        <ul>
          {listings.map(listing => {
            return (
              <li key={listing.id} id={listing.id}>
                {listing.title}. {listing.price}. {listing.rating}.{" "}
                <button
                  onClick={() => deleteListing(listing.id)}
                  id={`Delete${listing.id}`}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );

  return (
    <main>
      <div>
        <h1>{title}</h1>
      </div>
      {listingsList}
      <div>
        <button onClick={fetchListings} id="Listings">
          Get Listings
        </button>
      </div>
    </main>
  );
};

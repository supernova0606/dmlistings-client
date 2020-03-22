import React from "react";
import { server, useQuery } from "../../lib/api";
import {
  DeleteListingData,
  DeleteListingVariables,
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
  const { data, refetch } = useQuery<ListingsData>(LISTINGS);

  const listings = data ? data.listings : null;

  const deleteListing = async (id: string) => {
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTING,
      variables: { id: id }
    });
    console.log(data.deleteListing);
    refetch();
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
    </main>
  );
};

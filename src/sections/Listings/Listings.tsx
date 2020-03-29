import React from "react";
import { useQuery, useMutation } from "../../lib/api";
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

const LISTINGS_QUERY = `
  query Listings {
    listings ${LISTING_PROPS}
  }
`;

const DELETE_LISTING_QUERY = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) ${LISTING_PROPS}
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const { data, loading, error, refetch } = useQuery<ListingsData>(
    LISTINGS_QUERY
  );

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError }
  ] = useMutation<DeleteListingData, DeleteListingVariables>(
    DELETE_LISTING_QUERY
  );

  const listings = data ? data.listings : null;

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ id });
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
                  onClick={() => handleDeleteListing(listing.id)}
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

  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h3>Deletion in progress...</h3>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h3>
      Uh Oh! Something went wrong while deleting listing. Please try again soon.
    </h3>
  ) : null;

  return (
    <main>
      {data !== null ? (
        <h2>
          {title} {loading ? " (Loading...)" : null}
        </h2>
      ) : loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>Uh Oh! Something went wrong. Please try again later.</h2>
      ) : null}
      {listingsList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </main>
  );
};

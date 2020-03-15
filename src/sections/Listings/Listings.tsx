import React from "react";
import { server } from "../../lib/api";

const LISTINGS = `
  query {
    listings {
      id,
      title,
      image,
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
    const { data } = await server.fetch({ query: LISTINGS });
    console.log(data);
  };

  return (
    <main>
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <button onClick={fetchListings}>Get Listings</button>
      </div>
    </main>
  );
};

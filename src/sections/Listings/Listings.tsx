import React from "react";

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const fetchListings = () => {
    console.log("click");
  };
  return (
    <main>
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <button onClick={fetchListings}>Click me</button>
      </div>
    </main>
  );
};

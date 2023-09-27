"use client";

import { useRouter } from "next/navigation";

import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeReservations, SafeUser } from "../type";
import { useCallback, useReducer, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { error } from "console";
import ListingCard from "../components/listings/ListingCard";

interface PropetiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropetiesClient: React.FC<PropetiesClientProps> = ({
  listings,
  currentUser
}) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");

  const onCancel = useCallback(
    // どのid?
    (id: string) => {
      setDeleteId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listings canceled");
          // リロード
          router.refresh();
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setDeleteId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Propeties" subtitle="List of your propeties" />
      <div
        className="
      mt-10
      grid 
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      gap-8

      "
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disable={deleteId === listing.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropetiesClient;

import EmptyState from "../components/EmptyState";
import ClientOnly from "../ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";

import TripsClient from "./PropetiesClient";
import ListingCard from "../components/listings/ListingCard";
import getListings from "../actions/getListings";
import PropetiesClient from "./PropetiesClient";

const PropetiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please Login" />
      </ClientOnly>
    );
  }

  const listing = await getListings({
    userId: currentUser.id
  });

  if (listing.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No propeties found"
          subtitle="Looks like you havent no propeties"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropetiesClient listings={listing} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropetiesPage;

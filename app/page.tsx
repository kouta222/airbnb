import ClientOnly from "./ClientOnly";
import getListings from "./actions/getListings";
import Container from "./components/Container";

import ListingCard from "./components/listings/ListingCard";

import EmptyState from "./components/EmptyState";
import getCurrentUser from "./actions/getCurrentUser";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6 gap-8 mt-10">
          <div>
            {listings.map((listing: any) => {
              return (
                <ListingCard
                  currentUser={currentUser}
                  key={listing.id}
                  data={listing}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </ClientOnly>
  );
}

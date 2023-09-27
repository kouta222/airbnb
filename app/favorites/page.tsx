import EmptyState from "../components/EmptyState";
import ClientOnly from "../ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListing from "../actions/getFavorites";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const lisitngs = await getFavoriteListing();

  if (lisitngs.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={lisitngs} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritesPage;

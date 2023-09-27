import client from "../app/libs/prismadb";
import { error } from "console";

export default async function renameField() {
  const reservations = await client.reservation.findMany();

  for (let reservation of reservations) {
    if (reservation.useId) {
      await client.reservation.update({
        where: { id: reservation.id },
        data: { userId: reservation.useId, useId: null }
      });
    }
  }
}

renameField()
  .then(() => {
    console.log("Field renaming completed");
    client.$disconnect();
  })
  .catch((error) => {
    console.error("Error renaming the field", error);
    client.$disconnect();
  });

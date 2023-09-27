import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { type } from "os";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error;
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId != "string") {
    throw new Error("Invalid ID");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      //   予約した人と作成した人がキャンセルできるように
      OR: [{ useId: currentUser.id }, { listing: { userId: currentUser.id } }]
    }
  });
  return NextResponse.json(reservation);
}

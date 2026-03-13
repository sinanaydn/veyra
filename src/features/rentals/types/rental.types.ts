export type ReservationStatus =
  | "PENDING"
  | "CONFIRMED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED";

export interface Reservation {
  id: string;
  reservationCode: string;
  carId: string;
  userId: string;
  status: ReservationStatus;
  pickupLocation: string;
  pickupDateTime: string;
  returnLocation: string;
  returnDateTime: string;
  days: number;
  subtotal: number;
  deposit: number;
  extrasTotal: number;
  grandTotal: number;
  createdAt: string;
  carBrandName?: string;
  carModelName?: string;
  carImageUrl?: string;
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rentalsService } from "../services/rentals.service";
import { rentalKeys } from "./useRentals";
import type { ReservationStatus } from "../types/rental.types";

export function useUpdateReservationStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ReservationStatus }) =>
      rentalsService.updateStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: rentalKeys.all });
    },
  });
}

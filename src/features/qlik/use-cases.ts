import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotFoundError } from "~/errors/not-found";
import { UnauthorizedError } from "~/errors/unathorized";
import { ApiError } from "~/errors/api-error";
import { addSelection, deleteSelection } from "~/services/qlik.api";
import { SelectionData } from "./types";

const queryKey = ["selections"];
export const mutationKeys = {
  addSelection: ["addSelection"],
};

export function useAddSelection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.addSelection,
    mutationFn: async (selection: SelectionData ) => {
      try {
         await addSelection({ data: selection });

        queryClient.invalidateQueries({
          queryKey,
        });
      } catch (error) {
        console.error("Error adding selection:", error); // TODO: Log error to a monitoring service
        throw new Error("Something went wrong while adding the selection, please try again later");
      }
    },
  });
}

export function useDeleteSelection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      try {
         await deleteSelection({ data: { id: id } });

        queryClient.invalidateQueries({
          queryKey,
        });
      } catch (error) {
        console.error("Error deleting selection:", error);
        if (error instanceof Error) {
          throw new Error("Something went wrong while deleting the selection, please try again later");
        } else if (error instanceof ApiError) {
          switch (error.type) {
            case "not_found":
              throw new NotFoundError("We could not find the selection you are trying to delete");
            case "unauthorized":
              throw new UnauthorizedError("You are not authorized to delete this selection");
            default:
              throw new Error(
                "Something went wrong while deleting the selection, please try again later"
              );
          }
        }
      }
    },
  });
}

import {
  createUserAccount,
  signInAccount,
  signOutAccount,
} from "@/appwrite/apis";
import { INewUser } from "@/types";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

export const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: () => signOutAccount(),
  });
};

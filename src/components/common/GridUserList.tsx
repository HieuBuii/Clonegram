// @ts-nocheck
import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { checkIsFollowed } from "@/utils/utils";
import { useUpdateUser } from "@/lib/react-query/queriesAndMutations";
import { IUserUpdate } from "@/types";
import { useToast } from "../ui/use-toast";

interface IProps {
  users: Models.Document[] | IUserUpdate[];
}

const GridUserList = ({ users }: IProps) => {
  const { user: userInfo } = useUserContext();
  const { toast } = useToast();
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();

  const handleNewFollowList = (list: string[], userId: string) => {
    let newList = [...list];
    if (newList.includes(userId))
      newList = newList.filter((followState) => followState !== userId);
    else newList.push(userId);
    return newList;
  };

  const handleFollowUser = async (user: IUserUpdate) => {
    const newFollowed = handleNewFollowList(user.followed, userInfo.id);
    const newFollowing = handleNewFollowList(
      userInfo.following,
      user.$id || ""
    );

    const updatedFollowed = await updateUser({
      ...user,
      followed: newFollowed,
    });
    if (!updatedFollowed)
      return toast({ title: "Follow failed, please try again." });
    const updatedFollowing = await updateUser({
      ...userInfo,
      imageId: userInfo.imageId,
      following: newFollowing,
      file: [],
      $id: userInfo.id,
    });
    if (!updatedFollowing)
      return toast({ title: "Follow failed, please try again." });
  };

  return (
    <ul className="grid-container">
      {users?.map(
        (user) =>
          userInfo.id !== user.$id && (
            <li className="user-card" key={user.$id}>
              <Link
                to={`/profile/${user.$id}`}
                className="flex gap-3 items-center flex-col"
              >
                <img
                  src={user.imageUrl || "/assets/icons/profile-placeholder.sgv"}
                  alt="profile"
                  className="h-14 w-14 rounded-full"
                />
                <div className="flex flex-col">
                  <p className="body-bold">{user.name}</p>
                  <p className="small-regular text-light-3">@{user.username}</p>
                </div>
              </Link>
              <Button
                variant="ghost"
                className={`${
                  checkIsFollowed(user?.followed, userInfo.id)
                    ? "shad-button_dark_4"
                    : "shad-button_primary"
                } mt-4 px-6`}
                onClick={() => handleFollowUser(user as IUserUpdate)}
                disabled={isUpdatingUser}
              >
                {checkIsFollowed(user?.followed, userInfo.id)
                  ? "Unfollow"
                  : "Follow"}
              </Button>
            </li>
          )
      )}
    </ul>
  );
};

export default GridUserList;

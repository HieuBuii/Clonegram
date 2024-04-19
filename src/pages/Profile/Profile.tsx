// @ts-nocheck
import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import GridPostList from "@/components/common/GridPostList";
import {
  useGetUserById,
  useUpdateUser,
} from "@/lib/react-query/queriesAndMutations";
import { useToast } from "@/components/ui/use-toast";
import { checkIsFollowed } from "@/utils/utils";

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const { toast } = useToast();
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  const { data: currentUser } = useGetUserById(id || "");

  const handleNewFollowList = (list: string[], userId: string) => {
    let newList = [...list];
    if (newList.includes(userId))
      newList = newList.filter((followState) => followState !== userId);
    else newList.push(userId);
    return newList;
  };

  const handleFollowUser = async () => {
    const newFollowed = handleNewFollowList(currentUser?.followed, user.id);
    const newFollowing = handleNewFollowList(
      user.following,
      currentUser?.$id || ""
    );

    if (!currentUser)
      return toast({ title: "Follow failed, please try again." });

    const updatedFollowed = await updateUser({
      ...currentUser,
      followed: newFollowed,
    });
    if (!updatedFollowed)
      return toast({ title: "Follow failed, please try again." });
    const updatedFollowing = await updateUser({
      ...user,
      imageId: user.imageId,
      following: newFollowing,
      file: [],
      $id: user.id,
    });
    if (!updatedFollowing)
      return toast({ title: "Follow failed, please try again." });
  };

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock
                value={currentUser?.followed?.length || 0}
                label="Followers"
              />
              <StatBlock
                value={currentUser?.following?.length || 0}
                label="Following"
              />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${user.id !== currentUser.$id && "hidden"}`}>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  user.id !== currentUser.$id && "hidden"
                }`}
              >
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${user.id === id && "hidden"}`}>
              <Button
                variant="ghost"
                className={`${
                  checkIsFollowed(currentUser?.followed, user.id)
                    ? "shad-button_dark_4"
                    : "shad-button_primary"
                } mt-4 px-6`}
                onClick={() => handleFollowUser()}
                disabled={isUpdatingUser}
              >
                {checkIsFollowed(currentUser?.followed, user.id)
                  ? "Unfollow"
                  : "Follow"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}
          >
            <img
              src={"/assets/icons/posts.svg"}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;

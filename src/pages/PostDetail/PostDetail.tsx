import Loader from "@/components/common/Loader";
import PostStarts from "@/components/common/PostStars";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { timeAgo } from "@/utils/utils";
import { Models } from "appwrite";
import { Link, useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = useUserContext();

  const handleDeletePost = () => {};

  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="post image"
            className="post_details-img"
          />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src="/assets/icons/profile-placeholder.svg"
                  alt="creator"
                  className="rounded-full w-9 h-9 lg:w-12 lg:h-12"
                />
                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {timeAgo(post?.$createdAt || "")}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator?.$id && "hidden"}`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="update post"
                    width={24}
                    height={24}
                  />
                </Link>
                <Button
                  onClick={handleDeletePost}
                  className="ghost_details-delete_btn"
                  variant={"ghost"}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete post"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li className="text-light-3 text-sm" key={tag}>
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStarts post={post as Models.Document} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;

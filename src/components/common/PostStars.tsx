import {
  useGetCurrentUser,
  useLikePost,
  useSavePost,
  useUnSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/utils/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import Loader from "./Loader";

interface IProps {
  post: Models.Document;
  userId: string;
}

const PostStars = ({ post, userId }: IProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: unSavePost, isPending: isUnSavingPost } = useUnSavePost();

  const { data: currentUser } = useGetCurrentUser();

  useEffect(() => {
    const saved = currentUser?.save.find(
      (record: Models.Document) => record?.post?.$id === post?.$id
    );
    setIsSaved(!!saved);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLike = [...likes];
    const liked = newLike.includes(userId);
    if (liked) {
      newLike = newLike.filter((id) => id !== userId);
    } else newLike.push(userId);
    setLikes(newLike);
    likePost({ postId: post.$id, likesArray: newLike });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    const saved = currentUser?.save.find(
      (record: Models.Document) => record.post.$id === post.$id
    );
    if (saved) {
      setIsSaved(false);
      unSavePost({ postId: post.$id });
    } else {
      setIsSaved(true);
      savePost({ postId: post.$id, userId });
    }
  };
  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2 mr-5">
        {isSavingPost || isUnSavingPost ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="like"
            width={20}
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStars;

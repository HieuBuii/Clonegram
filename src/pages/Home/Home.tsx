import Loader from "@/components/common/Loader";
import { PostItem } from "@/components/common/PostItem";
import { useGetRecentPost } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPost();
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostItem key={post.$id} post={post} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

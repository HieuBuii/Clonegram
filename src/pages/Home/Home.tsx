import Loader from "@/components/common/Loader";
import { PostItem } from "@/components/common/PostItem";
import { useGetPost } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPost();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (!posts) {
    return (
      <div className="flex flex-1 flex-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home feed</h2>
          {posts?.pages?.map((item, index) => (
            <ul key={index + 1} className="flex flex-col flex-1 gap-9 w-full">
              {item?.documents.map((post: Models.Document) => (
                <PostItem key={post.$id} post={post} />
              ))}
            </ul>
          ))}

          {hasNextPage && (
            <div ref={ref}>
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

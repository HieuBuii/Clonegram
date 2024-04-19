import GridPostList from "@/components/common/GridPostList";
import Loader from "@/components/common/Loader";
import SearchResults from "@/components/common/SearchResults";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import {
  useGetPost,
  useSearchPosts,
} from "@/lib/react-query/queriesAndMutations";
import { IPost } from "@/types";
import { Models } from "appwrite";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPost();
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 400);
  const { data: searchedPosts, isPending: isSearching } =
    useSearchPosts(debouncedValue);

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);

  const dataPost = useMemo(() => {
    let newData: IPost[] = [];
    posts?.pages?.forEach((item) => {
      const listPosts = (item?.documents || []) as IPost[];
      newData = [...newData, ...listPosts];
    });
    return newData;
  }, [posts]);

  if (!posts)
    return (
      <div className="flex-center w-full h-full ">
        <Loader />
      </div>
    );

  const shouldShowSearchResult = searchValue !== "";
  const shouldShowPost =
    !shouldShowSearchResult &&
    posts.pages.every((item) => item?.documents.length === 0);
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
          />
          <Input
            type="text"
            placeholder="search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="bpdy-bold md:h3-bold">Popular Today</h3>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResult ? (
          <SearchResults
            isSearching={isSearching}
            searchedPosts={
              searchedPosts as Models.DocumentList<Models.Document>
            }
          />
        ) : shouldShowPost ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          <GridPostList posts={dataPost || []} />
        )}
      </div>
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;

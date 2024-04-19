import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

interface IProps {
  isSearching: boolean;
  searchedPosts: Models.DocumentList<Models.Document>;
}

const SearchResults = ({ isSearching, searchedPosts }: IProps) => {
  if (isSearching) return <Loader />;

  if (searchedPosts.documents.length > 0)
    return <GridPostList posts={searchedPosts.documents} />;

  return <p className="text-light-4 mt-10 text-center w-full">Not found</p>;
};

export default SearchResults;

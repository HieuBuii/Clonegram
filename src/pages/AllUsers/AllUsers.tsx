import GridUserList from "@/components/common/GridUserList";
import Loader from "@/components/common/Loader";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

const AllUsers = () => {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage } = useGetUsers();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  const dataUsers = useMemo(() => {
    let newData: Models.Document[] = [];
    data?.pages?.forEach((item) => {
      const users = item?.documents || [];
      newData = [...newData, ...users];
    });
    return newData;
  }, [data]);

  if (!dataUsers)
    return (
      <div className="flex-center w-full h-full ">
        <Loader />
      </div>
    );

  return (
    <div className="user-container">
      <div className="max-w-5xl flex-start gap-3 justify-start w-full">
        <img
          src="/assets/icons/all-user.svg"
          alt="all users"
          width={36}
          height={36}
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        <GridUserList users={dataUsers} />
      </div>

      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AllUsers;

import Bottombar from "@/components/common/Bottombar";
import LeftSidebar from "@/components/common/LeftSidebar";
import Topbar from "@/components/common/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />
      <section className="flex flex-1 h-full overflow-auto">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default RootLayout;

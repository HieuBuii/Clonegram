import { Routes, Route } from "react-router-dom";
import SignInForm from "../_auth/forms/SignInForm";
import Home from "../pages/Home";
import SignUpForm from "../_auth/forms/SignUpForm";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Explore from "@/pages/Explore";
import CreatePost from "@/pages/CreatePost";
import UpdatePost from "@/pages/UpdatePost";
import AllUsers from "@/pages/AllUsers";
import PostDetail from "@/pages/PostDetail";
import Profile from "@/pages/Profile";
import UpdateProfile from "@/pages/UpdateProfile";
import Saved from "@/pages/Saved";

const MainRoute = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/** public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>

        {/** private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post" element={<UpdatePost />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
    </main>
  );
};

export default MainRoute;

import { Routes, Route } from "react-router-dom";
import SignInForm from "../_auth/forms/SignInForm";
import Home from "../pages/Home";
import SignUpForm from "../_auth/forms/SignUpForm";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Explore from "@/pages/Explore";
import CreatePost from "@/pages/CreatePost";
import EditPost from "@/pages/EditPost";
import AllUsers from "@/pages/AllUsers";
import PostDetail from "@/pages/PostDetail";
import Profile from "@/pages/Profile";
import EditProfile from "@/pages/EditProfile";
import Saved from "@/pages/Saved";
import { useUserContext } from "@/context/AuthContext";
import LoadingPage from "@/components/ui/LoadingPage";

const MainRoute = () => {
  const { isLoading: isAuthUser } = useUserContext();
  return (
    <main className="flex h-screen">
      <Routes>
        {/** public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>

        {/** private routes */}
        {isAuthUser ? (
          <Route index element={<LoadingPage />} />
        ) : (
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:id" element={<EditPost />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/update-profile/:id" element={<EditProfile />} />
          </Route>
        )}
      </Routes>
    </main>
  );
};

export default MainRoute;

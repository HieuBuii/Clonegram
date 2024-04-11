import { Toaster } from "./components/ui/toaster";
import "./global.css";
import MainRoute from "./routes/MainRoute";

const App = () => {
  return (
    <>
      <MainRoute />
      <Toaster />
    </>
  );
};

export default App;

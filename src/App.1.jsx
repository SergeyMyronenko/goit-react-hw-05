import { Navigation } from "./components/Navigation/Navigation";
import { useEffect, useState } from "react";
import { login, trendingMovie } from "./rest-api";
import { HomePage } from "./pages/HomePage/HomePage";
import { MoviePage } from "./pages/MoviePage/MoviePage";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound/NotFound";

export const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const enterOnApp = async () => {
      try {
        const loginUser = await login();
        setIsLogin(loginUser);
        const result = await trendingMovie();
        console.log(result);
      } catch (error) {
        console.log(error.message);
      }
    };
    enterOnApp();
  }),
    [];

  return (
    <div>
      {isLogin && <Navigation />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

import React from "react";
import { Route, Routes } from "react-router-dom";
import Rejister from "../Register/Rejister";
import RowPost from "../RowPost/RowPost";
import {
  action,
  originals,
  ComedyMovies,
  HorrorMovies,
  RomanceMovies,
  Documentaries,
} from "../../urls";
import Addmovie from "../Movies/Addmovie";
import MoviePage from "../Movies/aboutMovie";
import Editmovie from "../Movies/Edit";
import Protect from "../../Components/Register/ProtectRout/protectrout";

function Routeer() {
  return (
    <Routes>
      <Route path="/" element={<RowPost />} />

      <Route path="/login" element={<Rejister />} />
      <Route element={<Protect />}>
        <Route path="/addmovie" element={<Addmovie />} />
        <Route path="/viewMovie/:id" element={<MoviePage />} />
        <Route path="/EditMovie/:id" element={<Editmovie />} />
      </Route>

    
    </Routes>
  );
}

export default Routeer;

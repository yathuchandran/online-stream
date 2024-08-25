import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Rejister from '../Register/Rejister'
import RowPost from '../RowPost/RowPost';
import {action,originals,ComedyMovies,HorrorMovies,RomanceMovies,Documentaries} from '../../urls'
import Addmovie from '../Movies/Addmovie';
import MoviePage from '../Movies/aboutMovie';
import Editmovie from '../Movies/Edit';
import Protect from '../../Components/Register/ProtectRout/protectrout';


function Routeer() {
  return (
    <Routes>

    <Route path="/" element={<RowPost />} />

    <Route path="/login" element={<Rejister />} />
<Route element={<Protect />}>
    <Route path="/addmovie" element={<Addmovie />} />
    <Route path="/viewMovie/:id"   element={<MoviePage />} />
    <Route path="/EditMovie/:id"   element={<Editmovie />} />
</Route>

    {/* <Route path="/home" element={<>
      <RowPost url={originals} title="Netflix Originals" />
      <RowPost url={action} title="Actions" isSmall />
      <RowPost url={HorrorMovies} title="Horror" isSmall />
      <RowPost url={ComedyMovies} title="Comedy" isSmall />
      <RowPost url={RomanceMovies} title="Romance" isSmall />
      <RowPost url={Documentaries} title="Documentaries" isSmall />
    </>} /> */}
  </Routes>
  )
}

export default Routeer
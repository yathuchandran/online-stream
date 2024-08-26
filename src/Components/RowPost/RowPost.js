import React, { useEffect, useState } from "react";
import Youtube from "react-youtube";
import "./RowPost.css";
import axios from "../../axios";
import { imageUrl, API_KEY } from "../constants/constants";
import NavBar from "../NavBar/NavBar";
import Banner from "../Banner/Banner";
import { GetAllMovies } from "../../Api/Api";
import { useNavigate } from "react-router-dom";

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const navigate = useNavigate();
  const [urlId, setUrlId] = useState("");

  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((err) => {});

    const allmovie = async () => {
      try {
        const res = await GetAllMovies();
        setAllMovies(res);
      } catch (error) {
        console.log(error);
      }
    };
    allmovie();
  }, []);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handlemovie = (id) => {
    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results.lenght !== 0) {
          setUrlId(response.data.results[0]);
        } else {
          console.log("array empty");
        }
      });
  };
  const handlemovies = (id) => {
    navigate(`/viewMovie/${id}`);
  };

  return (
    <div className="row">
      <NavBar setAllMovies={setAllMovies} />
      <Banner />
      <h2>{props.title}</h2>
      <div className="posters">
        {Array.isArray(allMovies) &&
          allMovies.map((obj) => (
            <img
              key={obj._id}
              onClick={() => handlemovies(obj._id)}
              className={props.isSmall ? "smallPoster" : "poster"}
              src={obj.image}
              alt="poster"
            />
          ))}
      </div>
      <h2>{props.title}</h2>
      <div className="posters">
        {Array.isArray(movies) &&
          movies.map((obj) => (
            <img
              key={obj.id}
              onClick={() => handlemovie(obj.id)}
              className={props.isSmall ? "smallPoster" : "poster"}
              src={`${imageUrl + obj.backdrop_path}`}
              alt="poster"
            />
          ))}
      </div>
      {urlId && <Youtube videoId={urlId.key} opts={opts} />}
    </div>
  );
}

export default RowPost;

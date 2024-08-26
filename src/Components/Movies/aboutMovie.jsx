import React, { useEffect, useState } from "react";
import { Box, Typography, Chip, Grid, Rating, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useParams, useNavigate } from "react-router-dom";
import { GetSingleMovie } from "../../Api/Api";
import axios from "axios";
import Youtube from "react-youtube";

const Banner = styled(Box)({
  height: "500px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "flex-end",
  padding: "20px",
  color: "white",
  boxShadow: "inset 0 -150px 80px -60px rgba(0,0,0,0.8)",
});

const MovieDetails = styled(Box)({
  padding: "20px",
  backgroundColor: "#141414",
  color: "white",
  textAlign: "left",
});

const StyledButton = styled(Button)({
  backgroundColor: "transparent",
  color: "#ffffff",
  border: "1px solid #ffffff",
  marginTop: "10px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

const VideoContainer = styled(Box)({
  position: "relative",
  paddingBottom: "56.25%", // 16:9 aspect ratio
  height: 0,
  overflow: "hidden",
  maxWidth: "100%",
  backgroundColor: "#000",
  borderRadius: "8px",
  "& iframe": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
});

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "d03799692be1c26faf0ade18a4205f9f"; // Replace with your TMDB API key

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await GetSingleMovie(id);
        if (res) {
          setMovie(res);
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchMovie();
  }, [id]);

  const handleEditClick = () => {
    navigate(`/editmovie/${id}`);
  };

  const handleWatchClick = async () => {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: movie?.title ? movie.title : "spider",
          language: "en-US",
          page: 1,
        },
      });

      const movies = response.data.results;

      if (movies.length > 0) {
        const movieId = movies[0].id;

        console.log(`Movie ID: ${movieId}`); // Log the movie ID for debugging

        const videoResponse = await axios.get(
          `${TMDB_BASE_URL}/movie/${movieId}/videos`,
          {
            params: {
              api_key: API_KEY,
              language: "en-US",
            },
          }
        );

        const videos = videoResponse.data.results;

        if (videos.length > 0) {
          setVideoId(videos[0].key); // Set only the video ID
          console.log("Video ID:", videos[0].key);
        } else {
          console.log("No videos found for this movie.");
        }
      } else {
        console.log("No movies found.");
      }
    } catch (error) {
      console.error(
        "Error fetching movie data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <Box>
      <Banner style={{ backgroundImage: `url(${movie?.image})` }}>
        <Typography variant="h2">{movie?.title || "Movie Title"}</Typography>
      </Banner>

      <MovieDetails>
        <Typography variant="h4" gutterBottom>
          {movie?.title || "Movie Title"}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {movie?.description || "Description not available."}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Actors:</Typography>
            <Typography variant="body1">
              {movie?.Actors && movie.Actors.length > 0
                ? movie.Actors.map((actor) => actor.name).join(", ")
                : "No actors listed."}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Genre:</Typography>
            <Box>
              {movie?.Genres && movie.Genres.length > 0
                ? movie.Genres.map((genre, index) => (
                    <Chip
                      key={index}
                      label={genre.name}
                      color="primary"
                      sx={{ mr: 1 }}
                    />
                  ))
                : "No genres available."}
            </Box>
          </Grid>
        </Grid>

        {/* Buttons Section */}
        <Box mt={3} display="flex" gap={2}>
          <StyledButton onClick={handleBackClick}>Back</StyledButton>
          <StyledButton onClick={handleEditClick}>Edit Movie</StyledButton>
          <StyledButton onClick={handleWatchClick}>Watch Movie</StyledButton>
        </Box>

        {videoId && (
          <Box mt={2}>
            <Typography variant="h6">Watch the video:</Typography>
            <VideoContainer>
              <Youtube videoId={videoId} />
            </VideoContainer>
          </Box>
        )}

        <Box mt={2}>
          <Typography variant="h6">Rating:</Typography>
          <Rating
            name="read-only"
            value={parseFloat(movie?.rating) || 0}
            precision={0.5}
            readOnly
          />
        </Box>
      </MovieDetails>
    </Box>
  );
};

export default MoviePage;

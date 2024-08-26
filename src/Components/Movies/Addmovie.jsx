import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blue, grey } from "@mui/material/colors";
import { Addmovies, get_category, uploadSingle } from "../../Api/Api";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    background: {
      default: blue[50],
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h5: {
      fontWeight: 600,
      color: blue[800],
    },
  },
});

const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"]; // Replace with dynamic data
const actors = ["Actor 1", "Actor 2", "Actor 3"]; // Replace with dynamic data
const directors = ["Director 1", "Director 2", "Director 3"]; // Replace with dynamic data

const Addmovie = () => {
  const navigate = useNavigate();
  const [movieTitle, setMovieTitle] = useState("");
  const [movieRating, setMovieRating] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [category, setCategory] = useState([]);
  const [direct, setDirect] = useState([]);
  const [act, setAct] = useState([]);

  const [actor, setActor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [titleError, setTitleError] = useState(false);
  const [ratingError, setRatingError] = useState(false);
  const [directorError, setDirectorError] = useState(false);
  const [genreError, setGenreError] = useState(false);
  const [actorError, setActorError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    const allmovie = async () => {
      try {
        const res = await get_category();
        setCategory(res.GenresData);
        setDirect(res.DirectorData);
        setAct(res.ActorData);
      } catch (error) {
        console.log(error);
      }
    };
    allmovie();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validate form fields
    setTitleError(!movieTitle);
    setRatingError(!movieRating);
    setDirectorError(!director);
    setGenreError(!genre);
    setActorError(!actor);
    setDescriptionError(!description);
    setImageError(!image);
  
    if (
      !movieTitle ||
      !movieRating ||
      !director ||
      !genre ||
      !actor ||
      !description ||
      !image
    )
      return;
  
    try {
      handleLoaderOpen();
      const data = {
        title: movieTitle,
        description: description,
        rating: movieRating,
        genres_id: genre,
        director_id: director,
        actor_id: actor,
      };
      console.log(data,"----------------------------------------------");
      const formData = new FormData();
      formData.append("file", image);
      formData.append("title", movieTitle);
      formData.append("description", description);
      formData.append("rating", movieRating);
      formData.append("genres_id", genre);
      formData.append("director_id", director);
      formData.append("actor_id", actor);
  
      const res = await uploadSingle(formData);
      console.log(res);
  if (res==='') {
    
  }
      Swal.fire({
        icon: 'success',
        title: 'Movie added successfully!',
        showConfirmButton: false,
        timer: 1500
      });
  
      navigate("/");
    } catch (error) {
      console.error("Error adding movie", error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    } finally {
      handleLoaderClose();
    }
  };
  

  const handleLoaderClose = () => setLoader(false);
  const handleLoaderOpen = () => setLoader(true);

  return (
    <ThemeProvider theme={theme}>
     <Grid
      container
      component="main"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        backgroundImage: 'url("https://wallpapercave.com/wp/wp9424696.jpg")', // Replace with your image URL
        backgroundSize: "cover", // Cover the entire container
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Do not repeat the image
      }}
    >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          lg={4}
          component={Paper}
          elevation={10}
          sx={{
            padding: 4,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.8)", // White with 80% opacity
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Add Movie
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ width: "100%" }}
            >
              <TextField
                error={titleError}
                onChange={(e) => setMovieTitle(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="title"
                label="Movie Title"
                autoFocus
                variant="outlined"
                sx={{
                  marginBottom: 1,
                  "& label": { color: grey[700] },
                  "& input": { color: grey[900], padding: "8px 14px" },
                  "& fieldset": { borderRadius: "8px" },
                  fontSize: "3px",
                }}
              />
              <TextField
                error={ratingError}
                onChange={(e) => setMovieRating(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="rating"
                label="Movie Rating"
                type="number"
                inputProps={{ min: "0", max: "10", step: "0.1" }}
                variant="outlined"
                sx={{
                  marginBottom: 1,
                  "& label": { color: grey[700] },
                  "& input": { color: grey[900], padding: "8px 14px" },
                  "& fieldset": { borderRadius: "8px" },
                  fontSize: "3px",
                }}
              />
              <FormControl
                error={directorError}
                fullWidth
                required
                margin="normal"
                variant="outlined"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel id="director-label">Director</InputLabel>
                <Select
                  labelId="director-label"
                  id="director"
                  value={director}
                  onChange={(e) => setDirector(e.target.value)}
                  label="Director"
                >
                  {direct.map((gen) => (
                    <MenuItem key={gen._id} value={gen._id}>
                      {gen.director}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                error={genreError}
                fullWidth
                required
                margin="normal"
                variant="outlined"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel id="genre-label">Genre</InputLabel>
                <Select
                  labelId="genre-label"
                  id="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  label="Genre"
                >
                  {category.map((gen) => (
                    <MenuItem key={gen._id} value={gen._id}>
                      {gen.genres}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                error={actorError}
                fullWidth
                required
                margin="normal"
                variant="outlined"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel id="actor-label">Actor</InputLabel>
                <Select
                  labelId="actor-label"
                  id="actor"
                  value={actor}
                  onChange={(e) => setActor(e.target.value)}
                  label="Actor"
                >
                  {act.map((act) => (
                    <MenuItem key={act._id} value={act._id}>
                      {act.actor}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                error={descriptionError}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                sx={{
                  marginBottom: 1,
                  "& label": { color: grey[700] },
                  "& input": { color: grey[900], padding: "8px 14px" },
                  "& fieldset": { borderRadius: "8px" },
                  fontSize: "3px",
                }}
              />
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{
                  marginBottom: 1,
                  "& label": { color: grey[700] },
                  "& input": { color: grey[900], padding: "8px 14px" },
                  "& fieldset": { borderRadius: "8px" },
                  fontSize: "14px",
                }}
              >
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </Button>
              {image && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  Selected image: {image.name}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  padding: "10px 0",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Add Movie
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* Add any loader or error message component here */}
    </ThemeProvider>
  );
};

export default Addmovie;

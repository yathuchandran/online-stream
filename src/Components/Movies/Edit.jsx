import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
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
import Swal from "sweetalert2";
import { EditMovies, get_category, GetSingleMovie } from "../../Api/Api";

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

const Editmovie = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movieTitle, setMovieTitle] = useState("");
  const [movieRating, setMovieRating] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState(""); 
  const [actor, setActor] = useState(""); 

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);

  const [category, setCategory] = useState([]);
  const [direct, setDirect] = useState([]);
  const [act, setAct] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await GetSingleMovie(id);
        if (res) {
          setMovieTitle(res.title || "");
          setMovieRating(res.rating || "");
          setDirector(res.Directors?.[0]?.id || ""); 
          setGenre(res.Genres?.[0]?.id || ""); 
          setActor(res.Actors?.[0]?.id || ""); 
          setDescription(res.description || "");
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    const fetchCategoryData = async () => {
      try {
        const res = await get_category();
        setCategory(res.GenresData);
        setDirect(res.DirectorData);
        setAct(res.ActorData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoryData();
    fetchMovie();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      setLoader(true);
  
      // Create a new FormData instance
      const formData = new FormData();
      formData.append("file", image);
      formData.append("title", movieTitle);
      formData.append("description", description);
      formData.append("rating", movieRating);
      formData.append("genres_id", genre);
      formData.append("director_id", director);
      formData.append("actor_id", actor);
  
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
  
      const res = await EditMovies(formData, id);
  
      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Movie updated successfully!",
      }).then(() => {
        navigate(`/viewMovie/${id}`);
      });
    } catch (error) {
      console.error("Error updating movie:", error);
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error updating movie: " + error.message,
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{
          backgroundImage: 'url("https://wallpapercave.com/wp/wp9424696.jpg")', 
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          backgroundRepeat: "no-repeat", 
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
            backgroundColor: "rgba(255, 255, 255, 0.8)",
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
              Edit Movie
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ width: "100%" }}
            >
              <TextField
                value={movieTitle}
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
                }}
              />
              <TextField
                value={movieRating}
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
                }}
              />
              <FormControl
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
                  {direct.map((dir) => (
                    <MenuItem key={dir._id} value={dir._id}>
                      {" "}
                      {dir.director}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
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
                      {" "}
                      {gen.genres}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
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
                  {act.map((actor) => (
                    <MenuItem key={actor._id} value={actor._id}>
                      {" "}
                      {actor.actor}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                value={description}
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
                }}
              />
              <Button
                variant="contained"
                component="label"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loader}
                sx={{
                  mt: 3,
                  mb: 2,
                  padding: "10px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {loader ? "Updating..." : "Update Movie"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Editmovie;

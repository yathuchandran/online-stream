import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { blue } from "@mui/material/colors";
import { getLogin } from "../../Api/Api";
import Swal from 'sweetalert2';

const defaultTheme = createTheme();

const Rejister = () => {
  const navigate = useNavigate();
  const [sLoginName, setLoginName] = useState("");
  const [sPassword, setSPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Manage password visibility

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate form fields
    setEmailError(!sLoginName);
    setPasswordError(!sPassword);
    if (!sLoginName || !sPassword) return;
  
    try {
      handleLoaderOpen();
      const data = {
        email: sLoginName,
        password: sPassword,
      };
      const res = await getLogin(data);
      
      if (res.message === "User Login Successfully") {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You will be redirected shortly.',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          localStorage.setItem("sLoginName", JSON.stringify(sLoginName));
          setLoginName("");
          navigate("/");
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: res.message,
        });
      }
    } catch (error) {
      console.error("Login error", error.message);
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: error.message,
      });
    } finally {
      handleLoaderClose();
    }
  };

  const handleLoaderClose = () => setLoader(false);
  const handleLoaderOpen = () => setLoader(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  const handleClick = () => setOpen(true);

  return (
    <ThemeProvider theme={defaultTheme}>
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
          md={5}
          component={Paper}
          elevation={6}
          square
          borderRadius={2}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              LOGIN
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ marginTop: 1, width: "100%" }}
            >
              <TextField
                error={emailError}
                onChange={(e) => setLoginName(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="UserName"
                autoComplete="email"
                autoFocus
              />
              <div style={{ position: "relative" }}>
                <TextField
                  error={passwordError}
                  onChange={(e) => setSPassword(e.target.value)}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <LockOpenIcon /> : <LockIcon />}
                </div>
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                LOGIN
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Rejister;

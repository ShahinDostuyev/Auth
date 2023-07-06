import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { CatchingPokemon } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../contex/AuthContext";

export const Layout = () => {
  const { loggedIn,user,handlerLogInOut } = useContext(AuthContext);
  let navigate = useNavigate();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <CatchingPokemon />
          </IconButton>
          <Stack direction="row" spacing={2} flexGrow={1}>
            <Typography
              color="white"
              noWrap
              variant="h6"
              component={NavLink}
              to="/"
              sx={{ textDecoration: "none" }}
            >
              ChatApp
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            {!loggedIn && (
              <>
                <Button
                  component={NavLink}
                  to="/signin"
                  variant="outlined"
                  color="inherit"
                >
                  Sign In
                </Button>
                <Button
                  component={NavLink}
                  to="/signup"
                  variant="outlined"
                  color="inherit"
                >
                  Sign Up
                </Button>
              </>
            )}
            {
              loggedIn && (
                <>
              <Button
                  component={NavLink}
                  variant="outlined"
                  color="inherit"
                >
                 {user&&user.username}
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={()=>{handlerLogInOut(false,()=>{navigate('/signin')})}}
                >
                  Log Out
                </Button>
              </>
              )
            }
          </Stack>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

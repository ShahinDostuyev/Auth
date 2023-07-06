import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import { paperStyle } from "./AuthStyles";
import { singInValidations } from "./validations";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../contex/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { handlerLogInOut } = useContext(AuthContext);
  //use Formik
  const { handleSubmit, handleChange, touched, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: singInValidations,
    onSubmit: ({ email, password }, bag) => {
      const data = {
        email: email,
        password: password,
      };

      axios
        .post("http://localhost:8080/api/webuser/login", data)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            const { token } = res.data;
            alert("you registered successful");
            handlerLogInOut(true, navigate("/"), token);
          } else if (res.status == 203) {
            navigate("/verify", {
              state: email,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid textAlign="center" marginBottom={2}>
          <Typography variant="h5" fontWeight="bold">
            Sign In
          </Typography>
          <Typography variant="caption">
            Please fill this from to create an account!
          </Typography>
        </Grid>
        <Grid>
          {errors.general && <Alert severity="error">{errors.general}</Alert>}
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="standard"
            placeholder="Enter you email"
            onChange={handleChange}
            value={values.email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            type="password"
            name="password"
            label="Password"
            variant="standard"
            placeholder="Enter you password"
            onChange={handleChange}
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <Grid marginTop={3}>
            <Button
              fullWidth
              textAlign="center"
              type="submit"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
            <a href="http://localhost:3000/forgotPassword">Forgot password?</a>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

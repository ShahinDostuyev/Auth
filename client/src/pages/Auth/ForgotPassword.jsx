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
  import { forgotPasswordValidations } from "./validations";
  import axios from "axios";
  import { useContext } from "react";
  import { AuthContext } from "../../contex/AuthContext";
  import { useNavigate } from "react-router-dom";
  
  export const ForgotPassword = () => {
    const navigate = useNavigate();
    const { handlerLogInOut } = useContext(AuthContext);
    //use Formik
    const { handleSubmit, handleChange, touched, values, errors } = useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: forgotPasswordValidations,
      onSubmit: ({ email }, bag) => {
        const data = {
          email: email,
        };

        axios
          .post("http://localhost:8080/api/webuser/forgotPassword", data)
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
                console.log("Password reset email sent");
            } else if (res.status == 404) {
              console.log("User not found");
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
              Forgot Password
            </Typography>
            <Typography variant="caption">
              Please fill this from to let us send you link for password changing
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
            
            <Grid marginTop={3}>
              <Button
                fullWidth
                textAlign="center"
                type="submit"
                variant="contained"
                color="primary"
              >
                Send
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    );
  };
  
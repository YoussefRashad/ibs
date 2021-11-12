/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import validate from "validate.js";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Button, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";

import HTTP from "src/utils/axios";
import useUser from "src/hooks/useUser";

const schema = {
   username: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
         minimum: 11,
         message: "must be at least 11 characters",
      },
   },
   password: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
         minimum: 8,
         message: "must be at least 8 characters",
      },
   },
};

const useStyles = makeStyles((theme) => ({
   root: {},
   fields: {
      margin: theme.spacing(-1),
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
         flexGrow: 1,
         margin: theme.spacing(1),
      },
   },
   submitButton: {
      marginTop: theme.spacing(2),
      width: "100%",
   },
}));

function LoginForm({ className, ...rest }) {
   const classes = useStyles();
   const history = useHistory();
   const { saveUser } = useUser();
   const { enqueueSnackbar } = useSnackbar();

   const [formState, setFormState] = useState({
      isValid: false,
      values: {},
      touched: {},
      errors: {},
   });

   const handleChange = (event) => {
      event.persist();

      setFormState((prevFormState) => ({
         ...prevFormState,
         values: {
            ...prevFormState.values,
            [event.target.name]: event.target.value,
         },
         touched: {
            ...prevFormState.touched,
            [event.target.name]: true,
         },
      }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      HTTP.post("/login", formState.values)
         .then((res) => {
            saveUser(res.data.user);
            history.push("/");
            enqueueSnackbar("You have been successfully logged", {
               variant: "success",
            });
         })
         .catch((err) => {
            enqueueSnackbar(err, {
               variant: "error",
            });
         });
   };

   const hasError = (field) =>
      !!(formState.touched[field] && formState.errors[field]);

   useEffect(() => {
      const errors = validate(formState.values, schema);

      setFormState((prevFormState) => ({
         ...prevFormState,
         isValid: !errors,
         errors: errors || {},
      }));
   }, [formState.values]);

   return (
      <form
         {...rest}
         className={clsx(classes.root, className)}
         onSubmit={handleSubmit}
      >
         <div className={classes.fields}>
            <TextField
               error={hasError("username")}
               fullWidth
               helperText={
                  hasError("username") ? formState.errors.username[0] : null
               }
               label="Phone number or Email"
               name="username"
               onChange={handleChange}
               value={formState.values.username || ""}
               variant="outlined"
            />
            <TextField
               error={hasError("password")}
               fullWidth
               helperText={
                  hasError("password") ? formState.errors.password[0] : null
               }
               label="Password"
               name="password"
               onChange={handleChange}
               type="password"
               value={formState.values.password || ""}
               variant="outlined"
            />
         </div>
         <Button
            className={classes.submitButton}
            color="secondary"
            disabled={!formState.isValid}
            size="large"
            type="submit"
            variant="contained"
         >
            Sign in
         </Button>
      </form>
   );
}

LoginForm.propTypes = {
   className: PropTypes.string,
};

export default LoginForm;

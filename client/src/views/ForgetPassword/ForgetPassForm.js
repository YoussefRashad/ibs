/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Button, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";

import HTTP from "src/utils/axios";

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

function ForgetPassForm({ className }) {
   const classes = useStyles();
   const history = useHistory();
   const [hasCode, setHasCode] = useState(false);
   const [waitMinute, setWaitMinute] = useState(true);
   const [form, setForm] = useState({
      phone: "",
      code: "",
   });
   // const [timer, setTimer] = useState(null);

   const { enqueueSnackbar } = useSnackbar();

   const handleChange = (event) => {
      event.persist();
      setForm((prev) => ({
         ...prev,
         [event.target.name]: event.target.value,
      }));
   };

   const checkCode = (event) => {
      event.preventDefault();
      HTTP.post("/reset-password", form)
         .then((res) => {
            enqueueSnackbar(res.message, {
               variant: "success",
            });
         })
         .catch((err) => {
            enqueueSnackbar(err, {
               variant: "error",
            });
         });
   };

   const checkPhone = (event) => {
      event.preventDefault();
      HTTP.post("/forget-password", form)
         .then((res) => {
            setHasCode(true);
            setTimeout(() => {
               setWaitMinute(false);
            }, 60000);
            enqueueSnackbar(res.message, {
               variant: "success",
            });
         })
         .catch((err) => {
            setHasCode(false);
            enqueueSnackbar(err, {
               variant: "error",
            });
         });
   };

   return (
      <form
         className={clsx(classes.root, className)}
         onSubmit={hasCode ? checkCode : checkPhone}
         autoComplete="off"
      >
         <div className={classes.fields}>
            {hasCode ? (
               <TextField
                  fullWidth
                  label="Rest Code"
                  name="code"
                  onChange={handleChange}
                  value={form.code || ""}
                  variant="outlined"
                  required
                  max="5"
               />
            ) : (
               <TextField
                  fullWidth
                  label="Phone number"
                  name="phone"
                  onChange={handleChange}
                  value={form.phone || ""}
                  variant="outlined"
                  required
               />
            )}
         </div>
         <Button
            className={classes.submitButton}
            fullWidth
            color="secondary"
            size="large"
            type="submit"
            variant="contained"
         >
            Submit
         </Button>
         {hasCode ? (
            <Button
               className={classes.submitButton}
               onClick={checkPhone}
               fullWidth
               color="secondary"
               size="large"
               type="submit"
               variant="outlined"
               disabled={waitMinute}
            >
               Resend Code
            </Button>
         ) : null}
      </form>
   );
}

ForgetPassForm.propTypes = {
   className: PropTypes.string,
};

export default ForgetPassForm;

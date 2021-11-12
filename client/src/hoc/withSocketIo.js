import React, { useEffect } from "react";
import io from "socket.io-client";
// import { useSnackbar } from "notistack";

const socket = io("https://ibsns.ddns.net");
// const socket = io("/");

export default (WrappedComponent) => ({ ...props }) => {
   // const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
      // socket.on("errors", function (err) {
      //    enqueueSnackbar(err.message || err, {
      //       variant: "error",
      //    });
      // });
      // return () => {
      //    socket.close();
      // };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return <WrappedComponent socket={socket} {...props} />;
};

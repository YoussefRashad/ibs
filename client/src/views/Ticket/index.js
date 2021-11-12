import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSnackbar } from "notistack";

import SpecialPage from "src/components/SpecialPage";
import HTTP from "src/utils/axios";
import TicketBox from "./TicketBox";
import TicketSidebar from "./TicketSidbar";
import withSocketIo from "src/hoc/withSocketIo";

function Ticket({ socket }) {
   const { id } = useParams();
   const [ticket, setTicket] = useState();
   const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
      socket.emit("join", id);

      HTTP.get(`/tickets/${id}`)
         .then((res) => {
            setTicket(res.data);
         })
         .catch((err) => {
            enqueueSnackbar(err, {
               variant: "error",
            });
         });

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id]);

   useEffect(() => {
      socket.on("updateTicketStatus", (ticket) => {
         setTicket(ticket);
      });
      socket.emit("markTicketNotificationAsRead", id);

      return () => {
         socket.removeListener("updateTicketStatus");
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id]);

   return (
      <SpecialPage
         title="Ticket"
         smCol={ticket && <TicketSidebar ticket={ticket} />}
         lgCol={ticket && <TicketBox ticket={ticket} id={id} />}
      ></SpecialPage>
   );
}

export default withSocketIo(Ticket);

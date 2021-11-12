import React, { useState } from "react";
import {
   Grid,
   TextField,
   Card,
   Divider,
   CardHeader,
   CardContent,
   CardActions,
   Button,
} from "@material-ui/core";

function ContactUs({ infoContacts, saveChanges }) {
   const [contacts, setContacts] = useState(infoContacts);

   const addContact = () => {
      const newArr = [...contacts];
      newArr.push({ key: "", value: "" });
      setContacts(newArr);
   };

   const handleChange = (event, index) => {
      const { name, value } = event.target;
      const clonedContacts = [...contacts];
      const item = clonedContacts[index];
      clonedContacts[index] = { ...item, [name]: value };
      setContacts(clonedContacts);
   };

   return (
      <>
         <Card>
            <CardHeader
               title="Contact Us"
               action={
                  <Button
                     color="primary"
                     variant="contained"
                     size="small"
                     onClick={addContact}
                  >
                     Add contact
                  </Button>
               }
            ></CardHeader>
            <Divider />
            <CardContent>
               <Grid container spacing={2}>
                  {contacts.map((contact, index) => {
                     return (
                        <Grid item md={6} xs={12} key={contact.key}>
                           <Grid container spacing={2}>
                              <Grid item sm={4} xs={12}>
                                 <TextField
                                    label="Key"
                                    fullWidth
                                    name="key"
                                    onChange={(event) =>
                                       handleChange(event, index)
                                    }
                                    value={contact.key}
                                    variant="outlined"
                                    margin="dense"
                                 />
                              </Grid>
                              <Grid item sm={8} xs={12}>
                                 <TextField
                                    label="Value"
                                    fullWidth
                                    name="value"
                                    onChange={(event) =>
                                       handleChange(event, index)
                                    }
                                    value={contact.value}
                                    variant="outlined"
                                    margin="dense"
                                 />
                              </Grid>
                           </Grid>
                        </Grid>
                     );
                  })}
               </Grid>
            </CardContent>
            <Divider />
            <CardActions>
               <Button
                  variant="contained"
                  onClick={() => saveChanges({ contacts })}
               >
                  Save changes
               </Button>
            </CardActions>
         </Card>
      </>
   );
}

export default ContactUs;

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Container, Button } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import queryString from "query-string";
import { useSnackbar } from "notistack";

import HTTP from "src/utils/axios";
import Page from "src/components/Page";
import Paginate from "src/components/Paginate";
import Header from "src/components/Header";
import SearchDrawer from "src/components/SearchDrawer";
import cleanObject from "src/utils/cleanObject";

import SearchInputs from "./SearchInputs";
import UsersTable from "./UsersTable";

const useStyles = makeStyles((theme) => ({
   root: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
   },
   paginate: {
      marginTop: theme.spacing(3),
      display: "flex",
      justifyContent: "center",
   },
}));

const initialValues = {
   ibsNumber: "",
   role: "",
   email: "",
   phone: "",
   identityNumber: "",
};

function UsersManagementList() {
   const classes = useStyles();
   const [filter, setFilter] = useState("");
   const [page, setPage] = useState(0);
   const [count, setCount] = useState();
   const [users, setUsers] = useState();
   const [isLoading, setIsLoading] = useState(true);
   const [drawerStatus, setDrawerStatus] = useState(false);
   const [values, setValues] = useState({ ...initialValues });
   const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
      HTTP.get(`/users?page=${page}&${filter}`)
         .then((res) => {
            setUsers(res.data);
            setCount(res.results);
            setIsLoading(false);
         })
         .catch((err) => {
            enqueueSnackbar(err, {
               variant: "error",
            });
         });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [page, filter]);

   const handleChangePage = (page) => {
      setPage(page.selected);
   };

   const handleSearch = (e) => {
      e.preventDefault();
      setPage(0);
      const cloneObj = { ...values };
      cleanObject(cloneObj);

      const stringify = queryString.stringify(cloneObj);
      setFilter(stringify);
   };

   const handleClear = (e) => {
      e.preventDefault();
      setValues({ ...initialValues });
   };

   const handleDrawerOpen = () => {
      setDrawerStatus(true);
   };

   const handleDrawerClose = () => {
      setDrawerStatus(false);
   };

   const handleChange = (e, input, value) => {
      setValues((prevValues) => ({
         ...prevValues,
         [input]: value,
      }));
   };

   return (
      <Page className={classes.root} title="Users Management List">
         <Container maxWidth={false}>
            <Header subTitle="Management" mainTitle="Users">
               <Button
                  color="primary"
                  variant="contained"
                  style={{ margin: "0 10px" }}
               >
                  Add User
               </Button>
               <Button
                  className={classes.filterButton}
                  color="primary"
                  onClick={handleDrawerOpen}
                  variant="outlined"
               >
                  <FilterListIcon /> Show filters
               </Button>
            </Header>

            <SearchDrawer
               open={drawerStatus}
               onClose={handleDrawerClose}
               onSubmit={handleSearch}
               onClear={handleClear}
            >
               <SearchInputs values={values} onChange={handleChange} />
            </SearchDrawer>

            <UsersTable
               className={classes.results}
               users={users}
               isLoading={isLoading}
            />

            <div className={classes.paginate}>
               <Paginate
                  pageCount={Math.ceil(count / 50)}
                  onPageChange={handleChangePage}
               />
            </div>
         </Container>
      </Page>
   );
}

export default UsersManagementList;

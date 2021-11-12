/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy, Suspense, Fragment } from "react";
import { Redirect, Switch, Route } from "react-router-dom";

import AuthLayout from "src/layouts/Auth";
import DashboardLayout from "src/layouts/Dashboard";
import DashboardView from "src/views/Dashboard";

import AuthGuard from "src/components/AuthGuard";

import LoadingScreen from "src/components/LoadingScreen";

const routesConfig = [
   {
      exact: true,
      path: "/404",
      component: lazy(() => import("src/views/Error404")),
   },
   {
      exact: true,
      path: "/401",
      component: lazy(() => import("src/views/Error401")),
   },
   {
      path: "/auth",
      layout: AuthLayout,
      routes: [
         {
            path: "/auth/login",
            exact: true,
            component: lazy(() => import("src/views/Login")),
         },
         {
            path: "/auth/forget-password",
            exact: true,
            component: lazy(() => import("src/views/ForgetPassword")),
         },
         {
            path: "/auth/register",
            exact: true,
            component: lazy(() => import("src/views/Register")),
         },
         {
            component: () => <Redirect to="/auth/login" />,
         },
      ],
   },
   {
      route: "*",
      layout: DashboardLayout,
      guard: AuthGuard,
      routes: [
         {
            path: "/",
            exact: true,
            component: lazy(() => import("src/views/TicketManagementList")),
         },
         // {
         //    path: "/dashboard",
         //    exact: true,
         //    component: DashboardView,
         // },
         {
            path: "/users",
            exact: true,
            component: lazy(() => import("src/views/UsersManagementList")),
         },
         {
            path: "/information",
            exact: true,
            component: lazy(() => import("src/views/Information")),
         },
         {
            path: "/information/:tab",
            exact: true,
            component: lazy(() => import("src/views/Information")),
         },
         {
            path: "/profile/",
            exact: true,
            component: lazy(() => import("src/views/Profile")),
         },
         {
            path: "/profile/:id",
            exact: true,
            component: lazy(() => import("src/views/Profile")),
         },
         {
            path: "/ticket/:id",
            exact: true,
            component: lazy(() => import("src/views/Ticket")),
         },
         {
            path: "/settings",
            exact: true,
            component: lazy(() => import("src/views/Settings")),
         },
         {
            path: "/settings/:tab",
            exact: true,
            component: lazy(() => import("src/views/Settings")),
         },
         {
            component: () => <Redirect to="/404" />,
         },
      ],
   },
];

const renderRoutes = (routes) =>
   routes ? (
      <Suspense fallback={<LoadingScreen />}>
         <Switch>
            {routes.map((route, i) => {
               const Guard = route.guard || Fragment;
               const Layout = route.layout || Fragment;
               const Component = route.component;

               return (
                  <Route
                     key={i}
                     path={route.path}
                     exact={route.exact}
                     render={(props) => (
                        <Guard>
                           <Layout>
                              {route.routes ? (
                                 renderRoutes(route.routes)
                              ) : (
                                 <Component {...props} />
                              )}
                           </Layout>
                        </Guard>
                     )}
                  />
               );
            })}
         </Switch>
      </Suspense>
   ) : null;

const Routes = () => {
   return renderRoutes(routesConfig);
};

export default Routes;

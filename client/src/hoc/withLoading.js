import React from "react";
import LoadingScreen from "src/components/LoadingScreen";

const withLoading = (WrappedComponent) => ({ isLoading, ...props }) => {
   return isLoading ? <LoadingScreen /> : <WrappedComponent {...props} />;
};

export default withLoading;

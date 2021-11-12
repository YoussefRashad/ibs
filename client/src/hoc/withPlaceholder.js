import React from "react";
import TablePlaceholder from "src/components/LoadingPlaceholder/TablePlaceholder";

const withPlaceholder = (WrappedComponent) => ({ isLoading, ...props }) => {
   return isLoading ? <TablePlaceholder /> : <WrappedComponent {...props} />;
};

export default withPlaceholder;

import React from "react";
import ContentLoader from "react-content-loader";

const arr = new Array(50).fill(0).map((e, i) => i + 1);

const TableLoader = () => (
   <ContentLoader
      speed={4}
      width="100%"
      //   height={1000}
      viewBox="0 0 1100 3350"
      backgroundColor="#e5e5e5"
      foregroundColor="#eee"
   >
      <rect x="0" y="0" rx="3" ry="3" width="1100" height="65" />
      <rect x="1098" y="0" rx="3" ry="3" width="2" height="3320" />
      <rect x="0" y="0" rx="3" ry="3" width="2" height="3320" />

      {arr.map(i => (
         <React.Fragment key={i}>
            <rect
               x="8"
               y={65 * (i + 1)}
               rx="3"
               ry="3"
               width="1084"
               height="2"
            />
            <circle cx="40" cy={65 * i + 35} r="20" />
            <rect
               x="75"
               y={65 * i + 25}
               rx="3"
               ry="3"
               width="141"
               height="20"
            />
            <rect
               x="260"
               y={65 * i + 25}
               rx="3"
               ry="3"
               width="299"
               height="20"
            />
            <rect
               x="600"
               y={65 * i + 25}
               rx="3"
               ry="3"
               width="141"
               height="20"
            />
            <rect
               x="800"
               y={65 * i + 25}
               rx="3"
               ry="3"
               width="270"
               height="20"
            />
         </React.Fragment>
      ))}
   </ContentLoader>
);

export default TableLoader;

import React from "react";
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';
 
export default function Loading({ active, children }) {
  return (
    <LoadingOverlay
      active={active}
      spinner={<BounceLoader />}
    >
      {children}
    </LoadingOverlay>
  )
}
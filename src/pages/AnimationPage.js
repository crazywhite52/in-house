import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBAnimation } from "mdbreact";
import DocsLink from "../components/docsLink";

const AnimationPage = () =>  {

  let count = 0;

  const increment = () => {
    count++;
    if (count < 6 || count % 5 === 0) {
      console.log(`The MDB logo bounced ${count} times.`);
    }
  };

  return (
    <MDBContainer className="mt-5">

    </MDBContainer>
  );
};

export default AnimationPage;

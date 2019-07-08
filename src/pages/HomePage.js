import React from "react";
import {
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBIcon
} from "mdbreact";
import "../pages/HomePage.css";
import withAuth from "../components/withAuth";
import pic from "../images/jiboffice.jpg";
class HomePage extends React.Component {
  render() {
    return (
      <div>
        <MDBContainer>
        <p />
        <h5 className="">Welcome user : {this.props.user.username+' '+this.props.user.fullname}</h5>
        <hr className="mt-1" />
          <MDBCardGroup deck className="mt-2">
            <MDBRow>
              <MDBCol sm="2" md="6" lg="6">
                <MDBCard>
                  <MDBCardImage
                    src={pic}
                    alt="MDBCard image cap"
                    top
                    hover
                    overlay="white-slight"
                  />
                  <MDBCardBody>
                    <MDBCardTitle tag="h5">ข้อมูลสาขา</MDBCardTitle>
                    <MDBCardText>แบบฟอร์มการคีย์ข้อมูลสาขา</MDBCardText>
                    <MDBBtn color="blue" size="md" href="/inhouse">
                       <MDBIcon icon="plus-circle" /> ADD
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol sm="2" md="6" lg="6">
                <MDBCard>
                  <MDBCardImage
                    src={pic}
                    alt="MDBCard image cap"
                    top
                    hover
                    overlay="white-slight"
                  />
                  <MDBCardBody>
                    <MDBCardTitle tag="h5">ข้อมูลสัญญาเช่า</MDBCardTitle>
                    <MDBCardText>แบบฟอร์มการคีย์ข้อมูลสัญญาเช่า</MDBCardText>
                    <MDBBtn color="blue" size="md" href="/promise">
                      <MDBIcon icon="plus-circle" /> ADD
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            {/* <MDBCard>
                <MDBCardImage
                  src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg"
                  alt="MDBCard image cap"
                  top
                  hover
                  overlay="white-slight"
                />
                <MDBCardBody>
                  <MDBCardTitle tag="h5">Panel title</MDBCardTitle>
                  <MDBCardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </MDBCardText>
                  <MDBBtn color="light-blue" size="md">
                    read more
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard> */}
          </MDBCardGroup>
        
        </MDBContainer>
        {/* <MDBEdgeHeader color="indigo darken-3" />
        <MDBFreeBird>
          <MDBRow>
            <MDBCol
              md="10"
              className="mx-auto float-none white z-depth-1 py-2 px-2"
            >
              <MDBCardBody>
                <h2 className="h2-responsive mb-4">
                  <strong>{this.props.user.username+' '+this.props.user.fullname}</strong>
                </h2>
                <p>Information House V.2</p>
                <p className="pb-4">
                  Management Information System (MIS) Tel.088-809-4787
                </p>
               
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBFreeBird>
        <MDBContainer>
          
          
        </MDBContainer> */}
      </div>
    );
  }
}

export default withAuth(HomePage);

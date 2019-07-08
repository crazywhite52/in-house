import React, { Component } from "react";
import {
  MDBEdgeHeader,
  MDBInput,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBIcon,
  MDBNavLink,
  MDBDataTable,
  MDBBtn,
  MDBCard
} from "mdbreact";

export default class Bodyedit extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //     txt_rent: '',
    // };
    // console.log(this.props.rent);
    this.handleRemoveShareholder = this.handleRemoveShareholder.bind(this);
    //  this.ondelete = this.ondelete.bind(this);
  }
  handleRemoveShareholder() {
    //console.log(this.props.id);
    if (this.props.id === 1) {
      console.log("ไม่สามารถลบได้");
    } else {
      this.props.ondeletebody(this.props.id);
    }
  }

  render() {
    // console.log('xx');
    // this.setState({
    //   txt_rent:this.props.rent
    // })
    return (
      <MDBCol md="2">
        <p style={{ marginBottom: "0px" }}>
          <label>ปีที่ {this.props.id}</label>
        </p>
        <input
          type="text"
          style={{ marginTop: "0px", marginBottom: "1px" }}
          //onChange={this.handleChange}
          // defaultValue={this.props.rent}
          // onChange={this.handleShareholderNameChange4(idx)}
          //onChange={this.handleShareholderNameChange(idx)}
          className="form-control form-control-sm"
          placeholder={this.props.rent}
          onBlur={event =>
            // console.log(event.target.value)
            this.props.onupdatebody(
              this.props.promise_doc,
              this.props.id,
              "rent",
              event.target.value
            )
          }
          // placeholder={arr.rent}
          // autoComplete="off"
          // disabled={this.isDisabled2()}
        />
        <input
          type="text"
          style={{ marginTop: "0px", marginBottom: "1px" }}
          // value={this.props.servicecharge}
          // onChange={this.handleShareholderNameChange5(idx)}
          className="form-control form-control-sm"
          // //placeholder={`ค่าบริการ/เดือน ปีที่ #${idx + 1}`}
          placeholder={this.props.servicecharge}
          onBlur={event =>
            // console.log(event.target.value)
            this.props.onupdatebody(
              this.props.promise_doc,
              this.props.id,
              "servicecharge",
              event.target.value
            )
          }
          // placeholder={arr.servicecharge}
          // autoComplete="off"
          // disabled={this.isDisabled2()}
        />
        <input
          type="text"
          style={{ marginTop: "0px", marginBottom: "1px" }}
          // value={this.props.centercharge}
          // onChange={this.handleShareholderNameChange5(idx)}
          className="form-control form-control-sm"
          // //placeholder={`ค่าบริการ/เดือน ปีที่ #${idx + 1}`}
          placeholder={this.props.centercharge}
          onBlur={event =>
            // console.log(event.target.value)
            this.props.onupdatebody(
              this.props.promise_doc,
              this.props.id,
              "centercharge",
              event.target.value
            )
          }
          // placeholder={arr.centercharge}
          // autoComplete="off"
          // disabled={this.isDisabled2()}
        />
        <input
          type="text"
          // value={this.props.note}
          // onChange={this.handleShareholderNameChange6(idx)}
          className="form-control form-control-sm"
          placeholder={this.props.note}
          onBlur={event =>
            // console.log(event.target.value)
            this.props.onupdatebody(
              this.props.promise_doc,
              this.props.id,
              "note",
              event.target.value
            )
          }
          // //placeholder={`หมายเหตุ`}
          // placeholder={arr.note}
          // autoComplete="off"
          // disabled={this.isDisabled2()}
        />
        <center>
          <MDBIcon onClick={this.handleRemoveShareholder} icon="trash-alt" />
        </center>
      </MDBCol>
    );
  }
}

import React, { Component } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from "mdbreact";
const option = {
  headers: {
    "content-type": "application/json",
    "mis-access-token": "PCW2AsbezqUtyKLSQMijurVMG5ntzBMaTkY"
  }
};

export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.hrefbr = this.hrefbr.bind(this);

    this.state = {
      modal: false,
      datalist: [],
      opendate: "",
      classname: "",
      managername: "",
      room_id: "",
      room_number: "",
      stock_area: "",
      total_area: "",
      use_area: "",
      tel: "",
      loading: false
    };
  }
  componentDidMount() {
    this.masterdata();
    this.loaddata();
  }

  masterdata() {
    const url =
      "http://172.18.24.113:5020/inhouse/getbranchdata/" + this.props.br;
    axios
      .get(url, option)
      .then(response => {
        return response.data;
      })
      .then(json => {
        console.log(json.data);
        this.setState({
          opendate: json.data[0].opendate,
          classname: json.data[0].classname,
          managername: json.data[0].managername,
          room_id: json.data[0].room_id,
          room_number: json.data[0].room_number,
          stock_area: json.data[0].stock_area,
          total_area: json.data[0].total_area,
          use_area: json.data[0].use_area,
          tel:
            json.data[0].tel01 +
            " " +
            json.data[0].tel02 +
            " " +
            json.data[0].tel03
        });
        console.log(this.state);
      });
  }
  loaddata() {
    let url =
      "http://172.18.24.113:5020/promise/getpromisebybranch/" + this.props.br;
    axios
      .get(url, option)
      .then(response => {
        return response.data;
      })
      .then(json => {
        console.log(json.data);
        this.setState({
          datalist: json.data
        });
      });
  }
  hrefbr = () => {
    window.location.replace("/promise/" + this.props.br);
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.props.fn(this.state.modal);
  };
  render() {
    const { datalist } = this.state;
    return (
      <MDBContainer>
        {/* <MDBBtn onClick={this.toggle}>Modal</MDBBtn> */}
        <MDBModal
          isOpen={this.props.op}
          toggle={this.toggle}
          size="lg"
          //backdrop={false}
        >
          <MDBModalHeader toggle={this.toggle}>
            {this.props.text}
          </MDBModalHeader>
          <MDBModalBody>
            <dl className="row">
              <dt className="col-sm-3">ประเภทที่ตั้ง</dt>
              <dd className="col-sm-9">{this.state.classname}</dd>
              <dt className="col-sm-3">วันที่เปิดสาขา</dt>
              <dd className="col-sm-9">{this.state.opendate}</dd>
              <dt className="col-sm-3">ชื่อผู้จัดการ</dt>
              <dd className="col-sm-9">{this.state.managername}</dd>
              <dt className="col-sm-3">Tel.</dt>
              <dd className="col-sm-9">{this.state.tel}</dd>
              <dt className="col-sm-3">เลขที่ห้อง</dt>
              <dd className="col-sm-9">{this.state.room_id}</dd>
              <dt className="col-sm-3">พื้นที่รวม</dt>
              <dd className="col-sm-9">{this.state.total_area}</dd>
              <dt className="col-sm-3">พื้นที่ใช้สอย</dt>
              <dd className="col-sm-9">{this.state.use_area}</dd>
              <dt className="col-sm-3">พื้นที่คลัง</dt>
              <dd className="col-sm-9">{this.state.stock_area}</dd>
              <dt className="col-sm-3">จำนวนห้อง</dt>
              <dd className="col-sm-9">{this.state.room_number}</dd>
            </dl>
            <MDBTable small bordered striped>
              <MDBTableHead color="primary-color" textWhite>
                <tr className="text-center">
                  <th>#</th>
                  <th>เลขที่สัญญา</th>
                  <th>ผู้ให้เช่า</th>
                  <th>สถานะ</th>
                  <th>status</th>
                  <th>ระยะเวลา(วัน)</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {datalist.map((res, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{res.promise_id}</td>
                    <td>{res.employee_promise}</td>
                    <td>{res.status_hire}</td>
                    <td className="text-center">{res.status}</td>
                    <td width={100} className="text-center">
                      {res.period > 0 ? (
                        res.period
                      ) : (
                        <b className="red-text">หมดสัญญา</b>
                      )}
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn gradient="blue" onClick={this.hrefbr}>
              ข้อมูลสัญญาเช่า
            </MDBBtn>
            <MDBBtn color="danger" onClick={this.toggle}>
              ปิด
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

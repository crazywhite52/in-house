import React from "react";
import withAuth from "../components/withAuth";
import LoadingScreen from "react-loading-screen";
import Loader from "react-loader-spinner";
import swal from "sweetalert";
import Bodyedit from "./Bodyedit";
import swal2 from "@sweetalert/with-react";
import CatInputs from "./CatInputs";
import UniqueId from "react-html-id";
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
import axios from "axios";
import JqxGrid, {
  IGridProps,
  jqx
} from "jqwidgets-framework/jqwidgets-react-tsx/jqxgrid";
var update = require("immutability-helper");
const option = {
  headers: {
    "content-type": "application/json",
    "mis-access-token": "PCW2AsbezqUtyKLSQMijurVMG5ntzBMaTkY"
  }
};
let textInput = React.createRef();
let txt_promise_id = React.createRef();
class Promise extends React.Component {
  constructor(props) {
    super(props);
    UniqueId.enableUniqueIds(this);
    //this.textInput = React.createRef();
    this.initialState = { ...this.state };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangebox = this.handleChangebox.bind(this);
    this.updatedata = this.updatedata.bind(this);
    this.handledelupdate = this.handledelupdate.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.isDisabled2 = this.isDisabled2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleAddShareholder = this.handleAddShareholder.bind(this);
    this.handleKeyPromise = this.handleKeyPromise.bind(this);
    this.reset = this.reset.bind(this);
    this.onupdatebody = this.onupdatebody.bind(this);
    this.ondeletebody = this.ondeletebody.bind(this);

    this.state = {
      count: 1,
      chk: "add",
      svdata: [
        { promise_doc: "", id: 1, rent: "", servicecharge: "",centercharge:"", note: "" }
      ],
      Loader: false,
      save_status: "",
      rent: [],
      servicecharge: [],
      centercharge:[],
      note: [],
      promise_doc: "",
      brdata: [],
      area: [],
      location: [],
      branch: [],
      isLoading: false,
      loading: false,
      approvals: [],
      branchid: "",
      branchname: "",
      typeArea: "",
      txt_size: "",
      promise_id: "",
      employee_promise: "",
      vathouse: "",
      otherpay: "",
      promise_startdate: "",
      promise_enddate: "",
      status_hire: "",
      status: "",
      isChecked: true
    };
    //console.log(this.state);
    //console.log(this.props);
  }

  componentWillMount() {
    this.id = `toggle_${Math.random()
      .toString()
      .replace(/0\./, "")}`;
  }

  handleChangebox() {
    this.setState({ isChecked: !this.state.isChecked });
  }
  handledelupdate() {
    this.setState({
      svdata: [
        { promise_doc: "", id: "", rent: "", servicecharge: "",centercharge:"", note: "" }
      ],
      chk: "add"
    });
  }
  isDisabled() {
    if (this.state.count >= 4) {
      return true;
    }
  }
  isDisabled2() {
    if (this.state.isChecked === true) {
      return true;
    }
  }
  handleAddShareholder() {
    this.setState({
      count: this.state.count + 1
    });
    //console.log(this.state);
  }

  componentDidMount() {
    //console.log(this.props);
    this.loadData();
    this.loadDatabranch();
    this.getarea();
    this.handleKeyPress();
  }
  updatedata(e) {
    txt_promise_id.current.focus();
    this.setState({
      promise_id: e
    });
  }
  reset() {
    window.location.replace("/promise/" + this.props.match.params.brno);
  }

  handleChange(e) {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleKeyPromise(e) {
    textInput.current.focus();
    if (this.state.promise_id === "") {
      swal("กรุณาใส่ เลขที่สัญญา", "You clicked the button!", "error");
      return false;
    }
    
    const url =
      "http://172.18.24.113:5020/promise/checkedpromise/" +
      this.state.promise_id;
    axios
      .get(url, option)
      .then(response => {
        return response.data;
      })
      .then(json => {
        if (json.status === false) {
          this.setState({
            save_status: "insert"
          });
        } else {
          this.setState({ Loader: true });
          this.timeout = setTimeout(() => {
            const url2 =
              "http://172.18.24.113:5020/promise/getpromisedata/" +
              json.promise_doc;
            axios
              .get(url2, option)
              .then(response2 => {
                return response2.data;
              })
              .then(json2 => {
                if (json2.data.RSN.length === 0) {
                  this.setState({
                    svdata: json2.data.RSN,
                    chk: "add"
                  });
                } else {
                  this.setState({
                    svdata: json2.data.RSN,
                    chk: "update"
                  });
                }
                this.timeout = setTimeout(() => {
                  this.setState({
                    employee_promise: json2.data.employee_promise,
                    promise_enddate: json2.data.promise_enddate,
                    promise_startdate: json2.data.promise_startdate,
                    status_hire: json2.data.status_hire,
                    status: json2.data.status,
                    otherpay: json2.data.other_pay,
                    vathouse: json2.data.property_tax,
                    branchid: json2.data.branchid,
                    branchname: json2.data.branchid,
                    Loader: false
                  });
                  this.handleKeyPress();
                }, 300);
              });
          }, 400);
          this.setState({
            save_status: "update",
            promise_doc: json.promise_doc
          });
        }
      });
  }

  onBlur(e) {
    var selectedItem = this.state.branch.find(function(item) {
      return item.branchid === e.target.value;
    });
    this.setState({
      branchid: this.state.branchname,
      txt_brname: selectedItem.branchname
    });
  }
  handleKeyPress = event => {
    const url =
      "http://172.18.24.113:5020/inhouse/getbranchdata/" +
      this.props.match.params.brno;
    axios
      .get(url, option)
      .then(response => {
        return response.data;
      })
      .then(json => {
        console.log(json.data);
        if (json.sucess === false) {
          swal("ยังไม่มีข้อมูลสาขานี้", "You clicked the button!", "error");
          this.setState({
            branchid: "",
            branchname: ""
          });
          return false;
        } else {
          this.setState({
            branchid: json.data[0].branchid,
            branchname: json.data[0].branchid,
            typeArea: json.data[0].classid,
            txt_size: json.data[0].total_area,
            txt_brname: json.data[0].branchname
          });
        }
      });
  };
  onSubmit(e) {
    e.preventDefault();
    if (this.state.promise_id === "") {
      swal("กรุณาใส่ เลขที่สัญญา", "You clicked the button!", "error");
      return false;
    }
    if (this.state.branchid === "") {
      swal("กรุณาใส่ สาขา", "You clicked the button!", "error");
      return false;
    }
    this.setState({ isLoading: true });

    let newArr = [];

    newArr = {
      promise_id: this.state.promise_id,
      branchid: this.state.branchid,
      branchname: this.state.txt_brname,
      employee_promise: this.state.employee_promise,
      other_pay: this.state.otherpay,
      promise_startdate: this.state.promise_startdate,
      promise_enddate: this.state.promise_enddate,
      status_hire: this.state.status_hire,
      status: this.state.status,
      property_tax: this.state.vathouse,
      promise_doc: this.state.promise_doc,
      svdata: this.state.svdata
    };

    console.log(JSON.stringify(newArr));
    //console.log(newArr);
    this.setState({ isLoading: true });
    this.timeout = setTimeout(() => {
      const api_save_update =
        "http://172.18.24.113:5020/promise/updatepromisedata";
      const api_save_insert =
        "http://172.18.24.113:5020/promise/insertpromisedata";

      fetch(
        this.state.save_status === ""
          ? "http://172.18.24.113:5020/promise/insertpromisedata"
          : this.state.save_status === "insert"
          ? api_save_insert
          : api_save_update,
        {
          method: "POST",
          body: JSON.stringify(newArr),
          headers: {
            "Content-Type": "application/json",
            "mis-access-token": "PCW2AsbezqUtyKLSQMijurVMG5ntzBMaTkY"
          }
        }
      )
        .then(response => response.json())
        .then(res => {
          window.location.replace("/promise/" + this.props.match.params.brno);
          //console.log(res);
          //if (res.status === true) {
          // this.loadData();
          // this.getarea();
          // this.loadData();
          // this.loadDatabranch();
          // this.getarea();
          // this.reset();
          //this.setState({ isLoading: false });
        })
        .catch(error => {
          console.error(error);
        });
    }, 1800);
  }

  loadData() {
    const url =
      "http://27.131.138.143:5020/promise/getpromisebybranch/" +
      this.props.match.params.brno;
    axios
      .get(url, option)
      .then(response => {
        return response.data;
      })
      .then(json => {
        //console.log(json.data);
        this.setState({ location: json.data, loading: false });
      });
  }
  loadDatabranch() {
    const url = "http://172.18.24.113:5020/inhouse/getbranchdata/ALL";
    axios
      .get(url, option)
      .then(response => {
        return response.data;
      })
      .then(json => {
        //console.log(json.data);
        this.setState({ branch: json.data, loading: false });
      });
  }
  getarea() {
    const url = "http://172.18.24.113:5020/inhouse/getlocation";
    //console.log("API--->getlocation");
    axios
      .get(url, option)
      .then(response => {
        return response.data;
      })
      .then(json => {
        //console.log(json.data);
        this.setState({ area: json.data, loading: false });
      });
    //console.log(this.state.location)
  }
  onupdatebody(key, id, txt, newvalue) {
    //console.log(key+' : '+id+' : '+txt+' : '+newvalue);
    let newarrxx = [];
    newarrxx = this.state.svdata;
    // console.log(newarrxx)
    var commentIndex = newarrxx.findIndex(function(c) {
      return c.id == id;
    });
    if (txt === "rent") {
      var updatedComment = update(newarrxx[commentIndex], {
        rent: { $set: parseFloat(newvalue) }
      });
    } else if (txt === "servicecharge") {
      var updatedComment = update(newarrxx[commentIndex], {
        servicecharge: { $set: parseFloat(newvalue) }
      });
    } else if (txt === "centercharge") {
      var updatedComment = update(newarrxx[commentIndex], {//centercharge
        centercharge: { $set: parseFloat(newvalue) }
      });
    } else if (txt === "note") {
      var updatedComment = update(newarrxx[commentIndex], {
        note: { $set: newvalue }
      });
    }
    //  console.log(updatedComment);
    newarrxx.splice(commentIndex, 1);
    newarrxx.push(updatedComment);
    //console.log(newarrxx);
    // console.log(updatedComment);
    // var newData = update(data, {
    //   $splice: [[commentIndex, 1, updatedComment]]
    // });
  }
  ondeletebody(id) {
    let newarrxx = this.state.svdata;
    console.log(newarrxx);
    var commentIndex = newarrxx.findIndex(function(c) {
      return c.id == id;
    });
    newarrxx.splice(commentIndex, 1);
    console.log(newarrxx);
    this.setState({ svdata: newarrxx }, () => {
      console.log(this.state.svdata);
    });
  }

  handleAddShareholder() {
    let newarrxx = this.state.svdata;
    console.log(newarrxx);
    var x = Math.max(...newarrxx.map(o => o.id), newarrxx[0].id);
    let newArr = {
      promise_doc: this.state.promise_doc,
      id: x + 1,
      rent: 0,
      servicecharge: 0,
      centercharge:0,
      note: ""
    };
    newarrxx.push(newArr);
    this.setState({ svdata: newarrxx }, () => {
      console.log(this.state.svdata);
    });
  }

  render() {
    if (this.state.isLoading === true) {
      return (
        <div>
          <LoadingScreen
            loading={true}
            bgColor="#f1f1f1"
            spinnerColor="#9ee5f8"
            textColor="#676767"
            logoSrc={""}
            text="กำลังบันทึกข้อมูล..."
          >
            <div>Loadable content</div>
          </LoadingScreen>
        </div>
      );
    } else {
      const {
        count,
        save_status,
        brdata,
        location,
        branch,
        area,
        isLoading
      } = this.state;
      //console.log(location);
      const cellClass = (
        row: number,
        columnfield: any,
        value: number
      ): string => {
        if (value === 0) {
          return (
            '<div class="jqx-grid-cell-left-align" style="margin-top: 8px;">' +
            value +
            "</div>"
          );
        } else if (value === 1) {
          return (
            '<div class="jqx-grid-cell-left-align" style="margin-top: 8px;">' +
            value +
            "</div>"
          );
        } else if (value === 2) {
          return (
            '<div class="jqx-grid-cell-left-align" style="margin-top: 8px;">' +
            value +
            "</div>"
          );
        } else if (value === 3) {
          return (
            '<div class="jqx-grid-cell-left-align" style="margin-top: 8px;">' +
            value +
            "</div>"
          );
        } else if (value === 4) {
          return (
            '<div class="jqx-grid-cell-left-align" style="margin-top: 8px;">' +
            value +
            "</div>"
          );
        } else if (value === 5) {
          return (
            '<div class="jqx-grid-cell-left-align" style="margin-top: 8px;">' +
            value +
            "</div>"
          );
        } else {
          return "";
        }
      };
      const cellClass2 = (
        row: number,
        columnfield: any,
        value: number
      ): string => {
        if (value === 0) {
          return (
            '<div class="jqx-grid-cell-left-align" style="margin-top: 8px;color: #00CC00;">' +
            value +
            "</div>"
          );
        } else if (value === 1) {
          return (
            '<div class="jqx-grid-cell-left-align" style="margin-top: 8px;color: red;">' +
            value +
            "</div>"
          );
        } else {
          return "";
        }
      };
      //console.log(this.state.location)
      const data = this.state.location;
      const source = {
        localdata: data,
        datatype: "json",
        datafields: [
          { name: "branchid", type: "string" },
          { name: "branchname", type: "string" },
          { name: "promise_id", type: "string" },
          { name: "status_hire", type: "string" },
          { name: "status", type: "string" },
          { name: "promise_doc", type: "string" }
        ]
      };
      const dataAdapter = new jqx.dataAdapter(source);

      const columns = [
        {
          text: "",
          datafield: "",
          columntype: "button",
          width: "5%",
          editable: false,
          buttonclick: (row: number) => {
            let value = this.refs.myGrid.getrowdata(row);
            //console.log(value);
            this.updatedata(value.promise_id);
          },
          cellsrenderer: (): string => {
            return "แก้ไข";
          }
        },
        {
          text: "เลขที่สัญญา",
          datafield: "promise_doc",
          align: "center",
          editable: false,
          width: "10%"
        },
        {
          text: "รหัสสาขา",
          datafield: "branchid",
          align: "center",
          editable: false,
          width: "10%"
        },
        {
          text: "ชื่อสาขา",
          datafield: "branchname",
          editable: false,
          align: "center",
          width: "30%"
        },
        {
          text: "เลขที่สัญญา",
          datafield: "promise_id",
          editable: false,
          align: "center",
          width: "20%"
        },
        {
          text: "สถานะ",
          datafield: "status_hire",
          width: "15%",
          editable: false,
          cellsalign: "center",
          align: "center"
          // cellsrenderer: cellClass
        },
        {
          text: "status",
          datafield: "status",
          cellsalign: "center",
          width: "10%",
          align: "center",
          editable: false
          // cellsrenderer: cellClass2
        }
      ];

      //console.log(this.state.svdata);
      const list = this.state.svdata.map(data => (
        <Bodyedit
          promise_doc={data.promise_doc}
          ondeletebody={this.ondeletebody}
          onupdatebody={this.onupdatebody}
          id={data.id}
          rent={data.rent}
          servicecharge={data.servicecharge}
          centercharge={data.centercharge}
          note={data.note}
        />
      ));

      return (
        <MDBContainer fluid>
          <p />
          {this.state.Loader === false ? (
            ""
          ) : (
            <Loader type="ThreeDots" color="#00BFFF" height="50" width="100" />
          )}
          <p className="h6">ข้อมูลสัญญาเช่า {this.state.promise_doc}</p>
          <form>
            <MDBRow>
              <MDBCol md="12" lg="6">
                <MDBRow>
                  <MDBCol sm="2" md="2" lg="2">
                    <label>เลขที่สัญญา</label>
                  </MDBCol>
                  <MDBCol sm="4" md="4" lg="4">
                    <input
                      ref={txt_promise_id}
                      name="promise_id"
                      value={this.state.promise_id}
                      onChange={this.handleChange}
                      onBlur={this.handleKeyPromise}
                      className="form-control form-control-sm"
                      placeholder=""
                      autoComplete="off"
                    />
                  </MDBCol>
                  <MDBCol sm="2" md="2" lg="2">
                    <label>ผู้ให้เช่า</label>
                  </MDBCol>
                  <MDBCol sm="4" md="4" lg="4">
                    <input
                      ref={textInput}
                      name="employee_promise"
                      value={this.state.employee_promise}
                      onChange={this.handleChange}
                      className="form-control form-control-sm"
                      placeholder=""
                      autoComplete="off"
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol md="6">
                <MDBRow>
                  <MDBCol sm="2" md="2" lg="2">
                    <label>ประเภทที่ตั้ง</label>
                  </MDBCol>
                  <MDBCol sm="4" md="4" lg="4">
                    <select
                      className="form-control form-control-sm"
                      name="typeArea"
                      value={this.state.typeArea}
                      onChange={this.handleChange}
                      disabled
                    >
                      <option value="" selected>
                        ...
                      </option>
                      {area.map(data => (
                        <option key={data.classid} value={data.classid}>
                          {data.classname}
                        </option>
                      ))}
                    </select>
                  </MDBCol>
                  <MDBCol sm="3" md="3" lg="3">
                    <label>ขนาดพื้นที่(ตารางเมตร)</label>
                  </MDBCol>
                  <MDBCol sm="3" md="3" lg="3">
                    <input
                      name="txt_size"
                      value={this.state.txt_size}
                      onChange={this.handleChange}
                      className="form-control form-control-sm"
                      placeholder=""
                      autoComplete="off"
                      disabled
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol md="12" lg="6">
                <MDBRow>
                  <MDBCol md="2">
                    <label>รหัสสาขา</label>
                  </MDBCol>
                  <MDBCol md="4">
                    <input
                      name="branchid"
                      value={this.state.branchid}
                      onChange={this.handleChange}
                      className="form-control form-control-sm"
                      placeholder=""
                      autoComplete="off"
                      disabled
                    />
                  </MDBCol>
                  <MDBCol md="2">
                    <label>ชื่อสาขา</label>
                  </MDBCol>
                  <MDBCol md="4">
                    <select
                      disabled
                      ref={branchname => {
                        this.nameInput = branchname;
                      }}
                      className="form-control form-control-sm"
                      name="branchname"
                      value={this.state.branchname}
                      onBlur={this.onBlur.bind(this)}
                      //onBlur={this.brNameChange(this.state.branchname)}
                      onChange={this.handleChange}
                    >
                      <option value="" selected>
                        เลือก
                      </option>
                      {branch.map(r => (
                        <option key={r.branchid} value={r.branchid}>
                          {r.branchname}
                        </option>
                      ))}
                    </select>
                  </MDBCol>
                </MDBRow>
              </MDBCol>

              <MDBCol md="12" lg="6">
                <MDBRow>
                  <MDBCol md="2">
                    <label>ภาษีโรงเรือน</label>
                  </MDBCol>
                  <MDBCol md="4">
                    <input
                      name="vathouse"
                      value={this.state.vathouse}
                      onChange={this.handleChange}
                      className="form-control form-control-sm"
                      placeholder=""
                      autoComplete="off"
                    />
                  </MDBCol>
                  <MDBCol md="2">
                    <label>ค่าใช้จ่ายอื่นๆ</label>
                  </MDBCol>
                  <MDBCol md="4">
                    <input
                      name="otherpay"
                      value={this.state.otherpay}
                      onChange={this.handleChange}
                      className="form-control form-control-sm"
                      placeholder=""
                      autoComplete="off"
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCol>

              <MDBCol md="12" lg="6">
                <MDBRow>
                  <MDBCol md="2">
                    <label>เริ่มต้นอายุสัญญา</label>
                  </MDBCol>
                  <MDBCol md="4">
                    <input
                      //defaultValue={""}
                      type="date"
                      name="promise_startdate"
                      value={this.state.promise_startdate}
                      onChange={this.handleChange}
                      className="form-control form-control-sm"
                      placeholder=""
                      autoComplete="off"
                    />
                  </MDBCol>
                  <MDBCol md="2">
                    <label>สิ้นสุดอายุสัญญา</label>
                  </MDBCol>
                  <MDBCol md="4">
                    <input
                      type="date"
                      name="promise_enddate"
                      value={this.state.promise_enddate}
                      onChange={this.handleChange}
                      className="form-control form-control-sm"
                      placeholder=""
                      autoComplete="off"
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCol>

              <MDBCol md="6" />

              <MDBCol md="12" lg="6">
                <MDBRow>
                  <MDBCol md="2">
                    <label>สถานะสัญญาเช่า</label>
                  </MDBCol>
                  <MDBCol md="4">
                    <select
                      className="form-control form-control-sm"
                      name="status_hire"
                      value={this.state.status_hire}
                      onChange={this.handleChange}
                    >
                      <option value="" selected>
                        เลือก
                      </option>
                      <option value="0">ไม่มีสัญญา</option>
                      <option value="1">รอสัญญา</option>
                      <option value="2">สญ.(ต้น+คู่)อยู่ที่ศูนย์</option>
                      <option value="3">รอลงนาม</option>
                      <option value="4">รอสัญญาคู่ฉบับ</option>
                      <option value="5">คู่ฉบับตัวจริง</option>
                    </select>
                  </MDBCol>
                  <MDBCol md="2">
                    <label>สถานะ(Y,N)</label>
                  </MDBCol>
                  <MDBCol md="4">
                    <select
                      className="form-control form-control-sm"
                      name="status"
                      value={this.state.status}
                      onChange={this.handleChange}
                    >
                      <option value="" selected>
                        เลือก
                      </option>
                      <option value="0">Yes</option>
                      <option value="1">No</option>
                    </select>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol md="3" lg="3">
                {""}
              </MDBCol>
              <MDBCol md="3" lg="3">
                {""}
              </MDBCol>
              <MDBCol md="12" lg="6">
                <MDBRow>{""}</MDBRow>
              </MDBCol>
            </MDBRow>
            <p />
            <MDBRow>
              <MDBCol md="1">
                <p style={{ marginBottom: "0px" }}>
                  <label>ค่าบริการ/เดือน</label>
                </p>
                <p style={{ marginBottom: "0px" }}>
                  <label>ค่าเช่า</label>
                </p>
                <p style={{ marginBottom: "0px" }}>
                  <label>ค่าบริการ</label>
                </p>
                <p style={{ marginBottom: "0px" }}>
                  <label>ค่าบริการส่วนกลาง</label>
                </p>
                <label>หมายเหตุ</label>
              </MDBCol>
              {list}
              {this.state.svdata.length < 5 ? (
                <MDBCol md="1">
                  <MDBBtn
                  size="sm"
                    active
                    gradient="blue"
                    onClick={this.handleAddShareholder}
                  >
                    เพิ่มใหม่
                  </MDBBtn>
                </MDBCol>
              ) : (
                <MDBCol md="1">
                  {/* <MDBBtn outline color="primary" onClick={this.handleAddShareholder}>เพิ่มใหม่</MDBBtn> */}
                </MDBCol>
              )}
            </MDBRow>

            <MDBBtn
              gradient="aqua"
              size="md"
              type="button"
              onClick={this.onSubmit}
            >
              <MDBIcon icon="save" />{" "}
              {save_status === ""
                ? "บันทึก"
                : save_status === "insert"
                ? "บันทึก"
                : "อัฟเดท"}
            </MDBBtn>
            <MDBBtn
              type="button"
              gradient="peach"
              size="md"
              onClick={this.reset}
            >
              <MDBIcon icon="ban" /> ยกเลิก
            </MDBBtn>

            <p />
            <MDBRow>
              <MDBCol md="12">
                <JqxGrid
                  theme={"blackberry"}
                  ref="myGrid"
                  width={"100%"}
                  source={dataAdapter}
                  editable={true}
                  columns={columns}
                  enabletooltips={true}
                  selectionmode={"singlecell"}
                  showfilterrow={true}
                  altrows={true}
                  filterable={true}
                />
              </MDBCol>
            </MDBRow>
          </form>
        </MDBContainer>
      );
    }
  }
}

export default withAuth(Promise);

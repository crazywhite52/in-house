import React from "react";
import {
  MDBEdgeHeader,
  MDBContainer,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBIcon,
  MDBNavLink,
  MDBDataTable,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCard
} from "mdbreact";
import swal from "sweetalert";
import swal2 from "@sweetalert/with-react";
import "../components/bg.css";
import axios from "axios";
import "../components/Inhouse.css";
import "../components/address.css";
import LoadingScreen from "react-loading-screen";
import withAuth from "../components/withAuth";
import Upload from "../components/ImageUpload";
import JqxGrid, {
  IGridProps,
  jqx
} from "jqwidgets-framework/jqwidgets-react-tsx/jqxgrid";

const option = {
  headers: {
    "content-type": "application/json",
    "mis-access-token": "PCW2AsbezqUtyKLSQMijurVMG5ntzBMaTkY"
  }
};
let approvals = [];

class Inhouse_edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      isLoading: false,
      brdata: "",
      approvals: "",
      location: [],
      getzone: [],
      brNo: "",
      brName: "",
      brNickname: "",
      Zone: "",
      typeArea: "",
      roomNo: "",
      TotalArea: "",
      total_area: "",
      UsefulSpace: "",
      Warea: "",
      Numroom: "",
      dateBr: "",
      Address1: "",
      Address2: "",
      Subdistrict: "",
      District: "",
      Province: "",
      Zipcode: "",
      tel1: "",
      tel2: "",
      tel3: "",
      manageName: "",
      personal: "",
      loading: true,
      save: false
    };
    this.initialState = { ...this.state };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyDoc = this.handleKeyDoc.bind(this);
    this.updatedata = this.updatedata.bind(this);
    this.getbrdataEdit = this.getbrdataEdit.bind(this);
    this.addprom = this.addprom.bind(this);
  }

  componentDidMount() {
    this.getbrdataEdit();
    this.loadData();
    this.getlocation();
    this.getZone();
  }
  addprom() {
    window.location.href = "/promise/" + this.props.match.params.brno;
  }
  updatedata(e) {
    this.inputbrNo.focus();
    this.setState({ brNo: e });
  }
  getbrdataEdit() {
    const url =
      "http://172.18.24.113:5020/inhouse/getbranchdata/" +
      this.props.match.params.brno;
    axios
      .get(url, option)
      .then(response => {
        return response.data;
      })
      .then(json => {
        this.setState({
          brNo: json.data[0].branchid,
          brName: json.data[0].branchname,
          brNickname: json.data[0].shotname,
          Zone: json.data[0].zone,
          typeArea: json.data[0].classid,
          roomNo: json.data[0].room_id,
          TotalArea: json.data[0].total_area,
          UsefulSpace: json.data[0].use_area,
          Warea: json.data[0].stock_area,
          Numroom: json.data[0].room_number,
          dateBr: json.data[0].opendate,
          Address1: json.data[0].address1,
          Address2: json.data[0].address2,
          Subdistrict: json.data[0].tumbol,
          District: json.data[0].aumper,
          Province: json.data[0].province,
          Zipcode: json.data[0].zipcode,
          tel1: json.data[0].tel01,
          tel2: json.data[0].tel02,
          tel3: json.data[0].tel03,
          manageName: json.data[0].managername,
          personal: json.data[0].employees_number
        });
      });
  }
  //this.props.match.params.brno
  handleKeyDoc(e) {
    const url =
      "http://172.18.24.113:5020/inhouse/getbranchdata/" + this.state.brNo;
    axios
      .get(url, option)
      .then(response => {
        return response.data;
      })
      .then(json => {
        //console.log(json.data);
        if (json.data == "") {
          //alert("ไม่พบเลขสาขานี้กรุณาเพิ่มใหม่");
          this.nameInput.focus();
          this.setState({
            brName: "",
            brNickname: "",
            Zone: "",
            typeArea: "",
            roomNo: "",
            TotalArea: "",
            UsefulSpace: "",
            Warea: "",
            Numroom: "",
            dateBr: "",
            Address1: "",
            Address2: "",
            Subdistrict: "",
            District: "",
            Province: "",
            Zipcode: "",
            tel1: "",
            tel2: "",
            tel3: "",
            manageName: "",
            personal: ""
          });
        } else {
          this.setState({
            brNo: json.data[0].branchid,
            brName: json.data[0].branchname,
            brNickname: json.data[0].shotname,
            Zone: json.data[0].zone,
            typeArea: json.data[0].classid,
            roomNo: json.data[0].room_id,
            TotalArea: json.data[0].total_area,
            UsefulSpace: json.data[0].use_area,
            Warea: json.data[0].stock_area,
            Numroom: json.data[0].room_number,
            dateBr: json.data[0].opendate,
            Address1: json.data[0].address1,
            Address2: json.data[0].address2,
            Subdistrict: json.data[0].tumbol,
            District: json.data[0].aumper,
            Province: json.data[0].province,
            Zipcode: json.data[0].zipcode,
            tel1: json.data[0].tel01,
            tel2: json.data[0].tel02,
            tel3: json.data[0].tel03,
            manageName: json.data[0].managername,
            personal: json.data[0].employees_number
          });
        }
      });
  }

  handleKeyPress = event => {
    if (event.key == "Enter") {
      //console.log(this.state.brNo);
      const url =
        "http://172.18.24.113:5020/inhouse/getbranchdata/" + this.state.brNo;
      axios
        .get(url, option)
        .then(response => {
          return response.data;
        })
        .then(json => {
          //console.log(json);
          if (json.data == "") {
            //alert("ไม่พบเลขสาขานี้กรุณาเพิ่มใหม่");
            this.nameInput.focus();
            this.setState({
              brName: "",
              brNickname: "",
              Zone: "",
              typeArea: "",
              roomNo: "",
              TotalArea: "",
              UsefulSpace: "",
              Warea: "",
              Numroom: "",
              dateBr: "",
              Address1: "",
              Address2: "",
              Subdistrict: "",
              District: "",
              Province: "",
              Zipcode: "",
              tel1: "",
              tel2: "",
              tel3: "",
              manageName: "",
              personal: ""
            });
          } else {
            this.setState({
              brNo: json.data[0].branchid,
              brName: json.data[0].branchname,
              brNickname: json.data[0].shotname,
              //Zone: json.data[0].zone,
              typeArea: json.data[0].classid,
              roomNo: json.data[0].room_id,
              TotalArea: json.data[0].total_area,
              UsefulSpace: json.data[0].use_area,
              Warea: json.data[0].stock_area,
              Numroom: json.data[0].room_number,
              dateBr: json.data[0].opendate,
              Address1: json.data[0].address1,
              Address2: json.data[0].address2,
              Subdistrict: json.data[0].tumbol,
              District: json.data[0].aumper,
              Province: json.data[0].province,
              Zipcode: json.data[0].zipcode,
              tel1: json.data[0].tel01,
              tel2: json.data[0].tel02,
              tel3: json.data[0].tel03,
              manageName: json.data[0].managername,
              personal: json.data[0].employees_number
            });
          }
        });
    }
  };
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    // const url ="http://27.131.138.143:5020/inhouse/getbranchdata/" + this.state.brNo;
    //     axios
    //       .get(url, option)
    //       .then(response => {
    //         return response.data;
    //       })
    //       .then(json => {
    //         this.setState({ brdata: json, loading: false });
    //       });
    //     console.log(this.state.brdata);
  }
  reset() {
    this.setState(this.initialState);
  }
  loadData() {
    const url = "http://172.18.24.113:5020/inhouse/getbranchdata/ALL";
    axios
      .get(url, option)
      .then(response => {
        return response.data;
      })
      .then(json => {
        this.setState({ approvals: json, loading: false });
      });
  }
  getZone() {
    const url = "http://172.18.24.113:5020/inhouse/getzone";
    axios
      .get(url, option)
      .then(response => {
        return response.data;
      })
      .then(json => {
        console.log(json.data);
        this.setState({ getzone: json.data, loading: false });
      });
  }
  getlocation() {
    const url = "http://172.18.24.113:5020/inhouse/getlocation";
    //console.log("API--->getlocation");
    axios
      .get(url, option)
      .then(response => {
        return response.data;
      })
      .then(json => {
        //console.log(json.data);
        this.setState({ location: json.data, loading: false });
      });
    //console.log(this.state.location)
  }
  onSubmit(e) {
    e.preventDefault();

    if (this.state.brNo === "") {
      swal("กรุณากรอกข้อมูล เลขที่สาขา", "You clicked the button!", "error");
      return false;
    } else {
      //this.props.onSubmit();
      let newArr = [];
      newArr = {
        branchid: this.state.brNo,
        branchname: this.state.brName,
        shotname: this.state.brNickname,
        zone: this.state.Zone,
        classid: this.state.typeArea,
        room_id: this.state.roomNo,
        total_area: this.state.TotalArea,
        use_area: this.state.UsefulSpace,
        stock_area: this.state.Warea,
        room_number: this.state.Numroom,
        opendate: this.state.dateBr,
        address1: this.state.Address1,
        address2: this.state.Address2,
        tumbol: this.state.Subdistrict,
        aumper: this.state.District,
        province: this.state.Province,
        zipcode: this.state.Zipcode,
        tel01: this.state.tel1,
        tel02: this.state.tel2,
        tel03: this.state.tel3,
        managername: this.state.manageName,
        employees_number: this.state.personal
      };

      console.log(JSON.stringify(newArr));
      this.setState({ isLoading: true });
      this.timeout = setTimeout(() => {
        fetch("http://172.18.24.113:5020/inhouse/updatebranchdata", {
          method: "POST",
          body: JSON.stringify(newArr),
          headers: {
            "Content-Type": "application/json",
            "mis-access-token": "PCW2AsbezqUtyKLSQMijurVMG5ntzBMaTkY"
          }
        })
          .then(response => response.json())
          .then(res => {
            //console.log(res);
            if (res.status === true) {
              //this.setState({ isLoading: false });
              //this.loadData();
              //this.getlocation();
              window.location.replace("/");
              //this.reset();
              //console.log(res.status);
            }
          })
          .catch(err => this.setState({ statusSave: false }));
      }, 1500);
      console.log(JSON.stringify(newArr));
    }
  }

  render() {
    const { location, getzone, isLoading, error } = this.state;
    //console.log(location);
    //console.log(this.state.approvals);
    const fontZ = { "font-size": "24" };
    const mg = { "margin-bottom": "0px", "margin-top": "0px" };
    if (this.state.isLoading === false) {
      return (
        <MDBContainer fluid>
          <div>
            <br />
            <p className="h6">Branchinfo(ข้อมูลสาขา)</p>
            <form
              className="needs-validation"
              //onSubmit={this.onSubmit}
              noValidate
            >
            
              <MDBRow>
                <MDBCol md="6">
                  <MDBRow>
                    <MDBCol sm="2" md="4" lg="2">
                      <label>เลขที่สาขา</label>
                    </MDBCol>
                    <MDBCol sm="2" md="8" lg="2">
                      <input
                        ref={brNo => {
                          this.inputbrNo = brNo;
                        }}
                        name="brNo"
                        value={this.state.brNo}
                        onChange={this.handleChange}
                        onBlur={this.handleKeyDoc}
                        onKeyPress={this.handleKeyPress}
                        // onChange={e => this.change(e)}
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                        disabled
                      />
                    </MDBCol>
                    <MDBCol sm="2" md="4" lg="2">
                      <label>ชื่อสาขา(เต็ม)</label>
                    </MDBCol>
                    <MDBCol sm="6" md="8" lg="6">
                      <input
                        ref={brName => {
                          this.nameInput = brName;
                        }}
                        name="brName"
                        value={this.state.brName}
                        onChange={this.handleChange}
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                        disabled
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol md="6">
                  <MDBRow>
                    <MDBCol sm="2" md="4" lg="2">
                      <label>ชื่อสาขา(ย่อ)</label>
                    </MDBCol>
                    <MDBCol sm="4" md="8" lg="4">
                      <input
                        name="brNickname"
                        value={this.state.brNickname}
                        onChange={this.handleChange}
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                  <MDBRow>
                    <MDBCol sm="2" md="4" lg="2">
                      <label>Zone</label>
                    </MDBCol>
                    <MDBCol sm="2" md="8" lg="2">
                      <select
                        className="form-control form-control-sm"
                        name="Zone"
                        value={this.state.Zone}
                        onChange={this.handleChange}
                      >
                        <option selected>เลือก</option>
                        {getzone.map(z => (
                          <option value={z.zone}>{z.zone}</option>
                        ))}
                      </select>
                      {/* <input
                        name="Zone"
                        value={this.state.Zone}
                        onChange={this.handleChange}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                      /> */}
                    </MDBCol>
                    <MDBCol sm="2" md="4" lg="2">
                      <label>ประเภทที่ตั้ง</label>
                    </MDBCol>
                    <MDBCol sm="6" md="8" lg="6">
                      <select
                        className="form-control form-control-sm"
                        name="typeArea"
                        value={this.state.typeArea}
                        onChange={this.handleChange}
                      >
                        <option selected>เลือก</option>
                        {location.map(data => (
                          <option value={data.classid}>{data.classname}</option>
                        ))}
                      </select>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol md="6">
                  <MDBRow>
                    <MDBCol sm="2" md="4" lg="2">
                      <label>เลขที่ห้อง</label>
                    </MDBCol>
                    <MDBCol sm="4" md="8" lg="4">
                      <input
                        name="roomNo"
                        value={this.state.roomNo}
                        onChange={this.handleChange}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                      />
                    </MDBCol>
                    <MDBCol sm="2" md="4" lg="2">
                      <label>พื้นที่รวม</label>
                    </MDBCol>
                    <MDBCol sm="4" md="8" lg="4">
                      <input
                        name="TotalArea"
                        value={this.state.TotalArea}
                        onChange={this.handleChange}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                  <MDBRow>
                    <MDBCol sm="2" md="4" lg="2">
                      <label>พื้นที่ใช้สอย</label>
                    </MDBCol>
                    <MDBCol sm="2" md="8" lg="2">
                      <input
                        name="UsefulSpace"
                        value={this.state.UsefulSpace}
                        onChange={this.handleChange}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                      />
                    </MDBCol>
                    <MDBCol sm="2" md="4" lg="2">
                      <label>พื้นที่คลัง</label>
                    </MDBCol>
                    <MDBCol sm="6" md="8" lg="6">
                      <input
                        name="Warea"
                        value={this.state.Warea}
                        onChange={this.handleChange}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol md="6">
                  <MDBRow>
                    <MDBCol sm="2" md="4" lg="2">
                      <label>จำนวนห้อง</label>
                    </MDBCol>
                    <MDBCol sm="4" md="8" lg="4">
                      <input
                        name="Numroom"
                        value={this.state.Numroom}
                        onChange={this.handleChange}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                      />
                    </MDBCol>
                    <MDBCol sm="2" md="4" lg="2">
                      <label>วันที่เปิดสาขา</label>
                    </MDBCol>
                    <MDBCol sm="4" md="8" lg="4">
                      <input
                        name="dateBr"
                        value={this.state.dateBr}
                        onChange={this.handleChange}
                        type="date"
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol md="6">
                  <MDBRow>
                    <MDBCol sm="2" md="4" lg="2">
                      <label>ชื่อผู้จัดการ</label>
                    </MDBCol>
                    <MDBCol sm="4" md="8" lg="4">
                      <input
                        name="manageName"
                        value={this.state.manageName}
                        onChange={this.handleChange}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                      />
                    </MDBCol>
                    <MDBCol sm="2" md="4" lg="2">
                      <label>จำนวนพนักงาน</label>
                    </MDBCol>
                    <MDBCol sm="4" md="8" lg="4">
                      <input
                        name="personal"
                        value={this.state.personal}
                        onChange={this.handleChange}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>

                <MDBCol md="6">
                  <MDBRow>
                    <MDBCol sm="2" md="4" lg="2">
                      <label>address1</label>
                    </MDBCol>
                    <MDBCol sm="10" md="12" lg="10">
                      <input
                        name="Address1"
                        value={this.state.Address1}
                        onChange={this.handleChange}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                      />
                    </MDBCol>
                    <MDBCol sm="2">{""}</MDBCol>
                    <MDBCol sm="4">{""}</MDBCol>
                  </MDBRow>
                </MDBCol>

                <MDBCol md="6">
                  <MDBRow>
                    <MDBCol sm="2" md="2" lg="2">
                      <label>ตำบล</label>
                    </MDBCol>
                    <MDBCol sm="2" md="10" lg="2">
                      <input
                        name="Subdistrict"
                        value={this.state.Subdistrict}
                        onChange={this.handleChange}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                      />
                    </MDBCol>
                    <MDBCol sm="1" md="2" lg="1">
                      <label>อำเภอ</label>
                    </MDBCol>
                    <MDBCol sm="3" md="10" lg="3">
                      <input
                        name="District"
                        value={this.state.District}
                        onChange={this.handleChange}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                      />
                    </MDBCol>
                    <MDBCol sm="1" md="2" lg="1">
                      <label>จังหวัด</label>
                    </MDBCol>
                    <MDBCol sm="3" md="10" lg="3">
                      <input
                        name="Province"
                        value={this.state.Province}
                        onChange={this.handleChange}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol md="6">
                  <MDBRow>
                    <MDBCol sm="2" md="4" lg="2">
                      <label>address2</label>
                    </MDBCol>
                    <MDBCol sm="10" md="12" lg="10">
                      <input
                        name="Address2"
                        value={this.state.Address2}
                        onChange={this.handleChange}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>

                <MDBCol md="6">
                  <MDBRow>
                    <MDBCol sm="2" md="4" lg="2">
                      <label>รหัสไปรษณีย์</label>
                    </MDBCol>
                    <MDBCol sm="2" md="8" lg="2">
                      <input
                        name="Zipcode"
                        value={this.state.Zipcode}
                        onChange={this.handleChange}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                      />
                    </MDBCol>
                    <MDBCol sm="1" md="4" lg="1">
                      <label>Tel.1</label>
                    </MDBCol>
                    <MDBCol sm="3" md="8" lg="3">
                      <input
                        maxlength="10"
                        name="tel1"
                        value={this.state.tel1}
                        onChange={this.handleChange}
                        type="text"
                        className="form-control form-control-sm"
                        autoComplete="off"
                      />
                    </MDBCol>
                    <MDBCol sm="1" md="4" lg="1">
                      <label>Tel.2</label>
                    </MDBCol>
                    <MDBCol sm="3" md="8" lg="3">
                      <input
                        name="tel2"
                        value={this.state.tel2}
                        onChange={this.handleChange}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol md="6">
                  <MDBRow>
                    <MDBCol sm="2" md="4" lg="2">
                      <label>Tel.3</label>
                    </MDBCol>
                    <MDBCol sm="3" md="8" lg="3">
                      <input
                        name="tel3"
                        value={this.state.tel3}
                        onChange={this.handleChange}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder=""
                        autoComplete="off"
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>

                <MDBBtn
                  color="deep-orange"
                  //size="md"
                  className="mb-3"
                  onClick={this.addprom}
                  type="button"
                >
                  <MDBIcon icon="clinic-medical" /> เพิ่มสัญญา
                </MDBBtn>
                <MDBBtn
                  color="primary"
                  //size="md"
                  className="mb-3"
                  onClick={this.onSubmit}
                  type="button"
                >
                  <MDBIcon icon="save" /> บันทึก
                </MDBBtn>
              </MDBRow>
            </form>
          </div>

          <MDBRow>
            {/* <Upload br={this.props.match.params.brno} /> */}
            {/* <MDBCol md="12">
              <JqxGrid
                theme={"material-purple"}
                ref="myGrid"
                width={"100%"}
                source={dataAdapter}
                //editable={true}
                columns={columns}
                enabletooltips={true}
                selectionmode={"singlecell"}
                showfilterrow={true}
                altrows={true}
                filterable={true}
              />
            </MDBCol> */}
          </MDBRow>
        </MDBContainer>
      );
    } else {
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
    }
  }
}

export default withAuth(Inhouse_edit);

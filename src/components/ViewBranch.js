import React from "react";
import swal from "sweetalert";
import swal2 from "@sweetalert/with-react";
import LoadingScreen from "react-loading-screen";
import withAuth from "../components/withAuth";
import Popup from "../components/Popup";
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
  MDBCard,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from "mdbreact";
import axios from "axios";
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

class ViewBranch extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.rowselect = this.rowselect.bind(this);
    this.state = {
      displayW: window.innerWidth,
      displayH: window.innerHeight,
      approvals: [],
      isLoading: false,
      modal: false,
      propbr: "",
      br: ""
    };
  }
  rowselect(){
     this.loadData();
  }
  toggle(e, b) {
    //console.log(e+'---'+b);
    this.setState({
      modal: !this.state.modal,
      propbr: e,
      br: b
    });
    //console.log(this.state);
  }

  componentDidMount() {
    this.loadData();
   
    //console.log(this.state);
  }
  componentWillMount() {
    //console.log(window.innerWidth+'สูง'+'/n'+window.innerHeight);
  }
  loadData() {
    this.setState({ isLoading: true });
    this.timeout = setTimeout(() => {
      const url = "http://172.18.24.113:5020/inhouse/getbranchdata/ALL";
      axios
        .get(url, option)
        .then(response => {
          return response.data;
        })
        .then(json => {
          this.setState({ approvals: json, isLoading: false });
        });
    }, 1000);
  }
  render() {
    const { isLoading, error } = this.state;
    //
    //console.log(this.state.approvals);
    const data = this.state.approvals;
    const source = {
      localdata: data,
      datatype: "json",
      datafields: [
        { name: "employees_number", type: "string" },
        { name: "branchid", type: "string" },
        { name: "branchname", type: "string" },
        { name: "managername", type: "string" },
        { name: "classname", type: "string" },
        { name: "zone", type: "string" },
        { name: "address1", type: "string" },
        { name: "address2", type: "string" },
        { name: "aumper", type: "string" },
        { name: "tumbol", type: "string" },
        { name: "province", type: "string" },
        { name: "opendate", type: "date" },
        { name: "room_id", type: "string" },
        { name: "room_number", type: "string" },
        { name: "shotname", type: "string" },
        { name: "stock_area", type: "string" },
        { name: "tel01", type: "string" },
        { name: "tel02", type: "string" },
        { name: "tel03", type: "string" }
      ]
    };
    const dataAdapter = new jqx.dataAdapter(source);

    const columns = [
      {
        text: "View",
        align: "center",
        filterable: false,
        datafield: "employees_number",
        columntype: "button",
        width: "4%",
        buttonclick: (row: number) => {
          
          let value = this.refs.myGrid.getrowdata(row);
          let txt = "สาขา" + "(" + value.branchid + ")" + value.branchname;
          let br = value.branchid;
          this.toggle(txt, br);
          //console.log(value);
          //console.log(txt);
          
        },
        cellsrenderer: (): string => {
          return "ดู";
        }
      },
      // {
      //   text: "Images",
      //   align: "center",
      //   datafield: "",
      //   columntype: "button",
      //   width: "4%",
      //   buttonclick: (row: number) => {
      //     let value = this.refs.myGrid.getrowdata(row);
      //     //console.log(value);
      //     swal2(<div />);
      //   },
      //   cellsrenderer: (): string => {
      //     return "คลิก";
      //   }
      // },
      {
        text: "แก้ไข",
        align: "center",
        filterable: false,
        columntype: "button",
        width: "4%",
        buttonclick: (row: number) => {
          let value = this.refs.myGrid.getrowdata(row);
          //console.log(value);
          if (typeof window !== "undefined") {
            window.location.href = "/inhouse_edit/" + value.branchid;
          }
          //window.location.replace("/promise/"+value.branchid);
        },
        cellsrenderer: (): string => {
          return "แก้ไข";
        }
      },
      // {
      //   text: "เพิมสัญญา",
      //   align: "center",
      //   filterable: false,
      //   columntype: "button",
      //   width: "4%",
      //   buttonclick: (row: number) => {
      //     let value = this.refs.myGrid.getrowdata(row);
      //     //console.log(value);
      //     if (typeof window !== "undefined") {
      //       window.location.href = "/promise/" + value.branchid;
      //     }
      //     //window.location.replace("/promise/"+value.branchid);
      //   },
      //   cellsrenderer: (): string => {
      //     return "คลิก";
      //   }
      // },
      {
        text: "เลขที่สาขา",
        align: "center",
        datafield: "branchid",
        width: "8%"
      },
      {
        text: "ชื่อสาขา",
        datafield: "branchname",
        width: "30%",
        align: "center"
      },
      {
        text: "ชื่อย่อ",
        datafield: "shotname",
        width: "10%",
        align: "center",
        cellsalign: "center"
      },
      {
        text: "วันที่เปิด",
        filterable: false,
        datafield: "opendate",
        width: "10%",
        align: "center",
        cellsalign: "center",
        cellsformat: "dd/MM/yyyy"
      },
      {
        text: "ชื่อผู้จัดการ",
        datafield: "managername",
        width: "10%",
        align: "center"
        //cellsalign: "center"
      },
      {
        text: "ประเภทที่ตั้ง",
        datafield: "classname",
        width: "10%",
        align: "center",
        cellsalign: "center",
        filtertype: "checkedlist"
      },
      {
        text: "Zone",
        datafield: "zone",
        width: "10%",
        filtertype: "checkedlist",
        align: "center"
      },
      { text: "hd", datafield: "address1", hidden: true },
      { text: "hd", datafield: "address2", hidden: true }
    ];
    if (this.state.isLoading === false) {
      return (
        <div>
          {this.state.modal ? (
            <Popup
              op={this.state.modal}
              fn={this.toggle}
              br={this.state.br}
              text={this.state.propbr}
            />
          ) : null}
          <p />
          <MDBContainer fluid>
            <h5 className="">
              Welcome user :{" "}
              {this.props.user.username + " " + this.props.user.fullname}
            </h5>
            <hr className="mt-1" />
            <MDBBtn href="/inhouse" gradient="blue">
              {" "}
              <MDBIcon far icon="plus-square" /> เพิ่มสาขาใหม่
            </MDBBtn>
           <MDBBtn onClick={this.rowselect} color="primary">Primary</MDBBtn>
            <MDBRow>
              <MDBCol>
                <JqxGrid
                  theme={"blackberry"}
                  ref="myGrid"
                  width={"100%"}
                  height={this.state.displayW >= "1920" ? 700 : 380}
                  //showstatusbar={true}
                  source={dataAdapter}
                  //editable={true}
                  columns={columns}
                  enabletooltips={true}
                  selectionmode={"singlecell"}
                  showfilterrow={true}
                  altrows={true}
                  filterable={true}
                  pageable={true}
                  pagermode={"simple"}
                />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
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
            text="กำลังโหลดข้อมูล..."
          >
            <div>Loadable content</div>
          </LoadingScreen>
        </div>
      );
    }
  }
}

export default withAuth(ViewBranch);

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CurrentYearAffiliates from "./currentYearAffiliates";
import WeeklyComparison from "./CountWeeksCompair";
import History from "./History";
import { Button, Modal, Alert, Row, Col, Container } from "react-bootstrap";

import CountPerDay from "./CountPerDay";
import apiHelper from "../Admin/Helper/ApiHelper";
import loaderImage from "../Admin/images/loader.svg";
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";

// import Modal from "../staticPages/EditInviteModel";

class Dashboard extends Component {
  stateInitial = {
    userId: "",
    inviteCode: "",
    oldCode: "",
    inviteLink: "",
    email: "",
    show1: false,
    show2: false,
    show3: false,
    copied: false,
    loaderActive: false,
    errors: "",
    token: "",
  };

  constructor(props) {
    super(props);
    this.state = this.stateInitial;
  }

  async componentDidMount() {
    this.setState({ loaderActive: true });

    let x = this.props.match;
    let id = x.params.id;
    this.setState({
      userId: id,
    });

    var user = JSON.parse(localStorage.getItem("accessToken"));
    var token = localStorage.getItem("LoginSession");

    if (user) {
      this.setState({ loaderActive: true, token: token, show1: true });
      let result = await apiHelper(
        "get",
        `api/affiliate/Profile/${id}`,
        "",
        ""
      );
      this.setState({ loaderActive: false });
      this.setState({
        loaderActive: false,
        oldCode: result.user.inviteCode,
        inviteCode: result.user.inviteCode,
      });
      if (result.status == 200) {
        if (result.user) {
          this.setState({
            user: result.user,
          });
        } else {
          this.props.history.push({
            pathname: "/",
            state: {
              key: "value",
            },
          });
        }
      } else {
        // this.props.history.push({
        //   pathname: "/",
        //   state: {
        //     key: "value",
        //   },
        // });
      }
    }
    var inviteLink = `${window.APPURL}invite/${this.state.inviteCode}`;
    this.setState({ inviteLink: inviteLink });

    window.onload = function () {
      if (!window.location.hash) {
        window.location = window.location + "#loaded";
        window.location.reload();
      }
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  selectModel = () => {
    this.setState({ show1: false, show2: true });
  };
  handleShow = () => {
    this.state.show = true;
  };

  editInviteCode = async () => {
    var { inviteCode, token, oldCode } = this.state;
    if (inviteCode !== "") {
      if (inviteCode === oldCode) {
        this.setState({ errors: "You entered the same code!" });
        return;
      } else {
        var data = { newCode: inviteCode };
        this.setState({ loaderActive: true });
        var result = await apiHelper(
          "post",
          "api/affiliate/editInviteCode",
          data,
          token
        );
        this.setState({ loaderActive: false });
        if (result.status === 200) {
          this.setState({ show3: true, show2: false });
          return;
        } else if (result.status === 400 || 401 || 402) {
          this.setState({ errors: result.message });
          return;
        }
      }
    } else {
      this.setState({ errors: "Celebrity code cannot be empty!" });
    }
  };
  handleClose2 = () => {
    this.setState({ show3: false });
    window.location.reload();
  };
  handleLoader = (loaderActive) => {
    this.setState({ loaderActive: loaderActive });
  };

  render() {
    let handleClose = () => {
      this.setState({ show1: false, show2: false, show3: false });
    };

    return (
      <div>
        {this.state.loaderActive ? (
          <div className="inlineLoaderGif">
            <img src={loaderImage} alt="broken" />
          </div>
        ) : (
          ""
        )}{" "}
        {/* <Navebar props={this.state.userId} /> */}
        <div>
          {" "}
          <div
            id="content-wrapper"
            className="d-flex align-items-center justify-content-centers"
          >
            <div className="container-fluid">
              <h4 className=" mb-4" style={{ fontWeight: "bold" }}>
                Affiliate's Statistical Dashboard
              </h4>

              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="chart_item">
                    <h4 className="sub_title">Followers Daily Report</h4>
                    <div
                      className="chart_img text-center mt-3"
                      style={{ paddingTop: "3.5rem" }}
                    >
                      <CountPerDay loaderActive={this.handleLoader} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="chart_item">
                    <h4 className="sub_title">Followers Weekly Report</h4>
                    <div
                      className="chart_img text-center mt-3"
                      style={{ paddingTop: "3.5rem" }}
                    >
                      <WeeklyComparison loaderActive={this.handleLoader} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="chart_item">
                    <h4 className="sub_title">Followers Monthly Report</h4>
                    <div
                      className="chart_img text-center mt-3"
                      style={{ paddingTop: "3.5rem" }}
                    >
                      <CurrentYearAffiliates loaderActive={this.handleLoader} />

                      {/* <img
                    src="assets/images/chart_three.png"
                    className="img-fluid"
                    alt=""
                  /> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="chart_item">
                    <h4 className="sub_title">Followers History</h4>
                    <div className="chart_img text-center mt-3">
                      <History loaderActive={this.handleLoader} />{" "}
                      {/* <img
                    src="assets/images/chart_two.png"
                    className="img-fluid"
                    alt=""
                  /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal show={this.state.show1} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Share</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ border: "1px solid black", padding: "10px" }}>
                {`I'd love for us to keep each other inspired and motivated on our journeys. Add me on GoalMogul? `}
                <p
                  style={{
                    color: "#0069d9",
                    textDecoration: "underline",
                    wordWrap: "break-word",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "rgba(64,176,226,0.1)",
                      height: "34px",
                      cursor: "pointer",
                    }}
                  >
                    {this.state.inviteCode}
                    <CopyToClipboard
                      text={this.state.inviteCode}
                      onCopy={() => this.setState({ copied: true })}
                    >
                      <div
                        style={{
                          position: "absolute",
                          marginLeft: "24rem",
                          bottom: "2.7rem",
                        }}
                      >
                        <i class="fa fa-copy" style={{ color: "grey" }}></i>
                      </div>
                    </CopyToClipboard>
                    {this.state.copied ? (
                      <div
                        style={{
                          color: "red",
                          fontSize: "12px",
                          left: "25.3rem",
                          top: "6.6rem",
                          position: "absolute",
                        }}
                      >
                        Copied.
                      </div>
                    ) : null}
                  </div>{" "}
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{ margin: "10px" }} onClick={this.selectModel}>
                Customize Invitecode
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <br />
              <div
                style={{
                  position: "absolute",
                  left: "1.2rem",
                  top: "15.2rem",
                  width: "200px",
                  height: "60px",
                }}
              >
                <EmailShareButton
                  subject={`please use the following code = { ${this.state.inviteCode} } for signing in `}
                  round={true}
                >
                  <EmailIcon size={32} round={true} />
                </EmailShareButton>
                <FacebookShareButton
                  quote={`please use the following code = { ${this.state.inviteCode} } for signing in `}
                  url={"www.facebook.com"}
                  round={true}
                >
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <TwitterShareButton
                  title={`please use the following code = { ${this.state.inviteCode} } for signing in `}
                  url={"www.twitter.com"}
                  round={true}
                >
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>

                <WhatsappShareButton
                  round={true}
                  url={`please use the following code = { ${this.state.inviteCode} } for signing in `}
                >
                  <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>

                {/* <FacebookShareCount url={this.state.inviteLink} /> */}
              </div>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.show2} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Share</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                value={this.state.inviteCode}
                onChange={this.onChange}
                id="w3review"
                name="inviteCode"
                style={{ width: "100%" }}
              ></input>

              {this.state.errors ? (
                <div
                  style={{ color: "#FE6E00" }}
                  className="alert alert-danger"
                >
                  {this.state.errors}
                </div>
              ) : (
                ""
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.editInviteCode}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.show3} onHide={this.handleClose2}>
            <Modal.Header closeButton>
              <Modal.Title>Success!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Alert variant="success">
                <p>
                  Your invite code has been successfully <b>updated</b>. :)
                </p>
                <hr />
              </Alert>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleClose2}>
                Okay
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            aria-labelledby="contained-modal-title-vcenter"
            show={this.state.showBadge}
            onHide={this.handleClose1}
            centered
          >
            <Modal.Header closeButton className="modal-headerr">
              <Modal.Title id="contained-modal-title-vcenter modal-title">
                Badges Info
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
              <Container>
                <Row>
                  <Col xs={3}>
                    <img
                      style={{
                        marginBottom: "0.5",
                      }}
                      height="70px"
                      width="70px"
                      src="assets/images/green_badge.png"
                      className="img-fluid d-block"
                      alt=""
                    />
                    <div style={{ marginLeft: "30px", color: "#55bb5f" }}>
                      <span>
                        <strong>{this.state.greenBadges}</strong>
                      </span>
                    </div>
                  </Col>
                  <Col xs={3}>
                    <img
                      style={{
                        marginBottom: "0.5",
                      }}
                      height="70px"
                      width="70px"
                      src="assets/images/brown_badge.png"
                      className="img-fluid d-block"
                      alt=""
                    />
                    <div style={{ marginLeft: "30px", color: "#5b3719" }}>
                      <span>
                        <strong>{this.state.brownBadges}</strong>
                      </span>
                    </div>
                  </Col>
                  <Col xs={3}>
                    <img
                      style={{
                        marginBottom: "0.5",
                      }}
                      height="70px"
                      width="70px"
                      src="assets/images/silver_badge.png"
                      className="img-fluid d-block"
                      alt=""
                    />
                    <div style={{ marginLeft: "30px", color: "#898684" }}>
                      <span>
                        <strong>{this.state.silverBadges}</strong>
                      </span>
                    </div>
                  </Col>
                  <Col xs={3}>
                    <img
                      style={{
                        marginBottom: "0.5",
                      }}
                      height="70px"
                      width="70px"
                      src="assets/images/golden_badge.png"
                      className="img-fluid d-block"
                      alt=""
                    />
                    <div style={{ marginLeft: "30px", color: "#ffcc5b" }}>
                      <span>
                        <strong>{this.state.goldBadges}</strong>
                      </span>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              {this.state.errors ? (
                <div
                  style={{ color: "#FE6E00" }}
                  className="alert alert-danger"
                >
                  {this.state.errors}
                </div>
              ) : (
                ""
              )}
              <Button onClick={this.handleClose1}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}
export default Dashboard;

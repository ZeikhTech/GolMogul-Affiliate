import React, { Component } from "react";
import $ from "jquery";
import apiHelper from "./Helper/ApiHelper";
import Pagination from "react-js-pagination";
import { Button, Modal, Alert, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import loaderImage from "./images/loader.svg";
import SearchField from "react-search-field";
var moment = require("moment");

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}
class AffiliatesListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showBadge: false,
      affiliatessListing: [],
      activePage: 1,
      type: "",
      reload: false,
      loaderActive: false,
      recordsCount: "",
      userToDelete: "",
      nameofDeletedUser: "",
      userId: "",
      greenBadges: 0,
      brownBadges: 0,
      silverBadges: 0,
      goldBadges: 0,
      search: "",
      errors: "",
    };
  }

  async componentDidMount() {
    // this.reloadPage(); // to reload once
    var x = this.props.match;
    let type = x.params.type;
    $("body").removeClass("transparent-header");
    $("html, body").animate({ scrollTop: 0 }, "slow");

    const user = await JSON.parse(localStorage.getItem("accessToken"));

    if (user.role == "Admin") {
      this.getDocuments(1, type);
    } else {
      this.props.history.push({
        pathname: "/login",
        state: {
          key: "value",
        },
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.type !== this.props.match.params.type) {
      this.setState({ type: nextProps.match.params.type });

      this.setState({
        loaderActive: true,
      });
      this.getDocuments(1, nextProps.match.params.type);
    } else {
      this.setState({ type: nextProps.match.params.type });
    }
  }

  handlePageChange(pageNumber) {
    var x = this.props.match;
    let type = x.params.type;
    this.setState({ activePage: pageNumber });
    this.getDocuments(pageNumber, type);
  }
  async getDocuments(pageNumber, type) {
    this.setState({
      loaderActive: true,
    });
    let data = {
      pageNumber: pageNumber,
      type: type ? type : this.state.type,
    };
    const token = localStorage.getItem("LoginSession");
    let result;
    this.setState({ loaderActive: true });
    if (type === "deleted") {
      this.setState({
        loaderActive: true,
      });
      result = await apiHelper(
        "post",
        "api/admin/deletedUsersListing",
        data,
        token
      );
      this.setState({
        loaderActive: false,
      });
    } else {
      this.setState({
        loaderActive: true,
      });
      result = await apiHelper(
        "post",
        "api/admin/usersAgainstRole",
        data,
        token
      );
      this.setState({
        loaderActive: false,
      });
    }

    if (result.status == 200) {
      if (result.users) {
        this.setState({
          affiliatessListing: result.users,
          loaderActive: false,
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
    this.setState({ loaderActive: true });
    let count = await apiHelper("post", `api/Admin/count`, data, "");
    this.setState({ loaderActive: false });
    if (count.status == 200) {
      this.setState({ recordsCount: count.recordsCount });
    }
  }
  handleClose1 = () => {
    this.setState({ show: false });
    this.setState({ showBadge: false });
  };
  async onTrash() {
    const token = localStorage.getItem("LoginSession");
    let data = {
      id: this.state.userToDelete,
    };
    this.setState({
      loaderActive: true,
    });
    let result = await apiHelper("post", "api/admin/onTrash", data, token);
    this.setState({
      loaderActive: false,
    });
    if (result.status == 200) {
      this.setState({ show: false });

      window.location.reload();
    }
  }
  handleOpen = (e, id, name) => {
    this.setState({ show: true, userToDelete: id, nameofDeletedUser: name });
  };
  onClose1 = () => {
    this.setState({ show: false });
    this.onTrash();
  };
  showBadge = async (e, userId) => {
    e.preventDefault();
    const token = localStorage.getItem("LoginSession");

    this.setState({ showBadge: true });
    var data = { id: userId };
    this.setState({ loaderActive: true });
    var greenBadgeApiRes = await apiHelper(
      "post",
      "api/admin/greenBadgeFollowers",
      data,
      token
    );
    if (greenBadgeApiRes) {
      if (
        greenBadgeApiRes.status === 401 ||
        greenBadgeApiRes.status === 403 ||
        greenBadgeApiRes.status === 400
      ) {
        this.setState({ errors: greenBadgeApiRes.message });
        return;
      } else if (greenBadgeApiRes.status == 200) {
        if (greenBadgeApiRes.greenBadgesCount) {
          this.setState({ greenBadges: greenBadgeApiRes.greenBadgesCount });
        }
      }
    }

    ///////////////////Brown//////////////////
    var brownBadgeApiRes = await apiHelper(
      "post",
      "api/admin/brownBadgeFollowers",
      data,
      token
    );
    if (brownBadgeApiRes) {
      if (
        brownBadgeApiRes.status === 401 ||
        brownBadgeApiRes.status === 403 ||
        brownBadgeApiRes.status === 400
      ) {
        this.setState({ errors: brownBadgeApiRes.message });
        return;
      } else if (brownBadgeApiRes.status == 200) {
        if (brownBadgeApiRes.brownBadgesCount) {
          this.setState({ brownBadges: brownBadgeApiRes.brownBadgesCount });
        }
      }
    }
    //////////////////////Silver//////////////////////
    var silverBadgeApiRes = await apiHelper(
      "post",
      "api/admin/silverBadgeFollowers",
      data,
      token
    );
    if (silverBadgeApiRes) {
      if (
        silverBadgeApiRes.status === 401 ||
        silverBadgeApiRes.status === 403 ||
        silverBadgeApiRes.status === 400
      ) {
        this.setState({ errors: silverBadgeApiRes.message });
        return;
      } else if (silverBadgeApiRes.status == 200) {
        if (silverBadgeApiRes.silverBadgesCount) {
          this.setState({ silverBadges: silverBadgeApiRes.silverBadgesCount });
        }
      }
    }

    var goldBadgeApiRes = await apiHelper(
      "post",
      "api/admin/goldBadgeFollowers",
      data,
      token
    );
    if (goldBadgeApiRes) {
      if (
        goldBadgeApiRes.status === 401 ||
        goldBadgeApiRes.status === 403 ||
        goldBadgeApiRes.status === 400
      ) {
        this.setState({ errors: goldBadgeApiRes.message });
        return;
      } else if (goldBadgeApiRes.status == 200) {
        if (goldBadgeApiRes.goldBadgesCount) {
          this.setState({ goldBadges: goldBadgeApiRes.goldBadgesCount });
        }
      }
    }
    this.setState({ loaderActive: false });
  };
  async onRestore(e, userToRecover) {
    e.preventDefault();
    const token = localStorage.getItem("LoginSession");
    let data = {
      id: userToRecover,
    };
    let result = await apiHelper("post", "api/admin/onRevover", data, token);
    if (result.status == 200) {
      this.setState({ show: false });

      window.location.reload();
    }
  }
  reloadPage() {
    // The last "domLoading" Time //
    var currentDocumentTimestamp = new Date(
      performance.timing.domLoading
    ).getTime();
    // Current Time //
    var now = Date.now();
    // Ten Seconds //
    var tenSec = 10 * 1000;
    // Plus Ten Seconds //
    var plusTenSec = currentDocumentTimestamp + tenSec;
    if (now > plusTenSec) {
      window.location.reload();
    } else {
    }
  }
  onChange = (e, value) => {
    this.setState({ search: value });
  };
  render() {
    const settings = {
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
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
        <div
          id="content-wrapper"
          className="d-flex align-items-center justify-content-centers"
        >
          <div className="container-fluid">
            <h4 className="main_title mb-4">All Users</h4>
            <div className="admin_all_user">
              <div className="row no-gutters">
                <div className="col-xl-2 col-lg-3">
                  <a href="#/admin/register">
                    <button className="theme_btn text-center">
                      Add New User
                    </button>
                  </a>
                  <hr />
                  <div
                    className="nav flex-column nav-pills custom_nav"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <a
                      href="#/admin/Listing/all"
                      className="nav-link active"
                      id="v-pills-home-tab"
                      // data-toggle="pill"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                    >
                      {" "}
                      <i className="fa fa-users mr_20"></i> All
                    </a>
                    <a
                      className="nav-link"
                      id="v-pills-profile-tab"
                      // data-toggle="pill"

                      href="#/admin/Listing/Admin"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="false"
                    >
                      <svg
                        aria-hidden="true"
                        className="mr_20"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="users-cog"
                        className="svg-inline--fa fa-users-cog fa-w-20"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path
                          fill="currentColor"
                          d="M610.5 341.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 368.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm224 32c1.9 0 3.7-.5 5.6-.6 8.3-21.7 20.5-42.1 36.3-59.2 7.4-8 17.9-12.6 28.9-12.6 6.9 0 13.7 1.8 19.6 5.3l7.9 4.6c.8-.5 1.6-.9 2.4-1.4 7-14.6 11.2-30.8 11.2-48 0-61.9-50.1-112-112-112S208 82.1 208 144c0 61.9 50.1 112 112 112zm105.2 194.5c-2.3-1.2-4.6-2.6-6.8-3.9-8.2 4.8-15.3 9.8-27.5 9.8-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-10.7-34.5 24.9-49.7 25.8-50.3-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-3.8-2.2-7-5-9.8-8.1-3.3.2-6.5.6-9.8.6-24.6 0-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h255.4c-3.7-6-6.2-12.8-6.2-20.3v-9.2zM173.1 274.6C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
                        ></path>
                      </svg>
                      Admins
                    </a>
                    <a
                      className="nav-link"
                      id="v-pills-messages-tab"
                      // data-toggle="pill"

                      href="#/admin/Listing/Affiliate"
                      role="tab"
                      aria-selected="false"
                    >
                      <i className="fa fa-user mr_20"></i> Affiliates
                    </a>
                    <a
                      className="nav-link"
                      id="v-pills-messages-tab"
                      // data-toggle="pill"

                      href="#/admin/Listing/deleted"
                      role="tab"
                      aria-selected="false"
                    >
                      <i className="fa fa-user mr_20"></i> Deleted
                    </a>
                  </div>
                </div>
                <div className="col-xl-10 col-lg-9 border_lft">
                  <Modal show={this.state.show} onHide={this.handleClose1}>
                    <Modal.Header closeButton>
                      {/* <Modal.Title>Success!!</Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body>
                      <Alert variant="danger">
                        <p>
                          Are you sure you want to delete
                          <b>{this.state.nameofDeletedUser}</b>?
                        </p>
                        <hr />
                      </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={this.onClose1}>
                        Okay
                      </Button>
                      <Button variant="primary" onClick={this.handleClose1}>
                        cancel
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
                            <div
                              style={{ marginLeft: "30px", color: "#55bb5f" }}
                            >
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
                            <div
                              style={{ marginLeft: "30px", color: "#5b3719" }}
                            >
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
                            <div
                              style={{ marginLeft: "30px", color: "#898684" }}
                            >
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
                            <div
                              style={{ marginLeft: "30px", color: "#ffcc5b" }}
                            >
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

                  <div className="tab-content" id="v-pills-tabContent">
                    <div
                      className="tab-pane fade active show"
                      id="v-pills-home"
                      role="tabpanel"
                      aria-labelledby="v-pills-home-tab"
                    >
                      {" "}
                      {this.state.affiliatessListing.length > 0
                        ? this.state.affiliatessListing.map((data, key) => {
                            return (
                              <div className="card">
                                <div className="row align-items-center no-gutters">
                                  <div className="col-10">
                                    <div className="row align-items-center no-gutters">
                                      <div className="col-lg-4 col-md-4 col-sm-6">
                                        <div className="add_user_img d-flex ">
                                          {!data.avatar ? (
                                            <img
                                              height="50px"
                                              width="50px"
                                              className="rounded-circle"
                                              src="assets/images/profile_img.png"
                                              alt=""
                                            />
                                          ) : (
                                            <img
                                              height="50px"
                                              width="50px"
                                              className="rounded-circle"
                                              src={window.APIURL + data.avatar}
                                              alt=""
                                            />
                                          )}
                                          {/* <img
                                        src="assets/images/profile_img.png"
                                        className="img-fluid"
                                        alt=""
                                      /> */}
                                          <h5 className=" ">{data.name}</h5>
                                        </div>
                                      </div>
                                      <div className="col-lg-5 col-md-5 col-sm-6 col-6">
                                        <div className="email_content">
                                          <h5>Email</h5>
                                          <p>{data.email.address}</p>
                                        </div>
                                      </div>
                                      <div className="col-lg-2 col-md-2 col-sm-2 col-6">
                                        <div className="admin_content">
                                          <h5>User Type</h5>
                                          <p>{data.role}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {this.state.type == "deleted" ? (
                                    <div className="col-lg-2 col-md-2 col-sm-6">
                                      <div className="edit_icon">
                                        <ul>
                                          <li>
                                            <button
                                              className="theme_btn text-center"
                                              onClick={(e) => {
                                                this.onRestore(e, data._id);
                                              }}
                                            >
                                              Restore
                                            </button>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="col-lg-2 col-md-2 col-sm-6">
                                      <div className="edit_icon">
                                        <ul>
                                          <li>
                                            <a
                                              onClick={(e) => {
                                                this.showBadge(e, data._id);
                                              }}
                                              title=""
                                            >
                                              <img
                                                style={{
                                                  marginBottom: "0.5",
                                                }}
                                                height="32px"
                                                width="32px"
                                                src="assets/images/badge.png"
                                                className="img-fluid"
                                                alt=""
                                              />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href={`#/admin/Affiliat/${data._id}/dashboard`}
                                              title=""
                                            >
                                              <img
                                                style={{
                                                  marginBottom: "0.5",
                                                }}
                                                height="32px"
                                                width="32px"
                                                src="assets/images/eye.png"
                                                className="img-fluid"
                                                alt=""
                                              />
                                            </a>
                                          </li>

                                          <li>
                                            <a
                                              href={`#/admin/EditProfile/${data._id}`}
                                              title=""
                                            >
                                              <img
                                                src="assets/images/pen.png"
                                                className="img-fluid"
                                                alt=""
                                              />
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              onClick={(e) => {
                                                this.handleOpen(
                                                  e,
                                                  data._id,
                                                  data.name
                                                );
                                              }}
                                              title=""
                                            >
                                              <img
                                                src="assets/images/trash.png"
                                                className="img-fluid"
                                                alt=""
                                              />
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        : ""}
                    </div>
                    <section class="gallery-section gallery-page-section">
                      <div class="auto-container">
                        <div class="mixitup-gallery">
                          <div class="styled-pagination text-center">
                            <div class="clearfix">
                              {" "}
                              {this.state.recordsCount > 5 ? (
                                <Pagination
                                  itemClass="page-item"
                                  linkClass="page-link"
                                  activePage={this.state.activePage}
                                  itemsCountPerPage={5}
                                  totalItemsCount={this.state.recordsCount}
                                  onChange={(e) => this.handlePageChange(e)}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>{" "}
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AffiliatesListing;

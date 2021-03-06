import React, { Component } from "react";
import { Button, Modal, Alert, Row, Col, Container } from "react-bootstrap";
import loaderImage from "../../Admin/images/loader.svg";
import { Link, Redirect, withRouter } from "react-router-dom";
import apiHelper from "../Helper/ApiHelper";
class Navbar extends Component {
  state = {
    id: "",
    avatar: "",
    greenBadges: 0,
    brownBadges: 0,
    silverBadges: 0,
    goldBadges: 0,
    loaderActive: false,
    showBadge: false,
  };

  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem("accessToken"));

    var token = localStorage.getItem("LoginSession");
    let userId = JSON.parse(localStorage.getItem("userId"));
    this.setState({ id: userId });

    if (user) {
      let userId = JSON.parse(localStorage.getItem("userId"));

      let result = await apiHelper(
        "get",
        `api/affiliate/Profile/${userId}`,
        "",
        token
      );
      if (result.user.avatar) {
        this.setState({
          avatar: result.user.avatar,
        });
      }
      if (result.status == 200) {
        let avatar = JSON.parse(result.user.avatar);

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
      }
    } else {
      this.props.history.push({
        pathname: "/",
        state: {
          key: "value",
        },
      });
    }
  }
  showBadge = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("LoginSession");

    var data = { id: this.state.id };
    this.setState({ loaderActive: true, showBadge: true });
    var greenBadgeApiRes = await apiHelper(
      "post",
      "api/admin/greenBadgeFollowers",
      data,
      token
    );
    this.setState({ loaderActive: false });

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
    this.setState({ loaderActive: true });

    var brownBadgeApiRes = await apiHelper(
      "post",
      "api/admin/brownBadgeFollowers",
      data,
      token
    );
    this.setState({ loaderActive: false });

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
    this.setState({ loaderActive: true });

    var silverBadgeApiRes = await apiHelper(
      "post",
      "api/admin/silverBadgeFollowers",
      data,
      token
    );
    this.setState({ loaderActive: false });

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
    // this.setState({ loaderActive: true });

    var goldBadgeApiRes = await apiHelper(
      "post",
      "api/admin/goldBadgeFollowers",
      data,
      token
    );
    // this.setState({ loaderActive: false });

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
    // this.setState({ loaderActive: false });
  };
  handleClose1 = () => {
    this.setState({ showBadge: false });
  };
  onLogOut = (e) => {
    localStorage.clear();
    this.props.history.push({
      pathname: "/login",
      state: {
        key: "value",
      },
    });
  };
  render() {
    return (
      <div>
        {this.state.loaderActive ? (
          <div className="inlineLoaderGif">
            <img src={loaderImage} alt="broken" />
          </div>
        ) : (
          ""
        )}{" "}
        <nav id="sidemenu">
          <div className="main-menu">
            <ul className="main-menu">
              <li>
                <a
                  href="javascript:void(0)"
                  className={
                    this.state.slug === `/affiliate/Dashboard` ? "active" : ""
                  }
                  href={`#/affiliate/Dashboard/${this.state.id}`}
                >
                  .
                  <span className="fa">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="chart-pie"
                      className="svg-inline--fa fa-chart-pie fa-w-17"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 544 512"
                    >
                      <path
                        fill="currentColor"
                        d="M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z"
                      ></path>
                    </svg>
                  </span>
                  View Statistics
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className={
                    this.state.slug === "/affiliate/AffiliateHistory"
                      ? "active"
                      : ""
                  }
                  href={`#/affiliate/AffiliateHistory/${this.state.id}`}
                >
                  <span className="fa">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="users"
                      className="svg-inline--fa fa-users fa-w-20"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="currentColor"
                        d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
                      ></path>
                    </svg>
                  </span>
                  List of all Affiliates
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className={this.state.slug === "" ? "active" : ""}
                  onClick={(e) => this.showBadge(e)}
                >
                  <span className="fa">
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
                  </span>
                  List of all Affiliates
                </a>
              </li>
              <li className="bottom_list">
                <a
                  href="javascript:void(0)"
                  className={
                    this.state.slug === "/affiliate/Profile" ? "active" : ""
                  }
                  href={`#/affiliate/EditProfile/${this.state.id}`}
                >
                  <span className="fa">
                    {this.state.avatar == "" ? (
                      <img
                        src="assets/images/profile_img.png"
                        height="50px"
                        width="50px"
                        className="rounded-circle"
                        alt=""
                      />
                    ) : (
                      <img
                        src={window.APIURL + this.state.avatar}
                        height="50px"
                        width="50px"
                        className="rounded-circle"
                        alt=""
                      />
                    )}
                    {/* <img
                      src="assets/images/profile_img_li.png"
                      className="img-fluid"
                      alt=""
                    /> */}
                  </span>{" "}
                  Eustolia Ashburn
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" onClick={this.onLogOut}>
                  <span className="fa">
                    <img
                      src="assets/images/sign-out-alt.png"
                      className="img-fluid"
                      alt=""
                    />
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="sign-out-alt"
                      className="svg-inline--fa fa-sign-out-alt fa-w-16"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
                      ></path>
                    </svg>
                  </span>
                  Logout
                </a>
              </li>
              <li>
                {/*  <a href="javascript:void(0)" onClick={this.onLogOut}>
                  <span className="fa">
                    <img
                      src="assets/images/sign-out-alt.png"
                      className="img-fluid"
                      alt=""
                    />
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="sign-out-alt"
                      className="svg-inline--fa fa-sign-out-alt fa-w-16"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
                      ></path>
                    </svg>
                  </span>
                  Logout
                </a>*/}
              </li>
            </ul>
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
        </nav>
      </div>
    );
  }
}
export default withRouter(Navbar);

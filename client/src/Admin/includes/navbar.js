import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import apiHelper from "../Helper/ApiHelper";
class Navbar extends Component {
  state = {
    userId: "",
    avatar: "",
  };
  async componentDidMount() {
    const token = localStorage.getItem("LoginSession");

    let x = this.props.history;
    let id = x.location.id;
    // let token = x.location.token;
    if (id) {
      this.setState({ userId: id });
    } else {
      id = JSON.parse(localStorage.getItem("userId"));
      this.setState({ userId: id });
    }
    var user = JSON.parse(localStorage.getItem("accessToken"));

    // if (token == null) {
    //   console.log("Token nai ha ");
    //   // window.location.reload();
    // }
    if (user) {
      this.setState({ loaderActive: true });
      let result = await apiHelper(
        "get",
        `api/affiliate/Profile/${id}`,
        "",
        token
      );

      this.setState({ loaderActive: false });
      if (result.user.avatar) {
        this.setState({
          avatar: result.user.avatar,
          loaderActive: false,
        });
      }

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
  }
  componentWillReceiveProps(props) {
    this.setState({
      slug: props.location.pathname,
    });
  }
  onLogOut = (e) => {
    localStorage.clear();

    this.setState({ logout: true });
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
        <nav id="sidemenu">
          <div className="main-menu">
            <ul className="main-menu">
              <li className="black-button">
                <a
                  href="javascript:void(0)"
                  className={
                    this.state.slug === "/admin/register" ? "active" : ""
                  }
                  href="#/admin/register"
                >
                  <span className="fa">
                    <svg
                      viewBox="-42 0 512 512.001"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m210.351562 246.632812c33.882813 0 63.21875-12.152343 87.195313-36.128906 23.96875-23.972656 36.125-53.304687 36.125-87.191406 0-33.875-12.152344-63.210938-36.128906-87.191406-23.976563-23.96875-53.3125-36.121094-87.191407-36.121094-33.886718 0-63.21875 12.152344-87.191406 36.125s-36.128906 53.308594-36.128906 87.1875c0 33.886719 12.15625 63.222656 36.128906 87.195312 23.980469 23.96875 53.316406 36.125 87.191406 36.125zm-65.972656-189.292968c18.394532-18.394532 39.972656-27.335938 65.972656-27.335938 25.996094 0 47.578126 8.941406 65.976563 27.335938 18.394531 18.398437 27.339844 39.980468 27.339844 65.972656 0 26-8.945313 47.578125-27.339844 65.976562-18.398437 18.398438-39.980469 27.339844-65.976563 27.339844-25.992187 0-47.570312-8.945312-65.972656-27.339844-18.398437-18.394531-27.34375-39.976562-27.34375-65.976562 0-25.992188 8.945313-47.574219 27.34375-65.972656zm0 0" />
                      <path d="m426.128906 393.703125c-.691406-9.976563-2.089844-20.859375-4.148437-32.351563-2.078125-11.578124-4.753907-22.523437-7.957031-32.527343-3.3125-10.339844-7.808594-20.550781-13.375-30.335938-5.769532-10.15625-12.550782-19-20.160157-26.277343-7.957031-7.613282-17.699219-13.734376-28.964843-18.199219-11.226563-4.441407-23.667969-6.691407-36.976563-6.691407-5.226563 0-10.28125 2.144532-20.042969 8.5-6.007812 3.917969-13.035156 8.449219-20.878906 13.460938-6.707031 4.273438-15.792969 8.277344-27.015625 11.902344-10.949219 3.542968-22.066406 5.339844-33.042969 5.339844-10.96875 0-22.085937-1.796876-33.042968-5.339844-11.210938-3.621094-20.300782-7.625-26.996094-11.898438-7.769532-4.964844-14.800782-9.496094-20.898438-13.46875-9.753906-6.355468-14.808594-8.5-20.035156-8.5-13.3125 0-25.75 2.253906-36.972656 6.699219-11.257813 4.457031-21.003906 10.578125-28.96875 18.199219-7.609375 7.28125-14.390625 16.121094-20.15625 26.273437-5.558594 9.785157-10.058594 19.992188-13.371094 30.339844-3.199219 10.003906-5.875 20.945313-7.953125 32.523437-2.0625 11.476563-3.457031 22.363282-4.148437 32.363282-.679688 9.777344-1.023438 19.953125-1.023438 30.234375 0 26.726562 8.496094 48.363281 25.25 64.320312 16.546875 15.746094 38.4375 23.730469 65.066406 23.730469h246.53125c26.621094 0 48.511719-7.984375 65.0625-23.730469 16.757813-15.945312 25.253906-37.589843 25.253906-64.324219-.003906-10.316406-.351562-20.492187-1.035156-30.242187zm-44.90625 72.828125c-10.933594 10.40625-25.449218 15.464844-44.378906 15.464844h-246.527344c-18.933594 0-33.449218-5.058594-44.378906-15.460938-10.722656-10.207031-15.933594-24.140625-15.933594-42.585937 0-9.59375.316406-19.066407.949219-28.160157.617187-8.921874 1.878906-18.722656 3.75-29.136718 1.847656-10.285156 4.199219-19.9375 6.996094-28.675782 2.683593-8.378906 6.34375-16.675781 10.882812-24.667968 4.332031-7.617188 9.316407-14.152344 14.816407-19.417969 5.144531-4.925781 11.628906-8.957031 19.269531-11.980469 7.066406-2.796875 15.007812-4.328125 23.628906-4.558594 1.050781.558594 2.921875 1.625 5.953125 3.601563 6.167969 4.019531 13.277344 8.605469 21.136719 13.625 8.859375 5.648437 20.273437 10.75 33.910156 15.152344 13.941406 4.507812 28.160156 6.796875 42.273437 6.796875 14.113282 0 28.335938-2.289063 42.269532-6.792969 13.648437-4.410156 25.058594-9.507813 33.929687-15.164063 8.042969-5.140624 14.953125-9.59375 21.121094-13.617187 3.03125-1.972656 4.902344-3.042969 5.953125-3.601563 8.625.230469 16.566406 1.761719 23.636719 4.558594 7.636719 3.023438 14.121093 7.058594 19.265625 11.980469 5.5 5.261719 10.484375 11.796875 14.816406 19.421875 4.542969 7.988281 8.207031 16.289062 10.886719 24.660156 2.800781 8.75 5.15625 18.398438 7 28.675782 1.867187 10.433593 3.132812 20.238281 3.75 29.144531v.007812c.636719 9.058594.957031 18.527344.960937 28.148438-.003906 18.449219-5.214844 32.378906-15.9375 42.582031zm0 0" />
                    </svg>
                  </span>
                  Register New User
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className={
                    this.state.slug === "/admin/Statistics" ? "active" : ""
                  }
                  href="#/admin/Statistics"
                >
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
                    this.state.slug === "/admin/Listing/all" ? "active" : ""
                  }
                  href="#/admin/Listing/all"
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
              <li className="bottom_list">
                <a
                  href="javascript:void(0)"
                  className={
                    this.state.slug === "/admin/profile" ? "active" : ""
                  }
                  href={`#/admin/EditProfile/${this.state.userId}`}
                >
                  <span className="fa">
                    {this.state.avatar == "" ? (
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
                        src={window.APIURL + this.state.avatar}
                        alt=""
                      />
                    )}
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
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default withRouter(Navbar);

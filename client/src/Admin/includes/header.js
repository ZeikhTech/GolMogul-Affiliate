import React, { Component } from "react";
class Header extends Component {
  state = {};
  render() {
    return (
      <div>
        <header id="header">
          <div className="menu-button  pt-4">
            <div id="nav-icon3">
              {" "}
              <span className="icon-menu">
                <a href="#/admin/Statistics">
                  {" "}
                  <img src="assets/images/Menu_Icon.png" alt="" />
                </a>
              </span>{" "}
            </div>
          </div>
          <div id="top-bar">
            {" "}
            <img
              src="assets/images/top_logo.png"
              className="img-fluid text-center"
              alt=""
            />{" "}
          </div>
        </header>
      </div>
    );
  }
}
export default Header;

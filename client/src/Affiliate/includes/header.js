import React, { Component } from "react";
class Header extends Component {
  state = {};
  render() {
    return (
      <div>
        <header id="header">
          <div class="menu-button pt-4">
            <div id="nav-icon3">
              <span class="icon-menu">
                <img src="assets/images/Menu_Icon.png" alt="" />
              </span>
            </div>
          </div>
          <div id="top-bar">
            <img
              src="assets/images/top_logo.png"
              class="img-fluid text-center"
              alt=""
            />
          </div>
        </header>
      </div>
    );
  }
}
export default Header;

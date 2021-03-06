(this.webpackJsonpclient = this.webpackJsonpclient || []).push([
  [0],
  {
    187: function (e, t, s) {
      "use strict";
      s.r(t);
      var a = s(1),
        r = s.n(a),
        n = s(20),
        c = s.n(n),
        i = s(5),
        l = s(6),
        o = s(8),
        d = s(7),
        h = s(28),
        j = s(18),
        u = s(3),
        m = s.n(u),
        b = s(10),
        p = s(14),
        x = s(11),
        f = s.n(x),
        O = s(21),
        v = s.n(O);
      function g(e, t, s, a) {
        return new Promise(
          "post" == e
            ? function (r, n) {
                fetch(window.APIURL + t, {
                  method: e,
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: a,
                  },
                  body: JSON.stringify(s),
                })
                  .then(function (e) {
                    return e.json();
                  })
                  .then(
                    function (e) {
                      r(e);
                    },
                    function (e) {
                      r(!1);
                    }
                  );
              }
            : function (e, s) {
                fetch(window.APIURL + t, {
                  method: "get",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: a,
                  },
                })
                  .then(function (e) {
                    return e.json();
                  })
                  .then(
                    function (t) {
                      e(t);
                    },
                    function (t) {
                      e(!1);
                    }
                  );
              }
        );
      }
      var w = s(0),
        N = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s() {
            var e;
            Object(i.a)(this, s);
            for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
              r[n] = arguments[n];
            return (
              ((e = t.call.apply(t, [this].concat(r))).state = {
                userId: "",
                avatar: "",
              }),
              (e.onLogOut = function (t) {
                localStorage.clear(),
                  e.setState({ logout: !0 }),
                  e.props.history.push({
                    pathname: "/login",
                    state: { key: "value" },
                  });
              }),
              e
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "componentDidMount",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e() {
                      var t, s, a, r, n;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  ((t = this.props.history),
                                  (s = t.location.id) ||
                                    (s = JSON.parse(
                                      localStorage.getItem("userId")
                                    )),
                                  this.setState({ userId: s }),
                                  (a = localStorage.getItem("accessToken")),
                                  (r = localStorage.getItem("LoginSession")),
                                  !a)
                                ) {
                                  e.next = 13;
                                  break;
                                }
                                return (
                                  this.setState({ loaderActive: !0 }),
                                  (e.next = 9),
                                  g(
                                    "get",
                                    "api/affiliate/Profile/".concat(s),
                                    "",
                                    r
                                  )
                                );
                              case 9:
                                (n = e.sent),
                                  this.setState({ loaderActive: !1 }),
                                  n.user.avatar &&
                                    this.setState({
                                      avatar: n.user.avatar,
                                      loaderActive: !1,
                                    }),
                                  200 == n.status &&
                                    (n.user
                                      ? this.setState({ user: n.user })
                                      : this.props.history.push({
                                          pathname: "/",
                                          state: { key: "value" },
                                        }));
                              case 13:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "componentWillReceiveProps",
                value: function (e) {
                  this.setState({ slug: e.location.pathname });
                },
              },
              {
                key: "render",
                value: function () {
                  var e, t, s, a;
                  return Object(w.jsx)("div", {
                    children: Object(w.jsx)("nav", {
                      id: "sidemenu",
                      children: Object(w.jsx)("div", {
                        className: "main-menu",
                        children: Object(w.jsxs)("ul", {
                          className: "main-menu",
                          children: [
                            Object(w.jsx)("li", {
                              className: "black-button",
                              children: Object(w.jsxs)(
                                "a",
                                ((e = {
                                  href: "javascript:void(0)",
                                  className:
                                    "/admin/register" === this.state.slug
                                      ? "active"
                                      : "",
                                }),
                                Object(p.a)(e, "href", "#/admin/register"),
                                Object(p.a)(e, "children", [
                                  Object(w.jsx)("span", {
                                    className: "fa",
                                    children: Object(w.jsxs)("svg", {
                                      viewBox: "-42 0 512 512.001",
                                      xmlns: "http://www.w3.org/2000/svg",
                                      children: [
                                        Object(w.jsx)("path", {
                                          d: "m210.351562 246.632812c33.882813 0 63.21875-12.152343 87.195313-36.128906 23.96875-23.972656 36.125-53.304687 36.125-87.191406 0-33.875-12.152344-63.210938-36.128906-87.191406-23.976563-23.96875-53.3125-36.121094-87.191407-36.121094-33.886718 0-63.21875 12.152344-87.191406 36.125s-36.128906 53.308594-36.128906 87.1875c0 33.886719 12.15625 63.222656 36.128906 87.195312 23.980469 23.96875 53.316406 36.125 87.191406 36.125zm-65.972656-189.292968c18.394532-18.394532 39.972656-27.335938 65.972656-27.335938 25.996094 0 47.578126 8.941406 65.976563 27.335938 18.394531 18.398437 27.339844 39.980468 27.339844 65.972656 0 26-8.945313 47.578125-27.339844 65.976562-18.398437 18.398438-39.980469 27.339844-65.976563 27.339844-25.992187 0-47.570312-8.945312-65.972656-27.339844-18.398437-18.394531-27.34375-39.976562-27.34375-65.976562 0-25.992188 8.945313-47.574219 27.34375-65.972656zm0 0",
                                        }),
                                        Object(w.jsx)("path", {
                                          d: "m426.128906 393.703125c-.691406-9.976563-2.089844-20.859375-4.148437-32.351563-2.078125-11.578124-4.753907-22.523437-7.957031-32.527343-3.3125-10.339844-7.808594-20.550781-13.375-30.335938-5.769532-10.15625-12.550782-19-20.160157-26.277343-7.957031-7.613282-17.699219-13.734376-28.964843-18.199219-11.226563-4.441407-23.667969-6.691407-36.976563-6.691407-5.226563 0-10.28125 2.144532-20.042969 8.5-6.007812 3.917969-13.035156 8.449219-20.878906 13.460938-6.707031 4.273438-15.792969 8.277344-27.015625 11.902344-10.949219 3.542968-22.066406 5.339844-33.042969 5.339844-10.96875 0-22.085937-1.796876-33.042968-5.339844-11.210938-3.621094-20.300782-7.625-26.996094-11.898438-7.769532-4.964844-14.800782-9.496094-20.898438-13.46875-9.753906-6.355468-14.808594-8.5-20.035156-8.5-13.3125 0-25.75 2.253906-36.972656 6.699219-11.257813 4.457031-21.003906 10.578125-28.96875 18.199219-7.609375 7.28125-14.390625 16.121094-20.15625 26.273437-5.558594 9.785157-10.058594 19.992188-13.371094 30.339844-3.199219 10.003906-5.875 20.945313-7.953125 32.523437-2.0625 11.476563-3.457031 22.363282-4.148437 32.363282-.679688 9.777344-1.023438 19.953125-1.023438 30.234375 0 26.726562 8.496094 48.363281 25.25 64.320312 16.546875 15.746094 38.4375 23.730469 65.066406 23.730469h246.53125c26.621094 0 48.511719-7.984375 65.0625-23.730469 16.757813-15.945312 25.253906-37.589843 25.253906-64.324219-.003906-10.316406-.351562-20.492187-1.035156-30.242187zm-44.90625 72.828125c-10.933594 10.40625-25.449218 15.464844-44.378906 15.464844h-246.527344c-18.933594 0-33.449218-5.058594-44.378906-15.460938-10.722656-10.207031-15.933594-24.140625-15.933594-42.585937 0-9.59375.316406-19.066407.949219-28.160157.617187-8.921874 1.878906-18.722656 3.75-29.136718 1.847656-10.285156 4.199219-19.9375 6.996094-28.675782 2.683593-8.378906 6.34375-16.675781 10.882812-24.667968 4.332031-7.617188 9.316407-14.152344 14.816407-19.417969 5.144531-4.925781 11.628906-8.957031 19.269531-11.980469 7.066406-2.796875 15.007812-4.328125 23.628906-4.558594 1.050781.558594 2.921875 1.625 5.953125 3.601563 6.167969 4.019531 13.277344 8.605469 21.136719 13.625 8.859375 5.648437 20.273437 10.75 33.910156 15.152344 13.941406 4.507812 28.160156 6.796875 42.273437 6.796875 14.113282 0 28.335938-2.289063 42.269532-6.792969 13.648437-4.410156 25.058594-9.507813 33.929687-15.164063 8.042969-5.140624 14.953125-9.59375 21.121094-13.617187 3.03125-1.972656 4.902344-3.042969 5.953125-3.601563 8.625.230469 16.566406 1.761719 23.636719 4.558594 7.636719 3.023438 14.121093 7.058594 19.265625 11.980469 5.5 5.261719 10.484375 11.796875 14.816406 19.421875 4.542969 7.988281 8.207031 16.289062 10.886719 24.660156 2.800781 8.75 5.15625 18.398438 7 28.675782 1.867187 10.433593 3.132812 20.238281 3.75 29.144531v.007812c.636719 9.058594.957031 18.527344.960937 28.148438-.003906 18.449219-5.214844 32.378906-15.9375 42.582031zm0 0",
                                        }),
                                      ],
                                    }),
                                  }),
                                  "Register New User",
                                ]),
                                e)
                              ),
                            }),
                            Object(w.jsx)("li", {
                              children: Object(w.jsxs)(
                                "a",
                                ((t = {
                                  href: "javascript:void(0)",
                                  className:
                                    "/admin/Statistics" === this.state.slug
                                      ? "active"
                                      : "",
                                }),
                                Object(p.a)(t, "href", "#/admin/Statistics"),
                                Object(p.a)(t, "children", [
                                  Object(w.jsx)("span", {
                                    className: "fa",
                                    children: Object(w.jsx)("svg", {
                                      "aria-hidden": "true",
                                      focusable: "false",
                                      "data-prefix": "fas",
                                      "data-icon": "chart-pie",
                                      className:
                                        "svg-inline--fa fa-chart-pie fa-w-17",
                                      role: "img",
                                      xmlns: "http://www.w3.org/2000/svg",
                                      viewBox: "0 0 544 512",
                                      children: Object(w.jsx)("path", {
                                        fill: "currentColor",
                                        d: "M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z",
                                      }),
                                    }),
                                  }),
                                  "View Statistics",
                                ]),
                                t)
                              ),
                            }),
                            Object(w.jsx)("li", {
                              children: Object(w.jsxs)(
                                "a",
                                ((s = {
                                  href: "javascript:void(0)",
                                  className:
                                    "/admin/Listing/all" === this.state.slug
                                      ? "active"
                                      : "",
                                }),
                                Object(p.a)(s, "href", "#/admin/Listing/all"),
                                Object(p.a)(s, "children", [
                                  Object(w.jsx)("span", {
                                    className: "fa",
                                    children: Object(w.jsx)("svg", {
                                      "aria-hidden": "true",
                                      focusable: "false",
                                      "data-prefix": "fas",
                                      "data-icon": "users",
                                      className:
                                        "svg-inline--fa fa-users fa-w-20",
                                      role: "img",
                                      xmlns: "http://www.w3.org/2000/svg",
                                      viewBox: "0 0 640 512",
                                      children: Object(w.jsx)("path", {
                                        fill: "currentColor",
                                        d: "M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z",
                                      }),
                                    }),
                                  }),
                                  "List of all Affiliates",
                                ]),
                                s)
                              ),
                            }),
                            Object(w.jsx)("li", {
                              className: "bottom_list",
                              children: Object(w.jsxs)(
                                "a",
                                ((a = {
                                  href: "javascript:void(0)",
                                  className:
                                    "/admin/profile" === this.state.slug
                                      ? "active"
                                      : "",
                                }),
                                Object(p.a)(
                                  a,
                                  "href",
                                  "#/admin/EditProfile/".concat(
                                    this.state.userId
                                  )
                                ),
                                Object(p.a)(a, "children", [
                                  Object(w.jsx)("span", {
                                    className: "fa",
                                    children:
                                      "" == this.state.avatar
                                        ? Object(w.jsx)("img", {
                                            height: "50px",
                                            width: "50px",
                                            className: "rounded-circle",
                                            src: "assets/images/profile_img.png",
                                            alt: "",
                                          })
                                        : Object(w.jsx)("img", {
                                            height: "50px",
                                            width: "50px",
                                            className: "rounded-circle",
                                            src:
                                              window.APIURL + this.state.avatar,
                                            alt: "",
                                          }),
                                  }),
                                  " ",
                                  "Eustolia Ashburn",
                                ]),
                                a)
                              ),
                            }),
                            Object(w.jsx)("li", {
                              children: Object(w.jsxs)("a", {
                                href: "javascript:void(0)",
                                onClick: this.onLogOut,
                                children: [
                                  Object(w.jsxs)("span", {
                                    className: "fa",
                                    children: [
                                      Object(w.jsx)("img", {
                                        src: "assets/images/sign-out-alt.png",
                                        className: "img-fluid",
                                        alt: "",
                                      }),
                                      Object(w.jsx)("svg", {
                                        "aria-hidden": "true",
                                        focusable: "false",
                                        "data-prefix": "fas",
                                        "data-icon": "sign-out-alt",
                                        className:
                                          "svg-inline--fa fa-sign-out-alt fa-w-16",
                                        role: "img",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        viewBox: "0 0 512 512",
                                        children: Object(w.jsx)("path", {
                                          fill: "currentColor",
                                          d: "M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z",
                                        }),
                                      }),
                                    ],
                                  }),
                                  "Logout",
                                ],
                              }),
                            }),
                          ],
                        }),
                      }),
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        y = Object(j.g)(N),
        k = s.p + "static/media/loader.494bf887.gif",
        S = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s(e) {
            var a;
            return (
              Object(i.a)(this, s),
              ((a = t.call(this, e)).stateInitial = {
                email: { address: "" },
                password: "",
                errors: "",
                role: "",
                userId: "",
                isChecked: !0,
                loaderActive: !1,
                redirect: !1,
              }),
              (a.onChange = function (e) {
                a.setState(Object(p.a)({}, e.target.name, e.target.value));
              }),
              (a.onChangeEmail = function (e) {
                a.setState({ email: { address: e.target.value } });
              }),
              (a.toggleChange = function () {
                a.setState({ isChecked: !a.state.isChecked });
              }),
              (a.Login = (function () {
                var e = Object(b.a)(
                  m.a.mark(function e(t) {
                    var s, r, n, c, i, l, o, d;
                    return m.a.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              (t.preventDefault(),
                              (s = a.state),
                              (r = s.email),
                              (n = s.password),
                              (c = s.isChecked),
                              (i =
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
                              "" !== r.address)
                            ) {
                              e.next = 8;
                              break;
                            }
                            return (
                              a.setState({ errors: "Email  is required!" }),
                              e.abrupt("return")
                            );
                          case 8:
                            if (r.address.match(i)) {
                              e.next = 13;
                              break;
                            }
                            return (
                              a.setState({ errors: "Invalid email!" }),
                              e.abrupt("return")
                            );
                          case 13:
                            if ("" !== n) {
                              e.next = 18;
                              break;
                            }
                            return (
                              a.setState({ errors: "Password is required!" }),
                              e.abrupt("return")
                            );
                          case 18:
                            if (c) {
                              e.next = 23;
                              break;
                            }
                            return (
                              a.setState({
                                errors:
                                  "Please accept the terms and conditions to continue!",
                              }),
                              e.abrupt("return")
                            );
                          case 23:
                            return (
                              a.setState({ loaderActive: !0 }),
                              console.log("Test"),
                              (l = {
                                email: { address: r.address },
                                password: n,
                              }),
                              (e.next = 28),
                              g("post", "api/auth/login", l, null)
                            );
                          case 28:
                            if (
                              ((o = e.sent),
                              a.setState({ loaderActive: !0 }),
                              401 !== o.status)
                            ) {
                              e.next = 36;
                              break;
                            }
                            return (
                              a.setState({ loaderActive: !1 }),
                              a.setState({ errors: o.message }),
                              e.abrupt("return")
                            );
                          case 36:
                            if (200 !== o.status) {
                              e.next = 62;
                              break;
                            }
                            if (
                              (a.setState({ loaderActive: !1 }),
                              (d = o.id),
                              a.setState({ loaderActive: !0 }),
                              a.setState({ redirect: !0 }),
                              localStorage.setItem(
                                "LoginSession",
                                o.accessToken
                              ),
                              localStorage.setItem(
                                "accessToken",
                                JSON.stringify(o.user)
                              ),
                              localStorage.setItem(
                                "userId",
                                JSON.stringify(o.id)
                              ),
                              localStorage.setItem(
                                "loginTime",
                                new Date().getTime()
                              ),
                              "Affiliate" !== o.user.role)
                            ) {
                              e.next = 52;
                              break;
                            }
                            return (
                              a.setState({ loaderActive: !1 }),
                              a.setState({ redirect: !0 }),
                              a.props.history.push({
                                pathname: "/affiliate/Dashboard/".concat(d),
                                state: { key: "value" },
                                id: d,
                              }),
                              e.abrupt("return")
                            );
                          case 52:
                            if ("Admin" !== o.user.role) {
                              e.next = 60;
                              break;
                            }
                            return (
                              a.setState({ userId: o.id }),
                              a.setState({ loaderActive: !1 }),
                              a.setState({ redirect: !0 }),
                              a.props.history.push({
                                pathname: "/admin/Statistics/".concat(d),
                                state: { key: "value" },
                                id: d,
                              }),
                              a.setState({ redirect: !0 }),
                              a.setState({ loaderActive: !0 }),
                              e.abrupt("return")
                            );
                          case 60:
                            e.next = 65;
                            break;
                          case 62:
                            if (500 !== o.status) {
                              e.next = 65;
                              break;
                            }
                            return (
                              a.setState({ errors: o.message }),
                              e.abrupt("return")
                            );
                          case 65:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })()),
              (a.state = a.stateInitial),
              a
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "componentDidMount",
                value: function () {
                  "true" === localStorage.getItem("showNotify") &&
                    (O.notify.show(
                      "You are registered! Check your email to verify your account!",
                      "success",
                      6e3
                    ),
                    this.setState({ showNotify: !1 }),
                    localStorage.setItem("showNotify", !1));
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this;
                  return Object(w.jsxs)("div", {
                    children: [
                      this.state.loaderActive
                        ? Object(w.jsx)("div", {
                            className: "inlineLoaderGif",
                            children: Object(w.jsx)("img", {
                              src: k,
                              alt: "broken",
                            }),
                          })
                        : "",
                      " ",
                      Object(w.jsx)(v.a, {}),
                      Object(w.jsx)("section", {
                        className: "login_wraper",
                        children: Object(w.jsx)("div", {
                          className: "container-fluid",
                          children: Object(w.jsxs)("div", {
                            className: "row align-items-center",
                            children: [
                              Object(w.jsx)("div", {
                                className:
                                  "col-xl- col-lg-7 col-md-7 col-sm-12 border-r",
                                children: Object(w.jsxs)("div", {
                                  className: "login-content",
                                  children: [
                                    Object(w.jsx)("h3", {
                                      children:
                                        "How well do you really know your friends if you don't know their goals?",
                                    }),
                                    Object(w.jsx)("p", {
                                      children:
                                        "Keep up with your friend\u2019s life goals and enjoy helping them!",
                                    }),
                                    Object(w.jsx)("img", {
                                      src: "assets/images/login_img.png",
                                      className: "img-fluid mt-5",
                                      alt: "",
                                    }),
                                  ],
                                }),
                              }),
                              Object(w.jsx)("div", {
                                className:
                                  "col-xl-4 col-lg-5 col-md-5 col-sm-12",
                                children: Object(w.jsx)("div", {
                                  "accept-charset": "utf-8",
                                  children: Object(w.jsxs)("div", {
                                    className: "form_inner_box",
                                    children: [
                                      Object(w.jsx)("img", {
                                        src: "assets/images/Logo.png",
                                        className: "img-fluid",
                                        alt: "",
                                      }),
                                      Object(w.jsx)("h3", {
                                        className: "text-center",
                                        children: "LOGIN",
                                      }),
                                      Object(w.jsxs)("div", {
                                        className: "form-group mb_30",
                                        children: [
                                          Object(w.jsx)("label", {
                                            className: "input_lable",
                                            children: "Email address",
                                          }),
                                          Object(w.jsx)("input", {
                                            type: "email",
                                            value: this.state.email.address,
                                            onChange: this.onChangeEmail,
                                            name: "email",
                                            className: "form-control",
                                            placeholder: "email@email.com",
                                          }),
                                        ],
                                      }),
                                      Object(w.jsxs)("div", {
                                        className: "form-group",
                                        children: [
                                          Object(w.jsx)("label", {
                                            className: "input_lable",
                                            children: "Password",
                                          }),
                                          Object(w.jsx)("input", {
                                            type: "password",
                                            value: this.state.password,
                                            onChange: this.onChange,
                                            name: "password",
                                            className: "form-control",
                                            placeholder: "********",
                                          }),
                                        ],
                                      }),
                                      Object(w.jsxs)("div", {
                                        className: "iagree_radio p-0",
                                        children: [
                                          Object(w.jsx)("input", {
                                            type: "checkbox",
                                            name: "iagree_to_be_contacted",
                                            id: "iagree_to_be_contacted",
                                            className: "is-valid",
                                            defaultChecked: !0,
                                            onClick: this.toggleChange,
                                          }),
                                          Object(w.jsxs)("label", {
                                            for: "iagree_to_be_contacted",
                                            children: [
                                              " ",
                                              "please accept our terms of business.",
                                            ],
                                          }),
                                          " ",
                                          this.state.errors
                                            ? Object(w.jsx)("div", {
                                                style: { color: "#FE6E00" },
                                                className: "alert alert-danger",
                                                children: this.state.errors,
                                              })
                                            : "",
                                        ],
                                      }),
                                      Object(w.jsx)("button", {
                                        onClick: function (t) {
                                          return e.Login(t);
                                        },
                                        type: "button",
                                        className:
                                          "theme_btn text-center d-flex mx-auto mb-3 mt_3",
                                        children: "Log In",
                                      }),
                                      Object(w.jsx)("div", {
                                        className: "top-bar",
                                        children: Object(w.jsx)("span", {
                                          children: Object(w.jsxs)("a", {
                                            class: "link",
                                            href: "#/Register",
                                            children: [" ", "Create Account"],
                                          }),
                                        }),
                                      }),
                                      Object(w.jsx)("div", {
                                        className: "top-bar",
                                        children: Object(w.jsx)("span", {
                                          children: Object(w.jsxs)("a", {
                                            class: "link",
                                            href: "/#/forgetPassEmail/",
                                            children: [
                                              " ",
                                              "Forgotten password?",
                                            ],
                                          }),
                                        }),
                                      }),
                                    ],
                                  }),
                                }),
                              }),
                            ],
                          }),
                        }),
                      }),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        C = Object(j.g)(S),
        _ = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s(e) {
            var a;
            return (
              Object(i.a)(this, s),
              ((a = t.call(this, e)).stateInitial = {
                password: "",
                confirmedpassword: "",
                errors: "",
                userToken: "",
                loaderActive: !1,
              }),
              (a.stateInitialize = function () {
                a.setState(a.stateInitial);
              }),
              (a.onChange = function (e) {
                a.setState(Object(p.a)({}, e.target.name, e.target.value));
              }),
              (a.onSubmit = Object(b.a)(
                m.a.mark(function e() {
                  var t, s, r, n, c, i;
                  return m.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (
                            ((t = a.state),
                            (s = t.confirmedpassword),
                            (r = t.password),
                            (n = t.userToken),
                            "" != r)
                          ) {
                            e.next = 5;
                            break;
                          }
                          a.setState({ errors: "Password is required!" }),
                            (e.next = 24);
                          break;
                        case 5:
                          if (!(r.length < 8)) {
                            e.next = 9;
                            break;
                          }
                          a.setState({
                            errors:
                              "Password must contain at-least 8 characters!",
                          }),
                            (e.next = 24);
                          break;
                        case 9:
                          if ("" != s) {
                            e.next = 13;
                            break;
                          }
                          a.setState({
                            errors: "Please confirm your password!",
                          }),
                            (e.next = 24);
                          break;
                        case 13:
                          if (r == s) {
                            e.next = 17;
                            break;
                          }
                          a.setState({ errors: "Password do not match!" }),
                            (e.next = 24);
                          break;
                        case 17:
                          return (
                            a.setState({ errors: "", loaderActive: !0 }),
                            (c = { password: r, confirmPassword: s, token: n }),
                            (e.next = 21),
                            g("post", "api/auth/forgetPassword", c, "")
                          );
                        case 21:
                          (i = e.sent),
                            a.setState({ loaderActive: !1 }),
                            200 === i.status
                              ? (O.notify.show(
                                  "Password updated successfully!!",
                                  "success",
                                  2e3
                                ),
                                a.props.history.push({
                                  pathname: "/login",
                                  state: { key: "value" },
                                }))
                              : 400 === i.status
                              ? a.setState({ errors: i.message })
                              : O.notify.show(
                                  "Something went wrong!!",
                                  "success",
                                  500
                                );
                        case 24:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              )),
              (a.state = a.stateInitial),
              a
            );
          }
          return (
            Object(l.a)(s, [
              { key: "componentWillUpdate", value: function (e, t) {} },
              {
                key: "componentDidMount",
                value: function () {
                  f()("body").removeClass("transparent-header"),
                    f()("html, body").animate({ scrollTop: 0 }, "slow");
                  var e = this.props.match.params.token;
                  this.setState({ userToken: e });
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this;
                  return Object(w.jsxs)("div", {
                    children: [
                      Object(w.jsx)(v.a, {}),
                      Object(w.jsx)("section", {
                        className: "login_wraper",
                        children: Object(w.jsx)("div", {
                          className: "container-fluid",
                          children: Object(w.jsxs)("div", {
                            className: "row align-items-center",
                            children: [
                              Object(w.jsx)("div", {
                                className:
                                  "col-xl- col-lg-7 col-md-7 col-sm-12 border-r",
                                children: Object(w.jsxs)("div", {
                                  className: "login-content",
                                  children: [
                                    Object(w.jsx)("h3", {
                                      children:
                                        "How well do you really know your friends if you don't know their goals?",
                                    }),
                                    Object(w.jsx)("p", {
                                      children:
                                        "Keep up with your friend\u2019s life goals and enjoy helping them!",
                                    }),
                                    Object(w.jsx)("img", {
                                      src: "assets/images/login_img.png",
                                      className: "img-fluid mt-5",
                                      alt: "",
                                    }),
                                  ],
                                }),
                              }),
                              Object(w.jsx)("div", {
                                className:
                                  "col-xl-4 col-lg-5 col-md-5 col-sm-12",
                                children: Object(w.jsx)("div", {
                                  "accept-charset": "utf-8",
                                  children: Object(w.jsxs)("div", {
                                    className: "form_inner_box",
                                    children: [
                                      Object(w.jsx)("img", {
                                        src: "assets/images/Logo.png",
                                        className: "img-fluid",
                                        alt: "",
                                      }),
                                      Object(w.jsx)("h3", {
                                        className: "text-center",
                                        children: "Change Password",
                                      }),
                                      Object(w.jsxs)("div", {
                                        className: "form-group",
                                        children: [
                                          Object(w.jsx)("label", {
                                            className: "input_lable",
                                            children: "Password",
                                          }),
                                          Object(w.jsx)("input", {
                                            type: "password",
                                            name: "password",
                                            value: this.state.password,
                                            onChange: this.onChange,
                                            className: "form-control",
                                            placeholder: "********",
                                          }),
                                        ],
                                      }),
                                      Object(w.jsxs)("div", {
                                        className: "form-group",
                                        children: [
                                          Object(w.jsx)("label", {
                                            className: "input_lable",
                                            children: "Confirm Password",
                                          }),
                                          Object(w.jsx)("input", {
                                            type: "password",
                                            name: "confirmedpassword",
                                            value: this.state.confirmedpassword,
                                            onChange: this.onChange,
                                            className: "form-control",
                                            placeholder: "********",
                                          }),
                                        ],
                                      }),
                                      Object(w.jsx)("div", {
                                        className: "iagree_radio",
                                        children: Object(w.jsx)("span", {
                                          className: "error",
                                          id: "iagree_to_be_contacted_error",
                                          style: { display: "none" },
                                          children:
                                            "please accept our terms of business",
                                        }),
                                      }),
                                      this.state.errors
                                        ? Object(w.jsx)("div", {
                                            style: { color: "#FE6E00" },
                                            className: "alert alert-danger",
                                            children: this.state.errors,
                                          })
                                        : "",
                                      Object(w.jsx)("button", {
                                        onClick: function (t) {
                                          e.onSubmit(t);
                                        },
                                        className:
                                          "theme_btn text-center d-flex mx-auto mb-3 mt_3",
                                        children: "Update",
                                      }),
                                      Object(w.jsx)("div", {
                                        className: "top-bar",
                                        children: Object(w.jsx)("span", {
                                          children: Object(w.jsxs)("a", {
                                            class: "link",
                                            href: "/#/register",
                                            children: [
                                              "Create A New Account?",
                                              " ",
                                            ],
                                          }),
                                        }),
                                      }),
                                    ],
                                  }),
                                }),
                              }),
                            ],
                          }),
                        }),
                      }),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        A = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s() {
            var e;
            Object(i.a)(this, s);
            for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
              r[n] = arguments[n];
            return ((e = t.call.apply(t, [this].concat(r))).state = {}), e;
          }
          return (
            Object(l.a)(s, [
              {
                key: "render",
                value: function () {
                  return Object(w.jsx)("div", {
                    children: Object(w.jsxs)("header", {
                      id: "header",
                      children: [
                        Object(w.jsx)("div", {
                          className: "menu-button  pt-4",
                          children: Object(w.jsxs)("div", {
                            id: "nav-icon3",
                            children: [
                              " ",
                              Object(w.jsx)("span", {
                                className: "icon-menu",
                                children: Object(w.jsx)("img", {
                                  src: "assets/images/Menu_Icon.png",
                                  alt: "",
                                }),
                              }),
                              " ",
                            ],
                          }),
                        }),
                        Object(w.jsxs)("div", {
                          id: "top-bar",
                          children: [
                            " ",
                            Object(w.jsx)("img", {
                              src: "assets/images/top_logo.png",
                              className: "img-fluid text-center",
                              alt: "",
                            }),
                            " ",
                          ],
                        }),
                      ],
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        P = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s() {
            var e;
            Object(i.a)(this, s);
            for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
              r[n] = arguments[n];
            return ((e = t.call.apply(t, [this].concat(r))).state = {}), e;
          }
          return (
            Object(l.a)(s, [
              {
                key: "render",
                value: function () {
                  return Object(w.jsx)("div", {
                    children: Object(w.jsx)("footer", {
                      className: "text-center login-footer",
                      children: Object(w.jsx)("p", {
                        className: "pt-0",
                        children: "\xa9 2021 GoalMogul, Inc.",
                      }),
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        I = (s(32), s(59)),
        L = s.n(I),
        M = s(203),
        D = s(204),
        T = s(194);
      s(57), s(44);
      var U = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s(e) {
            var a;
            return (
              Object(i.a)(this, s),
              ((a = t.call(this, e)).handleClose1 = function () {
                a.setState({ show: !1 });
              }),
              (a.handleOpen = function (e, t, s) {
                a.setState({ show: !0, userToDelete: t, nameofDeletedUser: s });
              }),
              (a.onClose1 = function () {
                a.setState({ show: !1 }), a.onTrash();
              }),
              (a.state = {
                show: !1,
                affiliatessListing: [],
                activePage: 1,
                type: "",
                loaderActive: !1,
                recordsCount: "",
                userToDelete: "",
                nameofDeletedUser: "",
              }),
              a
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "componentDidMount",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e() {
                      var t, s;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (t = this.props.match),
                                  (s = t.params.type),
                                  f()("body").removeClass("transparent-header"),
                                  f()("html, body").animate(
                                    { scrollTop: 0 },
                                    "slow"
                                  ),
                                  (e.next = 6),
                                  JSON.parse(
                                    localStorage.getItem("accessToken")
                                  )
                                );
                              case 6:
                                "Admin" == e.sent.role
                                  ? (this.getDocuments(1, s),
                                    this.setState({ loaderActive: !1 }))
                                  : this.props.history.push({
                                      pathname: "/login",
                                      state: { key: "value" },
                                    });
                              case 8:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "componentWillReceiveProps",
                value: function (e) {
                  e.match.params.type !== this.props.match.params.type
                    ? (this.setState({ type: e.match.params.type }),
                      this.setState({ loaderActive: !0 }),
                      this.getDocuments(1, e.match.params.type))
                    : this.setState({ type: e.match.params.type });
                },
              },
              {
                key: "handlePageChange",
                value: function (e) {
                  var t = this.props.match.params.type;
                  this.setState({ activePage: e }), this.getDocuments(e, t);
                },
              },
              {
                key: "getDocuments",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e(t, s) {
                      var a, r, n, c;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  ((a = {
                                    pageNumber: t,
                                    type: s || this.state.type,
                                  }),
                                  (r = localStorage.getItem("LoginSession")),
                                  "deleted" !== s)
                                ) {
                                  e.next = 8;
                                  break;
                                }
                                return (
                                  (e.next = 5),
                                  g(
                                    "post",
                                    "api/admin/deletedUsersListing",
                                    a,
                                    r
                                  )
                                );
                              case 5:
                                (n = e.sent), (e.next = 12);
                                break;
                              case 8:
                                return (
                                  (e.next = 10),
                                  g("post", "api/admin/usersAgainstRole", a, r)
                                );
                              case 10:
                                (n = e.sent),
                                  this.setState({ loaderActive: !1 });
                              case 12:
                                return (
                                  200 == n.status &&
                                    n.users &&
                                    this.setState({
                                      affiliatessListing: n.users,
                                      loaderActive: !1,
                                    }),
                                  this.setState({ loaderActive: !0 }),
                                  (e.next = 16),
                                  g("post", "api/Admin/count", a, "")
                                );
                              case 16:
                                200 == (c = e.sent).status &&
                                  this.setState({
                                    recordsCount: c.recordsCount,
                                    loaderActive: !1,
                                  }),
                                  this.setState({ loaderActive: !0 });
                              case 19:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function (t, s) {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "onTrash",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e() {
                      var t, s;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (t = localStorage.getItem("LoginSession")),
                                  (s = { id: this.state.userToDelete }),
                                  (e.next = 4),
                                  g("post", "api/admin/onTrash", s, t)
                                );
                              case 4:
                                200 == e.sent.status &&
                                  (this.setState({ show: !1 }),
                                  window.location.reload());
                              case 6:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "onRestore",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e(t, s) {
                      var a, r;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  t.preventDefault(),
                                  (a = localStorage.getItem("LoginSession")),
                                  (r = { id: s }),
                                  (e.next = 5),
                                  g("post", "api/admin/onRevover", r, a)
                                );
                              case 5:
                                200 == e.sent.status &&
                                  (this.setState({ show: !1 }),
                                  window.location.reload());
                              case 7:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function (t, s) {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "render",
                value: function () {
                  var e,
                    t = this;
                  return Object(w.jsx)("div", {
                    children: Object(w.jsx)("div", {
                      id: "content-wrapper",
                      className:
                        "d-flex align-items-center justify-content-centers",
                      children: Object(w.jsxs)("div", {
                        className: "container-fluid",
                        children: [
                          Object(w.jsx)("h4", {
                            className: "main_title mb-4",
                            children: "All Users",
                          }),
                          Object(w.jsx)("div", {
                            className: "admin_all_user",
                            children: Object(w.jsxs)("div", {
                              className: "row no-gutters",
                              children: [
                                Object(w.jsxs)("div", {
                                  className: "col-xl-2 col-lg-3",
                                  children: [
                                    Object(w.jsx)("a", {
                                      href: "#/admin/register",
                                      children: Object(w.jsx)("button", {
                                        className: "theme_btn text-center",
                                        children: "Add New User",
                                      }),
                                    }),
                                    Object(w.jsx)("hr", {}),
                                    Object(w.jsxs)("div", {
                                      className:
                                        "nav flex-column nav-pills custom_nav",
                                      id: "v-pills-tab",
                                      role: "tablist",
                                      "aria-orientation": "vertical",
                                      children: [
                                        Object(w.jsxs)("a", {
                                          href: "#/admin/Listing/all",
                                          className: "nav-link active",
                                          id: "v-pills-home-tab",
                                          role: "tab",
                                          "aria-controls": "v-pills-home",
                                          "aria-selected": "true",
                                          children: [
                                            " ",
                                            Object(w.jsx)("i", {
                                              className: "fa fa-users mr_20",
                                            }),
                                            " All",
                                          ],
                                        }),
                                        Object(w.jsxs)("a", {
                                          className: "nav-link",
                                          id: "v-pills-profile-tab",
                                          href: "#/admin/Listing/Admin",
                                          role: "tab",
                                          "aria-controls": "v-pills-profile",
                                          "aria-selected": "false",
                                          children: [
                                            Object(w.jsx)(
                                              "svg",
                                              ((e = {
                                                "aria-hidden": "true",
                                                className: "mr_20",
                                                focusable: "false",
                                                "data-prefix": "fas",
                                                "data-icon": "users-cog",
                                              }),
                                              Object(p.a)(
                                                e,
                                                "className",
                                                "svg-inline--fa fa-users-cog fa-w-20"
                                              ),
                                              Object(p.a)(e, "role", "img"),
                                              Object(p.a)(
                                                e,
                                                "xmlns",
                                                "http://www.w3.org/2000/svg"
                                              ),
                                              Object(p.a)(
                                                e,
                                                "viewBox",
                                                "0 0 640 512"
                                              ),
                                              Object(p.a)(
                                                e,
                                                "children",
                                                Object(w.jsx)("path", {
                                                  fill: "currentColor",
                                                  d: "M610.5 341.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 368.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm224 32c1.9 0 3.7-.5 5.6-.6 8.3-21.7 20.5-42.1 36.3-59.2 7.4-8 17.9-12.6 28.9-12.6 6.9 0 13.7 1.8 19.6 5.3l7.9 4.6c.8-.5 1.6-.9 2.4-1.4 7-14.6 11.2-30.8 11.2-48 0-61.9-50.1-112-112-112S208 82.1 208 144c0 61.9 50.1 112 112 112zm105.2 194.5c-2.3-1.2-4.6-2.6-6.8-3.9-8.2 4.8-15.3 9.8-27.5 9.8-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-10.7-34.5 24.9-49.7 25.8-50.3-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-3.8-2.2-7-5-9.8-8.1-3.3.2-6.5.6-9.8.6-24.6 0-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h255.4c-3.7-6-6.2-12.8-6.2-20.3v-9.2zM173.1 274.6C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z",
                                                })
                                              ),
                                              e)
                                            ),
                                            "Admins",
                                          ],
                                        }),
                                        Object(w.jsxs)("a", {
                                          className: "nav-link",
                                          id: "v-pills-messages-tab",
                                          href: "#/admin/Listing/Affiliate",
                                          role: "tab",
                                          "aria-selected": "false",
                                          children: [
                                            Object(w.jsx)("i", {
                                              className: "fa fa-user mr_20",
                                            }),
                                            " Affiliates",
                                          ],
                                        }),
                                        Object(w.jsxs)("a", {
                                          className: "nav-link",
                                          id: "v-pills-messages-tab",
                                          href: "#/admin/Listing/deleted",
                                          role: "tab",
                                          "aria-selected": "false",
                                          children: [
                                            Object(w.jsx)("i", {
                                              className: "fa fa-user mr_20",
                                            }),
                                            " Deleted",
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                Object(w.jsxs)("div", {
                                  className: "col-xl-10 col-lg-9 border_lft",
                                  children: [
                                    Object(w.jsxs)(M.a, {
                                      show: this.state.show,
                                      onHide: this.handleClose1,
                                      children: [
                                        Object(w.jsx)(M.a.Header, {
                                          closeButton: !0,
                                        }),
                                        Object(w.jsx)(M.a.Body, {
                                          children: Object(w.jsxs)(D.a, {
                                            variant: "danger",
                                            children: [
                                              Object(w.jsxs)("p", {
                                                children: [
                                                  "Are you sure you want to delete",
                                                  " ",
                                                  Object(w.jsx)("b", {
                                                    children:
                                                      this.state
                                                        .nameofDeletedUser,
                                                  }),
                                                  "?",
                                                ],
                                              }),
                                              Object(w.jsx)("hr", {}),
                                            ],
                                          }),
                                        }),
                                        Object(w.jsxs)(M.a.Footer, {
                                          children: [
                                            Object(w.jsx)(T.a, {
                                              variant: "primary",
                                              onClick: this.onClose1,
                                              children: "Okay",
                                            }),
                                            Object(w.jsx)(T.a, {
                                              variant: "primary",
                                              onClick: this.handleClose1,
                                              children: "cancel",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    Object(w.jsxs)("div", {
                                      className: "tab-content",
                                      id: "v-pills-tabContent",
                                      children: [
                                        Object(w.jsx)("div", {
                                          className:
                                            "tab-pane fade active show",
                                          id: "v-pills-home",
                                          role: "tabpanel",
                                          "aria-labelledby": "v-pills-home-tab",
                                          children:
                                            this.state.affiliatessListing
                                              .length > 0
                                              ? this.state.affiliatessListing.map(
                                                  function (e, s) {
                                                    return Object(w.jsx)(
                                                      "div",
                                                      {
                                                        className: "card",
                                                        children: Object(
                                                          w.jsxs
                                                        )("div", {
                                                          className:
                                                            "row align-items-center no-gutters",
                                                          children: [
                                                            Object(w.jsx)(
                                                              "div",
                                                              {
                                                                className:
                                                                  "col-10",
                                                                children:
                                                                  Object(
                                                                    w.jsxs
                                                                  )("div", {
                                                                    className:
                                                                      "row align-items-center no-gutters",
                                                                    children: [
                                                                      Object(
                                                                        w.jsx
                                                                      )("div", {
                                                                        className:
                                                                          "col-lg-4 col-md-4 col-sm-6",
                                                                        children:
                                                                          Object(
                                                                            w.jsxs
                                                                          )(
                                                                            "div",
                                                                            {
                                                                              className:
                                                                                "add_user_img d-flex ",
                                                                              children:
                                                                                [
                                                                                  e.avatar
                                                                                    ? Object(
                                                                                        w.jsx
                                                                                      )(
                                                                                        "img",
                                                                                        {
                                                                                          height:
                                                                                            "50px",
                                                                                          width:
                                                                                            "50px",
                                                                                          className:
                                                                                            "rounded-circle",
                                                                                          src:
                                                                                            window.APIURL +
                                                                                            e.avatar,
                                                                                          alt: "",
                                                                                        }
                                                                                      )
                                                                                    : Object(
                                                                                        w.jsx
                                                                                      )(
                                                                                        "img",
                                                                                        {
                                                                                          height:
                                                                                            "50px",
                                                                                          width:
                                                                                            "50px",
                                                                                          className:
                                                                                            "rounded-circle",
                                                                                          src: "assets/images/profile_img.png",
                                                                                          alt: "",
                                                                                        }
                                                                                      ),
                                                                                  Object(
                                                                                    w.jsx
                                                                                  )(
                                                                                    "h5",
                                                                                    {
                                                                                      className:
                                                                                        " ",
                                                                                      children:
                                                                                        e.name,
                                                                                    }
                                                                                  ),
                                                                                ],
                                                                            }
                                                                          ),
                                                                      }),
                                                                      Object(
                                                                        w.jsx
                                                                      )("div", {
                                                                        className:
                                                                          "col-lg-5 col-md-5 col-sm-6 col-6",
                                                                        children:
                                                                          Object(
                                                                            w.jsxs
                                                                          )(
                                                                            "div",
                                                                            {
                                                                              className:
                                                                                "email_content",
                                                                              children:
                                                                                [
                                                                                  Object(
                                                                                    w.jsx
                                                                                  )(
                                                                                    "h5",
                                                                                    {
                                                                                      children:
                                                                                        "Email",
                                                                                    }
                                                                                  ),
                                                                                  Object(
                                                                                    w.jsx
                                                                                  )(
                                                                                    "p",
                                                                                    {
                                                                                      children:
                                                                                        e
                                                                                          .email
                                                                                          .address,
                                                                                    }
                                                                                  ),
                                                                                ],
                                                                            }
                                                                          ),
                                                                      }),
                                                                      Object(
                                                                        w.jsx
                                                                      )("div", {
                                                                        className:
                                                                          "col-lg-2 col-md-2 col-sm-2 col-6",
                                                                        children:
                                                                          Object(
                                                                            w.jsxs
                                                                          )(
                                                                            "div",
                                                                            {
                                                                              className:
                                                                                "admin_content",
                                                                              children:
                                                                                [
                                                                                  Object(
                                                                                    w.jsx
                                                                                  )(
                                                                                    "h5",
                                                                                    {
                                                                                      children:
                                                                                        "User Type",
                                                                                    }
                                                                                  ),
                                                                                  Object(
                                                                                    w.jsx
                                                                                  )(
                                                                                    "p",
                                                                                    {
                                                                                      children:
                                                                                        e.role,
                                                                                    }
                                                                                  ),
                                                                                ],
                                                                            }
                                                                          ),
                                                                      }),
                                                                    ],
                                                                  }),
                                                              }
                                                            ),
                                                            "deleted" ==
                                                            t.state.type
                                                              ? Object(w.jsx)(
                                                                  "div",
                                                                  {
                                                                    className:
                                                                      "col-lg-2 col-md-2 col-sm-6",
                                                                    children:
                                                                      Object(
                                                                        w.jsx
                                                                      )("div", {
                                                                        className:
                                                                          "edit_icon",
                                                                        children:
                                                                          Object(
                                                                            w.jsx
                                                                          )(
                                                                            "ul",
                                                                            {
                                                                              children:
                                                                                Object(
                                                                                  w.jsx
                                                                                )(
                                                                                  "li",
                                                                                  {
                                                                                    children:
                                                                                      Object(
                                                                                        w.jsx
                                                                                      )(
                                                                                        "button",
                                                                                        {
                                                                                          className:
                                                                                            "theme_btn text-center",
                                                                                          onClick:
                                                                                            function (
                                                                                              s
                                                                                            ) {
                                                                                              t.onRestore(
                                                                                                s,
                                                                                                e._id
                                                                                              );
                                                                                            },
                                                                                          children:
                                                                                            "Restore",
                                                                                        }
                                                                                      ),
                                                                                  }
                                                                                ),
                                                                            }
                                                                          ),
                                                                      }),
                                                                  }
                                                                )
                                                              : Object(w.jsx)(
                                                                  "div",
                                                                  {
                                                                    className:
                                                                      "col-lg-2 col-md-2 col-sm-6",
                                                                    children:
                                                                      Object(
                                                                        w.jsx
                                                                      )("div", {
                                                                        className:
                                                                          "edit_icon",
                                                                        children:
                                                                          Object(
                                                                            w.jsxs
                                                                          )(
                                                                            "ul",
                                                                            {
                                                                              children:
                                                                                [
                                                                                  Object(
                                                                                    w.jsx
                                                                                  )(
                                                                                    "li",
                                                                                    {
                                                                                      children:
                                                                                        Object(
                                                                                          w.jsx
                                                                                        )(
                                                                                          "a",
                                                                                          {
                                                                                            href: "#/admin/Affiliat/".concat(
                                                                                              e._id,
                                                                                              "/dashboard"
                                                                                            ),
                                                                                            title:
                                                                                              "",
                                                                                            children:
                                                                                              Object(
                                                                                                w.jsx
                                                                                              )(
                                                                                                "img",
                                                                                                {
                                                                                                  style:
                                                                                                    {
                                                                                                      marginBottom:
                                                                                                        "0.5",
                                                                                                    },
                                                                                                  height:
                                                                                                    "32px",
                                                                                                  width:
                                                                                                    "32px",
                                                                                                  src: "assets/images/eye.png",
                                                                                                  className:
                                                                                                    "img-fluid",
                                                                                                  alt: "",
                                                                                                }
                                                                                              ),
                                                                                          }
                                                                                        ),
                                                                                    }
                                                                                  ),
                                                                                  Object(
                                                                                    w.jsx
                                                                                  )(
                                                                                    "li",
                                                                                    {
                                                                                      children:
                                                                                        Object(
                                                                                          w.jsx
                                                                                        )(
                                                                                          "a",
                                                                                          {
                                                                                            href: "#/admin/EditProfile/".concat(
                                                                                              e._id
                                                                                            ),
                                                                                            title:
                                                                                              "",
                                                                                            children:
                                                                                              Object(
                                                                                                w.jsx
                                                                                              )(
                                                                                                "img",
                                                                                                {
                                                                                                  src: "assets/images/pen.png",
                                                                                                  className:
                                                                                                    "img-fluid",
                                                                                                  alt: "",
                                                                                                }
                                                                                              ),
                                                                                          }
                                                                                        ),
                                                                                    }
                                                                                  ),
                                                                                  Object(
                                                                                    w.jsx
                                                                                  )(
                                                                                    "li",
                                                                                    {
                                                                                      children:
                                                                                        Object(
                                                                                          w.jsx
                                                                                        )(
                                                                                          "a",
                                                                                          {
                                                                                            onClick:
                                                                                              function (
                                                                                                s
                                                                                              ) {
                                                                                                t.handleOpen(
                                                                                                  s,
                                                                                                  e._id,
                                                                                                  e.name
                                                                                                );
                                                                                              },
                                                                                            title:
                                                                                              "",
                                                                                            children:
                                                                                              Object(
                                                                                                w.jsx
                                                                                              )(
                                                                                                "img",
                                                                                                {
                                                                                                  src: "assets/images/trash.png",
                                                                                                  className:
                                                                                                    "img-fluid",
                                                                                                  alt: "",
                                                                                                }
                                                                                              ),
                                                                                          }
                                                                                        ),
                                                                                    }
                                                                                  ),
                                                                                ],
                                                                            }
                                                                          ),
                                                                      }),
                                                                  }
                                                                ),
                                                          ],
                                                        }),
                                                      }
                                                    );
                                                  }
                                                )
                                              : "No User found",
                                        }),
                                        Object(w.jsxs)("section", {
                                          class:
                                            "gallery-section gallery-page-section",
                                          children: [
                                            Object(w.jsx)("div", {
                                              class: "auto-container",
                                              children: Object(w.jsx)("div", {
                                                class: "mixitup-gallery",
                                                children: Object(w.jsx)("div", {
                                                  class:
                                                    "styled-pagination text-center",
                                                  children: Object(w.jsxs)(
                                                    "div",
                                                    {
                                                      class: "clearfix",
                                                      children: [
                                                        " ",
                                                        this.state
                                                          .recordsCount > 5
                                                          ? Object(w.jsx)(L.a, {
                                                              itemClass:
                                                                "page-item",
                                                              linkClass:
                                                                "page-link",
                                                              activePage:
                                                                this.state
                                                                  .activePage,
                                                              itemsCountPerPage: 5,
                                                              totalItemsCount:
                                                                this.state
                                                                  .recordsCount,
                                                              onChange:
                                                                function (e) {
                                                                  return t.handlePageChange(
                                                                    e
                                                                  );
                                                                },
                                                            })
                                                          : "hfdkjdsfjndsfkjgjkl",
                                                      ],
                                                    }
                                                  ),
                                                }),
                                              }),
                                            }),
                                            " ",
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        z = (a.Component, s(26)),
        E = s.n(z);
      function F(e, t, s, a) {
        return new Promise(
          "post" == e
            ? function (r, n) {
                fetch(window.APIURL + t, {
                  method: e,
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: a,
                  },
                  body: JSON.stringify(s),
                })
                  .then(function (e) {
                    return e.json();
                  })
                  .then(
                    function (e) {
                      r(e);
                    },
                    function (e) {
                      r(!1);
                    }
                  );
              }
            : function (e, s) {
                fetch(window.APIURL + t, {
                  method: "get",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: a,
                  },
                })
                  .then(function (e) {
                    return e.json();
                  })
                  .then(
                    function (t) {
                      e(t);
                    },
                    function (t) {
                      e(!1);
                    }
                  );
              }
        );
      }
      var B = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s(e) {
            var a;
            return (
              Object(i.a)(this, s),
              ((a = t.call(this, e)).state = {
                currentMonthUsers: "",
                LastMonthUser: "",
                lastYearUsers: "",
                series: [{ data: [] }],
                options: {
                  colors: [
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                  ],
                  chart: {
                    height: 350,
                    type: "bar",
                    events: { click: function (e, t, s) {} },
                  },
                  plotOptions: { bar: { columnWidth: "45%", distributed: !0 } },
                  dataLabels: { enabled: !1 },
                  legend: { show: !1 },
                  xaxis: {
                    categories: [
                      ["Jan", ""],
                      ["Feb", ""],
                      ["March", ""],
                      "April",
                      ["May", ""],
                      ["June", ""],
                      ["July", ""],
                      ["Aug", ""],
                      ["Sep", ""],
                      ["Oct", ""],
                      ["Nov", ""],
                      ["Dec", ""],
                    ],
                    labels: { style: { fontSize: "12px" } },
                  },
                },
              }),
              a
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "componentWillMount",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e() {
                      var t, s, a;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  f()("body").removeClass(
                                    "transparent-headesssr"
                                  ),
                                  f()("html, body").animate(
                                    { scrollTop: 0 },
                                    "slow"
                                  ),
                                  (t = localStorage.getItem("LoginSession")),
                                  this.setState({ loaderActive: !0 }),
                                  (s = { id: this.props.props }),
                                  (e.next = 7),
                                  F(
                                    "post",
                                    "api/affiliate/CurrentYearFollowers",
                                    s,
                                    t
                                  )
                                );
                              case 7:
                                (a = e.sent) &&
                                  (200 == a.status
                                    ? (this.setState({
                                        series: [{ data: a.currentYearFoll }],
                                      }),
                                      console.log(
                                        "result.currentYearFoll",
                                        a.currentYearFoll
                                      ))
                                    : this.setState({ errors: a.message }));
                              case 9:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "render",
                value: function () {
                  return Object(w.jsx)(E.a, {
                    options: this.state.options,
                    series: this.state.series,
                    type: "bar",
                    height: 350,
                  });
                },
              },
            ]),
            s
          );
        })(r.a.Component),
        R = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s(e) {
            var a;
            return (
              Object(i.a)(this, s),
              ((a = t.call(this, e)).state = {
                currentMonthUsers: "",
                LastMonthUser: "",
                lastYearUsers: "",
                series: [{ data: [] }],
                options: {
                  colors: ["#A69BA1", "#008FFB", "#FEB019"],
                  chart: {
                    height: 350,
                    type: "bar",
                    events: { click: function (e, t, s) {} },
                  },
                  plotOptions: { bar: { columnWidth: "45%", distributed: !0 } },
                  dataLabels: { enabled: !1 },
                  legend: { show: !1 },
                  xaxis: {
                    categories: [
                      ["", ""],
                      ["", ""],
                      ["", ""],
                    ],
                    labels: { style: { fontSize: "12px" } },
                  },
                },
              }),
              a
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "componentDidMount",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e() {
                      var t, s, a, r, n, c, i;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  f()("body").removeClass(
                                    "transparent-headesssr"
                                  ),
                                  f()("html, body").animate(
                                    { scrollTop: 0 },
                                    "slow"
                                  ),
                                  (t = localStorage.getItem("LoginSession")),
                                  (s = { id: this.props.props }),
                                  (e.next = 6),
                                  F(
                                    "post",
                                    "api/affDashboard/PiChartData",
                                    s,
                                    t
                                  )
                                );
                              case 6:
                                (a = e.sent) &&
                                  (200 == a.status
                                    ? ((r = a.currentMonthUsers),
                                      (n = a.LastMonthUser),
                                      (c = a.lastYearUsers),
                                      this.setState({
                                        currentMonthUsers: r,
                                        LastMonthUser: n,
                                        lastYearUsers: c,
                                      }),
                                      (i = [{ data: [r, n, c] }]),
                                      this.setState({ series: i }))
                                    : this.setState({ errors: a.message }));
                              case 8:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "render",
                value: function () {
                  return Object(w.jsxs)("div", {
                    children: [
                      Object(w.jsx)(E.a, {
                        options: this.state.options,
                        series: this.state.series,
                        type: "bar",
                        height: 350,
                      }),
                      Object(w.jsx)("div", {
                        className: "chart_value",
                        children: Object(w.jsxs)("ul", {
                          children: [
                            Object(w.jsxs)("li", {
                              children: [
                                Object(w.jsx)("h5", {
                                  className: "text_blue",
                                  children: this.state.currentMonthUsers,
                                }),
                                Object(w.jsx)("p", {
                                  children: "Current Month",
                                }),
                              ],
                            }),
                            Object(w.jsxs)("li", {
                              children: [
                                Object(w.jsx)("h5", {
                                  className: "text_info",
                                  children: this.state.LastMonthUser,
                                }),
                                Object(w.jsx)("p", { children: "Last Month" }),
                              ],
                            }),
                            Object(w.jsxs)("li", {
                              children: [
                                Object(w.jsx)("h5", {
                                  className: "text_orange",
                                  children: this.state.lastYearUsers,
                                }),
                                Object(w.jsx)("p", { children: "Last Year" }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(r.a.Component),
        Y = s(44),
        H = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s(e) {
            var a;
            return (
              Object(i.a)(this, s),
              ((a = t.call(this, e)).state = {
                currentMonthUsers: "",
                LastMonthUser: "",
                lastYearUsers: "",
                series: [{ data: [] }],
                options: {
                  colors: ["#578C4D"],
                  chart: {
                    height: 350,
                    type: "bar",
                    events: { click: function (e, t, s) {} },
                  },
                  plotOptions: { bar: { columnWidth: "45%", distributed: !0 } },
                  dataLabels: { enabled: !1 },
                  legend: { show: !1 },
                  xaxis: {
                    categories: [
                      ["1", ""],
                      ["2", ""],
                      ["3", ""],
                      ["4", ""],
                      ["5", ""],
                      ["6", ""],
                      ["7", ""],
                      ["8", ""],
                      ["9", ""],
                      ["10", ""],
                      ["11", ""],
                      ["12", ""],
                      ["13", ""],
                      ["12", ""],
                      ["14", ""],
                      ["15", ""],
                      ["16", ""],
                      ["17", ""],
                      ["18", ""],
                      ["19", ""],
                      ["20", ""],
                      ["21", ""],
                      ["22", ""],
                      ["23", ""],
                      ["24", ""],
                      ["25", ""],
                      ["26", ""],
                      ["27", ""],
                      ["28", ""],
                      ["29", ""],
                      ["30", ""],
                      ["31", ""],
                    ],
                    labels: { style: { fontSize: "12px" } },
                  },
                },
              }),
              a
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "componentDidMount",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e() {
                      var t, s, a, r, n, c, i, l, o, d, h;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  f()("body").removeClass(
                                    "transparent-headesssr"
                                  ),
                                  f()("html, body").animate(
                                    { scrollTop: 0 },
                                    "slow"
                                  ),
                                  (t = Date.now()),
                                  (s = Y(t).format()),
                                  (a = parseInt(s.toString().substr(8, 2))),
                                  JSON.parse(
                                    localStorage.getItem("accessToken")
                                  ),
                                  (r = localStorage.getItem("LoginSession")),
                                  this.setState({ loaderActive: !0 }),
                                  (n = { id: this.props.props }),
                                  (e.next = 11),
                                  F(
                                    "post",
                                    "api/affiliate/followersInThisMonth",
                                    n,
                                    r
                                  )
                                );
                              case 11:
                                if ((c = e.sent))
                                  if (200 == c.status) {
                                    for (
                                      i = a - c.followersPerDay.length - 1,
                                        l = [],
                                        o = 0;
                                      o <= i;
                                      o++
                                    )
                                      l.push(0);
                                    for (
                                      d = [], h = 0;
                                      h < c.followersPerDay.length - 1;
                                      h++
                                    )
                                      d.push(c.followersPerDay[h][1]);
                                    l.push.apply(l, d),
                                      this.setState({ series: [{ data: l }] });
                                  } else this.setState({ errors: c.message });
                              case 13:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "render",
                value: function () {
                  return Object(w.jsx)(E.a, {
                    options: this.state.options,
                    series: this.state.series,
                    type: "line",
                    height: 350,
                  });
                },
              },
            ]),
            s
          );
        })(r.a.Component),
        J = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s() {
            var e;
            Object(i.a)(this, s);
            for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
              r[n] = arguments[n];
            return (
              ((e = t.call.apply(t, [this].concat(r))).state = {
                id: "",
                loaderActive: !1,
                errors: "",
              }),
              e
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "componentDidMount",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e() {
                      var t;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                (t = this.props.match.params.id),
                                  this.setState({ id: t });
                              case 2:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "render",
                value: function () {
                  var e = this.props.match.params.id;
                  return Object(w.jsx)("div", {
                    id: "content-wrapper",
                    className:
                      "d-flex align-items-center justify-content-centers",
                    children: Object(w.jsxs)("div", {
                      className: "container-fluid",
                      children: [
                        Object(w.jsx)("h4", {
                          className: "main_title mb-4",
                          children: "Dashboard",
                        }),
                        Object(w.jsxs)("div", {
                          className: "row",
                          children: [
                            Object(w.jsx)("div", {
                              className: "col-lg-4 col-md-6 col-sm-12",
                              children: Object(w.jsxs)("div", {
                                className: "chart_item",
                                children: [
                                  Object(w.jsx)("h4", {
                                    className: "sub_title",
                                    children: "Monthly Report",
                                  }),
                                  Object(w.jsxs)("div", {
                                    className: "chart_img text-center mt-3",
                                    style: { paddingTop: "3.5rem" },
                                    children: [
                                      " ",
                                      Object(w.jsx)(H, { props: e }),
                                      "",
                                    ],
                                  }),
                                ],
                              }),
                            }),
                            Object(w.jsx)("div", {
                              className: "col-lg-4 col-md-6 col-sm-12",
                              children: Object(w.jsxs)("div", {
                                className: "chart_item",
                                children: [
                                  Object(w.jsx)("h4", {
                                    className: "sub_title",
                                    children: "History",
                                  }),
                                  Object(w.jsxs)("div", {
                                    className: "chart_img text-center mt-3",
                                    children: [
                                      Object(w.jsx)(R, { props: e }),
                                      " ",
                                    ],
                                  }),
                                ],
                              }),
                            }),
                            Object(w.jsx)("div", {
                              className: "col-lg-4 col-md-6 col-sm-12",
                              children: Object(w.jsxs)("div", {
                                className: "chart_item",
                                children: [
                                  Object(w.jsx)("h4", {
                                    className: "sub_title",
                                    children: "Yearly Report",
                                  }),
                                  Object(w.jsx)("div", {
                                    className: "chart_img text-center mt-3",
                                    style: { paddingTop: "3.5rem" },
                                    children: Object(w.jsx)(B, { props: e }),
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        q = s(44);
      var G = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s(e) {
            var a;
            return (
              Object(i.a)(this, s),
              ((a = t.call(this, e)).state = {
                FollowersOfAffiliate: [],
                activePage: 1,
                token: "",
                loaderActive: !1,
                recordsCount: "",
              }),
              a
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "componentDidMount",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e() {
                      var t;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                "Follower",
                                  f()("body").removeClass("transparent-header"),
                                  f()("html, body").animate(
                                    { scrollTop: 0 },
                                    "slow"
                                  ),
                                  this.setState({ loaderActive: !0 }),
                                  (t = localStorage.getItem("LoginSession"))
                                    ? (this.getDocuments(1),
                                      this.setState({ loaderActive: !1 }),
                                      this.setState({ userId: t.id }))
                                    : this.props.history.push({
                                        pathname: "/login",
                                        state: { key: "value" },
                                      });
                              case 6:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "handlePageChange",
                value: function (e) {
                  this.setState({ activePage: e }), this.getDocuments(e);
                },
              },
              {
                key: "getDocuments",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e(t) {
                      var s, a, r, n;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (s = localStorage.getItem("LoginSession")),
                                  (a = { pageNumber: t }),
                                  (e.next = 4),
                                  F(
                                    "post",
                                    "api/affiliate/followersAgainstAffiliate",
                                    a,
                                    s
                                  )
                                );
                              case 4:
                                return (
                                  (r = e.sent),
                                  this.setState({ loaderActive: !1 }),
                                  200 == r.status &&
                                    r.users &&
                                    this.setState({
                                      FollowersOfAffiliate: r.users,
                                      loaderActive: !1,
                                    }),
                                  this.setState({ loaderActive: !0 }),
                                  (e.next = 10),
                                  F("post", "api/Admin/count", a, "")
                                );
                              case 10:
                                200 == (n = e.sent).status &&
                                  this.setState({
                                    recordsCount: n.recordsCount,
                                    loaderActive: !1,
                                  }),
                                  this.setState({ loaderActive: !0 });
                              case 13:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "render",
                value: function () {
                  var e = this;
                  return Object(w.jsxs)("div", {
                    children: [
                      Object(w.jsx)("div", {
                        id: "content-wrapper",
                        class:
                          "d-flex align-items-center justify-content-centers",
                        children: Object(w.jsxs)("div", {
                          class: "container-fluid",
                          children: [
                            Object(w.jsx)("h4", {
                              class: "main_title mb-4",
                              children: "History",
                            }),
                            Object(w.jsxs)("div", {
                              class: "row",
                              children: [
                                Object(w.jsxs)("div", {
                                  class: "col-xl-6 col-lg-12",
                                  children: [
                                    Object(w.jsxs)("div", {
                                      class: "user_history",
                                      children: [
                                        Object(w.jsx)("h4", {
                                          class: "sub_title",
                                          children: "User History",
                                        }),
                                        Object(w.jsx)("div", {
                                          class:
                                            "user_history_inner mCustomScrollbar",
                                          children:
                                            this.state.FollowersOfAffiliate
                                              .length > 0
                                              ? this.state.FollowersOfAffiliate.map(
                                                  function (e) {
                                                    return Object(w.jsx)(
                                                      "div",
                                                      {
                                                        class: "card-body",
                                                        children: Object(
                                                          w.jsxs
                                                        )("ul", {
                                                          children: [
                                                            Object(w.jsxs)(
                                                              "li",
                                                              {
                                                                children: [
                                                                  Object(w.jsx)(
                                                                    "h5",
                                                                    {
                                                                      children:
                                                                        "Name",
                                                                    }
                                                                  ),
                                                                  Object(w.jsx)(
                                                                    "p",
                                                                    {
                                                                      children:
                                                                        e.name,
                                                                    }
                                                                  ),
                                                                ],
                                                              }
                                                            ),
                                                            Object(w.jsxs)(
                                                              "li",
                                                              {
                                                                children: [
                                                                  Object(w.jsx)(
                                                                    "h5",
                                                                    {
                                                                      children:
                                                                        "Email",
                                                                    }
                                                                  ),
                                                                  Object(w.jsx)(
                                                                    "p",
                                                                    {
                                                                      children:
                                                                        e.email
                                                                          .Address,
                                                                    }
                                                                  ),
                                                                ],
                                                              }
                                                            ),
                                                            Object(w.jsxs)(
                                                              "li",
                                                              {
                                                                children: [
                                                                  Object(w.jsx)(
                                                                    "h5",
                                                                    {
                                                                      children:
                                                                        "Account Created",
                                                                    }
                                                                  ),
                                                                  Object(w.jsx)(
                                                                    "p",
                                                                    {
                                                                      children:
                                                                        q(
                                                                          e.created
                                                                        ).format(
                                                                          "MMMM Do YYYY"
                                                                        ),
                                                                    }
                                                                  ),
                                                                ],
                                                              }
                                                            ),
                                                          ],
                                                        }),
                                                      }
                                                    );
                                                  }
                                                )
                                              : "No Followers",
                                        }),
                                      ],
                                    }),
                                    this.state.FollowersOfAffiliate > 0
                                      ? Object(w.jsx)(L.a, {
                                          activePage: this.state.activePage,
                                          itemsCountPerPage: 5,
                                          totalItemsCount:
                                            this.state.recordsCount,
                                          onChange: function (t) {
                                            return e.handlePageChange(t);
                                          },
                                        })
                                      : "hfdkjdsfjndsfkjgjkl",
                                  ],
                                }),
                                Object(w.jsxs)("div", {
                                  class: "col-xl-6 col-lg-12",
                                  children: [
                                    Object(w.jsxs)("div", {
                                      class: "transation",
                                      children: [
                                        Object(w.jsxs)("div", {
                                          class: "card-body",
                                          children: [
                                            Object(w.jsxs)("p", {
                                              children: [
                                                "Available Balance:",
                                                " ",
                                                Object(w.jsx)("span", {
                                                  class: "font-weight-bold",
                                                  children: "$10900",
                                                }),
                                              ],
                                            }),
                                            Object(w.jsx)("a", {
                                              class: "link",
                                              href: "/#/affiliate/AddBankDetails",
                                              children: Object(w.jsx)(
                                                "button",
                                                {
                                                  type: "submit",
                                                  class:
                                                    "theme_btn text-center",
                                                  "data-toggle": "modal",
                                                  "data-target":
                                                    "#staticBackdrop",
                                                  children: "Get Paid",
                                                }
                                              ),
                                            }),
                                          ],
                                        }),
                                        Object(w.jsx)("div", {
                                          class: "transation_inner",
                                          children: Object(w.jsx)("div", {
                                            class: "card-body mb-0",
                                            children: Object(w.jsx)("h4", {
                                              class: "font-weight-bold",
                                              children: "Transactions",
                                            }),
                                          }),
                                        }),
                                      ],
                                    }),
                                    Object(w.jsx)("div", {
                                      class: "main-card",
                                      children: Object(w.jsx)("div", {
                                        class: "table-responsive",
                                        children: Object(w.jsxs)("table", {
                                          class: "table",
                                          children: [
                                            Object(w.jsx)("thead", {
                                              class: "thead-light",
                                              children: Object(w.jsxs)("tr", {
                                                children: [
                                                  Object(w.jsx)("th", {
                                                    children: "Date",
                                                  }),
                                                  Object(w.jsx)("th", {
                                                    children: "Description",
                                                  }),
                                                  Object(w.jsx)("th", {
                                                    children: "Amount",
                                                  }),
                                                  Object(w.jsx)("th", {
                                                    children: "Ref ID",
                                                  }),
                                                ],
                                              }),
                                            }),
                                            Object(w.jsxs)("tbody", {
                                              children: [
                                                Object(w.jsxs)("tr", {
                                                  children: [
                                                    Object(w.jsx)("td", {
                                                      children: "01/02/2020",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children:
                                                        "Amount for 10 Users",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children: "$5900",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children: "378902",
                                                    }),
                                                  ],
                                                }),
                                                Object(w.jsxs)("tr", {
                                                  children: [
                                                    Object(w.jsx)("td", {
                                                      children: "01/02/2020",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children:
                                                        "Amount for 10 Users",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children: "$600",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children: "354525",
                                                    }),
                                                  ],
                                                }),
                                                Object(w.jsxs)("tr", {
                                                  children: [
                                                    Object(w.jsx)("td", {
                                                      children: "01/02/2020",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children:
                                                        "Amount for 10 Users",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children: "$150",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children: "378524",
                                                    }),
                                                  ],
                                                }),
                                                Object(w.jsxs)("tr", {
                                                  children: [
                                                    Object(w.jsx)("td", {
                                                      children: "01/02/2020",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children:
                                                        "Amount for 10 Users",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children: "$5900",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children: "378914",
                                                    }),
                                                  ],
                                                }),
                                                Object(w.jsxs)("tr", {
                                                  children: [
                                                    Object(w.jsx)("td", {
                                                      children: "01/02/2020",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children:
                                                        "Amount for 10 Users",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children: "$4200",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children: "378903",
                                                    }),
                                                  ],
                                                }),
                                                Object(w.jsxs)("tr", {
                                                  children: [
                                                    Object(w.jsx)("td", {
                                                      children: "01/02/2020",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children:
                                                        "Amount for 10 Users",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children: "$5900",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children: "378902",
                                                    }),
                                                  ],
                                                }),
                                                Object(w.jsxs)("tr", {
                                                  children: [
                                                    Object(w.jsx)("td", {
                                                      children: "01/02/2020",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children:
                                                        "Amount for 10 Users",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children: "$5900",
                                                    }),
                                                    Object(w.jsx)("td", {
                                                      children: "378902",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                      Object(w.jsx)("div", {
                        class: "modal fade get_paid_modal",
                        id: "staticBackdrop",
                        "data-backdrop": "static",
                        "data-keyboard": "false",
                        tabindex: "-1",
                        "aria-labelledby": "staticBackdropLabel",
                        "aria-hidden": "true",
                        children: Object(w.jsx)("div", {
                          class: "modal-dialog modal-dialog-centered modal-lg",
                          children: Object(w.jsxs)("div", {
                            class: "modal-content",
                            children: [
                              Object(w.jsxs)("div", {
                                class: "modal-header",
                                children: [
                                  Object(w.jsx)("h5", {
                                    class: "modal-title",
                                    id: "staticBackdropLabel",
                                    children: "Get Paid Now",
                                  }),
                                  Object(w.jsx)("button", {
                                    type: "button",
                                    class: "close",
                                    "data-dismiss": "modal",
                                    "aria-label": "Close",
                                    children: Object(w.jsx)("span", {
                                      "aria-hidden": "true",
                                      children: "\xd7",
                                    }),
                                  }),
                                ],
                              }),
                              Object(w.jsxs)("div", {
                                class: "modal-body",
                                children: [
                                  Object(w.jsxs)("div", {
                                    class: "available_balance",
                                    children: [
                                      Object(w.jsx)("h4", {
                                        children: "Available Balance:",
                                      }),
                                      Object(w.jsx)("p", {
                                        children: "$10900",
                                      }),
                                    ],
                                  }),
                                  Object(w.jsxs)("div", {
                                    class: "row align-items-baseline",
                                    children: [
                                      Object(w.jsx)("div", {
                                        class: "col-lg-6",
                                        children: Object(w.jsxs)("div", {
                                          class:
                                            "form-group mb_30 custom_select",
                                          children: [
                                            Object(w.jsx)("label", {
                                              class: "input_lable",
                                              children: "User Type",
                                            }),
                                            Object(w.jsxs)("select", {
                                              name: "",
                                              class: "form-control",
                                              children: [
                                                Object(w.jsx)("option", {
                                                  value: "",
                                                  children: "Other Admin",
                                                }),
                                                Object(w.jsx)("option", {
                                                  value: "",
                                                  children: "1",
                                                }),
                                                Object(w.jsx)("option", {
                                                  value: "",
                                                  children: "1",
                                                }),
                                                Object(w.jsx)("option", {
                                                  value: "",
                                                  children: "1",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      }),
                                      Object(w.jsx)("div", {
                                        class: "col-lg-6 mb_b",
                                        children: Object(w.jsx)("a", {
                                          href: "",
                                          class: "btn-link",
                                          title: "",
                                          children: "Add Bank Details",
                                        }),
                                      }),
                                    ],
                                  }),
                                  Object(w.jsxs)("div", {
                                    class: "form-group mb_30 col-7 pl-0",
                                    children: [
                                      Object(w.jsx)("label", {
                                        class: "input_lable",
                                        children: "Email address",
                                      }),
                                      Object(w.jsx)("input", {
                                        type: "text",
                                        name: "",
                                        class: "form-control",
                                        value: "",
                                        placeholder: "email@email.com",
                                      }),
                                    ],
                                  }),
                                  Object(w.jsxs)("div", {
                                    class: "remaining_balance mb-4",
                                    children: [
                                      Object(w.jsx)("h4", {
                                        children: "Remaining Balance:",
                                      }),
                                      Object(w.jsx)("p", { children: "$9900" }),
                                    ],
                                  }),
                                  Object(w.jsx)("button", {
                                    type: "submit",
                                    class: "theme_btn",
                                    children: "Get Paid",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                      }),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        $ = s(65),
        W = s.n($);
      function V(e, t, s, a) {
        return new Promise(function (r, n) {
          fetch(window.APIURL + t, {
            method: e,
            headers: { Authorization: a },
            body: s,
          })
            .then(function (e) {
              return e.json();
            })
            .then(
              function (e) {
                r(e);
              },
              function (e) {
                r(!1);
              }
            );
        });
      }
      var Z = s(64),
        K = (s(93), s(78)),
        Q = s(44),
        X = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s() {
            var e;
            Object(i.a)(this, s);
            for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
              r[n] = arguments[n];
            return (
              ((e = t.call.apply(t, [this].concat(r))).state = {
                fullName: "",
                email: { address: "" },
                password: "",
                confirmPassword: "",
                gender: "",
                role: "",
                dateOfBirth: "",
                presentDate: new Date(),
                selctedYear: "",
                userId: "",
                avatar: null,
                avatarToSend: "",
                avatarNameToSend: "",
                showAlert: !1,
                code: "",
                inviteLink: "",
                copied: !1,
                errors: "",
              }),
              (e.onChangeDob = function (t) {
                var s = Q(t).format("MM/DD/YYYY"),
                  a = t.getFullYear();
                e.setState({ dateOfBirth: s, selctedYear: a });
              }),
              (e.onChangeImage = (function () {
                var t = Object(b.a)(
                  m.a.mark(function t(s) {
                    var a;
                    return m.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (!(a = s.target.files)) {
                              t.next = 4;
                              break;
                            }
                            return (
                              e.setState({
                                avatar: URL.createObjectURL(a[0]),
                                avatarToSend: a[0],
                                avatarNameToSend: a[0].name,
                              }),
                              t.abrupt("return")
                            );
                          case 4:
                          case "end":
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })()),
              (e.onChange = function (t) {
                e.setState(Object(p.a)({}, t.target.name, t.target.value));
              }),
              (e.onChangeEmail = function (t) {
                e.setState({ email: { address: t.target.value } });
              }),
              (e.onSubmit = (function () {
                var t = Object(b.a)(
                  m.a.mark(function t(s) {
                    var a, r, n, c, i, l, o, d, h, j, u, b, p, x, f, O, v, g, w;
                    return m.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (
                              (s.preventDefault(),
                              (a = e.state),
                              (r = a.avatarToSend),
                              (n = a.avatarNameToSend),
                              (c = a.fullName),
                              (i = a.email),
                              (l = a.password),
                              (o = a.confirmPassword),
                              (d = a.gender),
                              (h = a.role),
                              (j = a.dateOfBirth),
                              (u = a.selctedYear),
                              a.errors,
                              (b = e.state.presentDate.getFullYear()),
                              (p = /^[a-z A-Z]+$/),
                              (x =
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
                              "" != c)
                            ) {
                              t.next = 9;
                              break;
                            }
                            e.setState({ errors: "Fullname is required!" }),
                              (t.next = 69);
                            break;
                          case 9:
                            if (c.match(p)) {
                              t.next = 13;
                              break;
                            }
                            e.setState({
                              errors:
                                "Invalid username (Only letters a-z allowed)!",
                            }),
                              (t.next = 69);
                            break;
                          case 13:
                            if ("" != i.address) {
                              t.next = 17;
                              break;
                            }
                            e.setState({
                              errors: "Email address is required!",
                            }),
                              (t.next = 69);
                            break;
                          case 17:
                            if (i.address.match(x)) {
                              t.next = 21;
                              break;
                            }
                            e.setState({ errors: "Invalid email address!" }),
                              (t.next = 69);
                            break;
                          case 21:
                            if ("" !== l) {
                              t.next = 25;
                              break;
                            }
                            e.setState({ errors: "Passowrd is required!" }),
                              (t.next = 69);
                            break;
                          case 25:
                            if (!(l.length < 8)) {
                              t.next = 29;
                              break;
                            }
                            e.setState({
                              errors:
                                "Password must have at-least 8 characters!",
                            }),
                              (t.next = 69);
                            break;
                          case 29:
                            if ("" !== o) {
                              t.next = 33;
                              break;
                            }
                            e.setState({
                              errors: "Password confirmation is required!",
                            }),
                              (t.next = 69);
                            break;
                          case 33:
                            if (l === o) {
                              t.next = 37;
                              break;
                            }
                            e.setState({ errors: "Password do not match!" }),
                              (t.next = 69);
                            break;
                          case 37:
                            if ("" != d) {
                              t.next = 41;
                              break;
                            }
                            e.setState({ errors: "Gender is required!" }),
                              (t.next = 69);
                            break;
                          case 41:
                            if ("" != h) {
                              t.next = 45;
                              break;
                            }
                            e.setState({ errors: "Role is required!" }),
                              (t.next = 69);
                            break;
                          case 45:
                            if ("" != j) {
                              t.next = 49;
                              break;
                            }
                            e.setState({
                              errors: "Date of birth is required!",
                            }),
                              (t.next = 69);
                            break;
                          case 49:
                            if (!(u >= b)) {
                              t.next = 53;
                              break;
                            }
                            e.setState({
                              errors: "Please select a valid date of birth!",
                            }),
                              (t.next = 69);
                            break;
                          case 53:
                            return (
                              e.setState({ errors: "" }),
                              (f = new K()),
                              (O = i.address),
                              r && f.append("avatar", r, n),
                              f.append("fullName", c),
                              f.append("emailAddress", O),
                              f.append("password", l),
                              f.append("gender", d),
                              f.append("role", h),
                              f.append("dateOfBirth", j),
                              (v = localStorage.getItem("LoginSession")),
                              (t.next = 66),
                              V("post", "api/auth/registerNewUser", f, v)
                            );
                          case 66:
                            (g = t.sent),
                              e.setState({ loaderActive: !1 }),
                              400 === g.status ||
                              401 === g.status ||
                              402 === g.status
                                ? e.setState({ errors: g.message })
                                : 200 === g.status
                                ? (e.setState({ code: g.code, showAlert: !0 }),
                                  (w = ""
                                    .concat(window.APPURL, "invite/")
                                    .concat(e.state.code)),
                                  e.setState({ inviteLink: w }))
                                : 500 === g.status &&
                                  e.setState({ errors: g.message });
                          case 69:
                          case "end":
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })()),
              (e.handleClose = function () {
                e.props.history.push("/admin/Listing/all"),
                  e.setState({ showAlert: !1 });
              }),
              e
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "componentDidMount",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e() {
                      var t;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                f()("body").removeClass("transparent-header"),
                                  f()("html, body").animate(
                                    { scrollTop: 0 },
                                    "slow"
                                  ),
                                  (t = JSON.parse(
                                    localStorage.getItem("accessToken")
                                  )) && this.setState({ userId: t.id });
                              case 4:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "render",
                value: function () {
                  var e = this;
                  return Object(w.jsxs)("div", {
                    children: [
                      Object(w.jsx)(v.a, {}),
                      Object(w.jsx)("section", {
                        className: "login_wraper",
                        children: Object(w.jsxs)("div", {
                          className: "container-fluid",
                          children: [
                            Object(w.jsxs)("div", {
                              className: "row align-items-center",
                              children: [
                                Object(w.jsx)("div", {
                                  className:
                                    "col-xl- col-lg-7 col-md-7 col-sm-12 border-r",
                                  children: Object(w.jsxs)("div", {
                                    className: "login-content",
                                    children: [
                                      Object(w.jsx)("h2", {
                                        className: "text-center",
                                        children: "REGISTER NOW",
                                      }),
                                      Object(w.jsx)("h3", {
                                        children:
                                          "How well do you really know your friends if you don't know their goals?",
                                      }),
                                      Object(w.jsx)("p", {
                                        children:
                                          "Keep up with your friend\u2019s life goals and enjoy helping them!",
                                      }),
                                      Object(w.jsx)("img", {
                                        src: "assets/images/login_img.png",
                                        className: "img-fluid mt-5",
                                        alt: "",
                                      }),
                                    ],
                                  }),
                                }),
                                Object(w.jsx)("div", {
                                  className:
                                    "col-xl-4 col-lg-5 col-md-5 col-sm-12",
                                  children: Object(w.jsx)("div", {
                                    "accept-charset": "utf-8",
                                    children: Object(w.jsxs)("div", {
                                      className: "form_inner_box",
                                      children: [
                                        Object(w.jsxs)("div", {
                                          className: "form-group mb_30",
                                          children: [
                                            Object(w.jsx)("label", {
                                              className: "input_lable",
                                              children: "Full Name",
                                            }),
                                            Object(w.jsx)("input", {
                                              type: "text",
                                              value: this.state.fullName,
                                              onChange: this.onChange,
                                              name: "fullName",
                                              className: "form-control",
                                              placeholder: "Full Name",
                                            }),
                                          ],
                                        }),
                                        Object(w.jsxs)("div", {
                                          className: "form-group mb_30",
                                          children: [
                                            Object(w.jsx)("label", {
                                              className: "input_lable",
                                              children: "Email address",
                                            }),
                                            Object(w.jsx)("input", {
                                              type: "email",
                                              value: this.state.email.address,
                                              onChange: this.onChangeEmail,
                                              name: "email",
                                              className: "form-control",
                                              placeholder: "email@email.com",
                                            }),
                                          ],
                                        }),
                                        Object(w.jsxs)("div", {
                                          className: "form-group",
                                          children: [
                                            Object(w.jsx)("label", {
                                              className: "input_lable",
                                              children: "Password",
                                            }),
                                            Object(w.jsx)("input", {
                                              type: "password",
                                              value: this.state.password,
                                              onChange: this.onChange,
                                              name: "password",
                                              className: "form-control",
                                              placeholder: "********",
                                            }),
                                          ],
                                        }),
                                        Object(w.jsxs)("div", {
                                          className: "form-group",
                                          children: [
                                            Object(w.jsx)("label", {
                                              className: "input_lable",
                                              children: "Confirm Password",
                                            }),
                                            Object(w.jsx)("input", {
                                              type: "password",
                                              value: this.state.confirmPassword,
                                              onChange: this.onChange,
                                              name: "confirmPassword",
                                              placeholder: "********",
                                              className: "form-control",
                                            }),
                                          ],
                                        }),
                                        Object(w.jsxs)("div", {
                                          className: "form-group",
                                          children: [
                                            Object(w.jsx)("label", {
                                              className: "input_lable",
                                              children: "Gender",
                                            }),
                                            Object(w.jsxs)("select", {
                                              className: "form-control",
                                              name: "gender",
                                              value: this.state.gender,
                                              onChange: this.onChange,
                                              children: [
                                                Object(w.jsx)("option", {
                                                  value: "",
                                                  children:
                                                    "Select Your Gender",
                                                }),
                                                Object(w.jsx)("option", {
                                                  value: "Male",
                                                  children: "Male",
                                                }),
                                                Object(w.jsx)("option", {
                                                  value: "Female",
                                                  children: "Female",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        Object(w.jsxs)("div", {
                                          className: "form-group",
                                          children: [
                                            Object(w.jsx)("label", {
                                              className: "input_lable",
                                              children: "Date of Birth",
                                            }),
                                            Object(w.jsx)(W.a, {
                                              className: "form-control",
                                              name: "dateOfBirth",
                                              id: "datepicker",
                                              value: this.state.dateOfBirth,
                                              onChange: function (t) {
                                                return e.onChangeDob(t);
                                              },
                                            }),
                                          ],
                                        }),
                                        Object(w.jsxs)("div", {
                                          className: "form-group",
                                          children: [
                                            Object(w.jsx)("label", {
                                              className: "input_lable",
                                              children: "Role",
                                            }),
                                            Object(w.jsxs)("select", {
                                              className: "form-control",
                                              name: "role",
                                              value: this.state.role,
                                              onChange: this.onChange,
                                              children: [
                                                Object(w.jsx)("option", {
                                                  value: "",
                                                  children: "Select Your Role",
                                                }),
                                                Object(w.jsx)("option", {
                                                  value: "Admin",
                                                  children: "Admin",
                                                }),
                                                Object(w.jsx)("option", {
                                                  value: "Affiliate",
                                                  children: "Affiliate",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        Object(w.jsxs)("div", {
                                          className: "profile_container",
                                          children: [
                                            Object(w.jsx)("div", {
                                              className: "profile_pic_upload",
                                              children:
                                                null == this.state.avatar
                                                  ? Object(w.jsx)("img", {
                                                      src: "assets/images/profile_img.png",
                                                      className: "img-fluid",
                                                      alt: "",
                                                    })
                                                  : Object(w.jsx)("img", {
                                                      src: this.state.avatar,
                                                      className: "img-fluid",
                                                      alt: "",
                                                    }),
                                            }),
                                            Object(w.jsxs)("div", {
                                              className: "file-input",
                                              style: { marginTop: "32px" },
                                              children: [
                                                Object(w.jsx)("input", {
                                                  type: "file",
                                                  name: "avatar",
                                                  id: "file-input",
                                                  className:
                                                    "file-input__input",
                                                  onChange: this.onChangeImage,
                                                }),
                                                Object(w.jsx)("label", {
                                                  className:
                                                    "file-input__label",
                                                  for: "file-input",
                                                  children: Object(w.jsx)(
                                                    "span",
                                                    {
                                                      style: {
                                                        fontSize: "14px",
                                                      },
                                                      children: "Upload file",
                                                    }
                                                  ),
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        Object(w.jsx)("div", {
                                          className: "iagree_radio",
                                          children: Object(w.jsx)("span", {
                                            className: "error",
                                            id: "iagree_to_be_contacted_error",
                                            style: { display: "none" },
                                            children:
                                              "please accept our terms of business",
                                          }),
                                        }),
                                        Object(w.jsx)("div", {
                                          children: this.state.errors
                                            ? Object(w.jsx)("div", {
                                                style: { color: "#FE6E00" },
                                                className: "alert alert-danger",
                                                children: this.state.errors,
                                              })
                                            : "",
                                        }),
                                        Object(w.jsx)("div", {
                                          className: "buttonContainer",
                                          style: { marginTop: "20px" },
                                          children: Object(w.jsx)("button", {
                                            type: "button",
                                            onClick: function (t) {
                                              e.onSubmit(t);
                                            },
                                            className:
                                              "theme_btn text-center d-flex mx-auto",
                                            children: "Register",
                                          }),
                                        }),
                                      ],
                                    }),
                                  }),
                                }),
                              ],
                            }),
                            Object(w.jsxs)(M.a, {
                              show: this.state.showAlert,
                              onHide: this.handleClose,
                              children: [
                                Object(w.jsx)(M.a.Body, {
                                  children: Object(w.jsxs)(D.a, {
                                    variant: "success",
                                    children: [
                                      Object(w.jsxs)("p", {
                                        children: [
                                          "Celebrity code is",
                                          Object(w.jsxs)("b", {
                                            children: [
                                              " ",
                                              this.state.inviteLink,
                                            ],
                                          }),
                                          "!!",
                                        ],
                                      }),
                                      Object(w.jsx)("hr", {}),
                                      Object(w.jsx)(Z.CopyToClipboard, {
                                        text: this.state.inviteLink,
                                        onCopy: function () {
                                          return e.setState({ copied: !0 });
                                        },
                                        children: Object(w.jsx)("div", {
                                          style: {
                                            position: "absolute",
                                            marginLeft: "24rem",
                                            bottom: "2.7rem",
                                          },
                                          children: Object(w.jsx)("i", {
                                            class: "fa fa-copy",
                                            style: { color: "grey" },
                                          }),
                                        }),
                                      }),
                                      this.state.copied
                                        ? Object(w.jsx)("div", {
                                            style: {
                                              color: "red",
                                              fontSize: "12px",
                                              left: "25.1rem",
                                              top: "3.6rem",
                                              position: "absolute",
                                            },
                                            children: "Copied.",
                                          })
                                        : null,
                                    ],
                                  }),
                                }),
                                Object(w.jsx)(M.a.Footer, {
                                  children: Object(w.jsx)(T.a, {
                                    variant: "primary",
                                    onClick: this.handleClose,
                                    style: { alignItems: "center" },
                                    children: "OK",
                                  }),
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        ee = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s(e) {
            var a;
            return (
              Object(i.a)(this, s),
              ((a = t.call(this, e)).state = {
                currentMonthUsers: "",
                LastMonthUser: "",
                lastYearUsers: "",
                series: [{ data: [] }],
                options: {
                  colors: [
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                    "#3A0652",
                  ],
                  chart: {
                    height: 350,
                    type: "bar",
                    events: { click: function (e, t, s) {} },
                  },
                  plotOptions: { bar: { columnWidth: "45%", distributed: !0 } },
                  dataLabels: { enabled: !1 },
                  legend: { show: !1 },
                  xaxis: {
                    categories: [
                      ["Jan", ""],
                      ["Feb", ""],
                      ["March", ""],
                      "April",
                      ["May", ""],
                      ["June", ""],
                      ["July", ""],
                      ["Aug", ""],
                      ["Sep", ""],
                      ["Oct", ""],
                      ["Nov", ""],
                      ["Dec", ""],
                    ],
                    labels: { style: { fontSize: "12px" } },
                  },
                },
              }),
              a
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "componentWillMount",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e() {
                      var t, s;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  f()("body").removeClass(
                                    "transparent-headesssr"
                                  ),
                                  f()("html, body").animate(
                                    { scrollTop: 0 },
                                    "slow"
                                  ),
                                  JSON.parse(
                                    localStorage.getItem("accessToken")
                                  ),
                                  (t = localStorage.getItem("LoginSession")),
                                  this.setState({ loaderActive: !0 }),
                                  (e.next = 7),
                                  g(
                                    "get",
                                    "api/affiliate/CurrentYearAffiliates",
                                    "",
                                    t
                                  )
                                );
                              case 7:
                                (s = e.sent) &&
                                  (200 == s.status
                                    ? this.setState({
                                        series: [{ data: s.currentYearUsers }],
                                      })
                                    : this.setState({ errors: s.message }));
                              case 9:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "render",
                value: function () {
                  return Object(w.jsx)(E.a, {
                    options: this.state.options,
                    series: this.state.series,
                    type: "bar",
                    height: 350,
                  });
                },
              },
            ]),
            s
          );
        })(r.a.Component),
        te = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s(e) {
            var a;
            return (
              Object(i.a)(this, s),
              ((a = t.call(this, e)).state = {
                currentMonthUsers: "",
                LastMonthUser: "",
                lastYearUsers: "",
                series: [{ data: [] }],
                options: {
                  colors: ["#A69BA1", "#008FFB", "#FEB019"],
                  chart: {
                    height: 350,
                    type: "bar",
                    events: { click: function (e, t, s) {} },
                  },
                  plotOptions: { bar: { columnWidth: "45%", distributed: !0 } },
                  dataLabels: { enabled: !1 },
                  legend: { show: !1 },
                  xaxis: {
                    categories: [
                      ["", ""],
                      ["", ""],
                      ["", ""],
                    ],
                    labels: { style: { fontSize: "12px" } },
                  },
                },
              }),
              a
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "componentDidMount",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e() {
                      var t, s, a, r, n, c;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  f()("body").removeClass(
                                    "transparent-headesssr"
                                  ),
                                  f()("html, body").animate(
                                    { scrollTop: 0 },
                                    "slow"
                                  ),
                                  (t = localStorage.getItem("LoginSession")),
                                  (e.next = 5),
                                  g("get", "api/affiliate/PiChartData", "", t)
                                );
                              case 5:
                                (s = e.sent) &&
                                  (200 == s.status
                                    ? ((a = s.currentMonthUsers),
                                      (r = s.LastMonthUsers),
                                      (n = s.lastYearUsers),
                                      this.setState({
                                        currentMonthUsers: a,
                                        LastMonthUser: r,
                                        lastYearUsers: n,
                                      }),
                                      (c = [{ data: [a, r, n] }]),
                                      this.setState({ series: c }))
                                    : this.setState({ errors: s.message }));
                              case 7:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "render",
                value: function () {
                  return Object(w.jsxs)("div", {
                    children: [
                      Object(w.jsx)(E.a, {
                        options: this.state.options,
                        series: this.state.series,
                        type: "bar",
                        height: 350,
                      }),
                      Object(w.jsx)("div", {
                        className: "chart_value",
                        children: Object(w.jsxs)("ul", {
                          children: [
                            Object(w.jsxs)("li", {
                              children: [
                                Object(w.jsx)("h5", {
                                  className: "text_blue",
                                  children: this.state.currentMonthUsers,
                                }),
                                Object(w.jsx)("p", {
                                  children: "Current Month",
                                }),
                              ],
                            }),
                            Object(w.jsxs)("li", {
                              children: [
                                Object(w.jsx)("h5", {
                                  className: "text_info",
                                  children: this.state.LastMonthUser,
                                }),
                                Object(w.jsx)("p", { children: "Last Month" }),
                              ],
                            }),
                            Object(w.jsxs)("li", {
                              children: [
                                Object(w.jsx)("h5", {
                                  className: "text_orange",
                                  children: this.state.lastYearUsers,
                                }),
                                Object(w.jsx)("p", { children: "Last Year" }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(r.a.Component),
        se = s(44),
        ae = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s(e) {
            var a;
            return (
              Object(i.a)(this, s),
              ((a = t.call(this, e)).state = {
                currentMonthUsers: "",
                LastMonthUser: "",
                lastYearUsers: "",
                series: [{ data: [] }],
                options: {
                  colors: ["#578C4D"],
                  chart: {
                    height: 350,
                    type: "bar",
                    events: { click: function (e, t, s) {} },
                  },
                  plotOptions: { bar: { columnWidth: "45%", distributed: !0 } },
                  dataLabels: { enabled: !1 },
                  legend: { show: !1 },
                  xaxis: {
                    categories: [
                      ["1", ""],
                      ["2", ""],
                      ["3", ""],
                      ["4", ""],
                      ["5", ""],
                      ["6", ""],
                      ["7", ""],
                      ["8", ""],
                      ["9", ""],
                      ["10", ""],
                      ["11", ""],
                      ["12", ""],
                      ["13", ""],
                      ["12", ""],
                      ["14", ""],
                      ["15", ""],
                      ["16", ""],
                      ["17", ""],
                      ["18", ""],
                      ["19", ""],
                      ["20", ""],
                      ["21", ""],
                      ["22", ""],
                      ["23", ""],
                      ["24", ""],
                      ["25", ""],
                      ["26", ""],
                      ["27", ""],
                      ["28", ""],
                      ["29", ""],
                      ["30", ""],
                      ["31", ""],
                    ],
                    labels: { style: { fontSize: "12px" } },
                  },
                },
              }),
              a
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "componentDidMount",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e() {
                      var t, s, a, r, n, c, i, l, o, d;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  f()("body").removeClass(
                                    "transparent-headesssr"
                                  ),
                                  f()("html, body").animate(
                                    { scrollTop: 0 },
                                    "slow"
                                  ),
                                  (t = Date.now()),
                                  (s = se(t).format()),
                                  (a = parseInt(s.toString().substr(8, 2))),
                                  JSON.parse(
                                    localStorage.getItem("accessToken")
                                  ),
                                  (r = localStorage.getItem("LoginSession")),
                                  this.setState({ loaderActive: !0 }),
                                  (e.next = 10),
                                  g(
                                    "get",
                                    "api/affiliate/affiliatesInThisMonth",
                                    "",
                                    r
                                  )
                                );
                              case 10:
                                if ((n = e.sent))
                                  if (200 == n.status) {
                                    for (
                                      c = a - n.affiliatesListings.length - 1,
                                        i = [],
                                        l = 0;
                                      l <= c;
                                      l++
                                    )
                                      i.push(0);
                                    for (
                                      o = [], d = 0;
                                      d < n.affiliatesListings.length - 1;
                                      d++
                                    )
                                      o.push(n.affiliatesListings[d][1]);
                                    i.push.apply(i, o),
                                      this.setState({ series: [{ data: i }] });
                                  } else this.setState({ errors: n.message });
                              case 12:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "render",
                value: function () {
                  return Object(w.jsx)(E.a, {
                    options: this.state.options,
                    series: this.state.series,
                    type: "line",
                    height: 350,
                  });
                },
              },
            ]),
            s
          );
        })(r.a.Component),
        re = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s() {
            var e;
            Object(i.a)(this, s);
            for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
              r[n] = arguments[n];
            return (
              ((e = t.call.apply(t, [this].concat(r))).state = {
                id: "",
                loaderActive: !1,
                errors: "",
              }),
              e
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "render",
                value: function () {
                  return Object(w.jsx)("div", {
                    id: "content-wrapper",
                    className:
                      "d-flex align-items-center justify-content-centers",
                    children: Object(w.jsxs)("div", {
                      className: "container-fluid",
                      children: [
                        Object(w.jsx)("h4", {
                          className: "main_title mb-4",
                          children: "Dashboard",
                        }),
                        Object(w.jsxs)("div", {
                          className: "row",
                          children: [
                            Object(w.jsx)("div", {
                              className: "col-lg-4 col-md-6 col-sm-12",
                              children: Object(w.jsxs)("div", {
                                className: "chart_item",
                                children: [
                                  Object(w.jsx)("h4", {
                                    className: "sub_title",
                                    children: "Monthly Report",
                                  }),
                                  Object(w.jsxs)("div", {
                                    className: "chart_img text-center mt-3",
                                    style: { paddingTop: "3.5rem" },
                                    children: [" ", Object(w.jsx)(ae, {}), ""],
                                  }),
                                ],
                              }),
                            }),
                            Object(w.jsx)("div", {
                              className: "col-lg-4 col-md-6 col-sm-12",
                              children: Object(w.jsxs)("div", {
                                className: "chart_item",
                                children: [
                                  Object(w.jsx)("h4", {
                                    className: "sub_title",
                                    children: "History",
                                  }),
                                  Object(w.jsxs)("div", {
                                    className: "chart_img text-center mt-3",
                                    children: [Object(w.jsx)(te, {}), " "],
                                  }),
                                ],
                              }),
                            }),
                            Object(w.jsx)("div", {
                              className: "col-lg-4 col-md-6 col-sm-12",
                              children: Object(w.jsxs)("div", {
                                className: "chart_item",
                                children: [
                                  Object(w.jsx)("h4", {
                                    className: "sub_title",
                                    children: "Yearly Report",
                                  }),
                                  Object(w.jsx)("div", {
                                    className: "chart_img text-center mt-3",
                                    style: { paddingTop: "3.5rem" },
                                    children: Object(w.jsx)(ee, {}),
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        ne = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s() {
            var e;
            Object(i.a)(this, s);
            for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
              r[n] = arguments[n];
            return ((e = t.call.apply(t, [this].concat(r))).state = {}), e;
          }
          return (
            Object(l.a)(s, [
              {
                key: "render",
                value: function () {
                  return Object(w.jsx)("div", {
                    children: Object(w.jsx)("div", {
                      id: "content-wrapper",
                      children: Object(w.jsxs)("div", {
                        className: "container-fluid",
                        children: [
                          Object(w.jsx)("h4", {
                            className: "main_title",
                            children: "Profile",
                          }),
                          Object(w.jsxs)("div", {
                            className: "Profile_inner",
                            children: [
                              Object(w.jsx)("h3", {
                                className: "",
                                children: "Admin",
                              }),
                              Object(w.jsxs)("div", {
                                className: "profile_img_upload",
                                children: [
                                  Object(w.jsx)("div", {
                                    className: "img_upload_wrper",
                                    children: Object(w.jsx)("img", {
                                      src: "assets/images/profile_img.png",
                                      className: "img-fluid",
                                      alt: "",
                                    }),
                                  }),
                                  Object(w.jsxs)("div", {
                                    className: "button_upload",
                                    children: [
                                      Object(w.jsxs)("div", {
                                        className: "file-input",
                                        children: [
                                          Object(w.jsx)("input", {
                                            type: "file",
                                            name: "file-input",
                                            id: "file-input",
                                            className: "file-input__input",
                                          }),
                                          Object(w.jsx)("label", {
                                            className: "file-input__label",
                                            for: "file-input",
                                            children: Object(w.jsx)("span", {
                                              children: "Upload file",
                                            }),
                                          }),
                                        ],
                                      }),
                                      Object(w.jsx)("p", {
                                        children:
                                          "Acceptable formats JPEG and PNG only. Max file size is 5 mb.",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              Object(w.jsxs)("form", {
                                action: "profile_submit",
                                method: "get",
                                "accept-charset": "utf-8",
                                children: [
                                  Object(w.jsxs)("div", {
                                    className: "row",
                                    children: [
                                      Object(w.jsxs)("div", {
                                        className:
                                          "col-lg-6 col-md-6 col-sm-12",
                                        children: [
                                          Object(w.jsxs)("div", {
                                            className: "form-group mb_30",
                                            children: [
                                              Object(w.jsx)("label", {
                                                className: "input_lable",
                                                children: "First Name",
                                              }),
                                              Object(w.jsx)("input", {
                                                type: "text",
                                                name: "",
                                                className: "form-control",
                                                value: "",
                                                placeholder: "John",
                                              }),
                                            ],
                                          }),
                                          Object(w.jsxs)("div", {
                                            className: "form-group mb_30",
                                            children: [
                                              Object(w.jsx)("label", {
                                                className: "input_lable",
                                                children: "Email address",
                                              }),
                                              Object(w.jsx)("input", {
                                                type: "text",
                                                name: "",
                                                className: "form-control",
                                                value: "",
                                                placeholder: "email@email.com",
                                              }),
                                            ],
                                          }),
                                          Object(w.jsxs)("div", {
                                            className: "form-group mb_30",
                                            children: [
                                              Object(w.jsx)("label", {
                                                className: "input_lable",
                                                children: "Confirm Password",
                                              }),
                                              Object(w.jsx)("input", {
                                                type: "Password",
                                                name: "",
                                                className: "form-control",
                                                value: "",
                                                placeholder: "Confirm Password",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      Object(w.jsxs)("div", {
                                        className:
                                          "col-lg-6 col-md-6 col-sm-12",
                                        children: [
                                          Object(w.jsxs)("div", {
                                            className: "form-group mb_30",
                                            children: [
                                              Object(w.jsx)("label", {
                                                className: "input_lable",
                                                children: "Last Name",
                                              }),
                                              Object(w.jsx)("input", {
                                                type: "text",
                                                name: "",
                                                className: "form-control",
                                                value: "",
                                                placeholder: "Quill",
                                              }),
                                            ],
                                          }),
                                          Object(w.jsxs)("div", {
                                            className: "form-group mb_30",
                                            children: [
                                              Object(w.jsx)("label", {
                                                className: "input_lable",
                                                children: "Password",
                                              }),
                                              Object(w.jsx)("input", {
                                                type: "Password",
                                                name: "",
                                                className: "form-control",
                                                value: "",
                                                placeholder: "*************",
                                              }),
                                            ],
                                          }),
                                          Object(w.jsxs)("div", {
                                            className: "form-group mb_30",
                                            children: [
                                              Object(w.jsx)("label", {
                                                className: "input_lable",
                                                children: "Affiliate Code",
                                              }),
                                              Object(w.jsx)("input", {
                                                type: "text",
                                                name: "",
                                                className: "form-control",
                                                value: "",
                                                placeholder: "017e629hw770kj",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  Object(w.jsx)("button", {
                                    type: "submit",
                                    className: "theme_btn text-center",
                                    children: "Save",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        ce = s(78),
        ie = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s() {
            var e;
            Object(i.a)(this, s);
            for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
              r[n] = arguments[n];
            return (
              ((e = t.call.apply(t, [this].concat(r))).state = {
                fullName: "",
                email: { address: "" },
                oldPassword: "",
                editedOldPassword: "",
                newPassword: "",
                confirmPassword: "",
                inviteCode: "",
                selectedAvatar: "",
                avatar: "",
                avatarName: "",
                avatarToSend: "",
                avatarNameToSend: "",
                userId: "",
                errors: "",
                passwordErrors: "",
                loaderActive: !1,
                show: !1,
                showAlert: !1,
              }),
              (e.onChange = function (t) {
                e.setState(Object(p.a)({}, t.target.name, t.target.value));
              }),
              (e.onChangeImage = (function () {
                var t = Object(b.a)(
                  m.a.mark(function t(s) {
                    var a;
                    return m.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (!(a = s.target.files)) {
                              t.next = 4;
                              break;
                            }
                            return (
                              e.setState({
                                selectedAvatar: URL.createObjectURL(a[0]),
                                avatarToSend: a[0],
                                avatarNameToSend: a[0].name,
                              }),
                              t.abrupt("return")
                            );
                          case 4:
                          case "end":
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })()),
              (e.onSubmit = (function () {
                var t = Object(b.a)(
                  m.a.mark(function t(s) {
                    var a, r, n, c, i, l, o, d, h, j, u, b, p;
                    return m.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (
                              (s.preventDefault(),
                              (a = e.state),
                              (r = a.fullName),
                              (n = a.email),
                              (c = a.inviteCode),
                              (i = a.avatarToSend),
                              (l = a.avatarNameToSend),
                              (o = /^[a-z A-Z]+$/),
                              (d =
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
                              "" != r)
                            ) {
                              t.next = 8;
                              break;
                            }
                            e.setState({ errors: "Fullname is required!" }),
                              (t.next = 49);
                            break;
                          case 8:
                            if (r.match(o)) {
                              t.next = 12;
                              break;
                            }
                            e.setState({
                              errors:
                                "Invalid username (Only letters a-z allowed)!",
                            }),
                              (t.next = 49);
                            break;
                          case 12:
                            if ("" != n.address) {
                              t.next = 16;
                              break;
                            }
                            e.setState({
                              errors: "Email address is required!",
                            }),
                              (t.next = 49);
                            break;
                          case 16:
                            if (n.address.match(d)) {
                              t.next = 20;
                              break;
                            }
                            e.setState({ errors: "Invalid email address!" }),
                              (t.next = 49);
                            break;
                          case 20:
                            if ("" != c) {
                              t.next = 24;
                              break;
                            }
                            e.setState({ errors: "Code!" }), (t.next = 49);
                            break;
                          case 24:
                            return (
                              (h = e.props.match),
                              (j = h.params.id),
                              e.setState({ errors: "" }),
                              (u = new ce()).append("name", r),
                              "" === i
                                ? u.append("avatar", l)
                                : u.append("avatar", i, l),
                              (b = localStorage.getItem("LoginSession")),
                              (t.next = 33),
                              V(
                                "put",
                                "api/affiliate/editProfile/".concat(j),
                                u,
                                b
                              )
                            );
                          case 33:
                            if (
                              ((p = t.sent),
                              e.setState({ loaderActive: !1 }),
                              401 !== p.status &&
                                402 !== p.status &&
                                400 !== p.status)
                            ) {
                              t.next = 39;
                              break;
                            }
                            e.setState({ errors: p.message }), (t.next = 49);
                            break;
                          case 39:
                            if (201 !== p.status) {
                              t.next = 46;
                              break;
                            }
                            localStorage.removeItem("avatar"),
                              localStorage.setItem("avatar", l),
                              O.notify.show(
                                "Profile updated successfully!!",
                                "success",
                                6e3
                              ),
                              window.location.reload(),
                              (t.next = 49);
                            break;
                          case 46:
                            if (500 !== p.status) {
                              t.next = 49;
                              break;
                            }
                            return (
                              e.setState({ errors: p.message }),
                              t.abrupt("return")
                            );
                          case 49:
                          case "end":
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })()),
              (e.handleOpen = function () {
                e.setState({ show: !0 });
              }),
              (e.handleClose1 = function () {
                e.setState({ show: !1, showAlert: !1 });
              }),
              (e.onUpdatePassword = function (t) {
                e.onPasswordSubmit(t);
              }),
              (e.successAlert = function () {
                e.setState({ showAlert: !1 }), window.location.reload();
              }),
              e
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "componentDidMount",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e() {
                      var t, s, a, r, n;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  (f()("body").removeClass(
                                    "transparent-headesssr"
                                  ),
                                  f()("html, body").animate(
                                    { scrollTop: 0 },
                                    "slow"
                                  ),
                                  (t = this.props.match),
                                  (s = t.params.id),
                                  (a = JSON.parse(
                                    localStorage.getItem("accessToken")
                                  )),
                                  (r = localStorage.getItem("LoginSession")),
                                  !a)
                                ) {
                                  e.next = 18;
                                  break;
                                }
                                return (
                                  this.setState({ loaderActive: !0 }),
                                  (e.next = 10),
                                  g(
                                    "get",
                                    "api/affiliate/Profile/".concat(s),
                                    "",
                                    r
                                  )
                                );
                              case 10:
                                (n = e.sent).user.avatar &&
                                  this.setState({
                                    loaderActive: !1,
                                    avatar: n.user.avatar,
                                  }),
                                  this.setState({ loaderActive: !1 }),
                                  this.setState({
                                    loaderActive: !1,
                                    fullName: n.user.name,
                                    email: { address: n.user.email.address },
                                    oldPassword: n.password,
                                    inviteCode: n.user.inviteCode,
                                  }),
                                  200 == n.status &&
                                    (n.user
                                      ? this.setState({ user: n.user })
                                      : this.props.history.push({
                                          pathname: "/",
                                          state: { key: "value" },
                                        })),
                                  this.setState({ userId: a.id }),
                                  (e.next = 19);
                                break;
                              case 18:
                                this.props.history.push({
                                  pathname: "/login",
                                  state: { key: "value" },
                                });
                              case 19:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "onPasswordSubmit",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e(t) {
                      var s, a, r, n, c, i, l, o, d, h;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  (t.preventDefault(),
                                  (s = this.state),
                                  (a = s.editedOldPassword),
                                  (r = s.newPassword),
                                  (n = s.confirmPassword),
                                  (c = s.oldPassword),
                                  "" !== a)
                                ) {
                                  e.next = 6;
                                  break;
                                }
                                this.setState({
                                  passwordErrors:
                                    "Please enter your old password!",
                                }),
                                  (e.next = 50);
                                break;
                              case 6:
                                if (!(a.length < 8)) {
                                  e.next = 10;
                                  break;
                                }
                                this.setState({
                                  passwordErrors:
                                    "Password must have at-least 8 characters!",
                                }),
                                  (e.next = 50);
                                break;
                              case 10:
                                if ("" !== r) {
                                  e.next = 14;
                                  break;
                                }
                                this.setState({
                                  passwordErrors:
                                    "Please enter your new password!",
                                }),
                                  (e.next = 50);
                                break;
                              case 14:
                                if (!(r.length < 8)) {
                                  e.next = 18;
                                  break;
                                }
                                this.setState({
                                  passwordErrors:
                                    "Password must have at-least 8 characters!",
                                }),
                                  (e.next = 50);
                                break;
                              case 18:
                                if ("" !== n) {
                                  e.next = 22;
                                  break;
                                }
                                this.setState({
                                  passwordErrors:
                                    "Password confirmation is required!",
                                }),
                                  (e.next = 50);
                                break;
                              case 22:
                                if (r === n) {
                                  e.next = 26;
                                  break;
                                }
                                this.setState({
                                  passwordErrors: "Password does not match!",
                                }),
                                  (e.next = 50);
                                break;
                              case 26:
                                if (a === c) {
                                  e.next = 30;
                                  break;
                                }
                                this.setState({
                                  passwordErrors:
                                    "You entered incorect old password!",
                                }),
                                  (e.next = 50);
                                break;
                              case 30:
                                return (
                                  (i = this.props.match),
                                  (l = i.params.id),
                                  this.setState({ errors: "" }),
                                  (o = { password: r }),
                                  (d = localStorage.getItem("LoginSession")),
                                  (e.next = 37),
                                  g(
                                    "post",
                                    "api/affiliate/editPassword/".concat(l),
                                    o,
                                    d
                                  )
                                );
                              case 37:
                                if (
                                  ((h = e.sent),
                                  this.setState({ loaderActive: !1 }),
                                  401 !== h.status &&
                                    402 !== h.status &&
                                    400 !== h.status)
                                ) {
                                  e.next = 43;
                                  break;
                                }
                                this.setState({ errors: h.message }),
                                  (e.next = 50);
                                break;
                              case 43:
                                if (200 !== h.status) {
                                  e.next = 47;
                                  break;
                                }
                                this.setState({ show: !1, showAlert: !0 }),
                                  (e.next = 50);
                                break;
                              case 47:
                                if (500 !== h.status) {
                                  e.next = 50;
                                  break;
                                }
                                return (
                                  this.setState({ errors: h.message }),
                                  e.abrupt("return")
                                );
                              case 50:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "render",
                value: function () {
                  var e = this;
                  return Object(w.jsxs)("div", {
                    children: [
                      " ",
                      this.state.loaderActive
                        ? Object(w.jsx)("div", {
                            className: "inlineLoaderGif",
                            children: Object(w.jsx)("img", {
                              src: k,
                              alt: "broken",
                            }),
                          })
                        : "",
                      " ",
                      Object(w.jsxs)("div", {
                        id: "content-wrapper",
                        children: [
                          Object(w.jsx)(v.a, {}),
                          Object(w.jsxs)("div", {
                            className: "container-fluid",
                            children: [
                              Object(w.jsx)("h4", {
                                className: "main_title",
                                children: "Profile",
                              }),
                              Object(w.jsxs)("div", {
                                className: "Profile_inner",
                                children: [
                                  Object(w.jsx)("h3", {
                                    className: "",
                                    children: "Admin",
                                  }),
                                  Object(w.jsxs)("div", {
                                    className: "profile_img_upload",
                                    children: [
                                      Object(w.jsx)("div", {
                                        className: "img_upload_wrper",
                                        children:
                                          "" == this.state.selectedAvatar
                                            ? "" == this.state.avatar
                                              ? Object(w.jsx)("img", {
                                                  src: "assets/images/profile_img.png",
                                                  className: "img-fluid",
                                                  alt: "",
                                                })
                                              : Object(w.jsx)("img", {
                                                  src:
                                                    window.APIURL +
                                                    this.state.avatar,
                                                  className: "img-fluid",
                                                  alt: "",
                                                })
                                            : Object(w.jsx)("img", {
                                                src: this.state.selectedAvatar,
                                                className: "img-fluid",
                                                alt: "",
                                              }),
                                      }),
                                      Object(w.jsxs)("div", {
                                        className: "button_upload",
                                        children: [
                                          Object(w.jsxs)("div", {
                                            className: "file-input",
                                            children: [
                                              Object(w.jsx)("input", {
                                                type: "file",
                                                name: "avatar",
                                                id: "file-input",
                                                className: "file-input__input",
                                                onChange: this.onChangeImage,
                                              }),
                                              Object(w.jsx)("label", {
                                                className: "file-input__label",
                                                for: "file-input",
                                                children: Object(w.jsx)(
                                                  "span",
                                                  { children: "Upload file" }
                                                ),
                                              }),
                                            ],
                                          }),
                                          Object(w.jsxs)("p", {
                                            children: [
                                              "Acceptable formats JPEG and PNG only. Max file size is 5 mb.",
                                              this.state.avatarNameToSend
                                                ? Object(w.jsx)("strong", {
                                                    children:
                                                      "Image Selected " +
                                                      this.state
                                                        .avatarNameToSend,
                                                  })
                                                : "Drop an image here, or select a file.",
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  Object(w.jsxs)("div", {
                                    "accept-charset": "utf-8",
                                    children: [
                                      Object(w.jsxs)("div", {
                                        className: "row",
                                        children: [
                                          Object(w.jsxs)("div", {
                                            className:
                                              "col-lg-6 col-md-6 col-sm-12",
                                            children: [
                                              Object(w.jsxs)("div", {
                                                className: "form-group mb_30",
                                                children: [
                                                  Object(w.jsx)("label", {
                                                    className: "input_lable",
                                                    children: "Full Name",
                                                  }),
                                                  Object(w.jsx)("input", {
                                                    type: "text",
                                                    className: "form-control",
                                                    value: this.state.fullName,
                                                    onChange: this.onChange,
                                                    name: "fullName",
                                                    placeholder: "John",
                                                  }),
                                                ],
                                              }),
                                              Object(w.jsxs)("div", {
                                                className: "form-group mb_30",
                                                children: [
                                                  Object(w.jsx)("label", {
                                                    className: "input_lable",
                                                    children: "Email address",
                                                  }),
                                                  Object(w.jsx)("input", {
                                                    type: "text",
                                                    className: "form-control",
                                                    value:
                                                      this.state.email.address,
                                                    name: "email",
                                                    placeholder:
                                                      "email@email.com",
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                          Object(w.jsx)("div", {
                                            className:
                                              "col-lg-6 col-md-6 col-sm-12",
                                            children: Object(w.jsxs)("div", {
                                              className: "form-group mb_30",
                                              children: [
                                                Object(w.jsx)("label", {
                                                  className: "input_lable",
                                                  children: "Affiliate Code",
                                                }),
                                                Object(w.jsx)("input", {
                                                  type: "text",
                                                  value: this.state.inviteCode,
                                                  name: "inviteCode",
                                                  className: "form-control",
                                                  placeholder: "017e629hw770kj",
                                                }),
                                              ],
                                            }),
                                          }),
                                        ],
                                      }),
                                      this.state.errors
                                        ? Object(w.jsx)("div", {
                                            style: { color: "#FE6E00" },
                                            className: "alert alert-danger",
                                            children: this.state.errors,
                                          })
                                        : "",
                                      Object(w.jsx)("button", {
                                        className: "theme_btn text-center",
                                        onClick: function (t) {
                                          e.onSubmit(t);
                                        },
                                        children: "Save",
                                      }),
                                      Object(w.jsx)("button", {
                                        style: { marginLeft: "6px" },
                                        className: "theme_btn text-center",
                                        onClick: function (t) {
                                          e.handleOpen(t);
                                        },
                                        children: "Edit Password",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          Object(w.jsxs)(M.a, {
                            show: this.state.show,
                            onHide: this.handleClose1,
                            children: [
                              Object(w.jsx)(M.a.Header, {
                                closeButton: !0,
                                children: Object(w.jsx)(M.a.Title, {
                                  children: "Edit Password",
                                }),
                              }),
                              Object(w.jsxs)(M.a.Body, {
                                children: [
                                  Object(w.jsxs)("div", {
                                    className: "form-group mb_30",
                                    children: [
                                      Object(w.jsx)("label", {
                                        className: "input_lable",
                                        children: "Old Password",
                                      }),
                                      Object(w.jsx)("input", {
                                        value: this.state.editedOldPassword,
                                        onChange: this.onChange,
                                        name: "editedOldPassword",
                                        className: "form-control",
                                        placeholder: "Confirm Password",
                                      }),
                                    ],
                                  }),
                                  Object(w.jsxs)("div", {
                                    className: "form-group mb_30",
                                    children: [
                                      Object(w.jsx)("label", {
                                        className: "input_lable",
                                        children: "New Password",
                                      }),
                                      Object(w.jsx)("input", {
                                        value: this.state.newPassword,
                                        onChange: this.onChange,
                                        name: "newPassword",
                                        className: "form-control",
                                        placeholder: "Confirm Password",
                                      }),
                                    ],
                                  }),
                                  Object(w.jsxs)("div", {
                                    className: "form-group mb_30",
                                    children: [
                                      Object(w.jsx)("label", {
                                        className: "input_lable",
                                        children: "Confirm Password",
                                      }),
                                      Object(w.jsx)("input", {
                                        value: this.state.confirmPassword,
                                        onChange: this.onChange,
                                        name: "confirmPassword",
                                        className: "form-control",
                                        placeholder: "Confirm Password",
                                      }),
                                    ],
                                  }),
                                  this.state.passwordErrors
                                    ? Object(w.jsx)("div", {
                                        style: { color: "#FE6E00" },
                                        className: "alert alert-danger",
                                        children: this.state.passwordErrors,
                                      })
                                    : "",
                                ],
                              }),
                              Object(w.jsxs)(M.a.Footer, {
                                children: [
                                  Object(w.jsx)(T.a, {
                                    variant: "primary",
                                    onClick: function (t) {
                                      e.onUpdatePassword(t);
                                    },
                                    children: "Update",
                                  }),
                                  Object(w.jsx)(T.a, {
                                    variant: "primary",
                                    onClick: this.handleClose1,
                                    children: "cancel",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          Object(w.jsxs)(M.a, {
                            show: this.state.showAlert,
                            onHide: this.handleClose1,
                            children: [
                              Object(w.jsx)(M.a.Body, {
                                children: Object(w.jsxs)(D.a, {
                                  variant: "success",
                                  children: [
                                    Object(w.jsx)("p", {
                                      children:
                                        "Profile updated successfully!! ",
                                    }),
                                    Object(w.jsx)("hr", {}),
                                  ],
                                }),
                              }),
                              Object(w.jsx)(M.a.Footer, {
                                children: Object(w.jsx)(T.a, {
                                  variant: "primary",
                                  onClick: this.successAlert,
                                  style: { alignItems: "center" },
                                  children: "OK",
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        le = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s() {
            return Object(i.a)(this, s), t.apply(this, arguments);
          }
          return (
            Object(l.a)(s, [
              { key: "componentWillMount", value: function () {} },
              { key: "componentDidMount", value: function () {} },
              {
                key: "render",
                value: function () {
                  return Object(w.jsx)("div", {
                    className: "",
                    children: Object(w.jsxs)("div", {
                      className: "",
                      children: [
                        Object(w.jsx)("div", {
                          children: Object(w.jsx)(y, {}),
                        }),
                        Object(w.jsx)(h.a, {
                          children: Object(w.jsxs)(j.d, {
                            children: [
                              Object(w.jsx)(j.b, {
                                path: "/admin/Register",
                                name: "usersListing Page",
                                component: X,
                              }),
                              Object(w.jsx)(j.b, {
                                path: "/admin/Statistics",
                                name: "Statistics Page",
                                component: re,
                              }),
                              Object(w.jsx)(j.b, {
                                path: "/admin/Profile",
                                name: "Profile Page",
                                component: ne,
                              }),
                              Object(w.jsx)(j.b, {
                                path: "/admin/EditProfile/:id",
                                name: "EditProfile Page",
                                component: ie,
                              }),
                              Object(w.jsx)(j.b, {
                                path: "/admin/Listing/:type",
                                name: "UsersListing Page",
                                component: U,
                              }),
                              Object(w.jsx)(j.b, {
                                path: "/admin/AffiliateHistory",
                                name: "AffiliateHistory Page",
                                component: G,
                              }),
                              Object(w.jsx)(j.b, {
                                path: "/admin/Affiliat/:id/dashboard",
                                name: "AffilDashboard Page",
                                component: J,
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        oe = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s() {
            var e;
            Object(i.a)(this, s);
            for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
              r[n] = arguments[n];
            return (
              ((e = t.call.apply(t, [this].concat(r))).state = { user: {} }), e
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "componentDidMount",
                value: function () {
                  var e = JSON.parse(localStorage.getItem("accessToken"));
                  this.setState({ user: e });
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this.state.user;
                  if ((console.log("user", e), !e))
                    return Object(w.jsx)(j.a, { to: { pathname: "/login" } });
                  if (e.role) {
                    e.role,
                      e.email.address && e.email.address,
                      e.email.isVerified;
                    if (e.avatar) {
                      console.log("user", e.avatar);
                      var t = e.avatar;
                      t.includes("uploads/") && (t = window.APIURL + t);
                    }
                  }
                  return Object(w.jsxs)("div", {
                    children: [
                      Object(w.jsx)(A, {}),
                      Object(w.jsx)(le, {}),
                      Object(w.jsx)(P, {}),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        de = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s() {
            var e;
            Object(i.a)(this, s);
            for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
              r[n] = arguments[n];
            return ((e = t.call.apply(t, [this].concat(r))).state = {}), e;
          }
          return (
            Object(l.a)(s, [
              {
                key: "render",
                value: function () {
                  return Object(w.jsx)("div", {
                    children: Object(w.jsxs)("header", {
                      id: "header",
                      children: [
                        Object(w.jsx)("div", {
                          class: "menu-button pt-4",
                          children: Object(w.jsx)("div", {
                            id: "nav-icon3",
                            children: Object(w.jsx)("span", {
                              class: "icon-menu",
                              children: Object(w.jsx)("img", {
                                src: "assets/images/Menu_Icon.png",
                                alt: "",
                              }),
                            }),
                          }),
                        }),
                        Object(w.jsx)("div", {
                          id: "top-bar",
                          children: Object(w.jsx)("img", {
                            src: "assets/images/top_logo.png",
                            class: "img-fluid text-center",
                            alt: "",
                          }),
                        }),
                      ],
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        he = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s() {
            var e;
            Object(i.a)(this, s);
            for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
              r[n] = arguments[n];
            return ((e = t.call.apply(t, [this].concat(r))).state = {}), e;
          }
          return (
            Object(l.a)(s, [
              {
                key: "render",
                value: function () {
                  return Object(w.jsx)("div", {
                    children: Object(w.jsx)("footer", {
                      className: "text-center login-footer",
                      children: Object(w.jsx)("p", {
                        className: "pt-0",
                        children: "\xa9 2021 GoalMogul, Inc.",
                      }),
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        je = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s() {
            var e;
            Object(i.a)(this, s);
            for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
              r[n] = arguments[n];
            return (
              ((e = t.call.apply(t, [this].concat(r))).state = {
                id: "",
                avatar: "",
              }),
              (e.onLogOut = function (t) {
                localStorage.clear(),
                  e.props.history.push({
                    pathname: "/login",
                    state: { key: "value" },
                  });
              }),
              e
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "componentDidMount",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e() {
                      var t, s, a, r, n;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  ((t = JSON.parse(
                                    localStorage.getItem("accessToken")
                                  )),
                                  (s = localStorage.getItem("LoginSession")),
                                  (a = JSON.parse(
                                    localStorage.getItem("userId")
                                  )),
                                  this.setState({ id: a }),
                                  !t)
                                ) {
                                  e.next = 13;
                                  break;
                                }
                                return (
                                  (r = JSON.parse(
                                    localStorage.getItem("userId")
                                  )),
                                  (e.next = 8),
                                  F(
                                    "get",
                                    "api/affiliate/Profile/".concat(r),
                                    "",
                                    s
                                  )
                                );
                              case 8:
                                (n = e.sent).user.avatar &&
                                  this.setState({ avatar: n.user.avatar }),
                                  200 == n.status &&
                                    (JSON.parse(n.user.avatar),
                                    n.user
                                      ? this.setState({ user: n.user })
                                      : this.props.history.push({
                                          pathname: "/",
                                          state: { key: "value" },
                                        })),
                                  (e.next = 14);
                                break;
                              case 13:
                                this.props.history.push({
                                  pathname: "/",
                                  state: { key: "value" },
                                });
                              case 14:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "render",
                value: function () {
                  var e, t, s;
                  return Object(w.jsx)("div", {
                    children: Object(w.jsx)("nav", {
                      id: "sidemenu",
                      children: Object(w.jsx)("div", {
                        className: "main-menu",
                        children: Object(w.jsxs)("ul", {
                          className: "main-menu",
                          children: [
                            Object(w.jsx)("li", {
                              children: Object(w.jsxs)(
                                "a",
                                ((e = {
                                  href: "javascript:void(0)",
                                  className:
                                    "/affiliate/Dashboard" === this.state.slug
                                      ? "active"
                                      : "",
                                }),
                                Object(p.a)(
                                  e,
                                  "href",
                                  "#/affiliate/Dashboard/".concat(this.state.id)
                                ),
                                Object(p.a)(e, "children", [
                                  ".",
                                  Object(w.jsx)("span", {
                                    className: "fa",
                                    children: Object(w.jsx)("svg", {
                                      "aria-hidden": "true",
                                      focusable: "false",
                                      "data-prefix": "fas",
                                      "data-icon": "chart-pie",
                                      className:
                                        "svg-inline--fa fa-chart-pie fa-w-17",
                                      role: "img",
                                      xmlns: "http://www.w3.org/2000/svg",
                                      viewBox: "0 0 544 512",
                                      children: Object(w.jsx)("path", {
                                        fill: "currentColor",
                                        d: "M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z",
                                      }),
                                    }),
                                  }),
                                  "View Statistics",
                                ]),
                                e)
                              ),
                            }),
                            Object(w.jsx)("li", {
                              children: Object(w.jsxs)(
                                "a",
                                ((t = {
                                  href: "javascript:void(0)",
                                  className:
                                    "/affiliate/AffiliateHistory" ===
                                    this.state.slug
                                      ? "active"
                                      : "",
                                }),
                                Object(p.a)(
                                  t,
                                  "href",
                                  "#/affiliate/AffiliateHistory/".concat(
                                    this.state.id
                                  )
                                ),
                                Object(p.a)(t, "children", [
                                  Object(w.jsx)("span", {
                                    className: "fa",
                                    children: Object(w.jsx)("svg", {
                                      "aria-hidden": "true",
                                      focusable: "false",
                                      "data-prefix": "fas",
                                      "data-icon": "users",
                                      className:
                                        "svg-inline--fa fa-users fa-w-20",
                                      role: "img",
                                      xmlns: "http://www.w3.org/2000/svg",
                                      viewBox: "0 0 640 512",
                                      children: Object(w.jsx)("path", {
                                        fill: "currentColor",
                                        d: "M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z",
                                      }),
                                    }),
                                  }),
                                  "List of all Affiliates",
                                ]),
                                t)
                              ),
                            }),
                            Object(w.jsx)("li", {
                              className: "bottom_list",
                              children: Object(w.jsxs)(
                                "a",
                                ((s = {
                                  href: "javascript:void(0)",
                                  className:
                                    "/affiliate/Profile" === this.state.slug
                                      ? "active"
                                      : "",
                                }),
                                Object(p.a)(
                                  s,
                                  "href",
                                  "#/affiliate/EditProfile/".concat(
                                    this.state.id
                                  )
                                ),
                                Object(p.a)(s, "children", [
                                  Object(w.jsx)("span", {
                                    className: "fa",
                                    children:
                                      "" == this.state.avatar
                                        ? Object(w.jsx)("img", {
                                            src: "assets/images/profile_img.png",
                                            height: "50px",
                                            width: "50px",
                                            className: "rounded-circle",
                                            alt: "",
                                          })
                                        : Object(w.jsx)("img", {
                                            src:
                                              window.APIURL + this.state.avatar,
                                            height: "50px",
                                            width: "50px",
                                            className: "rounded-circle",
                                            alt: "",
                                          }),
                                  }),
                                  " ",
                                  "Eustolia Ashburn",
                                ]),
                                s)
                              ),
                            }),
                            Object(w.jsx)("li", {
                              children: Object(w.jsxs)("a", {
                                href: "javascript:void(0)",
                                onClick: this.onLogOut,
                                children: [
                                  Object(w.jsxs)("span", {
                                    className: "fa",
                                    children: [
                                      Object(w.jsx)("img", {
                                        src: "assets/images/sign-out-alt.png",
                                        className: "img-fluid",
                                        alt: "",
                                      }),
                                      Object(w.jsx)("svg", {
                                        "aria-hidden": "true",
                                        focusable: "false",
                                        "data-prefix": "fas",
                                        "data-icon": "sign-out-alt",
                                        className:
                                          "svg-inline--fa fa-sign-out-alt fa-w-16",
                                        role: "img",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        viewBox: "0 0 512 512",
                                        children: Object(w.jsx)("path", {
                                          fill: "currentColor",
                                          d: "M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z",
                                        }),
                                      }),
                                    ],
                                  }),
                                  "Logout",
                                ],
                              }),
                            }),
                          ],
                        }),
                      }),
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        ue = Object(j.g)(je),
        me = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s() {
            var e;
            Object(i.a)(this, s);
            for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
              r[n] = arguments[n];
            return (
              ((e = t.call.apply(t, [this].concat(r))).state = {
                name: "",
                accountType: "",
                routingNumber: "",
                accountNumber: "",
                errors: "",
              }),
              (e.onChange = function (t) {
                e.setState(Object(p.a)({}, t.target.name, t.target.value));
              }),
              (e.onSubmit = (function () {
                var t = Object(b.a)(
                  m.a.mark(function t(s) {
                    var a, r, n, c, i, l, o, d;
                    return m.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (
                              (s.preventDefault(),
                              (a = e.state),
                              (r = a.name),
                              (n = a.accountType),
                              (c = a.routingNumber),
                              (i = a.accountNumber),
                              a.errors,
                              (l = /^[a-z A-Z]+$/),
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              "" != r)
                            ) {
                              t.next = 8;
                              break;
                            }
                            e.setState({ errors: "Fullname is required!" }),
                              (t.next = 42);
                            break;
                          case 8:
                            if (r.match(l)) {
                              t.next = 12;
                              break;
                            }
                            e.setState({
                              errors:
                                "Invalid username (Only letters a-z allowed)!",
                            }),
                              (t.next = 42);
                            break;
                          case 12:
                            if ("" != n) {
                              t.next = 16;
                              break;
                            }
                            e.setState({
                              errors: "Email address is required!",
                            }),
                              (t.next = 42);
                            break;
                          case 16:
                            if ("" != c) {
                              t.next = 20;
                              break;
                            }
                            e.setState({ errors: "Username is required!" }),
                              (t.next = 42);
                            break;
                          case 20:
                            if ("" != i) {
                              t.next = 24;
                              break;
                            }
                            e.setState({ errors: "Username is required!" }),
                              (t.next = 42);
                            break;
                          case 24:
                            return (
                              e.setState({ errors: "", loaderActive: !0 }),
                              (o = {
                                name: r,
                                accountType: n,
                                routingNumber: c,
                                accountNumber: i,
                              }),
                              (t.next = 28),
                              g("post", "api/auth/signup", o, null)
                            );
                          case 28:
                            if (
                              ((d = t.sent),
                              e.setState({ loaderActive: !1 }),
                              401 !== d.status && 402 !== d.status)
                            ) {
                              t.next = 35;
                              break;
                            }
                            e.setState({ errors: d.message }),
                              localStorage.clear(),
                              (t.next = 42);
                            break;
                          case 35:
                            if (200 !== d.status) {
                              t.next = 39;
                              break;
                            }
                            O.notify.show(
                              "You are registered! Check your email to verify your account!",
                              "success",
                              6e3
                            ),
                              (t.next = 42);
                            break;
                          case 39:
                            if (500 !== d.status) {
                              t.next = 42;
                              break;
                            }
                            return (
                              e.setState({ errors: d.message }),
                              t.abrupt("return")
                            );
                          case 42:
                          case "end":
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })()),
              e
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "componentDidMount",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e() {
                      var t;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                f()("body").removeClass("transparent-header"),
                                  f()("html, body").animate(
                                    { scrollTop: 0 },
                                    "slow"
                                  ),
                                  (t = JSON.parse(
                                    localStorage.getItem("accessToken")
                                  ))
                                    ? this.setState({ userId: t.id })
                                    : this.props.history.push({
                                        pathname: "/login",
                                        state: { key: "value" },
                                      });
                              case 4:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "render",
                value: function () {
                  return Object(w.jsx)("div", {
                    children: Object(w.jsx)("div", {
                      id: "content-wrapper",
                      className: "bank_wraper d-flex align-items-center",
                      children: Object(w.jsxs)("div", {
                        className: "container-fluid",
                        children: [
                          Object(w.jsx)("h4", {
                            className: "main_title",
                            children: "Add Bank Details",
                          }),
                          Object(w.jsxs)("div", {
                            className: "row",
                            children: [
                              Object(w.jsx)("div", {
                                className:
                                  "col-xl-6 col-lg-12 col-md-12 col-sm-12",
                                children: Object(w.jsxs)("div", {
                                  className: "add_bank",
                                  children: [
                                    Object(w.jsx)("h3", {
                                      className: "",
                                      children:
                                        "Deposit earnings directly into your U.S. bank account.",
                                    }),
                                    Object(w.jsxs)("div", {
                                      className: "bank_form",
                                      "accept-charset": "utf-8",
                                      children: [
                                        Object(w.jsxs)("div", {
                                          className: "form-group mb_30 mt_40",
                                          children: [
                                            Object(w.jsx)("label", {
                                              className: "input_lable",
                                              children: "Account Holder Name",
                                            }),
                                            Object(w.jsx)("input", {
                                              type: "text",
                                              name: "",
                                              className: "form-control",
                                              value: "",
                                              placeholder: "John Quill",
                                            }),
                                          ],
                                        }),
                                        Object(w.jsxs)("div", {
                                          className:
                                            "form-group mb_30 custom_select",
                                          children: [
                                            Object(w.jsx)("label", {
                                              className: "input_lable",
                                              children: "Account Type",
                                            }),
                                            Object(w.jsxs)("select", {
                                              name: "",
                                              className: "form-control",
                                              children: [
                                                Object(w.jsx)("option", {
                                                  value: "",
                                                  children: "Please Select",
                                                }),
                                                Object(w.jsx)("option", {
                                                  value: "",
                                                  children: "1",
                                                }),
                                                Object(w.jsx)("option", {
                                                  value: "",
                                                  children: "1",
                                                }),
                                                Object(w.jsx)("option", {
                                                  value: "",
                                                  children: "1",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        Object(w.jsxs)("div", {
                                          className: "form-group mb_30",
                                          children: [
                                            Object(w.jsx)("label", {
                                              className: "input_lable",
                                              children: "Routing Number",
                                            }),
                                            Object(w.jsx)("input", {
                                              type: "text",
                                              name: "",
                                              className: "form-control",
                                              value: "",
                                              placeholder: "123456789",
                                            }),
                                          ],
                                        }),
                                        Object(w.jsxs)("div", {
                                          className: "form-group mb_30",
                                          children: [
                                            Object(w.jsx)("label", {
                                              className: "input_lable",
                                              children: "Account Number",
                                            }),
                                            Object(w.jsx)("input", {
                                              type: "text",
                                              name: "",
                                              className: "form-control",
                                              value: "",
                                              placeholder: "123456789",
                                            }),
                                          ],
                                        }),
                                        this.state.errors
                                          ? Object(w.jsx)("div", {
                                              style: { color: "#FE6E00" },
                                              className: "alert alert-danger",
                                              children: this.state.errors,
                                            })
                                          : "",
                                        Object(w.jsx)("a", {
                                          class: "link",
                                          href: "/#/affiliate/AffiliateHistory",
                                          children: Object(w.jsx)("button", {
                                            type: "submit",
                                            class: "theme_btn text-center",
                                            "data-toggle": "modal",
                                            "data-target": "#staticBackdrop",
                                            children: "Save",
                                          }),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              }),
                              Object(w.jsxs)("div", {
                                className:
                                  "col-xl-6 col-lg-12 col-md-12 col-sm-12",
                                children: [
                                  Object(w.jsx)("div", {
                                    className: "card-body text-center",
                                    children: Object(w.jsx)("p", {
                                      children:
                                        "This payment method will become active in 3 days",
                                    }),
                                  }),
                                  Object(w.jsxs)("div", {
                                    className: "bank_detail_form mt-5",
                                    children: [
                                      Object(w.jsx)("img", {
                                        src: "assets/images/bank_detail_img.png",
                                        className: "img-fluid",
                                        alt: "",
                                      }),
                                      Object(w.jsxs)("ul", {
                                        children: [
                                          Object(w.jsx)("li", {
                                            children: "Routing Number",
                                          }),
                                          Object(w.jsx)("li", {
                                            children: "Account Number",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        be = s.p + "static/media/loader.bf6a435f.svg",
        pe = s(195),
        xe = s(196),
        fe = s(197),
        Oe = s(198),
        ve = s(199),
        ge = s(200),
        we = s(201),
        Ne = s(202),
        ye = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s(e) {
            var a;
            return (
              Object(i.a)(this, s),
              ((a = t.call(this, e)).stateInitial = {
                userId: "",
                loaderActive: !1,
                inviteCode: "",
                oldCode: "",
                inviteLink: "",
                email: "",
                show1: !1,
                show2: !1,
                show3: !1,
                copied: !1,
                errors: "",
                token: "",
              }),
              (a.onChange = function (e) {
                a.setState(Object(p.a)({}, e.target.name, e.target.value));
              }),
              (a.selectModel = function () {
                a.setState({ show1: !1, show2: !0 });
              }),
              (a.handleShow = function () {
                a.state.show = !0;
              }),
              (a.handleClose1 = Object(b.a)(
                m.a.mark(function e() {
                  var t, s, r, n, c, i;
                  return m.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (
                            ((t = a.state),
                            (s = t.inviteCode),
                            (r = t.token),
                            (n = t.oldCode),
                            "" === s)
                          ) {
                            e.next = 22;
                            break;
                          }
                          if (s !== n) {
                            e.next = 7;
                            break;
                          }
                          return (
                            a.setState({
                              errors: "You entered the same code!",
                            }),
                            e.abrupt("return")
                          );
                        case 7:
                          return (
                            (c = { newCode: s }),
                            (e.next = 10),
                            g("post", "api/affiliate/editInviteCode", c, r)
                          );
                        case 10:
                          if (
                            ((i = e.sent),
                            a.setState({ loaderActive: !1 }),
                            200 !== i.status)
                          ) {
                            e.next = 17;
                            break;
                          }
                          return (
                            a.setState({ show3: !0, show2: !1 }),
                            e.abrupt("return")
                          );
                        case 17:
                          return (
                            i.status,
                            a.setState({ errors: i.message }),
                            e.abrupt("return")
                          );
                        case 20:
                          e.next = 23;
                          break;
                        case 22:
                          a.setState({
                            errors: "Celebrity code cannot be empty!",
                          });
                        case 23:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              )),
              (a.handleClose2 = function () {
                a.setState({ show3: !1 }), window.location.reload();
              }),
              (a.state = a.stateInitial),
              a
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "componentDidMount",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e() {
                      var t, s, a, r, n, c;
                      return m.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  (this.setState({ loaderActive: !0 }),
                                  (t = this.props.match),
                                  (s = t.params.id),
                                  this.setState({ userId: s }),
                                  (a = JSON.parse(
                                    localStorage.getItem("accessToken")
                                  )),
                                  (r = localStorage.getItem("LoginSession")),
                                  !a)
                                ) {
                                  e.next = 14;
                                  break;
                                }
                                return (
                                  this.setState({
                                    loaderActive: !0,
                                    token: r,
                                    show1: !0,
                                  }),
                                  (e.next = 10),
                                  g(
                                    "get",
                                    "api/affiliate/Profile/".concat(s),
                                    "",
                                    r
                                  )
                                );
                              case 10:
                                (n = e.sent),
                                  this.setState({ loaderActive: !1 }),
                                  this.setState({
                                    loaderActive: !1,
                                    oldCode: n.user.inviteCode,
                                    inviteCode: n.user.inviteCode,
                                  }),
                                  200 == n.status &&
                                    (n.user
                                      ? this.setState({ user: n.user })
                                      : this.props.history.push({
                                          pathname: "/",
                                          state: { key: "value" },
                                        }));
                              case 14:
                                (c = ""
                                  .concat(window.APPURL, "invite/")
                                  .concat(this.state.inviteCode)),
                                  this.setState({ inviteLink: c });
                              case 16:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "render",
                value: function () {
                  var e = this,
                    t = function () {
                      e.setState({ show1: !1, show2: !1, show3: !1 });
                    };
                  return Object(w.jsxs)("div", {
                    children: [
                      this.state.loaderActive
                        ? Object(w.jsx)("div", {
                            className: "inlineLoaderGif",
                            children: Object(w.jsx)("img", {
                              src: be,
                              alt: "broken",
                            }),
                          })
                        : "",
                      " ",
                      Object(w.jsxs)("div", {
                        children: [
                          " ",
                          Object(w.jsx)("div", {
                            id: "content-wrapper",
                            className:
                              "d-flex align-items-center justify-content-centers",
                            children: Object(w.jsxs)("div", {
                              className: "container-fluid",
                              children: [
                                Object(w.jsx)("h4", {
                                  className: "main_title mb-4",
                                  children: "Dashboard",
                                }),
                                Object(w.jsxs)("div", {
                                  className: "row",
                                  children: [
                                    Object(w.jsx)("div", {
                                      className: "col-lg-4 col-md-6 col-sm-12",
                                      children: Object(w.jsxs)("div", {
                                        className: "chart_item",
                                        children: [
                                          Object(w.jsx)("h4", {
                                            className: "sub_title",
                                            children: "Monthly Report",
                                          }),
                                          Object(w.jsxs)("div", {
                                            className:
                                              "chart_img text-center mt-3",
                                            style: { paddingTop: "3.5rem" },
                                            children: [
                                              " ",
                                              Object(w.jsx)(H, {}),
                                              "",
                                            ],
                                          }),
                                        ],
                                      }),
                                    }),
                                    Object(w.jsx)("div", {
                                      className: "col-lg-4 col-md-6 col-sm-12",
                                      children: Object(w.jsxs)("div", {
                                        className: "chart_item",
                                        children: [
                                          Object(w.jsx)("h4", {
                                            className: "sub_title",
                                            children: "History",
                                          }),
                                          Object(w.jsxs)("div", {
                                            className:
                                              "chart_img text-center mt-3",
                                            children: [
                                              Object(w.jsx)(R, {}),
                                              " ",
                                            ],
                                          }),
                                        ],
                                      }),
                                    }),
                                    Object(w.jsx)("div", {
                                      className: "col-lg-4 col-md-6 col-sm-12",
                                      children: Object(w.jsxs)("div", {
                                        className: "chart_item",
                                        children: [
                                          Object(w.jsx)("h4", {
                                            className: "sub_title",
                                            children: "Yearly Report",
                                          }),
                                          Object(w.jsx)("div", {
                                            className:
                                              "chart_img text-center mt-3",
                                            style: { paddingTop: "3.5rem" },
                                            children: Object(w.jsx)(B, {}),
                                          }),
                                        ],
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                          Object(w.jsxs)(M.a, {
                            show: this.state.show1,
                            onHide: t,
                            children: [
                              Object(w.jsx)(M.a.Header, {
                                closeButton: !0,
                                children: Object(w.jsx)(M.a.Title, {
                                  children: "Share",
                                }),
                              }),
                              Object(w.jsx)(M.a.Body, {
                                children: Object(w.jsxs)("div", {
                                  style: {
                                    border: "1px solid black",
                                    padding: "10px",
                                  },
                                  children: [
                                    "I'd love for us to keep each other inspired and motivated on our journeys. Add me on GoalMogul? ",
                                    Object(w.jsxs)("p", {
                                      style: {
                                        color: "#0069d9",
                                        textDecoration: "underline",
                                        wordWrap: "break-word",
                                      },
                                      children: [
                                        Object(w.jsxs)("div", {
                                          style: {
                                            width: "100%",
                                            backgroundColor:
                                              "rgba(64,176,226,0.1)",
                                            height: "34px",
                                          },
                                          children: [
                                            this.state.inviteCode,
                                            Object(w.jsx)(Z.CopyToClipboard, {
                                              text: this.state.inviteCode,
                                              onCopy: function () {
                                                return e.setState({
                                                  copied: !0,
                                                });
                                              },
                                              children: Object(w.jsx)("div", {
                                                style: {
                                                  position: "absolute",
                                                  marginLeft: "24rem",
                                                  bottom: "2.7rem",
                                                },
                                                children: Object(w.jsx)("i", {
                                                  class: "fa fa-copy",
                                                  style: { color: "grey" },
                                                }),
                                              }),
                                            }),
                                            this.state.copied
                                              ? Object(w.jsx)("div", {
                                                  style: {
                                                    color: "red",
                                                    fontSize: "12px",
                                                    left: "25.3rem",
                                                    top: "6.6rem",
                                                    position: "absolute",
                                                  },
                                                  children: "Copied.",
                                                })
                                              : null,
                                          ],
                                        }),
                                        " ",
                                      ],
                                    }),
                                  ],
                                }),
                              }),
                              Object(w.jsxs)(M.a.Footer, {
                                children: [
                                  Object(w.jsx)(T.a, {
                                    style: { margin: "10px" },
                                    onClick: this.selectModel,
                                    children: "Customize Invitecode",
                                  }),
                                  Object(w.jsx)(T.a, {
                                    variant: "secondary",
                                    onClick: t,
                                    children: "Close",
                                  }),
                                  Object(w.jsx)("br", {}),
                                  Object(w.jsxs)("div", {
                                    style: {
                                      position: "absolute",
                                      left: "1.2rem",
                                      top: "15.2rem",
                                      width: "200px",
                                      height: "60px",
                                    },
                                    children: [
                                      Object(w.jsx)(pe.a, {
                                        subject:
                                          "please use the following code = { ".concat(
                                            this.state.inviteCode,
                                            " } for signing in "
                                          ),
                                        round: !0,
                                        children: Object(w.jsx)(xe.a, {
                                          size: 32,
                                          round: !0,
                                        }),
                                      }),
                                      Object(w.jsx)(fe.a, {
                                        quote:
                                          "please use the following code = { ".concat(
                                            this.state.inviteCode,
                                            " } for signing in "
                                          ),
                                        url: "www.facebook.com",
                                        round: !0,
                                        children: Object(w.jsx)(Oe.a, {
                                          size: 32,
                                          round: !0,
                                        }),
                                      }),
                                      Object(w.jsx)(ve.a, {
                                        title:
                                          "please use the following code = { ".concat(
                                            this.state.inviteCode,
                                            " } for signing in "
                                          ),
                                        url: "www.twitter.com",
                                        round: !0,
                                        children: Object(w.jsx)(ge.a, {
                                          size: 32,
                                          round: !0,
                                        }),
                                      }),
                                      Object(w.jsx)(we.a, {
                                        round: !0,
                                        url: "please use the following code = { ".concat(
                                          this.state.inviteCode,
                                          " } for signing in "
                                        ),
                                        children: Object(w.jsx)(Ne.a, {
                                          size: 32,
                                          round: !0,
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          Object(w.jsxs)(M.a, {
                            show: this.state.show2,
                            onHide: t,
                            children: [
                              Object(w.jsx)(M.a.Header, {
                                closeButton: !0,
                                children: Object(w.jsx)(M.a.Title, {
                                  children: "Share",
                                }),
                              }),
                              Object(w.jsxs)(M.a.Body, {
                                children: [
                                  Object(w.jsx)("input", {
                                    value: this.state.inviteCode,
                                    onChange: this.onChange,
                                    id: "w3review",
                                    name: "inviteCode",
                                    style: { width: "100%" },
                                  }),
                                  this.state.errors
                                    ? Object(w.jsx)("div", {
                                        style: { color: "#FE6E00" },
                                        className: "alert alert-danger",
                                        children: this.state.errors,
                                      })
                                    : "",
                                ],
                              }),
                              Object(w.jsxs)(M.a.Footer, {
                                children: [
                                  Object(w.jsx)(T.a, {
                                    variant: "secondary",
                                    onClick: t,
                                    children: "Close",
                                  }),
                                  Object(w.jsx)(T.a, {
                                    variant: "primary",
                                    onClick: this.handleClose1,
                                    children: "Save Changes",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          Object(w.jsxs)(M.a, {
                            show: this.state.show3,
                            onHide: this.handleClose2,
                            children: [
                              Object(w.jsx)(M.a.Header, {
                                closeButton: !0,
                                children: Object(w.jsx)(M.a.Title, {
                                  children: "Success!!",
                                }),
                              }),
                              Object(w.jsx)(M.a.Body, {
                                children: Object(w.jsxs)(D.a, {
                                  variant: "success",
                                  children: [
                                    Object(w.jsx)("p", {
                                      children:
                                        "Aww yeah, you successfully updated your inviteCode. :)",
                                    }),
                                    Object(w.jsx)("hr", {}),
                                  ],
                                }),
                              }),
                              Object(w.jsx)(M.a.Footer, {
                                children: Object(w.jsx)(T.a, {
                                  variant: "primary",
                                  onClick: this.handleClose2,
                                  children: "Okay",
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        ke = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s(e) {
            return Object(i.a)(this, s), t.call(this, e);
          }
          return (
            Object(l.a)(s, [
              { key: "componentWillMount", value: function () {} },
              { key: "componentDidMount", value: function () {} },
              {
                key: "render",
                value: function () {
                  localStorage.getItem("userId");
                  return Object(w.jsx)("div", {
                    className: "",
                    children: Object(w.jsxs)("div", {
                      className: "",
                      children: [
                        Object(w.jsx)("div", {
                          className: "",
                          children: Object(w.jsx)(ue, {}),
                        }),
                        Object(w.jsx)(h.a, {
                          children: Object(w.jsxs)(j.d, {
                            children: [
                              Object(w.jsx)(j.b, {
                                path: "/sas",
                                name: "Profile Page",
                                component: ne,
                              }),
                              Object(w.jsx)(j.b, {
                                exact: !0,
                                path: "/affiliate/Profile",
                                name: "Profile Page",
                                component: ne,
                              }),
                              Object(w.jsx)(j.b, {
                                exact: !0,
                                path: "/affiliate/EditProfile/:id",
                                name: "EditProfile Page",
                                component: ie,
                              }),
                              Object(w.jsx)(j.b, {
                                exact: !0,
                                path: "/affiliate/AddBankDetails",
                                name: "AddBankDetails Page",
                                component: me,
                              }),
                              Object(w.jsx)(j.b, {
                                exact: !0,
                                path: "/affiliate/AffiliateHistory/:id",
                                name: "AffiliateHistory Page",
                                component: G,
                              }),
                              Object(w.jsx)(j.b, {
                                exact: !0,
                                path: "/affiliate/Dashboard/:id",
                                name: "Dashboard Page",
                                component: ye,
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        Se = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s() {
            var e;
            Object(i.a)(this, s);
            for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
              r[n] = arguments[n];
            return (
              ((e = t.call.apply(t, [this].concat(r))).state = { user: {} }), e
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "componentDidMount",
                value: function () {
                  var e = JSON.parse(localStorage.getItem("accessToken"));
                  this.setState({ user: e });
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this.state.user;
                  if (!e)
                    return Object(w.jsx)(j.a, { to: { pathname: "/login" } });
                  if (e.role) {
                    e.role,
                      e.email.address && e.email.address,
                      e.email.isVerified;
                    if (e.avatar) {
                      var t = e.avatar;
                      t.includes("uploads/") && (t = window.APIURL + t);
                    }
                  }
                  return Object(w.jsxs)("div", {
                    children: [
                      Object(w.jsx)(de, {}),
                      Object(w.jsx)(ke, {}),
                      Object(w.jsx)(he, {}),
                    ],
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        Ce = s(78),
        _e = s(44),
        Ae = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s() {
            var e;
            Object(i.a)(this, s);
            for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
              r[n] = arguments[n];
            return (
              ((e = t.call.apply(t, [this].concat(r))).state = {
                fullName: "",
                email: { address: "" },
                password: "",
                confirmPassword: "",
                gender: "",
                role: "",
                dateOfBirth: "",
                presentDate: new Date(),
                selctedYear: "",
                avatar: null,
                avatarToSend: "",
                avatarNameToSend: "",
                errors: "",
              }),
              (e.onChangeDob = function (t) {
                var s = _e(t).format("MM/DD/YYYY"),
                  a = t.getFullYear();
                e.setState({ dateOfBirth: s, selctedYear: a });
              }),
              (e.onChange = function (t) {
                e.setState(Object(p.a)({}, t.target.name, t.target.value));
              }),
              (e.onChangeEmail = function (t) {
                e.setState({ email: { address: t.target.value } });
              }),
              (e.onChangeImage = (function () {
                var t = Object(b.a)(
                  m.a.mark(function t(s) {
                    var a;
                    return m.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (!(a = s.target.files)) {
                              t.next = 4;
                              break;
                            }
                            return (
                              e.setState({
                                avatar: URL.createObjectURL(a[0]),
                                avatarToSend: a[0],
                                avatarNameToSend: a[0].name,
                              }),
                              t.abrupt("return")
                            );
                          case 4:
                          case "end":
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })()),
              (e.onSubmit = (function () {
                var t = Object(b.a)(
                  m.a.mark(function t(s) {
                    var a, r, n, c, i, l, o, d, h, j, u, b, p, x, f, O, v;
                    return m.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (
                              (s.preventDefault(),
                              (a = e.state),
                              (r = a.fullName),
                              (n = a.email),
                              (c = a.password),
                              (i = a.confirmPassword),
                              (l = a.gender),
                              (o = a.role),
                              (d = a.dateOfBirth),
                              (h = a.selctedYear),
                              (j = a.avatarToSend),
                              (u = a.avatarNameToSend),
                              a.errors,
                              (b = e.state.presentDate.getFullYear()),
                              (p = /^[a-z A-Z]+$/),
                              (x =
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
                              "" != r)
                            ) {
                              t.next = 9;
                              break;
                            }
                            e.setState({ errors: "Fullname is required!" }),
                              (t.next = 85);
                            break;
                          case 9:
                            if (r.match(p)) {
                              t.next = 13;
                              break;
                            }
                            e.setState({
                              errors:
                                "Invalid username (Only letters a-z allowed)!",
                            }),
                              (t.next = 85);
                            break;
                          case 13:
                            if ("" != n.address) {
                              t.next = 17;
                              break;
                            }
                            e.setState({
                              errors: "Email address is required!",
                            }),
                              (t.next = 85);
                            break;
                          case 17:
                            if (n.address.match(x)) {
                              t.next = 21;
                              break;
                            }
                            e.setState({ errors: "Invalid email address!" }),
                              (t.next = 85);
                            break;
                          case 21:
                            if ("" !== c) {
                              t.next = 25;
                              break;
                            }
                            e.setState({ errors: "Passowrd is required!" }),
                              (t.next = 85);
                            break;
                          case 25:
                            if (!(c.length < 8)) {
                              t.next = 29;
                              break;
                            }
                            e.setState({
                              errors:
                                "Password must have at-least 8 characters!",
                            }),
                              (t.next = 85);
                            break;
                          case 29:
                            if ("" !== i) {
                              t.next = 33;
                              break;
                            }
                            e.setState({
                              errors: "Password confirmation is required!",
                            }),
                              (t.next = 85);
                            break;
                          case 33:
                            if (c === i) {
                              t.next = 37;
                              break;
                            }
                            e.setState({ errors: "Password do not match!" }),
                              (t.next = 85);
                            break;
                          case 37:
                            if ("" != l) {
                              t.next = 41;
                              break;
                            }
                            e.setState({ errors: "Gender is required!" }),
                              (t.next = 85);
                            break;
                          case 41:
                            if ("" != o) {
                              t.next = 45;
                              break;
                            }
                            e.setState({ errors: "Role is required!" }),
                              (t.next = 85);
                            break;
                          case 45:
                            if ("" != d) {
                              t.next = 49;
                              break;
                            }
                            e.setState({
                              errors: "Date of birth is required!",
                            }),
                              (t.next = 85);
                            break;
                          case 49:
                            if (!(h >= b)) {
                              t.next = 53;
                              break;
                            }
                            e.setState({
                              errors: "Please select a valid date of birth!",
                            }),
                              (t.next = 85);
                            break;
                          case 53:
                            return (
                              e.setState({ errors: "" }),
                              (f = new Ce()),
                              (O = n.address),
                              j && f.append("avatar", j, u),
                              f.append("fullName", r),
                              f.append("emailAddress", O),
                              f.append("password", c),
                              f.append("gender", l),
                              f.append("role", o),
                              f.append("dateOfBirth", d),
                              (t.next = 65),
                              V("post", "api/auth/register", f, null)
                            );
                          case 65:
                            if (
                              ((v = t.sent),
                              e.setState({ loaderActive: !1 }),
                              400 !== v.status &&
                                401 !== v.status &&
                                402 !== v.status)
                            ) {
                              t.next = 72;
                              break;
                            }
                            e.setState({ errors: v.message }),
                              localStorage.clear(),
                              (t.next = 85);
                            break;
                          case 72:
                            if (409 !== v.status) {
                              t.next = 77;
                              break;
                            }
                            e.setState({ errors: v.message }),
                              localStorage.clear(),
                              (t.next = 85);
                            break;
                          case 77:
                            if (200 !== v.status) {
                              t.next = 82;
                              break;
                            }
                            localStorage.setItem("showNotify", !0),
                              e.props.history.push("/login"),
                              (t.next = 85);
                            break;
                          case 82:
                            if (500 !== v.status) {
                              t.next = 85;
                              break;
                            }
                            return (
                              e.setState({ errors: v.message }),
                              t.abrupt("return")
                            );
                          case 85:
                          case "end":
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })()),
              e
            );
          }
          return (
            Object(l.a)(s, [
              {
                key: "componentDidMount",
                value: (function () {
                  var e = Object(b.a)(
                    m.a.mark(function e() {
                      return m.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              f()("body").removeClass("transparent-header"),
                                f()("html, body").animate(
                                  { scrollTop: 0 },
                                  "slow"
                                );
                            case 2:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "render",
                value: function () {
                  var e = this;
                  return Object(w.jsx)("div", {
                    children: Object(w.jsxs)("section", {
                      className: "login_wraper",
                      children: [
                        Object(w.jsx)(v.a, {}),
                        Object(w.jsx)("div", {
                          className: "container-fluid",
                          children: Object(w.jsxs)("div", {
                            className: "row align-items-center",
                            children: [
                              Object(w.jsx)("div", {
                                className:
                                  "col-xl- col-lg-7 col-md-7 col-sm-12 border-r",
                                children: Object(w.jsxs)("div", {
                                  className: "login-content",
                                  children: [
                                    Object(w.jsx)("h3", {
                                      children:
                                        "How well do you really know your friends if you don't know their goals?",
                                    }),
                                    Object(w.jsx)("p", {
                                      children:
                                        "Keep up with your friend\u2019s life goals and enjoy helping them!",
                                    }),
                                    Object(w.jsx)("img", {
                                      src: "assets/images/login_img.png",
                                      className: "img-fluid mt-5",
                                      alt: "",
                                    }),
                                  ],
                                }),
                              }),
                              Object(w.jsx)("div", {
                                className:
                                  "col-xl-4 col-lg-5 col-md-5 col-sm-12",
                                children: Object(w.jsx)("div", {
                                  "accept-charset": "utf-8",
                                  children: Object(w.jsxs)("div", {
                                    className: "form_inner_box",
                                    children: [
                                      Object(w.jsx)("h3", {
                                        className: "text-center",
                                        style: {
                                          marginTop: "0px",
                                          color: "rgb(67, 215, 241)",
                                        },
                                        children: "REGISTER NOW",
                                      }),
                                      Object(w.jsxs)("div", {
                                        className: "form-group mb_30",
                                        children: [
                                          Object(w.jsx)("label", {
                                            className: "input_lable",
                                            children: "Full Name",
                                          }),
                                          Object(w.jsx)("input", {
                                            type: "text",
                                            value: this.state.fullName,
                                            onChange: this.onChange,
                                            name: "fullName",
                                            className: "form-control",
                                            placeholder: "Full Name",
                                          }),
                                        ],
                                      }),
                                      Object(w.jsxs)("div", {
                                        className: "form-group mb_30",
                                        children: [
                                          Object(w.jsx)("label", {
                                            className: "input_lable",
                                            children: "Email address",
                                          }),
                                          Object(w.jsx)("input", {
                                            type: "email",
                                            value: this.state.email.address,
                                            onChange: this.onChangeEmail,
                                            name: "email",
                                            className: "form-control",
                                            placeholder: "email@email.com",
                                          }),
                                        ],
                                      }),
                                      Object(w.jsxs)("div", {
                                        className: "form-group",
                                        children: [
                                          Object(w.jsx)("label", {
                                            className: "input_lable",
                                            children: "Password",
                                          }),
                                          Object(w.jsx)("input", {
                                            type: "password",
                                            value: this.state.password,
                                            onChange: this.onChange,
                                            name: "password",
                                            className: "form-control",
                                            placeholder: "********",
                                          }),
                                        ],
                                      }),
                                      Object(w.jsxs)("div", {
                                        className: "form-group",
                                        children: [
                                          Object(w.jsx)("label", {
                                            className: "input_lable",
                                            children: "Confirm Password",
                                          }),
                                          Object(w.jsx)("input", {
                                            type: "password",
                                            value: this.state.confirmPassword,
                                            onChange: this.onChange,
                                            name: "confirmPassword",
                                            placeholder: "********",
                                            className: "form-control",
                                          }),
                                        ],
                                      }),
                                      Object(w.jsxs)("div", {
                                        className: "form-group",
                                        children: [
                                          Object(w.jsx)("label", {
                                            className: "input_lable",
                                            children: "Gender",
                                          }),
                                          Object(w.jsxs)("select", {
                                            className: "form-control",
                                            name: "gender",
                                            value: this.state.gender,
                                            onChange: this.onChange,
                                            children: [
                                              Object(w.jsx)("option", {
                                                value: "",
                                                children: "Select Your Gender",
                                              }),
                                              Object(w.jsx)("option", {
                                                value: "Male",
                                                children: "Male",
                                              }),
                                              Object(w.jsx)("option", {
                                                value: "Female",
                                                children: "Female",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      Object(w.jsxs)("div", {
                                        className: "form-group",
                                        children: [
                                          Object(w.jsx)("label", {
                                            className: "input_lable",
                                            children: "Role",
                                          }),
                                          Object(w.jsxs)("select", {
                                            className: "form-control",
                                            name: "role",
                                            value: this.state.role,
                                            onChange: this.onChange,
                                            children: [
                                              Object(w.jsx)("option", {
                                                value: "",
                                                children: "Select Your Role",
                                              }),
                                              Object(w.jsx)("option", {
                                                value: "Affiliate",
                                                children: "Affiliate",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      Object(w.jsxs)("div", {
                                        className: "form-group",
                                        children: [
                                          Object(w.jsx)("label", {
                                            className: "input_lable",
                                            children: "Date of Birth",
                                          }),
                                          Object(w.jsx)(W.a, {
                                            className: "form-control",
                                            name: "dateOfBirth",
                                            id: "datepicker",
                                            value: this.state.dateOfBirth,
                                            onChange: function (t) {
                                              return e.onChangeDob(t);
                                            },
                                          }),
                                        ],
                                      }),
                                      Object(w.jsxs)("div", {
                                        className: "profile_container",
                                        children: [
                                          Object(w.jsx)("div", {
                                            className: "profile_pic_upload",
                                            children:
                                              null == this.state.avatar
                                                ? Object(w.jsx)("img", {
                                                    src: "assets/images/profile_img.png",
                                                    className: "img-fluid",
                                                    alt: "",
                                                  })
                                                : Object(w.jsx)("img", {
                                                    src: this.state.avatar,
                                                    className: "img-fluid",
                                                    alt: "",
                                                  }),
                                          }),
                                          Object(w.jsxs)("div", {
                                            className: "file-input",
                                            style: { marginTop: "32px" },
                                            children: [
                                              Object(w.jsx)("input", {
                                                type: "file",
                                                name: "avatar",
                                                id: "file-input",
                                                className: "file-input__input",
                                                onChange: this.onChangeImage,
                                              }),
                                              Object(w.jsx)("label", {
                                                className: "file-input__label",
                                                for: "file-input",
                                                children: Object(w.jsx)(
                                                  "span",
                                                  {
                                                    style: { fontSize: "14px" },
                                                    children: "Upload file",
                                                  }
                                                ),
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      Object(w.jsx)("div", {
                                        className: "iagree_radio",
                                        children: Object(w.jsx)("span", {
                                          className: "error",
                                          id: "iagree_to_be_contacted_error",
                                          style: { display: "none" },
                                          children:
                                            "please accept our terms of business",
                                        }),
                                      }),
                                      Object(w.jsx)("div", {
                                        children: this.state.errors
                                          ? Object(w.jsx)("div", {
                                              style: { color: "#FE6E00" },
                                              className: "alert alert-danger",
                                              children: this.state.errors,
                                            })
                                          : "",
                                      }),
                                      Object(w.jsx)("div", {
                                        className: "buttonContainer",
                                        style: { marginTop: "20px" },
                                        children: Object(w.jsx)("button", {
                                          type: "button",
                                          onClick: function (t) {
                                            e.onSubmit(t);
                                          },
                                          className:
                                            "theme_btn text-center d-flex mx-auto",
                                          children: "Register",
                                        }),
                                      }),
                                      Object(w.jsx)("div", {
                                        className: "top-bar",
                                        children: Object(w.jsxs)("span", {
                                          children: [
                                            "Have an account?",
                                            " ",
                                            Object(w.jsxs)("a", {
                                              class: "link",
                                              href: "/#/login",
                                              children: [" ", "Log In"],
                                            }),
                                          ],
                                        }),
                                      }),
                                    ],
                                  }),
                                }),
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        Pe = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s(e) {
            var a;
            return (
              Object(i.a)(this, s),
              ((a = t.call(this, e)).onChange = function (e) {
                a.setState({ email: { address: e.target.value } });
              }),
              (a.ForgetPassword = (function () {
                var e = Object(b.a)(
                  m.a.mark(function e(t) {
                    var s, r, n, c;
                    return m.a.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              (t.preventDefault(),
                              (s = a.state.email),
                              (r =
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
                              "" !== s.address)
                            ) {
                              e.next = 8;
                              break;
                            }
                            return (
                              a.setState({ errors: "Email  is required!" }),
                              e.abrupt("return")
                            );
                          case 8:
                            if (s.address.match(r)) {
                              e.next = 13;
                              break;
                            }
                            return (
                              a.setState({ errors: "Invalid email!" }),
                              e.abrupt("return")
                            );
                          case 13:
                            return (
                              a.setState({ errors: "", loaderActive: !0 }),
                              (n = { email: { address: s.address } }),
                              (e.next = 17),
                              g("post", "api/auth/forgetPasswordEmail", n, null)
                            );
                          case 17:
                            if (
                              ((c = e.sent),
                              a.setState({ loaderActive: !1 }),
                              401 !== c.status)
                            ) {
                              e.next = 24;
                              break;
                            }
                            return (
                              a.setState({ errors: c.message }),
                              e.abrupt("return")
                            );
                          case 24:
                            if (200 !== c.status) {
                              e.next = 30;
                              break;
                            }
                            a.setState({ redirect: !0 }),
                              a.setState({
                                errors:
                                  "Please check your email to reset your password!",
                              }),
                              a.setState({ redirect: !0 }),
                              (e.next = 33);
                            break;
                          case 30:
                            if (500 !== c.status) {
                              e.next = 33;
                              break;
                            }
                            return (
                              a.setState({ errors: c.message }),
                              e.abrupt("return")
                            );
                          case 33:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })()),
              (a.state = {
                email: { address: "" },
                errors: "",
                loaderActive: !1,
              }),
              a
            );
          }
          return (
            Object(l.a)(s, [
              { key: "componentDidMount", value: function () {} },
              {
                key: "render",
                value: function () {
                  var e = this;
                  return Object(w.jsx)("div", {
                    children: Object(w.jsx)("section", {
                      className: "login_wraper",
                      children: Object(w.jsx)("div", {
                        className: "container-fluid",
                        children: Object(w.jsxs)("div", {
                          className: "row align-items-center",
                          children: [
                            Object(w.jsx)("div", {
                              className:
                                "col-xl- col-lg-7 col-md-7 col-sm-12 border-r",
                              children: Object(w.jsxs)("div", {
                                className: "login-content",
                                children: [
                                  Object(w.jsx)("h3", {
                                    children:
                                      "How well do you really know your friends if you don't know their goals?",
                                  }),
                                  Object(w.jsx)("p", {
                                    children:
                                      "Keep up with your friend\u2019s life goals and enjoy helping them!",
                                  }),
                                  Object(w.jsx)("img", {
                                    src: "assets/images/login_img.png",
                                    className: "img-fluid mt-5",
                                    alt: "",
                                  }),
                                ],
                              }),
                            }),
                            Object(w.jsx)("div", {
                              className: "col-xl-4 col-lg-5 col-md-5 col-sm-12",
                              children: Object(w.jsx)("form", {
                                "accept-charset": "utf-8",
                                children: Object(w.jsxs)("div", {
                                  className: "form_inner_box",
                                  children: [
                                    Object(w.jsx)("img", {
                                      src: "assets/images/Logo.png",
                                      className: "img-fluid",
                                      alt: "",
                                    }),
                                    Object(w.jsx)("h3", {
                                      className: "text-center",
                                      children: "Find Your Account",
                                    }),
                                    Object(w.jsxs)("div", {
                                      className: "form-group mb_30",
                                      children: [
                                        Object(w.jsx)("label", {
                                          className: "input_lable",
                                          children: "Email address",
                                        }),
                                        Object(w.jsx)("input", {
                                          type: "text",
                                          name: "email",
                                          className: "form-control",
                                          onChange: function (t) {
                                            e.onChange(t);
                                          },
                                          value: this.state.email.address,
                                          placeholder: "email@email.com",
                                        }),
                                      ],
                                    }),
                                    Object(w.jsxs)("div", {
                                      className: "iagree_radio",
                                      children: [
                                        Object(w.jsx)("span", {
                                          className: "error",
                                          id: "iagree_to_be_contacted_error",
                                          style: { display: "none" },
                                          children:
                                            "please accept our terms of business",
                                        }),
                                        this.state.errors
                                          ? Object(w.jsx)("div", {
                                              style: { color: "#FE6E00" },
                                              className: "alert alert-danger",
                                              children: this.state.errors,
                                            })
                                          : "",
                                      ],
                                    }),
                                    Object(w.jsx)("button", {
                                      className:
                                        "theme_btn text-center d-flex mx-auto mb-3 mt_3",
                                      onClick: function (t) {
                                        e.ForgetPassword(t);
                                      },
                                      children: "Send Email",
                                    }),
                                    Object(w.jsx)("div", {
                                      className: "top-bar",
                                      children: Object(w.jsxs)("span", {
                                        children: [
                                          "Create A New Account?",
                                          " ",
                                          Object(w.jsx)("a", {
                                            class: "link",
                                            href: "/#/register",
                                            children: "Register",
                                          }),
                                        ],
                                      }),
                                    }),
                                  ],
                                }),
                              }),
                            }),
                          ],
                        }),
                      }),
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(a.Component),
        Ie = (function (e) {
          Object(o.a)(s, e);
          var t = Object(d.a)(s);
          function s() {
            var e;
            Object(i.a)(this, s);
            for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
              r[n] = arguments[n];
            return ((e = t.call.apply(t, [this].concat(r))).state = {}), e;
          }
          return (
            Object(l.a)(s, [
              {
                key: "render",
                value: function () {
                  return Object(w.jsx)(h.a, {
                    children: Object(w.jsxs)(j.d, {
                      children: [
                        Object(w.jsx)(j.b, {
                          exact: !0,
                          path: "/",
                          name: "login",
                          component: C,
                        }),
                        Object(w.jsx)(j.b, {
                          path: "/login",
                          name: "login",
                          component: C,
                        }),
                        Object(w.jsx)(j.b, {
                          path: "/Register",
                          name: "Register",
                          component: Ae,
                        }),
                        Object(w.jsx)(j.b, {
                          path: "/ForgetPassEmail",
                          name: "ForgetPassEmail",
                          component: Pe,
                        }),
                        Object(w.jsx)(j.b, { path: "/admin", component: oe }),
                        Object(w.jsx)(j.b, {
                          path: "/affiliate",
                          component: Se,
                        }),
                        Object(w.jsx)(j.b, {
                          exact: !0,
                          path: "/forgetPassword/:token",
                          name: "Forget Password",
                          component: _,
                        }),
                      ],
                    }),
                  });
                },
              },
            ]),
            s
          );
        })(a.Component);
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      (window.loginExpiresAfter = 1440),
        (window.APPURL = "https://goalmogul-affiliate.herokuapp.com/"),
        (window.APIURL = "https://goalmogul-affiliate.herokuapp.com/"),
        c.a.render(Object(w.jsx)(Ie, {}), document.getElementById("root")),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready.then(function (e) {
            e.unregister();
          });
    },
  },
  [[187, 1, 2]],
]);
//# sourceMappingURL=main.f3a5113b.chunk.js.map

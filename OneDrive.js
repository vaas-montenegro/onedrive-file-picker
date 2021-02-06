//! Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// https://opensource.org/licenses/MIT
var __extends = this && this.__extends || function(e, t) {
    for (var r in t)
        t.hasOwnProperty(r) && (e[r] = t[r]);
    function i() {
        this.constructor = e
    }
    i.prototype = t.prototype;
    e.prototype = new i
}
;
!function(e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).OneDrive = e()
    }
}(function() {
    return function o(a, s, u) {
        function l(t, e) {
            if (!s[t]) {
                if (!a[t]) {
                    var r = "function" == typeof require && require;
                    if (!e && r)
                        return r(t, !0);
                    if (d)
                        return d(t, !0);
                    var i = new Error("Cannot find module '" + t + "'");
                    throw i.code = "MODULE_NOT_FOUND",
                    i
                }
                var n = s[t] = {
                    exports: {}
                };
                a[t][0].call(n.exports, function(e) {
                    return l(a[t][1][e] || e)
                }, n, n.exports, o, a, s, u)
            }
            return s[t].exports
        }
        for (var d = "function" == typeof require && require, e = 0; e < u.length; e++)
            l(u[e]);
        return l
    }({
        1: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = function() {
                    function e() {}
                    e.SDK_VERSION = "js-v" + (e.SDK_VERSION_NUMBER = "7.2");
                    e.TYPE_BOOLEAN = "boolean";
                    e.TYPE_FUNCTION = "function";
                    e.TYPE_OBJECT = "object";
                    e.TYPE_STRING = "string";
                    e.TYPE_NUMBER = "number";
                    e.VROOM_URL = "https://api.onedrive.com/v1.0/";
                    e.VROOM_ENDPOINT_HINT = "api.onedrive.com";
                    e.GRAPH_URL = "https://graph.microsoft.com/v1.0/";
                    e.NONCE_LENGTH = 5;
                    e.CUSTOMER_TID = "9188040d-6c67-4c5b-b112-36a304b66dad";
                    e.DEFAULT_QUERY_ITEM_PARAMETER = "select=id";
                    return e
                }();
                t.default = r
            }(0, r)
        }
        , {}],
        2: [function(e, t, r) {
            t.exports = function(e, t, r, i) {
                "use strict";
                var n = function() {
                    function e() {}
                    e.open = function(e) {
                        r.default.open(e)
                    }
                    ;
                    e.save = function(e) {
                        r.default.save(e)
                    }
                    ;
                    return e
                }();
                i.onAuth();
                return n
            }(0, 0, e("./OneDriveApp"), e("./controllers/Oauth"))
        }
        , {
            "./OneDriveApp": 3,
            "./controllers/Oauth": 7
        }],
        3: [function(e, t, r) {
            !function(e, t, r, i, n, o, a, s) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var u = function() {
                    function t() {}
                    t.open = function(e) {
                        if (t.isReady()) {
                            e || r.throwError(new o.default(i.default.unknown,"missing picker options")).exposeToPublic();
                            n.default.logMessage("open started");
                            new a.default(e).launchInvoker().then(function() {
                                t.reset()
                            })
                        }
                    }
                    ;
                    t.save = function(e) {
                        if (t.isReady()) {
                            e || r.throwError(new o.default(i.default.unknown,"missing saver options"));
                            n.default.logMessage("save started");
                            new s.default(e).launchInvoker().then(function() {
                                t.reset()
                            })
                        }
                    }
                    ;
                    t.reset = function() {
                        t.checked = !1
                    }
                    ;
                    t.isReady = function() {
                        return !t.checked && (t.checked = !0)
                    }
                    ;
                    t.checked = !1;
                    return t
                }();
                t.default = u
            }(0, r, e("./utilities/ErrorHandler"), e("./models/ErrorType"), e("./utilities/Logging"), e("./models/OneDriveSdkError"), e("./controllers/Picker"), e("./controllers/Saver"))
        }
        , {
            "./controllers/Picker": 8,
            "./controllers/Saver": 10,
            "./models/ErrorType": 13,
            "./models/OneDriveSdkError": 16,
            "./utilities/ErrorHandler": 26,
            "./utilities/Logging": 27
        }],
        4: [function(e, t, r) {
            !function(e, t, d, p, f, c, h, v, m, g, y) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var _ = 100
                  , E = 5
                  , w = 18e5
                  , i = "root";
                function T(e, t, r) {
                    var i = b(e, t.apiEndpointUrl);
                    r && (i = m.appendToPath(i, "?" + r));
                    var o = new g.default({
                        url: i,
                        clientId: t.clientId,
                        method: g.default.HTTP_GET,
                        apiEndpoint: t.apiEndpoint,
                        headers: {
                            Authorization: "bearer " + t.accessToken
                        }
                    });
                    f.default.logMessage("performing GET on item with id: " + e.id);
                    return new y.Promise(function(i, n) {
                        o.start(function(e, t) {
                            var r = JSON.parse(e.responseText);
                            i(r)
                        }, function(e, t, r) {
                            n({
                                errorCode: p.default[p.default.webRequestFailure],
                                message: "HTTP error status: " + t
                            })
                        })
                    }
                    )
                }
                t.getItem = T;
                t.getItems = function(e, t, r) {
                    for (var i = [], n = {
                        webUrl: null,
                        value: []
                    }, o = 0, a = e.value; o < a.length; o++) {
                        var s = a[o];
                        i.push(T(s, t, r))
                    }
                    return y.Promise.all(i).then(function(e) {
                        n.value = e;
                        return n
                    }, function(e) {
                        f.default.logError("Received ajax error.", e);
                        return e
                    })
                }
                ;
                function u(o, e, t) {
                    var a = m.appendToPath(b(o, e.apiEndpointUrl), v.format("{0}.createLink", e.apiActionNamingSpace))
                      , r = new g.default({
                        url: a,
                        clientId: e.clientId,
                        method: g.default.HTTP_POST,
                        apiEndpoint: e.apiEndpoint,
                        headers: {
                            Authorization: "bearer " + e.accessToken
                        },
                        json: JSON.stringify(t)
                    });
                    return new y.Promise(function(i, n) {
                        r.start(function(e, t, r) {
                            f.default.logMessage(v.format("POST createLink succeeded via path {0}", a));
                            o.permissions = [JSON.parse(e.responseText)];
                            i(o)
                        }, function(e, t, r) {
                            f.default.logMessage(v.format("POST createLink failed via path {0}", a));
                            n({
                                errorCode: p.default[p.default.webRequestFailure],
                                message: t
                            })
                        })
                    }
                    )
                }
                t.shareItem = u;
                t.shareItems = function(e, t, r) {
                    for (var i = [], n = {
                        webUrl: null,
                        value: []
                    }, o = 0, a = e.value; o < a.length; o++) {
                        var s = a[o];
                        i.push(u(s, t, r))
                    }
                    return y.Promise.all(i).then(function(e) {
                        n.value = e;
                        return n
                    }, function(e) {
                        f.default.logError("Received sharing error.", e);
                        return e
                    })
                }
                ;
                t.saveItemByFormUpload = function(u, l, e, d, c) {
                    var t = null;
                    return new y.Promise(function(a, s) {
                        window.File && e instanceof window.File ? t = new FileReader : s(new h.default(p.default.unsupportedFeature,"FileReader is not supported in this browser"));
                        t.onerror = function(e) {
                            f.default.logError("failed to read or upload the file", e);
                            s(new h.default(p.default.fileReaderFailure,"failed to read or upload the file, see console log for details"))
                        }
                        ;
                        t.onload = function(e) {
                            var t = m.appendToPath(b(u, d.apiEndpointUrl), "children('" + l.name + "')/content")
                              , r = {};
                            r["@name.conflictBehavior"] = l["@name.conflictBehavior"];
                            var i = {};
                            i.Authorization = "bearer " + d.accessToken;
                            i["Content-Type"] = "multipart/form-data";
                            var n = new g.default({
                                url: m.appendQueryStrings(t, r),
                                clientId: d.clientId,
                                headers: i,
                                apiEndpoint: d.apiEndpoint
                            })
                              , o = e.target.result;
                            n.upload(o, function(e, t) {
                                a({
                                    webUrl: null,
                                    value: [JSON.parse(e.responseText)]
                                })
                            }, function(e, t, r) {
                                s(new h.default(p.default.webRequestFailure,v.format("file uploading failed by form uplaod with HTTP status: {0}", t)))
                            }, function(e, t) {
                                c(t.progressPercentage)
                            })
                        }
                        ;
                        t.readAsArrayBuffer(e)
                    }
                    )
                }
                ;
                t.saveItemByUriUpload = function(e, t, r, i) {
                    var n, o = m.appendToPath(b(e, i.apiEndpointUrl), "children"), a = {
                        Prefer: "respond-async"
                    };
                    a.Authorization = "bearer " + i.accessToken;
                    t[(n = i.apiEndpoint,
                    n === d.default.graph_odb || n === d.default.graph_odc ? "@microsoft.graph.sourceUrl" : "@content.sourceUrl")] = r;
                    t.file = {};
                    var s, u, l = new g.default({
                        url: o,
                        clientId: i.clientId,
                        method: g.default.HTTP_POST,
                        headers: a,
                        json: JSON.stringify(t),
                        apiEndpoint: i.apiEndpoint
                    });
                    return m.isPathDataUrl(r) ? (u = l,
                    new y.Promise(function(i, n) {
                        u.start(function(e, t) {
                            if (200 === t || 201 === t) {
                                var r = {
                                    webUrl: null,
                                    value: [c.deserializeJSON(e.responseText)]
                                };
                                i(r)
                            } else
                                n(new h.default(p.default.webRequestFailure,v.format("file uploading failed by data uri with HTTP status: {0}", t)))
                        }, function(e, t, r) {
                            n(new h.default(p.default.webRequestFailure,v.format("file uploading failed with HTTP status: {0}", t)))
                        })
                    }
                    )) : m.isPathFullUrl(r) ? (s = l,
                    new y.Promise(function(i, n) {
                        s.start(function(e, t) {
                            if (202 === t) {
                                var r = e.getResponseHeader("Location");
                                r || n({
                                    errorCode: p.default.badResponse,
                                    message: "missing 'Location' header on response"
                                });
                                i(r)
                            } else
                                n(new h.default(p.default.webRequestFailure,v.format("create upload by url job failed with HTTP status: {0}", t)))
                        }, function(e, t, r) {
                            n(new h.default(p.default.webRequestFailure,v.format("create upload by url job failed with HTTP status: {0}", t)))
                        })
                    }
                    )).then(function(e) {
                        return (s = e,
                        new y.Promise(function(n, a) {
                            !function t(r, i) {
                                if (!r--) {
                                    i *= 2;
                                    r = E
                                }
                                (e = s,
                                o = new g.default({
                                    url: e,
                                    method: g.default.HTTP_GET
                                }),
                                new y.Promise(function(i, n) {
                                    o.start(function(e, t) {
                                        switch (t) {
                                        case 202:
                                        case 200:
                                            var r = c.deserializeJSON(e.responseText);
                                            i(r);
                                            break;
                                        default:
                                            n(new h.default(p.default.webRequestFailure,v.format("polling upload job failed with HTTP status: {0}", t)))
                                        }
                                    }, function(e, t, r) {
                                        n(new h.default(p.default.webRequestFailure,v.format("polling upload job failed with HTTP status: {0}", t)))
                                    })
                                }
                                )).then(function(e) {
                                    e.resourceId ? n(e.resourceId) : i <= w ? setTimeout(t(r, i), i) : a(new h.default(p.default.webRequestFailure,"polling the uploading job takes too much time"))
                                });
                                var e, o
                            }(E, _)
                        }
                        )).then(function(e) {
                            return T({
                                id: e
                            }, i).then(function(e) {
                                var t = {
                                    webUrl: null,
                                    value: [e]
                                };
                                return y.Promise.resolve(t)
                            })
                        });
                        var s
                    }) : void 0
                }
                ;
                t.getUserTenantUrl = function(e) {
                    var t = m.appendQueryString(m.appendToPath(e.apiEndpointUrl, "me"), "$select", "mySite")
                      , r = {};
                    r.Authorization = "bearer " + e.accessToken;
                    r.Accept = "application/json";
                    var o = new g.default({
                        url: t,
                        clientId: e.clientId,
                        method: g.default.HTTP_GET,
                        headers: r,
                        apiEndpoint: e.apiEndpoint
                    });
                    return new y.Promise(function(i, n) {
                        o.start(function(e, t) {
                            var r = c.deserializeJSON(e.responseText);
                            r.mySite ? i(r.mySite) : n(new h.default(p.default.badResponse,v.format("Cannot find the personal tenant url, response text: {0}", e.responseText)))
                        }, function(e, t, r) {
                            n(new h.default(p.default.webRequestFailure,v.format("graph/me request failed, status code: '{0}', response text: '{1}'", g.default.statusCodeToString(t), e.responseText)))
                        })
                    }
                    )
                }
                ;
                function b(e, t) {
                    var r;
                    r = e.parentReference && e.parentReference.driveId ? m.appendToPath("drives", e.parentReference.driveId) : "drive";
                    r = m.appendToPath(r, e.id === i ? "root" : "items/" + e.id);
                    return m.appendToPath(t, r)
                }
            }(0, r, e("../models/ApiEndpoint"), e("../models/ErrorType"), e("../utilities/Logging"), e("../utilities/ObjectUtilities"), e("../models/OneDriveSdkError"), e("../utilities/StringUtilities"), e("../utilities/UrlUtilities"), e("../utilities/XHR"), e("es6-promise"))
        }
        , {
            "../models/ApiEndpoint": 11,
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "../utilities/Logging": 27,
            "../utilities/ObjectUtilities": 28,
            "../utilities/StringUtilities": 30,
            "../utilities/UrlUtilities": 32,
            "../utilities/XHR": 33,
            "es6-promise": 34
        }],
        5: [function(e, t, r) {
            !function(e, t, n, o, d, c, p, f, r, a, i, h, s, u, v, m, l) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var g = function() {
                    function e(e) {
                        this.invokerOptions = e;
                        this.popup = new u.default
                    }
                    e.prototype.launchInvoker = function() {
                        var e = this
                          , t = this.invokerOptions;
                        return this.launch().catch(function(e) {
                            r.default.logError("Failed due to unknown error: ", e);
                            t.error(e)
                        }).then(function() {
                            e.cleanPopupAndIFrame()
                        })
                    }
                    ;
                    e.prototype.launch = function(e) {
                        var l = this;
                        return this.buildOauthPromise(e).then(function(e) {
                            return e && "cancel" === e.type ? e : l.buildPickerUI(e)
                        }).then(function(e) {
                            var t = l.invokerOptions;
                            e.type || p.throwError(new h.default(f.default.badResponse,m.format("received bad response from picker UX: {0}", JSON.stringify(e)))).exposeToPublic();
                            if ("switch" === e.type)
                                return l.launch(!0);
                            if ("success" === e.type) {
                                for (var r = [], i = !1, n = 0, o = e.items; n < o.length; n++) {
                                    var a = o[n];
                                    a.driveItem && !i && (i = !0);
                                    r.push(a)
                                }
                                var s = {
                                    webUrl: null,
                                    value: r
                                }
                                  , u = void 0;
                                if (!t.needAPICall() || i && "rps" === t.accessToken.toLowerCase()) {
                                    l.invokerOptions.forceAuthenticate && (l.apiRequestConfig = l.buildApiConfig());
                                    u = v.Promise.resolve(s)
                                } else {
                                    l.apiRequestConfig = l.buildApiConfig();
                                    u = l.makeApiRequest(s)
                                }
                                return u.then(function(e) {
                                    l.oauthResponse && (e.accessToken = l.oauthResponse.accessToken);
                                    l.apiRequestConfig ? e.apiEndpoint = l.apiRequestConfig.apiEndpointUrl : l.loginHint && l.loginHint.endpointHint === c.default.aad && (e.apiEndpoint = d.default.GRAPH_URL);
                                    t.success(e);
                                    return e
                                })
                            }
                            if ("cancel" === e.type) {
                                t.cancel();
                                return v.Promise.resolve({
                                    webUrl: null,
                                    value: null
                                })
                            }
                        })
                    }
                    ;
                    e.prototype.buildOauthPromise = function(e) {
                        return e || this.invokerOptions.needOauth() ? i.auth(i.buildOauthConfig(this.invokerOptions, e), this.popup) : v.Promise.resolve(null)
                    }
                    ;
                    e.prototype.buildPickerUI = function(e) {
                        var r, i = this;
                        if (e) {
                            this.oauthResponse = e;
                            r = a.updateLoginHint(this.invokerOptions.clientId, this.oauthResponse.idToken, this.invokerOptions)
                        } else {
                            this.invokerOptions.endpointHint !== c.default.msa && this.invokerOptions.endpointHint !== c.default.tenant && p.throwError(new h.default(f.default.optionsError,"must specify the endpointHint in advanced options as 'api.onedrive.com' for customer picker or the url for business picker/tenant")).exposeToPublic();
                            var t = this.invokerOptions.endpointHint === c.default.msa;
                            r = {
                                loginHint: null,
                                timeStamp: null,
                                apiEndpoint: t ? n.default.msa : n.default.filesV2,
                                endpointHint: t ? c.default.msa : c.default.tenant,
                                isConsumerAccount: t
                            }
                        }
                        return ((this.loginHint = r).apiEndpoint === n.default.graph_odb ? o.getUserTenantUrl(this.buildApiConfig()) : v.Promise.resolve(void 0)).then(function(e) {
                            i.pickerUX = s.generatePickerUX(r.apiEndpoint, r.endpointHint === c.default.tenant ? i.invokerOptions.siteUrl : e);
                            var t = i.buildPickerUXConfig(i.invokerOptions);
                            i.invokerOptions.navEntryLocation && (t.entryLocation = i.invokerOptions.navEntryLocation);
                            i.invokerOptions.navSourceTypes && (t.sourceTypes = i.invokerOptions.navSourceTypes);
                            i.invokerOptions.linkType && (t.linkType = i.invokerOptions.linkType);
                            t.trapFocus = i.invokerOptions.trapFocus;
                            return i.pickerUX.invokePickerUX(t, i.popup)
                        })
                    }
                    ;
                    e.prototype.getApiRequestConfig = function() {
                        return this.apiRequestConfig
                    }
                    ;
                    e.prototype.buildApiConfig = function() {
                        this.loginHint || p.throwError(new h.default(f.default.internalError,"missing loginHint when trying to build API request")).exposeToPublic();
                        this.oauthResponse || this.invokerOptions.accessToken || p.throwError(new h.default(f.default.internalError,"missing access token when trying to build API request")).exposeToPublic();
                        var e = null
                          , t = null;
                        switch (this.loginHint.apiEndpoint) {
                        case n.default.graph_odb:
                        case n.default.graph_odc:
                            e = d.default.GRAPH_URL;
                            t = "microsoft.graph";
                            break;
                        case n.default.msa:
                            e = d.default.VROOM_URL;
                            t = "action";
                            break;
                        case n.default.filesV2:
                            e = l.appendToPath(this.invokerOptions.siteUrl, "_api/v2.0/");
                            t = "action";
                            break;
                        default:
                            p.throwError(new h.default(f.default.internalError,"apiEndpoint in loginHint is not correct"))
                        }
                        return {
                            accessToken: this.oauthResponse ? this.oauthResponse.accessToken : this.invokerOptions.accessToken,
                            apiEndpoint: this.loginHint.apiEndpoint,
                            apiEndpointUrl: e,
                            apiActionNamingSpace: t,
                            clientId: this.invokerOptions.clientId
                        }
                    }
                    ;
                    e.prototype.cleanPopupAndIFrame = function() {
                        this.popup && this.popup.close();
                        this.pickerUX && this.pickerUX.removeIFrame()
                    }
                    ;
                    return e
                }();
                t.default = g
            }(0, r, e("../models/ApiEndpoint"), e("./ApiRequest"), e("../Constants"), e("../models/DomainHint"), e("../utilities/ErrorHandler"), e("../models/ErrorType"), e("../utilities/Logging"), e("./LoginCache"), e("./Oauth"), e("../models/OneDriveSdkError"), e("./PickerUX"), e("../utilities/Popup"), e("es6-promise"), e("../utilities/StringUtilities"), e("../utilities/UrlUtilities"))
        }
        , {
            "../Constants": 1,
            "../models/ApiEndpoint": 11,
            "../models/DomainHint": 12,
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "../utilities/ErrorHandler": 26,
            "../utilities/Logging": 27,
            "../utilities/Popup": 29,
            "../utilities/StringUtilities": 30,
            "../utilities/UrlUtilities": 32,
            "./ApiRequest": 4,
            "./LoginCache": 6,
            "./Oauth": 7,
            "./PickerUX": 9,
            "es6-promise": 34
        }],
        6: [function(e, t, r) {
            !function(e, t, d, c, p, f, i, n, o, a) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var s = "preferred_username"
                  , h = "odsdkLoginHint";
                t.getLoginHint = function(e) {
                    e || i.throwError(new o.default(n.default.optionsError,"invoker option is not defined!"));
                    var t = (c.getCacheItem(h) || {})["od7-" + e.clientId];
                    return t ? e.endpointHint !== t.endpointHint ? null : e.loginHint && e.loginHint !== t.loginHint ? null : t : null
                }
                ;
                t.loginHintExpired = function() {
                    var e = c.getCacheItem(h);
                    return 36e5 < (new Date).getTime() - e.timeStamp
                }
                ;
                t.updateLoginHint = function(e, t, r) {
                    var i, n, o, a;
                    switch (r.endpointHint) {
                    case f.default.aad:
                        var s = this.parseIdToken(t);
                        i = s.preferredUserName;
                        if (s.tid === p.default.CUSTOMER_TID) {
                            o = d.default.graph_odc;
                            a = !0
                        } else {
                            o = d.default.graph_odb;
                            a = !1
                        }
                        n = f.default.aad;
                        break;
                    case f.default.msa:
                        o = d.default.msa;
                        n = f.default.msa;
                        i = r.loginHint;
                        a = !0;
                        break;
                    case f.default.tenant:
                        o = d.default.filesV2;
                        n = f.default.tenant;
                        i = r.loginHint;
                        a = !1
                    }
                    var u = {
                        apiEndpoint: o,
                        loginHint: i,
                        endpointHint: n,
                        timeStamp: (new Date).getTime(),
                        isConsumerAccount: a
                    }
                      , l = c.getCacheItem(h) || {};
                    l["od7-" + e] = u;
                    c.setCacheItem(h, l);
                    return u
                }
                ;
                t.parseIdToken = function(e) {
                    e || i.throwError(new o.default(n.default.badResponse,"id_token is missing in oauth response"));
                    var t = e.split(".")[1].replace("-", "+").replace("_", "/")
                      , r = a.deserializeJSON(atob(t));
                    r.tid || i.throwError(new o.default(n.default.badResponse,"tid is missing in id_token response"));
                    r[s] || i.throwError(new o.default(n.default.badResponse,"preferred_username is missing in id_token response"));
                    return {
                        tid: r.tid,
                        preferredUserName: r[s]
                    }
                }
            }(0, r, e("../models/ApiEndpoint"), e("../utilities/Cache"), e("../Constants"), e("../models/DomainHint"), e("../utilities/ErrorHandler"), e("../models/ErrorType"), e("../models/OneDriveSdkError"), e("../utilities/ObjectUtilities"))
        }
        , {
            "../Constants": 1,
            "../models/ApiEndpoint": 11,
            "../models/DomainHint": 12,
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "../utilities/Cache": 22,
            "../utilities/ErrorHandler": 26,
            "../utilities/ObjectUtilities": 28
        }],
        7: [function(e, t, r) {
            !function(e, t, r, a, u, s, l, d, c, p, i, f) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var n = "access_token"
                  , o = "error"
                  , h = "error_description"
                  , v = "id_token"
                  , m = "oauth"
                  , g = "state"
                  , y = "https://login.microsoftonline.com/common/oauth2/authorize"
                  , _ = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize"
                  , E = "https://login.live.com/oauth20_authorize.srf"
                  , w = "[OneDriveSDK-OauthResponse]";
                t.onAuth = function() {
                    u.onDocumentReady(function() {
                        var e = f.readCurrentUrlParameters();
                        (e[m] || (e[o] || e[n]) && e[g]) && window.opener && T(e, new r.default(window.opener))
                    })
                }
                ;
                function T(e, t) {
                    u.displayOverlay();
                    e[m] ? function(e) {
                        var t;
                        switch (e.endpoint) {
                        case c.default.AAD:
                            t = (o = e,
                            f.appendQueryStrings(y, {
                                redirect_uri: o.redirectUri,
                                client_id: o.clientId,
                                response_type: "token",
                                state: o.state,
                                resource: o.resource || o.origin
                            }));
                            break;
                        case c.default.AADv2:
                            t = (i = "profile openid https://graph.microsoft.com/User.Read " + (r = e).scopes.map(function(e) {
                                return "https://graph.microsoft.com/" + e
                            }).join(" "),
                            n = f.appendQueryStrings(_, {
                                redirect_uri: r.redirectUri,
                                client_id: r.clientId,
                                scope: i,
                                response_mode: "fragment",
                                state: r.state,
                                nonce: f.generateNonce()
                            }),
                            n += "&response_type=id_token+token");
                            break;
                        case c.default.MSA:
                            t = function(e) {
                                for (var t = !1, r = 0, i = e.scopes; r < i.length; r++) {
                                    var n = i[r];
                                    t = t || 1 < n.toLowerCase().indexOf("readwrite")
                                }
                                return f.appendQueryStrings(E, {
                                    redirect_uri: e.redirectUri,
                                    client_id: e.clientId,
                                    response_type: "token",
                                    state: e.state,
                                    scope: "onedrive." + (t ? "readwrite" : "readonly")
                                })
                            }(e);
                            break;
                        default:
                            s.throwError(new p.default(l.default.badResponse,"received bad oauth endpoint, endpoint value is: " + e.endpoint))
                        }
                        var r, i, n;
                        var o;
                        if (e.switchAccount)
                            t = f.appendQueryString(t, "prompt", "select_account");
                        else if (e.loginHint) {
                            t = f.appendQueryString(t, "login_hint", e.loginHint);
                            t = f.appendQueryString(t, "domain_hint", e.isConsumerAccount ? "consumers" : "organizations")
                        }
                        f.redirect(t)
                    }(JSON.parse(e[m])) : e[o] ? b((i = e,
                    {
                        type: "error",
                        error: new p.default(l.default.badResponse,i[h]),
                        state: i[g]
                    }), t) : e[n] && b({
                        type: "success",
                        accessToken: (r = e)[n],
                        idToken: r[v],
                        state: r[g]
                    }, t);
                    var r, i
                }
                t.handleOauth = T;
                function b(e, t) {
                    if (e.state) {
                        2 !== e.state.split("_").length && s.throwError(new p.default(l.default.badResponse,"received bad state parameter from Oauth endpoint, state received: " + e.state)).exposeToPublic();
                        t ? t.send(w + JSON.stringify(e), window.location.origin) : s.throwError(new p.default(l.default.popupOpen,"opener is not defined")).exposeToPublic()
                    } else
                        s.throwError(new p.default(l.default.badResponse,"missing state parameter from Oauth redirect")).exposeToPublic()
                }
                t.auth = function(e, a) {
                    var s = document.location.origin + "_" + f.generateNonce();
                    e.state = s;
                    return new i.Promise(function(i, n) {
                        var o = u.onMessage(function(e) {
                            if (e.data && 0 === e.data.indexOf(w)) {
                                var t = JSON.parse(e.data.substring(w.length));
                                if (t.state === s && e.source === a.getPopupWindow()) {
                                    u.removeMessageListener(o);
                                    if ("error" === t.type || t.error) {
                                        var r = l.default[t.error.errorCode];
                                        n(new p.default(r,t.error.message))
                                    } else
                                        i(t)
                                } else
                                    n(new p.default(l.default.popupOpen,"Another popup is already opened."))
                            }
                        });
                        return a.openPopup(f.appendQueryString(e.redirectUri, m, JSON.stringify(e))).then(function() {
                            i({
                                type: "cancel",
                                state: s
                            })
                        })
                    }
                    )
                }
                ;
                t.buildOauthConfig = function(t, e) {
                    var r;
                    switch (t.endpointHint) {
                    case a.default.aad:
                        r = c.default.AADv2;
                        break;
                    case a.default.msa:
                        r = c.default.MSA;
                        break;
                    case a.default.tenant:
                        r = c.default.AAD
                    }
                    var i = t.scopes.map(function(e) {
                        return e + (-1 < e.indexOf("Files.") && t.needSharePointPermission ? ".All" : "")
                    })
                      , n = {
                        clientId: t.clientId,
                        endpoint: r,
                        scopes: i,
                        origin: window.location.origin,
                        redirectUri: t.redirectUri,
                        switchAccount: e,
                        resource: t.resource
                    }
                      , o = d.getLoginHint(t);
                    if (t.loginHint) {
                        n.loginHint = t.loginHint;
                        n.isConsumerAccount = t.isConsumerAccount
                    } else if (o) {
                        n.loginHint = o.loginHint;
                        n.isConsumerAccount = o.isConsumerAccount
                    }
                    return n
                }
            }(0, r, e("../utilities/Channel"), e("../models/DomainHint"), e("../utilities/DomUtilities"), e("../utilities/ErrorHandler"), e("../models/ErrorType"), e("./LoginCache"), e("../models/OauthEndpoint"), e("../models/OneDriveSdkError"), e("es6-promise"), e("../utilities/UrlUtilities"))
        }
        , {
            "../models/DomainHint": 12,
            "../models/ErrorType": 13,
            "../models/OauthEndpoint": 15,
            "../models/OneDriveSdkError": 16,
            "../utilities/Channel": 24,
            "../utilities/DomUtilities": 25,
            "../utilities/ErrorHandler": 26,
            "../utilities/UrlUtilities": 32,
            "./LoginCache": 6,
            "es6-promise": 34
        }],
        8: [function(e, t, r) {
            !function(e, t, r, n, o, i, a, s, u, l, d) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var c = function(i) {
                    __extends(t, i);
                    function t(e) {
                        var t = a.shallowClone(e)
                          , r = new s.default(t);
                        return i.call(this, r) || this
                    }
                    t.prototype.buildPickerUXConfig = function(e) {
                        return {
                            applicationId: e.clientId,
                            accessLevel: t.ACCESS_LEVEL,
                            filter: e.filter,
                            id: d.generateNonce(),
                            navEnabled: e.navEnabled,
                            origin: window.location.origin,
                            parentDiv: e.parentDiv,
                            redirectUri: e.redirectUri,
                            selectionMode: e.multiSelect ? "multiple" : "single",
                            viewType: e.viewType || "files",
                            accountSwitchEnabled: e.accountSwitchEnabled,
                            commandMode: e.commandMode,
                            qosExtraData: e.qosExtraData
                        }
                    }
                    ;
                    t.prototype.makeApiRequest = function(e) {
                        if (this.invokerOptions.action === u.default.share)
                            return this.shareItems(e);
                        var t = this.invokerOptions.action === u.default.download;
                        return this.queryItems(e, t)
                    }
                    ;
                    t.prototype.queryItems = function(e, t) {
                        var r = this.invokerOptions.queryParameters || o.default.DEFAULT_QUERY_ITEM_PARAMETER;
                        t && (r = l.format("{0}{1}{2}", r, -1 === r.indexOf("select") ? "&select=" : ",", "name,size,@content.downloadUrl"));
                        return n.getItems(e, this.getApiRequestConfig(), r)
                    }
                    ;
                    t.prototype.shareItems = function(e) {
                        var t = this
                          , r = this.invokerOptions.createLinkParameters || this.getDefaultSharingConfig();
                        return n.getItems(e, this.getApiRequestConfig()).then(function(e) {
                            return n.shareItems(e, t.getApiRequestConfig(), r)
                        })
                    }
                    ;
                    t.prototype.getDefaultSharingConfig = function() {
                        var e = {
                            type: "view"
                        };
                        if (this.getApiRequestConfig().apiEndpoint === r.default.graph_odc || this.getApiRequestConfig().apiEndpoint === r.default.msa)
                            return e;
                        e.scope = "organization";
                        return e
                    }
                    ;
                    t.ACCESS_LEVEL = "read";
                    return t
                }(i.default);
                t.default = c
            }(0, r, e("../models/ApiEndpoint"), e("./ApiRequest"), e("../Constants"), e("./Invoker"), e("../utilities/ObjectUtilities"), e("../models/PickerOptions"), e("../models/PickerActionType"), e("../utilities/StringUtilities"), e("../utilities/UrlUtilities"))
        }
        , {
            "../Constants": 1,
            "../models/ApiEndpoint": 11,
            "../models/PickerActionType": 17,
            "../models/PickerOptions": 18,
            "../utilities/ObjectUtilities": 28,
            "../utilities/StringUtilities": 30,
            "../utilities/UrlUtilities": 32,
            "./ApiRequest": 4,
            "./Invoker": 5
        }],
        9: [function(e, t, r) {
            !function(e, t, r, f, h, i, n, o, a, s, u, v) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var m = "[OneDrive-FromPicker]";
                t.generatePickerUX = function(e, t) {
                    return new l(e,t)
                }
                ;
                var l = function() {
                    function e(e, t) {
                        if (e === r.default.graph_odc || e === r.default.msa)
                            this.url = s.appendQueryStrings("https://onedrive.live.com/", {
                                v: "2"
                            });
                        else if (e === r.default.graph_odb || e === r.default.filesV2) {
                            t || i.throwError(new a.default(n.default.optionsError,"the site url must be specified")).exposeToPublic();
                            s.validateUrlProtocol(t, ["HTTPS"]);
                            e === r.default.graph_odb && (t = s.appendToPath(t, "_layouts/onedrive.aspx"));
                            this.url = s.appendQueryString(t, "p", "2")
                        }
                    }
                    e.prototype.invokePickerUX = function(d, c) {
                        var p = this;
                        return new u.Promise(function(u, e) {
                            var l = h.onMessage(function(e) {
                                var t = p.url.split("/")
                                  , r = new f.default(p.iframe ? p.iframe.contentWindow : c.getPopupWindow());
                                if (e.origin === t[0] + "//" + t[2]) {
                                    var i = "" + (e.data || "");
                                    if (0 === i.indexOf(m) && e.source === r.getReceiver()) {
                                        var n = JSON.parse(i.substring(m.length))
                                          , o = n.pickerId
                                          , a = n.conversationId
                                          , s = n.type;
                                        if (o === d.id)
                                            if ("initialize" === s)
                                                r.send("[OneDrive-ToPicker]" + JSON.stringify({
                                                    pickerId: o,
                                                    conversationId: a,
                                                    type: "activate"
                                                }), e.origin);
                                            else {
                                                u(n);
                                                h.removeMessageListener(l)
                                            }
                                    }
                                }
                            })
                              , queryStringArgs = {
                                aid: d.applicationId,
                                a: d.accessLevel,
                                id: d.id,
                                l: d.linkType,
                                ln: d.navEnabled,
                                s: d.selectionMode,
                                f: d.filter,
                                v: d.viewType,
                                ru: d.redirectUri,
                                o: d.origin,
                                sdk: v.default.SDK_VERSION_NUMBER,
                                e: d.entryLocation,
                                st: d.sourceTypes,
                                sn: !d.parentDiv,
                                ss: !d.parentDiv && d.accountSwitchEnabled,
                                tf: d.trapFocus,
                                cm: d.commandMode,
                                qos: d.qosExtraData
                            }
                              , r = s.appendQueryString(p.url, "picker", JSON.stringify(queryStringArgs));
                            o.default.logMessage("invoke picker with url: " + r);
                            if (!d.parentDiv)
                                return c.openPopup(r).then(function() {
                                    u({
                                        type: "cancel"
                                    })
                                });
                            c.close();
                            var i = document.createElement("iframe");
                            i.id = "odpicker" + (new Date).getTime();
                            i.style.position = "relative";
                            i.style.width = "100%";
                            i.style.height = "100%";
                            i.src = r;
                            d.parentDiv.appendChild(i);
                            p.iframe = i
                        }
                        )
                    }
                    ;
                    e.prototype.removeIFrame = function() {
                        if (this.iframe) {
                            this.iframe.parentNode.removeChild(this.iframe);
                            this.iframe = null
                        }
                    }
                    ;
                    return e
                }();
                t.default = l
            }(0, r, e("../models/ApiEndpoint"), e("../utilities/Channel"), e("../utilities/DomUtilities"), e("../utilities/ErrorHandler"), e("../models/ErrorType"), e("../utilities/Logging"), e("../models/OneDriveSdkError"), e("../utilities/UrlUtilities"), e("es6-promise"), e("../Constants"))
        }
        , {
            "../Constants": 1,
            "../models/ApiEndpoint": 11,
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "../utilities/Channel": 24,
            "../utilities/DomUtilities": 25,
            "../utilities/ErrorHandler": 26,
            "../utilities/Logging": 27,
            "../utilities/UrlUtilities": 32,
            "es6-promise": 34
        }],
        10: [function(e, t, r) { // Saver
            !function(e, t, n, o, r, a, s, u, l, d) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var i = function(i) {
                    __extends(e, i);
                    function e(e) {
                        var t = a.shallowClone(e)
                          , r = new u.default(t);
                        return i.call(this, r) || this
                    }
                    e.prototype.buildPickerUXConfig = function(e) {
                        return {
                            applicationId: e.clientId,
                            accessLevel: "readwrite",
                            id: d.generateNonce(),
                            navEnabled: e.navEnabled,
                            filter: e.filter,
                            origin: window.location.origin,
                            parentDiv: e.parentDiv,
                            redirectUri: e.redirectUri,
                            selectionMode: "single",
                            viewType: e.viewType,
                            accountSwitchEnabled: e.accountSwitchEnabled,
                            commandMode: e.commandMode,
                            qosExtraData: e.qosExtraData
                        }
                    }
                    ;
                    e.prototype.makeApiRequest = function(e) {
                        var t = this.invokerOptions;
                        if (this.invokerOptions.action === s.default.query) {
                            var r = this.invokerOptions.queryParameters || o.default.DEFAULT_QUERY_ITEM_PARAMETER;
                            return n.getItems(e, this.apiRequestConfig, r)
                        }
                        if (t.uploadType === l.default.dataUrl || t.uploadType === l.default.url) {
                            var i = {
                                name: t.fileName,
                                "@name.conflictBehavior": t.nameConflictBehavior
                            };
                            return n.saveItemByUriUpload(e.value[0], i, t.sourceUri, this.apiRequestConfig)
                        }
                        if (t.uploadType === l.default.form) {
                            i = {
                                name: t.fileName,
                                "@name.conflictBehavior": t.nameConflictBehavior
                            };
                            return n.saveItemByFormUpload(e.value[0], i, t.fileInput, this.apiRequestConfig, t.progress)
                        }
                    }
                    ;
                    return e
                }(r.default);
                t.default = i
            }(0, r, e("./ApiRequest"), e("../Constants"), e("./Invoker"), e("../utilities/ObjectUtilities"), e("../models/SaverActionType"), e("../models/SaverOptions"), e("../models/UploadType"), e("../utilities/UrlUtilities"))
        }
        , {
            "../Constants": 1,
            "../models/SaverActionType": 19,
            "../models/SaverOptions": 20,
            "../models/UploadType": 21,
            "../utilities/ObjectUtilities": 28,
            "../utilities/UrlUtilities": 32,
            "./ApiRequest": 4,
            "./Invoker": 5
        }],
        11: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r;
                !function(e) {
                    e[e.filesV2 = 0] = "filesV2";
                    e[e.graph_odc = 1] = "graph_odc";
                    e[e.graph_odb = 2] = "graph_odb";
                    e[e.msa = 3] = "msa"
                }(r || (r = {}));
                t.default = r
            }(0, r)
        }
        , {}],
        12: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r;
                !function(e) {
                    e[e.aad = 0] = "aad";
                    e[e.msa = 1] = "msa";
                    e[e.tenant = 2] = "tenant"
                }(r || (r = {}));
                t.default = r
            }(0, r)
        }
        , {}],
        13: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r;
                !function(e) {
                    e[e.badResponse = 0] = "badResponse";
                    e[e.fileReaderFailure = 1] = "fileReaderFailure";
                    e[e.popupOpen = 2] = "popupOpen";
                    e[e.unknown = 3] = "unknown";
                    e[e.unsupportedFeature = 4] = "unsupportedFeature";
                    e[e.webRequestFailure = 5] = "webRequestFailure";
                    e[e.internalError = 6] = "internalError";
                    e[e.optionsError = 7] = "optionsError";
                    e[e.typeError = 8] = "typeError";
                    e[e.popupClosed = 9] = "popupClosed"
                }(r || (r = {}));
                t.default = r
            }(0, r)
        }
        , {}],
        14: [function(e, t, r) {
            !function(e, t, o, a, s, u, l, d, c, p, f, h) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = new RegExp("^[a-fA-F\\d]{8}-([a-fA-F\\d]{4}-){3}[a-fA-F\\d]{12}$")
                  , i = function() {
                    function n(e) {
                        this.navEnabled = !0;
                        this.needSharePointPermission = !0;
                        this.clientId = f.validateType(e.clientId, a.default.TYPE_STRING);
                        var t = f.validateCallback(e.cancel, !0);
                        this.cancel = function() {
                            d.default.logMessage("user cancelled operation");
                            t && o.invokeAppCallback(t, !0)
                        }
                        ;
                        var r = f.validateCallback(e.error, !0);
                        this.error = function(e) {
                            if (!r)
                                throw e;
                            o.invokeAppCallback(r, !0, e)
                        }
                        ;
                        this.parseAdvancedOptions(e);
                        this.redirectUri = this.redirectUri || h.trimUrlQuery(window.location.href);
                        this.endpointHint = this.endpointHint || s.default.aad;
                        var i = e.advanced && e.advanced.endpointHint;
                        this.resource = i ? h.getOrigin(i) : void 0;
                        this.forceAuthenticate = e.advanced && e.advanced.forceAuthenticate;
                        n.checkClientId(this.clientId)
                    }
                    n.checkClientId = function(e) {
                        e ? r.test(e) ? d.default.logMessage("parsed client id: " + e) : u.throwError(new c.default(l.default.unknown,p.format("invalid format for client id '{0}' - AAD: 32 characters (HEX) GUID", e))) : u.throwError(new c.default(l.default.unknown,"client id is missing in options"))
                    }
                    ;
                    n.prototype.needOauth = function() {
                        return !!this.forceAuthenticate || this.needAPICall() && !this.accessToken || this.endpointHint === s.default.aad
                    }
                    ;
                    n.prototype.parseAdvancedOptions = function(e) {
                        if (e.advanced) {
                            if (e.advanced.redirectUri) {
                                h.validateRedirectUrlHost(e.advanced.redirectUri);
                                this.redirectUri = e.advanced.redirectUri
                            }
                            if (e.advanced.queryParameters) {
                                var t = h.readUrlParameters("?" + e.advanced.queryParameters);
                                for (var r in t)
                                    "select" !== r.toLowerCase() && "expand" !== r.toLowerCase() && u.throwError(new c.default(l.default.optionsError,p.format("unexpected query key: {0} is found in advanced.queryParameters", r)));
                                var i = t.select
                                  , n = t.expand;
                                i && n ? this.queryParameters = p.format("expand={0}&select={1}", n, i) : n ? this.queryParameters = p.format("expand={0}", n) : i && "select=" + i.split(",").sort().join(",") !== a.default.DEFAULT_QUERY_ITEM_PARAMETER && (this.queryParameters = p.format("select={0}", i))
                            }
                            if (e.advanced.endpointHint) {
                                if (e.advanced.endpointHint.toLowerCase() === a.default.VROOM_ENDPOINT_HINT) {
                                    this.endpointHint = s.default.msa;
                                    void 0 === e.advanced.isConsumerAccount && (this.isConsumerAccount = !0)
                                } else {
                                    var o = f.validateType(e.advanced.endpointHint, "string", !1);
                                    h.validateUrlProtocol(o);
                                    this.endpointHint = s.default.tenant;
                                    void 0 === e.advanced.isConsumerAccount && (this.isConsumerAccount = !1);
                                    this.siteUrl = o
                                }
                                e.advanced.accessToken && (this.accessToken = e.advanced.accessToken)
                            }
                            if (e.advanced.iframeParentDiv) {
                                e.advanced.iframeParentDiv.nodeName && "div" === e.advanced.iframeParentDiv.nodeName.toLowerCase() || u.throwError(new c.default(l.default.optionsError,"the iframe's parent div element is not a DOM object")).exposeToPublic();
                                this.parentDiv = e.advanced.iframeParentDiv
                            }
                            e.advanced.scopes && ("string" == typeof e.advanced.scopes ? this.scopes = [e.advanced.scopes] : e.advanced.scopes instanceof Array && (this.scopes = e.advanced.scopes));
                            this.linkType = e.advanced.linkType;
                            this.parseNavigationOptions(e.advanced.navigation);
                            this.loginHint = e.advanced.loginHint;
                            this.trapFocus = e.advanced.trapFocus;
                            "boolean" == typeof e.advanced.isConsumerAccount && (this.isConsumerAccount = e.advanced.isConsumerAccount);
                            this.filter = e.advanced.filter
                        }
                    }
                    ;
                    n.prototype.parseNavigationOptions = function(e) {
                        if (e) {
                            var t = e.entryLocation;
                            if (t) {
                                if (t.sharePoint) {
                                    var r = t.sharePoint
                                      , i = r.sitePath
                                      , n = r.listPath;
                                    i && h.validateUrlProtocol(i, ["HTTPS"]);
                                    n && h.validateUrlProtocol(n, ["HTTPS"])
                                }
                                this.navEntryLocation = t
                            }
                            var o = e.sourceTypes instanceof Array ? e.sourceTypes : e.sourceTypes ? [e.sourceTypes] : null;
                            if (o) {
                                this.needSharePointPermission = !(1 === o.length && "onedrive" === o[0].toLowerCase());
                                this.navSourceTypes = o
                            }
                            this.navEnabled = !e.disable
                        }
                    }
                    ;
                    return n
                }();
                t.default = i
            }(0, r, e("../utilities/CallbackInvoker"), e("../Constants"), e("./DomainHint"), e("../utilities/ErrorHandler"), e("./ErrorType"), e("../utilities/Logging"), e("./OneDriveSdkError"), e("../utilities/StringUtilities"), e("../utilities/TypeValidators"), e("../utilities/UrlUtilities"))
        }
        , {
            "../Constants": 1,
            "../utilities/CallbackInvoker": 23,
            "../utilities/ErrorHandler": 26,
            "../utilities/Logging": 27,
            "../utilities/StringUtilities": 30,
            "../utilities/TypeValidators": 31,
            "../utilities/UrlUtilities": 32,
            "./DomainHint": 12,
            "./ErrorType": 13,
            "./OneDriveSdkError": 16
        }],
        15: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r;
                !function(e) {
                    e[e.AAD = 0] = "AAD";
                    e[e.AADv2 = 1] = "AADv2";
                    e[e.MSA = 2] = "MSA"
                }(r || (r = {}));
                t.default = r
            }(0, r)
        }
        , {}],
        16: [function(e, t, r) {
            !function(e, t, n, r) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var i = function(i) {
                    __extends(e, i);
                    function e(e, t) {
                        var r = i.call(this, t) || this;
                        r.errorCode = n.default[e];
                        r.message = t;
                        return r
                    }
                    e.prototype.toString = function() {
                        return r.format("[OneDriveSDK Error] errorType: {0}, message: {1}", this.errorCode, this.message)
                    }
                    ;
                    return e
                }(Error);
                t.default = i
            }(0, r, e("../models/ErrorType"), e("../utilities/StringUtilities"))
        }
        , {
            "../models/ErrorType": 13,
            "../utilities/StringUtilities": 30
        }],
        17: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r;
                !function(e) {
                    e[e.download = 0] = "download";
                    e[e.query = 1] = "query";
                    e[e.share = 2] = "share"
                }(r || (r = {}));
                t.default = r
            }(0, r)
        }
        , {}],
        18: [function(e, t, r) {
            !function(e, t, o, a, r, s, u, l) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var i = function(n) {
                    __extends(e, n);
                    function e(e) {
                        var t = n.call(this, e) || this
                          , r = l.validateCallback(e.success, !1);
                        t.success = function(e) {
                            s.default.logMessage("picker operation succeeded");
                            o.invokeAppCallback(r, !0, e)
                        }
                        ;
                        t.multiSelect = l.validateType(e.multiSelect, a.default.TYPE_BOOLEAN, !0, !1);
                        var i = l.validateType(e.action, a.default.TYPE_STRING, !0, u.default[u.default.query]);
                        t.action = u.default[i];
                        t.viewType = l.validateType(e.viewType, a.default.TYPE_STRING, !0, "files");
                        t.accountSwitchEnabled = l.validateType(e.accountSwitchEnabled, a.default.TYPE_BOOLEAN, !0, !0);
                        t.commandMode = l.validateType(e.commandMode, a.default.TYPE_STRING, !0);
                        t.qosExtraData = l.validateType(e.qosExtraData, a.default.TYPE_OBJECT, !0);
                        null === t.commandMode && (t.commandMode = void 0);
                        null === t.qosExtraData && (t.qosExtraData = void 0);
                        e.advanced && (t.createLinkParameters = e.advanced.createLinkParameters);
                        t.scopes || (t.scopes = [t.action === u.default.share ? "Files.ReadWrite" : "Files.Read"]);
                        return t
                    }
                    e.prototype.needAPICall = function() {
                        return !!this.queryParameters || this.action !== u.default.query
                    }
                    ;
                    return e
                }(r.default);
                t.default = i
            }(0, r, e("../utilities/CallbackInvoker"), e("../Constants"), e("./InvokerOptions"), e("../utilities/Logging"), e("./PickerActionType"), e("../utilities/TypeValidators"))
        }
        , {
            "../Constants": 1,
            "../utilities/CallbackInvoker": 23,
            "../utilities/Logging": 27,
            "../utilities/TypeValidators": 31,
            "./InvokerOptions": 14,
            "./PickerActionType": 17
        }],
        19: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r;
                !function(e) {
                    e[e.save = 0] = "save";
                    e[e.query = 1] = "query"
                }(r || (r = {}));
                t.default = r
            }(0, r)
        }
        , {}],
        20: [function(e, t, r) {
            !function(e, t, a, s, r, i, n, o, u, l, d, c, p, f, h) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var v = function(o) {
                    __extends(e, o);
                    function e(e) {
                        var t = o.call(this, e) || this
                          , r = p.validateCallback(e.success, !1);
                        t.success = function(e) {
                            u.default.logMessage("saver operation succeeded");
                            a.invokeAppCallback(r, !0, e)
                        }
                        ;
                        var i = p.validateCallback(e.progress, !0);
                        t.progress = function(e) {
                            u.default.logMessage(c.format("upload progress: {0}%", e));
                            i && a.invokeAppCallback(i, !1, e)
                        }
                        ;
                        var n = p.validateType(e.action, s.default.TYPE_STRING, !0, d.default[d.default.query]);
                        t.action = d.default[n];
                        t.action === d.default.save && t._setFileInfo(e);
                        t.nameConflictBehavior = p.validateType(e.nameConflictBehavior, s.default.TYPE_STRING, !0, "rename");
                        t.scopes || (t.scopes = ["Files.ReadWrite"]);
                        t.commandMode = p.validateType(e.commandMode, s.default.TYPE_STRING, !0);
                        t.qosExtraData = p.validateType(e.qosExtraData, s.default.TYPE_OBJECT, !0);
                        t.viewType = p.validateType(e.viewType, s.default.TYPE_STRING, !0, "folders");
                        null === t.commandMode && (t.commandMode = void 0);
                        null === t.qosExtraData && (t.qosExtraData = void 0);
                        return t
                    }
                    e.prototype.needAPICall = function() {
                        return !!this.queryParameters || this.action === d.default.save
                    }
                    ;
                    e.prototype._setFileInfo = function(e) {
                        e.sourceInputElementId && e.sourceUri && i.throwError(new l.default(n.default.optionsError,"sourceUri and sourceInputElementId are provided, only one is required."));
                        this.sourceInputElementId = e.sourceInputElementId;
                        this.sourceUri = e.sourceUri;
                        var t = p.validateType(e.fileName, s.default.TYPE_STRING, !0, null);
                        if (this.sourceUri) {
                            if (h.isPathFullUrl(this.sourceUri)) {
                                this.uploadType = f.default.url;
                                this.fileName = t || h.getFileNameFromUrl(this.sourceUri);
                                this.fileName || i.throwError(new l.default(n.default.optionsError,"must supply a file name or a URL that ends with a file name"))
                            } else if (h.isPathDataUrl(this.sourceUri)) {
                                this.uploadType = f.default.dataUrl;
                                this.fileName = t;
                                this.fileName || i.throwError(new l.default(n.default.optionsError,"must supply a file name for data URL uploads"))
                            }
                        } else if (this.sourceInputElementId) {
                            this.uploadType = f.default.form;
                            this.fileInput = r.getFileInput(this.sourceInputElementId);
                            this.fileName = t || this.fileInput.name
                        } else
                            i.throwError(new l.default(n.default.optionsError,"please specified one type of resource to save"))
                    }
                    ;
                    return e
                }(o.default);
                t.default = v
            }(0, r, e("../utilities/CallbackInvoker"), e("../Constants"), e("../utilities/DomUtilities"), e("../utilities/ErrorHandler"), e("./ErrorType"), e("./InvokerOptions"), e("../utilities/Logging"), e("./OneDriveSdkError"), e("./SaverActionType"), e("../utilities/StringUtilities"), e("../utilities/TypeValidators"), e("./UploadType"), e("../utilities/UrlUtilities"))
        }
        , {
            "../Constants": 1,
            "../utilities/CallbackInvoker": 23,
            "../utilities/DomUtilities": 25,
            "../utilities/ErrorHandler": 26,
            "../utilities/Logging": 27,
            "../utilities/StringUtilities": 30,
            "../utilities/TypeValidators": 31,
            "../utilities/UrlUtilities": 32,
            "./ErrorType": 13,
            "./InvokerOptions": 14,
            "./OneDriveSdkError": 16,
            "./SaverActionType": 19,
            "./UploadType": 21
        }],
        21: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r;
                !function(e) {
                    e[e.dataUrl = 0] = "dataUrl";
                    e[e.form = 1] = "form";
                    e[e.url = 2] = "url"
                }(r || (r = {}));
                t.default = r
            }(0, r)
        }
        , {}],
        22: [function(e, t, r) {
            !function(e, t, r, i, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var o = "odpickerv7cache";
                t.getCacheItem = function(e) {
                    return a()[e]
                }
                ;
                t.setCacheItem = function(e, t) {
                    var r = a();
                    r[e] = t;
                    s(r)
                }
                ;
                t.removeCacheItem = function(e) {
                    var t = a()
                      , r = t[e];
                    delete t[e];
                    s(t);
                    return r
                }
                ;
                function a() {
                    if (Storage) {
                        var e = localStorage.getItem(o);
                        return JSON.parse(e || "{}")
                    }
                    i.throwError(new n.default(r.default.unsupportedFeature,"cache based on Storage is not supported in this browser"))
                }
                function s(e) {
                    Storage ? localStorage.setItem(o, JSON.stringify(e)) : i.throwError(new n.default(r.default.unsupportedFeature,"cache based on Storage is not supported in this browser"))
                }
            }(0, r, e("../models/ErrorType"), e("./ErrorHandler"), e("../models/OneDriveSdkError"))
        }
        , {
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "./ErrorHandler": 26
        }],
        23: [function(e, t, r) {
            !function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t.invokeAppCallback = function(e, t) {
                    for (var r = [], i = 2; i < arguments.length; i++)
                        r[i - 2] = arguments[i];
                    typeof e === n.default.TYPE_FUNCTION && e.apply(null, r)
                }
                ;
                t.invokeCallbackAsynchronous = function(e) {
                    for (var t = [], r = 1; r < arguments.length; r++)
                        t[r - 1] = arguments[r];
                    window.setTimeout(function() {
                        e.apply(null, t)
                    }, 0)
                }
            }(0, r, e("../Constants"))
        }
        , {
            "../Constants": 1
        }],
        24: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = function() {
                    function e(e) {
                        this.receiver = e
                    }
                    e.prototype.send = function(e, t) {
                        this.receiver && this.receiver.postMessage(e, t)
                    }
                    ;
                    e.prototype.getReceiver = function() {
                        return this.receiver
                    }
                    ;
                    return e
                }();
                t.default = r
            }(0, r)
        }
        , {}],
        25: [function(e, t, r) {
            !function(e, t, n, o, a, r) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var i = {};
                function s(e) {
                    return document.getElementById(e)
                }
                t.getElementById = s;
                function u(e) {
                    "interactive" === document.readyState || "complete" === document.readyState ? e() : document.addEventListener("DOMContentLoaded", e, !1)
                }
                t.onDocumentReady = u;
                t.onMessage = function(e) {
                    var t = r.generateNonce() + "_" + (new Date).getMilliseconds();
                    window.addEventListener("message", e);
                    i[t] = e;
                    return t
                }
                ;
                t.removeMessageListener = function(e) {
                    var t = i[e];
                    t && window.removeEventListener("message", t)
                }
                ;
                t.getFileInput = function(e) {
                    var t = s(e);
                    if (t instanceof HTMLInputElement) {
                        "file" !== t.type && n.throwError(new a.default(o.default.optionsError,"input elemenet must be of type 'file'"));
                        if (!t.value) {
                            n.throwError(new a.default(o.default.optionsError,"please a file to upload"));
                            return null
                        }
                        var r = t.files;
                        r && window.FileReader || n.throwError(new a.default(o.default.unsupportedFeature,"browser does not support Files API"));
                        1 !== r.length && n.throwError(new a.default(o.default.unsupportedFeature,"can not upload more than one file at a time"));
                        var i = r[0];
                        i || n.throwError(new a.default(o.default.optionsError,"missing file input"));
                        if (104857600 < i.size) {
                            n.throwError(new a.default(o.default.optionsError,"the user has selected a file larger than 100 MB"));
                            return null
                        }
                        return i
                    }
                    n.throwError(new a.default(o.default.unknown,"element was not an instance of an HTMLInputElement"))
                }
                ;
                t.displayOverlay = function() {
                    var t = document.createElement("div");
                    t.id = "od-overlay";
                    t.style.cssText = ["position: fixed", "width: 100%", "height: 100%", "top: 0px", "left: 0px", "background-color: white", "opacity: 1", "z-index: 10000", "min-width: 40px", "min-height: 40px"].join(";");
                    var e = document.createElement("img");
                    e.id = "od-spinner";
                    e.src = "https://p.sfx.ms/common/spinner_grey_40_transparent.gif";
                    e.style.cssText = ["position: absolute", "margin: auto", "top: 0", "left: 0", "right: 0", "bottom: 0"].join(";");
                    t.appendChild(e);
                    var r = document.createElement("style");
                    r.type = "text/css";
                    r.innerHTML = "body { visibility: hidden !important; }";
                    document.head.appendChild(r);
                    u(function() {
                        var e = document.body;
                        null !== e ? e.insertBefore(t, e.firstChild) : document.createElement("body").appendChild(t);
                        document.head.removeChild(r)
                    })
                }
            }(0, r, e("./ErrorHandler"), e("../models/ErrorType"), e("../models/OneDriveSdkError"), e("./UrlUtilities"))
        }
        , {
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "./ErrorHandler": 26,
            "./UrlUtilities": 32
        }],
        26: [function(e, t, r) {
            !function(e, t, i) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var n = [];
                t.registerErrorObserver = function(e) {
                    n.push(e)
                }
                ;
                t.throwError = function(e) {
                    if (e.errorCode !== i.default[i.default.unknown]) {
                        for (var t = 0, r = n; t < r.length; t++)
                            (0,
                            r[t])(e);
                        return {
                            exposeToPublic: function() {
                                throw e
                            }
                        }
                    }
                    throw e
                }
            }(0, r, e("../models/ErrorType"))
        }
        , {
            "../models/ErrorType": 13
        }],
        27: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = function() {
                    function n() {}
                    n.logError = function(e) {
                        for (var t = [], r = 1; r < arguments.length; r++)
                            t[r - 1] = arguments[r];
                        n._log(e, !0, t)
                    }
                    ;
                    n.logMessage = function(e) {
                        n._log(e, !1)
                    }
                    ;
                    n._log = function(e, t) {
                        for (var r = [], i = 2; i < arguments.length; i++)
                            r[i - 2] = arguments[i];
                        (t || n.loggingEnabled || window.onedrive_enable_logging) && console.log("[OneDriveSDK] " + e, r)
                    }
                    ;
                    n.loggingEnabled = !1;
                    return n
                }();
                t.default = r
            }(0, r)
        }
        , {}],
        28: [function(e, t, r) {
            !function(e, t, i, r) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t.shallowClone = function(e) {
                    if (typeof e !== i.default.TYPE_OBJECT || !e)
                        return null;
                    var t = {};
                    for (var r in e)
                        e.hasOwnProperty(r) && (t[r] = e[r]);
                    return t
                }
                ;
                t.deserializeJSON = function(e) {
                    var t = null;
                    try {
                        t = JSON.parse(e)
                    } catch (e) {
                        r.default.logError("deserialization error" + e)
                    }
                    typeof t === i.default.TYPE_OBJECT && null !== t || (t = {});
                    return t
                }
                ;
                t.serializeJSON = function(e) {
                    return JSON.stringify(e)
                }
            }(0, r, e("../Constants"), e("./Logging"))
        }
        , {
            "../Constants": 1,
            "./Logging": 27
        }],
        29: [function(e, t, r) {
            !function(e, n, r, o, a, s, u) {
                "use strict";
                Object.defineProperty(n, "__esModule", {
                    value: !0
                });
                n.POPUP_PINGER_INTERVAL = 500;
                var t = function() {
                    function t() {}
                    t.getCurrentPopup = function() {
                        return t._currentPopup || new t
                    }
                    ;
                    t.setCurrentPopup = function(e) {
                        t._currentPopup = e
                    }
                    ;
                    t.createPopupFeatures = function() {
                        var e = window.screenX + Math.max(window.outerWidth - 1024, 0) / 2;
                        return ["width=1024", "height=650", "top=" + (window.screenY + Math.max(window.outerHeight - 650, 0) / 2), "left=" + e, "status=no", "resizable=yes", "toolbar=no", "menubar=no", "scrollbars=yes"].join(",")
                    }
                    ;
                    t.prototype.close = function() {
                        if (t.getCurrentPopup().isPopupOpen()) {
                            t.getCurrentPopup()._popup.close();
                            t.setCurrentPopup(null)
                        }
                    }
                    ;
                    t.prototype.openPopup = function(e) {
                        var i = this;
                        u.validateUrlProtocol(e);
                        if (t.getCurrentPopup().isPopupOpen()) {
                            a.default.logMessage("leaving current url: " + this._url);
                            this._url = e;
                            t.getCurrentPopup().getPopupWindow().location.href = e
                        } else {
                            this._url = e;
                            this._popup = window.open(e, "_blank", t.createPopupFeatures());
                            this._popup ? this._popup.focus() : r.throwError(new s.default(o.default.popupOpen,"popup window is disconnected")).exposeToPublic();
                            t.setCurrentPopup(this)
                        }
                        return new Promise(function(e, t) {
                            var r = setInterval(function() {
                                if (!i.isPopupOpen()) {
                                    window.clearInterval(r);
                                    e()
                                }
                            }, n.POPUP_PINGER_INTERVAL)
                        }
                        )
                    }
                    ;
                    t.prototype.getPopupWindow = function() {
                        return this._popup
                    }
                    ;
                    t.prototype.getCurrentUrl = function() {
                        return this._url
                    }
                    ;
                    t.prototype.isPopupOpen = function() {
                        return !!this._popup && !this._popup.closed
                    }
                    ;
                    return t
                }();
                n.default = t
            }(0, r, e("./ErrorHandler"), e("../models/ErrorType"), e("./Logging"), e("../models/OneDriveSdkError"), e("../utilities/UrlUtilities"))
        }
        , {
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "../utilities/UrlUtilities": 32,
            "./ErrorHandler": 26,
            "./Logging": 27
        }],
        30: [function(e, t, r) {
            !function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var i = /[\{\}]/g
                  , n = /\{\d+\}/g;
                t.format = function(e) {
                    for (var r = [], t = 1; t < arguments.length; t++)
                        r[t - 1] = arguments[t];
                    return e.replace(n, function(e) {
                        var t = r[e.replace(i, "")];
                        null === t && (t = "");
                        return t
                    })
                }
            }(0, r)
        }
        , {}],
        31: [function(e, t, r) {
            !function(e, t, i, a, s, u, l, d, c) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                t.validateType = function(e, t, r, i, n) {
                    void 0 === r && (r = !1);
                    if (void 0 === e) {
                        if (r) {
                            if (void 0 !== i) {
                                u.default.logMessage("applying default value: " + i);
                                return i
                            }
                        } else
                            a.throwError(new d.default(s.default.typeError,"object was missing and not optional"));
                        return null
                    }
                    var o = typeof e;
                    if (o !== t) {
                        a.throwError(new d.default(s.default.typeError,c.format("expected object type: '{0}', actual object type: '{1}'", t, o)));
                        return null
                    }
                    if (!function(e, t) {
                        if (!Array.isArray(t))
                            return !0;
                        for (var r in t)
                            if (e === t[r])
                                return !0;
                        return !1
                    }(e, n)) {
                        a.throwError(new d.default(s.default.typeError,c.format("object does not match any valid values {0}", l.serializeJSON(n))));
                        return null
                    }
                    return e
                }
                ;
                t.validateCallback = function(e, t) {
                    void 0 === t && (t = !1);
                    if (void 0 === e) {
                        t || a.throwError(new d.default(s.default.typeError,"function was missing and not optional"));
                        return null
                    }
                    var r = typeof e;
                    r !== i.default.TYPE_FUNCTION && a.throwError(new d.default(s.default.typeError,c.format("expected function type: function | string, actual type: {0}", r)));
                    return e
                }
            }(0, r, e("../Constants"), e("./ErrorHandler"), e("../models/ErrorType"), e("./Logging"), e("./ObjectUtilities"), e("../models/OneDriveSdkError"), e("./StringUtilities"))
        }
        , {
            "../Constants": 1,
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "./ErrorHandler": 26,
            "./Logging": 27,
            "./ObjectUtilities": 28,
            "./StringUtilities": 30
        }],
        32: [function(e, t, r) {
            !function(e, t, i, o, a, s, u) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var l = "HTTP"
                  , d = "HTTPS";
                function r(e, t) {
                    return e + ("/" !== e.charAt(e.length - 1) ? "/" : "") + t
                }
                t.appendToPath = r;
                t.appendQueryString = function(e, t, r) {
                    return n(e, ((i = {})[t] = r,
                    i));
                    var i
                }
                ;
                function n(e, t, r) {
                    if (!t || 0 === Object.keys(t).length)
                        return e;
                    r ? e += "#" : -1 === e.indexOf("?") ? e += "?" : "&" !== e.charAt(e.length - 1) && (e += "&");
                    var i = "";
                    for (var n in t)
                        i += (i.length ? "&" : "") + u.format("{0}={1}", encodeURIComponent(n), encodeURIComponent(t[n]));
                    return e + i
                }
                t.appendQueryStrings = n;
                t.readCurrentUrlParameters = function() {
                    return c(window.location.href)
                }
                ;
                function c(e) {
                    var t = {}
                      , r = e.indexOf("?") + 1
                      , i = e.indexOf("#") + 1;
                    if (0 < r) {
                        var n = r < i ? i - 1 : e.length;
                        h(e.substring(r, n), t)
                    }
                    0 < i && h(e.substring(i), t);
                    return t
                }
                t.readUrlParameters = c;
                t.redirect = function(e) {
                    f(e);
                    window.location.replace(e)
                }
                ;
                function p(e) {
                    var t = ["?", "#"];
                    for (var r in t) {
                        var i = e.indexOf(t[r]);
                        0 < i && (e = e.substring(0, i))
                    }
                    return e
                }
                t.trimUrlQuery = p;
                t.getFileNameFromUrl = function(e) {
                    var t = p(e);
                    return t.substr(t.lastIndexOf("/") + 1)
                }
                ;
                t.getOrigin = function(e) {
                    return r(e.replace(/^((\w+:)?\/\/[^\/]+\/?).*$/, "$1"), "")
                }
                ;
                t.isPathFullUrl = function(e) {
                    return 0 === e.indexOf("https://") || 0 === e.indexOf("http://")
                }
                ;
                t.isPathDataUrl = function(e) {
                    return 0 === e.indexOf("data:")
                }
                ;
                t.generateNonce = function() {
                    for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", t = "", r = 0; r < i.default.NONCE_LENGTH; r++)
                        t += e.charAt(Math.floor(Math.random() * e.length));
                    return t
                }
                ;
                function f(e, t) {
                    for (var r = 0, i = t = t || [l, d]; r < i.length; r++) {
                        var n = i[r];
                        if (0 === e.toUpperCase().indexOf(n))
                            return
                    }
                    o.throwError(new s.default(a.default.optionsError,u.format("uri {0} does not match protocol(s): " + t, e))).exposeToPublic()
                }
                t.validateUrlProtocol = f;
                t.validateRedirectUrlHost = function(e) {
                    f(e);
                    -1 < e.indexOf("://") ? e.split("/")[2] !== window.location.host && o.throwError(new s.default(a.default.optionsError,"redirect uri is not in the same domain as picker sdk")).exposeToPublic() : o.throwError(new s.default(a.default.optionsError,"redirect uri is not an absolute url")).exposeToPublic()
                }
                ;
                function h(e, t) {
                    for (var r = e.split("&"), i = 0; i < r.length; i++) {
                        var n = r[i]
                          , o = n.indexOf("=");
                        if (-1 !== o) {
                            var a = n.substr(0, o)
                              , s = n.substr(o + 1);
                            t[a] = decodeURIComponent(s)
                        }
                    }
                }
                t.deserializeParameters = h
            }(0, r, e("../Constants"), e("./ErrorHandler"), e("../models/ErrorType"), e("../models/OneDriveSdkError"), e("./StringUtilities"))
        }
        , {
            "../Constants": 1,
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "./ErrorHandler": 26,
            "./StringUtilities": 30
        }],
        33: [function(e, t, r) {
            !function(e, t, i, n, a, s, u, l, d) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var c = new RegExp("^([a-fA-F0-9]){16}$")
                  , r = function() {
                    function o(e) {
                        this._url = e.url;
                        this._json = e.json;
                        this._headers = e.headers || {};
                        this._method = e.method;
                        this._clientId = e.clientId;
                        this._apiEndpoint = e.apiEndpoint || i.default.msa;
                        a.registerErrorObserver(this._abortRequest)
                    }
                    o.statusCodeToString = function(e) {
                        switch (e) {
                        case -1:
                            return "EXCEPTION";
                        case -2:
                            return "TIMEOUT";
                        case -3:
                            return "REQUEST ABORTED";
                        default:
                            return e.toString()
                        }
                    }
                    ;
                    o.prototype.start = function(e, t) {
                        var r = this;
                        try {
                            this._successCallback = e;
                            this._failureCallback = t;
                            this._request = new XMLHttpRequest;
                            this._request.ontimeout = this._onTimeout;
                            this._request.onload = function() {
                                var e = r._request.status;
                                e < 400 && 0 < e ? r._callSuccessCallback(e) : r._callFailureCallback(e)
                            }
                            ;
                            this._method || (this._method = this._json ? o.HTTP_POST : o.HTTP_GET);
                            this._request.open(this._method, this._url, !0);
                            this._request.timeout = 3e4;
                            this._setHeaders();
                            u.default.logMessage("starting request to: " + this._url);
                            this._request.send(this._json)
                        } catch (e) {
                            this._callFailureCallback(-1, e)
                        }
                    }
                    ;
                    o.prototype.upload = function(e, t, r, i) {
                        var n = this;
                        try {
                            this._successCallback = t;
                            this._progressCallback = i;
                            this._failureCallback = r;
                            this._request = new XMLHttpRequest;
                            this._request.ontimeout = this._onTimeout;
                            this._method = o.HTTP_PUT;
                            this._request.open(this._method, this._url, !0);
                            this._setHeaders();
                            this._request.onload = function(e) {
                                n._completed = !0;
                                var t = n._request.status;
                                200 === t || 201 === t || 202 === t ? n._callSuccessCallback(t) : n._callFailureCallback(t, e)
                            }
                            ;
                            this._request.onerror = function(e) {
                                n._completed = !0;
                                n._callFailureCallback(n._request.status, e)
                            }
                            ;
                            this._request.upload.onprogress = function(e) {
                                if (e.lengthComputable) {
                                    var t = {
                                        bytesTransferred: e.loaded,
                                        totalBytes: e.total,
                                        progressPercentage: 0 === e.total ? 0 : e.loaded / e.total * 100
                                    };
                                    n._callProgressCallback(t)
                                }
                            }
                            ;
                            u.default.logMessage("starting upload to: " + this._url);
                            this._request.send(e)
                        } catch (e) {
                            this._callFailureCallback(-1, e)
                        }
                    }
                    ;
                    o.prototype._callSuccessCallback = function(e) {
                        u.default.logMessage("calling xhr success callback, status: " + o.statusCodeToString(e));
                        this._successCallback(this._request, e, this._url)
                    }
                    ;
                    o.prototype._callFailureCallback = function(e, t) {
                        u.default.logError("calling xhr failure callback, status: " + o.statusCodeToString(e), this._request, t);
                        this._failureCallback(this._request, e, -2 === e)
                    }
                    ;
                    o.prototype._callProgressCallback = function(e) {
                        u.default.logMessage("calling xhr upload progress callback");
                        this._progressCallback(this._request, e)
                    }
                    ;
                    o.prototype._abortRequest = function() {
                        if (this && !this._completed) {
                            this._completed = !0;
                            if (this._request)
                                try {
                                    this._request.abort()
                                } catch (e) {}
                            this._callFailureCallback(-3)
                        }
                    }
                    ;
                    o.prototype._onTimeout = function() {
                        if (!this._completed) {
                            this._completed = !0;
                            this._callFailureCallback(-2)
                        }
                    }
                    ;
                    o.prototype._setHeaders = function() {
                        for (var e in this._headers)
                            this._request.setRequestHeader(e, this._headers[e]);
                        if (this._clientId) {
                            var t = this._clientId;
                            c.test(this._clientId) && (t = "0x" + this._clientId);
                            this._request.setRequestHeader("Application", "0x" + t)
                        }
                        var r = d.format("{0}={1}", "SDK-Version", n.default.SDK_VERSION);
                        switch (this._apiEndpoint) {
                        case i.default.graph_odb:
                        case i.default.filesV2:
                            this._request.setRequestHeader("X-ClientService-ClientTag", r);
                            break;
                        case i.default.graph_odc:
                        case i.default.msa:
                            this._request.setRequestHeader("X-RequestStats", r);
                            break;
                        default:
                            a.throwError(new l.default(s.default.internalError,"invalid API endpoint: " + this._apiEndpoint))
                        }
                        this._method === o.HTTP_POST && this._request.setRequestHeader("Content-Type", this._json ? "application/json" : "text/plain")
                    }
                    ;
                    o.HTTP_GET = "GET";
                    o.HTTP_POST = "POST";
                    o.HTTP_PUT = "PUT";
                    return o
                }();
                t.default = r
            }(0, r, e("../models/ApiEndpoint"), e("../Constants"), e("./ErrorHandler"), e("../models/ErrorType"), e("./Logging"), e("../models/OneDriveSdkError"), e("./StringUtilities"))
        }
        , {
            "../Constants": 1,
            "../models/ApiEndpoint": 11,
            "../models/ErrorType": 13,
            "../models/OneDriveSdkError": 16,
            "./ErrorHandler": 26,
            "./Logging": 27,
            "./StringUtilities": 30
        }],
        34: [function(L, e, t) {
            /*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   3.3.1
 */
            r = this,
            i = function() {
                "use strict";
                function l(e) {
                    return "function" == typeof e
                }
                var r = Array.isArray ? Array.isArray : function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                }
                  , i = 0
                  , t = void 0
                  , n = void 0
                  , s = function(e, t) {
                    p[i] = e;
                    p[i + 1] = t;
                    2 === (i += 2) && (n ? n(f) : h())
                };
                var e = "undefined" != typeof window ? window : void 0
                  , o = e || {}
                  , a = o.MutationObserver || o.WebKitMutationObserver
                  , u = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process)
                  , d = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;
                function c() {
                    var e = setTimeout;
                    return function() {
                        return e(f, 1)
                    }
                }
                var p = new Array(1e3);
                function f() {
                    for (var e = 0; e < i; e += 2) {
                        (0,
                        p[e])(p[e + 1]);
                        p[e] = void 0;
                        p[e + 1] = void 0
                    }
                    i = 0
                }
                var h = void 0;
                h = u ? function() {
                    return process.nextTick(f)
                }
                : a ? function() {
                    var e = 0
                      , t = new a(f)
                      , r = document.createTextNode("");
                    t.observe(r, {
                        characterData: !0
                    });
                    return function() {
                        r.data = e = ++e % 2
                    }
                }() : d ? function() {
                    var e = new MessageChannel;
                    e.port1.onmessage = f;
                    return function() {
                        return e.port2.postMessage(0)
                    }
                }() : void 0 === e && "function" == typeof L ? function() {
                    try {
                        var e = L("vertx");
                        t = e.runOnLoop || e.runOnContext;
                        return function() {
                            t(f)
                        }
                    } catch (e) {
                        return c()
                    }
                }() : c();
                function v(e, t) {
                    var r = arguments
                      , i = this
                      , n = new this.constructor(y);
                    void 0 === n[g] && q(n);
                    var o, a = i._state;
                    a ? (o = r[a - 1],
                    s(function() {
                        return H(a, n, o, i._result)
                    })) : S(i, n, e, t);
                    return n
                }
                function m(e) {
                    if (e && "object" == typeof e && e.constructor === this)
                        return e;
                    var t = new this(y);
                    O(t, e);
                    return t
                }
                var g = Math.random().toString(36).substring(16);
                function y() {}
                var _ = void 0
                  , E = 1
                  , w = 2
                  , T = new I;
                function b(e) {
                    try {
                        return e.then
                    } catch (e) {
                        T.error = e;
                        return T
                    }
                }
                function P(e, t, r) {
                    t.constructor === e.constructor && r === v && t.constructor.resolve === m ? (o = e,
                    (a = t)._state === E ? U(o, a._result) : a._state === w ? C(o, a._result) : S(a, void 0, function(e) {
                        return O(o, e)
                    }, function(e) {
                        return C(o, e)
                    })) : r === T ? C(e, T.error) : void 0 === r ? U(e, t) : l(r) ? (i = t,
                    n = r,
                    s(function(t) {
                        var r = !1
                          , e = function(e, t, r, i) {
                            try {
                                e.call(t, r, i)
                            } catch (e) {
                                return e
                            }
                        }(n, i, function(e) {
                            if (!r) {
                                r = !0;
                                i !== e ? O(t, e) : U(t, e)
                            }
                        }, function(e) {
                            if (!r) {
                                r = !0;
                                C(t, e)
                            }
                        }, t._label);
                        if (!r && e) {
                            r = !0;
                            C(t, e)
                        }
                    }, e)) : U(e, t);
                    var i, n, o, a
                }
                function O(e, t) {
                    e === t ? C(e, new TypeError("You cannot resolve a promise with itself")) : "function" == typeof (r = t) || "object" == typeof r && null !== r ? P(e, t, b(t)) : U(e, t);
                    var r
                }
                function k(e) {
                    e._onerror && e._onerror(e._result);
                    A(e)
                }
                function U(e, t) {
                    if (e._state === _) {
                        e._result = t;
                        e._state = E;
                        0 !== e._subscribers.length && s(A, e)
                    }
                }
                function C(e, t) {
                    if (e._state === _) {
                        e._state = w;
                        e._result = t;
                        s(k, e)
                    }
                }
                function S(e, t, r, i) {
                    var n = e._subscribers
                      , o = n.length;
                    e._onerror = null;
                    n[o] = t;
                    n[o + E] = r;
                    n[o + w] = i;
                    0 === o && e._state && s(A, e)
                }
                function A(e) {
                    var t = e._subscribers
                      , r = e._state;
                    if (0 !== t.length) {
                        for (var i = void 0, n = void 0, o = e._result, a = 0; a < t.length; a += 3) {
                            i = t[a];
                            n = t[a + r];
                            i ? H(r, i, n, o) : n(o)
                        }
                        e._subscribers.length = 0
                    }
                }
                function I() {
                    this.error = null
                }
                var R = new I;
                function H(e, t, r, i) {
                    var n = l(r)
                      , o = void 0
                      , a = void 0
                      , s = void 0
                      , u = void 0;
                    if (n) {
                        if ((o = function(e, t) {
                            try {
                                return e(t)
                            } catch (e) {
                                R.error = e;
                                return R
                            }
                        }(r, i)) === R) {
                            u = !0;
                            a = o.error;
                            o = null
                        } else
                            s = !0;
                        if (t === o) {
                            C(t, new TypeError("A promises callback cannot return that same promise."));
                            return
                        }
                    } else {
                        o = i;
                        s = !0
                    }
                    t._state !== _ || (n && s ? O(t, o) : u ? C(t, a) : e === E ? U(t, o) : e === w && C(t, o))
                }
                var D = 0;
                function q(e) {
                    e[g] = D++;
                    e._state = void 0;
                    e._result = void 0;
                    e._subscribers = []
                }
                function M(e, t) {
                    this._instanceConstructor = e;
                    this.promise = new e(y);
                    this.promise[g] || q(this.promise);
                    if (r(t)) {
                        this._input = t;
                        this.length = t.length;
                        this._remaining = t.length;
                        this._result = new Array(this.length);
                        if (0 === this.length)
                            U(this.promise, this._result);
                        else {
                            this.length = this.length || 0;
                            this._enumerate();
                            0 === this._remaining && U(this.promise, this._result)
                        }
                    } else
                        C(this.promise, new Error("Array Methods must be provided an Array"))
                }
                M.prototype._enumerate = function() {
                    for (var e = this.length, t = this._input, r = 0; this._state === _ && r < e; r++)
                        this._eachEntry(t[r], r)
                }
                ;
                M.prototype._eachEntry = function(t, e) {
                    var r = this._instanceConstructor
                      , i = r.resolve;
                    if (i === m) {
                        var n = b(t);
                        if (n === v && t._state !== _)
                            this._settledAt(t._state, e, t._result);
                        else if ("function" != typeof n) {
                            this._remaining--;
                            this._result[e] = t
                        } else if (r === x) {
                            var o = new r(y);
                            P(o, t, n);
                            this._willSettleAt(o, e)
                        } else
                            this._willSettleAt(new r(function(e) {
                                return e(t)
                            }
                            ), e)
                    } else
                        this._willSettleAt(i(t), e)
                }
                ;
                M.prototype._settledAt = function(e, t, r) {
                    var i = this.promise;
                    if (i._state === _) {
                        this._remaining--;
                        e === w ? C(i, r) : this._result[t] = r
                    }
                    0 === this._remaining && U(i, this._result)
                }
                ;
                M.prototype._willSettleAt = function(e, t) {
                    var r = this;
                    S(e, void 0, function(e) {
                        return r._settledAt(E, t, e)
                    }, function(e) {
                        return r._settledAt(w, t, e)
                    })
                }
                ;
                function x(e) {
                    this[g] = D++;
                    this._result = this._state = void 0;
                    this._subscribers = [];
                    if (y !== e) {
                        "function" != typeof e && function() {
                            throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                        }();
                        this instanceof x ? function(t, e) {
                            try {
                                e(function(e) {
                                    O(t, e)
                                }, function(e) {
                                    C(t, e)
                                })
                            } catch (e) {
                                C(t, e)
                            }
                        }(this, e) : function() {
                            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                        }()
                    }
                }
                x.all = function(e) {
                    return new M(this,e).promise
                }
                ;
                x.race = function(n) {
                    var o = this;
                    return r(n) ? new o(function(e, t) {
                        for (var r = n.length, i = 0; i < r; i++)
                            o.resolve(n[i]).then(e, t)
                    }
                    ) : new o(function(e, t) {
                        return t(new TypeError("You must pass an array to race."))
                    }
                    )
                }
                ;
                x.resolve = m;
                x.reject = function(e) {
                    var t = new this(y);
                    C(t, e);
                    return t
                }
                ;
                x._setScheduler = function(e) {
                    n = e
                }
                ;
                x._setAsap = function(e) {
                    s = e
                }
                ;
                x._asap = s;
                x.prototype = {
                    constructor: x,
                    then: v,
                    catch: function(e) {
                        return this.then(null, e)
                    }
                };
                function N() {
                    var e = void 0;
                    if ("undefined" != typeof global)
                        e = global;
                    else if ("undefined" != typeof self)
                        e = self;
                    else
                        try {
                            e = Function("return this")()
                        } catch (e) {
                            throw new Error("polyfill failed because global object is unavailable in this environment")
                        }
                    var t = e.Promise;
                    if (t) {
                        var r = null;
                        try {
                            r = Object.prototype.toString.call(t.resolve())
                        } catch (e) {}
                        if ("[object Promise]" === r && !t.cast)
                            return
                    }
                    e.Promise = x
                }
                N();
                x.polyfill = N;
                return x.Promise = x
            }
            ,
            "object" == typeof t && void 0 !== e ? e.exports = i() : r.ES6Promise = i();
            var r, i
        }
        , {}]
    }, {}, [2])(2)
});

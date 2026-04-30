function J0(s, d) {
  for (var h = 0; h < d.length; h++) {
    const o = d[h];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const p in o)
        if (p !== "default" && !(p in s)) {
          const x = Object.getOwnPropertyDescriptor(o, p);
          x &&
            Object.defineProperty(
              s,
              p,
              x.get ? x : { enumerable: !0, get: () => o[p] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(s, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const d = document.createElement("link").relList;
  if (d && d.supports && d.supports("modulepreload")) return;
  for (const p of document.querySelectorAll('link[rel="modulepreload"]')) o(p);
  new MutationObserver((p) => {
    for (const x of p)
      if (x.type === "childList")
        for (const T of x.addedNodes)
          T.tagName === "LINK" && T.rel === "modulepreload" && o(T);
  }).observe(document, { childList: !0, subtree: !0 });
  function h(p) {
    const x = {};
    return (
      p.integrity && (x.integrity = p.integrity),
      p.referrerPolicy && (x.referrerPolicy = p.referrerPolicy),
      p.crossOrigin === "use-credentials"
        ? (x.credentials = "include")
        : p.crossOrigin === "anonymous"
          ? (x.credentials = "omit")
          : (x.credentials = "same-origin"),
      x
    );
  }
  function o(p) {
    if (p.ep) return;
    p.ep = !0;
    const x = h(p);
    fetch(p.href, x);
  }
})();
function W0(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default")
    ? s.default
    : s;
}
var zs = { exports: {} },
  Un = {};
var Vd;
function $0() {
  if (Vd) return Un;
  Vd = 1;
  var s = Symbol.for("react.transitional.element"),
    d = Symbol.for("react.fragment");
  function h(o, p, x) {
    var T = null;
    if (
      (x !== void 0 && (T = "" + x),
      p.key !== void 0 && (T = "" + p.key),
      "key" in p)
    ) {
      x = {};
      for (var R in p) R !== "key" && (x[R] = p[R]);
    } else x = p;
    return (
      (p = x.ref),
      { $$typeof: s, type: o, key: T, ref: p !== void 0 ? p : null, props: x }
    );
  }
  return ((Un.Fragment = d), (Un.jsx = h), (Un.jsxs = h), Un);
}
var Zd;
function F0() {
  return (Zd || ((Zd = 1), (zs.exports = $0())), zs.exports);
}
var u = F0(),
  Es = { exports: {} },
  W = {};
var kd;
function I0() {
  if (kd) return W;
  kd = 1;
  var s = Symbol.for("react.transitional.element"),
    d = Symbol.for("react.portal"),
    h = Symbol.for("react.fragment"),
    o = Symbol.for("react.strict_mode"),
    p = Symbol.for("react.profiler"),
    x = Symbol.for("react.consumer"),
    T = Symbol.for("react.context"),
    R = Symbol.for("react.forward_ref"),
    A = Symbol.for("react.suspense"),
    v = Symbol.for("react.memo"),
    D = Symbol.for("react.lazy"),
    N = Symbol.for("react.activity"),
    Y = Symbol.iterator;
  function ee(f) {
    return f === null || typeof f != "object"
      ? null
      : ((f = (Y && f[Y]) || f["@@iterator"]),
        typeof f == "function" ? f : null);
  }
  var $ = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    J = Object.assign,
    Q = {};
  function ne(f, E, w) {
    ((this.props = f),
      (this.context = E),
      (this.refs = Q),
      (this.updater = w || $));
  }
  ((ne.prototype.isReactComponent = {}),
    (ne.prototype.setState = function (f, E) {
      if (typeof f != "object" && typeof f != "function" && f != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, f, E, "setState");
    }),
    (ne.prototype.forceUpdate = function (f) {
      this.updater.enqueueForceUpdate(this, f, "forceUpdate");
    }));
  function oe() {}
  oe.prototype = ne.prototype;
  function H(f, E, w) {
    ((this.props = f),
      (this.context = E),
      (this.refs = Q),
      (this.updater = w || $));
  }
  var ie = (H.prototype = new oe());
  ((ie.constructor = H), J(ie, ne.prototype), (ie.isPureReactComponent = !0));
  var je = Array.isArray;
  function he() {}
  var Z = { H: null, A: null, T: null, S: null },
    ze = Object.prototype.hasOwnProperty;
  function _e(f, E, w) {
    var L = w.ref;
    return {
      $$typeof: s,
      type: f,
      key: E,
      ref: L !== void 0 ? L : null,
      props: w,
    };
  }
  function $e(f, E) {
    return _e(f.type, E, f.props);
  }
  function Ge(f) {
    return typeof f == "object" && f !== null && f.$$typeof === s;
  }
  function Ve(f) {
    var E = { "=": "=0", ":": "=2" };
    return (
      "$" +
      f.replace(/[=:]/g, function (w) {
        return E[w];
      })
    );
  }
  var Lt = /\/+/g;
  function xt(f, E) {
    return typeof f == "object" && f !== null && f.key != null
      ? Ve("" + f.key)
      : E.toString(36);
  }
  function Ie(f) {
    switch (f.status) {
      case "fulfilled":
        return f.value;
      case "rejected":
        throw f.reason;
      default:
        switch (
          (typeof f.status == "string"
            ? f.then(he, he)
            : ((f.status = "pending"),
              f.then(
                function (E) {
                  f.status === "pending" &&
                    ((f.status = "fulfilled"), (f.value = E));
                },
                function (E) {
                  f.status === "pending" &&
                    ((f.status = "rejected"), (f.reason = E));
                },
              )),
          f.status)
        ) {
          case "fulfilled":
            return f.value;
          case "rejected":
            throw f.reason;
        }
    }
    throw f;
  }
  function O(f, E, w, L, F) {
    var te = typeof f;
    (te === "undefined" || te === "boolean") && (f = null);
    var pe = !1;
    if (f === null) pe = !0;
    else
      switch (te) {
        case "bigint":
        case "string":
        case "number":
          pe = !0;
          break;
        case "object":
          switch (f.$$typeof) {
            case s:
            case d:
              pe = !0;
              break;
            case D:
              return ((pe = f._init), O(pe(f._payload), E, w, L, F));
          }
      }
    if (pe)
      return (
        (F = F(f)),
        (pe = L === "" ? "." + xt(f, 0) : L),
        je(F)
          ? ((w = ""),
            pe != null && (w = pe.replace(Lt, "$&/") + "/"),
            O(F, E, w, "", function (qa) {
              return qa;
            }))
          : F != null &&
            (Ge(F) &&
              (F = $e(
                F,
                w +
                  (F.key == null || (f && f.key === F.key)
                    ? ""
                    : ("" + F.key).replace(Lt, "$&/") + "/") +
                  pe,
              )),
            E.push(F)),
        1
      );
    pe = 0;
    var Pe = L === "" ? "." : L + ":";
    if (je(f))
      for (var Me = 0; Me < f.length; Me++)
        ((L = f[Me]), (te = Pe + xt(L, Me)), (pe += O(L, E, w, te, F)));
    else if (((Me = ee(f)), typeof Me == "function"))
      for (f = Me.call(f), Me = 0; !(L = f.next()).done; )
        ((L = L.value), (te = Pe + xt(L, Me++)), (pe += O(L, E, w, te, F)));
    else if (te === "object") {
      if (typeof f.then == "function") return O(Ie(f), E, w, L, F);
      throw (
        (E = String(f)),
        Error(
          "Objects are not valid as a React child (found: " +
            (E === "[object Object]"
              ? "object with keys {" + Object.keys(f).join(", ") + "}"
              : E) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return pe;
  }
  function B(f, E, w) {
    if (f == null) return f;
    var L = [],
      F = 0;
    return (
      O(f, L, "", "", function (te) {
        return E.call(w, te, F++);
      }),
      L
    );
  }
  function K(f) {
    if (f._status === -1) {
      var E = f._result;
      ((E = E()),
        E.then(
          function (w) {
            (f._status === 0 || f._status === -1) &&
              ((f._status = 1), (f._result = w));
          },
          function (w) {
            (f._status === 0 || f._status === -1) &&
              ((f._status = 2), (f._result = w));
          },
        ),
        f._status === -1 && ((f._status = 0), (f._result = E)));
    }
    if (f._status === 1) return f._result.default;
    throw f._result;
  }
  var re =
      typeof reportError == "function"
        ? reportError
        : function (f) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var E = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof f == "object" &&
                  f !== null &&
                  typeof f.message == "string"
                    ? String(f.message)
                    : String(f),
                error: f,
              });
              if (!window.dispatchEvent(E)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", f);
              return;
            }
            console.error(f);
          },
    ge = {
      map: B,
      forEach: function (f, E, w) {
        B(
          f,
          function () {
            E.apply(this, arguments);
          },
          w,
        );
      },
      count: function (f) {
        var E = 0;
        return (
          B(f, function () {
            E++;
          }),
          E
        );
      },
      toArray: function (f) {
        return (
          B(f, function (E) {
            return E;
          }) || []
        );
      },
      only: function (f) {
        if (!Ge(f))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return f;
      },
    };
  return (
    (W.Activity = N),
    (W.Children = ge),
    (W.Component = ne),
    (W.Fragment = h),
    (W.Profiler = p),
    (W.PureComponent = H),
    (W.StrictMode = o),
    (W.Suspense = A),
    (W.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Z),
    (W.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (f) {
        return Z.H.useMemoCache(f);
      },
    }),
    (W.cache = function (f) {
      return function () {
        return f.apply(null, arguments);
      };
    }),
    (W.cacheSignal = function () {
      return null;
    }),
    (W.cloneElement = function (f, E, w) {
      if (f == null)
        throw Error(
          "The argument must be a React element, but you passed " + f + ".",
        );
      var L = J({}, f.props),
        F = f.key;
      if (E != null)
        for (te in (E.key !== void 0 && (F = "" + E.key), E))
          !ze.call(E, te) ||
            te === "key" ||
            te === "__self" ||
            te === "__source" ||
            (te === "ref" && E.ref === void 0) ||
            (L[te] = E[te]);
      var te = arguments.length - 2;
      if (te === 1) L.children = w;
      else if (1 < te) {
        for (var pe = Array(te), Pe = 0; Pe < te; Pe++)
          pe[Pe] = arguments[Pe + 2];
        L.children = pe;
      }
      return _e(f.type, F, L);
    }),
    (W.createContext = function (f) {
      return (
        (f = {
          $$typeof: T,
          _currentValue: f,
          _currentValue2: f,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (f.Provider = f),
        (f.Consumer = { $$typeof: x, _context: f }),
        f
      );
    }),
    (W.createElement = function (f, E, w) {
      var L,
        F = {},
        te = null;
      if (E != null)
        for (L in (E.key !== void 0 && (te = "" + E.key), E))
          ze.call(E, L) &&
            L !== "key" &&
            L !== "__self" &&
            L !== "__source" &&
            (F[L] = E[L]);
      var pe = arguments.length - 2;
      if (pe === 1) F.children = w;
      else if (1 < pe) {
        for (var Pe = Array(pe), Me = 0; Me < pe; Me++)
          Pe[Me] = arguments[Me + 2];
        F.children = Pe;
      }
      if (f && f.defaultProps)
        for (L in ((pe = f.defaultProps), pe))
          F[L] === void 0 && (F[L] = pe[L]);
      return _e(f, te, F);
    }),
    (W.createRef = function () {
      return { current: null };
    }),
    (W.forwardRef = function (f) {
      return { $$typeof: R, render: f };
    }),
    (W.isValidElement = Ge),
    (W.lazy = function (f) {
      return { $$typeof: D, _payload: { _status: -1, _result: f }, _init: K };
    }),
    (W.memo = function (f, E) {
      return { $$typeof: v, type: f, compare: E === void 0 ? null : E };
    }),
    (W.startTransition = function (f) {
      var E = Z.T,
        w = {};
      Z.T = w;
      try {
        var L = f(),
          F = Z.S;
        (F !== null && F(w, L),
          typeof L == "object" &&
            L !== null &&
            typeof L.then == "function" &&
            L.then(he, re));
      } catch (te) {
        re(te);
      } finally {
        (E !== null && w.types !== null && (E.types = w.types), (Z.T = E));
      }
    }),
    (W.unstable_useCacheRefresh = function () {
      return Z.H.useCacheRefresh();
    }),
    (W.use = function (f) {
      return Z.H.use(f);
    }),
    (W.useActionState = function (f, E, w) {
      return Z.H.useActionState(f, E, w);
    }),
    (W.useCallback = function (f, E) {
      return Z.H.useCallback(f, E);
    }),
    (W.useContext = function (f) {
      return Z.H.useContext(f);
    }),
    (W.useDebugValue = function () {}),
    (W.useDeferredValue = function (f, E) {
      return Z.H.useDeferredValue(f, E);
    }),
    (W.useEffect = function (f, E) {
      return Z.H.useEffect(f, E);
    }),
    (W.useEffectEvent = function (f) {
      return Z.H.useEffectEvent(f);
    }),
    (W.useId = function () {
      return Z.H.useId();
    }),
    (W.useImperativeHandle = function (f, E, w) {
      return Z.H.useImperativeHandle(f, E, w);
    }),
    (W.useInsertionEffect = function (f, E) {
      return Z.H.useInsertionEffect(f, E);
    }),
    (W.useLayoutEffect = function (f, E) {
      return Z.H.useLayoutEffect(f, E);
    }),
    (W.useMemo = function (f, E) {
      return Z.H.useMemo(f, E);
    }),
    (W.useOptimistic = function (f, E) {
      return Z.H.useOptimistic(f, E);
    }),
    (W.useReducer = function (f, E, w) {
      return Z.H.useReducer(f, E, w);
    }),
    (W.useRef = function (f) {
      return Z.H.useRef(f);
    }),
    (W.useState = function (f) {
      return Z.H.useState(f);
    }),
    (W.useSyncExternalStore = function (f, E, w) {
      return Z.H.useSyncExternalStore(f, E, w);
    }),
    (W.useTransition = function () {
      return Z.H.useTransition();
    }),
    (W.version = "19.2.4"),
    W
  );
}
var Kd;
function ws() {
  return (Kd || ((Kd = 1), (Es.exports = I0())), Es.exports);
}
var U = ws();
const P0 = W0(U),
  ep = J0({ __proto__: null, default: P0 }, [U]);
var Ts = { exports: {} },
  Dn = {},
  Ns = { exports: {} },
  Cs = {};
var Jd;
function tp() {
  return (
    Jd ||
      ((Jd = 1),
      (function (s) {
        function d(O, B) {
          var K = O.length;
          O.push(B);
          e: for (; 0 < K; ) {
            var re = (K - 1) >>> 1,
              ge = O[re];
            if (0 < p(ge, B)) ((O[re] = B), (O[K] = ge), (K = re));
            else break e;
          }
        }
        function h(O) {
          return O.length === 0 ? null : O[0];
        }
        function o(O) {
          if (O.length === 0) return null;
          var B = O[0],
            K = O.pop();
          if (K !== B) {
            O[0] = K;
            e: for (var re = 0, ge = O.length, f = ge >>> 1; re < f; ) {
              var E = 2 * (re + 1) - 1,
                w = O[E],
                L = E + 1,
                F = O[L];
              if (0 > p(w, K))
                L < ge && 0 > p(F, w)
                  ? ((O[re] = F), (O[L] = K), (re = L))
                  : ((O[re] = w), (O[E] = K), (re = E));
              else if (L < ge && 0 > p(F, K))
                ((O[re] = F), (O[L] = K), (re = L));
              else break e;
            }
          }
          return B;
        }
        function p(O, B) {
          var K = O.sortIndex - B.sortIndex;
          return K !== 0 ? K : O.id - B.id;
        }
        if (
          ((s.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var x = performance;
          s.unstable_now = function () {
            return x.now();
          };
        } else {
          var T = Date,
            R = T.now();
          s.unstable_now = function () {
            return T.now() - R;
          };
        }
        var A = [],
          v = [],
          D = 1,
          N = null,
          Y = 3,
          ee = !1,
          $ = !1,
          J = !1,
          Q = !1,
          ne = typeof setTimeout == "function" ? setTimeout : null,
          oe = typeof clearTimeout == "function" ? clearTimeout : null,
          H = typeof setImmediate < "u" ? setImmediate : null;
        function ie(O) {
          for (var B = h(v); B !== null; ) {
            if (B.callback === null) o(v);
            else if (B.startTime <= O)
              (o(v), (B.sortIndex = B.expirationTime), d(A, B));
            else break;
            B = h(v);
          }
        }
        function je(O) {
          if (((J = !1), ie(O), !$))
            if (h(A) !== null) (($ = !0), he || ((he = !0), Ve()));
            else {
              var B = h(v);
              B !== null && Ie(je, B.startTime - O);
            }
        }
        var he = !1,
          Z = -1,
          ze = 5,
          _e = -1;
        function $e() {
          return Q ? !0 : !(s.unstable_now() - _e < ze);
        }
        function Ge() {
          if (((Q = !1), he)) {
            var O = s.unstable_now();
            _e = O;
            var B = !0;
            try {
              e: {
                (($ = !1), J && ((J = !1), oe(Z), (Z = -1)), (ee = !0));
                var K = Y;
                try {
                  t: {
                    for (
                      ie(O), N = h(A);
                      N !== null && !(N.expirationTime > O && $e());
                    ) {
                      var re = N.callback;
                      if (typeof re == "function") {
                        ((N.callback = null), (Y = N.priorityLevel));
                        var ge = re(N.expirationTime <= O);
                        if (((O = s.unstable_now()), typeof ge == "function")) {
                          ((N.callback = ge), ie(O), (B = !0));
                          break t;
                        }
                        (N === h(A) && o(A), ie(O));
                      } else o(A);
                      N = h(A);
                    }
                    if (N !== null) B = !0;
                    else {
                      var f = h(v);
                      (f !== null && Ie(je, f.startTime - O), (B = !1));
                    }
                  }
                  break e;
                } finally {
                  ((N = null), (Y = K), (ee = !1));
                }
                B = void 0;
              }
            } finally {
              B ? Ve() : (he = !1);
            }
          }
        }
        var Ve;
        if (typeof H == "function")
          Ve = function () {
            H(Ge);
          };
        else if (typeof MessageChannel < "u") {
          var Lt = new MessageChannel(),
            xt = Lt.port2;
          ((Lt.port1.onmessage = Ge),
            (Ve = function () {
              xt.postMessage(null);
            }));
        } else
          Ve = function () {
            ne(Ge, 0);
          };
        function Ie(O, B) {
          Z = ne(function () {
            O(s.unstable_now());
          }, B);
        }
        ((s.unstable_IdlePriority = 5),
          (s.unstable_ImmediatePriority = 1),
          (s.unstable_LowPriority = 4),
          (s.unstable_NormalPriority = 3),
          (s.unstable_Profiling = null),
          (s.unstable_UserBlockingPriority = 2),
          (s.unstable_cancelCallback = function (O) {
            O.callback = null;
          }),
          (s.unstable_forceFrameRate = function (O) {
            0 > O || 125 < O
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (ze = 0 < O ? Math.floor(1e3 / O) : 5);
          }),
          (s.unstable_getCurrentPriorityLevel = function () {
            return Y;
          }),
          (s.unstable_next = function (O) {
            switch (Y) {
              case 1:
              case 2:
              case 3:
                var B = 3;
                break;
              default:
                B = Y;
            }
            var K = Y;
            Y = B;
            try {
              return O();
            } finally {
              Y = K;
            }
          }),
          (s.unstable_requestPaint = function () {
            Q = !0;
          }),
          (s.unstable_runWithPriority = function (O, B) {
            switch (O) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                O = 3;
            }
            var K = Y;
            Y = O;
            try {
              return B();
            } finally {
              Y = K;
            }
          }),
          (s.unstable_scheduleCallback = function (O, B, K) {
            var re = s.unstable_now();
            switch (
              (typeof K == "object" && K !== null
                ? ((K = K.delay),
                  (K = typeof K == "number" && 0 < K ? re + K : re))
                : (K = re),
              O)
            ) {
              case 1:
                var ge = -1;
                break;
              case 2:
                ge = 250;
                break;
              case 5:
                ge = 1073741823;
                break;
              case 4:
                ge = 1e4;
                break;
              default:
                ge = 5e3;
            }
            return (
              (ge = K + ge),
              (O = {
                id: D++,
                callback: B,
                priorityLevel: O,
                startTime: K,
                expirationTime: ge,
                sortIndex: -1,
              }),
              K > re
                ? ((O.sortIndex = K),
                  d(v, O),
                  h(A) === null &&
                    O === h(v) &&
                    (J ? (oe(Z), (Z = -1)) : (J = !0), Ie(je, K - re)))
                : ((O.sortIndex = ge),
                  d(A, O),
                  $ || ee || (($ = !0), he || ((he = !0), Ve()))),
              O
            );
          }),
          (s.unstable_shouldYield = $e),
          (s.unstable_wrapCallback = function (O) {
            var B = Y;
            return function () {
              var K = Y;
              Y = B;
              try {
                return O.apply(this, arguments);
              } finally {
                Y = K;
              }
            };
          }));
      })(Cs)),
    Cs
  );
}
var Wd;
function lp() {
  return (Wd || ((Wd = 1), (Ns.exports = tp())), Ns.exports);
}
var Os = { exports: {} },
  Fe = {};
var $d;
function ap() {
  if ($d) return Fe;
  $d = 1;
  var s = ws();
  function d(A) {
    var v = "https://react.dev/errors/" + A;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var D = 2; D < arguments.length; D++)
        v += "&args[]=" + encodeURIComponent(arguments[D]);
    }
    return (
      "Minified React error #" +
      A +
      "; visit " +
      v +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function h() {}
  var o = {
      d: {
        f: h,
        r: function () {
          throw Error(d(522));
        },
        D: h,
        C: h,
        L: h,
        m: h,
        X: h,
        S: h,
        M: h,
      },
      p: 0,
      findDOMNode: null,
    },
    p = Symbol.for("react.portal");
  function x(A, v, D) {
    var N =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: p,
      key: N == null ? null : "" + N,
      children: A,
      containerInfo: v,
      implementation: D,
    };
  }
  var T = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function R(A, v) {
    if (A === "font") return "";
    if (typeof v == "string") return v === "use-credentials" ? v : "";
  }
  return (
    (Fe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (Fe.createPortal = function (A, v) {
      var D =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!v || (v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11))
        throw Error(d(299));
      return x(A, v, null, D);
    }),
    (Fe.flushSync = function (A) {
      var v = T.T,
        D = o.p;
      try {
        if (((T.T = null), (o.p = 2), A)) return A();
      } finally {
        ((T.T = v), (o.p = D), o.d.f());
      }
    }),
    (Fe.preconnect = function (A, v) {
      typeof A == "string" &&
        (v
          ? ((v = v.crossOrigin),
            (v =
              typeof v == "string"
                ? v === "use-credentials"
                  ? v
                  : ""
                : void 0))
          : (v = null),
        o.d.C(A, v));
    }),
    (Fe.prefetchDNS = function (A) {
      typeof A == "string" && o.d.D(A);
    }),
    (Fe.preinit = function (A, v) {
      if (typeof A == "string" && v && typeof v.as == "string") {
        var D = v.as,
          N = R(D, v.crossOrigin),
          Y = typeof v.integrity == "string" ? v.integrity : void 0,
          ee = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
        D === "style"
          ? o.d.S(A, typeof v.precedence == "string" ? v.precedence : void 0, {
              crossOrigin: N,
              integrity: Y,
              fetchPriority: ee,
            })
          : D === "script" &&
            o.d.X(A, {
              crossOrigin: N,
              integrity: Y,
              fetchPriority: ee,
              nonce: typeof v.nonce == "string" ? v.nonce : void 0,
            });
      }
    }),
    (Fe.preinitModule = function (A, v) {
      if (typeof A == "string")
        if (typeof v == "object" && v !== null) {
          if (v.as == null || v.as === "script") {
            var D = R(v.as, v.crossOrigin);
            o.d.M(A, {
              crossOrigin: D,
              integrity: typeof v.integrity == "string" ? v.integrity : void 0,
              nonce: typeof v.nonce == "string" ? v.nonce : void 0,
            });
          }
        } else v == null && o.d.M(A);
    }),
    (Fe.preload = function (A, v) {
      if (
        typeof A == "string" &&
        typeof v == "object" &&
        v !== null &&
        typeof v.as == "string"
      ) {
        var D = v.as,
          N = R(D, v.crossOrigin);
        o.d.L(A, D, {
          crossOrigin: N,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0,
          nonce: typeof v.nonce == "string" ? v.nonce : void 0,
          type: typeof v.type == "string" ? v.type : void 0,
          fetchPriority:
            typeof v.fetchPriority == "string" ? v.fetchPriority : void 0,
          referrerPolicy:
            typeof v.referrerPolicy == "string" ? v.referrerPolicy : void 0,
          imageSrcSet:
            typeof v.imageSrcSet == "string" ? v.imageSrcSet : void 0,
          imageSizes: typeof v.imageSizes == "string" ? v.imageSizes : void 0,
          media: typeof v.media == "string" ? v.media : void 0,
        });
      }
    }),
    (Fe.preloadModule = function (A, v) {
      if (typeof A == "string")
        if (v) {
          var D = R(v.as, v.crossOrigin);
          o.d.m(A, {
            as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
            crossOrigin: D,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
          });
        } else o.d.m(A);
    }),
    (Fe.requestFormReset = function (A) {
      o.d.r(A);
    }),
    (Fe.unstable_batchedUpdates = function (A, v) {
      return A(v);
    }),
    (Fe.useFormState = function (A, v, D) {
      return T.H.useFormState(A, v, D);
    }),
    (Fe.useFormStatus = function () {
      return T.H.useHostTransitionStatus();
    }),
    (Fe.version = "19.2.4"),
    Fe
  );
}
var Fd;
function hh() {
  if (Fd) return Os.exports;
  Fd = 1;
  function s() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (d) {
        console.error(d);
      }
  }
  return (s(), (Os.exports = ap()), Os.exports);
}
var Id;
function np() {
  if (Id) return Dn;
  Id = 1;
  var s = lp(),
    d = ws(),
    h = hh();
  function o(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        t += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function p(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function x(e) {
    var t = e,
      l = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (l = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? l : null;
  }
  function T(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function R(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function A(e) {
    if (x(e) !== e) throw Error(o(188));
  }
  function v(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = x(e)), t === null)) throw Error(o(188));
      return t !== e ? null : e;
    }
    for (var l = e, a = t; ; ) {
      var n = l.return;
      if (n === null) break;
      var i = n.alternate;
      if (i === null) {
        if (((a = n.return), a !== null)) {
          l = a;
          continue;
        }
        break;
      }
      if (n.child === i.child) {
        for (i = n.child; i; ) {
          if (i === l) return (A(n), e);
          if (i === a) return (A(n), t);
          i = i.sibling;
        }
        throw Error(o(188));
      }
      if (l.return !== a.return) ((l = n), (a = i));
      else {
        for (var c = !1, r = n.child; r; ) {
          if (r === l) {
            ((c = !0), (l = n), (a = i));
            break;
          }
          if (r === a) {
            ((c = !0), (a = n), (l = i));
            break;
          }
          r = r.sibling;
        }
        if (!c) {
          for (r = i.child; r; ) {
            if (r === l) {
              ((c = !0), (l = i), (a = n));
              break;
            }
            if (r === a) {
              ((c = !0), (a = i), (l = n));
              break;
            }
            r = r.sibling;
          }
          if (!c) throw Error(o(189));
        }
      }
      if (l.alternate !== a) throw Error(o(190));
    }
    if (l.tag !== 3) throw Error(o(188));
    return l.stateNode.current === l ? e : t;
  }
  function D(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = D(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var N = Object.assign,
    Y = Symbol.for("react.element"),
    ee = Symbol.for("react.transitional.element"),
    $ = Symbol.for("react.portal"),
    J = Symbol.for("react.fragment"),
    Q = Symbol.for("react.strict_mode"),
    ne = Symbol.for("react.profiler"),
    oe = Symbol.for("react.consumer"),
    H = Symbol.for("react.context"),
    ie = Symbol.for("react.forward_ref"),
    je = Symbol.for("react.suspense"),
    he = Symbol.for("react.suspense_list"),
    Z = Symbol.for("react.memo"),
    ze = Symbol.for("react.lazy"),
    _e = Symbol.for("react.activity"),
    $e = Symbol.for("react.memo_cache_sentinel"),
    Ge = Symbol.iterator;
  function Ve(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (Ge && e[Ge]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var Lt = Symbol.for("react.client.reference");
  function xt(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Lt ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case J:
        return "Fragment";
      case ne:
        return "Profiler";
      case Q:
        return "StrictMode";
      case je:
        return "Suspense";
      case he:
        return "SuspenseList";
      case _e:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case $:
          return "Portal";
        case H:
          return e.displayName || "Context";
        case oe:
          return (e._context.displayName || "Context") + ".Consumer";
        case ie:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case Z:
          return (
            (t = e.displayName || null),
            t !== null ? t : xt(e.type) || "Memo"
          );
        case ze:
          ((t = e._payload), (e = e._init));
          try {
            return xt(e(t));
          } catch {}
      }
    return null;
  }
  var Ie = Array.isArray,
    O = d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    B = h.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    K = { pending: !1, data: null, method: null, action: null },
    re = [],
    ge = -1;
  function f(e) {
    return { current: e };
  }
  function E(e) {
    0 > ge || ((e.current = re[ge]), (re[ge] = null), ge--);
  }
  function w(e, t) {
    (ge++, (re[ge] = e.current), (e.current = t));
  }
  var L = f(null),
    F = f(null),
    te = f(null),
    pe = f(null);
  function Pe(e, t) {
    switch ((w(te, t), w(F, e), w(L, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? hd(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          ((t = hd(t)), (e = md(t, e)));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    (E(L), w(L, e));
  }
  function Me() {
    (E(L), E(F), E(te));
  }
  function qa(e) {
    e.memoizedState !== null && w(pe, e);
    var t = L.current,
      l = md(t, e.type);
    t !== l && (w(F, e), w(L, l));
  }
  function Bn(e) {
    (F.current === e && (E(L), E(F)),
      pe.current === e && (E(pe), (On._currentValue = K)));
  }
  var uu, Gs;
  function Ul(e) {
    if (uu === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        ((uu = (t && t[1]) || ""),
          (Gs =
            -1 <
            l.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < l.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      uu +
      e +
      Gs
    );
  }
  var cu = !1;
  function su(e, t) {
    if (!e || cu) return "";
    cu = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var M = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(M.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(M, []);
                } catch (z) {
                  var j = z;
                }
                Reflect.construct(e, [], M);
              } else {
                try {
                  M.call();
                } catch (z) {
                  j = z;
                }
                e.call(M.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (z) {
                j = z;
              }
              (M = e()) &&
                typeof M.catch == "function" &&
                M.catch(function () {});
            }
          } catch (z) {
            if (z && j && typeof z.stack == "string") return [z.stack, j.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name",
      );
      n &&
        n.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var i = a.DetermineComponentFrameRoot(),
        c = i[0],
        r = i[1];
      if (c && r) {
        var m = c.split(`
`),
          S = r.split(`
`);
        for (
          n = a = 0;
          a < m.length && !m[a].includes("DetermineComponentFrameRoot");
        )
          a++;
        for (; n < S.length && !S[n].includes("DetermineComponentFrameRoot"); )
          n++;
        if (a === m.length || n === S.length)
          for (
            a = m.length - 1, n = S.length - 1;
            1 <= a && 0 <= n && m[a] !== S[n];
          )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (m[a] !== S[n]) {
            if (a !== 1 || n !== 1)
              do
                if ((a--, n--, 0 > n || m[a] !== S[n])) {
                  var C =
                    `
` + m[a].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      C.includes("<anonymous>") &&
                      (C = C.replace("<anonymous>", e.displayName)),
                    C
                  );
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      ((cu = !1), (Error.prepareStackTrace = l));
    }
    return (l = e ? e.displayName || e.name : "") ? Ul(l) : "";
  }
  function Eh(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ul(e.type);
      case 16:
        return Ul("Lazy");
      case 13:
        return e.child !== t && t !== null
          ? Ul("Suspense Fallback")
          : Ul("Suspense");
      case 19:
        return Ul("SuspenseList");
      case 0:
      case 15:
        return su(e.type, !1);
      case 11:
        return su(e.type.render, !1);
      case 1:
        return su(e.type, !0);
      case 31:
        return Ul("Activity");
      default:
        return "";
    }
  }
  function Qs(e) {
    try {
      var t = "",
        l = null;
      do ((t += Eh(e, l)), (l = e), (e = e.return));
      while (e);
      return t;
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      );
    }
  }
  var ru = Object.prototype.hasOwnProperty,
    ou = s.unstable_scheduleCallback,
    fu = s.unstable_cancelCallback,
    Th = s.unstable_shouldYield,
    Nh = s.unstable_requestPaint,
    rt = s.unstable_now,
    Ch = s.unstable_getCurrentPriorityLevel,
    Xs = s.unstable_ImmediatePriority,
    Vs = s.unstable_UserBlockingPriority,
    Ln = s.unstable_NormalPriority,
    Oh = s.unstable_LowPriority,
    Zs = s.unstable_IdlePriority,
    _h = s.log,
    Mh = s.unstable_setDisableYieldValue,
    Ya = null,
    ot = null;
  function nl(e) {
    if (
      (typeof _h == "function" && Mh(e),
      ot && typeof ot.setStrictMode == "function")
    )
      try {
        ot.setStrictMode(Ya, e);
      } catch {}
  }
  var ft = Math.clz32 ? Math.clz32 : Dh,
    Rh = Math.log,
    Uh = Math.LN2;
  function Dh(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Rh(e) / Uh) | 0)) | 0);
  }
  var qn = 256,
    Yn = 262144,
    Gn = 4194304;
  function Dl(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Qn(e, t, l) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var n = 0,
      i = e.suspendedLanes,
      c = e.pingedLanes;
    e = e.warmLanes;
    var r = a & 134217727;
    return (
      r !== 0
        ? ((a = r & ~i),
          a !== 0
            ? (n = Dl(a))
            : ((c &= r),
              c !== 0
                ? (n = Dl(c))
                : l || ((l = r & ~e), l !== 0 && (n = Dl(l)))))
        : ((r = a & ~i),
          r !== 0
            ? (n = Dl(r))
            : c !== 0
              ? (n = Dl(c))
              : l || ((l = a & ~e), l !== 0 && (n = Dl(l)))),
      n === 0
        ? 0
        : t !== 0 &&
            t !== n &&
            (t & i) === 0 &&
            ((i = n & -n),
            (l = t & -t),
            i >= l || (i === 32 && (l & 4194048) !== 0))
          ? t
          : n
    );
  }
  function Ga(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function wh(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function ks() {
    var e = Gn;
    return ((Gn <<= 1), (Gn & 62914560) === 0 && (Gn = 4194304), e);
  }
  function du(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Qa(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function Hh(e, t, l, a, n, i) {
    var c = e.pendingLanes;
    ((e.pendingLanes = l),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= l),
      (e.entangledLanes &= l),
      (e.errorRecoveryDisabledLanes &= l),
      (e.shellSuspendCounter = 0));
    var r = e.entanglements,
      m = e.expirationTimes,
      S = e.hiddenUpdates;
    for (l = c & ~l; 0 < l; ) {
      var C = 31 - ft(l),
        M = 1 << C;
      ((r[C] = 0), (m[C] = -1));
      var j = S[C];
      if (j !== null)
        for (S[C] = null, C = 0; C < j.length; C++) {
          var z = j[C];
          z !== null && (z.lane &= -536870913);
        }
      l &= ~M;
    }
    (a !== 0 && Ks(e, a, 0),
      i !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(c & ~t)));
  }
  function Ks(e, t, l) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var a = 31 - ft(t);
    ((e.entangledLanes |= t),
      (e.entanglements[a] = e.entanglements[a] | 1073741824 | (l & 261930)));
  }
  function Js(e, t) {
    var l = (e.entangledLanes |= t);
    for (e = e.entanglements; l; ) {
      var a = 31 - ft(l),
        n = 1 << a;
      ((n & t) | (e[a] & t) && (e[a] |= t), (l &= ~n));
    }
  }
  function Ws(e, t) {
    var l = t & -t;
    return (
      (l = (l & 42) !== 0 ? 1 : hu(l)),
      (l & (e.suspendedLanes | t)) !== 0 ? 0 : l
    );
  }
  function hu(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function mu(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function $s() {
    var e = B.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Bd(e.type));
  }
  function Fs(e, t) {
    var l = B.p;
    try {
      return ((B.p = e), t());
    } finally {
      B.p = l;
    }
  }
  var il = Math.random().toString(36).slice(2),
    Ze = "__reactFiber$" + il,
    tt = "__reactProps$" + il,
    Pl = "__reactContainer$" + il,
    pu = "__reactEvents$" + il,
    Bh = "__reactListeners$" + il,
    Lh = "__reactHandles$" + il,
    Is = "__reactResources$" + il,
    Xa = "__reactMarker$" + il;
  function gu(e) {
    (delete e[Ze], delete e[tt], delete e[pu], delete e[Bh], delete e[Lh]);
  }
  function ea(e) {
    var t = e[Ze];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if ((t = l[Pl] || l[Ze])) {
        if (
          ((l = t.alternate),
          t.child !== null || (l !== null && l.child !== null))
        )
          for (e = Sd(e); e !== null; ) {
            if ((l = e[Ze])) return l;
            e = Sd(e);
          }
        return t;
      }
      ((e = l), (l = e.parentNode));
    }
    return null;
  }
  function ta(e) {
    if ((e = e[Ze] || e[Pl])) {
      var t = e.tag;
      if (
        t === 5 ||
        t === 6 ||
        t === 13 ||
        t === 31 ||
        t === 26 ||
        t === 27 ||
        t === 3
      )
        return e;
    }
    return null;
  }
  function Va(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function la(e) {
    var t = e[Is];
    return (
      t ||
        (t = e[Is] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function Qe(e) {
    e[Xa] = !0;
  }
  var Ps = new Set(),
    er = {};
  function wl(e, t) {
    (aa(e, t), aa(e + "Capture", t));
  }
  function aa(e, t) {
    for (er[e] = t, e = 0; e < t.length; e++) Ps.add(t[e]);
  }
  var qh = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    tr = {},
    lr = {};
  function Yh(e) {
    return ru.call(lr, e)
      ? !0
      : ru.call(tr, e)
        ? !1
        : qh.test(e)
          ? (lr[e] = !0)
          : ((tr[e] = !0), !1);
  }
  function Xn(e, t, l) {
    if (Yh(t))
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + l);
      }
  }
  function Vn(e, t, l) {
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + l);
    }
  }
  function qt(e, t, l, a) {
    if (a === null) e.removeAttribute(l);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(t, l, "" + a);
    }
  }
  function bt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function ar(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function Gh(e, t, l) {
    var a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof a < "u" &&
      typeof a.get == "function" &&
      typeof a.set == "function"
    ) {
      var n = a.get,
        i = a.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return n.call(this);
          },
          set: function (c) {
            ((l = "" + c), i.call(this, c));
          },
        }),
        Object.defineProperty(e, t, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (c) {
            l = "" + c;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function vu(e) {
    if (!e._valueTracker) {
      var t = ar(e) ? "checked" : "value";
      e._valueTracker = Gh(e, t, "" + e[t]);
    }
  }
  function nr(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(),
      a = "";
    return (
      e && (a = ar(e) ? (e.checked ? "true" : "false") : e.value),
      (e = a),
      e !== l ? (t.setValue(e), !0) : !1
    );
  }
  function Zn(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Qh = /[\n"\\]/g;
  function St(e) {
    return e.replace(Qh, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function yu(e, t, l, a, n, i, c, r) {
    ((e.name = ""),
      c != null &&
      typeof c != "function" &&
      typeof c != "symbol" &&
      typeof c != "boolean"
        ? (e.type = c)
        : e.removeAttribute("type"),
      t != null
        ? c === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + bt(t))
          : e.value !== "" + bt(t) && (e.value = "" + bt(t))
        : (c !== "submit" && c !== "reset") || e.removeAttribute("value"),
      t != null
        ? xu(e, c, bt(t))
        : l != null
          ? xu(e, c, bt(l))
          : a != null && e.removeAttribute("value"),
      n == null && i != null && (e.defaultChecked = !!i),
      n != null &&
        (e.checked = n && typeof n != "function" && typeof n != "symbol"),
      r != null &&
      typeof r != "function" &&
      typeof r != "symbol" &&
      typeof r != "boolean"
        ? (e.name = "" + bt(r))
        : e.removeAttribute("name"));
  }
  function ir(e, t, l, a, n, i, c, r) {
    if (
      (i != null &&
        typeof i != "function" &&
        typeof i != "symbol" &&
        typeof i != "boolean" &&
        (e.type = i),
      t != null || l != null)
    ) {
      if (!((i !== "submit" && i !== "reset") || t != null)) {
        vu(e);
        return;
      }
      ((l = l != null ? "" + bt(l) : ""),
        (t = t != null ? "" + bt(t) : l),
        r || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((a = a ?? n),
      (a = typeof a != "function" && typeof a != "symbol" && !!a),
      (e.checked = r ? e.checked : !!a),
      (e.defaultChecked = !!a),
      c != null &&
        typeof c != "function" &&
        typeof c != "symbol" &&
        typeof c != "boolean" &&
        (e.name = c),
      vu(e));
  }
  function xu(e, t, l) {
    (t === "number" && Zn(e.ownerDocument) === e) ||
      e.defaultValue === "" + l ||
      (e.defaultValue = "" + l);
  }
  function na(e, t, l, a) {
    if (((e = e.options), t)) {
      t = {};
      for (var n = 0; n < l.length; n++) t["$" + l[n]] = !0;
      for (l = 0; l < e.length; l++)
        ((n = t.hasOwnProperty("$" + e[l].value)),
          e[l].selected !== n && (e[l].selected = n),
          n && a && (e[l].defaultSelected = !0));
    } else {
      for (l = "" + bt(l), t = null, n = 0; n < e.length; n++) {
        if (e[n].value === l) {
          ((e[n].selected = !0), a && (e[n].defaultSelected = !0));
          return;
        }
        t !== null || e[n].disabled || (t = e[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function ur(e, t, l) {
    if (
      t != null &&
      ((t = "" + bt(t)), t !== e.value && (e.value = t), l == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + bt(l) : "";
  }
  function cr(e, t, l, a) {
    if (t == null) {
      if (a != null) {
        if (l != null) throw Error(o(92));
        if (Ie(a)) {
          if (1 < a.length) throw Error(o(93));
          a = a[0];
        }
        l = a;
      }
      (l == null && (l = ""), (t = l));
    }
    ((l = bt(t)),
      (e.defaultValue = l),
      (a = e.textContent),
      a === l && a !== "" && a !== null && (e.value = a),
      vu(e));
  }
  function ia(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Xh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function sr(e, t, l) {
    var a = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === ""
      ? a
        ? e.setProperty(t, "")
        : t === "float"
          ? (e.cssFloat = "")
          : (e[t] = "")
      : a
        ? e.setProperty(t, l)
        : typeof l != "number" || l === 0 || Xh.has(t)
          ? t === "float"
            ? (e.cssFloat = l)
            : (e[t] = ("" + l).trim())
          : (e[t] = l + "px");
  }
  function rr(e, t, l) {
    if (t != null && typeof t != "object") throw Error(o(62));
    if (((e = e.style), l != null)) {
      for (var a in l)
        !l.hasOwnProperty(a) ||
          (t != null && t.hasOwnProperty(a)) ||
          (a.indexOf("--") === 0
            ? e.setProperty(a, "")
            : a === "float"
              ? (e.cssFloat = "")
              : (e[a] = ""));
      for (var n in t)
        ((a = t[n]), t.hasOwnProperty(n) && l[n] !== a && sr(e, n, a));
    } else for (var i in t) t.hasOwnProperty(i) && sr(e, i, t[i]);
  }
  function bu(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Vh = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    Zh =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function kn(e) {
    return Zh.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function Yt() {}
  var Su = null;
  function ju(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var ua = null,
    ca = null;
  function or(e) {
    var t = ta(e);
    if (t && (e = t.stateNode)) {
      var l = e[tt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (yu(
              e,
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name,
            ),
            (t = l.name),
            l.type === "radio" && t != null)
          ) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (
              l = l.querySelectorAll(
                'input[name="' + St("" + t) + '"][type="radio"]',
              ),
                t = 0;
              t < l.length;
              t++
            ) {
              var a = l[t];
              if (a !== e && a.form === e.form) {
                var n = a[tt] || null;
                if (!n) throw Error(o(90));
                yu(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name,
                );
              }
            }
            for (t = 0; t < l.length; t++)
              ((a = l[t]), a.form === e.form && nr(a));
          }
          break e;
        case "textarea":
          ur(e, l.value, l.defaultValue);
          break e;
        case "select":
          ((t = l.value), t != null && na(e, !!l.multiple, t, !1));
      }
    }
  }
  var Au = !1;
  function fr(e, t, l) {
    if (Au) return e(t, l);
    Au = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (
        ((Au = !1),
        (ua !== null || ca !== null) &&
          (Ui(), ua && ((t = ua), (e = ca), (ca = ua = null), or(t), e)))
      )
        for (t = 0; t < e.length; t++) or(e[t]);
    }
  }
  function Za(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var a = l[tt] || null;
    if (a === null) return null;
    l = a[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((a = !a.disabled) ||
          ((e = e.type),
          (a = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !a));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != "function") throw Error(o(231, t, typeof l));
    return l;
  }
  var Gt = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    zu = !1;
  if (Gt)
    try {
      var ka = {};
      (Object.defineProperty(ka, "passive", {
        get: function () {
          zu = !0;
        },
      }),
        window.addEventListener("test", ka, ka),
        window.removeEventListener("test", ka, ka));
    } catch {
      zu = !1;
    }
  var ul = null,
    Eu = null,
    Kn = null;
  function dr() {
    if (Kn) return Kn;
    var e,
      t = Eu,
      l = t.length,
      a,
      n = "value" in ul ? ul.value : ul.textContent,
      i = n.length;
    for (e = 0; e < l && t[e] === n[e]; e++);
    var c = l - e;
    for (a = 1; a <= c && t[l - a] === n[i - a]; a++);
    return (Kn = n.slice(e, 1 < a ? 1 - a : void 0));
  }
  function Jn(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Wn() {
    return !0;
  }
  function hr() {
    return !1;
  }
  function lt(e) {
    function t(l, a, n, i, c) {
      ((this._reactName = l),
        (this._targetInst = n),
        (this.type = a),
        (this.nativeEvent = i),
        (this.target = c),
        (this.currentTarget = null));
      for (var r in e)
        e.hasOwnProperty(r) && ((l = e[r]), (this[r] = l ? l(i) : i[r]));
      return (
        (this.isDefaultPrevented = (
          i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
        )
          ? Wn
          : hr),
        (this.isPropagationStopped = hr),
        this
      );
    }
    return (
      N(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != "unknown" && (l.returnValue = !1),
            (this.isDefaultPrevented = Wn));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0),
            (this.isPropagationStopped = Wn));
        },
        persist: function () {},
        isPersistent: Wn,
      }),
      t
    );
  }
  var Hl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    $n = lt(Hl),
    Ka = N({}, Hl, { view: 0, detail: 0 }),
    kh = lt(Ka),
    Tu,
    Nu,
    Ja,
    Fn = N({}, Ka, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Ou,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== Ja &&
              (Ja && e.type === "mousemove"
                ? ((Tu = e.screenX - Ja.screenX), (Nu = e.screenY - Ja.screenY))
                : (Nu = Tu = 0),
              (Ja = e)),
            Tu);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : Nu;
      },
    }),
    mr = lt(Fn),
    Kh = N({}, Fn, { dataTransfer: 0 }),
    Jh = lt(Kh),
    Wh = N({}, Ka, { relatedTarget: 0 }),
    Cu = lt(Wh),
    $h = N({}, Hl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Fh = lt($h),
    Ih = N({}, Hl, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Ph = lt(Ih),
    em = N({}, Hl, { data: 0 }),
    pr = lt(em),
    tm = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    lm = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    am = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function nm(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = am[e])
        ? !!t[e]
        : !1;
  }
  function Ou() {
    return nm;
  }
  var im = N({}, Ka, {
      key: function (e) {
        if (e.key) {
          var t = tm[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = Jn(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? lm[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Ou,
      charCode: function (e) {
        return e.type === "keypress" ? Jn(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? Jn(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    um = lt(im),
    cm = N({}, Fn, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    gr = lt(cm),
    sm = N({}, Ka, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ou,
    }),
    rm = lt(sm),
    om = N({}, Hl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    fm = lt(om),
    dm = N({}, Fn, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    hm = lt(dm),
    mm = N({}, Hl, { newState: 0, oldState: 0 }),
    pm = lt(mm),
    gm = [9, 13, 27, 32],
    _u = Gt && "CompositionEvent" in window,
    Wa = null;
  Gt && "documentMode" in document && (Wa = document.documentMode);
  var vm = Gt && "TextEvent" in window && !Wa,
    vr = Gt && (!_u || (Wa && 8 < Wa && 11 >= Wa)),
    yr = " ",
    xr = !1;
  function br(e, t) {
    switch (e) {
      case "keyup":
        return gm.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Sr(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var sa = !1;
  function ym(e, t) {
    switch (e) {
      case "compositionend":
        return Sr(t);
      case "keypress":
        return t.which !== 32 ? null : ((xr = !0), yr);
      case "textInput":
        return ((e = t.data), e === yr && xr ? null : e);
      default:
        return null;
    }
  }
  function xm(e, t) {
    if (sa)
      return e === "compositionend" || (!_u && br(e, t))
        ? ((e = dr()), (Kn = Eu = ul = null), (sa = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return vr && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var bm = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function jr(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!bm[e.type] : t === "textarea";
  }
  function Ar(e, t, l, a) {
    (ua ? (ca ? ca.push(a) : (ca = [a])) : (ua = a),
      (t = Yi(t, "onChange")),
      0 < t.length &&
        ((l = new $n("onChange", "change", null, l, a)),
        e.push({ event: l, listeners: t })));
  }
  var $a = null,
    Fa = null;
  function Sm(e) {
    cd(e, 0);
  }
  function In(e) {
    var t = Va(e);
    if (nr(t)) return e;
  }
  function zr(e, t) {
    if (e === "change") return t;
  }
  var Er = !1;
  if (Gt) {
    var Mu;
    if (Gt) {
      var Ru = "oninput" in document;
      if (!Ru) {
        var Tr = document.createElement("div");
        (Tr.setAttribute("oninput", "return;"),
          (Ru = typeof Tr.oninput == "function"));
      }
      Mu = Ru;
    } else Mu = !1;
    Er = Mu && (!document.documentMode || 9 < document.documentMode);
  }
  function Nr() {
    $a && ($a.detachEvent("onpropertychange", Cr), (Fa = $a = null));
  }
  function Cr(e) {
    if (e.propertyName === "value" && In(Fa)) {
      var t = [];
      (Ar(t, Fa, e, ju(e)), fr(Sm, t));
    }
  }
  function jm(e, t, l) {
    e === "focusin"
      ? (Nr(), ($a = t), (Fa = l), $a.attachEvent("onpropertychange", Cr))
      : e === "focusout" && Nr();
  }
  function Am(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return In(Fa);
  }
  function zm(e, t) {
    if (e === "click") return In(t);
  }
  function Em(e, t) {
    if (e === "input" || e === "change") return In(t);
  }
  function Tm(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var dt = typeof Object.is == "function" ? Object.is : Tm;
  function Ia(e, t) {
    if (dt(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var l = Object.keys(e),
      a = Object.keys(t);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!ru.call(t, n) || !dt(e[n], t[n])) return !1;
    }
    return !0;
  }
  function Or(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function _r(e, t) {
    var l = Or(e);
    e = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (((a = e + l.textContent.length), e <= t && a >= t))
          return { node: l, offset: t - e };
        e = a;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Or(l);
    }
  }
  function Mr(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Mr(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Rr(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Zn(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = Zn(e.document);
    }
    return t;
  }
  function Uu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var Nm = Gt && "documentMode" in document && 11 >= document.documentMode,
    ra = null,
    Du = null,
    Pa = null,
    wu = !1;
  function Ur(e, t, l) {
    var a =
      l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    wu ||
      ra == null ||
      ra !== Zn(a) ||
      ((a = ra),
      "selectionStart" in a && Uu(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (Pa && Ia(Pa, a)) ||
        ((Pa = a),
        (a = Yi(Du, "onSelect")),
        0 < a.length &&
          ((t = new $n("onSelect", "select", null, t, l)),
          e.push({ event: t, listeners: a }),
          (t.target = ra))));
  }
  function Bl(e, t) {
    var l = {};
    return (
      (l[e.toLowerCase()] = t.toLowerCase()),
      (l["Webkit" + e] = "webkit" + t),
      (l["Moz" + e] = "moz" + t),
      l
    );
  }
  var oa = {
      animationend: Bl("Animation", "AnimationEnd"),
      animationiteration: Bl("Animation", "AnimationIteration"),
      animationstart: Bl("Animation", "AnimationStart"),
      transitionrun: Bl("Transition", "TransitionRun"),
      transitionstart: Bl("Transition", "TransitionStart"),
      transitioncancel: Bl("Transition", "TransitionCancel"),
      transitionend: Bl("Transition", "TransitionEnd"),
    },
    Hu = {},
    Dr = {};
  Gt &&
    ((Dr = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete oa.animationend.animation,
      delete oa.animationiteration.animation,
      delete oa.animationstart.animation),
    "TransitionEvent" in window || delete oa.transitionend.transition);
  function Ll(e) {
    if (Hu[e]) return Hu[e];
    if (!oa[e]) return e;
    var t = oa[e],
      l;
    for (l in t) if (t.hasOwnProperty(l) && l in Dr) return (Hu[e] = t[l]);
    return e;
  }
  var wr = Ll("animationend"),
    Hr = Ll("animationiteration"),
    Br = Ll("animationstart"),
    Cm = Ll("transitionrun"),
    Om = Ll("transitionstart"),
    _m = Ll("transitioncancel"),
    Lr = Ll("transitionend"),
    qr = new Map(),
    Bu =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  Bu.push("scrollEnd");
  function _t(e, t) {
    (qr.set(e, t), wl(t, [e]));
  }
  var Pn =
      typeof reportError == "function"
        ? reportError
        : function (e) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var t = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof e == "object" &&
                  e !== null &&
                  typeof e.message == "string"
                    ? String(e.message)
                    : String(e),
                error: e,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", e);
              return;
            }
            console.error(e);
          },
    jt = [],
    fa = 0,
    Lu = 0;
  function ei() {
    for (var e = fa, t = (Lu = fa = 0); t < e; ) {
      var l = jt[t];
      jt[t++] = null;
      var a = jt[t];
      jt[t++] = null;
      var n = jt[t];
      jt[t++] = null;
      var i = jt[t];
      if (((jt[t++] = null), a !== null && n !== null)) {
        var c = a.pending;
        (c === null ? (n.next = n) : ((n.next = c.next), (c.next = n)),
          (a.pending = n));
      }
      i !== 0 && Yr(l, n, i);
    }
  }
  function ti(e, t, l, a) {
    ((jt[fa++] = e),
      (jt[fa++] = t),
      (jt[fa++] = l),
      (jt[fa++] = a),
      (Lu |= a),
      (e.lanes |= a),
      (e = e.alternate),
      e !== null && (e.lanes |= a));
  }
  function qu(e, t, l, a) {
    return (ti(e, t, l, a), li(e));
  }
  function ql(e, t) {
    return (ti(e, null, null, t), li(e));
  }
  function Yr(e, t, l) {
    e.lanes |= l;
    var a = e.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, i = e.return; i !== null; )
      ((i.childLanes |= l),
        (a = i.alternate),
        a !== null && (a.childLanes |= l),
        i.tag === 22 &&
          ((e = i.stateNode), e === null || e._visibility & 1 || (n = !0)),
        (e = i),
        (i = i.return));
    return e.tag === 3
      ? ((i = e.stateNode),
        n &&
          t !== null &&
          ((n = 31 - ft(l)),
          (e = i.hiddenUpdates),
          (a = e[n]),
          a === null ? (e[n] = [t]) : a.push(t),
          (t.lane = l | 536870912)),
        i)
      : null;
  }
  function li(e) {
    if (50 < jn) throw ((jn = 0), (Jc = null), Error(o(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var da = {};
  function Mm(e, t, l, a) {
    ((this.tag = e),
      (this.key = l),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function ht(e, t, l, a) {
    return new Mm(e, t, l, a);
  }
  function Yu(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Qt(e, t) {
    var l = e.alternate;
    return (
      l === null
        ? ((l = ht(e.tag, t, e.key, e.mode)),
          (l.elementType = e.elementType),
          (l.type = e.type),
          (l.stateNode = e.stateNode),
          (l.alternate = e),
          (e.alternate = l))
        : ((l.pendingProps = t),
          (l.type = e.type),
          (l.flags = 0),
          (l.subtreeFlags = 0),
          (l.deletions = null)),
      (l.flags = e.flags & 65011712),
      (l.childLanes = e.childLanes),
      (l.lanes = e.lanes),
      (l.child = e.child),
      (l.memoizedProps = e.memoizedProps),
      (l.memoizedState = e.memoizedState),
      (l.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (l.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (l.sibling = e.sibling),
      (l.index = e.index),
      (l.ref = e.ref),
      (l.refCleanup = e.refCleanup),
      l
    );
  }
  function Gr(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return (
      l === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = l.childLanes),
          (e.lanes = l.lanes),
          (e.child = l.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = l.memoizedProps),
          (e.memoizedState = l.memoizedState),
          (e.updateQueue = l.updateQueue),
          (e.type = l.type),
          (t = l.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function ai(e, t, l, a, n, i) {
    var c = 0;
    if (((a = e), typeof e == "function")) Yu(e) && (c = 1);
    else if (typeof e == "string")
      c = H0(e, l, L.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
          ? 27
          : 5;
    else
      e: switch (e) {
        case _e:
          return (
            (e = ht(31, l, t, n)),
            (e.elementType = _e),
            (e.lanes = i),
            e
          );
        case J:
          return Yl(l.children, n, i, t);
        case Q:
          ((c = 8), (n |= 24));
          break;
        case ne:
          return (
            (e = ht(12, l, t, n | 2)),
            (e.elementType = ne),
            (e.lanes = i),
            e
          );
        case je:
          return (
            (e = ht(13, l, t, n)),
            (e.elementType = je),
            (e.lanes = i),
            e
          );
        case he:
          return (
            (e = ht(19, l, t, n)),
            (e.elementType = he),
            (e.lanes = i),
            e
          );
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case H:
                c = 10;
                break e;
              case oe:
                c = 9;
                break e;
              case ie:
                c = 11;
                break e;
              case Z:
                c = 14;
                break e;
              case ze:
                ((c = 16), (a = null));
                break e;
            }
          ((c = 29),
            (l = Error(o(130, e === null ? "null" : typeof e, ""))),
            (a = null));
      }
    return (
      (t = ht(c, l, t, n)),
      (t.elementType = e),
      (t.type = a),
      (t.lanes = i),
      t
    );
  }
  function Yl(e, t, l, a) {
    return ((e = ht(7, e, a, t)), (e.lanes = l), e);
  }
  function Gu(e, t, l) {
    return ((e = ht(6, e, null, t)), (e.lanes = l), e);
  }
  function Qr(e) {
    var t = ht(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function Qu(e, t, l) {
    return (
      (t = ht(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = l),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var Xr = new WeakMap();
  function At(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = Xr.get(e);
      return l !== void 0
        ? l
        : ((t = { value: e, source: t, stack: Qs(t) }), Xr.set(e, t), t);
    }
    return { value: e, source: t, stack: Qs(t) };
  }
  var ha = [],
    ma = 0,
    ni = null,
    en = 0,
    zt = [],
    Et = 0,
    cl = null,
    Ut = 1,
    Dt = "";
  function Xt(e, t) {
    ((ha[ma++] = en), (ha[ma++] = ni), (ni = e), (en = t));
  }
  function Vr(e, t, l) {
    ((zt[Et++] = Ut), (zt[Et++] = Dt), (zt[Et++] = cl), (cl = e));
    var a = Ut;
    e = Dt;
    var n = 32 - ft(a) - 1;
    ((a &= ~(1 << n)), (l += 1));
    var i = 32 - ft(t) + n;
    if (30 < i) {
      var c = n - (n % 5);
      ((i = (a & ((1 << c) - 1)).toString(32)),
        (a >>= c),
        (n -= c),
        (Ut = (1 << (32 - ft(t) + n)) | (l << n) | a),
        (Dt = i + e));
    } else ((Ut = (1 << i) | (l << n) | a), (Dt = e));
  }
  function Xu(e) {
    e.return !== null && (Xt(e, 1), Vr(e, 1, 0));
  }
  function Vu(e) {
    for (; e === ni; )
      ((ni = ha[--ma]), (ha[ma] = null), (en = ha[--ma]), (ha[ma] = null));
    for (; e === cl; )
      ((cl = zt[--Et]),
        (zt[Et] = null),
        (Dt = zt[--Et]),
        (zt[Et] = null),
        (Ut = zt[--Et]),
        (zt[Et] = null));
  }
  function Zr(e, t) {
    ((zt[Et++] = Ut),
      (zt[Et++] = Dt),
      (zt[Et++] = cl),
      (Ut = t.id),
      (Dt = t.overflow),
      (cl = e));
  }
  var ke = null,
    Ee = null,
    se = !1,
    sl = null,
    Tt = !1,
    Zu = Error(o(519));
  function rl(e) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        "",
      ),
    );
    throw (tn(At(t, e)), Zu);
  }
  function kr(e) {
    var t = e.stateNode,
      l = e.type,
      a = e.memoizedProps;
    switch (((t[Ze] = e), (t[tt] = a), l)) {
      case "dialog":
        (ae("cancel", t), ae("close", t));
        break;
      case "iframe":
      case "object":
      case "embed":
        ae("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < zn.length; l++) ae(zn[l], t);
        break;
      case "source":
        ae("error", t);
        break;
      case "img":
      case "image":
      case "link":
        (ae("error", t), ae("load", t));
        break;
      case "details":
        ae("toggle", t);
        break;
      case "input":
        (ae("invalid", t),
          ir(
            t,
            a.value,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
            !0,
          ));
        break;
      case "select":
        ae("invalid", t);
        break;
      case "textarea":
        (ae("invalid", t), cr(t, a.value, a.defaultValue, a.children));
    }
    ((l = a.children),
      (typeof l != "string" && typeof l != "number" && typeof l != "bigint") ||
      t.textContent === "" + l ||
      a.suppressHydrationWarning === !0 ||
      fd(t.textContent, l)
        ? (a.popover != null && (ae("beforetoggle", t), ae("toggle", t)),
          a.onScroll != null && ae("scroll", t),
          a.onScrollEnd != null && ae("scrollend", t),
          a.onClick != null && (t.onclick = Yt),
          (t = !0))
        : (t = !1),
      t || rl(e, !0));
  }
  function Kr(e) {
    for (ke = e.return; ke; )
      switch (ke.tag) {
        case 5:
        case 31:
        case 13:
          Tt = !1;
          return;
        case 27:
        case 3:
          Tt = !0;
          return;
        default:
          ke = ke.return;
      }
  }
  function pa(e) {
    if (e !== ke) return !1;
    if (!se) return (Kr(e), (se = !0), !1);
    var t = e.tag,
      l;
    if (
      ((l = t !== 3 && t !== 27) &&
        ((l = t === 5) &&
          ((l = e.type),
          (l =
            !(l !== "form" && l !== "button") || rs(e.type, e.memoizedProps))),
        (l = !l)),
      l && Ee && rl(e),
      Kr(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(o(317));
      Ee = bd(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(o(317));
      Ee = bd(e);
    } else
      t === 27
        ? ((t = Ee), Al(e.type) ? ((e = ms), (ms = null), (Ee = e)) : (Ee = t))
        : (Ee = ke ? Ct(e.stateNode.nextSibling) : null);
    return !0;
  }
  function Gl() {
    ((Ee = ke = null), (se = !1));
  }
  function ku() {
    var e = sl;
    return (
      e !== null &&
        (ut === null ? (ut = e) : ut.push.apply(ut, e), (sl = null)),
      e
    );
  }
  function tn(e) {
    sl === null ? (sl = [e]) : sl.push(e);
  }
  var Ku = f(null),
    Ql = null,
    Vt = null;
  function ol(e, t, l) {
    (w(Ku, t._currentValue), (t._currentValue = l));
  }
  function Zt(e) {
    ((e._currentValue = Ku.current), E(Ku));
  }
  function Ju(e, t, l) {
    for (; e !== null; ) {
      var a = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        e === l)
      )
        break;
      e = e.return;
    }
  }
  function Wu(e, t, l, a) {
    var n = e.child;
    for (n !== null && (n.return = e); n !== null; ) {
      var i = n.dependencies;
      if (i !== null) {
        var c = n.child;
        i = i.firstContext;
        e: for (; i !== null; ) {
          var r = i;
          i = n;
          for (var m = 0; m < t.length; m++)
            if (r.context === t[m]) {
              ((i.lanes |= l),
                (r = i.alternate),
                r !== null && (r.lanes |= l),
                Ju(i.return, l, e),
                a || (c = null));
              break e;
            }
          i = r.next;
        }
      } else if (n.tag === 18) {
        if (((c = n.return), c === null)) throw Error(o(341));
        ((c.lanes |= l),
          (i = c.alternate),
          i !== null && (i.lanes |= l),
          Ju(c, l, e),
          (c = null));
      } else c = n.child;
      if (c !== null) c.return = n;
      else
        for (c = n; c !== null; ) {
          if (c === e) {
            c = null;
            break;
          }
          if (((n = c.sibling), n !== null)) {
            ((n.return = c.return), (c = n));
            break;
          }
          c = c.return;
        }
      n = c;
    }
  }
  function ga(e, t, l, a) {
    e = null;
    for (var n = t, i = !1; n !== null; ) {
      if (!i) {
        if ((n.flags & 524288) !== 0) i = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var c = n.alternate;
        if (c === null) throw Error(o(387));
        if (((c = c.memoizedProps), c !== null)) {
          var r = n.type;
          dt(n.pendingProps.value, c.value) ||
            (e !== null ? e.push(r) : (e = [r]));
        }
      } else if (n === pe.current) {
        if (((c = n.alternate), c === null)) throw Error(o(387));
        c.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
          (e !== null ? e.push(On) : (e = [On]));
      }
      n = n.return;
    }
    (e !== null && Wu(t, e, l, a), (t.flags |= 262144));
  }
  function ii(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!dt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Xl(e) {
    ((Ql = e),
      (Vt = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null));
  }
  function Ke(e) {
    return Jr(Ql, e);
  }
  function ui(e, t) {
    return (Ql === null && Xl(e), Jr(e, t));
  }
  function Jr(e, t) {
    var l = t._currentValue;
    if (((t = { context: t, memoizedValue: l, next: null }), Vt === null)) {
      if (e === null) throw Error(o(308));
      ((Vt = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288));
    } else Vt = Vt.next = t;
    return l;
  }
  var Rm =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (l, a) {
                  e.push(a);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                e.forEach(function (l) {
                  return l();
                }));
            };
          },
    Um = s.unstable_scheduleCallback,
    Dm = s.unstable_NormalPriority,
    He = {
      $$typeof: H,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function $u() {
    return { controller: new Rm(), data: new Map(), refCount: 0 };
  }
  function ln(e) {
    (e.refCount--,
      e.refCount === 0 &&
        Um(Dm, function () {
          e.controller.abort();
        }));
  }
  var an = null,
    Fu = 0,
    va = 0,
    ya = null;
  function wm(e, t) {
    if (an === null) {
      var l = (an = []);
      ((Fu = 0),
        (va = es()),
        (ya = {
          status: "pending",
          value: void 0,
          then: function (a) {
            l.push(a);
          },
        }));
    }
    return (Fu++, t.then(Wr, Wr), t);
  }
  function Wr() {
    if (--Fu === 0 && an !== null) {
      ya !== null && (ya.status = "fulfilled");
      var e = an;
      ((an = null), (va = 0), (ya = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Hm(e, t) {
    var l = [],
      a = {
        status: "pending",
        value: null,
        reason: null,
        then: function (n) {
          l.push(n);
        },
      };
    return (
      e.then(
        function () {
          ((a.status = "fulfilled"), (a.value = t));
          for (var n = 0; n < l.length; n++) (0, l[n])(t);
        },
        function (n) {
          for (a.status = "rejected", a.reason = n, n = 0; n < l.length; n++)
            (0, l[n])(void 0);
        },
      ),
      a
    );
  }
  var $r = O.S;
  O.S = function (e, t) {
    ((wf = rt()),
      typeof t == "object" &&
        t !== null &&
        typeof t.then == "function" &&
        wm(e, t),
      $r !== null && $r(e, t));
  };
  var Vl = f(null);
  function Iu() {
    var e = Vl.current;
    return e !== null ? e : Ae.pooledCache;
  }
  function ci(e, t) {
    t === null ? w(Vl, Vl.current) : w(Vl, t.pool);
  }
  function Fr() {
    var e = Iu();
    return e === null ? null : { parent: He._currentValue, pool: e };
  }
  var xa = Error(o(460)),
    Pu = Error(o(474)),
    si = Error(o(542)),
    ri = { then: function () {} };
  function Ir(e) {
    return ((e = e.status), e === "fulfilled" || e === "rejected");
  }
  function Pr(e, t, l) {
    switch (
      ((l = e[l]),
      l === void 0 ? e.push(t) : l !== t && (t.then(Yt, Yt), (t = l)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), to(e), e);
      default:
        if (typeof t.status == "string") t.then(Yt, Yt);
        else {
          if (((e = Ae), e !== null && 100 < e.shellSuspendCounter))
            throw Error(o(482));
          ((e = t),
            (e.status = "pending"),
            e.then(
              function (a) {
                if (t.status === "pending") {
                  var n = t;
                  ((n.status = "fulfilled"), (n.value = a));
                }
              },
              function (a) {
                if (t.status === "pending") {
                  var n = t;
                  ((n.status = "rejected"), (n.reason = a));
                }
              },
            ));
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), to(e), e);
        }
        throw ((kl = t), xa);
    }
  }
  function Zl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function"
        ? ((kl = l), xa)
        : l;
    }
  }
  var kl = null;
  function eo() {
    if (kl === null) throw Error(o(459));
    var e = kl;
    return ((kl = null), e);
  }
  function to(e) {
    if (e === xa || e === si) throw Error(o(483));
  }
  var ba = null,
    nn = 0;
  function oi(e) {
    var t = nn;
    return ((nn += 1), ba === null && (ba = []), Pr(ba, e, t));
  }
  function un(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function fi(e, t) {
    throw t.$$typeof === Y
      ? Error(o(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          o(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e,
          ),
        ));
  }
  function lo(e) {
    function t(y, g) {
      if (e) {
        var b = y.deletions;
        b === null ? ((y.deletions = [g]), (y.flags |= 16)) : b.push(g);
      }
    }
    function l(y, g) {
      if (!e) return null;
      for (; g !== null; ) (t(y, g), (g = g.sibling));
      return null;
    }
    function a(y) {
      for (var g = new Map(); y !== null; )
        (y.key !== null ? g.set(y.key, y) : g.set(y.index, y), (y = y.sibling));
      return g;
    }
    function n(y, g) {
      return ((y = Qt(y, g)), (y.index = 0), (y.sibling = null), y);
    }
    function i(y, g, b) {
      return (
        (y.index = b),
        e
          ? ((b = y.alternate),
            b !== null
              ? ((b = b.index), b < g ? ((y.flags |= 67108866), g) : b)
              : ((y.flags |= 67108866), g))
          : ((y.flags |= 1048576), g)
      );
    }
    function c(y) {
      return (e && y.alternate === null && (y.flags |= 67108866), y);
    }
    function r(y, g, b, _) {
      return g === null || g.tag !== 6
        ? ((g = Gu(b, y.mode, _)), (g.return = y), g)
        : ((g = n(g, b)), (g.return = y), g);
    }
    function m(y, g, b, _) {
      var X = b.type;
      return X === J
        ? C(y, g, b.props.children, _, b.key)
        : g !== null &&
            (g.elementType === X ||
              (typeof X == "object" &&
                X !== null &&
                X.$$typeof === ze &&
                Zl(X) === g.type))
          ? ((g = n(g, b.props)), un(g, b), (g.return = y), g)
          : ((g = ai(b.type, b.key, b.props, null, y.mode, _)),
            un(g, b),
            (g.return = y),
            g);
    }
    function S(y, g, b, _) {
      return g === null ||
        g.tag !== 4 ||
        g.stateNode.containerInfo !== b.containerInfo ||
        g.stateNode.implementation !== b.implementation
        ? ((g = Qu(b, y.mode, _)), (g.return = y), g)
        : ((g = n(g, b.children || [])), (g.return = y), g);
    }
    function C(y, g, b, _, X) {
      return g === null || g.tag !== 7
        ? ((g = Yl(b, y.mode, _, X)), (g.return = y), g)
        : ((g = n(g, b)), (g.return = y), g);
    }
    function M(y, g, b) {
      if (
        (typeof g == "string" && g !== "") ||
        typeof g == "number" ||
        typeof g == "bigint"
      )
        return ((g = Gu("" + g, y.mode, b)), (g.return = y), g);
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case ee:
            return (
              (b = ai(g.type, g.key, g.props, null, y.mode, b)),
              un(b, g),
              (b.return = y),
              b
            );
          case $:
            return ((g = Qu(g, y.mode, b)), (g.return = y), g);
          case ze:
            return ((g = Zl(g)), M(y, g, b));
        }
        if (Ie(g) || Ve(g))
          return ((g = Yl(g, y.mode, b, null)), (g.return = y), g);
        if (typeof g.then == "function") return M(y, oi(g), b);
        if (g.$$typeof === H) return M(y, ui(y, g), b);
        fi(y, g);
      }
      return null;
    }
    function j(y, g, b, _) {
      var X = g !== null ? g.key : null;
      if (
        (typeof b == "string" && b !== "") ||
        typeof b == "number" ||
        typeof b == "bigint"
      )
        return X !== null ? null : r(y, g, "" + b, _);
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case ee:
            return b.key === X ? m(y, g, b, _) : null;
          case $:
            return b.key === X ? S(y, g, b, _) : null;
          case ze:
            return ((b = Zl(b)), j(y, g, b, _));
        }
        if (Ie(b) || Ve(b)) return X !== null ? null : C(y, g, b, _, null);
        if (typeof b.then == "function") return j(y, g, oi(b), _);
        if (b.$$typeof === H) return j(y, g, ui(y, b), _);
        fi(y, b);
      }
      return null;
    }
    function z(y, g, b, _, X) {
      if (
        (typeof _ == "string" && _ !== "") ||
        typeof _ == "number" ||
        typeof _ == "bigint"
      )
        return ((y = y.get(b) || null), r(g, y, "" + _, X));
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case ee:
            return (
              (y = y.get(_.key === null ? b : _.key) || null),
              m(g, y, _, X)
            );
          case $:
            return (
              (y = y.get(_.key === null ? b : _.key) || null),
              S(g, y, _, X)
            );
          case ze:
            return ((_ = Zl(_)), z(y, g, b, _, X));
        }
        if (Ie(_) || Ve(_))
          return ((y = y.get(b) || null), C(g, y, _, X, null));
        if (typeof _.then == "function") return z(y, g, b, oi(_), X);
        if (_.$$typeof === H) return z(y, g, b, ui(g, _), X);
        fi(g, _);
      }
      return null;
    }
    function q(y, g, b, _) {
      for (
        var X = null, fe = null, G = g, P = (g = 0), ce = null;
        G !== null && P < b.length;
        P++
      ) {
        G.index > P ? ((ce = G), (G = null)) : (ce = G.sibling);
        var de = j(y, G, b[P], _);
        if (de === null) {
          G === null && (G = ce);
          break;
        }
        (e && G && de.alternate === null && t(y, G),
          (g = i(de, g, P)),
          fe === null ? (X = de) : (fe.sibling = de),
          (fe = de),
          (G = ce));
      }
      if (P === b.length) return (l(y, G), se && Xt(y, P), X);
      if (G === null) {
        for (; P < b.length; P++)
          ((G = M(y, b[P], _)),
            G !== null &&
              ((g = i(G, g, P)),
              fe === null ? (X = G) : (fe.sibling = G),
              (fe = G)));
        return (se && Xt(y, P), X);
      }
      for (G = a(G); P < b.length; P++)
        ((ce = z(G, y, P, b[P], _)),
          ce !== null &&
            (e &&
              ce.alternate !== null &&
              G.delete(ce.key === null ? P : ce.key),
            (g = i(ce, g, P)),
            fe === null ? (X = ce) : (fe.sibling = ce),
            (fe = ce)));
      return (
        e &&
          G.forEach(function (Cl) {
            return t(y, Cl);
          }),
        se && Xt(y, P),
        X
      );
    }
    function k(y, g, b, _) {
      if (b == null) throw Error(o(151));
      for (
        var X = null, fe = null, G = g, P = (g = 0), ce = null, de = b.next();
        G !== null && !de.done;
        P++, de = b.next()
      ) {
        G.index > P ? ((ce = G), (G = null)) : (ce = G.sibling);
        var Cl = j(y, G, de.value, _);
        if (Cl === null) {
          G === null && (G = ce);
          break;
        }
        (e && G && Cl.alternate === null && t(y, G),
          (g = i(Cl, g, P)),
          fe === null ? (X = Cl) : (fe.sibling = Cl),
          (fe = Cl),
          (G = ce));
      }
      if (de.done) return (l(y, G), se && Xt(y, P), X);
      if (G === null) {
        for (; !de.done; P++, de = b.next())
          ((de = M(y, de.value, _)),
            de !== null &&
              ((g = i(de, g, P)),
              fe === null ? (X = de) : (fe.sibling = de),
              (fe = de)));
        return (se && Xt(y, P), X);
      }
      for (G = a(G); !de.done; P++, de = b.next())
        ((de = z(G, y, P, de.value, _)),
          de !== null &&
            (e &&
              de.alternate !== null &&
              G.delete(de.key === null ? P : de.key),
            (g = i(de, g, P)),
            fe === null ? (X = de) : (fe.sibling = de),
            (fe = de)));
      return (
        e &&
          G.forEach(function (K0) {
            return t(y, K0);
          }),
        se && Xt(y, P),
        X
      );
    }
    function Se(y, g, b, _) {
      if (
        (typeof b == "object" &&
          b !== null &&
          b.type === J &&
          b.key === null &&
          (b = b.props.children),
        typeof b == "object" && b !== null)
      ) {
        switch (b.$$typeof) {
          case ee:
            e: {
              for (var X = b.key; g !== null; ) {
                if (g.key === X) {
                  if (((X = b.type), X === J)) {
                    if (g.tag === 7) {
                      (l(y, g.sibling),
                        (_ = n(g, b.props.children)),
                        (_.return = y),
                        (y = _));
                      break e;
                    }
                  } else if (
                    g.elementType === X ||
                    (typeof X == "object" &&
                      X !== null &&
                      X.$$typeof === ze &&
                      Zl(X) === g.type)
                  ) {
                    (l(y, g.sibling),
                      (_ = n(g, b.props)),
                      un(_, b),
                      (_.return = y),
                      (y = _));
                    break e;
                  }
                  l(y, g);
                  break;
                } else t(y, g);
                g = g.sibling;
              }
              b.type === J
                ? ((_ = Yl(b.props.children, y.mode, _, b.key)),
                  (_.return = y),
                  (y = _))
                : ((_ = ai(b.type, b.key, b.props, null, y.mode, _)),
                  un(_, b),
                  (_.return = y),
                  (y = _));
            }
            return c(y);
          case $:
            e: {
              for (X = b.key; g !== null; ) {
                if (g.key === X)
                  if (
                    g.tag === 4 &&
                    g.stateNode.containerInfo === b.containerInfo &&
                    g.stateNode.implementation === b.implementation
                  ) {
                    (l(y, g.sibling),
                      (_ = n(g, b.children || [])),
                      (_.return = y),
                      (y = _));
                    break e;
                  } else {
                    l(y, g);
                    break;
                  }
                else t(y, g);
                g = g.sibling;
              }
              ((_ = Qu(b, y.mode, _)), (_.return = y), (y = _));
            }
            return c(y);
          case ze:
            return ((b = Zl(b)), Se(y, g, b, _));
        }
        if (Ie(b)) return q(y, g, b, _);
        if (Ve(b)) {
          if (((X = Ve(b)), typeof X != "function")) throw Error(o(150));
          return ((b = X.call(b)), k(y, g, b, _));
        }
        if (typeof b.then == "function") return Se(y, g, oi(b), _);
        if (b.$$typeof === H) return Se(y, g, ui(y, b), _);
        fi(y, b);
      }
      return (typeof b == "string" && b !== "") ||
        typeof b == "number" ||
        typeof b == "bigint"
        ? ((b = "" + b),
          g !== null && g.tag === 6
            ? (l(y, g.sibling), (_ = n(g, b)), (_.return = y), (y = _))
            : (l(y, g), (_ = Gu(b, y.mode, _)), (_.return = y), (y = _)),
          c(y))
        : l(y, g);
    }
    return function (y, g, b, _) {
      try {
        nn = 0;
        var X = Se(y, g, b, _);
        return ((ba = null), X);
      } catch (G) {
        if (G === xa || G === si) throw G;
        var fe = ht(29, G, null, y.mode);
        return ((fe.lanes = _), (fe.return = y), fe);
      }
    };
  }
  var Kl = lo(!0),
    ao = lo(!1),
    fl = !1;
  function ec(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function tc(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        }));
  }
  function dl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function hl(e, t, l) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (me & 2) !== 0)) {
      var n = a.pending;
      return (
        n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (a.pending = t),
        (t = li(e)),
        Yr(e, null, l),
        t
      );
    }
    return (ti(e, a, t, l), li(e));
  }
  function cn(e, t, l) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (l & 4194048) !== 0))
    ) {
      var a = t.lanes;
      ((a &= e.pendingLanes), (l |= a), (t.lanes = l), Js(e, l));
    }
  }
  function lc(e, t) {
    var l = e.updateQueue,
      a = e.alternate;
    if (a !== null && ((a = a.updateQueue), l === a)) {
      var n = null,
        i = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var c = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null,
          };
          (i === null ? (n = i = c) : (i = i.next = c), (l = l.next));
        } while (l !== null);
        i === null ? (n = i = t) : (i = i.next = t);
      } else n = i = t;
      ((l = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: i,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (e.updateQueue = l));
      return;
    }
    ((e = l.lastBaseUpdate),
      e === null ? (l.firstBaseUpdate = t) : (e.next = t),
      (l.lastBaseUpdate = t));
  }
  var ac = !1;
  function sn() {
    if (ac) {
      var e = ya;
      if (e !== null) throw e;
    }
  }
  function rn(e, t, l, a) {
    ac = !1;
    var n = e.updateQueue;
    fl = !1;
    var i = n.firstBaseUpdate,
      c = n.lastBaseUpdate,
      r = n.shared.pending;
    if (r !== null) {
      n.shared.pending = null;
      var m = r,
        S = m.next;
      ((m.next = null), c === null ? (i = S) : (c.next = S), (c = m));
      var C = e.alternate;
      C !== null &&
        ((C = C.updateQueue),
        (r = C.lastBaseUpdate),
        r !== c &&
          (r === null ? (C.firstBaseUpdate = S) : (r.next = S),
          (C.lastBaseUpdate = m)));
    }
    if (i !== null) {
      var M = n.baseState;
      ((c = 0), (C = S = m = null), (r = i));
      do {
        var j = r.lane & -536870913,
          z = j !== r.lane;
        if (z ? (ue & j) === j : (a & j) === j) {
          (j !== 0 && j === va && (ac = !0),
            C !== null &&
              (C = C.next =
                {
                  lane: 0,
                  tag: r.tag,
                  payload: r.payload,
                  callback: null,
                  next: null,
                }));
          e: {
            var q = e,
              k = r;
            j = t;
            var Se = l;
            switch (k.tag) {
              case 1:
                if (((q = k.payload), typeof q == "function")) {
                  M = q.call(Se, M, j);
                  break e;
                }
                M = q;
                break e;
              case 3:
                q.flags = (q.flags & -65537) | 128;
              case 0:
                if (
                  ((q = k.payload),
                  (j = typeof q == "function" ? q.call(Se, M, j) : q),
                  j == null)
                )
                  break e;
                M = N({}, M, j);
                break e;
              case 2:
                fl = !0;
            }
          }
          ((j = r.callback),
            j !== null &&
              ((e.flags |= 64),
              z && (e.flags |= 8192),
              (z = n.callbacks),
              z === null ? (n.callbacks = [j]) : z.push(j)));
        } else
          ((z = {
            lane: j,
            tag: r.tag,
            payload: r.payload,
            callback: r.callback,
            next: null,
          }),
            C === null ? ((S = C = z), (m = M)) : (C = C.next = z),
            (c |= j));
        if (((r = r.next), r === null)) {
          if (((r = n.shared.pending), r === null)) break;
          ((z = r),
            (r = z.next),
            (z.next = null),
            (n.lastBaseUpdate = z),
            (n.shared.pending = null));
        }
      } while (!0);
      (C === null && (m = M),
        (n.baseState = m),
        (n.firstBaseUpdate = S),
        (n.lastBaseUpdate = C),
        i === null && (n.shared.lanes = 0),
        (yl |= c),
        (e.lanes = c),
        (e.memoizedState = M));
    }
  }
  function no(e, t) {
    if (typeof e != "function") throw Error(o(191, e));
    e.call(t);
  }
  function io(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++) no(l[e], t);
  }
  var Sa = f(null),
    di = f(0);
  function uo(e, t) {
    ((e = el), w(di, e), w(Sa, t), (el = e | t.baseLanes));
  }
  function nc() {
    (w(di, el), w(Sa, Sa.current));
  }
  function ic() {
    ((el = di.current), E(Sa), E(di));
  }
  var mt = f(null),
    Nt = null;
  function ml(e) {
    var t = e.alternate;
    (w(Re, Re.current & 1),
      w(mt, e),
      Nt === null &&
        (t === null || Sa.current !== null || t.memoizedState !== null) &&
        (Nt = e));
  }
  function uc(e) {
    (w(Re, Re.current), w(mt, e), Nt === null && (Nt = e));
  }
  function co(e) {
    e.tag === 22
      ? (w(Re, Re.current), w(mt, e), Nt === null && (Nt = e))
      : pl();
  }
  function pl() {
    (w(Re, Re.current), w(mt, mt.current));
  }
  function pt(e) {
    (E(mt), Nt === e && (Nt = null), E(Re));
  }
  var Re = f(0);
  function hi(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || ds(l) || hs(l)))
          return t;
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === "forwards" ||
          t.memoizedProps.revealOrder === "backwards" ||
          t.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          t.memoizedProps.revealOrder === "together")
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var kt = 0,
    I = null,
    xe = null,
    Be = null,
    mi = !1,
    ja = !1,
    Jl = !1,
    pi = 0,
    on = 0,
    Aa = null,
    Bm = 0;
  function Ce() {
    throw Error(o(321));
  }
  function cc(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!dt(e[l], t[l])) return !1;
    return !0;
  }
  function sc(e, t, l, a, n, i) {
    return (
      (kt = i),
      (I = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (O.H = e === null || e.memoizedState === null ? Zo : Ac),
      (Jl = !1),
      (i = l(a, n)),
      (Jl = !1),
      ja && (i = ro(t, l, a, n)),
      so(e),
      i
    );
  }
  function so(e) {
    O.H = hn;
    var t = xe !== null && xe.next !== null;
    if (((kt = 0), (Be = xe = I = null), (mi = !1), (on = 0), (Aa = null), t))
      throw Error(o(300));
    e === null ||
      Le ||
      ((e = e.dependencies), e !== null && ii(e) && (Le = !0));
  }
  function ro(e, t, l, a) {
    I = e;
    var n = 0;
    do {
      if ((ja && (Aa = null), (on = 0), (ja = !1), 25 <= n))
        throw Error(o(301));
      if (((n += 1), (Be = xe = null), e.updateQueue != null)) {
        var i = e.updateQueue;
        ((i.lastEffect = null),
          (i.events = null),
          (i.stores = null),
          i.memoCache != null && (i.memoCache.index = 0));
      }
      ((O.H = ko), (i = t(l, a)));
    } while (ja);
    return i;
  }
  function Lm() {
    var e = O.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? fn(t) : t),
      (e = e.useState()[0]),
      (xe !== null ? xe.memoizedState : null) !== e && (I.flags |= 1024),
      t
    );
  }
  function rc() {
    var e = pi !== 0;
    return ((pi = 0), e);
  }
  function oc(e, t, l) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l));
  }
  function fc(e) {
    if (mi) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      mi = !1;
    }
    ((kt = 0), (Be = xe = I = null), (ja = !1), (on = pi = 0), (Aa = null));
  }
  function et() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (Be === null ? (I.memoizedState = Be = e) : (Be = Be.next = e), Be);
  }
  function Ue() {
    if (xe === null) {
      var e = I.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = xe.next;
    var t = Be === null ? I.memoizedState : Be.next;
    if (t !== null) ((Be = t), (xe = e));
    else {
      if (e === null)
        throw I.alternate === null ? Error(o(467)) : Error(o(310));
      ((xe = e),
        (e = {
          memoizedState: xe.memoizedState,
          baseState: xe.baseState,
          baseQueue: xe.baseQueue,
          queue: xe.queue,
          next: null,
        }),
        Be === null ? (I.memoizedState = Be = e) : (Be = Be.next = e));
    }
    return Be;
  }
  function gi() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function fn(e) {
    var t = on;
    return (
      (on += 1),
      Aa === null && (Aa = []),
      (e = Pr(Aa, e, t)),
      (t = I),
      (Be === null ? t.memoizedState : Be.next) === null &&
        ((t = t.alternate),
        (O.H = t === null || t.memoizedState === null ? Zo : Ac)),
      e
    );
  }
  function vi(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return fn(e);
      if (e.$$typeof === H) return Ke(e);
    }
    throw Error(o(438, String(e)));
  }
  function dc(e) {
    var t = null,
      l = I.updateQueue;
    if ((l !== null && (t = l.memoCache), t == null)) {
      var a = I.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (t = {
              data: a.data.map(function (n) {
                return n.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      l === null && ((l = gi()), (I.updateQueue = l)),
      (l.memoCache = t),
      (l = t.data[t.index]),
      l === void 0)
    )
      for (l = t.data[t.index] = Array(e), a = 0; a < e; a++) l[a] = $e;
    return (t.index++, l);
  }
  function Kt(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function yi(e) {
    var t = Ue();
    return hc(t, xe, e);
  }
  function hc(e, t, l) {
    var a = e.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = l;
    var n = e.baseQueue,
      i = a.pending;
    if (i !== null) {
      if (n !== null) {
        var c = n.next;
        ((n.next = i.next), (i.next = c));
      }
      ((t.baseQueue = n = i), (a.pending = null));
    }
    if (((i = e.baseState), n === null)) e.memoizedState = i;
    else {
      t = n.next;
      var r = (c = null),
        m = null,
        S = t,
        C = !1;
      do {
        var M = S.lane & -536870913;
        if (M !== S.lane ? (ue & M) === M : (kt & M) === M) {
          var j = S.revertLane;
          if (j === 0)
            (m !== null &&
              (m = m.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: S.action,
                  hasEagerState: S.hasEagerState,
                  eagerState: S.eagerState,
                  next: null,
                }),
              M === va && (C = !0));
          else if ((kt & j) === j) {
            ((S = S.next), j === va && (C = !0));
            continue;
          } else
            ((M = {
              lane: 0,
              revertLane: S.revertLane,
              gesture: null,
              action: S.action,
              hasEagerState: S.hasEagerState,
              eagerState: S.eagerState,
              next: null,
            }),
              m === null ? ((r = m = M), (c = i)) : (m = m.next = M),
              (I.lanes |= j),
              (yl |= j));
          ((M = S.action),
            Jl && l(i, M),
            (i = S.hasEagerState ? S.eagerState : l(i, M)));
        } else
          ((j = {
            lane: M,
            revertLane: S.revertLane,
            gesture: S.gesture,
            action: S.action,
            hasEagerState: S.hasEagerState,
            eagerState: S.eagerState,
            next: null,
          }),
            m === null ? ((r = m = j), (c = i)) : (m = m.next = j),
            (I.lanes |= M),
            (yl |= M));
        S = S.next;
      } while (S !== null && S !== t);
      if (
        (m === null ? (c = i) : (m.next = r),
        !dt(i, e.memoizedState) && ((Le = !0), C && ((l = ya), l !== null)))
      )
        throw l;
      ((e.memoizedState = i),
        (e.baseState = c),
        (e.baseQueue = m),
        (a.lastRenderedState = i));
    }
    return (n === null && (a.lanes = 0), [e.memoizedState, a.dispatch]);
  }
  function mc(e) {
    var t = Ue(),
      l = t.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = e;
    var a = l.dispatch,
      n = l.pending,
      i = t.memoizedState;
    if (n !== null) {
      l.pending = null;
      var c = (n = n.next);
      do ((i = e(i, c.action)), (c = c.next));
      while (c !== n);
      (dt(i, t.memoizedState) || (Le = !0),
        (t.memoizedState = i),
        t.baseQueue === null && (t.baseState = i),
        (l.lastRenderedState = i));
    }
    return [i, a];
  }
  function oo(e, t, l) {
    var a = I,
      n = Ue(),
      i = se;
    if (i) {
      if (l === void 0) throw Error(o(407));
      l = l();
    } else l = t();
    var c = !dt((xe || n).memoizedState, l);
    if (
      (c && ((n.memoizedState = l), (Le = !0)),
      (n = n.queue),
      vc(mo.bind(null, a, n, e), [e]),
      n.getSnapshot !== t || c || (Be !== null && Be.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        za(9, { destroy: void 0 }, ho.bind(null, a, n, l, t), null),
        Ae === null)
      )
        throw Error(o(349));
      i || (kt & 127) !== 0 || fo(a, t, l);
    }
    return l;
  }
  function fo(e, t, l) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: l }),
      (t = I.updateQueue),
      t === null
        ? ((t = gi()), (I.updateQueue = t), (t.stores = [e]))
        : ((l = t.stores), l === null ? (t.stores = [e]) : l.push(e)));
  }
  function ho(e, t, l, a) {
    ((t.value = l), (t.getSnapshot = a), po(t) && go(e));
  }
  function mo(e, t, l) {
    return l(function () {
      po(t) && go(e);
    });
  }
  function po(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !dt(e, l);
    } catch {
      return !0;
    }
  }
  function go(e) {
    var t = ql(e, 2);
    t !== null && ct(t, e, 2);
  }
  function pc(e) {
    var t = et();
    if (typeof e == "function") {
      var l = e;
      if (((e = l()), Jl)) {
        nl(!0);
        try {
          l();
        } finally {
          nl(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Kt,
        lastRenderedState: e,
      }),
      t
    );
  }
  function vo(e, t, l, a) {
    return ((e.baseState = l), hc(e, xe, typeof a == "function" ? a : Kt));
  }
  function qm(e, t, l, a, n) {
    if (Si(e)) throw Error(o(485));
    if (((e = t.action), e !== null)) {
      var i = {
        payload: n,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (c) {
          i.listeners.push(c);
        },
      };
      (O.T !== null ? l(!0) : (i.isTransition = !1),
        a(i),
        (l = t.pending),
        l === null
          ? ((i.next = t.pending = i), yo(t, i))
          : ((i.next = l.next), (t.pending = l.next = i)));
    }
  }
  function yo(e, t) {
    var l = t.action,
      a = t.payload,
      n = e.state;
    if (t.isTransition) {
      var i = O.T,
        c = {};
      O.T = c;
      try {
        var r = l(n, a),
          m = O.S;
        (m !== null && m(c, r), xo(e, t, r));
      } catch (S) {
        gc(e, t, S);
      } finally {
        (i !== null && c.types !== null && (i.types = c.types), (O.T = i));
      }
    } else
      try {
        ((i = l(n, a)), xo(e, t, i));
      } catch (S) {
        gc(e, t, S);
      }
  }
  function xo(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function"
      ? l.then(
          function (a) {
            bo(e, t, a);
          },
          function (a) {
            return gc(e, t, a);
          },
        )
      : bo(e, t, l);
  }
  function bo(e, t, l) {
    ((t.status = "fulfilled"),
      (t.value = l),
      So(t),
      (e.state = l),
      (t = e.pending),
      t !== null &&
        ((l = t.next),
        l === t ? (e.pending = null) : ((l = l.next), (t.next = l), yo(e, l))));
  }
  function gc(e, t, l) {
    var a = e.pending;
    if (((e.pending = null), a !== null)) {
      a = a.next;
      do ((t.status = "rejected"), (t.reason = l), So(t), (t = t.next));
      while (t !== a);
    }
    e.action = null;
  }
  function So(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function jo(e, t) {
    return t;
  }
  function Ao(e, t) {
    if (se) {
      var l = Ae.formState;
      if (l !== null) {
        e: {
          var a = I;
          if (se) {
            if (Ee) {
              t: {
                for (var n = Ee, i = Tt; n.nodeType !== 8; ) {
                  if (!i) {
                    n = null;
                    break t;
                  }
                  if (((n = Ct(n.nextSibling)), n === null)) {
                    n = null;
                    break t;
                  }
                }
                ((i = n.data), (n = i === "F!" || i === "F" ? n : null));
              }
              if (n) {
                ((Ee = Ct(n.nextSibling)), (a = n.data === "F!"));
                break e;
              }
            }
            rl(a);
          }
          a = !1;
        }
        a && (t = l[0]);
      }
    }
    return (
      (l = et()),
      (l.memoizedState = l.baseState = t),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: jo,
        lastRenderedState: t,
      }),
      (l.queue = a),
      (l = Qo.bind(null, I, a)),
      (a.dispatch = l),
      (a = pc(!1)),
      (i = jc.bind(null, I, !1, a.queue)),
      (a = et()),
      (n = { state: t, dispatch: null, action: e, pending: null }),
      (a.queue = n),
      (l = qm.bind(null, I, n, i, l)),
      (n.dispatch = l),
      (a.memoizedState = e),
      [t, l, !1]
    );
  }
  function zo(e) {
    var t = Ue();
    return Eo(t, xe, e);
  }
  function Eo(e, t, l) {
    if (
      ((t = hc(e, t, jo)[0]),
      (e = yi(Kt)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var a = fn(t);
      } catch (c) {
        throw c === xa ? si : c;
      }
    else a = t;
    t = Ue();
    var n = t.queue,
      i = n.dispatch;
    return (
      l !== t.memoizedState &&
        ((I.flags |= 2048),
        za(9, { destroy: void 0 }, Ym.bind(null, n, l), null)),
      [a, i, e]
    );
  }
  function Ym(e, t) {
    e.action = t;
  }
  function To(e) {
    var t = Ue(),
      l = xe;
    if (l !== null) return Eo(t, l, e);
    (Ue(), (t = t.memoizedState), (l = Ue()));
    var a = l.queue.dispatch;
    return ((l.memoizedState = e), [t, a, !1]);
  }
  function za(e, t, l, a) {
    return (
      (e = { tag: e, create: l, deps: a, inst: t, next: null }),
      (t = I.updateQueue),
      t === null && ((t = gi()), (I.updateQueue = t)),
      (l = t.lastEffect),
      l === null
        ? (t.lastEffect = e.next = e)
        : ((a = l.next), (l.next = e), (e.next = a), (t.lastEffect = e)),
      e
    );
  }
  function No() {
    return Ue().memoizedState;
  }
  function xi(e, t, l, a) {
    var n = et();
    ((I.flags |= e),
      (n.memoizedState = za(
        1 | t,
        { destroy: void 0 },
        l,
        a === void 0 ? null : a,
      )));
  }
  function bi(e, t, l, a) {
    var n = Ue();
    a = a === void 0 ? null : a;
    var i = n.memoizedState.inst;
    xe !== null && a !== null && cc(a, xe.memoizedState.deps)
      ? (n.memoizedState = za(t, i, l, a))
      : ((I.flags |= e), (n.memoizedState = za(1 | t, i, l, a)));
  }
  function Co(e, t) {
    xi(8390656, 8, e, t);
  }
  function vc(e, t) {
    bi(2048, 8, e, t);
  }
  function Gm(e) {
    I.flags |= 4;
    var t = I.updateQueue;
    if (t === null) ((t = gi()), (I.updateQueue = t), (t.events = [e]));
    else {
      var l = t.events;
      l === null ? (t.events = [e]) : l.push(e);
    }
  }
  function Oo(e) {
    var t = Ue().memoizedState;
    return (
      Gm({ ref: t, nextImpl: e }),
      function () {
        if ((me & 2) !== 0) throw Error(o(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function _o(e, t) {
    return bi(4, 2, e, t);
  }
  function Mo(e, t) {
    return bi(4, 4, e, t);
  }
  function Ro(e, t) {
    if (typeof t == "function") {
      e = e();
      var l = t(e);
      return function () {
        typeof l == "function" ? l() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function Uo(e, t, l) {
    ((l = l != null ? l.concat([e]) : null), bi(4, 4, Ro.bind(null, t, e), l));
  }
  function yc() {}
  function Do(e, t) {
    var l = Ue();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    return t !== null && cc(t, a[1]) ? a[0] : ((l.memoizedState = [e, t]), e);
  }
  function wo(e, t) {
    var l = Ue();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    if (t !== null && cc(t, a[1])) return a[0];
    if (((a = e()), Jl)) {
      nl(!0);
      try {
        e();
      } finally {
        nl(!1);
      }
    }
    return ((l.memoizedState = [a, t]), a);
  }
  function xc(e, t, l) {
    return l === void 0 || ((kt & 1073741824) !== 0 && (ue & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = l), (e = Bf()), (I.lanes |= e), (yl |= e), l);
  }
  function Ho(e, t, l, a) {
    return dt(l, t)
      ? l
      : Sa.current !== null
        ? ((e = xc(e, l, a)), dt(e, t) || (Le = !0), e)
        : (kt & 42) === 0 || ((kt & 1073741824) !== 0 && (ue & 261930) === 0)
          ? ((Le = !0), (e.memoizedState = l))
          : ((e = Bf()), (I.lanes |= e), (yl |= e), t);
  }
  function Bo(e, t, l, a, n) {
    var i = B.p;
    B.p = i !== 0 && 8 > i ? i : 8;
    var c = O.T,
      r = {};
    ((O.T = r), jc(e, !1, t, l));
    try {
      var m = n(),
        S = O.S;
      if (
        (S !== null && S(r, m),
        m !== null && typeof m == "object" && typeof m.then == "function")
      ) {
        var C = Hm(m, a);
        dn(e, t, C, yt(e));
      } else dn(e, t, a, yt(e));
    } catch (M) {
      dn(e, t, { then: function () {}, status: "rejected", reason: M }, yt());
    } finally {
      ((B.p = i),
        c !== null && r.types !== null && (c.types = r.types),
        (O.T = c));
    }
  }
  function Qm() {}
  function bc(e, t, l, a) {
    if (e.tag !== 5) throw Error(o(476));
    var n = Lo(e).queue;
    Bo(
      e,
      n,
      t,
      K,
      l === null
        ? Qm
        : function () {
            return (qo(e), l(a));
          },
    );
  }
  function Lo(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: K,
      baseState: K,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Kt,
        lastRenderedState: K,
      },
      next: null,
    };
    var l = {};
    return (
      (t.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Kt,
          lastRenderedState: l,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function qo(e) {
    var t = Lo(e);
    (t.next === null && (t = e.alternate.memoizedState),
      dn(e, t.next.queue, {}, yt()));
  }
  function Sc() {
    return Ke(On);
  }
  function Yo() {
    return Ue().memoizedState;
  }
  function Go() {
    return Ue().memoizedState;
  }
  function Xm(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = yt();
          e = dl(l);
          var a = hl(t, e, l);
          (a !== null && (ct(a, t, l), cn(a, t, l)),
            (t = { cache: $u() }),
            (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function Vm(e, t, l) {
    var a = yt();
    ((l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Si(e)
        ? Xo(t, l)
        : ((l = qu(e, t, l, a)), l !== null && (ct(l, e, a), Vo(l, t, a))));
  }
  function Qo(e, t, l) {
    var a = yt();
    dn(e, t, l, a);
  }
  function dn(e, t, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Si(e)) Xo(t, n);
    else {
      var i = e.alternate;
      if (
        e.lanes === 0 &&
        (i === null || i.lanes === 0) &&
        ((i = t.lastRenderedReducer), i !== null)
      )
        try {
          var c = t.lastRenderedState,
            r = i(c, l);
          if (((n.hasEagerState = !0), (n.eagerState = r), dt(r, c)))
            return (ti(e, t, n, 0), Ae === null && ei(), !1);
        } catch {}
      if (((l = qu(e, t, n, a)), l !== null))
        return (ct(l, e, a), Vo(l, t, a), !0);
    }
    return !1;
  }
  function jc(e, t, l, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: es(),
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Si(e))
    ) {
      if (t) throw Error(o(479));
    } else ((t = qu(e, l, a, 2)), t !== null && ct(t, e, 2));
  }
  function Si(e) {
    var t = e.alternate;
    return e === I || (t !== null && t === I);
  }
  function Xo(e, t) {
    ja = mi = !0;
    var l = e.pending;
    (l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (e.pending = t));
  }
  function Vo(e, t, l) {
    if ((l & 4194048) !== 0) {
      var a = t.lanes;
      ((a &= e.pendingLanes), (l |= a), (t.lanes = l), Js(e, l));
    }
  }
  var hn = {
    readContext: Ke,
    use: vi,
    useCallback: Ce,
    useContext: Ce,
    useEffect: Ce,
    useImperativeHandle: Ce,
    useLayoutEffect: Ce,
    useInsertionEffect: Ce,
    useMemo: Ce,
    useReducer: Ce,
    useRef: Ce,
    useState: Ce,
    useDebugValue: Ce,
    useDeferredValue: Ce,
    useTransition: Ce,
    useSyncExternalStore: Ce,
    useId: Ce,
    useHostTransitionStatus: Ce,
    useFormState: Ce,
    useActionState: Ce,
    useOptimistic: Ce,
    useMemoCache: Ce,
    useCacheRefresh: Ce,
  };
  hn.useEffectEvent = Ce;
  var Zo = {
      readContext: Ke,
      use: vi,
      useCallback: function (e, t) {
        return ((et().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: Ke,
      useEffect: Co,
      useImperativeHandle: function (e, t, l) {
        ((l = l != null ? l.concat([e]) : null),
          xi(4194308, 4, Ro.bind(null, t, e), l));
      },
      useLayoutEffect: function (e, t) {
        return xi(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        xi(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var l = et();
        t = t === void 0 ? null : t;
        var a = e();
        if (Jl) {
          nl(!0);
          try {
            e();
          } finally {
            nl(!1);
          }
        }
        return ((l.memoizedState = [a, t]), a);
      },
      useReducer: function (e, t, l) {
        var a = et();
        if (l !== void 0) {
          var n = l(t);
          if (Jl) {
            nl(!0);
            try {
              l(t);
            } finally {
              nl(!1);
            }
          }
        } else n = t;
        return (
          (a.memoizedState = a.baseState = n),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: n,
          }),
          (a.queue = e),
          (e = e.dispatch = Vm.bind(null, I, e)),
          [a.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = et();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = pc(e);
        var t = e.queue,
          l = Qo.bind(null, I, t);
        return ((t.dispatch = l), [e.memoizedState, l]);
      },
      useDebugValue: yc,
      useDeferredValue: function (e, t) {
        var l = et();
        return xc(l, e, t);
      },
      useTransition: function () {
        var e = pc(!1);
        return (
          (e = Bo.bind(null, I, e.queue, !0, !1)),
          (et().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, l) {
        var a = I,
          n = et();
        if (se) {
          if (l === void 0) throw Error(o(407));
          l = l();
        } else {
          if (((l = t()), Ae === null)) throw Error(o(349));
          (ue & 127) !== 0 || fo(a, t, l);
        }
        n.memoizedState = l;
        var i = { value: l, getSnapshot: t };
        return (
          (n.queue = i),
          Co(mo.bind(null, a, i, e), [e]),
          (a.flags |= 2048),
          za(9, { destroy: void 0 }, ho.bind(null, a, i, l, t), null),
          l
        );
      },
      useId: function () {
        var e = et(),
          t = Ae.identifierPrefix;
        if (se) {
          var l = Dt,
            a = Ut;
          ((l = (a & ~(1 << (32 - ft(a) - 1))).toString(32) + l),
            (t = "_" + t + "R_" + l),
            (l = pi++),
            0 < l && (t += "H" + l.toString(32)),
            (t += "_"));
        } else ((l = Bm++), (t = "_" + t + "r_" + l.toString(32) + "_"));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Sc,
      useFormState: Ao,
      useActionState: Ao,
      useOptimistic: function (e) {
        var t = et();
        t.memoizedState = t.baseState = e;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = l),
          (t = jc.bind(null, I, !0, l)),
          (l.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: dc,
      useCacheRefresh: function () {
        return (et().memoizedState = Xm.bind(null, I));
      },
      useEffectEvent: function (e) {
        var t = et(),
          l = { impl: e };
        return (
          (t.memoizedState = l),
          function () {
            if ((me & 2) !== 0) throw Error(o(440));
            return l.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Ac = {
      readContext: Ke,
      use: vi,
      useCallback: Do,
      useContext: Ke,
      useEffect: vc,
      useImperativeHandle: Uo,
      useInsertionEffect: _o,
      useLayoutEffect: Mo,
      useMemo: wo,
      useReducer: yi,
      useRef: No,
      useState: function () {
        return yi(Kt);
      },
      useDebugValue: yc,
      useDeferredValue: function (e, t) {
        var l = Ue();
        return Ho(l, xe.memoizedState, e, t);
      },
      useTransition: function () {
        var e = yi(Kt)[0],
          t = Ue().memoizedState;
        return [typeof e == "boolean" ? e : fn(e), t];
      },
      useSyncExternalStore: oo,
      useId: Yo,
      useHostTransitionStatus: Sc,
      useFormState: zo,
      useActionState: zo,
      useOptimistic: function (e, t) {
        var l = Ue();
        return vo(l, xe, e, t);
      },
      useMemoCache: dc,
      useCacheRefresh: Go,
    };
  Ac.useEffectEvent = Oo;
  var ko = {
    readContext: Ke,
    use: vi,
    useCallback: Do,
    useContext: Ke,
    useEffect: vc,
    useImperativeHandle: Uo,
    useInsertionEffect: _o,
    useLayoutEffect: Mo,
    useMemo: wo,
    useReducer: mc,
    useRef: No,
    useState: function () {
      return mc(Kt);
    },
    useDebugValue: yc,
    useDeferredValue: function (e, t) {
      var l = Ue();
      return xe === null ? xc(l, e, t) : Ho(l, xe.memoizedState, e, t);
    },
    useTransition: function () {
      var e = mc(Kt)[0],
        t = Ue().memoizedState;
      return [typeof e == "boolean" ? e : fn(e), t];
    },
    useSyncExternalStore: oo,
    useId: Yo,
    useHostTransitionStatus: Sc,
    useFormState: To,
    useActionState: To,
    useOptimistic: function (e, t) {
      var l = Ue();
      return xe !== null
        ? vo(l, xe, e, t)
        : ((l.baseState = e), [e, l.queue.dispatch]);
    },
    useMemoCache: dc,
    useCacheRefresh: Go,
  };
  ko.useEffectEvent = Oo;
  function zc(e, t, l, a) {
    ((t = e.memoizedState),
      (l = l(a, t)),
      (l = l == null ? t : N({}, t, l)),
      (e.memoizedState = l),
      e.lanes === 0 && (e.updateQueue.baseState = l));
  }
  var Ec = {
    enqueueSetState: function (e, t, l) {
      e = e._reactInternals;
      var a = yt(),
        n = dl(a);
      ((n.payload = t),
        l != null && (n.callback = l),
        (t = hl(e, n, a)),
        t !== null && (ct(t, e, a), cn(t, e, a)));
    },
    enqueueReplaceState: function (e, t, l) {
      e = e._reactInternals;
      var a = yt(),
        n = dl(a);
      ((n.tag = 1),
        (n.payload = t),
        l != null && (n.callback = l),
        (t = hl(e, n, a)),
        t !== null && (ct(t, e, a), cn(t, e, a)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var l = yt(),
        a = dl(l);
      ((a.tag = 2),
        t != null && (a.callback = t),
        (t = hl(e, a, l)),
        t !== null && (ct(t, e, l), cn(t, e, l)));
    },
  };
  function Ko(e, t, l, a, n, i, c) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(a, i, c)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Ia(l, a) || !Ia(n, i)
          : !0
    );
  }
  function Jo(e, t, l, a) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(l, a),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(l, a),
      t.state !== e && Ec.enqueueReplaceState(t, t.state, null));
  }
  function Wl(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var a in t) a !== "ref" && (l[a] = t[a]);
    }
    if ((e = e.defaultProps)) {
      l === t && (l = N({}, l));
      for (var n in e) l[n] === void 0 && (l[n] = e[n]);
    }
    return l;
  }
  function Wo(e) {
    Pn(e);
  }
  function $o(e) {
    console.error(e);
  }
  function Fo(e) {
    Pn(e);
  }
  function ji(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function Io(e, t, l) {
    try {
      var a = e.onCaughtError;
      a(l.value, {
        componentStack: l.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function Tc(e, t, l) {
    return (
      (l = dl(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        ji(e, t);
      }),
      l
    );
  }
  function Po(e) {
    return ((e = dl(e)), (e.tag = 3), e);
  }
  function ef(e, t, l, a) {
    var n = l.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var i = a.value;
      ((e.payload = function () {
        return n(i);
      }),
        (e.callback = function () {
          Io(t, l, a);
        }));
    }
    var c = l.stateNode;
    c !== null &&
      typeof c.componentDidCatch == "function" &&
      (e.callback = function () {
        (Io(t, l, a),
          typeof n != "function" &&
            (xl === null ? (xl = new Set([this])) : xl.add(this)));
        var r = a.stack;
        this.componentDidCatch(a.value, {
          componentStack: r !== null ? r : "",
        });
      });
  }
  function Zm(e, t, l, a, n) {
    if (
      ((l.flags |= 32768),
      a !== null && typeof a == "object" && typeof a.then == "function")
    ) {
      if (
        ((t = l.alternate),
        t !== null && ga(t, l, n, !0),
        (l = mt.current),
        l !== null)
      ) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              Nt === null ? Di() : l.alternate === null && Oe === 0 && (Oe = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = n),
              a === ri
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null ? (l.updateQueue = new Set([a])) : t.add(a),
                  Fc(e, a, n)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              a === ri
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a]),
                      }),
                      (l.updateQueue = t))
                    : ((l = t.retryQueue),
                      l === null ? (t.retryQueue = new Set([a])) : l.add(a)),
                  Fc(e, a, n)),
              !1
            );
        }
        throw Error(o(435, l.tag));
      }
      return (Fc(e, a, n), Di(), !1);
    }
    if (se)
      return (
        (t = mt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = n),
            a !== Zu && ((e = Error(o(422), { cause: a })), tn(At(e, l))))
          : (a !== Zu && ((t = Error(o(423), { cause: a })), tn(At(t, l))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (n &= -n),
            (e.lanes |= n),
            (a = At(a, l)),
            (n = Tc(e.stateNode, a, n)),
            lc(e, n),
            Oe !== 4 && (Oe = 2)),
        !1
      );
    var i = Error(o(520), { cause: a });
    if (
      ((i = At(i, l)),
      Sn === null ? (Sn = [i]) : Sn.push(i),
      Oe !== 4 && (Oe = 2),
      t === null)
    )
      return !0;
    ((a = At(a, l)), (l = t));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (e = n & -n),
            (l.lanes |= e),
            (e = Tc(l.stateNode, a, e)),
            lc(l, e),
            !1
          );
        case 1:
          if (
            ((t = l.type),
            (i = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (i !== null &&
                  typeof i.componentDidCatch == "function" &&
                  (xl === null || !xl.has(i)))))
          )
            return (
              (l.flags |= 65536),
              (n &= -n),
              (l.lanes |= n),
              (n = Po(n)),
              ef(n, e, l, a),
              lc(l, n),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Nc = Error(o(461)),
    Le = !1;
  function Je(e, t, l, a) {
    t.child = e === null ? ao(t, null, l, a) : Kl(t, e.child, l, a);
  }
  function tf(e, t, l, a, n) {
    l = l.render;
    var i = t.ref;
    if ("ref" in a) {
      var c = {};
      for (var r in a) r !== "ref" && (c[r] = a[r]);
    } else c = a;
    return (
      Xl(t),
      (a = sc(e, t, l, c, i, n)),
      (r = rc()),
      e !== null && !Le
        ? (oc(e, t, n), Jt(e, t, n))
        : (se && r && Xu(t), (t.flags |= 1), Je(e, t, a, n), t.child)
    );
  }
  function lf(e, t, l, a, n) {
    if (e === null) {
      var i = l.type;
      return typeof i == "function" &&
        !Yu(i) &&
        i.defaultProps === void 0 &&
        l.compare === null
        ? ((t.tag = 15), (t.type = i), af(e, t, i, a, n))
        : ((e = ai(l.type, null, a, t, t.mode, n)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((i = e.child), !wc(e, n))) {
      var c = i.memoizedProps;
      if (
        ((l = l.compare), (l = l !== null ? l : Ia), l(c, a) && e.ref === t.ref)
      )
        return Jt(e, t, n);
    }
    return (
      (t.flags |= 1),
      (e = Qt(i, a)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function af(e, t, l, a, n) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (Ia(i, a) && e.ref === t.ref)
        if (((Le = !1), (t.pendingProps = a = i), wc(e, n)))
          (e.flags & 131072) !== 0 && (Le = !0);
        else return ((t.lanes = e.lanes), Jt(e, t, n));
    }
    return Cc(e, t, l, a, n);
  }
  function nf(e, t, l, a) {
    var n = a.children,
      i = e !== null ? e.memoizedState : null;
    if (
      (e === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      a.mode === "hidden")
    ) {
      if ((t.flags & 128) !== 0) {
        if (((i = i !== null ? i.baseLanes | l : l), e !== null)) {
          for (a = t.child = e.child, n = 0; a !== null; )
            ((n = n | a.lanes | a.childLanes), (a = a.sibling));
          a = n & ~i;
        } else ((a = 0), (t.child = null));
        return uf(e, t, i, l, a);
      }
      if ((l & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && ci(t, i !== null ? i.cachePool : null),
          i !== null ? uo(t, i) : nc(),
          co(t));
      else
        return (
          (a = t.lanes = 536870912),
          uf(e, t, i !== null ? i.baseLanes | l : l, l, a)
        );
    } else
      i !== null
        ? (ci(t, i.cachePool), uo(t, i), pl(), (t.memoizedState = null))
        : (e !== null && ci(t, null), nc(), pl());
    return (Je(e, t, n, l), t.child);
  }
  function mn(e, t) {
    return (
      (e !== null && e.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      t.sibling
    );
  }
  function uf(e, t, l, a, n) {
    var i = Iu();
    return (
      (i = i === null ? null : { parent: He._currentValue, pool: i }),
      (t.memoizedState = { baseLanes: l, cachePool: i }),
      e !== null && ci(t, null),
      nc(),
      co(t),
      e !== null && ga(e, t, a, !0),
      (t.childLanes = n),
      null
    );
  }
  function Ai(e, t) {
    return (
      (t = Ei({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function cf(e, t, l) {
    return (
      Kl(t, e.child, null, l),
      (e = Ai(t, t.pendingProps)),
      (e.flags |= 2),
      pt(t),
      (t.memoizedState = null),
      e
    );
  }
  function km(e, t, l) {
    var a = t.pendingProps,
      n = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (se) {
        if (a.mode === "hidden")
          return ((e = Ai(t, a)), (t.lanes = 536870912), mn(null, e));
        if (
          (uc(t),
          (e = Ee)
            ? ((e = xd(e, Tt)),
              (e = e !== null && e.data === "&" ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: cl !== null ? { id: Ut, overflow: Dt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Qr(e)),
                (l.return = t),
                (t.child = l),
                (ke = t),
                (Ee = null)))
            : (e = null),
          e === null)
        )
          throw rl(t);
        return ((t.lanes = 536870912), null);
      }
      return Ai(t, a);
    }
    var i = e.memoizedState;
    if (i !== null) {
      var c = i.dehydrated;
      if ((uc(t), n))
        if (t.flags & 256) ((t.flags &= -257), (t = cf(e, t, l)));
        else if (t.memoizedState !== null)
          ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(o(558));
      else if (
        (Le || ga(e, t, l, !1), (n = (l & e.childLanes) !== 0), Le || n)
      ) {
        if (
          ((a = Ae),
          a !== null && ((c = Ws(a, l)), c !== 0 && c !== i.retryLane))
        )
          throw ((i.retryLane = c), ql(e, c), ct(a, e, c), Nc);
        (Di(), (t = cf(e, t, l)));
      } else
        ((e = i.treeContext),
          (Ee = Ct(c.nextSibling)),
          (ke = t),
          (se = !0),
          (sl = null),
          (Tt = !1),
          e !== null && Zr(t, e),
          (t = Ai(t, a)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = Qt(e.child, { mode: a.mode, children: a.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function zi(e, t) {
    var l = t.ref;
    if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object") throw Error(o(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function Cc(e, t, l, a, n) {
    return (
      Xl(t),
      (l = sc(e, t, l, a, void 0, n)),
      (a = rc()),
      e !== null && !Le
        ? (oc(e, t, n), Jt(e, t, n))
        : (se && a && Xu(t), (t.flags |= 1), Je(e, t, l, n), t.child)
    );
  }
  function sf(e, t, l, a, n, i) {
    return (
      Xl(t),
      (t.updateQueue = null),
      (l = ro(t, a, l, n)),
      so(e),
      (a = rc()),
      e !== null && !Le
        ? (oc(e, t, i), Jt(e, t, i))
        : (se && a && Xu(t), (t.flags |= 1), Je(e, t, l, i), t.child)
    );
  }
  function rf(e, t, l, a, n) {
    if ((Xl(t), t.stateNode === null)) {
      var i = da,
        c = l.contextType;
      (typeof c == "object" && c !== null && (i = Ke(c)),
        (i = new l(a, i)),
        (t.memoizedState =
          i.state !== null && i.state !== void 0 ? i.state : null),
        (i.updater = Ec),
        (t.stateNode = i),
        (i._reactInternals = t),
        (i = t.stateNode),
        (i.props = a),
        (i.state = t.memoizedState),
        (i.refs = {}),
        ec(t),
        (c = l.contextType),
        (i.context = typeof c == "object" && c !== null ? Ke(c) : da),
        (i.state = t.memoizedState),
        (c = l.getDerivedStateFromProps),
        typeof c == "function" && (zc(t, l, c, a), (i.state = t.memoizedState)),
        typeof l.getDerivedStateFromProps == "function" ||
          typeof i.getSnapshotBeforeUpdate == "function" ||
          (typeof i.UNSAFE_componentWillMount != "function" &&
            typeof i.componentWillMount != "function") ||
          ((c = i.state),
          typeof i.componentWillMount == "function" && i.componentWillMount(),
          typeof i.UNSAFE_componentWillMount == "function" &&
            i.UNSAFE_componentWillMount(),
          c !== i.state && Ec.enqueueReplaceState(i, i.state, null),
          rn(t, a, i, n),
          sn(),
          (i.state = t.memoizedState)),
        typeof i.componentDidMount == "function" && (t.flags |= 4194308),
        (a = !0));
    } else if (e === null) {
      i = t.stateNode;
      var r = t.memoizedProps,
        m = Wl(l, r);
      i.props = m;
      var S = i.context,
        C = l.contextType;
      ((c = da), typeof C == "object" && C !== null && (c = Ke(C)));
      var M = l.getDerivedStateFromProps;
      ((C =
        typeof M == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function"),
        (r = t.pendingProps !== r),
        C ||
          (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
            typeof i.componentWillReceiveProps != "function") ||
          ((r || S !== c) && Jo(t, i, a, c)),
        (fl = !1));
      var j = t.memoizedState;
      ((i.state = j),
        rn(t, a, i, n),
        sn(),
        (S = t.memoizedState),
        r || j !== S || fl
          ? (typeof M == "function" && (zc(t, l, M, a), (S = t.memoizedState)),
            (m = fl || Ko(t, l, m, a, j, S, c))
              ? (C ||
                  (typeof i.UNSAFE_componentWillMount != "function" &&
                    typeof i.componentWillMount != "function") ||
                  (typeof i.componentWillMount == "function" &&
                    i.componentWillMount(),
                  typeof i.UNSAFE_componentWillMount == "function" &&
                    i.UNSAFE_componentWillMount()),
                typeof i.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof i.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = a),
                (t.memoizedState = S)),
            (i.props = a),
            (i.state = S),
            (i.context = c),
            (a = m))
          : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
            (a = !1)));
    } else {
      ((i = t.stateNode),
        tc(e, t),
        (c = t.memoizedProps),
        (C = Wl(l, c)),
        (i.props = C),
        (M = t.pendingProps),
        (j = i.context),
        (S = l.contextType),
        (m = da),
        typeof S == "object" && S !== null && (m = Ke(S)),
        (r = l.getDerivedStateFromProps),
        (S =
          typeof r == "function" ||
          typeof i.getSnapshotBeforeUpdate == "function") ||
          (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
            typeof i.componentWillReceiveProps != "function") ||
          ((c !== M || j !== m) && Jo(t, i, a, m)),
        (fl = !1),
        (j = t.memoizedState),
        (i.state = j),
        rn(t, a, i, n),
        sn());
      var z = t.memoizedState;
      c !== M ||
      j !== z ||
      fl ||
      (e !== null && e.dependencies !== null && ii(e.dependencies))
        ? (typeof r == "function" && (zc(t, l, r, a), (z = t.memoizedState)),
          (C =
            fl ||
            Ko(t, l, C, a, j, z, m) ||
            (e !== null && e.dependencies !== null && ii(e.dependencies)))
            ? (S ||
                (typeof i.UNSAFE_componentWillUpdate != "function" &&
                  typeof i.componentWillUpdate != "function") ||
                (typeof i.componentWillUpdate == "function" &&
                  i.componentWillUpdate(a, z, m),
                typeof i.UNSAFE_componentWillUpdate == "function" &&
                  i.UNSAFE_componentWillUpdate(a, z, m)),
              typeof i.componentDidUpdate == "function" && (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof i.componentDidUpdate != "function" ||
                (c === e.memoizedProps && j === e.memoizedState) ||
                (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate != "function" ||
                (c === e.memoizedProps && j === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = z)),
          (i.props = a),
          (i.state = z),
          (i.context = m),
          (a = C))
        : (typeof i.componentDidUpdate != "function" ||
            (c === e.memoizedProps && j === e.memoizedState) ||
            (t.flags |= 4),
          typeof i.getSnapshotBeforeUpdate != "function" ||
            (c === e.memoizedProps && j === e.memoizedState) ||
            (t.flags |= 1024),
          (a = !1));
    }
    return (
      (i = a),
      zi(e, t),
      (a = (t.flags & 128) !== 0),
      i || a
        ? ((i = t.stateNode),
          (l =
            a && typeof l.getDerivedStateFromError != "function"
              ? null
              : i.render()),
          (t.flags |= 1),
          e !== null && a
            ? ((t.child = Kl(t, e.child, null, n)),
              (t.child = Kl(t, null, l, n)))
            : Je(e, t, l, n),
          (t.memoizedState = i.state),
          (e = t.child))
        : (e = Jt(e, t, n)),
      e
    );
  }
  function of(e, t, l, a) {
    return (Gl(), (t.flags |= 256), Je(e, t, l, a), t.child);
  }
  var Oc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function _c(e) {
    return { baseLanes: e, cachePool: Fr() };
  }
  function Mc(e, t, l) {
    return ((e = e !== null ? e.childLanes & ~l : 0), t && (e |= vt), e);
  }
  function ff(e, t, l) {
    var a = t.pendingProps,
      n = !1,
      i = (t.flags & 128) !== 0,
      c;
    if (
      ((c = i) ||
        (c =
          e !== null && e.memoizedState === null ? !1 : (Re.current & 2) !== 0),
      c && ((n = !0), (t.flags &= -129)),
      (c = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (se) {
        if (
          (n ? ml(t) : pl(),
          (e = Ee)
            ? ((e = xd(e, Tt)),
              (e = e !== null && e.data !== "&" ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: cl !== null ? { id: Ut, overflow: Dt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Qr(e)),
                (l.return = t),
                (t.child = l),
                (ke = t),
                (Ee = null)))
            : (e = null),
          e === null)
        )
          throw rl(t);
        return (hs(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var r = a.children;
      return (
        (a = a.fallback),
        n
          ? (pl(),
            (n = t.mode),
            (r = Ei({ mode: "hidden", children: r }, n)),
            (a = Yl(a, n, l, null)),
            (r.return = t),
            (a.return = t),
            (r.sibling = a),
            (t.child = r),
            (a = t.child),
            (a.memoizedState = _c(l)),
            (a.childLanes = Mc(e, c, l)),
            (t.memoizedState = Oc),
            mn(null, a))
          : (ml(t), Rc(t, r))
      );
    }
    var m = e.memoizedState;
    if (m !== null && ((r = m.dehydrated), r !== null)) {
      if (i)
        t.flags & 256
          ? (ml(t), (t.flags &= -257), (t = Uc(e, t, l)))
          : t.memoizedState !== null
            ? (pl(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (pl(),
              (r = a.fallback),
              (n = t.mode),
              (a = Ei({ mode: "visible", children: a.children }, n)),
              (r = Yl(r, n, l, null)),
              (r.flags |= 2),
              (a.return = t),
              (r.return = t),
              (a.sibling = r),
              (t.child = a),
              Kl(t, e.child, null, l),
              (a = t.child),
              (a.memoizedState = _c(l)),
              (a.childLanes = Mc(e, c, l)),
              (t.memoizedState = Oc),
              (t = mn(null, a)));
      else if ((ml(t), hs(r))) {
        if (((c = r.nextSibling && r.nextSibling.dataset), c)) var S = c.dgst;
        ((c = S),
          (a = Error(o(419))),
          (a.stack = ""),
          (a.digest = c),
          tn({ value: a, source: null, stack: null }),
          (t = Uc(e, t, l)));
      } else if (
        (Le || ga(e, t, l, !1), (c = (l & e.childLanes) !== 0), Le || c)
      ) {
        if (
          ((c = Ae),
          c !== null && ((a = Ws(c, l)), a !== 0 && a !== m.retryLane))
        )
          throw ((m.retryLane = a), ql(e, a), ct(c, e, a), Nc);
        (ds(r) || Di(), (t = Uc(e, t, l)));
      } else
        ds(r)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = m.treeContext),
            (Ee = Ct(r.nextSibling)),
            (ke = t),
            (se = !0),
            (sl = null),
            (Tt = !1),
            e !== null && Zr(t, e),
            (t = Rc(t, a.children)),
            (t.flags |= 4096));
      return t;
    }
    return n
      ? (pl(),
        (r = a.fallback),
        (n = t.mode),
        (m = e.child),
        (S = m.sibling),
        (a = Qt(m, { mode: "hidden", children: a.children })),
        (a.subtreeFlags = m.subtreeFlags & 65011712),
        S !== null ? (r = Qt(S, r)) : ((r = Yl(r, n, l, null)), (r.flags |= 2)),
        (r.return = t),
        (a.return = t),
        (a.sibling = r),
        (t.child = a),
        mn(null, a),
        (a = t.child),
        (r = e.child.memoizedState),
        r === null
          ? (r = _c(l))
          : ((n = r.cachePool),
            n !== null
              ? ((m = He._currentValue),
                (n = n.parent !== m ? { parent: m, pool: m } : n))
              : (n = Fr()),
            (r = { baseLanes: r.baseLanes | l, cachePool: n })),
        (a.memoizedState = r),
        (a.childLanes = Mc(e, c, l)),
        (t.memoizedState = Oc),
        mn(e.child, a))
      : (ml(t),
        (l = e.child),
        (e = l.sibling),
        (l = Qt(l, { mode: "visible", children: a.children })),
        (l.return = t),
        (l.sibling = null),
        e !== null &&
          ((c = t.deletions),
          c === null ? ((t.deletions = [e]), (t.flags |= 16)) : c.push(e)),
        (t.child = l),
        (t.memoizedState = null),
        l);
  }
  function Rc(e, t) {
    return (
      (t = Ei({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function Ei(e, t) {
    return ((e = ht(22, e, null, t)), (e.lanes = 0), e);
  }
  function Uc(e, t, l) {
    return (
      Kl(t, e.child, null, l),
      (e = Rc(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function df(e, t, l) {
    e.lanes |= t;
    var a = e.alternate;
    (a !== null && (a.lanes |= t), Ju(e.return, t, l));
  }
  function Dc(e, t, l, a, n, i) {
    var c = e.memoizedState;
    c === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: l,
          tailMode: n,
          treeForkCount: i,
        })
      : ((c.isBackwards = t),
        (c.rendering = null),
        (c.renderingStartTime = 0),
        (c.last = a),
        (c.tail = l),
        (c.tailMode = n),
        (c.treeForkCount = i));
  }
  function hf(e, t, l) {
    var a = t.pendingProps,
      n = a.revealOrder,
      i = a.tail;
    a = a.children;
    var c = Re.current,
      r = (c & 2) !== 0;
    if (
      (r ? ((c = (c & 1) | 2), (t.flags |= 128)) : (c &= 1),
      w(Re, c),
      Je(e, t, a, l),
      (a = se ? en : 0),
      !r && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && df(e, l, t);
        else if (e.tag === 19) df(e, l, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    switch (n) {
      case "forwards":
        for (l = t.child, n = null; l !== null; )
          ((e = l.alternate),
            e !== null && hi(e) === null && (n = l),
            (l = l.sibling));
        ((l = n),
          l === null
            ? ((n = t.child), (t.child = null))
            : ((n = l.sibling), (l.sibling = null)),
          Dc(t, !1, n, l, i, a));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, n = t.child, t.child = null; n !== null; ) {
          if (((e = n.alternate), e !== null && hi(e) === null)) {
            t.child = n;
            break;
          }
          ((e = n.sibling), (n.sibling = l), (l = n), (n = e));
        }
        Dc(t, !0, l, null, i, a);
        break;
      case "together":
        Dc(t, !1, null, null, void 0, a);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Jt(e, t, l) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (yl |= t.lanes),
      (l & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((ga(e, t, l, !1), (l & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(o(153));
    if (t.child !== null) {
      for (
        e = t.child, l = Qt(e, e.pendingProps), t.child = l, l.return = t;
        e.sibling !== null;
      )
        ((e = e.sibling),
          (l = l.sibling = Qt(e, e.pendingProps)),
          (l.return = t));
      l.sibling = null;
    }
    return t.child;
  }
  function wc(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && ii(e)));
  }
  function Km(e, t, l) {
    switch (t.tag) {
      case 3:
        (Pe(t, t.stateNode.containerInfo),
          ol(t, He, e.memoizedState.cache),
          Gl());
        break;
      case 27:
      case 5:
        qa(t);
        break;
      case 4:
        Pe(t, t.stateNode.containerInfo);
        break;
      case 10:
        ol(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), uc(t), null);
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (ml(t), (t.flags |= 128), null)
            : (l & t.child.childLanes) !== 0
              ? ff(e, t, l)
              : (ml(t), (e = Jt(e, t, l)), e !== null ? e.sibling : null);
        ml(t);
        break;
      case 19:
        var n = (e.flags & 128) !== 0;
        if (
          ((a = (l & t.childLanes) !== 0),
          a || (ga(e, t, l, !1), (a = (l & t.childLanes) !== 0)),
          n)
        ) {
          if (a) return hf(e, t, l);
          t.flags |= 128;
        }
        if (
          ((n = t.memoizedState),
          n !== null &&
            ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
          w(Re, Re.current),
          a)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), nf(e, t, l, t.pendingProps));
      case 24:
        ol(t, He, e.memoizedState.cache);
    }
    return Jt(e, t, l);
  }
  function mf(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Le = !0;
      else {
        if (!wc(e, l) && (t.flags & 128) === 0) return ((Le = !1), Km(e, t, l));
        Le = (e.flags & 131072) !== 0;
      }
    else ((Le = !1), se && (t.flags & 1048576) !== 0 && Vr(t, en, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (((e = Zl(t.elementType)), (t.type = e), typeof e == "function"))
            Yu(e)
              ? ((a = Wl(e, a)), (t.tag = 1), (t = rf(null, t, e, a, l)))
              : ((t.tag = 0), (t = Cc(null, t, e, a, l)));
          else {
            if (e != null) {
              var n = e.$$typeof;
              if (n === ie) {
                ((t.tag = 11), (t = tf(null, t, e, a, l)));
                break e;
              } else if (n === Z) {
                ((t.tag = 14), (t = lf(null, t, e, a, l)));
                break e;
              }
            }
            throw ((t = xt(e) || e), Error(o(306, t, "")));
          }
        }
        return t;
      case 0:
        return Cc(e, t, t.type, t.pendingProps, l);
      case 1:
        return ((a = t.type), (n = Wl(a, t.pendingProps)), rf(e, t, a, n, l));
      case 3:
        e: {
          if ((Pe(t, t.stateNode.containerInfo), e === null))
            throw Error(o(387));
          a = t.pendingProps;
          var i = t.memoizedState;
          ((n = i.element), tc(e, t), rn(t, a, null, l));
          var c = t.memoizedState;
          if (
            ((a = c.cache),
            ol(t, He, a),
            a !== i.cache && Wu(t, [He], l, !0),
            sn(),
            (a = c.element),
            i.isDehydrated)
          )
            if (
              ((i = { element: a, isDehydrated: !1, cache: c.cache }),
              (t.updateQueue.baseState = i),
              (t.memoizedState = i),
              t.flags & 256)
            ) {
              t = of(e, t, a, l);
              break e;
            } else if (a !== n) {
              ((n = At(Error(o(424)), t)), tn(n), (t = of(e, t, a, l)));
              break e;
            } else
              for (
                e = t.stateNode.containerInfo,
                  e.nodeType === 9
                    ? (e = e.body)
                    : (e = e.nodeName === "HTML" ? e.ownerDocument.body : e),
                  Ee = Ct(e.firstChild),
                  ke = t,
                  se = !0,
                  sl = null,
                  Tt = !0,
                  l = ao(t, null, a, l),
                  t.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
          else {
            if ((Gl(), a === n)) {
              t = Jt(e, t, l);
              break e;
            }
            Je(e, t, a, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          zi(e, t),
          e === null
            ? (l = Ed(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = l)
              : se ||
                ((l = t.type),
                (e = t.pendingProps),
                (a = Gi(te.current).createElement(l)),
                (a[Ze] = t),
                (a[tt] = e),
                We(a, l, e),
                Qe(a),
                (t.stateNode = a))
            : (t.memoizedState = Ed(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState,
              )),
          null
        );
      case 27:
        return (
          qa(t),
          e === null &&
            se &&
            ((a = t.stateNode = jd(t.type, t.pendingProps, te.current)),
            (ke = t),
            (Tt = !0),
            (n = Ee),
            Al(t.type) ? ((ms = n), (Ee = Ct(a.firstChild))) : (Ee = n)),
          Je(e, t, t.pendingProps.children, l),
          zi(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            se &&
            ((n = a = Ee) &&
              ((a = A0(a, t.type, t.pendingProps, Tt)),
              a !== null
                ? ((t.stateNode = a),
                  (ke = t),
                  (Ee = Ct(a.firstChild)),
                  (Tt = !1),
                  (n = !0))
                : (n = !1)),
            n || rl(t)),
          qa(t),
          (n = t.type),
          (i = t.pendingProps),
          (c = e !== null ? e.memoizedProps : null),
          (a = i.children),
          rs(n, i) ? (a = null) : c !== null && rs(n, c) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((n = sc(e, t, Lm, null, null, l)), (On._currentValue = n)),
          zi(e, t),
          Je(e, t, a, l),
          t.child
        );
      case 6:
        return (
          e === null &&
            se &&
            ((e = l = Ee) &&
              ((l = z0(l, t.pendingProps, Tt)),
              l !== null
                ? ((t.stateNode = l), (ke = t), (Ee = null), (e = !0))
                : (e = !1)),
            e || rl(t)),
          null
        );
      case 13:
        return ff(e, t, l);
      case 4:
        return (
          Pe(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          e === null ? (t.child = Kl(t, null, a, l)) : Je(e, t, a, l),
          t.child
        );
      case 11:
        return tf(e, t, t.type, t.pendingProps, l);
      case 7:
        return (Je(e, t, t.pendingProps, l), t.child);
      case 8:
        return (Je(e, t, t.pendingProps.children, l), t.child);
      case 12:
        return (Je(e, t, t.pendingProps.children, l), t.child);
      case 10:
        return (
          (a = t.pendingProps),
          ol(t, t.type, a.value),
          Je(e, t, a.children, l),
          t.child
        );
      case 9:
        return (
          (n = t.type._context),
          (a = t.pendingProps.children),
          Xl(t),
          (n = Ke(n)),
          (a = a(n)),
          (t.flags |= 1),
          Je(e, t, a, l),
          t.child
        );
      case 14:
        return lf(e, t, t.type, t.pendingProps, l);
      case 15:
        return af(e, t, t.type, t.pendingProps, l);
      case 19:
        return hf(e, t, l);
      case 31:
        return km(e, t, l);
      case 22:
        return nf(e, t, l, t.pendingProps);
      case 24:
        return (
          Xl(t),
          (a = Ke(He)),
          e === null
            ? ((n = Iu()),
              n === null &&
                ((n = Ae),
                (i = $u()),
                (n.pooledCache = i),
                i.refCount++,
                i !== null && (n.pooledCacheLanes |= l),
                (n = i)),
              (t.memoizedState = { parent: a, cache: n }),
              ec(t),
              ol(t, He, n))
            : ((e.lanes & l) !== 0 && (tc(e, t), rn(t, null, null, l), sn()),
              (n = e.memoizedState),
              (i = t.memoizedState),
              n.parent !== a
                ? ((n = { parent: a, cache: a }),
                  (t.memoizedState = n),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = n),
                  ol(t, He, a))
                : ((a = i.cache),
                  ol(t, He, a),
                  a !== n.cache && Wu(t, [He], l, !0))),
          Je(e, t, t.pendingProps.children, l),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function Wt(e) {
    e.flags |= 4;
  }
  function Hc(e, t, l, a, n) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (n & 335544128) === n))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Gf()) e.flags |= 8192;
        else throw ((kl = ri), Pu);
    } else e.flags &= -16777217;
  }
  function pf(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !_d(t)))
      if (Gf()) e.flags |= 8192;
      else throw ((kl = ri), Pu);
  }
  function Ti(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? ks() : 536870912), (e.lanes |= t), (Ca |= t)));
  }
  function pn(e, t) {
    if (!se)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var l = null; t !== null; )
            (t.alternate !== null && (l = t), (t = t.sibling));
          l === null ? (e.tail = null) : (l.sibling = null);
          break;
        case "collapsed":
          l = e.tail;
          for (var a = null; l !== null; )
            (l.alternate !== null && (a = l), (l = l.sibling));
          a === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function Te(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      l = 0,
      a = 0;
    if (t)
      for (var n = e.child; n !== null; )
        ((l |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags & 65011712),
          (a |= n.flags & 65011712),
          (n.return = e),
          (n = n.sibling));
    else
      for (n = e.child; n !== null; )
        ((l |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags),
          (a |= n.flags),
          (n.return = e),
          (n = n.sibling));
    return ((e.subtreeFlags |= a), (e.childLanes = l), t);
  }
  function Jm(e, t, l) {
    var a = t.pendingProps;
    switch ((Vu(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Te(t), null);
      case 1:
        return (Te(t), null);
      case 3:
        return (
          (l = t.stateNode),
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Zt(He),
          Me(),
          l.pendingContext &&
            ((l.context = l.pendingContext), (l.pendingContext = null)),
          (e === null || e.child === null) &&
            (pa(t)
              ? Wt(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), ku())),
          Te(t),
          null
        );
      case 26:
        var n = t.type,
          i = t.memoizedState;
        return (
          e === null
            ? (Wt(t),
              i !== null ? (Te(t), pf(t, i)) : (Te(t), Hc(t, n, null, a, l)))
            : i
              ? i !== e.memoizedState
                ? (Wt(t), Te(t), pf(t, i))
                : (Te(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps),
                e !== a && Wt(t),
                Te(t),
                Hc(t, n, e, a, l)),
          null
        );
      case 27:
        if (
          (Bn(t),
          (l = te.current),
          (n = t.type),
          e !== null && t.stateNode != null)
        )
          e.memoizedProps !== a && Wt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(o(166));
            return (Te(t), null);
          }
          ((e = L.current),
            pa(t) ? kr(t) : ((e = jd(n, a, l)), (t.stateNode = e), Wt(t)));
        }
        return (Te(t), null);
      case 5:
        if ((Bn(t), (n = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== a && Wt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(o(166));
            return (Te(t), null);
          }
          if (((i = L.current), pa(t))) kr(t);
          else {
            var c = Gi(te.current);
            switch (i) {
              case 1:
                i = c.createElementNS("http://www.w3.org/2000/svg", n);
                break;
              case 2:
                i = c.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                break;
              default:
                switch (n) {
                  case "svg":
                    i = c.createElementNS("http://www.w3.org/2000/svg", n);
                    break;
                  case "math":
                    i = c.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n,
                    );
                    break;
                  case "script":
                    ((i = c.createElement("div")),
                      (i.innerHTML = "<script><\/script>"),
                      (i = i.removeChild(i.firstChild)));
                    break;
                  case "select":
                    ((i =
                      typeof a.is == "string"
                        ? c.createElement("select", { is: a.is })
                        : c.createElement("select")),
                      a.multiple
                        ? (i.multiple = !0)
                        : a.size && (i.size = a.size));
                    break;
                  default:
                    i =
                      typeof a.is == "string"
                        ? c.createElement(n, { is: a.is })
                        : c.createElement(n);
                }
            }
            ((i[Ze] = t), (i[tt] = a));
            e: for (c = t.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6) i.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                ((c.child.return = c), (c = c.child));
                continue;
              }
              if (c === t) break e;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === t) break e;
                c = c.return;
              }
              ((c.sibling.return = c.return), (c = c.sibling));
            }
            t.stateNode = i;
            e: switch ((We(i, n, a), n)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break e;
              case "img":
                a = !0;
                break e;
              default:
                a = !1;
            }
            a && Wt(t);
          }
        }
        return (
          Te(t),
          Hc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, l),
          null
        );
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== a && Wt(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(o(166));
          if (((e = te.current), pa(t))) {
            if (
              ((e = t.stateNode),
              (l = t.memoizedProps),
              (a = null),
              (n = ke),
              n !== null)
            )
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            ((e[Ze] = t),
              (e = !!(
                e.nodeValue === l ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                fd(e.nodeValue, l)
              )),
              e || rl(t, !0));
          } else
            ((e = Gi(e).createTextNode(a)), (e[Ze] = t), (t.stateNode = e));
        }
        return (Te(t), null);
      case 31:
        if (((l = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((a = pa(t)), l !== null)) {
            if (e === null) {
              if (!a) throw Error(o(318));
              if (
                ((e = t.memoizedState),
                (e = e !== null ? e.dehydrated : null),
                !e)
              )
                throw Error(o(557));
              e[Ze] = t;
            } else
              (Gl(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (Te(t), (e = !1));
          } else
            ((l = ku()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = l),
              (e = !0));
          if (!e) return t.flags & 256 ? (pt(t), t) : (pt(t), null);
          if ((t.flags & 128) !== 0) throw Error(o(558));
        }
        return (Te(t), null);
      case 13:
        if (
          ((a = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((n = pa(t)), a !== null && a.dehydrated !== null)) {
            if (e === null) {
              if (!n) throw Error(o(318));
              if (
                ((n = t.memoizedState),
                (n = n !== null ? n.dehydrated : null),
                !n)
              )
                throw Error(o(317));
              n[Ze] = t;
            } else
              (Gl(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (Te(t), (n = !1));
          } else
            ((n = ku()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = n),
              (n = !0));
          if (!n) return t.flags & 256 ? (pt(t), t) : (pt(t), null);
        }
        return (
          pt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = l), t)
            : ((l = a !== null),
              (e = e !== null && e.memoizedState !== null),
              l &&
                ((a = t.child),
                (n = null),
                a.alternate !== null &&
                  a.alternate.memoizedState !== null &&
                  a.alternate.memoizedState.cachePool !== null &&
                  (n = a.alternate.memoizedState.cachePool.pool),
                (i = null),
                a.memoizedState !== null &&
                  a.memoizedState.cachePool !== null &&
                  (i = a.memoizedState.cachePool.pool),
                i !== n && (a.flags |= 2048)),
              l !== e && l && (t.child.flags |= 8192),
              Ti(t, t.updateQueue),
              Te(t),
              null)
        );
      case 4:
        return (Me(), e === null && ns(t.stateNode.containerInfo), Te(t), null);
      case 10:
        return (Zt(t.type), Te(t), null);
      case 19:
        if ((E(Re), (a = t.memoizedState), a === null)) return (Te(t), null);
        if (((n = (t.flags & 128) !== 0), (i = a.rendering), i === null))
          if (n) pn(a, !1);
          else {
            if (Oe !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((i = hi(e)), i !== null)) {
                  for (
                    t.flags |= 128,
                      pn(a, !1),
                      e = i.updateQueue,
                      t.updateQueue = e,
                      Ti(t, e),
                      t.subtreeFlags = 0,
                      e = l,
                      l = t.child;
                    l !== null;
                  )
                    (Gr(l, e), (l = l.sibling));
                  return (
                    w(Re, (Re.current & 1) | 2),
                    se && Xt(t, a.treeForkCount),
                    t.child
                  );
                }
                e = e.sibling;
              }
            a.tail !== null &&
              rt() > Mi &&
              ((t.flags |= 128), (n = !0), pn(a, !1), (t.lanes = 4194304));
          }
        else {
          if (!n)
            if (((e = hi(i)), e !== null)) {
              if (
                ((t.flags |= 128),
                (n = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Ti(t, e),
                pn(a, !0),
                a.tail === null &&
                  a.tailMode === "hidden" &&
                  !i.alternate &&
                  !se)
              )
                return (Te(t), null);
            } else
              2 * rt() - a.renderingStartTime > Mi &&
                l !== 536870912 &&
                ((t.flags |= 128), (n = !0), pn(a, !1), (t.lanes = 4194304));
          a.isBackwards
            ? ((i.sibling = t.child), (t.child = i))
            : ((e = a.last),
              e !== null ? (e.sibling = i) : (t.child = i),
              (a.last = i));
        }
        return a.tail !== null
          ? ((e = a.tail),
            (a.rendering = e),
            (a.tail = e.sibling),
            (a.renderingStartTime = rt()),
            (e.sibling = null),
            (l = Re.current),
            w(Re, n ? (l & 1) | 2 : l & 1),
            se && Xt(t, a.treeForkCount),
            e)
          : (Te(t), null);
      case 22:
      case 23:
        return (
          pt(t),
          ic(),
          (a = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== a && (t.flags |= 8192)
            : a && (t.flags |= 8192),
          a
            ? (l & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Te(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Te(t),
          (l = t.updateQueue),
          l !== null && Ti(t, l.retryQueue),
          (l = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (l = e.memoizedState.cachePool.pool),
          (a = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          a !== l && (t.flags |= 2048),
          e !== null && E(Vl),
          null
        );
      case 24:
        return (
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          Zt(He),
          Te(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function Wm(e, t) {
    switch ((Vu(t), t.tag)) {
      case 1:
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Zt(He),
          Me(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (Bn(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((pt(t), t.alternate === null)) throw Error(o(340));
          Gl();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 13:
        if (
          (pt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(o(340));
          Gl();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (E(Re), null);
      case 4:
        return (Me(), null);
      case 10:
        return (Zt(t.type), null);
      case 22:
      case 23:
        return (
          pt(t),
          ic(),
          e !== null && E(Vl),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (Zt(He), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function gf(e, t) {
    switch ((Vu(t), t.tag)) {
      case 3:
        (Zt(He), Me());
        break;
      case 26:
      case 27:
      case 5:
        Bn(t);
        break;
      case 4:
        Me();
        break;
      case 31:
        t.memoizedState !== null && pt(t);
        break;
      case 13:
        pt(t);
        break;
      case 19:
        E(Re);
        break;
      case 10:
        Zt(t.type);
        break;
      case 22:
      case 23:
        (pt(t), ic(), e !== null && E(Vl));
        break;
      case 24:
        Zt(He);
    }
  }
  function gn(e, t) {
    try {
      var l = t.updateQueue,
        a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        l = n;
        do {
          if ((l.tag & e) === e) {
            a = void 0;
            var i = l.create,
              c = l.inst;
            ((a = i()), (c.destroy = a));
          }
          l = l.next;
        } while (l !== n);
      }
    } catch (r) {
      ye(t, t.return, r);
    }
  }
  function gl(e, t, l) {
    try {
      var a = t.updateQueue,
        n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var i = n.next;
        a = i;
        do {
          if ((a.tag & e) === e) {
            var c = a.inst,
              r = c.destroy;
            if (r !== void 0) {
              ((c.destroy = void 0), (n = t));
              var m = l,
                S = r;
              try {
                S();
              } catch (C) {
                ye(n, m, C);
              }
            }
          }
          a = a.next;
        } while (a !== i);
      }
    } catch (C) {
      ye(t, t.return, C);
    }
  }
  function vf(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        io(t, l);
      } catch (a) {
        ye(e, e.return, a);
      }
    }
  }
  function yf(e, t, l) {
    ((l.props = Wl(e.type, e.memoizedProps)), (l.state = e.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (a) {
      ye(e, t, a);
    }
  }
  function vn(e, t) {
    try {
      var l = e.ref;
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        typeof l == "function" ? (e.refCleanup = l(a)) : (l.current = a);
      }
    } catch (n) {
      ye(e, t, n);
    }
  }
  function wt(e, t) {
    var l = e.ref,
      a = e.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          ye(e, t, n);
        } finally {
          ((e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null));
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (n) {
          ye(e, t, n);
        }
      else l.current = null;
  }
  function xf(e) {
    var t = e.type,
      l = e.memoizedProps,
      a = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && a.focus();
          break e;
        case "img":
          l.src ? (a.src = l.src) : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (n) {
      ye(e, e.return, n);
    }
  }
  function Bc(e, t, l) {
    try {
      var a = e.stateNode;
      (v0(a, e.type, l, t), (a[tt] = t));
    } catch (n) {
      ye(e, e.return, n);
    }
  }
  function bf(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && Al(e.type)) ||
      e.tag === 4
    );
  }
  function Lc(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || bf(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if (
          (e.tag === 27 && Al(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function qc(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      ((e = e.stateNode),
        t
          ? (l.nodeType === 9
              ? l.body
              : l.nodeName === "HTML"
                ? l.ownerDocument.body
                : l
            ).insertBefore(e, t)
          : ((t =
              l.nodeType === 9
                ? l.body
                : l.nodeName === "HTML"
                  ? l.ownerDocument.body
                  : l),
            t.appendChild(e),
            (l = l._reactRootContainer),
            l != null || t.onclick !== null || (t.onclick = Yt)));
    else if (
      a !== 4 &&
      (a === 27 && Al(e.type) && ((l = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (qc(e, t, l), e = e.sibling; e !== null; )
        (qc(e, t, l), (e = e.sibling));
  }
  function Ni(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      ((e = e.stateNode), t ? l.insertBefore(e, t) : l.appendChild(e));
    else if (
      a !== 4 &&
      (a === 27 && Al(e.type) && (l = e.stateNode), (e = e.child), e !== null)
    )
      for (Ni(e, t, l), e = e.sibling; e !== null; )
        (Ni(e, t, l), (e = e.sibling));
  }
  function Sf(e) {
    var t = e.stateNode,
      l = e.memoizedProps;
    try {
      for (var a = e.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      (We(t, a, l), (t[Ze] = e), (t[tt] = l));
    } catch (i) {
      ye(e, e.return, i);
    }
  }
  var $t = !1,
    qe = !1,
    Yc = !1,
    jf = typeof WeakSet == "function" ? WeakSet : Set,
    Xe = null;
  function $m(e, t) {
    if (((e = e.containerInfo), (cs = Ji), (e = Rr(e)), Uu(e))) {
      if ("selectionStart" in e)
        var l = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          l = ((l = e.ownerDocument) && l.defaultView) || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var n = a.anchorOffset,
              i = a.focusNode;
            a = a.focusOffset;
            try {
              (l.nodeType, i.nodeType);
            } catch {
              l = null;
              break e;
            }
            var c = 0,
              r = -1,
              m = -1,
              S = 0,
              C = 0,
              M = e,
              j = null;
            t: for (;;) {
              for (
                var z;
                M !== l || (n !== 0 && M.nodeType !== 3) || (r = c + n),
                  M !== i || (a !== 0 && M.nodeType !== 3) || (m = c + a),
                  M.nodeType === 3 && (c += M.nodeValue.length),
                  (z = M.firstChild) !== null;
              )
                ((j = M), (M = z));
              for (;;) {
                if (M === e) break t;
                if (
                  (j === l && ++S === n && (r = c),
                  j === i && ++C === a && (m = c),
                  (z = M.nextSibling) !== null)
                )
                  break;
                ((M = j), (j = M.parentNode));
              }
              M = z;
            }
            l = r === -1 || m === -1 ? null : { start: r, end: m };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (
      ss = { focusedElem: e, selectionRange: l }, Ji = !1, Xe = t;
      Xe !== null;
    )
      if (
        ((t = Xe), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
      )
        ((e.return = t), (Xe = e));
      else
        for (; Xe !== null; ) {
          switch (((t = Xe), (i = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue),
                (e = e !== null ? e.events : null),
                e !== null)
              )
                for (l = 0; l < e.length; l++)
                  ((n = e[l]), (n.ref.impl = n.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && i !== null) {
                ((e = void 0),
                  (l = t),
                  (n = i.memoizedProps),
                  (i = i.memoizedState),
                  (a = l.stateNode));
                try {
                  var q = Wl(l.type, n);
                  ((e = a.getSnapshotBeforeUpdate(q, i)),
                    (a.__reactInternalSnapshotBeforeUpdate = e));
                } catch (k) {
                  ye(l, l.return, k);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (l = e.nodeType), l === 9)
                )
                  fs(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      fs(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(o(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (Xe = e));
            break;
          }
          Xe = t.return;
        }
  }
  function Af(e, t, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (It(e, l), a & 4 && gn(5, l));
        break;
      case 1:
        if ((It(e, l), a & 4))
          if (((e = l.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (c) {
              ye(l, l.return, c);
            }
          else {
            var n = Wl(l.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(n, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (c) {
              ye(l, l.return, c);
            }
          }
        (a & 64 && vf(l), a & 512 && vn(l, l.return));
        break;
      case 3:
        if ((It(e, l), a & 64 && ((e = l.updateQueue), e !== null))) {
          if (((t = null), l.child !== null))
            switch (l.child.tag) {
              case 27:
              case 5:
                t = l.child.stateNode;
                break;
              case 1:
                t = l.child.stateNode;
            }
          try {
            io(e, t);
          } catch (c) {
            ye(l, l.return, c);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Sf(l);
      case 26:
      case 5:
        (It(e, l), t === null && a & 4 && xf(l), a & 512 && vn(l, l.return));
        break;
      case 12:
        It(e, l);
        break;
      case 31:
        (It(e, l), a & 4 && Tf(e, l));
        break;
      case 13:
        (It(e, l),
          a & 4 && Nf(e, l),
          a & 64 &&
            ((e = l.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((l = i0.bind(null, l)), E0(e, l)))));
        break;
      case 22:
        if (((a = l.memoizedState !== null || $t), !a)) {
          ((t = (t !== null && t.memoizedState !== null) || qe), (n = $t));
          var i = qe;
          (($t = a),
            (qe = t) && !i ? Pt(e, l, (l.subtreeFlags & 8772) !== 0) : It(e, l),
            ($t = n),
            (qe = i));
        }
        break;
      case 30:
        break;
      default:
        It(e, l);
    }
  }
  function zf(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), zf(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && gu(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var Ne = null,
    at = !1;
  function Ft(e, t, l) {
    for (l = l.child; l !== null; ) (Ef(e, t, l), (l = l.sibling));
  }
  function Ef(e, t, l) {
    if (ot && typeof ot.onCommitFiberUnmount == "function")
      try {
        ot.onCommitFiberUnmount(Ya, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (qe || wt(l, t),
          Ft(e, t, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        qe || wt(l, t);
        var a = Ne,
          n = at;
        (Al(l.type) && ((Ne = l.stateNode), (at = !1)),
          Ft(e, t, l),
          Tn(l.stateNode),
          (Ne = a),
          (at = n));
        break;
      case 5:
        qe || wt(l, t);
      case 6:
        if (
          ((a = Ne),
          (n = at),
          (Ne = null),
          Ft(e, t, l),
          (Ne = a),
          (at = n),
          Ne !== null)
        )
          if (at)
            try {
              (Ne.nodeType === 9
                ? Ne.body
                : Ne.nodeName === "HTML"
                  ? Ne.ownerDocument.body
                  : Ne
              ).removeChild(l.stateNode);
            } catch (i) {
              ye(l, t, i);
            }
          else
            try {
              Ne.removeChild(l.stateNode);
            } catch (i) {
              ye(l, t, i);
            }
        break;
      case 18:
        Ne !== null &&
          (at
            ? ((e = Ne),
              vd(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                    ? e.ownerDocument.body
                    : e,
                l.stateNode,
              ),
              Ha(e))
            : vd(Ne, l.stateNode));
        break;
      case 4:
        ((a = Ne),
          (n = at),
          (Ne = l.stateNode.containerInfo),
          (at = !0),
          Ft(e, t, l),
          (Ne = a),
          (at = n));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (gl(2, l, t), qe || gl(4, l, t), Ft(e, t, l));
        break;
      case 1:
        (qe ||
          (wt(l, t),
          (a = l.stateNode),
          typeof a.componentWillUnmount == "function" && yf(l, t, a)),
          Ft(e, t, l));
        break;
      case 21:
        Ft(e, t, l);
        break;
      case 22:
        ((qe = (a = qe) || l.memoizedState !== null), Ft(e, t, l), (qe = a));
        break;
      default:
        Ft(e, t, l);
    }
  }
  function Tf(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        Ha(e);
      } catch (l) {
        ye(t, t.return, l);
      }
    }
  }
  function Nf(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Ha(e);
      } catch (l) {
        ye(t, t.return, l);
      }
  }
  function Fm(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new jf()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new jf()),
          t
        );
      default:
        throw Error(o(435, e.tag));
    }
  }
  function Ci(e, t) {
    var l = Fm(e);
    t.forEach(function (a) {
      if (!l.has(a)) {
        l.add(a);
        var n = u0.bind(null, e, a);
        a.then(n, n);
      }
    });
  }
  function nt(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a],
          i = e,
          c = t,
          r = c;
        e: for (; r !== null; ) {
          switch (r.tag) {
            case 27:
              if (Al(r.type)) {
                ((Ne = r.stateNode), (at = !1));
                break e;
              }
              break;
            case 5:
              ((Ne = r.stateNode), (at = !1));
              break e;
            case 3:
            case 4:
              ((Ne = r.stateNode.containerInfo), (at = !0));
              break e;
          }
          r = r.return;
        }
        if (Ne === null) throw Error(o(160));
        (Ef(i, c, n),
          (Ne = null),
          (at = !1),
          (i = n.alternate),
          i !== null && (i.return = null),
          (n.return = null));
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; ) (Cf(t, e), (t = t.sibling));
  }
  var Mt = null;
  function Cf(e, t) {
    var l = e.alternate,
      a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (nt(t, e),
          it(e),
          a & 4 && (gl(3, e, e.return), gn(3, e), gl(5, e, e.return)));
        break;
      case 1:
        (nt(t, e),
          it(e),
          a & 512 && (qe || l === null || wt(l, l.return)),
          a & 64 &&
            $t &&
            ((e = e.updateQueue),
            e !== null &&
              ((a = e.callbacks),
              a !== null &&
                ((l = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = l === null ? a : l.concat(a))))));
        break;
      case 26:
        var n = Mt;
        if (
          (nt(t, e),
          it(e),
          a & 512 && (qe || l === null || wt(l, l.return)),
          a & 4)
        ) {
          var i = l !== null ? l.memoizedState : null;
          if (((a = e.memoizedState), l === null))
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  ((a = e.type),
                    (l = e.memoizedProps),
                    (n = n.ownerDocument || n));
                  t: switch (a) {
                    case "title":
                      ((i = n.getElementsByTagName("title")[0]),
                        (!i ||
                          i[Xa] ||
                          i[Ze] ||
                          i.namespaceURI === "http://www.w3.org/2000/svg" ||
                          i.hasAttribute("itemprop")) &&
                          ((i = n.createElement(a)),
                          n.head.insertBefore(
                            i,
                            n.querySelector("head > title"),
                          )),
                        We(i, a, l),
                        (i[Ze] = e),
                        Qe(i),
                        (a = i));
                      break e;
                    case "link":
                      var c = Cd("link", "href", n).get(a + (l.href || ""));
                      if (c) {
                        for (var r = 0; r < c.length; r++)
                          if (
                            ((i = c[r]),
                            i.getAttribute("href") ===
                              (l.href == null || l.href === ""
                                ? null
                                : l.href) &&
                              i.getAttribute("rel") ===
                                (l.rel == null ? null : l.rel) &&
                              i.getAttribute("title") ===
                                (l.title == null ? null : l.title) &&
                              i.getAttribute("crossorigin") ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            c.splice(r, 1);
                            break t;
                          }
                      }
                      ((i = n.createElement(a)),
                        We(i, a, l),
                        n.head.appendChild(i));
                      break;
                    case "meta":
                      if (
                        (c = Cd("meta", "content", n).get(
                          a + (l.content || ""),
                        ))
                      ) {
                        for (r = 0; r < c.length; r++)
                          if (
                            ((i = c[r]),
                            i.getAttribute("content") ===
                              (l.content == null ? null : "" + l.content) &&
                              i.getAttribute("name") ===
                                (l.name == null ? null : l.name) &&
                              i.getAttribute("property") ===
                                (l.property == null ? null : l.property) &&
                              i.getAttribute("http-equiv") ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              i.getAttribute("charset") ===
                                (l.charSet == null ? null : l.charSet))
                          ) {
                            c.splice(r, 1);
                            break t;
                          }
                      }
                      ((i = n.createElement(a)),
                        We(i, a, l),
                        n.head.appendChild(i));
                      break;
                    default:
                      throw Error(o(468, a));
                  }
                  ((i[Ze] = e), Qe(i), (a = i));
                }
                e.stateNode = a;
              } else Od(n, e.type, e.stateNode);
            else e.stateNode = Nd(n, a, e.memoizedProps);
          else
            i !== a
              ? (i === null
                  ? l.stateNode !== null &&
                    ((l = l.stateNode), l.parentNode.removeChild(l))
                  : i.count--,
                a === null
                  ? Od(n, e.type, e.stateNode)
                  : Nd(n, a, e.memoizedProps))
              : a === null &&
                e.stateNode !== null &&
                Bc(e, e.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (nt(t, e),
          it(e),
          a & 512 && (qe || l === null || wt(l, l.return)),
          l !== null && a & 4 && Bc(e, e.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if (
          (nt(t, e),
          it(e),
          a & 512 && (qe || l === null || wt(l, l.return)),
          e.flags & 32)
        ) {
          n = e.stateNode;
          try {
            ia(n, "");
          } catch (q) {
            ye(e, e.return, q);
          }
        }
        (a & 4 &&
          e.stateNode != null &&
          ((n = e.memoizedProps), Bc(e, n, l !== null ? l.memoizedProps : n)),
          a & 1024 && (Yc = !0));
        break;
      case 6:
        if ((nt(t, e), it(e), a & 4)) {
          if (e.stateNode === null) throw Error(o(162));
          ((a = e.memoizedProps), (l = e.stateNode));
          try {
            l.nodeValue = a;
          } catch (q) {
            ye(e, e.return, q);
          }
        }
        break;
      case 3:
        if (
          ((Vi = null),
          (n = Mt),
          (Mt = Qi(t.containerInfo)),
          nt(t, e),
          (Mt = n),
          it(e),
          a & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            Ha(t.containerInfo);
          } catch (q) {
            ye(e, e.return, q);
          }
        Yc && ((Yc = !1), Of(e));
        break;
      case 4:
        ((a = Mt),
          (Mt = Qi(e.stateNode.containerInfo)),
          nt(t, e),
          it(e),
          (Mt = a));
        break;
      case 12:
        (nt(t, e), it(e));
        break;
      case 31:
        (nt(t, e),
          it(e),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), Ci(e, a))));
        break;
      case 13:
        (nt(t, e),
          it(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (l !== null && l.memoizedState !== null) &&
            (_i = rt()),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), Ci(e, a))));
        break;
      case 22:
        n = e.memoizedState !== null;
        var m = l !== null && l.memoizedState !== null,
          S = $t,
          C = qe;
        if (
          (($t = S || n),
          (qe = C || m),
          nt(t, e),
          (qe = C),
          ($t = S),
          it(e),
          a & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = n ? t._visibility & -2 : t._visibility | 1,
              n && (l === null || m || $t || qe || $l(e)),
              l = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                m = l = t;
                try {
                  if (((i = m.stateNode), n))
                    ((c = i.style),
                      typeof c.setProperty == "function"
                        ? c.setProperty("display", "none", "important")
                        : (c.display = "none"));
                  else {
                    r = m.stateNode;
                    var M = m.memoizedProps.style,
                      j =
                        M != null && M.hasOwnProperty("display")
                          ? M.display
                          : null;
                    r.style.display =
                      j == null || typeof j == "boolean" ? "" : ("" + j).trim();
                  }
                } catch (q) {
                  ye(m, m.return, q);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                m = t;
                try {
                  m.stateNode.nodeValue = n ? "" : m.memoizedProps;
                } catch (q) {
                  ye(m, m.return, q);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                m = t;
                try {
                  var z = m.stateNode;
                  n ? yd(z, !0) : yd(m.stateNode, !1);
                } catch (q) {
                  ye(m, m.return, q);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              (l === t && (l = null), (t = t.return));
            }
            (l === t && (l = null),
              (t.sibling.return = t.return),
              (t = t.sibling));
          }
        a & 4 &&
          ((a = e.updateQueue),
          a !== null &&
            ((l = a.retryQueue),
            l !== null && ((a.retryQueue = null), Ci(e, l))));
        break;
      case 19:
        (nt(t, e),
          it(e),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), Ci(e, a))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (nt(t, e), it(e));
    }
  }
  function it(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, a = e.return; a !== null; ) {
          if (bf(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(o(160));
        switch (l.tag) {
          case 27:
            var n = l.stateNode,
              i = Lc(e);
            Ni(e, i, n);
            break;
          case 5:
            var c = l.stateNode;
            l.flags & 32 && (ia(c, ""), (l.flags &= -33));
            var r = Lc(e);
            Ni(e, r, c);
            break;
          case 3:
          case 4:
            var m = l.stateNode.containerInfo,
              S = Lc(e);
            qc(e, S, m);
            break;
          default:
            throw Error(o(161));
        }
      } catch (C) {
        ye(e, e.return, C);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Of(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (Of(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling));
      }
  }
  function It(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (Af(e, t.alternate, t), (t = t.sibling));
  }
  function $l(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (gl(4, t, t.return), $l(t));
          break;
        case 1:
          wt(t, t.return);
          var l = t.stateNode;
          (typeof l.componentWillUnmount == "function" && yf(t, t.return, l),
            $l(t));
          break;
        case 27:
          Tn(t.stateNode);
        case 26:
        case 5:
          (wt(t, t.return), $l(t));
          break;
        case 22:
          t.memoizedState === null && $l(t);
          break;
        case 30:
          $l(t);
          break;
        default:
          $l(t);
      }
      e = e.sibling;
    }
  }
  function Pt(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate,
        n = e,
        i = t,
        c = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (Pt(n, i, l), gn(4, i));
          break;
        case 1:
          if (
            (Pt(n, i, l),
            (a = i),
            (n = a.stateNode),
            typeof n.componentDidMount == "function")
          )
            try {
              n.componentDidMount();
            } catch (S) {
              ye(a, a.return, S);
            }
          if (((a = i), (n = a.updateQueue), n !== null)) {
            var r = a.stateNode;
            try {
              var m = n.shared.hiddenCallbacks;
              if (m !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < m.length; n++)
                  no(m[n], r);
            } catch (S) {
              ye(a, a.return, S);
            }
          }
          (l && c & 64 && vf(i), vn(i, i.return));
          break;
        case 27:
          Sf(i);
        case 26:
        case 5:
          (Pt(n, i, l), l && a === null && c & 4 && xf(i), vn(i, i.return));
          break;
        case 12:
          Pt(n, i, l);
          break;
        case 31:
          (Pt(n, i, l), l && c & 4 && Tf(n, i));
          break;
        case 13:
          (Pt(n, i, l), l && c & 4 && Nf(n, i));
          break;
        case 22:
          (i.memoizedState === null && Pt(n, i, l), vn(i, i.return));
          break;
        case 30:
          break;
        default:
          Pt(n, i, l);
      }
      t = t.sibling;
    }
  }
  function Gc(e, t) {
    var l = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (l = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== l && (e != null && e.refCount++, l != null && ln(l)));
  }
  function Qc(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && ln(e)));
  }
  function Rt(e, t, l, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) (_f(e, t, l, a), (t = t.sibling));
  }
  function _f(e, t, l, a) {
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Rt(e, t, l, a), n & 2048 && gn(9, t));
        break;
      case 1:
        Rt(e, t, l, a);
        break;
      case 3:
        (Rt(e, t, l, a),
          n & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && ln(e))));
        break;
      case 12:
        if (n & 2048) {
          (Rt(e, t, l, a), (e = t.stateNode));
          try {
            var i = t.memoizedProps,
              c = i.id,
              r = i.onPostCommit;
            typeof r == "function" &&
              r(
                c,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0,
              );
          } catch (m) {
            ye(t, t.return, m);
          }
        } else Rt(e, t, l, a);
        break;
      case 31:
        Rt(e, t, l, a);
        break;
      case 13:
        Rt(e, t, l, a);
        break;
      case 23:
        break;
      case 22:
        ((i = t.stateNode),
          (c = t.alternate),
          t.memoizedState !== null
            ? i._visibility & 2
              ? Rt(e, t, l, a)
              : yn(e, t)
            : i._visibility & 2
              ? Rt(e, t, l, a)
              : ((i._visibility |= 2),
                Ea(e, t, l, a, (t.subtreeFlags & 10256) !== 0 || !1)),
          n & 2048 && Gc(c, t));
        break;
      case 24:
        (Rt(e, t, l, a), n & 2048 && Qc(t.alternate, t));
        break;
      default:
        Rt(e, t, l, a);
    }
  }
  function Ea(e, t, l, a, n) {
    for (
      n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
      t !== null;
    ) {
      var i = e,
        c = t,
        r = l,
        m = a,
        S = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          (Ea(i, c, r, m, n), gn(8, c));
          break;
        case 23:
          break;
        case 22:
          var C = c.stateNode;
          (c.memoizedState !== null
            ? C._visibility & 2
              ? Ea(i, c, r, m, n)
              : yn(i, c)
            : ((C._visibility |= 2), Ea(i, c, r, m, n)),
            n && S & 2048 && Gc(c.alternate, c));
          break;
        case 24:
          (Ea(i, c, r, m, n), n && S & 2048 && Qc(c.alternate, c));
          break;
        default:
          Ea(i, c, r, m, n);
      }
      t = t.sibling;
    }
  }
  function yn(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e,
          a = t,
          n = a.flags;
        switch (a.tag) {
          case 22:
            (yn(l, a), n & 2048 && Gc(a.alternate, a));
            break;
          case 24:
            (yn(l, a), n & 2048 && Qc(a.alternate, a));
            break;
          default:
            yn(l, a);
        }
        t = t.sibling;
      }
  }
  var xn = 8192;
  function Ta(e, t, l) {
    if (e.subtreeFlags & xn)
      for (e = e.child; e !== null; ) (Mf(e, t, l), (e = e.sibling));
  }
  function Mf(e, t, l) {
    switch (e.tag) {
      case 26:
        (Ta(e, t, l),
          e.flags & xn &&
            e.memoizedState !== null &&
            B0(l, Mt, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        Ta(e, t, l);
        break;
      case 3:
      case 4:
        var a = Mt;
        ((Mt = Qi(e.stateNode.containerInfo)), Ta(e, t, l), (Mt = a));
        break;
      case 22:
        e.memoizedState === null &&
          ((a = e.alternate),
          a !== null && a.memoizedState !== null
            ? ((a = xn), (xn = 16777216), Ta(e, t, l), (xn = a))
            : Ta(e, t, l));
        break;
      default:
        Ta(e, t, l);
    }
  }
  function Rf(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function bn(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          ((Xe = a), Df(a, e));
        }
      Rf(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) (Uf(e), (e = e.sibling));
  }
  function Uf(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (bn(e), e.flags & 2048 && gl(9, e, e.return));
        break;
      case 3:
        bn(e);
        break;
      case 12:
        bn(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Oi(e))
          : bn(e);
        break;
      default:
        bn(e);
    }
  }
  function Oi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          ((Xe = a), Df(a, e));
        }
      Rf(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (gl(8, t, t.return), Oi(t));
          break;
        case 22:
          ((l = t.stateNode),
            l._visibility & 2 && ((l._visibility &= -3), Oi(t)));
          break;
        default:
          Oi(t);
      }
      e = e.sibling;
    }
  }
  function Df(e, t) {
    for (; Xe !== null; ) {
      var l = Xe;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          gl(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          ln(l.memoizedState.cache);
      }
      if (((a = l.child), a !== null)) ((a.return = l), (Xe = a));
      else
        e: for (l = e; Xe !== null; ) {
          a = Xe;
          var n = a.sibling,
            i = a.return;
          if ((zf(a), a === l)) {
            Xe = null;
            break e;
          }
          if (n !== null) {
            ((n.return = i), (Xe = n));
            break e;
          }
          Xe = i;
        }
    }
  }
  var Im = {
      getCacheForType: function (e) {
        var t = Ke(He),
          l = t.data.get(e);
        return (l === void 0 && ((l = e()), t.data.set(e, l)), l);
      },
      cacheSignal: function () {
        return Ke(He).controller.signal;
      },
    },
    Pm = typeof WeakMap == "function" ? WeakMap : Map,
    me = 0,
    Ae = null,
    le = null,
    ue = 0,
    ve = 0,
    gt = null,
    vl = !1,
    Na = !1,
    Xc = !1,
    el = 0,
    Oe = 0,
    yl = 0,
    Fl = 0,
    Vc = 0,
    vt = 0,
    Ca = 0,
    Sn = null,
    ut = null,
    Zc = !1,
    _i = 0,
    wf = 0,
    Mi = 1 / 0,
    Ri = null,
    xl = null,
    Ye = 0,
    bl = null,
    Oa = null,
    tl = 0,
    kc = 0,
    Kc = null,
    Hf = null,
    jn = 0,
    Jc = null;
  function yt() {
    return (me & 2) !== 0 && ue !== 0 ? ue & -ue : O.T !== null ? es() : $s();
  }
  function Bf() {
    if (vt === 0)
      if ((ue & 536870912) === 0 || se) {
        var e = Yn;
        ((Yn <<= 1), (Yn & 3932160) === 0 && (Yn = 262144), (vt = e));
      } else vt = 536870912;
    return ((e = mt.current), e !== null && (e.flags |= 32), vt);
  }
  function ct(e, t, l) {
    (((e === Ae && (ve === 2 || ve === 9)) || e.cancelPendingCommit !== null) &&
      (_a(e, 0), Sl(e, ue, vt, !1)),
      Qa(e, l),
      ((me & 2) === 0 || e !== Ae) &&
        (e === Ae &&
          ((me & 2) === 0 && (Fl |= l), Oe === 4 && Sl(e, ue, vt, !1)),
        Ht(e)));
  }
  function Lf(e, t, l) {
    if ((me & 6) !== 0) throw Error(o(327));
    var a = (!l && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Ga(e, t),
      n = a ? l0(e, t) : $c(e, t, !0),
      i = a;
    do {
      if (n === 0) {
        Na && !a && Sl(e, t, 0, !1);
        break;
      } else {
        if (((l = e.current.alternate), i && !e0(l))) {
          ((n = $c(e, t, !1)), (i = !1));
          continue;
        }
        if (n === 2) {
          if (((i = t), e.errorRecoveryDisabledLanes & i)) var c = 0;
          else
            ((c = e.pendingLanes & -536870913),
              (c = c !== 0 ? c : c & 536870912 ? 536870912 : 0));
          if (c !== 0) {
            t = c;
            e: {
              var r = e;
              n = Sn;
              var m = r.current.memoizedState.isDehydrated;
              if ((m && (_a(r, c).flags |= 256), (c = $c(r, c, !1)), c !== 2)) {
                if (Xc && !m) {
                  ((r.errorRecoveryDisabledLanes |= i), (Fl |= i), (n = 4));
                  break e;
                }
                ((i = ut),
                  (ut = n),
                  i !== null &&
                    (ut === null ? (ut = i) : ut.push.apply(ut, i)));
              }
              n = c;
            }
            if (((i = !1), n !== 2)) continue;
          }
        }
        if (n === 1) {
          (_a(e, 0), Sl(e, t, 0, !0));
          break;
        }
        e: {
          switch (((a = e), (i = n), i)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Sl(a, t, vt, !vl);
              break e;
            case 2:
              ut = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && ((n = _i + 300 - rt()), 10 < n)) {
            if ((Sl(a, t, vt, !vl), Qn(a, 0, !0) !== 0)) break e;
            ((tl = t),
              (a.timeoutHandle = pd(
                qf.bind(
                  null,
                  a,
                  l,
                  ut,
                  Ri,
                  Zc,
                  t,
                  vt,
                  Fl,
                  Ca,
                  vl,
                  i,
                  "Throttled",
                  -0,
                  0,
                ),
                n,
              )));
            break e;
          }
          qf(a, l, ut, Ri, Zc, t, vt, Fl, Ca, vl, i, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Ht(e);
  }
  function qf(e, t, l, a, n, i, c, r, m, S, C, M, j, z) {
    if (
      ((e.timeoutHandle = -1),
      (M = t.subtreeFlags),
      M & 8192 || (M & 16785408) === 16785408)
    ) {
      ((M = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Yt,
      }),
        Mf(t, i, M));
      var q =
        (i & 62914560) === i ? _i - rt() : (i & 4194048) === i ? wf - rt() : 0;
      if (((q = L0(M, q)), q !== null)) {
        ((tl = i),
          (e.cancelPendingCommit = q(
            Kf.bind(null, e, t, i, l, a, n, c, r, m, C, M, null, j, z),
          )),
          Sl(e, i, c, !S));
        return;
      }
    }
    Kf(e, t, i, l, a, n, c, r, m);
  }
  function e0(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        t.flags & 16384 &&
        ((l = t.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var a = 0; a < l.length; a++) {
          var n = l[a],
            i = n.getSnapshot;
          n = n.value;
          try {
            if (!dt(i(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (((l = t.child), t.subtreeFlags & 16384 && l !== null))
        ((l.return = t), (t = l));
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function Sl(e, t, l, a) {
    ((t &= ~Vc),
      (t &= ~Fl),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      a && (e.warmLanes |= t),
      (a = e.expirationTimes));
    for (var n = t; 0 < n; ) {
      var i = 31 - ft(n),
        c = 1 << i;
      ((a[i] = -1), (n &= ~c));
    }
    l !== 0 && Ks(e, l, t);
  }
  function Ui() {
    return (me & 6) === 0 ? (An(0), !1) : !0;
  }
  function Wc() {
    if (le !== null) {
      if (ve === 0) var e = le.return;
      else ((e = le), (Vt = Ql = null), fc(e), (ba = null), (nn = 0), (e = le));
      for (; e !== null; ) (gf(e.alternate, e), (e = e.return));
      le = null;
    }
  }
  function _a(e, t) {
    var l = e.timeoutHandle;
    (l !== -1 && ((e.timeoutHandle = -1), b0(l)),
      (l = e.cancelPendingCommit),
      l !== null && ((e.cancelPendingCommit = null), l()),
      (tl = 0),
      Wc(),
      (Ae = e),
      (le = l = Qt(e.current, null)),
      (ue = t),
      (ve = 0),
      (gt = null),
      (vl = !1),
      (Na = Ga(e, t)),
      (Xc = !1),
      (Ca = vt = Vc = Fl = yl = Oe = 0),
      (ut = Sn = null),
      (Zc = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var n = 31 - ft(a),
          i = 1 << n;
        ((t |= e[n]), (a &= ~i));
      }
    return ((el = t), ei(), l);
  }
  function Yf(e, t) {
    ((I = null),
      (O.H = hn),
      t === xa || t === si
        ? ((t = eo()), (ve = 3))
        : t === Pu
          ? ((t = eo()), (ve = 4))
          : (ve =
              t === Nc
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (gt = t),
      le === null && ((Oe = 1), ji(e, At(t, e.current))));
  }
  function Gf() {
    var e = mt.current;
    return e === null
      ? !0
      : (ue & 4194048) === ue
        ? Nt === null
        : (ue & 62914560) === ue || (ue & 536870912) !== 0
          ? e === Nt
          : !1;
  }
  function Qf() {
    var e = O.H;
    return ((O.H = hn), e === null ? hn : e);
  }
  function Xf() {
    var e = O.A;
    return ((O.A = Im), e);
  }
  function Di() {
    ((Oe = 4),
      vl || ((ue & 4194048) !== ue && mt.current !== null) || (Na = !0),
      ((yl & 134217727) === 0 && (Fl & 134217727) === 0) ||
        Ae === null ||
        Sl(Ae, ue, vt, !1));
  }
  function $c(e, t, l) {
    var a = me;
    me |= 2;
    var n = Qf(),
      i = Xf();
    ((Ae !== e || ue !== t) && ((Ri = null), _a(e, t)), (t = !1));
    var c = Oe;
    e: do
      try {
        if (ve !== 0 && le !== null) {
          var r = le,
            m = gt;
          switch (ve) {
            case 8:
              (Wc(), (c = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              mt.current === null && (t = !0);
              var S = ve;
              if (((ve = 0), (gt = null), Ma(e, r, m, S), l && Na)) {
                c = 0;
                break e;
              }
              break;
            default:
              ((S = ve), (ve = 0), (gt = null), Ma(e, r, m, S));
          }
        }
        (t0(), (c = Oe));
        break;
      } catch (C) {
        Yf(e, C);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Vt = Ql = null),
      (me = a),
      (O.H = n),
      (O.A = i),
      le === null && ((Ae = null), (ue = 0), ei()),
      c
    );
  }
  function t0() {
    for (; le !== null; ) Vf(le);
  }
  function l0(e, t) {
    var l = me;
    me |= 2;
    var a = Qf(),
      n = Xf();
    Ae !== e || ue !== t
      ? ((Ri = null), (Mi = rt() + 500), _a(e, t))
      : (Na = Ga(e, t));
    e: do
      try {
        if (ve !== 0 && le !== null) {
          t = le;
          var i = gt;
          t: switch (ve) {
            case 1:
              ((ve = 0), (gt = null), Ma(e, t, i, 1));
              break;
            case 2:
            case 9:
              if (Ir(i)) {
                ((ve = 0), (gt = null), Zf(t));
                break;
              }
              ((t = function () {
                ((ve !== 2 && ve !== 9) || Ae !== e || (ve = 7), Ht(e));
              }),
                i.then(t, t));
              break e;
            case 3:
              ve = 7;
              break e;
            case 4:
              ve = 5;
              break e;
            case 7:
              Ir(i)
                ? ((ve = 0), (gt = null), Zf(t))
                : ((ve = 0), (gt = null), Ma(e, t, i, 7));
              break;
            case 5:
              var c = null;
              switch (le.tag) {
                case 26:
                  c = le.memoizedState;
                case 5:
                case 27:
                  var r = le;
                  if (c ? _d(c) : r.stateNode.complete) {
                    ((ve = 0), (gt = null));
                    var m = r.sibling;
                    if (m !== null) le = m;
                    else {
                      var S = r.return;
                      S !== null ? ((le = S), wi(S)) : (le = null);
                    }
                    break t;
                  }
              }
              ((ve = 0), (gt = null), Ma(e, t, i, 5));
              break;
            case 6:
              ((ve = 0), (gt = null), Ma(e, t, i, 6));
              break;
            case 8:
              (Wc(), (Oe = 6));
              break e;
            default:
              throw Error(o(462));
          }
        }
        a0();
        break;
      } catch (C) {
        Yf(e, C);
      }
    while (!0);
    return (
      (Vt = Ql = null),
      (O.H = a),
      (O.A = n),
      (me = l),
      le !== null ? 0 : ((Ae = null), (ue = 0), ei(), Oe)
    );
  }
  function a0() {
    for (; le !== null && !Th(); ) Vf(le);
  }
  function Vf(e) {
    var t = mf(e.alternate, e, el);
    ((e.memoizedProps = e.pendingProps), t === null ? wi(e) : (le = t));
  }
  function Zf(e) {
    var t = e,
      l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = sf(l, t, t.pendingProps, t.type, void 0, ue);
        break;
      case 11:
        t = sf(l, t, t.pendingProps, t.type.render, t.ref, ue);
        break;
      case 5:
        fc(t);
      default:
        (gf(l, t), (t = le = Gr(t, el)), (t = mf(l, t, el)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? wi(e) : (le = t));
  }
  function Ma(e, t, l, a) {
    ((Vt = Ql = null), fc(t), (ba = null), (nn = 0));
    var n = t.return;
    try {
      if (Zm(e, n, t, l, ue)) {
        ((Oe = 1), ji(e, At(l, e.current)), (le = null));
        return;
      }
    } catch (i) {
      if (n !== null) throw ((le = n), i);
      ((Oe = 1), ji(e, At(l, e.current)), (le = null));
      return;
    }
    t.flags & 32768
      ? (se || a === 1
          ? (e = !0)
          : Na || (ue & 536870912) !== 0
            ? (e = !1)
            : ((vl = e = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = mt.current),
                a !== null && a.tag === 13 && (a.flags |= 16384))),
        kf(t, e))
      : wi(t);
  }
  function wi(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        kf(t, vl);
        return;
      }
      e = t.return;
      var l = Jm(t.alternate, t, el);
      if (l !== null) {
        le = l;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        le = t;
        return;
      }
      le = t = e;
    } while (t !== null);
    Oe === 0 && (Oe = 5);
  }
  function kf(e, t) {
    do {
      var l = Wm(e.alternate, e);
      if (l !== null) {
        ((l.flags &= 32767), (le = l));
        return;
      }
      if (
        ((l = e.return),
        l !== null &&
          ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        le = e;
        return;
      }
      le = e = l;
    } while (e !== null);
    ((Oe = 6), (le = null));
  }
  function Kf(e, t, l, a, n, i, c, r, m) {
    e.cancelPendingCommit = null;
    do Hi();
    while (Ye !== 0);
    if ((me & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (
        ((i = t.lanes | t.childLanes),
        (i |= Lu),
        Hh(e, l, i, c, r, m),
        e === Ae && ((le = Ae = null), (ue = 0)),
        (Oa = t),
        (bl = e),
        (tl = l),
        (kc = i),
        (Kc = n),
        (Hf = a),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            c0(Ln, function () {
              return (If(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (a = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || a)
      ) {
        ((a = O.T), (O.T = null), (n = B.p), (B.p = 2), (c = me), (me |= 4));
        try {
          $m(e, t, l);
        } finally {
          ((me = c), (B.p = n), (O.T = a));
        }
      }
      ((Ye = 1), Jf(), Wf(), $f());
    }
  }
  function Jf() {
    if (Ye === 1) {
      Ye = 0;
      var e = bl,
        t = Oa,
        l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        ((l = O.T), (O.T = null));
        var a = B.p;
        B.p = 2;
        var n = me;
        me |= 4;
        try {
          Cf(t, e);
          var i = ss,
            c = Rr(e.containerInfo),
            r = i.focusedElem,
            m = i.selectionRange;
          if (
            c !== r &&
            r &&
            r.ownerDocument &&
            Mr(r.ownerDocument.documentElement, r)
          ) {
            if (m !== null && Uu(r)) {
              var S = m.start,
                C = m.end;
              if ((C === void 0 && (C = S), "selectionStart" in r))
                ((r.selectionStart = S),
                  (r.selectionEnd = Math.min(C, r.value.length)));
              else {
                var M = r.ownerDocument || document,
                  j = (M && M.defaultView) || window;
                if (j.getSelection) {
                  var z = j.getSelection(),
                    q = r.textContent.length,
                    k = Math.min(m.start, q),
                    Se = m.end === void 0 ? k : Math.min(m.end, q);
                  !z.extend && k > Se && ((c = Se), (Se = k), (k = c));
                  var y = _r(r, k),
                    g = _r(r, Se);
                  if (
                    y &&
                    g &&
                    (z.rangeCount !== 1 ||
                      z.anchorNode !== y.node ||
                      z.anchorOffset !== y.offset ||
                      z.focusNode !== g.node ||
                      z.focusOffset !== g.offset)
                  ) {
                    var b = M.createRange();
                    (b.setStart(y.node, y.offset),
                      z.removeAllRanges(),
                      k > Se
                        ? (z.addRange(b), z.extend(g.node, g.offset))
                        : (b.setEnd(g.node, g.offset), z.addRange(b)));
                  }
                }
              }
            }
            for (M = [], z = r; (z = z.parentNode); )
              z.nodeType === 1 &&
                M.push({ element: z, left: z.scrollLeft, top: z.scrollTop });
            for (
              typeof r.focus == "function" && r.focus(), r = 0;
              r < M.length;
              r++
            ) {
              var _ = M[r];
              ((_.element.scrollLeft = _.left), (_.element.scrollTop = _.top));
            }
          }
          ((Ji = !!cs), (ss = cs = null));
        } finally {
          ((me = n), (B.p = a), (O.T = l));
        }
      }
      ((e.current = t), (Ye = 2));
    }
  }
  function Wf() {
    if (Ye === 2) {
      Ye = 0;
      var e = bl,
        t = Oa,
        l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        ((l = O.T), (O.T = null));
        var a = B.p;
        B.p = 2;
        var n = me;
        me |= 4;
        try {
          Af(e, t.alternate, t);
        } finally {
          ((me = n), (B.p = a), (O.T = l));
        }
      }
      Ye = 3;
    }
  }
  function $f() {
    if (Ye === 4 || Ye === 3) {
      ((Ye = 0), Nh());
      var e = bl,
        t = Oa,
        l = tl,
        a = Hf;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Ye = 5)
        : ((Ye = 0), (Oa = bl = null), Ff(e, e.pendingLanes));
      var n = e.pendingLanes;
      if (
        (n === 0 && (xl = null),
        mu(l),
        (t = t.stateNode),
        ot && typeof ot.onCommitFiberRoot == "function")
      )
        try {
          ot.onCommitFiberRoot(Ya, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        ((t = O.T), (n = B.p), (B.p = 2), (O.T = null));
        try {
          for (var i = e.onRecoverableError, c = 0; c < a.length; c++) {
            var r = a[c];
            i(r.value, { componentStack: r.stack });
          }
        } finally {
          ((O.T = t), (B.p = n));
        }
      }
      ((tl & 3) !== 0 && Hi(),
        Ht(e),
        (n = e.pendingLanes),
        (l & 261930) !== 0 && (n & 42) !== 0
          ? e === Jc
            ? jn++
            : ((jn = 0), (Jc = e))
          : (jn = 0),
        An(0));
    }
  }
  function Ff(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), ln(t)));
  }
  function Hi() {
    return (Jf(), Wf(), $f(), If());
  }
  function If() {
    if (Ye !== 5) return !1;
    var e = bl,
      t = kc;
    kc = 0;
    var l = mu(tl),
      a = O.T,
      n = B.p;
    try {
      ((B.p = 32 > l ? 32 : l), (O.T = null), (l = Kc), (Kc = null));
      var i = bl,
        c = tl;
      if (((Ye = 0), (Oa = bl = null), (tl = 0), (me & 6) !== 0))
        throw Error(o(331));
      var r = me;
      if (
        ((me |= 4),
        Uf(i.current),
        _f(i, i.current, c, l),
        (me = r),
        An(0, !1),
        ot && typeof ot.onPostCommitFiberRoot == "function")
      )
        try {
          ot.onPostCommitFiberRoot(Ya, i);
        } catch {}
      return !0;
    } finally {
      ((B.p = n), (O.T = a), Ff(e, t));
    }
  }
  function Pf(e, t, l) {
    ((t = At(l, t)),
      (t = Tc(e.stateNode, t, 2)),
      (e = hl(e, t, 2)),
      e !== null && (Qa(e, 2), Ht(e)));
  }
  function ye(e, t, l) {
    if (e.tag === 3) Pf(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Pf(t, e, l);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (xl === null || !xl.has(a)))
          ) {
            ((e = At(l, e)),
              (l = Po(2)),
              (a = hl(t, l, 2)),
              a !== null && (ef(l, a, t, e), Qa(a, 2), Ht(a)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Fc(e, t, l) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new Pm();
      var n = new Set();
      a.set(t, n);
    } else ((n = a.get(t)), n === void 0 && ((n = new Set()), a.set(t, n)));
    n.has(l) ||
      ((Xc = !0), n.add(l), (e = n0.bind(null, e, t, l)), t.then(e, e));
  }
  function n0(e, t, l) {
    var a = e.pingCache;
    (a !== null && a.delete(t),
      (e.pingedLanes |= e.suspendedLanes & l),
      (e.warmLanes &= ~l),
      Ae === e &&
        (ue & l) === l &&
        (Oe === 4 || (Oe === 3 && (ue & 62914560) === ue && 300 > rt() - _i)
          ? (me & 2) === 0 && _a(e, 0)
          : (Vc |= l),
        Ca === ue && (Ca = 0)),
      Ht(e));
  }
  function ed(e, t) {
    (t === 0 && (t = ks()), (e = ql(e, t)), e !== null && (Qa(e, t), Ht(e)));
  }
  function i0(e) {
    var t = e.memoizedState,
      l = 0;
    (t !== null && (l = t.retryLane), ed(e, l));
  }
  function u0(e, t) {
    var l = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var a = e.stateNode,
          n = e.memoizedState;
        n !== null && (l = n.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    (a !== null && a.delete(t), ed(e, l));
  }
  function c0(e, t) {
    return ou(e, t);
  }
  var Bi = null,
    Ra = null,
    Ic = !1,
    Li = !1,
    Pc = !1,
    jl = 0;
  function Ht(e) {
    (e !== Ra &&
      e.next === null &&
      (Ra === null ? (Bi = Ra = e) : (Ra = Ra.next = e)),
      (Li = !0),
      Ic || ((Ic = !0), r0()));
  }
  function An(e, t) {
    if (!Pc && Li) {
      Pc = !0;
      do
        for (var l = !1, a = Bi; a !== null; ) {
          if (e !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var i = 0;
            else {
              var c = a.suspendedLanes,
                r = a.pingedLanes;
              ((i = (1 << (31 - ft(42 | e) + 1)) - 1),
                (i &= n & ~(c & ~r)),
                (i = i & 201326741 ? (i & 201326741) | 1 : i ? i | 2 : 0));
            }
            i !== 0 && ((l = !0), nd(a, i));
          } else
            ((i = ue),
              (i = Qn(
                a,
                a === Ae ? i : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1,
              )),
              (i & 3) === 0 || Ga(a, i) || ((l = !0), nd(a, i)));
          a = a.next;
        }
      while (l);
      Pc = !1;
    }
  }
  function s0() {
    td();
  }
  function td() {
    Li = Ic = !1;
    var e = 0;
    jl !== 0 && x0() && (e = jl);
    for (var t = rt(), l = null, a = Bi; a !== null; ) {
      var n = a.next,
        i = ld(a, t);
      (i === 0
        ? ((a.next = null),
          l === null ? (Bi = n) : (l.next = n),
          n === null && (Ra = l))
        : ((l = a), (e !== 0 || (i & 3) !== 0) && (Li = !0)),
        (a = n));
    }
    ((Ye !== 0 && Ye !== 5) || An(e), jl !== 0 && (jl = 0));
  }
  function ld(e, t) {
    for (
      var l = e.suspendedLanes,
        a = e.pingedLanes,
        n = e.expirationTimes,
        i = e.pendingLanes & -62914561;
      0 < i;
    ) {
      var c = 31 - ft(i),
        r = 1 << c,
        m = n[c];
      (m === -1
        ? ((r & l) === 0 || (r & a) !== 0) && (n[c] = wh(r, t))
        : m <= t && (e.expiredLanes |= r),
        (i &= ~r));
    }
    if (
      ((t = Ae),
      (l = ue),
      (l = Qn(
        e,
        e === t ? l : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
      )),
      (a = e.callbackNode),
      l === 0 ||
        (e === t && (ve === 2 || ve === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        a !== null && a !== null && fu(a),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((l & 3) === 0 || Ga(e, l)) {
      if (((t = l & -l), t === e.callbackPriority)) return t;
      switch ((a !== null && fu(a), mu(l))) {
        case 2:
        case 8:
          l = Vs;
          break;
        case 32:
          l = Ln;
          break;
        case 268435456:
          l = Zs;
          break;
        default:
          l = Ln;
      }
      return (
        (a = ad.bind(null, e)),
        (l = ou(l, a)),
        (e.callbackPriority = t),
        (e.callbackNode = l),
        t
      );
    }
    return (
      a !== null && a !== null && fu(a),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function ad(e, t) {
    if (Ye !== 0 && Ye !== 5)
      return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var l = e.callbackNode;
    if (Hi() && e.callbackNode !== l) return null;
    var a = ue;
    return (
      (a = Qn(
        e,
        e === Ae ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
      )),
      a === 0
        ? null
        : (Lf(e, a, t),
          ld(e, rt()),
          e.callbackNode != null && e.callbackNode === l
            ? ad.bind(null, e)
            : null)
    );
  }
  function nd(e, t) {
    if (Hi()) return null;
    Lf(e, t, !0);
  }
  function r0() {
    S0(function () {
      (me & 6) !== 0 ? ou(Xs, s0) : td();
    });
  }
  function es() {
    if (jl === 0) {
      var e = va;
      (e === 0 && ((e = qn), (qn <<= 1), (qn & 261888) === 0 && (qn = 256)),
        (jl = e));
    }
    return jl;
  }
  function id(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
        ? e
        : kn("" + e);
  }
  function ud(e, t) {
    var l = t.ownerDocument.createElement("input");
    return (
      (l.name = t.name),
      (l.value = t.value),
      e.id && l.setAttribute("form", e.id),
      t.parentNode.insertBefore(l, t),
      (e = new FormData(e)),
      l.parentNode.removeChild(l),
      e
    );
  }
  function o0(e, t, l, a, n) {
    if (t === "submit" && l && l.stateNode === n) {
      var i = id((n[tt] || null).action),
        c = a.submitter;
      c &&
        ((t = (t = c[tt] || null)
          ? id(t.formAction)
          : c.getAttribute("formAction")),
        t !== null && ((i = t), (c = null)));
      var r = new $n("action", "action", null, a, n);
      e.push({
        event: r,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (jl !== 0) {
                  var m = c ? ud(n, c) : new FormData(n);
                  bc(
                    l,
                    { pending: !0, data: m, method: n.method, action: i },
                    null,
                    m,
                  );
                }
              } else
                typeof i == "function" &&
                  (r.preventDefault(),
                  (m = c ? ud(n, c) : new FormData(n)),
                  bc(
                    l,
                    { pending: !0, data: m, method: n.method, action: i },
                    i,
                    m,
                  ));
            },
            currentTarget: n,
          },
        ],
      });
    }
  }
  for (var ts = 0; ts < Bu.length; ts++) {
    var ls = Bu[ts],
      f0 = ls.toLowerCase(),
      d0 = ls[0].toUpperCase() + ls.slice(1);
    _t(f0, "on" + d0);
  }
  (_t(wr, "onAnimationEnd"),
    _t(Hr, "onAnimationIteration"),
    _t(Br, "onAnimationStart"),
    _t("dblclick", "onDoubleClick"),
    _t("focusin", "onFocus"),
    _t("focusout", "onBlur"),
    _t(Cm, "onTransitionRun"),
    _t(Om, "onTransitionStart"),
    _t(_m, "onTransitionCancel"),
    _t(Lr, "onTransitionEnd"),
    aa("onMouseEnter", ["mouseout", "mouseover"]),
    aa("onMouseLeave", ["mouseout", "mouseover"]),
    aa("onPointerEnter", ["pointerout", "pointerover"]),
    aa("onPointerLeave", ["pointerout", "pointerover"]),
    wl(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    wl(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    wl("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    wl(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    wl(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    wl(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var zn =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    h0 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(zn),
    );
  function cd(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var a = e[l],
        n = a.event;
      a = a.listeners;
      e: {
        var i = void 0;
        if (t)
          for (var c = a.length - 1; 0 <= c; c--) {
            var r = a[c],
              m = r.instance,
              S = r.currentTarget;
            if (((r = r.listener), m !== i && n.isPropagationStopped()))
              break e;
            ((i = r), (n.currentTarget = S));
            try {
              i(n);
            } catch (C) {
              Pn(C);
            }
            ((n.currentTarget = null), (i = m));
          }
        else
          for (c = 0; c < a.length; c++) {
            if (
              ((r = a[c]),
              (m = r.instance),
              (S = r.currentTarget),
              (r = r.listener),
              m !== i && n.isPropagationStopped())
            )
              break e;
            ((i = r), (n.currentTarget = S));
            try {
              i(n);
            } catch (C) {
              Pn(C);
            }
            ((n.currentTarget = null), (i = m));
          }
      }
    }
  }
  function ae(e, t) {
    var l = t[pu];
    l === void 0 && (l = t[pu] = new Set());
    var a = e + "__bubble";
    l.has(a) || (sd(t, e, 2, !1), l.add(a));
  }
  function as(e, t, l) {
    var a = 0;
    (t && (a |= 4), sd(l, e, a, t));
  }
  var qi = "_reactListening" + Math.random().toString(36).slice(2);
  function ns(e) {
    if (!e[qi]) {
      ((e[qi] = !0),
        Ps.forEach(function (l) {
          l !== "selectionchange" && (h0.has(l) || as(l, !1, e), as(l, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[qi] || ((t[qi] = !0), as("selectionchange", !1, t));
    }
  }
  function sd(e, t, l, a) {
    switch (Bd(t)) {
      case 2:
        var n = G0;
        break;
      case 8:
        n = Q0;
        break;
      default:
        n = xs;
    }
    ((l = n.bind(null, t, l, e)),
      (n = void 0),
      !zu ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (n = !0),
      a
        ? n !== void 0
          ? e.addEventListener(t, l, { capture: !0, passive: n })
          : e.addEventListener(t, l, !0)
        : n !== void 0
          ? e.addEventListener(t, l, { passive: n })
          : e.addEventListener(t, l, !1));
  }
  function is(e, t, l, a, n) {
    var i = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (;;) {
        if (a === null) return;
        var c = a.tag;
        if (c === 3 || c === 4) {
          var r = a.stateNode.containerInfo;
          if (r === n) break;
          if (c === 4)
            for (c = a.return; c !== null; ) {
              var m = c.tag;
              if ((m === 3 || m === 4) && c.stateNode.containerInfo === n)
                return;
              c = c.return;
            }
          for (; r !== null; ) {
            if (((c = ea(r)), c === null)) return;
            if (((m = c.tag), m === 5 || m === 6 || m === 26 || m === 27)) {
              a = i = c;
              continue e;
            }
            r = r.parentNode;
          }
        }
        a = a.return;
      }
    fr(function () {
      var S = i,
        C = ju(l),
        M = [];
      e: {
        var j = qr.get(e);
        if (j !== void 0) {
          var z = $n,
            q = e;
          switch (e) {
            case "keypress":
              if (Jn(l) === 0) break e;
            case "keydown":
            case "keyup":
              z = um;
              break;
            case "focusin":
              ((q = "focus"), (z = Cu));
              break;
            case "focusout":
              ((q = "blur"), (z = Cu));
              break;
            case "beforeblur":
            case "afterblur":
              z = Cu;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              z = mr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              z = Jh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              z = rm;
              break;
            case wr:
            case Hr:
            case Br:
              z = Fh;
              break;
            case Lr:
              z = fm;
              break;
            case "scroll":
            case "scrollend":
              z = kh;
              break;
            case "wheel":
              z = hm;
              break;
            case "copy":
            case "cut":
            case "paste":
              z = Ph;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              z = gr;
              break;
            case "toggle":
            case "beforetoggle":
              z = pm;
          }
          var k = (t & 4) !== 0,
            Se = !k && (e === "scroll" || e === "scrollend"),
            y = k ? (j !== null ? j + "Capture" : null) : j;
          k = [];
          for (var g = S, b; g !== null; ) {
            var _ = g;
            if (
              ((b = _.stateNode),
              (_ = _.tag),
              (_ !== 5 && _ !== 26 && _ !== 27) ||
                b === null ||
                y === null ||
                ((_ = Za(g, y)), _ != null && k.push(En(g, _, b))),
              Se)
            )
              break;
            g = g.return;
          }
          0 < k.length &&
            ((j = new z(j, q, null, l, C)), M.push({ event: j, listeners: k }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((j = e === "mouseover" || e === "pointerover"),
            (z = e === "mouseout" || e === "pointerout"),
            j &&
              l !== Su &&
              (q = l.relatedTarget || l.fromElement) &&
              (ea(q) || q[Pl]))
          )
            break e;
          if (
            (z || j) &&
            ((j =
              C.window === C
                ? C
                : (j = C.ownerDocument)
                  ? j.defaultView || j.parentWindow
                  : window),
            z
              ? ((q = l.relatedTarget || l.toElement),
                (z = S),
                (q = q ? ea(q) : null),
                q !== null &&
                  ((Se = x(q)),
                  (k = q.tag),
                  q !== Se || (k !== 5 && k !== 27 && k !== 6)) &&
                  (q = null))
              : ((z = null), (q = S)),
            z !== q)
          ) {
            if (
              ((k = mr),
              (_ = "onMouseLeave"),
              (y = "onMouseEnter"),
              (g = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((k = gr),
                (_ = "onPointerLeave"),
                (y = "onPointerEnter"),
                (g = "pointer")),
              (Se = z == null ? j : Va(z)),
              (b = q == null ? j : Va(q)),
              (j = new k(_, g + "leave", z, l, C)),
              (j.target = Se),
              (j.relatedTarget = b),
              (_ = null),
              ea(C) === S &&
                ((k = new k(y, g + "enter", q, l, C)),
                (k.target = b),
                (k.relatedTarget = Se),
                (_ = k)),
              (Se = _),
              z && q)
            )
              t: {
                for (k = m0, y = z, g = q, b = 0, _ = y; _; _ = k(_)) b++;
                _ = 0;
                for (var X = g; X; X = k(X)) _++;
                for (; 0 < b - _; ) ((y = k(y)), b--);
                for (; 0 < _ - b; ) ((g = k(g)), _--);
                for (; b--; ) {
                  if (y === g || (g !== null && y === g.alternate)) {
                    k = y;
                    break t;
                  }
                  ((y = k(y)), (g = k(g)));
                }
                k = null;
              }
            else k = null;
            (z !== null && rd(M, j, z, k, !1),
              q !== null && Se !== null && rd(M, Se, q, k, !0));
          }
        }
        e: {
          if (
            ((j = S ? Va(S) : window),
            (z = j.nodeName && j.nodeName.toLowerCase()),
            z === "select" || (z === "input" && j.type === "file"))
          )
            var fe = zr;
          else if (jr(j))
            if (Er) fe = Em;
            else {
              fe = Am;
              var G = jm;
            }
          else
            ((z = j.nodeName),
              !z ||
              z.toLowerCase() !== "input" ||
              (j.type !== "checkbox" && j.type !== "radio")
                ? S && bu(S.elementType) && (fe = zr)
                : (fe = zm));
          if (fe && (fe = fe(e, S))) {
            Ar(M, fe, l, C);
            break e;
          }
          (G && G(e, j, S),
            e === "focusout" &&
              S &&
              j.type === "number" &&
              S.memoizedProps.value != null &&
              xu(j, "number", j.value));
        }
        switch (((G = S ? Va(S) : window), e)) {
          case "focusin":
            (jr(G) || G.contentEditable === "true") &&
              ((ra = G), (Du = S), (Pa = null));
            break;
          case "focusout":
            Pa = Du = ra = null;
            break;
          case "mousedown":
            wu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((wu = !1), Ur(M, l, C));
            break;
          case "selectionchange":
            if (Nm) break;
          case "keydown":
          case "keyup":
            Ur(M, l, C);
        }
        var P;
        if (_u)
          e: {
            switch (e) {
              case "compositionstart":
                var ce = "onCompositionStart";
                break e;
              case "compositionend":
                ce = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ce = "onCompositionUpdate";
                break e;
            }
            ce = void 0;
          }
        else
          sa
            ? br(e, l) && (ce = "onCompositionEnd")
            : e === "keydown" &&
              l.keyCode === 229 &&
              (ce = "onCompositionStart");
        (ce &&
          (vr &&
            l.locale !== "ko" &&
            (sa || ce !== "onCompositionStart"
              ? ce === "onCompositionEnd" && sa && (P = dr())
              : ((ul = C),
                (Eu = "value" in ul ? ul.value : ul.textContent),
                (sa = !0))),
          (G = Yi(S, ce)),
          0 < G.length &&
            ((ce = new pr(ce, e, null, l, C)),
            M.push({ event: ce, listeners: G }),
            P ? (ce.data = P) : ((P = Sr(l)), P !== null && (ce.data = P)))),
          (P = vm ? ym(e, l) : xm(e, l)) &&
            ((ce = Yi(S, "onBeforeInput")),
            0 < ce.length &&
              ((G = new pr("onBeforeInput", "beforeinput", null, l, C)),
              M.push({ event: G, listeners: ce }),
              (G.data = P))),
          o0(M, e, S, l, C));
      }
      cd(M, t);
    });
  }
  function En(e, t, l) {
    return { instance: e, listener: t, currentTarget: l };
  }
  function Yi(e, t) {
    for (var l = t + "Capture", a = []; e !== null; ) {
      var n = e,
        i = n.stateNode;
      if (
        ((n = n.tag),
        (n !== 5 && n !== 26 && n !== 27) ||
          i === null ||
          ((n = Za(e, l)),
          n != null && a.unshift(En(e, n, i)),
          (n = Za(e, t)),
          n != null && a.push(En(e, n, i))),
        e.tag === 3)
      )
        return a;
      e = e.return;
    }
    return [];
  }
  function m0(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function rd(e, t, l, a, n) {
    for (var i = t._reactName, c = []; l !== null && l !== a; ) {
      var r = l,
        m = r.alternate,
        S = r.stateNode;
      if (((r = r.tag), m !== null && m === a)) break;
      ((r !== 5 && r !== 26 && r !== 27) ||
        S === null ||
        ((m = S),
        n
          ? ((S = Za(l, i)), S != null && c.unshift(En(l, S, m)))
          : n || ((S = Za(l, i)), S != null && c.push(En(l, S, m)))),
        (l = l.return));
    }
    c.length !== 0 && e.push({ event: t, listeners: c });
  }
  var p0 = /\r\n?/g,
    g0 = /\u0000|\uFFFD/g;
  function od(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        p0,
        `
`,
      )
      .replace(g0, "");
  }
  function fd(e, t) {
    return ((t = od(t)), od(e) === t);
  }
  function be(e, t, l, a, n, i) {
    switch (l) {
      case "children":
        typeof a == "string"
          ? t === "body" || (t === "textarea" && a === "") || ia(e, a)
          : (typeof a == "number" || typeof a == "bigint") &&
            t !== "body" &&
            ia(e, "" + a);
        break;
      case "className":
        Vn(e, "class", a);
        break;
      case "tabIndex":
        Vn(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Vn(e, l, a);
        break;
      case "style":
        rr(e, a, i);
        break;
      case "data":
        if (t !== "object") {
          Vn(e, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || l !== "href")) {
          e.removeAttribute(l);
          break;
        }
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "symbol" ||
          typeof a == "boolean"
        ) {
          e.removeAttribute(l);
          break;
        }
        ((a = kn("" + a)), e.setAttribute(l, a));
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof i == "function" &&
            (l === "formAction"
              ? (t !== "input" && be(e, t, "name", n.name, n, null),
                be(e, t, "formEncType", n.formEncType, n, null),
                be(e, t, "formMethod", n.formMethod, n, null),
                be(e, t, "formTarget", n.formTarget, n, null))
              : (be(e, t, "encType", n.encType, n, null),
                be(e, t, "method", n.method, n, null),
                be(e, t, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(l);
          break;
        }
        ((a = kn("" + a)), e.setAttribute(l, a));
        break;
      case "onClick":
        a != null && (e.onclick = Yt);
        break;
      case "onScroll":
        a != null && ae("scroll", e);
        break;
      case "onScrollEnd":
        a != null && ae("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(o(61));
          if (((l = a.__html), l != null)) {
            if (n.children != null) throw Error(o(60));
            e.innerHTML = l;
          }
        }
        break;
      case "multiple":
        e.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        e.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "boolean" ||
          typeof a == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        ((l = kn("" + a)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol"
          ? e.setAttribute(l, "" + a)
          : e.removeAttribute(l);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol"
          ? e.setAttribute(l, "")
          : e.removeAttribute(l);
        break;
      case "capture":
      case "download":
        a === !0
          ? e.setAttribute(l, "")
          : a !== !1 &&
              a != null &&
              typeof a != "function" &&
              typeof a != "symbol"
            ? e.setAttribute(l, a)
            : e.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null &&
        typeof a != "function" &&
        typeof a != "symbol" &&
        !isNaN(a) &&
        1 <= a
          ? e.setAttribute(l, a)
          : e.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
          ? e.removeAttribute(l)
          : e.setAttribute(l, a);
        break;
      case "popover":
        (ae("beforetoggle", e), ae("toggle", e), Xn(e, "popover", a));
        break;
      case "xlinkActuate":
        qt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        qt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        qt(e, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        qt(e, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        qt(e, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        qt(e, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        qt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        qt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        qt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        Xn(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) ||
          (l[0] !== "o" && l[0] !== "O") ||
          (l[1] !== "n" && l[1] !== "N")) &&
          ((l = Vh.get(l) || l), Xn(e, l, a));
    }
  }
  function us(e, t, l, a, n, i) {
    switch (l) {
      case "style":
        rr(e, a, i);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(o(61));
          if (((l = a.__html), l != null)) {
            if (n.children != null) throw Error(o(60));
            e.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof a == "string"
          ? ia(e, a)
          : (typeof a == "number" || typeof a == "bigint") && ia(e, "" + a);
        break;
      case "onScroll":
        a != null && ae("scroll", e);
        break;
      case "onScrollEnd":
        a != null && ae("scrollend", e);
        break;
      case "onClick":
        a != null && (e.onclick = Yt);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!er.hasOwnProperty(l))
          e: {
            if (
              l[0] === "o" &&
              l[1] === "n" &&
              ((n = l.endsWith("Capture")),
              (t = l.slice(2, n ? l.length - 7 : void 0)),
              (i = e[tt] || null),
              (i = i != null ? i[l] : null),
              typeof i == "function" && e.removeEventListener(t, i, n),
              typeof a == "function")
            ) {
              (typeof i != "function" &&
                i !== null &&
                (l in e
                  ? (e[l] = null)
                  : e.hasAttribute(l) && e.removeAttribute(l)),
                e.addEventListener(t, a, n));
              break e;
            }
            l in e
              ? (e[l] = a)
              : a === !0
                ? e.setAttribute(l, "")
                : Xn(e, l, a);
          }
    }
  }
  function We(e, t, l) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (ae("error", e), ae("load", e));
        var a = !1,
          n = !1,
          i;
        for (i in l)
          if (l.hasOwnProperty(i)) {
            var c = l[i];
            if (c != null)
              switch (i) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, t));
                default:
                  be(e, t, i, c, l, null);
              }
          }
        (n && be(e, t, "srcSet", l.srcSet, l, null),
          a && be(e, t, "src", l.src, l, null));
        return;
      case "input":
        ae("invalid", e);
        var r = (i = c = n = null),
          m = null,
          S = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var C = l[a];
            if (C != null)
              switch (a) {
                case "name":
                  n = C;
                  break;
                case "type":
                  c = C;
                  break;
                case "checked":
                  m = C;
                  break;
                case "defaultChecked":
                  S = C;
                  break;
                case "value":
                  i = C;
                  break;
                case "defaultValue":
                  r = C;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (C != null) throw Error(o(137, t));
                  break;
                default:
                  be(e, t, a, C, l, null);
              }
          }
        ir(e, i, r, m, S, c, n, !1);
        return;
      case "select":
        (ae("invalid", e), (a = c = i = null));
        for (n in l)
          if (l.hasOwnProperty(n) && ((r = l[n]), r != null))
            switch (n) {
              case "value":
                i = r;
                break;
              case "defaultValue":
                c = r;
                break;
              case "multiple":
                a = r;
              default:
                be(e, t, n, r, l, null);
            }
        ((t = i),
          (l = c),
          (e.multiple = !!a),
          t != null ? na(e, !!a, t, !1) : l != null && na(e, !!a, l, !0));
        return;
      case "textarea":
        (ae("invalid", e), (i = n = a = null));
        for (c in l)
          if (l.hasOwnProperty(c) && ((r = l[c]), r != null))
            switch (c) {
              case "value":
                a = r;
                break;
              case "defaultValue":
                n = r;
                break;
              case "children":
                i = r;
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(o(91));
                break;
              default:
                be(e, t, c, r, l, null);
            }
        cr(e, a, n, i);
        return;
      case "option":
        for (m in l)
          l.hasOwnProperty(m) &&
            ((a = l[m]), a != null) &&
            (m === "selected"
              ? (e.selected =
                  a && typeof a != "function" && typeof a != "symbol")
              : be(e, t, m, a, l, null));
        return;
      case "dialog":
        (ae("beforetoggle", e),
          ae("toggle", e),
          ae("cancel", e),
          ae("close", e));
        break;
      case "iframe":
      case "object":
        ae("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < zn.length; a++) ae(zn[a], e);
        break;
      case "image":
        (ae("error", e), ae("load", e));
        break;
      case "details":
        ae("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        (ae("error", e), ae("load", e));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (S in l)
          if (l.hasOwnProperty(S) && ((a = l[S]), a != null))
            switch (S) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                be(e, t, S, a, l, null);
            }
        return;
      default:
        if (bu(t)) {
          for (C in l)
            l.hasOwnProperty(C) &&
              ((a = l[C]), a !== void 0 && us(e, t, C, a, l, void 0));
          return;
        }
    }
    for (r in l)
      l.hasOwnProperty(r) && ((a = l[r]), a != null && be(e, t, r, a, l, null));
  }
  function v0(e, t, l, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var n = null,
          i = null,
          c = null,
          r = null,
          m = null,
          S = null,
          C = null;
        for (z in l) {
          var M = l[z];
          if (l.hasOwnProperty(z) && M != null)
            switch (z) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                m = M;
              default:
                a.hasOwnProperty(z) || be(e, t, z, null, a, M);
            }
        }
        for (var j in a) {
          var z = a[j];
          if (((M = l[j]), a.hasOwnProperty(j) && (z != null || M != null)))
            switch (j) {
              case "type":
                i = z;
                break;
              case "name":
                n = z;
                break;
              case "checked":
                S = z;
                break;
              case "defaultChecked":
                C = z;
                break;
              case "value":
                c = z;
                break;
              case "defaultValue":
                r = z;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (z != null) throw Error(o(137, t));
                break;
              default:
                z !== M && be(e, t, j, z, a, M);
            }
        }
        yu(e, c, r, m, S, C, i, n);
        return;
      case "select":
        z = c = r = j = null;
        for (i in l)
          if (((m = l[i]), l.hasOwnProperty(i) && m != null))
            switch (i) {
              case "value":
                break;
              case "multiple":
                z = m;
              default:
                a.hasOwnProperty(i) || be(e, t, i, null, a, m);
            }
        for (n in a)
          if (
            ((i = a[n]),
            (m = l[n]),
            a.hasOwnProperty(n) && (i != null || m != null))
          )
            switch (n) {
              case "value":
                j = i;
                break;
              case "defaultValue":
                r = i;
                break;
              case "multiple":
                c = i;
              default:
                i !== m && be(e, t, n, i, a, m);
            }
        ((t = r),
          (l = c),
          (a = z),
          j != null
            ? na(e, !!l, j, !1)
            : !!a != !!l &&
              (t != null ? na(e, !!l, t, !0) : na(e, !!l, l ? [] : "", !1)));
        return;
      case "textarea":
        z = j = null;
        for (r in l)
          if (
            ((n = l[r]),
            l.hasOwnProperty(r) && n != null && !a.hasOwnProperty(r))
          )
            switch (r) {
              case "value":
                break;
              case "children":
                break;
              default:
                be(e, t, r, null, a, n);
            }
        for (c in a)
          if (
            ((n = a[c]),
            (i = l[c]),
            a.hasOwnProperty(c) && (n != null || i != null))
          )
            switch (c) {
              case "value":
                j = n;
                break;
              case "defaultValue":
                z = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(o(91));
                break;
              default:
                n !== i && be(e, t, c, n, a, i);
            }
        ur(e, j, z);
        return;
      case "option":
        for (var q in l)
          ((j = l[q]),
            l.hasOwnProperty(q) &&
              j != null &&
              !a.hasOwnProperty(q) &&
              (q === "selected" ? (e.selected = !1) : be(e, t, q, null, a, j)));
        for (m in a)
          ((j = a[m]),
            (z = l[m]),
            a.hasOwnProperty(m) &&
              j !== z &&
              (j != null || z != null) &&
              (m === "selected"
                ? (e.selected =
                    j && typeof j != "function" && typeof j != "symbol")
                : be(e, t, m, j, a, z)));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var k in l)
          ((j = l[k]),
            l.hasOwnProperty(k) &&
              j != null &&
              !a.hasOwnProperty(k) &&
              be(e, t, k, null, a, j));
        for (S in a)
          if (
            ((j = a[S]),
            (z = l[S]),
            a.hasOwnProperty(S) && j !== z && (j != null || z != null))
          )
            switch (S) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (j != null) throw Error(o(137, t));
                break;
              default:
                be(e, t, S, j, a, z);
            }
        return;
      default:
        if (bu(t)) {
          for (var Se in l)
            ((j = l[Se]),
              l.hasOwnProperty(Se) &&
                j !== void 0 &&
                !a.hasOwnProperty(Se) &&
                us(e, t, Se, void 0, a, j));
          for (C in a)
            ((j = a[C]),
              (z = l[C]),
              !a.hasOwnProperty(C) ||
                j === z ||
                (j === void 0 && z === void 0) ||
                us(e, t, C, j, a, z));
          return;
        }
    }
    for (var y in l)
      ((j = l[y]),
        l.hasOwnProperty(y) &&
          j != null &&
          !a.hasOwnProperty(y) &&
          be(e, t, y, null, a, j));
    for (M in a)
      ((j = a[M]),
        (z = l[M]),
        !a.hasOwnProperty(M) ||
          j === z ||
          (j == null && z == null) ||
          be(e, t, M, j, a, z));
  }
  function dd(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function y0() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var e = 0, t = 0, l = performance.getEntriesByType("resource"), a = 0;
        a < l.length;
        a++
      ) {
        var n = l[a],
          i = n.transferSize,
          c = n.initiatorType,
          r = n.duration;
        if (i && r && dd(c)) {
          for (c = 0, r = n.responseEnd, a += 1; a < l.length; a++) {
            var m = l[a],
              S = m.startTime;
            if (S > r) break;
            var C = m.transferSize,
              M = m.initiatorType;
            C &&
              dd(M) &&
              ((m = m.responseEnd), (c += C * (m < r ? 1 : (r - S) / (m - S))));
          }
          if ((--a, (t += (8 * (i + c)) / (n.duration / 1e3)), e++, 10 < e))
            break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection &&
      ((e = navigator.connection.downlink), typeof e == "number")
      ? e
      : 5;
  }
  var cs = null,
    ss = null;
  function Gi(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function hd(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function md(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function rs(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var os = null;
  function x0() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === os
        ? !1
        : ((os = e), !0)
      : ((os = null), !1);
  }
  var pd = typeof setTimeout == "function" ? setTimeout : void 0,
    b0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    gd = typeof Promise == "function" ? Promise : void 0,
    S0 =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof gd < "u"
          ? function (e) {
              return gd.resolve(null).then(e).catch(j0);
            }
          : pd;
  function j0(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Al(e) {
    return e === "head";
  }
  function vd(e, t) {
    var l = t,
      a = 0;
    do {
      var n = l.nextSibling;
      if ((e.removeChild(l), n && n.nodeType === 8))
        if (((l = n.data), l === "/$" || l === "/&")) {
          if (a === 0) {
            (e.removeChild(n), Ha(t));
            return;
          }
          a--;
        } else if (
          l === "$" ||
          l === "$?" ||
          l === "$~" ||
          l === "$!" ||
          l === "&"
        )
          a++;
        else if (l === "html") Tn(e.ownerDocument.documentElement);
        else if (l === "head") {
          ((l = e.ownerDocument.head), Tn(l));
          for (var i = l.firstChild; i; ) {
            var c = i.nextSibling,
              r = i.nodeName;
            (i[Xa] ||
              r === "SCRIPT" ||
              r === "STYLE" ||
              (r === "LINK" && i.rel.toLowerCase() === "stylesheet") ||
              l.removeChild(i),
              (i = c));
          }
        } else l === "body" && Tn(e.ownerDocument.body);
      l = n;
    } while (l);
    Ha(t);
  }
  function yd(e, t) {
    var l = e;
    e = 0;
    do {
      var a = l.nextSibling;
      if (
        (l.nodeType === 1
          ? t
            ? ((l._stashedDisplay = l.style.display),
              (l.style.display = "none"))
            : ((l.style.display = l._stashedDisplay || ""),
              l.getAttribute("style") === "" && l.removeAttribute("style"))
          : l.nodeType === 3 &&
            (t
              ? ((l._stashedText = l.nodeValue), (l.nodeValue = ""))
              : (l.nodeValue = l._stashedText || "")),
        a && a.nodeType === 8)
      )
        if (((l = a.data), l === "/$")) {
          if (e === 0) break;
          e--;
        } else (l !== "$" && l !== "$?" && l !== "$~" && l !== "$!") || e++;
      l = a;
    } while (l);
  }
  function fs(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (((t = t.nextSibling), l.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (fs(l), gu(l));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(l);
    }
  }
  function A0(e, t, l, a) {
    for (; e.nodeType === 1; ) {
      var n = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (a) {
        if (!e[Xa])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((i = e.getAttribute("rel")),
                i === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                i !== n.rel ||
                e.getAttribute("href") !==
                  (n.href == null || n.href === "" ? null : n.href) ||
                e.getAttribute("crossorigin") !==
                  (n.crossOrigin == null ? null : n.crossOrigin) ||
                e.getAttribute("title") !== (n.title == null ? null : n.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((i = e.getAttribute("src")),
                (i !== (n.src == null ? null : n.src) ||
                  e.getAttribute("type") !== (n.type == null ? null : n.type) ||
                  e.getAttribute("crossorigin") !==
                    (n.crossOrigin == null ? null : n.crossOrigin)) &&
                  i &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var i = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && e.getAttribute("name") === i) return e;
      } else return e;
      if (((e = Ct(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function z0(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !l) ||
        ((e = Ct(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function xd(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !t) ||
        ((e = Ct(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function ds(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function hs(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState !== "loading")
    );
  }
  function E0(e, t) {
    var l = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || l.readyState !== "loading") t();
    else {
      var a = function () {
        (t(), l.removeEventListener("DOMContentLoaded", a));
      };
      (l.addEventListener("DOMContentLoaded", a), (e._reactRetry = a));
    }
  }
  function Ct(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" ||
            t === "$!" ||
            t === "$?" ||
            t === "$~" ||
            t === "&" ||
            t === "F!" ||
            t === "F")
        )
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var ms = null;
  function bd(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "/$" || l === "/&") {
          if (t === 0) return Ct(e.nextSibling);
          t--;
        } else
          (l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&") ||
            t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Sd(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (t === 0) return e;
          t--;
        } else (l !== "/$" && l !== "/&") || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function jd(e, t, l) {
    switch (((t = Gi(l)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(o(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(o(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(o(454));
        return e;
      default:
        throw Error(o(451));
    }
  }
  function Tn(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    gu(e);
  }
  var Ot = new Map(),
    Ad = new Set();
  function Qi(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var ll = B.d;
  B.d = { f: T0, r: N0, D: C0, C: O0, L: _0, m: M0, X: U0, S: R0, M: D0 };
  function T0() {
    var e = ll.f(),
      t = Ui();
    return e || t;
  }
  function N0(e) {
    var t = ta(e);
    t !== null && t.tag === 5 && t.type === "form" ? qo(t) : ll.r(e);
  }
  var Ua = typeof document > "u" ? null : document;
  function zd(e, t, l) {
    var a = Ua;
    if (a && typeof t == "string" && t) {
      var n = St(t);
      ((n = 'link[rel="' + e + '"][href="' + n + '"]'),
        typeof l == "string" && (n += '[crossorigin="' + l + '"]'),
        Ad.has(n) ||
          (Ad.add(n),
          (e = { rel: e, crossOrigin: l, href: t }),
          a.querySelector(n) === null &&
            ((t = a.createElement("link")),
            We(t, "link", e),
            Qe(t),
            a.head.appendChild(t))));
    }
  }
  function C0(e) {
    (ll.D(e), zd("dns-prefetch", e, null));
  }
  function O0(e, t) {
    (ll.C(e, t), zd("preconnect", e, t));
  }
  function _0(e, t, l) {
    ll.L(e, t, l);
    var a = Ua;
    if (a && e && t) {
      var n = 'link[rel="preload"][as="' + St(t) + '"]';
      t === "image" && l && l.imageSrcSet
        ? ((n += '[imagesrcset="' + St(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == "string" &&
            (n += '[imagesizes="' + St(l.imageSizes) + '"]'))
        : (n += '[href="' + St(e) + '"]');
      var i = n;
      switch (t) {
        case "style":
          i = Da(e);
          break;
        case "script":
          i = wa(e);
      }
      Ot.has(i) ||
        ((e = N(
          {
            rel: "preload",
            href: t === "image" && l && l.imageSrcSet ? void 0 : e,
            as: t,
          },
          l,
        )),
        Ot.set(i, e),
        a.querySelector(n) !== null ||
          (t === "style" && a.querySelector(Nn(i))) ||
          (t === "script" && a.querySelector(Cn(i))) ||
          ((t = a.createElement("link")),
          We(t, "link", e),
          Qe(t),
          a.head.appendChild(t)));
    }
  }
  function M0(e, t) {
    ll.m(e, t);
    var l = Ua;
    if (l && e) {
      var a = t && typeof t.as == "string" ? t.as : "script",
        n =
          'link[rel="modulepreload"][as="' + St(a) + '"][href="' + St(e) + '"]',
        i = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          i = wa(e);
      }
      if (
        !Ot.has(i) &&
        ((e = N({ rel: "modulepreload", href: e }, t)),
        Ot.set(i, e),
        l.querySelector(n) === null)
      ) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Cn(i))) return;
        }
        ((a = l.createElement("link")),
          We(a, "link", e),
          Qe(a),
          l.head.appendChild(a));
      }
    }
  }
  function R0(e, t, l) {
    ll.S(e, t, l);
    var a = Ua;
    if (a && e) {
      var n = la(a).hoistableStyles,
        i = Da(e);
      t = t || "default";
      var c = n.get(i);
      if (!c) {
        var r = { loading: 0, preload: null };
        if ((c = a.querySelector(Nn(i)))) r.loading = 5;
        else {
          ((e = N({ rel: "stylesheet", href: e, "data-precedence": t }, l)),
            (l = Ot.get(i)) && ps(e, l));
          var m = (c = a.createElement("link"));
          (Qe(m),
            We(m, "link", e),
            (m._p = new Promise(function (S, C) {
              ((m.onload = S), (m.onerror = C));
            })),
            m.addEventListener("load", function () {
              r.loading |= 1;
            }),
            m.addEventListener("error", function () {
              r.loading |= 2;
            }),
            (r.loading |= 4),
            Xi(c, t, a));
        }
        ((c = { type: "stylesheet", instance: c, count: 1, state: r }),
          n.set(i, c));
      }
    }
  }
  function U0(e, t) {
    ll.X(e, t);
    var l = Ua;
    if (l && e) {
      var a = la(l).hoistableScripts,
        n = wa(e),
        i = a.get(n);
      i ||
        ((i = l.querySelector(Cn(n))),
        i ||
          ((e = N({ src: e, async: !0 }, t)),
          (t = Ot.get(n)) && gs(e, t),
          (i = l.createElement("script")),
          Qe(i),
          We(i, "link", e),
          l.head.appendChild(i)),
        (i = { type: "script", instance: i, count: 1, state: null }),
        a.set(n, i));
    }
  }
  function D0(e, t) {
    ll.M(e, t);
    var l = Ua;
    if (l && e) {
      var a = la(l).hoistableScripts,
        n = wa(e),
        i = a.get(n);
      i ||
        ((i = l.querySelector(Cn(n))),
        i ||
          ((e = N({ src: e, async: !0, type: "module" }, t)),
          (t = Ot.get(n)) && gs(e, t),
          (i = l.createElement("script")),
          Qe(i),
          We(i, "link", e),
          l.head.appendChild(i)),
        (i = { type: "script", instance: i, count: 1, state: null }),
        a.set(n, i));
    }
  }
  function Ed(e, t, l, a) {
    var n = (n = te.current) ? Qi(n) : null;
    if (!n) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string"
          ? ((t = Da(l.href)),
            (l = la(n).hoistableStyles),
            (a = l.get(t)),
            a ||
              ((a = { type: "style", instance: null, count: 0, state: null }),
              l.set(t, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          l.rel === "stylesheet" &&
          typeof l.href == "string" &&
          typeof l.precedence == "string"
        ) {
          e = Da(l.href);
          var i = la(n).hoistableStyles,
            c = i.get(e);
          if (
            (c ||
              ((n = n.ownerDocument || n),
              (c = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              i.set(e, c),
              (i = n.querySelector(Nn(e))) &&
                !i._p &&
                ((c.instance = i), (c.state.loading = 5)),
              Ot.has(e) ||
                ((l = {
                  rel: "preload",
                  as: "style",
                  href: l.href,
                  crossOrigin: l.crossOrigin,
                  integrity: l.integrity,
                  media: l.media,
                  hrefLang: l.hrefLang,
                  referrerPolicy: l.referrerPolicy,
                }),
                Ot.set(e, l),
                i || w0(n, e, l, c.state))),
            t && a === null)
          )
            throw Error(o(528, ""));
          return c;
        }
        if (t && a !== null) throw Error(o(529, ""));
        return null;
      case "script":
        return (
          (t = l.async),
          (l = l.src),
          typeof l == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = wa(l)),
              (l = la(n).hoistableScripts),
              (a = l.get(t)),
              a ||
                ((a = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                l.set(t, a)),
              a)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, e));
    }
  }
  function Da(e) {
    return 'href="' + St(e) + '"';
  }
  function Nn(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Td(e) {
    return N({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function w0(e, t, l, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (a.loading = 1)
      : ((t = e.createElement("link")),
        (a.preload = t),
        t.addEventListener("load", function () {
          return (a.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (a.loading |= 2);
        }),
        We(t, "link", l),
        Qe(t),
        e.head.appendChild(t));
  }
  function wa(e) {
    return '[src="' + St(e) + '"]';
  }
  function Cn(e) {
    return "script[async]" + e;
  }
  function Nd(e, t, l) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var a = e.querySelector('style[data-href~="' + St(l.href) + '"]');
          if (a) return ((t.instance = a), Qe(a), a);
          var n = N({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (e.ownerDocument || e).createElement("style")),
            Qe(a),
            We(a, "style", n),
            Xi(a, l.precedence, e),
            (t.instance = a)
          );
        case "stylesheet":
          n = Da(l.href);
          var i = e.querySelector(Nn(n));
          if (i) return ((t.state.loading |= 4), (t.instance = i), Qe(i), i);
          ((a = Td(l)),
            (n = Ot.get(n)) && ps(a, n),
            (i = (e.ownerDocument || e).createElement("link")),
            Qe(i));
          var c = i;
          return (
            (c._p = new Promise(function (r, m) {
              ((c.onload = r), (c.onerror = m));
            })),
            We(i, "link", a),
            (t.state.loading |= 4),
            Xi(i, l.precedence, e),
            (t.instance = i)
          );
        case "script":
          return (
            (i = wa(l.src)),
            (n = e.querySelector(Cn(i)))
              ? ((t.instance = n), Qe(n), n)
              : ((a = l),
                (n = Ot.get(i)) && ((a = N({}, l)), gs(a, n)),
                (e = e.ownerDocument || e),
                (n = e.createElement("script")),
                Qe(n),
                We(n, "link", a),
                e.head.appendChild(n),
                (t.instance = n))
          );
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((a = t.instance), (t.state.loading |= 4), Xi(a, l.precedence, e));
    return t.instance;
  }
  function Xi(e, t, l) {
    for (
      var a = l.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        n = a.length ? a[a.length - 1] : null,
        i = n,
        c = 0;
      c < a.length;
      c++
    ) {
      var r = a[c];
      if (r.dataset.precedence === t) i = r;
      else if (i !== n) break;
    }
    i
      ? i.parentNode.insertBefore(e, i.nextSibling)
      : ((t = l.nodeType === 9 ? l.head : l), t.insertBefore(e, t.firstChild));
  }
  function ps(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function gs(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Vi = null;
  function Cd(e, t, l) {
    if (Vi === null) {
      var a = new Map(),
        n = (Vi = new Map());
      n.set(l, a);
    } else ((n = Vi), (a = n.get(l)), a || ((a = new Map()), n.set(l, a)));
    if (a.has(e)) return a;
    for (
      a.set(e, null), l = l.getElementsByTagName(e), n = 0;
      n < l.length;
      n++
    ) {
      var i = l[n];
      if (
        !(
          i[Xa] ||
          i[Ze] ||
          (e === "link" && i.getAttribute("rel") === "stylesheet")
        ) &&
        i.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var c = i.getAttribute(t) || "";
        c = e + c;
        var r = a.get(c);
        r ? r.push(i) : a.set(c, [i]);
      }
    }
    return a;
  }
  function Od(e, t, l) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(
        l,
        t === "title" ? e.querySelector("head > title") : null,
      ));
  }
  function H0(e, t, l) {
    if (l === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        return t.rel === "stylesheet"
          ? ((e = t.disabled), typeof t.precedence == "string" && e == null)
          : !0;
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function _d(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function B0(e, t, l, a) {
    if (
      l.type === "stylesheet" &&
      (typeof a.media != "string" || matchMedia(a.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var n = Da(a.href),
          i = t.querySelector(Nn(n));
        if (i) {
          ((t = i._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (e.count++, (e = Zi.bind(e)), t.then(e, e)),
            (l.state.loading |= 4),
            (l.instance = i),
            Qe(i));
          return;
        }
        ((i = t.ownerDocument || t),
          (a = Td(a)),
          (n = Ot.get(n)) && ps(a, n),
          (i = i.createElement("link")),
          Qe(i));
        var c = i;
        ((c._p = new Promise(function (r, m) {
          ((c.onload = r), (c.onerror = m));
        })),
          We(i, "link", a),
          (l.instance = i));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(l, t),
        (t = l.state.preload) &&
          (l.state.loading & 3) === 0 &&
          (e.count++,
          (l = Zi.bind(e)),
          t.addEventListener("load", l),
          t.addEventListener("error", l)));
    }
  }
  var vs = 0;
  function L0(e, t) {
    return (
      e.stylesheets && e.count === 0 && Ki(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (l) {
            var a = setTimeout(function () {
              if ((e.stylesheets && Ki(e, e.stylesheets), e.unsuspend)) {
                var i = e.unsuspend;
                ((e.unsuspend = null), i());
              }
            }, 6e4 + t);
            0 < e.imgBytes && vs === 0 && (vs = 62500 * y0());
            var n = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 &&
                    (e.stylesheets && Ki(e, e.stylesheets), e.unsuspend))
                ) {
                  var i = e.unsuspend;
                  ((e.unsuspend = null), i());
                }
              },
              (e.imgBytes > vs ? 50 : 800) + t,
            );
            return (
              (e.unsuspend = l),
              function () {
                ((e.unsuspend = null), clearTimeout(a), clearTimeout(n));
              }
            );
          }
        : null
    );
  }
  function Zi() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) Ki(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var ki = null;
  function Ki(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (ki = new Map()),
        t.forEach(q0, e),
        (ki = null),
        Zi.call(e)));
  }
  function q0(e, t) {
    if (!(t.state.loading & 4)) {
      var l = ki.get(e);
      if (l) var a = l.get(null);
      else {
        ((l = new Map()), ki.set(e, l));
        for (
          var n = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            i = 0;
          i < n.length;
          i++
        ) {
          var c = n[i];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") &&
            (l.set(c.dataset.precedence, c), (a = c));
        }
        a && l.set(null, a);
      }
      ((n = t.instance),
        (c = n.getAttribute("data-precedence")),
        (i = l.get(c) || a),
        i === a && l.set(null, n),
        l.set(c, n),
        this.count++,
        (a = Zi.bind(this)),
        n.addEventListener("load", a),
        n.addEventListener("error", a),
        i
          ? i.parentNode.insertBefore(n, i.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(n, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var On = {
    $$typeof: H,
    Provider: null,
    Consumer: null,
    _currentValue: K,
    _currentValue2: K,
    _threadCount: 0,
  };
  function Y0(e, t, l, a, n, i, c, r, m) {
    ((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = du(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = du(0)),
      (this.hiddenUpdates = du(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = n),
      (this.onCaughtError = i),
      (this.onRecoverableError = c),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = m),
      (this.incompleteTransitions = new Map()));
  }
  function Md(e, t, l, a, n, i, c, r, m, S, C, M) {
    return (
      (e = new Y0(e, t, l, c, m, S, C, M, r)),
      (t = 1),
      i === !0 && (t |= 24),
      (i = ht(3, null, null, t)),
      (e.current = i),
      (i.stateNode = e),
      (t = $u()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (i.memoizedState = { element: a, isDehydrated: l, cache: t }),
      ec(i),
      e
    );
  }
  function Rd(e) {
    return e ? ((e = da), e) : da;
  }
  function Ud(e, t, l, a, n, i) {
    ((n = Rd(n)),
      a.context === null ? (a.context = n) : (a.pendingContext = n),
      (a = dl(t)),
      (a.payload = { element: l }),
      (i = i === void 0 ? null : i),
      i !== null && (a.callback = i),
      (l = hl(e, a, t)),
      l !== null && (ct(l, e, t), cn(l, e, t)));
  }
  function Dd(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function ys(e, t) {
    (Dd(e, t), (e = e.alternate) && Dd(e, t));
  }
  function wd(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ql(e, 67108864);
      (t !== null && ct(t, e, 67108864), ys(e, 67108864));
    }
  }
  function Hd(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = yt();
      t = hu(t);
      var l = ql(e, t);
      (l !== null && ct(l, e, t), ys(e, t));
    }
  }
  var Ji = !0;
  function G0(e, t, l, a) {
    var n = O.T;
    O.T = null;
    var i = B.p;
    try {
      ((B.p = 2), xs(e, t, l, a));
    } finally {
      ((B.p = i), (O.T = n));
    }
  }
  function Q0(e, t, l, a) {
    var n = O.T;
    O.T = null;
    var i = B.p;
    try {
      ((B.p = 8), xs(e, t, l, a));
    } finally {
      ((B.p = i), (O.T = n));
    }
  }
  function xs(e, t, l, a) {
    if (Ji) {
      var n = bs(a);
      if (n === null) (is(e, t, a, Wi, l), Ld(e, a));
      else if (V0(n, e, t, l, a)) a.stopPropagation();
      else if ((Ld(e, a), t & 4 && -1 < X0.indexOf(e))) {
        for (; n !== null; ) {
          var i = ta(n);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (((i = i.stateNode), i.current.memoizedState.isDehydrated)) {
                  var c = Dl(i.pendingLanes);
                  if (c !== 0) {
                    var r = i;
                    for (r.pendingLanes |= 2, r.entangledLanes |= 2; c; ) {
                      var m = 1 << (31 - ft(c));
                      ((r.entanglements[1] |= m), (c &= ~m));
                    }
                    (Ht(i), (me & 6) === 0 && ((Mi = rt() + 500), An(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((r = ql(i, 2)), r !== null && ct(r, i, 2), Ui(), ys(i, 2));
            }
          if (((i = bs(a)), i === null && is(e, t, a, Wi, l), i === n)) break;
          n = i;
        }
        n !== null && a.stopPropagation();
      } else is(e, t, a, null, l);
    }
  }
  function bs(e) {
    return ((e = ju(e)), Ss(e));
  }
  var Wi = null;
  function Ss(e) {
    if (((Wi = null), (e = ea(e)), e !== null)) {
      var t = x(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (((e = T(t)), e !== null)) return e;
          e = null;
        } else if (l === 31) {
          if (((e = R(t)), e !== null)) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((Wi = e), null);
  }
  function Bd(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Ch()) {
          case Xs:
            return 2;
          case Vs:
            return 8;
          case Ln:
          case Oh:
            return 32;
          case Zs:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var js = !1,
    zl = null,
    El = null,
    Tl = null,
    _n = new Map(),
    Mn = new Map(),
    Nl = [],
    X0 =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function Ld(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        zl = null;
        break;
      case "dragenter":
      case "dragleave":
        El = null;
        break;
      case "mouseover":
      case "mouseout":
        Tl = null;
        break;
      case "pointerover":
      case "pointerout":
        _n.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Mn.delete(t.pointerId);
    }
  }
  function Rn(e, t, l, a, n, i) {
    return e === null || e.nativeEvent !== i
      ? ((e = {
          blockedOn: t,
          domEventName: l,
          eventSystemFlags: a,
          nativeEvent: i,
          targetContainers: [n],
        }),
        t !== null && ((t = ta(t)), t !== null && wd(t)),
        e)
      : ((e.eventSystemFlags |= a),
        (t = e.targetContainers),
        n !== null && t.indexOf(n) === -1 && t.push(n),
        e);
  }
  function V0(e, t, l, a, n) {
    switch (t) {
      case "focusin":
        return ((zl = Rn(zl, e, t, l, a, n)), !0);
      case "dragenter":
        return ((El = Rn(El, e, t, l, a, n)), !0);
      case "mouseover":
        return ((Tl = Rn(Tl, e, t, l, a, n)), !0);
      case "pointerover":
        var i = n.pointerId;
        return (_n.set(i, Rn(_n.get(i) || null, e, t, l, a, n)), !0);
      case "gotpointercapture":
        return (
          (i = n.pointerId),
          Mn.set(i, Rn(Mn.get(i) || null, e, t, l, a, n)),
          !0
        );
    }
    return !1;
  }
  function qd(e) {
    var t = ea(e.target);
    if (t !== null) {
      var l = x(t);
      if (l !== null) {
        if (((t = l.tag), t === 13)) {
          if (((t = T(l)), t !== null)) {
            ((e.blockedOn = t),
              Fs(e.priority, function () {
                Hd(l);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = R(l)), t !== null)) {
            ((e.blockedOn = t),
              Fs(e.priority, function () {
                Hd(l);
              }));
            return;
          }
        } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function $i(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = bs(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var a = new l.constructor(l.type, l);
        ((Su = a), l.target.dispatchEvent(a), (Su = null));
      } else return ((t = ta(l)), t !== null && wd(t), (e.blockedOn = l), !1);
      t.shift();
    }
    return !0;
  }
  function Yd(e, t, l) {
    $i(e) && l.delete(t);
  }
  function Z0() {
    ((js = !1),
      zl !== null && $i(zl) && (zl = null),
      El !== null && $i(El) && (El = null),
      Tl !== null && $i(Tl) && (Tl = null),
      _n.forEach(Yd),
      Mn.forEach(Yd));
  }
  function Fi(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      js ||
        ((js = !0),
        s.unstable_scheduleCallback(s.unstable_NormalPriority, Z0)));
  }
  var Ii = null;
  function Gd(e) {
    Ii !== e &&
      ((Ii = e),
      s.unstable_scheduleCallback(s.unstable_NormalPriority, function () {
        Ii === e && (Ii = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t],
            a = e[t + 1],
            n = e[t + 2];
          if (typeof a != "function") {
            if (Ss(a || l) === null) continue;
            break;
          }
          var i = ta(l);
          i !== null &&
            (e.splice(t, 3),
            (t -= 3),
            bc(i, { pending: !0, data: n, method: l.method, action: a }, a, n));
        }
      }));
  }
  function Ha(e) {
    function t(m) {
      return Fi(m, e);
    }
    (zl !== null && Fi(zl, e),
      El !== null && Fi(El, e),
      Tl !== null && Fi(Tl, e),
      _n.forEach(t),
      Mn.forEach(t));
    for (var l = 0; l < Nl.length; l++) {
      var a = Nl[l];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < Nl.length && ((l = Nl[0]), l.blockedOn === null); )
      (qd(l), l.blockedOn === null && Nl.shift());
    if (((l = (e.ownerDocument || e).$$reactFormReplay), l != null))
      for (a = 0; a < l.length; a += 3) {
        var n = l[a],
          i = l[a + 1],
          c = n[tt] || null;
        if (typeof i == "function") c || Gd(l);
        else if (c) {
          var r = null;
          if (i && i.hasAttribute("formAction")) {
            if (((n = i), (c = i[tt] || null))) r = c.formAction;
            else if (Ss(n) !== null) continue;
          } else r = c.action;
          (typeof r == "function" ? (l[a + 1] = r) : (l.splice(a, 3), (a -= 3)),
            Gd(l));
        }
      }
  }
  function Qd() {
    function e(i) {
      i.canIntercept &&
        i.info === "react-transition" &&
        i.intercept({
          handler: function () {
            return new Promise(function (c) {
              return (n = c);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function t() {
      (n !== null && (n(), (n = null)), a || setTimeout(l, 20));
    }
    function l() {
      if (!a && !navigation.transition) {
        var i = navigation.currentEntry;
        i &&
          i.url != null &&
          navigation.navigate(i.url, {
            state: i.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var a = !1,
        n = null;
      return (
        navigation.addEventListener("navigate", e),
        navigation.addEventListener("navigatesuccess", t),
        navigation.addEventListener("navigateerror", t),
        setTimeout(l, 100),
        function () {
          ((a = !0),
            navigation.removeEventListener("navigate", e),
            navigation.removeEventListener("navigatesuccess", t),
            navigation.removeEventListener("navigateerror", t),
            n !== null && (n(), (n = null)));
        }
      );
    }
  }
  function As(e) {
    this._internalRoot = e;
  }
  ((Pi.prototype.render = As.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(o(409));
      var l = t.current,
        a = yt();
      Ud(l, a, e, t, null, null);
    }),
    (Pi.prototype.unmount = As.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Ud(e.current, 2, null, e, null, null), Ui(), (t[Pl] = null));
        }
      }));
  function Pi(e) {
    this._internalRoot = e;
  }
  Pi.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = $s();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < Nl.length && t !== 0 && t < Nl[l].priority; l++);
      (Nl.splice(l, 0, e), l === 0 && qd(e));
    }
  };
  var Xd = d.version;
  if (Xd !== "19.2.4") throw Error(o(527, Xd, "19.2.4"));
  B.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(o(188))
        : ((e = Object.keys(e).join(",")), Error(o(268, e)));
    return (
      (e = v(t)),
      (e = e !== null ? D(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var k0 = {
    bundleType: 0,
    version: "19.2.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.4",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var eu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!eu.isDisabled && eu.supportsFiber)
      try {
        ((Ya = eu.inject(k0)), (ot = eu));
      } catch {}
  }
  return (
    (Dn.createRoot = function (e, t) {
      if (!p(e)) throw Error(o(299));
      var l = !1,
        a = "",
        n = Wo,
        i = $o,
        c = Fo;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (l = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (n = t.onUncaughtError),
          t.onCaughtError !== void 0 && (i = t.onCaughtError),
          t.onRecoverableError !== void 0 && (c = t.onRecoverableError)),
        (t = Md(e, 1, !1, null, null, l, a, null, n, i, c, Qd)),
        (e[Pl] = t.current),
        ns(e),
        new As(t)
      );
    }),
    (Dn.hydrateRoot = function (e, t, l) {
      if (!p(e)) throw Error(o(299));
      var a = !1,
        n = "",
        i = Wo,
        c = $o,
        r = Fo,
        m = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (a = !0),
          l.identifierPrefix !== void 0 && (n = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (i = l.onUncaughtError),
          l.onCaughtError !== void 0 && (c = l.onCaughtError),
          l.onRecoverableError !== void 0 && (r = l.onRecoverableError),
          l.formState !== void 0 && (m = l.formState)),
        (t = Md(e, 1, !0, t, l ?? null, a, n, m, i, c, r, Qd)),
        (t.context = Rd(null)),
        (l = t.current),
        (a = yt()),
        (a = hu(a)),
        (n = dl(a)),
        (n.callback = null),
        hl(l, n, a),
        (l = a),
        (t.current.lanes = l),
        Qa(t, l),
        Ht(t),
        (e[Pl] = t.current),
        ns(e),
        new Pi(t)
      );
    }),
    (Dn.version = "19.2.4"),
    Dn
  );
}
var Pd;
function ip() {
  if (Pd) return Ts.exports;
  Pd = 1;
  function s() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (d) {
        console.error(d);
      }
  }
  return (s(), (Ts.exports = np()), Ts.exports);
}
var up = ip();
hh();
function wn() {
  return (
    (wn = Object.assign
      ? Object.assign.bind()
      : function (s) {
          for (var d = 1; d < arguments.length; d++) {
            var h = arguments[d];
            for (var o in h)
              Object.prototype.hasOwnProperty.call(h, o) && (s[o] = h[o]);
          }
          return s;
        }),
    wn.apply(this, arguments)
  );
}
var Ol;
(function (s) {
  ((s.Pop = "POP"), (s.Push = "PUSH"), (s.Replace = "REPLACE"));
})(Ol || (Ol = {}));
const eh = "popstate";
function cp(s) {
  s === void 0 && (s = {});
  function d(o, p) {
    let { pathname: x, search: T, hash: R } = o.location;
    return Rs(
      "",
      { pathname: x, search: T, hash: R },
      (p.state && p.state.usr) || null,
      (p.state && p.state.key) || "default",
    );
  }
  function h(o, p) {
    return typeof p == "string" ? p : nu(p);
  }
  return rp(d, h, null, s);
}
function we(s, d) {
  if (s === !1 || s === null || typeof s > "u") throw new Error(d);
}
function Hs(s, d) {
  if (!s) {
    typeof console < "u" && console.warn(d);
    try {
      throw new Error(d);
    } catch {}
  }
}
function sp() {
  return Math.random().toString(36).substr(2, 8);
}
function th(s, d) {
  return { usr: s.state, key: s.key, idx: d };
}
function Rs(s, d, h, o) {
  return (
    h === void 0 && (h = null),
    wn(
      { pathname: typeof s == "string" ? s : s.pathname, search: "", hash: "" },
      typeof d == "string" ? Ba(d) : d,
      { state: h, key: (d && d.key) || o || sp() },
    )
  );
}
function nu(s) {
  let { pathname: d = "/", search: h = "", hash: o = "" } = s;
  return (
    h && h !== "?" && (d += h.charAt(0) === "?" ? h : "?" + h),
    o && o !== "#" && (d += o.charAt(0) === "#" ? o : "#" + o),
    d
  );
}
function Ba(s) {
  let d = {};
  if (s) {
    let h = s.indexOf("#");
    h >= 0 && ((d.hash = s.substr(h)), (s = s.substr(0, h)));
    let o = s.indexOf("?");
    (o >= 0 && ((d.search = s.substr(o)), (s = s.substr(0, o))),
      s && (d.pathname = s));
  }
  return d;
}
function rp(s, d, h, o) {
  o === void 0 && (o = {});
  let { window: p = document.defaultView, v5Compat: x = !1 } = o,
    T = p.history,
    R = Ol.Pop,
    A = null,
    v = D();
  v == null && ((v = 0), T.replaceState(wn({}, T.state, { idx: v }), ""));
  function D() {
    return (T.state || { idx: null }).idx;
  }
  function N() {
    R = Ol.Pop;
    let Q = D(),
      ne = Q == null ? null : Q - v;
    ((v = Q), A && A({ action: R, location: J.location, delta: ne }));
  }
  function Y(Q, ne) {
    R = Ol.Push;
    let oe = Rs(J.location, Q, ne);
    v = D() + 1;
    let H = th(oe, v),
      ie = J.createHref(oe);
    try {
      T.pushState(H, "", ie);
    } catch (je) {
      if (je instanceof DOMException && je.name === "DataCloneError") throw je;
      p.location.assign(ie);
    }
    x && A && A({ action: R, location: J.location, delta: 1 });
  }
  function ee(Q, ne) {
    R = Ol.Replace;
    let oe = Rs(J.location, Q, ne);
    v = D();
    let H = th(oe, v),
      ie = J.createHref(oe);
    (T.replaceState(H, "", ie),
      x && A && A({ action: R, location: J.location, delta: 0 }));
  }
  function $(Q) {
    let ne = p.location.origin !== "null" ? p.location.origin : p.location.href,
      oe = typeof Q == "string" ? Q : nu(Q);
    return (
      (oe = oe.replace(/ $/, "%20")),
      we(
        ne,
        "No window.location.(origin|href) available to create URL for href: " +
          oe,
      ),
      new URL(oe, ne)
    );
  }
  let J = {
    get action() {
      return R;
    },
    get location() {
      return s(p, T);
    },
    listen(Q) {
      if (A) throw new Error("A history only accepts one active listener");
      return (
        p.addEventListener(eh, N),
        (A = Q),
        () => {
          (p.removeEventListener(eh, N), (A = null));
        }
      );
    },
    createHref(Q) {
      return d(p, Q);
    },
    createURL: $,
    encodeLocation(Q) {
      let ne = $(Q);
      return { pathname: ne.pathname, search: ne.search, hash: ne.hash };
    },
    push: Y,
    replace: ee,
    go(Q) {
      return T.go(Q);
    },
  };
  return J;
}
var lh;
(function (s) {
  ((s.data = "data"),
    (s.deferred = "deferred"),
    (s.redirect = "redirect"),
    (s.error = "error"));
})(lh || (lh = {}));
function op(s, d, h) {
  return (h === void 0 && (h = "/"), fp(s, d, h));
}
function fp(s, d, h, o) {
  let p = typeof d == "string" ? Ba(d) : d,
    x = Bs(p.pathname || "/", h);
  if (x == null) return null;
  let T = mh(s);
  dp(T);
  let R = null;
  for (let A = 0; R == null && A < T.length; ++A) {
    let v = zp(x);
    R = Sp(T[A], v);
  }
  return R;
}
function mh(s, d, h, o) {
  (d === void 0 && (d = []),
    h === void 0 && (h = []),
    o === void 0 && (o = ""));
  let p = (x, T, R) => {
    let A = {
      relativePath: R === void 0 ? x.path || "" : R,
      caseSensitive: x.caseSensitive === !0,
      childrenIndex: T,
      route: x,
    };
    A.relativePath.startsWith("/") &&
      (we(
        A.relativePath.startsWith(o),
        'Absolute route path "' +
          A.relativePath +
          '" nested under path ' +
          ('"' + o + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes.",
      ),
      (A.relativePath = A.relativePath.slice(o.length)));
    let v = _l([o, A.relativePath]),
      D = h.concat(A);
    (x.children &&
      x.children.length > 0 &&
      (we(
        x.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + v + '".'),
      ),
      mh(x.children, d, D, v)),
      !(x.path == null && !x.index) &&
        d.push({ path: v, score: xp(v, x.index), routesMeta: D }));
  };
  return (
    s.forEach((x, T) => {
      var R;
      if (x.path === "" || !((R = x.path) != null && R.includes("?"))) p(x, T);
      else for (let A of ph(x.path)) p(x, T, A);
    }),
    d
  );
}
function ph(s) {
  let d = s.split("/");
  if (d.length === 0) return [];
  let [h, ...o] = d,
    p = h.endsWith("?"),
    x = h.replace(/\?$/, "");
  if (o.length === 0) return p ? [x, ""] : [x];
  let T = ph(o.join("/")),
    R = [];
  return (
    R.push(...T.map((A) => (A === "" ? x : [x, A].join("/")))),
    p && R.push(...T),
    R.map((A) => (s.startsWith("/") && A === "" ? "/" : A))
  );
}
function dp(s) {
  s.sort((d, h) =>
    d.score !== h.score
      ? h.score - d.score
      : bp(
          d.routesMeta.map((o) => o.childrenIndex),
          h.routesMeta.map((o) => o.childrenIndex),
        ),
  );
}
const hp = /^:[\w-]+$/,
  mp = 3,
  pp = 2,
  gp = 1,
  vp = 10,
  yp = -2,
  ah = (s) => s === "*";
function xp(s, d) {
  let h = s.split("/"),
    o = h.length;
  return (
    h.some(ah) && (o += yp),
    d && (o += pp),
    h
      .filter((p) => !ah(p))
      .reduce((p, x) => p + (hp.test(x) ? mp : x === "" ? gp : vp), o)
  );
}
function bp(s, d) {
  return s.length === d.length && s.slice(0, -1).every((o, p) => o === d[p])
    ? s[s.length - 1] - d[d.length - 1]
    : 0;
}
function Sp(s, d, h) {
  let { routesMeta: o } = s,
    p = {},
    x = "/",
    T = [];
  for (let R = 0; R < o.length; ++R) {
    let A = o[R],
      v = R === o.length - 1,
      D = x === "/" ? d : d.slice(x.length) || "/",
      N = jp(
        { path: A.relativePath, caseSensitive: A.caseSensitive, end: v },
        D,
      ),
      Y = A.route;
    if (!N) return null;
    (Object.assign(p, N.params),
      T.push({
        params: p,
        pathname: _l([x, N.pathname]),
        pathnameBase: Op(_l([x, N.pathnameBase])),
        route: Y,
      }),
      N.pathnameBase !== "/" && (x = _l([x, N.pathnameBase])));
  }
  return T;
}
function jp(s, d) {
  typeof s == "string" && (s = { path: s, caseSensitive: !1, end: !0 });
  let [h, o] = Ap(s.path, s.caseSensitive, s.end),
    p = d.match(h);
  if (!p) return null;
  let x = p[0],
    T = x.replace(/(.)\/+$/, "$1"),
    R = p.slice(1);
  return {
    params: o.reduce((v, D, N) => {
      let { paramName: Y, isOptional: ee } = D;
      if (Y === "*") {
        let J = R[N] || "";
        T = x.slice(0, x.length - J.length).replace(/(.)\/+$/, "$1");
      }
      const $ = R[N];
      return (
        ee && !$ ? (v[Y] = void 0) : (v[Y] = ($ || "").replace(/%2F/g, "/")),
        v
      );
    }, {}),
    pathname: x,
    pathnameBase: T,
    pattern: s,
  };
}
function Ap(s, d, h) {
  (d === void 0 && (d = !1),
    h === void 0 && (h = !0),
    Hs(
      s === "*" || !s.endsWith("*") || s.endsWith("/*"),
      'Route path "' +
        s +
        '" will be treated as if it were ' +
        ('"' + s.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + s.replace(/\*$/, "/*") + '".'),
    ));
  let o = [],
    p =
      "^" +
      s
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (T, R, A) => (
            o.push({ paramName: R, isOptional: A != null }),
            A ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    s.endsWith("*")
      ? (o.push({ paramName: "*" }),
        (p += s === "*" || s === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : h
        ? (p += "\\/*$")
        : s !== "" && s !== "/" && (p += "(?:(?=\\/|$))"),
    [new RegExp(p, d ? void 0 : "i"), o]
  );
}
function zp(s) {
  try {
    return s
      .split("/")
      .map((d) => decodeURIComponent(d).replace(/\//g, "%2F"))
      .join("/");
  } catch (d) {
    return (
      Hs(
        !1,
        'The URL path "' +
          s +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + d + ")."),
      ),
      s
    );
  }
}
function Bs(s, d) {
  if (d === "/") return s;
  if (!s.toLowerCase().startsWith(d.toLowerCase())) return null;
  let h = d.endsWith("/") ? d.length - 1 : d.length,
    o = s.charAt(h);
  return o && o !== "/" ? null : s.slice(h) || "/";
}
const Ep = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Tp = (s) => Ep.test(s);
function Np(s, d) {
  d === void 0 && (d = "/");
  let {
      pathname: h,
      search: o = "",
      hash: p = "",
    } = typeof s == "string" ? Ba(s) : s,
    x;
  if (h)
    if (Tp(h)) x = h;
    else {
      if (h.includes("//")) {
        let T = h;
        ((h = h.replace(/\/\/+/g, "/")),
          Hs(
            !1,
            "Pathnames cannot have embedded double slashes - normalizing " +
              (T + " -> " + h),
          ));
      }
      h.startsWith("/") ? (x = nh(h.substring(1), "/")) : (x = nh(h, d));
    }
  else x = d;
  return { pathname: x, search: _p(o), hash: Mp(p) };
}
function nh(s, d) {
  let h = d.replace(/\/+$/, "").split("/");
  return (
    s.split("/").forEach((p) => {
      p === ".." ? h.length > 1 && h.pop() : p !== "." && h.push(p);
    }),
    h.length > 1 ? h.join("/") : "/"
  );
}
function _s(s, d, h, o) {
  return (
    "Cannot include a '" +
    s +
    "' character in a manually specified " +
    ("`to." +
      d +
      "` field [" +
      JSON.stringify(o) +
      "].  Please separate it out to the ") +
    ("`to." + h + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function Cp(s) {
  return s.filter(
    (d, h) => h === 0 || (d.route.path && d.route.path.length > 0),
  );
}
function Ls(s, d) {
  let h = Cp(s);
  return d
    ? h.map((o, p) => (p === h.length - 1 ? o.pathname : o.pathnameBase))
    : h.map((o) => o.pathnameBase);
}
function qs(s, d, h, o) {
  o === void 0 && (o = !1);
  let p;
  typeof s == "string"
    ? (p = Ba(s))
    : ((p = wn({}, s)),
      we(
        !p.pathname || !p.pathname.includes("?"),
        _s("?", "pathname", "search", p),
      ),
      we(
        !p.pathname || !p.pathname.includes("#"),
        _s("#", "pathname", "hash", p),
      ),
      we(!p.search || !p.search.includes("#"), _s("#", "search", "hash", p)));
  let x = s === "" || p.pathname === "",
    T = x ? "/" : p.pathname,
    R;
  if (T == null) R = h;
  else {
    let N = d.length - 1;
    if (!o && T.startsWith("..")) {
      let Y = T.split("/");
      for (; Y[0] === ".."; ) (Y.shift(), (N -= 1));
      p.pathname = Y.join("/");
    }
    R = N >= 0 ? d[N] : "/";
  }
  let A = Np(p, R),
    v = T && T !== "/" && T.endsWith("/"),
    D = (x || T === ".") && h.endsWith("/");
  return (!A.pathname.endsWith("/") && (v || D) && (A.pathname += "/"), A);
}
const _l = (s) => s.join("/").replace(/\/\/+/g, "/"),
  Op = (s) => s.replace(/\/+$/, "").replace(/^\/*/, "/"),
  _p = (s) => (!s || s === "?" ? "" : s.startsWith("?") ? s : "?" + s),
  Mp = (s) => (!s || s === "#" ? "" : s.startsWith("#") ? s : "#" + s);
function Rp(s) {
  return (
    s != null &&
    typeof s.status == "number" &&
    typeof s.statusText == "string" &&
    typeof s.internal == "boolean" &&
    "data" in s
  );
}
const gh = ["post", "put", "patch", "delete"];
new Set(gh);
const Up = ["get", ...gh];
new Set(Up);
function Hn() {
  return (
    (Hn = Object.assign
      ? Object.assign.bind()
      : function (s) {
          for (var d = 1; d < arguments.length; d++) {
            var h = arguments[d];
            for (var o in h)
              Object.prototype.hasOwnProperty.call(h, o) && (s[o] = h[o]);
          }
          return s;
        }),
    Hn.apply(this, arguments)
  );
}
const Ys = U.createContext(null),
  Dp = U.createContext(null),
  Ml = U.createContext(null),
  iu = U.createContext(null),
  Rl = U.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  vh = U.createContext(null);
function wp(s, d) {
  let { relative: h } = d === void 0 ? {} : d;
  La() || we(!1);
  let { basename: o, navigator: p } = U.useContext(Ml),
    { hash: x, pathname: T, search: R } = xh(s, { relative: h }),
    A = T;
  return (
    o !== "/" && (A = T === "/" ? o : _l([o, T])),
    p.createHref({ pathname: A, search: R, hash: x })
  );
}
function La() {
  return U.useContext(iu) != null;
}
function al() {
  return (La() || we(!1), U.useContext(iu).location);
}
function yh(s) {
  U.useContext(Ml).static || U.useLayoutEffect(s);
}
function Il() {
  let { isDataRoute: s } = U.useContext(Rl);
  return s ? Jp() : Hp();
}
function Hp() {
  La() || we(!1);
  let s = U.useContext(Ys),
    { basename: d, future: h, navigator: o } = U.useContext(Ml),
    { matches: p } = U.useContext(Rl),
    { pathname: x } = al(),
    T = JSON.stringify(Ls(p, h.v7_relativeSplatPath)),
    R = U.useRef(!1);
  return (
    yh(() => {
      R.current = !0;
    }),
    U.useCallback(
      function (v, D) {
        if ((D === void 0 && (D = {}), !R.current)) return;
        if (typeof v == "number") {
          o.go(v);
          return;
        }
        let N = qs(v, JSON.parse(T), x, D.relative === "path");
        (s == null &&
          d !== "/" &&
          (N.pathname = N.pathname === "/" ? d : _l([d, N.pathname])),
          (D.replace ? o.replace : o.push)(N, D.state, D));
      },
      [d, o, T, x, s],
    )
  );
}
function xh(s, d) {
  let { relative: h } = d === void 0 ? {} : d,
    { future: o } = U.useContext(Ml),
    { matches: p } = U.useContext(Rl),
    { pathname: x } = al(),
    T = JSON.stringify(Ls(p, o.v7_relativeSplatPath));
  return U.useMemo(() => qs(s, JSON.parse(T), x, h === "path"), [s, T, x, h]);
}
function Bp(s, d) {
  return Lp(s, d);
}
function Lp(s, d, h, o) {
  La() || we(!1);
  let { navigator: p } = U.useContext(Ml),
    { matches: x } = U.useContext(Rl),
    T = x[x.length - 1],
    R = T ? T.params : {};
  T && T.pathname;
  let A = T ? T.pathnameBase : "/";
  T && T.route;
  let v = al(),
    D;
  if (d) {
    var N;
    let Q = typeof d == "string" ? Ba(d) : d;
    (A === "/" || ((N = Q.pathname) != null && N.startsWith(A)) || we(!1),
      (D = Q));
  } else D = v;
  let Y = D.pathname || "/",
    ee = Y;
  if (A !== "/") {
    let Q = A.replace(/^\//, "").split("/");
    ee = "/" + Y.replace(/^\//, "").split("/").slice(Q.length).join("/");
  }
  let $ = op(s, { pathname: ee }),
    J = Xp(
      $ &&
        $.map((Q) =>
          Object.assign({}, Q, {
            params: Object.assign({}, R, Q.params),
            pathname: _l([
              A,
              p.encodeLocation
                ? p.encodeLocation(Q.pathname).pathname
                : Q.pathname,
            ]),
            pathnameBase:
              Q.pathnameBase === "/"
                ? A
                : _l([
                    A,
                    p.encodeLocation
                      ? p.encodeLocation(Q.pathnameBase).pathname
                      : Q.pathnameBase,
                  ]),
          }),
        ),
      x,
      h,
      o,
    );
  return d && J
    ? U.createElement(
        iu.Provider,
        {
          value: {
            location: Hn(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              D,
            ),
            navigationType: Ol.Pop,
          },
        },
        J,
      )
    : J;
}
function qp() {
  let s = Kp(),
    d = Rp(s)
      ? s.status + " " + s.statusText
      : s instanceof Error
        ? s.message
        : JSON.stringify(s),
    h = s instanceof Error ? s.stack : null,
    p = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return U.createElement(
    U.Fragment,
    null,
    U.createElement("h2", null, "Unexpected Application Error!"),
    U.createElement("h3", { style: { fontStyle: "italic" } }, d),
    h ? U.createElement("pre", { style: p }, h) : null,
    null,
  );
}
const Yp = U.createElement(qp, null);
class Gp extends U.Component {
  constructor(d) {
    (super(d),
      (this.state = {
        location: d.location,
        revalidation: d.revalidation,
        error: d.error,
      }));
  }
  static getDerivedStateFromError(d) {
    return { error: d };
  }
  static getDerivedStateFromProps(d, h) {
    return h.location !== d.location ||
      (h.revalidation !== "idle" && d.revalidation === "idle")
      ? { error: d.error, location: d.location, revalidation: d.revalidation }
      : {
          error: d.error !== void 0 ? d.error : h.error,
          location: h.location,
          revalidation: d.revalidation || h.revalidation,
        };
  }
  componentDidCatch(d, h) {
    console.error(
      "React Router caught the following error during render",
      d,
      h,
    );
  }
  render() {
    return this.state.error !== void 0
      ? U.createElement(
          Rl.Provider,
          { value: this.props.routeContext },
          U.createElement(vh.Provider, {
            value: this.state.error,
            children: this.props.component,
          }),
        )
      : this.props.children;
  }
}
function Qp(s) {
  let { routeContext: d, match: h, children: o } = s,
    p = U.useContext(Ys);
  return (
    p &&
      p.static &&
      p.staticContext &&
      (h.route.errorElement || h.route.ErrorBoundary) &&
      (p.staticContext._deepestRenderedBoundaryId = h.route.id),
    U.createElement(Rl.Provider, { value: d }, o)
  );
}
function Xp(s, d, h, o) {
  var p;
  if (
    (d === void 0 && (d = []),
    h === void 0 && (h = null),
    o === void 0 && (o = null),
    s == null)
  ) {
    var x;
    if (!h) return null;
    if (h.errors) s = h.matches;
    else if (
      (x = o) != null &&
      x.v7_partialHydration &&
      d.length === 0 &&
      !h.initialized &&
      h.matches.length > 0
    )
      s = h.matches;
    else return null;
  }
  let T = s,
    R = (p = h) == null ? void 0 : p.errors;
  if (R != null) {
    let D = T.findIndex((N) => N.route.id && R?.[N.route.id] !== void 0);
    (D >= 0 || we(!1), (T = T.slice(0, Math.min(T.length, D + 1))));
  }
  let A = !1,
    v = -1;
  if (h && o && o.v7_partialHydration)
    for (let D = 0; D < T.length; D++) {
      let N = T[D];
      if (
        ((N.route.HydrateFallback || N.route.hydrateFallbackElement) && (v = D),
        N.route.id)
      ) {
        let { loaderData: Y, errors: ee } = h,
          $ =
            N.route.loader &&
            Y[N.route.id] === void 0 &&
            (!ee || ee[N.route.id] === void 0);
        if (N.route.lazy || $) {
          ((A = !0), v >= 0 ? (T = T.slice(0, v + 1)) : (T = [T[0]]));
          break;
        }
      }
    }
  return T.reduceRight((D, N, Y) => {
    let ee,
      $ = !1,
      J = null,
      Q = null;
    h &&
      ((ee = R && N.route.id ? R[N.route.id] : void 0),
      (J = N.route.errorElement || Yp),
      A &&
        (v < 0 && Y === 0
          ? (Wp("route-fallback"), ($ = !0), (Q = null))
          : v === Y &&
            (($ = !0), (Q = N.route.hydrateFallbackElement || null))));
    let ne = d.concat(T.slice(0, Y + 1)),
      oe = () => {
        let H;
        return (
          ee
            ? (H = J)
            : $
              ? (H = Q)
              : N.route.Component
                ? (H = U.createElement(N.route.Component, null))
                : N.route.element
                  ? (H = N.route.element)
                  : (H = D),
          U.createElement(Qp, {
            match: N,
            routeContext: { outlet: D, matches: ne, isDataRoute: h != null },
            children: H,
          })
        );
      };
    return h && (N.route.ErrorBoundary || N.route.errorElement || Y === 0)
      ? U.createElement(Gp, {
          location: h.location,
          revalidation: h.revalidation,
          component: J,
          error: ee,
          children: oe(),
          routeContext: { outlet: null, matches: ne, isDataRoute: !0 },
        })
      : oe();
  }, null);
}
var bh = (function (s) {
    return (
      (s.UseBlocker = "useBlocker"),
      (s.UseRevalidator = "useRevalidator"),
      (s.UseNavigateStable = "useNavigate"),
      s
    );
  })(bh || {}),
  Sh = (function (s) {
    return (
      (s.UseBlocker = "useBlocker"),
      (s.UseLoaderData = "useLoaderData"),
      (s.UseActionData = "useActionData"),
      (s.UseRouteError = "useRouteError"),
      (s.UseNavigation = "useNavigation"),
      (s.UseRouteLoaderData = "useRouteLoaderData"),
      (s.UseMatches = "useMatches"),
      (s.UseRevalidator = "useRevalidator"),
      (s.UseNavigateStable = "useNavigate"),
      (s.UseRouteId = "useRouteId"),
      s
    );
  })(Sh || {});
function Vp(s) {
  let d = U.useContext(Ys);
  return (d || we(!1), d);
}
function Zp(s) {
  let d = U.useContext(Dp);
  return (d || we(!1), d);
}
function kp(s) {
  let d = U.useContext(Rl);
  return (d || we(!1), d);
}
function jh(s) {
  let d = kp(),
    h = d.matches[d.matches.length - 1];
  return (h.route.id || we(!1), h.route.id);
}
function Kp() {
  var s;
  let d = U.useContext(vh),
    h = Zp(),
    o = jh();
  return d !== void 0 ? d : (s = h.errors) == null ? void 0 : s[o];
}
function Jp() {
  let { router: s } = Vp(bh.UseNavigateStable),
    d = jh(Sh.UseNavigateStable),
    h = U.useRef(!1);
  return (
    yh(() => {
      h.current = !0;
    }),
    U.useCallback(
      function (p, x) {
        (x === void 0 && (x = {}),
          h.current &&
            (typeof p == "number"
              ? s.navigate(p)
              : s.navigate(p, Hn({ fromRouteId: d }, x))));
      },
      [s, d],
    )
  );
}
const ih = {};
function Wp(s, d, h) {
  ih[s] || (ih[s] = !0);
}
function $p(s, d) {
  (s?.v7_startTransition, s?.v7_relativeSplatPath);
}
function Ah(s) {
  let { to: d, replace: h, state: o, relative: p } = s;
  La() || we(!1);
  let { future: x, static: T } = U.useContext(Ml),
    { matches: R } = U.useContext(Rl),
    { pathname: A } = al(),
    v = Il(),
    D = qs(d, Ls(R, x.v7_relativeSplatPath), A, p === "path"),
    N = JSON.stringify(D);
  return (
    U.useEffect(
      () => v(JSON.parse(N), { replace: h, state: o, relative: p }),
      [v, N, p, h, o],
    ),
    null
  );
}
function Bt(s) {
  we(!1);
}
function Fp(s) {
  let {
    basename: d = "/",
    children: h = null,
    location: o,
    navigationType: p = Ol.Pop,
    navigator: x,
    static: T = !1,
    future: R,
  } = s;
  La() && we(!1);
  let A = d.replace(/^\/*/, "/"),
    v = U.useMemo(
      () => ({
        basename: A,
        navigator: x,
        static: T,
        future: Hn({ v7_relativeSplatPath: !1 }, R),
      }),
      [A, R, x, T],
    );
  typeof o == "string" && (o = Ba(o));
  let {
      pathname: D = "/",
      search: N = "",
      hash: Y = "",
      state: ee = null,
      key: $ = "default",
    } = o,
    J = U.useMemo(() => {
      let Q = Bs(D, A);
      return Q == null
        ? null
        : {
            location: { pathname: Q, search: N, hash: Y, state: ee, key: $ },
            navigationType: p,
          };
    }, [A, D, N, Y, ee, $, p]);
  return J == null
    ? null
    : U.createElement(
        Ml.Provider,
        { value: v },
        U.createElement(iu.Provider, { children: h, value: J }),
      );
}
function Ip(s) {
  let { children: d, location: h } = s;
  return Bp(Us(d), h);
}
new Promise(() => {});
function Us(s, d) {
  d === void 0 && (d = []);
  let h = [];
  return (
    U.Children.forEach(s, (o, p) => {
      if (!U.isValidElement(o)) return;
      let x = [...d, p];
      if (o.type === U.Fragment) {
        h.push.apply(h, Us(o.props.children, x));
        return;
      }
      (o.type !== Bt && we(!1), !o.props.index || !o.props.children || we(!1));
      let T = {
        id: o.props.id || x.join("-"),
        caseSensitive: o.props.caseSensitive,
        element: o.props.element,
        Component: o.props.Component,
        index: o.props.index,
        path: o.props.path,
        loader: o.props.loader,
        action: o.props.action,
        errorElement: o.props.errorElement,
        ErrorBoundary: o.props.ErrorBoundary,
        hasErrorBoundary:
          o.props.ErrorBoundary != null || o.props.errorElement != null,
        shouldRevalidate: o.props.shouldRevalidate,
        handle: o.props.handle,
        lazy: o.props.lazy,
      };
      (o.props.children && (T.children = Us(o.props.children, x)), h.push(T));
    }),
    h
  );
}
function Ds() {
  return (
    (Ds = Object.assign
      ? Object.assign.bind()
      : function (s) {
          for (var d = 1; d < arguments.length; d++) {
            var h = arguments[d];
            for (var o in h)
              Object.prototype.hasOwnProperty.call(h, o) && (s[o] = h[o]);
          }
          return s;
        }),
    Ds.apply(this, arguments)
  );
}
function Pp(s, d) {
  if (s == null) return {};
  var h = {},
    o = Object.keys(s),
    p,
    x;
  for (x = 0; x < o.length; x++)
    ((p = o[x]), !(d.indexOf(p) >= 0) && (h[p] = s[p]));
  return h;
}
function eg(s) {
  return !!(s.metaKey || s.altKey || s.ctrlKey || s.shiftKey);
}
function tg(s, d) {
  return s.button === 0 && (!d || d === "_self") && !eg(s);
}
const lg = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "viewTransition",
  ],
  ag = "6";
try {
  window.__reactRouterVersion = ag;
} catch {}
const ng = "startTransition",
  uh = ep[ng];
function ig(s) {
  let { basename: d, children: h, future: o, window: p } = s,
    x = U.useRef();
  x.current == null && (x.current = cp({ window: p, v5Compat: !0 }));
  let T = x.current,
    [R, A] = U.useState({ action: T.action, location: T.location }),
    { v7_startTransition: v } = o || {},
    D = U.useCallback(
      (N) => {
        v && uh ? uh(() => A(N)) : A(N);
      },
      [A, v],
    );
  return (
    U.useLayoutEffect(() => T.listen(D), [T, D]),
    U.useEffect(() => $p(o), [o]),
    U.createElement(Fp, {
      basename: d,
      children: h,
      location: R.location,
      navigationType: R.action,
      navigator: T,
      future: o,
    })
  );
}
const ug =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  cg = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  st = U.forwardRef(function (d, h) {
    let {
        onClick: o,
        relative: p,
        reloadDocument: x,
        replace: T,
        state: R,
        target: A,
        to: v,
        preventScrollReset: D,
        viewTransition: N,
      } = d,
      Y = Pp(d, lg),
      { basename: ee } = U.useContext(Ml),
      $,
      J = !1;
    if (typeof v == "string" && cg.test(v) && (($ = v), ug))
      try {
        let H = new URL(window.location.href),
          ie = v.startsWith("//") ? new URL(H.protocol + v) : new URL(v),
          je = Bs(ie.pathname, ee);
        ie.origin === H.origin && je != null
          ? (v = je + ie.search + ie.hash)
          : (J = !0);
      } catch {}
    let Q = wp(v, { relative: p }),
      ne = sg(v, {
        replace: T,
        state: R,
        target: A,
        preventScrollReset: D,
        relative: p,
        viewTransition: N,
      });
    function oe(H) {
      (o && o(H), H.defaultPrevented || ne(H));
    }
    return U.createElement(
      "a",
      Ds({}, Y, { href: $ || Q, onClick: J || x ? o : oe, ref: h, target: A }),
    );
  });
var ch;
(function (s) {
  ((s.UseScrollRestoration = "useScrollRestoration"),
    (s.UseSubmit = "useSubmit"),
    (s.UseSubmitFetcher = "useSubmitFetcher"),
    (s.UseFetcher = "useFetcher"),
    (s.useViewTransitionState = "useViewTransitionState"));
})(ch || (ch = {}));
var sh;
(function (s) {
  ((s.UseFetcher = "useFetcher"),
    (s.UseFetchers = "useFetchers"),
    (s.UseScrollRestoration = "useScrollRestoration"));
})(sh || (sh = {}));
function sg(s, d) {
  let {
      target: h,
      replace: o,
      state: p,
      preventScrollReset: x,
      relative: T,
      viewTransition: R,
    } = d === void 0 ? {} : d,
    A = Il(),
    v = al(),
    D = xh(s, { relative: T });
  return U.useCallback(
    (N) => {
      if (tg(N, h)) {
        N.preventDefault();
        let Y = o !== void 0 ? o : nu(v) === nu(D);
        A(s, {
          replace: Y,
          state: p,
          preventScrollReset: x,
          relative: T,
          viewTransition: R,
        });
      }
    },
    [v, A, D, o, p, h, s, x, T, R],
  );
}
const rg = "/assets/Afolary-image-DbVIOQKx.jpg";
function og() {
  const s = Il(),
    d = al(),
    h = [
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1606185540834-d6e7483ee1a4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1585713181935-d5f622cc2415?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    [o, p] = U.useState(0);
  (U.useEffect(() => {
    const T = d.state?.scrollTo;
    if (T) {
      const R = document.getElementById(T);
      R && R.scrollIntoView({ behavior: "smooth" });
    }
  }, [d.state]),
    U.useEffect(() => {
      let T;
      const R = () => {
        const A = 3e3 + Math.floor(Math.random() * 2e3);
        T = setTimeout(() => {
          (p((v) => (v + 1) % h.length), R());
        }, A);
      };
      return (R(), () => clearTimeout(T));
    }, [h.length]));
  const x = (T) => {
    const R = document.getElementById(T);
    R && R.scrollIntoView({ behavior: "smooth" });
  };
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx("section", {
        id: "home",
        className: "hero",
        style: {
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.7)), url('${h[o]}')`,
        },
        children: u.jsxs("div", {
          className: "container hero-content",
          children: [
            u.jsx("h1", {
              children: "Connecting You to Global Vehicle Markets",
            }),
            u.jsx("p", {
              children:
                "Your trusted partner for seamless vehicle import, customs clearance, and international logistics. Efficiency meets reliability.",
            }),
            u.jsxs("div", {
              className: "hero-btns",
              children: [
                u.jsx("button", {
                  className: "cta-btn",
                  onClick: () => s("/track"),
                  children: "Track Shipment",
                }),
                u.jsx("button", {
                  className: "btn-outline",
                  onClick: () => x("services"),
                  children: "Our Services",
                }),
              ],
            }),
          ],
        }),
      }),
      u.jsx("div", {
        className: "stats",
        children: u.jsxs("div", {
          className: "container stats-grid",
          children: [
            u.jsxs("div", {
              className: "stat-item",
              children: [
                u.jsx("h3", { children: "12+" }),
                u.jsx("p", { children: "Years Experience" }),
              ],
            }),
            u.jsxs("div", {
              className: "stat-item",
              children: [
                u.jsx("h3", { children: "8,500+" }),
                u.jsx("p", { children: "Vehicles Delivered" }),
              ],
            }),
            u.jsxs("div", {
              className: "stat-item",
              children: [
                u.jsx("h3", { children: "100%" }),
                u.jsx("p", { children: "Client Satisfaction" }),
              ],
            }),
          ],
        }),
      }),
      u.jsx("section", {
        id: "about",
        children: u.jsx("div", {
          className: "container",
          children: u.jsxs("div", {
            className: "contact-grid",
            children: [
              u.jsxs("div", {
                children: [
                  u.jsx("h2", {
                    style: {
                      fontSize: "32px",
                      marginBottom: "20px",
                      color: "var(--primary)",
                    },
                    children: "About Afolaray Nigeria Limited",
                  }),
                  u.jsx("p", {
                    style: { marginBottom: "15px", color: "var(--gray)" },
                    children:
                      "Afolaray Limited is a premier vehicle import company dedicated to simplifying the global vehicle trade. With over a decade of experience, we have established ourselves as a trusted partner for individuals and dealerships looking to move vehicles across borders.",
                  }),
                  u.jsx("p", {
                    style: { color: "var(--gray)" },
                    children:
                      "Our mission is to provide transparent, efficient, and secure logistics solutions. We handle everything from procurement and customs clearance to final delivery, ensuring peace of mind for our clients.",
                  }),
                ],
              }),
              u.jsx("div", {
                style: {
                  background: "#e2e8f0",
                  borderRadius: "10px",
                  minHeight: "300px",
                  overflow: "hidden",
                },
                children: u.jsx("img", {
                  src: rg,
                  alt: "Afolary Limited operations",
                  style: {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  },
                }),
              }),
            ],
          }),
        }),
      }),
      u.jsx("section", {
        id: "services",
        style: { background: "#f8fafc" },
        children: u.jsxs("div", {
          className: "container",
          children: [
            u.jsx("h2", {
              style: {
                textAlign: "center",
                fontSize: "32px",
                marginBottom: "10px",
              },
              children: "Our Services",
            }),
            u.jsx("p", {
              style: {
                textAlign: "center",
                color: "var(--gray)",
                maxWidth: "600px",
                margin: "0 auto 50px",
              },
              children:
                "Comprehensive solutions tailored to your automotive logistics needs.",
            }),
            u.jsxs("div", {
              className: "services-grid",
              children: [
                u.jsx(tu, {
                  title: "Vehicle Import",
                  icon: u.jsx(fg, {}),
                  desc: "Complete assistance with sourcing and importing vehicles from major global markets including USA, Canada, and Europe.",
                }),
                u.jsx(tu, {
                  title: "Import Documentation",
                  icon: u.jsx(rh, {}),
                  desc: "Accurate import paperwork and compliance support to keep your shipments moving without delays.",
                }),
                u.jsx(tu, {
                  title: "Customs Clearance",
                  icon: u.jsx(rh, {}),
                  desc: "Navigating complex customs regulations so you don't have to. We handle all documentation and compliance.",
                }),
                u.jsx(tu, {
                  title: "Logistics Management",
                  icon: u.jsx(dg, {}),
                  desc: "End-to-end transportation solutions including inland trucking, ocean freight, and warehousing.",
                }),
              ],
            }),
          ],
        }),
      }),
      u.jsx("section", {
        id: "process",
        children: u.jsxs("div", {
          className: "container",
          children: [
            u.jsx("h2", {
              style: {
                textAlign: "center",
                fontSize: "32px",
                marginBottom: "50px",
              },
              children: "How It Works",
            }),
            u.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "30px",
              },
              children: [
                u.jsx(lu, {
                  number: "1",
                  title: "Consultation",
                  desc: "We discuss your vehicle needs and shipping requirements.",
                }),
                u.jsx(lu, {
                  number: "2",
                  title: "Procurement",
                  desc: "We source or receive your vehicle and handle documentation.",
                }),
                u.jsx(lu, {
                  number: "3",
                  title: "Shipping",
                  desc: "Your vehicle is securely loaded and shipped with tracking.",
                }),
                u.jsx(lu, {
                  number: "4",
                  title: "Delivery",
                  desc: "Customs cleared and delivered to your doorstep.",
                }),
              ],
            }),
          ],
        }),
      }),
      u.jsx("section", {
        id: "faq",
        style: { background: "#ffffff" },
        children: u.jsxs("div", {
          className: "container",
          children: [
            u.jsx("h2", {
              style: {
                textAlign: "center",
                fontSize: "32px",
                marginBottom: "10px",
              },
              children: "Frequently Asked Questions",
            }),
            u.jsx("p", {
              style: {
                textAlign: "center",
                color: "var(--gray)",
                maxWidth: "700px",
                margin: "0 auto 40px",
              },
              children:
                "Answers to common questions about our sea freight logistics and vehicle imports.",
            }),
            u.jsxs("div", {
              className: "faq-list",
              children: [
                u.jsxs("details", {
                  className: "faq-item",
                  children: [
                    u.jsx("summary", {
                      children:
                        "What documents do I need to ship a vehicle by sea?",
                    }),
                    u.jsx("p", {
                      children:
                        "Typically you need the vehicle title, invoice, ID, and export documentation. We guide you through the full checklist.",
                    }),
                  ],
                }),
                u.jsxs("details", {
                  className: "faq-item",
                  children: [
                    u.jsx("summary", {
                      children: "How long does ocean shipping take?",
                    }),
                    u.jsx("p", {
                      children:
                        "Transit time depends on the port of origin and destination. Most routes take 3 to 8 weeks.",
                    }),
                  ],
                }),
                u.jsxs("details", {
                  className: "faq-item",
                  children: [
                    u.jsx("summary", {
                      children: "Do you handle customs clearance?",
                    }),
                    u.jsx("p", {
                      children:
                        "Yes. We handle documentation and customs clearance so your shipment moves without delays.",
                    }),
                  ],
                }),
                u.jsxs("details", {
                  className: "faq-item",
                  children: [
                    u.jsx("summary", { children: "Can I track my shipment?" }),
                    u.jsx("p", {
                      children:
                        "Yes. We provide tracking updates and you can use the Track Shipment page to follow your cargo.",
                    }),
                  ],
                }),
                u.jsxs("details", {
                  className: "faq-item",
                  children: [
                    u.jsx("summary", {
                      children: "Do you offer RoRo and container options?",
                    }),
                    u.jsx("p", {
                      children:
                        "Yes. We support RoRo, containerized shipments, and high & heavy cargo by sea.",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      u.jsx("section", {
        id: "testimonials",
        style: { background: "#f8fafc" },
        children: u.jsx("div", {
          className: "container",
          children: u.jsxs("div", {
            className: "google-reviews",
            children: [
              u.jsxs("div", {
                className: "google-reviews-text",
                children: [
                  u.jsx("h2", { children: "Google Testimonials" }),
                  u.jsx("p", {
                    children:
                      "See what customers are saying about Afolaray Nigeria Limited on Google.",
                  }),
                  u.jsx("a", {
                    className: "cta-btn",
                    href: "https://maps.app.goo.gl/YNQDgaeAs6stD2gU7",
                    target: "_blank",
                    rel: "noreferrer",
                    children: "Leave a Review",
                  }),
                ],
              }),
              u.jsx("div", {
                className: "google-reviews-embed",
                children: u.jsx("iframe", {
                  title: "Afolaray Nigeria Limited Google Reviews",
                  src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.5146647945535!2d3.311609609897679!3d6.456282093508253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8975c9586283%3A0x817d621c18fd8bbf!2sAFOLARAY%20NIGERIA%20LIMITED!5e0!3m2!1sen!2sng!4v1770900697013!5m2!1sen!2sng",
                  loading: "lazy",
                  referrerPolicy: "no-referrer-when-downgrade",
                  allowFullScreen: !0,
                }),
              }),
            ],
          }),
        }),
      }),
      u.jsx("section", {
        id: "contact",
        children: u.jsxs("div", {
          className: "container",
          children: [
            u.jsx("h2", {
              style: {
                textAlign: "center",
                fontSize: "32px",
                marginBottom: "50px",
              },
              children: "Get In Touch",
            }),
            u.jsxs("div", {
              className: "contact-grid",
              children: [
                u.jsxs("div", {
                  children: [
                    u.jsx("h3", {
                      style: { marginBottom: "20px" },
                      children: "Contact Information",
                    }),
                    u.jsxs("div", {
                      className: "contact-info-item",
                      children: [
                        u.jsx("div", {
                          style: {
                            width: "40px",
                            height: "40px",
                            background: "#eff6ff",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--secondary)",
                          },
                          children: u.jsx(hg, {}),
                        }),
                        u.jsxs("div", {
                          children: [
                            u.jsx("p", {
                              style: { fontWeight: "bold" },
                              children: "Head Office",
                            }),
                            u.jsx("p", {
                              style: { color: "var(--gray)" },
                              children:
                                "11A Apapa-Oshodi Express Way, Amuwo, Lagos Nigeria",
                            }),
                          ],
                        }),
                      ],
                    }),
                    u.jsxs("div", {
                      className: "contact-info-item",
                      children: [
                        u.jsx("div", {
                          style: {
                            width: "40px",
                            height: "40px",
                            background: "#eff6ff",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--secondary)",
                          },
                          children: u.jsx(mg, {}),
                        }),
                        u.jsxs("div", {
                          children: [
                            u.jsx("p", {
                              style: { fontWeight: "bold" },
                              children: "Phone",
                            }),
                            u.jsx("p", {
                              style: { color: "var(--gray)" },
                              children: "+2347033576017",
                            }),
                          ],
                        }),
                      ],
                    }),
                    u.jsxs("div", {
                      className: "contact-info-item",
                      children: [
                        u.jsx("div", {
                          style: {
                            width: "40px",
                            height: "40px",
                            background: "#eff6ff",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--secondary)",
                          },
                          children: u.jsx(pg, {}),
                        }),
                        u.jsxs("div", {
                          children: [
                            u.jsx("p", {
                              style: { fontWeight: "bold" },
                              children: "Email",
                            }),
                            u.jsx("p", {
                              style: { color: "var(--gray)" },
                              children: "afolaraylimited@gmail.com",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                u.jsxs("form", {
                  className: "contact-form",
                  onSubmit: (T) => T.preventDefault(),
                  children: [
                    u.jsx("h3", {
                      style: { marginBottom: "20px" },
                      children: "Send us a message",
                    }),
                    u.jsx("input", { type: "text", placeholder: "Your Name" }),
                    u.jsx("input", {
                      type: "email",
                      placeholder: "Your Email",
                    }),
                    u.jsx("textarea", { rows: "5", placeholder: "Message" }),
                    u.jsx("button", {
                      type: "submit",
                      className: "cta-btn",
                      style: { width: "100%" },
                      children: "Send Message",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
function tu({ title: s, icon: d, desc: h }) {
  return u.jsxs("div", {
    className: "service-card",
    children: [
      u.jsx("div", { className: "service-icon", children: d }),
      u.jsx("h3", { style: { marginBottom: "10px" }, children: s }),
      u.jsx("p", {
        style: { color: "var(--gray)", fontSize: "14px" },
        children: h,
      }),
    ],
  });
}
function lu({ number: s, title: d, desc: h }) {
  return u.jsxs("div", {
    className: "process-step",
    children: [
      u.jsx("div", { className: "step-number", children: s }),
      u.jsx("h4", {
        style: { marginBottom: "10px", fontSize: "18px" },
        children: d,
      }),
      u.jsx("p", {
        style: { color: "var(--gray)", fontSize: "14px" },
        children: h,
      }),
    ],
  });
}
const fg = () =>
    u.jsxs("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        u.jsx("path", { d: "M12 3v12" }),
        u.jsx("path", { d: "m8 11 4 4 4-4" }),
        u.jsx("path", {
          d: "M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4",
        }),
      ],
    }),
  rh = () =>
    u.jsxs("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        u.jsx("path", {
          d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",
        }),
        u.jsx("polyline", { points: "14 2 14 8 20 8" }),
        u.jsx("line", { x1: "16", y1: "13", x2: "8", y2: "13" }),
        u.jsx("line", { x1: "16", y1: "17", x2: "8", y2: "17" }),
        u.jsx("line", { x1: "10", y1: "9", x2: "8", y2: "9" }),
      ],
    }),
  dg = () =>
    u.jsxs("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        u.jsx("rect", { x: "1", y: "3", width: "15", height: "13" }),
        u.jsx("polygon", { points: "16 8 20 8 23 11 23 16 16 16 16 8" }),
        u.jsx("circle", { cx: "5.5", cy: "18.5", r: "2.5" }),
        u.jsx("circle", { cx: "18.5", cy: "18.5", r: "2.5" }),
      ],
    }),
  hg = () =>
    u.jsxs("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        u.jsx("path", { d: "M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0Z" }),
        u.jsx("circle", { cx: "12", cy: "10", r: "3" }),
      ],
    }),
  mg = () =>
    u.jsx("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: u.jsx("path", {
        d: "M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.88.34 1.73.65 2.54a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.54-1.22a2 2 0 0 1 2.11-.45c.81.31 1.66.53 2.54.65A2 2 0 0 1 22 16.9Z",
      }),
    }),
  pg = () =>
    u.jsxs("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        u.jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
        u.jsx("path", { d: "m22 7-10 6L2 7" }),
      ],
    }),
  gg = "https://iaakcpdpqavbfojyxcxr.supabase.co/functions/v1";
async function zh(s, d) {
  const h = await fetch(`${gg}${s}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d),
    }),
    o = await h.json().catch(() => ({}));
  if (!h.ok) {
    const p = o?.error || "Request failed";
    throw new Error(p);
  }
  return o;
}
const vg = "/trackings-get";
function yg() {
  const [s, d] = U.useState(""),
    [h, o] = U.useState(null),
    [p, x] = U.useState(""),
    [T, R] = U.useState(!1),
    A = async (v) => {
      v.preventDefault();
      const D = s.trim().toUpperCase();
      if (D) {
        (R(!0), x(""), o(null));
        try {
          const N = await zh(vg, { tracking_number: D });
          if (!N?.tracking_number)
            throw new Error("No shipment found with that ID.");
          o(N);
        } catch (N) {
          x(
            N.message ||
              "No shipment found with that ID. Please check and try again.",
          );
        } finally {
          R(!1);
        }
      }
    };
  return u.jsx("div", {
    className: "auth-wrap",
    children: u.jsx("div", {
      className: "container",
      children: u.jsxs("div", {
        className: "auth-card",
        children: [
          u.jsx("h2", { children: "Track Your Shipment" }),
          u.jsx("p", {
            children: "Enter your Shipment ID to see the latest status.",
          }),
          u.jsxs("form", {
            onSubmit: A,
            children: [
              u.jsx("input", {
                type: "text",
                placeholder: "Enter Shipment ID (e.g., AFL-88201)",
                value: s,
                onChange: (v) => d(v.target.value),
              }),
              u.jsx("button", {
                type: "submit",
                className: "cta-btn",
                style: { width: "100%" },
                disabled: T,
                children: T ? "Checking..." : "Track Now",
              }),
              p && u.jsx("div", { className: "auth-error", children: p }),
            ],
          }),
          h &&
            u.jsxs("div", {
              className: "tracking-result",
              style: { marginTop: "20px" },
              children: [
                u.jsxs("p", {
                  children: [
                    u.jsx("strong", { children: "Tracking Number:" }),
                    " ",
                    h.tracking_number,
                  ],
                }),
                u.jsxs("p", {
                  children: [
                    u.jsx("strong", { children: "Status:" }),
                    " ",
                    h.status,
                  ],
                }),
                u.jsxs("p", {
                  children: [
                    u.jsx("strong", { children: "Latest Event:" }),
                    " ",
                    h.latest_event,
                  ],
                }),
                u.jsxs("p", {
                  children: [
                    u.jsx("strong", { children: "Last Update:" }),
                    " ",
                    h.last_update,
                  ],
                }),
                u.jsxs("p", {
                  children: [
                    u.jsx("strong", { children: "Estimated Delivery:" }),
                    " ",
                    h.estimated_delivery,
                  ],
                }),
              ],
            }),
          h?.history?.length > 0 &&
            u.jsx("div", {
              className: "timeline",
              children: h.history.map((v, D) =>
                u.jsxs(
                  "div",
                  {
                    className: "timeline-item",
                    children: [
                      u.jsx("div", { className: "timeline-dot" }),
                      u.jsxs("div", {
                        className: "timeline-content",
                        children: [
                          u.jsx("div", {
                            className: "timeline-date",
                            children: v.checkpoint_date,
                          }),
                          u.jsx("div", {
                            className: "timeline-title",
                            children: v.status,
                          }),
                          u.jsx("div", {
                            className: "timeline-detail",
                            children: v.detail,
                          }),
                          u.jsx("div", {
                            className: "timeline-location",
                            children: v.location,
                          }),
                        ],
                      }),
                    ],
                  },
                  `${v.checkpoint_date}-${D}`,
                ),
              ),
            }),
          u.jsxs("p", {
            style: {
              marginTop: "16px",
              color: "var(--gray)",
              fontSize: "14px",
            },
            children: [
              "Admins can manage shipment lists via the ",
              u.jsx(st, { to: "/admin-login", children: "Admin Login" }),
              ".",
            ],
          }),
        ],
      }),
    }),
  });
}
const xg = [
  {
    name: "Sallaum Lines",
    url: "https://sallaumlines.com/track-shipment/",
    note: "Track ocean freight and shipment status.",
  },
  {
    name: "Grimaldi e-Service",
    url: "https://www.gnet.grimaldi-eservice.com/GNET/Pages_RoroTracking/WFRoroTracking",
    note: "RoRo tracking for Grimaldi lines.",
  },
  {
    name: "MSC Tracking",
    url: "https://www.msc.com/en/track-a-shipment",
    note: "Track MSC container shipments.",
  },
];
function bg() {
  return u.jsxs("div", {
    className: "auth-wrap",
    children: [
      u.jsx("section", {
        className: "track-hero",
        children: u.jsxs("div", {
          className: "container",
          children: [
            u.jsx("h1", { children: "Track Shipment" }),
            u.jsx("p", {
              children:
                "Get real-time updates on your ocean freight and vehicle shipments.",
            }),
          ],
        }),
      }),
      u.jsx("div", {
        className: "container",
        children: u.jsxs("div", {
          className: "auth-card",
          children: [
            u.jsx("h2", { children: "Track Your Shipment" }),
            u.jsx("p", {
              children: "Select a carrier below to track your shipment.",
            }),
            u.jsx("div", {
              className: "track-links",
              children: xg.map((s) =>
                u.jsxs(
                  "a",
                  {
                    className: "track-link",
                    href: s.url,
                    target: "_blank",
                    rel: "noreferrer",
                    children: [
                      u.jsx("div", { children: s.name }),
                      u.jsx("span", { children: s.note }),
                    ],
                  },
                  s.url,
                ),
              ),
            }),
            u.jsxs("p", {
              style: {
                marginTop: "18px",
                color: "var(--gray)",
                fontSize: "14px",
              },
              children: [
                "Looking for Afolary shipment tracking? Use the ",
                u.jsx(st, { to: "/track-public", children: "public tracking" }),
                " page.",
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
const Sg = "admin",
  jg = "Afolary@2026";
function Ag() {
  const [s, d] = U.useState(""),
    [h, o] = U.useState(""),
    [p, x] = U.useState(!1),
    [T, R] = U.useState(""),
    A = Il(),
    v = al(),
    D = (N) => {
      if ((N.preventDefault(), s === Sg && h === jg)) {
        localStorage.setItem("afolary_admin", "true");
        const Y = v.state?.from?.pathname || "/admin";
        A(Y, { replace: !0 });
        return;
      }
      R("Invalid admin credentials. Please try again.");
    };
  return u.jsx("div", {
    className: "auth-wrap",
    children: u.jsx("div", {
      className: "container",
      children: u.jsxs("div", {
        className: "auth-card",
        children: [
          u.jsx("h2", { children: "Admin Login" }),
          u.jsx("p", {
            children: "Only authorized admins can view shipment status lists.",
          }),
          u.jsxs("form", {
            onSubmit: D,
            children: [
              u.jsx("input", {
                type: "text",
                placeholder: "Admin Username",
                value: s,
                onChange: (N) => d(N.target.value),
              }),
              u.jsxs("div", {
                style: { position: "relative" },
                children: [
                  u.jsx("input", {
                    type: p ? "text" : "password",
                    placeholder: "Admin Password",
                    value: h,
                    onChange: (N) => o(N.target.value),
                    style: { paddingRight: "44px" },
                  }),
                  u.jsx("button", {
                    type: "button",
                    onClick: () => x((N) => !N),
                    "aria-label": p ? "Hide password" : "Show password",
                    style: {
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      color: "var(--gray)",
                      padding: 0,
                    },
                    children: p ? u.jsx(Eg, {}) : u.jsx(zg, {}),
                  }),
                ],
              }),
              u.jsx("button", {
                type: "submit",
                className: "cta-btn",
                style: { width: "100%" },
                children: "Log In",
              }),
              T && u.jsx("div", { className: "auth-error", children: T }),
            ],
          }),
          u.jsx("div", {
            className: "auth-hint",
            children:
              "Admins can see vehicles pending shipment, at sea, and arrived at port.",
          }),
          u.jsxs("p", {
            style: {
              marginTop: "16px",
              color: "var(--gray)",
              fontSize: "14px",
            },
            children: [
              "Want to track your own shipment? Use the ",
              u.jsx(st, { to: "/track", children: "public tracking" }),
              " page.",
            ],
          }),
        ],
      }),
    }),
  });
}
const zg = () =>
    u.jsxs("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        u.jsx("path", {
          d: "M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0",
        }),
        u.jsx("circle", { cx: "12", cy: "12", r: "3" }),
      ],
    }),
  Eg = () =>
    u.jsxs("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        u.jsx("path", { d: "m3 3 18 18" }),
        u.jsx("path", { d: "M10.58 10.58A2 2 0 1 0 13.42 13.42" }),
        u.jsx("path", {
          d: "M9.36 5.37A10.75 10.75 0 0 1 21.94 11.65a1 1 0 0 1 0 .7 10.83 10.83 0 0 1-3.12 4.55",
        }),
        u.jsx("path", {
          d: "M6.24 6.24A10.83 10.83 0 0 0 2.06 11.65a1 1 0 0 0 0 .7 10.75 10.75 0 0 0 14.08 5.68",
        }),
      ],
    }),
  oh = [
    {
      id: "AFL-40192",
      vehicle: "Toyota Land Cruiser 2022",
      status: "Pending Shipment",
      port: "Lagos",
      eta: "Feb 16, 2026",
    },
    {
      id: "AFL-55031",
      vehicle: "Mercedes-Benz GLE 2021",
      status: "At Sea",
      port: "On Vessel",
      eta: "Feb 11, 2026",
    },
    {
      id: "AFL-77014",
      vehicle: "Range Rover Sport 2023",
      status: "Arrived At Port",
      port: "Tin Can Island",
      eta: "Arrived Feb 2, 2026",
    },
    {
      id: "AFL-88201",
      vehicle: "Lexus RX 2022",
      status: "At Sea",
      port: "On Vessel",
      eta: "Feb 14, 2026",
    },
    {
      id: "AFL-99328",
      vehicle: "Toyota Hilux 2020",
      status: "Pending Shipment",
      port: "Baltimore",
      eta: "Feb 20, 2026",
    },
  ],
  Tg = ["All", "Pending Shipment", "At Sea", "Arrived At Port"],
  au = "afolary_admin_cars";
function Ng() {
  const [s, d] = U.useState("All"),
    h = Il(),
    o = U.useRef(null),
    [p, x] = U.useState({
      name: "",
      type: "Premium & Luxury",
      priceNGN: "",
      availability: "Available",
      location: "Nigeria",
      images: [],
    }),
    [T, R] = U.useState(""),
    [A, v] = U.useState(""),
    [D, N] = U.useState([]),
    [Y, ee] = U.useState([]),
    $ = U.useMemo(
      () => (s === "All" ? oh : oh.filter((H) => H.status === s)),
      [s],
    ),
    J = () => {
      (localStorage.removeItem("afolary_admin"), h("/admin-login"));
    };
  U.useEffect(() => {
    const H = localStorage.getItem(au);
    if (H)
      try {
        N(JSON.parse(H));
      } catch {
        N([]);
      }
  }, []);
  const Q = (H) => {
      (H.preventDefault(), R(""), v(""));
      const ie = Number(p.priceNGN);
      if (!p.name || !p.type || !ie) {
        v("Please provide name, type, and price.");
        return;
      }
      const je = localStorage.getItem(au),
        he = je ? JSON.parse(je) : [],
        Z = `ADMIN-${Date.now()}`,
        ze = p.images.length
          ? p.images
          : [
              `https://source.unsplash.com/800x500/?${encodeURIComponent(p.name)},car`,
            ],
        $e = [
          {
            id: Z,
            name: p.name,
            priceNGN: ie,
            type: p.type,
            image: ze[0],
            images: ze,
            availability: p.availability,
            location: p.location || "Nigeria",
          },
          ...he,
        ];
      (localStorage.setItem(au, JSON.stringify($e)),
        N($e),
        R("Car added. It will appear on the Cars page."),
        x({
          name: "",
          type: p.type,
          priceNGN: "",
          availability: p.availability,
          location: "Nigeria",
          images: [],
        }),
        ee([]),
        o.current && (o.current.value = ""));
    },
    ne = async (H) => {
      const ie = Array.from(H.target.files || []);
      if (!ie.length) {
        (x((he) => ({ ...he, images: [] })), ee([]));
        return;
      }
      (v(""), ee(ie.map((he) => he.name)));
      const je = (he) =>
        new Promise((Z, ze) => {
          const _e = new FileReader();
          ((_e.onload = () => {
            typeof _e.result == "string"
              ? Z(_e.result)
              : ze(new Error("Invalid image data"));
          }),
            (_e.onerror = () => ze(new Error("Failed to read image"))),
            _e.readAsDataURL(he));
        });
      try {
        const he = await Promise.all(ie.map(je));
        x((Z) => ({ ...Z, images: he }));
      } catch {
        (v("Unable to read selected images. Please choose valid image files."),
          x((he) => ({ ...he, images: [] })),
          ee([]));
      }
    },
    oe = (H) => {
      const ie = D.filter((je) => je.id !== H);
      (localStorage.setItem(au, JSON.stringify(ie)), N(ie));
    };
  return u.jsx("div", {
    className: "admin-wrap",
    children: u.jsxs("div", {
      className: "container",
      children: [
        u.jsxs("div", {
          className: "admin-header",
          children: [
            u.jsxs("div", {
              children: [
                u.jsx("h2", { children: "Admin Shipment Dashboard" }),
                u.jsx("p", {
                  style: { color: "var(--gray)" },
                  children:
                    "View all vehicles pending shipment, at sea, or arrived at port.",
                }),
              ],
            }),
            u.jsx("button", {
              className: "cta-btn",
              onClick: J,
              children: "Log Out",
            }),
          ],
        }),
        u.jsxs("div", {
          className: "admin-panel",
          style: { marginBottom: "28px" },
          children: [
            u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
              },
              children: [
                u.jsx("h3", {
                  style: { marginBottom: 0 },
                  children: "Add Car Listing",
                }),
                u.jsx("span", {
                  className: "admin-chip",
                  children: "Admin Only",
                }),
              ],
            }),
            u.jsxs("form", {
              onSubmit: Q,
              children: [
                u.jsxs("div", {
                  className: "admin-form-grid",
                  children: [
                    u.jsx("input", {
                      type: "text",
                      placeholder: "Car Name (e.g., Mercedes-Benz GLC)",
                      value: p.name,
                      onChange: (H) => x({ ...p, name: H.target.value }),
                    }),
                    u.jsxs("select", {
                      value: p.type,
                      onChange: (H) => x({ ...p, type: H.target.value }),
                      children: [
                        u.jsx("option", {
                          value: "Luxury / Supercars",
                          children: "Luxury / Supercars",
                        }),
                        u.jsx("option", {
                          value: "Premium & Luxury",
                          children: "Premium & Luxury",
                        }),
                        u.jsx("option", {
                          value: "SUVs & Crossovers",
                          children: "SUVs & Crossovers",
                        }),
                        u.jsx("option", {
                          value: "Affordable / Mainstream",
                          children: "Affordable / Mainstream",
                        }),
                        u.jsx("option", {
                          value: "Used Nigeria",
                          children: "Used Nigeria",
                        }),
                        u.jsx("option", {
                          value: "Truck / Specialty",
                          children: "Truck / Specialty",
                        }),
                      ],
                    }),
                    u.jsx("input", {
                      type: "number",
                      placeholder: "Price in NGN (e.g., 25000000)",
                      value: p.priceNGN,
                      onChange: (H) => x({ ...p, priceNGN: H.target.value }),
                    }),
                    u.jsxs("select", {
                      value: p.availability,
                      onChange: (H) =>
                        x({ ...p, availability: H.target.value }),
                      children: [
                        u.jsx("option", {
                          value: "Available",
                          children: "Available",
                        }),
                        u.jsx("option", {
                          value: "Pre-Order",
                          children: "Pre-Order",
                        }),
                      ],
                    }),
                    u.jsx("input", {
                      type: "text",
                      placeholder: "Location (optional)",
                      value: p.location,
                      onChange: (H) => x({ ...p, location: H.target.value }),
                    }),
                    u.jsxs("div", {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      },
                      children: [
                        u.jsx("input", {
                          ref: o,
                          type: "file",
                          accept: "image/*",
                          multiple: !0,
                          onChange: ne,
                        }),
                        Y.length > 0 &&
                          u.jsxs("span", {
                            style: { color: "var(--gray)", fontSize: "13px" },
                            children: [
                              "Selected: ",
                              Y.length,
                              " image",
                              Y.length > 1 ? "s" : "",
                            ],
                          }),
                      ],
                    }),
                  ],
                }),
                u.jsxs("div", {
                  className: "admin-form-actions",
                  style: { marginTop: "12px" },
                  children: [
                    u.jsx("button", {
                      type: "submit",
                      className: "cta-btn",
                      children: "Add Car",
                    }),
                    u.jsx("span", {
                      style: { color: "var(--gray)", fontSize: "13px" },
                      children:
                        "Tip: select one or many images. If none is selected, one is auto-picked.",
                    }),
                  ],
                }),
                A &&
                  u.jsx("div", {
                    className: "auth-error",
                    style: { marginTop: "10px" },
                    children: A,
                  }),
                T &&
                  u.jsx("div", {
                    className: "tracking-result",
                    style: { marginTop: "10px" },
                    children: T,
                  }),
              ],
            }),
          ],
        }),
        u.jsxs("div", {
          className: "admin-panel",
          style: { marginBottom: "28px" },
          children: [
            u.jsx("h3", {
              style: { marginBottom: "10px" },
              children: "Manage Added Cars",
            }),
            D.length === 0 &&
              u.jsx("p", {
                style: { color: "var(--gray)" },
                children: "No admin-added cars yet.",
              }),
            D.length > 0 &&
              u.jsx("div", {
                className: "admin-grid",
                children: D.map((H) =>
                  u.jsxs(
                    "div",
                    {
                      className: "admin-card",
                      children: [
                        u.jsx("strong", { children: H.name }),
                        u.jsxs("div", {
                          className: "admin-meta",
                          children: ["Type: ", H.type],
                        }),
                        u.jsxs("div", {
                          className: "admin-meta",
                          children: ["Price: ₦", H.priceNGN?.toLocaleString()],
                        }),
                        u.jsxs("div", {
                          className: "admin-meta",
                          children: ["Status: ", H.availability],
                        }),
                        u.jsxs("div", {
                          className: "admin-meta",
                          children: [
                            "Photos: ",
                            Array.isArray(H.images) && H.images.length
                              ? H.images.length
                              : 1,
                          ],
                        }),
                        u.jsxs("button", {
                          className: "admin-delete",
                          style: { marginTop: "10px" },
                          onClick: () => oe(H.id),
                          children: [
                            u.jsx("span", {
                              className: "admin-delete-icon",
                              children: "x",
                            }),
                            "Delete",
                          ],
                        }),
                      ],
                    },
                    H.id,
                  ),
                ),
              }),
          ],
        }),
        u.jsx("div", {
          className: "pill-tabs",
          children: Tg.map((H) =>
            u.jsx(
              "button",
              {
                className: `pill ${s === H ? "active" : ""}`,
                onClick: () => d(H),
                children: H,
              },
              H,
            ),
          ),
        }),
        u.jsx("div", {
          className: "admin-grid",
          style: { marginTop: "20px" },
          children: $.map((H) =>
            u.jsxs(
              "div",
              {
                className: "admin-card",
                children: [
                  u.jsx("strong", { children: H.vehicle }),
                  u.jsxs("div", {
                    className: "admin-meta",
                    children: ["Shipment ID: ", H.id],
                  }),
                  u.jsxs("div", {
                    className: "admin-meta",
                    children: ["Status: ", H.status],
                  }),
                  u.jsxs("div", {
                    className: "admin-meta",
                    children: ["Current Port: ", H.port],
                  }),
                  u.jsxs("div", {
                    className: "admin-meta",
                    children: ["ETA: ", H.eta],
                  }),
                ],
              },
              H.id,
            ),
          ),
        }),
      ],
    }),
  });
}
const Cg = "/orders-create",
  De = 1300,
  fh = "afolary_admin_cars",
  V = (s, d, h, o, p, x = "Available", T = "Nigeria") => ({
    id: s,
    name: d,
    priceNGN: h,
    type: o,
    image: p,
    images: [p],
    availability: x,
    location: T,
  }),
  Og = (s) => {
    const d = `https://source.unsplash.com/800x500/?${encodeURIComponent(s.name || "car")},car`,
      h =
        Array.isArray(s.images) && s.images.length
          ? s.images
          : s.image
            ? [s.image]
            : [d];
    return { ...s, image: h[0] || s.image, images: h };
  },
  dh = [
    V(
      "CAR-001",
      "Bugatti Chiron Super Sport",
      7931e6,
      "Luxury / Supercars",
      "https://source.unsplash.com/800x500/?bugatti,supercar",
      "Pre-Order",
    ),
    V(
      "CAR-002",
      "Bugatti Tourbillon",
      41e5 * De,
      "Luxury / Supercars",
      "https://source.unsplash.com/800x500/?bugatti,hypercar",
      "Pre-Order",
    ),
    V(
      "CAR-003",
      "Lamborghini Veneno",
      45e5 * De,
      "Luxury / Supercars",
      "https://source.unsplash.com/800x500/?lamborghini,supercar",
      "Pre-Order",
    ),
    V(
      "CAR-004",
      "Hennessey Venom F5",
      4275e6,
      "Luxury / Supercars",
      "https://source.unsplash.com/800x500/?hennessey,supercar",
      "Pre-Order",
    ),
    V(
      "CAR-005",
      "Hennessey Venom F5-M Roadster",
      377625e4,
      "Luxury / Supercars",
      "https://source.unsplash.com/800x500/?hennessey,roadster",
      "Pre-Order",
    ),
    V(
      "CAR-006",
      "Mercedes-Maybach S680",
      3744e5,
      "Luxury / Supercars",
      "https://source.unsplash.com/800x500/?maybach,sedan",
      "Available",
    ),
    V(
      "CAR-007",
      "Lamborghini Huracán Sterrato",
      401716800,
      "Luxury / Supercars",
      "https://source.unsplash.com/800x500/?lamborghini,huracan",
      "Available",
    ),
    V(
      "CAR-008",
      "Ferrari Amalfi",
      403275e3,
      "Luxury / Supercars",
      "https://source.unsplash.com/800x500/?ferrari,supercar",
      "Pre-Order",
    ),
    V(
      "CAR-009",
      "Porsche 911 Turbo S",
      334656e3,
      "Luxury / Supercars",
      "https://source.unsplash.com/800x500/?porsche,911",
      "Available",
    ),
    V(
      "CAR-010",
      "McLaren 750S",
      67824e4,
      "Luxury / Supercars",
      "https://source.unsplash.com/800x500/?mclaren,supercar",
      "Pre-Order",
    ),
    V(
      "CAR-011",
      "Porsche Taycan GTS Sport Turismo",
      203610400,
      "Premium & Luxury",
      "https://source.unsplash.com/800x500/?porsche,taycan",
      "Available",
    ),
    V(
      "CAR-012",
      "Mercedes-Benz E-Class E220d",
      164171700,
      "Premium & Luxury",
      "https://source.unsplash.com/800x500/?mercedes,eclass",
      "Available",
    ),
    V(
      "CAR-013",
      "Audi S6 Sportback e-tron",
      159485200,
      "Premium & Luxury",
      "https://source.unsplash.com/800x500/?audi,s6",
      "Pre-Order",
    ),
    V(
      "CAR-014",
      "BMW M340i",
      127905400,
      "Premium & Luxury",
      "https://source.unsplash.com/800x500/?bmw,m340i",
      "Available",
    ),
    V(
      "CAR-015",
      "Land Rover Discovery",
      86808400,
      "Premium & Luxury",
      "https://source.unsplash.com/800x500/?landrover,discovery",
      "Available",
    ),
    V(
      "CAR-016",
      "NIO EL8 Long Range",
      152996200,
      "Premium & Luxury",
      "https://source.unsplash.com/800x500/?nio,suv",
      "Pre-Order",
    ),
    V(
      "CAR-017",
      "Range Rover P615 SV LWB",
      33345e4,
      "Premium & Luxury",
      "https://source.unsplash.com/800x500/?range%20rover,luxury",
      "Pre-Order",
    ),
    V(
      "CAR-018",
      "Lexus RX 330/350 (Used)",
      75e5,
      "Premium & Luxury",
      "https://source.unsplash.com/800x500/?lexus,rx",
      "Available",
      "Nigeria (Used)",
    ),
    V(
      "CAR-019",
      "Mercedes-Benz GLC",
      72e7,
      "Premium & Luxury",
      "https://source.unsplash.com/800x500/?mercedes,glc",
      "Available",
    ),
    V(
      "CAR-020",
      "Mercedes AMG G63",
      50256e4,
      "Premium & Luxury",
      "https://source.unsplash.com/800x500/?mercedes,g63",
      "Available",
    ),
    V(
      "CAR-021",
      "Toyota RAV4",
      37500 * De,
      "SUVs & Crossovers",
      "https://source.unsplash.com/800x500/?toyota,rav4",
      "Available",
    ),
    V(
      "CAR-022",
      "Toyota Highlander",
      56e3 * De,
      "SUVs & Crossovers",
      "https://source.unsplash.com/800x500/?toyota,highlander",
      "Available",
    ),
    V(
      "CAR-023",
      "Honda CR-V",
      37500 * De,
      "SUVs & Crossovers",
      "https://source.unsplash.com/800x500/?honda,crv",
      "Available",
    ),
    V(
      "CAR-024",
      "Hyundai Tucson",
      32500 * De,
      "SUVs & Crossovers",
      "https://source.unsplash.com/800x500/?hyundai,tucson",
      "Available",
    ),
    V(
      "CAR-025",
      "Kia Sportage",
      32500 * De,
      "SUVs & Crossovers",
      "https://source.unsplash.com/800x500/?kia,sportage",
      "Available",
    ),
    V(
      "CAR-026",
      "Nissan X-Trail",
      32500 * De,
      "SUVs & Crossovers",
      "https://source.unsplash.com/800x500/?nissan,xtrail",
      "Available",
    ),
    V(
      "CAR-027",
      "Ford Explorer",
      55e5,
      "SUVs & Crossovers",
      "https://source.unsplash.com/800x500/?ford,explorer",
      "Available",
      "Nigeria (Used)",
    ),
    V(
      "CAR-028",
      "Toyota Prado",
      115e5,
      "SUVs & Crossovers",
      "https://source.unsplash.com/800x500/?toyota,prado",
      "Available",
      "Nigeria (Used)",
    ),
    V(
      "CAR-029",
      "Toyota Hilux Pickup",
      3e6,
      "SUVs & Crossovers",
      "https://source.unsplash.com/800x500/?toyota,hilux",
      "Available",
      "Nigeria (Used)",
    ),
    V(
      "CAR-030",
      "Ford Ranger Pickup",
      36e5,
      "SUVs & Crossovers",
      "https://source.unsplash.com/800x500/?ford,ranger",
      "Available",
      "Nigeria (Used)",
    ),
    V(
      "CAR-031",
      "Toyota Corolla",
      22e3 * De,
      "Affordable / Mainstream",
      "https://source.unsplash.com/800x500/?toyota,corolla",
      "Available",
    ),
    V(
      "CAR-032",
      "Nissan Versa",
      20130 * De,
      "Affordable / Mainstream",
      "https://source.unsplash.com/800x500/?nissan,versa",
      "Available",
    ),
    V(
      "CAR-033",
      "Nissan Sentra",
      22730 * De,
      "Affordable / Mainstream",
      "https://source.unsplash.com/800x500/?nissan,sentra",
      "Available",
    ),
    V(
      "CAR-034",
      "Kia K4",
      23165 * De,
      "Affordable / Mainstream",
      "https://source.unsplash.com/800x500/?kia,sedan",
      "Available",
    ),
    V(
      "CAR-035",
      "Hyundai Elantra",
      23370 * De,
      "Affordable / Mainstream",
      "https://source.unsplash.com/800x500/?hyundai,elantra",
      "Available",
    ),
    V(
      "CAR-036",
      "Mazda3",
      25335 * De,
      "Affordable / Mainstream",
      "https://source.unsplash.com/800x500/?mazda,mazda3",
      "Available",
    ),
    V(
      "CAR-037",
      "Subaru Impreza",
      25530 * De,
      "Affordable / Mainstream",
      "https://source.unsplash.com/800x500/?subaru,impreza",
      "Available",
    ),
    V(
      "CAR-038",
      "Honda Civic",
      25745 * De,
      "Affordable / Mainstream",
      "https://source.unsplash.com/800x500/?honda,civic",
      "Available",
    ),
    V(
      "CAR-039",
      "Volkswagen Jetta",
      23720 * De,
      "Affordable / Mainstream",
      "https://source.unsplash.com/800x500/?volkswagen,jetta",
      "Available",
    ),
    V(
      "CAR-040",
      "Toyota Camry",
      31e3 * De,
      "Affordable / Mainstream",
      "https://source.unsplash.com/800x500/?toyota,camry",
      "Available",
    ),
    V(
      "CAR-041",
      "Kia Picanto",
      14500 * De,
      "Affordable / Mainstream",
      "https://source.unsplash.com/800x500/?kia,picanto",
      "Available",
    ),
    V(
      "CAR-042",
      "Kia Rio",
      19e3 * De,
      "Affordable / Mainstream",
      "https://source.unsplash.com/800x500/?kia,rio",
      "Available",
    ),
    V(
      "CAR-043",
      "Nissan Almera",
      19e3 * De,
      "Affordable / Mainstream",
      "https://source.unsplash.com/800x500/?nissan,almera",
      "Available",
    ),
    V(
      "CAR-044",
      "Nissan Altima (Used)",
      325e4,
      "Used Nigeria",
      "https://source.unsplash.com/800x500/?nissan,altima",
      "Available",
      "Nigeria (Used)",
    ),
    V(
      "CAR-045",
      "Hyundai Sonata (Used)",
      3e6,
      "Used Nigeria",
      "https://source.unsplash.com/800x500/?hyundai,sonata",
      "Available",
      "Nigeria (Used)",
    ),
    V(
      "CAR-046",
      "Peugeot 406/407 (Used)",
      21e5,
      "Used Nigeria",
      "https://source.unsplash.com/800x500/?peugeot,sedan",
      "Available",
      "Nigeria (Used)",
    ),
    V(
      "CAR-047",
      "Honda Accord (Used)",
      85e5,
      "Used Nigeria",
      "https://source.unsplash.com/800x500/?honda,accord",
      "Available",
      "Nigeria (Used)",
    ),
    V(
      "CAR-048",
      "Toyota Sienna (Used)",
      525e4,
      "Used Nigeria",
      "https://source.unsplash.com/800x500/?toyota,sienna",
      "Available",
      "Nigeria (Used)",
    ),
    V(
      "CAR-049",
      "Toyota Corolla (Used)",
      14e6,
      "Used Nigeria",
      "https://source.unsplash.com/800x500/?toyota,corolla",
      "Available",
      "Nigeria (Used)",
    ),
    V(
      "CAR-050",
      "Toyota Camry (Used)",
      175e5,
      "Used Nigeria",
      "https://source.unsplash.com/800x500/?toyota,camry",
      "Available",
      "Nigeria (Used)",
    ),
    V(
      "CAR-051",
      "Ram 1500 Tradesman",
      59616e4,
      "Truck / Specialty",
      "https://source.unsplash.com/800x500/?ram,truck",
      "Available",
    ),
    V(
      "CAR-052",
      "Toyota Land Cruiser 300",
      383889600,
      "Truck / Specialty",
      "https://source.unsplash.com/800x500/?toyota,landcruiser",
      "Available",
    ),
  ];
function _g() {
  const [s, d] = U.useState(dh[0]?.id || ""),
    [h, o] = U.useState("Order"),
    [p, x] = U.useState({
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      delivery_city: "",
    }),
    [T, R] = U.useState(!1),
    [A, v] = U.useState(null),
    [D, N] = U.useState(""),
    [Y, ee] = U.useState(""),
    [$, J] = U.useState(""),
    [Q, ne] = U.useState("All"),
    [oe, H] = U.useState(1),
    ie = 8,
    [je, he] = U.useState([]),
    [Z, ze] = U.useState(null),
    [_e, $e] = U.useState(0);
  (U.useEffect(() => {
    const f = localStorage.getItem(fh);
    if (f)
      try {
        he(JSON.parse(f));
      } catch {
        he([]);
      }
  }, []),
    U.useEffect(() => {
      const f = (E) => {
        if (E.key === fh)
          try {
            he(E.newValue ? JSON.parse(E.newValue) : []);
          } catch {
            he([]);
          }
      };
      return (
        window.addEventListener("storage", f),
        () => window.removeEventListener("storage", f)
      );
    }, []),
    U.useEffect(() => {
      if (!Z) return;
      const f = (E) => {
        const w = Z.images || [];
        (E.key === "Escape" && ze(null),
          E.key === "ArrowRight" &&
            w.length > 1 &&
            $e((L) => (L + 1) % w.length),
          E.key === "ArrowLeft" &&
            w.length > 1 &&
            $e((L) => (L - 1 + w.length) % w.length));
      };
      return (
        window.addEventListener("keydown", f),
        () => window.removeEventListener("keydown", f)
      );
    }, [Z]));
  const Ge = U.useMemo(() => [...je, ...dh].map(Og), [je]),
    Ve = Ge.find((f) => f.id === s) || Ge[0],
    Lt = U.useMemo(() => ["All", ...new Set(Ge.map((f) => f.type))], [Ge]),
    xt = U.useMemo(() => {
      const f = Y ? Number(Y) : null,
        E = $ ? Number($) : null;
      return Ge.filter(
        (w) =>
          !(
            (Q !== "All" && w.type !== Q) ||
            (f !== null && w.priceNGN < f) ||
            (E !== null && w.priceNGN > E)
          ),
      );
    }, [Ge, Y, $, Q]),
    Ie = Math.max(1, Math.ceil(xt.length / ie)),
    O = xt.slice((oe - 1) * ie, oe * ie),
    B = Z?.images || [],
    K = (f) =>
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(f),
    re = (f, E = 0) => {
      (ze(f), $e(E));
    },
    ge = async (f) => {
      (f.preventDefault(), R(!0), N(""), v(null));
      try {
        const E = { ...p, car_id: Ve.id, car_name: Ve.name, order_type: h },
          w = await zh(Cg, E);
        v(w);
      } catch (E) {
        N(E.message || "Order submission failed.");
      } finally {
        R(!1);
      }
    };
  return u.jsx("div", {
    className: "cars-wrap",
    children: u.jsxs("div", {
      className: "container",
      children: [
        u.jsxs("div", {
          className: "cars-hero",
          children: [
            u.jsx("h2", { children: "Available Cars & Pre-Orders" }),
            u.jsx("p", {
              style: { color: "var(--gray)" },
              children:
                "Browse in-stock vehicles or place a pre-order for upcoming arrivals. We will contact you to confirm payment and shipping.",
            }),
          ],
        }),
        u.jsxs("div", {
          className: "filters",
          children: [
            u.jsxs("div", {
              className: "filter-item",
              children: [
                u.jsx("label", { children: "Type" }),
                u.jsx("select", {
                  value: Q,
                  onChange: (f) => {
                    (ne(f.target.value), H(1));
                  },
                  children: Lt.map((f) =>
                    u.jsx("option", { value: f, children: f }, f),
                  ),
                }),
              ],
            }),
            u.jsxs("div", {
              className: "filter-item",
              children: [
                u.jsx("label", { children: "Min Price (₦)" }),
                u.jsx("input", {
                  type: "number",
                  placeholder: "0",
                  value: Y,
                  onChange: (f) => {
                    (ee(f.target.value), H(1));
                  },
                }),
              ],
            }),
            u.jsxs("div", {
              className: "filter-item",
              children: [
                u.jsx("label", { children: "Max Price (₦)" }),
                u.jsx("input", {
                  type: "number",
                  placeholder: "No limit",
                  value: $,
                  onChange: (f) => {
                    (J(f.target.value), H(1));
                  },
                }),
              ],
            }),
          ],
        }),
        u.jsx("div", {
          className: "cars-grid",
          children: O.map((f) =>
            u.jsxs(
              "div",
              {
                className: "car-card",
                children: [
                  u.jsxs("div", {
                    className: "car-image",
                    role: "button",
                    tabIndex: 0,
                    onClick: () => re(f, 0),
                    onKeyDown: (E) => {
                      (E.key === "Enter" || E.key === " ") &&
                        (E.preventDefault(), re(f, 0));
                    },
                    style: { cursor: "pointer", position: "relative" },
                    children: [
                      u.jsx("img", {
                        src: f.images[0],
                        alt: f.name,
                        loading: "lazy",
                      }),
                      f.images.length > 1 &&
                        u.jsxs("span", {
                          style: {
                            position: "absolute",
                            bottom: "8px",
                            right: "8px",
                            background: "rgba(15,23,42,0.8)",
                            color: "#fff",
                            padding: "4px 8px",
                            borderRadius: "999px",
                            fontSize: "12px",
                          },
                          children: [f.images.length, " photos"],
                        }),
                    ],
                  }),
                  f.images.length > 1 &&
                    u.jsx("div", {
                      style: {
                        display: "flex",
                        gap: "6px",
                        marginBottom: "10px",
                      },
                      children: f.images
                        .slice(0, 4)
                        .map((E, w) =>
                          u.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => re(f, w),
                              style: {
                                border: "1px solid #cbd5e1",
                                borderRadius: "6px",
                                padding: 0,
                                overflow: "hidden",
                                cursor: "pointer",
                                width: "56px",
                                height: "42px",
                                background: "#fff",
                              },
                              children: u.jsx("img", {
                                src: E,
                                alt: `${f.name} preview ${w + 1}`,
                                style: {
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                },
                              }),
                            },
                            `${f.id}-thumb-${w}`,
                          ),
                        ),
                    }),
                  u.jsx("span", {
                    className: `car-badge ${f.availability === "Available" ? "available" : "preorder"}`,
                    children:
                      f.availability === "Available"
                        ? "Available Now"
                        : "Pre-Order",
                  }),
                  u.jsx("h3", {
                    style: { marginBottom: "6px" },
                    children: f.name,
                  }),
                  u.jsxs("p", {
                    style: { color: "var(--gray)", fontSize: "14px" },
                    children: ["Type: ", f.type],
                  }),
                  u.jsxs("p", {
                    style: { color: "var(--gray)", fontSize: "14px" },
                    children: ["Location: ", f.location],
                  }),
                  u.jsx("p", {
                    style: { marginTop: "10px", fontWeight: "700" },
                    children: K(f.priceNGN),
                  }),
                  u.jsx("button", {
                    className: "cta-btn",
                    style: { marginTop: "14px", width: "100%" },
                    onClick: () => {
                      (d(f.id),
                        o(
                          f.availability === "Available"
                            ? "Order"
                            : "Pre-Order",
                        ));
                    },
                    children:
                      f.availability === "Available"
                        ? "Order This Car"
                        : "Pre-Order This Car",
                  }),
                  f.images.length > 1 &&
                    u.jsx("button", {
                      type: "button",
                      className: "btn-outline",
                      style: {
                        marginTop: "10px",
                        width: "100%",
                        color: "var(--primary)",
                        borderColor: "#cbd5e1",
                      },
                      onClick: () => re(f, 0),
                      children: "View All Photos",
                    }),
                ],
              },
              f.id,
            ),
          ),
        }),
        u.jsxs("div", {
          className: "pagination",
          children: [
            u.jsx("button", {
              className: "btn-outline",
              onClick: () => H((f) => Math.max(1, f - 1)),
              disabled: oe === 1,
              children: "Prev",
            }),
            u.jsxs("span", { children: ["Page ", oe, " of ", Ie] }),
            u.jsx("button", {
              className: "cta-btn",
              onClick: () => H((f) => Math.min(Ie, f + 1)),
              disabled: oe === Ie,
              children: "Next",
            }),
          ],
        }),
        u.jsxs("div", {
          className: "order-panel",
          children: [
            u.jsxs("h3", {
              style: { marginBottom: "10px" },
              children: ["Place Your ", h],
            }),
            u.jsxs("form", {
              onSubmit: ge,
              children: [
                u.jsx("select", {
                  value: s,
                  onChange: (f) => d(f.target.value),
                  children: Ge.map((f) =>
                    u.jsxs(
                      "option",
                      {
                        value: f.id,
                        children: [f.name, " (", f.availability, ")"],
                      },
                      f.id,
                    ),
                  ),
                }),
                u.jsx("input", {
                  type: "text",
                  placeholder: "Full Name",
                  value: p.customer_name,
                  onChange: (f) => x({ ...p, customer_name: f.target.value }),
                }),
                u.jsx("input", {
                  type: "email",
                  placeholder: "Email Address",
                  value: p.customer_email,
                  onChange: (f) => x({ ...p, customer_email: f.target.value }),
                }),
                u.jsx("input", {
                  type: "tel",
                  placeholder: "Phone Number",
                  value: p.customer_phone,
                  onChange: (f) => x({ ...p, customer_phone: f.target.value }),
                }),
                u.jsx("input", {
                  type: "text",
                  placeholder: "Preferred Delivery City",
                  value: p.delivery_city,
                  onChange: (f) => x({ ...p, delivery_city: f.target.value }),
                }),
                u.jsx("button", {
                  type: "submit",
                  className: "cta-btn",
                  style: { width: "100%" },
                  disabled: T,
                  children: T ? "Submitting..." : `Submit ${h}`,
                }),
                D &&
                  u.jsx("div", {
                    className: "auth-error",
                    style: { marginTop: "10px" },
                    children: D,
                  }),
              ],
            }),
            A?.tracking_number &&
              u.jsxs("div", {
                className: "tracking-result",
                style: { marginTop: "16px" },
                children: [
                  u.jsxs("p", {
                    children: [
                      u.jsx("strong", { children: "Order Created." }),
                      " Your tracking number is:",
                    ],
                  }),
                  u.jsx("p", {
                    children: u.jsx("strong", { children: A.tracking_number }),
                  }),
                  u.jsxs("p", {
                    children: [
                      "Track it on the ",
                      u.jsx("a", { href: "/track", children: "tracking page" }),
                      ".",
                    ],
                  }),
                ],
              }),
          ],
        }),
        Z &&
          B.length > 0 &&
          u.jsx("div", {
            onClick: () => ze(null),
            style: {
              position: "fixed",
              inset: 0,
              background: "rgba(2,6,23,0.85)",
              zIndex: 1200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            },
            children: u.jsxs("div", {
              onClick: (f) => f.stopPropagation(),
              style: {
                width: "min(900px, 100%)",
                background: "#fff",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(2,6,23,0.4)",
              },
              children: [
                u.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderBottom: "1px solid #e2e8f0",
                  },
                  children: [
                    u.jsx("strong", { children: Z.name }),
                    u.jsx("button", {
                      type: "button",
                      className: "btn-outline",
                      style: {
                        color: "var(--primary)",
                        borderColor: "#cbd5e1",
                      },
                      onClick: () => ze(null),
                      children: "Close",
                    }),
                  ],
                }),
                u.jsxs("div", {
                  style: { position: "relative", background: "#0f172a" },
                  children: [
                    u.jsx("img", {
                      src: B[_e],
                      alt: `${Z.name} ${_e + 1}`,
                      style: {
                        width: "100%",
                        maxHeight: "70vh",
                        objectFit: "contain",
                        display: "block",
                      },
                    }),
                    B.length > 1 &&
                      u.jsxs(u.Fragment, {
                        children: [
                          u.jsx("button", {
                            type: "button",
                            onClick: () =>
                              $e((f) => (f - 1 + B.length) % B.length),
                            style: {
                              position: "absolute",
                              left: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              border: "none",
                              background: "rgba(255,255,255,0.9)",
                              width: "36px",
                              height: "36px",
                              borderRadius: "999px",
                              cursor: "pointer",
                            },
                            children: "‹",
                          }),
                          u.jsx("button", {
                            type: "button",
                            onClick: () => $e((f) => (f + 1) % B.length),
                            style: {
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              border: "none",
                              background: "rgba(255,255,255,0.9)",
                              width: "36px",
                              height: "36px",
                              borderRadius: "999px",
                              cursor: "pointer",
                            },
                            children: "›",
                          }),
                        ],
                      }),
                  ],
                }),
                B.length > 1 &&
                  u.jsx("div", {
                    style: {
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(80px, 1fr))",
                      gap: "8px",
                      padding: "10px",
                      maxHeight: "140px",
                      overflowY: "auto",
                      background: "#f8fafc",
                    },
                    children: B.map((f, E) =>
                      u.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => $e(E),
                          style: {
                            border:
                              E === _e
                                ? "2px solid #2563eb"
                                : "1px solid #cbd5e1",
                            borderRadius: "8px",
                            padding: 0,
                            overflow: "hidden",
                            cursor: "pointer",
                            background: "#fff",
                          },
                          children: u.jsx("img", {
                            src: f,
                            alt: `${Z.name} thumbnail ${E + 1}`,
                            style: {
                              width: "100%",
                              height: "64px",
                              objectFit: "cover",
                              display: "block",
                            },
                          }),
                        },
                        `${Z.id}-${E}`,
                      ),
                    ),
                  }),
              ],
            }),
          }),
      ],
    }),
  });
}
function Mg() {
  const s = Il(),
    d = () => s("/", { state: { scrollTo: "contact" } });
  return u.jsxs("div", {
    className: "solutions-wrap",
    children: [
      u.jsx("section", {
        className: "solutions-hero",
        children: u.jsxs("div", {
          className: "container",
          children: [
            u.jsx("p", {
              className: "solutions-eyebrow",
              children: "Solutions",
            }),
            u.jsx("h1", {
              children: "Sea Freight Solutions Built for Vehicle Logistics",
            }),
            u.jsx("p", {
              className: "solutions-subtitle",
              children:
                "We move vehicles, machinery, and cargo by sea only. From planning and documentation to loading and port delivery, our ocean-forwarding team keeps every shipment on course.",
            }),
            u.jsxs("div", {
              className: "solutions-cta",
              children: [
                u.jsx("a", {
                  className: "cta-btn",
                  href: "/track",
                  children: "Track Shipment",
                }),
                u.jsx("button", {
                  className: "btn-outline",
                  type: "button",
                  onClick: d,
                  children: "Request a Quote",
                }),
              ],
            }),
          ],
        }),
      }),
      u.jsx("section", {
        className: "solutions-section",
        children: u.jsxs("div", {
          className: "container",
          children: [
            u.jsxs("div", {
              className: "section-head",
              children: [
                u.jsx("h2", { children: "Mode of Transport" }),
                u.jsx("p", {
                  children:
                    "We operate exclusively by sea to deliver dependable, cost-efficient ocean freight.",
                }),
              ],
            }),
            u.jsxs("div", {
              className: "solutions-grid",
              children: [
                u.jsxs("div", {
                  className: "solution-card",
                  children: [
                    u.jsx("h3", { children: "Sea Freight" }),
                    u.jsx("p", {
                      children:
                        "Ideal when cost efficiency is essential and timelines are planned. We coordinate export documentation, port handling, and customs clearance for smooth ocean transit.",
                    }),
                    u.jsxs("ul", {
                      children: [
                        u.jsx("li", { children: "FCL and LCL shipments" }),
                        u.jsx("li", {
                          children: "RoRo and break-bulk options",
                        }),
                        u.jsx("li", {
                          children: "Door-to-port or door-to-door",
                        }),
                      ],
                    }),
                  ],
                }),
                u.jsxs("div", {
                  className: "solution-card",
                  children: [
                    u.jsx("h3", { children: "Ocean Compliance" }),
                    u.jsx("p", {
                      children:
                        "Our team handles shipping instructions, compliance checks, and vessel scheduling to keep cargo moving across North America and West Africa.",
                    }),
                    u.jsxs("ul", {
                      children: [
                        u.jsx("li", {
                          children: "Export documentation support",
                        }),
                        u.jsx("li", { children: "Customs coordination" }),
                        u.jsx("li", { children: "Real-time tracking updates" }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      u.jsx("section", {
        className: "solutions-section solutions-alt",
        children: u.jsxs("div", {
          className: "container",
          children: [
            u.jsxs("div", {
              className: "section-head",
              children: [
                u.jsx("h2", { children: "Cargo Types We Handle" }),
                u.jsx("p", {
                  children:
                    "Flexible sea freight solutions for vehicles, equipment, and general cargo.",
                }),
              ],
            }),
            u.jsxs("div", {
              className: "solutions-grid",
              children: [
                u.jsxs("div", {
                  className: "solution-card",
                  children: [
                    u.jsx("h3", { children: "RoRo Shipments" }),
                    u.jsx("p", {
                      children:
                        "Cars, trucks, SUVs, buses, and rolling equipment moved safely via RoRo vessels.",
                    }),
                  ],
                }),
                u.jsxs("div", {
                  className: "solution-card",
                  children: [
                    u.jsx("h3", { children: "High & Heavy" }),
                    u.jsx("p", {
                      children:
                        "Oversized machinery, construction equipment, and industrial units handled with care.",
                    }),
                  ],
                }),
                u.jsxs("div", {
                  className: "solution-card",
                  children: [
                    u.jsx("h3", { children: "Containerized Cargo" }),
                    u.jsx("p", {
                      children:
                        "Standard, high-cube, and specialty containers organized for efficient ocean transit.",
                    }),
                  ],
                }),
                u.jsxs("div", {
                  className: "solution-card",
                  children: [
                    u.jsx("h3", { children: "General Cargo" }),
                    u.jsx("p", {
                      children:
                        "Mixed freight and boxed goods consolidated for reliable port-to-port delivery.",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      u.jsx("section", {
        className: "solutions-section",
        children: u.jsxs("div", {
          className: "container",
          children: [
            u.jsxs("div", {
              className: "section-head",
              children: [
                u.jsx("h2", { children: "Auction Services" }),
                u.jsx("p", {
                  children:
                    "Support for auction vehicles from bid to vessel loading.",
                }),
              ],
            }),
            u.jsxs("div", {
              className: "solutions-grid",
              children: [
                u.jsxs("div", {
                  className: "solution-card",
                  children: [
                    u.jsx("h3", { children: "Transport from Auctions" }),
                    u.jsx("p", {
                      children:
                        "We pick up vehicles from auction yards and coordinate inland delivery to the nearest port for sea shipment.",
                    }),
                  ],
                }),
                u.jsxs("div", {
                  className: "solution-card",
                  children: [
                    u.jsx("h3", { children: "Bid & Buy Assistance" }),
                    u.jsx("p", {
                      children:
                        "Guidance on paperwork, title readiness, and export procedures so your purchase ships without delays.",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      u.jsx("section", {
        className: "solutions-section solutions-destinations",
        children: u.jsxs("div", {
          className: "container",
          children: [
            u.jsxs("div", {
              className: "section-head",
              children: [
                u.jsx("h2", { children: "Destinations" }),
                u.jsx("p", {
                  children:
                    "Focused routes across North America and West Africa with reliable sailings.",
                }),
              ],
            }),
            u.jsxs("div", {
              className: "destinations-grid",
              children: [
                u.jsxs("div", {
                  children: [
                    u.jsx("h3", { children: "North America" }),
                    u.jsx("p", {
                      children:
                        "Major U.S. and Canadian ports with frequent departures.",
                    }),
                  ],
                }),
                u.jsxs("div", {
                  children: [
                    u.jsx("h3", { children: "West Africa" }),
                    u.jsx("p", {
                      children:
                        "Key coastal ports for fast clearance and local delivery coordination.",
                    }),
                  ],
                }),
                u.jsxs("div", {
                  children: [
                    u.jsx("h3", { children: "Port-to-Port Focus" }),
                    u.jsx("p", {
                      children:
                        "We specialize in sea freight routing with consistent schedules and tracking.",
                    }),
                  ],
                }),
              ],
            }),
            u.jsxs("div", {
              className: "solutions-cta",
              children: [
                u.jsx("a", {
                  className: "cta-btn",
                  href: "/track",
                  children: "Track Shipment",
                }),
                u.jsx("button", {
                  className: "btn-outline",
                  type: "button",
                  onClick: d,
                  children: "Speak to an Expert",
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
const Ms = [
  {
    label: "Sallaum Lines",
    url: "https://sallaumlines.com/schedules/",
    description: "RoRo route schedules by region.",
  },
  {
    label: "Grimaldi Lines",
    url: "https://www.net.grimaldi-eservice.com/GNET/Home",
    description: "Sailing schedules and point-to-point enquiry.",
  },
  {
    label: "MSC",
    url: "https://www.msc.com/en/search-a-schedule",
    description: "MSC container sailing schedule search.",
  },
];
function Rg() {
  const [s, d] = U.useState(Ms[0].url),
    h = U.useMemo(() => Ms.find((o) => o.url === s), [s]);
  return u.jsxs("div", {
    className: "auth-wrap",
    children: [
      u.jsx("section", {
        className: "schedule-hero",
        children: u.jsxs("div", {
          className: "container",
          children: [
            u.jsx("h1", { children: "Schedules" }),
            u.jsx("p", {
              children:
                "Browse sailing schedules from our trusted ocean carriers.",
            }),
          ],
        }),
      }),
      u.jsx("section", {
        className: "schedule-search",
        children: u.jsx("div", {
          className: "container",
          children: u.jsxs("div", {
            className: "schedule-card",
            children: [
              u.jsxs("div", {
                children: [
                  u.jsx("div", {
                    className: "schedule-label",
                    children: "Select Carrier",
                  }),
                  u.jsx("select", {
                    className: "schedule-select",
                    value: s,
                    onChange: (o) => d(o.target.value),
                    children: Ms.map((o) =>
                      u.jsx(
                        "option",
                        { value: o.url, children: o.label },
                        o.url,
                      ),
                    ),
                  }),
                  u.jsx("div", {
                    className: "schedule-note",
                    children: h?.description,
                  }),
                ],
              }),
              u.jsx("a", {
                className: "schedule-btn",
                href: s,
                target: "_blank",
                rel: "noreferrer",
                children: "Browse Schedules",
              }),
            ],
          }),
        }),
      }),
    ],
  });
}
const Ug = () => localStorage.getItem("afolary_admin") === "true";
function Dg({ children: s }) {
  const d = al();
  return Ug()
    ? s
    : u.jsx(Ah, { to: "/admin-login", state: { from: d }, replace: !0 });
}
function wg({ children: s }) {
  const [d, h] = U.useState(!1),
    [o, p] = U.useState(!1),
    x = Il(),
    T = al(),
    R = (A) => {
      if (T.pathname === "/") {
        const v = document.getElementById(A);
        v && v.scrollIntoView({ behavior: "smooth" });
      } else x("/", { state: { scrollTo: A } });
      h(!1);
    };
  return u.jsxs("div", {
    className: "afolary-app",
    children: [
      u.jsx("style", {
        children: `
        :root {
          --primary: #0f172a;
          --secondary: #2563eb;
          --accent: #f59e0b;
          --light: #f8fafc;
          --gray: #64748b;
          --white: #ffffff;
          --callbar-height: 40px;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', system-ui, sans-serif; min-width: 0; }
        body { background: var(--light); color: var(--primary); line-height: 1.6; }
        a { text-decoration: none; color: inherit; }
        ul { list-style: none; }
        img, svg, video { max-width: 100%; height: auto; }
        
        .afolary-app { width: 100%; overflow-x: hidden; }
        .container { width: min(1200px, 100%); margin: 0 auto; padding: 0 20px; }
        section { padding: clamp(56px, 7vw, 80px) 0; }
        
        /* Header */
        .top-callbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: var(--primary);
          color: white;
          z-index: 1001;
          height: var(--callbar-height);
        }
        .top-callbar .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          height: var(--callbar-height);
          font-size: 14px;
        }
        .callbar-text { font-weight: 600; letter-spacing: 0.02em; }
        .callbar-actions { position: relative; }
        .callbar-btn {
          background: rgba(255,255,255,0.12);
          color: white;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
        .callbar-menu {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          background: white;
          color: var(--primary);
          border-radius: 10px;
          box-shadow: 0 10px 24px rgba(15,23,42,0.18);
          border: 1px solid #e2e8f0;
          min-width: 200px;
          overflow: hidden;
          z-index: 1002;
        }
        .callbar-menu a {
          display: block;
          padding: 10px 14px;
          font-size: 14px;
          color: var(--primary);
        }
        .callbar-menu a:hover { background: #f8fafc; }

        header { background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); border-bottom: 1px solid #e2e8f0; position: fixed; width: 100%; top: var(--callbar-height); z-index: 1000; }
        nav { display: flex; justify-content: space-between; align-items: center; min-height: 72px; gap: 16px; }
        .logo { font-size: 20px; font-weight: 700; color: var(--primary); display: flex; align-items: center; gap: 10px; letter-spacing: 0.02em; }
        .logo span { color: var(--secondary); }
        .nav-links { display: flex; gap: 22px; align-items: center; }
        .nav-links button,
        .nav-links a {
          background: none;
          border: none;
          font-size: 15px;
          font-weight: 500;
          color: var(--primary);
          cursor: pointer;
          padding: 6px 0;
          position: relative;
          transition: color 0.2s;
        }
        .nav-links button::after,
        .nav-links a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0;
          height: 2px;
          background: var(--secondary);
          transition: width 0.2s;
        }
        .nav-links button:hover,
        .nav-links a:hover { color: var(--secondary); }
        .nav-links button:hover::after,
        .nav-links a:hover::after { width: 100%; }
        .cta-btn { background: var(--secondary); color: white; padding: 10px 18px; border-radius: 999px; font-weight: 600; transition: background 0.2s, transform 0.2s; border: none; cursor: pointer; }
        .cta-btn:hover { background: var(--primary); transform: translateY(-1px); }
        .menu-btn { display: none; background: transparent; border: 1px solid #e2e8f0; border-radius: 999px; padding: 8px 10px; cursor: pointer; }
        .menu-bars { width: 22px; height: 2px; background: var(--primary); display: block; position: relative; }
        .menu-bars::before, .menu-bars::after { content: ''; position: absolute; left: 0; width: 22px; height: 2px; background: var(--primary); }
        .menu-bars::before { top: -7px; }
        .menu-bars::after { top: 7px; }
        .mobile-menu { display: none; position: absolute; top: 100%; left: 0; right: 0; background: white; border-bottom: 1px solid #e2e8f0; box-shadow: 0 10px 20px rgba(0,0,0,0.06); }
        .mobile-menu .menu-inner { display: flex; flex-direction: column; gap: 12px; padding: 20px; }
        .mobile-menu button { background: none; border: none; font-size: 16px; text-align: left; padding: 8px 4px; color: var(--primary); cursor: pointer; }
        .mobile-menu a { font-size: 16px; text-align: left; padding: 8px 4px; color: var(--primary); }
        .mobile-menu .cta-btn { width: 100%; text-align: center; }
        
        /* Hero */
        .hero { 
          background: linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.7)), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'); 
          background-size: cover; 
          background-position: center; 
          height: 100vh; 
          display: flex; 
          align-items: center; 
          color: white; 
          padding-top: 80px; 
        }
        .hero-content { max-width: 700px; }
        .hero h1 { font-size: clamp(32px, 4.6vw, 56px); margin-bottom: 20px; line-height: 1.1; font-weight: 800; }
        .hero p { font-size: clamp(16px, 2vw, 20px); margin-bottom: 40px; color: #cbd5e1; max-width: 600px; }
        .hero-btns { display: flex; gap: 20px; }
        .btn-outline { background: transparent; border: 2px solid white; color: white; padding: 12px 24px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
        .btn-outline:hover { background: white; color: var(--primary); }

        /* Stats */
        .stats { background: var(--secondary); color: white; padding: 40px 0; }
        .stats-grid { display: flex; justify-content: space-around; text-align: center; flex-wrap: wrap; gap: 20px; }
        .stat-item h3 { font-size: clamp(28px, 3.5vw, 36px); font-weight: 700; margin-bottom: 5px; }
        
        /* Services */
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-top: 40px; }
        .service-card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); transition: transform 0.3s; border-top: 4px solid var(--secondary); }
        .service-card:hover { transform: translateY(-5px); }
        .service-icon { width: 50px; height: 50px; background: #eff6ff; color: var(--secondary); display: flex; align-items: center; justify-content: center; border-radius: 50%; margin-bottom: 20px; }

        /* Process */
        .process-step { flex: 1; min-width: 200px; text-align: center; position: relative; }
        .step-number { width: 40px; height: 40px; background: var(--secondary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin: 0 auto 20px; }

        /* Google Reviews */
        .google-reviews {
          display: grid;
          grid-template-columns: minmax(260px, 360px) 1fr;
          gap: 28px;
          align-items: center;
        }
        .google-reviews-text h2 { font-size: clamp(26px, 3vw, 36px); margin-bottom: 10px; }
        .google-reviews-text p { color: var(--gray); margin-bottom: 18px; }
        .google-reviews-embed iframe {
          width: 100%;
          height: 360px;
          border: 0;
          border-radius: 14px;
          box-shadow: 0 14px 28px rgba(15,23,42,0.1);
        }
        
        /* Contact */
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; }
        .contact-form input, .contact-form textarea { width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #cbd5e1; border-radius: 6px; outline: none; }
        .contact-form input:focus, .contact-form textarea:focus { border-color: var(--secondary); }
        .contact-info-item { display: flex; gap: 15px; margin-bottom: 20px; align-items: center; }

        /* Auth */
        .auth-wrap { min-height: 100vh; padding-top: 120px; background: linear-gradient(135deg, #eef2ff, #f8fafc); }
        .auth-card { background: white; max-width: 520px; margin: 0 auto; padding: 40px; border-radius: 16px; box-shadow: 0 20px 40px rgba(15,23,42,0.08); }
        .auth-card h2 { margin-bottom: 8px; }
        .auth-card p { color: var(--gray); margin-bottom: 20px; }
        .auth-card input { width: 100%; padding: 12px 14px; border-radius: 8px; border: 1px solid #cbd5e1; margin-bottom: 14px; font-size: 15px; }
        .auth-card input:focus { border-color: var(--secondary); outline: none; }
        .auth-hint { background: #eff6ff; color: #1e40af; border-radius: 8px; padding: 12px 14px; font-size: 14px; margin-top: 12px; }
        .auth-error { color: #b91c1c; margin-top: 8px; font-size: 14px; }
        .tracking-result { margin-top: 20px; padding: 16px; background: #ecfdf5; border-radius: 8px; border: 1px solid #10b981; color: #065f46; text-align: left; animation: fadeIn 0.5s ease; }
        .track-hero {
          background: linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.7)),
            url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80');
          background-size: cover;
          background-position: center;
          color: white;
          padding: clamp(150px, 18vh, 190px) 0 clamp(120px, 14vh, 150px);
          margin-top: 40px;
        }
        .track-hero h1 { font-size: clamp(32px, 4vw, 48px); margin-bottom: 10px; }
        .track-hero p { color: #e2e8f0; max-width: 640px; }

        .schedule-hero {
          background: linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.7)),
            url('https://images.unsplash.com/photo-1606185540834-d6e7483ee1a4?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
          background-size: cover;
          background-position: center;
          color: white;
          padding: clamp(150px, 18vh, 190px) 0 clamp(120px, 14vh, 150px);
          margin-top: 40px;
        }
        .schedule-hero h1 { font-size: clamp(32px, 4vw, 48px); margin-bottom: 10px; }
        .schedule-hero p { color: #e2e8f0; margin-bottom: 28px; max-width: 640px; }
        .schedule-search { padding: 50px 0 80px; }
        .schedule-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          background: rgba(255,255,255,0.98);
          border: 1px solid rgba(255,255,255,0.5);
          border-radius: 14px;
          padding: 24px;
        }
        .schedule-label { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--gray); margin-bottom: 8px; }
        .schedule-select {
          min-width: 260px;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          font: inherit;
          background: white;
        }
        .schedule-note { color: var(--gray); font-size: 13px; margin-top: 8px; }
        .schedule-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 24px;
          background: #9f1d1d;
          color: white;
          border-radius: 8px;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 13px;
          letter-spacing: 0.05em;
        }
        .schedule-btn:hover { opacity: 0.9; }

        .track-links { display: grid; gap: 14px; margin-top: 16px; }
        .track-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: var(--primary);
          font-weight: 600;
          transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .track-link:hover {
          transform: translateY(-2px);
          border-color: #cbd5f5;
          box-shadow: 0 10px 18px rgba(15,23,42,0.08);
        }
        .track-link span { color: var(--gray); font-weight: 500; font-size: 14px; }

        .timeline { margin-top: 20px; display: grid; gap: 14px; }
        .timeline-item { display: grid; grid-template-columns: 16px 1fr; gap: 12px; align-items: start; }
        .timeline-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--secondary); margin-top: 6px; }
        .timeline-content { background: white; border-radius: 10px; padding: 12px 14px; border: 1px solid #e2e8f0; }
        .timeline-date { font-size: 12px; color: var(--gray); margin-bottom: 4px; }
        .timeline-title { font-weight: 700; margin-bottom: 2px; }
        .timeline-detail { font-size: 14px; color: var(--primary); margin-bottom: 4px; }
        .timeline-location { font-size: 13px; color: var(--gray); }

        /* Admin */
        .admin-wrap { padding-top: 120px; min-height: 100vh; background: #f8fafc; }
        .admin-header { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 24px; }
        .pill-tabs { display: flex; gap: 10px; flex-wrap: wrap; }
        .pill { padding: 8px 14px; border-radius: 999px; border: 1px solid #cbd5e1; background: white; cursor: pointer; font-size: 14px; }
        .pill.active { background: var(--secondary); color: white; border-color: var(--secondary); }
        .admin-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
        .admin-card { background: white; padding: 18px; border-radius: 12px; box-shadow: 0 10px 20px rgba(15,23,42,0.06); border-left: 4px solid var(--secondary); }
        .admin-meta { color: var(--gray); font-size: 14px; margin-top: 6px; }
        .admin-panel { background: white; padding: 24px; border-radius: 14px; box-shadow: 0 16px 30px rgba(15,23,42,0.08); border: 1px solid #e2e8f0; }
        .admin-panel h3 { margin-bottom: 14px; }
        .admin-form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
        .admin-form-grid input, .admin-form-grid select { width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #cbd5e1; }
        .admin-form-actions { display: flex; gap: 10px; align-items: center; }
        .admin-chip { display: inline-flex; padding: 4px 10px; border-radius: 999px; font-size: 12px; background: #eef2ff; color: #3730a3; }
        .admin-delete { display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px; border-radius: 999px; border: 1px solid #fecaca; background: #fff1f2; color: #b91c1c; cursor: pointer; font-size: 13px; }
        .admin-delete:hover { background: #ffe4e6; }
        .admin-delete-icon { width: 16px; height: 16px; display: inline-block; border-radius: 4px; background: #fecaca; color: #b91c1c; text-align: center; line-height: 16px; font-weight: 700; font-size: 12px; }

        /* Cars */
        .cars-wrap { padding-top: 120px; min-height: 100vh; background: #f8fafc; }
        .cars-hero { text-align: center; max-width: 760px; margin: 0 auto 40px; }
        .cars-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
        .car-card { background: white; padding: 18px; border-radius: 12px; box-shadow: 0 10px 20px rgba(15,23,42,0.06); }
        .car-image { width: 100%; height: 180px; border-radius: 10px; overflow: hidden; background: #e2e8f0; margin-bottom: 12px; }
        .car-image img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .car-badge { display: inline-flex; padding: 4px 10px; border-radius: 999px; font-size: 12px; background: #e2e8f0; color: #334155; margin-bottom: 10px; }
        .car-badge.available { background: #dcfce7; color: #166534; }
        .car-badge.preorder { background: #fef9c3; color: #854d0e; }
        .order-panel { background: white; padding: 24px; border-radius: 12px; margin-top: 30px; box-shadow: 0 10px 20px rgba(15,23,42,0.06); }
        .order-panel input, .order-panel select { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1; margin-bottom: 12px; }
        .filters { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 20px; }
        .filter-item label { display: block; font-size: 13px; color: var(--gray); margin-bottom: 6px; }
        .filter-item input, .filter-item select { width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #cbd5e1; }
        .pagination { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 24px; flex-wrap: wrap; }

        /* Solutions */
        .solutions-wrap { padding-top: 120px; background: #f8fafc; }
        .solutions-hero {
          background: linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.75)),
            url('https://images.unsplash.com/photo-1518527989017-5baca7a58d3c?auto=format&fit=crop&w=2000&q=80');
          background-size: cover;
          background-position: center;
          color: white;
          padding: 140px 0 110px;
        }
        .solutions-eyebrow { text-transform: uppercase; letter-spacing: 0.18em; font-size: 12px; color: #f8fafc; }
        .solutions-hero h1 { font-size: clamp(34px, 4.2vw, 56px); margin: 16px 0; max-width: 760px; }
        .solutions-subtitle { max-width: 720px; color: #e2e8f0; margin-bottom: 26px; }
        .solutions-cta { display: flex; gap: 16px; flex-wrap: wrap; }
        .solutions-section { padding: 70px 0; }
        .solutions-alt { background: white; }
        .section-head { margin-bottom: 32px; max-width: 720px; }
        .section-head h2 { font-size: clamp(26px, 3.2vw, 38px); margin-bottom: 10px; }
        .section-head p { color: var(--gray); }
        .solutions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
        .solution-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 14px 24px rgba(15,23,42,0.06);
        }
        .solutions-alt .solution-card { background: #f8fafc; }
        .solution-card h3 { margin-bottom: 10px; }
        .solution-card p { color: var(--gray); font-size: 14px; }
        .solution-card ul { margin-top: 12px; padding-left: 18px; color: var(--gray); font-size: 14px; list-style: disc; }
        .solutions-destinations { background: #0f172a; color: white; }
        .solutions-destinations .section-head p { color: #cbd5e1; }
        .destinations-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .destinations-grid div { background: rgba(255,255,255,0.06); border-radius: 12px; padding: 20px; }
        .destinations-grid p { color: #cbd5e1; font-size: 14px; }

        /* FAQ */
        .faq-list { display: grid; gap: 12px; max-width: 900px; margin: 0 auto; }
        .faq-item {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 14px 18px;
        }
        .faq-item summary {
          cursor: pointer;
          font-weight: 600;
          list-style: none;
        }
        .faq-item summary::-webkit-details-marker { display: none; }
        .faq-item summary::after {
          content: '+';
          float: right;
          color: var(--secondary);
          font-weight: 700;
        }
        .faq-item[open] summary::after { content: '–'; }
        .faq-item p { margin-top: 10px; color: var(--gray); font-size: 14px; }

        /* Footer */
        .site-footer {
          background: var(--primary);
          color: white;
          padding: 48px 0 32px;
          margin-top: 40px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr 1fr;
          gap: 24px;
          align-items: start;
        }
        .footer-brand { font-size: 20px; font-weight: 700; letter-spacing: 0.02em; margin-bottom: 10px; }
        .footer-text { color: #cbd5e1; font-size: 14px; max-width: 360px; }
        .footer-title { font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; color: #e2e8f0; }
        .footer-links { display: grid; gap: 8px; }
        .footer-links a,
        .footer-links button {
          color: #cbd5e1;
          font-size: 14px;
          background: none;
          border: none;
          padding: 0;
          text-align: left;
          cursor: pointer;
        }
        .footer-links a:hover,
        .footer-links button:hover { color: white; }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.15);
          margin-top: 28px;
          padding-top: 16px;
          color: #cbd5e1;
          font-size: 13px;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        @media (max-width: 1240px) {
          .nav-links { display: none; }
          .menu-btn { display: inline-flex; align-items: center; justify-content: center; }
          .mobile-menu { display: block; }
          .header-cta { display: none; }
        }
        @media (max-width: 1240px) {
          .cta-btn { padding: 10px 18px; }
        }
        @media (max-width: 820px) {
          nav { height: auto; padding: 14px 0; }
          .logo { font-size: 20px; gap: 8px; flex-wrap: wrap; }
          .stats-grid { justify-content: center; }
          .contact-grid { grid-template-columns: 1fr; gap: 30px; }
          .cars-hero { margin-bottom: 24px; }
          .filters { grid-template-columns: 1fr; }
          .admin-header { flex-direction: column; align-items: flex-start; }
          .admin-form-actions { flex-wrap: wrap; }
          .solutions-hero { padding: 120px 0 90px; text-align: center; }
          .solutions-cta { justify-content: center; }
          .google-reviews { grid-template-columns: 1fr; }
          :root { --callbar-height: 48px; }
          .top-callbar .container { flex-direction: row; justify-content: space-between; text-align: left; }
          .callbar-text { font-size: 12px; }
          .callbar-btn { padding: 5px 10px; font-size: 12px; }
          .schedule-card { flex-direction: column; align-items: stretch; text-align: center; }
          .schedule-select { width: 100%; }
          .footer-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          section { padding: 60px 0; }
          .hero { text-align: center; justify-content: center; height: auto; padding: 160px 0 80px; }
          .hero-content { margin: 0 auto; }
          .hero-btns { justify-content: center; flex-wrap: wrap; }
          .process-step { flex: 1 1 100%; }
          .services-grid { grid-template-columns: 1fr; }
          .contact-grid { grid-template-columns: 1fr; }
          .auth-card { padding: 28px; }
          .solutions-section { padding: 56px 0; }
        }
        @media (max-width: 480px) {
          .container { padding: 0 16px; }
          .logo { font-size: 18px; }
          .hero h1 { font-size: 30px; }
          .hero p { font-size: 15px; }
          .stats-grid { justify-content: center; }
          .stat-item h3 { font-size: 28px; }
          .cta-btn, .btn-outline { width: 100%; justify-content: center; }
          .contact-info-item { align-items: flex-start; }
          .cars-grid { grid-template-columns: 1fr; }
          .admin-grid { grid-template-columns: 1fr; }
        }
      `,
      }),
      u.jsx("div", {
        className: "top-callbar",
        children: u.jsxs("div", {
          className: "container",
          children: [
            u.jsx("div", {
              className: "callbar-text",
              children: "Call or WhatsApp us",
            }),
            u.jsxs("div", {
              className: "callbar-actions",
              children: [
                u.jsx("button", {
                  type: "button",
                  className: "callbar-btn",
                  onClick: () => p((A) => !A),
                  "aria-expanded": o,
                  "aria-haspopup": "menu",
                  children: "+2347033576017",
                }),
                o &&
                  u.jsxs("div", {
                    className: "callbar-menu",
                    role: "menu",
                    children: [
                      u.jsx("a", {
                        href: "tel:+2347033576017",
                        role: "menuitem",
                        children: "Call Now",
                      }),
                      u.jsx("a", {
                        href: "https://wa.me/2347033576017",
                        role: "menuitem",
                        target: "_blank",
                        rel: "noreferrer",
                        children: "WhatsApp",
                      }),
                    ],
                  }),
              ],
            }),
          ],
        }),
      }),
      u.jsxs("header", {
        children: [
          u.jsx("div", {
            className: "container",
            children: u.jsxs("nav", {
              children: [
                u.jsxs("div", {
                  className: "logo",
                  children: [
                    u.jsx(Hg, {}),
                    "AFOLARAY NIGERIA ",
                    u.jsx("span", { children: "LIMITED" }),
                  ],
                }),
                u.jsxs("div", {
                  className: "nav-links",
                  children: [
                    u.jsx("button", {
                      onClick: () => R("home"),
                      children: "Home",
                    }),
                    u.jsx("button", {
                      onClick: () => R("about"),
                      children: "About",
                    }),
                    u.jsx("button", {
                      onClick: () => R("services"),
                      children: "Services",
                    }),
                    u.jsx("button", {
                      onClick: () => R("process"),
                      children: "How It Works",
                    }),
                    u.jsx("button", {
                      onClick: () => R("contact"),
                      children: "Contact",
                    }),
                    u.jsx(st, { to: "/solutions", children: "Solutions" }),
                    u.jsx(st, { to: "/schedules", children: "Schedules" }),
                    u.jsx(st, { to: "/cars", children: "Cars" }),
                  ],
                }),
                u.jsx(st, {
                  className: "cta-btn header-cta",
                  to: "/track",
                  children: "Track Shipment",
                }),
                u.jsx("button", {
                  className: "menu-btn",
                  "aria-label": "Toggle menu",
                  onClick: () => h((A) => !A),
                  children: u.jsx("span", { className: "menu-bars" }),
                }),
              ],
            }),
          }),
          d &&
            u.jsx("div", {
              className: "mobile-menu",
              children: u.jsxs("div", {
                className: "container menu-inner",
                children: [
                  u.jsx("button", {
                    onClick: () => R("home"),
                    children: "Home",
                  }),
                  u.jsx("button", {
                    onClick: () => R("about"),
                    children: "About",
                  }),
                  u.jsx("button", {
                    onClick: () => R("services"),
                    children: "Services",
                  }),
                  u.jsx("button", {
                    onClick: () => R("process"),
                    children: "How It Works",
                  }),
                  u.jsx("button", {
                    onClick: () => R("contact"),
                    children: "Contact",
                  }),
                  u.jsx(st, {
                    to: "/solutions",
                    onClick: () => h(!1),
                    children: "Solutions",
                  }),
                  u.jsx(st, {
                    to: "/schedules",
                    onClick: () => h(!1),
                    children: "Schedules",
                  }),
                  u.jsx(st, {
                    to: "/cars",
                    onClick: () => h(!1),
                    children: "Cars",
                  }),
                  u.jsx(st, {
                    className: "cta-btn",
                    to: "/track",
                    onClick: () => h(!1),
                    children: "Track Shipment",
                  }),
                ],
              }),
            }),
        ],
      }),
      u.jsx("main", { children: s }),
      u.jsx("footer", {
        className: "site-footer",
        children: u.jsxs("div", {
          className: "container",
          children: [
            u.jsxs("div", {
              className: "footer-grid",
              children: [
                u.jsxs("div", {
                  children: [
                    u.jsx("div", {
                      className: "footer-brand",
                      children: "AFOLARAY NIGERIA LIMITED",
                    }),
                    u.jsx("p", {
                      className: "footer-text",
                      children:
                        "Reliable sea freight and vehicle logistics across global markets. We handle documentation, customs clearance, and end-to-end delivery.",
                    }),
                  ],
                }),
                u.jsxs("div", {
                  children: [
                    u.jsx("div", {
                      className: "footer-title",
                      children: "Quick Links",
                    }),
                    u.jsxs("div", {
                      className: "footer-links",
                      children: [
                        u.jsx("button", {
                          onClick: () => R("home"),
                          children: "Home",
                        }),
                        u.jsx("button", {
                          onClick: () => R("services"),
                          children: "Services",
                        }),
                        u.jsx("button", {
                          onClick: () => R("contact"),
                          children: "Contact",
                        }),
                        u.jsx(st, { to: "/solutions", children: "Solutions" }),
                        u.jsx(st, { to: "/schedules", children: "Schedules" }),
                        u.jsx(st, { to: "/track", children: "Track Shipment" }),
                      ],
                    }),
                  ],
                }),
                u.jsxs("div", {
                  children: [
                    u.jsx("div", {
                      className: "footer-title",
                      children: "Contact",
                    }),
                    u.jsxs("div", {
                      className: "footer-links",
                      children: [
                        u.jsx("span", {
                          children:
                            "11A Apapa-Oshodi Express Way, Amuwo, Lagos Nigeria",
                        }),
                        u.jsx("a", {
                          href: "tel:+2347033576017",
                          children: "+2347033576017",
                        }),
                        u.jsx("a", {
                          href: "mailto:afolaraylimited@gmail.com",
                          children: "afolaraylimited@gmail.com",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            u.jsx("div", {
              className: "footer-bottom",
              children: u.jsx("span", {
                children: "Sea freight logistics only.",
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
const Hg = () =>
  u.jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      u.jsx("path", {
        d: "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1",
      }),
      u.jsx("path", {
        d: "M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.9 5.8 2.8 8",
      }),
      u.jsx("path", { d: "M17.5 10l-7.31-6.05a1 1 0 0 0-1.28 0L1.62 10" }),
      u.jsx("path", { d: "M10.18 3.24l2.95 2.44" }),
    ],
  });
function Bg() {
  return u.jsx(ig, {
    children: u.jsx(wg, {
      children: u.jsxs(Ip, {
        children: [
          u.jsx(Bt, { path: "/", element: u.jsx(og, {}) }),
          u.jsx(Bt, { path: "/track", element: u.jsx(bg, {}) }),
          u.jsx(Bt, { path: "/track-public", element: u.jsx(yg, {}) }),
          u.jsx(Bt, { path: "/admin-login", element: u.jsx(Ag, {}) }),
          u.jsx(Bt, { path: "/solutions", element: u.jsx(Mg, {}) }),
          u.jsx(Bt, { path: "/schedules", element: u.jsx(Rg, {}) }),
          u.jsx(Bt, { path: "/cars", element: u.jsx(_g, {}) }),
          u.jsx(Bt, {
            path: "/admin",
            element: u.jsx(Dg, { children: u.jsx(Ng, {}) }),
          }),
          u.jsx(Bt, {
            path: "*",
            element: u.jsx(Ah, { to: "/", replace: !0 }),
          }),
        ],
      }),
    }),
  });
}
up.createRoot(document.getElementById("root")).render(
  u.jsx(U.StrictMode, { children: u.jsx(Bg, {}) }),
);

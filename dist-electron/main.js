var Hw = Object.defineProperty;
var Eh = (e) => {
  throw TypeError(e);
};
var Gw = (e, t, r) => t in e ? Hw(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var pt = (e, t, r) => Gw(e, typeof t != "symbol" ? t + "" : t, r), Sh = (e, t, r) => t.has(e) || Eh("Cannot " + r);
var Ce = (e, t, r) => (Sh(e, t, "read from private field"), r ? r.call(e) : t.get(e)), us = (e, t, r) => t.has(e) ? Eh("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), fs = (e, t, r, n) => (Sh(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
import jr, { ipcMain as jt, dialog as zw, shell as bh, app as jn, BrowserWindow as Ph } from "electron";
import vn from "fs";
import Kw from "constants";
import uo from "stream";
import Za from "util";
import Gy from "assert";
import ge from "path";
import fo, { spawn as Ww } from "child_process";
import zy from "events";
import ho from "crypto";
import Ky from "tty";
import ec from "os";
import zi from "url";
import Yw from "string_decoder";
import Wy from "zlib";
import Jw from "http";
import { fileURLToPath as Xw } from "node:url";
import X from "node:path";
import He from "node:process";
import { promisify as ot, isDeepStrictEqual as Qw } from "node:util";
import fe from "node:fs";
import vi from "node:crypto";
import Zw from "node:assert";
import tc from "node:os";
import { setTimeout as eE } from "node:timers/promises";
import tE from "dgram";
var vt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function rc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var or = {}, ti = {}, we = {};
we.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, s) => i != null ? n(i) : r(s)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
we.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var Gr = Kw, rE = process.cwd, ya = null, nE = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return ya || (ya = rE.call(process)), ya;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Th = process.chdir;
  process.chdir = function(e) {
    ya = null, Th.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Th);
}
var iE = sE;
function sE(e) {
  Gr.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = s(e.chown), e.fchown = s(e.fchown), e.lchown = s(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = o(e.chownSync), e.fchownSync = o(e.fchownSync), e.lchownSync = o(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = a(e.stat), e.fstat = a(e.fstat), e.lstat = a(e.lstat), e.statSync = c(e.statSync), e.fstatSync = c(e.fstatSync), e.lstatSync = c(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(l, f, h) {
    h && process.nextTick(h);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(l, f, h, p) {
    p && process.nextTick(p);
  }, e.lchownSync = function() {
  }), nE === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(l) {
    function f(h, p, y) {
      var $ = Date.now(), v = 0;
      l(h, p, function m(w) {
        if (w && (w.code === "EACCES" || w.code === "EPERM" || w.code === "EBUSY") && Date.now() - $ < 6e4) {
          setTimeout(function() {
            e.stat(p, function(T, I) {
              T && T.code === "ENOENT" ? l(h, p, m) : y(w);
            });
          }, v), v < 100 && (v += 10);
          return;
        }
        y && y(w);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, l), f;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(l) {
    function f(h, p, y, $, v, m) {
      var w;
      if (m && typeof m == "function") {
        var T = 0;
        w = function(I, F, H) {
          if (I && I.code === "EAGAIN" && T < 10)
            return T++, l.call(e, h, p, y, $, v, w);
          m.apply(this, arguments);
        };
      }
      return l.call(e, h, p, y, $, v, w);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, l), f;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(l) {
    return function(f, h, p, y, $) {
      for (var v = 0; ; )
        try {
          return l.call(e, f, h, p, y, $);
        } catch (m) {
          if (m.code === "EAGAIN" && v < 10) {
            v++;
            continue;
          }
          throw m;
        }
    };
  }(e.readSync);
  function t(l) {
    l.lchmod = function(f, h, p) {
      l.open(
        f,
        Gr.O_WRONLY | Gr.O_SYMLINK,
        h,
        function(y, $) {
          if (y) {
            p && p(y);
            return;
          }
          l.fchmod($, h, function(v) {
            l.close($, function(m) {
              p && p(v || m);
            });
          });
        }
      );
    }, l.lchmodSync = function(f, h) {
      var p = l.openSync(f, Gr.O_WRONLY | Gr.O_SYMLINK, h), y = !0, $;
      try {
        $ = l.fchmodSync(p, h), y = !1;
      } finally {
        if (y)
          try {
            l.closeSync(p);
          } catch {
          }
        else
          l.closeSync(p);
      }
      return $;
    };
  }
  function r(l) {
    Gr.hasOwnProperty("O_SYMLINK") && l.futimes ? (l.lutimes = function(f, h, p, y) {
      l.open(f, Gr.O_SYMLINK, function($, v) {
        if ($) {
          y && y($);
          return;
        }
        l.futimes(v, h, p, function(m) {
          l.close(v, function(w) {
            y && y(m || w);
          });
        });
      });
    }, l.lutimesSync = function(f, h, p) {
      var y = l.openSync(f, Gr.O_SYMLINK), $, v = !0;
      try {
        $ = l.futimesSync(y, h, p), v = !1;
      } finally {
        if (v)
          try {
            l.closeSync(y);
          } catch {
          }
        else
          l.closeSync(y);
      }
      return $;
    }) : l.futimes && (l.lutimes = function(f, h, p, y) {
      y && process.nextTick(y);
    }, l.lutimesSync = function() {
    });
  }
  function n(l) {
    return l && function(f, h, p) {
      return l.call(e, f, h, function(y) {
        u(y) && (y = null), p && p.apply(this, arguments);
      });
    };
  }
  function i(l) {
    return l && function(f, h) {
      try {
        return l.call(e, f, h);
      } catch (p) {
        if (!u(p)) throw p;
      }
    };
  }
  function s(l) {
    return l && function(f, h, p, y) {
      return l.call(e, f, h, p, function($) {
        u($) && ($ = null), y && y.apply(this, arguments);
      });
    };
  }
  function o(l) {
    return l && function(f, h, p) {
      try {
        return l.call(e, f, h, p);
      } catch (y) {
        if (!u(y)) throw y;
      }
    };
  }
  function a(l) {
    return l && function(f, h, p) {
      typeof h == "function" && (p = h, h = null);
      function y($, v) {
        v && (v.uid < 0 && (v.uid += 4294967296), v.gid < 0 && (v.gid += 4294967296)), p && p.apply(this, arguments);
      }
      return h ? l.call(e, f, h, y) : l.call(e, f, y);
    };
  }
  function c(l) {
    return l && function(f, h) {
      var p = h ? l.call(e, f, h) : l.call(e, f);
      return p && (p.uid < 0 && (p.uid += 4294967296), p.gid < 0 && (p.gid += 4294967296)), p;
    };
  }
  function u(l) {
    if (!l || l.code === "ENOSYS")
      return !0;
    var f = !process.getuid || process.getuid() !== 0;
    return !!(f && (l.code === "EINVAL" || l.code === "EPERM"));
  }
}
var Ah = uo.Stream, oE = aE;
function aE(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    Ah.call(this);
    var s = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var o = Object.keys(i), a = 0, c = o.length; a < c; a++) {
      var u = o[a];
      this[u] = i[u];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        s._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(l, f) {
      if (l) {
        s.emit("error", l), s.readable = !1;
        return;
      }
      s.fd = f, s.emit("open", f), s._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    Ah.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var s = Object.keys(i), o = 0, a = s.length; o < a; o++) {
      var c = s[o];
      this[c] = i[c];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var cE = uE, lE = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function uE(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: lE(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var Fe = vn, fE = iE, dE = oE, hE = cE, Mo = Za, rt, Ra;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (rt = Symbol.for("graceful-fs.queue"), Ra = Symbol.for("graceful-fs.previous")) : (rt = "___graceful-fs.queue", Ra = "___graceful-fs.previous");
function pE() {
}
function Yy(e, t) {
  Object.defineProperty(e, rt, {
    get: function() {
      return t;
    }
  });
}
var Wn = pE;
Mo.debuglog ? Wn = Mo.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (Wn = function() {
  var e = Mo.format.apply(Mo, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!Fe[rt]) {
  var mE = vt[rt] || [];
  Yy(Fe, mE), Fe.close = function(e) {
    function t(r, n) {
      return e.call(Fe, r, function(i) {
        i || Nh(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, Ra, {
      value: e
    }), t;
  }(Fe.close), Fe.closeSync = function(e) {
    function t(r) {
      e.apply(Fe, arguments), Nh();
    }
    return Object.defineProperty(t, Ra, {
      value: e
    }), t;
  }(Fe.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    Wn(Fe[rt]), Gy.equal(Fe[rt].length, 0);
  });
}
vt[rt] || Yy(vt, Fe[rt]);
var Ge = Tu(hE(Fe));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !Fe.__patched && (Ge = Tu(Fe), Fe.__patched = !0);
function Tu(e) {
  fE(e), e.gracefulify = Tu, e.createReadStream = F, e.createWriteStream = H;
  var t = e.readFile;
  e.readFile = r;
  function r(R, Z, x) {
    return typeof Z == "function" && (x = Z, Z = null), B(R, Z, x);
    function B(Q, j, L, V) {
      return t(Q, j, function(U) {
        U && (U.code === "EMFILE" || U.code === "ENFILE") ? oi([B, [Q, j, L], U, V || Date.now(), Date.now()]) : typeof L == "function" && L.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(R, Z, x, B) {
    return typeof x == "function" && (B = x, x = null), Q(R, Z, x, B);
    function Q(j, L, V, U, G) {
      return n(j, L, V, function(q) {
        q && (q.code === "EMFILE" || q.code === "ENFILE") ? oi([Q, [j, L, V, U], q, G || Date.now(), Date.now()]) : typeof U == "function" && U.apply(this, arguments);
      });
    }
  }
  var s = e.appendFile;
  s && (e.appendFile = o);
  function o(R, Z, x, B) {
    return typeof x == "function" && (B = x, x = null), Q(R, Z, x, B);
    function Q(j, L, V, U, G) {
      return s(j, L, V, function(q) {
        q && (q.code === "EMFILE" || q.code === "ENFILE") ? oi([Q, [j, L, V, U], q, G || Date.now(), Date.now()]) : typeof U == "function" && U.apply(this, arguments);
      });
    }
  }
  var a = e.copyFile;
  a && (e.copyFile = c);
  function c(R, Z, x, B) {
    return typeof x == "function" && (B = x, x = 0), Q(R, Z, x, B);
    function Q(j, L, V, U, G) {
      return a(j, L, V, function(q) {
        q && (q.code === "EMFILE" || q.code === "ENFILE") ? oi([Q, [j, L, V, U], q, G || Date.now(), Date.now()]) : typeof U == "function" && U.apply(this, arguments);
      });
    }
  }
  var u = e.readdir;
  e.readdir = f;
  var l = /^v[0-5]\./;
  function f(R, Z, x) {
    typeof Z == "function" && (x = Z, Z = null);
    var B = l.test(process.version) ? function(L, V, U, G) {
      return u(L, Q(
        L,
        V,
        U,
        G
      ));
    } : function(L, V, U, G) {
      return u(L, V, Q(
        L,
        V,
        U,
        G
      ));
    };
    return B(R, Z, x);
    function Q(j, L, V, U) {
      return function(G, q) {
        G && (G.code === "EMFILE" || G.code === "ENFILE") ? oi([
          B,
          [j, L, V],
          G,
          U || Date.now(),
          Date.now()
        ]) : (q && q.sort && q.sort(), typeof V == "function" && V.call(this, G, q));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var h = dE(e);
    m = h.ReadStream, T = h.WriteStream;
  }
  var p = e.ReadStream;
  p && (m.prototype = Object.create(p.prototype), m.prototype.open = w);
  var y = e.WriteStream;
  y && (T.prototype = Object.create(y.prototype), T.prototype.open = I), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return m;
    },
    set: function(R) {
      m = R;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return T;
    },
    set: function(R) {
      T = R;
    },
    enumerable: !0,
    configurable: !0
  });
  var $ = m;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return $;
    },
    set: function(R) {
      $ = R;
    },
    enumerable: !0,
    configurable: !0
  });
  var v = T;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return v;
    },
    set: function(R) {
      v = R;
    },
    enumerable: !0,
    configurable: !0
  });
  function m(R, Z) {
    return this instanceof m ? (p.apply(this, arguments), this) : m.apply(Object.create(m.prototype), arguments);
  }
  function w() {
    var R = this;
    ue(R.path, R.flags, R.mode, function(Z, x) {
      Z ? (R.autoClose && R.destroy(), R.emit("error", Z)) : (R.fd = x, R.emit("open", x), R.read());
    });
  }
  function T(R, Z) {
    return this instanceof T ? (y.apply(this, arguments), this) : T.apply(Object.create(T.prototype), arguments);
  }
  function I() {
    var R = this;
    ue(R.path, R.flags, R.mode, function(Z, x) {
      Z ? (R.destroy(), R.emit("error", Z)) : (R.fd = x, R.emit("open", x));
    });
  }
  function F(R, Z) {
    return new e.ReadStream(R, Z);
  }
  function H(R, Z) {
    return new e.WriteStream(R, Z);
  }
  var z = e.open;
  e.open = ue;
  function ue(R, Z, x, B) {
    return typeof x == "function" && (B = x, x = null), Q(R, Z, x, B);
    function Q(j, L, V, U, G) {
      return z(j, L, V, function(q, C) {
        q && (q.code === "EMFILE" || q.code === "ENFILE") ? oi([Q, [j, L, V, U], q, G || Date.now(), Date.now()]) : typeof U == "function" && U.apply(this, arguments);
      });
    }
  }
  return e;
}
function oi(e) {
  Wn("ENQUEUE", e[0].name, e[1]), Fe[rt].push(e), Au();
}
var xo;
function Nh() {
  for (var e = Date.now(), t = 0; t < Fe[rt].length; ++t)
    Fe[rt][t].length > 2 && (Fe[rt][t][3] = e, Fe[rt][t][4] = e);
  Au();
}
function Au() {
  if (clearTimeout(xo), xo = void 0, Fe[rt].length !== 0) {
    var e = Fe[rt].shift(), t = e[0], r = e[1], n = e[2], i = e[3], s = e[4];
    if (i === void 0)
      Wn("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      Wn("TIMEOUT", t.name, r);
      var o = r.pop();
      typeof o == "function" && o.call(null, n);
    } else {
      var a = Date.now() - s, c = Math.max(s - i, 1), u = Math.min(c * 1.2, 100);
      a >= u ? (Wn("RETRY", t.name, r), t.apply(null, r.concat([i]))) : Fe[rt].push(e);
    }
    xo === void 0 && (xo = setTimeout(Au, 0));
  }
}
(function(e) {
  const t = we.fromCallback, r = Ge, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, s) {
    return typeof s == "function" ? r.exists(i, s) : new Promise((o) => r.exists(i, o));
  }, e.read = function(i, s, o, a, c, u) {
    return typeof u == "function" ? r.read(i, s, o, a, c, u) : new Promise((l, f) => {
      r.read(i, s, o, a, c, (h, p, y) => {
        if (h) return f(h);
        l({ bytesRead: p, buffer: y });
      });
    });
  }, e.write = function(i, s, ...o) {
    return typeof o[o.length - 1] == "function" ? r.write(i, s, ...o) : new Promise((a, c) => {
      r.write(i, s, ...o, (u, l, f) => {
        if (u) return c(u);
        a({ bytesWritten: l, buffer: f });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, s, ...o) {
    return typeof o[o.length - 1] == "function" ? r.writev(i, s, ...o) : new Promise((a, c) => {
      r.writev(i, s, ...o, (u, l, f) => {
        if (u) return c(u);
        a({ bytesWritten: l, buffers: f });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(ti);
var Nu = {}, Jy = {};
const yE = ge;
Jy.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(yE.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const Xy = ti, { checkPath: Qy } = Jy, Zy = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Nu.makeDir = async (e, t) => (Qy(e), Xy.mkdir(e, {
  mode: Zy(t),
  recursive: !0
}));
Nu.makeDirSync = (e, t) => (Qy(e), Xy.mkdirSync(e, {
  mode: Zy(t),
  recursive: !0
}));
const gE = we.fromPromise, { makeDir: $E, makeDirSync: Wc } = Nu, Yc = gE($E);
var $r = {
  mkdirs: Yc,
  mkdirsSync: Wc,
  // alias
  mkdirp: Yc,
  mkdirpSync: Wc,
  ensureDir: Yc,
  ensureDirSync: Wc
};
const vE = we.fromPromise, eg = ti;
function _E(e) {
  return eg.access(e).then(() => !0).catch(() => !1);
}
var ri = {
  pathExists: vE(_E),
  pathExistsSync: eg.existsSync
};
const Ri = Ge;
function wE(e, t, r, n) {
  Ri.open(e, "r+", (i, s) => {
    if (i) return n(i);
    Ri.futimes(s, t, r, (o) => {
      Ri.close(s, (a) => {
        n && n(o || a);
      });
    });
  });
}
function EE(e, t, r) {
  const n = Ri.openSync(e, "r+");
  return Ri.futimesSync(n, t, r), Ri.closeSync(n);
}
var tg = {
  utimesMillis: wE,
  utimesMillisSync: EE
};
const Li = ti, We = ge, SE = Za;
function bE(e, t, r) {
  const n = r.dereference ? (i) => Li.stat(i, { bigint: !0 }) : (i) => Li.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, s]) => ({ srcStat: i, destStat: s }));
}
function PE(e, t, r) {
  let n;
  const i = r.dereference ? (o) => Li.statSync(o, { bigint: !0 }) : (o) => Li.lstatSync(o, { bigint: !0 }), s = i(e);
  try {
    n = i(t);
  } catch (o) {
    if (o.code === "ENOENT") return { srcStat: s, destStat: null };
    throw o;
  }
  return { srcStat: s, destStat: n };
}
function TE(e, t, r, n, i) {
  SE.callbackify(bE)(e, t, n, (s, o) => {
    if (s) return i(s);
    const { srcStat: a, destStat: c } = o;
    if (c) {
      if (po(a, c)) {
        const u = We.basename(e), l = We.basename(t);
        return r === "move" && u !== l && u.toLowerCase() === l.toLowerCase() ? i(null, { srcStat: a, destStat: c, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (a.isDirectory() && !c.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!a.isDirectory() && c.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return a.isDirectory() && Ou(e, t) ? i(new Error(nc(e, t, r))) : i(null, { srcStat: a, destStat: c });
  });
}
function AE(e, t, r, n) {
  const { srcStat: i, destStat: s } = PE(e, t, n);
  if (s) {
    if (po(i, s)) {
      const o = We.basename(e), a = We.basename(t);
      if (r === "move" && o !== a && o.toLowerCase() === a.toLowerCase())
        return { srcStat: i, destStat: s, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !s.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && s.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Ou(e, t))
    throw new Error(nc(e, t, r));
  return { srcStat: i, destStat: s };
}
function rg(e, t, r, n, i) {
  const s = We.resolve(We.dirname(e)), o = We.resolve(We.dirname(r));
  if (o === s || o === We.parse(o).root) return i();
  Li.stat(o, { bigint: !0 }, (a, c) => a ? a.code === "ENOENT" ? i() : i(a) : po(t, c) ? i(new Error(nc(e, r, n))) : rg(e, t, o, n, i));
}
function ng(e, t, r, n) {
  const i = We.resolve(We.dirname(e)), s = We.resolve(We.dirname(r));
  if (s === i || s === We.parse(s).root) return;
  let o;
  try {
    o = Li.statSync(s, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (po(t, o))
    throw new Error(nc(e, r, n));
  return ng(e, t, s, n);
}
function po(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function Ou(e, t) {
  const r = We.resolve(e).split(We.sep).filter((i) => i), n = We.resolve(t).split(We.sep).filter((i) => i);
  return r.reduce((i, s, o) => i && n[o] === s, !0);
}
function nc(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Ki = {
  checkPaths: TE,
  checkPathsSync: AE,
  checkParentPaths: rg,
  checkParentPathsSync: ng,
  isSrcSubdir: Ou,
  areIdentical: po
};
const It = Ge, Bs = ge, NE = $r.mkdirs, OE = ri.pathExists, RE = tg.utimesMillis, Vs = Ki;
function IE(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), Vs.checkPaths(e, t, "copy", r, (i, s) => {
    if (i) return n(i);
    const { srcStat: o, destStat: a } = s;
    Vs.checkParentPaths(e, o, t, "copy", (c) => c ? n(c) : r.filter ? ig(Oh, a, e, t, r, n) : Oh(a, e, t, r, n));
  });
}
function Oh(e, t, r, n, i) {
  const s = Bs.dirname(r);
  OE(s, (o, a) => {
    if (o) return i(o);
    if (a) return Ia(e, t, r, n, i);
    NE(s, (c) => c ? i(c) : Ia(e, t, r, n, i));
  });
}
function ig(e, t, r, n, i, s) {
  Promise.resolve(i.filter(r, n)).then((o) => o ? e(t, r, n, i, s) : s(), (o) => s(o));
}
function CE(e, t, r, n, i) {
  return n.filter ? ig(Ia, e, t, r, n, i) : Ia(e, t, r, n, i);
}
function Ia(e, t, r, n, i) {
  (n.dereference ? It.stat : It.lstat)(t, (o, a) => o ? i(o) : a.isDirectory() ? ME(a, e, t, r, n, i) : a.isFile() || a.isCharacterDevice() || a.isBlockDevice() ? kE(a, e, t, r, n, i) : a.isSymbolicLink() ? BE(e, t, r, n, i) : a.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : a.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function kE(e, t, r, n, i, s) {
  return t ? DE(e, r, n, i, s) : sg(e, r, n, i, s);
}
function DE(e, t, r, n, i) {
  if (n.overwrite)
    It.unlink(r, (s) => s ? i(s) : sg(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function sg(e, t, r, n, i) {
  It.copyFile(t, r, (s) => s ? i(s) : n.preserveTimestamps ? FE(e.mode, t, r, i) : ic(r, e.mode, i));
}
function FE(e, t, r, n) {
  return jE(e) ? LE(r, e, (i) => i ? n(i) : Rh(e, t, r, n)) : Rh(e, t, r, n);
}
function jE(e) {
  return (e & 128) === 0;
}
function LE(e, t, r) {
  return ic(e, t | 128, r);
}
function Rh(e, t, r, n) {
  UE(t, r, (i) => i ? n(i) : ic(r, e, n));
}
function ic(e, t, r) {
  return It.chmod(e, t, r);
}
function UE(e, t, r) {
  It.stat(e, (n, i) => n ? r(n) : RE(t, i.atime, i.mtime, r));
}
function ME(e, t, r, n, i, s) {
  return t ? og(r, n, i, s) : xE(e.mode, r, n, i, s);
}
function xE(e, t, r, n, i) {
  It.mkdir(r, (s) => {
    if (s) return i(s);
    og(t, r, n, (o) => o ? i(o) : ic(r, e, i));
  });
}
function og(e, t, r, n) {
  It.readdir(e, (i, s) => i ? n(i) : ag(s, e, t, r, n));
}
function ag(e, t, r, n, i) {
  const s = e.pop();
  return s ? qE(e, s, t, r, n, i) : i();
}
function qE(e, t, r, n, i, s) {
  const o = Bs.join(r, t), a = Bs.join(n, t);
  Vs.checkPaths(o, a, "copy", i, (c, u) => {
    if (c) return s(c);
    const { destStat: l } = u;
    CE(l, o, a, i, (f) => f ? s(f) : ag(e, r, n, i, s));
  });
}
function BE(e, t, r, n, i) {
  It.readlink(t, (s, o) => {
    if (s) return i(s);
    if (n.dereference && (o = Bs.resolve(process.cwd(), o)), e)
      It.readlink(r, (a, c) => a ? a.code === "EINVAL" || a.code === "UNKNOWN" ? It.symlink(o, r, i) : i(a) : (n.dereference && (c = Bs.resolve(process.cwd(), c)), Vs.isSrcSubdir(o, c) ? i(new Error(`Cannot copy '${o}' to a subdirectory of itself, '${c}'.`)) : e.isDirectory() && Vs.isSrcSubdir(c, o) ? i(new Error(`Cannot overwrite '${c}' with '${o}'.`)) : VE(o, r, i)));
    else
      return It.symlink(o, r, i);
  });
}
function VE(e, t, r) {
  It.unlink(t, (n) => n ? r(n) : It.symlink(e, t, r));
}
var HE = IE;
const dt = Ge, Hs = ge, GE = $r.mkdirsSync, zE = tg.utimesMillisSync, Gs = Ki;
function KE(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = Gs.checkPathsSync(e, t, "copy", r);
  return Gs.checkParentPathsSync(e, n, t, "copy"), WE(i, e, t, r);
}
function WE(e, t, r, n) {
  if (n.filter && !n.filter(t, r)) return;
  const i = Hs.dirname(r);
  return dt.existsSync(i) || GE(i), cg(e, t, r, n);
}
function YE(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return cg(e, t, r, n);
}
function cg(e, t, r, n) {
  const s = (n.dereference ? dt.statSync : dt.lstatSync)(t);
  if (s.isDirectory()) return rS(s, e, t, r, n);
  if (s.isFile() || s.isCharacterDevice() || s.isBlockDevice()) return JE(s, e, t, r, n);
  if (s.isSymbolicLink()) return sS(e, t, r, n);
  throw s.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : s.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function JE(e, t, r, n, i) {
  return t ? XE(e, r, n, i) : lg(e, r, n, i);
}
function XE(e, t, r, n) {
  if (n.overwrite)
    return dt.unlinkSync(r), lg(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function lg(e, t, r, n) {
  return dt.copyFileSync(t, r), n.preserveTimestamps && QE(e.mode, t, r), Ru(r, e.mode);
}
function QE(e, t, r) {
  return ZE(e) && eS(r, e), tS(t, r);
}
function ZE(e) {
  return (e & 128) === 0;
}
function eS(e, t) {
  return Ru(e, t | 128);
}
function Ru(e, t) {
  return dt.chmodSync(e, t);
}
function tS(e, t) {
  const r = dt.statSync(e);
  return zE(t, r.atime, r.mtime);
}
function rS(e, t, r, n, i) {
  return t ? ug(r, n, i) : nS(e.mode, r, n, i);
}
function nS(e, t, r, n) {
  return dt.mkdirSync(r), ug(t, r, n), Ru(r, e);
}
function ug(e, t, r) {
  dt.readdirSync(e).forEach((n) => iS(n, e, t, r));
}
function iS(e, t, r, n) {
  const i = Hs.join(t, e), s = Hs.join(r, e), { destStat: o } = Gs.checkPathsSync(i, s, "copy", n);
  return YE(o, i, s, n);
}
function sS(e, t, r, n) {
  let i = dt.readlinkSync(t);
  if (n.dereference && (i = Hs.resolve(process.cwd(), i)), e) {
    let s;
    try {
      s = dt.readlinkSync(r);
    } catch (o) {
      if (o.code === "EINVAL" || o.code === "UNKNOWN") return dt.symlinkSync(i, r);
      throw o;
    }
    if (n.dereference && (s = Hs.resolve(process.cwd(), s)), Gs.isSrcSubdir(i, s))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${s}'.`);
    if (dt.statSync(r).isDirectory() && Gs.isSrcSubdir(s, i))
      throw new Error(`Cannot overwrite '${s}' with '${i}'.`);
    return oS(i, r);
  } else
    return dt.symlinkSync(i, r);
}
function oS(e, t) {
  return dt.unlinkSync(t), dt.symlinkSync(e, t);
}
var aS = KE;
const cS = we.fromCallback;
var Iu = {
  copy: cS(HE),
  copySync: aS
};
const Ih = Ge, fg = ge, Te = Gy, zs = process.platform === "win32";
function dg(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((r) => {
    e[r] = e[r] || Ih[r], r = r + "Sync", e[r] = e[r] || Ih[r];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function Cu(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), Te(e, "rimraf: missing path"), Te.strictEqual(typeof e, "string", "rimraf: path should be a string"), Te.strictEqual(typeof r, "function", "rimraf: callback function required"), Te(t, "rimraf: invalid options argument provided"), Te.strictEqual(typeof t, "object", "rimraf: options should be object"), dg(t), Ch(e, t, function i(s) {
    if (s) {
      if ((s.code === "EBUSY" || s.code === "ENOTEMPTY" || s.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const o = n * 100;
        return setTimeout(() => Ch(e, t, i), o);
      }
      s.code === "ENOENT" && (s = null);
    }
    r(s);
  });
}
function Ch(e, t, r) {
  Te(e), Te(t), Te(typeof r == "function"), t.lstat(e, (n, i) => {
    if (n && n.code === "ENOENT")
      return r(null);
    if (n && n.code === "EPERM" && zs)
      return kh(e, t, n, r);
    if (i && i.isDirectory())
      return ga(e, t, n, r);
    t.unlink(e, (s) => {
      if (s) {
        if (s.code === "ENOENT")
          return r(null);
        if (s.code === "EPERM")
          return zs ? kh(e, t, s, r) : ga(e, t, s, r);
        if (s.code === "EISDIR")
          return ga(e, t, s, r);
      }
      return r(s);
    });
  });
}
function kh(e, t, r, n) {
  Te(e), Te(t), Te(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (s, o) => {
      s ? n(s.code === "ENOENT" ? null : r) : o.isDirectory() ? ga(e, t, r, n) : t.unlink(e, n);
    });
  });
}
function Dh(e, t, r) {
  let n;
  Te(e), Te(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  try {
    n = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  n.isDirectory() ? $a(e, t, r) : t.unlinkSync(e);
}
function ga(e, t, r, n) {
  Te(e), Te(t), Te(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? lS(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function lS(e, t, r) {
  Te(e), Te(t), Te(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let s = i.length, o;
    if (s === 0) return t.rmdir(e, r);
    i.forEach((a) => {
      Cu(fg.join(e, a), t, (c) => {
        if (!o) {
          if (c) return r(o = c);
          --s === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function hg(e, t) {
  let r;
  t = t || {}, dg(t), Te(e, "rimraf: missing path"), Te.strictEqual(typeof e, "string", "rimraf: path should be a string"), Te(t, "rimraf: missing options"), Te.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && zs && Dh(e, t, n);
  }
  try {
    r && r.isDirectory() ? $a(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return zs ? Dh(e, t, n) : $a(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    $a(e, t, n);
  }
}
function $a(e, t, r) {
  Te(e), Te(t);
  try {
    t.rmdirSync(e);
  } catch (n) {
    if (n.code === "ENOTDIR")
      throw r;
    if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM")
      uS(e, t);
    else if (n.code !== "ENOENT")
      throw n;
  }
}
function uS(e, t) {
  if (Te(e), Te(t), t.readdirSync(e).forEach((r) => hg(fg.join(e, r), t)), zs) {
    const r = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - r < 500);
  } else
    return t.rmdirSync(e, t);
}
var fS = Cu;
Cu.sync = hg;
const Ca = Ge, dS = we.fromCallback, pg = fS;
function hS(e, t) {
  if (Ca.rm) return Ca.rm(e, { recursive: !0, force: !0 }, t);
  pg(e, t);
}
function pS(e) {
  if (Ca.rmSync) return Ca.rmSync(e, { recursive: !0, force: !0 });
  pg.sync(e);
}
var sc = {
  remove: dS(hS),
  removeSync: pS
};
const mS = we.fromPromise, mg = ti, yg = ge, gg = $r, $g = sc, Fh = mS(async function(t) {
  let r;
  try {
    r = await mg.readdir(t);
  } catch {
    return gg.mkdirs(t);
  }
  return Promise.all(r.map((n) => $g.remove(yg.join(t, n))));
});
function jh(e) {
  let t;
  try {
    t = mg.readdirSync(e);
  } catch {
    return gg.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = yg.join(e, r), $g.removeSync(r);
  });
}
var yS = {
  emptyDirSync: jh,
  emptydirSync: jh,
  emptyDir: Fh,
  emptydir: Fh
};
const gS = we.fromCallback, vg = ge, on = Ge, _g = $r;
function $S(e, t) {
  function r() {
    on.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  on.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const s = vg.dirname(e);
    on.stat(s, (o, a) => {
      if (o)
        return o.code === "ENOENT" ? _g.mkdirs(s, (c) => {
          if (c) return t(c);
          r();
        }) : t(o);
      a.isDirectory() ? r() : on.readdir(s, (c) => {
        if (c) return t(c);
      });
    });
  });
}
function vS(e) {
  let t;
  try {
    t = on.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = vg.dirname(e);
  try {
    on.statSync(r).isDirectory() || on.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") _g.mkdirsSync(r);
    else throw n;
  }
  on.writeFileSync(e, "");
}
var _S = {
  createFile: gS($S),
  createFileSync: vS
};
const wS = we.fromCallback, wg = ge, tn = Ge, Eg = $r, ES = ri.pathExists, { areIdentical: Sg } = Ki;
function SS(e, t, r) {
  function n(i, s) {
    tn.link(i, s, (o) => {
      if (o) return r(o);
      r(null);
    });
  }
  tn.lstat(t, (i, s) => {
    tn.lstat(e, (o, a) => {
      if (o)
        return o.message = o.message.replace("lstat", "ensureLink"), r(o);
      if (s && Sg(a, s)) return r(null);
      const c = wg.dirname(t);
      ES(c, (u, l) => {
        if (u) return r(u);
        if (l) return n(e, t);
        Eg.mkdirs(c, (f) => {
          if (f) return r(f);
          n(e, t);
        });
      });
    });
  });
}
function bS(e, t) {
  let r;
  try {
    r = tn.lstatSync(t);
  } catch {
  }
  try {
    const s = tn.lstatSync(e);
    if (r && Sg(s, r)) return;
  } catch (s) {
    throw s.message = s.message.replace("lstat", "ensureLink"), s;
  }
  const n = wg.dirname(t);
  return tn.existsSync(n) || Eg.mkdirsSync(n), tn.linkSync(e, t);
}
var PS = {
  createLink: wS(SS),
  createLinkSync: bS
};
const an = ge, As = Ge, TS = ri.pathExists;
function AS(e, t, r) {
  if (an.isAbsolute(e))
    return As.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = an.dirname(t), i = an.join(n, e);
    return TS(i, (s, o) => s ? r(s) : o ? r(null, {
      toCwd: i,
      toDst: e
    }) : As.lstat(e, (a) => a ? (a.message = a.message.replace("lstat", "ensureSymlink"), r(a)) : r(null, {
      toCwd: e,
      toDst: an.relative(n, e)
    })));
  }
}
function NS(e, t) {
  let r;
  if (an.isAbsolute(e)) {
    if (r = As.existsSync(e), !r) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const n = an.dirname(t), i = an.join(n, e);
    if (r = As.existsSync(i), r)
      return {
        toCwd: i,
        toDst: e
      };
    if (r = As.existsSync(e), !r) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: an.relative(n, e)
    };
  }
}
var OS = {
  symlinkPaths: AS,
  symlinkPathsSync: NS
};
const bg = Ge;
function RS(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  bg.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function IS(e, t) {
  let r;
  if (t) return t;
  try {
    r = bg.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var CS = {
  symlinkType: RS,
  symlinkTypeSync: IS
};
const kS = we.fromCallback, Pg = ge, tr = ti, Tg = $r, DS = Tg.mkdirs, FS = Tg.mkdirsSync, Ag = OS, jS = Ag.symlinkPaths, LS = Ag.symlinkPathsSync, Ng = CS, US = Ng.symlinkType, MS = Ng.symlinkTypeSync, xS = ri.pathExists, { areIdentical: Og } = Ki;
function qS(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, tr.lstat(t, (i, s) => {
    !i && s.isSymbolicLink() ? Promise.all([
      tr.stat(e),
      tr.stat(t)
    ]).then(([o, a]) => {
      if (Og(o, a)) return n(null);
      Lh(e, t, r, n);
    }) : Lh(e, t, r, n);
  });
}
function Lh(e, t, r, n) {
  jS(e, t, (i, s) => {
    if (i) return n(i);
    e = s.toDst, US(s.toCwd, r, (o, a) => {
      if (o) return n(o);
      const c = Pg.dirname(t);
      xS(c, (u, l) => {
        if (u) return n(u);
        if (l) return tr.symlink(e, t, a, n);
        DS(c, (f) => {
          if (f) return n(f);
          tr.symlink(e, t, a, n);
        });
      });
    });
  });
}
function BS(e, t, r) {
  let n;
  try {
    n = tr.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const a = tr.statSync(e), c = tr.statSync(t);
    if (Og(a, c)) return;
  }
  const i = LS(e, t);
  e = i.toDst, r = MS(i.toCwd, r);
  const s = Pg.dirname(t);
  return tr.existsSync(s) || FS(s), tr.symlinkSync(e, t, r);
}
var VS = {
  createSymlink: kS(qS),
  createSymlinkSync: BS
};
const { createFile: Uh, createFileSync: Mh } = _S, { createLink: xh, createLinkSync: qh } = PS, { createSymlink: Bh, createSymlinkSync: Vh } = VS;
var HS = {
  // file
  createFile: Uh,
  createFileSync: Mh,
  ensureFile: Uh,
  ensureFileSync: Mh,
  // link
  createLink: xh,
  createLinkSync: qh,
  ensureLink: xh,
  ensureLinkSync: qh,
  // symlink
  createSymlink: Bh,
  createSymlinkSync: Vh,
  ensureSymlink: Bh,
  ensureSymlinkSync: Vh
};
function GS(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const s = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + s;
}
function zS(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var mo = { stringify: GS, stripBom: zS };
let Ui;
try {
  Ui = Ge;
} catch {
  Ui = vn;
}
const oc = we, { stringify: Rg, stripBom: Ig } = mo;
async function KS(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Ui, n = "throws" in t ? t.throws : !0;
  let i = await oc.fromCallback(r.readFile)(e, t);
  i = Ig(i);
  let s;
  try {
    s = JSON.parse(i, t ? t.reviver : null);
  } catch (o) {
    if (n)
      throw o.message = `${e}: ${o.message}`, o;
    return null;
  }
  return s;
}
const WS = oc.fromPromise(KS);
function YS(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Ui, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = Ig(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function JS(e, t, r = {}) {
  const n = r.fs || Ui, i = Rg(t, r);
  await oc.fromCallback(n.writeFile)(e, i, r);
}
const XS = oc.fromPromise(JS);
function QS(e, t, r = {}) {
  const n = r.fs || Ui, i = Rg(t, r);
  return n.writeFileSync(e, i, r);
}
var Cg = {
  readFile: WS,
  readFileSync: YS,
  writeFile: XS,
  writeFileSync: QS
};
const qo = Cg;
var ZS = {
  // jsonfile exports
  readJson: qo.readFile,
  readJsonSync: qo.readFileSync,
  writeJson: qo.writeFile,
  writeJsonSync: qo.writeFileSync
};
const e1 = we.fromCallback, Ns = Ge, kg = ge, Dg = $r, t1 = ri.pathExists;
function r1(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = kg.dirname(e);
  t1(i, (s, o) => {
    if (s) return n(s);
    if (o) return Ns.writeFile(e, t, r, n);
    Dg.mkdirs(i, (a) => {
      if (a) return n(a);
      Ns.writeFile(e, t, r, n);
    });
  });
}
function n1(e, ...t) {
  const r = kg.dirname(e);
  if (Ns.existsSync(r))
    return Ns.writeFileSync(e, ...t);
  Dg.mkdirsSync(r), Ns.writeFileSync(e, ...t);
}
var ku = {
  outputFile: e1(r1),
  outputFileSync: n1
};
const { stringify: i1 } = mo, { outputFile: s1 } = ku;
async function o1(e, t, r = {}) {
  const n = i1(t, r);
  await s1(e, n, r);
}
var a1 = o1;
const { stringify: c1 } = mo, { outputFileSync: l1 } = ku;
function u1(e, t, r) {
  const n = c1(t, r);
  l1(e, n, r);
}
var f1 = u1;
const d1 = we.fromPromise, Et = ZS;
Et.outputJson = d1(a1);
Et.outputJsonSync = f1;
Et.outputJSON = Et.outputJson;
Et.outputJSONSync = Et.outputJsonSync;
Et.writeJSON = Et.writeJson;
Et.writeJSONSync = Et.writeJsonSync;
Et.readJSON = Et.readJson;
Et.readJSONSync = Et.readJsonSync;
var h1 = Et;
const p1 = Ge, Vl = ge, m1 = Iu.copy, Fg = sc.remove, y1 = $r.mkdirp, g1 = ri.pathExists, Hh = Ki;
function $1(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  Hh.checkPaths(e, t, "move", r, (s, o) => {
    if (s) return n(s);
    const { srcStat: a, isChangingCase: c = !1 } = o;
    Hh.checkParentPaths(e, a, t, "move", (u) => {
      if (u) return n(u);
      if (v1(t)) return Gh(e, t, i, c, n);
      y1(Vl.dirname(t), (l) => l ? n(l) : Gh(e, t, i, c, n));
    });
  });
}
function v1(e) {
  const t = Vl.dirname(e);
  return Vl.parse(t).root === t;
}
function Gh(e, t, r, n, i) {
  if (n) return Jc(e, t, r, i);
  if (r)
    return Fg(t, (s) => s ? i(s) : Jc(e, t, r, i));
  g1(t, (s, o) => s ? i(s) : o ? i(new Error("dest already exists.")) : Jc(e, t, r, i));
}
function Jc(e, t, r, n) {
  p1.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : _1(e, t, r, n) : n());
}
function _1(e, t, r, n) {
  m1(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (s) => s ? n(s) : Fg(e, n));
}
var w1 = $1;
const jg = Ge, Hl = ge, E1 = Iu.copySync, Lg = sc.removeSync, S1 = $r.mkdirpSync, zh = Ki;
function b1(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: s = !1 } = zh.checkPathsSync(e, t, "move", r);
  return zh.checkParentPathsSync(e, i, t, "move"), P1(t) || S1(Hl.dirname(t)), T1(e, t, n, s);
}
function P1(e) {
  const t = Hl.dirname(e);
  return Hl.parse(t).root === t;
}
function T1(e, t, r, n) {
  if (n) return Xc(e, t, r);
  if (r)
    return Lg(t), Xc(e, t, r);
  if (jg.existsSync(t)) throw new Error("dest already exists.");
  return Xc(e, t, r);
}
function Xc(e, t, r) {
  try {
    jg.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return A1(e, t, r);
  }
}
function A1(e, t, r) {
  return E1(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), Lg(e);
}
var N1 = b1;
const O1 = we.fromCallback;
var R1 = {
  move: O1(w1),
  moveSync: N1
}, _n = {
  // Export promiseified graceful-fs:
  ...ti,
  // Export extra methods:
  ...Iu,
  ...yS,
  ...HS,
  ...h1,
  ...$r,
  ...R1,
  ...ku,
  ...ri,
  ...sc
}, xr = {}, pn = {}, Je = {}, mn = {};
Object.defineProperty(mn, "__esModule", { value: !0 });
mn.CancellationError = mn.CancellationToken = void 0;
const I1 = zy;
class C1 extends I1.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new Gl());
    const r = () => {
      if (n != null)
        try {
          this.removeListener("cancel", n), n = null;
        } catch {
        }
    };
    let n = null;
    return new Promise((i, s) => {
      let o = null;
      if (n = () => {
        try {
          o != null && (o(), o = null);
        } finally {
          s(new Gl());
        }
      }, this.cancelled) {
        n();
        return;
      }
      this.onCancel(n), t(i, s, (a) => {
        o = a;
      });
    }).then((i) => (r(), i)).catch((i) => {
      throw r(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
mn.CancellationToken = C1;
class Gl extends Error {
  constructor() {
    super("cancelled");
  }
}
mn.CancellationError = Gl;
var Wi = {};
Object.defineProperty(Wi, "__esModule", { value: !0 });
Wi.newError = k1;
function k1(e, t) {
  const r = new Error(e);
  return r.code = t, r;
}
var wt = {}, zl = { exports: {} }, Bo = { exports: {} }, Qc, Kh;
function D1() {
  if (Kh) return Qc;
  Kh = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, s = n * 365.25;
  Qc = function(l, f) {
    f = f || {};
    var h = typeof l;
    if (h === "string" && l.length > 0)
      return o(l);
    if (h === "number" && isFinite(l))
      return f.long ? c(l) : a(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function o(l) {
    if (l = String(l), !(l.length > 100)) {
      var f = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (f) {
        var h = parseFloat(f[1]), p = (f[2] || "ms").toLowerCase();
        switch (p) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * s;
          case "weeks":
          case "week":
          case "w":
            return h * i;
          case "days":
          case "day":
          case "d":
            return h * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return h * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return h * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return h * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return h;
          default:
            return;
        }
      }
    }
  }
  function a(l) {
    var f = Math.abs(l);
    return f >= n ? Math.round(l / n) + "d" : f >= r ? Math.round(l / r) + "h" : f >= t ? Math.round(l / t) + "m" : f >= e ? Math.round(l / e) + "s" : l + "ms";
  }
  function c(l) {
    var f = Math.abs(l);
    return f >= n ? u(l, f, n, "day") : f >= r ? u(l, f, r, "hour") : f >= t ? u(l, f, t, "minute") : f >= e ? u(l, f, e, "second") : l + " ms";
  }
  function u(l, f, h, p) {
    var y = f >= h * 1.5;
    return Math.round(l / h) + " " + p + (y ? "s" : "");
  }
  return Qc;
}
var Zc, Wh;
function Ug() {
  if (Wh) return Zc;
  Wh = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = u, n.disable = a, n.enable = s, n.enabled = c, n.humanize = D1(), n.destroy = l, Object.keys(t).forEach((f) => {
      n[f] = t[f];
    }), n.names = [], n.skips = [], n.formatters = {};
    function r(f) {
      let h = 0;
      for (let p = 0; p < f.length; p++)
        h = (h << 5) - h + f.charCodeAt(p), h |= 0;
      return n.colors[Math.abs(h) % n.colors.length];
    }
    n.selectColor = r;
    function n(f) {
      let h, p = null, y, $;
      function v(...m) {
        if (!v.enabled)
          return;
        const w = v, T = Number(/* @__PURE__ */ new Date()), I = T - (h || T);
        w.diff = I, w.prev = h, w.curr = T, h = T, m[0] = n.coerce(m[0]), typeof m[0] != "string" && m.unshift("%O");
        let F = 0;
        m[0] = m[0].replace(/%([a-zA-Z%])/g, (z, ue) => {
          if (z === "%%")
            return "%";
          F++;
          const R = n.formatters[ue];
          if (typeof R == "function") {
            const Z = m[F];
            z = R.call(w, Z), m.splice(F, 1), F--;
          }
          return z;
        }), n.formatArgs.call(w, m), (w.log || n.log).apply(w, m);
      }
      return v.namespace = f, v.useColors = n.useColors(), v.color = n.selectColor(f), v.extend = i, v.destroy = n.destroy, Object.defineProperty(v, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => p !== null ? p : (y !== n.namespaces && (y = n.namespaces, $ = n.enabled(f)), $),
        set: (m) => {
          p = m;
        }
      }), typeof n.init == "function" && n.init(v), v;
    }
    function i(f, h) {
      const p = n(this.namespace + (typeof h > "u" ? ":" : h) + f);
      return p.log = this.log, p;
    }
    function s(f) {
      n.save(f), n.namespaces = f, n.names = [], n.skips = [];
      const h = (typeof f == "string" ? f : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const p of h)
        p[0] === "-" ? n.skips.push(p.slice(1)) : n.names.push(p);
    }
    function o(f, h) {
      let p = 0, y = 0, $ = -1, v = 0;
      for (; p < f.length; )
        if (y < h.length && (h[y] === f[p] || h[y] === "*"))
          h[y] === "*" ? ($ = y, v = p, y++) : (p++, y++);
        else if ($ !== -1)
          y = $ + 1, v++, p = v;
        else
          return !1;
      for (; y < h.length && h[y] === "*"; )
        y++;
      return y === h.length;
    }
    function a() {
      const f = [
        ...n.names,
        ...n.skips.map((h) => "-" + h)
      ].join(",");
      return n.enable(""), f;
    }
    function c(f) {
      for (const h of n.skips)
        if (o(f, h))
          return !1;
      for (const h of n.names)
        if (o(f, h))
          return !0;
      return !1;
    }
    function u(f) {
      return f instanceof Error ? f.stack || f.message : f;
    }
    function l() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return Zc = e, Zc;
}
var Yh;
function F1() {
  return Yh || (Yh = 1, function(e, t) {
    t.formatArgs = n, t.save = i, t.load = s, t.useColors = r, t.storage = o(), t.destroy = /* @__PURE__ */ (() => {
      let c = !1;
      return () => {
        c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function r() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let c;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (c = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(c[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function n(c) {
      if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const u = "color: " + this.color;
      c.splice(1, 0, u, "color: inherit");
      let l = 0, f = 0;
      c[0].replace(/%[a-zA-Z%]/g, (h) => {
        h !== "%%" && (l++, h === "%c" && (f = l));
      }), c.splice(f, 0, u);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(c) {
      try {
        c ? t.storage.setItem("debug", c) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function s() {
      let c;
      try {
        c = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
      } catch {
      }
      return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
    }
    function o() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = Ug()(t);
    const { formatters: a } = e.exports;
    a.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (u) {
        return "[UnexpectedJSONParseError]: " + u.message;
      }
    };
  }(Bo, Bo.exports)), Bo.exports;
}
var Vo = { exports: {} }, el, Jh;
function j1() {
  return Jh || (Jh = 1, el = (e, t = process.argv) => {
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 || n < i);
  }), el;
}
var tl, Xh;
function L1() {
  if (Xh) return tl;
  Xh = 1;
  const e = ec, t = Ky, r = j1(), { env: n } = process;
  let i;
  r("no-color") || r("no-colors") || r("color=false") || r("color=never") ? i = 0 : (r("color") || r("colors") || r("color=true") || r("color=always")) && (i = 1), "FORCE_COLOR" in n && (n.FORCE_COLOR === "true" ? i = 1 : n.FORCE_COLOR === "false" ? i = 0 : i = n.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(n.FORCE_COLOR, 10), 3));
  function s(c) {
    return c === 0 ? !1 : {
      level: c,
      hasBasic: !0,
      has256: c >= 2,
      has16m: c >= 3
    };
  }
  function o(c, u) {
    if (i === 0)
      return 0;
    if (r("color=16m") || r("color=full") || r("color=truecolor"))
      return 3;
    if (r("color=256"))
      return 2;
    if (c && !u && i === void 0)
      return 0;
    const l = i || 0;
    if (n.TERM === "dumb")
      return l;
    if (process.platform === "win32") {
      const f = e.release().split(".");
      return Number(f[0]) >= 10 && Number(f[2]) >= 10586 ? Number(f[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((f) => f in n) || n.CI_NAME === "codeship" ? 1 : l;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if (n.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in n) {
      const f = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return f >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : l;
  }
  function a(c) {
    const u = o(c, c && c.isTTY);
    return s(u);
  }
  return tl = {
    supportsColor: a,
    stdout: s(o(!0, t.isatty(1))),
    stderr: s(o(!0, t.isatty(2)))
  }, tl;
}
var Qh;
function U1() {
  return Qh || (Qh = 1, function(e, t) {
    const r = Ky, n = Za;
    t.init = l, t.log = a, t.formatArgs = s, t.save = c, t.load = u, t.useColors = i, t.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const h = L1();
      h && (h.stderr || h).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((h) => /^debug_/i.test(h)).reduce((h, p) => {
      const y = p.substring(6).toLowerCase().replace(/_([a-z])/g, (v, m) => m.toUpperCase());
      let $ = process.env[p];
      return /^(yes|on|true|enabled)$/i.test($) ? $ = !0 : /^(no|off|false|disabled)$/i.test($) ? $ = !1 : $ === "null" ? $ = null : $ = Number($), h[y] = $, h;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : r.isatty(process.stderr.fd);
    }
    function s(h) {
      const { namespace: p, useColors: y } = this;
      if (y) {
        const $ = this.color, v = "\x1B[3" + ($ < 8 ? $ : "8;5;" + $), m = `  ${v};1m${p} \x1B[0m`;
        h[0] = m + h[0].split(`
`).join(`
` + m), h.push(v + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        h[0] = o() + p + " " + h[0];
    }
    function o() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function a(...h) {
      return process.stderr.write(n.formatWithOptions(t.inspectOpts, ...h) + `
`);
    }
    function c(h) {
      h ? process.env.DEBUG = h : delete process.env.DEBUG;
    }
    function u() {
      return process.env.DEBUG;
    }
    function l(h) {
      h.inspectOpts = {};
      const p = Object.keys(t.inspectOpts);
      for (let y = 0; y < p.length; y++)
        h.inspectOpts[p[y]] = t.inspectOpts[p[y]];
    }
    e.exports = Ug()(t);
    const { formatters: f } = e.exports;
    f.o = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts).split(`
`).map((p) => p.trim()).join(" ");
    }, f.O = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts);
    };
  }(Vo, Vo.exports)), Vo.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? zl.exports = F1() : zl.exports = U1();
var M1 = zl.exports, yo = {};
Object.defineProperty(yo, "__esModule", { value: !0 });
yo.ProgressCallbackTransform = void 0;
const x1 = uo;
class q1 extends x1.Transform {
  constructor(t, r, n) {
    super(), this.total = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
yo.ProgressCallbackTransform = q1;
Object.defineProperty(wt, "__esModule", { value: !0 });
wt.DigestTransform = wt.HttpExecutor = wt.HttpError = void 0;
wt.createHttpError = Kl;
wt.parseJson = Y1;
wt.configureRequestOptionsFromUrl = xg;
wt.configureRequestUrl = Fu;
wt.safeGetHeader = Ii;
wt.configureRequestOptions = Da;
wt.safeStringifyJson = Fa;
const B1 = ho, V1 = M1, H1 = vn, G1 = uo, Mg = zi, z1 = mn, Zh = Wi, K1 = yo, ds = (0, V1.default)("electron-builder");
function Kl(e, t = null) {
  return new Du(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + Fa(e.headers), t);
}
const W1 = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class Du extends Error {
  constructor(t, r = `HTTP error: ${W1.get(t) || t}`, n = null) {
    super(r), this.statusCode = t, this.description = n, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
wt.HttpError = Du;
function Y1(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class ka {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, r = new z1.CancellationToken(), n) {
    Da(t);
    const i = n == null ? void 0 : JSON.stringify(n), s = i ? Buffer.from(i) : void 0;
    if (s != null) {
      ds(i);
      const { headers: o, ...a } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": s.length,
          ...o
        },
        ...a
      };
    }
    return this.doApiRequest(t, r, (o) => o.end(s));
  }
  doApiRequest(t, r, n, i = 0) {
    return ds.enabled && ds(`Request: ${Fa(t)}`), r.createPromise((s, o, a) => {
      const c = this.createRequest(t, (u) => {
        try {
          this.handleResponse(u, t, r, s, o, i, n);
        } catch (l) {
          o(l);
        }
      });
      this.addErrorAndTimeoutHandlers(c, o, t.timeout), this.addRedirectHandlers(c, t, o, i, (u) => {
        this.doApiRequest(u, r, n, i).then(s).catch(o);
      }), n(c, o), a(() => c.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, r, n, i, s) {
  }
  addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
    this.addTimeOutHandler(t, r, n), t.on("error", r), t.on("aborted", () => {
      r(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, r, n, i, s, o, a) {
    var c;
    if (ds.enabled && ds(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${Fa(r)}`), t.statusCode === 404) {
      s(Kl(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const u = (c = t.statusCode) !== null && c !== void 0 ? c : 0, l = u >= 300 && u < 400, f = Ii(t, "location");
    if (l && f != null) {
      if (o > this.maxRedirects) {
        s(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(ka.prepareRedirectUrlOptions(f, r), n, a, o).then(i).catch(s);
      return;
    }
    t.setEncoding("utf8");
    let h = "";
    t.on("error", s), t.on("data", (p) => h += p), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const p = Ii(t, "content-type"), y = p != null && (Array.isArray(p) ? p.find(($) => $.includes("json")) != null : p.includes("json"));
          s(Kl(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

          Data:
          ${y ? JSON.stringify(JSON.parse(h)) : h}
          `));
        } else
          i(h.length === 0 ? null : h);
      } catch (p) {
        s(p);
      }
    });
  }
  async downloadToBuffer(t, r) {
    return await r.cancellationToken.createPromise((n, i, s) => {
      const o = [], a = {
        headers: r.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      Fu(t, a), Da(a), this.doDownload(a, {
        destination: null,
        options: r,
        onCancel: s,
        callback: (c) => {
          c == null ? n(Buffer.concat(o)) : i(c);
        },
        responseHandler: (c, u) => {
          let l = 0;
          c.on("data", (f) => {
            if (l += f.length, l > 524288e3) {
              u(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            o.push(f);
          }), c.on("end", () => {
            u(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, r, n) {
    const i = this.createRequest(t, (s) => {
      if (s.statusCode >= 400) {
        r.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${s.statusCode}: ${s.statusMessage}`));
        return;
      }
      s.on("error", r.callback);
      const o = Ii(s, "location");
      if (o != null) {
        n < this.maxRedirects ? this.doDownload(ka.prepareRedirectUrlOptions(o, t), r, n++) : r.callback(this.createMaxRedirectError());
        return;
      }
      r.responseHandler == null ? X1(r, s) : r.responseHandler(s, r.callback);
    });
    this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout), this.addRedirectHandlers(i, t, r.callback, n, (s) => {
      this.doDownload(s, r, n++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, r, n) {
    t.on("socket", (i) => {
      i.setTimeout(n, () => {
        t.abort(), r(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, r) {
    const n = xg(t, { ...r }), i = n.headers;
    if (i != null && i.authorization) {
      const s = new Mg.URL(t);
      (s.hostname.endsWith(".amazonaws.com") || s.searchParams.has("X-Amz-Credential")) && delete i.authorization;
    }
    return n;
  }
  static retryOnServerError(t, r = 3) {
    for (let n = 0; ; n++)
      try {
        return t();
      } catch (i) {
        if (n < r && (i instanceof Du && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
wt.HttpExecutor = ka;
function xg(e, t) {
  const r = Da(t);
  return Fu(new Mg.URL(e), r), r;
}
function Fu(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class Wl extends G1.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, r = "sha512", n = "base64") {
    super(), this.expected = t, this.algorithm = r, this.encoding = n, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, B1.createHash)(r);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, r, n) {
    this.digester.update(t), n(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (r) {
        t(r);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, Zh.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, Zh.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
wt.DigestTransform = Wl;
function J1(e, t, r) {
  return e != null && t != null && e !== t ? (r(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function Ii(e, t) {
  const r = e.headers[t];
  return r == null ? null : Array.isArray(r) ? r.length === 0 ? null : r[r.length - 1] : r;
}
function X1(e, t) {
  if (!J1(Ii(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const r = [];
  if (e.options.onProgress != null) {
    const o = Ii(t, "content-length");
    o != null && r.push(new K1.ProgressCallbackTransform(parseInt(o, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const n = e.options.sha512;
  n != null ? r.push(new Wl(n, "sha512", n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && r.push(new Wl(e.options.sha2, "sha256", "hex"));
  const i = (0, H1.createWriteStream)(e.destination);
  r.push(i);
  let s = t;
  for (const o of r)
    o.on("error", (a) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(a);
    }), s = s.pipe(o);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function Da(e, t, r) {
  r != null && (e.method = r), e.headers = { ...e.headers };
  const n = e.headers;
  return t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"), (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function Fa(e, t) {
  return JSON.stringify(e, (r, n) => r.endsWith("Authorization") || r.endsWith("authorization") || r.endsWith("Password") || r.endsWith("PASSWORD") || r.endsWith("Token") || r.includes("password") || r.includes("token") || t != null && t.has(r) ? "<stripped sensitive data>" : n, 2);
}
var ac = {};
Object.defineProperty(ac, "__esModule", { value: !0 });
ac.MemoLazy = void 0;
class Q1 {
  constructor(t, r) {
    this.selector = t, this.creator = r, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && qg(this.selected, t))
      return this._value;
    this.selected = t;
    const r = this.creator(t);
    return this.value = r, r;
  }
  set value(t) {
    this._value = t;
  }
}
ac.MemoLazy = Q1;
function qg(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), s = Object.keys(t);
    return i.length === s.length && i.every((o) => qg(e[o], t[o]));
  }
  return e === t;
}
var cc = {};
Object.defineProperty(cc, "__esModule", { value: !0 });
cc.githubUrl = Z1;
cc.getS3LikeProviderBaseUrl = eb;
function Z1(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function eb(e) {
  const t = e.provider;
  if (t === "s3")
    return tb(e);
  if (t === "spaces")
    return rb(e);
  throw new Error(`Not supported provider: ${t}`);
}
function tb(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return Bg(t, e.path);
}
function Bg(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function rb(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return Bg(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var ju = {};
Object.defineProperty(ju, "__esModule", { value: !0 });
ju.retry = Vg;
const nb = mn;
async function Vg(e, t, r, n = 0, i = 0, s) {
  var o;
  const a = new nb.CancellationToken();
  try {
    return await e();
  } catch (c) {
    if ((!((o = s == null ? void 0 : s(c)) !== null && o !== void 0) || o) && t > 0 && !a.cancelled)
      return await new Promise((u) => setTimeout(u, r + n * i)), await Vg(e, t - 1, r, n, i + 1, s);
    throw c;
  }
}
var Lu = {};
Object.defineProperty(Lu, "__esModule", { value: !0 });
Lu.parseDn = ib;
function ib(e) {
  let t = !1, r = null, n = "", i = 0;
  e = e.trim();
  const s = /* @__PURE__ */ new Map();
  for (let o = 0; o <= e.length; o++) {
    if (o === e.length) {
      r !== null && s.set(r, n);
      break;
    }
    const a = e[o];
    if (t) {
      if (a === '"') {
        t = !1;
        continue;
      }
    } else {
      if (a === '"') {
        t = !0;
        continue;
      }
      if (a === "\\") {
        o++;
        const c = parseInt(e.slice(o, o + 2), 16);
        Number.isNaN(c) ? n += e[o] : (o++, n += String.fromCharCode(c));
        continue;
      }
      if (r === null && a === "=") {
        r = n, n = "";
        continue;
      }
      if (a === "," || a === ";" || a === "+") {
        r !== null && s.set(r, n), r = null, n = "";
        continue;
      }
    }
    if (a === " " && !t) {
      if (n.length === 0)
        continue;
      if (o > i) {
        let c = o;
        for (; e[c] === " "; )
          c++;
        i = c;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || r === null && e[i] === "=" || r !== null && e[i] === "+") {
        o = i - 1;
        continue;
      }
    }
    n += a;
  }
  return s;
}
var Mi = {};
Object.defineProperty(Mi, "__esModule", { value: !0 });
Mi.nil = Mi.UUID = void 0;
const Hg = ho, Gg = Wi, sb = "options.name must be either a string or a Buffer", ep = (0, Hg.randomBytes)(16);
ep[0] = ep[0] | 1;
const va = {}, $e = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  va[t] = e, $e[e] = t;
}
class Jn {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const r = Jn.check(t);
    if (!r)
      throw new Error("not a UUID");
    this.version = r.version, r.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, r) {
    return ob(t, "sha1", 80, r);
  }
  toString() {
    return this.ascii == null && (this.ascii = ab(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, r = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (va[t[14] + t[15]] & 240) >> 4,
        variant: tp((va[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < r + 16)
        return !1;
      let n = 0;
      for (; n < 16 && t[r + n] === 0; n++)
        ;
      return n === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[r + 6] & 240) >> 4,
        variant: tp((t[r + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, Gg.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const r = Buffer.allocUnsafe(16);
    let n = 0;
    for (let i = 0; i < 16; i++)
      r[i] = va[t[n++] + t[n++]], (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
    return r;
  }
}
Mi.UUID = Jn;
Jn.OID = Jn.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function tp(e) {
  switch (e) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var Os;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(Os || (Os = {}));
function ob(e, t, r, n, i = Os.ASCII) {
  const s = (0, Hg.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, Gg.newError)(sb, "ERR_INVALID_UUID_NAME");
  s.update(n), s.update(e);
  const a = s.digest();
  let c;
  switch (i) {
    case Os.BINARY:
      a[6] = a[6] & 15 | r, a[8] = a[8] & 63 | 128, c = a;
      break;
    case Os.OBJECT:
      a[6] = a[6] & 15 | r, a[8] = a[8] & 63 | 128, c = new Jn(a);
      break;
    default:
      c = $e[a[0]] + $e[a[1]] + $e[a[2]] + $e[a[3]] + "-" + $e[a[4]] + $e[a[5]] + "-" + $e[a[6] & 15 | r] + $e[a[7]] + "-" + $e[a[8] & 63 | 128] + $e[a[9]] + "-" + $e[a[10]] + $e[a[11]] + $e[a[12]] + $e[a[13]] + $e[a[14]] + $e[a[15]];
      break;
  }
  return c;
}
function ab(e) {
  return $e[e[0]] + $e[e[1]] + $e[e[2]] + $e[e[3]] + "-" + $e[e[4]] + $e[e[5]] + "-" + $e[e[6]] + $e[e[7]] + "-" + $e[e[8]] + $e[e[9]] + "-" + $e[e[10]] + $e[e[11]] + $e[e[12]] + $e[e[13]] + $e[e[14]] + $e[e[15]];
}
Mi.nil = new Jn("00000000-0000-0000-0000-000000000000");
var go = {}, zg = {};
(function(e) {
  (function(t) {
    t.parser = function(E, g) {
      return new n(E, g);
    }, t.SAXParser = n, t.SAXStream = l, t.createStream = u, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var r = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function n(E, g) {
      if (!(this instanceof n))
        return new n(E, g);
      var D = this;
      s(D), D.q = D.c = "", D.bufferCheckPosition = t.MAX_BUFFER_LENGTH, D.opt = g || {}, D.opt.lowercase = D.opt.lowercase || D.opt.lowercasetags, D.looseCase = D.opt.lowercase ? "toLowerCase" : "toUpperCase", D.tags = [], D.closed = D.closedRoot = D.sawRoot = !1, D.tag = D.error = null, D.strict = !!E, D.noscript = !!(E || D.opt.noscript), D.state = R.BEGIN, D.strictEntities = D.opt.strictEntities, D.ENTITIES = D.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), D.attribList = [], D.opt.xmlns && (D.ns = Object.create($)), D.opt.unquotedAttributeValues === void 0 && (D.opt.unquotedAttributeValues = !E), D.trackPosition = D.opt.position !== !1, D.trackPosition && (D.position = D.line = D.column = 0), x(D, "onready");
    }
    Object.create || (Object.create = function(E) {
      function g() {
      }
      g.prototype = E;
      var D = new g();
      return D;
    }), Object.keys || (Object.keys = function(E) {
      var g = [];
      for (var D in E) E.hasOwnProperty(D) && g.push(D);
      return g;
    });
    function i(E) {
      for (var g = Math.max(t.MAX_BUFFER_LENGTH, 10), D = 0, O = 0, W = r.length; O < W; O++) {
        var me = E[r[O]].length;
        if (me > g)
          switch (r[O]) {
            case "textNode":
              Q(E);
              break;
            case "cdata":
              B(E, "oncdata", E.cdata), E.cdata = "";
              break;
            case "script":
              B(E, "onscript", E.script), E.script = "";
              break;
            default:
              L(E, "Max buffer length exceeded: " + r[O]);
          }
        D = Math.max(D, me);
      }
      var Ee = t.MAX_BUFFER_LENGTH - D;
      E.bufferCheckPosition = Ee + E.position;
    }
    function s(E) {
      for (var g = 0, D = r.length; g < D; g++)
        E[r[g]] = "";
    }
    function o(E) {
      Q(E), E.cdata !== "" && (B(E, "oncdata", E.cdata), E.cdata = ""), E.script !== "" && (B(E, "onscript", E.script), E.script = "");
    }
    n.prototype = {
      end: function() {
        V(this);
      },
      write: A,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        o(this);
      }
    };
    var a;
    try {
      a = require("stream").Stream;
    } catch {
      a = function() {
      };
    }
    a || (a = function() {
    });
    var c = t.EVENTS.filter(function(E) {
      return E !== "error" && E !== "end";
    });
    function u(E, g) {
      return new l(E, g);
    }
    function l(E, g) {
      if (!(this instanceof l))
        return new l(E, g);
      a.apply(this), this._parser = new n(E, g), this.writable = !0, this.readable = !0;
      var D = this;
      this._parser.onend = function() {
        D.emit("end");
      }, this._parser.onerror = function(O) {
        D.emit("error", O), D._parser.error = null;
      }, this._decoder = null, c.forEach(function(O) {
        Object.defineProperty(D, "on" + O, {
          get: function() {
            return D._parser["on" + O];
          },
          set: function(W) {
            if (!W)
              return D.removeAllListeners(O), D._parser["on" + O] = W, W;
            D.on(O, W);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    l.prototype = Object.create(a.prototype, {
      constructor: {
        value: l
      }
    }), l.prototype.write = function(E) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(E)) {
        if (!this._decoder) {
          var g = Yw.StringDecoder;
          this._decoder = new g("utf8");
        }
        E = this._decoder.write(E);
      }
      return this._parser.write(E.toString()), this.emit("data", E), !0;
    }, l.prototype.end = function(E) {
      return E && E.length && this.write(E), this._parser.end(), !0;
    }, l.prototype.on = function(E, g) {
      var D = this;
      return !D._parser["on" + E] && c.indexOf(E) !== -1 && (D._parser["on" + E] = function() {
        var O = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        O.splice(0, 0, E), D.emit.apply(D, O);
      }), a.prototype.on.call(D, E, g);
    };
    var f = "[CDATA[", h = "DOCTYPE", p = "http://www.w3.org/XML/1998/namespace", y = "http://www.w3.org/2000/xmlns/", $ = { xml: p, xmlns: y }, v = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, m = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, w = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, T = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function I(E) {
      return E === " " || E === `
` || E === "\r" || E === "	";
    }
    function F(E) {
      return E === '"' || E === "'";
    }
    function H(E) {
      return E === ">" || I(E);
    }
    function z(E, g) {
      return E.test(g);
    }
    function ue(E, g) {
      return !z(E, g);
    }
    var R = 0;
    t.STATE = {
      BEGIN: R++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: R++,
      // leading whitespace
      TEXT: R++,
      // general stuff
      TEXT_ENTITY: R++,
      // &amp and such.
      OPEN_WAKA: R++,
      // <
      SGML_DECL: R++,
      // <!BLARG
      SGML_DECL_QUOTED: R++,
      // <!BLARG foo "bar
      DOCTYPE: R++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: R++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: R++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: R++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: R++,
      // <!-
      COMMENT: R++,
      // <!--
      COMMENT_ENDING: R++,
      // <!-- blah -
      COMMENT_ENDED: R++,
      // <!-- blah --
      CDATA: R++,
      // <![CDATA[ something
      CDATA_ENDING: R++,
      // ]
      CDATA_ENDING_2: R++,
      // ]]
      PROC_INST: R++,
      // <?hi
      PROC_INST_BODY: R++,
      // <?hi there
      PROC_INST_ENDING: R++,
      // <?hi "there" ?
      OPEN_TAG: R++,
      // <strong
      OPEN_TAG_SLASH: R++,
      // <strong /
      ATTRIB: R++,
      // <a
      ATTRIB_NAME: R++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: R++,
      // <a foo _
      ATTRIB_VALUE: R++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: R++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: R++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: R++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: R++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: R++,
      // <foo bar=&quot
      CLOSE_TAG: R++,
      // </a
      CLOSE_TAG_SAW_WHITE: R++,
      // </a   >
      SCRIPT: R++,
      // <script> ...
      SCRIPT_ENDING: R++
      // <script> ... <
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(t.ENTITIES).forEach(function(E) {
      var g = t.ENTITIES[E], D = typeof g == "number" ? String.fromCharCode(g) : g;
      t.ENTITIES[E] = D;
    });
    for (var Z in t.STATE)
      t.STATE[t.STATE[Z]] = Z;
    R = t.STATE;
    function x(E, g, D) {
      E[g] && E[g](D);
    }
    function B(E, g, D) {
      E.textNode && Q(E), x(E, g, D);
    }
    function Q(E) {
      E.textNode = j(E.opt, E.textNode), E.textNode && x(E, "ontext", E.textNode), E.textNode = "";
    }
    function j(E, g) {
      return E.trim && (g = g.trim()), E.normalize && (g = g.replace(/\s+/g, " ")), g;
    }
    function L(E, g) {
      return Q(E), E.trackPosition && (g += `
Line: ` + E.line + `
Column: ` + E.column + `
Char: ` + E.c), g = new Error(g), E.error = g, x(E, "onerror", g), E;
    }
    function V(E) {
      return E.sawRoot && !E.closedRoot && U(E, "Unclosed root tag"), E.state !== R.BEGIN && E.state !== R.BEGIN_WHITESPACE && E.state !== R.TEXT && L(E, "Unexpected end"), Q(E), E.c = "", E.closed = !0, x(E, "onend"), n.call(E, E.strict, E.opt), E;
    }
    function U(E, g) {
      if (typeof E != "object" || !(E instanceof n))
        throw new Error("bad call to strictFail");
      E.strict && L(E, g);
    }
    function G(E) {
      E.strict || (E.tagName = E.tagName[E.looseCase]());
      var g = E.tags[E.tags.length - 1] || E, D = E.tag = { name: E.tagName, attributes: {} };
      E.opt.xmlns && (D.ns = g.ns), E.attribList.length = 0, B(E, "onopentagstart", D);
    }
    function q(E, g) {
      var D = E.indexOf(":"), O = D < 0 ? ["", E] : E.split(":"), W = O[0], me = O[1];
      return g && E === "xmlns" && (W = "xmlns", me = ""), { prefix: W, local: me };
    }
    function C(E) {
      if (E.strict || (E.attribName = E.attribName[E.looseCase]()), E.attribList.indexOf(E.attribName) !== -1 || E.tag.attributes.hasOwnProperty(E.attribName)) {
        E.attribName = E.attribValue = "";
        return;
      }
      if (E.opt.xmlns) {
        var g = q(E.attribName, !0), D = g.prefix, O = g.local;
        if (D === "xmlns")
          if (O === "xml" && E.attribValue !== p)
            U(
              E,
              "xml: prefix must be bound to " + p + `
Actual: ` + E.attribValue
            );
          else if (O === "xmlns" && E.attribValue !== y)
            U(
              E,
              "xmlns: prefix must be bound to " + y + `
Actual: ` + E.attribValue
            );
          else {
            var W = E.tag, me = E.tags[E.tags.length - 1] || E;
            W.ns === me.ns && (W.ns = Object.create(me.ns)), W.ns[O] = E.attribValue;
          }
        E.attribList.push([E.attribName, E.attribValue]);
      } else
        E.tag.attributes[E.attribName] = E.attribValue, B(E, "onattribute", {
          name: E.attribName,
          value: E.attribValue
        });
      E.attribName = E.attribValue = "";
    }
    function S(E, g) {
      if (E.opt.xmlns) {
        var D = E.tag, O = q(E.tagName);
        D.prefix = O.prefix, D.local = O.local, D.uri = D.ns[O.prefix] || "", D.prefix && !D.uri && (U(E, "Unbound namespace prefix: " + JSON.stringify(E.tagName)), D.uri = O.prefix);
        var W = E.tags[E.tags.length - 1] || E;
        D.ns && W.ns !== D.ns && Object.keys(D.ns).forEach(function(qt) {
          B(E, "onopennamespace", {
            prefix: qt,
            uri: D.ns[qt]
          });
        });
        for (var me = 0, Ee = E.attribList.length; me < Ee; me++) {
          var Ae = E.attribList[me], Ie = Ae[0], it = Ae[1], Se = q(Ie, !0), qe = Se.prefix, Yt = Se.local, xt = qe === "" ? "" : D.ns[qe] || "", kt = {
            name: Ie,
            value: it,
            prefix: qe,
            local: Yt,
            uri: xt
          };
          qe && qe !== "xmlns" && !xt && (U(E, "Unbound namespace prefix: " + JSON.stringify(qe)), kt.uri = qe), E.tag.attributes[Ie] = kt, B(E, "onattribute", kt);
        }
        E.attribList.length = 0;
      }
      E.tag.isSelfClosing = !!g, E.sawRoot = !0, E.tags.push(E.tag), B(E, "onopentag", E.tag), g || (!E.noscript && E.tagName.toLowerCase() === "script" ? E.state = R.SCRIPT : E.state = R.TEXT, E.tag = null, E.tagName = ""), E.attribName = E.attribValue = "", E.attribList.length = 0;
    }
    function N(E) {
      if (!E.tagName) {
        U(E, "Weird empty close tag."), E.textNode += "</>", E.state = R.TEXT;
        return;
      }
      if (E.script) {
        if (E.tagName !== "script") {
          E.script += "</" + E.tagName + ">", E.tagName = "", E.state = R.SCRIPT;
          return;
        }
        B(E, "onscript", E.script), E.script = "";
      }
      var g = E.tags.length, D = E.tagName;
      E.strict || (D = D[E.looseCase]());
      for (var O = D; g--; ) {
        var W = E.tags[g];
        if (W.name !== O)
          U(E, "Unexpected close tag");
        else
          break;
      }
      if (g < 0) {
        U(E, "Unmatched closing tag: " + E.tagName), E.textNode += "</" + E.tagName + ">", E.state = R.TEXT;
        return;
      }
      E.tagName = D;
      for (var me = E.tags.length; me-- > g; ) {
        var Ee = E.tag = E.tags.pop();
        E.tagName = E.tag.name, B(E, "onclosetag", E.tagName);
        var Ae = {};
        for (var Ie in Ee.ns)
          Ae[Ie] = Ee.ns[Ie];
        var it = E.tags[E.tags.length - 1] || E;
        E.opt.xmlns && Ee.ns !== it.ns && Object.keys(Ee.ns).forEach(function(Se) {
          var qe = Ee.ns[Se];
          B(E, "onclosenamespace", { prefix: Se, uri: qe });
        });
      }
      g === 0 && (E.closedRoot = !0), E.tagName = E.attribValue = E.attribName = "", E.attribList.length = 0, E.state = R.TEXT;
    }
    function b(E) {
      var g = E.entity, D = g.toLowerCase(), O, W = "";
      return E.ENTITIES[g] ? E.ENTITIES[g] : E.ENTITIES[D] ? E.ENTITIES[D] : (g = D, g.charAt(0) === "#" && (g.charAt(1) === "x" ? (g = g.slice(2), O = parseInt(g, 16), W = O.toString(16)) : (g = g.slice(1), O = parseInt(g, 10), W = O.toString(10))), g = g.replace(/^0+/, ""), isNaN(O) || W.toLowerCase() !== g ? (U(E, "Invalid character entity"), "&" + E.entity + ";") : String.fromCodePoint(O));
    }
    function d(E, g) {
      g === "<" ? (E.state = R.OPEN_WAKA, E.startTagPosition = E.position) : I(g) || (U(E, "Non-whitespace before first tag."), E.textNode = g, E.state = R.TEXT);
    }
    function _(E, g) {
      var D = "";
      return g < E.length && (D = E.charAt(g)), D;
    }
    function A(E) {
      var g = this;
      if (this.error)
        throw this.error;
      if (g.closed)
        return L(
          g,
          "Cannot write after close. Assign an onready handler."
        );
      if (E === null)
        return V(g);
      typeof E == "object" && (E = E.toString());
      for (var D = 0, O = ""; O = _(E, D++), g.c = O, !!O; )
        switch (g.trackPosition && (g.position++, O === `
` ? (g.line++, g.column = 0) : g.column++), g.state) {
          case R.BEGIN:
            if (g.state = R.BEGIN_WHITESPACE, O === "\uFEFF")
              continue;
            d(g, O);
            continue;
          case R.BEGIN_WHITESPACE:
            d(g, O);
            continue;
          case R.TEXT:
            if (g.sawRoot && !g.closedRoot) {
              for (var W = D - 1; O && O !== "<" && O !== "&"; )
                O = _(E, D++), O && g.trackPosition && (g.position++, O === `
` ? (g.line++, g.column = 0) : g.column++);
              g.textNode += E.substring(W, D - 1);
            }
            O === "<" && !(g.sawRoot && g.closedRoot && !g.strict) ? (g.state = R.OPEN_WAKA, g.startTagPosition = g.position) : (!I(O) && (!g.sawRoot || g.closedRoot) && U(g, "Text data outside of root node."), O === "&" ? g.state = R.TEXT_ENTITY : g.textNode += O);
            continue;
          case R.SCRIPT:
            O === "<" ? g.state = R.SCRIPT_ENDING : g.script += O;
            continue;
          case R.SCRIPT_ENDING:
            O === "/" ? g.state = R.CLOSE_TAG : (g.script += "<" + O, g.state = R.SCRIPT);
            continue;
          case R.OPEN_WAKA:
            if (O === "!")
              g.state = R.SGML_DECL, g.sgmlDecl = "";
            else if (!I(O)) if (z(v, O))
              g.state = R.OPEN_TAG, g.tagName = O;
            else if (O === "/")
              g.state = R.CLOSE_TAG, g.tagName = "";
            else if (O === "?")
              g.state = R.PROC_INST, g.procInstName = g.procInstBody = "";
            else {
              if (U(g, "Unencoded <"), g.startTagPosition + 1 < g.position) {
                var me = g.position - g.startTagPosition;
                O = new Array(me).join(" ") + O;
              }
              g.textNode += "<" + O, g.state = R.TEXT;
            }
            continue;
          case R.SGML_DECL:
            if (g.sgmlDecl + O === "--") {
              g.state = R.COMMENT, g.comment = "", g.sgmlDecl = "";
              continue;
            }
            g.doctype && g.doctype !== !0 && g.sgmlDecl ? (g.state = R.DOCTYPE_DTD, g.doctype += "<!" + g.sgmlDecl + O, g.sgmlDecl = "") : (g.sgmlDecl + O).toUpperCase() === f ? (B(g, "onopencdata"), g.state = R.CDATA, g.sgmlDecl = "", g.cdata = "") : (g.sgmlDecl + O).toUpperCase() === h ? (g.state = R.DOCTYPE, (g.doctype || g.sawRoot) && U(
              g,
              "Inappropriately located doctype declaration"
            ), g.doctype = "", g.sgmlDecl = "") : O === ">" ? (B(g, "onsgmldeclaration", g.sgmlDecl), g.sgmlDecl = "", g.state = R.TEXT) : (F(O) && (g.state = R.SGML_DECL_QUOTED), g.sgmlDecl += O);
            continue;
          case R.SGML_DECL_QUOTED:
            O === g.q && (g.state = R.SGML_DECL, g.q = ""), g.sgmlDecl += O;
            continue;
          case R.DOCTYPE:
            O === ">" ? (g.state = R.TEXT, B(g, "ondoctype", g.doctype), g.doctype = !0) : (g.doctype += O, O === "[" ? g.state = R.DOCTYPE_DTD : F(O) && (g.state = R.DOCTYPE_QUOTED, g.q = O));
            continue;
          case R.DOCTYPE_QUOTED:
            g.doctype += O, O === g.q && (g.q = "", g.state = R.DOCTYPE);
            continue;
          case R.DOCTYPE_DTD:
            O === "]" ? (g.doctype += O, g.state = R.DOCTYPE) : O === "<" ? (g.state = R.OPEN_WAKA, g.startTagPosition = g.position) : F(O) ? (g.doctype += O, g.state = R.DOCTYPE_DTD_QUOTED, g.q = O) : g.doctype += O;
            continue;
          case R.DOCTYPE_DTD_QUOTED:
            g.doctype += O, O === g.q && (g.state = R.DOCTYPE_DTD, g.q = "");
            continue;
          case R.COMMENT:
            O === "-" ? g.state = R.COMMENT_ENDING : g.comment += O;
            continue;
          case R.COMMENT_ENDING:
            O === "-" ? (g.state = R.COMMENT_ENDED, g.comment = j(g.opt, g.comment), g.comment && B(g, "oncomment", g.comment), g.comment = "") : (g.comment += "-" + O, g.state = R.COMMENT);
            continue;
          case R.COMMENT_ENDED:
            O !== ">" ? (U(g, "Malformed comment"), g.comment += "--" + O, g.state = R.COMMENT) : g.doctype && g.doctype !== !0 ? g.state = R.DOCTYPE_DTD : g.state = R.TEXT;
            continue;
          case R.CDATA:
            O === "]" ? g.state = R.CDATA_ENDING : g.cdata += O;
            continue;
          case R.CDATA_ENDING:
            O === "]" ? g.state = R.CDATA_ENDING_2 : (g.cdata += "]" + O, g.state = R.CDATA);
            continue;
          case R.CDATA_ENDING_2:
            O === ">" ? (g.cdata && B(g, "oncdata", g.cdata), B(g, "onclosecdata"), g.cdata = "", g.state = R.TEXT) : O === "]" ? g.cdata += "]" : (g.cdata += "]]" + O, g.state = R.CDATA);
            continue;
          case R.PROC_INST:
            O === "?" ? g.state = R.PROC_INST_ENDING : I(O) ? g.state = R.PROC_INST_BODY : g.procInstName += O;
            continue;
          case R.PROC_INST_BODY:
            if (!g.procInstBody && I(O))
              continue;
            O === "?" ? g.state = R.PROC_INST_ENDING : g.procInstBody += O;
            continue;
          case R.PROC_INST_ENDING:
            O === ">" ? (B(g, "onprocessinginstruction", {
              name: g.procInstName,
              body: g.procInstBody
            }), g.procInstName = g.procInstBody = "", g.state = R.TEXT) : (g.procInstBody += "?" + O, g.state = R.PROC_INST_BODY);
            continue;
          case R.OPEN_TAG:
            z(m, O) ? g.tagName += O : (G(g), O === ">" ? S(g) : O === "/" ? g.state = R.OPEN_TAG_SLASH : (I(O) || U(g, "Invalid character in tag name"), g.state = R.ATTRIB));
            continue;
          case R.OPEN_TAG_SLASH:
            O === ">" ? (S(g, !0), N(g)) : (U(g, "Forward-slash in opening tag not followed by >"), g.state = R.ATTRIB);
            continue;
          case R.ATTRIB:
            if (I(O))
              continue;
            O === ">" ? S(g) : O === "/" ? g.state = R.OPEN_TAG_SLASH : z(v, O) ? (g.attribName = O, g.attribValue = "", g.state = R.ATTRIB_NAME) : U(g, "Invalid attribute name");
            continue;
          case R.ATTRIB_NAME:
            O === "=" ? g.state = R.ATTRIB_VALUE : O === ">" ? (U(g, "Attribute without value"), g.attribValue = g.attribName, C(g), S(g)) : I(O) ? g.state = R.ATTRIB_NAME_SAW_WHITE : z(m, O) ? g.attribName += O : U(g, "Invalid attribute name");
            continue;
          case R.ATTRIB_NAME_SAW_WHITE:
            if (O === "=")
              g.state = R.ATTRIB_VALUE;
            else {
              if (I(O))
                continue;
              U(g, "Attribute without value"), g.tag.attributes[g.attribName] = "", g.attribValue = "", B(g, "onattribute", {
                name: g.attribName,
                value: ""
              }), g.attribName = "", O === ">" ? S(g) : z(v, O) ? (g.attribName = O, g.state = R.ATTRIB_NAME) : (U(g, "Invalid attribute name"), g.state = R.ATTRIB);
            }
            continue;
          case R.ATTRIB_VALUE:
            if (I(O))
              continue;
            F(O) ? (g.q = O, g.state = R.ATTRIB_VALUE_QUOTED) : (g.opt.unquotedAttributeValues || L(g, "Unquoted attribute value"), g.state = R.ATTRIB_VALUE_UNQUOTED, g.attribValue = O);
            continue;
          case R.ATTRIB_VALUE_QUOTED:
            if (O !== g.q) {
              O === "&" ? g.state = R.ATTRIB_VALUE_ENTITY_Q : g.attribValue += O;
              continue;
            }
            C(g), g.q = "", g.state = R.ATTRIB_VALUE_CLOSED;
            continue;
          case R.ATTRIB_VALUE_CLOSED:
            I(O) ? g.state = R.ATTRIB : O === ">" ? S(g) : O === "/" ? g.state = R.OPEN_TAG_SLASH : z(v, O) ? (U(g, "No whitespace between attributes"), g.attribName = O, g.attribValue = "", g.state = R.ATTRIB_NAME) : U(g, "Invalid attribute name");
            continue;
          case R.ATTRIB_VALUE_UNQUOTED:
            if (!H(O)) {
              O === "&" ? g.state = R.ATTRIB_VALUE_ENTITY_U : g.attribValue += O;
              continue;
            }
            C(g), O === ">" ? S(g) : g.state = R.ATTRIB;
            continue;
          case R.CLOSE_TAG:
            if (g.tagName)
              O === ">" ? N(g) : z(m, O) ? g.tagName += O : g.script ? (g.script += "</" + g.tagName, g.tagName = "", g.state = R.SCRIPT) : (I(O) || U(g, "Invalid tagname in closing tag"), g.state = R.CLOSE_TAG_SAW_WHITE);
            else {
              if (I(O))
                continue;
              ue(v, O) ? g.script ? (g.script += "</" + O, g.state = R.SCRIPT) : U(g, "Invalid tagname in closing tag.") : g.tagName = O;
            }
            continue;
          case R.CLOSE_TAG_SAW_WHITE:
            if (I(O))
              continue;
            O === ">" ? N(g) : U(g, "Invalid characters in closing tag");
            continue;
          case R.TEXT_ENTITY:
          case R.ATTRIB_VALUE_ENTITY_Q:
          case R.ATTRIB_VALUE_ENTITY_U:
            var Ee, Ae;
            switch (g.state) {
              case R.TEXT_ENTITY:
                Ee = R.TEXT, Ae = "textNode";
                break;
              case R.ATTRIB_VALUE_ENTITY_Q:
                Ee = R.ATTRIB_VALUE_QUOTED, Ae = "attribValue";
                break;
              case R.ATTRIB_VALUE_ENTITY_U:
                Ee = R.ATTRIB_VALUE_UNQUOTED, Ae = "attribValue";
                break;
            }
            if (O === ";") {
              var Ie = b(g);
              g.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(Ie) ? (g.entity = "", g.state = Ee, g.write(Ie)) : (g[Ae] += Ie, g.entity = "", g.state = Ee);
            } else z(g.entity.length ? T : w, O) ? g.entity += O : (U(g, "Invalid character in entity name"), g[Ae] += "&" + g.entity + O, g.entity = "", g.state = Ee);
            continue;
          default:
            throw new Error(g, "Unknown state: " + g.state);
        }
      return g.position >= g.bufferCheckPosition && i(g), g;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var E = String.fromCharCode, g = Math.floor, D = function() {
        var O = 16384, W = [], me, Ee, Ae = -1, Ie = arguments.length;
        if (!Ie)
          return "";
        for (var it = ""; ++Ae < Ie; ) {
          var Se = Number(arguments[Ae]);
          if (!isFinite(Se) || // `NaN`, `+Infinity`, or `-Infinity`
          Se < 0 || // not a valid Unicode code point
          Se > 1114111 || // not a valid Unicode code point
          g(Se) !== Se)
            throw RangeError("Invalid code point: " + Se);
          Se <= 65535 ? W.push(Se) : (Se -= 65536, me = (Se >> 10) + 55296, Ee = Se % 1024 + 56320, W.push(me, Ee)), (Ae + 1 === Ie || W.length > O) && (it += E.apply(null, W), W.length = 0);
        }
        return it;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: D,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = D;
    }();
  })(e);
})(zg);
Object.defineProperty(go, "__esModule", { value: !0 });
go.XElement = void 0;
go.parseXml = fb;
const cb = zg, Ho = Wi;
class Kg {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, Ho.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!ub(t))
      throw (0, Ho.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const r = this.attributes === null ? null : this.attributes[t];
    if (r == null)
      throw (0, Ho.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return r;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, r = !1, n = null) {
    const i = this.elementOrNull(t, r);
    if (i === null)
      throw (0, Ho.newError)(n || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, r = !1) {
    if (this.elements === null)
      return null;
    for (const n of this.elements)
      if (rp(n, t, r))
        return n;
    return null;
  }
  getElements(t, r = !1) {
    return this.elements === null ? [] : this.elements.filter((n) => rp(n, t, r));
  }
  elementValueOrEmpty(t, r = !1) {
    const n = this.elementOrNull(t, r);
    return n === null ? "" : n.value;
  }
}
go.XElement = Kg;
const lb = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function ub(e) {
  return lb.test(e);
}
function rp(e, t, r) {
  const n = e.name;
  return n === t || r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase();
}
function fb(e) {
  let t = null;
  const r = cb.parser(!0, {}), n = [];
  return r.onopentag = (i) => {
    const s = new Kg(i.name);
    if (s.attributes = i.attributes, t === null)
      t = s;
    else {
      const o = n[n.length - 1];
      o.elements == null && (o.elements = []), o.elements.push(s);
    }
    n.push(s);
  }, r.onclosetag = () => {
    n.pop();
  }, r.ontext = (i) => {
    n.length > 0 && (n[n.length - 1].value = i);
  }, r.oncdata = (i) => {
    const s = n[n.length - 1];
    s.value = i, s.isCData = !0;
  }, r.onerror = (i) => {
    throw i;
  }, r.write(e), t;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.HttpExecutor = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0, e.asArray = f;
  var t = mn;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var r = Wi;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return r.newError;
  } });
  var n = wt;
  Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return n.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return n.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return n.configureRequestUrl;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return n.createHttpError;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return n.DigestTransform;
  } }), Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return n.HttpError;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return n.HttpExecutor;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return n.parseJson;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return n.safeGetHeader;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return n.safeStringifyJson;
  } });
  var i = ac;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var s = yo;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return s.ProgressCallbackTransform;
  } });
  var o = cc;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return o.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return o.githubUrl;
  } });
  var a = ju;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return a.retry;
  } });
  var c = Lu;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return c.parseDn;
  } });
  var u = Mi;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return u.UUID;
  } });
  var l = go;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return l.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return l.XElement;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function f(h) {
    return h == null ? [] : Array.isArray(h) ? h : [h];
  }
})(Je);
var nt = {}, Uu = {}, ar = {};
function Wg(e) {
  return typeof e > "u" || e === null;
}
function db(e) {
  return typeof e == "object" && e !== null;
}
function hb(e) {
  return Array.isArray(e) ? e : Wg(e) ? [] : [e];
}
function pb(e, t) {
  var r, n, i, s;
  if (t)
    for (s = Object.keys(t), r = 0, n = s.length; r < n; r += 1)
      i = s[r], e[i] = t[i];
  return e;
}
function mb(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function yb(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
ar.isNothing = Wg;
ar.isObject = db;
ar.toArray = hb;
ar.repeat = mb;
ar.isNegativeZero = yb;
ar.extend = pb;
function Yg(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function Ks(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = Yg(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Ks.prototype = Object.create(Error.prototype);
Ks.prototype.constructor = Ks;
Ks.prototype.toString = function(t) {
  return this.name + ": " + Yg(this, t);
};
var $o = Ks, ws = ar;
function rl(e, t, r, n, i) {
  var s = "", o = "", a = Math.floor(i / 2) - 1;
  return n - t > a && (s = " ... ", t = n - a + s.length), r - n > a && (o = " ...", r = n + a - o.length), {
    str: s + e.slice(t, r).replace(/\t/g, "→") + o,
    pos: n - t + s.length
    // relative position
  };
}
function nl(e, t) {
  return ws.repeat(" ", t - e.length) + e;
}
function gb(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], s, o = -1; s = r.exec(e.buffer); )
    i.push(s.index), n.push(s.index + s[0].length), e.position <= s.index && o < 0 && (o = n.length - 2);
  o < 0 && (o = n.length - 1);
  var a = "", c, u, l = Math.min(e.line + t.linesAfter, i.length).toString().length, f = t.maxLength - (t.indent + l + 3);
  for (c = 1; c <= t.linesBefore && !(o - c < 0); c++)
    u = rl(
      e.buffer,
      n[o - c],
      i[o - c],
      e.position - (n[o] - n[o - c]),
      f
    ), a = ws.repeat(" ", t.indent) + nl((e.line - c + 1).toString(), l) + " | " + u.str + `
` + a;
  for (u = rl(e.buffer, n[o], i[o], e.position, f), a += ws.repeat(" ", t.indent) + nl((e.line + 1).toString(), l) + " | " + u.str + `
`, a += ws.repeat("-", t.indent + l + 3 + u.pos) + `^
`, c = 1; c <= t.linesAfter && !(o + c >= i.length); c++)
    u = rl(
      e.buffer,
      n[o + c],
      i[o + c],
      e.position - (n[o] - n[o + c]),
      f
    ), a += ws.repeat(" ", t.indent) + nl((e.line + c + 1).toString(), l) + " | " + u.str + `
`;
  return a.replace(/\n$/, "");
}
var $b = gb, np = $o, vb = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], _b = [
  "scalar",
  "sequence",
  "mapping"
];
function wb(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function Eb(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (vb.indexOf(r) === -1)
      throw new np('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = wb(t.styleAliases || null), _b.indexOf(this.kind) === -1)
    throw new np('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var bt = Eb, hs = $o, il = bt;
function ip(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(s, o) {
      s.tag === n.tag && s.kind === n.kind && s.multi === n.multi && (i = o);
    }), r[i] = n;
  }), r;
}
function Sb() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, t, r;
  function n(i) {
    i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, r = arguments.length; t < r; t += 1)
    arguments[t].forEach(n);
  return e;
}
function Yl(e) {
  return this.extend(e);
}
Yl.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof il)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new hs("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(s) {
    if (!(s instanceof il))
      throw new hs("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (s.loadKind && s.loadKind !== "scalar")
      throw new hs("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (s.multi)
      throw new hs("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(s) {
    if (!(s instanceof il))
      throw new hs("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(Yl.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = ip(i, "implicit"), i.compiledExplicit = ip(i, "explicit"), i.compiledTypeMap = Sb(i.compiledImplicit, i.compiledExplicit), i;
};
var Jg = Yl, bb = bt, Xg = new bb("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Pb = bt, Qg = new Pb("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), Tb = bt, Zg = new Tb("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Ab = Jg, e0 = new Ab({
  explicit: [
    Xg,
    Qg,
    Zg
  ]
}), Nb = bt;
function Ob(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Rb() {
  return null;
}
function Ib(e) {
  return e === null;
}
var t0 = new Nb("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Ob,
  construct: Rb,
  predicate: Ib,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
}), Cb = bt;
function kb(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Db(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Fb(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var r0 = new Cb("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: kb,
  construct: Db,
  predicate: Fb,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), jb = ar, Lb = bt;
function Ub(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Mb(e) {
  return 48 <= e && e <= 55;
}
function xb(e) {
  return 48 <= e && e <= 57;
}
function qb(e) {
  if (e === null) return !1;
  var t = e.length, r = 0, n = !1, i;
  if (!t) return !1;
  if (i = e[r], (i === "-" || i === "+") && (i = e[++r]), i === "0") {
    if (r + 1 === t) return !0;
    if (i = e[++r], i === "b") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "x") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!Ub(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!Mb(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!xb(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function Bb(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function Vb(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !jb.isNegativeZero(e);
}
var n0 = new Lb("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: qb,
  construct: Bb,
  predicate: Vb,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), i0 = ar, Hb = bt, Gb = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function zb(e) {
  return !(e === null || !Gb.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function Kb(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var Wb = /^[-+]?[0-9]+e/;
function Yb(e, t) {
  var r;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (i0.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), Wb.test(r) ? r.replace("e", ".e") : r;
}
function Jb(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || i0.isNegativeZero(e));
}
var s0 = new Hb("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: zb,
  construct: Kb,
  predicate: Jb,
  represent: Yb,
  defaultStyle: "lowercase"
}), o0 = e0.extend({
  implicit: [
    t0,
    r0,
    n0,
    s0
  ]
}), a0 = o0, Xb = bt, c0 = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), l0 = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Qb(e) {
  return e === null ? !1 : c0.exec(e) !== null || l0.exec(e) !== null;
}
function Zb(e) {
  var t, r, n, i, s, o, a, c = 0, u = null, l, f, h;
  if (t = c0.exec(e), t === null && (t = l0.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (s = +t[4], o = +t[5], a = +t[6], t[7]) {
    for (c = t[7].slice(0, 3); c.length < 3; )
      c += "0";
    c = +c;
  }
  return t[9] && (l = +t[10], f = +(t[11] || 0), u = (l * 60 + f) * 6e4, t[9] === "-" && (u = -u)), h = new Date(Date.UTC(r, n, i, s, o, a, c)), u && h.setTime(h.getTime() - u), h;
}
function eP(e) {
  return e.toISOString();
}
var u0 = new Xb("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Qb,
  construct: Zb,
  instanceOf: Date,
  represent: eP
}), tP = bt;
function rP(e) {
  return e === "<<" || e === null;
}
var f0 = new tP("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: rP
}), nP = bt, Mu = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function iP(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, s = Mu;
  for (r = 0; r < i; r++)
    if (t = s.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function sP(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, s = Mu, o = 0, a = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (a.push(o >> 16 & 255), a.push(o >> 8 & 255), a.push(o & 255)), o = o << 6 | s.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (a.push(o >> 16 & 255), a.push(o >> 8 & 255), a.push(o & 255)) : r === 18 ? (a.push(o >> 10 & 255), a.push(o >> 2 & 255)) : r === 12 && a.push(o >> 4 & 255), new Uint8Array(a);
}
function oP(e) {
  var t = "", r = 0, n, i, s = e.length, o = Mu;
  for (n = 0; n < s; n++)
    n % 3 === 0 && n && (t += o[r >> 18 & 63], t += o[r >> 12 & 63], t += o[r >> 6 & 63], t += o[r & 63]), r = (r << 8) + e[n];
  return i = s % 3, i === 0 ? (t += o[r >> 18 & 63], t += o[r >> 12 & 63], t += o[r >> 6 & 63], t += o[r & 63]) : i === 2 ? (t += o[r >> 10 & 63], t += o[r >> 4 & 63], t += o[r << 2 & 63], t += o[64]) : i === 1 && (t += o[r >> 2 & 63], t += o[r << 4 & 63], t += o[64], t += o[64]), t;
}
function aP(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var d0 = new nP("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: iP,
  construct: sP,
  predicate: aP,
  represent: oP
}), cP = bt, lP = Object.prototype.hasOwnProperty, uP = Object.prototype.toString;
function fP(e) {
  if (e === null) return !0;
  var t = [], r, n, i, s, o, a = e;
  for (r = 0, n = a.length; r < n; r += 1) {
    if (i = a[r], o = !1, uP.call(i) !== "[object Object]") return !1;
    for (s in i)
      if (lP.call(i, s))
        if (!o) o = !0;
        else return !1;
    if (!o) return !1;
    if (t.indexOf(s) === -1) t.push(s);
    else return !1;
  }
  return !0;
}
function dP(e) {
  return e !== null ? e : [];
}
var h0 = new cP("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: fP,
  construct: dP
}), hP = bt, pP = Object.prototype.toString;
function mP(e) {
  if (e === null) return !0;
  var t, r, n, i, s, o = e;
  for (s = new Array(o.length), t = 0, r = o.length; t < r; t += 1) {
    if (n = o[t], pP.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    s[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function yP(e) {
  if (e === null) return [];
  var t, r, n, i, s, o = e;
  for (s = new Array(o.length), t = 0, r = o.length; t < r; t += 1)
    n = o[t], i = Object.keys(n), s[t] = [i[0], n[i[0]]];
  return s;
}
var p0 = new hP("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: mP,
  construct: yP
}), gP = bt, $P = Object.prototype.hasOwnProperty;
function vP(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if ($P.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function _P(e) {
  return e !== null ? e : {};
}
var m0 = new gP("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: vP,
  construct: _P
}), xu = a0.extend({
  implicit: [
    u0,
    f0
  ],
  explicit: [
    d0,
    h0,
    p0,
    m0
  ]
}), Mn = ar, y0 = $o, wP = $b, EP = xu, yn = Object.prototype.hasOwnProperty, ja = 1, g0 = 2, $0 = 3, La = 4, sl = 1, SP = 2, sp = 3, bP = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, PP = /[\x85\u2028\u2029]/, TP = /[,\[\]\{\}]/, v0 = /^(?:!|!!|![a-z\-]+!)$/i, _0 = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function op(e) {
  return Object.prototype.toString.call(e);
}
function gr(e) {
  return e === 10 || e === 13;
}
function Yn(e) {
  return e === 9 || e === 32;
}
function Ct(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Si(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function AP(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function NP(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function OP(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function ap(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function RP(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var w0 = new Array(256), E0 = new Array(256);
for (var ai = 0; ai < 256; ai++)
  w0[ai] = ap(ai) ? 1 : 0, E0[ai] = ap(ai);
function IP(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || EP, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function S0(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = wP(r), new y0(t, r);
}
function re(e, t) {
  throw S0(e, t);
}
function Ua(e, t) {
  e.onWarning && e.onWarning.call(null, S0(e, t));
}
var cp = {
  YAML: function(t, r, n) {
    var i, s, o;
    t.version !== null && re(t, "duplication of %YAML directive"), n.length !== 1 && re(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && re(t, "ill-formed argument of the YAML directive"), s = parseInt(i[1], 10), o = parseInt(i[2], 10), s !== 1 && re(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = o < 2, o !== 1 && o !== 2 && Ua(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, s;
    n.length !== 2 && re(t, "TAG directive accepts exactly two arguments"), i = n[0], s = n[1], v0.test(i) || re(t, "ill-formed tag handle (first argument) of the TAG directive"), yn.call(t.tagMap, i) && re(t, 'there is a previously declared suffix for "' + i + '" tag handle'), _0.test(s) || re(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      s = decodeURIComponent(s);
    } catch {
      re(t, "tag prefix is malformed: " + s);
    }
    t.tagMap[i] = s;
  }
};
function un(e, t, r, n) {
  var i, s, o, a;
  if (t < r) {
    if (a = e.input.slice(t, r), n)
      for (i = 0, s = a.length; i < s; i += 1)
        o = a.charCodeAt(i), o === 9 || 32 <= o && o <= 1114111 || re(e, "expected valid JSON character");
    else bP.test(a) && re(e, "the stream contains non-printable characters");
    e.result += a;
  }
}
function lp(e, t, r, n) {
  var i, s, o, a;
  for (Mn.isObject(r) || re(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), o = 0, a = i.length; o < a; o += 1)
    s = i[o], yn.call(t, s) || (t[s] = r[s], n[s] = !0);
}
function bi(e, t, r, n, i, s, o, a, c) {
  var u, l;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), u = 0, l = i.length; u < l; u += 1)
      Array.isArray(i[u]) && re(e, "nested arrays are not supported inside keys"), typeof i == "object" && op(i[u]) === "[object Object]" && (i[u] = "[object Object]");
  if (typeof i == "object" && op(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(s))
      for (u = 0, l = s.length; u < l; u += 1)
        lp(e, t, s[u], r);
    else
      lp(e, t, s, r);
  else
    !e.json && !yn.call(r, i) && yn.call(t, i) && (e.line = o || e.line, e.lineStart = a || e.lineStart, e.position = c || e.position, re(e, "duplicated mapping key")), i === "__proto__" ? Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: s
    }) : t[i] = s, delete r[i];
  return t;
}
function qu(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : re(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function xe(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; Yn(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (gr(i))
      for (qu(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && Ua(e, "deficient indentation"), n;
}
function lc(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || Ct(r)));
}
function Bu(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += Mn.repeat(`
`, t - 1));
}
function CP(e, t, r) {
  var n, i, s, o, a, c, u, l, f = e.kind, h = e.result, p;
  if (p = e.input.charCodeAt(e.position), Ct(p) || Si(p) || p === 35 || p === 38 || p === 42 || p === 33 || p === 124 || p === 62 || p === 39 || p === 34 || p === 37 || p === 64 || p === 96 || (p === 63 || p === 45) && (i = e.input.charCodeAt(e.position + 1), Ct(i) || r && Si(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", s = o = e.position, a = !1; p !== 0; ) {
    if (p === 58) {
      if (i = e.input.charCodeAt(e.position + 1), Ct(i) || r && Si(i))
        break;
    } else if (p === 35) {
      if (n = e.input.charCodeAt(e.position - 1), Ct(n))
        break;
    } else {
      if (e.position === e.lineStart && lc(e) || r && Si(p))
        break;
      if (gr(p))
        if (c = e.line, u = e.lineStart, l = e.lineIndent, xe(e, !1, -1), e.lineIndent >= t) {
          a = !0, p = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = o, e.line = c, e.lineStart = u, e.lineIndent = l;
          break;
        }
    }
    a && (un(e, s, o, !1), Bu(e, e.line - c), s = o = e.position, a = !1), Yn(p) || (o = e.position + 1), p = e.input.charCodeAt(++e.position);
  }
  return un(e, s, o, !1), e.result ? !0 : (e.kind = f, e.result = h, !1);
}
function kP(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (un(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else gr(r) ? (un(e, n, i, !0), Bu(e, xe(e, !1, t)), n = i = e.position) : e.position === e.lineStart && lc(e) ? re(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  re(e, "unexpected end of the stream within a single quoted scalar");
}
function DP(e, t) {
  var r, n, i, s, o, a;
  if (a = e.input.charCodeAt(e.position), a !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (a = e.input.charCodeAt(e.position)) !== 0; ) {
    if (a === 34)
      return un(e, r, e.position, !0), e.position++, !0;
    if (a === 92) {
      if (un(e, r, e.position, !0), a = e.input.charCodeAt(++e.position), gr(a))
        xe(e, !1, t);
      else if (a < 256 && w0[a])
        e.result += E0[a], e.position++;
      else if ((o = NP(a)) > 0) {
        for (i = o, s = 0; i > 0; i--)
          a = e.input.charCodeAt(++e.position), (o = AP(a)) >= 0 ? s = (s << 4) + o : re(e, "expected hexadecimal character");
        e.result += RP(s), e.position++;
      } else
        re(e, "unknown escape sequence");
      r = n = e.position;
    } else gr(a) ? (un(e, r, n, !0), Bu(e, xe(e, !1, t)), r = n = e.position) : e.position === e.lineStart && lc(e) ? re(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  re(e, "unexpected end of the stream within a double quoted scalar");
}
function FP(e, t) {
  var r = !0, n, i, s, o = e.tag, a, c = e.anchor, u, l, f, h, p, y = /* @__PURE__ */ Object.create(null), $, v, m, w;
  if (w = e.input.charCodeAt(e.position), w === 91)
    l = 93, p = !1, a = [];
  else if (w === 123)
    l = 125, p = !0, a = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), w = e.input.charCodeAt(++e.position); w !== 0; ) {
    if (xe(e, !0, t), w = e.input.charCodeAt(e.position), w === l)
      return e.position++, e.tag = o, e.anchor = c, e.kind = p ? "mapping" : "sequence", e.result = a, !0;
    r ? w === 44 && re(e, "expected the node content, but found ','") : re(e, "missed comma between flow collection entries"), v = $ = m = null, f = h = !1, w === 63 && (u = e.input.charCodeAt(e.position + 1), Ct(u) && (f = h = !0, e.position++, xe(e, !0, t))), n = e.line, i = e.lineStart, s = e.position, xi(e, t, ja, !1, !0), v = e.tag, $ = e.result, xe(e, !0, t), w = e.input.charCodeAt(e.position), (h || e.line === n) && w === 58 && (f = !0, w = e.input.charCodeAt(++e.position), xe(e, !0, t), xi(e, t, ja, !1, !0), m = e.result), p ? bi(e, a, y, v, $, m, n, i, s) : f ? a.push(bi(e, null, y, v, $, m, n, i, s)) : a.push($), xe(e, !0, t), w = e.input.charCodeAt(e.position), w === 44 ? (r = !0, w = e.input.charCodeAt(++e.position)) : r = !1;
  }
  re(e, "unexpected end of the stream within a flow collection");
}
function jP(e, t) {
  var r, n, i = sl, s = !1, o = !1, a = t, c = 0, u = !1, l, f;
  if (f = e.input.charCodeAt(e.position), f === 124)
    n = !1;
  else if (f === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; f !== 0; )
    if (f = e.input.charCodeAt(++e.position), f === 43 || f === 45)
      sl === i ? i = f === 43 ? sp : SP : re(e, "repeat of a chomping mode identifier");
    else if ((l = OP(f)) >= 0)
      l === 0 ? re(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? re(e, "repeat of an indentation width identifier") : (a = t + l - 1, o = !0);
    else
      break;
  if (Yn(f)) {
    do
      f = e.input.charCodeAt(++e.position);
    while (Yn(f));
    if (f === 35)
      do
        f = e.input.charCodeAt(++e.position);
      while (!gr(f) && f !== 0);
  }
  for (; f !== 0; ) {
    for (qu(e), e.lineIndent = 0, f = e.input.charCodeAt(e.position); (!o || e.lineIndent < a) && f === 32; )
      e.lineIndent++, f = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > a && (a = e.lineIndent), gr(f)) {
      c++;
      continue;
    }
    if (e.lineIndent < a) {
      i === sp ? e.result += Mn.repeat(`
`, s ? 1 + c : c) : i === sl && s && (e.result += `
`);
      break;
    }
    for (n ? Yn(f) ? (u = !0, e.result += Mn.repeat(`
`, s ? 1 + c : c)) : u ? (u = !1, e.result += Mn.repeat(`
`, c + 1)) : c === 0 ? s && (e.result += " ") : e.result += Mn.repeat(`
`, c) : e.result += Mn.repeat(`
`, s ? 1 + c : c), s = !0, o = !0, c = 0, r = e.position; !gr(f) && f !== 0; )
      f = e.input.charCodeAt(++e.position);
    un(e, r, e.position, !1);
  }
  return !0;
}
function up(e, t) {
  var r, n = e.tag, i = e.anchor, s = [], o, a = !1, c;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), c = e.input.charCodeAt(e.position); c !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, re(e, "tab characters must not be used in indentation")), !(c !== 45 || (o = e.input.charCodeAt(e.position + 1), !Ct(o)))); ) {
    if (a = !0, e.position++, xe(e, !0, -1) && e.lineIndent <= t) {
      s.push(null), c = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, xi(e, t, $0, !1, !0), s.push(e.result), xe(e, !0, -1), c = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && c !== 0)
      re(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return a ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = s, !0) : !1;
}
function LP(e, t, r) {
  var n, i, s, o, a, c, u = e.tag, l = e.anchor, f = {}, h = /* @__PURE__ */ Object.create(null), p = null, y = null, $ = null, v = !1, m = !1, w;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = f), w = e.input.charCodeAt(e.position); w !== 0; ) {
    if (!v && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, re(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), s = e.line, (w === 63 || w === 58) && Ct(n))
      w === 63 ? (v && (bi(e, f, h, p, y, null, o, a, c), p = y = $ = null), m = !0, v = !0, i = !0) : v ? (v = !1, i = !0) : re(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, w = n;
    else {
      if (o = e.line, a = e.lineStart, c = e.position, !xi(e, r, g0, !1, !0))
        break;
      if (e.line === s) {
        for (w = e.input.charCodeAt(e.position); Yn(w); )
          w = e.input.charCodeAt(++e.position);
        if (w === 58)
          w = e.input.charCodeAt(++e.position), Ct(w) || re(e, "a whitespace character is expected after the key-value separator within a block mapping"), v && (bi(e, f, h, p, y, null, o, a, c), p = y = $ = null), m = !0, v = !1, i = !1, p = e.tag, y = e.result;
        else if (m)
          re(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = u, e.anchor = l, !0;
      } else if (m)
        re(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = u, e.anchor = l, !0;
    }
    if ((e.line === s || e.lineIndent > t) && (v && (o = e.line, a = e.lineStart, c = e.position), xi(e, t, La, !0, i) && (v ? y = e.result : $ = e.result), v || (bi(e, f, h, p, y, $, o, a, c), p = y = $ = null), xe(e, !0, -1), w = e.input.charCodeAt(e.position)), (e.line === s || e.lineIndent > t) && w !== 0)
      re(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return v && bi(e, f, h, p, y, null, o, a, c), m && (e.tag = u, e.anchor = l, e.kind = "mapping", e.result = f), m;
}
function UP(e) {
  var t, r = !1, n = !1, i, s, o;
  if (o = e.input.charCodeAt(e.position), o !== 33) return !1;
  if (e.tag !== null && re(e, "duplication of a tag property"), o = e.input.charCodeAt(++e.position), o === 60 ? (r = !0, o = e.input.charCodeAt(++e.position)) : o === 33 ? (n = !0, i = "!!", o = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      o = e.input.charCodeAt(++e.position);
    while (o !== 0 && o !== 62);
    e.position < e.length ? (s = e.input.slice(t, e.position), o = e.input.charCodeAt(++e.position)) : re(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; o !== 0 && !Ct(o); )
      o === 33 && (n ? re(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), v0.test(i) || re(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), o = e.input.charCodeAt(++e.position);
    s = e.input.slice(t, e.position), TP.test(s) && re(e, "tag suffix cannot contain flow indicator characters");
  }
  s && !_0.test(s) && re(e, "tag name cannot contain such characters: " + s);
  try {
    s = decodeURIComponent(s);
  } catch {
    re(e, "tag name is malformed: " + s);
  }
  return r ? e.tag = s : yn.call(e.tagMap, i) ? e.tag = e.tagMap[i] + s : i === "!" ? e.tag = "!" + s : i === "!!" ? e.tag = "tag:yaml.org,2002:" + s : re(e, 'undeclared tag handle "' + i + '"'), !0;
}
function MP(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && re(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !Ct(r) && !Si(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && re(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function xP(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !Ct(n) && !Si(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && re(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), yn.call(e.anchorMap, r) || re(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], xe(e, !0, -1), !0;
}
function xi(e, t, r, n, i) {
  var s, o, a, c = 1, u = !1, l = !1, f, h, p, y, $, v;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, s = o = a = La === r || $0 === r, n && xe(e, !0, -1) && (u = !0, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)), c === 1)
    for (; UP(e) || MP(e); )
      xe(e, !0, -1) ? (u = !0, a = s, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)) : a = !1;
  if (a && (a = u || i), (c === 1 || La === r) && (ja === r || g0 === r ? $ = t : $ = t + 1, v = e.position - e.lineStart, c === 1 ? a && (up(e, v) || LP(e, v, $)) || FP(e, $) ? l = !0 : (o && jP(e, $) || kP(e, $) || DP(e, $) ? l = !0 : xP(e) ? (l = !0, (e.tag !== null || e.anchor !== null) && re(e, "alias node should not have any properties")) : CP(e, $, ja === r) && (l = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : c === 0 && (l = a && up(e, v))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && re(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), f = 0, h = e.implicitTypes.length; f < h; f += 1)
      if (y = e.implicitTypes[f], y.resolve(e.result)) {
        e.result = y.construct(e.result), e.tag = y.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (yn.call(e.typeMap[e.kind || "fallback"], e.tag))
      y = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (y = null, p = e.typeMap.multi[e.kind || "fallback"], f = 0, h = p.length; f < h; f += 1)
        if (e.tag.slice(0, p[f].tag.length) === p[f].tag) {
          y = p[f];
          break;
        }
    y || re(e, "unknown tag !<" + e.tag + ">"), e.result !== null && y.kind !== e.kind && re(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + y.kind + '", not "' + e.kind + '"'), y.resolve(e.result, e.tag) ? (e.result = y.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : re(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || l;
}
function qP(e) {
  var t = e.position, r, n, i, s = !1, o;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (o = e.input.charCodeAt(e.position)) !== 0 && (xe(e, !0, -1), o = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || o !== 37)); ) {
    for (s = !0, o = e.input.charCodeAt(++e.position), r = e.position; o !== 0 && !Ct(o); )
      o = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && re(e, "directive name must not be less than one character in length"); o !== 0; ) {
      for (; Yn(o); )
        o = e.input.charCodeAt(++e.position);
      if (o === 35) {
        do
          o = e.input.charCodeAt(++e.position);
        while (o !== 0 && !gr(o));
        break;
      }
      if (gr(o)) break;
      for (r = e.position; o !== 0 && !Ct(o); )
        o = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    o !== 0 && qu(e), yn.call(cp, n) ? cp[n](e, n, i) : Ua(e, 'unknown document directive "' + n + '"');
  }
  if (xe(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, xe(e, !0, -1)) : s && re(e, "directives end mark is expected"), xi(e, e.lineIndent - 1, La, !1, !0), xe(e, !0, -1), e.checkLineBreaks && PP.test(e.input.slice(t, e.position)) && Ua(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && lc(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, xe(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    re(e, "end of the stream or a document separator is expected");
  else
    return;
}
function b0(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new IP(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, re(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    qP(r);
  return r.documents;
}
function BP(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = b0(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, s = n.length; i < s; i += 1)
    t(n[i]);
}
function VP(e, t) {
  var r = b0(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new y0("expected a single document in the stream, but found more");
  }
}
Uu.loadAll = BP;
Uu.load = VP;
var P0 = {}, uc = ar, vo = $o, HP = xu, T0 = Object.prototype.toString, A0 = Object.prototype.hasOwnProperty, Vu = 65279, GP = 9, Ws = 10, zP = 13, KP = 32, WP = 33, YP = 34, Jl = 35, JP = 37, XP = 38, QP = 39, ZP = 42, N0 = 44, eT = 45, Ma = 58, tT = 61, rT = 62, nT = 63, iT = 64, O0 = 91, R0 = 93, sT = 96, I0 = 123, oT = 124, C0 = 125, ht = {};
ht[0] = "\\0";
ht[7] = "\\a";
ht[8] = "\\b";
ht[9] = "\\t";
ht[10] = "\\n";
ht[11] = "\\v";
ht[12] = "\\f";
ht[13] = "\\r";
ht[27] = "\\e";
ht[34] = '\\"';
ht[92] = "\\\\";
ht[133] = "\\N";
ht[160] = "\\_";
ht[8232] = "\\L";
ht[8233] = "\\P";
var aT = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], cT = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function lT(e, t) {
  var r, n, i, s, o, a, c;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, s = n.length; i < s; i += 1)
    o = n[i], a = String(t[o]), o.slice(0, 2) === "!!" && (o = "tag:yaml.org,2002:" + o.slice(2)), c = e.compiledTypeMap.fallback[o], c && A0.call(c.styleAliases, a) && (a = c.styleAliases[a]), r[o] = a;
  return r;
}
function uT(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new vo("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + uc.repeat("0", n - t.length) + t;
}
var fT = 1, Ys = 2;
function dT(e) {
  this.schema = e.schema || HP, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = uc.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = lT(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Ys : fT, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function fp(e, t) {
  for (var r = uc.repeat(" ", t), n = 0, i = -1, s = "", o, a = e.length; n < a; )
    i = e.indexOf(`
`, n), i === -1 ? (o = e.slice(n), n = a) : (o = e.slice(n, i + 1), n = i + 1), o.length && o !== `
` && (s += r), s += o;
  return s;
}
function Xl(e, t) {
  return `
` + uc.repeat(" ", e.indent * t);
}
function hT(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function xa(e) {
  return e === KP || e === GP;
}
function Js(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Vu || 65536 <= e && e <= 1114111;
}
function dp(e) {
  return Js(e) && e !== Vu && e !== zP && e !== Ws;
}
function hp(e, t, r) {
  var n = dp(e), i = n && !xa(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== N0 && e !== O0 && e !== R0 && e !== I0 && e !== C0) && e !== Jl && !(t === Ma && !i) || dp(t) && !xa(t) && e === Jl || t === Ma && i
  );
}
function pT(e) {
  return Js(e) && e !== Vu && !xa(e) && e !== eT && e !== nT && e !== Ma && e !== N0 && e !== O0 && e !== R0 && e !== I0 && e !== C0 && e !== Jl && e !== XP && e !== ZP && e !== WP && e !== oT && e !== tT && e !== rT && e !== QP && e !== YP && e !== JP && e !== iT && e !== sT;
}
function mT(e) {
  return !xa(e) && e !== Ma;
}
function Es(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function k0(e) {
  var t = /^\n* /;
  return t.test(e);
}
var D0 = 1, Ql = 2, F0 = 3, j0 = 4, _i = 5;
function yT(e, t, r, n, i, s, o, a) {
  var c, u = 0, l = null, f = !1, h = !1, p = n !== -1, y = -1, $ = pT(Es(e, 0)) && mT(Es(e, e.length - 1));
  if (t || o)
    for (c = 0; c < e.length; u >= 65536 ? c += 2 : c++) {
      if (u = Es(e, c), !Js(u))
        return _i;
      $ = $ && hp(u, l, a), l = u;
    }
  else {
    for (c = 0; c < e.length; u >= 65536 ? c += 2 : c++) {
      if (u = Es(e, c), u === Ws)
        f = !0, p && (h = h || // Foldable line = too long, and not more-indented.
        c - y - 1 > n && e[y + 1] !== " ", y = c);
      else if (!Js(u))
        return _i;
      $ = $ && hp(u, l, a), l = u;
    }
    h = h || p && c - y - 1 > n && e[y + 1] !== " ";
  }
  return !f && !h ? $ && !o && !i(e) ? D0 : s === Ys ? _i : Ql : r > 9 && k0(e) ? _i : o ? s === Ys ? _i : Ql : h ? j0 : F0;
}
function gT(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Ys ? '""' : "''";
    if (!e.noCompatMode && (aT.indexOf(t) !== -1 || cT.test(t)))
      return e.quotingType === Ys ? '"' + t + '"' : "'" + t + "'";
    var s = e.indent * Math.max(1, r), o = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - s), a = n || e.flowLevel > -1 && r >= e.flowLevel;
    function c(u) {
      return hT(e, u);
    }
    switch (yT(
      t,
      a,
      e.indent,
      o,
      c,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case D0:
        return t;
      case Ql:
        return "'" + t.replace(/'/g, "''") + "'";
      case F0:
        return "|" + pp(t, e.indent) + mp(fp(t, s));
      case j0:
        return ">" + pp(t, e.indent) + mp(fp($T(t, o), s));
      case _i:
        return '"' + vT(t) + '"';
      default:
        throw new vo("impossible error: invalid scalar style");
    }
  }();
}
function pp(e, t) {
  var r = k0(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), s = i ? "+" : n ? "" : "-";
  return r + s + `
`;
}
function mp(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function $T(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var u = e.indexOf(`
`);
    return u = u !== -1 ? u : e.length, r.lastIndex = u, yp(e.slice(0, u), t);
  }(), i = e[0] === `
` || e[0] === " ", s, o; o = r.exec(e); ) {
    var a = o[1], c = o[2];
    s = c[0] === " ", n += a + (!i && !s && c !== "" ? `
` : "") + yp(c, t), i = s;
  }
  return n;
}
function yp(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, s, o = 0, a = 0, c = ""; n = r.exec(e); )
    a = n.index, a - i > t && (s = o > i ? o : a, c += `
` + e.slice(i, s), i = s + 1), o = a;
  return c += `
`, e.length - i > t && o > i ? c += e.slice(i, o) + `
` + e.slice(o + 1) : c += e.slice(i), c.slice(1);
}
function vT(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = Es(e, i), n = ht[r], !n && Js(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || uT(r);
  return t;
}
function _T(e, t, r) {
  var n = "", i = e.tag, s, o, a;
  for (s = 0, o = r.length; s < o; s += 1)
    a = r[s], e.replacer && (a = e.replacer.call(r, String(s), a)), (Lr(e, t, a, !1, !1) || typeof a > "u" && Lr(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function gp(e, t, r, n) {
  var i = "", s = e.tag, o, a, c;
  for (o = 0, a = r.length; o < a; o += 1)
    c = r[o], e.replacer && (c = e.replacer.call(r, String(o), c)), (Lr(e, t + 1, c, !0, !0, !1, !0) || typeof c > "u" && Lr(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += Xl(e, t)), e.dump && Ws === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = s, e.dump = i || "[]";
}
function wT(e, t, r) {
  var n = "", i = e.tag, s = Object.keys(r), o, a, c, u, l;
  for (o = 0, a = s.length; o < a; o += 1)
    l = "", n !== "" && (l += ", "), e.condenseFlow && (l += '"'), c = s[o], u = r[c], e.replacer && (u = e.replacer.call(r, c, u)), Lr(e, t, c, !1, !1) && (e.dump.length > 1024 && (l += "? "), l += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Lr(e, t, u, !1, !1) && (l += e.dump, n += l));
  e.tag = i, e.dump = "{" + n + "}";
}
function ET(e, t, r, n) {
  var i = "", s = e.tag, o = Object.keys(r), a, c, u, l, f, h;
  if (e.sortKeys === !0)
    o.sort();
  else if (typeof e.sortKeys == "function")
    o.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new vo("sortKeys must be a boolean or a function");
  for (a = 0, c = o.length; a < c; a += 1)
    h = "", (!n || i !== "") && (h += Xl(e, t)), u = o[a], l = r[u], e.replacer && (l = e.replacer.call(r, u, l)), Lr(e, t + 1, u, !0, !0, !0) && (f = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, f && (e.dump && Ws === e.dump.charCodeAt(0) ? h += "?" : h += "? "), h += e.dump, f && (h += Xl(e, t)), Lr(e, t + 1, l, !0, f) && (e.dump && Ws === e.dump.charCodeAt(0) ? h += ":" : h += ": ", h += e.dump, i += h));
  e.tag = s, e.dump = i || "{}";
}
function $p(e, t, r) {
  var n, i, s, o, a, c;
  for (i = r ? e.explicitTypes : e.implicitTypes, s = 0, o = i.length; s < o; s += 1)
    if (a = i[s], (a.instanceOf || a.predicate) && (!a.instanceOf || typeof t == "object" && t instanceof a.instanceOf) && (!a.predicate || a.predicate(t))) {
      if (r ? a.multi && a.representName ? e.tag = a.representName(t) : e.tag = a.tag : e.tag = "?", a.represent) {
        if (c = e.styleMap[a.tag] || a.defaultStyle, T0.call(a.represent) === "[object Function]")
          n = a.represent(t, c);
        else if (A0.call(a.represent, c))
          n = a.represent[c](t, c);
        else
          throw new vo("!<" + a.tag + '> tag resolver accepts not "' + c + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function Lr(e, t, r, n, i, s, o) {
  e.tag = null, e.dump = r, $p(e, r, !1) || $p(e, r, !0);
  var a = T0.call(e.dump), c = n, u;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var l = a === "[object Object]" || a === "[object Array]", f, h;
  if (l && (f = e.duplicates.indexOf(r), h = f !== -1), (e.tag !== null && e.tag !== "?" || h || e.indent !== 2 && t > 0) && (i = !1), h && e.usedDuplicates[f])
    e.dump = "*ref_" + f;
  else {
    if (l && h && !e.usedDuplicates[f] && (e.usedDuplicates[f] = !0), a === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (ET(e, t, e.dump, i), h && (e.dump = "&ref_" + f + e.dump)) : (wT(e, t, e.dump), h && (e.dump = "&ref_" + f + " " + e.dump));
    else if (a === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !o && t > 0 ? gp(e, t - 1, e.dump, i) : gp(e, t, e.dump, i), h && (e.dump = "&ref_" + f + e.dump)) : (_T(e, t, e.dump), h && (e.dump = "&ref_" + f + " " + e.dump));
    else if (a === "[object String]")
      e.tag !== "?" && gT(e, e.dump, t, s, c);
    else {
      if (a === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new vo("unacceptable kind of an object to dump " + a);
    }
    e.tag !== null && e.tag !== "?" && (u = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? u = "!" + u : u.slice(0, 18) === "tag:yaml.org,2002:" ? u = "!!" + u.slice(18) : u = "!<" + u + ">", e.dump = u + " " + e.dump);
  }
  return !0;
}
function ST(e, t) {
  var r = [], n = [], i, s;
  for (Zl(e, r, n), i = 0, s = n.length; i < s; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(s);
}
function Zl(e, t, r) {
  var n, i, s;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, s = e.length; i < s; i += 1)
        Zl(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, s = n.length; i < s; i += 1)
        Zl(e[n[i]], t, r);
}
function bT(e, t) {
  t = t || {};
  var r = new dT(t);
  r.noRefs || ST(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), Lr(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
P0.dump = bT;
var L0 = Uu, PT = P0;
function Hu(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
nt.Type = bt;
nt.Schema = Jg;
nt.FAILSAFE_SCHEMA = e0;
nt.JSON_SCHEMA = o0;
nt.CORE_SCHEMA = a0;
nt.DEFAULT_SCHEMA = xu;
nt.load = L0.load;
nt.loadAll = L0.loadAll;
nt.dump = PT.dump;
nt.YAMLException = $o;
nt.types = {
  binary: d0,
  float: s0,
  map: Zg,
  null: t0,
  pairs: p0,
  set: m0,
  timestamp: u0,
  bool: r0,
  int: n0,
  merge: f0,
  omap: h0,
  seq: Qg,
  str: Xg
};
nt.safeLoad = Hu("safeLoad", "load");
nt.safeLoadAll = Hu("safeLoadAll", "loadAll");
nt.safeDump = Hu("safeDump", "dump");
var fc = {};
Object.defineProperty(fc, "__esModule", { value: !0 });
fc.Lazy = void 0;
class TT {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
fc.Lazy = TT;
var eu = { exports: {} };
const AT = "2.0.0", U0 = 256, NT = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, OT = 16, RT = U0 - 6, IT = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var dc = {
  MAX_LENGTH: U0,
  MAX_SAFE_COMPONENT_LENGTH: OT,
  MAX_SAFE_BUILD_LENGTH: RT,
  MAX_SAFE_INTEGER: NT,
  RELEASE_TYPES: IT,
  SEMVER_SPEC_VERSION: AT,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const CT = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var hc = CT;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = dc, s = hc;
  t = e.exports = {};
  const o = t.re = [], a = t.safeRe = [], c = t.src = [], u = t.safeSrc = [], l = t.t = {};
  let f = 0;
  const h = "[a-zA-Z0-9-]", p = [
    ["\\s", 1],
    ["\\d", i],
    [h, n]
  ], y = (v) => {
    for (const [m, w] of p)
      v = v.split(`${m}*`).join(`${m}{0,${w}}`).split(`${m}+`).join(`${m}{1,${w}}`);
    return v;
  }, $ = (v, m, w) => {
    const T = y(m), I = f++;
    s(v, I, m), l[v] = I, c[I] = m, u[I] = T, o[I] = new RegExp(m, w ? "g" : void 0), a[I] = new RegExp(T, w ? "g" : void 0);
  };
  $("NUMERICIDENTIFIER", "0|[1-9]\\d*"), $("NUMERICIDENTIFIERLOOSE", "\\d+"), $("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${h}*`), $("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), $("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), $("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), $("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), $("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), $("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), $("BUILDIDENTIFIER", `${h}+`), $("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), $("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), $("FULL", `^${c[l.FULLPLAIN]}$`), $("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), $("LOOSE", `^${c[l.LOOSEPLAIN]}$`), $("GTLT", "((?:<|>)?=?)"), $("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), $("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), $("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), $("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), $("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), $("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), $("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), $("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), $("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), $("COERCERTL", c[l.COERCE], !0), $("COERCERTLFULL", c[l.COERCEFULL], !0), $("LONETILDE", "(?:~>?)"), $("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", $("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), $("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), $("LONECARET", "(?:\\^)"), $("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", $("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), $("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), $("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), $("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), $("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", $("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), $("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), $("STAR", "(<|>)?=?\\s*\\*"), $("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), $("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(eu, eu.exports);
var _o = eu.exports;
const kT = Object.freeze({ loose: !0 }), DT = Object.freeze({}), FT = (e) => e ? typeof e != "object" ? kT : e : DT;
var Gu = FT;
const vp = /^[0-9]+$/, M0 = (e, t) => {
  const r = vp.test(e), n = vp.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, jT = (e, t) => M0(t, e);
var x0 = {
  compareIdentifiers: M0,
  rcompareIdentifiers: jT
};
const Go = hc, { MAX_LENGTH: _p, MAX_SAFE_INTEGER: zo } = dc, { safeRe: Ko, t: Wo } = _o, LT = Gu, { compareIdentifiers: ci } = x0;
let UT = class ur {
  constructor(t, r) {
    if (r = LT(r), t instanceof ur) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > _p)
      throw new TypeError(
        `version is longer than ${_p} characters`
      );
    Go("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? Ko[Wo.LOOSE] : Ko[Wo.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > zo || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > zo || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > zo || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const s = +i;
        if (s >= 0 && s < zo)
          return s;
      }
      return i;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (Go("SemVer.compare", this.version, this.options, t), !(t instanceof ur)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new ur(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof ur || (t = new ur(t, this.options)), ci(this.major, t.major) || ci(this.minor, t.minor) || ci(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof ur || (t = new ur(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (Go("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return ci(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof ur || (t = new ur(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (Go("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return ci(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const i = `-${r}`.match(this.options.loose ? Ko[Wo.PRERELEASELOOSE] : Ko[Wo.PRERELEASE]);
        if (!i || i[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let s = this.prerelease.length;
          for (; --s >= 0; )
            typeof this.prerelease[s] == "number" && (this.prerelease[s]++, s = -2);
          if (s === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (r) {
          let s = [r, i];
          n === !1 && (s = [r]), ci(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = s) : this.prerelease = s;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Pt = UT;
const wp = Pt, MT = (e, t, r = !1) => {
  if (e instanceof wp)
    return e;
  try {
    return new wp(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Yi = MT;
const xT = Yi, qT = (e, t) => {
  const r = xT(e, t);
  return r ? r.version : null;
};
var BT = qT;
const VT = Yi, HT = (e, t) => {
  const r = VT(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var GT = HT;
const Ep = Pt, zT = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new Ep(
      e instanceof Ep ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var KT = zT;
const Sp = Yi, WT = (e, t) => {
  const r = Sp(e, null, !0), n = Sp(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const s = i > 0, o = s ? r : n, a = s ? n : r, c = !!o.prerelease.length;
  if (!!a.prerelease.length && !c) {
    if (!a.patch && !a.minor)
      return "major";
    if (a.compareMain(o) === 0)
      return a.minor && !a.patch ? "minor" : "patch";
  }
  const l = c ? "pre" : "";
  return r.major !== n.major ? l + "major" : r.minor !== n.minor ? l + "minor" : r.patch !== n.patch ? l + "patch" : "prerelease";
};
var YT = WT;
const JT = Pt, XT = (e, t) => new JT(e, t).major;
var QT = XT;
const ZT = Pt, eA = (e, t) => new ZT(e, t).minor;
var tA = eA;
const rA = Pt, nA = (e, t) => new rA(e, t).patch;
var iA = nA;
const sA = Yi, oA = (e, t) => {
  const r = sA(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var aA = oA;
const bp = Pt, cA = (e, t, r) => new bp(e, r).compare(new bp(t, r));
var cr = cA;
const lA = cr, uA = (e, t, r) => lA(t, e, r);
var fA = uA;
const dA = cr, hA = (e, t) => dA(e, t, !0);
var pA = hA;
const Pp = Pt, mA = (e, t, r) => {
  const n = new Pp(e, r), i = new Pp(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var zu = mA;
const yA = zu, gA = (e, t) => e.sort((r, n) => yA(r, n, t));
var $A = gA;
const vA = zu, _A = (e, t) => e.sort((r, n) => vA(n, r, t));
var wA = _A;
const EA = cr, SA = (e, t, r) => EA(e, t, r) > 0;
var pc = SA;
const bA = cr, PA = (e, t, r) => bA(e, t, r) < 0;
var Ku = PA;
const TA = cr, AA = (e, t, r) => TA(e, t, r) === 0;
var q0 = AA;
const NA = cr, OA = (e, t, r) => NA(e, t, r) !== 0;
var B0 = OA;
const RA = cr, IA = (e, t, r) => RA(e, t, r) >= 0;
var Wu = IA;
const CA = cr, kA = (e, t, r) => CA(e, t, r) <= 0;
var Yu = kA;
const DA = q0, FA = B0, jA = pc, LA = Wu, UA = Ku, MA = Yu, xA = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return DA(e, r, n);
    case "!=":
      return FA(e, r, n);
    case ">":
      return jA(e, r, n);
    case ">=":
      return LA(e, r, n);
    case "<":
      return UA(e, r, n);
    case "<=":
      return MA(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var V0 = xA;
const qA = Pt, BA = Yi, { safeRe: Yo, t: Jo } = _o, VA = (e, t) => {
  if (e instanceof qA)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? Yo[Jo.COERCEFULL] : Yo[Jo.COERCE]);
  else {
    const c = t.includePrerelease ? Yo[Jo.COERCERTLFULL] : Yo[Jo.COERCERTL];
    let u;
    for (; (u = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || u.index + u[0].length !== r.index + r[0].length) && (r = u), c.lastIndex = u.index + u[1].length + u[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", s = r[4] || "0", o = t.includePrerelease && r[5] ? `-${r[5]}` : "", a = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return BA(`${n}.${i}.${s}${o}${a}`, t);
};
var HA = VA;
class GA {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var zA = GA, ol, Tp;
function lr() {
  if (Tp) return ol;
  Tp = 1;
  const e = /\s+/g;
  class t {
    constructor(L, V) {
      if (V = i(V), L instanceof t)
        return L.loose === !!V.loose && L.includePrerelease === !!V.includePrerelease ? L : new t(L.raw, V);
      if (L instanceof s)
        return this.raw = L.value, this.set = [[L]], this.formatted = void 0, this;
      if (this.options = V, this.loose = !!V.loose, this.includePrerelease = !!V.includePrerelease, this.raw = L.trim().replace(e, " "), this.set = this.raw.split("||").map((U) => this.parseRange(U.trim())).filter((U) => U.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const U = this.set[0];
        if (this.set = this.set.filter((G) => !$(G[0])), this.set.length === 0)
          this.set = [U];
        else if (this.set.length > 1) {
          for (const G of this.set)
            if (G.length === 1 && v(G[0])) {
              this.set = [G];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let L = 0; L < this.set.length; L++) {
          L > 0 && (this.formatted += "||");
          const V = this.set[L];
          for (let U = 0; U < V.length; U++)
            U > 0 && (this.formatted += " "), this.formatted += V[U].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(L) {
      const U = ((this.options.includePrerelease && p) | (this.options.loose && y)) + ":" + L, G = n.get(U);
      if (G)
        return G;
      const q = this.options.loose, C = q ? c[u.HYPHENRANGELOOSE] : c[u.HYPHENRANGE];
      L = L.replace(C, B(this.options.includePrerelease)), o("hyphen replace", L), L = L.replace(c[u.COMPARATORTRIM], l), o("comparator trim", L), L = L.replace(c[u.TILDETRIM], f), o("tilde trim", L), L = L.replace(c[u.CARETTRIM], h), o("caret trim", L);
      let S = L.split(" ").map((_) => w(_, this.options)).join(" ").split(/\s+/).map((_) => x(_, this.options));
      q && (S = S.filter((_) => (o("loose invalid filter", _, this.options), !!_.match(c[u.COMPARATORLOOSE])))), o("range list", S);
      const N = /* @__PURE__ */ new Map(), b = S.map((_) => new s(_, this.options));
      for (const _ of b) {
        if ($(_))
          return [_];
        N.set(_.value, _);
      }
      N.size > 1 && N.has("") && N.delete("");
      const d = [...N.values()];
      return n.set(U, d), d;
    }
    intersects(L, V) {
      if (!(L instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((U) => m(U, V) && L.set.some((G) => m(G, V) && U.every((q) => G.every((C) => q.intersects(C, V)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(L) {
      if (!L)
        return !1;
      if (typeof L == "string")
        try {
          L = new a(L, this.options);
        } catch {
          return !1;
        }
      for (let V = 0; V < this.set.length; V++)
        if (Q(this.set[V], L, this.options))
          return !0;
      return !1;
    }
  }
  ol = t;
  const r = zA, n = new r(), i = Gu, s = mc(), o = hc, a = Pt, {
    safeRe: c,
    t: u,
    comparatorTrimReplace: l,
    tildeTrimReplace: f,
    caretTrimReplace: h
  } = _o, { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: y } = dc, $ = (j) => j.value === "<0.0.0-0", v = (j) => j.value === "", m = (j, L) => {
    let V = !0;
    const U = j.slice();
    let G = U.pop();
    for (; V && U.length; )
      V = U.every((q) => G.intersects(q, L)), G = U.pop();
    return V;
  }, w = (j, L) => (o("comp", j, L), j = H(j, L), o("caret", j), j = I(j, L), o("tildes", j), j = ue(j, L), o("xrange", j), j = Z(j, L), o("stars", j), j), T = (j) => !j || j.toLowerCase() === "x" || j === "*", I = (j, L) => j.trim().split(/\s+/).map((V) => F(V, L)).join(" "), F = (j, L) => {
    const V = L.loose ? c[u.TILDELOOSE] : c[u.TILDE];
    return j.replace(V, (U, G, q, C, S) => {
      o("tilde", j, U, G, q, C, S);
      let N;
      return T(G) ? N = "" : T(q) ? N = `>=${G}.0.0 <${+G + 1}.0.0-0` : T(C) ? N = `>=${G}.${q}.0 <${G}.${+q + 1}.0-0` : S ? (o("replaceTilde pr", S), N = `>=${G}.${q}.${C}-${S} <${G}.${+q + 1}.0-0`) : N = `>=${G}.${q}.${C} <${G}.${+q + 1}.0-0`, o("tilde return", N), N;
    });
  }, H = (j, L) => j.trim().split(/\s+/).map((V) => z(V, L)).join(" "), z = (j, L) => {
    o("caret", j, L);
    const V = L.loose ? c[u.CARETLOOSE] : c[u.CARET], U = L.includePrerelease ? "-0" : "";
    return j.replace(V, (G, q, C, S, N) => {
      o("caret", j, G, q, C, S, N);
      let b;
      return T(q) ? b = "" : T(C) ? b = `>=${q}.0.0${U} <${+q + 1}.0.0-0` : T(S) ? q === "0" ? b = `>=${q}.${C}.0${U} <${q}.${+C + 1}.0-0` : b = `>=${q}.${C}.0${U} <${+q + 1}.0.0-0` : N ? (o("replaceCaret pr", N), q === "0" ? C === "0" ? b = `>=${q}.${C}.${S}-${N} <${q}.${C}.${+S + 1}-0` : b = `>=${q}.${C}.${S}-${N} <${q}.${+C + 1}.0-0` : b = `>=${q}.${C}.${S}-${N} <${+q + 1}.0.0-0`) : (o("no pr"), q === "0" ? C === "0" ? b = `>=${q}.${C}.${S}${U} <${q}.${C}.${+S + 1}-0` : b = `>=${q}.${C}.${S}${U} <${q}.${+C + 1}.0-0` : b = `>=${q}.${C}.${S} <${+q + 1}.0.0-0`), o("caret return", b), b;
    });
  }, ue = (j, L) => (o("replaceXRanges", j, L), j.split(/\s+/).map((V) => R(V, L)).join(" ")), R = (j, L) => {
    j = j.trim();
    const V = L.loose ? c[u.XRANGELOOSE] : c[u.XRANGE];
    return j.replace(V, (U, G, q, C, S, N) => {
      o("xRange", j, U, G, q, C, S, N);
      const b = T(q), d = b || T(C), _ = d || T(S), A = _;
      return G === "=" && A && (G = ""), N = L.includePrerelease ? "-0" : "", b ? G === ">" || G === "<" ? U = "<0.0.0-0" : U = "*" : G && A ? (d && (C = 0), S = 0, G === ">" ? (G = ">=", d ? (q = +q + 1, C = 0, S = 0) : (C = +C + 1, S = 0)) : G === "<=" && (G = "<", d ? q = +q + 1 : C = +C + 1), G === "<" && (N = "-0"), U = `${G + q}.${C}.${S}${N}`) : d ? U = `>=${q}.0.0${N} <${+q + 1}.0.0-0` : _ && (U = `>=${q}.${C}.0${N} <${q}.${+C + 1}.0-0`), o("xRange return", U), U;
    });
  }, Z = (j, L) => (o("replaceStars", j, L), j.trim().replace(c[u.STAR], "")), x = (j, L) => (o("replaceGTE0", j, L), j.trim().replace(c[L.includePrerelease ? u.GTE0PRE : u.GTE0], "")), B = (j) => (L, V, U, G, q, C, S, N, b, d, _, A) => (T(U) ? V = "" : T(G) ? V = `>=${U}.0.0${j ? "-0" : ""}` : T(q) ? V = `>=${U}.${G}.0${j ? "-0" : ""}` : C ? V = `>=${V}` : V = `>=${V}${j ? "-0" : ""}`, T(b) ? N = "" : T(d) ? N = `<${+b + 1}.0.0-0` : T(_) ? N = `<${b}.${+d + 1}.0-0` : A ? N = `<=${b}.${d}.${_}-${A}` : j ? N = `<${b}.${d}.${+_ + 1}-0` : N = `<=${N}`, `${V} ${N}`.trim()), Q = (j, L, V) => {
    for (let U = 0; U < j.length; U++)
      if (!j[U].test(L))
        return !1;
    if (L.prerelease.length && !V.includePrerelease) {
      for (let U = 0; U < j.length; U++)
        if (o(j[U].semver), j[U].semver !== s.ANY && j[U].semver.prerelease.length > 0) {
          const G = j[U].semver;
          if (G.major === L.major && G.minor === L.minor && G.patch === L.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return ol;
}
var al, Ap;
function mc() {
  if (Ap) return al;
  Ap = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, f) {
      if (f = r(f), l instanceof t) {
        if (l.loose === !!f.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), o("comparator", l, f), this.options = f, this.loose = !!f.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, o("comp", this);
    }
    parse(l) {
      const f = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], h = l.match(f);
      if (!h)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = h[1] !== void 0 ? h[1] : "", this.operator === "=" && (this.operator = ""), h[2] ? this.semver = new a(h[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (o("Comparator.test", l, this.options.loose), this.semver === e || l === e)
        return !0;
      if (typeof l == "string")
        try {
          l = new a(l, this.options);
        } catch {
          return !1;
        }
      return s(l, this.operator, this.semver, this.options);
    }
    intersects(l, f) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, f).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, f).test(l.semver) : (f = r(f), f.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !f.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || s(this.semver, "<", l.semver, f) && this.operator.startsWith(">") && l.operator.startsWith("<") || s(this.semver, ">", l.semver, f) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  al = t;
  const r = Gu, { safeRe: n, t: i } = _o, s = V0, o = hc, a = Pt, c = lr();
  return al;
}
const KA = lr(), WA = (e, t, r) => {
  try {
    t = new KA(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var yc = WA;
const YA = lr(), JA = (e, t) => new YA(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var XA = JA;
const QA = Pt, ZA = lr(), eN = (e, t, r) => {
  let n = null, i = null, s = null;
  try {
    s = new ZA(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    s.test(o) && (!n || i.compare(o) === -1) && (n = o, i = new QA(n, r));
  }), n;
};
var tN = eN;
const rN = Pt, nN = lr(), iN = (e, t, r) => {
  let n = null, i = null, s = null;
  try {
    s = new nN(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    s.test(o) && (!n || i.compare(o) === 1) && (n = o, i = new rN(n, r));
  }), n;
};
var sN = iN;
const cl = Pt, oN = lr(), Np = pc, aN = (e, t) => {
  e = new oN(e, t);
  let r = new cl("0.0.0");
  if (e.test(r) || (r = new cl("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let s = null;
    i.forEach((o) => {
      const a = new cl(o.semver.version);
      switch (o.operator) {
        case ">":
          a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), a.raw = a.format();
        case "":
        case ">=":
          (!s || Np(a, s)) && (s = a);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${o.operator}`);
      }
    }), s && (!r || Np(r, s)) && (r = s);
  }
  return r && e.test(r) ? r : null;
};
var cN = aN;
const lN = lr(), uN = (e, t) => {
  try {
    return new lN(e, t).range || "*";
  } catch {
    return null;
  }
};
var fN = uN;
const dN = Pt, H0 = mc(), { ANY: hN } = H0, pN = lr(), mN = yc, Op = pc, Rp = Ku, yN = Yu, gN = Wu, $N = (e, t, r, n) => {
  e = new dN(e, n), t = new pN(t, n);
  let i, s, o, a, c;
  switch (r) {
    case ">":
      i = Op, s = yN, o = Rp, a = ">", c = ">=";
      break;
    case "<":
      i = Rp, s = gN, o = Op, a = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (mN(e, t, n))
    return !1;
  for (let u = 0; u < t.set.length; ++u) {
    const l = t.set[u];
    let f = null, h = null;
    if (l.forEach((p) => {
      p.semver === hN && (p = new H0(">=0.0.0")), f = f || p, h = h || p, i(p.semver, f.semver, n) ? f = p : o(p.semver, h.semver, n) && (h = p);
    }), f.operator === a || f.operator === c || (!h.operator || h.operator === a) && s(e, h.semver))
      return !1;
    if (h.operator === c && o(e, h.semver))
      return !1;
  }
  return !0;
};
var Ju = $N;
const vN = Ju, _N = (e, t, r) => vN(e, t, ">", r);
var wN = _N;
const EN = Ju, SN = (e, t, r) => EN(e, t, "<", r);
var bN = SN;
const Ip = lr(), PN = (e, t, r) => (e = new Ip(e, r), t = new Ip(t, r), e.intersects(t, r));
var TN = PN;
const AN = yc, NN = cr;
var ON = (e, t, r) => {
  const n = [];
  let i = null, s = null;
  const o = e.sort((l, f) => NN(l, f, r));
  for (const l of o)
    AN(l, t, r) ? (s = l, i || (i = l)) : (s && n.push([i, s]), s = null, i = null);
  i && n.push([i, null]);
  const a = [];
  for (const [l, f] of n)
    l === f ? a.push(l) : !f && l === o[0] ? a.push("*") : f ? l === o[0] ? a.push(`<=${f}`) : a.push(`${l} - ${f}`) : a.push(`>=${l}`);
  const c = a.join(" || "), u = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < u.length ? c : t;
};
const Cp = lr(), Xu = mc(), { ANY: ll } = Xu, ps = yc, Qu = cr, RN = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new Cp(e, r), t = new Cp(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const s of t.set) {
      const o = CN(i, s, r);
      if (n = n || o !== null, o)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, IN = [new Xu(">=0.0.0-0")], kp = [new Xu(">=0.0.0")], CN = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === ll) {
    if (t.length === 1 && t[0].semver === ll)
      return !0;
    r.includePrerelease ? e = IN : e = kp;
  }
  if (t.length === 1 && t[0].semver === ll) {
    if (r.includePrerelease)
      return !0;
    t = kp;
  }
  const n = /* @__PURE__ */ new Set();
  let i, s;
  for (const p of e)
    p.operator === ">" || p.operator === ">=" ? i = Dp(i, p, r) : p.operator === "<" || p.operator === "<=" ? s = Fp(s, p, r) : n.add(p.semver);
  if (n.size > 1)
    return null;
  let o;
  if (i && s) {
    if (o = Qu(i.semver, s.semver, r), o > 0)
      return null;
    if (o === 0 && (i.operator !== ">=" || s.operator !== "<="))
      return null;
  }
  for (const p of n) {
    if (i && !ps(p, String(i), r) || s && !ps(p, String(s), r))
      return null;
    for (const y of t)
      if (!ps(p, String(y), r))
        return !1;
    return !0;
  }
  let a, c, u, l, f = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1, h = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  f && f.prerelease.length === 1 && s.operator === "<" && f.prerelease[0] === 0 && (f = !1);
  for (const p of t) {
    if (l = l || p.operator === ">" || p.operator === ">=", u = u || p.operator === "<" || p.operator === "<=", i) {
      if (h && p.semver.prerelease && p.semver.prerelease.length && p.semver.major === h.major && p.semver.minor === h.minor && p.semver.patch === h.patch && (h = !1), p.operator === ">" || p.operator === ">=") {
        if (a = Dp(i, p, r), a === p && a !== i)
          return !1;
      } else if (i.operator === ">=" && !ps(i.semver, String(p), r))
        return !1;
    }
    if (s) {
      if (f && p.semver.prerelease && p.semver.prerelease.length && p.semver.major === f.major && p.semver.minor === f.minor && p.semver.patch === f.patch && (f = !1), p.operator === "<" || p.operator === "<=") {
        if (c = Fp(s, p, r), c === p && c !== s)
          return !1;
      } else if (s.operator === "<=" && !ps(s.semver, String(p), r))
        return !1;
    }
    if (!p.operator && (s || i) && o !== 0)
      return !1;
  }
  return !(i && u && !s && o !== 0 || s && l && !i && o !== 0 || h || f);
}, Dp = (e, t, r) => {
  if (!e)
    return t;
  const n = Qu(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Fp = (e, t, r) => {
  if (!e)
    return t;
  const n = Qu(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var kN = RN;
const ul = _o, jp = dc, DN = Pt, Lp = x0, FN = Yi, jN = BT, LN = GT, UN = KT, MN = YT, xN = QT, qN = tA, BN = iA, VN = aA, HN = cr, GN = fA, zN = pA, KN = zu, WN = $A, YN = wA, JN = pc, XN = Ku, QN = q0, ZN = B0, eO = Wu, tO = Yu, rO = V0, nO = HA, iO = mc(), sO = lr(), oO = yc, aO = XA, cO = tN, lO = sN, uO = cN, fO = fN, dO = Ju, hO = wN, pO = bN, mO = TN, yO = ON, gO = kN;
var Zu = {
  parse: FN,
  valid: jN,
  clean: LN,
  inc: UN,
  diff: MN,
  major: xN,
  minor: qN,
  patch: BN,
  prerelease: VN,
  compare: HN,
  rcompare: GN,
  compareLoose: zN,
  compareBuild: KN,
  sort: WN,
  rsort: YN,
  gt: JN,
  lt: XN,
  eq: QN,
  neq: ZN,
  gte: eO,
  lte: tO,
  cmp: rO,
  coerce: nO,
  Comparator: iO,
  Range: sO,
  satisfies: oO,
  toComparators: aO,
  maxSatisfying: cO,
  minSatisfying: lO,
  minVersion: uO,
  validRange: fO,
  outside: dO,
  gtr: hO,
  ltr: pO,
  intersects: mO,
  simplifyRange: yO,
  subset: gO,
  SemVer: DN,
  re: ul.re,
  src: ul.src,
  tokens: ul.t,
  SEMVER_SPEC_VERSION: jp.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: jp.RELEASE_TYPES,
  compareIdentifiers: Lp.compareIdentifiers,
  rcompareIdentifiers: Lp.rcompareIdentifiers
};
const li = /* @__PURE__ */ rc(Zu);
var wo = {}, qa = { exports: {} };
qa.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, s = 2, o = 9007199254740991, a = "[object Arguments]", c = "[object Array]", u = "[object AsyncFunction]", l = "[object Boolean]", f = "[object Date]", h = "[object Error]", p = "[object Function]", y = "[object GeneratorFunction]", $ = "[object Map]", v = "[object Number]", m = "[object Null]", w = "[object Object]", T = "[object Promise]", I = "[object Proxy]", F = "[object RegExp]", H = "[object Set]", z = "[object String]", ue = "[object Symbol]", R = "[object Undefined]", Z = "[object WeakMap]", x = "[object ArrayBuffer]", B = "[object DataView]", Q = "[object Float32Array]", j = "[object Float64Array]", L = "[object Int8Array]", V = "[object Int16Array]", U = "[object Int32Array]", G = "[object Uint8Array]", q = "[object Uint8ClampedArray]", C = "[object Uint16Array]", S = "[object Uint32Array]", N = /[\\^$.*+?()[\]{}|]/g, b = /^\[object .+?Constructor\]$/, d = /^(?:0|[1-9]\d*)$/, _ = {};
  _[Q] = _[j] = _[L] = _[V] = _[U] = _[G] = _[q] = _[C] = _[S] = !0, _[a] = _[c] = _[x] = _[l] = _[B] = _[f] = _[h] = _[p] = _[$] = _[v] = _[w] = _[F] = _[H] = _[z] = _[Z] = !1;
  var A = typeof vt == "object" && vt && vt.Object === Object && vt, E = typeof self == "object" && self && self.Object === Object && self, g = A || E || Function("return this")(), D = t && !t.nodeType && t, O = D && !0 && e && !e.nodeType && e, W = O && O.exports === D, me = W && A.process, Ee = function() {
    try {
      return me && me.binding && me.binding("util");
    } catch {
    }
  }(), Ae = Ee && Ee.isTypedArray;
  function Ie(P, k) {
    for (var M = -1, J = P == null ? 0 : P.length, Ne = 0, ae = []; ++M < J; ) {
      var je = P[M];
      k(je, M, P) && (ae[Ne++] = je);
    }
    return ae;
  }
  function it(P, k) {
    for (var M = -1, J = k.length, Ne = P.length; ++M < J; )
      P[Ne + M] = k[M];
    return P;
  }
  function Se(P, k) {
    for (var M = -1, J = P == null ? 0 : P.length; ++M < J; )
      if (k(P[M], M, P))
        return !0;
    return !1;
  }
  function qe(P, k) {
    for (var M = -1, J = Array(P); ++M < P; )
      J[M] = k(M);
    return J;
  }
  function Yt(P) {
    return function(k) {
      return P(k);
    };
  }
  function xt(P, k) {
    return P.has(k);
  }
  function kt(P, k) {
    return P == null ? void 0 : P[k];
  }
  function qt(P) {
    var k = -1, M = Array(P.size);
    return P.forEach(function(J, Ne) {
      M[++k] = [Ne, J];
    }), M;
  }
  function wr(P, k) {
    return function(M) {
      return P(k(M));
    };
  }
  function Er(P) {
    var k = -1, M = Array(P.size);
    return P.forEach(function(J) {
      M[++k] = J;
    }), M;
  }
  var Sr = Array.prototype, Dt = Function.prototype, Bt = Object.prototype, br = g["__core-js_shared__"], qr = Dt.toString, At = Bt.hasOwnProperty, sh = function() {
    var P = /[^.]+$/.exec(br && br.keys && br.keys.IE_PROTO || "");
    return P ? "Symbol(src)_1." + P : "";
  }(), oh = Bt.toString, z_ = RegExp(
    "^" + qr.call(At).replace(N, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), ah = W ? g.Buffer : void 0, Co = g.Symbol, ch = g.Uint8Array, lh = Bt.propertyIsEnumerable, K_ = Sr.splice, An = Co ? Co.toStringTag : void 0, uh = Object.getOwnPropertySymbols, W_ = ah ? ah.isBuffer : void 0, Y_ = wr(Object.keys, Object), Bc = si(g, "DataView"), os = si(g, "Map"), Vc = si(g, "Promise"), Hc = si(g, "Set"), Gc = si(g, "WeakMap"), as = si(Object, "create"), J_ = Rn(Bc), X_ = Rn(os), Q_ = Rn(Vc), Z_ = Rn(Hc), ew = Rn(Gc), fh = Co ? Co.prototype : void 0, zc = fh ? fh.valueOf : void 0;
  function Nn(P) {
    var k = -1, M = P == null ? 0 : P.length;
    for (this.clear(); ++k < M; ) {
      var J = P[k];
      this.set(J[0], J[1]);
    }
  }
  function tw() {
    this.__data__ = as ? as(null) : {}, this.size = 0;
  }
  function rw(P) {
    var k = this.has(P) && delete this.__data__[P];
    return this.size -= k ? 1 : 0, k;
  }
  function nw(P) {
    var k = this.__data__;
    if (as) {
      var M = k[P];
      return M === n ? void 0 : M;
    }
    return At.call(k, P) ? k[P] : void 0;
  }
  function iw(P) {
    var k = this.__data__;
    return as ? k[P] !== void 0 : At.call(k, P);
  }
  function sw(P, k) {
    var M = this.__data__;
    return this.size += this.has(P) ? 0 : 1, M[P] = as && k === void 0 ? n : k, this;
  }
  Nn.prototype.clear = tw, Nn.prototype.delete = rw, Nn.prototype.get = nw, Nn.prototype.has = iw, Nn.prototype.set = sw;
  function Pr(P) {
    var k = -1, M = P == null ? 0 : P.length;
    for (this.clear(); ++k < M; ) {
      var J = P[k];
      this.set(J[0], J[1]);
    }
  }
  function ow() {
    this.__data__ = [], this.size = 0;
  }
  function aw(P) {
    var k = this.__data__, M = Do(k, P);
    if (M < 0)
      return !1;
    var J = k.length - 1;
    return M == J ? k.pop() : K_.call(k, M, 1), --this.size, !0;
  }
  function cw(P) {
    var k = this.__data__, M = Do(k, P);
    return M < 0 ? void 0 : k[M][1];
  }
  function lw(P) {
    return Do(this.__data__, P) > -1;
  }
  function uw(P, k) {
    var M = this.__data__, J = Do(M, P);
    return J < 0 ? (++this.size, M.push([P, k])) : M[J][1] = k, this;
  }
  Pr.prototype.clear = ow, Pr.prototype.delete = aw, Pr.prototype.get = cw, Pr.prototype.has = lw, Pr.prototype.set = uw;
  function On(P) {
    var k = -1, M = P == null ? 0 : P.length;
    for (this.clear(); ++k < M; ) {
      var J = P[k];
      this.set(J[0], J[1]);
    }
  }
  function fw() {
    this.size = 0, this.__data__ = {
      hash: new Nn(),
      map: new (os || Pr)(),
      string: new Nn()
    };
  }
  function dw(P) {
    var k = Fo(this, P).delete(P);
    return this.size -= k ? 1 : 0, k;
  }
  function hw(P) {
    return Fo(this, P).get(P);
  }
  function pw(P) {
    return Fo(this, P).has(P);
  }
  function mw(P, k) {
    var M = Fo(this, P), J = M.size;
    return M.set(P, k), this.size += M.size == J ? 0 : 1, this;
  }
  On.prototype.clear = fw, On.prototype.delete = dw, On.prototype.get = hw, On.prototype.has = pw, On.prototype.set = mw;
  function ko(P) {
    var k = -1, M = P == null ? 0 : P.length;
    for (this.__data__ = new On(); ++k < M; )
      this.add(P[k]);
  }
  function yw(P) {
    return this.__data__.set(P, n), this;
  }
  function gw(P) {
    return this.__data__.has(P);
  }
  ko.prototype.add = ko.prototype.push = yw, ko.prototype.has = gw;
  function Br(P) {
    var k = this.__data__ = new Pr(P);
    this.size = k.size;
  }
  function $w() {
    this.__data__ = new Pr(), this.size = 0;
  }
  function vw(P) {
    var k = this.__data__, M = k.delete(P);
    return this.size = k.size, M;
  }
  function _w(P) {
    return this.__data__.get(P);
  }
  function ww(P) {
    return this.__data__.has(P);
  }
  function Ew(P, k) {
    var M = this.__data__;
    if (M instanceof Pr) {
      var J = M.__data__;
      if (!os || J.length < r - 1)
        return J.push([P, k]), this.size = ++M.size, this;
      M = this.__data__ = new On(J);
    }
    return M.set(P, k), this.size = M.size, this;
  }
  Br.prototype.clear = $w, Br.prototype.delete = vw, Br.prototype.get = _w, Br.prototype.has = ww, Br.prototype.set = Ew;
  function Sw(P, k) {
    var M = jo(P), J = !M && Uw(P), Ne = !M && !J && Kc(P), ae = !M && !J && !Ne && _h(P), je = M || J || Ne || ae, Ke = je ? qe(P.length, String) : [], Xe = Ke.length;
    for (var De in P)
      At.call(P, De) && !(je && // Safari 9 has enumerable `arguments.length` in strict mode.
      (De == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      Ne && (De == "offset" || De == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      ae && (De == "buffer" || De == "byteLength" || De == "byteOffset") || // Skip index properties.
      kw(De, Xe))) && Ke.push(De);
    return Ke;
  }
  function Do(P, k) {
    for (var M = P.length; M--; )
      if (yh(P[M][0], k))
        return M;
    return -1;
  }
  function bw(P, k, M) {
    var J = k(P);
    return jo(P) ? J : it(J, M(P));
  }
  function cs(P) {
    return P == null ? P === void 0 ? R : m : An && An in Object(P) ? Iw(P) : Lw(P);
  }
  function dh(P) {
    return ls(P) && cs(P) == a;
  }
  function hh(P, k, M, J, Ne) {
    return P === k ? !0 : P == null || k == null || !ls(P) && !ls(k) ? P !== P && k !== k : Pw(P, k, M, J, hh, Ne);
  }
  function Pw(P, k, M, J, Ne, ae) {
    var je = jo(P), Ke = jo(k), Xe = je ? c : Vr(P), De = Ke ? c : Vr(k);
    Xe = Xe == a ? w : Xe, De = De == a ? w : De;
    var Ft = Xe == w, Jt = De == w, st = Xe == De;
    if (st && Kc(P)) {
      if (!Kc(k))
        return !1;
      je = !0, Ft = !1;
    }
    if (st && !Ft)
      return ae || (ae = new Br()), je || _h(P) ? ph(P, k, M, J, Ne, ae) : Ow(P, k, Xe, M, J, Ne, ae);
    if (!(M & i)) {
      var Vt = Ft && At.call(P, "__wrapped__"), Ht = Jt && At.call(k, "__wrapped__");
      if (Vt || Ht) {
        var Hr = Vt ? P.value() : P, Tr = Ht ? k.value() : k;
        return ae || (ae = new Br()), Ne(Hr, Tr, M, J, ae);
      }
    }
    return st ? (ae || (ae = new Br()), Rw(P, k, M, J, Ne, ae)) : !1;
  }
  function Tw(P) {
    if (!vh(P) || Fw(P))
      return !1;
    var k = gh(P) ? z_ : b;
    return k.test(Rn(P));
  }
  function Aw(P) {
    return ls(P) && $h(P.length) && !!_[cs(P)];
  }
  function Nw(P) {
    if (!jw(P))
      return Y_(P);
    var k = [];
    for (var M in Object(P))
      At.call(P, M) && M != "constructor" && k.push(M);
    return k;
  }
  function ph(P, k, M, J, Ne, ae) {
    var je = M & i, Ke = P.length, Xe = k.length;
    if (Ke != Xe && !(je && Xe > Ke))
      return !1;
    var De = ae.get(P);
    if (De && ae.get(k))
      return De == k;
    var Ft = -1, Jt = !0, st = M & s ? new ko() : void 0;
    for (ae.set(P, k), ae.set(k, P); ++Ft < Ke; ) {
      var Vt = P[Ft], Ht = k[Ft];
      if (J)
        var Hr = je ? J(Ht, Vt, Ft, k, P, ae) : J(Vt, Ht, Ft, P, k, ae);
      if (Hr !== void 0) {
        if (Hr)
          continue;
        Jt = !1;
        break;
      }
      if (st) {
        if (!Se(k, function(Tr, In) {
          if (!xt(st, In) && (Vt === Tr || Ne(Vt, Tr, M, J, ae)))
            return st.push(In);
        })) {
          Jt = !1;
          break;
        }
      } else if (!(Vt === Ht || Ne(Vt, Ht, M, J, ae))) {
        Jt = !1;
        break;
      }
    }
    return ae.delete(P), ae.delete(k), Jt;
  }
  function Ow(P, k, M, J, Ne, ae, je) {
    switch (M) {
      case B:
        if (P.byteLength != k.byteLength || P.byteOffset != k.byteOffset)
          return !1;
        P = P.buffer, k = k.buffer;
      case x:
        return !(P.byteLength != k.byteLength || !ae(new ch(P), new ch(k)));
      case l:
      case f:
      case v:
        return yh(+P, +k);
      case h:
        return P.name == k.name && P.message == k.message;
      case F:
      case z:
        return P == k + "";
      case $:
        var Ke = qt;
      case H:
        var Xe = J & i;
        if (Ke || (Ke = Er), P.size != k.size && !Xe)
          return !1;
        var De = je.get(P);
        if (De)
          return De == k;
        J |= s, je.set(P, k);
        var Ft = ph(Ke(P), Ke(k), J, Ne, ae, je);
        return je.delete(P), Ft;
      case ue:
        if (zc)
          return zc.call(P) == zc.call(k);
    }
    return !1;
  }
  function Rw(P, k, M, J, Ne, ae) {
    var je = M & i, Ke = mh(P), Xe = Ke.length, De = mh(k), Ft = De.length;
    if (Xe != Ft && !je)
      return !1;
    for (var Jt = Xe; Jt--; ) {
      var st = Ke[Jt];
      if (!(je ? st in k : At.call(k, st)))
        return !1;
    }
    var Vt = ae.get(P);
    if (Vt && ae.get(k))
      return Vt == k;
    var Ht = !0;
    ae.set(P, k), ae.set(k, P);
    for (var Hr = je; ++Jt < Xe; ) {
      st = Ke[Jt];
      var Tr = P[st], In = k[st];
      if (J)
        var wh = je ? J(In, Tr, st, k, P, ae) : J(Tr, In, st, P, k, ae);
      if (!(wh === void 0 ? Tr === In || Ne(Tr, In, M, J, ae) : wh)) {
        Ht = !1;
        break;
      }
      Hr || (Hr = st == "constructor");
    }
    if (Ht && !Hr) {
      var Lo = P.constructor, Uo = k.constructor;
      Lo != Uo && "constructor" in P && "constructor" in k && !(typeof Lo == "function" && Lo instanceof Lo && typeof Uo == "function" && Uo instanceof Uo) && (Ht = !1);
    }
    return ae.delete(P), ae.delete(k), Ht;
  }
  function mh(P) {
    return bw(P, qw, Cw);
  }
  function Fo(P, k) {
    var M = P.__data__;
    return Dw(k) ? M[typeof k == "string" ? "string" : "hash"] : M.map;
  }
  function si(P, k) {
    var M = kt(P, k);
    return Tw(M) ? M : void 0;
  }
  function Iw(P) {
    var k = At.call(P, An), M = P[An];
    try {
      P[An] = void 0;
      var J = !0;
    } catch {
    }
    var Ne = oh.call(P);
    return J && (k ? P[An] = M : delete P[An]), Ne;
  }
  var Cw = uh ? function(P) {
    return P == null ? [] : (P = Object(P), Ie(uh(P), function(k) {
      return lh.call(P, k);
    }));
  } : Bw, Vr = cs;
  (Bc && Vr(new Bc(new ArrayBuffer(1))) != B || os && Vr(new os()) != $ || Vc && Vr(Vc.resolve()) != T || Hc && Vr(new Hc()) != H || Gc && Vr(new Gc()) != Z) && (Vr = function(P) {
    var k = cs(P), M = k == w ? P.constructor : void 0, J = M ? Rn(M) : "";
    if (J)
      switch (J) {
        case J_:
          return B;
        case X_:
          return $;
        case Q_:
          return T;
        case Z_:
          return H;
        case ew:
          return Z;
      }
    return k;
  });
  function kw(P, k) {
    return k = k ?? o, !!k && (typeof P == "number" || d.test(P)) && P > -1 && P % 1 == 0 && P < k;
  }
  function Dw(P) {
    var k = typeof P;
    return k == "string" || k == "number" || k == "symbol" || k == "boolean" ? P !== "__proto__" : P === null;
  }
  function Fw(P) {
    return !!sh && sh in P;
  }
  function jw(P) {
    var k = P && P.constructor, M = typeof k == "function" && k.prototype || Bt;
    return P === M;
  }
  function Lw(P) {
    return oh.call(P);
  }
  function Rn(P) {
    if (P != null) {
      try {
        return qr.call(P);
      } catch {
      }
      try {
        return P + "";
      } catch {
      }
    }
    return "";
  }
  function yh(P, k) {
    return P === k || P !== P && k !== k;
  }
  var Uw = dh(/* @__PURE__ */ function() {
    return arguments;
  }()) ? dh : function(P) {
    return ls(P) && At.call(P, "callee") && !lh.call(P, "callee");
  }, jo = Array.isArray;
  function Mw(P) {
    return P != null && $h(P.length) && !gh(P);
  }
  var Kc = W_ || Vw;
  function xw(P, k) {
    return hh(P, k);
  }
  function gh(P) {
    if (!vh(P))
      return !1;
    var k = cs(P);
    return k == p || k == y || k == u || k == I;
  }
  function $h(P) {
    return typeof P == "number" && P > -1 && P % 1 == 0 && P <= o;
  }
  function vh(P) {
    var k = typeof P;
    return P != null && (k == "object" || k == "function");
  }
  function ls(P) {
    return P != null && typeof P == "object";
  }
  var _h = Ae ? Yt(Ae) : Aw;
  function qw(P) {
    return Mw(P) ? Sw(P) : Nw(P);
  }
  function Bw() {
    return [];
  }
  function Vw() {
    return !1;
  }
  e.exports = xw;
})(qa, qa.exports);
var $O = qa.exports;
Object.defineProperty(wo, "__esModule", { value: !0 });
wo.DownloadedUpdateHelper = void 0;
wo.createTempUpdateFile = SO;
const vO = ho, _O = vn, Up = $O, Ln = _n, Rs = ge;
class wO {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return Rs.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, r, n, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return Up(this.versionInfo, r) && Up(this.fileInfo.info, n.info) && await (0, Ln.pathExists)(t) ? t : null;
    const s = await this.getValidCachedUpdateFile(n, i);
    return s === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = s, s);
  }
  async setDownloadedFile(t, r, n, i, s, o) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: s,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, o && await (0, Ln.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, Ln.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, r) {
    const n = this.getUpdateInfoFile();
    if (!await (0, Ln.pathExists)(n))
      return null;
    let s;
    try {
      s = await (0, Ln.readJson)(n);
    } catch (u) {
      let l = "No cached update info available";
      return u.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), l += ` (error on read: ${u.message})`), r.info(l), null;
    }
    if (!((s == null ? void 0 : s.fileName) !== null))
      return r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== s.sha512)
      return r.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${s.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const a = Rs.join(this.cacheDirForPendingUpdate, s.fileName);
    if (!await (0, Ln.pathExists)(a))
      return r.info("Cached update file doesn't exist"), null;
    const c = await EO(a);
    return t.info.sha512 !== c ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${c}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = s, a);
  }
  getUpdateInfoFile() {
    return Rs.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
wo.DownloadedUpdateHelper = wO;
function EO(e, t = "sha512", r = "base64", n) {
  return new Promise((i, s) => {
    const o = (0, vO.createHash)(t);
    o.on("error", s).setEncoding(r), (0, _O.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", s).on("end", () => {
      o.end(), i(o.read());
    }).pipe(o, { end: !1 });
  });
}
async function SO(e, t, r) {
  let n = 0, i = Rs.join(t, e);
  for (let s = 0; s < 3; s++)
    try {
      return await (0, Ln.unlink)(i), i;
    } catch (o) {
      if (o.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${o}`), i = Rs.join(t, `${n++}-${e}`);
    }
  return i;
}
var gc = {}, ef = {};
Object.defineProperty(ef, "__esModule", { value: !0 });
ef.getAppCacheDir = PO;
const fl = ge, bO = ec;
function PO() {
  const e = (0, bO.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || fl.join(e, "AppData", "Local") : process.platform === "darwin" ? t = fl.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || fl.join(e, ".cache"), t;
}
Object.defineProperty(gc, "__esModule", { value: !0 });
gc.ElectronAppAdapter = void 0;
const Mp = ge, TO = ef;
class AO {
  constructor(t = jr.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? Mp.join(process.resourcesPath, "app-update.yml") : Mp.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, TO.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (r, n) => t(n));
  }
}
gc.ElectronAppAdapter = AO;
var G0 = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = r;
  const t = Je;
  e.NET_SESSION_NAME = "electron-updater";
  function r() {
    return jr.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class n extends t.HttpExecutor {
    constructor(s) {
      super(), this.proxyLoginCallback = s, this.cachedSession = null;
    }
    async download(s, o, a) {
      return await a.cancellationToken.createPromise((c, u, l) => {
        const f = {
          headers: a.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(s, f), (0, t.configureRequestOptions)(f), this.doDownload(f, {
          destination: o,
          options: a,
          onCancel: l,
          callback: (h) => {
            h == null ? c(o) : u(h);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(s, o) {
      s.headers && s.headers.Host && (s.host = s.headers.Host, delete s.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const a = jr.net.request({
        ...s,
        session: this.cachedSession
      });
      return a.on("response", o), this.proxyLoginCallback != null && a.on("login", this.proxyLoginCallback), a;
    }
    addRedirectHandlers(s, o, a, c, u) {
      s.on("redirect", (l, f, h) => {
        s.abort(), c > this.maxRedirects ? a(this.createMaxRedirectError()) : u(t.HttpExecutor.prepareRedirectUrlOptions(h, o));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(G0);
var Eo = {}, Wt = {}, NO = "[object Symbol]", z0 = /[\\^$.*+?()[\]{}|]/g, OO = RegExp(z0.source), RO = typeof vt == "object" && vt && vt.Object === Object && vt, IO = typeof self == "object" && self && self.Object === Object && self, CO = RO || IO || Function("return this")(), kO = Object.prototype, DO = kO.toString, xp = CO.Symbol, qp = xp ? xp.prototype : void 0, Bp = qp ? qp.toString : void 0;
function FO(e) {
  if (typeof e == "string")
    return e;
  if (LO(e))
    return Bp ? Bp.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function jO(e) {
  return !!e && typeof e == "object";
}
function LO(e) {
  return typeof e == "symbol" || jO(e) && DO.call(e) == NO;
}
function UO(e) {
  return e == null ? "" : FO(e);
}
function MO(e) {
  return e = UO(e), e && OO.test(e) ? e.replace(z0, "\\$&") : e;
}
var xO = MO;
Object.defineProperty(Wt, "__esModule", { value: !0 });
Wt.newBaseUrl = BO;
Wt.newUrlFromBase = tu;
Wt.getChannelFilename = VO;
Wt.blockmapFiles = HO;
const K0 = zi, qO = xO;
function BO(e) {
  const t = new K0.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function tu(e, t, r = !1) {
  const n = new K0.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
}
function VO(e) {
  return `${e}.yml`;
}
function HO(e, t, r) {
  const n = tu(`${e.pathname}.blockmap`, e);
  return [tu(`${e.pathname.replace(new RegExp(qO(r), "g"), t)}.blockmap`, e), n];
}
var ze = {};
Object.defineProperty(ze, "__esModule", { value: !0 });
ze.Provider = void 0;
ze.findFile = KO;
ze.parseUpdateInfo = WO;
ze.getFileList = W0;
ze.resolveFiles = YO;
const gn = Je, GO = nt, Vp = Wt;
class zO {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, r, n) {
    return this.executor.request(this.createRequestOptions(t, r), n);
  }
  createRequestOptions(t, r) {
    const n = {};
    return this.requestHeaders == null ? r != null && (n.headers = r) : n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, gn.configureRequestUrl)(t, n), n;
  }
}
ze.Provider = zO;
function KO(e, t, r) {
  if (e.length === 0)
    throw (0, gn.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const n = e.find((i) => i.url.pathname.toLowerCase().endsWith(`.${t}`));
  return n ?? (r == null ? e[0] : e.find((i) => !r.some((s) => i.url.pathname.toLowerCase().endsWith(`.${s}`))));
}
function WO(e, t, r) {
  if (e == null)
    throw (0, gn.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let n;
  try {
    n = (0, GO.load)(e);
  } catch (i) {
    throw (0, gn.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return n;
}
function W0(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, gn.newError)(`No files provided: ${(0, gn.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function YO(e, t, r = (n) => n) {
  const i = W0(e).map((a) => {
    if (a.sha2 == null && a.sha512 == null)
      throw (0, gn.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, gn.safeStringifyJson)(a)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, Vp.newUrlFromBase)(r(a.url), t),
      info: a
    };
  }), s = e.packages, o = s == null ? null : s[process.arch] || s.ia32;
  return o != null && (i[0].packageInfo = {
    ...o,
    path: (0, Vp.newUrlFromBase)(r(o.path), t).href
  }), i;
}
Object.defineProperty(Eo, "__esModule", { value: !0 });
Eo.GenericProvider = void 0;
const Hp = Je, dl = Wt, hl = ze;
class JO extends hl.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, dl.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, dl.getChannelFilename)(this.channel), r = (0, dl.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, hl.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof Hp.HttpError && i.statusCode === 404)
          throw (0, Hp.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && n < 3) {
          await new Promise((s, o) => {
            try {
              setTimeout(s, 1e3 * n);
            } catch (a) {
              o(a);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, hl.resolveFiles)(t, this.baseUrl);
  }
}
Eo.GenericProvider = JO;
var $c = {}, vc = {};
Object.defineProperty(vc, "__esModule", { value: !0 });
vc.BitbucketProvider = void 0;
const Gp = Je, pl = Wt, ml = ze;
class XO extends ml.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: s } = t;
    this.baseUrl = (0, pl.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${s}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new Gp.CancellationToken(), r = (0, pl.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, pl.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, ml.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Gp.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, ml.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
vc.BitbucketProvider = XO;
var $n = {};
Object.defineProperty($n, "__esModule", { value: !0 });
$n.GitHubProvider = $n.BaseGitHubProvider = void 0;
$n.computeReleaseNotes = J0;
const Nr = Je, Pi = Zu, QO = zi, Ti = Wt, ru = ze, yl = /\/tag\/([^/]+)$/;
class Y0 extends ru.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, Ti.newBaseUrl)((0, Nr.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, Ti.newBaseUrl)((0, Nr.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
$n.BaseGitHubProvider = Y0;
class ZO extends Y0 {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, r, n, i, s;
    const o = new Nr.CancellationToken(), a = await this.httpRequest((0, Ti.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, o), c = (0, Nr.parseXml)(a);
    let u = c.element("entry", !1, "No published versions on GitHub"), l = null;
    try {
      if (this.updater.allowPrerelease) {
        const v = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = Pi.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if (v === null)
          l = yl.exec(u.element("link").attribute("href"))[1];
        else
          for (const m of c.getElements("entry")) {
            const w = yl.exec(m.element("link").attribute("href"));
            if (w === null)
              continue;
            const T = w[1], I = ((n = Pi.prerelease(T)) === null || n === void 0 ? void 0 : n[0]) || null, F = !v || ["alpha", "beta"].includes(v), H = I !== null && !["alpha", "beta"].includes(String(I));
            if (F && !H && !(v === "beta" && I === "alpha")) {
              l = T;
              break;
            }
            if (I && I === v) {
              l = T;
              break;
            }
          }
      } else {
        l = await this.getLatestTagName(o);
        for (const v of c.getElements("entry"))
          if (yl.exec(v.element("link").attribute("href"))[1] === l) {
            u = v;
            break;
          }
      }
    } catch (v) {
      throw (0, Nr.newError)(`Cannot parse releases feed: ${v.stack || v.message},
XML:
${a}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (l == null)
      throw (0, Nr.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let f, h = "", p = "";
    const y = async (v) => {
      h = (0, Ti.getChannelFilename)(v), p = (0, Ti.newUrlFromBase)(this.getBaseDownloadPath(String(l), h), this.baseUrl);
      const m = this.createRequestOptions(p);
      try {
        return await this.executor.request(m, o);
      } catch (w) {
        throw w instanceof Nr.HttpError && w.statusCode === 404 ? (0, Nr.newError)(`Cannot find ${h} in the latest release artifacts (${p}): ${w.stack || w.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : w;
      }
    };
    try {
      let v = this.channel;
      this.updater.allowPrerelease && (!((i = Pi.prerelease(l)) === null || i === void 0) && i[0]) && (v = this.getCustomChannelName(String((s = Pi.prerelease(l)) === null || s === void 0 ? void 0 : s[0]))), f = await y(v);
    } catch (v) {
      if (this.updater.allowPrerelease)
        f = await y(this.getDefaultChannelName());
      else
        throw v;
    }
    const $ = (0, ru.parseUpdateInfo)(f, h, p);
    return $.releaseName == null && ($.releaseName = u.elementValueOrEmpty("title")), $.releaseNotes == null && ($.releaseNotes = J0(this.updater.currentVersion, this.updater.fullChangelog, c, u)), {
      tag: l,
      ...$
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, Ti.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new QO.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(n, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, Nr.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, ru.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, r) {
    return `${this.basePath}/download/${t}/${r}`;
  }
}
$n.GitHubProvider = ZO;
function zp(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function J0(e, t, r, n) {
  if (!t)
    return zp(n);
  const i = [];
  for (const s of r.getElements("entry")) {
    const o = /\/tag\/v?([^/]+)$/.exec(s.element("link").attribute("href"))[1];
    Pi.lt(e, o) && i.push({
      version: o,
      note: zp(s)
    });
  }
  return i.sort((s, o) => Pi.rcompare(s.version, o.version));
}
var _c = {};
Object.defineProperty(_c, "__esModule", { value: !0 });
_c.KeygenProvider = void 0;
const Kp = Je, gl = Wt, $l = ze;
class eR extends $l.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, gl.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new Kp.CancellationToken(), r = (0, gl.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, gl.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, $l.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Kp.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, $l.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: r, platform: n } = this.configuration;
    return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
  }
}
_c.KeygenProvider = eR;
var wc = {};
Object.defineProperty(wc, "__esModule", { value: !0 });
wc.PrivateGitHubProvider = void 0;
const ui = Je, tR = nt, rR = ge, Wp = zi, Yp = Wt, nR = $n, iR = ze;
class sR extends nR.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new ui.CancellationToken(), r = (0, Yp.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((a) => a.name === r);
    if (i == null)
      throw (0, ui.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const s = new Wp.URL(i.url);
    let o;
    try {
      o = (0, tR.load)(await this.httpRequest(s, this.configureHeaders("application/octet-stream"), t));
    } catch (a) {
      throw a instanceof ui.HttpError && a.statusCode === 404 ? (0, ui.newError)(`Cannot find ${r} in the latest release artifacts (${s}): ${a.stack || a.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : a;
    }
    return o.assets = n.assets, o;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const r = this.updater.allowPrerelease;
    let n = this.basePath;
    r || (n = `${n}/latest`);
    const i = (0, Yp.newUrlFromBase)(n, this.baseUrl);
    try {
      const s = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? s.find((o) => o.prerelease) || s[0] : s;
    } catch (s) {
      throw (0, ui.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${s.stack || s.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, iR.getFileList)(t).map((r) => {
      const n = rR.posix.basename(r.url).replace(/ /g, "-"), i = t.assets.find((s) => s != null && s.name === n);
      if (i == null)
        throw (0, ui.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Wp.URL(i.url),
        info: r
      };
    });
  }
}
wc.PrivateGitHubProvider = sR;
Object.defineProperty($c, "__esModule", { value: !0 });
$c.isUrlProbablySupportMultiRangeRequests = X0;
$c.createClient = uR;
const Xo = Je, oR = vc, Jp = Eo, aR = $n, cR = _c, lR = wc;
function X0(e) {
  return !e.includes("s3.amazonaws.com");
}
function uR(e, t, r) {
  if (typeof e == "string")
    throw (0, Xo.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, s = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return s == null ? new aR.GitHubProvider(i, t, r) : new lR.PrivateGitHubProvider(i, t, s, r);
    }
    case "bitbucket":
      return new oR.BitbucketProvider(e, t, r);
    case "keygen":
      return new cR.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new Jp.GenericProvider({
        provider: "generic",
        url: (0, Xo.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...r,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new Jp.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && X0(i.url)
      });
    }
    case "custom": {
      const i = e, s = i.updateProvider;
      if (!s)
        throw (0, Xo.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new s(i, t, r);
    }
    default:
      throw (0, Xo.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var Ec = {}, So = {}, Ji = {}, ni = {};
Object.defineProperty(ni, "__esModule", { value: !0 });
ni.OperationKind = void 0;
ni.computeOperations = fR;
var Kn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Kn || (ni.OperationKind = Kn = {}));
function fR(e, t, r) {
  const n = Qp(e.files), i = Qp(t.files);
  let s = null;
  const o = t.files[0], a = [], c = o.name, u = n.get(c);
  if (u == null)
    throw new Error(`no file ${c} in old blockmap`);
  const l = i.get(c);
  let f = 0;
  const { checksumToOffset: h, checksumToOldSize: p } = hR(n.get(c), u.offset, r);
  let y = o.offset;
  for (let $ = 0; $ < l.checksums.length; y += l.sizes[$], $++) {
    const v = l.sizes[$], m = l.checksums[$];
    let w = h.get(m);
    w != null && p.get(m) !== v && (r.warn(`Checksum ("${m}") matches, but size differs (old: ${p.get(m)}, new: ${v})`), w = void 0), w === void 0 ? (f++, s != null && s.kind === Kn.DOWNLOAD && s.end === y ? s.end += v : (s = {
      kind: Kn.DOWNLOAD,
      start: y,
      end: y + v
      // oldBlocks: null,
    }, Xp(s, a, m, $))) : s != null && s.kind === Kn.COPY && s.end === w ? s.end += v : (s = {
      kind: Kn.COPY,
      start: w,
      end: w + v
      // oldBlocks: [checksum]
    }, Xp(s, a, m, $));
  }
  return f > 0 && r.info(`File${o.name === "file" ? "" : " " + o.name} has ${f} changed blocks`), a;
}
const dR = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function Xp(e, t, r, n) {
  if (dR && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const s = [i.start, i.end, e.start, e.end].reduce((o, a) => o < a ? o : a);
      throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${Kn[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - s} until ${i.end - s} and ${e.start - s} until ${e.end - s}`);
    }
  }
  t.push(e);
}
function hR(e, t, r) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let s = t;
  for (let o = 0; o < e.checksums.length; o++) {
    const a = e.checksums[o], c = e.sizes[o], u = i.get(a);
    if (u === void 0)
      n.set(a, s), i.set(a, c);
    else if (r.debug != null) {
      const l = u === c ? "(same size)" : `(size: ${u}, this size: ${c})`;
      r.debug(`${a} duplicated in blockmap ${l}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    s += c;
  }
  return { checksumToOffset: n, checksumToOldSize: i };
}
function Qp(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.name, r);
  return t;
}
Object.defineProperty(Ji, "__esModule", { value: !0 });
Ji.DataSplitter = void 0;
Ji.copyData = Q0;
const Qo = Je, pR = vn, mR = uo, yR = ni, Zp = Buffer.from(`\r
\r
`);
var en;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(en || (en = {}));
function Q0(e, t, r, n, i) {
  const s = (0, pR.createReadStream)("", {
    fd: r,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  s.on("error", n), s.once("end", i), s.pipe(t, {
    end: !1
  });
}
class gR extends mR.Writable {
  constructor(t, r, n, i, s, o) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = s, this.finishHandler = o, this.partIndex = -1, this.headerListBuffer = null, this.readState = en.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, r, n) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(n).catch(n);
  }
  async handleData(t) {
    let r = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, Qo.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const n = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= n, r = n;
    } else if (this.remainingPartDataCount > 0) {
      const n = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= n, await this.processPartData(t, 0, n), r = n;
    }
    if (r !== t.length) {
      if (this.readState === en.HEADER) {
        const n = this.searchHeaderListEnd(t, r);
        if (n === -1)
          return;
        r = n, this.readState = en.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === en.BODY)
          this.readState = en.INIT;
        else {
          this.partIndex++;
          let o = this.partIndexToTaskIndex.get(this.partIndex);
          if (o == null)
            if (this.isFinished)
              o = this.options.end;
            else
              throw (0, Qo.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const a = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (a < o)
            await this.copyExistingData(a, o);
          else if (a > o)
            throw (0, Qo.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (r = this.searchHeaderListEnd(t, r), r === -1) {
            this.readState = en.HEADER;
            return;
          }
        }
        const n = this.partIndexToLength[this.partIndex], i = r + n, s = Math.min(i, t.length);
        if (await this.processPartStarted(t, r, s), this.remainingPartDataCount = n - (s - r), this.remainingPartDataCount > 0)
          return;
        if (r = i + this.boundaryLength, r >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, r) {
    return new Promise((n, i) => {
      const s = () => {
        if (t === r) {
          n();
          return;
        }
        const o = this.options.tasks[t];
        if (o.kind !== yR.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        Q0(o, this.out, this.options.oldFileFd, i, () => {
          t++, s();
        });
      };
      s();
    });
  }
  searchHeaderListEnd(t, r) {
    const n = t.indexOf(Zp, r);
    if (n !== -1)
      return n + Zp.length;
    const i = r === 0 ? t : t.slice(r);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, Qo.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, r, n) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
  }
  processPartData(t, r, n) {
    this.actualPartLength += n - r;
    const i = this.out;
    return i.write(r === 0 && t.length === n ? t : t.slice(r, n)) ? Promise.resolve() : new Promise((s, o) => {
      i.on("error", o), i.once("drain", () => {
        i.removeListener("error", o), s();
      });
    });
  }
}
Ji.DataSplitter = gR;
var Sc = {};
Object.defineProperty(Sc, "__esModule", { value: !0 });
Sc.executeTasksUsingMultipleRangeRequests = $R;
Sc.checkIsRangesSupported = iu;
const nu = Je, em = Ji, tm = ni;
function $R(e, t, r, n, i) {
  const s = (o) => {
    if (o >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const a = o + 1e3;
    vR(e, {
      tasks: t,
      start: o,
      end: Math.min(t.length, a),
      oldFileFd: n
    }, r, () => s(a), i);
  };
  return s;
}
function vR(e, t, r, n, i) {
  let s = "bytes=", o = 0;
  const a = /* @__PURE__ */ new Map(), c = [];
  for (let f = t.start; f < t.end; f++) {
    const h = t.tasks[f];
    h.kind === tm.OperationKind.DOWNLOAD && (s += `${h.start}-${h.end - 1}, `, a.set(o, f), o++, c.push(h.end - h.start));
  }
  if (o <= 1) {
    const f = (h) => {
      if (h >= t.end) {
        n();
        return;
      }
      const p = t.tasks[h++];
      if (p.kind === tm.OperationKind.COPY)
        (0, em.copyData)(p, r, t.oldFileFd, i, () => f(h));
      else {
        const y = e.createRequestOptions();
        y.headers.Range = `bytes=${p.start}-${p.end - 1}`;
        const $ = e.httpExecutor.createRequest(y, (v) => {
          iu(v, i) && (v.pipe(r, {
            end: !1
          }), v.once("end", () => f(h)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers($, i), $.end();
      }
    };
    f(t.start);
    return;
  }
  const u = e.createRequestOptions();
  u.headers.Range = s.substring(0, s.length - 2);
  const l = e.httpExecutor.createRequest(u, (f) => {
    if (!iu(f, i))
      return;
    const h = (0, nu.safeGetHeader)(f, "content-type"), p = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(h);
    if (p == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${h}"`));
      return;
    }
    const y = new em.DataSplitter(r, t, a, p[1] || p[2], c, n);
    y.on("error", i), f.pipe(y), f.on("end", () => {
      setTimeout(() => {
        l.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(l, i), l.end();
}
function iu(e, t) {
  if (e.statusCode >= 400)
    return t((0, nu.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const r = (0, nu.safeGetHeader)(e, "accept-ranges");
    if (r == null || r === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var bc = {};
Object.defineProperty(bc, "__esModule", { value: !0 });
bc.ProgressDifferentialDownloadCallbackTransform = void 0;
const _R = uo;
var Ai;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Ai || (Ai = {}));
class wR extends _R.Transform {
  constructor(t, r, n) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = Ai.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == Ai.COPY) {
      n(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  beginFileCopy() {
    this.operationType = Ai.COPY;
  }
  beginRangeDownload() {
    this.operationType = Ai.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
bc.ProgressDifferentialDownloadCallbackTransform = wR;
Object.defineProperty(So, "__esModule", { value: !0 });
So.DifferentialDownloader = void 0;
const ms = Je, vl = _n, ER = vn, SR = Ji, bR = zi, Zo = ni, rm = Sc, PR = bc;
class TR {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, r, n) {
    this.blockAwareFileInfo = t, this.httpExecutor = r, this.options = n, this.fileMetadataBuffer = null, this.logger = n.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, ms.configureRequestUrl)(this.options.newUrl, t), (0, ms.configureRequestOptions)(t), t;
  }
  doDownload(t, r) {
    if (t.version !== r.version)
      throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
    const n = this.logger, i = (0, Zo.computeOperations)(t, r, n);
    n.debug != null && n.debug(JSON.stringify(i, null, 2));
    let s = 0, o = 0;
    for (const c of i) {
      const u = c.end - c.start;
      c.kind === Zo.OperationKind.DOWNLOAD ? s += u : o += u;
    }
    const a = this.blockAwareFileInfo.size;
    if (s + o + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== a)
      throw new Error(`Internal error, size mismatch: downloadSize: ${s}, copySize: ${o}, newSize: ${a}`);
    return n.info(`Full: ${nm(a)}, To download: ${nm(s)} (${Math.round(s / (a / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, vl.close)(i.descriptor).catch((s) => {
      this.logger.error(`cannot close file "${i.path}": ${s}`);
    })));
    return this.doDownloadFile(t, r).then(n).catch((i) => n().catch((s) => {
      try {
        this.logger.error(`cannot close files: ${s}`);
      } catch (o) {
        try {
          console.error(o);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, r) {
    const n = await (0, vl.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, vl.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const s = (0, ER.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((o, a) => {
      const c = [];
      let u;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const m = [];
        let w = 0;
        for (const I of t)
          I.kind === Zo.OperationKind.DOWNLOAD && (m.push(I.end - I.start), w += I.end - I.start);
        const T = {
          expectedByteCounts: m,
          grandTotal: w
        };
        u = new PR.ProgressDifferentialDownloadCallbackTransform(T, this.options.cancellationToken, this.options.onProgress), c.push(u);
      }
      const l = new ms.DigestTransform(this.blockAwareFileInfo.sha512);
      l.isValidateOnEnd = !1, c.push(l), s.on("finish", () => {
        s.close(() => {
          r.splice(1, 1);
          try {
            l.validate();
          } catch (m) {
            a(m);
            return;
          }
          o(void 0);
        });
      }), c.push(s);
      let f = null;
      for (const m of c)
        m.on("error", a), f == null ? f = m : f = f.pipe(m);
      const h = c[0];
      let p;
      if (this.options.isUseMultipleRangeRequest) {
        p = (0, rm.executeTasksUsingMultipleRangeRequests)(this, t, h, n, a), p(0);
        return;
      }
      let y = 0, $ = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const v = this.createRequestOptions();
      v.redirect = "manual", p = (m) => {
        var w, T;
        if (m >= t.length) {
          this.fileMetadataBuffer != null && h.write(this.fileMetadataBuffer), h.end();
          return;
        }
        const I = t[m++];
        if (I.kind === Zo.OperationKind.COPY) {
          u && u.beginFileCopy(), (0, SR.copyData)(I, h, n, a, () => p(m));
          return;
        }
        const F = `bytes=${I.start}-${I.end - 1}`;
        v.headers.range = F, (T = (w = this.logger) === null || w === void 0 ? void 0 : w.debug) === null || T === void 0 || T.call(w, `download range: ${F}`), u && u.beginRangeDownload();
        const H = this.httpExecutor.createRequest(v, (z) => {
          z.on("error", a), z.on("aborted", () => {
            a(new Error("response has been aborted by the server"));
          }), z.statusCode >= 400 && a((0, ms.createHttpError)(z)), z.pipe(h, {
            end: !1
          }), z.once("end", () => {
            u && u.endRangeDownload(), ++y === 100 ? (y = 0, setTimeout(() => p(m), 1e3)) : p(m);
          });
        });
        H.on("redirect", (z, ue, R) => {
          this.logger.info(`Redirect to ${AR(R)}`), $ = R, (0, ms.configureRequestUrl)(new bR.URL($), v), H.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(H, a), H.end();
      }, p(0);
    });
  }
  async readRemoteBytes(t, r) {
    const n = Buffer.allocUnsafe(r + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${r}`;
    let s = 0;
    if (await this.request(i, (o) => {
      o.copy(n, s), s += o.length;
    }), s !== n.length)
      throw new Error(`Received data length ${s} is not equal to expected ${n.length}`);
    return n;
  }
  request(t, r) {
    return new Promise((n, i) => {
      const s = this.httpExecutor.createRequest(t, (o) => {
        (0, rm.checkIsRangesSupported)(o, i) && (o.on("error", i), o.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), o.on("data", r), o.on("end", () => n()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(s, i), s.end();
    });
  }
}
So.DifferentialDownloader = TR;
function nm(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function AR(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(Ec, "__esModule", { value: !0 });
Ec.GenericDifferentialDownloader = void 0;
const NR = So;
class OR extends NR.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
Ec.GenericDifferentialDownloader = OR;
var wn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = n;
  const t = Je;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
  class r {
    constructor(s) {
      this.emitter = s;
    }
    /**
     * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
     */
    login(s) {
      n(this.emitter, "login", s);
    }
    progress(s) {
      n(this.emitter, e.DOWNLOAD_PROGRESS, s);
    }
    updateDownloaded(s) {
      n(this.emitter, e.UPDATE_DOWNLOADED, s);
    }
    updateCancelled(s) {
      n(this.emitter, "update-cancelled", s);
    }
  }
  e.UpdaterSignal = r;
  function n(i, s, o) {
    i.on(s, o);
  }
})(wn);
Object.defineProperty(pn, "__esModule", { value: !0 });
pn.NoOpLogger = pn.AppUpdater = void 0;
const mt = Je, RR = ho, IR = ec, CR = zy, fi = _n, kR = nt, _l = fc, Cn = ge, Un = Zu, im = wo, DR = gc, sm = G0, FR = Eo, wl = $c, jR = Wy, LR = Wt, UR = Ec, di = wn;
class tf extends CR.EventEmitter {
  /**
   * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
   */
  get channel() {
    return this._channel;
  }
  /**
   * Set the update channel. Overrides `channel` in the update configuration.
   *
   * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
   */
  set channel(t) {
    if (this._channel != null) {
      if (typeof t != "string")
        throw (0, mt.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (t.length === 0)
        throw (0, mt.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
    }
    this._channel = t, this.allowDowngrade = !0;
  }
  /**
   *  Shortcut for explicitly adding auth tokens to request headers
   */
  addAuthHeader(t) {
    this.requestHeaders = Object.assign({}, this.requestHeaders, {
      authorization: t
    });
  }
  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  get netSession() {
    return (0, sm.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new Z0();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new _l.Lazy(() => this.loadUpdateConfig());
  }
  /**
   * Allows developer to override default logic for determining if an update is supported.
   * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
   */
  get isUpdateSupported() {
    return this._isUpdateSupported;
  }
  set isUpdateSupported(t) {
    t && (this._isUpdateSupported = t);
  }
  constructor(t, r) {
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new di.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (s) => this.checkIfUpdateSupported(s), this.clientPromise = null, this.stagingUserIdPromise = new _l.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new _l.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (s) => {
      this._logger.error(`Error: ${s.stack || s.message}`);
    }), r == null ? (this.app = new DR.ElectronAppAdapter(), this.httpExecutor = new sm.ElectronHttpExecutor((s, o) => this.emit("login", s, o))) : (this.app = r, this.httpExecutor = null);
    const n = this.app.version, i = (0, Un.parse)(n);
    if (i == null)
      throw (0, mt.newError)(`App version is not a valid semver version: "${n}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = MR(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
  }
  //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  getFeedURL() {
    return "Deprecated. Do not use it.";
  }
  /**
   * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
   * @param options If you want to override configuration in the `app-update.yml`.
   */
  setFeedURL(t) {
    const r = this.createProviderRuntimeOptions();
    let n;
    typeof t == "string" ? n = new FR.GenericProvider({ provider: "generic", url: t }, this, {
      ...r,
      isUseMultipleRangeRequest: (0, wl.isUrlProbablySupportMultiRangeRequests)(t)
    }) : n = (0, wl.createClient)(t, this, r), this.clientPromise = Promise.resolve(n);
  }
  /**
   * Asks the server whether there is an update.
   * @returns null if the updater is disabled, otherwise info about the latest version
   */
  checkForUpdates() {
    if (!this.isUpdaterActive())
      return Promise.resolve(null);
    let t = this.checkForUpdatesPromise;
    if (t != null)
      return this._logger.info("Checking for update (already in progress)"), t;
    const r = () => this.checkForUpdatesPromise = null;
    return this._logger.info("Checking for update"), t = this.doCheckForUpdates().then((n) => (r(), n)).catch((n) => {
      throw r(), this.emit("error", n, `Cannot check for updates: ${(n.stack || n).toString()}`), n;
    }), this.checkForUpdatesPromise = t, t;
  }
  isUpdaterActive() {
    return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
  }
  // noinspection JSUnusedGlobalSymbols
  checkForUpdatesAndNotify(t) {
    return this.checkForUpdates().then((r) => r != null && r.downloadPromise ? (r.downloadPromise.then(() => {
      const n = tf.formatDownloadNotification(r.updateInfo.version, this.app.name, t);
      new jr.Notification(n).show();
    }), r) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), r));
  }
  static formatDownloadNotification(t, r, n) {
    return n == null && (n = {
      title: "A new update is ready to install",
      body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
    }), n = {
      title: n.title.replace("{appName}", r).replace("{version}", t),
      body: n.body.replace("{appName}", r).replace("{version}", t)
    }, n;
  }
  async isStagingMatch(t) {
    const r = t.stagingPercentage;
    let n = r;
    if (n == null)
      return !0;
    if (n = parseInt(n, 10), isNaN(n))
      return this._logger.warn(`Staging percentage is NaN: ${r}`), !0;
    n = n / 100;
    const i = await this.stagingUserIdPromise.value, o = mt.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${n}, percentage: ${o}, user id: ${i}`), o < n;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const r = (0, Un.parse)(t.version);
    if (r == null)
      throw (0, mt.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const n = this.currentVersion;
    if ((0, Un.eq)(r, n) || !await Promise.resolve(this.isUpdateSupported(t)) || !await this.isStagingMatch(t))
      return !1;
    const s = (0, Un.gt)(r, n), o = (0, Un.lt)(r, n);
    return s ? !0 : this.allowDowngrade && o;
  }
  checkIfUpdateSupported(t) {
    const r = t == null ? void 0 : t.minimumSystemVersion, n = (0, IR.release)();
    if (r)
      try {
        if ((0, Un.lt)(n, r))
          return this._logger.info(`Current OS version ${n} is less than the minimum OS version required ${r} for version ${n}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${n}) with minimum OS version(${r}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((n) => (0, wl.createClient)(n, this, this.createProviderRuntimeOptions())));
    const t = await this.clientPromise, r = await this.stagingUserIdPromise.value;
    return t.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": r })), {
      info: await t.getLatestVersion(),
      provider: t
    };
  }
  createProviderRuntimeOptions() {
    return {
      isUseMultipleRangeRequest: !0,
      platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
      executor: this.httpExecutor
    };
  }
  async doCheckForUpdates() {
    this.emit("checking-for-update");
    const t = await this.getUpdateInfoAndProvider(), r = t.info;
    if (!await this.isUpdateAvailable(r))
      return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${r.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", r), {
        isUpdateAvailable: !1,
        versionInfo: r,
        updateInfo: r
      };
    this.updateInfoAndProvider = t, this.onUpdateAvailable(r);
    const n = new mt.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: r,
      updateInfo: r,
      cancellationToken: n,
      downloadPromise: this.autoDownload ? this.downloadUpdate(n) : null
    };
  }
  onUpdateAvailable(t) {
    this._logger.info(`Found version ${t.version} (url: ${(0, mt.asArray)(t.files).map((r) => r.url).join(", ")})`), this.emit("update-available", t);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(t = new mt.CancellationToken()) {
    const r = this.updateInfoAndProvider;
    if (r == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
    this._logger.info(`Downloading update from ${(0, mt.asArray)(r.info.files).map((i) => i.url).join(", ")}`);
    const n = (i) => {
      if (!(i instanceof mt.CancellationError))
        try {
          this.dispatchError(i);
        } catch (s) {
          this._logger.warn(`Cannot dispatch error event: ${s.stack || s}`);
        }
      return i;
    };
    return this.downloadPromise = this.doDownloadUpdate({
      updateInfoAndProvider: r,
      requestHeaders: this.computeRequestHeaders(r.provider),
      cancellationToken: t,
      disableWebInstaller: this.disableWebInstaller,
      disableDifferentialDownload: this.disableDifferentialDownload
    }).catch((i) => {
      throw n(i);
    }).finally(() => {
      this.downloadPromise = null;
    }), this.downloadPromise;
  }
  dispatchError(t) {
    this.emit("error", t, (t.stack || t).toString());
  }
  dispatchUpdateDownloaded(t) {
    this.emit(di.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, kR.load)(await (0, fi.readFile)(this._appUpdateConfigPath, "utf-8"));
  }
  computeRequestHeaders(t) {
    const r = t.fileExtraDownloadHeaders;
    if (r != null) {
      const n = this.requestHeaders;
      return n == null ? r : {
        ...r,
        ...n
      };
    }
    return this.computeFinalHeaders({ accept: "*/*" });
  }
  async getOrCreateStagingUserId() {
    const t = Cn.join(this.app.userDataPath, ".updaterId");
    try {
      const n = await (0, fi.readFile)(t, "utf-8");
      if (mt.UUID.check(n))
        return n;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${n}`);
    } catch (n) {
      n.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${n}`);
    }
    const r = mt.UUID.v5((0, RR.randomBytes)(4096), mt.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${r}`);
    try {
      await (0, fi.outputFile)(t, r);
    } catch (n) {
      this._logger.warn(`Couldn't write out staging user ID: ${n}`);
    }
    return r;
  }
  /** @internal */
  get isAddNoCacheQuery() {
    const t = this.requestHeaders;
    if (t == null)
      return !0;
    for (const r of Object.keys(t)) {
      const n = r.toLowerCase();
      if (n === "authorization" || n === "private-token")
        return !1;
    }
    return !0;
  }
  async getOrCreateDownloadHelper() {
    let t = this.downloadedUpdateHelper;
    if (t == null) {
      const r = (await this.configOnDisk.value).updaterCacheDirName, n = this._logger;
      r == null && n.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
      const i = Cn.join(this.app.baseCachePath, r || this.app.name);
      n.debug != null && n.debug(`updater cache dir: ${i}`), t = new im.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
    }
    return t;
  }
  async executeDownload(t) {
    const r = t.fileInfo, n = {
      headers: t.downloadUpdateOptions.requestHeaders,
      cancellationToken: t.downloadUpdateOptions.cancellationToken,
      sha2: r.info.sha2,
      sha512: r.info.sha512
    };
    this.listenerCount(di.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = (w) => this.emit(di.DOWNLOAD_PROGRESS, w));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, s = i.version, o = r.packageInfo;
    function a() {
      const w = decodeURIComponent(t.fileInfo.url.pathname);
      return w.endsWith(`.${t.fileExtension}`) ? Cn.basename(w) : t.fileInfo.info.url;
    }
    const c = await this.getOrCreateDownloadHelper(), u = c.cacheDirForPendingUpdate;
    await (0, fi.mkdir)(u, { recursive: !0 });
    const l = a();
    let f = Cn.join(u, l);
    const h = o == null ? null : Cn.join(u, `package-${s}${Cn.extname(o.path) || ".7z"}`), p = async (w) => (await c.setDownloadedFile(f, h, i, r, l, w), await t.done({
      ...i,
      downloadedFile: f
    }), h == null ? [f] : [f, h]), y = this._logger, $ = await c.validateDownloadedPath(f, i, r, y);
    if ($ != null)
      return f = $, await p(!1);
    const v = async () => (await c.clear().catch(() => {
    }), await (0, fi.unlink)(f).catch(() => {
    })), m = await (0, im.createTempUpdateFile)(`temp-${l}`, u, y);
    try {
      await t.task(m, n, h, v), await (0, mt.retry)(() => (0, fi.rename)(m, f), 60, 500, 0, 0, (w) => w instanceof Error && /^EBUSY:/.test(w.message));
    } catch (w) {
      throw await v(), w instanceof mt.CancellationError && (y.info("cancelled"), this.emit("update-cancelled", i)), w;
    }
    return y.info(`New version ${s} has been downloaded to ${f}`), await p(!0);
  }
  async differentialDownloadInstaller(t, r, n, i, s) {
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const o = (0, LR.blockmapFiles)(t.url, this.app.version, r.updateInfoAndProvider.info.version);
      this._logger.info(`Download block maps (old: "${o[0]}", new: ${o[1]})`);
      const a = async (l) => {
        const f = await this.httpExecutor.downloadToBuffer(l, {
          headers: r.requestHeaders,
          cancellationToken: r.cancellationToken
        });
        if (f == null || f.length === 0)
          throw new Error(`Blockmap "${l.href}" is empty`);
        try {
          return JSON.parse((0, jR.gunzipSync)(f).toString());
        } catch (h) {
          throw new Error(`Cannot parse blockmap "${l.href}", error: ${h}`);
        }
      }, c = {
        newUrl: t.url,
        oldFile: Cn.join(this.downloadedUpdateHelper.cacheDir, s),
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: r.requestHeaders,
        cancellationToken: r.cancellationToken
      };
      this.listenerCount(di.DOWNLOAD_PROGRESS) > 0 && (c.onProgress = (l) => this.emit(di.DOWNLOAD_PROGRESS, l));
      const u = await Promise.all(o.map((l) => a(l)));
      return await new UR.GenericDifferentialDownloader(t.info, this.httpExecutor, c).download(u[0], u[1]), !1;
    } catch (o) {
      if (this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), this._testOnlyOptions != null)
        throw o;
      return !0;
    }
  }
}
pn.AppUpdater = tf;
function MR(e) {
  const t = (0, Un.prerelease)(e);
  return t != null && t.length > 0;
}
class Z0 {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(t) {
  }
}
pn.NoOpLogger = Z0;
Object.defineProperty(xr, "__esModule", { value: !0 });
xr.BaseUpdater = void 0;
const om = fo, xR = pn;
class qR extends xR.AppUpdater {
  constructor(t, r) {
    super(t, r), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, r = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? r : this.autoRunAppAfterInstall) ? setImmediate(() => {
      jr.autoUpdater.emit("before-quit-for-update"), this.app.quit();
    }) : this.quitAndInstallCalled = !1;
  }
  executeDownload(t) {
    return super.executeDownload({
      ...t,
      done: (r) => (this.dispatchUpdateDownloaded(r), this.addQuitHandler(), Promise.resolve())
    });
  }
  get installerPath() {
    return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
  }
  // must be sync (because quit even handler is not async)
  install(t = !1, r = !1) {
    if (this.quitAndInstallCalled)
      return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
    const n = this.downloadedUpdateHelper, i = this.installerPath, s = n == null ? null : n.downloadedFileInfo;
    if (i == null || s == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    this.quitAndInstallCalled = !0;
    try {
      return this._logger.info(`Install: isSilent: ${t}, isForceRunAfter: ${r}`), this.doInstall({
        isSilent: t,
        isForceRunAfter: r,
        isAdminRightsRequired: s.isAdminRightsRequired
      });
    } catch (o) {
      return this.dispatchError(o), !1;
    }
  }
  addQuitHandler() {
    this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((t) => {
      if (this.quitAndInstallCalled) {
        this._logger.info("Update installer has already been triggered. Quitting application.");
        return;
      }
      if (!this.autoInstallOnAppQuit) {
        this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
        return;
      }
      if (t !== 0) {
        this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${t}`);
        return;
      }
      this._logger.info("Auto install update on quit"), this.install(!0, !1);
    }));
  }
  wrapSudo() {
    const { name: t } = this.app, r = `"${t} would like to update"`, n = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), i = [n];
    return /kdesudo/i.test(n) ? (i.push("--comment", r), i.push("-c")) : /gksudo/i.test(n) ? i.push("--message", r) : /pkexec/i.test(n) && i.push("--disable-internal-agent"), i.join(" ");
  }
  spawnSyncLog(t, r = [], n = {}) {
    this._logger.info(`Executing: ${t} with args: ${r}`);
    const i = (0, om.spawnSync)(t, r, {
      env: { ...process.env, ...n },
      encoding: "utf-8",
      shell: !0
    }), { error: s, status: o, stdout: a, stderr: c } = i;
    if (s != null)
      throw this._logger.error(c), s;
    if (o != null && o !== 0)
      throw this._logger.error(c), new Error(`Command ${t} exited with code ${o}`);
    return a.trim();
  }
  /**
   * This handles both node 8 and node 10 way of emitting error when spawning a process
   *   - node 8: Throws the error
   *   - node 10: Emit the error(Need to listen with on)
   */
  // https://github.com/electron-userland/electron-builder/issues/1129
  // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
  async spawnLog(t, r = [], n = void 0, i = "ignore") {
    return this._logger.info(`Executing: ${t} with args: ${r}`), new Promise((s, o) => {
      try {
        const a = { stdio: i, env: n, detached: !0 }, c = (0, om.spawn)(t, r, a);
        c.on("error", (u) => {
          o(u);
        }), c.unref(), c.pid !== void 0 && s(!0);
      } catch (a) {
        o(a);
      }
    });
  }
}
xr.BaseUpdater = qR;
var Xs = {}, bo = {};
Object.defineProperty(bo, "__esModule", { value: !0 });
bo.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const hi = _n, BR = So, VR = Wy;
class HR extends BR.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = e$(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await GR(this.options.oldFile), i);
  }
}
bo.FileWithEmbeddedBlockMapDifferentialDownloader = HR;
function e$(e) {
  return JSON.parse((0, VR.inflateRawSync)(e).toString());
}
async function GR(e) {
  const t = await (0, hi.open)(e, "r");
  try {
    const r = (await (0, hi.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, hi.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, hi.read)(t, i, 0, i.length, r - n.length - i.length), await (0, hi.close)(t), e$(i);
  } catch (r) {
    throw await (0, hi.close)(t), r;
  }
}
Object.defineProperty(Xs, "__esModule", { value: !0 });
Xs.AppImageUpdater = void 0;
const am = Je, cm = fo, zR = _n, KR = vn, ys = ge, WR = xr, YR = bo, JR = ze, lm = wn;
class XR extends WR.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, JR.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, s) => {
        const o = process.env.APPIMAGE;
        if (o == null)
          throw (0, am.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(n, o, i, r, t)) && await this.httpExecutor.download(n.url, i, s), await (0, zR.chmod)(i, 493);
      }
    });
  }
  async downloadDifferential(t, r, n, i, s) {
    try {
      const o = {
        newUrl: t.url,
        oldFile: r,
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: s.requestHeaders,
        cancellationToken: s.cancellationToken
      };
      return this.listenerCount(lm.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(lm.DOWNLOAD_PROGRESS, a)), await new YR.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, o).download(), !1;
    } catch (o) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const r = process.env.APPIMAGE;
    if (r == null)
      throw (0, am.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, KR.unlinkSync)(r);
    let n;
    const i = ys.basename(r), s = this.installerPath;
    if (s == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    ys.basename(s) === i || !/\d+\.\d+\.\d+/.test(i) ? n = r : n = ys.join(ys.dirname(r), ys.basename(s)), (0, cm.execFileSync)("mv", ["-f", s, n]), n !== r && this.emit("appimage-filename-updated", n);
    const o = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(n, [], o) : (o.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, cm.execFileSync)(n, [], { env: o })), !0;
  }
}
Xs.AppImageUpdater = XR;
var Qs = {};
Object.defineProperty(Qs, "__esModule", { value: !0 });
Qs.DebUpdater = void 0;
const QR = xr, ZR = ze, um = wn;
class eI extends QR.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, ZR.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, s) => {
        this.listenerCount(um.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (o) => this.emit(um.DOWNLOAD_PROGRESS, o)), await this.httpExecutor.download(n.url, i, s);
      }
    });
  }
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  doInstall(t) {
    const r = this.wrapSudo(), n = /pkexec/i.test(r) ? "" : '"', i = this.installerPath;
    if (i == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const s = ["dpkg", "-i", i, "||", "apt-get", "install", "-f", "-y"];
    return this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${s.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
Qs.DebUpdater = eI;
var Zs = {};
Object.defineProperty(Zs, "__esModule", { value: !0 });
Zs.PacmanUpdater = void 0;
const tI = xr, fm = wn, rI = ze;
class nI extends tI.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, rI.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, s) => {
        this.listenerCount(fm.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (o) => this.emit(fm.DOWNLOAD_PROGRESS, o)), await this.httpExecutor.download(n.url, i, s);
      }
    });
  }
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  doInstall(t) {
    const r = this.wrapSudo(), n = /pkexec/i.test(r) ? "" : '"', i = this.installerPath;
    if (i == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const s = ["pacman", "-U", "--noconfirm", i];
    return this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${s.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
Zs.PacmanUpdater = nI;
var eo = {};
Object.defineProperty(eo, "__esModule", { value: !0 });
eo.RpmUpdater = void 0;
const iI = xr, dm = wn, sI = ze;
class oI extends iI.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, sI.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, s) => {
        this.listenerCount(dm.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (o) => this.emit(dm.DOWNLOAD_PROGRESS, o)), await this.httpExecutor.download(n.url, i, s);
      }
    });
  }
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  doInstall(t) {
    const r = this.wrapSudo(), n = /pkexec/i.test(r) ? "" : '"', i = this.spawnSyncLog("which zypper"), s = this.installerPath;
    if (s == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    let o;
    return i ? o = [i, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", s] : o = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", s], this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${o.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
eo.RpmUpdater = oI;
var to = {};
Object.defineProperty(to, "__esModule", { value: !0 });
to.MacUpdater = void 0;
const hm = Je, El = _n, aI = vn, pm = ge, cI = Jw, lI = pn, uI = ze, mm = fo, ym = ho;
class fI extends lI.AppUpdater {
  constructor(t, r) {
    super(t, r), this.nativeUpdater = jr.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (n) => {
      this._logger.warn(n), this.emit("error", n);
    }), this.nativeUpdater.on("update-downloaded", () => {
      this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
    });
  }
  debug(t) {
    this._logger.debug != null && this._logger.debug(t);
  }
  closeServerIfExists() {
    this.server && (this.debug("Closing proxy server"), this.server.close((t) => {
      t && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
    }));
  }
  async doDownloadUpdate(t) {
    let r = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info);
    const n = this._logger, i = "sysctl.proc_translated";
    let s = !1;
    try {
      this.debug("Checking for macOS Rosetta environment"), s = (0, mm.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), n.info(`Checked for macOS Rosetta environment (isRosetta=${s})`);
    } catch (f) {
      n.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${f}`);
    }
    let o = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const h = (0, mm.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      n.info(`Checked 'uname -a': arm64=${h}`), o = o || h;
    } catch (f) {
      n.warn(`uname shell command to check for arm64 failed: ${f}`);
    }
    o = o || process.arch === "arm64" || s;
    const a = (f) => {
      var h;
      return f.url.pathname.includes("arm64") || ((h = f.info.url) === null || h === void 0 ? void 0 : h.includes("arm64"));
    };
    o && r.some(a) ? r = r.filter((f) => o === a(f)) : r = r.filter((f) => !a(f));
    const c = (0, uI.findFile)(r, "zip", ["pkg", "dmg"]);
    if (c == null)
      throw (0, hm.newError)(`ZIP file not provided: ${(0, hm.safeStringifyJson)(r)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const u = t.updateInfoAndProvider.provider, l = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: c,
      downloadUpdateOptions: t,
      task: async (f, h) => {
        const p = pm.join(this.downloadedUpdateHelper.cacheDir, l), y = () => (0, El.pathExistsSync)(p) ? !t.disableDifferentialDownload : (n.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let $ = !0;
        y() && ($ = await this.differentialDownloadInstaller(c, t, f, u, l)), $ && await this.httpExecutor.download(c.url, f, h);
      },
      done: async (f) => {
        if (!t.disableDifferentialDownload)
          try {
            const h = pm.join(this.downloadedUpdateHelper.cacheDir, l);
            await (0, El.copyFile)(f.downloadedFile, h);
          } catch (h) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${h.message}`);
          }
        return this.updateDownloaded(c, f);
      }
    });
  }
  async updateDownloaded(t, r) {
    var n;
    const i = r.downloadedFile, s = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, El.stat)(i)).size, o = this._logger, a = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${a})`), this.server = (0, cI.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${a})`), this.server.on("close", () => {
      o.info(`Proxy server for native Squirrel.Mac is closed (${a})`);
    });
    const c = (u) => {
      const l = u.address();
      return typeof l == "string" ? l : `http://127.0.0.1:${l == null ? void 0 : l.port}`;
    };
    return await new Promise((u, l) => {
      const f = (0, ym.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), h = Buffer.from(`autoupdater:${f}`, "ascii"), p = `/${(0, ym.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (y, $) => {
        const v = y.url;
        if (o.info(`${v} requested`), v === "/") {
          if (!y.headers.authorization || y.headers.authorization.indexOf("Basic ") === -1) {
            $.statusCode = 401, $.statusMessage = "Invalid Authentication Credentials", $.end(), o.warn("No authenthication info");
            return;
          }
          const T = y.headers.authorization.split(" ")[1], I = Buffer.from(T, "base64").toString("ascii"), [F, H] = I.split(":");
          if (F !== "autoupdater" || H !== f) {
            $.statusCode = 401, $.statusMessage = "Invalid Authentication Credentials", $.end(), o.warn("Invalid authenthication credentials");
            return;
          }
          const z = Buffer.from(`{ "url": "${c(this.server)}${p}" }`);
          $.writeHead(200, { "Content-Type": "application/json", "Content-Length": z.length }), $.end(z);
          return;
        }
        if (!v.startsWith(p)) {
          o.warn(`${v} requested, but not supported`), $.writeHead(404), $.end();
          return;
        }
        o.info(`${p} requested by Squirrel.Mac, pipe ${i}`);
        let m = !1;
        $.on("finish", () => {
          m || (this.nativeUpdater.removeListener("error", l), u([]));
        });
        const w = (0, aI.createReadStream)(i);
        w.on("error", (T) => {
          try {
            $.end();
          } catch (I) {
            o.warn(`cannot end response: ${I}`);
          }
          m = !0, this.nativeUpdater.removeListener("error", l), l(new Error(`Cannot pipe "${i}": ${T}`));
        }), $.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": s
        }), w.pipe($);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${a})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${c(this.server)}, ${a})`), this.nativeUpdater.setFeedURL({
          url: c(this.server),
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Basic ${h.toString("base64")}`
          }
        }), this.dispatchUpdateDownloaded(r), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", l), this.nativeUpdater.checkForUpdates()) : u([]);
      });
    });
  }
  handleUpdateDownloaded() {
    this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
  }
  quitAndInstall() {
    this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
  }
}
to.MacUpdater = fI;
var ro = {}, rf = {};
Object.defineProperty(rf, "__esModule", { value: !0 });
rf.verifySignature = hI;
const gm = Je, t$ = fo, dI = ec, $m = ge;
function hI(e, t, r) {
  return new Promise((n, i) => {
    const s = t.replace(/'/g, "''");
    r.info(`Verifying signature ${s}`), (0, t$.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${s}' | ConvertTo-Json -Compress"`], {
      shell: !0,
      timeout: 20 * 1e3
    }, (o, a, c) => {
      var u;
      try {
        if (o != null || c) {
          Sl(r, o, c, i), n(null);
          return;
        }
        const l = pI(a);
        if (l.Status === 0) {
          try {
            const y = $m.normalize(l.Path), $ = $m.normalize(t);
            if (r.info(`LiteralPath: ${y}. Update Path: ${$}`), y !== $) {
              Sl(r, new Error(`LiteralPath of ${y} is different than ${$}`), c, i), n(null);
              return;
            }
          } catch (y) {
            r.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(u = y.message) !== null && u !== void 0 ? u : y.stack}`);
          }
          const h = (0, gm.parseDn)(l.SignerCertificate.Subject);
          let p = !1;
          for (const y of e) {
            const $ = (0, gm.parseDn)(y);
            if ($.size ? p = Array.from($.keys()).every((m) => $.get(m) === h.get(m)) : y === h.get("CN") && (r.warn(`Signature validated using only CN ${y}. Please add your full Distinguished Name (DN) to publisherNames configuration`), p = !0), p) {
              n(null);
              return;
            }
          }
        }
        const f = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(l, (h, p) => h === "RawData" ? void 0 : p, 2);
        r.warn(`Sign verification failed, installer signed with incorrect certificate: ${f}`), n(f);
      } catch (l) {
        Sl(r, l, null, i), n(null);
        return;
      }
    });
  });
}
function pI(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const r = t.SignerCertificate;
  return r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName), t;
}
function Sl(e, t, r, n) {
  if (mI()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, t$.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && n(t), r && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
}
function mI() {
  const e = dI.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty(ro, "__esModule", { value: !0 });
ro.NsisUpdater = void 0;
const ea = Je, vm = ge, yI = xr, gI = bo, _m = wn, $I = ze, vI = _n, _I = rf, wm = zi;
class wI extends yI.BaseUpdater {
  constructor(t, r) {
    super(t, r), this._verifyUpdateCodeSignature = (n, i) => (0, _I.verifySignature)(n, i, this._logger);
  }
  /**
   * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
   * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
   */
  get verifyUpdateCodeSignature() {
    return this._verifyUpdateCodeSignature;
  }
  set verifyUpdateCodeSignature(t) {
    t && (this._verifyUpdateCodeSignature = t);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, $I.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: n,
      task: async (i, s, o, a) => {
        const c = n.packageInfo, u = c != null && o != null;
        if (u && t.disableWebInstaller)
          throw (0, ea.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !u && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (u || t.disableDifferentialDownload || await this.differentialDownloadInstaller(n, t, i, r, ea.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(n.url, i, s);
        const l = await this.verifySignature(i);
        if (l != null)
          throw await a(), (0, ea.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${l}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (u && await this.differentialDownloadWebPackage(t, c, o, r))
          try {
            await this.httpExecutor.download(new wm.URL(c.path), o, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: c.sha512
            });
          } catch (f) {
            try {
              await (0, vI.unlink)(o);
            } catch {
            }
            throw f;
          }
      }
    });
  }
  // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
  // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
  // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
  async verifySignature(t) {
    let r;
    try {
      if (r = (await this.configOnDisk.value).publisherName, r == null)
        return null;
    } catch (n) {
      if (n.code === "ENOENT")
        return null;
      throw n;
    }
    return await this._verifyUpdateCodeSignature(Array.isArray(r) ? r : [r], t);
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    const n = ["--updated"];
    t.isSilent && n.push("/S"), t.isForceRunAfter && n.push("--force-run"), this.installDirectory && n.push(`/D=${this.installDirectory}`);
    const i = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
    i != null && n.push(`--package-file=${i}`);
    const s = () => {
      this.spawnLog(vm.join(process.resourcesPath, "elevate.exe"), [r].concat(n)).catch((o) => this.dispatchError(o));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), s(), !0) : (this.spawnLog(r, n).catch((o) => {
      const a = o.code;
      this._logger.info(`Cannot run installer: error code: ${a}, error message: "${o.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), a === "UNKNOWN" || a === "EACCES" ? s() : a === "ENOENT" ? jr.shell.openPath(r).catch((c) => this.dispatchError(c)) : this.dispatchError(o);
    }), !0);
  }
  async differentialDownloadWebPackage(t, r, n, i) {
    if (r.blockMapSize == null)
      return !0;
    try {
      const s = {
        newUrl: new wm.URL(r.path),
        oldFile: vm.join(this.downloadedUpdateHelper.cacheDir, ea.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: n,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(_m.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (o) => this.emit(_m.DOWNLOAD_PROGRESS, o)), await new gI.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, s).download();
    } catch (s) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), process.platform === "win32";
    }
    return !1;
  }
}
ro.NsisUpdater = wI;
(function(e) {
  var t = vt && vt.__createBinding || (Object.create ? function(v, m, w, T) {
    T === void 0 && (T = w);
    var I = Object.getOwnPropertyDescriptor(m, w);
    (!I || ("get" in I ? !m.__esModule : I.writable || I.configurable)) && (I = { enumerable: !0, get: function() {
      return m[w];
    } }), Object.defineProperty(v, T, I);
  } : function(v, m, w, T) {
    T === void 0 && (T = w), v[T] = m[w];
  }), r = vt && vt.__exportStar || function(v, m) {
    for (var w in v) w !== "default" && !Object.prototype.hasOwnProperty.call(m, w) && t(m, v, w);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const n = _n, i = ge;
  var s = xr;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return s.BaseUpdater;
  } });
  var o = pn;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return o.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return o.NoOpLogger;
  } });
  var a = ze;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return a.Provider;
  } });
  var c = Xs;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return c.AppImageUpdater;
  } });
  var u = Qs;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return u.DebUpdater;
  } });
  var l = Zs;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return l.PacmanUpdater;
  } });
  var f = eo;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return f.RpmUpdater;
  } });
  var h = to;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return h.MacUpdater;
  } });
  var p = ro;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return p.NsisUpdater;
  } }), r(wn, e);
  let y;
  function $() {
    if (process.platform === "win32")
      y = new ro.NsisUpdater();
    else if (process.platform === "darwin")
      y = new to.MacUpdater();
    else {
      y = new Xs.AppImageUpdater();
      try {
        const v = i.join(process.resourcesPath, "package-type");
        if (!(0, n.existsSync)(v))
          return y;
        console.info("Checking for beta autoupdate feature for deb/rpm distributions");
        const m = (0, n.readFileSync)(v).toString().trim();
        switch (console.info("Found package-type:", m), m) {
          case "deb":
            y = new Qs.DebUpdater();
            break;
          case "rpm":
            y = new eo.RpmUpdater();
            break;
          case "pacman":
            y = new Zs.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (v) {
        console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", v.message);
      }
    }
    return y;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => y || $()
  });
})(or);
var Tt = {};
(function(e) {
  const t = we.fromCallback, r = Ge, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "cp",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "glob",
    "lchmod",
    "lchown",
    "lutimes",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "statfs",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, s) {
    return typeof s == "function" ? r.exists(i, s) : new Promise((o) => r.exists(i, o));
  }, e.read = function(i, s, o, a, c, u) {
    return typeof u == "function" ? r.read(i, s, o, a, c, u) : new Promise((l, f) => {
      r.read(i, s, o, a, c, (h, p, y) => {
        if (h) return f(h);
        l({ bytesRead: p, buffer: y });
      });
    });
  }, e.write = function(i, s, ...o) {
    return typeof o[o.length - 1] == "function" ? r.write(i, s, ...o) : new Promise((a, c) => {
      r.write(i, s, ...o, (u, l, f) => {
        if (u) return c(u);
        a({ bytesWritten: l, buffer: f });
      });
    });
  }, e.readv = function(i, s, ...o) {
    return typeof o[o.length - 1] == "function" ? r.readv(i, s, ...o) : new Promise((a, c) => {
      r.readv(i, s, ...o, (u, l, f) => {
        if (u) return c(u);
        a({ bytesRead: l, buffers: f });
      });
    });
  }, e.writev = function(i, s, ...o) {
    return typeof o[o.length - 1] == "function" ? r.writev(i, s, ...o) : new Promise((a, c) => {
      r.writev(i, s, ...o, (u, l, f) => {
        if (u) return c(u);
        a({ bytesWritten: l, buffers: f });
      });
    });
  }, typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(Tt);
var nf = {}, r$ = {};
const EI = ge;
r$.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(EI.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const n$ = Tt, { checkPath: i$ } = r$, s$ = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
nf.makeDir = async (e, t) => (i$(e), n$.mkdir(e, {
  mode: s$(t),
  recursive: !0
}));
nf.makeDirSync = (e, t) => (i$(e), n$.mkdirSync(e, {
  mode: s$(t),
  recursive: !0
}));
const SI = we.fromPromise, { makeDir: bI, makeDirSync: bl } = nf, Pl = SI(bI);
var vr = {
  mkdirs: Pl,
  mkdirsSync: bl,
  // alias
  mkdirp: Pl,
  mkdirpSync: bl,
  ensureDir: Pl,
  ensureDirSync: bl
};
const PI = we.fromPromise, o$ = Tt;
function TI(e) {
  return o$.access(e).then(() => !0).catch(() => !1);
}
var ii = {
  pathExists: PI(TI),
  pathExistsSync: o$.existsSync
};
const Ci = Tt, AI = we.fromPromise;
async function NI(e, t, r) {
  const n = await Ci.open(e, "r+");
  let i = null;
  try {
    await Ci.futimes(n, t, r);
  } finally {
    try {
      await Ci.close(n);
    } catch (s) {
      i = s;
    }
  }
  if (i)
    throw i;
}
function OI(e, t, r) {
  const n = Ci.openSync(e, "r+");
  return Ci.futimesSync(n, t, r), Ci.closeSync(n);
}
var a$ = {
  utimesMillis: AI(NI),
  utimesMillisSync: OI
};
const qi = Tt, Ye = ge, Em = we.fromPromise;
function RI(e, t, r) {
  const n = r.dereference ? (i) => qi.stat(i, { bigint: !0 }) : (i) => qi.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, s]) => ({ srcStat: i, destStat: s }));
}
function II(e, t, r) {
  let n;
  const i = r.dereference ? (o) => qi.statSync(o, { bigint: !0 }) : (o) => qi.lstatSync(o, { bigint: !0 }), s = i(e);
  try {
    n = i(t);
  } catch (o) {
    if (o.code === "ENOENT") return { srcStat: s, destStat: null };
    throw o;
  }
  return { srcStat: s, destStat: n };
}
async function CI(e, t, r, n) {
  const { srcStat: i, destStat: s } = await RI(e, t, n);
  if (s) {
    if (Po(i, s)) {
      const o = Ye.basename(e), a = Ye.basename(t);
      if (r === "move" && o !== a && o.toLowerCase() === a.toLowerCase())
        return { srcStat: i, destStat: s, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !s.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && s.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && sf(e, t))
    throw new Error(Pc(e, t, r));
  return { srcStat: i, destStat: s };
}
function kI(e, t, r, n) {
  const { srcStat: i, destStat: s } = II(e, t, n);
  if (s) {
    if (Po(i, s)) {
      const o = Ye.basename(e), a = Ye.basename(t);
      if (r === "move" && o !== a && o.toLowerCase() === a.toLowerCase())
        return { srcStat: i, destStat: s, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !s.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && s.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && sf(e, t))
    throw new Error(Pc(e, t, r));
  return { srcStat: i, destStat: s };
}
async function c$(e, t, r, n) {
  const i = Ye.resolve(Ye.dirname(e)), s = Ye.resolve(Ye.dirname(r));
  if (s === i || s === Ye.parse(s).root) return;
  let o;
  try {
    o = await qi.stat(s, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (Po(t, o))
    throw new Error(Pc(e, r, n));
  return c$(e, t, s, n);
}
function l$(e, t, r, n) {
  const i = Ye.resolve(Ye.dirname(e)), s = Ye.resolve(Ye.dirname(r));
  if (s === i || s === Ye.parse(s).root) return;
  let o;
  try {
    o = qi.statSync(s, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (Po(t, o))
    throw new Error(Pc(e, r, n));
  return l$(e, t, s, n);
}
function Po(e, t) {
  return t.ino !== void 0 && t.dev !== void 0 && t.ino === e.ino && t.dev === e.dev;
}
function sf(e, t) {
  const r = Ye.resolve(e).split(Ye.sep).filter((i) => i), n = Ye.resolve(t).split(Ye.sep).filter((i) => i);
  return r.every((i, s) => n[s] === i);
}
function Pc(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Xi = {
  // checkPaths
  checkPaths: Em(CI),
  checkPathsSync: kI,
  // checkParent
  checkParentPaths: Em(c$),
  checkParentPathsSync: l$,
  // Misc
  isSrcSubdir: sf,
  areIdentical: Po
};
const ft = Tt, no = ge, { mkdirs: DI } = vr, { pathExists: FI } = ii, { utimesMillis: jI } = a$, io = Xi;
async function LI(e, t, r = {}) {
  typeof r == "function" && (r = { filter: r }), r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  );
  const { srcStat: n, destStat: i } = await io.checkPaths(e, t, "copy", r);
  if (await io.checkParentPaths(e, n, t, "copy"), !await u$(e, t, r)) return;
  const o = no.dirname(t);
  await FI(o) || await DI(o), await f$(i, e, t, r);
}
async function u$(e, t, r) {
  return r.filter ? r.filter(e, t) : !0;
}
async function f$(e, t, r, n) {
  const s = await (n.dereference ? ft.stat : ft.lstat)(t);
  if (s.isDirectory()) return qI(s, e, t, r, n);
  if (s.isFile() || s.isCharacterDevice() || s.isBlockDevice()) return UI(s, e, t, r, n);
  if (s.isSymbolicLink()) return BI(e, t, r, n);
  throw s.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : s.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
async function UI(e, t, r, n, i) {
  if (!t) return Sm(e, r, n, i);
  if (i.overwrite)
    return await ft.unlink(n), Sm(e, r, n, i);
  if (i.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
async function Sm(e, t, r, n) {
  if (await ft.copyFile(t, r), n.preserveTimestamps) {
    MI(e.mode) && await xI(r, e.mode);
    const i = await ft.stat(t);
    await jI(r, i.atime, i.mtime);
  }
  return ft.chmod(r, e.mode);
}
function MI(e) {
  return (e & 128) === 0;
}
function xI(e, t) {
  return ft.chmod(e, t | 128);
}
async function qI(e, t, r, n, i) {
  t || await ft.mkdir(n);
  const s = [];
  for await (const o of await ft.opendir(r)) {
    const a = no.join(r, o.name), c = no.join(n, o.name);
    s.push(
      u$(a, c, i).then((u) => {
        if (u)
          return io.checkPaths(a, c, "copy", i).then(({ destStat: l }) => f$(l, a, c, i));
      })
    );
  }
  await Promise.all(s), t || await ft.chmod(n, e.mode);
}
async function BI(e, t, r, n) {
  let i = await ft.readlink(t);
  if (n.dereference && (i = no.resolve(process.cwd(), i)), !e)
    return ft.symlink(i, r);
  let s = null;
  try {
    s = await ft.readlink(r);
  } catch (o) {
    if (o.code === "EINVAL" || o.code === "UNKNOWN") return ft.symlink(i, r);
    throw o;
  }
  if (n.dereference && (s = no.resolve(process.cwd(), s)), io.isSrcSubdir(i, s))
    throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${s}'.`);
  if (io.isSrcSubdir(s, i))
    throw new Error(`Cannot overwrite '${s}' with '${i}'.`);
  return await ft.unlink(r), ft.symlink(i, r);
}
var VI = LI;
const _t = Ge, so = ge, HI = vr.mkdirsSync, GI = a$.utimesMillisSync, oo = Xi;
function zI(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = oo.checkPathsSync(e, t, "copy", r);
  if (oo.checkParentPathsSync(e, n, t, "copy"), r.filter && !r.filter(e, t)) return;
  const s = so.dirname(t);
  return _t.existsSync(s) || HI(s), d$(i, e, t, r);
}
function d$(e, t, r, n) {
  const s = (n.dereference ? _t.statSync : _t.lstatSync)(t);
  if (s.isDirectory()) return ZI(s, e, t, r, n);
  if (s.isFile() || s.isCharacterDevice() || s.isBlockDevice()) return KI(s, e, t, r, n);
  if (s.isSymbolicLink()) return rC(e, t, r, n);
  throw s.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : s.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function KI(e, t, r, n, i) {
  return t ? WI(e, r, n, i) : h$(e, r, n, i);
}
function WI(e, t, r, n) {
  if (n.overwrite)
    return _t.unlinkSync(r), h$(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function h$(e, t, r, n) {
  return _t.copyFileSync(t, r), n.preserveTimestamps && YI(e.mode, t, r), of(r, e.mode);
}
function YI(e, t, r) {
  return JI(e) && XI(r, e), QI(t, r);
}
function JI(e) {
  return (e & 128) === 0;
}
function XI(e, t) {
  return of(e, t | 128);
}
function of(e, t) {
  return _t.chmodSync(e, t);
}
function QI(e, t) {
  const r = _t.statSync(e);
  return GI(t, r.atime, r.mtime);
}
function ZI(e, t, r, n, i) {
  return t ? p$(r, n, i) : eC(e.mode, r, n, i);
}
function eC(e, t, r, n) {
  return _t.mkdirSync(r), p$(t, r, n), of(r, e);
}
function p$(e, t, r) {
  const n = _t.opendirSync(e);
  try {
    let i;
    for (; (i = n.readSync()) !== null; )
      tC(i.name, e, t, r);
  } finally {
    n.closeSync();
  }
}
function tC(e, t, r, n) {
  const i = so.join(t, e), s = so.join(r, e);
  if (n.filter && !n.filter(i, s)) return;
  const { destStat: o } = oo.checkPathsSync(i, s, "copy", n);
  return d$(o, i, s, n);
}
function rC(e, t, r, n) {
  let i = _t.readlinkSync(t);
  if (n.dereference && (i = so.resolve(process.cwd(), i)), e) {
    let s;
    try {
      s = _t.readlinkSync(r);
    } catch (o) {
      if (o.code === "EINVAL" || o.code === "UNKNOWN") return _t.symlinkSync(i, r);
      throw o;
    }
    if (n.dereference && (s = so.resolve(process.cwd(), s)), oo.isSrcSubdir(i, s))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${s}'.`);
    if (oo.isSrcSubdir(s, i))
      throw new Error(`Cannot overwrite '${s}' with '${i}'.`);
    return nC(i, r);
  } else
    return _t.symlinkSync(i, r);
}
function nC(e, t) {
  return _t.unlinkSync(t), _t.symlinkSync(e, t);
}
var iC = zI;
const sC = we.fromPromise;
var af = {
  copy: sC(VI),
  copySync: iC
};
const m$ = Ge, oC = we.fromCallback;
function aC(e, t) {
  m$.rm(e, { recursive: !0, force: !0 }, t);
}
function cC(e) {
  m$.rmSync(e, { recursive: !0, force: !0 });
}
var Tc = {
  remove: oC(aC),
  removeSync: cC
};
const lC = we.fromPromise, y$ = Tt, g$ = ge, $$ = vr, v$ = Tc, bm = lC(async function(t) {
  let r;
  try {
    r = await y$.readdir(t);
  } catch {
    return $$.mkdirs(t);
  }
  return Promise.all(r.map((n) => v$.remove(g$.join(t, n))));
});
function Pm(e) {
  let t;
  try {
    t = y$.readdirSync(e);
  } catch {
    return $$.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = g$.join(e, r), v$.removeSync(r);
  });
}
var uC = {
  emptyDirSync: Pm,
  emptydirSync: Pm,
  emptyDir: bm,
  emptydir: bm
};
const fC = we.fromPromise, _$ = ge, Ir = Tt, w$ = vr;
async function dC(e) {
  let t;
  try {
    t = await Ir.stat(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = _$.dirname(e);
  let n = null;
  try {
    n = await Ir.stat(r);
  } catch (i) {
    if (i.code === "ENOENT") {
      await w$.mkdirs(r), await Ir.writeFile(e, "");
      return;
    } else
      throw i;
  }
  n.isDirectory() ? await Ir.writeFile(e, "") : await Ir.readdir(r);
}
function hC(e) {
  let t;
  try {
    t = Ir.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = _$.dirname(e);
  try {
    Ir.statSync(r).isDirectory() || Ir.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") w$.mkdirsSync(r);
    else throw n;
  }
  Ir.writeFileSync(e, "");
}
var pC = {
  createFile: fC(dC),
  createFileSync: hC
};
const mC = we.fromPromise, E$ = ge, rn = Tt, S$ = vr, { pathExists: yC } = ii, { areIdentical: b$ } = Xi;
async function gC(e, t) {
  let r;
  try {
    r = await rn.lstat(t);
  } catch {
  }
  let n;
  try {
    n = await rn.lstat(e);
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  if (r && b$(n, r)) return;
  const i = E$.dirname(t);
  await yC(i) || await S$.mkdirs(i), await rn.link(e, t);
}
function $C(e, t) {
  let r;
  try {
    r = rn.lstatSync(t);
  } catch {
  }
  try {
    const s = rn.lstatSync(e);
    if (r && b$(s, r)) return;
  } catch (s) {
    throw s.message = s.message.replace("lstat", "ensureLink"), s;
  }
  const n = E$.dirname(t);
  return rn.existsSync(n) || S$.mkdirsSync(n), rn.linkSync(e, t);
}
var vC = {
  createLink: mC(gC),
  createLinkSync: $C
};
const cn = ge, Is = Tt, { pathExists: _C } = ii, wC = we.fromPromise;
async function EC(e, t) {
  if (cn.isAbsolute(e)) {
    try {
      await Is.lstat(e);
    } catch (s) {
      throw s.message = s.message.replace("lstat", "ensureSymlink"), s;
    }
    return {
      toCwd: e,
      toDst: e
    };
  }
  const r = cn.dirname(t), n = cn.join(r, e);
  if (await _C(n))
    return {
      toCwd: n,
      toDst: e
    };
  try {
    await Is.lstat(e);
  } catch (s) {
    throw s.message = s.message.replace("lstat", "ensureSymlink"), s;
  }
  return {
    toCwd: e,
    toDst: cn.relative(r, e)
  };
}
function SC(e, t) {
  if (cn.isAbsolute(e)) {
    if (!Is.existsSync(e)) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  }
  const r = cn.dirname(t), n = cn.join(r, e);
  if (Is.existsSync(n))
    return {
      toCwd: n,
      toDst: e
    };
  if (!Is.existsSync(e)) throw new Error("relative srcpath does not exist");
  return {
    toCwd: e,
    toDst: cn.relative(r, e)
  };
}
var bC = {
  symlinkPaths: wC(EC),
  symlinkPathsSync: SC
};
const P$ = Tt, PC = we.fromPromise;
async function TC(e, t) {
  if (t) return t;
  let r;
  try {
    r = await P$.lstat(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
function AC(e, t) {
  if (t) return t;
  let r;
  try {
    r = P$.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var NC = {
  symlinkType: PC(TC),
  symlinkTypeSync: AC
};
const OC = we.fromPromise, T$ = ge, fr = Tt, { mkdirs: RC, mkdirsSync: IC } = vr, { symlinkPaths: CC, symlinkPathsSync: kC } = bC, { symlinkType: DC, symlinkTypeSync: FC } = NC, { pathExists: jC } = ii, { areIdentical: A$ } = Xi;
async function LC(e, t, r) {
  let n;
  try {
    n = await fr.lstat(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const [a, c] = await Promise.all([
      fr.stat(e),
      fr.stat(t)
    ]);
    if (A$(a, c)) return;
  }
  const i = await CC(e, t);
  e = i.toDst;
  const s = await DC(i.toCwd, r), o = T$.dirname(t);
  return await jC(o) || await RC(o), fr.symlink(e, t, s);
}
function UC(e, t, r) {
  let n;
  try {
    n = fr.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const a = fr.statSync(e), c = fr.statSync(t);
    if (A$(a, c)) return;
  }
  const i = kC(e, t);
  e = i.toDst, r = FC(i.toCwd, r);
  const s = T$.dirname(t);
  return fr.existsSync(s) || IC(s), fr.symlinkSync(e, t, r);
}
var MC = {
  createSymlink: OC(LC),
  createSymlinkSync: UC
};
const { createFile: Tm, createFileSync: Am } = pC, { createLink: Nm, createLinkSync: Om } = vC, { createSymlink: Rm, createSymlinkSync: Im } = MC;
var xC = {
  // file
  createFile: Tm,
  createFileSync: Am,
  ensureFile: Tm,
  ensureFileSync: Am,
  // link
  createLink: Nm,
  createLinkSync: Om,
  ensureLink: Nm,
  ensureLinkSync: Om,
  // symlink
  createSymlink: Rm,
  createSymlinkSync: Im,
  ensureSymlink: Rm,
  ensureSymlinkSync: Im
};
const ta = Cg;
var qC = {
  // jsonfile exports
  readJson: ta.readFile,
  readJsonSync: ta.readFileSync,
  writeJson: ta.writeFile,
  writeJsonSync: ta.writeFileSync
};
const BC = we.fromPromise, su = Tt, N$ = ge, O$ = vr, VC = ii.pathExists;
async function HC(e, t, r = "utf-8") {
  const n = N$.dirname(e);
  return await VC(n) || await O$.mkdirs(n), su.writeFile(e, t, r);
}
function GC(e, ...t) {
  const r = N$.dirname(e);
  su.existsSync(r) || O$.mkdirsSync(r), su.writeFileSync(e, ...t);
}
var cf = {
  outputFile: BC(HC),
  outputFileSync: GC
};
const { stringify: zC } = mo, { outputFile: KC } = cf;
async function WC(e, t, r = {}) {
  const n = zC(t, r);
  await KC(e, n, r);
}
var YC = WC;
const { stringify: JC } = mo, { outputFileSync: XC } = cf;
function QC(e, t, r) {
  const n = JC(t, r);
  XC(e, n, r);
}
var ZC = QC;
const ek = we.fromPromise, St = qC;
St.outputJson = ek(YC);
St.outputJsonSync = ZC;
St.outputJSON = St.outputJson;
St.outputJSONSync = St.outputJsonSync;
St.writeJSON = St.writeJson;
St.writeJSONSync = St.writeJsonSync;
St.readJSON = St.readJson;
St.readJSONSync = St.readJsonSync;
var tk = St;
const rk = Tt, Cm = ge, { copy: nk } = af, { remove: R$ } = Tc, { mkdirp: ik } = vr, { pathExists: sk } = ii, km = Xi;
async function ok(e, t, r = {}) {
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: s = !1 } = await km.checkPaths(e, t, "move", r);
  await km.checkParentPaths(e, i, t, "move");
  const o = Cm.dirname(t);
  return Cm.parse(o).root !== o && await ik(o), ak(e, t, n, s);
}
async function ak(e, t, r, n) {
  if (!n) {
    if (r)
      await R$(t);
    else if (await sk(t))
      throw new Error("dest already exists.");
  }
  try {
    await rk.rename(e, t);
  } catch (i) {
    if (i.code !== "EXDEV")
      throw i;
    await ck(e, t, r);
  }
}
async function ck(e, t, r) {
  return await nk(e, t, {
    overwrite: r,
    errorOnExist: !0,
    preserveTimestamps: !0
  }), R$(e);
}
var lk = ok;
const I$ = Ge, ou = ge, uk = af.copySync, C$ = Tc.removeSync, fk = vr.mkdirpSync, Dm = Xi;
function dk(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: s = !1 } = Dm.checkPathsSync(e, t, "move", r);
  return Dm.checkParentPathsSync(e, i, t, "move"), hk(t) || fk(ou.dirname(t)), pk(e, t, n, s);
}
function hk(e) {
  const t = ou.dirname(e);
  return ou.parse(t).root === t;
}
function pk(e, t, r, n) {
  if (n) return Tl(e, t, r);
  if (r)
    return C$(t), Tl(e, t, r);
  if (I$.existsSync(t)) throw new Error("dest already exists.");
  return Tl(e, t, r);
}
function Tl(e, t, r) {
  try {
    I$.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return mk(e, t, r);
  }
}
function mk(e, t, r) {
  return uk(e, t, {
    overwrite: r,
    errorOnExist: !0,
    preserveTimestamps: !0
  }), C$(e);
}
var yk = dk;
const gk = we.fromPromise;
var $k = {
  move: gk(lk),
  moveSync: yk
}, vk = {
  // Export promiseified graceful-fs:
  ...Tt,
  // Export extra methods:
  ...af,
  ...uC,
  ...xC,
  ...tk,
  ...vr,
  ...$k,
  ...cf,
  ...ii,
  ...Tc
};
const se = /* @__PURE__ */ rc(vk), Xn = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
}, Al = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), _k = new Set("0123456789");
function Ac(e) {
  const t = [];
  let r = "", n = "start", i = !1;
  for (const s of e)
    switch (s) {
      case "\\": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
        i && (r += s), n = "property", i = !i;
        break;
      }
      case ".": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd") {
          n = "property";
          break;
        }
        if (i) {
          i = !1, r += s;
          break;
        }
        if (Al.has(r))
          return [];
        t.push(r), r = "", n = "property";
        break;
      }
      case "[": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd") {
          n = "index";
          break;
        }
        if (i) {
          i = !1, r += s;
          break;
        }
        if (n === "property") {
          if (Al.has(r))
            return [];
          t.push(r), r = "";
        }
        n = "index";
        break;
      }
      case "]": {
        if (n === "index") {
          t.push(Number.parseInt(r, 10)), r = "", n = "indexEnd";
          break;
        }
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
      }
      default: {
        if (n === "index" && !_k.has(s))
          throw new Error("Invalid character in an index");
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
        n === "start" && (n = "property"), i && (i = !1, r += "\\"), r += s;
      }
    }
  switch (i && (r += "\\"), n) {
    case "property": {
      if (Al.has(r))
        return [];
      t.push(r);
      break;
    }
    case "index":
      throw new Error("Index was not closed");
    case "start": {
      t.push("");
      break;
    }
  }
  return t;
}
function lf(e, t) {
  if (typeof t != "number" && Array.isArray(e)) {
    const r = Number.parseInt(t, 10);
    return Number.isInteger(r) && e[r] === e[t];
  }
  return !1;
}
function k$(e, t) {
  if (lf(e, t))
    throw new Error("Cannot use string index");
}
function wk(e, t, r) {
  if (!Xn(e) || typeof t != "string")
    return r === void 0 ? e : r;
  const n = Ac(t);
  if (n.length === 0)
    return r;
  for (let i = 0; i < n.length; i++) {
    const s = n[i];
    if (lf(e, s) ? e = i === n.length - 1 ? void 0 : null : e = e[s], e == null) {
      if (i !== n.length - 1)
        return r;
      break;
    }
  }
  return e === void 0 ? r : e;
}
function Fm(e, t, r) {
  if (!Xn(e) || typeof t != "string")
    return e;
  const n = e, i = Ac(t);
  for (let s = 0; s < i.length; s++) {
    const o = i[s];
    k$(e, o), s === i.length - 1 ? e[o] = r : Xn(e[o]) || (e[o] = typeof i[s + 1] == "number" ? [] : {}), e = e[o];
  }
  return n;
}
function Ek(e, t) {
  if (!Xn(e) || typeof t != "string")
    return !1;
  const r = Ac(t);
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    if (k$(e, i), n === r.length - 1)
      return delete e[i], !0;
    if (e = e[i], !Xn(e))
      return !1;
  }
}
function Sk(e, t) {
  if (!Xn(e) || typeof t != "string")
    return !1;
  const r = Ac(t);
  if (r.length === 0)
    return !1;
  for (const n of r) {
    if (!Xn(e) || !(n in e) || lf(e, n))
      return !1;
    e = e[n];
  }
  return !0;
}
const nn = tc.homedir(), uf = tc.tmpdir(), { env: Ni } = He, bk = (e) => {
  const t = X.join(nn, "Library");
  return {
    data: X.join(t, "Application Support", e),
    config: X.join(t, "Preferences", e),
    cache: X.join(t, "Caches", e),
    log: X.join(t, "Logs", e),
    temp: X.join(uf, e)
  };
}, Pk = (e) => {
  const t = Ni.APPDATA || X.join(nn, "AppData", "Roaming"), r = Ni.LOCALAPPDATA || X.join(nn, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: X.join(r, e, "Data"),
    config: X.join(t, e, "Config"),
    cache: X.join(r, e, "Cache"),
    log: X.join(r, e, "Log"),
    temp: X.join(uf, e)
  };
}, Tk = (e) => {
  const t = X.basename(nn);
  return {
    data: X.join(Ni.XDG_DATA_HOME || X.join(nn, ".local", "share"), e),
    config: X.join(Ni.XDG_CONFIG_HOME || X.join(nn, ".config"), e),
    cache: X.join(Ni.XDG_CACHE_HOME || X.join(nn, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: X.join(Ni.XDG_STATE_HOME || X.join(nn, ".local", "state"), e),
    temp: X.join(uf, t, e)
  };
};
function Ak(e, { suffix: t = "nodejs" } = {}) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  return t && (e += `-${t}`), He.platform === "darwin" ? bk(e) : He.platform === "win32" ? Pk(e) : Tk(e);
}
const zr = (e, t) => function(...n) {
  return e.apply(void 0, n).catch(t);
}, Ar = (e, t) => function(...n) {
  try {
    return e.apply(void 0, n);
  } catch (i) {
    return t(i);
  }
}, Nk = He.getuid ? !He.getuid() : !1, Ok = 1e4, Lt = () => {
}, ke = {
  /* API */
  isChangeErrorOk: (e) => {
    if (!ke.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "ENOSYS" || !Nk && (t === "EINVAL" || t === "EPERM");
  },
  isNodeError: (e) => e instanceof Error,
  isRetriableError: (e) => {
    if (!ke.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCES" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!ke.isNodeError(e))
      throw e;
    if (!ke.isChangeErrorOk(e))
      throw e;
  }
};
class Rk {
  constructor() {
    this.interval = 25, this.intervalId = void 0, this.limit = Ok, this.queueActive = /* @__PURE__ */ new Set(), this.queueWaiting = /* @__PURE__ */ new Set(), this.init = () => {
      this.intervalId || (this.intervalId = setInterval(this.tick, this.interval));
    }, this.reset = () => {
      this.intervalId && (clearInterval(this.intervalId), delete this.intervalId);
    }, this.add = (t) => {
      this.queueWaiting.add(t), this.queueActive.size < this.limit / 2 ? this.tick() : this.init();
    }, this.remove = (t) => {
      this.queueWaiting.delete(t), this.queueActive.delete(t);
    }, this.schedule = () => new Promise((t) => {
      const r = () => this.remove(n), n = () => t(r);
      this.add(n);
    }), this.tick = () => {
      if (!(this.queueActive.size >= this.limit)) {
        if (!this.queueWaiting.size)
          return this.reset();
        for (const t of this.queueWaiting) {
          if (this.queueActive.size >= this.limit)
            break;
          this.queueWaiting.delete(t), this.queueActive.add(t), t();
        }
      }
    };
  }
}
const Ik = new Rk(), Kr = (e, t) => function(n) {
  return function i(...s) {
    return Ik.schedule().then((o) => {
      const a = (u) => (o(), u), c = (u) => {
        if (o(), Date.now() >= n)
          throw u;
        if (t(u)) {
          const l = Math.round(100 * Math.random());
          return new Promise((h) => setTimeout(h, l)).then(() => i.apply(void 0, s));
        }
        throw u;
      };
      return e.apply(void 0, s).then(a, c);
    });
  };
}, Wr = (e, t) => function(n) {
  return function i(...s) {
    try {
      return e.apply(void 0, s);
    } catch (o) {
      if (Date.now() > n)
        throw o;
      if (t(o))
        return i.apply(void 0, s);
      throw o;
    }
  };
}, lt = {
  attempt: {
    /* ASYNC */
    chmod: zr(ot(fe.chmod), ke.onChangeError),
    chown: zr(ot(fe.chown), ke.onChangeError),
    close: zr(ot(fe.close), Lt),
    fsync: zr(ot(fe.fsync), Lt),
    mkdir: zr(ot(fe.mkdir), Lt),
    realpath: zr(ot(fe.realpath), Lt),
    stat: zr(ot(fe.stat), Lt),
    unlink: zr(ot(fe.unlink), Lt),
    /* SYNC */
    chmodSync: Ar(fe.chmodSync, ke.onChangeError),
    chownSync: Ar(fe.chownSync, ke.onChangeError),
    closeSync: Ar(fe.closeSync, Lt),
    existsSync: Ar(fe.existsSync, Lt),
    fsyncSync: Ar(fe.fsync, Lt),
    mkdirSync: Ar(fe.mkdirSync, Lt),
    realpathSync: Ar(fe.realpathSync, Lt),
    statSync: Ar(fe.statSync, Lt),
    unlinkSync: Ar(fe.unlinkSync, Lt)
  },
  retry: {
    /* ASYNC */
    close: Kr(ot(fe.close), ke.isRetriableError),
    fsync: Kr(ot(fe.fsync), ke.isRetriableError),
    open: Kr(ot(fe.open), ke.isRetriableError),
    readFile: Kr(ot(fe.readFile), ke.isRetriableError),
    rename: Kr(ot(fe.rename), ke.isRetriableError),
    stat: Kr(ot(fe.stat), ke.isRetriableError),
    write: Kr(ot(fe.write), ke.isRetriableError),
    writeFile: Kr(ot(fe.writeFile), ke.isRetriableError),
    /* SYNC */
    closeSync: Wr(fe.closeSync, ke.isRetriableError),
    fsyncSync: Wr(fe.fsyncSync, ke.isRetriableError),
    openSync: Wr(fe.openSync, ke.isRetriableError),
    readFileSync: Wr(fe.readFileSync, ke.isRetriableError),
    renameSync: Wr(fe.renameSync, ke.isRetriableError),
    statSync: Wr(fe.statSync, ke.isRetriableError),
    writeSync: Wr(fe.writeSync, ke.isRetriableError),
    writeFileSync: Wr(fe.writeFileSync, ke.isRetriableError)
  }
}, Ck = "utf8", jm = 438, kk = 511, Dk = {}, Fk = tc.userInfo().uid, jk = tc.userInfo().gid, Lk = 1e3, Uk = !!He.getuid;
He.getuid && He.getuid();
const Lm = 128, Mk = (e) => e instanceof Error && "code" in e, Um = (e) => typeof e == "string", Nl = (e) => e === void 0, xk = He.platform === "linux", D$ = He.platform === "win32", ff = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"];
D$ || ff.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
xk && ff.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
class qk {
  /* CONSTRUCTOR */
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.exited = !1, this.exit = (t) => {
      if (!this.exited) {
        this.exited = !0;
        for (const r of this.callbacks)
          r();
        t && (D$ && t !== "SIGINT" && t !== "SIGTERM" && t !== "SIGKILL" ? He.kill(He.pid, "SIGTERM") : He.kill(He.pid, t));
      }
    }, this.hook = () => {
      He.once("exit", () => this.exit());
      for (const t of ff)
        try {
          He.once(t, () => this.exit(t));
        } catch {
        }
    }, this.register = (t) => (this.callbacks.add(t), () => {
      this.callbacks.delete(t);
    }), this.hook();
  }
}
const Bk = new qk(), Vk = Bk.register, ut = {
  /* VARIABLES */
  store: {},
  /* API */
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), i = `.tmp-${Date.now().toString().slice(-10)}${t}`;
    return `${e}${i}`;
  },
  get: (e, t, r = !0) => {
    const n = ut.truncate(t(e));
    return n in ut.store ? ut.get(e, t, r) : (ut.store[n] = r, [n, () => delete ut.store[n]]);
  },
  purge: (e) => {
    ut.store[e] && (delete ut.store[e], lt.attempt.unlink(e));
  },
  purgeSync: (e) => {
    ut.store[e] && (delete ut.store[e], lt.attempt.unlinkSync(e));
  },
  purgeSyncAll: () => {
    for (const e in ut.store)
      ut.purgeSync(e);
  },
  truncate: (e) => {
    const t = X.basename(e);
    if (t.length <= Lm)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - Lm;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
Vk(ut.purgeSyncAll);
function F$(e, t, r = Dk) {
  if (Um(r))
    return F$(e, t, { encoding: r });
  const n = Date.now() + ((r.timeout ?? Lk) || -1);
  let i = null, s = null, o = null;
  try {
    const a = lt.attempt.realpathSync(e), c = !!a;
    e = a || e, [s, i] = ut.get(e, r.tmpCreate || ut.create, r.tmpPurge !== !1);
    const u = Uk && Nl(r.chown), l = Nl(r.mode);
    if (c && (u || l)) {
      const f = lt.attempt.statSync(e);
      f && (r = { ...r }, u && (r.chown = { uid: f.uid, gid: f.gid }), l && (r.mode = f.mode));
    }
    if (!c) {
      const f = X.dirname(e);
      lt.attempt.mkdirSync(f, {
        mode: kk,
        recursive: !0
      });
    }
    o = lt.retry.openSync(n)(s, "w", r.mode || jm), r.tmpCreated && r.tmpCreated(s), Um(t) ? lt.retry.writeSync(n)(o, t, 0, r.encoding || Ck) : Nl(t) || lt.retry.writeSync(n)(o, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? lt.retry.fsyncSync(n)(o) : lt.attempt.fsync(o)), lt.retry.closeSync(n)(o), o = null, r.chown && (r.chown.uid !== Fk || r.chown.gid !== jk) && lt.attempt.chownSync(s, r.chown.uid, r.chown.gid), r.mode && r.mode !== jm && lt.attempt.chmodSync(s, r.mode);
    try {
      lt.retry.renameSync(n)(s, e);
    } catch (f) {
      if (!Mk(f) || f.code !== "ENAMETOOLONG")
        throw f;
      lt.retry.renameSync(n)(s, ut.truncate(e));
    }
    i(), s = null;
  } finally {
    o && lt.attempt.closeSync(o), s && ut.purge(s);
  }
}
var au = { exports: {} }, j$ = {}, ir = {}, Bi = {}, To = {}, oe = {}, ao = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(w) {
      if (super(), !e.IDENTIFIER.test(w))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(w) {
      super(), this._items = typeof w == "string" ? [w] : w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const w = this._items[0];
      return w === "" || w === '""';
    }
    get str() {
      var w;
      return (w = this._str) !== null && w !== void 0 ? w : this._str = this._items.reduce((T, I) => `${T}${I}`, "");
    }
    get names() {
      var w;
      return (w = this._names) !== null && w !== void 0 ? w : this._names = this._items.reduce((T, I) => (I instanceof r && (T[I.str] = (T[I.str] || 0) + 1), T), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function i(m, ...w) {
    const T = [m[0]];
    let I = 0;
    for (; I < w.length; )
      a(T, w[I]), T.push(m[++I]);
    return new n(T);
  }
  e._ = i;
  const s = new n("+");
  function o(m, ...w) {
    const T = [p(m[0])];
    let I = 0;
    for (; I < w.length; )
      T.push(s), a(T, w[I]), T.push(s, p(m[++I]));
    return c(T), new n(T);
  }
  e.str = o;
  function a(m, w) {
    w instanceof n ? m.push(...w._items) : w instanceof r ? m.push(w) : m.push(f(w));
  }
  e.addCodeArg = a;
  function c(m) {
    let w = 1;
    for (; w < m.length - 1; ) {
      if (m[w] === s) {
        const T = u(m[w - 1], m[w + 1]);
        if (T !== void 0) {
          m.splice(w - 1, 3, T);
          continue;
        }
        m[w++] = "+";
      }
      w++;
    }
  }
  function u(m, w) {
    if (w === '""')
      return m;
    if (m === '""')
      return w;
    if (typeof m == "string")
      return w instanceof r || m[m.length - 1] !== '"' ? void 0 : typeof w != "string" ? `${m.slice(0, -1)}${w}"` : w[0] === '"' ? m.slice(0, -1) + w.slice(1) : void 0;
    if (typeof w == "string" && w[0] === '"' && !(m instanceof r))
      return `"${m}${w.slice(1)}`;
  }
  function l(m, w) {
    return w.emptyStr() ? m : m.emptyStr() ? w : o`${m}${w}`;
  }
  e.strConcat = l;
  function f(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : p(Array.isArray(m) ? m.join(",") : m);
  }
  function h(m) {
    return new n(p(m));
  }
  e.stringify = h;
  function p(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = p;
  function y(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new n(`.${m}`) : i`[${m}]`;
  }
  e.getProperty = y;
  function $(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = $;
  function v(m) {
    return new n(m.toString());
  }
  e.regexpCode = v;
})(ao);
var cu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = ao;
  class r extends Error {
    constructor(u) {
      super(`CodeGen: "code" for ${u} not defined`), this.value = u.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class i {
    constructor({ prefixes: u, parent: l } = {}) {
      this._names = {}, this._prefixes = u, this._parent = l;
    }
    toName(u) {
      return u instanceof t.Name ? u : this.name(u);
    }
    name(u) {
      return new t.Name(this._newName(u));
    }
    _newName(u) {
      const l = this._names[u] || this._nameGroup(u);
      return `${u}${l.index++}`;
    }
    _nameGroup(u) {
      var l, f;
      if (!((f = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || f === void 0) && f.has(u) || this._prefixes && !this._prefixes.has(u))
        throw new Error(`CodeGen: prefix "${u}" is not allowed in this scope`);
      return this._names[u] = { prefix: u, index: 0 };
    }
  }
  e.Scope = i;
  class s extends t.Name {
    constructor(u, l) {
      super(l), this.prefix = u;
    }
    setValue(u, { property: l, itemIndex: f }) {
      this.value = u, this.scopePath = (0, t._)`.${new t.Name(l)}[${f}]`;
    }
  }
  e.ValueScopeName = s;
  const o = (0, t._)`\n`;
  class a extends i {
    constructor(u) {
      super(u), this._values = {}, this._scope = u.scope, this.opts = { ...u, _n: u.lines ? o : t.nil };
    }
    get() {
      return this._scope;
    }
    name(u) {
      return new s(u, this._newName(u));
    }
    value(u, l) {
      var f;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const h = this.toName(u), { prefix: p } = h, y = (f = l.key) !== null && f !== void 0 ? f : l.ref;
      let $ = this._values[p];
      if ($) {
        const w = $.get(y);
        if (w)
          return w;
      } else
        $ = this._values[p] = /* @__PURE__ */ new Map();
      $.set(y, h);
      const v = this._scope[p] || (this._scope[p] = []), m = v.length;
      return v[m] = l.ref, h.setValue(l, { property: p, itemIndex: m }), h;
    }
    getValue(u, l) {
      const f = this._values[u];
      if (f)
        return f.get(l);
    }
    scopeRefs(u, l = this._values) {
      return this._reduceValues(l, (f) => {
        if (f.scopePath === void 0)
          throw new Error(`CodeGen: name "${f}" has no value`);
        return (0, t._)`${u}${f.scopePath}`;
      });
    }
    scopeCode(u = this._values, l, f) {
      return this._reduceValues(u, (h) => {
        if (h.value === void 0)
          throw new Error(`CodeGen: name "${h}" has no value`);
        return h.value.code;
      }, l, f);
    }
    _reduceValues(u, l, f = {}, h) {
      let p = t.nil;
      for (const y in u) {
        const $ = u[y];
        if (!$)
          continue;
        const v = f[y] = f[y] || /* @__PURE__ */ new Map();
        $.forEach((m) => {
          if (v.has(m))
            return;
          v.set(m, n.Started);
          let w = l(m);
          if (w) {
            const T = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            p = (0, t._)`${p}${T} ${m} = ${w};${this.opts._n}`;
          } else if (w = h == null ? void 0 : h(m))
            p = (0, t._)`${p}${w}${this.opts._n}`;
          else
            throw new r(m);
          v.set(m, n.Completed);
        });
      }
      return p;
    }
  }
  e.ValueScope = a;
})(cu);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = ao, r = cu;
  var n = ao;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var i = cu;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return i.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return i.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return i.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return i.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class s {
    optimizeNodes() {
      return this;
    }
    optimizeNames(d, _) {
      return this;
    }
  }
  class o extends s {
    constructor(d, _, A) {
      super(), this.varKind = d, this.name = _, this.rhs = A;
    }
    render({ es5: d, _n: _ }) {
      const A = d ? r.varKinds.var : this.varKind, E = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${A} ${this.name}${E};` + _;
    }
    optimizeNames(d, _) {
      if (d[this.name.str])
        return this.rhs && (this.rhs = j(this.rhs, d, _)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class a extends s {
    constructor(d, _, A) {
      super(), this.lhs = d, this.rhs = _, this.sideEffects = A;
    }
    render({ _n: d }) {
      return `${this.lhs} = ${this.rhs};` + d;
    }
    optimizeNames(d, _) {
      if (!(this.lhs instanceof t.Name && !d[this.lhs.str] && !this.sideEffects))
        return this.rhs = j(this.rhs, d, _), this;
    }
    get names() {
      const d = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return Q(d, this.rhs);
    }
  }
  class c extends a {
    constructor(d, _, A, E) {
      super(d, A, E), this.op = _;
    }
    render({ _n: d }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + d;
    }
  }
  class u extends s {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `${this.label}:` + d;
    }
  }
  class l extends s {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `break${this.label ? ` ${this.label}` : ""};` + d;
    }
  }
  class f extends s {
    constructor(d) {
      super(), this.error = d;
    }
    render({ _n: d }) {
      return `throw ${this.error};` + d;
    }
    get names() {
      return this.error.names;
    }
  }
  class h extends s {
    constructor(d) {
      super(), this.code = d;
    }
    render({ _n: d }) {
      return `${this.code};` + d;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(d, _) {
      return this.code = j(this.code, d, _), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class p extends s {
    constructor(d = []) {
      super(), this.nodes = d;
    }
    render(d) {
      return this.nodes.reduce((_, A) => _ + A.render(d), "");
    }
    optimizeNodes() {
      const { nodes: d } = this;
      let _ = d.length;
      for (; _--; ) {
        const A = d[_].optimizeNodes();
        Array.isArray(A) ? d.splice(_, 1, ...A) : A ? d[_] = A : d.splice(_, 1);
      }
      return d.length > 0 ? this : void 0;
    }
    optimizeNames(d, _) {
      const { nodes: A } = this;
      let E = A.length;
      for (; E--; ) {
        const g = A[E];
        g.optimizeNames(d, _) || (L(d, g.names), A.splice(E, 1));
      }
      return A.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((d, _) => B(d, _.names), {});
    }
  }
  class y extends p {
    render(d) {
      return "{" + d._n + super.render(d) + "}" + d._n;
    }
  }
  class $ extends p {
  }
  class v extends y {
  }
  v.kind = "else";
  class m extends y {
    constructor(d, _) {
      super(_), this.condition = d;
    }
    render(d) {
      let _ = `if(${this.condition})` + super.render(d);
      return this.else && (_ += "else " + this.else.render(d)), _;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const d = this.condition;
      if (d === !0)
        return this.nodes;
      let _ = this.else;
      if (_) {
        const A = _.optimizeNodes();
        _ = this.else = Array.isArray(A) ? new v(A) : A;
      }
      if (_)
        return d === !1 ? _ instanceof m ? _ : _.nodes : this.nodes.length ? this : new m(V(d), _ instanceof m ? [_] : _.nodes);
      if (!(d === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(d, _) {
      var A;
      if (this.else = (A = this.else) === null || A === void 0 ? void 0 : A.optimizeNames(d, _), !!(super.optimizeNames(d, _) || this.else))
        return this.condition = j(this.condition, d, _), this;
    }
    get names() {
      const d = super.names;
      return Q(d, this.condition), this.else && B(d, this.else.names), d;
    }
  }
  m.kind = "if";
  class w extends y {
  }
  w.kind = "for";
  class T extends w {
    constructor(d) {
      super(), this.iteration = d;
    }
    render(d) {
      return `for(${this.iteration})` + super.render(d);
    }
    optimizeNames(d, _) {
      if (super.optimizeNames(d, _))
        return this.iteration = j(this.iteration, d, _), this;
    }
    get names() {
      return B(super.names, this.iteration.names);
    }
  }
  class I extends w {
    constructor(d, _, A, E) {
      super(), this.varKind = d, this.name = _, this.from = A, this.to = E;
    }
    render(d) {
      const _ = d.es5 ? r.varKinds.var : this.varKind, { name: A, from: E, to: g } = this;
      return `for(${_} ${A}=${E}; ${A}<${g}; ${A}++)` + super.render(d);
    }
    get names() {
      const d = Q(super.names, this.from);
      return Q(d, this.to);
    }
  }
  class F extends w {
    constructor(d, _, A, E) {
      super(), this.loop = d, this.varKind = _, this.name = A, this.iterable = E;
    }
    render(d) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(d);
    }
    optimizeNames(d, _) {
      if (super.optimizeNames(d, _))
        return this.iterable = j(this.iterable, d, _), this;
    }
    get names() {
      return B(super.names, this.iterable.names);
    }
  }
  class H extends y {
    constructor(d, _, A) {
      super(), this.name = d, this.args = _, this.async = A;
    }
    render(d) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(d);
    }
  }
  H.kind = "func";
  class z extends p {
    render(d) {
      return "return " + super.render(d);
    }
  }
  z.kind = "return";
  class ue extends y {
    render(d) {
      let _ = "try" + super.render(d);
      return this.catch && (_ += this.catch.render(d)), this.finally && (_ += this.finally.render(d)), _;
    }
    optimizeNodes() {
      var d, _;
      return super.optimizeNodes(), (d = this.catch) === null || d === void 0 || d.optimizeNodes(), (_ = this.finally) === null || _ === void 0 || _.optimizeNodes(), this;
    }
    optimizeNames(d, _) {
      var A, E;
      return super.optimizeNames(d, _), (A = this.catch) === null || A === void 0 || A.optimizeNames(d, _), (E = this.finally) === null || E === void 0 || E.optimizeNames(d, _), this;
    }
    get names() {
      const d = super.names;
      return this.catch && B(d, this.catch.names), this.finally && B(d, this.finally.names), d;
    }
  }
  class R extends y {
    constructor(d) {
      super(), this.error = d;
    }
    render(d) {
      return `catch(${this.error})` + super.render(d);
    }
  }
  R.kind = "catch";
  class Z extends y {
    render(d) {
      return "finally" + super.render(d);
    }
  }
  Z.kind = "finally";
  class x {
    constructor(d, _ = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ..._, _n: _.lines ? `
` : "" }, this._extScope = d, this._scope = new r.Scope({ parent: d }), this._nodes = [new $()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(d) {
      return this._scope.name(d);
    }
    // reserves unique name in the external scope
    scopeName(d) {
      return this._extScope.name(d);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(d, _) {
      const A = this._extScope.value(d, _);
      return (this._values[A.prefix] || (this._values[A.prefix] = /* @__PURE__ */ new Set())).add(A), A;
    }
    getScopeValue(d, _) {
      return this._extScope.getValue(d, _);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(d) {
      return this._extScope.scopeRefs(d, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(d, _, A, E) {
      const g = this._scope.toName(_);
      return A !== void 0 && E && (this._constants[g.str] = A), this._leafNode(new o(d, g, A)), g;
    }
    // `const` declaration (`var` in es5 mode)
    const(d, _, A) {
      return this._def(r.varKinds.const, d, _, A);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(d, _, A) {
      return this._def(r.varKinds.let, d, _, A);
    }
    // `var` declaration with optional assignment
    var(d, _, A) {
      return this._def(r.varKinds.var, d, _, A);
    }
    // assignment code
    assign(d, _, A) {
      return this._leafNode(new a(d, _, A));
    }
    // `+=` code
    add(d, _) {
      return this._leafNode(new c(d, e.operators.ADD, _));
    }
    // appends passed SafeExpr to code or executes Block
    code(d) {
      return typeof d == "function" ? d() : d !== t.nil && this._leafNode(new h(d)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...d) {
      const _ = ["{"];
      for (const [A, E] of d)
        _.length > 1 && _.push(","), _.push(A), (A !== E || this.opts.es5) && (_.push(":"), (0, t.addCodeArg)(_, E));
      return _.push("}"), new t._Code(_);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(d, _, A) {
      if (this._blockNode(new m(d)), _ && A)
        this.code(_).else().code(A).endIf();
      else if (_)
        this.code(_).endIf();
      else if (A)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(d) {
      return this._elseNode(new m(d));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new v());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, v);
    }
    _for(d, _) {
      return this._blockNode(d), _ && this.code(_).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(d, _) {
      return this._for(new T(d), _);
    }
    // `for` statement for a range of values
    forRange(d, _, A, E, g = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const D = this._scope.toName(d);
      return this._for(new I(g, D, _, A), () => E(D));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(d, _, A, E = r.varKinds.const) {
      const g = this._scope.toName(d);
      if (this.opts.es5) {
        const D = _ instanceof t.Name ? _ : this.var("_arr", _);
        return this.forRange("_i", 0, (0, t._)`${D}.length`, (O) => {
          this.var(g, (0, t._)`${D}[${O}]`), A(g);
        });
      }
      return this._for(new F("of", E, g, _), () => A(g));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(d, _, A, E = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(d, (0, t._)`Object.keys(${_})`, A);
      const g = this._scope.toName(d);
      return this._for(new F("in", E, g, _), () => A(g));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label(d) {
      return this._leafNode(new u(d));
    }
    // `break` statement
    break(d) {
      return this._leafNode(new l(d));
    }
    // `return` statement
    return(d) {
      const _ = new z();
      if (this._blockNode(_), this.code(d), _.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(z);
    }
    // `try` statement
    try(d, _, A) {
      if (!_ && !A)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const E = new ue();
      if (this._blockNode(E), this.code(d), _) {
        const g = this.name("e");
        this._currNode = E.catch = new R(g), _(g);
      }
      return A && (this._currNode = E.finally = new Z(), this.code(A)), this._endBlockNode(R, Z);
    }
    // `throw` statement
    throw(d) {
      return this._leafNode(new f(d));
    }
    // start self-balancing block
    block(d, _) {
      return this._blockStarts.push(this._nodes.length), d && this.code(d).endBlock(_), this;
    }
    // end the current self-balancing block
    endBlock(d) {
      const _ = this._blockStarts.pop();
      if (_ === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const A = this._nodes.length - _;
      if (A < 0 || d !== void 0 && A !== d)
        throw new Error(`CodeGen: wrong number of nodes: ${A} vs ${d} expected`);
      return this._nodes.length = _, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(d, _ = t.nil, A, E) {
      return this._blockNode(new H(d, _, A)), E && this.code(E).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(H);
    }
    optimize(d = 1) {
      for (; d-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(d) {
      return this._currNode.nodes.push(d), this;
    }
    _blockNode(d) {
      this._currNode.nodes.push(d), this._nodes.push(d);
    }
    _endBlockNode(d, _) {
      const A = this._currNode;
      if (A instanceof d || _ && A instanceof _)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${_ ? `${d.kind}/${_.kind}` : d.kind}"`);
    }
    _elseNode(d) {
      const _ = this._currNode;
      if (!(_ instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = _.else = d, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const d = this._nodes;
      return d[d.length - 1];
    }
    set _currNode(d) {
      const _ = this._nodes;
      _[_.length - 1] = d;
    }
  }
  e.CodeGen = x;
  function B(b, d) {
    for (const _ in d)
      b[_] = (b[_] || 0) + (d[_] || 0);
    return b;
  }
  function Q(b, d) {
    return d instanceof t._CodeOrName ? B(b, d.names) : b;
  }
  function j(b, d, _) {
    if (b instanceof t.Name)
      return A(b);
    if (!E(b))
      return b;
    return new t._Code(b._items.reduce((g, D) => (D instanceof t.Name && (D = A(D)), D instanceof t._Code ? g.push(...D._items) : g.push(D), g), []));
    function A(g) {
      const D = _[g.str];
      return D === void 0 || d[g.str] !== 1 ? g : (delete d[g.str], D);
    }
    function E(g) {
      return g instanceof t._Code && g._items.some((D) => D instanceof t.Name && d[D.str] === 1 && _[D.str] !== void 0);
    }
  }
  function L(b, d) {
    for (const _ in d)
      b[_] = (b[_] || 0) - (d[_] || 0);
  }
  function V(b) {
    return typeof b == "boolean" || typeof b == "number" || b === null ? !b : (0, t._)`!${N(b)}`;
  }
  e.not = V;
  const U = S(e.operators.AND);
  function G(...b) {
    return b.reduce(U);
  }
  e.and = G;
  const q = S(e.operators.OR);
  function C(...b) {
    return b.reduce(q);
  }
  e.or = C;
  function S(b) {
    return (d, _) => d === t.nil ? _ : _ === t.nil ? d : (0, t._)`${N(d)} ${b} ${N(_)}`;
  }
  function N(b) {
    return b instanceof t.Name ? b : (0, t._)`(${b})`;
  }
})(oe);
var K = {};
Object.defineProperty(K, "__esModule", { value: !0 });
K.checkStrictMode = K.getErrorPath = K.Type = K.useFunc = K.setEvaluated = K.evaluatedPropsToName = K.mergeEvaluated = K.eachItem = K.unescapeJsonPointer = K.escapeJsonPointer = K.escapeFragment = K.unescapeFragment = K.schemaRefOrVal = K.schemaHasRulesButRef = K.schemaHasRules = K.checkUnknownRules = K.alwaysValidSchema = K.toHash = void 0;
const be = oe, Hk = ao;
function Gk(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
K.toHash = Gk;
function zk(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (L$(e, t), !U$(t, e.self.RULES.all));
}
K.alwaysValidSchema = zk;
function L$(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const i = n.RULES.keywords;
  for (const s in t)
    i[s] || q$(e, `unknown keyword: "${s}"`);
}
K.checkUnknownRules = L$;
function U$(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
K.schemaHasRules = U$;
function Kk(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
K.schemaHasRulesButRef = Kk;
function Wk({ topSchemaRef: e, schemaPath: t }, r, n, i) {
  if (!i) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, be._)`${r}`;
  }
  return (0, be._)`${e}${t}${(0, be.getProperty)(n)}`;
}
K.schemaRefOrVal = Wk;
function Yk(e) {
  return M$(decodeURIComponent(e));
}
K.unescapeFragment = Yk;
function Jk(e) {
  return encodeURIComponent(df(e));
}
K.escapeFragment = Jk;
function df(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
K.escapeJsonPointer = df;
function M$(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
K.unescapeJsonPointer = M$;
function Xk(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
K.eachItem = Xk;
function Mm({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (i, s, o, a) => {
    const c = o === void 0 ? s : o instanceof be.Name ? (s instanceof be.Name ? e(i, s, o) : t(i, s, o), o) : s instanceof be.Name ? (t(i, o, s), s) : r(s, o);
    return a === be.Name && !(c instanceof be.Name) ? n(i, c) : c;
  };
}
K.mergeEvaluated = {
  props: Mm({
    mergeNames: (e, t, r) => e.if((0, be._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, be._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, be._)`${r} || {}`).code((0, be._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, be._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, be._)`${r} || {}`), hf(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: x$
  }),
  items: Mm({
    mergeNames: (e, t, r) => e.if((0, be._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, be._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, be._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, be._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function x$(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, be._)`{}`);
  return t !== void 0 && hf(e, r, t), r;
}
K.evaluatedPropsToName = x$;
function hf(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, be._)`${t}${(0, be.getProperty)(n)}`, !0));
}
K.setEvaluated = hf;
const xm = {};
function Qk(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: xm[t.code] || (xm[t.code] = new Hk._Code(t.code))
  });
}
K.useFunc = Qk;
var lu;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(lu || (K.Type = lu = {}));
function Zk(e, t, r) {
  if (e instanceof be.Name) {
    const n = t === lu.Num;
    return r ? n ? (0, be._)`"[" + ${e} + "]"` : (0, be._)`"['" + ${e} + "']"` : n ? (0, be._)`"/" + ${e}` : (0, be._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, be.getProperty)(e).toString() : "/" + df(e);
}
K.getErrorPath = Zk;
function q$(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
K.checkStrictMode = q$;
var Mt = {};
Object.defineProperty(Mt, "__esModule", { value: !0 });
const at = oe, eD = {
  // validation function arguments
  data: new at.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new at.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new at.Name("instancePath"),
  parentData: new at.Name("parentData"),
  parentDataProperty: new at.Name("parentDataProperty"),
  rootData: new at.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new at.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new at.Name("vErrors"),
  // null or array of validation errors
  errors: new at.Name("errors"),
  // counter of validation errors
  this: new at.Name("this"),
  // "globals"
  self: new at.Name("self"),
  scope: new at.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new at.Name("json"),
  jsonPos: new at.Name("jsonPos"),
  jsonLen: new at.Name("jsonLen"),
  jsonPart: new at.Name("jsonPart")
};
Mt.default = eD;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = oe, r = K, n = Mt;
  e.keywordError = {
    message: ({ keyword: v }) => (0, t.str)`must pass "${v}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: v, schemaType: m }) => m ? (0, t.str)`"${v}" keyword must be ${m} ($data)` : (0, t.str)`"${v}" keyword is invalid ($data)`
  };
  function i(v, m = e.keywordError, w, T) {
    const { it: I } = v, { gen: F, compositeRule: H, allErrors: z } = I, ue = f(v, m, w);
    T ?? (H || z) ? c(F, ue) : u(I, (0, t._)`[${ue}]`);
  }
  e.reportError = i;
  function s(v, m = e.keywordError, w) {
    const { it: T } = v, { gen: I, compositeRule: F, allErrors: H } = T, z = f(v, m, w);
    c(I, z), F || H || u(T, n.default.vErrors);
  }
  e.reportExtraError = s;
  function o(v, m) {
    v.assign(n.default.errors, m), v.if((0, t._)`${n.default.vErrors} !== null`, () => v.if(m, () => v.assign((0, t._)`${n.default.vErrors}.length`, m), () => v.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = o;
  function a({ gen: v, keyword: m, schemaValue: w, data: T, errsCount: I, it: F }) {
    if (I === void 0)
      throw new Error("ajv implementation error");
    const H = v.name("err");
    v.forRange("i", I, n.default.errors, (z) => {
      v.const(H, (0, t._)`${n.default.vErrors}[${z}]`), v.if((0, t._)`${H}.instancePath === undefined`, () => v.assign((0, t._)`${H}.instancePath`, (0, t.strConcat)(n.default.instancePath, F.errorPath))), v.assign((0, t._)`${H}.schemaPath`, (0, t.str)`${F.errSchemaPath}/${m}`), F.opts.verbose && (v.assign((0, t._)`${H}.schema`, w), v.assign((0, t._)`${H}.data`, T));
    });
  }
  e.extendErrors = a;
  function c(v, m) {
    const w = v.const("err", m);
    v.if((0, t._)`${n.default.vErrors} === null`, () => v.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), v.code((0, t._)`${n.default.errors}++`);
  }
  function u(v, m) {
    const { gen: w, validateName: T, schemaEnv: I } = v;
    I.$async ? w.throw((0, t._)`new ${v.ValidationError}(${m})`) : (w.assign((0, t._)`${T}.errors`, m), w.return(!1));
  }
  const l = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function f(v, m, w) {
    const { createErrors: T } = v.it;
    return T === !1 ? (0, t._)`{}` : h(v, m, w);
  }
  function h(v, m, w = {}) {
    const { gen: T, it: I } = v, F = [
      p(I, w),
      y(v, w)
    ];
    return $(v, m, F), T.object(...F);
  }
  function p({ errorPath: v }, { instancePath: m }) {
    const w = m ? (0, t.str)`${v}${(0, r.getErrorPath)(m, r.Type.Str)}` : v;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function y({ keyword: v, it: { errSchemaPath: m } }, { schemaPath: w, parentSchema: T }) {
    let I = T ? m : (0, t.str)`${m}/${v}`;
    return w && (I = (0, t.str)`${I}${(0, r.getErrorPath)(w, r.Type.Str)}`), [l.schemaPath, I];
  }
  function $(v, { params: m, message: w }, T) {
    const { keyword: I, data: F, schemaValue: H, it: z } = v, { opts: ue, propertyName: R, topSchemaRef: Z, schemaPath: x } = z;
    T.push([l.keyword, I], [l.params, typeof m == "function" ? m(v) : m || (0, t._)`{}`]), ue.messages && T.push([l.message, typeof w == "function" ? w(v) : w]), ue.verbose && T.push([l.schema, H], [l.parentSchema, (0, t._)`${Z}${x}`], [n.default.data, F]), R && T.push([l.propertyName, R]);
  }
})(To);
Object.defineProperty(Bi, "__esModule", { value: !0 });
Bi.boolOrEmptySchema = Bi.topBoolOrEmptySchema = void 0;
const tD = To, rD = oe, nD = Mt, iD = {
  message: "boolean schema is false"
};
function sD(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? B$(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(nD.default.data) : (t.assign((0, rD._)`${n}.errors`, null), t.return(!0));
}
Bi.topBoolOrEmptySchema = sD;
function oD(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), B$(e)) : r.var(t, !0);
}
Bi.boolOrEmptySchema = oD;
function B$(e, t) {
  const { gen: r, data: n } = e, i = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, tD.reportError)(i, iD, void 0, t);
}
var Be = {}, Qn = {};
Object.defineProperty(Qn, "__esModule", { value: !0 });
Qn.getRules = Qn.isJSONType = void 0;
const aD = ["string", "number", "integer", "boolean", "null", "object", "array"], cD = new Set(aD);
function lD(e) {
  return typeof e == "string" && cD.has(e);
}
Qn.isJSONType = lD;
function uD() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
Qn.getRules = uD;
var Cr = {};
Object.defineProperty(Cr, "__esModule", { value: !0 });
Cr.shouldUseRule = Cr.shouldUseGroup = Cr.schemaHasRulesForType = void 0;
function fD({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && V$(e, n);
}
Cr.schemaHasRulesForType = fD;
function V$(e, t) {
  return t.rules.some((r) => H$(e, r));
}
Cr.shouldUseGroup = V$;
function H$(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Cr.shouldUseRule = H$;
Object.defineProperty(Be, "__esModule", { value: !0 });
Be.reportTypeError = Be.checkDataTypes = Be.checkDataType = Be.coerceAndCheckDataType = Be.getJSONTypes = Be.getSchemaTypes = Be.DataType = void 0;
const dD = Qn, hD = Cr, pD = To, ce = oe, G$ = K;
var ki;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(ki || (Be.DataType = ki = {}));
function mD(e) {
  const t = z$(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
Be.getSchemaTypes = mD;
function z$(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(dD.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Be.getJSONTypes = z$;
function yD(e, t) {
  const { gen: r, data: n, opts: i } = e, s = gD(t, i.coerceTypes), o = t.length > 0 && !(s.length === 0 && t.length === 1 && (0, hD.schemaHasRulesForType)(e, t[0]));
  if (o) {
    const a = pf(t, n, i.strictNumbers, ki.Wrong);
    r.if(a, () => {
      s.length ? $D(e, t, s) : mf(e);
    });
  }
  return o;
}
Be.coerceAndCheckDataType = yD;
const K$ = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function gD(e, t) {
  return t ? e.filter((r) => K$.has(r) || t === "array" && r === "array") : [];
}
function $D(e, t, r) {
  const { gen: n, data: i, opts: s } = e, o = n.let("dataType", (0, ce._)`typeof ${i}`), a = n.let("coerced", (0, ce._)`undefined`);
  s.coerceTypes === "array" && n.if((0, ce._)`${o} == 'object' && Array.isArray(${i}) && ${i}.length == 1`, () => n.assign(i, (0, ce._)`${i}[0]`).assign(o, (0, ce._)`typeof ${i}`).if(pf(t, i, s.strictNumbers), () => n.assign(a, i))), n.if((0, ce._)`${a} !== undefined`);
  for (const u of r)
    (K$.has(u) || u === "array" && s.coerceTypes === "array") && c(u);
  n.else(), mf(e), n.endIf(), n.if((0, ce._)`${a} !== undefined`, () => {
    n.assign(i, a), vD(e, a);
  });
  function c(u) {
    switch (u) {
      case "string":
        n.elseIf((0, ce._)`${o} == "number" || ${o} == "boolean"`).assign(a, (0, ce._)`"" + ${i}`).elseIf((0, ce._)`${i} === null`).assign(a, (0, ce._)`""`);
        return;
      case "number":
        n.elseIf((0, ce._)`${o} == "boolean" || ${i} === null
              || (${o} == "string" && ${i} && ${i} == +${i})`).assign(a, (0, ce._)`+${i}`);
        return;
      case "integer":
        n.elseIf((0, ce._)`${o} === "boolean" || ${i} === null
              || (${o} === "string" && ${i} && ${i} == +${i} && !(${i} % 1))`).assign(a, (0, ce._)`+${i}`);
        return;
      case "boolean":
        n.elseIf((0, ce._)`${i} === "false" || ${i} === 0 || ${i} === null`).assign(a, !1).elseIf((0, ce._)`${i} === "true" || ${i} === 1`).assign(a, !0);
        return;
      case "null":
        n.elseIf((0, ce._)`${i} === "" || ${i} === 0 || ${i} === false`), n.assign(a, null);
        return;
      case "array":
        n.elseIf((0, ce._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${i} === null`).assign(a, (0, ce._)`[${i}]`);
    }
  }
}
function vD({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, ce._)`${t} !== undefined`, () => e.assign((0, ce._)`${t}[${r}]`, n));
}
function uu(e, t, r, n = ki.Correct) {
  const i = n === ki.Correct ? ce.operators.EQ : ce.operators.NEQ;
  let s;
  switch (e) {
    case "null":
      return (0, ce._)`${t} ${i} null`;
    case "array":
      s = (0, ce._)`Array.isArray(${t})`;
      break;
    case "object":
      s = (0, ce._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      s = o((0, ce._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      s = o();
      break;
    default:
      return (0, ce._)`typeof ${t} ${i} ${e}`;
  }
  return n === ki.Correct ? s : (0, ce.not)(s);
  function o(a = ce.nil) {
    return (0, ce.and)((0, ce._)`typeof ${t} == "number"`, a, r ? (0, ce._)`isFinite(${t})` : ce.nil);
  }
}
Be.checkDataType = uu;
function pf(e, t, r, n) {
  if (e.length === 1)
    return uu(e[0], t, r, n);
  let i;
  const s = (0, G$.toHash)(e);
  if (s.array && s.object) {
    const o = (0, ce._)`typeof ${t} != "object"`;
    i = s.null ? o : (0, ce._)`!${t} || ${o}`, delete s.null, delete s.array, delete s.object;
  } else
    i = ce.nil;
  s.number && delete s.integer;
  for (const o in s)
    i = (0, ce.and)(i, uu(o, t, r, n));
  return i;
}
Be.checkDataTypes = pf;
const _D = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, ce._)`{type: ${e}}` : (0, ce._)`{type: ${t}}`
};
function mf(e) {
  const t = wD(e);
  (0, pD.reportError)(t, _D);
}
Be.reportTypeError = mf;
function wD(e) {
  const { gen: t, data: r, schema: n } = e, i = (0, G$.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: i,
    schemaValue: i,
    parentSchema: n,
    params: {},
    it: e
  };
}
var Nc = {};
Object.defineProperty(Nc, "__esModule", { value: !0 });
Nc.assignDefaults = void 0;
const pi = oe, ED = K;
function SD(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const i in r)
      qm(e, i, r[i].default);
  else t === "array" && Array.isArray(n) && n.forEach((i, s) => qm(e, s, i.default));
}
Nc.assignDefaults = SD;
function qm(e, t, r) {
  const { gen: n, compositeRule: i, data: s, opts: o } = e;
  if (r === void 0)
    return;
  const a = (0, pi._)`${s}${(0, pi.getProperty)(t)}`;
  if (i) {
    (0, ED.checkStrictMode)(e, `default is ignored for: ${a}`);
    return;
  }
  let c = (0, pi._)`${a} === undefined`;
  o.useDefaults === "empty" && (c = (0, pi._)`${c} || ${a} === null || ${a} === ""`), n.if(c, (0, pi._)`${a} = ${(0, pi.stringify)(r)}`);
}
var pr = {}, he = {};
Object.defineProperty(he, "__esModule", { value: !0 });
he.validateUnion = he.validateArray = he.usePattern = he.callValidateCode = he.schemaProperties = he.allSchemaProperties = he.noPropertyInData = he.propertyInData = he.isOwnProperty = he.hasPropFunc = he.reportMissingProp = he.checkMissingProp = he.checkReportMissingProp = void 0;
const Oe = oe, yf = K, Yr = Mt, bD = K;
function PD(e, t) {
  const { gen: r, data: n, it: i } = e;
  r.if($f(r, n, t, i.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, Oe._)`${t}` }, !0), e.error();
  });
}
he.checkReportMissingProp = PD;
function TD({ gen: e, data: t, it: { opts: r } }, n, i) {
  return (0, Oe.or)(...n.map((s) => (0, Oe.and)($f(e, t, s, r.ownProperties), (0, Oe._)`${i} = ${s}`)));
}
he.checkMissingProp = TD;
function AD(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
he.reportMissingProp = AD;
function W$(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, Oe._)`Object.prototype.hasOwnProperty`
  });
}
he.hasPropFunc = W$;
function gf(e, t, r) {
  return (0, Oe._)`${W$(e)}.call(${t}, ${r})`;
}
he.isOwnProperty = gf;
function ND(e, t, r, n) {
  const i = (0, Oe._)`${t}${(0, Oe.getProperty)(r)} !== undefined`;
  return n ? (0, Oe._)`${i} && ${gf(e, t, r)}` : i;
}
he.propertyInData = ND;
function $f(e, t, r, n) {
  const i = (0, Oe._)`${t}${(0, Oe.getProperty)(r)} === undefined`;
  return n ? (0, Oe.or)(i, (0, Oe.not)(gf(e, t, r))) : i;
}
he.noPropertyInData = $f;
function Y$(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
he.allSchemaProperties = Y$;
function OD(e, t) {
  return Y$(t).filter((r) => !(0, yf.alwaysValidSchema)(e, t[r]));
}
he.schemaProperties = OD;
function RD({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: i, errorPath: s }, it: o }, a, c, u) {
  const l = u ? (0, Oe._)`${e}, ${t}, ${n}${i}` : t, f = [
    [Yr.default.instancePath, (0, Oe.strConcat)(Yr.default.instancePath, s)],
    [Yr.default.parentData, o.parentData],
    [Yr.default.parentDataProperty, o.parentDataProperty],
    [Yr.default.rootData, Yr.default.rootData]
  ];
  o.opts.dynamicRef && f.push([Yr.default.dynamicAnchors, Yr.default.dynamicAnchors]);
  const h = (0, Oe._)`${l}, ${r.object(...f)}`;
  return c !== Oe.nil ? (0, Oe._)`${a}.call(${c}, ${h})` : (0, Oe._)`${a}(${h})`;
}
he.callValidateCode = RD;
const ID = (0, Oe._)`new RegExp`;
function CD({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: i } = t.code, s = i(r, n);
  return e.scopeValue("pattern", {
    key: s.toString(),
    ref: s,
    code: (0, Oe._)`${i.code === "new RegExp" ? ID : (0, bD.useFunc)(e, i)}(${r}, ${n})`
  });
}
he.usePattern = CD;
function kD(e) {
  const { gen: t, data: r, keyword: n, it: i } = e, s = t.name("valid");
  if (i.allErrors) {
    const a = t.let("valid", !0);
    return o(() => t.assign(a, !1)), a;
  }
  return t.var(s, !0), o(() => t.break()), s;
  function o(a) {
    const c = t.const("len", (0, Oe._)`${r}.length`);
    t.forRange("i", 0, c, (u) => {
      e.subschema({
        keyword: n,
        dataProp: u,
        dataPropType: yf.Type.Num
      }, s), t.if((0, Oe.not)(s), a);
    });
  }
}
he.validateArray = kD;
function DD(e) {
  const { gen: t, schema: r, keyword: n, it: i } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, yf.alwaysValidSchema)(i, c)) && !i.opts.unevaluated)
    return;
  const o = t.let("valid", !1), a = t.name("_valid");
  t.block(() => r.forEach((c, u) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: u,
      compositeRule: !0
    }, a);
    t.assign(o, (0, Oe._)`${o} || ${a}`), e.mergeValidEvaluated(l, a) || t.if((0, Oe.not)(o));
  })), e.result(o, () => e.reset(), () => e.error(!0));
}
he.validateUnion = DD;
Object.defineProperty(pr, "__esModule", { value: !0 });
pr.validateKeywordUsage = pr.validSchemaType = pr.funcKeywordCode = pr.macroKeywordCode = void 0;
const yt = oe, xn = Mt, FD = he, jD = To;
function LD(e, t) {
  const { gen: r, keyword: n, schema: i, parentSchema: s, it: o } = e, a = t.macro.call(o.self, i, s, o), c = J$(r, n, a);
  o.opts.validateSchema !== !1 && o.self.validateSchema(a, !0);
  const u = r.name("valid");
  e.subschema({
    schema: a,
    schemaPath: yt.nil,
    errSchemaPath: `${o.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, u), e.pass(u, () => e.error(!0));
}
pr.macroKeywordCode = LD;
function UD(e, t) {
  var r;
  const { gen: n, keyword: i, schema: s, parentSchema: o, $data: a, it: c } = e;
  xD(c, t);
  const u = !a && t.compile ? t.compile.call(c.self, s, o, c) : t.validate, l = J$(n, i, u), f = n.let("valid");
  e.block$data(f, h), e.ok((r = t.valid) !== null && r !== void 0 ? r : f);
  function h() {
    if (t.errors === !1)
      $(), t.modifying && Bm(e), v(() => e.error());
    else {
      const m = t.async ? p() : y();
      t.modifying && Bm(e), v(() => MD(e, m));
    }
  }
  function p() {
    const m = n.let("ruleErrs", null);
    return n.try(() => $((0, yt._)`await `), (w) => n.assign(f, !1).if((0, yt._)`${w} instanceof ${c.ValidationError}`, () => n.assign(m, (0, yt._)`${w}.errors`), () => n.throw(w))), m;
  }
  function y() {
    const m = (0, yt._)`${l}.errors`;
    return n.assign(m, null), $(yt.nil), m;
  }
  function $(m = t.async ? (0, yt._)`await ` : yt.nil) {
    const w = c.opts.passContext ? xn.default.this : xn.default.self, T = !("compile" in t && !a || t.schema === !1);
    n.assign(f, (0, yt._)`${m}${(0, FD.callValidateCode)(e, l, w, T)}`, t.modifying);
  }
  function v(m) {
    var w;
    n.if((0, yt.not)((w = t.valid) !== null && w !== void 0 ? w : f), m);
  }
}
pr.funcKeywordCode = UD;
function Bm(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, yt._)`${n.parentData}[${n.parentDataProperty}]`));
}
function MD(e, t) {
  const { gen: r } = e;
  r.if((0, yt._)`Array.isArray(${t})`, () => {
    r.assign(xn.default.vErrors, (0, yt._)`${xn.default.vErrors} === null ? ${t} : ${xn.default.vErrors}.concat(${t})`).assign(xn.default.errors, (0, yt._)`${xn.default.vErrors}.length`), (0, jD.extendErrors)(e);
  }, () => e.error());
}
function xD({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function J$(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, yt.stringify)(r) });
}
function qD(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
pr.validSchemaType = qD;
function BD({ schema: e, opts: t, self: r, errSchemaPath: n }, i, s) {
  if (Array.isArray(i.keyword) ? !i.keyword.includes(s) : i.keyword !== s)
    throw new Error("ajv implementation error");
  const o = i.dependencies;
  if (o != null && o.some((a) => !Object.prototype.hasOwnProperty.call(e, a)))
    throw new Error(`parent schema must have dependencies of ${s}: ${o.join(",")}`);
  if (i.validateSchema && !i.validateSchema(e[s])) {
    const c = `keyword "${s}" value is invalid at path "${n}": ` + r.errorsText(i.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
pr.validateKeywordUsage = BD;
var fn = {};
Object.defineProperty(fn, "__esModule", { value: !0 });
fn.extendSubschemaMode = fn.extendSubschemaData = fn.getSubschema = void 0;
const dr = oe, X$ = K;
function VD(e, { keyword: t, schemaProp: r, schema: n, schemaPath: i, errSchemaPath: s, topSchemaRef: o }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const a = e.schema[t];
    return r === void 0 ? {
      schema: a,
      schemaPath: (0, dr._)`${e.schemaPath}${(0, dr.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: a[r],
      schemaPath: (0, dr._)`${e.schemaPath}${(0, dr.getProperty)(t)}${(0, dr.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, X$.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (i === void 0 || s === void 0 || o === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: i,
      topSchemaRef: o,
      errSchemaPath: s
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
fn.getSubschema = VD;
function HD(e, t, { dataProp: r, dataPropType: n, data: i, dataTypes: s, propertyName: o }) {
  if (i !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: a } = t;
  if (r !== void 0) {
    const { errorPath: u, dataPathArr: l, opts: f } = t, h = a.let("data", (0, dr._)`${t.data}${(0, dr.getProperty)(r)}`, !0);
    c(h), e.errorPath = (0, dr.str)`${u}${(0, X$.getErrorPath)(r, n, f.jsPropertySyntax)}`, e.parentDataProperty = (0, dr._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (i !== void 0) {
    const u = i instanceof dr.Name ? i : a.let("data", i, !0);
    c(u), o !== void 0 && (e.propertyName = o);
  }
  s && (e.dataTypes = s);
  function c(u) {
    e.data = u, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, u];
  }
}
fn.extendSubschemaData = HD;
function GD(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: i, allErrors: s }) {
  n !== void 0 && (e.compositeRule = n), i !== void 0 && (e.createErrors = i), s !== void 0 && (e.allErrors = s), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
fn.extendSubschemaMode = GD;
var et = {}, Oc = function e(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, i, s;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (i = n; i-- !== 0; )
        if (!e(t[i], r[i])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
    if (s = Object.keys(t), n = s.length, n !== Object.keys(r).length) return !1;
    for (i = n; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, s[i])) return !1;
    for (i = n; i-- !== 0; ) {
      var o = s[i];
      if (!e(t[o], r[o])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, Q$ = { exports: {} }, ln = Q$.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, i = r.post || function() {
  };
  _a(t, n, i, e, "", e);
};
ln.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
ln.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
ln.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
ln.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function _a(e, t, r, n, i, s, o, a, c, u) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, i, s, o, a, c, u);
    for (var l in n) {
      var f = n[l];
      if (Array.isArray(f)) {
        if (l in ln.arrayKeywords)
          for (var h = 0; h < f.length; h++)
            _a(e, t, r, f[h], i + "/" + l + "/" + h, s, i, l, n, h);
      } else if (l in ln.propsKeywords) {
        if (f && typeof f == "object")
          for (var p in f)
            _a(e, t, r, f[p], i + "/" + l + "/" + zD(p), s, i, l, n, p);
      } else (l in ln.keywords || e.allKeys && !(l in ln.skipKeywords)) && _a(e, t, r, f, i + "/" + l, s, i, l, n);
    }
    r(n, i, s, o, a, c, u);
  }
}
function zD(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Z$ = Q$.exports;
Object.defineProperty(et, "__esModule", { value: !0 });
et.getSchemaRefs = et.resolveUrl = et.normalizeId = et._getFullPath = et.getFullPath = et.inlineRef = void 0;
const KD = K, WD = Oc, YD = Z$, JD = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function XD(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !fu(e) : t ? ev(e) <= t : !1;
}
et.inlineRef = XD;
const QD = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function fu(e) {
  for (const t in e) {
    if (QD.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(fu) || typeof r == "object" && fu(r))
      return !0;
  }
  return !1;
}
function ev(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !JD.has(r) && (typeof e[r] == "object" && (0, KD.eachItem)(e[r], (n) => t += ev(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function tv(e, t = "", r) {
  r !== !1 && (t = Di(t));
  const n = e.parse(t);
  return rv(e, n);
}
et.getFullPath = tv;
function rv(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
et._getFullPath = rv;
const ZD = /#\/?$/;
function Di(e) {
  return e ? e.replace(ZD, "") : "";
}
et.normalizeId = Di;
function eF(e, t, r) {
  return r = Di(r), e.resolve(t, r);
}
et.resolveUrl = eF;
const tF = /^[a-z_][-a-z0-9._]*$/i;
function rF(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, i = Di(e[r] || t), s = { "": i }, o = tv(n, i, !1), a = {}, c = /* @__PURE__ */ new Set();
  return YD(e, { allKeys: !0 }, (f, h, p, y) => {
    if (y === void 0)
      return;
    const $ = o + h;
    let v = s[y];
    typeof f[r] == "string" && (v = m.call(this, f[r])), w.call(this, f.$anchor), w.call(this, f.$dynamicAnchor), s[h] = v;
    function m(T) {
      const I = this.opts.uriResolver.resolve;
      if (T = Di(v ? I(v, T) : T), c.has(T))
        throw l(T);
      c.add(T);
      let F = this.refs[T];
      return typeof F == "string" && (F = this.refs[F]), typeof F == "object" ? u(f, F.schema, T) : T !== Di($) && (T[0] === "#" ? (u(f, a[T], T), a[T] = f) : this.refs[T] = $), T;
    }
    function w(T) {
      if (typeof T == "string") {
        if (!tF.test(T))
          throw new Error(`invalid anchor "${T}"`);
        m.call(this, `#${T}`);
      }
    }
  }), a;
  function u(f, h, p) {
    if (h !== void 0 && !WD(f, h))
      throw l(p);
  }
  function l(f) {
    return new Error(`reference "${f}" resolves to more than one schema`);
  }
}
et.getSchemaRefs = rF;
Object.defineProperty(ir, "__esModule", { value: !0 });
ir.getData = ir.KeywordCxt = ir.validateFunctionCode = void 0;
const nv = Bi, Vm = Be, vf = Cr, Ba = Be, nF = Nc, Cs = pr, Ol = fn, ee = oe, ne = Mt, iF = et, kr = K, gs = To;
function sF(e) {
  if (ov(e) && (av(e), sv(e))) {
    cF(e);
    return;
  }
  iv(e, () => (0, nv.topBoolOrEmptySchema)(e));
}
ir.validateFunctionCode = sF;
function iv({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: i }, s) {
  i.code.es5 ? e.func(t, (0, ee._)`${ne.default.data}, ${ne.default.valCxt}`, n.$async, () => {
    e.code((0, ee._)`"use strict"; ${Hm(r, i)}`), aF(e, i), e.code(s);
  }) : e.func(t, (0, ee._)`${ne.default.data}, ${oF(i)}`, n.$async, () => e.code(Hm(r, i)).code(s));
}
function oF(e) {
  return (0, ee._)`{${ne.default.instancePath}="", ${ne.default.parentData}, ${ne.default.parentDataProperty}, ${ne.default.rootData}=${ne.default.data}${e.dynamicRef ? (0, ee._)`, ${ne.default.dynamicAnchors}={}` : ee.nil}}={}`;
}
function aF(e, t) {
  e.if(ne.default.valCxt, () => {
    e.var(ne.default.instancePath, (0, ee._)`${ne.default.valCxt}.${ne.default.instancePath}`), e.var(ne.default.parentData, (0, ee._)`${ne.default.valCxt}.${ne.default.parentData}`), e.var(ne.default.parentDataProperty, (0, ee._)`${ne.default.valCxt}.${ne.default.parentDataProperty}`), e.var(ne.default.rootData, (0, ee._)`${ne.default.valCxt}.${ne.default.rootData}`), t.dynamicRef && e.var(ne.default.dynamicAnchors, (0, ee._)`${ne.default.valCxt}.${ne.default.dynamicAnchors}`);
  }, () => {
    e.var(ne.default.instancePath, (0, ee._)`""`), e.var(ne.default.parentData, (0, ee._)`undefined`), e.var(ne.default.parentDataProperty, (0, ee._)`undefined`), e.var(ne.default.rootData, ne.default.data), t.dynamicRef && e.var(ne.default.dynamicAnchors, (0, ee._)`{}`);
  });
}
function cF(e) {
  const { schema: t, opts: r, gen: n } = e;
  iv(e, () => {
    r.$comment && t.$comment && lv(e), hF(e), n.let(ne.default.vErrors, null), n.let(ne.default.errors, 0), r.unevaluated && lF(e), cv(e), yF(e);
  });
}
function lF(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, ee._)`${r}.evaluated`), t.if((0, ee._)`${e.evaluated}.dynamicProps`, () => t.assign((0, ee._)`${e.evaluated}.props`, (0, ee._)`undefined`)), t.if((0, ee._)`${e.evaluated}.dynamicItems`, () => t.assign((0, ee._)`${e.evaluated}.items`, (0, ee._)`undefined`));
}
function Hm(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, ee._)`/*# sourceURL=${r} */` : ee.nil;
}
function uF(e, t) {
  if (ov(e) && (av(e), sv(e))) {
    fF(e, t);
    return;
  }
  (0, nv.boolOrEmptySchema)(e, t);
}
function sv({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function ov(e) {
  return typeof e.schema != "boolean";
}
function fF(e, t) {
  const { schema: r, gen: n, opts: i } = e;
  i.$comment && r.$comment && lv(e), pF(e), mF(e);
  const s = n.const("_errs", ne.default.errors);
  cv(e, s), n.var(t, (0, ee._)`${s} === ${ne.default.errors}`);
}
function av(e) {
  (0, kr.checkUnknownRules)(e), dF(e);
}
function cv(e, t) {
  if (e.opts.jtd)
    return Gm(e, [], !1, t);
  const r = (0, Vm.getSchemaTypes)(e.schema), n = (0, Vm.coerceAndCheckDataType)(e, r);
  Gm(e, r, !n, t);
}
function dF(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: i } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, kr.schemaHasRulesButRef)(t, i.RULES) && i.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function hF(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, kr.checkStrictMode)(e, "default is ignored in the schema root");
}
function pF(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, iF.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function mF(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function lv({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: i }) {
  const s = r.$comment;
  if (i.$comment === !0)
    e.code((0, ee._)`${ne.default.self}.logger.log(${s})`);
  else if (typeof i.$comment == "function") {
    const o = (0, ee.str)`${n}/$comment`, a = e.scopeValue("root", { ref: t.root });
    e.code((0, ee._)`${ne.default.self}.opts.$comment(${s}, ${o}, ${a}.schema)`);
  }
}
function yF(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: i, opts: s } = e;
  r.$async ? t.if((0, ee._)`${ne.default.errors} === 0`, () => t.return(ne.default.data), () => t.throw((0, ee._)`new ${i}(${ne.default.vErrors})`)) : (t.assign((0, ee._)`${n}.errors`, ne.default.vErrors), s.unevaluated && gF(e), t.return((0, ee._)`${ne.default.errors} === 0`));
}
function gF({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof ee.Name && e.assign((0, ee._)`${t}.props`, r), n instanceof ee.Name && e.assign((0, ee._)`${t}.items`, n);
}
function Gm(e, t, r, n) {
  const { gen: i, schema: s, data: o, allErrors: a, opts: c, self: u } = e, { RULES: l } = u;
  if (s.$ref && (c.ignoreKeywordsWithRef || !(0, kr.schemaHasRulesButRef)(s, l))) {
    i.block(() => dv(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || $F(e, t), i.block(() => {
    for (const h of l.rules)
      f(h);
    f(l.post);
  });
  function f(h) {
    (0, vf.shouldUseGroup)(s, h) && (h.type ? (i.if((0, Ba.checkDataType)(h.type, o, c.strictNumbers)), zm(e, h), t.length === 1 && t[0] === h.type && r && (i.else(), (0, Ba.reportTypeError)(e)), i.endIf()) : zm(e, h), a || i.if((0, ee._)`${ne.default.errors} === ${n || 0}`));
  }
}
function zm(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: i } } = e;
  i && (0, nF.assignDefaults)(e, t.type), r.block(() => {
    for (const s of t.rules)
      (0, vf.shouldUseRule)(n, s) && dv(e, s.keyword, s.definition, t.type);
  });
}
function $F(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (vF(e, t), e.opts.allowUnionTypes || _F(e, t), wF(e, e.dataTypes));
}
function vF(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      uv(e.dataTypes, r) || _f(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), SF(e, t);
  }
}
function _F(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && _f(e, "use allowUnionTypes to allow union type keyword");
}
function wF(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const i = r[n];
    if (typeof i == "object" && (0, vf.shouldUseRule)(e.schema, i)) {
      const { type: s } = i.definition;
      s.length && !s.some((o) => EF(t, o)) && _f(e, `missing type "${s.join(",")}" for keyword "${n}"`);
    }
  }
}
function EF(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function uv(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function SF(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    uv(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function _f(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, kr.checkStrictMode)(e, t, e.opts.strictTypes);
}
let fv = class {
  constructor(t, r, n) {
    if ((0, Cs.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, kr.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", hv(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Cs.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", ne.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, ee.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, ee.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, ee._)`${r} !== undefined && (${(0, ee.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? gs.reportExtraError : gs.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, gs.reportError)(this, this.def.$dataError || gs.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, gs.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = ee.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = ee.nil, r = ee.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: i, schemaType: s, def: o } = this;
    n.if((0, ee.or)((0, ee._)`${i} === undefined`, r)), t !== ee.nil && n.assign(t, !0), (s.length || o.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== ee.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: i, it: s } = this;
    return (0, ee.or)(o(), a());
    function o() {
      if (n.length) {
        if (!(r instanceof ee.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, ee._)`${(0, Ba.checkDataTypes)(c, r, s.opts.strictNumbers, Ba.DataType.Wrong)}`;
      }
      return ee.nil;
    }
    function a() {
      if (i.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: i.validateSchema });
        return (0, ee._)`!${c}(${r})`;
      }
      return ee.nil;
    }
  }
  subschema(t, r) {
    const n = (0, Ol.getSubschema)(this.it, t);
    (0, Ol.extendSubschemaData)(n, this.it, t), (0, Ol.extendSubschemaMode)(n, t);
    const i = { ...this.it, ...n, items: void 0, props: void 0 };
    return uF(i, r), i;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: i } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = kr.mergeEvaluated.props(i, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = kr.mergeEvaluated.items(i, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: i } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return i.if(r, () => this.mergeEvaluated(t, ee.Name)), !0;
  }
};
ir.KeywordCxt = fv;
function dv(e, t, r, n) {
  const i = new fv(e, r, t);
  "code" in r ? r.code(i, n) : i.$data && r.validate ? (0, Cs.funcKeywordCode)(i, r) : "macro" in r ? (0, Cs.macroKeywordCode)(i, r) : (r.compile || r.validate) && (0, Cs.funcKeywordCode)(i, r);
}
const bF = /^\/(?:[^~]|~0|~1)*$/, PF = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function hv(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let i, s;
  if (e === "")
    return ne.default.rootData;
  if (e[0] === "/") {
    if (!bF.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    i = e, s = ne.default.rootData;
  } else {
    const u = PF.exec(e);
    if (!u)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +u[1];
    if (i = u[2], i === "#") {
      if (l >= t)
        throw new Error(c("property/index", l));
      return n[t - l];
    }
    if (l > t)
      throw new Error(c("data", l));
    if (s = r[t - l], !i)
      return s;
  }
  let o = s;
  const a = i.split("/");
  for (const u of a)
    u && (s = (0, ee._)`${s}${(0, ee.getProperty)((0, kr.unescapeJsonPointer)(u))}`, o = (0, ee._)`${o} && ${s}`);
  return o;
  function c(u, l) {
    return `Cannot access ${u} ${l} levels up, current level is ${t}`;
  }
}
ir.getData = hv;
var Ao = {};
Object.defineProperty(Ao, "__esModule", { value: !0 });
class TF extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
Ao.default = TF;
var Qi = {};
Object.defineProperty(Qi, "__esModule", { value: !0 });
const Rl = et;
let AF = class extends Error {
  constructor(t, r, n, i) {
    super(i || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Rl.resolveUrl)(t, r, n), this.missingSchema = (0, Rl.normalizeId)((0, Rl.getFullPath)(t, this.missingRef));
  }
};
Qi.default = AF;
var $t = {};
Object.defineProperty($t, "__esModule", { value: !0 });
$t.resolveSchema = $t.getCompilingSchema = $t.resolveRef = $t.compileSchema = $t.SchemaEnv = void 0;
const Xt = oe, NF = Ao, kn = Mt, rr = et, Km = K, OF = ir;
let Rc = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, rr.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
$t.SchemaEnv = Rc;
function wf(e) {
  const t = pv.call(this, e);
  if (t)
    return t;
  const r = (0, rr.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: i } = this.opts.code, { ownProperties: s } = this.opts, o = new Xt.CodeGen(this.scope, { es5: n, lines: i, ownProperties: s });
  let a;
  e.$async && (a = o.scopeValue("Error", {
    ref: NF.default,
    code: (0, Xt._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = o.scopeName("validate");
  e.validateName = c;
  const u = {
    gen: o,
    allErrors: this.opts.allErrors,
    data: kn.default.data,
    parentData: kn.default.parentData,
    parentDataProperty: kn.default.parentDataProperty,
    dataNames: [kn.default.data],
    dataPathArr: [Xt.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Xt.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: a,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Xt.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Xt._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, OF.validateFunctionCode)(u), o.optimize(this.opts.code.optimize);
    const f = o.toString();
    l = `${o.scopeRefs(kn.default.scope)}return ${f}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const p = new Function(`${kn.default.self}`, `${kn.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: p }), p.errors = null, p.schema = e.schema, p.schemaEnv = e, e.$async && (p.$async = !0), this.opts.code.source === !0 && (p.source = { validateName: c, validateCode: f, scopeValues: o._values }), this.opts.unevaluated) {
      const { props: y, items: $ } = u;
      p.evaluated = {
        props: y instanceof Xt.Name ? void 0 : y,
        items: $ instanceof Xt.Name ? void 0 : $,
        dynamicProps: y instanceof Xt.Name,
        dynamicItems: $ instanceof Xt.Name
      }, p.source && (p.source.evaluated = (0, Xt.stringify)(p.evaluated));
    }
    return e.validate = p, e;
  } catch (f) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), f;
  } finally {
    this._compilations.delete(e);
  }
}
$t.compileSchema = wf;
function RF(e, t, r) {
  var n;
  r = (0, rr.resolveUrl)(this.opts.uriResolver, t, r);
  const i = e.refs[r];
  if (i)
    return i;
  let s = kF.call(this, e, r);
  if (s === void 0) {
    const o = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: a } = this.opts;
    o && (s = new Rc({ schema: o, schemaId: a, root: e, baseId: t }));
  }
  if (s !== void 0)
    return e.refs[r] = IF.call(this, s);
}
$t.resolveRef = RF;
function IF(e) {
  return (0, rr.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : wf.call(this, e);
}
function pv(e) {
  for (const t of this._compilations)
    if (CF(t, e))
      return t;
}
$t.getCompilingSchema = pv;
function CF(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function kF(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Ic.call(this, e, t);
}
function Ic(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, rr._getFullPath)(this.opts.uriResolver, r);
  let i = (0, rr.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === i)
    return Il.call(this, r, e);
  const s = (0, rr.normalizeId)(n), o = this.refs[s] || this.schemas[s];
  if (typeof o == "string") {
    const a = Ic.call(this, e, o);
    return typeof (a == null ? void 0 : a.schema) != "object" ? void 0 : Il.call(this, r, a);
  }
  if (typeof (o == null ? void 0 : o.schema) == "object") {
    if (o.validate || wf.call(this, o), s === (0, rr.normalizeId)(t)) {
      const { schema: a } = o, { schemaId: c } = this.opts, u = a[c];
      return u && (i = (0, rr.resolveUrl)(this.opts.uriResolver, i, u)), new Rc({ schema: a, schemaId: c, root: e, baseId: i });
    }
    return Il.call(this, r, o);
  }
}
$t.resolveSchema = Ic;
const DF = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Il(e, { baseId: t, schema: r, root: n }) {
  var i;
  if (((i = e.fragment) === null || i === void 0 ? void 0 : i[0]) !== "/")
    return;
  for (const a of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Km.unescapeFragment)(a)];
    if (c === void 0)
      return;
    r = c;
    const u = typeof r == "object" && r[this.opts.schemaId];
    !DF.has(a) && u && (t = (0, rr.resolveUrl)(this.opts.uriResolver, t, u));
  }
  let s;
  if (typeof r != "boolean" && r.$ref && !(0, Km.schemaHasRulesButRef)(r, this.RULES)) {
    const a = (0, rr.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    s = Ic.call(this, n, a);
  }
  const { schemaId: o } = this.opts;
  if (s = s || new Rc({ schema: r, schemaId: o, root: n, baseId: t }), s.schema !== s.root.schema)
    return s;
}
const FF = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", jF = "Meta-schema for $data reference (JSON AnySchema extension proposal)", LF = "object", UF = [
  "$data"
], MF = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, xF = !1, qF = {
  $id: FF,
  description: jF,
  type: LF,
  required: UF,
  properties: MF,
  additionalProperties: xF
};
var Ef = {}, Cc = { exports: {} };
const BF = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), mv = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function yv(e) {
  let t = "", r = 0, n = 0;
  for (n = 0; n < e.length; n++)
    if (r = e[n].charCodeAt(0), r !== 48) {
      if (!(r >= 48 && r <= 57 || r >= 65 && r <= 70 || r >= 97 && r <= 102))
        return "";
      t += e[n];
      break;
    }
  for (n += 1; n < e.length; n++) {
    if (r = e[n].charCodeAt(0), !(r >= 48 && r <= 57 || r >= 65 && r <= 70 || r >= 97 && r <= 102))
      return "";
    t += e[n];
  }
  return t;
}
const VF = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function Wm(e) {
  return e.length = 0, !0;
}
function HF(e, t, r) {
  if (e.length) {
    const n = yv(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function GF(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], i = [];
  let s = !1, o = !1, a = HF;
  for (let c = 0; c < e.length; c++) {
    const u = e[c];
    if (!(u === "[" || u === "]"))
      if (u === ":") {
        if (s === !0 && (o = !0), !a(i, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        c > 0 && e[c - 1] === ":" && (s = !0), n.push(":");
        continue;
      } else if (u === "%") {
        if (!a(i, n, r))
          break;
        a = Wm;
      } else {
        i.push(u);
        continue;
      }
  }
  return i.length && (a === Wm ? r.zone = i.join("") : o ? n.push(i.join("")) : n.push(yv(i))), r.address = n.join(""), r;
}
function gv(e) {
  if (zF(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = GF(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function zF(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function KF(e) {
  let t = e;
  const r = [];
  let n = -1, i = 0;
  for (; i = t.length; ) {
    if (i === 1) {
      if (t === ".")
        break;
      if (t === "/") {
        r.push("/");
        break;
      } else {
        r.push(t);
        break;
      }
    } else if (i === 2) {
      if (t[0] === ".") {
        if (t[1] === ".")
          break;
        if (t[1] === "/") {
          t = t.slice(2);
          continue;
        }
      } else if (t[0] === "/" && (t[1] === "." || t[1] === "/")) {
        r.push("/");
        break;
      }
    } else if (i === 3 && t === "/..") {
      r.length !== 0 && r.pop(), r.push("/");
      break;
    }
    if (t[0] === ".") {
      if (t[1] === ".") {
        if (t[2] === "/") {
          t = t.slice(3);
          continue;
        }
      } else if (t[1] === "/") {
        t = t.slice(2);
        continue;
      }
    } else if (t[0] === "/" && t[1] === ".") {
      if (t[2] === "/") {
        t = t.slice(2);
        continue;
      } else if (t[2] === "." && t[3] === "/") {
        t = t.slice(3), r.length !== 0 && r.pop();
        continue;
      }
    }
    if ((n = t.indexOf("/", 1)) === -1) {
      r.push(t);
      break;
    } else
      r.push(t.slice(0, n)), t = t.slice(n);
  }
  return r.join("");
}
function WF(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function YF(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!mv(r)) {
      const n = gv(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var $v = {
  nonSimpleDomain: VF,
  recomposeAuthority: YF,
  normalizeComponentEncoding: WF,
  removeDotSegments: KF,
  isIPv4: mv,
  isUUID: BF,
  normalizeIPv6: gv
};
const { isUUID: JF } = $v, XF = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function vv(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function _v(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function wv(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function QF(e) {
  return e.secure = vv(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function ZF(e) {
  if ((e.port === (vv(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function ej(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(XF);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const i = `${n}:${t.nid || e.nid}`, s = Sf(i);
    e.path = void 0, s && (e = s.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function tj(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), i = `${r}:${t.nid || n}`, s = Sf(i);
  s && (e = s.serialize(e, t));
  const o = e, a = e.nss;
  return o.path = `${n || t.nid}:${a}`, t.skipEscape = !0, o;
}
function rj(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !JF(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function nj(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const Ev = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: _v,
    serialize: wv
  }
), ij = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: Ev.domainHost,
    parse: _v,
    serialize: wv
  }
), wa = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: QF,
    serialize: ZF
  }
), sj = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: wa.domainHost,
    parse: wa.parse,
    serialize: wa.serialize
  }
), oj = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: ej,
    serialize: tj,
    skipNormalize: !0
  }
), aj = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: rj,
    serialize: nj,
    skipNormalize: !0
  }
), Va = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: Ev,
    https: ij,
    ws: wa,
    wss: sj,
    urn: oj,
    "urn:uuid": aj
  }
);
Object.setPrototypeOf(Va, null);
function Sf(e) {
  return e && (Va[
    /** @type {SchemeName} */
    e
  ] || Va[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var cj = {
  SCHEMES: Va,
  getSchemeHandler: Sf
};
const { normalizeIPv6: lj, removeDotSegments: Ss, recomposeAuthority: uj, normalizeComponentEncoding: ra, isIPv4: fj, nonSimpleDomain: dj } = $v, { SCHEMES: hj, getSchemeHandler: Sv } = cj;
function pj(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  mr(Ur(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  Ur(mr(e, t), t)), e;
}
function mj(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, i = bv(Ur(e, n), Ur(t, n), n, !0);
  return n.skipEscape = !0, mr(i, n);
}
function bv(e, t, r, n) {
  const i = {};
  return n || (e = Ur(mr(e, r), r), t = Ur(mr(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (i.scheme = t.scheme, i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = Ss(t.path || ""), i.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = Ss(t.path || ""), i.query = t.query) : (t.path ? (t.path[0] === "/" ? i.path = Ss(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? i.path = "/" + t.path : e.path ? i.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : i.path = t.path, i.path = Ss(i.path)), i.query = t.query) : (i.path = e.path, t.query !== void 0 ? i.query = t.query : i.query = e.query), i.userinfo = e.userinfo, i.host = e.host, i.port = e.port), i.scheme = e.scheme), i.fragment = t.fragment, i;
}
function yj(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = mr(ra(Ur(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = mr(ra(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = mr(ra(Ur(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = mr(ra(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function mr(e, t) {
  const r = {
    host: e.host,
    scheme: e.scheme,
    userinfo: e.userinfo,
    port: e.port,
    path: e.path,
    query: e.query,
    nid: e.nid,
    nss: e.nss,
    uuid: e.uuid,
    fragment: e.fragment,
    reference: e.reference,
    resourceName: e.resourceName,
    secure: e.secure,
    error: ""
  }, n = Object.assign({}, t), i = [], s = Sv(n.scheme || r.scheme);
  s && s.serialize && s.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && i.push(r.scheme, ":");
  const o = uj(r);
  if (o !== void 0 && (n.reference !== "suffix" && i.push("//"), i.push(o), r.path && r.path[0] !== "/" && i.push("/")), r.path !== void 0) {
    let a = r.path;
    !n.absolutePath && (!s || !s.absolutePath) && (a = Ss(a)), o === void 0 && a[0] === "/" && a[1] === "/" && (a = "/%2F" + a.slice(2)), i.push(a);
  }
  return r.query !== void 0 && i.push("?", r.query), r.fragment !== void 0 && i.push("#", r.fragment), i.join("");
}
const gj = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function Ur(e, t) {
  const r = Object.assign({}, t), n = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  };
  let i = !1;
  r.reference === "suffix" && (r.scheme ? e = r.scheme + ":" + e : e = "//" + e);
  const s = e.match(gj);
  if (s) {
    if (n.scheme = s[1], n.userinfo = s[3], n.host = s[4], n.port = parseInt(s[5], 10), n.path = s[6] || "", n.query = s[7], n.fragment = s[8], isNaN(n.port) && (n.port = s[5]), n.host)
      if (fj(n.host) === !1) {
        const c = lj(n.host);
        n.host = c.host.toLowerCase(), i = c.isIPV6;
      } else
        i = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const o = Sv(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!o || !o.unicodeSupport) && n.host && (r.domainHost || o && o.domainHost) && i === !1 && dj(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (a) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + a;
      }
    (!o || o && !o.skipNormalize) && (e.indexOf("%") !== -1 && (n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), n.host !== void 0 && (n.host = unescape(n.host))), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), o && o.parse && o.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const bf = {
  SCHEMES: hj,
  normalize: pj,
  resolve: mj,
  resolveComponent: bv,
  equal: yj,
  serialize: mr,
  parse: Ur
};
Cc.exports = bf;
Cc.exports.default = bf;
Cc.exports.fastUri = bf;
var Pv = Cc.exports;
Object.defineProperty(Ef, "__esModule", { value: !0 });
const Tv = Pv;
Tv.code = 'require("ajv/dist/runtime/uri").default';
Ef.default = Tv;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = ir;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = oe;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = Ao, i = Qi, s = Qn, o = $t, a = oe, c = et, u = Be, l = K, f = qF, h = Ef, p = (C, S) => new RegExp(C, S);
  p.code = "new RegExp";
  const y = ["removeAdditional", "useDefaults", "coerceTypes"], $ = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), v = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, w = 200;
  function T(C) {
    var S, N, b, d, _, A, E, g, D, O, W, me, Ee, Ae, Ie, it, Se, qe, Yt, xt, kt, qt, wr, Er, Sr;
    const Dt = C.strict, Bt = (S = C.code) === null || S === void 0 ? void 0 : S.optimize, br = Bt === !0 || Bt === void 0 ? 1 : Bt || 0, qr = (b = (N = C.code) === null || N === void 0 ? void 0 : N.regExp) !== null && b !== void 0 ? b : p, At = (d = C.uriResolver) !== null && d !== void 0 ? d : h.default;
    return {
      strictSchema: (A = (_ = C.strictSchema) !== null && _ !== void 0 ? _ : Dt) !== null && A !== void 0 ? A : !0,
      strictNumbers: (g = (E = C.strictNumbers) !== null && E !== void 0 ? E : Dt) !== null && g !== void 0 ? g : !0,
      strictTypes: (O = (D = C.strictTypes) !== null && D !== void 0 ? D : Dt) !== null && O !== void 0 ? O : "log",
      strictTuples: (me = (W = C.strictTuples) !== null && W !== void 0 ? W : Dt) !== null && me !== void 0 ? me : "log",
      strictRequired: (Ae = (Ee = C.strictRequired) !== null && Ee !== void 0 ? Ee : Dt) !== null && Ae !== void 0 ? Ae : !1,
      code: C.code ? { ...C.code, optimize: br, regExp: qr } : { optimize: br, regExp: qr },
      loopRequired: (Ie = C.loopRequired) !== null && Ie !== void 0 ? Ie : w,
      loopEnum: (it = C.loopEnum) !== null && it !== void 0 ? it : w,
      meta: (Se = C.meta) !== null && Se !== void 0 ? Se : !0,
      messages: (qe = C.messages) !== null && qe !== void 0 ? qe : !0,
      inlineRefs: (Yt = C.inlineRefs) !== null && Yt !== void 0 ? Yt : !0,
      schemaId: (xt = C.schemaId) !== null && xt !== void 0 ? xt : "$id",
      addUsedSchema: (kt = C.addUsedSchema) !== null && kt !== void 0 ? kt : !0,
      validateSchema: (qt = C.validateSchema) !== null && qt !== void 0 ? qt : !0,
      validateFormats: (wr = C.validateFormats) !== null && wr !== void 0 ? wr : !0,
      unicodeRegExp: (Er = C.unicodeRegExp) !== null && Er !== void 0 ? Er : !0,
      int32range: (Sr = C.int32range) !== null && Sr !== void 0 ? Sr : !0,
      uriResolver: At
    };
  }
  class I {
    constructor(S = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), S = this.opts = { ...S, ...T(S) };
      const { es5: N, lines: b } = this.opts.code;
      this.scope = new a.ValueScope({ scope: {}, prefixes: $, es5: N, lines: b }), this.logger = B(S.logger);
      const d = S.validateFormats;
      S.validateFormats = !1, this.RULES = (0, s.getRules)(), F.call(this, v, S, "NOT SUPPORTED"), F.call(this, m, S, "DEPRECATED", "warn"), this._metaOpts = Z.call(this), S.formats && ue.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), S.keywords && R.call(this, S.keywords), typeof S.meta == "object" && this.addMetaSchema(S.meta), z.call(this), S.validateFormats = d;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: S, meta: N, schemaId: b } = this.opts;
      let d = f;
      b === "id" && (d = { ...f }, d.id = d.$id, delete d.$id), N && S && this.addMetaSchema(d, d[b], !1);
    }
    defaultMeta() {
      const { meta: S, schemaId: N } = this.opts;
      return this.opts.defaultMeta = typeof S == "object" ? S[N] || S : void 0;
    }
    validate(S, N) {
      let b;
      if (typeof S == "string") {
        if (b = this.getSchema(S), !b)
          throw new Error(`no schema with key or ref "${S}"`);
      } else
        b = this.compile(S);
      const d = b(N);
      return "$async" in b || (this.errors = b.errors), d;
    }
    compile(S, N) {
      const b = this._addSchema(S, N);
      return b.validate || this._compileSchemaEnv(b);
    }
    compileAsync(S, N) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: b } = this.opts;
      return d.call(this, S, N);
      async function d(O, W) {
        await _.call(this, O.$schema);
        const me = this._addSchema(O, W);
        return me.validate || A.call(this, me);
      }
      async function _(O) {
        O && !this.getSchema(O) && await d.call(this, { $ref: O }, !0);
      }
      async function A(O) {
        try {
          return this._compileSchemaEnv(O);
        } catch (W) {
          if (!(W instanceof i.default))
            throw W;
          return E.call(this, W), await g.call(this, W.missingSchema), A.call(this, O);
        }
      }
      function E({ missingSchema: O, missingRef: W }) {
        if (this.refs[O])
          throw new Error(`AnySchema ${O} is loaded but ${W} cannot be resolved`);
      }
      async function g(O) {
        const W = await D.call(this, O);
        this.refs[O] || await _.call(this, W.$schema), this.refs[O] || this.addSchema(W, O, N);
      }
      async function D(O) {
        const W = this._loading[O];
        if (W)
          return W;
        try {
          return await (this._loading[O] = b(O));
        } finally {
          delete this._loading[O];
        }
      }
    }
    // Adds schema to the instance
    addSchema(S, N, b, d = this.opts.validateSchema) {
      if (Array.isArray(S)) {
        for (const A of S)
          this.addSchema(A, void 0, b, d);
        return this;
      }
      let _;
      if (typeof S == "object") {
        const { schemaId: A } = this.opts;
        if (_ = S[A], _ !== void 0 && typeof _ != "string")
          throw new Error(`schema ${A} must be string`);
      }
      return N = (0, c.normalizeId)(N || _), this._checkUnique(N), this.schemas[N] = this._addSchema(S, b, N, d, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(S, N, b = this.opts.validateSchema) {
      return this.addSchema(S, N, !0, b), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(S, N) {
      if (typeof S == "boolean")
        return !0;
      let b;
      if (b = S.$schema, b !== void 0 && typeof b != "string")
        throw new Error("$schema must be a string");
      if (b = b || this.opts.defaultMeta || this.defaultMeta(), !b)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const d = this.validate(b, S);
      if (!d && N) {
        const _ = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(_);
        else
          throw new Error(_);
      }
      return d;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(S) {
      let N;
      for (; typeof (N = H.call(this, S)) == "string"; )
        S = N;
      if (N === void 0) {
        const { schemaId: b } = this.opts, d = new o.SchemaEnv({ schema: {}, schemaId: b });
        if (N = o.resolveSchema.call(this, d, S), !N)
          return;
        this.refs[S] = N;
      }
      return N.validate || this._compileSchemaEnv(N);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(S) {
      if (S instanceof RegExp)
        return this._removeAllSchemas(this.schemas, S), this._removeAllSchemas(this.refs, S), this;
      switch (typeof S) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const N = H.call(this, S);
          return typeof N == "object" && this._cache.delete(N.schema), delete this.schemas[S], delete this.refs[S], this;
        }
        case "object": {
          const N = S;
          this._cache.delete(N);
          let b = S[this.opts.schemaId];
          return b && (b = (0, c.normalizeId)(b), delete this.schemas[b], delete this.refs[b]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(S) {
      for (const N of S)
        this.addKeyword(N);
      return this;
    }
    addKeyword(S, N) {
      let b;
      if (typeof S == "string")
        b = S, typeof N == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), N.keyword = b);
      else if (typeof S == "object" && N === void 0) {
        if (N = S, b = N.keyword, Array.isArray(b) && !b.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (j.call(this, b, N), !N)
        return (0, l.eachItem)(b, (_) => L.call(this, _)), this;
      U.call(this, N);
      const d = {
        ...N,
        type: (0, u.getJSONTypes)(N.type),
        schemaType: (0, u.getJSONTypes)(N.schemaType)
      };
      return (0, l.eachItem)(b, d.type.length === 0 ? (_) => L.call(this, _, d) : (_) => d.type.forEach((A) => L.call(this, _, d, A))), this;
    }
    getKeyword(S) {
      const N = this.RULES.all[S];
      return typeof N == "object" ? N.definition : !!N;
    }
    // Remove keyword
    removeKeyword(S) {
      const { RULES: N } = this;
      delete N.keywords[S], delete N.all[S];
      for (const b of N.rules) {
        const d = b.rules.findIndex((_) => _.keyword === S);
        d >= 0 && b.rules.splice(d, 1);
      }
      return this;
    }
    // Add format
    addFormat(S, N) {
      return typeof N == "string" && (N = new RegExp(N)), this.formats[S] = N, this;
    }
    errorsText(S = this.errors, { separator: N = ", ", dataVar: b = "data" } = {}) {
      return !S || S.length === 0 ? "No errors" : S.map((d) => `${b}${d.instancePath} ${d.message}`).reduce((d, _) => d + N + _);
    }
    $dataMetaSchema(S, N) {
      const b = this.RULES.all;
      S = JSON.parse(JSON.stringify(S));
      for (const d of N) {
        const _ = d.split("/").slice(1);
        let A = S;
        for (const E of _)
          A = A[E];
        for (const E in b) {
          const g = b[E];
          if (typeof g != "object")
            continue;
          const { $data: D } = g.definition, O = A[E];
          D && O && (A[E] = q(O));
        }
      }
      return S;
    }
    _removeAllSchemas(S, N) {
      for (const b in S) {
        const d = S[b];
        (!N || N.test(b)) && (typeof d == "string" ? delete S[b] : d && !d.meta && (this._cache.delete(d.schema), delete S[b]));
      }
    }
    _addSchema(S, N, b, d = this.opts.validateSchema, _ = this.opts.addUsedSchema) {
      let A;
      const { schemaId: E } = this.opts;
      if (typeof S == "object")
        A = S[E];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof S != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let g = this._cache.get(S);
      if (g !== void 0)
        return g;
      b = (0, c.normalizeId)(A || b);
      const D = c.getSchemaRefs.call(this, S, b);
      return g = new o.SchemaEnv({ schema: S, schemaId: E, meta: N, baseId: b, localRefs: D }), this._cache.set(g.schema, g), _ && !b.startsWith("#") && (b && this._checkUnique(b), this.refs[b] = g), d && this.validateSchema(S, !0), g;
    }
    _checkUnique(S) {
      if (this.schemas[S] || this.refs[S])
        throw new Error(`schema with key or id "${S}" already exists`);
    }
    _compileSchemaEnv(S) {
      if (S.meta ? this._compileMetaSchema(S) : o.compileSchema.call(this, S), !S.validate)
        throw new Error("ajv implementation error");
      return S.validate;
    }
    _compileMetaSchema(S) {
      const N = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, S);
      } finally {
        this.opts = N;
      }
    }
  }
  I.ValidationError = n.default, I.MissingRefError = i.default, e.default = I;
  function F(C, S, N, b = "error") {
    for (const d in C) {
      const _ = d;
      _ in S && this.logger[b](`${N}: option ${d}. ${C[_]}`);
    }
  }
  function H(C) {
    return C = (0, c.normalizeId)(C), this.schemas[C] || this.refs[C];
  }
  function z() {
    const C = this.opts.schemas;
    if (C)
      if (Array.isArray(C))
        this.addSchema(C);
      else
        for (const S in C)
          this.addSchema(C[S], S);
  }
  function ue() {
    for (const C in this.opts.formats) {
      const S = this.opts.formats[C];
      S && this.addFormat(C, S);
    }
  }
  function R(C) {
    if (Array.isArray(C)) {
      this.addVocabulary(C);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const S in C) {
      const N = C[S];
      N.keyword || (N.keyword = S), this.addKeyword(N);
    }
  }
  function Z() {
    const C = { ...this.opts };
    for (const S of y)
      delete C[S];
    return C;
  }
  const x = { log() {
  }, warn() {
  }, error() {
  } };
  function B(C) {
    if (C === !1)
      return x;
    if (C === void 0)
      return console;
    if (C.log && C.warn && C.error)
      return C;
    throw new Error("logger must implement log, warn and error methods");
  }
  const Q = /^[a-z_$][a-z0-9_$:-]*$/i;
  function j(C, S) {
    const { RULES: N } = this;
    if ((0, l.eachItem)(C, (b) => {
      if (N.keywords[b])
        throw new Error(`Keyword ${b} is already defined`);
      if (!Q.test(b))
        throw new Error(`Keyword ${b} has invalid name`);
    }), !!S && S.$data && !("code" in S || "validate" in S))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function L(C, S, N) {
    var b;
    const d = S == null ? void 0 : S.post;
    if (N && d)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: _ } = this;
    let A = d ? _.post : _.rules.find(({ type: g }) => g === N);
    if (A || (A = { type: N, rules: [] }, _.rules.push(A)), _.keywords[C] = !0, !S)
      return;
    const E = {
      keyword: C,
      definition: {
        ...S,
        type: (0, u.getJSONTypes)(S.type),
        schemaType: (0, u.getJSONTypes)(S.schemaType)
      }
    };
    S.before ? V.call(this, A, E, S.before) : A.rules.push(E), _.all[C] = E, (b = S.implements) === null || b === void 0 || b.forEach((g) => this.addKeyword(g));
  }
  function V(C, S, N) {
    const b = C.rules.findIndex((d) => d.keyword === N);
    b >= 0 ? C.rules.splice(b, 0, S) : (C.rules.push(S), this.logger.warn(`rule ${N} is not defined`));
  }
  function U(C) {
    let { metaSchema: S } = C;
    S !== void 0 && (C.$data && this.opts.$data && (S = q(S)), C.validateSchema = this.compile(S, !0));
  }
  const G = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function q(C) {
    return { anyOf: [C, G] };
  }
})(j$);
var Pf = {}, Tf = {}, Af = {};
Object.defineProperty(Af, "__esModule", { value: !0 });
const $j = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Af.default = $j;
var Mr = {};
Object.defineProperty(Mr, "__esModule", { value: !0 });
Mr.callRef = Mr.getValidate = void 0;
const vj = Qi, Ym = he, Nt = oe, mi = Mt, Jm = $t, na = K, _j = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: i, schemaEnv: s, validateName: o, opts: a, self: c } = n, { root: u } = s;
    if ((r === "#" || r === "#/") && i === u.baseId)
      return f();
    const l = Jm.resolveRef.call(c, u, i, r);
    if (l === void 0)
      throw new vj.default(n.opts.uriResolver, i, r);
    if (l instanceof Jm.SchemaEnv)
      return h(l);
    return p(l);
    function f() {
      if (s === u)
        return Ea(e, o, s, s.$async);
      const y = t.scopeValue("root", { ref: u });
      return Ea(e, (0, Nt._)`${y}.validate`, u, u.$async);
    }
    function h(y) {
      const $ = Av(e, y);
      Ea(e, $, y, y.$async);
    }
    function p(y) {
      const $ = t.scopeValue("schema", a.code.source === !0 ? { ref: y, code: (0, Nt.stringify)(y) } : { ref: y }), v = t.name("valid"), m = e.subschema({
        schema: y,
        dataTypes: [],
        schemaPath: Nt.nil,
        topSchemaRef: $,
        errSchemaPath: r
      }, v);
      e.mergeEvaluated(m), e.ok(v);
    }
  }
};
function Av(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Nt._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Mr.getValidate = Av;
function Ea(e, t, r, n) {
  const { gen: i, it: s } = e, { allErrors: o, schemaEnv: a, opts: c } = s, u = c.passContext ? mi.default.this : Nt.nil;
  n ? l() : f();
  function l() {
    if (!a.$async)
      throw new Error("async schema referenced by sync schema");
    const y = i.let("valid");
    i.try(() => {
      i.code((0, Nt._)`await ${(0, Ym.callValidateCode)(e, t, u)}`), p(t), o || i.assign(y, !0);
    }, ($) => {
      i.if((0, Nt._)`!(${$} instanceof ${s.ValidationError})`, () => i.throw($)), h($), o || i.assign(y, !1);
    }), e.ok(y);
  }
  function f() {
    e.result((0, Ym.callValidateCode)(e, t, u), () => p(t), () => h(t));
  }
  function h(y) {
    const $ = (0, Nt._)`${y}.errors`;
    i.assign(mi.default.vErrors, (0, Nt._)`${mi.default.vErrors} === null ? ${$} : ${mi.default.vErrors}.concat(${$})`), i.assign(mi.default.errors, (0, Nt._)`${mi.default.vErrors}.length`);
  }
  function p(y) {
    var $;
    if (!s.opts.unevaluated)
      return;
    const v = ($ = r == null ? void 0 : r.validate) === null || $ === void 0 ? void 0 : $.evaluated;
    if (s.props !== !0)
      if (v && !v.dynamicProps)
        v.props !== void 0 && (s.props = na.mergeEvaluated.props(i, v.props, s.props));
      else {
        const m = i.var("props", (0, Nt._)`${y}.evaluated.props`);
        s.props = na.mergeEvaluated.props(i, m, s.props, Nt.Name);
      }
    if (s.items !== !0)
      if (v && !v.dynamicItems)
        v.items !== void 0 && (s.items = na.mergeEvaluated.items(i, v.items, s.items));
      else {
        const m = i.var("items", (0, Nt._)`${y}.evaluated.items`);
        s.items = na.mergeEvaluated.items(i, m, s.items, Nt.Name);
      }
  }
}
Mr.callRef = Ea;
Mr.default = _j;
Object.defineProperty(Tf, "__esModule", { value: !0 });
const wj = Af, Ej = Mr, Sj = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  wj.default,
  Ej.default
];
Tf.default = Sj;
var Nf = {}, Of = {};
Object.defineProperty(Of, "__esModule", { value: !0 });
const Ha = oe, Jr = Ha.operators, Ga = {
  maximum: { okStr: "<=", ok: Jr.LTE, fail: Jr.GT },
  minimum: { okStr: ">=", ok: Jr.GTE, fail: Jr.LT },
  exclusiveMaximum: { okStr: "<", ok: Jr.LT, fail: Jr.GTE },
  exclusiveMinimum: { okStr: ">", ok: Jr.GT, fail: Jr.LTE }
}, bj = {
  message: ({ keyword: e, schemaCode: t }) => (0, Ha.str)`must be ${Ga[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Ha._)`{comparison: ${Ga[e].okStr}, limit: ${t}}`
}, Pj = {
  keyword: Object.keys(Ga),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: bj,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Ha._)`${r} ${Ga[t].fail} ${n} || isNaN(${r})`);
  }
};
Of.default = Pj;
var Rf = {};
Object.defineProperty(Rf, "__esModule", { value: !0 });
const ks = oe, Tj = {
  message: ({ schemaCode: e }) => (0, ks.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, ks._)`{multipleOf: ${e}}`
}, Aj = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Tj,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: i } = e, s = i.opts.multipleOfPrecision, o = t.let("res"), a = s ? (0, ks._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${s}` : (0, ks._)`${o} !== parseInt(${o})`;
    e.fail$data((0, ks._)`(${n} === 0 || (${o} = ${r}/${n}, ${a}))`);
  }
};
Rf.default = Aj;
var If = {}, Cf = {};
Object.defineProperty(Cf, "__esModule", { value: !0 });
function Nv(e) {
  const t = e.length;
  let r = 0, n = 0, i;
  for (; n < t; )
    r++, i = e.charCodeAt(n++), i >= 55296 && i <= 56319 && n < t && (i = e.charCodeAt(n), (i & 64512) === 56320 && n++);
  return r;
}
Cf.default = Nv;
Nv.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(If, "__esModule", { value: !0 });
const qn = oe, Nj = K, Oj = Cf, Rj = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, qn.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, qn._)`{limit: ${e}}`
}, Ij = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: Rj,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: i } = e, s = t === "maxLength" ? qn.operators.GT : qn.operators.LT, o = i.opts.unicode === !1 ? (0, qn._)`${r}.length` : (0, qn._)`${(0, Nj.useFunc)(e.gen, Oj.default)}(${r})`;
    e.fail$data((0, qn._)`${o} ${s} ${n}`);
  }
};
If.default = Ij;
var kf = {};
Object.defineProperty(kf, "__esModule", { value: !0 });
const Cj = he, za = oe, kj = {
  message: ({ schemaCode: e }) => (0, za.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, za._)`{pattern: ${e}}`
}, Dj = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: kj,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: i, it: s } = e, o = s.opts.unicodeRegExp ? "u" : "", a = r ? (0, za._)`(new RegExp(${i}, ${o}))` : (0, Cj.usePattern)(e, n);
    e.fail$data((0, za._)`!${a}.test(${t})`);
  }
};
kf.default = Dj;
var Df = {};
Object.defineProperty(Df, "__esModule", { value: !0 });
const Ds = oe, Fj = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Ds.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Ds._)`{limit: ${e}}`
}, jj = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: Fj,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxProperties" ? Ds.operators.GT : Ds.operators.LT;
    e.fail$data((0, Ds._)`Object.keys(${r}).length ${i} ${n}`);
  }
};
Df.default = jj;
var Ff = {};
Object.defineProperty(Ff, "__esModule", { value: !0 });
const $s = he, Fs = oe, Lj = K, Uj = {
  message: ({ params: { missingProperty: e } }) => (0, Fs.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Fs._)`{missingProperty: ${e}}`
}, Mj = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Uj,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: i, $data: s, it: o } = e, { opts: a } = o;
    if (!s && r.length === 0)
      return;
    const c = r.length >= a.loopRequired;
    if (o.allErrors ? u() : l(), a.strictRequired) {
      const p = e.parentSchema.properties, { definedProperties: y } = e.it;
      for (const $ of r)
        if ((p == null ? void 0 : p[$]) === void 0 && !y.has($)) {
          const v = o.schemaEnv.baseId + o.errSchemaPath, m = `required property "${$}" is not defined at "${v}" (strictRequired)`;
          (0, Lj.checkStrictMode)(o, m, o.opts.strictRequired);
        }
    }
    function u() {
      if (c || s)
        e.block$data(Fs.nil, f);
      else
        for (const p of r)
          (0, $s.checkReportMissingProp)(e, p);
    }
    function l() {
      const p = t.let("missing");
      if (c || s) {
        const y = t.let("valid", !0);
        e.block$data(y, () => h(p, y)), e.ok(y);
      } else
        t.if((0, $s.checkMissingProp)(e, r, p)), (0, $s.reportMissingProp)(e, p), t.else();
    }
    function f() {
      t.forOf("prop", n, (p) => {
        e.setParams({ missingProperty: p }), t.if((0, $s.noPropertyInData)(t, i, p, a.ownProperties), () => e.error());
      });
    }
    function h(p, y) {
      e.setParams({ missingProperty: p }), t.forOf(p, n, () => {
        t.assign(y, (0, $s.propertyInData)(t, i, p, a.ownProperties)), t.if((0, Fs.not)(y), () => {
          e.error(), t.break();
        });
      }, Fs.nil);
    }
  }
};
Ff.default = Mj;
var jf = {};
Object.defineProperty(jf, "__esModule", { value: !0 });
const js = oe, xj = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, js.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, js._)`{limit: ${e}}`
}, qj = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: xj,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxItems" ? js.operators.GT : js.operators.LT;
    e.fail$data((0, js._)`${r}.length ${i} ${n}`);
  }
};
jf.default = qj;
var Lf = {}, No = {};
Object.defineProperty(No, "__esModule", { value: !0 });
const Ov = Oc;
Ov.code = 'require("ajv/dist/runtime/equal").default';
No.default = Ov;
Object.defineProperty(Lf, "__esModule", { value: !0 });
const Cl = Be, Qe = oe, Bj = K, Vj = No, Hj = {
  message: ({ params: { i: e, j: t } }) => (0, Qe.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Qe._)`{i: ${e}, j: ${t}}`
}, Gj = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: Hj,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, parentSchema: s, schemaCode: o, it: a } = e;
    if (!n && !i)
      return;
    const c = t.let("valid"), u = s.items ? (0, Cl.getSchemaTypes)(s.items) : [];
    e.block$data(c, l, (0, Qe._)`${o} === false`), e.ok(c);
    function l() {
      const y = t.let("i", (0, Qe._)`${r}.length`), $ = t.let("j");
      e.setParams({ i: y, j: $ }), t.assign(c, !0), t.if((0, Qe._)`${y} > 1`, () => (f() ? h : p)(y, $));
    }
    function f() {
      return u.length > 0 && !u.some((y) => y === "object" || y === "array");
    }
    function h(y, $) {
      const v = t.name("item"), m = (0, Cl.checkDataTypes)(u, v, a.opts.strictNumbers, Cl.DataType.Wrong), w = t.const("indices", (0, Qe._)`{}`);
      t.for((0, Qe._)`;${y}--;`, () => {
        t.let(v, (0, Qe._)`${r}[${y}]`), t.if(m, (0, Qe._)`continue`), u.length > 1 && t.if((0, Qe._)`typeof ${v} == "string"`, (0, Qe._)`${v} += "_"`), t.if((0, Qe._)`typeof ${w}[${v}] == "number"`, () => {
          t.assign($, (0, Qe._)`${w}[${v}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Qe._)`${w}[${v}] = ${y}`);
      });
    }
    function p(y, $) {
      const v = (0, Bj.useFunc)(t, Vj.default), m = t.name("outer");
      t.label(m).for((0, Qe._)`;${y}--;`, () => t.for((0, Qe._)`${$} = ${y}; ${$}--;`, () => t.if((0, Qe._)`${v}(${r}[${y}], ${r}[${$}])`, () => {
        e.error(), t.assign(c, !1).break(m);
      })));
    }
  }
};
Lf.default = Gj;
var Uf = {};
Object.defineProperty(Uf, "__esModule", { value: !0 });
const du = oe, zj = K, Kj = No, Wj = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, du._)`{allowedValue: ${e}}`
}, Yj = {
  keyword: "const",
  $data: !0,
  error: Wj,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: i, schema: s } = e;
    n || s && typeof s == "object" ? e.fail$data((0, du._)`!${(0, zj.useFunc)(t, Kj.default)}(${r}, ${i})`) : e.fail((0, du._)`${s} !== ${r}`);
  }
};
Uf.default = Yj;
var Mf = {};
Object.defineProperty(Mf, "__esModule", { value: !0 });
const bs = oe, Jj = K, Xj = No, Qj = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, bs._)`{allowedValues: ${e}}`
}, Zj = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: Qj,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, schemaCode: s, it: o } = e;
    if (!n && i.length === 0)
      throw new Error("enum must have non-empty array");
    const a = i.length >= o.opts.loopEnum;
    let c;
    const u = () => c ?? (c = (0, Jj.useFunc)(t, Xj.default));
    let l;
    if (a || n)
      l = t.let("valid"), e.block$data(l, f);
    else {
      if (!Array.isArray(i))
        throw new Error("ajv implementation error");
      const p = t.const("vSchema", s);
      l = (0, bs.or)(...i.map((y, $) => h(p, $)));
    }
    e.pass(l);
    function f() {
      t.assign(l, !1), t.forOf("v", s, (p) => t.if((0, bs._)`${u()}(${r}, ${p})`, () => t.assign(l, !0).break()));
    }
    function h(p, y) {
      const $ = i[y];
      return typeof $ == "object" && $ !== null ? (0, bs._)`${u()}(${r}, ${p}[${y}])` : (0, bs._)`${r} === ${$}`;
    }
  }
};
Mf.default = Zj;
Object.defineProperty(Nf, "__esModule", { value: !0 });
const e2 = Of, t2 = Rf, r2 = If, n2 = kf, i2 = Df, s2 = Ff, o2 = jf, a2 = Lf, c2 = Uf, l2 = Mf, u2 = [
  // number
  e2.default,
  t2.default,
  // string
  r2.default,
  n2.default,
  // object
  i2.default,
  s2.default,
  // array
  o2.default,
  a2.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  c2.default,
  l2.default
];
Nf.default = u2;
var xf = {}, Zi = {};
Object.defineProperty(Zi, "__esModule", { value: !0 });
Zi.validateAdditionalItems = void 0;
const Bn = oe, hu = K, f2 = {
  message: ({ params: { len: e } }) => (0, Bn.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Bn._)`{limit: ${e}}`
}, d2 = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: f2,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, hu.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Rv(e, n);
  }
};
function Rv(e, t) {
  const { gen: r, schema: n, data: i, keyword: s, it: o } = e;
  o.items = !0;
  const a = r.const("len", (0, Bn._)`${i}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Bn._)`${a} <= ${t.length}`);
  else if (typeof n == "object" && !(0, hu.alwaysValidSchema)(o, n)) {
    const u = r.var("valid", (0, Bn._)`${a} <= ${t.length}`);
    r.if((0, Bn.not)(u), () => c(u)), e.ok(u);
  }
  function c(u) {
    r.forRange("i", t.length, a, (l) => {
      e.subschema({ keyword: s, dataProp: l, dataPropType: hu.Type.Num }, u), o.allErrors || r.if((0, Bn.not)(u), () => r.break());
    });
  }
}
Zi.validateAdditionalItems = Rv;
Zi.default = d2;
var qf = {}, es = {};
Object.defineProperty(es, "__esModule", { value: !0 });
es.validateTuple = void 0;
const Xm = oe, Sa = K, h2 = he, p2 = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Iv(e, "additionalItems", t);
    r.items = !0, !(0, Sa.alwaysValidSchema)(r, t) && e.ok((0, h2.validateArray)(e));
  }
};
function Iv(e, t, r = e.schema) {
  const { gen: n, parentSchema: i, data: s, keyword: o, it: a } = e;
  l(i), a.opts.unevaluated && r.length && a.items !== !0 && (a.items = Sa.mergeEvaluated.items(n, r.length, a.items));
  const c = n.name("valid"), u = n.const("len", (0, Xm._)`${s}.length`);
  r.forEach((f, h) => {
    (0, Sa.alwaysValidSchema)(a, f) || (n.if((0, Xm._)`${u} > ${h}`, () => e.subschema({
      keyword: o,
      schemaProp: h,
      dataProp: h
    }, c)), e.ok(c));
  });
  function l(f) {
    const { opts: h, errSchemaPath: p } = a, y = r.length, $ = y === f.minItems && (y === f.maxItems || f[t] === !1);
    if (h.strictTuples && !$) {
      const v = `"${o}" is ${y}-tuple, but minItems or maxItems/${t} are not specified or different at path "${p}"`;
      (0, Sa.checkStrictMode)(a, v, h.strictTuples);
    }
  }
}
es.validateTuple = Iv;
es.default = p2;
Object.defineProperty(qf, "__esModule", { value: !0 });
const m2 = es, y2 = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, m2.validateTuple)(e, "items")
};
qf.default = y2;
var Bf = {};
Object.defineProperty(Bf, "__esModule", { value: !0 });
const Qm = oe, g2 = K, $2 = he, v2 = Zi, _2 = {
  message: ({ params: { len: e } }) => (0, Qm.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Qm._)`{limit: ${e}}`
}, w2 = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: _2,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: i } = r;
    n.items = !0, !(0, g2.alwaysValidSchema)(n, t) && (i ? (0, v2.validateAdditionalItems)(e, i) : e.ok((0, $2.validateArray)(e)));
  }
};
Bf.default = w2;
var Vf = {};
Object.defineProperty(Vf, "__esModule", { value: !0 });
const zt = oe, ia = K, E2 = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, zt.str)`must contain at least ${e} valid item(s)` : (0, zt.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, zt._)`{minContains: ${e}}` : (0, zt._)`{minContains: ${e}, maxContains: ${t}}`
}, S2 = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: E2,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: s } = e;
    let o, a;
    const { minContains: c, maxContains: u } = n;
    s.opts.next ? (o = c === void 0 ? 1 : c, a = u) : o = 1;
    const l = t.const("len", (0, zt._)`${i}.length`);
    if (e.setParams({ min: o, max: a }), a === void 0 && o === 0) {
      (0, ia.checkStrictMode)(s, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (a !== void 0 && o > a) {
      (0, ia.checkStrictMode)(s, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, ia.alwaysValidSchema)(s, r)) {
      let $ = (0, zt._)`${l} >= ${o}`;
      a !== void 0 && ($ = (0, zt._)`${$} && ${l} <= ${a}`), e.pass($);
      return;
    }
    s.items = !0;
    const f = t.name("valid");
    a === void 0 && o === 1 ? p(f, () => t.if(f, () => t.break())) : o === 0 ? (t.let(f, !0), a !== void 0 && t.if((0, zt._)`${i}.length > 0`, h)) : (t.let(f, !1), h()), e.result(f, () => e.reset());
    function h() {
      const $ = t.name("_valid"), v = t.let("count", 0);
      p($, () => t.if($, () => y(v)));
    }
    function p($, v) {
      t.forRange("i", 0, l, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: ia.Type.Num,
          compositeRule: !0
        }, $), v();
      });
    }
    function y($) {
      t.code((0, zt._)`${$}++`), a === void 0 ? t.if((0, zt._)`${$} >= ${o}`, () => t.assign(f, !0).break()) : (t.if((0, zt._)`${$} > ${a}`, () => t.assign(f, !1).break()), o === 1 ? t.assign(f, !0) : t.if((0, zt._)`${$} >= ${o}`, () => t.assign(f, !0)));
    }
  }
};
Vf.default = S2;
var kc = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = oe, r = K, n = he;
  e.error = {
    message: ({ params: { property: c, depsCount: u, deps: l } }) => {
      const f = u === 1 ? "property" : "properties";
      return (0, t.str)`must have ${f} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: u, deps: l, missingProperty: f } }) => (0, t._)`{property: ${c},
    missingProperty: ${f},
    depsCount: ${u},
    deps: ${l}}`
    // TODO change to reference
  };
  const i = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [u, l] = s(c);
      o(c, u), a(c, l);
    }
  };
  function s({ schema: c }) {
    const u = {}, l = {};
    for (const f in c) {
      if (f === "__proto__")
        continue;
      const h = Array.isArray(c[f]) ? u : l;
      h[f] = c[f];
    }
    return [u, l];
  }
  function o(c, u = c.schema) {
    const { gen: l, data: f, it: h } = c;
    if (Object.keys(u).length === 0)
      return;
    const p = l.let("missing");
    for (const y in u) {
      const $ = u[y];
      if ($.length === 0)
        continue;
      const v = (0, n.propertyInData)(l, f, y, h.opts.ownProperties);
      c.setParams({
        property: y,
        depsCount: $.length,
        deps: $.join(", ")
      }), h.allErrors ? l.if(v, () => {
        for (const m of $)
          (0, n.checkReportMissingProp)(c, m);
      }) : (l.if((0, t._)`${v} && (${(0, n.checkMissingProp)(c, $, p)})`), (0, n.reportMissingProp)(c, p), l.else());
    }
  }
  e.validatePropertyDeps = o;
  function a(c, u = c.schema) {
    const { gen: l, data: f, keyword: h, it: p } = c, y = l.name("valid");
    for (const $ in u)
      (0, r.alwaysValidSchema)(p, u[$]) || (l.if(
        (0, n.propertyInData)(l, f, $, p.opts.ownProperties),
        () => {
          const v = c.subschema({ keyword: h, schemaProp: $ }, y);
          c.mergeValidEvaluated(v, y);
        },
        () => l.var(y, !0)
        // TODO var
      ), c.ok(y));
  }
  e.validateSchemaDeps = a, e.default = i;
})(kc);
var Hf = {};
Object.defineProperty(Hf, "__esModule", { value: !0 });
const Cv = oe, b2 = K, P2 = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Cv._)`{propertyName: ${e.propertyName}}`
}, T2 = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: P2,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e;
    if ((0, b2.alwaysValidSchema)(i, r))
      return;
    const s = t.name("valid");
    t.forIn("key", n, (o) => {
      e.setParams({ propertyName: o }), e.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: !0
      }, s), t.if((0, Cv.not)(s), () => {
        e.error(!0), i.allErrors || t.break();
      });
    }), e.ok(s);
  }
};
Hf.default = T2;
var Dc = {};
Object.defineProperty(Dc, "__esModule", { value: !0 });
const sa = he, Zt = oe, A2 = Mt, oa = K, N2 = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Zt._)`{additionalProperty: ${e.additionalProperty}}`
}, O2 = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: N2,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, errsCount: s, it: o } = e;
    if (!s)
      throw new Error("ajv implementation error");
    const { allErrors: a, opts: c } = o;
    if (o.props = !0, c.removeAdditional !== "all" && (0, oa.alwaysValidSchema)(o, r))
      return;
    const u = (0, sa.allSchemaProperties)(n.properties), l = (0, sa.allSchemaProperties)(n.patternProperties);
    f(), e.ok((0, Zt._)`${s} === ${A2.default.errors}`);
    function f() {
      t.forIn("key", i, (v) => {
        !u.length && !l.length ? y(v) : t.if(h(v), () => y(v));
      });
    }
    function h(v) {
      let m;
      if (u.length > 8) {
        const w = (0, oa.schemaRefOrVal)(o, n.properties, "properties");
        m = (0, sa.isOwnProperty)(t, w, v);
      } else u.length ? m = (0, Zt.or)(...u.map((w) => (0, Zt._)`${v} === ${w}`)) : m = Zt.nil;
      return l.length && (m = (0, Zt.or)(m, ...l.map((w) => (0, Zt._)`${(0, sa.usePattern)(e, w)}.test(${v})`))), (0, Zt.not)(m);
    }
    function p(v) {
      t.code((0, Zt._)`delete ${i}[${v}]`);
    }
    function y(v) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        p(v);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: v }), e.error(), a || t.break();
        return;
      }
      if (typeof r == "object" && !(0, oa.alwaysValidSchema)(o, r)) {
        const m = t.name("valid");
        c.removeAdditional === "failing" ? ($(v, m, !1), t.if((0, Zt.not)(m), () => {
          e.reset(), p(v);
        })) : ($(v, m), a || t.if((0, Zt.not)(m), () => t.break()));
      }
    }
    function $(v, m, w) {
      const T = {
        keyword: "additionalProperties",
        dataProp: v,
        dataPropType: oa.Type.Str
      };
      w === !1 && Object.assign(T, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(T, m);
    }
  }
};
Dc.default = O2;
var Gf = {};
Object.defineProperty(Gf, "__esModule", { value: !0 });
const R2 = ir, Zm = he, kl = K, ey = Dc, I2 = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: s } = e;
    s.opts.removeAdditional === "all" && n.additionalProperties === void 0 && ey.default.code(new R2.KeywordCxt(s, ey.default, "additionalProperties"));
    const o = (0, Zm.allSchemaProperties)(r);
    for (const f of o)
      s.definedProperties.add(f);
    s.opts.unevaluated && o.length && s.props !== !0 && (s.props = kl.mergeEvaluated.props(t, (0, kl.toHash)(o), s.props));
    const a = o.filter((f) => !(0, kl.alwaysValidSchema)(s, r[f]));
    if (a.length === 0)
      return;
    const c = t.name("valid");
    for (const f of a)
      u(f) ? l(f) : (t.if((0, Zm.propertyInData)(t, i, f, s.opts.ownProperties)), l(f), s.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(f), e.ok(c);
    function u(f) {
      return s.opts.useDefaults && !s.compositeRule && r[f].default !== void 0;
    }
    function l(f) {
      e.subschema({
        keyword: "properties",
        schemaProp: f,
        dataProp: f
      }, c);
    }
  }
};
Gf.default = I2;
var zf = {};
Object.defineProperty(zf, "__esModule", { value: !0 });
const ty = he, aa = oe, ry = K, ny = K, C2 = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: i, it: s } = e, { opts: o } = s, a = (0, ty.allSchemaProperties)(r), c = a.filter(($) => (0, ry.alwaysValidSchema)(s, r[$]));
    if (a.length === 0 || c.length === a.length && (!s.opts.unevaluated || s.props === !0))
      return;
    const u = o.strictSchema && !o.allowMatchingProperties && i.properties, l = t.name("valid");
    s.props !== !0 && !(s.props instanceof aa.Name) && (s.props = (0, ny.evaluatedPropsToName)(t, s.props));
    const { props: f } = s;
    h();
    function h() {
      for (const $ of a)
        u && p($), s.allErrors ? y($) : (t.var(l, !0), y($), t.if(l));
    }
    function p($) {
      for (const v in u)
        new RegExp($).test(v) && (0, ry.checkStrictMode)(s, `property ${v} matches pattern ${$} (use allowMatchingProperties)`);
    }
    function y($) {
      t.forIn("key", n, (v) => {
        t.if((0, aa._)`${(0, ty.usePattern)(e, $)}.test(${v})`, () => {
          const m = c.includes($);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: $,
            dataProp: v,
            dataPropType: ny.Type.Str
          }, l), s.opts.unevaluated && f !== !0 ? t.assign((0, aa._)`${f}[${v}]`, !0) : !m && !s.allErrors && t.if((0, aa.not)(l), () => t.break());
        });
      });
    }
  }
};
zf.default = C2;
var Kf = {};
Object.defineProperty(Kf, "__esModule", { value: !0 });
const k2 = K, D2 = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, k2.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const i = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, i), e.failResult(i, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
Kf.default = D2;
var Wf = {};
Object.defineProperty(Wf, "__esModule", { value: !0 });
const F2 = he, j2 = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: F2.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Wf.default = j2;
var Yf = {};
Object.defineProperty(Yf, "__esModule", { value: !0 });
const ba = oe, L2 = K, U2 = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, ba._)`{passingSchemas: ${e.passing}}`
}, M2 = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: U2,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: i } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (i.opts.discriminator && n.discriminator)
      return;
    const s = r, o = t.let("valid", !1), a = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: a }), t.block(u), e.result(o, () => e.reset(), () => e.error(!0));
    function u() {
      s.forEach((l, f) => {
        let h;
        (0, L2.alwaysValidSchema)(i, l) ? t.var(c, !0) : h = e.subschema({
          keyword: "oneOf",
          schemaProp: f,
          compositeRule: !0
        }, c), f > 0 && t.if((0, ba._)`${c} && ${o}`).assign(o, !1).assign(a, (0, ba._)`[${a}, ${f}]`).else(), t.if(c, () => {
          t.assign(o, !0), t.assign(a, f), h && e.mergeEvaluated(h, ba.Name);
        });
      });
    }
  }
};
Yf.default = M2;
var Jf = {};
Object.defineProperty(Jf, "__esModule", { value: !0 });
const x2 = K, q2 = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const i = t.name("valid");
    r.forEach((s, o) => {
      if ((0, x2.alwaysValidSchema)(n, s))
        return;
      const a = e.subschema({ keyword: "allOf", schemaProp: o }, i);
      e.ok(i), e.mergeEvaluated(a);
    });
  }
};
Jf.default = q2;
var Xf = {};
Object.defineProperty(Xf, "__esModule", { value: !0 });
const Ka = oe, kv = K, B2 = {
  message: ({ params: e }) => (0, Ka.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Ka._)`{failingKeyword: ${e.ifClause}}`
}, V2 = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: B2,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, kv.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const i = iy(n, "then"), s = iy(n, "else");
    if (!i && !s)
      return;
    const o = t.let("valid", !0), a = t.name("_valid");
    if (c(), e.reset(), i && s) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(a, u("then", l), u("else", l));
    } else i ? t.if(a, u("then")) : t.if((0, Ka.not)(a), u("else"));
    e.pass(o, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, a);
      e.mergeEvaluated(l);
    }
    function u(l, f) {
      return () => {
        const h = e.subschema({ keyword: l }, a);
        t.assign(o, a), e.mergeValidEvaluated(h, o), f ? t.assign(f, (0, Ka._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function iy(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, kv.alwaysValidSchema)(e, r);
}
Xf.default = V2;
var Qf = {};
Object.defineProperty(Qf, "__esModule", { value: !0 });
const H2 = K, G2 = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, H2.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Qf.default = G2;
Object.defineProperty(xf, "__esModule", { value: !0 });
const z2 = Zi, K2 = qf, W2 = es, Y2 = Bf, J2 = Vf, X2 = kc, Q2 = Hf, Z2 = Dc, eL = Gf, tL = zf, rL = Kf, nL = Wf, iL = Yf, sL = Jf, oL = Xf, aL = Qf;
function cL(e = !1) {
  const t = [
    // any
    rL.default,
    nL.default,
    iL.default,
    sL.default,
    oL.default,
    aL.default,
    // object
    Q2.default,
    Z2.default,
    X2.default,
    eL.default,
    tL.default
  ];
  return e ? t.push(K2.default, Y2.default) : t.push(z2.default, W2.default), t.push(J2.default), t;
}
xf.default = cL;
var Zf = {}, ts = {};
Object.defineProperty(ts, "__esModule", { value: !0 });
ts.dynamicAnchor = void 0;
const Dl = oe, lL = Mt, sy = $t, uL = Mr, fL = {
  keyword: "$dynamicAnchor",
  schemaType: "string",
  code: (e) => Dv(e, e.schema)
};
function Dv(e, t) {
  const { gen: r, it: n } = e;
  n.schemaEnv.root.dynamicAnchors[t] = !0;
  const i = (0, Dl._)`${lL.default.dynamicAnchors}${(0, Dl.getProperty)(t)}`, s = n.errSchemaPath === "#" ? n.validateName : dL(e);
  r.if((0, Dl._)`!${i}`, () => r.assign(i, s));
}
ts.dynamicAnchor = Dv;
function dL(e) {
  const { schemaEnv: t, schema: r, self: n } = e.it, { root: i, baseId: s, localRefs: o, meta: a } = t.root, { schemaId: c } = n.opts, u = new sy.SchemaEnv({ schema: r, schemaId: c, root: i, baseId: s, localRefs: o, meta: a });
  return sy.compileSchema.call(n, u), (0, uL.getValidate)(e, u);
}
ts.default = fL;
var rs = {};
Object.defineProperty(rs, "__esModule", { value: !0 });
rs.dynamicRef = void 0;
const oy = oe, hL = Mt, ay = Mr, pL = {
  keyword: "$dynamicRef",
  schemaType: "string",
  code: (e) => Fv(e, e.schema)
};
function Fv(e, t) {
  const { gen: r, keyword: n, it: i } = e;
  if (t[0] !== "#")
    throw new Error(`"${n}" only supports hash fragment reference`);
  const s = t.slice(1);
  if (i.allErrors)
    o();
  else {
    const c = r.let("valid", !1);
    o(c), e.ok(c);
  }
  function o(c) {
    if (i.schemaEnv.root.dynamicAnchors[s]) {
      const u = r.let("_v", (0, oy._)`${hL.default.dynamicAnchors}${(0, oy.getProperty)(s)}`);
      r.if(u, a(u, c), a(i.validateName, c));
    } else
      a(i.validateName, c)();
  }
  function a(c, u) {
    return u ? () => r.block(() => {
      (0, ay.callRef)(e, c), r.let(u, !0);
    }) : () => (0, ay.callRef)(e, c);
  }
}
rs.dynamicRef = Fv;
rs.default = pL;
var ed = {};
Object.defineProperty(ed, "__esModule", { value: !0 });
const mL = ts, yL = K, gL = {
  keyword: "$recursiveAnchor",
  schemaType: "boolean",
  code(e) {
    e.schema ? (0, mL.dynamicAnchor)(e, "") : (0, yL.checkStrictMode)(e.it, "$recursiveAnchor: false is ignored");
  }
};
ed.default = gL;
var td = {};
Object.defineProperty(td, "__esModule", { value: !0 });
const $L = rs, vL = {
  keyword: "$recursiveRef",
  schemaType: "string",
  code: (e) => (0, $L.dynamicRef)(e, e.schema)
};
td.default = vL;
Object.defineProperty(Zf, "__esModule", { value: !0 });
const _L = ts, wL = rs, EL = ed, SL = td, bL = [_L.default, wL.default, EL.default, SL.default];
Zf.default = bL;
var rd = {}, nd = {};
Object.defineProperty(nd, "__esModule", { value: !0 });
const cy = kc, PL = {
  keyword: "dependentRequired",
  type: "object",
  schemaType: "object",
  error: cy.error,
  code: (e) => (0, cy.validatePropertyDeps)(e)
};
nd.default = PL;
var id = {};
Object.defineProperty(id, "__esModule", { value: !0 });
const TL = kc, AL = {
  keyword: "dependentSchemas",
  type: "object",
  schemaType: "object",
  code: (e) => (0, TL.validateSchemaDeps)(e)
};
id.default = AL;
var sd = {};
Object.defineProperty(sd, "__esModule", { value: !0 });
const NL = K, OL = {
  keyword: ["maxContains", "minContains"],
  type: "array",
  schemaType: "number",
  code({ keyword: e, parentSchema: t, it: r }) {
    t.contains === void 0 && (0, NL.checkStrictMode)(r, `"${e}" without "contains" is ignored`);
  }
};
sd.default = OL;
Object.defineProperty(rd, "__esModule", { value: !0 });
const RL = nd, IL = id, CL = sd, kL = [RL.default, IL.default, CL.default];
rd.default = kL;
var od = {}, ad = {};
Object.defineProperty(ad, "__esModule", { value: !0 });
const Zr = oe, ly = K, DL = Mt, FL = {
  message: "must NOT have unevaluated properties",
  params: ({ params: e }) => (0, Zr._)`{unevaluatedProperty: ${e.unevaluatedProperty}}`
}, jL = {
  keyword: "unevaluatedProperties",
  type: "object",
  schemaType: ["boolean", "object"],
  trackErrors: !0,
  error: FL,
  code(e) {
    const { gen: t, schema: r, data: n, errsCount: i, it: s } = e;
    if (!i)
      throw new Error("ajv implementation error");
    const { allErrors: o, props: a } = s;
    a instanceof Zr.Name ? t.if((0, Zr._)`${a} !== true`, () => t.forIn("key", n, (f) => t.if(u(a, f), () => c(f)))) : a !== !0 && t.forIn("key", n, (f) => a === void 0 ? c(f) : t.if(l(a, f), () => c(f))), s.props = !0, e.ok((0, Zr._)`${i} === ${DL.default.errors}`);
    function c(f) {
      if (r === !1) {
        e.setParams({ unevaluatedProperty: f }), e.error(), o || t.break();
        return;
      }
      if (!(0, ly.alwaysValidSchema)(s, r)) {
        const h = t.name("valid");
        e.subschema({
          keyword: "unevaluatedProperties",
          dataProp: f,
          dataPropType: ly.Type.Str
        }, h), o || t.if((0, Zr.not)(h), () => t.break());
      }
    }
    function u(f, h) {
      return (0, Zr._)`!${f} || !${f}[${h}]`;
    }
    function l(f, h) {
      const p = [];
      for (const y in f)
        f[y] === !0 && p.push((0, Zr._)`${h} !== ${y}`);
      return (0, Zr.and)(...p);
    }
  }
};
ad.default = jL;
var cd = {};
Object.defineProperty(cd, "__esModule", { value: !0 });
const Vn = oe, uy = K, LL = {
  message: ({ params: { len: e } }) => (0, Vn.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Vn._)`{limit: ${e}}`
}, UL = {
  keyword: "unevaluatedItems",
  type: "array",
  schemaType: ["boolean", "object"],
  error: LL,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e, s = i.items || 0;
    if (s === !0)
      return;
    const o = t.const("len", (0, Vn._)`${n}.length`);
    if (r === !1)
      e.setParams({ len: s }), e.fail((0, Vn._)`${o} > ${s}`);
    else if (typeof r == "object" && !(0, uy.alwaysValidSchema)(i, r)) {
      const c = t.var("valid", (0, Vn._)`${o} <= ${s}`);
      t.if((0, Vn.not)(c), () => a(c, s)), e.ok(c);
    }
    i.items = !0;
    function a(c, u) {
      t.forRange("i", u, o, (l) => {
        e.subschema({ keyword: "unevaluatedItems", dataProp: l, dataPropType: uy.Type.Num }, c), i.allErrors || t.if((0, Vn.not)(c), () => t.break());
      });
    }
  }
};
cd.default = UL;
Object.defineProperty(od, "__esModule", { value: !0 });
const ML = ad, xL = cd, qL = [ML.default, xL.default];
od.default = qL;
var ld = {}, ud = {};
Object.defineProperty(ud, "__esModule", { value: !0 });
const Ue = oe, BL = {
  message: ({ schemaCode: e }) => (0, Ue.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Ue._)`{format: ${e}}`
}, VL = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: BL,
  code(e, t) {
    const { gen: r, data: n, $data: i, schema: s, schemaCode: o, it: a } = e, { opts: c, errSchemaPath: u, schemaEnv: l, self: f } = a;
    if (!c.validateFormats)
      return;
    i ? h() : p();
    function h() {
      const y = r.scopeValue("formats", {
        ref: f.formats,
        code: c.code.formats
      }), $ = r.const("fDef", (0, Ue._)`${y}[${o}]`), v = r.let("fType"), m = r.let("format");
      r.if((0, Ue._)`typeof ${$} == "object" && !(${$} instanceof RegExp)`, () => r.assign(v, (0, Ue._)`${$}.type || "string"`).assign(m, (0, Ue._)`${$}.validate`), () => r.assign(v, (0, Ue._)`"string"`).assign(m, $)), e.fail$data((0, Ue.or)(w(), T()));
      function w() {
        return c.strictSchema === !1 ? Ue.nil : (0, Ue._)`${o} && !${m}`;
      }
      function T() {
        const I = l.$async ? (0, Ue._)`(${$}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, Ue._)`${m}(${n})`, F = (0, Ue._)`(typeof ${m} == "function" ? ${I} : ${m}.test(${n}))`;
        return (0, Ue._)`${m} && ${m} !== true && ${v} === ${t} && !${F}`;
      }
    }
    function p() {
      const y = f.formats[s];
      if (!y) {
        w();
        return;
      }
      if (y === !0)
        return;
      const [$, v, m] = T(y);
      $ === t && e.pass(I());
      function w() {
        if (c.strictSchema === !1) {
          f.logger.warn(F());
          return;
        }
        throw new Error(F());
        function F() {
          return `unknown format "${s}" ignored in schema at path "${u}"`;
        }
      }
      function T(F) {
        const H = F instanceof RegExp ? (0, Ue.regexpCode)(F) : c.code.formats ? (0, Ue._)`${c.code.formats}${(0, Ue.getProperty)(s)}` : void 0, z = r.scopeValue("formats", { key: s, ref: F, code: H });
        return typeof F == "object" && !(F instanceof RegExp) ? [F.type || "string", F.validate, (0, Ue._)`${z}.validate`] : ["string", F, z];
      }
      function I() {
        if (typeof y == "object" && !(y instanceof RegExp) && y.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, Ue._)`await ${m}(${n})`;
        }
        return typeof v == "function" ? (0, Ue._)`${m}(${n})` : (0, Ue._)`${m}.test(${n})`;
      }
    }
  }
};
ud.default = VL;
Object.defineProperty(ld, "__esModule", { value: !0 });
const HL = ud, GL = [HL.default];
ld.default = GL;
var Vi = {};
Object.defineProperty(Vi, "__esModule", { value: !0 });
Vi.contentVocabulary = Vi.metadataVocabulary = void 0;
Vi.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Vi.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Pf, "__esModule", { value: !0 });
const zL = Tf, KL = Nf, WL = xf, YL = Zf, JL = rd, XL = od, QL = ld, fy = Vi, ZL = [
  YL.default,
  zL.default,
  KL.default,
  (0, WL.default)(!0),
  QL.default,
  fy.metadataVocabulary,
  fy.contentVocabulary,
  JL.default,
  XL.default
];
Pf.default = ZL;
var fd = {}, Fc = {};
Object.defineProperty(Fc, "__esModule", { value: !0 });
Fc.DiscrError = void 0;
var dy;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(dy || (Fc.DiscrError = dy = {}));
Object.defineProperty(fd, "__esModule", { value: !0 });
const wi = oe, pu = Fc, hy = $t, eU = Qi, tU = K, rU = {
  message: ({ params: { discrError: e, tagName: t } }) => e === pu.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, wi._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, nU = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: rU,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: i, it: s } = e, { oneOf: o } = i;
    if (!s.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const a = n.propertyName;
    if (typeof a != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), u = t.const("tag", (0, wi._)`${r}${(0, wi.getProperty)(a)}`);
    t.if((0, wi._)`typeof ${u} == "string"`, () => l(), () => e.error(!1, { discrError: pu.DiscrError.Tag, tag: u, tagName: a })), e.ok(c);
    function l() {
      const p = h();
      t.if(!1);
      for (const y in p)
        t.elseIf((0, wi._)`${u} === ${y}`), t.assign(c, f(p[y]));
      t.else(), e.error(!1, { discrError: pu.DiscrError.Mapping, tag: u, tagName: a }), t.endIf();
    }
    function f(p) {
      const y = t.name("valid"), $ = e.subschema({ keyword: "oneOf", schemaProp: p }, y);
      return e.mergeEvaluated($, wi.Name), y;
    }
    function h() {
      var p;
      const y = {}, $ = m(i);
      let v = !0;
      for (let I = 0; I < o.length; I++) {
        let F = o[I];
        if (F != null && F.$ref && !(0, tU.schemaHasRulesButRef)(F, s.self.RULES)) {
          const z = F.$ref;
          if (F = hy.resolveRef.call(s.self, s.schemaEnv.root, s.baseId, z), F instanceof hy.SchemaEnv && (F = F.schema), F === void 0)
            throw new eU.default(s.opts.uriResolver, s.baseId, z);
        }
        const H = (p = F == null ? void 0 : F.properties) === null || p === void 0 ? void 0 : p[a];
        if (typeof H != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${a}"`);
        v = v && ($ || m(F)), w(H, I);
      }
      if (!v)
        throw new Error(`discriminator: "${a}" must be required`);
      return y;
      function m({ required: I }) {
        return Array.isArray(I) && I.includes(a);
      }
      function w(I, F) {
        if (I.const)
          T(I.const, F);
        else if (I.enum)
          for (const H of I.enum)
            T(H, F);
        else
          throw new Error(`discriminator: "properties/${a}" must have "const" or "enum"`);
      }
      function T(I, F) {
        if (typeof I != "string" || I in y)
          throw new Error(`discriminator: "${a}" values must be unique strings`);
        y[I] = F;
      }
    }
  }
};
fd.default = nU;
var dd = {};
const iU = "https://json-schema.org/draft/2020-12/schema", sU = "https://json-schema.org/draft/2020-12/schema", oU = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0,
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0,
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
  "https://json-schema.org/draft/2020-12/vocab/validation": !0,
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, aU = "meta", cU = "Core and Validation specifications meta-schema", lU = [
  {
    $ref: "meta/core"
  },
  {
    $ref: "meta/applicator"
  },
  {
    $ref: "meta/unevaluated"
  },
  {
    $ref: "meta/validation"
  },
  {
    $ref: "meta/meta-data"
  },
  {
    $ref: "meta/format-annotation"
  },
  {
    $ref: "meta/content"
  }
], uU = [
  "object",
  "boolean"
], fU = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", dU = {
  definitions: {
    $comment: '"definitions" has been replaced by "$defs".',
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    deprecated: !0,
    default: {}
  },
  dependencies: {
    $comment: '"dependencies" has been split and replaced by "dependentSchemas" and "dependentRequired" in order to serve their differing semantics.',
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $dynamicRef: "#meta"
        },
        {
          $ref: "meta/validation#/$defs/stringArray"
        }
      ]
    },
    deprecated: !0,
    default: {}
  },
  $recursiveAnchor: {
    $comment: '"$recursiveAnchor" has been replaced by "$dynamicAnchor".',
    $ref: "meta/core#/$defs/anchorString",
    deprecated: !0
  },
  $recursiveRef: {
    $comment: '"$recursiveRef" has been replaced by "$dynamicRef".',
    $ref: "meta/core#/$defs/uriReferenceString",
    deprecated: !0
  }
}, hU = {
  $schema: iU,
  $id: sU,
  $vocabulary: oU,
  $dynamicAnchor: aU,
  title: cU,
  allOf: lU,
  type: uU,
  $comment: fU,
  properties: dU
}, pU = "https://json-schema.org/draft/2020-12/schema", mU = "https://json-schema.org/draft/2020-12/meta/applicator", yU = {
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0
}, gU = "meta", $U = "Applicator vocabulary meta-schema", vU = [
  "object",
  "boolean"
], _U = {
  prefixItems: {
    $ref: "#/$defs/schemaArray"
  },
  items: {
    $dynamicRef: "#meta"
  },
  contains: {
    $dynamicRef: "#meta"
  },
  additionalProperties: {
    $dynamicRef: "#meta"
  },
  properties: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependentSchemas: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    default: {}
  },
  propertyNames: {
    $dynamicRef: "#meta"
  },
  if: {
    $dynamicRef: "#meta"
  },
  then: {
    $dynamicRef: "#meta"
  },
  else: {
    $dynamicRef: "#meta"
  },
  allOf: {
    $ref: "#/$defs/schemaArray"
  },
  anyOf: {
    $ref: "#/$defs/schemaArray"
  },
  oneOf: {
    $ref: "#/$defs/schemaArray"
  },
  not: {
    $dynamicRef: "#meta"
  }
}, wU = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $dynamicRef: "#meta"
    }
  }
}, EU = {
  $schema: pU,
  $id: mU,
  $vocabulary: yU,
  $dynamicAnchor: gU,
  title: $U,
  type: vU,
  properties: _U,
  $defs: wU
}, SU = "https://json-schema.org/draft/2020-12/schema", bU = "https://json-schema.org/draft/2020-12/meta/unevaluated", PU = {
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0
}, TU = "meta", AU = "Unevaluated applicator vocabulary meta-schema", NU = [
  "object",
  "boolean"
], OU = {
  unevaluatedItems: {
    $dynamicRef: "#meta"
  },
  unevaluatedProperties: {
    $dynamicRef: "#meta"
  }
}, RU = {
  $schema: SU,
  $id: bU,
  $vocabulary: PU,
  $dynamicAnchor: TU,
  title: AU,
  type: NU,
  properties: OU
}, IU = "https://json-schema.org/draft/2020-12/schema", CU = "https://json-schema.org/draft/2020-12/meta/content", kU = {
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, DU = "meta", FU = "Content vocabulary meta-schema", jU = [
  "object",
  "boolean"
], LU = {
  contentEncoding: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentSchema: {
    $dynamicRef: "#meta"
  }
}, UU = {
  $schema: IU,
  $id: CU,
  $vocabulary: kU,
  $dynamicAnchor: DU,
  title: FU,
  type: jU,
  properties: LU
}, MU = "https://json-schema.org/draft/2020-12/schema", xU = "https://json-schema.org/draft/2020-12/meta/core", qU = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0
}, BU = "meta", VU = "Core vocabulary meta-schema", HU = [
  "object",
  "boolean"
], GU = {
  $id: {
    $ref: "#/$defs/uriReferenceString",
    $comment: "Non-empty fragments not allowed.",
    pattern: "^[^#]*#?$"
  },
  $schema: {
    $ref: "#/$defs/uriString"
  },
  $ref: {
    $ref: "#/$defs/uriReferenceString"
  },
  $anchor: {
    $ref: "#/$defs/anchorString"
  },
  $dynamicRef: {
    $ref: "#/$defs/uriReferenceString"
  },
  $dynamicAnchor: {
    $ref: "#/$defs/anchorString"
  },
  $vocabulary: {
    type: "object",
    propertyNames: {
      $ref: "#/$defs/uriString"
    },
    additionalProperties: {
      type: "boolean"
    }
  },
  $comment: {
    type: "string"
  },
  $defs: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    }
  }
}, zU = {
  anchorString: {
    type: "string",
    pattern: "^[A-Za-z_][-A-Za-z0-9._]*$"
  },
  uriString: {
    type: "string",
    format: "uri"
  },
  uriReferenceString: {
    type: "string",
    format: "uri-reference"
  }
}, KU = {
  $schema: MU,
  $id: xU,
  $vocabulary: qU,
  $dynamicAnchor: BU,
  title: VU,
  type: HU,
  properties: GU,
  $defs: zU
}, WU = "https://json-schema.org/draft/2020-12/schema", YU = "https://json-schema.org/draft/2020-12/meta/format-annotation", JU = {
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0
}, XU = "meta", QU = "Format vocabulary meta-schema for annotation results", ZU = [
  "object",
  "boolean"
], eM = {
  format: {
    type: "string"
  }
}, tM = {
  $schema: WU,
  $id: YU,
  $vocabulary: JU,
  $dynamicAnchor: XU,
  title: QU,
  type: ZU,
  properties: eM
}, rM = "https://json-schema.org/draft/2020-12/schema", nM = "https://json-schema.org/draft/2020-12/meta/meta-data", iM = {
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0
}, sM = "meta", oM = "Meta-data vocabulary meta-schema", aM = [
  "object",
  "boolean"
], cM = {
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  deprecated: {
    type: "boolean",
    default: !1
  },
  readOnly: {
    type: "boolean",
    default: !1
  },
  writeOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  }
}, lM = {
  $schema: rM,
  $id: nM,
  $vocabulary: iM,
  $dynamicAnchor: sM,
  title: oM,
  type: aM,
  properties: cM
}, uM = "https://json-schema.org/draft/2020-12/schema", fM = "https://json-schema.org/draft/2020-12/meta/validation", dM = {
  "https://json-schema.org/draft/2020-12/vocab/validation": !0
}, hM = "meta", pM = "Validation vocabulary meta-schema", mM = [
  "object",
  "boolean"
], yM = {
  type: {
    anyOf: [
      {
        $ref: "#/$defs/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/$defs/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  const: !0,
  enum: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  maxItems: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  maxContains: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minContains: {
    $ref: "#/$defs/nonNegativeInteger",
    default: 1
  },
  maxProperties: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/$defs/stringArray"
  },
  dependentRequired: {
    type: "object",
    additionalProperties: {
      $ref: "#/$defs/stringArray"
    }
  }
}, gM = {
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    $ref: "#/$defs/nonNegativeInteger",
    default: 0
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, $M = {
  $schema: uM,
  $id: fM,
  $vocabulary: dM,
  $dynamicAnchor: hM,
  title: pM,
  type: mM,
  properties: yM,
  $defs: gM
};
Object.defineProperty(dd, "__esModule", { value: !0 });
const vM = hU, _M = EU, wM = RU, EM = UU, SM = KU, bM = tM, PM = lM, TM = $M, AM = ["/properties"];
function NM(e) {
  return [
    vM,
    _M,
    wM,
    EM,
    SM,
    t(this, bM),
    PM,
    t(this, TM)
  ].forEach((r) => this.addMetaSchema(r, void 0, !1)), this;
  function t(r, n) {
    return e ? r.$dataMetaSchema(n, AM) : n;
  }
}
dd.default = NM;
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv2020 = void 0;
  const r = j$, n = Pf, i = fd, s = dd, o = "https://json-schema.org/draft/2020-12/schema";
  class a extends r.default {
    constructor(p = {}) {
      super({
        ...p,
        dynamicRef: !0,
        next: !0,
        unevaluated: !0
      });
    }
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((p) => this.addVocabulary(p)), this.opts.discriminator && this.addKeyword(i.default);
    }
    _addDefaultMetaSchema() {
      super._addDefaultMetaSchema();
      const { $data: p, meta: y } = this.opts;
      y && (s.default.call(this, p), this.refs["http://json-schema.org/schema"] = o);
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(o) ? o : void 0);
    }
  }
  t.Ajv2020 = a, e.exports = t = a, e.exports.Ajv2020 = a, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = a;
  var c = ir;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return c.KeywordCxt;
  } });
  var u = oe;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return u._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return u.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return u.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return u.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return u.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return u.CodeGen;
  } });
  var l = Ao;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return l.default;
  } });
  var f = Qi;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return f.default;
  } });
})(au, au.exports);
var OM = au.exports, mu = { exports: {} }, jv = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(x, B) {
    return { validate: x, compare: B };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(s, o),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c(!0), u),
    "date-time": t(h(!0), p),
    "iso-time": t(c(), l),
    "iso-date-time": t(h(), y),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: m,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex: Z,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte: T,
    // signed 32 bit integer
    int32: { type: "number", validate: H },
    // signed 64 bit integer
    int64: { type: "number", validate: z },
    // C-type float
    float: { type: "number", validate: ue },
    // C-type double
    double: { type: "number", validate: ue },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, o),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, u),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, p),
    "iso-time": t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, l),
    "iso-date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, y),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(x) {
    return x % 4 === 0 && (x % 100 !== 0 || x % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, i = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function s(x) {
    const B = n.exec(x);
    if (!B)
      return !1;
    const Q = +B[1], j = +B[2], L = +B[3];
    return j >= 1 && j <= 12 && L >= 1 && L <= (j === 2 && r(Q) ? 29 : i[j]);
  }
  function o(x, B) {
    if (x && B)
      return x > B ? 1 : x < B ? -1 : 0;
  }
  const a = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
  function c(x) {
    return function(Q) {
      const j = a.exec(Q);
      if (!j)
        return !1;
      const L = +j[1], V = +j[2], U = +j[3], G = j[4], q = j[5] === "-" ? -1 : 1, C = +(j[6] || 0), S = +(j[7] || 0);
      if (C > 23 || S > 59 || x && !G)
        return !1;
      if (L <= 23 && V <= 59 && U < 60)
        return !0;
      const N = V - S * q, b = L - C * q - (N < 0 ? 1 : 0);
      return (b === 23 || b === -1) && (N === 59 || N === -1) && U < 61;
    };
  }
  function u(x, B) {
    if (!(x && B))
      return;
    const Q = (/* @__PURE__ */ new Date("2020-01-01T" + x)).valueOf(), j = (/* @__PURE__ */ new Date("2020-01-01T" + B)).valueOf();
    if (Q && j)
      return Q - j;
  }
  function l(x, B) {
    if (!(x && B))
      return;
    const Q = a.exec(x), j = a.exec(B);
    if (Q && j)
      return x = Q[1] + Q[2] + Q[3], B = j[1] + j[2] + j[3], x > B ? 1 : x < B ? -1 : 0;
  }
  const f = /t|\s/i;
  function h(x) {
    const B = c(x);
    return function(j) {
      const L = j.split(f);
      return L.length === 2 && s(L[0]) && B(L[1]);
    };
  }
  function p(x, B) {
    if (!(x && B))
      return;
    const Q = new Date(x).valueOf(), j = new Date(B).valueOf();
    if (Q && j)
      return Q - j;
  }
  function y(x, B) {
    if (!(x && B))
      return;
    const [Q, j] = x.split(f), [L, V] = B.split(f), U = o(Q, L);
    if (U !== void 0)
      return U || u(j, V);
  }
  const $ = /\/|:/, v = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function m(x) {
    return $.test(x) && v.test(x);
  }
  const w = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function T(x) {
    return w.lastIndex = 0, w.test(x);
  }
  const I = -2147483648, F = 2 ** 31 - 1;
  function H(x) {
    return Number.isInteger(x) && x <= F && x >= I;
  }
  function z(x) {
    return Number.isInteger(x);
  }
  function ue() {
    return !0;
  }
  const R = /[^\\]\\Z/;
  function Z(x) {
    if (R.test(x))
      return !1;
    try {
      return new RegExp(x), !0;
    } catch {
      return !1;
    }
  }
})(jv);
var Lv = {}, yu = { exports: {} }, Uv = {}, sr = {}, Hi = {}, Oo = {}, de = {}, co = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(w) {
      if (super(), !e.IDENTIFIER.test(w))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(w) {
      super(), this._items = typeof w == "string" ? [w] : w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const w = this._items[0];
      return w === "" || w === '""';
    }
    get str() {
      var w;
      return (w = this._str) !== null && w !== void 0 ? w : this._str = this._items.reduce((T, I) => `${T}${I}`, "");
    }
    get names() {
      var w;
      return (w = this._names) !== null && w !== void 0 ? w : this._names = this._items.reduce((T, I) => (I instanceof r && (T[I.str] = (T[I.str] || 0) + 1), T), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function i(m, ...w) {
    const T = [m[0]];
    let I = 0;
    for (; I < w.length; )
      a(T, w[I]), T.push(m[++I]);
    return new n(T);
  }
  e._ = i;
  const s = new n("+");
  function o(m, ...w) {
    const T = [p(m[0])];
    let I = 0;
    for (; I < w.length; )
      T.push(s), a(T, w[I]), T.push(s, p(m[++I]));
    return c(T), new n(T);
  }
  e.str = o;
  function a(m, w) {
    w instanceof n ? m.push(...w._items) : w instanceof r ? m.push(w) : m.push(f(w));
  }
  e.addCodeArg = a;
  function c(m) {
    let w = 1;
    for (; w < m.length - 1; ) {
      if (m[w] === s) {
        const T = u(m[w - 1], m[w + 1]);
        if (T !== void 0) {
          m.splice(w - 1, 3, T);
          continue;
        }
        m[w++] = "+";
      }
      w++;
    }
  }
  function u(m, w) {
    if (w === '""')
      return m;
    if (m === '""')
      return w;
    if (typeof m == "string")
      return w instanceof r || m[m.length - 1] !== '"' ? void 0 : typeof w != "string" ? `${m.slice(0, -1)}${w}"` : w[0] === '"' ? m.slice(0, -1) + w.slice(1) : void 0;
    if (typeof w == "string" && w[0] === '"' && !(m instanceof r))
      return `"${m}${w.slice(1)}`;
  }
  function l(m, w) {
    return w.emptyStr() ? m : m.emptyStr() ? w : o`${m}${w}`;
  }
  e.strConcat = l;
  function f(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : p(Array.isArray(m) ? m.join(",") : m);
  }
  function h(m) {
    return new n(p(m));
  }
  e.stringify = h;
  function p(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = p;
  function y(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new n(`.${m}`) : i`[${m}]`;
  }
  e.getProperty = y;
  function $(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = $;
  function v(m) {
    return new n(m.toString());
  }
  e.regexpCode = v;
})(co);
var gu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = co;
  class r extends Error {
    constructor(u) {
      super(`CodeGen: "code" for ${u} not defined`), this.value = u.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class i {
    constructor({ prefixes: u, parent: l } = {}) {
      this._names = {}, this._prefixes = u, this._parent = l;
    }
    toName(u) {
      return u instanceof t.Name ? u : this.name(u);
    }
    name(u) {
      return new t.Name(this._newName(u));
    }
    _newName(u) {
      const l = this._names[u] || this._nameGroup(u);
      return `${u}${l.index++}`;
    }
    _nameGroup(u) {
      var l, f;
      if (!((f = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || f === void 0) && f.has(u) || this._prefixes && !this._prefixes.has(u))
        throw new Error(`CodeGen: prefix "${u}" is not allowed in this scope`);
      return this._names[u] = { prefix: u, index: 0 };
    }
  }
  e.Scope = i;
  class s extends t.Name {
    constructor(u, l) {
      super(l), this.prefix = u;
    }
    setValue(u, { property: l, itemIndex: f }) {
      this.value = u, this.scopePath = (0, t._)`.${new t.Name(l)}[${f}]`;
    }
  }
  e.ValueScopeName = s;
  const o = (0, t._)`\n`;
  class a extends i {
    constructor(u) {
      super(u), this._values = {}, this._scope = u.scope, this.opts = { ...u, _n: u.lines ? o : t.nil };
    }
    get() {
      return this._scope;
    }
    name(u) {
      return new s(u, this._newName(u));
    }
    value(u, l) {
      var f;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const h = this.toName(u), { prefix: p } = h, y = (f = l.key) !== null && f !== void 0 ? f : l.ref;
      let $ = this._values[p];
      if ($) {
        const w = $.get(y);
        if (w)
          return w;
      } else
        $ = this._values[p] = /* @__PURE__ */ new Map();
      $.set(y, h);
      const v = this._scope[p] || (this._scope[p] = []), m = v.length;
      return v[m] = l.ref, h.setValue(l, { property: p, itemIndex: m }), h;
    }
    getValue(u, l) {
      const f = this._values[u];
      if (f)
        return f.get(l);
    }
    scopeRefs(u, l = this._values) {
      return this._reduceValues(l, (f) => {
        if (f.scopePath === void 0)
          throw new Error(`CodeGen: name "${f}" has no value`);
        return (0, t._)`${u}${f.scopePath}`;
      });
    }
    scopeCode(u = this._values, l, f) {
      return this._reduceValues(u, (h) => {
        if (h.value === void 0)
          throw new Error(`CodeGen: name "${h}" has no value`);
        return h.value.code;
      }, l, f);
    }
    _reduceValues(u, l, f = {}, h) {
      let p = t.nil;
      for (const y in u) {
        const $ = u[y];
        if (!$)
          continue;
        const v = f[y] = f[y] || /* @__PURE__ */ new Map();
        $.forEach((m) => {
          if (v.has(m))
            return;
          v.set(m, n.Started);
          let w = l(m);
          if (w) {
            const T = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            p = (0, t._)`${p}${T} ${m} = ${w};${this.opts._n}`;
          } else if (w = h == null ? void 0 : h(m))
            p = (0, t._)`${p}${w}${this.opts._n}`;
          else
            throw new r(m);
          v.set(m, n.Completed);
        });
      }
      return p;
    }
  }
  e.ValueScope = a;
})(gu);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = co, r = gu;
  var n = co;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var i = gu;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return i.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return i.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return i.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return i.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class s {
    optimizeNodes() {
      return this;
    }
    optimizeNames(d, _) {
      return this;
    }
  }
  class o extends s {
    constructor(d, _, A) {
      super(), this.varKind = d, this.name = _, this.rhs = A;
    }
    render({ es5: d, _n: _ }) {
      const A = d ? r.varKinds.var : this.varKind, E = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${A} ${this.name}${E};` + _;
    }
    optimizeNames(d, _) {
      if (d[this.name.str])
        return this.rhs && (this.rhs = j(this.rhs, d, _)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class a extends s {
    constructor(d, _, A) {
      super(), this.lhs = d, this.rhs = _, this.sideEffects = A;
    }
    render({ _n: d }) {
      return `${this.lhs} = ${this.rhs};` + d;
    }
    optimizeNames(d, _) {
      if (!(this.lhs instanceof t.Name && !d[this.lhs.str] && !this.sideEffects))
        return this.rhs = j(this.rhs, d, _), this;
    }
    get names() {
      const d = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return Q(d, this.rhs);
    }
  }
  class c extends a {
    constructor(d, _, A, E) {
      super(d, A, E), this.op = _;
    }
    render({ _n: d }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + d;
    }
  }
  class u extends s {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `${this.label}:` + d;
    }
  }
  class l extends s {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `break${this.label ? ` ${this.label}` : ""};` + d;
    }
  }
  class f extends s {
    constructor(d) {
      super(), this.error = d;
    }
    render({ _n: d }) {
      return `throw ${this.error};` + d;
    }
    get names() {
      return this.error.names;
    }
  }
  class h extends s {
    constructor(d) {
      super(), this.code = d;
    }
    render({ _n: d }) {
      return `${this.code};` + d;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(d, _) {
      return this.code = j(this.code, d, _), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class p extends s {
    constructor(d = []) {
      super(), this.nodes = d;
    }
    render(d) {
      return this.nodes.reduce((_, A) => _ + A.render(d), "");
    }
    optimizeNodes() {
      const { nodes: d } = this;
      let _ = d.length;
      for (; _--; ) {
        const A = d[_].optimizeNodes();
        Array.isArray(A) ? d.splice(_, 1, ...A) : A ? d[_] = A : d.splice(_, 1);
      }
      return d.length > 0 ? this : void 0;
    }
    optimizeNames(d, _) {
      const { nodes: A } = this;
      let E = A.length;
      for (; E--; ) {
        const g = A[E];
        g.optimizeNames(d, _) || (L(d, g.names), A.splice(E, 1));
      }
      return A.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((d, _) => B(d, _.names), {});
    }
  }
  class y extends p {
    render(d) {
      return "{" + d._n + super.render(d) + "}" + d._n;
    }
  }
  class $ extends p {
  }
  class v extends y {
  }
  v.kind = "else";
  class m extends y {
    constructor(d, _) {
      super(_), this.condition = d;
    }
    render(d) {
      let _ = `if(${this.condition})` + super.render(d);
      return this.else && (_ += "else " + this.else.render(d)), _;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const d = this.condition;
      if (d === !0)
        return this.nodes;
      let _ = this.else;
      if (_) {
        const A = _.optimizeNodes();
        _ = this.else = Array.isArray(A) ? new v(A) : A;
      }
      if (_)
        return d === !1 ? _ instanceof m ? _ : _.nodes : this.nodes.length ? this : new m(V(d), _ instanceof m ? [_] : _.nodes);
      if (!(d === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(d, _) {
      var A;
      if (this.else = (A = this.else) === null || A === void 0 ? void 0 : A.optimizeNames(d, _), !!(super.optimizeNames(d, _) || this.else))
        return this.condition = j(this.condition, d, _), this;
    }
    get names() {
      const d = super.names;
      return Q(d, this.condition), this.else && B(d, this.else.names), d;
    }
  }
  m.kind = "if";
  class w extends y {
  }
  w.kind = "for";
  class T extends w {
    constructor(d) {
      super(), this.iteration = d;
    }
    render(d) {
      return `for(${this.iteration})` + super.render(d);
    }
    optimizeNames(d, _) {
      if (super.optimizeNames(d, _))
        return this.iteration = j(this.iteration, d, _), this;
    }
    get names() {
      return B(super.names, this.iteration.names);
    }
  }
  class I extends w {
    constructor(d, _, A, E) {
      super(), this.varKind = d, this.name = _, this.from = A, this.to = E;
    }
    render(d) {
      const _ = d.es5 ? r.varKinds.var : this.varKind, { name: A, from: E, to: g } = this;
      return `for(${_} ${A}=${E}; ${A}<${g}; ${A}++)` + super.render(d);
    }
    get names() {
      const d = Q(super.names, this.from);
      return Q(d, this.to);
    }
  }
  class F extends w {
    constructor(d, _, A, E) {
      super(), this.loop = d, this.varKind = _, this.name = A, this.iterable = E;
    }
    render(d) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(d);
    }
    optimizeNames(d, _) {
      if (super.optimizeNames(d, _))
        return this.iterable = j(this.iterable, d, _), this;
    }
    get names() {
      return B(super.names, this.iterable.names);
    }
  }
  class H extends y {
    constructor(d, _, A) {
      super(), this.name = d, this.args = _, this.async = A;
    }
    render(d) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(d);
    }
  }
  H.kind = "func";
  class z extends p {
    render(d) {
      return "return " + super.render(d);
    }
  }
  z.kind = "return";
  class ue extends y {
    render(d) {
      let _ = "try" + super.render(d);
      return this.catch && (_ += this.catch.render(d)), this.finally && (_ += this.finally.render(d)), _;
    }
    optimizeNodes() {
      var d, _;
      return super.optimizeNodes(), (d = this.catch) === null || d === void 0 || d.optimizeNodes(), (_ = this.finally) === null || _ === void 0 || _.optimizeNodes(), this;
    }
    optimizeNames(d, _) {
      var A, E;
      return super.optimizeNames(d, _), (A = this.catch) === null || A === void 0 || A.optimizeNames(d, _), (E = this.finally) === null || E === void 0 || E.optimizeNames(d, _), this;
    }
    get names() {
      const d = super.names;
      return this.catch && B(d, this.catch.names), this.finally && B(d, this.finally.names), d;
    }
  }
  class R extends y {
    constructor(d) {
      super(), this.error = d;
    }
    render(d) {
      return `catch(${this.error})` + super.render(d);
    }
  }
  R.kind = "catch";
  class Z extends y {
    render(d) {
      return "finally" + super.render(d);
    }
  }
  Z.kind = "finally";
  class x {
    constructor(d, _ = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ..._, _n: _.lines ? `
` : "" }, this._extScope = d, this._scope = new r.Scope({ parent: d }), this._nodes = [new $()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(d) {
      return this._scope.name(d);
    }
    // reserves unique name in the external scope
    scopeName(d) {
      return this._extScope.name(d);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(d, _) {
      const A = this._extScope.value(d, _);
      return (this._values[A.prefix] || (this._values[A.prefix] = /* @__PURE__ */ new Set())).add(A), A;
    }
    getScopeValue(d, _) {
      return this._extScope.getValue(d, _);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(d) {
      return this._extScope.scopeRefs(d, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(d, _, A, E) {
      const g = this._scope.toName(_);
      return A !== void 0 && E && (this._constants[g.str] = A), this._leafNode(new o(d, g, A)), g;
    }
    // `const` declaration (`var` in es5 mode)
    const(d, _, A) {
      return this._def(r.varKinds.const, d, _, A);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(d, _, A) {
      return this._def(r.varKinds.let, d, _, A);
    }
    // `var` declaration with optional assignment
    var(d, _, A) {
      return this._def(r.varKinds.var, d, _, A);
    }
    // assignment code
    assign(d, _, A) {
      return this._leafNode(new a(d, _, A));
    }
    // `+=` code
    add(d, _) {
      return this._leafNode(new c(d, e.operators.ADD, _));
    }
    // appends passed SafeExpr to code or executes Block
    code(d) {
      return typeof d == "function" ? d() : d !== t.nil && this._leafNode(new h(d)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...d) {
      const _ = ["{"];
      for (const [A, E] of d)
        _.length > 1 && _.push(","), _.push(A), (A !== E || this.opts.es5) && (_.push(":"), (0, t.addCodeArg)(_, E));
      return _.push("}"), new t._Code(_);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(d, _, A) {
      if (this._blockNode(new m(d)), _ && A)
        this.code(_).else().code(A).endIf();
      else if (_)
        this.code(_).endIf();
      else if (A)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(d) {
      return this._elseNode(new m(d));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new v());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, v);
    }
    _for(d, _) {
      return this._blockNode(d), _ && this.code(_).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(d, _) {
      return this._for(new T(d), _);
    }
    // `for` statement for a range of values
    forRange(d, _, A, E, g = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const D = this._scope.toName(d);
      return this._for(new I(g, D, _, A), () => E(D));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(d, _, A, E = r.varKinds.const) {
      const g = this._scope.toName(d);
      if (this.opts.es5) {
        const D = _ instanceof t.Name ? _ : this.var("_arr", _);
        return this.forRange("_i", 0, (0, t._)`${D}.length`, (O) => {
          this.var(g, (0, t._)`${D}[${O}]`), A(g);
        });
      }
      return this._for(new F("of", E, g, _), () => A(g));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(d, _, A, E = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(d, (0, t._)`Object.keys(${_})`, A);
      const g = this._scope.toName(d);
      return this._for(new F("in", E, g, _), () => A(g));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label(d) {
      return this._leafNode(new u(d));
    }
    // `break` statement
    break(d) {
      return this._leafNode(new l(d));
    }
    // `return` statement
    return(d) {
      const _ = new z();
      if (this._blockNode(_), this.code(d), _.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(z);
    }
    // `try` statement
    try(d, _, A) {
      if (!_ && !A)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const E = new ue();
      if (this._blockNode(E), this.code(d), _) {
        const g = this.name("e");
        this._currNode = E.catch = new R(g), _(g);
      }
      return A && (this._currNode = E.finally = new Z(), this.code(A)), this._endBlockNode(R, Z);
    }
    // `throw` statement
    throw(d) {
      return this._leafNode(new f(d));
    }
    // start self-balancing block
    block(d, _) {
      return this._blockStarts.push(this._nodes.length), d && this.code(d).endBlock(_), this;
    }
    // end the current self-balancing block
    endBlock(d) {
      const _ = this._blockStarts.pop();
      if (_ === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const A = this._nodes.length - _;
      if (A < 0 || d !== void 0 && A !== d)
        throw new Error(`CodeGen: wrong number of nodes: ${A} vs ${d} expected`);
      return this._nodes.length = _, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(d, _ = t.nil, A, E) {
      return this._blockNode(new H(d, _, A)), E && this.code(E).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(H);
    }
    optimize(d = 1) {
      for (; d-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(d) {
      return this._currNode.nodes.push(d), this;
    }
    _blockNode(d) {
      this._currNode.nodes.push(d), this._nodes.push(d);
    }
    _endBlockNode(d, _) {
      const A = this._currNode;
      if (A instanceof d || _ && A instanceof _)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${_ ? `${d.kind}/${_.kind}` : d.kind}"`);
    }
    _elseNode(d) {
      const _ = this._currNode;
      if (!(_ instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = _.else = d, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const d = this._nodes;
      return d[d.length - 1];
    }
    set _currNode(d) {
      const _ = this._nodes;
      _[_.length - 1] = d;
    }
  }
  e.CodeGen = x;
  function B(b, d) {
    for (const _ in d)
      b[_] = (b[_] || 0) + (d[_] || 0);
    return b;
  }
  function Q(b, d) {
    return d instanceof t._CodeOrName ? B(b, d.names) : b;
  }
  function j(b, d, _) {
    if (b instanceof t.Name)
      return A(b);
    if (!E(b))
      return b;
    return new t._Code(b._items.reduce((g, D) => (D instanceof t.Name && (D = A(D)), D instanceof t._Code ? g.push(...D._items) : g.push(D), g), []));
    function A(g) {
      const D = _[g.str];
      return D === void 0 || d[g.str] !== 1 ? g : (delete d[g.str], D);
    }
    function E(g) {
      return g instanceof t._Code && g._items.some((D) => D instanceof t.Name && d[D.str] === 1 && _[D.str] !== void 0);
    }
  }
  function L(b, d) {
    for (const _ in d)
      b[_] = (b[_] || 0) - (d[_] || 0);
  }
  function V(b) {
    return typeof b == "boolean" || typeof b == "number" || b === null ? !b : (0, t._)`!${N(b)}`;
  }
  e.not = V;
  const U = S(e.operators.AND);
  function G(...b) {
    return b.reduce(U);
  }
  e.and = G;
  const q = S(e.operators.OR);
  function C(...b) {
    return b.reduce(q);
  }
  e.or = C;
  function S(b) {
    return (d, _) => d === t.nil ? _ : _ === t.nil ? d : (0, t._)`${N(d)} ${b} ${N(_)}`;
  }
  function N(b) {
    return b instanceof t.Name ? b : (0, t._)`(${b})`;
  }
})(de);
var Y = {};
Object.defineProperty(Y, "__esModule", { value: !0 });
Y.checkStrictMode = Y.getErrorPath = Y.Type = Y.useFunc = Y.setEvaluated = Y.evaluatedPropsToName = Y.mergeEvaluated = Y.eachItem = Y.unescapeJsonPointer = Y.escapeJsonPointer = Y.escapeFragment = Y.unescapeFragment = Y.schemaRefOrVal = Y.schemaHasRulesButRef = Y.schemaHasRules = Y.checkUnknownRules = Y.alwaysValidSchema = Y.toHash = void 0;
const Pe = de, RM = co;
function IM(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
Y.toHash = IM;
function CM(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Mv(e, t), !xv(t, e.self.RULES.all));
}
Y.alwaysValidSchema = CM;
function Mv(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const i = n.RULES.keywords;
  for (const s in t)
    i[s] || Vv(e, `unknown keyword: "${s}"`);
}
Y.checkUnknownRules = Mv;
function xv(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
Y.schemaHasRules = xv;
function kM(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
Y.schemaHasRulesButRef = kM;
function DM({ topSchemaRef: e, schemaPath: t }, r, n, i) {
  if (!i) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, Pe._)`${r}`;
  }
  return (0, Pe._)`${e}${t}${(0, Pe.getProperty)(n)}`;
}
Y.schemaRefOrVal = DM;
function FM(e) {
  return qv(decodeURIComponent(e));
}
Y.unescapeFragment = FM;
function jM(e) {
  return encodeURIComponent(hd(e));
}
Y.escapeFragment = jM;
function hd(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
Y.escapeJsonPointer = hd;
function qv(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
Y.unescapeJsonPointer = qv;
function LM(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
Y.eachItem = LM;
function py({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (i, s, o, a) => {
    const c = o === void 0 ? s : o instanceof Pe.Name ? (s instanceof Pe.Name ? e(i, s, o) : t(i, s, o), o) : s instanceof Pe.Name ? (t(i, o, s), s) : r(s, o);
    return a === Pe.Name && !(c instanceof Pe.Name) ? n(i, c) : c;
  };
}
Y.mergeEvaluated = {
  props: py({
    mergeNames: (e, t, r) => e.if((0, Pe._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, Pe._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, Pe._)`${r} || {}`).code((0, Pe._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, Pe._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, Pe._)`${r} || {}`), pd(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Bv
  }),
  items: py({
    mergeNames: (e, t, r) => e.if((0, Pe._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, Pe._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, Pe._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, Pe._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Bv(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, Pe._)`{}`);
  return t !== void 0 && pd(e, r, t), r;
}
Y.evaluatedPropsToName = Bv;
function pd(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, Pe._)`${t}${(0, Pe.getProperty)(n)}`, !0));
}
Y.setEvaluated = pd;
const my = {};
function UM(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: my[t.code] || (my[t.code] = new RM._Code(t.code))
  });
}
Y.useFunc = UM;
var $u;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})($u || (Y.Type = $u = {}));
function MM(e, t, r) {
  if (e instanceof Pe.Name) {
    const n = t === $u.Num;
    return r ? n ? (0, Pe._)`"[" + ${e} + "]"` : (0, Pe._)`"['" + ${e} + "']"` : n ? (0, Pe._)`"/" + ${e}` : (0, Pe._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, Pe.getProperty)(e).toString() : "/" + hd(e);
}
Y.getErrorPath = MM;
function Vv(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
Y.checkStrictMode = Vv;
var _r = {};
Object.defineProperty(_r, "__esModule", { value: !0 });
const ct = de, xM = {
  // validation function arguments
  data: new ct.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new ct.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new ct.Name("instancePath"),
  parentData: new ct.Name("parentData"),
  parentDataProperty: new ct.Name("parentDataProperty"),
  rootData: new ct.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new ct.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new ct.Name("vErrors"),
  // null or array of validation errors
  errors: new ct.Name("errors"),
  // counter of validation errors
  this: new ct.Name("this"),
  // "globals"
  self: new ct.Name("self"),
  scope: new ct.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new ct.Name("json"),
  jsonPos: new ct.Name("jsonPos"),
  jsonLen: new ct.Name("jsonLen"),
  jsonPart: new ct.Name("jsonPart")
};
_r.default = xM;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = de, r = Y, n = _r;
  e.keywordError = {
    message: ({ keyword: v }) => (0, t.str)`must pass "${v}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: v, schemaType: m }) => m ? (0, t.str)`"${v}" keyword must be ${m} ($data)` : (0, t.str)`"${v}" keyword is invalid ($data)`
  };
  function i(v, m = e.keywordError, w, T) {
    const { it: I } = v, { gen: F, compositeRule: H, allErrors: z } = I, ue = f(v, m, w);
    T ?? (H || z) ? c(F, ue) : u(I, (0, t._)`[${ue}]`);
  }
  e.reportError = i;
  function s(v, m = e.keywordError, w) {
    const { it: T } = v, { gen: I, compositeRule: F, allErrors: H } = T, z = f(v, m, w);
    c(I, z), F || H || u(T, n.default.vErrors);
  }
  e.reportExtraError = s;
  function o(v, m) {
    v.assign(n.default.errors, m), v.if((0, t._)`${n.default.vErrors} !== null`, () => v.if(m, () => v.assign((0, t._)`${n.default.vErrors}.length`, m), () => v.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = o;
  function a({ gen: v, keyword: m, schemaValue: w, data: T, errsCount: I, it: F }) {
    if (I === void 0)
      throw new Error("ajv implementation error");
    const H = v.name("err");
    v.forRange("i", I, n.default.errors, (z) => {
      v.const(H, (0, t._)`${n.default.vErrors}[${z}]`), v.if((0, t._)`${H}.instancePath === undefined`, () => v.assign((0, t._)`${H}.instancePath`, (0, t.strConcat)(n.default.instancePath, F.errorPath))), v.assign((0, t._)`${H}.schemaPath`, (0, t.str)`${F.errSchemaPath}/${m}`), F.opts.verbose && (v.assign((0, t._)`${H}.schema`, w), v.assign((0, t._)`${H}.data`, T));
    });
  }
  e.extendErrors = a;
  function c(v, m) {
    const w = v.const("err", m);
    v.if((0, t._)`${n.default.vErrors} === null`, () => v.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), v.code((0, t._)`${n.default.errors}++`);
  }
  function u(v, m) {
    const { gen: w, validateName: T, schemaEnv: I } = v;
    I.$async ? w.throw((0, t._)`new ${v.ValidationError}(${m})`) : (w.assign((0, t._)`${T}.errors`, m), w.return(!1));
  }
  const l = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function f(v, m, w) {
    const { createErrors: T } = v.it;
    return T === !1 ? (0, t._)`{}` : h(v, m, w);
  }
  function h(v, m, w = {}) {
    const { gen: T, it: I } = v, F = [
      p(I, w),
      y(v, w)
    ];
    return $(v, m, F), T.object(...F);
  }
  function p({ errorPath: v }, { instancePath: m }) {
    const w = m ? (0, t.str)`${v}${(0, r.getErrorPath)(m, r.Type.Str)}` : v;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function y({ keyword: v, it: { errSchemaPath: m } }, { schemaPath: w, parentSchema: T }) {
    let I = T ? m : (0, t.str)`${m}/${v}`;
    return w && (I = (0, t.str)`${I}${(0, r.getErrorPath)(w, r.Type.Str)}`), [l.schemaPath, I];
  }
  function $(v, { params: m, message: w }, T) {
    const { keyword: I, data: F, schemaValue: H, it: z } = v, { opts: ue, propertyName: R, topSchemaRef: Z, schemaPath: x } = z;
    T.push([l.keyword, I], [l.params, typeof m == "function" ? m(v) : m || (0, t._)`{}`]), ue.messages && T.push([l.message, typeof w == "function" ? w(v) : w]), ue.verbose && T.push([l.schema, H], [l.parentSchema, (0, t._)`${Z}${x}`], [n.default.data, F]), R && T.push([l.propertyName, R]);
  }
})(Oo);
Object.defineProperty(Hi, "__esModule", { value: !0 });
Hi.boolOrEmptySchema = Hi.topBoolOrEmptySchema = void 0;
const qM = Oo, BM = de, VM = _r, HM = {
  message: "boolean schema is false"
};
function GM(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Hv(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(VM.default.data) : (t.assign((0, BM._)`${n}.errors`, null), t.return(!0));
}
Hi.topBoolOrEmptySchema = GM;
function zM(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Hv(e)) : r.var(t, !0);
}
Hi.boolOrEmptySchema = zM;
function Hv(e, t) {
  const { gen: r, data: n } = e, i = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, qM.reportError)(i, HM, void 0, t);
}
var Ve = {}, Zn = {};
Object.defineProperty(Zn, "__esModule", { value: !0 });
Zn.getRules = Zn.isJSONType = void 0;
const KM = ["string", "number", "integer", "boolean", "null", "object", "array"], WM = new Set(KM);
function YM(e) {
  return typeof e == "string" && WM.has(e);
}
Zn.isJSONType = YM;
function JM() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
Zn.getRules = JM;
var Dr = {};
Object.defineProperty(Dr, "__esModule", { value: !0 });
Dr.shouldUseRule = Dr.shouldUseGroup = Dr.schemaHasRulesForType = void 0;
function XM({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && Gv(e, n);
}
Dr.schemaHasRulesForType = XM;
function Gv(e, t) {
  return t.rules.some((r) => zv(e, r));
}
Dr.shouldUseGroup = Gv;
function zv(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Dr.shouldUseRule = zv;
Object.defineProperty(Ve, "__esModule", { value: !0 });
Ve.reportTypeError = Ve.checkDataTypes = Ve.checkDataType = Ve.coerceAndCheckDataType = Ve.getJSONTypes = Ve.getSchemaTypes = Ve.DataType = void 0;
const QM = Zn, ZM = Dr, ex = Oo, le = de, Kv = Y;
var Fi;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Fi || (Ve.DataType = Fi = {}));
function tx(e) {
  const t = Wv(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
Ve.getSchemaTypes = tx;
function Wv(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(QM.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Ve.getJSONTypes = Wv;
function rx(e, t) {
  const { gen: r, data: n, opts: i } = e, s = nx(t, i.coerceTypes), o = t.length > 0 && !(s.length === 0 && t.length === 1 && (0, ZM.schemaHasRulesForType)(e, t[0]));
  if (o) {
    const a = md(t, n, i.strictNumbers, Fi.Wrong);
    r.if(a, () => {
      s.length ? ix(e, t, s) : yd(e);
    });
  }
  return o;
}
Ve.coerceAndCheckDataType = rx;
const Yv = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function nx(e, t) {
  return t ? e.filter((r) => Yv.has(r) || t === "array" && r === "array") : [];
}
function ix(e, t, r) {
  const { gen: n, data: i, opts: s } = e, o = n.let("dataType", (0, le._)`typeof ${i}`), a = n.let("coerced", (0, le._)`undefined`);
  s.coerceTypes === "array" && n.if((0, le._)`${o} == 'object' && Array.isArray(${i}) && ${i}.length == 1`, () => n.assign(i, (0, le._)`${i}[0]`).assign(o, (0, le._)`typeof ${i}`).if(md(t, i, s.strictNumbers), () => n.assign(a, i))), n.if((0, le._)`${a} !== undefined`);
  for (const u of r)
    (Yv.has(u) || u === "array" && s.coerceTypes === "array") && c(u);
  n.else(), yd(e), n.endIf(), n.if((0, le._)`${a} !== undefined`, () => {
    n.assign(i, a), sx(e, a);
  });
  function c(u) {
    switch (u) {
      case "string":
        n.elseIf((0, le._)`${o} == "number" || ${o} == "boolean"`).assign(a, (0, le._)`"" + ${i}`).elseIf((0, le._)`${i} === null`).assign(a, (0, le._)`""`);
        return;
      case "number":
        n.elseIf((0, le._)`${o} == "boolean" || ${i} === null
              || (${o} == "string" && ${i} && ${i} == +${i})`).assign(a, (0, le._)`+${i}`);
        return;
      case "integer":
        n.elseIf((0, le._)`${o} === "boolean" || ${i} === null
              || (${o} === "string" && ${i} && ${i} == +${i} && !(${i} % 1))`).assign(a, (0, le._)`+${i}`);
        return;
      case "boolean":
        n.elseIf((0, le._)`${i} === "false" || ${i} === 0 || ${i} === null`).assign(a, !1).elseIf((0, le._)`${i} === "true" || ${i} === 1`).assign(a, !0);
        return;
      case "null":
        n.elseIf((0, le._)`${i} === "" || ${i} === 0 || ${i} === false`), n.assign(a, null);
        return;
      case "array":
        n.elseIf((0, le._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${i} === null`).assign(a, (0, le._)`[${i}]`);
    }
  }
}
function sx({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, le._)`${t} !== undefined`, () => e.assign((0, le._)`${t}[${r}]`, n));
}
function vu(e, t, r, n = Fi.Correct) {
  const i = n === Fi.Correct ? le.operators.EQ : le.operators.NEQ;
  let s;
  switch (e) {
    case "null":
      return (0, le._)`${t} ${i} null`;
    case "array":
      s = (0, le._)`Array.isArray(${t})`;
      break;
    case "object":
      s = (0, le._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      s = o((0, le._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      s = o();
      break;
    default:
      return (0, le._)`typeof ${t} ${i} ${e}`;
  }
  return n === Fi.Correct ? s : (0, le.not)(s);
  function o(a = le.nil) {
    return (0, le.and)((0, le._)`typeof ${t} == "number"`, a, r ? (0, le._)`isFinite(${t})` : le.nil);
  }
}
Ve.checkDataType = vu;
function md(e, t, r, n) {
  if (e.length === 1)
    return vu(e[0], t, r, n);
  let i;
  const s = (0, Kv.toHash)(e);
  if (s.array && s.object) {
    const o = (0, le._)`typeof ${t} != "object"`;
    i = s.null ? o : (0, le._)`!${t} || ${o}`, delete s.null, delete s.array, delete s.object;
  } else
    i = le.nil;
  s.number && delete s.integer;
  for (const o in s)
    i = (0, le.and)(i, vu(o, t, r, n));
  return i;
}
Ve.checkDataTypes = md;
const ox = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, le._)`{type: ${e}}` : (0, le._)`{type: ${t}}`
};
function yd(e) {
  const t = ax(e);
  (0, ex.reportError)(t, ox);
}
Ve.reportTypeError = yd;
function ax(e) {
  const { gen: t, data: r, schema: n } = e, i = (0, Kv.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: i,
    schemaValue: i,
    parentSchema: n,
    params: {},
    it: e
  };
}
var jc = {};
Object.defineProperty(jc, "__esModule", { value: !0 });
jc.assignDefaults = void 0;
const yi = de, cx = Y;
function lx(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const i in r)
      yy(e, i, r[i].default);
  else t === "array" && Array.isArray(n) && n.forEach((i, s) => yy(e, s, i.default));
}
jc.assignDefaults = lx;
function yy(e, t, r) {
  const { gen: n, compositeRule: i, data: s, opts: o } = e;
  if (r === void 0)
    return;
  const a = (0, yi._)`${s}${(0, yi.getProperty)(t)}`;
  if (i) {
    (0, cx.checkStrictMode)(e, `default is ignored for: ${a}`);
    return;
  }
  let c = (0, yi._)`${a} === undefined`;
  o.useDefaults === "empty" && (c = (0, yi._)`${c} || ${a} === null || ${a} === ""`), n.if(c, (0, yi._)`${a} = ${(0, yi.stringify)(r)}`);
}
var yr = {}, pe = {};
Object.defineProperty(pe, "__esModule", { value: !0 });
pe.validateUnion = pe.validateArray = pe.usePattern = pe.callValidateCode = pe.schemaProperties = pe.allSchemaProperties = pe.noPropertyInData = pe.propertyInData = pe.isOwnProperty = pe.hasPropFunc = pe.reportMissingProp = pe.checkMissingProp = pe.checkReportMissingProp = void 0;
const Re = de, gd = Y, Xr = _r, ux = Y;
function fx(e, t) {
  const { gen: r, data: n, it: i } = e;
  r.if(vd(r, n, t, i.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, Re._)`${t}` }, !0), e.error();
  });
}
pe.checkReportMissingProp = fx;
function dx({ gen: e, data: t, it: { opts: r } }, n, i) {
  return (0, Re.or)(...n.map((s) => (0, Re.and)(vd(e, t, s, r.ownProperties), (0, Re._)`${i} = ${s}`)));
}
pe.checkMissingProp = dx;
function hx(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
pe.reportMissingProp = hx;
function Jv(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, Re._)`Object.prototype.hasOwnProperty`
  });
}
pe.hasPropFunc = Jv;
function $d(e, t, r) {
  return (0, Re._)`${Jv(e)}.call(${t}, ${r})`;
}
pe.isOwnProperty = $d;
function px(e, t, r, n) {
  const i = (0, Re._)`${t}${(0, Re.getProperty)(r)} !== undefined`;
  return n ? (0, Re._)`${i} && ${$d(e, t, r)}` : i;
}
pe.propertyInData = px;
function vd(e, t, r, n) {
  const i = (0, Re._)`${t}${(0, Re.getProperty)(r)} === undefined`;
  return n ? (0, Re.or)(i, (0, Re.not)($d(e, t, r))) : i;
}
pe.noPropertyInData = vd;
function Xv(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
pe.allSchemaProperties = Xv;
function mx(e, t) {
  return Xv(t).filter((r) => !(0, gd.alwaysValidSchema)(e, t[r]));
}
pe.schemaProperties = mx;
function yx({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: i, errorPath: s }, it: o }, a, c, u) {
  const l = u ? (0, Re._)`${e}, ${t}, ${n}${i}` : t, f = [
    [Xr.default.instancePath, (0, Re.strConcat)(Xr.default.instancePath, s)],
    [Xr.default.parentData, o.parentData],
    [Xr.default.parentDataProperty, o.parentDataProperty],
    [Xr.default.rootData, Xr.default.rootData]
  ];
  o.opts.dynamicRef && f.push([Xr.default.dynamicAnchors, Xr.default.dynamicAnchors]);
  const h = (0, Re._)`${l}, ${r.object(...f)}`;
  return c !== Re.nil ? (0, Re._)`${a}.call(${c}, ${h})` : (0, Re._)`${a}(${h})`;
}
pe.callValidateCode = yx;
const gx = (0, Re._)`new RegExp`;
function $x({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: i } = t.code, s = i(r, n);
  return e.scopeValue("pattern", {
    key: s.toString(),
    ref: s,
    code: (0, Re._)`${i.code === "new RegExp" ? gx : (0, ux.useFunc)(e, i)}(${r}, ${n})`
  });
}
pe.usePattern = $x;
function vx(e) {
  const { gen: t, data: r, keyword: n, it: i } = e, s = t.name("valid");
  if (i.allErrors) {
    const a = t.let("valid", !0);
    return o(() => t.assign(a, !1)), a;
  }
  return t.var(s, !0), o(() => t.break()), s;
  function o(a) {
    const c = t.const("len", (0, Re._)`${r}.length`);
    t.forRange("i", 0, c, (u) => {
      e.subschema({
        keyword: n,
        dataProp: u,
        dataPropType: gd.Type.Num
      }, s), t.if((0, Re.not)(s), a);
    });
  }
}
pe.validateArray = vx;
function _x(e) {
  const { gen: t, schema: r, keyword: n, it: i } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, gd.alwaysValidSchema)(i, c)) && !i.opts.unevaluated)
    return;
  const o = t.let("valid", !1), a = t.name("_valid");
  t.block(() => r.forEach((c, u) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: u,
      compositeRule: !0
    }, a);
    t.assign(o, (0, Re._)`${o} || ${a}`), e.mergeValidEvaluated(l, a) || t.if((0, Re.not)(o));
  })), e.result(o, () => e.reset(), () => e.error(!0));
}
pe.validateUnion = _x;
Object.defineProperty(yr, "__esModule", { value: !0 });
yr.validateKeywordUsage = yr.validSchemaType = yr.funcKeywordCode = yr.macroKeywordCode = void 0;
const gt = de, Hn = _r, wx = pe, Ex = Oo;
function Sx(e, t) {
  const { gen: r, keyword: n, schema: i, parentSchema: s, it: o } = e, a = t.macro.call(o.self, i, s, o), c = Qv(r, n, a);
  o.opts.validateSchema !== !1 && o.self.validateSchema(a, !0);
  const u = r.name("valid");
  e.subschema({
    schema: a,
    schemaPath: gt.nil,
    errSchemaPath: `${o.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, u), e.pass(u, () => e.error(!0));
}
yr.macroKeywordCode = Sx;
function bx(e, t) {
  var r;
  const { gen: n, keyword: i, schema: s, parentSchema: o, $data: a, it: c } = e;
  Tx(c, t);
  const u = !a && t.compile ? t.compile.call(c.self, s, o, c) : t.validate, l = Qv(n, i, u), f = n.let("valid");
  e.block$data(f, h), e.ok((r = t.valid) !== null && r !== void 0 ? r : f);
  function h() {
    if (t.errors === !1)
      $(), t.modifying && gy(e), v(() => e.error());
    else {
      const m = t.async ? p() : y();
      t.modifying && gy(e), v(() => Px(e, m));
    }
  }
  function p() {
    const m = n.let("ruleErrs", null);
    return n.try(() => $((0, gt._)`await `), (w) => n.assign(f, !1).if((0, gt._)`${w} instanceof ${c.ValidationError}`, () => n.assign(m, (0, gt._)`${w}.errors`), () => n.throw(w))), m;
  }
  function y() {
    const m = (0, gt._)`${l}.errors`;
    return n.assign(m, null), $(gt.nil), m;
  }
  function $(m = t.async ? (0, gt._)`await ` : gt.nil) {
    const w = c.opts.passContext ? Hn.default.this : Hn.default.self, T = !("compile" in t && !a || t.schema === !1);
    n.assign(f, (0, gt._)`${m}${(0, wx.callValidateCode)(e, l, w, T)}`, t.modifying);
  }
  function v(m) {
    var w;
    n.if((0, gt.not)((w = t.valid) !== null && w !== void 0 ? w : f), m);
  }
}
yr.funcKeywordCode = bx;
function gy(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, gt._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Px(e, t) {
  const { gen: r } = e;
  r.if((0, gt._)`Array.isArray(${t})`, () => {
    r.assign(Hn.default.vErrors, (0, gt._)`${Hn.default.vErrors} === null ? ${t} : ${Hn.default.vErrors}.concat(${t})`).assign(Hn.default.errors, (0, gt._)`${Hn.default.vErrors}.length`), (0, Ex.extendErrors)(e);
  }, () => e.error());
}
function Tx({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Qv(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, gt.stringify)(r) });
}
function Ax(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
yr.validSchemaType = Ax;
function Nx({ schema: e, opts: t, self: r, errSchemaPath: n }, i, s) {
  if (Array.isArray(i.keyword) ? !i.keyword.includes(s) : i.keyword !== s)
    throw new Error("ajv implementation error");
  const o = i.dependencies;
  if (o != null && o.some((a) => !Object.prototype.hasOwnProperty.call(e, a)))
    throw new Error(`parent schema must have dependencies of ${s}: ${o.join(",")}`);
  if (i.validateSchema && !i.validateSchema(e[s])) {
    const c = `keyword "${s}" value is invalid at path "${n}": ` + r.errorsText(i.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
yr.validateKeywordUsage = Nx;
var dn = {};
Object.defineProperty(dn, "__esModule", { value: !0 });
dn.extendSubschemaMode = dn.extendSubschemaData = dn.getSubschema = void 0;
const hr = de, Zv = Y;
function Ox(e, { keyword: t, schemaProp: r, schema: n, schemaPath: i, errSchemaPath: s, topSchemaRef: o }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const a = e.schema[t];
    return r === void 0 ? {
      schema: a,
      schemaPath: (0, hr._)`${e.schemaPath}${(0, hr.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: a[r],
      schemaPath: (0, hr._)`${e.schemaPath}${(0, hr.getProperty)(t)}${(0, hr.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Zv.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (i === void 0 || s === void 0 || o === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: i,
      topSchemaRef: o,
      errSchemaPath: s
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
dn.getSubschema = Ox;
function Rx(e, t, { dataProp: r, dataPropType: n, data: i, dataTypes: s, propertyName: o }) {
  if (i !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: a } = t;
  if (r !== void 0) {
    const { errorPath: u, dataPathArr: l, opts: f } = t, h = a.let("data", (0, hr._)`${t.data}${(0, hr.getProperty)(r)}`, !0);
    c(h), e.errorPath = (0, hr.str)`${u}${(0, Zv.getErrorPath)(r, n, f.jsPropertySyntax)}`, e.parentDataProperty = (0, hr._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (i !== void 0) {
    const u = i instanceof hr.Name ? i : a.let("data", i, !0);
    c(u), o !== void 0 && (e.propertyName = o);
  }
  s && (e.dataTypes = s);
  function c(u) {
    e.data = u, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, u];
  }
}
dn.extendSubschemaData = Rx;
function Ix(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: i, allErrors: s }) {
  n !== void 0 && (e.compositeRule = n), i !== void 0 && (e.createErrors = i), s !== void 0 && (e.allErrors = s), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
dn.extendSubschemaMode = Ix;
var tt = {};
Object.defineProperty(tt, "__esModule", { value: !0 });
tt.getSchemaRefs = tt.resolveUrl = tt.normalizeId = tt._getFullPath = tt.getFullPath = tt.inlineRef = void 0;
const Cx = Y, kx = Oc, Dx = Z$, Fx = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function jx(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !_u(e) : t ? e_(e) <= t : !1;
}
tt.inlineRef = jx;
const Lx = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function _u(e) {
  for (const t in e) {
    if (Lx.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(_u) || typeof r == "object" && _u(r))
      return !0;
  }
  return !1;
}
function e_(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Fx.has(r) && (typeof e[r] == "object" && (0, Cx.eachItem)(e[r], (n) => t += e_(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function t_(e, t = "", r) {
  r !== !1 && (t = ji(t));
  const n = e.parse(t);
  return r_(e, n);
}
tt.getFullPath = t_;
function r_(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
tt._getFullPath = r_;
const Ux = /#\/?$/;
function ji(e) {
  return e ? e.replace(Ux, "") : "";
}
tt.normalizeId = ji;
function Mx(e, t, r) {
  return r = ji(r), e.resolve(t, r);
}
tt.resolveUrl = Mx;
const xx = /^[a-z_][-a-z0-9._]*$/i;
function qx(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, i = ji(e[r] || t), s = { "": i }, o = t_(n, i, !1), a = {}, c = /* @__PURE__ */ new Set();
  return Dx(e, { allKeys: !0 }, (f, h, p, y) => {
    if (y === void 0)
      return;
    const $ = o + h;
    let v = s[y];
    typeof f[r] == "string" && (v = m.call(this, f[r])), w.call(this, f.$anchor), w.call(this, f.$dynamicAnchor), s[h] = v;
    function m(T) {
      const I = this.opts.uriResolver.resolve;
      if (T = ji(v ? I(v, T) : T), c.has(T))
        throw l(T);
      c.add(T);
      let F = this.refs[T];
      return typeof F == "string" && (F = this.refs[F]), typeof F == "object" ? u(f, F.schema, T) : T !== ji($) && (T[0] === "#" ? (u(f, a[T], T), a[T] = f) : this.refs[T] = $), T;
    }
    function w(T) {
      if (typeof T == "string") {
        if (!xx.test(T))
          throw new Error(`invalid anchor "${T}"`);
        m.call(this, `#${T}`);
      }
    }
  }), a;
  function u(f, h, p) {
    if (h !== void 0 && !kx(f, h))
      throw l(p);
  }
  function l(f) {
    return new Error(`reference "${f}" resolves to more than one schema`);
  }
}
tt.getSchemaRefs = qx;
Object.defineProperty(sr, "__esModule", { value: !0 });
sr.getData = sr.KeywordCxt = sr.validateFunctionCode = void 0;
const n_ = Hi, $y = Ve, _d = Dr, Wa = Ve, Bx = jc, Ls = yr, Fl = dn, te = de, ie = _r, Vx = tt, Fr = Y, vs = Oo;
function Hx(e) {
  if (o_(e) && (a_(e), s_(e))) {
    Kx(e);
    return;
  }
  i_(e, () => (0, n_.topBoolOrEmptySchema)(e));
}
sr.validateFunctionCode = Hx;
function i_({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: i }, s) {
  i.code.es5 ? e.func(t, (0, te._)`${ie.default.data}, ${ie.default.valCxt}`, n.$async, () => {
    e.code((0, te._)`"use strict"; ${vy(r, i)}`), zx(e, i), e.code(s);
  }) : e.func(t, (0, te._)`${ie.default.data}, ${Gx(i)}`, n.$async, () => e.code(vy(r, i)).code(s));
}
function Gx(e) {
  return (0, te._)`{${ie.default.instancePath}="", ${ie.default.parentData}, ${ie.default.parentDataProperty}, ${ie.default.rootData}=${ie.default.data}${e.dynamicRef ? (0, te._)`, ${ie.default.dynamicAnchors}={}` : te.nil}}={}`;
}
function zx(e, t) {
  e.if(ie.default.valCxt, () => {
    e.var(ie.default.instancePath, (0, te._)`${ie.default.valCxt}.${ie.default.instancePath}`), e.var(ie.default.parentData, (0, te._)`${ie.default.valCxt}.${ie.default.parentData}`), e.var(ie.default.parentDataProperty, (0, te._)`${ie.default.valCxt}.${ie.default.parentDataProperty}`), e.var(ie.default.rootData, (0, te._)`${ie.default.valCxt}.${ie.default.rootData}`), t.dynamicRef && e.var(ie.default.dynamicAnchors, (0, te._)`${ie.default.valCxt}.${ie.default.dynamicAnchors}`);
  }, () => {
    e.var(ie.default.instancePath, (0, te._)`""`), e.var(ie.default.parentData, (0, te._)`undefined`), e.var(ie.default.parentDataProperty, (0, te._)`undefined`), e.var(ie.default.rootData, ie.default.data), t.dynamicRef && e.var(ie.default.dynamicAnchors, (0, te._)`{}`);
  });
}
function Kx(e) {
  const { schema: t, opts: r, gen: n } = e;
  i_(e, () => {
    r.$comment && t.$comment && l_(e), Qx(e), n.let(ie.default.vErrors, null), n.let(ie.default.errors, 0), r.unevaluated && Wx(e), c_(e), t3(e);
  });
}
function Wx(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, te._)`${r}.evaluated`), t.if((0, te._)`${e.evaluated}.dynamicProps`, () => t.assign((0, te._)`${e.evaluated}.props`, (0, te._)`undefined`)), t.if((0, te._)`${e.evaluated}.dynamicItems`, () => t.assign((0, te._)`${e.evaluated}.items`, (0, te._)`undefined`));
}
function vy(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, te._)`/*# sourceURL=${r} */` : te.nil;
}
function Yx(e, t) {
  if (o_(e) && (a_(e), s_(e))) {
    Jx(e, t);
    return;
  }
  (0, n_.boolOrEmptySchema)(e, t);
}
function s_({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function o_(e) {
  return typeof e.schema != "boolean";
}
function Jx(e, t) {
  const { schema: r, gen: n, opts: i } = e;
  i.$comment && r.$comment && l_(e), Zx(e), e3(e);
  const s = n.const("_errs", ie.default.errors);
  c_(e, s), n.var(t, (0, te._)`${s} === ${ie.default.errors}`);
}
function a_(e) {
  (0, Fr.checkUnknownRules)(e), Xx(e);
}
function c_(e, t) {
  if (e.opts.jtd)
    return _y(e, [], !1, t);
  const r = (0, $y.getSchemaTypes)(e.schema), n = (0, $y.coerceAndCheckDataType)(e, r);
  _y(e, r, !n, t);
}
function Xx(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: i } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, Fr.schemaHasRulesButRef)(t, i.RULES) && i.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function Qx(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, Fr.checkStrictMode)(e, "default is ignored in the schema root");
}
function Zx(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, Vx.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function e3(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function l_({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: i }) {
  const s = r.$comment;
  if (i.$comment === !0)
    e.code((0, te._)`${ie.default.self}.logger.log(${s})`);
  else if (typeof i.$comment == "function") {
    const o = (0, te.str)`${n}/$comment`, a = e.scopeValue("root", { ref: t.root });
    e.code((0, te._)`${ie.default.self}.opts.$comment(${s}, ${o}, ${a}.schema)`);
  }
}
function t3(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: i, opts: s } = e;
  r.$async ? t.if((0, te._)`${ie.default.errors} === 0`, () => t.return(ie.default.data), () => t.throw((0, te._)`new ${i}(${ie.default.vErrors})`)) : (t.assign((0, te._)`${n}.errors`, ie.default.vErrors), s.unevaluated && r3(e), t.return((0, te._)`${ie.default.errors} === 0`));
}
function r3({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof te.Name && e.assign((0, te._)`${t}.props`, r), n instanceof te.Name && e.assign((0, te._)`${t}.items`, n);
}
function _y(e, t, r, n) {
  const { gen: i, schema: s, data: o, allErrors: a, opts: c, self: u } = e, { RULES: l } = u;
  if (s.$ref && (c.ignoreKeywordsWithRef || !(0, Fr.schemaHasRulesButRef)(s, l))) {
    i.block(() => d_(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || n3(e, t), i.block(() => {
    for (const h of l.rules)
      f(h);
    f(l.post);
  });
  function f(h) {
    (0, _d.shouldUseGroup)(s, h) && (h.type ? (i.if((0, Wa.checkDataType)(h.type, o, c.strictNumbers)), wy(e, h), t.length === 1 && t[0] === h.type && r && (i.else(), (0, Wa.reportTypeError)(e)), i.endIf()) : wy(e, h), a || i.if((0, te._)`${ie.default.errors} === ${n || 0}`));
  }
}
function wy(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: i } } = e;
  i && (0, Bx.assignDefaults)(e, t.type), r.block(() => {
    for (const s of t.rules)
      (0, _d.shouldUseRule)(n, s) && d_(e, s.keyword, s.definition, t.type);
  });
}
function n3(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (i3(e, t), e.opts.allowUnionTypes || s3(e, t), o3(e, e.dataTypes));
}
function i3(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      u_(e.dataTypes, r) || wd(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), c3(e, t);
  }
}
function s3(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && wd(e, "use allowUnionTypes to allow union type keyword");
}
function o3(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const i = r[n];
    if (typeof i == "object" && (0, _d.shouldUseRule)(e.schema, i)) {
      const { type: s } = i.definition;
      s.length && !s.some((o) => a3(t, o)) && wd(e, `missing type "${s.join(",")}" for keyword "${n}"`);
    }
  }
}
function a3(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function u_(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function c3(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    u_(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function wd(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, Fr.checkStrictMode)(e, t, e.opts.strictTypes);
}
class f_ {
  constructor(t, r, n) {
    if ((0, Ls.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Fr.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", h_(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Ls.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", ie.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, te.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, te.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, te._)`${r} !== undefined && (${(0, te.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? vs.reportExtraError : vs.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, vs.reportError)(this, this.def.$dataError || vs.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, vs.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = te.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = te.nil, r = te.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: i, schemaType: s, def: o } = this;
    n.if((0, te.or)((0, te._)`${i} === undefined`, r)), t !== te.nil && n.assign(t, !0), (s.length || o.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== te.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: i, it: s } = this;
    return (0, te.or)(o(), a());
    function o() {
      if (n.length) {
        if (!(r instanceof te.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, te._)`${(0, Wa.checkDataTypes)(c, r, s.opts.strictNumbers, Wa.DataType.Wrong)}`;
      }
      return te.nil;
    }
    function a() {
      if (i.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: i.validateSchema });
        return (0, te._)`!${c}(${r})`;
      }
      return te.nil;
    }
  }
  subschema(t, r) {
    const n = (0, Fl.getSubschema)(this.it, t);
    (0, Fl.extendSubschemaData)(n, this.it, t), (0, Fl.extendSubschemaMode)(n, t);
    const i = { ...this.it, ...n, items: void 0, props: void 0 };
    return Yx(i, r), i;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: i } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = Fr.mergeEvaluated.props(i, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = Fr.mergeEvaluated.items(i, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: i } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return i.if(r, () => this.mergeEvaluated(t, te.Name)), !0;
  }
}
sr.KeywordCxt = f_;
function d_(e, t, r, n) {
  const i = new f_(e, r, t);
  "code" in r ? r.code(i, n) : i.$data && r.validate ? (0, Ls.funcKeywordCode)(i, r) : "macro" in r ? (0, Ls.macroKeywordCode)(i, r) : (r.compile || r.validate) && (0, Ls.funcKeywordCode)(i, r);
}
const l3 = /^\/(?:[^~]|~0|~1)*$/, u3 = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function h_(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let i, s;
  if (e === "")
    return ie.default.rootData;
  if (e[0] === "/") {
    if (!l3.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    i = e, s = ie.default.rootData;
  } else {
    const u = u3.exec(e);
    if (!u)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +u[1];
    if (i = u[2], i === "#") {
      if (l >= t)
        throw new Error(c("property/index", l));
      return n[t - l];
    }
    if (l > t)
      throw new Error(c("data", l));
    if (s = r[t - l], !i)
      return s;
  }
  let o = s;
  const a = i.split("/");
  for (const u of a)
    u && (s = (0, te._)`${s}${(0, te.getProperty)((0, Fr.unescapeJsonPointer)(u))}`, o = (0, te._)`${o} && ${s}`);
  return o;
  function c(u, l) {
    return `Cannot access ${u} ${l} levels up, current level is ${t}`;
  }
}
sr.getData = h_;
var ca = {}, Ey;
function Ed() {
  if (Ey) return ca;
  Ey = 1, Object.defineProperty(ca, "__esModule", { value: !0 });
  class e extends Error {
    constructor(r) {
      super("validation failed"), this.errors = r, this.ajv = this.validation = !0;
    }
  }
  return ca.default = e, ca;
}
var ns = {};
Object.defineProperty(ns, "__esModule", { value: !0 });
const jl = tt;
class f3 extends Error {
  constructor(t, r, n, i) {
    super(i || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, jl.resolveUrl)(t, r, n), this.missingSchema = (0, jl.normalizeId)((0, jl.getFullPath)(t, this.missingRef));
  }
}
ns.default = f3;
var Rt = {};
Object.defineProperty(Rt, "__esModule", { value: !0 });
Rt.resolveSchema = Rt.getCompilingSchema = Rt.resolveRef = Rt.compileSchema = Rt.SchemaEnv = void 0;
const Qt = de, d3 = Ed(), Dn = _r, nr = tt, Sy = Y, h3 = sr;
class Lc {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, nr.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Rt.SchemaEnv = Lc;
function Sd(e) {
  const t = p_.call(this, e);
  if (t)
    return t;
  const r = (0, nr.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: i } = this.opts.code, { ownProperties: s } = this.opts, o = new Qt.CodeGen(this.scope, { es5: n, lines: i, ownProperties: s });
  let a;
  e.$async && (a = o.scopeValue("Error", {
    ref: d3.default,
    code: (0, Qt._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = o.scopeName("validate");
  e.validateName = c;
  const u = {
    gen: o,
    allErrors: this.opts.allErrors,
    data: Dn.default.data,
    parentData: Dn.default.parentData,
    parentDataProperty: Dn.default.parentDataProperty,
    dataNames: [Dn.default.data],
    dataPathArr: [Qt.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Qt.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: a,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Qt.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Qt._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, h3.validateFunctionCode)(u), o.optimize(this.opts.code.optimize);
    const f = o.toString();
    l = `${o.scopeRefs(Dn.default.scope)}return ${f}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const p = new Function(`${Dn.default.self}`, `${Dn.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: p }), p.errors = null, p.schema = e.schema, p.schemaEnv = e, e.$async && (p.$async = !0), this.opts.code.source === !0 && (p.source = { validateName: c, validateCode: f, scopeValues: o._values }), this.opts.unevaluated) {
      const { props: y, items: $ } = u;
      p.evaluated = {
        props: y instanceof Qt.Name ? void 0 : y,
        items: $ instanceof Qt.Name ? void 0 : $,
        dynamicProps: y instanceof Qt.Name,
        dynamicItems: $ instanceof Qt.Name
      }, p.source && (p.source.evaluated = (0, Qt.stringify)(p.evaluated));
    }
    return e.validate = p, e;
  } catch (f) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), f;
  } finally {
    this._compilations.delete(e);
  }
}
Rt.compileSchema = Sd;
function p3(e, t, r) {
  var n;
  r = (0, nr.resolveUrl)(this.opts.uriResolver, t, r);
  const i = e.refs[r];
  if (i)
    return i;
  let s = g3.call(this, e, r);
  if (s === void 0) {
    const o = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: a } = this.opts;
    o && (s = new Lc({ schema: o, schemaId: a, root: e, baseId: t }));
  }
  if (s !== void 0)
    return e.refs[r] = m3.call(this, s);
}
Rt.resolveRef = p3;
function m3(e) {
  return (0, nr.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Sd.call(this, e);
}
function p_(e) {
  for (const t of this._compilations)
    if (y3(t, e))
      return t;
}
Rt.getCompilingSchema = p_;
function y3(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function g3(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Uc.call(this, e, t);
}
function Uc(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, nr._getFullPath)(this.opts.uriResolver, r);
  let i = (0, nr.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === i)
    return Ll.call(this, r, e);
  const s = (0, nr.normalizeId)(n), o = this.refs[s] || this.schemas[s];
  if (typeof o == "string") {
    const a = Uc.call(this, e, o);
    return typeof (a == null ? void 0 : a.schema) != "object" ? void 0 : Ll.call(this, r, a);
  }
  if (typeof (o == null ? void 0 : o.schema) == "object") {
    if (o.validate || Sd.call(this, o), s === (0, nr.normalizeId)(t)) {
      const { schema: a } = o, { schemaId: c } = this.opts, u = a[c];
      return u && (i = (0, nr.resolveUrl)(this.opts.uriResolver, i, u)), new Lc({ schema: a, schemaId: c, root: e, baseId: i });
    }
    return Ll.call(this, r, o);
  }
}
Rt.resolveSchema = Uc;
const $3 = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Ll(e, { baseId: t, schema: r, root: n }) {
  var i;
  if (((i = e.fragment) === null || i === void 0 ? void 0 : i[0]) !== "/")
    return;
  for (const a of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Sy.unescapeFragment)(a)];
    if (c === void 0)
      return;
    r = c;
    const u = typeof r == "object" && r[this.opts.schemaId];
    !$3.has(a) && u && (t = (0, nr.resolveUrl)(this.opts.uriResolver, t, u));
  }
  let s;
  if (typeof r != "boolean" && r.$ref && !(0, Sy.schemaHasRulesButRef)(r, this.RULES)) {
    const a = (0, nr.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    s = Uc.call(this, n, a);
  }
  const { schemaId: o } = this.opts;
  if (s = s || new Lc({ schema: r, schemaId: o, root: n, baseId: t }), s.schema !== s.root.schema)
    return s;
}
const v3 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", _3 = "Meta-schema for $data reference (JSON AnySchema extension proposal)", w3 = "object", E3 = [
  "$data"
], S3 = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, b3 = !1, P3 = {
  $id: v3,
  description: _3,
  type: w3,
  required: E3,
  properties: S3,
  additionalProperties: b3
};
var bd = {};
Object.defineProperty(bd, "__esModule", { value: !0 });
const m_ = Pv;
m_.code = 'require("ajv/dist/runtime/uri").default';
bd.default = m_;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = sr;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = de;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = Ed(), i = ns, s = Zn, o = Rt, a = de, c = tt, u = Ve, l = Y, f = P3, h = bd, p = (C, S) => new RegExp(C, S);
  p.code = "new RegExp";
  const y = ["removeAdditional", "useDefaults", "coerceTypes"], $ = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), v = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, w = 200;
  function T(C) {
    var S, N, b, d, _, A, E, g, D, O, W, me, Ee, Ae, Ie, it, Se, qe, Yt, xt, kt, qt, wr, Er, Sr;
    const Dt = C.strict, Bt = (S = C.code) === null || S === void 0 ? void 0 : S.optimize, br = Bt === !0 || Bt === void 0 ? 1 : Bt || 0, qr = (b = (N = C.code) === null || N === void 0 ? void 0 : N.regExp) !== null && b !== void 0 ? b : p, At = (d = C.uriResolver) !== null && d !== void 0 ? d : h.default;
    return {
      strictSchema: (A = (_ = C.strictSchema) !== null && _ !== void 0 ? _ : Dt) !== null && A !== void 0 ? A : !0,
      strictNumbers: (g = (E = C.strictNumbers) !== null && E !== void 0 ? E : Dt) !== null && g !== void 0 ? g : !0,
      strictTypes: (O = (D = C.strictTypes) !== null && D !== void 0 ? D : Dt) !== null && O !== void 0 ? O : "log",
      strictTuples: (me = (W = C.strictTuples) !== null && W !== void 0 ? W : Dt) !== null && me !== void 0 ? me : "log",
      strictRequired: (Ae = (Ee = C.strictRequired) !== null && Ee !== void 0 ? Ee : Dt) !== null && Ae !== void 0 ? Ae : !1,
      code: C.code ? { ...C.code, optimize: br, regExp: qr } : { optimize: br, regExp: qr },
      loopRequired: (Ie = C.loopRequired) !== null && Ie !== void 0 ? Ie : w,
      loopEnum: (it = C.loopEnum) !== null && it !== void 0 ? it : w,
      meta: (Se = C.meta) !== null && Se !== void 0 ? Se : !0,
      messages: (qe = C.messages) !== null && qe !== void 0 ? qe : !0,
      inlineRefs: (Yt = C.inlineRefs) !== null && Yt !== void 0 ? Yt : !0,
      schemaId: (xt = C.schemaId) !== null && xt !== void 0 ? xt : "$id",
      addUsedSchema: (kt = C.addUsedSchema) !== null && kt !== void 0 ? kt : !0,
      validateSchema: (qt = C.validateSchema) !== null && qt !== void 0 ? qt : !0,
      validateFormats: (wr = C.validateFormats) !== null && wr !== void 0 ? wr : !0,
      unicodeRegExp: (Er = C.unicodeRegExp) !== null && Er !== void 0 ? Er : !0,
      int32range: (Sr = C.int32range) !== null && Sr !== void 0 ? Sr : !0,
      uriResolver: At
    };
  }
  class I {
    constructor(S = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), S = this.opts = { ...S, ...T(S) };
      const { es5: N, lines: b } = this.opts.code;
      this.scope = new a.ValueScope({ scope: {}, prefixes: $, es5: N, lines: b }), this.logger = B(S.logger);
      const d = S.validateFormats;
      S.validateFormats = !1, this.RULES = (0, s.getRules)(), F.call(this, v, S, "NOT SUPPORTED"), F.call(this, m, S, "DEPRECATED", "warn"), this._metaOpts = Z.call(this), S.formats && ue.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), S.keywords && R.call(this, S.keywords), typeof S.meta == "object" && this.addMetaSchema(S.meta), z.call(this), S.validateFormats = d;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: S, meta: N, schemaId: b } = this.opts;
      let d = f;
      b === "id" && (d = { ...f }, d.id = d.$id, delete d.$id), N && S && this.addMetaSchema(d, d[b], !1);
    }
    defaultMeta() {
      const { meta: S, schemaId: N } = this.opts;
      return this.opts.defaultMeta = typeof S == "object" ? S[N] || S : void 0;
    }
    validate(S, N) {
      let b;
      if (typeof S == "string") {
        if (b = this.getSchema(S), !b)
          throw new Error(`no schema with key or ref "${S}"`);
      } else
        b = this.compile(S);
      const d = b(N);
      return "$async" in b || (this.errors = b.errors), d;
    }
    compile(S, N) {
      const b = this._addSchema(S, N);
      return b.validate || this._compileSchemaEnv(b);
    }
    compileAsync(S, N) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: b } = this.opts;
      return d.call(this, S, N);
      async function d(O, W) {
        await _.call(this, O.$schema);
        const me = this._addSchema(O, W);
        return me.validate || A.call(this, me);
      }
      async function _(O) {
        O && !this.getSchema(O) && await d.call(this, { $ref: O }, !0);
      }
      async function A(O) {
        try {
          return this._compileSchemaEnv(O);
        } catch (W) {
          if (!(W instanceof i.default))
            throw W;
          return E.call(this, W), await g.call(this, W.missingSchema), A.call(this, O);
        }
      }
      function E({ missingSchema: O, missingRef: W }) {
        if (this.refs[O])
          throw new Error(`AnySchema ${O} is loaded but ${W} cannot be resolved`);
      }
      async function g(O) {
        const W = await D.call(this, O);
        this.refs[O] || await _.call(this, W.$schema), this.refs[O] || this.addSchema(W, O, N);
      }
      async function D(O) {
        const W = this._loading[O];
        if (W)
          return W;
        try {
          return await (this._loading[O] = b(O));
        } finally {
          delete this._loading[O];
        }
      }
    }
    // Adds schema to the instance
    addSchema(S, N, b, d = this.opts.validateSchema) {
      if (Array.isArray(S)) {
        for (const A of S)
          this.addSchema(A, void 0, b, d);
        return this;
      }
      let _;
      if (typeof S == "object") {
        const { schemaId: A } = this.opts;
        if (_ = S[A], _ !== void 0 && typeof _ != "string")
          throw new Error(`schema ${A} must be string`);
      }
      return N = (0, c.normalizeId)(N || _), this._checkUnique(N), this.schemas[N] = this._addSchema(S, b, N, d, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(S, N, b = this.opts.validateSchema) {
      return this.addSchema(S, N, !0, b), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(S, N) {
      if (typeof S == "boolean")
        return !0;
      let b;
      if (b = S.$schema, b !== void 0 && typeof b != "string")
        throw new Error("$schema must be a string");
      if (b = b || this.opts.defaultMeta || this.defaultMeta(), !b)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const d = this.validate(b, S);
      if (!d && N) {
        const _ = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(_);
        else
          throw new Error(_);
      }
      return d;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(S) {
      let N;
      for (; typeof (N = H.call(this, S)) == "string"; )
        S = N;
      if (N === void 0) {
        const { schemaId: b } = this.opts, d = new o.SchemaEnv({ schema: {}, schemaId: b });
        if (N = o.resolveSchema.call(this, d, S), !N)
          return;
        this.refs[S] = N;
      }
      return N.validate || this._compileSchemaEnv(N);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(S) {
      if (S instanceof RegExp)
        return this._removeAllSchemas(this.schemas, S), this._removeAllSchemas(this.refs, S), this;
      switch (typeof S) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const N = H.call(this, S);
          return typeof N == "object" && this._cache.delete(N.schema), delete this.schemas[S], delete this.refs[S], this;
        }
        case "object": {
          const N = S;
          this._cache.delete(N);
          let b = S[this.opts.schemaId];
          return b && (b = (0, c.normalizeId)(b), delete this.schemas[b], delete this.refs[b]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(S) {
      for (const N of S)
        this.addKeyword(N);
      return this;
    }
    addKeyword(S, N) {
      let b;
      if (typeof S == "string")
        b = S, typeof N == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), N.keyword = b);
      else if (typeof S == "object" && N === void 0) {
        if (N = S, b = N.keyword, Array.isArray(b) && !b.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (j.call(this, b, N), !N)
        return (0, l.eachItem)(b, (_) => L.call(this, _)), this;
      U.call(this, N);
      const d = {
        ...N,
        type: (0, u.getJSONTypes)(N.type),
        schemaType: (0, u.getJSONTypes)(N.schemaType)
      };
      return (0, l.eachItem)(b, d.type.length === 0 ? (_) => L.call(this, _, d) : (_) => d.type.forEach((A) => L.call(this, _, d, A))), this;
    }
    getKeyword(S) {
      const N = this.RULES.all[S];
      return typeof N == "object" ? N.definition : !!N;
    }
    // Remove keyword
    removeKeyword(S) {
      const { RULES: N } = this;
      delete N.keywords[S], delete N.all[S];
      for (const b of N.rules) {
        const d = b.rules.findIndex((_) => _.keyword === S);
        d >= 0 && b.rules.splice(d, 1);
      }
      return this;
    }
    // Add format
    addFormat(S, N) {
      return typeof N == "string" && (N = new RegExp(N)), this.formats[S] = N, this;
    }
    errorsText(S = this.errors, { separator: N = ", ", dataVar: b = "data" } = {}) {
      return !S || S.length === 0 ? "No errors" : S.map((d) => `${b}${d.instancePath} ${d.message}`).reduce((d, _) => d + N + _);
    }
    $dataMetaSchema(S, N) {
      const b = this.RULES.all;
      S = JSON.parse(JSON.stringify(S));
      for (const d of N) {
        const _ = d.split("/").slice(1);
        let A = S;
        for (const E of _)
          A = A[E];
        for (const E in b) {
          const g = b[E];
          if (typeof g != "object")
            continue;
          const { $data: D } = g.definition, O = A[E];
          D && O && (A[E] = q(O));
        }
      }
      return S;
    }
    _removeAllSchemas(S, N) {
      for (const b in S) {
        const d = S[b];
        (!N || N.test(b)) && (typeof d == "string" ? delete S[b] : d && !d.meta && (this._cache.delete(d.schema), delete S[b]));
      }
    }
    _addSchema(S, N, b, d = this.opts.validateSchema, _ = this.opts.addUsedSchema) {
      let A;
      const { schemaId: E } = this.opts;
      if (typeof S == "object")
        A = S[E];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof S != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let g = this._cache.get(S);
      if (g !== void 0)
        return g;
      b = (0, c.normalizeId)(A || b);
      const D = c.getSchemaRefs.call(this, S, b);
      return g = new o.SchemaEnv({ schema: S, schemaId: E, meta: N, baseId: b, localRefs: D }), this._cache.set(g.schema, g), _ && !b.startsWith("#") && (b && this._checkUnique(b), this.refs[b] = g), d && this.validateSchema(S, !0), g;
    }
    _checkUnique(S) {
      if (this.schemas[S] || this.refs[S])
        throw new Error(`schema with key or id "${S}" already exists`);
    }
    _compileSchemaEnv(S) {
      if (S.meta ? this._compileMetaSchema(S) : o.compileSchema.call(this, S), !S.validate)
        throw new Error("ajv implementation error");
      return S.validate;
    }
    _compileMetaSchema(S) {
      const N = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, S);
      } finally {
        this.opts = N;
      }
    }
  }
  I.ValidationError = n.default, I.MissingRefError = i.default, e.default = I;
  function F(C, S, N, b = "error") {
    for (const d in C) {
      const _ = d;
      _ in S && this.logger[b](`${N}: option ${d}. ${C[_]}`);
    }
  }
  function H(C) {
    return C = (0, c.normalizeId)(C), this.schemas[C] || this.refs[C];
  }
  function z() {
    const C = this.opts.schemas;
    if (C)
      if (Array.isArray(C))
        this.addSchema(C);
      else
        for (const S in C)
          this.addSchema(C[S], S);
  }
  function ue() {
    for (const C in this.opts.formats) {
      const S = this.opts.formats[C];
      S && this.addFormat(C, S);
    }
  }
  function R(C) {
    if (Array.isArray(C)) {
      this.addVocabulary(C);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const S in C) {
      const N = C[S];
      N.keyword || (N.keyword = S), this.addKeyword(N);
    }
  }
  function Z() {
    const C = { ...this.opts };
    for (const S of y)
      delete C[S];
    return C;
  }
  const x = { log() {
  }, warn() {
  }, error() {
  } };
  function B(C) {
    if (C === !1)
      return x;
    if (C === void 0)
      return console;
    if (C.log && C.warn && C.error)
      return C;
    throw new Error("logger must implement log, warn and error methods");
  }
  const Q = /^[a-z_$][a-z0-9_$:-]*$/i;
  function j(C, S) {
    const { RULES: N } = this;
    if ((0, l.eachItem)(C, (b) => {
      if (N.keywords[b])
        throw new Error(`Keyword ${b} is already defined`);
      if (!Q.test(b))
        throw new Error(`Keyword ${b} has invalid name`);
    }), !!S && S.$data && !("code" in S || "validate" in S))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function L(C, S, N) {
    var b;
    const d = S == null ? void 0 : S.post;
    if (N && d)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: _ } = this;
    let A = d ? _.post : _.rules.find(({ type: g }) => g === N);
    if (A || (A = { type: N, rules: [] }, _.rules.push(A)), _.keywords[C] = !0, !S)
      return;
    const E = {
      keyword: C,
      definition: {
        ...S,
        type: (0, u.getJSONTypes)(S.type),
        schemaType: (0, u.getJSONTypes)(S.schemaType)
      }
    };
    S.before ? V.call(this, A, E, S.before) : A.rules.push(E), _.all[C] = E, (b = S.implements) === null || b === void 0 || b.forEach((g) => this.addKeyword(g));
  }
  function V(C, S, N) {
    const b = C.rules.findIndex((d) => d.keyword === N);
    b >= 0 ? C.rules.splice(b, 0, S) : (C.rules.push(S), this.logger.warn(`rule ${N} is not defined`));
  }
  function U(C) {
    let { metaSchema: S } = C;
    S !== void 0 && (C.$data && this.opts.$data && (S = q(S)), C.validateSchema = this.compile(S, !0));
  }
  const G = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function q(C) {
    return { anyOf: [C, G] };
  }
})(Uv);
var Pd = {}, Td = {}, Ad = {};
Object.defineProperty(Ad, "__esModule", { value: !0 });
const T3 = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Ad.default = T3;
var ei = {};
Object.defineProperty(ei, "__esModule", { value: !0 });
ei.callRef = ei.getValidate = void 0;
const A3 = ns, by = pe, Ot = de, gi = _r, Py = Rt, la = Y, N3 = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: i, schemaEnv: s, validateName: o, opts: a, self: c } = n, { root: u } = s;
    if ((r === "#" || r === "#/") && i === u.baseId)
      return f();
    const l = Py.resolveRef.call(c, u, i, r);
    if (l === void 0)
      throw new A3.default(n.opts.uriResolver, i, r);
    if (l instanceof Py.SchemaEnv)
      return h(l);
    return p(l);
    function f() {
      if (s === u)
        return Pa(e, o, s, s.$async);
      const y = t.scopeValue("root", { ref: u });
      return Pa(e, (0, Ot._)`${y}.validate`, u, u.$async);
    }
    function h(y) {
      const $ = y_(e, y);
      Pa(e, $, y, y.$async);
    }
    function p(y) {
      const $ = t.scopeValue("schema", a.code.source === !0 ? { ref: y, code: (0, Ot.stringify)(y) } : { ref: y }), v = t.name("valid"), m = e.subschema({
        schema: y,
        dataTypes: [],
        schemaPath: Ot.nil,
        topSchemaRef: $,
        errSchemaPath: r
      }, v);
      e.mergeEvaluated(m), e.ok(v);
    }
  }
};
function y_(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Ot._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
ei.getValidate = y_;
function Pa(e, t, r, n) {
  const { gen: i, it: s } = e, { allErrors: o, schemaEnv: a, opts: c } = s, u = c.passContext ? gi.default.this : Ot.nil;
  n ? l() : f();
  function l() {
    if (!a.$async)
      throw new Error("async schema referenced by sync schema");
    const y = i.let("valid");
    i.try(() => {
      i.code((0, Ot._)`await ${(0, by.callValidateCode)(e, t, u)}`), p(t), o || i.assign(y, !0);
    }, ($) => {
      i.if((0, Ot._)`!(${$} instanceof ${s.ValidationError})`, () => i.throw($)), h($), o || i.assign(y, !1);
    }), e.ok(y);
  }
  function f() {
    e.result((0, by.callValidateCode)(e, t, u), () => p(t), () => h(t));
  }
  function h(y) {
    const $ = (0, Ot._)`${y}.errors`;
    i.assign(gi.default.vErrors, (0, Ot._)`${gi.default.vErrors} === null ? ${$} : ${gi.default.vErrors}.concat(${$})`), i.assign(gi.default.errors, (0, Ot._)`${gi.default.vErrors}.length`);
  }
  function p(y) {
    var $;
    if (!s.opts.unevaluated)
      return;
    const v = ($ = r == null ? void 0 : r.validate) === null || $ === void 0 ? void 0 : $.evaluated;
    if (s.props !== !0)
      if (v && !v.dynamicProps)
        v.props !== void 0 && (s.props = la.mergeEvaluated.props(i, v.props, s.props));
      else {
        const m = i.var("props", (0, Ot._)`${y}.evaluated.props`);
        s.props = la.mergeEvaluated.props(i, m, s.props, Ot.Name);
      }
    if (s.items !== !0)
      if (v && !v.dynamicItems)
        v.items !== void 0 && (s.items = la.mergeEvaluated.items(i, v.items, s.items));
      else {
        const m = i.var("items", (0, Ot._)`${y}.evaluated.items`);
        s.items = la.mergeEvaluated.items(i, m, s.items, Ot.Name);
      }
  }
}
ei.callRef = Pa;
ei.default = N3;
Object.defineProperty(Td, "__esModule", { value: !0 });
const O3 = Ad, R3 = ei, I3 = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  O3.default,
  R3.default
];
Td.default = I3;
var Nd = {}, Od = {};
Object.defineProperty(Od, "__esModule", { value: !0 });
const Ya = de, Qr = Ya.operators, Ja = {
  maximum: { okStr: "<=", ok: Qr.LTE, fail: Qr.GT },
  minimum: { okStr: ">=", ok: Qr.GTE, fail: Qr.LT },
  exclusiveMaximum: { okStr: "<", ok: Qr.LT, fail: Qr.GTE },
  exclusiveMinimum: { okStr: ">", ok: Qr.GT, fail: Qr.LTE }
}, C3 = {
  message: ({ keyword: e, schemaCode: t }) => (0, Ya.str)`must be ${Ja[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Ya._)`{comparison: ${Ja[e].okStr}, limit: ${t}}`
}, k3 = {
  keyword: Object.keys(Ja),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: C3,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Ya._)`${r} ${Ja[t].fail} ${n} || isNaN(${r})`);
  }
};
Od.default = k3;
var Rd = {};
Object.defineProperty(Rd, "__esModule", { value: !0 });
const Us = de, D3 = {
  message: ({ schemaCode: e }) => (0, Us.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Us._)`{multipleOf: ${e}}`
}, F3 = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: D3,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: i } = e, s = i.opts.multipleOfPrecision, o = t.let("res"), a = s ? (0, Us._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${s}` : (0, Us._)`${o} !== parseInt(${o})`;
    e.fail$data((0, Us._)`(${n} === 0 || (${o} = ${r}/${n}, ${a}))`);
  }
};
Rd.default = F3;
var Id = {}, Cd = {};
Object.defineProperty(Cd, "__esModule", { value: !0 });
function g_(e) {
  const t = e.length;
  let r = 0, n = 0, i;
  for (; n < t; )
    r++, i = e.charCodeAt(n++), i >= 55296 && i <= 56319 && n < t && (i = e.charCodeAt(n), (i & 64512) === 56320 && n++);
  return r;
}
Cd.default = g_;
g_.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Id, "__esModule", { value: !0 });
const Gn = de, j3 = Y, L3 = Cd, U3 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Gn.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Gn._)`{limit: ${e}}`
}, M3 = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: U3,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: i } = e, s = t === "maxLength" ? Gn.operators.GT : Gn.operators.LT, o = i.opts.unicode === !1 ? (0, Gn._)`${r}.length` : (0, Gn._)`${(0, j3.useFunc)(e.gen, L3.default)}(${r})`;
    e.fail$data((0, Gn._)`${o} ${s} ${n}`);
  }
};
Id.default = M3;
var kd = {};
Object.defineProperty(kd, "__esModule", { value: !0 });
const x3 = pe, Xa = de, q3 = {
  message: ({ schemaCode: e }) => (0, Xa.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Xa._)`{pattern: ${e}}`
}, B3 = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: q3,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: i, it: s } = e, o = s.opts.unicodeRegExp ? "u" : "", a = r ? (0, Xa._)`(new RegExp(${i}, ${o}))` : (0, x3.usePattern)(e, n);
    e.fail$data((0, Xa._)`!${a}.test(${t})`);
  }
};
kd.default = B3;
var Dd = {};
Object.defineProperty(Dd, "__esModule", { value: !0 });
const Ms = de, V3 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Ms.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Ms._)`{limit: ${e}}`
}, H3 = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: V3,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxProperties" ? Ms.operators.GT : Ms.operators.LT;
    e.fail$data((0, Ms._)`Object.keys(${r}).length ${i} ${n}`);
  }
};
Dd.default = H3;
var Fd = {};
Object.defineProperty(Fd, "__esModule", { value: !0 });
const _s = pe, xs = de, G3 = Y, z3 = {
  message: ({ params: { missingProperty: e } }) => (0, xs.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, xs._)`{missingProperty: ${e}}`
}, K3 = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: z3,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: i, $data: s, it: o } = e, { opts: a } = o;
    if (!s && r.length === 0)
      return;
    const c = r.length >= a.loopRequired;
    if (o.allErrors ? u() : l(), a.strictRequired) {
      const p = e.parentSchema.properties, { definedProperties: y } = e.it;
      for (const $ of r)
        if ((p == null ? void 0 : p[$]) === void 0 && !y.has($)) {
          const v = o.schemaEnv.baseId + o.errSchemaPath, m = `required property "${$}" is not defined at "${v}" (strictRequired)`;
          (0, G3.checkStrictMode)(o, m, o.opts.strictRequired);
        }
    }
    function u() {
      if (c || s)
        e.block$data(xs.nil, f);
      else
        for (const p of r)
          (0, _s.checkReportMissingProp)(e, p);
    }
    function l() {
      const p = t.let("missing");
      if (c || s) {
        const y = t.let("valid", !0);
        e.block$data(y, () => h(p, y)), e.ok(y);
      } else
        t.if((0, _s.checkMissingProp)(e, r, p)), (0, _s.reportMissingProp)(e, p), t.else();
    }
    function f() {
      t.forOf("prop", n, (p) => {
        e.setParams({ missingProperty: p }), t.if((0, _s.noPropertyInData)(t, i, p, a.ownProperties), () => e.error());
      });
    }
    function h(p, y) {
      e.setParams({ missingProperty: p }), t.forOf(p, n, () => {
        t.assign(y, (0, _s.propertyInData)(t, i, p, a.ownProperties)), t.if((0, xs.not)(y), () => {
          e.error(), t.break();
        });
      }, xs.nil);
    }
  }
};
Fd.default = K3;
var jd = {};
Object.defineProperty(jd, "__esModule", { value: !0 });
const qs = de, W3 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, qs.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, qs._)`{limit: ${e}}`
}, Y3 = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: W3,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxItems" ? qs.operators.GT : qs.operators.LT;
    e.fail$data((0, qs._)`${r}.length ${i} ${n}`);
  }
};
jd.default = Y3;
var Ld = {}, Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
const $_ = Oc;
$_.code = 'require("ajv/dist/runtime/equal").default';
Ro.default = $_;
Object.defineProperty(Ld, "__esModule", { value: !0 });
const Ul = Ve, Ze = de, J3 = Y, X3 = Ro, Q3 = {
  message: ({ params: { i: e, j: t } }) => (0, Ze.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ze._)`{i: ${e}, j: ${t}}`
}, Z3 = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: Q3,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, parentSchema: s, schemaCode: o, it: a } = e;
    if (!n && !i)
      return;
    const c = t.let("valid"), u = s.items ? (0, Ul.getSchemaTypes)(s.items) : [];
    e.block$data(c, l, (0, Ze._)`${o} === false`), e.ok(c);
    function l() {
      const y = t.let("i", (0, Ze._)`${r}.length`), $ = t.let("j");
      e.setParams({ i: y, j: $ }), t.assign(c, !0), t.if((0, Ze._)`${y} > 1`, () => (f() ? h : p)(y, $));
    }
    function f() {
      return u.length > 0 && !u.some((y) => y === "object" || y === "array");
    }
    function h(y, $) {
      const v = t.name("item"), m = (0, Ul.checkDataTypes)(u, v, a.opts.strictNumbers, Ul.DataType.Wrong), w = t.const("indices", (0, Ze._)`{}`);
      t.for((0, Ze._)`;${y}--;`, () => {
        t.let(v, (0, Ze._)`${r}[${y}]`), t.if(m, (0, Ze._)`continue`), u.length > 1 && t.if((0, Ze._)`typeof ${v} == "string"`, (0, Ze._)`${v} += "_"`), t.if((0, Ze._)`typeof ${w}[${v}] == "number"`, () => {
          t.assign($, (0, Ze._)`${w}[${v}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Ze._)`${w}[${v}] = ${y}`);
      });
    }
    function p(y, $) {
      const v = (0, J3.useFunc)(t, X3.default), m = t.name("outer");
      t.label(m).for((0, Ze._)`;${y}--;`, () => t.for((0, Ze._)`${$} = ${y}; ${$}--;`, () => t.if((0, Ze._)`${v}(${r}[${y}], ${r}[${$}])`, () => {
        e.error(), t.assign(c, !1).break(m);
      })));
    }
  }
};
Ld.default = Z3;
var Ud = {};
Object.defineProperty(Ud, "__esModule", { value: !0 });
const wu = de, eq = Y, tq = Ro, rq = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, wu._)`{allowedValue: ${e}}`
}, nq = {
  keyword: "const",
  $data: !0,
  error: rq,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: i, schema: s } = e;
    n || s && typeof s == "object" ? e.fail$data((0, wu._)`!${(0, eq.useFunc)(t, tq.default)}(${r}, ${i})`) : e.fail((0, wu._)`${s} !== ${r}`);
  }
};
Ud.default = nq;
var Md = {};
Object.defineProperty(Md, "__esModule", { value: !0 });
const Ps = de, iq = Y, sq = Ro, oq = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Ps._)`{allowedValues: ${e}}`
}, aq = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: oq,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, schemaCode: s, it: o } = e;
    if (!n && i.length === 0)
      throw new Error("enum must have non-empty array");
    const a = i.length >= o.opts.loopEnum;
    let c;
    const u = () => c ?? (c = (0, iq.useFunc)(t, sq.default));
    let l;
    if (a || n)
      l = t.let("valid"), e.block$data(l, f);
    else {
      if (!Array.isArray(i))
        throw new Error("ajv implementation error");
      const p = t.const("vSchema", s);
      l = (0, Ps.or)(...i.map((y, $) => h(p, $)));
    }
    e.pass(l);
    function f() {
      t.assign(l, !1), t.forOf("v", s, (p) => t.if((0, Ps._)`${u()}(${r}, ${p})`, () => t.assign(l, !0).break()));
    }
    function h(p, y) {
      const $ = i[y];
      return typeof $ == "object" && $ !== null ? (0, Ps._)`${u()}(${r}, ${p}[${y}])` : (0, Ps._)`${r} === ${$}`;
    }
  }
};
Md.default = aq;
Object.defineProperty(Nd, "__esModule", { value: !0 });
const cq = Od, lq = Rd, uq = Id, fq = kd, dq = Dd, hq = Fd, pq = jd, mq = Ld, yq = Ud, gq = Md, $q = [
  // number
  cq.default,
  lq.default,
  // string
  uq.default,
  fq.default,
  // object
  dq.default,
  hq.default,
  // array
  pq.default,
  mq.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  yq.default,
  gq.default
];
Nd.default = $q;
var xd = {}, is = {};
Object.defineProperty(is, "__esModule", { value: !0 });
is.validateAdditionalItems = void 0;
const zn = de, Eu = Y, vq = {
  message: ({ params: { len: e } }) => (0, zn.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, zn._)`{limit: ${e}}`
}, _q = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: vq,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Eu.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    v_(e, n);
  }
};
function v_(e, t) {
  const { gen: r, schema: n, data: i, keyword: s, it: o } = e;
  o.items = !0;
  const a = r.const("len", (0, zn._)`${i}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, zn._)`${a} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Eu.alwaysValidSchema)(o, n)) {
    const u = r.var("valid", (0, zn._)`${a} <= ${t.length}`);
    r.if((0, zn.not)(u), () => c(u)), e.ok(u);
  }
  function c(u) {
    r.forRange("i", t.length, a, (l) => {
      e.subschema({ keyword: s, dataProp: l, dataPropType: Eu.Type.Num }, u), o.allErrors || r.if((0, zn.not)(u), () => r.break());
    });
  }
}
is.validateAdditionalItems = v_;
is.default = _q;
var qd = {}, ss = {};
Object.defineProperty(ss, "__esModule", { value: !0 });
ss.validateTuple = void 0;
const Ty = de, Ta = Y, wq = pe, Eq = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return __(e, "additionalItems", t);
    r.items = !0, !(0, Ta.alwaysValidSchema)(r, t) && e.ok((0, wq.validateArray)(e));
  }
};
function __(e, t, r = e.schema) {
  const { gen: n, parentSchema: i, data: s, keyword: o, it: a } = e;
  l(i), a.opts.unevaluated && r.length && a.items !== !0 && (a.items = Ta.mergeEvaluated.items(n, r.length, a.items));
  const c = n.name("valid"), u = n.const("len", (0, Ty._)`${s}.length`);
  r.forEach((f, h) => {
    (0, Ta.alwaysValidSchema)(a, f) || (n.if((0, Ty._)`${u} > ${h}`, () => e.subschema({
      keyword: o,
      schemaProp: h,
      dataProp: h
    }, c)), e.ok(c));
  });
  function l(f) {
    const { opts: h, errSchemaPath: p } = a, y = r.length, $ = y === f.minItems && (y === f.maxItems || f[t] === !1);
    if (h.strictTuples && !$) {
      const v = `"${o}" is ${y}-tuple, but minItems or maxItems/${t} are not specified or different at path "${p}"`;
      (0, Ta.checkStrictMode)(a, v, h.strictTuples);
    }
  }
}
ss.validateTuple = __;
ss.default = Eq;
Object.defineProperty(qd, "__esModule", { value: !0 });
const Sq = ss, bq = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Sq.validateTuple)(e, "items")
};
qd.default = bq;
var Bd = {};
Object.defineProperty(Bd, "__esModule", { value: !0 });
const Ay = de, Pq = Y, Tq = pe, Aq = is, Nq = {
  message: ({ params: { len: e } }) => (0, Ay.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Ay._)`{limit: ${e}}`
}, Oq = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Nq,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: i } = r;
    n.items = !0, !(0, Pq.alwaysValidSchema)(n, t) && (i ? (0, Aq.validateAdditionalItems)(e, i) : e.ok((0, Tq.validateArray)(e)));
  }
};
Bd.default = Oq;
var Vd = {};
Object.defineProperty(Vd, "__esModule", { value: !0 });
const Kt = de, ua = Y, Rq = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Kt.str)`must contain at least ${e} valid item(s)` : (0, Kt.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Kt._)`{minContains: ${e}}` : (0, Kt._)`{minContains: ${e}, maxContains: ${t}}`
}, Iq = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: Rq,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: s } = e;
    let o, a;
    const { minContains: c, maxContains: u } = n;
    s.opts.next ? (o = c === void 0 ? 1 : c, a = u) : o = 1;
    const l = t.const("len", (0, Kt._)`${i}.length`);
    if (e.setParams({ min: o, max: a }), a === void 0 && o === 0) {
      (0, ua.checkStrictMode)(s, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (a !== void 0 && o > a) {
      (0, ua.checkStrictMode)(s, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, ua.alwaysValidSchema)(s, r)) {
      let $ = (0, Kt._)`${l} >= ${o}`;
      a !== void 0 && ($ = (0, Kt._)`${$} && ${l} <= ${a}`), e.pass($);
      return;
    }
    s.items = !0;
    const f = t.name("valid");
    a === void 0 && o === 1 ? p(f, () => t.if(f, () => t.break())) : o === 0 ? (t.let(f, !0), a !== void 0 && t.if((0, Kt._)`${i}.length > 0`, h)) : (t.let(f, !1), h()), e.result(f, () => e.reset());
    function h() {
      const $ = t.name("_valid"), v = t.let("count", 0);
      p($, () => t.if($, () => y(v)));
    }
    function p($, v) {
      t.forRange("i", 0, l, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: ua.Type.Num,
          compositeRule: !0
        }, $), v();
      });
    }
    function y($) {
      t.code((0, Kt._)`${$}++`), a === void 0 ? t.if((0, Kt._)`${$} >= ${o}`, () => t.assign(f, !0).break()) : (t.if((0, Kt._)`${$} > ${a}`, () => t.assign(f, !1).break()), o === 1 ? t.assign(f, !0) : t.if((0, Kt._)`${$} >= ${o}`, () => t.assign(f, !0)));
    }
  }
};
Vd.default = Iq;
var w_ = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = de, r = Y, n = pe;
  e.error = {
    message: ({ params: { property: c, depsCount: u, deps: l } }) => {
      const f = u === 1 ? "property" : "properties";
      return (0, t.str)`must have ${f} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: u, deps: l, missingProperty: f } }) => (0, t._)`{property: ${c},
    missingProperty: ${f},
    depsCount: ${u},
    deps: ${l}}`
    // TODO change to reference
  };
  const i = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [u, l] = s(c);
      o(c, u), a(c, l);
    }
  };
  function s({ schema: c }) {
    const u = {}, l = {};
    for (const f in c) {
      if (f === "__proto__")
        continue;
      const h = Array.isArray(c[f]) ? u : l;
      h[f] = c[f];
    }
    return [u, l];
  }
  function o(c, u = c.schema) {
    const { gen: l, data: f, it: h } = c;
    if (Object.keys(u).length === 0)
      return;
    const p = l.let("missing");
    for (const y in u) {
      const $ = u[y];
      if ($.length === 0)
        continue;
      const v = (0, n.propertyInData)(l, f, y, h.opts.ownProperties);
      c.setParams({
        property: y,
        depsCount: $.length,
        deps: $.join(", ")
      }), h.allErrors ? l.if(v, () => {
        for (const m of $)
          (0, n.checkReportMissingProp)(c, m);
      }) : (l.if((0, t._)`${v} && (${(0, n.checkMissingProp)(c, $, p)})`), (0, n.reportMissingProp)(c, p), l.else());
    }
  }
  e.validatePropertyDeps = o;
  function a(c, u = c.schema) {
    const { gen: l, data: f, keyword: h, it: p } = c, y = l.name("valid");
    for (const $ in u)
      (0, r.alwaysValidSchema)(p, u[$]) || (l.if(
        (0, n.propertyInData)(l, f, $, p.opts.ownProperties),
        () => {
          const v = c.subschema({ keyword: h, schemaProp: $ }, y);
          c.mergeValidEvaluated(v, y);
        },
        () => l.var(y, !0)
        // TODO var
      ), c.ok(y));
  }
  e.validateSchemaDeps = a, e.default = i;
})(w_);
var Hd = {};
Object.defineProperty(Hd, "__esModule", { value: !0 });
const E_ = de, Cq = Y, kq = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, E_._)`{propertyName: ${e.propertyName}}`
}, Dq = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: kq,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e;
    if ((0, Cq.alwaysValidSchema)(i, r))
      return;
    const s = t.name("valid");
    t.forIn("key", n, (o) => {
      e.setParams({ propertyName: o }), e.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: !0
      }, s), t.if((0, E_.not)(s), () => {
        e.error(!0), i.allErrors || t.break();
      });
    }), e.ok(s);
  }
};
Hd.default = Dq;
var Mc = {};
Object.defineProperty(Mc, "__esModule", { value: !0 });
const fa = pe, er = de, Fq = _r, da = Y, jq = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, er._)`{additionalProperty: ${e.additionalProperty}}`
}, Lq = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: jq,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, errsCount: s, it: o } = e;
    if (!s)
      throw new Error("ajv implementation error");
    const { allErrors: a, opts: c } = o;
    if (o.props = !0, c.removeAdditional !== "all" && (0, da.alwaysValidSchema)(o, r))
      return;
    const u = (0, fa.allSchemaProperties)(n.properties), l = (0, fa.allSchemaProperties)(n.patternProperties);
    f(), e.ok((0, er._)`${s} === ${Fq.default.errors}`);
    function f() {
      t.forIn("key", i, (v) => {
        !u.length && !l.length ? y(v) : t.if(h(v), () => y(v));
      });
    }
    function h(v) {
      let m;
      if (u.length > 8) {
        const w = (0, da.schemaRefOrVal)(o, n.properties, "properties");
        m = (0, fa.isOwnProperty)(t, w, v);
      } else u.length ? m = (0, er.or)(...u.map((w) => (0, er._)`${v} === ${w}`)) : m = er.nil;
      return l.length && (m = (0, er.or)(m, ...l.map((w) => (0, er._)`${(0, fa.usePattern)(e, w)}.test(${v})`))), (0, er.not)(m);
    }
    function p(v) {
      t.code((0, er._)`delete ${i}[${v}]`);
    }
    function y(v) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        p(v);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: v }), e.error(), a || t.break();
        return;
      }
      if (typeof r == "object" && !(0, da.alwaysValidSchema)(o, r)) {
        const m = t.name("valid");
        c.removeAdditional === "failing" ? ($(v, m, !1), t.if((0, er.not)(m), () => {
          e.reset(), p(v);
        })) : ($(v, m), a || t.if((0, er.not)(m), () => t.break()));
      }
    }
    function $(v, m, w) {
      const T = {
        keyword: "additionalProperties",
        dataProp: v,
        dataPropType: da.Type.Str
      };
      w === !1 && Object.assign(T, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(T, m);
    }
  }
};
Mc.default = Lq;
var Gd = {};
Object.defineProperty(Gd, "__esModule", { value: !0 });
const Uq = sr, Ny = pe, Ml = Y, Oy = Mc, Mq = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: s } = e;
    s.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Oy.default.code(new Uq.KeywordCxt(s, Oy.default, "additionalProperties"));
    const o = (0, Ny.allSchemaProperties)(r);
    for (const f of o)
      s.definedProperties.add(f);
    s.opts.unevaluated && o.length && s.props !== !0 && (s.props = Ml.mergeEvaluated.props(t, (0, Ml.toHash)(o), s.props));
    const a = o.filter((f) => !(0, Ml.alwaysValidSchema)(s, r[f]));
    if (a.length === 0)
      return;
    const c = t.name("valid");
    for (const f of a)
      u(f) ? l(f) : (t.if((0, Ny.propertyInData)(t, i, f, s.opts.ownProperties)), l(f), s.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(f), e.ok(c);
    function u(f) {
      return s.opts.useDefaults && !s.compositeRule && r[f].default !== void 0;
    }
    function l(f) {
      e.subschema({
        keyword: "properties",
        schemaProp: f,
        dataProp: f
      }, c);
    }
  }
};
Gd.default = Mq;
var zd = {};
Object.defineProperty(zd, "__esModule", { value: !0 });
const Ry = pe, ha = de, Iy = Y, Cy = Y, xq = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: i, it: s } = e, { opts: o } = s, a = (0, Ry.allSchemaProperties)(r), c = a.filter(($) => (0, Iy.alwaysValidSchema)(s, r[$]));
    if (a.length === 0 || c.length === a.length && (!s.opts.unevaluated || s.props === !0))
      return;
    const u = o.strictSchema && !o.allowMatchingProperties && i.properties, l = t.name("valid");
    s.props !== !0 && !(s.props instanceof ha.Name) && (s.props = (0, Cy.evaluatedPropsToName)(t, s.props));
    const { props: f } = s;
    h();
    function h() {
      for (const $ of a)
        u && p($), s.allErrors ? y($) : (t.var(l, !0), y($), t.if(l));
    }
    function p($) {
      for (const v in u)
        new RegExp($).test(v) && (0, Iy.checkStrictMode)(s, `property ${v} matches pattern ${$} (use allowMatchingProperties)`);
    }
    function y($) {
      t.forIn("key", n, (v) => {
        t.if((0, ha._)`${(0, Ry.usePattern)(e, $)}.test(${v})`, () => {
          const m = c.includes($);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: $,
            dataProp: v,
            dataPropType: Cy.Type.Str
          }, l), s.opts.unevaluated && f !== !0 ? t.assign((0, ha._)`${f}[${v}]`, !0) : !m && !s.allErrors && t.if((0, ha.not)(l), () => t.break());
        });
      });
    }
  }
};
zd.default = xq;
var Kd = {};
Object.defineProperty(Kd, "__esModule", { value: !0 });
const qq = Y, Bq = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, qq.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const i = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, i), e.failResult(i, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
Kd.default = Bq;
var Wd = {};
Object.defineProperty(Wd, "__esModule", { value: !0 });
const Vq = pe, Hq = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Vq.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Wd.default = Hq;
var Yd = {};
Object.defineProperty(Yd, "__esModule", { value: !0 });
const Aa = de, Gq = Y, zq = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Aa._)`{passingSchemas: ${e.passing}}`
}, Kq = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: zq,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: i } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (i.opts.discriminator && n.discriminator)
      return;
    const s = r, o = t.let("valid", !1), a = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: a }), t.block(u), e.result(o, () => e.reset(), () => e.error(!0));
    function u() {
      s.forEach((l, f) => {
        let h;
        (0, Gq.alwaysValidSchema)(i, l) ? t.var(c, !0) : h = e.subschema({
          keyword: "oneOf",
          schemaProp: f,
          compositeRule: !0
        }, c), f > 0 && t.if((0, Aa._)`${c} && ${o}`).assign(o, !1).assign(a, (0, Aa._)`[${a}, ${f}]`).else(), t.if(c, () => {
          t.assign(o, !0), t.assign(a, f), h && e.mergeEvaluated(h, Aa.Name);
        });
      });
    }
  }
};
Yd.default = Kq;
var Jd = {};
Object.defineProperty(Jd, "__esModule", { value: !0 });
const Wq = Y, Yq = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const i = t.name("valid");
    r.forEach((s, o) => {
      if ((0, Wq.alwaysValidSchema)(n, s))
        return;
      const a = e.subschema({ keyword: "allOf", schemaProp: o }, i);
      e.ok(i), e.mergeEvaluated(a);
    });
  }
};
Jd.default = Yq;
var Xd = {};
Object.defineProperty(Xd, "__esModule", { value: !0 });
const Qa = de, S_ = Y, Jq = {
  message: ({ params: e }) => (0, Qa.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Qa._)`{failingKeyword: ${e.ifClause}}`
}, Xq = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Jq,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, S_.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const i = ky(n, "then"), s = ky(n, "else");
    if (!i && !s)
      return;
    const o = t.let("valid", !0), a = t.name("_valid");
    if (c(), e.reset(), i && s) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(a, u("then", l), u("else", l));
    } else i ? t.if(a, u("then")) : t.if((0, Qa.not)(a), u("else"));
    e.pass(o, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, a);
      e.mergeEvaluated(l);
    }
    function u(l, f) {
      return () => {
        const h = e.subschema({ keyword: l }, a);
        t.assign(o, a), e.mergeValidEvaluated(h, o), f ? t.assign(f, (0, Qa._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function ky(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, S_.alwaysValidSchema)(e, r);
}
Xd.default = Xq;
var Qd = {};
Object.defineProperty(Qd, "__esModule", { value: !0 });
const Qq = Y, Zq = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, Qq.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Qd.default = Zq;
Object.defineProperty(xd, "__esModule", { value: !0 });
const e9 = is, t9 = qd, r9 = ss, n9 = Bd, i9 = Vd, s9 = w_, o9 = Hd, a9 = Mc, c9 = Gd, l9 = zd, u9 = Kd, f9 = Wd, d9 = Yd, h9 = Jd, p9 = Xd, m9 = Qd;
function y9(e = !1) {
  const t = [
    // any
    u9.default,
    f9.default,
    d9.default,
    h9.default,
    p9.default,
    m9.default,
    // object
    o9.default,
    a9.default,
    s9.default,
    c9.default,
    l9.default
  ];
  return e ? t.push(t9.default, n9.default) : t.push(e9.default, r9.default), t.push(i9.default), t;
}
xd.default = y9;
var Zd = {}, eh = {};
Object.defineProperty(eh, "__esModule", { value: !0 });
const Me = de, g9 = {
  message: ({ schemaCode: e }) => (0, Me.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Me._)`{format: ${e}}`
}, $9 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: g9,
  code(e, t) {
    const { gen: r, data: n, $data: i, schema: s, schemaCode: o, it: a } = e, { opts: c, errSchemaPath: u, schemaEnv: l, self: f } = a;
    if (!c.validateFormats)
      return;
    i ? h() : p();
    function h() {
      const y = r.scopeValue("formats", {
        ref: f.formats,
        code: c.code.formats
      }), $ = r.const("fDef", (0, Me._)`${y}[${o}]`), v = r.let("fType"), m = r.let("format");
      r.if((0, Me._)`typeof ${$} == "object" && !(${$} instanceof RegExp)`, () => r.assign(v, (0, Me._)`${$}.type || "string"`).assign(m, (0, Me._)`${$}.validate`), () => r.assign(v, (0, Me._)`"string"`).assign(m, $)), e.fail$data((0, Me.or)(w(), T()));
      function w() {
        return c.strictSchema === !1 ? Me.nil : (0, Me._)`${o} && !${m}`;
      }
      function T() {
        const I = l.$async ? (0, Me._)`(${$}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, Me._)`${m}(${n})`, F = (0, Me._)`(typeof ${m} == "function" ? ${I} : ${m}.test(${n}))`;
        return (0, Me._)`${m} && ${m} !== true && ${v} === ${t} && !${F}`;
      }
    }
    function p() {
      const y = f.formats[s];
      if (!y) {
        w();
        return;
      }
      if (y === !0)
        return;
      const [$, v, m] = T(y);
      $ === t && e.pass(I());
      function w() {
        if (c.strictSchema === !1) {
          f.logger.warn(F());
          return;
        }
        throw new Error(F());
        function F() {
          return `unknown format "${s}" ignored in schema at path "${u}"`;
        }
      }
      function T(F) {
        const H = F instanceof RegExp ? (0, Me.regexpCode)(F) : c.code.formats ? (0, Me._)`${c.code.formats}${(0, Me.getProperty)(s)}` : void 0, z = r.scopeValue("formats", { key: s, ref: F, code: H });
        return typeof F == "object" && !(F instanceof RegExp) ? [F.type || "string", F.validate, (0, Me._)`${z}.validate`] : ["string", F, z];
      }
      function I() {
        if (typeof y == "object" && !(y instanceof RegExp) && y.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, Me._)`await ${m}(${n})`;
        }
        return typeof v == "function" ? (0, Me._)`${m}(${n})` : (0, Me._)`${m}.test(${n})`;
      }
    }
  }
};
eh.default = $9;
Object.defineProperty(Zd, "__esModule", { value: !0 });
const v9 = eh, _9 = [v9.default];
Zd.default = _9;
var Gi = {};
Object.defineProperty(Gi, "__esModule", { value: !0 });
Gi.contentVocabulary = Gi.metadataVocabulary = void 0;
Gi.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Gi.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Pd, "__esModule", { value: !0 });
const w9 = Td, E9 = Nd, S9 = xd, b9 = Zd, Dy = Gi, P9 = [
  w9.default,
  E9.default,
  (0, S9.default)(),
  b9.default,
  Dy.metadataVocabulary,
  Dy.contentVocabulary
];
Pd.default = P9;
var th = {}, xc = {};
Object.defineProperty(xc, "__esModule", { value: !0 });
xc.DiscrError = void 0;
var Fy;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Fy || (xc.DiscrError = Fy = {}));
Object.defineProperty(th, "__esModule", { value: !0 });
const Ei = de, Su = xc, jy = Rt, T9 = ns, A9 = Y, N9 = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Su.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, Ei._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, O9 = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: N9,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: i, it: s } = e, { oneOf: o } = i;
    if (!s.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const a = n.propertyName;
    if (typeof a != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), u = t.const("tag", (0, Ei._)`${r}${(0, Ei.getProperty)(a)}`);
    t.if((0, Ei._)`typeof ${u} == "string"`, () => l(), () => e.error(!1, { discrError: Su.DiscrError.Tag, tag: u, tagName: a })), e.ok(c);
    function l() {
      const p = h();
      t.if(!1);
      for (const y in p)
        t.elseIf((0, Ei._)`${u} === ${y}`), t.assign(c, f(p[y]));
      t.else(), e.error(!1, { discrError: Su.DiscrError.Mapping, tag: u, tagName: a }), t.endIf();
    }
    function f(p) {
      const y = t.name("valid"), $ = e.subschema({ keyword: "oneOf", schemaProp: p }, y);
      return e.mergeEvaluated($, Ei.Name), y;
    }
    function h() {
      var p;
      const y = {}, $ = m(i);
      let v = !0;
      for (let I = 0; I < o.length; I++) {
        let F = o[I];
        if (F != null && F.$ref && !(0, A9.schemaHasRulesButRef)(F, s.self.RULES)) {
          const z = F.$ref;
          if (F = jy.resolveRef.call(s.self, s.schemaEnv.root, s.baseId, z), F instanceof jy.SchemaEnv && (F = F.schema), F === void 0)
            throw new T9.default(s.opts.uriResolver, s.baseId, z);
        }
        const H = (p = F == null ? void 0 : F.properties) === null || p === void 0 ? void 0 : p[a];
        if (typeof H != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${a}"`);
        v = v && ($ || m(F)), w(H, I);
      }
      if (!v)
        throw new Error(`discriminator: "${a}" must be required`);
      return y;
      function m({ required: I }) {
        return Array.isArray(I) && I.includes(a);
      }
      function w(I, F) {
        if (I.const)
          T(I.const, F);
        else if (I.enum)
          for (const H of I.enum)
            T(H, F);
        else
          throw new Error(`discriminator: "properties/${a}" must have "const" or "enum"`);
      }
      function T(I, F) {
        if (typeof I != "string" || I in y)
          throw new Error(`discriminator: "${a}" values must be unique strings`);
        y[I] = F;
      }
    }
  }
};
th.default = O9;
const R9 = "http://json-schema.org/draft-07/schema#", I9 = "http://json-schema.org/draft-07/schema#", C9 = "Core schema meta-schema", k9 = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, D9 = [
  "object",
  "boolean"
], F9 = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, j9 = {
  $schema: R9,
  $id: I9,
  title: C9,
  definitions: k9,
  type: D9,
  properties: F9,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Uv, n = Pd, i = th, s = j9, o = ["/properties"], a = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((y) => this.addVocabulary(y)), this.opts.discriminator && this.addKeyword(i.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const y = this.opts.$data ? this.$dataMetaSchema(s, o) : s;
      this.addMetaSchema(y, a, !1), this.refs["http://json-schema.org/schema"] = a;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(a) ? a : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var u = sr;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return u.KeywordCxt;
  } });
  var l = de;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return l._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return l.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return l.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return l.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return l.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return l.CodeGen;
  } });
  var f = Ed();
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return f.default;
  } });
  var h = ns;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return h.default;
  } });
})(yu, yu.exports);
var L9 = yu.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = L9, r = de, n = r.operators, i = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, s = {
    message: ({ keyword: a, schemaCode: c }) => (0, r.str)`should be ${i[a].okStr} ${c}`,
    params: ({ keyword: a, schemaCode: c }) => (0, r._)`{comparison: ${i[a].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(i),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: s,
    code(a) {
      const { gen: c, data: u, schemaCode: l, keyword: f, it: h } = a, { opts: p, self: y } = h;
      if (!p.validateFormats)
        return;
      const $ = new t.KeywordCxt(h, y.RULES.all.format.definition, "format");
      $.$data ? v() : m();
      function v() {
        const T = c.scopeValue("formats", {
          ref: y.formats,
          code: p.code.formats
        }), I = c.const("fmt", (0, r._)`${T}[${$.schemaCode}]`);
        a.fail$data((0, r.or)((0, r._)`typeof ${I} != "object"`, (0, r._)`${I} instanceof RegExp`, (0, r._)`typeof ${I}.compare != "function"`, w(I)));
      }
      function m() {
        const T = $.schema, I = y.formats[T];
        if (!I || I === !0)
          return;
        if (typeof I != "object" || I instanceof RegExp || typeof I.compare != "function")
          throw new Error(`"${f}": format "${T}" does not define "compare" function`);
        const F = c.scopeValue("formats", {
          key: T,
          ref: I,
          code: p.code.formats ? (0, r._)`${p.code.formats}${(0, r.getProperty)(T)}` : void 0
        });
        a.fail$data(w(F));
      }
      function w(T) {
        return (0, r._)`${T}.compare(${u}, ${l}) ${i[f].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const o = (a) => (a.addKeyword(e.formatLimitDefinition), a);
  e.default = o;
})(Lv);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = jv, n = Lv, i = de, s = new i.Name("fullFormats"), o = new i.Name("fastFormats"), a = (u, l = { keywords: !0 }) => {
    if (Array.isArray(l))
      return c(u, l, r.fullFormats, s), u;
    const [f, h] = l.mode === "fast" ? [r.fastFormats, o] : [r.fullFormats, s], p = l.formats || r.formatNames;
    return c(u, p, f, h), l.keywords && (0, n.default)(u), u;
  };
  a.get = (u, l = "full") => {
    const h = (l === "fast" ? r.fastFormats : r.fullFormats)[u];
    if (!h)
      throw new Error(`Unknown format "${u}"`);
    return h;
  };
  function c(u, l, f, h) {
    var p, y;
    (p = (y = u.opts.code).formats) !== null && p !== void 0 || (y.formats = (0, i._)`require("ajv-formats/dist/formats").${h}`);
    for (const $ of l)
      u.addFormat($, f[$]);
  }
  e.exports = t = a, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = a;
})(mu, mu.exports);
var U9 = mu.exports;
const M9 = /* @__PURE__ */ rc(U9), x9 = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const i = Object.getOwnPropertyDescriptor(e, r), s = Object.getOwnPropertyDescriptor(t, r);
  !q9(i, s) && n || Object.defineProperty(e, r, s);
}, q9 = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, B9 = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, V9 = (e, t) => `/* Wrapped ${e}*/
${t}`, H9 = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), G9 = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), z9 = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, i = V9.bind(null, n, t.toString());
  Object.defineProperty(i, "name", G9);
  const { writable: s, enumerable: o, configurable: a } = H9;
  Object.defineProperty(e, "toString", { value: i, writable: s, enumerable: o, configurable: a });
};
function K9(e, t, { ignoreNonConfigurable: r = !1 } = {}) {
  const { name: n } = e;
  for (const i of Reflect.ownKeys(t))
    x9(e, t, i, r);
  return B9(e, t), z9(e, t, n), e;
}
const Ly = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    maxWait: n = Number.POSITIVE_INFINITY,
    before: i = !1,
    after: s = !0
  } = t;
  if (r < 0 || n < 0)
    throw new RangeError("`wait` and `maxWait` must not be negative.");
  if (!i && !s)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let o, a, c;
  const u = function(...l) {
    const f = this, h = () => {
      o = void 0, a && (clearTimeout(a), a = void 0), s && (c = e.apply(f, l));
    }, p = () => {
      a = void 0, o && (clearTimeout(o), o = void 0), s && (c = e.apply(f, l));
    }, y = i && !o;
    return clearTimeout(o), o = setTimeout(h, r), n > 0 && n !== Number.POSITIVE_INFINITY && !a && (a = setTimeout(p, n)), y && (c = e.apply(f, l)), c;
  };
  return K9(u, e), u.cancel = () => {
    o && (clearTimeout(o), o = void 0), a && (clearTimeout(a), a = void 0);
  }, u;
}, W9 = Object.prototype.toString, Y9 = "[object Uint8Array]", J9 = "[object ArrayBuffer]";
function b_(e, t, r) {
  return e ? e.constructor === t ? !0 : W9.call(e) === r : !1;
}
function P_(e) {
  return b_(e, Uint8Array, Y9);
}
function X9(e) {
  return b_(e, ArrayBuffer, J9);
}
function Q9(e) {
  return P_(e) || X9(e);
}
function Z9(e) {
  if (!P_(e))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof e}\``);
}
function eB(e) {
  if (!Q9(e))
    throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof e}\``);
}
function Uy(e, t) {
  if (e.length === 0)
    return new Uint8Array(0);
  t ?? (t = e.reduce((i, s) => i + s.length, 0));
  const r = new Uint8Array(t);
  let n = 0;
  for (const i of e)
    Z9(i), r.set(i, n), n += i.length;
  return r;
}
const pa = {
  utf8: new globalThis.TextDecoder("utf8")
};
function My(e, t = "utf8") {
  return eB(e), pa[t] ?? (pa[t] = new globalThis.TextDecoder(t)), pa[t].decode(e);
}
function tB(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected \`string\`, got \`${typeof e}\``);
}
const rB = new globalThis.TextEncoder();
function xl(e) {
  return tB(e), rB.encode(e);
}
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
const nB = M9.default, xy = "aes-256-cbc", $i = () => /* @__PURE__ */ Object.create(null), iB = (e) => e != null, sB = (e, t) => {
  const r = /* @__PURE__ */ new Set([
    "undefined",
    "symbol",
    "function"
  ]), n = typeof t;
  if (r.has(n))
    throw new TypeError(`Setting a value of type \`${n}\` for key \`${e}\` is not allowed as it's not supported by JSON`);
}, Na = "__internal__", ql = `${Na}.migrations.version`;
var sn, Or, Ut, Rr;
class oB {
  constructor(t = {}) {
    pt(this, "path");
    pt(this, "events");
    us(this, sn);
    us(this, Or);
    us(this, Ut);
    us(this, Rr, {});
    pt(this, "_deserialize", (t) => JSON.parse(t));
    pt(this, "_serialize", (t) => JSON.stringify(t, void 0, "	"));
    const r = {
      configName: "config",
      fileExtension: "json",
      projectSuffix: "nodejs",
      clearInvalidConfig: !1,
      accessPropertiesByDotNotation: !0,
      configFileMode: 438,
      ...t
    };
    if (!r.cwd) {
      if (!r.projectName)
        throw new Error("Please specify the `projectName` option.");
      r.cwd = Ak(r.projectName, { suffix: r.projectSuffix }).config;
    }
    if (fs(this, Ut, r), r.schema ?? r.ajvOptions ?? r.rootSchema) {
      if (r.schema && typeof r.schema != "object")
        throw new TypeError("The `schema` option must be an object.");
      const o = new OM.Ajv2020({
        allErrors: !0,
        useDefaults: !0,
        ...r.ajvOptions
      });
      nB(o);
      const a = {
        ...r.rootSchema,
        type: "object",
        properties: r.schema
      };
      fs(this, sn, o.compile(a));
      for (const [c, u] of Object.entries(r.schema ?? {}))
        u != null && u.default && (Ce(this, Rr)[c] = u.default);
    }
    r.defaults && fs(this, Rr, {
      ...Ce(this, Rr),
      ...r.defaults
    }), r.serialize && (this._serialize = r.serialize), r.deserialize && (this._deserialize = r.deserialize), this.events = new EventTarget(), fs(this, Or, r.encryptionKey);
    const n = r.fileExtension ? `.${r.fileExtension}` : "";
    this.path = X.resolve(r.cwd, `${r.configName ?? "config"}${n}`);
    const i = this.store, s = Object.assign($i(), r.defaults, i);
    if (r.migrations) {
      if (!r.projectVersion)
        throw new Error("Please specify the `projectVersion` option.");
      this._migrate(r.migrations, r.projectVersion, r.beforeEachMigration);
    }
    this._validate(s);
    try {
      Zw.deepEqual(i, s);
    } catch {
      this.store = s;
    }
    r.watch && this._watch();
  }
  get(t, r) {
    if (Ce(this, Ut).accessPropertiesByDotNotation)
      return this._get(t, r);
    const { store: n } = this;
    return t in n ? n[t] : r;
  }
  set(t, r) {
    if (typeof t != "string" && typeof t != "object")
      throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof t}`);
    if (typeof t != "object" && r === void 0)
      throw new TypeError("Use `delete()` to clear values");
    if (this._containsReservedKey(t))
      throw new TypeError(`Please don't use the ${Na} key, as it's used to manage this module internal operations.`);
    const { store: n } = this, i = (s, o) => {
      sB(s, o), Ce(this, Ut).accessPropertiesByDotNotation ? Fm(n, s, o) : n[s] = o;
    };
    if (typeof t == "object") {
      const s = t;
      for (const [o, a] of Object.entries(s))
        i(o, a);
    } else
      i(t, r);
    this.store = n;
  }
  has(t) {
    return Ce(this, Ut).accessPropertiesByDotNotation ? Sk(this.store, t) : t in this.store;
  }
  /**
      Reset items to their default values, as defined by the `defaults` or `schema` option.
  
      @see `clear()` to reset all items.
  
      @param keys - The keys of the items to reset.
      */
  reset(...t) {
    for (const r of t)
      iB(Ce(this, Rr)[r]) && this.set(r, Ce(this, Rr)[r]);
  }
  delete(t) {
    const { store: r } = this;
    Ce(this, Ut).accessPropertiesByDotNotation ? Ek(r, t) : delete r[t], this.store = r;
  }
  /**
      Delete all items.
  
      This resets known items to their default values, if defined by the `defaults` or `schema` option.
      */
  clear() {
    this.store = $i();
    for (const t of Object.keys(Ce(this, Rr)))
      this.reset(t);
  }
  onDidChange(t, r) {
    if (typeof t != "string")
      throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof t}`);
    if (typeof r != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof r}`);
    return this._handleChange(() => this.get(t), r);
  }
  /**
      Watches the whole config object, calling `callback` on any changes.
  
      @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      @returns A function, that when called, will unsubscribe.
      */
  onDidAnyChange(t) {
    if (typeof t != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof t}`);
    return this._handleChange(() => this.store, t);
  }
  get size() {
    return Object.keys(this.store).length;
  }
  /**
      Get all the config as an object or replace the current config with an object.
  
      @example
      ```
      console.log(config.store);
      //=> {name: 'John', age: 30}
      ```
  
      @example
      ```
      config.store = {
          hello: 'world'
      };
      ```
      */
  get store() {
    try {
      const t = fe.readFileSync(this.path, Ce(this, Or) ? null : "utf8"), r = this._encryptData(t), n = this._deserialize(r);
      return this._validate(n), Object.assign($i(), n);
    } catch (t) {
      if ((t == null ? void 0 : t.code) === "ENOENT")
        return this._ensureDirectory(), $i();
      if (Ce(this, Ut).clearInvalidConfig && t.name === "SyntaxError")
        return $i();
      throw t;
    }
  }
  set store(t) {
    this._ensureDirectory(), this._validate(t), this._write(t), this.events.dispatchEvent(new Event("change"));
  }
  *[Symbol.iterator]() {
    for (const [t, r] of Object.entries(this.store))
      yield [t, r];
  }
  _encryptData(t) {
    if (!Ce(this, Or))
      return typeof t == "string" ? t : My(t);
    try {
      const r = t.slice(0, 16), n = vi.pbkdf2Sync(Ce(this, Or), r.toString(), 1e4, 32, "sha512"), i = vi.createDecipheriv(xy, n, r), s = t.slice(17), o = typeof s == "string" ? xl(s) : s;
      return My(Uy([i.update(o), i.final()]));
    } catch {
    }
    return t.toString();
  }
  _handleChange(t, r) {
    let n = t();
    const i = () => {
      const s = n, o = t();
      Qw(o, s) || (n = o, r.call(this, o, s));
    };
    return this.events.addEventListener("change", i), () => {
      this.events.removeEventListener("change", i);
    };
  }
  _validate(t) {
    if (!Ce(this, sn) || Ce(this, sn).call(this, t) || !Ce(this, sn).errors)
      return;
    const n = Ce(this, sn).errors.map(({ instancePath: i, message: s = "" }) => `\`${i.slice(1)}\` ${s}`);
    throw new Error("Config schema violation: " + n.join("; "));
  }
  _ensureDirectory() {
    fe.mkdirSync(X.dirname(this.path), { recursive: !0 });
  }
  _write(t) {
    let r = this._serialize(t);
    if (Ce(this, Or)) {
      const n = vi.randomBytes(16), i = vi.pbkdf2Sync(Ce(this, Or), n.toString(), 1e4, 32, "sha512"), s = vi.createCipheriv(xy, i, n);
      r = Uy([n, xl(":"), s.update(xl(r)), s.final()]);
    }
    if (He.env.SNAP)
      fe.writeFileSync(this.path, r, { mode: Ce(this, Ut).configFileMode });
    else
      try {
        F$(this.path, r, { mode: Ce(this, Ut).configFileMode });
      } catch (n) {
        if ((n == null ? void 0 : n.code) === "EXDEV") {
          fe.writeFileSync(this.path, r, { mode: Ce(this, Ut).configFileMode });
          return;
        }
        throw n;
      }
  }
  _watch() {
    this._ensureDirectory(), fe.existsSync(this.path) || this._write($i()), He.platform === "win32" ? fe.watch(this.path, { persistent: !1 }, Ly(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 100 })) : fe.watchFile(this.path, { persistent: !1 }, Ly(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 5e3 }));
  }
  _migrate(t, r, n) {
    let i = this._get(ql, "0.0.0");
    const s = Object.keys(t).filter((a) => this._shouldPerformMigration(a, i, r));
    let o = { ...this.store };
    for (const a of s)
      try {
        n && n(this, {
          fromVersion: i,
          toVersion: a,
          finalVersion: r,
          versions: s
        });
        const c = t[a];
        c == null || c(this), this._set(ql, a), i = a, o = { ...this.store };
      } catch (c) {
        throw this.store = o, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${c}`);
      }
    (this._isVersionInRangeFormat(i) || !li.eq(i, r)) && this._set(ql, r);
  }
  _containsReservedKey(t) {
    return typeof t == "object" && Object.keys(t)[0] === Na ? !0 : typeof t != "string" ? !1 : Ce(this, Ut).accessPropertiesByDotNotation ? !!t.startsWith(`${Na}.`) : !1;
  }
  _isVersionInRangeFormat(t) {
    return li.clean(t) === null;
  }
  _shouldPerformMigration(t, r, n) {
    return this._isVersionInRangeFormat(t) ? r !== "0.0.0" && li.satisfies(r, t) ? !1 : li.satisfies(n, t) : !(li.lte(t, r) || li.gt(t, n));
  }
  _get(t, r) {
    return wk(this.store, t, r);
  }
  _set(t, r) {
    const { store: n } = this;
    Fm(n, t, r), this.store = n;
  }
}
sn = new WeakMap(), Or = new WeakMap(), Ut = new WeakMap(), Rr = new WeakMap();
const { app: Oa, ipcMain: bu, shell: aB } = jr;
let qy = !1;
const By = () => {
  if (!bu || !Oa)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: Oa.getPath("userData"),
    appVersion: Oa.getVersion()
  };
  return qy || (bu.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), qy = !0), e;
};
class cB extends oB {
  constructor(t) {
    let r, n;
    if (He.type === "renderer") {
      const i = jr.ipcRenderer.sendSync("electron-store-get-data");
      if (!i)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = i);
    } else bu && Oa && ({ defaultCwd: r, appVersion: n } = By());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = X.isAbsolute(t.cwd) ? t.cwd : X.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    By();
  }
  async openInEditor() {
    const t = await aB.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var rh = Za, lB = ge, En = fo.spawn, nh = "HKLM", T_ = "HKCU", A_ = "HKCR", N_ = "HKU", O_ = "HKCC", R_ = [nh, T_, A_, N_, O_], I_ = "REG_SZ", C_ = "REG_MULTI_SZ", k_ = "REG_EXPAND_SZ", D_ = "REG_DWORD", F_ = "REG_QWORD", j_ = "REG_BINARY", L_ = "REG_NONE", U_ = [I_, C_, k_, D_, F_, j_, L_], uB = "", fB = /(\\[a-zA-Z0-9_\s]+)*/, dB = /^(HKEY_LOCAL_MACHINE|HKEY_CURRENT_USER|HKEY_CLASSES_ROOT|HKEY_USERS|HKEY_CURRENT_CONFIG)(.*)$/, M_ = /^(.*)\s(REG_SZ|REG_MULTI_SZ|REG_EXPAND_SZ|REG_DWORD|REG_QWORD|REG_BINARY|REG_NONE)\s+([^\s].*)$/;
function Oi(e, t) {
  if (!(this instanceof Oi))
    return new Oi(e, t);
  Error.captureStackTrace(this, Oi), this.__defineGetter__("name", function() {
    return Oi.name;
  }), this.__defineGetter__("message", function() {
    return e;
  }), this.__defineGetter__("code", function() {
    return t;
  });
}
rh.inherits(Oi, Error);
function Sn(e) {
  var t = { stdout: "", stderr: "" };
  return e.stdout.on("data", function(r) {
    t.stdout += r.toString();
  }), e.stderr.on("data", function(r) {
    t.stderr += r.toString();
  }), t;
}
function bn(e, t, r) {
  var n = r.stdout.trim(), i = r.stderr.trim(), s = rh.format(`%s command exited with code %d:
%s
%s`, e, t, n, i);
  return new Oi(s, t);
}
function hB(e) {
  if (e == "x64")
    return "64";
  if (e == "x86")
    return "32";
  throw new Error("illegal architecture: " + e + " (use x86 or x64)");
}
function Pn(e, t) {
  t && e.push("/reg:" + hB(t));
}
function Tn() {
  return process.platform === "win32" ? lB.join(process.env.windir, "system32", "reg.exe") : "REG";
}
function lo(e, t, r, n, i, s, o) {
  if (!(this instanceof lo))
    return new lo(e, t, r, n, i, s, o);
  var a = e, c = t, u = r, l = n, f = i, h = s, p = o;
  this.__defineGetter__("host", function() {
    return a;
  }), this.__defineGetter__("hive", function() {
    return c;
  }), this.__defineGetter__("key", function() {
    return u;
  }), this.__defineGetter__("name", function() {
    return l;
  }), this.__defineGetter__("type", function() {
    return f;
  }), this.__defineGetter__("value", function() {
    return h;
  }), this.__defineGetter__("arch", function() {
    return p;
  });
}
rh.inherits(lo, Object);
function _e(e) {
  if (!(this instanceof _e))
    return new _e(e);
  var t = e || {}, r = "" + (t.host || ""), n = "" + (t.hive || nh), i = "" + (t.key || ""), s = t.arch || null;
  if (this.__defineGetter__("host", function() {
    return r;
  }), this.__defineGetter__("hive", function() {
    return n;
  }), this.__defineGetter__("key", function() {
    return i;
  }), this.__defineGetter__("path", function() {
    return '"' + (r.length == 0 ? "" : "\\\\" + r + "\\") + n + i + '"';
  }), this.__defineGetter__("arch", function() {
    return s;
  }), this.__defineGetter__("parent", function() {
    var o = i.lastIndexOf("\\");
    return new _e({
      host: this.host,
      hive: this.hive,
      key: o == -1 ? "" : i.substring(0, o),
      arch: this.arch
    });
  }), R_.indexOf(n) == -1)
    throw new Error("illegal hive specified.");
  if (!fB.test(i))
    throw new Error("illegal key specified.");
  if (s && s != "x64" && s != "x86")
    throw new Error("illegal architecture specified (use x86 or x64)");
}
_e.HKLM = nh;
_e.HKCU = T_;
_e.HKCR = A_;
_e.HKU = N_;
_e.HKCC = O_;
_e.HIVES = R_;
_e.REG_SZ = I_;
_e.REG_MULTI_SZ = C_;
_e.REG_EXPAND_SZ = k_;
_e.REG_DWORD = D_;
_e.REG_QWORD = F_;
_e.REG_BINARY = j_;
_e.REG_NONE = L_;
_e.REG_TYPES = U_;
_e.DEFAULT_VALUE = uB;
_e.prototype.values = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["QUERY", this.path];
  Pn(r, this.arch);
  var n = En(Tn(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = "", s = this, o = null, a = Sn(n);
  return n.on("close", function(c) {
    if (!o)
      if (c !== 0)
        t(bn("QUERY", c, a), null);
      else {
        for (var u = [], l = [], f = i.split(`
`), h = 0, p = 0, y = f.length; p < y; p++) {
          var $ = f[p].trim();
          $.length > 0 && (h != 0 && u.push($), ++h);
        }
        for (var p = 0, y = u.length; p < y; p++) {
          var v = M_.exec(u[p]), m, w, T;
          v && (m = v[1].trim(), w = v[2].trim(), T = v[3], l.push(new lo(s.host, s.hive, s.key, m, w, T, s.arch)));
        }
        t(null, l);
      }
  }), n.stdout.on("data", function(c) {
    i += c.toString();
  }), n.on("error", function(c) {
    o = c, t(c);
  }), this;
};
_e.prototype.keys = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["QUERY", this.path];
  Pn(r, this.arch);
  var n = En(Tn(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = "", s = this, o = null, a = Sn(n);
  return n.on("close", function(c) {
    o || c !== 0 && t(bn("QUERY", c, a), null);
  }), n.stdout.on("data", function(c) {
    i += c.toString();
  }), n.stdout.on("end", function() {
    for (var c = [], u = [], l = i.split(`
`), f = 0, h = l.length; f < h; f++) {
      var p = l[f].trim();
      p.length > 0 && c.push(p);
    }
    for (var f = 0, h = c.length; f < h; f++) {
      var y = dB.exec(c[f]), $;
      y && (y[1], $ = y[2], $ && $ !== s.key && u.push(new _e({
        host: s.host,
        hive: s.hive,
        key: $,
        arch: s.arch
      })));
    }
    t(null, u);
  }), n.on("error", function(c) {
    o = c, t(c);
  }), this;
};
_e.prototype.get = function(t, r) {
  if (typeof r != "function")
    throw new TypeError("must specify a callback");
  var n = ["QUERY", this.path];
  t == "" ? n.push("/ve") : n = n.concat(["/v", t]), Pn(n, this.arch);
  var i = En(Tn(), n, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), s = "", o = this, a = null, c = Sn(i);
  return i.on("close", function(u) {
    if (!a)
      if (u !== 0)
        r(bn("QUERY", u, c), null);
      else {
        for (var l = [], f = null, h = s.split(`
`), p = 0, y = 0, $ = h.length; y < $; y++) {
          var v = h[y].trim();
          v.length > 0 && (p != 0 && l.push(v), ++p);
        }
        var m = l[l.length - 1] || "", w = M_.exec(m), T, I, F;
        w && (T = w[1].trim(), I = w[2].trim(), F = w[3], f = new lo(o.host, o.hive, o.key, T, I, F, o.arch)), r(null, f);
      }
  }), i.stdout.on("data", function(u) {
    s += u.toString();
  }), i.on("error", function(u) {
    a = u, r(u);
  }), this;
};
_e.prototype.set = function(t, r, n, i) {
  if (typeof i != "function")
    throw new TypeError("must specify a callback");
  if (U_.indexOf(r) == -1)
    throw Error("illegal type specified.");
  var s = ["ADD", this.path];
  t == "" ? s.push("/ve") : s = s.concat(["/v", t]), s = s.concat(["/t", r, "/d", n, "/f"]), Pn(s, this.arch);
  var o = En(Tn(), s, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), a = null, c = Sn(o);
  return o.on("close", function(u) {
    a || i(u !== 0 ? bn("ADD", u, c) : null);
  }), o.stdout.on("data", function(u) {
  }), o.on("error", function(u) {
    a = u, i(u);
  }), this;
};
_e.prototype.remove = function(t, r) {
  if (typeof r != "function")
    throw new TypeError("must specify a callback");
  var n = t ? ["DELETE", this.path, "/f", "/v", t] : ["DELETE", this.path, "/f", "/ve"];
  Pn(n, this.arch);
  var i = En(Tn(), n, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), s = null, o = Sn(i);
  return i.on("close", function(a) {
    s || (a !== 0 ? r(bn("DELETE", a, o), null) : r(null));
  }), i.stdout.on("data", function(a) {
  }), i.on("error", function(a) {
    s = a, r(a);
  }), this;
};
_e.prototype.clear = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["DELETE", this.path, "/f", "/va"];
  Pn(r, this.arch);
  var n = En(Tn(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, s = Sn(n);
  return n.on("close", function(o) {
    i || (o !== 0 ? t(bn("DELETE", o, s), null) : t(null));
  }), n.stdout.on("data", function(o) {
  }), n.on("error", function(o) {
    i = o, t(o);
  }), this;
};
_e.prototype.erase = _e.prototype.clear;
_e.prototype.destroy = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["DELETE", this.path, "/f"];
  Pn(r, this.arch);
  var n = En(Tn(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, s = Sn(n);
  return n.on("close", function(o) {
    i || (o !== 0 ? t(bn("DELETE", o, s), null) : t(null));
  }), n.stdout.on("data", function(o) {
  }), n.on("error", function(o) {
    i = o, t(o);
  }), this;
};
_e.prototype.create = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["ADD", this.path, "/f"];
  Pn(r, this.arch);
  var n = En(Tn(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, s = Sn(n);
  return n.on("close", function(o) {
    i || (o !== 0 ? t(bn("ADD", o, s), null) : t(null));
  }), n.stdout.on("data", function(o) {
  }), n.on("error", function(o) {
    i = o, t(o);
  }), this;
};
_e.prototype.keyExists = function(t) {
  return this.values(function(r, n) {
    if (r)
      return r.code == 1 ? t(null, !1) : t(r);
    t(null, !0);
  }), this;
};
_e.prototype.valueExists = function(t, r) {
  return this.get(t, function(n, i) {
    if (n)
      return n.code == 1 ? r(null, !1) : r(n);
    r(null, !0);
  }), this;
};
var pB = _e;
const Vy = /* @__PURE__ */ rc(pB), ve = {
  // 🎮 Informations du launcher et serveur
  launcher: {
    name: "Unreallife launcher",
    version: "1.0.0"
  },
  servers: [
    {
      id: "1",
      name: "UnrealLife",
      ip: "91.134.62.7",
      port: 2302,
      queryPort: 2303,
      maxSlots: 64,
      isDefault: !0
    }
  ],
  mods: {
    folderName: "@Arma",
    urlMods: "http://188.165.227.197:8080/mods",
    urlRessources: "http://188.165.227.197:8080/ressources",
    manifestUrl: "http://188.165.227.197:8080/mods/manifest.json"
  },
  // 📰 Configuration des nouvelles (JSON moderne)
  news: {
    url: "http://188.165.227.197:8080/news/news.json",
    refreshInterval: 3e5
    // 5 minutes
  },
  // 🔗 Liens utiles
  links: {
    principal: [
      {
        title: "Site Web Officiel",
        description: "Accédez au site web du serveur",
        url: "https://unreallife.fr/",
        icon: "🌐"
      },
      {
        title: "Intranet",
        description: "Gérer votre compte et vos informations",
        url: "https://intranet.unreallife.fr/",
        icon: "🌐"
      }
    ],
    communaute: [
      {
        title: "Discord",
        description: "Rejoignez notre serveur Discord",
        url: "https://discord.gg/SRMgZRPrqg",
        icon: "💬"
      }
    ],
    communication: [
      {
        title: "TeamSpeak 3",
        description: "Serveur vocal pour la communication en jeu",
        url: "ts3server://ts3.unreallife.fr",
        icon: "🎤"
      },
      {
        title: "Guide TFAR",
        description: "Guide d'utilisation de Task Force Arrowhead Radio",
        url: "https://discord.com/channels/791056321596227595/1410997569877839956",
        icon: "📡"
      }
    ],
    information: [
      {
        title: "Règlement",
        description: "Règles et conditions d'utilisation du serveur",
        url: "https://discord.com/channels/791056321596227595/1427012155504464054",
        icon: "📋"
      }
    ],
    support: [
      {
        title: "Ticket Support",
        description: "Créer un ticket de support",
        url: "https://discord.com/channels/791056321596227595/1299421761644793917",
        icon: "🎫"
      },
      {
        title: "FAQ",
        description: "Questions fréquemment posées",
        url: "https://discord.com/channels/791056321596227595/791361882870513674",
        icon: "❓"
      }
    ]
  },
  // 🔧 Mode maintenance
  maintenance: !1,
  // ⚡ Optimisations
  performance: {
    chunkSize: 1024 * 1024,
    // 1MB chunks pour téléchargement
    concurrentDownloads: 3,
    // 3 téléchargements simultanés
    quickCheckSampleSize: 5
    // Vérifier seulement 5 fichiers au démarrage
  },
  // 🎨 Personnalisation UI
  ui: {
    primaryColor: "#ff6b35",
    // Orange Arma 3
    secondaryColor: "#dc2626",
    // Rouge Arma 3
    accentColor: "#10b981",
    // Vert succès
    particleCount: 30,
    animationDuration: 300
  }
};
async function x_(e, t = 64 * 1024) {
  return new Promise((r, n) => {
    const i = vi.createHash("sha256"), s = se.createReadStream(e, { highWaterMark: t });
    s.on("data", (o) => i.update(o)), s.on("end", () => r(i.digest("hex"))), s.on("error", n);
  });
}
async function q_(e, t, r, n, i = 3) {
  var c;
  const s = `${t}.partial`;
  await se.ensureDir(X.dirname(t));
  let o = 0, a = null;
  for (; ; )
    try {
      const u = await se.pathExists(s) ? (await se.stat(s)).size : 0, l = {};
      u > 0 && (l.Range = `bytes=${u}-`, console.log(`📥 Reprise du téléchargement à ${u} bytes`));
      const f = await fetch(e, { headers: l });
      if (!f.ok && f.status !== 206)
        throw new Error(`HTTP ${f.status}: ${f.statusText}`);
      const h = f.status === 206, p = f.headers.get("content-length") || "0", y = parseInt(p, 10) || 0, $ = h ? u + y : y, v = await se.open(s, h ? "a" : "w");
      try {
        const m = (c = f.body) == null ? void 0 : c.getReader();
        if (!m) throw new Error("No readable stream from response.body");
        let w = u;
        for (; ; ) {
          const { done: T, value: I } = await m.read();
          if (T) break;
          I && (await se.write(v, Buffer.from(I)), w += I.length, r && $ > 0 && r({
            downloadedBytes: w,
            totalBytes: $,
            percent: Math.max(0, Math.min(100, w / $ * 100))
          }));
        }
      } finally {
        await se.close(v);
      }
      if (n && (await x_(s)).toLowerCase() !== n.toLowerCase())
        throw console.warn(`⚠️ Hash mismatch pour ${X.basename(t)}, nouvelle tentative...`), await se.remove(s), new Error("SHA256 mismatch");
      await se.move(s, t, { overwrite: !0 }), console.log(`✅ Téléchargé: ${X.basename(t)}`);
      return;
    } catch (u) {
      if (a = u instanceof Error ? u : new Error(String(u)), o += 1, o >= i)
        throw console.error(`❌ Échec après ${i} tentatives: ${a.message}`), await se.pathExists(s) && await se.remove(s), new Error(`Échec du téléchargement de ${X.basename(t)}: ${a.message}`);
      const l = 500 * o + Math.random() * 500;
      console.warn(`⚠️ Tentative ${o}/${i} échouée, nouvelle tentative dans ${Math.round(l)}ms...`), await eE(l);
    }
}
async function mB(e, t = 3, r) {
  if (e.length === 0) return;
  const n = e.reduce((f, h) => f + h.size, 0), i = Date.now();
  let s = 0, o = 0;
  const a = /* @__PURE__ */ new Map(), c = (f) => {
    if (!r) return;
    let h = s;
    for (const ue of a.values())
      h += ue;
    const p = (Date.now() - i) / 1e3, y = h / Math.max(p, 1e-3), $ = Math.max(0, n - h), v = Math.round($ / Math.max(y, 1)), m = Math.floor(v / 60), w = Math.round(v % 60), T = `${m}m ${w}s`, I = n > 0 ? Math.min(100, Math.round(h / n * 100)) : 0, F = a.get(f) || 0, H = e.find((ue) => ue.name === f), z = H && H.size > 0 ? Math.min(100, Math.round(F / H.size * 100)) : 0;
    r({
      totalProgress: I,
      currentFile: f,
      fileProgress: z,
      downloadedBytes: h,
      totalBytes: n,
      timeRemaining: T
    });
  }, u = async (f) => {
    a.set(f.name, 0);
    try {
      await q_(
        f.url,
        f.destination,
        (h) => {
          a.set(f.name, h.downloadedBytes), c(f.name);
        },
        f.hash
      ), s += f.size, o++, a.delete(f.name), c(f.name);
    } catch (h) {
      throw a.delete(f.name), h;
    }
  }, l = [];
  for (let f = 0; f < e.length; f += t) {
    const h = e.slice(f, f + t), p = await Promise.allSettled(h.map((y) => u(y)));
    for (const y of p)
      y.status === "rejected" && l.push(y.reason instanceof Error ? y.reason : new Error(String(y.reason)));
  }
  if (l.length > 0)
    throw new Error(`${l.length} fichier(s) ont échoué: ${l.map((f) => f.message).join(", ")}`);
}
class B_ {
  constructor(t, r) {
    pt(this, "manifestUrl");
    pt(this, "localManifestPath");
    this.manifestUrl = t, this.localManifestPath = X.join(r, "manifest.json");
  }
  /**
   * Télécharge le manifest serveur (très rapide, ~1-5KB)
   */
  async fetchServerManifest() {
    try {
      const t = await fetch(this.manifestUrl);
      return t.ok ? await t.json() : null;
    } catch (t) {
      return console.error("Erreur fetch manifest:", t), null;
    }
  }
  /**
   * Lit le manifest local s'il existe
   */
  async getLocalManifest() {
    try {
      if (await se.pathExists(this.localManifestPath))
        return await se.readJson(this.localManifestPath);
    } catch (t) {
      console.error("Erreur lecture manifest local:", t);
    }
    return null;
  }
  /**
   * Sauvegarde le manifest local
   */
  async saveLocalManifest(t) {
    await se.ensureDir(X.dirname(this.localManifestPath)), await se.writeJson(this.localManifestPath, t, { spaces: 2 });
  }
  /**
   * Compare les manifests et retourne seulement les fichiers à télécharger
   * TRÈS RAPIDE - Compare seulement hash + size + lastModified
   */
  async calculateDelta(t) {
    const r = await this.fetchServerManifest(), n = await this.getLocalManifest();
    if (!r)
      throw new Error("Impossible de récupérer le manifest serveur");
    const i = [], s = [];
    let o = 0;
    const a = !n;
    a && console.log("🔍 Première utilisation : scan du dossier local...");
    for (const c of r.files) {
      const u = n == null ? void 0 : n.files.find((y) => y.name === c.name), l = X.join(t, c.name), f = await se.pathExists(l);
      let h = !1, p = "";
      if (!f)
        h = !0, p = u ? "fichier manquant" : "nouveau";
      else if (!u && a)
        console.log(`   🔍 Vérification de ${c.name}...`), (await se.stat(l)).size !== c.size ? (h = !0, p = "taille différente") : await this.calculateFileHash(l) !== c.hash ? (h = !0, p = "hash différent") : console.log(`   ✅ ${c.name} - déjà à jour`);
      else if (u) {
        const y = u.hash !== c.hash, $ = u.lastModified !== c.lastModified;
        (y || $) && (h = !0, p = y ? "hash différent" : "modifié");
      }
      h && (console.log(`   📥 ${c.name} - ${p}`), i.push(c), o += c.size);
    }
    if (n)
      for (const c of n.files)
        r.files.find((l) => l.name === c.name) || (console.log(`   🗑️ ${c.name} - supprimé du serveur`), s.push(c.name));
    else
      try {
        if (await se.pathExists(t)) {
          const c = await se.readdir(t);
          for (const u of c) {
            if (u.startsWith(".") || u === "manifest.json") continue;
            const l = X.join(t, u);
            (await se.stat(l)).isFile() && (r.files.find((p) => p.name === u) || (console.log(`   🗑️ ${u} - fichier orphelin (pas dans le manifest serveur)`), s.push(u)));
          }
        }
      } catch (c) {
        console.error("Erreur lors du scan des fichiers orphelins:", c);
      }
    return console.log(`📊 Résultat: ${i.length} à télécharger, ${s.length} à supprimer`), { toDownload: i, toDelete: s, totalDownloadSize: o };
  }
  /**
   * Vérification rapide par sampling (vérifie seulement quelques fichiers)
   * Utile pour un check rapide au démarrage
   */
  async quickIntegrityCheck(t, r = 5) {
    const n = await this.getLocalManifest();
    if (!n) return !1;
    const i = n.files.sort(() => 0.5 - Math.random()).slice(0, Math.min(r, n.files.length));
    for (const s of i) {
      const o = X.join(t, s.name);
      if (!await se.pathExists(o) || (await se.stat(o)).size !== s.size || await this.calculateFileHash(o) !== s.hash) return !1;
    }
    return !0;
  }
  /**
   * Hash rapide avec streaming pour les gros fichiers
   */
  async calculateFileHash(t) {
    return x_(t);
  }
}
class yB {
  constructor(t, r) {
    pt(this, "newsUrl");
    pt(this, "localNewsPath");
    this.newsUrl = t, this.localNewsPath = X.join(r, "news.json");
  }
  /**
  * Récupérer les actualités depuis le serveur
  */
  async fetchNews() {
    if (!this.newsUrl || this.newsUrl.trim() === "")
      return null;
    try {
      const t = await fetch(this.newsUrl);
      if (!t.ok) return null;
      const r = t.headers.get("content-type");
      if (!r || !r.includes("application/json"))
        return console.log("URL news ne retourne pas du JSON, actualités désactivées"), null;
      const n = await t.json();
      let i = [];
      if (Array.isArray(n))
        i = n;
      else if (n.items && Array.isArray(n.items))
        i = n.items;
      else
        return console.log("Format de données news non reconnu"), null;
      const s = i.map((c) => ({
        ...c,
        publishedAt: c.publishedAt || c.timestamp || Date.now()
      })), o = Date.now(), a = s.filter(
        (c) => !c.expiresAt || c.expiresAt > o
      );
      return {
        version: n.version || "1.0.0",
        lastUpdated: n.lastUpdated || Date.now(),
        items: a
      };
    } catch (t) {
      return console.error("Erreur fetch news:", t), null;
    }
  }
  /**
   * Sauvegarder les actualités localement
   */
  async saveLocalNews(t) {
    await se.ensureDir(X.dirname(this.localNewsPath)), await se.writeJson(this.localNewsPath, t, { spaces: 2 });
  }
  /**
   * Lire les actualités locales
   */
  async getLocalNews() {
    try {
      if (await se.pathExists(this.localNewsPath))
        return await se.readJson(this.localNewsPath);
    } catch (t) {
      console.error("Erreur lecture news locales:", t);
    }
    return null;
  }
  /**
   * Obtenir les actualités avec fallback local
   */
  async getNews() {
    const t = await this.fetchNews();
    if (t)
      return await this.saveLocalNews(t), this.sortNewsByPriority(t.items);
    const r = await this.getLocalNews();
    return r ? this.sortNewsByPriority(r.items) : this.getDefaultNews();
  }
  /**
   * Trier les actualités par priorité et date
   */
  sortNewsByPriority(t) {
    const r = { critical: 4, high: 3, medium: 2, low: 1 };
    return t.sort((n, i) => {
      const s = (r[i.priority] || 1) - (r[n.priority] || 1);
      return s !== 0 ? s : i.publishedAt - n.publishedAt;
    });
  }
  /**
   * Actualités par défaut
   */
  getDefaultNews() {
    return [
      {
        id: "welcome",
        title: "Bienvenue sur Arma RP",
        content: "Merci d'avoir installé le launcher ! Assurez-vous d'avoir Arma 3 installé et rejoignez-nous sur le serveur.",
        author: "Équipe Arma",
        type: "info",
        priority: "medium",
        publishedAt: Date.now(),
        tags: ["bienvenue", "info"]
      }
    ];
  }
  /**
   * Obtenir les actualités critiques (maintenance, urgence)
   */
  async getCriticalNews() {
    return (await this.getNews()).filter((r) => r.priority === "critical");
  }
}
var Ts = {}, qc = {}, Io = {};
Object.defineProperty(Io, "__esModule", { value: !0 });
Io.PromiseSocket = void 0;
const gB = tE;
class $B {
  constructor(t, r) {
    if (this._attempts = t, this._timeout = r, Array.isArray(this._timeout) && this._attempts !== this._timeout.length)
      throw new Error(`Number of attempts (${this._attempts}) does not match the length of the timeout array (${this._timeout.length})`);
    this._socket = (0, gB.createSocket)("udp4");
  }
  async send(t, r, n) {
    return new Promise(async (i, s) => {
      for (let o = 0; o < this._attempts; o++) {
        let a;
        Array.isArray(this._timeout) ? a = this._timeout[o] : a = this._timeout;
        try {
          const c = await this._socketSend(t, r, n, a);
          return i(c);
        } catch (c) {
          if (o === this._attempts - 1)
            return s(c);
        }
      }
    });
  }
  closeSocket() {
    this._socket.close();
  }
  _socketSend(t, r, n, i) {
    return new Promise((s, o) => {
      this._socket.send(t, n, r, (a) => {
        if (a)
          return o(typeof a == "string" ? new Error(a) : a);
        const c = (f) => (this._socket.removeListener("message", c), this._socket.removeListener("error", u), clearTimeout(l), s(f)), u = (f) => (clearTimeout(l), o(f)), l = setTimeout(() => (this._socket.removeListener("message", c), this._socket.removeListener("error", u), o("Timeout reached. Possible reasons: You are being rate limited; Timeout too short; Wrong server host configured;")), i);
        this._socket.on("message", c), this._socket.on("error", u);
      });
    });
  }
}
Io.PromiseSocket = $B;
Object.defineProperty(qc, "__esModule", { value: !0 });
qc.queryMasterServer = void 0;
const vB = Io, Bl = "0.0.0.0:0", _B = Buffer.from([255, 255, 255, 255, 102, 10]);
async function wB(e, t, r = {}, n = 1e3, i) {
  const s = e.split(":"), o = s[0], a = parseInt(s[1]);
  return await new EB(o, a, t, r, n, i).fetchServers();
}
qc.queryMasterServer = wB;
class EB {
  constructor(t, r, n, i, s, o) {
    this._host = t, this._port = r, this._region = n, this._filters = i, this._maxHosts = o, this._seedId = Bl, this._hosts = [], this._promiseSocket = new vB.PromiseSocket(1, s);
  }
  async fetchServers() {
    do {
      let t;
      try {
        t = await this._promiseSocket.send(this._buildPacket(), this._host, this._port);
      } catch (n) {
        throw this._promiseSocket.closeSocket(), new Error(n);
      }
      const r = this._parseBuffer(t);
      if (this._seedId = r[r.length - 1], this._hosts.push(...r), this._maxHosts && this._hosts.length >= this._maxHosts && this._hosts[this._maxHosts - 1] !== Bl)
        return this._promiseSocket.closeSocket(), this._hosts.slice(0, this._maxHosts);
    } while (this._seedId !== Bl);
    return this._promiseSocket.closeSocket(), this._hosts.pop(), this._hosts;
  }
  _buildPacket() {
    return Buffer.concat([
      Buffer.from([49]),
      Buffer.from([this._region]),
      Buffer.from(this._seedId, "ascii"),
      Buffer.from([0]),
      Buffer.from(this.formatFilters(), "ascii")
    ]);
  }
  formatFilters() {
    let t = "";
    for (const r of Object.keys(this._filters)) {
      let n = this._filters[r];
      t += "\\" + r + "\\", r === "nor" || r === "nand" ? t += Object.keys(n).length + this._slashifyObject(n) : Array.isArray(n) ? t += n.join(",") : t += n;
    }
    return t += "\0", t;
  }
  _slashifyObject(t) {
    let r = "";
    for (const n of Object.keys(t)) {
      let i = t[n];
      r += "\\" + n + "\\" + i;
    }
    return r;
  }
  _parseBuffer(t) {
    const r = [];
    t.compare(_B, 0, 6, 0, 6) === 0 && (t = t.slice(6));
    let n = 0;
    for (; n < t.length; ) {
      const i = this._numberToIp(t.readInt32BE(n)), s = t[n + 4] << 8 | t[n + 5];
      r.push(`${i}:${s}`), n += 6;
    }
    return r;
  }
  _numberToIp(t) {
    var r = new ArrayBuffer(4), n = new DataView(r);
    n.setUint32(0, t);
    for (var i = new Array(), s = 0; s < 4; s++)
      i[s] = n.getUint8(s);
    return i.join(".");
  }
}
var V_ = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.REGIONS = void 0, function(t) {
    t[t.US_EAST_COAST = 0] = "US_EAST_COAST", t[t.US_WEST_COAST = 1] = "US_WEST_COAST", t[t.SOUTH_AMERICA = 2] = "SOUTH_AMERICA", t[t.EUROPE = 3] = "EUROPE", t[t.ASIA = 4] = "ASIA", t[t.AUSTRALIA = 5] = "AUSTRALIA", t[t.MIDDLE_EAST = 6] = "MIDDLE_EAST", t[t.AFRICA = 7] = "AFRICA", t[t.ALL = 255] = "ALL";
  }(e.REGIONS || (e.REGIONS = {}));
})(V_);
var hn = {};
Object.defineProperty(hn, "__esModule", { value: !0 });
hn.queryGameServerRules = hn.queryGameServerPlayer = hn.queryGameServerInfo = void 0;
const SB = Io;
async function bB(e, t = 1, r = 1e3) {
  const n = e.split(":"), i = n[0], s = parseInt(n[1]);
  return await new ih(i, s, t, r).info();
}
hn.queryGameServerInfo = bB;
async function PB(e, t = 1, r = 1e3) {
  const n = e.split(":"), i = n[0], s = parseInt(n[1]);
  return await new ih(i, s, t, r).player();
}
hn.queryGameServerPlayer = PB;
async function TB(e, t = 1, r = 1e3) {
  const n = e.split(":"), i = n[0], s = parseInt(n[1]);
  return await new ih(i, s, t, r).rules();
}
hn.queryGameServerRules = TB;
class ih {
  constructor(t, r, n, i) {
    this._host = t, this._port = r, this._promiseSocket = new SB.PromiseSocket(n, i);
  }
  async info() {
    let t;
    try {
      t = await this._promiseSocket.send(this._buildInfoPacket(), this._host, this._port);
    } catch (n) {
      throw this._promiseSocket.closeSocket(), new Error(n);
    }
    if (this._isChallengeResponse(t)) {
      t = t.slice(5);
      const n = t;
      try {
        t = await this._promiseSocket.send(this._buildInfoPacket(n), this._host, this._port);
      } catch (i) {
        throw this._promiseSocket.closeSocket(), new Error(i);
      }
    }
    return this._promiseSocket.closeSocket(), this._parseInfoBuffer(t);
  }
  async player() {
    let t, r = !1, n = 0;
    do {
      let s;
      try {
        s = await this._promiseSocket.send(this._buildPacket(Buffer.from([85])), this._host, this._port);
      } catch (a) {
        throw this._promiseSocket.closeSocket(), new Error(a);
      }
      const o = s.slice(5);
      try {
        t = await this._promiseSocket.send(this._buildPacket(Buffer.from([85]), o), this._host, this._port);
      } catch (a) {
        throw this._promiseSocket.closeSocket(), new Error(a);
      }
      this._isChallengeResponse(t) || (r = !0), n++;
    } while (!r && n < 5);
    if (this._promiseSocket.closeSocket(), this._isChallengeResponse(t))
      throw new Error("Server kept sending challenge responses.");
    return this._parsePlayerBuffer(t);
  }
  async rules() {
    let t;
    try {
      t = await this._promiseSocket.send(this._buildPacket(Buffer.from([86])), this._host, this._port);
    } catch (s) {
      throw this._promiseSocket.closeSocket(), new Error(s);
    }
    const r = t.slice(5);
    let n;
    try {
      n = await this._promiseSocket.send(this._buildPacket(Buffer.from([86]), r), this._host, this._port);
    } catch (s) {
      throw this._promiseSocket.closeSocket(), new Error(s);
    }
    return this._promiseSocket.closeSocket(), this._parseRulesBuffer(n);
  }
  _buildInfoPacket(t) {
    let r = Buffer.concat([
      Buffer.from([255, 255, 255, 255]),
      Buffer.from([84]),
      Buffer.from("Source Engine Query", "ascii"),
      Buffer.from([0])
    ]);
    return t && (r = Buffer.concat([
      r,
      t
    ])), r;
  }
  _buildPacket(t, r) {
    let n = Buffer.concat([
      Buffer.from([255, 255, 255, 255]),
      t
    ]);
    return r ? n = Buffer.concat([
      n,
      r
    ]) : n = Buffer.concat([
      n,
      Buffer.from([255, 255, 255, 255])
    ]), n;
  }
  _isChallengeResponse(t) {
    return t.compare(Buffer.from([255, 255, 255, 255, 65]), 0, 5, 0, 5) === 0;
  }
  _parseInfoBuffer(t) {
    const r = {};
    if (t = t.slice(5), [r.protocol, t] = this._readUInt8(t), [r.name, t] = this._readString(t), [r.map, t] = this._readString(t), [r.folder, t] = this._readString(t), [r.game, t] = this._readString(t), [r.appId, t] = this._readInt16LE(t), [r.players, t] = this._readUInt8(t), [r.maxPlayers, t] = this._readUInt8(t), [r.bots, t] = this._readUInt8(t), r.serverType = t.subarray(0, 1).toString("utf-8"), t = t.slice(1), r.environment = t.subarray(0, 1).toString("utf-8"), t = t.slice(1), [r.visibility, t] = this._readUInt8(t), [r.vac, t] = this._readUInt8(t), [r.version, t] = this._readString(t), t.length > 1) {
      let n;
      [n, t] = this._readUInt8(t), n & 128 && ([r.port, t] = this._readInt16LE(t)), n & 16 && (t = t.slice(8)), n & 64 && ([r.spectatorPort, t] = this._readUInt8(t), [r.spectatorName, t] = this._readString(t)), n & 32 && ([r.keywords, t] = this._readString(t)), n & 1 && (r.gameId = t.readBigInt64LE(), t = t.slice(8));
    }
    return r;
  }
  _parsePlayerBuffer(t) {
    const r = {};
    t = t.slice(5), [r.playerCount, t] = this._readUInt8(t), r.players = [];
    for (let n = 0; n < r.playerCount; n++) {
      let i;
      [i, t] = this._readPlayer(t), r.players.push(i);
    }
    return r;
  }
  _parseRulesBuffer(t) {
    const r = {};
    t = t.slice(5), [r.ruleCount, t] = this._readInt16LE(t), r.rules = [];
    for (let n = 0; n < r.ruleCount; n++) {
      let i;
      [i, t] = this._readRule(t), r.rules.push(i);
    }
    return r;
  }
  _readString(t) {
    const r = t.indexOf(0), n = t.subarray(0, r), i = t.slice(r + 1);
    return [n.toString("utf-8"), i];
  }
  _readUInt8(t) {
    return [t.readUInt8(), t.slice(1)];
  }
  _readInt16LE(t) {
    return [t.readInt16LE(), t.slice(2)];
  }
  _readPlayer(t) {
    let r = {};
    return [r.index, t] = this._readUInt8(t), [r.name, t] = this._readString(t), r.score = t.readInt32LE(), t = t.slice(4), r.duration = t.readFloatLE(), t = t.slice(4), [r, t];
  }
  _readRule(t) {
    let r = {};
    return [r.name, t] = this._readString(t), [r.value, t] = this._readString(t), [r, t];
  }
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.queryGameServerRules = e.queryGameServerPlayer = e.queryGameServerInfo = e.REGIONS = e.queryMasterServer = void 0;
  var t = qc;
  Object.defineProperty(e, "queryMasterServer", { enumerable: !0, get: function() {
    return t.queryMasterServer;
  } });
  var r = V_;
  Object.defineProperty(e, "REGIONS", { enumerable: !0, get: function() {
    return r.REGIONS;
  } });
  var n = hn;
  Object.defineProperty(e, "queryGameServerInfo", { enumerable: !0, get: function() {
    return n.queryGameServerInfo;
  } }), Object.defineProperty(e, "queryGameServerPlayer", { enumerable: !0, get: function() {
    return n.queryGameServerPlayer;
  } }), Object.defineProperty(e, "queryGameServerRules", { enumerable: !0, get: function() {
    return n.queryGameServerRules;
  } });
})(Ts);
class AB {
  constructor() {
    pt(this, "lastServerInfo", null);
    pt(this, "lastQueryTime", 0);
    pt(this, "CACHE_DURATION", 6e4);
    // 60 secondes de cache (optimisé)
    pt(this, "consecutiveErrors", 0);
    pt(this, "lastErrorLogTime", 0);
    pt(this, "ERROR_LOG_INTERVAL", 6e4);
  }
  // Logger les erreurs max 1 fois par minute
  /**
   * Implémentation native du protocole Steam Query A2S_INFO
   * Aucun mot de passe requis - informations publiques
   */
  async getPublicServerInfo() {
    const t = Date.now();
    if (this.lastServerInfo && t - this.lastQueryTime < this.CACHE_DURATION)
      return this.lastServerInfo;
    try {
      const r = Date.now(), n = ve.servers[0].queryPort || ve.servers[0].port, i = `${ve.servers[0].ip}:${n}`;
      this.consecutiveErrors === 0 && console.log(`🔍 Steam Query vers ${i}...`);
      const s = await Ts.queryGameServerInfo(
        i,
        1,
        15e3
        // Augmenté à 15 secondes
      );
      let o = [];
      try {
        const l = await Ts.queryGameServerPlayer(
          i,
          1,
          15e3
        );
        o = Array.isArray(l) ? l.map((f) => f == null ? void 0 : f.name).filter(Boolean) : [];
      } catch {
      }
      const a = Date.now() - r, c = {
        playerCount: (s == null ? void 0 : s.players) ?? 0,
        maxPlayers: (s == null ? void 0 : s.maxPlayers) ?? ve.servers[0].maxSlots,
        serverName: (s == null ? void 0 : s.name) ?? ve.servers[0].name,
        map: (s == null ? void 0 : s.map) ?? "",
        gameMode: (s == null ? void 0 : s.game) ?? "",
        ping: a,
        isOnline: !0,
        version: (s == null ? void 0 : s.version) ?? "Unknown",
        playerList: o
      };
      this.lastServerInfo = c, this.lastQueryTime = t;
      const u = this.consecutiveErrors > 0;
      return this.consecutiveErrors = 0, u && console.log(`✅ Steam Query reconnecté: ${c.playerCount}/${c.maxPlayers} joueurs, ${a}ms`), c;
    } catch {
      this.consecutiveErrors++, t - this.lastErrorLogTime > this.ERROR_LOG_INTERVAL && (console.warn(`⚠️ Steam Query indisponible (${this.consecutiveErrors} échecs) - Le serveur est peut-être hors ligne ou le port ${ve.servers[0].queryPort} n'est pas ouvert`), this.lastErrorLogTime = t);
      const i = {
        playerCount: 0,
        maxPlayers: 0,
        serverName: "",
        map: "",
        gameMode: "",
        ping: 0,
        isOnline: !1,
        version: "",
        playerList: []
      };
      return this.lastServerInfo = i, this.lastQueryTime = t, i;
    }
  }
  // Les implémentations UDP natives sont remplacées par la librairie steam-server-query
  /**
   * Ping simple du serveur
   */
  async pingServer() {
    try {
      const t = Date.now(), r = ve.servers[0].queryPort || ve.servers[0].port, n = `${ve.servers[0].ip}:${r}`;
      return await Ts.queryGameServerInfo(
        n,
        1,
        15e3
      ), { online: !0, ping: Date.now() - t };
    } catch {
      return { online: !1, ping: 0 };
    }
  }
  /**
   * Vérifier si le serveur est en ligne
   */
  async isServerOnline() {
    return (await this.pingServer()).online;
  }
  /**
   * Obtenir seulement le nombre de joueurs (requête très rapide)
   */
  async getPlayerCount() {
    try {
      const t = ve.servers[0].queryPort || ve.servers[0].port, r = `${ve.servers[0].ip}:${t}`, n = await Ts.queryGameServerInfo(
        r,
        1,
        15e3
      );
      return {
        count: (n == null ? void 0 : n.players) ?? 0,
        max: (n == null ? void 0 : n.maxPlayers) ?? ve.servers[0].maxSlots
      };
    } catch {
      return { count: 0, max: ve.servers[0].maxSlots };
    }
  }
}
const Gt = new cB({
  name: "userData",
  cwd: "arma3-data",
  fileExtension: "json"
});
let Fn = null, ma = null;
async function NB() {
  return new Promise((e) => {
    new Vy({
      hive: Vy.HKLM,
      key: "\\SOFTWARE\\WOW6432Node\\Bohemia Interactive\\Arma 3"
    }).get("main", (r, n) => {
      e(r || !n ? null : n.value);
    });
  });
}
function OB(e) {
  return se.existsSync(`${e}\\${ve.mods.folderName}`);
}
async function RB(e) {
  return await se.pathExists(`${e}\\arma3.exe`);
}
function ye(e, t, r, n, i, s, o) {
  e == null || e.webContents.send("main-process-message", {
    message: t,
    success: r,
    error: n,
    data: i,
    fileProgress: s,
    timeRemaining: o
  });
}
function IB(e) {
  ma = new AB(), console.log(`✅ Steam Query activé pour ${ve.servers[0].ip}:${ve.servers[0].queryPort}`), setInterval(async () => {
    try {
      const n = await ma.getPublicServerInfo();
      n.isOnline ? ye(e, "server-info-update", JSON.stringify({
        playerCount: n.playerCount,
        maxPlayers: n.maxPlayers,
        serverName: n.serverName,
        map: n.map,
        gameMode: n.gameMode,
        ping: n.ping,
        isOnline: !0,
        fps: 0,
        // Pas disponible via Steam Query
        uptime: "0:00:00",
        // Pas disponible via Steam Query
        playerList: n.playerList
      })) : ye(e, "server-info-update", JSON.stringify({
        isOnline: !1
      }));
    } catch {
      ye(e, "server-info-update", JSON.stringify({
        isOnline: !1
      }));
    }
  }, 3e4);
  const t = X.join(process.env.APPDATA || process.env.HOME || "", "arma3-data");
  Fn = new yB(ve.news.url, t), e.webContents.on("did-finish-load", async () => {
    let n = Gt.get("arma3Path");
    const i = Gt.get("firstLaunch");
    try {
      if (Fn) {
        const s = await Fn.getNews();
        console.log(`✅ ${s.length} actualités chargées`);
      }
    } catch (s) {
      console.error("Erreur lors du chargement des actualités:", s);
    }
    if ((!n || n === "null") && (n = await NB(), n && Gt.set("arma3Path", n)), n && n !== "null") {
      const s = OB(n);
      ye(
        e,
        s ? "arma3Path-mod-loaded" : "arma3Path-mod-not-loaded",
        void 0,
        s ? void 0 : `Mod ${ve.mods.folderName} non installé`
      ), i && (ye(
        e,
        "firstLaunch-done",
        "Nous vous avons trouvé Arma 3 automatiquement"
      ), Gt.set("firstLaunch", !1)), await CB(e);
    } else
      Gt.set("arma3Path", null), ye(e, "arma3Path-not-loaded");
  }), jt.on("locate-arma3", async () => {
    try {
      const n = await zw.showOpenDialog({
        properties: ["openDirectory"],
        title: "Sélectionner le dossier d'installation d'Arma 3",
        defaultPath: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Arma 3"
      });
      if (!n.canceled && n.filePaths.length > 0) {
        const i = n.filePaths[0];
        await RB(i) ? (Gt.set("arma3Path", i), ye(e, "arma3Path-ready", "Arma 3 trouvé"), await Hy(e)) : ye(
          e,
          "arma3Path-invalid",
          void 0,
          "Le dossier sélectionné ne contient pas Arma 3"
        );
      }
    } catch (n) {
      console.error("Erreur lors de la sélection du dossier Arma 3:", n), ye(
        e,
        "arma3Path-error",
        void 0,
        n instanceof Error ? n.message : "Erreur inconnue"
      );
    }
  }), jt.on("check-mods", async () => {
    console.log("🔄 Vérification manuelle des mods demandée"), await Hy(e);
  }), jt.on("download-mods", async () => {
    var o;
    const n = Gt.get("arma3Path");
    if (!n) {
      ye(e, "download-error", void 0, "Chemin Arma 3 non trouvé");
      return;
    }
    const i = `${n}\\${ve.mods.folderName}`, s = `${i}\\addons`;
    try {
      await se.ensureDir(s), ye(e, "download-start");
      const a = new B_(ve.mods.manifestUrl, i), c = await a.calculateDelta(s);
      if (c.toDelete.length > 0) {
        console.log(`🗑️ Suppression de ${c.toDelete.length} fichier(s) orphelin(s)...`), ye(e, "cleanup-start", `Nettoyage de ${c.toDelete.length} fichier(s) obsolète(s)...`);
        let y = 0;
        for (const $ of c.toDelete) {
          const v = X.join(s, $);
          try {
            await se.pathExists(v) && (await se.remove(v), y++, console.log(`   ✅ Supprimé: ${$}`));
          } catch (m) {
            console.error(`   ❌ Erreur suppression ${$}:`, m);
          }
        }
        y > 0 && ye(e, "cleanup-complete", `${y} fichier(s) supprimé(s) avec succès`);
      }
      if (c.toDownload.length === 0) {
        ye(e, "download-complete", "Mods déjà à jour");
        return;
      }
      const u = c.toDownload.map((y) => ({
        name: y.name,
        url: `${ve.mods.urlMods}/${y.name}`,
        destination: X.join(s, y.name),
        size: y.size,
        hash: y.hash
      })), l = ((o = ve.performance) == null ? void 0 : o.concurrentDownloads) || 3;
      let f = 0;
      const h = 250;
      await mB(
        u,
        l,
        (y) => {
          const $ = Date.now();
          $ - f > h && (ye(
            e,
            "download-progress",
            y.totalProgress.toString(),
            void 0,
            y.currentFile,
            y.fileProgress.toString(),
            y.timeRemaining
          ), f = $);
        }
      );
      const p = await a.fetchServerManifest();
      p && await a.saveLocalManifest(p), ye(e, "download-complete", "Mods synchronisés avec succès"), ye(e, "arma3Path-mod-loaded", "Jeu prêt à être lancé");
    } catch (a) {
      console.error("Erreur lors de la synchronisation des mods:", a), ye(
        e,
        "download-error",
        void 0,
        a instanceof Error ? a.message : "Erreur inconnue"
      );
    }
  }), jt.handle("get-arma3-path", async () => {
    const n = Gt.get("arma3Path");
    return n || null;
  });
  function r(n) {
    const i = Gt.get("arma3Path");
    if (!i) return;
    const s = "-skipIntro -noSplash -enableHT -malloc=jemalloc_bi_x64 -hugePages -noPause -noPauseAudio", o = "-skipIntro -noSplash -enableHT -malloc=jemalloc_bi -hugePages -noPause -noPauseAudio", a = process.arch === "x64", c = a ? "arma3_x64.exe" : "arma3.exe", u = a ? s : o, l = X.join(i, c);
    if (!se.existsSync(l)) {
      ye(e, "launch-game-error", void 0, `Impossible de trouver ${c}`);
      return;
    }
    const f = n ? `${u} ${n}` : u;
    Ww(l, [f]), ye(e, "launch-game-success", n ? "Jeu lancé — connexion au serveur en cours" : "Jeu lancé avec succès"), setTimeout(() => {
      e.close();
    }, 5e3);
  }
  jt.handle("launch-game", async () => {
    r();
  }), jt.handle("connect-server", async () => {
    const n = `-connect=${ve.servers[0].ip} -port=${ve.servers[0].port}`;
    r(n);
  }), jt.handle("get-news", async () => {
    if (!Fn) return [];
    try {
      return await Fn.getNews();
    } catch (n) {
      return console.error("Erreur récupération actualités:", n), [];
    }
  }), jt.handle("get-critical-news", async () => {
    if (!Fn) return [];
    try {
      return await Fn.getCriticalNews();
    } catch (n) {
      return console.error("Erreur récupération actualités critiques:", n), [];
    }
  }), jt.handle("get-server-info", async () => {
    if (ma)
      try {
        const n = await ma.getPublicServerInfo();
        return {
          playerCount: n.playerCount,
          maxPlayers: n.maxPlayers,
          serverName: n.serverName,
          map: n.map,
          gameMode: n.gameMode,
          ping: n.ping,
          isOnline: n.isOnline,
          fps: 0,
          // Pas disponible via Steam Query
          uptime: "0:00:00",
          // Pas disponible via Steam Query
          playerList: n.playerList
        };
      } catch (n) {
        console.error("Erreur Steam Query:", n);
      }
    return null;
  }), jt.handle("install-tfar", async () => {
    const n = Gt.get("arma3Path");
    if (!n)
      return ye(e, "tfar-install-error", void 0, "Chemin Arma 3 non trouvé"), { ok: !1 };
    try {
      ye(e, "tfar-install-start", "Installation du plugin TFAR...");
      const i = [
        X.join(n, ve.mods.folderName, "task_force_radio")
      ], s = [
        X.join(n, ve.mods.folderName, "task_force_radio")
      ];
      for (const f of s)
        if (await se.pathExists(f)) {
          const p = (await se.readdir(f)).find((y) => y.toLowerCase().endsWith(".ts3_plugin"));
          if (p) {
            const y = X.join(f, p), $ = await bh.openPath(y);
            return $ ? (ye(e, "tfar-install-error", void 0, $), { ok: !1 }) : (ye(e, "tfar-install-success", "TFAR installé via le paquet .ts3_plugin"), { ok: !0 });
          }
        }
      let o = null;
      for (const f of i)
        if (await se.pathExists(f)) {
          o = f;
          break;
        }
      if (!o)
        return ye(e, "tfar-install-error", void 0, "Fichiers TFAR introuvables (teamspeak/plugins)"), { ok: !1 };
      const a = process.env.APPDATA || null;
      if (!a)
        return ye(e, "tfar-install-error", void 0, "Variable APPDATA introuvable"), { ok: !1 };
      const c = X.join(a, "TS3Client", "plugins");
      await se.ensureDir(c);
      const l = (await se.readdir(o)).filter((f) => /\.dll$/i.test(f));
      if (l.length === 0)
        return ye(e, "tfar-install-error", void 0, "Aucun fichier plugin .dll trouvé pour TFAR"), { ok: !1 };
      for (const f of l)
        await se.copy(X.join(o, f), X.join(c, f), { overwrite: !0 });
      return ye(e, "tfar-install-success", "Plugin TFAR installé dans TeamSpeak"), { ok: !0 };
    } catch (i) {
      return console.error("Erreur installation TFAR:", i), ye(
        e,
        "tfar-install-error",
        void 0,
        i instanceof Error ? i.message : "Erreur inconnue"
      ), { ok: !1 };
    }
  }), jt.handle("open-url", async (n, i) => {
    bh.openExternal(i);
  }), jt.on("close-app", () => {
    e.close();
  }), jt.on("minimize-app", () => {
    e.minimize();
  });
}
async function Hy(e) {
  const t = Gt.get("arma3Path");
  if (!t) return !1;
  const r = `${t}\\${ve.mods.folderName}`, n = `${r}\\addons`;
  try {
    await se.ensureDir(n);
    const i = new B_(ve.mods.manifestUrl, r), s = await i.calculateDelta(n);
    if (s.toDelete.length > 0) {
      console.log(`🗑️ Suppression de ${s.toDelete.length} fichier(s) orphelin(s)...`), ye(e, "cleanup-start", `Nettoyage de ${s.toDelete.length} fichier(s) obsolète(s)...`);
      let c = 0;
      for (const u of s.toDelete) {
        const l = X.join(n, u);
        try {
          await se.pathExists(l) && (await se.remove(l), c++, console.log(`   ✅ Supprimé: ${u}`));
        } catch (f) {
          console.error(`   ❌ Erreur suppression ${u}:`, f);
        }
      }
      c > 0 && ye(e, "cleanup-complete", `${c} fichier(s) supprimé(s) avec succès`);
    }
    const o = await i.fetchServerManifest();
    if ((!o || o.files.length === 0) && s.toDownload.length === 0) {
      const c = X.join(r, "manifest.json");
      return await se.pathExists(c) && await se.remove(c), ye(e, "mods-check-complete", "Aucun mod requis - synchronisé"), !0;
    }
    if (s.toDownload.length === 0 && s.toDelete.length === 0) {
      if (await i.quickIntegrityCheck(
        n,
        ve.performance.quickCheckSampleSize
      ))
        return ye(e, "mods-check-complete", "Mods à jour"), !0;
      console.log("⚠️ Quick check failed, forcing re-sync - will re-download suspicious files");
    }
    if (!ve.maintenance) {
      if (s.toDownload.length > 0) {
        const c = (s.totalDownloadSize / 1024 / 1024 / 1024).toFixed(2);
        ye(
          e,
          "updateMod-needed",
          `${s.toDownload.length} fichier(s) à synchroniser (${c} GB)`
        );
      }
    }
    return !0;
  } catch (i) {
    return console.error("Erreur lors de la vérification des mods:", i), ye(e, "mods-check-error", void 0, "Erreur de vérification"), !1;
  }
}
async function CB(e) {
  console.log("Synchronisation des ressources serveur");
  const t = Gt.get("arma3Path");
  if (!t) return;
  console.log(t);
  const r = ve.mods.urlRessources;
  if (r.trim() !== "") {
    console.log(r);
    try {
      const n = [
        `${r.replace(/\/$/, "")}/index.json`,
        `${r.replace(/\/$/, "")}/list.json`
      ];
      let i = null;
      for (const a of n)
        try {
          const c = await fetch(a);
          if (c.ok) {
            const u = await c.json();
            if (Array.isArray(u)) {
              i = u;
              break;
            }
          }
        } catch {
        }
      if (!i) {
        const a = [
          r.replace(/\/$/, "/"),
          `${r.replace(/\/$/, "")}/addons/`
        ], c = /* @__PURE__ */ new Set(), u = [], l = [];
        for (const p of a)
          try {
            const y = new URL(p), $ = y.toString().endsWith("/") ? y.toString() : `${y.toString()}/`;
            u.push($);
          } catch {
          }
        const f = (() => {
          try {
            return new URL(r).origin;
          } catch {
            return null;
          }
        })(), h = (() => {
          try {
            return new URL(r).pathname;
          } catch {
            return "/";
          }
        })();
        for (; u.length > 0; ) {
          const p = u.shift();
          if (!c.has(p)) {
            c.add(p);
            try {
              const y = await fetch(p);
              if (!y.ok) continue;
              const $ = await y.text(), v = /href\s*=\s*"([^"]+)"/gi;
              let m;
              for (; (m = v.exec($)) !== null; ) {
                const w = m[1];
                if (!w || w === "../") continue;
                let T;
                try {
                  T = new URL(w, p).toString();
                } catch {
                  continue;
                }
                try {
                  const I = new URL(T);
                  if (f && I.origin !== f || !I.pathname.startsWith(h)) continue;
                  if (I.pathname.endsWith("/"))
                    c.has(I.toString()) || u.push(I.toString());
                  else {
                    const F = I.pathname.toLowerCase();
                    (F.endsWith(".dll") || F.endsWith(".ts3_plugin")) && (l.includes(I.toString()) || l.push(I.toString()));
                  }
                } catch {
                }
              }
            } catch {
            }
          }
        }
        if (l.length > 0)
          i = l;
        else
          return;
      }
      const s = X.join(t, ve.mods.folderName), o = X.join(s, "task_force_radio");
      await se.ensureDir(s), await se.ensureDir(o);
      for (const a of i) {
        const c = typeof a == "string" ? a : a == null ? void 0 : a.name, u = typeof a == "object" && a ? a.hash : void 0;
        if (!c || typeof c != "string") continue;
        const l = c.toLowerCase(), f = X.basename(c), h = r.replace(/\/$/, ""), p = c.startsWith("http") ? c : `${h}/${c.replace(/^\//, "")}`;
        let y = null;
        if (l.endsWith(".dll"))
          y = X.join(s, f);
        else if (l.endsWith(".ts3_plugin"))
          y = X.join(o, f);
        else
          continue;
        try {
          await q_(p, y, void 0, u);
        } catch ($) {
          console.warn(`Échec téléchargement ressource: ${c}`, $);
        }
      }
      ye(e, "resources-sync-complete", "Ressources synchronisées");
    } catch (n) {
      console.error("Erreur synchronisation ressources:", n);
    }
  }
}
const H_ = X.dirname(Xw(import.meta.url));
process.env.APP_ROOT = X.join(H_, "..");
const Pu = process.env.VITE_DEV_SERVER_URL, uV = X.join(process.env.APP_ROOT, "dist-electron"), G_ = X.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Pu ? X.join(process.env.APP_ROOT, "public") : G_;
let Le;
or.autoUpdater.autoDownload = !0;
or.autoUpdater.autoInstallOnAppQuit = !0;
or.autoUpdater.on("update-available", () => {
  Le && Le.webContents.send("update-available");
});
or.autoUpdater.on("update-downloaded", () => {
  Le && (Le.webContents.send("update-ready"), setTimeout(() => {
    or.autoUpdater.quitAndInstall(!1, !0);
  }, 5e3));
});
or.autoUpdater.on("error", (e) => {
  Le && Le.webContents.send("update-error", e.message);
});
or.autoUpdater.on("checking-for-update", () => {
  Le && Le.webContents.send("checking-update");
});
or.autoUpdater.on("update-not-available", () => {
  Le && Le.webContents.send("update-not-available");
});
or.autoUpdater.on("download-progress", (e) => {
  Le && Le.webContents.send("update-progress", {
    percent: e.percent,
    transferred: e.transferred,
    total: e.total,
    bytesPerSecond: e.bytesPerSecond
  });
});
const kB = jn.requestSingleInstanceLock();
if (!kB)
  jn.quit();
else {
  let e = function() {
    Le = new Ph({
      icon: X.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
      autoHideMenuBar: !0,
      height: 550,
      width: 900,
      frame: !1,
      maximizable: !1,
      minimizable: !1,
      resizable: !1,
      center: !0,
      webPreferences: {
        preload: X.join(H_, "preload.mjs")
      }
    }), IB(Le), or.autoUpdater.checkForUpdates().catch(console.error), Pu ? (Le.loadURL(Pu), Le.webContents.openDevTools({
      mode: "detach"
    })) : Le.loadFile(X.join(G_, "index.html"));
  };
  jn.on("second-instance", () => {
    Le && (Le.isMinimized() && Le.restore(), Le.focus());
  }), jn.on("window-all-closed", () => {
    process.platform !== "darwin" && (jn.quit(), Le = null);
  }), jn.on("activate", () => {
    Ph.getAllWindows().length === 0 && e();
  }), jn.whenReady().then(() => {
    e();
  });
}
export {
  uV as MAIN_DIST,
  G_ as RENDERER_DIST,
  Pu as VITE_DEV_SERVER_URL
};

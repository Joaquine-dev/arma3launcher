var hv = Object.defineProperty;
var tf = (e) => {
  throw TypeError(e);
};
var pv = (e, t, r) => t in e ? hv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var bt = (e, t, r) => pv(e, typeof t != "symbol" ? t + "" : t, r), rf = (e, t, r) => t.has(e) || tf("Cannot " + r);
var we = (e, t, r) => (rf(e, t, "read from private field"), r ? r.call(e) : t.get(e)), $i = (e, t, r) => t.has(e) ? tf("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), wi = (e, t, r, n) => (rf(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
import tr, { ipcMain as mt, dialog as mv, shell as nf, app as en, BrowserWindow as af } from "electron";
import Lr from "fs";
import yv from "constants";
import fa from "stream";
import Ls from "util";
import np from "assert";
import le from "path";
import da, { spawn as sf } from "child_process";
import ip from "events";
import ha from "crypto";
import ap from "tty";
import xs from "os";
import ti from "url";
import gv from "string_decoder";
import sp from "zlib";
import vv from "http";
import { fileURLToPath as _v } from "node:url";
import W from "node:path";
import De from "node:process";
import { promisify as ze, isDeepStrictEqual as $v } from "node:util";
import se from "node:fs";
import nn from "node:crypto";
import wv from "node:assert";
import Us from "node:os";
import { setTimeout as Ev } from "node:timers/promises";
import Sv from "dgram";
var nt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function js(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Dt = {}, gn = {}, he = {};
he.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, a) => i != null ? n(i) : r(a)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
he.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var dr = yv, bv = process.cwd, os = null, Pv = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return os || (os = bv.call(process)), os;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var of = process.chdir;
  process.chdir = function(e) {
    os = null, of.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, of);
}
var Tv = Av;
function Av(e) {
  dr.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = a(e.chown), e.fchown = a(e.fchown), e.lchown = a(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = s(e.chownSync), e.fchownSync = s(e.fchownSync), e.lchownSync = s(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = o(e.stat), e.fstat = o(e.fstat), e.lstat = o(e.lstat), e.statSync = c(e.statSync), e.fstatSync = c(e.fstatSync), e.lstatSync = c(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(l, u, d) {
    d && process.nextTick(d);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(l, u, d, p) {
    p && process.nextTick(p);
  }, e.lchownSync = function() {
  }), Pv === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(l) {
    function u(d, p, y) {
      var g = Date.now(), _ = 0;
      l(d, p, function v(w) {
        if (w && (w.code === "EACCES" || w.code === "EPERM" || w.code === "EBUSY") && Date.now() - g < 6e4) {
          setTimeout(function() {
            e.stat(p, function(I, R) {
              I && I.code === "ENOENT" ? l(d, p, v) : y(w);
            });
          }, _), _ < 100 && (_ += 10);
          return;
        }
        y && y(w);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, l), u;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(l) {
    function u(d, p, y, g, _, v) {
      var w;
      if (v && typeof v == "function") {
        var I = 0;
        w = function(R, j, J) {
          if (R && R.code === "EAGAIN" && I < 10)
            return I++, l.call(e, d, p, y, g, _, w);
          v.apply(this, arguments);
        };
      }
      return l.call(e, d, p, y, g, _, w);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, l), u;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(l) {
    return function(u, d, p, y, g) {
      for (var _ = 0; ; )
        try {
          return l.call(e, u, d, p, y, g);
        } catch (v) {
          if (v.code === "EAGAIN" && _ < 10) {
            _++;
            continue;
          }
          throw v;
        }
    };
  }(e.readSync);
  function t(l) {
    l.lchmod = function(u, d, p) {
      l.open(
        u,
        dr.O_WRONLY | dr.O_SYMLINK,
        d,
        function(y, g) {
          if (y) {
            p && p(y);
            return;
          }
          l.fchmod(g, d, function(_) {
            l.close(g, function(v) {
              p && p(_ || v);
            });
          });
        }
      );
    }, l.lchmodSync = function(u, d) {
      var p = l.openSync(u, dr.O_WRONLY | dr.O_SYMLINK, d), y = !0, g;
      try {
        g = l.fchmodSync(p, d), y = !1;
      } finally {
        if (y)
          try {
            l.closeSync(p);
          } catch {
          }
        else
          l.closeSync(p);
      }
      return g;
    };
  }
  function r(l) {
    dr.hasOwnProperty("O_SYMLINK") && l.futimes ? (l.lutimes = function(u, d, p, y) {
      l.open(u, dr.O_SYMLINK, function(g, _) {
        if (g) {
          y && y(g);
          return;
        }
        l.futimes(_, d, p, function(v) {
          l.close(_, function(w) {
            y && y(v || w);
          });
        });
      });
    }, l.lutimesSync = function(u, d, p) {
      var y = l.openSync(u, dr.O_SYMLINK), g, _ = !0;
      try {
        g = l.futimesSync(y, d, p), _ = !1;
      } finally {
        if (_)
          try {
            l.closeSync(y);
          } catch {
          }
        else
          l.closeSync(y);
      }
      return g;
    }) : l.futimes && (l.lutimes = function(u, d, p, y) {
      y && process.nextTick(y);
    }, l.lutimesSync = function() {
    });
  }
  function n(l) {
    return l && function(u, d, p) {
      return l.call(e, u, d, function(y) {
        f(y) && (y = null), p && p.apply(this, arguments);
      });
    };
  }
  function i(l) {
    return l && function(u, d) {
      try {
        return l.call(e, u, d);
      } catch (p) {
        if (!f(p)) throw p;
      }
    };
  }
  function a(l) {
    return l && function(u, d, p, y) {
      return l.call(e, u, d, p, function(g) {
        f(g) && (g = null), y && y.apply(this, arguments);
      });
    };
  }
  function s(l) {
    return l && function(u, d, p) {
      try {
        return l.call(e, u, d, p);
      } catch (y) {
        if (!f(y)) throw y;
      }
    };
  }
  function o(l) {
    return l && function(u, d, p) {
      typeof d == "function" && (p = d, d = null);
      function y(g, _) {
        _ && (_.uid < 0 && (_.uid += 4294967296), _.gid < 0 && (_.gid += 4294967296)), p && p.apply(this, arguments);
      }
      return d ? l.call(e, u, d, y) : l.call(e, u, y);
    };
  }
  function c(l) {
    return l && function(u, d) {
      var p = d ? l.call(e, u, d) : l.call(e, u);
      return p && (p.uid < 0 && (p.uid += 4294967296), p.gid < 0 && (p.gid += 4294967296)), p;
    };
  }
  function f(l) {
    if (!l || l.code === "ENOSYS")
      return !0;
    var u = !process.getuid || process.getuid() !== 0;
    return !!(u && (l.code === "EINVAL" || l.code === "EPERM"));
  }
}
var cf = fa.Stream, Iv = Ov;
function Ov(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    cf.call(this);
    var a = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var s = Object.keys(i), o = 0, c = s.length; o < c; o++) {
      var f = s[o];
      this[f] = i[f];
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
        a._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(l, u) {
      if (l) {
        a.emit("error", l), a.readable = !1;
        return;
      }
      a.fd = u, a.emit("open", u), a._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    cf.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var a = Object.keys(i), s = 0, o = a.length; s < o; s++) {
      var c = a[s];
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
var Rv = Nv, Cv = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function Nv(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: Cv(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var Pe = Lr, Dv = Tv, kv = Iv, Fv = Rv, La = Ls, He, vs;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (He = Symbol.for("graceful-fs.queue"), vs = Symbol.for("graceful-fs.previous")) : (He = "___graceful-fs.queue", vs = "___graceful-fs.previous");
function Lv() {
}
function op(e, t) {
  Object.defineProperty(e, He, {
    get: function() {
      return t;
    }
  });
}
var fn = Lv;
La.debuglog ? fn = La.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (fn = function() {
  var e = La.format.apply(La, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!Pe[He]) {
  var xv = nt[He] || [];
  op(Pe, xv), Pe.close = function(e) {
    function t(r, n) {
      return e.call(Pe, r, function(i) {
        i || lf(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, vs, {
      value: e
    }), t;
  }(Pe.close), Pe.closeSync = function(e) {
    function t(r) {
      e.apply(Pe, arguments), lf();
    }
    return Object.defineProperty(t, vs, {
      value: e
    }), t;
  }(Pe.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    fn(Pe[He]), np.equal(Pe[He].length, 0);
  });
}
nt[He] || op(nt, Pe[He]);
var ke = Qc(Fv(Pe));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !Pe.__patched && (ke = Qc(Pe), Pe.__patched = !0);
function Qc(e) {
  Dv(e), e.gracefulify = Qc, e.createReadStream = j, e.createWriteStream = J;
  var t = e.readFile;
  e.readFile = r;
  function r(b, Q, M) {
    return typeof Q == "function" && (M = Q, Q = null), H(b, Q, M);
    function H(Z, F, L, q) {
      return t(Z, F, function(x) {
        x && (x.code === "EMFILE" || x.code === "ENFILE") ? bn([H, [Z, F, L], x, q || Date.now(), Date.now()]) : typeof L == "function" && L.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(b, Q, M, H) {
    return typeof M == "function" && (H = M, M = null), Z(b, Q, M, H);
    function Z(F, L, q, x, G) {
      return n(F, L, q, function(B) {
        B && (B.code === "EMFILE" || B.code === "ENFILE") ? bn([Z, [F, L, q, x], B, G || Date.now(), Date.now()]) : typeof x == "function" && x.apply(this, arguments);
      });
    }
  }
  var a = e.appendFile;
  a && (e.appendFile = s);
  function s(b, Q, M, H) {
    return typeof M == "function" && (H = M, M = null), Z(b, Q, M, H);
    function Z(F, L, q, x, G) {
      return a(F, L, q, function(B) {
        B && (B.code === "EMFILE" || B.code === "ENFILE") ? bn([Z, [F, L, q, x], B, G || Date.now(), Date.now()]) : typeof x == "function" && x.apply(this, arguments);
      });
    }
  }
  var o = e.copyFile;
  o && (e.copyFile = c);
  function c(b, Q, M, H) {
    return typeof M == "function" && (H = M, M = 0), Z(b, Q, M, H);
    function Z(F, L, q, x, G) {
      return o(F, L, q, function(B) {
        B && (B.code === "EMFILE" || B.code === "ENFILE") ? bn([Z, [F, L, q, x], B, G || Date.now(), Date.now()]) : typeof x == "function" && x.apply(this, arguments);
      });
    }
  }
  var f = e.readdir;
  e.readdir = u;
  var l = /^v[0-5]\./;
  function u(b, Q, M) {
    typeof Q == "function" && (M = Q, Q = null);
    var H = l.test(process.version) ? function(L, q, x, G) {
      return f(L, Z(
        L,
        q,
        x,
        G
      ));
    } : function(L, q, x, G) {
      return f(L, q, Z(
        L,
        q,
        x,
        G
      ));
    };
    return H(b, Q, M);
    function Z(F, L, q, x) {
      return function(G, B) {
        G && (G.code === "EMFILE" || G.code === "ENFILE") ? bn([
          H,
          [F, L, q],
          G,
          x || Date.now(),
          Date.now()
        ]) : (B && B.sort && B.sort(), typeof q == "function" && q.call(this, G, B));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var d = kv(e);
    v = d.ReadStream, I = d.WriteStream;
  }
  var p = e.ReadStream;
  p && (v.prototype = Object.create(p.prototype), v.prototype.open = w);
  var y = e.WriteStream;
  y && (I.prototype = Object.create(y.prototype), I.prototype.open = R), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return v;
    },
    set: function(b) {
      v = b;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return I;
    },
    set: function(b) {
      I = b;
    },
    enumerable: !0,
    configurable: !0
  });
  var g = v;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return g;
    },
    set: function(b) {
      g = b;
    },
    enumerable: !0,
    configurable: !0
  });
  var _ = I;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return _;
    },
    set: function(b) {
      _ = b;
    },
    enumerable: !0,
    configurable: !0
  });
  function v(b, Q) {
    return this instanceof v ? (p.apply(this, arguments), this) : v.apply(Object.create(v.prototype), arguments);
  }
  function w() {
    var b = this;
    me(b.path, b.flags, b.mode, function(Q, M) {
      Q ? (b.autoClose && b.destroy(), b.emit("error", Q)) : (b.fd = M, b.emit("open", M), b.read());
    });
  }
  function I(b, Q) {
    return this instanceof I ? (y.apply(this, arguments), this) : I.apply(Object.create(I.prototype), arguments);
  }
  function R() {
    var b = this;
    me(b.path, b.flags, b.mode, function(Q, M) {
      Q ? (b.destroy(), b.emit("error", Q)) : (b.fd = M, b.emit("open", M));
    });
  }
  function j(b, Q) {
    return new e.ReadStream(b, Q);
  }
  function J(b, Q) {
    return new e.WriteStream(b, Q);
  }
  var Y = e.open;
  e.open = me;
  function me(b, Q, M, H) {
    return typeof M == "function" && (H = M, M = null), Z(b, Q, M, H);
    function Z(F, L, q, x, G) {
      return Y(F, L, q, function(B, k) {
        B && (B.code === "EMFILE" || B.code === "ENFILE") ? bn([Z, [F, L, q, x], B, G || Date.now(), Date.now()]) : typeof x == "function" && x.apply(this, arguments);
      });
    }
  }
  return e;
}
function bn(e) {
  fn("ENQUEUE", e[0].name, e[1]), Pe[He].push(e), Zc();
}
var xa;
function lf() {
  for (var e = Date.now(), t = 0; t < Pe[He].length; ++t)
    Pe[He][t].length > 2 && (Pe[He][t][3] = e, Pe[He][t][4] = e);
  Zc();
}
function Zc() {
  if (clearTimeout(xa), xa = void 0, Pe[He].length !== 0) {
    var e = Pe[He].shift(), t = e[0], r = e[1], n = e[2], i = e[3], a = e[4];
    if (i === void 0)
      fn("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      fn("TIMEOUT", t.name, r);
      var s = r.pop();
      typeof s == "function" && s.call(null, n);
    } else {
      var o = Date.now() - a, c = Math.max(a - i, 1), f = Math.min(c * 1.2, 100);
      o >= f ? (fn("RETRY", t.name, r), t.apply(null, r.concat([i]))) : Pe[He].push(e);
    }
    xa === void 0 && (xa = setTimeout(Zc, 0));
  }
}
(function(e) {
  const t = he.fromCallback, r = ke, n = [
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
  }), e.exists = function(i, a) {
    return typeof a == "function" ? r.exists(i, a) : new Promise((s) => r.exists(i, s));
  }, e.read = function(i, a, s, o, c, f) {
    return typeof f == "function" ? r.read(i, a, s, o, c, f) : new Promise((l, u) => {
      r.read(i, a, s, o, c, (d, p, y) => {
        if (d) return u(d);
        l({ bytesRead: p, buffer: y });
      });
    });
  }, e.write = function(i, a, ...s) {
    return typeof s[s.length - 1] == "function" ? r.write(i, a, ...s) : new Promise((o, c) => {
      r.write(i, a, ...s, (f, l, u) => {
        if (f) return c(f);
        o({ bytesWritten: l, buffer: u });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, a, ...s) {
    return typeof s[s.length - 1] == "function" ? r.writev(i, a, ...s) : new Promise((o, c) => {
      r.writev(i, a, ...s, (f, l, u) => {
        if (f) return c(f);
        o({ bytesWritten: l, buffers: u });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(gn);
var el = {}, cp = {};
const Uv = le;
cp.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(Uv.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const lp = gn, { checkPath: up } = cp, fp = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
el.makeDir = async (e, t) => (up(e), lp.mkdir(e, {
  mode: fp(t),
  recursive: !0
}));
el.makeDirSync = (e, t) => (up(e), lp.mkdirSync(e, {
  mode: fp(t),
  recursive: !0
}));
const jv = he.fromPromise, { makeDir: Mv, makeDirSync: Co } = el, No = jv(Mv);
var Ht = {
  mkdirs: No,
  mkdirsSync: Co,
  // alias
  mkdirp: No,
  mkdirpSync: Co,
  ensureDir: No,
  ensureDirSync: Co
};
const Bv = he.fromPromise, dp = gn;
function qv(e) {
  return dp.access(e).then(() => !0).catch(() => !1);
}
var vn = {
  pathExists: Bv(qv),
  pathExistsSync: dp.existsSync
};
const Gn = ke;
function Hv(e, t, r, n) {
  Gn.open(e, "r+", (i, a) => {
    if (i) return n(i);
    Gn.futimes(a, t, r, (s) => {
      Gn.close(a, (o) => {
        n && n(s || o);
      });
    });
  });
}
function Gv(e, t, r) {
  const n = Gn.openSync(e, "r+");
  return Gn.futimesSync(n, t, r), Gn.closeSync(n);
}
var hp = {
  utimesMillis: Hv,
  utimesMillisSync: Gv
};
const Yn = gn, xe = le, Vv = Ls;
function zv(e, t, r) {
  const n = r.dereference ? (i) => Yn.stat(i, { bigint: !0 }) : (i) => Yn.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, a]) => ({ srcStat: i, destStat: a }));
}
function Wv(e, t, r) {
  let n;
  const i = r.dereference ? (s) => Yn.statSync(s, { bigint: !0 }) : (s) => Yn.lstatSync(s, { bigint: !0 }), a = i(e);
  try {
    n = i(t);
  } catch (s) {
    if (s.code === "ENOENT") return { srcStat: a, destStat: null };
    throw s;
  }
  return { srcStat: a, destStat: n };
}
function Kv(e, t, r, n, i) {
  Vv.callbackify(zv)(e, t, n, (a, s) => {
    if (a) return i(a);
    const { srcStat: o, destStat: c } = s;
    if (c) {
      if (pa(o, c)) {
        const f = xe.basename(e), l = xe.basename(t);
        return r === "move" && f !== l && f.toLowerCase() === l.toLowerCase() ? i(null, { srcStat: o, destStat: c, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (o.isDirectory() && !c.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!o.isDirectory() && c.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return o.isDirectory() && tl(e, t) ? i(new Error(Ms(e, t, r))) : i(null, { srcStat: o, destStat: c });
  });
}
function Yv(e, t, r, n) {
  const { srcStat: i, destStat: a } = Wv(e, t, n);
  if (a) {
    if (pa(i, a)) {
      const s = xe.basename(e), o = xe.basename(t);
      if (r === "move" && s !== o && s.toLowerCase() === o.toLowerCase())
        return { srcStat: i, destStat: a, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !a.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && a.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && tl(e, t))
    throw new Error(Ms(e, t, r));
  return { srcStat: i, destStat: a };
}
function pp(e, t, r, n, i) {
  const a = xe.resolve(xe.dirname(e)), s = xe.resolve(xe.dirname(r));
  if (s === a || s === xe.parse(s).root) return i();
  Yn.stat(s, { bigint: !0 }, (o, c) => o ? o.code === "ENOENT" ? i() : i(o) : pa(t, c) ? i(new Error(Ms(e, r, n))) : pp(e, t, s, n, i));
}
function mp(e, t, r, n) {
  const i = xe.resolve(xe.dirname(e)), a = xe.resolve(xe.dirname(r));
  if (a === i || a === xe.parse(a).root) return;
  let s;
  try {
    s = Yn.statSync(a, { bigint: !0 });
  } catch (o) {
    if (o.code === "ENOENT") return;
    throw o;
  }
  if (pa(t, s))
    throw new Error(Ms(e, r, n));
  return mp(e, t, a, n);
}
function pa(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function tl(e, t) {
  const r = xe.resolve(e).split(xe.sep).filter((i) => i), n = xe.resolve(t).split(xe.sep).filter((i) => i);
  return r.reduce((i, a, s) => i && n[s] === a, !0);
}
function Ms(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var ri = {
  checkPaths: Kv,
  checkPathsSync: Yv,
  checkParentPaths: pp,
  checkParentPathsSync: mp,
  isSrcSubdir: tl,
  areIdentical: pa
};
const dt = ke, Gi = le, Xv = Ht.mkdirs, Jv = vn.pathExists, Qv = hp.utimesMillis, Vi = ri;
function Zv(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), Vi.checkPaths(e, t, "copy", r, (i, a) => {
    if (i) return n(i);
    const { srcStat: s, destStat: o } = a;
    Vi.checkParentPaths(e, s, t, "copy", (c) => c ? n(c) : r.filter ? yp(uf, o, e, t, r, n) : uf(o, e, t, r, n));
  });
}
function uf(e, t, r, n, i) {
  const a = Gi.dirname(r);
  Jv(a, (s, o) => {
    if (s) return i(s);
    if (o) return _s(e, t, r, n, i);
    Xv(a, (c) => c ? i(c) : _s(e, t, r, n, i));
  });
}
function yp(e, t, r, n, i, a) {
  Promise.resolve(i.filter(r, n)).then((s) => s ? e(t, r, n, i, a) : a(), (s) => a(s));
}
function e_(e, t, r, n, i) {
  return n.filter ? yp(_s, e, t, r, n, i) : _s(e, t, r, n, i);
}
function _s(e, t, r, n, i) {
  (n.dereference ? dt.stat : dt.lstat)(t, (s, o) => s ? i(s) : o.isDirectory() ? o_(o, e, t, r, n, i) : o.isFile() || o.isCharacterDevice() || o.isBlockDevice() ? t_(o, e, t, r, n, i) : o.isSymbolicLink() ? u_(e, t, r, n, i) : o.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : o.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function t_(e, t, r, n, i, a) {
  return t ? r_(e, r, n, i, a) : gp(e, r, n, i, a);
}
function r_(e, t, r, n, i) {
  if (n.overwrite)
    dt.unlink(r, (a) => a ? i(a) : gp(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function gp(e, t, r, n, i) {
  dt.copyFile(t, r, (a) => a ? i(a) : n.preserveTimestamps ? n_(e.mode, t, r, i) : Bs(r, e.mode, i));
}
function n_(e, t, r, n) {
  return i_(e) ? a_(r, e, (i) => i ? n(i) : ff(e, t, r, n)) : ff(e, t, r, n);
}
function i_(e) {
  return (e & 128) === 0;
}
function a_(e, t, r) {
  return Bs(e, t | 128, r);
}
function ff(e, t, r, n) {
  s_(t, r, (i) => i ? n(i) : Bs(r, e, n));
}
function Bs(e, t, r) {
  return dt.chmod(e, t, r);
}
function s_(e, t, r) {
  dt.stat(e, (n, i) => n ? r(n) : Qv(t, i.atime, i.mtime, r));
}
function o_(e, t, r, n, i, a) {
  return t ? vp(r, n, i, a) : c_(e.mode, r, n, i, a);
}
function c_(e, t, r, n, i) {
  dt.mkdir(r, (a) => {
    if (a) return i(a);
    vp(t, r, n, (s) => s ? i(s) : Bs(r, e, i));
  });
}
function vp(e, t, r, n) {
  dt.readdir(e, (i, a) => i ? n(i) : _p(a, e, t, r, n));
}
function _p(e, t, r, n, i) {
  const a = e.pop();
  return a ? l_(e, a, t, r, n, i) : i();
}
function l_(e, t, r, n, i, a) {
  const s = Gi.join(r, t), o = Gi.join(n, t);
  Vi.checkPaths(s, o, "copy", i, (c, f) => {
    if (c) return a(c);
    const { destStat: l } = f;
    e_(l, s, o, i, (u) => u ? a(u) : _p(e, r, n, i, a));
  });
}
function u_(e, t, r, n, i) {
  dt.readlink(t, (a, s) => {
    if (a) return i(a);
    if (n.dereference && (s = Gi.resolve(process.cwd(), s)), e)
      dt.readlink(r, (o, c) => o ? o.code === "EINVAL" || o.code === "UNKNOWN" ? dt.symlink(s, r, i) : i(o) : (n.dereference && (c = Gi.resolve(process.cwd(), c)), Vi.isSrcSubdir(s, c) ? i(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${c}'.`)) : e.isDirectory() && Vi.isSrcSubdir(c, s) ? i(new Error(`Cannot overwrite '${c}' with '${s}'.`)) : f_(s, r, i)));
    else
      return dt.symlink(s, r, i);
  });
}
function f_(e, t, r) {
  dt.unlink(t, (n) => n ? r(n) : dt.symlink(e, t, r));
}
var d_ = Zv;
const Je = ke, zi = le, h_ = Ht.mkdirsSync, p_ = hp.utimesMillisSync, Wi = ri;
function m_(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = Wi.checkPathsSync(e, t, "copy", r);
  return Wi.checkParentPathsSync(e, n, t, "copy"), y_(i, e, t, r);
}
function y_(e, t, r, n) {
  if (n.filter && !n.filter(t, r)) return;
  const i = zi.dirname(r);
  return Je.existsSync(i) || h_(i), $p(e, t, r, n);
}
function g_(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return $p(e, t, r, n);
}
function $p(e, t, r, n) {
  const a = (n.dereference ? Je.statSync : Je.lstatSync)(t);
  if (a.isDirectory()) return b_(a, e, t, r, n);
  if (a.isFile() || a.isCharacterDevice() || a.isBlockDevice()) return v_(a, e, t, r, n);
  if (a.isSymbolicLink()) return A_(e, t, r, n);
  throw a.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : a.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function v_(e, t, r, n, i) {
  return t ? __(e, r, n, i) : wp(e, r, n, i);
}
function __(e, t, r, n) {
  if (n.overwrite)
    return Je.unlinkSync(r), wp(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function wp(e, t, r, n) {
  return Je.copyFileSync(t, r), n.preserveTimestamps && $_(e.mode, t, r), rl(r, e.mode);
}
function $_(e, t, r) {
  return w_(e) && E_(r, e), S_(t, r);
}
function w_(e) {
  return (e & 128) === 0;
}
function E_(e, t) {
  return rl(e, t | 128);
}
function rl(e, t) {
  return Je.chmodSync(e, t);
}
function S_(e, t) {
  const r = Je.statSync(e);
  return p_(t, r.atime, r.mtime);
}
function b_(e, t, r, n, i) {
  return t ? Ep(r, n, i) : P_(e.mode, r, n, i);
}
function P_(e, t, r, n) {
  return Je.mkdirSync(r), Ep(t, r, n), rl(r, e);
}
function Ep(e, t, r) {
  Je.readdirSync(e).forEach((n) => T_(n, e, t, r));
}
function T_(e, t, r, n) {
  const i = zi.join(t, e), a = zi.join(r, e), { destStat: s } = Wi.checkPathsSync(i, a, "copy", n);
  return g_(s, i, a, n);
}
function A_(e, t, r, n) {
  let i = Je.readlinkSync(t);
  if (n.dereference && (i = zi.resolve(process.cwd(), i)), e) {
    let a;
    try {
      a = Je.readlinkSync(r);
    } catch (s) {
      if (s.code === "EINVAL" || s.code === "UNKNOWN") return Je.symlinkSync(i, r);
      throw s;
    }
    if (n.dereference && (a = zi.resolve(process.cwd(), a)), Wi.isSrcSubdir(i, a))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${a}'.`);
    if (Je.statSync(r).isDirectory() && Wi.isSrcSubdir(a, i))
      throw new Error(`Cannot overwrite '${a}' with '${i}'.`);
    return I_(i, r);
  } else
    return Je.symlinkSync(i, r);
}
function I_(e, t) {
  return Je.unlinkSync(t), Je.symlinkSync(e, t);
}
var O_ = m_;
const R_ = he.fromCallback;
var nl = {
  copy: R_(d_),
  copySync: O_
};
const df = ke, Sp = le, ge = np, Ki = process.platform === "win32";
function bp(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((r) => {
    e[r] = e[r] || df[r], r = r + "Sync", e[r] = e[r] || df[r];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function il(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), ge(e, "rimraf: missing path"), ge.strictEqual(typeof e, "string", "rimraf: path should be a string"), ge.strictEqual(typeof r, "function", "rimraf: callback function required"), ge(t, "rimraf: invalid options argument provided"), ge.strictEqual(typeof t, "object", "rimraf: options should be object"), bp(t), hf(e, t, function i(a) {
    if (a) {
      if ((a.code === "EBUSY" || a.code === "ENOTEMPTY" || a.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const s = n * 100;
        return setTimeout(() => hf(e, t, i), s);
      }
      a.code === "ENOENT" && (a = null);
    }
    r(a);
  });
}
function hf(e, t, r) {
  ge(e), ge(t), ge(typeof r == "function"), t.lstat(e, (n, i) => {
    if (n && n.code === "ENOENT")
      return r(null);
    if (n && n.code === "EPERM" && Ki)
      return pf(e, t, n, r);
    if (i && i.isDirectory())
      return cs(e, t, n, r);
    t.unlink(e, (a) => {
      if (a) {
        if (a.code === "ENOENT")
          return r(null);
        if (a.code === "EPERM")
          return Ki ? pf(e, t, a, r) : cs(e, t, a, r);
        if (a.code === "EISDIR")
          return cs(e, t, a, r);
      }
      return r(a);
    });
  });
}
function pf(e, t, r, n) {
  ge(e), ge(t), ge(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (a, s) => {
      a ? n(a.code === "ENOENT" ? null : r) : s.isDirectory() ? cs(e, t, r, n) : t.unlink(e, n);
    });
  });
}
function mf(e, t, r) {
  let n;
  ge(e), ge(t);
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
  n.isDirectory() ? ls(e, t, r) : t.unlinkSync(e);
}
function cs(e, t, r, n) {
  ge(e), ge(t), ge(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? C_(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function C_(e, t, r) {
  ge(e), ge(t), ge(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let a = i.length, s;
    if (a === 0) return t.rmdir(e, r);
    i.forEach((o) => {
      il(Sp.join(e, o), t, (c) => {
        if (!s) {
          if (c) return r(s = c);
          --a === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function Pp(e, t) {
  let r;
  t = t || {}, bp(t), ge(e, "rimraf: missing path"), ge.strictEqual(typeof e, "string", "rimraf: path should be a string"), ge(t, "rimraf: missing options"), ge.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && Ki && mf(e, t, n);
  }
  try {
    r && r.isDirectory() ? ls(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return Ki ? mf(e, t, n) : ls(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    ls(e, t, n);
  }
}
function ls(e, t, r) {
  ge(e), ge(t);
  try {
    t.rmdirSync(e);
  } catch (n) {
    if (n.code === "ENOTDIR")
      throw r;
    if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM")
      N_(e, t);
    else if (n.code !== "ENOENT")
      throw n;
  }
}
function N_(e, t) {
  if (ge(e), ge(t), t.readdirSync(e).forEach((r) => Pp(Sp.join(e, r), t)), Ki) {
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
var D_ = il;
il.sync = Pp;
const $s = ke, k_ = he.fromCallback, Tp = D_;
function F_(e, t) {
  if ($s.rm) return $s.rm(e, { recursive: !0, force: !0 }, t);
  Tp(e, t);
}
function L_(e) {
  if ($s.rmSync) return $s.rmSync(e, { recursive: !0, force: !0 });
  Tp.sync(e);
}
var qs = {
  remove: k_(F_),
  removeSync: L_
};
const x_ = he.fromPromise, Ap = gn, Ip = le, Op = Ht, Rp = qs, yf = x_(async function(t) {
  let r;
  try {
    r = await Ap.readdir(t);
  } catch {
    return Op.mkdirs(t);
  }
  return Promise.all(r.map((n) => Rp.remove(Ip.join(t, n))));
});
function gf(e) {
  let t;
  try {
    t = Ap.readdirSync(e);
  } catch {
    return Op.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = Ip.join(e, r), Rp.removeSync(r);
  });
}
var U_ = {
  emptyDirSync: gf,
  emptydirSync: gf,
  emptyDir: yf,
  emptydir: yf
};
const j_ = he.fromCallback, Cp = le, br = ke, Np = Ht;
function M_(e, t) {
  function r() {
    br.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  br.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const a = Cp.dirname(e);
    br.stat(a, (s, o) => {
      if (s)
        return s.code === "ENOENT" ? Np.mkdirs(a, (c) => {
          if (c) return t(c);
          r();
        }) : t(s);
      o.isDirectory() ? r() : br.readdir(a, (c) => {
        if (c) return t(c);
      });
    });
  });
}
function B_(e) {
  let t;
  try {
    t = br.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = Cp.dirname(e);
  try {
    br.statSync(r).isDirectory() || br.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") Np.mkdirsSync(r);
    else throw n;
  }
  br.writeFileSync(e, "");
}
var q_ = {
  createFile: j_(M_),
  createFileSync: B_
};
const H_ = he.fromCallback, Dp = le, $r = ke, kp = Ht, G_ = vn.pathExists, { areIdentical: Fp } = ri;
function V_(e, t, r) {
  function n(i, a) {
    $r.link(i, a, (s) => {
      if (s) return r(s);
      r(null);
    });
  }
  $r.lstat(t, (i, a) => {
    $r.lstat(e, (s, o) => {
      if (s)
        return s.message = s.message.replace("lstat", "ensureLink"), r(s);
      if (a && Fp(o, a)) return r(null);
      const c = Dp.dirname(t);
      G_(c, (f, l) => {
        if (f) return r(f);
        if (l) return n(e, t);
        kp.mkdirs(c, (u) => {
          if (u) return r(u);
          n(e, t);
        });
      });
    });
  });
}
function z_(e, t) {
  let r;
  try {
    r = $r.lstatSync(t);
  } catch {
  }
  try {
    const a = $r.lstatSync(e);
    if (r && Fp(a, r)) return;
  } catch (a) {
    throw a.message = a.message.replace("lstat", "ensureLink"), a;
  }
  const n = Dp.dirname(t);
  return $r.existsSync(n) || kp.mkdirsSync(n), $r.linkSync(e, t);
}
var W_ = {
  createLink: H_(V_),
  createLinkSync: z_
};
const Pr = le, ki = ke, K_ = vn.pathExists;
function Y_(e, t, r) {
  if (Pr.isAbsolute(e))
    return ki.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = Pr.dirname(t), i = Pr.join(n, e);
    return K_(i, (a, s) => a ? r(a) : s ? r(null, {
      toCwd: i,
      toDst: e
    }) : ki.lstat(e, (o) => o ? (o.message = o.message.replace("lstat", "ensureSymlink"), r(o)) : r(null, {
      toCwd: e,
      toDst: Pr.relative(n, e)
    })));
  }
}
function X_(e, t) {
  let r;
  if (Pr.isAbsolute(e)) {
    if (r = ki.existsSync(e), !r) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const n = Pr.dirname(t), i = Pr.join(n, e);
    if (r = ki.existsSync(i), r)
      return {
        toCwd: i,
        toDst: e
      };
    if (r = ki.existsSync(e), !r) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: Pr.relative(n, e)
    };
  }
}
var J_ = {
  symlinkPaths: Y_,
  symlinkPathsSync: X_
};
const Lp = ke;
function Q_(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  Lp.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function Z_(e, t) {
  let r;
  if (t) return t;
  try {
    r = Lp.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var e$ = {
  symlinkType: Q_,
  symlinkTypeSync: Z_
};
const t$ = he.fromCallback, xp = le, Ct = gn, Up = Ht, r$ = Up.mkdirs, n$ = Up.mkdirsSync, jp = J_, i$ = jp.symlinkPaths, a$ = jp.symlinkPathsSync, Mp = e$, s$ = Mp.symlinkType, o$ = Mp.symlinkTypeSync, c$ = vn.pathExists, { areIdentical: Bp } = ri;
function l$(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, Ct.lstat(t, (i, a) => {
    !i && a.isSymbolicLink() ? Promise.all([
      Ct.stat(e),
      Ct.stat(t)
    ]).then(([s, o]) => {
      if (Bp(s, o)) return n(null);
      vf(e, t, r, n);
    }) : vf(e, t, r, n);
  });
}
function vf(e, t, r, n) {
  i$(e, t, (i, a) => {
    if (i) return n(i);
    e = a.toDst, s$(a.toCwd, r, (s, o) => {
      if (s) return n(s);
      const c = xp.dirname(t);
      c$(c, (f, l) => {
        if (f) return n(f);
        if (l) return Ct.symlink(e, t, o, n);
        r$(c, (u) => {
          if (u) return n(u);
          Ct.symlink(e, t, o, n);
        });
      });
    });
  });
}
function u$(e, t, r) {
  let n;
  try {
    n = Ct.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const o = Ct.statSync(e), c = Ct.statSync(t);
    if (Bp(o, c)) return;
  }
  const i = a$(e, t);
  e = i.toDst, r = o$(i.toCwd, r);
  const a = xp.dirname(t);
  return Ct.existsSync(a) || n$(a), Ct.symlinkSync(e, t, r);
}
var f$ = {
  createSymlink: t$(l$),
  createSymlinkSync: u$
};
const { createFile: _f, createFileSync: $f } = q_, { createLink: wf, createLinkSync: Ef } = W_, { createSymlink: Sf, createSymlinkSync: bf } = f$;
var d$ = {
  // file
  createFile: _f,
  createFileSync: $f,
  ensureFile: _f,
  ensureFileSync: $f,
  // link
  createLink: wf,
  createLinkSync: Ef,
  ensureLink: wf,
  ensureLinkSync: Ef,
  // symlink
  createSymlink: Sf,
  createSymlinkSync: bf,
  ensureSymlink: Sf,
  ensureSymlinkSync: bf
};
function h$(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const a = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + a;
}
function p$(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var ma = { stringify: h$, stripBom: p$ };
let Xn;
try {
  Xn = ke;
} catch {
  Xn = Lr;
}
const Hs = he, { stringify: qp, stripBom: Hp } = ma;
async function m$(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Xn, n = "throws" in t ? t.throws : !0;
  let i = await Hs.fromCallback(r.readFile)(e, t);
  i = Hp(i);
  let a;
  try {
    a = JSON.parse(i, t ? t.reviver : null);
  } catch (s) {
    if (n)
      throw s.message = `${e}: ${s.message}`, s;
    return null;
  }
  return a;
}
const y$ = Hs.fromPromise(m$);
function g$(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Xn, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = Hp(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function v$(e, t, r = {}) {
  const n = r.fs || Xn, i = qp(t, r);
  await Hs.fromCallback(n.writeFile)(e, i, r);
}
const _$ = Hs.fromPromise(v$);
function $$(e, t, r = {}) {
  const n = r.fs || Xn, i = qp(t, r);
  return n.writeFileSync(e, i, r);
}
var Gp = {
  readFile: y$,
  readFileSync: g$,
  writeFile: _$,
  writeFileSync: $$
};
const Ua = Gp;
var w$ = {
  // jsonfile exports
  readJson: Ua.readFile,
  readJsonSync: Ua.readFileSync,
  writeJson: Ua.writeFile,
  writeJsonSync: Ua.writeFileSync
};
const E$ = he.fromCallback, Fi = ke, Vp = le, zp = Ht, S$ = vn.pathExists;
function b$(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = Vp.dirname(e);
  S$(i, (a, s) => {
    if (a) return n(a);
    if (s) return Fi.writeFile(e, t, r, n);
    zp.mkdirs(i, (o) => {
      if (o) return n(o);
      Fi.writeFile(e, t, r, n);
    });
  });
}
function P$(e, ...t) {
  const r = Vp.dirname(e);
  if (Fi.existsSync(r))
    return Fi.writeFileSync(e, ...t);
  zp.mkdirsSync(r), Fi.writeFileSync(e, ...t);
}
var al = {
  outputFile: E$(b$),
  outputFileSync: P$
};
const { stringify: T$ } = ma, { outputFile: A$ } = al;
async function I$(e, t, r = {}) {
  const n = T$(t, r);
  await A$(e, n, r);
}
var O$ = I$;
const { stringify: R$ } = ma, { outputFileSync: C$ } = al;
function N$(e, t, r) {
  const n = R$(t, r);
  C$(e, n, r);
}
var D$ = N$;
const k$ = he.fromPromise, st = w$;
st.outputJson = k$(O$);
st.outputJsonSync = D$;
st.outputJSON = st.outputJson;
st.outputJSONSync = st.outputJsonSync;
st.writeJSON = st.writeJson;
st.writeJSONSync = st.writeJsonSync;
st.readJSON = st.readJson;
st.readJSONSync = st.readJsonSync;
var F$ = st;
const L$ = ke, Ec = le, x$ = nl.copy, Wp = qs.remove, U$ = Ht.mkdirp, j$ = vn.pathExists, Pf = ri;
function M$(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  Pf.checkPaths(e, t, "move", r, (a, s) => {
    if (a) return n(a);
    const { srcStat: o, isChangingCase: c = !1 } = s;
    Pf.checkParentPaths(e, o, t, "move", (f) => {
      if (f) return n(f);
      if (B$(t)) return Tf(e, t, i, c, n);
      U$(Ec.dirname(t), (l) => l ? n(l) : Tf(e, t, i, c, n));
    });
  });
}
function B$(e) {
  const t = Ec.dirname(e);
  return Ec.parse(t).root === t;
}
function Tf(e, t, r, n, i) {
  if (n) return Do(e, t, r, i);
  if (r)
    return Wp(t, (a) => a ? i(a) : Do(e, t, r, i));
  j$(t, (a, s) => a ? i(a) : s ? i(new Error("dest already exists.")) : Do(e, t, r, i));
}
function Do(e, t, r, n) {
  L$.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : q$(e, t, r, n) : n());
}
function q$(e, t, r, n) {
  x$(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (a) => a ? n(a) : Wp(e, n));
}
var H$ = M$;
const Kp = ke, Sc = le, G$ = nl.copySync, Yp = qs.removeSync, V$ = Ht.mkdirpSync, Af = ri;
function z$(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: a = !1 } = Af.checkPathsSync(e, t, "move", r);
  return Af.checkParentPathsSync(e, i, t, "move"), W$(t) || V$(Sc.dirname(t)), K$(e, t, n, a);
}
function W$(e) {
  const t = Sc.dirname(e);
  return Sc.parse(t).root === t;
}
function K$(e, t, r, n) {
  if (n) return ko(e, t, r);
  if (r)
    return Yp(t), ko(e, t, r);
  if (Kp.existsSync(t)) throw new Error("dest already exists.");
  return ko(e, t, r);
}
function ko(e, t, r) {
  try {
    Kp.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return Y$(e, t, r);
  }
}
function Y$(e, t, r) {
  return G$(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), Yp(e);
}
var X$ = z$;
const J$ = he.fromCallback;
var Q$ = {
  move: J$(H$),
  moveSync: X$
}, xr = {
  // Export promiseified graceful-fs:
  ...gn,
  // Export extra methods:
  ...nl,
  ...U_,
  ...d$,
  ...F$,
  ...Ht,
  ...Q$,
  ...al,
  ...vn,
  ...qs
}, ar = {}, Cr = {}, je = {}, Nr = {};
Object.defineProperty(Nr, "__esModule", { value: !0 });
Nr.CancellationError = Nr.CancellationToken = void 0;
const Z$ = ip;
class ew extends Z$.EventEmitter {
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
      return Promise.reject(new bc());
    const r = () => {
      if (n != null)
        try {
          this.removeListener("cancel", n), n = null;
        } catch {
        }
    };
    let n = null;
    return new Promise((i, a) => {
      let s = null;
      if (n = () => {
        try {
          s != null && (s(), s = null);
        } finally {
          a(new bc());
        }
      }, this.cancelled) {
        n();
        return;
      }
      this.onCancel(n), t(i, a, (o) => {
        s = o;
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
Nr.CancellationToken = ew;
class bc extends Error {
  constructor() {
    super("cancelled");
  }
}
Nr.CancellationError = bc;
var ni = {};
Object.defineProperty(ni, "__esModule", { value: !0 });
ni.newError = tw;
function tw(e, t) {
  const r = new Error(e);
  return r.code = t, r;
}
var at = {}, Pc = { exports: {} }, ja = { exports: {} }, Fo, If;
function rw() {
  if (If) return Fo;
  If = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, a = n * 365.25;
  Fo = function(l, u) {
    u = u || {};
    var d = typeof l;
    if (d === "string" && l.length > 0)
      return s(l);
    if (d === "number" && isFinite(l))
      return u.long ? c(l) : o(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function s(l) {
    if (l = String(l), !(l.length > 100)) {
      var u = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (u) {
        var d = parseFloat(u[1]), p = (u[2] || "ms").toLowerCase();
        switch (p) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return d * a;
          case "weeks":
          case "week":
          case "w":
            return d * i;
          case "days":
          case "day":
          case "d":
            return d * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return d * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return d * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return d * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return d;
          default:
            return;
        }
      }
    }
  }
  function o(l) {
    var u = Math.abs(l);
    return u >= n ? Math.round(l / n) + "d" : u >= r ? Math.round(l / r) + "h" : u >= t ? Math.round(l / t) + "m" : u >= e ? Math.round(l / e) + "s" : l + "ms";
  }
  function c(l) {
    var u = Math.abs(l);
    return u >= n ? f(l, u, n, "day") : u >= r ? f(l, u, r, "hour") : u >= t ? f(l, u, t, "minute") : u >= e ? f(l, u, e, "second") : l + " ms";
  }
  function f(l, u, d, p) {
    var y = u >= d * 1.5;
    return Math.round(l / d) + " " + p + (y ? "s" : "");
  }
  return Fo;
}
var Lo, Of;
function Xp() {
  if (Of) return Lo;
  Of = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = f, n.disable = o, n.enable = a, n.enabled = c, n.humanize = rw(), n.destroy = l, Object.keys(t).forEach((u) => {
      n[u] = t[u];
    }), n.names = [], n.skips = [], n.formatters = {};
    function r(u) {
      let d = 0;
      for (let p = 0; p < u.length; p++)
        d = (d << 5) - d + u.charCodeAt(p), d |= 0;
      return n.colors[Math.abs(d) % n.colors.length];
    }
    n.selectColor = r;
    function n(u) {
      let d, p = null, y, g;
      function _(...v) {
        if (!_.enabled)
          return;
        const w = _, I = Number(/* @__PURE__ */ new Date()), R = I - (d || I);
        w.diff = R, w.prev = d, w.curr = I, d = I, v[0] = n.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
        let j = 0;
        v[0] = v[0].replace(/%([a-zA-Z%])/g, (Y, me) => {
          if (Y === "%%")
            return "%";
          j++;
          const b = n.formatters[me];
          if (typeof b == "function") {
            const Q = v[j];
            Y = b.call(w, Q), v.splice(j, 1), j--;
          }
          return Y;
        }), n.formatArgs.call(w, v), (w.log || n.log).apply(w, v);
      }
      return _.namespace = u, _.useColors = n.useColors(), _.color = n.selectColor(u), _.extend = i, _.destroy = n.destroy, Object.defineProperty(_, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => p !== null ? p : (y !== n.namespaces && (y = n.namespaces, g = n.enabled(u)), g),
        set: (v) => {
          p = v;
        }
      }), typeof n.init == "function" && n.init(_), _;
    }
    function i(u, d) {
      const p = n(this.namespace + (typeof d > "u" ? ":" : d) + u);
      return p.log = this.log, p;
    }
    function a(u) {
      n.save(u), n.namespaces = u, n.names = [], n.skips = [];
      const d = (typeof u == "string" ? u : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const p of d)
        p[0] === "-" ? n.skips.push(p.slice(1)) : n.names.push(p);
    }
    function s(u, d) {
      let p = 0, y = 0, g = -1, _ = 0;
      for (; p < u.length; )
        if (y < d.length && (d[y] === u[p] || d[y] === "*"))
          d[y] === "*" ? (g = y, _ = p, y++) : (p++, y++);
        else if (g !== -1)
          y = g + 1, _++, p = _;
        else
          return !1;
      for (; y < d.length && d[y] === "*"; )
        y++;
      return y === d.length;
    }
    function o() {
      const u = [
        ...n.names,
        ...n.skips.map((d) => "-" + d)
      ].join(",");
      return n.enable(""), u;
    }
    function c(u) {
      for (const d of n.skips)
        if (s(u, d))
          return !1;
      for (const d of n.names)
        if (s(u, d))
          return !0;
      return !1;
    }
    function f(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function l() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return Lo = e, Lo;
}
var Rf;
function nw() {
  return Rf || (Rf = 1, function(e, t) {
    t.formatArgs = n, t.save = i, t.load = a, t.useColors = r, t.storage = s(), t.destroy = /* @__PURE__ */ (() => {
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
      const f = "color: " + this.color;
      c.splice(1, 0, f, "color: inherit");
      let l = 0, u = 0;
      c[0].replace(/%[a-zA-Z%]/g, (d) => {
        d !== "%%" && (l++, d === "%c" && (u = l));
      }), c.splice(u, 0, f);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(c) {
      try {
        c ? t.storage.setItem("debug", c) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function a() {
      let c;
      try {
        c = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
      } catch {
      }
      return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
    }
    function s() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = Xp()(t);
    const { formatters: o } = e.exports;
    o.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (f) {
        return "[UnexpectedJSONParseError]: " + f.message;
      }
    };
  }(ja, ja.exports)), ja.exports;
}
var Ma = { exports: {} }, xo, Cf;
function iw() {
  return Cf || (Cf = 1, xo = (e, t = process.argv) => {
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 || n < i);
  }), xo;
}
var Uo, Nf;
function aw() {
  if (Nf) return Uo;
  Nf = 1;
  const e = xs, t = ap, r = iw(), { env: n } = process;
  let i;
  r("no-color") || r("no-colors") || r("color=false") || r("color=never") ? i = 0 : (r("color") || r("colors") || r("color=true") || r("color=always")) && (i = 1), "FORCE_COLOR" in n && (n.FORCE_COLOR === "true" ? i = 1 : n.FORCE_COLOR === "false" ? i = 0 : i = n.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(n.FORCE_COLOR, 10), 3));
  function a(c) {
    return c === 0 ? !1 : {
      level: c,
      hasBasic: !0,
      has256: c >= 2,
      has16m: c >= 3
    };
  }
  function s(c, f) {
    if (i === 0)
      return 0;
    if (r("color=16m") || r("color=full") || r("color=truecolor"))
      return 3;
    if (r("color=256"))
      return 2;
    if (c && !f && i === void 0)
      return 0;
    const l = i || 0;
    if (n.TERM === "dumb")
      return l;
    if (process.platform === "win32") {
      const u = e.release().split(".");
      return Number(u[0]) >= 10 && Number(u[2]) >= 10586 ? Number(u[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((u) => u in n) || n.CI_NAME === "codeship" ? 1 : l;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if (n.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in n) {
      const u = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return u >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : l;
  }
  function o(c) {
    const f = s(c, c && c.isTTY);
    return a(f);
  }
  return Uo = {
    supportsColor: o,
    stdout: a(s(!0, t.isatty(1))),
    stderr: a(s(!0, t.isatty(2)))
  }, Uo;
}
var Df;
function sw() {
  return Df || (Df = 1, function(e, t) {
    const r = ap, n = Ls;
    t.init = l, t.log = o, t.formatArgs = a, t.save = c, t.load = f, t.useColors = i, t.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const d = aw();
      d && (d.stderr || d).level >= 2 && (t.colors = [
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
    t.inspectOpts = Object.keys(process.env).filter((d) => /^debug_/i.test(d)).reduce((d, p) => {
      const y = p.substring(6).toLowerCase().replace(/_([a-z])/g, (_, v) => v.toUpperCase());
      let g = process.env[p];
      return /^(yes|on|true|enabled)$/i.test(g) ? g = !0 : /^(no|off|false|disabled)$/i.test(g) ? g = !1 : g === "null" ? g = null : g = Number(g), d[y] = g, d;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : r.isatty(process.stderr.fd);
    }
    function a(d) {
      const { namespace: p, useColors: y } = this;
      if (y) {
        const g = this.color, _ = "\x1B[3" + (g < 8 ? g : "8;5;" + g), v = `  ${_};1m${p} \x1B[0m`;
        d[0] = v + d[0].split(`
`).join(`
` + v), d.push(_ + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        d[0] = s() + p + " " + d[0];
    }
    function s() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function o(...d) {
      return process.stderr.write(n.formatWithOptions(t.inspectOpts, ...d) + `
`);
    }
    function c(d) {
      d ? process.env.DEBUG = d : delete process.env.DEBUG;
    }
    function f() {
      return process.env.DEBUG;
    }
    function l(d) {
      d.inspectOpts = {};
      const p = Object.keys(t.inspectOpts);
      for (let y = 0; y < p.length; y++)
        d.inspectOpts[p[y]] = t.inspectOpts[p[y]];
    }
    e.exports = Xp()(t);
    const { formatters: u } = e.exports;
    u.o = function(d) {
      return this.inspectOpts.colors = this.useColors, n.inspect(d, this.inspectOpts).split(`
`).map((p) => p.trim()).join(" ");
    }, u.O = function(d) {
      return this.inspectOpts.colors = this.useColors, n.inspect(d, this.inspectOpts);
    };
  }(Ma, Ma.exports)), Ma.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Pc.exports = nw() : Pc.exports = sw();
var ow = Pc.exports, ya = {};
Object.defineProperty(ya, "__esModule", { value: !0 });
ya.ProgressCallbackTransform = void 0;
const cw = fa;
class lw extends cw.Transform {
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
ya.ProgressCallbackTransform = lw;
Object.defineProperty(at, "__esModule", { value: !0 });
at.DigestTransform = at.HttpExecutor = at.HttpError = void 0;
at.createHttpError = Tc;
at.parseJson = gw;
at.configureRequestOptionsFromUrl = Qp;
at.configureRequestUrl = ol;
at.safeGetHeader = Vn;
at.configureRequestOptions = Es;
at.safeStringifyJson = Ss;
const uw = ha, fw = ow, dw = Lr, hw = fa, Jp = ti, pw = Nr, kf = ni, mw = ya, Ei = (0, fw.default)("electron-builder");
function Tc(e, t = null) {
  return new sl(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + Ss(e.headers), t);
}
const yw = /* @__PURE__ */ new Map([
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
class sl extends Error {
  constructor(t, r = `HTTP error: ${yw.get(t) || t}`, n = null) {
    super(r), this.statusCode = t, this.description = n, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
at.HttpError = sl;
function gw(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class ws {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, r = new pw.CancellationToken(), n) {
    Es(t);
    const i = n == null ? void 0 : JSON.stringify(n), a = i ? Buffer.from(i) : void 0;
    if (a != null) {
      Ei(i);
      const { headers: s, ...o } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": a.length,
          ...s
        },
        ...o
      };
    }
    return this.doApiRequest(t, r, (s) => s.end(a));
  }
  doApiRequest(t, r, n, i = 0) {
    return Ei.enabled && Ei(`Request: ${Ss(t)}`), r.createPromise((a, s, o) => {
      const c = this.createRequest(t, (f) => {
        try {
          this.handleResponse(f, t, r, a, s, i, n);
        } catch (l) {
          s(l);
        }
      });
      this.addErrorAndTimeoutHandlers(c, s, t.timeout), this.addRedirectHandlers(c, t, s, i, (f) => {
        this.doApiRequest(f, r, n, i).then(a).catch(s);
      }), n(c, s), o(() => c.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, r, n, i, a) {
  }
  addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
    this.addTimeOutHandler(t, r, n), t.on("error", r), t.on("aborted", () => {
      r(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, r, n, i, a, s, o) {
    var c;
    if (Ei.enabled && Ei(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${Ss(r)}`), t.statusCode === 404) {
      a(Tc(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const f = (c = t.statusCode) !== null && c !== void 0 ? c : 0, l = f >= 300 && f < 400, u = Vn(t, "location");
    if (l && u != null) {
      if (s > this.maxRedirects) {
        a(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(ws.prepareRedirectUrlOptions(u, r), n, o, s).then(i).catch(a);
      return;
    }
    t.setEncoding("utf8");
    let d = "";
    t.on("error", a), t.on("data", (p) => d += p), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const p = Vn(t, "content-type"), y = p != null && (Array.isArray(p) ? p.find((g) => g.includes("json")) != null : p.includes("json"));
          a(Tc(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

          Data:
          ${y ? JSON.stringify(JSON.parse(d)) : d}
          `));
        } else
          i(d.length === 0 ? null : d);
      } catch (p) {
        a(p);
      }
    });
  }
  async downloadToBuffer(t, r) {
    return await r.cancellationToken.createPromise((n, i, a) => {
      const s = [], o = {
        headers: r.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      ol(t, o), Es(o), this.doDownload(o, {
        destination: null,
        options: r,
        onCancel: a,
        callback: (c) => {
          c == null ? n(Buffer.concat(s)) : i(c);
        },
        responseHandler: (c, f) => {
          let l = 0;
          c.on("data", (u) => {
            if (l += u.length, l > 524288e3) {
              f(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            s.push(u);
          }), c.on("end", () => {
            f(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, r, n) {
    const i = this.createRequest(t, (a) => {
      if (a.statusCode >= 400) {
        r.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${a.statusCode}: ${a.statusMessage}`));
        return;
      }
      a.on("error", r.callback);
      const s = Vn(a, "location");
      if (s != null) {
        n < this.maxRedirects ? this.doDownload(ws.prepareRedirectUrlOptions(s, t), r, n++) : r.callback(this.createMaxRedirectError());
        return;
      }
      r.responseHandler == null ? _w(r, a) : r.responseHandler(a, r.callback);
    });
    this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout), this.addRedirectHandlers(i, t, r.callback, n, (a) => {
      this.doDownload(a, r, n++);
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
    const n = Qp(t, { ...r }), i = n.headers;
    if (i != null && i.authorization) {
      const a = new Jp.URL(t);
      (a.hostname.endsWith(".amazonaws.com") || a.searchParams.has("X-Amz-Credential")) && delete i.authorization;
    }
    return n;
  }
  static retryOnServerError(t, r = 3) {
    for (let n = 0; ; n++)
      try {
        return t();
      } catch (i) {
        if (n < r && (i instanceof sl && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
at.HttpExecutor = ws;
function Qp(e, t) {
  const r = Es(t);
  return ol(new Jp.URL(e), r), r;
}
function ol(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class Ac extends hw.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, r = "sha512", n = "base64") {
    super(), this.expected = t, this.algorithm = r, this.encoding = n, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, uw.createHash)(r);
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
      throw (0, kf.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, kf.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
at.DigestTransform = Ac;
function vw(e, t, r) {
  return e != null && t != null && e !== t ? (r(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function Vn(e, t) {
  const r = e.headers[t];
  return r == null ? null : Array.isArray(r) ? r.length === 0 ? null : r[r.length - 1] : r;
}
function _w(e, t) {
  if (!vw(Vn(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const r = [];
  if (e.options.onProgress != null) {
    const s = Vn(t, "content-length");
    s != null && r.push(new mw.ProgressCallbackTransform(parseInt(s, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const n = e.options.sha512;
  n != null ? r.push(new Ac(n, "sha512", n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && r.push(new Ac(e.options.sha2, "sha256", "hex"));
  const i = (0, dw.createWriteStream)(e.destination);
  r.push(i);
  let a = t;
  for (const s of r)
    s.on("error", (o) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(o);
    }), a = a.pipe(s);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function Es(e, t, r) {
  r != null && (e.method = r), e.headers = { ...e.headers };
  const n = e.headers;
  return t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"), (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function Ss(e, t) {
  return JSON.stringify(e, (r, n) => r.endsWith("Authorization") || r.endsWith("authorization") || r.endsWith("Password") || r.endsWith("PASSWORD") || r.endsWith("Token") || r.includes("password") || r.includes("token") || t != null && t.has(r) ? "<stripped sensitive data>" : n, 2);
}
var Gs = {};
Object.defineProperty(Gs, "__esModule", { value: !0 });
Gs.MemoLazy = void 0;
class $w {
  constructor(t, r) {
    this.selector = t, this.creator = r, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && Zp(this.selected, t))
      return this._value;
    this.selected = t;
    const r = this.creator(t);
    return this.value = r, r;
  }
  set value(t) {
    this._value = t;
  }
}
Gs.MemoLazy = $w;
function Zp(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), a = Object.keys(t);
    return i.length === a.length && i.every((s) => Zp(e[s], t[s]));
  }
  return e === t;
}
var Vs = {};
Object.defineProperty(Vs, "__esModule", { value: !0 });
Vs.githubUrl = ww;
Vs.getS3LikeProviderBaseUrl = Ew;
function ww(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function Ew(e) {
  const t = e.provider;
  if (t === "s3")
    return Sw(e);
  if (t === "spaces")
    return bw(e);
  throw new Error(`Not supported provider: ${t}`);
}
function Sw(e) {
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
  return em(t, e.path);
}
function em(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function bw(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return em(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var cl = {};
Object.defineProperty(cl, "__esModule", { value: !0 });
cl.retry = tm;
const Pw = Nr;
async function tm(e, t, r, n = 0, i = 0, a) {
  var s;
  const o = new Pw.CancellationToken();
  try {
    return await e();
  } catch (c) {
    if ((!((s = a == null ? void 0 : a(c)) !== null && s !== void 0) || s) && t > 0 && !o.cancelled)
      return await new Promise((f) => setTimeout(f, r + n * i)), await tm(e, t - 1, r, n, i + 1, a);
    throw c;
  }
}
var ll = {};
Object.defineProperty(ll, "__esModule", { value: !0 });
ll.parseDn = Tw;
function Tw(e) {
  let t = !1, r = null, n = "", i = 0;
  e = e.trim();
  const a = /* @__PURE__ */ new Map();
  for (let s = 0; s <= e.length; s++) {
    if (s === e.length) {
      r !== null && a.set(r, n);
      break;
    }
    const o = e[s];
    if (t) {
      if (o === '"') {
        t = !1;
        continue;
      }
    } else {
      if (o === '"') {
        t = !0;
        continue;
      }
      if (o === "\\") {
        s++;
        const c = parseInt(e.slice(s, s + 2), 16);
        Number.isNaN(c) ? n += e[s] : (s++, n += String.fromCharCode(c));
        continue;
      }
      if (r === null && o === "=") {
        r = n, n = "";
        continue;
      }
      if (o === "," || o === ";" || o === "+") {
        r !== null && a.set(r, n), r = null, n = "";
        continue;
      }
    }
    if (o === " " && !t) {
      if (n.length === 0)
        continue;
      if (s > i) {
        let c = s;
        for (; e[c] === " "; )
          c++;
        i = c;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || r === null && e[i] === "=" || r !== null && e[i] === "+") {
        s = i - 1;
        continue;
      }
    }
    n += o;
  }
  return a;
}
var Jn = {};
Object.defineProperty(Jn, "__esModule", { value: !0 });
Jn.nil = Jn.UUID = void 0;
const rm = ha, nm = ni, Aw = "options.name must be either a string or a Buffer", Ff = (0, rm.randomBytes)(16);
Ff[0] = Ff[0] | 1;
const us = {}, fe = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  us[t] = e, fe[e] = t;
}
class hn {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const r = hn.check(t);
    if (!r)
      throw new Error("not a UUID");
    this.version = r.version, r.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, r) {
    return Iw(t, "sha1", 80, r);
  }
  toString() {
    return this.ascii == null && (this.ascii = Ow(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, r = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (us[t[14] + t[15]] & 240) >> 4,
        variant: Lf((us[t[19] + t[20]] & 224) >> 5),
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
        variant: Lf((t[r + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, nm.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const r = Buffer.allocUnsafe(16);
    let n = 0;
    for (let i = 0; i < 16; i++)
      r[i] = us[t[n++] + t[n++]], (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
    return r;
  }
}
Jn.UUID = hn;
hn.OID = hn.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function Lf(e) {
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
var Li;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(Li || (Li = {}));
function Iw(e, t, r, n, i = Li.ASCII) {
  const a = (0, rm.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, nm.newError)(Aw, "ERR_INVALID_UUID_NAME");
  a.update(n), a.update(e);
  const o = a.digest();
  let c;
  switch (i) {
    case Li.BINARY:
      o[6] = o[6] & 15 | r, o[8] = o[8] & 63 | 128, c = o;
      break;
    case Li.OBJECT:
      o[6] = o[6] & 15 | r, o[8] = o[8] & 63 | 128, c = new hn(o);
      break;
    default:
      c = fe[o[0]] + fe[o[1]] + fe[o[2]] + fe[o[3]] + "-" + fe[o[4]] + fe[o[5]] + "-" + fe[o[6] & 15 | r] + fe[o[7]] + "-" + fe[o[8] & 63 | 128] + fe[o[9]] + "-" + fe[o[10]] + fe[o[11]] + fe[o[12]] + fe[o[13]] + fe[o[14]] + fe[o[15]];
      break;
  }
  return c;
}
function Ow(e) {
  return fe[e[0]] + fe[e[1]] + fe[e[2]] + fe[e[3]] + "-" + fe[e[4]] + fe[e[5]] + "-" + fe[e[6]] + fe[e[7]] + "-" + fe[e[8]] + fe[e[9]] + "-" + fe[e[10]] + fe[e[11]] + fe[e[12]] + fe[e[13]] + fe[e[14]] + fe[e[15]];
}
Jn.nil = new hn("00000000-0000-0000-0000-000000000000");
var ga = {}, im = {};
(function(e) {
  (function(t) {
    t.parser = function(m, h) {
      return new n(m, h);
    }, t.SAXParser = n, t.SAXStream = l, t.createStream = f, t.MAX_BUFFER_LENGTH = 64 * 1024;
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
    function n(m, h) {
      if (!(this instanceof n))
        return new n(m, h);
      var N = this;
      a(N), N.q = N.c = "", N.bufferCheckPosition = t.MAX_BUFFER_LENGTH, N.opt = h || {}, N.opt.lowercase = N.opt.lowercase || N.opt.lowercasetags, N.looseCase = N.opt.lowercase ? "toLowerCase" : "toUpperCase", N.tags = [], N.closed = N.closedRoot = N.sawRoot = !1, N.tag = N.error = null, N.strict = !!m, N.noscript = !!(m || N.opt.noscript), N.state = b.BEGIN, N.strictEntities = N.opt.strictEntities, N.ENTITIES = N.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), N.attribList = [], N.opt.xmlns && (N.ns = Object.create(g)), N.opt.unquotedAttributeValues === void 0 && (N.opt.unquotedAttributeValues = !m), N.trackPosition = N.opt.position !== !1, N.trackPosition && (N.position = N.line = N.column = 0), M(N, "onready");
    }
    Object.create || (Object.create = function(m) {
      function h() {
      }
      h.prototype = m;
      var N = new h();
      return N;
    }), Object.keys || (Object.keys = function(m) {
      var h = [];
      for (var N in m) m.hasOwnProperty(N) && h.push(N);
      return h;
    });
    function i(m) {
      for (var h = Math.max(t.MAX_BUFFER_LENGTH, 10), N = 0, P = 0, ee = r.length; P < ee; P++) {
        var pe = m[r[P]].length;
        if (pe > h)
          switch (r[P]) {
            case "textNode":
              Z(m);
              break;
            case "cdata":
              H(m, "oncdata", m.cdata), m.cdata = "";
              break;
            case "script":
              H(m, "onscript", m.script), m.script = "";
              break;
            default:
              L(m, "Max buffer length exceeded: " + r[P]);
          }
        N = Math.max(N, pe);
      }
      var ve = t.MAX_BUFFER_LENGTH - N;
      m.bufferCheckPosition = ve + m.position;
    }
    function a(m) {
      for (var h = 0, N = r.length; h < N; h++)
        m[r[h]] = "";
    }
    function s(m) {
      Z(m), m.cdata !== "" && (H(m, "oncdata", m.cdata), m.cdata = ""), m.script !== "" && (H(m, "onscript", m.script), m.script = "");
    }
    n.prototype = {
      end: function() {
        q(this);
      },
      write: D,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        s(this);
      }
    };
    var o;
    try {
      o = require("stream").Stream;
    } catch {
      o = function() {
      };
    }
    o || (o = function() {
    });
    var c = t.EVENTS.filter(function(m) {
      return m !== "error" && m !== "end";
    });
    function f(m, h) {
      return new l(m, h);
    }
    function l(m, h) {
      if (!(this instanceof l))
        return new l(m, h);
      o.apply(this), this._parser = new n(m, h), this.writable = !0, this.readable = !0;
      var N = this;
      this._parser.onend = function() {
        N.emit("end");
      }, this._parser.onerror = function(P) {
        N.emit("error", P), N._parser.error = null;
      }, this._decoder = null, c.forEach(function(P) {
        Object.defineProperty(N, "on" + P, {
          get: function() {
            return N._parser["on" + P];
          },
          set: function(ee) {
            if (!ee)
              return N.removeAllListeners(P), N._parser["on" + P] = ee, ee;
            N.on(P, ee);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    l.prototype = Object.create(o.prototype, {
      constructor: {
        value: l
      }
    }), l.prototype.write = function(m) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(m)) {
        if (!this._decoder) {
          var h = gv.StringDecoder;
          this._decoder = new h("utf8");
        }
        m = this._decoder.write(m);
      }
      return this._parser.write(m.toString()), this.emit("data", m), !0;
    }, l.prototype.end = function(m) {
      return m && m.length && this.write(m), this._parser.end(), !0;
    }, l.prototype.on = function(m, h) {
      var N = this;
      return !N._parser["on" + m] && c.indexOf(m) !== -1 && (N._parser["on" + m] = function() {
        var P = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        P.splice(0, 0, m), N.emit.apply(N, P);
      }), o.prototype.on.call(N, m, h);
    };
    var u = "[CDATA[", d = "DOCTYPE", p = "http://www.w3.org/XML/1998/namespace", y = "http://www.w3.org/2000/xmlns/", g = { xml: p, xmlns: y }, _ = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, v = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, w = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, I = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function R(m) {
      return m === " " || m === `
` || m === "\r" || m === "	";
    }
    function j(m) {
      return m === '"' || m === "'";
    }
    function J(m) {
      return m === ">" || R(m);
    }
    function Y(m, h) {
      return m.test(h);
    }
    function me(m, h) {
      return !Y(m, h);
    }
    var b = 0;
    t.STATE = {
      BEGIN: b++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: b++,
      // leading whitespace
      TEXT: b++,
      // general stuff
      TEXT_ENTITY: b++,
      // &amp and such.
      OPEN_WAKA: b++,
      // <
      SGML_DECL: b++,
      // <!BLARG
      SGML_DECL_QUOTED: b++,
      // <!BLARG foo "bar
      DOCTYPE: b++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: b++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: b++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: b++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: b++,
      // <!-
      COMMENT: b++,
      // <!--
      COMMENT_ENDING: b++,
      // <!-- blah -
      COMMENT_ENDED: b++,
      // <!-- blah --
      CDATA: b++,
      // <![CDATA[ something
      CDATA_ENDING: b++,
      // ]
      CDATA_ENDING_2: b++,
      // ]]
      PROC_INST: b++,
      // <?hi
      PROC_INST_BODY: b++,
      // <?hi there
      PROC_INST_ENDING: b++,
      // <?hi "there" ?
      OPEN_TAG: b++,
      // <strong
      OPEN_TAG_SLASH: b++,
      // <strong /
      ATTRIB: b++,
      // <a
      ATTRIB_NAME: b++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: b++,
      // <a foo _
      ATTRIB_VALUE: b++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: b++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: b++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: b++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: b++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: b++,
      // <foo bar=&quot
      CLOSE_TAG: b++,
      // </a
      CLOSE_TAG_SAW_WHITE: b++,
      // </a   >
      SCRIPT: b++,
      // <script> ...
      SCRIPT_ENDING: b++
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
    }, Object.keys(t.ENTITIES).forEach(function(m) {
      var h = t.ENTITIES[m], N = typeof h == "number" ? String.fromCharCode(h) : h;
      t.ENTITIES[m] = N;
    });
    for (var Q in t.STATE)
      t.STATE[t.STATE[Q]] = Q;
    b = t.STATE;
    function M(m, h, N) {
      m[h] && m[h](N);
    }
    function H(m, h, N) {
      m.textNode && Z(m), M(m, h, N);
    }
    function Z(m) {
      m.textNode = F(m.opt, m.textNode), m.textNode && M(m, "ontext", m.textNode), m.textNode = "";
    }
    function F(m, h) {
      return m.trim && (h = h.trim()), m.normalize && (h = h.replace(/\s+/g, " ")), h;
    }
    function L(m, h) {
      return Z(m), m.trackPosition && (h += `
Line: ` + m.line + `
Column: ` + m.column + `
Char: ` + m.c), h = new Error(h), m.error = h, M(m, "onerror", h), m;
    }
    function q(m) {
      return m.sawRoot && !m.closedRoot && x(m, "Unclosed root tag"), m.state !== b.BEGIN && m.state !== b.BEGIN_WHITESPACE && m.state !== b.TEXT && L(m, "Unexpected end"), Z(m), m.c = "", m.closed = !0, M(m, "onend"), n.call(m, m.strict, m.opt), m;
    }
    function x(m, h) {
      if (typeof m != "object" || !(m instanceof n))
        throw new Error("bad call to strictFail");
      m.strict && L(m, h);
    }
    function G(m) {
      m.strict || (m.tagName = m.tagName[m.looseCase]());
      var h = m.tags[m.tags.length - 1] || m, N = m.tag = { name: m.tagName, attributes: {} };
      m.opt.xmlns && (N.ns = h.ns), m.attribList.length = 0, H(m, "onopentagstart", N);
    }
    function B(m, h) {
      var N = m.indexOf(":"), P = N < 0 ? ["", m] : m.split(":"), ee = P[0], pe = P[1];
      return h && m === "xmlns" && (ee = "xmlns", pe = ""), { prefix: ee, local: pe };
    }
    function k(m) {
      if (m.strict || (m.attribName = m.attribName[m.looseCase]()), m.attribList.indexOf(m.attribName) !== -1 || m.tag.attributes.hasOwnProperty(m.attribName)) {
        m.attribName = m.attribValue = "";
        return;
      }
      if (m.opt.xmlns) {
        var h = B(m.attribName, !0), N = h.prefix, P = h.local;
        if (N === "xmlns")
          if (P === "xml" && m.attribValue !== p)
            x(
              m,
              "xml: prefix must be bound to " + p + `
Actual: ` + m.attribValue
            );
          else if (P === "xmlns" && m.attribValue !== y)
            x(
              m,
              "xmlns: prefix must be bound to " + y + `
Actual: ` + m.attribValue
            );
          else {
            var ee = m.tag, pe = m.tags[m.tags.length - 1] || m;
            ee.ns === pe.ns && (ee.ns = Object.create(pe.ns)), ee.ns[P] = m.attribValue;
          }
        m.attribList.push([m.attribName, m.attribValue]);
      } else
        m.tag.attributes[m.attribName] = m.attribValue, H(m, "onattribute", {
          name: m.attribName,
          value: m.attribValue
        });
      m.attribName = m.attribValue = "";
    }
    function T(m, h) {
      if (m.opt.xmlns) {
        var N = m.tag, P = B(m.tagName);
        N.prefix = P.prefix, N.local = P.local, N.uri = N.ns[P.prefix] || "", N.prefix && !N.uri && (x(m, "Unbound namespace prefix: " + JSON.stringify(m.tagName)), N.uri = P.prefix);
        var ee = m.tags[m.tags.length - 1] || m;
        N.ns && ee.ns !== N.ns && Object.keys(N.ns).forEach(function(or) {
          H(m, "onopennamespace", {
            prefix: or,
            uri: N.ns[or]
          });
        });
        for (var pe = 0, ve = m.attribList.length; pe < ve; pe++) {
          var Ie = m.attribList[pe], Re = Ie[0], $t = Ie[1], Se = B(Re, !0), Ze = Se.prefix, Gr = Se.local, sr = Ze === "" ? "" : N.ns[Ze] || "", Vt = {
            name: Re,
            value: $t,
            prefix: Ze,
            local: Gr,
            uri: sr
          };
          Ze && Ze !== "xmlns" && !sr && (x(m, "Unbound namespace prefix: " + JSON.stringify(Ze)), Vt.uri = Ze), m.tag.attributes[Re] = Vt, H(m, "onattribute", Vt);
        }
        m.attribList.length = 0;
      }
      m.tag.isSelfClosing = !!h, m.sawRoot = !0, m.tags.push(m.tag), H(m, "onopentag", m.tag), h || (!m.noscript && m.tagName.toLowerCase() === "script" ? m.state = b.SCRIPT : m.state = b.TEXT, m.tag = null, m.tagName = ""), m.attribName = m.attribValue = "", m.attribList.length = 0;
    }
    function C(m) {
      if (!m.tagName) {
        x(m, "Weird empty close tag."), m.textNode += "</>", m.state = b.TEXT;
        return;
      }
      if (m.script) {
        if (m.tagName !== "script") {
          m.script += "</" + m.tagName + ">", m.tagName = "", m.state = b.SCRIPT;
          return;
        }
        H(m, "onscript", m.script), m.script = "";
      }
      var h = m.tags.length, N = m.tagName;
      m.strict || (N = N[m.looseCase]());
      for (var P = N; h--; ) {
        var ee = m.tags[h];
        if (ee.name !== P)
          x(m, "Unexpected close tag");
        else
          break;
      }
      if (h < 0) {
        x(m, "Unmatched closing tag: " + m.tagName), m.textNode += "</" + m.tagName + ">", m.state = b.TEXT;
        return;
      }
      m.tagName = N;
      for (var pe = m.tags.length; pe-- > h; ) {
        var ve = m.tag = m.tags.pop();
        m.tagName = m.tag.name, H(m, "onclosetag", m.tagName);
        var Ie = {};
        for (var Re in ve.ns)
          Ie[Re] = ve.ns[Re];
        var $t = m.tags[m.tags.length - 1] || m;
        m.opt.xmlns && ve.ns !== $t.ns && Object.keys(ve.ns).forEach(function(Se) {
          var Ze = ve.ns[Se];
          H(m, "onclosenamespace", { prefix: Se, uri: Ze });
        });
      }
      h === 0 && (m.closedRoot = !0), m.tagName = m.attribValue = m.attribName = "", m.attribList.length = 0, m.state = b.TEXT;
    }
    function O(m) {
      var h = m.entity, N = h.toLowerCase(), P, ee = "";
      return m.ENTITIES[h] ? m.ENTITIES[h] : m.ENTITIES[N] ? m.ENTITIES[N] : (h = N, h.charAt(0) === "#" && (h.charAt(1) === "x" ? (h = h.slice(2), P = parseInt(h, 16), ee = P.toString(16)) : (h = h.slice(1), P = parseInt(h, 10), ee = P.toString(10))), h = h.replace(/^0+/, ""), isNaN(P) || ee.toLowerCase() !== h ? (x(m, "Invalid character entity"), "&" + m.entity + ";") : String.fromCodePoint(P));
    }
    function $(m, h) {
      h === "<" ? (m.state = b.OPEN_WAKA, m.startTagPosition = m.position) : R(h) || (x(m, "Non-whitespace before first tag."), m.textNode = h, m.state = b.TEXT);
    }
    function S(m, h) {
      var N = "";
      return h < m.length && (N = m.charAt(h)), N;
    }
    function D(m) {
      var h = this;
      if (this.error)
        throw this.error;
      if (h.closed)
        return L(
          h,
          "Cannot write after close. Assign an onready handler."
        );
      if (m === null)
        return q(h);
      typeof m == "object" && (m = m.toString());
      for (var N = 0, P = ""; P = S(m, N++), h.c = P, !!P; )
        switch (h.trackPosition && (h.position++, P === `
` ? (h.line++, h.column = 0) : h.column++), h.state) {
          case b.BEGIN:
            if (h.state = b.BEGIN_WHITESPACE, P === "\uFEFF")
              continue;
            $(h, P);
            continue;
          case b.BEGIN_WHITESPACE:
            $(h, P);
            continue;
          case b.TEXT:
            if (h.sawRoot && !h.closedRoot) {
              for (var ee = N - 1; P && P !== "<" && P !== "&"; )
                P = S(m, N++), P && h.trackPosition && (h.position++, P === `
` ? (h.line++, h.column = 0) : h.column++);
              h.textNode += m.substring(ee, N - 1);
            }
            P === "<" && !(h.sawRoot && h.closedRoot && !h.strict) ? (h.state = b.OPEN_WAKA, h.startTagPosition = h.position) : (!R(P) && (!h.sawRoot || h.closedRoot) && x(h, "Text data outside of root node."), P === "&" ? h.state = b.TEXT_ENTITY : h.textNode += P);
            continue;
          case b.SCRIPT:
            P === "<" ? h.state = b.SCRIPT_ENDING : h.script += P;
            continue;
          case b.SCRIPT_ENDING:
            P === "/" ? h.state = b.CLOSE_TAG : (h.script += "<" + P, h.state = b.SCRIPT);
            continue;
          case b.OPEN_WAKA:
            if (P === "!")
              h.state = b.SGML_DECL, h.sgmlDecl = "";
            else if (!R(P)) if (Y(_, P))
              h.state = b.OPEN_TAG, h.tagName = P;
            else if (P === "/")
              h.state = b.CLOSE_TAG, h.tagName = "";
            else if (P === "?")
              h.state = b.PROC_INST, h.procInstName = h.procInstBody = "";
            else {
              if (x(h, "Unencoded <"), h.startTagPosition + 1 < h.position) {
                var pe = h.position - h.startTagPosition;
                P = new Array(pe).join(" ") + P;
              }
              h.textNode += "<" + P, h.state = b.TEXT;
            }
            continue;
          case b.SGML_DECL:
            if (h.sgmlDecl + P === "--") {
              h.state = b.COMMENT, h.comment = "", h.sgmlDecl = "";
              continue;
            }
            h.doctype && h.doctype !== !0 && h.sgmlDecl ? (h.state = b.DOCTYPE_DTD, h.doctype += "<!" + h.sgmlDecl + P, h.sgmlDecl = "") : (h.sgmlDecl + P).toUpperCase() === u ? (H(h, "onopencdata"), h.state = b.CDATA, h.sgmlDecl = "", h.cdata = "") : (h.sgmlDecl + P).toUpperCase() === d ? (h.state = b.DOCTYPE, (h.doctype || h.sawRoot) && x(
              h,
              "Inappropriately located doctype declaration"
            ), h.doctype = "", h.sgmlDecl = "") : P === ">" ? (H(h, "onsgmldeclaration", h.sgmlDecl), h.sgmlDecl = "", h.state = b.TEXT) : (j(P) && (h.state = b.SGML_DECL_QUOTED), h.sgmlDecl += P);
            continue;
          case b.SGML_DECL_QUOTED:
            P === h.q && (h.state = b.SGML_DECL, h.q = ""), h.sgmlDecl += P;
            continue;
          case b.DOCTYPE:
            P === ">" ? (h.state = b.TEXT, H(h, "ondoctype", h.doctype), h.doctype = !0) : (h.doctype += P, P === "[" ? h.state = b.DOCTYPE_DTD : j(P) && (h.state = b.DOCTYPE_QUOTED, h.q = P));
            continue;
          case b.DOCTYPE_QUOTED:
            h.doctype += P, P === h.q && (h.q = "", h.state = b.DOCTYPE);
            continue;
          case b.DOCTYPE_DTD:
            P === "]" ? (h.doctype += P, h.state = b.DOCTYPE) : P === "<" ? (h.state = b.OPEN_WAKA, h.startTagPosition = h.position) : j(P) ? (h.doctype += P, h.state = b.DOCTYPE_DTD_QUOTED, h.q = P) : h.doctype += P;
            continue;
          case b.DOCTYPE_DTD_QUOTED:
            h.doctype += P, P === h.q && (h.state = b.DOCTYPE_DTD, h.q = "");
            continue;
          case b.COMMENT:
            P === "-" ? h.state = b.COMMENT_ENDING : h.comment += P;
            continue;
          case b.COMMENT_ENDING:
            P === "-" ? (h.state = b.COMMENT_ENDED, h.comment = F(h.opt, h.comment), h.comment && H(h, "oncomment", h.comment), h.comment = "") : (h.comment += "-" + P, h.state = b.COMMENT);
            continue;
          case b.COMMENT_ENDED:
            P !== ">" ? (x(h, "Malformed comment"), h.comment += "--" + P, h.state = b.COMMENT) : h.doctype && h.doctype !== !0 ? h.state = b.DOCTYPE_DTD : h.state = b.TEXT;
            continue;
          case b.CDATA:
            P === "]" ? h.state = b.CDATA_ENDING : h.cdata += P;
            continue;
          case b.CDATA_ENDING:
            P === "]" ? h.state = b.CDATA_ENDING_2 : (h.cdata += "]" + P, h.state = b.CDATA);
            continue;
          case b.CDATA_ENDING_2:
            P === ">" ? (h.cdata && H(h, "oncdata", h.cdata), H(h, "onclosecdata"), h.cdata = "", h.state = b.TEXT) : P === "]" ? h.cdata += "]" : (h.cdata += "]]" + P, h.state = b.CDATA);
            continue;
          case b.PROC_INST:
            P === "?" ? h.state = b.PROC_INST_ENDING : R(P) ? h.state = b.PROC_INST_BODY : h.procInstName += P;
            continue;
          case b.PROC_INST_BODY:
            if (!h.procInstBody && R(P))
              continue;
            P === "?" ? h.state = b.PROC_INST_ENDING : h.procInstBody += P;
            continue;
          case b.PROC_INST_ENDING:
            P === ">" ? (H(h, "onprocessinginstruction", {
              name: h.procInstName,
              body: h.procInstBody
            }), h.procInstName = h.procInstBody = "", h.state = b.TEXT) : (h.procInstBody += "?" + P, h.state = b.PROC_INST_BODY);
            continue;
          case b.OPEN_TAG:
            Y(v, P) ? h.tagName += P : (G(h), P === ">" ? T(h) : P === "/" ? h.state = b.OPEN_TAG_SLASH : (R(P) || x(h, "Invalid character in tag name"), h.state = b.ATTRIB));
            continue;
          case b.OPEN_TAG_SLASH:
            P === ">" ? (T(h, !0), C(h)) : (x(h, "Forward-slash in opening tag not followed by >"), h.state = b.ATTRIB);
            continue;
          case b.ATTRIB:
            if (R(P))
              continue;
            P === ">" ? T(h) : P === "/" ? h.state = b.OPEN_TAG_SLASH : Y(_, P) ? (h.attribName = P, h.attribValue = "", h.state = b.ATTRIB_NAME) : x(h, "Invalid attribute name");
            continue;
          case b.ATTRIB_NAME:
            P === "=" ? h.state = b.ATTRIB_VALUE : P === ">" ? (x(h, "Attribute without value"), h.attribValue = h.attribName, k(h), T(h)) : R(P) ? h.state = b.ATTRIB_NAME_SAW_WHITE : Y(v, P) ? h.attribName += P : x(h, "Invalid attribute name");
            continue;
          case b.ATTRIB_NAME_SAW_WHITE:
            if (P === "=")
              h.state = b.ATTRIB_VALUE;
            else {
              if (R(P))
                continue;
              x(h, "Attribute without value"), h.tag.attributes[h.attribName] = "", h.attribValue = "", H(h, "onattribute", {
                name: h.attribName,
                value: ""
              }), h.attribName = "", P === ">" ? T(h) : Y(_, P) ? (h.attribName = P, h.state = b.ATTRIB_NAME) : (x(h, "Invalid attribute name"), h.state = b.ATTRIB);
            }
            continue;
          case b.ATTRIB_VALUE:
            if (R(P))
              continue;
            j(P) ? (h.q = P, h.state = b.ATTRIB_VALUE_QUOTED) : (h.opt.unquotedAttributeValues || L(h, "Unquoted attribute value"), h.state = b.ATTRIB_VALUE_UNQUOTED, h.attribValue = P);
            continue;
          case b.ATTRIB_VALUE_QUOTED:
            if (P !== h.q) {
              P === "&" ? h.state = b.ATTRIB_VALUE_ENTITY_Q : h.attribValue += P;
              continue;
            }
            k(h), h.q = "", h.state = b.ATTRIB_VALUE_CLOSED;
            continue;
          case b.ATTRIB_VALUE_CLOSED:
            R(P) ? h.state = b.ATTRIB : P === ">" ? T(h) : P === "/" ? h.state = b.OPEN_TAG_SLASH : Y(_, P) ? (x(h, "No whitespace between attributes"), h.attribName = P, h.attribValue = "", h.state = b.ATTRIB_NAME) : x(h, "Invalid attribute name");
            continue;
          case b.ATTRIB_VALUE_UNQUOTED:
            if (!J(P)) {
              P === "&" ? h.state = b.ATTRIB_VALUE_ENTITY_U : h.attribValue += P;
              continue;
            }
            k(h), P === ">" ? T(h) : h.state = b.ATTRIB;
            continue;
          case b.CLOSE_TAG:
            if (h.tagName)
              P === ">" ? C(h) : Y(v, P) ? h.tagName += P : h.script ? (h.script += "</" + h.tagName, h.tagName = "", h.state = b.SCRIPT) : (R(P) || x(h, "Invalid tagname in closing tag"), h.state = b.CLOSE_TAG_SAW_WHITE);
            else {
              if (R(P))
                continue;
              me(_, P) ? h.script ? (h.script += "</" + P, h.state = b.SCRIPT) : x(h, "Invalid tagname in closing tag.") : h.tagName = P;
            }
            continue;
          case b.CLOSE_TAG_SAW_WHITE:
            if (R(P))
              continue;
            P === ">" ? C(h) : x(h, "Invalid characters in closing tag");
            continue;
          case b.TEXT_ENTITY:
          case b.ATTRIB_VALUE_ENTITY_Q:
          case b.ATTRIB_VALUE_ENTITY_U:
            var ve, Ie;
            switch (h.state) {
              case b.TEXT_ENTITY:
                ve = b.TEXT, Ie = "textNode";
                break;
              case b.ATTRIB_VALUE_ENTITY_Q:
                ve = b.ATTRIB_VALUE_QUOTED, Ie = "attribValue";
                break;
              case b.ATTRIB_VALUE_ENTITY_U:
                ve = b.ATTRIB_VALUE_UNQUOTED, Ie = "attribValue";
                break;
            }
            if (P === ";") {
              var Re = O(h);
              h.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(Re) ? (h.entity = "", h.state = ve, h.write(Re)) : (h[Ie] += Re, h.entity = "", h.state = ve);
            } else Y(h.entity.length ? I : w, P) ? h.entity += P : (x(h, "Invalid character in entity name"), h[Ie] += "&" + h.entity + P, h.entity = "", h.state = ve);
            continue;
          default:
            throw new Error(h, "Unknown state: " + h.state);
        }
      return h.position >= h.bufferCheckPosition && i(h), h;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var m = String.fromCharCode, h = Math.floor, N = function() {
        var P = 16384, ee = [], pe, ve, Ie = -1, Re = arguments.length;
        if (!Re)
          return "";
        for (var $t = ""; ++Ie < Re; ) {
          var Se = Number(arguments[Ie]);
          if (!isFinite(Se) || // `NaN`, `+Infinity`, or `-Infinity`
          Se < 0 || // not a valid Unicode code point
          Se > 1114111 || // not a valid Unicode code point
          h(Se) !== Se)
            throw RangeError("Invalid code point: " + Se);
          Se <= 65535 ? ee.push(Se) : (Se -= 65536, pe = (Se >> 10) + 55296, ve = Se % 1024 + 56320, ee.push(pe, ve)), (Ie + 1 === Re || ee.length > P) && ($t += m.apply(null, ee), ee.length = 0);
        }
        return $t;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: N,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = N;
    }();
  })(e);
})(im);
Object.defineProperty(ga, "__esModule", { value: !0 });
ga.XElement = void 0;
ga.parseXml = Dw;
const Rw = im, Ba = ni;
class am {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, Ba.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!Nw(t))
      throw (0, Ba.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const r = this.attributes === null ? null : this.attributes[t];
    if (r == null)
      throw (0, Ba.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return r;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, r = !1, n = null) {
    const i = this.elementOrNull(t, r);
    if (i === null)
      throw (0, Ba.newError)(n || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, r = !1) {
    if (this.elements === null)
      return null;
    for (const n of this.elements)
      if (xf(n, t, r))
        return n;
    return null;
  }
  getElements(t, r = !1) {
    return this.elements === null ? [] : this.elements.filter((n) => xf(n, t, r));
  }
  elementValueOrEmpty(t, r = !1) {
    const n = this.elementOrNull(t, r);
    return n === null ? "" : n.value;
  }
}
ga.XElement = am;
const Cw = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function Nw(e) {
  return Cw.test(e);
}
function xf(e, t, r) {
  const n = e.name;
  return n === t || r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase();
}
function Dw(e) {
  let t = null;
  const r = Rw.parser(!0, {}), n = [];
  return r.onopentag = (i) => {
    const a = new am(i.name);
    if (a.attributes = i.attributes, t === null)
      t = a;
    else {
      const s = n[n.length - 1];
      s.elements == null && (s.elements = []), s.elements.push(a);
    }
    n.push(a);
  }, r.onclosetag = () => {
    n.pop();
  }, r.ontext = (i) => {
    n.length > 0 && (n[n.length - 1].value = i);
  }, r.oncdata = (i) => {
    const a = n[n.length - 1];
    a.value = i, a.isCData = !0;
  }, r.onerror = (i) => {
    throw i;
  }, r.write(e), t;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.HttpExecutor = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0, e.asArray = u;
  var t = Nr;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var r = ni;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return r.newError;
  } });
  var n = at;
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
  var i = Gs;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var a = ya;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return a.ProgressCallbackTransform;
  } });
  var s = Vs;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return s.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return s.githubUrl;
  } });
  var o = cl;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return o.retry;
  } });
  var c = ll;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return c.parseDn;
  } });
  var f = Jn;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return f.UUID;
  } });
  var l = ga;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return l.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return l.XElement;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function u(d) {
    return d == null ? [] : Array.isArray(d) ? d : [d];
  }
})(je);
var Ge = {}, ul = {}, kt = {};
function sm(e) {
  return typeof e > "u" || e === null;
}
function kw(e) {
  return typeof e == "object" && e !== null;
}
function Fw(e) {
  return Array.isArray(e) ? e : sm(e) ? [] : [e];
}
function Lw(e, t) {
  var r, n, i, a;
  if (t)
    for (a = Object.keys(t), r = 0, n = a.length; r < n; r += 1)
      i = a[r], e[i] = t[i];
  return e;
}
function xw(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function Uw(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
kt.isNothing = sm;
kt.isObject = kw;
kt.toArray = Fw;
kt.repeat = xw;
kt.isNegativeZero = Uw;
kt.extend = Lw;
function om(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function Yi(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = om(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Yi.prototype = Object.create(Error.prototype);
Yi.prototype.constructor = Yi;
Yi.prototype.toString = function(t) {
  return this.name + ": " + om(this, t);
};
var va = Yi, Oi = kt;
function jo(e, t, r, n, i) {
  var a = "", s = "", o = Math.floor(i / 2) - 1;
  return n - t > o && (a = " ... ", t = n - o + a.length), r - n > o && (s = " ...", r = n + o - s.length), {
    str: a + e.slice(t, r).replace(/\t/g, "→") + s,
    pos: n - t + a.length
    // relative position
  };
}
function Mo(e, t) {
  return Oi.repeat(" ", t - e.length) + e;
}
function jw(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], a, s = -1; a = r.exec(e.buffer); )
    i.push(a.index), n.push(a.index + a[0].length), e.position <= a.index && s < 0 && (s = n.length - 2);
  s < 0 && (s = n.length - 1);
  var o = "", c, f, l = Math.min(e.line + t.linesAfter, i.length).toString().length, u = t.maxLength - (t.indent + l + 3);
  for (c = 1; c <= t.linesBefore && !(s - c < 0); c++)
    f = jo(
      e.buffer,
      n[s - c],
      i[s - c],
      e.position - (n[s] - n[s - c]),
      u
    ), o = Oi.repeat(" ", t.indent) + Mo((e.line - c + 1).toString(), l) + " | " + f.str + `
` + o;
  for (f = jo(e.buffer, n[s], i[s], e.position, u), o += Oi.repeat(" ", t.indent) + Mo((e.line + 1).toString(), l) + " | " + f.str + `
`, o += Oi.repeat("-", t.indent + l + 3 + f.pos) + `^
`, c = 1; c <= t.linesAfter && !(s + c >= i.length); c++)
    f = jo(
      e.buffer,
      n[s + c],
      i[s + c],
      e.position - (n[s] - n[s + c]),
      u
    ), o += Oi.repeat(" ", t.indent) + Mo((e.line + c + 1).toString(), l) + " | " + f.str + `
`;
  return o.replace(/\n$/, "");
}
var Mw = jw, Uf = va, Bw = [
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
], qw = [
  "scalar",
  "sequence",
  "mapping"
];
function Hw(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function Gw(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (Bw.indexOf(r) === -1)
      throw new Uf('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = Hw(t.styleAliases || null), qw.indexOf(this.kind) === -1)
    throw new Uf('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var ct = Gw, Si = va, Bo = ct;
function jf(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(a, s) {
      a.tag === n.tag && a.kind === n.kind && a.multi === n.multi && (i = s);
    }), r[i] = n;
  }), r;
}
function Vw() {
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
function Ic(e) {
  return this.extend(e);
}
Ic.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof Bo)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new Si("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(a) {
    if (!(a instanceof Bo))
      throw new Si("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (a.loadKind && a.loadKind !== "scalar")
      throw new Si("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (a.multi)
      throw new Si("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(a) {
    if (!(a instanceof Bo))
      throw new Si("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(Ic.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = jf(i, "implicit"), i.compiledExplicit = jf(i, "explicit"), i.compiledTypeMap = Vw(i.compiledImplicit, i.compiledExplicit), i;
};
var cm = Ic, zw = ct, lm = new zw("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Ww = ct, um = new Ww("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), Kw = ct, fm = new Kw("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Yw = cm, dm = new Yw({
  explicit: [
    lm,
    um,
    fm
  ]
}), Xw = ct;
function Jw(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Qw() {
  return null;
}
function Zw(e) {
  return e === null;
}
var hm = new Xw("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Jw,
  construct: Qw,
  predicate: Zw,
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
}), eE = ct;
function tE(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function rE(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function nE(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var pm = new eE("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: tE,
  construct: rE,
  predicate: nE,
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
}), iE = kt, aE = ct;
function sE(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function oE(e) {
  return 48 <= e && e <= 55;
}
function cE(e) {
  return 48 <= e && e <= 57;
}
function lE(e) {
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
          if (!sE(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!oE(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!cE(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function uE(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function fE(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !iE.isNegativeZero(e);
}
var mm = new aE("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: lE,
  construct: uE,
  predicate: fE,
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
}), ym = kt, dE = ct, hE = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function pE(e) {
  return !(e === null || !hE.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function mE(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var yE = /^[-+]?[0-9]+e/;
function gE(e, t) {
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
  else if (ym.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), yE.test(r) ? r.replace("e", ".e") : r;
}
function vE(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || ym.isNegativeZero(e));
}
var gm = new dE("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: pE,
  construct: mE,
  predicate: vE,
  represent: gE,
  defaultStyle: "lowercase"
}), vm = dm.extend({
  implicit: [
    hm,
    pm,
    mm,
    gm
  ]
}), _m = vm, _E = ct, $m = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), wm = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function $E(e) {
  return e === null ? !1 : $m.exec(e) !== null || wm.exec(e) !== null;
}
function wE(e) {
  var t, r, n, i, a, s, o, c = 0, f = null, l, u, d;
  if (t = $m.exec(e), t === null && (t = wm.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (a = +t[4], s = +t[5], o = +t[6], t[7]) {
    for (c = t[7].slice(0, 3); c.length < 3; )
      c += "0";
    c = +c;
  }
  return t[9] && (l = +t[10], u = +(t[11] || 0), f = (l * 60 + u) * 6e4, t[9] === "-" && (f = -f)), d = new Date(Date.UTC(r, n, i, a, s, o, c)), f && d.setTime(d.getTime() - f), d;
}
function EE(e) {
  return e.toISOString();
}
var Em = new _E("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: $E,
  construct: wE,
  instanceOf: Date,
  represent: EE
}), SE = ct;
function bE(e) {
  return e === "<<" || e === null;
}
var Sm = new SE("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: bE
}), PE = ct, fl = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function TE(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, a = fl;
  for (r = 0; r < i; r++)
    if (t = a.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function AE(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, a = fl, s = 0, o = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (o.push(s >> 16 & 255), o.push(s >> 8 & 255), o.push(s & 255)), s = s << 6 | a.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (o.push(s >> 16 & 255), o.push(s >> 8 & 255), o.push(s & 255)) : r === 18 ? (o.push(s >> 10 & 255), o.push(s >> 2 & 255)) : r === 12 && o.push(s >> 4 & 255), new Uint8Array(o);
}
function IE(e) {
  var t = "", r = 0, n, i, a = e.length, s = fl;
  for (n = 0; n < a; n++)
    n % 3 === 0 && n && (t += s[r >> 18 & 63], t += s[r >> 12 & 63], t += s[r >> 6 & 63], t += s[r & 63]), r = (r << 8) + e[n];
  return i = a % 3, i === 0 ? (t += s[r >> 18 & 63], t += s[r >> 12 & 63], t += s[r >> 6 & 63], t += s[r & 63]) : i === 2 ? (t += s[r >> 10 & 63], t += s[r >> 4 & 63], t += s[r << 2 & 63], t += s[64]) : i === 1 && (t += s[r >> 2 & 63], t += s[r << 4 & 63], t += s[64], t += s[64]), t;
}
function OE(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var bm = new PE("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: TE,
  construct: AE,
  predicate: OE,
  represent: IE
}), RE = ct, CE = Object.prototype.hasOwnProperty, NE = Object.prototype.toString;
function DE(e) {
  if (e === null) return !0;
  var t = [], r, n, i, a, s, o = e;
  for (r = 0, n = o.length; r < n; r += 1) {
    if (i = o[r], s = !1, NE.call(i) !== "[object Object]") return !1;
    for (a in i)
      if (CE.call(i, a))
        if (!s) s = !0;
        else return !1;
    if (!s) return !1;
    if (t.indexOf(a) === -1) t.push(a);
    else return !1;
  }
  return !0;
}
function kE(e) {
  return e !== null ? e : [];
}
var Pm = new RE("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: DE,
  construct: kE
}), FE = ct, LE = Object.prototype.toString;
function xE(e) {
  if (e === null) return !0;
  var t, r, n, i, a, s = e;
  for (a = new Array(s.length), t = 0, r = s.length; t < r; t += 1) {
    if (n = s[t], LE.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    a[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function UE(e) {
  if (e === null) return [];
  var t, r, n, i, a, s = e;
  for (a = new Array(s.length), t = 0, r = s.length; t < r; t += 1)
    n = s[t], i = Object.keys(n), a[t] = [i[0], n[i[0]]];
  return a;
}
var Tm = new FE("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: xE,
  construct: UE
}), jE = ct, ME = Object.prototype.hasOwnProperty;
function BE(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if (ME.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function qE(e) {
  return e !== null ? e : {};
}
var Am = new jE("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: BE,
  construct: qE
}), dl = _m.extend({
  implicit: [
    Em,
    Sm
  ],
  explicit: [
    bm,
    Pm,
    Tm,
    Am
  ]
}), an = kt, Im = va, HE = Mw, GE = dl, Dr = Object.prototype.hasOwnProperty, bs = 1, Om = 2, Rm = 3, Ps = 4, qo = 1, VE = 2, Mf = 3, zE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, WE = /[\x85\u2028\u2029]/, KE = /[,\[\]\{\}]/, Cm = /^(?:!|!!|![a-z\-]+!)$/i, Nm = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Bf(e) {
  return Object.prototype.toString.call(e);
}
function qt(e) {
  return e === 10 || e === 13;
}
function dn(e) {
  return e === 9 || e === 32;
}
function ht(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function xn(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function YE(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function XE(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function JE(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function qf(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function QE(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Dm = new Array(256), km = new Array(256);
for (var Pn = 0; Pn < 256; Pn++)
  Dm[Pn] = qf(Pn) ? 1 : 0, km[Pn] = qf(Pn);
function ZE(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || GE, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Fm(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = HE(r), new Im(t, r);
}
function X(e, t) {
  throw Fm(e, t);
}
function Ts(e, t) {
  e.onWarning && e.onWarning.call(null, Fm(e, t));
}
var Hf = {
  YAML: function(t, r, n) {
    var i, a, s;
    t.version !== null && X(t, "duplication of %YAML directive"), n.length !== 1 && X(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && X(t, "ill-formed argument of the YAML directive"), a = parseInt(i[1], 10), s = parseInt(i[2], 10), a !== 1 && X(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = s < 2, s !== 1 && s !== 2 && Ts(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, a;
    n.length !== 2 && X(t, "TAG directive accepts exactly two arguments"), i = n[0], a = n[1], Cm.test(i) || X(t, "ill-formed tag handle (first argument) of the TAG directive"), Dr.call(t.tagMap, i) && X(t, 'there is a previously declared suffix for "' + i + '" tag handle'), Nm.test(a) || X(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      a = decodeURIComponent(a);
    } catch {
      X(t, "tag prefix is malformed: " + a);
    }
    t.tagMap[i] = a;
  }
};
function Ir(e, t, r, n) {
  var i, a, s, o;
  if (t < r) {
    if (o = e.input.slice(t, r), n)
      for (i = 0, a = o.length; i < a; i += 1)
        s = o.charCodeAt(i), s === 9 || 32 <= s && s <= 1114111 || X(e, "expected valid JSON character");
    else zE.test(o) && X(e, "the stream contains non-printable characters");
    e.result += o;
  }
}
function Gf(e, t, r, n) {
  var i, a, s, o;
  for (an.isObject(r) || X(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), s = 0, o = i.length; s < o; s += 1)
    a = i[s], Dr.call(t, a) || (t[a] = r[a], n[a] = !0);
}
function Un(e, t, r, n, i, a, s, o, c) {
  var f, l;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), f = 0, l = i.length; f < l; f += 1)
      Array.isArray(i[f]) && X(e, "nested arrays are not supported inside keys"), typeof i == "object" && Bf(i[f]) === "[object Object]" && (i[f] = "[object Object]");
  if (typeof i == "object" && Bf(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(a))
      for (f = 0, l = a.length; f < l; f += 1)
        Gf(e, t, a[f], r);
    else
      Gf(e, t, a, r);
  else
    !e.json && !Dr.call(r, i) && Dr.call(t, i) && (e.line = s || e.line, e.lineStart = o || e.lineStart, e.position = c || e.position, X(e, "duplicated mapping key")), i === "__proto__" ? Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: a
    }) : t[i] = a, delete r[i];
  return t;
}
function hl(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : X(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function Ce(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; dn(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (qt(i))
      for (hl(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && Ts(e, "deficient indentation"), n;
}
function zs(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || ht(r)));
}
function pl(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += an.repeat(`
`, t - 1));
}
function eS(e, t, r) {
  var n, i, a, s, o, c, f, l, u = e.kind, d = e.result, p;
  if (p = e.input.charCodeAt(e.position), ht(p) || xn(p) || p === 35 || p === 38 || p === 42 || p === 33 || p === 124 || p === 62 || p === 39 || p === 34 || p === 37 || p === 64 || p === 96 || (p === 63 || p === 45) && (i = e.input.charCodeAt(e.position + 1), ht(i) || r && xn(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", a = s = e.position, o = !1; p !== 0; ) {
    if (p === 58) {
      if (i = e.input.charCodeAt(e.position + 1), ht(i) || r && xn(i))
        break;
    } else if (p === 35) {
      if (n = e.input.charCodeAt(e.position - 1), ht(n))
        break;
    } else {
      if (e.position === e.lineStart && zs(e) || r && xn(p))
        break;
      if (qt(p))
        if (c = e.line, f = e.lineStart, l = e.lineIndent, Ce(e, !1, -1), e.lineIndent >= t) {
          o = !0, p = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = s, e.line = c, e.lineStart = f, e.lineIndent = l;
          break;
        }
    }
    o && (Ir(e, a, s, !1), pl(e, e.line - c), a = s = e.position, o = !1), dn(p) || (s = e.position + 1), p = e.input.charCodeAt(++e.position);
  }
  return Ir(e, a, s, !1), e.result ? !0 : (e.kind = u, e.result = d, !1);
}
function tS(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (Ir(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else qt(r) ? (Ir(e, n, i, !0), pl(e, Ce(e, !1, t)), n = i = e.position) : e.position === e.lineStart && zs(e) ? X(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  X(e, "unexpected end of the stream within a single quoted scalar");
}
function rS(e, t) {
  var r, n, i, a, s, o;
  if (o = e.input.charCodeAt(e.position), o !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (o = e.input.charCodeAt(e.position)) !== 0; ) {
    if (o === 34)
      return Ir(e, r, e.position, !0), e.position++, !0;
    if (o === 92) {
      if (Ir(e, r, e.position, !0), o = e.input.charCodeAt(++e.position), qt(o))
        Ce(e, !1, t);
      else if (o < 256 && Dm[o])
        e.result += km[o], e.position++;
      else if ((s = XE(o)) > 0) {
        for (i = s, a = 0; i > 0; i--)
          o = e.input.charCodeAt(++e.position), (s = YE(o)) >= 0 ? a = (a << 4) + s : X(e, "expected hexadecimal character");
        e.result += QE(a), e.position++;
      } else
        X(e, "unknown escape sequence");
      r = n = e.position;
    } else qt(o) ? (Ir(e, r, n, !0), pl(e, Ce(e, !1, t)), r = n = e.position) : e.position === e.lineStart && zs(e) ? X(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  X(e, "unexpected end of the stream within a double quoted scalar");
}
function nS(e, t) {
  var r = !0, n, i, a, s = e.tag, o, c = e.anchor, f, l, u, d, p, y = /* @__PURE__ */ Object.create(null), g, _, v, w;
  if (w = e.input.charCodeAt(e.position), w === 91)
    l = 93, p = !1, o = [];
  else if (w === 123)
    l = 125, p = !0, o = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = o), w = e.input.charCodeAt(++e.position); w !== 0; ) {
    if (Ce(e, !0, t), w = e.input.charCodeAt(e.position), w === l)
      return e.position++, e.tag = s, e.anchor = c, e.kind = p ? "mapping" : "sequence", e.result = o, !0;
    r ? w === 44 && X(e, "expected the node content, but found ','") : X(e, "missed comma between flow collection entries"), _ = g = v = null, u = d = !1, w === 63 && (f = e.input.charCodeAt(e.position + 1), ht(f) && (u = d = !0, e.position++, Ce(e, !0, t))), n = e.line, i = e.lineStart, a = e.position, Qn(e, t, bs, !1, !0), _ = e.tag, g = e.result, Ce(e, !0, t), w = e.input.charCodeAt(e.position), (d || e.line === n) && w === 58 && (u = !0, w = e.input.charCodeAt(++e.position), Ce(e, !0, t), Qn(e, t, bs, !1, !0), v = e.result), p ? Un(e, o, y, _, g, v, n, i, a) : u ? o.push(Un(e, null, y, _, g, v, n, i, a)) : o.push(g), Ce(e, !0, t), w = e.input.charCodeAt(e.position), w === 44 ? (r = !0, w = e.input.charCodeAt(++e.position)) : r = !1;
  }
  X(e, "unexpected end of the stream within a flow collection");
}
function iS(e, t) {
  var r, n, i = qo, a = !1, s = !1, o = t, c = 0, f = !1, l, u;
  if (u = e.input.charCodeAt(e.position), u === 124)
    n = !1;
  else if (u === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; u !== 0; )
    if (u = e.input.charCodeAt(++e.position), u === 43 || u === 45)
      qo === i ? i = u === 43 ? Mf : VE : X(e, "repeat of a chomping mode identifier");
    else if ((l = JE(u)) >= 0)
      l === 0 ? X(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : s ? X(e, "repeat of an indentation width identifier") : (o = t + l - 1, s = !0);
    else
      break;
  if (dn(u)) {
    do
      u = e.input.charCodeAt(++e.position);
    while (dn(u));
    if (u === 35)
      do
        u = e.input.charCodeAt(++e.position);
      while (!qt(u) && u !== 0);
  }
  for (; u !== 0; ) {
    for (hl(e), e.lineIndent = 0, u = e.input.charCodeAt(e.position); (!s || e.lineIndent < o) && u === 32; )
      e.lineIndent++, u = e.input.charCodeAt(++e.position);
    if (!s && e.lineIndent > o && (o = e.lineIndent), qt(u)) {
      c++;
      continue;
    }
    if (e.lineIndent < o) {
      i === Mf ? e.result += an.repeat(`
`, a ? 1 + c : c) : i === qo && a && (e.result += `
`);
      break;
    }
    for (n ? dn(u) ? (f = !0, e.result += an.repeat(`
`, a ? 1 + c : c)) : f ? (f = !1, e.result += an.repeat(`
`, c + 1)) : c === 0 ? a && (e.result += " ") : e.result += an.repeat(`
`, c) : e.result += an.repeat(`
`, a ? 1 + c : c), a = !0, s = !0, c = 0, r = e.position; !qt(u) && u !== 0; )
      u = e.input.charCodeAt(++e.position);
    Ir(e, r, e.position, !1);
  }
  return !0;
}
function Vf(e, t) {
  var r, n = e.tag, i = e.anchor, a = [], s, o = !1, c;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), c = e.input.charCodeAt(e.position); c !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, X(e, "tab characters must not be used in indentation")), !(c !== 45 || (s = e.input.charCodeAt(e.position + 1), !ht(s)))); ) {
    if (o = !0, e.position++, Ce(e, !0, -1) && e.lineIndent <= t) {
      a.push(null), c = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, Qn(e, t, Rm, !1, !0), a.push(e.result), Ce(e, !0, -1), c = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && c !== 0)
      X(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return o ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = a, !0) : !1;
}
function aS(e, t, r) {
  var n, i, a, s, o, c, f = e.tag, l = e.anchor, u = {}, d = /* @__PURE__ */ Object.create(null), p = null, y = null, g = null, _ = !1, v = !1, w;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), w = e.input.charCodeAt(e.position); w !== 0; ) {
    if (!_ && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, X(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), a = e.line, (w === 63 || w === 58) && ht(n))
      w === 63 ? (_ && (Un(e, u, d, p, y, null, s, o, c), p = y = g = null), v = !0, _ = !0, i = !0) : _ ? (_ = !1, i = !0) : X(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, w = n;
    else {
      if (s = e.line, o = e.lineStart, c = e.position, !Qn(e, r, Om, !1, !0))
        break;
      if (e.line === a) {
        for (w = e.input.charCodeAt(e.position); dn(w); )
          w = e.input.charCodeAt(++e.position);
        if (w === 58)
          w = e.input.charCodeAt(++e.position), ht(w) || X(e, "a whitespace character is expected after the key-value separator within a block mapping"), _ && (Un(e, u, d, p, y, null, s, o, c), p = y = g = null), v = !0, _ = !1, i = !1, p = e.tag, y = e.result;
        else if (v)
          X(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = f, e.anchor = l, !0;
      } else if (v)
        X(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = f, e.anchor = l, !0;
    }
    if ((e.line === a || e.lineIndent > t) && (_ && (s = e.line, o = e.lineStart, c = e.position), Qn(e, t, Ps, !0, i) && (_ ? y = e.result : g = e.result), _ || (Un(e, u, d, p, y, g, s, o, c), p = y = g = null), Ce(e, !0, -1), w = e.input.charCodeAt(e.position)), (e.line === a || e.lineIndent > t) && w !== 0)
      X(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return _ && Un(e, u, d, p, y, null, s, o, c), v && (e.tag = f, e.anchor = l, e.kind = "mapping", e.result = u), v;
}
function sS(e) {
  var t, r = !1, n = !1, i, a, s;
  if (s = e.input.charCodeAt(e.position), s !== 33) return !1;
  if (e.tag !== null && X(e, "duplication of a tag property"), s = e.input.charCodeAt(++e.position), s === 60 ? (r = !0, s = e.input.charCodeAt(++e.position)) : s === 33 ? (n = !0, i = "!!", s = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      s = e.input.charCodeAt(++e.position);
    while (s !== 0 && s !== 62);
    e.position < e.length ? (a = e.input.slice(t, e.position), s = e.input.charCodeAt(++e.position)) : X(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; s !== 0 && !ht(s); )
      s === 33 && (n ? X(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), Cm.test(i) || X(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), s = e.input.charCodeAt(++e.position);
    a = e.input.slice(t, e.position), KE.test(a) && X(e, "tag suffix cannot contain flow indicator characters");
  }
  a && !Nm.test(a) && X(e, "tag name cannot contain such characters: " + a);
  try {
    a = decodeURIComponent(a);
  } catch {
    X(e, "tag name is malformed: " + a);
  }
  return r ? e.tag = a : Dr.call(e.tagMap, i) ? e.tag = e.tagMap[i] + a : i === "!" ? e.tag = "!" + a : i === "!!" ? e.tag = "tag:yaml.org,2002:" + a : X(e, 'undeclared tag handle "' + i + '"'), !0;
}
function oS(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && X(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !ht(r) && !xn(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && X(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function cS(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !ht(n) && !xn(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && X(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), Dr.call(e.anchorMap, r) || X(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], Ce(e, !0, -1), !0;
}
function Qn(e, t, r, n, i) {
  var a, s, o, c = 1, f = !1, l = !1, u, d, p, y, g, _;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, a = s = o = Ps === r || Rm === r, n && Ce(e, !0, -1) && (f = !0, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)), c === 1)
    for (; sS(e) || oS(e); )
      Ce(e, !0, -1) ? (f = !0, o = a, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)) : o = !1;
  if (o && (o = f || i), (c === 1 || Ps === r) && (bs === r || Om === r ? g = t : g = t + 1, _ = e.position - e.lineStart, c === 1 ? o && (Vf(e, _) || aS(e, _, g)) || nS(e, g) ? l = !0 : (s && iS(e, g) || tS(e, g) || rS(e, g) ? l = !0 : cS(e) ? (l = !0, (e.tag !== null || e.anchor !== null) && X(e, "alias node should not have any properties")) : eS(e, g, bs === r) && (l = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : c === 0 && (l = o && Vf(e, _))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && X(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), u = 0, d = e.implicitTypes.length; u < d; u += 1)
      if (y = e.implicitTypes[u], y.resolve(e.result)) {
        e.result = y.construct(e.result), e.tag = y.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (Dr.call(e.typeMap[e.kind || "fallback"], e.tag))
      y = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (y = null, p = e.typeMap.multi[e.kind || "fallback"], u = 0, d = p.length; u < d; u += 1)
        if (e.tag.slice(0, p[u].tag.length) === p[u].tag) {
          y = p[u];
          break;
        }
    y || X(e, "unknown tag !<" + e.tag + ">"), e.result !== null && y.kind !== e.kind && X(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + y.kind + '", not "' + e.kind + '"'), y.resolve(e.result, e.tag) ? (e.result = y.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : X(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || l;
}
function lS(e) {
  var t = e.position, r, n, i, a = !1, s;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (s = e.input.charCodeAt(e.position)) !== 0 && (Ce(e, !0, -1), s = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || s !== 37)); ) {
    for (a = !0, s = e.input.charCodeAt(++e.position), r = e.position; s !== 0 && !ht(s); )
      s = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && X(e, "directive name must not be less than one character in length"); s !== 0; ) {
      for (; dn(s); )
        s = e.input.charCodeAt(++e.position);
      if (s === 35) {
        do
          s = e.input.charCodeAt(++e.position);
        while (s !== 0 && !qt(s));
        break;
      }
      if (qt(s)) break;
      for (r = e.position; s !== 0 && !ht(s); )
        s = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    s !== 0 && hl(e), Dr.call(Hf, n) ? Hf[n](e, n, i) : Ts(e, 'unknown document directive "' + n + '"');
  }
  if (Ce(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, Ce(e, !0, -1)) : a && X(e, "directives end mark is expected"), Qn(e, e.lineIndent - 1, Ps, !1, !0), Ce(e, !0, -1), e.checkLineBreaks && WE.test(e.input.slice(t, e.position)) && Ts(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && zs(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, Ce(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    X(e, "end of the stream or a document separator is expected");
  else
    return;
}
function Lm(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new ZE(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, X(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    lS(r);
  return r.documents;
}
function uS(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = Lm(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, a = n.length; i < a; i += 1)
    t(n[i]);
}
function fS(e, t) {
  var r = Lm(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new Im("expected a single document in the stream, but found more");
  }
}
ul.loadAll = uS;
ul.load = fS;
var xm = {}, Ws = kt, _a = va, dS = dl, Um = Object.prototype.toString, jm = Object.prototype.hasOwnProperty, ml = 65279, hS = 9, Xi = 10, pS = 13, mS = 32, yS = 33, gS = 34, Oc = 35, vS = 37, _S = 38, $S = 39, wS = 42, Mm = 44, ES = 45, As = 58, SS = 61, bS = 62, PS = 63, TS = 64, Bm = 91, qm = 93, AS = 96, Hm = 123, IS = 124, Gm = 125, Qe = {};
Qe[0] = "\\0";
Qe[7] = "\\a";
Qe[8] = "\\b";
Qe[9] = "\\t";
Qe[10] = "\\n";
Qe[11] = "\\v";
Qe[12] = "\\f";
Qe[13] = "\\r";
Qe[27] = "\\e";
Qe[34] = '\\"';
Qe[92] = "\\\\";
Qe[133] = "\\N";
Qe[160] = "\\_";
Qe[8232] = "\\L";
Qe[8233] = "\\P";
var OS = [
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
], RS = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function CS(e, t) {
  var r, n, i, a, s, o, c;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, a = n.length; i < a; i += 1)
    s = n[i], o = String(t[s]), s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2)), c = e.compiledTypeMap.fallback[s], c && jm.call(c.styleAliases, o) && (o = c.styleAliases[o]), r[s] = o;
  return r;
}
function NS(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new _a("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + Ws.repeat("0", n - t.length) + t;
}
var DS = 1, Ji = 2;
function kS(e) {
  this.schema = e.schema || dS, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = Ws.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = CS(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Ji : DS, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function zf(e, t) {
  for (var r = Ws.repeat(" ", t), n = 0, i = -1, a = "", s, o = e.length; n < o; )
    i = e.indexOf(`
`, n), i === -1 ? (s = e.slice(n), n = o) : (s = e.slice(n, i + 1), n = i + 1), s.length && s !== `
` && (a += r), a += s;
  return a;
}
function Rc(e, t) {
  return `
` + Ws.repeat(" ", e.indent * t);
}
function FS(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function Is(e) {
  return e === mS || e === hS;
}
function Qi(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== ml || 65536 <= e && e <= 1114111;
}
function Wf(e) {
  return Qi(e) && e !== ml && e !== pS && e !== Xi;
}
function Kf(e, t, r) {
  var n = Wf(e), i = n && !Is(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== Mm && e !== Bm && e !== qm && e !== Hm && e !== Gm) && e !== Oc && !(t === As && !i) || Wf(t) && !Is(t) && e === Oc || t === As && i
  );
}
function LS(e) {
  return Qi(e) && e !== ml && !Is(e) && e !== ES && e !== PS && e !== As && e !== Mm && e !== Bm && e !== qm && e !== Hm && e !== Gm && e !== Oc && e !== _S && e !== wS && e !== yS && e !== IS && e !== SS && e !== bS && e !== $S && e !== gS && e !== vS && e !== TS && e !== AS;
}
function xS(e) {
  return !Is(e) && e !== As;
}
function Ri(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function Vm(e) {
  var t = /^\n* /;
  return t.test(e);
}
var zm = 1, Cc = 2, Wm = 3, Km = 4, Fn = 5;
function US(e, t, r, n, i, a, s, o) {
  var c, f = 0, l = null, u = !1, d = !1, p = n !== -1, y = -1, g = LS(Ri(e, 0)) && xS(Ri(e, e.length - 1));
  if (t || s)
    for (c = 0; c < e.length; f >= 65536 ? c += 2 : c++) {
      if (f = Ri(e, c), !Qi(f))
        return Fn;
      g = g && Kf(f, l, o), l = f;
    }
  else {
    for (c = 0; c < e.length; f >= 65536 ? c += 2 : c++) {
      if (f = Ri(e, c), f === Xi)
        u = !0, p && (d = d || // Foldable line = too long, and not more-indented.
        c - y - 1 > n && e[y + 1] !== " ", y = c);
      else if (!Qi(f))
        return Fn;
      g = g && Kf(f, l, o), l = f;
    }
    d = d || p && c - y - 1 > n && e[y + 1] !== " ";
  }
  return !u && !d ? g && !s && !i(e) ? zm : a === Ji ? Fn : Cc : r > 9 && Vm(e) ? Fn : s ? a === Ji ? Fn : Cc : d ? Km : Wm;
}
function jS(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Ji ? '""' : "''";
    if (!e.noCompatMode && (OS.indexOf(t) !== -1 || RS.test(t)))
      return e.quotingType === Ji ? '"' + t + '"' : "'" + t + "'";
    var a = e.indent * Math.max(1, r), s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - a), o = n || e.flowLevel > -1 && r >= e.flowLevel;
    function c(f) {
      return FS(e, f);
    }
    switch (US(
      t,
      o,
      e.indent,
      s,
      c,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case zm:
        return t;
      case Cc:
        return "'" + t.replace(/'/g, "''") + "'";
      case Wm:
        return "|" + Yf(t, e.indent) + Xf(zf(t, a));
      case Km:
        return ">" + Yf(t, e.indent) + Xf(zf(MS(t, s), a));
      case Fn:
        return '"' + BS(t) + '"';
      default:
        throw new _a("impossible error: invalid scalar style");
    }
  }();
}
function Yf(e, t) {
  var r = Vm(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), a = i ? "+" : n ? "" : "-";
  return r + a + `
`;
}
function Xf(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function MS(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, r.lastIndex = f, Jf(e.slice(0, f), t);
  }(), i = e[0] === `
` || e[0] === " ", a, s; s = r.exec(e); ) {
    var o = s[1], c = s[2];
    a = c[0] === " ", n += o + (!i && !a && c !== "" ? `
` : "") + Jf(c, t), i = a;
  }
  return n;
}
function Jf(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, a, s = 0, o = 0, c = ""; n = r.exec(e); )
    o = n.index, o - i > t && (a = s > i ? s : o, c += `
` + e.slice(i, a), i = a + 1), s = o;
  return c += `
`, e.length - i > t && s > i ? c += e.slice(i, s) + `
` + e.slice(s + 1) : c += e.slice(i), c.slice(1);
}
function BS(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = Ri(e, i), n = Qe[r], !n && Qi(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || NS(r);
  return t;
}
function qS(e, t, r) {
  var n = "", i = e.tag, a, s, o;
  for (a = 0, s = r.length; a < s; a += 1)
    o = r[a], e.replacer && (o = e.replacer.call(r, String(a), o)), (rr(e, t, o, !1, !1) || typeof o > "u" && rr(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function Qf(e, t, r, n) {
  var i = "", a = e.tag, s, o, c;
  for (s = 0, o = r.length; s < o; s += 1)
    c = r[s], e.replacer && (c = e.replacer.call(r, String(s), c)), (rr(e, t + 1, c, !0, !0, !1, !0) || typeof c > "u" && rr(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += Rc(e, t)), e.dump && Xi === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = a, e.dump = i || "[]";
}
function HS(e, t, r) {
  var n = "", i = e.tag, a = Object.keys(r), s, o, c, f, l;
  for (s = 0, o = a.length; s < o; s += 1)
    l = "", n !== "" && (l += ", "), e.condenseFlow && (l += '"'), c = a[s], f = r[c], e.replacer && (f = e.replacer.call(r, c, f)), rr(e, t, c, !1, !1) && (e.dump.length > 1024 && (l += "? "), l += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), rr(e, t, f, !1, !1) && (l += e.dump, n += l));
  e.tag = i, e.dump = "{" + n + "}";
}
function GS(e, t, r, n) {
  var i = "", a = e.tag, s = Object.keys(r), o, c, f, l, u, d;
  if (e.sortKeys === !0)
    s.sort();
  else if (typeof e.sortKeys == "function")
    s.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new _a("sortKeys must be a boolean or a function");
  for (o = 0, c = s.length; o < c; o += 1)
    d = "", (!n || i !== "") && (d += Rc(e, t)), f = s[o], l = r[f], e.replacer && (l = e.replacer.call(r, f, l)), rr(e, t + 1, f, !0, !0, !0) && (u = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, u && (e.dump && Xi === e.dump.charCodeAt(0) ? d += "?" : d += "? "), d += e.dump, u && (d += Rc(e, t)), rr(e, t + 1, l, !0, u) && (e.dump && Xi === e.dump.charCodeAt(0) ? d += ":" : d += ": ", d += e.dump, i += d));
  e.tag = a, e.dump = i || "{}";
}
function Zf(e, t, r) {
  var n, i, a, s, o, c;
  for (i = r ? e.explicitTypes : e.implicitTypes, a = 0, s = i.length; a < s; a += 1)
    if (o = i[a], (o.instanceOf || o.predicate) && (!o.instanceOf || typeof t == "object" && t instanceof o.instanceOf) && (!o.predicate || o.predicate(t))) {
      if (r ? o.multi && o.representName ? e.tag = o.representName(t) : e.tag = o.tag : e.tag = "?", o.represent) {
        if (c = e.styleMap[o.tag] || o.defaultStyle, Um.call(o.represent) === "[object Function]")
          n = o.represent(t, c);
        else if (jm.call(o.represent, c))
          n = o.represent[c](t, c);
        else
          throw new _a("!<" + o.tag + '> tag resolver accepts not "' + c + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function rr(e, t, r, n, i, a, s) {
  e.tag = null, e.dump = r, Zf(e, r, !1) || Zf(e, r, !0);
  var o = Um.call(e.dump), c = n, f;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var l = o === "[object Object]" || o === "[object Array]", u, d;
  if (l && (u = e.duplicates.indexOf(r), d = u !== -1), (e.tag !== null && e.tag !== "?" || d || e.indent !== 2 && t > 0) && (i = !1), d && e.usedDuplicates[u])
    e.dump = "*ref_" + u;
  else {
    if (l && d && !e.usedDuplicates[u] && (e.usedDuplicates[u] = !0), o === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (GS(e, t, e.dump, i), d && (e.dump = "&ref_" + u + e.dump)) : (HS(e, t, e.dump), d && (e.dump = "&ref_" + u + " " + e.dump));
    else if (o === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !s && t > 0 ? Qf(e, t - 1, e.dump, i) : Qf(e, t, e.dump, i), d && (e.dump = "&ref_" + u + e.dump)) : (qS(e, t, e.dump), d && (e.dump = "&ref_" + u + " " + e.dump));
    else if (o === "[object String]")
      e.tag !== "?" && jS(e, e.dump, t, a, c);
    else {
      if (o === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new _a("unacceptable kind of an object to dump " + o);
    }
    e.tag !== null && e.tag !== "?" && (f = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? f = "!" + f : f.slice(0, 18) === "tag:yaml.org,2002:" ? f = "!!" + f.slice(18) : f = "!<" + f + ">", e.dump = f + " " + e.dump);
  }
  return !0;
}
function VS(e, t) {
  var r = [], n = [], i, a;
  for (Nc(e, r, n), i = 0, a = n.length; i < a; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(a);
}
function Nc(e, t, r) {
  var n, i, a;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, a = e.length; i < a; i += 1)
        Nc(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, a = n.length; i < a; i += 1)
        Nc(e[n[i]], t, r);
}
function zS(e, t) {
  t = t || {};
  var r = new kS(t);
  r.noRefs || VS(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), rr(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
xm.dump = zS;
var Ym = ul, WS = xm;
function yl(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
Ge.Type = ct;
Ge.Schema = cm;
Ge.FAILSAFE_SCHEMA = dm;
Ge.JSON_SCHEMA = vm;
Ge.CORE_SCHEMA = _m;
Ge.DEFAULT_SCHEMA = dl;
Ge.load = Ym.load;
Ge.loadAll = Ym.loadAll;
Ge.dump = WS.dump;
Ge.YAMLException = va;
Ge.types = {
  binary: bm,
  float: gm,
  map: fm,
  null: hm,
  pairs: Tm,
  set: Am,
  timestamp: Em,
  bool: pm,
  int: mm,
  merge: Sm,
  omap: Pm,
  seq: um,
  str: lm
};
Ge.safeLoad = yl("safeLoad", "load");
Ge.safeLoadAll = yl("safeLoadAll", "loadAll");
Ge.safeDump = yl("safeDump", "dump");
var Ks = {};
Object.defineProperty(Ks, "__esModule", { value: !0 });
Ks.Lazy = void 0;
class KS {
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
Ks.Lazy = KS;
var Dc = { exports: {} };
const YS = "2.0.0", Xm = 256, XS = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, JS = 16, QS = Xm - 6, ZS = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Ys = {
  MAX_LENGTH: Xm,
  MAX_SAFE_COMPONENT_LENGTH: JS,
  MAX_SAFE_BUILD_LENGTH: QS,
  MAX_SAFE_INTEGER: XS,
  RELEASE_TYPES: ZS,
  SEMVER_SPEC_VERSION: YS,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const e1 = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Xs = e1;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = Ys, a = Xs;
  t = e.exports = {};
  const s = t.re = [], o = t.safeRe = [], c = t.src = [], f = t.safeSrc = [], l = t.t = {};
  let u = 0;
  const d = "[a-zA-Z0-9-]", p = [
    ["\\s", 1],
    ["\\d", i],
    [d, n]
  ], y = (_) => {
    for (const [v, w] of p)
      _ = _.split(`${v}*`).join(`${v}{0,${w}}`).split(`${v}+`).join(`${v}{1,${w}}`);
    return _;
  }, g = (_, v, w) => {
    const I = y(v), R = u++;
    a(_, R, v), l[_] = R, c[R] = v, f[R] = I, s[R] = new RegExp(v, w ? "g" : void 0), o[R] = new RegExp(I, w ? "g" : void 0);
  };
  g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${d}*`), g("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${d}+`), g("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), g("FULL", `^${c[l.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), g("LOOSE", `^${c[l.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), g("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), g("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", c[l.COERCE], !0), g("COERCERTLFULL", c[l.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", g("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", g("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Dc, Dc.exports);
var $a = Dc.exports;
const t1 = Object.freeze({ loose: !0 }), r1 = Object.freeze({}), n1 = (e) => e ? typeof e != "object" ? t1 : e : r1;
var gl = n1;
const ed = /^[0-9]+$/, Jm = (e, t) => {
  const r = ed.test(e), n = ed.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, i1 = (e, t) => Jm(t, e);
var Qm = {
  compareIdentifiers: Jm,
  rcompareIdentifiers: i1
};
const qa = Xs, { MAX_LENGTH: td, MAX_SAFE_INTEGER: Ha } = Ys, { safeRe: Ga, t: Va } = $a, a1 = gl, { compareIdentifiers: Tn } = Qm;
let s1 = class xt {
  constructor(t, r) {
    if (r = a1(r), t instanceof xt) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > td)
      throw new TypeError(
        `version is longer than ${td} characters`
      );
    qa("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? Ga[Va.LOOSE] : Ga[Va.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > Ha || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Ha || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Ha || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const a = +i;
        if (a >= 0 && a < Ha)
          return a;
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
    if (qa("SemVer.compare", this.version, this.options, t), !(t instanceof xt)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new xt(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof xt || (t = new xt(t, this.options)), Tn(this.major, t.major) || Tn(this.minor, t.minor) || Tn(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof xt || (t = new xt(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (qa("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Tn(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof xt || (t = new xt(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (qa("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Tn(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const i = `-${r}`.match(this.options.loose ? Ga[Va.PRERELEASELOOSE] : Ga[Va.PRERELEASE]);
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
          let a = this.prerelease.length;
          for (; --a >= 0; )
            typeof this.prerelease[a] == "number" && (this.prerelease[a]++, a = -2);
          if (a === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (r) {
          let a = [r, i];
          n === !1 && (a = [r]), Tn(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var lt = s1;
const rd = lt, o1 = (e, t, r = !1) => {
  if (e instanceof rd)
    return e;
  try {
    return new rd(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var ii = o1;
const c1 = ii, l1 = (e, t) => {
  const r = c1(e, t);
  return r ? r.version : null;
};
var u1 = l1;
const f1 = ii, d1 = (e, t) => {
  const r = f1(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var h1 = d1;
const nd = lt, p1 = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new nd(
      e instanceof nd ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var m1 = p1;
const id = ii, y1 = (e, t) => {
  const r = id(e, null, !0), n = id(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const a = i > 0, s = a ? r : n, o = a ? n : r, c = !!s.prerelease.length;
  if (!!o.prerelease.length && !c) {
    if (!o.patch && !o.minor)
      return "major";
    if (o.compareMain(s) === 0)
      return o.minor && !o.patch ? "minor" : "patch";
  }
  const l = c ? "pre" : "";
  return r.major !== n.major ? l + "major" : r.minor !== n.minor ? l + "minor" : r.patch !== n.patch ? l + "patch" : "prerelease";
};
var g1 = y1;
const v1 = lt, _1 = (e, t) => new v1(e, t).major;
var $1 = _1;
const w1 = lt, E1 = (e, t) => new w1(e, t).minor;
var S1 = E1;
const b1 = lt, P1 = (e, t) => new b1(e, t).patch;
var T1 = P1;
const A1 = ii, I1 = (e, t) => {
  const r = A1(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var O1 = I1;
const ad = lt, R1 = (e, t, r) => new ad(e, r).compare(new ad(t, r));
var Ft = R1;
const C1 = Ft, N1 = (e, t, r) => C1(t, e, r);
var D1 = N1;
const k1 = Ft, F1 = (e, t) => k1(e, t, !0);
var L1 = F1;
const sd = lt, x1 = (e, t, r) => {
  const n = new sd(e, r), i = new sd(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var vl = x1;
const U1 = vl, j1 = (e, t) => e.sort((r, n) => U1(r, n, t));
var M1 = j1;
const B1 = vl, q1 = (e, t) => e.sort((r, n) => B1(n, r, t));
var H1 = q1;
const G1 = Ft, V1 = (e, t, r) => G1(e, t, r) > 0;
var Js = V1;
const z1 = Ft, W1 = (e, t, r) => z1(e, t, r) < 0;
var _l = W1;
const K1 = Ft, Y1 = (e, t, r) => K1(e, t, r) === 0;
var Zm = Y1;
const X1 = Ft, J1 = (e, t, r) => X1(e, t, r) !== 0;
var ey = J1;
const Q1 = Ft, Z1 = (e, t, r) => Q1(e, t, r) >= 0;
var $l = Z1;
const eb = Ft, tb = (e, t, r) => eb(e, t, r) <= 0;
var wl = tb;
const rb = Zm, nb = ey, ib = Js, ab = $l, sb = _l, ob = wl, cb = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return rb(e, r, n);
    case "!=":
      return nb(e, r, n);
    case ">":
      return ib(e, r, n);
    case ">=":
      return ab(e, r, n);
    case "<":
      return sb(e, r, n);
    case "<=":
      return ob(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var ty = cb;
const lb = lt, ub = ii, { safeRe: za, t: Wa } = $a, fb = (e, t) => {
  if (e instanceof lb)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? za[Wa.COERCEFULL] : za[Wa.COERCE]);
  else {
    const c = t.includePrerelease ? za[Wa.COERCERTLFULL] : za[Wa.COERCERTL];
    let f;
    for (; (f = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || f.index + f[0].length !== r.index + r[0].length) && (r = f), c.lastIndex = f.index + f[1].length + f[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", a = r[4] || "0", s = t.includePrerelease && r[5] ? `-${r[5]}` : "", o = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return ub(`${n}.${i}.${a}${s}${o}`, t);
};
var db = fb;
class hb {
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
var pb = hb, Ho, od;
function Lt() {
  if (od) return Ho;
  od = 1;
  const e = /\s+/g;
  class t {
    constructor(L, q) {
      if (q = i(q), L instanceof t)
        return L.loose === !!q.loose && L.includePrerelease === !!q.includePrerelease ? L : new t(L.raw, q);
      if (L instanceof a)
        return this.raw = L.value, this.set = [[L]], this.formatted = void 0, this;
      if (this.options = q, this.loose = !!q.loose, this.includePrerelease = !!q.includePrerelease, this.raw = L.trim().replace(e, " "), this.set = this.raw.split("||").map((x) => this.parseRange(x.trim())).filter((x) => x.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const x = this.set[0];
        if (this.set = this.set.filter((G) => !g(G[0])), this.set.length === 0)
          this.set = [x];
        else if (this.set.length > 1) {
          for (const G of this.set)
            if (G.length === 1 && _(G[0])) {
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
          const q = this.set[L];
          for (let x = 0; x < q.length; x++)
            x > 0 && (this.formatted += " "), this.formatted += q[x].toString().trim();
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
      const x = ((this.options.includePrerelease && p) | (this.options.loose && y)) + ":" + L, G = n.get(x);
      if (G)
        return G;
      const B = this.options.loose, k = B ? c[f.HYPHENRANGELOOSE] : c[f.HYPHENRANGE];
      L = L.replace(k, H(this.options.includePrerelease)), s("hyphen replace", L), L = L.replace(c[f.COMPARATORTRIM], l), s("comparator trim", L), L = L.replace(c[f.TILDETRIM], u), s("tilde trim", L), L = L.replace(c[f.CARETTRIM], d), s("caret trim", L);
      let T = L.split(" ").map((S) => w(S, this.options)).join(" ").split(/\s+/).map((S) => M(S, this.options));
      B && (T = T.filter((S) => (s("loose invalid filter", S, this.options), !!S.match(c[f.COMPARATORLOOSE])))), s("range list", T);
      const C = /* @__PURE__ */ new Map(), O = T.map((S) => new a(S, this.options));
      for (const S of O) {
        if (g(S))
          return [S];
        C.set(S.value, S);
      }
      C.size > 1 && C.has("") && C.delete("");
      const $ = [...C.values()];
      return n.set(x, $), $;
    }
    intersects(L, q) {
      if (!(L instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((x) => v(x, q) && L.set.some((G) => v(G, q) && x.every((B) => G.every((k) => B.intersects(k, q)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(L) {
      if (!L)
        return !1;
      if (typeof L == "string")
        try {
          L = new o(L, this.options);
        } catch {
          return !1;
        }
      for (let q = 0; q < this.set.length; q++)
        if (Z(this.set[q], L, this.options))
          return !0;
      return !1;
    }
  }
  Ho = t;
  const r = pb, n = new r(), i = gl, a = Qs(), s = Xs, o = lt, {
    safeRe: c,
    t: f,
    comparatorTrimReplace: l,
    tildeTrimReplace: u,
    caretTrimReplace: d
  } = $a, { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: y } = Ys, g = (F) => F.value === "<0.0.0-0", _ = (F) => F.value === "", v = (F, L) => {
    let q = !0;
    const x = F.slice();
    let G = x.pop();
    for (; q && x.length; )
      q = x.every((B) => G.intersects(B, L)), G = x.pop();
    return q;
  }, w = (F, L) => (s("comp", F, L), F = J(F, L), s("caret", F), F = R(F, L), s("tildes", F), F = me(F, L), s("xrange", F), F = Q(F, L), s("stars", F), F), I = (F) => !F || F.toLowerCase() === "x" || F === "*", R = (F, L) => F.trim().split(/\s+/).map((q) => j(q, L)).join(" "), j = (F, L) => {
    const q = L.loose ? c[f.TILDELOOSE] : c[f.TILDE];
    return F.replace(q, (x, G, B, k, T) => {
      s("tilde", F, x, G, B, k, T);
      let C;
      return I(G) ? C = "" : I(B) ? C = `>=${G}.0.0 <${+G + 1}.0.0-0` : I(k) ? C = `>=${G}.${B}.0 <${G}.${+B + 1}.0-0` : T ? (s("replaceTilde pr", T), C = `>=${G}.${B}.${k}-${T} <${G}.${+B + 1}.0-0`) : C = `>=${G}.${B}.${k} <${G}.${+B + 1}.0-0`, s("tilde return", C), C;
    });
  }, J = (F, L) => F.trim().split(/\s+/).map((q) => Y(q, L)).join(" "), Y = (F, L) => {
    s("caret", F, L);
    const q = L.loose ? c[f.CARETLOOSE] : c[f.CARET], x = L.includePrerelease ? "-0" : "";
    return F.replace(q, (G, B, k, T, C) => {
      s("caret", F, G, B, k, T, C);
      let O;
      return I(B) ? O = "" : I(k) ? O = `>=${B}.0.0${x} <${+B + 1}.0.0-0` : I(T) ? B === "0" ? O = `>=${B}.${k}.0${x} <${B}.${+k + 1}.0-0` : O = `>=${B}.${k}.0${x} <${+B + 1}.0.0-0` : C ? (s("replaceCaret pr", C), B === "0" ? k === "0" ? O = `>=${B}.${k}.${T}-${C} <${B}.${k}.${+T + 1}-0` : O = `>=${B}.${k}.${T}-${C} <${B}.${+k + 1}.0-0` : O = `>=${B}.${k}.${T}-${C} <${+B + 1}.0.0-0`) : (s("no pr"), B === "0" ? k === "0" ? O = `>=${B}.${k}.${T}${x} <${B}.${k}.${+T + 1}-0` : O = `>=${B}.${k}.${T}${x} <${B}.${+k + 1}.0-0` : O = `>=${B}.${k}.${T} <${+B + 1}.0.0-0`), s("caret return", O), O;
    });
  }, me = (F, L) => (s("replaceXRanges", F, L), F.split(/\s+/).map((q) => b(q, L)).join(" ")), b = (F, L) => {
    F = F.trim();
    const q = L.loose ? c[f.XRANGELOOSE] : c[f.XRANGE];
    return F.replace(q, (x, G, B, k, T, C) => {
      s("xRange", F, x, G, B, k, T, C);
      const O = I(B), $ = O || I(k), S = $ || I(T), D = S;
      return G === "=" && D && (G = ""), C = L.includePrerelease ? "-0" : "", O ? G === ">" || G === "<" ? x = "<0.0.0-0" : x = "*" : G && D ? ($ && (k = 0), T = 0, G === ">" ? (G = ">=", $ ? (B = +B + 1, k = 0, T = 0) : (k = +k + 1, T = 0)) : G === "<=" && (G = "<", $ ? B = +B + 1 : k = +k + 1), G === "<" && (C = "-0"), x = `${G + B}.${k}.${T}${C}`) : $ ? x = `>=${B}.0.0${C} <${+B + 1}.0.0-0` : S && (x = `>=${B}.${k}.0${C} <${B}.${+k + 1}.0-0`), s("xRange return", x), x;
    });
  }, Q = (F, L) => (s("replaceStars", F, L), F.trim().replace(c[f.STAR], "")), M = (F, L) => (s("replaceGTE0", F, L), F.trim().replace(c[L.includePrerelease ? f.GTE0PRE : f.GTE0], "")), H = (F) => (L, q, x, G, B, k, T, C, O, $, S, D) => (I(x) ? q = "" : I(G) ? q = `>=${x}.0.0${F ? "-0" : ""}` : I(B) ? q = `>=${x}.${G}.0${F ? "-0" : ""}` : k ? q = `>=${q}` : q = `>=${q}${F ? "-0" : ""}`, I(O) ? C = "" : I($) ? C = `<${+O + 1}.0.0-0` : I(S) ? C = `<${O}.${+$ + 1}.0-0` : D ? C = `<=${O}.${$}.${S}-${D}` : F ? C = `<${O}.${$}.${+S + 1}-0` : C = `<=${C}`, `${q} ${C}`.trim()), Z = (F, L, q) => {
    for (let x = 0; x < F.length; x++)
      if (!F[x].test(L))
        return !1;
    if (L.prerelease.length && !q.includePrerelease) {
      for (let x = 0; x < F.length; x++)
        if (s(F[x].semver), F[x].semver !== a.ANY && F[x].semver.prerelease.length > 0) {
          const G = F[x].semver;
          if (G.major === L.major && G.minor === L.minor && G.patch === L.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ho;
}
var Go, cd;
function Qs() {
  if (cd) return Go;
  cd = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, u) {
      if (u = r(u), l instanceof t) {
        if (l.loose === !!u.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), s("comparator", l, u), this.options = u, this.loose = !!u.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, s("comp", this);
    }
    parse(l) {
      const u = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], d = l.match(u);
      if (!d)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = d[1] !== void 0 ? d[1] : "", this.operator === "=" && (this.operator = ""), d[2] ? this.semver = new o(d[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (s("Comparator.test", l, this.options.loose), this.semver === e || l === e)
        return !0;
      if (typeof l == "string")
        try {
          l = new o(l, this.options);
        } catch {
          return !1;
        }
      return a(l, this.operator, this.semver, this.options);
    }
    intersects(l, u) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, u).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, u).test(l.semver) : (u = r(u), u.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !u.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || a(this.semver, "<", l.semver, u) && this.operator.startsWith(">") && l.operator.startsWith("<") || a(this.semver, ">", l.semver, u) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  Go = t;
  const r = gl, { safeRe: n, t: i } = $a, a = ty, s = Xs, o = lt, c = Lt();
  return Go;
}
const mb = Lt(), yb = (e, t, r) => {
  try {
    t = new mb(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var Zs = yb;
const gb = Lt(), vb = (e, t) => new gb(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var _b = vb;
const $b = lt, wb = Lt(), Eb = (e, t, r) => {
  let n = null, i = null, a = null;
  try {
    a = new wb(t, r);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    a.test(s) && (!n || i.compare(s) === -1) && (n = s, i = new $b(n, r));
  }), n;
};
var Sb = Eb;
const bb = lt, Pb = Lt(), Tb = (e, t, r) => {
  let n = null, i = null, a = null;
  try {
    a = new Pb(t, r);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    a.test(s) && (!n || i.compare(s) === 1) && (n = s, i = new bb(n, r));
  }), n;
};
var Ab = Tb;
const Vo = lt, Ib = Lt(), ld = Js, Ob = (e, t) => {
  e = new Ib(e, t);
  let r = new Vo("0.0.0");
  if (e.test(r) || (r = new Vo("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let a = null;
    i.forEach((s) => {
      const o = new Vo(s.semver.version);
      switch (s.operator) {
        case ">":
          o.prerelease.length === 0 ? o.patch++ : o.prerelease.push(0), o.raw = o.format();
        case "":
        case ">=":
          (!a || ld(o, a)) && (a = o);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${s.operator}`);
      }
    }), a && (!r || ld(r, a)) && (r = a);
  }
  return r && e.test(r) ? r : null;
};
var Rb = Ob;
const Cb = Lt(), Nb = (e, t) => {
  try {
    return new Cb(e, t).range || "*";
  } catch {
    return null;
  }
};
var Db = Nb;
const kb = lt, ry = Qs(), { ANY: Fb } = ry, Lb = Lt(), xb = Zs, ud = Js, fd = _l, Ub = wl, jb = $l, Mb = (e, t, r, n) => {
  e = new kb(e, n), t = new Lb(t, n);
  let i, a, s, o, c;
  switch (r) {
    case ">":
      i = ud, a = Ub, s = fd, o = ">", c = ">=";
      break;
    case "<":
      i = fd, a = jb, s = ud, o = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (xb(e, t, n))
    return !1;
  for (let f = 0; f < t.set.length; ++f) {
    const l = t.set[f];
    let u = null, d = null;
    if (l.forEach((p) => {
      p.semver === Fb && (p = new ry(">=0.0.0")), u = u || p, d = d || p, i(p.semver, u.semver, n) ? u = p : s(p.semver, d.semver, n) && (d = p);
    }), u.operator === o || u.operator === c || (!d.operator || d.operator === o) && a(e, d.semver))
      return !1;
    if (d.operator === c && s(e, d.semver))
      return !1;
  }
  return !0;
};
var El = Mb;
const Bb = El, qb = (e, t, r) => Bb(e, t, ">", r);
var Hb = qb;
const Gb = El, Vb = (e, t, r) => Gb(e, t, "<", r);
var zb = Vb;
const dd = Lt(), Wb = (e, t, r) => (e = new dd(e, r), t = new dd(t, r), e.intersects(t, r));
var Kb = Wb;
const Yb = Zs, Xb = Ft;
var Jb = (e, t, r) => {
  const n = [];
  let i = null, a = null;
  const s = e.sort((l, u) => Xb(l, u, r));
  for (const l of s)
    Yb(l, t, r) ? (a = l, i || (i = l)) : (a && n.push([i, a]), a = null, i = null);
  i && n.push([i, null]);
  const o = [];
  for (const [l, u] of n)
    l === u ? o.push(l) : !u && l === s[0] ? o.push("*") : u ? l === s[0] ? o.push(`<=${u}`) : o.push(`${l} - ${u}`) : o.push(`>=${l}`);
  const c = o.join(" || "), f = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < f.length ? c : t;
};
const hd = Lt(), Sl = Qs(), { ANY: zo } = Sl, bi = Zs, bl = Ft, Qb = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new hd(e, r), t = new hd(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const a of t.set) {
      const s = eP(i, a, r);
      if (n = n || s !== null, s)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, Zb = [new Sl(">=0.0.0-0")], pd = [new Sl(">=0.0.0")], eP = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === zo) {
    if (t.length === 1 && t[0].semver === zo)
      return !0;
    r.includePrerelease ? e = Zb : e = pd;
  }
  if (t.length === 1 && t[0].semver === zo) {
    if (r.includePrerelease)
      return !0;
    t = pd;
  }
  const n = /* @__PURE__ */ new Set();
  let i, a;
  for (const p of e)
    p.operator === ">" || p.operator === ">=" ? i = md(i, p, r) : p.operator === "<" || p.operator === "<=" ? a = yd(a, p, r) : n.add(p.semver);
  if (n.size > 1)
    return null;
  let s;
  if (i && a) {
    if (s = bl(i.semver, a.semver, r), s > 0)
      return null;
    if (s === 0 && (i.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const p of n) {
    if (i && !bi(p, String(i), r) || a && !bi(p, String(a), r))
      return null;
    for (const y of t)
      if (!bi(p, String(y), r))
        return !1;
    return !0;
  }
  let o, c, f, l, u = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, d = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  u && u.prerelease.length === 1 && a.operator === "<" && u.prerelease[0] === 0 && (u = !1);
  for (const p of t) {
    if (l = l || p.operator === ">" || p.operator === ">=", f = f || p.operator === "<" || p.operator === "<=", i) {
      if (d && p.semver.prerelease && p.semver.prerelease.length && p.semver.major === d.major && p.semver.minor === d.minor && p.semver.patch === d.patch && (d = !1), p.operator === ">" || p.operator === ">=") {
        if (o = md(i, p, r), o === p && o !== i)
          return !1;
      } else if (i.operator === ">=" && !bi(i.semver, String(p), r))
        return !1;
    }
    if (a) {
      if (u && p.semver.prerelease && p.semver.prerelease.length && p.semver.major === u.major && p.semver.minor === u.minor && p.semver.patch === u.patch && (u = !1), p.operator === "<" || p.operator === "<=") {
        if (c = yd(a, p, r), c === p && c !== a)
          return !1;
      } else if (a.operator === "<=" && !bi(a.semver, String(p), r))
        return !1;
    }
    if (!p.operator && (a || i) && s !== 0)
      return !1;
  }
  return !(i && f && !a && s !== 0 || a && l && !i && s !== 0 || d || u);
}, md = (e, t, r) => {
  if (!e)
    return t;
  const n = bl(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, yd = (e, t, r) => {
  if (!e)
    return t;
  const n = bl(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var tP = Qb;
const Wo = $a, gd = Ys, rP = lt, vd = Qm, nP = ii, iP = u1, aP = h1, sP = m1, oP = g1, cP = $1, lP = S1, uP = T1, fP = O1, dP = Ft, hP = D1, pP = L1, mP = vl, yP = M1, gP = H1, vP = Js, _P = _l, $P = Zm, wP = ey, EP = $l, SP = wl, bP = ty, PP = db, TP = Qs(), AP = Lt(), IP = Zs, OP = _b, RP = Sb, CP = Ab, NP = Rb, DP = Db, kP = El, FP = Hb, LP = zb, xP = Kb, UP = Jb, jP = tP;
var Pl = {
  parse: nP,
  valid: iP,
  clean: aP,
  inc: sP,
  diff: oP,
  major: cP,
  minor: lP,
  patch: uP,
  prerelease: fP,
  compare: dP,
  rcompare: hP,
  compareLoose: pP,
  compareBuild: mP,
  sort: yP,
  rsort: gP,
  gt: vP,
  lt: _P,
  eq: $P,
  neq: wP,
  gte: EP,
  lte: SP,
  cmp: bP,
  coerce: PP,
  Comparator: TP,
  Range: AP,
  satisfies: IP,
  toComparators: OP,
  maxSatisfying: RP,
  minSatisfying: CP,
  minVersion: NP,
  validRange: DP,
  outside: kP,
  gtr: FP,
  ltr: LP,
  intersects: xP,
  simplifyRange: UP,
  subset: jP,
  SemVer: rP,
  re: Wo.re,
  src: Wo.src,
  tokens: Wo.t,
  SEMVER_SPEC_VERSION: gd.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: gd.RELEASE_TYPES,
  compareIdentifiers: vd.compareIdentifiers,
  rcompareIdentifiers: vd.rcompareIdentifiers
};
const An = /* @__PURE__ */ js(Pl);
var wa = {}, Os = { exports: {} };
Os.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, a = 2, s = 9007199254740991, o = "[object Arguments]", c = "[object Array]", f = "[object AsyncFunction]", l = "[object Boolean]", u = "[object Date]", d = "[object Error]", p = "[object Function]", y = "[object GeneratorFunction]", g = "[object Map]", _ = "[object Number]", v = "[object Null]", w = "[object Object]", I = "[object Promise]", R = "[object Proxy]", j = "[object RegExp]", J = "[object Set]", Y = "[object String]", me = "[object Symbol]", b = "[object Undefined]", Q = "[object WeakMap]", M = "[object ArrayBuffer]", H = "[object DataView]", Z = "[object Float32Array]", F = "[object Float64Array]", L = "[object Int8Array]", q = "[object Int16Array]", x = "[object Int32Array]", G = "[object Uint8Array]", B = "[object Uint8ClampedArray]", k = "[object Uint16Array]", T = "[object Uint32Array]", C = /[\\^$.*+?()[\]{}|]/g, O = /^\[object .+?Constructor\]$/, $ = /^(?:0|[1-9]\d*)$/, S = {};
  S[Z] = S[F] = S[L] = S[q] = S[x] = S[G] = S[B] = S[k] = S[T] = !0, S[o] = S[c] = S[M] = S[l] = S[H] = S[u] = S[d] = S[p] = S[g] = S[_] = S[w] = S[j] = S[J] = S[Y] = S[Q] = !1;
  var D = typeof nt == "object" && nt && nt.Object === Object && nt, m = typeof self == "object" && self && self.Object === Object && self, h = D || m || Function("return this")(), N = t && !t.nodeType && t, P = N && !0 && e && !e.nodeType && e, ee = P && P.exports === N, pe = ee && D.process, ve = function() {
    try {
      return pe && pe.binding && pe.binding("util");
    } catch {
    }
  }(), Ie = ve && ve.isTypedArray;
  function Re(E, A) {
    for (var U = -1, z = E == null ? 0 : E.length, _e = 0, ie = []; ++U < z; ) {
      var Te = E[U];
      A(Te, U, E) && (ie[_e++] = Te);
    }
    return ie;
  }
  function $t(E, A) {
    for (var U = -1, z = A.length, _e = E.length; ++U < z; )
      E[_e + U] = A[U];
    return E;
  }
  function Se(E, A) {
    for (var U = -1, z = E == null ? 0 : E.length; ++U < z; )
      if (A(E[U], U, E))
        return !0;
    return !1;
  }
  function Ze(E, A) {
    for (var U = -1, z = Array(E); ++U < E; )
      z[U] = A(U);
    return z;
  }
  function Gr(E) {
    return function(A) {
      return E(A);
    };
  }
  function sr(E, A) {
    return E.has(A);
  }
  function Vt(E, A) {
    return E == null ? void 0 : E[A];
  }
  function or(E) {
    var A = -1, U = Array(E.size);
    return E.forEach(function(z, _e) {
      U[++A] = [_e, z];
    }), U;
  }
  function di(E, A) {
    return function(U) {
      return E(A(U));
    };
  }
  function hi(E) {
    var A = -1, U = Array(E.size);
    return E.forEach(function(z) {
      U[++A] = z;
    }), U;
  }
  var pi = Array.prototype, Vr = Function.prototype, cr = Object.prototype, En = h["__core-js_shared__"], mi = Vr.toString, wt = cr.hasOwnProperty, Uu = function() {
    var E = /[^.]+$/.exec(En && En.keys && En.keys.IE_PROTO || "");
    return E ? "Symbol(src)_1." + E : "";
  }(), ju = cr.toString, m0 = RegExp(
    "^" + mi.call(wt).replace(C, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Mu = ee ? h.Buffer : void 0, Oa = h.Symbol, Bu = h.Uint8Array, qu = cr.propertyIsEnumerable, y0 = pi.splice, zr = Oa ? Oa.toStringTag : void 0, Hu = Object.getOwnPropertySymbols, g0 = Mu ? Mu.isBuffer : void 0, v0 = di(Object.keys, Object), Po = Sn(h, "DataView"), yi = Sn(h, "Map"), To = Sn(h, "Promise"), Ao = Sn(h, "Set"), Io = Sn(h, "WeakMap"), gi = Sn(Object, "create"), _0 = Yr(Po), $0 = Yr(yi), w0 = Yr(To), E0 = Yr(Ao), S0 = Yr(Io), Gu = Oa ? Oa.prototype : void 0, Oo = Gu ? Gu.valueOf : void 0;
  function Wr(E) {
    var A = -1, U = E == null ? 0 : E.length;
    for (this.clear(); ++A < U; ) {
      var z = E[A];
      this.set(z[0], z[1]);
    }
  }
  function b0() {
    this.__data__ = gi ? gi(null) : {}, this.size = 0;
  }
  function P0(E) {
    var A = this.has(E) && delete this.__data__[E];
    return this.size -= A ? 1 : 0, A;
  }
  function T0(E) {
    var A = this.__data__;
    if (gi) {
      var U = A[E];
      return U === n ? void 0 : U;
    }
    return wt.call(A, E) ? A[E] : void 0;
  }
  function A0(E) {
    var A = this.__data__;
    return gi ? A[E] !== void 0 : wt.call(A, E);
  }
  function I0(E, A) {
    var U = this.__data__;
    return this.size += this.has(E) ? 0 : 1, U[E] = gi && A === void 0 ? n : A, this;
  }
  Wr.prototype.clear = b0, Wr.prototype.delete = P0, Wr.prototype.get = T0, Wr.prototype.has = A0, Wr.prototype.set = I0;
  function zt(E) {
    var A = -1, U = E == null ? 0 : E.length;
    for (this.clear(); ++A < U; ) {
      var z = E[A];
      this.set(z[0], z[1]);
    }
  }
  function O0() {
    this.__data__ = [], this.size = 0;
  }
  function R0(E) {
    var A = this.__data__, U = Ca(A, E);
    if (U < 0)
      return !1;
    var z = A.length - 1;
    return U == z ? A.pop() : y0.call(A, U, 1), --this.size, !0;
  }
  function C0(E) {
    var A = this.__data__, U = Ca(A, E);
    return U < 0 ? void 0 : A[U][1];
  }
  function N0(E) {
    return Ca(this.__data__, E) > -1;
  }
  function D0(E, A) {
    var U = this.__data__, z = Ca(U, E);
    return z < 0 ? (++this.size, U.push([E, A])) : U[z][1] = A, this;
  }
  zt.prototype.clear = O0, zt.prototype.delete = R0, zt.prototype.get = C0, zt.prototype.has = N0, zt.prototype.set = D0;
  function Kr(E) {
    var A = -1, U = E == null ? 0 : E.length;
    for (this.clear(); ++A < U; ) {
      var z = E[A];
      this.set(z[0], z[1]);
    }
  }
  function k0() {
    this.size = 0, this.__data__ = {
      hash: new Wr(),
      map: new (yi || zt)(),
      string: new Wr()
    };
  }
  function F0(E) {
    var A = Na(this, E).delete(E);
    return this.size -= A ? 1 : 0, A;
  }
  function L0(E) {
    return Na(this, E).get(E);
  }
  function x0(E) {
    return Na(this, E).has(E);
  }
  function U0(E, A) {
    var U = Na(this, E), z = U.size;
    return U.set(E, A), this.size += U.size == z ? 0 : 1, this;
  }
  Kr.prototype.clear = k0, Kr.prototype.delete = F0, Kr.prototype.get = L0, Kr.prototype.has = x0, Kr.prototype.set = U0;
  function Ra(E) {
    var A = -1, U = E == null ? 0 : E.length;
    for (this.__data__ = new Kr(); ++A < U; )
      this.add(E[A]);
  }
  function j0(E) {
    return this.__data__.set(E, n), this;
  }
  function M0(E) {
    return this.__data__.has(E);
  }
  Ra.prototype.add = Ra.prototype.push = j0, Ra.prototype.has = M0;
  function lr(E) {
    var A = this.__data__ = new zt(E);
    this.size = A.size;
  }
  function B0() {
    this.__data__ = new zt(), this.size = 0;
  }
  function q0(E) {
    var A = this.__data__, U = A.delete(E);
    return this.size = A.size, U;
  }
  function H0(E) {
    return this.__data__.get(E);
  }
  function G0(E) {
    return this.__data__.has(E);
  }
  function V0(E, A) {
    var U = this.__data__;
    if (U instanceof zt) {
      var z = U.__data__;
      if (!yi || z.length < r - 1)
        return z.push([E, A]), this.size = ++U.size, this;
      U = this.__data__ = new Kr(z);
    }
    return U.set(E, A), this.size = U.size, this;
  }
  lr.prototype.clear = B0, lr.prototype.delete = q0, lr.prototype.get = H0, lr.prototype.has = G0, lr.prototype.set = V0;
  function z0(E, A) {
    var U = Da(E), z = !U && ov(E), _e = !U && !z && Ro(E), ie = !U && !z && !_e && Zu(E), Te = U || z || _e || ie, Le = Te ? Ze(E.length, String) : [], Me = Le.length;
    for (var be in E)
      wt.call(E, be) && !(Te && // Safari 9 has enumerable `arguments.length` in strict mode.
      (be == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      _e && (be == "offset" || be == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      ie && (be == "buffer" || be == "byteLength" || be == "byteOffset") || // Skip index properties.
      rv(be, Me))) && Le.push(be);
    return Le;
  }
  function Ca(E, A) {
    for (var U = E.length; U--; )
      if (Yu(E[U][0], A))
        return U;
    return -1;
  }
  function W0(E, A, U) {
    var z = A(E);
    return Da(E) ? z : $t(z, U(E));
  }
  function vi(E) {
    return E == null ? E === void 0 ? b : v : zr && zr in Object(E) ? ev(E) : sv(E);
  }
  function Vu(E) {
    return _i(E) && vi(E) == o;
  }
  function zu(E, A, U, z, _e) {
    return E === A ? !0 : E == null || A == null || !_i(E) && !_i(A) ? E !== E && A !== A : K0(E, A, U, z, zu, _e);
  }
  function K0(E, A, U, z, _e, ie) {
    var Te = Da(E), Le = Da(A), Me = Te ? c : ur(E), be = Le ? c : ur(A);
    Me = Me == o ? w : Me, be = be == o ? w : be;
    var pt = Me == w, It = be == w, Ve = Me == be;
    if (Ve && Ro(E)) {
      if (!Ro(A))
        return !1;
      Te = !0, pt = !1;
    }
    if (Ve && !pt)
      return ie || (ie = new lr()), Te || Zu(E) ? Wu(E, A, U, z, _e, ie) : Q0(E, A, Me, U, z, _e, ie);
    if (!(U & i)) {
      var Et = pt && wt.call(E, "__wrapped__"), St = It && wt.call(A, "__wrapped__");
      if (Et || St) {
        var fr = Et ? E.value() : E, Wt = St ? A.value() : A;
        return ie || (ie = new lr()), _e(fr, Wt, U, z, ie);
      }
    }
    return Ve ? (ie || (ie = new lr()), Z0(E, A, U, z, _e, ie)) : !1;
  }
  function Y0(E) {
    if (!Qu(E) || iv(E))
      return !1;
    var A = Xu(E) ? m0 : O;
    return A.test(Yr(E));
  }
  function X0(E) {
    return _i(E) && Ju(E.length) && !!S[vi(E)];
  }
  function J0(E) {
    if (!av(E))
      return v0(E);
    var A = [];
    for (var U in Object(E))
      wt.call(E, U) && U != "constructor" && A.push(U);
    return A;
  }
  function Wu(E, A, U, z, _e, ie) {
    var Te = U & i, Le = E.length, Me = A.length;
    if (Le != Me && !(Te && Me > Le))
      return !1;
    var be = ie.get(E);
    if (be && ie.get(A))
      return be == A;
    var pt = -1, It = !0, Ve = U & a ? new Ra() : void 0;
    for (ie.set(E, A), ie.set(A, E); ++pt < Le; ) {
      var Et = E[pt], St = A[pt];
      if (z)
        var fr = Te ? z(St, Et, pt, A, E, ie) : z(Et, St, pt, E, A, ie);
      if (fr !== void 0) {
        if (fr)
          continue;
        It = !1;
        break;
      }
      if (Ve) {
        if (!Se(A, function(Wt, Xr) {
          if (!sr(Ve, Xr) && (Et === Wt || _e(Et, Wt, U, z, ie)))
            return Ve.push(Xr);
        })) {
          It = !1;
          break;
        }
      } else if (!(Et === St || _e(Et, St, U, z, ie))) {
        It = !1;
        break;
      }
    }
    return ie.delete(E), ie.delete(A), It;
  }
  function Q0(E, A, U, z, _e, ie, Te) {
    switch (U) {
      case H:
        if (E.byteLength != A.byteLength || E.byteOffset != A.byteOffset)
          return !1;
        E = E.buffer, A = A.buffer;
      case M:
        return !(E.byteLength != A.byteLength || !ie(new Bu(E), new Bu(A)));
      case l:
      case u:
      case _:
        return Yu(+E, +A);
      case d:
        return E.name == A.name && E.message == A.message;
      case j:
      case Y:
        return E == A + "";
      case g:
        var Le = or;
      case J:
        var Me = z & i;
        if (Le || (Le = hi), E.size != A.size && !Me)
          return !1;
        var be = Te.get(E);
        if (be)
          return be == A;
        z |= a, Te.set(E, A);
        var pt = Wu(Le(E), Le(A), z, _e, ie, Te);
        return Te.delete(E), pt;
      case me:
        if (Oo)
          return Oo.call(E) == Oo.call(A);
    }
    return !1;
  }
  function Z0(E, A, U, z, _e, ie) {
    var Te = U & i, Le = Ku(E), Me = Le.length, be = Ku(A), pt = be.length;
    if (Me != pt && !Te)
      return !1;
    for (var It = Me; It--; ) {
      var Ve = Le[It];
      if (!(Te ? Ve in A : wt.call(A, Ve)))
        return !1;
    }
    var Et = ie.get(E);
    if (Et && ie.get(A))
      return Et == A;
    var St = !0;
    ie.set(E, A), ie.set(A, E);
    for (var fr = Te; ++It < Me; ) {
      Ve = Le[It];
      var Wt = E[Ve], Xr = A[Ve];
      if (z)
        var ef = Te ? z(Xr, Wt, Ve, A, E, ie) : z(Wt, Xr, Ve, E, A, ie);
      if (!(ef === void 0 ? Wt === Xr || _e(Wt, Xr, U, z, ie) : ef)) {
        St = !1;
        break;
      }
      fr || (fr = Ve == "constructor");
    }
    if (St && !fr) {
      var ka = E.constructor, Fa = A.constructor;
      ka != Fa && "constructor" in E && "constructor" in A && !(typeof ka == "function" && ka instanceof ka && typeof Fa == "function" && Fa instanceof Fa) && (St = !1);
    }
    return ie.delete(E), ie.delete(A), St;
  }
  function Ku(E) {
    return W0(E, uv, tv);
  }
  function Na(E, A) {
    var U = E.__data__;
    return nv(A) ? U[typeof A == "string" ? "string" : "hash"] : U.map;
  }
  function Sn(E, A) {
    var U = Vt(E, A);
    return Y0(U) ? U : void 0;
  }
  function ev(E) {
    var A = wt.call(E, zr), U = E[zr];
    try {
      E[zr] = void 0;
      var z = !0;
    } catch {
    }
    var _e = ju.call(E);
    return z && (A ? E[zr] = U : delete E[zr]), _e;
  }
  var tv = Hu ? function(E) {
    return E == null ? [] : (E = Object(E), Re(Hu(E), function(A) {
      return qu.call(E, A);
    }));
  } : fv, ur = vi;
  (Po && ur(new Po(new ArrayBuffer(1))) != H || yi && ur(new yi()) != g || To && ur(To.resolve()) != I || Ao && ur(new Ao()) != J || Io && ur(new Io()) != Q) && (ur = function(E) {
    var A = vi(E), U = A == w ? E.constructor : void 0, z = U ? Yr(U) : "";
    if (z)
      switch (z) {
        case _0:
          return H;
        case $0:
          return g;
        case w0:
          return I;
        case E0:
          return J;
        case S0:
          return Q;
      }
    return A;
  });
  function rv(E, A) {
    return A = A ?? s, !!A && (typeof E == "number" || $.test(E)) && E > -1 && E % 1 == 0 && E < A;
  }
  function nv(E) {
    var A = typeof E;
    return A == "string" || A == "number" || A == "symbol" || A == "boolean" ? E !== "__proto__" : E === null;
  }
  function iv(E) {
    return !!Uu && Uu in E;
  }
  function av(E) {
    var A = E && E.constructor, U = typeof A == "function" && A.prototype || cr;
    return E === U;
  }
  function sv(E) {
    return ju.call(E);
  }
  function Yr(E) {
    if (E != null) {
      try {
        return mi.call(E);
      } catch {
      }
      try {
        return E + "";
      } catch {
      }
    }
    return "";
  }
  function Yu(E, A) {
    return E === A || E !== E && A !== A;
  }
  var ov = Vu(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Vu : function(E) {
    return _i(E) && wt.call(E, "callee") && !qu.call(E, "callee");
  }, Da = Array.isArray;
  function cv(E) {
    return E != null && Ju(E.length) && !Xu(E);
  }
  var Ro = g0 || dv;
  function lv(E, A) {
    return zu(E, A);
  }
  function Xu(E) {
    if (!Qu(E))
      return !1;
    var A = vi(E);
    return A == p || A == y || A == f || A == R;
  }
  function Ju(E) {
    return typeof E == "number" && E > -1 && E % 1 == 0 && E <= s;
  }
  function Qu(E) {
    var A = typeof E;
    return E != null && (A == "object" || A == "function");
  }
  function _i(E) {
    return E != null && typeof E == "object";
  }
  var Zu = Ie ? Gr(Ie) : X0;
  function uv(E) {
    return cv(E) ? z0(E) : J0(E);
  }
  function fv() {
    return [];
  }
  function dv() {
    return !1;
  }
  e.exports = lv;
})(Os, Os.exports);
var MP = Os.exports;
Object.defineProperty(wa, "__esModule", { value: !0 });
wa.DownloadedUpdateHelper = void 0;
wa.createTempUpdateFile = VP;
const BP = ha, qP = Lr, _d = MP, tn = xr, xi = le;
class HP {
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
    return xi.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, r, n, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return _d(this.versionInfo, r) && _d(this.fileInfo.info, n.info) && await (0, tn.pathExists)(t) ? t : null;
    const a = await this.getValidCachedUpdateFile(n, i);
    return a === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = a, a);
  }
  async setDownloadedFile(t, r, n, i, a, s) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: a,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, s && await (0, tn.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, tn.emptyDir)(this.cacheDirForPendingUpdate);
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
    if (!await (0, tn.pathExists)(n))
      return null;
    let a;
    try {
      a = await (0, tn.readJson)(n);
    } catch (f) {
      let l = "No cached update info available";
      return f.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), l += ` (error on read: ${f.message})`), r.info(l), null;
    }
    if (!((a == null ? void 0 : a.fileName) !== null))
      return r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== a.sha512)
      return r.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${a.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const o = xi.join(this.cacheDirForPendingUpdate, a.fileName);
    if (!await (0, tn.pathExists)(o))
      return r.info("Cached update file doesn't exist"), null;
    const c = await GP(o);
    return t.info.sha512 !== c ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${c}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = a, o);
  }
  getUpdateInfoFile() {
    return xi.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
wa.DownloadedUpdateHelper = HP;
function GP(e, t = "sha512", r = "base64", n) {
  return new Promise((i, a) => {
    const s = (0, BP.createHash)(t);
    s.on("error", a).setEncoding(r), (0, qP.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", a).on("end", () => {
      s.end(), i(s.read());
    }).pipe(s, { end: !1 });
  });
}
async function VP(e, t, r) {
  let n = 0, i = xi.join(t, e);
  for (let a = 0; a < 3; a++)
    try {
      return await (0, tn.unlink)(i), i;
    } catch (s) {
      if (s.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${s}`), i = xi.join(t, `${n++}-${e}`);
    }
  return i;
}
var eo = {}, Tl = {};
Object.defineProperty(Tl, "__esModule", { value: !0 });
Tl.getAppCacheDir = WP;
const Ko = le, zP = xs;
function WP() {
  const e = (0, zP.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || Ko.join(e, "AppData", "Local") : process.platform === "darwin" ? t = Ko.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || Ko.join(e, ".cache"), t;
}
Object.defineProperty(eo, "__esModule", { value: !0 });
eo.ElectronAppAdapter = void 0;
const $d = le, KP = Tl;
class YP {
  constructor(t = tr.app) {
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
    return this.isPackaged ? $d.join(process.resourcesPath, "app-update.yml") : $d.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, KP.getAppCacheDir)();
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
eo.ElectronAppAdapter = YP;
var ny = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = r;
  const t = je;
  e.NET_SESSION_NAME = "electron-updater";
  function r() {
    return tr.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class n extends t.HttpExecutor {
    constructor(a) {
      super(), this.proxyLoginCallback = a, this.cachedSession = null;
    }
    async download(a, s, o) {
      return await o.cancellationToken.createPromise((c, f, l) => {
        const u = {
          headers: o.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(a, u), (0, t.configureRequestOptions)(u), this.doDownload(u, {
          destination: s,
          options: o,
          onCancel: l,
          callback: (d) => {
            d == null ? c(s) : f(d);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(a, s) {
      a.headers && a.headers.Host && (a.host = a.headers.Host, delete a.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const o = tr.net.request({
        ...a,
        session: this.cachedSession
      });
      return o.on("response", s), this.proxyLoginCallback != null && o.on("login", this.proxyLoginCallback), o;
    }
    addRedirectHandlers(a, s, o, c, f) {
      a.on("redirect", (l, u, d) => {
        a.abort(), c > this.maxRedirects ? o(this.createMaxRedirectError()) : f(t.HttpExecutor.prepareRedirectUrlOptions(d, s));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(ny);
var Ea = {}, At = {}, XP = "[object Symbol]", iy = /[\\^$.*+?()[\]{}|]/g, JP = RegExp(iy.source), QP = typeof nt == "object" && nt && nt.Object === Object && nt, ZP = typeof self == "object" && self && self.Object === Object && self, eT = QP || ZP || Function("return this")(), tT = Object.prototype, rT = tT.toString, wd = eT.Symbol, Ed = wd ? wd.prototype : void 0, Sd = Ed ? Ed.toString : void 0;
function nT(e) {
  if (typeof e == "string")
    return e;
  if (aT(e))
    return Sd ? Sd.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function iT(e) {
  return !!e && typeof e == "object";
}
function aT(e) {
  return typeof e == "symbol" || iT(e) && rT.call(e) == XP;
}
function sT(e) {
  return e == null ? "" : nT(e);
}
function oT(e) {
  return e = sT(e), e && JP.test(e) ? e.replace(iy, "\\$&") : e;
}
var cT = oT;
Object.defineProperty(At, "__esModule", { value: !0 });
At.newBaseUrl = uT;
At.newUrlFromBase = kc;
At.getChannelFilename = fT;
At.blockmapFiles = dT;
const ay = ti, lT = cT;
function uT(e) {
  const t = new ay.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function kc(e, t, r = !1) {
  const n = new ay.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
}
function fT(e) {
  return `${e}.yml`;
}
function dT(e, t, r) {
  const n = kc(`${e.pathname}.blockmap`, e);
  return [kc(`${e.pathname.replace(new RegExp(lT(r), "g"), t)}.blockmap`, e), n];
}
var Fe = {};
Object.defineProperty(Fe, "__esModule", { value: !0 });
Fe.Provider = void 0;
Fe.findFile = mT;
Fe.parseUpdateInfo = yT;
Fe.getFileList = sy;
Fe.resolveFiles = gT;
const kr = je, hT = Ge, bd = At;
class pT {
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
    return this.requestHeaders == null ? r != null && (n.headers = r) : n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, kr.configureRequestUrl)(t, n), n;
  }
}
Fe.Provider = pT;
function mT(e, t, r) {
  if (e.length === 0)
    throw (0, kr.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const n = e.find((i) => i.url.pathname.toLowerCase().endsWith(`.${t}`));
  return n ?? (r == null ? e[0] : e.find((i) => !r.some((a) => i.url.pathname.toLowerCase().endsWith(`.${a}`))));
}
function yT(e, t, r) {
  if (e == null)
    throw (0, kr.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let n;
  try {
    n = (0, hT.load)(e);
  } catch (i) {
    throw (0, kr.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return n;
}
function sy(e) {
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
  throw (0, kr.newError)(`No files provided: ${(0, kr.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function gT(e, t, r = (n) => n) {
  const i = sy(e).map((o) => {
    if (o.sha2 == null && o.sha512 == null)
      throw (0, kr.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, kr.safeStringifyJson)(o)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, bd.newUrlFromBase)(r(o.url), t),
      info: o
    };
  }), a = e.packages, s = a == null ? null : a[process.arch] || a.ia32;
  return s != null && (i[0].packageInfo = {
    ...s,
    path: (0, bd.newUrlFromBase)(r(s.path), t).href
  }), i;
}
Object.defineProperty(Ea, "__esModule", { value: !0 });
Ea.GenericProvider = void 0;
const Pd = je, Yo = At, Xo = Fe;
class vT extends Xo.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, Yo.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, Yo.getChannelFilename)(this.channel), r = (0, Yo.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, Xo.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof Pd.HttpError && i.statusCode === 404)
          throw (0, Pd.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && n < 3) {
          await new Promise((a, s) => {
            try {
              setTimeout(a, 1e3 * n);
            } catch (o) {
              s(o);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, Xo.resolveFiles)(t, this.baseUrl);
  }
}
Ea.GenericProvider = vT;
var to = {}, ro = {};
Object.defineProperty(ro, "__esModule", { value: !0 });
ro.BitbucketProvider = void 0;
const Td = je, Jo = At, Qo = Fe;
class _T extends Qo.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: a } = t;
    this.baseUrl = (0, Jo.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${a}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new Td.CancellationToken(), r = (0, Jo.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, Jo.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, Qo.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Td.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Qo.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
ro.BitbucketProvider = _T;
var Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
Fr.GitHubProvider = Fr.BaseGitHubProvider = void 0;
Fr.computeReleaseNotes = cy;
const Yt = je, jn = Pl, $T = ti, Mn = At, Fc = Fe, Zo = /\/tag\/([^/]+)$/;
class oy extends Fc.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, Mn.newBaseUrl)((0, Yt.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, Mn.newBaseUrl)((0, Yt.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
Fr.BaseGitHubProvider = oy;
class wT extends oy {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, r, n, i, a;
    const s = new Yt.CancellationToken(), o = await this.httpRequest((0, Mn.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, s), c = (0, Yt.parseXml)(o);
    let f = c.element("entry", !1, "No published versions on GitHub"), l = null;
    try {
      if (this.updater.allowPrerelease) {
        const _ = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = jn.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if (_ === null)
          l = Zo.exec(f.element("link").attribute("href"))[1];
        else
          for (const v of c.getElements("entry")) {
            const w = Zo.exec(v.element("link").attribute("href"));
            if (w === null)
              continue;
            const I = w[1], R = ((n = jn.prerelease(I)) === null || n === void 0 ? void 0 : n[0]) || null, j = !_ || ["alpha", "beta"].includes(_), J = R !== null && !["alpha", "beta"].includes(String(R));
            if (j && !J && !(_ === "beta" && R === "alpha")) {
              l = I;
              break;
            }
            if (R && R === _) {
              l = I;
              break;
            }
          }
      } else {
        l = await this.getLatestTagName(s);
        for (const _ of c.getElements("entry"))
          if (Zo.exec(_.element("link").attribute("href"))[1] === l) {
            f = _;
            break;
          }
      }
    } catch (_) {
      throw (0, Yt.newError)(`Cannot parse releases feed: ${_.stack || _.message},
XML:
${o}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (l == null)
      throw (0, Yt.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let u, d = "", p = "";
    const y = async (_) => {
      d = (0, Mn.getChannelFilename)(_), p = (0, Mn.newUrlFromBase)(this.getBaseDownloadPath(String(l), d), this.baseUrl);
      const v = this.createRequestOptions(p);
      try {
        return await this.executor.request(v, s);
      } catch (w) {
        throw w instanceof Yt.HttpError && w.statusCode === 404 ? (0, Yt.newError)(`Cannot find ${d} in the latest release artifacts (${p}): ${w.stack || w.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : w;
      }
    };
    try {
      let _ = this.channel;
      this.updater.allowPrerelease && (!((i = jn.prerelease(l)) === null || i === void 0) && i[0]) && (_ = this.getCustomChannelName(String((a = jn.prerelease(l)) === null || a === void 0 ? void 0 : a[0]))), u = await y(_);
    } catch (_) {
      if (this.updater.allowPrerelease)
        u = await y(this.getDefaultChannelName());
      else
        throw _;
    }
    const g = (0, Fc.parseUpdateInfo)(u, d, p);
    return g.releaseName == null && (g.releaseName = f.elementValueOrEmpty("title")), g.releaseNotes == null && (g.releaseNotes = cy(this.updater.currentVersion, this.updater.fullChangelog, c, f)), {
      tag: l,
      ...g
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, Mn.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new $T.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(n, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, Yt.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, Fc.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, r) {
    return `${this.basePath}/download/${t}/${r}`;
  }
}
Fr.GitHubProvider = wT;
function Ad(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function cy(e, t, r, n) {
  if (!t)
    return Ad(n);
  const i = [];
  for (const a of r.getElements("entry")) {
    const s = /\/tag\/v?([^/]+)$/.exec(a.element("link").attribute("href"))[1];
    jn.lt(e, s) && i.push({
      version: s,
      note: Ad(a)
    });
  }
  return i.sort((a, s) => jn.rcompare(a.version, s.version));
}
var no = {};
Object.defineProperty(no, "__esModule", { value: !0 });
no.KeygenProvider = void 0;
const Id = je, ec = At, tc = Fe;
class ET extends tc.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, ec.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new Id.CancellationToken(), r = (0, ec.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, ec.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, tc.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Id.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, tc.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: r, platform: n } = this.configuration;
    return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
  }
}
no.KeygenProvider = ET;
var io = {};
Object.defineProperty(io, "__esModule", { value: !0 });
io.PrivateGitHubProvider = void 0;
const In = je, ST = Ge, bT = le, Od = ti, Rd = At, PT = Fr, TT = Fe;
class AT extends PT.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new In.CancellationToken(), r = (0, Rd.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((o) => o.name === r);
    if (i == null)
      throw (0, In.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const a = new Od.URL(i.url);
    let s;
    try {
      s = (0, ST.load)(await this.httpRequest(a, this.configureHeaders("application/octet-stream"), t));
    } catch (o) {
      throw o instanceof In.HttpError && o.statusCode === 404 ? (0, In.newError)(`Cannot find ${r} in the latest release artifacts (${a}): ${o.stack || o.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : o;
    }
    return s.assets = n.assets, s;
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
    const i = (0, Rd.newUrlFromBase)(n, this.baseUrl);
    try {
      const a = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? a.find((s) => s.prerelease) || a[0] : a;
    } catch (a) {
      throw (0, In.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${a.stack || a.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, TT.getFileList)(t).map((r) => {
      const n = bT.posix.basename(r.url).replace(/ /g, "-"), i = t.assets.find((a) => a != null && a.name === n);
      if (i == null)
        throw (0, In.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Od.URL(i.url),
        info: r
      };
    });
  }
}
io.PrivateGitHubProvider = AT;
Object.defineProperty(to, "__esModule", { value: !0 });
to.isUrlProbablySupportMultiRangeRequests = ly;
to.createClient = NT;
const Ka = je, IT = ro, Cd = Ea, OT = Fr, RT = no, CT = io;
function ly(e) {
  return !e.includes("s3.amazonaws.com");
}
function NT(e, t, r) {
  if (typeof e == "string")
    throw (0, Ka.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, a = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return a == null ? new OT.GitHubProvider(i, t, r) : new CT.PrivateGitHubProvider(i, t, a, r);
    }
    case "bitbucket":
      return new IT.BitbucketProvider(e, t, r);
    case "keygen":
      return new RT.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new Cd.GenericProvider({
        provider: "generic",
        url: (0, Ka.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...r,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new Cd.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && ly(i.url)
      });
    }
    case "custom": {
      const i = e, a = i.updateProvider;
      if (!a)
        throw (0, Ka.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new a(i, t, r);
    }
    default:
      throw (0, Ka.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var ao = {}, Sa = {}, ai = {}, _n = {};
Object.defineProperty(_n, "__esModule", { value: !0 });
_n.OperationKind = void 0;
_n.computeOperations = DT;
var un;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(un || (_n.OperationKind = un = {}));
function DT(e, t, r) {
  const n = Dd(e.files), i = Dd(t.files);
  let a = null;
  const s = t.files[0], o = [], c = s.name, f = n.get(c);
  if (f == null)
    throw new Error(`no file ${c} in old blockmap`);
  const l = i.get(c);
  let u = 0;
  const { checksumToOffset: d, checksumToOldSize: p } = FT(n.get(c), f.offset, r);
  let y = s.offset;
  for (let g = 0; g < l.checksums.length; y += l.sizes[g], g++) {
    const _ = l.sizes[g], v = l.checksums[g];
    let w = d.get(v);
    w != null && p.get(v) !== _ && (r.warn(`Checksum ("${v}") matches, but size differs (old: ${p.get(v)}, new: ${_})`), w = void 0), w === void 0 ? (u++, a != null && a.kind === un.DOWNLOAD && a.end === y ? a.end += _ : (a = {
      kind: un.DOWNLOAD,
      start: y,
      end: y + _
      // oldBlocks: null,
    }, Nd(a, o, v, g))) : a != null && a.kind === un.COPY && a.end === w ? a.end += _ : (a = {
      kind: un.COPY,
      start: w,
      end: w + _
      // oldBlocks: [checksum]
    }, Nd(a, o, v, g));
  }
  return u > 0 && r.info(`File${s.name === "file" ? "" : " " + s.name} has ${u} changed blocks`), o;
}
const kT = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function Nd(e, t, r, n) {
  if (kT && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const a = [i.start, i.end, e.start, e.end].reduce((s, o) => s < o ? s : o);
      throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${un[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - a} until ${i.end - a} and ${e.start - a} until ${e.end - a}`);
    }
  }
  t.push(e);
}
function FT(e, t, r) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let a = t;
  for (let s = 0; s < e.checksums.length; s++) {
    const o = e.checksums[s], c = e.sizes[s], f = i.get(o);
    if (f === void 0)
      n.set(o, a), i.set(o, c);
    else if (r.debug != null) {
      const l = f === c ? "(same size)" : `(size: ${f}, this size: ${c})`;
      r.debug(`${o} duplicated in blockmap ${l}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    a += c;
  }
  return { checksumToOffset: n, checksumToOldSize: i };
}
function Dd(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.name, r);
  return t;
}
Object.defineProperty(ai, "__esModule", { value: !0 });
ai.DataSplitter = void 0;
ai.copyData = uy;
const Ya = je, LT = Lr, xT = fa, UT = _n, kd = Buffer.from(`\r
\r
`);
var _r;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(_r || (_r = {}));
function uy(e, t, r, n, i) {
  const a = (0, LT.createReadStream)("", {
    fd: r,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  a.on("error", n), a.once("end", i), a.pipe(t, {
    end: !1
  });
}
class jT extends xT.Writable {
  constructor(t, r, n, i, a, s) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = a, this.finishHandler = s, this.partIndex = -1, this.headerListBuffer = null, this.readState = _r.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
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
      throw (0, Ya.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const n = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= n, r = n;
    } else if (this.remainingPartDataCount > 0) {
      const n = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= n, await this.processPartData(t, 0, n), r = n;
    }
    if (r !== t.length) {
      if (this.readState === _r.HEADER) {
        const n = this.searchHeaderListEnd(t, r);
        if (n === -1)
          return;
        r = n, this.readState = _r.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === _r.BODY)
          this.readState = _r.INIT;
        else {
          this.partIndex++;
          let s = this.partIndexToTaskIndex.get(this.partIndex);
          if (s == null)
            if (this.isFinished)
              s = this.options.end;
            else
              throw (0, Ya.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const o = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (o < s)
            await this.copyExistingData(o, s);
          else if (o > s)
            throw (0, Ya.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (r = this.searchHeaderListEnd(t, r), r === -1) {
            this.readState = _r.HEADER;
            return;
          }
        }
        const n = this.partIndexToLength[this.partIndex], i = r + n, a = Math.min(i, t.length);
        if (await this.processPartStarted(t, r, a), this.remainingPartDataCount = n - (a - r), this.remainingPartDataCount > 0)
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
      const a = () => {
        if (t === r) {
          n();
          return;
        }
        const s = this.options.tasks[t];
        if (s.kind !== UT.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        uy(s, this.out, this.options.oldFileFd, i, () => {
          t++, a();
        });
      };
      a();
    });
  }
  searchHeaderListEnd(t, r) {
    const n = t.indexOf(kd, r);
    if (n !== -1)
      return n + kd.length;
    const i = r === 0 ? t : t.slice(r);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, Ya.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, r, n) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
  }
  processPartData(t, r, n) {
    this.actualPartLength += n - r;
    const i = this.out;
    return i.write(r === 0 && t.length === n ? t : t.slice(r, n)) ? Promise.resolve() : new Promise((a, s) => {
      i.on("error", s), i.once("drain", () => {
        i.removeListener("error", s), a();
      });
    });
  }
}
ai.DataSplitter = jT;
var so = {};
Object.defineProperty(so, "__esModule", { value: !0 });
so.executeTasksUsingMultipleRangeRequests = MT;
so.checkIsRangesSupported = xc;
const Lc = je, Fd = ai, Ld = _n;
function MT(e, t, r, n, i) {
  const a = (s) => {
    if (s >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const o = s + 1e3;
    BT(e, {
      tasks: t,
      start: s,
      end: Math.min(t.length, o),
      oldFileFd: n
    }, r, () => a(o), i);
  };
  return a;
}
function BT(e, t, r, n, i) {
  let a = "bytes=", s = 0;
  const o = /* @__PURE__ */ new Map(), c = [];
  for (let u = t.start; u < t.end; u++) {
    const d = t.tasks[u];
    d.kind === Ld.OperationKind.DOWNLOAD && (a += `${d.start}-${d.end - 1}, `, o.set(s, u), s++, c.push(d.end - d.start));
  }
  if (s <= 1) {
    const u = (d) => {
      if (d >= t.end) {
        n();
        return;
      }
      const p = t.tasks[d++];
      if (p.kind === Ld.OperationKind.COPY)
        (0, Fd.copyData)(p, r, t.oldFileFd, i, () => u(d));
      else {
        const y = e.createRequestOptions();
        y.headers.Range = `bytes=${p.start}-${p.end - 1}`;
        const g = e.httpExecutor.createRequest(y, (_) => {
          xc(_, i) && (_.pipe(r, {
            end: !1
          }), _.once("end", () => u(d)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(g, i), g.end();
      }
    };
    u(t.start);
    return;
  }
  const f = e.createRequestOptions();
  f.headers.Range = a.substring(0, a.length - 2);
  const l = e.httpExecutor.createRequest(f, (u) => {
    if (!xc(u, i))
      return;
    const d = (0, Lc.safeGetHeader)(u, "content-type"), p = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(d);
    if (p == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${d}"`));
      return;
    }
    const y = new Fd.DataSplitter(r, t, o, p[1] || p[2], c, n);
    y.on("error", i), u.pipe(y), u.on("end", () => {
      setTimeout(() => {
        l.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(l, i), l.end();
}
function xc(e, t) {
  if (e.statusCode >= 400)
    return t((0, Lc.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const r = (0, Lc.safeGetHeader)(e, "accept-ranges");
    if (r == null || r === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var oo = {};
Object.defineProperty(oo, "__esModule", { value: !0 });
oo.ProgressDifferentialDownloadCallbackTransform = void 0;
const qT = fa;
var Bn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Bn || (Bn = {}));
class HT extends qT.Transform {
  constructor(t, r, n) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = Bn.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == Bn.COPY) {
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
    this.operationType = Bn.COPY;
  }
  beginRangeDownload() {
    this.operationType = Bn.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
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
oo.ProgressDifferentialDownloadCallbackTransform = HT;
Object.defineProperty(Sa, "__esModule", { value: !0 });
Sa.DifferentialDownloader = void 0;
const Pi = je, rc = xr, GT = Lr, VT = ai, zT = ti, Xa = _n, xd = so, WT = oo;
class KT {
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
    return (0, Pi.configureRequestUrl)(this.options.newUrl, t), (0, Pi.configureRequestOptions)(t), t;
  }
  doDownload(t, r) {
    if (t.version !== r.version)
      throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
    const n = this.logger, i = (0, Xa.computeOperations)(t, r, n);
    n.debug != null && n.debug(JSON.stringify(i, null, 2));
    let a = 0, s = 0;
    for (const c of i) {
      const f = c.end - c.start;
      c.kind === Xa.OperationKind.DOWNLOAD ? a += f : s += f;
    }
    const o = this.blockAwareFileInfo.size;
    if (a + s + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== o)
      throw new Error(`Internal error, size mismatch: downloadSize: ${a}, copySize: ${s}, newSize: ${o}`);
    return n.info(`Full: ${Ud(o)}, To download: ${Ud(a)} (${Math.round(a / (o / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, rc.close)(i.descriptor).catch((a) => {
      this.logger.error(`cannot close file "${i.path}": ${a}`);
    })));
    return this.doDownloadFile(t, r).then(n).catch((i) => n().catch((a) => {
      try {
        this.logger.error(`cannot close files: ${a}`);
      } catch (s) {
        try {
          console.error(s);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, r) {
    const n = await (0, rc.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, rc.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const a = (0, GT.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((s, o) => {
      const c = [];
      let f;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const v = [];
        let w = 0;
        for (const R of t)
          R.kind === Xa.OperationKind.DOWNLOAD && (v.push(R.end - R.start), w += R.end - R.start);
        const I = {
          expectedByteCounts: v,
          grandTotal: w
        };
        f = new WT.ProgressDifferentialDownloadCallbackTransform(I, this.options.cancellationToken, this.options.onProgress), c.push(f);
      }
      const l = new Pi.DigestTransform(this.blockAwareFileInfo.sha512);
      l.isValidateOnEnd = !1, c.push(l), a.on("finish", () => {
        a.close(() => {
          r.splice(1, 1);
          try {
            l.validate();
          } catch (v) {
            o(v);
            return;
          }
          s(void 0);
        });
      }), c.push(a);
      let u = null;
      for (const v of c)
        v.on("error", o), u == null ? u = v : u = u.pipe(v);
      const d = c[0];
      let p;
      if (this.options.isUseMultipleRangeRequest) {
        p = (0, xd.executeTasksUsingMultipleRangeRequests)(this, t, d, n, o), p(0);
        return;
      }
      let y = 0, g = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const _ = this.createRequestOptions();
      _.redirect = "manual", p = (v) => {
        var w, I;
        if (v >= t.length) {
          this.fileMetadataBuffer != null && d.write(this.fileMetadataBuffer), d.end();
          return;
        }
        const R = t[v++];
        if (R.kind === Xa.OperationKind.COPY) {
          f && f.beginFileCopy(), (0, VT.copyData)(R, d, n, o, () => p(v));
          return;
        }
        const j = `bytes=${R.start}-${R.end - 1}`;
        _.headers.range = j, (I = (w = this.logger) === null || w === void 0 ? void 0 : w.debug) === null || I === void 0 || I.call(w, `download range: ${j}`), f && f.beginRangeDownload();
        const J = this.httpExecutor.createRequest(_, (Y) => {
          Y.on("error", o), Y.on("aborted", () => {
            o(new Error("response has been aborted by the server"));
          }), Y.statusCode >= 400 && o((0, Pi.createHttpError)(Y)), Y.pipe(d, {
            end: !1
          }), Y.once("end", () => {
            f && f.endRangeDownload(), ++y === 100 ? (y = 0, setTimeout(() => p(v), 1e3)) : p(v);
          });
        });
        J.on("redirect", (Y, me, b) => {
          this.logger.info(`Redirect to ${YT(b)}`), g = b, (0, Pi.configureRequestUrl)(new zT.URL(g), _), J.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(J, o), J.end();
      }, p(0);
    });
  }
  async readRemoteBytes(t, r) {
    const n = Buffer.allocUnsafe(r + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${r}`;
    let a = 0;
    if (await this.request(i, (s) => {
      s.copy(n, a), a += s.length;
    }), a !== n.length)
      throw new Error(`Received data length ${a} is not equal to expected ${n.length}`);
    return n;
  }
  request(t, r) {
    return new Promise((n, i) => {
      const a = this.httpExecutor.createRequest(t, (s) => {
        (0, xd.checkIsRangesSupported)(s, i) && (s.on("error", i), s.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), s.on("data", r), s.on("end", () => n()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(a, i), a.end();
    });
  }
}
Sa.DifferentialDownloader = KT;
function Ud(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function YT(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(ao, "__esModule", { value: !0 });
ao.GenericDifferentialDownloader = void 0;
const XT = Sa;
class JT extends XT.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
ao.GenericDifferentialDownloader = JT;
var Ur = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = n;
  const t = je;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
  class r {
    constructor(a) {
      this.emitter = a;
    }
    /**
     * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
     */
    login(a) {
      n(this.emitter, "login", a);
    }
    progress(a) {
      n(this.emitter, e.DOWNLOAD_PROGRESS, a);
    }
    updateDownloaded(a) {
      n(this.emitter, e.UPDATE_DOWNLOADED, a);
    }
    updateCancelled(a) {
      n(this.emitter, "update-cancelled", a);
    }
  }
  e.UpdaterSignal = r;
  function n(i, a, s) {
    i.on(a, s);
  }
})(Ur);
Object.defineProperty(Cr, "__esModule", { value: !0 });
Cr.NoOpLogger = Cr.AppUpdater = void 0;
const et = je, QT = ha, ZT = xs, eA = ip, On = xr, tA = Ge, nc = Ks, Jr = le, rn = Pl, jd = wa, rA = eo, Md = ny, nA = Ea, ic = to, iA = sp, aA = At, sA = ao, Rn = Ur;
class Al extends eA.EventEmitter {
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
        throw (0, et.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (t.length === 0)
        throw (0, et.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
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
    return (0, Md.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new fy();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new nc.Lazy(() => this.loadUpdateConfig());
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
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new Rn.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (a) => this.checkIfUpdateSupported(a), this.clientPromise = null, this.stagingUserIdPromise = new nc.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new nc.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (a) => {
      this._logger.error(`Error: ${a.stack || a.message}`);
    }), r == null ? (this.app = new rA.ElectronAppAdapter(), this.httpExecutor = new Md.ElectronHttpExecutor((a, s) => this.emit("login", a, s))) : (this.app = r, this.httpExecutor = null);
    const n = this.app.version, i = (0, rn.parse)(n);
    if (i == null)
      throw (0, et.newError)(`App version is not a valid semver version: "${n}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = oA(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
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
    typeof t == "string" ? n = new nA.GenericProvider({ provider: "generic", url: t }, this, {
      ...r,
      isUseMultipleRangeRequest: (0, ic.isUrlProbablySupportMultiRangeRequests)(t)
    }) : n = (0, ic.createClient)(t, this, r), this.clientPromise = Promise.resolve(n);
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
      const n = Al.formatDownloadNotification(r.updateInfo.version, this.app.name, t);
      new tr.Notification(n).show();
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
    const i = await this.stagingUserIdPromise.value, s = et.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${n}, percentage: ${s}, user id: ${i}`), s < n;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const r = (0, rn.parse)(t.version);
    if (r == null)
      throw (0, et.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const n = this.currentVersion;
    if ((0, rn.eq)(r, n) || !await Promise.resolve(this.isUpdateSupported(t)) || !await this.isStagingMatch(t))
      return !1;
    const a = (0, rn.gt)(r, n), s = (0, rn.lt)(r, n);
    return a ? !0 : this.allowDowngrade && s;
  }
  checkIfUpdateSupported(t) {
    const r = t == null ? void 0 : t.minimumSystemVersion, n = (0, ZT.release)();
    if (r)
      try {
        if ((0, rn.lt)(n, r))
          return this._logger.info(`Current OS version ${n} is less than the minimum OS version required ${r} for version ${n}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${n}) with minimum OS version(${r}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((n) => (0, ic.createClient)(n, this, this.createProviderRuntimeOptions())));
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
    const n = new et.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: r,
      updateInfo: r,
      cancellationToken: n,
      downloadPromise: this.autoDownload ? this.downloadUpdate(n) : null
    };
  }
  onUpdateAvailable(t) {
    this._logger.info(`Found version ${t.version} (url: ${(0, et.asArray)(t.files).map((r) => r.url).join(", ")})`), this.emit("update-available", t);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(t = new et.CancellationToken()) {
    const r = this.updateInfoAndProvider;
    if (r == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
    this._logger.info(`Downloading update from ${(0, et.asArray)(r.info.files).map((i) => i.url).join(", ")}`);
    const n = (i) => {
      if (!(i instanceof et.CancellationError))
        try {
          this.dispatchError(i);
        } catch (a) {
          this._logger.warn(`Cannot dispatch error event: ${a.stack || a}`);
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
    this.emit(Rn.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, tA.load)(await (0, On.readFile)(this._appUpdateConfigPath, "utf-8"));
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
    const t = Jr.join(this.app.userDataPath, ".updaterId");
    try {
      const n = await (0, On.readFile)(t, "utf-8");
      if (et.UUID.check(n))
        return n;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${n}`);
    } catch (n) {
      n.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${n}`);
    }
    const r = et.UUID.v5((0, QT.randomBytes)(4096), et.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${r}`);
    try {
      await (0, On.outputFile)(t, r);
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
      const i = Jr.join(this.app.baseCachePath, r || this.app.name);
      n.debug != null && n.debug(`updater cache dir: ${i}`), t = new jd.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
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
    this.listenerCount(Rn.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = (w) => this.emit(Rn.DOWNLOAD_PROGRESS, w));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, a = i.version, s = r.packageInfo;
    function o() {
      const w = decodeURIComponent(t.fileInfo.url.pathname);
      return w.endsWith(`.${t.fileExtension}`) ? Jr.basename(w) : t.fileInfo.info.url;
    }
    const c = await this.getOrCreateDownloadHelper(), f = c.cacheDirForPendingUpdate;
    await (0, On.mkdir)(f, { recursive: !0 });
    const l = o();
    let u = Jr.join(f, l);
    const d = s == null ? null : Jr.join(f, `package-${a}${Jr.extname(s.path) || ".7z"}`), p = async (w) => (await c.setDownloadedFile(u, d, i, r, l, w), await t.done({
      ...i,
      downloadedFile: u
    }), d == null ? [u] : [u, d]), y = this._logger, g = await c.validateDownloadedPath(u, i, r, y);
    if (g != null)
      return u = g, await p(!1);
    const _ = async () => (await c.clear().catch(() => {
    }), await (0, On.unlink)(u).catch(() => {
    })), v = await (0, jd.createTempUpdateFile)(`temp-${l}`, f, y);
    try {
      await t.task(v, n, d, _), await (0, et.retry)(() => (0, On.rename)(v, u), 60, 500, 0, 0, (w) => w instanceof Error && /^EBUSY:/.test(w.message));
    } catch (w) {
      throw await _(), w instanceof et.CancellationError && (y.info("cancelled"), this.emit("update-cancelled", i)), w;
    }
    return y.info(`New version ${a} has been downloaded to ${u}`), await p(!0);
  }
  async differentialDownloadInstaller(t, r, n, i, a) {
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const s = (0, aA.blockmapFiles)(t.url, this.app.version, r.updateInfoAndProvider.info.version);
      this._logger.info(`Download block maps (old: "${s[0]}", new: ${s[1]})`);
      const o = async (l) => {
        const u = await this.httpExecutor.downloadToBuffer(l, {
          headers: r.requestHeaders,
          cancellationToken: r.cancellationToken
        });
        if (u == null || u.length === 0)
          throw new Error(`Blockmap "${l.href}" is empty`);
        try {
          return JSON.parse((0, iA.gunzipSync)(u).toString());
        } catch (d) {
          throw new Error(`Cannot parse blockmap "${l.href}", error: ${d}`);
        }
      }, c = {
        newUrl: t.url,
        oldFile: Jr.join(this.downloadedUpdateHelper.cacheDir, a),
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: r.requestHeaders,
        cancellationToken: r.cancellationToken
      };
      this.listenerCount(Rn.DOWNLOAD_PROGRESS) > 0 && (c.onProgress = (l) => this.emit(Rn.DOWNLOAD_PROGRESS, l));
      const f = await Promise.all(s.map((l) => o(l)));
      return await new sA.GenericDifferentialDownloader(t.info, this.httpExecutor, c).download(f[0], f[1]), !1;
    } catch (s) {
      if (this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), this._testOnlyOptions != null)
        throw s;
      return !0;
    }
  }
}
Cr.AppUpdater = Al;
function oA(e) {
  const t = (0, rn.prerelease)(e);
  return t != null && t.length > 0;
}
class fy {
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
Cr.NoOpLogger = fy;
Object.defineProperty(ar, "__esModule", { value: !0 });
ar.BaseUpdater = void 0;
const Bd = da, cA = Cr;
class lA extends cA.AppUpdater {
  constructor(t, r) {
    super(t, r), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, r = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? r : this.autoRunAppAfterInstall) ? setImmediate(() => {
      tr.autoUpdater.emit("before-quit-for-update"), this.app.quit();
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
    const n = this.downloadedUpdateHelper, i = this.installerPath, a = n == null ? null : n.downloadedFileInfo;
    if (i == null || a == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    this.quitAndInstallCalled = !0;
    try {
      return this._logger.info(`Install: isSilent: ${t}, isForceRunAfter: ${r}`), this.doInstall({
        isSilent: t,
        isForceRunAfter: r,
        isAdminRightsRequired: a.isAdminRightsRequired
      });
    } catch (s) {
      return this.dispatchError(s), !1;
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
    const i = (0, Bd.spawnSync)(t, r, {
      env: { ...process.env, ...n },
      encoding: "utf-8",
      shell: !0
    }), { error: a, status: s, stdout: o, stderr: c } = i;
    if (a != null)
      throw this._logger.error(c), a;
    if (s != null && s !== 0)
      throw this._logger.error(c), new Error(`Command ${t} exited with code ${s}`);
    return o.trim();
  }
  /**
   * This handles both node 8 and node 10 way of emitting error when spawning a process
   *   - node 8: Throws the error
   *   - node 10: Emit the error(Need to listen with on)
   */
  // https://github.com/electron-userland/electron-builder/issues/1129
  // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
  async spawnLog(t, r = [], n = void 0, i = "ignore") {
    return this._logger.info(`Executing: ${t} with args: ${r}`), new Promise((a, s) => {
      try {
        const o = { stdio: i, env: n, detached: !0 }, c = (0, Bd.spawn)(t, r, o);
        c.on("error", (f) => {
          s(f);
        }), c.unref(), c.pid !== void 0 && a(!0);
      } catch (o) {
        s(o);
      }
    });
  }
}
ar.BaseUpdater = lA;
var Zi = {}, ba = {};
Object.defineProperty(ba, "__esModule", { value: !0 });
ba.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const Cn = xr, uA = Sa, fA = sp;
class dA extends uA.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = dy(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await hA(this.options.oldFile), i);
  }
}
ba.FileWithEmbeddedBlockMapDifferentialDownloader = dA;
function dy(e) {
  return JSON.parse((0, fA.inflateRawSync)(e).toString());
}
async function hA(e) {
  const t = await (0, Cn.open)(e, "r");
  try {
    const r = (await (0, Cn.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, Cn.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, Cn.read)(t, i, 0, i.length, r - n.length - i.length), await (0, Cn.close)(t), dy(i);
  } catch (r) {
    throw await (0, Cn.close)(t), r;
  }
}
Object.defineProperty(Zi, "__esModule", { value: !0 });
Zi.AppImageUpdater = void 0;
const qd = je, Hd = da, pA = xr, mA = Lr, Ti = le, yA = ar, gA = ba, vA = Fe, Gd = Ur;
class _A extends yA.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, vA.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        const s = process.env.APPIMAGE;
        if (s == null)
          throw (0, qd.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(n, s, i, r, t)) && await this.httpExecutor.download(n.url, i, a), await (0, pA.chmod)(i, 493);
      }
    });
  }
  async downloadDifferential(t, r, n, i, a) {
    try {
      const s = {
        newUrl: t.url,
        oldFile: r,
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: a.requestHeaders,
        cancellationToken: a.cancellationToken
      };
      return this.listenerCount(Gd.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (o) => this.emit(Gd.DOWNLOAD_PROGRESS, o)), await new gA.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, s).download(), !1;
    } catch (s) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const r = process.env.APPIMAGE;
    if (r == null)
      throw (0, qd.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, mA.unlinkSync)(r);
    let n;
    const i = Ti.basename(r), a = this.installerPath;
    if (a == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    Ti.basename(a) === i || !/\d+\.\d+\.\d+/.test(i) ? n = r : n = Ti.join(Ti.dirname(r), Ti.basename(a)), (0, Hd.execFileSync)("mv", ["-f", a, n]), n !== r && this.emit("appimage-filename-updated", n);
    const s = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(n, [], s) : (s.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, Hd.execFileSync)(n, [], { env: s })), !0;
  }
}
Zi.AppImageUpdater = _A;
var ea = {};
Object.defineProperty(ea, "__esModule", { value: !0 });
ea.DebUpdater = void 0;
const $A = ar, wA = Fe, Vd = Ur;
class EA extends $A.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, wA.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        this.listenerCount(Vd.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (s) => this.emit(Vd.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(n.url, i, a);
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
    const a = ["dpkg", "-i", i, "||", "apt-get", "install", "-f", "-y"];
    return this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${a.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
ea.DebUpdater = EA;
var ta = {};
Object.defineProperty(ta, "__esModule", { value: !0 });
ta.PacmanUpdater = void 0;
const SA = ar, zd = Ur, bA = Fe;
class PA extends SA.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, bA.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        this.listenerCount(zd.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (s) => this.emit(zd.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(n.url, i, a);
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
    const a = ["pacman", "-U", "--noconfirm", i];
    return this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${a.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
ta.PacmanUpdater = PA;
var ra = {};
Object.defineProperty(ra, "__esModule", { value: !0 });
ra.RpmUpdater = void 0;
const TA = ar, Wd = Ur, AA = Fe;
class IA extends TA.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, AA.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        this.listenerCount(Wd.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (s) => this.emit(Wd.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(n.url, i, a);
      }
    });
  }
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  doInstall(t) {
    const r = this.wrapSudo(), n = /pkexec/i.test(r) ? "" : '"', i = this.spawnSyncLog("which zypper"), a = this.installerPath;
    if (a == null)
      return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
    let s;
    return i ? s = [i, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", a] : s = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", a], this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${s.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
ra.RpmUpdater = IA;
var na = {};
Object.defineProperty(na, "__esModule", { value: !0 });
na.MacUpdater = void 0;
const Kd = je, ac = xr, OA = Lr, Yd = le, RA = vv, CA = Cr, NA = Fe, Xd = da, Jd = ha;
class DA extends CA.AppUpdater {
  constructor(t, r) {
    super(t, r), this.nativeUpdater = tr.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (n) => {
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
    let a = !1;
    try {
      this.debug("Checking for macOS Rosetta environment"), a = (0, Xd.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), n.info(`Checked for macOS Rosetta environment (isRosetta=${a})`);
    } catch (u) {
      n.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${u}`);
    }
    let s = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const d = (0, Xd.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      n.info(`Checked 'uname -a': arm64=${d}`), s = s || d;
    } catch (u) {
      n.warn(`uname shell command to check for arm64 failed: ${u}`);
    }
    s = s || process.arch === "arm64" || a;
    const o = (u) => {
      var d;
      return u.url.pathname.includes("arm64") || ((d = u.info.url) === null || d === void 0 ? void 0 : d.includes("arm64"));
    };
    s && r.some(o) ? r = r.filter((u) => s === o(u)) : r = r.filter((u) => !o(u));
    const c = (0, NA.findFile)(r, "zip", ["pkg", "dmg"]);
    if (c == null)
      throw (0, Kd.newError)(`ZIP file not provided: ${(0, Kd.safeStringifyJson)(r)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const f = t.updateInfoAndProvider.provider, l = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: c,
      downloadUpdateOptions: t,
      task: async (u, d) => {
        const p = Yd.join(this.downloadedUpdateHelper.cacheDir, l), y = () => (0, ac.pathExistsSync)(p) ? !t.disableDifferentialDownload : (n.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let g = !0;
        y() && (g = await this.differentialDownloadInstaller(c, t, u, f, l)), g && await this.httpExecutor.download(c.url, u, d);
      },
      done: async (u) => {
        if (!t.disableDifferentialDownload)
          try {
            const d = Yd.join(this.downloadedUpdateHelper.cacheDir, l);
            await (0, ac.copyFile)(u.downloadedFile, d);
          } catch (d) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${d.message}`);
          }
        return this.updateDownloaded(c, u);
      }
    });
  }
  async updateDownloaded(t, r) {
    var n;
    const i = r.downloadedFile, a = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, ac.stat)(i)).size, s = this._logger, o = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${o})`), this.server = (0, RA.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${o})`), this.server.on("close", () => {
      s.info(`Proxy server for native Squirrel.Mac is closed (${o})`);
    });
    const c = (f) => {
      const l = f.address();
      return typeof l == "string" ? l : `http://127.0.0.1:${l == null ? void 0 : l.port}`;
    };
    return await new Promise((f, l) => {
      const u = (0, Jd.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), d = Buffer.from(`autoupdater:${u}`, "ascii"), p = `/${(0, Jd.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (y, g) => {
        const _ = y.url;
        if (s.info(`${_} requested`), _ === "/") {
          if (!y.headers.authorization || y.headers.authorization.indexOf("Basic ") === -1) {
            g.statusCode = 401, g.statusMessage = "Invalid Authentication Credentials", g.end(), s.warn("No authenthication info");
            return;
          }
          const I = y.headers.authorization.split(" ")[1], R = Buffer.from(I, "base64").toString("ascii"), [j, J] = R.split(":");
          if (j !== "autoupdater" || J !== u) {
            g.statusCode = 401, g.statusMessage = "Invalid Authentication Credentials", g.end(), s.warn("Invalid authenthication credentials");
            return;
          }
          const Y = Buffer.from(`{ "url": "${c(this.server)}${p}" }`);
          g.writeHead(200, { "Content-Type": "application/json", "Content-Length": Y.length }), g.end(Y);
          return;
        }
        if (!_.startsWith(p)) {
          s.warn(`${_} requested, but not supported`), g.writeHead(404), g.end();
          return;
        }
        s.info(`${p} requested by Squirrel.Mac, pipe ${i}`);
        let v = !1;
        g.on("finish", () => {
          v || (this.nativeUpdater.removeListener("error", l), f([]));
        });
        const w = (0, OA.createReadStream)(i);
        w.on("error", (I) => {
          try {
            g.end();
          } catch (R) {
            s.warn(`cannot end response: ${R}`);
          }
          v = !0, this.nativeUpdater.removeListener("error", l), l(new Error(`Cannot pipe "${i}": ${I}`));
        }), g.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": a
        }), w.pipe(g);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${o})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${c(this.server)}, ${o})`), this.nativeUpdater.setFeedURL({
          url: c(this.server),
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Basic ${d.toString("base64")}`
          }
        }), this.dispatchUpdateDownloaded(r), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", l), this.nativeUpdater.checkForUpdates()) : f([]);
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
na.MacUpdater = DA;
var ia = {}, Il = {};
Object.defineProperty(Il, "__esModule", { value: !0 });
Il.verifySignature = FA;
const Qd = je, hy = da, kA = xs, Zd = le;
function FA(e, t, r) {
  return new Promise((n, i) => {
    const a = t.replace(/'/g, "''");
    r.info(`Verifying signature ${a}`), (0, hy.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${a}' | ConvertTo-Json -Compress"`], {
      shell: !0,
      timeout: 20 * 1e3
    }, (s, o, c) => {
      var f;
      try {
        if (s != null || c) {
          sc(r, s, c, i), n(null);
          return;
        }
        const l = LA(o);
        if (l.Status === 0) {
          try {
            const y = Zd.normalize(l.Path), g = Zd.normalize(t);
            if (r.info(`LiteralPath: ${y}. Update Path: ${g}`), y !== g) {
              sc(r, new Error(`LiteralPath of ${y} is different than ${g}`), c, i), n(null);
              return;
            }
          } catch (y) {
            r.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(f = y.message) !== null && f !== void 0 ? f : y.stack}`);
          }
          const d = (0, Qd.parseDn)(l.SignerCertificate.Subject);
          let p = !1;
          for (const y of e) {
            const g = (0, Qd.parseDn)(y);
            if (g.size ? p = Array.from(g.keys()).every((v) => g.get(v) === d.get(v)) : y === d.get("CN") && (r.warn(`Signature validated using only CN ${y}. Please add your full Distinguished Name (DN) to publisherNames configuration`), p = !0), p) {
              n(null);
              return;
            }
          }
        }
        const u = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(l, (d, p) => d === "RawData" ? void 0 : p, 2);
        r.warn(`Sign verification failed, installer signed with incorrect certificate: ${u}`), n(u);
      } catch (l) {
        sc(r, l, null, i), n(null);
        return;
      }
    });
  });
}
function LA(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const r = t.SignerCertificate;
  return r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName), t;
}
function sc(e, t, r, n) {
  if (xA()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, hy.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && n(t), r && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
}
function xA() {
  const e = kA.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty(ia, "__esModule", { value: !0 });
ia.NsisUpdater = void 0;
const Ja = je, eh = le, UA = ar, jA = ba, th = Ur, MA = Fe, BA = xr, qA = Il, rh = ti;
class HA extends UA.BaseUpdater {
  constructor(t, r) {
    super(t, r), this._verifyUpdateCodeSignature = (n, i) => (0, qA.verifySignature)(n, i, this._logger);
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
    const r = t.updateInfoAndProvider.provider, n = (0, MA.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: n,
      task: async (i, a, s, o) => {
        const c = n.packageInfo, f = c != null && s != null;
        if (f && t.disableWebInstaller)
          throw (0, Ja.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !f && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (f || t.disableDifferentialDownload || await this.differentialDownloadInstaller(n, t, i, r, Ja.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(n.url, i, a);
        const l = await this.verifySignature(i);
        if (l != null)
          throw await o(), (0, Ja.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${l}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (f && await this.differentialDownloadWebPackage(t, c, s, r))
          try {
            await this.httpExecutor.download(new rh.URL(c.path), s, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: c.sha512
            });
          } catch (u) {
            try {
              await (0, BA.unlink)(s);
            } catch {
            }
            throw u;
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
    const a = () => {
      this.spawnLog(eh.join(process.resourcesPath, "elevate.exe"), [r].concat(n)).catch((s) => this.dispatchError(s));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), a(), !0) : (this.spawnLog(r, n).catch((s) => {
      const o = s.code;
      this._logger.info(`Cannot run installer: error code: ${o}, error message: "${s.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), o === "UNKNOWN" || o === "EACCES" ? a() : o === "ENOENT" ? tr.shell.openPath(r).catch((c) => this.dispatchError(c)) : this.dispatchError(s);
    }), !0);
  }
  async differentialDownloadWebPackage(t, r, n, i) {
    if (r.blockMapSize == null)
      return !0;
    try {
      const a = {
        newUrl: new rh.URL(r.path),
        oldFile: eh.join(this.downloadedUpdateHelper.cacheDir, Ja.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: n,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(th.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (s) => this.emit(th.DOWNLOAD_PROGRESS, s)), await new jA.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, a).download();
    } catch (a) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), process.platform === "win32";
    }
    return !1;
  }
}
ia.NsisUpdater = HA;
(function(e) {
  var t = nt && nt.__createBinding || (Object.create ? function(_, v, w, I) {
    I === void 0 && (I = w);
    var R = Object.getOwnPropertyDescriptor(v, w);
    (!R || ("get" in R ? !v.__esModule : R.writable || R.configurable)) && (R = { enumerable: !0, get: function() {
      return v[w];
    } }), Object.defineProperty(_, I, R);
  } : function(_, v, w, I) {
    I === void 0 && (I = w), _[I] = v[w];
  }), r = nt && nt.__exportStar || function(_, v) {
    for (var w in _) w !== "default" && !Object.prototype.hasOwnProperty.call(v, w) && t(v, _, w);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const n = xr, i = le;
  var a = ar;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return a.BaseUpdater;
  } });
  var s = Cr;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return s.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return s.NoOpLogger;
  } });
  var o = Fe;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return o.Provider;
  } });
  var c = Zi;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return c.AppImageUpdater;
  } });
  var f = ea;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return f.DebUpdater;
  } });
  var l = ta;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return l.PacmanUpdater;
  } });
  var u = ra;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return u.RpmUpdater;
  } });
  var d = na;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return d.MacUpdater;
  } });
  var p = ia;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return p.NsisUpdater;
  } }), r(Ur, e);
  let y;
  function g() {
    if (process.platform === "win32")
      y = new ia.NsisUpdater();
    else if (process.platform === "darwin")
      y = new na.MacUpdater();
    else {
      y = new Zi.AppImageUpdater();
      try {
        const _ = i.join(process.resourcesPath, "package-type");
        if (!(0, n.existsSync)(_))
          return y;
        console.info("Checking for beta autoupdate feature for deb/rpm distributions");
        const v = (0, n.readFileSync)(_).toString().trim();
        switch (console.info("Found package-type:", v), v) {
          case "deb":
            y = new ea.DebUpdater();
            break;
          case "rpm":
            y = new ra.RpmUpdater();
            break;
          case "pacman":
            y = new ta.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (_) {
        console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", _.message);
      }
    }
    return y;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => y || g()
  });
})(Dt);
var ut = {};
(function(e) {
  const t = he.fromCallback, r = ke, n = [
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
  }), e.exists = function(i, a) {
    return typeof a == "function" ? r.exists(i, a) : new Promise((s) => r.exists(i, s));
  }, e.read = function(i, a, s, o, c, f) {
    return typeof f == "function" ? r.read(i, a, s, o, c, f) : new Promise((l, u) => {
      r.read(i, a, s, o, c, (d, p, y) => {
        if (d) return u(d);
        l({ bytesRead: p, buffer: y });
      });
    });
  }, e.write = function(i, a, ...s) {
    return typeof s[s.length - 1] == "function" ? r.write(i, a, ...s) : new Promise((o, c) => {
      r.write(i, a, ...s, (f, l, u) => {
        if (f) return c(f);
        o({ bytesWritten: l, buffer: u });
      });
    });
  }, e.readv = function(i, a, ...s) {
    return typeof s[s.length - 1] == "function" ? r.readv(i, a, ...s) : new Promise((o, c) => {
      r.readv(i, a, ...s, (f, l, u) => {
        if (f) return c(f);
        o({ bytesRead: l, buffers: u });
      });
    });
  }, e.writev = function(i, a, ...s) {
    return typeof s[s.length - 1] == "function" ? r.writev(i, a, ...s) : new Promise((o, c) => {
      r.writev(i, a, ...s, (f, l, u) => {
        if (f) return c(f);
        o({ bytesWritten: l, buffers: u });
      });
    });
  }, typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(ut);
var Ol = {}, py = {};
const GA = le;
py.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(GA.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const my = ut, { checkPath: yy } = py, gy = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Ol.makeDir = async (e, t) => (yy(e), my.mkdir(e, {
  mode: gy(t),
  recursive: !0
}));
Ol.makeDirSync = (e, t) => (yy(e), my.mkdirSync(e, {
  mode: gy(t),
  recursive: !0
}));
const VA = he.fromPromise, { makeDir: zA, makeDirSync: oc } = Ol, cc = VA(zA);
var Gt = {
  mkdirs: cc,
  mkdirsSync: oc,
  // alias
  mkdirp: cc,
  mkdirpSync: oc,
  ensureDir: cc,
  ensureDirSync: oc
};
const WA = he.fromPromise, vy = ut;
function KA(e) {
  return vy.access(e).then(() => !0).catch(() => !1);
}
var $n = {
  pathExists: WA(KA),
  pathExistsSync: vy.existsSync
};
const zn = ut, YA = he.fromPromise;
async function XA(e, t, r) {
  const n = await zn.open(e, "r+");
  let i = null;
  try {
    await zn.futimes(n, t, r);
  } finally {
    try {
      await zn.close(n);
    } catch (a) {
      i = a;
    }
  }
  if (i)
    throw i;
}
function JA(e, t, r) {
  const n = zn.openSync(e, "r+");
  return zn.futimesSync(n, t, r), zn.closeSync(n);
}
var _y = {
  utimesMillis: YA(XA),
  utimesMillisSync: JA
};
const Zn = ut, Ue = le, nh = he.fromPromise;
function QA(e, t, r) {
  const n = r.dereference ? (i) => Zn.stat(i, { bigint: !0 }) : (i) => Zn.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, a]) => ({ srcStat: i, destStat: a }));
}
function ZA(e, t, r) {
  let n;
  const i = r.dereference ? (s) => Zn.statSync(s, { bigint: !0 }) : (s) => Zn.lstatSync(s, { bigint: !0 }), a = i(e);
  try {
    n = i(t);
  } catch (s) {
    if (s.code === "ENOENT") return { srcStat: a, destStat: null };
    throw s;
  }
  return { srcStat: a, destStat: n };
}
async function eI(e, t, r, n) {
  const { srcStat: i, destStat: a } = await QA(e, t, n);
  if (a) {
    if (Pa(i, a)) {
      const s = Ue.basename(e), o = Ue.basename(t);
      if (r === "move" && s !== o && s.toLowerCase() === o.toLowerCase())
        return { srcStat: i, destStat: a, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !a.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && a.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Rl(e, t))
    throw new Error(co(e, t, r));
  return { srcStat: i, destStat: a };
}
function tI(e, t, r, n) {
  const { srcStat: i, destStat: a } = ZA(e, t, n);
  if (a) {
    if (Pa(i, a)) {
      const s = Ue.basename(e), o = Ue.basename(t);
      if (r === "move" && s !== o && s.toLowerCase() === o.toLowerCase())
        return { srcStat: i, destStat: a, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !a.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && a.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Rl(e, t))
    throw new Error(co(e, t, r));
  return { srcStat: i, destStat: a };
}
async function $y(e, t, r, n) {
  const i = Ue.resolve(Ue.dirname(e)), a = Ue.resolve(Ue.dirname(r));
  if (a === i || a === Ue.parse(a).root) return;
  let s;
  try {
    s = await Zn.stat(a, { bigint: !0 });
  } catch (o) {
    if (o.code === "ENOENT") return;
    throw o;
  }
  if (Pa(t, s))
    throw new Error(co(e, r, n));
  return $y(e, t, a, n);
}
function wy(e, t, r, n) {
  const i = Ue.resolve(Ue.dirname(e)), a = Ue.resolve(Ue.dirname(r));
  if (a === i || a === Ue.parse(a).root) return;
  let s;
  try {
    s = Zn.statSync(a, { bigint: !0 });
  } catch (o) {
    if (o.code === "ENOENT") return;
    throw o;
  }
  if (Pa(t, s))
    throw new Error(co(e, r, n));
  return wy(e, t, a, n);
}
function Pa(e, t) {
  return t.ino !== void 0 && t.dev !== void 0 && t.ino === e.ino && t.dev === e.dev;
}
function Rl(e, t) {
  const r = Ue.resolve(e).split(Ue.sep).filter((i) => i), n = Ue.resolve(t).split(Ue.sep).filter((i) => i);
  return r.every((i, a) => n[a] === i);
}
function co(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var si = {
  // checkPaths
  checkPaths: nh(eI),
  checkPathsSync: tI,
  // checkParent
  checkParentPaths: nh($y),
  checkParentPathsSync: wy,
  // Misc
  isSrcSubdir: Rl,
  areIdentical: Pa
};
const Xe = ut, aa = le, { mkdirs: rI } = Gt, { pathExists: nI } = $n, { utimesMillis: iI } = _y, sa = si;
async function aI(e, t, r = {}) {
  typeof r == "function" && (r = { filter: r }), r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  );
  const { srcStat: n, destStat: i } = await sa.checkPaths(e, t, "copy", r);
  if (await sa.checkParentPaths(e, n, t, "copy"), !await Ey(e, t, r)) return;
  const s = aa.dirname(t);
  await nI(s) || await rI(s), await Sy(i, e, t, r);
}
async function Ey(e, t, r) {
  return r.filter ? r.filter(e, t) : !0;
}
async function Sy(e, t, r, n) {
  const a = await (n.dereference ? Xe.stat : Xe.lstat)(t);
  if (a.isDirectory()) return lI(a, e, t, r, n);
  if (a.isFile() || a.isCharacterDevice() || a.isBlockDevice()) return sI(a, e, t, r, n);
  if (a.isSymbolicLink()) return uI(e, t, r, n);
  throw a.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : a.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
async function sI(e, t, r, n, i) {
  if (!t) return ih(e, r, n, i);
  if (i.overwrite)
    return await Xe.unlink(n), ih(e, r, n, i);
  if (i.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
async function ih(e, t, r, n) {
  if (await Xe.copyFile(t, r), n.preserveTimestamps) {
    oI(e.mode) && await cI(r, e.mode);
    const i = await Xe.stat(t);
    await iI(r, i.atime, i.mtime);
  }
  return Xe.chmod(r, e.mode);
}
function oI(e) {
  return (e & 128) === 0;
}
function cI(e, t) {
  return Xe.chmod(e, t | 128);
}
async function lI(e, t, r, n, i) {
  t || await Xe.mkdir(n);
  const a = [];
  for await (const s of await Xe.opendir(r)) {
    const o = aa.join(r, s.name), c = aa.join(n, s.name);
    a.push(
      Ey(o, c, i).then((f) => {
        if (f)
          return sa.checkPaths(o, c, "copy", i).then(({ destStat: l }) => Sy(l, o, c, i));
      })
    );
  }
  await Promise.all(a), t || await Xe.chmod(n, e.mode);
}
async function uI(e, t, r, n) {
  let i = await Xe.readlink(t);
  if (n.dereference && (i = aa.resolve(process.cwd(), i)), !e)
    return Xe.symlink(i, r);
  let a = null;
  try {
    a = await Xe.readlink(r);
  } catch (s) {
    if (s.code === "EINVAL" || s.code === "UNKNOWN") return Xe.symlink(i, r);
    throw s;
  }
  if (n.dereference && (a = aa.resolve(process.cwd(), a)), sa.isSrcSubdir(i, a))
    throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${a}'.`);
  if (sa.isSrcSubdir(a, i))
    throw new Error(`Cannot overwrite '${a}' with '${i}'.`);
  return await Xe.unlink(r), Xe.symlink(i, r);
}
var fI = aI;
const it = ke, oa = le, dI = Gt.mkdirsSync, hI = _y.utimesMillisSync, ca = si;
function pI(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = ca.checkPathsSync(e, t, "copy", r);
  if (ca.checkParentPathsSync(e, n, t, "copy"), r.filter && !r.filter(e, t)) return;
  const a = oa.dirname(t);
  return it.existsSync(a) || dI(a), by(i, e, t, r);
}
function by(e, t, r, n) {
  const a = (n.dereference ? it.statSync : it.lstatSync)(t);
  if (a.isDirectory()) return wI(a, e, t, r, n);
  if (a.isFile() || a.isCharacterDevice() || a.isBlockDevice()) return mI(a, e, t, r, n);
  if (a.isSymbolicLink()) return bI(e, t, r, n);
  throw a.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : a.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function mI(e, t, r, n, i) {
  return t ? yI(e, r, n, i) : Py(e, r, n, i);
}
function yI(e, t, r, n) {
  if (n.overwrite)
    return it.unlinkSync(r), Py(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function Py(e, t, r, n) {
  return it.copyFileSync(t, r), n.preserveTimestamps && gI(e.mode, t, r), Cl(r, e.mode);
}
function gI(e, t, r) {
  return vI(e) && _I(r, e), $I(t, r);
}
function vI(e) {
  return (e & 128) === 0;
}
function _I(e, t) {
  return Cl(e, t | 128);
}
function Cl(e, t) {
  return it.chmodSync(e, t);
}
function $I(e, t) {
  const r = it.statSync(e);
  return hI(t, r.atime, r.mtime);
}
function wI(e, t, r, n, i) {
  return t ? Ty(r, n, i) : EI(e.mode, r, n, i);
}
function EI(e, t, r, n) {
  return it.mkdirSync(r), Ty(t, r, n), Cl(r, e);
}
function Ty(e, t, r) {
  const n = it.opendirSync(e);
  try {
    let i;
    for (; (i = n.readSync()) !== null; )
      SI(i.name, e, t, r);
  } finally {
    n.closeSync();
  }
}
function SI(e, t, r, n) {
  const i = oa.join(t, e), a = oa.join(r, e);
  if (n.filter && !n.filter(i, a)) return;
  const { destStat: s } = ca.checkPathsSync(i, a, "copy", n);
  return by(s, i, a, n);
}
function bI(e, t, r, n) {
  let i = it.readlinkSync(t);
  if (n.dereference && (i = oa.resolve(process.cwd(), i)), e) {
    let a;
    try {
      a = it.readlinkSync(r);
    } catch (s) {
      if (s.code === "EINVAL" || s.code === "UNKNOWN") return it.symlinkSync(i, r);
      throw s;
    }
    if (n.dereference && (a = oa.resolve(process.cwd(), a)), ca.isSrcSubdir(i, a))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${a}'.`);
    if (ca.isSrcSubdir(a, i))
      throw new Error(`Cannot overwrite '${a}' with '${i}'.`);
    return PI(i, r);
  } else
    return it.symlinkSync(i, r);
}
function PI(e, t) {
  return it.unlinkSync(t), it.symlinkSync(e, t);
}
var TI = pI;
const AI = he.fromPromise;
var Nl = {
  copy: AI(fI),
  copySync: TI
};
const Ay = ke, II = he.fromCallback;
function OI(e, t) {
  Ay.rm(e, { recursive: !0, force: !0 }, t);
}
function RI(e) {
  Ay.rmSync(e, { recursive: !0, force: !0 });
}
var lo = {
  remove: II(OI),
  removeSync: RI
};
const CI = he.fromPromise, Iy = ut, Oy = le, Ry = Gt, Cy = lo, ah = CI(async function(t) {
  let r;
  try {
    r = await Iy.readdir(t);
  } catch {
    return Ry.mkdirs(t);
  }
  return Promise.all(r.map((n) => Cy.remove(Oy.join(t, n))));
});
function sh(e) {
  let t;
  try {
    t = Iy.readdirSync(e);
  } catch {
    return Ry.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = Oy.join(e, r), Cy.removeSync(r);
  });
}
var NI = {
  emptyDirSync: sh,
  emptydirSync: sh,
  emptyDir: ah,
  emptydir: ah
};
const DI = he.fromPromise, Ny = le, Qt = ut, Dy = Gt;
async function kI(e) {
  let t;
  try {
    t = await Qt.stat(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = Ny.dirname(e);
  let n = null;
  try {
    n = await Qt.stat(r);
  } catch (i) {
    if (i.code === "ENOENT") {
      await Dy.mkdirs(r), await Qt.writeFile(e, "");
      return;
    } else
      throw i;
  }
  n.isDirectory() ? await Qt.writeFile(e, "") : await Qt.readdir(r);
}
function FI(e) {
  let t;
  try {
    t = Qt.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = Ny.dirname(e);
  try {
    Qt.statSync(r).isDirectory() || Qt.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") Dy.mkdirsSync(r);
    else throw n;
  }
  Qt.writeFileSync(e, "");
}
var LI = {
  createFile: DI(kI),
  createFileSync: FI
};
const xI = he.fromPromise, ky = le, wr = ut, Fy = Gt, { pathExists: UI } = $n, { areIdentical: Ly } = si;
async function jI(e, t) {
  let r;
  try {
    r = await wr.lstat(t);
  } catch {
  }
  let n;
  try {
    n = await wr.lstat(e);
  } catch (s) {
    throw s.message = s.message.replace("lstat", "ensureLink"), s;
  }
  if (r && Ly(n, r)) return;
  const i = ky.dirname(t);
  await UI(i) || await Fy.mkdirs(i), await wr.link(e, t);
}
function MI(e, t) {
  let r;
  try {
    r = wr.lstatSync(t);
  } catch {
  }
  try {
    const a = wr.lstatSync(e);
    if (r && Ly(a, r)) return;
  } catch (a) {
    throw a.message = a.message.replace("lstat", "ensureLink"), a;
  }
  const n = ky.dirname(t);
  return wr.existsSync(n) || Fy.mkdirsSync(n), wr.linkSync(e, t);
}
var BI = {
  createLink: xI(jI),
  createLinkSync: MI
};
const Tr = le, Ui = ut, { pathExists: qI } = $n, HI = he.fromPromise;
async function GI(e, t) {
  if (Tr.isAbsolute(e)) {
    try {
      await Ui.lstat(e);
    } catch (a) {
      throw a.message = a.message.replace("lstat", "ensureSymlink"), a;
    }
    return {
      toCwd: e,
      toDst: e
    };
  }
  const r = Tr.dirname(t), n = Tr.join(r, e);
  if (await qI(n))
    return {
      toCwd: n,
      toDst: e
    };
  try {
    await Ui.lstat(e);
  } catch (a) {
    throw a.message = a.message.replace("lstat", "ensureSymlink"), a;
  }
  return {
    toCwd: e,
    toDst: Tr.relative(r, e)
  };
}
function VI(e, t) {
  if (Tr.isAbsolute(e)) {
    if (!Ui.existsSync(e)) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  }
  const r = Tr.dirname(t), n = Tr.join(r, e);
  if (Ui.existsSync(n))
    return {
      toCwd: n,
      toDst: e
    };
  if (!Ui.existsSync(e)) throw new Error("relative srcpath does not exist");
  return {
    toCwd: e,
    toDst: Tr.relative(r, e)
  };
}
var zI = {
  symlinkPaths: HI(GI),
  symlinkPathsSync: VI
};
const xy = ut, WI = he.fromPromise;
async function KI(e, t) {
  if (t) return t;
  let r;
  try {
    r = await xy.lstat(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
function YI(e, t) {
  if (t) return t;
  let r;
  try {
    r = xy.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var XI = {
  symlinkType: WI(KI),
  symlinkTypeSync: YI
};
const JI = he.fromPromise, Uy = le, Ut = ut, { mkdirs: QI, mkdirsSync: ZI } = Gt, { symlinkPaths: eO, symlinkPathsSync: tO } = zI, { symlinkType: rO, symlinkTypeSync: nO } = XI, { pathExists: iO } = $n, { areIdentical: jy } = si;
async function aO(e, t, r) {
  let n;
  try {
    n = await Ut.lstat(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const [o, c] = await Promise.all([
      Ut.stat(e),
      Ut.stat(t)
    ]);
    if (jy(o, c)) return;
  }
  const i = await eO(e, t);
  e = i.toDst;
  const a = await rO(i.toCwd, r), s = Uy.dirname(t);
  return await iO(s) || await QI(s), Ut.symlink(e, t, a);
}
function sO(e, t, r) {
  let n;
  try {
    n = Ut.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const o = Ut.statSync(e), c = Ut.statSync(t);
    if (jy(o, c)) return;
  }
  const i = tO(e, t);
  e = i.toDst, r = nO(i.toCwd, r);
  const a = Uy.dirname(t);
  return Ut.existsSync(a) || ZI(a), Ut.symlinkSync(e, t, r);
}
var oO = {
  createSymlink: JI(aO),
  createSymlinkSync: sO
};
const { createFile: oh, createFileSync: ch } = LI, { createLink: lh, createLinkSync: uh } = BI, { createSymlink: fh, createSymlinkSync: dh } = oO;
var cO = {
  // file
  createFile: oh,
  createFileSync: ch,
  ensureFile: oh,
  ensureFileSync: ch,
  // link
  createLink: lh,
  createLinkSync: uh,
  ensureLink: lh,
  ensureLinkSync: uh,
  // symlink
  createSymlink: fh,
  createSymlinkSync: dh,
  ensureSymlink: fh,
  ensureSymlinkSync: dh
};
const Qa = Gp;
var lO = {
  // jsonfile exports
  readJson: Qa.readFile,
  readJsonSync: Qa.readFileSync,
  writeJson: Qa.writeFile,
  writeJsonSync: Qa.writeFileSync
};
const uO = he.fromPromise, Uc = ut, My = le, By = Gt, fO = $n.pathExists;
async function dO(e, t, r = "utf-8") {
  const n = My.dirname(e);
  return await fO(n) || await By.mkdirs(n), Uc.writeFile(e, t, r);
}
function hO(e, ...t) {
  const r = My.dirname(e);
  Uc.existsSync(r) || By.mkdirsSync(r), Uc.writeFileSync(e, ...t);
}
var Dl = {
  outputFile: uO(dO),
  outputFileSync: hO
};
const { stringify: pO } = ma, { outputFile: mO } = Dl;
async function yO(e, t, r = {}) {
  const n = pO(t, r);
  await mO(e, n, r);
}
var gO = yO;
const { stringify: vO } = ma, { outputFileSync: _O } = Dl;
function $O(e, t, r) {
  const n = vO(t, r);
  _O(e, n, r);
}
var wO = $O;
const EO = he.fromPromise, ot = lO;
ot.outputJson = EO(gO);
ot.outputJsonSync = wO;
ot.outputJSON = ot.outputJson;
ot.outputJSONSync = ot.outputJsonSync;
ot.writeJSON = ot.writeJson;
ot.writeJSONSync = ot.writeJsonSync;
ot.readJSON = ot.readJson;
ot.readJSONSync = ot.readJsonSync;
var SO = ot;
const bO = ut, hh = le, { copy: PO } = Nl, { remove: qy } = lo, { mkdirp: TO } = Gt, { pathExists: AO } = $n, ph = si;
async function IO(e, t, r = {}) {
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: a = !1 } = await ph.checkPaths(e, t, "move", r);
  await ph.checkParentPaths(e, i, t, "move");
  const s = hh.dirname(t);
  return hh.parse(s).root !== s && await TO(s), OO(e, t, n, a);
}
async function OO(e, t, r, n) {
  if (!n) {
    if (r)
      await qy(t);
    else if (await AO(t))
      throw new Error("dest already exists.");
  }
  try {
    await bO.rename(e, t);
  } catch (i) {
    if (i.code !== "EXDEV")
      throw i;
    await RO(e, t, r);
  }
}
async function RO(e, t, r) {
  return await PO(e, t, {
    overwrite: r,
    errorOnExist: !0,
    preserveTimestamps: !0
  }), qy(e);
}
var CO = IO;
const Hy = ke, jc = le, NO = Nl.copySync, Gy = lo.removeSync, DO = Gt.mkdirpSync, mh = si;
function kO(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: a = !1 } = mh.checkPathsSync(e, t, "move", r);
  return mh.checkParentPathsSync(e, i, t, "move"), FO(t) || DO(jc.dirname(t)), LO(e, t, n, a);
}
function FO(e) {
  const t = jc.dirname(e);
  return jc.parse(t).root === t;
}
function LO(e, t, r, n) {
  if (n) return lc(e, t, r);
  if (r)
    return Gy(t), lc(e, t, r);
  if (Hy.existsSync(t)) throw new Error("dest already exists.");
  return lc(e, t, r);
}
function lc(e, t, r) {
  try {
    Hy.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return xO(e, t, r);
  }
}
function xO(e, t, r) {
  return NO(e, t, {
    overwrite: r,
    errorOnExist: !0,
    preserveTimestamps: !0
  }), Gy(e);
}
var UO = kO;
const jO = he.fromPromise;
var MO = {
  move: jO(CO),
  moveSync: UO
}, BO = {
  // Export promiseified graceful-fs:
  ...ut,
  // Export extra methods:
  ...Nl,
  ...NI,
  ...cO,
  ...SO,
  ...Gt,
  ...MO,
  ...Dl,
  ...$n,
  ...lo
};
const ce = /* @__PURE__ */ js(BO), pn = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
}, uc = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), qO = new Set("0123456789");
function uo(e) {
  const t = [];
  let r = "", n = "start", i = !1;
  for (const a of e)
    switch (a) {
      case "\\": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
        i && (r += a), n = "property", i = !i;
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
          i = !1, r += a;
          break;
        }
        if (uc.has(r))
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
          i = !1, r += a;
          break;
        }
        if (n === "property") {
          if (uc.has(r))
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
        if (n === "index" && !qO.has(a))
          throw new Error("Invalid character in an index");
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
        n === "start" && (n = "property"), i && (i = !1, r += "\\"), r += a;
      }
    }
  switch (i && (r += "\\"), n) {
    case "property": {
      if (uc.has(r))
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
function kl(e, t) {
  if (typeof t != "number" && Array.isArray(e)) {
    const r = Number.parseInt(t, 10);
    return Number.isInteger(r) && e[r] === e[t];
  }
  return !1;
}
function Vy(e, t) {
  if (kl(e, t))
    throw new Error("Cannot use string index");
}
function HO(e, t, r) {
  if (!pn(e) || typeof t != "string")
    return r === void 0 ? e : r;
  const n = uo(t);
  if (n.length === 0)
    return r;
  for (let i = 0; i < n.length; i++) {
    const a = n[i];
    if (kl(e, a) ? e = i === n.length - 1 ? void 0 : null : e = e[a], e == null) {
      if (i !== n.length - 1)
        return r;
      break;
    }
  }
  return e === void 0 ? r : e;
}
function yh(e, t, r) {
  if (!pn(e) || typeof t != "string")
    return e;
  const n = e, i = uo(t);
  for (let a = 0; a < i.length; a++) {
    const s = i[a];
    Vy(e, s), a === i.length - 1 ? e[s] = r : pn(e[s]) || (e[s] = typeof i[a + 1] == "number" ? [] : {}), e = e[s];
  }
  return n;
}
function GO(e, t) {
  if (!pn(e) || typeof t != "string")
    return !1;
  const r = uo(t);
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    if (Vy(e, i), n === r.length - 1)
      return delete e[i], !0;
    if (e = e[i], !pn(e))
      return !1;
  }
}
function VO(e, t) {
  if (!pn(e) || typeof t != "string")
    return !1;
  const r = uo(t);
  if (r.length === 0)
    return !1;
  for (const n of r) {
    if (!pn(e) || !(n in e) || kl(e, n))
      return !1;
    e = e[n];
  }
  return !0;
}
const Er = Us.homedir(), Fl = Us.tmpdir(), { env: qn } = De, zO = (e) => {
  const t = W.join(Er, "Library");
  return {
    data: W.join(t, "Application Support", e),
    config: W.join(t, "Preferences", e),
    cache: W.join(t, "Caches", e),
    log: W.join(t, "Logs", e),
    temp: W.join(Fl, e)
  };
}, WO = (e) => {
  const t = qn.APPDATA || W.join(Er, "AppData", "Roaming"), r = qn.LOCALAPPDATA || W.join(Er, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: W.join(r, e, "Data"),
    config: W.join(t, e, "Config"),
    cache: W.join(r, e, "Cache"),
    log: W.join(r, e, "Log"),
    temp: W.join(Fl, e)
  };
}, KO = (e) => {
  const t = W.basename(Er);
  return {
    data: W.join(qn.XDG_DATA_HOME || W.join(Er, ".local", "share"), e),
    config: W.join(qn.XDG_CONFIG_HOME || W.join(Er, ".config"), e),
    cache: W.join(qn.XDG_CACHE_HOME || W.join(Er, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: W.join(qn.XDG_STATE_HOME || W.join(Er, ".local", "state"), e),
    temp: W.join(Fl, t, e)
  };
};
function YO(e, { suffix: t = "nodejs" } = {}) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  return t && (e += `-${t}`), De.platform === "darwin" ? zO(e) : De.platform === "win32" ? WO(e) : KO(e);
}
const hr = (e, t) => function(...n) {
  return e.apply(void 0, n).catch(t);
}, Kt = (e, t) => function(...n) {
  try {
    return e.apply(void 0, n);
  } catch (i) {
    return t(i);
  }
}, XO = De.getuid ? !De.getuid() : !1, JO = 1e4, yt = () => {
}, Ee = {
  /* API */
  isChangeErrorOk: (e) => {
    if (!Ee.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "ENOSYS" || !XO && (t === "EINVAL" || t === "EPERM");
  },
  isNodeError: (e) => e instanceof Error,
  isRetriableError: (e) => {
    if (!Ee.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCES" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!Ee.isNodeError(e))
      throw e;
    if (!Ee.isChangeErrorOk(e))
      throw e;
  }
};
class QO {
  constructor() {
    this.interval = 25, this.intervalId = void 0, this.limit = JO, this.queueActive = /* @__PURE__ */ new Set(), this.queueWaiting = /* @__PURE__ */ new Set(), this.init = () => {
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
const ZO = new QO(), pr = (e, t) => function(n) {
  return function i(...a) {
    return ZO.schedule().then((s) => {
      const o = (f) => (s(), f), c = (f) => {
        if (s(), Date.now() >= n)
          throw f;
        if (t(f)) {
          const l = Math.round(100 * Math.random());
          return new Promise((d) => setTimeout(d, l)).then(() => i.apply(void 0, a));
        }
        throw f;
      };
      return e.apply(void 0, a).then(o, c);
    });
  };
}, mr = (e, t) => function(n) {
  return function i(...a) {
    try {
      return e.apply(void 0, a);
    } catch (s) {
      if (Date.now() > n)
        throw s;
      if (t(s))
        return i.apply(void 0, a);
      throw s;
    }
  };
}, Ke = {
  attempt: {
    /* ASYNC */
    chmod: hr(ze(se.chmod), Ee.onChangeError),
    chown: hr(ze(se.chown), Ee.onChangeError),
    close: hr(ze(se.close), yt),
    fsync: hr(ze(se.fsync), yt),
    mkdir: hr(ze(se.mkdir), yt),
    realpath: hr(ze(se.realpath), yt),
    stat: hr(ze(se.stat), yt),
    unlink: hr(ze(se.unlink), yt),
    /* SYNC */
    chmodSync: Kt(se.chmodSync, Ee.onChangeError),
    chownSync: Kt(se.chownSync, Ee.onChangeError),
    closeSync: Kt(se.closeSync, yt),
    existsSync: Kt(se.existsSync, yt),
    fsyncSync: Kt(se.fsync, yt),
    mkdirSync: Kt(se.mkdirSync, yt),
    realpathSync: Kt(se.realpathSync, yt),
    statSync: Kt(se.statSync, yt),
    unlinkSync: Kt(se.unlinkSync, yt)
  },
  retry: {
    /* ASYNC */
    close: pr(ze(se.close), Ee.isRetriableError),
    fsync: pr(ze(se.fsync), Ee.isRetriableError),
    open: pr(ze(se.open), Ee.isRetriableError),
    readFile: pr(ze(se.readFile), Ee.isRetriableError),
    rename: pr(ze(se.rename), Ee.isRetriableError),
    stat: pr(ze(se.stat), Ee.isRetriableError),
    write: pr(ze(se.write), Ee.isRetriableError),
    writeFile: pr(ze(se.writeFile), Ee.isRetriableError),
    /* SYNC */
    closeSync: mr(se.closeSync, Ee.isRetriableError),
    fsyncSync: mr(se.fsyncSync, Ee.isRetriableError),
    openSync: mr(se.openSync, Ee.isRetriableError),
    readFileSync: mr(se.readFileSync, Ee.isRetriableError),
    renameSync: mr(se.renameSync, Ee.isRetriableError),
    statSync: mr(se.statSync, Ee.isRetriableError),
    writeSync: mr(se.writeSync, Ee.isRetriableError),
    writeFileSync: mr(se.writeFileSync, Ee.isRetriableError)
  }
}, eR = "utf8", gh = 438, tR = 511, rR = {}, nR = Us.userInfo().uid, iR = Us.userInfo().gid, aR = 1e3, sR = !!De.getuid;
De.getuid && De.getuid();
const vh = 128, oR = (e) => e instanceof Error && "code" in e, _h = (e) => typeof e == "string", fc = (e) => e === void 0, cR = De.platform === "linux", zy = De.platform === "win32", Ll = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"];
zy || Ll.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
cR && Ll.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
class lR {
  /* CONSTRUCTOR */
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.exited = !1, this.exit = (t) => {
      if (!this.exited) {
        this.exited = !0;
        for (const r of this.callbacks)
          r();
        t && (zy && t !== "SIGINT" && t !== "SIGTERM" && t !== "SIGKILL" ? De.kill(De.pid, "SIGTERM") : De.kill(De.pid, t));
      }
    }, this.hook = () => {
      De.once("exit", () => this.exit());
      for (const t of Ll)
        try {
          De.once(t, () => this.exit(t));
        } catch {
        }
    }, this.register = (t) => (this.callbacks.add(t), () => {
      this.callbacks.delete(t);
    }), this.hook();
  }
}
const uR = new lR(), fR = uR.register, Ye = {
  /* VARIABLES */
  store: {},
  /* API */
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), i = `.tmp-${Date.now().toString().slice(-10)}${t}`;
    return `${e}${i}`;
  },
  get: (e, t, r = !0) => {
    const n = Ye.truncate(t(e));
    return n in Ye.store ? Ye.get(e, t, r) : (Ye.store[n] = r, [n, () => delete Ye.store[n]]);
  },
  purge: (e) => {
    Ye.store[e] && (delete Ye.store[e], Ke.attempt.unlink(e));
  },
  purgeSync: (e) => {
    Ye.store[e] && (delete Ye.store[e], Ke.attempt.unlinkSync(e));
  },
  purgeSyncAll: () => {
    for (const e in Ye.store)
      Ye.purgeSync(e);
  },
  truncate: (e) => {
    const t = W.basename(e);
    if (t.length <= vh)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - vh;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
fR(Ye.purgeSyncAll);
function Wy(e, t, r = rR) {
  if (_h(r))
    return Wy(e, t, { encoding: r });
  const n = Date.now() + ((r.timeout ?? aR) || -1);
  let i = null, a = null, s = null;
  try {
    const o = Ke.attempt.realpathSync(e), c = !!o;
    e = o || e, [a, i] = Ye.get(e, r.tmpCreate || Ye.create, r.tmpPurge !== !1);
    const f = sR && fc(r.chown), l = fc(r.mode);
    if (c && (f || l)) {
      const u = Ke.attempt.statSync(e);
      u && (r = { ...r }, f && (r.chown = { uid: u.uid, gid: u.gid }), l && (r.mode = u.mode));
    }
    if (!c) {
      const u = W.dirname(e);
      Ke.attempt.mkdirSync(u, {
        mode: tR,
        recursive: !0
      });
    }
    s = Ke.retry.openSync(n)(a, "w", r.mode || gh), r.tmpCreated && r.tmpCreated(a), _h(t) ? Ke.retry.writeSync(n)(s, t, 0, r.encoding || eR) : fc(t) || Ke.retry.writeSync(n)(s, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? Ke.retry.fsyncSync(n)(s) : Ke.attempt.fsync(s)), Ke.retry.closeSync(n)(s), s = null, r.chown && (r.chown.uid !== nR || r.chown.gid !== iR) && Ke.attempt.chownSync(a, r.chown.uid, r.chown.gid), r.mode && r.mode !== gh && Ke.attempt.chmodSync(a, r.mode);
    try {
      Ke.retry.renameSync(n)(a, e);
    } catch (u) {
      if (!oR(u) || u.code !== "ENAMETOOLONG")
        throw u;
      Ke.retry.renameSync(n)(a, Ye.truncate(e));
    }
    i(), a = null;
  } finally {
    s && Ke.attempt.closeSync(s), a && Ye.purge(a);
  }
}
var Mc = { exports: {} }, xl = {}, Tt = {}, ei = {}, Ta = {}, ne = {}, la = {};
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
      return (w = this._str) !== null && w !== void 0 ? w : this._str = this._items.reduce((I, R) => `${I}${R}`, "");
    }
    get names() {
      var w;
      return (w = this._names) !== null && w !== void 0 ? w : this._names = this._items.reduce((I, R) => (R instanceof r && (I[R.str] = (I[R.str] || 0) + 1), I), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function i(v, ...w) {
    const I = [v[0]];
    let R = 0;
    for (; R < w.length; )
      o(I, w[R]), I.push(v[++R]);
    return new n(I);
  }
  e._ = i;
  const a = new n("+");
  function s(v, ...w) {
    const I = [p(v[0])];
    let R = 0;
    for (; R < w.length; )
      I.push(a), o(I, w[R]), I.push(a, p(v[++R]));
    return c(I), new n(I);
  }
  e.str = s;
  function o(v, w) {
    w instanceof n ? v.push(...w._items) : w instanceof r ? v.push(w) : v.push(u(w));
  }
  e.addCodeArg = o;
  function c(v) {
    let w = 1;
    for (; w < v.length - 1; ) {
      if (v[w] === a) {
        const I = f(v[w - 1], v[w + 1]);
        if (I !== void 0) {
          v.splice(w - 1, 3, I);
          continue;
        }
        v[w++] = "+";
      }
      w++;
    }
  }
  function f(v, w) {
    if (w === '""')
      return v;
    if (v === '""')
      return w;
    if (typeof v == "string")
      return w instanceof r || v[v.length - 1] !== '"' ? void 0 : typeof w != "string" ? `${v.slice(0, -1)}${w}"` : w[0] === '"' ? v.slice(0, -1) + w.slice(1) : void 0;
    if (typeof w == "string" && w[0] === '"' && !(v instanceof r))
      return `"${v}${w.slice(1)}`;
  }
  function l(v, w) {
    return w.emptyStr() ? v : v.emptyStr() ? w : s`${v}${w}`;
  }
  e.strConcat = l;
  function u(v) {
    return typeof v == "number" || typeof v == "boolean" || v === null ? v : p(Array.isArray(v) ? v.join(",") : v);
  }
  function d(v) {
    return new n(p(v));
  }
  e.stringify = d;
  function p(v) {
    return JSON.stringify(v).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = p;
  function y(v) {
    return typeof v == "string" && e.IDENTIFIER.test(v) ? new n(`.${v}`) : i`[${v}]`;
  }
  e.getProperty = y;
  function g(v) {
    if (typeof v == "string" && e.IDENTIFIER.test(v))
      return new n(`${v}`);
    throw new Error(`CodeGen: invalid export name: ${v}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function _(v) {
    return new n(v.toString());
  }
  e.regexpCode = _;
})(la);
var Bc = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = la;
  class r extends Error {
    constructor(f) {
      super(`CodeGen: "code" for ${f} not defined`), this.value = f.value;
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
    constructor({ prefixes: f, parent: l } = {}) {
      this._names = {}, this._prefixes = f, this._parent = l;
    }
    toName(f) {
      return f instanceof t.Name ? f : this.name(f);
    }
    name(f) {
      return new t.Name(this._newName(f));
    }
    _newName(f) {
      const l = this._names[f] || this._nameGroup(f);
      return `${f}${l.index++}`;
    }
    _nameGroup(f) {
      var l, u;
      if (!((u = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || u === void 0) && u.has(f) || this._prefixes && !this._prefixes.has(f))
        throw new Error(`CodeGen: prefix "${f}" is not allowed in this scope`);
      return this._names[f] = { prefix: f, index: 0 };
    }
  }
  e.Scope = i;
  class a extends t.Name {
    constructor(f, l) {
      super(l), this.prefix = f;
    }
    setValue(f, { property: l, itemIndex: u }) {
      this.value = f, this.scopePath = (0, t._)`.${new t.Name(l)}[${u}]`;
    }
  }
  e.ValueScopeName = a;
  const s = (0, t._)`\n`;
  class o extends i {
    constructor(f) {
      super(f), this._values = {}, this._scope = f.scope, this.opts = { ...f, _n: f.lines ? s : t.nil };
    }
    get() {
      return this._scope;
    }
    name(f) {
      return new a(f, this._newName(f));
    }
    value(f, l) {
      var u;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const d = this.toName(f), { prefix: p } = d, y = (u = l.key) !== null && u !== void 0 ? u : l.ref;
      let g = this._values[p];
      if (g) {
        const w = g.get(y);
        if (w)
          return w;
      } else
        g = this._values[p] = /* @__PURE__ */ new Map();
      g.set(y, d);
      const _ = this._scope[p] || (this._scope[p] = []), v = _.length;
      return _[v] = l.ref, d.setValue(l, { property: p, itemIndex: v }), d;
    }
    getValue(f, l) {
      const u = this._values[f];
      if (u)
        return u.get(l);
    }
    scopeRefs(f, l = this._values) {
      return this._reduceValues(l, (u) => {
        if (u.scopePath === void 0)
          throw new Error(`CodeGen: name "${u}" has no value`);
        return (0, t._)`${f}${u.scopePath}`;
      });
    }
    scopeCode(f = this._values, l, u) {
      return this._reduceValues(f, (d) => {
        if (d.value === void 0)
          throw new Error(`CodeGen: name "${d}" has no value`);
        return d.value.code;
      }, l, u);
    }
    _reduceValues(f, l, u = {}, d) {
      let p = t.nil;
      for (const y in f) {
        const g = f[y];
        if (!g)
          continue;
        const _ = u[y] = u[y] || /* @__PURE__ */ new Map();
        g.forEach((v) => {
          if (_.has(v))
            return;
          _.set(v, n.Started);
          let w = l(v);
          if (w) {
            const I = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            p = (0, t._)`${p}${I} ${v} = ${w};${this.opts._n}`;
          } else if (w = d == null ? void 0 : d(v))
            p = (0, t._)`${p}${w}${this.opts._n}`;
          else
            throw new r(v);
          _.set(v, n.Completed);
        });
      }
      return p;
    }
  }
  e.ValueScope = o;
})(Bc);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = la, r = Bc;
  var n = la;
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
  var i = Bc;
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
  class a {
    optimizeNodes() {
      return this;
    }
    optimizeNames($, S) {
      return this;
    }
  }
  class s extends a {
    constructor($, S, D) {
      super(), this.varKind = $, this.name = S, this.rhs = D;
    }
    render({ es5: $, _n: S }) {
      const D = $ ? r.varKinds.var : this.varKind, m = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${D} ${this.name}${m};` + S;
    }
    optimizeNames($, S) {
      if ($[this.name.str])
        return this.rhs && (this.rhs = F(this.rhs, $, S)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class o extends a {
    constructor($, S, D) {
      super(), this.lhs = $, this.rhs = S, this.sideEffects = D;
    }
    render({ _n: $ }) {
      return `${this.lhs} = ${this.rhs};` + $;
    }
    optimizeNames($, S) {
      if (!(this.lhs instanceof t.Name && !$[this.lhs.str] && !this.sideEffects))
        return this.rhs = F(this.rhs, $, S), this;
    }
    get names() {
      const $ = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return Z($, this.rhs);
    }
  }
  class c extends o {
    constructor($, S, D, m) {
      super($, D, m), this.op = S;
    }
    render({ _n: $ }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + $;
    }
  }
  class f extends a {
    constructor($) {
      super(), this.label = $, this.names = {};
    }
    render({ _n: $ }) {
      return `${this.label}:` + $;
    }
  }
  class l extends a {
    constructor($) {
      super(), this.label = $, this.names = {};
    }
    render({ _n: $ }) {
      return `break${this.label ? ` ${this.label}` : ""};` + $;
    }
  }
  class u extends a {
    constructor($) {
      super(), this.error = $;
    }
    render({ _n: $ }) {
      return `throw ${this.error};` + $;
    }
    get names() {
      return this.error.names;
    }
  }
  class d extends a {
    constructor($) {
      super(), this.code = $;
    }
    render({ _n: $ }) {
      return `${this.code};` + $;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames($, S) {
      return this.code = F(this.code, $, S), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class p extends a {
    constructor($ = []) {
      super(), this.nodes = $;
    }
    render($) {
      return this.nodes.reduce((S, D) => S + D.render($), "");
    }
    optimizeNodes() {
      const { nodes: $ } = this;
      let S = $.length;
      for (; S--; ) {
        const D = $[S].optimizeNodes();
        Array.isArray(D) ? $.splice(S, 1, ...D) : D ? $[S] = D : $.splice(S, 1);
      }
      return $.length > 0 ? this : void 0;
    }
    optimizeNames($, S) {
      const { nodes: D } = this;
      let m = D.length;
      for (; m--; ) {
        const h = D[m];
        h.optimizeNames($, S) || (L($, h.names), D.splice(m, 1));
      }
      return D.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce(($, S) => H($, S.names), {});
    }
  }
  class y extends p {
    render($) {
      return "{" + $._n + super.render($) + "}" + $._n;
    }
  }
  class g extends p {
  }
  class _ extends y {
  }
  _.kind = "else";
  class v extends y {
    constructor($, S) {
      super(S), this.condition = $;
    }
    render($) {
      let S = `if(${this.condition})` + super.render($);
      return this.else && (S += "else " + this.else.render($)), S;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const $ = this.condition;
      if ($ === !0)
        return this.nodes;
      let S = this.else;
      if (S) {
        const D = S.optimizeNodes();
        S = this.else = Array.isArray(D) ? new _(D) : D;
      }
      if (S)
        return $ === !1 ? S instanceof v ? S : S.nodes : this.nodes.length ? this : new v(q($), S instanceof v ? [S] : S.nodes);
      if (!($ === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames($, S) {
      var D;
      if (this.else = (D = this.else) === null || D === void 0 ? void 0 : D.optimizeNames($, S), !!(super.optimizeNames($, S) || this.else))
        return this.condition = F(this.condition, $, S), this;
    }
    get names() {
      const $ = super.names;
      return Z($, this.condition), this.else && H($, this.else.names), $;
    }
  }
  v.kind = "if";
  class w extends y {
  }
  w.kind = "for";
  class I extends w {
    constructor($) {
      super(), this.iteration = $;
    }
    render($) {
      return `for(${this.iteration})` + super.render($);
    }
    optimizeNames($, S) {
      if (super.optimizeNames($, S))
        return this.iteration = F(this.iteration, $, S), this;
    }
    get names() {
      return H(super.names, this.iteration.names);
    }
  }
  class R extends w {
    constructor($, S, D, m) {
      super(), this.varKind = $, this.name = S, this.from = D, this.to = m;
    }
    render($) {
      const S = $.es5 ? r.varKinds.var : this.varKind, { name: D, from: m, to: h } = this;
      return `for(${S} ${D}=${m}; ${D}<${h}; ${D}++)` + super.render($);
    }
    get names() {
      const $ = Z(super.names, this.from);
      return Z($, this.to);
    }
  }
  class j extends w {
    constructor($, S, D, m) {
      super(), this.loop = $, this.varKind = S, this.name = D, this.iterable = m;
    }
    render($) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render($);
    }
    optimizeNames($, S) {
      if (super.optimizeNames($, S))
        return this.iterable = F(this.iterable, $, S), this;
    }
    get names() {
      return H(super.names, this.iterable.names);
    }
  }
  class J extends y {
    constructor($, S, D) {
      super(), this.name = $, this.args = S, this.async = D;
    }
    render($) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render($);
    }
  }
  J.kind = "func";
  class Y extends p {
    render($) {
      return "return " + super.render($);
    }
  }
  Y.kind = "return";
  class me extends y {
    render($) {
      let S = "try" + super.render($);
      return this.catch && (S += this.catch.render($)), this.finally && (S += this.finally.render($)), S;
    }
    optimizeNodes() {
      var $, S;
      return super.optimizeNodes(), ($ = this.catch) === null || $ === void 0 || $.optimizeNodes(), (S = this.finally) === null || S === void 0 || S.optimizeNodes(), this;
    }
    optimizeNames($, S) {
      var D, m;
      return super.optimizeNames($, S), (D = this.catch) === null || D === void 0 || D.optimizeNames($, S), (m = this.finally) === null || m === void 0 || m.optimizeNames($, S), this;
    }
    get names() {
      const $ = super.names;
      return this.catch && H($, this.catch.names), this.finally && H($, this.finally.names), $;
    }
  }
  class b extends y {
    constructor($) {
      super(), this.error = $;
    }
    render($) {
      return `catch(${this.error})` + super.render($);
    }
  }
  b.kind = "catch";
  class Q extends y {
    render($) {
      return "finally" + super.render($);
    }
  }
  Q.kind = "finally";
  class M {
    constructor($, S = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...S, _n: S.lines ? `
` : "" }, this._extScope = $, this._scope = new r.Scope({ parent: $ }), this._nodes = [new g()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name($) {
      return this._scope.name($);
    }
    // reserves unique name in the external scope
    scopeName($) {
      return this._extScope.name($);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue($, S) {
      const D = this._extScope.value($, S);
      return (this._values[D.prefix] || (this._values[D.prefix] = /* @__PURE__ */ new Set())).add(D), D;
    }
    getScopeValue($, S) {
      return this._extScope.getValue($, S);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs($) {
      return this._extScope.scopeRefs($, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def($, S, D, m) {
      const h = this._scope.toName(S);
      return D !== void 0 && m && (this._constants[h.str] = D), this._leafNode(new s($, h, D)), h;
    }
    // `const` declaration (`var` in es5 mode)
    const($, S, D) {
      return this._def(r.varKinds.const, $, S, D);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let($, S, D) {
      return this._def(r.varKinds.let, $, S, D);
    }
    // `var` declaration with optional assignment
    var($, S, D) {
      return this._def(r.varKinds.var, $, S, D);
    }
    // assignment code
    assign($, S, D) {
      return this._leafNode(new o($, S, D));
    }
    // `+=` code
    add($, S) {
      return this._leafNode(new c($, e.operators.ADD, S));
    }
    // appends passed SafeExpr to code or executes Block
    code($) {
      return typeof $ == "function" ? $() : $ !== t.nil && this._leafNode(new d($)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...$) {
      const S = ["{"];
      for (const [D, m] of $)
        S.length > 1 && S.push(","), S.push(D), (D !== m || this.opts.es5) && (S.push(":"), (0, t.addCodeArg)(S, m));
      return S.push("}"), new t._Code(S);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if($, S, D) {
      if (this._blockNode(new v($)), S && D)
        this.code(S).else().code(D).endIf();
      else if (S)
        this.code(S).endIf();
      else if (D)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf($) {
      return this._elseNode(new v($));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new _());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(v, _);
    }
    _for($, S) {
      return this._blockNode($), S && this.code(S).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for($, S) {
      return this._for(new I($), S);
    }
    // `for` statement for a range of values
    forRange($, S, D, m, h = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const N = this._scope.toName($);
      return this._for(new R(h, N, S, D), () => m(N));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf($, S, D, m = r.varKinds.const) {
      const h = this._scope.toName($);
      if (this.opts.es5) {
        const N = S instanceof t.Name ? S : this.var("_arr", S);
        return this.forRange("_i", 0, (0, t._)`${N}.length`, (P) => {
          this.var(h, (0, t._)`${N}[${P}]`), D(h);
        });
      }
      return this._for(new j("of", m, h, S), () => D(h));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn($, S, D, m = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf($, (0, t._)`Object.keys(${S})`, D);
      const h = this._scope.toName($);
      return this._for(new j("in", m, h, S), () => D(h));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label($) {
      return this._leafNode(new f($));
    }
    // `break` statement
    break($) {
      return this._leafNode(new l($));
    }
    // `return` statement
    return($) {
      const S = new Y();
      if (this._blockNode(S), this.code($), S.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(Y);
    }
    // `try` statement
    try($, S, D) {
      if (!S && !D)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const m = new me();
      if (this._blockNode(m), this.code($), S) {
        const h = this.name("e");
        this._currNode = m.catch = new b(h), S(h);
      }
      return D && (this._currNode = m.finally = new Q(), this.code(D)), this._endBlockNode(b, Q);
    }
    // `throw` statement
    throw($) {
      return this._leafNode(new u($));
    }
    // start self-balancing block
    block($, S) {
      return this._blockStarts.push(this._nodes.length), $ && this.code($).endBlock(S), this;
    }
    // end the current self-balancing block
    endBlock($) {
      const S = this._blockStarts.pop();
      if (S === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const D = this._nodes.length - S;
      if (D < 0 || $ !== void 0 && D !== $)
        throw new Error(`CodeGen: wrong number of nodes: ${D} vs ${$} expected`);
      return this._nodes.length = S, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func($, S = t.nil, D, m) {
      return this._blockNode(new J($, S, D)), m && this.code(m).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(J);
    }
    optimize($ = 1) {
      for (; $-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode($) {
      return this._currNode.nodes.push($), this;
    }
    _blockNode($) {
      this._currNode.nodes.push($), this._nodes.push($);
    }
    _endBlockNode($, S) {
      const D = this._currNode;
      if (D instanceof $ || S && D instanceof S)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${S ? `${$.kind}/${S.kind}` : $.kind}"`);
    }
    _elseNode($) {
      const S = this._currNode;
      if (!(S instanceof v))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = S.else = $, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const $ = this._nodes;
      return $[$.length - 1];
    }
    set _currNode($) {
      const S = this._nodes;
      S[S.length - 1] = $;
    }
  }
  e.CodeGen = M;
  function H(O, $) {
    for (const S in $)
      O[S] = (O[S] || 0) + ($[S] || 0);
    return O;
  }
  function Z(O, $) {
    return $ instanceof t._CodeOrName ? H(O, $.names) : O;
  }
  function F(O, $, S) {
    if (O instanceof t.Name)
      return D(O);
    if (!m(O))
      return O;
    return new t._Code(O._items.reduce((h, N) => (N instanceof t.Name && (N = D(N)), N instanceof t._Code ? h.push(...N._items) : h.push(N), h), []));
    function D(h) {
      const N = S[h.str];
      return N === void 0 || $[h.str] !== 1 ? h : (delete $[h.str], N);
    }
    function m(h) {
      return h instanceof t._Code && h._items.some((N) => N instanceof t.Name && $[N.str] === 1 && S[N.str] !== void 0);
    }
  }
  function L(O, $) {
    for (const S in $)
      O[S] = (O[S] || 0) - ($[S] || 0);
  }
  function q(O) {
    return typeof O == "boolean" || typeof O == "number" || O === null ? !O : (0, t._)`!${C(O)}`;
  }
  e.not = q;
  const x = T(e.operators.AND);
  function G(...O) {
    return O.reduce(x);
  }
  e.and = G;
  const B = T(e.operators.OR);
  function k(...O) {
    return O.reduce(B);
  }
  e.or = k;
  function T(O) {
    return ($, S) => $ === t.nil ? S : S === t.nil ? $ : (0, t._)`${C($)} ${O} ${C(S)}`;
  }
  function C(O) {
    return O instanceof t.Name ? O : (0, t._)`(${O})`;
  }
})(ne);
var V = {};
Object.defineProperty(V, "__esModule", { value: !0 });
V.checkStrictMode = V.getErrorPath = V.Type = V.useFunc = V.setEvaluated = V.evaluatedPropsToName = V.mergeEvaluated = V.eachItem = V.unescapeJsonPointer = V.escapeJsonPointer = V.escapeFragment = V.unescapeFragment = V.schemaRefOrVal = V.schemaHasRulesButRef = V.schemaHasRules = V.checkUnknownRules = V.alwaysValidSchema = V.toHash = void 0;
const ye = ne, dR = la;
function hR(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
V.toHash = hR;
function pR(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Ky(e, t), !Yy(t, e.self.RULES.all));
}
V.alwaysValidSchema = pR;
function Ky(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const i = n.RULES.keywords;
  for (const a in t)
    i[a] || Qy(e, `unknown keyword: "${a}"`);
}
V.checkUnknownRules = Ky;
function Yy(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
V.schemaHasRules = Yy;
function mR(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
V.schemaHasRulesButRef = mR;
function yR({ topSchemaRef: e, schemaPath: t }, r, n, i) {
  if (!i) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ye._)`${r}`;
  }
  return (0, ye._)`${e}${t}${(0, ye.getProperty)(n)}`;
}
V.schemaRefOrVal = yR;
function gR(e) {
  return Xy(decodeURIComponent(e));
}
V.unescapeFragment = gR;
function vR(e) {
  return encodeURIComponent(Ul(e));
}
V.escapeFragment = vR;
function Ul(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
V.escapeJsonPointer = Ul;
function Xy(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
V.unescapeJsonPointer = Xy;
function _R(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
V.eachItem = _R;
function $h({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (i, a, s, o) => {
    const c = s === void 0 ? a : s instanceof ye.Name ? (a instanceof ye.Name ? e(i, a, s) : t(i, a, s), s) : a instanceof ye.Name ? (t(i, s, a), a) : r(a, s);
    return o === ye.Name && !(c instanceof ye.Name) ? n(i, c) : c;
  };
}
V.mergeEvaluated = {
  props: $h({
    mergeNames: (e, t, r) => e.if((0, ye._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ye._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ye._)`${r} || {}`).code((0, ye._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ye._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ye._)`${r} || {}`), jl(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Jy
  }),
  items: $h({
    mergeNames: (e, t, r) => e.if((0, ye._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ye._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ye._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ye._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Jy(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ye._)`{}`);
  return t !== void 0 && jl(e, r, t), r;
}
V.evaluatedPropsToName = Jy;
function jl(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ye._)`${t}${(0, ye.getProperty)(n)}`, !0));
}
V.setEvaluated = jl;
const wh = {};
function $R(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: wh[t.code] || (wh[t.code] = new dR._Code(t.code))
  });
}
V.useFunc = $R;
var qc;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(qc || (V.Type = qc = {}));
function wR(e, t, r) {
  if (e instanceof ye.Name) {
    const n = t === qc.Num;
    return r ? n ? (0, ye._)`"[" + ${e} + "]"` : (0, ye._)`"['" + ${e} + "']"` : n ? (0, ye._)`"/" + ${e}` : (0, ye._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ye.getProperty)(e).toString() : "/" + Ul(e);
}
V.getErrorPath = wR;
function Qy(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
V.checkStrictMode = Qy;
var _t = {};
Object.defineProperty(_t, "__esModule", { value: !0 });
const We = ne, ER = {
  // validation function arguments
  data: new We.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new We.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new We.Name("instancePath"),
  parentData: new We.Name("parentData"),
  parentDataProperty: new We.Name("parentDataProperty"),
  rootData: new We.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new We.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new We.Name("vErrors"),
  // null or array of validation errors
  errors: new We.Name("errors"),
  // counter of validation errors
  this: new We.Name("this"),
  // "globals"
  self: new We.Name("self"),
  scope: new We.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new We.Name("json"),
  jsonPos: new We.Name("jsonPos"),
  jsonLen: new We.Name("jsonLen"),
  jsonPart: new We.Name("jsonPart")
};
_t.default = ER;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = ne, r = V, n = _t;
  e.keywordError = {
    message: ({ keyword: _ }) => (0, t.str)`must pass "${_}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: _, schemaType: v }) => v ? (0, t.str)`"${_}" keyword must be ${v} ($data)` : (0, t.str)`"${_}" keyword is invalid ($data)`
  };
  function i(_, v = e.keywordError, w, I) {
    const { it: R } = _, { gen: j, compositeRule: J, allErrors: Y } = R, me = u(_, v, w);
    I ?? (J || Y) ? c(j, me) : f(R, (0, t._)`[${me}]`);
  }
  e.reportError = i;
  function a(_, v = e.keywordError, w) {
    const { it: I } = _, { gen: R, compositeRule: j, allErrors: J } = I, Y = u(_, v, w);
    c(R, Y), j || J || f(I, n.default.vErrors);
  }
  e.reportExtraError = a;
  function s(_, v) {
    _.assign(n.default.errors, v), _.if((0, t._)`${n.default.vErrors} !== null`, () => _.if(v, () => _.assign((0, t._)`${n.default.vErrors}.length`, v), () => _.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = s;
  function o({ gen: _, keyword: v, schemaValue: w, data: I, errsCount: R, it: j }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const J = _.name("err");
    _.forRange("i", R, n.default.errors, (Y) => {
      _.const(J, (0, t._)`${n.default.vErrors}[${Y}]`), _.if((0, t._)`${J}.instancePath === undefined`, () => _.assign((0, t._)`${J}.instancePath`, (0, t.strConcat)(n.default.instancePath, j.errorPath))), _.assign((0, t._)`${J}.schemaPath`, (0, t.str)`${j.errSchemaPath}/${v}`), j.opts.verbose && (_.assign((0, t._)`${J}.schema`, w), _.assign((0, t._)`${J}.data`, I));
    });
  }
  e.extendErrors = o;
  function c(_, v) {
    const w = _.const("err", v);
    _.if((0, t._)`${n.default.vErrors} === null`, () => _.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), _.code((0, t._)`${n.default.errors}++`);
  }
  function f(_, v) {
    const { gen: w, validateName: I, schemaEnv: R } = _;
    R.$async ? w.throw((0, t._)`new ${_.ValidationError}(${v})`) : (w.assign((0, t._)`${I}.errors`, v), w.return(!1));
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
  function u(_, v, w) {
    const { createErrors: I } = _.it;
    return I === !1 ? (0, t._)`{}` : d(_, v, w);
  }
  function d(_, v, w = {}) {
    const { gen: I, it: R } = _, j = [
      p(R, w),
      y(_, w)
    ];
    return g(_, v, j), I.object(...j);
  }
  function p({ errorPath: _ }, { instancePath: v }) {
    const w = v ? (0, t.str)`${_}${(0, r.getErrorPath)(v, r.Type.Str)}` : _;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function y({ keyword: _, it: { errSchemaPath: v } }, { schemaPath: w, parentSchema: I }) {
    let R = I ? v : (0, t.str)`${v}/${_}`;
    return w && (R = (0, t.str)`${R}${(0, r.getErrorPath)(w, r.Type.Str)}`), [l.schemaPath, R];
  }
  function g(_, { params: v, message: w }, I) {
    const { keyword: R, data: j, schemaValue: J, it: Y } = _, { opts: me, propertyName: b, topSchemaRef: Q, schemaPath: M } = Y;
    I.push([l.keyword, R], [l.params, typeof v == "function" ? v(_) : v || (0, t._)`{}`]), me.messages && I.push([l.message, typeof w == "function" ? w(_) : w]), me.verbose && I.push([l.schema, J], [l.parentSchema, (0, t._)`${Q}${M}`], [n.default.data, j]), b && I.push([l.propertyName, b]);
  }
})(Ta);
Object.defineProperty(ei, "__esModule", { value: !0 });
ei.boolOrEmptySchema = ei.topBoolOrEmptySchema = void 0;
const SR = Ta, bR = ne, PR = _t, TR = {
  message: "boolean schema is false"
};
function AR(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Zy(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(PR.default.data) : (t.assign((0, bR._)`${n}.errors`, null), t.return(!0));
}
ei.topBoolOrEmptySchema = AR;
function IR(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Zy(e)) : r.var(t, !0);
}
ei.boolOrEmptySchema = IR;
function Zy(e, t) {
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
  (0, SR.reportError)(i, TR, void 0, t);
}
var Ne = {}, mn = {};
Object.defineProperty(mn, "__esModule", { value: !0 });
mn.getRules = mn.isJSONType = void 0;
const OR = ["string", "number", "integer", "boolean", "null", "object", "array"], RR = new Set(OR);
function CR(e) {
  return typeof e == "string" && RR.has(e);
}
mn.isJSONType = CR;
function NR() {
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
mn.getRules = NR;
var Zt = {};
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.shouldUseRule = Zt.shouldUseGroup = Zt.schemaHasRulesForType = void 0;
function DR({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && eg(e, n);
}
Zt.schemaHasRulesForType = DR;
function eg(e, t) {
  return t.rules.some((r) => tg(e, r));
}
Zt.shouldUseGroup = eg;
function tg(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Zt.shouldUseRule = tg;
Object.defineProperty(Ne, "__esModule", { value: !0 });
Ne.reportTypeError = Ne.checkDataTypes = Ne.checkDataType = Ne.coerceAndCheckDataType = Ne.getJSONTypes = Ne.getSchemaTypes = Ne.DataType = void 0;
const kR = mn, FR = Zt, LR = Ta, ae = ne, rg = V;
var Wn;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Wn || (Ne.DataType = Wn = {}));
function xR(e) {
  const t = ng(e.type);
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
Ne.getSchemaTypes = xR;
function ng(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(kR.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Ne.getJSONTypes = ng;
function UR(e, t) {
  const { gen: r, data: n, opts: i } = e, a = jR(t, i.coerceTypes), s = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, FR.schemaHasRulesForType)(e, t[0]));
  if (s) {
    const o = Ml(t, n, i.strictNumbers, Wn.Wrong);
    r.if(o, () => {
      a.length ? MR(e, t, a) : Bl(e);
    });
  }
  return s;
}
Ne.coerceAndCheckDataType = UR;
const ig = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function jR(e, t) {
  return t ? e.filter((r) => ig.has(r) || t === "array" && r === "array") : [];
}
function MR(e, t, r) {
  const { gen: n, data: i, opts: a } = e, s = n.let("dataType", (0, ae._)`typeof ${i}`), o = n.let("coerced", (0, ae._)`undefined`);
  a.coerceTypes === "array" && n.if((0, ae._)`${s} == 'object' && Array.isArray(${i}) && ${i}.length == 1`, () => n.assign(i, (0, ae._)`${i}[0]`).assign(s, (0, ae._)`typeof ${i}`).if(Ml(t, i, a.strictNumbers), () => n.assign(o, i))), n.if((0, ae._)`${o} !== undefined`);
  for (const f of r)
    (ig.has(f) || f === "array" && a.coerceTypes === "array") && c(f);
  n.else(), Bl(e), n.endIf(), n.if((0, ae._)`${o} !== undefined`, () => {
    n.assign(i, o), BR(e, o);
  });
  function c(f) {
    switch (f) {
      case "string":
        n.elseIf((0, ae._)`${s} == "number" || ${s} == "boolean"`).assign(o, (0, ae._)`"" + ${i}`).elseIf((0, ae._)`${i} === null`).assign(o, (0, ae._)`""`);
        return;
      case "number":
        n.elseIf((0, ae._)`${s} == "boolean" || ${i} === null
              || (${s} == "string" && ${i} && ${i} == +${i})`).assign(o, (0, ae._)`+${i}`);
        return;
      case "integer":
        n.elseIf((0, ae._)`${s} === "boolean" || ${i} === null
              || (${s} === "string" && ${i} && ${i} == +${i} && !(${i} % 1))`).assign(o, (0, ae._)`+${i}`);
        return;
      case "boolean":
        n.elseIf((0, ae._)`${i} === "false" || ${i} === 0 || ${i} === null`).assign(o, !1).elseIf((0, ae._)`${i} === "true" || ${i} === 1`).assign(o, !0);
        return;
      case "null":
        n.elseIf((0, ae._)`${i} === "" || ${i} === 0 || ${i} === false`), n.assign(o, null);
        return;
      case "array":
        n.elseIf((0, ae._)`${s} === "string" || ${s} === "number"
              || ${s} === "boolean" || ${i} === null`).assign(o, (0, ae._)`[${i}]`);
    }
  }
}
function BR({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, ae._)`${t} !== undefined`, () => e.assign((0, ae._)`${t}[${r}]`, n));
}
function Hc(e, t, r, n = Wn.Correct) {
  const i = n === Wn.Correct ? ae.operators.EQ : ae.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, ae._)`${t} ${i} null`;
    case "array":
      a = (0, ae._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, ae._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = s((0, ae._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = s();
      break;
    default:
      return (0, ae._)`typeof ${t} ${i} ${e}`;
  }
  return n === Wn.Correct ? a : (0, ae.not)(a);
  function s(o = ae.nil) {
    return (0, ae.and)((0, ae._)`typeof ${t} == "number"`, o, r ? (0, ae._)`isFinite(${t})` : ae.nil);
  }
}
Ne.checkDataType = Hc;
function Ml(e, t, r, n) {
  if (e.length === 1)
    return Hc(e[0], t, r, n);
  let i;
  const a = (0, rg.toHash)(e);
  if (a.array && a.object) {
    const s = (0, ae._)`typeof ${t} != "object"`;
    i = a.null ? s : (0, ae._)`!${t} || ${s}`, delete a.null, delete a.array, delete a.object;
  } else
    i = ae.nil;
  a.number && delete a.integer;
  for (const s in a)
    i = (0, ae.and)(i, Hc(s, t, r, n));
  return i;
}
Ne.checkDataTypes = Ml;
const qR = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, ae._)`{type: ${e}}` : (0, ae._)`{type: ${t}}`
};
function Bl(e) {
  const t = HR(e);
  (0, LR.reportError)(t, qR);
}
Ne.reportTypeError = Bl;
function HR(e) {
  const { gen: t, data: r, schema: n } = e, i = (0, rg.schemaRefOrVal)(e, n, "type");
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
var fo = {};
Object.defineProperty(fo, "__esModule", { value: !0 });
fo.assignDefaults = void 0;
const Nn = ne, GR = V;
function VR(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const i in r)
      Eh(e, i, r[i].default);
  else t === "array" && Array.isArray(n) && n.forEach((i, a) => Eh(e, a, i.default));
}
fo.assignDefaults = VR;
function Eh(e, t, r) {
  const { gen: n, compositeRule: i, data: a, opts: s } = e;
  if (r === void 0)
    return;
  const o = (0, Nn._)`${a}${(0, Nn.getProperty)(t)}`;
  if (i) {
    (0, GR.checkStrictMode)(e, `default is ignored for: ${o}`);
    return;
  }
  let c = (0, Nn._)`${o} === undefined`;
  s.useDefaults === "empty" && (c = (0, Nn._)`${c} || ${o} === null || ${o} === ""`), n.if(c, (0, Nn._)`${o} = ${(0, Nn.stringify)(r)}`);
}
var Mt = {}, oe = {};
Object.defineProperty(oe, "__esModule", { value: !0 });
oe.validateUnion = oe.validateArray = oe.usePattern = oe.callValidateCode = oe.schemaProperties = oe.allSchemaProperties = oe.noPropertyInData = oe.propertyInData = oe.isOwnProperty = oe.hasPropFunc = oe.reportMissingProp = oe.checkMissingProp = oe.checkReportMissingProp = void 0;
const $e = ne, ql = V, yr = _t, zR = V;
function WR(e, t) {
  const { gen: r, data: n, it: i } = e;
  r.if(Gl(r, n, t, i.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, $e._)`${t}` }, !0), e.error();
  });
}
oe.checkReportMissingProp = WR;
function KR({ gen: e, data: t, it: { opts: r } }, n, i) {
  return (0, $e.or)(...n.map((a) => (0, $e.and)(Gl(e, t, a, r.ownProperties), (0, $e._)`${i} = ${a}`)));
}
oe.checkMissingProp = KR;
function YR(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
oe.reportMissingProp = YR;
function ag(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, $e._)`Object.prototype.hasOwnProperty`
  });
}
oe.hasPropFunc = ag;
function Hl(e, t, r) {
  return (0, $e._)`${ag(e)}.call(${t}, ${r})`;
}
oe.isOwnProperty = Hl;
function XR(e, t, r, n) {
  const i = (0, $e._)`${t}${(0, $e.getProperty)(r)} !== undefined`;
  return n ? (0, $e._)`${i} && ${Hl(e, t, r)}` : i;
}
oe.propertyInData = XR;
function Gl(e, t, r, n) {
  const i = (0, $e._)`${t}${(0, $e.getProperty)(r)} === undefined`;
  return n ? (0, $e.or)(i, (0, $e.not)(Hl(e, t, r))) : i;
}
oe.noPropertyInData = Gl;
function sg(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
oe.allSchemaProperties = sg;
function JR(e, t) {
  return sg(t).filter((r) => !(0, ql.alwaysValidSchema)(e, t[r]));
}
oe.schemaProperties = JR;
function QR({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: i, errorPath: a }, it: s }, o, c, f) {
  const l = f ? (0, $e._)`${e}, ${t}, ${n}${i}` : t, u = [
    [yr.default.instancePath, (0, $e.strConcat)(yr.default.instancePath, a)],
    [yr.default.parentData, s.parentData],
    [yr.default.parentDataProperty, s.parentDataProperty],
    [yr.default.rootData, yr.default.rootData]
  ];
  s.opts.dynamicRef && u.push([yr.default.dynamicAnchors, yr.default.dynamicAnchors]);
  const d = (0, $e._)`${l}, ${r.object(...u)}`;
  return c !== $e.nil ? (0, $e._)`${o}.call(${c}, ${d})` : (0, $e._)`${o}(${d})`;
}
oe.callValidateCode = QR;
const ZR = (0, $e._)`new RegExp`;
function eC({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: i } = t.code, a = i(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, $e._)`${i.code === "new RegExp" ? ZR : (0, zR.useFunc)(e, i)}(${r}, ${n})`
  });
}
oe.usePattern = eC;
function tC(e) {
  const { gen: t, data: r, keyword: n, it: i } = e, a = t.name("valid");
  if (i.allErrors) {
    const o = t.let("valid", !0);
    return s(() => t.assign(o, !1)), o;
  }
  return t.var(a, !0), s(() => t.break()), a;
  function s(o) {
    const c = t.const("len", (0, $e._)`${r}.length`);
    t.forRange("i", 0, c, (f) => {
      e.subschema({
        keyword: n,
        dataProp: f,
        dataPropType: ql.Type.Num
      }, a), t.if((0, $e.not)(a), o);
    });
  }
}
oe.validateArray = tC;
function rC(e) {
  const { gen: t, schema: r, keyword: n, it: i } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, ql.alwaysValidSchema)(i, c)) && !i.opts.unevaluated)
    return;
  const s = t.let("valid", !1), o = t.name("_valid");
  t.block(() => r.forEach((c, f) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: f,
      compositeRule: !0
    }, o);
    t.assign(s, (0, $e._)`${s} || ${o}`), e.mergeValidEvaluated(l, o) || t.if((0, $e.not)(s));
  })), e.result(s, () => e.reset(), () => e.error(!0));
}
oe.validateUnion = rC;
Object.defineProperty(Mt, "__esModule", { value: !0 });
Mt.validateKeywordUsage = Mt.validSchemaType = Mt.funcKeywordCode = Mt.macroKeywordCode = void 0;
const tt = ne, sn = _t, nC = oe, iC = Ta;
function aC(e, t) {
  const { gen: r, keyword: n, schema: i, parentSchema: a, it: s } = e, o = t.macro.call(s.self, i, a, s), c = og(r, n, o);
  s.opts.validateSchema !== !1 && s.self.validateSchema(o, !0);
  const f = r.name("valid");
  e.subschema({
    schema: o,
    schemaPath: tt.nil,
    errSchemaPath: `${s.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, f), e.pass(f, () => e.error(!0));
}
Mt.macroKeywordCode = aC;
function sC(e, t) {
  var r;
  const { gen: n, keyword: i, schema: a, parentSchema: s, $data: o, it: c } = e;
  cC(c, t);
  const f = !o && t.compile ? t.compile.call(c.self, a, s, c) : t.validate, l = og(n, i, f), u = n.let("valid");
  e.block$data(u, d), e.ok((r = t.valid) !== null && r !== void 0 ? r : u);
  function d() {
    if (t.errors === !1)
      g(), t.modifying && Sh(e), _(() => e.error());
    else {
      const v = t.async ? p() : y();
      t.modifying && Sh(e), _(() => oC(e, v));
    }
  }
  function p() {
    const v = n.let("ruleErrs", null);
    return n.try(() => g((0, tt._)`await `), (w) => n.assign(u, !1).if((0, tt._)`${w} instanceof ${c.ValidationError}`, () => n.assign(v, (0, tt._)`${w}.errors`), () => n.throw(w))), v;
  }
  function y() {
    const v = (0, tt._)`${l}.errors`;
    return n.assign(v, null), g(tt.nil), v;
  }
  function g(v = t.async ? (0, tt._)`await ` : tt.nil) {
    const w = c.opts.passContext ? sn.default.this : sn.default.self, I = !("compile" in t && !o || t.schema === !1);
    n.assign(u, (0, tt._)`${v}${(0, nC.callValidateCode)(e, l, w, I)}`, t.modifying);
  }
  function _(v) {
    var w;
    n.if((0, tt.not)((w = t.valid) !== null && w !== void 0 ? w : u), v);
  }
}
Mt.funcKeywordCode = sC;
function Sh(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, tt._)`${n.parentData}[${n.parentDataProperty}]`));
}
function oC(e, t) {
  const { gen: r } = e;
  r.if((0, tt._)`Array.isArray(${t})`, () => {
    r.assign(sn.default.vErrors, (0, tt._)`${sn.default.vErrors} === null ? ${t} : ${sn.default.vErrors}.concat(${t})`).assign(sn.default.errors, (0, tt._)`${sn.default.vErrors}.length`), (0, iC.extendErrors)(e);
  }, () => e.error());
}
function cC({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function og(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, tt.stringify)(r) });
}
function lC(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
Mt.validSchemaType = lC;
function uC({ schema: e, opts: t, self: r, errSchemaPath: n }, i, a) {
  if (Array.isArray(i.keyword) ? !i.keyword.includes(a) : i.keyword !== a)
    throw new Error("ajv implementation error");
  const s = i.dependencies;
  if (s != null && s.some((o) => !Object.prototype.hasOwnProperty.call(e, o)))
    throw new Error(`parent schema must have dependencies of ${a}: ${s.join(",")}`);
  if (i.validateSchema && !i.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(i.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
Mt.validateKeywordUsage = uC;
var Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.extendSubschemaMode = Or.extendSubschemaData = Or.getSubschema = void 0;
const jt = ne, cg = V;
function fC(e, { keyword: t, schemaProp: r, schema: n, schemaPath: i, errSchemaPath: a, topSchemaRef: s }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const o = e.schema[t];
    return r === void 0 ? {
      schema: o,
      schemaPath: (0, jt._)`${e.schemaPath}${(0, jt.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: o[r],
      schemaPath: (0, jt._)`${e.schemaPath}${(0, jt.getProperty)(t)}${(0, jt.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, cg.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (i === void 0 || a === void 0 || s === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: i,
      topSchemaRef: s,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
Or.getSubschema = fC;
function dC(e, t, { dataProp: r, dataPropType: n, data: i, dataTypes: a, propertyName: s }) {
  if (i !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: o } = t;
  if (r !== void 0) {
    const { errorPath: f, dataPathArr: l, opts: u } = t, d = o.let("data", (0, jt._)`${t.data}${(0, jt.getProperty)(r)}`, !0);
    c(d), e.errorPath = (0, jt.str)`${f}${(0, cg.getErrorPath)(r, n, u.jsPropertySyntax)}`, e.parentDataProperty = (0, jt._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (i !== void 0) {
    const f = i instanceof jt.Name ? i : o.let("data", i, !0);
    c(f), s !== void 0 && (e.propertyName = s);
  }
  a && (e.dataTypes = a);
  function c(f) {
    e.data = f, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, f];
  }
}
Or.extendSubschemaData = dC;
function hC(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: i, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), i !== void 0 && (e.createErrors = i), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Or.extendSubschemaMode = hC;
var qe = {}, lg = function e(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, i, a;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (i = n; i-- !== 0; )
        if (!e(t[i], r[i])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
    if (a = Object.keys(t), n = a.length, n !== Object.keys(r).length) return !1;
    for (i = n; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, a[i])) return !1;
    for (i = n; i-- !== 0; ) {
      var s = a[i];
      if (!e(t[s], r[s])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, ug = { exports: {} }, Ar = ug.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, i = r.post || function() {
  };
  fs(t, n, i, e, "", e);
};
Ar.keywords = {
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
Ar.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Ar.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Ar.skipKeywords = {
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
function fs(e, t, r, n, i, a, s, o, c, f) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, i, a, s, o, c, f);
    for (var l in n) {
      var u = n[l];
      if (Array.isArray(u)) {
        if (l in Ar.arrayKeywords)
          for (var d = 0; d < u.length; d++)
            fs(e, t, r, u[d], i + "/" + l + "/" + d, a, i, l, n, d);
      } else if (l in Ar.propsKeywords) {
        if (u && typeof u == "object")
          for (var p in u)
            fs(e, t, r, u[p], i + "/" + l + "/" + pC(p), a, i, l, n, p);
      } else (l in Ar.keywords || e.allKeys && !(l in Ar.skipKeywords)) && fs(e, t, r, u, i + "/" + l, a, i, l, n);
    }
    r(n, i, a, s, o, c, f);
  }
}
function pC(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var mC = ug.exports;
Object.defineProperty(qe, "__esModule", { value: !0 });
qe.getSchemaRefs = qe.resolveUrl = qe.normalizeId = qe._getFullPath = qe.getFullPath = qe.inlineRef = void 0;
const yC = V, gC = lg, vC = mC, _C = /* @__PURE__ */ new Set([
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
function $C(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Gc(e) : t ? fg(e) <= t : !1;
}
qe.inlineRef = $C;
const wC = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Gc(e) {
  for (const t in e) {
    if (wC.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Gc) || typeof r == "object" && Gc(r))
      return !0;
  }
  return !1;
}
function fg(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !_C.has(r) && (typeof e[r] == "object" && (0, yC.eachItem)(e[r], (n) => t += fg(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function dg(e, t = "", r) {
  r !== !1 && (t = Kn(t));
  const n = e.parse(t);
  return hg(e, n);
}
qe.getFullPath = dg;
function hg(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
qe._getFullPath = hg;
const EC = /#\/?$/;
function Kn(e) {
  return e ? e.replace(EC, "") : "";
}
qe.normalizeId = Kn;
function SC(e, t, r) {
  return r = Kn(r), e.resolve(t, r);
}
qe.resolveUrl = SC;
const bC = /^[a-z_][-a-z0-9._]*$/i;
function PC(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, i = Kn(e[r] || t), a = { "": i }, s = dg(n, i, !1), o = {}, c = /* @__PURE__ */ new Set();
  return vC(e, { allKeys: !0 }, (u, d, p, y) => {
    if (y === void 0)
      return;
    const g = s + d;
    let _ = a[y];
    typeof u[r] == "string" && (_ = v.call(this, u[r])), w.call(this, u.$anchor), w.call(this, u.$dynamicAnchor), a[d] = _;
    function v(I) {
      const R = this.opts.uriResolver.resolve;
      if (I = Kn(_ ? R(_, I) : I), c.has(I))
        throw l(I);
      c.add(I);
      let j = this.refs[I];
      return typeof j == "string" && (j = this.refs[j]), typeof j == "object" ? f(u, j.schema, I) : I !== Kn(g) && (I[0] === "#" ? (f(u, o[I], I), o[I] = u) : this.refs[I] = g), I;
    }
    function w(I) {
      if (typeof I == "string") {
        if (!bC.test(I))
          throw new Error(`invalid anchor "${I}"`);
        v.call(this, `#${I}`);
      }
    }
  }), o;
  function f(u, d, p) {
    if (d !== void 0 && !gC(u, d))
      throw l(p);
  }
  function l(u) {
    return new Error(`reference "${u}" resolves to more than one schema`);
  }
}
qe.getSchemaRefs = PC;
Object.defineProperty(Tt, "__esModule", { value: !0 });
Tt.getData = Tt.KeywordCxt = Tt.validateFunctionCode = void 0;
const pg = ei, bh = Ne, Vl = Zt, Rs = Ne, TC = fo, ji = Mt, dc = Or, K = ne, re = _t, AC = qe, er = V, Ai = Ta;
function IC(e) {
  if (gg(e) && (vg(e), yg(e))) {
    CC(e);
    return;
  }
  mg(e, () => (0, pg.topBoolOrEmptySchema)(e));
}
Tt.validateFunctionCode = IC;
function mg({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: i }, a) {
  i.code.es5 ? e.func(t, (0, K._)`${re.default.data}, ${re.default.valCxt}`, n.$async, () => {
    e.code((0, K._)`"use strict"; ${Ph(r, i)}`), RC(e, i), e.code(a);
  }) : e.func(t, (0, K._)`${re.default.data}, ${OC(i)}`, n.$async, () => e.code(Ph(r, i)).code(a));
}
function OC(e) {
  return (0, K._)`{${re.default.instancePath}="", ${re.default.parentData}, ${re.default.parentDataProperty}, ${re.default.rootData}=${re.default.data}${e.dynamicRef ? (0, K._)`, ${re.default.dynamicAnchors}={}` : K.nil}}={}`;
}
function RC(e, t) {
  e.if(re.default.valCxt, () => {
    e.var(re.default.instancePath, (0, K._)`${re.default.valCxt}.${re.default.instancePath}`), e.var(re.default.parentData, (0, K._)`${re.default.valCxt}.${re.default.parentData}`), e.var(re.default.parentDataProperty, (0, K._)`${re.default.valCxt}.${re.default.parentDataProperty}`), e.var(re.default.rootData, (0, K._)`${re.default.valCxt}.${re.default.rootData}`), t.dynamicRef && e.var(re.default.dynamicAnchors, (0, K._)`${re.default.valCxt}.${re.default.dynamicAnchors}`);
  }, () => {
    e.var(re.default.instancePath, (0, K._)`""`), e.var(re.default.parentData, (0, K._)`undefined`), e.var(re.default.parentDataProperty, (0, K._)`undefined`), e.var(re.default.rootData, re.default.data), t.dynamicRef && e.var(re.default.dynamicAnchors, (0, K._)`{}`);
  });
}
function CC(e) {
  const { schema: t, opts: r, gen: n } = e;
  mg(e, () => {
    r.$comment && t.$comment && $g(e), LC(e), n.let(re.default.vErrors, null), n.let(re.default.errors, 0), r.unevaluated && NC(e), _g(e), jC(e);
  });
}
function NC(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, K._)`${r}.evaluated`), t.if((0, K._)`${e.evaluated}.dynamicProps`, () => t.assign((0, K._)`${e.evaluated}.props`, (0, K._)`undefined`)), t.if((0, K._)`${e.evaluated}.dynamicItems`, () => t.assign((0, K._)`${e.evaluated}.items`, (0, K._)`undefined`));
}
function Ph(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, K._)`/*# sourceURL=${r} */` : K.nil;
}
function DC(e, t) {
  if (gg(e) && (vg(e), yg(e))) {
    kC(e, t);
    return;
  }
  (0, pg.boolOrEmptySchema)(e, t);
}
function yg({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function gg(e) {
  return typeof e.schema != "boolean";
}
function kC(e, t) {
  const { schema: r, gen: n, opts: i } = e;
  i.$comment && r.$comment && $g(e), xC(e), UC(e);
  const a = n.const("_errs", re.default.errors);
  _g(e, a), n.var(t, (0, K._)`${a} === ${re.default.errors}`);
}
function vg(e) {
  (0, er.checkUnknownRules)(e), FC(e);
}
function _g(e, t) {
  if (e.opts.jtd)
    return Th(e, [], !1, t);
  const r = (0, bh.getSchemaTypes)(e.schema), n = (0, bh.coerceAndCheckDataType)(e, r);
  Th(e, r, !n, t);
}
function FC(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: i } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, er.schemaHasRulesButRef)(t, i.RULES) && i.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function LC(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, er.checkStrictMode)(e, "default is ignored in the schema root");
}
function xC(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, AC.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function UC(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function $g({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: i }) {
  const a = r.$comment;
  if (i.$comment === !0)
    e.code((0, K._)`${re.default.self}.logger.log(${a})`);
  else if (typeof i.$comment == "function") {
    const s = (0, K.str)`${n}/$comment`, o = e.scopeValue("root", { ref: t.root });
    e.code((0, K._)`${re.default.self}.opts.$comment(${a}, ${s}, ${o}.schema)`);
  }
}
function jC(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: i, opts: a } = e;
  r.$async ? t.if((0, K._)`${re.default.errors} === 0`, () => t.return(re.default.data), () => t.throw((0, K._)`new ${i}(${re.default.vErrors})`)) : (t.assign((0, K._)`${n}.errors`, re.default.vErrors), a.unevaluated && MC(e), t.return((0, K._)`${re.default.errors} === 0`));
}
function MC({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof K.Name && e.assign((0, K._)`${t}.props`, r), n instanceof K.Name && e.assign((0, K._)`${t}.items`, n);
}
function Th(e, t, r, n) {
  const { gen: i, schema: a, data: s, allErrors: o, opts: c, self: f } = e, { RULES: l } = f;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, er.schemaHasRulesButRef)(a, l))) {
    i.block(() => Sg(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || BC(e, t), i.block(() => {
    for (const d of l.rules)
      u(d);
    u(l.post);
  });
  function u(d) {
    (0, Vl.shouldUseGroup)(a, d) && (d.type ? (i.if((0, Rs.checkDataType)(d.type, s, c.strictNumbers)), Ah(e, d), t.length === 1 && t[0] === d.type && r && (i.else(), (0, Rs.reportTypeError)(e)), i.endIf()) : Ah(e, d), o || i.if((0, K._)`${re.default.errors} === ${n || 0}`));
  }
}
function Ah(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: i } } = e;
  i && (0, TC.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, Vl.shouldUseRule)(n, a) && Sg(e, a.keyword, a.definition, t.type);
  });
}
function BC(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (qC(e, t), e.opts.allowUnionTypes || HC(e, t), GC(e, e.dataTypes));
}
function qC(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      wg(e.dataTypes, r) || zl(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), zC(e, t);
  }
}
function HC(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && zl(e, "use allowUnionTypes to allow union type keyword");
}
function GC(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const i = r[n];
    if (typeof i == "object" && (0, Vl.shouldUseRule)(e.schema, i)) {
      const { type: a } = i.definition;
      a.length && !a.some((s) => VC(t, s)) && zl(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function VC(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function wg(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function zC(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    wg(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function zl(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, er.checkStrictMode)(e, t, e.opts.strictTypes);
}
class Eg {
  constructor(t, r, n) {
    if ((0, ji.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, er.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", bg(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, ji.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", re.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, K.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, K.not)(t), void 0, r);
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
    this.fail((0, K._)`${r} !== undefined && (${(0, K.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? Ai.reportExtraError : Ai.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Ai.reportError)(this, this.def.$dataError || Ai.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Ai.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = K.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = K.nil, r = K.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: i, schemaType: a, def: s } = this;
    n.if((0, K.or)((0, K._)`${i} === undefined`, r)), t !== K.nil && n.assign(t, !0), (a.length || s.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== K.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: i, it: a } = this;
    return (0, K.or)(s(), o());
    function s() {
      if (n.length) {
        if (!(r instanceof K.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, K._)`${(0, Rs.checkDataTypes)(c, r, a.opts.strictNumbers, Rs.DataType.Wrong)}`;
      }
      return K.nil;
    }
    function o() {
      if (i.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: i.validateSchema });
        return (0, K._)`!${c}(${r})`;
      }
      return K.nil;
    }
  }
  subschema(t, r) {
    const n = (0, dc.getSubschema)(this.it, t);
    (0, dc.extendSubschemaData)(n, this.it, t), (0, dc.extendSubschemaMode)(n, t);
    const i = { ...this.it, ...n, items: void 0, props: void 0 };
    return DC(i, r), i;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: i } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = er.mergeEvaluated.props(i, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = er.mergeEvaluated.items(i, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: i } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return i.if(r, () => this.mergeEvaluated(t, K.Name)), !0;
  }
}
Tt.KeywordCxt = Eg;
function Sg(e, t, r, n) {
  const i = new Eg(e, r, t);
  "code" in r ? r.code(i, n) : i.$data && r.validate ? (0, ji.funcKeywordCode)(i, r) : "macro" in r ? (0, ji.macroKeywordCode)(i, r) : (r.compile || r.validate) && (0, ji.funcKeywordCode)(i, r);
}
const WC = /^\/(?:[^~]|~0|~1)*$/, KC = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function bg(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let i, a;
  if (e === "")
    return re.default.rootData;
  if (e[0] === "/") {
    if (!WC.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    i = e, a = re.default.rootData;
  } else {
    const f = KC.exec(e);
    if (!f)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +f[1];
    if (i = f[2], i === "#") {
      if (l >= t)
        throw new Error(c("property/index", l));
      return n[t - l];
    }
    if (l > t)
      throw new Error(c("data", l));
    if (a = r[t - l], !i)
      return a;
  }
  let s = a;
  const o = i.split("/");
  for (const f of o)
    f && (a = (0, K._)`${a}${(0, K.getProperty)((0, er.unescapeJsonPointer)(f))}`, s = (0, K._)`${s} && ${a}`);
  return s;
  function c(f, l) {
    return `Cannot access ${f} ${l} levels up, current level is ${t}`;
  }
}
Tt.getData = bg;
var oi = {};
Object.defineProperty(oi, "__esModule", { value: !0 });
class YC extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
oi.default = YC;
var wn = {};
Object.defineProperty(wn, "__esModule", { value: !0 });
const hc = qe;
class XC extends Error {
  constructor(t, r, n, i) {
    super(i || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, hc.resolveUrl)(t, r, n), this.missingSchema = (0, hc.normalizeId)((0, hc.getFullPath)(t, this.missingRef));
  }
}
wn.default = XC;
var rt = {};
Object.defineProperty(rt, "__esModule", { value: !0 });
rt.resolveSchema = rt.getCompilingSchema = rt.resolveRef = rt.compileSchema = rt.SchemaEnv = void 0;
const Ot = ne, JC = oi, Qr = _t, Nt = qe, Ih = V, QC = Tt;
class ho {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Nt.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
rt.SchemaEnv = ho;
function Wl(e) {
  const t = Pg.call(this, e);
  if (t)
    return t;
  const r = (0, Nt.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: i } = this.opts.code, { ownProperties: a } = this.opts, s = new Ot.CodeGen(this.scope, { es5: n, lines: i, ownProperties: a });
  let o;
  e.$async && (o = s.scopeValue("Error", {
    ref: JC.default,
    code: (0, Ot._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = s.scopeName("validate");
  e.validateName = c;
  const f = {
    gen: s,
    allErrors: this.opts.allErrors,
    data: Qr.default.data,
    parentData: Qr.default.parentData,
    parentDataProperty: Qr.default.parentDataProperty,
    dataNames: [Qr.default.data],
    dataPathArr: [Ot.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: s.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Ot.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: o,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Ot.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Ot._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, QC.validateFunctionCode)(f), s.optimize(this.opts.code.optimize);
    const u = s.toString();
    l = `${s.scopeRefs(Qr.default.scope)}return ${u}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const p = new Function(`${Qr.default.self}`, `${Qr.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: p }), p.errors = null, p.schema = e.schema, p.schemaEnv = e, e.$async && (p.$async = !0), this.opts.code.source === !0 && (p.source = { validateName: c, validateCode: u, scopeValues: s._values }), this.opts.unevaluated) {
      const { props: y, items: g } = f;
      p.evaluated = {
        props: y instanceof Ot.Name ? void 0 : y,
        items: g instanceof Ot.Name ? void 0 : g,
        dynamicProps: y instanceof Ot.Name,
        dynamicItems: g instanceof Ot.Name
      }, p.source && (p.source.evaluated = (0, Ot.stringify)(p.evaluated));
    }
    return e.validate = p, e;
  } catch (u) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), u;
  } finally {
    this._compilations.delete(e);
  }
}
rt.compileSchema = Wl;
function ZC(e, t, r) {
  var n;
  r = (0, Nt.resolveUrl)(this.opts.uriResolver, t, r);
  const i = e.refs[r];
  if (i)
    return i;
  let a = rN.call(this, e, r);
  if (a === void 0) {
    const s = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: o } = this.opts;
    s && (a = new ho({ schema: s, schemaId: o, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = eN.call(this, a);
}
rt.resolveRef = ZC;
function eN(e) {
  return (0, Nt.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Wl.call(this, e);
}
function Pg(e) {
  for (const t of this._compilations)
    if (tN(t, e))
      return t;
}
rt.getCompilingSchema = Pg;
function tN(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function rN(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || po.call(this, e, t);
}
function po(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Nt._getFullPath)(this.opts.uriResolver, r);
  let i = (0, Nt.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === i)
    return pc.call(this, r, e);
  const a = (0, Nt.normalizeId)(n), s = this.refs[a] || this.schemas[a];
  if (typeof s == "string") {
    const o = po.call(this, e, s);
    return typeof (o == null ? void 0 : o.schema) != "object" ? void 0 : pc.call(this, r, o);
  }
  if (typeof (s == null ? void 0 : s.schema) == "object") {
    if (s.validate || Wl.call(this, s), a === (0, Nt.normalizeId)(t)) {
      const { schema: o } = s, { schemaId: c } = this.opts, f = o[c];
      return f && (i = (0, Nt.resolveUrl)(this.opts.uriResolver, i, f)), new ho({ schema: o, schemaId: c, root: e, baseId: i });
    }
    return pc.call(this, r, s);
  }
}
rt.resolveSchema = po;
const nN = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function pc(e, { baseId: t, schema: r, root: n }) {
  var i;
  if (((i = e.fragment) === null || i === void 0 ? void 0 : i[0]) !== "/")
    return;
  for (const o of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Ih.unescapeFragment)(o)];
    if (c === void 0)
      return;
    r = c;
    const f = typeof r == "object" && r[this.opts.schemaId];
    !nN.has(o) && f && (t = (0, Nt.resolveUrl)(this.opts.uriResolver, t, f));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, Ih.schemaHasRulesButRef)(r, this.RULES)) {
    const o = (0, Nt.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = po.call(this, n, o);
  }
  const { schemaId: s } = this.opts;
  if (a = a || new ho({ schema: r, schemaId: s, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const iN = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", aN = "Meta-schema for $data reference (JSON AnySchema extension proposal)", sN = "object", oN = [
  "$data"
], cN = {
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
}, lN = !1, uN = {
  $id: iN,
  description: aN,
  type: sN,
  required: oN,
  properties: cN,
  additionalProperties: lN
};
var Kl = {}, mo = { exports: {} };
const fN = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), Tg = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function Ag(e) {
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
const dN = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function Oh(e) {
  return e.length = 0, !0;
}
function hN(e, t, r) {
  if (e.length) {
    const n = Ag(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function pN(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], i = [];
  let a = !1, s = !1, o = hN;
  for (let c = 0; c < e.length; c++) {
    const f = e[c];
    if (!(f === "[" || f === "]"))
      if (f === ":") {
        if (a === !0 && (s = !0), !o(i, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        c > 0 && e[c - 1] === ":" && (a = !0), n.push(":");
        continue;
      } else if (f === "%") {
        if (!o(i, n, r))
          break;
        o = Oh;
      } else {
        i.push(f);
        continue;
      }
  }
  return i.length && (o === Oh ? r.zone = i.join("") : s ? n.push(i.join("")) : n.push(Ag(i))), r.address = n.join(""), r;
}
function Ig(e) {
  if (mN(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = pN(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function mN(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function yN(e) {
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
function gN(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function vN(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!Tg(r)) {
      const n = Ig(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var Og = {
  nonSimpleDomain: dN,
  recomposeAuthority: vN,
  normalizeComponentEncoding: gN,
  removeDotSegments: yN,
  isIPv4: Tg,
  isUUID: fN,
  normalizeIPv6: Ig
};
const { isUUID: _N } = Og, $N = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function Rg(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function Cg(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function Ng(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function wN(e) {
  return e.secure = Rg(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function EN(e) {
  if ((e.port === (Rg(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function SN(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match($N);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const i = `${n}:${t.nid || e.nid}`, a = Yl(i);
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function bN(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), i = `${r}:${t.nid || n}`, a = Yl(i);
  a && (e = a.serialize(e, t));
  const s = e, o = e.nss;
  return s.path = `${n || t.nid}:${o}`, t.skipEscape = !0, s;
}
function PN(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !_N(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function TN(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const Dg = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: Cg,
    serialize: Ng
  }
), AN = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: Dg.domainHost,
    parse: Cg,
    serialize: Ng
  }
), ds = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: wN,
    serialize: EN
  }
), IN = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: ds.domainHost,
    parse: ds.parse,
    serialize: ds.serialize
  }
), ON = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: SN,
    serialize: bN,
    skipNormalize: !0
  }
), RN = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: PN,
    serialize: TN,
    skipNormalize: !0
  }
), Cs = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: Dg,
    https: AN,
    ws: ds,
    wss: IN,
    urn: ON,
    "urn:uuid": RN
  }
);
Object.setPrototypeOf(Cs, null);
function Yl(e) {
  return e && (Cs[
    /** @type {SchemeName} */
    e
  ] || Cs[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var CN = {
  SCHEMES: Cs,
  getSchemeHandler: Yl
};
const { normalizeIPv6: NN, removeDotSegments: Ci, recomposeAuthority: DN, normalizeComponentEncoding: Za, isIPv4: kN, nonSimpleDomain: FN } = Og, { SCHEMES: LN, getSchemeHandler: kg } = CN;
function xN(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  Bt(nr(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  nr(Bt(e, t), t)), e;
}
function UN(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, i = Fg(nr(e, n), nr(t, n), n, !0);
  return n.skipEscape = !0, Bt(i, n);
}
function Fg(e, t, r, n) {
  const i = {};
  return n || (e = nr(Bt(e, r), r), t = nr(Bt(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (i.scheme = t.scheme, i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = Ci(t.path || ""), i.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = Ci(t.path || ""), i.query = t.query) : (t.path ? (t.path[0] === "/" ? i.path = Ci(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? i.path = "/" + t.path : e.path ? i.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : i.path = t.path, i.path = Ci(i.path)), i.query = t.query) : (i.path = e.path, t.query !== void 0 ? i.query = t.query : i.query = e.query), i.userinfo = e.userinfo, i.host = e.host, i.port = e.port), i.scheme = e.scheme), i.fragment = t.fragment, i;
}
function jN(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = Bt(Za(nr(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = Bt(Za(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = Bt(Za(nr(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = Bt(Za(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function Bt(e, t) {
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
  }, n = Object.assign({}, t), i = [], a = kg(n.scheme || r.scheme);
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && i.push(r.scheme, ":");
  const s = DN(r);
  if (s !== void 0 && (n.reference !== "suffix" && i.push("//"), i.push(s), r.path && r.path[0] !== "/" && i.push("/")), r.path !== void 0) {
    let o = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (o = Ci(o)), s === void 0 && o[0] === "/" && o[1] === "/" && (o = "/%2F" + o.slice(2)), i.push(o);
  }
  return r.query !== void 0 && i.push("?", r.query), r.fragment !== void 0 && i.push("#", r.fragment), i.join("");
}
const MN = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function nr(e, t) {
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
  const a = e.match(MN);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host)
      if (kN(n.host) === !1) {
        const c = NN(n.host);
        n.host = c.host.toLowerCase(), i = c.isIPV6;
      } else
        i = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const s = kg(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!s || !s.unicodeSupport) && n.host && (r.domainHost || s && s.domainHost) && i === !1 && FN(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (o) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + o;
      }
    (!s || s && !s.skipNormalize) && (e.indexOf("%") !== -1 && (n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), n.host !== void 0 && (n.host = unescape(n.host))), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), s && s.parse && s.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const Xl = {
  SCHEMES: LN,
  normalize: xN,
  resolve: UN,
  resolveComponent: Fg,
  equal: jN,
  serialize: Bt,
  parse: nr
};
mo.exports = Xl;
mo.exports.default = Xl;
mo.exports.fastUri = Xl;
var BN = mo.exports;
Object.defineProperty(Kl, "__esModule", { value: !0 });
const Lg = BN;
Lg.code = 'require("ajv/dist/runtime/uri").default';
Kl.default = Lg;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = Tt;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = ne;
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
  const n = oi, i = wn, a = mn, s = rt, o = ne, c = qe, f = Ne, l = V, u = uN, d = Kl, p = (k, T) => new RegExp(k, T);
  p.code = "new RegExp";
  const y = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
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
  ]), _ = {
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
  }, v = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, w = 200;
  function I(k) {
    var T, C, O, $, S, D, m, h, N, P, ee, pe, ve, Ie, Re, $t, Se, Ze, Gr, sr, Vt, or, di, hi, pi;
    const Vr = k.strict, cr = (T = k.code) === null || T === void 0 ? void 0 : T.optimize, En = cr === !0 || cr === void 0 ? 1 : cr || 0, mi = (O = (C = k.code) === null || C === void 0 ? void 0 : C.regExp) !== null && O !== void 0 ? O : p, wt = ($ = k.uriResolver) !== null && $ !== void 0 ? $ : d.default;
    return {
      strictSchema: (D = (S = k.strictSchema) !== null && S !== void 0 ? S : Vr) !== null && D !== void 0 ? D : !0,
      strictNumbers: (h = (m = k.strictNumbers) !== null && m !== void 0 ? m : Vr) !== null && h !== void 0 ? h : !0,
      strictTypes: (P = (N = k.strictTypes) !== null && N !== void 0 ? N : Vr) !== null && P !== void 0 ? P : "log",
      strictTuples: (pe = (ee = k.strictTuples) !== null && ee !== void 0 ? ee : Vr) !== null && pe !== void 0 ? pe : "log",
      strictRequired: (Ie = (ve = k.strictRequired) !== null && ve !== void 0 ? ve : Vr) !== null && Ie !== void 0 ? Ie : !1,
      code: k.code ? { ...k.code, optimize: En, regExp: mi } : { optimize: En, regExp: mi },
      loopRequired: (Re = k.loopRequired) !== null && Re !== void 0 ? Re : w,
      loopEnum: ($t = k.loopEnum) !== null && $t !== void 0 ? $t : w,
      meta: (Se = k.meta) !== null && Se !== void 0 ? Se : !0,
      messages: (Ze = k.messages) !== null && Ze !== void 0 ? Ze : !0,
      inlineRefs: (Gr = k.inlineRefs) !== null && Gr !== void 0 ? Gr : !0,
      schemaId: (sr = k.schemaId) !== null && sr !== void 0 ? sr : "$id",
      addUsedSchema: (Vt = k.addUsedSchema) !== null && Vt !== void 0 ? Vt : !0,
      validateSchema: (or = k.validateSchema) !== null && or !== void 0 ? or : !0,
      validateFormats: (di = k.validateFormats) !== null && di !== void 0 ? di : !0,
      unicodeRegExp: (hi = k.unicodeRegExp) !== null && hi !== void 0 ? hi : !0,
      int32range: (pi = k.int32range) !== null && pi !== void 0 ? pi : !0,
      uriResolver: wt
    };
  }
  class R {
    constructor(T = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), T = this.opts = { ...T, ...I(T) };
      const { es5: C, lines: O } = this.opts.code;
      this.scope = new o.ValueScope({ scope: {}, prefixes: g, es5: C, lines: O }), this.logger = H(T.logger);
      const $ = T.validateFormats;
      T.validateFormats = !1, this.RULES = (0, a.getRules)(), j.call(this, _, T, "NOT SUPPORTED"), j.call(this, v, T, "DEPRECATED", "warn"), this._metaOpts = Q.call(this), T.formats && me.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), T.keywords && b.call(this, T.keywords), typeof T.meta == "object" && this.addMetaSchema(T.meta), Y.call(this), T.validateFormats = $;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: T, meta: C, schemaId: O } = this.opts;
      let $ = u;
      O === "id" && ($ = { ...u }, $.id = $.$id, delete $.$id), C && T && this.addMetaSchema($, $[O], !1);
    }
    defaultMeta() {
      const { meta: T, schemaId: C } = this.opts;
      return this.opts.defaultMeta = typeof T == "object" ? T[C] || T : void 0;
    }
    validate(T, C) {
      let O;
      if (typeof T == "string") {
        if (O = this.getSchema(T), !O)
          throw new Error(`no schema with key or ref "${T}"`);
      } else
        O = this.compile(T);
      const $ = O(C);
      return "$async" in O || (this.errors = O.errors), $;
    }
    compile(T, C) {
      const O = this._addSchema(T, C);
      return O.validate || this._compileSchemaEnv(O);
    }
    compileAsync(T, C) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: O } = this.opts;
      return $.call(this, T, C);
      async function $(P, ee) {
        await S.call(this, P.$schema);
        const pe = this._addSchema(P, ee);
        return pe.validate || D.call(this, pe);
      }
      async function S(P) {
        P && !this.getSchema(P) && await $.call(this, { $ref: P }, !0);
      }
      async function D(P) {
        try {
          return this._compileSchemaEnv(P);
        } catch (ee) {
          if (!(ee instanceof i.default))
            throw ee;
          return m.call(this, ee), await h.call(this, ee.missingSchema), D.call(this, P);
        }
      }
      function m({ missingSchema: P, missingRef: ee }) {
        if (this.refs[P])
          throw new Error(`AnySchema ${P} is loaded but ${ee} cannot be resolved`);
      }
      async function h(P) {
        const ee = await N.call(this, P);
        this.refs[P] || await S.call(this, ee.$schema), this.refs[P] || this.addSchema(ee, P, C);
      }
      async function N(P) {
        const ee = this._loading[P];
        if (ee)
          return ee;
        try {
          return await (this._loading[P] = O(P));
        } finally {
          delete this._loading[P];
        }
      }
    }
    // Adds schema to the instance
    addSchema(T, C, O, $ = this.opts.validateSchema) {
      if (Array.isArray(T)) {
        for (const D of T)
          this.addSchema(D, void 0, O, $);
        return this;
      }
      let S;
      if (typeof T == "object") {
        const { schemaId: D } = this.opts;
        if (S = T[D], S !== void 0 && typeof S != "string")
          throw new Error(`schema ${D} must be string`);
      }
      return C = (0, c.normalizeId)(C || S), this._checkUnique(C), this.schemas[C] = this._addSchema(T, O, C, $, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(T, C, O = this.opts.validateSchema) {
      return this.addSchema(T, C, !0, O), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(T, C) {
      if (typeof T == "boolean")
        return !0;
      let O;
      if (O = T.$schema, O !== void 0 && typeof O != "string")
        throw new Error("$schema must be a string");
      if (O = O || this.opts.defaultMeta || this.defaultMeta(), !O)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const $ = this.validate(O, T);
      if (!$ && C) {
        const S = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(S);
        else
          throw new Error(S);
      }
      return $;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(T) {
      let C;
      for (; typeof (C = J.call(this, T)) == "string"; )
        T = C;
      if (C === void 0) {
        const { schemaId: O } = this.opts, $ = new s.SchemaEnv({ schema: {}, schemaId: O });
        if (C = s.resolveSchema.call(this, $, T), !C)
          return;
        this.refs[T] = C;
      }
      return C.validate || this._compileSchemaEnv(C);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(T) {
      if (T instanceof RegExp)
        return this._removeAllSchemas(this.schemas, T), this._removeAllSchemas(this.refs, T), this;
      switch (typeof T) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const C = J.call(this, T);
          return typeof C == "object" && this._cache.delete(C.schema), delete this.schemas[T], delete this.refs[T], this;
        }
        case "object": {
          const C = T;
          this._cache.delete(C);
          let O = T[this.opts.schemaId];
          return O && (O = (0, c.normalizeId)(O), delete this.schemas[O], delete this.refs[O]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(T) {
      for (const C of T)
        this.addKeyword(C);
      return this;
    }
    addKeyword(T, C) {
      let O;
      if (typeof T == "string")
        O = T, typeof C == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), C.keyword = O);
      else if (typeof T == "object" && C === void 0) {
        if (C = T, O = C.keyword, Array.isArray(O) && !O.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (F.call(this, O, C), !C)
        return (0, l.eachItem)(O, (S) => L.call(this, S)), this;
      x.call(this, C);
      const $ = {
        ...C,
        type: (0, f.getJSONTypes)(C.type),
        schemaType: (0, f.getJSONTypes)(C.schemaType)
      };
      return (0, l.eachItem)(O, $.type.length === 0 ? (S) => L.call(this, S, $) : (S) => $.type.forEach((D) => L.call(this, S, $, D))), this;
    }
    getKeyword(T) {
      const C = this.RULES.all[T];
      return typeof C == "object" ? C.definition : !!C;
    }
    // Remove keyword
    removeKeyword(T) {
      const { RULES: C } = this;
      delete C.keywords[T], delete C.all[T];
      for (const O of C.rules) {
        const $ = O.rules.findIndex((S) => S.keyword === T);
        $ >= 0 && O.rules.splice($, 1);
      }
      return this;
    }
    // Add format
    addFormat(T, C) {
      return typeof C == "string" && (C = new RegExp(C)), this.formats[T] = C, this;
    }
    errorsText(T = this.errors, { separator: C = ", ", dataVar: O = "data" } = {}) {
      return !T || T.length === 0 ? "No errors" : T.map(($) => `${O}${$.instancePath} ${$.message}`).reduce(($, S) => $ + C + S);
    }
    $dataMetaSchema(T, C) {
      const O = this.RULES.all;
      T = JSON.parse(JSON.stringify(T));
      for (const $ of C) {
        const S = $.split("/").slice(1);
        let D = T;
        for (const m of S)
          D = D[m];
        for (const m in O) {
          const h = O[m];
          if (typeof h != "object")
            continue;
          const { $data: N } = h.definition, P = D[m];
          N && P && (D[m] = B(P));
        }
      }
      return T;
    }
    _removeAllSchemas(T, C) {
      for (const O in T) {
        const $ = T[O];
        (!C || C.test(O)) && (typeof $ == "string" ? delete T[O] : $ && !$.meta && (this._cache.delete($.schema), delete T[O]));
      }
    }
    _addSchema(T, C, O, $ = this.opts.validateSchema, S = this.opts.addUsedSchema) {
      let D;
      const { schemaId: m } = this.opts;
      if (typeof T == "object")
        D = T[m];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof T != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let h = this._cache.get(T);
      if (h !== void 0)
        return h;
      O = (0, c.normalizeId)(D || O);
      const N = c.getSchemaRefs.call(this, T, O);
      return h = new s.SchemaEnv({ schema: T, schemaId: m, meta: C, baseId: O, localRefs: N }), this._cache.set(h.schema, h), S && !O.startsWith("#") && (O && this._checkUnique(O), this.refs[O] = h), $ && this.validateSchema(T, !0), h;
    }
    _checkUnique(T) {
      if (this.schemas[T] || this.refs[T])
        throw new Error(`schema with key or id "${T}" already exists`);
    }
    _compileSchemaEnv(T) {
      if (T.meta ? this._compileMetaSchema(T) : s.compileSchema.call(this, T), !T.validate)
        throw new Error("ajv implementation error");
      return T.validate;
    }
    _compileMetaSchema(T) {
      const C = this.opts;
      this.opts = this._metaOpts;
      try {
        s.compileSchema.call(this, T);
      } finally {
        this.opts = C;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = i.default, e.default = R;
  function j(k, T, C, O = "error") {
    for (const $ in k) {
      const S = $;
      S in T && this.logger[O](`${C}: option ${$}. ${k[S]}`);
    }
  }
  function J(k) {
    return k = (0, c.normalizeId)(k), this.schemas[k] || this.refs[k];
  }
  function Y() {
    const k = this.opts.schemas;
    if (k)
      if (Array.isArray(k))
        this.addSchema(k);
      else
        for (const T in k)
          this.addSchema(k[T], T);
  }
  function me() {
    for (const k in this.opts.formats) {
      const T = this.opts.formats[k];
      T && this.addFormat(k, T);
    }
  }
  function b(k) {
    if (Array.isArray(k)) {
      this.addVocabulary(k);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const T in k) {
      const C = k[T];
      C.keyword || (C.keyword = T), this.addKeyword(C);
    }
  }
  function Q() {
    const k = { ...this.opts };
    for (const T of y)
      delete k[T];
    return k;
  }
  const M = { log() {
  }, warn() {
  }, error() {
  } };
  function H(k) {
    if (k === !1)
      return M;
    if (k === void 0)
      return console;
    if (k.log && k.warn && k.error)
      return k;
    throw new Error("logger must implement log, warn and error methods");
  }
  const Z = /^[a-z_$][a-z0-9_$:-]*$/i;
  function F(k, T) {
    const { RULES: C } = this;
    if ((0, l.eachItem)(k, (O) => {
      if (C.keywords[O])
        throw new Error(`Keyword ${O} is already defined`);
      if (!Z.test(O))
        throw new Error(`Keyword ${O} has invalid name`);
    }), !!T && T.$data && !("code" in T || "validate" in T))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function L(k, T, C) {
    var O;
    const $ = T == null ? void 0 : T.post;
    if (C && $)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: S } = this;
    let D = $ ? S.post : S.rules.find(({ type: h }) => h === C);
    if (D || (D = { type: C, rules: [] }, S.rules.push(D)), S.keywords[k] = !0, !T)
      return;
    const m = {
      keyword: k,
      definition: {
        ...T,
        type: (0, f.getJSONTypes)(T.type),
        schemaType: (0, f.getJSONTypes)(T.schemaType)
      }
    };
    T.before ? q.call(this, D, m, T.before) : D.rules.push(m), S.all[k] = m, (O = T.implements) === null || O === void 0 || O.forEach((h) => this.addKeyword(h));
  }
  function q(k, T, C) {
    const O = k.rules.findIndex(($) => $.keyword === C);
    O >= 0 ? k.rules.splice(O, 0, T) : (k.rules.push(T), this.logger.warn(`rule ${C} is not defined`));
  }
  function x(k) {
    let { metaSchema: T } = k;
    T !== void 0 && (k.$data && this.opts.$data && (T = B(T)), k.validateSchema = this.compile(T, !0));
  }
  const G = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function B(k) {
    return { anyOf: [k, G] };
  }
})(xl);
var Jl = {}, yo = {}, Ql = {};
Object.defineProperty(Ql, "__esModule", { value: !0 });
const qN = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Ql.default = qN;
var ir = {};
Object.defineProperty(ir, "__esModule", { value: !0 });
ir.callRef = ir.getValidate = void 0;
const HN = wn, Rh = oe, ft = ne, Dn = _t, Ch = rt, es = V, GN = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: i, schemaEnv: a, validateName: s, opts: o, self: c } = n, { root: f } = a;
    if ((r === "#" || r === "#/") && i === f.baseId)
      return u();
    const l = Ch.resolveRef.call(c, f, i, r);
    if (l === void 0)
      throw new HN.default(n.opts.uriResolver, i, r);
    if (l instanceof Ch.SchemaEnv)
      return d(l);
    return p(l);
    function u() {
      if (a === f)
        return hs(e, s, a, a.$async);
      const y = t.scopeValue("root", { ref: f });
      return hs(e, (0, ft._)`${y}.validate`, f, f.$async);
    }
    function d(y) {
      const g = xg(e, y);
      hs(e, g, y, y.$async);
    }
    function p(y) {
      const g = t.scopeValue("schema", o.code.source === !0 ? { ref: y, code: (0, ft.stringify)(y) } : { ref: y }), _ = t.name("valid"), v = e.subschema({
        schema: y,
        dataTypes: [],
        schemaPath: ft.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, _);
      e.mergeEvaluated(v), e.ok(_);
    }
  }
};
function xg(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, ft._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
ir.getValidate = xg;
function hs(e, t, r, n) {
  const { gen: i, it: a } = e, { allErrors: s, schemaEnv: o, opts: c } = a, f = c.passContext ? Dn.default.this : ft.nil;
  n ? l() : u();
  function l() {
    if (!o.$async)
      throw new Error("async schema referenced by sync schema");
    const y = i.let("valid");
    i.try(() => {
      i.code((0, ft._)`await ${(0, Rh.callValidateCode)(e, t, f)}`), p(t), s || i.assign(y, !0);
    }, (g) => {
      i.if((0, ft._)`!(${g} instanceof ${a.ValidationError})`, () => i.throw(g)), d(g), s || i.assign(y, !1);
    }), e.ok(y);
  }
  function u() {
    e.result((0, Rh.callValidateCode)(e, t, f), () => p(t), () => d(t));
  }
  function d(y) {
    const g = (0, ft._)`${y}.errors`;
    i.assign(Dn.default.vErrors, (0, ft._)`${Dn.default.vErrors} === null ? ${g} : ${Dn.default.vErrors}.concat(${g})`), i.assign(Dn.default.errors, (0, ft._)`${Dn.default.vErrors}.length`);
  }
  function p(y) {
    var g;
    if (!a.opts.unevaluated)
      return;
    const _ = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (a.props !== !0)
      if (_ && !_.dynamicProps)
        _.props !== void 0 && (a.props = es.mergeEvaluated.props(i, _.props, a.props));
      else {
        const v = i.var("props", (0, ft._)`${y}.evaluated.props`);
        a.props = es.mergeEvaluated.props(i, v, a.props, ft.Name);
      }
    if (a.items !== !0)
      if (_ && !_.dynamicItems)
        _.items !== void 0 && (a.items = es.mergeEvaluated.items(i, _.items, a.items));
      else {
        const v = i.var("items", (0, ft._)`${y}.evaluated.items`);
        a.items = es.mergeEvaluated.items(i, v, a.items, ft.Name);
      }
  }
}
ir.callRef = hs;
ir.default = GN;
Object.defineProperty(yo, "__esModule", { value: !0 });
const VN = Ql, zN = ir, WN = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  VN.default,
  zN.default
];
yo.default = WN;
var go = {}, Zl = {};
Object.defineProperty(Zl, "__esModule", { value: !0 });
const Ns = ne, gr = Ns.operators, Ds = {
  maximum: { okStr: "<=", ok: gr.LTE, fail: gr.GT },
  minimum: { okStr: ">=", ok: gr.GTE, fail: gr.LT },
  exclusiveMaximum: { okStr: "<", ok: gr.LT, fail: gr.GTE },
  exclusiveMinimum: { okStr: ">", ok: gr.GT, fail: gr.LTE }
}, KN = {
  message: ({ keyword: e, schemaCode: t }) => (0, Ns.str)`must be ${Ds[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Ns._)`{comparison: ${Ds[e].okStr}, limit: ${t}}`
}, YN = {
  keyword: Object.keys(Ds),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: KN,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Ns._)`${r} ${Ds[t].fail} ${n} || isNaN(${r})`);
  }
};
Zl.default = YN;
var eu = {};
Object.defineProperty(eu, "__esModule", { value: !0 });
const Mi = ne, XN = {
  message: ({ schemaCode: e }) => (0, Mi.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Mi._)`{multipleOf: ${e}}`
}, JN = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: XN,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: i } = e, a = i.opts.multipleOfPrecision, s = t.let("res"), o = a ? (0, Mi._)`Math.abs(Math.round(${s}) - ${s}) > 1e-${a}` : (0, Mi._)`${s} !== parseInt(${s})`;
    e.fail$data((0, Mi._)`(${n} === 0 || (${s} = ${r}/${n}, ${o}))`);
  }
};
eu.default = JN;
var tu = {}, ru = {};
Object.defineProperty(ru, "__esModule", { value: !0 });
function Ug(e) {
  const t = e.length;
  let r = 0, n = 0, i;
  for (; n < t; )
    r++, i = e.charCodeAt(n++), i >= 55296 && i <= 56319 && n < t && (i = e.charCodeAt(n), (i & 64512) === 56320 && n++);
  return r;
}
ru.default = Ug;
Ug.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(tu, "__esModule", { value: !0 });
const on = ne, QN = V, ZN = ru, eD = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, on.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, on._)`{limit: ${e}}`
}, tD = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: eD,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: i } = e, a = t === "maxLength" ? on.operators.GT : on.operators.LT, s = i.opts.unicode === !1 ? (0, on._)`${r}.length` : (0, on._)`${(0, QN.useFunc)(e.gen, ZN.default)}(${r})`;
    e.fail$data((0, on._)`${s} ${a} ${n}`);
  }
};
tu.default = tD;
var nu = {};
Object.defineProperty(nu, "__esModule", { value: !0 });
const rD = oe, ks = ne, nD = {
  message: ({ schemaCode: e }) => (0, ks.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, ks._)`{pattern: ${e}}`
}, iD = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: nD,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: i, it: a } = e, s = a.opts.unicodeRegExp ? "u" : "", o = r ? (0, ks._)`(new RegExp(${i}, ${s}))` : (0, rD.usePattern)(e, n);
    e.fail$data((0, ks._)`!${o}.test(${t})`);
  }
};
nu.default = iD;
var iu = {};
Object.defineProperty(iu, "__esModule", { value: !0 });
const Bi = ne, aD = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Bi.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Bi._)`{limit: ${e}}`
}, sD = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: aD,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxProperties" ? Bi.operators.GT : Bi.operators.LT;
    e.fail$data((0, Bi._)`Object.keys(${r}).length ${i} ${n}`);
  }
};
iu.default = sD;
var au = {};
Object.defineProperty(au, "__esModule", { value: !0 });
const Ii = oe, qi = ne, oD = V, cD = {
  message: ({ params: { missingProperty: e } }) => (0, qi.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, qi._)`{missingProperty: ${e}}`
}, lD = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: cD,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: i, $data: a, it: s } = e, { opts: o } = s;
    if (!a && r.length === 0)
      return;
    const c = r.length >= o.loopRequired;
    if (s.allErrors ? f() : l(), o.strictRequired) {
      const p = e.parentSchema.properties, { definedProperties: y } = e.it;
      for (const g of r)
        if ((p == null ? void 0 : p[g]) === void 0 && !y.has(g)) {
          const _ = s.schemaEnv.baseId + s.errSchemaPath, v = `required property "${g}" is not defined at "${_}" (strictRequired)`;
          (0, oD.checkStrictMode)(s, v, s.opts.strictRequired);
        }
    }
    function f() {
      if (c || a)
        e.block$data(qi.nil, u);
      else
        for (const p of r)
          (0, Ii.checkReportMissingProp)(e, p);
    }
    function l() {
      const p = t.let("missing");
      if (c || a) {
        const y = t.let("valid", !0);
        e.block$data(y, () => d(p, y)), e.ok(y);
      } else
        t.if((0, Ii.checkMissingProp)(e, r, p)), (0, Ii.reportMissingProp)(e, p), t.else();
    }
    function u() {
      t.forOf("prop", n, (p) => {
        e.setParams({ missingProperty: p }), t.if((0, Ii.noPropertyInData)(t, i, p, o.ownProperties), () => e.error());
      });
    }
    function d(p, y) {
      e.setParams({ missingProperty: p }), t.forOf(p, n, () => {
        t.assign(y, (0, Ii.propertyInData)(t, i, p, o.ownProperties)), t.if((0, qi.not)(y), () => {
          e.error(), t.break();
        });
      }, qi.nil);
    }
  }
};
au.default = lD;
var su = {};
Object.defineProperty(su, "__esModule", { value: !0 });
const Hi = ne, uD = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Hi.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Hi._)`{limit: ${e}}`
}, fD = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: uD,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxItems" ? Hi.operators.GT : Hi.operators.LT;
    e.fail$data((0, Hi._)`${r}.length ${i} ${n}`);
  }
};
su.default = fD;
var ou = {}, Aa = {};
Object.defineProperty(Aa, "__esModule", { value: !0 });
const jg = lg;
jg.code = 'require("ajv/dist/runtime/equal").default';
Aa.default = jg;
Object.defineProperty(ou, "__esModule", { value: !0 });
const mc = Ne, Be = ne, dD = V, hD = Aa, pD = {
  message: ({ params: { i: e, j: t } }) => (0, Be.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Be._)`{i: ${e}, j: ${t}}`
}, mD = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: pD,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, parentSchema: a, schemaCode: s, it: o } = e;
    if (!n && !i)
      return;
    const c = t.let("valid"), f = a.items ? (0, mc.getSchemaTypes)(a.items) : [];
    e.block$data(c, l, (0, Be._)`${s} === false`), e.ok(c);
    function l() {
      const y = t.let("i", (0, Be._)`${r}.length`), g = t.let("j");
      e.setParams({ i: y, j: g }), t.assign(c, !0), t.if((0, Be._)`${y} > 1`, () => (u() ? d : p)(y, g));
    }
    function u() {
      return f.length > 0 && !f.some((y) => y === "object" || y === "array");
    }
    function d(y, g) {
      const _ = t.name("item"), v = (0, mc.checkDataTypes)(f, _, o.opts.strictNumbers, mc.DataType.Wrong), w = t.const("indices", (0, Be._)`{}`);
      t.for((0, Be._)`;${y}--;`, () => {
        t.let(_, (0, Be._)`${r}[${y}]`), t.if(v, (0, Be._)`continue`), f.length > 1 && t.if((0, Be._)`typeof ${_} == "string"`, (0, Be._)`${_} += "_"`), t.if((0, Be._)`typeof ${w}[${_}] == "number"`, () => {
          t.assign(g, (0, Be._)`${w}[${_}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Be._)`${w}[${_}] = ${y}`);
      });
    }
    function p(y, g) {
      const _ = (0, dD.useFunc)(t, hD.default), v = t.name("outer");
      t.label(v).for((0, Be._)`;${y}--;`, () => t.for((0, Be._)`${g} = ${y}; ${g}--;`, () => t.if((0, Be._)`${_}(${r}[${y}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(v);
      })));
    }
  }
};
ou.default = mD;
var cu = {};
Object.defineProperty(cu, "__esModule", { value: !0 });
const Vc = ne, yD = V, gD = Aa, vD = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Vc._)`{allowedValue: ${e}}`
}, _D = {
  keyword: "const",
  $data: !0,
  error: vD,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: i, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Vc._)`!${(0, yD.useFunc)(t, gD.default)}(${r}, ${i})`) : e.fail((0, Vc._)`${a} !== ${r}`);
  }
};
cu.default = _D;
var lu = {};
Object.defineProperty(lu, "__esModule", { value: !0 });
const Ni = ne, $D = V, wD = Aa, ED = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Ni._)`{allowedValues: ${e}}`
}, SD = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: ED,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, schemaCode: a, it: s } = e;
    if (!n && i.length === 0)
      throw new Error("enum must have non-empty array");
    const o = i.length >= s.opts.loopEnum;
    let c;
    const f = () => c ?? (c = (0, $D.useFunc)(t, wD.default));
    let l;
    if (o || n)
      l = t.let("valid"), e.block$data(l, u);
    else {
      if (!Array.isArray(i))
        throw new Error("ajv implementation error");
      const p = t.const("vSchema", a);
      l = (0, Ni.or)(...i.map((y, g) => d(p, g)));
    }
    e.pass(l);
    function u() {
      t.assign(l, !1), t.forOf("v", a, (p) => t.if((0, Ni._)`${f()}(${r}, ${p})`, () => t.assign(l, !0).break()));
    }
    function d(p, y) {
      const g = i[y];
      return typeof g == "object" && g !== null ? (0, Ni._)`${f()}(${r}, ${p}[${y}])` : (0, Ni._)`${r} === ${g}`;
    }
  }
};
lu.default = SD;
Object.defineProperty(go, "__esModule", { value: !0 });
const bD = Zl, PD = eu, TD = tu, AD = nu, ID = iu, OD = au, RD = su, CD = ou, ND = cu, DD = lu, kD = [
  // number
  bD.default,
  PD.default,
  // string
  TD.default,
  AD.default,
  // object
  ID.default,
  OD.default,
  // array
  RD.default,
  CD.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  ND.default,
  DD.default
];
go.default = kD;
var vo = {}, ci = {};
Object.defineProperty(ci, "__esModule", { value: !0 });
ci.validateAdditionalItems = void 0;
const cn = ne, zc = V, FD = {
  message: ({ params: { len: e } }) => (0, cn.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, cn._)`{limit: ${e}}`
}, LD = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: FD,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, zc.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Mg(e, n);
  }
};
function Mg(e, t) {
  const { gen: r, schema: n, data: i, keyword: a, it: s } = e;
  s.items = !0;
  const o = r.const("len", (0, cn._)`${i}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, cn._)`${o} <= ${t.length}`);
  else if (typeof n == "object" && !(0, zc.alwaysValidSchema)(s, n)) {
    const f = r.var("valid", (0, cn._)`${o} <= ${t.length}`);
    r.if((0, cn.not)(f), () => c(f)), e.ok(f);
  }
  function c(f) {
    r.forRange("i", t.length, o, (l) => {
      e.subschema({ keyword: a, dataProp: l, dataPropType: zc.Type.Num }, f), s.allErrors || r.if((0, cn.not)(f), () => r.break());
    });
  }
}
ci.validateAdditionalItems = Mg;
ci.default = LD;
var uu = {}, li = {};
Object.defineProperty(li, "__esModule", { value: !0 });
li.validateTuple = void 0;
const Nh = ne, ps = V, xD = oe, UD = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Bg(e, "additionalItems", t);
    r.items = !0, !(0, ps.alwaysValidSchema)(r, t) && e.ok((0, xD.validateArray)(e));
  }
};
function Bg(e, t, r = e.schema) {
  const { gen: n, parentSchema: i, data: a, keyword: s, it: o } = e;
  l(i), o.opts.unevaluated && r.length && o.items !== !0 && (o.items = ps.mergeEvaluated.items(n, r.length, o.items));
  const c = n.name("valid"), f = n.const("len", (0, Nh._)`${a}.length`);
  r.forEach((u, d) => {
    (0, ps.alwaysValidSchema)(o, u) || (n.if((0, Nh._)`${f} > ${d}`, () => e.subschema({
      keyword: s,
      schemaProp: d,
      dataProp: d
    }, c)), e.ok(c));
  });
  function l(u) {
    const { opts: d, errSchemaPath: p } = o, y = r.length, g = y === u.minItems && (y === u.maxItems || u[t] === !1);
    if (d.strictTuples && !g) {
      const _ = `"${s}" is ${y}-tuple, but minItems or maxItems/${t} are not specified or different at path "${p}"`;
      (0, ps.checkStrictMode)(o, _, d.strictTuples);
    }
  }
}
li.validateTuple = Bg;
li.default = UD;
Object.defineProperty(uu, "__esModule", { value: !0 });
const jD = li, MD = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, jD.validateTuple)(e, "items")
};
uu.default = MD;
var fu = {};
Object.defineProperty(fu, "__esModule", { value: !0 });
const Dh = ne, BD = V, qD = oe, HD = ci, GD = {
  message: ({ params: { len: e } }) => (0, Dh.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Dh._)`{limit: ${e}}`
}, VD = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: GD,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: i } = r;
    n.items = !0, !(0, BD.alwaysValidSchema)(n, t) && (i ? (0, HD.validateAdditionalItems)(e, i) : e.ok((0, qD.validateArray)(e)));
  }
};
fu.default = VD;
var du = {};
Object.defineProperty(du, "__esModule", { value: !0 });
const Pt = ne, ts = V, zD = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Pt.str)`must contain at least ${e} valid item(s)` : (0, Pt.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Pt._)`{minContains: ${e}}` : (0, Pt._)`{minContains: ${e}, maxContains: ${t}}`
}, WD = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: zD,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: a } = e;
    let s, o;
    const { minContains: c, maxContains: f } = n;
    a.opts.next ? (s = c === void 0 ? 1 : c, o = f) : s = 1;
    const l = t.const("len", (0, Pt._)`${i}.length`);
    if (e.setParams({ min: s, max: o }), o === void 0 && s === 0) {
      (0, ts.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (o !== void 0 && s > o) {
      (0, ts.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, ts.alwaysValidSchema)(a, r)) {
      let g = (0, Pt._)`${l} >= ${s}`;
      o !== void 0 && (g = (0, Pt._)`${g} && ${l} <= ${o}`), e.pass(g);
      return;
    }
    a.items = !0;
    const u = t.name("valid");
    o === void 0 && s === 1 ? p(u, () => t.if(u, () => t.break())) : s === 0 ? (t.let(u, !0), o !== void 0 && t.if((0, Pt._)`${i}.length > 0`, d)) : (t.let(u, !1), d()), e.result(u, () => e.reset());
    function d() {
      const g = t.name("_valid"), _ = t.let("count", 0);
      p(g, () => t.if(g, () => y(_)));
    }
    function p(g, _) {
      t.forRange("i", 0, l, (v) => {
        e.subschema({
          keyword: "contains",
          dataProp: v,
          dataPropType: ts.Type.Num,
          compositeRule: !0
        }, g), _();
      });
    }
    function y(g) {
      t.code((0, Pt._)`${g}++`), o === void 0 ? t.if((0, Pt._)`${g} >= ${s}`, () => t.assign(u, !0).break()) : (t.if((0, Pt._)`${g} > ${o}`, () => t.assign(u, !1).break()), s === 1 ? t.assign(u, !0) : t.if((0, Pt._)`${g} >= ${s}`, () => t.assign(u, !0)));
    }
  }
};
du.default = WD;
var _o = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = ne, r = V, n = oe;
  e.error = {
    message: ({ params: { property: c, depsCount: f, deps: l } }) => {
      const u = f === 1 ? "property" : "properties";
      return (0, t.str)`must have ${u} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: f, deps: l, missingProperty: u } }) => (0, t._)`{property: ${c},
    missingProperty: ${u},
    depsCount: ${f},
    deps: ${l}}`
    // TODO change to reference
  };
  const i = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [f, l] = a(c);
      s(c, f), o(c, l);
    }
  };
  function a({ schema: c }) {
    const f = {}, l = {};
    for (const u in c) {
      if (u === "__proto__")
        continue;
      const d = Array.isArray(c[u]) ? f : l;
      d[u] = c[u];
    }
    return [f, l];
  }
  function s(c, f = c.schema) {
    const { gen: l, data: u, it: d } = c;
    if (Object.keys(f).length === 0)
      return;
    const p = l.let("missing");
    for (const y in f) {
      const g = f[y];
      if (g.length === 0)
        continue;
      const _ = (0, n.propertyInData)(l, u, y, d.opts.ownProperties);
      c.setParams({
        property: y,
        depsCount: g.length,
        deps: g.join(", ")
      }), d.allErrors ? l.if(_, () => {
        for (const v of g)
          (0, n.checkReportMissingProp)(c, v);
      }) : (l.if((0, t._)`${_} && (${(0, n.checkMissingProp)(c, g, p)})`), (0, n.reportMissingProp)(c, p), l.else());
    }
  }
  e.validatePropertyDeps = s;
  function o(c, f = c.schema) {
    const { gen: l, data: u, keyword: d, it: p } = c, y = l.name("valid");
    for (const g in f)
      (0, r.alwaysValidSchema)(p, f[g]) || (l.if(
        (0, n.propertyInData)(l, u, g, p.opts.ownProperties),
        () => {
          const _ = c.subschema({ keyword: d, schemaProp: g }, y);
          c.mergeValidEvaluated(_, y);
        },
        () => l.var(y, !0)
        // TODO var
      ), c.ok(y));
  }
  e.validateSchemaDeps = o, e.default = i;
})(_o);
var hu = {};
Object.defineProperty(hu, "__esModule", { value: !0 });
const qg = ne, KD = V, YD = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, qg._)`{propertyName: ${e.propertyName}}`
}, XD = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: YD,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e;
    if ((0, KD.alwaysValidSchema)(i, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (s) => {
      e.setParams({ propertyName: s }), e.subschema({
        keyword: "propertyNames",
        data: s,
        dataTypes: ["string"],
        propertyName: s,
        compositeRule: !0
      }, a), t.if((0, qg.not)(a), () => {
        e.error(!0), i.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
hu.default = XD;
var $o = {};
Object.defineProperty($o, "__esModule", { value: !0 });
const rs = oe, Rt = ne, JD = _t, ns = V, QD = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Rt._)`{additionalProperty: ${e.additionalProperty}}`
}, ZD = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: QD,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, errsCount: a, it: s } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: o, opts: c } = s;
    if (s.props = !0, c.removeAdditional !== "all" && (0, ns.alwaysValidSchema)(s, r))
      return;
    const f = (0, rs.allSchemaProperties)(n.properties), l = (0, rs.allSchemaProperties)(n.patternProperties);
    u(), e.ok((0, Rt._)`${a} === ${JD.default.errors}`);
    function u() {
      t.forIn("key", i, (_) => {
        !f.length && !l.length ? y(_) : t.if(d(_), () => y(_));
      });
    }
    function d(_) {
      let v;
      if (f.length > 8) {
        const w = (0, ns.schemaRefOrVal)(s, n.properties, "properties");
        v = (0, rs.isOwnProperty)(t, w, _);
      } else f.length ? v = (0, Rt.or)(...f.map((w) => (0, Rt._)`${_} === ${w}`)) : v = Rt.nil;
      return l.length && (v = (0, Rt.or)(v, ...l.map((w) => (0, Rt._)`${(0, rs.usePattern)(e, w)}.test(${_})`))), (0, Rt.not)(v);
    }
    function p(_) {
      t.code((0, Rt._)`delete ${i}[${_}]`);
    }
    function y(_) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        p(_);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: _ }), e.error(), o || t.break();
        return;
      }
      if (typeof r == "object" && !(0, ns.alwaysValidSchema)(s, r)) {
        const v = t.name("valid");
        c.removeAdditional === "failing" ? (g(_, v, !1), t.if((0, Rt.not)(v), () => {
          e.reset(), p(_);
        })) : (g(_, v), o || t.if((0, Rt.not)(v), () => t.break()));
      }
    }
    function g(_, v, w) {
      const I = {
        keyword: "additionalProperties",
        dataProp: _,
        dataPropType: ns.Type.Str
      };
      w === !1 && Object.assign(I, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(I, v);
    }
  }
};
$o.default = ZD;
var pu = {};
Object.defineProperty(pu, "__esModule", { value: !0 });
const ek = Tt, kh = oe, yc = V, Fh = $o, tk = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Fh.default.code(new ek.KeywordCxt(a, Fh.default, "additionalProperties"));
    const s = (0, kh.allSchemaProperties)(r);
    for (const u of s)
      a.definedProperties.add(u);
    a.opts.unevaluated && s.length && a.props !== !0 && (a.props = yc.mergeEvaluated.props(t, (0, yc.toHash)(s), a.props));
    const o = s.filter((u) => !(0, yc.alwaysValidSchema)(a, r[u]));
    if (o.length === 0)
      return;
    const c = t.name("valid");
    for (const u of o)
      f(u) ? l(u) : (t.if((0, kh.propertyInData)(t, i, u, a.opts.ownProperties)), l(u), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(u), e.ok(c);
    function f(u) {
      return a.opts.useDefaults && !a.compositeRule && r[u].default !== void 0;
    }
    function l(u) {
      e.subschema({
        keyword: "properties",
        schemaProp: u,
        dataProp: u
      }, c);
    }
  }
};
pu.default = tk;
var mu = {};
Object.defineProperty(mu, "__esModule", { value: !0 });
const Lh = oe, is = ne, xh = V, Uh = V, rk = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: i, it: a } = e, { opts: s } = a, o = (0, Lh.allSchemaProperties)(r), c = o.filter((g) => (0, xh.alwaysValidSchema)(a, r[g]));
    if (o.length === 0 || c.length === o.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const f = s.strictSchema && !s.allowMatchingProperties && i.properties, l = t.name("valid");
    a.props !== !0 && !(a.props instanceof is.Name) && (a.props = (0, Uh.evaluatedPropsToName)(t, a.props));
    const { props: u } = a;
    d();
    function d() {
      for (const g of o)
        f && p(g), a.allErrors ? y(g) : (t.var(l, !0), y(g), t.if(l));
    }
    function p(g) {
      for (const _ in f)
        new RegExp(g).test(_) && (0, xh.checkStrictMode)(a, `property ${_} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function y(g) {
      t.forIn("key", n, (_) => {
        t.if((0, is._)`${(0, Lh.usePattern)(e, g)}.test(${_})`, () => {
          const v = c.includes(g);
          v || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: _,
            dataPropType: Uh.Type.Str
          }, l), a.opts.unevaluated && u !== !0 ? t.assign((0, is._)`${u}[${_}]`, !0) : !v && !a.allErrors && t.if((0, is.not)(l), () => t.break());
        });
      });
    }
  }
};
mu.default = rk;
var yu = {};
Object.defineProperty(yu, "__esModule", { value: !0 });
const nk = V, ik = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, nk.alwaysValidSchema)(n, r)) {
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
yu.default = ik;
var gu = {};
Object.defineProperty(gu, "__esModule", { value: !0 });
const ak = oe, sk = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: ak.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
gu.default = sk;
var vu = {};
Object.defineProperty(vu, "__esModule", { value: !0 });
const ms = ne, ok = V, ck = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, ms._)`{passingSchemas: ${e.passing}}`
}, lk = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: ck,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: i } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (i.opts.discriminator && n.discriminator)
      return;
    const a = r, s = t.let("valid", !1), o = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: o }), t.block(f), e.result(s, () => e.reset(), () => e.error(!0));
    function f() {
      a.forEach((l, u) => {
        let d;
        (0, ok.alwaysValidSchema)(i, l) ? t.var(c, !0) : d = e.subschema({
          keyword: "oneOf",
          schemaProp: u,
          compositeRule: !0
        }, c), u > 0 && t.if((0, ms._)`${c} && ${s}`).assign(s, !1).assign(o, (0, ms._)`[${o}, ${u}]`).else(), t.if(c, () => {
          t.assign(s, !0), t.assign(o, u), d && e.mergeEvaluated(d, ms.Name);
        });
      });
    }
  }
};
vu.default = lk;
var _u = {};
Object.defineProperty(_u, "__esModule", { value: !0 });
const uk = V, fk = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const i = t.name("valid");
    r.forEach((a, s) => {
      if ((0, uk.alwaysValidSchema)(n, a))
        return;
      const o = e.subschema({ keyword: "allOf", schemaProp: s }, i);
      e.ok(i), e.mergeEvaluated(o);
    });
  }
};
_u.default = fk;
var $u = {};
Object.defineProperty($u, "__esModule", { value: !0 });
const Fs = ne, Hg = V, dk = {
  message: ({ params: e }) => (0, Fs.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Fs._)`{failingKeyword: ${e.ifClause}}`
}, hk = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: dk,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Hg.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const i = jh(n, "then"), a = jh(n, "else");
    if (!i && !a)
      return;
    const s = t.let("valid", !0), o = t.name("_valid");
    if (c(), e.reset(), i && a) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(o, f("then", l), f("else", l));
    } else i ? t.if(o, f("then")) : t.if((0, Fs.not)(o), f("else"));
    e.pass(s, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, o);
      e.mergeEvaluated(l);
    }
    function f(l, u) {
      return () => {
        const d = e.subschema({ keyword: l }, o);
        t.assign(s, o), e.mergeValidEvaluated(d, s), u ? t.assign(u, (0, Fs._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function jh(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Hg.alwaysValidSchema)(e, r);
}
$u.default = hk;
var wu = {};
Object.defineProperty(wu, "__esModule", { value: !0 });
const pk = V, mk = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, pk.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
wu.default = mk;
Object.defineProperty(vo, "__esModule", { value: !0 });
const yk = ci, gk = uu, vk = li, _k = fu, $k = du, wk = _o, Ek = hu, Sk = $o, bk = pu, Pk = mu, Tk = yu, Ak = gu, Ik = vu, Ok = _u, Rk = $u, Ck = wu;
function Nk(e = !1) {
  const t = [
    // any
    Tk.default,
    Ak.default,
    Ik.default,
    Ok.default,
    Rk.default,
    Ck.default,
    // object
    Ek.default,
    Sk.default,
    wk.default,
    bk.default,
    Pk.default
  ];
  return e ? t.push(gk.default, _k.default) : t.push(yk.default, vk.default), t.push($k.default), t;
}
vo.default = Nk;
var Eu = {}, ui = {};
Object.defineProperty(ui, "__esModule", { value: !0 });
ui.dynamicAnchor = void 0;
const gc = ne, Dk = _t, Mh = rt, kk = ir, Fk = {
  keyword: "$dynamicAnchor",
  schemaType: "string",
  code: (e) => Gg(e, e.schema)
};
function Gg(e, t) {
  const { gen: r, it: n } = e;
  n.schemaEnv.root.dynamicAnchors[t] = !0;
  const i = (0, gc._)`${Dk.default.dynamicAnchors}${(0, gc.getProperty)(t)}`, a = n.errSchemaPath === "#" ? n.validateName : Lk(e);
  r.if((0, gc._)`!${i}`, () => r.assign(i, a));
}
ui.dynamicAnchor = Gg;
function Lk(e) {
  const { schemaEnv: t, schema: r, self: n } = e.it, { root: i, baseId: a, localRefs: s, meta: o } = t.root, { schemaId: c } = n.opts, f = new Mh.SchemaEnv({ schema: r, schemaId: c, root: i, baseId: a, localRefs: s, meta: o });
  return Mh.compileSchema.call(n, f), (0, kk.getValidate)(e, f);
}
ui.default = Fk;
var fi = {};
Object.defineProperty(fi, "__esModule", { value: !0 });
fi.dynamicRef = void 0;
const Bh = ne, xk = _t, qh = ir, Uk = {
  keyword: "$dynamicRef",
  schemaType: "string",
  code: (e) => Vg(e, e.schema)
};
function Vg(e, t) {
  const { gen: r, keyword: n, it: i } = e;
  if (t[0] !== "#")
    throw new Error(`"${n}" only supports hash fragment reference`);
  const a = t.slice(1);
  if (i.allErrors)
    s();
  else {
    const c = r.let("valid", !1);
    s(c), e.ok(c);
  }
  function s(c) {
    if (i.schemaEnv.root.dynamicAnchors[a]) {
      const f = r.let("_v", (0, Bh._)`${xk.default.dynamicAnchors}${(0, Bh.getProperty)(a)}`);
      r.if(f, o(f, c), o(i.validateName, c));
    } else
      o(i.validateName, c)();
  }
  function o(c, f) {
    return f ? () => r.block(() => {
      (0, qh.callRef)(e, c), r.let(f, !0);
    }) : () => (0, qh.callRef)(e, c);
  }
}
fi.dynamicRef = Vg;
fi.default = Uk;
var Su = {};
Object.defineProperty(Su, "__esModule", { value: !0 });
const jk = ui, Mk = V, Bk = {
  keyword: "$recursiveAnchor",
  schemaType: "boolean",
  code(e) {
    e.schema ? (0, jk.dynamicAnchor)(e, "") : (0, Mk.checkStrictMode)(e.it, "$recursiveAnchor: false is ignored");
  }
};
Su.default = Bk;
var bu = {};
Object.defineProperty(bu, "__esModule", { value: !0 });
const qk = fi, Hk = {
  keyword: "$recursiveRef",
  schemaType: "string",
  code: (e) => (0, qk.dynamicRef)(e, e.schema)
};
bu.default = Hk;
Object.defineProperty(Eu, "__esModule", { value: !0 });
const Gk = ui, Vk = fi, zk = Su, Wk = bu, Kk = [Gk.default, Vk.default, zk.default, Wk.default];
Eu.default = Kk;
var Pu = {}, Tu = {};
Object.defineProperty(Tu, "__esModule", { value: !0 });
const Hh = _o, Yk = {
  keyword: "dependentRequired",
  type: "object",
  schemaType: "object",
  error: Hh.error,
  code: (e) => (0, Hh.validatePropertyDeps)(e)
};
Tu.default = Yk;
var Au = {};
Object.defineProperty(Au, "__esModule", { value: !0 });
const Xk = _o, Jk = {
  keyword: "dependentSchemas",
  type: "object",
  schemaType: "object",
  code: (e) => (0, Xk.validateSchemaDeps)(e)
};
Au.default = Jk;
var Iu = {};
Object.defineProperty(Iu, "__esModule", { value: !0 });
const Qk = V, Zk = {
  keyword: ["maxContains", "minContains"],
  type: "array",
  schemaType: "number",
  code({ keyword: e, parentSchema: t, it: r }) {
    t.contains === void 0 && (0, Qk.checkStrictMode)(r, `"${e}" without "contains" is ignored`);
  }
};
Iu.default = Zk;
Object.defineProperty(Pu, "__esModule", { value: !0 });
const eF = Tu, tF = Au, rF = Iu, nF = [eF.default, tF.default, rF.default];
Pu.default = nF;
var Ou = {}, Ru = {};
Object.defineProperty(Ru, "__esModule", { value: !0 });
const vr = ne, Gh = V, iF = _t, aF = {
  message: "must NOT have unevaluated properties",
  params: ({ params: e }) => (0, vr._)`{unevaluatedProperty: ${e.unevaluatedProperty}}`
}, sF = {
  keyword: "unevaluatedProperties",
  type: "object",
  schemaType: ["boolean", "object"],
  trackErrors: !0,
  error: aF,
  code(e) {
    const { gen: t, schema: r, data: n, errsCount: i, it: a } = e;
    if (!i)
      throw new Error("ajv implementation error");
    const { allErrors: s, props: o } = a;
    o instanceof vr.Name ? t.if((0, vr._)`${o} !== true`, () => t.forIn("key", n, (u) => t.if(f(o, u), () => c(u)))) : o !== !0 && t.forIn("key", n, (u) => o === void 0 ? c(u) : t.if(l(o, u), () => c(u))), a.props = !0, e.ok((0, vr._)`${i} === ${iF.default.errors}`);
    function c(u) {
      if (r === !1) {
        e.setParams({ unevaluatedProperty: u }), e.error(), s || t.break();
        return;
      }
      if (!(0, Gh.alwaysValidSchema)(a, r)) {
        const d = t.name("valid");
        e.subschema({
          keyword: "unevaluatedProperties",
          dataProp: u,
          dataPropType: Gh.Type.Str
        }, d), s || t.if((0, vr.not)(d), () => t.break());
      }
    }
    function f(u, d) {
      return (0, vr._)`!${u} || !${u}[${d}]`;
    }
    function l(u, d) {
      const p = [];
      for (const y in u)
        u[y] === !0 && p.push((0, vr._)`${d} !== ${y}`);
      return (0, vr.and)(...p);
    }
  }
};
Ru.default = sF;
var Cu = {};
Object.defineProperty(Cu, "__esModule", { value: !0 });
const ln = ne, Vh = V, oF = {
  message: ({ params: { len: e } }) => (0, ln.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, ln._)`{limit: ${e}}`
}, cF = {
  keyword: "unevaluatedItems",
  type: "array",
  schemaType: ["boolean", "object"],
  error: oF,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e, a = i.items || 0;
    if (a === !0)
      return;
    const s = t.const("len", (0, ln._)`${n}.length`);
    if (r === !1)
      e.setParams({ len: a }), e.fail((0, ln._)`${s} > ${a}`);
    else if (typeof r == "object" && !(0, Vh.alwaysValidSchema)(i, r)) {
      const c = t.var("valid", (0, ln._)`${s} <= ${a}`);
      t.if((0, ln.not)(c), () => o(c, a)), e.ok(c);
    }
    i.items = !0;
    function o(c, f) {
      t.forRange("i", f, s, (l) => {
        e.subschema({ keyword: "unevaluatedItems", dataProp: l, dataPropType: Vh.Type.Num }, c), i.allErrors || t.if((0, ln.not)(c), () => t.break());
      });
    }
  }
};
Cu.default = cF;
Object.defineProperty(Ou, "__esModule", { value: !0 });
const lF = Ru, uF = Cu, fF = [lF.default, uF.default];
Ou.default = fF;
var wo = {}, Nu = {};
Object.defineProperty(Nu, "__esModule", { value: !0 });
const Oe = ne, dF = {
  message: ({ schemaCode: e }) => (0, Oe.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Oe._)`{format: ${e}}`
}, hF = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: dF,
  code(e, t) {
    const { gen: r, data: n, $data: i, schema: a, schemaCode: s, it: o } = e, { opts: c, errSchemaPath: f, schemaEnv: l, self: u } = o;
    if (!c.validateFormats)
      return;
    i ? d() : p();
    function d() {
      const y = r.scopeValue("formats", {
        ref: u.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, Oe._)`${y}[${s}]`), _ = r.let("fType"), v = r.let("format");
      r.if((0, Oe._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign(_, (0, Oe._)`${g}.type || "string"`).assign(v, (0, Oe._)`${g}.validate`), () => r.assign(_, (0, Oe._)`"string"`).assign(v, g)), e.fail$data((0, Oe.or)(w(), I()));
      function w() {
        return c.strictSchema === !1 ? Oe.nil : (0, Oe._)`${s} && !${v}`;
      }
      function I() {
        const R = l.$async ? (0, Oe._)`(${g}.async ? await ${v}(${n}) : ${v}(${n}))` : (0, Oe._)`${v}(${n})`, j = (0, Oe._)`(typeof ${v} == "function" ? ${R} : ${v}.test(${n}))`;
        return (0, Oe._)`${v} && ${v} !== true && ${_} === ${t} && !${j}`;
      }
    }
    function p() {
      const y = u.formats[a];
      if (!y) {
        w();
        return;
      }
      if (y === !0)
        return;
      const [g, _, v] = I(y);
      g === t && e.pass(R());
      function w() {
        if (c.strictSchema === !1) {
          u.logger.warn(j());
          return;
        }
        throw new Error(j());
        function j() {
          return `unknown format "${a}" ignored in schema at path "${f}"`;
        }
      }
      function I(j) {
        const J = j instanceof RegExp ? (0, Oe.regexpCode)(j) : c.code.formats ? (0, Oe._)`${c.code.formats}${(0, Oe.getProperty)(a)}` : void 0, Y = r.scopeValue("formats", { key: a, ref: j, code: J });
        return typeof j == "object" && !(j instanceof RegExp) ? [j.type || "string", j.validate, (0, Oe._)`${Y}.validate`] : ["string", j, Y];
      }
      function R() {
        if (typeof y == "object" && !(y instanceof RegExp) && y.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, Oe._)`await ${v}(${n})`;
        }
        return typeof _ == "function" ? (0, Oe._)`${v}(${n})` : (0, Oe._)`${v}.test(${n})`;
      }
    }
  }
};
Nu.default = hF;
Object.defineProperty(wo, "__esModule", { value: !0 });
const pF = Nu, mF = [pF.default];
wo.default = mF;
var yn = {};
Object.defineProperty(yn, "__esModule", { value: !0 });
yn.contentVocabulary = yn.metadataVocabulary = void 0;
yn.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
yn.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Jl, "__esModule", { value: !0 });
const yF = yo, gF = go, vF = vo, _F = Eu, $F = Pu, wF = Ou, EF = wo, zh = yn, SF = [
  _F.default,
  yF.default,
  gF.default,
  (0, vF.default)(!0),
  EF.default,
  zh.metadataVocabulary,
  zh.contentVocabulary,
  $F.default,
  wF.default
];
Jl.default = SF;
var Eo = {}, So = {};
Object.defineProperty(So, "__esModule", { value: !0 });
So.DiscrError = void 0;
var Wh;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Wh || (So.DiscrError = Wh = {}));
Object.defineProperty(Eo, "__esModule", { value: !0 });
const Ln = ne, Wc = So, Kh = rt, bF = wn, PF = V, TF = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Wc.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, Ln._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, AF = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: TF,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: i, it: a } = e, { oneOf: s } = i;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const o = n.propertyName;
    if (typeof o != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!s)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), f = t.const("tag", (0, Ln._)`${r}${(0, Ln.getProperty)(o)}`);
    t.if((0, Ln._)`typeof ${f} == "string"`, () => l(), () => e.error(!1, { discrError: Wc.DiscrError.Tag, tag: f, tagName: o })), e.ok(c);
    function l() {
      const p = d();
      t.if(!1);
      for (const y in p)
        t.elseIf((0, Ln._)`${f} === ${y}`), t.assign(c, u(p[y]));
      t.else(), e.error(!1, { discrError: Wc.DiscrError.Mapping, tag: f, tagName: o }), t.endIf();
    }
    function u(p) {
      const y = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: p }, y);
      return e.mergeEvaluated(g, Ln.Name), y;
    }
    function d() {
      var p;
      const y = {}, g = v(i);
      let _ = !0;
      for (let R = 0; R < s.length; R++) {
        let j = s[R];
        if (j != null && j.$ref && !(0, PF.schemaHasRulesButRef)(j, a.self.RULES)) {
          const Y = j.$ref;
          if (j = Kh.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, Y), j instanceof Kh.SchemaEnv && (j = j.schema), j === void 0)
            throw new bF.default(a.opts.uriResolver, a.baseId, Y);
        }
        const J = (p = j == null ? void 0 : j.properties) === null || p === void 0 ? void 0 : p[o];
        if (typeof J != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${o}"`);
        _ = _ && (g || v(j)), w(J, R);
      }
      if (!_)
        throw new Error(`discriminator: "${o}" must be required`);
      return y;
      function v({ required: R }) {
        return Array.isArray(R) && R.includes(o);
      }
      function w(R, j) {
        if (R.const)
          I(R.const, j);
        else if (R.enum)
          for (const J of R.enum)
            I(J, j);
        else
          throw new Error(`discriminator: "properties/${o}" must have "const" or "enum"`);
      }
      function I(R, j) {
        if (typeof R != "string" || R in y)
          throw new Error(`discriminator: "${o}" values must be unique strings`);
        y[R] = j;
      }
    }
  }
};
Eo.default = AF;
var Du = {};
const IF = "https://json-schema.org/draft/2020-12/schema", OF = "https://json-schema.org/draft/2020-12/schema", RF = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0,
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0,
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
  "https://json-schema.org/draft/2020-12/vocab/validation": !0,
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, CF = "meta", NF = "Core and Validation specifications meta-schema", DF = [
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
], kF = [
  "object",
  "boolean"
], FF = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", LF = {
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
}, xF = {
  $schema: IF,
  $id: OF,
  $vocabulary: RF,
  $dynamicAnchor: CF,
  title: NF,
  allOf: DF,
  type: kF,
  $comment: FF,
  properties: LF
}, UF = "https://json-schema.org/draft/2020-12/schema", jF = "https://json-schema.org/draft/2020-12/meta/applicator", MF = {
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0
}, BF = "meta", qF = "Applicator vocabulary meta-schema", HF = [
  "object",
  "boolean"
], GF = {
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
}, VF = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $dynamicRef: "#meta"
    }
  }
}, zF = {
  $schema: UF,
  $id: jF,
  $vocabulary: MF,
  $dynamicAnchor: BF,
  title: qF,
  type: HF,
  properties: GF,
  $defs: VF
}, WF = "https://json-schema.org/draft/2020-12/schema", KF = "https://json-schema.org/draft/2020-12/meta/unevaluated", YF = {
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0
}, XF = "meta", JF = "Unevaluated applicator vocabulary meta-schema", QF = [
  "object",
  "boolean"
], ZF = {
  unevaluatedItems: {
    $dynamicRef: "#meta"
  },
  unevaluatedProperties: {
    $dynamicRef: "#meta"
  }
}, eL = {
  $schema: WF,
  $id: KF,
  $vocabulary: YF,
  $dynamicAnchor: XF,
  title: JF,
  type: QF,
  properties: ZF
}, tL = "https://json-schema.org/draft/2020-12/schema", rL = "https://json-schema.org/draft/2020-12/meta/content", nL = {
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, iL = "meta", aL = "Content vocabulary meta-schema", sL = [
  "object",
  "boolean"
], oL = {
  contentEncoding: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentSchema: {
    $dynamicRef: "#meta"
  }
}, cL = {
  $schema: tL,
  $id: rL,
  $vocabulary: nL,
  $dynamicAnchor: iL,
  title: aL,
  type: sL,
  properties: oL
}, lL = "https://json-schema.org/draft/2020-12/schema", uL = "https://json-schema.org/draft/2020-12/meta/core", fL = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0
}, dL = "meta", hL = "Core vocabulary meta-schema", pL = [
  "object",
  "boolean"
], mL = {
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
}, yL = {
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
}, gL = {
  $schema: lL,
  $id: uL,
  $vocabulary: fL,
  $dynamicAnchor: dL,
  title: hL,
  type: pL,
  properties: mL,
  $defs: yL
}, vL = "https://json-schema.org/draft/2020-12/schema", _L = "https://json-schema.org/draft/2020-12/meta/format-annotation", $L = {
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0
}, wL = "meta", EL = "Format vocabulary meta-schema for annotation results", SL = [
  "object",
  "boolean"
], bL = {
  format: {
    type: "string"
  }
}, PL = {
  $schema: vL,
  $id: _L,
  $vocabulary: $L,
  $dynamicAnchor: wL,
  title: EL,
  type: SL,
  properties: bL
}, TL = "https://json-schema.org/draft/2020-12/schema", AL = "https://json-schema.org/draft/2020-12/meta/meta-data", IL = {
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0
}, OL = "meta", RL = "Meta-data vocabulary meta-schema", CL = [
  "object",
  "boolean"
], NL = {
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
}, DL = {
  $schema: TL,
  $id: AL,
  $vocabulary: IL,
  $dynamicAnchor: OL,
  title: RL,
  type: CL,
  properties: NL
}, kL = "https://json-schema.org/draft/2020-12/schema", FL = "https://json-schema.org/draft/2020-12/meta/validation", LL = {
  "https://json-schema.org/draft/2020-12/vocab/validation": !0
}, xL = "meta", UL = "Validation vocabulary meta-schema", jL = [
  "object",
  "boolean"
], ML = {
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
}, BL = {
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
}, qL = {
  $schema: kL,
  $id: FL,
  $vocabulary: LL,
  $dynamicAnchor: xL,
  title: UL,
  type: jL,
  properties: ML,
  $defs: BL
};
Object.defineProperty(Du, "__esModule", { value: !0 });
const HL = xF, GL = zF, VL = eL, zL = cL, WL = gL, KL = PL, YL = DL, XL = qL, JL = ["/properties"];
function QL(e) {
  return [
    HL,
    GL,
    VL,
    zL,
    WL,
    t(this, KL),
    YL,
    t(this, XL)
  ].forEach((r) => this.addMetaSchema(r, void 0, !1)), this;
  function t(r, n) {
    return e ? r.$dataMetaSchema(n, JL) : n;
  }
}
Du.default = QL;
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv2020 = void 0;
  const r = xl, n = Jl, i = Eo, a = Du, s = "https://json-schema.org/draft/2020-12/schema";
  class o extends r.default {
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
      y && (a.default.call(this, p), this.refs["http://json-schema.org/schema"] = s);
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(s) ? s : void 0);
    }
  }
  t.Ajv2020 = o, e.exports = t = o, e.exports.Ajv2020 = o, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
  var c = Tt;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return c.KeywordCxt;
  } });
  var f = ne;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return f._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return f.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return f.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return f.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return f.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return f.CodeGen;
  } });
  var l = oi;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return l.default;
  } });
  var u = wn;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return u.default;
  } });
})(Mc, Mc.exports);
var ZL = Mc.exports, Kc = { exports: {} }, zg = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(M, H) {
    return { validate: M, compare: H };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(a, s),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c(!0), f),
    "date-time": t(d(!0), p),
    "iso-time": t(c(), l),
    "iso-date-time": t(d(), y),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: v,
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
    regex: Q,
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
    byte: I,
    // signed 32 bit integer
    int32: { type: "number", validate: J },
    // signed 64 bit integer
    int64: { type: "number", validate: Y },
    // C-type float
    float: { type: "number", validate: me },
    // C-type double
    double: { type: "number", validate: me },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, s),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, f),
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
  function r(M) {
    return M % 4 === 0 && (M % 100 !== 0 || M % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, i = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function a(M) {
    const H = n.exec(M);
    if (!H)
      return !1;
    const Z = +H[1], F = +H[2], L = +H[3];
    return F >= 1 && F <= 12 && L >= 1 && L <= (F === 2 && r(Z) ? 29 : i[F]);
  }
  function s(M, H) {
    if (M && H)
      return M > H ? 1 : M < H ? -1 : 0;
  }
  const o = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
  function c(M) {
    return function(Z) {
      const F = o.exec(Z);
      if (!F)
        return !1;
      const L = +F[1], q = +F[2], x = +F[3], G = F[4], B = F[5] === "-" ? -1 : 1, k = +(F[6] || 0), T = +(F[7] || 0);
      if (k > 23 || T > 59 || M && !G)
        return !1;
      if (L <= 23 && q <= 59 && x < 60)
        return !0;
      const C = q - T * B, O = L - k * B - (C < 0 ? 1 : 0);
      return (O === 23 || O === -1) && (C === 59 || C === -1) && x < 61;
    };
  }
  function f(M, H) {
    if (!(M && H))
      return;
    const Z = (/* @__PURE__ */ new Date("2020-01-01T" + M)).valueOf(), F = (/* @__PURE__ */ new Date("2020-01-01T" + H)).valueOf();
    if (Z && F)
      return Z - F;
  }
  function l(M, H) {
    if (!(M && H))
      return;
    const Z = o.exec(M), F = o.exec(H);
    if (Z && F)
      return M = Z[1] + Z[2] + Z[3], H = F[1] + F[2] + F[3], M > H ? 1 : M < H ? -1 : 0;
  }
  const u = /t|\s/i;
  function d(M) {
    const H = c(M);
    return function(F) {
      const L = F.split(u);
      return L.length === 2 && a(L[0]) && H(L[1]);
    };
  }
  function p(M, H) {
    if (!(M && H))
      return;
    const Z = new Date(M).valueOf(), F = new Date(H).valueOf();
    if (Z && F)
      return Z - F;
  }
  function y(M, H) {
    if (!(M && H))
      return;
    const [Z, F] = M.split(u), [L, q] = H.split(u), x = s(Z, L);
    if (x !== void 0)
      return x || f(F, q);
  }
  const g = /\/|:/, _ = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function v(M) {
    return g.test(M) && _.test(M);
  }
  const w = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function I(M) {
    return w.lastIndex = 0, w.test(M);
  }
  const R = -2147483648, j = 2 ** 31 - 1;
  function J(M) {
    return Number.isInteger(M) && M <= j && M >= R;
  }
  function Y(M) {
    return Number.isInteger(M);
  }
  function me() {
    return !0;
  }
  const b = /[^\\]\\Z/;
  function Q(M) {
    if (b.test(M))
      return !1;
    try {
      return new RegExp(M), !0;
    } catch {
      return !1;
    }
  }
})(zg);
var Wg = {}, Yc = { exports: {} }, ku = {};
Object.defineProperty(ku, "__esModule", { value: !0 });
const e2 = yo, t2 = go, r2 = vo, n2 = wo, Yh = yn, i2 = [
  e2.default,
  t2.default,
  (0, r2.default)(),
  n2.default,
  Yh.metadataVocabulary,
  Yh.contentVocabulary
];
ku.default = i2;
const a2 = "http://json-schema.org/draft-07/schema#", s2 = "http://json-schema.org/draft-07/schema#", o2 = "Core schema meta-schema", c2 = {
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
}, l2 = [
  "object",
  "boolean"
], u2 = {
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
}, f2 = {
  $schema: a2,
  $id: s2,
  title: o2,
  definitions: c2,
  type: l2,
  properties: u2,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = xl, n = ku, i = Eo, a = f2, s = ["/properties"], o = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((y) => this.addVocabulary(y)), this.opts.discriminator && this.addKeyword(i.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const y = this.opts.$data ? this.$dataMetaSchema(a, s) : a;
      this.addMetaSchema(y, o, !1), this.refs["http://json-schema.org/schema"] = o;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(o) ? o : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var f = Tt;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return f.KeywordCxt;
  } });
  var l = ne;
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
  var u = oi;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return u.default;
  } });
  var d = wn;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return d.default;
  } });
})(Yc, Yc.exports);
var d2 = Yc.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = d2, r = ne, n = r.operators, i = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, a = {
    message: ({ keyword: o, schemaCode: c }) => (0, r.str)`should be ${i[o].okStr} ${c}`,
    params: ({ keyword: o, schemaCode: c }) => (0, r._)`{comparison: ${i[o].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(i),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: a,
    code(o) {
      const { gen: c, data: f, schemaCode: l, keyword: u, it: d } = o, { opts: p, self: y } = d;
      if (!p.validateFormats)
        return;
      const g = new t.KeywordCxt(d, y.RULES.all.format.definition, "format");
      g.$data ? _() : v();
      function _() {
        const I = c.scopeValue("formats", {
          ref: y.formats,
          code: p.code.formats
        }), R = c.const("fmt", (0, r._)`${I}[${g.schemaCode}]`);
        o.fail$data((0, r.or)((0, r._)`typeof ${R} != "object"`, (0, r._)`${R} instanceof RegExp`, (0, r._)`typeof ${R}.compare != "function"`, w(R)));
      }
      function v() {
        const I = g.schema, R = y.formats[I];
        if (!R || R === !0)
          return;
        if (typeof R != "object" || R instanceof RegExp || typeof R.compare != "function")
          throw new Error(`"${u}": format "${I}" does not define "compare" function`);
        const j = c.scopeValue("formats", {
          key: I,
          ref: R,
          code: p.code.formats ? (0, r._)`${p.code.formats}${(0, r.getProperty)(I)}` : void 0
        });
        o.fail$data(w(j));
      }
      function w(I) {
        return (0, r._)`${I}.compare(${f}, ${l}) ${i[u].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const s = (o) => (o.addKeyword(e.formatLimitDefinition), o);
  e.default = s;
})(Wg);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = zg, n = Wg, i = ne, a = new i.Name("fullFormats"), s = new i.Name("fastFormats"), o = (f, l = { keywords: !0 }) => {
    if (Array.isArray(l))
      return c(f, l, r.fullFormats, a), f;
    const [u, d] = l.mode === "fast" ? [r.fastFormats, s] : [r.fullFormats, a], p = l.formats || r.formatNames;
    return c(f, p, u, d), l.keywords && (0, n.default)(f), f;
  };
  o.get = (f, l = "full") => {
    const d = (l === "fast" ? r.fastFormats : r.fullFormats)[f];
    if (!d)
      throw new Error(`Unknown format "${f}"`);
    return d;
  };
  function c(f, l, u, d) {
    var p, y;
    (p = (y = f.opts.code).formats) !== null && p !== void 0 || (y.formats = (0, i._)`require("ajv-formats/dist/formats").${d}`);
    for (const g of l)
      f.addFormat(g, u[g]);
  }
  e.exports = t = o, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
})(Kc, Kc.exports);
var h2 = Kc.exports;
const p2 = /* @__PURE__ */ js(h2), m2 = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const i = Object.getOwnPropertyDescriptor(e, r), a = Object.getOwnPropertyDescriptor(t, r);
  !y2(i, a) && n || Object.defineProperty(e, r, a);
}, y2 = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, g2 = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, v2 = (e, t) => `/* Wrapped ${e}*/
${t}`, _2 = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), $2 = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), w2 = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, i = v2.bind(null, n, t.toString());
  Object.defineProperty(i, "name", $2);
  const { writable: a, enumerable: s, configurable: o } = _2;
  Object.defineProperty(e, "toString", { value: i, writable: a, enumerable: s, configurable: o });
};
function E2(e, t, { ignoreNonConfigurable: r = !1 } = {}) {
  const { name: n } = e;
  for (const i of Reflect.ownKeys(t))
    m2(e, t, i, r);
  return g2(e, t), w2(e, t, n), e;
}
const Xh = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    maxWait: n = Number.POSITIVE_INFINITY,
    before: i = !1,
    after: a = !0
  } = t;
  if (r < 0 || n < 0)
    throw new RangeError("`wait` and `maxWait` must not be negative.");
  if (!i && !a)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let s, o, c;
  const f = function(...l) {
    const u = this, d = () => {
      s = void 0, o && (clearTimeout(o), o = void 0), a && (c = e.apply(u, l));
    }, p = () => {
      o = void 0, s && (clearTimeout(s), s = void 0), a && (c = e.apply(u, l));
    }, y = i && !s;
    return clearTimeout(s), s = setTimeout(d, r), n > 0 && n !== Number.POSITIVE_INFINITY && !o && (o = setTimeout(p, n)), y && (c = e.apply(u, l)), c;
  };
  return E2(f, e), f.cancel = () => {
    s && (clearTimeout(s), s = void 0), o && (clearTimeout(o), o = void 0);
  }, f;
}, S2 = Object.prototype.toString, b2 = "[object Uint8Array]", P2 = "[object ArrayBuffer]";
function Kg(e, t, r) {
  return e ? e.constructor === t ? !0 : S2.call(e) === r : !1;
}
function Yg(e) {
  return Kg(e, Uint8Array, b2);
}
function T2(e) {
  return Kg(e, ArrayBuffer, P2);
}
function A2(e) {
  return Yg(e) || T2(e);
}
function I2(e) {
  if (!Yg(e))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof e}\``);
}
function O2(e) {
  if (!A2(e))
    throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof e}\``);
}
function Jh(e, t) {
  if (e.length === 0)
    return new Uint8Array(0);
  t ?? (t = e.reduce((i, a) => i + a.length, 0));
  const r = new Uint8Array(t);
  let n = 0;
  for (const i of e)
    I2(i), r.set(i, n), n += i.length;
  return r;
}
const as = {
  utf8: new globalThis.TextDecoder("utf8")
};
function Qh(e, t = "utf8") {
  return O2(e), as[t] ?? (as[t] = new globalThis.TextDecoder(t)), as[t].decode(e);
}
function R2(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected \`string\`, got \`${typeof e}\``);
}
const C2 = new globalThis.TextEncoder();
function vc(e) {
  return R2(e), C2.encode(e);
}
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
const N2 = p2.default, Zh = "aes-256-cbc", kn = () => /* @__PURE__ */ Object.create(null), D2 = (e) => e != null, k2 = (e, t) => {
  const r = /* @__PURE__ */ new Set([
    "undefined",
    "symbol",
    "function"
  ]), n = typeof t;
  if (r.has(n))
    throw new TypeError(`Setting a value of type \`${n}\` for key \`${e}\` is not allowed as it's not supported by JSON`);
}, ys = "__internal__", _c = `${ys}.migrations.version`;
var Sr, Xt, vt, Jt;
class F2 {
  constructor(t = {}) {
    bt(this, "path");
    bt(this, "events");
    $i(this, Sr);
    $i(this, Xt);
    $i(this, vt);
    $i(this, Jt, {});
    bt(this, "_deserialize", (t) => JSON.parse(t));
    bt(this, "_serialize", (t) => JSON.stringify(t, void 0, "	"));
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
      r.cwd = YO(r.projectName, { suffix: r.projectSuffix }).config;
    }
    if (wi(this, vt, r), r.schema ?? r.ajvOptions ?? r.rootSchema) {
      if (r.schema && typeof r.schema != "object")
        throw new TypeError("The `schema` option must be an object.");
      const s = new ZL.Ajv2020({
        allErrors: !0,
        useDefaults: !0,
        ...r.ajvOptions
      });
      N2(s);
      const o = {
        ...r.rootSchema,
        type: "object",
        properties: r.schema
      };
      wi(this, Sr, s.compile(o));
      for (const [c, f] of Object.entries(r.schema ?? {}))
        f != null && f.default && (we(this, Jt)[c] = f.default);
    }
    r.defaults && wi(this, Jt, {
      ...we(this, Jt),
      ...r.defaults
    }), r.serialize && (this._serialize = r.serialize), r.deserialize && (this._deserialize = r.deserialize), this.events = new EventTarget(), wi(this, Xt, r.encryptionKey);
    const n = r.fileExtension ? `.${r.fileExtension}` : "";
    this.path = W.resolve(r.cwd, `${r.configName ?? "config"}${n}`);
    const i = this.store, a = Object.assign(kn(), r.defaults, i);
    if (r.migrations) {
      if (!r.projectVersion)
        throw new Error("Please specify the `projectVersion` option.");
      this._migrate(r.migrations, r.projectVersion, r.beforeEachMigration);
    }
    this._validate(a);
    try {
      wv.deepEqual(i, a);
    } catch {
      this.store = a;
    }
    r.watch && this._watch();
  }
  get(t, r) {
    if (we(this, vt).accessPropertiesByDotNotation)
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
      throw new TypeError(`Please don't use the ${ys} key, as it's used to manage this module internal operations.`);
    const { store: n } = this, i = (a, s) => {
      k2(a, s), we(this, vt).accessPropertiesByDotNotation ? yh(n, a, s) : n[a] = s;
    };
    if (typeof t == "object") {
      const a = t;
      for (const [s, o] of Object.entries(a))
        i(s, o);
    } else
      i(t, r);
    this.store = n;
  }
  has(t) {
    return we(this, vt).accessPropertiesByDotNotation ? VO(this.store, t) : t in this.store;
  }
  /**
      Reset items to their default values, as defined by the `defaults` or `schema` option.
  
      @see `clear()` to reset all items.
  
      @param keys - The keys of the items to reset.
      */
  reset(...t) {
    for (const r of t)
      D2(we(this, Jt)[r]) && this.set(r, we(this, Jt)[r]);
  }
  delete(t) {
    const { store: r } = this;
    we(this, vt).accessPropertiesByDotNotation ? GO(r, t) : delete r[t], this.store = r;
  }
  /**
      Delete all items.
  
      This resets known items to their default values, if defined by the `defaults` or `schema` option.
      */
  clear() {
    this.store = kn();
    for (const t of Object.keys(we(this, Jt)))
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
      const t = se.readFileSync(this.path, we(this, Xt) ? null : "utf8"), r = this._encryptData(t), n = this._deserialize(r);
      return this._validate(n), Object.assign(kn(), n);
    } catch (t) {
      if ((t == null ? void 0 : t.code) === "ENOENT")
        return this._ensureDirectory(), kn();
      if (we(this, vt).clearInvalidConfig && t.name === "SyntaxError")
        return kn();
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
    if (!we(this, Xt))
      return typeof t == "string" ? t : Qh(t);
    try {
      const r = t.slice(0, 16), n = nn.pbkdf2Sync(we(this, Xt), r.toString(), 1e4, 32, "sha512"), i = nn.createDecipheriv(Zh, n, r), a = t.slice(17), s = typeof a == "string" ? vc(a) : a;
      return Qh(Jh([i.update(s), i.final()]));
    } catch {
    }
    return t.toString();
  }
  _handleChange(t, r) {
    let n = t();
    const i = () => {
      const a = n, s = t();
      $v(s, a) || (n = s, r.call(this, s, a));
    };
    return this.events.addEventListener("change", i), () => {
      this.events.removeEventListener("change", i);
    };
  }
  _validate(t) {
    if (!we(this, Sr) || we(this, Sr).call(this, t) || !we(this, Sr).errors)
      return;
    const n = we(this, Sr).errors.map(({ instancePath: i, message: a = "" }) => `\`${i.slice(1)}\` ${a}`);
    throw new Error("Config schema violation: " + n.join("; "));
  }
  _ensureDirectory() {
    se.mkdirSync(W.dirname(this.path), { recursive: !0 });
  }
  _write(t) {
    let r = this._serialize(t);
    if (we(this, Xt)) {
      const n = nn.randomBytes(16), i = nn.pbkdf2Sync(we(this, Xt), n.toString(), 1e4, 32, "sha512"), a = nn.createCipheriv(Zh, i, n);
      r = Jh([n, vc(":"), a.update(vc(r)), a.final()]);
    }
    if (De.env.SNAP)
      se.writeFileSync(this.path, r, { mode: we(this, vt).configFileMode });
    else
      try {
        Wy(this.path, r, { mode: we(this, vt).configFileMode });
      } catch (n) {
        if ((n == null ? void 0 : n.code) === "EXDEV") {
          se.writeFileSync(this.path, r, { mode: we(this, vt).configFileMode });
          return;
        }
        throw n;
      }
  }
  _watch() {
    this._ensureDirectory(), se.existsSync(this.path) || this._write(kn()), De.platform === "win32" ? se.watch(this.path, { persistent: !1 }, Xh(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 100 })) : se.watchFile(this.path, { persistent: !1 }, Xh(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 5e3 }));
  }
  _migrate(t, r, n) {
    let i = this._get(_c, "0.0.0");
    const a = Object.keys(t).filter((o) => this._shouldPerformMigration(o, i, r));
    let s = { ...this.store };
    for (const o of a)
      try {
        n && n(this, {
          fromVersion: i,
          toVersion: o,
          finalVersion: r,
          versions: a
        });
        const c = t[o];
        c == null || c(this), this._set(_c, o), i = o, s = { ...this.store };
      } catch (c) {
        throw this.store = s, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${c}`);
      }
    (this._isVersionInRangeFormat(i) || !An.eq(i, r)) && this._set(_c, r);
  }
  _containsReservedKey(t) {
    return typeof t == "object" && Object.keys(t)[0] === ys ? !0 : typeof t != "string" ? !1 : we(this, vt).accessPropertiesByDotNotation ? !!t.startsWith(`${ys}.`) : !1;
  }
  _isVersionInRangeFormat(t) {
    return An.clean(t) === null;
  }
  _shouldPerformMigration(t, r, n) {
    return this._isVersionInRangeFormat(t) ? r !== "0.0.0" && An.satisfies(r, t) ? !1 : An.satisfies(n, t) : !(An.lte(t, r) || An.gt(t, n));
  }
  _get(t, r) {
    return HO(this.store, t, r);
  }
  _set(t, r) {
    const { store: n } = this;
    yh(n, t, r), this.store = n;
  }
}
Sr = new WeakMap(), Xt = new WeakMap(), vt = new WeakMap(), Jt = new WeakMap();
const { app: gs, ipcMain: Xc, shell: L2 } = tr;
let ep = !1;
const tp = () => {
  if (!Xc || !gs)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: gs.getPath("userData"),
    appVersion: gs.getVersion()
  };
  return ep || (Xc.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), ep = !0), e;
};
class x2 extends F2 {
  constructor(t) {
    let r, n;
    if (De.type === "renderer") {
      const i = tr.ipcRenderer.sendSync("electron-store-get-data");
      if (!i)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = i);
    } else Xc && gs && ({ defaultCwd: r, appVersion: n } = tp());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = W.isAbsolute(t.cwd) ? t.cwd : W.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    tp();
  }
  async openInEditor() {
    const t = await L2.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var Fu = Ls, U2 = le, jr = da.spawn, Lu = "HKLM", Xg = "HKCU", Jg = "HKCR", Qg = "HKU", Zg = "HKCC", e0 = [Lu, Xg, Jg, Qg, Zg], t0 = "REG_SZ", r0 = "REG_MULTI_SZ", n0 = "REG_EXPAND_SZ", i0 = "REG_DWORD", a0 = "REG_QWORD", s0 = "REG_BINARY", o0 = "REG_NONE", c0 = [t0, r0, n0, i0, a0, s0, o0], j2 = "", M2 = /(\\[a-zA-Z0-9_\s]+)*/, B2 = /^(HKEY_LOCAL_MACHINE|HKEY_CURRENT_USER|HKEY_CLASSES_ROOT|HKEY_USERS|HKEY_CURRENT_CONFIG)(.*)$/, l0 = /^(.*)\s(REG_SZ|REG_MULTI_SZ|REG_EXPAND_SZ|REG_DWORD|REG_QWORD|REG_BINARY|REG_NONE)\s+([^\s].*)$/;
function Hn(e, t) {
  if (!(this instanceof Hn))
    return new Hn(e, t);
  Error.captureStackTrace(this, Hn), this.__defineGetter__("name", function() {
    return Hn.name;
  }), this.__defineGetter__("message", function() {
    return e;
  }), this.__defineGetter__("code", function() {
    return t;
  });
}
Fu.inherits(Hn, Error);
function Mr(e) {
  var t = { stdout: "", stderr: "" };
  return e.stdout.on("data", function(r) {
    t.stdout += r.toString();
  }), e.stderr.on("data", function(r) {
    t.stderr += r.toString();
  }), t;
}
function Br(e, t, r) {
  var n = r.stdout.trim(), i = r.stderr.trim(), a = Fu.format(`%s command exited with code %d:
%s
%s`, e, t, n, i);
  return new Hn(a, t);
}
function q2(e) {
  if (e == "x64")
    return "64";
  if (e == "x86")
    return "32";
  throw new Error("illegal architecture: " + e + " (use x86 or x64)");
}
function qr(e, t) {
  t && e.push("/reg:" + q2(t));
}
function Hr() {
  return process.platform === "win32" ? U2.join(process.env.windir, "system32", "reg.exe") : "REG";
}
function ua(e, t, r, n, i, a, s) {
  if (!(this instanceof ua))
    return new ua(e, t, r, n, i, a, s);
  var o = e, c = t, f = r, l = n, u = i, d = a, p = s;
  this.__defineGetter__("host", function() {
    return o;
  }), this.__defineGetter__("hive", function() {
    return c;
  }), this.__defineGetter__("key", function() {
    return f;
  }), this.__defineGetter__("name", function() {
    return l;
  }), this.__defineGetter__("type", function() {
    return u;
  }), this.__defineGetter__("value", function() {
    return d;
  }), this.__defineGetter__("arch", function() {
    return p;
  });
}
Fu.inherits(ua, Object);
function de(e) {
  if (!(this instanceof de))
    return new de(e);
  var t = e || {}, r = "" + (t.host || ""), n = "" + (t.hive || Lu), i = "" + (t.key || ""), a = t.arch || null;
  if (this.__defineGetter__("host", function() {
    return r;
  }), this.__defineGetter__("hive", function() {
    return n;
  }), this.__defineGetter__("key", function() {
    return i;
  }), this.__defineGetter__("path", function() {
    return '"' + (r.length == 0 ? "" : "\\\\" + r + "\\") + n + i + '"';
  }), this.__defineGetter__("arch", function() {
    return a;
  }), this.__defineGetter__("parent", function() {
    var s = i.lastIndexOf("\\");
    return new de({
      host: this.host,
      hive: this.hive,
      key: s == -1 ? "" : i.substring(0, s),
      arch: this.arch
    });
  }), e0.indexOf(n) == -1)
    throw new Error("illegal hive specified.");
  if (!M2.test(i))
    throw new Error("illegal key specified.");
  if (a && a != "x64" && a != "x86")
    throw new Error("illegal architecture specified (use x86 or x64)");
}
de.HKLM = Lu;
de.HKCU = Xg;
de.HKCR = Jg;
de.HKU = Qg;
de.HKCC = Zg;
de.HIVES = e0;
de.REG_SZ = t0;
de.REG_MULTI_SZ = r0;
de.REG_EXPAND_SZ = n0;
de.REG_DWORD = i0;
de.REG_QWORD = a0;
de.REG_BINARY = s0;
de.REG_NONE = o0;
de.REG_TYPES = c0;
de.DEFAULT_VALUE = j2;
de.prototype.values = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["QUERY", this.path];
  qr(r, this.arch);
  var n = jr(Hr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = "", a = this, s = null, o = Mr(n);
  return n.on("close", function(c) {
    if (!s)
      if (c !== 0)
        t(Br("QUERY", c, o), null);
      else {
        for (var f = [], l = [], u = i.split(`
`), d = 0, p = 0, y = u.length; p < y; p++) {
          var g = u[p].trim();
          g.length > 0 && (d != 0 && f.push(g), ++d);
        }
        for (var p = 0, y = f.length; p < y; p++) {
          var _ = l0.exec(f[p]), v, w, I;
          _ && (v = _[1].trim(), w = _[2].trim(), I = _[3], l.push(new ua(a.host, a.hive, a.key, v, w, I, a.arch)));
        }
        t(null, l);
      }
  }), n.stdout.on("data", function(c) {
    i += c.toString();
  }), n.on("error", function(c) {
    s = c, t(c);
  }), this;
};
de.prototype.keys = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["QUERY", this.path];
  qr(r, this.arch);
  var n = jr(Hr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = "", a = this, s = null, o = Mr(n);
  return n.on("close", function(c) {
    s || c !== 0 && t(Br("QUERY", c, o), null);
  }), n.stdout.on("data", function(c) {
    i += c.toString();
  }), n.stdout.on("end", function() {
    for (var c = [], f = [], l = i.split(`
`), u = 0, d = l.length; u < d; u++) {
      var p = l[u].trim();
      p.length > 0 && c.push(p);
    }
    for (var u = 0, d = c.length; u < d; u++) {
      var y = B2.exec(c[u]), g;
      y && (y[1], g = y[2], g && g !== a.key && f.push(new de({
        host: a.host,
        hive: a.hive,
        key: g,
        arch: a.arch
      })));
    }
    t(null, f);
  }), n.on("error", function(c) {
    s = c, t(c);
  }), this;
};
de.prototype.get = function(t, r) {
  if (typeof r != "function")
    throw new TypeError("must specify a callback");
  var n = ["QUERY", this.path];
  t == "" ? n.push("/ve") : n = n.concat(["/v", t]), qr(n, this.arch);
  var i = jr(Hr(), n, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), a = "", s = this, o = null, c = Mr(i);
  return i.on("close", function(f) {
    if (!o)
      if (f !== 0)
        r(Br("QUERY", f, c), null);
      else {
        for (var l = [], u = null, d = a.split(`
`), p = 0, y = 0, g = d.length; y < g; y++) {
          var _ = d[y].trim();
          _.length > 0 && (p != 0 && l.push(_), ++p);
        }
        var v = l[l.length - 1] || "", w = l0.exec(v), I, R, j;
        w && (I = w[1].trim(), R = w[2].trim(), j = w[3], u = new ua(s.host, s.hive, s.key, I, R, j, s.arch)), r(null, u);
      }
  }), i.stdout.on("data", function(f) {
    a += f.toString();
  }), i.on("error", function(f) {
    o = f, r(f);
  }), this;
};
de.prototype.set = function(t, r, n, i) {
  if (typeof i != "function")
    throw new TypeError("must specify a callback");
  if (c0.indexOf(r) == -1)
    throw Error("illegal type specified.");
  var a = ["ADD", this.path];
  t == "" ? a.push("/ve") : a = a.concat(["/v", t]), a = a.concat(["/t", r, "/d", n, "/f"]), qr(a, this.arch);
  var s = jr(Hr(), a, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), o = null, c = Mr(s);
  return s.on("close", function(f) {
    o || i(f !== 0 ? Br("ADD", f, c) : null);
  }), s.stdout.on("data", function(f) {
  }), s.on("error", function(f) {
    o = f, i(f);
  }), this;
};
de.prototype.remove = function(t, r) {
  if (typeof r != "function")
    throw new TypeError("must specify a callback");
  var n = t ? ["DELETE", this.path, "/f", "/v", t] : ["DELETE", this.path, "/f", "/ve"];
  qr(n, this.arch);
  var i = jr(Hr(), n, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), a = null, s = Mr(i);
  return i.on("close", function(o) {
    a || (o !== 0 ? r(Br("DELETE", o, s), null) : r(null));
  }), i.stdout.on("data", function(o) {
  }), i.on("error", function(o) {
    a = o, r(o);
  }), this;
};
de.prototype.clear = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["DELETE", this.path, "/f", "/va"];
  qr(r, this.arch);
  var n = jr(Hr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, a = Mr(n);
  return n.on("close", function(s) {
    i || (s !== 0 ? t(Br("DELETE", s, a), null) : t(null));
  }), n.stdout.on("data", function(s) {
  }), n.on("error", function(s) {
    i = s, t(s);
  }), this;
};
de.prototype.erase = de.prototype.clear;
de.prototype.destroy = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["DELETE", this.path, "/f"];
  qr(r, this.arch);
  var n = jr(Hr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, a = Mr(n);
  return n.on("close", function(s) {
    i || (s !== 0 ? t(Br("DELETE", s, a), null) : t(null));
  }), n.stdout.on("data", function(s) {
  }), n.on("error", function(s) {
    i = s, t(s);
  }), this;
};
de.prototype.create = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["ADD", this.path, "/f"];
  qr(r, this.arch);
  var n = jr(Hr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, a = Mr(n);
  return n.on("close", function(s) {
    i || (s !== 0 ? t(Br("ADD", s, a), null) : t(null));
  }), n.stdout.on("data", function(s) {
  }), n.on("error", function(s) {
    i = s, t(s);
  }), this;
};
de.prototype.keyExists = function(t) {
  return this.values(function(r, n) {
    if (r)
      return r.code == 1 ? t(null, !1) : t(r);
    t(null, !0);
  }), this;
};
de.prototype.valueExists = function(t, r) {
  return this.get(t, function(n, i) {
    if (n)
      return n.code == 1 ? r(null, !1) : r(n);
    r(null, !0);
  }), this;
};
var H2 = de;
const rp = /* @__PURE__ */ js(H2), te = {
  launcher: {
    name: "Arma 3 Launcher",
    shortName: "A3 Launcher",
    version: "5.0.0",
    description: "Launcher pour serveur Arma 3 Roleplay",
    author: "Équipe Arma 3",
    website: "https://Arma.com",
    discord: "https://discord.gg/Arma",
    github: "https://github.com/Joaquinee/AR3URL-Launcher"
  },
  servers: [
    {
      id: "unreallife-main",
      name: "UnRealLife • Serveur Principal",
      shortName: "UnRealLife",
      description: "Serveur Roleplay français • Map Altis • Semi-RP",
      ip: "188.165.200.136",
      port: 2302,
      queryPort: 2303,
      steamPort: 2304,
      maxSlots: 64,
      map: "Altis",
      gameMode: "Roleplay",
      difficulty: "Vétéran",
      perspective: "1ère/3ème personne",
      whitelist: !1,
      community: "UnRealLife Community",
      website: "https://unreallife.fr",
      isDefault: !0,
      status: "RolePLay",
      tags: [
        "Semi-RP",
        "Français",
        "AltisLife"
      ]
    }
  ],
  server: {
    name: "UnRealLife • Serveur Principal",
    shortName: "UnRealLife",
    description: "Serveur Roleplay français • Map Altis • Semi-RP",
    ip: "188.165.200.136",
    port: 2302,
    queryPort: 2303,
    steamPort: 2304,
    maxSlots: 64,
    map: "Altis",
    gameMode: "Roleplay",
    difficulty: "Vétéran",
    perspective: "1ère/3ème personne",
    whitelist: !1,
    community: "UnRealLife Community",
    website: "https://unreallife.fr"
  },
  mods: {
    folderName: "@Arma",
    urlMods: "http://82.29.170.30/mods",
    urlRessources: "http://82.29.170.30/ressources",
    manifestUrl: "http://82.29.170.30/mods/manifest.json"
  },
  steamQuery: {
    enabled: !0,
    refreshInterval: 3e4,
    timeout: 12e3
  },
  news: {
    url: "http://82.29.170.30/news/news.json",
    refreshInterval: 3e5
  },
  maintenance: !1,
  performance: {
    chunkSize: 1048576,
    concurrentDownloads: 3,
    quickCheckSampleSize: 5
  },
  ui: {
    primaryColor: "#ff6b35",
    secondaryColor: "#dc2626",
    accentColor: "#10b981",
    particleCount: 30,
    animationDuration: 300
  },
  links: {
    principal: [
      {
        title: "Site Principal",
        description: "Site officiel du serveur UnRealLife",
        url: "https://unreallife.fr/",
        icon: "🌐"
      },
      {
        title: "Intranet",
        description: "Accès à l'intranet du serveur",
        url: "https://unreallife.fr/intranet",
        icon: "🔐"
      }
    ],
    communaute: [
      {
        title: "Discord",
        description: "Rejoignez notre communauté Discord",
        url: "https://discord.gg/Arma",
        icon: "💬"
      }
    ],
    communication: [
      {
        title: "TeamSpeak 3",
        description: "Serveur vocal pour la communication en jeu",
        url: "ts3server://ts.unreallife.fr",
        icon: "🎤"
      }
    ],
    vote: [
      {
        title: "Vote Serveur #1",
        description: "Votez pour le serveur sur ArmaList",
        url: "https://www.armalist.com/server/12345",
        icon: "⭐"
      }
    ],
    information: [
      {
        title: "Règlement",
        description: "Consultez le règlement du serveur",
        url: "https://unreallife.fr/reglement",
        icon: "📋"
      }
    ],
    support: [
      {
        title: "Support",
        description: "Besoin d'aide ? Contactez le support",
        url: "https://unreallife.fr/support",
        icon: "🆘"
      }
    ]
  },
  _encrypted: !0,
  _encryptedAt: 1756931193394
};
async function G2(e) {
  return new Promise((t, r) => {
    const n = nn.createHash("sha256"), i = ce.createReadStream(e);
    i.on("data", (a) => n.update(a)), i.on("end", () => t(n.digest("hex"))), i.on("error", r);
  });
}
async function u0(e, t, r, n, i = 3) {
  var o;
  const a = `${t}.partial`;
  await ce.ensureDir(W.dirname(t));
  let s = 0;
  for (; ; )
    try {
      const c = await ce.pathExists(a) ? (await ce.stat(a)).size : 0, f = {};
      c > 0 && (f.Range = `bytes=${c}-`);
      const l = await fetch(e, { headers: f });
      if (!l.ok && l.status !== 206)
        throw new Error(`HTTP ${l.status}`);
      const u = l.status === 206, d = l.headers.get("content-length") || "0", p = parseInt(d, 10) || 0, y = u ? c + p : p, g = await ce.open(a, u ? "a" : "w");
      try {
        const _ = (o = l.body) == null ? void 0 : o.getReader();
        if (!_) throw new Error("No readable stream from response.body");
        let v = c;
        for (; ; ) {
          const { done: w, value: I } = await _.read();
          if (w) break;
          I && (await ce.write(g, Buffer.from(I)), v += I.length, r && y > 0 && r({
            downloadedBytes: v,
            totalBytes: y,
            percent: Math.max(0, Math.min(100, v / y * 100))
          }));
        }
      } finally {
        await ce.close(g);
      }
      if (n && (await G2(a)).toLowerCase() !== n.toLowerCase())
        throw await ce.remove(a), new Error("SHA256 mismatch");
      await ce.move(a, t, { overwrite: !0 });
      return;
    } catch (c) {
      if (s += 1, s >= i)
        throw c;
      await Ev(500 * s);
    }
}
class f0 {
  constructor(t, r) {
    bt(this, "manifestUrl");
    bt(this, "localManifestPath");
    this.manifestUrl = t, this.localManifestPath = W.join(r, "manifest.json");
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
      if (await ce.pathExists(this.localManifestPath))
        return await ce.readJson(this.localManifestPath);
    } catch (t) {
      console.error("Erreur lecture manifest local:", t);
    }
    return null;
  }
  /**
   * Sauvegarde le manifest local
   */
  async saveLocalManifest(t) {
    await ce.ensureDir(W.dirname(this.localManifestPath)), await ce.writeJson(this.localManifestPath, t, { spaces: 2 });
  }
  /**
   * Compare les manifests et retourne seulement les fichiers à télécharger
   * TRÈS RAPIDE - Compare seulement hash + size + lastModified
   */
  async calculateDelta(t) {
    const r = await this.fetchServerManifest(), n = await this.getLocalManifest();
    if (!r)
      throw new Error("Impossible de récupérer le manifest serveur");
    const i = [], a = [];
    let s = 0;
    for (const o of r.files) {
      const c = n == null ? void 0 : n.files.find((u) => u.name === o.name), f = await ce.pathExists(W.join(t, o.name));
      if (!c || c.hash !== o.hash || c.lastModified !== o.lastModified || !f) {
        const u = c ? c.hash !== o.hash ? "hash différent" : c.lastModified !== o.lastModified ? "modifié" : f ? "inconnu" : "fichier manquant" : "nouveau";
        console.log(`   📥 ${o.name} - ${u}`), i.push(o), s += o.size;
      }
    }
    if (n)
      for (const o of n.files)
        r.files.find((f) => f.name === o.name) || (console.log(`   🗑️ ${o.name} - supprimé du serveur`), a.push(o.name));
    return console.log(`📊 Résultat: ${i.length} à télécharger, ${a.length} à supprimer`), { toDownload: i, toDelete: a, totalDownloadSize: s };
  }
  /**
   * Vérification rapide par sampling (vérifie seulement quelques fichiers)
   * Utile pour un check rapide au démarrage
   */
  async quickIntegrityCheck(t, r = 5) {
    const n = await this.getLocalManifest();
    if (!n) return !1;
    const i = n.files.sort(() => 0.5 - Math.random()).slice(0, Math.min(r, n.files.length));
    for (const a of i) {
      const s = W.join(t, a.name);
      if (!await ce.pathExists(s) || (await ce.stat(s)).size !== a.size || await this.calculateFileHash(s) !== a.hash) return !1;
    }
    return !0;
  }
  /**
   * Hash rapide avec streaming pour les gros fichiers
   */
  async calculateFileHash(t) {
    return new Promise((r, n) => {
      const i = nn.createHash("sha256"), a = ce.createReadStream(t, { highWaterMark: 64 * 1024 });
      a.on("data", (s) => i.update(s)), a.on("end", () => r(i.digest("hex"))), a.on("error", n);
    });
  }
}
class V2 {
  constructor(t, r) {
    bt(this, "newsUrl");
    bt(this, "localNewsPath");
    this.newsUrl = t, this.localNewsPath = W.join(r, "news.json");
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
      const n = await t.json(), i = Date.now(), a = n.items.filter(
        (s) => !s.expiresAt || s.expiresAt > i
      );
      return {
        ...n,
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
    await ce.ensureDir(W.dirname(this.localNewsPath)), await ce.writeJson(this.localNewsPath, t, { spaces: 2 });
  }
  /**
   * Lire les actualités locales
   */
  async getLocalNews() {
    try {
      if (await ce.pathExists(this.localNewsPath))
        return await ce.readJson(this.localNewsPath);
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
      const a = (r[i.priority] || 1) - (r[n.priority] || 1);
      return a !== 0 ? a : i.publishedAt - n.publishedAt;
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
var Di = {}, bo = {}, Ia = {};
Object.defineProperty(Ia, "__esModule", { value: !0 });
Ia.PromiseSocket = void 0;
const z2 = Sv;
class W2 {
  constructor(t, r) {
    if (this._attempts = t, this._timeout = r, Array.isArray(this._timeout) && this._attempts !== this._timeout.length)
      throw new Error(`Number of attempts (${this._attempts}) does not match the length of the timeout array (${this._timeout.length})`);
    this._socket = (0, z2.createSocket)("udp4");
  }
  async send(t, r, n) {
    return new Promise(async (i, a) => {
      for (let s = 0; s < this._attempts; s++) {
        let o;
        Array.isArray(this._timeout) ? o = this._timeout[s] : o = this._timeout;
        try {
          const c = await this._socketSend(t, r, n, o);
          return i(c);
        } catch (c) {
          if (s === this._attempts - 1)
            return a(c);
        }
      }
    });
  }
  closeSocket() {
    this._socket.close();
  }
  _socketSend(t, r, n, i) {
    return new Promise((a, s) => {
      this._socket.send(t, n, r, (o) => {
        if (o)
          return s(typeof o == "string" ? new Error(o) : o);
        const c = (u) => (this._socket.removeListener("message", c), this._socket.removeListener("error", f), clearTimeout(l), a(u)), f = (u) => (clearTimeout(l), s(u)), l = setTimeout(() => (this._socket.removeListener("message", c), this._socket.removeListener("error", f), s("Timeout reached. Possible reasons: You are being rate limited; Timeout too short; Wrong server host configured;")), i);
        this._socket.on("message", c), this._socket.on("error", f);
      });
    });
  }
}
Ia.PromiseSocket = W2;
Object.defineProperty(bo, "__esModule", { value: !0 });
bo.queryMasterServer = void 0;
const K2 = Ia, $c = "0.0.0.0:0", Y2 = Buffer.from([255, 255, 255, 255, 102, 10]);
async function X2(e, t, r = {}, n = 1e3, i) {
  const a = e.split(":"), s = a[0], o = parseInt(a[1]);
  return await new J2(s, o, t, r, n, i).fetchServers();
}
bo.queryMasterServer = X2;
class J2 {
  constructor(t, r, n, i, a, s) {
    this._host = t, this._port = r, this._region = n, this._filters = i, this._maxHosts = s, this._seedId = $c, this._hosts = [], this._promiseSocket = new K2.PromiseSocket(1, a);
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
      if (this._seedId = r[r.length - 1], this._hosts.push(...r), this._maxHosts && this._hosts.length >= this._maxHosts && this._hosts[this._maxHosts - 1] !== $c)
        return this._promiseSocket.closeSocket(), this._hosts.slice(0, this._maxHosts);
    } while (this._seedId !== $c);
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
    t.compare(Y2, 0, 6, 0, 6) === 0 && (t = t.slice(6));
    let n = 0;
    for (; n < t.length; ) {
      const i = this._numberToIp(t.readInt32BE(n)), a = t[n + 4] << 8 | t[n + 5];
      r.push(`${i}:${a}`), n += 6;
    }
    return r;
  }
  _numberToIp(t) {
    var r = new ArrayBuffer(4), n = new DataView(r);
    n.setUint32(0, t);
    for (var i = new Array(), a = 0; a < 4; a++)
      i[a] = n.getUint8(a);
    return i.join(".");
  }
}
var d0 = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.REGIONS = void 0, function(t) {
    t[t.US_EAST_COAST = 0] = "US_EAST_COAST", t[t.US_WEST_COAST = 1] = "US_WEST_COAST", t[t.SOUTH_AMERICA = 2] = "SOUTH_AMERICA", t[t.EUROPE = 3] = "EUROPE", t[t.ASIA = 4] = "ASIA", t[t.AUSTRALIA = 5] = "AUSTRALIA", t[t.MIDDLE_EAST = 6] = "MIDDLE_EAST", t[t.AFRICA = 7] = "AFRICA", t[t.ALL = 255] = "ALL";
  }(e.REGIONS || (e.REGIONS = {}));
})(d0);
var Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.queryGameServerRules = Rr.queryGameServerPlayer = Rr.queryGameServerInfo = void 0;
const Q2 = Ia;
async function Z2(e, t = 1, r = 1e3) {
  const n = e.split(":"), i = n[0], a = parseInt(n[1]);
  return await new xu(i, a, t, r).info();
}
Rr.queryGameServerInfo = Z2;
async function ex(e, t = 1, r = 1e3) {
  const n = e.split(":"), i = n[0], a = parseInt(n[1]);
  return await new xu(i, a, t, r).player();
}
Rr.queryGameServerPlayer = ex;
async function tx(e, t = 1, r = 1e3) {
  const n = e.split(":"), i = n[0], a = parseInt(n[1]);
  return await new xu(i, a, t, r).rules();
}
Rr.queryGameServerRules = tx;
class xu {
  constructor(t, r, n, i) {
    this._host = t, this._port = r, this._promiseSocket = new Q2.PromiseSocket(n, i);
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
      let a;
      try {
        a = await this._promiseSocket.send(this._buildPacket(Buffer.from([85])), this._host, this._port);
      } catch (o) {
        throw this._promiseSocket.closeSocket(), new Error(o);
      }
      const s = a.slice(5);
      try {
        t = await this._promiseSocket.send(this._buildPacket(Buffer.from([85]), s), this._host, this._port);
      } catch (o) {
        throw this._promiseSocket.closeSocket(), new Error(o);
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
    } catch (a) {
      throw this._promiseSocket.closeSocket(), new Error(a);
    }
    const r = t.slice(5);
    let n;
    try {
      n = await this._promiseSocket.send(this._buildPacket(Buffer.from([86]), r), this._host, this._port);
    } catch (a) {
      throw this._promiseSocket.closeSocket(), new Error(a);
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
  var t = bo;
  Object.defineProperty(e, "queryMasterServer", { enumerable: !0, get: function() {
    return t.queryMasterServer;
  } });
  var r = d0;
  Object.defineProperty(e, "REGIONS", { enumerable: !0, get: function() {
    return r.REGIONS;
  } });
  var n = Rr;
  Object.defineProperty(e, "queryGameServerInfo", { enumerable: !0, get: function() {
    return n.queryGameServerInfo;
  } }), Object.defineProperty(e, "queryGameServerPlayer", { enumerable: !0, get: function() {
    return n.queryGameServerPlayer;
  } }), Object.defineProperty(e, "queryGameServerRules", { enumerable: !0, get: function() {
    return n.queryGameServerRules;
  } });
})(Di);
class rx {
  constructor() {
    bt(this, "lastServerInfo", null);
    bt(this, "lastQueryTime", 0);
    bt(this, "CACHE_DURATION", 1e4);
  }
  // 10 secondes de cache
  /**
   * Implémentation native du protocole Steam Query A2S_INFO
   * Aucun mot de passe requis - informations publiques
   */
  async getPublicServerInfo() {
    var r, n;
    const t = Date.now();
    if (this.lastServerInfo && t - this.lastQueryTime < this.CACHE_DURATION)
      return this.lastServerInfo;
    try {
      const i = Date.now(), a = te.server.queryPort || te.server.port, s = `${te.server.ip}:${a}`;
      console.log(`🔍 Steam Query via lib vers ${s}...`);
      const o = await Di.queryGameServerInfo(
        s,
        1,
        ((r = te == null ? void 0 : te.steamQuery) == null ? void 0 : r.timeout) ?? 3e3
      );
      let c = [];
      try {
        const u = await Di.queryGameServerPlayer(
          s,
          1,
          ((n = te == null ? void 0 : te.steamQuery) == null ? void 0 : n.timeout) ?? 3e3
        );
        c = Array.isArray(u) ? u.map((d) => d == null ? void 0 : d.name).filter(Boolean) : [];
      } catch {
        console.log("Info: Liste des joueurs non disponible");
      }
      const f = Date.now() - i, l = {
        playerCount: (o == null ? void 0 : o.players) ?? 0,
        maxPlayers: (o == null ? void 0 : o.maxPlayers) ?? te.server.maxSlots,
        serverName: (o == null ? void 0 : o.name) ?? te.server.name,
        map: (o == null ? void 0 : o.map) ?? te.server.map,
        gameMode: (o == null ? void 0 : o.game) ?? te.server.gameMode,
        ping: f,
        isOnline: !0,
        version: (o == null ? void 0 : o.version) ?? "Unknown",
        playerList: c
      };
      return this.lastServerInfo = l, this.lastQueryTime = t, console.log(`✅ Steam Query: ${l.playerCount}/${l.maxPlayers} joueurs, ${f}ms`), l;
    } catch (i) {
      console.error("❌ Erreur Steam Query:", i);
      const a = {
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
      return this.lastServerInfo = a, this.lastQueryTime = t, a;
    }
  }
  // Les implémentations UDP natives sont remplacées par la librairie steam-server-query
  /**
   * Ping simple du serveur
   */
  async pingServer() {
    var t;
    try {
      const r = Date.now(), n = te.server.queryPort || te.server.port, i = `${te.server.ip}:${n}`;
      return await Di.queryGameServerInfo(
        i,
        1,
        ((t = te == null ? void 0 : te.steamQuery) == null ? void 0 : t.timeout) ?? 3e3
      ), { online: !0, ping: Date.now() - r };
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
    var t;
    try {
      const r = te.server.queryPort || te.server.port, n = `${te.server.ip}:${r}`, i = await Di.queryGameServerInfo(
        n,
        1,
        ((t = te == null ? void 0 : te.steamQuery) == null ? void 0 : t.timeout) ?? 3e3
      );
      return {
        count: (i == null ? void 0 : i.players) ?? 0,
        max: (i == null ? void 0 : i.maxPlayers) ?? te.server.maxSlots
      };
    } catch {
      return { count: 0, max: te.server.maxSlots };
    }
  }
}
const gt = new x2({
  name: "userData",
  cwd: "arma3-data",
  fileExtension: "json"
});
let Zr = null, ss = null;
async function nx() {
  return new Promise((e) => {
    new rp({
      hive: rp.HKLM,
      key: "\\SOFTWARE\\WOW6432Node\\Bohemia Interactive\\Arma 3"
    }).get("main", (r, n) => {
      e(r || !n ? null : n.value);
    });
  });
}
function ix(e) {
  return ce.existsSync(`${e}\\${te.mods.folderName}`);
}
async function ax(e) {
  return await ce.pathExists(`${e}\\arma3.exe`);
}
function ue(e, t, r, n, i, a, s) {
  e == null || e.webContents.send("main-process-message", {
    message: t,
    success: r,
    error: n,
    data: i,
    fileProgress: a,
    timeRemaining: s
  });
}
function sx(e) {
  ss = new rx(), console.log(`✅ Steam Query activé pour ${te.server.ip}:${te.server.port}`), setInterval(async () => {
    try {
      const r = await ss.getPublicServerInfo();
      r.isOnline ? ue(e, "server-info-update", JSON.stringify({
        playerCount: r.playerCount,
        maxPlayers: r.maxPlayers,
        serverName: r.serverName,
        map: r.map,
        gameMode: r.gameMode,
        ping: r.ping,
        isOnline: !0,
        fps: 0,
        // Pas disponible via Steam Query
        uptime: "0:00:00",
        // Pas disponible via Steam Query
        playerList: r.playerList
      })) : ue(e, "server-info-update", JSON.stringify({
        isOnline: !1
      }));
    } catch (r) {
      console.error("Erreur mise à jour infos serveur:", r), ue(e, "server-info-update", JSON.stringify({
        isOnline: !1
      }));
    }
  }, te.steamQuery.refreshInterval);
  const t = W.join(process.env.APPDATA || process.env.HOME || "", "arma3-data");
  Zr = new V2(te.news.url, t), e.webContents.on("did-finish-load", async () => {
    let r = gt.get("arma3Path");
    const n = gt.get("firstLaunch");
    try {
      if (Zr) {
        const i = await Zr.getNews();
        console.log(`✅ ${i.length} actualités chargées`);
      }
    } catch (i) {
      console.error("Erreur lors du chargement des actualités:", i);
    }
    if ((!r || r === "null") && (r = await nx(), r && gt.set("arma3Path", r)), r && r !== "null") {
      const i = ix(r);
      ue(
        e,
        i ? "arma3Path-mod-loaded" : "arma3Path-mod-not-loaded",
        void 0,
        i ? void 0 : `Mod ${te.mods.folderName} non installé`
      ), n && (ue(
        e,
        "firstLaunch-done",
        "Nous vous avons trouvé Arma 3 automatiquement"
      ), gt.set("firstLaunch", !1)), await ox(e);
    } else
      gt.set("arma3Path", null), ue(e, "arma3Path-not-loaded");
    await wc(e);
  }), mt.on("locate-arma3", async () => {
    try {
      const r = await mv.showOpenDialog({
        properties: ["openDirectory"],
        title: "Sélectionner le dossier d'installation d'Arma 3",
        defaultPath: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Arma 3"
      });
      if (!r.canceled && r.filePaths.length > 0) {
        const n = r.filePaths[0];
        await ax(n) ? (gt.set("arma3Path", n), ue(e, "arma3Path-ready", "Arma 3 trouvé"), await wc(e)) : ue(
          e,
          "arma3Path-invalid",
          void 0,
          "Le dossier sélectionné ne contient pas Arma 3"
        );
      }
    } catch (r) {
      console.error("Erreur lors de la sélection du dossier Arma 3:", r), ue(
        e,
        "arma3Path-error",
        void 0,
        r instanceof Error ? r.message : "Erreur inconnue"
      );
    }
  }), mt.on("check-mods", async () => {
    console.log("🔄 Vérification manuelle des mods demandée"), await wc(e);
  }), mt.on("download-mods", async () => {
    const r = gt.get("arma3Path");
    if (!r) {
      ue(e, "download-error", void 0, "Chemin Arma 3 non trouvé");
      return;
    }
    const n = `${r}\\${te.mods.folderName}`, i = `${n}\\addons`;
    try {
      await ce.ensureDir(i), ue(e, "download-start");
      const a = new f0(te.mods.manifestUrl, n), s = await a.calculateDelta(i);
      if (s.toDownload.length === 0) {
        ue(e, "download-complete", "Mods déjà à jour");
        return;
      }
      const o = s.totalDownloadSize;
      let c = 0;
      const f = Date.now();
      let l = 0;
      for (const d of s.toDownload) {
        const p = W.join(i, d.name);
        let y = 0;
        await u0(
          `${te.mods.urlMods}/${d.name}`,
          p,
          (g) => {
            const _ = Math.floor((d.size || 0) * (g.percent / 100)), v = Math.max(0, _ - y);
            y = _, c = Math.min(o, c + v);
            const w = (Date.now() - f) / 1e3, I = c / Math.max(w, 1e-3), R = Math.max(0, o - c), j = Math.round(R / Math.max(I, 1)), J = Math.floor(j / 60), Y = Math.round(j % 60), me = `${J}m ${Y}s`, b = o > 0 ? Math.round(c / o * 100) : 0, Q = Math.round(g.percent);
            Date.now() - l > 1e3 && (ue(
              e,
              "download-progress",
              b.toString(),
              void 0,
              d.name,
              Q.toString(),
              me
            ), l = Date.now());
          },
          d.hash
        );
      }
      const u = await a.fetchServerManifest();
      u && await a.saveLocalManifest(u), ue(e, "download-complete", "Mods synchronisés avec succès"), ue(e, "arma3Path-mod-loaded", "Jeu prêt à être lancé");
    } catch (a) {
      console.error("Erreur lors de la synchronisation des mods:", a), ue(
        e,
        "download-error",
        void 0,
        a instanceof Error ? a.message : "Erreur inconnue"
      );
    }
  }), mt.handle("get-arma3-path", async () => {
    const r = gt.get("arma3Path");
    return r || null;
  }), mt.handle("launch-game", async () => {
    const r = gt.get("arma3Path"), n = "-skipIntro -noSplash -enableHT -malloc=jemalloc_bi_x64 -hugePages -noPause -noPauseAudio", i = "-skipIntro -noSplash -enableHT -malloc=jemalloc_bi -hugePages -noPause -noPauseAudio";
    if (!r) return;
    const a = process.arch === "x64", s = a ? "arma3_x64.exe" : "arma3.exe", o = a ? n : i, c = W.join(r, s);
    if (!ce.existsSync(c)) {
      ue(e, "launch-game-error", void 0, `Impossible de trouver ${s}`);
      return;
    }
    sf(c, [o]), ue(e, "launch-game-success", "Jeu lancé avec succès"), setTimeout(() => {
      e.close();
    }, 5e3);
  }), mt.handle("connect-server", async () => {
    const r = gt.get("arma3Path"), n = "-skipIntro -noSplash -enableHT -malloc=jemalloc_bi_x64 -hugePages -noPause -noPauseAudio", i = "-skipIntro -noSplash -enableHT -malloc=jemalloc_bi -hugePages -noPause -noPauseAudio";
    if (!r) return;
    const a = process.arch === "x64", s = a ? "arma3_x64.exe" : "arma3.exe", o = a ? n : i, c = W.join(r, s);
    if (!ce.existsSync(c)) {
      ue(e, "launch-game-error", void 0, `Impossible de trouver ${s}`);
      return;
    }
    const f = `-connect=${te.server.ip} -port=${te.server.port}`;
    sf(c, [`${o} ${f}`]), ue(e, "launch-game-success", "Jeu lancé — connexion au serveur en cours"), setTimeout(() => {
      e.close();
    }, 5e3);
  }), mt.handle("get-news", async () => {
    if (!Zr) return [];
    try {
      return await Zr.getNews();
    } catch (r) {
      return console.error("Erreur récupération actualités:", r), [];
    }
  }), mt.handle("get-critical-news", async () => {
    if (!Zr) return [];
    try {
      return await Zr.getCriticalNews();
    } catch (r) {
      return console.error("Erreur récupération actualités critiques:", r), [];
    }
  }), mt.handle("get-server-info", async () => {
    if (ss)
      try {
        const r = await ss.getPublicServerInfo();
        return {
          playerCount: r.playerCount,
          maxPlayers: r.maxPlayers,
          serverName: r.serverName,
          map: r.map,
          gameMode: r.gameMode,
          ping: r.ping,
          isOnline: r.isOnline,
          fps: 0,
          // Pas disponible via Steam Query
          uptime: "0:00:00",
          // Pas disponible via Steam Query
          playerList: r.playerList
        };
      } catch (r) {
        console.error("Erreur Steam Query:", r);
      }
    return null;
  }), mt.handle("install-tfar", async () => {
    const r = gt.get("arma3Path");
    if (!r)
      return ue(e, "tfar-install-error", void 0, "Chemin Arma 3 non trouvé"), { ok: !1 };
    try {
      ue(e, "tfar-install-start", "Installation du plugin TFAR...");
      const n = [
        W.join(r, te.mods.folderName, "task_force_radio")
      ], i = [
        W.join(r, te.mods.folderName, "task_force_radio")
      ];
      for (const l of i)
        if (await ce.pathExists(l)) {
          const d = (await ce.readdir(l)).find((p) => p.toLowerCase().endsWith(".ts3_plugin"));
          if (d) {
            const p = W.join(l, d), y = await nf.openPath(p);
            return y ? (ue(e, "tfar-install-error", void 0, y), { ok: !1 }) : (ue(e, "tfar-install-success", "TFAR installé via le paquet .ts3_plugin"), { ok: !0 });
          }
        }
      let a = null;
      for (const l of n)
        if (await ce.pathExists(l)) {
          a = l;
          break;
        }
      if (!a)
        return ue(e, "tfar-install-error", void 0, "Fichiers TFAR introuvables (teamspeak/plugins)"), { ok: !1 };
      const s = process.env.APPDATA || null;
      if (!s)
        return ue(e, "tfar-install-error", void 0, "Variable APPDATA introuvable"), { ok: !1 };
      const o = W.join(s, "TS3Client", "plugins");
      await ce.ensureDir(o);
      const f = (await ce.readdir(a)).filter((l) => /\.dll$/i.test(l));
      if (f.length === 0)
        return ue(e, "tfar-install-error", void 0, "Aucun fichier plugin .dll trouvé pour TFAR"), { ok: !1 };
      for (const l of f)
        await ce.copy(W.join(a, l), W.join(o, l), { overwrite: !0 });
      return ue(e, "tfar-install-success", "Plugin TFAR installé dans TeamSpeak"), { ok: !0 };
    } catch (n) {
      return console.error("Erreur installation TFAR:", n), ue(
        e,
        "tfar-install-error",
        void 0,
        n instanceof Error ? n.message : "Erreur inconnue"
      ), { ok: !1 };
    }
  }), mt.handle("open-url", async (r, n) => {
    nf.openExternal(n);
  }), mt.on("close-app", () => {
    e.close();
  }), mt.on("minimize-app", () => {
    e.minimize();
  });
}
async function wc(e) {
  const t = gt.get("arma3Path");
  if (!t) return !1;
  const r = `${t}\\${te.mods.folderName}`, n = `${r}\\addons`;
  try {
    await ce.ensureDir(n);
    const i = new f0(te.mods.manifestUrl, r), a = await i.calculateDelta(n);
    if (a.toDownload.length === 0 && a.toDelete.length === 0) {
      if (await i.quickIntegrityCheck(
        n,
        te.performance.quickCheckSampleSize
      ))
        return ue(e, "mods-check-complete", "Mods à jour"), !0;
      console.log("⚠️ Quick check failed, forcing re-sync - will re-download suspicious files");
    }
    for (const s of a.toDelete) {
      const o = W.join(n, s);
      await ce.pathExists(o) && await ce.remove(o);
    }
    if (!te.maintenance) {
      if (a.toDownload.length > 0) {
        const s = (a.totalDownloadSize / 1024 / 1024 / 1024).toFixed(2);
        ue(
          e,
          "updateMod-needed",
          `${a.toDownload.length} fichier(s) à synchroniser (${s} GB)`
        );
      }
    }
    return !0;
  } catch (i) {
    return console.error("Erreur lors de la vérification des mods:", i), ue(e, "mods-check-error", void 0, "Erreur de vérification"), !1;
  }
}
async function ox(e) {
  console.log("Synchronisation des ressources serveur");
  const t = gt.get("arma3Path");
  if (!t) return;
  console.log(t);
  const r = te.mods.urlRessources;
  if (r.trim() !== "") {
    console.log(r);
    try {
      const n = [
        `${r.replace(/\/$/, "")}/index.json`,
        `${r.replace(/\/$/, "")}/list.json`
      ];
      let i = null;
      for (const o of n)
        try {
          const c = await fetch(o);
          if (c.ok) {
            const f = await c.json();
            if (Array.isArray(f)) {
              i = f;
              break;
            }
          }
        } catch {
        }
      if (!i) {
        const o = [
          r.replace(/\/$/, "/"),
          `${r.replace(/\/$/, "")}/addons/`
        ], c = /* @__PURE__ */ new Set(), f = [], l = [];
        for (const p of o)
          try {
            const y = new URL(p), g = y.toString().endsWith("/") ? y.toString() : `${y.toString()}/`;
            f.push(g);
          } catch {
          }
        const u = (() => {
          try {
            return new URL(r).origin;
          } catch {
            return null;
          }
        })(), d = (() => {
          try {
            return new URL(r).pathname;
          } catch {
            return "/";
          }
        })();
        for (; f.length > 0; ) {
          const p = f.shift();
          if (!c.has(p)) {
            c.add(p);
            try {
              const y = await fetch(p);
              if (!y.ok) continue;
              const g = await y.text(), _ = /href\s*=\s*"([^"]+)"/gi;
              let v;
              for (; (v = _.exec(g)) !== null; ) {
                const w = v[1];
                if (!w || w === "../") continue;
                let I;
                try {
                  I = new URL(w, p).toString();
                } catch {
                  continue;
                }
                try {
                  const R = new URL(I);
                  if (u && R.origin !== u || !R.pathname.startsWith(d)) continue;
                  if (R.pathname.endsWith("/"))
                    c.has(R.toString()) || f.push(R.toString());
                  else {
                    const j = R.pathname.toLowerCase();
                    (j.endsWith(".dll") || j.endsWith(".ts3_plugin")) && (l.includes(R.toString()) || l.push(R.toString()));
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
      const a = W.join(t, te.mods.folderName), s = W.join(a, "task_force_radio");
      await ce.ensureDir(a), await ce.ensureDir(s);
      for (const o of i) {
        const c = typeof o == "string" ? o : o == null ? void 0 : o.name, f = typeof o == "object" && o ? o.hash : void 0;
        if (!c || typeof c != "string") continue;
        const l = c.toLowerCase(), u = W.basename(c), d = r.replace(/\/$/, ""), p = c.startsWith("http") ? c : `${d}/${c.replace(/^\//, "")}`;
        let y = null;
        if (l.endsWith(".dll"))
          y = W.join(a, u);
        else if (l.endsWith(".ts3_plugin"))
          y = W.join(s, u);
        else
          continue;
        try {
          await u0(p, y, void 0, f);
        } catch (g) {
          console.warn(`Échec téléchargement ressource: ${c}`, g);
        }
      }
      ue(e, "resources-sync-complete", "Ressources synchronisées");
    } catch (n) {
      console.error("Erreur synchronisation ressources:", n);
    }
  }
}
const h0 = W.dirname(_v(import.meta.url));
process.env.APP_ROOT = W.join(h0, "..");
const Jc = process.env.VITE_DEV_SERVER_URL, Lx = W.join(process.env.APP_ROOT, "dist-electron"), p0 = W.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Jc ? W.join(process.env.APP_ROOT, "public") : p0;
let Ae;
Dt.autoUpdater.autoDownload = !0;
Dt.autoUpdater.autoInstallOnAppQuit = !0;
Dt.autoUpdater.on("update-available", () => {
  Ae && Ae.webContents.send("update-available");
});
Dt.autoUpdater.on("update-downloaded", () => {
  Ae && (Ae.webContents.send("update-ready"), setTimeout(() => {
    Dt.autoUpdater.quitAndInstall(!1, !0);
  }, 5e3));
});
Dt.autoUpdater.on("error", (e) => {
  Ae && Ae.webContents.send("update-error", e.message);
});
Dt.autoUpdater.on("checking-for-update", () => {
  Ae && Ae.webContents.send("checking-update");
});
Dt.autoUpdater.on("update-not-available", () => {
  Ae && Ae.webContents.send("update-not-available");
});
Dt.autoUpdater.on("download-progress", (e) => {
  Ae && Ae.webContents.send("update-progress", {
    percent: e.percent,
    transferred: e.transferred,
    total: e.total,
    bytesPerSecond: e.bytesPerSecond
  });
});
const cx = en.requestSingleInstanceLock();
if (!cx)
  en.quit();
else {
  let e = function() {
    Ae = new af({
      icon: W.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
      autoHideMenuBar: !0,
      height: 550,
      width: 900,
      frame: !1,
      maximizable: !1,
      minimizable: !1,
      resizable: !1,
      center: !0,
      webPreferences: {
        preload: W.join(h0, "preload.mjs")
      }
    }), sx(Ae), Dt.autoUpdater.checkForUpdates().catch(console.error), Jc ? (Ae.loadURL(Jc), Ae.webContents.openDevTools({
      mode: "detach"
    })) : Ae.loadFile(W.join(p0, "index.html"));
  };
  en.on("second-instance", () => {
    Ae && (Ae.isMinimized() && Ae.restore(), Ae.focus());
  }), en.on("window-all-closed", () => {
    process.platform !== "darwin" && (en.quit(), Ae = null);
  }), en.on("activate", () => {
    af.getAllWindows().length === 0 && e();
  }), en.whenReady().then(() => {
    e();
  });
}
export {
  Lx as MAIN_DIST,
  p0 as RENDERER_DIST,
  Jc as VITE_DEV_SERVER_URL
};

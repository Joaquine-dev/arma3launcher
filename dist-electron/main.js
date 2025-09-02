var dv = Object.defineProperty;
var rf = (e) => {
  throw TypeError(e);
};
var hv = (e, t, r) => t in e ? dv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var St = (e, t, r) => hv(e, typeof t != "symbol" ? t + "" : t, r), nf = (e, t, r) => t.has(e) || rf("Cannot " + r);
var we = (e, t, r) => (nf(e, t, "read from private field"), r ? r.call(e) : t.get(e)), $i = (e, t, r) => t.has(e) ? rf("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), wi = (e, t, r, n) => (nf(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
import tr, { ipcMain as mt, dialog as pv, shell as mv, app as en, BrowserWindow as af } from "electron";
import Lr from "fs";
import yv from "constants";
import fa from "stream";
import xo from "util";
import ip from "assert";
import ce from "path";
import da, { spawn as of } from "child_process";
import ap from "events";
import ha from "crypto";
import op from "tty";
import Uo from "os";
import ti from "url";
import gv from "string_decoder";
import sp from "zlib";
import vv from "http";
import { fileURLToPath as _v } from "node:url";
import ee from "node:path";
import De from "node:process";
import { promisify as ze, isDeepStrictEqual as $v } from "node:util";
import oe from "node:fs";
import nn from "node:crypto";
import wv from "node:assert";
import Mo from "node:os";
import { setTimeout as Ev } from "node:timers/promises";
import Sv from "dgram";
var nt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function jo(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Dt = {}, gn = {}, fe = {};
fe.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, a) => i != null ? n(i) : r(a)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
fe.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var dr = yv, bv = process.cwd, so = null, Pv = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return so || (so = bv.call(process)), so;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var sf = process.chdir;
  process.chdir = function(e) {
    so = null, sf.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, sf);
}
var Tv = Av;
function Av(e) {
  dr.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = a(e.chown), e.fchown = a(e.fchown), e.lchown = a(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = o(e.chownSync), e.fchownSync = o(e.fchownSync), e.lchownSync = o(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = s(e.stat), e.fstat = s(e.fstat), e.lstat = s(e.lstat), e.statSync = c(e.statSync), e.fstatSync = c(e.fstatSync), e.lstatSync = c(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(l, u, d) {
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
            e.stat(p, function(I, C) {
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
        w = function(C, M, X) {
          if (C && C.code === "EAGAIN" && I < 10)
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
  function o(l) {
    return l && function(u, d, p) {
      try {
        return l.call(e, u, d, p);
      } catch (y) {
        if (!f(y)) throw y;
      }
    };
  }
  function s(l) {
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
    for (var o = Object.keys(i), s = 0, c = o.length; s < c; s++) {
      var f = o[s];
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
    for (var a = Object.keys(i), o = 0, s = a.length; o < s; o++) {
      var c = a[o];
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
var Cv = Nv, Rv = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function Nv(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: Rv(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var Pe = Lr, Dv = Tv, kv = Iv, Fv = Cv, La = xo, He, _o;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (He = Symbol.for("graceful-fs.queue"), _o = Symbol.for("graceful-fs.previous")) : (He = "___graceful-fs.queue", _o = "___graceful-fs.previous");
function Lv() {
}
function cp(e, t) {
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
  cp(Pe, xv), Pe.close = function(e) {
    function t(r, n) {
      return e.call(Pe, r, function(i) {
        i || lf(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, _o, {
      value: e
    }), t;
  }(Pe.close), Pe.closeSync = function(e) {
    function t(r) {
      e.apply(Pe, arguments), lf();
    }
    return Object.defineProperty(t, _o, {
      value: e
    }), t;
  }(Pe.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    fn(Pe[He]), ip.equal(Pe[He].length, 0);
  });
}
nt[He] || cp(nt, Pe[He]);
var ke = Zc(Fv(Pe));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !Pe.__patched && (ke = Zc(Pe), Pe.__patched = !0);
function Zc(e) {
  Dv(e), e.gracefulify = Zc, e.createReadStream = M, e.createWriteStream = X;
  var t = e.readFile;
  e.readFile = r;
  function r(b, J, j) {
    return typeof J == "function" && (j = J, J = null), H(b, J, j);
    function H(Q, F, L, q) {
      return t(Q, F, function(x) {
        x && (x.code === "EMFILE" || x.code === "ENFILE") ? bn([H, [Q, F, L], x, q || Date.now(), Date.now()]) : typeof L == "function" && L.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(b, J, j, H) {
    return typeof j == "function" && (H = j, j = null), Q(b, J, j, H);
    function Q(F, L, q, x, G) {
      return n(F, L, q, function(B) {
        B && (B.code === "EMFILE" || B.code === "ENFILE") ? bn([Q, [F, L, q, x], B, G || Date.now(), Date.now()]) : typeof x == "function" && x.apply(this, arguments);
      });
    }
  }
  var a = e.appendFile;
  a && (e.appendFile = o);
  function o(b, J, j, H) {
    return typeof j == "function" && (H = j, j = null), Q(b, J, j, H);
    function Q(F, L, q, x, G) {
      return a(F, L, q, function(B) {
        B && (B.code === "EMFILE" || B.code === "ENFILE") ? bn([Q, [F, L, q, x], B, G || Date.now(), Date.now()]) : typeof x == "function" && x.apply(this, arguments);
      });
    }
  }
  var s = e.copyFile;
  s && (e.copyFile = c);
  function c(b, J, j, H) {
    return typeof j == "function" && (H = j, j = 0), Q(b, J, j, H);
    function Q(F, L, q, x, G) {
      return s(F, L, q, function(B) {
        B && (B.code === "EMFILE" || B.code === "ENFILE") ? bn([Q, [F, L, q, x], B, G || Date.now(), Date.now()]) : typeof x == "function" && x.apply(this, arguments);
      });
    }
  }
  var f = e.readdir;
  e.readdir = u;
  var l = /^v[0-5]\./;
  function u(b, J, j) {
    typeof J == "function" && (j = J, J = null);
    var H = l.test(process.version) ? function(L, q, x, G) {
      return f(L, Q(
        L,
        q,
        x,
        G
      ));
    } : function(L, q, x, G) {
      return f(L, q, Q(
        L,
        q,
        x,
        G
      ));
    };
    return H(b, J, j);
    function Q(F, L, q, x) {
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
  y && (I.prototype = Object.create(y.prototype), I.prototype.open = C), Object.defineProperty(e, "ReadStream", {
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
  function v(b, J) {
    return this instanceof v ? (p.apply(this, arguments), this) : v.apply(Object.create(v.prototype), arguments);
  }
  function w() {
    var b = this;
    de(b.path, b.flags, b.mode, function(J, j) {
      J ? (b.autoClose && b.destroy(), b.emit("error", J)) : (b.fd = j, b.emit("open", j), b.read());
    });
  }
  function I(b, J) {
    return this instanceof I ? (y.apply(this, arguments), this) : I.apply(Object.create(I.prototype), arguments);
  }
  function C() {
    var b = this;
    de(b.path, b.flags, b.mode, function(J, j) {
      J ? (b.destroy(), b.emit("error", J)) : (b.fd = j, b.emit("open", j));
    });
  }
  function M(b, J) {
    return new e.ReadStream(b, J);
  }
  function X(b, J) {
    return new e.WriteStream(b, J);
  }
  var W = e.open;
  e.open = de;
  function de(b, J, j, H) {
    return typeof j == "function" && (H = j, j = null), Q(b, J, j, H);
    function Q(F, L, q, x, G) {
      return W(F, L, q, function(B, k) {
        B && (B.code === "EMFILE" || B.code === "ENFILE") ? bn([Q, [F, L, q, x], B, G || Date.now(), Date.now()]) : typeof x == "function" && x.apply(this, arguments);
      });
    }
  }
  return e;
}
function bn(e) {
  fn("ENQUEUE", e[0].name, e[1]), Pe[He].push(e), el();
}
var xa;
function lf() {
  for (var e = Date.now(), t = 0; t < Pe[He].length; ++t)
    Pe[He][t].length > 2 && (Pe[He][t][3] = e, Pe[He][t][4] = e);
  el();
}
function el() {
  if (clearTimeout(xa), xa = void 0, Pe[He].length !== 0) {
    var e = Pe[He].shift(), t = e[0], r = e[1], n = e[2], i = e[3], a = e[4];
    if (i === void 0)
      fn("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      fn("TIMEOUT", t.name, r);
      var o = r.pop();
      typeof o == "function" && o.call(null, n);
    } else {
      var s = Date.now() - a, c = Math.max(a - i, 1), f = Math.min(c * 1.2, 100);
      s >= f ? (fn("RETRY", t.name, r), t.apply(null, r.concat([i]))) : Pe[He].push(e);
    }
    xa === void 0 && (xa = setTimeout(el, 0));
  }
}
(function(e) {
  const t = fe.fromCallback, r = ke, n = [
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
    return typeof a == "function" ? r.exists(i, a) : new Promise((o) => r.exists(i, o));
  }, e.read = function(i, a, o, s, c, f) {
    return typeof f == "function" ? r.read(i, a, o, s, c, f) : new Promise((l, u) => {
      r.read(i, a, o, s, c, (d, p, y) => {
        if (d) return u(d);
        l({ bytesRead: p, buffer: y });
      });
    });
  }, e.write = function(i, a, ...o) {
    return typeof o[o.length - 1] == "function" ? r.write(i, a, ...o) : new Promise((s, c) => {
      r.write(i, a, ...o, (f, l, u) => {
        if (f) return c(f);
        s({ bytesWritten: l, buffer: u });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, a, ...o) {
    return typeof o[o.length - 1] == "function" ? r.writev(i, a, ...o) : new Promise((s, c) => {
      r.writev(i, a, ...o, (f, l, u) => {
        if (f) return c(f);
        s({ bytesWritten: l, buffers: u });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(gn);
var tl = {}, lp = {};
const Uv = ce;
lp.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(Uv.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const up = gn, { checkPath: fp } = lp, dp = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
tl.makeDir = async (e, t) => (fp(e), up.mkdir(e, {
  mode: dp(t),
  recursive: !0
}));
tl.makeDirSync = (e, t) => (fp(e), up.mkdirSync(e, {
  mode: dp(t),
  recursive: !0
}));
const Mv = fe.fromPromise, { makeDir: jv, makeDirSync: Rs } = tl, Ns = Mv(jv);
var Ht = {
  mkdirs: Ns,
  mkdirsSync: Rs,
  // alias
  mkdirp: Ns,
  mkdirpSync: Rs,
  ensureDir: Ns,
  ensureDirSync: Rs
};
const Bv = fe.fromPromise, hp = gn;
function qv(e) {
  return hp.access(e).then(() => !0).catch(() => !1);
}
var vn = {
  pathExists: Bv(qv),
  pathExistsSync: hp.existsSync
};
const Gn = ke;
function Hv(e, t, r, n) {
  Gn.open(e, "r+", (i, a) => {
    if (i) return n(i);
    Gn.futimes(a, t, r, (o) => {
      Gn.close(a, (s) => {
        n && n(o || s);
      });
    });
  });
}
function Gv(e, t, r) {
  const n = Gn.openSync(e, "r+");
  return Gn.futimesSync(n, t, r), Gn.closeSync(n);
}
var pp = {
  utimesMillis: Hv,
  utimesMillisSync: Gv
};
const Yn = gn, xe = ce, Vv = xo;
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
  const i = r.dereference ? (o) => Yn.statSync(o, { bigint: !0 }) : (o) => Yn.lstatSync(o, { bigint: !0 }), a = i(e);
  try {
    n = i(t);
  } catch (o) {
    if (o.code === "ENOENT") return { srcStat: a, destStat: null };
    throw o;
  }
  return { srcStat: a, destStat: n };
}
function Kv(e, t, r, n, i) {
  Vv.callbackify(zv)(e, t, n, (a, o) => {
    if (a) return i(a);
    const { srcStat: s, destStat: c } = o;
    if (c) {
      if (pa(s, c)) {
        const f = xe.basename(e), l = xe.basename(t);
        return r === "move" && f !== l && f.toLowerCase() === l.toLowerCase() ? i(null, { srcStat: s, destStat: c, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (s.isDirectory() && !c.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!s.isDirectory() && c.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return s.isDirectory() && rl(e, t) ? i(new Error(Bo(e, t, r))) : i(null, { srcStat: s, destStat: c });
  });
}
function Yv(e, t, r, n) {
  const { srcStat: i, destStat: a } = Wv(e, t, n);
  if (a) {
    if (pa(i, a)) {
      const o = xe.basename(e), s = xe.basename(t);
      if (r === "move" && o !== s && o.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: a, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !a.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && a.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && rl(e, t))
    throw new Error(Bo(e, t, r));
  return { srcStat: i, destStat: a };
}
function mp(e, t, r, n, i) {
  const a = xe.resolve(xe.dirname(e)), o = xe.resolve(xe.dirname(r));
  if (o === a || o === xe.parse(o).root) return i();
  Yn.stat(o, { bigint: !0 }, (s, c) => s ? s.code === "ENOENT" ? i() : i(s) : pa(t, c) ? i(new Error(Bo(e, r, n))) : mp(e, t, o, n, i));
}
function yp(e, t, r, n) {
  const i = xe.resolve(xe.dirname(e)), a = xe.resolve(xe.dirname(r));
  if (a === i || a === xe.parse(a).root) return;
  let o;
  try {
    o = Yn.statSync(a, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (pa(t, o))
    throw new Error(Bo(e, r, n));
  return yp(e, t, a, n);
}
function pa(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function rl(e, t) {
  const r = xe.resolve(e).split(xe.sep).filter((i) => i), n = xe.resolve(t).split(xe.sep).filter((i) => i);
  return r.reduce((i, a, o) => i && n[o] === a, !0);
}
function Bo(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var ri = {
  checkPaths: Kv,
  checkPathsSync: Yv,
  checkParentPaths: mp,
  checkParentPathsSync: yp,
  isSrcSubdir: rl,
  areIdentical: pa
};
const dt = ke, Gi = ce, Xv = Ht.mkdirs, Jv = vn.pathExists, Qv = pp.utimesMillis, Vi = ri;
function Zv(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), Vi.checkPaths(e, t, "copy", r, (i, a) => {
    if (i) return n(i);
    const { srcStat: o, destStat: s } = a;
    Vi.checkParentPaths(e, o, t, "copy", (c) => c ? n(c) : r.filter ? gp(uf, s, e, t, r, n) : uf(s, e, t, r, n));
  });
}
function uf(e, t, r, n, i) {
  const a = Gi.dirname(r);
  Jv(a, (o, s) => {
    if (o) return i(o);
    if (s) return $o(e, t, r, n, i);
    Xv(a, (c) => c ? i(c) : $o(e, t, r, n, i));
  });
}
function gp(e, t, r, n, i, a) {
  Promise.resolve(i.filter(r, n)).then((o) => o ? e(t, r, n, i, a) : a(), (o) => a(o));
}
function e_(e, t, r, n, i) {
  return n.filter ? gp($o, e, t, r, n, i) : $o(e, t, r, n, i);
}
function $o(e, t, r, n, i) {
  (n.dereference ? dt.stat : dt.lstat)(t, (o, s) => o ? i(o) : s.isDirectory() ? s_(s, e, t, r, n, i) : s.isFile() || s.isCharacterDevice() || s.isBlockDevice() ? t_(s, e, t, r, n, i) : s.isSymbolicLink() ? u_(e, t, r, n, i) : s.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : s.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function t_(e, t, r, n, i, a) {
  return t ? r_(e, r, n, i, a) : vp(e, r, n, i, a);
}
function r_(e, t, r, n, i) {
  if (n.overwrite)
    dt.unlink(r, (a) => a ? i(a) : vp(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function vp(e, t, r, n, i) {
  dt.copyFile(t, r, (a) => a ? i(a) : n.preserveTimestamps ? n_(e.mode, t, r, i) : qo(r, e.mode, i));
}
function n_(e, t, r, n) {
  return i_(e) ? a_(r, e, (i) => i ? n(i) : ff(e, t, r, n)) : ff(e, t, r, n);
}
function i_(e) {
  return (e & 128) === 0;
}
function a_(e, t, r) {
  return qo(e, t | 128, r);
}
function ff(e, t, r, n) {
  o_(t, r, (i) => i ? n(i) : qo(r, e, n));
}
function qo(e, t, r) {
  return dt.chmod(e, t, r);
}
function o_(e, t, r) {
  dt.stat(e, (n, i) => n ? r(n) : Qv(t, i.atime, i.mtime, r));
}
function s_(e, t, r, n, i, a) {
  return t ? _p(r, n, i, a) : c_(e.mode, r, n, i, a);
}
function c_(e, t, r, n, i) {
  dt.mkdir(r, (a) => {
    if (a) return i(a);
    _p(t, r, n, (o) => o ? i(o) : qo(r, e, i));
  });
}
function _p(e, t, r, n) {
  dt.readdir(e, (i, a) => i ? n(i) : $p(a, e, t, r, n));
}
function $p(e, t, r, n, i) {
  const a = e.pop();
  return a ? l_(e, a, t, r, n, i) : i();
}
function l_(e, t, r, n, i, a) {
  const o = Gi.join(r, t), s = Gi.join(n, t);
  Vi.checkPaths(o, s, "copy", i, (c, f) => {
    if (c) return a(c);
    const { destStat: l } = f;
    e_(l, o, s, i, (u) => u ? a(u) : $p(e, r, n, i, a));
  });
}
function u_(e, t, r, n, i) {
  dt.readlink(t, (a, o) => {
    if (a) return i(a);
    if (n.dereference && (o = Gi.resolve(process.cwd(), o)), e)
      dt.readlink(r, (s, c) => s ? s.code === "EINVAL" || s.code === "UNKNOWN" ? dt.symlink(o, r, i) : i(s) : (n.dereference && (c = Gi.resolve(process.cwd(), c)), Vi.isSrcSubdir(o, c) ? i(new Error(`Cannot copy '${o}' to a subdirectory of itself, '${c}'.`)) : e.isDirectory() && Vi.isSrcSubdir(c, o) ? i(new Error(`Cannot overwrite '${c}' with '${o}'.`)) : f_(o, r, i)));
    else
      return dt.symlink(o, r, i);
  });
}
function f_(e, t, r) {
  dt.unlink(t, (n) => n ? r(n) : dt.symlink(e, t, r));
}
var d_ = Zv;
const Je = ke, zi = ce, h_ = Ht.mkdirsSync, p_ = pp.utimesMillisSync, Wi = ri;
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
  return Je.existsSync(i) || h_(i), wp(e, t, r, n);
}
function g_(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return wp(e, t, r, n);
}
function wp(e, t, r, n) {
  const a = (n.dereference ? Je.statSync : Je.lstatSync)(t);
  if (a.isDirectory()) return b_(a, e, t, r, n);
  if (a.isFile() || a.isCharacterDevice() || a.isBlockDevice()) return v_(a, e, t, r, n);
  if (a.isSymbolicLink()) return A_(e, t, r, n);
  throw a.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : a.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function v_(e, t, r, n, i) {
  return t ? __(e, r, n, i) : Ep(e, r, n, i);
}
function __(e, t, r, n) {
  if (n.overwrite)
    return Je.unlinkSync(r), Ep(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function Ep(e, t, r, n) {
  return Je.copyFileSync(t, r), n.preserveTimestamps && $_(e.mode, t, r), nl(r, e.mode);
}
function $_(e, t, r) {
  return w_(e) && E_(r, e), S_(t, r);
}
function w_(e) {
  return (e & 128) === 0;
}
function E_(e, t) {
  return nl(e, t | 128);
}
function nl(e, t) {
  return Je.chmodSync(e, t);
}
function S_(e, t) {
  const r = Je.statSync(e);
  return p_(t, r.atime, r.mtime);
}
function b_(e, t, r, n, i) {
  return t ? Sp(r, n, i) : P_(e.mode, r, n, i);
}
function P_(e, t, r, n) {
  return Je.mkdirSync(r), Sp(t, r, n), nl(r, e);
}
function Sp(e, t, r) {
  Je.readdirSync(e).forEach((n) => T_(n, e, t, r));
}
function T_(e, t, r, n) {
  const i = zi.join(t, e), a = zi.join(r, e), { destStat: o } = Wi.checkPathsSync(i, a, "copy", n);
  return g_(o, i, a, n);
}
function A_(e, t, r, n) {
  let i = Je.readlinkSync(t);
  if (n.dereference && (i = zi.resolve(process.cwd(), i)), e) {
    let a;
    try {
      a = Je.readlinkSync(r);
    } catch (o) {
      if (o.code === "EINVAL" || o.code === "UNKNOWN") return Je.symlinkSync(i, r);
      throw o;
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
const C_ = fe.fromCallback;
var il = {
  copy: C_(d_),
  copySync: O_
};
const df = ke, bp = ce, ge = ip, Ki = process.platform === "win32";
function Pp(e) {
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
function al(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), ge(e, "rimraf: missing path"), ge.strictEqual(typeof e, "string", "rimraf: path should be a string"), ge.strictEqual(typeof r, "function", "rimraf: callback function required"), ge(t, "rimraf: invalid options argument provided"), ge.strictEqual(typeof t, "object", "rimraf: options should be object"), Pp(t), hf(e, t, function i(a) {
    if (a) {
      if ((a.code === "EBUSY" || a.code === "ENOTEMPTY" || a.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const o = n * 100;
        return setTimeout(() => hf(e, t, i), o);
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
      return co(e, t, n, r);
    t.unlink(e, (a) => {
      if (a) {
        if (a.code === "ENOENT")
          return r(null);
        if (a.code === "EPERM")
          return Ki ? pf(e, t, a, r) : co(e, t, a, r);
        if (a.code === "EISDIR")
          return co(e, t, a, r);
      }
      return r(a);
    });
  });
}
function pf(e, t, r, n) {
  ge(e), ge(t), ge(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (a, o) => {
      a ? n(a.code === "ENOENT" ? null : r) : o.isDirectory() ? co(e, t, r, n) : t.unlink(e, n);
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
  n.isDirectory() ? lo(e, t, r) : t.unlinkSync(e);
}
function co(e, t, r, n) {
  ge(e), ge(t), ge(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? R_(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function R_(e, t, r) {
  ge(e), ge(t), ge(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let a = i.length, o;
    if (a === 0) return t.rmdir(e, r);
    i.forEach((s) => {
      al(bp.join(e, s), t, (c) => {
        if (!o) {
          if (c) return r(o = c);
          --a === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function Tp(e, t) {
  let r;
  t = t || {}, Pp(t), ge(e, "rimraf: missing path"), ge.strictEqual(typeof e, "string", "rimraf: path should be a string"), ge(t, "rimraf: missing options"), ge.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && Ki && mf(e, t, n);
  }
  try {
    r && r.isDirectory() ? lo(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return Ki ? mf(e, t, n) : lo(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    lo(e, t, n);
  }
}
function lo(e, t, r) {
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
  if (ge(e), ge(t), t.readdirSync(e).forEach((r) => Tp(bp.join(e, r), t)), Ki) {
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
var D_ = al;
al.sync = Tp;
const wo = ke, k_ = fe.fromCallback, Ap = D_;
function F_(e, t) {
  if (wo.rm) return wo.rm(e, { recursive: !0, force: !0 }, t);
  Ap(e, t);
}
function L_(e) {
  if (wo.rmSync) return wo.rmSync(e, { recursive: !0, force: !0 });
  Ap.sync(e);
}
var Ho = {
  remove: k_(F_),
  removeSync: L_
};
const x_ = fe.fromPromise, Ip = gn, Op = ce, Cp = Ht, Rp = Ho, yf = x_(async function(t) {
  let r;
  try {
    r = await Ip.readdir(t);
  } catch {
    return Cp.mkdirs(t);
  }
  return Promise.all(r.map((n) => Rp.remove(Op.join(t, n))));
});
function gf(e) {
  let t;
  try {
    t = Ip.readdirSync(e);
  } catch {
    return Cp.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = Op.join(e, r), Rp.removeSync(r);
  });
}
var U_ = {
  emptyDirSync: gf,
  emptydirSync: gf,
  emptyDir: yf,
  emptydir: yf
};
const M_ = fe.fromCallback, Np = ce, br = ke, Dp = Ht;
function j_(e, t) {
  function r() {
    br.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  br.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const a = Np.dirname(e);
    br.stat(a, (o, s) => {
      if (o)
        return o.code === "ENOENT" ? Dp.mkdirs(a, (c) => {
          if (c) return t(c);
          r();
        }) : t(o);
      s.isDirectory() ? r() : br.readdir(a, (c) => {
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
  const r = Np.dirname(e);
  try {
    br.statSync(r).isDirectory() || br.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") Dp.mkdirsSync(r);
    else throw n;
  }
  br.writeFileSync(e, "");
}
var q_ = {
  createFile: M_(j_),
  createFileSync: B_
};
const H_ = fe.fromCallback, kp = ce, $r = ke, Fp = Ht, G_ = vn.pathExists, { areIdentical: Lp } = ri;
function V_(e, t, r) {
  function n(i, a) {
    $r.link(i, a, (o) => {
      if (o) return r(o);
      r(null);
    });
  }
  $r.lstat(t, (i, a) => {
    $r.lstat(e, (o, s) => {
      if (o)
        return o.message = o.message.replace("lstat", "ensureLink"), r(o);
      if (a && Lp(s, a)) return r(null);
      const c = kp.dirname(t);
      G_(c, (f, l) => {
        if (f) return r(f);
        if (l) return n(e, t);
        Fp.mkdirs(c, (u) => {
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
    if (r && Lp(a, r)) return;
  } catch (a) {
    throw a.message = a.message.replace("lstat", "ensureLink"), a;
  }
  const n = kp.dirname(t);
  return $r.existsSync(n) || Fp.mkdirsSync(n), $r.linkSync(e, t);
}
var W_ = {
  createLink: H_(V_),
  createLinkSync: z_
};
const Pr = ce, ki = ke, K_ = vn.pathExists;
function Y_(e, t, r) {
  if (Pr.isAbsolute(e))
    return ki.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = Pr.dirname(t), i = Pr.join(n, e);
    return K_(i, (a, o) => a ? r(a) : o ? r(null, {
      toCwd: i,
      toDst: e
    }) : ki.lstat(e, (s) => s ? (s.message = s.message.replace("lstat", "ensureSymlink"), r(s)) : r(null, {
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
const xp = ke;
function Q_(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  xp.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function Z_(e, t) {
  let r;
  if (t) return t;
  try {
    r = xp.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var e$ = {
  symlinkType: Q_,
  symlinkTypeSync: Z_
};
const t$ = fe.fromCallback, Up = ce, Rt = gn, Mp = Ht, r$ = Mp.mkdirs, n$ = Mp.mkdirsSync, jp = J_, i$ = jp.symlinkPaths, a$ = jp.symlinkPathsSync, Bp = e$, o$ = Bp.symlinkType, s$ = Bp.symlinkTypeSync, c$ = vn.pathExists, { areIdentical: qp } = ri;
function l$(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, Rt.lstat(t, (i, a) => {
    !i && a.isSymbolicLink() ? Promise.all([
      Rt.stat(e),
      Rt.stat(t)
    ]).then(([o, s]) => {
      if (qp(o, s)) return n(null);
      vf(e, t, r, n);
    }) : vf(e, t, r, n);
  });
}
function vf(e, t, r, n) {
  i$(e, t, (i, a) => {
    if (i) return n(i);
    e = a.toDst, o$(a.toCwd, r, (o, s) => {
      if (o) return n(o);
      const c = Up.dirname(t);
      c$(c, (f, l) => {
        if (f) return n(f);
        if (l) return Rt.symlink(e, t, s, n);
        r$(c, (u) => {
          if (u) return n(u);
          Rt.symlink(e, t, s, n);
        });
      });
    });
  });
}
function u$(e, t, r) {
  let n;
  try {
    n = Rt.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const s = Rt.statSync(e), c = Rt.statSync(t);
    if (qp(s, c)) return;
  }
  const i = a$(e, t);
  e = i.toDst, r = s$(i.toCwd, r);
  const a = Up.dirname(t);
  return Rt.existsSync(a) || n$(a), Rt.symlinkSync(e, t, r);
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
const Go = fe, { stringify: Hp, stripBom: Gp } = ma;
async function m$(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Xn, n = "throws" in t ? t.throws : !0;
  let i = await Go.fromCallback(r.readFile)(e, t);
  i = Gp(i);
  let a;
  try {
    a = JSON.parse(i, t ? t.reviver : null);
  } catch (o) {
    if (n)
      throw o.message = `${e}: ${o.message}`, o;
    return null;
  }
  return a;
}
const y$ = Go.fromPromise(m$);
function g$(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Xn, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = Gp(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function v$(e, t, r = {}) {
  const n = r.fs || Xn, i = Hp(t, r);
  await Go.fromCallback(n.writeFile)(e, i, r);
}
const _$ = Go.fromPromise(v$);
function $$(e, t, r = {}) {
  const n = r.fs || Xn, i = Hp(t, r);
  return n.writeFileSync(e, i, r);
}
var Vp = {
  readFile: y$,
  readFileSync: g$,
  writeFile: _$,
  writeFileSync: $$
};
const Ua = Vp;
var w$ = {
  // jsonfile exports
  readJson: Ua.readFile,
  readJsonSync: Ua.readFileSync,
  writeJson: Ua.writeFile,
  writeJsonSync: Ua.writeFileSync
};
const E$ = fe.fromCallback, Fi = ke, zp = ce, Wp = Ht, S$ = vn.pathExists;
function b$(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = zp.dirname(e);
  S$(i, (a, o) => {
    if (a) return n(a);
    if (o) return Fi.writeFile(e, t, r, n);
    Wp.mkdirs(i, (s) => {
      if (s) return n(s);
      Fi.writeFile(e, t, r, n);
    });
  });
}
function P$(e, ...t) {
  const r = zp.dirname(e);
  if (Fi.existsSync(r))
    return Fi.writeFileSync(e, ...t);
  Wp.mkdirsSync(r), Fi.writeFileSync(e, ...t);
}
var ol = {
  outputFile: E$(b$),
  outputFileSync: P$
};
const { stringify: T$ } = ma, { outputFile: A$ } = ol;
async function I$(e, t, r = {}) {
  const n = T$(t, r);
  await A$(e, n, r);
}
var O$ = I$;
const { stringify: C$ } = ma, { outputFileSync: R$ } = ol;
function N$(e, t, r) {
  const n = C$(t, r);
  R$(e, n, r);
}
var D$ = N$;
const k$ = fe.fromPromise, ot = w$;
ot.outputJson = k$(O$);
ot.outputJsonSync = D$;
ot.outputJSON = ot.outputJson;
ot.outputJSONSync = ot.outputJsonSync;
ot.writeJSON = ot.writeJson;
ot.writeJSONSync = ot.writeJsonSync;
ot.readJSON = ot.readJson;
ot.readJSONSync = ot.readJsonSync;
var F$ = ot;
const L$ = ke, Ec = ce, x$ = il.copy, Kp = Ho.remove, U$ = Ht.mkdirp, M$ = vn.pathExists, Pf = ri;
function j$(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  Pf.checkPaths(e, t, "move", r, (a, o) => {
    if (a) return n(a);
    const { srcStat: s, isChangingCase: c = !1 } = o;
    Pf.checkParentPaths(e, s, t, "move", (f) => {
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
  if (n) return Ds(e, t, r, i);
  if (r)
    return Kp(t, (a) => a ? i(a) : Ds(e, t, r, i));
  M$(t, (a, o) => a ? i(a) : o ? i(new Error("dest already exists.")) : Ds(e, t, r, i));
}
function Ds(e, t, r, n) {
  L$.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : q$(e, t, r, n) : n());
}
function q$(e, t, r, n) {
  x$(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (a) => a ? n(a) : Kp(e, n));
}
var H$ = j$;
const Yp = ke, Sc = ce, G$ = il.copySync, Xp = Ho.removeSync, V$ = Ht.mkdirpSync, Af = ri;
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
  if (n) return ks(e, t, r);
  if (r)
    return Xp(t), ks(e, t, r);
  if (Yp.existsSync(t)) throw new Error("dest already exists.");
  return ks(e, t, r);
}
function ks(e, t, r) {
  try {
    Yp.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return Y$(e, t, r);
  }
}
function Y$(e, t, r) {
  return G$(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), Xp(e);
}
var X$ = z$;
const J$ = fe.fromCallback;
var Q$ = {
  move: J$(H$),
  moveSync: X$
}, xr = {
  // Export promiseified graceful-fs:
  ...gn,
  // Export extra methods:
  ...il,
  ...U_,
  ...d$,
  ...F$,
  ...Ht,
  ...Q$,
  ...ol,
  ...vn,
  ...Ho
}, ar = {}, Rr = {}, Me = {}, Nr = {};
Object.defineProperty(Nr, "__esModule", { value: !0 });
Nr.CancellationError = Nr.CancellationToken = void 0;
const Z$ = ap;
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
      let o = null;
      if (n = () => {
        try {
          o != null && (o(), o = null);
        } finally {
          a(new bc());
        }
      }, this.cancelled) {
        n();
        return;
      }
      this.onCancel(n), t(i, a, (s) => {
        o = s;
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
var at = {}, Pc = { exports: {} }, Ma = { exports: {} }, Fs, If;
function rw() {
  if (If) return Fs;
  If = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, a = n * 365.25;
  Fs = function(l, u) {
    u = u || {};
    var d = typeof l;
    if (d === "string" && l.length > 0)
      return o(l);
    if (d === "number" && isFinite(l))
      return u.long ? c(l) : s(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function o(l) {
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
  function s(l) {
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
  return Fs;
}
var Ls, Of;
function Jp() {
  if (Of) return Ls;
  Of = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = f, n.disable = s, n.enable = a, n.enabled = c, n.humanize = rw(), n.destroy = l, Object.keys(t).forEach((u) => {
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
        const w = _, I = Number(/* @__PURE__ */ new Date()), C = I - (d || I);
        w.diff = C, w.prev = d, w.curr = I, d = I, v[0] = n.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
        let M = 0;
        v[0] = v[0].replace(/%([a-zA-Z%])/g, (W, de) => {
          if (W === "%%")
            return "%";
          M++;
          const b = n.formatters[de];
          if (typeof b == "function") {
            const J = v[M];
            W = b.call(w, J), v.splice(M, 1), M--;
          }
          return W;
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
    function o(u, d) {
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
    function s() {
      const u = [
        ...n.names,
        ...n.skips.map((d) => "-" + d)
      ].join(",");
      return n.enable(""), u;
    }
    function c(u) {
      for (const d of n.skips)
        if (o(u, d))
          return !1;
      for (const d of n.names)
        if (o(u, d))
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
  return Ls = e, Ls;
}
var Cf;
function nw() {
  return Cf || (Cf = 1, function(e, t) {
    t.formatArgs = n, t.save = i, t.load = a, t.useColors = r, t.storage = o(), t.destroy = /* @__PURE__ */ (() => {
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
    function o() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = Jp()(t);
    const { formatters: s } = e.exports;
    s.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (f) {
        return "[UnexpectedJSONParseError]: " + f.message;
      }
    };
  }(Ma, Ma.exports)), Ma.exports;
}
var ja = { exports: {} }, xs, Rf;
function iw() {
  return Rf || (Rf = 1, xs = (e, t = process.argv) => {
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 || n < i);
  }), xs;
}
var Us, Nf;
function aw() {
  if (Nf) return Us;
  Nf = 1;
  const e = Uo, t = op, r = iw(), { env: n } = process;
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
  function o(c, f) {
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
  function s(c) {
    const f = o(c, c && c.isTTY);
    return a(f);
  }
  return Us = {
    supportsColor: s,
    stdout: a(o(!0, t.isatty(1))),
    stderr: a(o(!0, t.isatty(2)))
  }, Us;
}
var Df;
function ow() {
  return Df || (Df = 1, function(e, t) {
    const r = op, n = xo;
    t.init = l, t.log = s, t.formatArgs = a, t.save = c, t.load = f, t.useColors = i, t.destroy = n.deprecate(
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
        d[0] = o() + p + " " + d[0];
    }
    function o() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function s(...d) {
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
    e.exports = Jp()(t);
    const { formatters: u } = e.exports;
    u.o = function(d) {
      return this.inspectOpts.colors = this.useColors, n.inspect(d, this.inspectOpts).split(`
`).map((p) => p.trim()).join(" ");
    }, u.O = function(d) {
      return this.inspectOpts.colors = this.useColors, n.inspect(d, this.inspectOpts);
    };
  }(ja, ja.exports)), ja.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Pc.exports = nw() : Pc.exports = ow();
var sw = Pc.exports, ya = {};
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
at.configureRequestOptionsFromUrl = Zp;
at.configureRequestUrl = cl;
at.safeGetHeader = Vn;
at.configureRequestOptions = So;
at.safeStringifyJson = bo;
const uw = ha, fw = sw, dw = Lr, hw = fa, Qp = ti, pw = Nr, kf = ni, mw = ya, Ei = (0, fw.default)("electron-builder");
function Tc(e, t = null) {
  return new sl(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + bo(e.headers), t);
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
class Eo {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, r = new pw.CancellationToken(), n) {
    So(t);
    const i = n == null ? void 0 : JSON.stringify(n), a = i ? Buffer.from(i) : void 0;
    if (a != null) {
      Ei(i);
      const { headers: o, ...s } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": a.length,
          ...o
        },
        ...s
      };
    }
    return this.doApiRequest(t, r, (o) => o.end(a));
  }
  doApiRequest(t, r, n, i = 0) {
    return Ei.enabled && Ei(`Request: ${bo(t)}`), r.createPromise((a, o, s) => {
      const c = this.createRequest(t, (f) => {
        try {
          this.handleResponse(f, t, r, a, o, i, n);
        } catch (l) {
          o(l);
        }
      });
      this.addErrorAndTimeoutHandlers(c, o, t.timeout), this.addRedirectHandlers(c, t, o, i, (f) => {
        this.doApiRequest(f, r, n, i).then(a).catch(o);
      }), n(c, o), s(() => c.abort());
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
  handleResponse(t, r, n, i, a, o, s) {
    var c;
    if (Ei.enabled && Ei(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${bo(r)}`), t.statusCode === 404) {
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
      if (o > this.maxRedirects) {
        a(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(Eo.prepareRedirectUrlOptions(u, r), n, s, o).then(i).catch(a);
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
      const o = [], s = {
        headers: r.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      cl(t, s), So(s), this.doDownload(s, {
        destination: null,
        options: r,
        onCancel: a,
        callback: (c) => {
          c == null ? n(Buffer.concat(o)) : i(c);
        },
        responseHandler: (c, f) => {
          let l = 0;
          c.on("data", (u) => {
            if (l += u.length, l > 524288e3) {
              f(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            o.push(u);
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
      const o = Vn(a, "location");
      if (o != null) {
        n < this.maxRedirects ? this.doDownload(Eo.prepareRedirectUrlOptions(o, t), r, n++) : r.callback(this.createMaxRedirectError());
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
    const n = Zp(t, { ...r }), i = n.headers;
    if (i != null && i.authorization) {
      const a = new Qp.URL(t);
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
at.HttpExecutor = Eo;
function Zp(e, t) {
  const r = So(t);
  return cl(new Qp.URL(e), r), r;
}
function cl(e, t) {
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
    const o = Vn(t, "content-length");
    o != null && r.push(new mw.ProgressCallbackTransform(parseInt(o, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const n = e.options.sha512;
  n != null ? r.push(new Ac(n, "sha512", n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && r.push(new Ac(e.options.sha2, "sha256", "hex"));
  const i = (0, dw.createWriteStream)(e.destination);
  r.push(i);
  let a = t;
  for (const o of r)
    o.on("error", (s) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(s);
    }), a = a.pipe(o);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function So(e, t, r) {
  r != null && (e.method = r), e.headers = { ...e.headers };
  const n = e.headers;
  return t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"), (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function bo(e, t) {
  return JSON.stringify(e, (r, n) => r.endsWith("Authorization") || r.endsWith("authorization") || r.endsWith("Password") || r.endsWith("PASSWORD") || r.endsWith("Token") || r.includes("password") || r.includes("token") || t != null && t.has(r) ? "<stripped sensitive data>" : n, 2);
}
var Vo = {};
Object.defineProperty(Vo, "__esModule", { value: !0 });
Vo.MemoLazy = void 0;
class $w {
  constructor(t, r) {
    this.selector = t, this.creator = r, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && em(this.selected, t))
      return this._value;
    this.selected = t;
    const r = this.creator(t);
    return this.value = r, r;
  }
  set value(t) {
    this._value = t;
  }
}
Vo.MemoLazy = $w;
function em(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), a = Object.keys(t);
    return i.length === a.length && i.every((o) => em(e[o], t[o]));
  }
  return e === t;
}
var zo = {};
Object.defineProperty(zo, "__esModule", { value: !0 });
zo.githubUrl = ww;
zo.getS3LikeProviderBaseUrl = Ew;
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
  return tm(t, e.path);
}
function tm(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function bw(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return tm(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var ll = {};
Object.defineProperty(ll, "__esModule", { value: !0 });
ll.retry = rm;
const Pw = Nr;
async function rm(e, t, r, n = 0, i = 0, a) {
  var o;
  const s = new Pw.CancellationToken();
  try {
    return await e();
  } catch (c) {
    if ((!((o = a == null ? void 0 : a(c)) !== null && o !== void 0) || o) && t > 0 && !s.cancelled)
      return await new Promise((f) => setTimeout(f, r + n * i)), await rm(e, t - 1, r, n, i + 1, a);
    throw c;
  }
}
var ul = {};
Object.defineProperty(ul, "__esModule", { value: !0 });
ul.parseDn = Tw;
function Tw(e) {
  let t = !1, r = null, n = "", i = 0;
  e = e.trim();
  const a = /* @__PURE__ */ new Map();
  for (let o = 0; o <= e.length; o++) {
    if (o === e.length) {
      r !== null && a.set(r, n);
      break;
    }
    const s = e[o];
    if (t) {
      if (s === '"') {
        t = !1;
        continue;
      }
    } else {
      if (s === '"') {
        t = !0;
        continue;
      }
      if (s === "\\") {
        o++;
        const c = parseInt(e.slice(o, o + 2), 16);
        Number.isNaN(c) ? n += e[o] : (o++, n += String.fromCharCode(c));
        continue;
      }
      if (r === null && s === "=") {
        r = n, n = "";
        continue;
      }
      if (s === "," || s === ";" || s === "+") {
        r !== null && a.set(r, n), r = null, n = "";
        continue;
      }
    }
    if (s === " " && !t) {
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
    n += s;
  }
  return a;
}
var Jn = {};
Object.defineProperty(Jn, "__esModule", { value: !0 });
Jn.nil = Jn.UUID = void 0;
const nm = ha, im = ni, Aw = "options.name must be either a string or a Buffer", Ff = (0, nm.randomBytes)(16);
Ff[0] = Ff[0] | 1;
const uo = {}, le = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  uo[t] = e, le[e] = t;
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
        version: (uo[t[14] + t[15]] & 240) >> 4,
        variant: Lf((uo[t[19] + t[20]] & 224) >> 5),
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
    throw (0, im.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const r = Buffer.allocUnsafe(16);
    let n = 0;
    for (let i = 0; i < 16; i++)
      r[i] = uo[t[n++] + t[n++]], (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
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
  const a = (0, nm.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, im.newError)(Aw, "ERR_INVALID_UUID_NAME");
  a.update(n), a.update(e);
  const s = a.digest();
  let c;
  switch (i) {
    case Li.BINARY:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, c = s;
      break;
    case Li.OBJECT:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, c = new hn(s);
      break;
    default:
      c = le[s[0]] + le[s[1]] + le[s[2]] + le[s[3]] + "-" + le[s[4]] + le[s[5]] + "-" + le[s[6] & 15 | r] + le[s[7]] + "-" + le[s[8] & 63 | 128] + le[s[9]] + "-" + le[s[10]] + le[s[11]] + le[s[12]] + le[s[13]] + le[s[14]] + le[s[15]];
      break;
  }
  return c;
}
function Ow(e) {
  return le[e[0]] + le[e[1]] + le[e[2]] + le[e[3]] + "-" + le[e[4]] + le[e[5]] + "-" + le[e[6]] + le[e[7]] + "-" + le[e[8]] + le[e[9]] + "-" + le[e[10]] + le[e[11]] + le[e[12]] + le[e[13]] + le[e[14]] + le[e[15]];
}
Jn.nil = new hn("00000000-0000-0000-0000-000000000000");
var ga = {}, am = {};
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
      a(N), N.q = N.c = "", N.bufferCheckPosition = t.MAX_BUFFER_LENGTH, N.opt = h || {}, N.opt.lowercase = N.opt.lowercase || N.opt.lowercasetags, N.looseCase = N.opt.lowercase ? "toLowerCase" : "toUpperCase", N.tags = [], N.closed = N.closedRoot = N.sawRoot = !1, N.tag = N.error = null, N.strict = !!m, N.noscript = !!(m || N.opt.noscript), N.state = b.BEGIN, N.strictEntities = N.opt.strictEntities, N.ENTITIES = N.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), N.attribList = [], N.opt.xmlns && (N.ns = Object.create(g)), N.opt.unquotedAttributeValues === void 0 && (N.opt.unquotedAttributeValues = !m), N.trackPosition = N.opt.position !== !1, N.trackPosition && (N.position = N.line = N.column = 0), j(N, "onready");
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
      for (var h = Math.max(t.MAX_BUFFER_LENGTH, 10), N = 0, P = 0, Z = r.length; P < Z; P++) {
        var he = m[r[P]].length;
        if (he > h)
          switch (r[P]) {
            case "textNode":
              Q(m);
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
        N = Math.max(N, he);
      }
      var ve = t.MAX_BUFFER_LENGTH - N;
      m.bufferCheckPosition = ve + m.position;
    }
    function a(m) {
      for (var h = 0, N = r.length; h < N; h++)
        m[r[h]] = "";
    }
    function o(m) {
      Q(m), m.cdata !== "" && (H(m, "oncdata", m.cdata), m.cdata = ""), m.script !== "" && (H(m, "onscript", m.script), m.script = "");
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
        o(this);
      }
    };
    var s;
    try {
      s = require("stream").Stream;
    } catch {
      s = function() {
      };
    }
    s || (s = function() {
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
      s.apply(this), this._parser = new n(m, h), this.writable = !0, this.readable = !0;
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
          set: function(Z) {
            if (!Z)
              return N.removeAllListeners(P), N._parser["on" + P] = Z, Z;
            N.on(P, Z);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    l.prototype = Object.create(s.prototype, {
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
      }), s.prototype.on.call(N, m, h);
    };
    var u = "[CDATA[", d = "DOCTYPE", p = "http://www.w3.org/XML/1998/namespace", y = "http://www.w3.org/2000/xmlns/", g = { xml: p, xmlns: y }, _ = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, v = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, w = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, I = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function C(m) {
      return m === " " || m === `
` || m === "\r" || m === "	";
    }
    function M(m) {
      return m === '"' || m === "'";
    }
    function X(m) {
      return m === ">" || C(m);
    }
    function W(m, h) {
      return m.test(h);
    }
    function de(m, h) {
      return !W(m, h);
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
    for (var J in t.STATE)
      t.STATE[t.STATE[J]] = J;
    b = t.STATE;
    function j(m, h, N) {
      m[h] && m[h](N);
    }
    function H(m, h, N) {
      m.textNode && Q(m), j(m, h, N);
    }
    function Q(m) {
      m.textNode = F(m.opt, m.textNode), m.textNode && j(m, "ontext", m.textNode), m.textNode = "";
    }
    function F(m, h) {
      return m.trim && (h = h.trim()), m.normalize && (h = h.replace(/\s+/g, " ")), h;
    }
    function L(m, h) {
      return Q(m), m.trackPosition && (h += `
Line: ` + m.line + `
Column: ` + m.column + `
Char: ` + m.c), h = new Error(h), m.error = h, j(m, "onerror", h), m;
    }
    function q(m) {
      return m.sawRoot && !m.closedRoot && x(m, "Unclosed root tag"), m.state !== b.BEGIN && m.state !== b.BEGIN_WHITESPACE && m.state !== b.TEXT && L(m, "Unexpected end"), Q(m), m.c = "", m.closed = !0, j(m, "onend"), n.call(m, m.strict, m.opt), m;
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
      var N = m.indexOf(":"), P = N < 0 ? ["", m] : m.split(":"), Z = P[0], he = P[1];
      return h && m === "xmlns" && (Z = "xmlns", he = ""), { prefix: Z, local: he };
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
            var Z = m.tag, he = m.tags[m.tags.length - 1] || m;
            Z.ns === he.ns && (Z.ns = Object.create(he.ns)), Z.ns[P] = m.attribValue;
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
        var Z = m.tags[m.tags.length - 1] || m;
        N.ns && Z.ns !== N.ns && Object.keys(N.ns).forEach(function(sr) {
          H(m, "onopennamespace", {
            prefix: sr,
            uri: N.ns[sr]
          });
        });
        for (var he = 0, ve = m.attribList.length; he < ve; he++) {
          var Ie = m.attribList[he], Ce = Ie[0], _t = Ie[1], Se = B(Ce, !0), Ze = Se.prefix, Gr = Se.local, or = Ze === "" ? "" : N.ns[Ze] || "", Vt = {
            name: Ce,
            value: _t,
            prefix: Ze,
            local: Gr,
            uri: or
          };
          Ze && Ze !== "xmlns" && !or && (x(m, "Unbound namespace prefix: " + JSON.stringify(Ze)), Vt.uri = Ze), m.tag.attributes[Ce] = Vt, H(m, "onattribute", Vt);
        }
        m.attribList.length = 0;
      }
      m.tag.isSelfClosing = !!h, m.sawRoot = !0, m.tags.push(m.tag), H(m, "onopentag", m.tag), h || (!m.noscript && m.tagName.toLowerCase() === "script" ? m.state = b.SCRIPT : m.state = b.TEXT, m.tag = null, m.tagName = ""), m.attribName = m.attribValue = "", m.attribList.length = 0;
    }
    function R(m) {
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
        var Z = m.tags[h];
        if (Z.name !== P)
          x(m, "Unexpected close tag");
        else
          break;
      }
      if (h < 0) {
        x(m, "Unmatched closing tag: " + m.tagName), m.textNode += "</" + m.tagName + ">", m.state = b.TEXT;
        return;
      }
      m.tagName = N;
      for (var he = m.tags.length; he-- > h; ) {
        var ve = m.tag = m.tags.pop();
        m.tagName = m.tag.name, H(m, "onclosetag", m.tagName);
        var Ie = {};
        for (var Ce in ve.ns)
          Ie[Ce] = ve.ns[Ce];
        var _t = m.tags[m.tags.length - 1] || m;
        m.opt.xmlns && ve.ns !== _t.ns && Object.keys(ve.ns).forEach(function(Se) {
          var Ze = ve.ns[Se];
          H(m, "onclosenamespace", { prefix: Se, uri: Ze });
        });
      }
      h === 0 && (m.closedRoot = !0), m.tagName = m.attribValue = m.attribName = "", m.attribList.length = 0, m.state = b.TEXT;
    }
    function O(m) {
      var h = m.entity, N = h.toLowerCase(), P, Z = "";
      return m.ENTITIES[h] ? m.ENTITIES[h] : m.ENTITIES[N] ? m.ENTITIES[N] : (h = N, h.charAt(0) === "#" && (h.charAt(1) === "x" ? (h = h.slice(2), P = parseInt(h, 16), Z = P.toString(16)) : (h = h.slice(1), P = parseInt(h, 10), Z = P.toString(10))), h = h.replace(/^0+/, ""), isNaN(P) || Z.toLowerCase() !== h ? (x(m, "Invalid character entity"), "&" + m.entity + ";") : String.fromCodePoint(P));
    }
    function $(m, h) {
      h === "<" ? (m.state = b.OPEN_WAKA, m.startTagPosition = m.position) : C(h) || (x(m, "Non-whitespace before first tag."), m.textNode = h, m.state = b.TEXT);
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
              for (var Z = N - 1; P && P !== "<" && P !== "&"; )
                P = S(m, N++), P && h.trackPosition && (h.position++, P === `
` ? (h.line++, h.column = 0) : h.column++);
              h.textNode += m.substring(Z, N - 1);
            }
            P === "<" && !(h.sawRoot && h.closedRoot && !h.strict) ? (h.state = b.OPEN_WAKA, h.startTagPosition = h.position) : (!C(P) && (!h.sawRoot || h.closedRoot) && x(h, "Text data outside of root node."), P === "&" ? h.state = b.TEXT_ENTITY : h.textNode += P);
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
            else if (!C(P)) if (W(_, P))
              h.state = b.OPEN_TAG, h.tagName = P;
            else if (P === "/")
              h.state = b.CLOSE_TAG, h.tagName = "";
            else if (P === "?")
              h.state = b.PROC_INST, h.procInstName = h.procInstBody = "";
            else {
              if (x(h, "Unencoded <"), h.startTagPosition + 1 < h.position) {
                var he = h.position - h.startTagPosition;
                P = new Array(he).join(" ") + P;
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
            ), h.doctype = "", h.sgmlDecl = "") : P === ">" ? (H(h, "onsgmldeclaration", h.sgmlDecl), h.sgmlDecl = "", h.state = b.TEXT) : (M(P) && (h.state = b.SGML_DECL_QUOTED), h.sgmlDecl += P);
            continue;
          case b.SGML_DECL_QUOTED:
            P === h.q && (h.state = b.SGML_DECL, h.q = ""), h.sgmlDecl += P;
            continue;
          case b.DOCTYPE:
            P === ">" ? (h.state = b.TEXT, H(h, "ondoctype", h.doctype), h.doctype = !0) : (h.doctype += P, P === "[" ? h.state = b.DOCTYPE_DTD : M(P) && (h.state = b.DOCTYPE_QUOTED, h.q = P));
            continue;
          case b.DOCTYPE_QUOTED:
            h.doctype += P, P === h.q && (h.q = "", h.state = b.DOCTYPE);
            continue;
          case b.DOCTYPE_DTD:
            P === "]" ? (h.doctype += P, h.state = b.DOCTYPE) : P === "<" ? (h.state = b.OPEN_WAKA, h.startTagPosition = h.position) : M(P) ? (h.doctype += P, h.state = b.DOCTYPE_DTD_QUOTED, h.q = P) : h.doctype += P;
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
            P === "?" ? h.state = b.PROC_INST_ENDING : C(P) ? h.state = b.PROC_INST_BODY : h.procInstName += P;
            continue;
          case b.PROC_INST_BODY:
            if (!h.procInstBody && C(P))
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
            W(v, P) ? h.tagName += P : (G(h), P === ">" ? T(h) : P === "/" ? h.state = b.OPEN_TAG_SLASH : (C(P) || x(h, "Invalid character in tag name"), h.state = b.ATTRIB));
            continue;
          case b.OPEN_TAG_SLASH:
            P === ">" ? (T(h, !0), R(h)) : (x(h, "Forward-slash in opening tag not followed by >"), h.state = b.ATTRIB);
            continue;
          case b.ATTRIB:
            if (C(P))
              continue;
            P === ">" ? T(h) : P === "/" ? h.state = b.OPEN_TAG_SLASH : W(_, P) ? (h.attribName = P, h.attribValue = "", h.state = b.ATTRIB_NAME) : x(h, "Invalid attribute name");
            continue;
          case b.ATTRIB_NAME:
            P === "=" ? h.state = b.ATTRIB_VALUE : P === ">" ? (x(h, "Attribute without value"), h.attribValue = h.attribName, k(h), T(h)) : C(P) ? h.state = b.ATTRIB_NAME_SAW_WHITE : W(v, P) ? h.attribName += P : x(h, "Invalid attribute name");
            continue;
          case b.ATTRIB_NAME_SAW_WHITE:
            if (P === "=")
              h.state = b.ATTRIB_VALUE;
            else {
              if (C(P))
                continue;
              x(h, "Attribute without value"), h.tag.attributes[h.attribName] = "", h.attribValue = "", H(h, "onattribute", {
                name: h.attribName,
                value: ""
              }), h.attribName = "", P === ">" ? T(h) : W(_, P) ? (h.attribName = P, h.state = b.ATTRIB_NAME) : (x(h, "Invalid attribute name"), h.state = b.ATTRIB);
            }
            continue;
          case b.ATTRIB_VALUE:
            if (C(P))
              continue;
            M(P) ? (h.q = P, h.state = b.ATTRIB_VALUE_QUOTED) : (h.opt.unquotedAttributeValues || L(h, "Unquoted attribute value"), h.state = b.ATTRIB_VALUE_UNQUOTED, h.attribValue = P);
            continue;
          case b.ATTRIB_VALUE_QUOTED:
            if (P !== h.q) {
              P === "&" ? h.state = b.ATTRIB_VALUE_ENTITY_Q : h.attribValue += P;
              continue;
            }
            k(h), h.q = "", h.state = b.ATTRIB_VALUE_CLOSED;
            continue;
          case b.ATTRIB_VALUE_CLOSED:
            C(P) ? h.state = b.ATTRIB : P === ">" ? T(h) : P === "/" ? h.state = b.OPEN_TAG_SLASH : W(_, P) ? (x(h, "No whitespace between attributes"), h.attribName = P, h.attribValue = "", h.state = b.ATTRIB_NAME) : x(h, "Invalid attribute name");
            continue;
          case b.ATTRIB_VALUE_UNQUOTED:
            if (!X(P)) {
              P === "&" ? h.state = b.ATTRIB_VALUE_ENTITY_U : h.attribValue += P;
              continue;
            }
            k(h), P === ">" ? T(h) : h.state = b.ATTRIB;
            continue;
          case b.CLOSE_TAG:
            if (h.tagName)
              P === ">" ? R(h) : W(v, P) ? h.tagName += P : h.script ? (h.script += "</" + h.tagName, h.tagName = "", h.state = b.SCRIPT) : (C(P) || x(h, "Invalid tagname in closing tag"), h.state = b.CLOSE_TAG_SAW_WHITE);
            else {
              if (C(P))
                continue;
              de(_, P) ? h.script ? (h.script += "</" + P, h.state = b.SCRIPT) : x(h, "Invalid tagname in closing tag.") : h.tagName = P;
            }
            continue;
          case b.CLOSE_TAG_SAW_WHITE:
            if (C(P))
              continue;
            P === ">" ? R(h) : x(h, "Invalid characters in closing tag");
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
              var Ce = O(h);
              h.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(Ce) ? (h.entity = "", h.state = ve, h.write(Ce)) : (h[Ie] += Ce, h.entity = "", h.state = ve);
            } else W(h.entity.length ? I : w, P) ? h.entity += P : (x(h, "Invalid character in entity name"), h[Ie] += "&" + h.entity + P, h.entity = "", h.state = ve);
            continue;
          default:
            throw new Error(h, "Unknown state: " + h.state);
        }
      return h.position >= h.bufferCheckPosition && i(h), h;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var m = String.fromCharCode, h = Math.floor, N = function() {
        var P = 16384, Z = [], he, ve, Ie = -1, Ce = arguments.length;
        if (!Ce)
          return "";
        for (var _t = ""; ++Ie < Ce; ) {
          var Se = Number(arguments[Ie]);
          if (!isFinite(Se) || // `NaN`, `+Infinity`, or `-Infinity`
          Se < 0 || // not a valid Unicode code point
          Se > 1114111 || // not a valid Unicode code point
          h(Se) !== Se)
            throw RangeError("Invalid code point: " + Se);
          Se <= 65535 ? Z.push(Se) : (Se -= 65536, he = (Se >> 10) + 55296, ve = Se % 1024 + 56320, Z.push(he, ve)), (Ie + 1 === Ce || Z.length > P) && (_t += m.apply(null, Z), Z.length = 0);
        }
        return _t;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: N,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = N;
    }();
  })(e);
})(am);
Object.defineProperty(ga, "__esModule", { value: !0 });
ga.XElement = void 0;
ga.parseXml = Dw;
const Cw = am, Ba = ni;
class om {
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
ga.XElement = om;
const Rw = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function Nw(e) {
  return Rw.test(e);
}
function xf(e, t, r) {
  const n = e.name;
  return n === t || r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase();
}
function Dw(e) {
  let t = null;
  const r = Cw.parser(!0, {}), n = [];
  return r.onopentag = (i) => {
    const a = new om(i.name);
    if (a.attributes = i.attributes, t === null)
      t = a;
    else {
      const o = n[n.length - 1];
      o.elements == null && (o.elements = []), o.elements.push(a);
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
  var i = Vo;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var a = ya;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return a.ProgressCallbackTransform;
  } });
  var o = zo;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return o.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return o.githubUrl;
  } });
  var s = ll;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return s.retry;
  } });
  var c = ul;
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
})(Me);
var Ge = {}, fl = {}, kt = {};
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
function cm(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function Yi(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = cm(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Yi.prototype = Object.create(Error.prototype);
Yi.prototype.constructor = Yi;
Yi.prototype.toString = function(t) {
  return this.name + ": " + cm(this, t);
};
var va = Yi, Oi = kt;
function Ms(e, t, r, n, i) {
  var a = "", o = "", s = Math.floor(i / 2) - 1;
  return n - t > s && (a = " ... ", t = n - s + a.length), r - n > s && (o = " ...", r = n + s - o.length), {
    str: a + e.slice(t, r).replace(/\t/g, "→") + o,
    pos: n - t + a.length
    // relative position
  };
}
function js(e, t) {
  return Oi.repeat(" ", t - e.length) + e;
}
function Mw(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], a, o = -1; a = r.exec(e.buffer); )
    i.push(a.index), n.push(a.index + a[0].length), e.position <= a.index && o < 0 && (o = n.length - 2);
  o < 0 && (o = n.length - 1);
  var s = "", c, f, l = Math.min(e.line + t.linesAfter, i.length).toString().length, u = t.maxLength - (t.indent + l + 3);
  for (c = 1; c <= t.linesBefore && !(o - c < 0); c++)
    f = Ms(
      e.buffer,
      n[o - c],
      i[o - c],
      e.position - (n[o] - n[o - c]),
      u
    ), s = Oi.repeat(" ", t.indent) + js((e.line - c + 1).toString(), l) + " | " + f.str + `
` + s;
  for (f = Ms(e.buffer, n[o], i[o], e.position, u), s += Oi.repeat(" ", t.indent) + js((e.line + 1).toString(), l) + " | " + f.str + `
`, s += Oi.repeat("-", t.indent + l + 3 + f.pos) + `^
`, c = 1; c <= t.linesAfter && !(o + c >= i.length); c++)
    f = Ms(
      e.buffer,
      n[o + c],
      i[o + c],
      e.position - (n[o] - n[o + c]),
      u
    ), s += Oi.repeat(" ", t.indent) + js((e.line + c + 1).toString(), l) + " | " + f.str + `
`;
  return s.replace(/\n$/, "");
}
var jw = Mw, Uf = va, Bw = [
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
var ct = Gw, Si = va, Bs = ct;
function Mf(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(a, o) {
      a.tag === n.tag && a.kind === n.kind && a.multi === n.multi && (i = o);
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
  if (t instanceof Bs)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new Si("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(a) {
    if (!(a instanceof Bs))
      throw new Si("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (a.loadKind && a.loadKind !== "scalar")
      throw new Si("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (a.multi)
      throw new Si("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(a) {
    if (!(a instanceof Bs))
      throw new Si("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(Ic.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = Mf(i, "implicit"), i.compiledExplicit = Mf(i, "explicit"), i.compiledTypeMap = Vw(i.compiledImplicit, i.compiledExplicit), i;
};
var lm = Ic, zw = ct, um = new zw("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Ww = ct, fm = new Ww("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), Kw = ct, dm = new Kw("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Yw = lm, hm = new Yw({
  explicit: [
    um,
    fm,
    dm
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
var pm = new Xw("tag:yaml.org,2002:null", {
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
var mm = new eE("tag:yaml.org,2002:bool", {
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
function oE(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function sE(e) {
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
          if (!oE(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!sE(e.charCodeAt(r))) return !1;
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
var ym = new aE("tag:yaml.org,2002:int", {
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
}), gm = kt, dE = ct, hE = new RegExp(
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
  else if (gm.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), yE.test(r) ? r.replace("e", ".e") : r;
}
function vE(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || gm.isNegativeZero(e));
}
var vm = new dE("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: pE,
  construct: mE,
  predicate: vE,
  represent: gE,
  defaultStyle: "lowercase"
}), _m = hm.extend({
  implicit: [
    pm,
    mm,
    ym,
    vm
  ]
}), $m = _m, _E = ct, wm = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Em = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function $E(e) {
  return e === null ? !1 : wm.exec(e) !== null || Em.exec(e) !== null;
}
function wE(e) {
  var t, r, n, i, a, o, s, c = 0, f = null, l, u, d;
  if (t = wm.exec(e), t === null && (t = Em.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (a = +t[4], o = +t[5], s = +t[6], t[7]) {
    for (c = t[7].slice(0, 3); c.length < 3; )
      c += "0";
    c = +c;
  }
  return t[9] && (l = +t[10], u = +(t[11] || 0), f = (l * 60 + u) * 6e4, t[9] === "-" && (f = -f)), d = new Date(Date.UTC(r, n, i, a, o, s, c)), f && d.setTime(d.getTime() - f), d;
}
function EE(e) {
  return e.toISOString();
}
var Sm = new _E("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: $E,
  construct: wE,
  instanceOf: Date,
  represent: EE
}), SE = ct;
function bE(e) {
  return e === "<<" || e === null;
}
var bm = new SE("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: bE
}), PE = ct, dl = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function TE(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, a = dl;
  for (r = 0; r < i; r++)
    if (t = a.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function AE(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, a = dl, o = 0, s = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (s.push(o >> 16 & 255), s.push(o >> 8 & 255), s.push(o & 255)), o = o << 6 | a.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (s.push(o >> 16 & 255), s.push(o >> 8 & 255), s.push(o & 255)) : r === 18 ? (s.push(o >> 10 & 255), s.push(o >> 2 & 255)) : r === 12 && s.push(o >> 4 & 255), new Uint8Array(s);
}
function IE(e) {
  var t = "", r = 0, n, i, a = e.length, o = dl;
  for (n = 0; n < a; n++)
    n % 3 === 0 && n && (t += o[r >> 18 & 63], t += o[r >> 12 & 63], t += o[r >> 6 & 63], t += o[r & 63]), r = (r << 8) + e[n];
  return i = a % 3, i === 0 ? (t += o[r >> 18 & 63], t += o[r >> 12 & 63], t += o[r >> 6 & 63], t += o[r & 63]) : i === 2 ? (t += o[r >> 10 & 63], t += o[r >> 4 & 63], t += o[r << 2 & 63], t += o[64]) : i === 1 && (t += o[r >> 2 & 63], t += o[r << 4 & 63], t += o[64], t += o[64]), t;
}
function OE(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var Pm = new PE("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: TE,
  construct: AE,
  predicate: OE,
  represent: IE
}), CE = ct, RE = Object.prototype.hasOwnProperty, NE = Object.prototype.toString;
function DE(e) {
  if (e === null) return !0;
  var t = [], r, n, i, a, o, s = e;
  for (r = 0, n = s.length; r < n; r += 1) {
    if (i = s[r], o = !1, NE.call(i) !== "[object Object]") return !1;
    for (a in i)
      if (RE.call(i, a))
        if (!o) o = !0;
        else return !1;
    if (!o) return !1;
    if (t.indexOf(a) === -1) t.push(a);
    else return !1;
  }
  return !0;
}
function kE(e) {
  return e !== null ? e : [];
}
var Tm = new CE("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: DE,
  construct: kE
}), FE = ct, LE = Object.prototype.toString;
function xE(e) {
  if (e === null) return !0;
  var t, r, n, i, a, o = e;
  for (a = new Array(o.length), t = 0, r = o.length; t < r; t += 1) {
    if (n = o[t], LE.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    a[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function UE(e) {
  if (e === null) return [];
  var t, r, n, i, a, o = e;
  for (a = new Array(o.length), t = 0, r = o.length; t < r; t += 1)
    n = o[t], i = Object.keys(n), a[t] = [i[0], n[i[0]]];
  return a;
}
var Am = new FE("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: xE,
  construct: UE
}), ME = ct, jE = Object.prototype.hasOwnProperty;
function BE(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if (jE.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function qE(e) {
  return e !== null ? e : {};
}
var Im = new ME("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: BE,
  construct: qE
}), hl = $m.extend({
  implicit: [
    Sm,
    bm
  ],
  explicit: [
    Pm,
    Tm,
    Am,
    Im
  ]
}), an = kt, Om = va, HE = jw, GE = hl, Dr = Object.prototype.hasOwnProperty, Po = 1, Cm = 2, Rm = 3, To = 4, qs = 1, VE = 2, jf = 3, zE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, WE = /[\x85\u2028\u2029]/, KE = /[,\[\]\{\}]/, Nm = /^(?:!|!!|![a-z\-]+!)$/i, Dm = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
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
var km = new Array(256), Fm = new Array(256);
for (var Pn = 0; Pn < 256; Pn++)
  km[Pn] = qf(Pn) ? 1 : 0, Fm[Pn] = qf(Pn);
function ZE(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || GE, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Lm(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = HE(r), new Om(t, r);
}
function Y(e, t) {
  throw Lm(e, t);
}
function Ao(e, t) {
  e.onWarning && e.onWarning.call(null, Lm(e, t));
}
var Hf = {
  YAML: function(t, r, n) {
    var i, a, o;
    t.version !== null && Y(t, "duplication of %YAML directive"), n.length !== 1 && Y(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && Y(t, "ill-formed argument of the YAML directive"), a = parseInt(i[1], 10), o = parseInt(i[2], 10), a !== 1 && Y(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = o < 2, o !== 1 && o !== 2 && Ao(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, a;
    n.length !== 2 && Y(t, "TAG directive accepts exactly two arguments"), i = n[0], a = n[1], Nm.test(i) || Y(t, "ill-formed tag handle (first argument) of the TAG directive"), Dr.call(t.tagMap, i) && Y(t, 'there is a previously declared suffix for "' + i + '" tag handle'), Dm.test(a) || Y(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      a = decodeURIComponent(a);
    } catch {
      Y(t, "tag prefix is malformed: " + a);
    }
    t.tagMap[i] = a;
  }
};
function Ir(e, t, r, n) {
  var i, a, o, s;
  if (t < r) {
    if (s = e.input.slice(t, r), n)
      for (i = 0, a = s.length; i < a; i += 1)
        o = s.charCodeAt(i), o === 9 || 32 <= o && o <= 1114111 || Y(e, "expected valid JSON character");
    else zE.test(s) && Y(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function Gf(e, t, r, n) {
  var i, a, o, s;
  for (an.isObject(r) || Y(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), o = 0, s = i.length; o < s; o += 1)
    a = i[o], Dr.call(t, a) || (t[a] = r[a], n[a] = !0);
}
function Un(e, t, r, n, i, a, o, s, c) {
  var f, l;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), f = 0, l = i.length; f < l; f += 1)
      Array.isArray(i[f]) && Y(e, "nested arrays are not supported inside keys"), typeof i == "object" && Bf(i[f]) === "[object Object]" && (i[f] = "[object Object]");
  if (typeof i == "object" && Bf(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(a))
      for (f = 0, l = a.length; f < l; f += 1)
        Gf(e, t, a[f], r);
    else
      Gf(e, t, a, r);
  else
    !e.json && !Dr.call(r, i) && Dr.call(t, i) && (e.line = o || e.line, e.lineStart = s || e.lineStart, e.position = c || e.position, Y(e, "duplicated mapping key")), i === "__proto__" ? Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: a
    }) : t[i] = a, delete r[i];
  return t;
}
function pl(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : Y(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function Re(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; dn(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (qt(i))
      for (pl(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && Ao(e, "deficient indentation"), n;
}
function Wo(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || ht(r)));
}
function ml(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += an.repeat(`
`, t - 1));
}
function eS(e, t, r) {
  var n, i, a, o, s, c, f, l, u = e.kind, d = e.result, p;
  if (p = e.input.charCodeAt(e.position), ht(p) || xn(p) || p === 35 || p === 38 || p === 42 || p === 33 || p === 124 || p === 62 || p === 39 || p === 34 || p === 37 || p === 64 || p === 96 || (p === 63 || p === 45) && (i = e.input.charCodeAt(e.position + 1), ht(i) || r && xn(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", a = o = e.position, s = !1; p !== 0; ) {
    if (p === 58) {
      if (i = e.input.charCodeAt(e.position + 1), ht(i) || r && xn(i))
        break;
    } else if (p === 35) {
      if (n = e.input.charCodeAt(e.position - 1), ht(n))
        break;
    } else {
      if (e.position === e.lineStart && Wo(e) || r && xn(p))
        break;
      if (qt(p))
        if (c = e.line, f = e.lineStart, l = e.lineIndent, Re(e, !1, -1), e.lineIndent >= t) {
          s = !0, p = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = o, e.line = c, e.lineStart = f, e.lineIndent = l;
          break;
        }
    }
    s && (Ir(e, a, o, !1), ml(e, e.line - c), a = o = e.position, s = !1), dn(p) || (o = e.position + 1), p = e.input.charCodeAt(++e.position);
  }
  return Ir(e, a, o, !1), e.result ? !0 : (e.kind = u, e.result = d, !1);
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
    else qt(r) ? (Ir(e, n, i, !0), ml(e, Re(e, !1, t)), n = i = e.position) : e.position === e.lineStart && Wo(e) ? Y(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  Y(e, "unexpected end of the stream within a single quoted scalar");
}
function rS(e, t) {
  var r, n, i, a, o, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return Ir(e, r, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (Ir(e, r, e.position, !0), s = e.input.charCodeAt(++e.position), qt(s))
        Re(e, !1, t);
      else if (s < 256 && km[s])
        e.result += Fm[s], e.position++;
      else if ((o = XE(s)) > 0) {
        for (i = o, a = 0; i > 0; i--)
          s = e.input.charCodeAt(++e.position), (o = YE(s)) >= 0 ? a = (a << 4) + o : Y(e, "expected hexadecimal character");
        e.result += QE(a), e.position++;
      } else
        Y(e, "unknown escape sequence");
      r = n = e.position;
    } else qt(s) ? (Ir(e, r, n, !0), ml(e, Re(e, !1, t)), r = n = e.position) : e.position === e.lineStart && Wo(e) ? Y(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  Y(e, "unexpected end of the stream within a double quoted scalar");
}
function nS(e, t) {
  var r = !0, n, i, a, o = e.tag, s, c = e.anchor, f, l, u, d, p, y = /* @__PURE__ */ Object.create(null), g, _, v, w;
  if (w = e.input.charCodeAt(e.position), w === 91)
    l = 93, p = !1, s = [];
  else if (w === 123)
    l = 125, p = !0, s = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), w = e.input.charCodeAt(++e.position); w !== 0; ) {
    if (Re(e, !0, t), w = e.input.charCodeAt(e.position), w === l)
      return e.position++, e.tag = o, e.anchor = c, e.kind = p ? "mapping" : "sequence", e.result = s, !0;
    r ? w === 44 && Y(e, "expected the node content, but found ','") : Y(e, "missed comma between flow collection entries"), _ = g = v = null, u = d = !1, w === 63 && (f = e.input.charCodeAt(e.position + 1), ht(f) && (u = d = !0, e.position++, Re(e, !0, t))), n = e.line, i = e.lineStart, a = e.position, Qn(e, t, Po, !1, !0), _ = e.tag, g = e.result, Re(e, !0, t), w = e.input.charCodeAt(e.position), (d || e.line === n) && w === 58 && (u = !0, w = e.input.charCodeAt(++e.position), Re(e, !0, t), Qn(e, t, Po, !1, !0), v = e.result), p ? Un(e, s, y, _, g, v, n, i, a) : u ? s.push(Un(e, null, y, _, g, v, n, i, a)) : s.push(g), Re(e, !0, t), w = e.input.charCodeAt(e.position), w === 44 ? (r = !0, w = e.input.charCodeAt(++e.position)) : r = !1;
  }
  Y(e, "unexpected end of the stream within a flow collection");
}
function iS(e, t) {
  var r, n, i = qs, a = !1, o = !1, s = t, c = 0, f = !1, l, u;
  if (u = e.input.charCodeAt(e.position), u === 124)
    n = !1;
  else if (u === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; u !== 0; )
    if (u = e.input.charCodeAt(++e.position), u === 43 || u === 45)
      qs === i ? i = u === 43 ? jf : VE : Y(e, "repeat of a chomping mode identifier");
    else if ((l = JE(u)) >= 0)
      l === 0 ? Y(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? Y(e, "repeat of an indentation width identifier") : (s = t + l - 1, o = !0);
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
    for (pl(e), e.lineIndent = 0, u = e.input.charCodeAt(e.position); (!o || e.lineIndent < s) && u === 32; )
      e.lineIndent++, u = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > s && (s = e.lineIndent), qt(u)) {
      c++;
      continue;
    }
    if (e.lineIndent < s) {
      i === jf ? e.result += an.repeat(`
`, a ? 1 + c : c) : i === qs && a && (e.result += `
`);
      break;
    }
    for (n ? dn(u) ? (f = !0, e.result += an.repeat(`
`, a ? 1 + c : c)) : f ? (f = !1, e.result += an.repeat(`
`, c + 1)) : c === 0 ? a && (e.result += " ") : e.result += an.repeat(`
`, c) : e.result += an.repeat(`
`, a ? 1 + c : c), a = !0, o = !0, c = 0, r = e.position; !qt(u) && u !== 0; )
      u = e.input.charCodeAt(++e.position);
    Ir(e, r, e.position, !1);
  }
  return !0;
}
function Vf(e, t) {
  var r, n = e.tag, i = e.anchor, a = [], o, s = !1, c;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), c = e.input.charCodeAt(e.position); c !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, Y(e, "tab characters must not be used in indentation")), !(c !== 45 || (o = e.input.charCodeAt(e.position + 1), !ht(o)))); ) {
    if (s = !0, e.position++, Re(e, !0, -1) && e.lineIndent <= t) {
      a.push(null), c = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, Qn(e, t, Rm, !1, !0), a.push(e.result), Re(e, !0, -1), c = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && c !== 0)
      Y(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return s ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = a, !0) : !1;
}
function aS(e, t, r) {
  var n, i, a, o, s, c, f = e.tag, l = e.anchor, u = {}, d = /* @__PURE__ */ Object.create(null), p = null, y = null, g = null, _ = !1, v = !1, w;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), w = e.input.charCodeAt(e.position); w !== 0; ) {
    if (!_ && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, Y(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), a = e.line, (w === 63 || w === 58) && ht(n))
      w === 63 ? (_ && (Un(e, u, d, p, y, null, o, s, c), p = y = g = null), v = !0, _ = !0, i = !0) : _ ? (_ = !1, i = !0) : Y(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, w = n;
    else {
      if (o = e.line, s = e.lineStart, c = e.position, !Qn(e, r, Cm, !1, !0))
        break;
      if (e.line === a) {
        for (w = e.input.charCodeAt(e.position); dn(w); )
          w = e.input.charCodeAt(++e.position);
        if (w === 58)
          w = e.input.charCodeAt(++e.position), ht(w) || Y(e, "a whitespace character is expected after the key-value separator within a block mapping"), _ && (Un(e, u, d, p, y, null, o, s, c), p = y = g = null), v = !0, _ = !1, i = !1, p = e.tag, y = e.result;
        else if (v)
          Y(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = f, e.anchor = l, !0;
      } else if (v)
        Y(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = f, e.anchor = l, !0;
    }
    if ((e.line === a || e.lineIndent > t) && (_ && (o = e.line, s = e.lineStart, c = e.position), Qn(e, t, To, !0, i) && (_ ? y = e.result : g = e.result), _ || (Un(e, u, d, p, y, g, o, s, c), p = y = g = null), Re(e, !0, -1), w = e.input.charCodeAt(e.position)), (e.line === a || e.lineIndent > t) && w !== 0)
      Y(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return _ && Un(e, u, d, p, y, null, o, s, c), v && (e.tag = f, e.anchor = l, e.kind = "mapping", e.result = u), v;
}
function oS(e) {
  var t, r = !1, n = !1, i, a, o;
  if (o = e.input.charCodeAt(e.position), o !== 33) return !1;
  if (e.tag !== null && Y(e, "duplication of a tag property"), o = e.input.charCodeAt(++e.position), o === 60 ? (r = !0, o = e.input.charCodeAt(++e.position)) : o === 33 ? (n = !0, i = "!!", o = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      o = e.input.charCodeAt(++e.position);
    while (o !== 0 && o !== 62);
    e.position < e.length ? (a = e.input.slice(t, e.position), o = e.input.charCodeAt(++e.position)) : Y(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; o !== 0 && !ht(o); )
      o === 33 && (n ? Y(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), Nm.test(i) || Y(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), o = e.input.charCodeAt(++e.position);
    a = e.input.slice(t, e.position), KE.test(a) && Y(e, "tag suffix cannot contain flow indicator characters");
  }
  a && !Dm.test(a) && Y(e, "tag name cannot contain such characters: " + a);
  try {
    a = decodeURIComponent(a);
  } catch {
    Y(e, "tag name is malformed: " + a);
  }
  return r ? e.tag = a : Dr.call(e.tagMap, i) ? e.tag = e.tagMap[i] + a : i === "!" ? e.tag = "!" + a : i === "!!" ? e.tag = "tag:yaml.org,2002:" + a : Y(e, 'undeclared tag handle "' + i + '"'), !0;
}
function sS(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && Y(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !ht(r) && !xn(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && Y(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function cS(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !ht(n) && !xn(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && Y(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), Dr.call(e.anchorMap, r) || Y(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], Re(e, !0, -1), !0;
}
function Qn(e, t, r, n, i) {
  var a, o, s, c = 1, f = !1, l = !1, u, d, p, y, g, _;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, a = o = s = To === r || Rm === r, n && Re(e, !0, -1) && (f = !0, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)), c === 1)
    for (; oS(e) || sS(e); )
      Re(e, !0, -1) ? (f = !0, s = a, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)) : s = !1;
  if (s && (s = f || i), (c === 1 || To === r) && (Po === r || Cm === r ? g = t : g = t + 1, _ = e.position - e.lineStart, c === 1 ? s && (Vf(e, _) || aS(e, _, g)) || nS(e, g) ? l = !0 : (o && iS(e, g) || tS(e, g) || rS(e, g) ? l = !0 : cS(e) ? (l = !0, (e.tag !== null || e.anchor !== null) && Y(e, "alias node should not have any properties")) : eS(e, g, Po === r) && (l = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : c === 0 && (l = s && Vf(e, _))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && Y(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), u = 0, d = e.implicitTypes.length; u < d; u += 1)
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
    y || Y(e, "unknown tag !<" + e.tag + ">"), e.result !== null && y.kind !== e.kind && Y(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + y.kind + '", not "' + e.kind + '"'), y.resolve(e.result, e.tag) ? (e.result = y.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : Y(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || l;
}
function lS(e) {
  var t = e.position, r, n, i, a = !1, o;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (o = e.input.charCodeAt(e.position)) !== 0 && (Re(e, !0, -1), o = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || o !== 37)); ) {
    for (a = !0, o = e.input.charCodeAt(++e.position), r = e.position; o !== 0 && !ht(o); )
      o = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && Y(e, "directive name must not be less than one character in length"); o !== 0; ) {
      for (; dn(o); )
        o = e.input.charCodeAt(++e.position);
      if (o === 35) {
        do
          o = e.input.charCodeAt(++e.position);
        while (o !== 0 && !qt(o));
        break;
      }
      if (qt(o)) break;
      for (r = e.position; o !== 0 && !ht(o); )
        o = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    o !== 0 && pl(e), Dr.call(Hf, n) ? Hf[n](e, n, i) : Ao(e, 'unknown document directive "' + n + '"');
  }
  if (Re(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, Re(e, !0, -1)) : a && Y(e, "directives end mark is expected"), Qn(e, e.lineIndent - 1, To, !1, !0), Re(e, !0, -1), e.checkLineBreaks && WE.test(e.input.slice(t, e.position)) && Ao(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Wo(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, Re(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    Y(e, "end of the stream or a document separator is expected");
  else
    return;
}
function xm(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new ZE(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, Y(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    lS(r);
  return r.documents;
}
function uS(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = xm(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, a = n.length; i < a; i += 1)
    t(n[i]);
}
function fS(e, t) {
  var r = xm(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new Om("expected a single document in the stream, but found more");
  }
}
fl.loadAll = uS;
fl.load = fS;
var Um = {}, Ko = kt, _a = va, dS = hl, Mm = Object.prototype.toString, jm = Object.prototype.hasOwnProperty, yl = 65279, hS = 9, Xi = 10, pS = 13, mS = 32, yS = 33, gS = 34, Oc = 35, vS = 37, _S = 38, $S = 39, wS = 42, Bm = 44, ES = 45, Io = 58, SS = 61, bS = 62, PS = 63, TS = 64, qm = 91, Hm = 93, AS = 96, Gm = 123, IS = 124, Vm = 125, Qe = {};
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
], CS = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function RS(e, t) {
  var r, n, i, a, o, s, c;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, a = n.length; i < a; i += 1)
    o = n[i], s = String(t[o]), o.slice(0, 2) === "!!" && (o = "tag:yaml.org,2002:" + o.slice(2)), c = e.compiledTypeMap.fallback[o], c && jm.call(c.styleAliases, s) && (s = c.styleAliases[s]), r[o] = s;
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
  return "\\" + r + Ko.repeat("0", n - t.length) + t;
}
var DS = 1, Ji = 2;
function kS(e) {
  this.schema = e.schema || dS, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = Ko.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = RS(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Ji : DS, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function zf(e, t) {
  for (var r = Ko.repeat(" ", t), n = 0, i = -1, a = "", o, s = e.length; n < s; )
    i = e.indexOf(`
`, n), i === -1 ? (o = e.slice(n), n = s) : (o = e.slice(n, i + 1), n = i + 1), o.length && o !== `
` && (a += r), a += o;
  return a;
}
function Cc(e, t) {
  return `
` + Ko.repeat(" ", e.indent * t);
}
function FS(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function Oo(e) {
  return e === mS || e === hS;
}
function Qi(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== yl || 65536 <= e && e <= 1114111;
}
function Wf(e) {
  return Qi(e) && e !== yl && e !== pS && e !== Xi;
}
function Kf(e, t, r) {
  var n = Wf(e), i = n && !Oo(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== Bm && e !== qm && e !== Hm && e !== Gm && e !== Vm) && e !== Oc && !(t === Io && !i) || Wf(t) && !Oo(t) && e === Oc || t === Io && i
  );
}
function LS(e) {
  return Qi(e) && e !== yl && !Oo(e) && e !== ES && e !== PS && e !== Io && e !== Bm && e !== qm && e !== Hm && e !== Gm && e !== Vm && e !== Oc && e !== _S && e !== wS && e !== yS && e !== IS && e !== SS && e !== bS && e !== $S && e !== gS && e !== vS && e !== TS && e !== AS;
}
function xS(e) {
  return !Oo(e) && e !== Io;
}
function Ci(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function zm(e) {
  var t = /^\n* /;
  return t.test(e);
}
var Wm = 1, Rc = 2, Km = 3, Ym = 4, Fn = 5;
function US(e, t, r, n, i, a, o, s) {
  var c, f = 0, l = null, u = !1, d = !1, p = n !== -1, y = -1, g = LS(Ci(e, 0)) && xS(Ci(e, e.length - 1));
  if (t || o)
    for (c = 0; c < e.length; f >= 65536 ? c += 2 : c++) {
      if (f = Ci(e, c), !Qi(f))
        return Fn;
      g = g && Kf(f, l, s), l = f;
    }
  else {
    for (c = 0; c < e.length; f >= 65536 ? c += 2 : c++) {
      if (f = Ci(e, c), f === Xi)
        u = !0, p && (d = d || // Foldable line = too long, and not more-indented.
        c - y - 1 > n && e[y + 1] !== " ", y = c);
      else if (!Qi(f))
        return Fn;
      g = g && Kf(f, l, s), l = f;
    }
    d = d || p && c - y - 1 > n && e[y + 1] !== " ";
  }
  return !u && !d ? g && !o && !i(e) ? Wm : a === Ji ? Fn : Rc : r > 9 && zm(e) ? Fn : o ? a === Ji ? Fn : Rc : d ? Ym : Km;
}
function MS(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Ji ? '""' : "''";
    if (!e.noCompatMode && (OS.indexOf(t) !== -1 || CS.test(t)))
      return e.quotingType === Ji ? '"' + t + '"' : "'" + t + "'";
    var a = e.indent * Math.max(1, r), o = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - a), s = n || e.flowLevel > -1 && r >= e.flowLevel;
    function c(f) {
      return FS(e, f);
    }
    switch (US(
      t,
      s,
      e.indent,
      o,
      c,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case Wm:
        return t;
      case Rc:
        return "'" + t.replace(/'/g, "''") + "'";
      case Km:
        return "|" + Yf(t, e.indent) + Xf(zf(t, a));
      case Ym:
        return ">" + Yf(t, e.indent) + Xf(zf(jS(t, o), a));
      case Fn:
        return '"' + BS(t) + '"';
      default:
        throw new _a("impossible error: invalid scalar style");
    }
  }();
}
function Yf(e, t) {
  var r = zm(e) ? String(t) : "", n = e[e.length - 1] === `
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
function jS(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, r.lastIndex = f, Jf(e.slice(0, f), t);
  }(), i = e[0] === `
` || e[0] === " ", a, o; o = r.exec(e); ) {
    var s = o[1], c = o[2];
    a = c[0] === " ", n += s + (!i && !a && c !== "" ? `
` : "") + Jf(c, t), i = a;
  }
  return n;
}
function Jf(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, a, o = 0, s = 0, c = ""; n = r.exec(e); )
    s = n.index, s - i > t && (a = o > i ? o : s, c += `
` + e.slice(i, a), i = a + 1), o = s;
  return c += `
`, e.length - i > t && o > i ? c += e.slice(i, o) + `
` + e.slice(o + 1) : c += e.slice(i), c.slice(1);
}
function BS(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = Ci(e, i), n = Qe[r], !n && Qi(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || NS(r);
  return t;
}
function qS(e, t, r) {
  var n = "", i = e.tag, a, o, s;
  for (a = 0, o = r.length; a < o; a += 1)
    s = r[a], e.replacer && (s = e.replacer.call(r, String(a), s)), (rr(e, t, s, !1, !1) || typeof s > "u" && rr(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function Qf(e, t, r, n) {
  var i = "", a = e.tag, o, s, c;
  for (o = 0, s = r.length; o < s; o += 1)
    c = r[o], e.replacer && (c = e.replacer.call(r, String(o), c)), (rr(e, t + 1, c, !0, !0, !1, !0) || typeof c > "u" && rr(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += Cc(e, t)), e.dump && Xi === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = a, e.dump = i || "[]";
}
function HS(e, t, r) {
  var n = "", i = e.tag, a = Object.keys(r), o, s, c, f, l;
  for (o = 0, s = a.length; o < s; o += 1)
    l = "", n !== "" && (l += ", "), e.condenseFlow && (l += '"'), c = a[o], f = r[c], e.replacer && (f = e.replacer.call(r, c, f)), rr(e, t, c, !1, !1) && (e.dump.length > 1024 && (l += "? "), l += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), rr(e, t, f, !1, !1) && (l += e.dump, n += l));
  e.tag = i, e.dump = "{" + n + "}";
}
function GS(e, t, r, n) {
  var i = "", a = e.tag, o = Object.keys(r), s, c, f, l, u, d;
  if (e.sortKeys === !0)
    o.sort();
  else if (typeof e.sortKeys == "function")
    o.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new _a("sortKeys must be a boolean or a function");
  for (s = 0, c = o.length; s < c; s += 1)
    d = "", (!n || i !== "") && (d += Cc(e, t)), f = o[s], l = r[f], e.replacer && (l = e.replacer.call(r, f, l)), rr(e, t + 1, f, !0, !0, !0) && (u = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, u && (e.dump && Xi === e.dump.charCodeAt(0) ? d += "?" : d += "? "), d += e.dump, u && (d += Cc(e, t)), rr(e, t + 1, l, !0, u) && (e.dump && Xi === e.dump.charCodeAt(0) ? d += ":" : d += ": ", d += e.dump, i += d));
  e.tag = a, e.dump = i || "{}";
}
function Zf(e, t, r) {
  var n, i, a, o, s, c;
  for (i = r ? e.explicitTypes : e.implicitTypes, a = 0, o = i.length; a < o; a += 1)
    if (s = i[a], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (r ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        if (c = e.styleMap[s.tag] || s.defaultStyle, Mm.call(s.represent) === "[object Function]")
          n = s.represent(t, c);
        else if (jm.call(s.represent, c))
          n = s.represent[c](t, c);
        else
          throw new _a("!<" + s.tag + '> tag resolver accepts not "' + c + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function rr(e, t, r, n, i, a, o) {
  e.tag = null, e.dump = r, Zf(e, r, !1) || Zf(e, r, !0);
  var s = Mm.call(e.dump), c = n, f;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var l = s === "[object Object]" || s === "[object Array]", u, d;
  if (l && (u = e.duplicates.indexOf(r), d = u !== -1), (e.tag !== null && e.tag !== "?" || d || e.indent !== 2 && t > 0) && (i = !1), d && e.usedDuplicates[u])
    e.dump = "*ref_" + u;
  else {
    if (l && d && !e.usedDuplicates[u] && (e.usedDuplicates[u] = !0), s === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (GS(e, t, e.dump, i), d && (e.dump = "&ref_" + u + e.dump)) : (HS(e, t, e.dump), d && (e.dump = "&ref_" + u + " " + e.dump));
    else if (s === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !o && t > 0 ? Qf(e, t - 1, e.dump, i) : Qf(e, t, e.dump, i), d && (e.dump = "&ref_" + u + e.dump)) : (qS(e, t, e.dump), d && (e.dump = "&ref_" + u + " " + e.dump));
    else if (s === "[object String]")
      e.tag !== "?" && MS(e, e.dump, t, a, c);
    else {
      if (s === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new _a("unacceptable kind of an object to dump " + s);
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
Um.dump = zS;
var Xm = fl, WS = Um;
function gl(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
Ge.Type = ct;
Ge.Schema = lm;
Ge.FAILSAFE_SCHEMA = hm;
Ge.JSON_SCHEMA = _m;
Ge.CORE_SCHEMA = $m;
Ge.DEFAULT_SCHEMA = hl;
Ge.load = Xm.load;
Ge.loadAll = Xm.loadAll;
Ge.dump = WS.dump;
Ge.YAMLException = va;
Ge.types = {
  binary: Pm,
  float: vm,
  map: dm,
  null: pm,
  pairs: Am,
  set: Im,
  timestamp: Sm,
  bool: mm,
  int: ym,
  merge: bm,
  omap: Tm,
  seq: fm,
  str: um
};
Ge.safeLoad = gl("safeLoad", "load");
Ge.safeLoadAll = gl("safeLoadAll", "loadAll");
Ge.safeDump = gl("safeDump", "dump");
var Yo = {};
Object.defineProperty(Yo, "__esModule", { value: !0 });
Yo.Lazy = void 0;
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
Yo.Lazy = KS;
var Dc = { exports: {} };
const YS = "2.0.0", Jm = 256, XS = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, JS = 16, QS = Jm - 6, ZS = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Xo = {
  MAX_LENGTH: Jm,
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
var Jo = e1;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = Xo, a = Jo;
  t = e.exports = {};
  const o = t.re = [], s = t.safeRe = [], c = t.src = [], f = t.safeSrc = [], l = t.t = {};
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
    const I = y(v), C = u++;
    a(_, C, v), l[_] = C, c[C] = v, f[C] = I, o[C] = new RegExp(v, w ? "g" : void 0), s[C] = new RegExp(I, w ? "g" : void 0);
  };
  g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${d}*`), g("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${d}+`), g("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), g("FULL", `^${c[l.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), g("LOOSE", `^${c[l.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), g("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), g("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", c[l.COERCE], !0), g("COERCERTLFULL", c[l.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", g("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", g("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Dc, Dc.exports);
var $a = Dc.exports;
const t1 = Object.freeze({ loose: !0 }), r1 = Object.freeze({}), n1 = (e) => e ? typeof e != "object" ? t1 : e : r1;
var vl = n1;
const ed = /^[0-9]+$/, Qm = (e, t) => {
  const r = ed.test(e), n = ed.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, i1 = (e, t) => Qm(t, e);
var Zm = {
  compareIdentifiers: Qm,
  rcompareIdentifiers: i1
};
const qa = Jo, { MAX_LENGTH: td, MAX_SAFE_INTEGER: Ha } = Xo, { safeRe: Ga, t: Va } = $a, a1 = vl, { compareIdentifiers: Tn } = Zm;
let o1 = class xt {
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
var lt = o1;
const rd = lt, s1 = (e, t, r = !1) => {
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
var ii = s1;
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
  const a = i > 0, o = a ? r : n, s = a ? n : r, c = !!o.prerelease.length;
  if (!!s.prerelease.length && !c) {
    if (!s.patch && !s.minor)
      return "major";
    if (s.compareMain(o) === 0)
      return s.minor && !s.patch ? "minor" : "patch";
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
const ad = lt, C1 = (e, t, r) => new ad(e, r).compare(new ad(t, r));
var Ft = C1;
const R1 = Ft, N1 = (e, t, r) => R1(t, e, r);
var D1 = N1;
const k1 = Ft, F1 = (e, t) => k1(e, t, !0);
var L1 = F1;
const od = lt, x1 = (e, t, r) => {
  const n = new od(e, r), i = new od(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var _l = x1;
const U1 = _l, M1 = (e, t) => e.sort((r, n) => U1(r, n, t));
var j1 = M1;
const B1 = _l, q1 = (e, t) => e.sort((r, n) => B1(n, r, t));
var H1 = q1;
const G1 = Ft, V1 = (e, t, r) => G1(e, t, r) > 0;
var Qo = V1;
const z1 = Ft, W1 = (e, t, r) => z1(e, t, r) < 0;
var $l = W1;
const K1 = Ft, Y1 = (e, t, r) => K1(e, t, r) === 0;
var ey = Y1;
const X1 = Ft, J1 = (e, t, r) => X1(e, t, r) !== 0;
var ty = J1;
const Q1 = Ft, Z1 = (e, t, r) => Q1(e, t, r) >= 0;
var wl = Z1;
const eb = Ft, tb = (e, t, r) => eb(e, t, r) <= 0;
var El = tb;
const rb = ey, nb = ty, ib = Qo, ab = wl, ob = $l, sb = El, cb = (e, t, r, n) => {
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
      return ob(e, r, n);
    case "<=":
      return sb(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var ry = cb;
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
  const n = r[2], i = r[3] || "0", a = r[4] || "0", o = t.includePrerelease && r[5] ? `-${r[5]}` : "", s = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return ub(`${n}.${i}.${a}${o}${s}`, t);
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
var pb = hb, Hs, sd;
function Lt() {
  if (sd) return Hs;
  sd = 1;
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
      L = L.replace(k, H(this.options.includePrerelease)), o("hyphen replace", L), L = L.replace(c[f.COMPARATORTRIM], l), o("comparator trim", L), L = L.replace(c[f.TILDETRIM], u), o("tilde trim", L), L = L.replace(c[f.CARETTRIM], d), o("caret trim", L);
      let T = L.split(" ").map((S) => w(S, this.options)).join(" ").split(/\s+/).map((S) => j(S, this.options));
      B && (T = T.filter((S) => (o("loose invalid filter", S, this.options), !!S.match(c[f.COMPARATORLOOSE])))), o("range list", T);
      const R = /* @__PURE__ */ new Map(), O = T.map((S) => new a(S, this.options));
      for (const S of O) {
        if (g(S))
          return [S];
        R.set(S.value, S);
      }
      R.size > 1 && R.has("") && R.delete("");
      const $ = [...R.values()];
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
          L = new s(L, this.options);
        } catch {
          return !1;
        }
      for (let q = 0; q < this.set.length; q++)
        if (Q(this.set[q], L, this.options))
          return !0;
      return !1;
    }
  }
  Hs = t;
  const r = pb, n = new r(), i = vl, a = Zo(), o = Jo, s = lt, {
    safeRe: c,
    t: f,
    comparatorTrimReplace: l,
    tildeTrimReplace: u,
    caretTrimReplace: d
  } = $a, { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: y } = Xo, g = (F) => F.value === "<0.0.0-0", _ = (F) => F.value === "", v = (F, L) => {
    let q = !0;
    const x = F.slice();
    let G = x.pop();
    for (; q && x.length; )
      q = x.every((B) => G.intersects(B, L)), G = x.pop();
    return q;
  }, w = (F, L) => (o("comp", F, L), F = X(F, L), o("caret", F), F = C(F, L), o("tildes", F), F = de(F, L), o("xrange", F), F = J(F, L), o("stars", F), F), I = (F) => !F || F.toLowerCase() === "x" || F === "*", C = (F, L) => F.trim().split(/\s+/).map((q) => M(q, L)).join(" "), M = (F, L) => {
    const q = L.loose ? c[f.TILDELOOSE] : c[f.TILDE];
    return F.replace(q, (x, G, B, k, T) => {
      o("tilde", F, x, G, B, k, T);
      let R;
      return I(G) ? R = "" : I(B) ? R = `>=${G}.0.0 <${+G + 1}.0.0-0` : I(k) ? R = `>=${G}.${B}.0 <${G}.${+B + 1}.0-0` : T ? (o("replaceTilde pr", T), R = `>=${G}.${B}.${k}-${T} <${G}.${+B + 1}.0-0`) : R = `>=${G}.${B}.${k} <${G}.${+B + 1}.0-0`, o("tilde return", R), R;
    });
  }, X = (F, L) => F.trim().split(/\s+/).map((q) => W(q, L)).join(" "), W = (F, L) => {
    o("caret", F, L);
    const q = L.loose ? c[f.CARETLOOSE] : c[f.CARET], x = L.includePrerelease ? "-0" : "";
    return F.replace(q, (G, B, k, T, R) => {
      o("caret", F, G, B, k, T, R);
      let O;
      return I(B) ? O = "" : I(k) ? O = `>=${B}.0.0${x} <${+B + 1}.0.0-0` : I(T) ? B === "0" ? O = `>=${B}.${k}.0${x} <${B}.${+k + 1}.0-0` : O = `>=${B}.${k}.0${x} <${+B + 1}.0.0-0` : R ? (o("replaceCaret pr", R), B === "0" ? k === "0" ? O = `>=${B}.${k}.${T}-${R} <${B}.${k}.${+T + 1}-0` : O = `>=${B}.${k}.${T}-${R} <${B}.${+k + 1}.0-0` : O = `>=${B}.${k}.${T}-${R} <${+B + 1}.0.0-0`) : (o("no pr"), B === "0" ? k === "0" ? O = `>=${B}.${k}.${T}${x} <${B}.${k}.${+T + 1}-0` : O = `>=${B}.${k}.${T}${x} <${B}.${+k + 1}.0-0` : O = `>=${B}.${k}.${T} <${+B + 1}.0.0-0`), o("caret return", O), O;
    });
  }, de = (F, L) => (o("replaceXRanges", F, L), F.split(/\s+/).map((q) => b(q, L)).join(" ")), b = (F, L) => {
    F = F.trim();
    const q = L.loose ? c[f.XRANGELOOSE] : c[f.XRANGE];
    return F.replace(q, (x, G, B, k, T, R) => {
      o("xRange", F, x, G, B, k, T, R);
      const O = I(B), $ = O || I(k), S = $ || I(T), D = S;
      return G === "=" && D && (G = ""), R = L.includePrerelease ? "-0" : "", O ? G === ">" || G === "<" ? x = "<0.0.0-0" : x = "*" : G && D ? ($ && (k = 0), T = 0, G === ">" ? (G = ">=", $ ? (B = +B + 1, k = 0, T = 0) : (k = +k + 1, T = 0)) : G === "<=" && (G = "<", $ ? B = +B + 1 : k = +k + 1), G === "<" && (R = "-0"), x = `${G + B}.${k}.${T}${R}`) : $ ? x = `>=${B}.0.0${R} <${+B + 1}.0.0-0` : S && (x = `>=${B}.${k}.0${R} <${B}.${+k + 1}.0-0`), o("xRange return", x), x;
    });
  }, J = (F, L) => (o("replaceStars", F, L), F.trim().replace(c[f.STAR], "")), j = (F, L) => (o("replaceGTE0", F, L), F.trim().replace(c[L.includePrerelease ? f.GTE0PRE : f.GTE0], "")), H = (F) => (L, q, x, G, B, k, T, R, O, $, S, D) => (I(x) ? q = "" : I(G) ? q = `>=${x}.0.0${F ? "-0" : ""}` : I(B) ? q = `>=${x}.${G}.0${F ? "-0" : ""}` : k ? q = `>=${q}` : q = `>=${q}${F ? "-0" : ""}`, I(O) ? R = "" : I($) ? R = `<${+O + 1}.0.0-0` : I(S) ? R = `<${O}.${+$ + 1}.0-0` : D ? R = `<=${O}.${$}.${S}-${D}` : F ? R = `<${O}.${$}.${+S + 1}-0` : R = `<=${R}`, `${q} ${R}`.trim()), Q = (F, L, q) => {
    for (let x = 0; x < F.length; x++)
      if (!F[x].test(L))
        return !1;
    if (L.prerelease.length && !q.includePrerelease) {
      for (let x = 0; x < F.length; x++)
        if (o(F[x].semver), F[x].semver !== a.ANY && F[x].semver.prerelease.length > 0) {
          const G = F[x].semver;
          if (G.major === L.major && G.minor === L.minor && G.patch === L.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Hs;
}
var Gs, cd;
function Zo() {
  if (cd) return Gs;
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
      l = l.trim().split(/\s+/).join(" "), o("comparator", l, u), this.options = u, this.loose = !!u.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, o("comp", this);
    }
    parse(l) {
      const u = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], d = l.match(u);
      if (!d)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = d[1] !== void 0 ? d[1] : "", this.operator === "=" && (this.operator = ""), d[2] ? this.semver = new s(d[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (o("Comparator.test", l, this.options.loose), this.semver === e || l === e)
        return !0;
      if (typeof l == "string")
        try {
          l = new s(l, this.options);
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
  Gs = t;
  const r = vl, { safeRe: n, t: i } = $a, a = ry, o = Jo, s = lt, c = Lt();
  return Gs;
}
const mb = Lt(), yb = (e, t, r) => {
  try {
    t = new mb(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var es = yb;
const gb = Lt(), vb = (e, t) => new gb(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var _b = vb;
const $b = lt, wb = Lt(), Eb = (e, t, r) => {
  let n = null, i = null, a = null;
  try {
    a = new wb(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    a.test(o) && (!n || i.compare(o) === -1) && (n = o, i = new $b(n, r));
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
  return e.forEach((o) => {
    a.test(o) && (!n || i.compare(o) === 1) && (n = o, i = new bb(n, r));
  }), n;
};
var Ab = Tb;
const Vs = lt, Ib = Lt(), ld = Qo, Ob = (e, t) => {
  e = new Ib(e, t);
  let r = new Vs("0.0.0");
  if (e.test(r) || (r = new Vs("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let a = null;
    i.forEach((o) => {
      const s = new Vs(o.semver.version);
      switch (o.operator) {
        case ">":
          s.prerelease.length === 0 ? s.patch++ : s.prerelease.push(0), s.raw = s.format();
        case "":
        case ">=":
          (!a || ld(s, a)) && (a = s);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${o.operator}`);
      }
    }), a && (!r || ld(r, a)) && (r = a);
  }
  return r && e.test(r) ? r : null;
};
var Cb = Ob;
const Rb = Lt(), Nb = (e, t) => {
  try {
    return new Rb(e, t).range || "*";
  } catch {
    return null;
  }
};
var Db = Nb;
const kb = lt, ny = Zo(), { ANY: Fb } = ny, Lb = Lt(), xb = es, ud = Qo, fd = $l, Ub = El, Mb = wl, jb = (e, t, r, n) => {
  e = new kb(e, n), t = new Lb(t, n);
  let i, a, o, s, c;
  switch (r) {
    case ">":
      i = ud, a = Ub, o = fd, s = ">", c = ">=";
      break;
    case "<":
      i = fd, a = Mb, o = ud, s = "<", c = "<=";
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
      p.semver === Fb && (p = new ny(">=0.0.0")), u = u || p, d = d || p, i(p.semver, u.semver, n) ? u = p : o(p.semver, d.semver, n) && (d = p);
    }), u.operator === s || u.operator === c || (!d.operator || d.operator === s) && a(e, d.semver))
      return !1;
    if (d.operator === c && o(e, d.semver))
      return !1;
  }
  return !0;
};
var Sl = jb;
const Bb = Sl, qb = (e, t, r) => Bb(e, t, ">", r);
var Hb = qb;
const Gb = Sl, Vb = (e, t, r) => Gb(e, t, "<", r);
var zb = Vb;
const dd = Lt(), Wb = (e, t, r) => (e = new dd(e, r), t = new dd(t, r), e.intersects(t, r));
var Kb = Wb;
const Yb = es, Xb = Ft;
var Jb = (e, t, r) => {
  const n = [];
  let i = null, a = null;
  const o = e.sort((l, u) => Xb(l, u, r));
  for (const l of o)
    Yb(l, t, r) ? (a = l, i || (i = l)) : (a && n.push([i, a]), a = null, i = null);
  i && n.push([i, null]);
  const s = [];
  for (const [l, u] of n)
    l === u ? s.push(l) : !u && l === o[0] ? s.push("*") : u ? l === o[0] ? s.push(`<=${u}`) : s.push(`${l} - ${u}`) : s.push(`>=${l}`);
  const c = s.join(" || "), f = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < f.length ? c : t;
};
const hd = Lt(), bl = Zo(), { ANY: zs } = bl, bi = es, Pl = Ft, Qb = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new hd(e, r), t = new hd(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const a of t.set) {
      const o = eP(i, a, r);
      if (n = n || o !== null, o)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, Zb = [new bl(">=0.0.0-0")], pd = [new bl(">=0.0.0")], eP = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === zs) {
    if (t.length === 1 && t[0].semver === zs)
      return !0;
    r.includePrerelease ? e = Zb : e = pd;
  }
  if (t.length === 1 && t[0].semver === zs) {
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
  let o;
  if (i && a) {
    if (o = Pl(i.semver, a.semver, r), o > 0)
      return null;
    if (o === 0 && (i.operator !== ">=" || a.operator !== "<="))
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
  let s, c, f, l, u = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, d = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  u && u.prerelease.length === 1 && a.operator === "<" && u.prerelease[0] === 0 && (u = !1);
  for (const p of t) {
    if (l = l || p.operator === ">" || p.operator === ">=", f = f || p.operator === "<" || p.operator === "<=", i) {
      if (d && p.semver.prerelease && p.semver.prerelease.length && p.semver.major === d.major && p.semver.minor === d.minor && p.semver.patch === d.patch && (d = !1), p.operator === ">" || p.operator === ">=") {
        if (s = md(i, p, r), s === p && s !== i)
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
    if (!p.operator && (a || i) && o !== 0)
      return !1;
  }
  return !(i && f && !a && o !== 0 || a && l && !i && o !== 0 || d || u);
}, md = (e, t, r) => {
  if (!e)
    return t;
  const n = Pl(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, yd = (e, t, r) => {
  if (!e)
    return t;
  const n = Pl(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var tP = Qb;
const Ws = $a, gd = Xo, rP = lt, vd = Zm, nP = ii, iP = u1, aP = h1, oP = m1, sP = g1, cP = $1, lP = S1, uP = T1, fP = O1, dP = Ft, hP = D1, pP = L1, mP = _l, yP = j1, gP = H1, vP = Qo, _P = $l, $P = ey, wP = ty, EP = wl, SP = El, bP = ry, PP = db, TP = Zo(), AP = Lt(), IP = es, OP = _b, CP = Sb, RP = Ab, NP = Cb, DP = Db, kP = Sl, FP = Hb, LP = zb, xP = Kb, UP = Jb, MP = tP;
var Tl = {
  parse: nP,
  valid: iP,
  clean: aP,
  inc: oP,
  diff: sP,
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
  maxSatisfying: CP,
  minSatisfying: RP,
  minVersion: NP,
  validRange: DP,
  outside: kP,
  gtr: FP,
  ltr: LP,
  intersects: xP,
  simplifyRange: UP,
  subset: MP,
  SemVer: rP,
  re: Ws.re,
  src: Ws.src,
  tokens: Ws.t,
  SEMVER_SPEC_VERSION: gd.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: gd.RELEASE_TYPES,
  compareIdentifiers: vd.compareIdentifiers,
  rcompareIdentifiers: vd.rcompareIdentifiers
};
const An = /* @__PURE__ */ jo(Tl);
var wa = {}, Co = { exports: {} };
Co.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, a = 2, o = 9007199254740991, s = "[object Arguments]", c = "[object Array]", f = "[object AsyncFunction]", l = "[object Boolean]", u = "[object Date]", d = "[object Error]", p = "[object Function]", y = "[object GeneratorFunction]", g = "[object Map]", _ = "[object Number]", v = "[object Null]", w = "[object Object]", I = "[object Promise]", C = "[object Proxy]", M = "[object RegExp]", X = "[object Set]", W = "[object String]", de = "[object Symbol]", b = "[object Undefined]", J = "[object WeakMap]", j = "[object ArrayBuffer]", H = "[object DataView]", Q = "[object Float32Array]", F = "[object Float64Array]", L = "[object Int8Array]", q = "[object Int16Array]", x = "[object Int32Array]", G = "[object Uint8Array]", B = "[object Uint8ClampedArray]", k = "[object Uint16Array]", T = "[object Uint32Array]", R = /[\\^$.*+?()[\]{}|]/g, O = /^\[object .+?Constructor\]$/, $ = /^(?:0|[1-9]\d*)$/, S = {};
  S[Q] = S[F] = S[L] = S[q] = S[x] = S[G] = S[B] = S[k] = S[T] = !0, S[s] = S[c] = S[j] = S[l] = S[H] = S[u] = S[d] = S[p] = S[g] = S[_] = S[w] = S[M] = S[X] = S[W] = S[J] = !1;
  var D = typeof nt == "object" && nt && nt.Object === Object && nt, m = typeof self == "object" && self && self.Object === Object && self, h = D || m || Function("return this")(), N = t && !t.nodeType && t, P = N && !0 && e && !e.nodeType && e, Z = P && P.exports === N, he = Z && D.process, ve = function() {
    try {
      return he && he.binding && he.binding("util");
    } catch {
    }
  }(), Ie = ve && ve.isTypedArray;
  function Ce(E, A) {
    for (var U = -1, z = E == null ? 0 : E.length, _e = 0, ie = []; ++U < z; ) {
      var Te = E[U];
      A(Te, U, E) && (ie[_e++] = Te);
    }
    return ie;
  }
  function _t(E, A) {
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
  function or(E, A) {
    return E.has(A);
  }
  function Vt(E, A) {
    return E == null ? void 0 : E[A];
  }
  function sr(E) {
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
  var pi = Array.prototype, Vr = Function.prototype, cr = Object.prototype, En = h["__core-js_shared__"], mi = Vr.toString, $t = cr.hasOwnProperty, Mu = function() {
    var E = /[^.]+$/.exec(En && En.keys && En.keys.IE_PROTO || "");
    return E ? "Symbol(src)_1." + E : "";
  }(), ju = cr.toString, pg = RegExp(
    "^" + mi.call($t).replace(R, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Bu = Z ? h.Buffer : void 0, Oa = h.Symbol, qu = h.Uint8Array, Hu = cr.propertyIsEnumerable, mg = pi.splice, zr = Oa ? Oa.toStringTag : void 0, Gu = Object.getOwnPropertySymbols, yg = Bu ? Bu.isBuffer : void 0, gg = di(Object.keys, Object), Ps = Sn(h, "DataView"), yi = Sn(h, "Map"), Ts = Sn(h, "Promise"), As = Sn(h, "Set"), Is = Sn(h, "WeakMap"), gi = Sn(Object, "create"), vg = Yr(Ps), _g = Yr(yi), $g = Yr(Ts), wg = Yr(As), Eg = Yr(Is), Vu = Oa ? Oa.prototype : void 0, Os = Vu ? Vu.valueOf : void 0;
  function Wr(E) {
    var A = -1, U = E == null ? 0 : E.length;
    for (this.clear(); ++A < U; ) {
      var z = E[A];
      this.set(z[0], z[1]);
    }
  }
  function Sg() {
    this.__data__ = gi ? gi(null) : {}, this.size = 0;
  }
  function bg(E) {
    var A = this.has(E) && delete this.__data__[E];
    return this.size -= A ? 1 : 0, A;
  }
  function Pg(E) {
    var A = this.__data__;
    if (gi) {
      var U = A[E];
      return U === n ? void 0 : U;
    }
    return $t.call(A, E) ? A[E] : void 0;
  }
  function Tg(E) {
    var A = this.__data__;
    return gi ? A[E] !== void 0 : $t.call(A, E);
  }
  function Ag(E, A) {
    var U = this.__data__;
    return this.size += this.has(E) ? 0 : 1, U[E] = gi && A === void 0 ? n : A, this;
  }
  Wr.prototype.clear = Sg, Wr.prototype.delete = bg, Wr.prototype.get = Pg, Wr.prototype.has = Tg, Wr.prototype.set = Ag;
  function zt(E) {
    var A = -1, U = E == null ? 0 : E.length;
    for (this.clear(); ++A < U; ) {
      var z = E[A];
      this.set(z[0], z[1]);
    }
  }
  function Ig() {
    this.__data__ = [], this.size = 0;
  }
  function Og(E) {
    var A = this.__data__, U = Ra(A, E);
    if (U < 0)
      return !1;
    var z = A.length - 1;
    return U == z ? A.pop() : mg.call(A, U, 1), --this.size, !0;
  }
  function Cg(E) {
    var A = this.__data__, U = Ra(A, E);
    return U < 0 ? void 0 : A[U][1];
  }
  function Rg(E) {
    return Ra(this.__data__, E) > -1;
  }
  function Ng(E, A) {
    var U = this.__data__, z = Ra(U, E);
    return z < 0 ? (++this.size, U.push([E, A])) : U[z][1] = A, this;
  }
  zt.prototype.clear = Ig, zt.prototype.delete = Og, zt.prototype.get = Cg, zt.prototype.has = Rg, zt.prototype.set = Ng;
  function Kr(E) {
    var A = -1, U = E == null ? 0 : E.length;
    for (this.clear(); ++A < U; ) {
      var z = E[A];
      this.set(z[0], z[1]);
    }
  }
  function Dg() {
    this.size = 0, this.__data__ = {
      hash: new Wr(),
      map: new (yi || zt)(),
      string: new Wr()
    };
  }
  function kg(E) {
    var A = Na(this, E).delete(E);
    return this.size -= A ? 1 : 0, A;
  }
  function Fg(E) {
    return Na(this, E).get(E);
  }
  function Lg(E) {
    return Na(this, E).has(E);
  }
  function xg(E, A) {
    var U = Na(this, E), z = U.size;
    return U.set(E, A), this.size += U.size == z ? 0 : 1, this;
  }
  Kr.prototype.clear = Dg, Kr.prototype.delete = kg, Kr.prototype.get = Fg, Kr.prototype.has = Lg, Kr.prototype.set = xg;
  function Ca(E) {
    var A = -1, U = E == null ? 0 : E.length;
    for (this.__data__ = new Kr(); ++A < U; )
      this.add(E[A]);
  }
  function Ug(E) {
    return this.__data__.set(E, n), this;
  }
  function Mg(E) {
    return this.__data__.has(E);
  }
  Ca.prototype.add = Ca.prototype.push = Ug, Ca.prototype.has = Mg;
  function lr(E) {
    var A = this.__data__ = new zt(E);
    this.size = A.size;
  }
  function jg() {
    this.__data__ = new zt(), this.size = 0;
  }
  function Bg(E) {
    var A = this.__data__, U = A.delete(E);
    return this.size = A.size, U;
  }
  function qg(E) {
    return this.__data__.get(E);
  }
  function Hg(E) {
    return this.__data__.has(E);
  }
  function Gg(E, A) {
    var U = this.__data__;
    if (U instanceof zt) {
      var z = U.__data__;
      if (!yi || z.length < r - 1)
        return z.push([E, A]), this.size = ++U.size, this;
      U = this.__data__ = new Kr(z);
    }
    return U.set(E, A), this.size = U.size, this;
  }
  lr.prototype.clear = jg, lr.prototype.delete = Bg, lr.prototype.get = qg, lr.prototype.has = Hg, lr.prototype.set = Gg;
  function Vg(E, A) {
    var U = Da(E), z = !U && ov(E), _e = !U && !z && Cs(E), ie = !U && !z && !_e && ef(E), Te = U || z || _e || ie, Le = Te ? Ze(E.length, String) : [], je = Le.length;
    for (var be in E)
      $t.call(E, be) && !(Te && // Safari 9 has enumerable `arguments.length` in strict mode.
      (be == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      _e && (be == "offset" || be == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      ie && (be == "buffer" || be == "byteLength" || be == "byteOffset") || // Skip index properties.
      tv(be, je))) && Le.push(be);
    return Le;
  }
  function Ra(E, A) {
    for (var U = E.length; U--; )
      if (Xu(E[U][0], A))
        return U;
    return -1;
  }
  function zg(E, A, U) {
    var z = A(E);
    return Da(E) ? z : _t(z, U(E));
  }
  function vi(E) {
    return E == null ? E === void 0 ? b : v : zr && zr in Object(E) ? Zg(E) : av(E);
  }
  function zu(E) {
    return _i(E) && vi(E) == s;
  }
  function Wu(E, A, U, z, _e) {
    return E === A ? !0 : E == null || A == null || !_i(E) && !_i(A) ? E !== E && A !== A : Wg(E, A, U, z, Wu, _e);
  }
  function Wg(E, A, U, z, _e, ie) {
    var Te = Da(E), Le = Da(A), je = Te ? c : ur(E), be = Le ? c : ur(A);
    je = je == s ? w : je, be = be == s ? w : be;
    var pt = je == w, It = be == w, Ve = je == be;
    if (Ve && Cs(E)) {
      if (!Cs(A))
        return !1;
      Te = !0, pt = !1;
    }
    if (Ve && !pt)
      return ie || (ie = new lr()), Te || ef(E) ? Ku(E, A, U, z, _e, ie) : Jg(E, A, je, U, z, _e, ie);
    if (!(U & i)) {
      var wt = pt && $t.call(E, "__wrapped__"), Et = It && $t.call(A, "__wrapped__");
      if (wt || Et) {
        var fr = wt ? E.value() : E, Wt = Et ? A.value() : A;
        return ie || (ie = new lr()), _e(fr, Wt, U, z, ie);
      }
    }
    return Ve ? (ie || (ie = new lr()), Qg(E, A, U, z, _e, ie)) : !1;
  }
  function Kg(E) {
    if (!Zu(E) || nv(E))
      return !1;
    var A = Ju(E) ? pg : O;
    return A.test(Yr(E));
  }
  function Yg(E) {
    return _i(E) && Qu(E.length) && !!S[vi(E)];
  }
  function Xg(E) {
    if (!iv(E))
      return gg(E);
    var A = [];
    for (var U in Object(E))
      $t.call(E, U) && U != "constructor" && A.push(U);
    return A;
  }
  function Ku(E, A, U, z, _e, ie) {
    var Te = U & i, Le = E.length, je = A.length;
    if (Le != je && !(Te && je > Le))
      return !1;
    var be = ie.get(E);
    if (be && ie.get(A))
      return be == A;
    var pt = -1, It = !0, Ve = U & a ? new Ca() : void 0;
    for (ie.set(E, A), ie.set(A, E); ++pt < Le; ) {
      var wt = E[pt], Et = A[pt];
      if (z)
        var fr = Te ? z(Et, wt, pt, A, E, ie) : z(wt, Et, pt, E, A, ie);
      if (fr !== void 0) {
        if (fr)
          continue;
        It = !1;
        break;
      }
      if (Ve) {
        if (!Se(A, function(Wt, Xr) {
          if (!or(Ve, Xr) && (wt === Wt || _e(wt, Wt, U, z, ie)))
            return Ve.push(Xr);
        })) {
          It = !1;
          break;
        }
      } else if (!(wt === Et || _e(wt, Et, U, z, ie))) {
        It = !1;
        break;
      }
    }
    return ie.delete(E), ie.delete(A), It;
  }
  function Jg(E, A, U, z, _e, ie, Te) {
    switch (U) {
      case H:
        if (E.byteLength != A.byteLength || E.byteOffset != A.byteOffset)
          return !1;
        E = E.buffer, A = A.buffer;
      case j:
        return !(E.byteLength != A.byteLength || !ie(new qu(E), new qu(A)));
      case l:
      case u:
      case _:
        return Xu(+E, +A);
      case d:
        return E.name == A.name && E.message == A.message;
      case M:
      case W:
        return E == A + "";
      case g:
        var Le = sr;
      case X:
        var je = z & i;
        if (Le || (Le = hi), E.size != A.size && !je)
          return !1;
        var be = Te.get(E);
        if (be)
          return be == A;
        z |= a, Te.set(E, A);
        var pt = Ku(Le(E), Le(A), z, _e, ie, Te);
        return Te.delete(E), pt;
      case de:
        if (Os)
          return Os.call(E) == Os.call(A);
    }
    return !1;
  }
  function Qg(E, A, U, z, _e, ie) {
    var Te = U & i, Le = Yu(E), je = Le.length, be = Yu(A), pt = be.length;
    if (je != pt && !Te)
      return !1;
    for (var It = je; It--; ) {
      var Ve = Le[It];
      if (!(Te ? Ve in A : $t.call(A, Ve)))
        return !1;
    }
    var wt = ie.get(E);
    if (wt && ie.get(A))
      return wt == A;
    var Et = !0;
    ie.set(E, A), ie.set(A, E);
    for (var fr = Te; ++It < je; ) {
      Ve = Le[It];
      var Wt = E[Ve], Xr = A[Ve];
      if (z)
        var tf = Te ? z(Xr, Wt, Ve, A, E, ie) : z(Wt, Xr, Ve, E, A, ie);
      if (!(tf === void 0 ? Wt === Xr || _e(Wt, Xr, U, z, ie) : tf)) {
        Et = !1;
        break;
      }
      fr || (fr = Ve == "constructor");
    }
    if (Et && !fr) {
      var ka = E.constructor, Fa = A.constructor;
      ka != Fa && "constructor" in E && "constructor" in A && !(typeof ka == "function" && ka instanceof ka && typeof Fa == "function" && Fa instanceof Fa) && (Et = !1);
    }
    return ie.delete(E), ie.delete(A), Et;
  }
  function Yu(E) {
    return zg(E, lv, ev);
  }
  function Na(E, A) {
    var U = E.__data__;
    return rv(A) ? U[typeof A == "string" ? "string" : "hash"] : U.map;
  }
  function Sn(E, A) {
    var U = Vt(E, A);
    return Kg(U) ? U : void 0;
  }
  function Zg(E) {
    var A = $t.call(E, zr), U = E[zr];
    try {
      E[zr] = void 0;
      var z = !0;
    } catch {
    }
    var _e = ju.call(E);
    return z && (A ? E[zr] = U : delete E[zr]), _e;
  }
  var ev = Gu ? function(E) {
    return E == null ? [] : (E = Object(E), Ce(Gu(E), function(A) {
      return Hu.call(E, A);
    }));
  } : uv, ur = vi;
  (Ps && ur(new Ps(new ArrayBuffer(1))) != H || yi && ur(new yi()) != g || Ts && ur(Ts.resolve()) != I || As && ur(new As()) != X || Is && ur(new Is()) != J) && (ur = function(E) {
    var A = vi(E), U = A == w ? E.constructor : void 0, z = U ? Yr(U) : "";
    if (z)
      switch (z) {
        case vg:
          return H;
        case _g:
          return g;
        case $g:
          return I;
        case wg:
          return X;
        case Eg:
          return J;
      }
    return A;
  });
  function tv(E, A) {
    return A = A ?? o, !!A && (typeof E == "number" || $.test(E)) && E > -1 && E % 1 == 0 && E < A;
  }
  function rv(E) {
    var A = typeof E;
    return A == "string" || A == "number" || A == "symbol" || A == "boolean" ? E !== "__proto__" : E === null;
  }
  function nv(E) {
    return !!Mu && Mu in E;
  }
  function iv(E) {
    var A = E && E.constructor, U = typeof A == "function" && A.prototype || cr;
    return E === U;
  }
  function av(E) {
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
  function Xu(E, A) {
    return E === A || E !== E && A !== A;
  }
  var ov = zu(/* @__PURE__ */ function() {
    return arguments;
  }()) ? zu : function(E) {
    return _i(E) && $t.call(E, "callee") && !Hu.call(E, "callee");
  }, Da = Array.isArray;
  function sv(E) {
    return E != null && Qu(E.length) && !Ju(E);
  }
  var Cs = yg || fv;
  function cv(E, A) {
    return Wu(E, A);
  }
  function Ju(E) {
    if (!Zu(E))
      return !1;
    var A = vi(E);
    return A == p || A == y || A == f || A == C;
  }
  function Qu(E) {
    return typeof E == "number" && E > -1 && E % 1 == 0 && E <= o;
  }
  function Zu(E) {
    var A = typeof E;
    return E != null && (A == "object" || A == "function");
  }
  function _i(E) {
    return E != null && typeof E == "object";
  }
  var ef = Ie ? Gr(Ie) : Yg;
  function lv(E) {
    return sv(E) ? Vg(E) : Xg(E);
  }
  function uv() {
    return [];
  }
  function fv() {
    return !1;
  }
  e.exports = cv;
})(Co, Co.exports);
var jP = Co.exports;
Object.defineProperty(wa, "__esModule", { value: !0 });
wa.DownloadedUpdateHelper = void 0;
wa.createTempUpdateFile = VP;
const BP = ha, qP = Lr, _d = jP, tn = xr, xi = ce;
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
  async setDownloadedFile(t, r, n, i, a, o) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: a,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, o && await (0, tn.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
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
    const s = xi.join(this.cacheDirForPendingUpdate, a.fileName);
    if (!await (0, tn.pathExists)(s))
      return r.info("Cached update file doesn't exist"), null;
    const c = await GP(s);
    return t.info.sha512 !== c ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${c}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = a, s);
  }
  getUpdateInfoFile() {
    return xi.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
wa.DownloadedUpdateHelper = HP;
function GP(e, t = "sha512", r = "base64", n) {
  return new Promise((i, a) => {
    const o = (0, BP.createHash)(t);
    o.on("error", a).setEncoding(r), (0, qP.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", a).on("end", () => {
      o.end(), i(o.read());
    }).pipe(o, { end: !1 });
  });
}
async function VP(e, t, r) {
  let n = 0, i = xi.join(t, e);
  for (let a = 0; a < 3; a++)
    try {
      return await (0, tn.unlink)(i), i;
    } catch (o) {
      if (o.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${o}`), i = xi.join(t, `${n++}-${e}`);
    }
  return i;
}
var ts = {}, Al = {};
Object.defineProperty(Al, "__esModule", { value: !0 });
Al.getAppCacheDir = WP;
const Ks = ce, zP = Uo;
function WP() {
  const e = (0, zP.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || Ks.join(e, "AppData", "Local") : process.platform === "darwin" ? t = Ks.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || Ks.join(e, ".cache"), t;
}
Object.defineProperty(ts, "__esModule", { value: !0 });
ts.ElectronAppAdapter = void 0;
const $d = ce, KP = Al;
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
ts.ElectronAppAdapter = YP;
var iy = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = r;
  const t = Me;
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
    async download(a, o, s) {
      return await s.cancellationToken.createPromise((c, f, l) => {
        const u = {
          headers: s.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(a, u), (0, t.configureRequestOptions)(u), this.doDownload(u, {
          destination: o,
          options: s,
          onCancel: l,
          callback: (d) => {
            d == null ? c(o) : f(d);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(a, o) {
      a.headers && a.headers.Host && (a.host = a.headers.Host, delete a.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const s = tr.net.request({
        ...a,
        session: this.cachedSession
      });
      return s.on("response", o), this.proxyLoginCallback != null && s.on("login", this.proxyLoginCallback), s;
    }
    addRedirectHandlers(a, o, s, c, f) {
      a.on("redirect", (l, u, d) => {
        a.abort(), c > this.maxRedirects ? s(this.createMaxRedirectError()) : f(t.HttpExecutor.prepareRedirectUrlOptions(d, o));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(iy);
var Ea = {}, At = {}, XP = "[object Symbol]", ay = /[\\^$.*+?()[\]{}|]/g, JP = RegExp(ay.source), QP = typeof nt == "object" && nt && nt.Object === Object && nt, ZP = typeof self == "object" && self && self.Object === Object && self, eT = QP || ZP || Function("return this")(), tT = Object.prototype, rT = tT.toString, wd = eT.Symbol, Ed = wd ? wd.prototype : void 0, Sd = Ed ? Ed.toString : void 0;
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
function oT(e) {
  return e == null ? "" : nT(e);
}
function sT(e) {
  return e = oT(e), e && JP.test(e) ? e.replace(ay, "\\$&") : e;
}
var cT = sT;
Object.defineProperty(At, "__esModule", { value: !0 });
At.newBaseUrl = uT;
At.newUrlFromBase = kc;
At.getChannelFilename = fT;
At.blockmapFiles = dT;
const oy = ti, lT = cT;
function uT(e) {
  const t = new oy.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function kc(e, t, r = !1) {
  const n = new oy.URL(e, t), i = t.search;
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
const kr = Me, hT = Ge, bd = At;
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
  const i = sy(e).map((s) => {
    if (s.sha2 == null && s.sha512 == null)
      throw (0, kr.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, kr.safeStringifyJson)(s)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, bd.newUrlFromBase)(r(s.url), t),
      info: s
    };
  }), a = e.packages, o = a == null ? null : a[process.arch] || a.ia32;
  return o != null && (i[0].packageInfo = {
    ...o,
    path: (0, bd.newUrlFromBase)(r(o.path), t).href
  }), i;
}
Object.defineProperty(Ea, "__esModule", { value: !0 });
Ea.GenericProvider = void 0;
const Pd = Me, Ys = At, Xs = Fe;
class vT extends Xs.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, Ys.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, Ys.getChannelFilename)(this.channel), r = (0, Ys.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, Xs.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof Pd.HttpError && i.statusCode === 404)
          throw (0, Pd.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && n < 3) {
          await new Promise((a, o) => {
            try {
              setTimeout(a, 1e3 * n);
            } catch (s) {
              o(s);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, Xs.resolveFiles)(t, this.baseUrl);
  }
}
Ea.GenericProvider = vT;
var rs = {}, ns = {};
Object.defineProperty(ns, "__esModule", { value: !0 });
ns.BitbucketProvider = void 0;
const Td = Me, Js = At, Qs = Fe;
class _T extends Qs.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: a } = t;
    this.baseUrl = (0, Js.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${a}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new Td.CancellationToken(), r = (0, Js.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, Js.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, Qs.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Td.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Qs.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
ns.BitbucketProvider = _T;
var Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
Fr.GitHubProvider = Fr.BaseGitHubProvider = void 0;
Fr.computeReleaseNotes = ly;
const Yt = Me, Mn = Tl, $T = ti, jn = At, Fc = Fe, Zs = /\/tag\/([^/]+)$/;
class cy extends Fc.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, jn.newBaseUrl)((0, Yt.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, jn.newBaseUrl)((0, Yt.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
Fr.BaseGitHubProvider = cy;
class wT extends cy {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, r, n, i, a;
    const o = new Yt.CancellationToken(), s = await this.httpRequest((0, jn.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, o), c = (0, Yt.parseXml)(s);
    let f = c.element("entry", !1, "No published versions on GitHub"), l = null;
    try {
      if (this.updater.allowPrerelease) {
        const _ = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = Mn.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if (_ === null)
          l = Zs.exec(f.element("link").attribute("href"))[1];
        else
          for (const v of c.getElements("entry")) {
            const w = Zs.exec(v.element("link").attribute("href"));
            if (w === null)
              continue;
            const I = w[1], C = ((n = Mn.prerelease(I)) === null || n === void 0 ? void 0 : n[0]) || null, M = !_ || ["alpha", "beta"].includes(_), X = C !== null && !["alpha", "beta"].includes(String(C));
            if (M && !X && !(_ === "beta" && C === "alpha")) {
              l = I;
              break;
            }
            if (C && C === _) {
              l = I;
              break;
            }
          }
      } else {
        l = await this.getLatestTagName(o);
        for (const _ of c.getElements("entry"))
          if (Zs.exec(_.element("link").attribute("href"))[1] === l) {
            f = _;
            break;
          }
      }
    } catch (_) {
      throw (0, Yt.newError)(`Cannot parse releases feed: ${_.stack || _.message},
XML:
${s}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (l == null)
      throw (0, Yt.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let u, d = "", p = "";
    const y = async (_) => {
      d = (0, jn.getChannelFilename)(_), p = (0, jn.newUrlFromBase)(this.getBaseDownloadPath(String(l), d), this.baseUrl);
      const v = this.createRequestOptions(p);
      try {
        return await this.executor.request(v, o);
      } catch (w) {
        throw w instanceof Yt.HttpError && w.statusCode === 404 ? (0, Yt.newError)(`Cannot find ${d} in the latest release artifacts (${p}): ${w.stack || w.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : w;
      }
    };
    try {
      let _ = this.channel;
      this.updater.allowPrerelease && (!((i = Mn.prerelease(l)) === null || i === void 0) && i[0]) && (_ = this.getCustomChannelName(String((a = Mn.prerelease(l)) === null || a === void 0 ? void 0 : a[0]))), u = await y(_);
    } catch (_) {
      if (this.updater.allowPrerelease)
        u = await y(this.getDefaultChannelName());
      else
        throw _;
    }
    const g = (0, Fc.parseUpdateInfo)(u, d, p);
    return g.releaseName == null && (g.releaseName = f.elementValueOrEmpty("title")), g.releaseNotes == null && (g.releaseNotes = ly(this.updater.currentVersion, this.updater.fullChangelog, c, f)), {
      tag: l,
      ...g
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, jn.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new $T.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
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
function ly(e, t, r, n) {
  if (!t)
    return Ad(n);
  const i = [];
  for (const a of r.getElements("entry")) {
    const o = /\/tag\/v?([^/]+)$/.exec(a.element("link").attribute("href"))[1];
    Mn.lt(e, o) && i.push({
      version: o,
      note: Ad(a)
    });
  }
  return i.sort((a, o) => Mn.rcompare(a.version, o.version));
}
var is = {};
Object.defineProperty(is, "__esModule", { value: !0 });
is.KeygenProvider = void 0;
const Id = Me, ec = At, tc = Fe;
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
is.KeygenProvider = ET;
var as = {};
Object.defineProperty(as, "__esModule", { value: !0 });
as.PrivateGitHubProvider = void 0;
const In = Me, ST = Ge, bT = ce, Od = ti, Cd = At, PT = Fr, TT = Fe;
class AT extends PT.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new In.CancellationToken(), r = (0, Cd.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((s) => s.name === r);
    if (i == null)
      throw (0, In.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const a = new Od.URL(i.url);
    let o;
    try {
      o = (0, ST.load)(await this.httpRequest(a, this.configureHeaders("application/octet-stream"), t));
    } catch (s) {
      throw s instanceof In.HttpError && s.statusCode === 404 ? (0, In.newError)(`Cannot find ${r} in the latest release artifacts (${a}): ${s.stack || s.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : s;
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
    const i = (0, Cd.newUrlFromBase)(n, this.baseUrl);
    try {
      const a = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? a.find((o) => o.prerelease) || a[0] : a;
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
as.PrivateGitHubProvider = AT;
Object.defineProperty(rs, "__esModule", { value: !0 });
rs.isUrlProbablySupportMultiRangeRequests = uy;
rs.createClient = NT;
const Ka = Me, IT = ns, Rd = Ea, OT = Fr, CT = is, RT = as;
function uy(e) {
  return !e.includes("s3.amazonaws.com");
}
function NT(e, t, r) {
  if (typeof e == "string")
    throw (0, Ka.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, a = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return a == null ? new OT.GitHubProvider(i, t, r) : new RT.PrivateGitHubProvider(i, t, a, r);
    }
    case "bitbucket":
      return new IT.BitbucketProvider(e, t, r);
    case "keygen":
      return new CT.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new Rd.GenericProvider({
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
      return new Rd.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && uy(i.url)
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
var os = {}, Sa = {}, ai = {}, _n = {};
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
  const o = t.files[0], s = [], c = o.name, f = n.get(c);
  if (f == null)
    throw new Error(`no file ${c} in old blockmap`);
  const l = i.get(c);
  let u = 0;
  const { checksumToOffset: d, checksumToOldSize: p } = FT(n.get(c), f.offset, r);
  let y = o.offset;
  for (let g = 0; g < l.checksums.length; y += l.sizes[g], g++) {
    const _ = l.sizes[g], v = l.checksums[g];
    let w = d.get(v);
    w != null && p.get(v) !== _ && (r.warn(`Checksum ("${v}") matches, but size differs (old: ${p.get(v)}, new: ${_})`), w = void 0), w === void 0 ? (u++, a != null && a.kind === un.DOWNLOAD && a.end === y ? a.end += _ : (a = {
      kind: un.DOWNLOAD,
      start: y,
      end: y + _
      // oldBlocks: null,
    }, Nd(a, s, v, g))) : a != null && a.kind === un.COPY && a.end === w ? a.end += _ : (a = {
      kind: un.COPY,
      start: w,
      end: w + _
      // oldBlocks: [checksum]
    }, Nd(a, s, v, g));
  }
  return u > 0 && r.info(`File${o.name === "file" ? "" : " " + o.name} has ${u} changed blocks`), s;
}
const kT = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function Nd(e, t, r, n) {
  if (kT && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const a = [i.start, i.end, e.start, e.end].reduce((o, s) => o < s ? o : s);
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
  for (let o = 0; o < e.checksums.length; o++) {
    const s = e.checksums[o], c = e.sizes[o], f = i.get(s);
    if (f === void 0)
      n.set(s, a), i.set(s, c);
    else if (r.debug != null) {
      const l = f === c ? "(same size)" : `(size: ${f}, this size: ${c})`;
      r.debug(`${s} duplicated in blockmap ${l}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
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
ai.copyData = fy;
const Ya = Me, LT = Lr, xT = fa, UT = _n, kd = Buffer.from(`\r
\r
`);
var _r;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(_r || (_r = {}));
function fy(e, t, r, n, i) {
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
class MT extends xT.Writable {
  constructor(t, r, n, i, a, o) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = a, this.finishHandler = o, this.partIndex = -1, this.headerListBuffer = null, this.readState = _r.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
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
          let o = this.partIndexToTaskIndex.get(this.partIndex);
          if (o == null)
            if (this.isFinished)
              o = this.options.end;
            else
              throw (0, Ya.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const s = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (s < o)
            await this.copyExistingData(s, o);
          else if (s > o)
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
        const o = this.options.tasks[t];
        if (o.kind !== UT.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        fy(o, this.out, this.options.oldFileFd, i, () => {
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
    return i.write(r === 0 && t.length === n ? t : t.slice(r, n)) ? Promise.resolve() : new Promise((a, o) => {
      i.on("error", o), i.once("drain", () => {
        i.removeListener("error", o), a();
      });
    });
  }
}
ai.DataSplitter = MT;
var ss = {};
Object.defineProperty(ss, "__esModule", { value: !0 });
ss.executeTasksUsingMultipleRangeRequests = jT;
ss.checkIsRangesSupported = xc;
const Lc = Me, Fd = ai, Ld = _n;
function jT(e, t, r, n, i) {
  const a = (o) => {
    if (o >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const s = o + 1e3;
    BT(e, {
      tasks: t,
      start: o,
      end: Math.min(t.length, s),
      oldFileFd: n
    }, r, () => a(s), i);
  };
  return a;
}
function BT(e, t, r, n, i) {
  let a = "bytes=", o = 0;
  const s = /* @__PURE__ */ new Map(), c = [];
  for (let u = t.start; u < t.end; u++) {
    const d = t.tasks[u];
    d.kind === Ld.OperationKind.DOWNLOAD && (a += `${d.start}-${d.end - 1}, `, s.set(o, u), o++, c.push(d.end - d.start));
  }
  if (o <= 1) {
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
    const y = new Fd.DataSplitter(r, t, s, p[1] || p[2], c, n);
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
var cs = {};
Object.defineProperty(cs, "__esModule", { value: !0 });
cs.ProgressDifferentialDownloadCallbackTransform = void 0;
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
cs.ProgressDifferentialDownloadCallbackTransform = HT;
Object.defineProperty(Sa, "__esModule", { value: !0 });
Sa.DifferentialDownloader = void 0;
const Pi = Me, rc = xr, GT = Lr, VT = ai, zT = ti, Xa = _n, xd = ss, WT = cs;
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
    let a = 0, o = 0;
    for (const c of i) {
      const f = c.end - c.start;
      c.kind === Xa.OperationKind.DOWNLOAD ? a += f : o += f;
    }
    const s = this.blockAwareFileInfo.size;
    if (a + o + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== s)
      throw new Error(`Internal error, size mismatch: downloadSize: ${a}, copySize: ${o}, newSize: ${s}`);
    return n.info(`Full: ${Ud(s)}, To download: ${Ud(a)} (${Math.round(a / (s / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, rc.close)(i.descriptor).catch((a) => {
      this.logger.error(`cannot close file "${i.path}": ${a}`);
    })));
    return this.doDownloadFile(t, r).then(n).catch((i) => n().catch((a) => {
      try {
        this.logger.error(`cannot close files: ${a}`);
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
    const n = await (0, rc.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, rc.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const a = (0, GT.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((o, s) => {
      const c = [];
      let f;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const v = [];
        let w = 0;
        for (const C of t)
          C.kind === Xa.OperationKind.DOWNLOAD && (v.push(C.end - C.start), w += C.end - C.start);
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
            s(v);
            return;
          }
          o(void 0);
        });
      }), c.push(a);
      let u = null;
      for (const v of c)
        v.on("error", s), u == null ? u = v : u = u.pipe(v);
      const d = c[0];
      let p;
      if (this.options.isUseMultipleRangeRequest) {
        p = (0, xd.executeTasksUsingMultipleRangeRequests)(this, t, d, n, s), p(0);
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
        const C = t[v++];
        if (C.kind === Xa.OperationKind.COPY) {
          f && f.beginFileCopy(), (0, VT.copyData)(C, d, n, s, () => p(v));
          return;
        }
        const M = `bytes=${C.start}-${C.end - 1}`;
        _.headers.range = M, (I = (w = this.logger) === null || w === void 0 ? void 0 : w.debug) === null || I === void 0 || I.call(w, `download range: ${M}`), f && f.beginRangeDownload();
        const X = this.httpExecutor.createRequest(_, (W) => {
          W.on("error", s), W.on("aborted", () => {
            s(new Error("response has been aborted by the server"));
          }), W.statusCode >= 400 && s((0, Pi.createHttpError)(W)), W.pipe(d, {
            end: !1
          }), W.once("end", () => {
            f && f.endRangeDownload(), ++y === 100 ? (y = 0, setTimeout(() => p(v), 1e3)) : p(v);
          });
        });
        X.on("redirect", (W, de, b) => {
          this.logger.info(`Redirect to ${YT(b)}`), g = b, (0, Pi.configureRequestUrl)(new zT.URL(g), _), X.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(X, s), X.end();
      }, p(0);
    });
  }
  async readRemoteBytes(t, r) {
    const n = Buffer.allocUnsafe(r + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${r}`;
    let a = 0;
    if (await this.request(i, (o) => {
      o.copy(n, a), a += o.length;
    }), a !== n.length)
      throw new Error(`Received data length ${a} is not equal to expected ${n.length}`);
    return n;
  }
  request(t, r) {
    return new Promise((n, i) => {
      const a = this.httpExecutor.createRequest(t, (o) => {
        (0, xd.checkIsRangesSupported)(o, i) && (o.on("error", i), o.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), o.on("data", r), o.on("end", () => n()));
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
Object.defineProperty(os, "__esModule", { value: !0 });
os.GenericDifferentialDownloader = void 0;
const XT = Sa;
class JT extends XT.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
os.GenericDifferentialDownloader = JT;
var Ur = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = n;
  const t = Me;
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
  function n(i, a, o) {
    i.on(a, o);
  }
})(Ur);
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.NoOpLogger = Rr.AppUpdater = void 0;
const et = Me, QT = ha, ZT = Uo, eA = ap, On = xr, tA = Ge, nc = Yo, Jr = ce, rn = Tl, Md = wa, rA = ts, jd = iy, nA = Ea, ic = rs, iA = sp, aA = At, oA = os, Cn = Ur;
class Il extends eA.EventEmitter {
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
    return (0, jd.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new dy();
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
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new Cn.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (a) => this.checkIfUpdateSupported(a), this.clientPromise = null, this.stagingUserIdPromise = new nc.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new nc.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (a) => {
      this._logger.error(`Error: ${a.stack || a.message}`);
    }), r == null ? (this.app = new rA.ElectronAppAdapter(), this.httpExecutor = new jd.ElectronHttpExecutor((a, o) => this.emit("login", a, o))) : (this.app = r, this.httpExecutor = null);
    const n = this.app.version, i = (0, rn.parse)(n);
    if (i == null)
      throw (0, et.newError)(`App version is not a valid semver version: "${n}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = sA(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
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
      const n = Il.formatDownloadNotification(r.updateInfo.version, this.app.name, t);
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
    const i = await this.stagingUserIdPromise.value, o = et.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${n}, percentage: ${o}, user id: ${i}`), o < n;
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
    const a = (0, rn.gt)(r, n), o = (0, rn.lt)(r, n);
    return a ? !0 : this.allowDowngrade && o;
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
    this.emit(Cn.UPDATE_DOWNLOADED, t);
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
      n.debug != null && n.debug(`updater cache dir: ${i}`), t = new Md.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
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
    this.listenerCount(Cn.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = (w) => this.emit(Cn.DOWNLOAD_PROGRESS, w));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, a = i.version, o = r.packageInfo;
    function s() {
      const w = decodeURIComponent(t.fileInfo.url.pathname);
      return w.endsWith(`.${t.fileExtension}`) ? Jr.basename(w) : t.fileInfo.info.url;
    }
    const c = await this.getOrCreateDownloadHelper(), f = c.cacheDirForPendingUpdate;
    await (0, On.mkdir)(f, { recursive: !0 });
    const l = s();
    let u = Jr.join(f, l);
    const d = o == null ? null : Jr.join(f, `package-${a}${Jr.extname(o.path) || ".7z"}`), p = async (w) => (await c.setDownloadedFile(u, d, i, r, l, w), await t.done({
      ...i,
      downloadedFile: u
    }), d == null ? [u] : [u, d]), y = this._logger, g = await c.validateDownloadedPath(u, i, r, y);
    if (g != null)
      return u = g, await p(!1);
    const _ = async () => (await c.clear().catch(() => {
    }), await (0, On.unlink)(u).catch(() => {
    })), v = await (0, Md.createTempUpdateFile)(`temp-${l}`, f, y);
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
      const o = (0, aA.blockmapFiles)(t.url, this.app.version, r.updateInfoAndProvider.info.version);
      this._logger.info(`Download block maps (old: "${o[0]}", new: ${o[1]})`);
      const s = async (l) => {
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
      this.listenerCount(Cn.DOWNLOAD_PROGRESS) > 0 && (c.onProgress = (l) => this.emit(Cn.DOWNLOAD_PROGRESS, l));
      const f = await Promise.all(o.map((l) => s(l)));
      return await new oA.GenericDifferentialDownloader(t.info, this.httpExecutor, c).download(f[0], f[1]), !1;
    } catch (o) {
      if (this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), this._testOnlyOptions != null)
        throw o;
      return !0;
    }
  }
}
Rr.AppUpdater = Il;
function sA(e) {
  const t = (0, rn.prerelease)(e);
  return t != null && t.length > 0;
}
class dy {
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
Rr.NoOpLogger = dy;
Object.defineProperty(ar, "__esModule", { value: !0 });
ar.BaseUpdater = void 0;
const Bd = da, cA = Rr;
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
    const i = (0, Bd.spawnSync)(t, r, {
      env: { ...process.env, ...n },
      encoding: "utf-8",
      shell: !0
    }), { error: a, status: o, stdout: s, stderr: c } = i;
    if (a != null)
      throw this._logger.error(c), a;
    if (o != null && o !== 0)
      throw this._logger.error(c), new Error(`Command ${t} exited with code ${o}`);
    return s.trim();
  }
  /**
   * This handles both node 8 and node 10 way of emitting error when spawning a process
   *   - node 8: Throws the error
   *   - node 10: Emit the error(Need to listen with on)
   */
  // https://github.com/electron-userland/electron-builder/issues/1129
  // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
  async spawnLog(t, r = [], n = void 0, i = "ignore") {
    return this._logger.info(`Executing: ${t} with args: ${r}`), new Promise((a, o) => {
      try {
        const s = { stdio: i, env: n, detached: !0 }, c = (0, Bd.spawn)(t, r, s);
        c.on("error", (f) => {
          o(f);
        }), c.unref(), c.pid !== void 0 && a(!0);
      } catch (s) {
        o(s);
      }
    });
  }
}
ar.BaseUpdater = lA;
var Zi = {}, ba = {};
Object.defineProperty(ba, "__esModule", { value: !0 });
ba.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const Rn = xr, uA = Sa, fA = sp;
class dA extends uA.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = hy(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await hA(this.options.oldFile), i);
  }
}
ba.FileWithEmbeddedBlockMapDifferentialDownloader = dA;
function hy(e) {
  return JSON.parse((0, fA.inflateRawSync)(e).toString());
}
async function hA(e) {
  const t = await (0, Rn.open)(e, "r");
  try {
    const r = (await (0, Rn.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, Rn.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, Rn.read)(t, i, 0, i.length, r - n.length - i.length), await (0, Rn.close)(t), hy(i);
  } catch (r) {
    throw await (0, Rn.close)(t), r;
  }
}
Object.defineProperty(Zi, "__esModule", { value: !0 });
Zi.AppImageUpdater = void 0;
const qd = Me, Hd = da, pA = xr, mA = Lr, Ti = ce, yA = ar, gA = ba, vA = Fe, Gd = Ur;
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
        const o = process.env.APPIMAGE;
        if (o == null)
          throw (0, qd.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(n, o, i, r, t)) && await this.httpExecutor.download(n.url, i, a), await (0, pA.chmod)(i, 493);
      }
    });
  }
  async downloadDifferential(t, r, n, i, a) {
    try {
      const o = {
        newUrl: t.url,
        oldFile: r,
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: a.requestHeaders,
        cancellationToken: a.cancellationToken
      };
      return this.listenerCount(Gd.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(Gd.DOWNLOAD_PROGRESS, s)), await new gA.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, o).download(), !1;
    } catch (o) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), process.platform === "linux";
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
    const o = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(n, [], o) : (o.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, Hd.execFileSync)(n, [], { env: o })), !0;
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
        this.listenerCount(Vd.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (o) => this.emit(Vd.DOWNLOAD_PROGRESS, o)), await this.httpExecutor.download(n.url, i, a);
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
        this.listenerCount(zd.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (o) => this.emit(zd.DOWNLOAD_PROGRESS, o)), await this.httpExecutor.download(n.url, i, a);
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
        this.listenerCount(Wd.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (o) => this.emit(Wd.DOWNLOAD_PROGRESS, o)), await this.httpExecutor.download(n.url, i, a);
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
    let o;
    return i ? o = [i, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", a] : o = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", a], this.spawnSyncLog(r, [`${n}/bin/bash`, "-c", `'${o.join(" ")}'${n}`]), t.isForceRunAfter && this.app.relaunch(), !0;
  }
}
ra.RpmUpdater = IA;
var na = {};
Object.defineProperty(na, "__esModule", { value: !0 });
na.MacUpdater = void 0;
const Kd = Me, ac = xr, OA = Lr, Yd = ce, CA = vv, RA = Rr, NA = Fe, Xd = da, Jd = ha;
class DA extends RA.AppUpdater {
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
    let o = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const d = (0, Xd.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      n.info(`Checked 'uname -a': arm64=${d}`), o = o || d;
    } catch (u) {
      n.warn(`uname shell command to check for arm64 failed: ${u}`);
    }
    o = o || process.arch === "arm64" || a;
    const s = (u) => {
      var d;
      return u.url.pathname.includes("arm64") || ((d = u.info.url) === null || d === void 0 ? void 0 : d.includes("arm64"));
    };
    o && r.some(s) ? r = r.filter((u) => o === s(u)) : r = r.filter((u) => !s(u));
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
    const i = r.downloadedFile, a = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, ac.stat)(i)).size, o = this._logger, s = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${s})`), this.server = (0, CA.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${s})`), this.server.on("close", () => {
      o.info(`Proxy server for native Squirrel.Mac is closed (${s})`);
    });
    const c = (f) => {
      const l = f.address();
      return typeof l == "string" ? l : `http://127.0.0.1:${l == null ? void 0 : l.port}`;
    };
    return await new Promise((f, l) => {
      const u = (0, Jd.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), d = Buffer.from(`autoupdater:${u}`, "ascii"), p = `/${(0, Jd.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (y, g) => {
        const _ = y.url;
        if (o.info(`${_} requested`), _ === "/") {
          if (!y.headers.authorization || y.headers.authorization.indexOf("Basic ") === -1) {
            g.statusCode = 401, g.statusMessage = "Invalid Authentication Credentials", g.end(), o.warn("No authenthication info");
            return;
          }
          const I = y.headers.authorization.split(" ")[1], C = Buffer.from(I, "base64").toString("ascii"), [M, X] = C.split(":");
          if (M !== "autoupdater" || X !== u) {
            g.statusCode = 401, g.statusMessage = "Invalid Authentication Credentials", g.end(), o.warn("Invalid authenthication credentials");
            return;
          }
          const W = Buffer.from(`{ "url": "${c(this.server)}${p}" }`);
          g.writeHead(200, { "Content-Type": "application/json", "Content-Length": W.length }), g.end(W);
          return;
        }
        if (!_.startsWith(p)) {
          o.warn(`${_} requested, but not supported`), g.writeHead(404), g.end();
          return;
        }
        o.info(`${p} requested by Squirrel.Mac, pipe ${i}`);
        let v = !1;
        g.on("finish", () => {
          v || (this.nativeUpdater.removeListener("error", l), f([]));
        });
        const w = (0, OA.createReadStream)(i);
        w.on("error", (I) => {
          try {
            g.end();
          } catch (C) {
            o.warn(`cannot end response: ${C}`);
          }
          v = !0, this.nativeUpdater.removeListener("error", l), l(new Error(`Cannot pipe "${i}": ${I}`));
        }), g.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": a
        }), w.pipe(g);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${s})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${c(this.server)}, ${s})`), this.nativeUpdater.setFeedURL({
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
var ia = {}, Ol = {};
Object.defineProperty(Ol, "__esModule", { value: !0 });
Ol.verifySignature = FA;
const Qd = Me, py = da, kA = Uo, Zd = ce;
function FA(e, t, r) {
  return new Promise((n, i) => {
    const a = t.replace(/'/g, "''");
    r.info(`Verifying signature ${a}`), (0, py.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${a}' | ConvertTo-Json -Compress"`], {
      shell: !0,
      timeout: 20 * 1e3
    }, (o, s, c) => {
      var f;
      try {
        if (o != null || c) {
          oc(r, o, c, i), n(null);
          return;
        }
        const l = LA(s);
        if (l.Status === 0) {
          try {
            const y = Zd.normalize(l.Path), g = Zd.normalize(t);
            if (r.info(`LiteralPath: ${y}. Update Path: ${g}`), y !== g) {
              oc(r, new Error(`LiteralPath of ${y} is different than ${g}`), c, i), n(null);
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
        oc(r, l, null, i), n(null);
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
function oc(e, t, r, n) {
  if (xA()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, py.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
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
const Ja = Me, eh = ce, UA = ar, MA = ba, th = Ur, jA = Fe, BA = xr, qA = Ol, rh = ti;
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
    const r = t.updateInfoAndProvider.provider, n = (0, jA.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: n,
      task: async (i, a, o, s) => {
        const c = n.packageInfo, f = c != null && o != null;
        if (f && t.disableWebInstaller)
          throw (0, Ja.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !f && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (f || t.disableDifferentialDownload || await this.differentialDownloadInstaller(n, t, i, r, Ja.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(n.url, i, a);
        const l = await this.verifySignature(i);
        if (l != null)
          throw await s(), (0, Ja.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${l}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (f && await this.differentialDownloadWebPackage(t, c, o, r))
          try {
            await this.httpExecutor.download(new rh.URL(c.path), o, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: c.sha512
            });
          } catch (u) {
            try {
              await (0, BA.unlink)(o);
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
      this.spawnLog(eh.join(process.resourcesPath, "elevate.exe"), [r].concat(n)).catch((o) => this.dispatchError(o));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), a(), !0) : (this.spawnLog(r, n).catch((o) => {
      const s = o.code;
      this._logger.info(`Cannot run installer: error code: ${s}, error message: "${o.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), s === "UNKNOWN" || s === "EACCES" ? a() : s === "ENOENT" ? tr.shell.openPath(r).catch((c) => this.dispatchError(c)) : this.dispatchError(o);
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
      this.listenerCount(th.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (o) => this.emit(th.DOWNLOAD_PROGRESS, o)), await new MA.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, a).download();
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
    var C = Object.getOwnPropertyDescriptor(v, w);
    (!C || ("get" in C ? !v.__esModule : C.writable || C.configurable)) && (C = { enumerable: !0, get: function() {
      return v[w];
    } }), Object.defineProperty(_, I, C);
  } : function(_, v, w, I) {
    I === void 0 && (I = w), _[I] = v[w];
  }), r = nt && nt.__exportStar || function(_, v) {
    for (var w in _) w !== "default" && !Object.prototype.hasOwnProperty.call(v, w) && t(v, _, w);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const n = xr, i = ce;
  var a = ar;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return a.BaseUpdater;
  } });
  var o = Rr;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return o.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return o.NoOpLogger;
  } });
  var s = Fe;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return s.Provider;
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
  const t = fe.fromCallback, r = ke, n = [
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
    return typeof a == "function" ? r.exists(i, a) : new Promise((o) => r.exists(i, o));
  }, e.read = function(i, a, o, s, c, f) {
    return typeof f == "function" ? r.read(i, a, o, s, c, f) : new Promise((l, u) => {
      r.read(i, a, o, s, c, (d, p, y) => {
        if (d) return u(d);
        l({ bytesRead: p, buffer: y });
      });
    });
  }, e.write = function(i, a, ...o) {
    return typeof o[o.length - 1] == "function" ? r.write(i, a, ...o) : new Promise((s, c) => {
      r.write(i, a, ...o, (f, l, u) => {
        if (f) return c(f);
        s({ bytesWritten: l, buffer: u });
      });
    });
  }, e.readv = function(i, a, ...o) {
    return typeof o[o.length - 1] == "function" ? r.readv(i, a, ...o) : new Promise((s, c) => {
      r.readv(i, a, ...o, (f, l, u) => {
        if (f) return c(f);
        s({ bytesRead: l, buffers: u });
      });
    });
  }, e.writev = function(i, a, ...o) {
    return typeof o[o.length - 1] == "function" ? r.writev(i, a, ...o) : new Promise((s, c) => {
      r.writev(i, a, ...o, (f, l, u) => {
        if (f) return c(f);
        s({ bytesWritten: l, buffers: u });
      });
    });
  }, typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(ut);
var Cl = {}, my = {};
const GA = ce;
my.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(GA.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const yy = ut, { checkPath: gy } = my, vy = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Cl.makeDir = async (e, t) => (gy(e), yy.mkdir(e, {
  mode: vy(t),
  recursive: !0
}));
Cl.makeDirSync = (e, t) => (gy(e), yy.mkdirSync(e, {
  mode: vy(t),
  recursive: !0
}));
const VA = fe.fromPromise, { makeDir: zA, makeDirSync: sc } = Cl, cc = VA(zA);
var Gt = {
  mkdirs: cc,
  mkdirsSync: sc,
  // alias
  mkdirp: cc,
  mkdirpSync: sc,
  ensureDir: cc,
  ensureDirSync: sc
};
const WA = fe.fromPromise, _y = ut;
function KA(e) {
  return _y.access(e).then(() => !0).catch(() => !1);
}
var $n = {
  pathExists: WA(KA),
  pathExistsSync: _y.existsSync
};
const zn = ut, YA = fe.fromPromise;
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
var $y = {
  utimesMillis: YA(XA),
  utimesMillisSync: JA
};
const Zn = ut, Ue = ce, nh = fe.fromPromise;
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
  const i = r.dereference ? (o) => Zn.statSync(o, { bigint: !0 }) : (o) => Zn.lstatSync(o, { bigint: !0 }), a = i(e);
  try {
    n = i(t);
  } catch (o) {
    if (o.code === "ENOENT") return { srcStat: a, destStat: null };
    throw o;
  }
  return { srcStat: a, destStat: n };
}
async function eI(e, t, r, n) {
  const { srcStat: i, destStat: a } = await QA(e, t, n);
  if (a) {
    if (Pa(i, a)) {
      const o = Ue.basename(e), s = Ue.basename(t);
      if (r === "move" && o !== s && o.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: a, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !a.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && a.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Rl(e, t))
    throw new Error(ls(e, t, r));
  return { srcStat: i, destStat: a };
}
function tI(e, t, r, n) {
  const { srcStat: i, destStat: a } = ZA(e, t, n);
  if (a) {
    if (Pa(i, a)) {
      const o = Ue.basename(e), s = Ue.basename(t);
      if (r === "move" && o !== s && o.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: a, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !a.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && a.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Rl(e, t))
    throw new Error(ls(e, t, r));
  return { srcStat: i, destStat: a };
}
async function wy(e, t, r, n) {
  const i = Ue.resolve(Ue.dirname(e)), a = Ue.resolve(Ue.dirname(r));
  if (a === i || a === Ue.parse(a).root) return;
  let o;
  try {
    o = await Zn.stat(a, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (Pa(t, o))
    throw new Error(ls(e, r, n));
  return wy(e, t, a, n);
}
function Ey(e, t, r, n) {
  const i = Ue.resolve(Ue.dirname(e)), a = Ue.resolve(Ue.dirname(r));
  if (a === i || a === Ue.parse(a).root) return;
  let o;
  try {
    o = Zn.statSync(a, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (Pa(t, o))
    throw new Error(ls(e, r, n));
  return Ey(e, t, a, n);
}
function Pa(e, t) {
  return t.ino !== void 0 && t.dev !== void 0 && t.ino === e.ino && t.dev === e.dev;
}
function Rl(e, t) {
  const r = Ue.resolve(e).split(Ue.sep).filter((i) => i), n = Ue.resolve(t).split(Ue.sep).filter((i) => i);
  return r.every((i, a) => n[a] === i);
}
function ls(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var oi = {
  // checkPaths
  checkPaths: nh(eI),
  checkPathsSync: tI,
  // checkParent
  checkParentPaths: nh(wy),
  checkParentPathsSync: Ey,
  // Misc
  isSrcSubdir: Rl,
  areIdentical: Pa
};
const Xe = ut, aa = ce, { mkdirs: rI } = Gt, { pathExists: nI } = $n, { utimesMillis: iI } = $y, oa = oi;
async function aI(e, t, r = {}) {
  typeof r == "function" && (r = { filter: r }), r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  );
  const { srcStat: n, destStat: i } = await oa.checkPaths(e, t, "copy", r);
  if (await oa.checkParentPaths(e, n, t, "copy"), !await Sy(e, t, r)) return;
  const o = aa.dirname(t);
  await nI(o) || await rI(o), await by(i, e, t, r);
}
async function Sy(e, t, r) {
  return r.filter ? r.filter(e, t) : !0;
}
async function by(e, t, r, n) {
  const a = await (n.dereference ? Xe.stat : Xe.lstat)(t);
  if (a.isDirectory()) return lI(a, e, t, r, n);
  if (a.isFile() || a.isCharacterDevice() || a.isBlockDevice()) return oI(a, e, t, r, n);
  if (a.isSymbolicLink()) return uI(e, t, r, n);
  throw a.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : a.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
async function oI(e, t, r, n, i) {
  if (!t) return ih(e, r, n, i);
  if (i.overwrite)
    return await Xe.unlink(n), ih(e, r, n, i);
  if (i.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
async function ih(e, t, r, n) {
  if (await Xe.copyFile(t, r), n.preserveTimestamps) {
    sI(e.mode) && await cI(r, e.mode);
    const i = await Xe.stat(t);
    await iI(r, i.atime, i.mtime);
  }
  return Xe.chmod(r, e.mode);
}
function sI(e) {
  return (e & 128) === 0;
}
function cI(e, t) {
  return Xe.chmod(e, t | 128);
}
async function lI(e, t, r, n, i) {
  t || await Xe.mkdir(n);
  const a = [];
  for await (const o of await Xe.opendir(r)) {
    const s = aa.join(r, o.name), c = aa.join(n, o.name);
    a.push(
      Sy(s, c, i).then((f) => {
        if (f)
          return oa.checkPaths(s, c, "copy", i).then(({ destStat: l }) => by(l, s, c, i));
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
  } catch (o) {
    if (o.code === "EINVAL" || o.code === "UNKNOWN") return Xe.symlink(i, r);
    throw o;
  }
  if (n.dereference && (a = aa.resolve(process.cwd(), a)), oa.isSrcSubdir(i, a))
    throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${a}'.`);
  if (oa.isSrcSubdir(a, i))
    throw new Error(`Cannot overwrite '${a}' with '${i}'.`);
  return await Xe.unlink(r), Xe.symlink(i, r);
}
var fI = aI;
const it = ke, sa = ce, dI = Gt.mkdirsSync, hI = $y.utimesMillisSync, ca = oi;
function pI(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = ca.checkPathsSync(e, t, "copy", r);
  if (ca.checkParentPathsSync(e, n, t, "copy"), r.filter && !r.filter(e, t)) return;
  const a = sa.dirname(t);
  return it.existsSync(a) || dI(a), Py(i, e, t, r);
}
function Py(e, t, r, n) {
  const a = (n.dereference ? it.statSync : it.lstatSync)(t);
  if (a.isDirectory()) return wI(a, e, t, r, n);
  if (a.isFile() || a.isCharacterDevice() || a.isBlockDevice()) return mI(a, e, t, r, n);
  if (a.isSymbolicLink()) return bI(e, t, r, n);
  throw a.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : a.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function mI(e, t, r, n, i) {
  return t ? yI(e, r, n, i) : Ty(e, r, n, i);
}
function yI(e, t, r, n) {
  if (n.overwrite)
    return it.unlinkSync(r), Ty(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function Ty(e, t, r, n) {
  return it.copyFileSync(t, r), n.preserveTimestamps && gI(e.mode, t, r), Nl(r, e.mode);
}
function gI(e, t, r) {
  return vI(e) && _I(r, e), $I(t, r);
}
function vI(e) {
  return (e & 128) === 0;
}
function _I(e, t) {
  return Nl(e, t | 128);
}
function Nl(e, t) {
  return it.chmodSync(e, t);
}
function $I(e, t) {
  const r = it.statSync(e);
  return hI(t, r.atime, r.mtime);
}
function wI(e, t, r, n, i) {
  return t ? Ay(r, n, i) : EI(e.mode, r, n, i);
}
function EI(e, t, r, n) {
  return it.mkdirSync(r), Ay(t, r, n), Nl(r, e);
}
function Ay(e, t, r) {
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
  const i = sa.join(t, e), a = sa.join(r, e);
  if (n.filter && !n.filter(i, a)) return;
  const { destStat: o } = ca.checkPathsSync(i, a, "copy", n);
  return Py(o, i, a, n);
}
function bI(e, t, r, n) {
  let i = it.readlinkSync(t);
  if (n.dereference && (i = sa.resolve(process.cwd(), i)), e) {
    let a;
    try {
      a = it.readlinkSync(r);
    } catch (o) {
      if (o.code === "EINVAL" || o.code === "UNKNOWN") return it.symlinkSync(i, r);
      throw o;
    }
    if (n.dereference && (a = sa.resolve(process.cwd(), a)), ca.isSrcSubdir(i, a))
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
const AI = fe.fromPromise;
var Dl = {
  copy: AI(fI),
  copySync: TI
};
const Iy = ke, II = fe.fromCallback;
function OI(e, t) {
  Iy.rm(e, { recursive: !0, force: !0 }, t);
}
function CI(e) {
  Iy.rmSync(e, { recursive: !0, force: !0 });
}
var us = {
  remove: II(OI),
  removeSync: CI
};
const RI = fe.fromPromise, Oy = ut, Cy = ce, Ry = Gt, Ny = us, ah = RI(async function(t) {
  let r;
  try {
    r = await Oy.readdir(t);
  } catch {
    return Ry.mkdirs(t);
  }
  return Promise.all(r.map((n) => Ny.remove(Cy.join(t, n))));
});
function oh(e) {
  let t;
  try {
    t = Oy.readdirSync(e);
  } catch {
    return Ry.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = Cy.join(e, r), Ny.removeSync(r);
  });
}
var NI = {
  emptyDirSync: oh,
  emptydirSync: oh,
  emptyDir: ah,
  emptydir: ah
};
const DI = fe.fromPromise, Dy = ce, Qt = ut, ky = Gt;
async function kI(e) {
  let t;
  try {
    t = await Qt.stat(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = Dy.dirname(e);
  let n = null;
  try {
    n = await Qt.stat(r);
  } catch (i) {
    if (i.code === "ENOENT") {
      await ky.mkdirs(r), await Qt.writeFile(e, "");
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
  const r = Dy.dirname(e);
  try {
    Qt.statSync(r).isDirectory() || Qt.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") ky.mkdirsSync(r);
    else throw n;
  }
  Qt.writeFileSync(e, "");
}
var LI = {
  createFile: DI(kI),
  createFileSync: FI
};
const xI = fe.fromPromise, Fy = ce, wr = ut, Ly = Gt, { pathExists: UI } = $n, { areIdentical: xy } = oi;
async function MI(e, t) {
  let r;
  try {
    r = await wr.lstat(t);
  } catch {
  }
  let n;
  try {
    n = await wr.lstat(e);
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  if (r && xy(n, r)) return;
  const i = Fy.dirname(t);
  await UI(i) || await Ly.mkdirs(i), await wr.link(e, t);
}
function jI(e, t) {
  let r;
  try {
    r = wr.lstatSync(t);
  } catch {
  }
  try {
    const a = wr.lstatSync(e);
    if (r && xy(a, r)) return;
  } catch (a) {
    throw a.message = a.message.replace("lstat", "ensureLink"), a;
  }
  const n = Fy.dirname(t);
  return wr.existsSync(n) || Ly.mkdirsSync(n), wr.linkSync(e, t);
}
var BI = {
  createLink: xI(MI),
  createLinkSync: jI
};
const Tr = ce, Ui = ut, { pathExists: qI } = $n, HI = fe.fromPromise;
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
const Uy = ut, WI = fe.fromPromise;
async function KI(e, t) {
  if (t) return t;
  let r;
  try {
    r = await Uy.lstat(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
function YI(e, t) {
  if (t) return t;
  let r;
  try {
    r = Uy.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var XI = {
  symlinkType: WI(KI),
  symlinkTypeSync: YI
};
const JI = fe.fromPromise, My = ce, Ut = ut, { mkdirs: QI, mkdirsSync: ZI } = Gt, { symlinkPaths: eO, symlinkPathsSync: tO } = zI, { symlinkType: rO, symlinkTypeSync: nO } = XI, { pathExists: iO } = $n, { areIdentical: jy } = oi;
async function aO(e, t, r) {
  let n;
  try {
    n = await Ut.lstat(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const [s, c] = await Promise.all([
      Ut.stat(e),
      Ut.stat(t)
    ]);
    if (jy(s, c)) return;
  }
  const i = await eO(e, t);
  e = i.toDst;
  const a = await rO(i.toCwd, r), o = My.dirname(t);
  return await iO(o) || await QI(o), Ut.symlink(e, t, a);
}
function oO(e, t, r) {
  let n;
  try {
    n = Ut.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const s = Ut.statSync(e), c = Ut.statSync(t);
    if (jy(s, c)) return;
  }
  const i = tO(e, t);
  e = i.toDst, r = nO(i.toCwd, r);
  const a = My.dirname(t);
  return Ut.existsSync(a) || ZI(a), Ut.symlinkSync(e, t, r);
}
var sO = {
  createSymlink: JI(aO),
  createSymlinkSync: oO
};
const { createFile: sh, createFileSync: ch } = LI, { createLink: lh, createLinkSync: uh } = BI, { createSymlink: fh, createSymlinkSync: dh } = sO;
var cO = {
  // file
  createFile: sh,
  createFileSync: ch,
  ensureFile: sh,
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
const Qa = Vp;
var lO = {
  // jsonfile exports
  readJson: Qa.readFile,
  readJsonSync: Qa.readFileSync,
  writeJson: Qa.writeFile,
  writeJsonSync: Qa.writeFileSync
};
const uO = fe.fromPromise, Uc = ut, By = ce, qy = Gt, fO = $n.pathExists;
async function dO(e, t, r = "utf-8") {
  const n = By.dirname(e);
  return await fO(n) || await qy.mkdirs(n), Uc.writeFile(e, t, r);
}
function hO(e, ...t) {
  const r = By.dirname(e);
  Uc.existsSync(r) || qy.mkdirsSync(r), Uc.writeFileSync(e, ...t);
}
var kl = {
  outputFile: uO(dO),
  outputFileSync: hO
};
const { stringify: pO } = ma, { outputFile: mO } = kl;
async function yO(e, t, r = {}) {
  const n = pO(t, r);
  await mO(e, n, r);
}
var gO = yO;
const { stringify: vO } = ma, { outputFileSync: _O } = kl;
function $O(e, t, r) {
  const n = vO(t, r);
  _O(e, n, r);
}
var wO = $O;
const EO = fe.fromPromise, st = lO;
st.outputJson = EO(gO);
st.outputJsonSync = wO;
st.outputJSON = st.outputJson;
st.outputJSONSync = st.outputJsonSync;
st.writeJSON = st.writeJson;
st.writeJSONSync = st.writeJsonSync;
st.readJSON = st.readJson;
st.readJSONSync = st.readJsonSync;
var SO = st;
const bO = ut, hh = ce, { copy: PO } = Dl, { remove: Hy } = us, { mkdirp: TO } = Gt, { pathExists: AO } = $n, ph = oi;
async function IO(e, t, r = {}) {
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: a = !1 } = await ph.checkPaths(e, t, "move", r);
  await ph.checkParentPaths(e, i, t, "move");
  const o = hh.dirname(t);
  return hh.parse(o).root !== o && await TO(o), OO(e, t, n, a);
}
async function OO(e, t, r, n) {
  if (!n) {
    if (r)
      await Hy(t);
    else if (await AO(t))
      throw new Error("dest already exists.");
  }
  try {
    await bO.rename(e, t);
  } catch (i) {
    if (i.code !== "EXDEV")
      throw i;
    await CO(e, t, r);
  }
}
async function CO(e, t, r) {
  return await PO(e, t, {
    overwrite: r,
    errorOnExist: !0,
    preserveTimestamps: !0
  }), Hy(e);
}
var RO = IO;
const Gy = ke, Mc = ce, NO = Dl.copySync, Vy = us.removeSync, DO = Gt.mkdirpSync, mh = oi;
function kO(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: a = !1 } = mh.checkPathsSync(e, t, "move", r);
  return mh.checkParentPathsSync(e, i, t, "move"), FO(t) || DO(Mc.dirname(t)), LO(e, t, n, a);
}
function FO(e) {
  const t = Mc.dirname(e);
  return Mc.parse(t).root === t;
}
function LO(e, t, r, n) {
  if (n) return lc(e, t, r);
  if (r)
    return Vy(t), lc(e, t, r);
  if (Gy.existsSync(t)) throw new Error("dest already exists.");
  return lc(e, t, r);
}
function lc(e, t, r) {
  try {
    Gy.renameSync(e, t);
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
  }), Vy(e);
}
var UO = kO;
const MO = fe.fromPromise;
var jO = {
  move: MO(RO),
  moveSync: UO
}, BO = {
  // Export promiseified graceful-fs:
  ...ut,
  // Export extra methods:
  ...Dl,
  ...NI,
  ...cO,
  ...SO,
  ...Gt,
  ...jO,
  ...kl,
  ...$n,
  ...us
};
const me = /* @__PURE__ */ jo(BO), pn = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
}, uc = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), qO = new Set("0123456789");
function fs(e) {
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
function Fl(e, t) {
  if (typeof t != "number" && Array.isArray(e)) {
    const r = Number.parseInt(t, 10);
    return Number.isInteger(r) && e[r] === e[t];
  }
  return !1;
}
function zy(e, t) {
  if (Fl(e, t))
    throw new Error("Cannot use string index");
}
function HO(e, t, r) {
  if (!pn(e) || typeof t != "string")
    return r === void 0 ? e : r;
  const n = fs(t);
  if (n.length === 0)
    return r;
  for (let i = 0; i < n.length; i++) {
    const a = n[i];
    if (Fl(e, a) ? e = i === n.length - 1 ? void 0 : null : e = e[a], e == null) {
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
  const n = e, i = fs(t);
  for (let a = 0; a < i.length; a++) {
    const o = i[a];
    zy(e, o), a === i.length - 1 ? e[o] = r : pn(e[o]) || (e[o] = typeof i[a + 1] == "number" ? [] : {}), e = e[o];
  }
  return n;
}
function GO(e, t) {
  if (!pn(e) || typeof t != "string")
    return !1;
  const r = fs(t);
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    if (zy(e, i), n === r.length - 1)
      return delete e[i], !0;
    if (e = e[i], !pn(e))
      return !1;
  }
}
function VO(e, t) {
  if (!pn(e) || typeof t != "string")
    return !1;
  const r = fs(t);
  if (r.length === 0)
    return !1;
  for (const n of r) {
    if (!pn(e) || !(n in e) || Fl(e, n))
      return !1;
    e = e[n];
  }
  return !0;
}
const Er = Mo.homedir(), Ll = Mo.tmpdir(), { env: qn } = De, zO = (e) => {
  const t = ee.join(Er, "Library");
  return {
    data: ee.join(t, "Application Support", e),
    config: ee.join(t, "Preferences", e),
    cache: ee.join(t, "Caches", e),
    log: ee.join(t, "Logs", e),
    temp: ee.join(Ll, e)
  };
}, WO = (e) => {
  const t = qn.APPDATA || ee.join(Er, "AppData", "Roaming"), r = qn.LOCALAPPDATA || ee.join(Er, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: ee.join(r, e, "Data"),
    config: ee.join(t, e, "Config"),
    cache: ee.join(r, e, "Cache"),
    log: ee.join(r, e, "Log"),
    temp: ee.join(Ll, e)
  };
}, KO = (e) => {
  const t = ee.basename(Er);
  return {
    data: ee.join(qn.XDG_DATA_HOME || ee.join(Er, ".local", "share"), e),
    config: ee.join(qn.XDG_CONFIG_HOME || ee.join(Er, ".config"), e),
    cache: ee.join(qn.XDG_CACHE_HOME || ee.join(Er, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: ee.join(qn.XDG_STATE_HOME || ee.join(Er, ".local", "state"), e),
    temp: ee.join(Ll, t, e)
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
    return ZO.schedule().then((o) => {
      const s = (f) => (o(), f), c = (f) => {
        if (o(), Date.now() >= n)
          throw f;
        if (t(f)) {
          const l = Math.round(100 * Math.random());
          return new Promise((d) => setTimeout(d, l)).then(() => i.apply(void 0, a));
        }
        throw f;
      };
      return e.apply(void 0, a).then(s, c);
    });
  };
}, mr = (e, t) => function(n) {
  return function i(...a) {
    try {
      return e.apply(void 0, a);
    } catch (o) {
      if (Date.now() > n)
        throw o;
      if (t(o))
        return i.apply(void 0, a);
      throw o;
    }
  };
}, Ke = {
  attempt: {
    /* ASYNC */
    chmod: hr(ze(oe.chmod), Ee.onChangeError),
    chown: hr(ze(oe.chown), Ee.onChangeError),
    close: hr(ze(oe.close), yt),
    fsync: hr(ze(oe.fsync), yt),
    mkdir: hr(ze(oe.mkdir), yt),
    realpath: hr(ze(oe.realpath), yt),
    stat: hr(ze(oe.stat), yt),
    unlink: hr(ze(oe.unlink), yt),
    /* SYNC */
    chmodSync: Kt(oe.chmodSync, Ee.onChangeError),
    chownSync: Kt(oe.chownSync, Ee.onChangeError),
    closeSync: Kt(oe.closeSync, yt),
    existsSync: Kt(oe.existsSync, yt),
    fsyncSync: Kt(oe.fsync, yt),
    mkdirSync: Kt(oe.mkdirSync, yt),
    realpathSync: Kt(oe.realpathSync, yt),
    statSync: Kt(oe.statSync, yt),
    unlinkSync: Kt(oe.unlinkSync, yt)
  },
  retry: {
    /* ASYNC */
    close: pr(ze(oe.close), Ee.isRetriableError),
    fsync: pr(ze(oe.fsync), Ee.isRetriableError),
    open: pr(ze(oe.open), Ee.isRetriableError),
    readFile: pr(ze(oe.readFile), Ee.isRetriableError),
    rename: pr(ze(oe.rename), Ee.isRetriableError),
    stat: pr(ze(oe.stat), Ee.isRetriableError),
    write: pr(ze(oe.write), Ee.isRetriableError),
    writeFile: pr(ze(oe.writeFile), Ee.isRetriableError),
    /* SYNC */
    closeSync: mr(oe.closeSync, Ee.isRetriableError),
    fsyncSync: mr(oe.fsyncSync, Ee.isRetriableError),
    openSync: mr(oe.openSync, Ee.isRetriableError),
    readFileSync: mr(oe.readFileSync, Ee.isRetriableError),
    renameSync: mr(oe.renameSync, Ee.isRetriableError),
    statSync: mr(oe.statSync, Ee.isRetriableError),
    writeSync: mr(oe.writeSync, Ee.isRetriableError),
    writeFileSync: mr(oe.writeFileSync, Ee.isRetriableError)
  }
}, eC = "utf8", gh = 438, tC = 511, rC = {}, nC = Mo.userInfo().uid, iC = Mo.userInfo().gid, aC = 1e3, oC = !!De.getuid;
De.getuid && De.getuid();
const vh = 128, sC = (e) => e instanceof Error && "code" in e, _h = (e) => typeof e == "string", fc = (e) => e === void 0, cC = De.platform === "linux", Wy = De.platform === "win32", xl = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"];
Wy || xl.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
cC && xl.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
class lC {
  /* CONSTRUCTOR */
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.exited = !1, this.exit = (t) => {
      if (!this.exited) {
        this.exited = !0;
        for (const r of this.callbacks)
          r();
        t && (Wy && t !== "SIGINT" && t !== "SIGTERM" && t !== "SIGKILL" ? De.kill(De.pid, "SIGTERM") : De.kill(De.pid, t));
      }
    }, this.hook = () => {
      De.once("exit", () => this.exit());
      for (const t of xl)
        try {
          De.once(t, () => this.exit(t));
        } catch {
        }
    }, this.register = (t) => (this.callbacks.add(t), () => {
      this.callbacks.delete(t);
    }), this.hook();
  }
}
const uC = new lC(), fC = uC.register, Ye = {
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
    const t = ee.basename(e);
    if (t.length <= vh)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - vh;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
fC(Ye.purgeSyncAll);
function Ky(e, t, r = rC) {
  if (_h(r))
    return Ky(e, t, { encoding: r });
  const n = Date.now() + ((r.timeout ?? aC) || -1);
  let i = null, a = null, o = null;
  try {
    const s = Ke.attempt.realpathSync(e), c = !!s;
    e = s || e, [a, i] = Ye.get(e, r.tmpCreate || Ye.create, r.tmpPurge !== !1);
    const f = oC && fc(r.chown), l = fc(r.mode);
    if (c && (f || l)) {
      const u = Ke.attempt.statSync(e);
      u && (r = { ...r }, f && (r.chown = { uid: u.uid, gid: u.gid }), l && (r.mode = u.mode));
    }
    if (!c) {
      const u = ee.dirname(e);
      Ke.attempt.mkdirSync(u, {
        mode: tC,
        recursive: !0
      });
    }
    o = Ke.retry.openSync(n)(a, "w", r.mode || gh), r.tmpCreated && r.tmpCreated(a), _h(t) ? Ke.retry.writeSync(n)(o, t, 0, r.encoding || eC) : fc(t) || Ke.retry.writeSync(n)(o, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? Ke.retry.fsyncSync(n)(o) : Ke.attempt.fsync(o)), Ke.retry.closeSync(n)(o), o = null, r.chown && (r.chown.uid !== nC || r.chown.gid !== iC) && Ke.attempt.chownSync(a, r.chown.uid, r.chown.gid), r.mode && r.mode !== gh && Ke.attempt.chmodSync(a, r.mode);
    try {
      Ke.retry.renameSync(n)(a, e);
    } catch (u) {
      if (!sC(u) || u.code !== "ENAMETOOLONG")
        throw u;
      Ke.retry.renameSync(n)(a, Ye.truncate(e));
    }
    i(), a = null;
  } finally {
    o && Ke.attempt.closeSync(o), a && Ye.purge(a);
  }
}
var jc = { exports: {} }, Ul = {}, Tt = {}, ei = {}, Ta = {}, ne = {}, la = {};
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
      return (w = this._str) !== null && w !== void 0 ? w : this._str = this._items.reduce((I, C) => `${I}${C}`, "");
    }
    get names() {
      var w;
      return (w = this._names) !== null && w !== void 0 ? w : this._names = this._items.reduce((I, C) => (C instanceof r && (I[C.str] = (I[C.str] || 0) + 1), I), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function i(v, ...w) {
    const I = [v[0]];
    let C = 0;
    for (; C < w.length; )
      s(I, w[C]), I.push(v[++C]);
    return new n(I);
  }
  e._ = i;
  const a = new n("+");
  function o(v, ...w) {
    const I = [p(v[0])];
    let C = 0;
    for (; C < w.length; )
      I.push(a), s(I, w[C]), I.push(a, p(v[++C]));
    return c(I), new n(I);
  }
  e.str = o;
  function s(v, w) {
    w instanceof n ? v.push(...w._items) : w instanceof r ? v.push(w) : v.push(u(w));
  }
  e.addCodeArg = s;
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
    return w.emptyStr() ? v : v.emptyStr() ? w : o`${v}${w}`;
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
  const o = (0, t._)`\n`;
  class s extends i {
    constructor(f) {
      super(f), this._values = {}, this._scope = f.scope, this.opts = { ...f, _n: f.lines ? o : t.nil };
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
  e.ValueScope = s;
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
  class o extends a {
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
  class s extends a {
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
      return Q($, this.rhs);
    }
  }
  class c extends s {
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
      return Q($, this.condition), this.else && H($, this.else.names), $;
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
  class C extends w {
    constructor($, S, D, m) {
      super(), this.varKind = $, this.name = S, this.from = D, this.to = m;
    }
    render($) {
      const S = $.es5 ? r.varKinds.var : this.varKind, { name: D, from: m, to: h } = this;
      return `for(${S} ${D}=${m}; ${D}<${h}; ${D}++)` + super.render($);
    }
    get names() {
      const $ = Q(super.names, this.from);
      return Q($, this.to);
    }
  }
  class M extends w {
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
  class X extends y {
    constructor($, S, D) {
      super(), this.name = $, this.args = S, this.async = D;
    }
    render($) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render($);
    }
  }
  X.kind = "func";
  class W extends p {
    render($) {
      return "return " + super.render($);
    }
  }
  W.kind = "return";
  class de extends y {
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
  class J extends y {
    render($) {
      return "finally" + super.render($);
    }
  }
  J.kind = "finally";
  class j {
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
      return D !== void 0 && m && (this._constants[h.str] = D), this._leafNode(new o($, h, D)), h;
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
      return this._leafNode(new s($, S, D));
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
      return this._for(new C(h, N, S, D), () => m(N));
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
      return this._for(new M("of", m, h, S), () => D(h));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn($, S, D, m = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf($, (0, t._)`Object.keys(${S})`, D);
      const h = this._scope.toName($);
      return this._for(new M("in", m, h, S), () => D(h));
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
      const S = new W();
      if (this._blockNode(S), this.code($), S.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(W);
    }
    // `try` statement
    try($, S, D) {
      if (!S && !D)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const m = new de();
      if (this._blockNode(m), this.code($), S) {
        const h = this.name("e");
        this._currNode = m.catch = new b(h), S(h);
      }
      return D && (this._currNode = m.finally = new J(), this.code(D)), this._endBlockNode(b, J);
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
      return this._blockNode(new X($, S, D)), m && this.code(m).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(X);
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
  e.CodeGen = j;
  function H(O, $) {
    for (const S in $)
      O[S] = (O[S] || 0) + ($[S] || 0);
    return O;
  }
  function Q(O, $) {
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
    return typeof O == "boolean" || typeof O == "number" || O === null ? !O : (0, t._)`!${R(O)}`;
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
    return ($, S) => $ === t.nil ? S : S === t.nil ? $ : (0, t._)`${R($)} ${O} ${R(S)}`;
  }
  function R(O) {
    return O instanceof t.Name ? O : (0, t._)`(${O})`;
  }
})(ne);
var V = {};
Object.defineProperty(V, "__esModule", { value: !0 });
V.checkStrictMode = V.getErrorPath = V.Type = V.useFunc = V.setEvaluated = V.evaluatedPropsToName = V.mergeEvaluated = V.eachItem = V.unescapeJsonPointer = V.escapeJsonPointer = V.escapeFragment = V.unescapeFragment = V.schemaRefOrVal = V.schemaHasRulesButRef = V.schemaHasRules = V.checkUnknownRules = V.alwaysValidSchema = V.toHash = void 0;
const ye = ne, dC = la;
function hC(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
V.toHash = hC;
function pC(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Yy(e, t), !Xy(t, e.self.RULES.all));
}
V.alwaysValidSchema = pC;
function Yy(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const i = n.RULES.keywords;
  for (const a in t)
    i[a] || Zy(e, `unknown keyword: "${a}"`);
}
V.checkUnknownRules = Yy;
function Xy(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
V.schemaHasRules = Xy;
function mC(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
V.schemaHasRulesButRef = mC;
function yC({ topSchemaRef: e, schemaPath: t }, r, n, i) {
  if (!i) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ye._)`${r}`;
  }
  return (0, ye._)`${e}${t}${(0, ye.getProperty)(n)}`;
}
V.schemaRefOrVal = yC;
function gC(e) {
  return Jy(decodeURIComponent(e));
}
V.unescapeFragment = gC;
function vC(e) {
  return encodeURIComponent(Ml(e));
}
V.escapeFragment = vC;
function Ml(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
V.escapeJsonPointer = Ml;
function Jy(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
V.unescapeJsonPointer = Jy;
function _C(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
V.eachItem = _C;
function $h({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (i, a, o, s) => {
    const c = o === void 0 ? a : o instanceof ye.Name ? (a instanceof ye.Name ? e(i, a, o) : t(i, a, o), o) : a instanceof ye.Name ? (t(i, o, a), a) : r(a, o);
    return s === ye.Name && !(c instanceof ye.Name) ? n(i, c) : c;
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
    resultToName: Qy
  }),
  items: $h({
    mergeNames: (e, t, r) => e.if((0, ye._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ye._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ye._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ye._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Qy(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ye._)`{}`);
  return t !== void 0 && jl(e, r, t), r;
}
V.evaluatedPropsToName = Qy;
function jl(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ye._)`${t}${(0, ye.getProperty)(n)}`, !0));
}
V.setEvaluated = jl;
const wh = {};
function $C(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: wh[t.code] || (wh[t.code] = new dC._Code(t.code))
  });
}
V.useFunc = $C;
var qc;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(qc || (V.Type = qc = {}));
function wC(e, t, r) {
  if (e instanceof ye.Name) {
    const n = t === qc.Num;
    return r ? n ? (0, ye._)`"[" + ${e} + "]"` : (0, ye._)`"['" + ${e} + "']"` : n ? (0, ye._)`"/" + ${e}` : (0, ye._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ye.getProperty)(e).toString() : "/" + Ml(e);
}
V.getErrorPath = wC;
function Zy(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
V.checkStrictMode = Zy;
var vt = {};
Object.defineProperty(vt, "__esModule", { value: !0 });
const We = ne, EC = {
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
vt.default = EC;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = ne, r = V, n = vt;
  e.keywordError = {
    message: ({ keyword: _ }) => (0, t.str)`must pass "${_}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: _, schemaType: v }) => v ? (0, t.str)`"${_}" keyword must be ${v} ($data)` : (0, t.str)`"${_}" keyword is invalid ($data)`
  };
  function i(_, v = e.keywordError, w, I) {
    const { it: C } = _, { gen: M, compositeRule: X, allErrors: W } = C, de = u(_, v, w);
    I ?? (X || W) ? c(M, de) : f(C, (0, t._)`[${de}]`);
  }
  e.reportError = i;
  function a(_, v = e.keywordError, w) {
    const { it: I } = _, { gen: C, compositeRule: M, allErrors: X } = I, W = u(_, v, w);
    c(C, W), M || X || f(I, n.default.vErrors);
  }
  e.reportExtraError = a;
  function o(_, v) {
    _.assign(n.default.errors, v), _.if((0, t._)`${n.default.vErrors} !== null`, () => _.if(v, () => _.assign((0, t._)`${n.default.vErrors}.length`, v), () => _.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = o;
  function s({ gen: _, keyword: v, schemaValue: w, data: I, errsCount: C, it: M }) {
    if (C === void 0)
      throw new Error("ajv implementation error");
    const X = _.name("err");
    _.forRange("i", C, n.default.errors, (W) => {
      _.const(X, (0, t._)`${n.default.vErrors}[${W}]`), _.if((0, t._)`${X}.instancePath === undefined`, () => _.assign((0, t._)`${X}.instancePath`, (0, t.strConcat)(n.default.instancePath, M.errorPath))), _.assign((0, t._)`${X}.schemaPath`, (0, t.str)`${M.errSchemaPath}/${v}`), M.opts.verbose && (_.assign((0, t._)`${X}.schema`, w), _.assign((0, t._)`${X}.data`, I));
    });
  }
  e.extendErrors = s;
  function c(_, v) {
    const w = _.const("err", v);
    _.if((0, t._)`${n.default.vErrors} === null`, () => _.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), _.code((0, t._)`${n.default.errors}++`);
  }
  function f(_, v) {
    const { gen: w, validateName: I, schemaEnv: C } = _;
    C.$async ? w.throw((0, t._)`new ${_.ValidationError}(${v})`) : (w.assign((0, t._)`${I}.errors`, v), w.return(!1));
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
    const { gen: I, it: C } = _, M = [
      p(C, w),
      y(_, w)
    ];
    return g(_, v, M), I.object(...M);
  }
  function p({ errorPath: _ }, { instancePath: v }) {
    const w = v ? (0, t.str)`${_}${(0, r.getErrorPath)(v, r.Type.Str)}` : _;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function y({ keyword: _, it: { errSchemaPath: v } }, { schemaPath: w, parentSchema: I }) {
    let C = I ? v : (0, t.str)`${v}/${_}`;
    return w && (C = (0, t.str)`${C}${(0, r.getErrorPath)(w, r.Type.Str)}`), [l.schemaPath, C];
  }
  function g(_, { params: v, message: w }, I) {
    const { keyword: C, data: M, schemaValue: X, it: W } = _, { opts: de, propertyName: b, topSchemaRef: J, schemaPath: j } = W;
    I.push([l.keyword, C], [l.params, typeof v == "function" ? v(_) : v || (0, t._)`{}`]), de.messages && I.push([l.message, typeof w == "function" ? w(_) : w]), de.verbose && I.push([l.schema, X], [l.parentSchema, (0, t._)`${J}${j}`], [n.default.data, M]), b && I.push([l.propertyName, b]);
  }
})(Ta);
Object.defineProperty(ei, "__esModule", { value: !0 });
ei.boolOrEmptySchema = ei.topBoolOrEmptySchema = void 0;
const SC = Ta, bC = ne, PC = vt, TC = {
  message: "boolean schema is false"
};
function AC(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? e0(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(PC.default.data) : (t.assign((0, bC._)`${n}.errors`, null), t.return(!0));
}
ei.topBoolOrEmptySchema = AC;
function IC(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), e0(e)) : r.var(t, !0);
}
ei.boolOrEmptySchema = IC;
function e0(e, t) {
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
  (0, SC.reportError)(i, TC, void 0, t);
}
var Ne = {}, mn = {};
Object.defineProperty(mn, "__esModule", { value: !0 });
mn.getRules = mn.isJSONType = void 0;
const OC = ["string", "number", "integer", "boolean", "null", "object", "array"], CC = new Set(OC);
function RC(e) {
  return typeof e == "string" && CC.has(e);
}
mn.isJSONType = RC;
function NC() {
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
mn.getRules = NC;
var Zt = {};
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.shouldUseRule = Zt.shouldUseGroup = Zt.schemaHasRulesForType = void 0;
function DC({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && t0(e, n);
}
Zt.schemaHasRulesForType = DC;
function t0(e, t) {
  return t.rules.some((r) => r0(e, r));
}
Zt.shouldUseGroup = t0;
function r0(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Zt.shouldUseRule = r0;
Object.defineProperty(Ne, "__esModule", { value: !0 });
Ne.reportTypeError = Ne.checkDataTypes = Ne.checkDataType = Ne.coerceAndCheckDataType = Ne.getJSONTypes = Ne.getSchemaTypes = Ne.DataType = void 0;
const kC = mn, FC = Zt, LC = Ta, ae = ne, n0 = V;
var Wn;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Wn || (Ne.DataType = Wn = {}));
function xC(e) {
  const t = i0(e.type);
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
Ne.getSchemaTypes = xC;
function i0(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(kC.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Ne.getJSONTypes = i0;
function UC(e, t) {
  const { gen: r, data: n, opts: i } = e, a = MC(t, i.coerceTypes), o = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, FC.schemaHasRulesForType)(e, t[0]));
  if (o) {
    const s = Bl(t, n, i.strictNumbers, Wn.Wrong);
    r.if(s, () => {
      a.length ? jC(e, t, a) : ql(e);
    });
  }
  return o;
}
Ne.coerceAndCheckDataType = UC;
const a0 = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function MC(e, t) {
  return t ? e.filter((r) => a0.has(r) || t === "array" && r === "array") : [];
}
function jC(e, t, r) {
  const { gen: n, data: i, opts: a } = e, o = n.let("dataType", (0, ae._)`typeof ${i}`), s = n.let("coerced", (0, ae._)`undefined`);
  a.coerceTypes === "array" && n.if((0, ae._)`${o} == 'object' && Array.isArray(${i}) && ${i}.length == 1`, () => n.assign(i, (0, ae._)`${i}[0]`).assign(o, (0, ae._)`typeof ${i}`).if(Bl(t, i, a.strictNumbers), () => n.assign(s, i))), n.if((0, ae._)`${s} !== undefined`);
  for (const f of r)
    (a0.has(f) || f === "array" && a.coerceTypes === "array") && c(f);
  n.else(), ql(e), n.endIf(), n.if((0, ae._)`${s} !== undefined`, () => {
    n.assign(i, s), BC(e, s);
  });
  function c(f) {
    switch (f) {
      case "string":
        n.elseIf((0, ae._)`${o} == "number" || ${o} == "boolean"`).assign(s, (0, ae._)`"" + ${i}`).elseIf((0, ae._)`${i} === null`).assign(s, (0, ae._)`""`);
        return;
      case "number":
        n.elseIf((0, ae._)`${o} == "boolean" || ${i} === null
              || (${o} == "string" && ${i} && ${i} == +${i})`).assign(s, (0, ae._)`+${i}`);
        return;
      case "integer":
        n.elseIf((0, ae._)`${o} === "boolean" || ${i} === null
              || (${o} === "string" && ${i} && ${i} == +${i} && !(${i} % 1))`).assign(s, (0, ae._)`+${i}`);
        return;
      case "boolean":
        n.elseIf((0, ae._)`${i} === "false" || ${i} === 0 || ${i} === null`).assign(s, !1).elseIf((0, ae._)`${i} === "true" || ${i} === 1`).assign(s, !0);
        return;
      case "null":
        n.elseIf((0, ae._)`${i} === "" || ${i} === 0 || ${i} === false`), n.assign(s, null);
        return;
      case "array":
        n.elseIf((0, ae._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${i} === null`).assign(s, (0, ae._)`[${i}]`);
    }
  }
}
function BC({ gen: e, parentData: t, parentDataProperty: r }, n) {
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
      a = o((0, ae._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = o();
      break;
    default:
      return (0, ae._)`typeof ${t} ${i} ${e}`;
  }
  return n === Wn.Correct ? a : (0, ae.not)(a);
  function o(s = ae.nil) {
    return (0, ae.and)((0, ae._)`typeof ${t} == "number"`, s, r ? (0, ae._)`isFinite(${t})` : ae.nil);
  }
}
Ne.checkDataType = Hc;
function Bl(e, t, r, n) {
  if (e.length === 1)
    return Hc(e[0], t, r, n);
  let i;
  const a = (0, n0.toHash)(e);
  if (a.array && a.object) {
    const o = (0, ae._)`typeof ${t} != "object"`;
    i = a.null ? o : (0, ae._)`!${t} || ${o}`, delete a.null, delete a.array, delete a.object;
  } else
    i = ae.nil;
  a.number && delete a.integer;
  for (const o in a)
    i = (0, ae.and)(i, Hc(o, t, r, n));
  return i;
}
Ne.checkDataTypes = Bl;
const qC = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, ae._)`{type: ${e}}` : (0, ae._)`{type: ${t}}`
};
function ql(e) {
  const t = HC(e);
  (0, LC.reportError)(t, qC);
}
Ne.reportTypeError = ql;
function HC(e) {
  const { gen: t, data: r, schema: n } = e, i = (0, n0.schemaRefOrVal)(e, n, "type");
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
var ds = {};
Object.defineProperty(ds, "__esModule", { value: !0 });
ds.assignDefaults = void 0;
const Nn = ne, GC = V;
function VC(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const i in r)
      Eh(e, i, r[i].default);
  else t === "array" && Array.isArray(n) && n.forEach((i, a) => Eh(e, a, i.default));
}
ds.assignDefaults = VC;
function Eh(e, t, r) {
  const { gen: n, compositeRule: i, data: a, opts: o } = e;
  if (r === void 0)
    return;
  const s = (0, Nn._)`${a}${(0, Nn.getProperty)(t)}`;
  if (i) {
    (0, GC.checkStrictMode)(e, `default is ignored for: ${s}`);
    return;
  }
  let c = (0, Nn._)`${s} === undefined`;
  o.useDefaults === "empty" && (c = (0, Nn._)`${c} || ${s} === null || ${s} === ""`), n.if(c, (0, Nn._)`${s} = ${(0, Nn.stringify)(r)}`);
}
var jt = {}, se = {};
Object.defineProperty(se, "__esModule", { value: !0 });
se.validateUnion = se.validateArray = se.usePattern = se.callValidateCode = se.schemaProperties = se.allSchemaProperties = se.noPropertyInData = se.propertyInData = se.isOwnProperty = se.hasPropFunc = se.reportMissingProp = se.checkMissingProp = se.checkReportMissingProp = void 0;
const $e = ne, Hl = V, yr = vt, zC = V;
function WC(e, t) {
  const { gen: r, data: n, it: i } = e;
  r.if(Vl(r, n, t, i.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, $e._)`${t}` }, !0), e.error();
  });
}
se.checkReportMissingProp = WC;
function KC({ gen: e, data: t, it: { opts: r } }, n, i) {
  return (0, $e.or)(...n.map((a) => (0, $e.and)(Vl(e, t, a, r.ownProperties), (0, $e._)`${i} = ${a}`)));
}
se.checkMissingProp = KC;
function YC(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
se.reportMissingProp = YC;
function o0(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, $e._)`Object.prototype.hasOwnProperty`
  });
}
se.hasPropFunc = o0;
function Gl(e, t, r) {
  return (0, $e._)`${o0(e)}.call(${t}, ${r})`;
}
se.isOwnProperty = Gl;
function XC(e, t, r, n) {
  const i = (0, $e._)`${t}${(0, $e.getProperty)(r)} !== undefined`;
  return n ? (0, $e._)`${i} && ${Gl(e, t, r)}` : i;
}
se.propertyInData = XC;
function Vl(e, t, r, n) {
  const i = (0, $e._)`${t}${(0, $e.getProperty)(r)} === undefined`;
  return n ? (0, $e.or)(i, (0, $e.not)(Gl(e, t, r))) : i;
}
se.noPropertyInData = Vl;
function s0(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
se.allSchemaProperties = s0;
function JC(e, t) {
  return s0(t).filter((r) => !(0, Hl.alwaysValidSchema)(e, t[r]));
}
se.schemaProperties = JC;
function QC({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: i, errorPath: a }, it: o }, s, c, f) {
  const l = f ? (0, $e._)`${e}, ${t}, ${n}${i}` : t, u = [
    [yr.default.instancePath, (0, $e.strConcat)(yr.default.instancePath, a)],
    [yr.default.parentData, o.parentData],
    [yr.default.parentDataProperty, o.parentDataProperty],
    [yr.default.rootData, yr.default.rootData]
  ];
  o.opts.dynamicRef && u.push([yr.default.dynamicAnchors, yr.default.dynamicAnchors]);
  const d = (0, $e._)`${l}, ${r.object(...u)}`;
  return c !== $e.nil ? (0, $e._)`${s}.call(${c}, ${d})` : (0, $e._)`${s}(${d})`;
}
se.callValidateCode = QC;
const ZC = (0, $e._)`new RegExp`;
function eR({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: i } = t.code, a = i(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, $e._)`${i.code === "new RegExp" ? ZC : (0, zC.useFunc)(e, i)}(${r}, ${n})`
  });
}
se.usePattern = eR;
function tR(e) {
  const { gen: t, data: r, keyword: n, it: i } = e, a = t.name("valid");
  if (i.allErrors) {
    const s = t.let("valid", !0);
    return o(() => t.assign(s, !1)), s;
  }
  return t.var(a, !0), o(() => t.break()), a;
  function o(s) {
    const c = t.const("len", (0, $e._)`${r}.length`);
    t.forRange("i", 0, c, (f) => {
      e.subschema({
        keyword: n,
        dataProp: f,
        dataPropType: Hl.Type.Num
      }, a), t.if((0, $e.not)(a), s);
    });
  }
}
se.validateArray = tR;
function rR(e) {
  const { gen: t, schema: r, keyword: n, it: i } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, Hl.alwaysValidSchema)(i, c)) && !i.opts.unevaluated)
    return;
  const o = t.let("valid", !1), s = t.name("_valid");
  t.block(() => r.forEach((c, f) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: f,
      compositeRule: !0
    }, s);
    t.assign(o, (0, $e._)`${o} || ${s}`), e.mergeValidEvaluated(l, s) || t.if((0, $e.not)(o));
  })), e.result(o, () => e.reset(), () => e.error(!0));
}
se.validateUnion = rR;
Object.defineProperty(jt, "__esModule", { value: !0 });
jt.validateKeywordUsage = jt.validSchemaType = jt.funcKeywordCode = jt.macroKeywordCode = void 0;
const tt = ne, on = vt, nR = se, iR = Ta;
function aR(e, t) {
  const { gen: r, keyword: n, schema: i, parentSchema: a, it: o } = e, s = t.macro.call(o.self, i, a, o), c = c0(r, n, s);
  o.opts.validateSchema !== !1 && o.self.validateSchema(s, !0);
  const f = r.name("valid");
  e.subschema({
    schema: s,
    schemaPath: tt.nil,
    errSchemaPath: `${o.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, f), e.pass(f, () => e.error(!0));
}
jt.macroKeywordCode = aR;
function oR(e, t) {
  var r;
  const { gen: n, keyword: i, schema: a, parentSchema: o, $data: s, it: c } = e;
  cR(c, t);
  const f = !s && t.compile ? t.compile.call(c.self, a, o, c) : t.validate, l = c0(n, i, f), u = n.let("valid");
  e.block$data(u, d), e.ok((r = t.valid) !== null && r !== void 0 ? r : u);
  function d() {
    if (t.errors === !1)
      g(), t.modifying && Sh(e), _(() => e.error());
    else {
      const v = t.async ? p() : y();
      t.modifying && Sh(e), _(() => sR(e, v));
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
    const w = c.opts.passContext ? on.default.this : on.default.self, I = !("compile" in t && !s || t.schema === !1);
    n.assign(u, (0, tt._)`${v}${(0, nR.callValidateCode)(e, l, w, I)}`, t.modifying);
  }
  function _(v) {
    var w;
    n.if((0, tt.not)((w = t.valid) !== null && w !== void 0 ? w : u), v);
  }
}
jt.funcKeywordCode = oR;
function Sh(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, tt._)`${n.parentData}[${n.parentDataProperty}]`));
}
function sR(e, t) {
  const { gen: r } = e;
  r.if((0, tt._)`Array.isArray(${t})`, () => {
    r.assign(on.default.vErrors, (0, tt._)`${on.default.vErrors} === null ? ${t} : ${on.default.vErrors}.concat(${t})`).assign(on.default.errors, (0, tt._)`${on.default.vErrors}.length`), (0, iR.extendErrors)(e);
  }, () => e.error());
}
function cR({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function c0(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, tt.stringify)(r) });
}
function lR(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
jt.validSchemaType = lR;
function uR({ schema: e, opts: t, self: r, errSchemaPath: n }, i, a) {
  if (Array.isArray(i.keyword) ? !i.keyword.includes(a) : i.keyword !== a)
    throw new Error("ajv implementation error");
  const o = i.dependencies;
  if (o != null && o.some((s) => !Object.prototype.hasOwnProperty.call(e, s)))
    throw new Error(`parent schema must have dependencies of ${a}: ${o.join(",")}`);
  if (i.validateSchema && !i.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(i.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
jt.validateKeywordUsage = uR;
var Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.extendSubschemaMode = Or.extendSubschemaData = Or.getSubschema = void 0;
const Mt = ne, l0 = V;
function fR(e, { keyword: t, schemaProp: r, schema: n, schemaPath: i, errSchemaPath: a, topSchemaRef: o }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const s = e.schema[t];
    return r === void 0 ? {
      schema: s,
      schemaPath: (0, Mt._)`${e.schemaPath}${(0, Mt.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: s[r],
      schemaPath: (0, Mt._)`${e.schemaPath}${(0, Mt.getProperty)(t)}${(0, Mt.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, l0.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (i === void 0 || a === void 0 || o === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: i,
      topSchemaRef: o,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
Or.getSubschema = fR;
function dR(e, t, { dataProp: r, dataPropType: n, data: i, dataTypes: a, propertyName: o }) {
  if (i !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: s } = t;
  if (r !== void 0) {
    const { errorPath: f, dataPathArr: l, opts: u } = t, d = s.let("data", (0, Mt._)`${t.data}${(0, Mt.getProperty)(r)}`, !0);
    c(d), e.errorPath = (0, Mt.str)`${f}${(0, l0.getErrorPath)(r, n, u.jsPropertySyntax)}`, e.parentDataProperty = (0, Mt._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (i !== void 0) {
    const f = i instanceof Mt.Name ? i : s.let("data", i, !0);
    c(f), o !== void 0 && (e.propertyName = o);
  }
  a && (e.dataTypes = a);
  function c(f) {
    e.data = f, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, f];
  }
}
Or.extendSubschemaData = dR;
function hR(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: i, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), i !== void 0 && (e.createErrors = i), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Or.extendSubschemaMode = hR;
var qe = {}, u0 = function e(t, r) {
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
      var o = a[i];
      if (!e(t[o], r[o])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, f0 = { exports: {} }, Ar = f0.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, i = r.post || function() {
  };
  fo(t, n, i, e, "", e);
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
function fo(e, t, r, n, i, a, o, s, c, f) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, i, a, o, s, c, f);
    for (var l in n) {
      var u = n[l];
      if (Array.isArray(u)) {
        if (l in Ar.arrayKeywords)
          for (var d = 0; d < u.length; d++)
            fo(e, t, r, u[d], i + "/" + l + "/" + d, a, i, l, n, d);
      } else if (l in Ar.propsKeywords) {
        if (u && typeof u == "object")
          for (var p in u)
            fo(e, t, r, u[p], i + "/" + l + "/" + pR(p), a, i, l, n, p);
      } else (l in Ar.keywords || e.allKeys && !(l in Ar.skipKeywords)) && fo(e, t, r, u, i + "/" + l, a, i, l, n);
    }
    r(n, i, a, o, s, c, f);
  }
}
function pR(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var mR = f0.exports;
Object.defineProperty(qe, "__esModule", { value: !0 });
qe.getSchemaRefs = qe.resolveUrl = qe.normalizeId = qe._getFullPath = qe.getFullPath = qe.inlineRef = void 0;
const yR = V, gR = u0, vR = mR, _R = /* @__PURE__ */ new Set([
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
function $R(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Gc(e) : t ? d0(e) <= t : !1;
}
qe.inlineRef = $R;
const wR = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Gc(e) {
  for (const t in e) {
    if (wR.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Gc) || typeof r == "object" && Gc(r))
      return !0;
  }
  return !1;
}
function d0(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !_R.has(r) && (typeof e[r] == "object" && (0, yR.eachItem)(e[r], (n) => t += d0(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function h0(e, t = "", r) {
  r !== !1 && (t = Kn(t));
  const n = e.parse(t);
  return p0(e, n);
}
qe.getFullPath = h0;
function p0(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
qe._getFullPath = p0;
const ER = /#\/?$/;
function Kn(e) {
  return e ? e.replace(ER, "") : "";
}
qe.normalizeId = Kn;
function SR(e, t, r) {
  return r = Kn(r), e.resolve(t, r);
}
qe.resolveUrl = SR;
const bR = /^[a-z_][-a-z0-9._]*$/i;
function PR(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, i = Kn(e[r] || t), a = { "": i }, o = h0(n, i, !1), s = {}, c = /* @__PURE__ */ new Set();
  return vR(e, { allKeys: !0 }, (u, d, p, y) => {
    if (y === void 0)
      return;
    const g = o + d;
    let _ = a[y];
    typeof u[r] == "string" && (_ = v.call(this, u[r])), w.call(this, u.$anchor), w.call(this, u.$dynamicAnchor), a[d] = _;
    function v(I) {
      const C = this.opts.uriResolver.resolve;
      if (I = Kn(_ ? C(_, I) : I), c.has(I))
        throw l(I);
      c.add(I);
      let M = this.refs[I];
      return typeof M == "string" && (M = this.refs[M]), typeof M == "object" ? f(u, M.schema, I) : I !== Kn(g) && (I[0] === "#" ? (f(u, s[I], I), s[I] = u) : this.refs[I] = g), I;
    }
    function w(I) {
      if (typeof I == "string") {
        if (!bR.test(I))
          throw new Error(`invalid anchor "${I}"`);
        v.call(this, `#${I}`);
      }
    }
  }), s;
  function f(u, d, p) {
    if (d !== void 0 && !gR(u, d))
      throw l(p);
  }
  function l(u) {
    return new Error(`reference "${u}" resolves to more than one schema`);
  }
}
qe.getSchemaRefs = PR;
Object.defineProperty(Tt, "__esModule", { value: !0 });
Tt.getData = Tt.KeywordCxt = Tt.validateFunctionCode = void 0;
const m0 = ei, bh = Ne, zl = Zt, Ro = Ne, TR = ds, Mi = jt, dc = Or, K = ne, te = vt, AR = qe, er = V, Ai = Ta;
function IR(e) {
  if (v0(e) && (_0(e), g0(e))) {
    RR(e);
    return;
  }
  y0(e, () => (0, m0.topBoolOrEmptySchema)(e));
}
Tt.validateFunctionCode = IR;
function y0({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: i }, a) {
  i.code.es5 ? e.func(t, (0, K._)`${te.default.data}, ${te.default.valCxt}`, n.$async, () => {
    e.code((0, K._)`"use strict"; ${Ph(r, i)}`), CR(e, i), e.code(a);
  }) : e.func(t, (0, K._)`${te.default.data}, ${OR(i)}`, n.$async, () => e.code(Ph(r, i)).code(a));
}
function OR(e) {
  return (0, K._)`{${te.default.instancePath}="", ${te.default.parentData}, ${te.default.parentDataProperty}, ${te.default.rootData}=${te.default.data}${e.dynamicRef ? (0, K._)`, ${te.default.dynamicAnchors}={}` : K.nil}}={}`;
}
function CR(e, t) {
  e.if(te.default.valCxt, () => {
    e.var(te.default.instancePath, (0, K._)`${te.default.valCxt}.${te.default.instancePath}`), e.var(te.default.parentData, (0, K._)`${te.default.valCxt}.${te.default.parentData}`), e.var(te.default.parentDataProperty, (0, K._)`${te.default.valCxt}.${te.default.parentDataProperty}`), e.var(te.default.rootData, (0, K._)`${te.default.valCxt}.${te.default.rootData}`), t.dynamicRef && e.var(te.default.dynamicAnchors, (0, K._)`${te.default.valCxt}.${te.default.dynamicAnchors}`);
  }, () => {
    e.var(te.default.instancePath, (0, K._)`""`), e.var(te.default.parentData, (0, K._)`undefined`), e.var(te.default.parentDataProperty, (0, K._)`undefined`), e.var(te.default.rootData, te.default.data), t.dynamicRef && e.var(te.default.dynamicAnchors, (0, K._)`{}`);
  });
}
function RR(e) {
  const { schema: t, opts: r, gen: n } = e;
  y0(e, () => {
    r.$comment && t.$comment && w0(e), LR(e), n.let(te.default.vErrors, null), n.let(te.default.errors, 0), r.unevaluated && NR(e), $0(e), MR(e);
  });
}
function NR(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, K._)`${r}.evaluated`), t.if((0, K._)`${e.evaluated}.dynamicProps`, () => t.assign((0, K._)`${e.evaluated}.props`, (0, K._)`undefined`)), t.if((0, K._)`${e.evaluated}.dynamicItems`, () => t.assign((0, K._)`${e.evaluated}.items`, (0, K._)`undefined`));
}
function Ph(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, K._)`/*# sourceURL=${r} */` : K.nil;
}
function DR(e, t) {
  if (v0(e) && (_0(e), g0(e))) {
    kR(e, t);
    return;
  }
  (0, m0.boolOrEmptySchema)(e, t);
}
function g0({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function v0(e) {
  return typeof e.schema != "boolean";
}
function kR(e, t) {
  const { schema: r, gen: n, opts: i } = e;
  i.$comment && r.$comment && w0(e), xR(e), UR(e);
  const a = n.const("_errs", te.default.errors);
  $0(e, a), n.var(t, (0, K._)`${a} === ${te.default.errors}`);
}
function _0(e) {
  (0, er.checkUnknownRules)(e), FR(e);
}
function $0(e, t) {
  if (e.opts.jtd)
    return Th(e, [], !1, t);
  const r = (0, bh.getSchemaTypes)(e.schema), n = (0, bh.coerceAndCheckDataType)(e, r);
  Th(e, r, !n, t);
}
function FR(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: i } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, er.schemaHasRulesButRef)(t, i.RULES) && i.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function LR(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, er.checkStrictMode)(e, "default is ignored in the schema root");
}
function xR(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, AR.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function UR(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function w0({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: i }) {
  const a = r.$comment;
  if (i.$comment === !0)
    e.code((0, K._)`${te.default.self}.logger.log(${a})`);
  else if (typeof i.$comment == "function") {
    const o = (0, K.str)`${n}/$comment`, s = e.scopeValue("root", { ref: t.root });
    e.code((0, K._)`${te.default.self}.opts.$comment(${a}, ${o}, ${s}.schema)`);
  }
}
function MR(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: i, opts: a } = e;
  r.$async ? t.if((0, K._)`${te.default.errors} === 0`, () => t.return(te.default.data), () => t.throw((0, K._)`new ${i}(${te.default.vErrors})`)) : (t.assign((0, K._)`${n}.errors`, te.default.vErrors), a.unevaluated && jR(e), t.return((0, K._)`${te.default.errors} === 0`));
}
function jR({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof K.Name && e.assign((0, K._)`${t}.props`, r), n instanceof K.Name && e.assign((0, K._)`${t}.items`, n);
}
function Th(e, t, r, n) {
  const { gen: i, schema: a, data: o, allErrors: s, opts: c, self: f } = e, { RULES: l } = f;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, er.schemaHasRulesButRef)(a, l))) {
    i.block(() => b0(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || BR(e, t), i.block(() => {
    for (const d of l.rules)
      u(d);
    u(l.post);
  });
  function u(d) {
    (0, zl.shouldUseGroup)(a, d) && (d.type ? (i.if((0, Ro.checkDataType)(d.type, o, c.strictNumbers)), Ah(e, d), t.length === 1 && t[0] === d.type && r && (i.else(), (0, Ro.reportTypeError)(e)), i.endIf()) : Ah(e, d), s || i.if((0, K._)`${te.default.errors} === ${n || 0}`));
  }
}
function Ah(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: i } } = e;
  i && (0, TR.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, zl.shouldUseRule)(n, a) && b0(e, a.keyword, a.definition, t.type);
  });
}
function BR(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (qR(e, t), e.opts.allowUnionTypes || HR(e, t), GR(e, e.dataTypes));
}
function qR(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      E0(e.dataTypes, r) || Wl(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), zR(e, t);
  }
}
function HR(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Wl(e, "use allowUnionTypes to allow union type keyword");
}
function GR(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const i = r[n];
    if (typeof i == "object" && (0, zl.shouldUseRule)(e.schema, i)) {
      const { type: a } = i.definition;
      a.length && !a.some((o) => VR(t, o)) && Wl(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function VR(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function E0(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function zR(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    E0(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function Wl(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, er.checkStrictMode)(e, t, e.opts.strictTypes);
}
class S0 {
  constructor(t, r, n) {
    if ((0, Mi.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, er.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", P0(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Mi.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", te.default.errors));
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
    const { gen: n, schemaCode: i, schemaType: a, def: o } = this;
    n.if((0, K.or)((0, K._)`${i} === undefined`, r)), t !== K.nil && n.assign(t, !0), (a.length || o.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== K.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: i, it: a } = this;
    return (0, K.or)(o(), s());
    function o() {
      if (n.length) {
        if (!(r instanceof K.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, K._)`${(0, Ro.checkDataTypes)(c, r, a.opts.strictNumbers, Ro.DataType.Wrong)}`;
      }
      return K.nil;
    }
    function s() {
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
    return DR(i, r), i;
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
Tt.KeywordCxt = S0;
function b0(e, t, r, n) {
  const i = new S0(e, r, t);
  "code" in r ? r.code(i, n) : i.$data && r.validate ? (0, Mi.funcKeywordCode)(i, r) : "macro" in r ? (0, Mi.macroKeywordCode)(i, r) : (r.compile || r.validate) && (0, Mi.funcKeywordCode)(i, r);
}
const WR = /^\/(?:[^~]|~0|~1)*$/, KR = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function P0(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let i, a;
  if (e === "")
    return te.default.rootData;
  if (e[0] === "/") {
    if (!WR.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    i = e, a = te.default.rootData;
  } else {
    const f = KR.exec(e);
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
  let o = a;
  const s = i.split("/");
  for (const f of s)
    f && (a = (0, K._)`${a}${(0, K.getProperty)((0, er.unescapeJsonPointer)(f))}`, o = (0, K._)`${o} && ${a}`);
  return o;
  function c(f, l) {
    return `Cannot access ${f} ${l} levels up, current level is ${t}`;
  }
}
Tt.getData = P0;
var si = {};
Object.defineProperty(si, "__esModule", { value: !0 });
class YR extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
si.default = YR;
var wn = {};
Object.defineProperty(wn, "__esModule", { value: !0 });
const hc = qe;
class XR extends Error {
  constructor(t, r, n, i) {
    super(i || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, hc.resolveUrl)(t, r, n), this.missingSchema = (0, hc.normalizeId)((0, hc.getFullPath)(t, this.missingRef));
  }
}
wn.default = XR;
var rt = {};
Object.defineProperty(rt, "__esModule", { value: !0 });
rt.resolveSchema = rt.getCompilingSchema = rt.resolveRef = rt.compileSchema = rt.SchemaEnv = void 0;
const Ot = ne, JR = si, Qr = vt, Nt = qe, Ih = V, QR = Tt;
class hs {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Nt.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
rt.SchemaEnv = hs;
function Kl(e) {
  const t = T0.call(this, e);
  if (t)
    return t;
  const r = (0, Nt.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: i } = this.opts.code, { ownProperties: a } = this.opts, o = new Ot.CodeGen(this.scope, { es5: n, lines: i, ownProperties: a });
  let s;
  e.$async && (s = o.scopeValue("Error", {
    ref: JR.default,
    code: (0, Ot._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = o.scopeName("validate");
  e.validateName = c;
  const f = {
    gen: o,
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
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Ot.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: s,
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
    this._compilations.add(e), (0, QR.validateFunctionCode)(f), o.optimize(this.opts.code.optimize);
    const u = o.toString();
    l = `${o.scopeRefs(Qr.default.scope)}return ${u}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const p = new Function(`${Qr.default.self}`, `${Qr.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: p }), p.errors = null, p.schema = e.schema, p.schemaEnv = e, e.$async && (p.$async = !0), this.opts.code.source === !0 && (p.source = { validateName: c, validateCode: u, scopeValues: o._values }), this.opts.unevaluated) {
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
rt.compileSchema = Kl;
function ZR(e, t, r) {
  var n;
  r = (0, Nt.resolveUrl)(this.opts.uriResolver, t, r);
  const i = e.refs[r];
  if (i)
    return i;
  let a = rN.call(this, e, r);
  if (a === void 0) {
    const o = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: s } = this.opts;
    o && (a = new hs({ schema: o, schemaId: s, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = eN.call(this, a);
}
rt.resolveRef = ZR;
function eN(e) {
  return (0, Nt.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Kl.call(this, e);
}
function T0(e) {
  for (const t of this._compilations)
    if (tN(t, e))
      return t;
}
rt.getCompilingSchema = T0;
function tN(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function rN(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || ps.call(this, e, t);
}
function ps(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Nt._getFullPath)(this.opts.uriResolver, r);
  let i = (0, Nt.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === i)
    return pc.call(this, r, e);
  const a = (0, Nt.normalizeId)(n), o = this.refs[a] || this.schemas[a];
  if (typeof o == "string") {
    const s = ps.call(this, e, o);
    return typeof (s == null ? void 0 : s.schema) != "object" ? void 0 : pc.call(this, r, s);
  }
  if (typeof (o == null ? void 0 : o.schema) == "object") {
    if (o.validate || Kl.call(this, o), a === (0, Nt.normalizeId)(t)) {
      const { schema: s } = o, { schemaId: c } = this.opts, f = s[c];
      return f && (i = (0, Nt.resolveUrl)(this.opts.uriResolver, i, f)), new hs({ schema: s, schemaId: c, root: e, baseId: i });
    }
    return pc.call(this, r, o);
  }
}
rt.resolveSchema = ps;
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
  for (const s of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Ih.unescapeFragment)(s)];
    if (c === void 0)
      return;
    r = c;
    const f = typeof r == "object" && r[this.opts.schemaId];
    !nN.has(s) && f && (t = (0, Nt.resolveUrl)(this.opts.uriResolver, t, f));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, Ih.schemaHasRulesButRef)(r, this.RULES)) {
    const s = (0, Nt.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = ps.call(this, n, s);
  }
  const { schemaId: o } = this.opts;
  if (a = a || new hs({ schema: r, schemaId: o, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const iN = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", aN = "Meta-schema for $data reference (JSON AnySchema extension proposal)", oN = "object", sN = [
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
  type: oN,
  required: sN,
  properties: cN,
  additionalProperties: lN
};
var Yl = {}, ms = { exports: {} };
const fN = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), A0 = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function I0(e) {
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
    const n = I0(e);
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
  let a = !1, o = !1, s = hN;
  for (let c = 0; c < e.length; c++) {
    const f = e[c];
    if (!(f === "[" || f === "]"))
      if (f === ":") {
        if (a === !0 && (o = !0), !s(i, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        c > 0 && e[c - 1] === ":" && (a = !0), n.push(":");
        continue;
      } else if (f === "%") {
        if (!s(i, n, r))
          break;
        s = Oh;
      } else {
        i.push(f);
        continue;
      }
  }
  return i.length && (s === Oh ? r.zone = i.join("") : o ? n.push(i.join("")) : n.push(I0(i))), r.address = n.join(""), r;
}
function O0(e) {
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
    if (!A0(r)) {
      const n = O0(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var C0 = {
  nonSimpleDomain: dN,
  recomposeAuthority: vN,
  normalizeComponentEncoding: gN,
  removeDotSegments: yN,
  isIPv4: A0,
  isUUID: fN,
  normalizeIPv6: O0
};
const { isUUID: _N } = C0, $N = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function R0(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function N0(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function D0(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function wN(e) {
  return e.secure = R0(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function EN(e) {
  if ((e.port === (R0(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
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
    const i = `${n}:${t.nid || e.nid}`, a = Xl(i);
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function bN(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), i = `${r}:${t.nid || n}`, a = Xl(i);
  a && (e = a.serialize(e, t));
  const o = e, s = e.nss;
  return o.path = `${n || t.nid}:${s}`, t.skipEscape = !0, o;
}
function PN(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !_N(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function TN(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const k0 = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: N0,
    serialize: D0
  }
), AN = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: k0.domainHost,
    parse: N0,
    serialize: D0
  }
), ho = (
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
    domainHost: ho.domainHost,
    parse: ho.parse,
    serialize: ho.serialize
  }
), ON = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: SN,
    serialize: bN,
    skipNormalize: !0
  }
), CN = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: PN,
    serialize: TN,
    skipNormalize: !0
  }
), No = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: k0,
    https: AN,
    ws: ho,
    wss: IN,
    urn: ON,
    "urn:uuid": CN
  }
);
Object.setPrototypeOf(No, null);
function Xl(e) {
  return e && (No[
    /** @type {SchemeName} */
    e
  ] || No[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var RN = {
  SCHEMES: No,
  getSchemeHandler: Xl
};
const { normalizeIPv6: NN, removeDotSegments: Ri, recomposeAuthority: DN, normalizeComponentEncoding: Za, isIPv4: kN, nonSimpleDomain: FN } = C0, { SCHEMES: LN, getSchemeHandler: F0 } = RN;
function xN(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  Bt(nr(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  nr(Bt(e, t), t)), e;
}
function UN(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, i = L0(nr(e, n), nr(t, n), n, !0);
  return n.skipEscape = !0, Bt(i, n);
}
function L0(e, t, r, n) {
  const i = {};
  return n || (e = nr(Bt(e, r), r), t = nr(Bt(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (i.scheme = t.scheme, i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = Ri(t.path || ""), i.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = Ri(t.path || ""), i.query = t.query) : (t.path ? (t.path[0] === "/" ? i.path = Ri(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? i.path = "/" + t.path : e.path ? i.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : i.path = t.path, i.path = Ri(i.path)), i.query = t.query) : (i.path = e.path, t.query !== void 0 ? i.query = t.query : i.query = e.query), i.userinfo = e.userinfo, i.host = e.host, i.port = e.port), i.scheme = e.scheme), i.fragment = t.fragment, i;
}
function MN(e, t, r) {
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
  }, n = Object.assign({}, t), i = [], a = F0(n.scheme || r.scheme);
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && i.push(r.scheme, ":");
  const o = DN(r);
  if (o !== void 0 && (n.reference !== "suffix" && i.push("//"), i.push(o), r.path && r.path[0] !== "/" && i.push("/")), r.path !== void 0) {
    let s = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (s = Ri(s)), o === void 0 && s[0] === "/" && s[1] === "/" && (s = "/%2F" + s.slice(2)), i.push(s);
  }
  return r.query !== void 0 && i.push("?", r.query), r.fragment !== void 0 && i.push("#", r.fragment), i.join("");
}
const jN = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
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
  const a = e.match(jN);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host)
      if (kN(n.host) === !1) {
        const c = NN(n.host);
        n.host = c.host.toLowerCase(), i = c.isIPV6;
      } else
        i = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const o = F0(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!o || !o.unicodeSupport) && n.host && (r.domainHost || o && o.domainHost) && i === !1 && FN(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (s) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + s;
      }
    (!o || o && !o.skipNormalize) && (e.indexOf("%") !== -1 && (n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), n.host !== void 0 && (n.host = unescape(n.host))), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), o && o.parse && o.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const Jl = {
  SCHEMES: LN,
  normalize: xN,
  resolve: UN,
  resolveComponent: L0,
  equal: MN,
  serialize: Bt,
  parse: nr
};
ms.exports = Jl;
ms.exports.default = Jl;
ms.exports.fastUri = Jl;
var BN = ms.exports;
Object.defineProperty(Yl, "__esModule", { value: !0 });
const x0 = BN;
x0.code = 'require("ajv/dist/runtime/uri").default';
Yl.default = x0;
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
  const n = si, i = wn, a = mn, o = rt, s = ne, c = qe, f = Ne, l = V, u = uN, d = Yl, p = (k, T) => new RegExp(k, T);
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
    var T, R, O, $, S, D, m, h, N, P, Z, he, ve, Ie, Ce, _t, Se, Ze, Gr, or, Vt, sr, di, hi, pi;
    const Vr = k.strict, cr = (T = k.code) === null || T === void 0 ? void 0 : T.optimize, En = cr === !0 || cr === void 0 ? 1 : cr || 0, mi = (O = (R = k.code) === null || R === void 0 ? void 0 : R.regExp) !== null && O !== void 0 ? O : p, $t = ($ = k.uriResolver) !== null && $ !== void 0 ? $ : d.default;
    return {
      strictSchema: (D = (S = k.strictSchema) !== null && S !== void 0 ? S : Vr) !== null && D !== void 0 ? D : !0,
      strictNumbers: (h = (m = k.strictNumbers) !== null && m !== void 0 ? m : Vr) !== null && h !== void 0 ? h : !0,
      strictTypes: (P = (N = k.strictTypes) !== null && N !== void 0 ? N : Vr) !== null && P !== void 0 ? P : "log",
      strictTuples: (he = (Z = k.strictTuples) !== null && Z !== void 0 ? Z : Vr) !== null && he !== void 0 ? he : "log",
      strictRequired: (Ie = (ve = k.strictRequired) !== null && ve !== void 0 ? ve : Vr) !== null && Ie !== void 0 ? Ie : !1,
      code: k.code ? { ...k.code, optimize: En, regExp: mi } : { optimize: En, regExp: mi },
      loopRequired: (Ce = k.loopRequired) !== null && Ce !== void 0 ? Ce : w,
      loopEnum: (_t = k.loopEnum) !== null && _t !== void 0 ? _t : w,
      meta: (Se = k.meta) !== null && Se !== void 0 ? Se : !0,
      messages: (Ze = k.messages) !== null && Ze !== void 0 ? Ze : !0,
      inlineRefs: (Gr = k.inlineRefs) !== null && Gr !== void 0 ? Gr : !0,
      schemaId: (or = k.schemaId) !== null && or !== void 0 ? or : "$id",
      addUsedSchema: (Vt = k.addUsedSchema) !== null && Vt !== void 0 ? Vt : !0,
      validateSchema: (sr = k.validateSchema) !== null && sr !== void 0 ? sr : !0,
      validateFormats: (di = k.validateFormats) !== null && di !== void 0 ? di : !0,
      unicodeRegExp: (hi = k.unicodeRegExp) !== null && hi !== void 0 ? hi : !0,
      int32range: (pi = k.int32range) !== null && pi !== void 0 ? pi : !0,
      uriResolver: $t
    };
  }
  class C {
    constructor(T = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), T = this.opts = { ...T, ...I(T) };
      const { es5: R, lines: O } = this.opts.code;
      this.scope = new s.ValueScope({ scope: {}, prefixes: g, es5: R, lines: O }), this.logger = H(T.logger);
      const $ = T.validateFormats;
      T.validateFormats = !1, this.RULES = (0, a.getRules)(), M.call(this, _, T, "NOT SUPPORTED"), M.call(this, v, T, "DEPRECATED", "warn"), this._metaOpts = J.call(this), T.formats && de.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), T.keywords && b.call(this, T.keywords), typeof T.meta == "object" && this.addMetaSchema(T.meta), W.call(this), T.validateFormats = $;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: T, meta: R, schemaId: O } = this.opts;
      let $ = u;
      O === "id" && ($ = { ...u }, $.id = $.$id, delete $.$id), R && T && this.addMetaSchema($, $[O], !1);
    }
    defaultMeta() {
      const { meta: T, schemaId: R } = this.opts;
      return this.opts.defaultMeta = typeof T == "object" ? T[R] || T : void 0;
    }
    validate(T, R) {
      let O;
      if (typeof T == "string") {
        if (O = this.getSchema(T), !O)
          throw new Error(`no schema with key or ref "${T}"`);
      } else
        O = this.compile(T);
      const $ = O(R);
      return "$async" in O || (this.errors = O.errors), $;
    }
    compile(T, R) {
      const O = this._addSchema(T, R);
      return O.validate || this._compileSchemaEnv(O);
    }
    compileAsync(T, R) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: O } = this.opts;
      return $.call(this, T, R);
      async function $(P, Z) {
        await S.call(this, P.$schema);
        const he = this._addSchema(P, Z);
        return he.validate || D.call(this, he);
      }
      async function S(P) {
        P && !this.getSchema(P) && await $.call(this, { $ref: P }, !0);
      }
      async function D(P) {
        try {
          return this._compileSchemaEnv(P);
        } catch (Z) {
          if (!(Z instanceof i.default))
            throw Z;
          return m.call(this, Z), await h.call(this, Z.missingSchema), D.call(this, P);
        }
      }
      function m({ missingSchema: P, missingRef: Z }) {
        if (this.refs[P])
          throw new Error(`AnySchema ${P} is loaded but ${Z} cannot be resolved`);
      }
      async function h(P) {
        const Z = await N.call(this, P);
        this.refs[P] || await S.call(this, Z.$schema), this.refs[P] || this.addSchema(Z, P, R);
      }
      async function N(P) {
        const Z = this._loading[P];
        if (Z)
          return Z;
        try {
          return await (this._loading[P] = O(P));
        } finally {
          delete this._loading[P];
        }
      }
    }
    // Adds schema to the instance
    addSchema(T, R, O, $ = this.opts.validateSchema) {
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
      return R = (0, c.normalizeId)(R || S), this._checkUnique(R), this.schemas[R] = this._addSchema(T, O, R, $, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(T, R, O = this.opts.validateSchema) {
      return this.addSchema(T, R, !0, O), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(T, R) {
      if (typeof T == "boolean")
        return !0;
      let O;
      if (O = T.$schema, O !== void 0 && typeof O != "string")
        throw new Error("$schema must be a string");
      if (O = O || this.opts.defaultMeta || this.defaultMeta(), !O)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const $ = this.validate(O, T);
      if (!$ && R) {
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
      let R;
      for (; typeof (R = X.call(this, T)) == "string"; )
        T = R;
      if (R === void 0) {
        const { schemaId: O } = this.opts, $ = new o.SchemaEnv({ schema: {}, schemaId: O });
        if (R = o.resolveSchema.call(this, $, T), !R)
          return;
        this.refs[T] = R;
      }
      return R.validate || this._compileSchemaEnv(R);
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
          const R = X.call(this, T);
          return typeof R == "object" && this._cache.delete(R.schema), delete this.schemas[T], delete this.refs[T], this;
        }
        case "object": {
          const R = T;
          this._cache.delete(R);
          let O = T[this.opts.schemaId];
          return O && (O = (0, c.normalizeId)(O), delete this.schemas[O], delete this.refs[O]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(T) {
      for (const R of T)
        this.addKeyword(R);
      return this;
    }
    addKeyword(T, R) {
      let O;
      if (typeof T == "string")
        O = T, typeof R == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), R.keyword = O);
      else if (typeof T == "object" && R === void 0) {
        if (R = T, O = R.keyword, Array.isArray(O) && !O.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (F.call(this, O, R), !R)
        return (0, l.eachItem)(O, (S) => L.call(this, S)), this;
      x.call(this, R);
      const $ = {
        ...R,
        type: (0, f.getJSONTypes)(R.type),
        schemaType: (0, f.getJSONTypes)(R.schemaType)
      };
      return (0, l.eachItem)(O, $.type.length === 0 ? (S) => L.call(this, S, $) : (S) => $.type.forEach((D) => L.call(this, S, $, D))), this;
    }
    getKeyword(T) {
      const R = this.RULES.all[T];
      return typeof R == "object" ? R.definition : !!R;
    }
    // Remove keyword
    removeKeyword(T) {
      const { RULES: R } = this;
      delete R.keywords[T], delete R.all[T];
      for (const O of R.rules) {
        const $ = O.rules.findIndex((S) => S.keyword === T);
        $ >= 0 && O.rules.splice($, 1);
      }
      return this;
    }
    // Add format
    addFormat(T, R) {
      return typeof R == "string" && (R = new RegExp(R)), this.formats[T] = R, this;
    }
    errorsText(T = this.errors, { separator: R = ", ", dataVar: O = "data" } = {}) {
      return !T || T.length === 0 ? "No errors" : T.map(($) => `${O}${$.instancePath} ${$.message}`).reduce(($, S) => $ + R + S);
    }
    $dataMetaSchema(T, R) {
      const O = this.RULES.all;
      T = JSON.parse(JSON.stringify(T));
      for (const $ of R) {
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
    _removeAllSchemas(T, R) {
      for (const O in T) {
        const $ = T[O];
        (!R || R.test(O)) && (typeof $ == "string" ? delete T[O] : $ && !$.meta && (this._cache.delete($.schema), delete T[O]));
      }
    }
    _addSchema(T, R, O, $ = this.opts.validateSchema, S = this.opts.addUsedSchema) {
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
      return h = new o.SchemaEnv({ schema: T, schemaId: m, meta: R, baseId: O, localRefs: N }), this._cache.set(h.schema, h), S && !O.startsWith("#") && (O && this._checkUnique(O), this.refs[O] = h), $ && this.validateSchema(T, !0), h;
    }
    _checkUnique(T) {
      if (this.schemas[T] || this.refs[T])
        throw new Error(`schema with key or id "${T}" already exists`);
    }
    _compileSchemaEnv(T) {
      if (T.meta ? this._compileMetaSchema(T) : o.compileSchema.call(this, T), !T.validate)
        throw new Error("ajv implementation error");
      return T.validate;
    }
    _compileMetaSchema(T) {
      const R = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, T);
      } finally {
        this.opts = R;
      }
    }
  }
  C.ValidationError = n.default, C.MissingRefError = i.default, e.default = C;
  function M(k, T, R, O = "error") {
    for (const $ in k) {
      const S = $;
      S in T && this.logger[O](`${R}: option ${$}. ${k[S]}`);
    }
  }
  function X(k) {
    return k = (0, c.normalizeId)(k), this.schemas[k] || this.refs[k];
  }
  function W() {
    const k = this.opts.schemas;
    if (k)
      if (Array.isArray(k))
        this.addSchema(k);
      else
        for (const T in k)
          this.addSchema(k[T], T);
  }
  function de() {
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
      const R = k[T];
      R.keyword || (R.keyword = T), this.addKeyword(R);
    }
  }
  function J() {
    const k = { ...this.opts };
    for (const T of y)
      delete k[T];
    return k;
  }
  const j = { log() {
  }, warn() {
  }, error() {
  } };
  function H(k) {
    if (k === !1)
      return j;
    if (k === void 0)
      return console;
    if (k.log && k.warn && k.error)
      return k;
    throw new Error("logger must implement log, warn and error methods");
  }
  const Q = /^[a-z_$][a-z0-9_$:-]*$/i;
  function F(k, T) {
    const { RULES: R } = this;
    if ((0, l.eachItem)(k, (O) => {
      if (R.keywords[O])
        throw new Error(`Keyword ${O} is already defined`);
      if (!Q.test(O))
        throw new Error(`Keyword ${O} has invalid name`);
    }), !!T && T.$data && !("code" in T || "validate" in T))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function L(k, T, R) {
    var O;
    const $ = T == null ? void 0 : T.post;
    if (R && $)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: S } = this;
    let D = $ ? S.post : S.rules.find(({ type: h }) => h === R);
    if (D || (D = { type: R, rules: [] }, S.rules.push(D)), S.keywords[k] = !0, !T)
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
  function q(k, T, R) {
    const O = k.rules.findIndex(($) => $.keyword === R);
    O >= 0 ? k.rules.splice(O, 0, T) : (k.rules.push(T), this.logger.warn(`rule ${R} is not defined`));
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
})(Ul);
var Ql = {}, ys = {}, Zl = {};
Object.defineProperty(Zl, "__esModule", { value: !0 });
const qN = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Zl.default = qN;
var ir = {};
Object.defineProperty(ir, "__esModule", { value: !0 });
ir.callRef = ir.getValidate = void 0;
const HN = wn, Ch = se, ft = ne, Dn = vt, Rh = rt, eo = V, GN = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: i, schemaEnv: a, validateName: o, opts: s, self: c } = n, { root: f } = a;
    if ((r === "#" || r === "#/") && i === f.baseId)
      return u();
    const l = Rh.resolveRef.call(c, f, i, r);
    if (l === void 0)
      throw new HN.default(n.opts.uriResolver, i, r);
    if (l instanceof Rh.SchemaEnv)
      return d(l);
    return p(l);
    function u() {
      if (a === f)
        return po(e, o, a, a.$async);
      const y = t.scopeValue("root", { ref: f });
      return po(e, (0, ft._)`${y}.validate`, f, f.$async);
    }
    function d(y) {
      const g = U0(e, y);
      po(e, g, y, y.$async);
    }
    function p(y) {
      const g = t.scopeValue("schema", s.code.source === !0 ? { ref: y, code: (0, ft.stringify)(y) } : { ref: y }), _ = t.name("valid"), v = e.subschema({
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
function U0(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, ft._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
ir.getValidate = U0;
function po(e, t, r, n) {
  const { gen: i, it: a } = e, { allErrors: o, schemaEnv: s, opts: c } = a, f = c.passContext ? Dn.default.this : ft.nil;
  n ? l() : u();
  function l() {
    if (!s.$async)
      throw new Error("async schema referenced by sync schema");
    const y = i.let("valid");
    i.try(() => {
      i.code((0, ft._)`await ${(0, Ch.callValidateCode)(e, t, f)}`), p(t), o || i.assign(y, !0);
    }, (g) => {
      i.if((0, ft._)`!(${g} instanceof ${a.ValidationError})`, () => i.throw(g)), d(g), o || i.assign(y, !1);
    }), e.ok(y);
  }
  function u() {
    e.result((0, Ch.callValidateCode)(e, t, f), () => p(t), () => d(t));
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
        _.props !== void 0 && (a.props = eo.mergeEvaluated.props(i, _.props, a.props));
      else {
        const v = i.var("props", (0, ft._)`${y}.evaluated.props`);
        a.props = eo.mergeEvaluated.props(i, v, a.props, ft.Name);
      }
    if (a.items !== !0)
      if (_ && !_.dynamicItems)
        _.items !== void 0 && (a.items = eo.mergeEvaluated.items(i, _.items, a.items));
      else {
        const v = i.var("items", (0, ft._)`${y}.evaluated.items`);
        a.items = eo.mergeEvaluated.items(i, v, a.items, ft.Name);
      }
  }
}
ir.callRef = po;
ir.default = GN;
Object.defineProperty(ys, "__esModule", { value: !0 });
const VN = Zl, zN = ir, WN = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  VN.default,
  zN.default
];
ys.default = WN;
var gs = {}, eu = {};
Object.defineProperty(eu, "__esModule", { value: !0 });
const Do = ne, gr = Do.operators, ko = {
  maximum: { okStr: "<=", ok: gr.LTE, fail: gr.GT },
  minimum: { okStr: ">=", ok: gr.GTE, fail: gr.LT },
  exclusiveMaximum: { okStr: "<", ok: gr.LT, fail: gr.GTE },
  exclusiveMinimum: { okStr: ">", ok: gr.GT, fail: gr.LTE }
}, KN = {
  message: ({ keyword: e, schemaCode: t }) => (0, Do.str)`must be ${ko[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Do._)`{comparison: ${ko[e].okStr}, limit: ${t}}`
}, YN = {
  keyword: Object.keys(ko),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: KN,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Do._)`${r} ${ko[t].fail} ${n} || isNaN(${r})`);
  }
};
eu.default = YN;
var tu = {};
Object.defineProperty(tu, "__esModule", { value: !0 });
const ji = ne, XN = {
  message: ({ schemaCode: e }) => (0, ji.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, ji._)`{multipleOf: ${e}}`
}, JN = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: XN,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: i } = e, a = i.opts.multipleOfPrecision, o = t.let("res"), s = a ? (0, ji._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${a}` : (0, ji._)`${o} !== parseInt(${o})`;
    e.fail$data((0, ji._)`(${n} === 0 || (${o} = ${r}/${n}, ${s}))`);
  }
};
tu.default = JN;
var ru = {}, nu = {};
Object.defineProperty(nu, "__esModule", { value: !0 });
function M0(e) {
  const t = e.length;
  let r = 0, n = 0, i;
  for (; n < t; )
    r++, i = e.charCodeAt(n++), i >= 55296 && i <= 56319 && n < t && (i = e.charCodeAt(n), (i & 64512) === 56320 && n++);
  return r;
}
nu.default = M0;
M0.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(ru, "__esModule", { value: !0 });
const sn = ne, QN = V, ZN = nu, eD = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, sn.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, sn._)`{limit: ${e}}`
}, tD = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: eD,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: i } = e, a = t === "maxLength" ? sn.operators.GT : sn.operators.LT, o = i.opts.unicode === !1 ? (0, sn._)`${r}.length` : (0, sn._)`${(0, QN.useFunc)(e.gen, ZN.default)}(${r})`;
    e.fail$data((0, sn._)`${o} ${a} ${n}`);
  }
};
ru.default = tD;
var iu = {};
Object.defineProperty(iu, "__esModule", { value: !0 });
const rD = se, Fo = ne, nD = {
  message: ({ schemaCode: e }) => (0, Fo.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Fo._)`{pattern: ${e}}`
}, iD = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: nD,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: i, it: a } = e, o = a.opts.unicodeRegExp ? "u" : "", s = r ? (0, Fo._)`(new RegExp(${i}, ${o}))` : (0, rD.usePattern)(e, n);
    e.fail$data((0, Fo._)`!${s}.test(${t})`);
  }
};
iu.default = iD;
var au = {};
Object.defineProperty(au, "__esModule", { value: !0 });
const Bi = ne, aD = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Bi.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Bi._)`{limit: ${e}}`
}, oD = {
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
au.default = oD;
var ou = {};
Object.defineProperty(ou, "__esModule", { value: !0 });
const Ii = se, qi = ne, sD = V, cD = {
  message: ({ params: { missingProperty: e } }) => (0, qi.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, qi._)`{missingProperty: ${e}}`
}, lD = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: cD,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: i, $data: a, it: o } = e, { opts: s } = o;
    if (!a && r.length === 0)
      return;
    const c = r.length >= s.loopRequired;
    if (o.allErrors ? f() : l(), s.strictRequired) {
      const p = e.parentSchema.properties, { definedProperties: y } = e.it;
      for (const g of r)
        if ((p == null ? void 0 : p[g]) === void 0 && !y.has(g)) {
          const _ = o.schemaEnv.baseId + o.errSchemaPath, v = `required property "${g}" is not defined at "${_}" (strictRequired)`;
          (0, sD.checkStrictMode)(o, v, o.opts.strictRequired);
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
        e.setParams({ missingProperty: p }), t.if((0, Ii.noPropertyInData)(t, i, p, s.ownProperties), () => e.error());
      });
    }
    function d(p, y) {
      e.setParams({ missingProperty: p }), t.forOf(p, n, () => {
        t.assign(y, (0, Ii.propertyInData)(t, i, p, s.ownProperties)), t.if((0, qi.not)(y), () => {
          e.error(), t.break();
        });
      }, qi.nil);
    }
  }
};
ou.default = lD;
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
var cu = {}, Aa = {};
Object.defineProperty(Aa, "__esModule", { value: !0 });
const j0 = u0;
j0.code = 'require("ajv/dist/runtime/equal").default';
Aa.default = j0;
Object.defineProperty(cu, "__esModule", { value: !0 });
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
    const { gen: t, data: r, $data: n, schema: i, parentSchema: a, schemaCode: o, it: s } = e;
    if (!n && !i)
      return;
    const c = t.let("valid"), f = a.items ? (0, mc.getSchemaTypes)(a.items) : [];
    e.block$data(c, l, (0, Be._)`${o} === false`), e.ok(c);
    function l() {
      const y = t.let("i", (0, Be._)`${r}.length`), g = t.let("j");
      e.setParams({ i: y, j: g }), t.assign(c, !0), t.if((0, Be._)`${y} > 1`, () => (u() ? d : p)(y, g));
    }
    function u() {
      return f.length > 0 && !f.some((y) => y === "object" || y === "array");
    }
    function d(y, g) {
      const _ = t.name("item"), v = (0, mc.checkDataTypes)(f, _, s.opts.strictNumbers, mc.DataType.Wrong), w = t.const("indices", (0, Be._)`{}`);
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
cu.default = mD;
var lu = {};
Object.defineProperty(lu, "__esModule", { value: !0 });
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
lu.default = _D;
var uu = {};
Object.defineProperty(uu, "__esModule", { value: !0 });
const Ni = ne, $D = V, wD = Aa, ED = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Ni._)`{allowedValues: ${e}}`
}, SD = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: ED,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, schemaCode: a, it: o } = e;
    if (!n && i.length === 0)
      throw new Error("enum must have non-empty array");
    const s = i.length >= o.opts.loopEnum;
    let c;
    const f = () => c ?? (c = (0, $D.useFunc)(t, wD.default));
    let l;
    if (s || n)
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
uu.default = SD;
Object.defineProperty(gs, "__esModule", { value: !0 });
const bD = eu, PD = tu, TD = ru, AD = iu, ID = au, OD = ou, CD = su, RD = cu, ND = lu, DD = uu, kD = [
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
  CD.default,
  RD.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  ND.default,
  DD.default
];
gs.default = kD;
var vs = {}, ci = {};
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
    B0(e, n);
  }
};
function B0(e, t) {
  const { gen: r, schema: n, data: i, keyword: a, it: o } = e;
  o.items = !0;
  const s = r.const("len", (0, cn._)`${i}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, cn._)`${s} <= ${t.length}`);
  else if (typeof n == "object" && !(0, zc.alwaysValidSchema)(o, n)) {
    const f = r.var("valid", (0, cn._)`${s} <= ${t.length}`);
    r.if((0, cn.not)(f), () => c(f)), e.ok(f);
  }
  function c(f) {
    r.forRange("i", t.length, s, (l) => {
      e.subschema({ keyword: a, dataProp: l, dataPropType: zc.Type.Num }, f), o.allErrors || r.if((0, cn.not)(f), () => r.break());
    });
  }
}
ci.validateAdditionalItems = B0;
ci.default = LD;
var fu = {}, li = {};
Object.defineProperty(li, "__esModule", { value: !0 });
li.validateTuple = void 0;
const Nh = ne, mo = V, xD = se, UD = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return q0(e, "additionalItems", t);
    r.items = !0, !(0, mo.alwaysValidSchema)(r, t) && e.ok((0, xD.validateArray)(e));
  }
};
function q0(e, t, r = e.schema) {
  const { gen: n, parentSchema: i, data: a, keyword: o, it: s } = e;
  l(i), s.opts.unevaluated && r.length && s.items !== !0 && (s.items = mo.mergeEvaluated.items(n, r.length, s.items));
  const c = n.name("valid"), f = n.const("len", (0, Nh._)`${a}.length`);
  r.forEach((u, d) => {
    (0, mo.alwaysValidSchema)(s, u) || (n.if((0, Nh._)`${f} > ${d}`, () => e.subschema({
      keyword: o,
      schemaProp: d,
      dataProp: d
    }, c)), e.ok(c));
  });
  function l(u) {
    const { opts: d, errSchemaPath: p } = s, y = r.length, g = y === u.minItems && (y === u.maxItems || u[t] === !1);
    if (d.strictTuples && !g) {
      const _ = `"${o}" is ${y}-tuple, but minItems or maxItems/${t} are not specified or different at path "${p}"`;
      (0, mo.checkStrictMode)(s, _, d.strictTuples);
    }
  }
}
li.validateTuple = q0;
li.default = UD;
Object.defineProperty(fu, "__esModule", { value: !0 });
const MD = li, jD = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, MD.validateTuple)(e, "items")
};
fu.default = jD;
var du = {};
Object.defineProperty(du, "__esModule", { value: !0 });
const Dh = ne, BD = V, qD = se, HD = ci, GD = {
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
du.default = VD;
var hu = {};
Object.defineProperty(hu, "__esModule", { value: !0 });
const Pt = ne, to = V, zD = {
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
    let o, s;
    const { minContains: c, maxContains: f } = n;
    a.opts.next ? (o = c === void 0 ? 1 : c, s = f) : o = 1;
    const l = t.const("len", (0, Pt._)`${i}.length`);
    if (e.setParams({ min: o, max: s }), s === void 0 && o === 0) {
      (0, to.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (s !== void 0 && o > s) {
      (0, to.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, to.alwaysValidSchema)(a, r)) {
      let g = (0, Pt._)`${l} >= ${o}`;
      s !== void 0 && (g = (0, Pt._)`${g} && ${l} <= ${s}`), e.pass(g);
      return;
    }
    a.items = !0;
    const u = t.name("valid");
    s === void 0 && o === 1 ? p(u, () => t.if(u, () => t.break())) : o === 0 ? (t.let(u, !0), s !== void 0 && t.if((0, Pt._)`${i}.length > 0`, d)) : (t.let(u, !1), d()), e.result(u, () => e.reset());
    function d() {
      const g = t.name("_valid"), _ = t.let("count", 0);
      p(g, () => t.if(g, () => y(_)));
    }
    function p(g, _) {
      t.forRange("i", 0, l, (v) => {
        e.subschema({
          keyword: "contains",
          dataProp: v,
          dataPropType: to.Type.Num,
          compositeRule: !0
        }, g), _();
      });
    }
    function y(g) {
      t.code((0, Pt._)`${g}++`), s === void 0 ? t.if((0, Pt._)`${g} >= ${o}`, () => t.assign(u, !0).break()) : (t.if((0, Pt._)`${g} > ${s}`, () => t.assign(u, !1).break()), o === 1 ? t.assign(u, !0) : t.if((0, Pt._)`${g} >= ${o}`, () => t.assign(u, !0)));
    }
  }
};
hu.default = WD;
var _s = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = ne, r = V, n = se;
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
      o(c, f), s(c, l);
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
  function o(c, f = c.schema) {
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
  e.validatePropertyDeps = o;
  function s(c, f = c.schema) {
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
  e.validateSchemaDeps = s, e.default = i;
})(_s);
var pu = {};
Object.defineProperty(pu, "__esModule", { value: !0 });
const H0 = ne, KD = V, YD = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, H0._)`{propertyName: ${e.propertyName}}`
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
    t.forIn("key", n, (o) => {
      e.setParams({ propertyName: o }), e.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: !0
      }, a), t.if((0, H0.not)(a), () => {
        e.error(!0), i.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
pu.default = XD;
var $s = {};
Object.defineProperty($s, "__esModule", { value: !0 });
const ro = se, Ct = ne, JD = vt, no = V, QD = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Ct._)`{additionalProperty: ${e.additionalProperty}}`
}, ZD = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: QD,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, errsCount: a, it: o } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: s, opts: c } = o;
    if (o.props = !0, c.removeAdditional !== "all" && (0, no.alwaysValidSchema)(o, r))
      return;
    const f = (0, ro.allSchemaProperties)(n.properties), l = (0, ro.allSchemaProperties)(n.patternProperties);
    u(), e.ok((0, Ct._)`${a} === ${JD.default.errors}`);
    function u() {
      t.forIn("key", i, (_) => {
        !f.length && !l.length ? y(_) : t.if(d(_), () => y(_));
      });
    }
    function d(_) {
      let v;
      if (f.length > 8) {
        const w = (0, no.schemaRefOrVal)(o, n.properties, "properties");
        v = (0, ro.isOwnProperty)(t, w, _);
      } else f.length ? v = (0, Ct.or)(...f.map((w) => (0, Ct._)`${_} === ${w}`)) : v = Ct.nil;
      return l.length && (v = (0, Ct.or)(v, ...l.map((w) => (0, Ct._)`${(0, ro.usePattern)(e, w)}.test(${_})`))), (0, Ct.not)(v);
    }
    function p(_) {
      t.code((0, Ct._)`delete ${i}[${_}]`);
    }
    function y(_) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        p(_);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: _ }), e.error(), s || t.break();
        return;
      }
      if (typeof r == "object" && !(0, no.alwaysValidSchema)(o, r)) {
        const v = t.name("valid");
        c.removeAdditional === "failing" ? (g(_, v, !1), t.if((0, Ct.not)(v), () => {
          e.reset(), p(_);
        })) : (g(_, v), s || t.if((0, Ct.not)(v), () => t.break()));
      }
    }
    function g(_, v, w) {
      const I = {
        keyword: "additionalProperties",
        dataProp: _,
        dataPropType: no.Type.Str
      };
      w === !1 && Object.assign(I, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(I, v);
    }
  }
};
$s.default = ZD;
var mu = {};
Object.defineProperty(mu, "__esModule", { value: !0 });
const ek = Tt, kh = se, yc = V, Fh = $s, tk = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Fh.default.code(new ek.KeywordCxt(a, Fh.default, "additionalProperties"));
    const o = (0, kh.allSchemaProperties)(r);
    for (const u of o)
      a.definedProperties.add(u);
    a.opts.unevaluated && o.length && a.props !== !0 && (a.props = yc.mergeEvaluated.props(t, (0, yc.toHash)(o), a.props));
    const s = o.filter((u) => !(0, yc.alwaysValidSchema)(a, r[u]));
    if (s.length === 0)
      return;
    const c = t.name("valid");
    for (const u of s)
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
mu.default = tk;
var yu = {};
Object.defineProperty(yu, "__esModule", { value: !0 });
const Lh = se, io = ne, xh = V, Uh = V, rk = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: i, it: a } = e, { opts: o } = a, s = (0, Lh.allSchemaProperties)(r), c = s.filter((g) => (0, xh.alwaysValidSchema)(a, r[g]));
    if (s.length === 0 || c.length === s.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const f = o.strictSchema && !o.allowMatchingProperties && i.properties, l = t.name("valid");
    a.props !== !0 && !(a.props instanceof io.Name) && (a.props = (0, Uh.evaluatedPropsToName)(t, a.props));
    const { props: u } = a;
    d();
    function d() {
      for (const g of s)
        f && p(g), a.allErrors ? y(g) : (t.var(l, !0), y(g), t.if(l));
    }
    function p(g) {
      for (const _ in f)
        new RegExp(g).test(_) && (0, xh.checkStrictMode)(a, `property ${_} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function y(g) {
      t.forIn("key", n, (_) => {
        t.if((0, io._)`${(0, Lh.usePattern)(e, g)}.test(${_})`, () => {
          const v = c.includes(g);
          v || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: _,
            dataPropType: Uh.Type.Str
          }, l), a.opts.unevaluated && u !== !0 ? t.assign((0, io._)`${u}[${_}]`, !0) : !v && !a.allErrors && t.if((0, io.not)(l), () => t.break());
        });
      });
    }
  }
};
yu.default = rk;
var gu = {};
Object.defineProperty(gu, "__esModule", { value: !0 });
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
gu.default = ik;
var vu = {};
Object.defineProperty(vu, "__esModule", { value: !0 });
const ak = se, ok = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: ak.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
vu.default = ok;
var _u = {};
Object.defineProperty(_u, "__esModule", { value: !0 });
const yo = ne, sk = V, ck = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, yo._)`{passingSchemas: ${e.passing}}`
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
    const a = r, o = t.let("valid", !1), s = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: s }), t.block(f), e.result(o, () => e.reset(), () => e.error(!0));
    function f() {
      a.forEach((l, u) => {
        let d;
        (0, sk.alwaysValidSchema)(i, l) ? t.var(c, !0) : d = e.subschema({
          keyword: "oneOf",
          schemaProp: u,
          compositeRule: !0
        }, c), u > 0 && t.if((0, yo._)`${c} && ${o}`).assign(o, !1).assign(s, (0, yo._)`[${s}, ${u}]`).else(), t.if(c, () => {
          t.assign(o, !0), t.assign(s, u), d && e.mergeEvaluated(d, yo.Name);
        });
      });
    }
  }
};
_u.default = lk;
var $u = {};
Object.defineProperty($u, "__esModule", { value: !0 });
const uk = V, fk = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const i = t.name("valid");
    r.forEach((a, o) => {
      if ((0, uk.alwaysValidSchema)(n, a))
        return;
      const s = e.subschema({ keyword: "allOf", schemaProp: o }, i);
      e.ok(i), e.mergeEvaluated(s);
    });
  }
};
$u.default = fk;
var wu = {};
Object.defineProperty(wu, "__esModule", { value: !0 });
const Lo = ne, G0 = V, dk = {
  message: ({ params: e }) => (0, Lo.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Lo._)`{failingKeyword: ${e.ifClause}}`
}, hk = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: dk,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, G0.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const i = Mh(n, "then"), a = Mh(n, "else");
    if (!i && !a)
      return;
    const o = t.let("valid", !0), s = t.name("_valid");
    if (c(), e.reset(), i && a) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(s, f("then", l), f("else", l));
    } else i ? t.if(s, f("then")) : t.if((0, Lo.not)(s), f("else"));
    e.pass(o, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, s);
      e.mergeEvaluated(l);
    }
    function f(l, u) {
      return () => {
        const d = e.subschema({ keyword: l }, s);
        t.assign(o, s), e.mergeValidEvaluated(d, o), u ? t.assign(u, (0, Lo._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function Mh(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, G0.alwaysValidSchema)(e, r);
}
wu.default = hk;
var Eu = {};
Object.defineProperty(Eu, "__esModule", { value: !0 });
const pk = V, mk = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, pk.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Eu.default = mk;
Object.defineProperty(vs, "__esModule", { value: !0 });
const yk = ci, gk = fu, vk = li, _k = du, $k = hu, wk = _s, Ek = pu, Sk = $s, bk = mu, Pk = yu, Tk = gu, Ak = vu, Ik = _u, Ok = $u, Ck = wu, Rk = Eu;
function Nk(e = !1) {
  const t = [
    // any
    Tk.default,
    Ak.default,
    Ik.default,
    Ok.default,
    Ck.default,
    Rk.default,
    // object
    Ek.default,
    Sk.default,
    wk.default,
    bk.default,
    Pk.default
  ];
  return e ? t.push(gk.default, _k.default) : t.push(yk.default, vk.default), t.push($k.default), t;
}
vs.default = Nk;
var Su = {}, ui = {};
Object.defineProperty(ui, "__esModule", { value: !0 });
ui.dynamicAnchor = void 0;
const gc = ne, Dk = vt, jh = rt, kk = ir, Fk = {
  keyword: "$dynamicAnchor",
  schemaType: "string",
  code: (e) => V0(e, e.schema)
};
function V0(e, t) {
  const { gen: r, it: n } = e;
  n.schemaEnv.root.dynamicAnchors[t] = !0;
  const i = (0, gc._)`${Dk.default.dynamicAnchors}${(0, gc.getProperty)(t)}`, a = n.errSchemaPath === "#" ? n.validateName : Lk(e);
  r.if((0, gc._)`!${i}`, () => r.assign(i, a));
}
ui.dynamicAnchor = V0;
function Lk(e) {
  const { schemaEnv: t, schema: r, self: n } = e.it, { root: i, baseId: a, localRefs: o, meta: s } = t.root, { schemaId: c } = n.opts, f = new jh.SchemaEnv({ schema: r, schemaId: c, root: i, baseId: a, localRefs: o, meta: s });
  return jh.compileSchema.call(n, f), (0, kk.getValidate)(e, f);
}
ui.default = Fk;
var fi = {};
Object.defineProperty(fi, "__esModule", { value: !0 });
fi.dynamicRef = void 0;
const Bh = ne, xk = vt, qh = ir, Uk = {
  keyword: "$dynamicRef",
  schemaType: "string",
  code: (e) => z0(e, e.schema)
};
function z0(e, t) {
  const { gen: r, keyword: n, it: i } = e;
  if (t[0] !== "#")
    throw new Error(`"${n}" only supports hash fragment reference`);
  const a = t.slice(1);
  if (i.allErrors)
    o();
  else {
    const c = r.let("valid", !1);
    o(c), e.ok(c);
  }
  function o(c) {
    if (i.schemaEnv.root.dynamicAnchors[a]) {
      const f = r.let("_v", (0, Bh._)`${xk.default.dynamicAnchors}${(0, Bh.getProperty)(a)}`);
      r.if(f, s(f, c), s(i.validateName, c));
    } else
      s(i.validateName, c)();
  }
  function s(c, f) {
    return f ? () => r.block(() => {
      (0, qh.callRef)(e, c), r.let(f, !0);
    }) : () => (0, qh.callRef)(e, c);
  }
}
fi.dynamicRef = z0;
fi.default = Uk;
var bu = {};
Object.defineProperty(bu, "__esModule", { value: !0 });
const Mk = ui, jk = V, Bk = {
  keyword: "$recursiveAnchor",
  schemaType: "boolean",
  code(e) {
    e.schema ? (0, Mk.dynamicAnchor)(e, "") : (0, jk.checkStrictMode)(e.it, "$recursiveAnchor: false is ignored");
  }
};
bu.default = Bk;
var Pu = {};
Object.defineProperty(Pu, "__esModule", { value: !0 });
const qk = fi, Hk = {
  keyword: "$recursiveRef",
  schemaType: "string",
  code: (e) => (0, qk.dynamicRef)(e, e.schema)
};
Pu.default = Hk;
Object.defineProperty(Su, "__esModule", { value: !0 });
const Gk = ui, Vk = fi, zk = bu, Wk = Pu, Kk = [Gk.default, Vk.default, zk.default, Wk.default];
Su.default = Kk;
var Tu = {}, Au = {};
Object.defineProperty(Au, "__esModule", { value: !0 });
const Hh = _s, Yk = {
  keyword: "dependentRequired",
  type: "object",
  schemaType: "object",
  error: Hh.error,
  code: (e) => (0, Hh.validatePropertyDeps)(e)
};
Au.default = Yk;
var Iu = {};
Object.defineProperty(Iu, "__esModule", { value: !0 });
const Xk = _s, Jk = {
  keyword: "dependentSchemas",
  type: "object",
  schemaType: "object",
  code: (e) => (0, Xk.validateSchemaDeps)(e)
};
Iu.default = Jk;
var Ou = {};
Object.defineProperty(Ou, "__esModule", { value: !0 });
const Qk = V, Zk = {
  keyword: ["maxContains", "minContains"],
  type: "array",
  schemaType: "number",
  code({ keyword: e, parentSchema: t, it: r }) {
    t.contains === void 0 && (0, Qk.checkStrictMode)(r, `"${e}" without "contains" is ignored`);
  }
};
Ou.default = Zk;
Object.defineProperty(Tu, "__esModule", { value: !0 });
const eF = Au, tF = Iu, rF = Ou, nF = [eF.default, tF.default, rF.default];
Tu.default = nF;
var Cu = {}, Ru = {};
Object.defineProperty(Ru, "__esModule", { value: !0 });
const vr = ne, Gh = V, iF = vt, aF = {
  message: "must NOT have unevaluated properties",
  params: ({ params: e }) => (0, vr._)`{unevaluatedProperty: ${e.unevaluatedProperty}}`
}, oF = {
  keyword: "unevaluatedProperties",
  type: "object",
  schemaType: ["boolean", "object"],
  trackErrors: !0,
  error: aF,
  code(e) {
    const { gen: t, schema: r, data: n, errsCount: i, it: a } = e;
    if (!i)
      throw new Error("ajv implementation error");
    const { allErrors: o, props: s } = a;
    s instanceof vr.Name ? t.if((0, vr._)`${s} !== true`, () => t.forIn("key", n, (u) => t.if(f(s, u), () => c(u)))) : s !== !0 && t.forIn("key", n, (u) => s === void 0 ? c(u) : t.if(l(s, u), () => c(u))), a.props = !0, e.ok((0, vr._)`${i} === ${iF.default.errors}`);
    function c(u) {
      if (r === !1) {
        e.setParams({ unevaluatedProperty: u }), e.error(), o || t.break();
        return;
      }
      if (!(0, Gh.alwaysValidSchema)(a, r)) {
        const d = t.name("valid");
        e.subschema({
          keyword: "unevaluatedProperties",
          dataProp: u,
          dataPropType: Gh.Type.Str
        }, d), o || t.if((0, vr.not)(d), () => t.break());
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
Ru.default = oF;
var Nu = {};
Object.defineProperty(Nu, "__esModule", { value: !0 });
const ln = ne, Vh = V, sF = {
  message: ({ params: { len: e } }) => (0, ln.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, ln._)`{limit: ${e}}`
}, cF = {
  keyword: "unevaluatedItems",
  type: "array",
  schemaType: ["boolean", "object"],
  error: sF,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e, a = i.items || 0;
    if (a === !0)
      return;
    const o = t.const("len", (0, ln._)`${n}.length`);
    if (r === !1)
      e.setParams({ len: a }), e.fail((0, ln._)`${o} > ${a}`);
    else if (typeof r == "object" && !(0, Vh.alwaysValidSchema)(i, r)) {
      const c = t.var("valid", (0, ln._)`${o} <= ${a}`);
      t.if((0, ln.not)(c), () => s(c, a)), e.ok(c);
    }
    i.items = !0;
    function s(c, f) {
      t.forRange("i", f, o, (l) => {
        e.subschema({ keyword: "unevaluatedItems", dataProp: l, dataPropType: Vh.Type.Num }, c), i.allErrors || t.if((0, ln.not)(c), () => t.break());
      });
    }
  }
};
Nu.default = cF;
Object.defineProperty(Cu, "__esModule", { value: !0 });
const lF = Ru, uF = Nu, fF = [lF.default, uF.default];
Cu.default = fF;
var ws = {}, Du = {};
Object.defineProperty(Du, "__esModule", { value: !0 });
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
    const { gen: r, data: n, $data: i, schema: a, schemaCode: o, it: s } = e, { opts: c, errSchemaPath: f, schemaEnv: l, self: u } = s;
    if (!c.validateFormats)
      return;
    i ? d() : p();
    function d() {
      const y = r.scopeValue("formats", {
        ref: u.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, Oe._)`${y}[${o}]`), _ = r.let("fType"), v = r.let("format");
      r.if((0, Oe._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign(_, (0, Oe._)`${g}.type || "string"`).assign(v, (0, Oe._)`${g}.validate`), () => r.assign(_, (0, Oe._)`"string"`).assign(v, g)), e.fail$data((0, Oe.or)(w(), I()));
      function w() {
        return c.strictSchema === !1 ? Oe.nil : (0, Oe._)`${o} && !${v}`;
      }
      function I() {
        const C = l.$async ? (0, Oe._)`(${g}.async ? await ${v}(${n}) : ${v}(${n}))` : (0, Oe._)`${v}(${n})`, M = (0, Oe._)`(typeof ${v} == "function" ? ${C} : ${v}.test(${n}))`;
        return (0, Oe._)`${v} && ${v} !== true && ${_} === ${t} && !${M}`;
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
      g === t && e.pass(C());
      function w() {
        if (c.strictSchema === !1) {
          u.logger.warn(M());
          return;
        }
        throw new Error(M());
        function M() {
          return `unknown format "${a}" ignored in schema at path "${f}"`;
        }
      }
      function I(M) {
        const X = M instanceof RegExp ? (0, Oe.regexpCode)(M) : c.code.formats ? (0, Oe._)`${c.code.formats}${(0, Oe.getProperty)(a)}` : void 0, W = r.scopeValue("formats", { key: a, ref: M, code: X });
        return typeof M == "object" && !(M instanceof RegExp) ? [M.type || "string", M.validate, (0, Oe._)`${W}.validate`] : ["string", M, W];
      }
      function C() {
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
Du.default = hF;
Object.defineProperty(ws, "__esModule", { value: !0 });
const pF = Du, mF = [pF.default];
ws.default = mF;
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
Object.defineProperty(Ql, "__esModule", { value: !0 });
const yF = ys, gF = gs, vF = vs, _F = Su, $F = Tu, wF = Cu, EF = ws, zh = yn, SF = [
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
Ql.default = SF;
var Es = {}, Ss = {};
Object.defineProperty(Ss, "__esModule", { value: !0 });
Ss.DiscrError = void 0;
var Wh;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Wh || (Ss.DiscrError = Wh = {}));
Object.defineProperty(Es, "__esModule", { value: !0 });
const Ln = ne, Wc = Ss, Kh = rt, bF = wn, PF = V, TF = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Wc.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, Ln._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, AF = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: TF,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: i, it: a } = e, { oneOf: o } = i;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const s = n.propertyName;
    if (typeof s != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), f = t.const("tag", (0, Ln._)`${r}${(0, Ln.getProperty)(s)}`);
    t.if((0, Ln._)`typeof ${f} == "string"`, () => l(), () => e.error(!1, { discrError: Wc.DiscrError.Tag, tag: f, tagName: s })), e.ok(c);
    function l() {
      const p = d();
      t.if(!1);
      for (const y in p)
        t.elseIf((0, Ln._)`${f} === ${y}`), t.assign(c, u(p[y]));
      t.else(), e.error(!1, { discrError: Wc.DiscrError.Mapping, tag: f, tagName: s }), t.endIf();
    }
    function u(p) {
      const y = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: p }, y);
      return e.mergeEvaluated(g, Ln.Name), y;
    }
    function d() {
      var p;
      const y = {}, g = v(i);
      let _ = !0;
      for (let C = 0; C < o.length; C++) {
        let M = o[C];
        if (M != null && M.$ref && !(0, PF.schemaHasRulesButRef)(M, a.self.RULES)) {
          const W = M.$ref;
          if (M = Kh.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, W), M instanceof Kh.SchemaEnv && (M = M.schema), M === void 0)
            throw new bF.default(a.opts.uriResolver, a.baseId, W);
        }
        const X = (p = M == null ? void 0 : M.properties) === null || p === void 0 ? void 0 : p[s];
        if (typeof X != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${s}"`);
        _ = _ && (g || v(M)), w(X, C);
      }
      if (!_)
        throw new Error(`discriminator: "${s}" must be required`);
      return y;
      function v({ required: C }) {
        return Array.isArray(C) && C.includes(s);
      }
      function w(C, M) {
        if (C.const)
          I(C.const, M);
        else if (C.enum)
          for (const X of C.enum)
            I(X, M);
        else
          throw new Error(`discriminator: "properties/${s}" must have "const" or "enum"`);
      }
      function I(C, M) {
        if (typeof C != "string" || C in y)
          throw new Error(`discriminator: "${s}" values must be unique strings`);
        y[C] = M;
      }
    }
  }
};
Es.default = AF;
var ku = {};
const IF = "https://json-schema.org/draft/2020-12/schema", OF = "https://json-schema.org/draft/2020-12/schema", CF = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0,
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0,
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
  "https://json-schema.org/draft/2020-12/vocab/validation": !0,
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, RF = "meta", NF = "Core and Validation specifications meta-schema", DF = [
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
  $vocabulary: CF,
  $dynamicAnchor: RF,
  title: NF,
  allOf: DF,
  type: kF,
  $comment: FF,
  properties: LF
}, UF = "https://json-schema.org/draft/2020-12/schema", MF = "https://json-schema.org/draft/2020-12/meta/applicator", jF = {
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
  $id: MF,
  $vocabulary: jF,
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
}, e2 = {
  $schema: WF,
  $id: KF,
  $vocabulary: YF,
  $dynamicAnchor: XF,
  title: JF,
  type: QF,
  properties: ZF
}, t2 = "https://json-schema.org/draft/2020-12/schema", r2 = "https://json-schema.org/draft/2020-12/meta/content", n2 = {
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, i2 = "meta", a2 = "Content vocabulary meta-schema", o2 = [
  "object",
  "boolean"
], s2 = {
  contentEncoding: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentSchema: {
    $dynamicRef: "#meta"
  }
}, c2 = {
  $schema: t2,
  $id: r2,
  $vocabulary: n2,
  $dynamicAnchor: i2,
  title: a2,
  type: o2,
  properties: s2
}, l2 = "https://json-schema.org/draft/2020-12/schema", u2 = "https://json-schema.org/draft/2020-12/meta/core", f2 = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0
}, d2 = "meta", h2 = "Core vocabulary meta-schema", p2 = [
  "object",
  "boolean"
], m2 = {
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
}, y2 = {
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
}, g2 = {
  $schema: l2,
  $id: u2,
  $vocabulary: f2,
  $dynamicAnchor: d2,
  title: h2,
  type: p2,
  properties: m2,
  $defs: y2
}, v2 = "https://json-schema.org/draft/2020-12/schema", _2 = "https://json-schema.org/draft/2020-12/meta/format-annotation", $2 = {
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0
}, w2 = "meta", E2 = "Format vocabulary meta-schema for annotation results", S2 = [
  "object",
  "boolean"
], b2 = {
  format: {
    type: "string"
  }
}, P2 = {
  $schema: v2,
  $id: _2,
  $vocabulary: $2,
  $dynamicAnchor: w2,
  title: E2,
  type: S2,
  properties: b2
}, T2 = "https://json-schema.org/draft/2020-12/schema", A2 = "https://json-schema.org/draft/2020-12/meta/meta-data", I2 = {
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0
}, O2 = "meta", C2 = "Meta-data vocabulary meta-schema", R2 = [
  "object",
  "boolean"
], N2 = {
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
}, D2 = {
  $schema: T2,
  $id: A2,
  $vocabulary: I2,
  $dynamicAnchor: O2,
  title: C2,
  type: R2,
  properties: N2
}, k2 = "https://json-schema.org/draft/2020-12/schema", F2 = "https://json-schema.org/draft/2020-12/meta/validation", L2 = {
  "https://json-schema.org/draft/2020-12/vocab/validation": !0
}, x2 = "meta", U2 = "Validation vocabulary meta-schema", M2 = [
  "object",
  "boolean"
], j2 = {
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
}, B2 = {
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
}, q2 = {
  $schema: k2,
  $id: F2,
  $vocabulary: L2,
  $dynamicAnchor: x2,
  title: U2,
  type: M2,
  properties: j2,
  $defs: B2
};
Object.defineProperty(ku, "__esModule", { value: !0 });
const H2 = xF, G2 = zF, V2 = e2, z2 = c2, W2 = g2, K2 = P2, Y2 = D2, X2 = q2, J2 = ["/properties"];
function Q2(e) {
  return [
    H2,
    G2,
    V2,
    z2,
    W2,
    t(this, K2),
    Y2,
    t(this, X2)
  ].forEach((r) => this.addMetaSchema(r, void 0, !1)), this;
  function t(r, n) {
    return e ? r.$dataMetaSchema(n, J2) : n;
  }
}
ku.default = Q2;
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv2020 = void 0;
  const r = Ul, n = Ql, i = Es, a = ku, o = "https://json-schema.org/draft/2020-12/schema";
  class s extends r.default {
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
      y && (a.default.call(this, p), this.refs["http://json-schema.org/schema"] = o);
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(o) ? o : void 0);
    }
  }
  t.Ajv2020 = s, e.exports = t = s, e.exports.Ajv2020 = s, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = s;
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
  var l = si;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return l.default;
  } });
  var u = wn;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return u.default;
  } });
})(jc, jc.exports);
var Z2 = jc.exports, Kc = { exports: {} }, W0 = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(j, H) {
    return { validate: j, compare: H };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(a, o),
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
    regex: J,
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
    int32: { type: "number", validate: X },
    // signed 64 bit integer
    int64: { type: "number", validate: W },
    // C-type float
    float: { type: "number", validate: de },
    // C-type double
    double: { type: "number", validate: de },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, o),
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
  function r(j) {
    return j % 4 === 0 && (j % 100 !== 0 || j % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, i = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function a(j) {
    const H = n.exec(j);
    if (!H)
      return !1;
    const Q = +H[1], F = +H[2], L = +H[3];
    return F >= 1 && F <= 12 && L >= 1 && L <= (F === 2 && r(Q) ? 29 : i[F]);
  }
  function o(j, H) {
    if (j && H)
      return j > H ? 1 : j < H ? -1 : 0;
  }
  const s = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
  function c(j) {
    return function(Q) {
      const F = s.exec(Q);
      if (!F)
        return !1;
      const L = +F[1], q = +F[2], x = +F[3], G = F[4], B = F[5] === "-" ? -1 : 1, k = +(F[6] || 0), T = +(F[7] || 0);
      if (k > 23 || T > 59 || j && !G)
        return !1;
      if (L <= 23 && q <= 59 && x < 60)
        return !0;
      const R = q - T * B, O = L - k * B - (R < 0 ? 1 : 0);
      return (O === 23 || O === -1) && (R === 59 || R === -1) && x < 61;
    };
  }
  function f(j, H) {
    if (!(j && H))
      return;
    const Q = (/* @__PURE__ */ new Date("2020-01-01T" + j)).valueOf(), F = (/* @__PURE__ */ new Date("2020-01-01T" + H)).valueOf();
    if (Q && F)
      return Q - F;
  }
  function l(j, H) {
    if (!(j && H))
      return;
    const Q = s.exec(j), F = s.exec(H);
    if (Q && F)
      return j = Q[1] + Q[2] + Q[3], H = F[1] + F[2] + F[3], j > H ? 1 : j < H ? -1 : 0;
  }
  const u = /t|\s/i;
  function d(j) {
    const H = c(j);
    return function(F) {
      const L = F.split(u);
      return L.length === 2 && a(L[0]) && H(L[1]);
    };
  }
  function p(j, H) {
    if (!(j && H))
      return;
    const Q = new Date(j).valueOf(), F = new Date(H).valueOf();
    if (Q && F)
      return Q - F;
  }
  function y(j, H) {
    if (!(j && H))
      return;
    const [Q, F] = j.split(u), [L, q] = H.split(u), x = o(Q, L);
    if (x !== void 0)
      return x || f(F, q);
  }
  const g = /\/|:/, _ = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function v(j) {
    return g.test(j) && _.test(j);
  }
  const w = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function I(j) {
    return w.lastIndex = 0, w.test(j);
  }
  const C = -2147483648, M = 2 ** 31 - 1;
  function X(j) {
    return Number.isInteger(j) && j <= M && j >= C;
  }
  function W(j) {
    return Number.isInteger(j);
  }
  function de() {
    return !0;
  }
  const b = /[^\\]\\Z/;
  function J(j) {
    if (b.test(j))
      return !1;
    try {
      return new RegExp(j), !0;
    } catch {
      return !1;
    }
  }
})(W0);
var K0 = {}, Yc = { exports: {} }, Fu = {};
Object.defineProperty(Fu, "__esModule", { value: !0 });
const eL = ys, tL = gs, rL = vs, nL = ws, Yh = yn, iL = [
  eL.default,
  tL.default,
  (0, rL.default)(),
  nL.default,
  Yh.metadataVocabulary,
  Yh.contentVocabulary
];
Fu.default = iL;
const aL = "http://json-schema.org/draft-07/schema#", oL = "http://json-schema.org/draft-07/schema#", sL = "Core schema meta-schema", cL = {
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
}, lL = [
  "object",
  "boolean"
], uL = {
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
}, fL = {
  $schema: aL,
  $id: oL,
  title: sL,
  definitions: cL,
  type: lL,
  properties: uL,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Ul, n = Fu, i = Es, a = fL, o = ["/properties"], s = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((y) => this.addVocabulary(y)), this.opts.discriminator && this.addKeyword(i.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const y = this.opts.$data ? this.$dataMetaSchema(a, o) : a;
      this.addMetaSchema(y, s, !1), this.refs["http://json-schema.org/schema"] = s;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(s) ? s : void 0);
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
  var u = si;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return u.default;
  } });
  var d = wn;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return d.default;
  } });
})(Yc, Yc.exports);
var dL = Yc.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = dL, r = ne, n = r.operators, i = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, a = {
    message: ({ keyword: s, schemaCode: c }) => (0, r.str)`should be ${i[s].okStr} ${c}`,
    params: ({ keyword: s, schemaCode: c }) => (0, r._)`{comparison: ${i[s].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(i),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: a,
    code(s) {
      const { gen: c, data: f, schemaCode: l, keyword: u, it: d } = s, { opts: p, self: y } = d;
      if (!p.validateFormats)
        return;
      const g = new t.KeywordCxt(d, y.RULES.all.format.definition, "format");
      g.$data ? _() : v();
      function _() {
        const I = c.scopeValue("formats", {
          ref: y.formats,
          code: p.code.formats
        }), C = c.const("fmt", (0, r._)`${I}[${g.schemaCode}]`);
        s.fail$data((0, r.or)((0, r._)`typeof ${C} != "object"`, (0, r._)`${C} instanceof RegExp`, (0, r._)`typeof ${C}.compare != "function"`, w(C)));
      }
      function v() {
        const I = g.schema, C = y.formats[I];
        if (!C || C === !0)
          return;
        if (typeof C != "object" || C instanceof RegExp || typeof C.compare != "function")
          throw new Error(`"${u}": format "${I}" does not define "compare" function`);
        const M = c.scopeValue("formats", {
          key: I,
          ref: C,
          code: p.code.formats ? (0, r._)`${p.code.formats}${(0, r.getProperty)(I)}` : void 0
        });
        s.fail$data(w(M));
      }
      function w(I) {
        return (0, r._)`${I}.compare(${f}, ${l}) ${i[u].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const o = (s) => (s.addKeyword(e.formatLimitDefinition), s);
  e.default = o;
})(K0);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = W0, n = K0, i = ne, a = new i.Name("fullFormats"), o = new i.Name("fastFormats"), s = (f, l = { keywords: !0 }) => {
    if (Array.isArray(l))
      return c(f, l, r.fullFormats, a), f;
    const [u, d] = l.mode === "fast" ? [r.fastFormats, o] : [r.fullFormats, a], p = l.formats || r.formatNames;
    return c(f, p, u, d), l.keywords && (0, n.default)(f), f;
  };
  s.get = (f, l = "full") => {
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
  e.exports = t = s, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = s;
})(Kc, Kc.exports);
var hL = Kc.exports;
const pL = /* @__PURE__ */ jo(hL), mL = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const i = Object.getOwnPropertyDescriptor(e, r), a = Object.getOwnPropertyDescriptor(t, r);
  !yL(i, a) && n || Object.defineProperty(e, r, a);
}, yL = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, gL = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, vL = (e, t) => `/* Wrapped ${e}*/
${t}`, _L = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), $L = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), wL = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, i = vL.bind(null, n, t.toString());
  Object.defineProperty(i, "name", $L);
  const { writable: a, enumerable: o, configurable: s } = _L;
  Object.defineProperty(e, "toString", { value: i, writable: a, enumerable: o, configurable: s });
};
function EL(e, t, { ignoreNonConfigurable: r = !1 } = {}) {
  const { name: n } = e;
  for (const i of Reflect.ownKeys(t))
    mL(e, t, i, r);
  return gL(e, t), wL(e, t, n), e;
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
  let o, s, c;
  const f = function(...l) {
    const u = this, d = () => {
      o = void 0, s && (clearTimeout(s), s = void 0), a && (c = e.apply(u, l));
    }, p = () => {
      s = void 0, o && (clearTimeout(o), o = void 0), a && (c = e.apply(u, l));
    }, y = i && !o;
    return clearTimeout(o), o = setTimeout(d, r), n > 0 && n !== Number.POSITIVE_INFINITY && !s && (s = setTimeout(p, n)), y && (c = e.apply(u, l)), c;
  };
  return EL(f, e), f.cancel = () => {
    o && (clearTimeout(o), o = void 0), s && (clearTimeout(s), s = void 0);
  }, f;
}, SL = Object.prototype.toString, bL = "[object Uint8Array]", PL = "[object ArrayBuffer]";
function Y0(e, t, r) {
  return e ? e.constructor === t ? !0 : SL.call(e) === r : !1;
}
function X0(e) {
  return Y0(e, Uint8Array, bL);
}
function TL(e) {
  return Y0(e, ArrayBuffer, PL);
}
function AL(e) {
  return X0(e) || TL(e);
}
function IL(e) {
  if (!X0(e))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof e}\``);
}
function OL(e) {
  if (!AL(e))
    throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof e}\``);
}
function Jh(e, t) {
  if (e.length === 0)
    return new Uint8Array(0);
  t ?? (t = e.reduce((i, a) => i + a.length, 0));
  const r = new Uint8Array(t);
  let n = 0;
  for (const i of e)
    IL(i), r.set(i, n), n += i.length;
  return r;
}
const ao = {
  utf8: new globalThis.TextDecoder("utf8")
};
function Qh(e, t = "utf8") {
  return OL(e), ao[t] ?? (ao[t] = new globalThis.TextDecoder(t)), ao[t].decode(e);
}
function CL(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected \`string\`, got \`${typeof e}\``);
}
const RL = new globalThis.TextEncoder();
function vc(e) {
  return CL(e), RL.encode(e);
}
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
const NL = pL.default, Zh = "aes-256-cbc", kn = () => /* @__PURE__ */ Object.create(null), DL = (e) => e != null, kL = (e, t) => {
  const r = /* @__PURE__ */ new Set([
    "undefined",
    "symbol",
    "function"
  ]), n = typeof t;
  if (r.has(n))
    throw new TypeError(`Setting a value of type \`${n}\` for key \`${e}\` is not allowed as it's not supported by JSON`);
}, go = "__internal__", _c = `${go}.migrations.version`;
var Sr, Xt, gt, Jt;
class FL {
  constructor(t = {}) {
    St(this, "path");
    St(this, "events");
    $i(this, Sr);
    $i(this, Xt);
    $i(this, gt);
    $i(this, Jt, {});
    St(this, "_deserialize", (t) => JSON.parse(t));
    St(this, "_serialize", (t) => JSON.stringify(t, void 0, "	"));
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
    if (wi(this, gt, r), r.schema ?? r.ajvOptions ?? r.rootSchema) {
      if (r.schema && typeof r.schema != "object")
        throw new TypeError("The `schema` option must be an object.");
      const o = new Z2.Ajv2020({
        allErrors: !0,
        useDefaults: !0,
        ...r.ajvOptions
      });
      NL(o);
      const s = {
        ...r.rootSchema,
        type: "object",
        properties: r.schema
      };
      wi(this, Sr, o.compile(s));
      for (const [c, f] of Object.entries(r.schema ?? {}))
        f != null && f.default && (we(this, Jt)[c] = f.default);
    }
    r.defaults && wi(this, Jt, {
      ...we(this, Jt),
      ...r.defaults
    }), r.serialize && (this._serialize = r.serialize), r.deserialize && (this._deserialize = r.deserialize), this.events = new EventTarget(), wi(this, Xt, r.encryptionKey);
    const n = r.fileExtension ? `.${r.fileExtension}` : "";
    this.path = ee.resolve(r.cwd, `${r.configName ?? "config"}${n}`);
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
    if (we(this, gt).accessPropertiesByDotNotation)
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
      throw new TypeError(`Please don't use the ${go} key, as it's used to manage this module internal operations.`);
    const { store: n } = this, i = (a, o) => {
      kL(a, o), we(this, gt).accessPropertiesByDotNotation ? yh(n, a, o) : n[a] = o;
    };
    if (typeof t == "object") {
      const a = t;
      for (const [o, s] of Object.entries(a))
        i(o, s);
    } else
      i(t, r);
    this.store = n;
  }
  has(t) {
    return we(this, gt).accessPropertiesByDotNotation ? VO(this.store, t) : t in this.store;
  }
  /**
      Reset items to their default values, as defined by the `defaults` or `schema` option.
  
      @see `clear()` to reset all items.
  
      @param keys - The keys of the items to reset.
      */
  reset(...t) {
    for (const r of t)
      DL(we(this, Jt)[r]) && this.set(r, we(this, Jt)[r]);
  }
  delete(t) {
    const { store: r } = this;
    we(this, gt).accessPropertiesByDotNotation ? GO(r, t) : delete r[t], this.store = r;
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
      const t = oe.readFileSync(this.path, we(this, Xt) ? null : "utf8"), r = this._encryptData(t), n = this._deserialize(r);
      return this._validate(n), Object.assign(kn(), n);
    } catch (t) {
      if ((t == null ? void 0 : t.code) === "ENOENT")
        return this._ensureDirectory(), kn();
      if (we(this, gt).clearInvalidConfig && t.name === "SyntaxError")
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
      const r = t.slice(0, 16), n = nn.pbkdf2Sync(we(this, Xt), r.toString(), 1e4, 32, "sha512"), i = nn.createDecipheriv(Zh, n, r), a = t.slice(17), o = typeof a == "string" ? vc(a) : a;
      return Qh(Jh([i.update(o), i.final()]));
    } catch {
    }
    return t.toString();
  }
  _handleChange(t, r) {
    let n = t();
    const i = () => {
      const a = n, o = t();
      $v(o, a) || (n = o, r.call(this, o, a));
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
    oe.mkdirSync(ee.dirname(this.path), { recursive: !0 });
  }
  _write(t) {
    let r = this._serialize(t);
    if (we(this, Xt)) {
      const n = nn.randomBytes(16), i = nn.pbkdf2Sync(we(this, Xt), n.toString(), 1e4, 32, "sha512"), a = nn.createCipheriv(Zh, i, n);
      r = Jh([n, vc(":"), a.update(vc(r)), a.final()]);
    }
    if (De.env.SNAP)
      oe.writeFileSync(this.path, r, { mode: we(this, gt).configFileMode });
    else
      try {
        Ky(this.path, r, { mode: we(this, gt).configFileMode });
      } catch (n) {
        if ((n == null ? void 0 : n.code) === "EXDEV") {
          oe.writeFileSync(this.path, r, { mode: we(this, gt).configFileMode });
          return;
        }
        throw n;
      }
  }
  _watch() {
    this._ensureDirectory(), oe.existsSync(this.path) || this._write(kn()), De.platform === "win32" ? oe.watch(this.path, { persistent: !1 }, Xh(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 100 })) : oe.watchFile(this.path, { persistent: !1 }, Xh(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 5e3 }));
  }
  _migrate(t, r, n) {
    let i = this._get(_c, "0.0.0");
    const a = Object.keys(t).filter((s) => this._shouldPerformMigration(s, i, r));
    let o = { ...this.store };
    for (const s of a)
      try {
        n && n(this, {
          fromVersion: i,
          toVersion: s,
          finalVersion: r,
          versions: a
        });
        const c = t[s];
        c == null || c(this), this._set(_c, s), i = s, o = { ...this.store };
      } catch (c) {
        throw this.store = o, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${c}`);
      }
    (this._isVersionInRangeFormat(i) || !An.eq(i, r)) && this._set(_c, r);
  }
  _containsReservedKey(t) {
    return typeof t == "object" && Object.keys(t)[0] === go ? !0 : typeof t != "string" ? !1 : we(this, gt).accessPropertiesByDotNotation ? !!t.startsWith(`${go}.`) : !1;
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
Sr = new WeakMap(), Xt = new WeakMap(), gt = new WeakMap(), Jt = new WeakMap();
const { app: vo, ipcMain: Xc, shell: LL } = tr;
let ep = !1;
const tp = () => {
  if (!Xc || !vo)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: vo.getPath("userData"),
    appVersion: vo.getVersion()
  };
  return ep || (Xc.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), ep = !0), e;
};
class xL extends FL {
  constructor(t) {
    let r, n;
    if (De.type === "renderer") {
      const i = tr.ipcRenderer.sendSync("electron-store-get-data");
      if (!i)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = i);
    } else Xc && vo && ({ defaultCwd: r, appVersion: n } = tp());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = ee.isAbsolute(t.cwd) ? t.cwd : ee.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    tp();
  }
  async openInEditor() {
    const t = await LL.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var Lu = xo, UL = ce, Mr = da.spawn, xu = "HKLM", J0 = "HKCU", Q0 = "HKCR", Z0 = "HKU", eg = "HKCC", tg = [xu, J0, Q0, Z0, eg], rg = "REG_SZ", ng = "REG_MULTI_SZ", ig = "REG_EXPAND_SZ", ag = "REG_DWORD", og = "REG_QWORD", sg = "REG_BINARY", cg = "REG_NONE", lg = [rg, ng, ig, ag, og, sg, cg], ML = "", jL = /(\\[a-zA-Z0-9_\s]+)*/, BL = /^(HKEY_LOCAL_MACHINE|HKEY_CURRENT_USER|HKEY_CLASSES_ROOT|HKEY_USERS|HKEY_CURRENT_CONFIG)(.*)$/, ug = /^(.*)\s(REG_SZ|REG_MULTI_SZ|REG_EXPAND_SZ|REG_DWORD|REG_QWORD|REG_BINARY|REG_NONE)\s+([^\s].*)$/;
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
Lu.inherits(Hn, Error);
function jr(e) {
  var t = { stdout: "", stderr: "" };
  return e.stdout.on("data", function(r) {
    t.stdout += r.toString();
  }), e.stderr.on("data", function(r) {
    t.stderr += r.toString();
  }), t;
}
function Br(e, t, r) {
  var n = r.stdout.trim(), i = r.stderr.trim(), a = Lu.format(`%s command exited with code %d:
%s
%s`, e, t, n, i);
  return new Hn(a, t);
}
function qL(e) {
  if (e == "x64")
    return "64";
  if (e == "x86")
    return "32";
  throw new Error("illegal architecture: " + e + " (use x86 or x64)");
}
function qr(e, t) {
  t && e.push("/reg:" + qL(t));
}
function Hr() {
  return process.platform === "win32" ? UL.join(process.env.windir, "system32", "reg.exe") : "REG";
}
function ua(e, t, r, n, i, a, o) {
  if (!(this instanceof ua))
    return new ua(e, t, r, n, i, a, o);
  var s = e, c = t, f = r, l = n, u = i, d = a, p = o;
  this.__defineGetter__("host", function() {
    return s;
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
Lu.inherits(ua, Object);
function ue(e) {
  if (!(this instanceof ue))
    return new ue(e);
  var t = e || {}, r = "" + (t.host || ""), n = "" + (t.hive || xu), i = "" + (t.key || ""), a = t.arch || null;
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
    var o = i.lastIndexOf("\\");
    return new ue({
      host: this.host,
      hive: this.hive,
      key: o == -1 ? "" : i.substring(0, o),
      arch: this.arch
    });
  }), tg.indexOf(n) == -1)
    throw new Error("illegal hive specified.");
  if (!jL.test(i))
    throw new Error("illegal key specified.");
  if (a && a != "x64" && a != "x86")
    throw new Error("illegal architecture specified (use x86 or x64)");
}
ue.HKLM = xu;
ue.HKCU = J0;
ue.HKCR = Q0;
ue.HKU = Z0;
ue.HKCC = eg;
ue.HIVES = tg;
ue.REG_SZ = rg;
ue.REG_MULTI_SZ = ng;
ue.REG_EXPAND_SZ = ig;
ue.REG_DWORD = ag;
ue.REG_QWORD = og;
ue.REG_BINARY = sg;
ue.REG_NONE = cg;
ue.REG_TYPES = lg;
ue.DEFAULT_VALUE = ML;
ue.prototype.values = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["QUERY", this.path];
  qr(r, this.arch);
  var n = Mr(Hr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = "", a = this, o = null, s = jr(n);
  return n.on("close", function(c) {
    if (!o)
      if (c !== 0)
        t(Br("QUERY", c, s), null);
      else {
        for (var f = [], l = [], u = i.split(`
`), d = 0, p = 0, y = u.length; p < y; p++) {
          var g = u[p].trim();
          g.length > 0 && (d != 0 && f.push(g), ++d);
        }
        for (var p = 0, y = f.length; p < y; p++) {
          var _ = ug.exec(f[p]), v, w, I;
          _ && (v = _[1].trim(), w = _[2].trim(), I = _[3], l.push(new ua(a.host, a.hive, a.key, v, w, I, a.arch)));
        }
        t(null, l);
      }
  }), n.stdout.on("data", function(c) {
    i += c.toString();
  }), n.on("error", function(c) {
    o = c, t(c);
  }), this;
};
ue.prototype.keys = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["QUERY", this.path];
  qr(r, this.arch);
  var n = Mr(Hr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = "", a = this, o = null, s = jr(n);
  return n.on("close", function(c) {
    o || c !== 0 && t(Br("QUERY", c, s), null);
  }), n.stdout.on("data", function(c) {
    i += c.toString();
  }), n.stdout.on("end", function() {
    for (var c = [], f = [], l = i.split(`
`), u = 0, d = l.length; u < d; u++) {
      var p = l[u].trim();
      p.length > 0 && c.push(p);
    }
    for (var u = 0, d = c.length; u < d; u++) {
      var y = BL.exec(c[u]), g;
      y && (y[1], g = y[2], g && g !== a.key && f.push(new ue({
        host: a.host,
        hive: a.hive,
        key: g,
        arch: a.arch
      })));
    }
    t(null, f);
  }), n.on("error", function(c) {
    o = c, t(c);
  }), this;
};
ue.prototype.get = function(t, r) {
  if (typeof r != "function")
    throw new TypeError("must specify a callback");
  var n = ["QUERY", this.path];
  t == "" ? n.push("/ve") : n = n.concat(["/v", t]), qr(n, this.arch);
  var i = Mr(Hr(), n, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), a = "", o = this, s = null, c = jr(i);
  return i.on("close", function(f) {
    if (!s)
      if (f !== 0)
        r(Br("QUERY", f, c), null);
      else {
        for (var l = [], u = null, d = a.split(`
`), p = 0, y = 0, g = d.length; y < g; y++) {
          var _ = d[y].trim();
          _.length > 0 && (p != 0 && l.push(_), ++p);
        }
        var v = l[l.length - 1] || "", w = ug.exec(v), I, C, M;
        w && (I = w[1].trim(), C = w[2].trim(), M = w[3], u = new ua(o.host, o.hive, o.key, I, C, M, o.arch)), r(null, u);
      }
  }), i.stdout.on("data", function(f) {
    a += f.toString();
  }), i.on("error", function(f) {
    s = f, r(f);
  }), this;
};
ue.prototype.set = function(t, r, n, i) {
  if (typeof i != "function")
    throw new TypeError("must specify a callback");
  if (lg.indexOf(r) == -1)
    throw Error("illegal type specified.");
  var a = ["ADD", this.path];
  t == "" ? a.push("/ve") : a = a.concat(["/v", t]), a = a.concat(["/t", r, "/d", n, "/f"]), qr(a, this.arch);
  var o = Mr(Hr(), a, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), s = null, c = jr(o);
  return o.on("close", function(f) {
    s || i(f !== 0 ? Br("ADD", f, c) : null);
  }), o.stdout.on("data", function(f) {
  }), o.on("error", function(f) {
    s = f, i(f);
  }), this;
};
ue.prototype.remove = function(t, r) {
  if (typeof r != "function")
    throw new TypeError("must specify a callback");
  var n = t ? ["DELETE", this.path, "/f", "/v", t] : ["DELETE", this.path, "/f", "/ve"];
  qr(n, this.arch);
  var i = Mr(Hr(), n, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), a = null, o = jr(i);
  return i.on("close", function(s) {
    a || (s !== 0 ? r(Br("DELETE", s, o), null) : r(null));
  }), i.stdout.on("data", function(s) {
  }), i.on("error", function(s) {
    a = s, r(s);
  }), this;
};
ue.prototype.clear = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["DELETE", this.path, "/f", "/va"];
  qr(r, this.arch);
  var n = Mr(Hr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, a = jr(n);
  return n.on("close", function(o) {
    i || (o !== 0 ? t(Br("DELETE", o, a), null) : t(null));
  }), n.stdout.on("data", function(o) {
  }), n.on("error", function(o) {
    i = o, t(o);
  }), this;
};
ue.prototype.erase = ue.prototype.clear;
ue.prototype.destroy = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["DELETE", this.path, "/f"];
  qr(r, this.arch);
  var n = Mr(Hr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, a = jr(n);
  return n.on("close", function(o) {
    i || (o !== 0 ? t(Br("DELETE", o, a), null) : t(null));
  }), n.stdout.on("data", function(o) {
  }), n.on("error", function(o) {
    i = o, t(o);
  }), this;
};
ue.prototype.create = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["ADD", this.path, "/f"];
  qr(r, this.arch);
  var n = Mr(Hr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, a = jr(n);
  return n.on("close", function(o) {
    i || (o !== 0 ? t(Br("ADD", o, a), null) : t(null));
  }), n.stdout.on("data", function(o) {
  }), n.on("error", function(o) {
    i = o, t(o);
  }), this;
};
ue.prototype.keyExists = function(t) {
  return this.values(function(r, n) {
    if (r)
      return r.code == 1 ? t(null, !1) : t(r);
    t(null, !0);
  }), this;
};
ue.prototype.valueExists = function(t, r) {
  return this.get(t, function(n, i) {
    if (n)
      return n.code == 1 ? r(null, !1) : r(n);
    r(null, !0);
  }), this;
};
var HL = ue;
const rp = /* @__PURE__ */ jo(HL), re = {
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
  server: {
    name: "Arma 3 Roleplay Server",
    shortName: "Arma RP",
    description: "Serveur Roleplay français • Map Altis",
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
    community: "Arma Community",
    website: "https://Arma.com"
  },
  mods: {
    folderName: "@Arma",
    urlMods: "http://82.29.170.30/mods",
    urlRessources: "https://your-server.com/resources",
    manifestUrl: "http://82.29.170.30/mods/manifest.json"
  },
  steamQuery: {
    enabled: !0,
    refreshInterval: 3e5,
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
  _encrypted: !0,
  _encryptedAt: 1756843101820
};
async function GL(e) {
  return new Promise((t, r) => {
    const n = nn.createHash("sha256"), i = me.createReadStream(e);
    i.on("data", (a) => n.update(a)), i.on("end", () => t(n.digest("hex"))), i.on("error", r);
  });
}
async function np(e, t, r, n, i = 3) {
  var s;
  const a = `${t}.partial`;
  await me.ensureDir(ee.dirname(t));
  let o = 0;
  for (; ; )
    try {
      const c = await me.pathExists(a) ? (await me.stat(a)).size : 0, f = {};
      c > 0 && (f.Range = `bytes=${c}-`);
      const l = await fetch(e, { headers: f });
      if (!l.ok && l.status !== 206)
        throw new Error(`HTTP ${l.status}`);
      const u = l.status === 206, d = l.headers.get("content-length") || "0", p = parseInt(d, 10) || 0, y = u ? c + p : p, g = await me.open(a, u ? "a" : "w");
      try {
        const _ = (s = l.body) == null ? void 0 : s.getReader();
        if (!_) throw new Error("No readable stream from response.body");
        let v = c;
        for (; ; ) {
          const { done: w, value: I } = await _.read();
          if (w) break;
          I && (await me.write(g, Buffer.from(I)), v += I.length, r && y > 0 && r({
            downloadedBytes: v,
            totalBytes: y,
            percent: Math.max(0, Math.min(100, v / y * 100))
          }));
        }
      } finally {
        await me.close(g);
      }
      if (n && (await GL(a)).toLowerCase() !== n.toLowerCase())
        throw await me.remove(a), new Error("SHA256 mismatch");
      await me.move(a, t, { overwrite: !0 });
      return;
    } catch (c) {
      if (o += 1, o >= i)
        throw c;
      await Ev(500 * o);
    }
}
class Jc {
  constructor(t, r) {
    St(this, "manifestUrl");
    St(this, "localManifestPath");
    this.manifestUrl = t, this.localManifestPath = ee.join(r, "manifest.json");
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
      if (await me.pathExists(this.localManifestPath))
        return await me.readJson(this.localManifestPath);
    } catch (t) {
      console.error("Erreur lecture manifest local:", t);
    }
    return null;
  }
  /**
   * Sauvegarde le manifest local
   */
  async saveLocalManifest(t) {
    await me.ensureDir(ee.dirname(this.localManifestPath)), await me.writeJson(this.localManifestPath, t, { spaces: 2 });
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
    let o = 0;
    for (const s of r.files) {
      const c = n == null ? void 0 : n.files.find((u) => u.name === s.name), f = await me.pathExists(ee.join(t, s.name));
      if (!c || c.hash !== s.hash || c.lastModified !== s.lastModified || !f) {
        const u = c ? c.hash !== s.hash ? "hash différent" : c.lastModified !== s.lastModified ? "modifié" : f ? "inconnu" : "fichier manquant" : "nouveau";
        console.log(`   📥 ${s.name} - ${u}`), i.push(s), o += s.size;
      }
    }
    if (n)
      for (const s of n.files)
        r.files.find((f) => f.name === s.name) || (console.log(`   🗑️ ${s.name} - supprimé du serveur`), a.push(s.name));
    return console.log(`📊 Résultat: ${i.length} à télécharger, ${a.length} à supprimer`), { toDownload: i, toDelete: a, totalDownloadSize: o };
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
      const o = ee.join(t, a.name);
      if (!await me.pathExists(o) || (await me.stat(o)).size !== a.size || await this.calculateFileHash(o) !== a.hash) return !1;
    }
    return !0;
  }
  /**
   * Hash rapide avec streaming pour les gros fichiers
   */
  async calculateFileHash(t) {
    return new Promise((r, n) => {
      const i = nn.createHash("sha256"), a = me.createReadStream(t, { highWaterMark: 64 * 1024 });
      a.on("data", (o) => i.update(o)), a.on("end", () => r(i.digest("hex"))), a.on("error", n);
    });
  }
}
class VL {
  constructor(t, r) {
    St(this, "newsUrl");
    St(this, "localNewsPath");
    this.newsUrl = t, this.localNewsPath = ee.join(r, "news.json");
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
        (o) => !o.expiresAt || o.expiresAt > i
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
    await me.ensureDir(ee.dirname(this.localNewsPath)), await me.writeJson(this.localNewsPath, t, { spaces: 2 });
  }
  /**
   * Lire les actualités locales
   */
  async getLocalNews() {
    try {
      if (await me.pathExists(this.localNewsPath))
        return await me.readJson(this.localNewsPath);
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
var Di = {}, bs = {}, Ia = {};
Object.defineProperty(Ia, "__esModule", { value: !0 });
Ia.PromiseSocket = void 0;
const zL = Sv;
class WL {
  constructor(t, r) {
    if (this._attempts = t, this._timeout = r, Array.isArray(this._timeout) && this._attempts !== this._timeout.length)
      throw new Error(`Number of attempts (${this._attempts}) does not match the length of the timeout array (${this._timeout.length})`);
    this._socket = (0, zL.createSocket)("udp4");
  }
  async send(t, r, n) {
    return new Promise(async (i, a) => {
      for (let o = 0; o < this._attempts; o++) {
        let s;
        Array.isArray(this._timeout) ? s = this._timeout[o] : s = this._timeout;
        try {
          const c = await this._socketSend(t, r, n, s);
          return i(c);
        } catch (c) {
          if (o === this._attempts - 1)
            return a(c);
        }
      }
    });
  }
  closeSocket() {
    this._socket.close();
  }
  _socketSend(t, r, n, i) {
    return new Promise((a, o) => {
      this._socket.send(t, n, r, (s) => {
        if (s)
          return o(typeof s == "string" ? new Error(s) : s);
        const c = (u) => (this._socket.removeListener("message", c), this._socket.removeListener("error", f), clearTimeout(l), a(u)), f = (u) => (clearTimeout(l), o(u)), l = setTimeout(() => (this._socket.removeListener("message", c), this._socket.removeListener("error", f), o("Timeout reached. Possible reasons: You are being rate limited; Timeout too short; Wrong server host configured;")), i);
        this._socket.on("message", c), this._socket.on("error", f);
      });
    });
  }
}
Ia.PromiseSocket = WL;
Object.defineProperty(bs, "__esModule", { value: !0 });
bs.queryMasterServer = void 0;
const KL = Ia, $c = "0.0.0.0:0", YL = Buffer.from([255, 255, 255, 255, 102, 10]);
async function XL(e, t, r = {}, n = 1e3, i) {
  const a = e.split(":"), o = a[0], s = parseInt(a[1]);
  return await new JL(o, s, t, r, n, i).fetchServers();
}
bs.queryMasterServer = XL;
class JL {
  constructor(t, r, n, i, a, o) {
    this._host = t, this._port = r, this._region = n, this._filters = i, this._maxHosts = o, this._seedId = $c, this._hosts = [], this._promiseSocket = new KL.PromiseSocket(1, a);
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
    t.compare(YL, 0, 6, 0, 6) === 0 && (t = t.slice(6));
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
var fg = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.REGIONS = void 0, function(t) {
    t[t.US_EAST_COAST = 0] = "US_EAST_COAST", t[t.US_WEST_COAST = 1] = "US_WEST_COAST", t[t.SOUTH_AMERICA = 2] = "SOUTH_AMERICA", t[t.EUROPE = 3] = "EUROPE", t[t.ASIA = 4] = "ASIA", t[t.AUSTRALIA = 5] = "AUSTRALIA", t[t.MIDDLE_EAST = 6] = "MIDDLE_EAST", t[t.AFRICA = 7] = "AFRICA", t[t.ALL = 255] = "ALL";
  }(e.REGIONS || (e.REGIONS = {}));
})(fg);
var Cr = {};
Object.defineProperty(Cr, "__esModule", { value: !0 });
Cr.queryGameServerRules = Cr.queryGameServerPlayer = Cr.queryGameServerInfo = void 0;
const QL = Ia;
async function ZL(e, t = 1, r = 1e3) {
  const n = e.split(":"), i = n[0], a = parseInt(n[1]);
  return await new Uu(i, a, t, r).info();
}
Cr.queryGameServerInfo = ZL;
async function ex(e, t = 1, r = 1e3) {
  const n = e.split(":"), i = n[0], a = parseInt(n[1]);
  return await new Uu(i, a, t, r).player();
}
Cr.queryGameServerPlayer = ex;
async function tx(e, t = 1, r = 1e3) {
  const n = e.split(":"), i = n[0], a = parseInt(n[1]);
  return await new Uu(i, a, t, r).rules();
}
Cr.queryGameServerRules = tx;
class Uu {
  constructor(t, r, n, i) {
    this._host = t, this._port = r, this._promiseSocket = new QL.PromiseSocket(n, i);
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
      } catch (s) {
        throw this._promiseSocket.closeSocket(), new Error(s);
      }
      const o = a.slice(5);
      try {
        t = await this._promiseSocket.send(this._buildPacket(Buffer.from([85]), o), this._host, this._port);
      } catch (s) {
        throw this._promiseSocket.closeSocket(), new Error(s);
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
  var t = bs;
  Object.defineProperty(e, "queryMasterServer", { enumerable: !0, get: function() {
    return t.queryMasterServer;
  } });
  var r = fg;
  Object.defineProperty(e, "REGIONS", { enumerable: !0, get: function() {
    return r.REGIONS;
  } });
  var n = Cr;
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
    St(this, "lastServerInfo", null);
    St(this, "lastQueryTime", 0);
    St(this, "CACHE_DURATION", 1e4);
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
      const i = Date.now(), a = re.server.queryPort || re.server.port, o = `${re.server.ip}:${a}`;
      console.log(`🔍 Steam Query via lib vers ${o}...`);
      const s = await Di.queryGameServerInfo(
        o,
        1,
        ((r = re == null ? void 0 : re.steamQuery) == null ? void 0 : r.timeout) ?? 3e3
      );
      let c = [];
      try {
        const u = await Di.queryGameServerPlayer(
          o,
          1,
          ((n = re == null ? void 0 : re.steamQuery) == null ? void 0 : n.timeout) ?? 3e3
        );
        c = Array.isArray(u) ? u.map((d) => d == null ? void 0 : d.name).filter(Boolean) : [];
      } catch {
        console.log("Info: Liste des joueurs non disponible");
      }
      const f = Date.now() - i, l = {
        playerCount: (s == null ? void 0 : s.players) ?? 0,
        maxPlayers: (s == null ? void 0 : s.maxPlayers) ?? re.server.maxSlots,
        serverName: (s == null ? void 0 : s.name) ?? re.server.name,
        map: (s == null ? void 0 : s.map) ?? re.server.map,
        gameMode: (s == null ? void 0 : s.game) ?? re.server.gameMode,
        ping: f,
        isOnline: !0,
        version: (s == null ? void 0 : s.version) ?? "Unknown",
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
      const r = Date.now(), n = re.server.queryPort || re.server.port, i = `${re.server.ip}:${n}`;
      return await Di.queryGameServerInfo(
        i,
        1,
        ((t = re == null ? void 0 : re.steamQuery) == null ? void 0 : t.timeout) ?? 3e3
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
      const r = re.server.queryPort || re.server.port, n = `${re.server.ip}:${r}`, i = await Di.queryGameServerInfo(
        n,
        1,
        ((t = re == null ? void 0 : re.steamQuery) == null ? void 0 : t.timeout) ?? 3e3
      );
      return {
        count: (i == null ? void 0 : i.players) ?? 0,
        max: (i == null ? void 0 : i.maxPlayers) ?? re.server.maxSlots
      };
    } catch {
      return { count: 0, max: re.server.maxSlots };
    }
  }
}
const bt = new xL({
  name: "userData",
  cwd: "arma3-data",
  fileExtension: "json"
});
let Zr = null, oo = null;
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
  return me.existsSync(`${e}\\${re.mods.folderName}`);
}
async function ax(e) {
  return await me.pathExists(`${e}\\arma3.exe`);
}
function pe(e, t, r, n, i, a, o) {
  e == null || e.webContents.send("main-process-message", {
    message: t,
    success: r,
    error: n,
    data: i,
    fileProgress: a,
    timeRemaining: o
  });
}
function ox(e) {
  oo = new rx(), console.log(`✅ Steam Query activé pour ${re.server.ip}:${re.server.port}`), setInterval(async () => {
    try {
      const r = await oo.getPublicServerInfo();
      r.isOnline ? pe(e, "server-info-update", JSON.stringify({
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
      })) : pe(e, "server-info-update", JSON.stringify({
        isOnline: !1
      }));
    } catch (r) {
      console.error("Erreur mise à jour infos serveur:", r), pe(e, "server-info-update", JSON.stringify({
        isOnline: !1
      }));
    }
  }, re.steamQuery.refreshInterval);
  const t = ee.join(process.env.APPDATA || process.env.HOME || "", "arma3-data");
  Zr = new VL(re.news.url, t), e.webContents.on("did-finish-load", async () => {
    let r = bt.get("arma3Path");
    const n = bt.get("firstLaunch");
    try {
      if (Zr) {
        const i = await Zr.getNews();
        console.log(`✅ ${i.length} actualités chargées`);
      }
    } catch (i) {
      console.error("Erreur lors du chargement des actualités:", i);
    }
    if ((!r || r === "null") && (r = await nx(), r && bt.set("arma3Path", r)), r && r !== "null") {
      const i = ix(r);
      pe(
        e,
        i ? "arma3Path-mod-loaded" : "arma3Path-mod-not-loaded",
        void 0,
        i ? void 0 : `Mod ${re.mods.folderName} non installé`
      ), n && (pe(
        e,
        "firstLaunch-done",
        "Nous vous avons trouvé Arma 3 automatiquement"
      ), bt.set("firstLaunch", !1));
    } else
      bt.set("arma3Path", null), pe(e, "arma3Path-not-loaded");
    await wc(e);
  }), mt.on("locate-arma3", async () => {
    try {
      const r = await pv.showOpenDialog({
        properties: ["openDirectory"],
        title: "Sélectionner le dossier d'installation d'Arma 3",
        defaultPath: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Arma 3"
      });
      if (!r.canceled && r.filePaths.length > 0) {
        const n = r.filePaths[0];
        await ax(n) ? (bt.set("arma3Path", n), pe(e, "arma3Path-ready", "Arma 3 trouvé"), await wc(e)) : pe(
          e,
          "arma3Path-invalid",
          void 0,
          "Le dossier sélectionné ne contient pas Arma 3"
        );
      }
    } catch (r) {
      console.error("Erreur lors de la sélection du dossier Arma 3:", r), pe(
        e,
        "arma3Path-error",
        void 0,
        r instanceof Error ? r.message : "Erreur inconnue"
      );
    }
  }), mt.on("check-mods", async () => {
    console.log("🔄 Vérification manuelle des mods demandée"), await wc(e);
  }), mt.on("download-mods", async () => {
    const r = bt.get("arma3Path");
    if (!r) {
      pe(e, "download-error", void 0, "Chemin Arma 3 non trouvé");
      return;
    }
    const n = `${r}\\${re.mods.folderName}`, i = `${n}\\addons`;
    try {
      await me.ensureDir(i), pe(e, "download-start");
      const a = new Jc(re.mods.manifestUrl, n), o = await a.calculateDelta(i);
      if (o.toDownload.length === 0) {
        pe(e, "download-complete", "Mods déjà à jour");
        return;
      }
      const s = o.totalDownloadSize;
      let c = 0;
      const f = Date.now();
      let l = 0;
      for (const d of o.toDownload) {
        const p = ee.join(i, d.name);
        let y = 0;
        await np(
          `${re.mods.urlMods}/${d.name}`,
          p,
          (g) => {
            const _ = Math.floor((d.size || 0) * (g.percent / 100)), v = Math.max(0, _ - y);
            y = _, c = Math.min(s, c + v);
            const w = (Date.now() - f) / 1e3, I = c / Math.max(w, 1e-3), C = Math.max(0, s - c), M = Math.round(C / Math.max(I, 1)), X = Math.floor(M / 60), W = Math.round(M % 60), de = `${X}m ${W}s`, b = s > 0 ? Math.round(c / s * 100) : 0, J = Math.round(g.percent);
            Date.now() - l > 1e3 && (pe(
              e,
              "download-progress",
              b.toString(),
              void 0,
              d.name,
              J.toString(),
              de
            ), l = Date.now());
          },
          d.hash
        );
      }
      const u = await a.fetchServerManifest();
      u && await a.saveLocalManifest(u), pe(e, "download-complete", "Mods synchronisés avec succès"), pe(e, "arma3Path-mod-loaded", "Jeu prêt à être lancé");
    } catch (a) {
      console.error("Erreur lors de la synchronisation des mods:", a), pe(
        e,
        "download-error",
        void 0,
        a instanceof Error ? a.message : "Erreur inconnue"
      );
    }
  }), mt.handle("get-arma3-path", async () => {
    const r = bt.get("arma3Path");
    return r || null;
  }), mt.handle("launch-game", async () => {
    const r = bt.get("arma3Path"), n = "-skipIntro -noSplash -enableHT -malloc=jemalloc_bi_x64 -hugePages -noPause -noPauseAudio", i = "-skipIntro -noSplash -enableHT -malloc=jemalloc_bi -hugePages -noPause -noPauseAudio";
    if (!r) return;
    const a = process.arch === "x64", o = a ? "arma3_x64.exe" : "arma3.exe", s = a ? n : i, c = ee.join(r, o);
    if (!me.existsSync(c)) {
      pe(e, "launch-game-error", void 0, `Impossible de trouver ${o}`);
      return;
    }
    of(c, [s]), pe(e, "launch-game-success", "Jeu lancé avec succès"), setTimeout(() => {
      e.close();
    }, 5e3);
  }), mt.handle("connect-server", async () => {
    const r = bt.get("arma3Path"), n = "-skipIntro -noSplash -enableHT -malloc=jemalloc_bi_x64 -hugePages -noPause -noPauseAudio", i = "-skipIntro -noSplash -enableHT -malloc=jemalloc_bi -hugePages -noPause -noPauseAudio";
    if (!r) return;
    const a = process.arch === "x64", o = a ? "arma3_x64.exe" : "arma3.exe", s = a ? n : i, c = ee.join(r, o);
    if (!me.existsSync(c)) {
      pe(e, "launch-game-error", void 0, `Impossible de trouver ${o}`);
      return;
    }
    const f = `-connect=${re.server.ip} -port=${re.server.port}`;
    of(c, [`${s} ${f}`]), pe(e, "launch-game-success", "Jeu lancé — connexion au serveur en cours"), setTimeout(() => {
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
    if (oo)
      try {
        const r = await oo.getPublicServerInfo();
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
  }), mt.handle("open-url", async (r, n) => {
    mv.openExternal(n);
  }), mt.on("close-app", () => {
    e.close();
  }), mt.on("minimize-app", () => {
    e.minimize();
  }), mt.on("download-mods", async () => {
    const r = bt.get("arma3Path");
    if (!r) {
      pe(e, "download-error", void 0, "Chemin Arma 3 non trouvé");
      return;
    }
    const n = `${r}\\${re.mods.folderName}`, i = `${n}\\addons`;
    try {
      await me.ensureDir(i), pe(e, "download-start");
      const a = new Jc(re.mods.manifestUrl, n), o = await a.calculateDelta(i);
      if (o.toDownload.length === 0) {
        pe(e, "download-complete", "Mods déjà à jour");
        return;
      }
      const s = o.totalDownloadSize;
      let c = 0;
      const f = Date.now();
      let l = 0;
      for (const d of o.toDownload) {
        const p = ee.join(i, d.name);
        let y = 0;
        await np(
          `${re.mods.urlMods}/${d.name}`,
          p,
          (g) => {
            const _ = Math.floor((d.size || 0) * (g.percent / 100)), v = Math.max(0, _ - y);
            y = _, c = Math.min(s, c + v);
            const w = (Date.now() - f) / 1e3, I = c / Math.max(w, 1e-3), C = Math.max(0, s - c), M = Math.round(C / Math.max(I, 1)), X = Math.floor(M / 60), W = Math.round(M % 60), de = `${X}m ${W}s`, b = s > 0 ? Math.round(c / s * 100) : 0, J = Math.round(g.percent);
            Date.now() - l > 1e3 && (pe(
              e,
              "download-progress",
              b.toString(),
              void 0,
              d.name,
              J.toString(),
              de
            ), l = Date.now());
          },
          d.hash
        );
      }
      const u = await a.fetchServerManifest();
      u && await a.saveLocalManifest(u), pe(e, "download-complete", "Mods synchronisés avec succès"), pe(e, "arma3Path-mod-loaded", "Jeu prêt à être lancé");
    } catch (a) {
      console.error("Erreur lors de la synchronisation des mods:", a), pe(
        e,
        "download-error",
        void 0,
        a instanceof Error ? a.message : "Erreur inconnue"
      );
    }
  });
}
async function wc(e) {
  const t = bt.get("arma3Path");
  if (!t) return !1;
  const r = `${t}\\${re.mods.folderName}`, n = `${r}\\addons`;
  try {
    await me.ensureDir(n);
    const i = new Jc(re.mods.manifestUrl, r), a = await i.calculateDelta(n);
    if (a.toDownload.length === 0 && a.toDelete.length === 0) {
      if (await i.quickIntegrityCheck(
        n,
        re.performance.quickCheckSampleSize
      ))
        return pe(e, "mods-check-complete", "Mods à jour"), !0;
      console.log("⚠️ Quick check failed, forcing re-sync - will re-download suspicious files");
    }
    for (const o of a.toDelete) {
      const s = ee.join(n, o);
      await me.pathExists(s) && await me.remove(s);
    }
    if (!re.maintenance) {
      if (a.toDownload.length > 0) {
        const o = (a.totalDownloadSize / 1024 / 1024 / 1024).toFixed(2);
        pe(
          e,
          "updateMod-needed",
          `${a.toDownload.length} fichier(s) à synchroniser (${o} GB)`
        );
      }
    }
    return !0;
  } catch (i) {
    return console.error("Erreur lors de la vérification des mods:", i), pe(e, "mods-check-error", void 0, "Erreur de vérification"), !1;
  }
}
const dg = ee.dirname(_v(import.meta.url));
process.env.APP_ROOT = ee.join(dg, "..");
const Qc = process.env.VITE_DEV_SERVER_URL, Fx = ee.join(process.env.APP_ROOT, "dist-electron"), hg = ee.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Qc ? ee.join(process.env.APP_ROOT, "public") : hg;
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
const sx = en.requestSingleInstanceLock();
if (!sx)
  en.quit();
else {
  let e = function() {
    Ae = new af({
      icon: ee.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
      autoHideMenuBar: !0,
      height: 512,
      width: 800,
      frame: !1,
      maximizable: !1,
      minimizable: !1,
      resizable: !1,
      center: !0,
      webPreferences: {
        preload: ee.join(dg, "preload.mjs")
      }
    }), ox(Ae), Dt.autoUpdater.checkForUpdates().catch(console.error), Qc ? (Ae.loadURL(Qc), Ae.webContents.openDevTools({
      mode: "detach"
    })) : Ae.loadFile(ee.join(hg, "index.html"));
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
  Fx as MAIN_DIST,
  hg as RENDERER_DIST,
  Qc as VITE_DEV_SERVER_URL
};

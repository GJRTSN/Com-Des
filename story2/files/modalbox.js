/*
ModalBox.js v 1.0.2
Author: sudhanshu yadav
Copyright (c) 2013 Sudhanshu Yadav, released under the MIT license.
s-yadav.github.com
*/
(function (e, t, n, r) {
  e.fn.modalBox = function (e, t) {
    if (a[e]) {
      a[e].call(this, t);
    } else if (typeof e === "object" || !e) {
      a.open.call(this, e);
    }
    return this;
  };
  e.modalBox = {};
  e.modalBox.defaults = {
    width: "auto",
    height: "auto",
    left: "auto",
    top: "auto",
    overlay: true,
    iconClose: false,
    keyClose: true,
    bodyClose: true,
    iconImg: "image/closeIcon.png",
    onOpen: function () {},
    onClose: function () {},
  };
  e.modalBox.close = function () {
    e(".iw-modalBox").each(function () {
      a.close.call(e(this));
    });
  };
  var i = function (t) {
    var n = t.keyCode;
    if (n == 27) {
      e.modalBox.close();
    }
  };
  var s = function (t) {
    if (t.data) {
      a.close.call(t.data.modalBox);
    } else {
      e.modalBox.close();
    }
  };
  var o = function (n) {
    var r = n.data.img,
      i = n.data.elm;
    r.css({
      top: i.offset().top - e(t).scrollTop() - 8 + "px",
      left: i.offset().left - e(t).scrollLeft() + i.width() - 8 + "px",
      position: "fixed",
      "z-index": "99999",
    });
  };
  var u = function () {
    e("body").append('<div class="iw-modalOverlay"></div>');
    e(".iw-modalOverlay").css({
      display: "block",
      width: "100%",
      height: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      "z-index": "1000",
    });
  };
  var a = {
    open: function (r) {
      r = e.extend({}, e.modalBox.defaults, r);
      var a = this,
        f = a.width(),
        l = a.height(),
        c = a.outerWidth(),
        h = a.outerHeight(),
        p = e(t).width(),
        d = e(t).height(),
        v = Math.min(c, p) - (c - f),
        m = Math.min(h, d) - (h - l);
      a.data("iw-size", { width: f, height: l }).addClass("iw-modalBox");
      if (r.width != "auto") {
        a.css("width", r.width);
      } else {
        a.width(v);
      }
      if (r.height != "auto") {
        a.css("height", r.height);
      } else {
        a.height(m);
      }
      var g = "50%",
        y = "50%",
        b = a.outerWidth() / 2,
        w = a.outerHeight() / 2;
      if (r.left != "auto") {
        y = r.left;
        b = "0";
      }
      if (r.top != "auto") {
        g = r.top;
        w = "0";
      }
      a.css({
        top: g,
        left: y,
        position: "fixed",
        display: "block",
        "margin-left": -b,
        "margin-top": -w,
        "z-index": "99999",
      });
      if (r.overlay) {
        u();
      }
      if (r.iconClose) {
        if (a.outerWidth() < p - 50 && a.outerHeight() < d - 50) {
          var E = Math.ceil(Math.random() * 1e3) + "close";
          var S = e(
            '<img src="' + r.iconImg + '" class="iw-closeImg" id="' + E + '"/>'
          );
          a.attr("closeImg", E);
          S.bind("click", { modalBox: a }, s);
          e(t).bind("resize.iw-modalBox", { img: S, elm: a }, o);
          e(t).triggerHandler("resize.iw-modalBox");
          e("body").append(S);
        }
      }
      if (r.keyClose) {
        e(n).bind("keyup.iw-modalBox", i);
      }
      if (r.bodyClose) {
        var x = e(".iw-modalOverlay");
        if (x.length === 0) {
          u();
          x = e(".iw-modalOverlay");
          x.css({ background: "none" });
        }
        x.bind("click", s);
      }
      r.onOpen.call(this);
      a.data("closeFun", r.onClose);
    },
    close: function () {
      var r = this;
      if (r.data("iw-size")) {
        var i = r.attr("closeImg");
        if (i) {
          r.removeAttr("closeImg");
          e("#" + i).remove();
        }
        r.css({ display: "none" });
        var s = r.data("iw-size");
        r.width(s.width);
        r.height(s.height);
        r.data("closeFun").call(this);
        r.removeData("iw-size")
          .removeData("closeFun")
          .removeClass("iw-modalBox");
        if (e(".iw-modalBox").length === 0) {
          e(".iw-modalOverlay").remove();
          e(n).unbind("keyup.iw-modalBox");
          e(t).unbind("resize.iw-modalBox");
        }
      }
    },
  };
})(jQuery, window, document);

(function() {
  var Boomerang;

  Boomerang = (function() {
    function Boomerang(options) {
      this.options = options != null ? options : {};
      if (this.options.localMode) {
        this.cssUrl = "http://localhost:8080/vendor/boomerang/style.css";
      } else {
        this.cssUrl = "https://s3.amazonaws.com/assets.heroku.com/boomerang/boomerang.css";
      }
      this.app = this.options.app;
      this.addon = this.options.addon;
      this.head = document.querySelector("head");
      this.body = document.querySelector("body");
      this.attachStylesheet();
      this.attachDiv();
      window.addEventListener('click', this.hideMenu);
      document.querySelector("#heroku-boomerang a.toggler").addEventListener('click', this.toggleMenu);
      this.body.classList.add("heroku-boomerang-loaded");
    }

    Boomerang.prototype.attachStylesheet = function() {
      var link;
      link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = this.cssUrl;
      return this.head.appendChild(link);
    };

    Boomerang.prototype.attachDiv = function() {
      this.div = document.createElement("div");
      this.div.className = "boomerang";
      this.div.id = "heroku-boomerang";
      this.div.innerHTML = "<a href=\"#\" class=\"toggler logo\">Heroku Add-ons</a>";
      if ((this.app != null) && (this.addon != null)) {
        this.div.innerHTML += "<ul>\n  <li class=\"big\"><a href=\"http://" + this.app + ".herokuapp.com\">" + this.app + "</a></li>\n  <li class=\"sub\"><a href=\"https://dashboard.heroku.com/apps/" + this.app + "/resources\">Resources</a></li>\n  <li class=\"sub\"><a href=\"https://dashboard.heroku.com/apps/" + this.app + "/activity\">Activity</a></li>\n  <li class=\"sub\"><a href=\"https://dashboard.heroku.com/apps/" + this.app + "/collaborators\">Collaborators</a></li>\n  <li class=\"sub\"><a href=\"https://dashboard.heroku.com/apps/" + this.app + "/settings\">Settings</a></li>\n\n  <li class=\"big\"><a href=\"https://addons.heroku.com/" + this.addon + "\">" + this.addon + "</a></li>\n  <li class=\"sub\"><a href=\"https://devcenter.heroku.com/articles/" + this.addon + "\">Docs</a></li>\n</ul>";
      } else {
        this.div.innerHTML += "<ul>\n  <li><a href=\"https://dashboard.heroku.com\">My Apps</a></li>\n  <li><a href=\"https://addons.heroku.com\">Add-ons</a></li>\n  <li><a href=\"https://devcenter.heroku.com\">Documentation</a></li>\n  <li><a href=\"https://help.heroku.com\">Support</a></li>\n</ul>";
      }
      return this.body.appendChild(this.div);
    };

    Boomerang.prototype.hideMenu = function() {
      var h;
      h = document.querySelector("#heroku-boomerang");
      if (h) {
        return h.classList.remove("active");
      }
    };

    Boomerang.prototype.toggleMenu = function(e) {
      if (e == null) {
        e = null;
      }
      document.querySelector("#heroku-boomerang").classList.toggle("active");
      if (e) {
        return e.stopPropagation();
      }
    };

    Boomerang.init = function(options) {
      if (options == null) {
        options = {};
      }
      return window.boomerang = new Boomerang(options);
    };

    Boomerang.reset = function() {
      var h, toggler;
      h = document.getElementById('boomerang');
      if (h) {
        toggler = h.querySelector("a.toggler");
        if (toggler) {
          toggler.removeEventListener('click', this.toggleMenu);
        }
        window.removeEventListener('click', this.hideMenu);
        if (h) {
          return h.parentNode.removeChild(h);
        }
      }
    };

    return Boomerang;

  })();

  window.Boomerang = Boomerang;

  if (document.querySelector('[data-app]') && document.querySelector('[data-addon]')) {
    if (document.readyState === "complete") {
      Boomerang.init();
    } else {
      document.addEventListener("DOMContentLoaded", function() {
        return Boomerang.init();
      });
    }
  }

}).call(this);
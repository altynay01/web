
define("vendor/require/hgn!templates/lib/_crumb", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"crumb");if(t.s(t.f("type",c,p,1),c,p,0,26,41,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" crumb-");t.b(t.v(t.f("type",c,p,0)));});c.pop();}t.b(" js-crumb listselector-selection ui-textboxlist-bit left\"");if(t.s(t.f("id",c,p,1),c,p,0,114,131,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\"");});c.pop();}if(t.s(t.f("key",c,p,1),c,p,0,146,165,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" data-key=\"");t.b(t.v(t.f("key",c,p,0)));t.b("\"");});c.pop();}t.b(">");t.b("\n" + i);t.b("  <div class=\"listselector-selection-display ui-textboxlist-selection-display\">");t.b(t.v(t.f("value",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("  <div class=\"closeX close-btn ui-textboxlist-deletebutton js-remove\">X</div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"crumb{{#type}} crumb-{{type}}{{/type}} js-crumb listselector-selection ui-textboxlist-bit left\"{{#id}} data-id=\"{{id}}\"{{/id}}{{#key}} data-key=\"{{key}}\"{{/key}}>\n  <div class=\"listselector-selection-display ui-textboxlist-selection-display\">{{value}}</div>\n  <div class=\"closeX close-btn ui-textboxlist-deletebutton js-remove\">X</div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/breadcrumbs", ["hogan", "vendor/require/hgn!templates/lib/_crumb"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"filter-crumbs\" class=\"listselector_selections\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("label",c,p,1),c,p,0,69,116,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<span class=\"selections-label\">");t.b(t.v(t.f("label",c,p,0)));t.b("</span>");});c.pop();}t.b("\n" + i);if(t.s(t.f("breadcrumbs",c,p,1),c,p,0,145,167,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_crumb0",c,p,"  "));});c.pop();}t.b("  <span class=\"clear-all-crumbs js-remove-all beicons-pre beicons-pre-x-circle\">");if(t.s(t.f("translate",c,p,1),c,p,0,278,328,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("discover_label_clear_all_filters|Clear All Filters");});c.pop();}t.b("</span>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<lib/_crumb0":{name:"lib/_crumb", partials: {}, subs: {  }}}, subs: {  }}, "<div id=\"filter-crumbs\" class=\"listselector_selections\">\n  {{#label}}<span class=\"selections-label\">{{label}}</span>{{/label}}\n  {{#breadcrumbs}}\n  {{> lib/_crumb}}\n  {{/breadcrumbs}}\n  <span class=\"clear-all-crumbs js-remove-all beicons-pre beicons-pre-x-circle\">{{#translate}}discover_label_clear_all_filters|Clear All Filters{{/translate}}</span>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_crumb": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/Breadcrumbs',[ "jquery", "nbd/View/Element", "hgn!templates/breadcrumbs" ], function(a, b, c) {
    "use strict";
    return b.extend({
        mustache: c,
        template: function(b) {
            return a(this.mustache(b));
        },
        rendered: function() {
            var b = this.$view.find(".js-crumb").on("click", ".js-remove", function(b) {
                this.trigger("remove", a(b.delegateTarget).data());
            }.bind(this));
            this.$view.find(".js-remove-all").on("click", this.trigger.bind(this, "removeall")), 
            this.$parent.toggleClass("hide", !b.length);
        }
    });
});
define('be/Controller/Breadcrumbs',[ "nbd/util/extend", "nbd/Controller", "nbd/trait/pubsub", "be/View/Breadcrumbs" ], function(a, b, c, d) {
    "use strict";
    return b.extend({
        init: function(a) {
            this._initView(this.constructor.VIEW_CLASS, a);
        },
        nubbies: {},
        bind: function(a) {
            this._model = a, this.listenTo(a, "all", function() {
                this.render(a.data());
            }).listenTo(this._view, "all", this.trigger).listenTo(this._view, "remove", this.reset).listenTo(this._view, "removeall", this.removeAll), 
            this.render(a.data());
        },
        reset: function(a) {
            var b = a.key || a, c = this.nubbies[b];
            c && ("function" == typeof c["default"] ? this._model.set(c["default"](a)) : this._model.set(b, c["default"]));
        },
        removeAll: function() {
            Object.keys(this._model.data()).filter(this.nubbies.hasOwnProperty.bind(this.nubbies)).forEach(this.reset, this);
        },
        destroy: function() {
            this._view.destroy(), this._view = null, this.stopListening();
        },
        render: function(b) {
            var c = Object.keys(b).filter(this.nubbies.hasOwnProperty.bind(this.nubbies)).map(function(c) {
                var d, e, f = b[c], g = this.nubbies[c];
                if (f && g) return d = "function" == typeof g ? g.call(c, f) : g[f], e = {
                    id: f,
                    key: c,
                    type: c
                }, "string" == typeof d ? (e.value = d, e) : Array.isArray(d) ? d : "object" == typeof d ? a(e, d) : d;
            }, this).filter(Boolean);
            this._view.render({
                label: this.label,
                breadcrumbs: Array.prototype.concat.apply([], c),
                empty: !!c.length
            });
        }
    }, {
        VIEW_CLASS: d,
        pipeMap: function(a, b) {
            return b.split("|").filter(Boolean).map(function(b) {
                return {
                    id: b,
                    key: this,
                    type: this,
                    value: a.call(this, b)
                };
            }, this);
        },
        resetPiped: function(a) {
            var b, c, d = {};
            return "string" == typeof a ? (d[a] = "", d) : (b = this.get(a.key).split("|"), 
            c = b.indexOf(String(a.id)), -1 !== c && b.splice(c, 1), d[a.key] = b.join("|"), 
            d);
        }
    }).mixin(c);
});
define('beff/Component',[ "nbd/Class", "nbd/util/construct", "nbd/trait/log", "nbd/trait/pubsub" ], function(a, b, c, d) {
    "use strict";
    return a.extend({
        bind: function() {
            return this;
        },
        unbind: function() {
            return this;
        },
        destroy: function() {
            this.off().stopListening().unbind();
        }
    }, {
        displayName: "Component",
        init: function() {
            var a = b.apply(this, arguments);
            return a.bind(), a;
        }
    }).mixin(c).mixin(d);
});
define('discover/coordinator',[ "beff/Component" ], function(a) {
    "use strict";
    return new a();
});
define('discover/lib/correction',[ "page_config", "page_constants", "nbd/util/extend" ], function(a, b, c) {
    "use strict";
    function d(a) {
        var c = a[b.FILTER_KEY_SORT], d = {
            time: b.TIME_KEY_WEEK
        };
        return c && (c === b.SORT_KEY_FEATURED_DATE || c === b.SORT_KEY_PUBLISHED_DATE ? d.time = b.TIME_KEY_ALL : c === b.SORT_KEY_COMMENTS && (d.time = b.TIME_KEY_TODAY)), 
        d;
    }
    function e(a, c) {
        return {
            sort: c.content === b.CONTENT_KEY_WIPS ? b.SORT_KEY_COMMENTS : b.SORT_KEY_APPRECIATIONS
        };
    }
    function f(a, c) {
        var d = [ b.CONTENT_KEY_WIPS, b.CONTENT_KEY_TEAMS, b.CONTENT_KEY_USERS, b.CONTENT_KEY_PROJECTS ];
        d.forEach(function(b) {
            m[b] || (m[b] = {}), m[b][a] = c[a];
        });
    }
    function g(a, b) {
        m[b] = m[b] || {}, c(m[b], a), delete m[b].content;
    }
    function h(a, b) {
        var c;
        for (c in a) if (a[c] != b[c]) return !0;
        return !1;
    }
    function i(a, b, c) {
        "undefined" != typeof a.field && a.field != b.field && (c.user_tags = void 0);
    }
    function j(b) {
        a.ts_mode && (delete b.sort, delete b.time);
    }
    function k(a, c, d) {
        c.similar_to && a.sort && a.sort !== b.SORT_KEY_MOST_SIMILAR && (d.similar_to = void 0);
    }
    function l(a, l) {
        var n, o = l.content, p = {};
        if (g(a, o), !h(a, l)) return p;
        if ("undefined" != typeof a.content && a.content !== b.CONTENT_KEY_USERS && a.content !== b.CONTENT_KEY_TEAMS && l.sort === b.SORT_KEY_FOLLOWED) p.sort = b.SORT_KEY_FEATURED_DATE; else {
            if ("undefined" != typeof a.content && a.content != l.content) return p;
            m[o].sort || c(p, e(a, l));
        }
        m[o].time || c(p, d(c({}, a, p))), i(a, l, p), k(a, l, p), j(p);
        for (n in p) f(n, p);
        return p;
    }
    var m = {};
    return l.clear = function(a) {
        m = a || {};
    }, l.changed = function() {
        return m;
    }, l.coerceSimilar = function(c, d, e) {
        d.sort === b.SORT_KEY_MOST_SIMILAR ? c === b.CONTENT_KEY_TEAMS ? (d.sort = b.SORT_KEY_FEATURED_DATE, 
        d.similar_to = void 0) : c === b.CONTENT_KEY_WIPS ? (d.sort = b.SORT_KEY_COMMENTS, 
        d.similar_to = void 0) : c === b.CONTENT_KEY_PROJECTS && e.content == b.CONTENT_KEY_USERS ? (d.sort = b.SORT_KEY_FEATURED_DATE, 
        d.similar_to = void 0) : c === b.CONTENT_KEY_USERS && e.content == b.CONTENT_KEY_PROJECTS && (d.sort = a.ts_mode ? b.SORT_KEY_RANK : b.SORT_KEY_FEATURED_DATE, 
        d.similar_to = void 0) : d.similar_to = void 0;
    }, l.coerce = function(a, c, d) {
        var e;
        for (e in m[a]) c[e] = m[a][e];
        return l.coerceSimilar(a, c, d), c.sort == b.SORT_KEY_FOLLOWED && (a === b.CONTENT_KEY_PROJECTS ? c.sort = b.SORT_KEY_FEATURED_DATE : a === b.CONTENT_KEY_WIPS && (c.sort = b.SORT_KEY_COMMENTS)), 
        c.sort == b.SORT_KEY_RANK && (a === b.CONTENT_KEY_TEAMS ? c.sort = b.SORT_KEY_FEATURED_DATE : a === b.CONTENT_KEY_WIPS && (c.sort = b.SORT_KEY_COMMENTS)), 
        c;
    }, l;
});
define('discover/Model/Filters',[ "page_config", "page_constants", "nbd/Model", "nbd/util/extend", "nbd/util/deparam", "nbd/util/diff", "discover/lib/correction", "be/history" ], function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = c.extend({
        _offset: 0,
        _timestamp: 0,
        _perpage: 0,
        _stateLoaded: !1,
        init: function() {
            this._super.apply(this, arguments), this._perpage = b.CONTENT_PER_PAGE, this._timestamp = a.timestamp;
        },
        setLoadState: function(a) {
            if (!this._stateLoaded) {
                var b = this.getDefaultFilters(), c = e(a), f = c.content || b.content, i = d({}, b, {
                    content: f
                }), j = g.coerce(f, c, i);
                this.rectify(j.content), this._data = d({}, this.DEFAULTS, j), d(this.DEFAULTS, g(j, this.DEFAULTS)), 
                d(this._data, this.DEFAULTS, j), h.replaceState({
                    filters: j
                }, document.title), this._stateLoaded = !0;
            }
        },
        rectify: function(a) {
            a = a || b.CONTENT_KEY_PROJECTS, this.setDefaultFilters(a);
        },
        getDefaultFilters: function(c) {
            var e = d({}, this.constructor[c] || this.constructor.projects);
            return c === b.CONTENT_KEY_TEAMS && (e.sort = b.SORT_KEY_FOLLOWED), !a.ts_mode || c !== b.CONTENT_KEY_USERS && c !== b.CONTENT_KEY_PROJECTS || (e.content = b.CONTENT_KEY_USERS, 
            e.time = b.TIME_KEY_ALL, e.sort = b.SORT_KEY_RANK), e;
        },
        setDefaultFilters: function(a) {
            this.DEFAULTS = this.getDefaultFilters(a);
        },
        reset: function() {
            var a, b = this.data();
            for (a in b) this.DEFAULTS.hasOwnProperty(a) || delete b[a];
            d(b, this.DEFAULTS);
        },
        updateType: function(a) {
            var b = this.data(), c = f(b, this.DEFAULTS);
            return Object.keys(c).forEach(function(a) {
                c[a] = c[a][0];
            }), c.content = a, this.rectify(a), this.reset(), c = g.coerce(a, c, b), this.set(c), 
            c;
        },
        freshSimilarProjectsSearch: function() {
            b.SIMILAR_OBJECT_NAME = a.viewingProject.title, this._freshSimilarSearch();
        },
        freshSimilarUsersSearch: function() {
            b.SIMILAR_OBJECT_NAME = a.viewingProject.data.owners[0].display_name, this._freshSimilarSearch();
        },
        change: function(a, b) {
            var c, e, f;
            return "string" == typeof a ? (c = {}, c[a] = b) : c = a, e = g(c, this.data()), 
            f = d(this.DEFAULTS, e), c = d(e, c), this.set(c), c;
        },
        offset: function(a) {
            return void 0 === a ? this._offset : this._offset = a;
        },
        timestamp: function(a) {
            return this._timestamp = a;
        },
        toJSON: function() {
            var a = this.data();
            return d({
                ts: this._timestamp,
                ordinal: this._offset,
                per_page: this._perpage[a.content] || 12
            }, a);
        },
        getTruthyData: function() {
            var a, b = d({}, this.data());
            for (a in b) b[a] || delete b[a];
            return b;
        },
        _freshSimilarSearch: function() {
            var a, c = d({}, this._data), e = [ b.FILTER_KEY_CONTENT, b.FILTER_KEY_SORT, b.FILTER_KEY_SIMILAR_TO ];
            for (a in c) -1 === e.indexOf(a) && (c[a] = void 0);
            this.change(c);
        }
    }, {
        projects: {
            field: "",
            content: b.CONTENT_KEY_PROJECTS,
            sort: b.SORT_KEY_FEATURED_DATE,
            time: b.TIME_KEY_ALL,
            location_id: ""
        },
        wips: {
            content: b.CONTENT_KEY_PROJECTS,
            sort: b.SORT_KEY_COMMENTS,
            time: b.TIME_KEY_WEEK,
            location_id: ""
        }
    });
    return new i();
});
define('discover/lib/loader',[ "page_config", "jquery", "be/xhr", "nbd/util/async" ], function(a, b, c, d) {
    "use strict";
    function e(a) {
        p._initialized || (k = a, a.on("all", h), p._initialized = !0);
    }
    function f() {
        return q = !0, l.fireWith(null, arguments), c({
            url: o,
            data: k.toJSON()
        });
    }
    function g(a) {
        if (a && j) try {
            j.abort();
        } catch (b) {}
        if (a || !q && null !== k.offset()) return j = f(), j.then(function() {
            q = !1;
        }, function() {
            q = !1;
        }), j.then(m.fire.bind(m), n.fire.bind(n)), j;
    }
    function h() {
        h.fired || (d(function() {
            k.offset(0), k.timestamp(a.timestamp), g(!0), h.fired = !1;
        }), h.fired = !0);
    }
    function i() {
        p._initialized = !1, k.off("all", h), k = null;
    }
    var j, k, l = new b.Callbacks(), m = new b.Callbacks(), n = new b.Callbacks(), o = "/search", p = {}, q = !1;
    return b.extend(g, {
        before: function() {
            return l.add.apply(l, arguments), g;
        },
        then: function(a, b) {
            return m.add(a), n.add(b), g;
        },
        remove: function(a) {
            return m.remove(a), n.remove(a), g;
        },
        clear: function() {
            return m.empty(), n.empty(), g;
        }
    }), p = {
        load: g,
        bind: e,
        unbind: i,
        _initialized: !1
    };
});
define('be/Controller/Dialog/Roulette',[ "jquery", "nbd/Controller/Responsive", "nbd/Promise" ], function(a, b, c) {
    "use strict";
    var d = b.extend({
        $context: null,
        setContext: function(a) {
            this.$context && this.$context.off("click"), this.$context = a.on("click", function(a) {
                a.isDefaultPrevented() || a.originalEvent.data === this._view || this.toggle(a.delegateTarget);
            }.bind(this));
        },
        render: function(b) {
            var c = a(b).closest(this._view.attachment), d = this._view.render(c.length ? c : document.body);
            return this._view.position(b), d;
        },
        switchView: function() {
            this._view && (this._view.destroy(), this._view = null), this._super.apply(this, arguments);
        },
        toggle: function(a) {
            this._view.$view && this._view.$view.length ? (this._view.toggle(), this._view.position(a)) : c.from(this.render(a || this.$context)).then(this._view.show.bind(this._view));
        }
    });
    return d;
});
define('discover/Controller/Roulette',[ "be/Controller/Dialog/Roulette", "nbd/util/async" ], function(a, b) {
    "use strict";
    var c = a.extend({
        init: function() {
            this._super.apply(this, arguments), this.commit = this.commit.bind(this);
        },
        commit: function() {},
        switchView: function() {
            this._super.apply(this, arguments), this._view.hide();
        },
        toggle: function(a) {
            this.render(a || this.$context), this._view.$view && this._view.$view.length ? this._view.toggle() : b(this._view.show.bind(this._view));
        }
    });
    return c;
});
define('discover/View/Layover',[ "be/View/Dialog/Layover" ], function(a) {
    "use strict";
    var b = a.extend({
        rendered: function() {
            this.$view.on("click", "a", this.hide.bind(this)), this._super();
        }
    });
    return b;
});
define('discover/lib/fields',[ "page_constants", "discover/Model/Filters" ], function(a, b) {
    "use strict";
    return {
        onChange: function(a, b) {
            this.$view && this.$view.find("[data-key=" + b + "] a").removeClass("active").end().find("[data-key=" + a + "] a").addClass("active");
        },
        followed: function() {
            this.$view.find("[data-key=followed]").toggleClass("hide", "projects" === b.get("content")), 
            b.on("content", function(a) {
                this.$view && this.$view.find("[data-key=followed]").toggleClass("hide", "projects" === a);
            }, this);
        },
        correctTime: function() {
            this.$view.find("#time-list").toggleClass("disabled", this._shouldDisableTime(this._model.get("sort"))), 
            this._model.on("sort", function(a) {
                this.$view.find("#time-list").toggleClass("disabled", this._shouldDisableTime(a));
            }, this);
        },
        handleSimilar: function() {
            this._toggleSimilar(this._model.get("sort")), this._model.on("sort", function(a) {
                this._toggleSimilar(a);
            }, this);
        },
        _toggleSimilar: function(b) {
            this.$view.find(".sort-item-most_similar").toggleClass("hide", b !== a.SORT_KEY_MOST_SIMILAR);
        },
        _shouldDisableTime: function(b) {
            var c = [ a.SORT_KEY_PUBLISHED_DATE, a.SORT_KEY_MOST_SIMILAR, a.SORT_KEY_RANK ];
            return -1 !== c.indexOf(b);
        }
    };
});

define("vendor/require/hgn!templates/discover/sort-browse", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"");if(!t.s(t.f("phone",c,p,1),c,p,1,0,0,"")){t.b("sort-menu");};t.b(" cfix ");if(t.s(t.f("phone",c,p,1),c,p,0,57,67,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("phone-list");});c.pop();}if(!t.s(t.f("phone",c,p,1),c,p,1,0,0,"")){t.b("desktop-list");};t.b("\" id=\"featured-menu\">");t.b("\n");t.b("\n" + i);if(!t.s(t.f("phone",c,p,1),c,p,1,0,0,"")){t.b("  <div class=\"list-header\">");if(t.s(t.f("translate",c,p,1),c,p,0,186,214,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("discover_label_browse|Browse");});c.pop();}t.b("</div>");t.b("\n" + i);};t.b("\n" + i);t.b("  <ul id=\"browse-list\" class=\"divided-list\">");t.b("\n" + i);if(t.s(t.f("sorts",c,p,1),c,p,0,304,474,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <li class=\"list-browse sort-item-");t.b(t.v(t.f("id",c,p,0)));t.b("\" data-key=");t.b(t.v(t.f("id",c,p,0)));t.b("><a href=\"?sort=");t.b(t.v(t.f("id",c,p,0)));t.b("\" class=\"discover-sprite-pre discover-sprite sort-item sort-");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.v(t.f("value",c,p,0)));t.b("</a></li>");t.b("\n" + i);});c.pop();}t.b("  </ul>");t.b("\n");t.b("\n" + i);if(!t.s(t.f("phone",c,p,1),c,p,1,0,0,"")){t.b("  <div class=\"list-header hide-teams\">");if(t.s(t.f("translate",c,p,1),c,p,0,559,583,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("discover_label_time|Time");});c.pop();}t.b("</div>");t.b("\n" + i);};t.b("\n" + i);t.b("  <ul id=\"time-list\" class=\"hide-teams divided-list ");if(!t.s(t.f("phone",c,p,1),c,p,1,0,0,"")){t.b("collapsed");};t.b("\">");t.b("\n" + i);if(t.s(t.f("times",c,p,1),c,p,0,712,835,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <li class=\"list-browse\" data-key=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\"><a href=\"?time=");t.b(t.v(t.f("id",c,p,0)));t.b("\" class=\"discover-sprite sort-item\">");t.b(t.v(t.f("value",c,p,0)));t.b("</a></li>");t.b("\n" + i);});c.pop();}t.b("  </ul>");t.b("\n");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"{{^phone}}sort-menu{{/phone}} cfix {{#phone}}phone-list{{/phone}}{{^phone}}desktop-list{{/phone}}\" id=\"featured-menu\">\n\n  {{^phone}}\n  <div class=\"list-header\">{{#translate}}discover_label_browse|Browse{{/translate}}</div>\n  {{/phone}}\n\n  <ul id=\"browse-list\" class=\"divided-list\">\n{{#sorts}}\n    <li class=\"list-browse sort-item-{{id}}\" data-key={{id}}><a href=\"?sort={{id}}\" class=\"discover-sprite-pre discover-sprite sort-item sort-{{id}}\">{{value}}</a></li>\n{{/sorts}}\n  </ul>\n\n  {{^phone}}\n  <div class=\"list-header hide-teams\">{{#translate}}discover_label_time|Time{{/translate}}</div>\n  {{/phone}}\n\n  <ul id=\"time-list\" class=\"hide-teams divided-list {{^phone}}collapsed{{/phone}}\">\n{{#times}}\n    <li class=\"list-browse\" data-key=\"{{id}}\"><a href=\"?time={{id}}\" class=\"discover-sprite sort-item\">{{value}}</a></li>\n{{/times}}\n  </ul>\n\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('discover/View/Layover/Browse',[ "nbd/util/extend", "discover/View/Layover", "discover/lib/fields", "hgn!templates/discover/sort-browse" ], function(a, b, c, d) {
    "use strict";
    var e = b.extend({
        init: function() {
            this._super.apply(this, arguments), this._model.on("sort", this.onChange, this), 
            this._model.on("time", this.onChange, this);
        },
        destroy: function() {
            this._model.off(null, null, this), this._super();
        },
        mustache: d,
        templateData: function() {
            return a({
                phone: !0
            }, this._model.data());
        },
        rendered: function() {
            this._super(), this.$view.find("[data-key=" + this._model.get("sort") + "] a").addClass("active"), 
            this.$view.find("[data-key=" + this._model.get("time") + "] a").addClass("active"), 
            this.followed(), this.correctTime(), this.handleSimilar();
        }
    }).mixin(c);
    return e;
});
define('be/View/Dialog/Menu',[ "jquery", "be/View/Dialog", "nbd/util/async", "jqueryui/position" ], function(a, b, c) {
    "use strict";
    var d = b.extend({
        init: function() {
            this._super.apply(this, arguments), this.dismiss = function(a) {
                a.originalEvent.data !== this && (this.hide(), a.preventDefault());
            }.bind(this);
        },
        destroy: function() {
            this._unbind(), this._super.apply(this, arguments);
        },
        template: function(b) {
            return this._super(a.extend({
                dialogType: "menu",
                blocking: !1,
                hide_toolbar: !0
            }, b));
        },
        rendered: function() {
            this._super();
            var a = this;
            this.$view.on("click touchend", function(b) {
                b.originalEvent = b.originalEvent || {}, b.originalEvent.data = a;
            });
        },
        _bind: function() {
            a("html").on("click touchend", this.dismiss);
        },
        _unbind: function() {
            a("html").off("click touchend", this.dismiss);
        },
        position: function(b, c) {
            if (this.$view) {
                b && (this._lastContext = b);
                var d = {
                    my: "left top",
                    at: "left bottom+10",
                    of: this._lastContext,
                    collision: "flipfit"
                };
                this.$view.position(a.extend(d, c));
            }
        },
        show: function() {
            return this.$view ? (c(this._bind.bind(this)), this.$view.addClass("shown"), this._super()) : void 0;
        },
        hide: function() {
            return this.$view ? (this._unbind(), this.$view.removeClass("shown"), this._super()) : void 0;
        },
        toggle: function() {
            return this[this.$view.hasClass("shown") ? "hide" : "show"]();
        }
    });
    return d;
});
define('discover/View/Menu',[ "jquery", "be/View/Dialog/Menu", "nbd/util/media" ], function(a, b, c) {
    "use strict";
    var d = b.extend({
        attachment: ".sort",
        position: function(b) {
            var d, e = a(b), f = e.find(".beicons-pre"), g = this._controller.$context.width() / 2, h = this.constructor.NUB_OFFSET - g, i = this._controller.$context.offset(), j = this.$view.offset(), k = 20;
            try {
                c("small-tablet", "(max-width: 799px)"), c.is("small-tablet") && (k = 5);
            } catch (l) {}
            return d = Math.floor(i.left) > j.left + Math.abs(h) ? "nub-right" : "", this.$view.removeClass("nub-right").addClass(d), 
            f.length ? this._super(b, {
                my: "left top",
                at: "left+18 bottom-" + k,
                collision: "flip none"
            }) : this._super(b, {
                my: "left top",
                at: "left-12 bottom-" + k,
                collision: "flip none"
            });
        },
        rendered: function() {
            this.$view.on("click", "a", this.dismiss), this._super();
        },
        show: function() {
            this.position(), this._super();
        },
        toggle: function() {
            this.position(), this._super();
        }
    }, {
        NUB_OFFSET: 20
    });
    return d;
});
define('discover/View/Menu/Browse',[ "discover/View/Menu", "discover/lib/fields", "hgn!templates/discover/sort-browse" ], function(a, b, c) {
    "use strict";
    var d = a.extend({
        init: function() {
            this._super.apply(this, arguments), this._model.on("sort", this.onChange, this), 
            this._model.on("time", this.onChange, this), this._model.on("time", this.onTime, this);
        },
        destroy: function() {
            this._model.off(null, null, this), this._super();
        },
        mustache: c,
        rendered: function() {
            this._super();
            var a = this.$view.find("#time-list").on("click", "a", function() {
                return a.hasClass("collapsed") ? (a.removeClass("collapsed"), !1) : void 0;
            });
            this.$view.find("[data-key=" + this._model.get("sort") + "] a").addClass("active"), 
            this.$view.find("[data-key=" + this._model.get("time") + "]").addClass("active-time").find("a").addClass("active"), 
            this.followed(), this.correctTime(), this.handleSimilar();
        },
        onTime: function(a, b) {
            this.$view && this.$view.find("[data-key=" + b + "]").removeClass("active-time").end().find("[data-key=" + a + "]").addClass("active-time");
        },
        hide: function() {
            this.$view && (this.$view.find("#time-list").addClass("collapsed"), this._super());
        },
        toggle: function() {
            this.$view && (this.$view.find("#time-list").addClass("collapsed"), this._super());
        }
    }).mixin(b);
    return d;
});
define('discover/Controller/Roulette/Browse',[ "discover/Controller/Roulette", "discover/View/Layover/Browse", "discover/View/Menu/Browse", "discover/Model/Filters", "page_constants" ], function(a, b, c, d, e) {
    "use strict";
    var f = a.extend({
        init: function() {
            this._super.apply(this, arguments), d.on("sort", function(a) {
                this._model.set("sort", a), this._updateSort(a);
            }, this).on("time", function(a) {
                this._model.set("time", a);
            }, this), this._model.on("sort", this.commit);
        },
        destroy: function() {
            d.off(null, null, this), this._super();
        },
        setContext: function() {
            this._super.apply(this, arguments), this.commit(this._model.get("sort"));
        },
        commit: function(a) {
            this.$context && (a = e.SORTS[a], this.$context.find(".js-sort-label").text(a));
        },
        _updateSort: function(a) {
            if (this.$context) {
                var b = this._model.get("sorts"), c = this.$context.find(".js-sort-label");
                b.forEach(function(b) {
                    b.id === a && c.text(b.value);
                });
            }
        }
    }, {
        VIEW_CLASS: {
            phone: b,
            tablet: c,
            desktop: c
        }
    });
    return f;
});

define("vendor/require/hgn!templates/discover/sort-content", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"list-header\">");if(t.s(t.f("translate",c,p,1),c,p,0,39,63,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("discover_label_view|View");});c.pop();}t.b("</div>");t.b("\n" + i);t.b("<ul class=\"sort-content-list ");if(t.s(t.f("phone",c,p,1),c,p,0,123,135,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("divided-list");});c.pop();}t.b("\">");t.b("\n" + i);if(t.s(t.f("contentTypes",c,p,1),c,p,0,167,286,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <li>");t.b("\n" + i);t.b("    <a class=\"beicons-pre beicons-pre-");t.b(t.v(t.f("icon",c,p,0)));t.b(" js-content-type\" data-key=\"");t.b(t.v(t.f("content",c,p,0)));t.b("\">");t.b(t.v(t.f("label",c,p,0)));t.b("</a>");t.b("\n" + i);t.b("  </li>");t.b("\n" + i);});c.pop();}t.b("</ul>");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"list-header\">{{#translate}}discover_label_view|View{{/translate}}</div>\n<ul class=\"sort-content-list {{#phone}}divided-list{{/phone}}\">\n  {{#contentTypes}}\n  <li>\n    <a class=\"beicons-pre beicons-pre-{{icon}} js-content-type\" data-key=\"{{content}}\">{{label}}</a>\n  </li>\n  {{/contentTypes}}\n</ul>", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('discover/lib/content',[ "jquery", "hgn!templates/discover/sort-content" ], function(a, b) {
    "use strict";
    return {
        init: function() {
            this._super.apply(this, arguments), this.listenTo(this._model, "content", this.onChange);
        },
        rendered: function() {
            this._super(), this.$view.find("[data-key=" + this._model.get("content") + "]").addClass("active"), 
            this.$view.on("click", ".js-content-type", function(b) {
                var c = a(b.target).data("key");
                this._model.set("content", c), this._controller.commit(c);
            }.bind(this));
        },
        onChange: function(b, c) {
            this.$view && (a("#site-content").find(".js-discover-search").val(""), this.$view.find("[data-key=" + c + "]").removeClass("active").end().find("[data-key=" + b + "]").addClass("active"));
        },
        mustache: b
    };
});
define('discover/View/Layover/Content',[ "discover/View/Layover", "discover/lib/content", "nbd/util/extend" ], function(a, b, c) {
    "use strict";
    return a.extend(b).extend({
        templateData: function() {
            return c({
                phone: !0
            }, this._model.data());
        }
    }, {
        displayName: "discover/View/Layover/Content"
    });
});
define('discover/View/Menu/Content',[ "discover/View/Menu", "discover/lib/content" ], function(a, b) {
    "use strict";
    return a.extend(b, {
        displayName: "discover/View/Menu/Content"
    });
});
define('discover/Controller/Roulette/Content',[ "discover/coordinator", "discover/Controller/Roulette", "discover/View/Layover/Content", "discover/View/Menu/Content", "discover/Model/Filters" ], function(a, b, c, d, e) {
    "use strict";
    var f = b.extend({
        init: function() {
            this._super.apply(this, arguments), e.on("content", function(a, b) {
                this._model.set("content", a), this.update(a, b);
            }, this);
        },
        destroy: function() {
            e.off(null, null, this), this._super();
        },
        setContext: function() {
            this._super.apply(this, arguments), this.commit(this._model.get("content"));
        },
        commit: function(b) {
            a.trigger("content.type", b);
        },
        update: function(a, b) {
            if (this.$context) {
                var c = this._model.get("contentMap"), d = this.$context.find(".js-sort-label");
                b && d.removeClass("beicons-pre-" + c[b].icon), d.addClass("beicons-pre-" + c[a].icon).text(c[a].label);
            }
        }
    }, {
        VIEW_CLASS: {
            phone: c,
            tablet: d,
            desktop: d
        }
    });
    return f;
});

define("vendor/require/hgn!templates/discover/sort-fields", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(!t.s(t.f("phone",c,p,1),c,p,1,0,0,"")){t.b("<div class=\"cfix\" id=\"fields-menu\">");t.b("\n");t.b("\n" + i);t.b("  <div class=\"submenu left-menu left\">");t.b("\n" + i);t.b("    <div class=\"list-header\">");if(t.s(t.f("translate",c,p,1),c,p,0,130,160,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("discover_label_popular|Popular");});c.pop();}t.b("</div>");t.b("\n" + i);t.b("    <ul id=\"popular-fields-list\" class=\"js-fields-list\">");t.b("\n" + i);if(!t.s(t.f("mustSelect",c,p,1),c,p,1,0,0,"")){t.b("      <li data-key=\"\"><a href=\"?field=\">");if(t.s(t.f("translate",c,p,1),c,p,0,314,366,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("discover_field_option_all_fields|All Creative Fields");});c.pop();}t.b("</a></li>");t.b("\n" + i);};if(t.s(t.f("populars",c,p,1),c,p,0,425,497,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <li data-key=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\"><a href=\"?field=");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.v(t.f("value",c,p,0)));t.b("</a></li>");t.b("\n" + i);});c.pop();}t.b("    </ul>");t.b("\n" + i);t.b("  </div>");t.b("\n");t.b("\n" + i);t.b("  <div class=\"submenu right-menu left\">");t.b("\n" + i);t.b("    <div class=\"list-header\">");if(t.s(t.f("translate",c,p,1),c,p,0,614,654,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("discover_label_alphabetical|Alphabetical");});c.pop();}t.b("</div>");t.b("\n" + i);};t.b("    <ul class=\"js-fields-list js-fields-list-full divided-list ");if(t.s(t.f("phone",c,p,1),c,p,0,759,769,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("phone-list");});c.pop();}if(!t.s(t.f("phone",c,p,1),c,p,1,0,0,"")){t.b("desktop-list");};t.b("\" id=\"all-fields-list\">");t.b("\n" + i);if(t.s(t.f("phone",c,p,1),c,p,0,849,1239,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      ");if(!t.s(t.f("mustSelect",c,p,1),c,p,1,0,0,"")){t.b("<li data-key=\"\"><a href=\"?field=\">");if(t.s(t.f("translate",c,p,1),c,p,0,919,971,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("discover_field_option_all_fields|All Creative Fields");});c.pop();}t.b("</a></li>");};t.b("\n" + i);t.b("      <li class=\"list-divider\">");if(t.s(t.f("translate",c,p,1),c,p,0,1055,1085,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("discover_label_popular|Popular");});c.pop();}t.b("</li>");t.b("\n" + i);if(t.s(t.f("populars",c,p,1),c,p,0,1124,1221,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <li class=\"list-field\" data-key=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\"><a href=\"?field=");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.v(t.f("value",c,p,0)));t.b("</a></li>");t.b("\n" + i);});c.pop();}});c.pop();}if(t.s(t.f("fields",c,p,1),c,p,0,1265,1470,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <li class=\"list-divider\">");t.b(t.v(t.f("name",c,p,0)));t.b("</li>");t.b("\n" + i);if(t.s(t.f("entries",c,p,1),c,p,0,1329,1453,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <li class=\"list-field js-item\" data-key=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\"><a href=\"?field=");t.b(t.v(t.f("id",c,p,0)));t.b("\" class=\"js-label\">");t.b(t.v(t.f("value",c,p,0)));t.b("</a></li>");t.b("\n" + i);});c.pop();}});c.pop();}t.b("    </ul>");t.b("\n" + i);if(!t.s(t.f("phone",c,p,1),c,p,1,0,0,"")){t.b("  </div>");t.b("\n");t.b("\n" + i);t.b("</div>");t.b("\n" + i);};return t.fl(); },partials: {}, subs: {  }}, "{{^phone}}\n<div class=\"cfix\" id=\"fields-menu\">\n\n  <div class=\"submenu left-menu left\">\n    <div class=\"list-header\">{{#translate}}discover_label_popular|Popular{{/translate}}</div>\n    <ul id=\"popular-fields-list\" class=\"js-fields-list\">\n      {{^mustSelect}}\n      <li data-key=\"\"><a href=\"?field=\">{{#translate}}discover_field_option_all_fields|All Creative Fields{{/translate}}</a></li>\n      {{/mustSelect}}\n{{#populars}}\n      <li data-key=\"{{id}}\"><a href=\"?field={{id}}\">{{value}}</a></li>\n{{/populars}}\n    </ul>\n  </div>\n\n  <div class=\"submenu right-menu left\">\n    <div class=\"list-header\">{{#translate}}discover_label_alphabetical|Alphabetical{{/translate}}</div>\n{{/phone}}\n    <ul class=\"js-fields-list js-fields-list-full divided-list {{#phone}}phone-list{{/phone}}{{^phone}}desktop-list{{/phone}}\" id=\"all-fields-list\">\n    {{#phone}}\n      {{^mustSelect}}<li data-key=\"\"><a href=\"?field=\">{{#translate}}discover_field_option_all_fields|All Creative Fields{{/translate}}</a></li>{{/mustSelect}}\n      <li class=\"list-divider\">{{#translate}}discover_label_popular|Popular{{/translate}}</li>\n      {{#populars}}\n      <li class=\"list-field\" data-key=\"{{id}}\"><a href=\"?field={{id}}\">{{value}}</a></li>\n      {{/populars}}\n    {{/phone}}\n    {{#fields}}\n      <li class=\"list-divider\">{{name}}</li>\n      {{#entries}}\n        <li class=\"list-field js-item\" data-key=\"{{id}}\"><a href=\"?field={{id}}\" class=\"js-label\">{{value}}</a></li>\n      {{/entries}}\n    {{/fields}}\n    </ul>\n{{^phone}}\n  </div>\n\n</div>\n{{/phone}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('discover/View/Layover/Fields',[ "nbd/util/extend", "discover/View/Layover", "discover/lib/fields", "hgn!templates/discover/sort-fields" ], function(a, b, c, d) {
    "use strict";
    var e = b.extend({
        init: function() {
            this._super.apply(this, arguments), this._model.on("field", this.onChange, this);
        },
        destroy: function() {
            this._model.off(null, null, this), this._super();
        },
        mustache: d,
        templateData: function() {
            return a({
                phone: !0
            }, this._model.data());
        },
        rendered: function() {
            this._super(), this.$view.find("[data-key=" + this._model.get("field") + "] a").addClass("active");
        }
    }).mixin(c);
    return e;
});
define('lib/scrollpoint',[ "jquery" ], function(a) {
    "use strict";
    function b(a) {
        return j.test(a) || a > 0 && 1 > a;
    }
    function c(b) {
        if (a.isNumeric(b)) return parseFloat(b);
        var c = j.exec(b);
        return c ? c[1] / 100 : parseInt(b, 10);
    }
    function d(a) {
        return a.is(k) ? l.height() - (window.innerHeight || k.height()) : a.prop("scrollHeight");
    }
    function e(a, c, e) {
        return c > (b(a) ? a * d(e) : parseInt(a, 10));
    }
    function f(b) {
        var c = "window" === b ? k : a(b);
        return function() {
            var a, d, f, g = c.scrollTop();
            for (a in m[b]) d = m[b][a], f = e(a, g, c), d.cache = d.cache || !1, d.cache !== f && (d.fire(f), 
            d.cache = f);
        };
    }
    function g(b, d, e) {
        b = c(b);
        var f = m[e][b];
        f || (f = m[e][b] = new a.Callbacks()), f.add(d);
    }
    function h(a, b, c) {
        c = c || "window";
        var d;
        if (b) {
            if (a) return void m[c][a].remove(b);
            for (d in m[c]) m[c][d].remove(b);
        } else "string" == typeof a && (m[c][a].empty(), delete m[c][a]), c && delete m[c];
    }
    function i(b, c, d) {
        d = d || "window";
        var e, h = "window" === d ? k : a(d);
        m.hasOwnProperty(d) || (m[d] = {}, h.on("scroll", f(d)));
        {
            if ("object" != typeof b) return g(b, c, d);
            for (e in b) g(e, b[e], d);
        }
    }
    var j = /(\d+)%/, k = a(window), l = a(document), m = {};
    return i.on = i, i.off = h, i;
});
define('discover/View/Menu/Fields',[ "discover/View/Menu", "discover/lib/fields", "lib/scrollpoint", "hgn!templates/discover/sort-fields" ], function(a, b, c, d) {
    "use strict";
    var e = a.extend({
        init: function() {
            this._super.apply(this, arguments), this.scrollpoint = this.scrollpoint.bind(this), 
            this._model.on("field", this.onChange, this);
        },
        destroy: function() {
            c.off(this.scrollpoint), this._model.off(null, null, this), this._super();
        },
        mustache: d,
        rendered: function() {
            this._super(), this.$view.find("[data-key=" + this._model.get("field") + "] a").addClass("active"), 
            this.$view.addClass("creative-fields");
        },
        scrollpoint: function(a) {
            var b = this.$parent || this._controller.$context;
            b && b.find(".js-sort-label").toggleClass("active", a || !!this._model.get("field"));
        }
    }).mixin(b);
    return e;
});
define('discover/Controller/Roulette/Fields',[ "discover/Controller/Roulette", "discover/View/Layover/Fields", "discover/View/Menu/Fields", "discover/Model/Filters", "page_constants" ], function(a, b, c, d, e) {
    "use strict";
    var f = a.extend({
        init: function() {
            this._super.apply(this, arguments), d.on("field", function(a) {
                this._model.set("field", a);
            }, this), this._model.on("field", this.commit);
        },
        destroy: function() {
            d.off(null, null, this), this._super();
        },
        setContext: function() {
            this._super.apply(this, arguments), this.commit(this._model.get("field"));
        },
        commit: function(a) {
            this.$context && (a = e.FIELDS[a], this.$context.find(".js-sort-label").toggleClass("active", !!a).text(a || e.FIELDS_ALL));
        }
    }, {
        VIEW_CLASS: {
            phone: b,
            tablet: c,
            desktop: c
        }
    });
    return f;
});
define('lib/autosource',[ "jquery", "nbd/Class" ], function(a, b) {
    "use strict";
    function c(a) {
        var b = new i(a);
        return b.source;
    }
    var d = Array.prototype.push, e = function() {
        return d.apply(this._remotes, arguments), this.source;
    }, f = function() {
        return d.apply(this._local, arguments), this.source;
    }, g = function() {
        return Array.prototype.concat.apply([], arguments);
    }, h = function(a, b) {
        return this.filter([], a).concat(b);
    }, i = b.extend({
        _blacklist: "",
        options: {
            maxLocal: 1 / 0,
            caseInsensitive: !1,
            minLength: 1
        },
        init: function(b) {
            this._remotes = [], this._local = [], this.setOptions(b), this.source = a.extend(this.source.bind(this), {
                addRemote: e.bind(this),
                addLocal: f.bind(this)
            });
        },
        setOptions: function(b) {
            a.extend(this.options, b);
        },
        callRemote: function(b) {
            return a.isFunction(b) ? b(this) : b;
        },
        callLocal: function(b) {
            return a.isFunction(b) ? b(this) : b;
        },
        filter: function(a, b) {
            this._filterMemo = this._filterMemo || {};
            var c, d, e = [], f = this.options.maxLocal || 1 / 0, g = b.term;
            if (this.options.caseInsensitive && (g = g.toLocaleLowerCase()), this._filterMemo[g]) return this._filterMemo[g];
            for (c = 0; c < a.length && e.length < f; ++c) d = a[c].value, this.options.caseInsensitive && (d = d.toLocaleLowerCase()), 
            d.indexOf(g) >= 0 && e.push(a[c]);
            return this._filterMemo[g] = e;
        },
        source: function(b, c) {
            if (!(b.term.length < this.options.minLength)) {
                var d = this._local.length ? this.filter(g.apply(null, this._local.map(this.callLocal, b)), b) : [];
                this._remotes.length ? (d.length && c(d), a.when.apply(a, this._remotes.map(this.callRemote, b)).then(g).then(h.bind(this, b)).then(c)) : c(d);
            }
        },
        setBlacklist: function(a) {
            this._blacklist = a;
        }
    });
    return c.constructor = i, c.init = function(a) {
        return new i(a);
    }, c;
});

define("vendor/require/hgn!templates/discover/suggest-item", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("divider",c,p,1),c,p,0,12,104,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<div class=\"ui-menu-divider\"></div>");t.b("\n" + i);t.b("<div class=\"ui-menu-divider-label\">");t.b(t.v(t.f("typelabel",c,p,0)));t.b("</div>");t.b("\n" + i);});c.pop();}t.b("<li class=\"ui-menu-item-");t.b(t.v(t.f("type",c,p,0)));t.b("\"><a class=\"text-ellipsis\">");t.b(t.v(t.f("value",c,p,0)));t.b("</a></li>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "{{#divider}}\n<div class=\"ui-menu-divider\"></div>\n<div class=\"ui-menu-divider-label\">{{typelabel}}</div>\n{{/divider}}\n<li class=\"ui-menu-item-{{type}}\"><a class=\"text-ellipsis\">{{value}}</a></li>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('jquery-plugins/plugins/jquery.autoselectmenu',[ "jquery", "./jquery.ui.selectmenu" ], function(a) {
    "use strict";
    a.fn.autoselectmenu = function() {
        return this.each(function() {
            var b = a(this), c = (b.find("option").outerWidth(), {}), d = function() {
                b.changeInput("value", this.value);
            };
            !b.data("uiSelectmenu") && b.is(":visible") && (c = {
                style: "dropdown",
                maxHeight: 200,
                menuWidth: b.outerWidth()
            }, b.hasClass("ui-selectmenu-dropdown-right") && (c.positionOptions = {
                my: "right top",
                at: "right bottom",
                offset: null
            }), b.width() > 0 && (c.width = "auto"), b.selectmenu(c).on("change keyup", d));
        });
    };
});
define('be/location',[ "jquery", "has", "nbd/util/async", "nbd/util/extend", "beff/Component", "lib/autosource", "lib/tooltip", "be/xhr", "hgn!templates/discover/suggest-item", "jquery-plugins/be/autosuggest", "jquery-plugins/plugins/jquery.changeinput", "jquery-plugins/plugins/jquery.autoselectmenu" ], function(a, b, c, d, e, f, g, h, i) {
    "use strict";
    function j(a) {
        return a.value = a.n, a;
    }
    function k(a) {
        return a.map(j);
    }
    var l = b("touch");
    return e.extend({
        init: function(b, c) {
            this._options = d({
                country: ".country, .js-country",
                state: ".state, .js-state",
                province: ".province, .js-province",
                hidden_state: ".hidden-state, .js-hidden-state",
                city: ".city, .js-city",
                hidden_city: ".js-hidden-city",
                showErrors: !0,
                disableState: !1,
                autoSelectMenu: !1
            }, c);
            var e = b.find(this._options.city), f = b.find(this._options.hidden_city);
            f.length || (f = a("<input>", {
                type: "hidden",
                name: "location_id"
            }).insertAfter(e)), this._$context = b, this._$country = b.find(this._options.country), 
            this._$state = b.find(this._options.state), this._$province = b.find(this._options.province), 
            this._$stateProvince = this._$state.add(this._$province), this._$hiddenState = b.find(this._options.hidden_state), 
            this._$city = e, this._lastSelected = this._$city.val() || !1, this._$locationId = f, 
            this._$cityAndLocationId = e.add(f);
        },
        bind: function() {
            var a = this.getStateOrProvinceField();
            this._$country.on("change", function(a) {
                this._reset(), this._countryChanged(a.target.value);
            }.bind(this)), this._$stateProvince.on("change", function(a) {
                this._resetCityValue(), this._stateChanged(a.target.value);
            }.bind(this)), this._autoselect(), this._options.disableState && (this._$stateProvince.changeInput("disable"), 
            a && a.changeInput("enable")), this.refresh(), this._$city.add(this._$state, this._$province, this._$country).on("change selectmenuchange", function() {
                this.trigger("change", this.get());
            }.bind(this));
        },
        get: function(a) {
            var b = this._$country.find('[value="' + this._$country.val() + '"]');
            return {
                country: a ? this._$country.val() || b.data("code") || b.attr("code") : b.data("code") || b.attr("code") || this._$country.val(),
                state: this._$hiddenState.val(),
                location_id: this._$locationId.val(),
                city: this._$city.val()
            };
        },
        toString: function() {
            var a = this.get();
            return [ "city", "state", "country" ].reduce(function(b, c) {
                return a[c] && b.push(a[c]), b;
            }, []).join(", ");
        },
        refresh: function() {
            var a = this._$country.val(), b = this.getStateOrProvinceField();
            this._countryChanged(a), this._requiresStateOrProvince(a) && this._stateChanged(b && b.length ? b.val() : ""), 
            this._shouldAutoSelect() && this._$context.find("select").autoselectmenu(), this._$city.autosuggest("option", "width", this._$city.outerWidth());
        },
        getStateOrProvinceField: function() {
            var a = this._$country.val();
            return this._isUnitedStates(a) ? this._$state : this._isCanada(a) ? this._$province : void 0;
        },
        getCityField: function() {
            return this._$city;
        },
        getCountryField: function() {
            return this._$country;
        },
        getCountryFromISOCode: function(a) {
            return this._$country.find('[data-code="' + a + '"]').val() || this._$country.find('[value="' + a + '"]').val() || "";
        },
        setLocationId: function(a) {
            this._$locationId.val(a);
        },
        setCity: function(a, b) {
            this._$city.val(a), this._$context.toggleClass("city-selected", !!a), this._lastSelected = a || !1, 
            void 0 !== b && this.setLocationId(b), this.trigger("change", this.get());
        },
        _countryChanged: function(a) {
            var b = this.getStateOrProvinceField(a);
            b ? this._toggleStateOrProvince(b) : "" !== a && this._enableCity(), this._$context.toggleClass("showing-stateprov", !!b);
        },
        _stateChanged: function(a) {
            this._$hiddenState.val(a), this._toggleCity(!!a);
        },
        _requiresStateOrProvince: function(a) {
            return this._isUnitedStates(a) || this._isCanada(a);
        },
        _isUnitedStates: function(a) {
            return "US" === a || "United States" === a;
        },
        _isCanada: function(a) {
            return "CA" === a || "Canada" === a;
        },
        _toggleStateOrProvince: function(a) {
            var b = a.closest(a.data("containerSelector"));
            b = b.length ? b : a.parent(), b.removeClass("hide"), a.changeInput("enable"), this._shouldAutoSelect() && a.autoselectmenu();
        },
        _toggleCity: function(a) {
            a ? this._enableCity() : this._disableCity();
        },
        _disableCity: function() {
            this._$cityAndLocationId.addClass("disabled").prop("disabled", !0);
        },
        _enableCity: function() {
            (this._$cityAndLocationId.is(".disabled") || this._$cityAndLocationId.is(":disabled")) && this._$cityAndLocationId.removeClass("disabled").removeAttr("disabled");
        },
        _shouldAutoSelect: function() {
            return this._options.autoSelectMenu && !l;
        },
        _reset: function() {
            this._resetValues(), this._resetVisibility();
        },
        _resetVisibility: function() {
            var a, b = this._$stateProvince;
            this._disableCity(), b && (a = b.closest(b.data("containerSelector")), a = a.length ? a : b.parent(), 
            a.addClass("hide"), this._options.disableState && b.changeInput("disable"));
        },
        _resetCityValue: function() {
            this._$city.is(".autocomplete") && this._$city.autoselect("empty"), this.setCity("", "");
        },
        _resetValues: function() {
            this._$stateProvince.changeInput("value", ""), this._$hiddenState.val(""), this._removeErrors(this._$city), 
            this._resetCityValue();
        },
        _removeErrors: function(a) {
            a.siblings(".form-error").remove(), a.parent().removeClass("form-item-error");
        },
        _autoselect: function() {
            var b = f({
                caseInsensitive: !0
            }), d = this._$hiddenState, e = this._$country, j = this._$stateProvince, l = this._$city, m = this;
            b.addRemote(function(a) {
                var b = a.term, c = e.find('option[value="' + e.val() + '"]'), f = j.find('option[value="' + d.val() + '"]'), g = c.data("code") || c.attr("code") || e.val(), i = f.data("code") || f.attr("code") || d.val();
                return h({
                    url: "/utilities/location",
                    data: {
                        level: "3",
                        country: g,
                        stateprov: i,
                        city: b
                    }
                }).then(k);
            }), l.on("keyup", function() {
                m._lastSelected !== !1 && m._lastSelected !== this.value && (m._$context.removeClass("city-selected"), 
                m._lastSelected = !1, m.trigger("pendingChange", m.get()));
            }), l.autosuggest({
                source: b,
                position: {
                    my: "right top",
                    at: "right bottom"
                },
                itemTemplate: i,
                minLength: 2,
                width: l.outerWidth()
            }).on({
                autosuggestselect: function(a, b) {
                    c(function() {
                        m.setCity(b.item.value, b.item.location_id);
                    });
                },
                autosuggestchange: function(b, c) {
                    var d = c.item, e = a(this).data("beAutosuggest");
                    m._removeErrors(l), d || e.widget().children().each(function() {
                        var b = a(this).data("ui-autocomplete-item");
                        return new RegExp("^" + b.value + "$", "gi").test(e.term) ? (d = b, !1) : void 0;
                    }), !d && m._options.showErrors && g(l, "Please type in your city.", [ "form-error" ]), 
                    m.setLocationId(d && d.location_id), m.setCity(d && d.value), e._trigger("changevalidated", null, {
                        valid: !!d
                    });
                },
                blur: function() {
                    "" === l.val().trim() && (m._removeErrors(l), m._resetCityValue(), m._options.showErrors && g(l, "Please type in your city.", [ "form-error" ]));
                }
            });
        }
    });
});
define('be/ProximitySlider',[ "jquery", "beff/Component", "jqueryui/slider" ], function(a, b) {
    "use strict";
    function c(a) {
        return (1.60934 * +a).toFixed(1);
    }
    function d(a, b, d, e) {
        d = +d || 0, e = e || 0, a.find(".js-mi").text(d).end().find(".js-km").text(c(d)), 
        b.css("width", d / e * 100 + "%");
    }
    return b.extend({
        init: function(b, c) {
            this.$progress = a('<div class="ui-progress"/>'), this.$slider = b.find(".js-proximity-slider"), 
            this.model = c, this.defaultProximity = this.model.get("defaultProximity") || this.model.get("proximity"), 
            this.updateDisplay = d.bind(null, b, this.$progress), this.listenTo(this.model, "proximity", this.setValue), 
            this.$slider.on("slide slidechange", this._onChange.bind(this));
        },
        _onChange: function(a, b) {
            this.updateDisplay(b.value, this.model.get("max")), this.trigger("change");
        },
        bind: function() {
            var a = this.model.get("proximity") || this.defaultProximity, b = {
                value: a,
                max: this.model.get("max")
            };
            return this.$slider.slider(b).prepend(this.$progress), this.updateDisplay(a, this.model.get("max")), 
            this;
        },
        getValue: function() {
            return this.$slider.slider("value");
        },
        setValue: function(a) {
            return null == a && (a = this.defaultProximity), this.$slider.slider("value", a), 
            this;
        }
    });
});

define("vendor/require/hgn!templates/discover/sidebar-menu", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"sort-menu search-option ");if(!t.s(t.f("confirm",c,p,1),c,p,1,0,0,"")){t.b("search-option-no-confirm");};t.b(" ");if(t.s(t.f("classes",c,p,1),c,p,0,97,102,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.v(t.d(".",c,p,0)));});c.pop();}t.b("\">");t.b("\n");t.b("\n" + i);t.b("  ");if(t.s(t.f("title",c,p,1),c,p,0,130,179,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<div class=\"search-option-header\">");t.b(t.v(t.f("title",c,p,0)));t.b("</div>");});c.pop();}t.b("\n");t.b("\n" + i);t.b("  <div class=\"search-option-content\">");t.b("\n" + i);if(t.s(t.f("field",c,p,1),c,p,0,241,318,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <input id=\"");t.b(t.v(t.f("field",c,p,0)));t.b("\" type=\"text\" class=\"form-text form-text-normal\">");t.b("\n" + i);});c.pop();}t.b("    ");t.b(t.t(t.f("content",c,p,0)));t.b("\n" + i);t.b("  </div>");t.b("\n");t.b("\n" + i);if(t.s(t.f("confirm",c,p,1),c,p,0,371,712,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <div class=\"search-option-confirm clear\">");t.b("\n" + i);t.b("    <span class=\"js-apply form-button form-button-small form-button-default left\">");if(t.s(t.f("translate",c,p,1),c,p,0,512,538,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("discover_label_apply|Apply");});c.pop();}t.b("</span>");t.b("\n" + i);t.b("    <span class=\"js-clear search-option-cancel discover-sprite-pre right hide\">");if(t.s(t.f("translate",c,p,1),c,p,0,653,679,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("discover_label_clear|Clear");});c.pop();}t.b("</span>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);});c.pop();}t.b("\n" + i);t.b("  <div class=\"search-option-nub\"></div>");t.b("\n");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"sort-menu search-option {{^confirm}}search-option-no-confirm{{/confirm}} {{#classes}}{{.}}{{/classes}}\">\n\n  {{#title}}<div class=\"search-option-header\">{{title}}</div>{{/title}}\n\n  <div class=\"search-option-content\">\n  {{#field}}\n    <input id=\"{{field}}\" type=\"text\" class=\"form-text form-text-normal\">\n  {{/field}}\n    {{{content}}}\n  </div>\n\n  {{#confirm}}\n  <div class=\"search-option-confirm clear\">\n    <span class=\"js-apply form-button form-button-small form-button-default left\">{{#translate}}discover_label_apply|Apply{{/translate}}</span>\n    <span class=\"js-clear search-option-cancel discover-sprite-pre right hide\">{{#translate}}discover_label_clear|Clear{{/translate}}</span>\n  </div>\n  {{/confirm}}\n\n  <div class=\"search-option-nub\"></div>\n\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_proximity", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"");if(!t.s(t.d("proximity.show",c,p,1),c,p,1,0,0,"")){t.b("hide ");};t.b("proximity js-proximity\">");t.b("\n" + i);t.b("  <div class=\"sub-label\">");t.b("\n" + i);t.b("    <span class=\"sub-label-text\">");if(t.s(t.f("translate",c,p,1),c,p,0,153,179,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("search_proximity|Proximity");});c.pop();}t.b("</span>");t.b("\n" + i);t.b("    <span class=\"sub-label-note\">");if(t.s(t.f("translate",c,p,1),c,p,0,248,345,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("search_proximity_note|Within <span class=\"js-mi\">0</span> Miles (<span class=\"js-km\">0</span> km)");});c.pop();}t.b("</span>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div id=\"proximity\" class=\"js-proximity-slider\"></div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"{{^proximity.show}}hide {{/proximity.show}}proximity js-proximity\">\n  <div class=\"sub-label\">\n    <span class=\"sub-label-text\">{{#translate}}search_proximity|Proximity{{/translate}}</span>\n    <span class=\"sub-label-note\">{{#translate}}search_proximity_note|Within <span class=\"js-mi\">0</span> Miles (<span class=\"js-km\">0</span> km){{/translate}}</span>\n  </div>\n  <div id=\"proximity\" class=\"js-proximity-slider\"></div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/discover/location", ["hogan", "vendor/require/hgn!templates/lib/_proximity"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"country-container form-item cfix\">");t.b("\n" + i);t.b("  <label>");t.b(t.v(t.d("labels.COUNTRY",c,p,0)));t.b("</label>");t.b("\n" + i);t.b("  <select class=\"js-country country form-select ui-selectmenu-large\">");t.b("\n" + i);t.b("  <option class=\"form-option form-option-empty\" value=\"\">");t.b(t.v(t.d("placeholders.COUNTRY",c,p,0)));t.b("</option>");t.b("\n" + i);if(t.s(t.f("countries",c,p,1),c,p,0,260,349,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <option class=\"form-option\" data-code=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" value=\"");t.b(t.v(t.f("value",c,p,0)));t.b("\">");t.b(t.v(t.f("value",c,p,0)));t.b("</option>");t.b("\n" + i);});c.pop();}t.b("  </select>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"state-container hide form-item cfix\">");t.b("\n" + i);t.b("  <label>");t.b(t.v(t.d("labels.STATE",c,p,0)));t.b("</label>");t.b("\n" + i);t.b("  <select class=\"js-state state form-select ui-selectmenu-large\">");t.b("\n" + i);t.b("  <option class=\"form-option form-option-empty\" value=\"\">");t.b(t.v(t.d("placeholders.STATE",c,p,0)));t.b("</option>");t.b("\n" + i);if(t.s(t.f("states",c,p,1),c,p,0,636,725,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <option class=\"form-option\" data-code=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" value=\"");t.b(t.v(t.f("value",c,p,0)));t.b("\">");t.b(t.v(t.f("value",c,p,0)));t.b("</option>");t.b("\n" + i);});c.pop();}t.b("  </select>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"province-container hide form-item cfix\">");t.b("\n" + i);t.b("  <label>");t.b(t.v(t.d("labels.PROVINCE",c,p,0)));t.b("</label>");t.b("\n" + i);t.b("  <select class=\"js-province province form-select ui-selectmenu-large\">");t.b("\n" + i);t.b("  <option class=\"form-option form-option-empty\" value=\"\">");t.b(t.v(t.d("placeholders.PROVINCE",c,p,0)));t.b("</option>");t.b("\n" + i);if(t.s(t.f("provinces",c,p,1),c,p,0,1027,1116,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <option class=\"form-option\" data-code=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" value=\"");t.b(t.v(t.f("value",c,p,0)));t.b("\">");t.b(t.v(t.f("value",c,p,0)));t.b("</option>");t.b("\n" + i);});c.pop();}t.b("  </select>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<input type=\"hidden\" class=\"js-hidden-state hidden-state\" />");t.b("\n");t.b("\n" + i);t.b("<div class=\"city-container form-item cfix ui-front\">");t.b("\n" + i);t.b("  <label>");t.b(t.v(t.d("labels.CITY",c,p,0)));t.b("</label>");t.b("\n" + i);t.b("  <input type=\"text\" class=\"js-city city form-text form-text-normal disabled\" disabled=\"disabled\">");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n" + i);if(t.s(t.f("has_talent_search",c,p,1),c,p,0,1428,1448,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_proximity0",c,p,""));});c.pop();}return t.fl(); },partials: {"<lib/_proximity0":{name:"lib/_proximity", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"country-container form-item cfix\">\n  <label>{{labels.COUNTRY}}</label>\n  <select class=\"js-country country form-select ui-selectmenu-large\">\n  <option class=\"form-option form-option-empty\" value=\"\">{{placeholders.COUNTRY}}</option>\n  {{#countries}}\n  <option class=\"form-option\" data-code=\"{{id}}\" value=\"{{value}}\">{{value}}</option>\n  {{/countries}}\n  </select>\n</div>\n\n<div class=\"state-container hide form-item cfix\">\n  <label>{{labels.STATE}}</label>\n  <select class=\"js-state state form-select ui-selectmenu-large\">\n  <option class=\"form-option form-option-empty\" value=\"\">{{placeholders.STATE}}</option>\n  {{#states}}\n  <option class=\"form-option\" data-code=\"{{id}}\" value=\"{{value}}\">{{value}}</option>\n  {{/states}}\n  </select>\n</div>\n\n<div class=\"province-container hide form-item cfix\">\n  <label>{{labels.PROVINCE}}</label>\n  <select class=\"js-province province form-select ui-selectmenu-large\">\n  <option class=\"form-option form-option-empty\" value=\"\">{{placeholders.PROVINCE}}</option>\n  {{#provinces}}\n  <option class=\"form-option\" data-code=\"{{id}}\" value=\"{{value}}\">{{value}}</option>\n  {{/provinces}}\n  </select>\n</div>\n\n<input type=\"hidden\" class=\"js-hidden-state hidden-state\" />\n\n<div class=\"city-container form-item cfix ui-front\">\n  <label>{{labels.CITY}}</label>\n  <input type=\"text\" class=\"js-city city form-text form-text-normal disabled\" disabled=\"disabled\">\n</div>\n\n{{#has_talent_search}}{{> lib/_proximity}}{{/has_talent_search}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_proximity": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('discover/lib/locate',[ "page_config", "page_constants", "has", "nbd/util/extend", "be/location", "be/ProximitySlider", "discover/Model/Filters", "hgn!templates/discover/sidebar-menu", "hgn!templates/discover/location", "jquery-plugins/plugins/jquery.ui.selectmenu" ], function(a, b, c, d, e, f, g, h, i) {
    "use strict";
    return {
        mustache: h,
        templateData: function() {
            var c = d({
                has_talent_search: a.has_talent_search,
                labels: b.LOCATION.LABELS,
                placeholders: b.LOCATION.PLACEHOLDERS
            }, this._model.data());
            return d({
                content: i(c),
                confirm: !0
            }, c);
        },
        rendered: function() {
            this.$proximity = this.$view.find(".js-proximity"), this.$apply = this.$view.find(".js-apply"), 
            this.$clear = this.$view.find(".js-clear"), this.$view.addClass("location-menu").on("click", ".ui-menu a", function(a) {
                a.stopImmediatePropagation();
            }), this._super(), this.location = e.init(this.$view.find(".search-option-content")), 
            c("touch") || this.$view.find("select").selectmenu(), this.proximity(), this.preload(), 
            this.$apply.on("click", this.apply.bind(this)), this.$clear.on("click", this.reset.bind(this));
        },
        hide: function() {
            return this._super(), this.$view && this.$view.find(".form-error").remove();
        },
        proximity: function() {
            var a = this;
            this.$proximity.length && (this.proximitySlider = f.init(this.$proximity, this._model), 
            this.location.getCityField().on("autosuggestselect change", function() {
                a.$proximity.toggleClass("hide", !this.value);
            }));
        },
        preload: function() {
            var a, b, c, d, e;
            (a = g.get("country")) && this.location.getCountryField().changeInput("value", this.location.getCountryFromISOCode(a)), 
            (b = g.get("state")) && (c = this.location.getStateOrProvinceField(), c && c.changeInput("value", b)), 
            (d = g.get("city")) && (this.location.setCity(d), this.$proximity.removeClass("hide")), 
            (e = g.get("location_id")) && this.location.setLocationId(e), this._toggleClearButton();
        },
        reset: function() {
            this.location.getCountryField().selectmenu("value", ""), this.$proximity.addClass("hide"), 
            this._update({
                country: void 0,
                state: void 0,
                city: void 0,
                location_id: void 0,
                proximity: void 0
            });
        },
        _update: function(a) {
            this._model.set(a), g.change(a), this._toggleClearButton();
        },
        _toggleClearButton: function() {
            this.$clear.toggleClass("hide", !this._model.get("country"));
        },
        apply: function(a) {
            if (!this.$apply.hasClass("form-button-disabled") || a) {
                var b = this.location.get();
                this.proximitySlider && (b.proximity = +this.proximitySlider.getValue() || 0), this._update(b), 
                this.hide();
            }
        }
    };
});
define('discover/View/Layover/Locate',[ "discover/View/Layover", "discover/lib/locate" ], function(a, b) {
    "use strict";
    return a.extend(b, {
        displayName: "discover/View/Layover/Locate"
    });
});
define('discover/View/Menu/Locate',[ "discover/View/Menu", "discover/lib/locate" ], function(a, b) {
    "use strict";
    return a.extend(b, {
        displayName: "discover/View/Menu/Locate"
    });
});
define('discover/Controller/Roulette/Locate',[ "jquery", "nbd/util/async", "be/localization", "discover/Controller/Roulette", "discover/View/Layover/Locate", "discover/View/Menu/Locate", "discover/Model/Filters" ], function(a, b, c, d, e, f, g) {
    "use strict";
    var h = d.extend({
        init: function() {
            this._super.apply(this, arguments), g.on("country", function(a) {
                this._model.set("country", a);
            }, this).on("state", function(a) {
                this._model.set("state", a);
            }, this).on("city", function(a) {
                this._model.set("city", a);
            }, this).on("sort field", this.underflow, this), this._model.on("country state city", this.commit), 
            this.underflow();
        },
        commit: function() {
            if (this.$context) {
                var a = this._model.data(), b = [ a.city, a.state, a.country ].filter(Boolean).join(", ");
                this.$context.find(".js-sort-label").text(b || c.translate("discover_location_option_worldwide", "Worldwide")), 
                this.underflow();
            }
        },
        underflow: function i() {
            i.count = i.count || 0, 0 === i.count++ && b(function() {
                var b = this.$context.find(".js-sort-label").css("width", ""), c = this.$context.siblings().addBack().get().reduce(function(b, c) {
                    return b + a(c).outerWidth(!0);
                }, 10 - a(".js-sorts").width());
                c > 0 && b.css("width", "-=" + c), i.count = 0;
            }.bind(this));
        }
    }, {
        VIEW_CLASS: {
            phone: e,
            tablet: f,
            desktop: f
        }
    });
    return h;
});
define('discover/View/Sorts',[ "page_constants", "jquery", "nbd/View/Element", "be/localization", "discover/Model/Filters", "discover/Controller/Roulette/Browse", "discover/Controller/Roulette/Content", "discover/Controller/Roulette/Fields", "discover/Controller/Roulette/Locate" ], function(a, b, c, d, e, f, g, h, i) {
    "use strict";
    var j = c.extend({
        fields: null,
        browse: null,
        locate: null,
        content: null,
        init: function() {
            function b(b, c) {
                return {
                    id: c,
                    value: a[b][c]
                };
            }
            this._super.apply(this, arguments), this.$view = this.$parent.find("#sorts");
            var c, d, e, f = {};
            for (c in a.FIELDS) d = a.FIELDS[c], e = d.charAt(0), f[e] = f[e] || [], f[e].push({
                id: c,
                value: d
            });
            Object.keys(f).forEach(function(a) {
                f[a].sort(function(a, b) {
                    return a.value > b.value ? 1 : -1;
                });
            }), this.fields_data = Object.keys(f).sort().map(function(a) {
                return {
                    name: a,
                    entries: f[a]
                };
            }), this.popular_data = a.FIELDS_ORDER.map(b.bind(null, "FIELDS")).sort(function(a, b) {
                return a.value > b.value ? 1 : -1;
            }), this.sorts_data = a.SORTS_ORDER.map(b.bind(null, "SORTS")), this.times_data = a.TIMES_ORDER.map(b.bind(null, "TIMES")), 
            this.countries_data = Object.keys(a.LOCATION.COUNTRIES).map(function(b) {
                return {
                    id: b,
                    value: a.LOCATION.COUNTRIES[b]
                };
            }).sort(function(a, b) {
                return "US" === a.id ? -1 : "US" === b.id ? 1 : a.value > b.value ? 1 : -1;
            }), this.states_data = a.LOCATION.STATES.map(function(b, c) {
                return {
                    id: a.LOCATION.STATE_CODES[c],
                    abbrev: a.LOCATION.STATE_ABBREVIATIONS[c],
                    value: b
                };
            }), this.provinces_data = a.LOCATION.PROVINCES.map(function(b, c) {
                return {
                    id: a.LOCATION.PROVINCE_CODES[c],
                    value: b
                };
            }), this.content_types = a.CONTENT_KEYS.reduce(function(a, b) {
                return a[b.content] = {
                    label: b.label,
                    icon: b.icon
                }, a;
            }, {});
        },
        destroy: function() {
            e.off(null, null, this), this._super();
        },
        template: b,
        rendered: function() {
            this.projectRoulettes(this.$view);
        },
        projectRoulettes: function(b) {
            var c = b.find(".js-sort-content"), j = b.find(".js-sort-fields"), k = b.find(".js-sort-featured"), l = b.find(".js-sort-location");
            this.fields = new h({
                field: e.get("field"),
                fields: this.fields_data,
                populars: this.popular_data,
                title: d.translate("discover_label_creative_fields", "Creative Fields")
            }), this.fields.setContext(j), this.browse = new f({
                time: e.get("time"),
                sort: e.get("sort"),
                sorts: this.sorts_data,
                times: this.times_data,
                title: d.translate("discover_label_sort", "Sort")
            }), this.browse.setContext(k), this.locate = new i({
                title: a.LOCATION.LABEL,
                country: e.get("country"),
                state: e.get("state"),
                city: e.get("city"),
                countries: this.countries_data,
                states: this.states_data,
                provinces: this.provinces_data,
                proximity: e.get("proximity"),
                defaultProximity: 30,
                max: 500
            }), this.locate.setContext(l), this.content = new g({
                content: e.get("content"),
                contentTypes: a.CONTENT_KEYS,
                contentMap: this.content_types
            }), this.content.setContext(c);
        }
    });
    return j;
});
define('discover/filter',[ "page_constants", "jquery", "nbd/util/media", "be/Controller/Breadcrumbs", "discover/coordinator", "discover/Model/Filters", "discover/lib/loader", "discover/View/Sorts", "jquery-plugins/plugins/jquery.sticky" ], function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = function(b) {
        return a[this.toUpperCase()][b].n;
    }, j = d.resetPiped.bind(f);
    return {
        _crumbs: null,
        init: function(k) {
            function l() {
                var a = c.is("desktop") ? b(".js-nav-primary").height() : 0;
                return p.data("sticky") ? (p.data("sticky").topSpacing = a, void p.sticky("update")) : void p.sticky({
                    wrapperClassName: "sticky",
                    topSpacing: a
                });
            }
            function m() {
                o.on("remove", function(b) {
                    b.key === a.FILTER_KEY_SIMILAR_TO && f.change({
                        sort: f.DEFAULTS.sort
                    });
                }), o.on("removeall", function() {
                    f.get("similar_to") || f.get("sort") !== a.SORT_KEY_MOST_SIMILAR || f.change({
                        sort: f.DEFAULTS.sort
                    });
                });
            }
            var n, o, p = b("#sorts-container", k);
            b(document.body).hasClass("logged-out") && c.is("desktop") && (l(), c.on("all", l)), 
            n = new h(p), n.rendered(), this.crumbs = o = new d(b("#breadcrumbs-container .grid-site", k)), 
            o.nubbies = [ a.FILTER_KEY_AWARDS, a.FILTER_KEY_TOOLS, a.FILTER_KEY_SCHOOLS, a.FILTER_KEY_CLIENTS ].reduce(function(a, b) {
                return a[b] = d.pipeMap.bind(b, i), a[b]["default"] = j, a;
            }, {}), o.nubbies[a.FILTER_KEY_USER_TAGS] = d.pipeMap.bind(a.FILTER_KEY_USER_TAGS, function(b) {
                return a.TAGS[b] && a.TAGS[b].n;
            }), o.nubbies[a.FILTER_KEY_USER_TAGS]["default"] = j, o.nubbies[a.FILTER_KEY_COLOR_HEX] = function(a) {
                return "#" + a;
            }, o.nubbies[a.FILTER_KEY_COLOR_HEX]["default"] = function() {
                var b = {};
                return b[a.FILTER_KEY_COLOR_HEX] = void 0, b[a.FILTER_KEY_COLOR_RANGE] = void 0, 
                b;
            }, o.nubbies[a.FILTER_KEY_RANK] = function(b) {
                var c = [];
                return "all" === b ? !1 : (a.RANKS.forEach(function(a) {
                    -1 !== b.indexOf(a.value) && c.push(a.label);
                }), c.join(", "));
            }, o.nubbies[a.FILTER_KEY_RANK]["default"] = "", o.nubbies[a.FILTER_KEY_SEARCH] = function(a) {
                return a && a.trim() || void 0;
            }, o.nubbies[a.FILTER_KEY_SIMILAR_TO] = function() {
                return "Similar to: " + a.SIMILAR_OBJECT_NAME;
            }, o._view.on("postrender", function(a) {
                b("#site-content").toggleClass("has-breadcrumbs", !!a.find(".js-crumb").length);
            }), o.bind(f), o.on({
                remove: e.trigger.bind(e, "crumbs:remove"),
                removeall: e.trigger.bind(e, "crumbs:removeall")
            }), g.load.then(function(c) {
                b.extend(!0, a, {
                    SCHOOLS: c.search_schools,
                    BRANDS: c.search_brands,
                    TOOLS: c.search_tools,
                    TAGS: c.search_tags
                }), o.render(f.data());
            }), m(), k.on("click", ".js-search-projects-similar", f.freshSimilarProjectsSearch.bind(f)).on("click", ".js-search-users-similar", f.freshSimilarUsersSearch.bind(f));
        }
    };
});
define('beff/ux/scrollfloat',[ "jquery" ], function(a) {
    "use strict";
    function b(a) {
        a();
    }
    function c(a) {
        var b, c;
        return a.is(f) ? (b = window.innerHeight || f.height(), c = g.height() - b - f.scrollTop()) : (b = a.prop("clientHeight"), 
        c = a.prop("scrollHeight") - b - a.scrollTop()), c / b;
    }
    function d(d) {
        var e = "window" === d ? f : a(d);
        return function() {
            var a, f = c(e);
            for (a in i[d]) f <= Number(a) && i[d][a].wrapped.forEach(b);
        };
    }
    function e(b, c, e) {
        function g() {
            if (!g.blocking) {
                g.blocking = !0;
                var a = c.apply(null, arguments);
                a && "function" == typeof a.then ? a.then(function() {
                    g.blocking = !1, h[e]();
                }) : g.blocking = !1;
            }
        }
        "function" == typeof b && (e = c, c = b, b = 1), e = e || "window", b = Number(b).toString();
        var j, k = "window" === e ? f : a(e);
        i[e] || (i[e] = {}, h[e] = d(e), k.on("scroll", h[e])), j = i[e][b], j || (j = i[e][b] = {
            wrapped: [],
            original: []
        }), j.original.push(c), j.wrapped.push(g), h[e]();
    }
    var f = a(window), g = a(document), h = {}, i = {};
    return e.on = e, e.off = function(b, c) {
        c = c || "window";
        var d, e, g, j = "window" === c ? f : a(c);
        for (d in i[c]) e = i[c][d], g = e.original.indexOf(b), ~g && (e.original.splice(g, 1), 
        e.wrapped.splice(g, 1), e.original.length || delete i[c][d]);
        Object.keys(i[c]).length || (j.off("scroll", h[c]), delete i[c]);
    }, e.check = function(a) {
        a = a || "window", h[a]();
    }, e;
});
define('lib/gaq',{
    page: function(a) {
        try {
            void 0 !== _gaq && _gaq.push([ "_trackPageview", a || location.href ]);
        } catch (b) {}
    },
    event: function(a, b, c, d, e) {
        try {
            if ("undefined" != typeof _gaq) {
                var f = Array.prototype.slice.call(arguments);
                f.unshift("_trackEvent"), _gaq.push(f);
            }
        } catch (g) {}
    },
    customVar: function(a, b, c, d) {
        if (a && b && void 0 !== c) try {
            if ("undefined" != typeof _gaq) {
                var e = Array.prototype.slice.call(arguments);
                e.unshift("_setCustomVar"), _gaq.push(e);
            }
        } catch (f) {}
    }
});
window.matchMedia || (window.matchMedia = function() {
    "use strict";
    var a = window.styleMedia || window.media;
    if (!a) {
        var b = document.createElement("style"), c = document.getElementsByTagName("script")[0], d = null;
        b.type = "text/css", b.id = "matchmediajs-test", c.parentNode.insertBefore(b, c), 
        d = "getComputedStyle" in window && window.getComputedStyle(b, null) || b.currentStyle, 
        a = {
            matchMedium: function(a) {
                var c = "@media " + a + "{ #matchmediajs-test { width: 1px; } }";
                return b.styleSheet ? b.styleSheet.cssText = c : b.textContent = c, "1px" === d.width;
            }
        };
    }
    return function(b) {
        return {
            matches: a.matchMedium(b || "all"),
            media: b || "all"
        };
    };
}()), function(a, b, c) {
    "use strict";
    function d(b) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = b : "function" == typeof define && define.amd && define("picturefill", [],function() {
            return b;
        }), "object" == typeof a && (a.picturefill = b);
    }
    function e(a) {
        var b, c, d, e, f, i = a || {};
        b = i.elements || g.getAllElements();
        for (var j = 0, k = b.length; k > j; j++) if (c = b[j], d = c.parentNode, e = void 0, 
        f = void 0, "IMG" === c.nodeName.toUpperCase() && (c[g.ns] || (c[g.ns] = {}), i.reevaluate || !c[g.ns].evaluated)) {
            if (d && "PICTURE" === d.nodeName.toUpperCase()) {
                if (g.removeVideoShim(d), e = g.getMatch(c, d), e === !1) continue;
            } else e = void 0;
            (d && "PICTURE" === d.nodeName.toUpperCase() || !g.sizesSupported && c.srcset && h.test(c.srcset)) && g.dodgeSrcset(c), 
            e ? (f = g.processSourceSet(e), g.applyBestCandidate(f, c)) : (f = g.processSourceSet(c), 
            (void 0 === c.srcset || c[g.ns].srcset) && g.applyBestCandidate(f, c)), c[g.ns].evaluated = !0;
        }
    }
    function f() {
        function c() {
            clearTimeout(d), d = setTimeout(h, 60);
        }
        g.initTypeDetects(), e();
        var d, f = setInterval(function() {
            return e(), /^loaded|^i|^c/.test(b.readyState) ? void clearInterval(f) : void 0;
        }, 250), h = function() {
            e({
                reevaluate: !0
            });
        };
        a.addEventListener ? a.addEventListener("resize", c, !1) : a.attachEvent && a.attachEvent("onresize", c);
    }
    if (a.HTMLPictureElement) return void d(function() {});
    b.createElement("picture");
    var g = a.picturefill || {}, h = /\s+\+?\d+(e\d+)?w/;
    g.ns = "picturefill", function() {
        g.srcsetSupported = "srcset" in c, g.sizesSupported = "sizes" in c, g.curSrcSupported = "currentSrc" in c;
    }(), g.trim = function(a) {
        return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "");
    }, g.makeUrl = function() {
        var a = b.createElement("a");
        return function(b) {
            return a.href = b, a.href;
        };
    }(), g.restrictsMixedContent = function() {
        return "https:" === a.location.protocol;
    }, g.matchesMedia = function(b) {
        return a.matchMedia && a.matchMedia(b).matches;
    }, g.getDpr = function() {
        return a.devicePixelRatio || 1;
    }, g.getWidthFromLength = function(a) {
        var c;
        if (!a || a.indexOf("%") > -1 != !1 || !(parseFloat(a) > 0 || a.indexOf("calc(") > -1)) return !1;
        a = a.replace("vw", "%"), g.lengthEl || (g.lengthEl = b.createElement("div"), g.lengthEl.style.cssText = "border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden", 
        g.lengthEl.className = "helper-from-picturefill-js"), g.lengthEl.style.width = "0px";
        try {
            g.lengthEl.style.width = a;
        } catch (d) {}
        return b.body.appendChild(g.lengthEl), c = g.lengthEl.offsetWidth, 0 >= c && (c = !1), 
        b.body.removeChild(g.lengthEl), c;
    }, g.detectTypeSupport = function(b, c) {
        var d = new a.Image();
        return d.onerror = function() {
            g.types[b] = !1, e();
        }, d.onload = function() {
            g.types[b] = 1 === d.width, e();
        }, d.src = c, "pending";
    }, g.types = g.types || {}, g.initTypeDetects = function() {
        g.types["image/jpeg"] = !0, g.types["image/gif"] = !0, g.types["image/png"] = !0, 
        g.types["image/svg+xml"] = b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"), 
        g.types["image/webp"] = g.detectTypeSupport("image/webp", "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=");
    }, g.verifyTypeSupport = function(a) {
        var b = a.getAttribute("type");
        if (null === b || "" === b) return !0;
        var c = g.types[b];
        return "string" == typeof c && "pending" !== c ? (g.types[b] = g.detectTypeSupport(b, c), 
        "pending") : "function" == typeof c ? (c(), "pending") : c;
    }, g.parseSize = function(a) {
        var b = /(\([^)]+\))?\s*(.+)/g.exec(a);
        return {
            media: b && b[1],
            length: b && b[2]
        };
    }, g.findWidthFromSourceSize = function(c) {
        for (var d, e = g.trim(c).split(/\s*,\s*/), f = 0, h = e.length; h > f; f++) {
            var i = e[f], j = g.parseSize(i), k = j.length, l = j.media;
            if (k && (!l || g.matchesMedia(l)) && (d = g.getWidthFromLength(k))) break;
        }
        return d || Math.max(a.innerWidth || 0, b.documentElement.clientWidth);
    }, g.parseSrcset = function(a) {
        for (var b = []; "" !== a; ) {
            a = a.replace(/^\s+/g, "");
            var c, d = a.search(/\s/g), e = null;
            if (-1 !== d) {
                c = a.slice(0, d);
                var f = c.slice(-1);
                if (("," === f || "" === c) && (c = c.replace(/,+$/, ""), e = ""), a = a.slice(d + 1), 
                null === e) {
                    var g = a.indexOf(",");
                    -1 !== g ? (e = a.slice(0, g), a = a.slice(g + 1)) : (e = a, a = "");
                }
            } else c = a, a = "";
            (c || e) && b.push({
                url: c,
                descriptor: e
            });
        }
        return b;
    }, g.parseDescriptor = function(a, b) {
        var c, d = b || "100vw", e = a && a.replace(/(^\s+|\s+$)/g, ""), f = g.findWidthFromSourceSize(d);
        if (e) for (var h = e.split(" "), i = h.length - 1; i >= 0; i--) {
            var j = h[i], k = j && j.slice(j.length - 1);
            if ("h" !== k && "w" !== k || g.sizesSupported) {
                if ("x" === k) {
                    var l = j && parseFloat(j, 10);
                    c = l && !isNaN(l) ? l : 1;
                }
            } else c = parseFloat(parseInt(j, 10) / f);
        }
        return c || 1;
    }, g.getCandidatesFromSourceSet = function(a, b) {
        for (var c = g.parseSrcset(a), d = [], e = 0, f = c.length; f > e; e++) {
            var h = c[e];
            d.push({
                url: h.url,
                resolution: g.parseDescriptor(h.descriptor, b)
            });
        }
        return d;
    }, g.dodgeSrcset = function(a) {
        a.srcset && (a[g.ns].srcset = a.srcset, a.srcset = "", a.setAttribute("data-pfsrcset", a[g.ns].srcset));
    }, g.processSourceSet = function(a) {
        var b = a.getAttribute("srcset"), c = a.getAttribute("sizes"), d = [];
        return "IMG" === a.nodeName.toUpperCase() && a[g.ns] && a[g.ns].srcset && (b = a[g.ns].srcset), 
        b && (d = g.getCandidatesFromSourceSet(b, c)), d;
    }, g.backfaceVisibilityFix = function(a) {
        var b = a.style || {}, c = "webkitBackfaceVisibility" in b, d = b.zoom;
        c && (b.zoom = ".999", c = a.offsetWidth, b.zoom = d);
    }, g.setIntrinsicSize = function() {
        var c = {}, d = function(a, b, c) {
            b && a.setAttribute("width", parseInt(b / c, 10));
        };
        return function(e, f) {
            var h;
            e[g.ns] && !a.pfStopIntrinsicSize && (void 0 === e[g.ns].dims && (e[g.ns].dims = e.getAttribute("width") || e.getAttribute("height")), 
            e[g.ns].dims || (f.url in c ? d(e, c[f.url], f.resolution) : (h = b.createElement("img"), 
            h.onload = function() {
                if (c[f.url] = h.width, !c[f.url]) try {
                    b.body.appendChild(h), c[f.url] = h.width || h.offsetWidth, b.body.removeChild(h);
                } catch (a) {}
                e.src === f.url && d(e, c[f.url], f.resolution), e = null, h.onload = null, h = null;
            }, h.src = f.url)));
        };
    }(), g.applyBestCandidate = function(a, b) {
        var c, d, e;
        a.sort(g.ascendingSort), d = a.length, e = a[d - 1];
        for (var f = 0; d > f; f++) if (c = a[f], c.resolution >= g.getDpr()) {
            e = c;
            break;
        }
        e && (e.url = g.makeUrl(e.url), b.src !== e.url && (g.restrictsMixedContent() && "http:" === e.url.substr(0, "http:".length).toLowerCase() ? void 0 !== window.console && console.warn("Blocked mixed content image " + e.url) : (b.src = e.url, 
        g.curSrcSupported || (b.currentSrc = b.src), g.backfaceVisibilityFix(b))), g.setIntrinsicSize(b, e));
    }, g.ascendingSort = function(a, b) {
        return a.resolution - b.resolution;
    }, g.removeVideoShim = function(a) {
        var b = a.getElementsByTagName("video");
        if (b.length) {
            for (var c = b[0], d = c.getElementsByTagName("source"); d.length; ) a.insertBefore(d[0], c);
            c.parentNode.removeChild(c);
        }
    }, g.getAllElements = function() {
        for (var a = [], c = b.getElementsByTagName("img"), d = 0, e = c.length; e > d; d++) {
            var f = c[d];
            ("PICTURE" === f.parentNode.nodeName.toUpperCase() || null !== f.getAttribute("srcset") || f[g.ns] && null !== f[g.ns].srcset) && a.push(f);
        }
        return a;
    }, g.getMatch = function(a, b) {
        for (var c, d = b.childNodes, e = 0, f = d.length; f > e; e++) {
            var h = d[e];
            if (1 === h.nodeType) {
                if (h === a) return c;
                if ("SOURCE" === h.nodeName.toUpperCase()) {
                    null !== h.getAttribute("src") && void 0 !== typeof console && console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");
                    var i = h.getAttribute("media");
                    if (h.getAttribute("srcset") && (!i || g.matchesMedia(i))) {
                        var j = g.verifyTypeSupport(h);
                        if (j === !0) {
                            c = h;
                            break;
                        }
                        if ("pending" === j) return !1;
                    }
                }
            }
        }
        return c;
    }, f(), e._ = g, d(e);
}(window, window.document, new window.Image());
define('be/stats',[ "jquery", "be/xhr" ], function(a, b) {
    "use strict";
    function c(c, d) {
        var e = a.isFunction(d.back) ? d.back : a.noop, f = d.a;
        if (delete d.a, delete d.back, "s" === f && !d.ids) throw new Error("be/stats called without ids");
        return b({
            url: c + "/" + f,
            data: d
        }).then(e);
    }
    function d(a) {
        var b, c = {};
        document.referrer && (a.referrer = document.referrer);
        for (b in a) a.hasOwnProperty(b) && i.hasOwnProperty(b) && (c[i[b]] = a[b]);
        return c;
    }
    var e, f, g, h = "/c", i = {
        action: "a",
        callback: "back",
        entity: "e",
        ids: "ids",
        id: "id",
        type: "t",
        time: "ti",
        contest: "c",
        source: "s",
        referrer: "r"
    };
    return e = function(a) {
        return c(h, d(a));
    }, f = function(a, b, c, d) {
        return e({
            action: a,
            entity: b,
            id: c,
            callback: d
        }), this;
    }, g = {
        get: e,
        view: f.bind(g, "v"),
        appreciate: f.bind(g, "a")
    };
});
define('be/timestampFormatter',[ "jquery", "moment", "beff/Component" ], function(a, b, c) {
    "use strict";
    return c.extend({
        formatter: function(a, b, c) {
            return b.format(c);
        },
        init: function(c, d, e) {
            var f = this.formatter;
            d = d || "LL", c.find(".js-format-timestamp").each(function(c, g) {
                var h, i, j = a(g), k = j.data("timestamp"), l = b.unix(k);
                e && e.isUTC && (l = l.utc()), h = b().diff(l, "seconds"), i = f(h, l, d), i && j.text(i);
            });
        }
    });
});
define('be/trait/fatclick',[],function() {
    "use strict";
    function a(a) {
        var c = a.data.touch, d = a.originalEvent.changedTouches[0];
        if (!(Math.sqrt(Math.pow(c.pageX - d.pageX, 2) + Math.pow(c.pageY - d.pageY, 2)) > b)) {
            var e = this.$view.find("a:visible").first().get(0);
            e.click ? e.click() : window.location = e.href;
        }
    }
    var b = 30, c = 300;
    return {
        fatclick: function(b) {
            if (b = b || this.$view) {
                var d = a.bind(this);
                b.on("touchstart", function(a) {
                    function e() {
                        b.off({
                            touchend: d,
                            touchcancel: e
                        });
                    }
                    b.one("touchend", {
                        touch: a.originalEvent.changedTouches[0]
                    }, d).on("touchmove", e).on("touchcancel", e), setTimeout(e, c);
                });
            }
        }
    };
});
define('be/View/Cover',[ "jquery", "nbd/View", "be/trait/fatclick" ], function(a, b, c) {
    "use strict";
    var d = b.extend({
        init: function(b) {
            this.$view = b instanceof a ? b : a(".project-cover[data-id=" + b + "]");
        },
        rendered: function() {
            this.fatclick(), this.$view.on("mouseenter mouseleave", ".cover-name-link, .cover-img, .controls-overlay, .edit-icon", this.toggleHover);
        },
        toggleHover: function(b) {
            a(this).closest(".project-cover").toggleClass("hover", "mouseenter" === b.type);
        },
        destroy: function() {
            this.$view.off("mouseenter mouseleave", ".cover-name-link, .cover-img, .controls-overlay, .edit-icon", this.toggleHover), 
            this._super();
        }
    }).mixin(c);
    return d;
});
define('lib/picturefill',[ "jquery" ], function(a) {
    "use strict";
    var b = window.matchMedia || window.msMatchMedia, c = function() {
        var c = a(this), d = c.find("div[data-src]");
        return d.length ? (b && (d = d.first().add(d.filter(function() {
            var c = a(this).data("media");
            return c && b(c).matches;
        })).last()), c.attr("data-rendered", "rendered"), void a("<img>", {
            alt: c.data("alt"),
            src: d.data("src"),
            "class": d.data("class"),
            title: d.data("title"),
            "data-pin-nopin": "pin"
        }).appendTo(c)) : void c.find("img").remove();
    };
    return a.fn.picturefill = function() {
        return this.find("div[data-picture]:not([data-rendered])").each(c), this;
    };
});
define('discover/View/Wip',[ "nbd/View/Element", "be/trait/fatclick", "lib/picturefill" ], function(a, b, c) {
    "use strict";
    var d = a.extend({
        init: function(a) {
            this._super.apply(this, arguments), this.$view = a;
        },
        rendered: function() {
            c.call(this.$view), this.fatclick();
        },
        destroy: function() {
            this._super();
        },
        deletedRevision: function(a) {
            var b = this.$view.find(".gallery-stats-revision-count"), c = parseFloat(b.text()), d = this.$view.find(".wip-revisions-count"), e = 1 === c ? "Revision" : "Revisions", f = c - 1;
            b.text(f), d.text(f + " " + e), this.$view.find("[data-revision_id=" + a + "]").remove();
        }
    }).mixin(b);
    return d;
});
define('be/modal/simple',[ "be/Modal" ], function(a) {
    "use strict";
    return a.simple;
});
define('be/View/Follow',[ "jquery", "nbd/View", "be/modal/simple" ], function(a, b, c) {
    "use strict";
    var d = b.extend({
        init: function(a, b) {
            this.$view = a, this._model = b, this.rendered();
        },
        destroy: function() {
            this._model.off(null, null, this);
        },
        rendered: function() {
            var b = this;
            this._model.on("following", function(b) {
                this.$view.toggleClass("following", b), this.$view.data("following", b), b && this.$view.addClass("following-hold").one("mouseleave", function() {
                    a(this).removeClass("following-hold");
                });
            }, this), this.$view.on("click", function() {
                var c = a(this).data(), d = {
                    backfill: c.backfill
                };
                b._controller.follow(d);
            });
        }
    }, {
        rateLimitPopup: function(a) {
            var b = a ? a + "<br /><br />" : "";
            c({
                title: "Following Limit",
                html: b + 'Please read about our <a href="https://help.behance.net/entries/48445480-Following-limits-on-Behance">following limits</a>.',
                buttons: []
            });
        }
    });
    return d;
});
define('be/Controller/Follow',[ "jquery", "nbd/Controller", "nbd/Model", "nbd/trait/pubsub", "be/View/Follow", "lib/gaq", "be/xhr" ], function(a, b, c, d, e, f, g) {
    "use strict";
    var h = b.extend({
        init: function(a, b, d) {
            this.views = [], this.type = d || "user", this._model = new c(a, {
                blocking: !1,
                following: b || !1
            }), this.listenTo(this._model, "all", this.trigger);
        },
        _initView: function(a) {
            var b = new e(a, this._model);
            return b._controller = this, b;
        },
        add: function(a) {
            if (a.data("befollow")) return this;
            var b = this._initView(a);
            return a.data("befollow", b), this.views.push(b), this;
        },
        setFollowing: function(a) {
            this._model.set("following", a);
        },
        follow: function(a) {
            function b() {
                d.set("blocking", !1);
            }
            if (!this._model.get("blocking")) {
                var c, d = this._model, h = this._model.get("following"), i = this.constructor.url(this.type, this.id), j = h ? "DELETE" : "POST";
                return this._model.set("blocking", !0), c = g({
                    url: i,
                    type: j,
                    data: a
                }).then(function(a) {
                    return d.set("following", !h), f.event("follow", window.location.pathname, window.location.search), 
                    a.following = !h, a;
                }, function(a) {
                    var b;
                    429 === a.status && (a.responseJSON && a.responseJSON.messages && (b = a.responseJSON.messages.pop().message), 
                    e.rateLimitPopup(b));
                }), this.trigger("request", c), c.then(b, b), c;
            }
        },
        destroy: function() {
            this.views.forEach(function(a) {
                a.destroy();
            }), this.views = [], this._model.destroy(), this._model = null;
        }
    }, {
        RELATIONS_URL: "/relations",
        url: function(a, b) {
            return this.RELATIONS_URL + "/" + a + "/" + b + window.location.search;
        }
    }).mixin(d);
    return h;
});
define('be/follow',[ "jquery", "nbd/util/extend", "nbd/trait/pubsub", "be/Controller/Follow" ], function(a, b, c, d) {
    "use strict";
    var e = {
        user: {},
        collection: {},
        site: {},
        team: {},
        project: {}
    }, f = function(a, b) {
        var c = "followee", d = a.data(c) || +a.attr(c), f = a.data("following");
        d && (null == f && (f = a.hasClass("following")), e[b][d] = (e[b][d] || g._create.call(g, b, d, f)).add(a));
    }, g = {
        init: function(a) {
            this._users(a), this._collections(a), this._sites(a), this._teams(a), this._projects(a);
        },
        _create: function(a, b, c) {
            var e = new d(b, c, a);
            return this.listenTo(e, "following", function(c) {
                this.trigger("following", b, c, a);
            }).listenTo(e, "request", function(c) {
                this.trigger("request", b, c, a);
            }), "project" === a && this.listenTo(e, "request", this._updateUsersOnProjectFollow), 
            e;
        },
        _updateUsersOnProjectFollow: function(a) {
            a.then(function(a) {
                a.owner_ids.forEach(function(b) {
                    e.user[b] && e.user[b].setFollowing(a.following);
                });
            });
        },
        _users: function(b) {
            a(".js-action-follow-user", b).each(function() {
                f(a(this), "user");
            });
        },
        _collections: function(b) {
            a(".js-action-follow-collection", b).each(function() {
                f(a(this), "collection");
            });
        },
        _sites: function(b) {
            a(".js-action-follow-site", b).each(function() {
                f(a(this), "site");
            });
        },
        _teams: function(b) {
            a(".js-action-follow-team", b).each(function() {
                f(a(this), "team");
            });
        },
        _projects: function(b) {
            a(".js-action-follow-project", b).each(function() {
                f(a(this), "project");
            });
        }
    };
    return b(g, c), g;
});
define('be/trait/form/list',[ "jquery" ], function(a) {
    "use strict";
    function b(b, c) {
        var d = a("<select>", {
            name: b[0].id,
            multiple: c || !1
        }).hide();
        return c || a("<option>", {
            selected: !0,
            disabled: !0
        }).appendTo(d), b.children("li").each(function() {
            a("<option>", {
                value: a(this).data("value")
            }).appendTo(d);
        }), d.insertAfter(b), d;
    }
    function c(c, d) {
        return c.each(function() {
            var e = b(a(this).on("click", ">li", function() {
                var b = a(this), f = b.data("value"), g = e.find('[value="' + f + '"]'), h = !g.prop("selected");
                g.prop("selected", h), h = g.prop("selected"), (d ? c.find('[data-value="' + f + '"]') : b.siblings().removeClass("active").end()).toggleClass("active", h);
            }), d);
        }), c;
    }
    return {
        selectList: function(a) {
            return c(a || this.$view.find("ul,ol"), !1);
        },
        multiList: function(a) {
            return c(a || this.$view.find("ul,ol"), !0);
        }
    };
});
define('beff/util/error',[ "nbd/Promise" ], function(a) {
    "use strict";
    var b = [], c = function(c) {
        var d = new a();
        return d.reject(c), (this || b).reduce(function(a, b) {
            return a["catch"](b);
        }, d);
    };
    return Object.defineProperty(c, "handlers", {
        value: b
    }), c;
});
define('beff/Component/Form',[ "nbd/Promise", "nbd/util/extend", "nbd/util/pipe", "../Component", "../util/xhr", "../util/error" ], function(a, b, c, d, e, f) {
    "use strict";
    function g(a) {
        return a.reduce(function(a, b) {
            var c = a[b.name];
            return a[b.name] = c ? [].concat(c, b.value) : b.value, a;
        }, {});
    }
    var h = function(a) {
        switch (a.which) {
          case 1:
          case 13:
          case 32:
            this.$form.submit();
        }
    }, i = function(b) {
        var c = new a(), d = c.thenable(), e = "function" == typeof this.commit ? this.commit.call(d, b) : this.commit;
        return c.resolve(e === d ? this.xhr(b) : e), this.trigger("commit"), c;
    }, j = d.extend({
        xhr: e,
        init: function(a) {
            if (!a) throw new Error("The context of the form cannot be empty");
            if (this.$form = a.is("form") ? a : a.find("form"), !this.$form.length) throw new Error("Unable to find form within context");
            this._normalizeSubmitter = h.bind(this), this.submit = this.submit.bind(this), Object.defineProperty(this, "handlers", {
                value: [ this._handleFormError.bind(this) ]
            });
        },
        destroy: function() {
            if (!this.$form) throw new Error("Cannot destroy null form");
            this._super(), this.$form = null;
        },
        reset: function() {
            return this.$form[0].reset(), this;
        },
        validator: function(a) {
            return !0;
        },
        commit: function(a) {
            return this;
        },
        _handleFormError: function(a) {
            if (!(a instanceof j.Error)) throw a;
            Object.keys(a).forEach(function(b) {
                var c = this.$form.find("[name=" + b + "], #" + b).first(), d = this;
                c.length && (c.one("input change", function e() {
                    c.off("input change", e), d.trigger("error:hide", c);
                }), this.trigger("error:show", c, a[b]));
            }, this);
        },
        _handleError: function(a) {
            return this.trigger("error", a), f.call(this.handlers, a)["catch"](f)["finally"](function() {
                delete this._cacheMeta;
            }.bind(this));
        },
        _findFormError: function(a) {
            if (!(a instanceof Object)) throw a;
            var b, c = this._cacheMeta || this.toJSON(), d = {};
            for (b in c.data) a.hasOwnProperty(b) && (d[b] = a[b]);
            if (Object.keys(d).length) throw new this.constructor.Error(d);
            throw a;
        },
        submit: function(a) {
            if (!this.$form) throw new Error("The form cannot be null");
            this.trigger("before", a);
            var b = this._submit(a);
            return b["catch"](this._findFormError.bind(this)).then(this.trigger.bind(this, "success"), this._handleError.bind(this))["finally"](this.trigger.bind(this, "after")), 
            b;
        },
        _submit: function(b) {
            var d, e, f, g = Array.isArray(this.validator) ? c.apply(null, this.validator.map(function(a) {
                return a.bind(this);
            }, this)) : this.validator.bind(this), h = new a();
            this._cacheMeta = d = this.toJSON();
            try {
                e = g(d.data);
            } catch (j) {
                e = !1, f = j;
            }
            return e = e !== !1, !b || e && "function" != typeof this.commit || b.preventDefault(), 
            e ? h.resolve(d) : h.reject(f), h.then(i.bind(this));
        },
        toJSON: function() {
            return {
                url: this.$form.attr("action"),
                type: this.$form.attr("method") || "POST",
                data: this.constructor.decompose(this.$form.serializeArray())
            };
        },
        _submitSelector: ".js-submit:not([type=submit])",
        bind: function() {
            return this.$form.on("click keydown", this._submitSelector, this._normalizeSubmitter).on("submit", this.submit), 
            this;
        },
        unbind: function() {
            return this.$form.off("click keydown", this._submitSelector, this._normalizeSubmitter).off("submit", this.submit), 
            this;
        }
    }, {
        decompose: g,
        Error: function(a) {
            b(this, a);
        }
    });
    return j;
});
define('beff/util/validate',[],function() {
    "use strict";
    function a(a) {
        var b, c, d = !1, e = 0, f = [];
        for (b = 0; b < a.length; ++b) "[" !== a[b] ? "]" !== a[b] ? "," !== a[b] || d || (c = a.substring(e, b), 
        c && f.push(c), e = b + 1) : d = !1 : d = !0;
        return c = a.substring(e), c && f.push(c), f;
    }
    function b(d, e) {
        return delete b.message, e = e ? a(e) : [], null == d && (d = ""), -1 === e.indexOf("required") && "" === d ? !0 : e.every(c, d);
    }
    var c, d = RegExp.prototype.test, e = {
        Generic: {
            test: d.bind(/^[^<>]+$/),
            message: "This field may not contain less than signs (&lt) or greater than signs (&gt;)"
        },
        AlphaNumeric: {
            test: d.bind(/^[0-9A-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F]+$/),
            message: "This field must contain only alphanumeric characters"
        },
        Alpha: {
            test: d.bind(/^[A-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F]+$/),
            message: "This field must contain only alpha characters"
        },
        AlphaDash: {
            test: d.bind(/^[A-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F\-]+$/),
            message: "This field must contain only alpha characters or dashes"
        },
        ANDash: {
            test: d.bind(/^[0-9A-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F\-]+$/),
            message: "This field must contain only alphanumeric characters or dashes"
        },
        ANUnder: {
            test: d.bind(/^[0-9A-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F_]+$/),
            message: "This field must contain only alphanumeric characters with or without underscores"
        },
        ANUSpace: {
            test: d.bind(/^[0-9A-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F_ ]+$/),
            message: "This field must contain only alphanumeric characters with or without underscores and spaces"
        },
        ANEmail: {
            test: d.bind(/^([_\dA-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F\-]+|[\w\.\+\-]+@(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9]))$/),
            message: "This field must contain a valid username or email"
        },
        Integer: {
            test: d.bind(/^\-?\d+$/),
            message: "This field must only contain numbers, without any spaces"
        },
        CreditCardNumber: {
            test: d.bind(/^\d{13,16}$/),
            message: "This field must only contain numbers, without any spaces or dashes"
        },
        Decimal: {
            test: d.bind(/^\-?\d+(\.\d+)?$/),
            message: "This field must be a valid decimal number"
        },
        Date: {
            test: d.bind(/^\d{1,2}\-\d{1,2}-\d{4}( \d{2}:\d{2}:\d{2})?$/),
            message: "This field must be a valid date"
        },
        SqlDate: {
            test: d.bind(/^\d{4}\-\d{2}\-\d{2}$/),
            message: "This field must be a valid date"
        },
        SqlDateTime: {
            test: d.bind(/^\d{4}\-\d{2}\-\d{2}\s\d{2}\:\d{2}\:\d{2}$/),
            message: "This field must be a valid datetime"
        },
        SlashDate: {
            test: d.bind(/^\d{1,2}\/\d{1,2}\/\d{4}$/),
            message: "This field must be a valid date"
        },
        Email: {
            test: d.bind(/^[\w\.\+\-]+@[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?)*\.?$/),
            message: "This field must be a valid email address"
        },
        Name: {
            test: d.bind(/^[\wA-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F\'. \-]{2,50}$/),
            message: "This field must be a valid name"
        },
        Username: {
            test: d.bind(/^[A-Za-z0-9_\-]+$/),
            message: "This field contains invalid characters. Please use only letters (a-z, A-Z), numbers, dash or underscore characters."
        },
        Password: {
            test: d.bind(/^\S{6,32}$/),
            message: "This field must be between 6 and 32 characters"
        },
        Address: {
            test: d.bind(/^[\w0-9A-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F# \' \.\,\&\-]+$/),
            message: "This field must be a valid address"
        },
        City: {
            test: d.bind(/^[\wA-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F \' \. \/ \-]+$/),
            message: "This field must be a valid city"
        },
        Province: {
            test: d.bind(/^[\wA-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F ]+$/),
            message: "This field must be a valid province"
        },
        IntZip: {
            test: d.bind(/^[A-Za-z0-9#\. \-]+$/),
            message: "This field must be a valid zipcode"
        },
        UsZip: {
            test: d.bind(/^\d{5}(\-\d{4})?$/),
            message: "This field must be a valid US zipcode"
        },
        Country: {
            test: d.bind(/^[\wA-Za-z\u00C0-\u00FF\u0100-\u0259\u0386\u0388-\u04E9\u05D0-\u06D3\u1E80-\u200F\'. \-]{2,50}$/),
            message: "This field must be a valid country"
        },
        IntPhone: {
            test: d.bind(/^[0-9\+ \(\)\#\-]+$/),
            message: "This field must be a valid phone"
        },
        UsPhone: {
            test: d.bind(/^\d{3}\-\d{3}\-\d{4}$/),
            message: "This field must be a valid US phone"
        },
        PicExt: {
            test: d.bind(/^((jpg)|(jpeg)|(png)|(gif)){1}$/),
            message: "This field must be a valid image extension"
        },
        VideoExt: {
            test: d.bind(/^((mpg)|(mpeg)|(mov)|(avi)|(dv)|(qt)|(asf)|(flv)){1}$/),
            message: "This field must be a valid video extension"
        },
        Url: {
            test: d.bind(/^(http(?:s)?:\/\/|www.)[^<>]*$/),
            message: "This field must be a URL starting with http:// or www."
        },
        UrlExt: {
            test: d.bind(/^((?:https?):\/\/)?(?:(?:(?:[\w\.\-\+!$&\'\(\)*\+,;=_]|%[0-9a-f]{2})+:)*(?:[\w\.\-\+%!$&\'\(\)*\+,;=]|%[0-9a-f]{2})+@)?(?:[A-Za-z0-9_\-]+\.)(?:[A-Za-z0-9\-\._])+(?::\d+)?(?:[\/|\?](?:[\w#!:\.\?\+=&@$\'~*,;_\/\(\)\[\]\-]|%[0-9a-f]{2})*)?$/),
            message: "This field must be a valid URL"
        },
        Html: {
            test: function() {
                return !d.apply(/<((?!\/?span|\/?h1|\/?h2|\/?h3|\/?h4|\/?h5|\/?h6|\/?a|\/?b|\/?ol|\/?ul|\/?li|\/?i|\/?u|\/?strong|\/?em(?!bed)|\/?p|\/?div|\/?br|\/?unb|\/?uni|\/?\s|\/?\>)[^\>]*\>)/i, arguments);
            },
            message: "This field must be properly formed HTML"
        },
        Twitter: {
            test: d.bind(/^[A-Za-z0-9_\-]{1,15}$/),
            message: "This field must be a valid twitter username (without the @ character)"
        },
        required: {
            test: d.bind(/.+/),
            message: "This field is required"
        },
        length: {
            test: function(a, b) {
                var c = /\[(,?\d+(?:,\d+)?)\]/.exec(b);
                return a = String(a).replace(/[\s]+/g, " "), c ? new RegExp("^.{" + c[1] + "}$").test(a) : !1;
            },
            message: function(a, b) {
                var c;
                return (c = /\[(\d+),(\d+)\]/.exec(b)) ? "Must be between " + c[1] + " and " + c[2] + " characters." : (c = /\[,(\d+)\]/.exec(b)) ? "Must be at most " + c[1] + " characters." : (c = /\[(\d+),\]/.exec(b)) ? "Must be at least " + c[1] + " characters." : (c = /\[(\d+)\]/.exec(b), 
                c ? "Must be exactly " + c[1] + " characters." : void 0);
            }
        }
    }, f = /(\w+)(.*)/;
    return c = function(a) {
        var c, d = f.exec(a);
        return d && (a = d[1], c = d[2]), e[a] && e[a].test ? (d = e[a].test(this, c), d || (b.message = "function" == typeof e[a].message ? e[a].message(this, c) : e[a].message), 
        d) : !0;
    }, b;
});
define('beff/Component/Form/validators',[ "jquery", "../../util/validate" ], function(a, b) {
    "use strict";
    return {
        trimIfEmpty: function(a) {
            return Object.keys(a).forEach(function(b) {
                var c, d = a[b];
                "string" == typeof d && (c = d.trim(), a[b] = 0 === c.length ? c : d);
            }), a;
        },
        validateForm: function(c) {
            var d = this.$form.find("[data-validate]:not(:disabled)").toArray();
            if (this.errors = d.reduce(function(d, e) {
                var f = a(e), g = f.data("validate"), h = f.attr("name") || f.attr("id");
                return b(c[h], g) || (d[h] = b.message), d;
            }, {}), Object.keys(this.errors).length) throw this.errors;
            return c;
        }
    };
});
define('be/form',[ "jquery", "lib/showMessages", "beff/Component/Form", "beff/Component/Form/validators", "be/form/errors", "be/handleResponse", "be/localization", "be/xhr", "be/buttons", "jquery-plugins/plugins/jquery.changeinput" ], function(a, b, c, d, e, f, g, h, i) {
    "use strict";
    return c.extend({
        xhr: h,
        hideButtonText: g.translate("form_template_saving", "Saving..."),
        validator: [ d.trimIfEmpty, d.validateForm ],
        _submitSelector: ".form-submit:not([type=submit]):not([disabled]), .js-submit:not([type=submit]):not([disabled])",
        _displayError: function(a, b) {
            var c = {
                errors: {}
            };
            return c.errors[a.attr("name")] = g.translate("error_template:" + b, b), e.displayAll(this.$form)(c);
        },
        init: function(a) {
            this._super(a), this.$context = a, this.on({
                "error:show": this._displayError.bind(this),
                "error:hide": e.removeErrors,
                error: function() {
                    this.showButtons();
                },
                before: function() {
                    this.hideButtons();
                }
            }), this.handlers.push(this.showMessages.bind(this)), this.bind();
        },
        reset: function() {
            return this._super(), this.$form.find("select").each(function() {
                var b = this.value;
                a(this).changeInput("value", "").changeInput("value", b);
            }), this;
        },
        _getMessageContainer: function() {
            return this.$form;
        },
        showMessages: function(a) {
            if (a = f.error(a), !a.messages) throw a;
            b(this._getMessageContainer(), a.messages);
        },
        submit: function(a) {
            return this.wasSubmittedFromButton = !!a, e.removeAll(this.$form), this._super.apply(this, arguments);
        },
        commit: function(a) {
            return h(a);
        },
        showButtons: function() {
            i.show(this._getButtonContainer());
        },
        hideButtons: function() {
            var a = this.hideButtonText;
            "function" == typeof a && (a = a()), i.hide(this._getButtonContainer(), a);
        },
        _getButtonContainer: function() {
            var a = this.$context.find(this._submitSelector).closest(".form-item").parent();
            if (!a.length && this.wasSubmittedFromButton) throw new Error("Unable to find button container:" + this.$context.html());
            return a;
        },
        _findFormError: function(a) {
            var b = f.error(a);
            if (!b.errors && "object" == typeof a.responseJSON) throw a;
            return this._super(b.errors || b);
        },
        bind: function() {
            return this.alreadyBound ? this : (this.alreadyBound = !0, this.$context.on("click keydown", this._submitSelector, this._normalizeSubmitter), 
            this.$form.on("submit", this.submit), this);
        },
        unbind: function() {
            return this.$context.off("click keydown", this._submitSelector, this._normalizeSubmitter), 
            this.$form.off("submit", this.submit), this;
        }
    });
});

define("vendor/require/hgn!templates/addToTalentSearch", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<form action=\"");t.b(t.v(t.f("action",c,p,0)));t.b("\" method=\"");t.b(t.v(t.f("method",c,p,0)));t.b("\">");t.b("\n" + i);if(t.s(t.d("options.0",c,p,1),c,p,0,63,415,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <ul id=\"searches\" class=\"divided-list menu-section\">");t.b("\n" + i);if(t.s(t.f("options",c,p,1),c,p,0,139,212,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <li class=\"divided-item\" data-value=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.v(t.f("title",c,p,0)));t.b("</li>");t.b("\n" + i);});c.pop();}t.b("    </ul>");t.b("\n" + i);t.b("    <div>");t.b("\n" + i);t.b("      ");if(t.s(t.f("translate",c,p,1),c,p,0,265,293,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("talent_candidate_popup_or|or");});c.pop();}t.b(" <a href=\"/talent/create\">");if(t.s(t.f("translate",c,p,1),c,p,0,347,383,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("talent_sidebar_post_a_job|Post a Job");});c.pop();}t.b("</a>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);});c.pop();}if(!t.s(t.f("options",c,p,1),c,p,1,0,0,"")){t.b("    <div class=\"no-searches\">");t.b("\n" + i);t.b("      <p>");if(t.s(t.f("translate",c,p,1),c,p,0,498,564,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("talent_sidebar_empty_no_active_jobs|You Don't Have Any Active Jobs");});c.pop();}t.b("</p>");t.b("\n" + i);t.b("      <p><a href=\"/talent/create\">");if(t.s(t.f("translate",c,p,1),c,p,0,631,679,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("talent_sidebar_post_a_job_rarr|Post a Job &rarr;");});c.pop();}t.b("</a></p>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);};t.b("</form>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<form action=\"{{action}}\" method=\"{{method}}\">\n  {{#options.0}}\n    <ul id=\"searches\" class=\"divided-list menu-section\">\n      {{#options}}\n      <li class=\"divided-item\" data-value=\"{{id}}\">{{title}}</li>\n      {{/options}}\n    </ul>\n    <div>\n      {{#translate}}talent_candidate_popup_or|or{{/translate}} <a href=\"/talent/create\">{{#translate}}talent_sidebar_post_a_job|Post a Job{{/translate}}</a>\n    </div>\n  {{/options.0}}\n  {{^options}}\n    <div class=\"no-searches\">\n      <p>{{#translate}}talent_sidebar_empty_no_active_jobs|You Don't Have Any Active Jobs{{/translate}}</p>\n      <p><a href=\"/talent/create\">{{#translate}}talent_sidebar_post_a_job_rarr|Post a Job &rarr;{{/translate}}</a></p>\n    </div>\n  {{/options}}\n</form>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/Dialog/AddToTalentSearch',[ "nbd/util/extend", "be/View/Dialog/Layover", "be/View/Dialog/Menu", "be/View/Dialog/Popup", "be/trait/form/list", "be/form", "be/localization", "hgn!templates/addToTalentSearch", "jquery-plugins/plugins/jquery.changeinput" ], function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = {
        mustache: h,
        templateData: function() {
            var b = a({
                title: g.translate("talent_sidebar_save_as_candidate", "Save as Candidate"),
                classes: [ "list-popup", "add-to-ts-popup" ],
                buttons: [ {
                    label: g.translate("talent_sidebar_button_save", "Save"),
                    classes: [ "form-button-default", "js-submit" ]
                } ]
            }, this._super());
            return b.options.length || (b.buttons = [ {
                label: g.translate("talent_sidebar_button_okay", "Okay"),
                classes: [ "form-button-default", "js-close" ]
            } ]), b;
        },
        rendered: function() {
            var a = new f(this.$view), b = this.$view.find(".js-submit");
            this.form = a, a.on("success", function() {
                this.showButtons();
            }), a.commit = function(a) {
                var b, c, d = this._model.preselected(), e = Array.isArray(a.data.searches) ? a.data.searches : [ a.data.searches ];
                return e = e.filter(Boolean).map(Number), b = e.filter(function(a) {
                    return !~d.indexOf(+a);
                }), c = d.filter(function(a) {
                    return !~e.indexOf(a);
                }), this._controller.update({
                    add: b,
                    remove: c
                }).then(function(a) {
                    this._model.data().options.forEach(function(b) {
                        ~a.added.indexOf(b.id) ? b.is_discovered = !0 : ~a.removed.indexOf(b.id) && (b.is_discovered = b.is_shortlisted = b.is_recommended = !1);
                    });
                }.bind(this)).then(this.hide.bind(this)).then(function() {
                    var a = this._model.data(), b = a.options, c = [];
                    b.forEach(function(a) {
                        a.is_discovered && c.push(a.title);
                    }), this._controller.trigger("update", c);
                }.bind(this));
            }.bind(this), this._super(), this.multiList().on("click", function() {
                b.changeInput("enable");
            }), this._model.preselected().forEach(function(a) {
                this.$view.find("li[data-value=" + a + "]").click();
            }, this), b.changeInput("disable");
        }
    };
    return {
        desktop: d.extend(i).mixin(e),
        tablet: c.extend(i).mixin(e),
        phone: b.extend(i).mixin(e)
    };
});
define('be/Controller/Dialog/AddToTalentSearch',[ "be/xhr", "nbd/Model", "be/Controller/Dialog/Roulette", "be/View/Dialog/AddToTalentSearch" ], function(a, b, c, d) {
    "use strict";
    var e = c.extend({
        endpoint: function() {
            return "/v2/jobs/discovered/" + this.id;
        },
        read: function() {
            return a(this.endpoint()).then(function(a) {
                this._model.set("options", a.jobs.sort(function(a, b) {
                    return b.is_discovered + b.is_shortlisted + b.is_recommended - (a.is_discovered + a.is_shortlisted + a.is_recommended);
                }));
            }.bind(this));
        },
        update: function(b) {
            return a({
                url: this.endpoint(),
                type: "PATCH",
                data: b
            });
        },
        render: function(a) {
            var b = this._super.bind(this);
            return this.read().then(function() {
                return a;
            }).then(b);
        }
    }, {
        VIEW_CLASS: d,
        MODEL_CLASS: b.extend({
            preselected: function() {
                return this.get("options").map(function(a) {
                    return a.is_discovered || a.is_shortlisted || a.is_recommended ? a.id : void 0;
                }).filter(Boolean);
            }
        })
    });
    return e;
});
define('discover/View/User',[ "page_config", "nbd/View/Element", "be/follow", "be/Controller/Dialog/AddToTalentSearch" ], function(a, b, c, d) {
    "use strict";
    var e = b.extend({
        init: function(a) {
            this._super.apply(this, arguments), this.$view = a;
        },
        rendered: function() {
            c.init(this.$view), a.has_talent_search && this.talent();
        },
        talent: function() {
            var a = this.$view.find(".js-add-talent");
            a.length && (this.talent = new d(a.data("id")), this.talent.setContext(a));
        }
    });
    return e;
});
define('be/content',[ "page_constants", "jquery", "moment", "picturefill", "nbd/Promise", "nbd/util/async", "be/stats", "be/timestampFormatter", "be/View/Cover", "discover/View/Wip", "discover/View/User", "discover/Model/Filters" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
    "use strict";
    function m(a) {
        return a.first().addClass("first"), a;
    }
    function n(c) {
        var d, f, h;
        return d = {
            projects: ".project-cover",
            wips: ".wip-block",
            users: ".user-row"
        }, f = {
            projects: function(c) {
                if (l.get("sort") === a.SORT_KEY_PUBLISHED_DATE) return void o(c);
                for (var d in c) b('.project-cover[data-id="' + d + '"]').find(".cover-stat-appreciations").text(c[d]["apps_" + w]).end().find(".cover-stat-comments").text(c[d]["cmts_" + w]).end().find(".cover-stat-views").text(c[d]["views_" + w]).end();
            },
            users: function(a) {
                for (var c in a) b('.user-row[data-id="' + c + '"]').find(".js-cover-stat-appreciations").text(a[c]["apps_" + w]).end().find(".js-cover-stat-comments").text(a[c]["cmts_" + w]).end().find(".js-cover-stat-views").text(a[c]["views_" + w]).end();
            }
        }, h = c.find(d[x]).map(function() {
            return b(this).data("id");
        }).toArray().join("|"), h ? g.get({
            action: "s",
            entity: x,
            ids: h,
            time: w,
            type: "all",
            callback: f[x]
        }) : e.resolve();
    }
    function o(a) {
        b(".js-project-cover:not(.js-date-localized)").each(function() {
            var a = b(this);
            h.init(a, "MMM D, YYYY"), a.addClass("js-date-localized");
        });
        for (var c in a) b('.js-project-cover[data-id="' + c + '"] .js-cover-stat-appreciations').text(a[c]["apps_" + w]);
    }
    function p(a) {
        var c = null;
        a.each(function() {
            var a = b(this), d = new y(a);
            d.rendered(), C.push(d), c = a.data("ordinal") || null;
        }), D.fireWith(a, [ c ]);
    }
    function q(a, b, c) {
        return u(b), v(c), z = a, p(m(z.children(":not(.ignore-me)"))), n(z);
    }
    function r() {
        return B = !1, A = C, C = [], f(function() {
            A.forEach(function(a) {
                a.destroy();
            }), A = [];
        }), z.children(":not(.ignore-me)").remove(), E.fire(), z;
    }
    function s(a) {
        var c = b(a);
        return B && (r(), m(c)), p(c), z.append(c), d(), n(b("<div>" + a + "</div>"));
    }
    function t(a) {
        switch (a) {
          case "projects":
            return i;

          case "wips":
            return j;

          case "users":
          case "teams":
            return k;
        }
    }
    function u(a) {
        x = a, y = t(a);
    }
    function v(a) {
        w = a;
    }
    var w, x, y, z, A, B = !1, C = [], D = new b.Callbacks(), E = new b.Callbacks();
    return y = i, {
        init: q,
        render: s,
        clear: r,
        postview: D,
        postclear: E,
        clearNext: function() {
            B = !0;
        },
        setItem: u,
        setTime: v
    };
});
define('be/decorator/waitsforimages',[ "jquery", "nbd/Promise" ], function(a, b) {
    "use strict";
    function c(c) {
        var d, e = c.find("img:not(.js-loaded)");
        return d = e.toArray().map(function(c) {
            var d = new Image(), e = new b(), f = function() {
                a(c).addClass("js-loaded"), e.resolve();
            };
            return d.src = c.src, d.addEventListener("load", f), d.addEventListener("error", f), 
            e;
        }), b.all(d);
    }
    return c;
});
!function(a) {
    function b() {}
    function c(a) {
        function c(b) {
            b.prototype.option || (b.prototype.option = function(b) {
                a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b));
            });
        }
        function e(b, c) {
            a.fn[b] = function(e) {
                if ("string" == typeof e) {
                    for (var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) {
                        var j = this[h], k = a.data(j, b);
                        if (k) if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
                            var l = k[e].apply(k, g);
                            if (void 0 !== l) return l;
                        } else f("no such method '" + e + "' for " + b + " instance"); else f("cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'");
                    }
                    return this;
                }
                return this.each(function() {
                    var d = a.data(this, b);
                    d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d));
                });
            };
        }
        if (a) {
            var f = "undefined" == typeof console ? b : function(a) {
                console.error(a);
            };
            return a.bridget = function(a, b) {
                c(b), e(a, b);
            }, a.bridget;
        }
    }
    var d = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", [ "jquery" ], c) : c("object" == typeof exports ? require("jquery") : a.jQuery);
}(window), function(a) {
    function b(b) {
        var c = a.event;
        return c.target = c.target || c.srcElement || b, c;
    }
    var c = document.documentElement, d = function() {};
    c.addEventListener ? d = function(a, b, c) {
        a.addEventListener(b, c, !1);
    } : c.attachEvent && (d = function(a, c, d) {
        a[c + d] = d.handleEvent ? function() {
            var c = b(a);
            d.handleEvent.call(d, c);
        } : function() {
            var c = b(a);
            d.call(a, c);
        }, a.attachEvent("on" + c, a[c + d]);
    });
    var e = function() {};
    c.removeEventListener ? e = function(a, b, c) {
        a.removeEventListener(b, c, !1);
    } : c.detachEvent && (e = function(a, b, c) {
        a.detachEvent("on" + b, a[b + c]);
        try {
            delete a[b + c];
        } catch (d) {
            a[b + c] = void 0;
        }
    });
    var f = {
        bind: d,
        unbind: e
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", f) : "object" == typeof exports ? module.exports = f : a.eventie = f;
}(window), function(a) {
    function b(a) {
        "function" == typeof a && (b.isReady ? a() : g.push(a));
    }
    function c(a) {
        var c = "readystatechange" === a.type && "complete" !== f.readyState;
        b.isReady || c || d();
    }
    function d() {
        b.isReady = !0;
        for (var a = 0, c = g.length; c > a; a++) {
            var d = g[a];
            d();
        }
    }
    function e(e) {
        return "complete" === f.readyState ? d() : (e.bind(f, "DOMContentLoaded", c), e.bind(f, "readystatechange", c), 
        e.bind(a, "load", c)), b;
    }
    var f = a.document, g = [];
    b.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", [ "eventie/eventie" ], e) : "object" == typeof exports ? module.exports = e(require("eventie")) : a.docReady = e(a.eventie);
}(window), function() {
    function a() {}
    function b(a, b) {
        for (var c = a.length; c--; ) if (a[c].listener === b) return c;
        return -1;
    }
    function c(a) {
        return function() {
            return this[a].apply(this, arguments);
        };
    }
    var d = a.prototype, e = this, f = e.EventEmitter;
    d.getListeners = function(a) {
        var b, c, d = this._getEvents();
        if (a instanceof RegExp) {
            b = {};
            for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c]);
        } else b = d[a] || (d[a] = []);
        return b;
    }, d.flattenListeners = function(a) {
        var b, c = [];
        for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
        return c;
    }, d.getListenersAsObject = function(a) {
        var b, c = this.getListeners(a);
        return c instanceof Array && (b = {}, b[a] = c), b || c;
    }, d.addListener = function(a, c) {
        var d, e = this.getListenersAsObject(a), f = "object" == typeof c;
        for (d in e) e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : {
            listener: c,
            once: !1
        });
        return this;
    }, d.on = c("addListener"), d.addOnceListener = function(a, b) {
        return this.addListener(a, {
            listener: b,
            once: !0
        });
    }, d.once = c("addOnceListener"), d.defineEvent = function(a) {
        return this.getListeners(a), this;
    }, d.defineEvents = function(a) {
        for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
        return this;
    }, d.removeListener = function(a, c) {
        var d, e, f = this.getListenersAsObject(a);
        for (e in f) f.hasOwnProperty(e) && (d = b(f[e], c), -1 !== d && f[e].splice(d, 1));
        return this;
    }, d.off = c("removeListener"), d.addListeners = function(a, b) {
        return this.manipulateListeners(!1, a, b);
    }, d.removeListeners = function(a, b) {
        return this.manipulateListeners(!0, a, b);
    }, d.manipulateListeners = function(a, b, c) {
        var d, e, f = a ? this.removeListener : this.addListener, g = a ? this.removeListeners : this.addListeners;
        if ("object" != typeof b || b instanceof RegExp) for (d = c.length; d--; ) f.call(this, b, c[d]); else for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ("function" == typeof e ? f.call(this, d, e) : g.call(this, d, e));
        return this;
    }, d.removeEvent = function(a) {
        var b, c = typeof a, d = this._getEvents();
        if ("string" === c) delete d[a]; else if (a instanceof RegExp) for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b]; else delete this._events;
        return this;
    }, d.removeAllListeners = c("removeEvent"), d.emitEvent = function(a, b) {
        var c, d, e, f, g = this.getListenersAsObject(a);
        for (e in g) if (g.hasOwnProperty(e)) for (d = g[e].length; d--; ) c = g[e][d], 
        c.once === !0 && this.removeListener(a, c.listener), f = c.listener.apply(this, b || []), 
        f === this._getOnceReturnValue() && this.removeListener(a, c.listener);
        return this;
    }, d.trigger = c("emitEvent"), d.emit = function(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(a, b);
    }, d.setOnceReturnValue = function(a) {
        return this._onceReturnValue = a, this;
    }, d._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0;
    }, d._getEvents = function() {
        return this._events || (this._events = {});
    }, a.noConflict = function() {
        return e.EventEmitter = f, a;
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return a;
    }) : "object" == typeof module && module.exports ? module.exports = a : e.EventEmitter = a;
}.call(this), function(a) {
    function b(a) {
        if (a) {
            if ("string" == typeof d[a]) return a;
            a = a.charAt(0).toUpperCase() + a.slice(1);
            for (var b, e = 0, f = c.length; f > e; e++) if (b = c[e] + a, "string" == typeof d[b]) return b;
        }
    }
    var c = "Webkit Moz ms Ms O".split(" "), d = document.documentElement.style;
    "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
        return b;
    }) : "object" == typeof exports ? module.exports = b : a.getStyleProperty = b;
}(window), function(a, b) {
    function c(a) {
        var b = parseFloat(a), c = -1 === a.indexOf("%") && !isNaN(b);
        return c && b;
    }
    function d() {}
    function e() {
        for (var a = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, b = 0, c = h.length; c > b; b++) {
            var d = h[b];
            a[d] = 0;
        }
        return a;
    }
    function f(b) {
        function d() {
            if (!m) {
                m = !0;
                var d = a.getComputedStyle;
                if (j = function() {
                    var a = d ? function(a) {
                        return d(a, null);
                    } : function(a) {
                        return a.currentStyle;
                    };
                    return function(b) {
                        var c = a(b);
                        return c || g("Style returned " + c + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), 
                        c;
                    };
                }(), k = b("boxSizing")) {
                    var e = document.createElement("div");
                    e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", 
                    e.style.borderWidth = "1px 2px 3px 4px", e.style[k] = "border-box";
                    var f = document.body || document.documentElement;
                    f.appendChild(e);
                    var h = j(e);
                    l = 200 === c(h.width), f.removeChild(e);
                }
            }
        }
        function f(a) {
            if (d(), "string" == typeof a && (a = document.querySelector(a)), a && "object" == typeof a && a.nodeType) {
                var b = j(a);
                if ("none" === b.display) return e();
                var f = {};
                f.width = a.offsetWidth, f.height = a.offsetHeight;
                for (var g = f.isBorderBox = !(!k || !b[k] || "border-box" !== b[k]), m = 0, n = h.length; n > m; m++) {
                    var o = h[m], p = b[o];
                    p = i(a, p);
                    var q = parseFloat(p);
                    f[o] = isNaN(q) ? 0 : q;
                }
                var r = f.paddingLeft + f.paddingRight, s = f.paddingTop + f.paddingBottom, t = f.marginLeft + f.marginRight, u = f.marginTop + f.marginBottom, v = f.borderLeftWidth + f.borderRightWidth, w = f.borderTopWidth + f.borderBottomWidth, x = g && l, y = c(b.width);
                y !== !1 && (f.width = y + (x ? 0 : r + v));
                var z = c(b.height);
                return z !== !1 && (f.height = z + (x ? 0 : s + w)), f.innerWidth = f.width - (r + v), 
                f.innerHeight = f.height - (s + w), f.outerWidth = f.width + t, f.outerHeight = f.height + u, 
                f;
            }
        }
        function i(b, c) {
            if (a.getComputedStyle || -1 === c.indexOf("%")) return c;
            var d = b.style, e = d.left, f = b.runtimeStyle, g = f && f.left;
            return g && (f.left = b.currentStyle.left), d.left = c, c = d.pixelLeft, d.left = e, 
            g && (f.left = g), c;
        }
        var j, k, l, m = !1;
        return f;
    }
    var g = "undefined" == typeof console ? d : function(a) {
        console.error(a);
    }, h = [ "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth" ];
    "function" == typeof define && define.amd ? define("get-size/get-size", [ "get-style-property/get-style-property" ], f) : "object" == typeof exports ? module.exports = f(require("desandro-get-style-property")) : a.getSize = f(a.getStyleProperty);
}(window), function(a) {
    function b(a, b) {
        return a[g](b);
    }
    function c(a) {
        if (!a.parentNode) {
            var b = document.createDocumentFragment();
            b.appendChild(a);
        }
    }
    function d(a, b) {
        c(a);
        for (var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length; f > e; e++) if (d[e] === a) return !0;
        return !1;
    }
    function e(a, d) {
        return c(a), b(a, d);
    }
    var f, g = function() {
        if (a.matches) return "matches";
        if (a.matchesSelector) return "matchesSelector";
        for (var b = [ "webkit", "moz", "ms", "o" ], c = 0, d = b.length; d > c; c++) {
            var e = b[c], f = e + "MatchesSelector";
            if (a[f]) return f;
        }
    }();
    if (g) {
        var h = document.createElement("div"), i = b(h, "div");
        f = i ? b : e;
    } else f = d;
    "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
        return f;
    }) : "object" == typeof exports ? module.exports = f : window.matchesSelector = f;
}(Element.prototype), function(a) {
    function b(a, b) {
        for (var c in b) a[c] = b[c];
        return a;
    }
    function c(a) {
        for (var b in a) return !1;
        return b = null, !0;
    }
    function d(a) {
        return a.replace(/([A-Z])/g, function(a) {
            return "-" + a.toLowerCase();
        });
    }
    function e(a, e, f) {
        function h(a, b) {
            a && (this.element = a, this.layout = b, this.position = {
                x: 0,
                y: 0
            }, this._create());
        }
        var i = f("transition"), j = f("transform"), k = i && j, l = !!f("perspective"), m = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "otransitionend",
            transition: "transitionend"
        }[i], n = [ "transform", "transition", "transitionDuration", "transitionProperty" ], o = function() {
            for (var a = {}, b = 0, c = n.length; c > b; b++) {
                var d = n[b], e = f(d);
                e && e !== d && (a[d] = e);
            }
            return a;
        }();
        b(h.prototype, a.prototype), h.prototype._create = function() {
            this._transn = {
                ingProperties: {},
                clean: {},
                onEnd: {}
            }, this.css({
                position: "absolute"
            });
        }, h.prototype.handleEvent = function(a) {
            var b = "on" + a.type;
            this[b] && this[b](a);
        }, h.prototype.getSize = function() {
            this.size = e(this.element);
        }, h.prototype.css = function(a) {
            var b = this.element.style;
            for (var c in a) {
                var d = o[c] || c;
                b[d] = a[c];
            }
        }, h.prototype.getPosition = function() {
            var a = g(this.element), b = this.layout.options, c = b.isOriginLeft, d = b.isOriginTop, e = parseInt(a[c ? "left" : "right"], 10), f = parseInt(a[d ? "top" : "bottom"], 10);
            e = isNaN(e) ? 0 : e, f = isNaN(f) ? 0 : f;
            var h = this.layout.size;
            e -= c ? h.paddingLeft : h.paddingRight, f -= d ? h.paddingTop : h.paddingBottom, 
            this.position.x = e, this.position.y = f;
        }, h.prototype.layoutPosition = function() {
            var a = this.layout.size, b = this.layout.options, c = {};
            b.isOriginLeft ? (c.left = this.position.x + a.paddingLeft + "px", c.right = "") : (c.right = this.position.x + a.paddingRight + "px", 
            c.left = ""), b.isOriginTop ? (c.top = this.position.y + a.paddingTop + "px", c.bottom = "") : (c.bottom = this.position.y + a.paddingBottom + "px", 
            c.top = ""), this.css(c), this.emitEvent("layout", [ this ]);
        };
        var p = l ? function(a, b) {
            return "translate3d(" + a + "px, " + b + "px, 0)";
        } : function(a, b) {
            return "translate(" + a + "px, " + b + "px)";
        };
        h.prototype._transitionTo = function(a, b) {
            this.getPosition();
            var c = this.position.x, d = this.position.y, e = parseInt(a, 10), f = parseInt(b, 10), g = e === this.position.x && f === this.position.y;
            if (this.setPosition(a, b), g && !this.isTransitioning) return void this.layoutPosition();
            var h = a - c, i = b - d, j = {}, k = this.layout.options;
            h = k.isOriginLeft ? h : -h, i = k.isOriginTop ? i : -i, j.transform = p(h, i), 
            this.transition({
                to: j,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            });
        }, h.prototype.goTo = function(a, b) {
            this.setPosition(a, b), this.layoutPosition();
        }, h.prototype.moveTo = k ? h.prototype._transitionTo : h.prototype.goTo, h.prototype.setPosition = function(a, b) {
            this.position.x = parseInt(a, 10), this.position.y = parseInt(b, 10);
        }, h.prototype._nonTransition = function(a) {
            this.css(a.to), a.isCleaning && this._removeStyles(a.to);
            for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this);
        }, h.prototype._transition = function(a) {
            if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(a);
            var b = this._transn;
            for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
            for (c in a.to) b.ingProperties[c] = !0, a.isCleaning && (b.clean[c] = !0);
            if (a.from) {
                this.css(a.from);
                var d = this.element.offsetHeight;
                d = null;
            }
            this.enableTransition(a.to), this.css(a.to), this.isTransitioning = !0;
        };
        var q = j && d(j) + ",opacity";
        h.prototype.enableTransition = function() {
            this.isTransitioning || (this.css({
                transitionProperty: q,
                transitionDuration: this.layout.options.transitionDuration
            }), this.element.addEventListener(m, this, !1));
        }, h.prototype.transition = h.prototype[i ? "_transition" : "_nonTransition"], h.prototype.onwebkitTransitionEnd = function(a) {
            this.ontransitionend(a);
        }, h.prototype.onotransitionend = function(a) {
            this.ontransitionend(a);
        };
        var r = {
            "-webkit-transform": "transform",
            "-moz-transform": "transform",
            "-o-transform": "transform"
        };
        h.prototype.ontransitionend = function(a) {
            if (a.target === this.element) {
                var b = this._transn, d = r[a.propertyName] || a.propertyName;
                if (delete b.ingProperties[d], c(b.ingProperties) && this.disableTransition(), d in b.clean && (this.element.style[a.propertyName] = "", 
                delete b.clean[d]), d in b.onEnd) {
                    var e = b.onEnd[d];
                    e.call(this), delete b.onEnd[d];
                }
                this.emitEvent("transitionEnd", [ this ]);
            }
        }, h.prototype.disableTransition = function() {
            this.removeTransitionStyles(), this.element.removeEventListener(m, this, !1), this.isTransitioning = !1;
        }, h.prototype._removeStyles = function(a) {
            var b = {};
            for (var c in a) b[c] = "";
            this.css(b);
        };
        var s = {
            transitionProperty: "",
            transitionDuration: ""
        };
        return h.prototype.removeTransitionStyles = function() {
            this.css(s);
        }, h.prototype.removeElem = function() {
            this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [ this ]);
        }, h.prototype.remove = function() {
            if (!i || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
            var a = this;
            this.on("transitionEnd", function() {
                return a.removeElem(), !0;
            }), this.hide();
        }, h.prototype.reveal = function() {
            delete this.isHidden, this.css({
                display: ""
            });
            var a = this.layout.options;
            this.transition({
                from: a.hiddenStyle,
                to: a.visibleStyle,
                isCleaning: !0
            });
        }, h.prototype.hide = function() {
            this.isHidden = !0, this.css({
                display: ""
            });
            var a = this.layout.options;
            this.transition({
                from: a.visibleStyle,
                to: a.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: {
                    opacity: function() {
                        this.isHidden && this.css({
                            display: "none"
                        });
                    }
                }
            });
        }, h.prototype.destroy = function() {
            this.css({
                position: "",
                left: "",
                right: "",
                top: "",
                bottom: "",
                transition: "",
                transform: ""
            });
        }, h;
    }
    var f = a.getComputedStyle, g = f ? function(a) {
        return f(a, null);
    } : function(a) {
        return a.currentStyle;
    };
    "function" == typeof define && define.amd ? define("outlayer/item", [ "eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property" ], e) : "object" == typeof exports ? module.exports = e(require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property")) : (a.Outlayer = {}, 
    a.Outlayer.Item = e(a.EventEmitter, a.getSize, a.getStyleProperty));
}(window), function(a) {
    function b(a, b) {
        for (var c in b) a[c] = b[c];
        return a;
    }
    function c(a) {
        return "[object Array]" === l.call(a);
    }
    function d(a) {
        var b = [];
        if (c(a)) b = a; else if (a && "number" == typeof a.length) for (var d = 0, e = a.length; e > d; d++) b.push(a[d]); else b.push(a);
        return b;
    }
    function e(a, b) {
        var c = n(b, a);
        -1 !== c && b.splice(c, 1);
    }
    function f(a) {
        return a.replace(/(.)([A-Z])/g, function(a, b, c) {
            return b + "-" + c;
        }).toLowerCase();
    }
    function g(c, g, l, n, o, p) {
        function q(a, c) {
            if ("string" == typeof a && (a = h.querySelector(a)), !a || !m(a)) return void (i && i.error("Bad " + this.constructor.namespace + " element: " + a));
            this.element = a, this.options = b({}, this.constructor.defaults), this.option(c);
            var d = ++r;
            this.element.outlayerGUID = d, s[d] = this, this._create(), this.options.isInitLayout && this.layout();
        }
        var r = 0, s = {};
        return q.namespace = "outlayer", q.Item = p, q.defaults = {
            containerStyle: {
                position: "relative"
            },
            isInitLayout: !0,
            isOriginLeft: !0,
            isOriginTop: !0,
            isResizeBound: !0,
            isResizingContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {
                opacity: 0,
                transform: "scale(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scale(1)"
            }
        }, b(q.prototype, l.prototype), q.prototype.option = function(a) {
            b(this.options, a);
        }, q.prototype._create = function() {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), b(this.element.style, this.options.containerStyle), 
            this.options.isResizeBound && this.bindResize();
        }, q.prototype.reloadItems = function() {
            this.items = this._itemize(this.element.children);
        }, q.prototype._itemize = function(a) {
            for (var b = this._filterFindItemElements(a), c = this.constructor.Item, d = [], e = 0, f = b.length; f > e; e++) {
                var g = b[e], h = new c(g, this);
                d.push(h);
            }
            return d;
        }, q.prototype._filterFindItemElements = function(a) {
            a = d(a);
            for (var b = this.options.itemSelector, c = [], e = 0, f = a.length; f > e; e++) {
                var g = a[e];
                if (m(g)) if (b) {
                    o(g, b) && c.push(g);
                    for (var h = g.querySelectorAll(b), i = 0, j = h.length; j > i; i++) c.push(h[i]);
                } else c.push(g);
            }
            return c;
        }, q.prototype.getItemElements = function() {
            for (var a = [], b = 0, c = this.items.length; c > b; b++) a.push(this.items[b].element);
            return a;
        }, q.prototype.layout = function() {
            this._resetLayout(), this._manageStamps();
            var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, a), this._isLayoutInited = !0;
        }, q.prototype._init = q.prototype.layout, q.prototype._resetLayout = function() {
            this.getSize();
        }, q.prototype.getSize = function() {
            this.size = n(this.element);
        }, q.prototype._getMeasurement = function(a, b) {
            var c, d = this.options[a];
            d ? ("string" == typeof d ? c = this.element.querySelector(d) : m(d) && (c = d), 
            this[a] = c ? n(c)[b] : d) : this[a] = 0;
        }, q.prototype.layoutItems = function(a, b) {
            a = this._getItemsForLayout(a), this._layoutItems(a, b), this._postLayout();
        }, q.prototype._getItemsForLayout = function(a) {
            for (var b = [], c = 0, d = a.length; d > c; c++) {
                var e = a[c];
                e.isIgnored || b.push(e);
            }
            return b;
        }, q.prototype._layoutItems = function(a, b) {
            function c() {
                d.emitEvent("layoutComplete", [ d, a ]);
            }
            var d = this;
            if (!a || !a.length) return void c();
            this._itemsOn(a, "layout", c);
            for (var e = [], f = 0, g = a.length; g > f; f++) {
                var h = a[f], i = this._getItemLayoutPosition(h);
                i.item = h, i.isInstant = b || h.isLayoutInstant, e.push(i);
            }
            this._processLayoutQueue(e);
        }, q.prototype._getItemLayoutPosition = function() {
            return {
                x: 0,
                y: 0
            };
        }, q.prototype._processLayoutQueue = function(a) {
            for (var b = 0, c = a.length; c > b; b++) {
                var d = a[b];
                this._positionItem(d.item, d.x, d.y, d.isInstant);
            }
        }, q.prototype._positionItem = function(a, b, c, d) {
            d ? a.goTo(b, c) : a.moveTo(b, c);
        }, q.prototype._postLayout = function() {
            this.resizeContainer();
        }, q.prototype.resizeContainer = function() {
            if (this.options.isResizingContainer) {
                var a = this._getContainerSize();
                a && (this._setContainerMeasure(a.width, !0), this._setContainerMeasure(a.height, !1));
            }
        }, q.prototype._getContainerSize = k, q.prototype._setContainerMeasure = function(a, b) {
            if (void 0 !== a) {
                var c = this.size;
                c.isBorderBox && (a += b ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth : c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth), 
                a = Math.max(a, 0), this.element.style[b ? "width" : "height"] = a + "px";
            }
        }, q.prototype._itemsOn = function(a, b, c) {
            function d() {
                return e++, e === f && c.call(g), !0;
            }
            for (var e = 0, f = a.length, g = this, h = 0, i = a.length; i > h; h++) {
                var j = a[h];
                j.on(b, d);
            }
        }, q.prototype.ignore = function(a) {
            var b = this.getItem(a);
            b && (b.isIgnored = !0);
        }, q.prototype.unignore = function(a) {
            var b = this.getItem(a);
            b && delete b.isIgnored;
        }, q.prototype.stamp = function(a) {
            if (a = this._find(a)) {
                this.stamps = this.stamps.concat(a);
                for (var b = 0, c = a.length; c > b; b++) {
                    var d = a[b];
                    this.ignore(d);
                }
            }
        }, q.prototype.unstamp = function(a) {
            if (a = this._find(a)) for (var b = 0, c = a.length; c > b; b++) {
                var d = a[b];
                e(d, this.stamps), this.unignore(d);
            }
        }, q.prototype._find = function(a) {
            return a ? ("string" == typeof a && (a = this.element.querySelectorAll(a)), a = d(a)) : void 0;
        }, q.prototype._manageStamps = function() {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var a = 0, b = this.stamps.length; b > a; a++) {
                    var c = this.stamps[a];
                    this._manageStamp(c);
                }
            }
        }, q.prototype._getBoundingRect = function() {
            var a = this.element.getBoundingClientRect(), b = this.size;
            this._boundingRect = {
                left: a.left + b.paddingLeft + b.borderLeftWidth,
                top: a.top + b.paddingTop + b.borderTopWidth,
                right: a.right - (b.paddingRight + b.borderRightWidth),
                bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth)
            };
        }, q.prototype._manageStamp = k, q.prototype._getElementOffset = function(a) {
            var b = a.getBoundingClientRect(), c = this._boundingRect, d = n(a), e = {
                left: b.left - c.left - d.marginLeft,
                top: b.top - c.top - d.marginTop,
                right: c.right - b.right - d.marginRight,
                bottom: c.bottom - b.bottom - d.marginBottom
            };
            return e;
        }, q.prototype.handleEvent = function(a) {
            var b = "on" + a.type;
            this[b] && this[b](a);
        }, q.prototype.bindResize = function() {
            this.isResizeBound || (c.bind(a, "resize", this), this.isResizeBound = !0);
        }, q.prototype.unbindResize = function() {
            this.isResizeBound && c.unbind(a, "resize", this), this.isResizeBound = !1;
        }, q.prototype.onresize = function() {
            function a() {
                b.resize(), delete b.resizeTimeout;
            }
            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var b = this;
            this.resizeTimeout = setTimeout(a, 100);
        }, q.prototype.resize = function() {
            this.isResizeBound && this.needsResizeLayout() && this.layout();
        }, q.prototype.needsResizeLayout = function() {
            var a = n(this.element), b = this.size && a;
            return b && a.innerWidth !== this.size.innerWidth;
        }, q.prototype.addItems = function(a) {
            var b = this._itemize(a);
            return b.length && (this.items = this.items.concat(b)), b;
        }, q.prototype.appended = function(a) {
            var b = this.addItems(a);
            b.length && (this.layoutItems(b, !0), this.reveal(b));
        }, q.prototype.prepended = function(a) {
            var b = this._itemize(a);
            if (b.length) {
                var c = this.items.slice(0);
                this.items = b.concat(c), this._resetLayout(), this._manageStamps(), this.layoutItems(b, !0), 
                this.reveal(b), this.layoutItems(c);
            }
        }, q.prototype.reveal = function(a) {
            var b = a && a.length;
            if (b) for (var c = 0; b > c; c++) {
                var d = a[c];
                d.reveal();
            }
        }, q.prototype.hide = function(a) {
            var b = a && a.length;
            if (b) for (var c = 0; b > c; c++) {
                var d = a[c];
                d.hide();
            }
        }, q.prototype.getItem = function(a) {
            for (var b = 0, c = this.items.length; c > b; b++) {
                var d = this.items[b];
                if (d.element === a) return d;
            }
        }, q.prototype.getItems = function(a) {
            if (a && a.length) {
                for (var b = [], c = 0, d = a.length; d > c; c++) {
                    var e = a[c], f = this.getItem(e);
                    f && b.push(f);
                }
                return b;
            }
        }, q.prototype.remove = function(a) {
            a = d(a);
            var b = this.getItems(a);
            if (b && b.length) {
                this._itemsOn(b, "remove", function() {
                    this.emitEvent("removeComplete", [ this, b ]);
                });
                for (var c = 0, f = b.length; f > c; c++) {
                    var g = b[c];
                    g.remove(), e(g, this.items);
                }
            }
        }, q.prototype.destroy = function() {
            var a = this.element.style;
            a.height = "", a.position = "", a.width = "";
            for (var b = 0, c = this.items.length; c > b; b++) {
                var d = this.items[b];
                d.destroy();
            }
            this.unbindResize();
            var e = this.element.outlayerGUID;
            delete s[e], delete this.element.outlayerGUID, j && j.removeData(this.element, this.constructor.namespace);
        }, q.data = function(a) {
            var b = a && a.outlayerGUID;
            return b && s[b];
        }, q.create = function(a, c) {
            function d() {
                q.apply(this, arguments);
            }
            return Object.create ? d.prototype = Object.create(q.prototype) : b(d.prototype, q.prototype), 
            d.prototype.constructor = d, d.defaults = b({}, q.defaults), b(d.defaults, c), d.prototype.settings = {}, 
            d.namespace = a, d.data = q.data, d.Item = function() {
                p.apply(this, arguments);
            }, d.Item.prototype = new p(), g(function() {
                for (var b = f(a), c = h.querySelectorAll(".js-" + b), e = "data-" + b + "-options", g = 0, k = c.length; k > g; g++) {
                    var l, m = c[g], n = m.getAttribute(e);
                    try {
                        l = n && JSON.parse(n);
                    } catch (o) {
                        i && i.error("Error parsing " + e + " on " + m.nodeName.toLowerCase() + (m.id ? "#" + m.id : "") + ": " + o);
                        continue;
                    }
                    var p = new d(m, l);
                    j && j.data(m, a, p);
                }
            }), j && j.bridget && j.bridget(a, d), d;
        }, q.Item = p, q;
    }
    var h = a.document, i = a.console, j = a.jQuery, k = function() {}, l = Object.prototype.toString, m = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(a) {
        return a instanceof HTMLElement;
    } : function(a) {
        return a && "object" == typeof a && 1 === a.nodeType && "string" == typeof a.nodeName;
    }, n = Array.prototype.indexOf ? function(a, b) {
        return a.indexOf(b);
    } : function(a, b) {
        for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
        return -1;
    };
    "function" == typeof define && define.amd ? define("outlayer/outlayer", [ "eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item" ], g) : "object" == typeof exports ? module.exports = g(require("eventie"), require("doc-ready"), require("wolfy87-eventemitter"), require("get-size"), require("desandro-matches-selector"), require("./item")) : a.Outlayer = g(a.eventie, a.docReady, a.EventEmitter, a.getSize, a.matchesSelector, a.Outlayer.Item);
}(window), function(a, b) {
    "function" == typeof define && define.amd ? define('vendor/misc/masonry',[ "outlayer/outlayer", "get-size/get-size" ], b) : "object" == typeof exports ? module.exports = b(require("outlayer"), require("get-size")) : a.Masonry = b(a.Outlayer, a.getSize);
}(window, function(a, b) {
    var c = Array.prototype.indexOf ? function(a, b) {
        return a.indexOf(b);
    } : function(a, b) {
        for (var c = 0, d = a.length; d > c; c++) {
            var e = a[c];
            if (e === b) return c;
        }
        return -1;
    }, d = a.create("masonry");
    return d.prototype._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), 
        this.measureColumns();
        var a = this.cols;
        for (this.colYs = []; a--; ) this.colYs.push(0);
        this.maxY = 0;
    }, d.prototype.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var a = this.items[0], c = a && a.element;
            this.columnWidth = c && b(c).outerWidth || this.containerWidth;
        }
        var d = this.columnWidth += this.gutter, e = this.containerWidth + this.gutter, f = e / d, g = d - e % d, h = g && 1 > g ? "round" : "floor";
        f = Math[h](f), this.cols = Math.max(f, 1);
    }, d.prototype.getContainerWidth = function() {
        var a = this.options.isFitWidth ? this.element.parentNode : this.element, c = b(a);
        this.containerWidth = c && c.innerWidth;
    }, d.prototype._getItemLayoutPosition = function(a) {
        a.getSize();
        var b = a.size.outerWidth % this.columnWidth, d = b && 1 > b ? "round" : "ceil", e = Math[d](a.size.outerWidth / this.columnWidth);
        e = Math.min(e, this.cols);
        for (var f = this._getColGroup(e), g = Math.min.apply(Math, f), h = c(f, g), i = {
            x: this.columnWidth * h,
            y: g
        }, j = g + a.size.outerHeight, k = this.cols + 1 - f.length, l = 0; k > l; l++) this.colYs[h + l] = j;
        return i;
    }, d.prototype._getColGroup = function(a) {
        if (2 > a) return this.colYs;
        for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
            var e = this.colYs.slice(d, d + a);
            b[d] = Math.max.apply(Math, e);
        }
        return b;
    }, d.prototype._manageStamp = function(a) {
        var c = b(a), d = this._getElementOffset(a), e = this.options.isOriginLeft ? d.left : d.right, f = e + c.outerWidth, g = Math.floor(e / this.columnWidth);
        g = Math.max(0, g);
        var h = Math.floor(f / this.columnWidth);
        h -= f % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);
        for (var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight, j = g; h >= j; j++) this.colYs[j] = Math.max(i, this.colYs[j]);
    }, d.prototype._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var a = {
            height: this.maxY
        };
        return this.options.isFitWidth && (a.width = this._getContainerFitWidth()), a;
    }, d.prototype._getContainerFitWidth = function() {
        for (var a = 0, b = this.cols; --b && 0 === this.colYs[b]; ) a++;
        return (this.cols - a) * this.columnWidth - this.gutter;
    }, d.prototype.needsResizeLayout = function() {
        var a = this.containerWidth;
        return this.getContainerWidth(), a !== this.containerWidth;
    }, d;
});
define('be/layout/mason',[ "jquery", "log", "nbd/util/extend", "nbd/util/media", "nbd/Promise", "be/decorator/waitsforimages", "vendor/misc/masonry" ], function(a, b, c, d, e, f, g) {
    "use strict";
    b = b.get("be/layout/mason");
    var h, i = a(window), j = {
        itemSelector: ".js-item",
        isInitLayout: !1,
        isResizeBound: !1,
        hiddenStyle: {
            visibility: "hidden"
        },
        visibleStyle: {
            visibility: "visible"
        },
        transitionDuration: 0
    };
    return {
        init: function(e, f) {
            if (!e) throw b.error("A context must be provided to init"), new Error("[be/layout/mason] A context must be provided to init");
            f = f || {};
            var g = f.toggleQuery;
            return delete f.toggleQuery, this.$context = e, this.options = c(j, f), this._adjustMasonry = this._adjustMasonry.bind(this), 
            f.columnWidth && "string" == typeof f.columnWidth && (this.$sizer = a("<div>", {
                "class": "js-mason-sizer " + f.columnWidth.replace(/\./, "")
            }).css({
                visibility: "hidden",
                position: "absolute",
                top: 0,
                left: 0
            }).prependTo(e)), h || void 0 === g || (d("mason-min", g), h = !0), d.on("mason-min", this._toggle, this), 
            this._toggle(d.is("mason-min")), this;
        },
        destroy: function() {
            d.off(null, null, this), i.off("resize", this._adjustMasonry), this.$context = null, 
            this.$sizer && (this.$sizer.remove(), this.$sizer = null), this._mason && (this._mason.off("layoutComplete"), 
            this._mason.destroy(), this._mason = null);
        },
        update: function() {
            this.ready() && (this._forceContainerSize(this.$context), this._mason.layout());
        },
        prepend: function(a) {
            return this._addItems(a, "prepended");
        },
        append: function(a) {
            return this._addItems(a, "appended");
        },
        ready: function() {
            return !!this._mason;
        },
        stamp: function(a) {
            this._mason.stamp(a);
        },
        hasStamps: function(a) {
            return -1 !== this._mason.stamps.indexOf(a);
        },
        unstamp: function(a) {
            this._mason.unstamp(a);
        },
        onLayoutCompleted: function(a) {
            this.ready && this._mason.on("layoutComplete", a);
        },
        _adjustMasonry: function() {
            this.ready() && (this._adjustmentTimeoutId && window.clearTimeout(this._adjustmentTimeoutId), 
            this.$context.css("visibility", "hidden"), this._adjustmentTimeoutId = window.setTimeout(function() {
                this._forceContainerSize(this.$context), this.ready() && this._mason.layout(), this.$context.css("visibility", "visible");
            }.bind(this), 100));
        },
        _create: function(a) {
            return new g(a[0], this.options);
        },
        _addItems: function(a, c) {
            return this.ready() ? (this._mason.on("layoutComplete", this._layoutCompleted.bind(this)), 
            new e(function(d) {
                a && (a.css("visibility", "hidden"), this._forceContainerSize(a.addClass("js-item")), 
                this._mason[c](a), this._mason.layout(), a.css("visibility", "visible"), b.info("Added " + a.length + " items"), 
                d());
            }.bind(this))) : e.resolve();
        },
        _layoutCompleted: function(a, c) {
            return b.info("Laid out " + c.length + " items"), !0;
        },
        _forceContainerSize: function(b) {
            b.find("[data-aspect-ratio] img").each(function(b, c) {
                var d = a(c), e = d.closest("[data-aspect-ratio]"), f = e.data(), g = e.width(), h = g / f.width, i = Math.ceil(g / f.aspectRatio), j = f.minHeight ? Math.ceil(h * f.minHeight) : i, k = f.maxHeight ? Math.ceil(h * f.maxHeight) : i, l = Math.max(Math.min(i, k), j);
                d.addClass("js-loaded"), e.css("height", l);
            }.bind(this));
        },
        _toggle: function(a) {
            a ? this._mason && (i.off("resize", this._adjustMasonry), setTimeout(function() {
                this.destroy();
            }.bind(this._mason), 101), this._mason.destroy(), this._mason = null) : this._mason || (this._mason = this._create(this.$context), 
            i.on("resize", this._adjustMasonry), this._forceContainerSize(this.$context), this._mason.layout());
        }
    };
});
define('discover/content',[ "jquery", "nbd/util/async", "nbd/util/media", "beff/ux/scrollfloat", "lib/gaq", "be/content", "be/layout/mason", "be/spinner", "discover/coordinator", "discover/Model/Filters", "discover/lib/loader" ], function(a, b, c, d, e, f, g, h, i, j, k) {
    "use strict";
    function l() {
        w.show();
    }
    function m(a) {
        v.removeClass("loading"), j.timestamp(a.timestamp), f.render(a.html);
    }
    function n() {
        v.removeClass("loading"), w.hide();
    }
    function o() {
        var a = j.get("content");
        x.hasClass("viewing-" + a) || x.removeClass("viewing-users viewing-projects viewing-wips viewing-teams").addClass("viewing-" + a), 
        u.hasClass(a) || u.removeClass("projects wips users").addClass(a);
    }
    function p() {
        g.init(u.find(".covers"), {
            columnWidth: ".wip-block",
            toggleQuery: "all and (max-width: 499px)"
        });
    }
    function q() {
        g.destroy();
    }
    function r() {
        var a, c = j.get("content");
        return "wips" === c && (a = this, a && a.length) ? void b(function() {
            g.ready() || p(), g.append(a).then(w.hide.bind(w)).then(function() {
                d.check();
            });
        }) : (w.hide(), void b(function() {
            d.check();
        }));
    }
    function s(a) {
        "wips" === a ? (require([ "css!styles/networki/wip" ], j.updateType.bind(j, a)), 
        p()) : j.updateType(a);
    }
    function t() {
        b(function() {
            window.scrollTo(0, Math.min(z, window.scrollY));
        });
    }
    var u, v, w, x, y, z = 1;
    return y = {
        init: function(g) {
            k.load.before(l).then(m, n), u = g, v = a("#top-panel"), x = a(document.body), w = u.find(".loading-spinner"), 
            b(function() {
                x.removeClass("first-load");
            }), f.postview.add(r).add(e.page).add(j.offset.bind(j)), f.postclear.add(t).add(q), 
            j.on("content", o), j.on("all", function() {
                v.addClass("loading"), f.clearNext();
            }), x.hasClass("logged-in") || (c.on("desktop", function(b) {
                z = b ? a("#showcase-and-discover").height() || 0 : null;
            }), z = c.is("desktop") ? a("#showcase-and-discover").height() || 0 : null), u.on("click", ".cover-fields a, .site-message a", function() {
                j.reset();
            }), j.on("content", f.setItem), j.on("time", f.setTime), f.init(u.find(".covers"), j.get("content"), j.get("time")), 
            h.create(w.hide().get(0)), i.on("content.type", s), d(.8, k.load);
        }
    };
});
define('discover/View/Sidebar/Menu',[ "jquery", "nbd/View/Element", "nbd/util/pipe", "hgn!templates/discover/sidebar-menu" ], function(a, b, c, d) {
    "use strict";
    var e = b.extend({
        $nub: null,
        init: function() {
            this._super.apply(this, arguments), this.dismiss = this.dismiss.bind(this);
        },
        template: c(d, a),
        rendered: function() {
            this.$view.on("click", function(a) {
                a.stopPropagation();
            }), this.$nub = this.$view.find(".search-option-nub");
        },
        position: function() {
            var a = this.$view.outerHeight(), b = this.$nub.outerHeight(), c = parseFloat(this.$nub.css("bottom"));
            this.$view.css("top", b + c - a + "px");
        },
        dismiss: function(a) {
            this.$view && !this.$view.parent().find(a.target).length && this.hide();
        },
        show: function() {
            this.$view.trigger("menu.show"), a("html").on("click", this.dismiss), this.$view.show(), 
            this.position(), this.$view.addClass("shown");
        },
        hide: function(b) {
            this.$view.trigger("menu.hide", [ b ]), a("html").off("click", this.dismiss), this.$view.removeClass("shown");
        },
        toggle: function() {
            return this.$view ? void (this.$view.hasClass("shown") ? this.hide() : this.show()) : (this.render(), 
            void this.show());
        }
    });
    return e;
});
define('discover/View/Sidebar/Menu/Autoselect',[ "page_constants", "jquery", "nbd/util/async", "lib/autosource", "be/xhr", "discover/View/Sidebar/Menu", "discover/Model/Filters", "hgn!templates/lib/_crumb", "hgn!templates/discover/suggest-item", "jquery-plugins/be/autoselect" ], function(a, b, c, d, e, f, g, h, i) {
    "use strict";
    function j(a) {
        return a.value = a.n, a;
    }
    function k(a) {
        return b.map(a, j);
    }
    function l(a, b) {
        return b.forEach(function(b) {
            b.type = a;
        }), b;
    }
    var m = f.extend({
        rendered: function() {
            this._super();
            var a = this, d = this.$view.find(".search-option-content").addClass("ui-front search-option-" + this.constructor.TYPE).find("input"), e = b("<ul>", {
                "class": "listselector_selections autocomplete_selections"
            }).insertAfter(d.parent());
            e.render = function(c) {
                c.forEach(function(a) {
                    this.append(b(h(a)).data("item", a));
                }, this.empty()), a.position();
            }, this.initAutoselect(d, e), this.bindAutoselect(d, e), this.$view.on("menu.show", function() {
                c(d.focus.bind(d));
            }).on("menu.hide", function() {
                d.val("");
            });
        },
        save: function() {},
        templateData: function() {
            return {
                title: this.constructor.TITLE,
                confirm: this.constructor.CONFIRM,
                field: "search-input-" + this.constructor.TYPE
            };
        },
        submit: function(a, b) {
            var c = b && b.value || a;
            g.change(this.constructor.TYPE, c.map(function(a) {
                return a.id;
            }).join("|") || void 0);
        },
        initAutoselect: function(b, c) {
            var d = this, e = g.get(d.constructor.TYPE);
            e && (e = e.split("|").map(function(b) {
                return a[d.constructor.TYPE.toUpperCase()][b];
            }), c.render(l(this.constructor.TYPE, k(e)))), b.autoselect({
                autoFocus: !0,
                source: this._createSource(),
                itemTemplate: i,
                value: e,
                limit: d.constructor.LIMIT,
                width: b.outerWidth(),
                messages: {
                    placeholder: a.FILTER_PLACEHOLDER,
                    limited: d.constructor.LIMIT_MESSAGE
                }
            });
        },
        _createSource: function() {
            var a = d({
                maxLocal: 5
            });
            return e({
                url: "/tags/getAutoList",
                data: {
                    type: this.constructor.ENDPOINT_TYPE || this.constructor.TYPE
                }
            }).then(function(a) {
                return a.json;
            }).then(this.save).then(k).then(l.bind(null, this.constructor.TYPE)).then(a.addLocal.bind(a)), 
            a;
        },
        bindAutoselect: function(c, d) {
            var e = this.position.bind(this), f = this;
            c.on({
                autoselectvalue: function(a, b) {
                    d.render(b.value);
                },
                autoselectopen: e,
                autoselectclose: e
            }).on("autoselectvalue", this.hide.bind(this)).on("autoselectvalue", this.submit.bind(this)), 
            d.on("click", ".js-remove", function() {
                c.autoselect("unselect", b(this).parent().data("item"));
            }), g.on(this.constructor.TYPE, function(b) {
                c.autoselect("empty"), b && c.autoselect("select", b.split("|").map(function(b) {
                    return a[f.constructor.TYPE.toUpperCase()][b];
                }));
            });
        },
        destroy: function() {
            g.off(null, null, this), this._super();
        }
    });
    return m;
});
define('discover/View/Sidebar/Menu/School',[ "discover/View/Sidebar/Menu/Autoselect", "page_constants" ], function(a, b) {
    "use strict";
    var c = a.extend({
        save: function(a) {
            return b.SCHOOLS = a;
        }
    }, {
        TITLE: b.FILTER_HEADERS.SCHOOLS,
        TYPE: b.FILTER_KEY_SCHOOLS,
        LIMIT: b.FILTER_LIMIT,
        LIMIT_MESSAGE: b.FILTER_LIMIT_MESSAGES.SCHOOLS
    });
    return c;
});
define('discover/View/Sidebar/Menu/Tool',[ "page_constants", "lib/autosource", "be/xhr", "discover/View/Sidebar/Menu/Autoselect" ], function(a, b, c, d) {
    "use strict";
    return d.extend({
        save: function(b) {
            a.TOOLS = a.TOOLS || {}, b.forEach(function(b) {
                a.TOOLS[b.id] = {
                    c: this.constructor.TYPE,
                    n: b.title,
                    value: b.title,
                    id: b.id
                };
            }, this);
        },
        _createSource: function() {
            var d = b({
                maxLocal: 5
            }), e = this.constructor.TYPE, f = this;
            return d.addRemote(function(b) {
                return c({
                    url: a.URLS.TAGS_SEARCH,
                    data: {
                        type: e,
                        q: b.term
                    }
                }).then(function(a) {
                    return f.save(a.tags), a.tags.map(function(a) {
                        return a.value = a.title, a.type = e, a;
                    });
                });
            }), d;
        }
    }, {
        TITLE: a.FILTER_HEADERS.TOOLS,
        TYPE: a.FILTER_KEY_TOOLS,
        LIMIT: a.FILTER_LIMIT,
        LIMIT_MESSAGE: a.FILTER_LIMIT_MESSAGES.TOOLS
    });
});

define("vendor/require/hgn!templates/discover/color", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<ul class=\"colors cfix\">");t.b("\n" + i);t.b("  <li class=\"color color-0-0\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-0-1\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-0-2\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-0-3\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-0-4\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-0-5\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-0-6\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-0-7\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-0-8\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-0-9\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-0-10\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-0-11\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-1-0\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-1-1\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-1-2\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-1-3\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-1-4\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-1-5\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-1-6\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-1-7\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-1-8\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-1-9\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-1-10\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-1-11\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-2-0\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-2-1\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-2-2\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-2-3\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-2-4\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-2-5\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-2-6\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-2-7\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-2-8\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-2-9\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-2-10\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-2-11\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-3-0\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-3-1\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-3-2\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-3-3\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-3-4\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-3-5\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-3-6\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-3-7\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-3-8\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-3-9\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-3-10\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-3-11\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-4-0\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-4-1\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-4-2\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-4-3\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-4-4\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-4-5\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-4-6\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-4-7\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-4-8\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-4-9\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-4-10\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-4-11\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-5-0\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-5-1\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-5-2\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-5-3\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-5-4\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-5-5\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-5-6\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-5-7\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-5-8\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-5-9\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-5-10\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-5-11\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-6-0\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-6-1\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-6-2\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-6-3\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-6-4\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-6-5\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-6-6\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-6-7\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-6-8\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-6-9\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-6-10\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-6-11\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-7-0\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-7-1\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-7-2\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-7-3\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-7-4\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-7-5\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-7-6\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-7-7\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-7-8\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-7-9\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-7-10\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-7-11\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-8-0\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-8-1\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-8-2\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-8-3\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-8-4\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-8-5\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-8-6\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-8-7\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-8-8\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-8-9\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-8-10\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-8-11\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-9-0\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-9-1\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-9-2\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-9-3\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-9-4\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-9-5\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-9-6\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-9-7\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-9-8\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-9-9\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-9-10\"></li>");t.b("\n" + i);t.b("  <li class=\"color color-9-11\"></li>");t.b("\n" + i);t.b("</ul>");t.b("\n" + i);t.b("<div class=\"search-option-confirm hide\">");t.b("\n" + i);t.b("  <div class=\"segment first-segment\">");t.b("\n" + i);t.b("    <span class=\"swatch\" style=\"background-color:#ac1d1c\"></span>");t.b("\n" + i);t.b("    <span class=\"hex\">#AC1D1C</span>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"segment ui-slider-bordered\">");t.b("\n" + i);t.b("    <div class=\"left\">");if(t.s(t.f("translate",c,p,1),c,p,0,4641,4673,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("discover_label_variance|Variance");});c.pop();}t.b("</div>");t.b("\n" + i);t.b("    <div class=\"variance left\"></div>");t.b("\n" + i);t.b("    <div class=\"left\">");t.b("\n" + i);t.b("      <input type=\"text\" class=\"variance-input form-text form-text-slider-value\" /> %");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }}, "<ul class=\"colors cfix\">\n  <li class=\"color color-0-0\"></li>\n  <li class=\"color color-0-1\"></li>\n  <li class=\"color color-0-2\"></li>\n  <li class=\"color color-0-3\"></li>\n  <li class=\"color color-0-4\"></li>\n  <li class=\"color color-0-5\"></li>\n  <li class=\"color color-0-6\"></li>\n  <li class=\"color color-0-7\"></li>\n  <li class=\"color color-0-8\"></li>\n  <li class=\"color color-0-9\"></li>\n  <li class=\"color color-0-10\"></li>\n  <li class=\"color color-0-11\"></li>\n  <li class=\"color color-1-0\"></li>\n  <li class=\"color color-1-1\"></li>\n  <li class=\"color color-1-2\"></li>\n  <li class=\"color color-1-3\"></li>\n  <li class=\"color color-1-4\"></li>\n  <li class=\"color color-1-5\"></li>\n  <li class=\"color color-1-6\"></li>\n  <li class=\"color color-1-7\"></li>\n  <li class=\"color color-1-8\"></li>\n  <li class=\"color color-1-9\"></li>\n  <li class=\"color color-1-10\"></li>\n  <li class=\"color color-1-11\"></li>\n  <li class=\"color color-2-0\"></li>\n  <li class=\"color color-2-1\"></li>\n  <li class=\"color color-2-2\"></li>\n  <li class=\"color color-2-3\"></li>\n  <li class=\"color color-2-4\"></li>\n  <li class=\"color color-2-5\"></li>\n  <li class=\"color color-2-6\"></li>\n  <li class=\"color color-2-7\"></li>\n  <li class=\"color color-2-8\"></li>\n  <li class=\"color color-2-9\"></li>\n  <li class=\"color color-2-10\"></li>\n  <li class=\"color color-2-11\"></li>\n  <li class=\"color color-3-0\"></li>\n  <li class=\"color color-3-1\"></li>\n  <li class=\"color color-3-2\"></li>\n  <li class=\"color color-3-3\"></li>\n  <li class=\"color color-3-4\"></li>\n  <li class=\"color color-3-5\"></li>\n  <li class=\"color color-3-6\"></li>\n  <li class=\"color color-3-7\"></li>\n  <li class=\"color color-3-8\"></li>\n  <li class=\"color color-3-9\"></li>\n  <li class=\"color color-3-10\"></li>\n  <li class=\"color color-3-11\"></li>\n  <li class=\"color color-4-0\"></li>\n  <li class=\"color color-4-1\"></li>\n  <li class=\"color color-4-2\"></li>\n  <li class=\"color color-4-3\"></li>\n  <li class=\"color color-4-4\"></li>\n  <li class=\"color color-4-5\"></li>\n  <li class=\"color color-4-6\"></li>\n  <li class=\"color color-4-7\"></li>\n  <li class=\"color color-4-8\"></li>\n  <li class=\"color color-4-9\"></li>\n  <li class=\"color color-4-10\"></li>\n  <li class=\"color color-4-11\"></li>\n  <li class=\"color color-5-0\"></li>\n  <li class=\"color color-5-1\"></li>\n  <li class=\"color color-5-2\"></li>\n  <li class=\"color color-5-3\"></li>\n  <li class=\"color color-5-4\"></li>\n  <li class=\"color color-5-5\"></li>\n  <li class=\"color color-5-6\"></li>\n  <li class=\"color color-5-7\"></li>\n  <li class=\"color color-5-8\"></li>\n  <li class=\"color color-5-9\"></li>\n  <li class=\"color color-5-10\"></li>\n  <li class=\"color color-5-11\"></li>\n  <li class=\"color color-6-0\"></li>\n  <li class=\"color color-6-1\"></li>\n  <li class=\"color color-6-2\"></li>\n  <li class=\"color color-6-3\"></li>\n  <li class=\"color color-6-4\"></li>\n  <li class=\"color color-6-5\"></li>\n  <li class=\"color color-6-6\"></li>\n  <li class=\"color color-6-7\"></li>\n  <li class=\"color color-6-8\"></li>\n  <li class=\"color color-6-9\"></li>\n  <li class=\"color color-6-10\"></li>\n  <li class=\"color color-6-11\"></li>\n  <li class=\"color color-7-0\"></li>\n  <li class=\"color color-7-1\"></li>\n  <li class=\"color color-7-2\"></li>\n  <li class=\"color color-7-3\"></li>\n  <li class=\"color color-7-4\"></li>\n  <li class=\"color color-7-5\"></li>\n  <li class=\"color color-7-6\"></li>\n  <li class=\"color color-7-7\"></li>\n  <li class=\"color color-7-8\"></li>\n  <li class=\"color color-7-9\"></li>\n  <li class=\"color color-7-10\"></li>\n  <li class=\"color color-7-11\"></li>\n  <li class=\"color color-8-0\"></li>\n  <li class=\"color color-8-1\"></li>\n  <li class=\"color color-8-2\"></li>\n  <li class=\"color color-8-3\"></li>\n  <li class=\"color color-8-4\"></li>\n  <li class=\"color color-8-5\"></li>\n  <li class=\"color color-8-6\"></li>\n  <li class=\"color color-8-7\"></li>\n  <li class=\"color color-8-8\"></li>\n  <li class=\"color color-8-9\"></li>\n  <li class=\"color color-8-10\"></li>\n  <li class=\"color color-8-11\"></li>\n  <li class=\"color color-9-0\"></li>\n  <li class=\"color color-9-1\"></li>\n  <li class=\"color color-9-2\"></li>\n  <li class=\"color color-9-3\"></li>\n  <li class=\"color color-9-4\"></li>\n  <li class=\"color color-9-5\"></li>\n  <li class=\"color color-9-6\"></li>\n  <li class=\"color color-9-7\"></li>\n  <li class=\"color color-9-8\"></li>\n  <li class=\"color color-9-9\"></li>\n  <li class=\"color color-9-10\"></li>\n  <li class=\"color color-9-11\"></li>\n</ul>\n<div class=\"search-option-confirm hide\">\n  <div class=\"segment first-segment\">\n    <span class=\"swatch\" style=\"background-color:#ac1d1c\"></span>\n    <span class=\"hex\">#AC1D1C</span>\n  </div>\n  <div class=\"segment ui-slider-bordered\">\n    <div class=\"left\">{{#translate}}discover_label_variance|Variance{{/translate}}</div>\n    <div class=\"variance left\"></div>\n    <div class=\"left\">\n      <input type=\"text\" class=\"variance-input form-text form-text-slider-value\" /> %\n    </div>\n  </div>\n</div>", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('utils/colors',[ "jquery" ], function(a) {
    var b = {
        color_names: {
            black: "000000",
            silver: "C0C0C0",
            gray: "808080",
            white: "FFFFFF",
            maroon: "800000",
            red: "FF0000",
            purple: "800080",
            fuchsia: "FF00FF",
            green: "008000",
            lime: "00FF00",
            olive: "808000",
            yellow: "FFFF00",
            navy: "000080",
            blue: "0000FF",
            teal: "008080",
            aqua: "00FFFF"
        },
        checkHex: function(a, c) {
            return a.match("rgb") && (a = "#" + b.rgbString2hex(a)), c && a.match(/^#/) && (a = a.substr(1)), 
            a;
        },
        hsv2rgb: function(a, b, c) {
            var d, e, f, g, h, i;
            if (0 === b) d = 255 * c, e = 255 * c, f = 255 * c; else {
                var j = 6 * a;
                6 === j && (j = 0);
                var k = Math.floor(j), l = c * (1 - b), m = c * (1 - b * (j - k)), n = c * (1 - b * (1 - (j - k)));
                0 === k ? (g = c, h = n, i = l) : 1 === k ? (g = m, h = c, i = l) : 2 === k ? (g = l, 
                h = c, i = n) : 3 === k ? (g = l, h = m, i = c) : 4 === k ? (g = n, h = l, i = c) : (g = c, 
                h = l, i = m), d = 255 * g, e = 255 * h, f = 255 * i;
            }
            return [ Math.round(d), Math.round(e), Math.round(f) ];
        },
        rgb2hsv: function(a, b, c) {
            a /= 255, b /= 255, c /= 255;
            var d, e, f, g, h, i = Math.min(a, b, c), j = Math.max(a, b, c), k = j - i, l = j;
            return 0 === k ? (e = 0, d = 0) : (d = k / j, f = ((j - a) / 6 + k / 2) / k, g = ((j - b) / 6 + k / 2) / k, 
            h = ((j - c) / 6 + k / 2) / k, a === j ? e = h - g : b === j ? e = 1 / 3 + f - h : c === j && (e = 2 / 3 + g - f), 
            0 > e && (e += 1), e > 1 && (e -= 1)), [ e, d, l ];
        },
        rgb2hex: function(a, b, c) {
            return this.toHex(a) + this.toHex(b) + this.toHex(c);
        },
        hexchars: "0123456789ABCDEF",
        toHex: function(a) {
            return a = a || 0, a = parseInt(a, 10), isNaN(a) && (a = 0), a = Math.round(Math.min(Math.max(0, a), 255)), 
            this.hexchars.charAt((a - a % 16) / 16) + this.hexchars.charAt(a % 16);
        },
        toDec: function(a) {
            return this.hexchars.indexOf(a.toUpperCase());
        },
        hex2rgb: function(a) {
            var b = [];
            return b[0] = 16 * this.toDec(a.substr(0, 1)) + this.toDec(a.substr(1, 1)), b[1] = 16 * this.toDec(a.substr(2, 1)) + this.toDec(a.substr(3, 1)), 
            b[2] = 16 * this.toDec(a.substr(4, 1)) + this.toDec(a.substr(5, 1)), b;
        },
        isValidRGB: function(a) {
            return !a[0] && 0 !== a[0] || isNaN(a[0]) || a[0] < 0 || a[0] > 255 ? !1 : !a[1] && 0 !== a[1] || isNaN(a[1]) || a[1] < 0 || a[1] > 255 ? !1 : !a[2] && 0 !== a[2] || isNaN(a[2]) || a[2] < 0 || a[2] > 255 ? !1 : !0;
        },
        rgbString2hex: function(c) {
            if (this.color_names[c]) return this.color_names[c];
            if (c.match("rgb") || c.match("rgba")) {
                var d = c.replace("rgba", "").replace("rgb", "").replace("(", "").replace(")", "").replace(/\s+/g, "").split(",");
                return a.each(d, function(a) {
                    d[a] = parseInt(d[a], 10);
                }), this.isValidRGB(d) ? "undefined" != typeof d[3] && 0 === d[3] ? "transparent" : b.rgb2hex(d[0], d[1], d[2]) : !1;
            }
            return c.replace("#", "");
        },
        hex2rgbstring: function(a) {
            var c = b.hex2rgb(a);
            return "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",1)";
        },
        darkenByPercent: function(a, c) {
            var d = b.hex2rgb(a), e = b.rgb2hsv(d[0], d[1], d[2]), f = e[2], g = f * c, h = [ e[0], e[1], g ], i = this.hsv2rgb(h[0], h[1], h[2]), j = this.rgb2hex(i[0], i[1], i[2]);
            return j;
        }
    };
    return b;
});
!function(a) {
    "use strict";
    return "function" == typeof define && define.amd ? void define('jquery-plugins/be/fancyslider',[ "jquery", "jqueryui/slider" ], function() {
        var b = a.apply(this, arguments);
        return b;
    }) : jQuery && a.call(this, jQuery);
}(function(a) {
    "use strict";
    a.fn.fancyslider = function(b) {
        function c(a, c) {
            function d() {
                return g > ("value" === b.input ? j : 100);
            }
            function e() {
                return g < ("value" === b.input ? k : 0);
            }
            var f, g = parseInt(a.target.value, 10), j = h.slider("option", "max"), k = h.slider("option", "min");
            (parseInt(h.slider("value"), 10) !== g || c === !0) && (isNaN(g) && (g = "value" === b.input ? h.slider("value") : b.percent_default), 
            h.trigger("slidestart", {
                value: h.slider("value")
            }), i = !1, f = "value" === b.input ? g : Math.round(h.slider("option", "max") * (g / 100)), 
            d() && (f = j), e() && (f = k), h.slider("value", f), h.trigger("slide", {
                value: f
            }), f = h.slider("value"), h.trigger("slidestop", {
                value: f
            }), a.target.value = "value" === b.input ? f : f / j * 100);
        }
        function d(b) {
            var c = !1;
            switch (b.keyCode) {
              case a.ui.keyCode.ENTER:
                c = !0;
                break;

              case a.ui.keyCode.UP:
              case a.ui.keyCode.DOWN:
                m.val(parseInt(m.val(), 10) - 1), c = !0;
            }
            return c ? (m.trigger("blur").focus(), !1) : void 0;
        }
        function e() {
            i && new Date() - i > 500 && m.val() && (m.trigger("blur").focus(), i = !1);
        }
        function f(b) {
            switch (b.keyCode) {
              case a.ui.keyCode.ENTER:
              case a.ui.keyCode.UP:
              case a.ui.keyCode.DOWN:
                return !1;
            }
            i = new Date(), setTimeout(e, 1e3);
        }
        function g(a) {
            var b = h.slider("option", "min"), c = h.slider("option", "max");
            return 100 * (a - b) / (c - b);
        }
        b = a.extend({
            animate: "fast",
            input: "value",
            value: 0,
            percent_default: 50
        }, b);
        var h = this, i = !1, j = 100 * b.value / b.max, k = a('<div class="ui-progress"/>'), l = "value" === b.input ? b.value : j, m = a("input[type=text]").filter(function() {
            return a(this).data("forslider") === h[0].id;
        });
        return j > 100 && (j = 100), k.css("width", j + "%"), this.slider(b).on("slide", function(a, c) {
            var d = g(c.value), e = "value" === b.input ? c.value : d;
            k.css("width", d + "%"), m.val(e);
        }).prepend(k), m.val(l), m.on("blur", c).on("keydown", d).on("keyup", f), this;
    };
});
define('discover/View/Sidebar/Menu/Color',[ "jquery", "discover/coordinator", "discover/View/Sidebar/Menu", "hgn!templates/discover/color", "discover/Model/Filters", "utils/colors", "jquery-plugins/be/fancyslider" ], function(a, b, c, d, e, f) {
    "use strict";
    var g, h = 20;
    return g = c.extend({
        hex: null,
        range: null,
        $confirmation: null,
        init: function() {
            this._super.apply(this, arguments), this.hex = e.get("color_hex"), this.range = e.get("color_range") || h;
        },
        search: function() {
            e.change({
                color_hex: this.hex,
                color_range: this.range
            }), this.hide(!0);
        },
        rendered: function() {
            this._super();
            var c = this, d = this.$view.find(".hex"), e = this.$view.find(".variance"), g = this.$view.find(".swatch"), i = this.$view.find(".variance-input"), j = this.$confirmation = this.$view.find(".search-option-confirm");
            this.$view.addClass("color-popup"), e.attr("id", "sidebar-color-variance"), i.data("forslider", "sidebar-color-variance"), 
            this.$view.on("click", ".color", function() {
                e.slider("value", h).trigger("slide", [ {
                    value: h
                } ]), c.range = h, c.hex = f.checkHex(a(this).css("background-color"), !0), c.search(), 
                d.html("#" + c.hex), g.css("background-color", "#" + c.hex), j.hasClass("hide") && c._toggleVariance(!0);
            }), e.fancyslider({
                max: 40,
                min: 0,
                value: this.range,
                step: 2,
                input: "percentage"
            }).on("slidestop", function(a, b) {
                c.range = b.value, c.search();
            }), this.hex && this._toggleVariance(!0), this.listenTo(b, "crumbs:removeall", this._deselectColor).listenTo(b, "crumbs:remove", function(a) {
                a.id === Number(c.hex) && c._deselectColor();
            });
        },
        _deselectColor: function() {
            this.hex = null, this.range = h, this._toggleVariance(!1);
        },
        _toggleVariance: function(a) {
            this.$confirmation.toggleClass("hide", !a), this.$view.toggleClass("search-option-no-confirm", !a), 
            this.position();
        },
        templateData: function(a) {
            return {
                content: d(a)
            };
        }
    });
});
define('discover/View/Sidebar/Menu/Clients',[ "discover/View/Sidebar/Menu/Autoselect", "page_constants" ], function(a, b) {
    "use strict";
    var c = a.extend({
        save: function(a) {
            return b.CLIENTS = a;
        }
    }, {
        TITLE: b.FILTER_HEADERS.CLIENTS,
        TYPE: b.FILTER_KEY_CLIENTS,
        LIMIT: b.FILTER_LIMIT,
        LIMIT_MESSAGE: b.FILTER_LIMIT_MESSAGES.CLIENTS
    });
    return c;
});

define("vendor/require/hgn!templates/lib/_savingSpinner", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"js-spin label-spin\"></div>");t.b("\n" + i);t.b("<span class=\"js-spin-label-saving label-spin-status label-spin-status-saving hide\">");if(t.s(t.f("translate",c,p,1),c,p,0,136,166,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("form_template_saving|Saving...");});c.pop();}t.b("</span>");t.b("\n" + i);t.b("<span class=\"js-spin-label-saved label-spin-status label-spin-status-saved beicons-pre beicons-pre-check-circle hide\">");if(t.s(t.f("translate",c,p,1),c,p,0,320,345,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("form_template_saved|Saved");});c.pop();}t.b("</span>");t.b("\n" + i);t.b("<span class=\"js-spin-label-error label-spin-status label-spin-status-error beicons-pre beicons-pre-x-circle hide\">");if(t.s(t.f("translate",c,p,1),c,p,0,495,558,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("form_template_error_saving|Error saving: please try again later");});c.pop();}t.b("</span>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"js-spin label-spin\"></div>\n<span class=\"js-spin-label-saving label-spin-status label-spin-status-saving hide\">{{#translate}}form_template_saving|Saving...{{/translate}}</span>\n<span class=\"js-spin-label-saved label-spin-status label-spin-status-saved beicons-pre beicons-pre-check-circle hide\">{{#translate}}form_template_saved|Saved{{/translate}}</span>\n<span class=\"js-spin-label-error label-spin-status label-spin-status-error beicons-pre beicons-pre-x-circle hide\">{{#translate}}form_template_error_saving|Error saving: please try again later{{/translate}}</span>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/form/_checkbox", ["hogan", "vendor/require/hgn!templates/lib/_savingSpinner"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"form-item form-item-checkbox");if(t.s(t.f("containerClasses",c,p,1),c,p,0,61,67,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" ");t.b(t.v(t.d(".",c,p,0)));});c.pop();}t.b("\" id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("-container\">");t.b("\n" + i);t.b("  <label for=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" class=\"form-label checkbox\">");t.b("\n" + i);t.b("    <input type=\"checkbox\" id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" name=\"");t.b(t.v(t.f("name",c,p,0)));if(!t.s(t.f("name",c,p,1),c,p,1,0,0,"")){t.b(t.v(t.f("id",c,p,0)));};t.b("\" class=\"form-checkbox");if(t.s(t.f("classes",c,p,1),c,p,0,275,281,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" ");t.b(t.v(t.d(".",c,p,0)));});c.pop();}if(t.s(t.f("validate",c,p,1),c,p,0,306,329,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" validate[");t.b(t.v(t.f("validate",c,p,0)));t.b("]");});c.pop();}t.b("\" value=\"");t.b(t.v(t.f("value",c,p,0)));t.b("\"");if(t.s(t.f("checked",c,p,1),c,p,0,373,381,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" checked");});c.pop();}if(t.s(t.f("disabled",c,p,1),c,p,0,406,415,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" disabled");});c.pop();}if(t.s(t.f("validate",c,p,1),c,p,0,441,470,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" data-validate=\"");t.b(t.v(t.f("validate",c,p,0)));t.b("\"");});c.pop();}t.b(">");t.b("\n" + i);t.b("    <div class=\"checkbox-checkmark\"></div>");t.b("\n" + i);t.b("    ");t.b(t.t(t.f("label",c,p,0)));if(t.s(t.f("saving_spinner",c,p,1),c,p,0,562,586,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_savingSpinner0",c,p,""));});c.pop();}t.b("\n" + i);t.b("  </label>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<lib/_savingSpinner0":{name:"lib/_savingSpinner", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"form-item form-item-checkbox{{#containerClasses}} {{.}}{{/containerClasses}}\" id=\"{{id}}-container\">\n  <label for=\"{{id}}\" class=\"form-label checkbox\">\n    <input type=\"checkbox\" id=\"{{id}}\" name=\"{{name}}{{^name}}{{id}}{{/name}}\" class=\"form-checkbox{{#classes}} {{.}}{{/classes}}{{#validate}} validate[{{validate}}]{{/validate}}\" value=\"{{value}}\"{{#checked}} checked{{/checked}}{{#disabled}} disabled{{/disabled}}{{#validate}} data-validate=\"{{validate}}\"{{/validate}}>\n    <div class=\"checkbox-checkmark\"></div>\n    {{{label}}}{{#saving_spinner}}{{> lib/_savingSpinner}}{{/saving_spinner}}\n  </label>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_savingSpinner": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/discover/creative-rank", ["hogan", "vendor/require/hgn!templates/form/_checkbox"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<form class=\"creative-rank\">");t.b("\n" + i);if(t.s(t.f("options",c,p,1),c,p,0,41,61,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<form/_checkbox0",c,p,""));});c.pop();}t.b("</form>");t.b("\n");return t.fl(); },partials: {"<form/_checkbox0":{name:"form/_checkbox", partials: {}, subs: {  }}}, subs: {  }}, "<form class=\"creative-rank\">\n{{#options}}{{> form/_checkbox}}{{/options}}\n</form>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "form/_checkbox": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('discover/View/Sidebar/Menu/Rank',[ "page_constants", "discover/coordinator", "discover/Model/Filters", "discover/View/Sidebar/Menu", "hgn!templates/discover/creative-rank" ], function(a, b, c, d, e) {
    "use strict";
    return d.extend({
        templateData: function() {
            return {
                title: a.FILTER_HEADERS.RANKS,
                classes: [ "talent-search-rank-popup" ],
                content: e({
                    options: a.RANKS
                })
            };
        },
        rendered: function() {
            var d = this.$view.find("input");
            d.on("change", function() {
                var b = d.filter(":checked").toArray(), e = b.map(function(a) {
                    return a.value;
                }).join("|");
                c.change(a.FILTER_KEY_RANK, e);
            }.bind(this)), this.listenTo(b, "crumbs:remove", function(b) {
                b.key === a.FILTER_KEY_RANK && this._uncheckAll();
            }), this.listenTo(b, "crumbs:removeall", this._uncheckAll), this._super();
        },
        _uncheckAll: function() {
            this.$view.find("input").changeInput("uncheck");
        },
        position: function() {
            this._super();
        }
    });
});
define('discover/View/Sidebar/Menu/Awards',[ "discover/View/Sidebar/Menu/Autoselect", "page_constants" ], function(a, b) {
    "use strict";
    return a.extend({
        save: function(a) {
            return b.AWARDS = a;
        }
    }, {
        TITLE: b.FILTER_HEADERS.AWARDS,
        TYPE: b.FILTER_KEY_AWARDS,
        ENDPOINT_TYPE: b.FILTER_AWARDS_ENDPOINT_TYPE,
        LIMIT: b.FILTER_LIMIT,
        LIMIT_MESSAGE: b.FILTER_LIMIT_MESSAGES.AWARDS
    });
});
define('discover/View/Sidebar/Fields',[ "nbd/View/Element", "discover/Model/Filters" ], function(a, b) {
    "use strict";
    var c = a.extend({
        init: function(a) {
            this._super.apply(this, arguments), this.$view = a, b.on("field", function(a) {
                this.$view.toggleClass("menu-mode", !!a);
            }, this), this.rendered();
        },
        destroy: function() {
            b.off(null, null, this), this._super();
        },
        rendered: function() {
            this.$view.toggleClass("menu-mode", !!b.get("field")).on("click", ".list-header", this.toggle.bind(this)), 
            this.hide();
        },
        show: function() {
            return this.$view && this.$view.removeClass("menu-closed");
        },
        hide: function() {
            return this.$view && this.$view.addClass("menu-closed");
        },
        toggle: function() {
            return this.$view && this.$view.toggleClass("menu-closed");
        }
    });
    return c;
});
define('discover/View/Sidebar/Search',[ "jquery", "nbd/View", "nbd/util/async", "lib/autosource", "discover/Model/Filters", "hgn!templates/discover/suggest-item", "page_constants", "jquery-plugins/be/autosuggest" ], function(a, b, c, d, e, f, g) {
    "use strict";
    var h = a.map(g.FIELDS, function(a, b) {
        return {
            id: b,
            value: a,
            type: "field"
        };
    }), i = b.extend({
        labels: {
            field: "Creative Fields"
        },
        init: function(a) {
            this.$view = a, this.rendered();
        },
        template: f,
        templater: function() {
            var b = null, d = function() {
                b = null;
            }, e = function(e) {
                return null === b && c(d), b !== e.type && (e = a.extend({
                    divider: !0,
                    typelabel: this.labels[e.type]
                }, e), b = e.type), this.template(e);
            };
            return e;
        },
        rendered: function() {
            function b(a) {
                c.autosuggest(a === g.CONTENT_KEY_PROJECTS ? "enable" : "disable");
            }
            this.$view.addClass("ui-front");
            var c = this.$view.find("#search"), f = d({
                maxLocal: 5,
                caseInsensitive: !0
            }).addLocal(h), i = function(b, c) {
                var d = c.item, f = a(this);
                if (d) return e.change(d.type, d.id || d.value), "search" !== d.type ? (f.val(""), 
                !1) : void f.autosuggest("close");
            };
            c.autosuggest({
                source: f,
                position: {
                    at: "left+1 center"
                },
                itemTemplate: this.templater().bind(this),
                width: c.outerWidth() - 2,
                minLength: 2
            }).on({
                autosuggestselect: i,
                keydown: function(b) {
                    return b.isDefaultPrevented() || b.keyCode !== a.ui.keyCode.ENTER && b.keyCode !== a.ui.keyCode.NUMPAD_ENTER ? void 0 : i.call(this, b, {
                        item: {
                            type: "search",
                            value: this.value
                        }
                    });
                }
            }), b(e.get("content")), e.on("content", b);
        }
    });
    return i;
});
$.fn.readMoreBox = function(a) {
    var b = this, c = b.height(), d = b.css("max-height", "").height("auto").height(), e = !1;
    b.height(c), a.hide(), c !== d && (c > d ? b.height(d) : a.show().find(".fake-link").on("click", function() {
        var f = c, g = "remove";
        e || (f = d, g = "add"), b.animate({
            height: f
        }), a[g + "Class"]("viewing-all"), e = !e;
    }));
};
define("jquery-plugins/plugins/jquery.readmorebox", function(){});

define('discover/View/Sidebar/Tag',[ "jquery", "nbd/View/Element", "discover/Model/Filters", "page_constants", "jquery-plugins/plugins/jquery.readmorebox" ], function(a, b, c, d) {
    "use strict";
    var e = b.extend({
        init: function() {
            this._super.apply(this, arguments), this.rendered();
        },
        rendered: function() {
            this.$list = this.$parent.find("#object-tags"), this.$list_all = this.$parent.find("#object-tags-see-all"), 
            this.$count = this.$parent.find(".tags-number"), this.$list.on("click", ".object-tag", function() {
                var b, d = c.get("user_tags"), e = d ? d.toString().split("|") : [], f = a(this).attr("value"), g = e.indexOf(f), h = -1 === g;
                h ? e.push(f) : e.splice(g, 1), b = e && e.length ? e.join("|") : void 0, c.set("user_tags", b);
            }), c.on("user_tags", function(a) {
                a = a || "";
                var b = a.toString().split("|");
                this.$list.find(".selected").removeClass("selected"), b.forEach(function(a) {
                    this.$list.find("[value=" + a + "]").addClass("selected");
                }.bind(this));
            }, this);
        },
        destroy: function() {
            c.off(this), this._super();
        },
        empty: function() {
            this.$list.empty(), this.$list_all.hide();
        },
        hide: function() {
            this.$parent.hide(), this.$list_all.hide();
        },
        show: function() {
            this.$parent.show(), this.$list_all.show();
        },
        populate: function(b) {
            var e = Object.keys(b).length, f = c.get("user_tags") ? c.get("user_tags").toString() : "";
            return e ? (this.show(), a.each(b, function(b, c) {
                d.TAGS[b] = c;
                var e = a('<div class="object-tag left" value="' + b + '">' + c.n + "</div>");
                -1 !== f.indexOf(b) && e.addClass("selected"), this.$list.append(e);
            }.bind(this)), this.$count.html(e), this.$list.css({
                maxHeight: "125px",
                height: ""
            }), this.$list_all.find(".fake-link").off("click"), void this.$list.readMoreBox(this.$list_all)) : void this.hide();
        }
    });
    return e;
});
define('discover/View/Sidebar',[ "jquery", "nbd/util/diff", "nbd/View/Element", "be/xhr", "discover/View/Sidebar/Menu/School", "discover/View/Sidebar/Menu/Tool", "discover/View/Sidebar/Menu/Color", "discover/View/Sidebar/Menu/Clients", "discover/View/Sidebar/Menu/Rank", "discover/View/Sidebar/Menu/Awards", "discover/View/Sidebar/Fields", "discover/View/Sidebar/Search", "discover/View/Sidebar/Tag", "discover/Model/Filters", "page_constants", "jquery-plugins/plugins/jquery.custominput" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    "use strict";
    var p = c.extend({
        template: a,
        lastTags: !1,
        getTags: function() {
            var c = n.get("field"), e = n.get("content"), f = o.TOPTAGS.CATEGORIES[e], g = o.TOPTAGS.ENTITIES[e], h = {
                entity: g,
                category: f
            };
            return this.tags.empty(), c || e === o.CONTENT_KEY_WIPS ? (c && (h.field = c), void ((!this.lastTags || Object.keys(b(h, this.lastTags)).length) && (this.lastTags = a.extend({}, h), 
            d({
                url: "/tags/getTopTags",
                data: h
            }).then(function(a) {
                return a.json && "object" == typeof a.json ? void this.tags.populate(a.json) : void this.tags.hide();
            }.bind(this))))) : (this.lastTags = {}, void this.tags.hide());
        },
        rendered: function() {
            var a, b, c, d, o, p, q, r, s = this.$parent.find("#sidebar-fields"), t = this.$parent.find(".filter-schools").parent(), u = this.$parent.find(".filter-tools").parent(), v = this.$parent.find(".filter-color").parent(), w = this.$parent.find(".filter-index").parent(), x = this.$parent.find(".js-ts-mode-toggle"), y = this.$parent.find(".filter-clients").parent(), z = this.$parent.find(".filter-awards").parent(), A = this.$parent.find("#related-tags"), B = this.$parent.find("#search-container");
            c = new e(t), t.on("click", c.toggle.bind(c)), d = new f(u), u.on("click", d.toggle.bind(d)), 
            o = new g(v), v.on("click", o.toggle.bind(o)), p = new i(w), w.on("click", p.toggle.bind(p)), 
            q = new h(y), y.on("click", q.toggle.bind(q)), r = new j(z), z.on("click", r.toggle.bind(r)), 
            a = new k(s), b = new l(B), this.tags = new m(A), n.on("field content", this.getTags, this), 
            x.on("change", this.tsToggle), this.$parent.find("input[type=checkbox]").customInput(), 
            this.getTags();
        },
        tsToggle: function() {
            var b = a(this).is(":checked") ? 1 : 0;
            d({
                type: "POST",
                url: "/user/talent_search_toggle",
                data: {
                    on: b
                }
            }).then(function() {
                var a = "/search";
                window.location.pathname !== a || window.location.search ? window.location.href = a : window.location.reload();
            });
        },
        destroy: function() {
            n.off(null, null, this), this._super();
        }
    });
    return p;
});
define('discover/sidebar',[ "jquery", "page_constants", "nbd/util/async", "nbd/util/media", "discover/Model/Filters", "discover/View/Sidebar" ], function(a, b, c, d, e, f) {
    "use strict";
    var g = {
        init: function(a) {
            var g, h = a.find("#filters"), i = this.sticky.bind(this, a), j = a.find(".js-discover-search");
            i(), d.on("all", i), e.on("search", j.val.bind(j)), e.on([ b.FILTER_KEY_SEARCH, b.FILTER_KEY_USER_TAGS, b.FILTER_KEY_SCHOOLS, b.FILTER_KEY_TOOLS, b.FILTER_KEY_CLIENTS, b.FILTER_KEY_COLOR_HEX ].join(" "), function() {
                c(i);
            }, this), g = new f(h), g.rendered();
        },
        destroy: function() {
            e.off(null, null, this);
        },
        sticky: function(b) {
            var c = b.find(".js-sticky-filters"), d = c.length ? c : b.find("#sidebar-fixed"), e = a(".js-nav-primary").height() + a("#sorts-container").height() + 20;
            return d.data("sticky") ? (d.data("sticky").topSpacing = e, void d.sticky("update")) : void d.sticky({
                wrapperClassName: "sticky",
                topSpacing: e
            }).parent().css("height", "");
        }
    };
    return g;
});
define('discover/lib/url',[ "jquery", "nbd/util/async", "nbd/util/diff", "nbd/util/deparam", "discover/Model/Filters", "discover/lib/correction", "be/history" ], function(a, b, c, d, e, f, g) {
    "use strict";
    function h(b) {
        var c = "/search?", d = {};
        return Object.keys(b).map(function(a) {
            d[a] = encodeURIComponent(b[a]);
        }), c += a.param(d);
    }
    function i(a) {
        if (a.originalEvent) {
            var b = g.getState();
            b && (b.filters || !Object.keys(b).length) && (e.rectify(b.filters && b.filters.content), 
            e.DEFAULTS = b.defaults || e.DEFAULTS, e.reset(), f.clear(b.changed), e.change(b.filters));
        }
    }
    function j() {
        j.count = j.count || 0, j.count++ || b(l);
    }
    var k, l, m = new RegExp("(?:" + window.location.pathname + "|search)\\?([^#]*)");
    return k = function(a) {
        if (this.pathname === window.location.pathname) {
            var b = m.exec(decodeURIComponent(this.href));
            b && (a.preventDefault(), b = d(b[1]), e.change(b));
        }
    }, l = function() {
        var a, b = g.getState().filters || d(window.location.search.replace(/^\?/, "")), i = e.getTruthyData();
        Object.keys(c(i, b)).length && (a = decodeURIComponent(h(i)), g.pushState({
            filters: i,
            changed: f.changed(),
            defaults: e.DEFAULTS
        }, document.title, a)), j.count = 0;
    }, {
        init: function(b) {
            a(window).on("popstate", i), a(document.body).on("click", b || "", k), e.on("all", j);
        },
        destroy: function() {
            a(window).off(i), a(document.body).off(k), e.off(null, j);
        }
    };
});
define('be/onhistory',[ "be/history", "lib/gaq" ], function(a, b) {
    "use strict";
    return function(c, d) {
        var e, f;
        return e = function(e) {
            var f = "function" == typeof c ? c.call(this) : c;
            b.page(e), a[(d ? "replace" : "push") + "State"](f || {}, document.title, e);
        }, f = function(a) {
            if (!(0 !== a.button || a.altKey || a.ctrlKey || a.metaKey || a.shiftKey)) {
                var b = a.currentTarget.href;
                window.location.href !== b && (a.preventDefault(), e.call(this, b));
            }
        }, f.submit = e, f;
    };
});

define('vendor/require/css!styles/jquery/plugins/jquery.fancybox',[],function(){});
!function(a, b, c) {
    var d = c(a), e = c(b), f = c.fancybox = function() {
        f.open.apply(this, arguments);
    }, g = !1, h = navigator.userAgent.match(/msie/i), i = null;
    c.extend(f, {
        version: "2.0.4",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 200,
            minHeight: 200,
            maxWidth: 9999,
            maxHeight: 9999,
            autoSize: !0,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: .5,
            fixed: !1 in b.documentElement || b,
            scrolling: "auto",
            wrapCSS: "fancybox-default",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3e3,
            modal: !1,
            loop: !0,
            ajax: {},
            keys: {
                next: [ 13, 32, 34, 39, 40 ],
                prev: [ 8, 33, 37, 38 ],
                close: [ 27 ]
            },
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe class="fancybox-iframe" name="fancybox-frame{rnd}" frameborder="0" hspace="0" ' + (h ? 'allowtransparency="true""' : "") + ' scrolling="{scrolling}" src="{href}"></iframe>',
                swf: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="wmode" value="transparent" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{href}" /><embed src="{href}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="100%" height="100%" wmode="transparent"></embed></object>',
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<div title="Close" class="fancybox-item fancybox-close"></div>',
                next: '<a title="Next" class="fancybox-item fancybox-next"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-item fancybox-prev"><span></span></a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 300,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 300,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: {
                    speedIn: 0,
                    speedOut: 300,
                    opacity: .8,
                    css: {
                        cursor: "pointer"
                    },
                    closeClick: !0
                },
                title: {
                    type: "float"
                }
            },
            onCancel: c.noop,
            beforeLoad: c.noop,
            afterLoad: c.noop,
            beforeShow: c.noop,
            afterShow: c.noop,
            beforeClose: c.noop,
            afterClose: c.noop
        },
        group: {},
        opts: {},
        coming: null,
        current: null,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function(a, b) {
            c.isArray(a) || (a = [ a ]), a.length && (f.close(!0), f.opts = c.extend(!0, {}, f.defaults, b), 
            f.group = a, f._start(f.opts.index || 0));
        },
        cancel: function() {
            f.coming && !1 === f.trigger("onCancel") || (f.coming = null, f.hideLoading(), f.ajaxLoad && f.ajaxLoad.abort(), 
            f.ajaxLoad = null, f.imgPreload && (f.imgPreload.onload = f.imgPreload.onabort = f.imgPreload.onerror = null));
        },
        close: function(a) {
            f.cancel(), f.current && !1 !== f.trigger("beforeClose") && (f.unbindEvents(), !f.isOpen || a && a[0] === !0 ? (c(".fancybox-wrap").stop().trigger("onReset").remove(), 
            f._afterZoomOut()) : (f.isOpen = f.isOpened = !1, c(".fancybox-item").remove(), 
            f.wrap.stop(!0).removeClass("fancybox-opened"), f.inner.css("overflow", "hidden"), 
            f.transitions[f.current.closeMethod]()));
        },
        play: function(a) {
            var b = function() {
                clearTimeout(f.player.timer);
            }, d = function() {
                b(), f.current && f.player.isActive && (f.player.timer = setTimeout(f.next, f.current.playSpeed));
            }, e = function() {
                b(), c("body").unbind(".player"), f.player.isActive = !1, f.trigger("onPlayEnd");
            }, g = function() {
                f.current && (f.current.loop || f.current.index < f.group.length - 1) && (f.player.isActive = !0, 
                c("body").bind({
                    "afterShow.player onUpdate.player": d,
                    "onCancel.player beforeClose.player": e,
                    "beforeLoad.player": b
                }), d(), f.trigger("onPlayStart"));
            };
            f.player.isActive || a && a[0] === !1 ? e() : g();
        },
        next: function() {
            f.current && f.jumpto(f.current.index + 1);
        },
        prev: function() {
            f.current && f.jumpto(f.current.index - 1);
        },
        jumpto: function(a) {
            f.current && (a = parseInt(a, 10), f.group.length > 1 && f.current.loop && (a >= f.group.length ? a = 0 : 0 > a && (a = f.group.length - 1)), 
            "undefined" != typeof f.group[a] && (f.cancel(), f._start(a)));
        },
        reposition: function(a) {
            f.isOpen && f.wrap.css(f._getPosition(a));
        },
        update: function() {
            f.isOpen && (g || (i = setInterval(function() {
                g && (g = !1, clearTimeout(i), f.current && (f.current.autoSize && (f.inner.height("auto"), 
                f.current.height = f.inner.height()), f._setDimension(), f.current.canGrow && f.inner.height("auto"), 
                f.reposition(), f.trigger("onUpdate")));
            }, 100)), g = !0);
        },
        toggle: function() {
            f.isOpen && (f.current.fitToView = !f.current.fitToView, f.update());
        },
        hideLoading: function() {
            c("#fancybox-loading").remove();
        },
        showLoading: function() {
            f.hideLoading(), c('<div id="fancybox-loading"></div>').click(f.cancel).appendTo("body");
        },
        getViewport: function() {
            return {
                x: d.scrollLeft(),
                y: d.scrollTop(),
                w: d.width(),
                h: d.height()
            };
        },
        unbindEvents: function() {
            f.wrap && f.wrap.unbind(".fb"), e.unbind(".fb"), d.unbind(".fb");
        },
        bindEvents: function() {
            var a = f.current, b = a.keys;
            a && (d.bind("resize.fb, orientationchange.fb", f.update), b && e.bind("keydown.fb", function(a) {
                var d;
                a.ctrlKey || a.altKey || a.shiftKey || a.metaKey || !(c.inArray(a.target.tagName.toLowerCase(), [ "input", "textarea", "select", "button" ]) < 0) || (d = a.keyCode, 
                c.inArray(d, b.close) > -1 ? (f.close(), a.preventDefault()) : c.inArray(d, b.next) > -1 ? (f.next(), 
                a.preventDefault()) : c.inArray(d, b.prev) > -1 && (f.prev(), a.preventDefault()));
            }), c.fn.mousewheel && a.mouseWheel && f.group.length > 1 && f.wrap.bind("mousewheel.fb", function(a, b) {
                var d = c(a.target).get(0);
                (0 === d.clientHeight || d.scrollHeight === d.clientHeight) && (a.preventDefault(), 
                f[b > 0 ? "prev" : "next"]());
            }));
        },
        trigger: function(a) {
            var b, d = f[c.inArray(a, [ "onCancel", "beforeLoad", "afterLoad" ]) > -1 ? "coming" : "current"];
            if (d) {
                if (c.isFunction(d[a]) && (b = d[a].apply(d, Array.prototype.slice.call(arguments, 1))), 
                b === !1) return !1;
                d.helpers && c.each(d.helpers, function(b, e) {
                    e && "undefined" != typeof f.helpers[b] && c.isFunction(f.helpers[b][a]) && f.helpers[b][a](e, d);
                }), c.event.trigger(a + ".fb");
            }
        },
        isImage: function(a) {
            return a && a.match(/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i);
        },
        isSWF: function(a) {
            return a && a.match(/\.(swf)(.*)?$/i);
        },
        _start: function(a) {
            var b, d, e, g, h = {}, i = f.group[a] || null;
            return "object" == typeof i && (i.nodeType || i instanceof c) && (b = !0, c.metadata && (h = c(i).metadata())), 
            h = c.extend(!0, {}, f.opts, {
                index: a,
                element: i
            }, c.isPlainObject(i) ? i : h), c.each([ "href", "title", "content", "type" ], function(a, d) {
                h[d] = f.opts[d] || b && c(i).attr(d) || h[d] || null;
            }), "number" == typeof h.margin && (h.margin = [ h.margin, h.margin, h.margin, h.margin ]), 
            h.modal && c.extend(!0, h, {
                closeBtn: !1,
                closeClick: !1,
                nextClick: !1,
                arrows: !1,
                mouseWheel: !1,
                keys: null,
                helpers: {
                    overlay: {
                        css: {
                            cursor: "auto"
                        },
                        closeClick: !1
                    }
                }
            }), f.coming = h, !1 === f.trigger("beforeLoad") ? void (f.coming = null) : (e = h.type, 
            d = h.href, e || (b && (g = c(i).data("fancybox-type"), !g && i.className && (g = i.className.match(/fancybox\.(\w+)/), 
            e = g ? g[1] : null)), !e && d && (f.isImage(d) ? e = "image" : f.isSWF(d) ? e = "swf" : d.match(/^#/) && (e = "inline")), 
            e || (e = b ? "inline" : "html"), h.type = e), "inline" === e || "html" === e ? (h.content = h.content || ("inline" === e && d ? c(d) : i), 
            h.content.length || (e = null)) : (h.href = d || i, h.href || (e = null)), h.group = f.group, 
            void ("image" === e ? f._loadImage() : "ajax" === e ? f._loadAjax() : e ? f._afterLoad() : f._error("type")));
        },
        _error: function(a) {
            c.extend(f.coming, {
                type: "html",
                autoSize: !0,
                minHeight: "0",
                hasError: a,
                content: f.coming.tpl.error
            }), f._afterLoad();
        },
        _loadImage: function() {
            f.imgPreload = new Image(), f.imgPreload.onload = function() {
                this.onload = this.onerror = null, f.coming.width = this.width, f.coming.height = this.height, 
                f._afterLoad();
            }, f.imgPreload.onerror = function() {
                this.onload = this.onerror = null, f._error("image");
            }, f.imgPreload.src = f.coming.href, f.imgPreload.complete || f.showLoading();
        },
        _loadAjax: function() {
            f.showLoading(), f.ajaxLoad = c.ajax(c.extend({}, f.coming.ajax, {
                url: f.coming.href,
                error: function(a, b) {
                    "abort" !== b ? f._error("ajax", a) : f.hideLoading();
                },
                success: function(a, b) {
                    "success" === b && (f.coming.content = a, f._afterLoad());
                }
            }));
        },
        _preload: function() {
            var a = f.group, b = f.current.index, d = function(a) {
                a && f.isImage(a) && (new Image().src = a);
            };
            a.length > 1 && (d(c(a[b + 1] || a[0]).attr("href")), d(c(a[b - 1] || a[a.length - 1]).attr("href")));
        },
        _afterLoad: function() {
            return f.hideLoading(), f.coming && !1 !== f.trigger("afterLoad", f.current) ? (f.isOpened ? (c(".fancybox-item").remove(), 
            f.wrap.stop(!0).removeClass("fancybox-opened"), f.inner.css("overflow", "hidden"), 
            f.transitions[f.current.prevMethod]()) : (c(".fancybox-wrap").stop().trigger("onReset").remove(), 
            f.trigger("afterClose")), f.unbindEvents(), f.isOpen = !1, f.current = f.coming, 
            f.coming = !1, f.wrap = c(f.current.tpl.wrap).addClass("fancybox-tmp " + f.current.wrapCSS).appendTo("body"), 
            f.outer = c(".fancybox-outer", f.wrap).css("padding", f.current.padding + "px"), 
            f.inner = c(".fancybox-inner", f.wrap), f._setContent(), f.trigger("beforeShow"), 
            f._setDimension(), f.wrap.hide().removeClass("fancybox-tmp"), f.bindEvents(), f._preload(), 
            void f.transitions[f.isOpened ? f.current.nextMethod : f.current.openMethod]()) : void (f.coming = !1);
        },
        _setContent: function() {
            var a, b, d = f.current, e = d.type;
            switch (e) {
              case "inline":
              case "ajax":
              case "html":
                a = d.content, "inline" === e && a instanceof c && (a = a.show().detach(), a.parent().hasClass("fancybox-inner") && a.parents(".fancybox-wrap").trigger("onReset").remove(), 
                c(f.wrap).bind("onReset", function() {
                    a.appendTo("body").hide();
                })), d.autoSize && (b = c('<div class="fancybox-tmp"></div>').appendTo(c("body")).append(a), 
                d.width = b.outerWidth(), d.height = b.outerHeight(!0), a = b.contents().detach(), 
                b.remove());
                break;

              case "image":
                a = d.tpl.image.replace("{href}", d.href), d.aspectRatio = !0;
                break;

              case "swf":
                a = d.tpl.swf.replace(/\{width\}/g, d.width).replace(/\{height\}/g, d.height).replace(/\{href\}/g, d.href);
                break;

              case "iframe":
                a = d.tpl.iframe.replace("{href}", d.href).replace("{scrolling}", d.scrolling).replace("{rnd}", new Date().getTime());
            }
            c.inArray(e, [ "image", "swf", "iframe" ]) > -1 && (d.autoSize = !1, d.scrolling = !1), 
            f.inner.append(a);
        },
        _setDimension: function() {
            var a, b, d = f.wrap, e = f.outer, g = f.inner, h = f.current, i = f.getViewport(), j = h.margin, k = 2 * h.padding, l = h.width + k, m = h.height + k, n = h.width / h.height, o = h.maxWidth, p = h.maxHeight, q = h.minWidth, r = h.minHeight;
            if (i.w -= j[1] + j[3], i.h -= j[0] + j[2], l.toString().indexOf("%") > -1 && (l = i.w * parseFloat(l) / 100), 
            m.toString().indexOf("%") > -1 && (m = i.h * parseFloat(m) / 100), h.fitToView && (o = Math.min(i.w, o), 
            p = Math.min(i.h, p)), q = Math.min(l, q), r = Math.min(l, r), o = Math.max(q, o), 
            p = Math.max(r, p), h.aspectRatio ? (l > o && (l = o, m = (l - k) / n + k), m > p && (m = p, 
            l = (m - k) * n + k), q > l && (l = q, m = (l - k) / n + k), r > m && (m = r, l = (m - k) * n + k)) : (l = Math.max(q, Math.min(l, o)), 
            m = Math.max(r, Math.min(m, p))), l = Math.round(l), m = Math.round(m), c(d.add(e).add(g)).width("auto").height("auto"), 
            g.width(l - k).height(m - k), d.width(l), a = d.height(), l > o || a > p) for (;(l > o || a > p) && l > q && a > r; ) m -= 10, 
            h.aspectRatio ? (l = Math.round((m - k) * n + k), q > l && (l = q, m = (l - k) / n + k)) : l -= 10, 
            g.width(l - k).height(m - k), d.width(l), a = d.height();
            h.dim = {
                width: l,
                height: a
            }, h.canGrow = h.autoSize && m > r && p > m, h.canShrink = !1, h.canExpand = !1, 
            l - k < h.width || m - k < h.height ? h.canExpand = !0 : (l > i.w || a > i.h) && l > q && m > r && (h.canShrink = !0), 
            b = a - k, f.innerSpace = b - g.height(), f.outerSpace = b - e.height();
        },
        _getPosition: function(a) {
            var b = f.current, c = f.getViewport(), d = b.margin, e = f.wrap.width() + d[1] + d[3], g = f.wrap.height() + d[0] + d[2], h = {
                position: "absolute",
                top: d[0] + c.y,
                left: d[3] + c.x
            };
            return b.fixed && (!a || a[0] === !1) && g <= c.h && e <= c.w && (h = {
                position: "fixed",
                top: d[0],
                left: d[3]
            }), h.top = Math.ceil(Math.max(h.top, h.top + (c.h - g) * b.topRatio)) + "px", h.left = Math.ceil(Math.max(h.left, h.left + .5 * (c.w - e))) + "px", 
            h;
        },
        _afterZoomIn: function() {
            var a = f.current;
            f.isOpen = f.isOpened = !0, f.wrap.addClass("fancybox-opened").css("overflow", "visible"), 
            f.update(), f.inner.css("overflow", "auto" === a.scrolling ? "auto" : "yes" === a.scrolling ? "scroll" : "hidden"), 
            (a.closeClick || a.nextClick) && f.inner.css("cursor", "pointer").bind("click.fb", a.nextClick ? f.next : f.close), 
            a.closeBtn && c(a.tpl.closeBtn).appendTo(f.wrap).bind("click.fb", f.close), a.arrows && f.group.length > 1 && ((a.loop || a.index > 0) && c(a.tpl.prev).appendTo(f.wrap).bind("click.fb", f.prev), 
            (a.loop || a.index < f.group.length - 1) && c(a.tpl.next).appendTo(f.wrap).bind("click.fb", f.next)), 
            f.trigger("afterShow"), f.opts.autoPlay && !f.player.isActive && (f.opts.autoPlay = !1, 
            f.play());
        },
        _afterZoomOut: function() {
            f.trigger("afterClose"), f.wrap.trigger("onReset").remove(), c.extend(f, {
                group: {},
                opts: {},
                current: null,
                isOpened: !1,
                isOpen: !1,
                wrap: null,
                outer: null,
                inner: null
            });
        }
    }), f.transitions = {
        getOrigPosition: function() {
            var a, b, d = f.current.element, e = {}, g = 50, h = 50;
            return d && d.nodeName && c(d).is(":visible") ? (a = c(d).find("img:first"), a.length ? (e = a.offset(), 
            g = a.outerWidth(), h = a.outerHeight()) : e = c(d).offset()) : (b = f.getViewport(), 
            e.top = b.y + .5 * (b.h - h), e.left = b.x + .5 * (b.w - g)), e = {
                top: Math.ceil(e.top) + "px",
                left: Math.ceil(e.left) + "px",
                width: Math.ceil(g) + "px",
                height: Math.ceil(h) + "px"
            };
        },
        step: function(a, b) {
            var c, d, e;
            ("width" === b.prop || "height" === b.prop) && (d = e = Math.ceil(a - 2 * f.current.padding), 
            "height" === b.prop && (c = (a - b.start) / (b.end - b.start), b.start > b.end && (c = 1 - c), 
            d -= f.innerSpace * c, e -= f.outerSpace * c), f.inner[b.prop](d), f.outer[b.prop](e));
        },
        zoomIn: function() {
            var a, b, d = f.wrap, e = f.current, g = e.dim;
            "elastic" === e.openEffect ? (b = c.extend({}, g, f._getPosition(!0)), delete b.position, 
            a = this.getOrigPosition(), e.openOpacity && (a.opacity = 0, b.opacity = 1), d.css(a).show().animate(b, {
                duration: e.openSpeed,
                easing: e.openEasing,
                step: this.step,
                complete: f._afterZoomIn
            })) : (d.css(c.extend({}, g, f._getPosition())), "fade" === e.openEffect ? d.fadeIn(e.openSpeed, f._afterZoomIn) : (d.show(), 
            f._afterZoomIn()));
        },
        zoomOut: function() {
            var a, b = f.wrap, c = f.current;
            "elastic" === c.closeEffect ? ("fixed" === b.css("position") && b.css(f._getPosition(!0)), 
            a = this.getOrigPosition(), c.closeOpacity && (a.opacity = 0), b.animate(a, {
                duration: c.closeSpeed,
                easing: c.closeEasing,
                step: this.step,
                complete: f._afterZoomOut
            })) : b.fadeOut("fade" === c.closeEffect ? c.closeSpeed : 0, f._afterZoomOut);
        },
        changeIn: function() {
            var a, b = f.wrap, c = f.current;
            "elastic" === c.nextEffect ? (a = f._getPosition(!0), a.opacity = 0, a.top = parseInt(a.top, 10) - 200 + "px", 
            b.css(a).show().animate({
                opacity: 1,
                top: "+=200px"
            }, {
                duration: c.nextSpeed,
                complete: f._afterZoomIn
            })) : (b.css(f._getPosition()), "fade" === c.nextEffect ? b.hide().fadeIn(c.nextSpeed, f._afterZoomIn) : (b.show(), 
            f._afterZoomIn()));
        },
        changeOut: function() {
            var a = f.wrap, b = f.current, d = function() {
                c(this).trigger("onReset").remove();
            };
            a.removeClass("fancybox-opened"), "elastic" === b.prevEffect ? a.animate({
                opacity: 0,
                top: "+=200px"
            }, {
                duration: b.prevSpeed,
                complete: d
            }) : a.fadeOut("fade" === b.prevEffect ? b.prevSpeed : 0, d);
        }
    }, f.helpers.overlay = {
        overlay: null,
        update: function() {
            var a, c, f;
            this.overlay.width(0).height(0), h ? (c = Math.max(b.documentElement.scrollWidth, b.body.scrollWidth), 
            f = Math.max(b.documentElement.offsetWidth, b.body.offsetWidth), a = f > c ? d.width() : c) : a = e.width(), 
            this.overlay.width(a).height(e.height());
        },
        beforeShow: function(a) {
            this.overlay || (this.overlay = c('<div id="fancybox-overlay"></div>').css(a.css || {
                background: "black"
            }).appendTo("body"), this.update(), a.closeClick && this.overlay.bind("click.fb", f.close), 
            d.bind("resize.fb", c.proxy(this.update, this)), this.overlay.fadeTo(a.speedIn || "fast", a.opacity || 1));
        },
        onUpdate: function() {
            this.update();
        },
        afterClose: function(a) {
            this.overlay && this.overlay.fadeOut(a.speedOut || "fast", function() {
                c(this).remove();
            }), this.overlay = null;
        }
    }, f.helpers.title = {
        beforeShow: function(a) {
            var b, d = f.current.title;
            d && (b = c('<div class="fancybox-title fancybox-title-' + a.type + '-wrap">' + d + "</div>").appendTo("body"), 
            "float" === a.type && (b.width(b.width()), b.wrapInner('<span class="child"></span>'), 
            f.current.margin[2] += Math.abs(parseInt(b.css("margin-bottom"), 10))), b.appendTo("over" === a.type ? f.inner : "outside" === a.type ? f.wrap : f.outer));
        }
    }, c.fn.fancybox = function(a) {
        function b(a) {
            var b, e, h = [], i = this.rel;
            a.ctrlKey || a.altKey || a.shiftKey || a.metaKey || (a.preventDefault(), e = c(this).data("fancybox-group"), 
            "undefined" != typeof e ? b = e ? "data-fancybox-group" : !1 : i && "" !== i && "nofollow" !== i && (e = i, 
            b = "rel"), b && (h = g.length ? c(g).filter("[" + b + '="' + e + '"]') : c("[" + b + '="' + e + '"]')), 
            h.length ? (d.index = h.index(this), f.open(h.get(), d)) : f.open(this, d));
        }
        var d = a || {}, g = this.selector || "";
        return g ? e.undelegate(g, "click.fb-start").delegate(g, "click.fb-start", b) : c(this).unbind("click.fb-start").bind("click.fb-start", b), 
        this;
    };
}(window, document, jQuery);
define("jquery-plugins/plugins/jquery.fancybox", ["css!styles/jquery/plugins/jquery.fancybox"], function(){});

define('be/trait/popupSession',[ "jquery", "has", "log", "nbd/trait/pubsub", "nbd/util/media", "be/history", "be/onhistory", "be/window", "jquery-plugins/plugins/jquery.fancybox" ], function(a, b, c, d, e, f, g, h) {
    "use strict";
    c = c.get("popupSession");
    var i = function(a) {
        if (!this.singleton || !this.singleton._view) return void this._setEntrance();
        var b = f.get("state");
        b && b[a] ? e.is("desktop") ? this.show(h.getLocation("href")) : h.replaceLocation(h.getLocation("href")) : this.singleton.reset();
    }, j = function(a) {
        var b = {};
        return b[a] = !0, b;
    }, k = a('<div class="blocking-div">'), l = {
        init: function(c) {
            if (this.singleton) return this.onhist;
            var d = g(j.bind(this, this.entity)), h = this, l = !1;
            return this.onhist = function() {
                e.is("desktop") && !b("touch") && (l || h._setEntrance(), d.apply(this, arguments), 
                h.stateChange());
            }, this.singleton = new this.Dialog("object" == typeof c ? c : void 0), this.singleton.on("preload", function() {
                l = !0, k.appendTo(document.body), a.fancybox.showLoading();
            }).on("postload", function() {
                k.remove();
            }).on("exit", function() {
                f.pushState(this.entrance.state, this.entrance.title, this.entrance.url), this.stateChange(), 
                l = !1;
            }, this), this.relay(this.singleton, "dataReceived postload"), this._setEntrance(), 
            this.stateChange = i.bind(this, this.entity), a(window).on("popstate", this.stateChange), 
            a(document.body).on("click", this.selector, this.onhist), this.onhist;
        },
        show: function(a) {
            var b = this;
            return this.trigger("prerender"), this.singleton.close(), this.singleton.open(a).then(function(a) {
                b.trigger("postrender", a);
            }, function(b) {
                b && 404 === b.status ? (f.back(), h.setLocation(a)) : "readyState" in b && 0 === b.readyState || c.error(b);
            });
        },
        destroy: function() {
            this.singleton && this.singleton.destroy(), this.off(), a(document.body).off("click", this.onhist);
        },
        _setEntrance: function() {
            this.entrance = {
                state: f.getState(),
                title: document.title,
                url: h.getLocation("href")
            };
        }
    };
    return a.extend(l, d);
});
define('be/Controller/Dialog/EntityPopup',[ "nbd/trait/promise", "nbd/trait/pubsub", "be/xhr", "be/Controller/Dialog" ], function(a, b, c, d) {
    "use strict";
    function e(b) {
        if (!b.styles) return b;
        var c = b.styles.local || [], d = new a();
        return c = c.filter(function(a) {
            return a;
        }), require(c.map(function(a) {
            return "css!styles/" + a;
        }), d.resolve.bind(null, b), d.reject), d.thenable();
    }
    var f = d.extend({
        prefilter: function(a) {
            return a;
        },
        _initView: function() {
            this._super.apply(this, arguments), this._view && this.listenTo(this._view, "exit", function() {
                this.trigger("exit");
            });
        },
        open: function(a) {
            this.trigger("preload", a);
            var b = c(a).then(this.prefilter).then(e).then(function(a) {
                this._model._data = {}, this._model.set(a), this.trigger("dataReceived", a);
            }.bind(this)).then(this.render.bind(this)), d = this.trigger.bind(this, "postload");
            return b.then(d, d), b;
        },
        close: function() {
            return this.visible() && this._view.hide(!0), this;
        },
        render: function() {
            var a, b;
            return this._view.$view || (a = document.body), b = this._view.render(a), this._view.show(), 
            b;
        },
        reset: function() {
            this.visible() && (this._view.hide(!0), this._view.destroy());
        },
        visible: function() {
            return this._view.$view && this._view.$view.hasClass("shown");
        }
    }).mixin(b);
    return f;
});
define('lib/adobeanalytics',[ "log" ], function(a) {
    "use strict";
    return a = a.get("adobeanalytics"), {
        page: function() {
            if ("undefined" != typeof s_adobe) try {
                s_adobe.pageName = (window.location.hostname + window.location.pathname).replace(/\//g, ":").replace(/^www\./, ""), 
                s_adobe.t();
            } catch (b) {
                a.error(b);
            }
        }
    };
});
define('be/style',[ "jquery" ], function(a) {
    "use strict";
    function b(b, c) {
        "undefined" != typeof b.styleSheet ? b.styleSheet.cssText = (b.styleSheet.cssText || "") + c : a(b).append(c);
    }
    function c(a, b) {
        "string" == typeof b && b.length && (a.styleSheet && "undefined" != typeof a.styleSheet.cssText ? a.styleSheet.cssText = b : a.innerHTML = b);
    }
    function d(a) {
        return a.styleSheet && "undefined" != typeof a.styleSheet.cssText ? a.styleSheet.cssText : a.innerHTML;
    }
    return {
        add: b,
        set: c,
        get: d
    };
});
define('beff/dom/transitionEnd',[ "nbd/Promise", "nbd/util/diff" ], function(a, b) {
    "use strict";
    function c(a) {
        var b = a.css("transition-duration"), c = a.css("transition-property");
        return "none" !== c && b.split(",").map(parseFloat).some(Boolean);
    }
    function d(a) {
        var b = window.getComputedStyle(a[0]), c = a.css("transition-property");
        return ("all" === c ? h : c.split(",")).reduce(function(a, c) {
            return c = c.trim(), a[c] = b.getPropertyValue(c), a;
        }, {});
    }
    var e = function() {
        var a, b = document.createElement("aside"), c = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (a in c) if (void 0 !== b.style[a]) return c[a];
    }(), f = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, g = function(b) {
        var c = new a();
        return this.one(e, function(a) {
            a.originalEvent.propertyName === b && c.resolve(a);
        }), c;
    }, h = [ "transform", "transform-origin", "perspective", "perspective-origin", "color", "opacity", "column-width", "column-count", "column-gap", "column-rule-color", "column-rule-width", "letter-spacing", "text-indent", "word-spacing", "text-decoration-color", "text-shadow", "flex-basis", "flex-grow", "flex-shrink", "order", "background-color", "background-position", "background-size", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color", "border-top-width", "border-right-width", "border-bottom-width", "border-left-width", "border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius", "box-shadow", "margin-top", "margin-right", "margin-bottom", "margin-left", "padding-top", "padding-right", "padding-bottom", "padding-left", "max-height", "min-height", "height", "max-width", "min-width", "width", "visibility", "vertical-align", "bottom", "left", "right", "top", "z-index", "font-weight", "font-stretch", "font-size", "font-size-adjust", "line-height", "outline-color", "outline-width", "outline-offset", "clip", "shape-outside", "shape-margin", "shape-image-threshold" ];
    return function(h, i) {
        function j() {
            f(function() {
                var c = b(k, d(h)), e = Object.keys(c);
                e.length ? l.resolve(a.all(e.map(g, h))) : m ? l.resolve(!1) : j();
            });
        }
        var k, l = new a(), m = !1;
        return i = i || 300, e && c(h) ? (k = d(h), j(), setTimeout(function() {
            m = !0;
        }, i)) : l.resolve(!1), l;
    };
});

define("vendor/require/hgn!templates/lib/_follow/_button", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div ");if(t.s(t.f("instant_backfill",c,p,1),c,p,0,90,113,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("data-backfill=\"instant\"");});c.pop();}t.b(" class=\"");t.sub("classes",c,p,i);t.b(" js-action-follow-");t.sub("type",c,p,i);t.b(" follow-button-container");if(t.s(t.f("is_following",c,p,1),c,p,0,243,253,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" following");});c.pop();}t.b("\" data-followee=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" ");if(t.s(t.f("is_following",c,p,1),c,p,0,312,333,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("data-following=\"true\"");});c.pop();}t.b(">");t.b("\n" + i);t.b("  <a class=\"form-button js-form-button-follow form-button-follow ");t.sub("size",c,p,i);t.b(" form-button-default form-button-left-icon form-button-icon-follow\">");t.sub("follow",c,p,i);t.b("</a>");t.b("\n" + i);t.b("  <a class=\"form-button form-button-following ");t.sub("size",c,p,i);t.b(" form-button-light-and-grey form-button-left-icon form-button-icon-following\">");t.sub("following",c,p,i);t.b("</a>");t.b("\n" + i);t.b("  <a class=\"form-button js-form-button-unfollow form-button-unfollow ");t.sub("size",c,p,i);t.b(" form-button-red form-button-left-icon form-button-icon-unfollow\">");t.sub("unfollow",c,p,i);t.b("</a>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: { "classes": function(c,p,t,i) {},"type": function(c,p,t,i) {},"size": function(c,p,t,i) {},"follow": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,528,548,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_follow|Follow");});c.pop();}t.b(t.v(t.f("follow_label_postfix",c,p,0)));},"following": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,772,798,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_following|Following");});c.pop();}t.b(t.v(t.f("follow_label_postfix",c,p,0)));},"unfollow": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,1035,1059,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_unfollow|Unfollow");});c.pop();}t.b("&nbsp;");t.b(t.v(t.f("follow_label_postfix",c,p,0)));} }}, "{{! TODO: investigate removal of form-button-(un)follow(ing) }}\n<div {{#instant_backfill}}data-backfill=\"instant\"{{/instant_backfill}} class=\"{{$classes}}{{/classes}} js-action-follow-{{$type}}{{/type}} follow-button-container{{#is_following}} following{{/is_following}}\" data-followee=\"{{id}}\" {{#is_following}}data-following=\"true\"{{/is_following}}>\n  <a class=\"form-button js-form-button-follow form-button-follow {{$size}}{{/size}} form-button-default form-button-left-icon form-button-icon-follow\">{{$follow}}{{#translate}}button_follow|Follow{{/translate}}{{follow_label_postfix}}{{/follow}}</a>\n  <a class=\"form-button form-button-following {{$size}}{{/size}} form-button-light-and-grey form-button-left-icon form-button-icon-following\">{{$following}}{{#translate}}button_following|Following{{/translate}}{{follow_label_postfix}}{{/following}}</a>\n  <a class=\"form-button js-form-button-unfollow form-button-unfollow {{$size}}{{/size}} form-button-red form-button-left-icon form-button-icon-unfollow\">{{$unfollow}}{{#translate}}button_unfollow|Unfollow{{/translate}}&nbsp;{{follow_label_postfix}}{{/unfollow}}</a>\n</div>", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_follow/_buttonUserSmall", ["hogan", "vendor/require/hgn!templates/lib/_follow/_button"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(!t.s(t.f("is_profile_owner",c,p,1),c,p,1,0,0,"")){t.b(t.rp("<lib/_follow/_button0",c,p,""));};return t.fl(); },partials: {"<lib/_follow/_button0":{name:"lib/_follow/_button", partials: {}, subs: { "classes": function(c,p,t,i) {t.b("user-follow");},"type": function(c,p,t,i) {t.b("user");},"size": function(c,p,t,i) {t.b("form-button-small");} }}}, subs: {  }}, "{{^is_profile_owner}}\n  {{<lib/_follow/_button}}\n    {{$classes}}user-follow{{/classes}}\n    {{$type}}user{{/type}}\n    {{$size}}form-button-small{{/size}}\n  {{/lib/_follow/_button}}\n{{/is_profile_owner}}", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_follow/_button": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/miniProfile", ["hogan", "vendor/require/hgn!templates/lib/_follow/_buttonUserSmall"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("user",c,p,1),c,p,0,9,1796,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<div class=\"mini-profile-wrap hide-phone hide-tablet cfix\">");t.b("\n");t.b("\n" + i);t.b("  <div class=\"user-info-container cfix\">");t.b("\n" + i);t.b("    <a target=\"_blank\" href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" class=\"user-image-wrap user-image-link\">");t.b("\n" + i);t.b("      <img src=\"");t.b(t.v(t.d("images.115",c,p,0)));t.b("\" class=\"user-image\">");t.b("\n" + i);t.b("    </a>");t.b("\n");t.b("\n" + i);t.b("    <div class=\"user-info\">");t.b("\n" + i);t.b("      <a target=\"_blank\" href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" class=\"user-name\">");t.b(t.v(t.f("display_name",c,p,0)));t.b("</a>");t.b("\n" + i);t.b("      <a target=\"_blank\" href=\"");t.b(t.v(t.f("location_link",c,p,0)));t.b("\" class=\"location-link beicons-pre beicons-pre-location\">");t.b(t.v(t.f("city",c,p,0)));if(t.s(t.f("state",c,p,1),c,p,0,483,494,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(", ");t.b(t.v(t.f("state",c,p,0)));});c.pop();}if(t.s(t.f("country",c,p,1),c,p,0,516,529,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(", ");t.b(t.v(t.f("country",c,p,0)));});c.pop();}t.b("</a>");t.b("\n" + i);t.b("    </div> <!-- .user-info -->");t.b("\n" + i);t.b("  </div> <!-- .user-info-container -->");t.b("\n");t.b("\n" + i);t.b(t.rp("<lib/_follow/_buttonUserSmall0",c,p,"  "));t.b("\n" + i);if(t.s(t.f("has_latest_projects",c,p,1),c,p,0,680,1309,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <a target=\"_blank\" href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" class=\"cfix user-view-link gallery-projects-wrap\">");t.b("\n" + i);t.b("      <ul class=\"project-cover-container\">");t.b("\n" + i);if(t.s(t.f("latest_projects",c,p,1),c,p,0,837,985,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <li class=\"project-cover-wrap\">");t.b("\n" + i);t.b("          ");if(t.s(t.d("covers.115",c,p,1),c,p,0,903,951,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<img src=\"");t.b(t.v(t.d("covers.115",c,p,0)));t.b("\" class=\"project-cover\">");});c.pop();}t.b("\n" + i);t.b("        </li>");t.b("\n" + i);});c.pop();}t.b("      </ul> <!-- .project-cover-container -->");t.b("\n" + i);t.b("      <span class=\"gallery-cover-overlay\">");t.b("\n" + i);t.b("        <div class=\"gallery-cover-overlay-text\">");if(t.s(t.f("translate",c,p,1),c,p,0,1157,1193,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("user_cover_view_profile|View Profile");});c.pop();}t.b("&nbsp;<span class=\"rarr\">&rarr;</span></div>");t.b("\n" + i);t.b("      </span>");t.b("\n" + i);t.b("    </a> <!-- .gallery-projects-wrap -->");t.b("\n" + i);});c.pop();}t.b("\n" + i);if(t.s(t.f("stats",c,p,1),c,p,0,1347,1750,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <div class=\"stats-wrap\">");t.b("\n");t.b("\n" + i);t.b("    <span class=\"cover-stat beicons-pre beicons-pre-eye cover-stat-views\">");t.b("\n" + i);t.b("      ");t.b(t.v(t.f("views",c,p,0)));t.b("\n" + i);t.b("    </span>");t.b("\n");t.b("\n" + i);t.b("    <span class=\"cover-stat beicons-pre beicons-pre-thumb cover-stat-appreciations\">");t.b("\n" + i);t.b("      ");t.b(t.v(t.f("appreciations",c,p,0)));t.b("\n" + i);t.b("    </span>");t.b("\n");t.b("\n" + i);t.b("    <span class=\"cover-stat beicons-pre beicons-pre-followers user-stats-followed\">");t.b("\n" + i);t.b("      ");t.b(t.v(t.f("followers",c,p,0)));t.b("\n" + i);t.b("    </span>");t.b("\n" + i);t.b("  </div> <!-- .stats-wrap -->");t.b("\n" + i);});c.pop();}t.b("</div> <!-- .mini-profile-wrap -->");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {"<lib/_follow/_buttonUserSmall0":{name:"lib/_follow/_buttonUserSmall", partials: {}, subs: {  }}}, subs: {  }}, "{{#user}}\n<div class=\"mini-profile-wrap hide-phone hide-tablet cfix\">\n\n  <div class=\"user-info-container cfix\">\n    <a target=\"_blank\" href=\"{{url}}\" class=\"user-image-wrap user-image-link\">\n      <img src=\"{{images.115}}\" class=\"user-image\">\n    </a>\n\n    <div class=\"user-info\">\n      <a target=\"_blank\" href=\"{{url}}\" class=\"user-name\">{{display_name}}</a>\n      <a target=\"_blank\" href=\"{{location_link}}\" class=\"location-link beicons-pre beicons-pre-location\">{{city}}{{#state}}, {{state}}{{/state}}{{#country}}, {{country}}{{/country}}</a>\n    </div> <!-- .user-info -->\n  </div> <!-- .user-info-container -->\n\n  {{>lib/_follow/_buttonUserSmall}}\n\n  {{#has_latest_projects}}\n    <a target=\"_blank\" href=\"{{url}}\" class=\"cfix user-view-link gallery-projects-wrap\">\n      <ul class=\"project-cover-container\">\n    {{#latest_projects}}\n        <li class=\"project-cover-wrap\">\n          {{#covers.115}}<img src=\"{{covers.115}}\" class=\"project-cover\">{{/covers.115}}\n        </li>\n    {{/latest_projects}}\n      </ul> <!-- .project-cover-container -->\n      <span class=\"gallery-cover-overlay\">\n        <div class=\"gallery-cover-overlay-text\">{{#translate}}user_cover_view_profile|View Profile{{/translate}}&nbsp;<span class=\"rarr\">&rarr;</span></div>\n      </span>\n    </a> <!-- .gallery-projects-wrap -->\n  {{/has_latest_projects}}\n\n  {{#stats}}\n  <div class=\"stats-wrap\">\n\n    <span class=\"cover-stat beicons-pre beicons-pre-eye cover-stat-views\">\n      {{views}}\n    </span>\n\n    <span class=\"cover-stat beicons-pre beicons-pre-thumb cover-stat-appreciations\">\n      {{appreciations}}\n    </span>\n\n    <span class=\"cover-stat beicons-pre beicons-pre-followers user-stats-followed\">\n      {{followers}}\n    </span>\n  </div> <!-- .stats-wrap -->\n  {{/stats}}\n</div> <!-- .mini-profile-wrap -->\n{{/user}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_follow/_buttonUserSmall": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/MiniProfile',[ "jquery", "beff/dom/transitionEnd", "lib/gaq", "be/follow", "be/View/Dialog/Menu", "hgn!templates/miniProfile" ], function(a, b, c, d, e, f) {
    "use strict";
    var g = e.extend({
        mustache: f,
        template: function(b) {
            return this._super(a.extend({
                classes: [ "mini-profile", "hide-tablet", "hide-phone" ]
            }, b));
        },
        position: function() {
            var a, b, c, d = this._controller.$context.width() / 2, e = this.constructor.NUB_OFFSET - d, f = 0 > e ? "+" : "-";
            this._super(this._controller.$context, {
                my: "left top",
                at: "left" + f + Math.abs(e) + " bottom+" + this.constructor.NUB_HEIGHT,
                collision: "flipfit",
                within: this._model.get("within")
            }), a = this._controller.$context.offset(), b = this.$view.offset(), this._model.get("bottom") && b.top + this.$view.height() > this._model.get("bottom").offset().top ? (this._super(this._controller.$context, {
                my: "left" + f + Math.abs(e) + " bottom-" + this.constructor.NUB_HEIGHT,
                at: "left top",
                collision: "flipfit none",
                within: this._model.get("within")
            }), c = "bottom") : c = a.top > b.top ? "bottom" : "top", c += Math.floor(a.left) > b.left + Math.abs(e) ? "-right" : "-left", 
            this.$view.removeClass("top-right top-left bottom-right bottom-left").addClass(c);
        },
        rendered: function() {
            this._super(), d.init(this.$view), a(document.body).hasClass("logged-out") || (this.$view.on("click", ".js-form-button-follow", function() {
                c.event("mini_profile", "follow_button", "followed_user");
            }), this.$view.on("click", ".js-form-button-unfollow", function() {
                c.event("mini_profile", "follow_button", "unfollowed_user");
            }));
        },
        show: function() {
            this.$view && (this.$view.removeClass("hide"), this.position()), this._super(), 
            c.event("mini_profile", "mini_profile_shown", window.location.pathname), this._controller.$context.closest(":focusable").focus();
        },
        hide: function() {
            this._super(), this.destroy();
        },
        _bind: a.noop,
        _unbind: a.noop
    }, {
        NUB_OFFSET: 55,
        NUB_HEIGHT: 12
    });
    return g;
});
define('be/Controller/MiniProfile',[ "jquery", "be/Controller/Dialog/Roulette", "be/View/MiniProfile" ], function(a, b, c) {
    "use strict";
    var d = b.extend({
        init: function() {
            this._super.apply(this, arguments), this.listenTo(this._view, {
                postrender: function(a) {
                    this._bindHide(a);
                },
                hide: function() {
                    this._unbindHide();
                }
            }), this._keepAlive = this._keepAlive.bind(this), this._setDeath = this._setDeath.bind(this);
        },
        _unbindHide: function() {
            this.$context.off(".miniprofile");
        },
        _bindHide: function(a) {
            a.on({
                "mouseenter.miniprofile": this._keepAlive,
                "mouseleave.miniprofile": this._setDeath,
                "click.miniprofile": this._setDeath
            });
        },
        setContext: function(a) {
            this.$context = a, this._unbindHide(), this._bindHide(this.$context);
        },
        _keepAlive: function() {
            clearTimeout(this._hideTimeout);
        },
        _setDeath: function() {
            this._hideTimeout = setTimeout(function() {
                this._view.hide();
            }.bind(this), this.constructor.HIDE_TIMEOUT);
        }
    }, {
        VIEW_CLASS: c,
        HIDE_TIMEOUT: 500
    });
    return d;
});

define('vendor/require/css!styles/profile/mini',[],function(){});
define('be/miniprofile',[ "jquery", "nbd/trait/promise", "be/xhr", "be/Controller/MiniProfile", "css!styles/profile/mini" ], function(a, b, c, d) {
    "use strict";
    function e(b, c, d) {
        b = b || a(document.body), j = c || a(window), i = d;
        var e, f, l;
        b.on("mouseenter", ".js-mini-profile", function() {
            var b = a(this);
            e = b.data("id"), clearTimeout(f), f = setTimeout(function() {
                b.addClass("wait"), l = g(e), l.then(function(a) {
                    b.removeClass("wait"), h(b, a);
                }, function() {
                    b.removeClass("wait");
                });
            }, k);
        }).on("mouseleave", ".js-mini-profile", function() {
            clearTimeout(f), l && (l.reject(), l = null);
        });
    }
    function f(b) {
        b = b || a(document.body), b.off("mouseenter mouseleave", ".js-mini-profile"), a.each(l, function(a, b) {
            b.destroy();
        });
    }
    function g(a) {
        g._cache = g._cache || {};
        var d, e;
        return (e = g._cache[a]) ? (d = new b(), d.resolve(e), d) : c({
            url: "/user/mini/" + a
        }).then(function(b) {
            return g._cache[a] = b, b;
        });
    }
    function h(b, c) {
        var e = new d(c);
        b.parents(".popup").length ? (c.within = a(window), c.bottom = null) : (c.within = j, 
        c.bottom = i), e.setContext(b), e.render(b), e._view.show();
    }
    var i, j, k = 500, l = {};
    return {
        init: e,
        destroy: f
    };
});
!function(a) {
    a.fn.lazyload = function(b) {
        var c = {
            threshold: 0,
            failurelimit: 0,
            event: "scroll",
            effect: "show",
            container: window,
            enabled: !0
        };
        b && a.extend(c, b);
        var d = this;
        return "scroll" == c.event && a(c.container).bind("scroll", function(b) {
            var e = 0;
            d.each(function() {
                if (a.abovethetop(this, c) || a.leftofbegin(this, c)) ; else if (a.belowthefold(this, c) || a.rightoffold(this, c)) {
                    if (e++ > c.failurelimit) return !1;
                } else a(this).trigger("appear");
            });
            var f = a.grep(d, function(a) {
                return !a.loaded;
            });
            d = a(f);
        }), this.each(function() {
            var b = this;
            return void 0 == a(b).attr("original") && a(b).attr("original", a(b).attr("src")), 
            "scroll" != c.event || void 0 == a(b).attr("src") || c.placeholder == a(b).attr("src") || a.abovethetop(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.rightoffold(b, c) ? (c.placeholder ? a(b).attr("src", c.placeholder) : a(b).removeAttr("src"), 
            b.loaded = !1) : b.loaded = !0, "IMG" == b.tagName && a(b).one("appear", function() {
                this.loaded || a("<img />").bind("load", function() {
                    a(b).hide().attr("src", a(b).attr("original"))[c.effect](c.effectspeed), b.loaded = !0;
                }).attr("src", a(b).attr("original"));
            }), "scroll" != c.event && a(b).bind(c.event, function(c) {
                b.loaded || a(b).trigger("appear");
            }), c.enabled ? void 0 : void a(this).trigger("appear");
        }), a(c.container).trigger(c.event), this;
    }, a.belowthefold = function(b, c) {
        if (void 0 === c.container || c.container === window) var d = a(window).height() + a(window).scrollTop(); else var d = a(c.container).offset().top + a(c.container).height();
        return d <= a(b).offset().top - c.threshold;
    }, a.rightoffold = function(b, c) {
        if (void 0 === c.container || c.container === window) var d = a(window).width() + a(window).scrollLeft(); else var d = a(c.container).offset().left + a(c.container).width();
        return d <= a(b).offset().left - c.threshold;
    }, a.abovethetop = function(b, c) {
        if (void 0 === c.container || c.container === window) var d = a(window).scrollTop(); else var d = a(c.container).offset().top;
        return d >= a(b).offset().top + c.threshold + a(b).height();
    }, a.leftofbegin = function(b, c) {
        if (void 0 === c.container || c.container === window) var d = a(window).scrollLeft(); else var d = a(c.container).offset().left;
        return d >= a(b).offset().left + c.threshold + a(b).width();
    }, a.extend(a.expr[":"], {
        "below-the-fold": "$.belowthefold(a, {threshold : 0, container: window})",
        "above-the-fold": "!$.belowthefold(a, {threshold : 0, container: window})",
        "right-of-fold": "$.rightoffold(a, {threshold : 0, container: window})",
        "left-of-fold": "!$.rightoffold(a, {threshold : 0, container: window})"
    });
}(jQuery);
define("jquery-plugins/plugins/jquery.lazyload", function(){});

define('be/LazyLoadPicture',[ "jquery", "beff/Component", "picturefill", "jquery-plugins/plugins/jquery.lazyload" ], function(a, b, c) {
    "use strict";
    return b.extend({
        init: function(a, b) {
            this._$elem = a, this._options = b;
        },
        bind: function() {
            this._$elem.on("appear", function() {
                var b = a(this), d = b.html(), e = a("<picture>" + d + "</picture>"), f = e.find("img");
                b.after(e), b.remove(), f.one("load", function() {
                    f.removeAttr("height").removeAttr("width").removeAttr("style").addClass("image-loaded");
                }), f.attr("src", f.data("src")).removeAttr("data-src"), c();
            }), this._$elem.lazyload(this._options), a(window).one("resize.be-lazypicture", function() {
                this._$elem.trigger("appear");
            }.bind(this));
        },
        unbind: function() {
            a(window).off("resize.be-lazypicture"), this._$elem.off("appear");
        }
    });
});
define('beff/trait/eventMappable',[],function() {
    "use strict";
    var a = /^:(.+)/, b = function d(b) {
        var c, e = this;
        return "string" == typeof b ? {
            method: function() {
                if (e[b]) e[b].apply(e, arguments); else {
                    if (!(c = a.exec(b))) throw new Error('Method "' + b + '" not found');
                    Array.prototype.unshift.call(arguments, c[1]), e.trigger.apply(e, arguments);
                }
            }
        } : "function" == typeof b ? {
            method: b
        } : Object.keys(b).map(function(a) {
            return {
                selector: a,
                method: d.call(this, b[a]).method
            };
        }, this);
    }, c = function(a) {
        return a = Array.isArray(a) ? a : [ a ], Array.prototype.concat.apply([], a.map(b, this));
    };
    return {
        _mapEvents: function() {
            null != this.events && this.$view && (this._undelegateEvents(), Object.keys(this.events).forEach(function(a) {
                var b = c.call(this, this.events[a]);
                a += ".delegated", b.forEach(function(b) {
                    b.selector ? this.on(a, b.selector, b.method) : this.on(a, b.method);
                }, this.$view);
            }, this));
        },
        _undelegateEvents: function() {
            this.$view && this.$view.off(".delegated");
        }
    };
});
define('beff/View',[ "jquery", "nbd/View", "nbd/trait/log", "./trait/eventMappable" ], function(a, b, c, d) {
    "use strict";
    return b.extend({
        init: function() {
            this._super.apply(this, arguments), this.on("postrender", this._mapEvents);
        },
        template: function(a) {
            return this.mustache && this.mustache(a, this.partials);
        },
        destroy: function() {
            this._undelegateEvents(), this._super();
        }
    }, {
        domify: a
    }).mixin(c).mixin(d);
});
define('beff/Controller',[ "jquery", "nbd/util/extend", "nbd/trait/log", "nbd/trait/responsive", "nbd/Controller", "./View" ], function(a, b, c, d, e, f) {
    "use strict";
    function g(a, b) {
        return "undefined" == typeof b || "object" == typeof a;
    }
    return e.extend({
        init: function(c, d) {
            var e, f;
            g(c, d) && (d = c, c = void 0), "string" == typeof d && (f = a(d), e = f[0]), d instanceof a && (f = d, 
            e = f[0]), d instanceof window.Element && (e = d, f = a(e)), f && (d = b({}, e.dataset || f.data())), 
            this._super(c, d), this._view.$view = f, f && this._view.trigger("postrender", f);
        }
    }, {
        VIEW_CLASS: f
    }).mixin(c).mixin(d);
});
define('project/View/Appreciate',[ "jquery", "moment", "beff/View" ], function(a, b, c) {
    "use strict";
    return c.extend({
        init: function() {
            this._super.apply(this, arguments), this.listenTo(this._model, "thanks", this._renderThanks);
        },
        render: function() {
            var a = this._model.get("appreciatedOn");
            a > 0 ? (this.$view.addClass("appreciated"), this.$view.find(".js-appreciation-date").text(b.unix(a).format("MMMM Do, YYYY"))) : this.$view.one("click", function() {
                this._controller.appreciate();
            }.bind(this));
        },
        _renderThanks: function() {
            this.$view.addClass("thanks").off("click");
        }
    });
});
define('project/Controller/Appreciate',[ "jquery", "nbd/Model", "nbd/Promise", "beff/Controller", "be/stats", "project/View/Appreciate" ], function(a, b, c, d, e, f) {
    "use strict";
    return d.extend({
        init: function(c, d) {
            this.views = [], this._model = new b(c, {
                appreciatedOn: 0,
                thanks: !1
            }), d.each(function(b, c) {
                this.views.push(this._initView(a(c)));
            }.bind(this));
        },
        _initView: function(a) {
            var b = new f(this._model);
            return b.$view = a, b._controller = this, b;
        },
        render: function() {
            var a = new c();
            return e.view("project", this.id, function(b) {
                var c = b.t || 0;
                this._model.set("appreciatedOn", c), this.views.forEach(function(a) {
                    a.render();
                }), a.resolve();
            }.bind(this)), a;
        },
        appreciate: function() {
            e.appreciate("project", this._model.id()), this._model.set("thanks", !0), this.trigger("appreciate");
        },
        destroy: function() {
            this.views.forEach(function(a) {
                a.destroy();
            }), this.views = [], this._model.destroy(), this._model = null;
        }
    });
});
define('be/spam',[ "jquery", "be/xhr", "be/localization", "be/modal/simple" ], function(a, b, c, d) {
    "use strict";
    function e(a, e, g) {
        return d({
            title: c.translate("report_spam_mark_as", "Mark as Spam"),
            html: c.translate("report_spam_are_you_sure", "Are you sure you want to mark this as spam?"),
            buttons: [ {
                label: c.translate("report_spam_button_okay", "Okay"),
                classes: [ "form-button-default", "js-confirm" ]
            }, {
                label: c.translate("report_spam_button_cancel", "Cancel"),
                classes: [ "form-button-cancel", "js-cancel" ]
            } ]
        }).then(function() {
            return b({
                type: "POST",
                url: f + a + "/" + e
            }).then(function(a) {
                return g && g.text(c.translate("report_spam_marked_as", "Marked as Spam")).on("click", !1), 
                {
                    response: a,
                    $context: g
                };
            });
        });
    }
    var f = "/v2/report/spam/";
    return {
        report: e,
        delegate: function(b, c) {
            c = c || a.noop, b.on("click.be-spam", ".js-action-spam", function(b) {
                var d = a(b.target), f = d.data("type"), g = d.data("id");
                e(f, g, d).then(c), b.preventDefault();
            });
        },
        undelegate: function(a) {
            a.off("click.be-spam");
        }
    };
});

define("vendor/require/hgn!templates/comment", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<li class=\"comment-container cfix ");if(t.s(t.d("user.owner",c,p,1),c,p,0,49,62,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("owner-comment");});c.pop();}if(!t.s(t.d("user.owner",c,p,1),c,p,1,0,0,"")){t.b("user-comment");};t.b("\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("  <a class=\"comment-user-image-link left\" href=\"");t.b(t.v(t.d("user.url",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <img class=\"comment-user-image js-mini-profile\" data-id=\"");t.b(t.v(t.d("user.id",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("user.image",c,p,0)));t.b("\">");t.b("\n" + i);t.b("  </a>");t.b("\n" + i);t.b("  <div class=\"comment-text-container left relative\">");t.b("\n" + i);t.b("    <div class=\"comment-user-date-wrap ui-corner cfix\">");t.b("\n" + i);t.b("      <a class=\"user-name-link bold js-mini-profile\" data-id=\"");t.b(t.v(t.d("user.id",c,p,0)));t.b("\" href=\"");t.b(t.v(t.d("user.url",c,p,0)));t.b("\">");t.b(t.v(t.d("user.name",c,p,0)));t.b("</a>");t.b("\n" + i);if(t.s(t.f("replied_to",c,p,1),c,p,0,548,686,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <span class=\"bold\">");if(t.s(t.f("translate",c,p,1),c,p,0,588,658,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("comment_replied_to|replied to <a href=\"");t.b(t.v(t.d("user.url",c,p,0)));t.b("\">");t.b(t.v(t.d("user.name",c,p,0)));t.b("</a>");});c.pop();}t.b("</span>");t.b("\n" + i);});c.pop();}t.b("      <span class=\"comment-date ");if(t.s(t.f("timestamp",c,p,1),c,p,0,748,767,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("js-format-timestamp");});c.pop();}t.b("\" data-timestamp=\"");t.b(t.v(t.f("timestamp",c,p,0)));t.b("\">");t.b(t.v(t.f("posted_on",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"comment-text-wrap\"><div class=\"comment-text\">");t.b(t.t(t.f("comment",c,p,0)));t.b("</div></div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"comment-actions\">");t.b("\n" + i);if(t.s(t.d("permissions.flag",c,p,1),c,p,0,999,1112,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <a class=\"comment-action comment-spam js-action-spam\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" data-type=\"");t.b(t.v(t.f("type",c,p,0)));t.b("comment\"></a>");t.b("\n" + i);});c.pop();}if(t.s(t.d("permissions.close",c,p,1),c,p,0,1160,1224,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <a class=\"comment-action comment-close js-delete\"></a>");t.b("\n" + i);});c.pop();}t.b("  </div>");t.b("\n" + i);t.b("</li>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<li class=\"comment-container cfix {{#user.owner}}owner-comment{{/user.owner}}{{^user.owner}}user-comment{{/user.owner}}\" data-id=\"{{id}}\">\n  <a class=\"comment-user-image-link left\" href=\"{{user.url}}\">\n    <img class=\"comment-user-image js-mini-profile\" data-id=\"{{user.id}}\" src=\"{{user.image}}\">\n  </a>\n  <div class=\"comment-text-container left relative\">\n    <div class=\"comment-user-date-wrap ui-corner cfix\">\n      <a class=\"user-name-link bold js-mini-profile\" data-id=\"{{user.id}}\" href=\"{{user.url}}\">{{user.name}}</a>\n      {{#replied_to}}\n      <span class=\"bold\">{{#translate}}comment_replied_to|replied to <a href=\"{{user.url}}\">{{user.name}}</a>{{/translate}}</span>\n      {{/replied_to}}\n      <span class=\"comment-date {{#timestamp}}js-format-timestamp{{/timestamp}}\" data-timestamp=\"{{timestamp}}\">{{posted_on}}</span>\n    </div>\n    <div class=\"comment-text-wrap\"><div class=\"comment-text\">{{& comment}}</div></div>\n  </div>\n  <div class=\"comment-actions\">\n    {{#permissions.flag}}\n    <a class=\"comment-action comment-spam js-action-spam\" data-id=\"{{id}}\" data-type=\"{{type}}comment\"></a>\n    {{/permissions.flag}}\n    {{#permissions.close}}\n    <a class=\"comment-action comment-close js-delete\"></a>\n    {{/permissions.close}}\n  </div>\n</li>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/Comment',[ "jquery", "nbd/View/Entity", "nbd/util/pipe", "be/modal/simple", "be/timestampFormatter", "hgn!templates/comment" ], function(a, b, c, d, e, f) {
    "use strict";
    var g = {
        3e3: "close",
        5e3: "flag"
    }, h = b.extend({
        template: c(f, a),
        templateData: function() {
            var a = this._super();
            return a.permissions = a.permissions.reduce(function(a, b) {
                return a[g[b]] = !0, a;
            }, {}), a;
        },
        rendered: function() {
            this.$view.hide().fadeIn().on("click", ".js-delete", function() {
                this.$view.fadeOut(this.trigger.bind(this, "remove"));
            }.bind(this)), e.init(this.$view, "LLL");
        }
    });
    return h;
});
define('be/Controller/Comment',[ "nbd/Controller/Entity", "nbd/Model", "be/View/Comment", "nbd/trait/pubsub" ], function(a, b, c, d) {
    "use strict";
    var e = a.extend({
        _initView: function() {
            this._super.apply(this, arguments), this.listenTo(this._view, "all", this.trigger);
        },
        destroy: function() {
            this.stopListening(), this._super();
        }
    }, {
        MODEL_CLASS: b,
        VIEW_CLASS: c
    }).mixin(d);
    return e;
});
define('be/comments',[ "jquery", "nbd/util/extend", "beff/Component", "be/spam", "be/xhr", "be/Controller/Comment" ], function(a, b, c, d, e, f) {
    "use strict";
    return c.extend({
        _posts: [],
        loading: !1,
        moreSelector: ".see-more-button-container",
        init: function(a, b, c) {
            var e = a.find(".js-comments-list");
            this.data = b || {}, this.callback = c, this.loading = !1, this.$content = e, this.$more = a.find(this.moreSelector), 
            this.get = this.more.bind(this, void 0), this.$more.on("click", this.get), d.delegate(this.$content, function(a) {
                a.$context.remove(), this.trigger("spam");
            }.bind(this));
        },
        set: function(a) {
            return b(this.data, a), this;
        },
        more: function(a) {
            var b;
            return this.loading = !0, b = this.load(a), b.then(this.render.bind(this))["finally"](this.after.bind(this)), 
            b["finally"](this.callback), b;
        },
        destroy: function() {
            this.stopListening(), this.clear(), this.$more.off("click", this.get);
        },
        load: function(a) {
            return e({
                url: "/comments/" + this.data.type,
                data: b({
                    sort_order: "desc"
                }, this.data, a)
            });
        },
        render: function(a) {
            var b;
            return a && a.comments && (b = a.comments.map(this._makePost, this), this._posts = this._posts.concat(b)), 
            this._posts["asc" === this.data.order ? "reduceRight" : "reduce"](function(a, b) {
                return b.render(a.$content), a;
            }, this), a;
        },
        after: function() {
            this.data.offset = this._posts.length ? this._posts[this._posts.length - 1].id : void 0;
        },
        _makePost: function(a) {
            a.type = this.data.type;
            var b = new f(a.id, a);
            return this.listenTo(b, "remove", this.remove.bind(this, b)), b;
        },
        add: function(a) {
            var b = a instanceof f ? a : this._makePost(a);
            this._posts.unshift(b), this.render();
        },
        remove: function(a) {
            var b;
            ~(b = this._posts.indexOf(a)) && (e({
                type: "DELETE",
                url: "/comments/" + this.data.type + "?comment_id=" + a.id
            }), this._posts.splice(b, 1), a.destroy());
        },
        clear: function() {
            return this._posts.forEach(function(a) {
                a.destroy();
            }), this._posts = [], this;
        }
    });
});

define("vendor/require/hgn!templates/error", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"error-bar\">");t.b(t.t(t.f("message",c,p,0)));t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"error-bar\">{{{message}}}</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/error',[ "jquery", "nbd/View/Element", "nbd/util/pipe", "hgn!templates/error" ], function(a, b, c, d) {
    "use strict";
    function e(a) {
        return ~a.indexOf("&lt;") ? g.html(a).text() : a;
    }
    var f, g = a("<div>"), h = b.extend({
        template: c(d, a),
        templateData: function() {
            return {
                message: "Oops, an error occurred. | <a class='js-reload'>Please Refesh.</a>"
            };
        },
        render: function(a) {
            return a = a ? {
                message: e(a)
            } : null, this._super(a);
        },
        rendered: function() {
            this.$view.on("click", ".js-reload", function() {
                window.location.reload();
            }).show();
        },
        hide: function() {
            return this.$view && this.$view.hide();
        }
    }), i = {
        init: function(a) {
            return f = new h(a);
        },
        show: function(a) {
            f && f.render(a);
        },
        hide: function() {
            f && f.hide();
        },
        Errorline: h
    };
    return i;
});
define('be/mentionSource',[ "log", "nbd/trait/promise", "be/xhr" ], function(a, b, c) {
    "use strict";
    function d(a) {
        for (var b = {}, c = 0; c < a.length; ++c) b[a[c].id] = a[c];
        return b;
    }
    function e(a) {
        var b = {};
        return a.filter(function(a) {
            return a.id in b ? !1 : (b[a.id] = a, !0);
        });
    }
    function f(a) {
        return j = d(a);
    }
    function g() {
        var a;
        return j ? (a = new b(), a.resolve(j)) : a = c(k.local).then(f), a;
    }
    function h(a) {
        return g().then(r.bind(a));
    }
    function i(a, d) {
        i._cache = i._cache || {}, i._cache[a] = i._cache[a] || {};
        var e, f;
        return d.length < l && (f = []), i._cache[a][d] && (f = i._cache[a][d]), f ? (e = new b(), 
        e.resolve(f), e) : c({
            url: a,
            data: {
                q: d
            }
        }).then(function(b) {
            return f = p.call(b, d), i._cache[a][d] = f, f;
        });
    }
    var j, k = {
        global: "/mentions/search",
        following: "/mentions/search/following",
        local: ""
    }, l = 2, m = 5, n = function(a) {
        return this[a];
    }, o = function(a) {
        var b = this.toLocaleLowerCase();
        return 0 === a.first_name.toLocaleLowerCase().indexOf(b) || 0 === a.last_name.toLocaleLowerCase().indexOf(b) || 0 === a.username.toLocaleLowerCase().indexOf(b);
    }, p = function(a) {
        return this.filter(o, a);
    }, q = function(a) {
        return Object.keys(this).map(n, this).filter(o, a);
    }, r = function(a) {
        return q.call(a, this);
    };
    a = a.get("be/mentionSource");
    var s = i.bind(null, k.following), t = i.bind(null, k.global);
    return {
        init: function(a) {
            return a.maxResults && (m = a.maxResults), a.minLength && (l = a.minLength), a.local && (k.local = a.local), 
            j = null, this;
        },
        getLocal: g,
        source: function(b, c) {
            function d() {
                c(e(g).slice(0, m));
            }
            var f = [ h, s, t ].map(function(a) {
                return a(b.term);
            }), g = [];
            f.reduce(function(b, c) {
                return (b ? b.then(function() {
                    return c;
                }) : c).then(function(a) {
                    a.forEach(function(a) {
                        a.value = a.username;
                    }), g = g.concat(a), d();
                }, function(b) {
                    a.error(b);
                });
            }, null).then(null, d);
        }
    };
});

define("vendor/require/hgn!templates/lib/_menu/_user", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<li class=\"ui-menu-item\">");t.b("\n" + i);t.b("  <a class=\"mention-user-wrap\">");t.b("\n" + i);t.b("    <img class=\"mention-user-image\" src=\"");t.b(t.v(t.d("images.50",c,p,0)));t.b("\" />");t.b("\n" + i);t.b("    <div class=\"mention-displayname\">");t.b(t.v(t.f("display_name",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("    <div class=\"mention-minor\">@");t.b(t.v(t.f("username",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("  </a>");t.b("\n" + i);t.b("</li>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<li class=\"ui-menu-item\">\n  <a class=\"mention-user-wrap\">\n    <img class=\"mention-user-image\" src=\"{{images.50}}\" />\n    <div class=\"mention-displayname\">{{display_name}}</div>\n    <div class=\"mention-minor\">@{{username}}</div>\n  </a>\n</li>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
!function(a) {
    "use strict";
    return "function" == typeof define && define.amd ? void define('jquery-plugins/be/automention',[ "jquery", "./autosuggest" ], function() {
        var b = a.apply(this, arguments);
        return b;
    }) : jQuery && a.call(this, jQuery);
}(function(a) {
    "use strict";
    var b = /(?:^|[^\w])@(\w+)/;
    return a.widget("be.automention", a.be.autosuggest, {
        _create: function() {
            this._super(), this._on(this.element, {
                mouseup: this.check,
                input: this.check,
                keyup: this.check,
                blur: this._clear
            }), this.menu.element.addClass("mention-menu");
        },
        _mention: {
            value: "",
            start: 0,
            end: 0
        },
        _last: null,
        _value: function(a) {
            if (!a) return this._mention.value;
            var b = this._super(), c = b.indexOf("@", this._mention.start) + 1;
            a = b.substring(0, c) + a, " " !== b.charAt(this._mention.end) && (a += " "), a += b.substring(this._mention.end), 
            this._super(a), this.element.trigger("input");
        },
        _clear: function() {
            this._last = null;
        },
        check: function(a) {
            if (this.element.is(document.activeElement)) {
                var c, d, e, f = document.activeElement.value, g = document.activeElement.selectionStart;
                g && f && (d = f.lastIndexOf(" ", g - 1), e = f.indexOf(" ", g), e = ~e ? e : 1 / 0, 
                c = f.substring(d, e), c = b.exec(c), c = c && c[1], this._last !== c && (this._mention.value = c || "", 
                this._mention.start = d, this._mention.end = e, this.search(null, a), this._trigger("value", a, c)), 
                this._last = c);
            }
        }
    }), a.extend(a.be.automention, {
        usernameMatch: b
    }), a.be.automention;
});
define('be/automention',[ "jquery", "be/error", "be/mentionSource", "hgn!templates/lib/_menu/_user", "jquery-plugins/be/automention" ], function(a, b, c, d, e) {
    "use strict";
    var f = new RegExp(e.usernameMatch.source, "g");
    return function(e, g) {
        g = a.extend({
            maxMentions: 5
        }, g), c.init(g), e.length && e.parent().addClass("ui-front").end().one("focus", c.getLocal).automention({
            delay: 50,
            itemTemplate: d,
            source: c.source,
            appendTo: g.appendTo
        }).on("automentionopen", function() {
            var c, d, e = this.value, h = {}, i = a(this);
            e.replace(f, function(a, b) {
                h[a] = b;
            }), Object.keys(h).length > g.maxMentions && (c = i.data("beAutomention"), d = i.data("errorbar") || new b.Errorline(c.menu.element), 
            d.render("<strong>You may only mention " + g.maxMentions + " users</strong>"), d.$view.prependTo(c.menu.element), 
            i.data("errorbar", d));
        });
    };
});
define('be/form/Reset',[ "be/form" ], function(a) {
    "use strict";
    var b = a.extend({
        _submit: function(a) {
            return this._super(a).then(function() {
                this.$form.find(":input").val("").removeAttr("checked selected");
            }.bind(this));
        }
    });
    return b;
});
define('project/lib/CommentSection',[ "jquery", "beff/Component", "be/comments", "be/automention", "be/localization", "be/form/Reset" ], function(a, b, c, d, e, f) {
    "use strict";
    return b.extend({
        _total: 0,
        init: function(a) {
            this._$context = a, this._id = a.data("id"), this._$view = a.find(".js-post-comment-block"), 
            this._$commentText = a.find(".js-comment-textarea"), this._commentContainer = this._initCommentContainer();
        },
        bind: function() {
            d(this._$commentText, {
                local: "/mentions/project/" + this._id
            }), this._bindForm(), this._commentContainer.get();
        },
        unbind: function() {
            this._form && this._form.destroy(), this._commentContainer.destroy(), this._$view && this._$view.remove();
        },
        _setTotal: function(a) {
            this._total = a;
            var b = this._$context.find(".js-comments-total");
            b.text(a ? "(" + a + ")" : "");
        },
        _initCommentContainer: function() {
            var a, b = this._id, d = this, e = ".js-see-more", f = this._$context.find(e);
            return a = c.extend({
                moreSelector: e
            }).init(this._$context, {
                type: "project",
                entity_id: b
            }, function(a) {
                f.toggleClass("hide", !a.more), d._setTotal(+a.total);
            }), this.listenTo(a, "remove", function() {
                this._setTotal(this._total - 1);
            }), a;
        },
        _bindForm: function() {
            function a(a) {
                if (!a.id || !a.user) throw a;
                b._commentContainer.add({
                    id: a.id,
                    user: a.user,
                    comment: a.comment,
                    posted_on: e.translate("comments_just_now", "Just now"),
                    permissions: [ 3e3 ]
                }), b._setTotal(b._total + 1);
            }
            var b = this, c = this._id, d = this._$view.find(".js-submit");
            d.length && (this._form = f.extend({
                hideButtonText: e.translate("comments_hidebutton_posting", "Posting...")
            }).init(this._$view).on("success", function() {
                this.showButtons();
            }), this._form.commit = function(b) {
                return b.data.entity_id = c, this.then(a), this;
            });
        }
    });
});
define('project/lib/DimensionClasses',[ "jquery", "beff/Component" ], function(a, b) {
    "use strict";
    return b.extend({
        init: function(a, b, c, d) {
            this._$target = a, this._$sizer = b, this._classMap = d, this._measure = this._$sizer[c].bind(this._$sizer), 
            this._resizeCallback = this._applyBreakpointClasses.bind(this);
        },
        bind: function() {
            this._applyBreakpointClasses(), a(window).on("resize", this._resizeCallback);
        },
        _applyBreakpointClasses: function() {
            var a = this._measure();
            Object.keys(this._classMap).forEach(function(b) {
                this._$target.toggleClass(b, a < this._classMap[b]);
            }, this);
        },
        destroy: function() {
            a(window).off("resize", this._resizeCallback);
        }
    });
});
define('project/lib/HighDefLightbox',[ "jquery", "nbd/util/extend", "beff/Component", "jquery-plugins/plugins/jquery.fancybox" ], function(a, b, c) {
    "use strict";
    return c.extend({
        fancyBoxOptions: {
            padding: 0,
            loop: !0,
            nextEffect: "fade",
            prevEffect: "fade",
            title: "",
            helpers: {
                title: {
                    type: "outside"
                }
            }
        },
        init: function(a) {
            this._$context = a;
        },
        bind: function() {
            this._bindFancyBox(), this._setCursorCss();
        },
        _bindFancyBox: function() {
            var c = b({}, {
                afterShow: this.trigger.bind(this, "show"),
                afterClose: this.trigger.bind(this, "hide")
            }, this.fancyBoxOptions);
            this._$context.each(function() {
                var b = a(this);
                b.attr("data-fancybox-group", "gallery").attr("href", b.data("hd-src")).fancybox(c);
            });
        },
        _setCursorCss: function() {
            [ "-moz-zoom-in", "zoom-in", 'url("/assets/img/site/-ie-zoom-in.cur"), pointer, hand' ].forEach(function(a) {
                this._$context.css("cursor", a);
            }, this);
        }
    });
});
define('project/trait/mature',[ "nbd/util/extend", "be/localization", "hgn!templates/html" ], function(a, b, c) {
    "use strict";
    var d = {
        "restricted-safe": [ {
            label: b.translate("adult_wall_dialog_button_submit", "Turn off Safe Browsing"),
            classes: [ "form-button-default", "form-submit" ]
        }, {
            label: b.translate("adult_wall_dialog_button_cancel", "Cancel"),
            classes: [ "form-button-cancel" ]
        } ]
    };
    return {
        mustache: c,
        templateData: function() {
            var b = a({
                classes: [ "mature-blocker", "safe" ]
            }, this._model.data());
            return b.buttons = d[b.access], b;
        },
        rendered: function() {
            this.$view.on("click", ".form-submit", function() {
                this._controller.disableSafeBrowsing().then(this.hide.bind(this)).then(this.destroy.bind(this));
            }.bind(this)).filter(".blocking-div").on("click", function(a) {
                a.stopImmediatePropagation();
            }), this._super();
        }
    };
});
define('project/Controller/MatureContent',[ "be/xhr", "be/Controller/Dialog", "be/View/Dialog/Layover", "be/View/Dialog/Popup", "project/trait/mature" ], function(a, b, c, d, e) {
    "use strict";
    var f = d.extend(e), g = c.extend(e), h = b.extend({
        render: function() {
            this._view && (this._view.render(document.body), this._view.position());
        },
        disableSafeBrowsing: function() {
            return a({
                type: "PATCH",
                url: "/account/safe_browsing_setting",
                data: {
                    safe_browsing_setting: 0
                }
            }).then(function() {
                window.location.reload();
            }, console.error);
        }
    }, {
        VIEW_CLASS: {
            phone: g,
            tablet: f,
            desktop: f
        }
    });
    return h;
});

define("vendor/require/hgn!templates/project/matureLogin", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"mature-message login-modal\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,57,193,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_sign_in_mature|You must log in or sign up for Behance<span class=\"hide-phone\"> to view projects containing adult content.</span>");});c.pop();}t.b("\n" + i);if(t.s(t.f("login",c,p,1),c,p,0,220,231,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<button0",c,p,""));});c.pop();}t.b("</div>");t.b("\n");t.b("\n" + i);t.b("<div class=\"popup-buttons login-button\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,307,415,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_no_account_signup|Don't Have an Account? <a class=\"js-adobeid-signup signup\">Sign up for Behance</a>");});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<button0":{name:"button", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"mature-message login-modal\">\n  {{#translate}}project_sign_in_mature|You must log in or sign up for Behance<span class=\"hide-phone\"> to view projects containing adult content.</span>{{/translate}}\n  {{#login}}{{>button}}{{/login}}\n</div>\n\n<div class=\"popup-buttons login-button\">\n  {{#translate}}project_no_account_signup|Don't Have an Account? <a class=\"js-adobeid-signup signup\">Sign up for Behance</a>{{/translate}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('project/Controller/MatureLogin',[ "be/Controller/Dialog", "be/View/Dialog/Layover", "be/View/Dialog/Popup", "be/history", "hgn!templates/project/matureLogin" ], function(a, b, c, d, e) {
    "use strict";
    var f = {
        mustache: e,
        hide: function() {
            d.back();
        }
    }, g = c.extend(f), h = b.extend(f), i = a.extend({
        render: function() {
            this._view && (this._view.render(document.body), this._view.position());
        }
    }, {
        VIEW_CLASS: {
            phone: h,
            tablet: g,
            desktop: g
        }
    });
    return i;
});
define('project/lib/mature',[ "be/localization", "project/Controller/MatureContent", "project/Controller/MatureLogin" ], function(a, b, c) {
    "use strict";
    var d = {
        init: function(d, e, f) {
            if (f.mature_content) {
                var g, h, i = {
                    "restricted-geo": a.translate("mature_content_restricted_geo", '<div class="mature-message">Because you live in a country where adult content is illegal you can\'t view this content on Behance.</div>'),
                    "restricted-age": a.translate("mature_content_restricted_age", '<div class="mature-message">Because you are under 18 years old, you can\'t access adult content on Behance.</div>'),
                    "restricted-safe": a.translate("mature_content_restricted_safe", '<div class="mature-message">You currently have Safe Browsing turned on. Would you like to turn off Safe Browsing to view content on Behance that contain adult content?</div>')
                };
                if ("logged-out" === f.mature_access) g = new c({
                    classes: [ "mature-blocker", "log-in" ],
                    title: a.translate("mature_content_log_in", "Log In"),
                    login: {
                        classes: [ "form-button-default", "form-button-large", "js-adobeid-signin" ],
                        label: a.translate("mature_content_log_in", "Log In")
                    }
                }); else {
                    if (h = i[f.mature_access], !h) return;
                    g = new b(d, {
                        title: a.translate("mature_content_restricted_project_title", "This project contains adult content"),
                        html: h,
                        access: f.mature_access
                    });
                }
                g.render(), this.popup = g;
            }
        },
        destroy: function() {
            this.popup && (this.popup.destroy(), this.popup = null);
        }
    };
    return d;
});

define("vendor/require/hgn!templates/form/textarea", ["hogan", "vendor/require/hgn!templates/lib/_savingSpinner"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"form-item form-item-textarea");if(t.s(t.f("containerClasses",c,p,1),c,p,0,61,67,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" ");t.b(t.v(t.d(".",c,p,0)));});c.pop();}t.b("\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("label",c,p,1),c,p,0,103,204,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<label for=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.t(t.f("label",c,p,0)));if(t.s(t.f("saving_spinner",c,p,1),c,p,0,153,177,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_savingSpinner0",c,p,""));});c.pop();}t.b("</label>");});c.pop();}t.b("\n" + i);t.b("  <textarea id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" name=\"");t.b(t.v(t.f("name",c,p,0)));if(!t.s(t.f("name",c,p,1),c,p,1,0,0,"")){t.b(t.v(t.f("id",c,p,0)));};t.b("\" class=\"form-textarea");if(t.s(t.f("classes",c,p,1),c,p,0,311,317,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" ");t.b(t.v(t.d(".",c,p,0)));});c.pop();}t.b("\"");t.b("\n" + i);t.b("    ");if(t.s(t.f("maxlength",c,p,1),c,p,0,349,375,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" maxlength=\"");t.b(t.v(t.f("maxlength",c,p,0)));t.b("\"");});c.pop();}t.b("\n" + i);t.b("    ");if(t.s(t.f("placeholder",c,p,1),c,p,0,410,440,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" placeholder=\"");t.b(t.v(t.f("placeholder",c,p,0)));t.b("\"");});c.pop();}t.b("\n" + i);t.b("    ");if(t.s(t.f("autocomplete",c,p,1),c,p,0,478,510,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" autocomplete=\"");t.b(t.v(t.f("autocomplete",c,p,0)));t.b("\"");});c.pop();}t.b("\n" + i);t.b("    data-validate=\"");t.b(t.v(t.f("validate",c,p,0)));t.b("\">");t.b(t.v(t.f("value",c,p,0)));t.b("</textarea>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<lib/_savingSpinner0":{name:"lib/_savingSpinner", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"form-item form-item-textarea{{#containerClasses}} {{.}}{{/containerClasses}}\">\n  {{#label}}<label for=\"{{id}}\">{{{label}}}{{#saving_spinner}}{{> lib/_savingSpinner}}{{/saving_spinner}}</label>{{/label}}\n  <textarea id=\"{{id}}\" name=\"{{name}}{{^name}}{{id}}{{/name}}\" class=\"form-textarea{{#classes}} {{.}}{{/classes}}\"\n    {{#maxlength}} maxlength=\"{{maxlength}}\"{{/maxlength}}\n    {{#placeholder}} placeholder=\"{{placeholder}}\"{{/placeholder}}\n    {{#autocomplete}} autocomplete=\"{{autocomplete}}\"{{/autocomplete}}\n    data-validate=\"{{validate}}\">{{value}}</textarea>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_savingSpinner": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/message", ["hogan", "vendor/require/hgn!templates/form/textarea", "vendor/require/hgn!templates/form/_checkbox"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<form class=\"send-message js-send-message\">");t.b("\n" + i);if(t.s(t.f("recipient",c,p,1),c,p,0,60,527,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <div class=\"message-label\">");if(t.s(t.f("translate",c,p,1),c,p,0,104,143,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("message_popup_label_recipient|Recipient");});c.pop();}t.b("</div>");t.b("\n" + i);t.b("  <div class=\"recipient\">");t.b("\n" + i);t.b("    <img src=\"");t.b(t.v(t.f("image",c,p,0)));t.b("\" class=\"recipient-image\">");t.b("\n" + i);t.b("    <div class=\"recipient-info\">");t.b("\n" + i);t.b("      <div class=\"recipient-name\">");t.b(t.v(t.f("name",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("      <div class=\"recipient-meta beicons-pre beicons-pre-");t.b(t.v(t.f("icon",c,p,0)));t.b("\">");t.b(t.v(t.f("status",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"message-label\">");if(t.s(t.f("translate",c,p,1),c,p,0,469,504,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("message_popup_label_message|Message");});c.pop();}t.b("</div>");t.b("\n" + i);});c.pop();}if(t.s(t.f("body",c,p,1),c,p,0,553,572,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<form/textarea0",c,p,""));});c.pop();}if(t.s(t.f("has_talent_search",c,p,1),c,p,0,606,680,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("job_checkbox",c,p,1),c,p,0,628,660,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<form/_checkbox1",c,p,"      "));});c.pop();}});c.pop();}t.b("</form>");t.b("\n");return t.fl(); },partials: {"<form/textarea0":{name:"form/textarea", partials: {}, subs: {  }},"<form/_checkbox1":{name:"form/_checkbox", partials: {}, subs: {  }}}, subs: {  }}, "<form class=\"send-message js-send-message\">\n  {{#recipient}}\n  <div class=\"message-label\">{{#translate}}message_popup_label_recipient|Recipient{{/translate}}</div>\n  <div class=\"recipient\">\n    <img src=\"{{image}}\" class=\"recipient-image\">\n    <div class=\"recipient-info\">\n      <div class=\"recipient-name\">{{name}}</div>\n      <div class=\"recipient-meta beicons-pre beicons-pre-{{icon}}\">{{status}}</div>\n    </div>\n  </div>\n  <div class=\"message-label\">{{#translate}}message_popup_label_message|Message{{/translate}}</div>\n  {{/recipient}}\n  {{#body}}{{> form/textarea}}{{/body}}\n  {{#has_talent_search}}\n    {{#job_checkbox}}\n      {{> form/_checkbox}}\n    {{/job_checkbox}}\n  {{/has_talent_search}}\n</form>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "form/textarea": arguments[1].template,"form/_checkbox": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/trait/message',[ "page_config", "nbd/util/extend", "be/form", "be/localization", "lib/showMessages", "hgn!templates/message" ], function(a, b, c, d, e, f) {
    "use strict";
    return {
        mustache: f,
        templateData: function() {
            var c = this._super();
            return b({
                classes: [ "message" ],
                title: d.translate("message_dialog_header_default", "Message"),
                has_talent_search: a.has_talent_search,
                buttons: [ {
                    label: d.translate("message_dialog_button_send", "Send Message"),
                    classes: [ "form-button-default", "form-submit" ]
                } ],
                job_checkbox: {
                    label: d.translate("message_dialog_label_job_opportunity", 'Mark as "Job Opportunity" to recipient'),
                    id: "is_job",
                    name: "is_job",
                    value: 1,
                    containerClasses: [ "cfix" ]
                },
                body: {
                    id: "message",
                    name: "message",
                    placeholder: d.translate("message_dialog_label_placeholder_named", "Your message to ") + c.name,
                    containerClasses: [ "message-body" ],
                    validate: "required,Generic",
                    classes: [ "form-text-normal", "js-body" ]
                }
            }, c);
        },
        show: function() {
            this._super.apply(this, arguments), this._$body && this._$body.focus();
        },
        hide: function() {
            this._super.apply(this, arguments), this._$body && this._$body.val("");
        },
        rendered: function() {
            var a = this;
            this._form = new c(this.$view), this._$body = this.$view.find(".js-body"), this._form.commit = function(b) {
                return a._controller.create(b.data.message, b.data.is_job);
            }, this._form.on("success", function() {
                e(a.$view.find(".js-send-message"), [ {
                    message: d.translate("message_dialog_message_success", "Message Sent"),
                    type: "success"
                } ]), setTimeout(function() {
                    this.showButtons(), a.hide();
                }.bind(this), a._controller.constructor.HIDE_DELAY);
            }), this._super.apply(this, arguments);
        }
    };
});
define('be/Controller/Dialog/Message',[ "jquery", "be/xhr", "be/localization", "be/Controller/Dialog/Roulette", "be/View/Dialog/Layover", "be/View/Dialog/Menu", "be/View/Dialog/Popup", "be/trait/message" ], function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i, j = "/v2/inbox/threads";
    return i = d.extend({
        create: function(a, c) {
            var d;
            return d = b({
                url: j,
                type: "POST",
                data: {
                    recipients: this._model.get("id"),
                    message: a,
                    is_job: c
                }
            }), d.then(function() {
                this.trigger("sent");
            }.bind(this)), d;
        },
        render: function(b) {
            a(document.body).hasClass("logged-in") && (this.$source = a(b), this._model.set({
                id: this.$source.data("contact_id"),
                name: this.$source.data("contact_name")
            }), this._super(b));
        }
    }, {
        HIDE_DELAY: 1500,
        init: function(a, b) {
            var c = new this(b);
            return c.setContext(a.find(".js-action-message-user")), c;
        },
        VIEW_CLASS: {
            phone: e.extend(h),
            tablet: f.extend(h),
            desktop: g.extend(h).extend({
                templateData: function() {
                    var a = this._super();
                    return a.title = c.translate("message_dialog_header_named", "Send Message to ") + a.name, 
                    a;
                }
            })
        }
    });
});
define('be/moreToggle',[ "jquery" ], function(a) {
    "use strict";
    function b(b, c) {
        c = c || {}, b.each(function() {
            function b() {
                return e.css("height", "auto").removeClass("hide"), {
                    extended: e.height(),
                    "short": d.height()
                };
            }
            var d = a(this), e = d.next(), f = d.find(".variable-text-link, .js-more-toggle-link"), g = e.find(".variable-text-link, .js-more-toggle-link"), h = "speed" in c ? c.speed : 250;
            e.css({
                overflow: "hidden"
            }), f.on("click.be-moretoggle", function() {
                var a = b();
                d.addClass("hide"), e.css("height", a["short"] + "px").animate({
                    height: a.extended + "px"
                }, h);
            }), g.on("click.be-moretoggle", function() {
                e.animate({
                    height: b()["short"] + "px"
                }, h, function() {
                    d.removeClass("hide"), e.addClass("hide");
                });
            });
        });
    }
    return b.off = function(b) {
        b.each(function() {
            var b = a(this), c = b.next(), d = b.find(".variable-text-link, .js-more-toggle-link"), e = c.find(".variable-text-link, .js-more-toggle-link");
            d.off("click.be-moretoggle"), e.off("click.be-moretoggle");
        });
    }, b.init = function(a) {
        b(a.find(".js-more-toggle"));
    }, b.destroy = function(a) {
        b.off(a.find(".js-more-toggle"));
    }, b;
});
define('be/dateFormatter',[ "jquery", "moment", "beff/Component" ], function(a, b, c) {
    "use strict";
    return c.extend({
        init: function(c, d) {
            d = d || "l", c.find(".js-format-date").each(function(c, e) {
                var f = a(e), g = b(f.data("date")), h = g.format(d);
                h && f.text(h);
            });
        }
    });
});

define("vendor/require/hgn!templates/project/collection", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<form>");t.b("\n" + i);t.b("  <div class=\"form-item form-item-text form-item-conjoined left\">");t.b("\n" + i);t.b("    <input type=\"text\" placeholder=\"");if(t.s(t.f("translate",c,p,1),c,p,0,123,188,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_create_new_collection_placeholder|Create a New Collection");});c.pop();}t.b("\" name=\"collection\" class=\"form-text\">");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"form-item form-item-a form-item-conjoined left\">");t.b("\n" + i);t.b("    <a class=\"form-button form-submit form-button-light-and-grey\">");if(t.s(t.f("translate",c,p,1),c,p,0,393,419,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_add_collection|Add");});c.pop();}t.b("</a>");t.b("\n" + i);t.b("  </div>");t.b("\n");t.b("\n" + i);t.b("  <ul id=\"collection_ids\" class=\"divided-list");if(!t.s(t.f("collections",c,p,1),c,p,1,0,0,"")){t.b(" empty");};t.b("\">");t.b("\n" + i);if(t.s(t.f("collections",c,p,1),c,p,0,554,632,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <li class=\"divided-item collection\" data-key=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.v(t.f("title",c,p,0)));t.b("</li>");t.b("\n" + i);});c.pop();}t.b("  </ul>");t.b("\n" + i);t.b("</form>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<form>\n  <div class=\"form-item form-item-text form-item-conjoined left\">\n    <input type=\"text\" placeholder=\"{{#translate}}project_create_new_collection_placeholder|Create a New Collection{{/translate}}\" name=\"collection\" class=\"form-text\">\n  </div>\n  <div class=\"form-item form-item-a form-item-conjoined left\">\n    <a class=\"form-button form-submit form-button-light-and-grey\">{{#translate}}project_add_collection|Add{{/translate}}</a>\n  </div>\n\n  <ul id=\"collection_ids\" class=\"divided-list{{^collections}} empty{{/collections}}\">\n    {{#collections}}\n    <li class=\"divided-item collection\" data-key=\"{{id}}\">{{title}}</li>\n    {{/collections}}\n  </ul>\n</form>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('project/trait/collection',[ "jquery", "be/localization", "hgn!templates/project/collection", "jquery-plugins/plugins/jquery.changeinput" ], function(a, b, c) {
    "use strict";
    return {
        mustache: c,
        title: "Collections",
        templateData: function() {
            return a.extend({
                classes: [ "list-popup" ],
                title: this.title,
                buttons: [ {
                    label: b.translate("collection_dialog_button_save", "Save"),
                    classes: [ "form-button-default", "collections-save" ]
                } ]
            }, this._model.data());
        },
        rendered: function() {
            this._$saveButton = this.$view.find(".collections-save"), this._super(), this.bindSelections(), 
            this.newCollection(), this.saveCollections();
        },
        saveCollections: function() {
            this.$view.on("click", ".collections-save:not([disabled])", function() {
                this._controller.update(), this.hide(), this._$saveButton.changeInput("disable");
            }.bind(this));
        },
        newCollection: function() {
            var a = this.$view.find("form");
            a.on("submit", function() {
                var b = a.serializeArray(), c = b[0].value;
                return this._controller.create(c).then(function() {
                    this.render(), this.show(), this.position(), this._$saveButton.changeInput("enable");
                }.bind(this)), !1;
            }.bind(this)).on("click", ".form-submit", function() {
                a.submit();
            });
        },
        bindSelections: function() {
            var b = this;
            this._$saveButton.changeInput("disable"), this.select(this._model.get("project_collection_ids")), 
            this.listenTo(this._model, "project_collection_ids", this.select), this.$view.on("click", ".collection", function() {
                var c, d = a(this).data("key"), e = b._model.get("project_collection_ids");
                ~(c = e.indexOf(d)) ? e.splice(c, 1) : e.push(d), b._model.trigger("project_collection_ids", e), 
                b._$saveButton.changeInput("enable");
            });
        },
        select: function(a) {
            return this.$view.find(".collection").removeClass("active"), a && a.forEach(function(a) {
                this.$view.find(".collection[data-key=" + a + "]").addClass("active");
            }, this);
        }
    };
});
define('project/Controller/Collection',[ "moment", "be/xhr", "be/localization", "be/Controller/Dialog/Roulette", "be/View/Dialog/Layover", "be/View/Dialog/Menu", "be/View/Dialog/Popup", "project/trait/collection" ], function(a, b, c, d, e, f, g, h) {
    "use strict";
    return d.extend({
        create: function(c) {
            return b({
                url: "/collection/create",
                type: "POST",
                data: {
                    collection_name: c
                }
            }).then(function(b) {
                var d = b.id, e = +a().format("X");
                if (!d) throw b;
                return {
                    id: d,
                    title: c,
                    owners: [],
                    url: "/collection/" + encodeURIComponent(c) + "/" + d,
                    created_on: e,
                    modified_on: e
                };
            }).then(function(a) {
                return this._model.get("collections").unshift(a), this._model.get("project_collection_ids").unshift(a.id), 
                this.update(), a;
            }.bind(this));
        },
        read: function() {
            var a = b({
                url: "/gallery/collections/" + this._model.id()
            }).then(function(a) {
                if (!a.project_collection_ids) throw a;
                return a.collections.sort(function(b, c) {
                    return a.project_collection_ids.indexOf(+c.id) - a.project_collection_ids.indexOf(+b.id);
                }), a;
            });
            return a.then(this._model.set.bind(this._model)), a;
        },
        update: function() {
            return b({
                url: "/collection/project/" + this._model.id(),
                type: "POST",
                data: {
                    collection_ids: this._model.get("project_collection_ids").join("|")
                }
            });
        },
        render: function() {
            var a = this, b = this._super, c = arguments;
            this.read().then(function() {
                b.apply(a, c);
            }).then(this._view.show.bind(this._view));
        }
    }, {
        init: function(a) {
            var b = a.find(".js-action-collection"), c = b.data("id"), d = new this(c);
            return d.setContext(b), d;
        },
        VIEW_CLASS: {
            phone: e.extend(h),
            tablet: f.extend(h),
            desktop: g.extend(h).mixin({
                title: c.translate("collection_dialog_header", "Add to Collections")
            })
        }
    });
});
define('project/lib/Section',[ "jquery", "beff/Component", "be/Controller/Dialog/Message", "be/follow", "be/moreToggle", "be/timestampFormatter", "be/dateFormatter", "project/Controller/Collection" ], function(a, b, c, d, e, f, g, h) {
    "use strict";
    return b.extend({
        init: function(a) {
            this.$context = a;
        },
        bind: function() {
            this._message = c.init(this.$context), this._collection = h.init(this.$context), 
            d.init(this.$context), e.init(this.$context), f.init(this.$context), g.init(this.$context);
        },
        unbind: function() {
            this._message.destroy(), this._collection.destroy(), e.destroy(this.$context);
        }
    });
});
define('be/trait/form/submit',[ "be/xhr", "jquery", "nbd/trait/promise", "nbd/util/media", "beff/util/validate", "lib/tooltip", "lib/showMessages" ], function(a, b, c, d, e, f, g) {
    "use strict";
    function h(a, b) {
        var c = a[b.name];
        return a[b.name] = c ? [].concat(c, b.value) : b.value, a;
    }
    var i = function(a) {
        var b = {};
        if (Object.keys(a).forEach(function(c) {
            var d = this.find('[name="' + c + '"]').data("validate");
            e(a[c], d) || (b[c] = e.message);
        }, this), Object.keys(b).length) throw b;
        return a;
    };
    return {
        onSubmit: function(b, e, j) {
            e = e || this.$view;
            var k = e.is("form") ? e : e.find("form");
            e.on("click keydown", ".form-submit:not([type=submit])", function(a) {
                switch (a.which) {
                  case 1:
                  case 13:
                  case 32:
                    k.submit();
                }
            }), k.on("submit", function(e) {
                var l = new c(), m = k.serializeArray().reduce(h, {}), n = {
                    url: k.attr("action"),
                    type: k.attr("method") || "POST"
                };
                return e.originalEvent = e.originalEvent || {}, k.find(".form-error").remove(), 
                k.find(".form-item-error").removeClass("form-item-error"), e.originalEvent.promise = (e.isDefaultPrevented() && !k.attr("onsubmit") ? l : l.then(i.bind(k))).then(function(d) {
                    if (n.data = d, "function" != typeof b) return a(n);
                    var e = new c(), f = e.thenable(), g = b.call(f, d);
                    return e.resolve(g === f ? a(n) : g), e;
                }).then(function() {
                    j || k.find(":input").val("").removeAttr("checked selected");
                }, function(a) {
                    var b, c;
                    if (a instanceof Error) return void console.error(a);
                    throw a.responseJSON && (a = a.responseJSON), a.messages && g(k, a.messages), console.warn(a), 
                    b = a.errors || a, c = d.is("desktop") ? [ "form-error" ] : [ "form-error", "form-error-right" ], 
                    Object.keys(b).forEach(function(a) {
                        f(k.find("[name=" + a + "]"), b[a], c);
                    }), a;
                }), l.resolve(m), !1;
            });
        },
        onCancel: function(a) {
            this.$view.on("click", ".form-button-cancel", function() {
                this.$view.find(".form-text, .form-textarea").val(""), "function" == typeof a && a();
            }.bind(this));
        }
    };
});
define('be/trait/form',[ "nbd/util/extend", "be/trait/form/list", "be/trait/form/submit" ], function(a, b, c) {
    "use strict";
    return a({}, c, b);
});

define("vendor/require/hgn!templates/form/_textInner", ["hogan", "vendor/require/hgn!templates/lib/_savingSpinner"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("  ");if(t.s(t.f("label",c,p,1),c,p,0,12,113,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<label for=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.t(t.f("label",c,p,0)));if(t.s(t.f("saving_spinner",c,p,1),c,p,0,62,86,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_savingSpinner0",c,p,""));});c.pop();}t.b("</label>");});c.pop();}t.b("\n" + i);t.b("  <input name=\"");t.b(t.v(t.f("name",c,p,0)));if(!t.s(t.f("name",c,p,1),c,p,1,0,0,"")){t.b(t.v(t.f("id",c,p,0)));};t.b("\" type=\"");if(t.s(t.f("type",c,p,1),c,p,0,188,196,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.v(t.f("type",c,p,0)));});c.pop();}if(!t.s(t.f("type",c,p,1),c,p,1,0,0,"")){t.b("text");};t.b("\" class=\"");if(!t.s(t.f("unstyled",c,p,1),c,p,1,0,0,"")){t.b("form-text");};if(t.s(t.f("classes",c,p,1),c,p,0,283,289,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" ");t.b(t.v(t.d(".",c,p,0)));});c.pop();}t.b(" validate[");t.b(t.v(t.f("validate",c,p,0)));t.b("]\" id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\"");t.b("\n" + i);t.b("  ");if(t.s(t.f("disabled",c,p,1),c,p,0,353,373,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" disabled=\"disabled\"");});c.pop();}t.b("\n" + i);t.b("  ");if(t.s(t.f("placeholder",c,p,1),c,p,0,405,437,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" placeholder=\"");t.b(t.t(t.f("placeholder",c,p,0)));t.b("\"");});c.pop();}t.b("\n" + i);t.b("  ");if(t.s(t.f("autocomplete",c,p,1),c,p,0,473,505,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" autocomplete=\"");t.b(t.v(t.f("autocomplete",c,p,0)));t.b("\"");});c.pop();}t.b("\n" + i);t.b("  ");if(t.s(t.f("autocapitalize",c,p,1),c,p,0,544,580,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" autocapitalize=\"");t.b(t.v(t.f("autocapitalize",c,p,0)));t.b("\"");});c.pop();}t.b("\n" + i);t.b("  ");if(t.s(t.f("autocorrect",c,p,1),c,p,0,618,648,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" autocorrect=\"");t.b(t.v(t.f("autocorrect",c,p,0)));t.b("\"");});c.pop();}t.b("\n" + i);t.b("  ");if(t.s(t.f("value",c,p,1),c,p,0,677,695,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" value=\"");t.b(t.v(t.f("value",c,p,0)));t.b("\"");});c.pop();}t.b("\n" + i);t.b("  ");if(t.s(t.f("maxlength",c,p,1),c,p,0,722,748,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" maxlength=\"");t.b(t.v(t.f("maxlength",c,p,0)));t.b("\"");});c.pop();}t.b("\n" + i);t.b("  data-validate=\"");t.b(t.v(t.f("validate",c,p,0)));t.b("\">");t.b("\n");return t.fl(); },partials: {"<lib/_savingSpinner0":{name:"lib/_savingSpinner", partials: {}, subs: {  }}}, subs: {  }}, "  {{#label}}<label for=\"{{id}}\">{{{label}}}{{#saving_spinner}}{{> lib/_savingSpinner}}{{/saving_spinner}}</label>{{/label}}\n  <input name=\"{{name}}{{^name}}{{id}}{{/name}}\" type=\"{{#type}}{{type}}{{/type}}{{^type}}text{{/type}}\" class=\"{{^unstyled}}form-text{{/unstyled}}{{#classes}} {{.}}{{/classes}} validate[{{validate}}]\" id=\"{{id}}\"\n  {{#disabled}} disabled=\"disabled\"{{/disabled}}\n  {{#placeholder}} placeholder=\"{{{placeholder}}}\"{{/placeholder}}\n  {{#autocomplete}} autocomplete=\"{{autocomplete}}\"{{/autocomplete}}\n  {{#autocapitalize}} autocapitalize=\"{{autocapitalize}}\"{{/autocapitalize}}\n  {{#autocorrect}} autocorrect=\"{{autocorrect}}\"{{/autocorrect}}\n  {{#value}} value=\"{{value}}\"{{/value}}\n  {{#maxlength}} maxlength=\"{{maxlength}}\"{{/maxlength}}\n  data-validate=\"{{validate}}\">\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_savingSpinner": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/form/text", ["hogan", "vendor/require/hgn!templates/form/_textInner"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"");if(!t.s(t.f("unstyled",c,p,1),c,p,1,0,0,"")){t.b("form-item form-item-text");};t.b(" be-placeholder");if(t.s(t.f("containerClasses",c,p,1),c,p,0,98,104,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" ");t.b(t.v(t.d(".",c,p,0)));});c.pop();}t.b("\" id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("-container\">");t.b("\n" + i);t.b(t.rp("<form/_textInner0",c,p,"  "));t.b("</div>");t.b("\n");return t.fl(); },partials: {"<form/_textInner0":{name:"form/_textInner", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"{{^unstyled}}form-item form-item-text{{/unstyled}} be-placeholder{{#containerClasses}} {{.}}{{/containerClasses}}\" id=\"{{id}}-container\">\n  {{>form/_textInner}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "form/_textInner": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_report", ["hogan", "vendor/require/hgn!templates/form/textarea", "vendor/require/hgn!templates/form/text"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"entity-report\">");t.b("\n" + i);t.b("  <form>");t.b("\n" + i);if(t.s(t.f("disclaimer",c,p,1),c,p,0,56,119,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <span class=\"disclaimer-wrap\">");t.b(t.t(t.f("disclaimer",c,p,0)));t.b("</span>");t.b("\n" + i);});c.pop();}t.b("\n" + i);if(t.s(t.d("options.0",c,p,1),c,p,0,154,336,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <ul id=\"reason\" class=\"divided-list menu-section\">");t.b("\n" + i);if(t.s(t.f("options",c,p,1),c,p,0,228,309,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <li class=\"divided-item reason\" data-value=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.v(t.f("reason",c,p,0)));t.b("</li>");t.b("\n" + i);});c.pop();}t.b("    </ul>");t.b("\n" + i);});c.pop();}t.b("\n" + i);t.b("    <div class=\"menu-section\">");t.b("\n" + i);if(t.s(t.f("comments",c,p,1),c,p,0,402,421,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<form/textarea0",c,p,""));});c.pop();}t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("    <div class=\"menu-section\">");t.b("\n" + i);if(t.s(t.f("email",c,p,1),c,p,0,494,509,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<form/text1",c,p,""));});c.pop();}t.b("    </div>");t.b("\n" + i);t.b("  </form>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<form/textarea0":{name:"form/textarea", partials: {}, subs: {  }},"<form/text1":{name:"form/text", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"entity-report\">\n  <form>\n    {{#disclaimer}}\n    <span class=\"disclaimer-wrap\">{{{disclaimer}}}</span>\n    {{/disclaimer}}\n\n    {{#options.0}}\n    <ul id=\"reason\" class=\"divided-list menu-section\">\n      {{#options}}\n      <li class=\"divided-item reason\" data-value=\"{{id}}\">{{reason}}</li>\n      {{/options}}\n    </ul>\n    {{/options.0}}\n\n    <div class=\"menu-section\">\n      {{#comments}}{{> form/textarea}}{{/comments}}\n    </div>\n\n    <div class=\"menu-section\">\n      {{#email}}{{> form/text}}{{/email}}\n    </div>\n  </form>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "form/textarea": arguments[1].template,"form/text": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/trait/report',[ "jquery", "nbd/util/extend", "be/localization", "hgn!templates/lib/_report" ], function(a, b, c, d) {
    "use strict";
    return {
        mustache: d,
        templateData: function() {
            return b({
                title: c.translate("report_popup_header_report", "Report"),
                classes: [ "report" ],
                buttons: [ {
                    label: c.translate("report_popup_button_send", "Send"),
                    classes: [ "left", "form-button-default", "form-submit" ]
                }, {
                    label: c.translate("report_popup_button_cancel", "Cancel"),
                    classes: [ "left", "form-button-cancel" ]
                } ],
                comments: {
                    id: "message",
                    placeholder: c.translate("report_popup_placeholder_comments", "Comments"),
                    classes: [ "form-text-normal" ]
                }
            }, this._model.data(), a(document.body).hasClass("logged-out") ? {
                email: {
                    id: "email",
                    placeholder: c.translate("report_popup_placeholder_email_address", "Email Address"),
                    classes: [ "form-text-normal" ]
                }
            } : {});
        },
        rendered: function() {
            this.selectList(), this.onSubmit(function(a) {
                this._controller.create(a).then(this.hide.bind(this));
            }.bind(this)), this.onCancel(), this._super();
        },
        hide: function() {
            this._super.apply(this, arguments), this.$view = null;
        }
    };
});
define('be/Controller/Report',[ "be/xhr", "be/Controller/Dialog/Roulette", "be/View/Dialog/Layover", "be/View/Dialog/Menu", "be/View/Dialog/Popup", "be/trait/form", "be/trait/report" ], function(a, b, c, d, e, f, g) {
    "use strict";
    return b.extend({
        init: function() {
            this._super.apply(this, arguments), this.path = this._model.get("CONSTANTS").REPORT_URL + this.id;
        },
        create: function(b) {
            return a({
                url: this.path,
                type: "POST",
                data: b
            });
        },
        read: function() {
            var b = a({
                url: this.path
            });
            return b.then(this._model.set.bind(this._model)), b;
        },
        render: function() {
            var a = this, b = this._super, c = arguments;
            this.read().then(function() {
                b.apply(a, c);
            }).then(this._view.show.bind(this._view));
        }
    }, {
        VIEW_CLASS: {
            phone: c.extend(g).mixin(f),
            tablet: d.extend(g).mixin(f),
            desktop: e.extend(g).mixin(f)
        },
        init: function(a) {
            var b = a.find(".js-action-report"), c = b.data("id"), d = b.data("type"), e = "/report/" + d + "/", f = {
                CONSTANTS: {
                    REPORT_URL: e
                }
            }, g = new this(c, f);
            return g.setContext(b), g;
        }
    });
});
define('project/lib/Spam',[ "beff/Component", "be/Controller/Report", "be/spam" ], function(a, b, c) {
    "use strict";
    return a.extend({
        init: function(a) {
            this.$context = a;
        },
        bind: function() {
            this._report = b.init(this.$context), c.delegate(this.$context);
        },
        unbind: function() {
            this._report.destroy(), c.undelegate(this.$context);
        }
    });
});
define('be/remoteLogger',[ "be/window", "beff/util/xhr" ], function(a, b) {
    "use strict";
    function c(a) {
        return Object.keys(a).forEach(function(b) {
            "object" == typeof a[b] ? a[b] = c(a[b]) : a[b] = a[b].toString().substr(0, 200);
        }), a;
    }
    function d(a, b, c, d) {
        if (d = "object" == typeof d ? d : {}, a = a || "ERROR", c = c || "[No message]", 
        b = b || "client_log", -1 === j.indexOf(a)) throw new Error("Unacceptable Level: " + a);
        h.push({
            level: a,
            channel: b,
            messages: [ {
                message: c
            } ],
            context: d
        });
    }
    function e() {
        g = setInterval(function() {
            h.length && i.send();
        }, 1e3);
    }
    function f() {
        g && (clearInterval(g), g = null);
    }
    var g, h = [], i = {}, j = [ "INFO", "ERROR" ];
    return i = {
        log: function(a, b, c, e) {
            return d(a.toUpperCase(), b, c, e), this;
        },
        info: function(a, b, c) {
            return d("INFO", a, b, c), this;
        },
        error: function(a, b, c) {
            return d("ERROR", a, b, c), this;
        },
        send: function() {
            var a, c, d = [];
            for (f(); h.length; ) a = h.pop(), d.push(JSON.stringify(a));
            return c = b({
                url: "/log",
                type: "POST",
                data: {
                    logs: d
                }
            }), c.then(e, e), c;
        },
        getQueue: function() {
            return h;
        },
        getSafeSearch: function() {
            var b = a.getSearchObject();
            return b = c(b);
        },
        init: function() {
            e();
        },
        destroy: function() {
            f(), h = [];
        }
    };
});

define("vendor/require/hgn!templates/be/portfolio", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"portfolio-popup-content-inner\">");t.b("\n" + i);t.b("  <div class=\"portfolio-device-container\">");t.b("\n" + i);t.b("    <div class=\"devices\">");t.b("\n" + i);t.b("      <div class=\"desktop\">");t.b("\n" + i);t.b("        <div class=\"screenshot js-desktop-screenshot\">");t.b("\n" + i);t.b("          <div class=\"project js-project\">");t.b("\n" + i);t.b("            <header class=\"portfolio-header\">");t.b("\n" + i);t.b("              <div class=\"portfolio-name\">");t.b("\n" + i);t.b("                ");t.b(t.v(t.f("displayName",c,p,0)));t.b("\n" + i);t.b("              </div>");t.b("\n" + i);t.b("              <div class=\"portfolio-nav\">");t.b("\n" + i);t.b("                <div class=\"portfolio-nav-item\">");t.b(t.v(t.f("field_1",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("                <div class=\"portfolio-nav-item\">");t.b(t.v(t.f("field_2",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("                <div class=\"portfolio-nav-item\">");if(t.s(t.f("translate",c,p,1),c,p,0,617,649,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_portfolio_nav_1|About Me");});c.pop();}t.b("</div>");t.b("\n" + i);t.b("                <div class=\"portfolio-nav-item\">");if(t.s(t.f("translate",c,p,1),c,p,0,732,763,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_portfolio_nav_2|Contact");});c.pop();}t.b("</div>");t.b("\n" + i);t.b("              </div>");t.b("\n" + i);t.b("            </header>");t.b("\n" + i);t.b("            <iframe class=\"portfolio-iframe\" src=\"");t.b(t.v(t.f("projectSrc",c,p,0)));t.b("\"></iframe>");t.b("\n" + i);t.b("          </div>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("        <div class=\"device\"></div>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("      <div class=\"mobile\">");t.b("\n" + i);t.b("        <div class=\"screenshot js-mobile-screenshot\">");t.b("\n" + i);t.b("          <header class=\"portfolio-header js-header\">");t.b("\n" + i);t.b("            <div class=\"portfolio-name\">");t.b("\n" + i);t.b("              ");t.b(t.v(t.f("displayName",c,p,0)));t.b("\n" + i);t.b("            </div>");t.b("\n" + i);t.b("            <div class=\"hamburger-icon\">");t.b("\n" + i);t.b("              <div class=\"hamburger-part\"></div>");t.b("\n" + i);t.b("              <div class=\"hamburger-part\"></div>");t.b("\n" + i);t.b("              <div class=\"hamburger-part\"></div>");t.b("\n" + i);t.b("            </div>");t.b("\n" + i);t.b("          </header>");t.b("\n" + i);t.b("          <div class=\"cover cover-1\" style=\"background-image: url('");t.b(t.v(t.f("cover_1",c,p,0)));t.b("')\"></div>");t.b("\n" + i);t.b("          <div class=\"cover cover-2\" style=\"background-image: url('");t.b(t.v(t.f("cover_2",c,p,0)));t.b("')\"></div>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("        <div class=\"device\"></div>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"portfolio-details-container\">");t.b("\n" + i);t.b("    <div class=\"portfolio-title\">");t.b("\n" + i);t.b("      ");if(t.s(t.f("translate",c,p,1),c,p,0,1794,1910,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_portfolio_title|Now that you've published a project, build a custom website in minutes with Adobe Portfolio.");});c.pop();}t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <ul class=\"portfolio-list\">");t.b("\n" + i);if(t.s(t.f("paidCC",c,p,1),c,p,0,1985,2148,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <li class=\"cc\">");if(t.s(t.f("translate",c,p,1),c,p,0,2023,2122,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_portfolio_list_1_alt|You're a Creative Cloud member, so Portfolio is FREE with your CC plan");});c.pop();}t.b("</li>");t.b("\n" + i);});c.pop();}if(!t.s(t.f("paidCC",c,p,1),c,p,1,0,0,"")){t.b("        <li>");if(t.s(t.f("translate",c,p,1),c,p,0,2204,2268,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_portfolio_list_1|Free with any Adobe Creative Cloud plan");});c.pop();}t.b("</li>");t.b("\n" + i);};t.b("      <li>");if(t.s(t.f("translate",c,p,1),c,p,0,2330,2373,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_portfolio_list_2|Syncs with Behance");});c.pop();}t.b("</li>");t.b("\n" + i);t.b("      <li>");if(t.s(t.f("translate",c,p,1),c,p,0,2417,2460,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_portfolio_list_3|Responsive layouts");});c.pop();}t.b("</li>");t.b("\n" + i);t.b("      <li>");if(t.s(t.f("translate",c,p,1),c,p,0,2504,2553,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_portfolio_list_4|Access all Typekit fonts");});c.pop();}t.b("</li>");t.b("\n" + i);t.b("    </ul>");t.b("\n" + i);t.b("    <a href=\"#\" id=\"portfolio-button\" class=\"js-portfolio-button form-button form-button-massive form-button-default\">");if(t.s(t.f("translate",c,p,1),c,p,0,2715,2763,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_portfolio_start|Start Your Portfolio Now");});c.pop();}t.b("</a>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"portfolio-popup-content-inner\">\n  <div class=\"portfolio-device-container\">\n    <div class=\"devices\">\n      <div class=\"desktop\">\n        <div class=\"screenshot js-desktop-screenshot\">\n          <div class=\"project js-project\">\n            <header class=\"portfolio-header\">\n              <div class=\"portfolio-name\">\n                {{displayName}}\n              </div>\n              <div class=\"portfolio-nav\">\n                <div class=\"portfolio-nav-item\">{{field_1}}</div>\n                <div class=\"portfolio-nav-item\">{{field_2}}</div>\n                <div class=\"portfolio-nav-item\">{{#translate}}project_portfolio_nav_1|About Me{{/translate}}</div>\n                <div class=\"portfolio-nav-item\">{{#translate}}project_portfolio_nav_2|Contact{{/translate}}</div>\n              </div>\n            </header>\n            <iframe class=\"portfolio-iframe\" src=\"{{projectSrc}}\"></iframe>\n          </div>\n        </div>\n        <div class=\"device\"></div>\n      </div>\n      <div class=\"mobile\">\n        <div class=\"screenshot js-mobile-screenshot\">\n          <header class=\"portfolio-header js-header\">\n            <div class=\"portfolio-name\">\n              {{displayName}}\n            </div>\n            <div class=\"hamburger-icon\">\n              <div class=\"hamburger-part\"></div>\n              <div class=\"hamburger-part\"></div>\n              <div class=\"hamburger-part\"></div>\n            </div>\n          </header>\n          <div class=\"cover cover-1\" style=\"background-image: url('{{cover_1}}')\"></div>\n          <div class=\"cover cover-2\" style=\"background-image: url('{{cover_2}}')\"></div>\n        </div>\n        <div class=\"device\"></div>\n      </div>\n    </div>\n  </div>\n  <div class=\"portfolio-details-container\">\n    <div class=\"portfolio-title\">\n      {{#translate}}project_portfolio_title|Now that you've published a project, build a custom website in minutes with Adobe Portfolio.{{/translate}}\n    </div>\n    <ul class=\"portfolio-list\">\n      {{#paidCC}}\n        <li class=\"cc\">{{#translate}}project_portfolio_list_1_alt|You're a Creative Cloud member, so Portfolio is FREE with your CC plan{{/translate}}</li>\n      {{/paidCC}}\n      {{^paidCC}}\n        <li>{{#translate}}project_portfolio_list_1|Free with any Adobe Creative Cloud plan{{/translate}}</li>\n      {{/paidCC}}\n      <li>{{#translate}}project_portfolio_list_2|Syncs with Behance{{/translate}}</li>\n      <li>{{#translate}}project_portfolio_list_3|Responsive layouts{{/translate}}</li>\n      <li>{{#translate}}project_portfolio_list_4|Access all Typekit fonts{{/translate}}</li>\n    </ul>\n    <a href=\"#\" id=\"portfolio-button\" class=\"js-portfolio-button form-button form-button-massive form-button-default\">{{#translate}}project_portfolio_start|Start Your Portfolio Now{{/translate}}</a>\n  </div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/Controller/PortfolioPopup',[ "jquery", "nbd/Promise", "nbd/util/extend", "be/Controller/Dialog/Roulette", "be/remoteLogger", "be/View/Dialog/Popup", "be/window", "be/xhr", "hgn!templates/be/portfolio" ], function(a, b, c, d, e, f, g, h, i) {
    "use strict";
    var j = f.extend({
        mustache: i,
        templateData: function() {
            var a = this._model.data();
            return a.classes = [ "portfolio-modal", "hide-phone" ], a;
        },
        rendered: function() {
            this._super(), this._controller.log("portfolio_upsell_rendered"), this._bindClickEvents(), 
            this._autoScaleContent(), a(window).on("resize.be-controller-portfoliopopup", this._autoScaleContent.bind(this));
        },
        _bindClickEvents: function() {
            a(".js-portfolio-button").click(function() {
                this._controller.log("portfolio_upsell_clicked"), g.open("https://myportfolio.com", "_blank"), 
                this.hide();
            }.bind(this));
        },
        _autoScaleContent: function() {
            this._autoScaleDesktopContent(), this._autoScaleMobileContent(), this.position();
        },
        _autoScaleDesktopContent: function() {
            var a = this.$view.find(".js-desktop-screenshot"), b = a.find(".js-project"), c = .9;
            this._scale(a, b, c);
        },
        _autoScaleMobileContent: function() {
            var a = this.$view.find(".js-mobile-screenshot"), b = a.find(".js-header");
            this._scale(a, b);
        },
        _scale: function(a, b, c) {
            c = c || 1, b.css({
                transform: "scale(" + a.width() / b.width() * c + ")"
            });
        },
        hide: function() {
            this._super(), a(window).off("resize.be-controller-portfoliopopup");
        }
    });
    return d.extend({
        init: function() {
            this._super.apply(this, arguments), this.relay(this._view, "hide");
        },
        _getData: function(a) {
            var c = this._getUserProjects(a.userId), d = this._getUserData(a.userId);
            return b.all([ c, d ]).then(function(b) {
                var c = b[0].projects, d = b[1].user;
                return {
                    paidCC: a.paidCC,
                    displayName: d.display_name,
                    cover_1: c[0].covers[404],
                    cover_2: c[1].covers[404],
                    field_1: d.fields[0] || "",
                    field_2: d.fields[1] || "",
                    projectSrc: g.getLocation("href") + "&iframe=1&minimal=1",
                    numProjects: c.length
                };
            }.bind(this));
        },
        _getUserProjects: function(a) {
            return h({
                url: "/v2/users/" + a + "/projects",
                type: "GET"
            });
        },
        _getUserData: function(a) {
            return h({
                url: "/v2/users/" + a,
                type: "GET"
            });
        },
        log: function(a) {
            e.info("project_publish", a, {
                paidCC: this._model.get("paidCC"),
                numProjects: this._model.get("numProjects")
            });
        },
        render: function(a) {
            var b = this._super.bind(this);
            return this._getData(a).then(function(a) {
                return this._model.set(a), b();
            }.bind(this), function() {
                this.trigger("hide");
            }.bind(this));
        }
    }, {
        VIEW_CLASS: {
            desktop: j,
            tablet: j,
            mobile: j
        }
    });
});

define("vendor/require/hgn!templates/be/share", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"promote-dialog\">");t.b("\n" + i);t.b("  <div class=\"promote-buttons\">");t.b("\n" + i);t.b("    <h2>");if(t.s(t.f("translate",c,p,1),c,p,0,200,249,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_popup_promote_your_work|Promote Your Work");});c.pop();}t.b("</h2>");t.b("\n" + i);t.b("    <div class=\"js-viral-share-buttons ss-social promote-fb\" data-service=\"facebook\">facebook</div>");t.b("\n" + i);t.b("    <div class=\"js-viral-share-buttons ss-social promote-twitter\" data-service=\"twitter\">twitter</div>");t.b("\n" + i);t.b("    <div class=\"js-viral-share-buttons ss-social promote-linkedin\" data-service=\"linkedin\">linkedin</div>");t.b("\n" + i);t.b("    <div class=\"js-viral-share-buttons ss-social promote-pinterest\" data-service=\"pinterest\">pinterest</div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"promote-url\">");t.b("\n" + i);t.b("    <div class=\"beicons-pre beicons-pre-link js-share-url-icon\"></div>");t.b("\n" + i);t.b("    <input type=\"text\" class=\"form-text form-text-normal js-share-url\" value=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" readonly=\"readonly\" />");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div id=\"promote-dialog\">\n  {{!\n  <div class=\"beicons-pre beicons-pre-check-circle\"></div>\n  <h1>Your project was successfully uploaded</h1>\n  }}\n  <div class=\"promote-buttons\">\n    <h2>{{#translate}}project_popup_promote_your_work|Promote Your Work{{/translate}}</h2>\n    <div class=\"js-viral-share-buttons ss-social promote-fb\" data-service=\"facebook\">facebook</div>\n    <div class=\"js-viral-share-buttons ss-social promote-twitter\" data-service=\"twitter\">twitter</div>\n    <div class=\"js-viral-share-buttons ss-social promote-linkedin\" data-service=\"linkedin\">linkedin</div>\n    <div class=\"js-viral-share-buttons ss-social promote-pinterest\" data-service=\"pinterest\">pinterest</div>\n  </div>\n  <div class=\"promote-url\">\n    <div class=\"beicons-pre beicons-pre-link js-share-url-icon\"></div>\n    <input type=\"text\" class=\"form-text form-text-normal js-share-url\" value=\"{{url}}\" readonly=\"readonly\" />\n  </div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/Controller/Share',[ "jquery", "nbd/util/extend", "be/Controller/Dialog/Roulette", "be/View/Dialog/Popup", "be/window", "be/history", "hgn!templates/be/share" ], function(a, b, c, d, e, f, g) {
    "use strict";
    var h = d.extend({
        mustache: g,
        shareUrl: e.getLocation().href.replace(/\?share=1$/, "").replace(/share=1&?/, ""),
        hide: function() {
            this._super(), f.replaceState(f.getState(), document.title, e.getLocation("search").replace(/share=1&?/, ""));
        },
        templateData: function() {
            return {
                url: this.shareUrl,
                classes: [ "promote-dialog" ],
                fullBleed: !0
            };
        },
        rendered: function() {
            this._super();
            var b = this.shareUrl, c = encodeURIComponent(this._model.get("text")), d = encodeURIComponent(this._model.get("image")), f = this.$view.find(".js-share-url");
            this.$view.find(".js-viral-share-buttons").each(function() {
                a(this).on("click.beff-util-social", function() {
                    var f = a(this).data("service");
                    switch (f) {
                      case "facebook":
                        e.open("http://www.facebook.com/sharer/sharer.php?u=" + b + "&t=" + c, "", "toolbar=0, status=0, width=900, height=500");
                        break;

                      case "twitter":
                        e.open("https://twitter.com/intent/tweet?text=" + c, "", "toolbar=0, status=0, width=650, height=360");
                        break;

                      case "linkedin":
                        e.open("https://www.linkedin.com/cws/share?url=" + b + "&token=&isFramed=true", "", "toolbar=no,width=550,height=550");
                        break;

                      case "pinterest":
                        e.open("http://pinterest.com/pin/create/button/?url=" + b + "&media=" + d + "&description=" + c, "", "toolbar=no,width=700,height=300");
                    }
                    return !1;
                });
            }), this.$view.find(".js-share-url-icon").on("click", function() {
                f.focus().select();
            }), f.on("click", function() {
                a(this).select();
            });
        }
    });
    return c.extend({}, {
        VIEW_CLASS: {
            desktop: h
        }
    });
});

define("vendor/require/hgn!templates/galleries/unverified", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"unverified-modal-content\">");t.b("\n" + i);t.b("  <div class=\"unverified-message\">");t.b("\n" + i);t.b("    ");if(t.s(t.f("translate",c,p,1),c,p,0,92,212,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_unverified_popup_message|Your project is currently not visible publicly because your account<br />is unverified.");});c.pop();}t.b("\n" + i);t.b("  </div>");t.b("\n");t.b("\n" + i);t.b("  <div class=\"verify-warning notice-box\">");t.b("\n" + i);t.b("    <p class=\"verify-warning-body\">");t.b("\n" + i);t.b("      ");if(t.s(t.f("translate",c,p,1),c,p,0,335,460,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_unverified_popup_warning_inbox|Please check your inbox ");if(t.s(t.f("email",c,p,1),c,p,0,408,419,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("(");t.b(t.v(t.f("email",c,p,0)));t.b(")");});c.pop();}t.b(" and verify your email address.");});c.pop();}t.b("<br />");t.b("\n" + i);t.b("      ");if(t.s(t.f("translate",c,p,1),c,p,0,501,582,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_unverified_popup_warning_email|Haven't received a verification email yet?");});c.pop();}t.b("\n" + i);t.b("      <br />");t.b("\n" + i);t.b("      <a href=\"");t.b(t.v(t.f("verification_url",c,p,0)));t.b("\">");if(t.s(t.f("translate",c,p,1),c,p,0,661,707,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_unverified_popup_click_here|Click Here");});c.pop();}t.b("</a>.");t.b("\n" + i);t.b("    </p>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"unverified-modal-content\">\n  <div class=\"unverified-message\">\n    {{#translate}}project_unverified_popup_message|Your project is currently not visible publicly because your account<br />is unverified.{{/translate}}\n  </div>\n\n  <div class=\"verify-warning notice-box\">\n    <p class=\"verify-warning-body\">\n      {{#translate}}project_unverified_popup_warning_inbox|Please check your inbox {{#email}}({{email}}){{/email}} and verify your email address.{{/translate}}<br />\n      {{#translate}}project_unverified_popup_warning_email|Haven't received a verification email yet?{{/translate}}\n      <br />\n      <a href=\"{{verification_url}}\">{{#translate}}project_unverified_popup_click_here|Click Here{{/translate}}</a>.\n    </p>\n  </div>\n</div>", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('project/lib/startup',[ "jquery", "log", "nbd/util/media", "be/modal/simple", "be/localization", "be/Controller/PortfolioPopup", "be/Controller/Share", "hgn!templates/galleries/unverified" ], function(a, b, c, d, e, f, g, h) {
    "use strict";
    return b = b.get("project/lib/startup"), {
        _share: function(a) {
            var b = new g({
                text: a.promote.share_text,
                image: a.promote.image
            });
            b.render();
        },
        _portfolio: function(a) {
            var b = new f();
            return b.on("hide", this._share.bind(this, a)).render({
                userId: a.portfolio.user,
                paidCC: a.portfolio.provisioned
            });
        },
        _fixBackButton: function() {
            var b = window.location.href;
            a(window).on("popstate.project-lib-startup", function(a) {
                a.originalEvent && b !== window.location.href && window.location.replace(window.location.href);
            });
        },
        destroy: function() {
            a(window).off("popstate.project-lib-startup");
        },
        init: function(a) {
            if (this._fixBackButton(), a.unverified) d({
                title: e.translate("project_unverified_popup_title", "Your project is private"),
                classes: [ "unverified-modal" ],
                html: h({
                    verification_url: a.ADOBE_VERIFY,
                    email: a.email
                })
            }); else {
                if (a.portfolio && (c.is("desktop") || c.is("tablet"))) return this._portfolio(a);
                if (a.promote && c.is("desktop")) return this._share(a);
            }
        }
    };
});
define('beff/dom/truncate',[],function() {
    "use strict";
    function a(a) {
        if (a.length && document.createRange) {
            var b, c = document.createRange();
            if (c.getBoundingClientRect && (b = /[^\s]/.exec(a.textContent))) return c.setStartBefore(a), 
            c.setEnd(a, b.index + 1), c;
        }
    }
    function b(a, b) {
        return a.setEndAfter(b), c(a);
    }
    function c(a) {
        return a.getBoundingClientRect().height;
    }
    return function(d, e) {
        var f = a(d);
        if (f) {
            var g, h = c(f), i = h * (e + .5), j = d.length, k = j, l = -1;
            if (b(f, d) < i) return void f.detach();
            for (;k; ) k = ~~(k / 2), j += l * k, f.setEnd(d, j), l * (c(f) - i) > 0 && (l = -l);
            g = d.textContent.substr(0, j).replace(/\s+$/, "");
            do d.textContent = g + "…", h = b(f, d), g = g.substr(0, --j); while (h > i);
            f.detach();
        }
    };
});

define("vendor/require/hgn!templates/notifications/appreciation", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"msg extra-padding\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,48,196,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_appreciated|<a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\" class=\"js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("</a> appreciated your project");});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n" + i);t.b("<a href=\"");t.b(t.v(t.d("project.url",c,p,0)));t.b("\" class=\"graphic\">");t.b("\n" + i);t.b("  <div class=\"activity-block project-appreciated\">");t.b("\n" + i);t.b("    <div data-picture=\"\" data-alt=\"");t.b(t.v(t.d("project.name",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <div alt=\"");t.b(t.v(t.d("project.name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("project.covers.115",c,p,0)));t.b("\" data-class=\"project_image\" data-title=\"");t.b(t.v(t.d("project.name",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("    <div alt=\"");t.b(t.v(t.d("project.name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("project.covers.202",c,p,0)));t.b("\" data-class=\"project_image project_image-2x\" data-title=\"");t.b(t.v(t.d("project.name",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("      (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("      (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("      (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("      (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <noscript><img alt=\"");t.b(t.v(t.d("project.name",c,p,0)));t.b("\" title=\"");t.b(t.v(t.d("project.name",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("project.covers.115",c,p,0)));t.b("\" class=\"project_image\" /></noscript>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</a>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"msg extra-padding\">\n  {{#translate}}notifications_appreciated|<a href=\"{{actor.url}}\" class=\"js-mini-profile\" data-id=\"{{actor.id}}\">{{actor.display_name}}</a> appreciated your project{{/translate}}\n</div>\n<a href=\"{{project.url}}\" class=\"graphic\">\n  <div class=\"activity-block project-appreciated\">\n    <div data-picture=\"\" data-alt=\"{{project.name}}\">\n    <div alt=\"{{project.name}}\" data-src=\"{{project.covers.115}}\" data-class=\"project_image\" data-title=\"{{project.name}}\"></div>\n    <div alt=\"{{project.name}}\" data-src=\"{{project.covers.202}}\" data-class=\"project_image project_image-2x\" data-title=\"{{project.name}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n      (min--moz-device-pixel-ratio: 1.3),\n      (-o-min-device-pixel-ratio: 4/3),\n      (min-device-pixel-ratio: 1.3),\n      (min-resolution: 1.3dppx)\"></div>\n    </div>\n    <noscript><img alt=\"{{project.name}}\" title=\"{{project.name}}\" src=\"{{project.covers.115}}\" class=\"project_image\" /></noscript>\n  </div>\n</a>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/collection", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"msg\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,34,231,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_followed_collection|<span class=\"js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("</span> followed your collection \"<a href=\"");t.b(t.v(t.d("collection.url",c,p,0)));t.b("\">");t.b(t.v(t.d("collection.title",c,p,0)));t.b("</a>\"");});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"msg\">\n  {{#translate}}notifications_followed_collection|<span class=\"js-mini-profile\" data-id=\"{{actor.id}}\">{{actor.display_name}}</span> followed your collection \"<a href=\"{{collection.url}}\">{{collection.title}}</a>\"{{/translate}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/comment", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("#comments\" class=\"graphic\">");t.b("\n" + i);t.b("  <div data-picture=\"\" data-alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("covers.115",c,p,0)));t.b("\" data-class=\"comment-image\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("    <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("covers.202",c,p,0)));t.b("\" data-class=\"comment-image comment-image-2x\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("        (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("        (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("        (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("        (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <noscript><img alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("covers.115",c,p,0)));t.b("\" class=\"comment-image\" /></noscript>");t.b("\n");t.b("\n" + i);t.b("  <div class=\"comment\">");t.b("\n" + i);t.b("    <strong class=\"actor js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b(":</strong> <span class=\"comment-text\">");t.b(t.v(t.d("comment.comment",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</a>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<a href=\"{{url}}#comments\" class=\"graphic\">\n  <div data-picture=\"\" data-alt=\"{{name}}\">\n    <div alt=\"{{name}}\" data-src=\"{{covers.115}}\" data-class=\"comment-image\" data-title=\"{{name}}\"></div>\n    <div alt=\"{{name}}\" data-src=\"{{covers.202}}\" data-class=\"comment-image comment-image-2x\" data-title=\"{{name}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n        (min--moz-device-pixel-ratio: 1.3),\n        (-o-min-device-pixel-ratio: 4/3),\n        (min-device-pixel-ratio: 1.3),\n        (min-resolution: 1.3dppx)\"></div>\n  </div>\n  <noscript><img alt=\"{{name}}\" title=\"{{name}}\" src=\"{{covers.115}}\" class=\"comment-image\" /></noscript>\n\n  <div class=\"comment\">\n    <strong class=\"actor js-mini-profile\" data-id=\"{{actor.id}}\">{{actor.display_name}}:</strong> <span class=\"comment-text\">{{comment.comment}}</span>\n  </div>\n</a>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/wip_comment", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" class=\"graphic\">");t.b("\n" + i);t.b("  <div data-picture=\"\" data-alt=\"");t.b(t.v(t.d("wip.title",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <div alt=\"");t.b(t.v(t.d("wip.title",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("revision.images.thumbnail_sm.url",c,p,0)));t.b("\" data-class=\"comment-image\" data-title=\"");t.b(t.v(t.d("wip.title",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("    <div alt=\"");t.b(t.v(t.d("wip.title",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("revision.images.thumbnail.url",c,p,0)));t.b("\" data-class=\"comment-image comment-image-2x\" data-title=\"");t.b(t.v(t.d("wip.title",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("        (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("        (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("        (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("        (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <noscript><img alt=\"");t.b(t.v(t.d("wip.title",c,p,0)));t.b("\" title=\"");t.b(t.v(t.d("wip.title",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("revision.images.thumbnail_sm.url",c,p,0)));t.b("\" class=\"comment-image\" /></noscript>");t.b("\n");t.b("\n" + i);t.b("  <div class=\"comment wip-notification-comment\">");t.b("\n" + i);t.b("    <strong class=\"actor js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b(": </strong><span class=\"comment-text\">");t.b(t.v(t.d("comment.comment",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</a>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<a href=\"{{url}}\" class=\"graphic\">\n  <div data-picture=\"\" data-alt=\"{{wip.title}}\">\n    <div alt=\"{{wip.title}}\" data-src=\"{{revision.images.thumbnail_sm.url}}\" data-class=\"comment-image\" data-title=\"{{wip.title}}\"></div>\n    <div alt=\"{{wip.title}}\" data-src=\"{{revision.images.thumbnail.url}}\" data-class=\"comment-image comment-image-2x\" data-title=\"{{wip.title}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n        (min--moz-device-pixel-ratio: 1.3),\n        (-o-min-device-pixel-ratio: 4/3),\n        (min-device-pixel-ratio: 1.3),\n        (min-resolution: 1.3dppx)\"></div>\n  </div>\n  <noscript><img alt=\"{{wip.title}}\" title=\"{{wip.title}}\" src=\"{{revision.images.thumbnail_sm.url}}\" class=\"comment-image\" /></noscript>\n\n  <div class=\"comment wip-notification-comment\">\n    <strong class=\"actor js-mini-profile\" data-id=\"{{actor.id}}\">{{actor.display_name}}: </strong><span class=\"comment-text\">{{comment.comment}}</span>\n  </div>\n</a>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/comment_stub", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"graphic\">");t.b("\n" + i);t.b("  <div class=\"project-comment-wrap\">");t.b("\n" + i);t.b("    <div class=\"activity-block project-comment\">");t.b("\n" + i);if(t.s(t.f("project",c,p,1),c,p,0,126,138,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<comment0",c,p,""));});c.pop();}if(t.s(t.f("revision",c,p,1),c,p,0,170,186,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<wip_comment1",c,p,""));});c.pop();}t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {"<comment0":{name:"comment", partials: {}, subs: {  }},"<wip_comment1":{name:"wip_comment", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"graphic\">\n  <div class=\"project-comment-wrap\">\n    <div class=\"activity-block project-comment\">\n      {{#project}}{{>comment}}{{/project}}\n      {{#revision}}{{>wip_comment}}{{/revision}}\n    </div>\n  </div>\n</div>", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/followed", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"msg\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,34,178,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_followed_work|<a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\" class=\"js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("</a> followed your work");});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"msg\">\n  {{#translate}}notifications_followed_work|<a href=\"{{actor.url}}\" class=\"js-mini-profile\" data-id=\"{{actor.id}}\">{{actor.display_name}}</a> followed your work{{/translate}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/mention", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"msg extra-padding\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,48,149,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_mentioned|<a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("</a> mentioned you in a comment");});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n" + i);t.b("<div class=\"graphic\">");t.b("\n" + i);t.b("  <div class=\"mention-wrap\">");t.b("\n" + i);t.b("    <div class=\"activity-block mention\">");t.b("\n" + i);if(t.s(t.f("project",c,p,1),c,p,0,281,293,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<comment0",c,p,""));});c.pop();}if(t.s(t.f("revision",c,p,1),c,p,0,325,341,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<wip_comment1",c,p,""));});c.pop();}t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {"<comment0":{name:"comment", partials: {}, subs: {  }},"<wip_comment1":{name:"wip_comment", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"msg extra-padding\">\n  {{#translate}}notifications_mentioned|<a href=\"{{actor.url}}\">{{actor.display_name}}</a> mentioned you in a comment{{/translate}}\n</div>\n<div class=\"graphic\">\n  <div class=\"mention-wrap\">\n    <div class=\"activity-block mention\">\n      {{#project}}{{>comment}}{{/project}}\n      {{#revision}}{{>wip_comment}}{{/revision}}\n    </div>\n  </div>\n</div>", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/saved", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"msg extra-padding\">");t.b("\n" + i);if(t.s(t.f("translate",c,p,1),c,p,0,46,218,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_saved|<a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\" class=\"js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("</a> saved \"<a href=\"");t.b(t.v(t.d("project.url",c,p,0)));t.b("\">");t.b(t.v(t.d("project.name",c,p,0)));t.b("</a>\"");});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n" + i);t.b("<a href=\"");t.b(t.v(t.d("collection.url",c,p,0)));t.b("\" class=\"graphic\">");t.b("\n" + i);t.b("  <div class=\"activity-block project-collection\">");t.b("\n");t.b("\n" + i);if(t.s(t.d("collection.latest_projects",c,p,1),c,p,0,372,1068,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <div class=\"collection-project-image-wrap\" data-picture=\"\" data-alt=\"");t.b(t.v(t.d("collection.title",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("covers.115",c,p,0)));t.b("\" data-class=\"collection-project-image\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("    <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("covers.202",c,p,0)));t.b("\" data-class=\"collection-project-image collection-project-image-2x\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("      (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("      (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("      (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("      (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <noscript><img alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("covers.115",c,p,0)));t.b("\" class=\"collection-project-image\" /></noscript>");t.b("\n" + i);});c.pop();}t.b("    <div class=\"collection-title\">");t.b("\n" + i);t.b("      <span class=\"collection-title-text beicons-pre beicons-pre-collection\">");t.b(t.v(t.d("collection.title",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</a>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"msg extra-padding\">\n{{#translate}}notifications_saved|<a href=\"{{actor.url}}\" class=\"js-mini-profile\" data-id=\"{{actor.id}}\">{{actor.display_name}}</a> saved \"<a href=\"{{project.url}}\">{{project.name}}</a>\"{{/translate}}\n</div>\n<a href=\"{{collection.url}}\" class=\"graphic\">\n  <div class=\"activity-block project-collection\">\n\n    {{#collection.latest_projects}}\n    <div class=\"collection-project-image-wrap\" data-picture=\"\" data-alt=\"{{collection.title}}\">\n    <div alt=\"{{name}}\" data-src=\"{{covers.115}}\" data-class=\"collection-project-image\" data-title=\"{{name}}\"></div>\n    <div alt=\"{{name}}\" data-src=\"{{covers.202}}\" data-class=\"collection-project-image collection-project-image-2x\" data-title=\"{{name}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n      (min--moz-device-pixel-ratio: 1.3),\n      (-o-min-device-pixel-ratio: 4/3),\n      (min-device-pixel-ratio: 1.3),\n      (min-resolution: 1.3dppx)\"></div>\n    </div>\n    <noscript><img alt=\"{{name}}\" title=\"{{name}}\" src=\"{{covers.115}}\" class=\"collection-project-image\" /></noscript>\n    {{/collection.latest_projects}}\n    <div class=\"collection-title\">\n      <span class=\"collection-title-text beicons-pre beicons-pre-collection\">{{collection.title}}</span>\n    </div>\n  </div>\n</a>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/social", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("translate",c,p,1),c,p,0,14,190,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_social|<div class=\"msg\">Your ");t.b(t.v(t.f("app",c,p,0)));t.b(" friend <a class=\"js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\" href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("</a> joined Behance</div>");});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "{{#translate}}notifications_social|<div class=\"msg\">Your {{app}} friend <a class=\"js-mini-profile\" data-id=\"{{actor.id}}\" href=\"{{actor.url}}\">{{actor.display_name}}</a> joined Behance</div>{{/translate}}", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/_userProjects", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" class=\"graphic\">");t.b("\n" + i);t.b("<div class=\"activity-block project-collection user-projects\">");t.b("\n" + i);if(t.s(t.f("latest_projects",c,p,1),c,p,0,119,791,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <div class=\"collection-project-image-wrap\" data-picture=\"\" data-alt=\"");t.b(t.v(t.f("display_name",c,p,0)));t.b("\">");t.b("\n" + i);t.b("  <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("covers.115",c,p,0)));t.b("\" data-class=\"collection-project-image\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("  <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("covers.202",c,p,0)));t.b("\" data-class=\"collection-project-image collection-project-image-2x\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("    (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("    (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("    (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("    (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <noscript><img alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("covers.115",c,p,0)));t.b("\" class=\"collection-project-image\" /></noscript>");t.b("\n" + i);});c.pop();}t.b("</div>");t.b("\n" + i);t.b("</a>");return t.fl(); },partials: {}, subs: {  }}, "<a href=\"{{url}}\" class=\"graphic\">\n<div class=\"activity-block project-collection user-projects\">\n  {{#latest_projects}}\n  <div class=\"collection-project-image-wrap\" data-picture=\"\" data-alt=\"{{display_name}}\">\n  <div alt=\"{{name}}\" data-src=\"{{covers.115}}\" data-class=\"collection-project-image\" data-title=\"{{name}}\"></div>\n  <div alt=\"{{name}}\" data-src=\"{{covers.202}}\" data-class=\"collection-project-image collection-project-image-2x\" data-title=\"{{name}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n    (min--moz-device-pixel-ratio: 1.3),\n    (-o-min-device-pixel-ratio: 4/3),\n    (min-device-pixel-ratio: 1.3),\n    (min-resolution: 1.3dppx)\"></div>\n  </div>\n  <noscript><img alt=\"{{name}}\" title=\"{{name}}\" src=\"{{covers.115}}\" class=\"collection-project-image\" /></noscript>\n  {{/latest_projects}}\n</div>\n</a>", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/shortlist", ["hogan", "vendor/require/hgn!templates/notifications/_userProjects"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"msg\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,34,224,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_short_list|");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b(" added <a href=\"");t.b(t.v(t.d("user.url",c,p,0)));t.b("\">");t.b(t.v(t.d("user.display_name",c,p,0)));t.b("</a> to your &ldquo;<a href=\"");t.b(t.v(t.d("job._links.recruiter",c,p,0)));t.b("\"</a>");t.b(t.v(t.d("job.title",c,p,0)));t.b("</a>&rdquo; shortlist");});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n" + i);if(t.s(t.d("user.latest_projects.0",c,p,1),c,p,0,273,328,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("user",c,p,1),c,p,0,283,318,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<notifications/_userProjects0",c,p,""));});c.pop();}});c.pop();}return t.fl(); },partials: {"<notifications/_userProjects0":{name:"notifications/_userProjects", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"msg\">\n  {{#translate}}notifications_short_list|{{actor.display_name}} added <a href=\"{{user.url}}\">{{user.display_name}}</a> to your &ldquo;<a href=\"{{job._links.recruiter}}\"</a>{{job.title}}</a>&rdquo; shortlist{{/translate}}\n</div>\n{{#user.latest_projects.0}}\n{{#user}}\n{{> notifications/_userProjects}}\n{{/user}}\n{{/user.latest_projects.0}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "notifications/_userProjects": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/discovered", ["hogan", "vendor/require/hgn!templates/notifications/_userProjects"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"msg\">");t.b("\n" + i);if(t.s(t.f("translate",c,p,1),c,p,0,32,221,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_added_search|");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b(" added <a href=\"");t.b(t.v(t.d("user.url",c,p,0)));t.b("\">");t.b(t.v(t.d("user.display_name",c,p,0)));t.b("</a> to your &ldquo;<a href=\"");t.b(t.v(t.d("job._links.recruiter",c,p,0)));t.b("\"</a>");t.b(t.v(t.d("job.title",c,p,0)));t.b("</a>&rdquo; search");});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n" + i);if(t.s(t.d("user.latest_projects.0",c,p,1),c,p,0,270,325,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("user",c,p,1),c,p,0,280,315,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<notifications/_userProjects0",c,p,""));});c.pop();}});c.pop();}return t.fl(); },partials: {"<notifications/_userProjects0":{name:"notifications/_userProjects", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"msg\">\n{{#translate}}notifications_added_search|{{actor.display_name}} added <a href=\"{{user.url}}\">{{user.display_name}}</a> to your &ldquo;<a href=\"{{job._links.recruiter}}\"</a>{{job.title}}</a>&rdquo; search{{/translate}}\n</div>\n{{#user.latest_projects.0}}\n{{#user}}\n{{> notifications/_userProjects}}\n{{/user}}\n{{/user.latest_projects.0}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "notifications/_userProjects": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/jobshared", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("translate",c,p,1),c,p,0,14,187,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_invite|You were invited to join <a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("'s </a> job &ldquo;<a href=\"");t.b(t.v(t.d("job._links.recruiter",c,p,0)));t.b("\"</a>");t.b(t.v(t.d("job.title",c,p,0)));t.b("</a>&rdquo;");});c.pop();}t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "{{#translate}}notifications_invite|You were invited to join <a href=\"{{actor.url}}\">{{actor.display_name}}'s </a> job &ldquo;<a href=\"{{job._links.recruiter}}\"</a>{{job.title}}</a>&rdquo;{{/translate}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/jobapplication", ["hogan", "vendor/require/hgn!templates/notifications/_userProjects"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"msg\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,34,172,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_applied_job|");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b(" applied to your job &ldquo;<a href=\"");t.b(t.v(t.d("job._links.recruiter",c,p,0)));t.b("\"</a>");t.b(t.v(t.d("job.title",c,p,0)));t.b("</a>&rdquo;");});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n" + i);if(t.s(t.d("actor.latest_projects.0",c,p,1),c,p,0,222,279,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("actor",c,p,1),c,p,0,233,268,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<notifications/_userProjects0",c,p,""));});c.pop();}});c.pop();}return t.fl(); },partials: {"<notifications/_userProjects0":{name:"notifications/_userProjects", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"msg\">\n  {{#translate}}notifications_applied_job|{{actor.display_name}} applied to your job &ldquo;<a href=\"{{job._links.recruiter}}\"</a>{{job.title}}</a>&rdquo;{{/translate}}\n</div>\n{{#actor.latest_projects.0}}\n{{#actor}}\n{{> notifications/_userProjects}}\n{{/actor}}\n{{/actor.latest_projects.0}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "notifications/_userProjects": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/jobrecommendation", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"msg\">");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,34,170,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_recommendation_count|New recommendations for &ldquo;<a href=\"");t.b(t.v(t.d("job._links.recruiter",c,p,0)));t.b("\">");t.b(t.v(t.d("job.title",c,p,0)));t.b("</a>&rdquo;: ");t.b(t.v(t.f("count",c,p,0)));});c.pop();}t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"msg\">\n  {{#translate}}notifications_recommendation_count|New recommendations for &ldquo;<a href=\"{{job._links.recruiter}}\">{{job.title}}</a>&rdquo;: {{count}}{{/translate}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/note", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("translate",c,p,1),c,p,0,14,198,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_note|");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b(" left a note on <a href=\"");t.b(t.v(t.d("user.url",c,p,0)));t.b("\">");t.b(t.v(t.d("user.display_name",c,p,0)));t.b("</a> in your &ldquo;<a href=\"");t.b(t.v(t.d("job._links.recruiter",c,p,0)));t.b("\">");t.b(t.v(t.d("job.title",c,p,0)));t.b("</a>&rdquo; job");});c.pop();}t.b("\n" + i);t.b("<a class=\"note-wrap\" href=\"");t.b(t.v(t.d("job._links.recruiter",c,p,0)));t.b("\">");t.b("\n" + i);t.b("  <div class=\"activity-block note\">");t.b("\n" + i);t.b("    <div class=\"comment\">");t.b("\n" + i);t.b("      ");t.b(t.v(t.d("note.note_text",c,p,0)));t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</a>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "{{#translate}}notifications_note|{{actor.display_name}} left a note on <a href=\"{{user.url}}\">{{user.display_name}}</a> in your &ldquo;<a href=\"{{job._links.recruiter}}\">{{job.title}}</a>&rdquo; job{{/translate}}\n<a class=\"note-wrap\" href=\"{{job._links.recruiter}}\">\n  <div class=\"activity-block note\">\n    <div class=\"comment\">\n      {{note.note_text}}\n    </div>\n  </div>\n</a>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/jobarchived", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("translate",c,p,1),c,p,0,14,206,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_archived_job|<a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b(" </a> has archived the job  &ldquo;<a href=\"");t.b(t.v(t.d("job._links.recruiter",c,p,0)));t.b("\">");t.b(t.v(t.d("job.title",c,p,0)));t.b("</a>&rdquo; that was shared with you");});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "{{#translate}}notifications_archived_job|<a href=\"{{actor.url}}\">{{actor.display_name}} </a> has archived the job  &ldquo;<a href=\"{{job._links.recruiter}}\">{{job.title}}</a>&rdquo; that was shared with you{{/translate}}", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/trait/notificationPartial',[ "hgn!templates/notifications/appreciation", "hgn!templates/notifications/collection", "hgn!templates/notifications/comment", "hgn!templates/notifications/wip_comment", "hgn!templates/notifications/comment_stub", "hgn!templates/notifications/followed", "hgn!templates/notifications/mention", "hgn!templates/notifications/saved", "hgn!templates/notifications/social", "hgn!templates/notifications/shortlist", "hgn!templates/notifications/discovered", "hgn!templates/notifications/jobshared", "hgn!templates/notifications/jobapplication", "hgn!templates/notifications/jobrecommendation", "hgn!templates/notifications/note", "hgn!templates/notifications/jobarchived" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    "use strict";
    var q = {
        appreciate: a.template,
        followcollection: b.template,
        projectcomment: e.template,
        wipcomment: e.template,
        followuser: f.template,
        projectaddedtocollection: h.template,
        socialfriendjoined: i.template,
        usermentionprojectcomment: g.template,
        usermentionwiprevisioncomment: g.template,
        addtoshortlist: j.template,
        addtodiscovered: k.template,
        jobshared: l.template,
        jobapplicationcreated: m.template,
        jobrecommendationsreceived: n.template,
        notecreated: o.template,
        jobarchived: p.template
    };
    return {
        generatePartials: function(a) {
            return {
                innard: q[a.action_key],
                comment: c.template,
                wip_comment: d.template
            };
        }
    };
});

define("vendor/require/hgn!templates/notification", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"notification-group");if(!t.s(t.f("read_on",c,p,1),c,p,1,0,0,"")){t.b(" unread");};t.b("\">");t.b("\n" + i);t.b("  <div class=\"notification-container\">");t.b("\n" + i);if(t.s(t.f("data",c,p,1),c,p,0,114,1202,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("actor",c,p,1),c,p,0,129,963,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\" class=\"avatar js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      <div data-picture=\"\" data-alt=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\">");t.b("\n" + i);t.b("        <div alt=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("actor.images.50",c,p,0)));t.b("\" data-class=\"avatar-image\" data-title=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("        <div alt=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("actor.images.115",c,p,0)));t.b("\" data-class=\"avatar-image avatar-image-2x\" data-title=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("          (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("      <noscript><img alt=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" title=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("actor.images.50",c,p,0)));t.b("\" class=\"avatar-image\" /></noscript>");t.b("\n" + i);t.b("    </a>");t.b("\n" + i);});c.pop();}if(!t.s(t.f("actor",c,p,1),c,p,1,0,0,"")){t.b("      <img class=\"avatar\" src=\"");t.b(t.v(t.f("assetsurl",c,p,0)));t.b("/img/notifications/behance-icon.png\" />");t.b("\n" + i);};t.b("    <div class=\"detail beside-avatar\">");t.b("\n" + i);t.b(t.rp("<innard0",c,p,"      "));t.b("      <div class=\"time\">");t.b(t.v(t.f("time_ago",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);});c.pop();}t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<innard0":{name:"innard", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"notification-group{{^read_on}} unread{{/read_on}}\">\n  <div class=\"notification-container\">\n  {{#data}}\n    {{#actor}}\n    <a href=\"{{actor.url}}\" class=\"avatar js-mini-profile\" data-id=\"{{actor.id}}\">\n      <div data-picture=\"\" data-alt=\"{{actor.display_name}}\">\n        <div alt=\"{{actor.display_name}}\" data-src=\"{{actor.images.50}}\" data-class=\"avatar-image\" data-title=\"{{actor.display_name}}\"></div>\n        <div alt=\"{{actor.display_name}}\" data-src=\"{{actor.images.115}}\" data-class=\"avatar-image avatar-image-2x\" data-title=\"{{actor.display_name}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n          (min--moz-device-pixel-ratio: 1.3),\n          (-o-min-device-pixel-ratio: 4/3),\n          (min-device-pixel-ratio: 1.3),\n          (min-resolution: 1.3dppx)\"></div>\n      </div>\n      <noscript><img alt=\"{{actor.display_name}}\" title=\"{{actor.display_name}}\" src=\"{{actor.images.50}}\" class=\"avatar-image\" /></noscript>\n    </a>\n    {{/actor}}\n    {{^actor}}\n      <img class=\"avatar\" src=\"{{assetsurl}}/img/notifications/behance-icon.png\" />\n    {{/actor}}\n    <div class=\"detail beside-avatar\">\n      {{> innard}}\n      <div class=\"time\">{{time_ago}}</div>\n    </div>\n  {{/data}}\n  </div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/Notification',[ "page_config", "jquery", "moment", "nbd/View/Entity", "beff/dom/truncate", "lib/picturefill", "be/trait/notificationPartial", "hgn!templates/notification" ], function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = d.extend({
        template: function(a) {
            return b(h(a, this.generatePartials(a)));
        },
        templateData: function() {
            var b = this._super();
            return b.time_ago = function() {
                return c.unix(b.created_on).fromNow();
            }, b.assetsurl = a.ASSETSURL, b;
        },
        rendered: function() {
            this.$view.picturefill().find(".comment-text").contents().toArray().forEach(function(a) {
                e(a, 4);
            });
        },
        update: function() {
            if (this.$view) {
                var a = this.templateData().time_ago();
                this.$view.removeClass("unread").find(".time").text(a);
            }
        }
    }).mixin(g);
    return i;
});
define('be/Controller/Notification',[ "nbd/Controller/Entity", "be/View/Notification" ], function(a, b) {
    "use strict";
    var c = a.extend({
        update: function() {
            this._view.update();
        },
        wasRead: function() {
            return !!this._model.get("read_on");
        }
    }, {
        VIEW_CLASS: b
    });
    return c;
});

define("vendor/require/hgn!templates/notificationGroup", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"notification-group");if(t.s(t.f("any_unread",c,p,1),c,p,0,45,52,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" unread");});c.pop();}t.b("\">");t.b("\n" + i);t.b("  <div class=\"js-context\"></div>");t.b("\n" + i);t.b("  <div class=\"js-more notification-group-more\">");if(t.s(t.f("translate",c,p,1),c,p,0,164,240,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_group_more_updates|+ <span class=\"count\">0</span> More Updates");});c.pop();}t.b("</div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"notification-group{{#any_unread}} unread{{/any_unread}}\">\n  <div class=\"js-context\"></div>\n  <div class=\"js-more notification-group-more\">{{#translate}}notifications_group_more_updates|+ <span class=\"count\">0</span> More Updates{{/translate}}</div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/NotificationGroup',[ "jquery", "nbd/View/Entity", "nbd/util/async", "nbd/util/pipe", "hgn!templates/notificationGroup" ], function(a, b, c, d, e) {
    "use strict";
    var f = b.extend({
        template: d(e, a),
        templateData: function() {
            var a = this._super();
            return a.any_unread = this._model.get("entries").some(function(a) {
                return !a.wasRead();
            }), a;
        },
        draw: function(a) {
            var b, d = this._model.get("entries");
            d && d.length && (this._iterator = this._iterator || 0, d = d.slice(this._iterator, +a ? this._iterator += a : void 0), 
            b = this.$view.find(".js-context"), d.forEach(function(a) {
                a.render(b);
            }), this._iterator || c(function() {
                this._iterator = 0;
            }.bind(this)));
        },
        markAsRead: function() {
            this.$view.removeClass("unread");
        },
        rendered: function() {
            this.draw(3);
            var b = this._model.get("entries").length - (this._iterator || 0);
            b ? this.$view.on("click", ".js-more", function() {
                a(this).hide();
            }).one("click", ".js-more", this.draw.bind(this)).find(".count").text(b) : this.$view.find(".js-more").hide();
        }
    });
    return f;
});
define('be/Controller/NotificationGroup',[ "nbd/Controller/Entity", "be/View/NotificationGroup" ], function(a, b) {
    "use strict";
    var c = a.extend({
        add: function(a) {
            var b = this._model.get("entries") || [];
            b.push(a), this._model.set("entries", b);
        },
        update: function() {
            this._view.markAsRead(), this._forEachEntry(function(a) {
                a.update();
            });
        },
        _forEachEntry: function(a) {
            var b = this._model.get("entries") || [];
            b.forEach(function(b) {
                a(b);
            });
        },
        destroy: function() {
            this._forEachEntry(function(a) {
                a.destroy();
            }), this._super();
        }
    }, {
        VIEW_CLASS: b
    });
    return c;
});
define('wip/createloader',[ "nbd/Promise", "be/modal/simple", "be/localization" ], function(a, b, c) {
    "use strict";
    return function() {
        var d = new a(function(a, b) {
            require([ "wip/create" ], a, b);
        });
        return d["catch"](function() {
            b({
                title: c.translate("wip_loader_problem_with_your_request", "There was a problem with your request"),
                html: c.translate("wip_loader_please_refresh_page", "Please refresh the page to try again."),
                buttons: [ {
                    label: c.translate("wip_loader_button_close", "Close"),
                    classes: [ "form-button-default", "js-close" ]
                } ]
            });
        }), d;
    };
});

define("vendor/require/hgn!templates/addWork", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<ul>");t.b("\n" + i);t.b("  <li>");t.b("\n" + i);t.b("    <a id=\"activity-new-work-project\" class=\"new-work-link-wrap\" href=\"");t.b(t.v(t.f("projectUrl",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      <span class=\"new-work-link-icon\"></span>");t.b("\n" + i);t.b("      <span class=\"new-work-link\">");if(t.s(t.f("translate",c,p,1),c,p,0,195,230,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("nav_primary_add_project|Add Project");});c.pop();}t.b("</span>");t.b("\n" + i);t.b("    </a>");t.b("\n" + i);t.b("  </li>");t.b("\n" + i);t.b("  <li>");t.b("\n" + i);t.b("    <span id=\"activity-new-work-wip\" class=\"new-work-link-wrap wip-action wip-action-create fake-link js-wip-create\">");t.b("\n" + i);t.b("      <span class=\"new-work-link-icon\"></span>");t.b("\n" + i);t.b("      <span class=\"new-work-link\">");if(t.s(t.f("translate",c,p,1),c,p,0,489,542,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("nav_primary_add_work_in_progress|Add Work in Progress");});c.pop();}t.b("</span>");t.b("\n" + i);t.b("    </span>");t.b("\n" + i);t.b("  </li>");t.b("\n" + i);t.b("</ul>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<ul>\n  <li>\n    <a id=\"activity-new-work-project\" class=\"new-work-link-wrap\" href=\"{{projectUrl}}\">\n      <span class=\"new-work-link-icon\"></span>\n      <span class=\"new-work-link\">{{#translate}}nav_primary_add_project|Add Project{{/translate}}</span>\n    </a>\n  </li>\n  <li>\n    <span id=\"activity-new-work-wip\" class=\"new-work-link-wrap wip-action wip-action-create fake-link js-wip-create\">\n      <span class=\"new-work-link-icon\"></span>\n      <span class=\"new-work-link\">{{#translate}}nav_primary_add_work_in_progress|Add Work in Progress{{/translate}}</span>\n    </span>\n  </li>\n</ul>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/Menu/AddWork',[ "jquery", "be/View/Dialog/Menu", "wip/createloader", "hgn!templates/addWork" ], function(a, b, c, d) {
    "use strict";
    var e = b.extend({
        mustache: d,
        attachment: ".js-nav-primary",
        templateData: function() {
            return {
                classes: [ "new-work-menu" ],
                projectUrl: "/portfolio/editor"
            };
        },
        position: function(a) {
            return this._super(a, {
                my: "left top+7",
                at: "left bottom",
                collision: "none"
            });
        },
        rendered: function() {
            this._super(), this.bindEvents();
        },
        bindEvents: function() {
            this.$view.on("click", ".js-wip-create", function() {
                this.hide(), c().then(function(a) {
                    a.render();
                });
            }.bind(this));
        }
    });
    return e;
});
define('be/Controller/Dialog/AddWork',[ "be/Controller/Dialog/Roulette", "be/View/Menu/AddWork" ], function(a, b) {
    "use strict";
    var c = a.extend({}, {
        VIEW_CLASS: {
            desktop: b
        }
    });
    return c;
});

define("vendor/require/hgn!templates/bell/section", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"activity-container js-");t.b(t.v(t.f("type",c,p,0)));t.b("-activity\">");t.b("\n" + i);t.b("  <h2 class=\"bell-title ");t.b(t.v(t.f("type",c,p,0)));t.b("-title hide-phone js-bell-title\">");t.b(t.v(t.f("title",c,p,0)));t.b("</h2>");t.b("\n" + i);t.b("  <h2 class=\"bell-title bell-title-dummy hide-phone js-bell-title-dummy\">");t.b(t.v(t.f("title",c,p,0)));t.b("</h2>");t.b("\n" + i);t.b("  <div class=\"js-error-container messages hide\">");t.b("\n" + i);t.b("    <div class=\"error\">");t.b("\n" + i);t.b("      <div class=\"icon\"></div>");t.b("\n" + i);t.b("      <span class=\"js-error-text\"></span>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"js-spin loading-spinner cfix\"></div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"activity-container js-{{type}}-activity\">\n  <h2 class=\"bell-title {{type}}-title hide-phone js-bell-title\">{{title}}</h2>\n  <h2 class=\"bell-title bell-title-dummy hide-phone js-bell-title-dummy\">{{title}}</h2>\n  <div class=\"js-error-container messages hide\">\n    <div class=\"error\">\n      <div class=\"icon\"></div>\n      <span class=\"js-error-text\"></span>\n    </div>\n  </div>\n  <div class=\"js-spin loading-spinner cfix\"></div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_button", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"form-item form-item-a ");t.sub("containerClasses",c,p,i);t.b("\">");t.b("\n" + i);t.b("  <a class=\"form-button ");t.sub("classes",c,p,i);t.b("\"");t.b("\n" + i);t.sub("attrs",c,p,i);t.b("    unselectable=\"on\"");t.b("\n" + i);t.b("    tabindex=\"");t.sub("tabindex",c,p,i);t.b("\"><span class=\"");t.sub("icon",c,p,i);t.b("\"></span>");t.sub("label",c,p,i);t.b("</a>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: { "containerClasses": function(c,p,t,i) {},"classes": function(c,p,t,i) {t.b("form-button-default");},"attrs": function(c,p,t,i) {},"tabindex": function(c,p,t,i) {t.b("0");},"icon": function(c,p,t,i) {},"label": function(c,p,t,i) {} }}, "<div class=\"form-item form-item-a {{$containerClasses}}{{/containerClasses}}\">\n  <a class=\"form-button {{$classes}}form-button-default{{/classes}}\"\n    {{$attrs}}{{/attrs}}\n    unselectable=\"on\"\n    tabindex=\"{{$tabindex}}0{{/tabindex}}\"><span class=\"{{$icon}}{{/icon}}\"></span>{{$label}}{{/label}}</a>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_addWorkButton", ["hogan", "vendor/require/hgn!templates/lib/_button"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<lib/_button0",c,p,""));return t.fl(); },partials: {"<lib/_button0":{name:"lib/_button", partials: {}, subs: { "attrs": function(c,p,t,i) {t.b("unselectable=\"on\" tabindex=\"0\"");},"classes": function(c,p,t,i) {t.b("hide-phone hide-tablet form-button new-work-button js-new-work-button form-button-small form-button-default form-button-down-arrow");},"icon": function(c,p,t,i) {t.b("beicons-pre beicons-pre-upload");},"label": function(c,p,t,i) {t.b(" ");if(t.s(t.f("translate",c,p,1),c,p,0,305,329,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_add_work|Add Work");});c.pop();}} }}}, subs: {  }}, "{{<lib/_button}}\n  {{$attrs}}unselectable=\"on\" tabindex=\"0\"{{/attrs}}\n  {{$classes}}hide-phone hide-tablet form-button new-work-button js-new-work-button form-button-small form-button-default form-button-down-arrow{{/classes}}\n  {{$icon}}beicons-pre beicons-pre-upload{{/icon}}\n  {{$label}} {{#translate}}button_add_work|Add Work{{/translate}}{{/label}}\n{{/lib/_button}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_button": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notificationEmpty", ["hogan", "vendor/require/hgn!templates/lib/_addWorkButton"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"notifications-empty\">");t.b("\n" + i);t.b("<div class=\"notifications-empty-title\">");if(t.s(t.f("translate",c,p,1),c,p,0,87,156,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_empty_title|You don't have any notifications right now.");});c.pop();}t.b("</div>");t.b("\n" + i);if(t.s(t.f("translate",c,p,1),c,p,0,191,324,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_empty_content|We'll notify you when you get appreciations, comments, or new followers. To get started, upload new work.");});c.pop();}t.b("\n" + i);t.b(t.rp("<lib/_addWorkButton0",c,p,""));t.b("</div>");t.b("\n");return t.fl(); },partials: {"<lib/_addWorkButton0":{name:"lib/_addWorkButton", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"notifications-empty\">\n<div class=\"notifications-empty-title\">{{#translate}}notifications_empty_title|You don't have any notifications right now.{{/translate}}</div>\n{{#translate}}notifications_empty_content|We'll notify you when you get appreciations, comments, or new followers. To get started, upload new work.{{/translate}}\n{{>lib/_addWorkButton}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_addWorkButton": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/Notifications',[ "jquery", "page_constants", "nbd/View/Entity", "nbd/util/pipe", "be/Controller/Dialog/AddWork", "be/spinner", "hgn!templates/bell/section", "hgn!templates/notificationEmpty" ], function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = c.extend({
        template: d(g, a),
        templateData: function() {
            return {
                title: b.GLOBALNAV.NOTIFICATION_TITLE,
                type: "notification"
            };
        },
        rendered: function() {
            this.$loading = f.init(this.$view), this.$loading.hide(), this.listenTo(this._model, "entries", this.draw), 
            this.draw(this._model.get("entries"));
        },
        draw: function(a) {
            a && (a.forEach(function(a) {
                a.render(this.$view);
            }.bind(this)), this.empty(!a.length));
        },
        empty: function(b) {
            var c, d = !b;
            this.$empty = this.$empty || a(h()), d ? this.$empty.remove() : (this.$view.append(this.$empty), 
            c = this.$view.find(".js-new-work-button"), new e().setContext(c));
        }
    });
    return i;
});
define('be/Controller/Notifications',[ "nbd/trait/pubsub", "nbd/Controller/Entity", "nbd/util/async", "be/xhr", "be/Controller/Notification", "be/Controller/NotificationGroup", "be/View/Notifications" ], function(a, b, c, d, e, f, g) {
    "use strict";
    var h, i = "/v2/notifications?action_set=bell-note-v1";
    return h = b.extend({
        refresh: function() {
            return this._model.get("entries") ? void (this.block || this.get()) : this.more();
        },
        get: function j() {
            var a = j.bind(this), b = this._model, d = this.read({
                onset_ts: b.get("onset")
            }).then(function(d) {
                if (!d.notifications) throw d;
                return b.set("onset", d.latest_ts), d.has_more && c(a), d.notifications;
            }).then(this.constructor.makeEntries);
            return d.then(function(a) {
                var c = b.get("entries") || [];
                b.set("entries", a.concat(c));
            }).then(this.trigger.bind(this, "sync")), d;
        },
        more: function k() {
            if (!k.block) {
                k.block = !0;
                var a = this._model, b = this.read({
                    offset_ts: a.get("offset")
                }).then(function(b) {
                    if (!b.notifications) throw b;
                    k.block = !b.has_more;
                    var c = a.data();
                    return c.onset = c.onset || b.latest_ts, c.offset = b.earliest_ts, b.notifications;
                }).then(this.constructor.makeEntries);
                return b.then(function(b) {
                    var c = a.get("entries") || [];
                    a.set("entries", c.concat(b));
                }).then(this.trigger.bind(this, "sync")), b;
            }
        },
        read: function(a) {
            try {
                this._view.$loading.show();
            } catch (b) {}
            var c = function() {
                this._view.$loading.hide();
            }.bind(this), e = d({
                url: i,
                type: "get",
                data: a
            });
            return e.then(c, c), e;
        },
        update: function() {
            var a = this._model.get("entries");
            a && a.length && a.forEach(function(a) {
                a.update();
            });
        },
        clear: function() {
            d({
                url: i,
                type: "delete"
            });
        }
    }, {
        VIEW_CLASS: g,
        makeEntries: function(a) {
            var b, c, d, g = [], h = 0, i = 2;
            for (c = 0; c < a.length; ++c) if (a[c + 1] && a[c + 1].action_key === a[c].action_key) h++; else {
                if (h >= i) {
                    for (b = new f(), d = c - h; c >= d; ++d) b.add(new e(a[d]));
                    g.push(b);
                } else for (d = c - h; c >= d; ++d) g.push(new e(a[d]));
                h = 0;
            }
            return g;
        }
    }).mixin(a);
});
define('be/trait/eventMappable',[],function() {
    "use strict";
    function a(a, b, c) {
        var d = [], e = a[b], f = function(a) {
            var b = [];
            return "string" == typeof a ? b.push({
                method: c[a].bind(c)
            }) : "function" == typeof a ? b.push({
                method: a
            }) : Object.keys(a).forEach(function(c) {
                var d = f(a[c]);
                b.push({
                    selector: c,
                    method: d[0].method
                });
            }), b;
        };
        return Array.isArray(e) ? e.forEach(function(a) {
            d.push.apply(d, f(a));
        }) : d.push.apply(d, f(e)), d;
    }
    var b = {
        _mapEvents: function() {
            var b = this;
            this._undelegateEvents(), Object.keys(this.events).forEach(function(c) {
                var d = a(b.events, c, b);
                c += ".delegated", d.forEach(function(a) {
                    a.selector ? b.$view.on(c, a.selector, a.method) : b.$view.on(c, a.method);
                });
            });
        },
        _undelegateEvents: function() {
            this.$view.off(".delegated");
        }
    };
    return b;
});

define("vendor/require/hgn!templates/notifications/proposition", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"proposition-group cfix\">");t.b("\n" + i);t.b("  <div class=\"js-invitation\">");t.b("\n");t.b("\n" + i);t.b("    <a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\" class=\"avatar js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      <div data-picture=\"\" data-alt=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\">");t.b("\n" + i);t.b("        <div alt=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("actor.images.50",c,p,0)));t.b("\" data-class=\"avatar-image\" data-title=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("        <div alt=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("actor.images.115",c,p,0)));t.b("\" data-class=\"avatar-image avatar-image-2x\" data-title=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("          (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("      <noscript><img alt=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" title=\"");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("actor.images.50",c,p,0)));t.b("\" class=\"avatar-image\" /></noscript>");t.b("\n" + i);t.b("    </a>");t.b("\n");t.b("\n" + i);t.b("    <div class=\"detail beside-avatar\">");t.b("\n" + i);t.b("      <div class=\"msg extra-padding\">");t.b("\n" + i);t.b(t.rp("<subject0",c,p,"        "));t.b("      </div>");t.b("\n");t.b("\n" + i);t.b("      <div class=\"graphic\">");t.b("\n" + i);t.b("        <div class=\"activity-block proposition-");t.b(t.v(t.f("proposition",c,p,0)));t.b(" cfix\">");t.b("\n" + i);t.b(t.rp("<innards1",c,p,"          "));t.b("\n" + i);t.b("          <button class=\"accept right js-accept form-button form-button-small form-button-default\">");if(t.s(t.f("translate",c,p,1),c,p,0,1247,1276,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_accepted|Accept");});c.pop();}t.b("</button>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("      </div>");t.b("\n");t.b("\n" + i);t.b("      <div class=\"time\">");t.b("\n" + i);t.b("        <span class=\"proposition-time js-time\">");t.b(t.v(t.f("time_ago",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("        <span class=\"js-reject proposition-reject\">");if(t.s(t.f("translate",c,p,1),c,p,0,1486,1527,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("notifications_declined|Decline invitation");});c.pop();}t.b("</span>");t.b("\n" + i);t.b("      </div>");t.b("\n");t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<subject0":{name:"subject", partials: {}, subs: {  }},"<innards1":{name:"innards", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"proposition-group cfix\">\n  <div class=\"js-invitation\">\n\n    <a href=\"{{actor.url}}\" class=\"avatar js-mini-profile\" data-id=\"{{actor.id}}\">\n      <div data-picture=\"\" data-alt=\"{{actor.display_name}}\">\n        <div alt=\"{{actor.display_name}}\" data-src=\"{{actor.images.50}}\" data-class=\"avatar-image\" data-title=\"{{actor.display_name}}\"></div>\n        <div alt=\"{{actor.display_name}}\" data-src=\"{{actor.images.115}}\" data-class=\"avatar-image avatar-image-2x\" data-title=\"{{actor.display_name}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n          (min--moz-device-pixel-ratio: 1.3),\n          (-o-min-device-pixel-ratio: 4/3),\n          (min-device-pixel-ratio: 1.3),\n          (min-resolution: 1.3dppx)\"></div>\n      </div>\n      <noscript><img alt=\"{{actor.display_name}}\" title=\"{{actor.display_name}}\" src=\"{{actor.images.50}}\" class=\"avatar-image\" /></noscript>\n    </a>\n\n    <div class=\"detail beside-avatar\">\n      <div class=\"msg extra-padding\">\n        {{> subject}}\n      </div>\n\n      <div class=\"graphic\">\n        <div class=\"activity-block proposition-{{proposition}} cfix\">\n          {{> innards}}\n\n          <button class=\"accept right js-accept form-button form-button-small form-button-default\">{{#translate}}notifications_accepted|Accept{{/translate}}</button>\n        </div>\n      </div>\n\n      <div class=\"time\">\n        <span class=\"proposition-time js-time\">{{time_ago}}</span>\n        <span class=\"js-reject proposition-reject\">{{#translate}}notifications_declined|Decline invitation{{/translate}}</span>\n      </div>\n\n    </div>\n\n  </div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/propositions/collection", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("collection",c,p,1),c,p,0,15,773,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <div data-picture=\"\" data-alt=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      <div alt=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("latest_projects.0.covers.115",c,p,0)));t.b("\" data-class=\"comment-image\" data-title=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("      <div alt=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("latest_projects.0.covers.202",c,p,0)));t.b("\" data-class=\"comment-image comment-image-2x\" data-title=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("          (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <noscript><img alt=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\" title=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("latest_projects.0.covers.115",c,p,0)));t.b("\" class=\"comment-image\" /></noscript>");t.b("\n" + i);t.b("  </a>");t.b("\n" + i);t.b("  <div class=\"proposition-subject\">");t.b(t.v(t.f("title",c,p,0)));t.b("</div>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "{{#collection}}\n  <a href=\"{{url}}\">\n    <div data-picture=\"\" data-alt=\"{{title}}\">\n      <div alt=\"{{title}}\" data-src=\"{{latest_projects.0.covers.115}}\" data-class=\"comment-image\" data-title=\"{{title}}\"></div>\n      <div alt=\"{{title}}\" data-src=\"{{latest_projects.0.covers.202}}\" data-class=\"comment-image comment-image-2x\" data-title=\"{{title}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n          (min--moz-device-pixel-ratio: 1.3),\n          (-o-min-device-pixel-ratio: 4/3),\n          (min-device-pixel-ratio: 1.3),\n          (min-resolution: 1.3dppx)\"></div>\n    </div>\n    <noscript><img alt=\"{{title}}\" title=\"{{title}}\" src=\"{{latest_projects.0.covers.115}}\" class=\"comment-image\" /></noscript>\n  </a>\n  <div class=\"proposition-subject\">{{title}}</div>\n{{/collection}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/propositions/project", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("project",c,p,1),c,p,0,12,724,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <div data-picture=\"\" data-alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("covers.115",c,p,0)));t.b("\" data-class=\"proposition-image\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("      <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("covers.202",c,p,0)));t.b("\" data-class=\"proposition-image proposition-image-2x\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("          (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <noscript><img alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("covers.115",c,p,0)));t.b("\" class=\"proposition-image\" /></noscript>");t.b("\n" + i);t.b("  </a>");t.b("\n" + i);t.b("  <div class=\"proposition-subject\">");t.b(t.v(t.f("name",c,p,0)));t.b("</div>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "{{#project}}\n  <a href=\"{{url}}\">\n    <div data-picture=\"\" data-alt=\"{{name}}\">\n      <div alt=\"{{name}}\" data-src=\"{{covers.115}}\" data-class=\"proposition-image\" data-title=\"{{name}}\"></div>\n      <div alt=\"{{name}}\" data-src=\"{{covers.202}}\" data-class=\"proposition-image proposition-image-2x\" data-title=\"{{name}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n          (min--moz-device-pixel-ratio: 1.3),\n          (-o-min-device-pixel-ratio: 4/3),\n          (min-device-pixel-ratio: 1.3),\n          (min-resolution: 1.3dppx)\"></div>\n    </div>\n    <noscript><img alt=\"{{name}}\" title=\"{{name}}\" src=\"{{covers.115}}\" class=\"proposition-image\" /></noscript>\n  </a>\n  <div class=\"proposition-subject\">{{name}}</div>\n{{/project}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/propositions/team", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("team",c,p,1),c,p,0,9,703,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <div data-picture=\"\" data-alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("images.138",c,p,0)));t.b("\" data-class=\"comment-image\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\"></div>");t.b("\n" + i);t.b("      <div alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-src=\"");t.b(t.v(t.d("images.276",c,p,0)));t.b("\" data-class=\"comment-image comment-image-2x\" data-title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("          (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("          (min-resolution: 1.3dppx)\"></div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <noscript><img alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("images.138",c,p,0)));t.b("\" class=\"comment-image\" /></noscript>");t.b("\n" + i);t.b("  </a>");t.b("\n" + i);t.b("<div class=\"proposition-subject\">");t.b(t.v(t.f("name",c,p,0)));t.b("</div>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "{{#team}}\n  <a href=\"{{url}}\">\n    <div data-picture=\"\" data-alt=\"{{name}}\">\n      <div alt=\"{{name}}\" data-src=\"{{images.138}}\" data-class=\"comment-image\" data-title=\"{{name}}\"></div>\n      <div alt=\"{{name}}\" data-src=\"{{images.276}}\" data-class=\"comment-image comment-image-2x\" data-title=\"{{name}}\" data-media=\"(-webkit-min-device-pixel-ratio: 1.3),\n          (min--moz-device-pixel-ratio: 1.3),\n          (-o-min-device-pixel-ratio: 4/3),\n          (min-device-pixel-ratio: 1.3),\n          (min-resolution: 1.3dppx)\"></div>\n    </div>\n    <noscript><img alt=\"{{name}}\" title=\"{{name}}\" src=\"{{images.138}}\" class=\"comment-image\" /></noscript>\n  </a>\n<div class=\"proposition-subject\">{{name}}</div>\n{{/team}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/propositions/subjects/text", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\" class=\"js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("</a> ");t.b(t.v(t.f("action",c,p,0)));t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<a href=\"{{actor.url}}\" class=\"js-mini-profile\" data-id=\"{{actor.id}}\">{{actor.display_name}}</a> {{action}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/notifications/propositions/subjects/team", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<a href=\"");t.b(t.v(t.d("actor.url",c,p,0)));t.b("\" class=\"js-mini-profile\" data-id=\"");t.b(t.v(t.d("actor.id",c,p,0)));t.b("\">");t.b(t.v(t.d("actor.display_name",c,p,0)));t.b("</a> ");t.b(t.v(t.f("action",c,p,0)));t.b(" ");if(t.s(t.f("team",c,p,1),c,p,0,118,148,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\">");t.b(t.v(t.f("name",c,p,0)));t.b("</a>");});c.pop();}t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<a href=\"{{actor.url}}\" class=\"js-mini-profile\" data-id=\"{{actor.id}}\">{{actor.display_name}}</a> {{action}} {{#team}}<a href=\"{{url}}\">{{name}}</a>{{/team}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/Proposition',[ "jquery", "moment", "nbd/View/Entity", "nbd/trait/promise", "nbd/util/extend", "lib/picturefill", "be/localization", "be/trait/eventMappable", "hgn!templates/notifications/proposition", "hgn!templates/notifications/propositions/collection", "hgn!templates/notifications/propositions/project", "hgn!templates/notifications/propositions/team", "hgn!templates/notifications/propositions/subjects/text", "hgn!templates/notifications/propositions/subjects/team" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    "use strict";
    var o, p = g.translate("notifications_invitation_declined", "Invitation declined"), q = 250, r = 1e3, s = {
        project_owner: {
            innards: k.template,
            subject: m.template
        },
        collection_owner: {
            innards: j.template,
            subject: m.template
        },
        member_to_team: {
            innards: l.template,
            subject: n.template
        },
        team_to_member: {
            innards: l.template,
            subject: n.template
        },
        project_to_team: {
            innards: k.template,
            subject: n.template
        }
    }, t = {
        project_owner: g.translate("notifications_coown_project", "invited you to co-own a Project"),
        collection_owner: g.translate("notifications_coown_collection", "invited you to co-own a Collection"),
        member_to_team: g.translate("notifications_request_join", "requested to join"),
        team_to_member: g.translate("notifications_invite_join", "invited you to join"),
        project_to_team: g.translate("notifications_request_add", "requested to add a project to")
    };
    return o = c.extend({
        events: {
            click: {
                ".js-accept": "_acceptInvitation",
                ".js-reject": "_rejectInvitation"
            }
        },
        template: function(b) {
            return a(i(b, s[b.type]));
        },
        templateData: function() {
            var a = this._super();
            return e({
                action: t[a.type],
                actor: a.other_user,
                proposition: "project",
                time_ago: function() {
                    return b.unix(a.created_on).fromNow();
                }
            }, a);
        },
        rendered: function() {
            this.$rejectBtn = this.$view.find(".js-reject"), this.$time = this.$view.find(".js-time"), 
            this.$view.picturefill(), this._mapEvents();
        },
        update: function() {
            if (this.$view) {
                var a = this.templateData().time_ago;
                this.$time.text(a);
            }
        },
        acceptAndFade: function() {
            var a = new d();
            return this.$view.fadeOut(q, a.resolve), a;
        },
        declineAndFade: function() {
            var a = new d();
            return this.$rejectBtn.text(p), this.$view.delay(r).fadeOut(q, a.resolve), a;
        },
        _acceptInvitation: function() {
            this._controller.accept();
        },
        _rejectInvitation: function() {
            this._controller.reject();
        }
    }).mixin(h);
});
define('be/Controller/Proposition',[ "nbd/Controller/Entity", "nbd/trait/pubsub", "be/xhr", "be/View/Proposition" ], function(a, b, c, d) {
    "use strict";
    var e, f = "/v2/notifications/invitations/";
    return e = a.extend({
        update: function() {
            this._view.update();
        },
        accept: function() {
            c({
                url: f + this._model.get("id"),
                type: "put"
            }).then(this._view.acceptAndFade.bind(this._view)).then(this._remove.bind(this)).then(null, this.trigger.bind(this, "error"));
        },
        reject: function() {
            c({
                url: f + this._model.get("id"),
                type: "delete"
            }).then(this._view.declineAndFade.bind(this._view)).then(this._remove.bind(this));
        },
        _remove: function() {
            this.trigger("resolve", this._model.get("id")), this.destroy();
        }
    }, {
        VIEW_CLASS: d
    }).mixin(b);
});
define('be/View/Propositions',[ "jquery", "page_constants", "nbd/View/Entity", "nbd/util/pipe", "be/spinner", "hgn!templates/bell/section" ], function(a, b, c, d, e, f) {
    "use strict";
    var g = c.extend({
        template: d(f, a),
        templateData: function() {
            return {
                title: b.GLOBALNAV.NOTIFICATION_PROPS_TITLE,
                type: "propositions"
            };
        },
        rendered: function() {
            this.$errorContainer = this.$view.find(".js-error-container"), this.$loading = e.init(this.$view), 
            this.$errorContainer.addClass("hide"), this.$loading.hide(), this.listenTo(this._model, "entries", this._draw), 
            this._draw(this._model.get("entries"));
        },
        update: function() {
            this.$errorContainer.addClass("hide");
        },
        showErrorMessages: function(a) {
            var b = a.messages.reduce(function(a, b) {
                return a + "\n" + b.message;
            }, "");
            this.$errorContainer.find(".js-error-text").text(b).end().removeClass("hide");
        },
        _draw: function(a) {
            var b = this._model.get("order");
            return a && Object.keys(a).length ? (this.$view.removeClass("hide"), void b.forEach(function(b) {
                var c = a[b];
                c && c.render(this.$view);
            }.bind(this))) : void this.$view.addClass("hide");
        }
    });
    return g;
});
define('be/Controller/Propositions',[ "nbd/trait/pubsub", "nbd/Controller/Entity", "be/xhr", "be/Controller/Proposition", "be/View/Propositions" ], function(a, b, c, d, e) {
    "use strict";
    var f, g = "/v2/notifications/invitations";
    return f = b.extend({
        more: function h() {
            if (!h.block) {
                h.block = !0;
                var a = this, b = this._model, c = this.read();
                return c.then(function(a) {
                    if (!a.invitations) throw a;
                    return a.invitations;
                }).then(function(b) {
                    var c = b.map(function(a) {
                        return new d(a);
                    });
                    return c.forEach(function(b) {
                        a.listenTo(b, "resolve", a._updateEntries).listenTo(b, "error", a._displayErrors);
                    }), c;
                }).then(function(a) {
                    var c = b.get("entries") || {}, d = b.get("order") || [], e = a.reduce(function(a, b) {
                        var c = b._model.get("id");
                        return a[c] = b, d.push(c), a;
                    }, c);
                    return b.set("order", d), b.set("entries", e), Object.keys(e).length;
                }).then(this.trigger.bind(this, "sync")), c;
            }
        },
        count: function() {
            var a = this._model.get("entries");
            return a ? Object.keys(a).length : 0;
        },
        read: function() {
            try {
                this._view.$loading.show();
            } catch (a) {}
            var b = function() {
                this._view.$loading.hide();
            }.bind(this), d = c({
                url: g
            });
            return d.then(b, b), d;
        },
        update: function() {
            var a = this._model.get("entries");
            this._view.update(), a && Object.keys(a).length && Object.keys(a).forEach(function(b) {
                var c = a[b];
                c && c.update();
            }.bind(this));
        },
        _updateEntries: function(a) {
            var b = this._model.get("entries") || {}, c = this._model.get("order") || [];
            b[a] && (delete b[a], c.splice(c.indexOf(a), 1)), this._model.set("entries", b), 
            this._model.set("order", c), this.trigger("removed");
        },
        _displayErrors: function(a) {
            a && a.responseJSON && (a = a.responseJSON), this._view.showErrorMessages(a);
        }
    }, {
        VIEW_CLASS: e
    }).mixin(a);
});
define('lib/infinitescroll',[ "jquery", "log" ], function(a, b) {
    "use strict";
    function c(a) {
        a();
    }
    function d(a) {
        var b, c;
        return a.is(g) ? (b = window.innerHeight || g.height(), c = h.height() - b - g.scrollTop()) : (b = a.prop("clientHeight"), 
        c = a.prop("scrollHeight") - b - a.scrollTop()), c / b;
    }
    function e(b) {
        var e = "window" === b ? g : a(b);
        return function() {
            var a, f = d(e);
            for (a in j[b]) f <= Number(a) && j[b][a].wrapped.forEach(c);
        };
    }
    function f(c, d, f) {
        function h() {
            if (!h.blocking) {
                h.blocking = !0;
                var a = d.apply(null, arguments);
                a && "function" == typeof a.then ? a.then(function() {
                    h.blocking = !1, i[f]();
                }, function(a) {
                    a instanceof Error && b.warn(a);
                }) : h.blocking = !1;
            }
        }
        "function" == typeof c && (f = d, d = c, c = 1), f = f || "window", c = Number(c).toString();
        var k, l = "window" === f ? g : a(f);
        j[f] || (j[f] = {}, i[f] = e(f), l.on("scroll", i[f])), k = j[f][c], k || (k = j[f][c] = {
            wrapped: [],
            original: []
        }), k.original.push(d), k.wrapped.push(h), i[f]();
    }
    var g = a(window), h = a(document), i = {}, j = {};
    return f.remove = function(b, c) {
        c = c || "window";
        var d, e, f, h = "window" === c ? g : a(c);
        for (d in j[c]) e = j[c][d], f = e.original.indexOf(b), ~f && (e.original.splice(f, 1), 
        e.wrapped.splice(f, 1), e.original.length || delete j[c][d]);
        Object.keys(j[c]).length || (h.off("scroll", i[c]), delete j[c]);
    }, f.check = function(a) {
        a = a || "window", i[a]();
    }, f;
});

define("vendor/require/hgn!templates/bell/dialog", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"activity-container-wrap\">");t.b("\n" + i);t.b("  <div class=\"bell-section propositions-section js-propositions\"></div>");t.b("\n" + i);t.b("  <div class=\"bell-section notifications-section js-notifications\"></div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"activity-container-wrap\">\n  <div class=\"bell-section propositions-section js-propositions\"></div>\n  <div class=\"bell-section notifications-section js-notifications\"></div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/trait/bell',[ "jquery", "nbd/util/pipe", "lib/infinitescroll", "be/spinner", "hgn!templates/html", "hgn!templates/bell/dialog" ], function(a, b, c, d, e, f) {
    "use strict";
    var g = 0;
    return {
        mustache: e,
        selector: ".js-notifications-nav-menu .popup-content .activity-container-wrap",
        templateData: function() {
            return {
                title: "Notifications",
                classes: [ "notifications", "timeline-container", "js-notifications-nav-menu" ],
                html: f
            };
        },
        rendered: function() {
            this._super(), this._bindScroll(), this._bindInfiniteScroll();
        },
        renderNotifications: function(a) {
            this.$notifications || (this.$notifications = this.$view.find(".js-notifications"), 
            a.render(this.$notifications));
        },
        renderPropositions: function(a) {
            this.$propositions || (this.$propositions = this.$view.find(".js-propositions"), 
            a.render(this.$propositions));
        },
        _bindInfiniteScroll: function() {
            c(.5, function() {
                this._controller.more();
            }.bind(this), this.selector);
        },
        _bindScroll: function() {
            this.$view.find(this.selector).on("scroll", function() {
                this.$headers = this.$headers || this.$view.find(".js-bell-title").toArray();
                var b = this.$headers.map(function(b) {
                    var c = a(b), d = c.position();
                    return c.is(".sticky") && (d = c.siblings(".js-bell-title-dummy").position()), {
                        $el: c,
                        offsetTop: d.top
                    };
                }.bind(this)).filter(function(a) {
                    return a.$el.is(":visible");
                }).reduce(function(a, b) {
                    var c;
                    return a ? c = b.offsetTop > g ? a : b.offsetTop > a.offsetTop ? b : a : b;
                });
                b.$el.is(".js-bell-title-dummy") || (this.$currentHeader && this.$currentHeader.length && this.$currentHeader.removeClass("sticky"), 
                b.$el.addClass("sticky"), this.$currentHeader = b.$el);
            }.bind(this));
        }
    };
});
define('be/View/Dialog/Layover/Bell',[ "be/View/Dialog/Layover", "be/trait/bell" ], function(a, b) {
    "use strict";
    return a.extend(b);
});
define('be/View/Dialog/Menu/BaseView',[ "be/View/Dialog/Menu" ], function(a) {
    "use strict";
    var b = "107", c = "10", d = "5";
    return a.extend({
        init: function() {
            this._super.apply(this, arguments), this.dismiss = function(a) {
                a.originalEvent.data !== this && this.hide();
            }.bind(this);
        },
        position: function(a) {
            return this._super(a, {
                my: "left-" + b + " top-" + c,
                at: "center bottom+" + d,
                collision: "none"
            });
        }
    });
});
define('be/View/Dialog/Menu/Bell',[ "be/View/Dialog/Menu/BaseView", "be/trait/bell" ], function(a, b) {
    "use strict";
    return a.extend(b).extend({
        attachment: ".js-nav-primary"
    });
});
define('be/Controller/Dialog/Bell',[ "nbd/trait/pubsub", "nbd/Promise", "be/Controller/Dialog/Roulette", "be/Controller/Notifications", "be/Controller/Propositions", "be/View/Dialog/Layover/Bell", "be/View/Dialog/Menu/Bell" ], function(a, b, c, d, e, f, g) {
    "use strict";
    var h = c.extend({
        init: function() {
            this._notifications = new d(), this.listenTo(this._notifications, "sync", this._syncCount), 
            this._super.apply(this, arguments);
        },
        _initView: function() {
            this._super.apply(this, arguments), this.listenTo(this._view, "show", this.renderSections).listenTo(this._view, "show", this.updateSections).listenTo(this._view, "hide", function() {
                this._notifications.clear();
            });
        },
        renderSections: function() {
            this._view.renderNotifications(this._notifications);
        },
        updateSections: function() {
            this._notifications.update();
        },
        _syncCount: function() {
            this.trigger("sync", this._count);
        },
        more: function() {
            return this._notifications.more();
        }
    }, {
        VIEW_CLASS: {
            phone: f,
            tablet: g,
            desktop: g
        }
    }).mixin(a), i = h.extend({
        _count: 0,
        init: function() {
            this._propositions = new e(), this.listenTo(this._propositions, "sync", function(a) {
                this._count += a, this._syncCount();
            }).listenTo(this._propositions, "removed", function() {
                this._count = Math.max(this._count - 1, 0), this._syncCount();
            }), this._super.apply(this, arguments);
        },
        renderSections: function() {
            this._super(), this._view.renderPropositions(this._propositions);
        },
        updateSections: function() {
            this._super(), this._propositions.update();
        },
        more: function() {
            return b.all([ this._super(), this._propositions.more() ]);
        }
    });
    return i;
});
define('be/bell',[ "jquery", "has", "be/xhr", "be/Controller/Dialog/Bell" ], function(a, b, c, d) {
    "use strict";
    var e, f = "/v2/notifications/count", g = "bell-count-v1";
    return e = {
        init: function(c) {
            var e = a(".js-bell-menu", c);
            e.length && (this.$bell = e, this._actionSet = g, this._dialog = new d(), this._dialog.setContext(e), 
            this._dialog.on("sync", function(a) {
                this.update(a || 0);
            }, this), b("localstorage") && this.update(window.sessionStorage.getItem("notifications") || 0), 
            this._sync());
        },
        destroy: function() {
            this._dialog && this._dialog.destroy(), clearInterval(this._interval);
        },
        update: function(a) {
            var b = 0 === +a;
            this.$bell.toggleClass("unread", !b).find(".notifications-count").text(a), this._dialog.block = b;
        },
        toggle: function() {
            this._dialog.toggle();
        },
        _sync: function() {
            return c({
                url: f,
                type: "get",
                data: {
                    action_set: this._actionSet
                }
            }).then(function(a) {
                return b("localstorage") && window.sessionStorage.setItem("notifications", a.count), 
                a.count;
            }).then(e.update.bind(e));
        }
    };
});

define("vendor/require/hgn!templates/unverified", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div>");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,22,114,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("unverified_messages_access|You need to have a verified email address to access this feature.");});c.pop();}t.b("</br>");t.b("\n" + i);t.b("  ");if(t.s(t.f("translate",c,p,1),c,p,0,150,218,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("unverified_messages_email|Haven't received a verification email yet?");});c.pop();}t.b(" <a target=\"_blank\" href=\"");t.b(t.v(t.f("verify_url",c,p,0)));t.b("\">");if(t.s(t.f("translate",c,p,1),c,p,0,288,330,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("unverified_messages_click_here|Click here.");});c.pop();}t.b("</a>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div>\n  {{#translate}}unverified_messages_access|You need to have a verified email address to access this feature.{{/translate}}</br>\n  {{#translate}}unverified_messages_email|Haven't received a verification email yet?{{/translate}} <a target=\"_blank\" href=\"{{verify_url}}\">{{#translate}}unverified_messages_click_here|Click here.{{/translate}}</a>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/unverifiedPopup',[ "page_config", "be/modal/simple", "be/localization", "hgn!templates/unverified" ], function(a, b, c, d) {
    "use strict";
    return function() {
        return b({
            title: c.translate("unverified_popup_title", "Please verify your email address"),
            html: d({
                verify_url: a.ADOBE_VERIFY
            }),
            buttons: [ {
                label: c.translate("unverified_popup_button_close", "Close"),
                classes: [ "form-button-default", "js-confirm" ]
            } ]
        });
    };
});
define('inbox/lib/byLine',[ "be/localization" ], function(a) {
    "use strict";
    function b(b, c) {
        return b.length < 3 ? b.join(c) : b[0] + c + (b.length - 1) + " " + a.translate("inbox_message_byline_others", "others");
    }
    return b;
});
define('inbox/Model/Message',[ "moment", "nbd/Model", "nbd/util/extend", "inbox/lib/byLine" ], function(a, b, c, d) {
    "use strict";
    function e(a) {
        var b = [];
        return a && (b = a.map(function(a) {
            return {
                image: a.images && a.images[g] || "",
                name: a.display_name,
                url: a.url,
                id: a.id
            };
        })), b;
    }
    var f, g = 115;
    return f = b.extend({
        init: function(a) {
            this._super(this.transform(a));
        },
        transform: function(b) {
            var f = e(b.recipients), g = +b.unread_count || 0, h = a.unix(b.last_message_on), i = a().diff(h, "hours");
            return c(b, {
                byLine: d(f.map(function(a) {
                    return a.name;
                }), " & "),
                message: b.last_message_part,
                recipients: f,
                unread: !!g,
                unreadCount: g,
                timestamp: i > 23 ? h.format("MMMM DD, YYYY") : h.fromNow()
            });
        }
    });
});

define("vendor/require/hgn!templates/inbox/dialog/main", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"bell-section activity-container-wrap\">");t.b("\n" + i);t.b("  <h2 class=\"bell-title notifications-title hide-phone sticky\">");t.b("\n" + i);t.b("    ");if(t.s(t.f("translate",c,p,1),c,p,0,133,161,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("inbox_messages|Your Messages");});c.pop();}t.b("\n" + i);t.b("    <span class=\"js-inbox-chrome bell-inbox-controls\">");t.b("\n" + i);t.b("      <a href=\"");t.b(t.v(t.f("composeUrl",c,p,0)));t.b("\" class=\"bell-inbox-new-message\">");if(t.s(t.f("translate",c,p,1),c,p,0,307,328,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("inbox_compose|Compose");});c.pop();}t.b("</a>");t.b("\n" + i);t.b("      <a href=\"");t.b(t.v(t.f("indexUrl",c,p,0)));t.b("\" class=\"bell-inbox-view-all\">");if(t.s(t.f("translate",c,p,1),c,p,0,418,437,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("inbox_view|View All");});c.pop();}t.b("</a>");t.b("\n" + i);t.b("    </span>");t.b("\n" + i);t.b("  </h2>");t.b("\n" + i);t.b("  <h2 class=\"bell-title notifications-title hide-phone bell-title-dummy\">");if(t.s(t.f("translate",c,p,1),c,p,0,563,591,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("inbox_messages|Your Messages");});c.pop();}t.b("</h2>");t.b("\n" + i);t.b("  <div class=\"activity-container js-inbox-container capped\">");t.b("\n" + i);t.b("    <ul class=\"js-inbox-list\"></ul>");t.b("\n" + i);t.b("    <a href=\"");t.b(t.v(t.f("indexUrl",c,p,0)));t.b("\" class=\"js-show-all list-load-more\">");if(t.s(t.f("translate",c,p,1),c,p,0,784,810,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("inbox_see|See all messages");});c.pop();}t.b("</a>");t.b("\n" + i);t.b("    <div class=\"js-spin loading-spinner cfix\"></div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"bell-section activity-container-wrap\">\n  <h2 class=\"bell-title notifications-title hide-phone sticky\">\n    {{#translate}}inbox_messages|Your Messages{{/translate}}\n    <span class=\"js-inbox-chrome bell-inbox-controls\">\n      <a href=\"{{composeUrl}}\" class=\"bell-inbox-new-message\">{{#translate}}inbox_compose|Compose{{/translate}}</a>\n      <a href=\"{{indexUrl}}\" class=\"bell-inbox-view-all\">{{#translate}}inbox_view|View All{{/translate}}</a>\n    </span>\n  </h2>\n  <h2 class=\"bell-title notifications-title hide-phone bell-title-dummy\">{{#translate}}inbox_messages|Your Messages{{/translate}}</h2>\n  <div class=\"activity-container js-inbox-container capped\">\n    <ul class=\"js-inbox-list\"></ul>\n    <a href=\"{{indexUrl}}\" class=\"js-show-all list-load-more\">{{#translate}}inbox_see|See all messages{{/translate}}</a>\n    <div class=\"js-spin loading-spinner cfix\"></div>\n  </div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/inbox/dialog/empty", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"inbox-empty\">");if(t.s(t.f("translate",c,p,1),c,p,0,39,77,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("inbox_empty|No messages in your inbox.");});c.pop();}t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"inbox-empty\">{{#translate}}inbox_empty|No messages in your inbox.{{/translate}}</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/inbox/dialog/error", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"inbox-empty\">");if(t.s(t.f("translate",c,p,1),c,p,0,39,116,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("inbox_error|Inbox is currently down for maintenance. Please check back later.");});c.pop();}t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"inbox-empty\">{{#translate}}inbox_error|Inbox is currently down for maintenance. Please check back later.{{/translate}}</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/inbox/list/message", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<li class=\"inbox-list-item preview-item");if(t.s(t.f("unread",c,p,1),c,p,0,50,57,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" unread");});c.pop();}if(t.s(t.f("active",c,p,1),c,p,0,79,86,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" active");});c.pop();}t.b(" js-inbox-list-item\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("  <div class=\"form-item form-item-checkbox indicator checkbox\">");t.b("\n" + i);t.b("    <label class=\"checkbox\" for=\"preview-");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      <input type=\"checkbox\" id=\"preview-");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      <div class=\"checkbox-checkmark\"></div>");t.b("\n" + i);t.b("    </label>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"indicator unread-indicator\"></div>");t.b("\n" + i);t.b("  <div class=\"meta\">");t.b("\n" + i);t.b("    <div class=\"timestamp js-updating-timestamp\" data-timestamp=\"");t.b(t.v(t.f("last_message_on",c,p,0)));t.b("\">");t.b(t.v(t.f("timestamp",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("    <div class=\"tags");if(!t.s(t.f("sent_as_job",c,p,1),c,p,1,0,0,"")){if(!t.s(t.f("is_job",c,p,1),c,p,1,0,0,"")){t.b(" hide");};};t.b("\">");t.b("\n" + i);t.b("      ");if(t.s(t.f("sent_as_job",c,p,1),c,p,0,647,784,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<span class=\"job-tag sent-job-tag beicons-pre beicons-pre-check\">");if(t.s(t.f("translate",c,p,1),c,p,0,726,763,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("inbox_message_sent_as_job|sent as job");});c.pop();}t.b("</span>");});c.pop();}t.b("\n" + i);t.b("      ");if(t.s(t.f("folder",c,p,1),c,p,0,818,989,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("is_job",c,p,1),c,p,0,829,978,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("archived_by",c,p,1),c,p,0,845,962,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<span class=\"job-tag archived-job-tag beicons-pre\">");if(t.s(t.f("translate",c,p,1),c,p,0,910,941,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("inbox_message_archived|ARCHIVED");});c.pop();}t.b("</span>");});c.pop();}});c.pop();}});c.pop();}t.b("\n" + i);t.b("      ");if(t.s(t.f("is_job",c,p,1),c,p,0,1018,1129,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<span class=\"job-tag beicons-pre beicons-pre-suitcase\">");if(t.s(t.f("translate",c,p,1),c,p,0,1087,1108,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("inbox_message_job|job");});c.pop();}t.b("</span>");});c.pop();}t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"info\">");t.b("\n" + i);if(t.s(t.f("isGroup",c,p,1),c,p,0,1198,1510,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <div class=\"inbox-image multiple-owners-grid\">");t.b("\n" + i);if(t.s(t.f("recipients",c,p,1),c,p,0,1275,1316,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("          <img src=\"");t.b(t.v(t.f("image",c,p,0)));t.b("\">");t.b("\n" + i);});c.pop();}t.b("      </div>");t.b("\n" + i);t.b("      <div class=\"user text-ellipsis\">");t.b("\n" + i);t.b("        ");t.b(t.v(t.f("byLine",c,p,0)));t.b("\n" + i);t.b("        <span class=\"js-unread-count");if(!t.s(t.f("unread",c,p,1),c,p,1,0,0,"")){t.b(" hide");};t.b("\">(");t.b(t.v(t.f("unreadCount",c,p,0)));t.b(")</span>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);});c.pop();}t.b("\n" + i);if(!t.s(t.f("isGroup",c,p,1),c,p,1,0,0,"")){if(t.s(t.d("recipients.0",c,p,1),c,p,0,1564,1760,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <img src=\"");t.b(t.v(t.f("image",c,p,0)));t.b("\" class=\"inbox-image\">");t.b("\n" + i);t.b("        <div class=\"user text-ellipsis\">");t.b(t.v(t.f("byLine",c,p,0)));t.b(" <span class=\"js-unread-count");if(!t.s(t.f("unread",c,p,1),c,p,1,0,0,"")){t.b(" hide");};t.b("\">(");t.b(t.v(t.f("unreadCount",c,p,0)));t.b(")</span></div>");t.b("\n" + i);});c.pop();}};t.b("    <div class=\"message text-ellipsis\">");if(t.s(t.f("is_reply",c,p,1),c,p,0,1847,1879,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<span class=\"reply-icon\"></span>");});c.pop();}t.b(t.v(t.f("message",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</li>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<li class=\"inbox-list-item preview-item{{#unread}} unread{{/unread}}{{#active}} active{{/active}} js-inbox-list-item\" data-id=\"{{id}}\">\n  <div class=\"form-item form-item-checkbox indicator checkbox\">\n    <label class=\"checkbox\" for=\"preview-{{id}}\">\n      <input type=\"checkbox\" id=\"preview-{{id}}\">\n      <div class=\"checkbox-checkmark\"></div>\n    </label>\n  </div>\n  <div class=\"indicator unread-indicator\"></div>\n  <div class=\"meta\">\n    <div class=\"timestamp js-updating-timestamp\" data-timestamp=\"{{last_message_on}}\">{{timestamp}}</div>\n    <div class=\"tags{{^sent_as_job}}{{^is_job}} hide{{/is_job}}{{/sent_as_job}}\">\n      {{#sent_as_job}}<span class=\"job-tag sent-job-tag beicons-pre beicons-pre-check\">{{#translate}}inbox_message_sent_as_job|sent as job{{/translate}}</span>{{/sent_as_job}}\n      {{#folder}}{{#is_job}}{{#archived_by}}<span class=\"job-tag archived-job-tag beicons-pre\">{{#translate}}inbox_message_archived|ARCHIVED{{/translate}}</span>{{/archived_by}}{{/is_job}}{{/folder}}\n      {{#is_job}}<span class=\"job-tag beicons-pre beicons-pre-suitcase\">{{#translate}}inbox_message_job|job{{/translate}}</span>{{/is_job}}\n    </div>\n  </div>\n  <div class=\"info\">\n    {{#isGroup}}\n      <div class=\"inbox-image multiple-owners-grid\">\n        {{#recipients}}\n          <img src=\"{{image}}\">\n        {{/recipients}}\n      </div>\n      <div class=\"user text-ellipsis\">\n        {{byLine}}\n        <span class=\"js-unread-count{{^unread}} hide{{/unread}}\">({{unreadCount}})</span>\n      </div>\n    {{/isGroup}}\n\n    {{^isGroup}}\n      {{#recipients.0}}\n        <img src=\"{{image}}\" class=\"inbox-image\">\n        <div class=\"user text-ellipsis\">{{byLine}} <span class=\"js-unread-count{{^unread}} hide{{/unread}}\">({{unreadCount}})</span></div>\n      {{/recipients.0}}\n    {{/isGroup}}\n    <div class=\"message text-ellipsis\">{{#is_reply}}<span class=\"reply-icon\"></span>{{/is_reply}}{{message}}</div>\n  </div>\n</li>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/trait/inboxNav',[ "jquery", "moment", "nbd/util/extend", "be/modal/simple", "be/spinner", "be/unverifiedPopup", "inbox/Model/Message", "hgn!templates/html", "hgn!templates/inbox/dialog/main", "hgn!templates/inbox/dialog/empty", "hgn!templates/inbox/dialog/error", "hgn!templates/inbox/list/message" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
    "use strict";
    var m = a(document.body).hasClass("user-unverified"), n = "/inbox", o = n + "/compose";
    return {
        mustache: h,
        templateData: function() {
            var a = i({
                indexUrl: n,
                composeUrl: o
            });
            return {
                title: "Inbox",
                classes: [ "notifications", "inbox", "timeline-container", "js-inbox-nav-menu" ],
                html: a
            };
        },
        rendered: function() {
            this._super(), this.$content = this.$view.find(".js-inbox-container"), this.$list = this.$view.find(".js-inbox-list"), 
            this.$showAll = this.$view.find(".js-show-all"), this.$controls = this.$view.find(".js-inbox-chrome"), 
            this.spinner = e.init(this.$view).hide(), this._bindEvents();
        },
        loading: function() {
            this.spinner && this.spinner.show();
        },
        loaded: function() {
            this.spinner && this.spinner.hide();
        },
        add: function(a) {
            a.forEach(function(a) {
                var b = new g(a);
                this.$list.append(this._renderMessage(b));
            }.bind(this));
        },
        reset: function() {
            this.$empty && (this.$empty.remove(), this.$empty = null), this.$error && (this.$error.remove(), 
            this.$error = null), this.$controls.show(), this.$list.empty();
        },
        empty: function() {
            this.$empty = this.$empty || a(j()), this.$showAll.before(this.$empty);
        },
        showError: function() {
            this.$error = this.$error || a(k()), this.$showAll.before(this.$error), this.$controls.hide();
        },
        _bindEvents: function() {
            var b = this;
            this.$list.on("click", "li", function() {
                var c = a(this).data("id");
                return m ? (b.hide(), void f()) : void (window.location.href = n + "/" + c);
            }), this.$view.on("click", "a", function(a) {
                m && (a.preventDefault(), b.hide(), f());
            });
        },
        _renderMessage: function(a) {
            var b = a.data();
            return l(c(b, {
                isGroup: b.recipients.length > 1
            }));
        }
    };
});
define('be/View/Dialog/Menu/InboxNav',[ "nbd/util/extend", "be/View/Dialog/Menu/BaseView", "be/trait/inboxNav" ], function(a, b, c) {
    "use strict";
    return b.extend(c);
});
define('be/View/Dialog/Layover/InboxNav',[ "be/View/Dialog/Layover", "be/trait/inboxNav" ], function(a, b) {
    "use strict";
    var c = a.extend(b);
    return c;
});
define('inbox/lib/loader',[ "be/xhr" ], function(a) {
    "use strict";
    function b(a) {
        return function(b) {
            var c = {};
            if (!b) throw new Error("Response is not valid");
            return c = b[a];
        };
    }
    function c(b, c) {
        return c = c || {}, a({
            url: b,
            type: "GET",
            data: {
                folder: c.folder,
                offset_key: c.offsetKey,
                q: c.query,
                tag: c.tag
            }
        });
    }
    var d = "/v2/inbox", e = d + "/threads", f = d + "/threads/search", g = "/messages", h = "/v2/report/spam/thread", i = "/utilities/block", j = {
        search: function(a) {
            return c(f, a);
        },
        threads: function(a) {
            return c(e, a);
        },
        pollThreads: function(b) {
            return b = b || {}, a({
                url: e,
                type: "GET",
                data: {
                    folder: b.folder,
                    polling_key: b.pollingKey,
                    q: b.query,
                    tag: b.tag
                }
            });
        },
        thread: function(c) {
            return a({
                url: e + "/" + c,
                type: "GET"
            }).then(b("thread"));
        },
        threadMessages: function(b, c) {
            return a({
                url: e + "/" + b + g,
                type: "GET",
                data: {
                    offset_key: c
                }
            });
        },
        pollMessages: function(b, c) {
            return a({
                url: e + "/" + b + g,
                type: "GET",
                data: {
                    polling_key: c
                }
            });
        },
        markRead: function(b) {
            return a({
                url: e + "/" + b,
                type: "PATCH",
                data: {
                    is_read: 1
                }
            });
        },
        moveTo: function(b, c) {
            return a({
                url: e + "/" + b,
                type: "PATCH",
                data: {
                    folder: c
                }
            });
        },
        markSpam: function(b) {
            return a({
                url: h + "/" + b,
                type: "POST"
            });
        },
        blockUser: function(b) {
            return a({
                url: i,
                type: "post",
                data: {
                    user_id: b
                }
            });
        },
        deleteThreadForever: function(b) {
            return a({
                url: e + "/" + b,
                type: "DELETE"
            });
        },
        replyToThread: function(c, d, f) {
            return a({
                url: e + "/" + c + g,
                type: "POST",
                data: {
                    message: d,
                    is_job: f
                }
            }).then(b("message"));
        },
        markMessageRead: function(b, c) {
            return a({
                url: e + "/" + b + g + "/" + c,
                type: "PATCH",
                data: {
                    is_read: 1
                }
            });
        },
        createNewThread: function(c) {
            return a({
                url: e,
                type: "POST",
                data: c
            }).then(b("thread"));
        }
    };
    return j;
});
define('be/Controller/Dialog/InboxNav',[ "nbd/trait/pubsub", "be/Controller/Dialog/Roulette", "be/View/Dialog/Menu/InboxNav", "be/View/Dialog/Layover/InboxNav", "inbox/lib/loader" ], function(a, b, c, d, e) {
    "use strict";
    var f = b.extend({
        _initView: function() {
            this._super.apply(this, arguments), this._view && this.listenTo(this._view, "show", this._refresh);
        },
        _refresh: function() {
            this._view.loading(), e.threads().then(function(a) {
                if (!a) throw new Error();
                a = a.threads || [], this._view.loaded(), this._view.reset(), a.length ? this._view.add(a) : this._view.empty();
            }.bind(this))["catch"](function() {
                this._view.loaded(), this._view.reset(), this._view.showError();
            }.bind(this));
        }
    }, {
        VIEW_CLASS: {
            phone: d,
            tablet: c,
            desktop: c
        }
    }).mixin(a);
    return f;
});
define('be/inboxNav',[ "jquery", "has", "nbd/util/deparam", "be/xhr", "be/Controller/Dialog/InboxNav" ], function(a, b, c, d, e) {
    "use strict";
    var f, g = "/v2/notifications/count", h = "inbox-v1";
    return f = {
        init: function(c) {
            var d = a(".js-email-menu", c);
            d.length && (this.$message = d, this._dialog = new e(), this._dialog.setContext(d), 
            b("localstorage") && this.update(window.sessionStorage.getItem("message-notifications") || 0), 
            this._sync());
        },
        update: function(a) {
            var b = 0 === +a;
            this.$message.toggleClass("unread", !b).find(".notifications-count").text(a), this._dialog.block = b;
        },
        _sync: function() {
            return d({
                url: g,
                type: "get",
                data: {
                    action_set: h
                }
            }).then(function(a) {
                return b("localstorage") && window.sessionStorage.setItem("message-notifications", a.count), 
                a.count;
            }).then(f.update.bind(f));
        }
    };
});
define('nav',[ "page_constants", "jquery", "has", "be/bell", "be/inboxNav", "be/Controller/Dialog/AddWork" ], function(a, b, c, d, e, f) {
    "use strict";
    function g(a) {
        if (a.length) {
            var b = a, c = b.find(".js-nav-search-form-input"), d = b.find(".js-nav-search");
            d.on("click", function() {
                c.trigger("focus");
            }), c.on("focus", function() {
                d.addClass("active"), j.addClass("search-active");
            }).on("blur", function() {
                d.toggleClass("active", !!this.value), j.toggleClass("search-active", !!this.value);
            });
        }
    }
    function h(a) {
        j.find(".js-profile-image-50").attr("src", a);
    }
    function i() {
        j = b(".js-nav-primary"), k = b(".js-new-work-button"), g(b(".js-nav-search-form")), 
        k.length && new f().setContext(k), e.init(), d.init(), a.GLOBALNAV.OPEN_NOTIFICATIONS && a.SSO.IS_LOGGED_IN_FULL_USER && d.toggle();
    }
    var j, k;
    return {
        init: i,
        getHeight: function() {
            return j ? j.outerHeight() : 0;
        },
        updateProfileImage: h
    };
});
define('project/lib/StickySidebar',[ "jquery", "nbd/util/extend", "nbd/util/media", "beff/Component", "nav" ], function(a, b, c, d, e) {
    "use strict";
    return d.extend({
        _isStuck: !1,
        init: function(a, b, c, d) {
            this._topPadding = 15, this._$scrollContext = a, this._$sidebar = b, this._$sidebarSpacer = c, 
            this._topSpacing = this._topPadding + (d ? 0 : e.getHeight());
        },
        bind: function() {
            this.on({
                stick: this._stickToggle
            }), a(window).on("resize.project-lib-stickysidebar", function() {
                this._$sidebar.css(this._isStuck ? this._getStuckCss() : this._getUnstuckCss());
            }.bind(this)), this.listenTo(c, {
                "desktop:enter": function() {
                    this._isStuck && this._stickToggle(!0);
                },
                "desktop:exit": function() {
                    this._stickToggle(!1);
                }
            }), this._$scrollContext.on("scroll.project-lib-stickysidebar", this._setState.bind(this)), 
            this._setState();
        },
        _getStuckScrollTop: function() {
            return this._topSpacing + this._$sidebarSpacer.outerHeight();
        },
        _setState: function() {
            var a = this._$scrollContext.scrollTop(), b = a > this._getStuckScrollTop(), d = c.is("desktop");
            b !== this._isStuck && d && this.trigger("stick", b), this._isStuck = b;
        },
        _getStuckCss: function() {
            return {
                position: "fixed",
                top: this._topSpacing,
                left: this._$sidebarSpacer.offset().left,
                width: this._$sidebarSpacer.css("width"),
                display: ""
            };
        },
        _getUnstuckCss: function() {
            return {
                position: "",
                top: "",
                left: "",
                width: "",
                display: ""
            };
        },
        _stickToggle: function(a) {
            a ? this._stick() : this._unstick();
        },
        _stick: function() {
            this._$sidebar.css(this._getStuckCss()).addClass("is-sticky").hide().fadeIn(function() {
                a(this).css("display", "");
            });
        },
        _unstick: function() {
            var b = this._getUnstuckCss();
            this._$sidebar.fadeOut(function() {
                a(this).css(b).removeClass("is-sticky");
            });
        },
        unbind: function() {
            a(window).off("resize.project-lib-stickysidebar"), this._$scrollContext.off("scroll.project-lib-stickysidebar");
        }
    });
});

define("vendor/require/hgn!templates/talent/_addedTalentSearchList", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("searches_added_to",c,p,1),c,p,0,22,171,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <div class=\"ts-added\">");t.b("\n" + i);t.b("      <strong>");if(t.s(t.f("translate",c,p,1),c,p,0,78,114,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("talent_post_label_added_to|ADDED TO:");});c.pop();}t.b("</strong> ");t.b(t.v(t.f("searches_added_to",c,p,0)));t.b("\n" + i);t.b("    </div>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "{{#searches_added_to}}\n    <div class=\"ts-added\">\n      <strong>{{#translate}}talent_post_label_added_to|ADDED TO:{{/translate}}</strong> {{searches_added_to}}\n    </div>\n{{/searches_added_to}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('project/lib/updateTalent',[ "jquery", "be/Controller/Dialog/AddToTalentSearch", "hgn!templates/talent/_addedTalentSearchList" ], function(a, b, c) {
    "use strict";
    return {
        updateTalent: function(a) {
            var d = a.find(".js-add-talent");
            d.length && (this.talent = new b(d.data("id")), this.talent.setContext(d), this.talent.on("update", function(b) {
                a.find(".js-added-talent-searches").html(c({
                    searches_added_to: b.join(", ")
                }));
            }.bind(this)));
        }
    };
});
define('project/lib/bindings',[ "jquery", "beff/Component", "be/miniprofile", "be/LazyLoadPicture", "be/View/Cover", "project/Controller/Appreciate", "project/lib/CommentSection", "project/lib/DimensionClasses", "project/lib/HighDefLightbox", "project/lib/mature", "project/lib/Section", "project/lib/Spam", "project/lib/startup", "project/lib/StickySidebar", "project/lib/updateTalent", "picturefill" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    "use strict";
    return b.extend({
        init: function(a, b, c, d) {
            this._$context = a, this._$scrollContext = b, this._$project = this._$context.find(".js-project"), 
            this._$projectSidebar = this._$context.find(".js-project-sidebar"), this._isPopup = c, 
            this._config = d || {}, this._data = this._$project.data(), this._projectCoverViews = [];
        },
        bind: function() {
            var a = this._$context.find(".js-project-sidebar-wrap"), b = this._$context.find(".js-project-spam"), e = this._$context.find(".js-picture-lazy"), f = this._$context.find(".js-project-module-image-hd");
            this.updateTalent(this._$projectSidebar), this._bindAppreciate(), this._bindOtherProjectsHover(), 
            this._bindBackToTop(), j.init(this._data.id, "project", this._data), this._lazyPicture = d.init(e, {
                threshold: 600,
                container: this._$scrollContext[0]
            }), this._sectionSidebar = k.init(this._$projectSidebar), this._sectionMain = k.init(this._$project), 
            this._lightbox = i.init(f), this._comments = g.init(this._$project), this._spam = l.init(b), 
            this._stickySidebar = n.init(this._$scrollContext, this._$projectSidebar, a, this._isPopup), 
            this._dimensionClasses = h.init(this._$project, this._$project, "width", {
                "breakpoint-comments": 1259,
                "breakpoint-complete-profile": 634
            }), this._isPopup || (m.init(this._config), c.init(this._$context)), p();
        },
        _bindOtherProjectsHover: function() {
            var b = this;
            this._$context.find(".js-project-cover").each(function() {
                var c = new e(a(this));
                c.rendered(), b._projectCoverViews.push(c);
            });
        },
        _bindBackToTop: function() {
            var b = this._$scrollContext[0] === window ? a("body, html") : this._$scrollContext;
            this._$projectSidebar.find(".js-back-to-top").on("click", function() {
                b.animate({
                    scrollTop: 0
                }, 250).promise().then(function() {
                    this._$scrollContext.trigger("scroll");
                }.bind(this));
            }.bind(this));
        },
        _bindAppreciate: function() {
            var a = this._$context.find(".js-appreciate"), b = this._$context.find(".js-stats-appreciations");
            this._appreciate = new f(this._data.id, a), this._appreciate.render(), this.listenTo(this._appreciate, "appreciate", function() {
                b.text(+b.text() + 1);
            });
        },
        unbind: function() {
            this.talent && this.talent.destroy(), j.destroy(), this._isPopup || (m.destroy(), 
            c.destroy(this._$context)), this._projectCoverViews.forEach(function(a) {
                a.destroy();
            }), this._projectCoverViews = [], this._lightbox.destroy(), this._lazyPicture.destroy(), 
            this._appreciate.destroy(), this._sectionSidebar.destroy(), this._sectionMain.destroy(), 
            this._comments.destroy(), this._spam.destroy(), this._stickySidebar.destroy(), this._dimensionClasses.destroy();
        }
    }).extend(o);
});

define("vendor/require/hgn!templates/project/_blocks/_stat", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"project-stat beicons-pre beicons-pre-");t.sub("icon",c,p,i);t.b(" ");t.sub("class",c,p,i);t.b("\">");t.b("\n" + i);t.b("  ");t.sub("count",c,p,i);t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: { "icon": function(c,p,t,i) {t.b("eye");},"class": function(c,p,t,i) {},"count": function(c,p,t,i) {t.b("0");} }}, "<div class=\"project-stat beicons-pre beicons-pre-{{$icon}}eye{{/icon}} {{$class}}{{/class}}\">\n  {{$count}}0{{/count}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_stats", ["hogan", "vendor/require/hgn!templates/project/_blocks/_stat"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"project-stats\">");t.b("\n" + i);t.b(t.rp("<project/_blocks/_stat0",c,p,""));t.b("\n" + i);t.b(t.rp("<project/_blocks/_stat1",c,p,""));t.b("\n" + i);t.b(t.rp("<project/_blocks/_stat2",c,p,""));t.b("</div>");t.b("\n");return t.fl(); },partials: {"<project/_blocks/_stat0":{name:"project/_blocks/_stat", partials: {}, subs: { "count": function(c,p,t,i) {t.b(t.v(t.d("stats.views",c,p,0)));} }},"<project/_blocks/_stat1":{name:"project/_blocks/_stat", partials: {}, subs: { "icon": function(c,p,t,i) {t.b("thumb");},"class": function(c,p,t,i) {t.b("js-stats-appreciations");},"count": function(c,p,t,i) {t.b(t.v(t.d("stats.appreciations",c,p,0)));} }},"<project/_blocks/_stat2":{name:"project/_blocks/_stat", partials: {}, subs: { "icon": function(c,p,t,i) {t.b("comment");},"class": function(c,p,t,i) {},"count": function(c,p,t,i) {t.b(t.v(t.d("stats.comments",c,p,0)));} }}}, subs: {  }}, "<div id=\"project-stats\">\n  {{<project/_blocks/_stat}}\n    {{$count}}{{stats.views}}{{/count}}\n  {{/project/_blocks/_stat}}\n\n  {{<project/_blocks/_stat}}\n    {{$icon}}thumb{{/icon}}\n    {{$class}}js-stats-appreciations{{/class}}\n    {{$count}}{{stats.appreciations}}{{/count}}\n  {{/project/_blocks/_stat}}\n\n  {{<project/_blocks/_stat}}\n    {{$icon}}comment{{/icon}}\n    {{$class}}{{/class}}\n    {{$count}}{{stats.comments}}{{/count}}\n  {{/project/_blocks/_stat}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_stat": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_features", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"features\">");t.b("\n" + i);if(t.s(t.f("features",c,p,1),c,p,0,35,784,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <div class=\"featured-ribbon tooltipi-container\">");t.b("\n" + i);t.b("      <a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\">");t.b("\n" + i);t.b("        <picture>");t.b("\n" + i);t.b("          <source srcset=\"");t.b(t.v(t.d("site.ribbon.image_2x",c,p,0)));t.b(t.v(t.f("cb_string",c,p,0)));t.b("\" media=\"(-webkit-min-device-pixel-ratio: 1.3), (min--moz-device-pixel-ratio: 1.3), (-o-min-device-pixel-ratio: 4/3), (min-device-pixel-ratio: 1.3), (min-resolution: 1.3dppx)\">");t.b("\n" + i);t.b("          <img src=\"");t.b(t.v(t.d("site.ribbon.image",c,p,0)));t.b(t.v(t.f("cb_string",c,p,0)));t.b("\">");t.b("\n" + i);t.b("        </picture>");t.b("\n" + i);t.b("      </a>");t.b("\n" + i);t.b("      <div class=\"tooltipi tooltipi-white\">");t.b("\n" + i);t.b("        <div class=\"project-block-header\">");if(t.s(t.f("translate",c,p,1),c,p,0,559,599,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_featured_on|Project Featured On:");});c.pop();}t.b("</div>");t.b("\n" + i);t.b("        <div><strong>");t.b(t.v(t.d("site.name",c,p,0)));t.b("</strong> &mdash; <span class=\"js-format-date\" data-date=\"");t.b(t.v(t.f("featured_on",c,p,0)));t.b("\">");t.b(t.v(t.f("featured_on",c,p,0)));t.b("</span></div>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);});c.pop();}t.b("  </div>");return t.fl(); },partials: {}, subs: {  }}, "<div id=\"features\">\n  {{#features}}\n    <div class=\"featured-ribbon tooltipi-container\">\n      <a href=\"{{url}}\">\n        <picture>\n          <source srcset=\"{{site.ribbon.image_2x}}{{cb_string}}\" media=\"(-webkit-min-device-pixel-ratio: 1.3), (min--moz-device-pixel-ratio: 1.3), (-o-min-device-pixel-ratio: 4/3), (min-device-pixel-ratio: 1.3), (min-resolution: 1.3dppx)\">\n          <img src=\"{{site.ribbon.image}}{{cb_string}}\">\n        </picture>\n      </a>\n      <div class=\"tooltipi tooltipi-white\">\n        <div class=\"project-block-header\">{{#translate}}project_featured_on|Project Featured On:{{/translate}}</div>\n        <div><strong>{{site.name}}</strong> &mdash; <span class=\"js-format-date\" data-date=\"{{featured_on}}\">{{featured_on}}</span></div>\n      </div>\n    </div>\n  {{/features}}\n  </div>", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_headerInner", ["hogan", "vendor/require/hgn!templates/project/_blocks/_stats", "vendor/require/hgn!templates/project/_blocks/_features"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"project-basic-info-wrap\"");if(t.s(t.f("project_editor",c,p,1),c,p,0,52,75,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" class=\"project-editor\"");});c.pop();}t.b(">");t.b("\n" + i);t.b("  <div class=\"project-title js-project-title\">");t.b("\n" + i);t.b("    <div id=\"project-name\"");if(t.s(t.f("project_editor",c,p,1),c,p,0,188,241,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" class=\"beicons-pre beicons-pre-edit js-project-name\"");});c.pop();}t.b(">");t.b(t.v(t.f("name",c,p,0)));t.b("</div>");t.b("\n" + i);if(t.s(t.f("project_editor",c,p,1),c,p,0,299,393,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <form class=\"hide-on-preview\"><input name=\"title\" value=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\"></input></form>");t.b("\n" + i);});c.pop();}t.b("  </div>");t.b("\n" + i);t.b("  <div id=\"project-fields\" class=\"js-project-fields\">");t.b("\n" + i);if(t.s(t.f("project_editor",c,p,1),c,p,0,499,528,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      ");t.b(t.v(t.f("chosen_fields",c,p,0)));t.b("\n" + i);});c.pop();}if(!t.s(t.f("project_editor",c,p,1),c,p,1,0,0,"")){t.b("      <ul id=\"project-fields-list\">");t.b("\n" + i);if(t.s(t.f("fields",c,p,1),c,p,0,625,709,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <li class=\"project-fields-field\"><a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\">");t.b(t.v(t.f("name",c,p,0)));t.b("</a></li>");t.b("\n" + i);});c.pop();}t.b("      </ul>");t.b("\n" + i);};t.b("  </div>");t.b("\n" + i);t.b(t.rp("<project/_blocks/_stats0",c,p,"  "));t.b(t.rp("<project/_blocks/_features1",c,p,"  "));t.b("</div>");t.b("\n");return t.fl(); },partials: {"<project/_blocks/_stats0":{name:"project/_blocks/_stats", partials: {}, subs: {  }},"<project/_blocks/_features1":{name:"project/_blocks/_features", partials: {}, subs: {  }}}, subs: {  }}, "<div id=\"project-basic-info-wrap\"{{#project_editor}} class=\"project-editor\"{{/project_editor}}>\n  <div class=\"project-title js-project-title\">\n    <div id=\"project-name\"{{#project_editor}} class=\"beicons-pre beicons-pre-edit js-project-name\"{{/project_editor}}>{{name}}</div>\n    {{#project_editor}}\n      <form class=\"hide-on-preview\"><input name=\"title\" value=\"{{name}}\"></input></form>\n    {{/project_editor}}\n  </div>\n  <div id=\"project-fields\" class=\"js-project-fields\">\n    {{#project_editor}}\n      {{chosen_fields}}\n    {{/project_editor}}\n    {{^project_editor}}\n      <ul id=\"project-fields-list\">\n      {{#fields}}\n        <li class=\"project-fields-field\"><a href=\"{{url}}\">{{name}}</a></li>\n      {{/fields}}\n      </ul>\n      {{/project_editor}}\n  </div>\n  {{>project/_blocks/_stats}}\n  {{>project/_blocks/_features}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_stats": arguments[1].template,"project/_blocks/_features": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_profileListItem", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"profile-list\">");t.b("\n" + i);t.b("  <a class=\"normal-link profile-list-image-wrap js-mini-profile\" href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\"><img class=\"profile-list-image\" src=\"");t.b(t.v(t.d("images.115",c,p,0)));t.b("\" /></a>");t.b("\n" + i);t.b("  <div class=\"profile-list-info profile-list-info-row\">");t.b("\n" + i);t.b("    <div class=\"profile-list-name\"><a class=\"normal-link js-mini-profile\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\">");t.b(t.v(t.f("display_name",c,p,0)));t.b("</a></div><!-- /.profile-list-name -->");t.b("\n" + i);if(t.s(t.f("location",c,p,1),c,p,0,418,621,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <div class=\"profile-location\">");t.b("\n" + i);t.b("        <a class=\"profile-list-location-link beicons-pre beicons-pre-location\" href=\"");t.b(t.v(t.f("location_link",c,p,0)));t.b("\">");t.b(t.v(t.f("location",c,p,0)));t.b("</a>");t.b("\n" + i);t.b("      </div><!-- /.profile-location -->");t.b("\n" + i);});c.pop();}t.sub("follow_link",c,p,i);t.b("  </div><!-- /.profile-list-info -->");t.b("\n" + i);t.b("</div><!-- /.profile-list -->");t.b("\n");return t.fl(); },partials: {}, subs: { "follow_link": function(c,p,t,i) {} }}, "<div class=\"profile-list\">\n  <a class=\"normal-link profile-list-image-wrap js-mini-profile\" href=\"{{url}}\" data-id=\"{{id}}\"><img class=\"profile-list-image\" src=\"{{images.115}}\" /></a>\n  <div class=\"profile-list-info profile-list-info-row\">\n    <div class=\"profile-list-name\"><a class=\"normal-link js-mini-profile\" data-id=\"{{id}}\" href=\"{{url}}\">{{display_name}}</a></div><!-- /.profile-list-name -->\n    {{#location}}\n      <div class=\"profile-location\">\n        <a class=\"profile-list-location-link beicons-pre beicons-pre-location\" href=\"{{location_link}}\">{{location}}</a>\n      </div><!-- /.profile-location -->\n    {{/location}}\n    {{$follow_link}}{{/follow_link}}\n  </div><!-- /.profile-list-info -->\n</div><!-- /.profile-list -->\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_follow/_link", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<a class=\"");t.sub("classes",c,p,i);t.b(" follow-button-container ");if(t.s(t.f("is_following",c,p,1),c,p,0,76,85,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("following");});c.pop();}t.b(" js-action-follow-");t.sub("type",c,p,i);t.b("\" data-followee=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" data-following=\"");if(t.s(t.f("is_following",c,p,1),c,p,0,196,200,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("true");});c.pop();}if(!t.s(t.f("is_following",c,p,1),c,p,1,0,0,"")){t.b("false");};t.b("\">");t.b("\n" + i);t.b("  <span class=\"follow\">+ ");if(t.s(t.f("translate",c,p,1),c,p,0,298,318,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_follow|Follow");});c.pop();}t.b("</span>");t.b("\n" + i);t.b("  <span class=\"unfollow\">- ");if(t.s(t.f("translate",c,p,1),c,p,0,381,405,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_unfollow|Unfollow");});c.pop();}t.b("</span>");t.b("\n" + i);t.b("  <span class=\"following\">");if(t.s(t.f("translate",c,p,1),c,p,0,467,493,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_following|Following");});c.pop();}t.b("</span>");t.b("\n" + i);t.b("</a>");return t.fl(); },partials: {}, subs: { "classes": function(c,p,t,i) {},"type": function(c,p,t,i) {} }}, "<a class=\"{{$classes}}{{/classes}} follow-button-container {{#is_following}}following{{/is_following}} js-action-follow-{{$type}}{{/type}}\" data-followee=\"{{id}}\" data-following=\"{{#is_following}}true{{/is_following}}{{^is_following}}false{{/is_following}}\">\n  <span class=\"follow\">+ {{#translate}}button_follow|Follow{{/translate}}</span>\n  <span class=\"unfollow\">- {{#translate}}button_unfollow|Unfollow{{/translate}}</span>\n  <span class=\"following\">{{#translate}}button_following|Following{{/translate}}</span>\n</a>", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_follow/_userLink", ["hogan", "vendor/require/hgn!templates/lib/_follow/_link"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(!t.s(t.f("is_profile_owner",c,p,1),c,p,1,0,0,"")){t.b(t.rp("<lib/_follow/_link0",c,p,""));};return t.fl(); },partials: {"<lib/_follow/_link0":{name:"lib/_follow/_link", partials: {}, subs: { "classes": function(c,p,t,i) {t.b("profile-list-follow-link");},"type": function(c,p,t,i) {t.b("user");} }}}, subs: {  }}, "{{^is_profile_owner}}\n  {{<lib/_follow/_link}}\n    {{$classes}}profile-list-follow-link{{/classes}}\n    {{$type}}user{{/type}}\n  {{/lib/_follow/_link}}\n{{/is_profile_owner}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_follow/_link": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_follow/_buttonUser", ["hogan", "vendor/require/hgn!templates/lib/_follow/_button"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(!t.s(t.f("is_profile_owner",c,p,1),c,p,1,0,0,"")){t.b(t.rp("<lib/_follow/_button0",c,p,""));};return t.fl(); },partials: {"<lib/_follow/_button0":{name:"lib/_follow/_button", partials: {}, subs: { "classes": function(c,p,t,i) {t.b("user-follow");},"type": function(c,p,t,i) {t.b("user");} }}}, subs: {  }}, "{{^is_profile_owner}}\n  {{<lib/_follow/_button}}\n    {{$classes}}user-follow{{/classes}}\n    {{$type}}user{{/type}}\n  {{/lib/_follow/_button}}\n{{/is_profile_owner}}", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_follow/_button": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_message/_button", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div title=\"");if(t.s(t.f("translate",c,p,1),c,p,0,26,58,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_message_user|Message User");});c.pop();}t.b("\" class=\"");t.sub("classes",c,p,i);t.b(" js-action-message-user js-adobeid-signin\" data-contact_name=\"");t.b(t.v(t.f("display_name",c,p,0)));t.b("\" data-contact_id=");t.b(t.v(t.f("id",c,p,0)));t.b(">");t.b("\n" + i);t.b("  <a class=\"form-button form-button-light-and-grey beicons-pre beicons-pre-mail\">");if(t.s(t.f("translate",c,p,1),c,p,0,318,340,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_message|Message");});c.pop();}t.b("</a>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: { "classes": function(c,p,t,i) {t.b("profile-action");} }}, "<div title=\"{{#translate}}button_message_user|Message User{{/translate}}\" class=\"{{$classes}}profile-action{{/classes}} js-action-message-user js-adobeid-signin\" data-contact_name=\"{{display_name}}\" data-contact_id={{id}}>\n  <a class=\"form-button form-button-light-and-grey beicons-pre beicons-pre-mail\">{{#translate}}button_message|Message{{/translate}}</a>\n</div>", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_message/_buttonSmall", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<a title=\"");if(t.s(t.f("translate",c,p,1),c,p,0,24,56,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_message_user|Message User");});c.pop();}t.b("\" class=\"");t.sub("classes",c,p,i);t.b(" js-action-message-user js-adobeid-signin beicons-pre beicons-pre-mail\" data-contact_name=\"");t.b(t.v(t.f("display_name",c,p,0)));t.b("\" data-contact_id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" unselectable=\"on\">");t.sub("label",c,p,i);t.b("</a>");t.b("\n");return t.fl(); },partials: {}, subs: { "classes": function(c,p,t,i) {},"label": function(c,p,t,i) {} }}, "<a title=\"{{#translate}}button_message_user|Message User{{/translate}}\" class=\"{{$classes}}{{/classes}} js-action-message-user js-adobeid-signin beicons-pre beicons-pre-mail\" data-contact_name=\"{{display_name}}\" data-contact_id=\"{{id}}\" unselectable=\"on\">{{$label}}{{/label}}</a>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_follow/_buttonAll", ["hogan", "vendor/require/hgn!templates/lib/_follow/_button"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<lib/_follow/_button0",c,p,""));return t.fl(); },partials: {"<lib/_follow/_button0":{name:"lib/_follow/_button", partials: {}, subs: { "follow": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,52,80,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_follow_all|Follow All");});c.pop();}},"following": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,136,170,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_following_all|Following All");});c.pop();}},"unfollow": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,228,260,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_unfollow_all|Unfollow All");});c.pop();}},"type": function(c,p,t,i) {t.b("project");} }}}, subs: {  }}, "{{<lib/_follow/_button}}\n  {{$follow}}{{#translate}}button_follow_all|Follow All{{/translate}}{{/follow}}\n  {{$following}}{{#translate}}button_following_all|Following All{{/translate}}{{/following}}\n  {{$unfollow}}{{#translate}}button_unfollow_all|Unfollow All{{/translate}}{{/unfollow}}\n  {{$type}}project{{/type}}\n{{/lib/_follow/_button}}", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_follow/_button": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_follow/_buttonAllSmall", ["hogan", "vendor/require/hgn!templates/lib/_follow/_button"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<lib/_follow/_button0",c,p,""));return t.fl(); },partials: {"<lib/_follow/_button0":{name:"lib/_follow/_button", partials: {}, subs: { "size": function(c,p,t,i) {t.b("form-button-small");},"follow": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,90,118,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_follow_all|Follow All");});c.pop();}},"following": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,174,208,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_following_all|Following All");});c.pop();}},"unfollow": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,266,298,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_unfollow_all|Unfollow All");});c.pop();}},"type": function(c,p,t,i) {t.b("project");} }}}, subs: {  }}, "{{<lib/_follow/_button}}\n  {{$size}}form-button-small{{/size}}\n  {{$follow}}{{#translate}}button_follow_all|Follow All{{/translate}}{{/follow}}\n  {{$following}}{{#translate}}button_following_all|Following All{{/translate}}{{/following}}\n  {{$unfollow}}{{#translate}}button_unfollow_all|Unfollow All{{/translate}}{{/unfollow}}\n  {{$type}}project{{/type}}\n{{/lib/_follow/_button}}", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_follow/_button": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_ownerEditButton", ["hogan", "vendor/require/hgn!templates/lib/_button"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<lib/_button0",c,p,""));return t.fl(); },partials: {"<lib/_button0":{name:"lib/_button", partials: {}, subs: { "attrs": function(c,p,t,i) {t.b("href=\"");t.b(t.v(t.d("URLS.edit",c,p,0)));t.b("\"");},"containerClasses": function(c,p,t,i) {t.b("edit-project-container hide-phone");},"icon": function(c,p,t,i) {t.b("beicons-pre beicons-pre-edit");},"label": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,213,245,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_edit_button|Edit Project");});c.pop();}} }}}, subs: {  }}, "{{<lib/_button}}\n  {{$attrs}}href=\"{{URLS.edit}}\"{{/attrs}}\n  {{$containerClasses}}edit-project-container hide-phone{{/containerClasses}}\n  {{$icon}}beicons-pre beicons-pre-edit{{/icon}}\n  {{$label}}{{#translate}}project_edit_button|Edit Project{{/translate}}{{/label}}\n{{/lib/_button}}", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_button": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_owner", ["hogan", "vendor/require/hgn!templates/lib/_profileListItem", "vendor/require/hgn!templates/lib/_follow/_userLink", "vendor/require/hgn!templates/lib/_follow/_buttonUser", "vendor/require/hgn!templates/lib/_message/_button", "vendor/require/hgn!templates/lib/_follow/_buttonUserSmall", "vendor/require/hgn!templates/lib/_message/_buttonSmall", "vendor/require/hgn!templates/lib/_follow/_buttonAll", "vendor/require/hgn!templates/lib/_follow/_buttonAllSmall", "vendor/require/hgn!templates/project/_blocks/_ownerEditButton"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"project-owner-info");if(t.s(t.f("has_multiple_owners",c,p,1),c,p,0,278,298,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" multiple-owner-info");});c.pop();}if(!t.s(t.f("has_multiple_owners",c,p,1),c,p,1,0,0,"")){t.b(" single-owner-info");};t.b(" ");t.sub("ownerInfoClasses",c,p,i);t.b("\">");t.b("\n" + i);if(!t.s(t.f("has_multiple_owners",c,p,1),c,p,1,0,0,"")){if(t.s(t.f("owners",c,p,1),c,p,0,476,513,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_profileListItem0",c,p,"      "));});c.pop();}};if(t.s(t.f("has_multiple_owners",c,p,1),c,p,0,578,1175,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <div class=\"project-owner-avatar\">");t.b("\n" + i);if(t.s(t.f("owners",c,p,1),c,p,0,635,707,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <img src=\"");t.b(t.v(t.d("images.115",c,p,0)));t.b("\" class=\"multiple-owner-avatar\">");t.b("\n" + i);});c.pop();}t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"profile-list-name tooltipi-container\">");t.b("\n" + i);t.b("      <span class=\"multiple-owners-name\">");if(t.s(t.f("translate",c,p,1),c,p,0,840,879,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_multiple_owners|Multiple Owners");});c.pop();}t.b("</span>");t.b("\n" + i);t.b("      <div class=\"tooltipi tooltipi-white multiple-owners-list\">");t.b("\n" + i);if(t.s(t.f("owners",c,p,1),c,p,0,985,1137,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_profileListItem2",c,p,""));});c.pop();}t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);});c.pop();}if(!t.s(t.f("is_owner",c,p,1),c,p,1,0,0,"")){if(!t.s(t.f("has_multiple_owners",c,p,1),c,p,1,0,0,"")){if(t.s(t.f("owners",c,p,1),c,p,0,1262,2078,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <div class=\"project-owner-actions ");t.sub("ownerActionClasses",c,p,i);t.b("\">");t.b("\n" + i);t.b("          <div class=\"hide-phone\">");t.b("\n" + i);if(t.s(t.d(".",c,p,1),c,p,0,1407,1435,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_follow/_buttonUser3",c,p,""));});c.pop();}if(t.s(t.d(".",c,p,1),c,p,0,1460,1621,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_message/_button4",c,p,""));});c.pop();}t.b("          </div>");t.b("\n" + i);t.b("          <div class=\"show-phone\">");t.b("\n" + i);if(t.s(t.d(".",c,p,1),c,p,0,1698,1731,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_follow/_buttonUserSmall5",c,p,""));});c.pop();}if(t.s(t.d(".",c,p,1),c,p,0,1756,2033,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("              <div class=\"profile-action user-message\">");t.b("\n" + i);t.b(t.rp("<lib/_message/_buttonSmall6",c,p,""));t.b("              </div>");t.b("\n" + i);});c.pop();}t.b("          </div>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);});c.pop();}};if(t.s(t.f("has_multiple_owners",c,p,1),c,p,0,2147,2452,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <div class=\"project-owner-actions follow-all-container ");t.sub("ownerActionClasses",c,p,i);t.b("\">");t.b("\n" + i);t.b("        <div class=\"hide-phone\">");t.b("\n" + i);t.b(t.rp("<lib/_follow/_buttonAll7",c,p,"          "));t.b("        </div>");t.b("\n" + i);t.b("        <div class=\"show-phone\">");t.b("\n" + i);t.b(t.rp("<lib/_follow/_buttonAllSmall8",c,p,"          "));t.b("        </div>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);});c.pop();}};if(t.s(t.f("is_owner",c,p,1),c,p,0,2508,2653,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <div class=\"project-owner-actions ");t.sub("ownerActionClasses",c,p,i);t.b("\">");t.b("\n" + i);t.b(t.rp("<project/_blocks/_ownerEditButton9",c,p,"      "));t.b("    </div>");t.b("\n" + i);});c.pop();}t.b("</div>");t.b("\n");return t.fl(); },partials: {"<lib/_profileListItem0":{name:"lib/_profileListItem", partials: {}, subs: {  }},"<lib/_profileListItem2":{name:"lib/_profileListItem", partials: {"<follow_linklib/_follow/_userLink1":{name:"lib/_follow/_userLink", partials: {}, subs: {  }}}, subs: { "follow_link": function(c,p,t,i) {t.b(t.rp("<follow_linklib/_follow/_userLink1",c,p,""));} }},"<lib/_follow/_buttonUser3":{name:"lib/_follow/_buttonUser", partials: {}, subs: {  }},"<lib/_message/_button4":{name:"lib/_message/_button", partials: {}, subs: { "classes": function(c,p,t,i) {t.b("project-action user-message");} }},"<lib/_follow/_buttonUserSmall5":{name:"lib/_follow/_buttonUserSmall", partials: {}, subs: {  }},"<lib/_message/_buttonSmall6":{name:"lib/_message/_buttonSmall", partials: {}, subs: { "classes": function(c,p,t,i) {t.b("form-button-light-and-grey form-button form-button-small");} }},"<lib/_follow/_buttonAll7":{name:"lib/_follow/_buttonAll", partials: {}, subs: {  }},"<lib/_follow/_buttonAllSmall8":{name:"lib/_follow/_buttonAllSmall", partials: {}, subs: {  }},"<project/_blocks/_ownerEditButton9":{name:"project/_blocks/_ownerEditButton", partials: {}, subs: {  }}}, subs: { "ownerInfoClasses": function(c,p,t,i) {},"ownerActionClasses": function(c,p,t,i) {} }}, "{{!this template is also used within the owner bar in the project footer}}\n{{!TODO: account for looking at your own project}}\n{{!TODO: should we always serve the larger image or use picturefill to serve it when necessary?}}\n<div class=\"project-owner-info{{#has_multiple_owners}} multiple-owner-info{{/has_multiple_owners}}{{^has_multiple_owners}} single-owner-info{{/has_multiple_owners}} {{$ownerInfoClasses}}{{/ownerInfoClasses}}\">\n  {{^has_multiple_owners}}\n    {{#owners}}\n      {{>lib/_profileListItem}}\n    {{/owners}}\n  {{/has_multiple_owners}}\n  {{#has_multiple_owners}}\n    <div class=\"project-owner-avatar\">\n      {{#owners}}\n        <img src=\"{{images.115}}\" class=\"multiple-owner-avatar\">\n      {{/owners}}\n    </div>\n    <div class=\"profile-list-name tooltipi-container\">\n      <span class=\"multiple-owners-name\">{{#translate}}project_multiple_owners|Multiple Owners{{/translate}}</span>\n      <div class=\"tooltipi tooltipi-white multiple-owners-list\">\n        {{#owners}}\n          {{<lib/_profileListItem}}\n            {{$follow_link}}{{>lib/_follow/_userLink}}{{/follow_link}}\n          {{/lib/_profileListItem}}\n        {{/owners}}\n      </div>\n    </div>\n  {{/has_multiple_owners}}\n  {{^is_owner}}\n    {{^has_multiple_owners}}\n      {{#owners}}\n        <div class=\"project-owner-actions {{$ownerActionClasses}}{{/ownerActionClasses}}\">\n          <div class=\"hide-phone\">\n            {{#.}}{{>lib/_follow/_buttonUser}}{{/.}}\n            {{#.}}\n              {{<lib/_message/_button}}\n                {{$classes}}project-action user-message{{/classes}}\n              {{/lib/_message/_button}}\n            {{/.}}\n          </div>\n          <div class=\"show-phone\">\n            {{#.}}{{>lib/_follow/_buttonUserSmall}}{{/.}}\n            {{#.}}\n              <div class=\"profile-action user-message\">\n              {{<lib/_message/_buttonSmall}}\n                {{$classes}}form-button-light-and-grey form-button form-button-small{{/classes}}\n              {{/lib/_message/_buttonSmall}}\n              </div>\n            {{/.}}\n          </div>\n        </div>\n      {{/owners}}\n    {{/has_multiple_owners}}\n    {{#has_multiple_owners}}\n      <div class=\"project-owner-actions follow-all-container {{$ownerActionClasses}}{{/ownerActionClasses}}\">\n        <div class=\"hide-phone\">\n          {{>lib/_follow/_buttonAll}}\n        </div>\n        <div class=\"show-phone\">\n          {{>lib/_follow/_buttonAllSmall}}\n        </div>\n      </div>\n    {{/has_multiple_owners}}\n  {{/is_owner}}\n  {{#is_owner}}\n    <div class=\"project-owner-actions {{$ownerActionClasses}}{{/ownerActionClasses}}\">\n      {{>project/_blocks/_ownerEditButton}}\n    </div>\n  {{/is_owner}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_profileListItem": arguments[1].template,"lib/_follow/_userLink": arguments[2].template,"lib/_follow/_buttonUser": arguments[3].template,"lib/_message/_button": arguments[4].template,"lib/_follow/_buttonUserSmall": arguments[5].template,"lib/_message/_buttonSmall": arguments[6].template,"lib/_follow/_buttonAll": arguments[7].template,"lib/_follow/_buttonAllSmall": arguments[8].template,"project/_blocks/_ownerEditButton": arguments[9].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_layout/_header", ["hogan", "vendor/require/hgn!templates/project/_blocks/_headerInner", "vendor/require/hgn!templates/project/_blocks/_owner"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"project-header\" class=\"features-");t.b(t.v(t.d("project.num_features",c,p,0)));if(t.s(t.f("project_editor",c,p,1),c,p,0,84,101,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" unclickable-mask");});c.pop();}t.b("\">");t.b("\n" + i);t.b(t.rp("<project/_blocks/_headerInner0",c,p,"  "));t.b("\n" + i);t.b("  <div id=\"project-owner-mobile\" class=\"show-tablet show-phone\">");t.b("\n" + i);t.b(t.rp("<project/_blocks/_owner1",c,p,""));t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<project/_blocks/_headerInner0":{name:"project/_blocks/_headerInner", partials: {}, subs: {  }},"<project/_blocks/_owner1":{name:"project/_blocks/_owner", partials: {}, subs: { "ownerInfoClasses": function(c,p,t,i) {t.b("project-owner-info--mobile");} }}}, subs: {  }}, "<div id=\"project-header\" class=\"features-{{project.num_features}}{{#project_editor}} unclickable-mask{{/project_editor}}\">\n  {{>project/_blocks/_headerInner}}\n\n  <div id=\"project-owner-mobile\" class=\"show-tablet show-phone\">\n    {{<project/_blocks/_owner}}\n    {{$ownerInfoClasses}}project-owner-info--mobile{{/ownerInfoClasses}}\n    {{/project/_blocks/_owner}}\n  </div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_headerInner": arguments[1].template,"project/_blocks/_owner": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_tools", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.d("tools_by_synonym.0",c,p,1),c,p,0,102,140,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<div class=\"project-tools-image-wrap\">");});c.pop();}t.b("\n" + i);if(t.s(t.f("tools_by_synonym",c,p,1),c,p,0,185,872,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <div class=\"tooltipi-container\">");t.b("\n" + i);t.b("    <a title=\"");t.b(t.v(t.f("title",c,p,0)));t.b("\" href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\"><img class=\"project-tools-image\" src=\"");t.b(t.v(t.f("icon_url",c,p,0)));t.b("\"></a>");t.b("\n" + i);t.b("    <div class=\"tooltipi tooltipi-white\">");t.b("\n" + i);t.b("      <p class=\"tool-title\">");t.b(t.v(t.f("title",c,p,0)));t.b("</p>");t.b("\n" + i);t.b("      <p><a href=\"");t.b(t.v(t.f("search_term",c,p,0)));t.b("\">");if(t.s(t.f("translate",c,p,1),c,p,0,451,484,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_view_gallery|View Gallery");});c.pop();}t.b(" <span class=\"rarr\">&rarr;</span></a></p>");t.b("\n" + i);t.b("      <p>");t.b("\n" + i);t.b("        <a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\"");if(t.s(t.f("authenticated",c,p,1),c,p,0,593,701,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" class=\"js-adobeid-signup\" data-adobeid-signup-destination=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" data-adobeid-signup-enable-login=\"true\"");});c.pop();}t.b(">");t.b("\n" + i);t.b("          ");if(t.s(t.f("translate",c,p,1),c,p,0,745,780,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_download_trial|Download Now");});c.pop();}t.b(" <span class=\"rarr\">&rarr;</span>");t.b("\n" + i);t.b("        </a>");t.b("\n" + i);t.b("      </p>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);});c.pop();}if(t.s(t.d("tools_by_synonym.0",c,p,1),c,p,0,917,923,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("</div>");});c.pop();}t.b("\n" + i);t.b("<div class=\"project-tools-text-wrap\">");t.b("\n" + i);if(t.s(t.f("tools_without_synonym",c,p,1),c,p,0,1011,1067,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <a href=\"");t.b(t.v(t.d("URLS.search",c,p,0)));t.b("?tools=");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.v(t.f("title",c,p,0)));t.b("</a>");t.b("\n" + i);});c.pop();}t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "{{!Loop through tools twice, once for synonym (image) tools, once for others}}\n{{#tools_by_synonym.0}}<div class=\"project-tools-image-wrap\">{{/tools_by_synonym.0}}\n{{#tools_by_synonym}}\n  <div class=\"tooltipi-container\">\n    <a title=\"{{title}}\" href=\"{{url}}\"><img class=\"project-tools-image\" src=\"{{icon_url}}\"></a>\n    <div class=\"tooltipi tooltipi-white\">\n      <p class=\"tool-title\">{{title}}</p>\n      <p><a href=\"{{search_term}}\">{{#translate}}project_view_gallery|View Gallery{{/translate}} <span class=\"rarr\">&rarr;</span></a></p>\n      <p>\n        <a href=\"{{url}}\"{{#authenticated}} class=\"js-adobeid-signup\" data-adobeid-signup-destination=\"{{url}}\" data-adobeid-signup-enable-login=\"true\"{{/authenticated}}>\n          {{#translate}}project_download_trial|Download Now{{/translate}} <span class=\"rarr\">&rarr;</span>\n        </a>\n      </p>\n    </div>\n  </div>\n{{/tools_by_synonym}}\n{{#tools_by_synonym.0}}</div>{{/tools_by_synonym.0}}\n<div class=\"project-tools-text-wrap\">\n{{#tools_without_synonym}}\n  <a href=\"{{URLS.search}}?tools={{id}}\">{{title}}</a>\n{{/tools_without_synonym}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_moreToggle", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"variable-text variable-text-short js-more-toggle\">");t.sub("shortened",c,p,i);t.b("&#8230; <span class=\"js-more-toggle-link fake-link\">");if(t.s(t.f("translate",c,p,1),c,p,0,156,186,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("moretoggle_read_more|Read More");});c.pop();}t.b("</span></div>");t.b("\n" + i);t.b("<div class=\"variable-text variable-text-full hide\">");t.sub("full",c,p,i);t.b(" <span class=\"js-more-toggle-link fake-link\">");if(t.s(t.f("translate",c,p,1),c,p,0,342,372,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("moretoggle_read_less|Read Less");});c.pop();}t.b("</span></div>");return t.fl(); },partials: {}, subs: { "shortened": function(c,p,t,i) {},"full": function(c,p,t,i) {} }}, "<div class=\"variable-text variable-text-short js-more-toggle\">{{$shortened}}{{/shortened}}&#8230; <span class=\"js-more-toggle-link fake-link\">{{#translate}}moretoggle_read_more|Read More{{/translate}}</span></div>\n<div class=\"variable-text variable-text-full hide\">{{$full}}{{/full}} <span class=\"js-more-toggle-link fake-link\">{{#translate}}moretoggle_read_less|Read Less{{/translate}}</span></div>", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_aboutInner", ["hogan", "vendor/require/hgn!templates/lib/_moreToggle"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("description_shortened",c,p,1),c,p,0,26,169,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_moreToggle0",c,p,""));});c.pop();}if(!t.s(t.f("description_shortened",c,p,1),c,p,1,0,0,"")){t.b(t.v(t.f("description",c,p,0)));};t.b("\n" + i);t.b("<div class=\"project-published\">");if(t.s(t.f("translate",c,p,1),c,p,0,309,342,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_published_date|Published:");});c.pop();}t.b(" <span class=\"js-format-timestamp\" data-timestamp=\"");t.b(t.v(t.f("published_on",c,p,0)));t.b("\"></span></div>");t.b("\n");return t.fl(); },partials: {"<lib/_moreToggle0":{name:"lib/_moreToggle", partials: {}, subs: { "shortened": function(c,p,t,i) {t.b(t.v(t.f("description_shortened",c,p,0)));},"full": function(c,p,t,i) {t.b(t.v(t.f("description",c,p,0)));} }}}, subs: {  }}, "{{#description_shortened}}\n  {{<lib/_moreToggle}}\n    {{$shortened}}{{description_shortened}}{{/shortened}}\n    {{$full}}{{description}}{{/full}}\n  {{/lib/_moreToggle}}\n{{/description_shortened}}\n{{^description_shortened}}{{description}}{{/description_shortened}}\n<div class=\"project-published\">{{#translate}}project_published_date|Published:{{/translate}} <span class=\"js-format-timestamp\" data-timestamp=\"{{published_on}}\"></span></div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_moreToggle": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_headerTablet", ["hogan", "vendor/require/hgn!templates/project/_blocks/_tools", "vendor/require/hgn!templates/project/_blocks/_aboutInner"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"project-header-tablet\" class=\"show-tablet\">");t.b("\n" + i);t.b("  <div class=\"project-header-tablet--item beicons-pre beicons-pre-add-projects js-action-collection\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    ");if(t.s(t.f("translate",c,p,1),c,p,0,190,240,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_add_to_collection_button|Add to Collection");});c.pop();}t.b("\n" + i);t.b("  </div>");t.b("\n" + i);if(t.s(t.f("has_tools",c,p,1),c,p,0,280,652,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <div class=\"project-header-tablet--item item-tools beicons-pre beicons-pre-settings tooltipi-container\">");t.b("\n" + i);t.b("    ");if(t.s(t.f("translate",c,p,1),c,p,0,406,441,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_tools_used_label|Tools Used");});c.pop();}t.b("\n" + i);t.b("    <div class=\"tooltipi tooltipi-white\">");t.b("\n" + i);t.b("      <h3 class=\"project-block-header\">");if(t.s(t.f("translate",c,p,1),c,p,0,551,576,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_tools_label|Tools");});c.pop();}t.b("</h3>");t.b("\n" + i);t.b(t.rp("<project/_blocks/_tools0",c,p,"      "));t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);});c.pop();}t.b("  <div class=\"project-header-tablet--item item-about beicons-pre tooltipi-container\">");t.b("\n" + i);t.b("    ");if(t.s(t.f("translate",c,p,1),c,p,0,771,796,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_about_label|About");});c.pop();}t.b("\n" + i);t.b("    <div class=\"tooltipi tooltipi-white\">");t.b("\n" + i);t.b("      <h3 class=\"project-block-header\">");if(t.s(t.f("translate",c,p,1),c,p,0,906,931,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_about_label|About");});c.pop();}t.b("</h3>");t.b("\n" + i);t.b(t.rp("<project/_blocks/_aboutInner1",c,p,"      "));t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<project/_blocks/_tools0":{name:"project/_blocks/_tools", partials: {}, subs: {  }},"<project/_blocks/_aboutInner1":{name:"project/_blocks/_aboutInner", partials: {}, subs: {  }}}, subs: {  }}, "<div id=\"project-header-tablet\" class=\"show-tablet\">\n  <div class=\"project-header-tablet--item beicons-pre beicons-pre-add-projects js-action-collection\" data-id=\"{{id}}\">\n    {{#translate}}project_add_to_collection_button|Add to Collection{{/translate}}\n  </div>\n  {{#has_tools}}\n  <div class=\"project-header-tablet--item item-tools beicons-pre beicons-pre-settings tooltipi-container\">\n    {{#translate}}project_tools_used_label|Tools Used{{/translate}}\n    <div class=\"tooltipi tooltipi-white\">\n      <h3 class=\"project-block-header\">{{#translate}}project_tools_label|Tools{{/translate}}</h3>\n      {{>project/_blocks/_tools}}\n    </div>\n  </div>\n  {{/has_tools}}\n  <div class=\"project-header-tablet--item item-about beicons-pre tooltipi-container\">\n    {{#translate}}project_about_label|About{{/translate}}\n    <div class=\"tooltipi tooltipi-white\">\n      <h3 class=\"project-block-header\">{{#translate}}project_about_label|About{{/translate}}</h3>\n      {{>project/_blocks/_aboutInner}}\n    </div>\n  </div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_tools": arguments[1].template,"project/_blocks/_aboutInner": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_layout/_spacer", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"project-spacer\">");t.b("\n" + i);t.b("  <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABXgAAAABCAYAAABkHsaZAAAAH0lEQVRYw+3DAQkAAAwEoe9f+pZjoOCqqaqqqqr67wH2oViJHh1OqwAAAABJRU5ErkJggg==\">");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div id=\"project-spacer\">\n  {{!data uri is of public/assets/img/project/spacer.png}}\n  <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABXgAAAABCAYAAABkHsaZAAAAH0lEQVRYw+3DAQkAAAwEoe9f+pZjoOCqqaqqqqr67wH2oViJHh1OqwAAAABJRU5ErkJggg==\">\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_modules/_text", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("can_access",c,p,1),c,p,0,15,154,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<div class=\"project-module module project-module-text text align-");t.b(t.v(t.f("alignment",c,p,0)));t.b("\">");t.b("\n" + i);t.b("  <div class=\"main-text\">");t.b("\n" + i);t.b("    ");t.b(t.t(t.f("text",c,p,0)));t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {}, subs: {  }}, "{{#can_access}}\n<div class=\"project-module module project-module-text text align-{{alignment}}\">\n  <div class=\"main-text\">\n    {{{text}}}\n  </div>\n</div>\n{{/can_access}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_pictureLazy", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"js-picture-lazy\">");t.b("\n" + i);if(t.s(t.f("picture",c,p,1),c,p,0,44,334,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("sources",c,p,1),c,p,0,61,125,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <source srcset=\"");t.b(t.v(t.f("srcset",c,p,0)));t.b("\" media=\"");t.b(t.v(t.f("media_query",c,p,0)));t.b("\">");t.b("\n" + i);});c.pop();}if(t.s(t.f("img",c,p,1),c,p,0,150,323,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <img data-src=\"");t.b(t.v(t.f("src",c,p,0)));t.b("\" src=\"");t.b(t.v(t.f("IMAGESURL",c,p,0)));t.b("site/blank.png\" width=\"");t.b(t.v(t.f("width",c,p,0)));t.b("\" height=\"0\" style=\"padding-bottom: ");t.b(t.v(t.f("aspect_ratio",c,p,0)));t.b("; background: rgba(0, 0, 0, 0.03)\">");t.b("\n" + i);});c.pop();}});c.pop();}t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"js-picture-lazy\">\n  {{#picture}}\n    {{#sources}}\n      <source srcset=\"{{srcset}}\" media=\"{{media_query}}\">\n    {{/sources}}\n    {{#img}}\n      <img data-src=\"{{src}}\" src=\"{{IMAGESURL}}site/blank.png\" width=\"{{width}}\" height=\"0\" style=\"padding-bottom: {{aspect_ratio}}; background: rgba(0, 0, 0, 0.03)\">\n    {{/img}}\n  {{/picture}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_picture", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<picture>");t.b("\n" + i);if(t.s(t.f("sources",c,p,1),c,p,0,22,78,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <source srcset=\"");t.b(t.v(t.f("srcset",c,p,0)));t.b("\" media=\"");t.b(t.v(t.f("media_query",c,p,0)));t.b("\">");t.b("\n" + i);});c.pop();}if(t.s(t.f("img",c,p,1),c,p,0,99,122,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <img src=\"");t.b(t.v(t.f("src",c,p,0)));t.b("\">");t.b("\n" + i);});c.pop();}t.b("</picture>");return t.fl(); },partials: {}, subs: {  }}, "<picture>\n{{#sources}}\n  <source srcset=\"{{srcset}}\" media=\"{{media_query}}\">\n{{/sources}}\n{{#img}}\n  <img src=\"{{src}}\">\n{{/img}}\n</picture>", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_modules/_image", ["hogan", "vendor/require/hgn!templates/lib/_pictureLazy", "vendor/require/hgn!templates/lib/_picture"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"");if(t.s(t.f("is_hd_available",c,p,1),c,p,0,32,58,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("js-project-module-image-hd");});c.pop();}t.b(" project-module module ");t.b(t.v(t.f("type",c,p,0)));t.b(" project-module-");t.b(t.v(t.f("type",c,p,0)));if(t.s(t.f("full_bleed",c,p,1),c,p,0,148,185,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" image-full project-module-image-full");});c.pop();}if(!t.s(t.f("can_access",c,p,1),c,p,1,0,0,"")){t.b(" unsafe");};t.b("\" ");if(t.s(t.f("is_hd_available",c,p,1),c,p,0,259,291,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("data-hd-src=\"");t.b(t.v(t.d("sizes.max_1240",c,p,0)));t.b("\"");});c.pop();}t.b(">");t.b("\n" + i);t.b("  <div class=\"project-module-image-inner-wrap\">");t.b("\n" + i);if(!t.s(t.f("is_feature_queue_admin",c,p,1),c,p,1,0,0,"")){if(t.s(t.f("can_access",c,p,1),c,p,0,414,589,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("is_lazy",c,p,1),c,p,0,435,476,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_pictureLazy0",c,p,"          "));});c.pop();}if(!t.s(t.f("is_lazy",c,p,1),c,p,1,0,0,"")){if(t.s(t.f("picture",c,p,1),c,p,0,532,549,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_picture1",c,p,""));});c.pop();}};});c.pop();}};if(t.s(t.f("is_feature_queue_admin",c,p,1),c,p,0,668,721,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("picture",c,p,1),c,p,0,687,704,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_picture2",c,p,""));});c.pop();}});c.pop();}t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<lib/_pictureLazy0":{name:"lib/_pictureLazy", partials: {}, subs: {  }},"<lib/_picture1":{name:"lib/_picture", partials: {}, subs: {  }},"<lib/_picture2":{name:"lib/_picture", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"{{#is_hd_available}}js-project-module-image-hd{{/is_hd_available}} project-module module {{type}} project-module-{{type}}{{#full_bleed}} image-full project-module-image-full{{/full_bleed}}{{^can_access}} unsafe{{/can_access}}\" {{#is_hd_available}}data-hd-src=\"{{sizes.max_1240}}\"{{/is_hd_available}}>\n  <div class=\"project-module-image-inner-wrap\">\n    {{^is_feature_queue_admin}}\n      {{#can_access}}\n        {{#is_lazy}}\n          {{>lib/_pictureLazy}}\n        {{/is_lazy}}\n        {{^is_lazy}}\n          {{#picture}}{{>lib/_picture}}{{/picture}}\n        {{/is_lazy}}\n      {{/can_access}}\n    {{/is_feature_queue_admin}}\n    {{#is_feature_queue_admin}}\n      {{#picture}}{{>lib/_picture}}{{/picture}}\n    {{/is_feature_queue_admin}}\n  </div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_pictureLazy": arguments[1].template,"lib/_picture": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_modules/_embed", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"project-module module ");t.b(t.v(t.f("type",c,p,0)));t.b(" project-module-");t.b(t.v(t.f("type",c,p,0)));if(!t.s(t.f("can_access",c,p,1),c,p,1,0,0,"")){t.b(" unsafe");};t.b("\">");t.b("\n" + i);if(t.s(t.f("can_access",c,p,1),c,p,0,123,142,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    ");t.b(t.t(t.f("embed",c,p,0)));t.b("\n" + i);});c.pop();}t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"project-module module {{type}} project-module-{{type}}{{^can_access}} unsafe{{/can_access}}\">\n  {{#can_access}}\n    {{{embed}}}\n  {{/can_access}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_collection/_add", ["hogan", "vendor/require/hgn!templates/lib/_button"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<lib/_button0",c,p,""));return t.fl(); },partials: {"<lib/_button0":{name:"lib/_button", partials: {}, subs: { "attrs": function(c,p,t,i) {t.b("data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\"");},"classes": function(c,p,t,i) {t.b("form-button-light-and-blue js-action-collection");},"icon": function(c,p,t,i) {t.b("beicons-pre beicons-pre-collection");},"label": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,211,261,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_add_to_collection_button|Add to Collection");});c.pop();}} }}}, subs: {  }}, "{{<lib/_button}}\n  {{$attrs}}data-id=\"{{id}}\"{{/attrs}}\n  {{$classes}}form-button-light-and-blue js-action-collection{{/classes}}\n  {{$icon}}beicons-pre beicons-pre-collection{{/icon}}\n  {{$label}}{{#translate}}project_add_to_collection_button|Add to Collection{{/translate}}{{/label}}\n{{/lib/_button}}", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_button": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_layout/_appreciation", ["hogan", "vendor/require/hgn!templates/lib/_collection/_add", "vendor/require/hgn!templates/lib/_follow/_buttonUser", "vendor/require/hgn!templates/lib/_follow/_buttonAll"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"appreciation\" class=\"show-on-preview unclickable-mask appreciation-button js-appreciate\">");t.b("\n" + i);t.b("  <div id=\"sticker\">");t.b("\n" + i);t.b("    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" preserveAspectRatio=\"xMidYMid\" width=\"180\" height=\"180\" viewBox=\"0 0 90 90\" fill=\"url('#appreciation-gradient')\">");t.b("\n" + i);t.b("  		<defs>");t.b("\n" + i);t.b("        <linearGradient id=\"appreciation-gradient\" x1=\"0\" x2=\"0\" y1=\"0\" y2=\"1\">");t.b("\n" + i);t.b("          <stop class=\"appreciation-stop-1\" offset=\"0%\"/>");t.b("\n" + i);t.b("          <stop class=\"appreciation-stop-2\" offset=\"100%\"/>");t.b("\n" + i);t.b("        </linearGradient>");t.b("\n" + i);t.b("      </defs>");t.b("\n" + i);t.b("      <path d=\"M89.999 45 C89.999 46.6 85.8 48 85.7 49.6 C85.481 51.2 89.2 53.5 88.9 55 C88.521 56.6 84.2 57 83.6 58.5 C83.096 60.1 86.2 63.1 85.5 64.5 C84.849 66 80.5 65.4 79.6 66.8 C78.791 68.1 81.2 71.8 80.2 73.1 C79.177 74.3 75.1 72.8 73.9 73.9 C72.794 75.1 74.3 79.2 73.1 80.2 C71.802 81.2 68.1 78.8 66.8 79.7 C65.411 80.5 66 84.9 64.5 85.6 C63.087 86.3 60 83.1 58.5 83.6 C57.008 84.2 56.6 88.5 55 88.9 C53.459 89.2 51.2 85.5 49.6 85.7 C48.002 85.8 46.6 90 45 90 C43.370 90 42 85.8 40.4 85.7 C38.799 85.5 36.5 89.2 35 88.9 C33.403 88.5 33 84.2 31.5 83.6 C29.953 83.1 26.9 86.3 25.5 85.6 C24.013 84.9 24.6 80.5 23.2 79.7 C21.863 78.8 18.2 81.2 16.9 80.2 C15.680 79.2 17.2 75.1 16.1 73.9 C14.927 72.8 10.8 74.3 9.8 73.1 C8.811 71.8 11.2 68.1 10.3 66.8 C9.491 65.4 5.1 66 4.4 64.5 C3.748 63.1 6.9 60.1 6.4 58.5 C5.837 57 1.5 56.6 1.1 55 C0.761 53.5 4.5 51.2 4.3 49.6 C4.157 48 -0 46.6 -0 45 C-0.005 43.4 4.2 42 4.3 40.4 C4.513 38.8 0.8 36.5 1.1 35 C1.473 33.4 5.8 33 6.4 31.5 C6.898 30 3.7 26.9 4.4 25.5 C5.144 24 9.5 24.6 10.3 23.2 C11.203 21.9 8.8 18.2 9.8 16.9 C10.817 15.7 14.9 17.2 16.1 16.1 C17.200 14.9 15.7 10.8 16.9 9.8 C18.191 8.8 21.9 11.2 23.2 10.4 C24.583 9.5 24 5.2 25.5 4.5 C26.907 3.8 30 6.9 31.5 6.4 C32.986 5.8 33.4 1.5 35 1.1 C36.535 0.8 38.8 4.5 40.4 4.3 C41.991 4.2 43.4 0 45 0 C46.623 0 48 4.2 49.6 4.3 C51.195 4.5 53.5 0.8 55 1.1 C56.591 1.5 57 5.8 58.5 6.4 C60.041 6.9 63.1 3.8 64.5 4.5 C65.981 5.2 65.4 9.5 66.8 10.4 C68.131 11.2 71.8 8.8 73.1 9.8 C74.314 10.8 72.8 14.9 73.9 16.1 C75.067 17.2 79.2 15.7 80.2 16.9 C81.183 18.2 78.8 21.9 79.6 23.2 C80.503 24.6 84.8 24 85.6 25.5 C86.246 26.9 83.1 30 83.6 31.5 C84.157 33 88.5 33.4 88.9 35 C89.233 36.5 85.5 38.8 85.7 40.4 C85.837 42 90 43.4 90 45 Z\"/>");t.b("\n" + i);t.b("    </svg>");t.b("\n" + i);t.b("    <div class=\"thumb beicons-pre beicons-pre-thumb\"></div>");t.b("\n" + i);t.b("    <div class=\"text\">");if(t.s(t.f("translate",c,p,1),c,p,0,2405,2445,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_apprecation_thank_you|Thank You!");});c.pop();}t.b("</div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"js-appreciation-date project-appreciation-date beicons-pre beicons-pre-thumb\"></div>");t.b("\n" + i);t.b("  <div class=\"tooltipi tooltipi-white\">");t.b("\n" + i);t.b(t.rp("<lib/_collection/_add0",c,p,"    "));if(!t.s(t.f("has_multiple_owners",c,p,1),c,p,1,0,0,"")){if(t.s(t.f("owners",c,p,1),c,p,0,2683,2711,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_follow/_buttonUser1",c,p,""));});c.pop();}};if(t.s(t.f("has_multiple_owners",c,p,1),c,p,0,2775,2802,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_follow/_buttonAll2",c,p,""));});c.pop();}t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<lib/_collection/_add0":{name:"lib/_collection/_add", partials: {}, subs: {  }},"<lib/_follow/_buttonUser1":{name:"lib/_follow/_buttonUser", partials: {}, subs: {  }},"<lib/_follow/_buttonAll2":{name:"lib/_follow/_buttonAll", partials: {}, subs: {  }}}, subs: {  }}, "<div id=\"appreciation\" class=\"show-on-preview unclickable-mask appreciation-button js-appreciate\">\n  <div id=\"sticker\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" preserveAspectRatio=\"xMidYMid\" width=\"180\" height=\"180\" viewBox=\"0 0 90 90\" fill=\"url('#appreciation-gradient')\">\n  \t\t<defs>\n        <linearGradient id=\"appreciation-gradient\" x1=\"0\" x2=\"0\" y1=\"0\" y2=\"1\">\n          <stop class=\"appreciation-stop-1\" offset=\"0%\"/>\n          <stop class=\"appreciation-stop-2\" offset=\"100%\"/>\n        </linearGradient>\n      </defs>\n      <path d=\"M89.999 45 C89.999 46.6 85.8 48 85.7 49.6 C85.481 51.2 89.2 53.5 88.9 55 C88.521 56.6 84.2 57 83.6 58.5 C83.096 60.1 86.2 63.1 85.5 64.5 C84.849 66 80.5 65.4 79.6 66.8 C78.791 68.1 81.2 71.8 80.2 73.1 C79.177 74.3 75.1 72.8 73.9 73.9 C72.794 75.1 74.3 79.2 73.1 80.2 C71.802 81.2 68.1 78.8 66.8 79.7 C65.411 80.5 66 84.9 64.5 85.6 C63.087 86.3 60 83.1 58.5 83.6 C57.008 84.2 56.6 88.5 55 88.9 C53.459 89.2 51.2 85.5 49.6 85.7 C48.002 85.8 46.6 90 45 90 C43.370 90 42 85.8 40.4 85.7 C38.799 85.5 36.5 89.2 35 88.9 C33.403 88.5 33 84.2 31.5 83.6 C29.953 83.1 26.9 86.3 25.5 85.6 C24.013 84.9 24.6 80.5 23.2 79.7 C21.863 78.8 18.2 81.2 16.9 80.2 C15.680 79.2 17.2 75.1 16.1 73.9 C14.927 72.8 10.8 74.3 9.8 73.1 C8.811 71.8 11.2 68.1 10.3 66.8 C9.491 65.4 5.1 66 4.4 64.5 C3.748 63.1 6.9 60.1 6.4 58.5 C5.837 57 1.5 56.6 1.1 55 C0.761 53.5 4.5 51.2 4.3 49.6 C4.157 48 -0 46.6 -0 45 C-0.005 43.4 4.2 42 4.3 40.4 C4.513 38.8 0.8 36.5 1.1 35 C1.473 33.4 5.8 33 6.4 31.5 C6.898 30 3.7 26.9 4.4 25.5 C5.144 24 9.5 24.6 10.3 23.2 C11.203 21.9 8.8 18.2 9.8 16.9 C10.817 15.7 14.9 17.2 16.1 16.1 C17.200 14.9 15.7 10.8 16.9 9.8 C18.191 8.8 21.9 11.2 23.2 10.4 C24.583 9.5 24 5.2 25.5 4.5 C26.907 3.8 30 6.9 31.5 6.4 C32.986 5.8 33.4 1.5 35 1.1 C36.535 0.8 38.8 4.5 40.4 4.3 C41.991 4.2 43.4 0 45 0 C46.623 0 48 4.2 49.6 4.3 C51.195 4.5 53.5 0.8 55 1.1 C56.591 1.5 57 5.8 58.5 6.4 C60.041 6.9 63.1 3.8 64.5 4.5 C65.981 5.2 65.4 9.5 66.8 10.4 C68.131 11.2 71.8 8.8 73.1 9.8 C74.314 10.8 72.8 14.9 73.9 16.1 C75.067 17.2 79.2 15.7 80.2 16.9 C81.183 18.2 78.8 21.9 79.6 23.2 C80.503 24.6 84.8 24 85.6 25.5 C86.246 26.9 83.1 30 83.6 31.5 C84.157 33 88.5 33.4 88.9 35 C89.233 36.5 85.5 38.8 85.7 40.4 C85.837 42 90 43.4 90 45 Z\"/>\n    </svg>\n    <div class=\"thumb beicons-pre beicons-pre-thumb\"></div>\n    <div class=\"text\">{{#translate}}project_apprecation_thank_you|Thank You!{{/translate}}</div>\n  </div>\n  <div class=\"js-appreciation-date project-appreciation-date beicons-pre beicons-pre-thumb\"></div>\n  <div class=\"tooltipi tooltipi-white\">\n    {{>lib/_collection/_add}}\n    {{^has_multiple_owners}}{{#owners}}{{>lib/_follow/_buttonUser}}{{/owners}}{{/has_multiple_owners}}\n    {{#has_multiple_owners}}{{>lib/_follow/_buttonAll}}{{/has_multiple_owners}}\n  </div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_collection/_add": arguments[1].template,"lib/_follow/_buttonUser": arguments[2].template,"lib/_follow/_buttonAll": arguments[3].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_layout/_canvas", ["hogan", "vendor/require/hgn!templates/project/_layout/_spacer", "vendor/require/hgn!templates/project/_modules/_text", "vendor/require/hgn!templates/project/_modules/_image", "vendor/require/hgn!templates/project/_modules/_embed", "vendor/require/hgn!templates/project/_layout/_appreciation"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"project-canvas\"");if(t.s(t.f("styles",c,p,1),c,p,0,35,58,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" class=\"project-styles\"");});c.pop();}if(t.s(t.f("is_iframe",c,p,1),c,p,0,83,121,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("style=\"max-width: ");t.b(t.v(t.f("canvas_width",c,p,0)));t.b("px;\"");});c.pop();}t.b(">");t.b("\n" + i);t.b("  <div id=\"project-modules\">");t.b("\n" + i);t.b(t.rp("<project/_layout/_spacer0",c,p,"  "));if(t.s(t.f("modules",c,p,1),c,p,0,211,860,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("is_text",c,p,1),c,p,0,228,267,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<project/_modules/_text1",c,p,"      "));});c.pop();}t.b("\n" + i);if(t.s(t.f("is_image",c,p,1),c,p,0,298,338,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<project/_modules/_image2",c,p,"      "));});c.pop();}t.b("\n" + i);if(t.s(t.f("is_audio",c,p,1),c,p,0,370,410,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<project/_modules/_embed3",c,p,"      "));});c.pop();}t.b("\n" + i);if(t.s(t.f("is_video",c,p,1),c,p,0,442,482,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<project/_modules/_embed4",c,p,"      "));});c.pop();}t.b("\n" + i);if(t.s(t.f("is_embed",c,p,1),c,p,0,514,554,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<project/_modules/_embed5",c,p,"      "));});c.pop();}if(t.s(t.f("caption",c,p,1),c,p,0,584,775,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <div class=\"project-module caption-container align-");t.b(t.v(t.f("caption_alignment",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      <div class=\"module-caption caption caption-text-wrap\">");t.b("\n" + i);t.b("        ");t.b(t.t(t.f("caption",c,p,0)));t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);});c.pop();}t.b("    <div class=\"spacer\">");t.b("\n" + i);t.b("      <div class=\"divider\"></div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);});c.pop();}t.b("  </div>");t.b("\n" + i);t.b(t.rp("<project/_layout/_appreciation6",c,p,"  "));t.b("</div>");t.b("\n");return t.fl(); },partials: {"<project/_layout/_spacer0":{name:"project/_layout/_spacer", partials: {}, subs: {  }},"<project/_modules/_text1":{name:"project/_modules/_text", partials: {}, subs: {  }},"<project/_modules/_image2":{name:"project/_modules/_image", partials: {}, subs: {  }},"<project/_modules/_embed3":{name:"project/_modules/_embed", partials: {}, subs: {  }},"<project/_modules/_embed4":{name:"project/_modules/_embed", partials: {}, subs: {  }},"<project/_modules/_embed5":{name:"project/_modules/_embed", partials: {}, subs: {  }},"<project/_layout/_appreciation6":{name:"project/_layout/_appreciation", partials: {}, subs: {  }}}, subs: {  }}, "<div id=\"project-canvas\"{{#styles}} class=\"project-styles\"{{/styles}}{{#is_iframe}}style=\"max-width: {{canvas_width}}px;\"{{/is_iframe}}>\n  <div id=\"project-modules\">\n  {{>project/_layout/_spacer}}\n  {{#modules}}\n    {{#is_text}}\n      {{>project/_modules/_text}}\n    {{/is_text}}\n\n    {{#is_image}}\n      {{>project/_modules/_image}}\n    {{/is_image}}\n\n    {{#is_audio}}\n      {{>project/_modules/_embed}}\n    {{/is_audio}}\n\n    {{#is_video}}\n      {{>project/_modules/_embed}}\n    {{/is_video}}\n\n    {{#is_embed}}\n      {{>project/_modules/_embed}}\n    {{/is_embed}}\n    {{#caption}}\n    <div class=\"project-module caption-container align-{{caption_alignment}}\">\n      <div class=\"module-caption caption caption-text-wrap\">\n        {{{caption}}}\n      </div>\n    </div>\n    {{/caption}}\n    <div class=\"spacer\">\n      <div class=\"divider\"></div>\n    </div>\n  {{/modules}}\n  </div>\n  {{>project/_layout/_appreciation}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_layout/_spacer": arguments[1].template,"project/_modules/_text": arguments[2].template,"project/_modules/_image": arguments[3].template,"project/_modules/_embed": arguments[4].template,"project/_layout/_appreciation": arguments[5].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_layout/_ownerBar", ["hogan", "vendor/require/hgn!templates/project/_blocks/_owner"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"project-owner-bar\" class=\"cfix show-on-preview unclickable-mask\">");t.b("\n" + i);t.b("  <div id=\"project-owner-bar-inner\">");t.b("\n" + i);t.b("    <div id=\"project-owner-bar-info\">");t.b("\n" + i);t.b(t.rp("<project/_blocks/_owner0",c,p,""));t.b("    </div>");t.b("\n" + i);if(!t.s(t.f("has_multiple_owners",c,p,1),c,p,1,0,0,"")){if(t.s(t.f("owners",c,p,1),c,p,0,425,622,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" class=\"view-profile light-link hide-phone\">");if(t.s(t.f("translate",c,p,1),c,p,0,509,590,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_view_complete_profile|View <span class=\"complete\">Complete</span> Profile");});c.pop();}t.b(" &rarr;</a>");t.b("\n" + i);});c.pop();}};t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<project/_blocks/_owner0":{name:"project/_blocks/_owner", partials: {}, subs: { "ownerInfoClasses": function(c,p,t,i) {t.b("project-owner-info--owner-bar");},"ownerActionClasses": function(c,p,t,i) {t.b("dark-background");} }}}, subs: {  }}, "<div id=\"project-owner-bar\" class=\"cfix show-on-preview unclickable-mask\">\n  <div id=\"project-owner-bar-inner\">\n    <div id=\"project-owner-bar-info\">\n      {{<project/_blocks/_owner}}\n        {{$ownerInfoClasses}}project-owner-info--owner-bar{{/ownerInfoClasses}}\n        {{$ownerActionClasses}}dark-background{{/ownerActionClasses}}\n      {{/project/_blocks/_owner}}\n    </div>\n    {{^has_multiple_owners}}\n      {{#owners}}\n        <a href=\"{{url}}\" class=\"view-profile light-link hide-phone\">{{#translate}}project_view_complete_profile|View <span class=\"complete\">Complete</span> Profile{{/translate}} &rarr;</a>\n      {{/owners}}\n    {{/has_multiple_owners}}\n  </div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_owner": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_editButton", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<span class=\"js-edit-icon content-edit edit-icon beicons-pre beicons-pre-edit hide-tablet hide-phone\"></span>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<span class=\"js-edit-icon content-edit edit-icon beicons-pre beicons-pre-edit hide-tablet hide-phone\"></span>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_reorderButton", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"js-controls-overlay-reorder controls-overlay-action controls-overlay-reorder\">");t.b("\n" + i);t.b("    <span class=\"beicons-pre beicons-pre-hamburger edit-icon\"></span>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"js-controls-overlay-reorder controls-overlay-action controls-overlay-reorder\">\n    <span class=\"beicons-pre beicons-pre-hamburger edit-icon\"></span>\n</div>", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/profile/_overlays/_projectOverlay", ["hogan", "vendor/require/hgn!templates/lib/_reorderButton", "vendor/require/hgn!templates/lib/_editButton"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"controls-overlay hide-phone hide-tablet\">");t.b("\n" + i);if(t.s(t.f("is_team",c,p,1),c,p,0,68,157,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("is_admin_editable",c,p,1),c,p,0,95,132,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_reorderButton0",c,p,"      "));});c.pop();}});c.pop();}if(!t.s(t.f("is_team",c,p,1),c,p,1,0,0,"")){t.b(t.rp("<lib/_reorderButton1",c,p,"    "));};t.b("  <div class=\"controls-overlay-action controls-overlay-menu js-controls-overlay-menu tooltipi-container\">");t.b("\n" + i);t.b(t.rp("<lib/_editButton2",c,p,"    "));t.b("    <span class=\"js-spin overlay-spinner\"></span>");t.b("\n" + i);t.b("    <ul class=\"tooltipi tooltipi-white controls-overlay-menu-items\">");t.b("\n" + i);if(!t.s(t.f("is_team",c,p,1),c,p,1,0,0,"")){t.b("        <li class=\"controls-overlay-menu-item\">");t.b("\n" + i);t.b("          <a href=\"");t.b(t.v(t.f("edit_url",c,p,0)));t.b("\" class=\"js-project-edit beicons-pre beicons-pre-edit\">");t.b("\n" + i);t.b("            ");if(t.s(t.f("translate",c,p,1),c,p,0,662,687,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("profile_project_edit|Edit");});c.pop();}t.b("\n" + i);t.b("          </a>");t.b("\n" + i);t.b("        </li>");t.b("\n" + i);t.b("        <li class=\"controls-overlay-menu-item\">");t.b("\n" + i);t.b("          <a href=\"#\" class=\"js-project-clone beicons-pre beicons-pre-clone\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("            ");if(t.s(t.f("translate",c,p,1),c,p,0,900,927,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("profile_project_clone|Clone");});c.pop();}t.b("\n" + i);t.b("          </a>");t.b("\n" + i);t.b("        </li>");t.b("\n" + i);if(t.s(t.f("share_url",c,p,1),c,p,0,993,1260,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <li class=\"controls-overlay-menu-item\">");t.b("\n" + i);t.b("          <a href=\"");t.b(t.v(t.f("share_url",c,p,0)));t.b("\" class=\"js-project-promote beicons-pre beicons-pre-share\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("            ");if(t.s(t.f("translate",c,p,1),c,p,0,1177,1208,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("profile_project_promote|Promote");});c.pop();}t.b("\n" + i);t.b("          </a>");t.b("\n" + i);t.b("        </li>");t.b("\n" + i);});c.pop();}t.b("        <li class=\"controls-overlay-menu-item\">");t.b("\n" + i);t.b("          <a href=\"#\" class=\"js-project-unpublish beicons-pre beicons-pre-unpublish\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("            ");if(t.s(t.f("translate",c,p,1),c,p,0,1452,1487,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("profile_project_unpublish|Unpublish");});c.pop();}t.b("\n" + i);t.b("          </a>");t.b("\n" + i);t.b("        </li>");t.b("\n" + i);t.b("        <li class=\"controls-overlay-menu-item\">");t.b("\n" + i);t.b("          <a href=\"#\" class=\"js-project-delete beicons-pre beicons-pre-delete\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\"");if(t.s(t.f("multiple_owners",c,p,1),c,p,0,1694,1722,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" data-multiple-owners=\"true\"");});c.pop();}t.b(">");t.b("\n" + i);t.b("            ");if(t.s(t.f("translate",c,p,1),c,p,0,1770,1799,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("profile_project_delete|Delete");});c.pop();}t.b("\n" + i);t.b("          </a>");t.b("\n" + i);t.b("        </li>");t.b("\n" + i);};if(t.s(t.f("is_team",c,p,1),c,p,0,1880,2507,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("is_member_editable",c,p,1),c,p,0,1912,2161,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("          <li class=\"controls-overlay-menu-item\">");t.b("\n" + i);t.b("            <a href=\"");t.b(t.v(t.f("edit_url",c,p,0)));t.b("\" class=\"js-project-edit beicons-pre beicons-pre-edit\">");t.b("\n" + i);t.b("              ");if(t.s(t.f("translate",c,p,1),c,p,0,2080,2105,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("profile_project_edit|Edit");});c.pop();}t.b("\n" + i);t.b("            </a>");t.b("\n" + i);t.b("          </li>");t.b("\n" + i);});c.pop();}if(t.s(t.f("is_admin_editable",c,p,1),c,p,0,2215,2478,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("          <li class=\"controls-overlay-menu-item\">");t.b("\n" + i);t.b("            <a href=\"#\" class=\"js-project-remove beicons-pre beicons-pre-delete\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("              ");if(t.s(t.f("translate",c,p,1),c,p,0,2393,2422,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("profile_project_remove|Remove");});c.pop();}t.b("\n" + i);t.b("            </a>");t.b("\n" + i);t.b("          </li>");t.b("\n" + i);});c.pop();}});c.pop();}t.b("    </ul>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<lib/_reorderButton0":{name:"lib/_reorderButton", partials: {}, subs: {  }},"<lib/_reorderButton1":{name:"lib/_reorderButton", partials: {}, subs: {  }},"<lib/_editButton2":{name:"lib/_editButton", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"controls-overlay hide-phone hide-tablet\">\n  {{#is_team}}\n    {{#is_admin_editable}}\n      {{> lib/_reorderButton }}\n    {{/is_admin_editable}}\n  {{/is_team}}\n  {{^is_team}}\n    {{> lib/_reorderButton }}\n  {{/is_team}}\n  <div class=\"controls-overlay-action controls-overlay-menu js-controls-overlay-menu tooltipi-container\">\n    {{> lib/_editButton }}\n    <span class=\"js-spin overlay-spinner\"></span>\n    <ul class=\"tooltipi tooltipi-white controls-overlay-menu-items\">\n      {{^is_team}}\n        <li class=\"controls-overlay-menu-item\">\n          <a href=\"{{edit_url}}\" class=\"js-project-edit beicons-pre beicons-pre-edit\">\n            {{#translate}}profile_project_edit|Edit{{/translate}}\n          </a>\n        </li>\n        <li class=\"controls-overlay-menu-item\">\n          <a href=\"#\" class=\"js-project-clone beicons-pre beicons-pre-clone\" data-id=\"{{id}}\">\n            {{#translate}}profile_project_clone|Clone{{/translate}}\n          </a>\n        </li>\n        {{#share_url}}\n        <li class=\"controls-overlay-menu-item\">\n          <a href=\"{{share_url}}\" class=\"js-project-promote beicons-pre beicons-pre-share\" data-id=\"{{id}}\">\n            {{#translate}}profile_project_promote|Promote{{/translate}}\n          </a>\n        </li>\n        {{/share_url}}\n        <li class=\"controls-overlay-menu-item\">\n          <a href=\"#\" class=\"js-project-unpublish beicons-pre beicons-pre-unpublish\" data-id=\"{{id}}\">\n            {{#translate}}profile_project_unpublish|Unpublish{{/translate}}\n          </a>\n        </li>\n        <li class=\"controls-overlay-menu-item\">\n          <a href=\"#\" class=\"js-project-delete beicons-pre beicons-pre-delete\" data-id=\"{{id}}\"{{#multiple_owners}} data-multiple-owners=\"true\"{{/multiple_owners}}>\n            {{#translate}}profile_project_delete|Delete{{/translate}}\n          </a>\n        </li>\n      {{/is_team}}\n      {{#is_team}}\n        {{#is_member_editable}}\n          <li class=\"controls-overlay-menu-item\">\n            <a href=\"{{edit_url}}\" class=\"js-project-edit beicons-pre beicons-pre-edit\">\n              {{#translate}}profile_project_edit|Edit{{/translate}}\n            </a>\n          </li>\n        {{/is_member_editable}}\n        {{#is_admin_editable}}\n          <li class=\"controls-overlay-menu-item\">\n            <a href=\"#\" class=\"js-project-remove beicons-pre beicons-pre-delete\" data-id=\"{{id}}\">\n              {{#translate}}profile_project_remove|Remove{{/translate}}\n            </a>\n          </li>\n        {{/is_admin_editable}}\n      {{/is_team}}\n    </ul>\n  </div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_reorderButton": arguments[1].template,"lib/_editButton": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_projectCover", ["hogan", "vendor/require/hgn!templates/lib/_editButton", "vendor/require/hgn!templates/profile/_overlays/_projectOverlay"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"js-item cover-block project-cover js-project-cover editable cfix\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\"");if(t.s(t.f("ordinal_id",c,p,1),c,p,0,109,139,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" data-ordinal=\"");t.b(t.v(t.f("ordinal_id",c,p,0)));t.b("\"");});c.pop();}t.b(">");t.b("\n" + i);if(t.s(t.f("is_collection_editable",c,p,1),c,p,0,185,215,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_editButton0",c,p,"    "));});c.pop();}if(!t.s(t.f("is_collection_editable",c,p,1),c,p,1,0,0,"")){if(t.s(t.f("is_editable",c,p,1),c,p,0,291,339,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<profile/_overlays/_projectOverlay1",c,p,"    "));});c.pop();}};t.b("  <div class=\"cover-img\">");t.b("\n" + i);t.b("    <a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" class=\"cover-img-link\">");t.b("\n" + i);if(t.s(t.d("covers.404",c,p,1),c,p,0,479,995,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <picture class=\"cover-img-el\">");t.b("\n" + i);t.b("        <source srcset=\"");t.b(t.v(t.d("covers.202",c,p,0)));t.b(", ");t.b(t.v(t.d("covers.404",c,p,0)));t.b(" 2x\" media=\"(-webkit-min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("           (min--moz-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("           (-o-min-device-pixel-ratio: 4/3),");t.b("\n" + i);t.b("           (min-device-pixel-ratio: 1.3),");t.b("\n" + i);t.b("           (min-resolution: 1.3dppx)\">");t.b("\n" + i);t.b("        <img srcset=\"");t.b(t.v(t.d("covers.202",c,p,0)));t.b(", ");t.b(t.v(t.d("covers.404",c,p,0)));t.b(" 2x\" alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\">");t.b("\n" + i);t.b("      </picture>");t.b("\n" + i);t.b("    <noscript><img alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("covers.202",c,p,0)));t.b("\" class=\"cover-img-el\" /></noscript>");t.b("\n" + i);});c.pop();}if(!t.s(t.d("covers.404",c,p,1),c,p,1,0,0,"")){t.b("      <img src=\"");t.b(t.v(t.d("covers.202",c,p,0)));t.b("\" alt=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" class=\"cover-img-el\" data-pin-nopin=\"nopin\" />");t.b("\n" + i);};t.b("    </a>");t.b("\n" + i);t.b("  </div>");t.b("\n");t.b("\n" + i);if(t.s(t.f("private",c,p,1),c,p,0,1195,1516,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("\n" + i);t.b("    <div class=\"tooltipi-container project-private pointer\">");t.b("\n");t.b("\n" + i);t.b("      <div class=\"beicons-pre beicons-pre-privacy\"></div>");t.b("\n");t.b("\n" + i);t.b("      <div class=\"tooltipi\">");t.b("\n" + i);t.b("        ");if(t.s(t.f("translate",c,p,1),c,p,0,1369,1432,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_cover_marked_private|This project is marked as private.");});c.pop();}t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("    </div> <!-- .tooltipi-container .wip-private -->");t.b("\n");t.b("\n" + i);});c.pop();}t.b("\n");t.b("\n" + i);t.b("  <div class=\"cover-info-stats\">");t.b("\n");t.b("\n" + i);t.b("    <div class=\"cover-info\">");t.b("\n");t.b("\n" + i);t.b("      <div class=\"cover-name\">");t.b("\n" + i);t.b("        <a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" class=\"projectName cover-name-link\">");t.b(t.v(t.f("name",c,p,0)));t.b("</a>");t.b("\n" + i);t.b("      </div>");t.b("\n");t.b("\n" + i);t.b("      <div class=\"cover-by-wrap\">");t.b("\n" + i);t.b("        <div class=\"cover-by-link");if(!t.s(t.f("multiple_owners",c,p,1),c,p,1,0,0,"")){t.b(" text-ellipsis");};t.b(" ");if(t.s(t.f("multiple_owners",c,p,1),c,p,0,1857,1874,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("multiple-cover-by");});c.pop();}t.b("\">");t.b("\n" + i);t.b("          <span class=\"cover-by\">");if(t.s(t.f("translate",c,p,1),c,p,0,1944,1963,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_cover_by|by");});c.pop();}t.b("</span>");t.b("\n" + i);if(t.s(t.f("multiple_owners",c,p,1),c,p,0,2015,2222,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("          <span class=\"multiple-owners-list tooltipi-container\">");t.b("\n" + i);t.b("            ");if(t.s(t.f("translate",c,p,1),c,p,0,2107,2155,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("collection_cover_multiple_owners|Multiple Owners");});c.pop();}t.b("<ul class=\"tooltipi tooltipi-white-links\">");t.b("\n" + i);});c.pop();}if(t.s(t.f("owners",c,p,1),c,p,0,2266,2926,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("              ");if(t.s(t.f("multiple_owners",c,p,1),c,p,0,2301,2319,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<li class=\"clear\">");});c.pop();}t.b("\n" + i);t.b("                <a class=\"");if(t.s(t.f("multiple_owners",c,p,1),c,p,0,2386,2405,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("multiple-owner-link");});c.pop();}if(!t.s(t.f("multiple_owners",c,p,1),c,p,1,0,0,"")){t.b("single-owner-link");};t.b("\" href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\">");t.b("\n");t.b("\n" + i);if(t.s(t.f("multiple_owners",c,p,1),c,p,0,2539,2700,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("                    <span class=\"multiple-owner-image-container\"><img class=\"multiple-owner-image js-mini-profile\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" src=\"");t.b(t.v(t.d("images.50",c,p,0)));t.b("\"/></span>");});c.pop();}t.b("<span class=\"js-mini-profile\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.v(t.f("display_name",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("                </a>");t.b("\n");t.b("\n" + i);t.b("              ");if(t.s(t.f("multiple_owners",c,p,1),c,p,0,2888,2893,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("</li>");});c.pop();}t.b("\n" + i);});c.pop();}if(t.s(t.f("multiple_owners",c,p,1),c,p,0,2968,3013,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("          </ul>");t.b("\n" + i);t.b("          </span>");t.b("\n" + i);});c.pop();}t.b("        </div>");t.b("\n" + i);t.b("      </div>");t.b("\n");t.b("\n" + i);t.b("    </div>");t.b("\n");t.b("\n" + i);t.b("    <div class=\"cover-stat-fields-wrap\">");t.b("\n");t.b("\n" + i);t.b("      <div class=\"cover-stat-wrap\">");t.b("\n");t.b("\n" + i);t.b("        <span class=\"cover-stat cover-stat-");t.b(t.v(t.d("footer.top_title",c,p,0)));t.b(" js-cover-stat-");t.b(t.v(t.d("footer.top_title",c,p,0)));t.b(" ");if(t.s(t.d("footer.highlighted",c,p,1),c,p,0,3313,3335,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("cover-stat-highlighted");});c.pop();}if(t.s(t.d("footer.top_icon",c,p,1),c,p,0,3378,3422,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" beicons-pre beicons-pre-");t.b(t.v(t.d("footer.top_icon",c,p,0)));});c.pop();}t.b(" ");if(t.s(t.f("format_published_date",c,p,1),c,p,0,3469,3488,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("js-format-timestamp");});c.pop();}t.b("\" data-timestamp=\"");t.b(t.v(t.f("published_on",c,p,0)));t.b("\">");t.b(t.v(t.d("footer.top_value",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("        <span class=\"cover-stat cover-stat-");t.b(t.v(t.d("footer.bottom_title",c,p,0)));t.b(" beicons-pre beicons-pre-");t.b(t.v(t.d("footer.bottom_icon",c,p,0)));t.b(" hide-phone\">");t.b(t.v(t.d("footer.bottom_value",c,p,0)));t.b("</span>");t.b("\n");t.b("\n" + i);if(t.s(t.f("featured_on",c,p,1),c,p,0,3760,4066,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("          <div class=\"featured tooltipi-container beicons-pre beicons-pre-featured-small\">");t.b("\n");t.b("\n" + i);t.b("            <div class=\"tooltipi\">");t.b("\n" + i);t.b("              ");if(t.s(t.f("translate",c,p,1),c,p,0,3916,3954,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_cover_featured_on|Featured On:");});c.pop();}t.b(" <strong>");t.b(t.v(t.f("featured_on",c,p,0)));t.b("</strong>");t.b("\n" + i);t.b("            </div>");t.b("\n");t.b("\n" + i);t.b("          </div> <!-- .featured -->");t.b("\n" + i);});c.pop();}t.b("\n" + i);t.b("      </div><!-- .cover-stat-wrap -->");t.b("\n");t.b("\n" + i);t.b("      <div class=\"cover-fields\">");t.b("\n" + i);if(t.s(t.f("field_links",c,p,1),c,p,0,4180,4294,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("          <a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" title=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\" class=\"field-link\">");t.b(t.v(t.f("name",c,p,0)));t.b("</a>");if(t.s(t.f("separate",c,p,1),c,p,0,4270,4272,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(", ");});c.pop();}t.b("\n" + i);});c.pop();}t.b("      </div><!-- .cover-fields -->");t.b("\n");t.b("\n" + i);t.b("    </div><!-- .cover-info -->");t.b("\n");t.b("\n" + i);t.b("  </div><!-- #cover-stat-fields-wrap -->");t.b("\n");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<lib/_editButton0":{name:"lib/_editButton", partials: {}, subs: {  }},"<profile/_overlays/_projectOverlay1":{name:"profile/_overlays/_projectOverlay", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"js-item cover-block project-cover js-project-cover editable cfix\" data-id=\"{{id}}\"{{#ordinal_id}} data-ordinal=\"{{ordinal_id}}\"{{/ordinal_id}}>\n  {{#is_collection_editable}}\n    {{> lib/_editButton }}\n  {{/is_collection_editable}}\n  {{^is_collection_editable}}\n  {{#is_editable}}\n    {{> profile/_overlays/_projectOverlay }}\n  {{/is_editable}}\n  {{/is_collection_editable}}\n  <div class=\"cover-img\">\n    <a href=\"{{url}}\" class=\"cover-img-link\">\n      {{#covers.404}}\n      <picture class=\"cover-img-el\">\n        <source srcset=\"{{covers.202}}, {{covers.404}} 2x\" media=\"(-webkit-min-device-pixel-ratio: 1.3),\n           (min--moz-device-pixel-ratio: 1.3),\n           (-o-min-device-pixel-ratio: 4/3),\n           (min-device-pixel-ratio: 1.3),\n           (min-resolution: 1.3dppx)\">\n        <img srcset=\"{{covers.202}}, {{covers.404}} 2x\" alt=\"{{name}}\">\n      </picture>\n    <noscript><img alt=\"{{name}}\" title=\"{{name}}\" src=\"{{covers.202}}\" class=\"cover-img-el\" /></noscript>\n    {{/covers.404}}\n    {{^covers.404}}\n      <img src=\"{{covers.202}}\" alt=\"{{name}}\" title=\"{{name}}\" class=\"cover-img-el\" data-pin-nopin=\"nopin\" />\n    {{/covers.404}}\n    </a>\n  </div>\n\n  {{#private}}\n\n    <div class=\"tooltipi-container project-private pointer\">\n\n      <div class=\"beicons-pre beicons-pre-privacy\"></div>\n\n      <div class=\"tooltipi\">\n        {{#translate}}project_cover_marked_private|This project is marked as private.{{/translate}}\n      </div>\n    </div> <!-- .tooltipi-container .wip-private -->\n\n  {{/private}}\n\n\n  <div class=\"cover-info-stats\">\n\n    <div class=\"cover-info\">\n\n      <div class=\"cover-name\">\n        <a href=\"{{url}}\" class=\"projectName cover-name-link\">{{name}}</a>\n      </div>\n\n      <div class=\"cover-by-wrap\">\n        <div class=\"cover-by-link{{^multiple_owners}} text-ellipsis{{/multiple_owners}} {{#multiple_owners}}multiple-cover-by{{/multiple_owners}}\">\n          <span class=\"cover-by\">{{#translate}}project_cover_by|by{{/translate}}</span>\n          {{#multiple_owners}}\n          <span class=\"multiple-owners-list tooltipi-container\">\n            {{#translate}}collection_cover_multiple_owners|Multiple Owners{{/translate}}<ul class=\"tooltipi tooltipi-white-links\">\n          {{/multiple_owners}}\n            {{#owners}}\n              {{#multiple_owners}}<li class=\"clear\">{{/multiple_owners}}\n                <a class=\"{{#multiple_owners}}multiple-owner-link{{/multiple_owners}}{{^multiple_owners}}single-owner-link{{/multiple_owners}}\" href=\"{{url}}\">\n\n                  {{#multiple_owners}}\n                    <span class=\"multiple-owner-image-container\"><img class=\"multiple-owner-image js-mini-profile\" data-id=\"{{id}}\" src=\"{{images.50}}\"/></span>{{/multiple_owners}}{{!this must touch to avoid extra space}}<span class=\"js-mini-profile\" data-id=\"{{id}}\">{{display_name}}</span>\n                </a>\n\n              {{#multiple_owners}}</li>{{/multiple_owners}}\n            {{/owners}}\n          {{#multiple_owners}}\n          </ul>\n          </span>\n          {{/multiple_owners}}\n        </div>\n      </div>{{!/.cover-by-wrap}}\n\n    </div>{{!/.cover-info}}\n\n    <div class=\"cover-stat-fields-wrap\">\n\n      <div class=\"cover-stat-wrap\">\n\n        <span class=\"cover-stat cover-stat-{{footer.top_title}} js-cover-stat-{{footer.top_title}} {{#footer.highlighted}}cover-stat-highlighted{{/footer.highlighted}}{{#footer.top_icon}} beicons-pre beicons-pre-{{footer.top_icon}}{{/footer.top_icon}} {{#format_published_date}}js-format-timestamp{{/format_published_date}}\" data-timestamp=\"{{published_on}}\">{{footer.top_value}}</span>\n        <span class=\"cover-stat cover-stat-{{footer.bottom_title}} beicons-pre beicons-pre-{{footer.bottom_icon}} hide-phone\">{{footer.bottom_value}}</span>\n\n        {{#featured_on}}\n          <div class=\"featured tooltipi-container beicons-pre beicons-pre-featured-small\">\n\n            <div class=\"tooltipi\">\n              {{#translate}}project_cover_featured_on|Featured On:{{/translate}} <strong>{{featured_on}}</strong>\n            </div>\n\n          </div> <!-- .featured -->\n        {{/featured_on}}\n\n      </div><!-- .cover-stat-wrap -->\n\n      <div class=\"cover-fields\">\n        {{#field_links}}\n          <a href=\"{{url}}\" title=\"{{name}}\" class=\"field-link\">{{name}}</a>{{#separate}}, {{/separate}}\n        {{/field_links}}\n      </div><!-- .cover-fields -->\n\n    </div><!-- .cover-info -->\n\n  </div><!-- #cover-stat-fields-wrap -->\n\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_editButton": arguments[1].template,"profile/_overlays/_projectOverlay": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_layout/_projectGallery", ["hogan", "vendor/require/hgn!templates/lib/_projectCover"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("hasOtherProjects",c,p,1),c,p,0,21,412,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <div id=\"other-projects\" class=\"unclickable-mask\">");t.b("\n" + i);if(t.s(t.f("otherProjects",c,p,1),c,p,0,97,131,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_projectCover0",c,p,"      "));});c.pop();}if(!t.s(t.f("has_multiple_owners",c,p,1),c,p,1,0,0,"")){if(t.s(t.f("owners",c,p,1),c,p,0,189,346,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" class=\"view-profile show-phone\">");if(t.s(t.f("translate",c,p,1),c,p,0,260,316,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_view_complete_profile_link|View Complete Profile");});c.pop();}t.b(" &rarr;</a>");t.b("\n" + i);});c.pop();}};t.b("  </div>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {"<lib/_projectCover0":{name:"lib/_projectCover", partials: {}, subs: {  }}}, subs: {  }}, "{{#hasOtherProjects}}\n  <div id=\"other-projects\" class=\"unclickable-mask\">\n    {{#otherProjects}}\n      {{>lib/_projectCover}}\n    {{/otherProjects}}\n    {{^has_multiple_owners}}{{#owners}}\n      <a href=\"{{url}}\" class=\"view-profile show-phone\">{{#translate}}project_view_complete_profile_link|View Complete Profile{{/translate}} &rarr;</a>\n    {{/owners}}{{/has_multiple_owners}}\n  </div>{{!/#other-projects}}\n{{/hasOtherProjects}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_projectCover": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_block", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"");t.sub("id",c,p,i);t.b("\" class=\"project-block ");t.sub("class",c,p,i);t.b("\">");t.b("\n" + i);t.b("  <h3 class=\"project-block-header\">");t.sub("title",c,p,i);t.b("</h3>");t.b("\n" + i);t.sub("content",c,p,i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: { "id": function(c,p,t,i) {},"class": function(c,p,t,i) {},"title": function(c,p,t,i) {},"content": function(c,p,t,i) {} }}, "<div id=\"{{$id}}{{/id}}\" class=\"project-block {{$class}}{{/class}}\">\n  <h3 class=\"project-block-header\">{{$title}}{{/title}}</h3>\n    {{$content}}{{/content}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_footer/_commentsButton", ["hogan", "vendor/require/hgn!templates/lib/_button"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<lib/_button0",c,p,""));return t.fl(); },partials: {"<lib/_button0":{name:"lib/_button", partials: {}, subs: { "label": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,43,85,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_post_comment_button|Post a Comment");});c.pop();}},"classes": function(c,p,t,i) {t.b("form-button-default js-submit");} }}}, subs: {  }}, "{{<lib/_button}}\n  {{$label}}{{#translate}}project_post_comment_button|Post a Comment{{/translate}}{{/label}}\n  {{$classes}}form-button-default js-submit{{/classes}}\n{{/lib/_button}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_button": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_footer/_comments", ["hogan", "vendor/require/hgn!templates/project/_blocks/_block", "vendor/require/hgn!templates/project/_blocks/_footer/_commentsButton"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<project/_blocks/_block1",c,p,""));return t.fl(); },partials: {"<project/_blocks/_block1":{name:"project/_blocks/_block", partials: {"<contentproject/_blocks/_footer/_commentsButton0":{name:"project/_blocks/_footer/_commentsButton", partials: {}, subs: {  }}}, subs: { "id": function(c,p,t,i) {t.b("project-block-footer-comments");},"title": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,178,249,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_comments_title|Comments <span class=\"js-comments-total\"></span>");});c.pop();}},"content": function(c,p,t,i) {if(t.s(t.f("loggedIn",c,p,1),c,p,0,306,1127,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <div class=\"comment-post-container js-post-comment-block cfix\">");t.b("\n" + i);t.b("        <img src=\"");t.b(t.v(t.d("loggedInUser.images.115",c,p,0)));t.b("\" class=\"comment-user-image-link comment-owner-image\">");t.b("\n" + i);t.b("        <div class=\"comment-post\">");t.b("\n" + i);t.b("          <form name=\"comments_form\" method=\"post\" class=\"form clear cfix relative comments-form\" accept-charset=\"utf-8\" id=\"comments_form\" action=\"/comments/project\">");t.b("\n" + i);t.b("            <div class=\"form-item form-item-textarea\" id=\"comment-container\">");t.b("\n" + i);t.b("              <textarea name=\"comment\" class=\"form-textarea js-characters-limited js-comment-textarea\" rows=\"10\" cols=\"60\" id=\"comment\" data-validate=\"required,Generic,length[0,800]\"></textarea>");t.b("\n" + i);t.b("            </div>");t.b("\n" + i);t.b(t.rp("<contentproject/_blocks/_footer/_commentsButton0",c,p,"            "));t.b("          </form>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);});c.pop();}if(!t.s(t.f("loggedIn",c,p,1),c,p,1,0,0,"")){t.b("    <div class=\"post-comment-logged-out\">");if(t.s(t.f("translate",c,p,1),c,p,0,1214,1337,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_sign_up_to_comment|You must <a class=\"js-adobeid-signup link-login fake-link\">sign up</a> to join the conversation.");});c.pop();}t.b("</div>");t.b("\n" + i);};t.b("    <div>");t.b("\n" + i);t.b("      <ul class=\"js-comments-list comments-list\"></ul>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"js-see-more comments-pagination hide\">");if(t.s(t.f("translate",c,p,1),c,p,0,1520,1563,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_see_more_comments|See More Comments");});c.pop();}t.b(" <span class=\"beicons-pre beicons-pre-arrow-down\"></span></div>");t.b("\n" + i);} }}}, subs: {  }}, "{{!TODO: use actual form/_textarea form partial instead of regular textarea}}\n{{<project/_blocks/_block}}\n  {{$id}}project-block-footer-comments{{/id}}\n  {{$title}}{{#translate}}project_comments_title|Comments <span class=\"js-comments-total\"></span>{{/translate}}{{/title}}\n  {{$content}}\n    {{#loggedIn}}\n      <div class=\"comment-post-container js-post-comment-block cfix\">\n        <img src=\"{{loggedInUser.images.115}}\" class=\"comment-user-image-link comment-owner-image\">\n        <div class=\"comment-post\">\n          <form name=\"comments_form\" method=\"post\" class=\"form clear cfix relative comments-form\" accept-charset=\"utf-8\" id=\"comments_form\" action=\"/comments/project\">\n            <div class=\"form-item form-item-textarea\" id=\"comment-container\">\n              <textarea name=\"comment\" class=\"form-textarea js-characters-limited js-comment-textarea\" rows=\"10\" cols=\"60\" id=\"comment\" data-validate=\"required,Generic,length[0,800]\"></textarea>\n            </div>\n            {{>project/_blocks/_footer/_commentsButton}}\n          </form>\n        </div>{{!/.comment-post}}\n      </div>{{!/.comment-post-container}}\n    {{/loggedIn}}\n    {{^loggedIn}}\n    <div class=\"post-comment-logged-out\">{{#translate}}project_sign_up_to_comment|You must <a class=\"js-adobeid-signup link-login fake-link\">sign up</a> to join the conversation.{{/translate}}</div>\n    {{/loggedIn}}\n    <div>\n      <ul class=\"js-comments-list comments-list\"></ul>\n    </div>\n    <div class=\"js-see-more comments-pagination hide\">{{#translate}}project_see_more_comments|See More Comments{{/translate}} <span class=\"beicons-pre beicons-pre-arrow-down\"></span></div>\n  {{/content}}\n{{/project/_blocks/_block}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_block": arguments[1].template,"project/_blocks/_footer/_commentsButton": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_footer/_basicInfo", ["hogan", "vendor/require/hgn!templates/project/_blocks/_block"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<project/_blocks/_block0",c,p,""));return t.fl(); },partials: {"<project/_blocks/_block0":{name:"project/_blocks/_block", partials: {}, subs: { "id": function(c,p,t,i) {t.b("project-block-footer-basic-info");},"title": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,102,137,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_basic_info_label|Basic Info");});c.pop();}},"content": function(c,p,t,i) {t.b("    ");t.b(t.v(t.f("description",c,p,0)));t.b("\n" + i);t.b("    <div class=\"project-published\">");if(t.s(t.f("translate",c,p,1),c,p,0,246,279,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_published_date|Published:");});c.pop();}t.b(" <span class=\"js-format-timestamp\" data-timestamp=\"");t.b(t.v(t.f("published_on",c,p,0)));t.b("\"></span></div>");t.b("\n" + i);} }}}, subs: {  }}, "{{<project/_blocks/_block}}\n  {{$id}}project-block-footer-basic-info{{/id}}\n  {{$title}}{{#translate}}project_basic_info_label|Basic Info{{/translate}}{{/title}}\n  {{$content}}\n    {{description}}\n    <div class=\"project-published\">{{#translate}}project_published_date|Published:{{/translate}} <span class=\"js-format-timestamp\" data-timestamp=\"{{published_on}}\"></span></div>\n  {{/content}}\n{{/project/_blocks/_block}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_block": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_follow/_teamLink", ["hogan", "vendor/require/hgn!templates/lib/_profileListItem", "vendor/require/hgn!templates/lib/_follow/_link"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<lib/_profileListItem1",c,p,""));return t.fl(); },partials: {"<lib/_profileListItem1":{name:"lib/_profileListItem", partials: {"<follow_linklib/_follow/_link0":{name:"lib/_follow/_link", partials: {}, subs: { "classes": function(c,p,t,i) {t.b("profile-list-follow-link");},"type": function(c,p,t,i) {t.b("team");} }}}, subs: { "follow_link": function(c,p,t,i) {t.b(t.rp("<follow_linklib/_follow/_link0",c,p,""));} }}}, subs: {  }}, "{{<lib/_profileListItem}}\n  {{$follow_link}}\n    {{<lib/_follow/_link}}\n      {{$classes}}profile-list-follow-link{{/classes}}\n      {{$type}}team{{/type}}\n    {{/lib/_follow/_link}}\n  {{/follow_link}}\n{{/lib/_profileListItem}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_profileListItem": arguments[1].template,"lib/_follow/_link": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_footer/_teams", ["hogan", "vendor/require/hgn!templates/project/_blocks/_block", "vendor/require/hgn!templates/lib/_follow/_teamLink"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<project/_blocks/_block1",c,p,""));return t.fl(); },partials: {"<project/_blocks/_block1":{name:"project/_blocks/_block", partials: {"<contentlib/_follow/_teamLink0":{name:"lib/_follow/_teamLink", partials: {}, subs: {  }}}, subs: { "id": function(c,p,t,i) {t.b("project-block-footer-teams");},"title": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,97,136,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_made_for_label|Project Made For");});c.pop();}},"content": function(c,p,t,i) {if(t.s(t.f("teams",c,p,1),c,p,0,190,228,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<contentlib/_follow/_teamLink0",c,p,"      "));});c.pop();}} }}}, subs: {  }}, "{{<project/_blocks/_block}}\n  {{$id}}project-block-footer-teams{{/id}}\n  {{$title}}{{#translate}}project_made_for_label|Project Made For{{/translate}}{{/title}}\n  {{$content}}\n    {{#teams}}\n      {{>lib/_follow/_teamLink}}\n    {{/teams}}\n  {{/content}}\n{{/project/_blocks/_block}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_block": arguments[1].template,"lib/_follow/_teamLink": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_fakeUserListItem", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"profile-list fake-user\">");t.b("\n" + i);t.b("  <span class=\"normal-link profile-list-image-wrap js-mini-profile\"><img class=\"profile-list-image\" src=\"/assets/img/profile/no-image-115.jpg\" /></span>");t.b("\n" + i);t.b("  <div class=\"profile-list-info profile-list-info-row\">");t.b("\n" + i);t.b("    <div class=\"profile-list-name\"><a class=\"normal-link\">");t.b(t.v(t.f("first_name",c,p,0)));t.b("</a></div><!-- /.profile-list-name -->");t.b("\n" + i);t.b("  </div><!-- /.profile-list-info -->");t.b("\n" + i);t.b("</div><!-- /.profile-list -->");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"profile-list fake-user\">\n  <span class=\"normal-link profile-list-image-wrap js-mini-profile\"><img class=\"profile-list-image\" src=\"/assets/img/profile/no-image-115.jpg\" /></span>\n  <div class=\"profile-list-info profile-list-info-row\">\n    <div class=\"profile-list-name\"><a class=\"normal-link\">{{first_name}}</a></div><!-- /.profile-list-name -->\n  </div><!-- /.profile-list-info -->\n</div><!-- /.profile-list -->\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_footer/_credits", ["hogan", "vendor/require/hgn!templates/project/_blocks/_block", "vendor/require/hgn!templates/lib/_profileListItem", "vendor/require/hgn!templates/lib/_follow/_userLink", "vendor/require/hgn!templates/lib/_fakeUserListItem"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<project/_blocks/_block5",c,p,""));return t.fl(); },partials: {"<project/_blocks/_block5":{name:"project/_blocks/_block", partials: {"<contentlib/_profileListItem1":{name:"lib/_profileListItem", partials: {"<follow_linklib/_follow/_userLink0":{name:"lib/_follow/_userLink", partials: {}, subs: {  }}}, subs: { "follow_link": function(c,p,t,i) {t.b(t.rp("<follow_linklib/_follow/_userLink0",c,p,""));} }},"<contentlib/_profileListItem3":{name:"lib/_profileListItem", partials: {"<follow_linklib/_follow/_userLink2":{name:"lib/_follow/_userLink", partials: {}, subs: {  }}}, subs: { "follow_link": function(c,p,t,i) {t.b(t.rp("<follow_linklib/_follow/_userLink2",c,p,""));} }},"<contentlib/_fakeUserListItem4":{name:"lib/_fakeUserListItem", partials: {}, subs: {  }}}, subs: { "id": function(c,p,t,i) {t.b("project-block-footer-credits");},"title": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,99,128,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_credits_label|Credits");});c.pop();}},"content": function(c,p,t,i) {if(t.s(t.f("owners",c,p,1),c,p,0,183,319,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<contentlib/_profileListItem1",c,p,""));});c.pop();}if(t.s(t.f("credits",c,p,1),c,p,0,347,604,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("username",c,p,1),c,p,0,367,511,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<contentlib/_profileListItem3",c,p,""));});c.pop();}if(!t.s(t.f("username",c,p,1),c,p,1,0,0,"")){t.b(t.rp("<contentlib/_fakeUserListItem4",c,p,"        "));};});c.pop();}} }}}, subs: {  }}, "{{<project/_blocks/_block}}\n  {{$id}}project-block-footer-credits{{/id}}\n  {{$title}}{{#translate}}project_credits_label|Credits{{/translate}}{{/title}}\n  {{$content}}\n    {{#owners}}\n      {{<lib/_profileListItem}}\n        {{$follow_link}}{{>lib/_follow/_userLink}}{{/follow_link}}\n      {{/lib/_profileListItem}}\n    {{/owners}}\n    {{#credits}}\n      {{#username}}\n        {{<lib/_profileListItem}}\n          {{$follow_link}}{{>lib/_follow/_userLink}}{{/follow_link}}\n        {{/lib/_profileListItem}}\n      {{/username}}\n      {{^username}}\n        {{>lib/_fakeUserListItem}}\n      {{/username}}\n    {{/credits}}\n  {{/content}}\n{{/project/_blocks/_block}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_block": arguments[1].template,"lib/_profileListItem": arguments[2].template,"lib/_follow/_userLink": arguments[3].template,"lib/_fakeUserListItem": arguments[4].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_footer/_wip", ["hogan", "vendor/require/hgn!templates/project/_blocks/_block"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<project/_blocks/_block0",c,p,""));return t.fl(); },partials: {"<project/_blocks/_block0":{name:"project/_blocks/_block", partials: {}, subs: { "id": function(c,p,t,i) {t.b("project-block-footer-wips");},"title": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,96,140,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_view_wip_label|View Work in Progress");});c.pop();}},"content": function(c,p,t,i) {t.b("    <ul class=\"linked-wips\">");t.b("\n" + i);if(t.s(t.d("project_linked_wip.revisions",c,p,1),c,p,0,248,309,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <li><img src=\"");t.b(t.v(t.d("images.thumbnail.url",c,p,0)));t.b("\"></li>");t.b("\n" + i);});c.pop();}t.b("    </ul>");t.b("\n" + i);t.b("    <div class=\"linked-wips-view-more\">");t.b("\n" + i);t.b("      <a href=\"");t.b(t.v(t.d("project_linked_wip.url",c,p,0)));t.b("\">");if(t.s(t.f("translate",c,p,1),c,p,0,450,488,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_view_wip|View Work in Progress");});c.pop();}t.b(" &rarr;</a>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"linked-wips-count\">");t.b(t.v(t.d("project_linked_wip.revision_count",c,p,0)));t.b(" revisions</div>");t.b("\n" + i);} }}}, subs: {  }}, "{{<project/_blocks/_block}}\n  {{$id}}project-block-footer-wips{{/id}}\n  {{$title}}{{#translate}}project_view_wip_label|View Work in Progress{{/translate}}{{/title}}\n  {{$content}}\n    <ul class=\"linked-wips\">\n      {{#project_linked_wip.revisions}}\n        <li><img src=\"{{images.thumbnail.url}}\"></li>\n      {{/project_linked_wip.revisions}}\n    </ul>\n    <div class=\"linked-wips-view-more\">\n      <a href=\"{{project_linked_wip.url}}\">{{#translate}}project_view_wip|View Work in Progress{{/translate}} &rarr;</a>\n    </div>\n    <div class=\"linked-wips-count\">{{project_linked_wip.revision_count}} revisions</div>\n  {{/content}}\n{{/project/_blocks/_block}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_block": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_footer/_tags", ["hogan", "vendor/require/hgn!templates/project/_blocks/_block"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<project/_blocks/_block0",c,p,""));return t.fl(); },partials: {"<project/_blocks/_block0":{name:"project/_blocks/_block", partials: {}, subs: { "id": function(c,p,t,i) {t.b("project-block-footer-tags");},"title": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,96,119,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_tags_label|Tags");});c.pop();}},"content": function(c,p,t,i) {if(t.s(t.f("tags",c,p,1),c,p,0,172,234,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" class=\"object-tag\">");t.b(t.v(t.f("title",c,p,0)));t.b("</a>");t.b("\n" + i);});c.pop();}} }}}, subs: {  }}, "{{<project/_blocks/_block}}\n  {{$id}}project-block-footer-tags{{/id}}\n  {{$title}}{{#translate}}project_tags_label|Tags{{/translate}}{{/title}}\n  {{$content}}\n    {{#tags}}\n      <a href=\"{{url}}\" class=\"object-tag\">{{title}}</a>\n    {{/tags}}\n  {{/content}}\n{{/project/_blocks/_block}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_block": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_footer/_tools", ["hogan", "vendor/require/hgn!templates/project/_blocks/_block", "vendor/require/hgn!templates/project/_blocks/_tools"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<project/_blocks/_block1",c,p,""));return t.fl(); },partials: {"<project/_blocks/_block1":{name:"project/_blocks/_block", partials: {"<contentproject/_blocks/_tools0":{name:"project/_blocks/_tools", partials: {}, subs: {  }}}, subs: { "id": function(c,p,t,i) {t.b("project-block-footer-tools");},"title": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,97,132,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_tools_used_label|Tools Used");});c.pop();}},"content": function(c,p,t,i) {t.b(t.rp("<contentproject/_blocks/_tools0",c,p,"    "));} }}}, subs: {  }}, "{{<project/_blocks/_block}}\n  {{$id}}project-block-footer-tools{{/id}}\n  {{$title}}{{#translate}}project_tools_used_label|Tools Used{{/translate}}{{/title}}\n  {{$content}}\n    {{>project/_blocks/_tools}}\n  {{/content}}\n{{/project/_blocks/_block}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_block": arguments[1].template,"project/_blocks/_tools": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_footer/_reportAndCopyright", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"project-block-minimal\">");t.b("\n" + i);if(t.s(t.f("copyright",c,p,1),c,p,0,146,717,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <div id=\"project-block-copyright\">");t.b("\n" + i);t.b("    <div class=\"tooltipi-container\">");t.b("\n" + i);if(t.s(t.d("info.images",c,p,1),c,p,0,243,274,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <img src=\"");t.b(t.v(t.d(".",c,p,0)));t.b("\">");t.b("\n" + i);});c.pop();}t.b("      <div class=\"tooltipi tooltipi-white\">");t.b("\n" + i);t.b("        <div class=\"project-block-header\">");if(t.s(t.f("translate",c,p,1),c,p,0,391,434,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_copyright_info_label|Copyright Info");});c.pop();}t.b("</div>");t.b("\n" + i);t.b("        <p>");t.b(t.v(t.d("info.text",c,p,0)));t.b("</p>");t.b("\n" + i);if(t.s(t.d("info.url",c,p,1),c,p,0,505,668,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <a href=\"");t.b(t.v(t.d("info.url",c,p,0)));t.b("\">");if(t.s(t.f("translate",c,p,1),c,p,0,551,588,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_copyright_read_more|Read More");});c.pop();}t.b("<span class=\"beicons-pre beicons-pre-promote\"></span></a>");t.b("\n" + i);});c.pop();}t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);});c.pop();}if(!t.s(t.d("owners.0.is_profile_owner",c,p,1),c,p,1,0,0,"")){t.b("    <div id=\"project-block-spam\" class=\"js-project-spam\">");if(t.s(t.f("loggedIn",c,p,1),c,p,0,835,992,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<a class=\"js-action-spam beicons-pre beicons-pre-spam\" data-type=\"project\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");if(t.s(t.f("translate",c,p,1),c,p,0,941,974,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_mark_as_spam|Mark as Spam");});c.pop();}t.b("</a>");});c.pop();}t.b("<a class=\"js-action-report beicons-pre beicons-pre-report\" data-type=\"project\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");if(t.s(t.f("translate",c,p,1),c,p,0,1115,1136,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_report|Report");});c.pop();}t.b("</a></div>");t.b("\n" + i);};t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"project-block-minimal\">{{!need to wrap the following 2 children in a shared div for css columns to behave correctly}}\n  {{#copyright}}\n  <div id=\"project-block-copyright\">\n    <div class=\"tooltipi-container\">\n      {{#info.images}}\n      <img src=\"{{.}}\">\n      {{/info.images}}\n      <div class=\"tooltipi tooltipi-white\">\n        <div class=\"project-block-header\">{{#translate}}project_copyright_info_label|Copyright Info{{/translate}}</div>\n        <p>{{info.text}}</p>\n        {{#info.url}}\n        <a href=\"{{info.url}}\">{{#translate}}project_copyright_read_more|Read More{{/translate}}<span class=\"beicons-pre beicons-pre-promote\"></span></a>\n        {{/info.url}}\n      </div>\n    </div>\n  </div>\n  {{/copyright}}\n  {{^owners.0.is_profile_owner}}\n    <div id=\"project-block-spam\" class=\"js-project-spam\">{{#loggedIn}}<a class=\"js-action-spam beicons-pre beicons-pre-spam\" data-type=\"project\" data-id=\"{{id}}\">{{#translate}}project_mark_as_spam|Mark as Spam{{/translate}}</a>{{/loggedIn}}<a class=\"js-action-report beicons-pre beicons-pre-report\" data-type=\"project\" data-id=\"{{id}}\">{{#translate}}project_report|Report{{/translate}}</a></div>\n  {{/owners.0.is_profile_owner}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_layout/_footer", ["hogan", "vendor/require/hgn!templates/project/_blocks/_footer/_comments", "vendor/require/hgn!templates/project/_blocks/_footer/_basicInfo", "vendor/require/hgn!templates/project/_blocks/_footer/_teams", "vendor/require/hgn!templates/project/_blocks/_footer/_credits", "vendor/require/hgn!templates/project/_blocks/_footer/_wip", "vendor/require/hgn!templates/project/_blocks/_footer/_tags", "vendor/require/hgn!templates/project/_blocks/_footer/_tools", "vendor/require/hgn!templates/project/_blocks/_footer/_reportAndCopyright"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"project-footer\" class=\"show-on-preview unclickable-mask cfix ");if(!t.s(t.f("allow_comments",c,p,1),c,p,1,0,0,"")){t.b("disabled-comments");};t.b("\">");t.b("\n" + i);t.b("  <div id=\"project-footer-inner\">");t.b("\n" + i);if(t.s(t.f("allow_comments",c,p,1),c,p,0,185,235,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<project/_blocks/_footer/_comments0",c,p,"      "));});c.pop();}t.b("    <div id=\"project-footer-info-wrap\">");t.b("\n" + i);t.b(t.rp("<project/_blocks/_footer/_basicInfo1",c,p,"      "));if(t.s(t.f("has_teams",c,p,1),c,p,0,361,396,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<project/_blocks/_footer/_teams2",c,p,""));});c.pop();}t.b(t.rp("<project/_blocks/_footer/_credits3",c,p,"      "));if(t.s(t.f("has_linked_wip",c,p,1),c,p,0,480,513,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<project/_blocks/_footer/_wip4",c,p,""));});c.pop();}t.b(t.rp("<project/_blocks/_footer/_tags5",c,p,"      "));if(t.s(t.f("has_tools",c,p,1),c,p,0,594,629,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<project/_blocks/_footer/_tools6",c,p,""));});c.pop();}t.b(t.rp("<project/_blocks/_footer/_reportAndCopyright7",c,p,"      "));t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<project/_blocks/_footer/_comments0":{name:"project/_blocks/_footer/_comments", partials: {}, subs: {  }},"<project/_blocks/_footer/_basicInfo1":{name:"project/_blocks/_footer/_basicInfo", partials: {}, subs: {  }},"<project/_blocks/_footer/_teams2":{name:"project/_blocks/_footer/_teams", partials: {}, subs: {  }},"<project/_blocks/_footer/_credits3":{name:"project/_blocks/_footer/_credits", partials: {}, subs: {  }},"<project/_blocks/_footer/_wip4":{name:"project/_blocks/_footer/_wip", partials: {}, subs: {  }},"<project/_blocks/_footer/_tags5":{name:"project/_blocks/_footer/_tags", partials: {}, subs: {  }},"<project/_blocks/_footer/_tools6":{name:"project/_blocks/_footer/_tools", partials: {}, subs: {  }},"<project/_blocks/_footer/_reportAndCopyright7":{name:"project/_blocks/_footer/_reportAndCopyright", partials: {}, subs: {  }}}, subs: {  }}, "<div id=\"project-footer\" class=\"show-on-preview unclickable-mask cfix {{^allow_comments}}disabled-comments{{/allow_comments}}\">\n  <div id=\"project-footer-inner\">\n    {{#allow_comments}}\n      {{>project/_blocks/_footer/_comments}}\n    {{/allow_comments}}\n    <div id=\"project-footer-info-wrap\">\n      {{>project/_blocks/_footer/_basicInfo}}\n      {{#has_teams}}{{>project/_blocks/_footer/_teams}}{{/has_teams}}\n      {{>project/_blocks/_footer/_credits}}\n      {{#has_linked_wip}}{{>project/_blocks/_footer/_wip}}{{/has_linked_wip}}\n      {{>project/_blocks/_footer/_tags}}\n      {{#has_tools}}{{>project/_blocks/_footer/_tools}}{{/has_tools}}\n      {{>project/_blocks/_footer/_reportAndCopyright}}\n    </div>\n  </div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_footer/_comments": arguments[1].template,"project/_blocks/_footer/_basicInfo": arguments[2].template,"project/_blocks/_footer/_teams": arguments[3].template,"project/_blocks/_footer/_credits": arguments[4].template,"project/_blocks/_footer/_wip": arguments[5].template,"project/_blocks/_footer/_tags": arguments[6].template,"project/_blocks/_footer/_tools": arguments[7].template,"project/_blocks/_footer/_reportAndCopyright": arguments[8].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_layout/_main", ["hogan", "vendor/require/hgn!templates/project/_layout/_header", "vendor/require/hgn!templates/project/_blocks/_headerTablet", "vendor/require/hgn!templates/project/_layout/_canvas", "vendor/require/hgn!templates/project/_layout/_ownerBar", "vendor/require/hgn!templates/project/_layout/_projectGallery", "vendor/require/hgn!templates/project/_layout/_footer"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"project\" class=\"js-project\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" data-mature_content=\"");t.b(t.v(t.f("mature_content",c,p,0)));t.b("\" data-mature_access=\"");t.b(t.v(t.f("mature_access",c,p,0)));t.b("\" ");if(!t.s(t.f("is_iframe",c,p,1),c,p,1,0,0,"")){t.b("style=\"max-width: ");t.b(t.v(t.f("canvas_width",c,p,0)));t.b("px;\"");};t.b(">");t.b("\n" + i);if(!t.s(t.f("is_iframe",c,p,1),c,p,1,0,0,"")){t.b(t.rp("<project/_layout/_header0",c,p,"    "));t.b(t.rp("<project/_blocks/_headerTablet1",c,p,"    "));};t.b("  <div id=\"primary-project-content\" class=\"project-styles");if(!t.s(t.d("styles.spacing.project.top_margin",c,p,1),c,p,1,0,0,"")){t.b(" zero-top");};t.b("\">");t.b("\n" + i);t.b(t.rp("<project/_layout/_canvas2",c,p,"    "));t.b("  </div>");t.b("\n" + i);if(!t.s(t.f("is_iframe",c,p,1),c,p,1,0,0,"")){t.b(t.rp("<project/_layout/_ownerBar3",c,p,"    "));t.b(t.rp("<project/_layout/_projectGallery4",c,p,"    "));t.b(t.rp("<project/_layout/_footer5",c,p,"    "));};t.b("</div>");t.b("\n");return t.fl(); },partials: {"<project/_layout/_header0":{name:"project/_layout/_header", partials: {}, subs: {  }},"<project/_blocks/_headerTablet1":{name:"project/_blocks/_headerTablet", partials: {}, subs: {  }},"<project/_layout/_canvas2":{name:"project/_layout/_canvas", partials: {}, subs: {  }},"<project/_layout/_ownerBar3":{name:"project/_layout/_ownerBar", partials: {}, subs: {  }},"<project/_layout/_projectGallery4":{name:"project/_layout/_projectGallery", partials: {}, subs: {  }},"<project/_layout/_footer5":{name:"project/_layout/_footer", partials: {}, subs: {  }}}, subs: {  }}, "{{!inline max-width used to avoid JS flash of unstyled content}}\n<div id=\"project\" class=\"js-project\" data-id=\"{{id}}\" data-mature_content=\"{{mature_content}}\" data-mature_access=\"{{mature_access}}\" {{^is_iframe}}style=\"max-width: {{canvas_width}}px;\"{{/is_iframe}}>\n  {{^is_iframe}}\n    {{>project/_layout/_header}}\n    {{>project/_blocks/_headerTablet}}\n  {{/is_iframe}}\n  <div id=\"primary-project-content\" class=\"project-styles{{^styles.spacing.project.top_margin}} zero-top{{/styles.spacing.project.top_margin}}\">\n    {{>project/_layout/_canvas}}\n  </div>\n  {{^is_iframe}}\n    {{>project/_layout/_ownerBar}}\n    {{>project/_layout/_projectGallery}}\n    {{>project/_layout/_footer}}\n  {{/is_iframe}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_layout/_header": arguments[1].template,"project/_blocks/_headerTablet": arguments[2].template,"project/_layout/_canvas": arguments[3].template,"project/_layout/_ownerBar": arguments[4].template,"project/_layout/_projectGallery": arguments[5].template,"project/_layout/_footer": arguments[6].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_sidebar/_administrativeNotice", ["hogan", "vendor/require/hgn!templates/project/_blocks/_block"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<project/_blocks/_block0",c,p,""));return t.fl(); },partials: {"<project/_blocks/_block0":{name:"project/_blocks/_block", partials: {}, subs: { "id": function(c,p,t,i) {t.b("project-block-sidebar-admin-notice");},"title": function(c,p,t,i) {t.b("<span class=\"beicons-pre beicons-pre-report\">");t.b(t.v(t.f("title",c,p,0)));t.b("</span>");},"class": function(c,p,t,i) {t.b("hide-sticky");},"content": function(c,p,t,i) {t.b("    ");t.b(t.t(t.f("body",c,p,0)));t.b("\n" + i);} }}}, subs: {  }}, "{{<project/_blocks/_block}}\n  {{$id}}project-block-sidebar-admin-notice{{/id}}\n  {{$title}}<span class=\"beicons-pre beicons-pre-report\">{{title}}</span>{{/title}}\n  {{$class}}hide-sticky{{/class}}\n  {{$content}}\n    {{{body}}}\n  {{/content}}\n{{/project/_blocks/_block}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_block": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_sidebar/_header", ["hogan", "vendor/require/hgn!templates/project/_blocks/_block", "vendor/require/hgn!templates/project/_blocks/_owner"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<project/_blocks/_block1",c,p,""));return t.fl(); },partials: {"<project/_blocks/_block1":{name:"project/_blocks/_block", partials: {"<contentproject/_blocks/_owner0":{name:"project/_blocks/_owner", partials: {}, subs: { "ownerInfoClasses": function(c,p,t,i) {t.b("project-owner-info--header");} }}}, subs: { "id": function(c,p,t,i) {t.b("project-block-sidebar-owner");},"title": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,98,125,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_by_label|Project by");});c.pop();}},"content": function(c,p,t,i) {t.b(t.rp("<contentproject/_blocks/_owner0",c,p,""));} }}}, subs: {  }}, "{{<project/_blocks/_block}}\n  {{$id}}project-block-sidebar-owner{{/id}}\n  {{$title}}{{#translate}}project_by_label|Project by{{/translate}}{{/title}}\n  {{$content}}\n    {{<project/_blocks/_owner}}\n    {{$ownerInfoClasses}}project-owner-info--header{{/ownerInfoClasses}}\n    {{/project/_blocks/_owner}}\n  {{/content}}\n{{/project/_blocks/_block}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_block": arguments[1].template,"project/_blocks/_owner": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_sidebar/_about", ["hogan", "vendor/require/hgn!templates/project/_blocks/_block", "vendor/require/hgn!templates/project/_blocks/_aboutInner"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<project/_blocks/_block1",c,p,""));t.b("\n");t.b("\n");return t.fl(); },partials: {"<project/_blocks/_block1":{name:"project/_blocks/_block", partials: {"<contentproject/_blocks/_aboutInner0":{name:"project/_blocks/_aboutInner", partials: {}, subs: {  }}}, subs: { "id": function(c,p,t,i) {t.b("project-block-sidebar-about");},"title": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,98,123,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_about_label|About");});c.pop();}},"class": function(c,p,t,i) {t.b("hide-sticky");},"content": function(c,p,t,i) {t.b(t.rp("<contentproject/_blocks/_aboutInner0",c,p,"    "));} }}}, subs: {  }}, "{{<project/_blocks/_block}}\n  {{$id}}project-block-sidebar-about{{/id}}\n  {{$title}}{{#translate}}project_about_label|About{{/translate}}{{/title}}\n  {{$class}}hide-sticky{{/class}}\n  {{$content}}\n    {{>project/_blocks/_aboutInner}}\n  {{/content}}\n{{/project/_blocks/_block}}\n\n\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_block": arguments[1].template,"project/_blocks/_aboutInner": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_sidebar/_tools", ["hogan", "vendor/require/hgn!templates/project/_blocks/_block", "vendor/require/hgn!templates/project/_blocks/_tools"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<project/_blocks/_block1",c,p,""));return t.fl(); },partials: {"<project/_blocks/_block1":{name:"project/_blocks/_block", partials: {"<contentproject/_blocks/_tools0":{name:"project/_blocks/_tools", partials: {}, subs: {  }}}, subs: { "id": function(c,p,t,i) {t.b("project-block-sidebar-tools");},"title": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,98,133,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_tools_used_label|Tools Used");});c.pop();}},"content": function(c,p,t,i) {t.b(t.rp("<contentproject/_blocks/_tools0",c,p,"    "));} }}}, subs: {  }}, "{{<project/_blocks/_block}}\n  {{$id}}project-block-sidebar-tools{{/id}}\n  {{$title}}{{#translate}}project_tools_used_label|Tools Used{{/translate}}{{/title}}\n  {{$content}}\n    {{>project/_blocks/_tools}}\n  {{/content}}\n{{/project/_blocks/_block}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_block": arguments[1].template,"project/_blocks/_tools": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_collection/_addLarge", ["hogan", "vendor/require/hgn!templates/lib/_button"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<lib/_button0",c,p,""));return t.fl(); },partials: {"<lib/_button0":{name:"lib/_button", partials: {}, subs: { "attrs": function(c,p,t,i) {t.b("data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\"");},"classes": function(c,p,t,i) {t.b("form-button-light-and-blue form-button-large js-action-collection");},"icon": function(c,p,t,i) {t.b("beicons-pre beicons-pre-collection");},"label": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,229,279,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_add_to_collection_button|Add to Collection");});c.pop();}} }}}, subs: {  }}, "{{<lib/_button}}\n  {{$attrs}}data-id=\"{{id}}\"{{/attrs}}\n  {{$classes}}form-button-light-and-blue form-button-large js-action-collection{{/classes}}\n  {{$icon}}beicons-pre beicons-pre-collection{{/icon}}\n  {{$label}}{{#translate}}project_add_to_collection_button|Add to Collection{{/translate}}{{/label}}\n{{/lib/_button}}", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_button": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_sidebar/_buttons", ["hogan", "vendor/require/hgn!templates/lib/_button", "vendor/require/hgn!templates/lib/_collection/_addLarge"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"project-block\">");t.b("\n" + i);t.b("  <div class=\"appreciation-button js-appreciate\">");t.b("\n" + i);t.b(t.rp("<lib/_button0",c,p,""));t.b(t.rp("<lib/_button1",c,p,""));t.b("    <div class=\"js-appreciation-date project-appreciation-date beicons-pre beicons-pre-thumb\"></div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b(t.rp("<lib/_collection/_addLarge2",c,p,"  "));t.b("</div>");t.b("\n");return t.fl(); },partials: {"<lib/_button0":{name:"lib/_button", partials: {}, subs: { "containerClasses": function(c,p,t,i) {t.b("form-item-appreciate");},"classes": function(c,p,t,i) {t.b("thumb form-button-default form-button-large");},"icon": function(c,p,t,i) {t.b("beicons-pre beicons-pre-thumb");},"label": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,326,371,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_appreciate_project|Appreciate Project");});c.pop();}} }},"<lib/_button1":{name:"lib/_button", partials: {}, subs: { "icon": function(c,p,t,i) {},"containerClasses": function(c,p,t,i) {t.b("form-item-thanks");},"classes": function(c,p,t,i) {t.b("text form-button-dark form-button-large");},"label": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,721,760,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_appreciate_thank_you|Thank you!");});c.pop();}} }},"<lib/_collection/_addLarge2":{name:"lib/_collection/_addLarge", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"project-block\">\n  <div class=\"appreciation-button js-appreciate\">\n    {{<lib/_button}}\n      {{$containerClasses}}form-item-appreciate{{/containerClasses}}\n      {{$classes}}thumb form-button-default form-button-large{{/classes}}\n      {{$icon}}beicons-pre beicons-pre-thumb{{/icon}}\n      {{$label}}{{#translate}}project_appreciate_project|Appreciate Project{{/translate}}{{/label}}\n    {{/lib/_button}}\n    {{! need to set an empty icon value below, otherwise it inherits from the button above}}\n    {{<lib/_button}}\n      {{$icon}}{{/icon}}\n      {{$containerClasses}}form-item-thanks{{/containerClasses}}\n      {{$classes}}text form-button-dark form-button-large{{/classes}}\n      {{$label}}{{#translate}}project_appreciate_thank_you|Thank you!{{/translate}}{{/label}}\n    {{/lib/_button}}\n    <div class=\"js-appreciation-date project-appreciation-date beicons-pre beicons-pre-thumb\"></div>\n  </div>\n  {{>lib/_collection/_addLarge}}\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_button": arguments[1].template,"lib/_collection/_addLarge": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_sidebar/_talentsearch", ["hogan", "vendor/require/hgn!templates/project/_blocks/_block"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<project/_blocks/_block0",c,p,""));return t.fl(); },partials: {"<project/_blocks/_block0":{name:"project/_blocks/_block", partials: {}, subs: { "id": function(c,p,t,i) {t.b("project-block-sidebar-ts");},"title": function(c,p,t,i) {t.b("<span class=\"beicons-pre beicons-pre-adobe\">");if(t.s(t.f("translate",c,p,1),c,p,0,139,189,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("talent_sidebar_adobe_talent_info|Adobe Talent Info");});c.pop();}t.b("</span>");},"content": function(c,p,t,i) {t.b("    <div class=\"ts-title ts-creative-info\">");t.b(t.v(t.d("founder.occupation",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("    <div class=\"ts-company ts-creative-info\">");t.b(t.v(t.d("founder.company",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("    <div class=\"ts-links\">");t.b("\n" + i);if(t.s(t.d("founder.website",c,p,1),c,p,0,432,686,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <div class=\"ts-link ts-creative-info\">");t.b("\n" + i);t.b("        <a href=\"");t.b(t.v(t.d("founder.website",c,p,0)));t.b("\" target=\"_blank\">");if(t.s(t.f("translate",c,p,1),c,p,0,546,594,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("talent_sidebar_personal_website|Personal Website");});c.pop();}t.b(" <span class=\"beicons-pre beicons-pre-promote\"></span></a>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);});c.pop();}if(t.s(t.d("founder.resume_url",c,p,1),c,p,0,736,973,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <div class=\"ts-link ts-creative-info\">");t.b("\n" + i);t.b("        <a href=\"");t.b(t.v(t.d("founder.resume_url",c,p,0)));t.b("\" target=\"_blank\">");if(t.s(t.f("translate",c,p,1),c,p,0,853,881,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("talent_sidebar_resume|Resume");});c.pop();}t.b(" <span class=\"beicons-pre beicons-pre-promote\"></span></a>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);});c.pop();}if(t.s(t.d("founder.social_links.linkedin",c,p,1),c,p,0,1037,1309,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <div class=\"ts-link ts-creative-info\">");t.b("\n" + i);t.b("        <a href=\"");t.b(t.v(t.d("founder.social_links.linkedin.url",c,p,0)));t.b("\" target=\"_blank\">");if(t.s(t.f("translate",c,p,1),c,p,0,1169,1217,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("talent_sidebar_linkedin_profile|Linkedin Profile");});c.pop();}t.b(" <span class=\"beicons-pre beicons-pre-promote\"></span></a>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);});c.pop();}t.b("    </div>");t.b("\n" + i);} }}}, subs: {  }}, "{{<project/_blocks/_block}}\n  {{$id}}project-block-sidebar-ts{{/id}}\n  {{$title}}<span class=\"beicons-pre beicons-pre-adobe\">{{#translate}}talent_sidebar_adobe_talent_info|Adobe Talent Info{{/translate}}</span>{{/title}}\n  {{$content}}\n    <div class=\"ts-title ts-creative-info\">{{founder.occupation}}</div>\n    <div class=\"ts-company ts-creative-info\">{{founder.company}}</div>\n    <div class=\"ts-links\">\n      {{#founder.website}}\n      <div class=\"ts-link ts-creative-info\">\n        <a href=\"{{founder.website}}\" target=\"_blank\">{{#translate}}talent_sidebar_personal_website|Personal Website{{/translate}} <span class=\"beicons-pre beicons-pre-promote\"></span></a>\n      </div>\n      {{/founder.website}}\n      {{#founder.resume_url}}\n      <div class=\"ts-link ts-creative-info\">\n        <a href=\"{{founder.resume_url}}\" target=\"_blank\">{{#translate}}talent_sidebar_resume|Resume{{/translate}} <span class=\"beicons-pre beicons-pre-promote\"></span></a>\n      </div>\n      {{/founder.resume_url}}\n      {{#founder.social_links.linkedin}}\n      <div class=\"ts-link ts-creative-info\">\n        <a href=\"{{founder.social_links.linkedin.url}}\" target=\"_blank\">{{#translate}}talent_sidebar_linkedin_profile|Linkedin Profile{{/translate}} <span class=\"beicons-pre beicons-pre-promote\"></span></a>\n      </div>\n      {{/founder.social_links.linkedin}}\n    </div>\n  {{/content}}\n{{/project/_blocks/_block}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_block": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_sidebar/_similarProjects", ["hogan", "vendor/require/hgn!templates/project/_blocks/_block"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<project/_blocks/_block0",c,p,""));return t.fl(); },partials: {"<project/_blocks/_block0":{name:"project/_blocks/_block", partials: {}, subs: { "id": function(c,p,t,i) {t.b("project-block-sidebar-similar-projects");},"title": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,109,156,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_similar_projects_label|Similar Projects");});c.pop();}},"class": function(c,p,t,i) {t.b("hide-sticky");},"content": function(c,p,t,i) {t.b("    <a href=\"");t.b(t.v(t.d("similar_projects.view_similar_projects_url",c,p,0)));t.b("\" class=\"ts-view-more js-search-projects-similar\" target=\"_blank\">");if(t.s(t.f("translate",c,p,1),c,p,0,369,411,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_similar_projects_view_all|View all");});c.pop();}t.b(" &rarr;</a>");t.b("\n" + i);t.b("    <ul class=\"ts-similar-projects ts-similar-items\">");t.b("\n" + i);if(t.s(t.d("similar_projects.similar_projects",c,p,1),c,p,0,535,723,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <li class=\"ts-similar");if(!t.s(t.f("url",c,p,1),c,p,1,0,0,"")){t.b(" empty");};t.b("\">");t.b("\n" + i);if(t.s(t.f("url",c,p,1),c,p,0,604,696,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("          <a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\">");t.b("\n" + i);t.b("            <img src=\"");t.b(t.v(t.d("covers.115",c,p,0)));t.b("\">");t.b("\n" + i);t.b("          </a>");t.b("\n" + i);});c.pop();}t.b("      </li>");t.b("\n" + i);});c.pop();}t.b("    </ul>");t.b("\n" + i);} }}}, subs: {  }}, "{{<project/_blocks/_block}}\n  {{$id}}project-block-sidebar-similar-projects{{/id}}\n  {{$title}}{{#translate}}project_similar_projects_label|Similar Projects{{/translate}}{{/title}}\n  {{$class}}hide-sticky{{/class}}\n  {{$content}}\n    <a href=\"{{similar_projects.view_similar_projects_url}}\" class=\"ts-view-more js-search-projects-similar\" target=\"_blank\">{{#translate}}project_similar_projects_view_all|View all{{/translate}} &rarr;</a>\n    <ul class=\"ts-similar-projects ts-similar-items\">\n      {{#similar_projects.similar_projects}}\n      <li class=\"ts-similar{{^url}} empty{{/url}}\">\n        {{#url}}\n          <a href=\"{{url}}\">\n            <img src=\"{{covers.115}}\">\n          </a>\n        {{/url}}\n      </li>\n      {{/similar_projects.similar_projects}}\n    </ul>\n  {{/content}}\n{{/project/_blocks/_block}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_block": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_sidebar/_similarCreatives", ["hogan", "vendor/require/hgn!templates/project/_blocks/_block"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<project/_blocks/_block0",c,p,""));return t.fl(); },partials: {"<project/_blocks/_block0":{name:"project/_blocks/_block", partials: {}, subs: { "id": function(c,p,t,i) {t.b("project-block-sidebar-similar-creatives");},"title": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,110,159,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_similar_creatives_label|Similar Creatives");});c.pop();}},"class": function(c,p,t,i) {t.b("hide-sticky");},"content": function(c,p,t,i) {t.b("    <a href=\"");t.b(t.v(t.d("creative_index.view_similar_creatives_url",c,p,0)));t.b("\" class=\"ts-view-more js-search-users-similar\" target=\"_blank\">");if(t.s(t.f("translate",c,p,1),c,p,0,368,404,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_candidates_view_all|View all");});c.pop();}t.b(" &rarr;</a>");t.b("\n" + i);t.b("    <ul class=\"ts-similar-creatives ts-similar-items\">");t.b("\n" + i);if(t.s(t.d("creative_index.similar",c,p,1),c,p,0,518,764,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <li class=\"ts-similar");if(!t.s(t.f("url",c,p,1),c,p,1,0,0,"")){t.b(" empty");};t.b("\">");t.b("\n" + i);if(t.s(t.f("url",c,p,1),c,p,0,587,737,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("          <a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" target=\"_blank\" class=\"js-mini-profile\" data-id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("            <img src=\"");t.b(t.v(t.d("images.50",c,p,0)));t.b("\" />");t.b("\n" + i);t.b("          </a>");t.b("\n" + i);});c.pop();}t.b("      </li>");t.b("\n" + i);});c.pop();}t.b("    </ul>");t.b("\n" + i);} }}}, subs: {  }}, "{{<project/_blocks/_block}}\n  {{$id}}project-block-sidebar-similar-creatives{{/id}}\n  {{$title}}{{#translate}}project_similar_creatives_label|Similar Creatives{{/translate}}{{/title}}\n  {{$class}}hide-sticky{{/class}}\n  {{$content}}\n    <a href=\"{{creative_index.view_similar_creatives_url}}\" class=\"ts-view-more js-search-users-similar\" target=\"_blank\">{{#translate}}project_candidates_view_all|View all{{/translate}} &rarr;</a>\n    <ul class=\"ts-similar-creatives ts-similar-items\">\n      {{#creative_index.similar}}\n      <li class=\"ts-similar{{^url}} empty{{/url}}\">\n        {{#url}}\n          <a href=\"{{url}}\" target=\"_blank\" class=\"js-mini-profile\" data-id=\"{{id}}\">\n            <img src=\"{{images.50}}\" />\n          </a>\n        {{/url}}\n      </li>\n      {{/creative_index.similar}}\n    </ul>\n  {{/content}}\n{{/project/_blocks/_block}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_block": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_blocks/_sidebar/_saveCandidate", ["hogan", "vendor/require/hgn!templates/project/_blocks/_block", "vendor/require/hgn!templates/lib/_button", "vendor/require/hgn!templates/talent/_addedTalentSearchList"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.rp("<project/_blocks/_block2",c,p,""));return t.fl(); },partials: {"<project/_blocks/_block2":{name:"project/_blocks/_block", partials: {"<contentlib/_button0":{name:"lib/_button", partials: {}, subs: { "attrs": function(c,p,t,i) {t.b("data-id=\"");t.b(t.v(t.d("owners.0.id",c,p,0)));t.b("\"");},"icon": function(c,p,t,i) {t.b("beicons-pre beicons-pre-adobe");},"classes": function(c,p,t,i) {t.b("js-add-talent form-button-default form-button-large");},"label": function(c,p,t,i) {if(t.s(t.f("translate",c,p,1),c,p,0,335,382,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("project_button_save_candidate|Save as Candidate");});c.pop();}} }},"<contenttalent/_addedTalentSearchList1":{name:"talent/_addedTalentSearchList", partials: {}, subs: {  }}}, subs: { "id": function(c,p,t,i) {t.b("project-block-sidebar-save-candidate");},"content": function(c,p,t,i) {t.b(t.rp("<contentlib/_button0",c,p,""));t.b("    <span class=\"js-added-talent-searches\">");t.b("\n" + i);if(t.s(t.f("creative_index",c,p,1),c,p,0,497,532,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<contenttalent/_addedTalentSearchList1",c,p,""));});c.pop();}t.b("    </span>");t.b("\n" + i);} }}}, subs: {  }}, "{{<project/_blocks/_block}}\n  {{$id}}project-block-sidebar-save-candidate{{/id}}\n  {{$content}}\n    {{<lib/_button}}\n      {{$attrs}}data-id=\"{{owners.0.id}}\"{{/attrs}}\n      {{$icon}}beicons-pre beicons-pre-adobe{{/icon}}\n      {{$classes}}js-add-talent form-button-default form-button-large{{/classes}}\n      {{$label}}{{#translate}}project_button_save_candidate|Save as Candidate{{/translate}}{{/label}}\n    {{/lib/_button}}\n    <span class=\"js-added-talent-searches\">\n      {{#creative_index}}{{> talent/_addedTalentSearchList}}{{/creative_index}}\n    </span>\n  {{/content}}\n{{/project/_blocks/_block}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_block": arguments[1].template,"lib/_button": arguments[2].template,"talent/_addedTalentSearchList": arguments[3].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project/_layout/_sidebar", ["hogan", "vendor/require/hgn!templates/project/_blocks/_sidebar/_administrativeNotice", "vendor/require/hgn!templates/project/_blocks/_sidebar/_header", "vendor/require/hgn!templates/project/_blocks/_sidebar/_about", "vendor/require/hgn!templates/project/_blocks/_sidebar/_tools", "vendor/require/hgn!templates/project/_blocks/_sidebar/_buttons", "vendor/require/hgn!templates/project/_blocks/_sidebar/_talentsearch", "vendor/require/hgn!templates/project/_blocks/_sidebar/_similarProjects", "vendor/require/hgn!templates/project/_blocks/_sidebar/_similarCreatives", "vendor/require/hgn!templates/project/_blocks/_sidebar/_saveCandidate"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"project-sidebar\" class=\"show-on-preview unclickable-mask js-project-sidebar-wrap\">");t.b("\n" + i);t.b("  <div class=\"project-sidebar-spacer\"></div>");t.b("\n" + i);t.b("  <div class=\"js-project-sidebar sticky-project-sidebar\">");t.b("\n" + i);if(t.s(t.f("administrative_notices",c,p,1),c,p,0,226,372,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <div class=\"sidebar-group hide-sticky administrative-notice\">");t.b("\n" + i);t.b(t.rp("<project/_blocks/_sidebar/_administrativeNotice0",c,p,"        "));t.b("      </div>");t.b("\n" + i);});c.pop();}t.b("    <div class=\"sidebar-group\">");t.b("\n" + i);t.b(t.rp("<project/_blocks/_sidebar/_header1",c,p,"      "));t.b(t.rp("<project/_blocks/_sidebar/_about2",c,p,"      "));if(t.s(t.f("has_tools",c,p,1),c,p,0,539,575,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<project/_blocks/_sidebar/_tools3",c,p,""));});c.pop();}t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"sidebar-group sticky-sidebar-buttons show-sticky\">");t.b("\n" + i);t.b(t.rp("<project/_blocks/_sidebar/_buttons4",c,p,"      "));t.b("    </div>");t.b("\n" + i);if(t.s(t.f("has_talent_search",c,p,1),c,p,0,750,1314,"{{ }}")){t.rs(c,p,function(c,p,t){if(!t.s(t.f("has_multiple_owners",c,p,1),c,p,1,0,0,"")){t.b("    <div class=\"sidebar-group\">");t.b("\n" + i);if(t.s(t.d("founder.has_talent_info",c,p,1),c,p,0,846,905,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<project/_blocks/_sidebar/_talentsearch5",c,p,"        "));});c.pop();}if(t.s(t.d("similar_projects.has_similar_projects",c,p,1),c,p,0,982,1044,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<project/_blocks/_sidebar/_similarProjects6",c,p,"        "));});c.pop();}if(t.s(t.d("creative_index.has_similar",c,p,1),c,p,0,1124,1187,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<project/_blocks/_sidebar/_similarCreatives7",c,p,"        "));});c.pop();}t.b(t.rp("<project/_blocks/_sidebar/_saveCandidate8",c,p,"      "));t.b("    </div>");t.b("\n" + i);};});c.pop();}t.b("    <a id=\"back-to-top\" class=\"js-back-to-top sidebar-group beicons-pre beicons-pre-arrow-up show-sticky\"></a>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<project/_blocks/_sidebar/_administrativeNotice0":{name:"project/_blocks/_sidebar/_administrativeNotice", partials: {}, subs: {  }},"<project/_blocks/_sidebar/_header1":{name:"project/_blocks/_sidebar/_header", partials: {}, subs: {  }},"<project/_blocks/_sidebar/_about2":{name:"project/_blocks/_sidebar/_about", partials: {}, subs: {  }},"<project/_blocks/_sidebar/_tools3":{name:"project/_blocks/_sidebar/_tools", partials: {}, subs: {  }},"<project/_blocks/_sidebar/_buttons4":{name:"project/_blocks/_sidebar/_buttons", partials: {}, subs: {  }},"<project/_blocks/_sidebar/_talentsearch5":{name:"project/_blocks/_sidebar/_talentsearch", partials: {}, subs: {  }},"<project/_blocks/_sidebar/_similarProjects6":{name:"project/_blocks/_sidebar/_similarProjects", partials: {}, subs: {  }},"<project/_blocks/_sidebar/_similarCreatives7":{name:"project/_blocks/_sidebar/_similarCreatives", partials: {}, subs: {  }},"<project/_blocks/_sidebar/_saveCandidate8":{name:"project/_blocks/_sidebar/_saveCandidate", partials: {}, subs: {  }}}, subs: {  }}, "<div id=\"project-sidebar\" class=\"show-on-preview unclickable-mask js-project-sidebar-wrap\">\n  <div class=\"project-sidebar-spacer\"></div>\n  <div class=\"js-project-sidebar sticky-project-sidebar\">\n    {{#administrative_notices}}\n      <div class=\"sidebar-group hide-sticky administrative-notice\">\n        {{>project/_blocks/_sidebar/_administrativeNotice}}\n      </div>\n    {{/administrative_notices}}\n    <div class=\"sidebar-group\">\n      {{>project/_blocks/_sidebar/_header}}\n      {{>project/_blocks/_sidebar/_about}}\n      {{#has_tools}}{{>project/_blocks/_sidebar/_tools}}{{/has_tools}}\n    </div>\n    <div class=\"sidebar-group sticky-sidebar-buttons show-sticky\">\n      {{>project/_blocks/_sidebar/_buttons}}\n    </div>\n    {{#has_talent_search}}\n    {{^has_multiple_owners}}\n    <div class=\"sidebar-group\">\n      {{#founder.has_talent_info}}\n        {{>project/_blocks/_sidebar/_talentsearch}}\n      {{/founder.has_talent_info}}\n      {{#similar_projects.has_similar_projects}}\n        {{>project/_blocks/_sidebar/_similarProjects}}\n      {{/similar_projects.has_similar_projects}}\n      {{#creative_index.has_similar}}\n        {{>project/_blocks/_sidebar/_similarCreatives}}\n      {{/creative_index.has_similar}}\n      {{>project/_blocks/_sidebar/_saveCandidate}}\n    </div>\n    {{/has_multiple_owners}}\n    {{/has_talent_search}}\n    <a id=\"back-to-top\" class=\"js-back-to-top sidebar-group beicons-pre beicons-pre-arrow-up show-sticky\"></a>\n  </div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_blocks/_sidebar/_administrativeNotice": arguments[1].template,"project/_blocks/_sidebar/_header": arguments[2].template,"project/_blocks/_sidebar/_about": arguments[3].template,"project/_blocks/_sidebar/_tools": arguments[4].template,"project/_blocks/_sidebar/_buttons": arguments[5].template,"project/_blocks/_sidebar/_talentsearch": arguments[6].template,"project/_blocks/_sidebar/_similarProjects": arguments[7].template,"project/_blocks/_sidebar/_similarCreatives": arguments[8].template,"project/_blocks/_sidebar/_saveCandidate": arguments[9].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/project", ["hogan", "vendor/require/hgn!templates/project/_layout/_main", "vendor/require/hgn!templates/project/_layout/_sidebar"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");if(t.s(t.f("project",c,p,1),c,p,0,12,178,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<div id=\"project-wrap\" class=\"js-project-wrap v-");t.b(t.v(t.f("editor_version",c,p,0)));t.b("\">");t.b("\n" + i);t.b(t.rp("<project/_layout/_main0",c,p,"  "));if(!t.s(t.f("is_iframe",c,p,1),c,p,1,0,0,"")){t.b(t.rp("<project/_layout/_sidebar1",c,p,""));};t.b("</div>");t.b("\n" + i);});c.pop();}return t.fl(); },partials: {"<project/_layout/_main0":{name:"project/_layout/_main", partials: {}, subs: {  }},"<project/_layout/_sidebar1":{name:"project/_layout/_sidebar", partials: {}, subs: {  }}}, subs: {  }}, "{{#project}}\n<div id=\"project-wrap\" class=\"js-project-wrap v-{{editor_version}}\">\n  {{>project/_layout/_main}}\n  {{^is_iframe}}{{>project/_layout/_sidebar}}{{/is_iframe}}\n</div>\n{{/project}}\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "project/_layout/_main": arguments[1].template,"project/_layout/_sidebar": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/Dialog/Popup/Project',[ "jquery", "nbd/util/async", "nbd/util/media", "lib/adobeanalytics", "be/View/Dialog/Popup", "be/onhistory", "be/style", "project/lib/bindings", "hgn!templates/project", "jquery-plugins/plugins/jquery.fancybox" ], function(a, b, c, d, e, f, g, h, i) {
    "use strict";
    var j = e.extend({
        $styles: null,
        init: function() {
            this._super.apply(this, arguments), this.on("prerender", function() {
                document.title = this._model.get("title"), this.$styles = this.$styles || a("<style>", {
                    type: "text/css"
                }).appendTo("head"), g.set(this.$styles[0], this._model.get("styles").inline[0]), 
                this.$view && this.$view.parent().length && this.innerDestroy();
            }, this);
        },
        destroy: function() {
            this.$styles && (this.$styles.remove(), this.$styles = null), c.off(null, null, this), 
            this.$view && (this.$view.remove(), this.$view = null);
        },
        innerInit: function() {
            this._bindings = h.init(this.$popup.find(".js-project-wrap"), this.$popup, !0);
        },
        innerDestroy: function() {
            this._bindings.destroy();
        },
        mustache: i,
        template: function() {
            var a = this._super.apply(this, arguments);
            return a = a.filter(function() {
                return "SCRIPT" !== this.tagName;
            }), a.filter(".popup").prepend(this._model.get("upsell")), a;
        },
        templateData: function() {
            return a.extend({
                toolbar: !1,
                classes: [ "project-view", "js-project-popup" ]
            }, this._super().view);
        },
        rendered: function() {
            this.$popup = this.$view.filter(".popup"), this._bindBlockingDivHide(), this._super(), 
            a.fancybox.hideLoading(), d.page();
        },
        _bindBlockingDivHide: function() {
            this.$popup.find(".action-login").addClass("action-login-noremoval"), this.$popup.find(".js-project-sidebar-wrap, .js-project").on("click", function(a) {
                a.originalEvent.origin = this;
            }.bind(this)), this.$popup.find(".popup-inner-wrap").on("click", function(a) {
                a.originalEvent.origin !== this && this.hide();
            }.bind(this));
        },
        show: function() {
            this._super(), this.block(!0), this.$view.addClass("shown"), this.innerInit(), c.on("desktop:exit", function() {
                this.hide();
            }, this);
        },
        hide: function(a) {
            this.$view && (this._super(), c.off(null, null, this), this.block(!1), this.$view.removeClass("shown"), 
            this.innerDestroy(), a !== !0 && this.trigger("exit"));
        },
        block: function(b) {
            a(document.body).toggleClass("project-popup-open", b).add("html").css("overflow", b ? "hidden" : "");
        }
    });
    return j;
});
define('be/Controller/Dialog/Project',[ "be/Controller/Dialog/EntityPopup", "be/View/Dialog/Popup/Project" ], function(a, b) {
    "use strict";
    var c = a.extend({
        prefilter: function(a) {
            var b;
            return a.styles && (b = [].concat(a.styles.project, a.styles.local), a.styles.local = b), 
            a;
        },
        open: function() {
            return this._view && this._view.block(!0), this._super.apply(this, arguments);
        }
    }, {
        VIEW_CLASS: {
            desktop: b
        }
    });
    return c;
});
define('project/popup',[ "nbd/util/extend", "be/trait/popupSession", "be/Controller/Dialog/Project" ], function(a, b, c) {
    "use strict";
    return a({
        selector: ".cover-name-link, .cover-img-link, a.cover-img",
        entity: "project",
        Dialog: c
    }, b);
});
!function() {
    var a = Math, b = function(a) {
        return a >> 0;
    }, c = /webkit/i.test(navigator.appVersion) ? "webkit" : /firefox/i.test(navigator.userAgent) ? "Moz" : /trident/i.test(navigator.userAgent) ? "ms" : "opera" in window ? "O" : "", d = /android/gi.test(navigator.appVersion), e = /iphone|ipad/gi.test(navigator.appVersion), f = /playbook/gi.test(navigator.appVersion), g = /hp-tablet/gi.test(navigator.appVersion), h = document.all && !document.getElementsByClassName, i = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix(), j = "ontouchstart" in window && !g, k = c + "Transform" in document.documentElement.style, l = e || f, m = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
            return setTimeout(a, 1);
        };
    }(), n = function() {
        return window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;
    }(), o = "onorientationchange" in window ? "orientationchange" : "resize", p = j ? "touchstart" : "mousedown", q = j ? "touchmove" : "mousemove", r = j ? "touchend" : "mouseup", s = j ? "touchcancel" : "mouseup", t = "Moz" == c ? "DOMMouseScroll" : "mousewheel", u = document.attachEvent ? "mouseleave" : "mouseout", v = "translate" + (i ? "3d(" : "("), w = i ? ",0)" : ")", x = function(a, b) {
        var f, g = this, m = document;
        g.wrapper = "object" == typeof a ? a : m.getElementById(a), g.wrapper.style.overflow = "hidden", 
        g.scroller = g.wrapper.children[0], g.options = {
            hScroll: !0,
            vScroll: !0,
            x: 0,
            y: 0,
            bounce: !0,
            bounceLock: !1,
            momentum: !0,
            lockDirection: !0,
            useTransform: !0,
            useTransition: !1,
            topOffset: 0,
            checkDOMChanges: !1,
            handleClick: !0,
            hScrollbar: !0,
            vScrollbar: !0,
            fixedScrollbar: d,
            hideScrollbar: e,
            fadeScrollbar: e && i,
            scrollbarClass: "",
            zoom: !1,
            zoomMin: 1,
            zoomMax: 4,
            doubleTapZoom: 2,
            wheelAction: "scroll",
            snap: !1,
            snapThreshold: 1,
            onRefresh: null,
            onBeforeScrollStart: function(a) {
                a.preventDefault ? a.preventDefault() : a.returnValue = !1;
            },
            onScrollStart: null,
            onBeforeScrollMove: null,
            onScrollMove: null,
            onBeforeScrollEnd: null,
            onScrollEnd: null,
            onTouchEnd: null,
            onDestroy: null,
            onZoomStart: null,
            onZoom: null,
            onZoomEnd: null
        };
        for (f in b) g.options[f] = b[f];
        g.x = g.options.x, g.y = g.options.y, g.options.useTransform = k ? g.options.useTransform : !1, 
        g.options.hScrollbar = g.options.hScroll && g.options.hScrollbar, g.options.vScrollbar = g.options.vScroll && g.options.vScrollbar, 
        g.options.zoom = g.options.useTransform && g.options.zoom, g.options.useTransition = l && g.options.useTransition, 
        g.options.zoom && d && (v = "translate(", w = ")"), g.scroller.style[c + "TransitionProperty"] = g.options.useTransform ? "-" + c.toLowerCase() + "-transform" : "top left", 
        g.scroller.style[c + "TransitionDuration"] = "0", g.scroller.style[c + "TransformOrigin"] = "0 0", 
        g.options.useTransition && (g.scroller.style[c + "TransitionTimingFunction"] = "cubic-bezier(0.33,0.66,0.66,1)"), 
        g.options.useTransform ? g.scroller.style[c + "Transform"] = v + g.x + "px," + g.y + "px" + w : g.scroller.style.cssText += ";position:absolute;top:" + g.y + "px;left:" + g.x + "px", 
        g.options.useTransition && (g.options.fixedScrollbar = !0), g.refresh(), h && (g.scroller.ondragstart = function() {
            return !1;
        }), g._bind(o, window), g._bind(p), j || (g._bind(u, g.wrapper), "none" != g.options.wheelAction && g._bind(t)), 
        g.options.checkDOMChanges && (g.checkDOMTime = setInterval(function() {
            g._checkDOMChanges();
        }, 500));
    };
    x.prototype = {
        enabled: !0,
        x: 0,
        y: 0,
        steps: [],
        scale: 1,
        currPageX: 0,
        currPageY: 0,
        pagesX: [],
        pagesY: [],
        aniTime: null,
        wheelZoomCount: 0,
        handleEvent: function(a) {
            var b = this;
            switch (a.type) {
              case p:
                if (!j && a.button - (h ? 1 : 0) !== 0) return;
                b._start(a);
                break;

              case q:
                b._move(a);
                break;

              case r:
              case s:
                b._end(a);
                break;

              case o:
                b._resize();
                break;

              case t:
                b._wheel(a);
                break;

              case u:
                b._mouseout(a);
                break;

              case "webkitTransitionEnd":
                b._transitionEnd(a);
            }
        },
        _checkDOMChanges: function() {
            this.moved || this.zoomed || this.animating || this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale || this.refresh();
        },
        _scrollbar: function(d) {
            var e, f = this, g = document;
            return f[d + "Scrollbar"] ? (f[d + "ScrollbarWrapper"] || (e = g.createElement("div"), 
            f.options.scrollbarClass ? e.className = f.options.scrollbarClass + d.toUpperCase() : e.style.cssText = "position:absolute;z-index:100;" + ("h" == d ? "height:7px;bottom:1px;left:2px;right:" + (f.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (f.hScrollbar ? "7" : "2") + "px;top:2px;right:1px"), 
            e.style.cssText += ";pointer-events:none;-" + c + "-transition-property:opacity;-" + c + "-transition-duration:" + (f.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (f.options.hideScrollbar ? "0" : "1"), 
            f.wrapper.appendChild(e), f[d + "ScrollbarWrapper"] = e, e = g.createElement("div"), 
            f.options.scrollbarClass || (e.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);-" + c + "-background-clip:padding-box;-" + c + "-box-sizing:border-box;" + ("h" == d ? "height:100%" : "width:100%") + ";-" + c + "-border-radius:3px;border-radius:3px"), 
            e.style.cssText += ";pointer-events:none;-" + c + "-transition-property:-" + c + "-transform;-" + c + "-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-" + c + "-transition-duration:0;-" + c + "-transform:" + v + "0,0" + w, 
            f.options.useTransition && (e.style.cssText += ";-" + c + "-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"), 
            f[d + "ScrollbarWrapper"].appendChild(e), f[d + "ScrollbarIndicator"] = e), "h" == d ? (f.hScrollbarSize = f.hScrollbarWrapper.clientWidth, 
            f.hScrollbarIndicatorSize = a.max(b(f.hScrollbarSize * f.hScrollbarSize / f.scrollerW), 8), 
            f.hScrollbarIndicator.style.width = f.hScrollbarIndicatorSize + "px", f.hScrollbarMaxScroll = f.hScrollbarSize - f.hScrollbarIndicatorSize, 
            f.hScrollbarProp = f.hScrollbarMaxScroll / f.maxScrollX) : (f.vScrollbarSize = f.vScrollbarWrapper.clientHeight, 
            f.vScrollbarIndicatorSize = a.max(b(f.vScrollbarSize * f.vScrollbarSize / f.scrollerH), 8), 
            f.vScrollbarIndicator.style.height = f.vScrollbarIndicatorSize + "px", f.vScrollbarMaxScroll = f.vScrollbarSize - f.vScrollbarIndicatorSize, 
            f.vScrollbarProp = f.vScrollbarMaxScroll / f.maxScrollY), void f._scrollbarPos(d, !0)) : void (f[d + "ScrollbarWrapper"] && (k && (f[d + "ScrollbarIndicator"].style[c + "Transform"] = ""), 
            f[d + "ScrollbarWrapper"].parentNode.removeChild(f[d + "ScrollbarWrapper"]), f[d + "ScrollbarWrapper"] = null, 
            f[d + "ScrollbarIndicator"] = null));
        },
        _resize: function() {
            var a = this;
            setTimeout(function() {
                a.refresh();
            }, d ? 200 : 0);
        },
        _pos: function(a, d) {
            this.zoomed || (a = this.hScroll ? a : 0, d = this.vScroll ? d : 0, this.options.useTransform ? this.scroller.style[c + "Transform"] = v + a + "px," + d + "px" + w + " scale(" + this.scale + ")" : (a = b(a), 
            d = b(d), this.scroller.style.left = a + "px", this.scroller.style.top = d + "px"), 
            this.x = a, this.y = d, this._scrollbarPos("h"), this._scrollbarPos("v"));
        },
        _scrollbarPos: function(a, d) {
            var e, f = this, g = "h" == a ? f.x : f.y;
            f[a + "Scrollbar"] && (g = f[a + "ScrollbarProp"] * g, 0 > g ? (f.options.fixedScrollbar || (e = f[a + "ScrollbarIndicatorSize"] + b(3 * g), 
            8 > e && (e = 8), f[a + "ScrollbarIndicator"].style["h" == a ? "width" : "height"] = e + "px"), 
            g = 0) : g > f[a + "ScrollbarMaxScroll"] && (f.options.fixedScrollbar ? g = f[a + "ScrollbarMaxScroll"] : (e = f[a + "ScrollbarIndicatorSize"] - b(3 * (g - f[a + "ScrollbarMaxScroll"])), 
            8 > e && (e = 8), f[a + "ScrollbarIndicator"].style["h" == a ? "width" : "height"] = e + "px", 
            g = f[a + "ScrollbarMaxScroll"] + (f[a + "ScrollbarIndicatorSize"] - e))), f[a + "ScrollbarWrapper"].style.opacity = d && f.options.hideScrollbar ? "0" : "1", 
            h ? (f[a + "ScrollbarIndicator"].style.position = "absolute", "h" == a ? f[a + "ScrollbarIndicator"].style.left = g + "px" : f[a + "ScrollbarIndicator"].style.top = g + "px") : (f[a + "ScrollbarWrapper"].style[c + "TransitionDelay"] = "0", 
            f[a + "ScrollbarIndicator"].style[c + "Transform"] = v + ("h" == a ? g + "px,0" : "0," + g + "px") + w));
        },
        _start: function(b) {
            var d, e, f, g, h, i = this, k = j ? b.touches[0] : b, l = document.body, m = document.documentElement;
            i.enabled && (i.options.onBeforeScrollStart && i.options.onBeforeScrollStart.call(i, b), 
            (i.options.useTransition || i.options.zoom) && i._transitionTime(0), i.moved = !1, 
            i.animating = !1, i.zoomed = !1, i.distX = 0, i.distY = 0, i.absDistX = 0, i.absDistY = 0, 
            i.dirX = 0, i.dirY = 0, i.options.zoom && j && b.touches.length > 1 && (g = a.abs(b.touches[0].pageX - b.touches[1].pageX), 
            h = a.abs(b.touches[0].pageY - b.touches[1].pageY), i.touchesDistStart = a.sqrt(g * g + h * h), 
            i.originX = a.abs(b.touches[0].pageX + b.touches[1].pageX - 2 * i.wrapperOffsetLeft) / 2 - i.x, 
            i.originY = a.abs(b.touches[0].pageY + b.touches[1].pageY - 2 * i.wrapperOffsetTop) / 2 - i.y, 
            i.options.onZoomStart && i.options.onZoomStart.call(i, b)), i.options.momentum && (i.options.useTransform ? (d = getComputedStyle(i.scroller, null)[c + "Transform"].replace(/[^0-9-.,]/g, "").split(","), 
            e = 1 * d[4], f = 1 * d[5]) : (e = 1 * (i.scroller.currentStyle || getComputedStyle(i.scroller, null)).left.replace(/[^0-9-]/g, ""), 
            f = 1 * (i.scroller.currentStyle || getComputedStyle(i.scroller, null)).top.replace(/[^0-9-]/g, "")), 
            (e != i.x || f != i.y) && (i.options.useTransition ? i._unbind("webkitTransitionEnd") : n(i.aniTime), 
            i.steps = [], i._pos(e, f))), i.absStartX = i.x, i.absStartY = i.y, i.startX = i.x, 
            i.startY = i.y, i.pointX = k.pageX || k.clientX + l.scrollLeft + m.scrollLeft, i.pointY = k.pageY || k.clientY + l.scrollTop + m.scrollTop, 
            i.startTime = b.timeStamp || new Date().getTime(), i.options.onScrollStart && i.options.onScrollStart.call(i, b), 
            i._bind(q), i._bind(r), i._bind(s));
        },
        _move: function(b) {
            var d, e, f, g = this, h = j ? b.touches[0] : b, i = document.body, k = document.documentElement, l = (h.pageX || h.clientX + i.scrollLeft + k.scrollLeft) - g.pointX, m = (h.pageY || h.clientY + i.scrollTop + k.scrollTop) - g.pointY, n = g.x + l, o = g.y + m, p = b.timeStamp || new Date().getTime();
            return g.options.onBeforeScrollMove && g.options.onBeforeScrollMove.call(g, b), 
            g.options.zoom && j && b.touches.length > 1 ? (d = a.abs(b.touches[0].pageX - b.touches[1].pageX), 
            e = a.abs(b.touches[0].pageY - b.touches[1].pageY), g.touchesDist = a.sqrt(d * d + e * e), 
            g.zoomed = !0, f = 1 / g.touchesDistStart * g.touchesDist * this.scale, f < g.options.zoomMin ? f = .5 * g.options.zoomMin * Math.pow(2, f / g.options.zoomMin) : f > g.options.zoomMax && (f = 2 * g.options.zoomMax * Math.pow(.5, g.options.zoomMax / f)), 
            g.lastScale = f / this.scale, n = this.originX - this.originX * g.lastScale + this.x, 
            o = this.originY - this.originY * g.lastScale + this.y, this.scroller.style[c + "Transform"] = v + n + "px," + o + "px" + w + " scale(" + f + ")", 
            void (g.options.onZoom && g.options.onZoom.call(g, b))) : (g.pointX = h.pageX || h.clientX + i.scrollLeft + k.scrollLeft, 
            g.pointY = h.pageY || h.clientY + i.scrollTop + k.scrollTop, (n > 0 || n < g.maxScrollX) && (n = g.options.bounce ? g.x + l / 2 : n >= 0 || g.maxScrollX >= 0 ? 0 : g.maxScrollX), 
            (o > g.minScrollY || o < g.maxScrollY) && (o = g.options.bounce ? g.y + m / 2 : o >= g.minScrollY || g.maxScrollY >= 0 ? g.minScrollY : g.maxScrollY), 
            g.distX += l, g.distY += m, g.absDistX = a.abs(g.distX), g.absDistY = a.abs(g.distY), 
            void (g.absDistX < 6 && g.absDistY < 6 || (g.options.lockDirection && (g.absDistX > g.absDistY + 5 ? (o = g.y, 
            m = 0) : g.absDistY > g.absDistX + 5 && (n = g.x, l = 0)), g.moved = !0, g._pos(n, o), 
            g.dirX = l > 0 ? -1 : 0 > l ? 1 : 0, g.dirY = m > 0 ? -1 : 0 > m ? 1 : 0, p - g.startTime > 300 && (g.startTime = p, 
            g.startX = g.x, g.startY = g.y), g.options.onScrollMove && g.options.onScrollMove.call(g, b))));
        },
        _end: function(d) {
            if (!j || 0 == d.touches.length) {
                var e, f, g, h, i, k, l, m = this, n = j ? d.changedTouches[0] : d, o = {
                    dist: 0,
                    time: 0
                }, p = {
                    dist: 0,
                    time: 0
                }, t = (d.timeStamp || new Date().getTime()) - m.startTime, u = m.x, x = m.y;
                if (m._unbind(q), m._unbind(r), m._unbind(s), m.options.onBeforeScrollEnd && m.options.onBeforeScrollEnd.call(m, d), 
                m.zoomed) return l = m.scale * m.lastScale, l = Math.max(m.options.zoomMin, l), 
                l = Math.min(m.options.zoomMax, l), m.lastScale = l / m.scale, m.scale = l, m.x = m.originX - m.originX * m.lastScale + m.x, 
                m.y = m.originY - m.originY * m.lastScale + m.y, m.scroller.style[c + "TransitionDuration"] = "200ms", 
                m.scroller.style[c + "Transform"] = v + m.x + "px," + m.y + "px" + w + " scale(" + m.scale + ")", 
                m.zoomed = !1, m.refresh(), void (m.options.onZoomEnd && m.options.onZoomEnd.call(m, d));
                if (!m.moved) return j && (m.doubleTapTimer && m.options.zoom ? (clearTimeout(m.doubleTapTimer), 
                m.doubleTapTimer = null, m.options.onZoomStart && m.options.onZoomStart.call(m, d), 
                m.zoom(m.pointX, m.pointY, 1 == m.scale ? m.options.doubleTapZoom : 1), m.options.onZoomEnd && setTimeout(function() {
                    m.options.onZoomEnd.call(m, d);
                }, 200)) : this.options.handleClick && (m.doubleTapTimer = setTimeout(function() {
                    for (m.doubleTapTimer = null, e = n.target; 1 != e.nodeType; ) e = e.parentNode;
                    "SELECT" != e.tagName && "INPUT" != e.tagName && "TEXTAREA" != e.tagName && (f = document.createEvent("MouseEvents"), 
                    f.initMouseEvent("click", !0, !0, d.view, 1, n.screenX, n.screenY, n.clientX, n.clientY, d.ctrlKey, d.altKey, d.shiftKey, d.metaKey, 0, null), 
                    f._fake = !0, e.dispatchEvent(f));
                }, m.options.zoom ? 250 : 0))), m._resetPos(200), void (m.options.onTouchEnd && m.options.onTouchEnd.call(m, d));
                if (300 > t && m.options.momentum && (o = u ? m._momentum(u - m.startX, t, -m.x, m.scrollerW - m.wrapperW + m.x, m.options.bounce ? m.wrapperW : 0) : o, 
                p = x ? m._momentum(x - m.startY, t, -m.y, m.maxScrollY < 0 ? m.scrollerH - m.wrapperH + m.y - m.minScrollY : 0, m.options.bounce ? m.wrapperH : 0) : p, 
                u = m.x + o.dist, x = m.y + p.dist, (m.x > 0 && u > 0 || m.x < m.maxScrollX && u < m.maxScrollX) && (o = {
                    dist: 0,
                    time: 0
                }), (m.y > m.minScrollY && x > m.minScrollY || m.y < m.maxScrollY && x < m.maxScrollY) && (p = {
                    dist: 0,
                    time: 0
                })), o.dist || p.dist) return i = a.max(a.max(o.time, p.time), 10), m.options.snap && (g = u - m.absStartX, 
                h = x - m.absStartY, a.abs(g) < m.options.snapThreshold && a.abs(h) < m.options.snapThreshold ? m.scrollTo(m.absStartX, m.absStartY, 200) : (k = m._snap(u, x), 
                u = k.x, x = k.y, i = a.max(k.time, i))), m.scrollTo(b(u), b(x), i), void (m.options.onTouchEnd && m.options.onTouchEnd.call(m, d));
                if (m.options.snap) return g = u - m.absStartX, h = x - m.absStartY, a.abs(g) < m.options.snapThreshold && a.abs(h) < m.options.snapThreshold ? m.scrollTo(m.absStartX, m.absStartY, 200) : (k = m._snap(m.x, m.y), 
                (k.x != m.x || k.y != m.y) && m.scrollTo(k.x, k.y, k.time)), void (m.options.onTouchEnd && m.options.onTouchEnd.call(m, d));
                m._resetPos(200), m.options.onTouchEnd && m.options.onTouchEnd.call(m, d);
            }
        },
        _resetPos: function(a) {
            var b = this, d = b.x >= 0 ? 0 : b.x < b.maxScrollX ? b.maxScrollX : b.x, e = b.y >= b.minScrollY || b.maxScrollY > 0 ? b.minScrollY : b.y < b.maxScrollY ? b.maxScrollY : b.y;
            return d == b.x && e == b.y ? (b.moved && (b.moved = !1, b.options.onScrollEnd && b.options.onScrollEnd.call(b)), 
            b.hScrollbar && b.options.hideScrollbar && ("webkit" == c && (b.hScrollbarWrapper.style[c + "TransitionDelay"] = "300ms"), 
            b.hScrollbarWrapper.style.opacity = "0"), void (b.vScrollbar && b.options.hideScrollbar && ("webkit" == c && (b.vScrollbarWrapper.style[c + "TransitionDelay"] = "300ms"), 
            b.vScrollbarWrapper.style.opacity = "0"))) : void b.scrollTo(d, e, a || 0);
        },
        _wheel: function(a) {
            var b, c, d, e, f, g = this;
            if ("wheelDeltaX" in a) b = a.wheelDeltaX / 12, c = a.wheelDeltaY / 12; else if ("wheelDelta" in a) b = c = a.wheelDelta / 12; else {
                if (!("detail" in a)) return;
                b = c = 3 * -a.detail;
            }
            return "zoom" == g.options.wheelAction ? (f = g.scale * Math.pow(2, 1 / 3 * (c ? c / Math.abs(c) : 0)), 
            f < g.options.zoomMin && (f = g.options.zoomMin), f > g.options.zoomMax && (f = g.options.zoomMax), 
            void (f != g.scale && (!g.wheelZoomCount && g.options.onZoomStart && g.options.onZoomStart.call(g, a), 
            g.wheelZoomCount++, g.zoom(a.pageX, a.pageY, f, 400), setTimeout(function() {
                g.wheelZoomCount--, !g.wheelZoomCount && g.options.onZoomEnd && g.options.onZoomEnd.call(g, a);
            }, 400)))) : (d = g.x + b, e = g.y + c, d > 0 ? d = 0 : d < g.maxScrollX && (d = g.maxScrollX), 
            e > g.minScrollY ? e = g.minScrollY : e < g.maxScrollY && (e = g.maxScrollY), void (g.maxScrollY < 0 && g.scrollTo(d, e, 0)));
        },
        _mouseout: function(a) {
            var b = a.relatedTarget;
            if (!b) return void this._end(a);
            for (;b = b.parentNode; ) if (b == this.wrapper) return;
            this._end(a);
        },
        _transitionEnd: function(a) {
            var b = this;
            a.target == b.scroller && (b._unbind("webkitTransitionEnd"), b._startAni());
        },
        _startAni: function() {
            var b, c, d, e = this, f = e.x, g = e.y, h = new Date().getTime();
            if (!e.animating) {
                if (!e.steps.length) return void e._resetPos(400);
                if (b = e.steps.shift(), b.x == f && b.y == g && (b.time = 0), e.animating = !0, 
                e.moved = !0, e.options.useTransition) return e._transitionTime(b.time), e._pos(b.x, b.y), 
                e.animating = !1, void (b.time ? e._bind("webkitTransitionEnd") : e._resetPos(0));
                d = function() {
                    var i, j, k = new Date().getTime();
                    return k >= h + b.time ? (e._pos(b.x, b.y), e.animating = !1, e.options.onAnimationEnd && e.options.onAnimationEnd.call(e), 
                    void e._startAni()) : (k = (k - h) / b.time - 1, c = a.sqrt(1 - k * k), i = (b.x - f) * c + f, 
                    j = (b.y - g) * c + g, e._pos(i, j), void (e.animating && (e.aniTime = m(d))));
                }, d();
            }
        },
        _transitionTime: function(a) {
            a += "ms", this.scroller.style[c + "TransitionDuration"] = a, this.hScrollbar && (this.hScrollbarIndicator.style[c + "TransitionDuration"] = a), 
            this.vScrollbar && (this.vScrollbarIndicator.style[c + "TransitionDuration"] = a);
        },
        _momentum: function(c, d, e, f, g) {
            var h = 6e-4, i = a.abs(c) / d, j = i * i / (2 * h), k = 0, l = 0;
            return c > 0 && j > e ? (l = g / (6 / (j / i * h)), e += l, i = i * e / j, j = e) : 0 > c && j > f && (l = g / (6 / (j / i * h)), 
            f += l, i = i * f / j, j = f), j *= 0 > c ? -1 : 1, k = i / h, {
                dist: j,
                time: b(k)
            };
        },
        _offset: function(a) {
            for (var b = 0, c = 0; a; ) b -= a.offsetLeft, c -= a.offsetTop, a = a.offsetParent;
            return a != this.wrapper && (b *= this.scale, c *= this.scale), {
                left: b,
                top: c
            };
        },
        _snap: function(c, d) {
            var e, f, g, h, i, j, k = this;
            for (g = k.pagesX.length - 1, e = 0, f = k.pagesX.length; f > e; e++) if (c >= k.pagesX[e]) {
                g = e;
                break;
            }
            for (g == k.currPageX && g > 0 && k.dirX < 0 && g--, c = k.pagesX[g], i = a.abs(c - k.pagesX[k.currPageX]), 
            i = i ? a.abs(k.x - c) / i * 500 : 0, k.currPageX = g, g = k.pagesY.length - 1, 
            e = 0; g > e; e++) if (d >= k.pagesY[e]) {
                g = e;
                break;
            }
            return g == k.currPageY && g > 0 && k.dirY < 0 && g--, d = k.pagesY[g], j = a.abs(d - k.pagesY[k.currPageY]), 
            j = j ? a.abs(k.y - d) / j * 500 : 0, k.currPageY = g, h = b(a.max(i, j)) || 200, 
            {
                x: c,
                y: d,
                time: h
            };
        },
        _bind: function(a, b, c) {
            var d = this;
            document.addEventListener ? (b || this.scroller).addEventListener(a, this, !!c) : (this.events && "object" == typeof this.events || (this.events = {}), 
            this.events[a] = function(a) {
                d.handleEvent.call(d, a);
            }, (b || this.scroller).attachEvent("on" + a, this.events[a]));
        },
        _unbind: function(a, b, c) {
            document.removeEventListener ? (b || this.scroller).removeEventListener(a, this, !!c) : this.events[a] && (b || this.scroller).detachEvent("on" + a, this.events[a]);
        },
        destroy: function() {
            var a = this;
            a.scroller.style[c + "Transform"] = "", a.hScrollbar = !1, a.vScrollbar = !1, a._scrollbar("h"), 
            a._scrollbar("v"), a._unbind(o, window), a._unbind(p), a._unbind(q), a._unbind(r), 
            a._unbind(s), a.options.hasTouch || (a._unbind(u, a.wrapper), a._unbind(t)), a.options.useTransition && a._unbind("webkitTransitionEnd"), 
            a.options.checkDOMChanges && clearInterval(a.checkDOMTime), a.options.onDestroy && a.options.onDestroy.call(a);
        },
        refresh: function() {
            var a, d, e, f, g = this, h = 0, i = 0;
            if (g.scale < g.options.zoomMin && (g.scale = g.options.zoomMin), g.wrapperW = g.wrapper.clientWidth || 1, 
            g.wrapperH = g.wrapper.clientHeight || 1, g.minScrollY = -g.options.topOffset || 0, 
            g.scrollerW = b(g.scroller.offsetWidth * g.scale), g.scrollerH = b((g.scroller.offsetHeight + g.minScrollY) * g.scale), 
            g.maxScrollX = g.wrapperW - g.scrollerW, g.maxScrollY = g.wrapperH - g.scrollerH + g.minScrollY, 
            g.dirX = 0, g.dirY = 0, g.options.onRefresh && g.options.onRefresh.call(g), g.hScroll = g.options.hScroll && g.maxScrollX < 0, 
            g.vScroll = g.options.vScroll && (!g.options.bounceLock && !g.hScroll || g.scrollerH > g.wrapperH), 
            g.hScrollbar = g.hScroll && g.options.hScrollbar, g.vScrollbar = g.vScroll && g.options.vScrollbar && g.scrollerH > g.wrapperH, 
            a = g._offset(g.wrapper), g.wrapperOffsetLeft = -a.left, g.wrapperOffsetTop = -a.top, 
            "string" == typeof g.options.snap) for (g.pagesX = [], g.pagesY = [], f = g.scroller.querySelectorAll(g.options.snap), 
            d = 0, e = f.length; e > d; d++) h = g._offset(f[d]), h.left += g.wrapperOffsetLeft, 
            h.top += g.wrapperOffsetTop, g.pagesX[d] = h.left < g.maxScrollX ? g.maxScrollX : h.left * g.scale, 
            g.pagesY[d] = h.top < g.maxScrollY ? g.maxScrollY : h.top * g.scale; else if (g.options.snap) {
                for (g.pagesX = []; h >= g.maxScrollX; ) g.pagesX[i] = h, h -= g.wrapperW, i++;
                for (g.maxScrollX % g.wrapperW && (g.pagesX[g.pagesX.length] = g.maxScrollX - g.pagesX[g.pagesX.length - 1] + g.pagesX[g.pagesX.length - 1]), 
                h = 0, i = 0, g.pagesY = []; h >= g.maxScrollY; ) g.pagesY[i] = h, h -= g.wrapperH, 
                i++;
                g.maxScrollY % g.wrapperH && (g.pagesY[g.pagesY.length] = g.maxScrollY - g.pagesY[g.pagesY.length - 1] + g.pagesY[g.pagesY.length - 1]);
            }
            g._scrollbar("h"), g._scrollbar("v"), g.zoomed || (g.scroller.style[c + "TransitionDuration"] = "0", 
            g._resetPos(200));
        },
        scrollTo: function(a, b, c, d) {
            var e, f, g = this, h = a;
            for (g.stop(), h.length || (h = [ {
                x: a,
                y: b,
                time: c,
                relative: d
            } ]), e = 0, f = h.length; f > e; e++) h[e].relative && (h[e].x = g.x - h[e].x, 
            h[e].y = g.y - h[e].y), g.steps.push({
                x: h[e].x,
                y: h[e].y,
                time: h[e].time || 0
            });
            g._startAni();
        },
        scrollToElement: function(b, c) {
            var d, e = this;
            b = b.nodeType ? b : e.scroller.querySelector(b), b && (d = e._offset(b), d.left += e.wrapperOffsetLeft, 
            d.top += e.wrapperOffsetTop, d.left = d.left > 0 ? 0 : d.left < e.maxScrollX ? e.maxScrollX : d.left, 
            d.top = d.top > e.minScrollY ? e.minScrollY : d.top < e.maxScrollY ? e.maxScrollY : d.top, 
            c = void 0 === c ? a.max(2 * a.abs(d.left), 2 * a.abs(d.top)) : c, e.scrollTo(d.left, d.top, c));
        },
        scrollToPage: function(a, b, c) {
            var d, e, f = this;
            c = void 0 === c ? 400 : c, f.options.onScrollStart && f.options.onScrollStart.call(f), 
            f.options.snap ? (a = "next" == a ? f.currPageX + 1 : "prev" == a ? f.currPageX - 1 : a, 
            b = "next" == b ? f.currPageY + 1 : "prev" == b ? f.currPageY - 1 : b, a = 0 > a ? 0 : a > f.pagesX.length - 1 ? f.pagesX.length - 1 : a, 
            b = 0 > b ? 0 : b > f.pagesY.length - 1 ? f.pagesY.length - 1 : b, f.currPageX = a, 
            f.currPageY = b, d = f.pagesX[a], e = f.pagesY[b]) : (d = -f.wrapperW * a, e = -f.wrapperH * b, 
            d < f.maxScrollX && (d = f.maxScrollX), e < f.maxScrollY && (e = f.maxScrollY)), 
            f.scrollTo(d, e, c);
        },
        disable: function() {
            this.stop(), this._resetPos(0), this.enabled = !1, this._unbind(q), this._unbind(r), 
            this._unbind(s);
        },
        enable: function() {
            this.enabled = !0;
        },
        stop: function() {
            this.options.useTransition ? this._unbind("webkitTransitionEnd") : n(this.aniTime), 
            this.steps = [], this.moved = !1, this.animating = !1;
        },
        zoom: function(a, b, d, e) {
            var f = this, g = d / f.scale;
            f.options.useTransform && (f.zoomed = !0, e = void 0 === e ? 200 : e, a = a - f.wrapperOffsetLeft - f.x, 
            b = b - f.wrapperOffsetTop - f.y, f.x = a - a * g + f.x, f.y = b - b * g + f.y, 
            f.scale = d, f.refresh(), f.x = f.x > 0 ? 0 : f.x < f.maxScrollX ? f.maxScrollX : f.x, 
            f.y = f.y > f.minScrollY ? f.minScrollY : f.y < f.maxScrollY ? f.maxScrollY : f.y, 
            f.scroller.style[c + "TransitionDuration"] = e + "ms", f.scroller.style[c + "Transform"] = v + f.x + "px," + f.y + "px" + w + " scale(" + d + ")", 
            f.zoomed = !1);
        },
        isReady: function() {
            return !this.moved && !this.zoomed && !this.animating;
        }
    }, "undefined" != typeof exports ? exports.iScroll = x : window.iScroll = x;
}();
define("vendor/misc/iscroll", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.iScroll;
    };
}(this)));

define('wip/lib/timeline',[ "jquery", "has", "nbd/Controller", "nbd/util/async", "nbd/util/construct", "vendor/misc/iscroll" ], function(a, b, c, d, e, f) {
    "use strict";
    return c.extend({
        init: function(c) {
            this.$context = c, this.$slider = c.find(".wip-timeline-slider").css("display", "inline-block"), 
            b("touch") ? this.initIScroll() : this.initScrollers(), a(window).on("resize", this.updateTimeline);
        },
        initIScroll: function() {
            var a = this.iscroll = new f(this.$context[0], {
                hScroll: !0,
                vScroll: !1,
                lockDirection: !1,
                hideScrollbar: !0
            });
            this.updateTimeline = function() {
                d(a.refresh.bind(a));
            }, this.scrollTo = function(b) {
                a.scrollToElement(b[0]);
            };
        },
        initScrollers: function() {
            function b() {
                return parseFloat(h.css("left")) || 0;
            }
            function c() {
                var a = b(), c = g.width();
                e.toggle(0 > a), f.toggle(c - a < h.width());
            }
            function d(a) {
                a = Math.max(g.width() - h.outerWidth(), a), a = Math.min(0, a), h.animate({
                    left: a
                }, {
                    duration: 200,
                    always: c
                });
            }
            var e, f, g = this.$context, h = this.$slider, i = [ "prev", "next" ].map(function(b) {
                return a("<div>", {
                    "class": "wip-page wip-page-" + b
                }).append('<div class="wip-sprite wip-page-arrow"></div>');
            });
            e = i[0], f = i[1], g.append(e, f), h.css("position", "relative"), e.on("click", function() {
                d(b() + h.width() / 2);
            }), f.on("click", function() {
                d(b() - h.width() / 2);
            }), c(), this.updateTimeline = c, this.scrollTo = function(a) {
                var b = a.position();
                d(-b.left);
            };
        },
        destroy: function() {
            a(window).off("resize", this.updateTimeline), this.iscroll && (this.iscroll.destroy(), 
            this.iscroll = null);
        }
    }, {
        init: function() {
            return e.apply(this, arguments);
        }
    });
});
define('wip/coordinator',[ "beff/Component" ], function(a) {
    "use strict";
    return new a();
});
define('wip/View/Content',[ "jquery", "log", "nbd/util/media", "nbd/View/Entity", "beff/ux/keyboard", "be/onhistory", "wip/createloader", "wip/lib/timeline", "wip/coordinator", "be/history" ], function(a, b, c, d, e, f, g, h, i, j) {
    "use strict";
    b = b.get("wip/View/Content");
    var k = d.extend({
        init: function() {
            this._super.apply(this, arguments), this.listenTo(this._model, "revision", this.render);
        },
        destroy: function() {
            this.timeline && this.timeline.destroy(), this._super();
        },
        render: function(b) {
            if (b instanceof a) return this.$view = b, this.timeline = h.init(this.$view.find("#wip-timeline")), 
            this.update(), void this.rendered();
            var c = this.$view.find(".wip-image"), d = this.$view.find(".wip-enlarge"), e = this._model.image();
            e && (this.constrain(), c.prop("src", e.url), d.attr("href", this._model.image(!0).url), 
            this.update());
        },
        onStateChange: function(a) {
            a = a || j.getState();
            var b = a.wip && a.wip.rev;
            b && this._model.set("revision", b);
        },
        rendered: function() {
            function b() {
                var a = e._model.image(!0);
                c.is("desktop") || window.open(a.url, "_blank");
            }
            var d = f(function() {
                var b = a(this);
                return {
                    wip: {
                        rev: b.data("id") || b.attr("revision_id")
                    }
                };
            }), e = this;
            this.$view.on("click", "a.wip-thumbnail-container", function() {
                e.onStateChange(d.apply(this, arguments));
            }).on("click", "a.wip-thumbnail-container", !1).on("click", ".wip-action-create", this.create.bind(this)).on("click", "#wip-next", function() {
                e.adj("next");
            }).on("click", "#wip-prev", function() {
                e.adj("prev");
            });
            var g = this.$view.find(".wip-image").on("click", b);
            g.css("min-height", (this._model.get("safe") ? 0 : 400) + "px");
        },
        adj: function(a) {
            var b, c = this._model.adjacent();
            c && c[a] && (b = this._model.get("wip").revisions[c[a]], j.pushState({
                wip: {
                    rev: c[a]
                }
            }, document.title, b.url), this.onStateChange());
        },
        onkey: function() {
            var a = this;
            e.add({
                left: function() {
                    a.adj("prev");
                },
                right: function() {
                    a.adj("next");
                }
            });
        },
        create: function() {
            var a = this._model.get("wip").id;
            g().then(function(b) {
                i.trigger("addRevisionRequest"), b.render(a);
            });
        },
        update: function() {
            var a = this._model.get("revision"), b = this._model.adjacent();
            a = a.id || a, b && this.$view.find("#wip-prev").toggle(!!b.prev).end().find("#wip-next").toggle(!!b.next).end();
            var c = this.$view.find("#wip-timeline").find(".wip-thumbnail-container.timeline-active").removeClass("timeline-active").end().find(".wip-thumbnail-container[revision_id=" + a + "]").addClass("timeline-active").offsetParent();
            this.timeline && c.length && this.timeline.scrollTo(c);
        },
        constrain: function() {
            var a = this.$view.find(".wip-image"), c = a.closest(".wip-image-container"), d = Math.max(a.height(), c.height());
            b.info("height constraint", d), c.css({
                "min-height": d + "px",
                "line-height": d - (2 - d % 2) + "px"
            });
        }
    }, {
        _: !0
    });
    return k;
});
define('wip/Model/Content',[ "nbd/Model" ], function(a) {
    "use strict";
    var b = a.extend({
        revision: function() {
            var a = this.get("revision"), b = "object" == typeof a ? a : this.get("wip").revisions[a];
            return b;
        },
        revisionIds: function() {
            return Object.keys(this.get("wip").revisions).map(function(a) {
                return +a;
            }).sort(function(a, b) {
                return a - b;
            });
        },
        image: function(a) {
            var b = this.revision();
            return b && b.images ? (a ? b.images.full_screen : null) || b.images.high_definition || b.images.normal_resolution : null;
        },
        ordinality: function() {
            var a = this.get("revision"), b = this.revisionIds();
            return a = +(a.id || a), b.indexOf(a) + 1;
        },
        adjacent: function() {
            var a, b = this.revision().id, c = this.revisionIds();
            return ~(a = c.indexOf(b)) ? {
                prev: c[a + 1],
                next: c[a - 1]
            } : void 0;
        }
    });
    return b;
});
define('wip/Controller/Content',[ "be/stats", "nbd/Controller/Entity", "wip/View/Content", "wip/Model/Content" ], function(a, b, c, d) {
    "use strict";
    var e = b.extend({
        init: function() {
            this._super.apply(this, arguments), this._model.on("revision", this.stats, this), 
            this.stats();
        },
        stats: function() {
            a.view("wip_revision", this._model.revision().id);
        },
        render: function(a) {
            this._view.render(a);
        }
    }, {
        VIEW_CLASS: c,
        MODEL_CLASS: d
    });
    return e;
});
define('wip/lib/session',[ "jquery", "be/history" ], function(a, b) {
    "use strict";
    function c(a) {
        if (a.originalEvent) {
            var c = b.getState();
            c.wip || window.location.replace(window.location.href);
        }
    }
    var d, e = function() {
        var a = b.getState(), c = a && a.wip ? a.wip.rev : null;
        c && this.set("revision", c);
    };
    return {
        init: function(f) {
            d = e.bind(f);
            var g = b.getState();
            g && g.wip && !g.wip.rev && (b.replaceState({
                wip: {
                    rev: f.revision()
                }
            }, document.title, window.location.href), d()), a(window).on({
                popstate: c
            });
        },
        destroy: function() {
            a(window).off({
                popstate: c
            });
        }
    };
});
define('wip/lib/header',[ "be/follow", "be/social", "be/timestampFormatter", "wip/createloader" ], function(a, b, c, d) {
    "use strict";
    return {
        init: function(d, e) {
            var f = !1;
            a.init(d), b.init(d), c.init(d), d.on("click", ".wip-action-update", function() {
                var a = e.get("wip").id, b = e.get("revision");
                f || (f = !0, b = b.id || b, this.edit(a, b).then(function() {
                    f = !1;
                }));
            }.bind(this));
        },
        edit: function(a, b) {
            return d().then(function(c) {
                return c.render(a, b, !0);
            });
        }
    };
});
define('wip/lib/description',[ "jquery", "nbd/trait/pubsub" ], function(a, b) {
    "use strict";
    return a.extend({
        init: function(a, b) {
            this.$view = a, this._model = b, this.listenTo(b, "revision", this.update);
        },
        update: function() {
            var a = this._model.revision().description;
            this.$view.find("#description").text(a).parent().toggleClass("hide", !a);
        },
        destroy: function() {
            this.$view = null, this.stopListening();
        }
    }, b);
});
define('wip/lib/comments',[ "jquery", "log", "nbd/util/async", "nbd/util/media", "be/form/Reset", "be/comments", "be/automention", "be/mentionSource", "be/localization", "hgn!templates/form/textarea", "hgn!templates/button" ], function(a, b, c, d, e, f, g, h, i, j, k) {
    "use strict";
    b = b.get("wip/lib/comments");
    var l = {
        init: function(b, c) {
            var e, g, h = c.get("revision"), i = a(document.body).hasClass("logged-in");
            h = h.id || h, e = b.find(".comments-pagination"), g = b.find("#comment-count"), 
            this.$view = b.find(".comments-container"), this._model = c, this._view = f.init(this.$view, {
                type: "wip_revision",
                order: "asc",
                entity_id: h
            }, function(a) {
                e.toggleClass("hide", !a.more).parent().toggleClass("has-more", !!a.more);
            });
            var j = function(a) {
                this.$view.toggleClass("inline-comments-container", a).toggleClass("big-comments", !a);
            }.bind(this);
            d.on("desktop", j), j(d.is("desktop")), this._model.on("revision", this.view, this), 
            this.view(), i && this.create();
        },
        view: function(a) {
            h.init({
                local: "/mentions/wip_revision/" + this._model.revision().id
            }), this.$view.addClass("loading"), (a ? this._view.set({
                entity_id: a,
                offset: void 0
            }).clear() : this._view).get().then(function(a) {
                this.$view.removeClass("loading").find(".empty-state").toggleClass("hide", !(!a.comments || !a.comments.length));
            }.bind(this));
        },
        create: function() {
            function b(a) {
                if (!a.id || !a.user) throw a;
                c.add({
                    id: a.id,
                    user: a.user,
                    comment: a.comment,
                    posted_on: i.translate("comments_just_now", "Just now"),
                    permissions: [ 3e3 ]
                });
            }
            var c = this._view, d = this._model, f = this.$view.find(".inline-comment-form"), h = a(k({
                label: i.translate("wip_button_post_comment", "Post Comment"),
                classes: [ "form-button-default", "form-button-submit", "form-submit" ]
            })).hide(), l = a(j({
                id: "comment",
                autocomplete: "off",
                maxlength: 800,
                classes: [ "inline-comment-input", "js-characters-limited", "form-text-normal" ],
                containerClasses: [ "inline-comment-input-container", "ui-front" ],
                placeholder: f.data("commentPlaceholder"),
                validate: "required,Generic,length[0,800]"
            }));
            g(l.find("textarea").on("input propertychange", function() {
                var b = a(this);
                a(this).height(this.scrollHeight - (this.clientHeight - b.height())), h.toggle(!!this.value.length);
            }), {
                appendTo: ".wip-view"
            }), f.append(l, h), l.find("textarea").val(""), this._form = new e(this.$view), 
            this._form.on("success", this._form.showButtons.bind(this._form)), this._form.commit = function(a) {
                var c = d.get("revision");
                return c = c.id || c, a.data.entity_id = c, this.then(b).then(function() {
                    l.find("textarea").height(""), h.hide();
                }), this;
            }, this.$view.on("click", "#post-comment", function(b) {
                b.preventDefault(), a(a(this).attr("href")).focus();
            });
        },
        destroy: function() {
            this._model.off(null, null, this), this._view.destroy(), this._model = this._view = null;
        }
    };
    return l;
});
define('wip/lib/tags',[], function() {
    "use strict";
    return {
        init: function(a, b) {
            this.$view = a, this.model = b, b.on("revision", function() {
                this.update(b.revision().tags);
            }, this);
        },
        update: function(a) {
            this.$view.toggleClass("hide", !a.length).find("#object-tags").html(a.map(function(a) {
                return '<a class="object-tag" href="' + a.url + '">' + a.title + "</a>";
            }).join(""));
        },
        destroy: function() {
            this.model.off(null, null, this), this.$view = this.model = null;
        }
    };
});

define("vendor/require/hgn!templates/wip/revision", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<span id=\"revision-number\">");if(t.s(t.f("translate",c,p,1),c,p,0,41,107,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("wip_revision_ordinality|Revision ");t.b(t.v(t.f("ordinality",c,p,0)));t.b(" of ");t.b(t.v(t.f("cardinality",c,p,0)));});c.pop();}t.b("</span>");t.b("\n" + i);t.b("<span id=\"revision-date\">( ");t.b(t.v(t.f("date",c,p,0)));t.b(" )</span>");t.b("\n" + i);t.b("<a id=\"post-comment\" href=\"#comment\">");if(t.s(t.f("translate",c,p,1),c,p,0,225,263,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("wip_footer_post_comment|Post a Comment");});c.pop();}t.b("</a>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<span id=\"revision-number\">{{#translate}}wip_revision_ordinality|Revision {{ordinality}} of {{cardinality}}{{/translate}}</span>\n<span id=\"revision-date\">( {{date}} )</span>\n<a id=\"post-comment\" href=\"#comment\">{{#translate}}wip_footer_post_comment|Post a Comment{{/translate}}</a>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('wip/lib/revision',[ "jquery", "moment", "nbd/util/async", "nbd/util/pipe", "nbd/util/media", "nbd/View/Element", "hgn!templates/wip/revision" ], function(a, b, c, d, e, f, g) {
    "use strict";
    return {
        init: function(c, h) {
            this._model = h, this._view = new (f.extend({
                template: d(g, a),
                templateData: function() {
                    var a = h.revision().created_on;
                    return a = "string" == typeof a ? a : b.unix(a).format("MMMM D, YYYY"), {
                        ordinality: h.ordinality(),
                        cardinality: Object.keys(h.get("wip").revisions).length,
                        date: a
                    };
                }
            }))(c), h.on("revision", this.render, this), e.on("desktop", this.render, this), 
            this.render();
        },
        render: function() {
            this._view.destroy(), e.is("desktop") || this._view.render();
        },
        destroy: function() {
            e.off(null, null, this), this._model.off(null, null, this), this._view.destroy(), 
            this._view = this._model = null;
        }
    };
});
define('wip/lib/actions',[ "jquery", "be/spam", "be/Controller/Report" ], function(a, b, c) {
    "use strict";
    return {
        init: function(a) {
            c.init(a), b.delegate(a);
        }
    };
});
define('wip/lib/core',[ "be/Controller/Share", "wip/Controller/Content", "wip/lib/session", "wip/lib/header", "wip/lib/description", "wip/lib/comments", "wip/lib/tags", "wip/lib/revision", "wip/lib/actions", "project/lib/mature" ], function(a, b, c, d, e, f, g, h, i, j) {
    "use strict";
    return {
        init: function(a, k) {
            var l = new b(k);
            this._wip = l, l.render(a.find(".wip-main .wip-main-content")), c.init(l._model), 
            e.init(a.find(".wip-sidebar"), l._model), f.init(a.find(".wip-sidebar"), l._model), 
            d.init(a.find("#wip-header"), l._model), g.init(a.find("#wip-tags"), l._model), 
            h.init(a.find("#comments-header"), l._model), i.init(a.find(".wip-actions")), j.init(k.wip.id, "WIP", k.wip), 
            k.share && this.share(l._model);
        },
        share: function(b) {
            var c = new a({
                text: 'Give me feedback on "' + b.get("wip").title + '", a work-in-progress on @Behance :: ' + b.revision().short_url,
                image: b.revision().image_path
            });
            c.render();
        },
        destroy: function() {
            c.destroy(), e.destroy(), f.destroy(), g.destroy(), h.destroy(), j.destroy(), this._wip && (this._wip.destroy(), 
            this._wip = null);
        }
    };
});

define("vendor/require/hgn!templates/lib/_viralIconTwitter", ["hogan"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<a href=\"https://twitter.com/share\" class=\"js-viral-button-twitter twitter-share-button viral-button-twitter\" data-url=\"");t.sub("url",c,p,i);t.b("\" data-text=\"");t.sub("title",c,p,i);t.b("\" data-via=\"Behance\" data-count=\"none\" data-lang=\"");t.b(t.v(t.f("language",c,p,0)));t.b("\"></a>");t.b("\n");return t.fl(); },partials: {}, subs: { "url": function(c,p,t,i) {t.b(t.v(t.f("url",c,p,0)));},"title": function(c,p,t,i) {t.b(t.v(t.f("title",c,p,0)));} }}, "<a href=\"https://twitter.com/share\" class=\"js-viral-button-twitter twitter-share-button viral-button-twitter\" data-url=\"{{$url}}{{url}}{{/url}}\" data-text=\"{{$title}}{{title}}{{/title}}\" data-via=\"Behance\" data-count=\"none\" data-lang=\"{{language}}\"></a>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = {  "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_viralIcons", ["hogan", "vendor/require/hgn!templates/lib/_viralIconTwitter"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<span class=\"viral-icons cfix\">");t.b("\n" + i);t.b(t.rp("<lib/_viralIconTwitter0",c,p,"  "));t.b("  <span class=\"js-viral-button-linkedin viral-button-linkedin\"><script type=\"IN/Share\" data-url=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\"></script></span>");t.b("\n" + i);if(!t.s(t.f("no_pinterest",c,p,1),c,p,1,0,0,"")){t.b("  <div class=\"js-viral-button-pinterest viral-button-pinterest\"></div>");t.b("\n" + i);};if(!t.s(t.f("no_stumble",c,p,1),c,p,1,0,0,"")){t.b("  <span class=\"js-viral-button-stumble viral-button-stumble\"><su:badge layout=\"4\" location=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\"></su:badge></span>");t.b("\n" + i);};t.b("  <div class=\"js-viral-button-fb viral-button-facebook fb-like\" data-send=\"false\" data-layout=\"button_count\" data-width=\"90\" data-show-faces=\"false\"></div>");t.b("\n" + i);t.b("</span>");t.b("\n");return t.fl(); },partials: {"<lib/_viralIconTwitter0":{name:"lib/_viralIconTwitter", partials: {}, subs: {  }}}, subs: {  }}, "<span class=\"viral-icons cfix\">\n  {{>lib/_viralIconTwitter}}\n  <span class=\"js-viral-button-linkedin viral-button-linkedin\"><script type=\"IN/Share\" data-url=\"{{url}}\"></script></span>\n  {{^no_pinterest}}\n  <div class=\"js-viral-button-pinterest viral-button-pinterest\"></div>\n  {{/no_pinterest}}\n  {{^no_stumble}}\n  <span class=\"js-viral-button-stumble viral-button-stumble\"><su:badge layout=\"4\" location=\"{{url}}\"></su:badge></span>\n  {{/no_stumble}}\n  <div class=\"js-viral-button-fb viral-button-facebook fb-like\" data-send=\"false\" data-layout=\"button_count\" data-width=\"90\" data-show-faces=\"false\"></div>\n</span>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_viralIconTwitter": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/lib/_viralIconsTooltip", ["hogan", "vendor/require/hgn!templates/lib/_viralIcons"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"tooltipi tooltipi-white tooltipi-share\">");t.b("\n" + i);if(t.s(t.f("viral_data",c,p,1),c,p,0,70,90,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_viralIcons0",c,p,""));});c.pop();}t.b("</div> <!-- .tooltipi -->");return t.fl(); },partials: {"<lib/_viralIcons0":{name:"lib/_viralIcons", partials: {}, subs: {  }}}, subs: {  }}, "<div class=\"tooltipi tooltipi-white tooltipi-share\">\n  {{#viral_data}}{{>lib/_viralIcons}}{{/viral_data}}\n</div> <!-- .tooltipi -->", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_viralIcons": arguments[1].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 

define("vendor/require/hgn!templates/wip", ["hogan", "vendor/require/hgn!templates/lib/_follow/_buttonUserSmall", "vendor/require/hgn!templates/lib/_viralIconsTooltip"], function(hogan){ var tmpl = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"wip-container\">");t.b("\n" + i);t.b("  <div id=\"wip-header\" class=\"cfix");if(t.s(t.f("linked_project",c,p,1),c,p,0,78,93,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" linked-project");});c.pop();}t.b("\">");t.b("\n");t.b("\n" + i);t.b("    <div class=\"wip-header-left left relative\">");t.b("\n");t.b("\n" + i);t.b("      <div class=\"inline-block wip-user-info relative\">");t.b("\n");t.b("\n" + i);t.b("        <h1 class=\"wip-title\">");t.b(t.v(t.d("wip.title",c,p,0)));t.b("</h1>");t.b("\n");t.b("\n" + i);t.b("        <ul id=\"wip-stats\" class=\"inline-block\">");t.b("\n");t.b("\n" + i);if(t.s(t.d("wip.private",c,p,1),c,p,0,348,500,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("          <li class=\"project-stat project-stat-private beicons-pre beicons-pre-privacy\">");if(t.s(t.f("translate",c,p,1),c,p,0,451,470,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("wip_private|PRIVATE");});c.pop();}t.b("</li>");t.b("\n" + i);});c.pop();}t.b("\n" + i);t.b("          <li class=\"project-stat project-stat-views beicons-pre beicons-pre-eye\">");t.b("\n" + i);t.b("            ");t.b(t.v(t.d("wip.stats.views",c,p,0)));t.b("\n" + i);t.b("          </li>");t.b("\n");t.b("\n" + i);t.b("          <li class=\"project-stat project-stat-comments beicons-pre beicons-pre-comment\">");t.b("\n" + i);t.b("            ");t.b(t.v(t.d("wip.stats.comments",c,p,0)));t.b("\n" + i);t.b("          </li>");t.b("\n");t.b("\n" + i);t.b("          <li class=\"project-stat project-stat-revisions beicons-pre beicons-pre-wip\">");t.b("\n" + i);t.b("            ");t.b(t.v(t.d("wip.stats.revisions",c,p,0)));t.b("\n" + i);t.b("          </li>");t.b("\n");t.b("\n" + i);t.b("        </ul> <!-- #wip-stats -->");t.b("\n");t.b("\n" + i);t.b("        <div class=\"project-published inline-block js-format-timestamp\" data-timestamp=\"");t.b(t.v(t.d("revision.created_on",c,p,0)));t.b("\"></div>");t.b("\n");t.b("\n" + i);if(t.s(t.d("user.owner",c,p,1),c,p,0,1111,1416,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("          <span class=\"fake-link wip-action js-wip-action-update wip-action-update hide-phone hide-tablet\" data-id=\"");t.b(t.v(t.d("wip.id",c,p,0)));t.b("\" data-revision-id=\"");t.b(t.v(t.d("revision.id",c,p,0)));t.b("\" wip_id=\"");t.b(t.v(t.d("wip.id",c,p,0)));t.b("\" revision_id=\"");t.b(t.v(t.d("revision.id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("            ");if(t.s(t.f("translate",c,p,1),c,p,0,1352,1375,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("wip_edit_info|Edit Info");});c.pop();}t.b("\n" + i);t.b("          </span>");t.b("\n" + i);});c.pop();}t.b("\n" + i);t.b("      </div> <!-- .inline-block -->");t.b("\n");t.b("\n" + i);t.b("    </div> <!-- wip-header-left -->");t.b("\n");t.b("\n" + i);t.b("    <div class=\"wip-owner\">");t.b("\n");t.b("\n" + i);t.b("      <a class=\"user-image-link\" href=\"");t.b(t.v(t.d("user.url",c,p,0)));t.b("\"><img class=\"inline-block user-image js-mini-profile\" src=\"");t.b(t.v(t.d("user.image",c,p,0)));t.b("\" data-id=\"");t.b(t.v(t.d("user.id",c,p,0)));t.b("\" /></a>");t.b("\n" + i);t.b("      <a href=\"");t.b(t.v(t.d("wip.owner.url",c,p,0)));t.b("\" class=\"wip-author-link text-ellipsis js-mini-profile\" data-id=\"");t.b(t.v(t.d("wip.owner.id",c,p,0)));t.b("\">");t.b(t.v(t.d("wip.owner.display_name",c,p,0)));t.b("</a>");t.b("\n");t.b("\n" + i);t.b("      <div class=\"wip-owner-buttons\">");t.b("\n");t.b("\n" + i);if(!t.s(t.d("user.owner",c,p,1),c,p,1,0,0,"")){if(t.s(t.f("user",c,p,1),c,p,0,1921,1954,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_follow/_buttonUserSmall0",c,p,""));});c.pop();}};t.b("\n" + i);if(!t.s(t.d("wip.private",c,p,1),c,p,1,0,0,"")){t.b("\n" + i);t.b("          <div class=\"inline-block tooltipi-container wip-share-container tooltipi-share-container\">");t.b("\n" + i);t.b("            <span id=\"wip-share\" class=\"form-button form-button-small form-button-light-and-grey form-button-down-arrow\">");if(t.s(t.f("translate",c,p,1),c,p,0,2251,2269,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("button_share|Share");});c.pop();}t.b("</span>");t.b("\n");t.b("\n" + i);if(t.s(t.f("content",c,p,1),c,p,0,2316,2343,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.rp("<lib/_viralIconsTooltip1",c,p,""));});c.pop();}t.b("\n" + i);t.b("          </div>");t.b("\n");t.b("\n" + i);};t.b("\n" + i);t.b("      </div> <!-- .wip-owner-buttons -->");t.b("\n" + i);t.b("    </div> <!-- .wip-owner -->");t.b("\n");t.b("\n" + i);t.b("  </div>");t.b("\n");t.b("\n" + i);t.b("  <div class=\"wip-content cfix\">");t.b("\n");t.b("\n" + i);t.b("    <div class=\"wip-main left\">");t.b("\n");t.b("\n" + i);t.b("      <div class=\"wip-main-content relative\">");t.b("\n");t.b("\n" + i);if(t.s(t.f("safe",c,p,1),c,p,0,2615,2844,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.d("revision.original_image",c,p,1),c,p,0,2652,2807,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <a class=\"wip-enlarge\" href=\"");t.b(t.v(t.d("revision.original_image",c,p,0)));t.b("\" target=\"_blank\">");if(t.s(t.f("translate",c,p,1),c,p,0,2749,2780,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("wip_original_size|Original Size");});c.pop();}t.b("</a>");t.b("\n" + i);});c.pop();}});c.pop();}t.b("        <div id=\"wip-prev\" class=\"wip-arrow\"></div>");t.b("\n" + i);t.b("        <div id=\"wip-next\" class=\"wip-arrow\"></div>");t.b("\n");t.b("\n" + i);t.b("        <div class=\"wip-image-container overflow-hidden\">");t.b("\n");t.b("\n" + i);if(t.s(t.f("safe",c,p,1),c,p,0,3037,3115,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("            <img src=\"");t.b(t.v(t.d("revision.image_path",c,p,0)));t.b("\" class=\"wip-image\"/>");t.b("\n" + i);});c.pop();}t.b("\n" + i);if(!t.s(t.f("safe",c,p,1),c,p,1,0,0,"")){t.b("            <div class=\"wip-image wip-image-mature\" style=\"max-height:");t.b(t.v(t.d("revision.image_properties.height",c,p,0)));t.b("px;\">&nbsp;</div>");t.b("\n" + i);};t.b("\n" + i);t.b("        </div>");t.b("\n");t.b("\n" + i);t.b("        ");t.b(t.t(t.d("content.timeline",c,p,0)));t.b("\n");t.b("\n" + i);t.b("      </div> <!-- .wip-main-content -->");t.b("\n");t.b("\n" + i);t.b("    </div> <!-- .wip-main -->");t.b("\n");t.b("\n" + i);t.b("    <div class=\"wip-sidebar left");if(t.s(t.f("linked_project",c,p,1),c,p,0,3462,3477,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" linked-project");});c.pop();}t.b("\">");t.b("\n");t.b("\n" + i);t.b("      <div class=\"wip-sidebar-content\">");t.b("\n");t.b("\n" + i);t.b("        <div class=\"hide-phone hide-tablet");if(!t.s(t.d("revision.description",c,p,1),c,p,1,0,0,"")){t.b(" hide");};t.b("\">");t.b("\n" + i);t.b("          <div class=\"wip-sidebar-label\">");if(t.s(t.f("translate",c,p,1),c,p,0,3696,3729,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("wip_description_label|Description");});c.pop();}t.b("</div>");t.b("\n" + i);t.b("          <div id=\"description\" class=\"wip-description\">");t.b(t.v(t.d("revision.description",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("        </div>");t.b("\n");t.b("\n" + i);t.b("        <div id=\"comments-list-container\" class=\"comments-container inline-comments-container\">");t.b("\n");t.b("\n" + i);t.b("          <div id=\"wip-comments-header\">");t.b("\n");t.b("\n" + i);t.b("            <div class=\"comments-pagination see-more-button-container hide\">");t.b("\n" + i);t.b("              <div class=\"comments-total comments-offset fake-link cfix\">");t.b("\n" + i);t.b("                <span class=\"comments-total-text fake-link left beicons-pre beicons-pre-comment\">");if(t.s(t.f("translate",c,p,1),c,p,0,4254,4286,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("wip_comments_load_more|Load More");});c.pop();}t.b(" &darr;</span>");t.b("\n" + i);t.b("              </div>");t.b("\n" + i);t.b("            </div>");t.b("\n");t.b("\n" + i);t.b("            <div class=\"empty-state hide hide-phone hide-tablet\">");if(t.s(t.f("translate",c,p,1),c,p,0,4435,4487,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("wip_discuss_this_work|Discuss This Work in Progress:");});c.pop();}t.b("</div>");t.b("\n");t.b("\n" + i);t.b("            <div id=\"comments-header\" class=\"show-tablet show-phone\"></div>");t.b("\n");t.b("\n" + i);if(t.s(t.d("revision.description",c,p,1),c,p,0,4623,4934,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("            <div id=\"wip-description-wrap\" class=\"show-phone show-tablet\">");t.b("\n" + i);t.b("              <div class=\"wip-sidebar-label\">");if(t.s(t.f("translate",c,p,1),c,p,0,4758,4791,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("wip_description_label|Description");});c.pop();}t.b("</div>");t.b("\n" + i);t.b("              <div id=\"description\" class=\"wip-description\">");t.b(t.v(t.d("revision.description",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("            </div>");t.b("\n" + i);});c.pop();}t.b("\n" + i);t.b("          </div>");t.b("\n");t.b("\n" + i);t.b("          <ul id=\"comments-list\" class=\"js-comments-list\"></ul>");t.b("\n");t.b("\n" + i);t.b("          <div id=\"comment-form-header\" class=\"show-tablet\">");t.b("\n" + i);t.b("            ");if(t.s(t.f("translate",c,p,1),c,p,0,5131,5183,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("wip_discuss_this_work|Discuss This Work in Progress:");});c.pop();}t.b("\n" + i);t.b("          </div>");t.b("\n");t.b("\n" + i);t.b("          <form class=\"inline-comment-form cfix relative\" action=\"");t.b(t.v(t.f("comment_action",c,p,0)));t.b("\" data-comment-placeholder=\"");if(t.s(t.f("translate",c,p,1),c,p,0,5342,5384,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("wip_comment_placeholder|Write a Comment...");});c.pop();}t.b("\"></form>");t.b("\n");t.b("\n" + i);if(!t.s(t.f("logged_in",c,p,1),c,p,1,0,0,"")){t.b("          <div class=\"comment-logged-out\">");t.b("\n" + i);t.b("            ");if(t.s(t.f("translate",c,p,1),c,p,0,5503,5643,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("wip_join_conversation|You must <a class=\"js-adobeid-signup\">sign up</a> or <a class=\"js-adobeid-signin\">log in</a> to join the conversation.");});c.pop();}t.b("\n" + i);t.b("          </div>");t.b("\n" + i);};t.b("\n" + i);t.b("        </div> <!-- .comments-container  -->");t.b("\n");t.b("\n" + i);t.b("      </div> <!-- .wip-sidebar-content -->");t.b("\n");t.b("\n" + i);t.b("    </div> <!-- .wip-sidebar -->");t.b("\n");t.b("\n" + i);if(t.s(t.f("linked_project",c,p,1),c,p,0,5848,6444,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("\n" + i);t.b("        <div class=\"wip-linked-project-block absolute unselectable\">");t.b("\n");t.b("\n" + i);t.b("          <a class=\"wip-linked-project cfix bordered-item\" href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\" target=\"_blank\">");t.b("\n");t.b("\n" + i);t.b("            <img class=\"left project-cover\" src=\"");t.b(t.v(t.f("cover",c,p,0)));t.b("\" />");t.b("\n" + i);t.b("            <div class=\"left project-info\">");t.b("\n" + i);t.b("              <div class=\"project-title bold\">");t.b(t.v(t.f("name",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("              <div class=\"project-link bold fake-link\">");if(t.s(t.f("translate",c,p,1),c,p,0,6249,6288,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("wip_view_full_project|View Full Project");});c.pop();}t.b(" &rarr;</div>");t.b("\n" + i);t.b("              <div class=\"project-fields grey ellipsis\">");t.b(t.v(t.f("fields",c,p,0)));t.b("</div>");t.b("\n" + i);t.b("            </div>");t.b("\n");t.b("\n" + i);t.b("          </a>");t.b("\n");t.b("\n" + i);t.b("        </div>");t.b("\n");t.b("\n" + i);});c.pop();}t.b("  </div> <!-- .wip-content -->");t.b("\n");t.b("\n" + i);t.b("  <div class=\"wip-actions\">");t.b("\n");t.b("\n" + i);t.b("    <a class=\"beicons-pre beicons-pre-report flag-spam flag-spam-project js-action-report wip-report\" data-id=\"");t.b(t.v(t.d("wip.id",c,p,0)));t.b("\" data-type=\"wip\">");if(t.s(t.f("translate",c,p,1),c,p,0,6678,6695,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("wip_report|Report");});c.pop();}t.b("</a>");t.b("\n");t.b("\n" + i);if(t.s(t.f("signed_in",c,p,1),c,p,0,6733,6900,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("\n" + i);t.b("      <a class=\"js-action-spam beicons-pre beicons-pre-spam\" data-id=\"");t.b(t.v(t.d("wip.id",c,p,0)));t.b("\" data-type=\"wip\">");if(t.s(t.f("translate",c,p,1),c,p,0,6847,6876,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("wip_mark_as_spam|Mark as Spam");});c.pop();}t.b("</a>");t.b("\n");t.b("\n" + i);});c.pop();}t.b("\n" + i);t.b("  </div> <!-- .wip-actions -->");t.b("\n");t.b("\n" + i);t.b("  <div class=\"cfix ");if(!t.s(t.d("revision.tags",c,p,1),c,p,1,0,0,"")){t.b("hide");};t.b("\" id=\"wip-tags\">");t.b("\n" + i);t.b("    <div class=\"wip-tags-label inline-block\">");if(t.s(t.f("translate",c,p,1),c,p,0,7083,7103,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("wip_tags_label|Tags:");});c.pop();}t.b("</div>");t.b("\n" + i);t.b("    <div class=\"cfix\" id=\"object-tags\">");t.b("\n" + i);if(t.s(t.d("revision.tags",c,p,1),c,p,0,7188,7252,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <a class=\"object-tag\" href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\">");t.b(t.v(t.f("title",c,p,0)));t.b("</a>");t.b("\n" + i);});c.pop();}t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {"<lib/_follow/_buttonUserSmall0":{name:"lib/_follow/_buttonUserSmall", partials: {}, subs: {  }},"<lib/_viralIconsTooltip1":{name:"lib/_viralIconsTooltip", partials: {}, subs: {  }}}, subs: {  }}, "<div id=\"wip-container\">\n  <div id=\"wip-header\" class=\"cfix{{#linked_project}} linked-project{{/linked_project}}\">\n\n    <div class=\"wip-header-left left relative\">\n\n      <div class=\"inline-block wip-user-info relative\">\n\n        <h1 class=\"wip-title\">{{wip.title}}</h1>\n\n        <ul id=\"wip-stats\" class=\"inline-block\">\n\n          {{#wip.private}}\n          <li class=\"project-stat project-stat-private beicons-pre beicons-pre-privacy\">{{#translate}}wip_private|PRIVATE{{/translate}}</li>\n          {{/wip.private}}\n\n          <li class=\"project-stat project-stat-views beicons-pre beicons-pre-eye\">\n            {{wip.stats.views}}\n          </li>\n\n          <li class=\"project-stat project-stat-comments beicons-pre beicons-pre-comment\">\n            {{wip.stats.comments}}\n          </li>\n\n          <li class=\"project-stat project-stat-revisions beicons-pre beicons-pre-wip\">\n            {{wip.stats.revisions}}\n          </li>\n\n        </ul> <!-- #wip-stats -->\n\n        <div class=\"project-published inline-block js-format-timestamp\" data-timestamp=\"{{revision.created_on}}\"></div>\n\n        {{#user.owner}}\n          <span class=\"fake-link wip-action js-wip-action-update wip-action-update hide-phone hide-tablet\" data-id=\"{{wip.id}}\" data-revision-id=\"{{revision.id}}\" wip_id=\"{{wip.id}}\" revision_id=\"{{revision.id}}\">\n            {{#translate}}wip_edit_info|Edit Info{{/translate}}\n          </span>\n        {{/user.owner}}\n\n      </div> <!-- .inline-block -->\n\n    </div> <!-- wip-header-left -->\n\n    <div class=\"wip-owner\">\n\n      <a class=\"user-image-link\" href=\"{{user.url}}\"><img class=\"inline-block user-image js-mini-profile\" src=\"{{user.image}}\" data-id=\"{{user.id}}\" /></a>\n      <a href=\"{{wip.owner.url}}\" class=\"wip-author-link text-ellipsis js-mini-profile\" data-id=\"{{wip.owner.id}}\">{{wip.owner.display_name}}</a>\n\n      <div class=\"wip-owner-buttons\">\n\n        {{^user.owner}}\n          {{#user}}{{>lib/_follow/_buttonUserSmall}}{{/user}}\n        {{/user.owner}}\n\n        {{^wip.private}}\n\n          <div class=\"inline-block tooltipi-container wip-share-container tooltipi-share-container\">\n            <span id=\"wip-share\" class=\"form-button form-button-small form-button-light-and-grey form-button-down-arrow\">{{#translate}}button_share|Share{{/translate}}</span>\n\n            {{#content}}{{>lib/_viralIconsTooltip}}{{/content}}\n\n          </div>\n\n        {{/wip.private}}\n\n      </div> <!-- .wip-owner-buttons -->\n    </div> <!-- .wip-owner -->\n\n  </div>\n\n  <div class=\"wip-content cfix\">\n\n    <div class=\"wip-main left\">\n\n      <div class=\"wip-main-content relative\">\n\n        {{#safe}}\n        {{#revision.original_image}}\n        <a class=\"wip-enlarge\" href=\"{{revision.original_image}}\" target=\"_blank\">{{#translate}}wip_original_size|Original Size{{/translate}}</a>\n        {{/revision.original_image}}\n        {{/safe}}\n        <div id=\"wip-prev\" class=\"wip-arrow\"></div>\n        <div id=\"wip-next\" class=\"wip-arrow\"></div>\n\n        <div class=\"wip-image-container overflow-hidden\">\n\n          {{#safe}}\n            <img src=\"{{revision.image_path}}\" class=\"wip-image\"/>\n          {{/safe}}\n\n          {{^safe}}\n            <div class=\"wip-image wip-image-mature\" style=\"max-height:{{revision.image_properties.height}}px;\">&nbsp;</div>\n          {{/safe}}\n\n        </div>\n\n        {{{content.timeline}}}\n\n      </div> <!-- .wip-main-content -->\n\n    </div> <!-- .wip-main -->\n\n    <div class=\"wip-sidebar left{{#linked_project}} linked-project{{/linked_project}}\">\n\n      <div class=\"wip-sidebar-content\">\n\n        <div class=\"hide-phone hide-tablet{{^revision.description}} hide{{/revision.description}}\">\n          <div class=\"wip-sidebar-label\">{{#translate}}wip_description_label|Description{{/translate}}</div>\n          <div id=\"description\" class=\"wip-description\">{{revision.description}}</div>\n        </div>\n\n        <div id=\"comments-list-container\" class=\"comments-container inline-comments-container\">\n\n          <div id=\"wip-comments-header\">\n\n            <div class=\"comments-pagination see-more-button-container hide\">\n              <div class=\"comments-total comments-offset fake-link cfix\">\n                <span class=\"comments-total-text fake-link left beicons-pre beicons-pre-comment\">{{#translate}}wip_comments_load_more|Load More{{/translate}} &darr;</span>\n              </div>\n            </div>\n\n            <div class=\"empty-state hide hide-phone hide-tablet\">{{#translate}}wip_discuss_this_work|Discuss This Work in Progress:{{/translate}}</div>\n\n            <div id=\"comments-header\" class=\"show-tablet show-phone\"></div>\n\n            {{#revision.description}}\n            <div id=\"wip-description-wrap\" class=\"show-phone show-tablet\">\n              <div class=\"wip-sidebar-label\">{{#translate}}wip_description_label|Description{{/translate}}</div>\n              <div id=\"description\" class=\"wip-description\">{{revision.description}}</div>\n            </div>\n            {{/revision.description}}\n\n          </div>\n\n          <ul id=\"comments-list\" class=\"js-comments-list\"></ul>\n\n          <div id=\"comment-form-header\" class=\"show-tablet\">\n            {{#translate}}wip_discuss_this_work|Discuss This Work in Progress:{{/translate}}\n          </div>\n\n          <form class=\"inline-comment-form cfix relative\" action=\"{{comment_action}}\" data-comment-placeholder=\"{{#translate}}wip_comment_placeholder|Write a Comment...{{/translate}}\"></form>\n\n          {{^logged_in}}\n          <div class=\"comment-logged-out\">\n            {{#translate}}wip_join_conversation|You must <a class=\"js-adobeid-signup\">sign up</a> or <a class=\"js-adobeid-signin\">log in</a> to join the conversation.{{/translate}}\n          </div>\n          {{/logged_in}}\n\n        </div> <!-- .comments-container  -->\n\n      </div> <!-- .wip-sidebar-content -->\n\n    </div> <!-- .wip-sidebar -->\n\n    {{#linked_project}}\n\n        <div class=\"wip-linked-project-block absolute unselectable\">\n\n          <a class=\"wip-linked-project cfix bordered-item\" href=\"{{url}}\" target=\"_blank\">\n\n            <img class=\"left project-cover\" src=\"{{cover}}\" />\n            <div class=\"left project-info\">\n              <div class=\"project-title bold\">{{name}}</div>\n              <div class=\"project-link bold fake-link\">{{#translate}}wip_view_full_project|View Full Project{{/translate}} &rarr;</div>\n              <div class=\"project-fields grey ellipsis\">{{fields}}</div>\n            </div>\n\n          </a>\n\n        </div>\n\n   {{/linked_project}}\n  </div> <!-- .wip-content -->\n\n  <div class=\"wip-actions\">\n\n    <a class=\"beicons-pre beicons-pre-report flag-spam flag-spam-project js-action-report wip-report\" data-id=\"{{wip.id}}\" data-type=\"wip\">{{#translate}}wip_report|Report{{/translate}}</a>\n\n    {{#signed_in}}\n\n      <a class=\"js-action-spam beicons-pre beicons-pre-spam\" data-id=\"{{wip.id}}\" data-type=\"wip\">{{#translate}}wip_mark_as_spam|Mark as Spam{{/translate}}</a>\n\n    {{/signed_in}}\n\n  </div> <!-- .wip-actions -->\n\n  <div class=\"cfix {{^revision.tags}}hide{{/revision.tags}}\" id=\"wip-tags\">\n    <div class=\"wip-tags-label inline-block\">{{#translate}}wip_tags_label|Tags:{{/translate}}</div>\n    <div class=\"cfix\" id=\"object-tags\">\n      {{#revision.tags}}\n      <a class=\"object-tag\" href=\"{{url}}\">{{title}}</a>\n      {{/revision.tags}}\n    </div>\n  </div>\n</div>\n", hogan), extend = function(a, b) { for (var k in b) { a[k] = b[k]; } return a; }, parts = { "lib/_follow/_buttonUserSmall": arguments[1].template,"lib/_viralIconsTooltip": arguments[2].template, "": null}, render = function() { return tmpl.render.apply(tmpl, arguments); }; tmpl.ri = function(context, partials, indent) { context.unshift(hogan.helpers); return this.r(context, extend(parts, partials), indent); }; render.template = tmpl; return render;}); 
define('be/View/Dialog/Popup/Wip',[ "jquery", "nbd/util/async", "nbd/util/extend", "nbd/util/media", "be/spinner", "be/View/Dialog/Popup", "be/social", "lib/adobeanalytics", "wip/lib/core", "wip/coordinator", "hgn!templates/wip", "jquery-plugins/plugins/jquery.fancybox" ], function(a, b, c, d, e, f, g, h, i, j, k) {
    "use strict";
    function l(a, b, c) {
        var d = a.map(function(d, e) {
            return d = Math.max(c ? c[e] : -(1 / 0), d), d = Math.min(b ? b[e] : 1 / 0, d), 
            d / a[e];
        }).reduce(function(a, b) {
            return Math.min(a, b);
        }, 1 / 0);
        return a.map(function(a) {
            return ~~(a * d);
        });
    }
    var m = f.extend({
        init: function() {
            this._super.apply(this, arguments), d.on("desktop:exit", function() {
                this.hide();
            }, this), this.on("show", function() {
                try {
                    i._wip._view.onkey();
                } catch (a) {}
            });
        },
        destroy: function() {
            d.off(null, null, this), this._super();
        },
        innerDestroy: function() {
            return this.$view.find(".wip-image").css("max-height", ""), i.destroy();
        },
        mustache: k,
        templateData: function() {
            var a = this._super();
            return c({
                classes: [ "wip-view" ],
                toolbar: !1
            }, a);
        },
        rendered: function() {
            var c, d;
            this.$view.appendTo(document.body), document.title = this._model.get("title"), this._super(), 
            i.init(this.$view, this._model.data()), this.$view.find(".wip-owner").append('<div class="close popup-close">'), 
            this.findMax(), this.constrain(), this.listenTo(i._wip._model, "revision", this.constrain), 
            this.listenTo(j, "addRevisionRequest", this.hide), c = function() {
                this.position(), a.fancybox.hideLoading();
            }.bind(this), d = this.$view.find(".wip-image-container"), i._wip._model.get("safe") || c(), 
            d.find(".wip-image").css("max-width", "100%").on("load", function() {
                d.css({
                    "min-width": d.width(),
                    "min-height": d.height()
                }), b(c);
            }), h.page();
        },
        findMax: function() {
            var a = [ window.innerWidth, window.innerHeight ], b = [ 0, 0 ];
            return b[0] += .1 * a[0], b[0] += this.$view.find(".wip-sidebar").outerWidth(), 
            b[1] += .1 * a[1], b[1] += this.$view.find("#wip-header").outerHeight(), b[1] += this.$view.find("#wip-timeline").outerHeight(), 
            a = a.map(function(a, c) {
                return a - b[c];
            }, b), this.max = a;
        },
        constrain: function() {
            var a = i._wip._model.image(), b = l([ a.width, a.height ], this.max);
            this.$view.find(".wip-image").css("max-height", b[1] + "px");
        },
        position: function() {
            this._super();
            var a = this.$view.filter(".popup"), b = parseFloat(a.css("top")) || 0;
            a.css("top", b + 30);
        },
        hide: function(a) {
            return this.$view ? (this._super(), this.$view.removeClass("shown"), this.innerDestroy(), 
            a !== !0 && this.trigger("exit"), this) : void 0;
        }
    });
    return m;
});
define('be/Controller/Dialog/Wip',[ "be/Controller/Dialog/EntityPopup", "be/View/Dialog/Popup/Wip" ], function(a, b) {
    "use strict";
    var c = a.extend({}, {
        VIEW_CLASS: {
            desktop: b
        }
    });
    return c;
});
define('wip/popup',[ "nbd/util/extend", "be/trait/popupSession", "be/Controller/Dialog/Wip" ], function(a, b, c) {
    "use strict";
    return a({}, b, {
        selector: ".wip-action-popup",
        entity: "wip",
        Dialog: c,
        show: function(a) {
            var c = a.data;
            if (this.singleton._view.$view && c && c.wip && c.wip.rev) {
                var d = this.singleton._view.$view.toArray().every(function(a) {
                    return document.body.contains(a);
                });
                if (d) return;
            }
            b.show.call(this, a);
        }
    });
});
require([ "page_config", "jquery", "has", "discover/filter", "discover/content", "discover/sidebar", "discover/lib/url", "discover/Model/Filters", "discover/lib/loader", "project/popup", "wip/popup", "be/miniprofile" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
    "use strict";
    function m() {
        b("#top-panel").addClass("loading");
    }
    function n() {
        b("#top-panel").removeClass("loading");
    }
    function o() {
        var c = b(document.body), o = b("#content");
        j.on("prerender", m).on("postrender", n).on("dataReceived", function(b) {
            a.viewingProject = b;
        }).init(), k.on("prerender", m).on("postrender", n).init(), h.setLoadState(window.location.search.replace(/^\?/, "")), 
        i.bind(h), d.init(c), e.init(o), f.init(c), g.init("#top-panel a, .popup a"), l.init(c, o, b("#infinity-footer"));
    }
    b(o);
});
define("discover", function(){});


(function(g) { 
  g._cssWritten = g._cssWritten || []; 
  if (g._cssWritten.indexOf('discover') != -1) return; 
  g._cssWritten.push('discover');  for (var c in requirejs.s.contexts) { requirejs.s.contexts[c].nextTick = function(f){f()} } 
  require(['css', 'vendor/require/normalize', 'require'], function(css, normalize, req) { 
    var pathname = window.location.pathname.split('/'); 
    pathname.pop(); 
    pathname = pathname.join('/') + '/'; 
    var baseParts = req.toUrl('base_url').split('/'); 
    baseParts.pop(); 
    var baseUrl = baseParts.join('/') + '/'; 
    baseUrl = normalize.convertURIBase(baseUrl, pathname, '/'); 
    if (baseUrl.substr(0, 1) != '/') 
      baseUrl = '/' + baseUrl; 
    css.inject(normalize('.fancybox-tmp iframe,.fancybox-tmp object{vertical-align:top;padding:0;margin:0;}.fancybox-wrap{position:absolute;top:0;left:0;z-index:1002;}.fancybox-outer{padding:0;margin:0;background:#f9f9f9;color:#444;text-shadow:none;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;}.fancybox-opened{z-index:1003;}.fancybox-opened .fancybox-outer{-webkit-box-shadow:0 10px 25px rgba(0,0,0,0.5);-moz-box-shadow:0 10px 25px rgba(0,0,0,0.5);box-shadow:0 10px 25px rgba(0,0,0,0.5);}.fancybox-inner{width:100%;height:100%;padding:0;margin:0;position:relative;outline:none;overflow:hidden;}.fancybox-error{color:#444;font:14px/20px \"Helvetica Neue\",Helvetica,Arial,sans-serif;margin:0;padding:10px;}.fancybox-image,.fancybox-iframe{display:block;width:100%;height:100%;border:0;padding:0;margin:0;vertical-align:top;}.fancybox-image{max-width:100%;max-height:100%;}#fancybox-loading{position:fixed;top:50%;left:50%;margin-top:-21px;margin-left:-21px;width:42px;height:42px;background:url(\'//a3.behance.net/img/jquery/plugins/fancybox/loading.gif?cb=2008637217\');opacity:0.8;cursor:pointer;z-index:1010;}.fancybox-close,.fancybox-prev span,.fancybox-next span{background-image:url(\'//a3.behance.net/img/jquery/plugins/fancybox/sprite.png?cb=2008637217\');}.fancybox-close{position:absolute;top:-18px;right:-18px;width:36px;height:36px;cursor:pointer;z-index:1004;}.fancybox-prev,.fancybox-next{position:absolute;top:0;width:40%;height:100%;cursor:pointer;background:transparent url(\'//a3.behance.net/img/jquery/blank.gif?cb=2008637217\');z-index:1003;}.fancybox-prev{left:0;}.fancybox-next{right:0;}.fancybox-prev span,.fancybox-next span{position:absolute;top:50%;left:-9999px;width:36px;height:36px;margin-top:-18px;cursor:pointer;z-index:1003;}.fancybox-prev span{background-position:0 -36px;}.fancybox-next span{background-position:0 -72px;}.fancybox-prev:hover,.fancybox-next:hover{visibility:visible;}.fancybox-prev:hover span{left:20px;}.fancybox-next:hover span{left:auto;right:20px;}.fancybox-tmp{position:absolute;top:-9999px;left:-9999px;padding:0;overflow:visible;visibility:hidden;}#fancybox-overlay{position:absolute;top:0;left:0;overflow:hidden;display:none;z-index:1001;background:#000;}.fancybox-title{visibility:hidden;font:normal 13px/20px \"Helvetica Neue\",Helvetica,Arial,sans-serif;position:relative;text-shadow:none;z-index:1005;}.fancybox-opened .fancybox-title{visibility:visible;}.fancybox-title-float-wrap{position:absolute;bottom:0;right:50%;margin-bottom:-35px;z-index:1003;text-align:center;}.fancybox-title-float-wrap .child{display:inline-block;margin-right:-100%;padding:2px 20px;background:transparent;background:rgba(0,0,0,0.8);-webkit-border-radius:15px;-moz-border-radius:15px;border-radius:15px;text-shadow:0 1px 2px #222;color:#FFF;font-weight:bold;line-height:24px;white-space:nowrap;}.fancybox-title-outside-wrap{position:relative;margin-top:10px;color:#fff;}.fancybox-title-inside-wrap{margin-top:10px;}.fancybox-title-over-wrap{position:absolute;bottom:0;left:0;color:#fff;padding:10px;background:#000;background:rgba(0,0,0,.8);}.popup.mini-profile:before{width:20px;height:20px;background:#fff;box-shadow:-2px -2px 4px -2px rgba(0,0,0,0.4);content:\'\';position:absolute;z-index:-1;}.popup.mini-profile.top-right:before,.popup.mini-profile.top-left:before{-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg);top:-8px;}.popup.mini-profile.bottom-right:before,.popup.mini-profile.bottom-left:before{-webkit-transform:rotate(-134deg);-moz-transform:rotate(-134deg);-ms-transform:rotate(-134deg);-o-transform:rotate(-134deg);transform:rotate(-134deg);bottom:-8px;}.popup.mini-profile.top-right:before,.popup.mini-profile.bottom-right:before{right:45px;}.popup.mini-profile.top-left:before,.popup.mini-profile.bottom-left:before{left:45px;}.mini-profile-wrap{width:331px;}.mini-profile-wrap .gallery-projects-wrap{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;background:#fff;border:1px solid #d9d9d9;border-radius:4px;padding:4px 3px 4px 1px;position:relative;text-decoration:none;width:361px;}.mini-profile-wrap .gallery-projects-wrap .gallery-cover-overlay{background:#0088f5;background:-webkit-gradient(linear,0% 0%,0% 100%,from(rgba(0,156,252,0.75)),to(rgba(0,116,238,0.75)));background:-webkit-linear-gradient(0% 0%,0% 100%,from(rgba(0,156,252,0.75)),to(rgba(0,116,238,0.75)));background:-moz-linear-gradient(center top,rgba(0,156,252,0.75),rgba(0,116,238,0.75));background:linear-gradient(rgba(0,156,252,0.75),rgba(0,116,238,0.75));-moz-transition:opacity 0.15s ease-in;-webkit-transition:opacity 0.15s ease-in;transition:opacity 0.15s ease-in;border:1px solid #356bca;border-radius:4px;bottom:0;color:#fff;font-size:16px;left:0;opacity:0;position:absolute;right:0;text-align:center;text-decoration:none !important;text-shadow:1px 2px 0 #0a4fb9;text-transform:uppercase;top:0;}.ie .mini-profile-wrap .gallery-projects-wrap .gallery-cover-overlay{display:none;font-weight:bold;}.mini-profile-wrap .gallery-projects-wrap:hover .gallery-cover-overlay{opacity:1;}.ie .mini-profile-wrap .gallery-projects-wrap:hover .gallery-cover-overlay{background:rgba(0,156,252,0.75);display:block;}.mini-profile-wrap .gallery-projects-wrap .gallery-cover-overlay-text{-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);-webkit-transform:translateY(-50%);transform:translateY(-50%);position:absolute;top:50%;width:100%;}.mini-profile-wrap .gallery-projects-wrap .project-cover-wrap{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;background:#f3f3f3;border-left:3px solid #fff;float:left;height:90px;overflow:hidden;width:33.3%;}.mini-profile-wrap .gallery-projects-wrap .project-cover-wrap .project-cover{border-radius:0;box-shadow:none;margin:0;vertical-align:top;visibility:visible;width:100%;}.mini-profile-wrap .gallery-projects-wrap .project-cover-wrap.empty .project-cover{display:none;}.mini-profile-wrap .gallery-projects-wrap-4{width:479px;}.mini-profile-wrap .gallery-projects-wrap-4 .project-cover-wrap{width:25%;}.mini-profile-wrap .gallery-projects-wrap-4 .project-cover-wrap:nth-child(n+5){display:none;}.mini-profile-wrap .gallery-projects-wrap-2{width:242px;}.mini-profile-wrap .gallery-projects-wrap-2 .project-cover-wrap{width:50%;}.mini-profile-wrap .gallery-projects-wrap-2 .project-cover-wrap:nth-child(n+3){display:none;}.mini-profile-wrap .user-image-wrap,.mini-profile-wrap .user-image{width:35px;height:35px;}.mini-profile-wrap .user-image-wrap{background:#f3f3f3;display:block;float:left;margin:0 10px 0 0;padding:0;}.mini-profile-wrap .user-info{display:inline-block;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.mini-profile-wrap .user-name{color:#3c3c3c;display:block;font-size:14px;padding-bottom:3px;}.mini-profile-wrap .location-link{color:#6f6f6f;font-size:13px;}.mini-profile-wrap .location-link:before{margin-right:3px;}.mini-profile-wrap .follow-button-container{float:right;width:auto !important;}.mini-profile-wrap .gallery-projects-wrap{float:left;margin:0 0 10px;width:331px;}.mini-profile-wrap .gallery-projects-wrap .project-cover-wrap{display:block !important;height:82px;width:108px;}.mini-profile-wrap .user-stats-followed{float:inherit;}.mini-profile-wrap .user-info-container{display:inline-block;}.mini-profile-wrap .stats-wrap{color:#adadad;font-size:13px;font-weight:bold;margin-bottom:-2px;}.mini-profile-wrap .cover-stat{margin-right:10px;}.mini-profile-wrap .cover-stat:before{margin-right:2px;}', baseUrl, pathname)); 
  }); 
  for (var c in requirejs.s.contexts) { requirejs.s.contexts[c].nextTick = requirejs.nextTick; } 
})(this);
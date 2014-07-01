window.Modernizr = function(window, document, undefined) {
    var version = "2.7.2", Modernizr = {}, enableClasses = true, docElement = document.documentElement, mod = "modernizr", modElem = document.createElement(mod), mStyle = modElem.style, inputElem = document.createElement("input"), smile = ":)", toString = {}.toString, prefixes = " -webkit- -moz- -o- -ms- ".split(" "), omPrefixes = "Webkit Moz O ms", cssomPrefixes = omPrefixes.split(" "), domPrefixes = omPrefixes.toLowerCase().split(" "), ns = {
        svg: "http://www.w3.org/2000/svg"
    }, tests = {}, inputs = {}, attrs = {}, classes = [], slice = classes.slice, featureName, injectElementWithStyles = function(rule, callback, nodes, testnames) {
        var style, ret, node, docOverflow, div = document.createElement("div"), body = document.body, fakeBody = body || document.createElement("body");
        if (parseInt(nodes, 10)) {
            while (nodes--) {
                node = document.createElement("div");
                node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
                div.appendChild(node);
            }
        }
        style = [ "&#173;", '<style id="s', mod, '">', rule, "</style>" ].join("");
        div.id = mod;
        (body ? div : fakeBody).innerHTML += style;
        fakeBody.appendChild(div);
        if (!body) {
            fakeBody.style.background = "";
            fakeBody.style.overflow = "hidden";
            docOverflow = docElement.style.overflow;
            docElement.style.overflow = "hidden";
            docElement.appendChild(fakeBody);
        }
        ret = callback(div, rule);
        if (!body) {
            fakeBody.parentNode.removeChild(fakeBody);
            docElement.style.overflow = docOverflow;
        } else {
            div.parentNode.removeChild(div);
        }
        return !!ret;
    }, testMediaQuery = function(mq) {
        var matchMedia = window.matchMedia || window.msMatchMedia;
        if (matchMedia) {
            return matchMedia(mq).matches;
        }
        var bool;
        injectElementWithStyles("@media " + mq + " { #" + mod + " { position: absolute; } }", function(node) {
            bool = (window.getComputedStyle ? getComputedStyle(node, null) : node.currentStyle)["position"] == "absolute";
        });
        return bool;
    }, isEventSupported = function() {
        var TAGNAMES = {
            select: "input",
            change: "input",
            submit: "form",
            reset: "form",
            error: "img",
            load: "img",
            abort: "img"
        };
        function isEventSupported(eventName, element) {
            element = element || document.createElement(TAGNAMES[eventName] || "div");
            eventName = "on" + eventName;
            var isSupported = eventName in element;
            if (!isSupported) {
                if (!element.setAttribute) {
                    element = document.createElement("div");
                }
                if (element.setAttribute && element.removeAttribute) {
                    element.setAttribute(eventName, "");
                    isSupported = is(element[eventName], "function");
                    if (!is(element[eventName], "undefined")) {
                        element[eventName] = undefined;
                    }
                    element.removeAttribute(eventName);
                }
            }
            element = null;
            return isSupported;
        }
        return isEventSupported;
    }(), _hasOwnProperty = {}.hasOwnProperty, hasOwnProp;
    if (!is(_hasOwnProperty, "undefined") && !is(_hasOwnProperty.call, "undefined")) {
        hasOwnProp = function(object, property) {
            return _hasOwnProperty.call(object, property);
        };
    } else {
        hasOwnProp = function(object, property) {
            return property in object && is(object.constructor.prototype[property], "undefined");
        };
    }
    if (!Function.prototype.bind) {
        Function.prototype.bind = function bind(that) {
            var target = this;
            if (typeof target != "function") {
                throw new TypeError();
            }
            var args = slice.call(arguments, 1), bound = function() {
                if (this instanceof bound) {
                    var F = function() {};
                    F.prototype = target.prototype;
                    var self = new F();
                    var result = target.apply(self, args.concat(slice.call(arguments)));
                    if (Object(result) === result) {
                        return result;
                    }
                    return self;
                } else {
                    return target.apply(that, args.concat(slice.call(arguments)));
                }
            };
            return bound;
        };
    }
    function setCss(str) {
        mStyle.cssText = str;
    }
    function setCssAll(str1, str2) {
        return setCss(prefixes.join(str1 + ";") + (str2 || ""));
    }
    function is(obj, type) {
        return typeof obj === type;
    }
    function contains(str, substr) {
        return !!~("" + str).indexOf(substr);
    }
    function testProps(props, prefixed) {
        for (var i in props) {
            var prop = props[i];
            if (!contains(prop, "-") && mStyle[prop] !== undefined) {
                return prefixed == "pfx" ? prop : true;
            }
        }
        return false;
    }
    function testDOMProps(props, obj, elem) {
        for (var i in props) {
            var item = obj[props[i]];
            if (item !== undefined) {
                if (elem === false) return props[i];
                if (is(item, "function")) {
                    return item.bind(elem || obj);
                }
                return item;
            }
        }
        return false;
    }
    function testPropsAll(prop, prefixed, elem) {
        var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1), props = (prop + " " + cssomPrefixes.join(ucProp + " ") + ucProp).split(" ");
        if (is(prefixed, "string") || is(prefixed, "undefined")) {
            return testProps(props, prefixed);
        } else {
            props = (prop + " " + domPrefixes.join(ucProp + " ") + ucProp).split(" ");
            return testDOMProps(props, prefixed, elem);
        }
    }
    tests["flexbox"] = function() {
        return testPropsAll("flexWrap");
    };
    tests["flexboxlegacy"] = function() {
        return testPropsAll("boxDirection");
    };
    tests["canvas"] = function() {
        var elem = document.createElement("canvas");
        return !!(elem.getContext && elem.getContext("2d"));
    };
    tests["canvastext"] = function() {
        return !!(Modernizr["canvas"] && is(document.createElement("canvas").getContext("2d").fillText, "function"));
    };
    tests["webgl"] = function() {
        return !!window.WebGLRenderingContext;
    };
    tests["touch"] = function() {
        var bool;
        if ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) {
            bool = true;
        } else {
            injectElementWithStyles([ "@media (", prefixes.join("touch-enabled),("), mod, ")", "{#modernizr{top:9px;position:absolute}}" ].join(""), function(node) {
                bool = node.offsetTop === 9;
            });
        }
        return bool;
    };
    tests["geolocation"] = function() {
        return "geolocation" in navigator;
    };
    tests["postmessage"] = function() {
        return !!window.postMessage;
    };
    tests["websqldatabase"] = function() {
        return !!window.openDatabase;
    };
    tests["indexedDB"] = function() {
        return !!testPropsAll("indexedDB", window);
    };
    tests["hashchange"] = function() {
        return isEventSupported("hashchange", window) && (document.documentMode === undefined || document.documentMode > 7);
    };
    tests["history"] = function() {
        return !!(window.history && history.pushState);
    };
    tests["draganddrop"] = function() {
        var div = document.createElement("div");
        return "draggable" in div || "ondragstart" in div && "ondrop" in div;
    };
    tests["websockets"] = function() {
        return "WebSocket" in window || "MozWebSocket" in window;
    };
    tests["rgba"] = function() {
        setCss("background-color:rgba(150,255,150,.5)");
        return contains(mStyle.backgroundColor, "rgba");
    };
    tests["hsla"] = function() {
        setCss("background-color:hsla(120,40%,100%,.5)");
        return contains(mStyle.backgroundColor, "rgba") || contains(mStyle.backgroundColor, "hsla");
    };
    tests["multiplebgs"] = function() {
        setCss("background:url(https://),url(https://),red url(https://)");
        return /(url\s*\(.*?){3}/.test(mStyle.background);
    };
    tests["backgroundsize"] = function() {
        return testPropsAll("backgroundSize");
    };
    tests["borderimage"] = function() {
        return testPropsAll("borderImage");
    };
    tests["borderradius"] = function() {
        return testPropsAll("borderRadius");
    };
    tests["boxshadow"] = function() {
        return testPropsAll("boxShadow");
    };
    tests["textshadow"] = function() {
        return document.createElement("div").style.textShadow === "";
    };
    tests["opacity"] = function() {
        setCssAll("opacity:.55");
        return /^0.55$/.test(mStyle.opacity);
    };
    tests["cssanimations"] = function() {
        return testPropsAll("animationName");
    };
    tests["csscolumns"] = function() {
        return testPropsAll("columnCount");
    };
    tests["cssgradients"] = function() {
        var str1 = "background-image:", str2 = "gradient(linear,left top,right bottom,from(#9f9),to(white));", str3 = "linear-gradient(left top,#9f9, white);";
        setCss((str1 + "-webkit- ".split(" ").join(str2 + str1) + prefixes.join(str3 + str1)).slice(0, -str1.length));
        return contains(mStyle.backgroundImage, "gradient");
    };
    tests["cssreflections"] = function() {
        return testPropsAll("boxReflect");
    };
    tests["csstransforms"] = function() {
        return !!testPropsAll("transform");
    };
    tests["csstransforms3d"] = function() {
        var ret = !!testPropsAll("perspective");
        if (ret && "webkitPerspective" in docElement.style) {
            injectElementWithStyles("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(node, rule) {
                ret = node.offsetLeft === 9 && node.offsetHeight === 3;
            });
        }
        return ret;
    };
    tests["csstransitions"] = function() {
        return testPropsAll("transition");
    };
    tests["fontface"] = function() {
        var bool;
        injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function(node, rule) {
            var style = document.getElementById("smodernizr"), sheet = style.sheet || style.styleSheet, cssText = sheet ? sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || "" : "";
            bool = /src/i.test(cssText) && cssText.indexOf(rule.split(" ")[0]) === 0;
        });
        return bool;
    };
    tests["generatedcontent"] = function() {
        var bool;
        injectElementWithStyles([ "#", mod, "{font:0/0 a}#", mod, ':after{content:"', smile, '";visibility:hidden;font:3px/1 a}' ].join(""), function(node) {
            bool = node.offsetHeight >= 3;
        });
        return bool;
    };
    tests["video"] = function() {
        var elem = document.createElement("video"), bool = false;
        try {
            if (bool = !!elem.canPlayType) {
                bool = new Boolean(bool);
                bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, "");
                bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, "");
                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "");
            }
        } catch (e) {}
        return bool;
    };
    tests["audio"] = function() {
        var elem = document.createElement("audio"), bool = false;
        try {
            if (bool = !!elem.canPlayType) {
                bool = new Boolean(bool);
                bool.ogg = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, "");
                bool.mp3 = elem.canPlayType("audio/mpeg;").replace(/^no$/, "");
                bool.wav = elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/, "");
                bool.m4a = (elem.canPlayType("audio/x-m4a;") || elem.canPlayType("audio/aac;")).replace(/^no$/, "");
            }
        } catch (e) {}
        return bool;
    };
    tests["localstorage"] = function() {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    };
    tests["sessionstorage"] = function() {
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    };
    tests["webworkers"] = function() {
        return !!window.Worker;
    };
    tests["applicationcache"] = function() {
        return !!window.applicationCache;
    };
    tests["svg"] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, "svg").createSVGRect;
    };
    tests["inlinesvg"] = function() {
        var div = document.createElement("div");
        div.innerHTML = "<svg/>";
        return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    };
    tests["smil"] = function() {
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, "animate")));
    };
    tests["svgclippaths"] = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, "clipPath")));
    };
    function webforms() {
        Modernizr["input"] = function(props) {
            for (var i = 0, len = props.length; i < len; i++) {
                attrs[props[i]] = !!(props[i] in inputElem);
            }
            if (attrs.list) {
                attrs.list = !!(document.createElement("datalist") && window.HTMLDataListElement);
            }
            return attrs;
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "));
        Modernizr["inputtypes"] = function(props) {
            for (var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++) {
                inputElem.setAttribute("type", inputElemType = props[i]);
                bool = inputElem.type !== "text";
                if (bool) {
                    inputElem.value = smile;
                    inputElem.style.cssText = "position:absolute;visibility:hidden;";
                    if (/^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined) {
                        docElement.appendChild(inputElem);
                        defaultView = document.defaultView;
                        bool = defaultView.getComputedStyle && defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== "textfield" && inputElem.offsetHeight !== 0;
                        docElement.removeChild(inputElem);
                    } else if (/^(search|tel)$/.test(inputElemType)) {} else if (/^(url|email)$/.test(inputElemType)) {
                        bool = inputElem.checkValidity && inputElem.checkValidity() === false;
                    } else {
                        bool = inputElem.value != smile;
                    }
                }
                inputs[props[i]] = !!bool;
            }
            return inputs;
        }("search tel url email datetime date month week time datetime-local number range color".split(" "));
    }
    for (var feature in tests) {
        if (hasOwnProp(tests, feature)) {
            featureName = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();
            classes.push((Modernizr[featureName] ? "" : "no-") + featureName);
        }
    }
    Modernizr.input || webforms();
    Modernizr.addTest = function(feature, test) {
        if (typeof feature == "object") {
            for (var key in feature) {
                if (hasOwnProp(feature, key)) {
                    Modernizr.addTest(key, feature[key]);
                }
            }
        } else {
            feature = feature.toLowerCase();
            if (Modernizr[feature] !== undefined) {
                return Modernizr;
            }
            test = typeof test == "function" ? test() : test;
            if (typeof enableClasses !== "undefined" && enableClasses) {
                docElement.className += " " + (test ? "" : "no-") + feature;
            }
            Modernizr[feature] = test;
        }
        return Modernizr;
    };
    setCss("");
    modElem = inputElem = null;
    (function(window, document) {
        var version = "3.7.0";
        var options = window.html5 || {};
        var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;
        var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;
        var supportsHtml5Styles;
        var expando = "_html5shiv";
        var expanID = 0;
        var expandoData = {};
        var supportsUnknownElements;
        (function() {
            try {
                var a = document.createElement("a");
                a.innerHTML = "<xyz></xyz>";
                supportsHtml5Styles = "hidden" in a;
                supportsUnknownElements = a.childNodes.length == 1 || function() {
                    document.createElement("a");
                    var frag = document.createDocumentFragment();
                    return typeof frag.cloneNode == "undefined" || typeof frag.createDocumentFragment == "undefined" || typeof frag.createElement == "undefined";
                }();
            } catch (e) {
                supportsHtml5Styles = true;
                supportsUnknownElements = true;
            }
        })();
        function addStyleSheet(ownerDocument, cssText) {
            var p = ownerDocument.createElement("p"), parent = ownerDocument.getElementsByTagName("head")[0] || ownerDocument.documentElement;
            p.innerHTML = "x<style>" + cssText + "</style>";
            return parent.insertBefore(p.lastChild, parent.firstChild);
        }
        function getElements() {
            var elements = html5.elements;
            return typeof elements == "string" ? elements.split(" ") : elements;
        }
        function getExpandoData(ownerDocument) {
            var data = expandoData[ownerDocument[expando]];
            if (!data) {
                data = {};
                expanID++;
                ownerDocument[expando] = expanID;
                expandoData[expanID] = data;
            }
            return data;
        }
        function createElement(nodeName, ownerDocument, data) {
            if (!ownerDocument) {
                ownerDocument = document;
            }
            if (supportsUnknownElements) {
                return ownerDocument.createElement(nodeName);
            }
            if (!data) {
                data = getExpandoData(ownerDocument);
            }
            var node;
            if (data.cache[nodeName]) {
                node = data.cache[nodeName].cloneNode();
            } else if (saveClones.test(nodeName)) {
                node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
            } else {
                node = data.createElem(nodeName);
            }
            return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
        }
        function createDocumentFragment(ownerDocument, data) {
            if (!ownerDocument) {
                ownerDocument = document;
            }
            if (supportsUnknownElements) {
                return ownerDocument.createDocumentFragment();
            }
            data = data || getExpandoData(ownerDocument);
            var clone = data.frag.cloneNode(), i = 0, elems = getElements(), l = elems.length;
            for (;i < l; i++) {
                clone.createElement(elems[i]);
            }
            return clone;
        }
        function shivMethods(ownerDocument, data) {
            if (!data.cache) {
                data.cache = {};
                data.createElem = ownerDocument.createElement;
                data.createFrag = ownerDocument.createDocumentFragment;
                data.frag = data.createFrag();
            }
            ownerDocument.createElement = function(nodeName) {
                if (!html5.shivMethods) {
                    return data.createElem(nodeName);
                }
                return createElement(nodeName, ownerDocument, data);
            };
            ownerDocument.createDocumentFragment = Function("h,f", "return function(){" + "var n=f.cloneNode(),c=n.createElement;" + "h.shivMethods&&(" + getElements().join().replace(/[\w\-]+/g, function(nodeName) {
                data.createElem(nodeName);
                data.frag.createElement(nodeName);
                return 'c("' + nodeName + '")';
            }) + ");return n}")(html5, data.frag);
        }
        function shivDocument(ownerDocument) {
            if (!ownerDocument) {
                ownerDocument = document;
            }
            var data = getExpandoData(ownerDocument);
            if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
                data.hasCSS = !!addStyleSheet(ownerDocument, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}" + "mark{background:#FF0;color:#000}" + "template{display:none}");
            }
            if (!supportsUnknownElements) {
                shivMethods(ownerDocument, data);
            }
            return ownerDocument;
        }
        var html5 = {
            elements: options.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
            version: version,
            shivCSS: options.shivCSS !== false,
            supportsUnknownElements: supportsUnknownElements,
            shivMethods: options.shivMethods !== false,
            type: "default",
            shivDocument: shivDocument,
            createElement: createElement,
            createDocumentFragment: createDocumentFragment
        };
        window.html5 = html5;
        shivDocument(document);
    })(this, document);
    Modernizr._version = version;
    Modernizr._prefixes = prefixes;
    Modernizr._domPrefixes = domPrefixes;
    Modernizr._cssomPrefixes = cssomPrefixes;
    Modernizr.mq = testMediaQuery;
    Modernizr.hasEvent = isEventSupported;
    Modernizr.testProp = function(prop) {
        return testProps([ prop ]);
    };
    Modernizr.testAllProps = testPropsAll;
    Modernizr.testStyles = injectElementWithStyles;
    Modernizr.prefixed = function(prop, obj, elem) {
        if (!obj) {
            return testPropsAll(prop, "pfx");
        } else {
            return testPropsAll(prop, obj, elem);
        }
    };
    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (enableClasses ? " js " + classes.join(" ") : "");
    return Modernizr;
}(this, this.document);

(function(O, U, s) {
    "use strict";
    function t(b) {
        return function() {
            var a = arguments[0], c, a = "[" + (b ? b + ":" : "") + a + "] http://errors.angularjs.org/1.2.16/" + (b ? b + "/" : "") + a;
            for (c = 1; c < arguments.length; c++) a = a + (1 == c ? "?" : "&") + "p" + (c - 1) + "=" + encodeURIComponent("function" == typeof arguments[c] ? arguments[c].toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof arguments[c] ? "undefined" : "string" != typeof arguments[c] ? JSON.stringify(arguments[c]) : arguments[c]);
            return Error(a);
        };
    }
    function ab(b) {
        if (null == b || Ca(b)) return !1;
        var a = b.length;
        return 1 === b.nodeType && a ? !0 : w(b) || M(b) || 0 === a || "number" === typeof a && 0 < a && a - 1 in b;
    }
    function q(b, a, c) {
        var d;
        if (b) if (P(b)) for (d in b) "prototype" == d || ("length" == d || "name" == d || b.hasOwnProperty && !b.hasOwnProperty(d)) || a.call(c, b[d], d); else if (b.forEach && b.forEach !== q) b.forEach(a, c); else if (ab(b)) for (d = 0; d < b.length; d++) a.call(c, b[d], d); else for (d in b) b.hasOwnProperty(d) && a.call(c, b[d], d);
        return b;
    }
    function Qb(b) {
        var a = [], c;
        for (c in b) b.hasOwnProperty(c) && a.push(c);
        return a.sort();
    }
    function Sc(b, a, c) {
        for (var d = Qb(b), e = 0; e < d.length; e++) a.call(c, b[d[e]], d[e]);
        return d;
    }
    function Rb(b) {
        return function(a, c) {
            b(c, a);
        };
    }
    function bb() {
        for (var b = ka.length, a; b; ) {
            b--;
            a = ka[b].charCodeAt(0);
            if (57 == a) return ka[b] = "A", ka.join("");
            if (90 == a) ka[b] = "0"; else return ka[b] = String.fromCharCode(a + 1), ka.join("");
        }
        ka.unshift("0");
        return ka.join("");
    }
    function Sb(b, a) {
        a ? b.$$hashKey = a : delete b.$$hashKey;
    }
    function D(b) {
        var a = b.$$hashKey;
        q(arguments, function(a) {
            a !== b && q(a, function(a, c) {
                b[c] = a;
            });
        });
        Sb(b, a);
        return b;
    }
    function Y(b) {
        return parseInt(b, 10);
    }
    function Tb(b, a) {
        return D(new (D(function() {}, {
            prototype: b
        }))(), a);
    }
    function C() {}
    function Da(b) {
        return b;
    }
    function aa(b) {
        return function() {
            return b;
        };
    }
    function E(b) {
        return "undefined" === typeof b;
    }
    function B(b) {
        return "undefined" !== typeof b;
    }
    function X(b) {
        return null != b && "object" === typeof b;
    }
    function w(b) {
        return "string" === typeof b;
    }
    function vb(b) {
        return "number" === typeof b;
    }
    function Na(b) {
        return "[object Date]" === wa.call(b);
    }
    function M(b) {
        return "[object Array]" === wa.call(b);
    }
    function P(b) {
        return "function" === typeof b;
    }
    function cb(b) {
        return "[object RegExp]" === wa.call(b);
    }
    function Ca(b) {
        return b && b.document && b.location && b.alert && b.setInterval;
    }
    function Tc(b) {
        return !(!b || !(b.nodeName || b.prop && b.attr && b.find));
    }
    function Uc(b, a, c) {
        var d = [];
        q(b, function(b, g, f) {
            d.push(a.call(c, b, g, f));
        });
        return d;
    }
    function db(b, a) {
        if (b.indexOf) return b.indexOf(a);
        for (var c = 0; c < b.length; c++) if (a === b[c]) return c;
        return -1;
    }
    function Oa(b, a) {
        var c = db(b, a);
        0 <= c && b.splice(c, 1);
        return a;
    }
    function ba(b, a) {
        if (Ca(b) || b && b.$evalAsync && b.$watch) throw Pa("cpws");
        if (a) {
            if (b === a) throw Pa("cpi");
            if (M(b)) for (var c = a.length = 0; c < b.length; c++) a.push(ba(b[c])); else {
                c = a.$$hashKey;
                q(a, function(b, c) {
                    delete a[c];
                });
                for (var d in b) a[d] = ba(b[d]);
                Sb(a, c);
            }
        } else (a = b) && (M(b) ? a = ba(b, []) : Na(b) ? a = new Date(b.getTime()) : cb(b) ? a = RegExp(b.source) : X(b) && (a = ba(b, {})));
        return a;
    }
    function Ub(b, a) {
        a = a || {};
        for (var c in b) !b.hasOwnProperty(c) || "$" === c.charAt(0) && "$" === c.charAt(1) || (a[c] = b[c]);
        return a;
    }
    function xa(b, a) {
        if (b === a) return !0;
        if (null === b || null === a) return !1;
        if (b !== b && a !== a) return !0;
        var c = typeof b, d;
        if (c == typeof a && "object" == c) if (M(b)) {
            if (!M(a)) return !1;
            if ((c = b.length) == a.length) {
                for (d = 0; d < c; d++) if (!xa(b[d], a[d])) return !1;
                return !0;
            }
        } else {
            if (Na(b)) return Na(a) && b.getTime() == a.getTime();
            if (cb(b) && cb(a)) return b.toString() == a.toString();
            if (b && b.$evalAsync && b.$watch || a && a.$evalAsync && a.$watch || Ca(b) || Ca(a) || M(a)) return !1;
            c = {};
            for (d in b) if ("$" !== d.charAt(0) && !P(b[d])) {
                if (!xa(b[d], a[d])) return !1;
                c[d] = !0;
            }
            for (d in a) if (!c.hasOwnProperty(d) && "$" !== d.charAt(0) && a[d] !== s && !P(a[d])) return !1;
            return !0;
        }
        return !1;
    }
    function Vb() {
        return U.securityPolicy && U.securityPolicy.isActive || U.querySelector && !(!U.querySelector("[ng-csp]") && !U.querySelector("[data-ng-csp]"));
    }
    function eb(b, a) {
        var c = 2 < arguments.length ? ya.call(arguments, 2) : [];
        return !P(a) || a instanceof RegExp ? a : c.length ? function() {
            return arguments.length ? a.apply(b, c.concat(ya.call(arguments, 0))) : a.apply(b, c);
        } : function() {
            return arguments.length ? a.apply(b, arguments) : a.call(b);
        };
    }
    function Vc(b, a) {
        var c = a;
        "string" === typeof b && "$" === b.charAt(0) ? c = s : Ca(a) ? c = "$WINDOW" : a && U === a ? c = "$DOCUMENT" : a && (a.$evalAsync && a.$watch) && (c = "$SCOPE");
        return c;
    }
    function qa(b, a) {
        return "undefined" === typeof b ? s : JSON.stringify(b, Vc, a ? "  " : null);
    }
    function Wb(b) {
        return w(b) ? JSON.parse(b) : b;
    }
    function Qa(b) {
        "function" === typeof b ? b = !0 : b && 0 !== b.length ? (b = K("" + b), b = !("f" == b || "0" == b || "false" == b || "no" == b || "n" == b || "[]" == b)) : b = !1;
        return b;
    }
    function ha(b) {
        b = y(b).clone();
        try {
            b.empty();
        } catch (a) {}
        var c = y("<div>").append(b).html();
        try {
            return 3 === b[0].nodeType ? K(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(a, b) {
                return "<" + K(b);
            });
        } catch (d) {
            return K(c);
        }
    }
    function Xb(b) {
        try {
            return decodeURIComponent(b);
        } catch (a) {}
    }
    function Yb(b) {
        var a = {}, c, d;
        q((b || "").split("&"), function(b) {
            b && (c = b.split("="), d = Xb(c[0]), B(d) && (b = B(c[1]) ? Xb(c[1]) : !0, a[d] ? M(a[d]) ? a[d].push(b) : a[d] = [ a[d], b ] : a[d] = b));
        });
        return a;
    }
    function Zb(b) {
        var a = [];
        q(b, function(b, d) {
            M(b) ? q(b, function(b) {
                a.push(za(d, !0) + (!0 === b ? "" : "=" + za(b, !0)));
            }) : a.push(za(d, !0) + (!0 === b ? "" : "=" + za(b, !0)));
        });
        return a.length ? a.join("&") : "";
    }
    function wb(b) {
        return za(b, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
    }
    function za(b, a) {
        return encodeURIComponent(b).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, a ? "%20" : "+");
    }
    function Wc(b, a) {
        function c(a) {
            a && d.push(a);
        }
        var d = [ b ], e, g, f = [ "ng:app", "ng-app", "x-ng-app", "data-ng-app" ], h = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
        q(f, function(a) {
            f[a] = !0;
            c(U.getElementById(a));
            a = a.replace(":", "\\:");
            b.querySelectorAll && (q(b.querySelectorAll("." + a), c), q(b.querySelectorAll("." + a + "\\:"), c), 
            q(b.querySelectorAll("[" + a + "]"), c));
        });
        q(d, function(a) {
            if (!e) {
                var b = h.exec(" " + a.className + " ");
                b ? (e = a, g = (b[2] || "").replace(/\s+/g, ",")) : q(a.attributes, function(b) {
                    !e && f[b.name] && (e = a, g = b.value);
                });
            }
        });
        e && a(e, g ? [ g ] : []);
    }
    function $b(b, a) {
        var c = function() {
            b = y(b);
            if (b.injector()) {
                var c = b[0] === U ? "document" : ha(b);
                throw Pa("btstrpd", c);
            }
            a = a || [];
            a.unshift([ "$provide", function(a) {
                a.value("$rootElement", b);
            } ]);
            a.unshift("ng");
            c = ac(a);
            c.invoke([ "$rootScope", "$rootElement", "$compile", "$injector", "$animate", function(a, b, c, d, e) {
                a.$apply(function() {
                    b.data("$injector", d);
                    c(b)(a);
                });
            } ]);
            return c;
        }, d = /^NG_DEFER_BOOTSTRAP!/;
        if (O && !d.test(O.name)) return c();
        O.name = O.name.replace(d, "");
        Ea.resumeBootstrap = function(b) {
            q(b, function(b) {
                a.push(b);
            });
            c();
        };
    }
    function fb(b, a) {
        a = a || "_";
        return b.replace(Xc, function(b, d) {
            return (d ? a : "") + b.toLowerCase();
        });
    }
    function xb(b, a, c) {
        if (!b) throw Pa("areq", a || "?", c || "required");
        return b;
    }
    function Ra(b, a, c) {
        c && M(b) && (b = b[b.length - 1]);
        xb(P(b), a, "not a function, got " + (b && "object" == typeof b ? b.constructor.name || "Object" : typeof b));
        return b;
    }
    function Aa(b, a) {
        if ("hasOwnProperty" === b) throw Pa("badname", a);
    }
    function bc(b, a, c) {
        if (!a) return b;
        a = a.split(".");
        for (var d, e = b, g = a.length, f = 0; f < g; f++) d = a[f], b && (b = (e = b)[d]);
        return !c && P(b) ? eb(e, b) : b;
    }
    function yb(b) {
        var a = b[0];
        b = b[b.length - 1];
        if (a === b) return y(a);
        var c = [ a ];
        do {
            a = a.nextSibling;
            if (!a) break;
            c.push(a);
        } while (a !== b);
        return y(c);
    }
    function Yc(b) {
        var a = t("$injector"), c = t("ng");
        b = b.angular || (b.angular = {});
        b.$$minErr = b.$$minErr || t;
        return b.module || (b.module = function() {
            var b = {};
            return function(e, g, f) {
                if ("hasOwnProperty" === e) throw c("badname", "module");
                g && b.hasOwnProperty(e) && (b[e] = null);
                return b[e] || (b[e] = function() {
                    function b(a, d, e) {
                        return function() {
                            c[e || "push"]([ a, d, arguments ]);
                            return n;
                        };
                    }
                    if (!g) throw a("nomod", e);
                    var c = [], d = [], m = b("$injector", "invoke"), n = {
                        _invokeQueue: c,
                        _runBlocks: d,
                        requires: g,
                        name: e,
                        provider: b("$provide", "provider"),
                        factory: b("$provide", "factory"),
                        service: b("$provide", "service"),
                        value: b("$provide", "value"),
                        constant: b("$provide", "constant", "unshift"),
                        animation: b("$animateProvider", "register"),
                        filter: b("$filterProvider", "register"),
                        controller: b("$controllerProvider", "register"),
                        directive: b("$compileProvider", "directive"),
                        config: m,
                        run: function(a) {
                            d.push(a);
                            return this;
                        }
                    };
                    f && m(f);
                    return n;
                }());
            };
        }());
    }
    function Zc(b) {
        D(b, {
            bootstrap: $b,
            copy: ba,
            extend: D,
            equals: xa,
            element: y,
            forEach: q,
            injector: ac,
            noop: C,
            bind: eb,
            toJson: qa,
            fromJson: Wb,
            identity: Da,
            isUndefined: E,
            isDefined: B,
            isString: w,
            isFunction: P,
            isObject: X,
            isNumber: vb,
            isElement: Tc,
            isArray: M,
            version: $c,
            isDate: Na,
            lowercase: K,
            uppercase: Fa,
            callbacks: {
                counter: 0
            },
            $$minErr: t,
            $$csp: Vb
        });
        Sa = Yc(O);
        try {
            Sa("ngLocale");
        } catch (a) {
            Sa("ngLocale", []).provider("$locale", ad);
        }
        Sa("ng", [ "ngLocale" ], [ "$provide", function(a) {
            a.provider({
                $$sanitizeUri: bd
            });
            a.provider("$compile", cc).directive({
                a: cd,
                input: dc,
                textarea: dc,
                form: dd,
                script: ed,
                select: fd,
                style: gd,
                option: hd,
                ngBind: id,
                ngBindHtml: jd,
                ngBindTemplate: kd,
                ngClass: ld,
                ngClassEven: md,
                ngClassOdd: nd,
                ngCloak: od,
                ngController: pd,
                ngForm: qd,
                ngHide: rd,
                ngIf: sd,
                ngInclude: td,
                ngInit: ud,
                ngNonBindable: vd,
                ngPluralize: wd,
                ngRepeat: xd,
                ngShow: yd,
                ngStyle: zd,
                ngSwitch: Ad,
                ngSwitchWhen: Bd,
                ngSwitchDefault: Cd,
                ngOptions: Dd,
                ngTransclude: Ed,
                ngModel: Fd,
                ngList: Gd,
                ngChange: Hd,
                required: ec,
                ngRequired: ec,
                ngValue: Id
            }).directive({
                ngInclude: Jd
            }).directive(zb).directive(fc);
            a.provider({
                $anchorScroll: Kd,
                $animate: Ld,
                $browser: Md,
                $cacheFactory: Nd,
                $controller: Od,
                $document: Pd,
                $exceptionHandler: Qd,
                $filter: gc,
                $interpolate: Rd,
                $interval: Sd,
                $http: Td,
                $httpBackend: Ud,
                $location: Vd,
                $log: Wd,
                $parse: Xd,
                $rootScope: Yd,
                $q: Zd,
                $sce: $d,
                $sceDelegate: ae,
                $sniffer: be,
                $templateCache: ce,
                $timeout: de,
                $window: ee,
                $$rAF: fe,
                $$asyncCallback: ge
            });
        } ]);
    }
    function Ta(b) {
        return b.replace(he, function(a, b, d, e) {
            return e ? d.toUpperCase() : d;
        }).replace(ie, "Moz$1");
    }
    function Ab(b, a, c, d) {
        function e(b) {
            var e = c && b ? [ this.filter(b) ] : [ this ], l = a, k, m, n, p, r, z;
            if (!d || null != b) for (;e.length; ) for (k = e.shift(), m = 0, n = k.length; m < n; m++) for (p = y(k[m]), 
            l ? p.triggerHandler("$destroy") : l = !l, r = 0, p = (z = p.children()).length; r < p; r++) e.push(Ga(z[r]));
            return g.apply(this, arguments);
        }
        var g = Ga.fn[b], g = g.$original || g;
        e.$original = g;
        Ga.fn[b] = e;
    }
    function N(b) {
        if (b instanceof N) return b;
        w(b) && (b = ca(b));
        if (!(this instanceof N)) {
            if (w(b) && "<" != b.charAt(0)) throw Bb("nosel");
            return new N(b);
        }
        if (w(b)) {
            var a = b;
            b = U;
            var c;
            if (c = je.exec(a)) b = [ b.createElement(c[1]) ]; else {
                var d = b, e;
                b = d.createDocumentFragment();
                c = [];
                if (Cb.test(a)) {
                    d = b.appendChild(d.createElement("div"));
                    e = (ke.exec(a) || [ "", "" ])[1].toLowerCase();
                    e = ea[e] || ea._default;
                    d.innerHTML = "<div>&#160;</div>" + e[1] + a.replace(le, "<$1></$2>") + e[2];
                    d.removeChild(d.firstChild);
                    for (a = e[0]; a--; ) d = d.lastChild;
                    a = 0;
                    for (e = d.childNodes.length; a < e; ++a) c.push(d.childNodes[a]);
                    d = b.firstChild;
                    d.textContent = "";
                } else c.push(d.createTextNode(a));
                b.textContent = "";
                b.innerHTML = "";
                b = c;
            }
            Db(this, b);
            y(U.createDocumentFragment()).append(this);
        } else Db(this, b);
    }
    function Eb(b) {
        return b.cloneNode(!0);
    }
    function Ha(b) {
        hc(b);
        var a = 0;
        for (b = b.childNodes || []; a < b.length; a++) Ha(b[a]);
    }
    function ic(b, a, c, d) {
        if (B(d)) throw Bb("offargs");
        var e = la(b, "events");
        la(b, "handle") && (E(a) ? q(e, function(a, c) {
            Fb(b, c, a);
            delete e[c];
        }) : q(a.split(" "), function(a) {
            E(c) ? (Fb(b, a, e[a]), delete e[a]) : Oa(e[a] || [], c);
        }));
    }
    function hc(b, a) {
        var c = b[gb], d = Ua[c];
        d && (a ? delete Ua[c].data[a] : (d.handle && (d.events.$destroy && d.handle({}, "$destroy"), 
        ic(b)), delete Ua[c], b[gb] = s));
    }
    function la(b, a, c) {
        var d = b[gb], d = Ua[d || -1];
        if (B(c)) d || (b[gb] = d = ++me, d = Ua[d] = {}), d[a] = c; else return d && d[a];
    }
    function jc(b, a, c) {
        var d = la(b, "data"), e = B(c), g = !e && B(a), f = g && !X(a);
        d || f || la(b, "data", d = {});
        if (e) d[a] = c; else if (g) {
            if (f) return d && d[a];
            D(d, a);
        } else return d;
    }
    function Gb(b, a) {
        return b.getAttribute ? -1 < (" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + a + " ") : !1;
    }
    function hb(b, a) {
        a && b.setAttribute && q(a.split(" "), function(a) {
            b.setAttribute("class", ca((" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + ca(a) + " ", " ")));
        });
    }
    function ib(b, a) {
        if (a && b.setAttribute) {
            var c = (" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            q(a.split(" "), function(a) {
                a = ca(a);
                -1 === c.indexOf(" " + a + " ") && (c += a + " ");
            });
            b.setAttribute("class", ca(c));
        }
    }
    function Db(b, a) {
        if (a) {
            a = a.nodeName || !B(a.length) || Ca(a) ? [ a ] : a;
            for (var c = 0; c < a.length; c++) b.push(a[c]);
        }
    }
    function kc(b, a) {
        return jb(b, "$" + (a || "ngController") + "Controller");
    }
    function jb(b, a, c) {
        b = y(b);
        9 == b[0].nodeType && (b = b.find("html"));
        for (a = M(a) ? a : [ a ]; b.length; ) {
            for (var d = b[0], e = 0, g = a.length; e < g; e++) if ((c = b.data(a[e])) !== s) return c;
            b = y(d.parentNode || 11 === d.nodeType && d.host);
        }
    }
    function lc(b) {
        for (var a = 0, c = b.childNodes; a < c.length; a++) Ha(c[a]);
        for (;b.firstChild; ) b.removeChild(b.firstChild);
    }
    function mc(b, a) {
        var c = kb[a.toLowerCase()];
        return c && nc[b.nodeName] && c;
    }
    function ne(b, a) {
        var c = function(c, e) {
            c.preventDefault || (c.preventDefault = function() {
                c.returnValue = !1;
            });
            c.stopPropagation || (c.stopPropagation = function() {
                c.cancelBubble = !0;
            });
            c.target || (c.target = c.srcElement || U);
            if (E(c.defaultPrevented)) {
                var g = c.preventDefault;
                c.preventDefault = function() {
                    c.defaultPrevented = !0;
                    g.call(c);
                };
                c.defaultPrevented = !1;
            }
            c.isDefaultPrevented = function() {
                return c.defaultPrevented || !1 === c.returnValue;
            };
            var f = Ub(a[e || c.type] || []);
            q(f, function(a) {
                a.call(b, c);
            });
            8 >= S ? (c.preventDefault = null, c.stopPropagation = null, c.isDefaultPrevented = null) : (delete c.preventDefault, 
            delete c.stopPropagation, delete c.isDefaultPrevented);
        };
        c.elem = b;
        return c;
    }
    function Ia(b) {
        var a = typeof b, c;
        "object" == a && null !== b ? "function" == typeof (c = b.$$hashKey) ? c = b.$$hashKey() : c === s && (c = b.$$hashKey = bb()) : c = b;
        return a + ":" + c;
    }
    function Va(b) {
        q(b, this.put, this);
    }
    function oc(b) {
        var a, c;
        "function" == typeof b ? (a = b.$inject) || (a = [], b.length && (c = b.toString().replace(oe, ""), 
        c = c.match(pe), q(c[1].split(qe), function(b) {
            b.replace(re, function(b, c, d) {
                a.push(d);
            });
        })), b.$inject = a) : M(b) ? (c = b.length - 1, Ra(b[c], "fn"), a = b.slice(0, c)) : Ra(b, "fn", !0);
        return a;
    }
    function ac(b) {
        function a(a) {
            return function(b, c) {
                if (X(b)) q(b, Rb(a)); else return a(b, c);
            };
        }
        function c(a, b) {
            Aa(a, "service");
            if (P(b) || M(b)) b = n.instantiate(b);
            if (!b.$get) throw Wa("pget", a);
            return m[a + h] = b;
        }
        function d(a, b) {
            return c(a, {
                $get: b
            });
        }
        function e(a) {
            var b = [], c, d, g, h;
            q(a, function(a) {
                if (!k.get(a)) {
                    k.put(a, !0);
                    try {
                        if (w(a)) for (c = Sa(a), b = b.concat(e(c.requires)).concat(c._runBlocks), d = c._invokeQueue, 
                        g = 0, h = d.length; g < h; g++) {
                            var f = d[g], l = n.get(f[0]);
                            l[f[1]].apply(l, f[2]);
                        } else P(a) ? b.push(n.invoke(a)) : M(a) ? b.push(n.invoke(a)) : Ra(a, "module");
                    } catch (m) {
                        throw M(a) && (a = a[a.length - 1]), m.message && (m.stack && -1 == m.stack.indexOf(m.message)) && (m = m.message + "\n" + m.stack), 
                        Wa("modulerr", a, m.stack || m.message || m);
                    }
                }
            });
            return b;
        }
        function g(a, b) {
            function c(d) {
                if (a.hasOwnProperty(d)) {
                    if (a[d] === f) throw Wa("cdep", l.join(" <- "));
                    return a[d];
                }
                try {
                    return l.unshift(d), a[d] = f, a[d] = b(d);
                } catch (e) {
                    throw a[d] === f && delete a[d], e;
                } finally {
                    l.shift();
                }
            }
            function d(a, b, e) {
                var g = [], h = oc(a), f, l, k;
                l = 0;
                for (f = h.length; l < f; l++) {
                    k = h[l];
                    if ("string" !== typeof k) throw Wa("itkn", k);
                    g.push(e && e.hasOwnProperty(k) ? e[k] : c(k));
                }
                a.$inject || (a = a[f]);
                return a.apply(b, g);
            }
            return {
                invoke: d,
                instantiate: function(a, b) {
                    var c = function() {}, e;
                    c.prototype = (M(a) ? a[a.length - 1] : a).prototype;
                    c = new c();
                    e = d(a, c, b);
                    return X(e) || P(e) ? e : c;
                },
                get: c,
                annotate: oc,
                has: function(b) {
                    return m.hasOwnProperty(b + h) || a.hasOwnProperty(b);
                }
            };
        }
        var f = {}, h = "Provider", l = [], k = new Va(), m = {
            $provide: {
                provider: a(c),
                factory: a(d),
                service: a(function(a, b) {
                    return d(a, [ "$injector", function(a) {
                        return a.instantiate(b);
                    } ]);
                }),
                value: a(function(a, b) {
                    return d(a, aa(b));
                }),
                constant: a(function(a, b) {
                    Aa(a, "constant");
                    m[a] = b;
                    p[a] = b;
                }),
                decorator: function(a, b) {
                    var c = n.get(a + h), d = c.$get;
                    c.$get = function() {
                        var a = r.invoke(d, c);
                        return r.invoke(b, null, {
                            $delegate: a
                        });
                    };
                }
            }
        }, n = m.$injector = g(m, function() {
            throw Wa("unpr", l.join(" <- "));
        }), p = {}, r = p.$injector = g(p, function(a) {
            a = n.get(a + h);
            return r.invoke(a.$get, a);
        });
        q(e(b), function(a) {
            r.invoke(a || C);
        });
        return r;
    }
    function Kd() {
        var b = !0;
        this.disableAutoScrolling = function() {
            b = !1;
        };
        this.$get = [ "$window", "$location", "$rootScope", function(a, c, d) {
            function e(a) {
                var b = null;
                q(a, function(a) {
                    b || "a" !== K(a.nodeName) || (b = a);
                });
                return b;
            }
            function g() {
                var b = c.hash(), d;
                b ? (d = f.getElementById(b)) ? d.scrollIntoView() : (d = e(f.getElementsByName(b))) ? d.scrollIntoView() : "top" === b && a.scrollTo(0, 0) : a.scrollTo(0, 0);
            }
            var f = a.document;
            b && d.$watch(function() {
                return c.hash();
            }, function() {
                d.$evalAsync(g);
            });
            return g;
        } ];
    }
    function ge() {
        this.$get = [ "$$rAF", "$timeout", function(b, a) {
            return b.supported ? function(a) {
                return b(a);
            } : function(b) {
                return a(b, 0, !1);
            };
        } ];
    }
    function se(b, a, c, d) {
        function e(a) {
            try {
                a.apply(null, ya.call(arguments, 1));
            } finally {
                if (z--, 0 === z) for (;u.length; ) try {
                    u.pop()();
                } catch (b) {
                    c.error(b);
                }
            }
        }
        function g(a, b) {
            (function T() {
                q(F, function(a) {
                    a();
                });
                v = b(T, a);
            })();
        }
        function f() {
            x = null;
            J != h.url() && (J = h.url(), q(ma, function(a) {
                a(h.url());
            }));
        }
        var h = this, l = a[0], k = b.location, m = b.history, n = b.setTimeout, p = b.clearTimeout, r = {};
        h.isMock = !1;
        var z = 0, u = [];
        h.$$completeOutstandingRequest = e;
        h.$$incOutstandingRequestCount = function() {
            z++;
        };
        h.notifyWhenNoOutstandingRequests = function(a) {
            q(F, function(a) {
                a();
            });
            0 === z ? a() : u.push(a);
        };
        var F = [], v;
        h.addPollFn = function(a) {
            E(v) && g(100, n);
            F.push(a);
            return a;
        };
        var J = k.href, A = a.find("base"), x = null;
        h.url = function(a, c) {
            k !== b.location && (k = b.location);
            m !== b.history && (m = b.history);
            if (a) {
                if (J != a) return J = a, d.history ? c ? m.replaceState(null, "", a) : (m.pushState(null, "", a), 
                A.attr("href", A.attr("href"))) : (x = a, c ? k.replace(a) : k.href = a), h;
            } else return x || k.href.replace(/%27/g, "'");
        };
        var ma = [], L = !1;
        h.onUrlChange = function(a) {
            if (!L) {
                if (d.history) y(b).on("popstate", f);
                if (d.hashchange) y(b).on("hashchange", f); else h.addPollFn(f);
                L = !0;
            }
            ma.push(a);
            return a;
        };
        h.baseHref = function() {
            var a = A.attr("href");
            return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : "";
        };
        var Q = {}, da = "", H = h.baseHref();
        h.cookies = function(a, b) {
            var d, e, g, h;
            if (a) b === s ? l.cookie = escape(a) + "=;path=" + H + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : w(b) && (d = (l.cookie = escape(a) + "=" + escape(b) + ";path=" + H).length + 1, 
            4096 < d && c.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + d + " > 4096 bytes)!")); else {
                if (l.cookie !== da) for (da = l.cookie, d = da.split("; "), Q = {}, g = 0; g < d.length; g++) e = d[g], 
                h = e.indexOf("="), 0 < h && (a = unescape(e.substring(0, h)), Q[a] === s && (Q[a] = unescape(e.substring(h + 1))));
                return Q;
            }
        };
        h.defer = function(a, b) {
            var c;
            z++;
            c = n(function() {
                delete r[c];
                e(a);
            }, b || 0);
            r[c] = !0;
            return c;
        };
        h.defer.cancel = function(a) {
            return r[a] ? (delete r[a], p(a), e(C), !0) : !1;
        };
    }
    function Md() {
        this.$get = [ "$window", "$log", "$sniffer", "$document", function(b, a, c, d) {
            return new se(b, d, a, c);
        } ];
    }
    function Nd() {
        this.$get = function() {
            function b(b, d) {
                function e(a) {
                    a != n && (p ? p == a && (p = a.n) : p = a, g(a.n, a.p), g(a, n), n = a, n.n = null);
                }
                function g(a, b) {
                    a != b && (a && (a.p = b), b && (b.n = a));
                }
                if (b in a) throw t("$cacheFactory")("iid", b);
                var f = 0, h = D({}, d, {
                    id: b
                }), l = {}, k = d && d.capacity || Number.MAX_VALUE, m = {}, n = null, p = null;
                return a[b] = {
                    put: function(a, b) {
                        if (k < Number.MAX_VALUE) {
                            var c = m[a] || (m[a] = {
                                key: a
                            });
                            e(c);
                        }
                        if (!E(b)) return a in l || f++, l[a] = b, f > k && this.remove(p.key), b;
                    },
                    get: function(a) {
                        if (k < Number.MAX_VALUE) {
                            var b = m[a];
                            if (!b) return;
                            e(b);
                        }
                        return l[a];
                    },
                    remove: function(a) {
                        if (k < Number.MAX_VALUE) {
                            var b = m[a];
                            if (!b) return;
                            b == n && (n = b.p);
                            b == p && (p = b.n);
                            g(b.n, b.p);
                            delete m[a];
                        }
                        delete l[a];
                        f--;
                    },
                    removeAll: function() {
                        l = {};
                        f = 0;
                        m = {};
                        n = p = null;
                    },
                    destroy: function() {
                        m = h = l = null;
                        delete a[b];
                    },
                    info: function() {
                        return D({}, h, {
                            size: f
                        });
                    }
                };
            }
            var a = {};
            b.info = function() {
                var b = {};
                q(a, function(a, e) {
                    b[e] = a.info();
                });
                return b;
            };
            b.get = function(b) {
                return a[b];
            };
            return b;
        };
    }
    function ce() {
        this.$get = [ "$cacheFactory", function(b) {
            return b("templates");
        } ];
    }
    function cc(b, a) {
        var c = {}, d = "Directive", e = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/, g = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/, f = /^(on[a-z]+|formaction)$/;
        this.directive = function l(a, e) {
            Aa(a, "directive");
            w(a) ? (xb(e, "directiveFactory"), c.hasOwnProperty(a) || (c[a] = [], b.factory(a + d, [ "$injector", "$exceptionHandler", function(b, d) {
                var e = [];
                q(c[a], function(c, g) {
                    try {
                        var f = b.invoke(c);
                        P(f) ? f = {
                            compile: aa(f)
                        } : !f.compile && f.link && (f.compile = aa(f.link));
                        f.priority = f.priority || 0;
                        f.index = g;
                        f.name = f.name || a;
                        f.require = f.require || f.controller && f.name;
                        f.restrict = f.restrict || "A";
                        e.push(f);
                    } catch (l) {
                        d(l);
                    }
                });
                return e;
            } ])), c[a].push(e)) : q(a, Rb(l));
            return this;
        };
        this.aHrefSanitizationWhitelist = function(b) {
            return B(b) ? (a.aHrefSanitizationWhitelist(b), this) : a.aHrefSanitizationWhitelist();
        };
        this.imgSrcSanitizationWhitelist = function(b) {
            return B(b) ? (a.imgSrcSanitizationWhitelist(b), this) : a.imgSrcSanitizationWhitelist();
        };
        this.$get = [ "$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function(a, b, m, n, p, r, z, u, F, v, J, A) {
            function x(a, b, c, d, e) {
                a instanceof y || (a = y(a));
                q(a, function(b, c) {
                    3 == b.nodeType && b.nodeValue.match(/\S+/) && (a[c] = y(b).wrap("<span></span>").parent()[0]);
                });
                var g = L(a, b, a, c, d, e);
                ma(a, "ng-scope");
                return function(b, c, d) {
                    xb(b, "scope");
                    var e = c ? Ja.clone.call(a) : a;
                    q(d, function(a, b) {
                        e.data("$" + b + "Controller", a);
                    });
                    d = 0;
                    for (var f = e.length; d < f; d++) {
                        var l = e[d].nodeType;
                        1 !== l && 9 !== l || e.eq(d).data("$scope", b);
                    }
                    c && c(e, b);
                    g && g(b, e, e);
                    return e;
                };
            }
            function ma(a, b) {
                try {
                    a.addClass(b);
                } catch (c) {}
            }
            function L(a, b, c, d, e, g) {
                function f(a, c, d, e) {
                    var g, k, m, r, n, p, z;
                    g = c.length;
                    var I = Array(g);
                    for (n = 0; n < g; n++) I[n] = c[n];
                    z = n = 0;
                    for (p = l.length; n < p; z++) k = I[z], c = l[n++], g = l[n++], m = y(k), c ? (c.scope ? (r = a.$new(), 
                    m.data("$scope", r)) : r = a, (m = c.transclude) || !e && b ? c(g, r, k, d, Q(a, m || b)) : c(g, r, k, d, e)) : g && g(a, k.childNodes, s, e);
                }
                for (var l = [], k, m, r, n, p = 0; p < a.length; p++) k = new Hb(), m = da(a[p], [], k, 0 === p ? d : s, e), 
                (g = m.length ? ia(m, a[p], k, b, c, null, [], [], g) : null) && g.scope && ma(y(a[p]), "ng-scope"), 
                k = g && g.terminal || !(r = a[p].childNodes) || !r.length ? null : L(r, g ? g.transclude : b), 
                l.push(g, k), n = n || g || k, g = null;
                return n ? f : null;
            }
            function Q(a, b) {
                return function(c, d, e) {
                    var g = !1;
                    c || (c = a.$new(), g = c.$$transcluded = !0);
                    d = b(c, d, e);
                    if (g) d.on("$destroy", eb(c, c.$destroy));
                    return d;
                };
            }
            function da(a, b, c, d, f) {
                var k = c.$attr, l;
                switch (a.nodeType) {
                  case 1:
                    T(b, na(Ka(a).toLowerCase()), "E", d, f);
                    var m, r, n;
                    l = a.attributes;
                    for (var p = 0, z = l && l.length; p < z; p++) {
                        var u = !1, F = !1;
                        m = l[p];
                        if (!S || 8 <= S || m.specified) {
                            r = m.name;
                            n = na(r);
                            W.test(n) && (r = fb(n.substr(6), "-"));
                            var J = n.replace(/(Start|End)$/, "");
                            n === J + "Start" && (u = r, F = r.substr(0, r.length - 5) + "end", r = r.substr(0, r.length - 6));
                            n = na(r.toLowerCase());
                            k[n] = r;
                            c[n] = m = ca(m.value);
                            mc(a, n) && (c[n] = !0);
                            N(a, b, m, n);
                            T(b, n, "A", d, f, u, F);
                        }
                    }
                    a = a.className;
                    if (w(a) && "" !== a) for (;l = g.exec(a); ) n = na(l[2]), T(b, n, "C", d, f) && (c[n] = ca(l[3])), 
                    a = a.substr(l.index + l[0].length);
                    break;

                  case 3:
                    t(b, a.nodeValue);
                    break;

                  case 8:
                    try {
                        if (l = e.exec(a.nodeValue)) n = na(l[1]), T(b, n, "M", d, f) && (c[n] = ca(l[2]));
                    } catch (x) {}
                }
                b.sort(E);
                return b;
            }
            function H(a, b, c) {
                var d = [], e = 0;
                if (b && a.hasAttribute && a.hasAttribute(b)) {
                    do {
                        if (!a) throw ja("uterdir", b, c);
                        1 == a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--);
                        d.push(a);
                        a = a.nextSibling;
                    } while (0 < e);
                } else d.push(a);
                return y(d);
            }
            function R(a, b, c) {
                return function(d, e, g, f, l) {
                    e = H(e[0], b, c);
                    return a(d, e, g, f, l);
                };
            }
            function ia(a, c, d, e, g, f, l, n, p) {
                function u(a, b, c, d) {
                    if (a) {
                        c && (a = R(a, c, d));
                        a.require = G.require;
                        if (Q === G || G.$$isolateScope) a = qc(a, {
                            isolateScope: !0
                        });
                        l.push(a);
                    }
                    if (b) {
                        c && (b = R(b, c, d));
                        b.require = G.require;
                        if (Q === G || G.$$isolateScope) b = qc(b, {
                            isolateScope: !0
                        });
                        n.push(b);
                    }
                }
                function F(a, b, c) {
                    var d, e = "data", g = !1;
                    if (w(a)) {
                        for (;"^" == (d = a.charAt(0)) || "?" == d; ) a = a.substr(1), "^" == d && (e = "inheritedData"), 
                        g = g || "?" == d;
                        d = null;
                        c && "data" === e && (d = c[a]);
                        d = d || b[e]("$" + a + "Controller");
                        if (!d && !g) throw ja("ctreq", a, t);
                    } else M(a) && (d = [], q(a, function(a) {
                        d.push(F(a, b, c));
                    }));
                    return d;
                }
                function J(a, e, g, f, p) {
                    function u(a, b) {
                        var c;
                        2 > arguments.length && (b = a, a = s);
                        D && (c = lb);
                        return p(a, b, c);
                    }
                    var I, x, v, A, R, H, lb = {}, da;
                    I = c === g ? d : Ub(d, new Hb(y(g), d.$attr));
                    x = I.$$element;
                    if (Q) {
                        var T = /^\s*([@=&])(\??)\s*(\w*)\s*$/;
                        f = y(g);
                        H = e.$new(!0);
                        ia && ia === Q.$$originalDirective ? f.data("$isolateScope", H) : f.data("$isolateScopeNoTemplate", H);
                        ma(f, "ng-isolate-scope");
                        q(Q.scope, function(a, c) {
                            var d = a.match(T) || [], g = d[3] || c, f = "?" == d[2], d = d[1], l, m, n, p;
                            H.$$isolateBindings[c] = d + g;
                            switch (d) {
                              case "@":
                                I.$observe(g, function(a) {
                                    H[c] = a;
                                });
                                I.$$observers[g].$$scope = e;
                                I[g] && (H[c] = b(I[g])(e));
                                break;

                              case "=":
                                if (f && !I[g]) break;
                                m = r(I[g]);
                                p = m.literal ? xa : function(a, b) {
                                    return a === b;
                                };
                                n = m.assign || function() {
                                    l = H[c] = m(e);
                                    throw ja("nonassign", I[g], Q.name);
                                };
                                l = H[c] = m(e);
                                H.$watch(function() {
                                    var a = m(e);
                                    p(a, H[c]) || (p(a, l) ? n(e, a = H[c]) : H[c] = a);
                                    return l = a;
                                }, null, m.literal);
                                break;

                              case "&":
                                m = r(I[g]);
                                H[c] = function(a) {
                                    return m(e, a);
                                };
                                break;

                              default:
                                throw ja("iscp", Q.name, c, a);
                            }
                        });
                    }
                    da = p && u;
                    L && q(L, function(a) {
                        var b = {
                            $scope: a === Q || a.$$isolateScope ? H : e,
                            $element: x,
                            $attrs: I,
                            $transclude: da
                        }, c;
                        R = a.controller;
                        "@" == R && (R = I[a.name]);
                        c = z(R, b);
                        lb[a.name] = c;
                        D || x.data("$" + a.name + "Controller", c);
                        a.controllerAs && (b.$scope[a.controllerAs] = c);
                    });
                    f = 0;
                    for (v = l.length; f < v; f++) try {
                        A = l[f], A(A.isolateScope ? H : e, x, I, A.require && F(A.require, x, lb), da);
                    } catch (G) {
                        m(G, ha(x));
                    }
                    f = e;
                    Q && (Q.template || null === Q.templateUrl) && (f = H);
                    a && a(f, g.childNodes, s, p);
                    for (f = n.length - 1; 0 <= f; f--) try {
                        A = n[f], A(A.isolateScope ? H : e, x, I, A.require && F(A.require, x, lb), da);
                    } catch (B) {
                        m(B, ha(x));
                    }
                }
                p = p || {};
                for (var v = -Number.MAX_VALUE, A, L = p.controllerDirectives, Q = p.newIsolateScopeDirective, ia = p.templateDirective, T = p.nonTlbTranscludeDirective, E = !1, D = p.hasElementTranscludeDirective, Z = d.$$element = y(c), G, t, V, Xa = e, O, N = 0, S = a.length; N < S; N++) {
                    G = a[N];
                    var ra = G.$$start, W = G.$$end;
                    ra && (Z = H(c, ra, W));
                    V = s;
                    if (v > G.priority) break;
                    if (V = G.scope) A = A || G, G.templateUrl || (K("new/isolated scope", Q, G, Z), 
                    X(V) && (Q = G));
                    t = G.name;
                    !G.templateUrl && G.controller && (V = G.controller, L = L || {}, K("'" + t + "' controller", L[t], G, Z), 
                    L[t] = G);
                    if (V = G.transclude) E = !0, G.$$tlb || (K("transclusion", T, G, Z), T = G), "element" == V ? (D = !0, 
                    v = G.priority, V = H(c, ra, W), Z = d.$$element = y(U.createComment(" " + t + ": " + d[t] + " ")), 
                    c = Z[0], mb(g, y(ya.call(V, 0)), c), Xa = x(V, e, v, f && f.name, {
                        nonTlbTranscludeDirective: T
                    })) : (V = y(Eb(c)).contents(), Z.empty(), Xa = x(V, e));
                    if (G.template) if (K("template", ia, G, Z), ia = G, V = P(G.template) ? G.template(Z, d) : G.template, 
                    V = Y(V), G.replace) {
                        f = G;
                        V = Cb.test(V) ? y(V) : [];
                        c = V[0];
                        if (1 != V.length || 1 !== c.nodeType) throw ja("tplrt", t, "");
                        mb(g, Z, c);
                        S = {
                            $attr: {}
                        };
                        V = da(c, [], S);
                        var $ = a.splice(N + 1, a.length - (N + 1));
                        Q && pc(V);
                        a = a.concat(V).concat($);
                        B(d, S);
                        S = a.length;
                    } else Z.html(V);
                    if (G.templateUrl) K("template", ia, G, Z), ia = G, G.replace && (f = G), J = C(a.splice(N, a.length - N), Z, d, g, Xa, l, n, {
                        controllerDirectives: L,
                        newIsolateScopeDirective: Q,
                        templateDirective: ia,
                        nonTlbTranscludeDirective: T
                    }), S = a.length; else if (G.compile) try {
                        O = G.compile(Z, d, Xa), P(O) ? u(null, O, ra, W) : O && u(O.pre, O.post, ra, W);
                    } catch (aa) {
                        m(aa, ha(Z));
                    }
                    G.terminal && (J.terminal = !0, v = Math.max(v, G.priority));
                }
                J.scope = A && !0 === A.scope;
                J.transclude = E && Xa;
                p.hasElementTranscludeDirective = D;
                return J;
            }
            function pc(a) {
                for (var b = 0, c = a.length; b < c; b++) a[b] = Tb(a[b], {
                    $$isolateScope: !0
                });
            }
            function T(b, e, g, f, k, n, r) {
                if (e === k) return null;
                k = null;
                if (c.hasOwnProperty(e)) {
                    var p;
                    e = a.get(e + d);
                    for (var z = 0, u = e.length; z < u; z++) try {
                        p = e[z], (f === s || f > p.priority) && -1 != p.restrict.indexOf(g) && (n && (p = Tb(p, {
                            $$start: n,
                            $$end: r
                        })), b.push(p), k = p);
                    } catch (F) {
                        m(F);
                    }
                }
                return k;
            }
            function B(a, b) {
                var c = b.$attr, d = a.$attr, e = a.$$element;
                q(a, function(d, e) {
                    "$" != e.charAt(0) && (b[e] && (d += ("style" === e ? ";" : " ") + b[e]), a.$set(e, d, !0, c[e]));
                });
                q(b, function(b, g) {
                    "class" == g ? (ma(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == g ? (e.attr("style", e.attr("style") + ";" + b), 
                    a.style = (a.style ? a.style + ";" : "") + b) : "$" == g.charAt(0) || a.hasOwnProperty(g) || (a[g] = b, 
                    d[g] = c[g]);
                });
            }
            function C(a, b, c, d, e, g, f, l) {
                var k = [], m, r, z = b[0], u = a.shift(), F = D({}, u, {
                    templateUrl: null,
                    transclude: null,
                    replace: null,
                    $$originalDirective: u
                }), x = P(u.templateUrl) ? u.templateUrl(b, c) : u.templateUrl;
                b.empty();
                n.get(v.getTrustedResourceUrl(x), {
                    cache: p
                }).success(function(n) {
                    var p, J;
                    n = Y(n);
                    if (u.replace) {
                        n = Cb.test(n) ? y(n) : [];
                        p = n[0];
                        if (1 != n.length || 1 !== p.nodeType) throw ja("tplrt", u.name, x);
                        n = {
                            $attr: {}
                        };
                        mb(d, b, p);
                        var v = da(p, [], n);
                        X(u.scope) && pc(v);
                        a = v.concat(a);
                        B(c, n);
                    } else p = z, b.html(n);
                    a.unshift(F);
                    m = ia(a, p, c, e, b, u, g, f, l);
                    q(d, function(a, c) {
                        a == p && (d[c] = b[0]);
                    });
                    for (r = L(b[0].childNodes, e); k.length; ) {
                        n = k.shift();
                        J = k.shift();
                        var A = k.shift(), R = k.shift(), v = b[0];
                        if (J !== z) {
                            var H = J.className;
                            l.hasElementTranscludeDirective && u.replace || (v = Eb(p));
                            mb(A, y(J), v);
                            ma(y(v), H);
                        }
                        J = m.transclude ? Q(n, m.transclude) : R;
                        m(r, n, v, d, J);
                    }
                    k = null;
                }).error(function(a, b, c, d) {
                    throw ja("tpload", d.url);
                });
                return function(a, b, c, d, e) {
                    k ? (k.push(b), k.push(c), k.push(d), k.push(e)) : m(r, b, c, d, e);
                };
            }
            function E(a, b) {
                var c = b.priority - a.priority;
                return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index;
            }
            function K(a, b, c, d) {
                if (b) throw ja("multidir", b.name, c.name, a, ha(d));
            }
            function t(a, c) {
                var d = b(c, !0);
                d && a.push({
                    priority: 0,
                    compile: aa(function(a, b) {
                        var c = b.parent(), e = c.data("$binding") || [];
                        e.push(d);
                        ma(c.data("$binding", e), "ng-binding");
                        a.$watch(d, function(a) {
                            b[0].nodeValue = a;
                        });
                    })
                });
            }
            function O(a, b) {
                if ("srcdoc" == b) return v.HTML;
                var c = Ka(a);
                if ("xlinkHref" == b || "FORM" == c && "action" == b || "IMG" != c && ("src" == b || "ngSrc" == b)) return v.RESOURCE_URL;
            }
            function N(a, c, d, e) {
                var g = b(d, !0);
                if (g) {
                    if ("multiple" === e && "SELECT" === Ka(a)) throw ja("selmulti", ha(a));
                    c.push({
                        priority: 100,
                        compile: function() {
                            return {
                                pre: function(c, d, l) {
                                    d = l.$$observers || (l.$$observers = {});
                                    if (f.test(e)) throw ja("nodomevents");
                                    if (g = b(l[e], !0, O(a, e))) l[e] = g(c), (d[e] || (d[e] = [])).$$inter = !0, (l.$$observers && l.$$observers[e].$$scope || c).$watch(g, function(a, b) {
                                        "class" === e && a != b ? l.$updateClass(a, b) : l.$set(e, a);
                                    });
                                }
                            };
                        }
                    });
                }
            }
            function mb(a, b, c) {
                var d = b[0], e = b.length, g = d.parentNode, f, l;
                if (a) for (f = 0, l = a.length; f < l; f++) if (a[f] == d) {
                    a[f++] = c;
                    l = f + e - 1;
                    for (var k = a.length; f < k; f++, l++) l < k ? a[f] = a[l] : delete a[f];
                    a.length -= e - 1;
                    break;
                }
                g && g.replaceChild(c, d);
                a = U.createDocumentFragment();
                a.appendChild(d);
                c[y.expando] = d[y.expando];
                d = 1;
                for (e = b.length; d < e; d++) g = b[d], y(g).remove(), a.appendChild(g), delete b[d];
                b[0] = c;
                b.length = 1;
            }
            function qc(a, b) {
                return D(function() {
                    return a.apply(null, arguments);
                }, a, b);
            }
            var Hb = function(a, b) {
                this.$$element = a;
                this.$attr = b || {};
            };
            Hb.prototype = {
                $normalize: na,
                $addClass: function(a) {
                    a && 0 < a.length && J.addClass(this.$$element, a);
                },
                $removeClass: function(a) {
                    a && 0 < a.length && J.removeClass(this.$$element, a);
                },
                $updateClass: function(a, b) {
                    var c = rc(a, b), d = rc(b, a);
                    0 === c.length ? J.removeClass(this.$$element, d) : 0 === d.length ? J.addClass(this.$$element, c) : J.setClass(this.$$element, c, d);
                },
                $set: function(a, b, c, d) {
                    var e = mc(this.$$element[0], a);
                    e && (this.$$element.prop(a, b), d = e);
                    this[a] = b;
                    d ? this.$attr[a] = d : (d = this.$attr[a]) || (this.$attr[a] = d = fb(a, "-"));
                    e = Ka(this.$$element);
                    if ("A" === e && "href" === a || "IMG" === e && "src" === a) this[a] = b = A(b, "src" === a);
                    !1 !== c && (null === b || b === s ? this.$$element.removeAttr(d) : this.$$element.attr(d, b));
                    (c = this.$$observers) && q(c[a], function(a) {
                        try {
                            a(b);
                        } catch (c) {
                            m(c);
                        }
                    });
                },
                $observe: function(a, b) {
                    var c = this, d = c.$$observers || (c.$$observers = {}), e = d[a] || (d[a] = []);
                    e.push(b);
                    u.$evalAsync(function() {
                        e.$$inter || b(c[a]);
                    });
                    return b;
                }
            };
            var Z = b.startSymbol(), ra = b.endSymbol(), Y = "{{" == Z || "}}" == ra ? Da : function(a) {
                return a.replace(/\{\{/g, Z).replace(/}}/g, ra);
            }, W = /^ngAttr[A-Z]/;
            return x;
        } ];
    }
    function na(b) {
        return Ta(b.replace(te, ""));
    }
    function rc(b, a) {
        var c = "", d = b.split(/\s+/), e = a.split(/\s+/), g = 0;
        a: for (;g < d.length; g++) {
            for (var f = d[g], h = 0; h < e.length; h++) if (f == e[h]) continue a;
            c += (0 < c.length ? " " : "") + f;
        }
        return c;
    }
    function Od() {
        var b = {}, a = /^(\S+)(\s+as\s+(\w+))?$/;
        this.register = function(a, d) {
            Aa(a, "controller");
            X(a) ? D(b, a) : b[a] = d;
        };
        this.$get = [ "$injector", "$window", function(c, d) {
            return function(e, g) {
                var f, h, l;
                w(e) && (f = e.match(a), h = f[1], l = f[3], e = b.hasOwnProperty(h) ? b[h] : bc(g.$scope, h, !0) || bc(d, h, !0), 
                Ra(e, h, !0));
                f = c.instantiate(e, g);
                if (l) {
                    if (!g || "object" != typeof g.$scope) throw t("$controller")("noscp", h || e.name, l);
                    g.$scope[l] = f;
                }
                return f;
            };
        } ];
    }
    function Pd() {
        this.$get = [ "$window", function(b) {
            return y(b.document);
        } ];
    }
    function Qd() {
        this.$get = [ "$log", function(b) {
            return function(a, c) {
                b.error.apply(b, arguments);
            };
        } ];
    }
    function sc(b) {
        var a = {}, c, d, e;
        if (!b) return a;
        q(b.split("\n"), function(b) {
            e = b.indexOf(":");
            c = K(ca(b.substr(0, e)));
            d = ca(b.substr(e + 1));
            c && (a[c] = a[c] ? a[c] + (", " + d) : d);
        });
        return a;
    }
    function tc(b) {
        var a = X(b) ? b : s;
        return function(c) {
            a || (a = sc(b));
            return c ? a[K(c)] || null : a;
        };
    }
    function uc(b, a, c) {
        if (P(c)) return c(b, a);
        q(c, function(c) {
            b = c(b, a);
        });
        return b;
    }
    function Td() {
        var b = /^\s*(\[|\{[^\{])/, a = /[\}\]]\s*$/, c = /^\)\]\}',?\n/, d = {
            "Content-Type": "application/json;charset=utf-8"
        }, e = this.defaults = {
            transformResponse: [ function(d) {
                w(d) && (d = d.replace(c, ""), b.test(d) && a.test(d) && (d = Wb(d)));
                return d;
            } ],
            transformRequest: [ function(a) {
                return X(a) && "[object File]" !== wa.call(a) && "[object Blob]" !== wa.call(a) ? qa(a) : a;
            } ],
            headers: {
                common: {
                    Accept: "application/json, text/plain, */*"
                },
                post: ba(d),
                put: ba(d),
                patch: ba(d)
            },
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN"
        }, g = this.interceptors = [], f = this.responseInterceptors = [];
        this.$get = [ "$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function(a, b, c, d, n, p) {
            function r(a) {
                function c(a) {
                    var b = D({}, a, {
                        data: uc(a.data, a.headers, d.transformResponse)
                    });
                    return 200 <= a.status && 300 > a.status ? b : n.reject(b);
                }
                var d = {
                    method: "get",
                    transformRequest: e.transformRequest,
                    transformResponse: e.transformResponse
                }, g = function(a) {
                    function b(a) {
                        var c;
                        q(a, function(b, d) {
                            P(b) && (c = b(), null != c ? a[d] = c : delete a[d]);
                        });
                    }
                    var c = e.headers, d = D({}, a.headers), g, f, c = D({}, c.common, c[K(a.method)]);
                    b(c);
                    b(d);
                    a: for (g in c) {
                        a = K(g);
                        for (f in d) if (K(f) === a) continue a;
                        d[g] = c[g];
                    }
                    return d;
                }(a);
                D(d, a);
                d.headers = g;
                d.method = Fa(d.method);
                (a = Ib(d.url) ? b.cookies()[d.xsrfCookieName || e.xsrfCookieName] : s) && (g[d.xsrfHeaderName || e.xsrfHeaderName] = a);
                var f = [ function(a) {
                    g = a.headers;
                    var b = uc(a.data, tc(g), a.transformRequest);
                    E(a.data) && q(g, function(a, b) {
                        "content-type" === K(b) && delete g[b];
                    });
                    E(a.withCredentials) && !E(e.withCredentials) && (a.withCredentials = e.withCredentials);
                    return z(a, b, g).then(c, c);
                }, s ], h = n.when(d);
                for (q(v, function(a) {
                    (a.request || a.requestError) && f.unshift(a.request, a.requestError);
                    (a.response || a.responseError) && f.push(a.response, a.responseError);
                }); f.length; ) {
                    a = f.shift();
                    var k = f.shift(), h = h.then(a, k);
                }
                h.success = function(a) {
                    h.then(function(b) {
                        a(b.data, b.status, b.headers, d);
                    });
                    return h;
                };
                h.error = function(a) {
                    h.then(null, function(b) {
                        a(b.data, b.status, b.headers, d);
                    });
                    return h;
                };
                return h;
            }
            function z(b, c, g) {
                function f(a, b, c, e) {
                    v && (200 <= a && 300 > a ? v.put(s, [ a, b, sc(c), e ]) : v.remove(s));
                    l(b, a, c, e);
                    d.$$phase || d.$apply();
                }
                function l(a, c, d, e) {
                    c = Math.max(c, 0);
                    (200 <= c && 300 > c ? p.resolve : p.reject)({
                        data: a,
                        status: c,
                        headers: tc(d),
                        config: b,
                        statusText: e
                    });
                }
                function k() {
                    var a = db(r.pendingRequests, b);
                    -1 !== a && r.pendingRequests.splice(a, 1);
                }
                var p = n.defer(), z = p.promise, v, q, s = u(b.url, b.params);
                r.pendingRequests.push(b);
                z.then(k, k);
                (b.cache || e.cache) && (!1 !== b.cache && "GET" == b.method) && (v = X(b.cache) ? b.cache : X(e.cache) ? e.cache : F);
                if (v) if (q = v.get(s), B(q)) {
                    if (q.then) return q.then(k, k), q;
                    M(q) ? l(q[1], q[0], ba(q[2]), q[3]) : l(q, 200, {}, "OK");
                } else v.put(s, z);
                E(q) && a(b.method, s, c, f, g, b.timeout, b.withCredentials, b.responseType);
                return z;
            }
            function u(a, b) {
                if (!b) return a;
                var c = [];
                Sc(b, function(a, b) {
                    null === a || E(a) || (M(a) || (a = [ a ]), q(a, function(a) {
                        X(a) && (a = qa(a));
                        c.push(za(b) + "=" + za(a));
                    }));
                });
                0 < c.length && (a += (-1 == a.indexOf("?") ? "?" : "&") + c.join("&"));
                return a;
            }
            var F = c("$http"), v = [];
            q(g, function(a) {
                v.unshift(w(a) ? p.get(a) : p.invoke(a));
            });
            q(f, function(a, b) {
                var c = w(a) ? p.get(a) : p.invoke(a);
                v.splice(b, 0, {
                    response: function(a) {
                        return c(n.when(a));
                    },
                    responseError: function(a) {
                        return c(n.reject(a));
                    }
                });
            });
            r.pendingRequests = [];
            (function(a) {
                q(arguments, function(a) {
                    r[a] = function(b, c) {
                        return r(D(c || {}, {
                            method: a,
                            url: b
                        }));
                    };
                });
            })("get", "delete", "head", "jsonp");
            (function(a) {
                q(arguments, function(a) {
                    r[a] = function(b, c, d) {
                        return r(D(d || {}, {
                            method: a,
                            url: b,
                            data: c
                        }));
                    };
                });
            })("post", "put");
            r.defaults = e;
            return r;
        } ];
    }
    function ue(b) {
        if (8 >= S && (!b.match(/^(get|post|head|put|delete|options)$/i) || !O.XMLHttpRequest)) return new O.ActiveXObject("Microsoft.XMLHTTP");
        if (O.XMLHttpRequest) return new O.XMLHttpRequest();
        throw t("$httpBackend")("noxhr");
    }
    function Ud() {
        this.$get = [ "$browser", "$window", "$document", function(b, a, c) {
            return ve(b, ue, b.defer, a.angular.callbacks, c[0]);
        } ];
    }
    function ve(b, a, c, d, e) {
        function g(a, b) {
            var c = e.createElement("script"), d = function() {
                c.onreadystatechange = c.onload = c.onerror = null;
                e.body.removeChild(c);
                b && b();
            };
            c.type = "text/javascript";
            c.src = a;
            S && 8 >= S ? c.onreadystatechange = function() {
                /loaded|complete/.test(c.readyState) && d();
            } : c.onload = c.onerror = function() {
                d();
            };
            e.body.appendChild(c);
            return d;
        }
        var f = -1;
        return function(e, l, k, m, n, p, r, z) {
            function u() {
                v = f;
                A && A();
                x && x.abort();
            }
            function F(a, d, e, g, f) {
                L && c.cancel(L);
                A = x = null;
                0 === d && (d = e ? 200 : "file" == sa(l).protocol ? 404 : 0);
                a(1223 === d ? 204 : d, e, g, f || "");
                b.$$completeOutstandingRequest(C);
            }
            var v;
            b.$$incOutstandingRequestCount();
            l = l || b.url();
            if ("jsonp" == K(e)) {
                var J = "_" + (d.counter++).toString(36);
                d[J] = function(a) {
                    d[J].data = a;
                };
                var A = g(l.replace("JSON_CALLBACK", "angular.callbacks." + J), function() {
                    d[J].data ? F(m, 200, d[J].data) : F(m, v || -2);
                    d[J] = Ea.noop;
                });
            } else {
                var x = a(e);
                x.open(e, l, !0);
                q(n, function(a, b) {
                    B(a) && x.setRequestHeader(b, a);
                });
                x.onreadystatechange = function() {
                    if (x && 4 == x.readyState) {
                        var a = null, b = null;
                        v !== f && (a = x.getAllResponseHeaders(), b = "response" in x ? x.response : x.responseText);
                        F(m, v || x.status, b, a, x.statusText || "");
                    }
                };
                r && (x.withCredentials = !0);
                if (z) try {
                    x.responseType = z;
                } catch (s) {
                    if ("json" !== z) throw s;
                }
                x.send(k || null);
            }
            if (0 < p) var L = c(u, p); else p && p.then && p.then(u);
        };
    }
    function Rd() {
        var b = "{{", a = "}}";
        this.startSymbol = function(a) {
            return a ? (b = a, this) : b;
        };
        this.endSymbol = function(b) {
            return b ? (a = b, this) : a;
        };
        this.$get = [ "$parse", "$exceptionHandler", "$sce", function(c, d, e) {
            function g(g, k, m) {
                for (var n, p, r = 0, z = [], u = g.length, F = !1, v = []; r < u; ) -1 != (n = g.indexOf(b, r)) && -1 != (p = g.indexOf(a, n + f)) ? (r != n && z.push(g.substring(r, n)), 
                z.push(r = c(F = g.substring(n + f, p))), r.exp = F, r = p + h, F = !0) : (r != u && z.push(g.substring(r)), 
                r = u);
                (u = z.length) || (z.push(""), u = 1);
                if (m && 1 < z.length) throw vc("noconcat", g);
                if (!k || F) return v.length = u, r = function(a) {
                    try {
                        for (var b = 0, c = u, f; b < c; b++) "function" == typeof (f = z[b]) && (f = f(a), 
                        f = m ? e.getTrusted(m, f) : e.valueOf(f), null === f || E(f) ? f = "" : "string" != typeof f && (f = qa(f))), 
                        v[b] = f;
                        return v.join("");
                    } catch (h) {
                        a = vc("interr", g, h.toString()), d(a);
                    }
                }, r.exp = g, r.parts = z, r;
            }
            var f = b.length, h = a.length;
            g.startSymbol = function() {
                return b;
            };
            g.endSymbol = function() {
                return a;
            };
            return g;
        } ];
    }
    function Sd() {
        this.$get = [ "$rootScope", "$window", "$q", function(b, a, c) {
            function d(d, f, h, l) {
                var k = a.setInterval, m = a.clearInterval, n = c.defer(), p = n.promise, r = 0, z = B(l) && !l;
                h = B(h) ? h : 0;
                p.then(null, null, d);
                p.$$intervalId = k(function() {
                    n.notify(r++);
                    0 < h && r >= h && (n.resolve(r), m(p.$$intervalId), delete e[p.$$intervalId]);
                    z || b.$apply();
                }, f);
                e[p.$$intervalId] = n;
                return p;
            }
            var e = {};
            d.cancel = function(a) {
                return a && a.$$intervalId in e ? (e[a.$$intervalId].reject("canceled"), clearInterval(a.$$intervalId), 
                delete e[a.$$intervalId], !0) : !1;
            };
            return d;
        } ];
    }
    function ad() {
        this.$get = function() {
            return {
                id: "en-us",
                NUMBER_FORMATS: {
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [ {
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: "",
                        posSuf: "",
                        negPre: "-",
                        negSuf: "",
                        gSize: 3,
                        lgSize: 3
                    }, {
                        minInt: 1,
                        minFrac: 2,
                        maxFrac: 2,
                        posPre: "¤",
                        posSuf: "",
                        negPre: "(¤",
                        negSuf: ")",
                        gSize: 3,
                        lgSize: 3
                    } ],
                    CURRENCY_SYM: "$"
                },
                DATETIME_FORMATS: {
                    MONTH: "January February March April May June July August September October November December".split(" "),
                    SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                    DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
                    AMPMS: [ "AM", "PM" ],
                    medium: "MMM d, y h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    mediumDate: "MMM d, y",
                    shortDate: "M/d/yy",
                    mediumTime: "h:mm:ss a",
                    shortTime: "h:mm a"
                },
                pluralCat: function(b) {
                    return 1 === b ? "one" : "other";
                }
            };
        };
    }
    function wc(b) {
        b = b.split("/");
        for (var a = b.length; a--; ) b[a] = wb(b[a]);
        return b.join("/");
    }
    function xc(b, a, c) {
        b = sa(b, c);
        a.$$protocol = b.protocol;
        a.$$host = b.hostname;
        a.$$port = Y(b.port) || we[b.protocol] || null;
    }
    function yc(b, a, c) {
        var d = "/" !== b.charAt(0);
        d && (b = "/" + b);
        b = sa(b, c);
        a.$$path = decodeURIComponent(d && "/" === b.pathname.charAt(0) ? b.pathname.substring(1) : b.pathname);
        a.$$search = Yb(b.search);
        a.$$hash = decodeURIComponent(b.hash);
        a.$$path && "/" != a.$$path.charAt(0) && (a.$$path = "/" + a.$$path);
    }
    function oa(b, a) {
        if (0 === a.indexOf(b)) return a.substr(b.length);
    }
    function Ya(b) {
        var a = b.indexOf("#");
        return -1 == a ? b : b.substr(0, a);
    }
    function Jb(b) {
        return b.substr(0, Ya(b).lastIndexOf("/") + 1);
    }
    function zc(b, a) {
        this.$$html5 = !0;
        a = a || "";
        var c = Jb(b);
        xc(b, this, b);
        this.$$parse = function(a) {
            var e = oa(c, a);
            if (!w(e)) throw Kb("ipthprfx", a, c);
            yc(e, this, b);
            this.$$path || (this.$$path = "/");
            this.$$compose();
        };
        this.$$compose = function() {
            var a = Zb(this.$$search), b = this.$$hash ? "#" + wb(this.$$hash) : "";
            this.$$url = wc(this.$$path) + (a ? "?" + a : "") + b;
            this.$$absUrl = c + this.$$url.substr(1);
        };
        this.$$rewrite = function(d) {
            var e;
            if ((e = oa(b, d)) !== s) return d = e, (e = oa(a, e)) !== s ? c + (oa("/", e) || e) : b + d;
            if ((e = oa(c, d)) !== s) return c + e;
            if (c == d + "/") return c;
        };
    }
    function Lb(b, a) {
        var c = Jb(b);
        xc(b, this, b);
        this.$$parse = function(d) {
            var e = oa(b, d) || oa(c, d), e = "#" == e.charAt(0) ? oa(a, e) : this.$$html5 ? e : "";
            if (!w(e)) throw Kb("ihshprfx", d, a);
            yc(e, this, b);
            d = this.$$path;
            var g = /^\/?.*?:(\/.*)/;
            0 === e.indexOf(b) && (e = e.replace(b, ""));
            g.exec(e) || (d = (e = g.exec(d)) ? e[1] : d);
            this.$$path = d;
            this.$$compose();
        };
        this.$$compose = function() {
            var c = Zb(this.$$search), e = this.$$hash ? "#" + wb(this.$$hash) : "";
            this.$$url = wc(this.$$path) + (c ? "?" + c : "") + e;
            this.$$absUrl = b + (this.$$url ? a + this.$$url : "");
        };
        this.$$rewrite = function(a) {
            if (Ya(b) == Ya(a)) return a;
        };
    }
    function Ac(b, a) {
        this.$$html5 = !0;
        Lb.apply(this, arguments);
        var c = Jb(b);
        this.$$rewrite = function(d) {
            var e;
            if (b == Ya(d)) return d;
            if (e = oa(c, d)) return b + a + e;
            if (c === d + "/") return c;
        };
    }
    function nb(b) {
        return function() {
            return this[b];
        };
    }
    function Bc(b, a) {
        return function(c) {
            if (E(c)) return this[b];
            this[b] = a(c);
            this.$$compose();
            return this;
        };
    }
    function Vd() {
        var b = "", a = !1;
        this.hashPrefix = function(a) {
            return B(a) ? (b = a, this) : b;
        };
        this.html5Mode = function(b) {
            return B(b) ? (a = b, this) : a;
        };
        this.$get = [ "$rootScope", "$browser", "$sniffer", "$rootElement", function(c, d, e, g) {
            function f(a) {
                c.$broadcast("$locationChangeSuccess", h.absUrl(), a);
            }
            var h, l = d.baseHref(), k = d.url();
            a ? (l = k.substring(0, k.indexOf("/", k.indexOf("//") + 2)) + (l || "/"), e = e.history ? zc : Ac) : (l = Ya(k), 
            e = Lb);
            h = new e(l, "#" + b);
            h.$$parse(h.$$rewrite(k));
            g.on("click", function(a) {
                if (!a.ctrlKey && !a.metaKey && 2 != a.which) {
                    for (var b = y(a.target); "a" !== K(b[0].nodeName); ) if (b[0] === g[0] || !(b = b.parent())[0]) return;
                    var e = b.prop("href");
                    X(e) && "[object SVGAnimatedString]" === e.toString() && (e = sa(e.animVal).href);
                    var f = h.$$rewrite(e);
                    e && (!b.attr("target") && f && !a.isDefaultPrevented()) && (a.preventDefault(), 
                    f != d.url() && (h.$$parse(f), c.$apply(), O.angular["ff-684208-preventDefault"] = !0));
                }
            });
            h.absUrl() != k && d.url(h.absUrl(), !0);
            d.onUrlChange(function(a) {
                h.absUrl() != a && (c.$evalAsync(function() {
                    var b = h.absUrl();
                    h.$$parse(a);
                    c.$broadcast("$locationChangeStart", a, b).defaultPrevented ? (h.$$parse(b), d.url(b)) : f(b);
                }), c.$$phase || c.$digest());
            });
            var m = 0;
            c.$watch(function() {
                var a = d.url(), b = h.$$replace;
                m && a == h.absUrl() || (m++, c.$evalAsync(function() {
                    c.$broadcast("$locationChangeStart", h.absUrl(), a).defaultPrevented ? h.$$parse(a) : (d.url(h.absUrl(), b), 
                    f(a));
                }));
                h.$$replace = !1;
                return m;
            });
            return h;
        } ];
    }
    function Wd() {
        var b = !0, a = this;
        this.debugEnabled = function(a) {
            return B(a) ? (b = a, this) : b;
        };
        this.$get = [ "$window", function(c) {
            function d(a) {
                a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line));
                return a;
            }
            function e(a) {
                var b = c.console || {}, e = b[a] || b.log || C;
                a = !1;
                try {
                    a = !!e.apply;
                } catch (l) {}
                return a ? function() {
                    var a = [];
                    q(arguments, function(b) {
                        a.push(d(b));
                    });
                    return e.apply(b, a);
                } : function(a, b) {
                    e(a, null == b ? "" : b);
                };
            }
            return {
                log: e("log"),
                info: e("info"),
                warn: e("warn"),
                error: e("error"),
                debug: function() {
                    var c = e("debug");
                    return function() {
                        b && c.apply(a, arguments);
                    };
                }()
            };
        } ];
    }
    function fa(b, a) {
        if ("constructor" === b) throw Ba("isecfld", a);
        return b;
    }
    function Za(b, a) {
        if (b) {
            if (b.constructor === b) throw Ba("isecfn", a);
            if (b.document && b.location && b.alert && b.setInterval) throw Ba("isecwindow", a);
            if (b.children && (b.nodeName || b.prop && b.attr && b.find)) throw Ba("isecdom", a);
        }
        return b;
    }
    function ob(b, a, c, d, e) {
        e = e || {};
        a = a.split(".");
        for (var g, f = 0; 1 < a.length; f++) {
            g = fa(a.shift(), d);
            var h = b[g];
            h || (h = {}, b[g] = h);
            b = h;
            b.then && e.unwrapPromises && (ta(d), "$$v" in b || function(a) {
                a.then(function(b) {
                    a.$$v = b;
                });
            }(b), b.$$v === s && (b.$$v = {}), b = b.$$v);
        }
        g = fa(a.shift(), d);
        return b[g] = c;
    }
    function Cc(b, a, c, d, e, g, f) {
        fa(b, g);
        fa(a, g);
        fa(c, g);
        fa(d, g);
        fa(e, g);
        return f.unwrapPromises ? function(f, l) {
            var k = l && l.hasOwnProperty(b) ? l : f, m;
            if (null == k) return k;
            (k = k[b]) && k.then && (ta(g), "$$v" in k || (m = k, m.$$v = s, m.then(function(a) {
                m.$$v = a;
            })), k = k.$$v);
            if (!a) return k;
            if (null == k) return s;
            (k = k[a]) && k.then && (ta(g), "$$v" in k || (m = k, m.$$v = s, m.then(function(a) {
                m.$$v = a;
            })), k = k.$$v);
            if (!c) return k;
            if (null == k) return s;
            (k = k[c]) && k.then && (ta(g), "$$v" in k || (m = k, m.$$v = s, m.then(function(a) {
                m.$$v = a;
            })), k = k.$$v);
            if (!d) return k;
            if (null == k) return s;
            (k = k[d]) && k.then && (ta(g), "$$v" in k || (m = k, m.$$v = s, m.then(function(a) {
                m.$$v = a;
            })), k = k.$$v);
            if (!e) return k;
            if (null == k) return s;
            (k = k[e]) && k.then && (ta(g), "$$v" in k || (m = k, m.$$v = s, m.then(function(a) {
                m.$$v = a;
            })), k = k.$$v);
            return k;
        } : function(g, f) {
            var k = f && f.hasOwnProperty(b) ? f : g;
            if (null == k) return k;
            k = k[b];
            if (!a) return k;
            if (null == k) return s;
            k = k[a];
            if (!c) return k;
            if (null == k) return s;
            k = k[c];
            if (!d) return k;
            if (null == k) return s;
            k = k[d];
            return e ? null == k ? s : k = k[e] : k;
        };
    }
    function xe(b, a) {
        fa(b, a);
        return function(a, d) {
            return null == a ? s : (d && d.hasOwnProperty(b) ? d : a)[b];
        };
    }
    function ye(b, a, c) {
        fa(b, c);
        fa(a, c);
        return function(c, e) {
            if (null == c) return s;
            c = (e && e.hasOwnProperty(b) ? e : c)[b];
            return null == c ? s : c[a];
        };
    }
    function Dc(b, a, c) {
        if (Mb.hasOwnProperty(b)) return Mb[b];
        var d = b.split("."), e = d.length, g;
        if (a.unwrapPromises || 1 !== e) if (a.unwrapPromises || 2 !== e) if (a.csp) g = 6 > e ? Cc(d[0], d[1], d[2], d[3], d[4], c, a) : function(b, g) {
            var f = 0, h;
            do h = Cc(d[f++], d[f++], d[f++], d[f++], d[f++], c, a)(b, g), g = s, b = h; while (f < e);
            return h;
        }; else {
            var f = "var p;\n";
            q(d, function(b, d) {
                fa(b, c);
                f += "if(s == null) return undefined;\ns=" + (d ? "s" : '((k&&k.hasOwnProperty("' + b + '"))?k:s)') + '["' + b + '"];\n' + (a.unwrapPromises ? 'if (s && s.then) {\n pw("' + c.replace(/(["\r\n])/g, "\\$1") + '");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n' : "");
            });
            var f = f + "return s;", h = new Function("s", "k", "pw", f);
            h.toString = aa(f);
            g = a.unwrapPromises ? function(a, b) {
                return h(a, b, ta);
            } : h;
        } else g = ye(d[0], d[1], c); else g = xe(d[0], c);
        "hasOwnProperty" !== b && (Mb[b] = g);
        return g;
    }
    function Xd() {
        var b = {}, a = {
            csp: !1,
            unwrapPromises: !1,
            logPromiseWarnings: !0
        };
        this.unwrapPromises = function(b) {
            return B(b) ? (a.unwrapPromises = !!b, this) : a.unwrapPromises;
        };
        this.logPromiseWarnings = function(b) {
            return B(b) ? (a.logPromiseWarnings = b, this) : a.logPromiseWarnings;
        };
        this.$get = [ "$filter", "$sniffer", "$log", function(c, d, e) {
            a.csp = d.csp;
            ta = function(b) {
                a.logPromiseWarnings && !Ec.hasOwnProperty(b) && (Ec[b] = !0, e.warn("[$parse] Promise found in the expression `" + b + "`. Automatic unwrapping of promises in Angular expressions is deprecated."));
            };
            return function(d) {
                var e;
                switch (typeof d) {
                  case "string":
                    if (b.hasOwnProperty(d)) return b[d];
                    e = new Nb(a);
                    e = new $a(e, c, a).parse(d, !1);
                    "hasOwnProperty" !== d && (b[d] = e);
                    return e;

                  case "function":
                    return d;

                  default:
                    return C;
                }
            };
        } ];
    }
    function Zd() {
        this.$get = [ "$rootScope", "$exceptionHandler", function(b, a) {
            return ze(function(a) {
                b.$evalAsync(a);
            }, a);
        } ];
    }
    function ze(b, a) {
        function c(a) {
            return a;
        }
        function d(a) {
            return f(a);
        }
        var e = function() {
            var f = [], k, m;
            return m = {
                resolve: function(a) {
                    if (f) {
                        var c = f;
                        f = s;
                        k = g(a);
                        c.length && b(function() {
                            for (var a, b = 0, d = c.length; b < d; b++) a = c[b], k.then(a[0], a[1], a[2]);
                        });
                    }
                },
                reject: function(a) {
                    m.resolve(h(a));
                },
                notify: function(a) {
                    if (f) {
                        var c = f;
                        f.length && b(function() {
                            for (var b, d = 0, e = c.length; d < e; d++) b = c[d], b[2](a);
                        });
                    }
                },
                promise: {
                    then: function(b, g, h) {
                        var m = e(), u = function(d) {
                            try {
                                m.resolve((P(b) ? b : c)(d));
                            } catch (e) {
                                m.reject(e), a(e);
                            }
                        }, F = function(b) {
                            try {
                                m.resolve((P(g) ? g : d)(b));
                            } catch (c) {
                                m.reject(c), a(c);
                            }
                        }, v = function(b) {
                            try {
                                m.notify((P(h) ? h : c)(b));
                            } catch (d) {
                                a(d);
                            }
                        };
                        f ? f.push([ u, F, v ]) : k.then(u, F, v);
                        return m.promise;
                    },
                    "catch": function(a) {
                        return this.then(null, a);
                    },
                    "finally": function(a) {
                        function b(a, c) {
                            var d = e();
                            c ? d.resolve(a) : d.reject(a);
                            return d.promise;
                        }
                        function d(e, g) {
                            var f = null;
                            try {
                                f = (a || c)();
                            } catch (h) {
                                return b(h, !1);
                            }
                            return f && P(f.then) ? f.then(function() {
                                return b(e, g);
                            }, function(a) {
                                return b(a, !1);
                            }) : b(e, g);
                        }
                        return this.then(function(a) {
                            return d(a, !0);
                        }, function(a) {
                            return d(a, !1);
                        });
                    }
                }
            };
        }, g = function(a) {
            return a && P(a.then) ? a : {
                then: function(c) {
                    var d = e();
                    b(function() {
                        d.resolve(c(a));
                    });
                    return d.promise;
                }
            };
        }, f = function(a) {
            var b = e();
            b.reject(a);
            return b.promise;
        }, h = function(c) {
            return {
                then: function(g, f) {
                    var h = e();
                    b(function() {
                        try {
                            h.resolve((P(f) ? f : d)(c));
                        } catch (b) {
                            h.reject(b), a(b);
                        }
                    });
                    return h.promise;
                }
            };
        };
        return {
            defer: e,
            reject: f,
            when: function(h, k, m, n) {
                var p = e(), r, z = function(b) {
                    try {
                        return (P(k) ? k : c)(b);
                    } catch (d) {
                        return a(d), f(d);
                    }
                }, u = function(b) {
                    try {
                        return (P(m) ? m : d)(b);
                    } catch (c) {
                        return a(c), f(c);
                    }
                }, F = function(b) {
                    try {
                        return (P(n) ? n : c)(b);
                    } catch (d) {
                        a(d);
                    }
                };
                b(function() {
                    g(h).then(function(a) {
                        r || (r = !0, p.resolve(g(a).then(z, u, F)));
                    }, function(a) {
                        r || (r = !0, p.resolve(u(a)));
                    }, function(a) {
                        r || p.notify(F(a));
                    });
                });
                return p.promise;
            },
            all: function(a) {
                var b = e(), c = 0, d = M(a) ? [] : {};
                q(a, function(a, e) {
                    c++;
                    g(a).then(function(a) {
                        d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d));
                    }, function(a) {
                        d.hasOwnProperty(e) || b.reject(a);
                    });
                });
                0 === c && b.resolve(d);
                return b.promise;
            }
        };
    }
    function fe() {
        this.$get = [ "$window", "$timeout", function(b, a) {
            var c = b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame, d = b.cancelAnimationFrame || b.webkitCancelAnimationFrame || b.mozCancelAnimationFrame || b.webkitCancelRequestAnimationFrame, e = !!c, g = e ? function(a) {
                var b = c(a);
                return function() {
                    d(b);
                };
            } : function(b) {
                var c = a(b, 16.66, !1);
                return function() {
                    a.cancel(c);
                };
            };
            g.supported = e;
            return g;
        } ];
    }
    function Yd() {
        var b = 10, a = t("$rootScope"), c = null;
        this.digestTtl = function(a) {
            arguments.length && (b = a);
            return b;
        };
        this.$get = [ "$injector", "$exceptionHandler", "$parse", "$browser", function(d, e, g, f) {
            function h() {
                this.$id = bb();
                this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
                this["this"] = this.$root = this;
                this.$$destroyed = !1;
                this.$$asyncQueue = [];
                this.$$postDigestQueue = [];
                this.$$listeners = {};
                this.$$listenerCount = {};
                this.$$isolateBindings = {};
            }
            function l(b) {
                if (p.$$phase) throw a("inprog", p.$$phase);
                p.$$phase = b;
            }
            function k(a, b) {
                var c = g(a);
                Ra(c, b);
                return c;
            }
            function m(a, b, c) {
                do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c]; while (a = a.$parent);
            }
            function n() {}
            h.prototype = {
                constructor: h,
                $new: function(a) {
                    a ? (a = new h(), a.$root = this.$root, a.$$asyncQueue = this.$$asyncQueue, a.$$postDigestQueue = this.$$postDigestQueue) : (a = function() {}, 
                    a.prototype = this, a = new a(), a.$id = bb());
                    a["this"] = a;
                    a.$$listeners = {};
                    a.$$listenerCount = {};
                    a.$parent = this;
                    a.$$watchers = a.$$nextSibling = a.$$childHead = a.$$childTail = null;
                    a.$$prevSibling = this.$$childTail;
                    this.$$childHead ? this.$$childTail = this.$$childTail.$$nextSibling = a : this.$$childHead = this.$$childTail = a;
                    return a;
                },
                $watch: function(a, b, d) {
                    var e = k(a, "watch"), g = this.$$watchers, f = {
                        fn: b,
                        last: n,
                        get: e,
                        exp: a,
                        eq: !!d
                    };
                    c = null;
                    if (!P(b)) {
                        var h = k(b || C, "listener");
                        f.fn = function(a, b, c) {
                            h(c);
                        };
                    }
                    if ("string" == typeof a && e.constant) {
                        var l = f.fn;
                        f.fn = function(a, b, c) {
                            l.call(this, a, b, c);
                            Oa(g, f);
                        };
                    }
                    g || (g = this.$$watchers = []);
                    g.unshift(f);
                    return function() {
                        Oa(g, f);
                        c = null;
                    };
                },
                $watchCollection: function(a, b) {
                    var c = this, d, e, f, h = 1 < b.length, l = 0, k = g(a), m = [], n = {}, p = !0, q = 0;
                    return this.$watch(function() {
                        d = k(c);
                        var a, b;
                        if (X(d)) if (ab(d)) for (e !== m && (e = m, q = e.length = 0, l++), a = d.length, 
                        q !== a && (l++, e.length = q = a), b = 0; b < a; b++) e[b] !== e[b] && d[b] !== d[b] || e[b] === d[b] || (l++, 
                        e[b] = d[b]); else {
                            e !== n && (e = n = {}, q = 0, l++);
                            a = 0;
                            for (b in d) d.hasOwnProperty(b) && (a++, e.hasOwnProperty(b) ? e[b] !== d[b] && (l++, 
                            e[b] = d[b]) : (q++, e[b] = d[b], l++));
                            if (q > a) for (b in l++, e) e.hasOwnProperty(b) && !d.hasOwnProperty(b) && (q--, 
                            delete e[b]);
                        } else e !== d && (e = d, l++);
                        return l;
                    }, function() {
                        p ? (p = !1, b(d, d, c)) : b(d, f, c);
                        if (h) if (X(d)) if (ab(d)) {
                            f = Array(d.length);
                            for (var a = 0; a < d.length; a++) f[a] = d[a];
                        } else for (a in f = {}, d) Fc.call(d, a) && (f[a] = d[a]); else f = d;
                    });
                },
                $digest: function() {
                    var d, g, f, h, k = this.$$asyncQueue, m = this.$$postDigestQueue, q, x, s = b, L, Q = [], y, H, R;
                    l("$digest");
                    c = null;
                    do {
                        x = !1;
                        for (L = this; k.length; ) {
                            try {
                                R = k.shift(), R.scope.$eval(R.expression);
                            } catch (B) {
                                p.$$phase = null, e(B);
                            }
                            c = null;
                        }
                        a: do {
                            if (h = L.$$watchers) for (q = h.length; q--; ) try {
                                if (d = h[q]) if ((g = d.get(L)) !== (f = d.last) && !(d.eq ? xa(g, f) : "number" == typeof g && "number" == typeof f && isNaN(g) && isNaN(f))) x = !0, 
                                c = d, d.last = d.eq ? ba(g) : g, d.fn(g, f === n ? g : f, L), 5 > s && (y = 4 - s, 
                                Q[y] || (Q[y] = []), H = P(d.exp) ? "fn: " + (d.exp.name || d.exp.toString()) : d.exp, 
                                H += "; newVal: " + qa(g) + "; oldVal: " + qa(f), Q[y].push(H)); else if (d === c) {
                                    x = !1;
                                    break a;
                                }
                            } catch (w) {
                                p.$$phase = null, e(w);
                            }
                            if (!(h = L.$$childHead || L !== this && L.$$nextSibling)) for (;L !== this && !(h = L.$$nextSibling); ) L = L.$parent;
                        } while (L = h);
                        if ((x || k.length) && !s--) throw p.$$phase = null, a("infdig", b, qa(Q));
                    } while (x || k.length);
                    for (p.$$phase = null; m.length; ) try {
                        m.shift()();
                    } catch (T) {
                        e(T);
                    }
                },
                $destroy: function() {
                    if (!this.$$destroyed) {
                        var a = this.$parent;
                        this.$broadcast("$destroy");
                        this.$$destroyed = !0;
                        this !== p && (q(this.$$listenerCount, eb(null, m, this)), a.$$childHead == this && (a.$$childHead = this.$$nextSibling), 
                        a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), 
                        this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = null, 
                        this.$$listeners = {}, this.$$watchers = this.$$asyncQueue = this.$$postDigestQueue = [], 
                        this.$destroy = this.$digest = this.$apply = C, this.$on = this.$watch = function() {
                            return C;
                        });
                    }
                },
                $eval: function(a, b) {
                    return g(a)(this, b);
                },
                $evalAsync: function(a) {
                    p.$$phase || p.$$asyncQueue.length || f.defer(function() {
                        p.$$asyncQueue.length && p.$digest();
                    });
                    this.$$asyncQueue.push({
                        scope: this,
                        expression: a
                    });
                },
                $$postDigest: function(a) {
                    this.$$postDigestQueue.push(a);
                },
                $apply: function(a) {
                    try {
                        return l("$apply"), this.$eval(a);
                    } catch (b) {
                        e(b);
                    } finally {
                        p.$$phase = null;
                        try {
                            p.$digest();
                        } catch (c) {
                            throw e(c), c;
                        }
                    }
                },
                $on: function(a, b) {
                    var c = this.$$listeners[a];
                    c || (this.$$listeners[a] = c = []);
                    c.push(b);
                    var d = this;
                    do d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++; while (d = d.$parent);
                    var e = this;
                    return function() {
                        c[db(c, b)] = null;
                        m(e, 1, a);
                    };
                },
                $emit: function(a, b) {
                    var c = [], d, g = this, f = !1, h = {
                        name: a,
                        targetScope: g,
                        stopPropagation: function() {
                            f = !0;
                        },
                        preventDefault: function() {
                            h.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    }, l = [ h ].concat(ya.call(arguments, 1)), k, m;
                    do {
                        d = g.$$listeners[a] || c;
                        h.currentScope = g;
                        k = 0;
                        for (m = d.length; k < m; k++) if (d[k]) try {
                            d[k].apply(null, l);
                        } catch (n) {
                            e(n);
                        } else d.splice(k, 1), k--, m--;
                        if (f) break;
                        g = g.$parent;
                    } while (g);
                    return h;
                },
                $broadcast: function(a, b) {
                    for (var c = this, d = this, g = {
                        name: a,
                        targetScope: this,
                        preventDefault: function() {
                            g.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    }, f = [ g ].concat(ya.call(arguments, 1)), h, k; c = d; ) {
                        g.currentScope = c;
                        d = c.$$listeners[a] || [];
                        h = 0;
                        for (k = d.length; h < k; h++) if (d[h]) try {
                            d[h].apply(null, f);
                        } catch (l) {
                            e(l);
                        } else d.splice(h, 1), h--, k--;
                        if (!(d = c.$$listenerCount[a] && c.$$childHead || c !== this && c.$$nextSibling)) for (;c !== this && !(d = c.$$nextSibling); ) c = c.$parent;
                    }
                    return g;
                }
            };
            var p = new h();
            return p;
        } ];
    }
    function bd() {
        var b = /^\s*(https?|ftp|mailto|tel|file):/, a = /^\s*(https?|ftp|file):|data:image\//;
        this.aHrefSanitizationWhitelist = function(a) {
            return B(a) ? (b = a, this) : b;
        };
        this.imgSrcSanitizationWhitelist = function(b) {
            return B(b) ? (a = b, this) : a;
        };
        this.$get = function() {
            return function(c, d) {
                var e = d ? a : b, g;
                if (!S || 8 <= S) if (g = sa(c).href, "" !== g && !g.match(e)) return "unsafe:" + g;
                return c;
            };
        };
    }
    function Ae(b) {
        if ("self" === b) return b;
        if (w(b)) {
            if (-1 < b.indexOf("***")) throw ua("iwcard", b);
            b = b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08").replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*");
            return RegExp("^" + b + "$");
        }
        if (cb(b)) return RegExp("^" + b.source + "$");
        throw ua("imatcher");
    }
    function Gc(b) {
        var a = [];
        B(b) && q(b, function(b) {
            a.push(Ae(b));
        });
        return a;
    }
    function ae() {
        this.SCE_CONTEXTS = ga;
        var b = [ "self" ], a = [];
        this.resourceUrlWhitelist = function(a) {
            arguments.length && (b = Gc(a));
            return b;
        };
        this.resourceUrlBlacklist = function(b) {
            arguments.length && (a = Gc(b));
            return a;
        };
        this.$get = [ "$injector", function(c) {
            function d(a) {
                var b = function(a) {
                    this.$$unwrapTrustedValue = function() {
                        return a;
                    };
                };
                a && (b.prototype = new a());
                b.prototype.valueOf = function() {
                    return this.$$unwrapTrustedValue();
                };
                b.prototype.toString = function() {
                    return this.$$unwrapTrustedValue().toString();
                };
                return b;
            }
            var e = function(a) {
                throw ua("unsafe");
            };
            c.has("$sanitize") && (e = c.get("$sanitize"));
            var g = d(), f = {};
            f[ga.HTML] = d(g);
            f[ga.CSS] = d(g);
            f[ga.URL] = d(g);
            f[ga.JS] = d(g);
            f[ga.RESOURCE_URL] = d(f[ga.URL]);
            return {
                trustAs: function(a, b) {
                    var c = f.hasOwnProperty(a) ? f[a] : null;
                    if (!c) throw ua("icontext", a, b);
                    if (null === b || b === s || "" === b) return b;
                    if ("string" !== typeof b) throw ua("itype", a);
                    return new c(b);
                },
                getTrusted: function(c, d) {
                    if (null === d || d === s || "" === d) return d;
                    var g = f.hasOwnProperty(c) ? f[c] : null;
                    if (g && d instanceof g) return d.$$unwrapTrustedValue();
                    if (c === ga.RESOURCE_URL) {
                        var g = sa(d.toString()), m, n, p = !1;
                        m = 0;
                        for (n = b.length; m < n; m++) if ("self" === b[m] ? Ib(g) : b[m].exec(g.href)) {
                            p = !0;
                            break;
                        }
                        if (p) for (m = 0, n = a.length; m < n; m++) if ("self" === a[m] ? Ib(g) : a[m].exec(g.href)) {
                            p = !1;
                            break;
                        }
                        if (p) return d;
                        throw ua("insecurl", d.toString());
                    }
                    if (c === ga.HTML) return e(d);
                    throw ua("unsafe");
                },
                valueOf: function(a) {
                    return a instanceof g ? a.$$unwrapTrustedValue() : a;
                }
            };
        } ];
    }
    function $d() {
        var b = !0;
        this.enabled = function(a) {
            arguments.length && (b = !!a);
            return b;
        };
        this.$get = [ "$parse", "$sniffer", "$sceDelegate", function(a, c, d) {
            if (b && c.msie && 8 > c.msieDocumentMode) throw ua("iequirks");
            var e = ba(ga);
            e.isEnabled = function() {
                return b;
            };
            e.trustAs = d.trustAs;
            e.getTrusted = d.getTrusted;
            e.valueOf = d.valueOf;
            b || (e.trustAs = e.getTrusted = function(a, b) {
                return b;
            }, e.valueOf = Da);
            e.parseAs = function(b, c) {
                var d = a(c);
                return d.literal && d.constant ? d : function(a, c) {
                    return e.getTrusted(b, d(a, c));
                };
            };
            var g = e.parseAs, f = e.getTrusted, h = e.trustAs;
            q(ga, function(a, b) {
                var c = K(b);
                e[Ta("parse_as_" + c)] = function(b) {
                    return g(a, b);
                };
                e[Ta("get_trusted_" + c)] = function(b) {
                    return f(a, b);
                };
                e[Ta("trust_as_" + c)] = function(b) {
                    return h(a, b);
                };
            });
            return e;
        } ];
    }
    function be() {
        this.$get = [ "$window", "$document", function(b, a) {
            var c = {}, d = Y((/android (\d+)/.exec(K((b.navigator || {}).userAgent)) || [])[1]), e = /Boxee/i.test((b.navigator || {}).userAgent), g = a[0] || {}, f = g.documentMode, h, l = /^(Moz|webkit|O|ms)(?=[A-Z])/, k = g.body && g.body.style, m = !1, n = !1;
            if (k) {
                for (var p in k) if (m = l.exec(p)) {
                    h = m[0];
                    h = h.substr(0, 1).toUpperCase() + h.substr(1);
                    break;
                }
                h || (h = "WebkitOpacity" in k && "webkit");
                m = !!("transition" in k || h + "Transition" in k);
                n = !!("animation" in k || h + "Animation" in k);
                !d || m && n || (m = w(g.body.style.webkitTransition), n = w(g.body.style.webkitAnimation));
            }
            return {
                history: !(!b.history || !b.history.pushState || 4 > d || e),
                hashchange: "onhashchange" in b && (!f || 7 < f),
                hasEvent: function(a) {
                    if ("input" == a && 9 == S) return !1;
                    if (E(c[a])) {
                        var b = g.createElement("div");
                        c[a] = "on" + a in b;
                    }
                    return c[a];
                },
                csp: Vb(),
                vendorPrefix: h,
                transitions: m,
                animations: n,
                android: d,
                msie: S,
                msieDocumentMode: f
            };
        } ];
    }
    function de() {
        this.$get = [ "$rootScope", "$browser", "$q", "$exceptionHandler", function(b, a, c, d) {
            function e(e, h, l) {
                var k = c.defer(), m = k.promise, n = B(l) && !l;
                h = a.defer(function() {
                    try {
                        k.resolve(e());
                    } catch (a) {
                        k.reject(a), d(a);
                    } finally {
                        delete g[m.$$timeoutId];
                    }
                    n || b.$apply();
                }, h);
                m.$$timeoutId = h;
                g[h] = k;
                return m;
            }
            var g = {};
            e.cancel = function(b) {
                return b && b.$$timeoutId in g ? (g[b.$$timeoutId].reject("canceled"), delete g[b.$$timeoutId], 
                a.defer.cancel(b.$$timeoutId)) : !1;
            };
            return e;
        } ];
    }
    function sa(b, a) {
        var c = b;
        S && (W.setAttribute("href", c), c = W.href);
        W.setAttribute("href", c);
        return {
            href: W.href,
            protocol: W.protocol ? W.protocol.replace(/:$/, "") : "",
            host: W.host,
            search: W.search ? W.search.replace(/^\?/, "") : "",
            hash: W.hash ? W.hash.replace(/^#/, "") : "",
            hostname: W.hostname,
            port: W.port,
            pathname: "/" === W.pathname.charAt(0) ? W.pathname : "/" + W.pathname
        };
    }
    function Ib(b) {
        b = w(b) ? sa(b) : b;
        return b.protocol === Hc.protocol && b.host === Hc.host;
    }
    function ee() {
        this.$get = aa(O);
    }
    function gc(b) {
        function a(d, e) {
            if (X(d)) {
                var g = {};
                q(d, function(b, c) {
                    g[c] = a(c, b);
                });
                return g;
            }
            return b.factory(d + c, e);
        }
        var c = "Filter";
        this.register = a;
        this.$get = [ "$injector", function(a) {
            return function(b) {
                return a.get(b + c);
            };
        } ];
        a("currency", Ic);
        a("date", Jc);
        a("filter", Be);
        a("json", Ce);
        a("limitTo", De);
        a("lowercase", Ee);
        a("number", Kc);
        a("orderBy", Lc);
        a("uppercase", Fe);
    }
    function Be() {
        return function(b, a, c) {
            if (!M(b)) return b;
            var d = typeof c, e = [];
            e.check = function(a) {
                for (var b = 0; b < e.length; b++) if (!e[b](a)) return !1;
                return !0;
            };
            "function" !== d && (c = "boolean" === d && c ? function(a, b) {
                return Ea.equals(a, b);
            } : function(a, b) {
                if (a && b && "object" === typeof a && "object" === typeof b) {
                    for (var d in a) if ("$" !== d.charAt(0) && Fc.call(a, d) && c(a[d], b[d])) return !0;
                    return !1;
                }
                b = ("" + b).toLowerCase();
                return -1 < ("" + a).toLowerCase().indexOf(b);
            });
            var g = function(a, b) {
                if ("string" == typeof b && "!" === b.charAt(0)) return !g(a, b.substr(1));
                switch (typeof a) {
                  case "boolean":
                  case "number":
                  case "string":
                    return c(a, b);

                  case "object":
                    switch (typeof b) {
                      case "object":
                        return c(a, b);

                      default:
                        for (var d in a) if ("$" !== d.charAt(0) && g(a[d], b)) return !0;
                    }
                    return !1;

                  case "array":
                    for (d = 0; d < a.length; d++) if (g(a[d], b)) return !0;
                    return !1;

                  default:
                    return !1;
                }
            };
            switch (typeof a) {
              case "boolean":
              case "number":
              case "string":
                a = {
                    $: a
                };

              case "object":
                for (var f in a) (function(b) {
                    "undefined" != typeof a[b] && e.push(function(c) {
                        return g("$" == b ? c : c && c[b], a[b]);
                    });
                })(f);
                break;

              case "function":
                e.push(a);
                break;

              default:
                return b;
            }
            d = [];
            for (f = 0; f < b.length; f++) {
                var h = b[f];
                e.check(h) && d.push(h);
            }
            return d;
        };
    }
    function Ic(b) {
        var a = b.NUMBER_FORMATS;
        return function(b, d) {
            E(d) && (d = a.CURRENCY_SYM);
            return Mc(b, a.PATTERNS[1], a.GROUP_SEP, a.DECIMAL_SEP, 2).replace(/\u00A4/g, d);
        };
    }
    function Kc(b) {
        var a = b.NUMBER_FORMATS;
        return function(b, d) {
            return Mc(b, a.PATTERNS[0], a.GROUP_SEP, a.DECIMAL_SEP, d);
        };
    }
    function Mc(b, a, c, d, e) {
        if (null == b || !isFinite(b) || X(b)) return "";
        var g = 0 > b;
        b = Math.abs(b);
        var f = b + "", h = "", l = [], k = !1;
        if (-1 !== f.indexOf("e")) {
            var m = f.match(/([\d\.]+)e(-?)(\d+)/);
            m && "-" == m[2] && m[3] > e + 1 ? f = "0" : (h = f, k = !0);
        }
        if (k) 0 < e && (-1 < b && 1 > b) && (h = b.toFixed(e)); else {
            f = (f.split(Nc)[1] || "").length;
            E(e) && (e = Math.min(Math.max(a.minFrac, f), a.maxFrac));
            f = Math.pow(10, e);
            b = Math.round(b * f) / f;
            b = ("" + b).split(Nc);
            f = b[0];
            b = b[1] || "";
            var m = 0, n = a.lgSize, p = a.gSize;
            if (f.length >= n + p) for (m = f.length - n, k = 0; k < m; k++) 0 === (m - k) % p && 0 !== k && (h += c), 
            h += f.charAt(k);
            for (k = m; k < f.length; k++) 0 === (f.length - k) % n && 0 !== k && (h += c), 
            h += f.charAt(k);
            for (;b.length < e; ) b += "0";
            e && "0" !== e && (h += d + b.substr(0, e));
        }
        l.push(g ? a.negPre : a.posPre);
        l.push(h);
        l.push(g ? a.negSuf : a.posSuf);
        return l.join("");
    }
    function Ob(b, a, c) {
        var d = "";
        0 > b && (d = "-", b = -b);
        for (b = "" + b; b.length < a; ) b = "0" + b;
        c && (b = b.substr(b.length - a));
        return d + b;
    }
    function $(b, a, c, d) {
        c = c || 0;
        return function(e) {
            e = e["get" + b]();
            if (0 < c || e > -c) e += c;
            0 === e && -12 == c && (e = 12);
            return Ob(e, a, d);
        };
    }
    function pb(b, a) {
        return function(c, d) {
            var e = c["get" + b](), g = Fa(a ? "SHORT" + b : b);
            return d[g][e];
        };
    }
    function Jc(b) {
        function a(a) {
            var b;
            if (b = a.match(c)) {
                a = new Date(0);
                var g = 0, f = 0, h = b[8] ? a.setUTCFullYear : a.setFullYear, l = b[8] ? a.setUTCHours : a.setHours;
                b[9] && (g = Y(b[9] + b[10]), f = Y(b[9] + b[11]));
                h.call(a, Y(b[1]), Y(b[2]) - 1, Y(b[3]));
                g = Y(b[4] || 0) - g;
                f = Y(b[5] || 0) - f;
                h = Y(b[6] || 0);
                b = Math.round(1e3 * parseFloat("0." + (b[7] || 0)));
                l.call(a, g, f, h, b);
            }
            return a;
        }
        var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(c, e) {
            var g = "", f = [], h, l;
            e = e || "mediumDate";
            e = b.DATETIME_FORMATS[e] || e;
            w(c) && (c = Ge.test(c) ? Y(c) : a(c));
            vb(c) && (c = new Date(c));
            if (!Na(c)) return c;
            for (;e; ) (l = He.exec(e)) ? (f = f.concat(ya.call(l, 1)), e = f.pop()) : (f.push(e), 
            e = null);
            q(f, function(a) {
                h = Ie[a];
                g += h ? h(c, b.DATETIME_FORMATS) : a.replace(/(^'|'$)/g, "").replace(/''/g, "'");
            });
            return g;
        };
    }
    function Ce() {
        return function(b) {
            return qa(b, !0);
        };
    }
    function De() {
        return function(b, a) {
            if (!M(b) && !w(b)) return b;
            a = Y(a);
            if (w(b)) return a ? 0 <= a ? b.slice(0, a) : b.slice(a, b.length) : "";
            var c = [], d, e;
            a > b.length ? a = b.length : a < -b.length && (a = -b.length);
            0 < a ? (d = 0, e = a) : (d = b.length + a, e = b.length);
            for (;d < e; d++) c.push(b[d]);
            return c;
        };
    }
    function Lc(b) {
        return function(a, c, d) {
            function e(a, b) {
                return Qa(b) ? function(b, c) {
                    return a(c, b);
                } : a;
            }
            function g(a, b) {
                var c = typeof a, d = typeof b;
                return c == d ? ("string" == c && (a = a.toLowerCase(), b = b.toLowerCase()), a === b ? 0 : a < b ? -1 : 1) : c < d ? -1 : 1;
            }
            if (!M(a) || !c) return a;
            c = M(c) ? c : [ c ];
            c = Uc(c, function(a) {
                var c = !1, d = a || Da;
                if (w(a)) {
                    if ("+" == a.charAt(0) || "-" == a.charAt(0)) c = "-" == a.charAt(0), a = a.substring(1);
                    d = b(a);
                    if (d.constant) {
                        var f = d();
                        return e(function(a, b) {
                            return g(a[f], b[f]);
                        }, c);
                    }
                }
                return e(function(a, b) {
                    return g(d(a), d(b));
                }, c);
            });
            for (var f = [], h = 0; h < a.length; h++) f.push(a[h]);
            return f.sort(e(function(a, b) {
                for (var d = 0; d < c.length; d++) {
                    var e = c[d](a, b);
                    if (0 !== e) return e;
                }
                return 0;
            }, d));
        };
    }
    function va(b) {
        P(b) && (b = {
            link: b
        });
        b.restrict = b.restrict || "AC";
        return aa(b);
    }
    function Oc(b, a, c, d) {
        function e(a, c) {
            c = c ? "-" + fb(c, "-") : "";
            d.removeClass(b, (a ? qb : rb) + c);
            d.addClass(b, (a ? rb : qb) + c);
        }
        var g = this, f = b.parent().controller("form") || sb, h = 0, l = g.$error = {}, k = [];
        g.$name = a.name || a.ngForm;
        g.$dirty = !1;
        g.$pristine = !0;
        g.$valid = !0;
        g.$invalid = !1;
        f.$addControl(g);
        b.addClass(La);
        e(!0);
        g.$addControl = function(a) {
            Aa(a.$name, "input");
            k.push(a);
            a.$name && (g[a.$name] = a);
        };
        g.$removeControl = function(a) {
            a.$name && g[a.$name] === a && delete g[a.$name];
            q(l, function(b, c) {
                g.$setValidity(c, !0, a);
            });
            Oa(k, a);
        };
        g.$setValidity = function(a, b, c) {
            var d = l[a];
            if (b) d && (Oa(d, c), d.length || (h--, h || (e(b), g.$valid = !0, g.$invalid = !1), 
            l[a] = !1, e(!0, a), f.$setValidity(a, !0, g))); else {
                h || e(b);
                if (d) {
                    if (-1 != db(d, c)) return;
                } else l[a] = d = [], h++, e(!1, a), f.$setValidity(a, !1, g);
                d.push(c);
                g.$valid = !1;
                g.$invalid = !0;
            }
        };
        g.$setDirty = function() {
            d.removeClass(b, La);
            d.addClass(b, tb);
            g.$dirty = !0;
            g.$pristine = !1;
            f.$setDirty();
        };
        g.$setPristine = function() {
            d.removeClass(b, tb);
            d.addClass(b, La);
            g.$dirty = !1;
            g.$pristine = !0;
            q(k, function(a) {
                a.$setPristine();
            });
        };
    }
    function pa(b, a, c, d) {
        b.$setValidity(a, c);
        return c ? d : s;
    }
    function Je(b, a, c) {
        var d = c.prop("validity");
        X(d) && b.$parsers.push(function(c) {
            if (b.$error[a] || !(d.badInput || d.customError || d.typeMismatch) || d.valueMissing) return c;
            b.$setValidity(a, !1);
        });
    }
    function ub(b, a, c, d, e, g) {
        var f = a.prop("validity");
        if (!e.android) {
            var h = !1;
            a.on("compositionstart", function(a) {
                h = !0;
            });
            a.on("compositionend", function() {
                h = !1;
                l();
            });
        }
        var l = function() {
            if (!h) {
                var e = a.val();
                Qa(c.ngTrim || "T") && (e = ca(e));
                if (d.$viewValue !== e || f && "" === e && !f.valueMissing) b.$$phase ? d.$setViewValue(e) : b.$apply(function() {
                    d.$setViewValue(e);
                });
            }
        };
        if (e.hasEvent("input")) a.on("input", l); else {
            var k, m = function() {
                k || (k = g.defer(function() {
                    l();
                    k = null;
                }));
            };
            a.on("keydown", function(a) {
                a = a.keyCode;
                91 === a || (15 < a && 19 > a || 37 <= a && 40 >= a) || m();
            });
            if (e.hasEvent("paste")) a.on("paste cut", m);
        }
        a.on("change", l);
        d.$render = function() {
            a.val(d.$isEmpty(d.$viewValue) ? "" : d.$viewValue);
        };
        var n = c.ngPattern;
        n && ((e = n.match(/^\/(.*)\/([gim]*)$/)) ? (n = RegExp(e[1], e[2]), e = function(a) {
            return pa(d, "pattern", d.$isEmpty(a) || n.test(a), a);
        }) : e = function(c) {
            var e = b.$eval(n);
            if (!e || !e.test) throw t("ngPattern")("noregexp", n, e, ha(a));
            return pa(d, "pattern", d.$isEmpty(c) || e.test(c), c);
        }, d.$formatters.push(e), d.$parsers.push(e));
        if (c.ngMinlength) {
            var p = Y(c.ngMinlength);
            e = function(a) {
                return pa(d, "minlength", d.$isEmpty(a) || a.length >= p, a);
            };
            d.$parsers.push(e);
            d.$formatters.push(e);
        }
        if (c.ngMaxlength) {
            var r = Y(c.ngMaxlength);
            e = function(a) {
                return pa(d, "maxlength", d.$isEmpty(a) || a.length <= r, a);
            };
            d.$parsers.push(e);
            d.$formatters.push(e);
        }
    }
    function Pb(b, a) {
        b = "ngClass" + b;
        return [ "$animate", function(c) {
            function d(a, b) {
                var c = [], d = 0;
                a: for (;d < a.length; d++) {
                    for (var e = a[d], m = 0; m < b.length; m++) if (e == b[m]) continue a;
                    c.push(e);
                }
                return c;
            }
            function e(a) {
                if (!M(a)) {
                    if (w(a)) return a.split(" ");
                    if (X(a)) {
                        var b = [];
                        q(a, function(a, c) {
                            a && b.push(c);
                        });
                        return b;
                    }
                }
                return a;
            }
            return {
                restrict: "AC",
                link: function(g, f, h) {
                    function l(a, b) {
                        var c = f.data("$classCounts") || {}, d = [];
                        q(a, function(a) {
                            if (0 < b || c[a]) c[a] = (c[a] || 0) + b, c[a] === +(0 < b) && d.push(a);
                        });
                        f.data("$classCounts", c);
                        return d.join(" ");
                    }
                    function k(b) {
                        if (!0 === a || g.$index % 2 === a) {
                            var k = e(b || []);
                            if (!m) {
                                var r = l(k, 1);
                                h.$addClass(r);
                            } else if (!xa(b, m)) {
                                var q = e(m), r = d(k, q), k = d(q, k), k = l(k, -1), r = l(r, 1);
                                0 === r.length ? c.removeClass(f, k) : 0 === k.length ? c.addClass(f, r) : c.setClass(f, r, k);
                            }
                        }
                        m = ba(b);
                    }
                    var m;
                    g.$watch(h[b], k, !0);
                    h.$observe("class", function(a) {
                        k(g.$eval(h[b]));
                    });
                    "ngClass" !== b && g.$watch("$index", function(c, d) {
                        var f = c & 1;
                        if (f !== d & 1) {
                            var k = e(g.$eval(h[b]));
                            f === a ? (f = l(k, 1), h.$addClass(f)) : (f = l(k, -1), h.$removeClass(f));
                        }
                    });
                }
            };
        } ];
    }
    var K = function(b) {
        return w(b) ? b.toLowerCase() : b;
    }, Fc = Object.prototype.hasOwnProperty, Fa = function(b) {
        return w(b) ? b.toUpperCase() : b;
    }, S, y, Ga, ya = [].slice, Ke = [].push, wa = Object.prototype.toString, Pa = t("ng"), Ea = O.angular || (O.angular = {}), Sa, Ka, ka = [ "0", "0", "0" ];
    S = Y((/msie (\d+)/.exec(K(navigator.userAgent)) || [])[1]);
    isNaN(S) && (S = Y((/trident\/.*; rv:(\d+)/.exec(K(navigator.userAgent)) || [])[1]));
    C.$inject = [];
    Da.$inject = [];
    var ca = function() {
        return String.prototype.trim ? function(b) {
            return w(b) ? b.trim() : b;
        } : function(b) {
            return w(b) ? b.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : b;
        };
    }();
    Ka = 9 > S ? function(b) {
        b = b.nodeName ? b : b[0];
        return b.scopeName && "HTML" != b.scopeName ? Fa(b.scopeName + ":" + b.nodeName) : b.nodeName;
    } : function(b) {
        return b.nodeName ? b.nodeName : b[0].nodeName;
    };
    var Xc = /[A-Z]/g, $c = {
        full: "1.2.16",
        major: 1,
        minor: 2,
        dot: 16,
        codeName: "badger-enumeration"
    }, Ua = N.cache = {}, gb = N.expando = "ng-" + new Date().getTime(), me = 1, Pc = O.document.addEventListener ? function(b, a, c) {
        b.addEventListener(a, c, !1);
    } : function(b, a, c) {
        b.attachEvent("on" + a, c);
    }, Fb = O.document.removeEventListener ? function(b, a, c) {
        b.removeEventListener(a, c, !1);
    } : function(b, a, c) {
        b.detachEvent("on" + a, c);
    };
    N._data = function(b) {
        return this.cache[b[this.expando]] || {};
    };
    var he = /([\:\-\_]+(.))/g, ie = /^moz([A-Z])/, Bb = t("jqLite"), je = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, Cb = /<|&#?\w+;/, ke = /<([\w:]+)/, le = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, ea = {
        option: [ 1, '<select multiple="multiple">', "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    ea.optgroup = ea.option;
    ea.tbody = ea.tfoot = ea.colgroup = ea.caption = ea.thead;
    ea.th = ea.td;
    var Ja = N.prototype = {
        ready: function(b) {
            function a() {
                c || (c = !0, b());
            }
            var c = !1;
            "complete" === U.readyState ? setTimeout(a) : (this.on("DOMContentLoaded", a), N(O).on("load", a));
        },
        toString: function() {
            var b = [];
            q(this, function(a) {
                b.push("" + a);
            });
            return "[" + b.join(", ") + "]";
        },
        eq: function(b) {
            return 0 <= b ? y(this[b]) : y(this[this.length + b]);
        },
        length: 0,
        push: Ke,
        sort: [].sort,
        splice: [].splice
    }, kb = {};
    q("multiple selected checked disabled readOnly required open".split(" "), function(b) {
        kb[K(b)] = b;
    });
    var nc = {};
    q("input select option textarea button form details".split(" "), function(b) {
        nc[Fa(b)] = !0;
    });
    q({
        data: jc,
        inheritedData: jb,
        scope: function(b) {
            return y(b).data("$scope") || jb(b.parentNode || b, [ "$isolateScope", "$scope" ]);
        },
        isolateScope: function(b) {
            return y(b).data("$isolateScope") || y(b).data("$isolateScopeNoTemplate");
        },
        controller: kc,
        injector: function(b) {
            return jb(b, "$injector");
        },
        removeAttr: function(b, a) {
            b.removeAttribute(a);
        },
        hasClass: Gb,
        css: function(b, a, c) {
            a = Ta(a);
            if (B(c)) b.style[a] = c; else {
                var d;
                8 >= S && (d = b.currentStyle && b.currentStyle[a], "" === d && (d = "auto"));
                d = d || b.style[a];
                8 >= S && (d = "" === d ? s : d);
                return d;
            }
        },
        attr: function(b, a, c) {
            var d = K(a);
            if (kb[d]) if (B(c)) c ? (b[a] = !0, b.setAttribute(a, d)) : (b[a] = !1, b.removeAttribute(d)); else return b[a] || (b.attributes.getNamedItem(a) || C).specified ? d : s; else if (B(c)) b.setAttribute(a, c); else if (b.getAttribute) return b = b.getAttribute(a, 2), 
            null === b ? s : b;
        },
        prop: function(b, a, c) {
            if (B(c)) b[a] = c; else return b[a];
        },
        text: function() {
            function b(b, d) {
                var e = a[b.nodeType];
                if (E(d)) return e ? b[e] : "";
                b[e] = d;
            }
            var a = [];
            9 > S ? (a[1] = "innerText", a[3] = "nodeValue") : a[1] = a[3] = "textContent";
            b.$dv = "";
            return b;
        }(),
        val: function(b, a) {
            if (E(a)) {
                if ("SELECT" === Ka(b) && b.multiple) {
                    var c = [];
                    q(b.options, function(a) {
                        a.selected && c.push(a.value || a.text);
                    });
                    return 0 === c.length ? null : c;
                }
                return b.value;
            }
            b.value = a;
        },
        html: function(b, a) {
            if (E(a)) return b.innerHTML;
            for (var c = 0, d = b.childNodes; c < d.length; c++) Ha(d[c]);
            b.innerHTML = a;
        },
        empty: lc
    }, function(b, a) {
        N.prototype[a] = function(a, d) {
            var e, g;
            if (b !== lc && (2 == b.length && b !== Gb && b !== kc ? a : d) === s) {
                if (X(a)) {
                    for (e = 0; e < this.length; e++) if (b === jc) b(this[e], a); else for (g in a) b(this[e], g, a[g]);
                    return this;
                }
                e = b.$dv;
                g = e === s ? Math.min(this.length, 1) : this.length;
                for (var f = 0; f < g; f++) {
                    var h = b(this[f], a, d);
                    e = e ? e + h : h;
                }
                return e;
            }
            for (e = 0; e < this.length; e++) b(this[e], a, d);
            return this;
        };
    });
    q({
        removeData: hc,
        dealoc: Ha,
        on: function a(c, d, e, g) {
            if (B(g)) throw Bb("onargs");
            var f = la(c, "events"), h = la(c, "handle");
            f || la(c, "events", f = {});
            h || la(c, "handle", h = ne(c, f));
            q(d.split(" "), function(d) {
                var g = f[d];
                if (!g) {
                    if ("mouseenter" == d || "mouseleave" == d) {
                        var m = U.body.contains || U.body.compareDocumentPosition ? function(a, c) {
                            var d = 9 === a.nodeType ? a.documentElement : a, e = c && c.parentNode;
                            return a === e || !!(e && 1 === e.nodeType && (d.contains ? d.contains(e) : a.compareDocumentPosition && a.compareDocumentPosition(e) & 16));
                        } : function(a, c) {
                            if (c) for (;c = c.parentNode; ) if (c === a) return !0;
                            return !1;
                        };
                        f[d] = [];
                        a(c, {
                            mouseleave: "mouseout",
                            mouseenter: "mouseover"
                        }[d], function(a) {
                            var c = a.relatedTarget;
                            c && (c === this || m(this, c)) || h(a, d);
                        });
                    } else Pc(c, d, h), f[d] = [];
                    g = f[d];
                }
                g.push(e);
            });
        },
        off: ic,
        one: function(a, c, d) {
            a = y(a);
            a.on(c, function g() {
                a.off(c, d);
                a.off(c, g);
            });
            a.on(c, d);
        },
        replaceWith: function(a, c) {
            var d, e = a.parentNode;
            Ha(a);
            q(new N(c), function(c) {
                d ? e.insertBefore(c, d.nextSibling) : e.replaceChild(c, a);
                d = c;
            });
        },
        children: function(a) {
            var c = [];
            q(a.childNodes, function(a) {
                1 === a.nodeType && c.push(a);
            });
            return c;
        },
        contents: function(a) {
            return a.contentDocument || a.childNodes || [];
        },
        append: function(a, c) {
            q(new N(c), function(c) {
                1 !== a.nodeType && 11 !== a.nodeType || a.appendChild(c);
            });
        },
        prepend: function(a, c) {
            if (1 === a.nodeType) {
                var d = a.firstChild;
                q(new N(c), function(c) {
                    a.insertBefore(c, d);
                });
            }
        },
        wrap: function(a, c) {
            c = y(c)[0];
            var d = a.parentNode;
            d && d.replaceChild(c, a);
            c.appendChild(a);
        },
        remove: function(a) {
            Ha(a);
            var c = a.parentNode;
            c && c.removeChild(a);
        },
        after: function(a, c) {
            var d = a, e = a.parentNode;
            q(new N(c), function(a) {
                e.insertBefore(a, d.nextSibling);
                d = a;
            });
        },
        addClass: ib,
        removeClass: hb,
        toggleClass: function(a, c, d) {
            c && q(c.split(" "), function(c) {
                var g = d;
                E(g) && (g = !Gb(a, c));
                (g ? ib : hb)(a, c);
            });
        },
        parent: function(a) {
            return (a = a.parentNode) && 11 !== a.nodeType ? a : null;
        },
        next: function(a) {
            if (a.nextElementSibling) return a.nextElementSibling;
            for (a = a.nextSibling; null != a && 1 !== a.nodeType; ) a = a.nextSibling;
            return a;
        },
        find: function(a, c) {
            return a.getElementsByTagName ? a.getElementsByTagName(c) : [];
        },
        clone: Eb,
        triggerHandler: function(a, c, d) {
            c = (la(a, "events") || {})[c];
            d = d || [];
            var e = [ {
                preventDefault: C,
                stopPropagation: C
            } ];
            q(c, function(c) {
                c.apply(a, e.concat(d));
            });
        }
    }, function(a, c) {
        N.prototype[c] = function(c, e, g) {
            for (var f, h = 0; h < this.length; h++) E(f) ? (f = a(this[h], c, e, g), B(f) && (f = y(f))) : Db(f, a(this[h], c, e, g));
            return B(f) ? f : this;
        };
        N.prototype.bind = N.prototype.on;
        N.prototype.unbind = N.prototype.off;
    });
    Va.prototype = {
        put: function(a, c) {
            this[Ia(a)] = c;
        },
        get: function(a) {
            return this[Ia(a)];
        },
        remove: function(a) {
            var c = this[a = Ia(a)];
            delete this[a];
            return c;
        }
    };
    var pe = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, qe = /,/, re = /^\s*(_?)(\S+?)\1\s*$/, oe = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, Wa = t("$injector"), Le = t("$animate"), Ld = [ "$provide", function(a) {
        this.$$selectors = {};
        this.register = function(c, d) {
            var e = c + "-animation";
            if (c && "." != c.charAt(0)) throw Le("notcsel", c);
            this.$$selectors[c.substr(1)] = e;
            a.factory(e, d);
        };
        this.classNameFilter = function(a) {
            1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null);
            return this.$$classNameFilter;
        };
        this.$get = [ "$timeout", "$$asyncCallback", function(a, d) {
            return {
                enter: function(a, c, f, h) {
                    f ? f.after(a) : (c && c[0] || (c = f.parent()), c.append(a));
                    h && d(h);
                },
                leave: function(a, c) {
                    a.remove();
                    c && d(c);
                },
                move: function(a, c, d, h) {
                    this.enter(a, c, d, h);
                },
                addClass: function(a, c, f) {
                    c = w(c) ? c : M(c) ? c.join(" ") : "";
                    q(a, function(a) {
                        ib(a, c);
                    });
                    f && d(f);
                },
                removeClass: function(a, c, f) {
                    c = w(c) ? c : M(c) ? c.join(" ") : "";
                    q(a, function(a) {
                        hb(a, c);
                    });
                    f && d(f);
                },
                setClass: function(a, c, f, h) {
                    q(a, function(a) {
                        ib(a, c);
                        hb(a, f);
                    });
                    h && d(h);
                },
                enabled: C
            };
        } ];
    } ], ja = t("$compile");
    cc.$inject = [ "$provide", "$$sanitizeUriProvider" ];
    var te = /^(x[\:\-_]|data[\:\-_])/i, vc = t("$interpolate"), Me = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, we = {
        http: 80,
        https: 443,
        ftp: 21
    }, Kb = t("$location");
    Ac.prototype = Lb.prototype = zc.prototype = {
        $$html5: !1,
        $$replace: !1,
        absUrl: nb("$$absUrl"),
        url: function(a, c) {
            if (E(a)) return this.$$url;
            var d = Me.exec(a);
            d[1] && this.path(decodeURIComponent(d[1]));
            (d[2] || d[1]) && this.search(d[3] || "");
            this.hash(d[5] || "", c);
            return this;
        },
        protocol: nb("$$protocol"),
        host: nb("$$host"),
        port: nb("$$port"),
        path: Bc("$$path", function(a) {
            return "/" == a.charAt(0) ? a : "/" + a;
        }),
        search: function(a, c) {
            switch (arguments.length) {
              case 0:
                return this.$$search;

              case 1:
                if (w(a)) this.$$search = Yb(a); else if (X(a)) this.$$search = a; else throw Kb("isrcharg");
                break;

              default:
                E(c) || null === c ? delete this.$$search[a] : this.$$search[a] = c;
            }
            this.$$compose();
            return this;
        },
        hash: Bc("$$hash", Da),
        replace: function() {
            this.$$replace = !0;
            return this;
        }
    };
    var Ba = t("$parse"), Ec = {}, ta, Ma = {
        "null": function() {
            return null;
        },
        "true": function() {
            return !0;
        },
        "false": function() {
            return !1;
        },
        undefined: C,
        "+": function(a, c, d, e) {
            d = d(a, c);
            e = e(a, c);
            return B(d) ? B(e) ? d + e : d : B(e) ? e : s;
        },
        "-": function(a, c, d, e) {
            d = d(a, c);
            e = e(a, c);
            return (B(d) ? d : 0) - (B(e) ? e : 0);
        },
        "*": function(a, c, d, e) {
            return d(a, c) * e(a, c);
        },
        "/": function(a, c, d, e) {
            return d(a, c) / e(a, c);
        },
        "%": function(a, c, d, e) {
            return d(a, c) % e(a, c);
        },
        "^": function(a, c, d, e) {
            return d(a, c) ^ e(a, c);
        },
        "=": C,
        "===": function(a, c, d, e) {
            return d(a, c) === e(a, c);
        },
        "!==": function(a, c, d, e) {
            return d(a, c) !== e(a, c);
        },
        "==": function(a, c, d, e) {
            return d(a, c) == e(a, c);
        },
        "!=": function(a, c, d, e) {
            return d(a, c) != e(a, c);
        },
        "<": function(a, c, d, e) {
            return d(a, c) < e(a, c);
        },
        ">": function(a, c, d, e) {
            return d(a, c) > e(a, c);
        },
        "<=": function(a, c, d, e) {
            return d(a, c) <= e(a, c);
        },
        ">=": function(a, c, d, e) {
            return d(a, c) >= e(a, c);
        },
        "&&": function(a, c, d, e) {
            return d(a, c) && e(a, c);
        },
        "||": function(a, c, d, e) {
            return d(a, c) || e(a, c);
        },
        "&": function(a, c, d, e) {
            return d(a, c) & e(a, c);
        },
        "|": function(a, c, d, e) {
            return e(a, c)(a, c, d(a, c));
        },
        "!": function(a, c, d) {
            return !d(a, c);
        }
    }, Ne = {
        n: "\n",
        f: "\f",
        r: "\r",
        t: "	",
        v: "",
        "'": "'",
        '"': '"'
    }, Nb = function(a) {
        this.options = a;
    };
    Nb.prototype = {
        constructor: Nb,
        lex: function(a) {
            this.text = a;
            this.index = 0;
            this.ch = s;
            this.lastCh = ":";
            this.tokens = [];
            var c;
            for (a = []; this.index < this.text.length; ) {
                this.ch = this.text.charAt(this.index);
                if (this.is("\"'")) this.readString(this.ch); else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek())) this.readNumber(); else if (this.isIdent(this.ch)) this.readIdent(), 
                this.was("{,") && ("{" === a[0] && (c = this.tokens[this.tokens.length - 1])) && (c.json = -1 === c.text.indexOf(".")); else if (this.is("(){}[].,;:?")) this.tokens.push({
                    index: this.index,
                    text: this.ch,
                    json: this.was(":[,") && this.is("{[") || this.is("}]:,")
                }), this.is("{[") && a.unshift(this.ch), this.is("}]") && a.shift(), this.index++; else if (this.isWhitespace(this.ch)) {
                    this.index++;
                    continue;
                } else {
                    var d = this.ch + this.peek(), e = d + this.peek(2), g = Ma[this.ch], f = Ma[d], h = Ma[e];
                    h ? (this.tokens.push({
                        index: this.index,
                        text: e,
                        fn: h
                    }), this.index += 3) : f ? (this.tokens.push({
                        index: this.index,
                        text: d,
                        fn: f
                    }), this.index += 2) : g ? (this.tokens.push({
                        index: this.index,
                        text: this.ch,
                        fn: g,
                        json: this.was("[,:") && this.is("+-")
                    }), this.index += 1) : this.throwError("Unexpected next character ", this.index, this.index + 1);
                }
                this.lastCh = this.ch;
            }
            return this.tokens;
        },
        is: function(a) {
            return -1 !== a.indexOf(this.ch);
        },
        was: function(a) {
            return -1 !== a.indexOf(this.lastCh);
        },
        peek: function(a) {
            a = a || 1;
            return this.index + a < this.text.length ? this.text.charAt(this.index + a) : !1;
        },
        isNumber: function(a) {
            return "0" <= a && "9" >= a;
        },
        isWhitespace: function(a) {
            return " " === a || "\r" === a || "	" === a || "\n" === a || "" === a || " " === a;
        },
        isIdent: function(a) {
            return "a" <= a && "z" >= a || "A" <= a && "Z" >= a || "_" === a || "$" === a;
        },
        isExpOperator: function(a) {
            return "-" === a || "+" === a || this.isNumber(a);
        },
        throwError: function(a, c, d) {
            d = d || this.index;
            c = B(c) ? "s " + c + "-" + this.index + " [" + this.text.substring(c, d) + "]" : " " + d;
            throw Ba("lexerr", a, c, this.text);
        },
        readNumber: function() {
            for (var a = "", c = this.index; this.index < this.text.length; ) {
                var d = K(this.text.charAt(this.index));
                if ("." == d || this.isNumber(d)) a += d; else {
                    var e = this.peek();
                    if ("e" == d && this.isExpOperator(e)) a += d; else if (this.isExpOperator(d) && e && this.isNumber(e) && "e" == a.charAt(a.length - 1)) a += d; else if (!this.isExpOperator(d) || e && this.isNumber(e) || "e" != a.charAt(a.length - 1)) break; else this.throwError("Invalid exponent");
                }
                this.index++;
            }
            a *= 1;
            this.tokens.push({
                index: c,
                text: a,
                json: !0,
                fn: function() {
                    return a;
                }
            });
        },
        readIdent: function() {
            for (var a = this, c = "", d = this.index, e, g, f, h; this.index < this.text.length; ) {
                h = this.text.charAt(this.index);
                if ("." === h || this.isIdent(h) || this.isNumber(h)) "." === h && (e = this.index), 
                c += h; else break;
                this.index++;
            }
            if (e) for (g = this.index; g < this.text.length; ) {
                h = this.text.charAt(g);
                if ("(" === h) {
                    f = c.substr(e - d + 1);
                    c = c.substr(0, e - d);
                    this.index = g;
                    break;
                }
                if (this.isWhitespace(h)) g++; else break;
            }
            d = {
                index: d,
                text: c
            };
            if (Ma.hasOwnProperty(c)) d.fn = Ma[c], d.json = Ma[c]; else {
                var l = Dc(c, this.options, this.text);
                d.fn = D(function(a, c) {
                    return l(a, c);
                }, {
                    assign: function(d, e) {
                        return ob(d, c, e, a.text, a.options);
                    }
                });
            }
            this.tokens.push(d);
            f && (this.tokens.push({
                index: e,
                text: ".",
                json: !1
            }), this.tokens.push({
                index: e + 1,
                text: f,
                json: !1
            }));
        },
        readString: function(a) {
            var c = this.index;
            this.index++;
            for (var d = "", e = a, g = !1; this.index < this.text.length; ) {
                var f = this.text.charAt(this.index), e = e + f;
                if (g) "u" === f ? (f = this.text.substring(this.index + 1, this.index + 5), f.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + f + "]"), 
                this.index += 4, d += String.fromCharCode(parseInt(f, 16))) : d = (g = Ne[f]) ? d + g : d + f, 
                g = !1; else if ("\\" === f) g = !0; else {
                    if (f === a) {
                        this.index++;
                        this.tokens.push({
                            index: c,
                            text: e,
                            string: d,
                            json: !0,
                            fn: function() {
                                return d;
                            }
                        });
                        return;
                    }
                    d += f;
                }
                this.index++;
            }
            this.throwError("Unterminated quote", c);
        }
    };
    var $a = function(a, c, d) {
        this.lexer = a;
        this.$filter = c;
        this.options = d;
    };
    $a.ZERO = D(function() {
        return 0;
    }, {
        constant: !0
    });
    $a.prototype = {
        constructor: $a,
        parse: function(a, c) {
            this.text = a;
            this.json = c;
            this.tokens = this.lexer.lex(a);
            c && (this.assignment = this.logicalOR, this.functionCall = this.fieldAccess = this.objectIndex = this.filterChain = function() {
                this.throwError("is not valid json", {
                    text: a,
                    index: 0
                });
            });
            var d = c ? this.primary() : this.statements();
            0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]);
            d.literal = !!d.literal;
            d.constant = !!d.constant;
            return d;
        },
        primary: function() {
            var a;
            if (this.expect("(")) a = this.filterChain(), this.consume(")"); else if (this.expect("[")) a = this.arrayDeclaration(); else if (this.expect("{")) a = this.object(); else {
                var c = this.expect();
                (a = c.fn) || this.throwError("not a primary expression", c);
                c.json && (a.constant = !0, a.literal = !0);
            }
            for (var d; c = this.expect("(", "[", "."); ) "(" === c.text ? (a = this.functionCall(a, d), 
            d = null) : "[" === c.text ? (d = a, a = this.objectIndex(a)) : "." === c.text ? (d = a, 
            a = this.fieldAccess(a)) : this.throwError("IMPOSSIBLE");
            return a;
        },
        throwError: function(a, c) {
            throw Ba("syntax", c.text, a, c.index + 1, this.text, this.text.substring(c.index));
        },
        peekToken: function() {
            if (0 === this.tokens.length) throw Ba("ueoe", this.text);
            return this.tokens[0];
        },
        peek: function(a, c, d, e) {
            if (0 < this.tokens.length) {
                var g = this.tokens[0], f = g.text;
                if (f === a || f === c || f === d || f === e || !(a || c || d || e)) return g;
            }
            return !1;
        },
        expect: function(a, c, d, e) {
            return (a = this.peek(a, c, d, e)) ? (this.json && !a.json && this.throwError("is not valid json", a), 
            this.tokens.shift(), a) : !1;
        },
        consume: function(a) {
            this.expect(a) || this.throwError("is unexpected, expecting [" + a + "]", this.peek());
        },
        unaryFn: function(a, c) {
            return D(function(d, e) {
                return a(d, e, c);
            }, {
                constant: c.constant
            });
        },
        ternaryFn: function(a, c, d) {
            return D(function(e, g) {
                return a(e, g) ? c(e, g) : d(e, g);
            }, {
                constant: a.constant && c.constant && d.constant
            });
        },
        binaryFn: function(a, c, d) {
            return D(function(e, g) {
                return c(e, g, a, d);
            }, {
                constant: a.constant && d.constant
            });
        },
        statements: function() {
            for (var a = []; ;) if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && a.push(this.filterChain()), 
            !this.expect(";")) return 1 === a.length ? a[0] : function(c, d) {
                for (var e, g = 0; g < a.length; g++) {
                    var f = a[g];
                    f && (e = f(c, d));
                }
                return e;
            };
        },
        filterChain: function() {
            for (var a = this.expression(), c; ;) if (c = this.expect("|")) a = this.binaryFn(a, c.fn, this.filter()); else return a;
        },
        filter: function() {
            for (var a = this.expect(), c = this.$filter(a.text), d = []; ;) if (a = this.expect(":")) d.push(this.expression()); else {
                var e = function(a, e, h) {
                    h = [ h ];
                    for (var l = 0; l < d.length; l++) h.push(d[l](a, e));
                    return c.apply(a, h);
                };
                return function() {
                    return e;
                };
            }
        },
        expression: function() {
            return this.assignment();
        },
        assignment: function() {
            var a = this.ternary(), c, d;
            return (d = this.expect("=")) ? (a.assign || this.throwError("implies assignment but [" + this.text.substring(0, d.index) + "] can not be assigned to", d), 
            c = this.ternary(), function(d, g) {
                return a.assign(d, c(d, g), g);
            }) : a;
        },
        ternary: function() {
            var a = this.logicalOR(), c, d;
            if (this.expect("?")) {
                c = this.ternary();
                if (d = this.expect(":")) return this.ternaryFn(a, c, this.ternary());
                this.throwError("expected :", d);
            } else return a;
        },
        logicalOR: function() {
            for (var a = this.logicalAND(), c; ;) if (c = this.expect("||")) a = this.binaryFn(a, c.fn, this.logicalAND()); else return a;
        },
        logicalAND: function() {
            var a = this.equality(), c;
            if (c = this.expect("&&")) a = this.binaryFn(a, c.fn, this.logicalAND());
            return a;
        },
        equality: function() {
            var a = this.relational(), c;
            if (c = this.expect("==", "!=", "===", "!==")) a = this.binaryFn(a, c.fn, this.equality());
            return a;
        },
        relational: function() {
            var a = this.additive(), c;
            if (c = this.expect("<", ">", "<=", ">=")) a = this.binaryFn(a, c.fn, this.relational());
            return a;
        },
        additive: function() {
            for (var a = this.multiplicative(), c; c = this.expect("+", "-"); ) a = this.binaryFn(a, c.fn, this.multiplicative());
            return a;
        },
        multiplicative: function() {
            for (var a = this.unary(), c; c = this.expect("*", "/", "%"); ) a = this.binaryFn(a, c.fn, this.unary());
            return a;
        },
        unary: function() {
            var a;
            return this.expect("+") ? this.primary() : (a = this.expect("-")) ? this.binaryFn($a.ZERO, a.fn, this.unary()) : (a = this.expect("!")) ? this.unaryFn(a.fn, this.unary()) : this.primary();
        },
        fieldAccess: function(a) {
            var c = this, d = this.expect().text, e = Dc(d, this.options, this.text);
            return D(function(c, d, h) {
                return e(h || a(c, d));
            }, {
                assign: function(e, f, h) {
                    return ob(a(e, h), d, f, c.text, c.options);
                }
            });
        },
        objectIndex: function(a) {
            var c = this, d = this.expression();
            this.consume("]");
            return D(function(e, g) {
                var f = a(e, g), h = d(e, g), l;
                if (!f) return s;
                (f = Za(f[h], c.text)) && (f.then && c.options.unwrapPromises) && (l = f, "$$v" in f || (l.$$v = s, 
                l.then(function(a) {
                    l.$$v = a;
                })), f = f.$$v);
                return f;
            }, {
                assign: function(e, g, f) {
                    var h = d(e, f);
                    return Za(a(e, f), c.text)[h] = g;
                }
            });
        },
        functionCall: function(a, c) {
            var d = [];
            if (")" !== this.peekToken().text) {
                do d.push(this.expression()); while (this.expect(","));
            }
            this.consume(")");
            var e = this;
            return function(g, f) {
                for (var h = [], l = c ? c(g, f) : g, k = 0; k < d.length; k++) h.push(d[k](g, f));
                k = a(g, f, l) || C;
                Za(l, e.text);
                Za(k, e.text);
                h = k.apply ? k.apply(l, h) : k(h[0], h[1], h[2], h[3], h[4]);
                return Za(h, e.text);
            };
        },
        arrayDeclaration: function() {
            var a = [], c = !0;
            if ("]" !== this.peekToken().text) {
                do {
                    if (this.peek("]")) break;
                    var d = this.expression();
                    a.push(d);
                    d.constant || (c = !1);
                } while (this.expect(","));
            }
            this.consume("]");
            return D(function(c, d) {
                for (var f = [], h = 0; h < a.length; h++) f.push(a[h](c, d));
                return f;
            }, {
                literal: !0,
                constant: c
            });
        },
        object: function() {
            var a = [], c = !0;
            if ("}" !== this.peekToken().text) {
                do {
                    if (this.peek("}")) break;
                    var d = this.expect(), d = d.string || d.text;
                    this.consume(":");
                    var e = this.expression();
                    a.push({
                        key: d,
                        value: e
                    });
                    e.constant || (c = !1);
                } while (this.expect(","));
            }
            this.consume("}");
            return D(function(c, d) {
                for (var e = {}, l = 0; l < a.length; l++) {
                    var k = a[l];
                    e[k.key] = k.value(c, d);
                }
                return e;
            }, {
                literal: !0,
                constant: c
            });
        }
    };
    var Mb = {}, ua = t("$sce"), ga = {
        HTML: "html",
        CSS: "css",
        URL: "url",
        RESOURCE_URL: "resourceUrl",
        JS: "js"
    }, W = U.createElement("a"), Hc = sa(O.location.href, !0);
    gc.$inject = [ "$provide" ];
    Ic.$inject = [ "$locale" ];
    Kc.$inject = [ "$locale" ];
    var Nc = ".", Ie = {
        yyyy: $("FullYear", 4),
        yy: $("FullYear", 2, 0, !0),
        y: $("FullYear", 1),
        MMMM: pb("Month"),
        MMM: pb("Month", !0),
        MM: $("Month", 2, 1),
        M: $("Month", 1, 1),
        dd: $("Date", 2),
        d: $("Date", 1),
        HH: $("Hours", 2),
        H: $("Hours", 1),
        hh: $("Hours", 2, -12),
        h: $("Hours", 1, -12),
        mm: $("Minutes", 2),
        m: $("Minutes", 1),
        ss: $("Seconds", 2),
        s: $("Seconds", 1),
        sss: $("Milliseconds", 3),
        EEEE: pb("Day"),
        EEE: pb("Day", !0),
        a: function(a, c) {
            return 12 > a.getHours() ? c.AMPMS[0] : c.AMPMS[1];
        },
        Z: function(a) {
            a = -1 * a.getTimezoneOffset();
            return a = (0 <= a ? "+" : "") + (Ob(Math[0 < a ? "floor" : "ceil"](a / 60), 2) + Ob(Math.abs(a % 60), 2));
        }
    }, He = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, Ge = /^\-?\d+$/;
    Jc.$inject = [ "$locale" ];
    var Ee = aa(K), Fe = aa(Fa);
    Lc.$inject = [ "$parse" ];
    var cd = aa({
        restrict: "E",
        compile: function(a, c) {
            8 >= S && (c.href || c.name || c.$set("href", ""), a.append(U.createComment("IE fix")));
            if (!c.href && !c.xlinkHref && !c.name) return function(a, c) {
                var g = "[object SVGAnimatedString]" === wa.call(c.prop("href")) ? "xlink:href" : "href";
                c.on("click", function(a) {
                    c.attr(g) || a.preventDefault();
                });
            };
        }
    }), zb = {};
    q(kb, function(a, c) {
        if ("multiple" != a) {
            var d = na("ng-" + c);
            zb[d] = function() {
                return {
                    priority: 100,
                    link: function(a, g, f) {
                        a.$watch(f[d], function(a) {
                            f.$set(c, !!a);
                        });
                    }
                };
            };
        }
    });
    q([ "src", "srcset", "href" ], function(a) {
        var c = na("ng-" + a);
        zb[c] = function() {
            return {
                priority: 99,
                link: function(d, e, g) {
                    var f = a, h = a;
                    "href" === a && "[object SVGAnimatedString]" === wa.call(e.prop("href")) && (h = "xlinkHref", 
                    g.$attr[h] = "xlink:href", f = null);
                    g.$observe(c, function(a) {
                        a && (g.$set(h, a), S && f && e.prop(f, g[h]));
                    });
                }
            };
        };
    });
    var sb = {
        $addControl: C,
        $removeControl: C,
        $setValidity: C,
        $setDirty: C,
        $setPristine: C
    };
    Oc.$inject = [ "$element", "$attrs", "$scope", "$animate" ];
    var Qc = function(a) {
        return [ "$timeout", function(c) {
            return {
                name: "form",
                restrict: a ? "EAC" : "E",
                controller: Oc,
                compile: function() {
                    return {
                        pre: function(a, e, g, f) {
                            if (!g.action) {
                                var h = function(a) {
                                    a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                                };
                                Pc(e[0], "submit", h);
                                e.on("$destroy", function() {
                                    c(function() {
                                        Fb(e[0], "submit", h);
                                    }, 0, !1);
                                });
                            }
                            var l = e.parent().controller("form"), k = g.name || g.ngForm;
                            k && ob(a, k, f, k);
                            if (l) e.on("$destroy", function() {
                                l.$removeControl(f);
                                k && ob(a, k, s, k);
                                D(f, sb);
                            });
                        }
                    };
                }
            };
        } ];
    }, dd = Qc(), qd = Qc(!0), Oe = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, Pe = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i, Qe = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, Rc = {
        text: ub,
        number: function(a, c, d, e, g, f) {
            ub(a, c, d, e, g, f);
            e.$parsers.push(function(a) {
                var c = e.$isEmpty(a);
                if (c || Qe.test(a)) return e.$setValidity("number", !0), "" === a ? null : c ? a : parseFloat(a);
                e.$setValidity("number", !1);
                return s;
            });
            Je(e, "number", c);
            e.$formatters.push(function(a) {
                return e.$isEmpty(a) ? "" : "" + a;
            });
            d.min && (a = function(a) {
                var c = parseFloat(d.min);
                return pa(e, "min", e.$isEmpty(a) || a >= c, a);
            }, e.$parsers.push(a), e.$formatters.push(a));
            d.max && (a = function(a) {
                var c = parseFloat(d.max);
                return pa(e, "max", e.$isEmpty(a) || a <= c, a);
            }, e.$parsers.push(a), e.$formatters.push(a));
            e.$formatters.push(function(a) {
                return pa(e, "number", e.$isEmpty(a) || vb(a), a);
            });
        },
        url: function(a, c, d, e, g, f) {
            ub(a, c, d, e, g, f);
            a = function(a) {
                return pa(e, "url", e.$isEmpty(a) || Oe.test(a), a);
            };
            e.$formatters.push(a);
            e.$parsers.push(a);
        },
        email: function(a, c, d, e, g, f) {
            ub(a, c, d, e, g, f);
            a = function(a) {
                return pa(e, "email", e.$isEmpty(a) || Pe.test(a), a);
            };
            e.$formatters.push(a);
            e.$parsers.push(a);
        },
        radio: function(a, c, d, e) {
            E(d.name) && c.attr("name", bb());
            c.on("click", function() {
                c[0].checked && a.$apply(function() {
                    e.$setViewValue(d.value);
                });
            });
            e.$render = function() {
                c[0].checked = d.value == e.$viewValue;
            };
            d.$observe("value", e.$render);
        },
        checkbox: function(a, c, d, e) {
            var g = d.ngTrueValue, f = d.ngFalseValue;
            w(g) || (g = !0);
            w(f) || (f = !1);
            c.on("click", function() {
                a.$apply(function() {
                    e.$setViewValue(c[0].checked);
                });
            });
            e.$render = function() {
                c[0].checked = e.$viewValue;
            };
            e.$isEmpty = function(a) {
                return a !== g;
            };
            e.$formatters.push(function(a) {
                return a === g;
            });
            e.$parsers.push(function(a) {
                return a ? g : f;
            });
        },
        hidden: C,
        button: C,
        submit: C,
        reset: C,
        file: C
    }, dc = [ "$browser", "$sniffer", function(a, c) {
        return {
            restrict: "E",
            require: "?ngModel",
            link: function(d, e, g, f) {
                f && (Rc[K(g.type)] || Rc.text)(d, e, g, f, c, a);
            }
        };
    } ], rb = "ng-valid", qb = "ng-invalid", La = "ng-pristine", tb = "ng-dirty", Re = [ "$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", function(a, c, d, e, g, f) {
        function h(a, c) {
            c = c ? "-" + fb(c, "-") : "";
            f.removeClass(e, (a ? qb : rb) + c);
            f.addClass(e, (a ? rb : qb) + c);
        }
        this.$modelValue = this.$viewValue = Number.NaN;
        this.$parsers = [];
        this.$formatters = [];
        this.$viewChangeListeners = [];
        this.$pristine = !0;
        this.$dirty = !1;
        this.$valid = !0;
        this.$invalid = !1;
        this.$name = d.name;
        var l = g(d.ngModel), k = l.assign;
        if (!k) throw t("ngModel")("nonassign", d.ngModel, ha(e));
        this.$render = C;
        this.$isEmpty = function(a) {
            return E(a) || "" === a || null === a || a !== a;
        };
        var m = e.inheritedData("$formController") || sb, n = 0, p = this.$error = {};
        e.addClass(La);
        h(!0);
        this.$setValidity = function(a, c) {
            p[a] !== !c && (c ? (p[a] && n--, n || (h(!0), this.$valid = !0, this.$invalid = !1)) : (h(!1), 
            this.$invalid = !0, this.$valid = !1, n++), p[a] = !c, h(c, a), m.$setValidity(a, c, this));
        };
        this.$setPristine = function() {
            this.$dirty = !1;
            this.$pristine = !0;
            f.removeClass(e, tb);
            f.addClass(e, La);
        };
        this.$setViewValue = function(d) {
            this.$viewValue = d;
            this.$pristine && (this.$dirty = !0, this.$pristine = !1, f.removeClass(e, La), 
            f.addClass(e, tb), m.$setDirty());
            q(this.$parsers, function(a) {
                d = a(d);
            });
            this.$modelValue !== d && (this.$modelValue = d, k(a, d), q(this.$viewChangeListeners, function(a) {
                try {
                    a();
                } catch (d) {
                    c(d);
                }
            }));
        };
        var r = this;
        a.$watch(function() {
            var c = l(a);
            if (r.$modelValue !== c) {
                var d = r.$formatters, e = d.length;
                for (r.$modelValue = c; e--; ) c = d[e](c);
                r.$viewValue !== c && (r.$viewValue = c, r.$render());
            }
            return c;
        });
    } ], Fd = function() {
        return {
            require: [ "ngModel", "^?form" ],
            controller: Re,
            link: function(a, c, d, e) {
                var g = e[0], f = e[1] || sb;
                f.$addControl(g);
                a.$on("$destroy", function() {
                    f.$removeControl(g);
                });
            }
        };
    }, Hd = aa({
        require: "ngModel",
        link: function(a, c, d, e) {
            e.$viewChangeListeners.push(function() {
                a.$eval(d.ngChange);
            });
        }
    }), ec = function() {
        return {
            require: "?ngModel",
            link: function(a, c, d, e) {
                if (e) {
                    d.required = !0;
                    var g = function(a) {
                        if (d.required && e.$isEmpty(a)) e.$setValidity("required", !1); else return e.$setValidity("required", !0), 
                        a;
                    };
                    e.$formatters.push(g);
                    e.$parsers.unshift(g);
                    d.$observe("required", function() {
                        g(e.$viewValue);
                    });
                }
            }
        };
    }, Gd = function() {
        return {
            require: "ngModel",
            link: function(a, c, d, e) {
                var g = (a = /\/(.*)\//.exec(d.ngList)) && RegExp(a[1]) || d.ngList || ",";
                e.$parsers.push(function(a) {
                    if (!E(a)) {
                        var c = [];
                        a && q(a.split(g), function(a) {
                            a && c.push(ca(a));
                        });
                        return c;
                    }
                });
                e.$formatters.push(function(a) {
                    return M(a) ? a.join(", ") : s;
                });
                e.$isEmpty = function(a) {
                    return !a || !a.length;
                };
            }
        };
    }, Se = /^(true|false|\d+)$/, Id = function() {
        return {
            priority: 100,
            compile: function(a, c) {
                return Se.test(c.ngValue) ? function(a, c, g) {
                    g.$set("value", a.$eval(g.ngValue));
                } : function(a, c, g) {
                    a.$watch(g.ngValue, function(a) {
                        g.$set("value", a);
                    });
                };
            }
        };
    }, id = va(function(a, c, d) {
        c.addClass("ng-binding").data("$binding", d.ngBind);
        a.$watch(d.ngBind, function(a) {
            c.text(a == s ? "" : a);
        });
    }), kd = [ "$interpolate", function(a) {
        return function(c, d, e) {
            c = a(d.attr(e.$attr.ngBindTemplate));
            d.addClass("ng-binding").data("$binding", c);
            e.$observe("ngBindTemplate", function(a) {
                d.text(a);
            });
        };
    } ], jd = [ "$sce", "$parse", function(a, c) {
        return function(d, e, g) {
            e.addClass("ng-binding").data("$binding", g.ngBindHtml);
            var f = c(g.ngBindHtml);
            d.$watch(function() {
                return (f(d) || "").toString();
            }, function(c) {
                e.html(a.getTrustedHtml(f(d)) || "");
            });
        };
    } ], ld = Pb("", !0), nd = Pb("Odd", 0), md = Pb("Even", 1), od = va({
        compile: function(a, c) {
            c.$set("ngCloak", s);
            a.removeClass("ng-cloak");
        }
    }), pd = [ function() {
        return {
            scope: !0,
            controller: "@",
            priority: 500
        };
    } ], fc = {};
    q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(a) {
        var c = na("ng-" + a);
        fc[c] = [ "$parse", function(d) {
            return {
                compile: function(e, g) {
                    var f = d(g[c]);
                    return function(c, d, e) {
                        d.on(K(a), function(a) {
                            c.$apply(function() {
                                f(c, {
                                    $event: a
                                });
                            });
                        });
                    };
                }
            };
        } ];
    });
    var sd = [ "$animate", function(a) {
        return {
            transclude: "element",
            priority: 600,
            terminal: !0,
            restrict: "A",
            $$tlb: !0,
            link: function(c, d, e, g, f) {
                var h, l, k;
                c.$watch(e.ngIf, function(g) {
                    Qa(g) ? l || (l = c.$new(), f(l, function(c) {
                        c[c.length++] = U.createComment(" end ngIf: " + e.ngIf + " ");
                        h = {
                            clone: c
                        };
                        a.enter(c, d.parent(), d);
                    })) : (k && (k.remove(), k = null), l && (l.$destroy(), l = null), h && (k = yb(h.clone), 
                    a.leave(k, function() {
                        k = null;
                    }), h = null));
                });
            }
        };
    } ], td = [ "$http", "$templateCache", "$anchorScroll", "$animate", "$sce", function(a, c, d, e, g) {
        return {
            restrict: "ECA",
            priority: 400,
            terminal: !0,
            transclude: "element",
            controller: Ea.noop,
            compile: function(f, h) {
                var l = h.ngInclude || h.src, k = h.onload || "", m = h.autoscroll;
                return function(f, h, q, s, u) {
                    var F = 0, v, y, A, x = function() {
                        y && (y.remove(), y = null);
                        v && (v.$destroy(), v = null);
                        A && (e.leave(A, function() {
                            y = null;
                        }), y = A, A = null);
                    };
                    f.$watch(g.parseAsResourceUrl(l), function(g) {
                        var l = function() {
                            !B(m) || m && !f.$eval(m) || d();
                        }, q = ++F;
                        g ? (a.get(g, {
                            cache: c
                        }).success(function(a) {
                            if (q === F) {
                                var c = f.$new();
                                s.template = a;
                                a = u(c, function(a) {
                                    x();
                                    e.enter(a, null, h, l);
                                });
                                v = c;
                                A = a;
                                v.$emit("$includeContentLoaded");
                                f.$eval(k);
                            }
                        }).error(function() {
                            q === F && x();
                        }), f.$emit("$includeContentRequested")) : (x(), s.template = null);
                    });
                };
            }
        };
    } ], Jd = [ "$compile", function(a) {
        return {
            restrict: "ECA",
            priority: -400,
            require: "ngInclude",
            link: function(c, d, e, g) {
                d.html(g.template);
                a(d.contents())(c);
            }
        };
    } ], ud = va({
        priority: 450,
        compile: function() {
            return {
                pre: function(a, c, d) {
                    a.$eval(d.ngInit);
                }
            };
        }
    }), vd = va({
        terminal: !0,
        priority: 1e3
    }), wd = [ "$locale", "$interpolate", function(a, c) {
        var d = /{}/g;
        return {
            restrict: "EA",
            link: function(e, g, f) {
                var h = f.count, l = f.$attr.when && g.attr(f.$attr.when), k = f.offset || 0, m = e.$eval(l) || {}, n = {}, p = c.startSymbol(), r = c.endSymbol(), s = /^when(Minus)?(.+)$/;
                q(f, function(a, c) {
                    s.test(c) && (m[K(c.replace("when", "").replace("Minus", "-"))] = g.attr(f.$attr[c]));
                });
                q(m, function(a, e) {
                    n[e] = c(a.replace(d, p + h + "-" + k + r));
                });
                e.$watch(function() {
                    var c = parseFloat(e.$eval(h));
                    if (isNaN(c)) return "";
                    c in m || (c = a.pluralCat(c - k));
                    return n[c](e, g, !0);
                }, function(a) {
                    g.text(a);
                });
            }
        };
    } ], xd = [ "$parse", "$animate", function(a, c) {
        var d = t("ngRepeat");
        return {
            transclude: "element",
            priority: 1e3,
            terminal: !0,
            $$tlb: !0,
            link: function(e, g, f, h, l) {
                var k = f.ngRepeat, m = k.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/), n, p, r, s, u, F, v = {
                    $id: Ia
                };
                if (!m) throw d("iexp", k);
                f = m[1];
                h = m[2];
                (m = m[3]) ? (n = a(m), p = function(a, c, d) {
                    F && (v[F] = a);
                    v[u] = c;
                    v.$index = d;
                    return n(e, v);
                }) : (r = function(a, c) {
                    return Ia(c);
                }, s = function(a) {
                    return a;
                });
                m = f.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
                if (!m) throw d("iidexp", f);
                u = m[3] || m[1];
                F = m[2];
                var B = {};
                e.$watchCollection(h, function(a) {
                    var f, h, m = g[0], n, v = {}, H, R, w, C, T, t, E = [];
                    if (ab(a)) T = a, n = p || r; else {
                        n = p || s;
                        T = [];
                        for (w in a) a.hasOwnProperty(w) && "$" != w.charAt(0) && T.push(w);
                        T.sort();
                    }
                    H = T.length;
                    h = E.length = T.length;
                    for (f = 0; f < h; f++) if (w = a === T ? f : T[f], C = a[w], C = n(w, C, f), Aa(C, "`track by` id"), 
                    B.hasOwnProperty(C)) t = B[C], delete B[C], v[C] = t, E[f] = t; else {
                        if (v.hasOwnProperty(C)) throw q(E, function(a) {
                            a && a.scope && (B[a.id] = a);
                        }), d("dupes", k, C);
                        E[f] = {
                            id: C
                        };
                        v[C] = !1;
                    }
                    for (w in B) B.hasOwnProperty(w) && (t = B[w], f = yb(t.clone), c.leave(f), q(f, function(a) {
                        a.$$NG_REMOVED = !0;
                    }), t.scope.$destroy());
                    f = 0;
                    for (h = T.length; f < h; f++) {
                        w = a === T ? f : T[f];
                        C = a[w];
                        t = E[f];
                        E[f - 1] && (m = E[f - 1].clone[E[f - 1].clone.length - 1]);
                        if (t.scope) {
                            R = t.scope;
                            n = m;
                            do n = n.nextSibling; while (n && n.$$NG_REMOVED);
                            t.clone[0] != n && c.move(yb(t.clone), null, y(m));
                            m = t.clone[t.clone.length - 1];
                        } else R = e.$new();
                        R[u] = C;
                        F && (R[F] = w);
                        R.$index = f;
                        R.$first = 0 === f;
                        R.$last = f === H - 1;
                        R.$middle = !(R.$first || R.$last);
                        R.$odd = !(R.$even = 0 === (f & 1));
                        t.scope || l(R, function(a) {
                            a[a.length++] = U.createComment(" end ngRepeat: " + k + " ");
                            c.enter(a, null, y(m));
                            m = a;
                            t.scope = R;
                            t.clone = a;
                            v[t.id] = t;
                        });
                    }
                    B = v;
                });
            }
        };
    } ], yd = [ "$animate", function(a) {
        return function(c, d, e) {
            c.$watch(e.ngShow, function(c) {
                a[Qa(c) ? "removeClass" : "addClass"](d, "ng-hide");
            });
        };
    } ], rd = [ "$animate", function(a) {
        return function(c, d, e) {
            c.$watch(e.ngHide, function(c) {
                a[Qa(c) ? "addClass" : "removeClass"](d, "ng-hide");
            });
        };
    } ], zd = va(function(a, c, d) {
        a.$watch(d.ngStyle, function(a, d) {
            d && a !== d && q(d, function(a, d) {
                c.css(d, "");
            });
            a && c.css(a);
        }, !0);
    }), Ad = [ "$animate", function(a) {
        return {
            restrict: "EA",
            require: "ngSwitch",
            controller: [ "$scope", function() {
                this.cases = {};
            } ],
            link: function(c, d, e, g) {
                var f, h, l, k = [];
                c.$watch(e.ngSwitch || e.on, function(d) {
                    var n, p = k.length;
                    if (0 < p) {
                        if (l) {
                            for (n = 0; n < p; n++) l[n].remove();
                            l = null;
                        }
                        l = [];
                        for (n = 0; n < p; n++) {
                            var r = h[n];
                            k[n].$destroy();
                            l[n] = r;
                            a.leave(r, function() {
                                l.splice(n, 1);
                                0 === l.length && (l = null);
                            });
                        }
                    }
                    h = [];
                    k = [];
                    if (f = g.cases["!" + d] || g.cases["?"]) c.$eval(e.change), q(f, function(d) {
                        var e = c.$new();
                        k.push(e);
                        d.transclude(e, function(c) {
                            var e = d.element;
                            h.push(c);
                            a.enter(c, e.parent(), e);
                        });
                    });
                });
            }
        };
    } ], Bd = va({
        transclude: "element",
        priority: 800,
        require: "^ngSwitch",
        link: function(a, c, d, e, g) {
            e.cases["!" + d.ngSwitchWhen] = e.cases["!" + d.ngSwitchWhen] || [];
            e.cases["!" + d.ngSwitchWhen].push({
                transclude: g,
                element: c
            });
        }
    }), Cd = va({
        transclude: "element",
        priority: 800,
        require: "^ngSwitch",
        link: function(a, c, d, e, g) {
            e.cases["?"] = e.cases["?"] || [];
            e.cases["?"].push({
                transclude: g,
                element: c
            });
        }
    }), Ed = va({
        link: function(a, c, d, e, g) {
            if (!g) throw t("ngTransclude")("orphan", ha(c));
            g(function(a) {
                c.empty();
                c.append(a);
            });
        }
    }), ed = [ "$templateCache", function(a) {
        return {
            restrict: "E",
            terminal: !0,
            compile: function(c, d) {
                "text/ng-template" == d.type && a.put(d.id, c[0].text);
            }
        };
    } ], Te = t("ngOptions"), Dd = aa({
        terminal: !0
    }), fd = [ "$compile", "$parse", function(a, c) {
        var d = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, e = {
            $setViewValue: C
        };
        return {
            restrict: "E",
            require: [ "select", "?ngModel" ],
            controller: [ "$element", "$scope", "$attrs", function(a, c, d) {
                var l = this, k = {}, m = e, n;
                l.databound = d.ngModel;
                l.init = function(a, c, d) {
                    m = a;
                    n = d;
                };
                l.addOption = function(c) {
                    Aa(c, '"option value"');
                    k[c] = !0;
                    m.$viewValue == c && (a.val(c), n.parent() && n.remove());
                };
                l.removeOption = function(a) {
                    this.hasOption(a) && (delete k[a], m.$viewValue == a && this.renderUnknownOption(a));
                };
                l.renderUnknownOption = function(c) {
                    c = "? " + Ia(c) + " ?";
                    n.val(c);
                    a.prepend(n);
                    a.val(c);
                    n.prop("selected", !0);
                };
                l.hasOption = function(a) {
                    return k.hasOwnProperty(a);
                };
                c.$on("$destroy", function() {
                    l.renderUnknownOption = C;
                });
            } ],
            link: function(e, f, h, l) {
                function k(a, c, d, e) {
                    d.$render = function() {
                        var a = d.$viewValue;
                        e.hasOption(a) ? (A.parent() && A.remove(), c.val(a), "" === a && w.prop("selected", !0)) : E(a) && w ? c.val("") : e.renderUnknownOption(a);
                    };
                    c.on("change", function() {
                        a.$apply(function() {
                            A.parent() && A.remove();
                            d.$setViewValue(c.val());
                        });
                    });
                }
                function m(a, c, d) {
                    var e;
                    d.$render = function() {
                        var a = new Va(d.$viewValue);
                        q(c.find("option"), function(c) {
                            c.selected = B(a.get(c.value));
                        });
                    };
                    a.$watch(function() {
                        xa(e, d.$viewValue) || (e = ba(d.$viewValue), d.$render());
                    });
                    c.on("change", function() {
                        a.$apply(function() {
                            var a = [];
                            q(c.find("option"), function(c) {
                                c.selected && a.push(c.value);
                            });
                            d.$setViewValue(a);
                        });
                    });
                }
                function n(e, f, g) {
                    function h() {
                        var a = {
                            "": []
                        }, c = [ "" ], d, k, s, t, z;
                        t = g.$modelValue;
                        z = y(e) || [];
                        var E = n ? Qb(z) : z, F, I, A;
                        I = {};
                        s = !1;
                        var D, H;
                        if (r) if (w && M(t)) for (s = new Va([]), A = 0; A < t.length; A++) I[m] = t[A], 
                        s.put(w(e, I), t[A]); else s = new Va(t);
                        for (A = 0; F = E.length, A < F; A++) {
                            k = A;
                            if (n) {
                                k = E[A];
                                if ("$" === k.charAt(0)) continue;
                                I[n] = k;
                            }
                            I[m] = z[k];
                            d = p(e, I) || "";
                            (k = a[d]) || (k = a[d] = [], c.push(d));
                            r ? d = B(s.remove(w ? w(e, I) : q(e, I))) : (w ? (d = {}, d[m] = t, d = w(e, d) === w(e, I)) : d = t === q(e, I), 
                            s = s || d);
                            D = l(e, I);
                            D = B(D) ? D : "";
                            k.push({
                                id: w ? w(e, I) : n ? E[A] : A,
                                label: D,
                                selected: d
                            });
                        }
                        r || (u || null === t ? a[""].unshift({
                            id: "",
                            label: "",
                            selected: !s
                        }) : s || a[""].unshift({
                            id: "?",
                            label: "",
                            selected: !0
                        }));
                        I = 0;
                        for (E = c.length; I < E; I++) {
                            d = c[I];
                            k = a[d];
                            x.length <= I ? (t = {
                                element: C.clone().attr("label", d),
                                label: k.label
                            }, z = [ t ], x.push(z), f.append(t.element)) : (z = x[I], t = z[0], t.label != d && t.element.attr("label", t.label = d));
                            D = null;
                            A = 0;
                            for (F = k.length; A < F; A++) s = k[A], (d = z[A + 1]) ? (D = d.element, d.label !== s.label && D.text(d.label = s.label), 
                            d.id !== s.id && D.val(d.id = s.id), d.selected !== s.selected && D.prop("selected", d.selected = s.selected)) : ("" === s.id && u ? H = u : (H = v.clone()).val(s.id).attr("selected", s.selected).text(s.label), 
                            z.push({
                                element: H,
                                label: s.label,
                                id: s.id,
                                selected: s.selected
                            }), D ? D.after(H) : t.element.append(H), D = H);
                            for (A++; z.length > A; ) z.pop().element.remove();
                        }
                        for (;x.length > I; ) x.pop()[0].element.remove();
                    }
                    var k;
                    if (!(k = t.match(d))) throw Te("iexp", t, ha(f));
                    var l = c(k[2] || k[1]), m = k[4] || k[6], n = k[5], p = c(k[3] || ""), q = c(k[2] ? k[1] : m), y = c(k[7]), w = k[8] ? c(k[8]) : null, x = [ [ {
                        element: f,
                        label: ""
                    } ] ];
                    u && (a(u)(e), u.removeClass("ng-scope"), u.remove());
                    f.empty();
                    f.on("change", function() {
                        e.$apply(function() {
                            var a, c = y(e) || [], d = {}, h, k, l, p, t, v, u;
                            if (r) for (k = [], p = 0, v = x.length; p < v; p++) for (a = x[p], l = 1, t = a.length; l < t; l++) {
                                if ((h = a[l].element)[0].selected) {
                                    h = h.val();
                                    n && (d[n] = h);
                                    if (w) for (u = 0; u < c.length && (d[m] = c[u], w(e, d) != h); u++) ; else d[m] = c[h];
                                    k.push(q(e, d));
                                }
                            } else {
                                h = f.val();
                                if ("?" == h) k = s; else if ("" === h) k = null; else if (w) for (u = 0; u < c.length; u++) {
                                    if (d[m] = c[u], w(e, d) == h) {
                                        k = q(e, d);
                                        break;
                                    }
                                } else d[m] = c[h], n && (d[n] = h), k = q(e, d);
                                1 < x[0].length && x[0][1].id !== h && (x[0][1].selected = !1);
                            }
                            g.$setViewValue(k);
                        });
                    });
                    g.$render = h;
                    e.$watch(h);
                }
                if (l[1]) {
                    var p = l[0];
                    l = l[1];
                    var r = h.multiple, t = h.ngOptions, u = !1, w, v = y(U.createElement("option")), C = y(U.createElement("optgroup")), A = v.clone();
                    h = 0;
                    for (var x = f.children(), D = x.length; h < D; h++) if ("" === x[h].value) {
                        w = u = x.eq(h);
                        break;
                    }
                    p.init(l, u, A);
                    r && (l.$isEmpty = function(a) {
                        return !a || 0 === a.length;
                    });
                    t ? n(e, f, l) : r ? m(e, f, l) : k(e, f, l, p);
                }
            }
        };
    } ], hd = [ "$interpolate", function(a) {
        var c = {
            addOption: C,
            removeOption: C
        };
        return {
            restrict: "E",
            priority: 100,
            compile: function(d, e) {
                if (E(e.value)) {
                    var g = a(d.text(), !0);
                    g || e.$set("value", d.text());
                }
                return function(a, d, e) {
                    var k = d.parent(), m = k.data("$selectController") || k.parent().data("$selectController");
                    m && m.databound ? d.prop("selected", !1) : m = c;
                    g ? a.$watch(g, function(a, c) {
                        e.$set("value", a);
                        a !== c && m.removeOption(c);
                        m.addOption(a);
                    }) : m.addOption(e.value);
                    d.on("$destroy", function() {
                        m.removeOption(e.value);
                    });
                };
            }
        };
    } ], gd = aa({
        restrict: "E",
        terminal: !0
    });
    O.angular.bootstrap ? console.log("WARNING: Tried to load angular more than once.") : ((Ga = O.jQuery) ? (y = Ga, 
    D(Ga.fn, {
        scope: Ja.scope,
        isolateScope: Ja.isolateScope,
        controller: Ja.controller,
        injector: Ja.injector,
        inheritedData: Ja.inheritedData
    }), Ab("remove", !0, !0, !1), Ab("empty", !1, !1, !1), Ab("html", !1, !1, !0)) : y = N, 
    Ea.element = y, Zc(Ea), y(U).ready(function() {
        Wc(U, $b);
    }));
})(window, document);

!angular.$$csp() && angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}</style>');

(function(window, angular, undefined) {
    "use strict";
    angular.module("ngAnimate", [ "ng" ]).factory("$$animateReflow", [ "$$rAF", "$document", function($$rAF, $document) {
        var bod = $document[0].body;
        return function(fn) {
            return $$rAF(function() {
                var a = bod.offsetWidth + 1;
                fn();
            });
        };
    } ]).config([ "$provide", "$animateProvider", function($provide, $animateProvider) {
        var noop = angular.noop;
        var forEach = angular.forEach;
        var selectors = $animateProvider.$$selectors;
        var ELEMENT_NODE = 1;
        var NG_ANIMATE_STATE = "$$ngAnimateState";
        var NG_ANIMATE_CLASS_NAME = "ng-animate";
        var rootAnimateState = {
            running: true
        };
        function extractElementNode(element) {
            for (var i = 0; i < element.length; i++) {
                var elm = element[i];
                if (elm.nodeType == ELEMENT_NODE) {
                    return elm;
                }
            }
        }
        function stripCommentsFromElement(element) {
            return angular.element(extractElementNode(element));
        }
        function isMatchingElement(elm1, elm2) {
            return extractElementNode(elm1) == extractElementNode(elm2);
        }
        $provide.decorator("$animate", [ "$delegate", "$injector", "$sniffer", "$rootElement", "$$asyncCallback", "$rootScope", "$document", function($delegate, $injector, $sniffer, $rootElement, $$asyncCallback, $rootScope, $document) {
            var globalAnimationCounter = 0;
            $rootElement.data(NG_ANIMATE_STATE, rootAnimateState);
            $rootScope.$$postDigest(function() {
                $rootScope.$$postDigest(function() {
                    rootAnimateState.running = false;
                });
            });
            var classNameFilter = $animateProvider.classNameFilter();
            var isAnimatableClassName = !classNameFilter ? function() {
                return true;
            } : function(className) {
                return classNameFilter.test(className);
            };
            function lookup(name) {
                if (name) {
                    var matches = [], flagMap = {}, classes = name.substr(1).split(".");
                    if ($sniffer.transitions || $sniffer.animations) {
                        matches.push($injector.get(selectors[""]));
                    }
                    for (var i = 0; i < classes.length; i++) {
                        var klass = classes[i], selectorFactoryName = selectors[klass];
                        if (selectorFactoryName && !flagMap[klass]) {
                            matches.push($injector.get(selectorFactoryName));
                            flagMap[klass] = true;
                        }
                    }
                    return matches;
                }
            }
            function animationRunner(element, animationEvent, className) {
                var node = element[0];
                if (!node) {
                    return;
                }
                var isSetClassOperation = animationEvent == "setClass";
                var isClassBased = isSetClassOperation || animationEvent == "addClass" || animationEvent == "removeClass";
                var classNameAdd, classNameRemove;
                if (angular.isArray(className)) {
                    classNameAdd = className[0];
                    classNameRemove = className[1];
                    className = classNameAdd + " " + classNameRemove;
                }
                var currentClassName = element.attr("class");
                var classes = currentClassName + " " + className;
                if (!isAnimatableClassName(classes)) {
                    return;
                }
                var beforeComplete = noop, beforeCancel = [], before = [], afterComplete = noop, afterCancel = [], after = [];
                var animationLookup = (" " + classes).replace(/\s+/g, ".");
                forEach(lookup(animationLookup), function(animationFactory) {
                    var created = registerAnimation(animationFactory, animationEvent);
                    if (!created && isSetClassOperation) {
                        registerAnimation(animationFactory, "addClass");
                        registerAnimation(animationFactory, "removeClass");
                    }
                });
                function registerAnimation(animationFactory, event) {
                    var afterFn = animationFactory[event];
                    var beforeFn = animationFactory["before" + event.charAt(0).toUpperCase() + event.substr(1)];
                    if (afterFn || beforeFn) {
                        if (event == "leave") {
                            beforeFn = afterFn;
                            afterFn = null;
                        }
                        after.push({
                            event: event,
                            fn: afterFn
                        });
                        before.push({
                            event: event,
                            fn: beforeFn
                        });
                        return true;
                    }
                }
                function run(fns, cancellations, allCompleteFn) {
                    var animations = [];
                    forEach(fns, function(animation) {
                        animation.fn && animations.push(animation);
                    });
                    var count = 0;
                    function afterAnimationComplete(index) {
                        if (cancellations) {
                            (cancellations[index] || noop)();
                            if (++count < animations.length) return;
                            cancellations = null;
                        }
                        allCompleteFn();
                    }
                    forEach(animations, function(animation, index) {
                        var progress = function() {
                            afterAnimationComplete(index);
                        };
                        switch (animation.event) {
                          case "setClass":
                            cancellations.push(animation.fn(element, classNameAdd, classNameRemove, progress));
                            break;

                          case "addClass":
                            cancellations.push(animation.fn(element, classNameAdd || className, progress));
                            break;

                          case "removeClass":
                            cancellations.push(animation.fn(element, classNameRemove || className, progress));
                            break;

                          default:
                            cancellations.push(animation.fn(element, progress));
                            break;
                        }
                    });
                    if (cancellations && cancellations.length === 0) {
                        allCompleteFn();
                    }
                }
                return {
                    node: node,
                    event: animationEvent,
                    className: className,
                    isClassBased: isClassBased,
                    isSetClassOperation: isSetClassOperation,
                    before: function(allCompleteFn) {
                        beforeComplete = allCompleteFn;
                        run(before, beforeCancel, function() {
                            beforeComplete = noop;
                            allCompleteFn();
                        });
                    },
                    after: function(allCompleteFn) {
                        afterComplete = allCompleteFn;
                        run(after, afterCancel, function() {
                            afterComplete = noop;
                            allCompleteFn();
                        });
                    },
                    cancel: function() {
                        if (beforeCancel) {
                            forEach(beforeCancel, function(cancelFn) {
                                (cancelFn || noop)(true);
                            });
                            beforeComplete(true);
                        }
                        if (afterCancel) {
                            forEach(afterCancel, function(cancelFn) {
                                (cancelFn || noop)(true);
                            });
                            afterComplete(true);
                        }
                    }
                };
            }
            return {
                enter: function(element, parentElement, afterElement, doneCallback) {
                    this.enabled(false, element);
                    $delegate.enter(element, parentElement, afterElement);
                    $rootScope.$$postDigest(function() {
                        element = stripCommentsFromElement(element);
                        performAnimation("enter", "ng-enter", element, parentElement, afterElement, noop, doneCallback);
                    });
                },
                leave: function(element, doneCallback) {
                    cancelChildAnimations(element);
                    this.enabled(false, element);
                    $rootScope.$$postDigest(function() {
                        performAnimation("leave", "ng-leave", stripCommentsFromElement(element), null, null, function() {
                            $delegate.leave(element);
                        }, doneCallback);
                    });
                },
                move: function(element, parentElement, afterElement, doneCallback) {
                    cancelChildAnimations(element);
                    this.enabled(false, element);
                    $delegate.move(element, parentElement, afterElement);
                    $rootScope.$$postDigest(function() {
                        element = stripCommentsFromElement(element);
                        performAnimation("move", "ng-move", element, parentElement, afterElement, noop, doneCallback);
                    });
                },
                addClass: function(element, className, doneCallback) {
                    element = stripCommentsFromElement(element);
                    performAnimation("addClass", className, element, null, null, function() {
                        $delegate.addClass(element, className);
                    }, doneCallback);
                },
                removeClass: function(element, className, doneCallback) {
                    element = stripCommentsFromElement(element);
                    performAnimation("removeClass", className, element, null, null, function() {
                        $delegate.removeClass(element, className);
                    }, doneCallback);
                },
                setClass: function(element, add, remove, doneCallback) {
                    element = stripCommentsFromElement(element);
                    performAnimation("setClass", [ add, remove ], element, null, null, function() {
                        $delegate.setClass(element, add, remove);
                    }, doneCallback);
                },
                enabled: function(value, element) {
                    switch (arguments.length) {
                      case 2:
                        if (value) {
                            cleanup(element);
                        } else {
                            var data = element.data(NG_ANIMATE_STATE) || {};
                            data.disabled = true;
                            element.data(NG_ANIMATE_STATE, data);
                        }
                        break;

                      case 1:
                        rootAnimateState.disabled = !value;
                        break;

                      default:
                        value = !rootAnimateState.disabled;
                        break;
                    }
                    return !!value;
                }
            };
            function performAnimation(animationEvent, className, element, parentElement, afterElement, domOperation, doneCallback) {
                var runner = animationRunner(element, animationEvent, className);
                if (!runner) {
                    fireDOMOperation();
                    fireBeforeCallbackAsync();
                    fireAfterCallbackAsync();
                    closeAnimation();
                    return;
                }
                className = runner.className;
                var elementEvents = angular.element._data(runner.node);
                elementEvents = elementEvents && elementEvents.events;
                if (!parentElement) {
                    parentElement = afterElement ? afterElement.parent() : element.parent();
                }
                var ngAnimateState = element.data(NG_ANIMATE_STATE) || {};
                var runningAnimations = ngAnimateState.active || {};
                var totalActiveAnimations = ngAnimateState.totalActive || 0;
                var lastAnimation = ngAnimateState.last;
                var skipAnimations = runner.isClassBased ? ngAnimateState.disabled || lastAnimation && !lastAnimation.isClassBased : false;
                if (skipAnimations || animationsDisabled(element, parentElement)) {
                    fireDOMOperation();
                    fireBeforeCallbackAsync();
                    fireAfterCallbackAsync();
                    closeAnimation();
                    return;
                }
                var skipAnimation = false;
                if (totalActiveAnimations > 0) {
                    var animationsToCancel = [];
                    if (!runner.isClassBased) {
                        if (animationEvent == "leave" && runningAnimations["ng-leave"]) {
                            skipAnimation = true;
                        } else {
                            for (var klass in runningAnimations) {
                                animationsToCancel.push(runningAnimations[klass]);
                                cleanup(element, klass);
                            }
                            runningAnimations = {};
                            totalActiveAnimations = 0;
                        }
                    } else if (lastAnimation.event == "setClass") {
                        animationsToCancel.push(lastAnimation);
                        cleanup(element, className);
                    } else if (runningAnimations[className]) {
                        var current = runningAnimations[className];
                        if (current.event == animationEvent) {
                            skipAnimation = true;
                        } else {
                            animationsToCancel.push(current);
                            cleanup(element, className);
                        }
                    }
                    if (animationsToCancel.length > 0) {
                        forEach(animationsToCancel, function(operation) {
                            operation.cancel();
                        });
                    }
                }
                if (runner.isClassBased && !runner.isSetClassOperation && !skipAnimation) {
                    skipAnimation = animationEvent == "addClass" == element.hasClass(className);
                }
                if (skipAnimation) {
                    fireBeforeCallbackAsync();
                    fireAfterCallbackAsync();
                    fireDoneCallbackAsync();
                    return;
                }
                if (animationEvent == "leave") {
                    element.one("$destroy", function(e) {
                        var element = angular.element(this);
                        var state = element.data(NG_ANIMATE_STATE);
                        if (state) {
                            var activeLeaveAnimation = state.active["ng-leave"];
                            if (activeLeaveAnimation) {
                                activeLeaveAnimation.cancel();
                                cleanup(element, "ng-leave");
                            }
                        }
                    });
                }
                element.addClass(NG_ANIMATE_CLASS_NAME);
                var localAnimationCount = globalAnimationCounter++;
                totalActiveAnimations++;
                runningAnimations[className] = runner;
                element.data(NG_ANIMATE_STATE, {
                    last: runner,
                    active: runningAnimations,
                    index: localAnimationCount,
                    totalActive: totalActiveAnimations
                });
                fireBeforeCallbackAsync();
                runner.before(function(cancelled) {
                    var data = element.data(NG_ANIMATE_STATE);
                    cancelled = cancelled || !data || !data.active[className] || runner.isClassBased && data.active[className].event != animationEvent;
                    fireDOMOperation();
                    if (cancelled === true) {
                        closeAnimation();
                    } else {
                        fireAfterCallbackAsync();
                        runner.after(closeAnimation);
                    }
                });
                function fireDOMCallback(animationPhase) {
                    var eventName = "$animate:" + animationPhase;
                    if (elementEvents && elementEvents[eventName] && elementEvents[eventName].length > 0) {
                        $$asyncCallback(function() {
                            element.triggerHandler(eventName, {
                                event: animationEvent,
                                className: className
                            });
                        });
                    }
                }
                function fireBeforeCallbackAsync() {
                    fireDOMCallback("before");
                }
                function fireAfterCallbackAsync() {
                    fireDOMCallback("after");
                }
                function fireDoneCallbackAsync() {
                    fireDOMCallback("close");
                    if (doneCallback) {
                        $$asyncCallback(function() {
                            doneCallback();
                        });
                    }
                }
                function fireDOMOperation() {
                    if (!fireDOMOperation.hasBeenRun) {
                        fireDOMOperation.hasBeenRun = true;
                        domOperation();
                    }
                }
                function closeAnimation() {
                    if (!closeAnimation.hasBeenRun) {
                        closeAnimation.hasBeenRun = true;
                        var data = element.data(NG_ANIMATE_STATE);
                        if (data) {
                            if (runner && runner.isClassBased) {
                                cleanup(element, className);
                            } else {
                                $$asyncCallback(function() {
                                    var data = element.data(NG_ANIMATE_STATE) || {};
                                    if (localAnimationCount == data.index) {
                                        cleanup(element, className, animationEvent);
                                    }
                                });
                                element.data(NG_ANIMATE_STATE, data);
                            }
                        }
                        fireDoneCallbackAsync();
                    }
                }
            }
            function cancelChildAnimations(element) {
                var node = extractElementNode(element);
                if (node) {
                    var nodes = angular.isFunction(node.getElementsByClassName) ? node.getElementsByClassName(NG_ANIMATE_CLASS_NAME) : node.querySelectorAll("." + NG_ANIMATE_CLASS_NAME);
                    forEach(nodes, function(element) {
                        element = angular.element(element);
                        var data = element.data(NG_ANIMATE_STATE);
                        if (data && data.active) {
                            forEach(data.active, function(runner) {
                                runner.cancel();
                            });
                        }
                    });
                }
            }
            function cleanup(element, className) {
                if (isMatchingElement(element, $rootElement)) {
                    if (!rootAnimateState.disabled) {
                        rootAnimateState.running = false;
                        rootAnimateState.structural = false;
                    }
                } else if (className) {
                    var data = element.data(NG_ANIMATE_STATE) || {};
                    var removeAnimations = className === true;
                    if (!removeAnimations && data.active && data.active[className]) {
                        data.totalActive--;
                        delete data.active[className];
                    }
                    if (removeAnimations || !data.totalActive) {
                        element.removeClass(NG_ANIMATE_CLASS_NAME);
                        element.removeData(NG_ANIMATE_STATE);
                    }
                }
            }
            function animationsDisabled(element, parentElement) {
                if (rootAnimateState.disabled) return true;
                if (isMatchingElement(element, $rootElement)) {
                    return rootAnimateState.disabled || rootAnimateState.running;
                }
                do {
                    if (parentElement.length === 0) break;
                    var isRoot = isMatchingElement(parentElement, $rootElement);
                    var state = isRoot ? rootAnimateState : parentElement.data(NG_ANIMATE_STATE);
                    var result = state && (!!state.disabled || state.running || state.totalActive > 0);
                    if (isRoot || result) {
                        return result;
                    }
                    if (isRoot) return true;
                } while (parentElement = parentElement.parent());
                return true;
            }
        } ]);
        $animateProvider.register("", [ "$window", "$sniffer", "$timeout", "$$animateReflow", function($window, $sniffer, $timeout, $$animateReflow) {
            var CSS_PREFIX = "", TRANSITION_PROP, TRANSITIONEND_EVENT, ANIMATION_PROP, ANIMATIONEND_EVENT;
            if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
                CSS_PREFIX = "-webkit-";
                TRANSITION_PROP = "WebkitTransition";
                TRANSITIONEND_EVENT = "webkitTransitionEnd transitionend";
            } else {
                TRANSITION_PROP = "transition";
                TRANSITIONEND_EVENT = "transitionend";
            }
            if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
                CSS_PREFIX = "-webkit-";
                ANIMATION_PROP = "WebkitAnimation";
                ANIMATIONEND_EVENT = "webkitAnimationEnd animationend";
            } else {
                ANIMATION_PROP = "animation";
                ANIMATIONEND_EVENT = "animationend";
            }
            var DURATION_KEY = "Duration";
            var PROPERTY_KEY = "Property";
            var DELAY_KEY = "Delay";
            var ANIMATION_ITERATION_COUNT_KEY = "IterationCount";
            var NG_ANIMATE_PARENT_KEY = "$$ngAnimateKey";
            var NG_ANIMATE_CSS_DATA_KEY = "$$ngAnimateCSS3Data";
            var NG_ANIMATE_BLOCK_CLASS_NAME = "ng-animate-block-transitions";
            var ELAPSED_TIME_MAX_DECIMAL_PLACES = 3;
            var CLOSING_TIME_BUFFER = 1.5;
            var ONE_SECOND = 1e3;
            var lookupCache = {};
            var parentCounter = 0;
            var animationReflowQueue = [];
            var cancelAnimationReflow;
            function afterReflow(element, callback) {
                if (cancelAnimationReflow) {
                    cancelAnimationReflow();
                }
                animationReflowQueue.push(callback);
                cancelAnimationReflow = $$animateReflow(function() {
                    forEach(animationReflowQueue, function(fn) {
                        fn();
                    });
                    animationReflowQueue = [];
                    cancelAnimationReflow = null;
                    lookupCache = {};
                });
            }
            var closingTimer = null;
            var closingTimestamp = 0;
            var animationElementQueue = [];
            function animationCloseHandler(element, totalTime) {
                var node = extractElementNode(element);
                element = angular.element(node);
                animationElementQueue.push(element);
                var futureTimestamp = Date.now() + totalTime;
                if (futureTimestamp <= closingTimestamp) {
                    return;
                }
                $timeout.cancel(closingTimer);
                closingTimestamp = futureTimestamp;
                closingTimer = $timeout(function() {
                    closeAllAnimations(animationElementQueue);
                    animationElementQueue = [];
                }, totalTime, false);
            }
            function closeAllAnimations(elements) {
                forEach(elements, function(element) {
                    var elementData = element.data(NG_ANIMATE_CSS_DATA_KEY);
                    if (elementData) {
                        (elementData.closeAnimationFn || noop)();
                    }
                });
            }
            function getElementAnimationDetails(element, cacheKey) {
                var data = cacheKey ? lookupCache[cacheKey] : null;
                if (!data) {
                    var transitionDuration = 0;
                    var transitionDelay = 0;
                    var animationDuration = 0;
                    var animationDelay = 0;
                    var transitionDelayStyle;
                    var animationDelayStyle;
                    var transitionDurationStyle;
                    var transitionPropertyStyle;
                    forEach(element, function(element) {
                        if (element.nodeType == ELEMENT_NODE) {
                            var elementStyles = $window.getComputedStyle(element) || {};
                            transitionDurationStyle = elementStyles[TRANSITION_PROP + DURATION_KEY];
                            transitionDuration = Math.max(parseMaxTime(transitionDurationStyle), transitionDuration);
                            transitionPropertyStyle = elementStyles[TRANSITION_PROP + PROPERTY_KEY];
                            transitionDelayStyle = elementStyles[TRANSITION_PROP + DELAY_KEY];
                            transitionDelay = Math.max(parseMaxTime(transitionDelayStyle), transitionDelay);
                            animationDelayStyle = elementStyles[ANIMATION_PROP + DELAY_KEY];
                            animationDelay = Math.max(parseMaxTime(animationDelayStyle), animationDelay);
                            var aDuration = parseMaxTime(elementStyles[ANIMATION_PROP + DURATION_KEY]);
                            if (aDuration > 0) {
                                aDuration *= parseInt(elementStyles[ANIMATION_PROP + ANIMATION_ITERATION_COUNT_KEY], 10) || 1;
                            }
                            animationDuration = Math.max(aDuration, animationDuration);
                        }
                    });
                    data = {
                        total: 0,
                        transitionPropertyStyle: transitionPropertyStyle,
                        transitionDurationStyle: transitionDurationStyle,
                        transitionDelayStyle: transitionDelayStyle,
                        transitionDelay: transitionDelay,
                        transitionDuration: transitionDuration,
                        animationDelayStyle: animationDelayStyle,
                        animationDelay: animationDelay,
                        animationDuration: animationDuration
                    };
                    if (cacheKey) {
                        lookupCache[cacheKey] = data;
                    }
                }
                return data;
            }
            function parseMaxTime(str) {
                var maxValue = 0;
                var values = angular.isString(str) ? str.split(/\s*,\s*/) : [];
                forEach(values, function(value) {
                    maxValue = Math.max(parseFloat(value) || 0, maxValue);
                });
                return maxValue;
            }
            function getCacheKey(element) {
                var parentElement = element.parent();
                var parentID = parentElement.data(NG_ANIMATE_PARENT_KEY);
                if (!parentID) {
                    parentElement.data(NG_ANIMATE_PARENT_KEY, ++parentCounter);
                    parentID = parentCounter;
                }
                return parentID + "-" + extractElementNode(element).getAttribute("class");
            }
            function animateSetup(animationEvent, element, className, calculationDecorator) {
                var cacheKey = getCacheKey(element);
                var eventCacheKey = cacheKey + " " + className;
                var itemIndex = lookupCache[eventCacheKey] ? ++lookupCache[eventCacheKey].total : 0;
                var stagger = {};
                if (itemIndex > 0) {
                    var staggerClassName = className + "-stagger";
                    var staggerCacheKey = cacheKey + " " + staggerClassName;
                    var applyClasses = !lookupCache[staggerCacheKey];
                    applyClasses && element.addClass(staggerClassName);
                    stagger = getElementAnimationDetails(element, staggerCacheKey);
                    applyClasses && element.removeClass(staggerClassName);
                }
                calculationDecorator = calculationDecorator || function(fn) {
                    return fn();
                };
                element.addClass(className);
                var formerData = element.data(NG_ANIMATE_CSS_DATA_KEY) || {};
                var timings = calculationDecorator(function() {
                    return getElementAnimationDetails(element, eventCacheKey);
                });
                var transitionDuration = timings.transitionDuration;
                var animationDuration = timings.animationDuration;
                if (transitionDuration === 0 && animationDuration === 0) {
                    element.removeClass(className);
                    return false;
                }
                element.data(NG_ANIMATE_CSS_DATA_KEY, {
                    running: formerData.running || 0,
                    itemIndex: itemIndex,
                    stagger: stagger,
                    timings: timings,
                    closeAnimationFn: noop
                });
                var isCurrentlyAnimating = formerData.running > 0 || animationEvent == "setClass";
                if (transitionDuration > 0) {
                    blockTransitions(element, className, isCurrentlyAnimating);
                }
                if (animationDuration > 0 && stagger.animationDelay > 0 && stagger.animationDuration === 0) {
                    blockKeyframeAnimations(element);
                }
                return true;
            }
            function isStructuralAnimation(className) {
                return className == "ng-enter" || className == "ng-move" || className == "ng-leave";
            }
            function blockTransitions(element, className, isAnimating) {
                if (isStructuralAnimation(className) || !isAnimating) {
                    extractElementNode(element).style[TRANSITION_PROP + PROPERTY_KEY] = "none";
                } else {
                    element.addClass(NG_ANIMATE_BLOCK_CLASS_NAME);
                }
            }
            function blockKeyframeAnimations(element) {
                extractElementNode(element).style[ANIMATION_PROP] = "none 0s";
            }
            function unblockTransitions(element, className) {
                var prop = TRANSITION_PROP + PROPERTY_KEY;
                var node = extractElementNode(element);
                if (node.style[prop] && node.style[prop].length > 0) {
                    node.style[prop] = "";
                }
                element.removeClass(NG_ANIMATE_BLOCK_CLASS_NAME);
            }
            function unblockKeyframeAnimations(element) {
                var prop = ANIMATION_PROP;
                var node = extractElementNode(element);
                if (node.style[prop] && node.style[prop].length > 0) {
                    node.style[prop] = "";
                }
            }
            function animateRun(animationEvent, element, className, activeAnimationComplete) {
                var node = extractElementNode(element);
                var elementData = element.data(NG_ANIMATE_CSS_DATA_KEY);
                if (node.getAttribute("class").indexOf(className) == -1 || !elementData) {
                    activeAnimationComplete();
                    return;
                }
                var activeClassName = "";
                forEach(className.split(" "), function(klass, i) {
                    activeClassName += (i > 0 ? " " : "") + klass + "-active";
                });
                var stagger = elementData.stagger;
                var timings = elementData.timings;
                var itemIndex = elementData.itemIndex;
                var maxDuration = Math.max(timings.transitionDuration, timings.animationDuration);
                var maxDelay = Math.max(timings.transitionDelay, timings.animationDelay);
                var maxDelayTime = maxDelay * ONE_SECOND;
                var startTime = Date.now();
                var css3AnimationEvents = ANIMATIONEND_EVENT + " " + TRANSITIONEND_EVENT;
                var style = "", appliedStyles = [];
                if (timings.transitionDuration > 0) {
                    var propertyStyle = timings.transitionPropertyStyle;
                    if (propertyStyle.indexOf("all") == -1) {
                        style += CSS_PREFIX + "transition-property: " + propertyStyle + ";";
                        style += CSS_PREFIX + "transition-duration: " + timings.transitionDurationStyle + ";";
                        appliedStyles.push(CSS_PREFIX + "transition-property");
                        appliedStyles.push(CSS_PREFIX + "transition-duration");
                    }
                }
                if (itemIndex > 0) {
                    if (stagger.transitionDelay > 0 && stagger.transitionDuration === 0) {
                        var delayStyle = timings.transitionDelayStyle;
                        style += CSS_PREFIX + "transition-delay: " + prepareStaggerDelay(delayStyle, stagger.transitionDelay, itemIndex) + "; ";
                        appliedStyles.push(CSS_PREFIX + "transition-delay");
                    }
                    if (stagger.animationDelay > 0 && stagger.animationDuration === 0) {
                        style += CSS_PREFIX + "animation-delay: " + prepareStaggerDelay(timings.animationDelayStyle, stagger.animationDelay, itemIndex) + "; ";
                        appliedStyles.push(CSS_PREFIX + "animation-delay");
                    }
                }
                if (appliedStyles.length > 0) {
                    var oldStyle = node.getAttribute("style") || "";
                    node.setAttribute("style", oldStyle + " " + style);
                }
                element.on(css3AnimationEvents, onAnimationProgress);
                element.addClass(activeClassName);
                elementData.closeAnimationFn = function() {
                    onEnd();
                    activeAnimationComplete();
                };
                var staggerTime = itemIndex * (Math.max(stagger.animationDelay, stagger.transitionDelay) || 0);
                var animationTime = (maxDelay + maxDuration) * CLOSING_TIME_BUFFER;
                var totalTime = (staggerTime + animationTime) * ONE_SECOND;
                elementData.running++;
                animationCloseHandler(element, totalTime);
                return onEnd;
                function onEnd(cancelled) {
                    element.off(css3AnimationEvents, onAnimationProgress);
                    element.removeClass(activeClassName);
                    animateClose(element, className);
                    var node = extractElementNode(element);
                    for (var i in appliedStyles) {
                        node.style.removeProperty(appliedStyles[i]);
                    }
                }
                function onAnimationProgress(event) {
                    event.stopPropagation();
                    var ev = event.originalEvent || event;
                    var timeStamp = ev.$manualTimeStamp || ev.timeStamp || Date.now();
                    var elapsedTime = parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));
                    if (Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration) {
                        activeAnimationComplete();
                    }
                }
            }
            function prepareStaggerDelay(delayStyle, staggerDelay, index) {
                var style = "";
                forEach(delayStyle.split(","), function(val, i) {
                    style += (i > 0 ? "," : "") + (index * staggerDelay + parseInt(val, 10)) + "s";
                });
                return style;
            }
            function animateBefore(animationEvent, element, className, calculationDecorator) {
                if (animateSetup(animationEvent, element, className, calculationDecorator)) {
                    return function(cancelled) {
                        cancelled && animateClose(element, className);
                    };
                }
            }
            function animateAfter(animationEvent, element, className, afterAnimationComplete) {
                if (element.data(NG_ANIMATE_CSS_DATA_KEY)) {
                    return animateRun(animationEvent, element, className, afterAnimationComplete);
                } else {
                    animateClose(element, className);
                    afterAnimationComplete();
                }
            }
            function animate(animationEvent, element, className, animationComplete) {
                var preReflowCancellation = animateBefore(animationEvent, element, className);
                if (!preReflowCancellation) {
                    animationComplete();
                    return;
                }
                var cancel = preReflowCancellation;
                afterReflow(element, function() {
                    unblockTransitions(element, className);
                    unblockKeyframeAnimations(element);
                    cancel = animateAfter(animationEvent, element, className, animationComplete);
                });
                return function(cancelled) {
                    (cancel || noop)(cancelled);
                };
            }
            function animateClose(element, className) {
                element.removeClass(className);
                var data = element.data(NG_ANIMATE_CSS_DATA_KEY);
                if (data) {
                    if (data.running) {
                        data.running--;
                    }
                    if (!data.running || data.running === 0) {
                        element.removeData(NG_ANIMATE_CSS_DATA_KEY);
                    }
                }
            }
            return {
                enter: function(element, animationCompleted) {
                    return animate("enter", element, "ng-enter", animationCompleted);
                },
                leave: function(element, animationCompleted) {
                    return animate("leave", element, "ng-leave", animationCompleted);
                },
                move: function(element, animationCompleted) {
                    return animate("move", element, "ng-move", animationCompleted);
                },
                beforeSetClass: function(element, add, remove, animationCompleted) {
                    var className = suffixClasses(remove, "-remove") + " " + suffixClasses(add, "-add");
                    var cancellationMethod = animateBefore("setClass", element, className, function(fn) {
                        var klass = element.attr("class");
                        element.removeClass(remove);
                        element.addClass(add);
                        var timings = fn();
                        element.attr("class", klass);
                        return timings;
                    });
                    if (cancellationMethod) {
                        afterReflow(element, function() {
                            unblockTransitions(element, className);
                            unblockKeyframeAnimations(element);
                            animationCompleted();
                        });
                        return cancellationMethod;
                    }
                    animationCompleted();
                },
                beforeAddClass: function(element, className, animationCompleted) {
                    var cancellationMethod = animateBefore("addClass", element, suffixClasses(className, "-add"), function(fn) {
                        element.addClass(className);
                        var timings = fn();
                        element.removeClass(className);
                        return timings;
                    });
                    if (cancellationMethod) {
                        afterReflow(element, function() {
                            unblockTransitions(element, className);
                            unblockKeyframeAnimations(element);
                            animationCompleted();
                        });
                        return cancellationMethod;
                    }
                    animationCompleted();
                },
                setClass: function(element, add, remove, animationCompleted) {
                    remove = suffixClasses(remove, "-remove");
                    add = suffixClasses(add, "-add");
                    var className = remove + " " + add;
                    return animateAfter("setClass", element, className, animationCompleted);
                },
                addClass: function(element, className, animationCompleted) {
                    return animateAfter("addClass", element, suffixClasses(className, "-add"), animationCompleted);
                },
                beforeRemoveClass: function(element, className, animationCompleted) {
                    var cancellationMethod = animateBefore("removeClass", element, suffixClasses(className, "-remove"), function(fn) {
                        var klass = element.attr("class");
                        element.removeClass(className);
                        var timings = fn();
                        element.attr("class", klass);
                        return timings;
                    });
                    if (cancellationMethod) {
                        afterReflow(element, function() {
                            unblockTransitions(element, className);
                            unblockKeyframeAnimations(element);
                            animationCompleted();
                        });
                        return cancellationMethod;
                    }
                    animationCompleted();
                },
                removeClass: function(element, className, animationCompleted) {
                    return animateAfter("removeClass", element, suffixClasses(className, "-remove"), animationCompleted);
                }
            };
            function suffixClasses(classes, suffix) {
                var className = "";
                classes = angular.isArray(classes) ? classes : classes.split(/\s+/);
                forEach(classes, function(klass, i) {
                    if (klass && klass.length > 0) {
                        className += (i > 0 ? " " : "") + klass + suffix;
                    }
                });
                return className;
            }
        } ]);
    } ]);
})(window, window.angular);

angular.module("mm.foundation", [ "mm.foundation.accordion", "mm.foundation.alert", "mm.foundation.bindHtml", "mm.foundation.buttons", "mm.foundation.position", "mm.foundation.dropdownToggle", "mm.foundation.transition", "mm.foundation.modal", "mm.foundation.pagination", "mm.foundation.tooltip", "mm.foundation.popover", "mm.foundation.progressbar", "mm.foundation.rating", "mm.foundation.tabs", "mm.foundation.tour", "mm.foundation.typeahead" ]);

angular.module("mm.foundation.accordion", []).constant("accordionConfig", {
    closeOthers: true
}).controller("AccordionController", [ "$scope", "$attrs", "accordionConfig", function($scope, $attrs, accordionConfig) {
    this.groups = [];
    this.closeOthers = function(openGroup) {
        var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
        if (closeOthers) {
            angular.forEach(this.groups, function(group) {
                if (group !== openGroup) {
                    group.isOpen = false;
                }
            });
        }
    };
    this.addGroup = function(groupScope) {
        var that = this;
        this.groups.push(groupScope);
        groupScope.$on("$destroy", function(event) {
            that.removeGroup(groupScope);
        });
    };
    this.removeGroup = function(group) {
        var index = this.groups.indexOf(group);
        if (index !== -1) {
            this.groups.splice(this.groups.indexOf(group), 1);
        }
    };
} ]).directive("accordion", function() {
    return {
        restrict: "EA",
        controller: "AccordionController",
        transclude: true,
        replace: false,
        templateUrl: "template/accordion/accordion.html"
    };
}).directive("accordionGroup", [ "$parse", function($parse) {
    return {
        require: "^accordion",
        restrict: "EA",
        transclude: true,
        replace: true,
        templateUrl: "template/accordion/accordion-group.html",
        scope: {
            heading: "@"
        },
        controller: function() {
            this.setHeading = function(element) {
                this.heading = element;
            };
        },
        link: function(scope, element, attrs, accordionCtrl) {
            var getIsOpen, setIsOpen;
            accordionCtrl.addGroup(scope);
            scope.isOpen = false;
            if (attrs.isOpen) {
                getIsOpen = $parse(attrs.isOpen);
                setIsOpen = getIsOpen.assign;
                scope.$parent.$watch(getIsOpen, function(value) {
                    scope.isOpen = !!value;
                });
            }
            scope.$watch("isOpen", function(value) {
                if (value) {
                    accordionCtrl.closeOthers(scope);
                }
                if (setIsOpen) {
                    setIsOpen(scope.$parent, value);
                }
            });
        }
    };
} ]).directive("accordionHeading", function() {
    return {
        restrict: "EA",
        transclude: true,
        template: "",
        replace: true,
        require: "^accordionGroup",
        compile: function(element, attr, transclude) {
            return function link(scope, element, attr, accordionGroupCtrl) {
                accordionGroupCtrl.setHeading(transclude(scope, function() {}));
            };
        }
    };
}).directive("accordionTransclude", function() {
    return {
        require: "^accordionGroup",
        link: function(scope, element, attr, controller) {
            scope.$watch(function() {
                return controller[attr.accordionTransclude];
            }, function(heading) {
                if (heading) {
                    element.html("");
                    element.append(heading);
                }
            });
        }
    };
});

angular.module("mm.foundation.alert", []).controller("AlertController", [ "$scope", "$attrs", function($scope, $attrs) {
    $scope.closeable = "close" in $attrs;
} ]).directive("alert", function() {
    return {
        restrict: "EA",
        controller: "AlertController",
        templateUrl: "template/alert/alert.html",
        transclude: true,
        replace: true,
        scope: {
            type: "=",
            close: "&"
        }
    };
});

angular.module("mm.foundation.bindHtml", []).directive("bindHtmlUnsafe", function() {
    return function(scope, element, attr) {
        element.addClass("ng-binding").data("$binding", attr.bindHtmlUnsafe);
        scope.$watch(attr.bindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value) {
            element.html(value || "");
        });
    };
});

angular.module("mm.foundation.buttons", []).constant("buttonConfig", {
    activeClass: "active",
    toggleEvent: "click"
}).controller("ButtonsController", [ "buttonConfig", function(buttonConfig) {
    this.activeClass = buttonConfig.activeClass;
    this.toggleEvent = buttonConfig.toggleEvent;
} ]).directive("btnRadio", function() {
    return {
        require: [ "btnRadio", "ngModel" ],
        controller: "ButtonsController",
        link: function(scope, element, attrs, ctrls) {
            var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];
            ngModelCtrl.$render = function() {
                element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.btnRadio)));
            };
            element.bind(buttonsCtrl.toggleEvent, function() {
                if (!element.hasClass(buttonsCtrl.activeClass)) {
                    scope.$apply(function() {
                        ngModelCtrl.$setViewValue(scope.$eval(attrs.btnRadio));
                        ngModelCtrl.$render();
                    });
                }
            });
        }
    };
}).directive("btnCheckbox", function() {
    return {
        require: [ "btnCheckbox", "ngModel" ],
        controller: "ButtonsController",
        link: function(scope, element, attrs, ctrls) {
            var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];
            function getTrueValue() {
                return getCheckboxValue(attrs.btnCheckboxTrue, true);
            }
            function getFalseValue() {
                return getCheckboxValue(attrs.btnCheckboxFalse, false);
            }
            function getCheckboxValue(attributeValue, defaultValue) {
                var val = scope.$eval(attributeValue);
                return angular.isDefined(val) ? val : defaultValue;
            }
            ngModelCtrl.$render = function() {
                element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
            };
            element.bind(buttonsCtrl.toggleEvent, function() {
                scope.$apply(function() {
                    ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue());
                    ngModelCtrl.$render();
                });
            });
        }
    };
});

angular.module("mm.foundation.position", []).factory("$position", [ "$document", "$window", function($document, $window) {
    function getStyle(el, cssprop) {
        if (el.currentStyle) {
            return el.currentStyle[cssprop];
        } else if ($window.getComputedStyle) {
            return $window.getComputedStyle(el)[cssprop];
        }
        return el.style[cssprop];
    }
    function isStaticPositioned(element) {
        return (getStyle(element, "position") || "static") === "static";
    }
    var parentOffsetEl = function(element) {
        var docDomEl = $document[0];
        var offsetParent = element.offsetParent || docDomEl;
        while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docDomEl;
    };
    return {
        position: function(element) {
            var elBCR = this.offset(element);
            var offsetParentBCR = {
                top: 0,
                left: 0
            };
            var offsetParentEl = parentOffsetEl(element[0]);
            if (offsetParentEl != $document[0]) {
                offsetParentBCR = this.offset(angular.element(offsetParentEl));
                offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
                offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
            }
            var boundingClientRect = element[0].getBoundingClientRect();
            return {
                width: boundingClientRect.width || element.prop("offsetWidth"),
                height: boundingClientRect.height || element.prop("offsetHeight"),
                top: elBCR.top - offsetParentBCR.top,
                left: elBCR.left - offsetParentBCR.left
            };
        },
        offset: function(element) {
            var boundingClientRect = element[0].getBoundingClientRect();
            return {
                width: boundingClientRect.width || element.prop("offsetWidth"),
                height: boundingClientRect.height || element.prop("offsetHeight"),
                top: boundingClientRect.top + ($window.pageYOffset || $document[0].body.scrollTop || $document[0].documentElement.scrollTop),
                left: boundingClientRect.left + ($window.pageXOffset || $document[0].body.scrollLeft || $document[0].documentElement.scrollLeft)
            };
        }
    };
} ]);

angular.module("mm.foundation.dropdownToggle", [ "mm.foundation.position" ]).directive("dropdownToggle", [ "$document", "$location", "$position", function($document, $location, $position) {
    var openElement = null, closeMenu = angular.noop;
    return {
        restrict: "CA",
        scope: {
            dropdownToggle: "@"
        },
        link: function(scope, element, attrs) {
            var dropdown = angular.element($document[0].querySelector(scope.dropdownToggle));
            scope.$watch("$location.path", function() {
                closeMenu();
            });
            dropdown.css("display", "none").bind("click", function() {
                closeMenu();
            });
            element.bind("click", function(event) {
                var elementWasOpen = element === openElement;
                event.preventDefault();
                event.stopPropagation();
                if (!!openElement) {
                    closeMenu();
                }
                if (!elementWasOpen && !element.hasClass("disabled") && !element.prop("disabled")) {
                    dropdown.css("display", "block");
                    var offset = $position.offset(element);
                    var parentOffset = $position.offset(angular.element(dropdown[0].offsetParent));
                    dropdown.css({
                        left: offset.left - parentOffset.left + "px",
                        top: offset.top - parentOffset.top + offset.height + "px"
                    });
                    openElement = element;
                    closeMenu = function(event) {
                        if (event) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        $document.unbind("click", closeMenu);
                        dropdown.css("display", "none");
                        closeMenu = angular.noop;
                        openElement = null;
                    };
                    $document.bind("click", closeMenu);
                }
            });
        }
    };
} ]);

angular.module("mm.foundation.transition", []).factory("$transition", [ "$q", "$timeout", "$rootScope", function($q, $timeout, $rootScope) {
    var $transition = function(element, trigger, options) {
        options = options || {};
        var deferred = $q.defer();
        var endEventName = $transition[options.animation ? "animationEndEventName" : "transitionEndEventName"];
        var transitionEndHandler = function(event) {
            $rootScope.$apply(function() {
                element.unbind(endEventName, transitionEndHandler);
                deferred.resolve(element);
            });
        };
        if (endEventName) {
            element.bind(endEventName, transitionEndHandler);
        }
        $timeout(function() {
            if (angular.isString(trigger)) {
                element.addClass(trigger);
            } else if (angular.isFunction(trigger)) {
                trigger(element);
            } else if (angular.isObject(trigger)) {
                element.css(trigger);
            }
            if (!endEventName) {
                deferred.resolve(element);
            }
        });
        deferred.promise.cancel = function() {
            if (endEventName) {
                element.unbind(endEventName, transitionEndHandler);
            }
            deferred.reject("Transition cancelled");
        };
        return deferred.promise;
    };
    var transElement = document.createElement("trans");
    var transitionEndEventNames = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        transition: "transitionend"
    };
    var animationEndEventNames = {
        WebkitTransition: "webkitAnimationEnd",
        MozTransition: "animationend",
        OTransition: "oAnimationEnd",
        transition: "animationend"
    };
    function findEndEventName(endEventNames) {
        for (var name in endEventNames) {
            if (transElement.style[name] !== undefined) {
                return endEventNames[name];
            }
        }
    }
    $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
    $transition.animationEndEventName = findEndEventName(animationEndEventNames);
    return $transition;
} ]);

angular.module("mm.foundation.modal", [ "mm.foundation.transition" ]).factory("$$stackedMap", function() {
    return {
        createNew: function() {
            var stack = [];
            return {
                add: function(key, value) {
                    stack.push({
                        key: key,
                        value: value
                    });
                },
                get: function(key) {
                    for (var i = 0; i < stack.length; i++) {
                        if (key == stack[i].key) {
                            return stack[i];
                        }
                    }
                },
                keys: function() {
                    var keys = [];
                    for (var i = 0; i < stack.length; i++) {
                        keys.push(stack[i].key);
                    }
                    return keys;
                },
                top: function() {
                    return stack[stack.length - 1];
                },
                remove: function(key) {
                    var idx = -1;
                    for (var i = 0; i < stack.length; i++) {
                        if (key == stack[i].key) {
                            idx = i;
                            break;
                        }
                    }
                    return stack.splice(idx, 1)[0];
                },
                removeTop: function() {
                    return stack.splice(stack.length - 1, 1)[0];
                },
                length: function() {
                    return stack.length;
                }
            };
        }
    };
}).directive("modalBackdrop", [ "$modalStack", "$timeout", function($modalStack, $timeout) {
    return {
        restrict: "EA",
        replace: true,
        templateUrl: "template/modal/backdrop.html",
        link: function(scope) {
            scope.animate = false;
            $timeout(function() {
                scope.animate = true;
            });
            scope.close = function(evt) {
                var modal = $modalStack.getTop();
                if (modal && modal.value.backdrop && modal.value.backdrop != "static" && evt.target === evt.currentTarget) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    $modalStack.dismiss(modal.key, "backdrop click");
                }
            };
        }
    };
} ]).directive("modalWindow", [ "$modalStack", "$timeout", function($modalStack, $timeout) {
    return {
        restrict: "EA",
        scope: {
            index: "@",
            animate: "="
        },
        replace: true,
        transclude: true,
        templateUrl: "template/modal/window.html",
        link: function(scope, element, attrs) {
            scope.windowClass = attrs.windowClass || "";
            $timeout(function() {
                scope.animate = true;
                element[0].focus();
            });
        }
    };
} ]).factory("$modalStack", [ "$transition", "$timeout", "$document", "$compile", "$rootScope", "$$stackedMap", function($transition, $timeout, $document, $compile, $rootScope, $$stackedMap) {
    var OPENED_MODAL_CLASS = "modal-open";
    var backdropDomEl, backdropScope;
    var openedWindows = $$stackedMap.createNew();
    var $modalStack = {};
    function backdropIndex() {
        var topBackdropIndex = -1;
        var opened = openedWindows.keys();
        for (var i = 0; i < opened.length; i++) {
            if (openedWindows.get(opened[i]).value.backdrop) {
                topBackdropIndex = i;
            }
        }
        return topBackdropIndex;
    }
    $rootScope.$watch(backdropIndex, function(newBackdropIndex) {
        if (backdropScope) {
            backdropScope.index = newBackdropIndex;
        }
    });
    function removeModalWindow(modalInstance) {
        var body = $document.find("body").eq(0);
        var modalWindow = openedWindows.get(modalInstance).value;
        openedWindows.remove(modalInstance);
        removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, 300, checkRemoveBackdrop);
        body.toggleClass(OPENED_MODAL_CLASS, openedWindows.length() > 0);
    }
    function checkRemoveBackdrop() {
        if (backdropDomEl && backdropIndex() == -1) {
            var backdropScopeRef = backdropScope;
            removeAfterAnimate(backdropDomEl, backdropScope, 150, function() {
                backdropScopeRef.$destroy();
                backdropScopeRef = null;
            });
            backdropDomEl = undefined;
            backdropScope = undefined;
        }
    }
    function removeAfterAnimate(domEl, scope, emulateTime, done) {
        scope.animate = false;
        var transitionEndEventName = $transition.transitionEndEventName;
        if (transitionEndEventName) {
            var timeout = $timeout(afterAnimating, emulateTime);
            domEl.bind(transitionEndEventName, function() {
                $timeout.cancel(timeout);
                afterAnimating();
                scope.$apply();
            });
        } else {
            $timeout(afterAnimating, 0);
        }
        function afterAnimating() {
            if (afterAnimating.done) {
                return;
            }
            afterAnimating.done = true;
            domEl.remove();
            if (done) {
                done();
            }
        }
    }
    $document.bind("keydown", function(evt) {
        var modal;
        if (evt.which === 27) {
            modal = openedWindows.top();
            if (modal && modal.value.keyboard) {
                $rootScope.$apply(function() {
                    $modalStack.dismiss(modal.key);
                });
            }
        }
    });
    $modalStack.open = function(modalInstance, modal) {
        openedWindows.add(modalInstance, {
            deferred: modal.deferred,
            modalScope: modal.scope,
            backdrop: modal.backdrop,
            keyboard: modal.keyboard
        });
        var body = $document.find("body").eq(0), currBackdropIndex = backdropIndex();
        if (currBackdropIndex >= 0 && !backdropDomEl) {
            backdropScope = $rootScope.$new(true);
            backdropScope.index = currBackdropIndex;
            backdropDomEl = $compile("<div modal-backdrop></div>")(backdropScope);
            body.append(backdropDomEl);
        }
        var angularDomEl = angular.element("<div modal-window></div>");
        angularDomEl.attr("window-class", modal.windowClass);
        angularDomEl.attr("index", openedWindows.length() - 1);
        angularDomEl.attr("animate", "animate");
        angularDomEl.html(modal.content);
        var modalDomEl = $compile(angularDomEl)(modal.scope);
        openedWindows.top().value.modalDomEl = modalDomEl;
        body.append(modalDomEl);
        body.addClass(OPENED_MODAL_CLASS);
    };
    $modalStack.close = function(modalInstance, result) {
        var modalWindow = openedWindows.get(modalInstance).value;
        if (modalWindow) {
            modalWindow.deferred.resolve(result);
            removeModalWindow(modalInstance);
        }
    };
    $modalStack.dismiss = function(modalInstance, reason) {
        var modalWindow = openedWindows.get(modalInstance).value;
        if (modalWindow) {
            modalWindow.deferred.reject(reason);
            removeModalWindow(modalInstance);
        }
    };
    $modalStack.dismissAll = function(reason) {
        var topModal = this.getTop();
        while (topModal) {
            this.dismiss(topModal.key, reason);
            topModal = this.getTop();
        }
    };
    $modalStack.getTop = function() {
        return openedWindows.top();
    };
    return $modalStack;
} ]).provider("$modal", function() {
    var $modalProvider = {
        options: {
            backdrop: true,
            keyboard: true
        },
        $get: [ "$injector", "$rootScope", "$q", "$http", "$templateCache", "$controller", "$modalStack", function($injector, $rootScope, $q, $http, $templateCache, $controller, $modalStack) {
            var $modal = {};
            function getTemplatePromise(options) {
                return options.template ? $q.when(options.template) : $http.get(options.templateUrl, {
                    cache: $templateCache
                }).then(function(result) {
                    return result.data;
                });
            }
            function getResolvePromises(resolves) {
                var promisesArr = [];
                angular.forEach(resolves, function(value, key) {
                    if (angular.isFunction(value) || angular.isArray(value)) {
                        promisesArr.push($q.when($injector.invoke(value)));
                    }
                });
                return promisesArr;
            }
            $modal.open = function(modalOptions) {
                var modalResultDeferred = $q.defer();
                var modalOpenedDeferred = $q.defer();
                var modalInstance = {
                    result: modalResultDeferred.promise,
                    opened: modalOpenedDeferred.promise,
                    close: function(result) {
                        $modalStack.close(modalInstance, result);
                    },
                    dismiss: function(reason) {
                        $modalStack.dismiss(modalInstance, reason);
                    }
                };
                modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
                modalOptions.resolve = modalOptions.resolve || {};
                if (!modalOptions.template && !modalOptions.templateUrl) {
                    throw new Error("One of template or templateUrl options is required.");
                }
                var templateAndResolvePromise = $q.all([ getTemplatePromise(modalOptions) ].concat(getResolvePromises(modalOptions.resolve)));
                templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {
                    var modalScope = (modalOptions.scope || $rootScope).$new();
                    modalScope.$close = modalInstance.close;
                    modalScope.$dismiss = modalInstance.dismiss;
                    var ctrlInstance, ctrlLocals = {};
                    var resolveIter = 1;
                    if (modalOptions.controller) {
                        ctrlLocals.$scope = modalScope;
                        ctrlLocals.$modalInstance = modalInstance;
                        angular.forEach(modalOptions.resolve, function(value, key) {
                            ctrlLocals[key] = tplAndVars[resolveIter++];
                        });
                        ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                    }
                    $modalStack.open(modalInstance, {
                        scope: modalScope,
                        deferred: modalResultDeferred,
                        content: tplAndVars[0],
                        backdrop: modalOptions.backdrop,
                        keyboard: modalOptions.keyboard,
                        windowClass: modalOptions.windowClass
                    });
                }, function resolveError(reason) {
                    modalResultDeferred.reject(reason);
                });
                templateAndResolvePromise.then(function() {
                    modalOpenedDeferred.resolve(true);
                }, function() {
                    modalOpenedDeferred.reject(false);
                });
                return modalInstance;
            };
            return $modal;
        } ]
    };
    return $modalProvider;
});

angular.module("mm.foundation.pagination", []).controller("PaginationController", [ "$scope", "$attrs", "$parse", "$interpolate", function($scope, $attrs, $parse, $interpolate) {
    var self = this, setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;
    this.init = function(defaultItemsPerPage) {
        if ($attrs.itemsPerPage) {
            $scope.$parent.$watch($parse($attrs.itemsPerPage), function(value) {
                self.itemsPerPage = parseInt(value, 10);
                $scope.totalPages = self.calculateTotalPages();
            });
        } else {
            this.itemsPerPage = defaultItemsPerPage;
        }
    };
    this.noPrevious = function() {
        return this.page === 1;
    };
    this.noNext = function() {
        return this.page === $scope.totalPages;
    };
    this.isActive = function(page) {
        return this.page === page;
    };
    this.calculateTotalPages = function() {
        var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    };
    this.getAttributeValue = function(attribute, defaultValue, interpolate) {
        return angular.isDefined(attribute) ? interpolate ? $interpolate(attribute)($scope.$parent) : $scope.$parent.$eval(attribute) : defaultValue;
    };
    this.render = function() {
        this.page = parseInt($scope.page, 10) || 1;
        if (this.page > 0 && this.page <= $scope.totalPages) {
            $scope.pages = this.getPages(this.page, $scope.totalPages);
        }
    };
    $scope.selectPage = function(page) {
        if (!self.isActive(page) && page > 0 && page <= $scope.totalPages) {
            $scope.page = page;
            $scope.onSelectPage({
                page: page
            });
        }
    };
    $scope.$watch("page", function() {
        self.render();
    });
    $scope.$watch("totalItems", function() {
        $scope.totalPages = self.calculateTotalPages();
    });
    $scope.$watch("totalPages", function(value) {
        setNumPages($scope.$parent, value);
        if (self.page > value) {
            $scope.selectPage(value);
        } else {
            self.render();
        }
    });
} ]).constant("paginationConfig", {
    itemsPerPage: 10,
    boundaryLinks: false,
    directionLinks: true,
    firstText: "First",
    previousText: "Previous",
    nextText: "Next",
    lastText: "Last",
    rotate: true
}).directive("pagination", [ "$parse", "paginationConfig", function($parse, config) {
    return {
        restrict: "EA",
        scope: {
            page: "=",
            totalItems: "=",
            onSelectPage: " &"
        },
        controller: "PaginationController",
        templateUrl: "template/pagination/pagination.html",
        replace: true,
        link: function(scope, element, attrs, paginationCtrl) {
            var maxSize, boundaryLinks = paginationCtrl.getAttributeValue(attrs.boundaryLinks, config.boundaryLinks), directionLinks = paginationCtrl.getAttributeValue(attrs.directionLinks, config.directionLinks), firstText = paginationCtrl.getAttributeValue(attrs.firstText, config.firstText, true), previousText = paginationCtrl.getAttributeValue(attrs.previousText, config.previousText, true), nextText = paginationCtrl.getAttributeValue(attrs.nextText, config.nextText, true), lastText = paginationCtrl.getAttributeValue(attrs.lastText, config.lastText, true), rotate = paginationCtrl.getAttributeValue(attrs.rotate, config.rotate);
            paginationCtrl.init(config.itemsPerPage);
            if (attrs.maxSize) {
                scope.$parent.$watch($parse(attrs.maxSize), function(value) {
                    maxSize = parseInt(value, 10);
                    paginationCtrl.render();
                });
            }
            function makePage(number, text, isActive, isDisabled) {
                return {
                    number: number,
                    text: text,
                    active: isActive,
                    disabled: isDisabled
                };
            }
            paginationCtrl.getPages = function(currentPage, totalPages) {
                var pages = [];
                var startPage = 1, endPage = totalPages;
                var isMaxSized = angular.isDefined(maxSize) && maxSize < totalPages;
                if (isMaxSized) {
                    if (rotate) {
                        startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
                        endPage = startPage + maxSize - 1;
                        if (endPage > totalPages) {
                            endPage = totalPages;
                            startPage = endPage - maxSize + 1;
                        }
                    } else {
                        startPage = (Math.ceil(currentPage / maxSize) - 1) * maxSize + 1;
                        endPage = Math.min(startPage + maxSize - 1, totalPages);
                    }
                }
                for (var number = startPage; number <= endPage; number++) {
                    var page = makePage(number, number, paginationCtrl.isActive(number), false);
                    pages.push(page);
                }
                if (isMaxSized && !rotate) {
                    if (startPage > 1) {
                        var previousPageSet = makePage(startPage - 1, "...", false, false);
                        pages.unshift(previousPageSet);
                    }
                    if (endPage < totalPages) {
                        var nextPageSet = makePage(endPage + 1, "...", false, false);
                        pages.push(nextPageSet);
                    }
                }
                if (directionLinks) {
                    var previousPage = makePage(currentPage - 1, previousText, false, paginationCtrl.noPrevious());
                    pages.unshift(previousPage);
                    var nextPage = makePage(currentPage + 1, nextText, false, paginationCtrl.noNext());
                    pages.push(nextPage);
                }
                if (boundaryLinks) {
                    var firstPage = makePage(1, firstText, false, paginationCtrl.noPrevious());
                    pages.unshift(firstPage);
                    var lastPage = makePage(totalPages, lastText, false, paginationCtrl.noNext());
                    pages.push(lastPage);
                }
                return pages;
            };
        }
    };
} ]).constant("pagerConfig", {
    itemsPerPage: 10,
    previousText: "« Previous",
    nextText: "Next »",
    align: true
}).directive("pager", [ "pagerConfig", function(config) {
    return {
        restrict: "EA",
        scope: {
            page: "=",
            totalItems: "=",
            onSelectPage: " &"
        },
        controller: "PaginationController",
        templateUrl: "template/pagination/pager.html",
        replace: true,
        link: function(scope, element, attrs, paginationCtrl) {
            var previousText = paginationCtrl.getAttributeValue(attrs.previousText, config.previousText, true), nextText = paginationCtrl.getAttributeValue(attrs.nextText, config.nextText, true), align = paginationCtrl.getAttributeValue(attrs.align, config.align);
            paginationCtrl.init(config.itemsPerPage);
            function makePage(number, text, isDisabled, isPrevious, isNext) {
                return {
                    number: number,
                    text: text,
                    disabled: isDisabled,
                    previous: align && isPrevious,
                    next: align && isNext
                };
            }
            paginationCtrl.getPages = function(currentPage) {
                return [ makePage(currentPage - 1, previousText, paginationCtrl.noPrevious(), true, false), makePage(currentPage + 1, nextText, paginationCtrl.noNext(), false, true) ];
            };
        }
    };
} ]);

angular.module("mm.foundation.tooltip", [ "mm.foundation.position", "mm.foundation.bindHtml" ]).provider("$tooltip", function() {
    var defaultOptions = {
        placement: "top",
        animation: true,
        popupDelay: 0
    };
    var triggerMap = {
        mouseenter: "mouseleave",
        click: "click",
        focus: "blur"
    };
    var globalOptions = {};
    this.options = function(value) {
        angular.extend(globalOptions, value);
    };
    this.setTriggers = function setTriggers(triggers) {
        angular.extend(triggerMap, triggers);
    };
    function snake_case(name) {
        var regexp = /[A-Z]/g;
        var separator = "-";
        return name.replace(regexp, function(letter, pos) {
            return (pos ? separator : "") + letter.toLowerCase();
        });
    }
    this.$get = [ "$window", "$compile", "$timeout", "$parse", "$document", "$position", "$interpolate", function($window, $compile, $timeout, $parse, $document, $position, $interpolate) {
        return function $tooltip(type, prefix, defaultTriggerShow) {
            var options = angular.extend({}, defaultOptions, globalOptions);
            function getTriggers(trigger) {
                var show = trigger || options.trigger || defaultTriggerShow;
                var hide = triggerMap[show] || show;
                return {
                    show: show,
                    hide: hide
                };
            }
            var directiveName = snake_case(type);
            var startSym = $interpolate.startSymbol();
            var endSym = $interpolate.endSymbol();
            var template = "<div " + directiveName + "-popup " + 'title="' + startSym + "tt_title" + endSym + '" ' + 'content="' + startSym + "tt_content" + endSym + '" ' + 'placement="' + startSym + "tt_placement" + endSym + '" ' + 'animation="tt_animation" ' + 'is-open="tt_isOpen"' + ">" + "</div>";
            return {
                restrict: "EA",
                scope: true,
                compile: function(tElem, tAttrs) {
                    var tooltipLinker = $compile(template);
                    return function link(scope, element, attrs) {
                        var tooltip;
                        var transitionTimeout;
                        var popupTimeout;
                        var appendToBody = angular.isDefined(options.appendToBody) ? options.appendToBody : false;
                        var triggers = getTriggers(undefined);
                        var hasRegisteredTriggers = false;
                        var hasEnableExp = angular.isDefined(attrs[prefix + "Enable"]);
                        var positionTooltip = function() {
                            var position, ttWidth, ttHeight, ttPosition;
                            position = appendToBody ? $position.offset(element) : $position.position(element);
                            ttWidth = tooltip.prop("offsetWidth");
                            ttHeight = tooltip.prop("offsetHeight");
                            switch (scope.tt_placement) {
                              case "right":
                                ttPosition = {
                                    top: position.top + position.height / 2 - ttHeight / 2,
                                    left: position.left + position.width + 10
                                };
                                break;

                              case "bottom":
                                ttPosition = {
                                    top: position.top + position.height + 10,
                                    left: position.left
                                };
                                break;

                              case "left":
                                ttPosition = {
                                    top: position.top + position.height / 2 - ttHeight / 2,
                                    left: position.left - ttWidth - 10
                                };
                                break;

                              default:
                                ttPosition = {
                                    top: position.top - ttHeight - 10,
                                    left: position.left
                                };
                                break;
                            }
                            ttPosition.top += "px";
                            ttPosition.left += "px";
                            tooltip.css(ttPosition);
                        };
                        scope.tt_isOpen = false;
                        function toggleTooltipBind() {
                            if (!scope.tt_isOpen) {
                                showTooltipBind();
                            } else {
                                hideTooltipBind();
                            }
                        }
                        function showTooltipBind() {
                            if (hasEnableExp && !scope.$eval(attrs[prefix + "Enable"])) {
                                return;
                            }
                            if (scope.tt_popupDelay) {
                                popupTimeout = $timeout(show, scope.tt_popupDelay, false);
                                popupTimeout.then(function(reposition) {
                                    reposition();
                                });
                            } else {
                                show()();
                            }
                        }
                        function hideTooltipBind() {
                            scope.$apply(function() {
                                hide();
                            });
                        }
                        function show() {
                            if (!scope.tt_content) {
                                return angular.noop;
                            }
                            createTooltip();
                            if (transitionTimeout) {
                                $timeout.cancel(transitionTimeout);
                            }
                            tooltip.css({
                                top: 0,
                                left: 0,
                                display: "block"
                            });
                            if (appendToBody) {
                                $document.find("body").append(tooltip);
                            } else {
                                element.after(tooltip);
                            }
                            positionTooltip();
                            scope.tt_isOpen = true;
                            scope.$digest();
                            return positionTooltip;
                        }
                        function hide() {
                            scope.tt_isOpen = false;
                            $timeout.cancel(popupTimeout);
                            if (scope.tt_animation) {
                                transitionTimeout = $timeout(removeTooltip, 500);
                            } else {
                                removeTooltip();
                            }
                        }
                        function createTooltip() {
                            if (tooltip) {
                                removeTooltip();
                            }
                            tooltip = tooltipLinker(scope, function() {});
                            scope.$digest();
                        }
                        function removeTooltip() {
                            if (tooltip) {
                                tooltip.remove();
                                tooltip = null;
                            }
                        }
                        attrs.$observe(type, function(val) {
                            scope.tt_content = val;
                            if (!val && scope.tt_isOpen) {
                                hide();
                            }
                        });
                        attrs.$observe(prefix + "Title", function(val) {
                            scope.tt_title = val;
                        });
                        attrs.$observe(prefix + "Placement", function(val) {
                            scope.tt_placement = angular.isDefined(val) ? val : options.placement;
                        });
                        attrs.$observe(prefix + "PopupDelay", function(val) {
                            var delay = parseInt(val, 10);
                            scope.tt_popupDelay = !isNaN(delay) ? delay : options.popupDelay;
                        });
                        var unregisterTriggers = function() {
                            if (hasRegisteredTriggers) {
                                element.unbind(triggers.show, showTooltipBind);
                                element.unbind(triggers.hide, hideTooltipBind);
                            }
                        };
                        var unregisterTriggerFunction = function() {};
                        attrs.$observe(prefix + "Trigger", function(val) {
                            unregisterTriggers();
                            unregisterTriggerFunction();
                            triggers = getTriggers(val);
                            if (angular.isFunction(triggers.show)) {
                                unregisterTriggerFunction = scope.$watch(function() {
                                    return triggers.show(scope, element, attrs);
                                }, function(val) {
                                    return val ? $timeout(show) : $timeout(hide);
                                });
                            } else {
                                if (triggers.show === triggers.hide) {
                                    element.bind(triggers.show, toggleTooltipBind);
                                } else {
                                    element.bind(triggers.show, showTooltipBind);
                                    element.bind(triggers.hide, hideTooltipBind);
                                }
                            }
                            hasRegisteredTriggers = true;
                        });
                        var animation = scope.$eval(attrs[prefix + "Animation"]);
                        scope.tt_animation = angular.isDefined(animation) ? !!animation : options.animation;
                        attrs.$observe(prefix + "AppendToBody", function(val) {
                            appendToBody = angular.isDefined(val) ? $parse(val)(scope) : appendToBody;
                        });
                        if (appendToBody) {
                            scope.$on("$locationChangeSuccess", function closeTooltipOnLocationChangeSuccess() {
                                if (scope.tt_isOpen) {
                                    hide();
                                }
                            });
                        }
                        scope.$on("$destroy", function onDestroyTooltip() {
                            $timeout.cancel(transitionTimeout);
                            $timeout.cancel(popupTimeout);
                            unregisterTriggers();
                            unregisterTriggerFunction();
                            removeTooltip();
                        });
                    };
                }
            };
        };
    } ];
}).directive("tooltipPopup", function() {
    return {
        restrict: "EA",
        replace: true,
        scope: {
            content: "@",
            placement: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/tooltip/tooltip-popup.html"
    };
}).directive("tooltip", [ "$tooltip", function($tooltip) {
    return $tooltip("tooltip", "tooltip", "mouseenter");
} ]).directive("tooltipHtmlUnsafePopup", function() {
    return {
        restrict: "EA",
        replace: true,
        scope: {
            content: "@",
            placement: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/tooltip/tooltip-html-unsafe-popup.html"
    };
}).directive("tooltipHtmlUnsafe", [ "$tooltip", function($tooltip) {
    return $tooltip("tooltipHtmlUnsafe", "tooltip", "mouseenter");
} ]);

angular.module("mm.foundation.popover", [ "mm.foundation.tooltip" ]).directive("popoverPopup", function() {
    return {
        restrict: "EA",
        replace: true,
        scope: {
            title: "@",
            content: "@",
            placement: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/popover/popover.html"
    };
}).directive("popover", [ "$tooltip", function($tooltip) {
    return $tooltip("popover", "popover", "click");
} ]);

angular.module("mm.foundation.progressbar", [ "mm.foundation.transition" ]).constant("progressConfig", {
    animate: true,
    max: 100
}).controller("ProgressController", [ "$scope", "$attrs", "progressConfig", "$transition", function($scope, $attrs, progressConfig, $transition) {
    var self = this, bars = [], max = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : progressConfig.max, animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : progressConfig.animate;
    this.addBar = function(bar, element) {
        var oldValue = 0, index = bar.$parent.$index;
        if (angular.isDefined(index) && bars[index]) {
            oldValue = bars[index].value;
        }
        bars.push(bar);
        this.update(element, bar.value, oldValue);
        bar.$watch("value", function(value, oldValue) {
            if (value !== oldValue) {
                self.update(element, value, oldValue);
            }
        });
        bar.$on("$destroy", function() {
            self.removeBar(bar);
        });
    };
    this.update = function(element, newValue, oldValue) {
        var percent = this.getPercentage(newValue);
        if (animate) {
            element.css("width", this.getPercentage(oldValue) + "%");
            $transition(element, {
                width: percent + "%"
            });
        } else {
            element.css({
                transition: "none",
                width: percent + "%"
            });
        }
    };
    this.removeBar = function(bar) {
        bars.splice(bars.indexOf(bar), 1);
    };
    this.getPercentage = function(value) {
        return Math.round(100 * value / max);
    };
} ]).directive("progress", function() {
    return {
        restrict: "EA",
        replace: true,
        transclude: true,
        controller: "ProgressController",
        require: "progress",
        scope: {},
        template: '<div class="progress" ng-transclude></div>'
    };
}).directive("bar", function() {
    return {
        restrict: "EA",
        replace: true,
        transclude: true,
        require: "^progress",
        scope: {
            value: "=",
            type: "@"
        },
        templateUrl: "template/progressbar/bar.html",
        link: function(scope, element, attrs, progressCtrl) {
            progressCtrl.addBar(scope, element);
        }
    };
}).directive("progressbar", function() {
    return {
        restrict: "EA",
        replace: true,
        transclude: true,
        controller: "ProgressController",
        scope: {
            value: "=",
            type: "@"
        },
        templateUrl: "template/progressbar/progressbar.html",
        link: function(scope, element, attrs, progressCtrl) {
            progressCtrl.addBar(scope, angular.element(element.children()[0]));
        }
    };
});

angular.module("mm.foundation.rating", []).constant("ratingConfig", {
    max: 5,
    stateOn: null,
    stateOff: null
}).controller("RatingController", [ "$scope", "$attrs", "$parse", "ratingConfig", function($scope, $attrs, $parse, ratingConfig) {
    this.maxRange = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max;
    this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
    this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;
    this.createRateObjects = function(states) {
        var defaultOptions = {
            stateOn: this.stateOn,
            stateOff: this.stateOff
        };
        for (var i = 0, n = states.length; i < n; i++) {
            states[i] = angular.extend({
                index: i
            }, defaultOptions, states[i]);
        }
        return states;
    };
    $scope.range = angular.isDefined($attrs.ratingStates) ? this.createRateObjects(angular.copy($scope.$parent.$eval($attrs.ratingStates))) : this.createRateObjects(new Array(this.maxRange));
    $scope.rate = function(value) {
        if ($scope.value !== value && !$scope.readonly) {
            $scope.value = value;
        }
    };
    $scope.enter = function(value) {
        if (!$scope.readonly) {
            $scope.val = value;
        }
        $scope.onHover({
            value: value
        });
    };
    $scope.reset = function() {
        $scope.val = angular.copy($scope.value);
        $scope.onLeave();
    };
    $scope.$watch("value", function(value) {
        $scope.val = value;
    });
    $scope.readonly = false;
    if ($attrs.readonly) {
        $scope.$parent.$watch($parse($attrs.readonly), function(value) {
            $scope.readonly = !!value;
        });
    }
} ]).directive("rating", function() {
    return {
        restrict: "EA",
        scope: {
            value: "=",
            onHover: "&",
            onLeave: "&"
        },
        controller: "RatingController",
        templateUrl: "template/rating/rating.html",
        replace: true
    };
});

angular.module("mm.foundation.tabs", []).controller("TabsetController", [ "$scope", function TabsetCtrl($scope) {
    var ctrl = this, tabs = ctrl.tabs = $scope.tabs = [];
    ctrl.select = function(tab) {
        angular.forEach(tabs, function(tab) {
            tab.active = false;
        });
        tab.active = true;
    };
    ctrl.addTab = function addTab(tab) {
        tabs.push(tab);
        if (tabs.length === 1 || tab.active) {
            ctrl.select(tab);
        }
    };
    ctrl.removeTab = function removeTab(tab) {
        var index = tabs.indexOf(tab);
        if (tab.active && tabs.length > 1) {
            var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
            ctrl.select(tabs[newActiveIndex]);
        }
        tabs.splice(index, 1);
    };
} ]).directive("tabset", function() {
    return {
        restrict: "EA",
        transclude: true,
        replace: true,
        scope: {},
        controller: "TabsetController",
        templateUrl: "template/tabs/tabset.html",
        link: function(scope, element, attrs) {
            scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
            scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
            scope.type = angular.isDefined(attrs.type) ? scope.$parent.$eval(attrs.type) : "tabs";
        }
    };
}).directive("tab", [ "$parse", function($parse) {
    return {
        require: "^tabset",
        restrict: "EA",
        replace: true,
        templateUrl: "template/tabs/tab.html",
        transclude: true,
        scope: {
            heading: "@",
            onSelect: "&select",
            onDeselect: "&deselect"
        },
        controller: function() {},
        compile: function(elm, attrs, transclude) {
            return function postLink(scope, elm, attrs, tabsetCtrl) {
                var getActive, setActive;
                if (attrs.active) {
                    getActive = $parse(attrs.active);
                    setActive = getActive.assign;
                    scope.$parent.$watch(getActive, function updateActive(value, oldVal) {
                        if (value !== oldVal) {
                            scope.active = !!value;
                        }
                    });
                    scope.active = getActive(scope.$parent);
                } else {
                    setActive = getActive = angular.noop;
                }
                scope.$watch("active", function(active) {
                    setActive(scope.$parent, active);
                    if (active) {
                        tabsetCtrl.select(scope);
                        scope.onSelect();
                    } else {
                        scope.onDeselect();
                    }
                });
                scope.disabled = false;
                if (attrs.disabled) {
                    scope.$parent.$watch($parse(attrs.disabled), function(value) {
                        scope.disabled = !!value;
                    });
                }
                scope.select = function() {
                    if (!scope.disabled) {
                        scope.active = true;
                    }
                };
                tabsetCtrl.addTab(scope);
                scope.$on("$destroy", function() {
                    tabsetCtrl.removeTab(scope);
                });
                scope.$transcludeFn = transclude;
            };
        }
    };
} ]).directive("tabHeadingTransclude", [ function() {
    return {
        restrict: "A",
        require: "^tab",
        link: function(scope, elm, attrs, tabCtrl) {
            scope.$watch("headingElement", function updateHeadingElement(heading) {
                if (heading) {
                    elm.html("");
                    elm.append(heading);
                }
            });
        }
    };
} ]).directive("tabContentTransclude", function() {
    return {
        restrict: "A",
        require: "^tabset",
        link: function(scope, elm, attrs) {
            var tab = scope.$eval(attrs.tabContentTransclude);
            tab.$transcludeFn(tab.$parent, function(contents) {
                angular.forEach(contents, function(node) {
                    if (isTabHeading(node)) {
                        tab.headingElement = node;
                    } else {
                        elm.append(node);
                    }
                });
            });
        }
    };
    function isTabHeading(node) {
        return node.tagName && (node.hasAttribute("tab-heading") || node.hasAttribute("data-tab-heading") || node.tagName.toLowerCase() === "tab-heading" || node.tagName.toLowerCase() === "data-tab-heading");
    }
});

angular.module("mm.foundation.tour", [ "mm.foundation.position", "mm.foundation.tooltip" ]).service("$tour", [ "$window", function($window) {
    var currentIndex = getCurrentStep();
    var ended = false;
    var steps = {};
    function getCurrentStep() {
        return parseInt($window.localStorage.getItem("mm.tour.step"), 10);
    }
    function setCurrentStep(step) {
        currentIndex = step;
        $window.localStorage.setItem("mm.tour.step", step);
    }
    this.add = function(index, attrs) {
        steps[index] = attrs;
    };
    this.has = function(index) {
        return !!steps[index];
    };
    this.isActive = function() {
        return currentIndex > 0;
    };
    this.current = function(index) {
        if (index) {
            setCurrentStep(currentIndex);
        } else {
            return currentIndex;
        }
    };
    this.start = function() {
        setCurrentStep(1);
    };
    this.next = function() {
        setCurrentStep(currentIndex + 1);
    };
    this.end = function() {
        setCurrentStep(0);
    };
} ]).directive("stepPopup", [ "$tour", function($tour) {
    return {
        restrict: "EA",
        replace: true,
        scope: {
            title: "@",
            content: "@",
            placement: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/tour/tour.html",
        link: function(scope, element) {
            scope.isLastStep = function() {
                return !$tour.has($tour.current() + 1);
            };
            scope.endTour = function() {
                element.remove();
                $tour.end();
            };
            scope.nextStep = function() {
                element.remove();
                $tour.next();
            };
        }
    };
} ]).directive("step", [ "$position", "$tooltip", "$tour", "$window", function($position, $tooltip, $tour, $window) {
    function isElementInViewport(element) {
        var rect = element[0].getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0 && rect.bottom <= $window.innerHeight - 80 && rect.right <= $window.innerWidth;
    }
    function show(scope, element, attrs) {
        var index = parseInt(attrs.stepIndex, 10);
        if ($tour.isActive() && index) {
            $tour.add(index, attrs);
            if (index === $tour.current()) {
                if (!isElementInViewport(element)) {
                    var offset = $position.offset(element);
                    $window.scrollTo(0, offset.top - $window.innerHeight / 2);
                }
                return true;
            }
        }
        return false;
    }
    return $tooltip("step", "step", show);
} ]);

angular.module("mm.foundation.typeahead", [ "mm.foundation.position", "mm.foundation.bindHtml" ]).factory("typeaheadParser", [ "$parse", function($parse) {
    var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;
    return {
        parse: function(input) {
            var match = input.match(TYPEAHEAD_REGEXP), modelMapper, viewMapper, source;
            if (!match) {
                throw new Error("Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_'" + " but got '" + input + "'.");
            }
            return {
                itemName: match[3],
                source: $parse(match[4]),
                viewMapper: $parse(match[2] || match[1]),
                modelMapper: $parse(match[1])
            };
        }
    };
} ]).directive("typeahead", [ "$compile", "$parse", "$q", "$timeout", "$document", "$position", "typeaheadParser", function($compile, $parse, $q, $timeout, $document, $position, typeaheadParser) {
    var HOT_KEYS = [ 9, 13, 27, 38, 40 ];
    return {
        require: "ngModel",
        link: function(originalScope, element, attrs, modelCtrl) {
            var minSearch = originalScope.$eval(attrs.typeaheadMinLength) || 1;
            var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;
            var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;
            var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;
            var onSelectCallback = $parse(attrs.typeaheadOnSelect);
            var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;
            var appendToBody = attrs.typeaheadAppendToBody ? $parse(attrs.typeaheadAppendToBody) : false;
            var $setModelValue = $parse(attrs.ngModel).assign;
            var parserResult = typeaheadParser.parse(attrs.typeahead);
            var hasFocus;
            var popUpEl = angular.element("<div typeahead-popup></div>");
            popUpEl.attr({
                matches: "matches",
                active: "activeIdx",
                select: "select(activeIdx)",
                query: "query",
                position: "position"
            });
            if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
                popUpEl.attr("template-url", attrs.typeaheadTemplateUrl);
            }
            var scope = originalScope.$new();
            originalScope.$on("$destroy", function() {
                scope.$destroy();
            });
            var resetMatches = function() {
                scope.matches = [];
                scope.activeIdx = -1;
            };
            var getMatchesAsync = function(inputValue) {
                var locals = {
                    $viewValue: inputValue
                };
                isLoadingSetter(originalScope, true);
                $q.when(parserResult.source(originalScope, locals)).then(function(matches) {
                    if (inputValue === modelCtrl.$viewValue && hasFocus) {
                        if (matches.length > 0) {
                            scope.activeIdx = 0;
                            scope.matches.length = 0;
                            for (var i = 0; i < matches.length; i++) {
                                locals[parserResult.itemName] = matches[i];
                                scope.matches.push({
                                    label: parserResult.viewMapper(scope, locals),
                                    model: matches[i]
                                });
                            }
                            scope.query = inputValue;
                            scope.position = appendToBody ? $position.offset(element) : $position.position(element);
                            scope.position.top = scope.position.top + element.prop("offsetHeight");
                        } else {
                            resetMatches();
                        }
                        isLoadingSetter(originalScope, false);
                    }
                }, function() {
                    resetMatches();
                    isLoadingSetter(originalScope, false);
                });
            };
            resetMatches();
            scope.query = undefined;
            var timeoutPromise;
            modelCtrl.$parsers.unshift(function(inputValue) {
                hasFocus = true;
                if (inputValue && inputValue.length >= minSearch) {
                    if (waitTime > 0) {
                        if (timeoutPromise) {
                            $timeout.cancel(timeoutPromise);
                        }
                        timeoutPromise = $timeout(function() {
                            getMatchesAsync(inputValue);
                        }, waitTime);
                    } else {
                        getMatchesAsync(inputValue);
                    }
                } else {
                    isLoadingSetter(originalScope, false);
                    resetMatches();
                }
                if (isEditable) {
                    return inputValue;
                } else {
                    if (!inputValue) {
                        modelCtrl.$setValidity("editable", true);
                        return inputValue;
                    } else {
                        modelCtrl.$setValidity("editable", false);
                        return undefined;
                    }
                }
            });
            modelCtrl.$formatters.push(function(modelValue) {
                var candidateViewValue, emptyViewValue;
                var locals = {};
                if (inputFormatter) {
                    locals["$model"] = modelValue;
                    return inputFormatter(originalScope, locals);
                } else {
                    locals[parserResult.itemName] = modelValue;
                    candidateViewValue = parserResult.viewMapper(originalScope, locals);
                    locals[parserResult.itemName] = undefined;
                    emptyViewValue = parserResult.viewMapper(originalScope, locals);
                    return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
                }
            });
            scope.select = function(activeIdx) {
                var locals = {};
                var model, item;
                locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
                model = parserResult.modelMapper(originalScope, locals);
                $setModelValue(originalScope, model);
                modelCtrl.$setValidity("editable", true);
                onSelectCallback(originalScope, {
                    $item: item,
                    $model: model,
                    $label: parserResult.viewMapper(originalScope, locals)
                });
                resetMatches();
                element[0].focus();
            };
            element.bind("keydown", function(evt) {
                if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
                    return;
                }
                evt.preventDefault();
                if (evt.which === 40) {
                    scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
                    scope.$digest();
                } else if (evt.which === 38) {
                    scope.activeIdx = (scope.activeIdx ? scope.activeIdx : scope.matches.length) - 1;
                    scope.$digest();
                } else if (evt.which === 13 || evt.which === 9) {
                    scope.$apply(function() {
                        scope.select(scope.activeIdx);
                    });
                } else if (evt.which === 27) {
                    evt.stopPropagation();
                    resetMatches();
                    scope.$digest();
                }
            });
            element.bind("blur", function(evt) {
                hasFocus = false;
            });
            var dismissClickHandler = function(evt) {
                if (element[0] !== evt.target) {
                    resetMatches();
                    scope.$digest();
                }
            };
            $document.bind("click", dismissClickHandler);
            originalScope.$on("$destroy", function() {
                $document.unbind("click", dismissClickHandler);
            });
            var $popup = $compile(popUpEl)(scope);
            if (appendToBody) {
                $document.find("body").append($popup);
            } else {
                element.after($popup);
            }
        }
    };
} ]).directive("typeaheadPopup", function() {
    return {
        restrict: "EA",
        scope: {
            matches: "=",
            query: "=",
            active: "=",
            position: "=",
            select: "&"
        },
        replace: true,
        templateUrl: "template/typeahead/typeahead-popup.html",
        link: function(scope, element, attrs) {
            scope.templateUrl = attrs.templateUrl;
            scope.isOpen = function() {
                return scope.matches.length > 0;
            };
            scope.isActive = function(matchIdx) {
                return scope.active == matchIdx;
            };
            scope.selectActive = function(matchIdx) {
                scope.active = matchIdx;
            };
            scope.selectMatch = function(activeIdx) {
                scope.select({
                    activeIdx: activeIdx
                });
            };
        }
    };
}).directive("typeaheadMatch", [ "$http", "$templateCache", "$compile", "$parse", function($http, $templateCache, $compile, $parse) {
    return {
        restrict: "EA",
        scope: {
            index: "=",
            match: "=",
            query: "="
        },
        link: function(scope, element, attrs) {
            var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || "template/typeahead/typeahead-match.html";
            $http.get(tplUrl, {
                cache: $templateCache
            }).success(function(tplContent) {
                element.replaceWith($compile(tplContent.trim())(scope));
            });
        }
    };
} ]).filter("typeaheadHighlight", function() {
    function escapeRegexp(queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }
    return function(matchItem, query) {
        return query ? matchItem.replace(new RegExp(escapeRegexp(query), "gi"), "<strong>$&</strong>") : matchItem;
    };
});

(function(p, h, q) {
    "use strict";
    function E(a) {
        var e = [];
        s(e, h.noop).chars(a);
        return e.join("");
    }
    function k(a) {
        var e = {};
        a = a.split(",");
        var d;
        for (d = 0; d < a.length; d++) e[a[d]] = !0;
        return e;
    }
    function F(a, e) {
        function d(a, b, d, g) {
            b = h.lowercase(b);
            if (t[b]) for (;f.last() && u[f.last()]; ) c("", f.last());
            v[b] && f.last() == b && c("", b);
            (g = w[b] || !!g) || f.push(b);
            var l = {};
            d.replace(G, function(a, b, e, c, d) {
                l[b] = r(e || c || d || "");
            });
            e.start && e.start(b, l, g);
        }
        function c(a, b) {
            var c = 0, d;
            if (b = h.lowercase(b)) for (c = f.length - 1; 0 <= c && f[c] != b; c--) ;
            if (0 <= c) {
                for (d = f.length - 1; d >= c; d--) e.end && e.end(f[d]);
                f.length = c;
            }
        }
        var b, g, f = [], l = a;
        for (f.last = function() {
            return f[f.length - 1];
        }; a; ) {
            g = !0;
            if (f.last() && x[f.last()]) a = a.replace(RegExp("(.*)<\\s*\\/\\s*" + f.last() + "[^>]*>", "i"), function(b, a) {
                a = a.replace(H, "$1").replace(I, "$1");
                e.chars && e.chars(r(a));
                return "";
            }), c("", f.last()); else {
                if (0 === a.indexOf("<!--")) b = a.indexOf("--", 4), 0 <= b && a.lastIndexOf("-->", b) === b && (e.comment && e.comment(a.substring(4, b)), 
                a = a.substring(b + 3), g = !1); else if (y.test(a)) {
                    if (b = a.match(y)) a = a.replace(b[0], ""), g = !1;
                } else if (J.test(a)) {
                    if (b = a.match(z)) a = a.substring(b[0].length), b[0].replace(z, c), g = !1;
                } else K.test(a) && (b = a.match(A)) && (a = a.substring(b[0].length), b[0].replace(A, d), 
                g = !1);
                g && (b = a.indexOf("<"), g = 0 > b ? a : a.substring(0, b), a = 0 > b ? "" : a.substring(b), 
                e.chars && e.chars(r(g)));
            }
            if (a == l) throw L("badparse", a);
            l = a;
        }
        c();
    }
    function r(a) {
        if (!a) return "";
        var e = M.exec(a);
        a = e[1];
        var d = e[3];
        if (e = e[2]) n.innerHTML = e.replace(/</g, "&lt;"), e = "textContent" in n ? n.textContent : n.innerText;
        return a + e + d;
    }
    function B(a) {
        return a.replace(/&/g, "&amp;").replace(N, function(a) {
            return "&#" + a.charCodeAt(0) + ";";
        }).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function s(a, e) {
        var d = !1, c = h.bind(a, a.push);
        return {
            start: function(a, g, f) {
                a = h.lowercase(a);
                !d && x[a] && (d = a);
                d || !0 !== C[a] || (c("<"), c(a), h.forEach(g, function(d, f) {
                    var g = h.lowercase(f), k = "img" === a && "src" === g || "background" === g;
                    !0 !== O[g] || !0 === D[g] && !e(d, k) || (c(" "), c(f), c('="'), c(B(d)), c('"'));
                }), c(f ? "/>" : ">"));
            },
            end: function(a) {
                a = h.lowercase(a);
                d || !0 !== C[a] || (c("</"), c(a), c(">"));
                a == d && (d = !1);
            },
            chars: function(a) {
                d || c(B(a));
            }
        };
    }
    var L = h.$$minErr("$sanitize"), A = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/, z = /^<\s*\/\s*([\w:-]+)[^>]*>/, G = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, K = /^</, J = /^<\s*\//, H = /\x3c!--(.*?)--\x3e/g, y = /<!DOCTYPE([^>]*?)>/i, I = /<!\[CDATA\[(.*?)]]\x3e/g, N = /([^\#-~| |!])/g, w = k("area,br,col,hr,img,wbr");
    p = k("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr");
    q = k("rp,rt");
    var v = h.extend({}, q, p), t = h.extend({}, p, k("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")), u = h.extend({}, q, k("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")), x = k("script,style"), C = h.extend({}, w, t, u, v), D = k("background,cite,href,longdesc,src,usemap"), O = h.extend({}, D, k("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width")), n = document.createElement("pre"), M = /^(\s*)([\s\S]*?)(\s*)$/;
    h.module("ngSanitize", []).provider("$sanitize", function() {
        this.$get = [ "$$sanitizeUri", function(a) {
            return function(e) {
                var d = [];
                F(e, s(d, function(c, b) {
                    return !/^unsafe/.test(a(c, b));
                }));
                return d.join("");
            };
        } ];
    });
    h.module("ngSanitize").filter("linky", [ "$sanitize", function(a) {
        var e = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>]/, d = /^mailto:/;
        return function(c, b) {
            function g(a) {
                a && m.push(E(a));
            }
            function f(a, c) {
                m.push("<a ");
                h.isDefined(b) && (m.push('target="'), m.push(b), m.push('" '));
                m.push('href="');
                m.push(a);
                m.push('">');
                g(c);
                m.push("</a>");
            }
            if (!c) return c;
            for (var l, k = c, m = [], n, p; l = k.match(e); ) n = l[0], l[2] == l[3] && (n = "mailto:" + n), 
            p = l.index, g(k.substr(0, p)), f(n, l[0].replace(d, "")), k = k.substring(p + l[0].length);
            g(k);
            return a(m.join(""));
        };
    } ]);
})(window, window.angular);

(function(n, e, A) {
    "use strict";
    function x(s, g, k) {
        return {
            restrict: "ECA",
            terminal: !0,
            priority: 400,
            transclude: "element",
            link: function(a, c, b, f, w) {
                function y() {
                    p && (p.remove(), p = null);
                    h && (h.$destroy(), h = null);
                    l && (k.leave(l, function() {
                        p = null;
                    }), p = l, l = null);
                }
                function v() {
                    var b = s.current && s.current.locals;
                    if (e.isDefined(b && b.$template)) {
                        var b = a.$new(), d = s.current;
                        l = w(b, function(d) {
                            k.enter(d, null, l || c, function() {
                                !e.isDefined(t) || t && !a.$eval(t) || g();
                            });
                            y();
                        });
                        h = d.scope = b;
                        h.$emit("$viewContentLoaded");
                        h.$eval(u);
                    } else y();
                }
                var h, l, p, t = b.autoscroll, u = b.onload || "";
                a.$on("$routeChangeSuccess", v);
                v();
            }
        };
    }
    function z(e, g, k) {
        return {
            restrict: "ECA",
            priority: -400,
            link: function(a, c) {
                var b = k.current, f = b.locals;
                c.html(f.$template);
                var w = e(c.contents());
                b.controller && (f.$scope = a, f = g(b.controller, f), b.controllerAs && (a[b.controllerAs] = f), 
                c.data("$ngControllerController", f), c.children().data("$ngControllerController", f));
                w(a);
            }
        };
    }
    n = e.module("ngRoute", [ "ng" ]).provider("$route", function() {
        function s(a, c) {
            return e.extend(new (e.extend(function() {}, {
                prototype: a
            }))(), c);
        }
        function g(a, e) {
            var b = e.caseInsensitiveMatch, f = {
                originalPath: a,
                regexp: a
            }, k = f.keys = [];
            a = a.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function(a, e, b, c) {
                a = "?" === c ? c : null;
                c = "*" === c ? c : null;
                k.push({
                    name: b,
                    optional: !!a
                });
                e = e || "";
                return "" + (a ? "" : e) + "(?:" + (a ? e : "") + (c && "(.+?)" || "([^/]+)") + (a || "") + ")" + (a || "");
            }).replace(/([\/$\*])/g, "\\$1");
            f.regexp = RegExp("^" + a + "$", b ? "i" : "");
            return f;
        }
        var k = {};
        this.when = function(a, c) {
            k[a] = e.extend({
                reloadOnSearch: !0
            }, c, a && g(a, c));
            if (a) {
                var b = "/" == a[a.length - 1] ? a.substr(0, a.length - 1) : a + "/";
                k[b] = e.extend({
                    redirectTo: a
                }, g(b, c));
            }
            return this;
        };
        this.otherwise = function(a) {
            this.when(null, a);
            return this;
        };
        this.$get = [ "$rootScope", "$location", "$routeParams", "$q", "$injector", "$http", "$templateCache", "$sce", function(a, c, b, f, g, n, v, h) {
            function l() {
                var d = p(), m = r.current;
                if (d && m && d.$$route === m.$$route && e.equals(d.pathParams, m.pathParams) && !d.reloadOnSearch && !u) m.params = d.params, 
                e.copy(m.params, b), a.$broadcast("$routeUpdate", m); else if (d || m) u = !1, a.$broadcast("$routeChangeStart", d, m), 
                (r.current = d) && d.redirectTo && (e.isString(d.redirectTo) ? c.path(t(d.redirectTo, d.params)).search(d.params).replace() : c.url(d.redirectTo(d.pathParams, c.path(), c.search())).replace()), 
                f.when(d).then(function() {
                    if (d) {
                        var a = e.extend({}, d.resolve), c, b;
                        e.forEach(a, function(d, c) {
                            a[c] = e.isString(d) ? g.get(d) : g.invoke(d);
                        });
                        e.isDefined(c = d.template) ? e.isFunction(c) && (c = c(d.params)) : e.isDefined(b = d.templateUrl) && (e.isFunction(b) && (b = b(d.params)), 
                        b = h.getTrustedResourceUrl(b), e.isDefined(b) && (d.loadedTemplateUrl = b, c = n.get(b, {
                            cache: v
                        }).then(function(a) {
                            return a.data;
                        })));
                        e.isDefined(c) && (a.$template = c);
                        return f.all(a);
                    }
                }).then(function(c) {
                    d == r.current && (d && (d.locals = c, e.copy(d.params, b)), a.$broadcast("$routeChangeSuccess", d, m));
                }, function(c) {
                    d == r.current && a.$broadcast("$routeChangeError", d, m, c);
                });
            }
            function p() {
                var a, b;
                e.forEach(k, function(f, k) {
                    var q;
                    if (q = !b) {
                        var g = c.path();
                        q = f.keys;
                        var l = {};
                        if (f.regexp) if (g = f.regexp.exec(g)) {
                            for (var h = 1, p = g.length; h < p; ++h) {
                                var n = q[h - 1], r = "string" == typeof g[h] ? decodeURIComponent(g[h]) : g[h];
                                n && r && (l[n.name] = r);
                            }
                            q = l;
                        } else q = null; else q = null;
                        q = a = q;
                    }
                    q && (b = s(f, {
                        params: e.extend({}, c.search(), a),
                        pathParams: a
                    }), b.$$route = f);
                });
                return b || k[null] && s(k[null], {
                    params: {},
                    pathParams: {}
                });
            }
            function t(a, c) {
                var b = [];
                e.forEach((a || "").split(":"), function(a, d) {
                    if (0 === d) b.push(a); else {
                        var e = a.match(/(\w+)(.*)/), f = e[1];
                        b.push(c[f]);
                        b.push(e[2] || "");
                        delete c[f];
                    }
                });
                return b.join("");
            }
            var u = !1, r = {
                routes: k,
                reload: function() {
                    u = !0;
                    a.$evalAsync(l);
                }
            };
            a.$on("$locationChangeSuccess", l);
            return r;
        } ];
    });
    n.provider("$routeParams", function() {
        this.$get = function() {
            return {};
        };
    });
    n.directive("ngView", x);
    n.directive("ngView", z);
    x.$inject = [ "$route", "$anchorScroll", "$animate" ];
    z.$inject = [ "$compile", "$controller", "$route" ];
})(window, window.angular);

angular.module("ui.bootstrap", [ "ui.bootstrap.transition", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.bindHtml", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.dateparser", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.dropdown", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead" ]), 
angular.module("ui.bootstrap.transition", []).factory("$transition", [ "$q", "$timeout", "$rootScope", function(a, b, c) {
    function d(a) {
        for (var b in a) if (void 0 !== f.style[b]) return a[b];
    }
    var e = function(d, f, g) {
        g = g || {};
        var h = a.defer(), i = e[g.animation ? "animationEndEventName" : "transitionEndEventName"], j = function() {
            c.$apply(function() {
                d.unbind(i, j), h.resolve(d);
            });
        };
        return i && d.bind(i, j), b(function() {
            angular.isString(f) ? d.addClass(f) : angular.isFunction(f) ? f(d) : angular.isObject(f) && d.css(f), 
            i || h.resolve(d);
        }), h.promise.cancel = function() {
            i && d.unbind(i, j), h.reject("Transition cancelled");
        }, h.promise;
    }, f = document.createElement("trans"), g = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        transition: "transitionend"
    }, h = {
        WebkitTransition: "webkitAnimationEnd",
        MozTransition: "animationend",
        OTransition: "oAnimationEnd",
        transition: "animationend"
    };
    return e.transitionEndEventName = d(g), e.animationEndEventName = d(h), e;
} ]), angular.module("ui.bootstrap.collapse", [ "ui.bootstrap.transition" ]).directive("collapse", [ "$transition", function(a) {
    return {
        link: function(b, c, d) {
            function e(b) {
                function d() {
                    j === e && (j = void 0);
                }
                var e = a(c, b);
                return j && j.cancel(), j = e, e.then(d, d), e;
            }
            function f() {
                k ? (k = !1, g()) : (c.removeClass("collapse").addClass("collapsing"), e({
                    height: c[0].scrollHeight + "px"
                }).then(g));
            }
            function g() {
                c.removeClass("collapsing"), c.addClass("collapse in"), c.css({
                    height: "auto"
                });
            }
            function h() {
                if (k) k = !1, i(), c.css({
                    height: 0
                }); else {
                    c.css({
                        height: c[0].scrollHeight + "px"
                    });
                    {
                        c[0].offsetWidth;
                    }
                    c.removeClass("collapse in").addClass("collapsing"), e({
                        height: 0
                    }).then(i);
                }
            }
            function i() {
                c.removeClass("collapsing"), c.addClass("collapse");
            }
            var j, k = !0;
            b.$watch(d.collapse, function(a) {
                a ? h() : f();
            });
        }
    };
} ]), angular.module("ui.bootstrap.accordion", [ "ui.bootstrap.collapse" ]).constant("accordionConfig", {
    closeOthers: !0
}).controller("AccordionController", [ "$scope", "$attrs", "accordionConfig", function(a, b, c) {
    this.groups = [], this.closeOthers = function(d) {
        var e = angular.isDefined(b.closeOthers) ? a.$eval(b.closeOthers) : c.closeOthers;
        e && angular.forEach(this.groups, function(a) {
            a !== d && (a.isOpen = !1);
        });
    }, this.addGroup = function(a) {
        var b = this;
        this.groups.push(a), a.$on("$destroy", function() {
            b.removeGroup(a);
        });
    }, this.removeGroup = function(a) {
        var b = this.groups.indexOf(a);
        -1 !== b && this.groups.splice(b, 1);
    };
} ]).directive("accordion", function() {
    return {
        restrict: "EA",
        controller: "AccordionController",
        transclude: !0,
        replace: !1,
        templateUrl: "template/accordion/accordion.html"
    };
}).directive("accordionGroup", function() {
    return {
        require: "^accordion",
        restrict: "EA",
        transclude: !0,
        replace: !0,
        templateUrl: "template/accordion/accordion-group.html",
        scope: {
            heading: "@",
            isOpen: "=?",
            isDisabled: "=?"
        },
        controller: function() {
            this.setHeading = function(a) {
                this.heading = a;
            };
        },
        link: function(a, b, c, d) {
            d.addGroup(a), a.$watch("isOpen", function(b) {
                b && d.closeOthers(a);
            }), a.toggleOpen = function() {
                a.isDisabled || (a.isOpen = !a.isOpen);
            };
        }
    };
}).directive("accordionHeading", function() {
    return {
        restrict: "EA",
        transclude: !0,
        template: "",
        replace: !0,
        require: "^accordionGroup",
        link: function(a, b, c, d, e) {
            d.setHeading(e(a, function() {}));
        }
    };
}).directive("accordionTransclude", function() {
    return {
        require: "^accordionGroup",
        link: function(a, b, c, d) {
            a.$watch(function() {
                return d[c.accordionTransclude];
            }, function(a) {
                a && (b.html(""), b.append(a));
            });
        }
    };
}), angular.module("ui.bootstrap.alert", []).controller("AlertController", [ "$scope", "$attrs", function(a, b) {
    a.closeable = "close" in b;
} ]).directive("alert", function() {
    return {
        restrict: "EA",
        controller: "AlertController",
        templateUrl: "template/alert/alert.html",
        transclude: !0,
        replace: !0,
        scope: {
            type: "@",
            close: "&"
        }
    };
}), angular.module("ui.bootstrap.bindHtml", []).directive("bindHtmlUnsafe", function() {
    return function(a, b, c) {
        b.addClass("ng-binding").data("$binding", c.bindHtmlUnsafe), a.$watch(c.bindHtmlUnsafe, function(a) {
            b.html(a || "");
        });
    };
}), angular.module("ui.bootstrap.buttons", []).constant("buttonConfig", {
    activeClass: "active",
    toggleEvent: "click"
}).controller("ButtonsController", [ "buttonConfig", function(a) {
    this.activeClass = a.activeClass || "active", this.toggleEvent = a.toggleEvent || "click";
} ]).directive("btnRadio", function() {
    return {
        require: [ "btnRadio", "ngModel" ],
        controller: "ButtonsController",
        link: function(a, b, c, d) {
            var e = d[0], f = d[1];
            f.$render = function() {
                b.toggleClass(e.activeClass, angular.equals(f.$modelValue, a.$eval(c.btnRadio)));
            }, b.bind(e.toggleEvent, function() {
                var d = b.hasClass(e.activeClass);
                (!d || angular.isDefined(c.uncheckable)) && a.$apply(function() {
                    f.$setViewValue(d ? null : a.$eval(c.btnRadio)), f.$render();
                });
            });
        }
    };
}).directive("btnCheckbox", function() {
    return {
        require: [ "btnCheckbox", "ngModel" ],
        controller: "ButtonsController",
        link: function(a, b, c, d) {
            function e() {
                return g(c.btnCheckboxTrue, !0);
            }
            function f() {
                return g(c.btnCheckboxFalse, !1);
            }
            function g(b, c) {
                var d = a.$eval(b);
                return angular.isDefined(d) ? d : c;
            }
            var h = d[0], i = d[1];
            i.$render = function() {
                b.toggleClass(h.activeClass, angular.equals(i.$modelValue, e()));
            }, b.bind(h.toggleEvent, function() {
                a.$apply(function() {
                    i.$setViewValue(b.hasClass(h.activeClass) ? f() : e()), i.$render();
                });
            });
        }
    };
}), angular.module("ui.bootstrap.carousel", [ "ui.bootstrap.transition" ]).controller("CarouselController", [ "$scope", "$timeout", "$transition", function(a, b, c) {
    function d() {
        e();
        var c = +a.interval;
        !isNaN(c) && c >= 0 && (g = b(f, c));
    }
    function e() {
        g && (b.cancel(g), g = null);
    }
    function f() {
        h ? (a.next(), d()) : a.pause();
    }
    var g, h, i = this, j = i.slides = a.slides = [], k = -1;
    i.currentSlide = null;
    var l = !1;
    i.select = a.select = function(e, f) {
        function g() {
            if (!l) {
                if (i.currentSlide && angular.isString(f) && !a.noTransition && e.$element) {
                    e.$element.addClass(f);
                    {
                        e.$element[0].offsetWidth;
                    }
                    angular.forEach(j, function(a) {
                        angular.extend(a, {
                            direction: "",
                            entering: !1,
                            leaving: !1,
                            active: !1
                        });
                    }), angular.extend(e, {
                        direction: f,
                        active: !0,
                        entering: !0
                    }), angular.extend(i.currentSlide || {}, {
                        direction: f,
                        leaving: !0
                    }), a.$currentTransition = c(e.$element, {}), function(b, c) {
                        a.$currentTransition.then(function() {
                            h(b, c);
                        }, function() {
                            h(b, c);
                        });
                    }(e, i.currentSlide);
                } else h(e, i.currentSlide);
                i.currentSlide = e, k = m, d();
            }
        }
        function h(b, c) {
            angular.extend(b, {
                direction: "",
                active: !0,
                leaving: !1,
                entering: !1
            }), angular.extend(c || {}, {
                direction: "",
                active: !1,
                leaving: !1,
                entering: !1
            }), a.$currentTransition = null;
        }
        var m = j.indexOf(e);
        void 0 === f && (f = m > k ? "next" : "prev"), e && e !== i.currentSlide && (a.$currentTransition ? (a.$currentTransition.cancel(), 
        b(g)) : g());
    }, a.$on("$destroy", function() {
        l = !0;
    }), i.indexOfSlide = function(a) {
        return j.indexOf(a);
    }, a.next = function() {
        var b = (k + 1) % j.length;
        return a.$currentTransition ? void 0 : i.select(j[b], "next");
    }, a.prev = function() {
        var b = 0 > k - 1 ? j.length - 1 : k - 1;
        return a.$currentTransition ? void 0 : i.select(j[b], "prev");
    }, a.isActive = function(a) {
        return i.currentSlide === a;
    }, a.$watch("interval", d), a.$on("$destroy", e), a.play = function() {
        h || (h = !0, d());
    }, a.pause = function() {
        a.noPause || (h = !1, e());
    }, i.addSlide = function(b, c) {
        b.$element = c, j.push(b), 1 === j.length || b.active ? (i.select(j[j.length - 1]), 
        1 == j.length && a.play()) : b.active = !1;
    }, i.removeSlide = function(a) {
        var b = j.indexOf(a);
        j.splice(b, 1), j.length > 0 && a.active ? i.select(b >= j.length ? j[b - 1] : j[b]) : k > b && k--;
    };
} ]).directive("carousel", [ function() {
    return {
        restrict: "EA",
        transclude: !0,
        replace: !0,
        controller: "CarouselController",
        require: "carousel",
        templateUrl: "template/carousel/carousel.html",
        scope: {
            interval: "=",
            noTransition: "=",
            noPause: "="
        }
    };
} ]).directive("slide", function() {
    return {
        require: "^carousel",
        restrict: "EA",
        transclude: !0,
        replace: !0,
        templateUrl: "template/carousel/slide.html",
        scope: {
            active: "=?"
        },
        link: function(a, b, c, d) {
            d.addSlide(a, b), a.$on("$destroy", function() {
                d.removeSlide(a);
            }), a.$watch("active", function(b) {
                b && d.select(a);
            });
        }
    };
}), angular.module("ui.bootstrap.dateparser", []).service("dateParser", [ "$locale", "orderByFilter", function(a, b) {
    function c(a, b, c) {
        return 1 === b && c > 28 ? 29 === c && (a % 4 === 0 && a % 100 !== 0 || a % 400 === 0) : 3 === b || 5 === b || 8 === b || 10 === b ? 31 > c : !0;
    }
    this.parsers = {};
    var d = {
        yyyy: {
            regex: "\\d{4}",
            apply: function(a) {
                this.year = +a;
            }
        },
        yy: {
            regex: "\\d{2}",
            apply: function(a) {
                this.year = +a + 2e3;
            }
        },
        y: {
            regex: "\\d{1,4}",
            apply: function(a) {
                this.year = +a;
            }
        },
        MMMM: {
            regex: a.DATETIME_FORMATS.MONTH.join("|"),
            apply: function(b) {
                this.month = a.DATETIME_FORMATS.MONTH.indexOf(b);
            }
        },
        MMM: {
            regex: a.DATETIME_FORMATS.SHORTMONTH.join("|"),
            apply: function(b) {
                this.month = a.DATETIME_FORMATS.SHORTMONTH.indexOf(b);
            }
        },
        MM: {
            regex: "0[1-9]|1[0-2]",
            apply: function(a) {
                this.month = a - 1;
            }
        },
        M: {
            regex: "[1-9]|1[0-2]",
            apply: function(a) {
                this.month = a - 1;
            }
        },
        dd: {
            regex: "[0-2][0-9]{1}|3[0-1]{1}",
            apply: function(a) {
                this.date = +a;
            }
        },
        d: {
            regex: "[1-2]?[0-9]{1}|3[0-1]{1}",
            apply: function(a) {
                this.date = +a;
            }
        },
        EEEE: {
            regex: a.DATETIME_FORMATS.DAY.join("|")
        },
        EEE: {
            regex: a.DATETIME_FORMATS.SHORTDAY.join("|")
        }
    };
    this.createParser = function(a) {
        var c = [], e = a.split("");
        return angular.forEach(d, function(b, d) {
            var f = a.indexOf(d);
            if (f > -1) {
                a = a.split(""), e[f] = "(" + b.regex + ")", a[f] = "$";
                for (var g = f + 1, h = f + d.length; h > g; g++) e[g] = "", a[g] = "$";
                a = a.join(""), c.push({
                    index: f,
                    apply: b.apply
                });
            }
        }), {
            regex: new RegExp("^" + e.join("") + "$"),
            map: b(c, "index")
        };
    }, this.parse = function(b, d) {
        if (!angular.isString(b)) return b;
        d = a.DATETIME_FORMATS[d] || d, this.parsers[d] || (this.parsers[d] = this.createParser(d));
        var e = this.parsers[d], f = e.regex, g = e.map, h = b.match(f);
        if (h && h.length) {
            for (var i, j = {
                year: 1900,
                month: 0,
                date: 1,
                hours: 0
            }, k = 1, l = h.length; l > k; k++) {
                var m = g[k - 1];
                m.apply && m.apply.call(j, h[k]);
            }
            return c(j.year, j.month, j.date) && (i = new Date(j.year, j.month, j.date, j.hours)), 
            i;
        }
    };
} ]), angular.module("ui.bootstrap.position", []).factory("$position", [ "$document", "$window", function(a, b) {
    function c(a, c) {
        return a.currentStyle ? a.currentStyle[c] : b.getComputedStyle ? b.getComputedStyle(a)[c] : a.style[c];
    }
    function d(a) {
        return "static" === (c(a, "position") || "static");
    }
    var e = function(b) {
        for (var c = a[0], e = b.offsetParent || c; e && e !== c && d(e); ) e = e.offsetParent;
        return e || c;
    };
    return {
        position: function(b) {
            var c = this.offset(b), d = {
                top: 0,
                left: 0
            }, f = e(b[0]);
            f != a[0] && (d = this.offset(angular.element(f)), d.top += f.clientTop - f.scrollTop, 
            d.left += f.clientLeft - f.scrollLeft);
            var g = b[0].getBoundingClientRect();
            return {
                width: g.width || b.prop("offsetWidth"),
                height: g.height || b.prop("offsetHeight"),
                top: c.top - d.top,
                left: c.left - d.left
            };
        },
        offset: function(c) {
            var d = c[0].getBoundingClientRect();
            return {
                width: d.width || c.prop("offsetWidth"),
                height: d.height || c.prop("offsetHeight"),
                top: d.top + (b.pageYOffset || a[0].documentElement.scrollTop),
                left: d.left + (b.pageXOffset || a[0].documentElement.scrollLeft)
            };
        },
        positionElements: function(a, b, c, d) {
            var e, f, g, h, i = c.split("-"), j = i[0], k = i[1] || "center";
            e = d ? this.offset(a) : this.position(a), f = b.prop("offsetWidth"), g = b.prop("offsetHeight");
            var l = {
                center: function() {
                    return e.left + e.width / 2 - f / 2;
                },
                left: function() {
                    return e.left;
                },
                right: function() {
                    return e.left + e.width;
                }
            }, m = {
                center: function() {
                    return e.top + e.height / 2 - g / 2;
                },
                top: function() {
                    return e.top;
                },
                bottom: function() {
                    return e.top + e.height;
                }
            };
            switch (j) {
              case "right":
                h = {
                    top: m[k](),
                    left: l[j]()
                };
                break;

              case "left":
                h = {
                    top: m[k](),
                    left: e.left - f
                };
                break;

              case "bottom":
                h = {
                    top: m[j](),
                    left: l[k]()
                };
                break;

              default:
                h = {
                    top: e.top - g,
                    left: l[k]()
                };
            }
            return h;
        }
    };
} ]), angular.module("ui.bootstrap.datepicker", [ "ui.bootstrap.dateparser", "ui.bootstrap.position" ]).constant("datepickerConfig", {
    formatDay: "dd",
    formatMonth: "MMMM",
    formatYear: "yyyy",
    formatDayHeader: "EEE",
    formatDayTitle: "MMMM yyyy",
    formatMonthTitle: "yyyy",
    datepickerMode: "day",
    minMode: "day",
    maxMode: "year",
    showWeeks: !0,
    startingDay: 0,
    yearRange: 20,
    minDate: null,
    maxDate: null
}).controller("DatepickerController", [ "$scope", "$attrs", "$parse", "$interpolate", "$timeout", "$log", "dateFilter", "datepickerConfig", function(a, b, c, d, e, f, g, h) {
    var i = this, j = {
        $setViewValue: angular.noop
    };
    this.modes = [ "day", "month", "year" ], angular.forEach([ "formatDay", "formatMonth", "formatYear", "formatDayHeader", "formatDayTitle", "formatMonthTitle", "minMode", "maxMode", "showWeeks", "startingDay", "yearRange" ], function(c, e) {
        i[c] = angular.isDefined(b[c]) ? 8 > e ? d(b[c])(a.$parent) : a.$parent.$eval(b[c]) : h[c];
    }), angular.forEach([ "minDate", "maxDate" ], function(d) {
        b[d] ? a.$parent.$watch(c(b[d]), function(a) {
            i[d] = a ? new Date(a) : null, i.refreshView();
        }) : i[d] = h[d] ? new Date(h[d]) : null;
    }), a.datepickerMode = a.datepickerMode || h.datepickerMode, a.uniqueId = "datepicker-" + a.$id + "-" + Math.floor(1e4 * Math.random()), 
    this.activeDate = angular.isDefined(b.initDate) ? a.$parent.$eval(b.initDate) : new Date(), 
    a.isActive = function(b) {
        return 0 === i.compare(b.date, i.activeDate) ? (a.activeDateId = b.uid, !0) : !1;
    }, this.init = function(a) {
        j = a, j.$render = function() {
            i.render();
        };
    }, this.render = function() {
        if (j.$modelValue) {
            var a = new Date(j.$modelValue), b = !isNaN(a);
            b ? this.activeDate = a : f.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.'), 
            j.$setValidity("date", b);
        }
        this.refreshView();
    }, this.refreshView = function() {
        if (this.element) {
            this._refreshView();
            var a = j.$modelValue ? new Date(j.$modelValue) : null;
            j.$setValidity("date-disabled", !a || this.element && !this.isDisabled(a));
        }
    }, this.createDateObject = function(a, b) {
        var c = j.$modelValue ? new Date(j.$modelValue) : null;
        return {
            date: a,
            label: g(a, b),
            selected: c && 0 === this.compare(a, c),
            disabled: this.isDisabled(a),
            current: 0 === this.compare(a, new Date())
        };
    }, this.isDisabled = function(c) {
        return this.minDate && this.compare(c, this.minDate) < 0 || this.maxDate && this.compare(c, this.maxDate) > 0 || b.dateDisabled && a.dateDisabled({
            date: c,
            mode: a.datepickerMode
        });
    }, this.split = function(a, b) {
        for (var c = []; a.length > 0; ) c.push(a.splice(0, b));
        return c;
    }, a.select = function(b) {
        if (a.datepickerMode === i.minMode) {
            var c = j.$modelValue ? new Date(j.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
            c.setFullYear(b.getFullYear(), b.getMonth(), b.getDate()), j.$setViewValue(c), j.$render();
        } else i.activeDate = b, a.datepickerMode = i.modes[i.modes.indexOf(a.datepickerMode) - 1];
    }, a.move = function(a) {
        var b = i.activeDate.getFullYear() + a * (i.step.years || 0), c = i.activeDate.getMonth() + a * (i.step.months || 0);
        i.activeDate.setFullYear(b, c, 1), i.refreshView();
    }, a.toggleMode = function(b) {
        b = b || 1, a.datepickerMode === i.maxMode && 1 === b || a.datepickerMode === i.minMode && -1 === b || (a.datepickerMode = i.modes[i.modes.indexOf(a.datepickerMode) + b]);
    }, a.keys = {
        13: "enter",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };
    var k = function() {
        e(function() {
            i.element[0].focus();
        }, 0, !1);
    };
    a.$on("datepicker.focus", k), a.keydown = function(b) {
        var c = a.keys[b.which];
        if (c && !b.shiftKey && !b.altKey) if (b.preventDefault(), b.stopPropagation(), 
        "enter" === c || "space" === c) {
            if (i.isDisabled(i.activeDate)) return;
            a.select(i.activeDate), k();
        } else !b.ctrlKey || "up" !== c && "down" !== c ? (i.handleKeyDown(c, b), i.refreshView()) : (a.toggleMode("up" === c ? 1 : -1), 
        k());
    };
} ]).directive("datepicker", function() {
    return {
        restrict: "EA",
        replace: !0,
        templateUrl: "template/datepicker/datepicker.html",
        scope: {
            datepickerMode: "=?",
            dateDisabled: "&"
        },
        require: [ "datepicker", "?^ngModel" ],
        controller: "DatepickerController",
        link: function(a, b, c, d) {
            var e = d[0], f = d[1];
            f && e.init(f);
        }
    };
}).directive("daypicker", [ "dateFilter", function(a) {
    return {
        restrict: "EA",
        replace: !0,
        templateUrl: "template/datepicker/day.html",
        require: "^datepicker",
        link: function(b, c, d, e) {
            function f(a, b) {
                return 1 !== b || a % 4 !== 0 || a % 100 === 0 && a % 400 !== 0 ? i[b] : 29;
            }
            function g(a, b) {
                var c = new Array(b), d = new Date(a), e = 0;
                for (d.setHours(12); b > e; ) c[e++] = new Date(d), d.setDate(d.getDate() + 1);
                return c;
            }
            function h(a) {
                var b = new Date(a);
                b.setDate(b.getDate() + 4 - (b.getDay() || 7));
                var c = b.getTime();
                return b.setMonth(0), b.setDate(1), Math.floor(Math.round((c - b) / 864e5) / 7) + 1;
            }
            b.showWeeks = e.showWeeks, e.step = {
                months: 1
            }, e.element = c;
            var i = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
            e._refreshView = function() {
                var c = e.activeDate.getFullYear(), d = e.activeDate.getMonth(), f = new Date(c, d, 1), i = e.startingDay - f.getDay(), j = i > 0 ? 7 - i : -i, k = new Date(f);
                j > 0 && k.setDate(-j + 1);
                for (var l = g(k, 42), m = 0; 42 > m; m++) l[m] = angular.extend(e.createDateObject(l[m], e.formatDay), {
                    secondary: l[m].getMonth() !== d,
                    uid: b.uniqueId + "-" + m
                });
                b.labels = new Array(7);
                for (var n = 0; 7 > n; n++) b.labels[n] = {
                    abbr: a(l[n].date, e.formatDayHeader),
                    full: a(l[n].date, "EEEE")
                };
                if (b.title = a(e.activeDate, e.formatDayTitle), b.rows = e.split(l, 7), b.showWeeks) {
                    b.weekNumbers = [];
                    for (var o = h(b.rows[0][0].date), p = b.rows.length; b.weekNumbers.push(o++) < p; ) ;
                }
            }, e.compare = function(a, b) {
                return new Date(a.getFullYear(), a.getMonth(), a.getDate()) - new Date(b.getFullYear(), b.getMonth(), b.getDate());
            }, e.handleKeyDown = function(a) {
                var b = e.activeDate.getDate();
                if ("left" === a) b -= 1; else if ("up" === a) b -= 7; else if ("right" === a) b += 1; else if ("down" === a) b += 7; else if ("pageup" === a || "pagedown" === a) {
                    var c = e.activeDate.getMonth() + ("pageup" === a ? -1 : 1);
                    e.activeDate.setMonth(c, 1), b = Math.min(f(e.activeDate.getFullYear(), e.activeDate.getMonth()), b);
                } else "home" === a ? b = 1 : "end" === a && (b = f(e.activeDate.getFullYear(), e.activeDate.getMonth()));
                e.activeDate.setDate(b);
            }, e.refreshView();
        }
    };
} ]).directive("monthpicker", [ "dateFilter", function(a) {
    return {
        restrict: "EA",
        replace: !0,
        templateUrl: "template/datepicker/month.html",
        require: "^datepicker",
        link: function(b, c, d, e) {
            e.step = {
                years: 1
            }, e.element = c, e._refreshView = function() {
                for (var c = new Array(12), d = e.activeDate.getFullYear(), f = 0; 12 > f; f++) c[f] = angular.extend(e.createDateObject(new Date(d, f, 1), e.formatMonth), {
                    uid: b.uniqueId + "-" + f
                });
                b.title = a(e.activeDate, e.formatMonthTitle), b.rows = e.split(c, 3);
            }, e.compare = function(a, b) {
                return new Date(a.getFullYear(), a.getMonth()) - new Date(b.getFullYear(), b.getMonth());
            }, e.handleKeyDown = function(a) {
                var b = e.activeDate.getMonth();
                if ("left" === a) b -= 1; else if ("up" === a) b -= 3; else if ("right" === a) b += 1; else if ("down" === a) b += 3; else if ("pageup" === a || "pagedown" === a) {
                    var c = e.activeDate.getFullYear() + ("pageup" === a ? -1 : 1);
                    e.activeDate.setFullYear(c);
                } else "home" === a ? b = 0 : "end" === a && (b = 11);
                e.activeDate.setMonth(b);
            }, e.refreshView();
        }
    };
} ]).directive("yearpicker", [ "dateFilter", function() {
    return {
        restrict: "EA",
        replace: !0,
        templateUrl: "template/datepicker/year.html",
        require: "^datepicker",
        link: function(a, b, c, d) {
            function e(a) {
                return parseInt((a - 1) / f, 10) * f + 1;
            }
            var f = d.yearRange;
            d.step = {
                years: f
            }, d.element = b, d._refreshView = function() {
                for (var b = new Array(f), c = 0, g = e(d.activeDate.getFullYear()); f > c; c++) b[c] = angular.extend(d.createDateObject(new Date(g + c, 0, 1), d.formatYear), {
                    uid: a.uniqueId + "-" + c
                });
                a.title = [ b[0].label, b[f - 1].label ].join(" - "), a.rows = d.split(b, 5);
            }, d.compare = function(a, b) {
                return a.getFullYear() - b.getFullYear();
            }, d.handleKeyDown = function(a) {
                var b = d.activeDate.getFullYear();
                "left" === a ? b -= 1 : "up" === a ? b -= 5 : "right" === a ? b += 1 : "down" === a ? b += 5 : "pageup" === a || "pagedown" === a ? b += ("pageup" === a ? -1 : 1) * d.step.years : "home" === a ? b = e(d.activeDate.getFullYear()) : "end" === a && (b = e(d.activeDate.getFullYear()) + f - 1), 
                d.activeDate.setFullYear(b);
            }, d.refreshView();
        }
    };
} ]).constant("datepickerPopupConfig", {
    datepickerPopup: "yyyy-MM-dd",
    currentText: "Today",
    clearText: "Clear",
    closeText: "Done",
    closeOnDateSelection: !0,
    appendToBody: !1,
    showButtonBar: !0
}).directive("datepickerPopup", [ "$compile", "$parse", "$document", "$position", "dateFilter", "dateParser", "datepickerPopupConfig", function(a, b, c, d, e, f, g) {
    return {
        restrict: "EA",
        require: "ngModel",
        scope: {
            isOpen: "=?",
            currentText: "@",
            clearText: "@",
            closeText: "@",
            dateDisabled: "&"
        },
        link: function(h, i, j, k) {
            function l(a) {
                return a.replace(/([A-Z])/g, function(a) {
                    return "-" + a.toLowerCase();
                });
            }
            function m(a) {
                if (a) {
                    if (angular.isDate(a) && !isNaN(a)) return k.$setValidity("date", !0), a;
                    if (angular.isString(a)) {
                        var b = f.parse(a, n) || new Date(a);
                        return isNaN(b) ? void k.$setValidity("date", !1) : (k.$setValidity("date", !0), 
                        b);
                    }
                    return void k.$setValidity("date", !1);
                }
                return k.$setValidity("date", !0), null;
            }
            var n, o = angular.isDefined(j.closeOnDateSelection) ? h.$parent.$eval(j.closeOnDateSelection) : g.closeOnDateSelection, p = angular.isDefined(j.datepickerAppendToBody) ? h.$parent.$eval(j.datepickerAppendToBody) : g.appendToBody;
            h.showButtonBar = angular.isDefined(j.showButtonBar) ? h.$parent.$eval(j.showButtonBar) : g.showButtonBar, 
            h.getText = function(a) {
                return h[a + "Text"] || g[a + "Text"];
            }, j.$observe("datepickerPopup", function(a) {
                n = a || g.datepickerPopup, k.$render();
            });
            var q = angular.element("<div datepicker-popup-wrap><div datepicker></div></div>");
            q.attr({
                "ng-model": "date",
                "ng-change": "dateSelection()"
            });
            var r = angular.element(q.children()[0]);
            j.datepickerOptions && angular.forEach(h.$parent.$eval(j.datepickerOptions), function(a, b) {
                r.attr(l(b), a);
            }), angular.forEach([ "minDate", "maxDate" ], function(a) {
                j[a] && (h.$parent.$watch(b(j[a]), function(b) {
                    h[a] = b;
                }), r.attr(l(a), a));
            }), j.dateDisabled && r.attr("date-disabled", "dateDisabled({ date: date, mode: mode })"), 
            k.$parsers.unshift(m), h.dateSelection = function(a) {
                angular.isDefined(a) && (h.date = a), k.$setViewValue(h.date), k.$render(), o && (h.isOpen = !1, 
                i[0].focus());
            }, i.bind("input change keyup", function() {
                h.$apply(function() {
                    h.date = k.$modelValue;
                });
            }), k.$render = function() {
                var a = k.$viewValue ? e(k.$viewValue, n) : "";
                i.val(a), h.date = m(k.$modelValue);
            };
            var s = function(a) {
                h.isOpen && a.target !== i[0] && h.$apply(function() {
                    h.isOpen = !1;
                });
            }, t = function(a) {
                h.keydown(a);
            };
            i.bind("keydown", t), h.keydown = function(a) {
                27 === a.which ? (a.preventDefault(), a.stopPropagation(), h.close()) : 40 !== a.which || h.isOpen || (h.isOpen = !0);
            }, h.$watch("isOpen", function(a) {
                a ? (h.$broadcast("datepicker.focus"), h.position = p ? d.offset(i) : d.position(i), 
                h.position.top = h.position.top + i.prop("offsetHeight"), c.bind("click", s)) : c.unbind("click", s);
            }), h.select = function(a) {
                if ("today" === a) {
                    var b = new Date();
                    angular.isDate(k.$modelValue) ? (a = new Date(k.$modelValue), a.setFullYear(b.getFullYear(), b.getMonth(), b.getDate())) : a = new Date(b.setHours(0, 0, 0, 0));
                }
                h.dateSelection(a);
            }, h.close = function() {
                h.isOpen = !1, i[0].focus();
            };
            var u = a(q)(h);
            p ? c.find("body").append(u) : i.after(u), h.$on("$destroy", function() {
                u.remove(), i.unbind("keydown", t), c.unbind("click", s);
            });
        }
    };
} ]).directive("datepickerPopupWrap", function() {
    return {
        restrict: "EA",
        replace: !0,
        transclude: !0,
        templateUrl: "template/datepicker/popup.html",
        link: function(a, b) {
            b.bind("click", function(a) {
                a.preventDefault(), a.stopPropagation();
            });
        }
    };
}), angular.module("ui.bootstrap.dropdown", []).constant("dropdownConfig", {
    openClass: "open"
}).service("dropdownService", [ "$document", function(a) {
    var b = null;
    this.open = function(e) {
        b || (a.bind("click", c), a.bind("keydown", d)), b && b !== e && (b.isOpen = !1), 
        b = e;
    }, this.close = function(e) {
        b === e && (b = null, a.unbind("click", c), a.unbind("keydown", d));
    };
    var c = function(a) {
        a && a.isDefaultPrevented() || b.$apply(function() {
            b.isOpen = !1;
        });
    }, d = function(a) {
        27 === a.which && (b.focusToggleElement(), c());
    };
} ]).controller("DropdownController", [ "$scope", "$attrs", "$parse", "dropdownConfig", "dropdownService", "$animate", function(a, b, c, d, e, f) {
    var g, h = this, i = a.$new(), j = d.openClass, k = angular.noop, l = b.onToggle ? c(b.onToggle) : angular.noop;
    this.init = function(d) {
        h.$element = d, b.isOpen && (g = c(b.isOpen), k = g.assign, a.$watch(g, function(a) {
            i.isOpen = !!a;
        }));
    }, this.toggle = function(a) {
        return i.isOpen = arguments.length ? !!a : !i.isOpen;
    }, this.isOpen = function() {
        return i.isOpen;
    }, i.focusToggleElement = function() {
        h.toggleElement && h.toggleElement[0].focus();
    }, i.$watch("isOpen", function(b, c) {
        f[b ? "addClass" : "removeClass"](h.$element, j), b ? (i.focusToggleElement(), e.open(i)) : e.close(i), 
        k(a, b), angular.isDefined(b) && b !== c && l(a, {
            open: !!b
        });
    }), a.$on("$locationChangeSuccess", function() {
        i.isOpen = !1;
    }), a.$on("$destroy", function() {
        i.$destroy();
    });
} ]).directive("dropdown", function() {
    return {
        restrict: "CA",
        controller: "DropdownController",
        link: function(a, b, c, d) {
            d.init(b);
        }
    };
}).directive("dropdownToggle", function() {
    return {
        restrict: "CA",
        require: "?^dropdown",
        link: function(a, b, c, d) {
            if (d) {
                d.toggleElement = b;
                var e = function(e) {
                    e.preventDefault(), b.hasClass("disabled") || c.disabled || a.$apply(function() {
                        d.toggle();
                    });
                };
                b.bind("click", e), b.attr({
                    "aria-haspopup": !0,
                    "aria-expanded": !1
                }), a.$watch(d.isOpen, function(a) {
                    b.attr("aria-expanded", !!a);
                }), a.$on("$destroy", function() {
                    b.unbind("click", e);
                });
            }
        }
    };
}), angular.module("ui.bootstrap.modal", [ "ui.bootstrap.transition" ]).factory("$$stackedMap", function() {
    return {
        createNew: function() {
            var a = [];
            return {
                add: function(b, c) {
                    a.push({
                        key: b,
                        value: c
                    });
                },
                get: function(b) {
                    for (var c = 0; c < a.length; c++) if (b == a[c].key) return a[c];
                },
                keys: function() {
                    for (var b = [], c = 0; c < a.length; c++) b.push(a[c].key);
                    return b;
                },
                top: function() {
                    return a[a.length - 1];
                },
                remove: function(b) {
                    for (var c = -1, d = 0; d < a.length; d++) if (b == a[d].key) {
                        c = d;
                        break;
                    }
                    return a.splice(c, 1)[0];
                },
                removeTop: function() {
                    return a.splice(a.length - 1, 1)[0];
                },
                length: function() {
                    return a.length;
                }
            };
        }
    };
}).directive("modalBackdrop", [ "$timeout", function(a) {
    return {
        restrict: "EA",
        replace: !0,
        templateUrl: "template/modal/backdrop.html",
        link: function(b) {
            b.animate = !1, a(function() {
                b.animate = !0;
            });
        }
    };
} ]).directive("modalWindow", [ "$modalStack", "$timeout", function(a, b) {
    return {
        restrict: "EA",
        scope: {
            index: "@",
            animate: "="
        },
        replace: !0,
        transclude: !0,
        templateUrl: function(a, b) {
            return b.templateUrl || "template/modal/window.html";
        },
        link: function(c, d, e) {
            d.addClass(e.windowClass || ""), c.size = e.size, b(function() {
                c.animate = !0, d[0].focus();
            }), c.close = function(b) {
                var c = a.getTop();
                c && c.value.backdrop && "static" != c.value.backdrop && b.target === b.currentTarget && (b.preventDefault(), 
                b.stopPropagation(), a.dismiss(c.key, "backdrop click"));
            };
        }
    };
} ]).factory("$modalStack", [ "$transition", "$timeout", "$document", "$compile", "$rootScope", "$$stackedMap", function(a, b, c, d, e, f) {
    function g() {
        for (var a = -1, b = n.keys(), c = 0; c < b.length; c++) n.get(b[c]).value.backdrop && (a = c);
        return a;
    }
    function h(a) {
        var b = c.find("body").eq(0), d = n.get(a).value;
        n.remove(a), j(d.modalDomEl, d.modalScope, 300, function() {
            d.modalScope.$destroy(), b.toggleClass(m, n.length() > 0), i();
        });
    }
    function i() {
        if (k && -1 == g()) {
            var a = l;
            j(k, l, 150, function() {
                a.$destroy(), a = null;
            }), k = void 0, l = void 0;
        }
    }
    function j(c, d, e, f) {
        function g() {
            g.done || (g.done = !0, c.remove(), f && f());
        }
        d.animate = !1;
        var h = a.transitionEndEventName;
        if (h) {
            var i = b(g, e);
            c.bind(h, function() {
                b.cancel(i), g(), d.$apply();
            });
        } else b(g, 0);
    }
    var k, l, m = "modal-open", n = f.createNew(), o = {};
    return e.$watch(g, function(a) {
        l && (l.index = a);
    }), c.bind("keydown", function(a) {
        var b;
        27 === a.which && (b = n.top(), b && b.value.keyboard && (a.preventDefault(), e.$apply(function() {
            o.dismiss(b.key, "escape key press");
        })));
    }), o.open = function(a, b) {
        n.add(a, {
            deferred: b.deferred,
            modalScope: b.scope,
            backdrop: b.backdrop,
            keyboard: b.keyboard
        });
        var f = c.find("body").eq(0), h = g();
        h >= 0 && !k && (l = e.$new(!0), l.index = h, k = d("<div modal-backdrop></div>")(l), 
        f.append(k));
        var i = angular.element("<div modal-window></div>");
        i.attr({
            "template-url": b.windowTemplateUrl,
            "window-class": b.windowClass,
            size: b.size,
            index: n.length() - 1,
            animate: "animate"
        }).html(b.content);
        var j = d(i)(b.scope);
        n.top().value.modalDomEl = j, f.append(j), f.addClass(m);
    }, o.close = function(a, b) {
        var c = n.get(a).value;
        c && (c.deferred.resolve(b), h(a));
    }, o.dismiss = function(a, b) {
        var c = n.get(a).value;
        c && (c.deferred.reject(b), h(a));
    }, o.dismissAll = function(a) {
        for (var b = this.getTop(); b; ) this.dismiss(b.key, a), b = this.getTop();
    }, o.getTop = function() {
        return n.top();
    }, o;
} ]).provider("$modal", function() {
    var a = {
        options: {
            backdrop: !0,
            keyboard: !0
        },
        $get: [ "$injector", "$rootScope", "$q", "$http", "$templateCache", "$controller", "$modalStack", function(b, c, d, e, f, g, h) {
            function i(a) {
                return a.template ? d.when(a.template) : e.get(a.templateUrl, {
                    cache: f
                }).then(function(a) {
                    return a.data;
                });
            }
            function j(a) {
                var c = [];
                return angular.forEach(a, function(a) {
                    (angular.isFunction(a) || angular.isArray(a)) && c.push(d.when(b.invoke(a)));
                }), c;
            }
            var k = {};
            return k.open = function(b) {
                var e = d.defer(), f = d.defer(), k = {
                    result: e.promise,
                    opened: f.promise,
                    close: function(a) {
                        h.close(k, a);
                    },
                    dismiss: function(a) {
                        h.dismiss(k, a);
                    }
                };
                if (b = angular.extend({}, a.options, b), b.resolve = b.resolve || {}, !b.template && !b.templateUrl) throw new Error("One of template or templateUrl options is required.");
                var l = d.all([ i(b) ].concat(j(b.resolve)));
                return l.then(function(a) {
                    var d = (b.scope || c).$new();
                    d.$close = k.close, d.$dismiss = k.dismiss;
                    var f, i = {}, j = 1;
                    b.controller && (i.$scope = d, i.$modalInstance = k, angular.forEach(b.resolve, function(b, c) {
                        i[c] = a[j++];
                    }), f = g(b.controller, i)), h.open(k, {
                        scope: d,
                        deferred: e,
                        content: a[0],
                        backdrop: b.backdrop,
                        keyboard: b.keyboard,
                        windowClass: b.windowClass,
                        windowTemplateUrl: b.windowTemplateUrl,
                        size: b.size
                    });
                }, function(a) {
                    e.reject(a);
                }), l.then(function() {
                    f.resolve(!0);
                }, function() {
                    f.reject(!1);
                }), k;
            }, k;
        } ]
    };
    return a;
}), angular.module("ui.bootstrap.pagination", []).controller("PaginationController", [ "$scope", "$attrs", "$parse", function(a, b, c) {
    var d = this, e = {
        $setViewValue: angular.noop
    }, f = b.numPages ? c(b.numPages).assign : angular.noop;
    this.init = function(f, g) {
        e = f, this.config = g, e.$render = function() {
            d.render();
        }, b.itemsPerPage ? a.$parent.$watch(c(b.itemsPerPage), function(b) {
            d.itemsPerPage = parseInt(b, 10), a.totalPages = d.calculateTotalPages();
        }) : this.itemsPerPage = g.itemsPerPage;
    }, this.calculateTotalPages = function() {
        var b = this.itemsPerPage < 1 ? 1 : Math.ceil(a.totalItems / this.itemsPerPage);
        return Math.max(b || 0, 1);
    }, this.render = function() {
        a.page = parseInt(e.$viewValue, 10) || 1;
    }, a.selectPage = function(b) {
        a.page !== b && b > 0 && b <= a.totalPages && (e.$setViewValue(b), e.$render());
    }, a.getText = function(b) {
        return a[b + "Text"] || d.config[b + "Text"];
    }, a.noPrevious = function() {
        return 1 === a.page;
    }, a.noNext = function() {
        return a.page === a.totalPages;
    }, a.$watch("totalItems", function() {
        a.totalPages = d.calculateTotalPages();
    }), a.$watch("totalPages", function(b) {
        f(a.$parent, b), a.page > b ? a.selectPage(b) : e.$render();
    });
} ]).constant("paginationConfig", {
    itemsPerPage: 10,
    boundaryLinks: !1,
    directionLinks: !0,
    firstText: "First",
    previousText: "Previous",
    nextText: "Next",
    lastText: "Last",
    rotate: !0
}).directive("pagination", [ "$parse", "paginationConfig", function(a, b) {
    return {
        restrict: "EA",
        scope: {
            totalItems: "=",
            firstText: "@",
            previousText: "@",
            nextText: "@",
            lastText: "@"
        },
        require: [ "pagination", "?ngModel" ],
        controller: "PaginationController",
        templateUrl: "template/pagination/pagination.html",
        replace: !0,
        link: function(c, d, e, f) {
            function g(a, b, c) {
                return {
                    number: a,
                    text: b,
                    active: c
                };
            }
            function h(a, b) {
                var c = [], d = 1, e = b, f = angular.isDefined(k) && b > k;
                f && (l ? (d = Math.max(a - Math.floor(k / 2), 1), e = d + k - 1, e > b && (e = b, 
                d = e - k + 1)) : (d = (Math.ceil(a / k) - 1) * k + 1, e = Math.min(d + k - 1, b)));
                for (var h = d; e >= h; h++) {
                    var i = g(h, h, h === a);
                    c.push(i);
                }
                if (f && !l) {
                    if (d > 1) {
                        var j = g(d - 1, "...", !1);
                        c.unshift(j);
                    }
                    if (b > e) {
                        var m = g(e + 1, "...", !1);
                        c.push(m);
                    }
                }
                return c;
            }
            var i = f[0], j = f[1];
            if (j) {
                var k = angular.isDefined(e.maxSize) ? c.$parent.$eval(e.maxSize) : b.maxSize, l = angular.isDefined(e.rotate) ? c.$parent.$eval(e.rotate) : b.rotate;
                c.boundaryLinks = angular.isDefined(e.boundaryLinks) ? c.$parent.$eval(e.boundaryLinks) : b.boundaryLinks, 
                c.directionLinks = angular.isDefined(e.directionLinks) ? c.$parent.$eval(e.directionLinks) : b.directionLinks, 
                i.init(j, b), e.maxSize && c.$parent.$watch(a(e.maxSize), function(a) {
                    k = parseInt(a, 10), i.render();
                });
                var m = i.render;
                i.render = function() {
                    m(), c.page > 0 && c.page <= c.totalPages && (c.pages = h(c.page, c.totalPages));
                };
            }
        }
    };
} ]).constant("pagerConfig", {
    itemsPerPage: 10,
    previousText: "« Previous",
    nextText: "Next »",
    align: !0
}).directive("pager", [ "pagerConfig", function(a) {
    return {
        restrict: "EA",
        scope: {
            totalItems: "=",
            previousText: "@",
            nextText: "@"
        },
        require: [ "pager", "?ngModel" ],
        controller: "PaginationController",
        templateUrl: "template/pagination/pager.html",
        replace: !0,
        link: function(b, c, d, e) {
            var f = e[0], g = e[1];
            g && (b.align = angular.isDefined(d.align) ? b.$parent.$eval(d.align) : a.align, 
            f.init(g, a));
        }
    };
} ]), angular.module("ui.bootstrap.tooltip", [ "ui.bootstrap.position", "ui.bootstrap.bindHtml" ]).provider("$tooltip", function() {
    function a(a) {
        var b = /[A-Z]/g, c = "-";
        return a.replace(b, function(a, b) {
            return (b ? c : "") + a.toLowerCase();
        });
    }
    var b = {
        placement: "top",
        animation: !0,
        popupDelay: 0
    }, c = {
        mouseenter: "mouseleave",
        click: "click",
        focus: "blur"
    }, d = {};
    this.options = function(a) {
        angular.extend(d, a);
    }, this.setTriggers = function(a) {
        angular.extend(c, a);
    }, this.$get = [ "$window", "$compile", "$timeout", "$parse", "$document", "$position", "$interpolate", function(e, f, g, h, i, j, k) {
        return function(e, l, m) {
            function n(a) {
                var b = a || o.trigger || m, d = c[b] || b;
                return {
                    show: b,
                    hide: d
                };
            }
            var o = angular.extend({}, b, d), p = a(e), q = k.startSymbol(), r = k.endSymbol(), s = "<div " + p + '-popup title="' + q + "tt_title" + r + '" content="' + q + "tt_content" + r + '" placement="' + q + "tt_placement" + r + '" animation="tt_animation" is-open="tt_isOpen"></div>';
            return {
                restrict: "EA",
                scope: !0,
                compile: function() {
                    var a = f(s);
                    return function(b, c, d) {
                        function f() {
                            b.tt_isOpen ? m() : k();
                        }
                        function k() {
                            (!y || b.$eval(d[l + "Enable"])) && (b.tt_popupDelay ? v || (v = g(p, b.tt_popupDelay, !1), 
                            v.then(function(a) {
                                a();
                            })) : p()());
                        }
                        function m() {
                            b.$apply(function() {
                                q();
                            });
                        }
                        function p() {
                            return v = null, u && (g.cancel(u), u = null), b.tt_content ? (r(), t.css({
                                top: 0,
                                left: 0,
                                display: "block"
                            }), w ? i.find("body").append(t) : c.after(t), z(), b.tt_isOpen = !0, b.$digest(), 
                            z) : angular.noop;
                        }
                        function q() {
                            b.tt_isOpen = !1, g.cancel(v), v = null, b.tt_animation ? u || (u = g(s, 500)) : s();
                        }
                        function r() {
                            t && s(), t = a(b, function() {}), b.$digest();
                        }
                        function s() {
                            u = null, t && (t.remove(), t = null);
                        }
                        var t, u, v, w = angular.isDefined(o.appendToBody) ? o.appendToBody : !1, x = n(void 0), y = angular.isDefined(d[l + "Enable"]), z = function() {
                            var a = j.positionElements(c, t, b.tt_placement, w);
                            a.top += "px", a.left += "px", t.css(a);
                        };
                        b.tt_isOpen = !1, d.$observe(e, function(a) {
                            b.tt_content = a, !a && b.tt_isOpen && q();
                        }), d.$observe(l + "Title", function(a) {
                            b.tt_title = a;
                        }), d.$observe(l + "Placement", function(a) {
                            b.tt_placement = angular.isDefined(a) ? a : o.placement;
                        }), d.$observe(l + "PopupDelay", function(a) {
                            var c = parseInt(a, 10);
                            b.tt_popupDelay = isNaN(c) ? o.popupDelay : c;
                        });
                        var A = function() {
                            c.unbind(x.show, k), c.unbind(x.hide, m);
                        };
                        d.$observe(l + "Trigger", function(a) {
                            A(), x = n(a), x.show === x.hide ? c.bind(x.show, f) : (c.bind(x.show, k), c.bind(x.hide, m));
                        });
                        var B = b.$eval(d[l + "Animation"]);
                        b.tt_animation = angular.isDefined(B) ? !!B : o.animation, d.$observe(l + "AppendToBody", function(a) {
                            w = angular.isDefined(a) ? h(a)(b) : w;
                        }), w && b.$on("$locationChangeSuccess", function() {
                            b.tt_isOpen && q();
                        }), b.$on("$destroy", function() {
                            g.cancel(u), g.cancel(v), A(), s();
                        });
                    };
                }
            };
        };
    } ];
}).directive("tooltipPopup", function() {
    return {
        restrict: "EA",
        replace: !0,
        scope: {
            content: "@",
            placement: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/tooltip/tooltip-popup.html"
    };
}).directive("tooltip", [ "$tooltip", function(a) {
    return a("tooltip", "tooltip", "mouseenter");
} ]).directive("tooltipHtmlUnsafePopup", function() {
    return {
        restrict: "EA",
        replace: !0,
        scope: {
            content: "@",
            placement: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/tooltip/tooltip-html-unsafe-popup.html"
    };
}).directive("tooltipHtmlUnsafe", [ "$tooltip", function(a) {
    return a("tooltipHtmlUnsafe", "tooltip", "mouseenter");
} ]), angular.module("ui.bootstrap.popover", [ "ui.bootstrap.tooltip" ]).directive("popoverPopup", function() {
    return {
        restrict: "EA",
        replace: !0,
        scope: {
            title: "@",
            content: "@",
            placement: "@",
            animation: "&",
            isOpen: "&"
        },
        templateUrl: "template/popover/popover.html"
    };
}).directive("popover", [ "$tooltip", function(a) {
    return a("popover", "popover", "click");
} ]), angular.module("ui.bootstrap.progressbar", []).constant("progressConfig", {
    animate: !0,
    max: 100
}).controller("ProgressController", [ "$scope", "$attrs", "progressConfig", function(a, b, c) {
    var d = this, e = angular.isDefined(b.animate) ? a.$parent.$eval(b.animate) : c.animate;
    this.bars = [], a.max = angular.isDefined(b.max) ? a.$parent.$eval(b.max) : c.max, 
    this.addBar = function(b, c) {
        e || c.css({
            transition: "none"
        }), this.bars.push(b), b.$watch("value", function(c) {
            b.percent = +(100 * c / a.max).toFixed(2);
        }), b.$on("$destroy", function() {
            c = null, d.removeBar(b);
        });
    }, this.removeBar = function(a) {
        this.bars.splice(this.bars.indexOf(a), 1);
    };
} ]).directive("progress", function() {
    return {
        restrict: "EA",
        replace: !0,
        transclude: !0,
        controller: "ProgressController",
        require: "progress",
        scope: {},
        templateUrl: "template/progressbar/progress.html"
    };
}).directive("bar", function() {
    return {
        restrict: "EA",
        replace: !0,
        transclude: !0,
        require: "^progress",
        scope: {
            value: "=",
            type: "@"
        },
        templateUrl: "template/progressbar/bar.html",
        link: function(a, b, c, d) {
            d.addBar(a, b);
        }
    };
}).directive("progressbar", function() {
    return {
        restrict: "EA",
        replace: !0,
        transclude: !0,
        controller: "ProgressController",
        scope: {
            value: "=",
            type: "@"
        },
        templateUrl: "template/progressbar/progressbar.html",
        link: function(a, b, c, d) {
            d.addBar(a, angular.element(b.children()[0]));
        }
    };
}), angular.module("ui.bootstrap.rating", []).constant("ratingConfig", {
    max: 5,
    stateOn: null,
    stateOff: null
}).controller("RatingController", [ "$scope", "$attrs", "ratingConfig", function(a, b, c) {
    var d = {
        $setViewValue: angular.noop
    };
    this.init = function(e) {
        d = e, d.$render = this.render, this.stateOn = angular.isDefined(b.stateOn) ? a.$parent.$eval(b.stateOn) : c.stateOn, 
        this.stateOff = angular.isDefined(b.stateOff) ? a.$parent.$eval(b.stateOff) : c.stateOff;
        var f = angular.isDefined(b.ratingStates) ? a.$parent.$eval(b.ratingStates) : new Array(angular.isDefined(b.max) ? a.$parent.$eval(b.max) : c.max);
        a.range = this.buildTemplateObjects(f);
    }, this.buildTemplateObjects = function(a) {
        for (var b = 0, c = a.length; c > b; b++) a[b] = angular.extend({
            index: b
        }, {
            stateOn: this.stateOn,
            stateOff: this.stateOff
        }, a[b]);
        return a;
    }, a.rate = function(b) {
        !a.readonly && b >= 0 && b <= a.range.length && (d.$setViewValue(b), d.$render());
    }, a.enter = function(b) {
        a.readonly || (a.value = b), a.onHover({
            value: b
        });
    }, a.reset = function() {
        a.value = d.$viewValue, a.onLeave();
    }, a.onKeydown = function(b) {
        /(37|38|39|40)/.test(b.which) && (b.preventDefault(), b.stopPropagation(), a.rate(a.value + (38 === b.which || 39 === b.which ? 1 : -1)));
    }, this.render = function() {
        a.value = d.$viewValue;
    };
} ]).directive("rating", function() {
    return {
        restrict: "EA",
        require: [ "rating", "ngModel" ],
        scope: {
            readonly: "=?",
            onHover: "&",
            onLeave: "&"
        },
        controller: "RatingController",
        templateUrl: "template/rating/rating.html",
        replace: !0,
        link: function(a, b, c, d) {
            var e = d[0], f = d[1];
            f && e.init(f);
        }
    };
}), angular.module("ui.bootstrap.tabs", []).controller("TabsetController", [ "$scope", function(a) {
    var b = this, c = b.tabs = a.tabs = [];
    b.select = function(a) {
        angular.forEach(c, function(b) {
            b.active && b !== a && (b.active = !1, b.onDeselect());
        }), a.active = !0, a.onSelect();
    }, b.addTab = function(a) {
        c.push(a), 1 === c.length ? a.active = !0 : a.active && b.select(a);
    }, b.removeTab = function(a) {
        var d = c.indexOf(a);
        if (a.active && c.length > 1) {
            var e = d == c.length - 1 ? d - 1 : d + 1;
            b.select(c[e]);
        }
        c.splice(d, 1);
    };
} ]).directive("tabset", function() {
    return {
        restrict: "EA",
        transclude: !0,
        replace: !0,
        scope: {
            type: "@"
        },
        controller: "TabsetController",
        templateUrl: "template/tabs/tabset.html",
        link: function(a, b, c) {
            a.vertical = angular.isDefined(c.vertical) ? a.$parent.$eval(c.vertical) : !1, a.justified = angular.isDefined(c.justified) ? a.$parent.$eval(c.justified) : !1;
        }
    };
}).directive("tab", [ "$parse", function(a) {
    return {
        require: "^tabset",
        restrict: "EA",
        replace: !0,
        templateUrl: "template/tabs/tab.html",
        transclude: !0,
        scope: {
            active: "=?",
            heading: "@",
            onSelect: "&select",
            onDeselect: "&deselect"
        },
        controller: function() {},
        compile: function(b, c, d) {
            return function(b, c, e, f) {
                b.$watch("active", function(a) {
                    a && f.select(b);
                }), b.disabled = !1, e.disabled && b.$parent.$watch(a(e.disabled), function(a) {
                    b.disabled = !!a;
                }), b.select = function() {
                    b.disabled || (b.active = !0);
                }, f.addTab(b), b.$on("$destroy", function() {
                    f.removeTab(b);
                }), b.$transcludeFn = d;
            };
        }
    };
} ]).directive("tabHeadingTransclude", [ function() {
    return {
        restrict: "A",
        require: "^tab",
        link: function(a, b) {
            a.$watch("headingElement", function(a) {
                a && (b.html(""), b.append(a));
            });
        }
    };
} ]).directive("tabContentTransclude", function() {
    function a(a) {
        return a.tagName && (a.hasAttribute("tab-heading") || a.hasAttribute("data-tab-heading") || "tab-heading" === a.tagName.toLowerCase() || "data-tab-heading" === a.tagName.toLowerCase());
    }
    return {
        restrict: "A",
        require: "^tabset",
        link: function(b, c, d) {
            var e = b.$eval(d.tabContentTransclude);
            e.$transcludeFn(e.$parent, function(b) {
                angular.forEach(b, function(b) {
                    a(b) ? e.headingElement = b : c.append(b);
                });
            });
        }
    };
}), angular.module("ui.bootstrap.timepicker", []).constant("timepickerConfig", {
    hourStep: 1,
    minuteStep: 1,
    showMeridian: !0,
    meridians: null,
    readonlyInput: !1,
    mousewheel: !0
}).controller("TimepickerController", [ "$scope", "$attrs", "$parse", "$log", "$locale", "timepickerConfig", function(a, b, c, d, e, f) {
    function g() {
        var b = parseInt(a.hours, 10), c = a.showMeridian ? b > 0 && 13 > b : b >= 0 && 24 > b;
        return c ? (a.showMeridian && (12 === b && (b = 0), a.meridian === p[1] && (b += 12)), 
        b) : void 0;
    }
    function h() {
        var b = parseInt(a.minutes, 10);
        return b >= 0 && 60 > b ? b : void 0;
    }
    function i(a) {
        return angular.isDefined(a) && a.toString().length < 2 ? "0" + a : a;
    }
    function j(a) {
        k(), o.$setViewValue(new Date(n)), l(a);
    }
    function k() {
        o.$setValidity("time", !0), a.invalidHours = !1, a.invalidMinutes = !1;
    }
    function l(b) {
        var c = n.getHours(), d = n.getMinutes();
        a.showMeridian && (c = 0 === c || 12 === c ? 12 : c % 12), a.hours = "h" === b ? c : i(c), 
        a.minutes = "m" === b ? d : i(d), a.meridian = n.getHours() < 12 ? p[0] : p[1];
    }
    function m(a) {
        var b = new Date(n.getTime() + 6e4 * a);
        n.setHours(b.getHours(), b.getMinutes()), j();
    }
    var n = new Date(), o = {
        $setViewValue: angular.noop
    }, p = angular.isDefined(b.meridians) ? a.$parent.$eval(b.meridians) : f.meridians || e.DATETIME_FORMATS.AMPMS;
    this.init = function(c, d) {
        o = c, o.$render = this.render;
        var e = d.eq(0), g = d.eq(1), h = angular.isDefined(b.mousewheel) ? a.$parent.$eval(b.mousewheel) : f.mousewheel;
        h && this.setupMousewheelEvents(e, g), a.readonlyInput = angular.isDefined(b.readonlyInput) ? a.$parent.$eval(b.readonlyInput) : f.readonlyInput, 
        this.setupInputEvents(e, g);
    };
    var q = f.hourStep;
    b.hourStep && a.$parent.$watch(c(b.hourStep), function(a) {
        q = parseInt(a, 10);
    });
    var r = f.minuteStep;
    b.minuteStep && a.$parent.$watch(c(b.minuteStep), function(a) {
        r = parseInt(a, 10);
    }), a.showMeridian = f.showMeridian, b.showMeridian && a.$parent.$watch(c(b.showMeridian), function(b) {
        if (a.showMeridian = !!b, o.$error.time) {
            var c = g(), d = h();
            angular.isDefined(c) && angular.isDefined(d) && (n.setHours(c), j());
        } else l();
    }), this.setupMousewheelEvents = function(b, c) {
        var d = function(a) {
            a.originalEvent && (a = a.originalEvent);
            var b = a.wheelDelta ? a.wheelDelta : -a.deltaY;
            return a.detail || b > 0;
        };
        b.bind("mousewheel wheel", function(b) {
            a.$apply(d(b) ? a.incrementHours() : a.decrementHours()), b.preventDefault();
        }), c.bind("mousewheel wheel", function(b) {
            a.$apply(d(b) ? a.incrementMinutes() : a.decrementMinutes()), b.preventDefault();
        });
    }, this.setupInputEvents = function(b, c) {
        if (a.readonlyInput) return a.updateHours = angular.noop, void (a.updateMinutes = angular.noop);
        var d = function(b, c) {
            o.$setViewValue(null), o.$setValidity("time", !1), angular.isDefined(b) && (a.invalidHours = b), 
            angular.isDefined(c) && (a.invalidMinutes = c);
        };
        a.updateHours = function() {
            var a = g();
            angular.isDefined(a) ? (n.setHours(a), j("h")) : d(!0);
        }, b.bind("blur", function() {
            !a.invalidHours && a.hours < 10 && a.$apply(function() {
                a.hours = i(a.hours);
            });
        }), a.updateMinutes = function() {
            var a = h();
            angular.isDefined(a) ? (n.setMinutes(a), j("m")) : d(void 0, !0);
        }, c.bind("blur", function() {
            !a.invalidMinutes && a.minutes < 10 && a.$apply(function() {
                a.minutes = i(a.minutes);
            });
        });
    }, this.render = function() {
        var a = o.$modelValue ? new Date(o.$modelValue) : null;
        isNaN(a) ? (o.$setValidity("time", !1), d.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : (a && (n = a), 
        k(), l());
    }, a.incrementHours = function() {
        m(60 * q);
    }, a.decrementHours = function() {
        m(60 * -q);
    }, a.incrementMinutes = function() {
        m(r);
    }, a.decrementMinutes = function() {
        m(-r);
    }, a.toggleMeridian = function() {
        m(720 * (n.getHours() < 12 ? 1 : -1));
    };
} ]).directive("timepicker", function() {
    return {
        restrict: "EA",
        require: [ "timepicker", "?^ngModel" ],
        controller: "TimepickerController",
        replace: !0,
        scope: {},
        templateUrl: "template/timepicker/timepicker.html",
        link: function(a, b, c, d) {
            var e = d[0], f = d[1];
            f && e.init(f, b.find("input"));
        }
    };
}), angular.module("ui.bootstrap.typeahead", [ "ui.bootstrap.position", "ui.bootstrap.bindHtml" ]).factory("typeaheadParser", [ "$parse", function(a) {
    var b = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;
    return {
        parse: function(c) {
            var d = c.match(b);
            if (!d) throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "' + c + '".');
            return {
                itemName: d[3],
                source: a(d[4]),
                viewMapper: a(d[2] || d[1]),
                modelMapper: a(d[1])
            };
        }
    };
} ]).directive("typeahead", [ "$compile", "$parse", "$q", "$timeout", "$document", "$position", "typeaheadParser", function(a, b, c, d, e, f, g) {
    var h = [ 9, 13, 27, 38, 40 ];
    return {
        require: "ngModel",
        link: function(i, j, k, l) {
            var m, n = i.$eval(k.typeaheadMinLength) || 1, o = i.$eval(k.typeaheadWaitMs) || 0, p = i.$eval(k.typeaheadEditable) !== !1, q = b(k.typeaheadLoading).assign || angular.noop, r = b(k.typeaheadOnSelect), s = k.typeaheadInputFormatter ? b(k.typeaheadInputFormatter) : void 0, t = k.typeaheadAppendToBody ? i.$eval(k.typeaheadAppendToBody) : !1, u = b(k.ngModel).assign, v = g.parse(k.typeahead), w = i.$new();
            i.$on("$destroy", function() {
                w.$destroy();
            });
            var x = "typeahead-" + w.$id + "-" + Math.floor(1e4 * Math.random());
            j.attr({
                "aria-autocomplete": "list",
                "aria-expanded": !1,
                "aria-owns": x
            });
            var y = angular.element("<div typeahead-popup></div>");
            y.attr({
                id: x,
                matches: "matches",
                active: "activeIdx",
                select: "select(activeIdx)",
                query: "query",
                position: "position"
            }), angular.isDefined(k.typeaheadTemplateUrl) && y.attr("template-url", k.typeaheadTemplateUrl);
            var z = function() {
                w.matches = [], w.activeIdx = -1, j.attr("aria-expanded", !1);
            }, A = function(a) {
                return x + "-option-" + a;
            };
            w.$watch("activeIdx", function(a) {
                0 > a ? j.removeAttr("aria-activedescendant") : j.attr("aria-activedescendant", A(a));
            });
            var B = function(a) {
                var b = {
                    $viewValue: a
                };
                q(i, !0), c.when(v.source(i, b)).then(function(c) {
                    var d = a === l.$viewValue;
                    if (d && m) if (c.length > 0) {
                        w.activeIdx = 0, w.matches.length = 0;
                        for (var e = 0; e < c.length; e++) b[v.itemName] = c[e], w.matches.push({
                            id: A(e),
                            label: v.viewMapper(w, b),
                            model: c[e]
                        });
                        w.query = a, w.position = t ? f.offset(j) : f.position(j), w.position.top = w.position.top + j.prop("offsetHeight"), 
                        j.attr("aria-expanded", !0);
                    } else z();
                    d && q(i, !1);
                }, function() {
                    z(), q(i, !1);
                });
            };
            z(), w.query = void 0;
            var C;
            l.$parsers.unshift(function(a) {
                return m = !0, a && a.length >= n ? o > 0 ? (C && d.cancel(C), C = d(function() {
                    B(a);
                }, o)) : B(a) : (q(i, !1), z()), p ? a : a ? void l.$setValidity("editable", !1) : (l.$setValidity("editable", !0), 
                a);
            }), l.$formatters.push(function(a) {
                var b, c, d = {};
                return s ? (d.$model = a, s(i, d)) : (d[v.itemName] = a, b = v.viewMapper(i, d), 
                d[v.itemName] = void 0, c = v.viewMapper(i, d), b !== c ? b : a);
            }), w.select = function(a) {
                var b, c, e = {};
                e[v.itemName] = c = w.matches[a].model, b = v.modelMapper(i, e), u(i, b), l.$setValidity("editable", !0), 
                r(i, {
                    $item: c,
                    $model: b,
                    $label: v.viewMapper(i, e)
                }), z(), d(function() {
                    j[0].focus();
                }, 0, !1);
            }, j.bind("keydown", function(a) {
                0 !== w.matches.length && -1 !== h.indexOf(a.which) && (a.preventDefault(), 40 === a.which ? (w.activeIdx = (w.activeIdx + 1) % w.matches.length, 
                w.$digest()) : 38 === a.which ? (w.activeIdx = (w.activeIdx ? w.activeIdx : w.matches.length) - 1, 
                w.$digest()) : 13 === a.which || 9 === a.which ? w.$apply(function() {
                    w.select(w.activeIdx);
                }) : 27 === a.which && (a.stopPropagation(), z(), w.$digest()));
            }), j.bind("blur", function() {
                m = !1;
            });
            var D = function(a) {
                j[0] !== a.target && (z(), w.$digest());
            };
            e.bind("click", D), i.$on("$destroy", function() {
                e.unbind("click", D);
            });
            var E = a(y)(w);
            t ? e.find("body").append(E) : j.after(E);
        }
    };
} ]).directive("typeaheadPopup", function() {
    return {
        restrict: "EA",
        scope: {
            matches: "=",
            query: "=",
            active: "=",
            position: "=",
            select: "&"
        },
        replace: !0,
        templateUrl: "template/typeahead/typeahead-popup.html",
        link: function(a, b, c) {
            a.templateUrl = c.templateUrl, a.isOpen = function() {
                return a.matches.length > 0;
            }, a.isActive = function(b) {
                return a.active == b;
            }, a.selectActive = function(b) {
                a.active = b;
            }, a.selectMatch = function(b) {
                a.select({
                    activeIdx: b
                });
            };
        }
    };
}).directive("typeaheadMatch", [ "$http", "$templateCache", "$compile", "$parse", function(a, b, c, d) {
    return {
        restrict: "EA",
        scope: {
            index: "=",
            match: "=",
            query: "="
        },
        link: function(e, f, g) {
            var h = d(g.templateUrl)(e.$parent) || "template/typeahead/typeahead-match.html";
            a.get(h, {
                cache: b
            }).success(function(a) {
                f.replaceWith(c(a.trim())(e));
            });
        }
    };
} ]).filter("typeaheadHighlight", function() {
    function a(a) {
        return a.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }
    return function(b, c) {
        return c ? ("" + b).replace(new RegExp(a(c), "gi"), "<strong>$&</strong>") : b;
    };
});

"use strict";

angular.module("ngLocale", [], [ "$provide", function($provide) {
    var PLURAL_CATEGORY = {
        ZERO: "zero",
        ONE: "one",
        TWO: "two",
        FEW: "few",
        MANY: "many",
        OTHER: "other"
    };
    $provide.value("$locale", {
        DATETIME_FORMATS: {
            AMPMS: [ "AM", "PM" ],
            DAY: [ "søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag" ],
            MONTH: [ "januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember" ],
            SHORTDAY: [ "søn.", "man.", "tir.", "ons.", "tor.", "fre.", "lør." ],
            SHORTMONTH: [ "jan.", "feb.", "mars", "apr.", "mai", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "des." ],
            fullDate: "EEEE d. MMMM y",
            longDate: "d. MMMM y",
            medium: "d. MMM y HH:mm:ss",
            mediumDate: "d. MMM y",
            mediumTime: "HH:mm:ss",
            "short": "dd.MM.yy HH:mm",
            shortDate: "dd.MM.yy",
            shortTime: "HH:mm"
        },
        NUMBER_FORMATS: {
            CURRENCY_SYM: "kr",
            DECIMAL_SEP: ",",
            GROUP_SEP: " ",
            PATTERNS: [ {
                gSize: 3,
                lgSize: 3,
                macFrac: 0,
                maxFrac: 3,
                minFrac: 0,
                minInt: 1,
                negPre: "-",
                negSuf: "",
                posPre: "",
                posSuf: ""
            }, {
                gSize: 3,
                lgSize: 3,
                macFrac: 0,
                maxFrac: 2,
                minFrac: 2,
                minInt: 1,
                negPre: "¤ -",
                negSuf: "",
                posPre: "¤ ",
                posSuf: ""
            } ]
        },
        id: "no",
        pluralCat: function(n) {
            if (n == 1) {
                return PLURAL_CATEGORY.ONE;
            }
            return PLURAL_CATEGORY.OTHER;
        }
    });
} ]);

function FastClick(layer) {
    "use strict";
    var oldOnClick, self = this;
    this.trackingClick = false;
    this.trackingClickStart = 0;
    this.targetElement = null;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.lastTouchIdentifier = 0;
    this.touchBoundary = 10;
    this.layer = layer;
    if (!layer || !layer.nodeType) {
        throw new TypeError("Layer must be a document node");
    }
    this.onClick = function() {
        return FastClick.prototype.onClick.apply(self, arguments);
    };
    this.onMouse = function() {
        return FastClick.prototype.onMouse.apply(self, arguments);
    };
    this.onTouchStart = function() {
        return FastClick.prototype.onTouchStart.apply(self, arguments);
    };
    this.onTouchMove = function() {
        return FastClick.prototype.onTouchMove.apply(self, arguments);
    };
    this.onTouchEnd = function() {
        return FastClick.prototype.onTouchEnd.apply(self, arguments);
    };
    this.onTouchCancel = function() {
        return FastClick.prototype.onTouchCancel.apply(self, arguments);
    };
    if (FastClick.notNeeded(layer)) {
        return;
    }
    if (this.deviceIsAndroid) {
        layer.addEventListener("mouseover", this.onMouse, true);
        layer.addEventListener("mousedown", this.onMouse, true);
        layer.addEventListener("mouseup", this.onMouse, true);
    }
    layer.addEventListener("click", this.onClick, true);
    layer.addEventListener("touchstart", this.onTouchStart, false);
    layer.addEventListener("touchmove", this.onTouchMove, false);
    layer.addEventListener("touchend", this.onTouchEnd, false);
    layer.addEventListener("touchcancel", this.onTouchCancel, false);
    if (!Event.prototype.stopImmediatePropagation) {
        layer.removeEventListener = function(type, callback, capture) {
            var rmv = Node.prototype.removeEventListener;
            if (type === "click") {
                rmv.call(layer, type, callback.hijacked || callback, capture);
            } else {
                rmv.call(layer, type, callback, capture);
            }
        };
        layer.addEventListener = function(type, callback, capture) {
            var adv = Node.prototype.addEventListener;
            if (type === "click") {
                adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
                    if (!event.propagationStopped) {
                        callback(event);
                    }
                }), capture);
            } else {
                adv.call(layer, type, callback, capture);
            }
        };
    }
    if (typeof layer.onclick === "function") {
        oldOnClick = layer.onclick;
        layer.addEventListener("click", function(event) {
            oldOnClick(event);
        }, false);
        layer.onclick = null;
    }
}

FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0;

FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);

FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);

FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);

FastClick.prototype.needsClick = function(target) {
    "use strict";
    switch (target.nodeName.toLowerCase()) {
      case "button":
      case "select":
      case "textarea":
        if (target.disabled) {
            return true;
        }
        break;

      case "input":
        if (this.deviceIsIOS && target.type === "file" || target.disabled) {
            return true;
        }
        break;

      case "label":
      case "video":
        return true;
    }
    return /\bneedsclick\b/.test(target.className);
};

FastClick.prototype.needsFocus = function(target) {
    "use strict";
    switch (target.nodeName.toLowerCase()) {
      case "textarea":
        return true;

      case "select":
        return !this.deviceIsAndroid;

      case "input":
        switch (target.type) {
          case "button":
          case "checkbox":
          case "file":
          case "image":
          case "radio":
          case "submit":
            return false;
        }
        return !target.disabled && !target.readOnly;

      default:
        return /\bneedsfocus\b/.test(target.className);
    }
};

FastClick.prototype.sendClick = function(targetElement, event) {
    "use strict";
    var clickEvent, touch;
    if (document.activeElement && document.activeElement !== targetElement) {
        document.activeElement.blur();
    }
    touch = event.changedTouches[0];
    clickEvent = document.createEvent("MouseEvents");
    clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    clickEvent.forwardedTouchEvent = true;
    targetElement.dispatchEvent(clickEvent);
};

FastClick.prototype.determineEventType = function(targetElement) {
    "use strict";
    if (this.deviceIsAndroid && targetElement.tagName.toLowerCase() === "select") {
        return "mousedown";
    }
    return "click";
};

FastClick.prototype.focus = function(targetElement) {
    "use strict";
    var length;
    if (this.deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf("date") !== 0 && targetElement.type !== "time") {
        length = targetElement.value.length;
        targetElement.setSelectionRange(length, length);
    } else {
        targetElement.focus();
    }
};

FastClick.prototype.updateScrollParent = function(targetElement) {
    "use strict";
    var scrollParent, parentElement;
    scrollParent = targetElement.fastClickScrollParent;
    if (!scrollParent || !scrollParent.contains(targetElement)) {
        parentElement = targetElement;
        do {
            if (parentElement.scrollHeight > parentElement.offsetHeight) {
                scrollParent = parentElement;
                targetElement.fastClickScrollParent = parentElement;
                break;
            }
            parentElement = parentElement.parentElement;
        } while (parentElement);
    }
    if (scrollParent) {
        scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
    }
};

FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
    "use strict";
    if (eventTarget.nodeType === Node.TEXT_NODE) {
        return eventTarget.parentNode;
    }
    return eventTarget;
};

FastClick.prototype.onTouchStart = function(event) {
    "use strict";
    var targetElement, touch, selection;
    if (event.targetTouches.length > 1) {
        return true;
    }
    targetElement = this.getTargetElementFromEventTarget(event.target);
    touch = event.targetTouches[0];
    if (this.deviceIsIOS) {
        selection = window.getSelection();
        if (selection.rangeCount && !selection.isCollapsed) {
            return true;
        }
        if (!this.deviceIsIOS4) {
            if (touch.identifier === this.lastTouchIdentifier) {
                event.preventDefault();
                return false;
            }
            this.lastTouchIdentifier = touch.identifier;
            this.updateScrollParent(targetElement);
        }
    }
    this.trackingClick = true;
    this.trackingClickStart = event.timeStamp;
    this.targetElement = targetElement;
    this.touchStartX = touch.pageX;
    this.touchStartY = touch.pageY;
    if (event.timeStamp - this.lastClickTime < 200) {
        event.preventDefault();
    }
    return true;
};

FastClick.prototype.touchHasMoved = function(event) {
    "use strict";
    var touch = event.changedTouches[0], boundary = this.touchBoundary;
    if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
        return true;
    }
    return false;
};

FastClick.prototype.onTouchMove = function(event) {
    "use strict";
    if (!this.trackingClick) {
        return true;
    }
    if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
        this.trackingClick = false;
        this.targetElement = null;
    }
    return true;
};

FastClick.prototype.findControl = function(labelElement) {
    "use strict";
    if (labelElement.control !== undefined) {
        return labelElement.control;
    }
    if (labelElement.htmlFor) {
        return document.getElementById(labelElement.htmlFor);
    }
    return labelElement.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea");
};

FastClick.prototype.onTouchEnd = function(event) {
    "use strict";
    var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
    if (!this.trackingClick) {
        return true;
    }
    if (event.timeStamp - this.lastClickTime < 200) {
        this.cancelNextClick = true;
        return true;
    }
    this.cancelNextClick = false;
    this.lastClickTime = event.timeStamp;
    trackingClickStart = this.trackingClickStart;
    this.trackingClick = false;
    this.trackingClickStart = 0;
    if (this.deviceIsIOSWithBadTarget) {
        touch = event.changedTouches[0];
        targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
        targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
    }
    targetTagName = targetElement.tagName.toLowerCase();
    if (targetTagName === "label") {
        forElement = this.findControl(targetElement);
        if (forElement) {
            this.focus(targetElement);
            if (this.deviceIsAndroid) {
                return false;
            }
            targetElement = forElement;
        }
    } else if (this.needsFocus(targetElement)) {
        if (event.timeStamp - trackingClickStart > 100 || this.deviceIsIOS && window.top !== window && targetTagName === "input") {
            this.targetElement = null;
            return false;
        }
        this.focus(targetElement);
        this.sendClick(targetElement, event);
        if (!this.deviceIsIOS4 || targetTagName !== "select") {
            this.targetElement = null;
            event.preventDefault();
        }
        return false;
    }
    if (this.deviceIsIOS && !this.deviceIsIOS4) {
        scrollParent = targetElement.fastClickScrollParent;
        if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
            return true;
        }
    }
    if (!this.needsClick(targetElement)) {
        event.preventDefault();
        this.sendClick(targetElement, event);
    }
    return false;
};

FastClick.prototype.onTouchCancel = function() {
    "use strict";
    this.trackingClick = false;
    this.targetElement = null;
};

FastClick.prototype.onMouse = function(event) {
    "use strict";
    if (!this.targetElement) {
        return true;
    }
    if (event.forwardedTouchEvent) {
        return true;
    }
    if (!event.cancelable) {
        return true;
    }
    if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
        if (event.stopImmediatePropagation) {
            event.stopImmediatePropagation();
        } else {
            event.propagationStopped = true;
        }
        event.stopPropagation();
        event.preventDefault();
        return false;
    }
    return true;
};

FastClick.prototype.onClick = function(event) {
    "use strict";
    var permitted;
    if (this.trackingClick) {
        this.targetElement = null;
        this.trackingClick = false;
        return true;
    }
    if (event.target.type === "submit" && event.detail === 0) {
        return true;
    }
    permitted = this.onMouse(event);
    if (!permitted) {
        this.targetElement = null;
    }
    return permitted;
};

FastClick.prototype.destroy = function() {
    "use strict";
    var layer = this.layer;
    if (this.deviceIsAndroid) {
        layer.removeEventListener("mouseover", this.onMouse, true);
        layer.removeEventListener("mousedown", this.onMouse, true);
        layer.removeEventListener("mouseup", this.onMouse, true);
    }
    layer.removeEventListener("click", this.onClick, true);
    layer.removeEventListener("touchstart", this.onTouchStart, false);
    layer.removeEventListener("touchmove", this.onTouchMove, false);
    layer.removeEventListener("touchend", this.onTouchEnd, false);
    layer.removeEventListener("touchcancel", this.onTouchCancel, false);
};

FastClick.notNeeded = function(layer) {
    "use strict";
    var metaViewport;
    var chromeVersion;
    if (typeof window.ontouchstart === "undefined") {
        return true;
    }
    chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [ , 0 ])[1];
    if (chromeVersion) {
        if (FastClick.prototype.deviceIsAndroid) {
            metaViewport = document.querySelector("meta[name=viewport]");
            if (metaViewport) {
                if (metaViewport.content.indexOf("user-scalable=no") !== -1) {
                    return true;
                }
                if (chromeVersion > 31 && window.innerWidth <= window.screen.width) {
                    return true;
                }
            }
        } else {
            return true;
        }
    }
    if (layer.style.msTouchAction === "none") {
        return true;
    }
    return false;
};

FastClick.attach = function(layer) {
    "use strict";
    return new FastClick(layer);
};

if (typeof define !== "undefined" && define.amd) {
    define(function() {
        "use strict";
        return FastClick;
    });
} else if (typeof module !== "undefined" && module.exports) {
    module.exports = FastClick.attach;
    module.exports.FastClick = FastClick;
} else {
    window.FastClick = FastClick;
}

angular.module("ui.bootstrap.datepicker", [ "ui.bootstrap.dateparser", "ui.bootstrap.position" ]).constant("datepickerConfig", {
    formatDay: "dd",
    formatMonth: "MMMM",
    formatYear: "yyyy",
    formatDayHeader: "EEE",
    formatDayTitle: "MMMM yyyy",
    formatMonthTitle: "yyyy",
    datepickerMode: "day",
    minMode: "day",
    maxMode: "year",
    showWeeks: true,
    startingDay: 0,
    yearRange: 20,
    minDate: null,
    maxDate: null
}).controller("DatepickerController", [ "$scope", "$attrs", "$parse", "$interpolate", "$timeout", "$log", "dateFilter", "datepickerConfig", function($scope, $attrs, $parse, $interpolate, $timeout, $log, dateFilter, datepickerConfig) {
    var self = this, ngModelCtrl = {
        $setViewValue: angular.noop
    };
    this.modes = [ "day", "month", "year" ];
    angular.forEach([ "formatDay", "formatMonth", "formatYear", "formatDayHeader", "formatDayTitle", "formatMonthTitle", "minMode", "maxMode", "showWeeks", "startingDay", "yearRange" ], function(key, index) {
        self[key] = angular.isDefined($attrs[key]) ? index < 8 ? $interpolate($attrs[key])($scope.$parent) : $scope.$parent.$eval($attrs[key]) : datepickerConfig[key];
    });
    angular.forEach([ "minDate", "maxDate" ], function(key) {
        if ($attrs[key]) {
            $scope.$parent.$watch($parse($attrs[key]), function(value) {
                self[key] = value ? new Date(value) : null;
                self.refreshView();
            });
        } else {
            self[key] = datepickerConfig[key] ? new Date(datepickerConfig[key]) : null;
        }
    });
    $scope.datepickerMode = $scope.datepickerMode || datepickerConfig.datepickerMode;
    $scope.uniqueId = "datepicker-" + $scope.$id + "-" + Math.floor(Math.random() * 1e4);
    this.activeDate = angular.isDefined($attrs.initDate) ? $scope.$parent.$eval($attrs.initDate) : new Date();
    $scope.isActive = function(dateObject) {
        if (self.compare(dateObject.date, self.activeDate) === 0) {
            $scope.activeDateId = dateObject.uid;
            return true;
        }
        return false;
    };
    this.init = function(ngModelCtrl_) {
        ngModelCtrl = ngModelCtrl_;
        ngModelCtrl.$render = function() {
            self.render();
        };
    };
    this.render = function() {
        if (ngModelCtrl.$modelValue) {
            var date = new Date(ngModelCtrl.$modelValue), isValid = !isNaN(date);
            if (isValid) {
                this.activeDate = date;
            } else {
                $log.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
            }
            ngModelCtrl.$setValidity("date", isValid);
        }
        this.refreshView();
    };
    this.refreshView = function() {
        if (this.element) {
            this._refreshView();
            var date = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : null;
            ngModelCtrl.$setValidity("date-disabled", !date || this.element && !this.isDisabled(date));
        }
    };
    this.createDateObject = function(date, format) {
        var model = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : null;
        return {
            date: date,
            label: dateFilter(date, format),
            selected: model && this.compare(date, model) === 0,
            disabled: this.isDisabled(date),
            current: this.compare(date, new Date()) === 0
        };
    };
    this.isDisabled = function(date) {
        return this.minDate && this.compare(date, this.minDate) < 0 || this.maxDate && this.compare(date, this.maxDate) > 0 || $attrs.dateDisabled && $scope.dateDisabled({
            date: date,
            mode: $scope.datepickerMode
        });
    };
    this.split = function(arr, size) {
        var arrays = [];
        while (arr.length > 0) {
            arrays.push(arr.splice(0, size));
        }
        return arrays;
    };
    $scope.select = function(clickeddate, event) {
        var date = clickeddate.date;
        if (clickeddate.secondary) {
            event.preventDefault();
        } else {
            if ($scope.datepickerMode === self.minMode) {
                var dt = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
                dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
                ngModelCtrl.$setViewValue(dt);
                ngModelCtrl.$render();
            } else {
                self.activeDate = date;
                $scope.datepickerMode = self.modes[self.modes.indexOf($scope.datepickerMode) - 1];
            }
        }
    };
    $scope.move = function(direction) {
        var year = self.activeDate.getFullYear() + direction * (self.step.years || 0), month = self.activeDate.getMonth() + direction * (self.step.months || 0);
        self.activeDate.setFullYear(year, month, 1);
        var dt = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
        dt.setFullYear(self.activeDate.getFullYear(), self.activeDate.getMonth(), self.activeDate.getDate());
        ngModelCtrl.$setViewValue(dt);
        self.refreshView();
    };
    $scope.selectMonth = function() {
        var year = self.activeDate.getFullYear(), month = self.activeDate.getMonth();
        self.activeDate.setFullYear(year, month, 1);
        var dt = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
        dt.setFullYear(self.activeDate.getFullYear(), self.activeDate.getMonth(), self.activeDate.getDate());
        dt.refreshMonth = true;
        ngModelCtrl.$setViewValue(dt);
        self.refreshView();
    };
    $scope.toggleMode = function(direction) {
        direction = direction || 1;
        if ($scope.datepickerMode === self.maxMode && direction === 1 || $scope.datepickerMode === self.minMode && direction === -1) {
            return;
        }
        $scope.datepickerMode = self.modes[self.modes.indexOf($scope.datepickerMode) + direction];
    };
    $scope.keys = {
        13: "enter",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };
    var focusElement = function() {
        $timeout(function() {
            self.element[0].focus();
        }, 0, false);
    };
    $scope.$on("datepicker.focus", focusElement);
    $scope.keydown = function(evt) {
        var key = $scope.keys[evt.which];
        if (!key || evt.shiftKey || evt.altKey) {
            return;
        }
        evt.preventDefault();
        evt.stopPropagation();
        if (key === "enter" || key === "space") {
            if (self.isDisabled(self.activeDate)) {
                return;
            }
            $scope.select(self.activeDate);
            focusElement();
        } else if (evt.ctrlKey && (key === "up" || key === "down")) {
            $scope.toggleMode(key === "up" ? 1 : -1);
            focusElement();
        } else {
            self.handleKeyDown(key, evt);
            self.refreshView();
        }
    };
} ]).directive("datepicker", function() {
    return {
        restrict: "EA",
        replace: true,
        templateUrl: "views/datepicker/datepicker.html",
        scope: {
            datepickerMode: "=?",
            dateDisabled: "&",
            events: "="
        },
        require: [ "datepicker", "?^ngModel" ],
        controller: "DatepickerController",
        link: function(scope, element, attrs, ctrls) {
            var datepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];
            if (ngModelCtrl) {
                datepickerCtrl.init(ngModelCtrl);
            }
        }
    };
}).directive("daypicker", [ "dateFilter", function(dateFilter) {
    return {
        restrict: "EA",
        replace: true,
        templateUrl: "views/datepicker/day.html",
        require: "^datepicker",
        link: function(scope, element, attrs, ctrl) {
            scope.showWeeks = ctrl.showWeeks;
            ctrl.step = {
                months: 1
            };
            ctrl.element = element;
            scope.events = ctrl.events;
            var DAYS_IN_MONTH = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
            function getDaysInMonth(year, month) {
                return month === 1 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : DAYS_IN_MONTH[month];
            }
            function getDates(startDate, n) {
                var dates = new Array(n), current = new Date(startDate), i = 0;
                current.setHours(12);
                while (i < n) {
                    dates[i++] = new Date(current);
                    current.setDate(current.getDate() + 1);
                }
                return dates;
            }
            function isSameDay(date1, date2) {
                var actualDate1 = date1.getDate();
                var monthDate1 = date1.getMonth();
                var yearDate1 = date1.getFullYear();
                var date2 = new Date(date2);
                var actualDate2 = date2.getDate();
                var monthDate2 = date2.getMonth();
                var yearDate2 = date2.getFullYear();
                var result = date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear();
                return result;
            }
            ctrl._refreshView = function() {
                var year = ctrl.activeDate.getFullYear(), month = ctrl.activeDate.getMonth(), firstDayOfMonth = new Date(year, month, 1), difference = ctrl.startingDay - firstDayOfMonth.getDay(), numDisplayedFromPreviousMonth = difference > 0 ? 7 - difference : -difference, firstDate = new Date(firstDayOfMonth);
                if (numDisplayedFromPreviousMonth > 0) {
                    firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
                }
                var days = getDates(firstDate, 42);
                for (var i = 0; i < 42; i++) {
                    var hasEvents = false;
                    days[i] = angular.extend(ctrl.createDateObject(days[i], ctrl.formatDay), {
                        secondary: days[i].getMonth() !== month,
                        uid: scope.uniqueId + "-" + i
                    });
                    if (scope.$parent.events) {
                        for (var j = 0; j < scope.$parent.events.length; j++) {
                            hasEvents = isSameDay(days[i].date, scope.$parent.events[j].startDate);
                            if (hasEvents) {
                                break;
                            }
                        }
                    }
                    days[i] = angular.extend(days[i], {
                        hasEvents: hasEvents
                    });
                    hasEvents = false;
                }
                scope.labels = new Array(7);
                for (var j = 0; j < 7; j++) {
                    scope.labels[j] = {
                        abbr: dateFilter(days[j].date, ctrl.formatDayHeader),
                        full: dateFilter(days[j].date, "EEEE")
                    };
                }
                scope.title = dateFilter(ctrl.activeDate, ctrl.formatDayTitle);
                scope.rows = ctrl.split(days, 7);
                if (scope.showWeeks) {
                    scope.weekNumbers = [];
                    var weekNumber = getISO8601WeekNumber(scope.rows[0][0].date), numWeeks = scope.rows.length;
                    while (scope.weekNumbers.push(weekNumber++) < numWeeks) {}
                }
            };
            ctrl.compare = function(date1, date2) {
                return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
            };
            function getISO8601WeekNumber(date) {
                var checkDate = new Date(date);
                checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
                var time = checkDate.getTime();
                checkDate.setMonth(0);
                checkDate.setDate(1);
                return Math.floor(Math.round((time - checkDate) / 864e5) / 7) + 1;
            }
            ctrl.handleKeyDown = function(key, evt) {
                var date = ctrl.activeDate.getDate();
                if (key === "left") {
                    date = date - 1;
                } else if (key === "up") {
                    date = date - 7;
                } else if (key === "right") {
                    date = date + 1;
                } else if (key === "down") {
                    date = date + 7;
                } else if (key === "pageup" || key === "pagedown") {
                    var month = ctrl.activeDate.getMonth() + (key === "pageup" ? -1 : 1);
                    ctrl.activeDate.setMonth(month, 1);
                    date = Math.min(getDaysInMonth(ctrl.activeDate.getFullYear(), ctrl.activeDate.getMonth()), date);
                } else if (key === "home") {
                    date = 1;
                } else if (key === "end") {
                    date = getDaysInMonth(ctrl.activeDate.getFullYear(), ctrl.activeDate.getMonth());
                }
                ctrl.activeDate.setDate(date);
            };
            ctrl.refreshView();
        }
    };
} ]).directive("monthpicker", [ "dateFilter", function(dateFilter) {
    return {
        restrict: "EA",
        replace: true,
        templateUrl: "views/datepicker/month.html",
        require: "^datepicker",
        link: function(scope, element, attrs, ctrl) {
            ctrl.step = {
                years: 1
            };
            ctrl.element = element;
            ctrl._refreshView = function() {
                var months = new Array(12), year = ctrl.activeDate.getFullYear();
                for (var i = 0; i < 12; i++) {
                    months[i] = angular.extend(ctrl.createDateObject(new Date(year, i, 1), ctrl.formatMonth), {
                        uid: scope.uniqueId + "-" + i
                    });
                }
                scope.title = dateFilter(ctrl.activeDate, ctrl.formatMonthTitle);
                scope.rows = ctrl.split(months, 3);
            };
            ctrl.compare = function(date1, date2) {
                return new Date(date1.getFullYear(), date1.getMonth()) - new Date(date2.getFullYear(), date2.getMonth());
            };
            ctrl.handleKeyDown = function(key, evt) {
                var date = ctrl.activeDate.getMonth();
                if (key === "left") {
                    date = date - 1;
                } else if (key === "up") {
                    date = date - 3;
                } else if (key === "right") {
                    date = date + 1;
                } else if (key === "down") {
                    date = date + 3;
                } else if (key === "pageup" || key === "pagedown") {
                    var year = ctrl.activeDate.getFullYear() + (key === "pageup" ? -1 : 1);
                    ctrl.activeDate.setFullYear(year);
                } else if (key === "home") {
                    date = 0;
                } else if (key === "end") {
                    date = 11;
                }
                ctrl.activeDate.setMonth(date);
            };
            ctrl.refreshView();
        }
    };
} ]).directive("yearpicker", [ "dateFilter", function(dateFilter) {
    return {
        restrict: "EA",
        replace: true,
        templateUrl: "views/datepicker/year.html",
        require: "^datepicker",
        link: function(scope, element, attrs, ctrl) {
            var range = ctrl.yearRange;
            ctrl.step = {
                years: range
            };
            ctrl.element = element;
            function getStartingYear(year) {
                return parseInt((year - 1) / range, 10) * range + 1;
            }
            ctrl._refreshView = function() {
                var years = new Array(range);
                for (var i = 0, start = getStartingYear(ctrl.activeDate.getFullYear()); i < range; i++) {
                    years[i] = angular.extend(ctrl.createDateObject(new Date(start + i, 0, 1), ctrl.formatYear), {
                        uid: scope.uniqueId + "-" + i
                    });
                }
                scope.title = [ years[0].label, years[range - 1].label ].join(" - ");
                scope.rows = ctrl.split(years, 5);
            };
            ctrl.compare = function(date1, date2) {
                return date1.getFullYear() - date2.getFullYear();
            };
            ctrl.handleKeyDown = function(key, evt) {
                var date = ctrl.activeDate.getFullYear();
                if (key === "left") {
                    date = date - 1;
                } else if (key === "up") {
                    date = date - 5;
                } else if (key === "right") {
                    date = date + 1;
                } else if (key === "down") {
                    date = date + 5;
                } else if (key === "pageup" || key === "pagedown") {
                    date += (key === "pageup" ? -1 : 1) * ctrl.step.years;
                } else if (key === "home") {
                    date = getStartingYear(ctrl.activeDate.getFullYear());
                } else if (key === "end") {
                    date = getStartingYear(ctrl.activeDate.getFullYear()) + range - 1;
                }
                ctrl.activeDate.setFullYear(date);
            };
            ctrl.refreshView();
        }
    };
} ]).constant("datepickerPopupConfig", {
    datepickerPopup: "yyyy-MM-dd",
    currentText: "Today",
    clearText: "Clear",
    closeText: "Done",
    closeOnDateSelection: true,
    appendToBody: false,
    showButtonBar: true
}).directive("datepickerPopup", [ "$compile", "$parse", "$document", "$position", "dateFilter", "dateParser", "datepickerPopupConfig", function($compile, $parse, $document, $position, dateFilter, dateParser, datepickerPopupConfig) {
    return {
        restrict: "EA",
        require: "ngModel",
        scope: {
            isOpen: "=?",
            currentText: "@",
            clearText: "@",
            closeText: "@",
            dateDisabled: "&"
        },
        link: function(scope, element, attrs, ngModel) {
            var dateFormat, closeOnDateSelection = angular.isDefined(attrs.closeOnDateSelection) ? scope.$parent.$eval(attrs.closeOnDateSelection) : datepickerPopupConfig.closeOnDateSelection, appendToBody = angular.isDefined(attrs.datepickerAppendToBody) ? scope.$parent.$eval(attrs.datepickerAppendToBody) : datepickerPopupConfig.appendToBody;
            scope.showButtonBar = angular.isDefined(attrs.showButtonBar) ? scope.$parent.$eval(attrs.showButtonBar) : datepickerPopupConfig.showButtonBar;
            scope.getText = function(key) {
                return scope[key + "Text"] || datepickerPopupConfig[key + "Text"];
            };
            attrs.$observe("datepickerPopup", function(value) {
                dateFormat = value || datepickerPopupConfig.datepickerPopup;
                ngModel.$render();
            });
            var popupEl = angular.element("<div datepicker-popup-wrap><div datepicker></div></div>");
            popupEl.attr({
                "ng-model": "date",
                "ng-change": "dateSelection()"
            });
            function cameltoDash(string) {
                return string.replace(/([A-Z])/g, function($1) {
                    return "-" + $1.toLowerCase();
                });
            }
            var datepickerEl = angular.element(popupEl.children()[0]);
            if (attrs.datepickerOptions) {
                angular.forEach(scope.$parent.$eval(attrs.datepickerOptions), function(value, option) {
                    datepickerEl.attr(cameltoDash(option), value);
                });
            }
            angular.forEach([ "minDate", "maxDate" ], function(key) {
                if (attrs[key]) {
                    scope.$parent.$watch($parse(attrs[key]), function(value) {
                        scope[key] = value;
                    });
                    datepickerEl.attr(cameltoDash(key), key);
                }
            });
            if (attrs.dateDisabled) {
                datepickerEl.attr("date-disabled", "dateDisabled({ date: date, mode: mode })");
            }
            function parseDate(viewValue) {
                if (!viewValue) {
                    ngModel.$setValidity("date", true);
                    return null;
                } else if (angular.isDate(viewValue) && !isNaN(viewValue)) {
                    ngModel.$setValidity("date", true);
                    return viewValue;
                } else if (angular.isString(viewValue)) {
                    var date = dateParser.parse(viewValue, dateFormat) || new Date(viewValue);
                    if (isNaN(date)) {
                        ngModel.$setValidity("date", false);
                        return undefined;
                    } else {
                        ngModel.$setValidity("date", true);
                        return date;
                    }
                } else {
                    ngModel.$setValidity("date", false);
                    return undefined;
                }
            }
            ngModel.$parsers.unshift(parseDate);
            scope.dateSelection = function(dt) {
                if (angular.isDefined(dt)) {
                    scope.date = dt;
                }
                ngModel.$setViewValue(scope.date);
                ngModel.$render();
                if (closeOnDateSelection) {
                    scope.isOpen = false;
                    element[0].focus();
                }
            };
            element.bind("input change keyup", function() {
                scope.$apply(function() {
                    scope.date = ngModel.$modelValue;
                });
            });
            ngModel.$render = function() {
                var date = ngModel.$viewValue ? dateFilter(ngModel.$viewValue, dateFormat) : "";
                element.val(date);
                scope.date = parseDate(ngModel.$modelValue);
            };
            var documentClickBind = function(event) {
                if (scope.isOpen && event.target !== element[0]) {
                    scope.$apply(function() {
                        scope.isOpen = false;
                    });
                }
            };
            var keydown = function(evt, noApply) {
                scope.keydown(evt);
            };
            element.bind("keydown", keydown);
            scope.keydown = function(evt) {
                if (evt.which === 27) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    scope.close();
                } else if (evt.which === 40 && !scope.isOpen) {
                    scope.isOpen = true;
                }
            };
            scope.$watch("isOpen", function(value) {
                if (value) {
                    scope.$broadcast("datepicker.focus");
                    scope.position = appendToBody ? $position.offset(element) : $position.position(element);
                    scope.position.top = scope.position.top + element.prop("offsetHeight");
                    $document.bind("click", documentClickBind);
                } else {
                    $document.unbind("click", documentClickBind);
                }
            });
            scope.select = function(clickeddate, event) {
                var date = clickeddate.date;
                if (clickeddate.secondary) {
                    event.preventDefault();
                } else {
                    if (date === "today") {
                        var today = new Date();
                        if (angular.isDate(ngModel.$modelValue)) {
                            date = new Date(ngModel.$modelValue);
                            date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
                        } else {
                            date = new Date(today.setHours(0, 0, 0, 0));
                        }
                    }
                    scope.dateSelection(date);
                }
            };
            scope.close = function() {
                scope.isOpen = false;
                element[0].focus();
            };
            var $popup = $compile(popupEl)(scope);
            if (appendToBody) {
                $document.find("body").append($popup);
            } else {
                element.after($popup);
            }
            scope.$on("$destroy", function() {
                $popup.remove();
                element.unbind("keydown", keydown);
                $document.unbind("click", documentClickBind);
            });
        }
    };
} ]).directive("datepickerPopupWrap", function() {
    return {
        restrict: "EA",
        replace: true,
        transclude: true,
        templateUrl: "views/datepicker/popup.html",
        link: function(scope, element, attrs) {
            element.bind("click", function(event) {
                event.preventDefault();
                event.stopPropagation();
            });
        }
    };
});

var app = angular.module("app", [ "mm.foundation", "ngRoute", "ngAnimate", "ngSanitize", "ui.bootstrap.datepicker", "agh.multimenu", "agh.tooltip" ]);

app.run(function() {
    FastClick.attach(document.body);
});

app.controller("navigationController", function($scope, $window) {
    var navigation = this;
    navigation.hideNavigation = true;
    navigation.myTimeStatus = {
        label: "Inn",
        status: false
    };
    navigation.toggleNav = function() {
        navigation.hideNavigation = !navigation.hideNavigation;
    };
    navigation.clicked = function() {
        navigation.hideNavigation = true;
    };
    navigation.toggleMyTime = function() {
        navigation.myTimeStatus.status = !navigation.myTimeStatus.status;
        if (navigation.myTimeStatus.status) {
            navigation.myTimeStatus.label = "Ut";
        } else {
            navigation.myTimeStatus.label = "Inn";
        }
    };
    navigation.setActive = function(item) {
        item.active = true;
    };
    navigation.menuItems = $window.menuData;
});

app.controller("sliderController", function($window) {
    var slider = this;
    slider.slides = [ {
        active: false
    }, {
        active: false
    }, {
        active: false
    } ];
    slider.slides = $window.sliderData;
    slider.slides[0].active = true;
    slider.setActive = function(currentSlide) {
        for (var i = 0; i < slider.slides.length; i++) {
            slider.slides[i].active = false;
        }
        currentSlide.active = !currentSlide.active;
    };
});

app.controller("statusUpdateCtrl", function(asyncDataService, dataService) {
    var statusUpdate = this;
    statusUpdate.currentUser = "Adam Haeger";
    var result = asyncDataService.getStatuses();
    result.success(function(data) {
        statusUpdate.updates = data;
    }).error(function() {
        statusUpdate.updates = dataService.statuses;
        console.log("async status data failed - using local backup data");
    });
    statusUpdate.toggleLike = function(update) {
        var index = update.likes.indexOf(statusUpdate.currentUser);
        if (index > -1) {
            update.likes.splice(index, 1);
            update.hasLiked = false;
        } else {
            update.likes.push(statusUpdate.currentUser);
            console.log("update.likes", update.likes);
            update.hasLiked = true;
        }
    };
    statusUpdate.addUpdate = function(update) {
        statusUpdate.updates.unshift({
            image: "img/statusimageplaceholder1.png",
            name: statusUpdate.currentUser,
            body: update,
            comments: [],
            likes: []
        });
    };
    statusUpdate.toggleComments = function(update) {
        update.commentsVisible = !update.commentsVisible;
    };
    statusUpdate.addComment = function(update, comment) {
        update.comments.push({
            name: statusUpdate.currentUser,
            comment: comment
        });
    };
});

app.directive("likeslist", function() {
    return {
        restrict: "A",
        scope: {
            likes: "="
        },
        link: function(scope, element, attrs, ctrl) {
            element.bind("mouseover", function(event) {
                console.log("mousing");
            });
            element.bind("mouseout", function(event) {
                console.log("mousing out");
            });
        }
    };
});

app.directive("comment", function() {
    return {
        restrict: "A",
        scope: {},
        controller: "statusUpdateCtrl",
        link: function(scope, element, attrs, ctrl) {
            element.bind("keydown keypress", function(event) {
                if (event.which === 13) {
                    console.log(element[0].value);
                    ctrl.addComment();
                }
            });
            event.preventDefault();
        }
    };
});

app.filter("iif", function() {
    return function(input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
    };
});

app.filter("newlines", function() {
    return function(text) {
        return text.replace(/\n/g, "<br/>");
    };
});

app.controller("CalendarCtrl", function($scope, $http, helperService, dataService, asyncDataService) {
    var calendar = this;
    this.dataLoaded = false;
    calendar.regions = dataService.regions;
    calendar.refreshMonth = false;
    calendar.setStartDate = function(date) {
        calendar.startDate = date;
    };
    calendar.getStartDate = function() {
        return calendar.startDate;
    };
    calendar.setEndDate = function(date) {
        calendar.endDate = date;
    };
    calendar.getEndDate = function() {
        return calendar.endDate;
    };
    calendar.getMonthFromStartDate = function() {
        var mydate = new Date(calendar.getStartDate());
        return mydate.getMonth();
    };
    calendar.setMonthInStartDate = function(month) {
        calendar.setStartDate(calendar.getStartDate().setMonth(month));
    };
    calendar.resetCalendar = function() {
        calendar.refreshMonth = true;
        calendar.init();
    };
    calendar.getData = function(startDate) {
        var result = asyncDataService.getData(startDate, helperService.addDaysToDate(calendar.getStartDate(), 40));
        result.success(function(data, status, headers, config) {
            calendar.data = data;
            calendar.events = calendar.data;
            calendar.dataLoaded = true;
            calendar.initDataDates();
        }).error(function(data, status, headers, config) {
            console.log("KS Fiks: ajax call failed, getting backup data.");
            calendar.data = dataService.data;
            calendar.events = calendar.data;
            calendar.dataLoaded = true;
            calendar.initDataDates();
        });
    };
    calendar.init = function($http) {
        var firstOfTheMonth = new Date();
        firstOfTheMonth.setDate(1);
        calendar.dt = firstOfTheMonth;
        var newStartDate = helperService.addDaysToDate(calendar.dt, 0);
        calendar.setStartDate(newStartDate);
        var newEndDate = helperService.addDaysToDate(calendar.dt, 30);
        calendar.setEndDate(newEndDate);
        calendar.data = [];
        calendar.getData(calendar.getStartDate());
    };
    calendar.initDataDates = function() {
        calendar.events.forEach(function(event) {
            event.startDate = new Date(event.startDate);
            event.endDate = new Date(event.endDate);
        });
    };
    calendar.init($http);
    $scope.$watch("calendar.dt", function(newVal, oldVal) {
        var newValTimestamp = helperService.toTimestamp(newVal);
        var oldValTimestamp = helperService.toTimestamp(oldVal);
        var entireMonth = calendar.dt.refreshMonth || calendar.refreshMonth;
        calendar.refreshMonth = false;
        if (oldValTimestamp !== undefined) {
            if (oldValTimestamp !== newValTimestamp) {
                calendar.setEndDate(oldVal);
                var days = 1;
                if (entireMonth || calendar.getMonthFromStartDate() !== newVal.getMonth()) {
                    var newDate = new Date(newVal);
                    newDate.setDate(1);
                    calendar.setStartDate(newDate);
                    var monthIndex = newDate.getMonth() + 1;
                    days = helperService.daysInMonth(monthIndex, newDate.getFullYear());
                    calendar.getData(newDate);
                } else {
                    days = 1;
                    calendar.setStartDate(newVal);
                }
                var newEndDate = helperService.addDaysToDate(calendar.getStartDate(), days);
                calendar.setEndDate(newEndDate);
            }
        }
    }, true);
});

app.directive("slider", function() {
    return {
        restrict: "A",
        transclude: true,
        templateUrl: "views/slider.html"
    };
});

app.directive("statusupdate", function() {
    return {
        restrict: "A",
        transclude: true,
        templateUrl: "views/status_update.html"
    };
});

angular.module("agh.tooltip", [ "views/tooltip.html" ]).directive("tooltipHover", function() {
    return {
        restrict: "A",
        replace: false,
        transclude: false,
        templateUrl: "views/tooltip.html",
        scope: {
            items: "=",
            visible: "="
        },
        link: function(scope, element, attrs, ctrl) {
            element.bind("mouseover mouseout", function() {
                if (scope.items && scope.items.length > 0) {
                    scope.visible = !scope.visible;
                }
                scope.$apply();
                console.log("scope.items", scope.items);
            });
        }
    };
});

angular.module("views/tooltip.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("views/tooltip.html", "<div class='likes-list' >" + "<span>{{ items.length }}</span>" + '<ul ng-show="visible">' + '<li ng-repeat="item in items" >{{ item.name }}</li>' + "</ul>" + "<div>");
} ]);

angular.module("agh.multimenu", [ "views/multimenu.html", "menu_item.html" ]).service("menuService", [ "$rootScope", function($rootScope) {
    var visible;
    this.setState = function(visible) {
        var visible = visible;
    };
    this.toggleVisible = function() {
        visible = !visible;
        $rootScope.$apply();
    };
    this.getVisible = function() {
        return visible;
    };
} ]).controller("MenuController", [ "$scope", "menuService", function($scope, menuService) {
    var menu = this;
    $scope.activeLevel = 0;
    $scope.menuService = menuService;
    menu.clickPath = [];
    $scope.isVisible;
    menu.init = function(visible) {
        $scope.isVisible = visible;
    };
    $scope.$watch("menuService.getVisible()", function(newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }
        $scope.isVisible = newValue;
    });
    menu.incrementActiveLevel = function() {
        $scope.activeLevel = $scope.activeLevel + 1;
    };
    menu.decrementActiveLevel = function() {
        $scope.activeLevel = $scope.activeLevel - 1;
        menu.clickPath[menu.clickPath.length - 1].removeClass("active");
        menu.clickPath.pop();
        $scope.$apply();
    };
    menu.setActiveItem = function(element) {
        element.addClass("active");
        menu.clickPath.push(element);
        $scope.$apply();
    };
} ]).directive("multimenu", function() {
    return {
        restrict: "EA",
        replace: true,
        templateUrl: "views/multimenu.html",
        scope: {
            menuitems: "=",
            visible: "="
        },
        controller: "MenuController",
        link: function(scope, element, attrs, ctrl) {
            ctrl.init(scope.visible);
        }
    };
}).directive("backbutton", function() {
    return {
        restrict: "EA",
        scope: {},
        require: "^multimenu",
        link: function(scope, element, attrs, ctrl) {
            element.bind("click", function() {
                ctrl.decrementActiveLevel();
            });
        }
    };
}).directive("closebutton", function() {
    return {
        restrict: "EA",
        scope: {},
        require: "^multimenu",
        controller: function($element, menuService) {
            $element.bind("click", function() {
                menuService.toggleVisible();
            });
        }
    };
}).directive("menuitem", function() {
    return {
        restrict: "EA",
        require: "^multimenu",
        link: function(scope, element, attrs, ctrls) {
            var menuCtrl = ctrls;
            element.bind("click", function() {
                menuCtrl.incrementActiveLevel();
                menuCtrl.setActiveItem(element);
            });
        }
    };
});

angular.module("views/multimenu.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("views/multimenu.html", '<aside class="main-menu" ng-class="{\'visible\' : isVisible}">' + '    <a backbutton ng-show="activeLevel > 0" class="back-button"></a>' + '    <a closebutton class="close-button"></a>' + '    <ul class="off-canvas-list"  ng-style="{' + "                '-webkit-transform': 'translate(-' +  ( activeLevel * 100 ) + '%, 0)' ," + "                '-moz-transform': 'translate3d(-' +  ( activeLevel * 100 ) + '%, 0, 0) scale3d(1, 1, 1)' ," + "                '-ms-transform': 'translate(-' +  ( activeLevel * 100 ) + '%, 0) ' ," + "                '-o-transformm': 'translate3d(-' +  ( activeLevel * 100 ) + '%, 0, 0) scale3d(1, 1, 1)' ," + "                'transform': 'translate3d(-' +  ( activeLevel * 100 ) + '%, 0, 0) scale3d(1, 1, 1)' " + '}" >' + '        <li ng-repeat="item in menuitems" ng-include="\'menu_item.html\'"></li>' + "    </ul>" + "</aside>");
} ]);

angular.module("menu_item.html", []).run([ "$templateCache", function($templateCache) {
    $templateCache.put("menu_item.html", '<a ng-if="item.categories.length" menuitem>{{ item.linkText }}<span class="icon-arrow-right"></span></a>' + '<a ng-if="!item.categories.length" href="{{item.href}}">{{ item.linkText }}</a>' + '<ul ng-if="item.categories.length">' + '<li ng-repeat="item in item.categories" ng-include="\'menu_item.html\'"></li>' + "</ul>");
} ]);

app.filter("dateFilter", function() {
    return function(events, startDateString, endDateString) {
        var startDate, endDate;
        var filtered = [];
        if (events) {
            startDate = new Date(startDateString);
            endDate = new Date(endDateString);
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);
            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                if (event.startDate >= startDate && event.startDate < endDate) {
                    filtered.push(event);
                }
            }
        }
        return filtered;
    };
});

app.service("helperService", function() {
    var helperService = {
        toTimestamp: function(date) {
            var factor = 24 * 60 * 60 * 1e3;
            return date * factor;
        },
        dateToString: function(timestamp) {
            var date = new Date();
            date.setTime(timestamp);
            return date.toUTCString();
        },
        addDaysToDate: function(date, days) {
            var newDate = new Date(date.getTime());
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        },
        daysInMonth: function(month, year) {
            return new Date(year, month, 0).getDate();
        }
    };
    return helperService;
});

app.service("dataService", function() {
    return {
        regions: [ {
            name: "Nord-Norge"
        }, {
            name: "Østlandet"
        }, {
            name: "Vestlandet"
        }, {
            name: "Sørlandet"
        } ],
        data: [ {
            title: "Norsk kommunesektor i EU/EØS teorien",
            description: "Kort om arrangementet. Fastsatt tegn. ",
            startDate: "2014-04-21T00:00:00",
            endDate: "2014-04-21T00:00:00",
            region: "Nord-Norge",
            url: "http://localhost:8888/#/article"
        }, {
            title: "Fagsamling for FoU",
            description: "Kort om arrangementet. Fastsatt tegn. Mer tekst hvor mye tekst skal det kunne være her Heidi?",
            startDate: "2014-05-01T00:00:00",
            endDate: "2014-05-01T00:00:00",
            region: "Nord-Norge",
            url: "http://localhost:8888/#/article"
        }, {
            title: "Norsk kommunesektor i EU/EØS teorien, Øst",
            description: "Kort om arrangementet. Fastsatt tegn. ",
            startDate: "2014-05-10T00:00:00",
            endDate: "2014-05-10T00:00:00",
            region: "Østlandet",
            url: "http://localhost:8888/#/article"
        }, {
            title: "Fagsamling for FoU Øst",
            description: "Kort om arrangementet. Fastsatt tegn. Mer tekst hvor mye tekst skal det kunne være her Heidi?",
            startDate: "2014-05-21T00:00:00",
            endDate: "2014-05-21T00:00:00",
            region: "Østlandet",
            url: "http://localhost:8888/#/article"
        }, {
            title: "Senkveldssamling 10. mai",
            description: "Kort om arrangementet. Fastsatt tegn. Mer tekst hvor mye tekst skal det kunne være her Heidi?",
            startDate: "2014-06-21T00:00:00",
            endDate: "2014-06-21T00:00:00",
            region: "Nord-Norge",
            url: "http://localhost:8888/#/article"
        }, {
            title: "Fagsamling for FoU",
            description: "Kort om arrangementet. Fastsatt tegn. Mer tekst hvor mye tekst skal det kunne være her Heidi?",
            startDate: "2014-06-20T00:00:00",
            endDate: "2014-06-20T00:00:00",
            region: "Nord-Norge",
            url: "http://localhost:8888/#/article"
        }, {
            title: "Finnmark: Fylkesmøte",
            description: "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
            startDate: "2014-07-21T00:00:00",
            endDate: "2014-07-21T00:00:00",
            region: "Nord-Norge",
            url: "http://localhost:8888/#/article"
        }, {
            title: "Finnmark: Fylkesmøte",
            description: "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
            startDate: "2014-05-15T00:00:00",
            endDate: "2014-05-15T00:00:00",
            region: "Nord-Norge",
            url: "http://localhost:8888/#/article"
        }, {
            title: "Finnmark: Fylkesmøte",
            description: "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
            startDate: "2014-05-04T00:00:00",
            endDate: "2014-05-04T00:00:00",
            region: "Nord-Norge",
            url: "http://localhost:8888/#/article"
        }, {
            title: "Finnmark: Fylkesmøte",
            description: "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
            startDate: "2014-05-19T00:00:00",
            endDate: "2014-05-19T00:00:00",
            region: "Nord-Norge",
            url: "http://localhost:8888/#/article"
        }, {
            title: "Finnmark: Fylkesmøte",
            description: "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
            startDate: "2014-05-19T00:00:00",
            endDate: "2014-05-19T00:00:00",
            region: "Nord-Norge",
            url: "http://localhost:8888/#/article"
        }, {
            title: "Finnmark: Fylkesmøte i juli",
            description: "Kort om arrangementet. Fastsatt tegn. Finnmark rulz btw.",
            startDate: "2014-06-20T00:00:00",
            endDate: "2014-06-20T00:00:00",
            region: "Nord-Norge",
            url: "http://localhost:8888/#/article"
        } ],
        data2: [ {
            title: "Kalenderhendelse",
            description: "Ingresstekst - kalender",
            startDate: "2014-05-21T00:00:00",
            endDate: "2014-05-29T00:00:00",
            region: "Oslo",
            url: "/en/kalender/kalenderhendelse/"
        }, {
            title: "Kalenderhendelse2",
            description: "Ingress - kalender2",
            startDate: "2014-05-28T00:00:00",
            endDate: "2014-05-28T19:00:00",
            region: "Trondheim",
            url: "/en/kalender/kalenderhendelse2/"
        } ],
        statuses: [ {
            image: "img/statusimageplaceholder1.png",
            name: "Ole Jørgen Grann",
            body: "Klimatilpasningskonferansen 27. mars til  KS er nå fullbooket - 150 påmeldt! Vi tar sjansen på å utvide til 170 deltagere. Hvis du ønsker å melde deg på - så gjør det nå: <a href='#'>http://ks.no/konferanse</a>",
            comments: [ {
                name: "Stian Westvig",
                comment: "Jeg vil være med på klima konferanse!"
            }, {
                name: "Silje Sletteng",
                comment: "Jeg også!"
            }, {
                name: "Per Atle Holvik",
                comment: "Elsker klima!"
            } ],
            likes: [ {
                name: "Stian Westvig"
            }, {
                name: "Silje Sletteng"
            }, {
                name: "Per Atle Holvik"
            } ],
            hasLiked: true
        }, {
            image: "img/statusimageplaceholder2.png",
            name: "Ole Jørgen Grann",
            body: "Klimatilpasningskonferansen 27. mars til  KS er nå fullbooket - 150 påmeldt! Vi tar sjansen på å utvide til 170 deltagere. Hvis du ønsker å melde deg på - så gjør det nå: <a href='#'>http://ks.no/konferanse</a>",
            comments: [],
            likes: [ {
                name: "Stian Westvig"
            }, {
                name: "Silje Sletteng"
            }, {
                name: "Per Atle Holvik"
            } ],
            hasLiked: false
        } ]
    };
});

app.service("asyncDataService", function($http) {
    this.getData = function(startDate, endDate) {
        if (startDate && endDate) {
            var urlString = "/api/CalendarEvent";
            var intervalString = "/";
            var startYear = startDate.getFullYear();
            var startMonth = ("0" + (startDate.getMonth() + 1)).slice(-2);
            var startDay = ("0" + startDate.getDate()).slice(-2);
            var endYear = endDate.getFullYear();
            var endMonth = ("0" + (endDate.getMonth() + 1)).slice(-2);
            var endDay = ("0" + endDate.getDate()).slice(-2);
            intervalString += startYear + "-" + startMonth + "-" + startDay + "/" + endYear + "-" + endMonth + "-" + endDay + "";
            return $http({
                method: "GET",
                url: urlString + intervalString
            });
        }
    };
    this.getStatuses = function() {
        return $http({
            method: "GET",
            url: "/api/statuses"
        });
    };
});
window.Modernizr = function(window, document, undefined) {
    var version = "2.8.3", Modernizr = {}, enableClasses = true, docElement = document.documentElement, mod = "modernizr", modElem = document.createElement(mod), mStyle = modElem.style, inputElem = document.createElement("input"), smile = ":)", toString = {}.toString, prefixes = " -webkit- -moz- -o- -ms- ".split(" "), omPrefixes = "Webkit Moz O ms", cssomPrefixes = omPrefixes.split(" "), domPrefixes = omPrefixes.toLowerCase().split(" "), ns = {
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
            return matchMedia(mq) && matchMedia(mq).matches || false;
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

(function(P, W, s) {
    "use strict";
    function y(b) {
        return function() {
            var a = arguments[0], c, a = "[" + (b ? b + ":" : "") + a + "] http://errors.angularjs.org/1.2.21/" + (b ? b + "/" : "") + a;
            for (c = 1; c < arguments.length; c++) a = a + (1 == c ? "?" : "&") + "p" + (c - 1) + "=" + encodeURIComponent("function" == typeof arguments[c] ? arguments[c].toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof arguments[c] ? "undefined" : "string" != typeof arguments[c] ? JSON.stringify(arguments[c]) : arguments[c]);
            return Error(a);
        };
    }
    function eb(b) {
        if (null == b || Fa(b)) return !1;
        var a = b.length;
        return 1 === b.nodeType && a ? !0 : z(b) || I(b) || 0 === a || "number" === typeof a && 0 < a && a - 1 in b;
    }
    function q(b, a, c) {
        var d;
        if (b) if (C(b)) for (d in b) "prototype" == d || ("length" == d || "name" == d || b.hasOwnProperty && !b.hasOwnProperty(d)) || a.call(c, b[d], d); else if (I(b) || eb(b)) for (d = 0; d < b.length; d++) a.call(c, b[d], d); else if (b.forEach && b.forEach !== q) b.forEach(a, c); else for (d in b) b.hasOwnProperty(d) && a.call(c, b[d], d);
        return b;
    }
    function Zb(b) {
        var a = [], c;
        for (c in b) b.hasOwnProperty(c) && a.push(c);
        return a.sort();
    }
    function Tc(b, a, c) {
        for (var d = Zb(b), e = 0; e < d.length; e++) a.call(c, b[d[e]], d[e]);
        return d;
    }
    function $b(b) {
        return function(a, c) {
            b(c, a);
        };
    }
    function fb() {
        for (var b = ka.length, a; b; ) {
            b--;
            a = ka[b].charCodeAt(0);
            if (57 == a) return ka[b] = "A", ka.join("");
            if (90 == a) ka[b] = "0"; else return ka[b] = String.fromCharCode(a + 1), ka.join("");
        }
        ka.unshift("0");
        return ka.join("");
    }
    function ac(b, a) {
        a ? b.$$hashKey = a : delete b.$$hashKey;
    }
    function F(b) {
        var a = b.$$hashKey;
        q(arguments, function(a) {
            a !== b && q(a, function(a, c) {
                b[c] = a;
            });
        });
        ac(b, a);
        return b;
    }
    function Z(b) {
        return parseInt(b, 10);
    }
    function bc(b, a) {
        return F(new (F(function() {}, {
            prototype: b
        }))(), a);
    }
    function D() {}
    function Ga(b) {
        return b;
    }
    function $(b) {
        return function() {
            return b;
        };
    }
    function v(b) {
        return "undefined" === typeof b;
    }
    function B(b) {
        return "undefined" !== typeof b;
    }
    function S(b) {
        return null != b && "object" === typeof b;
    }
    function z(b) {
        return "string" === typeof b;
    }
    function Ab(b) {
        return "number" === typeof b;
    }
    function sa(b) {
        return "[object Date]" === ya.call(b);
    }
    function C(b) {
        return "function" === typeof b;
    }
    function gb(b) {
        return "[object RegExp]" === ya.call(b);
    }
    function Fa(b) {
        return b && b.document && b.location && b.alert && b.setInterval;
    }
    function Uc(b) {
        return !(!b || !(b.nodeName || b.prop && b.attr && b.find));
    }
    function Vc(b, a, c) {
        var d = [];
        q(b, function(b, f, g) {
            d.push(a.call(c, b, f, g));
        });
        return d;
    }
    function Pa(b, a) {
        if (b.indexOf) return b.indexOf(a);
        for (var c = 0; c < b.length; c++) if (a === b[c]) return c;
        return -1;
    }
    function Qa(b, a) {
        var c = Pa(b, a);
        0 <= c && b.splice(c, 1);
        return a;
    }
    function Ha(b, a, c, d) {
        if (Fa(b) || b && b.$evalAsync && b.$watch) throw Ra("cpws");
        if (a) {
            if (b === a) throw Ra("cpi");
            c = c || [];
            d = d || [];
            if (S(b)) {
                var e = Pa(c, b);
                if (-1 !== e) return d[e];
                c.push(b);
                d.push(a);
            }
            if (I(b)) for (var f = a.length = 0; f < b.length; f++) e = Ha(b[f], null, c, d), 
            S(b[f]) && (c.push(b[f]), d.push(e)), a.push(e); else {
                var g = a.$$hashKey;
                q(a, function(b, c) {
                    delete a[c];
                });
                for (f in b) e = Ha(b[f], null, c, d), S(b[f]) && (c.push(b[f]), d.push(e)), a[f] = e;
                ac(a, g);
            }
        } else if (a = b) I(b) ? a = Ha(b, [], c, d) : sa(b) ? a = new Date(b.getTime()) : gb(b) ? (a = RegExp(b.source, b.toString().match(/[^\/]*$/)[0]), 
        a.lastIndex = b.lastIndex) : S(b) && (a = Ha(b, {}, c, d));
        return a;
    }
    function ga(b, a) {
        if (I(b)) {
            a = a || [];
            for (var c = 0; c < b.length; c++) a[c] = b[c];
        } else if (S(b)) for (c in a = a || {}, b) !hb.call(b, c) || "$" === c.charAt(0) && "$" === c.charAt(1) || (a[c] = b[c]);
        return a || b;
    }
    function za(b, a) {
        if (b === a) return !0;
        if (null === b || null === a) return !1;
        if (b !== b && a !== a) return !0;
        var c = typeof b, d;
        if (c == typeof a && "object" == c) if (I(b)) {
            if (!I(a)) return !1;
            if ((c = b.length) == a.length) {
                for (d = 0; d < c; d++) if (!za(b[d], a[d])) return !1;
                return !0;
            }
        } else {
            if (sa(b)) return sa(a) && b.getTime() == a.getTime();
            if (gb(b) && gb(a)) return b.toString() == a.toString();
            if (b && b.$evalAsync && b.$watch || a && a.$evalAsync && a.$watch || Fa(b) || Fa(a) || I(a)) return !1;
            c = {};
            for (d in b) if ("$" !== d.charAt(0) && !C(b[d])) {
                if (!za(b[d], a[d])) return !1;
                c[d] = !0;
            }
            for (d in a) if (!c.hasOwnProperty(d) && "$" !== d.charAt(0) && a[d] !== s && !C(a[d])) return !1;
            return !0;
        }
        return !1;
    }
    function Bb(b, a) {
        var c = 2 < arguments.length ? Aa.call(arguments, 2) : [];
        return !C(a) || a instanceof RegExp ? a : c.length ? function() {
            return arguments.length ? a.apply(b, c.concat(Aa.call(arguments, 0))) : a.apply(b, c);
        } : function() {
            return arguments.length ? a.apply(b, arguments) : a.call(b);
        };
    }
    function Wc(b, a) {
        var c = a;
        "string" === typeof b && "$" === b.charAt(0) ? c = s : Fa(a) ? c = "$WINDOW" : a && W === a ? c = "$DOCUMENT" : a && (a.$evalAsync && a.$watch) && (c = "$SCOPE");
        return c;
    }
    function ta(b, a) {
        return "undefined" === typeof b ? s : JSON.stringify(b, Wc, a ? "  " : null);
    }
    function cc(b) {
        return z(b) ? JSON.parse(b) : b;
    }
    function Sa(b) {
        "function" === typeof b ? b = !0 : b && 0 !== b.length ? (b = K("" + b), b = !("f" == b || "0" == b || "false" == b || "no" == b || "n" == b || "[]" == b)) : b = !1;
        return b;
    }
    function ha(b) {
        b = x(b).clone();
        try {
            b.empty();
        } catch (a) {}
        var c = x("<div>").append(b).html();
        try {
            return 3 === b[0].nodeType ? K(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(a, b) {
                return "<" + K(b);
            });
        } catch (d) {
            return K(c);
        }
    }
    function dc(b) {
        try {
            return decodeURIComponent(b);
        } catch (a) {}
    }
    function ec(b) {
        var a = {}, c, d;
        q((b || "").split("&"), function(b) {
            b && (c = b.replace(/\+/g, "%20").split("="), d = dc(c[0]), B(d) && (b = B(c[1]) ? dc(c[1]) : !0, 
            hb.call(a, d) ? I(a[d]) ? a[d].push(b) : a[d] = [ a[d], b ] : a[d] = b));
        });
        return a;
    }
    function Cb(b) {
        var a = [];
        q(b, function(b, d) {
            I(b) ? q(b, function(b) {
                a.push(Ba(d, !0) + (!0 === b ? "" : "=" + Ba(b, !0)));
            }) : a.push(Ba(d, !0) + (!0 === b ? "" : "=" + Ba(b, !0)));
        });
        return a.length ? a.join("&") : "";
    }
    function ib(b) {
        return Ba(b, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
    }
    function Ba(b, a) {
        return encodeURIComponent(b).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, a ? "%20" : "+");
    }
    function Xc(b, a) {
        function c(a) {
            a && d.push(a);
        }
        var d = [ b ], e, f, g = [ "ng:app", "ng-app", "x-ng-app", "data-ng-app" ], k = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
        q(g, function(a) {
            g[a] = !0;
            c(W.getElementById(a));
            a = a.replace(":", "\\:");
            b.querySelectorAll && (q(b.querySelectorAll("." + a), c), q(b.querySelectorAll("." + a + "\\:"), c), 
            q(b.querySelectorAll("[" + a + "]"), c));
        });
        q(d, function(a) {
            if (!e) {
                var b = k.exec(" " + a.className + " ");
                b ? (e = a, f = (b[2] || "").replace(/\s+/g, ",")) : q(a.attributes, function(b) {
                    !e && g[b.name] && (e = a, f = b.value);
                });
            }
        });
        e && a(e, f ? [ f ] : []);
    }
    function fc(b, a) {
        var c = function() {
            b = x(b);
            if (b.injector()) {
                var c = b[0] === W ? "document" : ha(b);
                throw Ra("btstrpd", c);
            }
            a = a || [];
            a.unshift([ "$provide", function(a) {
                a.value("$rootElement", b);
            } ]);
            a.unshift("ng");
            c = gc(a);
            c.invoke([ "$rootScope", "$rootElement", "$compile", "$injector", "$animate", function(a, b, c, d, e) {
                a.$apply(function() {
                    b.data("$injector", d);
                    c(b)(a);
                });
            } ]);
            return c;
        }, d = /^NG_DEFER_BOOTSTRAP!/;
        if (P && !d.test(P.name)) return c();
        P.name = P.name.replace(d, "");
        Ta.resumeBootstrap = function(b) {
            q(b, function(b) {
                a.push(b);
            });
            c();
        };
    }
    function jb(b, a) {
        a = a || "_";
        return b.replace(Yc, function(b, d) {
            return (d ? a : "") + b.toLowerCase();
        });
    }
    function Db(b, a, c) {
        if (!b) throw Ra("areq", a || "?", c || "required");
        return b;
    }
    function Ua(b, a, c) {
        c && I(b) && (b = b[b.length - 1]);
        Db(C(b), a, "not a function, got " + (b && "object" === typeof b ? b.constructor.name || "Object" : typeof b));
        return b;
    }
    function Ca(b, a) {
        if ("hasOwnProperty" === b) throw Ra("badname", a);
    }
    function hc(b, a, c) {
        if (!a) return b;
        a = a.split(".");
        for (var d, e = b, f = a.length, g = 0; g < f; g++) d = a[g], b && (b = (e = b)[d]);
        return !c && C(b) ? Bb(e, b) : b;
    }
    function Eb(b) {
        var a = b[0];
        b = b[b.length - 1];
        if (a === b) return x(a);
        var c = [ a ];
        do {
            a = a.nextSibling;
            if (!a) break;
            c.push(a);
        } while (a !== b);
        return x(c);
    }
    function Zc(b) {
        var a = y("$injector"), c = y("ng");
        b = b.angular || (b.angular = {});
        b.$$minErr = b.$$minErr || y;
        return b.module || (b.module = function() {
            var b = {};
            return function(e, f, g) {
                if ("hasOwnProperty" === e) throw c("badname", "module");
                f && b.hasOwnProperty(e) && (b[e] = null);
                return b[e] || (b[e] = function() {
                    function b(a, d, e) {
                        return function() {
                            c[e || "push"]([ a, d, arguments ]);
                            return p;
                        };
                    }
                    if (!f) throw a("nomod", e);
                    var c = [], d = [], l = b("$injector", "invoke"), p = {
                        _invokeQueue: c,
                        _runBlocks: d,
                        requires: f,
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
                        config: l,
                        run: function(a) {
                            d.push(a);
                            return this;
                        }
                    };
                    g && l(g);
                    return p;
                }());
            };
        }());
    }
    function $c(b) {
        F(b, {
            bootstrap: fc,
            copy: Ha,
            extend: F,
            equals: za,
            element: x,
            forEach: q,
            injector: gc,
            noop: D,
            bind: Bb,
            toJson: ta,
            fromJson: cc,
            identity: Ga,
            isUndefined: v,
            isDefined: B,
            isString: z,
            isFunction: C,
            isObject: S,
            isNumber: Ab,
            isElement: Uc,
            isArray: I,
            version: ad,
            isDate: sa,
            lowercase: K,
            uppercase: Ia,
            callbacks: {
                counter: 0
            },
            $$minErr: y,
            $$csp: Va
        });
        Wa = Zc(P);
        try {
            Wa("ngLocale");
        } catch (a) {
            Wa("ngLocale", []).provider("$locale", bd);
        }
        Wa("ng", [ "ngLocale" ], [ "$provide", function(a) {
            a.provider({
                $$sanitizeUri: cd
            });
            a.provider("$compile", ic).directive({
                a: dd,
                input: jc,
                textarea: jc,
                form: ed,
                script: fd,
                select: gd,
                style: hd,
                option: id,
                ngBind: jd,
                ngBindHtml: kd,
                ngBindTemplate: ld,
                ngClass: md,
                ngClassEven: nd,
                ngClassOdd: od,
                ngCloak: pd,
                ngController: qd,
                ngForm: rd,
                ngHide: sd,
                ngIf: td,
                ngInclude: ud,
                ngInit: vd,
                ngNonBindable: wd,
                ngPluralize: xd,
                ngRepeat: yd,
                ngShow: zd,
                ngStyle: Ad,
                ngSwitch: Bd,
                ngSwitchWhen: Cd,
                ngSwitchDefault: Dd,
                ngOptions: Ed,
                ngTransclude: Fd,
                ngModel: Gd,
                ngList: Hd,
                ngChange: Id,
                required: kc,
                ngRequired: kc,
                ngValue: Jd
            }).directive({
                ngInclude: Kd
            }).directive(Fb).directive(lc);
            a.provider({
                $anchorScroll: Ld,
                $animate: Md,
                $browser: Nd,
                $cacheFactory: Od,
                $controller: Pd,
                $document: Qd,
                $exceptionHandler: Rd,
                $filter: mc,
                $interpolate: Sd,
                $interval: Td,
                $http: Ud,
                $httpBackend: Vd,
                $location: Wd,
                $log: Xd,
                $parse: Yd,
                $rootScope: Zd,
                $q: $d,
                $sce: ae,
                $sceDelegate: be,
                $sniffer: ce,
                $templateCache: de,
                $timeout: ee,
                $window: fe,
                $$rAF: ge,
                $$asyncCallback: he
            });
        } ]);
    }
    function Xa(b) {
        return b.replace(ie, function(a, b, d, e) {
            return e ? d.toUpperCase() : d;
        }).replace(je, "Moz$1");
    }
    function Gb(b, a, c, d) {
        function e(b) {
            var e = c && b ? [ this.filter(b) ] : [ this ], m = a, h, l, p, n, r, t;
            if (!d || null != b) for (;e.length; ) for (h = e.shift(), l = 0, p = h.length; l < p; l++) for (n = x(h[l]), 
            m ? n.triggerHandler("$destroy") : m = !m, r = 0, n = (t = n.children()).length; r < n; r++) e.push(Da(t[r]));
            return f.apply(this, arguments);
        }
        var f = Da.fn[b], f = f.$original || f;
        e.$original = f;
        Da.fn[b] = e;
    }
    function R(b) {
        if (b instanceof R) return b;
        z(b) && (b = aa(b));
        if (!(this instanceof R)) {
            if (z(b) && "<" != b.charAt(0)) throw Hb("nosel");
            return new R(b);
        }
        if (z(b)) {
            var a = b;
            b = W;
            var c;
            if (c = ke.exec(a)) b = [ b.createElement(c[1]) ]; else {
                var d = b, e;
                b = d.createDocumentFragment();
                c = [];
                if (Ib.test(a)) {
                    d = b.appendChild(d.createElement("div"));
                    e = (le.exec(a) || [ "", "" ])[1].toLowerCase();
                    e = ba[e] || ba._default;
                    d.innerHTML = "<div>&#160;</div>" + e[1] + a.replace(me, "<$1></$2>") + e[2];
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
            Jb(this, b);
            x(W.createDocumentFragment()).append(this);
        } else Jb(this, b);
    }
    function Kb(b) {
        return b.cloneNode(!0);
    }
    function Ja(b) {
        Lb(b);
        var a = 0;
        for (b = b.childNodes || []; a < b.length; a++) Ja(b[a]);
    }
    function nc(b, a, c, d) {
        if (B(d)) throw Hb("offargs");
        var e = la(b, "events");
        la(b, "handle") && (v(a) ? q(e, function(a, c) {
            Ya(b, c, a);
            delete e[c];
        }) : q(a.split(" "), function(a) {
            v(c) ? (Ya(b, a, e[a]), delete e[a]) : Qa(e[a] || [], c);
        }));
    }
    function Lb(b, a) {
        var c = b.ng339, d = Za[c];
        d && (a ? delete Za[c].data[a] : (d.handle && (d.events.$destroy && d.handle({}, "$destroy"), 
        nc(b)), delete Za[c], b.ng339 = s));
    }
    function la(b, a, c) {
        var d = b.ng339, d = Za[d || -1];
        if (B(c)) d || (b.ng339 = d = ++ne, d = Za[d] = {}), d[a] = c; else return d && d[a];
    }
    function Mb(b, a, c) {
        var d = la(b, "data"), e = B(c), f = !e && B(a), g = f && !S(a);
        d || g || la(b, "data", d = {});
        if (e) d[a] = c; else if (f) {
            if (g) return d && d[a];
            F(d, a);
        } else return d;
    }
    function Nb(b, a) {
        return b.getAttribute ? -1 < (" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + a + " ") : !1;
    }
    function kb(b, a) {
        a && b.setAttribute && q(a.split(" "), function(a) {
            b.setAttribute("class", aa((" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + aa(a) + " ", " ")));
        });
    }
    function lb(b, a) {
        if (a && b.setAttribute) {
            var c = (" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            q(a.split(" "), function(a) {
                a = aa(a);
                -1 === c.indexOf(" " + a + " ") && (c += a + " ");
            });
            b.setAttribute("class", aa(c));
        }
    }
    function Jb(b, a) {
        if (a) {
            a = a.nodeName || !B(a.length) || Fa(a) ? [ a ] : a;
            for (var c = 0; c < a.length; c++) b.push(a[c]);
        }
    }
    function oc(b, a) {
        return mb(b, "$" + (a || "ngController") + "Controller");
    }
    function mb(b, a, c) {
        9 == b.nodeType && (b = b.documentElement);
        for (a = I(a) ? a : [ a ]; b; ) {
            for (var d = 0, e = a.length; d < e; d++) if ((c = x.data(b, a[d])) !== s) return c;
            b = b.parentNode || 11 === b.nodeType && b.host;
        }
    }
    function pc(b) {
        for (var a = 0, c = b.childNodes; a < c.length; a++) Ja(c[a]);
        for (;b.firstChild; ) b.removeChild(b.firstChild);
    }
    function qc(b, a) {
        var c = nb[a.toLowerCase()];
        return c && rc[b.nodeName] && c;
    }
    function oe(b, a) {
        var c = function(c, e) {
            c.preventDefault || (c.preventDefault = function() {
                c.returnValue = !1;
            });
            c.stopPropagation || (c.stopPropagation = function() {
                c.cancelBubble = !0;
            });
            c.target || (c.target = c.srcElement || W);
            if (v(c.defaultPrevented)) {
                var f = c.preventDefault;
                c.preventDefault = function() {
                    c.defaultPrevented = !0;
                    f.call(c);
                };
                c.defaultPrevented = !1;
            }
            c.isDefaultPrevented = function() {
                return c.defaultPrevented || !1 === c.returnValue;
            };
            var g = ga(a[e || c.type] || []);
            q(g, function(a) {
                a.call(b, c);
            });
            8 >= Q ? (c.preventDefault = null, c.stopPropagation = null, c.isDefaultPrevented = null) : (delete c.preventDefault, 
            delete c.stopPropagation, delete c.isDefaultPrevented);
        };
        c.elem = b;
        return c;
    }
    function Ka(b, a) {
        var c = typeof b, d;
        "function" == c || "object" == c && null !== b ? "function" == typeof (d = b.$$hashKey) ? d = b.$$hashKey() : d === s && (d = b.$$hashKey = (a || fb)()) : d = b;
        return c + ":" + d;
    }
    function $a(b, a) {
        if (a) {
            var c = 0;
            this.nextUid = function() {
                return ++c;
            };
        }
        q(b, this.put, this);
    }
    function sc(b) {
        var a, c;
        "function" === typeof b ? (a = b.$inject) || (a = [], b.length && (c = b.toString().replace(pe, ""), 
        c = c.match(qe), q(c[1].split(re), function(b) {
            b.replace(se, function(b, c, d) {
                a.push(d);
            });
        })), b.$inject = a) : I(b) ? (c = b.length - 1, Ua(b[c], "fn"), a = b.slice(0, c)) : Ua(b, "fn", !0);
        return a;
    }
    function gc(b) {
        function a(a) {
            return function(b, c) {
                if (S(b)) q(b, $b(a)); else return a(b, c);
            };
        }
        function c(a, b) {
            Ca(a, "service");
            if (C(b) || I(b)) b = p.instantiate(b);
            if (!b.$get) throw ab("pget", a);
            return l[a + k] = b;
        }
        function d(a, b) {
            return c(a, {
                $get: b
            });
        }
        function e(a) {
            var b = [], c, d, f, k;
            q(a, function(a) {
                if (!h.get(a)) {
                    h.put(a, !0);
                    try {
                        if (z(a)) for (c = Wa(a), b = b.concat(e(c.requires)).concat(c._runBlocks), d = c._invokeQueue, 
                        f = 0, k = d.length; f < k; f++) {
                            var g = d[f], m = p.get(g[0]);
                            m[g[1]].apply(m, g[2]);
                        } else C(a) ? b.push(p.invoke(a)) : I(a) ? b.push(p.invoke(a)) : Ua(a, "module");
                    } catch (l) {
                        throw I(a) && (a = a[a.length - 1]), l.message && (l.stack && -1 == l.stack.indexOf(l.message)) && (l = l.message + "\n" + l.stack), 
                        ab("modulerr", a, l.stack || l.message || l);
                    }
                }
            });
            return b;
        }
        function f(a, b) {
            function c(d) {
                if (a.hasOwnProperty(d)) {
                    if (a[d] === g) throw ab("cdep", d + " <- " + m.join(" <- "));
                    return a[d];
                }
                try {
                    return m.unshift(d), a[d] = g, a[d] = b(d);
                } catch (e) {
                    throw a[d] === g && delete a[d], e;
                } finally {
                    m.shift();
                }
            }
            function d(a, b, e) {
                var f = [], k = sc(a), g, m, h;
                m = 0;
                for (g = k.length; m < g; m++) {
                    h = k[m];
                    if ("string" !== typeof h) throw ab("itkn", h);
                    f.push(e && e.hasOwnProperty(h) ? e[h] : c(h));
                }
                I(a) && (a = a[g]);
                return a.apply(b, f);
            }
            return {
                invoke: d,
                instantiate: function(a, b) {
                    var c = function() {}, e;
                    c.prototype = (I(a) ? a[a.length - 1] : a).prototype;
                    c = new c();
                    e = d(a, c, b);
                    return S(e) || C(e) ? e : c;
                },
                get: c,
                annotate: sc,
                has: function(b) {
                    return l.hasOwnProperty(b + k) || a.hasOwnProperty(b);
                }
            };
        }
        var g = {}, k = "Provider", m = [], h = new $a([], !0), l = {
            $provide: {
                provider: a(c),
                factory: a(d),
                service: a(function(a, b) {
                    return d(a, [ "$injector", function(a) {
                        return a.instantiate(b);
                    } ]);
                }),
                value: a(function(a, b) {
                    return d(a, $(b));
                }),
                constant: a(function(a, b) {
                    Ca(a, "constant");
                    l[a] = b;
                    n[a] = b;
                }),
                decorator: function(a, b) {
                    var c = p.get(a + k), d = c.$get;
                    c.$get = function() {
                        var a = r.invoke(d, c);
                        return r.invoke(b, null, {
                            $delegate: a
                        });
                    };
                }
            }
        }, p = l.$injector = f(l, function() {
            throw ab("unpr", m.join(" <- "));
        }), n = {}, r = n.$injector = f(n, function(a) {
            a = p.get(a + k);
            return r.invoke(a.$get, a);
        });
        q(e(b), function(a) {
            r.invoke(a || D);
        });
        return r;
    }
    function Ld() {
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
            function f() {
                var b = c.hash(), d;
                b ? (d = g.getElementById(b)) ? d.scrollIntoView() : (d = e(g.getElementsByName(b))) ? d.scrollIntoView() : "top" === b && a.scrollTo(0, 0) : a.scrollTo(0, 0);
            }
            var g = a.document;
            b && d.$watch(function() {
                return c.hash();
            }, function() {
                d.$evalAsync(f);
            });
            return f;
        } ];
    }
    function he() {
        this.$get = [ "$$rAF", "$timeout", function(b, a) {
            return b.supported ? function(a) {
                return b(a);
            } : function(b) {
                return a(b, 0, !1);
            };
        } ];
    }
    function te(b, a, c, d) {
        function e(a) {
            try {
                a.apply(null, Aa.call(arguments, 1));
            } finally {
                if (t--, 0 === t) for (;L.length; ) try {
                    L.pop()();
                } catch (b) {
                    c.error(b);
                }
            }
        }
        function f(a, b) {
            (function ca() {
                q(w, function(a) {
                    a();
                });
                u = b(ca, a);
            })();
        }
        function g() {
            A = null;
            M != k.url() && (M = k.url(), q(da, function(a) {
                a(k.url());
            }));
        }
        var k = this, m = a[0], h = b.location, l = b.history, p = b.setTimeout, n = b.clearTimeout, r = {};
        k.isMock = !1;
        var t = 0, L = [];
        k.$$completeOutstandingRequest = e;
        k.$$incOutstandingRequestCount = function() {
            t++;
        };
        k.notifyWhenNoOutstandingRequests = function(a) {
            q(w, function(a) {
                a();
            });
            0 === t ? a() : L.push(a);
        };
        var w = [], u;
        k.addPollFn = function(a) {
            v(u) && f(100, p);
            w.push(a);
            return a;
        };
        var M = h.href, X = a.find("base"), A = null;
        k.url = function(a, c) {
            h !== b.location && (h = b.location);
            l !== b.history && (l = b.history);
            if (a) {
                if (M != a) return M = a, d.history ? c ? l.replaceState(null, "", a) : (l.pushState(null, "", a), 
                X.attr("href", X.attr("href"))) : (A = a, c ? h.replace(a) : h.href = a), k;
            } else return A || h.href.replace(/%27/g, "'");
        };
        var da = [], J = !1;
        k.onUrlChange = function(a) {
            if (!J) {
                if (d.history) x(b).on("popstate", g);
                if (d.hashchange) x(b).on("hashchange", g); else k.addPollFn(g);
                J = !0;
            }
            da.push(a);
            return a;
        };
        k.baseHref = function() {
            var a = X.attr("href");
            return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : "";
        };
        var T = {}, ea = "", O = k.baseHref();
        k.cookies = function(a, b) {
            var d, e, f, k;
            if (a) b === s ? m.cookie = escape(a) + "=;path=" + O + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : z(b) && (d = (m.cookie = escape(a) + "=" + escape(b) + ";path=" + O).length + 1, 
            4096 < d && c.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + d + " > 4096 bytes)!")); else {
                if (m.cookie !== ea) for (ea = m.cookie, d = ea.split("; "), T = {}, f = 0; f < d.length; f++) e = d[f], 
                k = e.indexOf("="), 0 < k && (a = unescape(e.substring(0, k)), T[a] === s && (T[a] = unescape(e.substring(k + 1))));
                return T;
            }
        };
        k.defer = function(a, b) {
            var c;
            t++;
            c = p(function() {
                delete r[c];
                e(a);
            }, b || 0);
            r[c] = !0;
            return c;
        };
        k.defer.cancel = function(a) {
            return r[a] ? (delete r[a], n(a), e(D), !0) : !1;
        };
    }
    function Nd() {
        this.$get = [ "$window", "$log", "$sniffer", "$document", function(b, a, c, d) {
            return new te(b, d, a, c);
        } ];
    }
    function Od() {
        this.$get = function() {
            function b(b, d) {
                function e(a) {
                    a != p && (n ? n == a && (n = a.n) : n = a, f(a.n, a.p), f(a, p), p = a, p.n = null);
                }
                function f(a, b) {
                    a != b && (a && (a.p = b), b && (b.n = a));
                }
                if (b in a) throw y("$cacheFactory")("iid", b);
                var g = 0, k = F({}, d, {
                    id: b
                }), m = {}, h = d && d.capacity || Number.MAX_VALUE, l = {}, p = null, n = null;
                return a[b] = {
                    put: function(a, b) {
                        if (h < Number.MAX_VALUE) {
                            var c = l[a] || (l[a] = {
                                key: a
                            });
                            e(c);
                        }
                        if (!v(b)) return a in m || g++, m[a] = b, g > h && this.remove(n.key), b;
                    },
                    get: function(a) {
                        if (h < Number.MAX_VALUE) {
                            var b = l[a];
                            if (!b) return;
                            e(b);
                        }
                        return m[a];
                    },
                    remove: function(a) {
                        if (h < Number.MAX_VALUE) {
                            var b = l[a];
                            if (!b) return;
                            b == p && (p = b.p);
                            b == n && (n = b.n);
                            f(b.n, b.p);
                            delete l[a];
                        }
                        delete m[a];
                        g--;
                    },
                    removeAll: function() {
                        m = {};
                        g = 0;
                        l = {};
                        p = n = null;
                    },
                    destroy: function() {
                        l = k = m = null;
                        delete a[b];
                    },
                    info: function() {
                        return F({}, k, {
                            size: g
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
    function de() {
        this.$get = [ "$cacheFactory", function(b) {
            return b("templates");
        } ];
    }
    function ic(b, a) {
        var c = {}, d = "Directive", e = /^\s*directive\:\s*([\d\w_\-]+)\s+(.*)$/, f = /(([\d\w_\-]+)(?:\:([^;]+))?;?)/, g = /^(on[a-z]+|formaction)$/;
        this.directive = function m(a, e) {
            Ca(a, "directive");
            z(a) ? (Db(e, "directiveFactory"), c.hasOwnProperty(a) || (c[a] = [], b.factory(a + d, [ "$injector", "$exceptionHandler", function(b, d) {
                var e = [];
                q(c[a], function(c, f) {
                    try {
                        var g = b.invoke(c);
                        C(g) ? g = {
                            compile: $(g)
                        } : !g.compile && g.link && (g.compile = $(g.link));
                        g.priority = g.priority || 0;
                        g.index = f;
                        g.name = g.name || a;
                        g.require = g.require || g.controller && g.name;
                        g.restrict = g.restrict || "A";
                        e.push(g);
                    } catch (m) {
                        d(m);
                    }
                });
                return e;
            } ])), c[a].push(e)) : q(a, $b(m));
            return this;
        };
        this.aHrefSanitizationWhitelist = function(b) {
            return B(b) ? (a.aHrefSanitizationWhitelist(b), this) : a.aHrefSanitizationWhitelist();
        };
        this.imgSrcSanitizationWhitelist = function(b) {
            return B(b) ? (a.imgSrcSanitizationWhitelist(b), this) : a.imgSrcSanitizationWhitelist();
        };
        this.$get = [ "$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function(a, b, l, p, n, r, t, L, w, u, M, X) {
            function A(a, b, c, d, e) {
                a instanceof x || (a = x(a));
                q(a, function(b, c) {
                    3 == b.nodeType && b.nodeValue.match(/\S+/) && (a[c] = x(b).wrap("<span></span>").parent()[0]);
                });
                var f = J(a, b, a, c, d, e);
                da(a, "ng-scope");
                return function(b, c, d, e) {
                    Db(b, "scope");
                    var g = c ? La.clone.call(a) : a;
                    q(d, function(a, b) {
                        g.data("$" + b + "Controller", a);
                    });
                    d = 0;
                    for (var m = g.length; d < m; d++) {
                        var h = g[d].nodeType;
                        1 !== h && 9 !== h || g.eq(d).data("$scope", b);
                    }
                    c && c(g, b);
                    f && f(b, g, g, e);
                    return g;
                };
            }
            function da(a, b) {
                try {
                    a.addClass(b);
                } catch (c) {}
            }
            function J(a, b, c, d, e, f) {
                function g(a, c, d, e) {
                    var f, h, l, r, p, n, t;
                    f = c.length;
                    var w = Array(f);
                    for (r = 0; r < f; r++) w[r] = c[r];
                    n = r = 0;
                    for (p = m.length; r < p; n++) h = w[n], c = m[r++], f = m[r++], c ? (c.scope ? (l = a.$new(), 
                    x.data(h, "$scope", l)) : l = a, t = c.transcludeOnThisElement ? T(a, c.transclude, e) : !c.templateOnThisElement && e ? e : !e && b ? T(a, b) : null, 
                    c(f, l, h, d, t)) : f && f(a, h.childNodes, s, e);
                }
                for (var m = [], h, l, r, p, n = 0; n < a.length; n++) h = new Ob(), l = ea(a[n], [], h, 0 === n ? d : s, e), 
                (f = l.length ? H(l, a[n], h, b, c, null, [], [], f) : null) && f.scope && da(h.$$element, "ng-scope"), 
                h = f && f.terminal || !(r = a[n].childNodes) || !r.length ? null : J(r, f ? (f.transcludeOnThisElement || !f.templateOnThisElement) && f.transclude : b), 
                m.push(f, h), p = p || f || h, f = null;
                return p ? g : null;
            }
            function T(a, b, c) {
                return function(d, e, f) {
                    var g = !1;
                    d || (d = a.$new(), g = d.$$transcluded = !0);
                    e = b(d, e, f, c);
                    if (g) e.on("$destroy", function() {
                        d.$destroy();
                    });
                    return e;
                };
            }
            function ea(a, b, c, d, g) {
                var h = c.$attr, m;
                switch (a.nodeType) {
                  case 1:
                    ca(b, ma(Ma(a).toLowerCase()), "E", d, g);
                    for (var l, r, p, n = a.attributes, t = 0, w = n && n.length; t < w; t++) {
                        var L = !1, M = !1;
                        l = n[t];
                        if (!Q || 8 <= Q || l.specified) {
                            m = l.name;
                            r = aa(l.value);
                            l = ma(m);
                            if (p = V.test(l)) m = jb(l.substr(6), "-");
                            var u = l.replace(/(Start|End)$/, "");
                            l === u + "Start" && (L = m, M = m.substr(0, m.length - 5) + "end", m = m.substr(0, m.length - 6));
                            l = ma(m.toLowerCase());
                            h[l] = m;
                            if (p || !c.hasOwnProperty(l)) c[l] = r, qc(a, l) && (c[l] = !0);
                            P(a, b, r, l);
                            ca(b, l, "A", d, g, L, M);
                        }
                    }
                    a = a.className;
                    if (z(a) && "" !== a) for (;m = f.exec(a); ) l = ma(m[2]), ca(b, l, "C", d, g) && (c[l] = aa(m[3])), 
                    a = a.substr(m.index + m[0].length);
                    break;

                  case 3:
                    y(b, a.nodeValue);
                    break;

                  case 8:
                    try {
                        if (m = e.exec(a.nodeValue)) l = ma(m[1]), ca(b, l, "M", d, g) && (c[l] = aa(m[2]));
                    } catch (A) {}
                }
                b.sort(v);
                return b;
            }
            function O(a, b, c) {
                var d = [], e = 0;
                if (b && a.hasAttribute && a.hasAttribute(b)) {
                    do {
                        if (!a) throw ia("uterdir", b, c);
                        1 == a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--);
                        d.push(a);
                        a = a.nextSibling;
                    } while (0 < e);
                } else d.push(a);
                return x(d);
            }
            function E(a, b, c) {
                return function(d, e, f, g, m) {
                    e = O(e[0], b, c);
                    return a(d, e, f, g, m);
                };
            }
            function H(a, c, d, e, f, g, m, p, n) {
                function w(a, b, c, d) {
                    if (a) {
                        c && (a = E(a, c, d));
                        a.require = G.require;
                        a.directiveName = na;
                        if (J === G || G.$$isolateScope) a = tc(a, {
                            isolateScope: !0
                        });
                        m.push(a);
                    }
                    if (b) {
                        c && (b = E(b, c, d));
                        b.require = G.require;
                        b.directiveName = na;
                        if (J === G || G.$$isolateScope) b = tc(b, {
                            isolateScope: !0
                        });
                        p.push(b);
                    }
                }
                function L(a, b, c, d) {
                    var e, f = "data", g = !1;
                    if (z(b)) {
                        for (;"^" == (e = b.charAt(0)) || "?" == e; ) b = b.substr(1), "^" == e && (f = "inheritedData"), 
                        g = g || "?" == e;
                        e = null;
                        d && "data" === f && (e = d[b]);
                        e = e || c[f]("$" + b + "Controller");
                        if (!e && !g) throw ia("ctreq", b, a);
                    } else I(b) && (e = [], q(b, function(b) {
                        e.push(L(a, b, c, d));
                    }));
                    return e;
                }
                function M(a, e, f, g, n) {
                    function w(a, b) {
                        var c;
                        2 > arguments.length && (b = a, a = s);
                        Ea && (c = ea);
                        return n(a, b, c);
                    }
                    var u, N, A, E, T, O, ea = {}, pb;
                    u = c === f ? d : ga(d, new Ob(x(f), d.$attr));
                    N = u.$$element;
                    if (J) {
                        var ca = /^\s*([@=&])(\??)\s*(\w*)\s*$/;
                        O = e.$new(!0);
                        !H || H !== J && H !== J.$$originalDirective ? N.data("$isolateScopeNoTemplate", O) : N.data("$isolateScope", O);
                        da(N, "ng-isolate-scope");
                        q(J.scope, function(a, c) {
                            var d = a.match(ca) || [], f = d[3] || c, g = "?" == d[2], d = d[1], m, l, p, n;
                            O.$$isolateBindings[c] = d + f;
                            switch (d) {
                              case "@":
                                u.$observe(f, function(a) {
                                    O[c] = a;
                                });
                                u.$$observers[f].$$scope = e;
                                u[f] && (O[c] = b(u[f])(e));
                                break;

                              case "=":
                                if (g && !u[f]) break;
                                l = r(u[f]);
                                n = l.literal ? za : function(a, b) {
                                    return a === b;
                                };
                                p = l.assign || function() {
                                    m = O[c] = l(e);
                                    throw ia("nonassign", u[f], J.name);
                                };
                                m = O[c] = l(e);
                                O.$watch(function() {
                                    var a = l(e);
                                    n(a, O[c]) || (n(a, m) ? p(e, a = O[c]) : O[c] = a);
                                    return m = a;
                                }, null, l.literal);
                                break;

                              case "&":
                                l = r(u[f]);
                                O[c] = function(a) {
                                    return l(e, a);
                                };
                                break;

                              default:
                                throw ia("iscp", J.name, c, a);
                            }
                        });
                    }
                    pb = n && w;
                    X && q(X, function(a) {
                        var b = {
                            $scope: a === J || a.$$isolateScope ? O : e,
                            $element: N,
                            $attrs: u,
                            $transclude: pb
                        }, c;
                        T = a.controller;
                        "@" == T && (T = u[a.name]);
                        c = t(T, b);
                        ea[a.name] = c;
                        Ea || N.data("$" + a.name + "Controller", c);
                        a.controllerAs && (b.$scope[a.controllerAs] = c);
                    });
                    g = 0;
                    for (A = m.length; g < A; g++) try {
                        E = m[g], E(E.isolateScope ? O : e, N, u, E.require && L(E.directiveName, E.require, N, ea), pb);
                    } catch (ob) {
                        l(ob, ha(N));
                    }
                    g = e;
                    J && (J.template || null === J.templateUrl) && (g = O);
                    a && a(g, f.childNodes, s, n);
                    for (g = p.length - 1; 0 <= g; g--) try {
                        E = p[g], E(E.isolateScope ? O : e, N, u, E.require && L(E.directiveName, E.require, N, ea), pb);
                    } catch (G) {
                        l(G, ha(N));
                    }
                }
                n = n || {};
                for (var u = -Number.MAX_VALUE, T, X = n.controllerDirectives, J = n.newIsolateScopeDirective, H = n.templateDirective, ca = n.nonTlbTranscludeDirective, v = !1, F = !1, Ea = n.hasElementTranscludeDirective, y = d.$$element = x(c), G, na, U, R = e, Q, P = 0, oa = a.length; P < oa; P++) {
                    G = a[P];
                    var V = G.$$start, Y = G.$$end;
                    V && (y = O(c, V, Y));
                    U = s;
                    if (u > G.priority) break;
                    if (U = G.scope) T = T || G, G.templateUrl || (K("new/isolated scope", J, G, y), 
                    S(U) && (J = G));
                    na = G.name;
                    !G.templateUrl && G.controller && (U = G.controller, X = X || {}, K("'" + na + "' controller", X[na], G, y), 
                    X[na] = G);
                    if (U = G.transclude) v = !0, G.$$tlb || (K("transclusion", ca, G, y), ca = G), 
                    "element" == U ? (Ea = !0, u = G.priority, U = y, y = d.$$element = x(W.createComment(" " + na + ": " + d[na] + " ")), 
                    c = y[0], qb(f, Aa.call(U, 0), c), R = A(U, e, u, g && g.name, {
                        nonTlbTranscludeDirective: ca
                    })) : (U = x(Kb(c)).contents(), y.empty(), R = A(U, e));
                    if (G.template) if (F = !0, K("template", H, G, y), H = G, U = C(G.template) ? G.template(y, d) : G.template, 
                    U = Z(U), G.replace) {
                        g = G;
                        U = Ib.test(U) ? x(aa(U)) : [];
                        c = U[0];
                        if (1 != U.length || 1 !== c.nodeType) throw ia("tplrt", na, "");
                        qb(f, y, c);
                        oa = {
                            $attr: {}
                        };
                        U = ea(c, [], oa);
                        var $ = a.splice(P + 1, a.length - (P + 1));
                        J && ob(U);
                        a = a.concat(U).concat($);
                        B(d, oa);
                        oa = a.length;
                    } else y.html(U);
                    if (G.templateUrl) F = !0, K("template", H, G, y), H = G, G.replace && (g = G), 
                    M = D(a.splice(P, a.length - P), y, d, f, v && R, m, p, {
                        controllerDirectives: X,
                        newIsolateScopeDirective: J,
                        templateDirective: H,
                        nonTlbTranscludeDirective: ca
                    }), oa = a.length; else if (G.compile) try {
                        Q = G.compile(y, d, R), C(Q) ? w(null, Q, V, Y) : Q && w(Q.pre, Q.post, V, Y);
                    } catch (ba) {
                        l(ba, ha(y));
                    }
                    G.terminal && (M.terminal = !0, u = Math.max(u, G.priority));
                }
                M.scope = T && !0 === T.scope;
                M.transcludeOnThisElement = v;
                M.templateOnThisElement = F;
                M.transclude = R;
                n.hasElementTranscludeDirective = Ea;
                return M;
            }
            function ob(a) {
                for (var b = 0, c = a.length; b < c; b++) a[b] = bc(a[b], {
                    $$isolateScope: !0
                });
            }
            function ca(b, e, f, g, h, r, p) {
                if (e === h) return null;
                h = null;
                if (c.hasOwnProperty(e)) {
                    var n;
                    e = a.get(e + d);
                    for (var t = 0, w = e.length; t < w; t++) try {
                        n = e[t], (g === s || g > n.priority) && -1 != n.restrict.indexOf(f) && (r && (n = bc(n, {
                            $$start: r,
                            $$end: p
                        })), b.push(n), h = n);
                    } catch (L) {
                        l(L);
                    }
                }
                return h;
            }
            function B(a, b) {
                var c = b.$attr, d = a.$attr, e = a.$$element;
                q(a, function(d, e) {
                    "$" != e.charAt(0) && (b[e] && b[e] !== d && (d += ("style" === e ? ";" : " ") + b[e]), 
                    a.$set(e, d, !0, c[e]));
                });
                q(b, function(b, f) {
                    "class" == f ? (da(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), 
                    a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, 
                    d[f] = c[f]);
                });
            }
            function D(a, b, c, d, e, f, g, m) {
                var h = [], l, r, t = b[0], w = a.shift(), L = F({}, w, {
                    templateUrl: null,
                    transclude: null,
                    replace: null,
                    $$originalDirective: w
                }), M = C(w.templateUrl) ? w.templateUrl(b, c) : w.templateUrl;
                b.empty();
                p.get(u.getTrustedResourceUrl(M), {
                    cache: n
                }).success(function(p) {
                    var n, u;
                    p = Z(p);
                    if (w.replace) {
                        p = Ib.test(p) ? x(aa(p)) : [];
                        n = p[0];
                        if (1 != p.length || 1 !== n.nodeType) throw ia("tplrt", w.name, M);
                        p = {
                            $attr: {}
                        };
                        qb(d, b, n);
                        var A = ea(n, [], p);
                        S(w.scope) && ob(A);
                        a = A.concat(a);
                        B(c, p);
                    } else n = t, b.html(p);
                    a.unshift(L);
                    l = H(a, n, c, e, b, w, f, g, m);
                    q(d, function(a, c) {
                        a == n && (d[c] = b[0]);
                    });
                    for (r = J(b[0].childNodes, e); h.length; ) {
                        p = h.shift();
                        u = h.shift();
                        var E = h.shift(), X = h.shift(), A = b[0];
                        if (u !== t) {
                            var O = u.className;
                            m.hasElementTranscludeDirective && w.replace || (A = Kb(n));
                            qb(E, x(u), A);
                            da(x(A), O);
                        }
                        u = l.transcludeOnThisElement ? T(p, l.transclude, X) : X;
                        l(r, p, A, d, u);
                    }
                    h = null;
                }).error(function(a, b, c, d) {
                    throw ia("tpload", d.url);
                });
                return function(a, b, c, d, e) {
                    a = e;
                    h ? (h.push(b), h.push(c), h.push(d), h.push(a)) : (l.transcludeOnThisElement && (a = T(b, l.transclude, e)), 
                    l(r, b, c, d, a));
                };
            }
            function v(a, b) {
                var c = b.priority - a.priority;
                return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index;
            }
            function K(a, b, c, d) {
                if (b) throw ia("multidir", b.name, c.name, a, ha(d));
            }
            function y(a, c) {
                var d = b(c, !0);
                d && a.push({
                    priority: 0,
                    compile: function(a) {
                        var b = a.parent().length;
                        b && da(a.parent(), "ng-binding");
                        return function(a, c) {
                            var e = c.parent(), f = e.data("$binding") || [];
                            f.push(d);
                            e.data("$binding", f);
                            b || da(e, "ng-binding");
                            a.$watch(d, function(a) {
                                c[0].nodeValue = a;
                            });
                        };
                    }
                });
            }
            function R(a, b) {
                if ("srcdoc" == b) return u.HTML;
                var c = Ma(a);
                if ("xlinkHref" == b || "FORM" == c && "action" == b || "IMG" != c && ("src" == b || "ngSrc" == b)) return u.RESOURCE_URL;
            }
            function P(a, c, d, e) {
                var f = b(d, !0);
                if (f) {
                    if ("multiple" === e && "SELECT" === Ma(a)) throw ia("selmulti", ha(a));
                    c.push({
                        priority: 100,
                        compile: function() {
                            return {
                                pre: function(c, d, m) {
                                    d = m.$$observers || (m.$$observers = {});
                                    if (g.test(e)) throw ia("nodomevents");
                                    if (f = b(m[e], !0, R(a, e))) m[e] = f(c), (d[e] || (d[e] = [])).$$inter = !0, (m.$$observers && m.$$observers[e].$$scope || c).$watch(f, function(a, b) {
                                        "class" === e && a != b ? m.$updateClass(a, b) : m.$set(e, a);
                                    });
                                }
                            };
                        }
                    });
                }
            }
            function qb(a, b, c) {
                var d = b[0], e = b.length, f = d.parentNode, g, m;
                if (a) for (g = 0, m = a.length; g < m; g++) if (a[g] == d) {
                    a[g++] = c;
                    m = g + e - 1;
                    for (var h = a.length; g < h; g++, m++) m < h ? a[g] = a[m] : delete a[g];
                    a.length -= e - 1;
                    break;
                }
                f && f.replaceChild(c, d);
                a = W.createDocumentFragment();
                a.appendChild(d);
                c[x.expando] = d[x.expando];
                d = 1;
                for (e = b.length; d < e; d++) f = b[d], x(f).remove(), a.appendChild(f), delete b[d];
                b[0] = c;
                b.length = 1;
            }
            function tc(a, b) {
                return F(function() {
                    return a.apply(null, arguments);
                }, a, b);
            }
            var Ob = function(a, b) {
                this.$$element = a;
                this.$attr = b || {};
            };
            Ob.prototype = {
                $normalize: ma,
                $addClass: function(a) {
                    a && 0 < a.length && M.addClass(this.$$element, a);
                },
                $removeClass: function(a) {
                    a && 0 < a.length && M.removeClass(this.$$element, a);
                },
                $updateClass: function(a, b) {
                    var c = uc(a, b), d = uc(b, a);
                    0 === c.length ? M.removeClass(this.$$element, d) : 0 === d.length ? M.addClass(this.$$element, c) : M.setClass(this.$$element, c, d);
                },
                $set: function(a, b, c, d) {
                    var e = qc(this.$$element[0], a);
                    e && (this.$$element.prop(a, b), d = e);
                    this[a] = b;
                    d ? this.$attr[a] = d : (d = this.$attr[a]) || (this.$attr[a] = d = jb(a, "-"));
                    e = Ma(this.$$element);
                    if ("A" === e && "href" === a || "IMG" === e && "src" === a) this[a] = b = X(b, "src" === a);
                    !1 !== c && (null === b || b === s ? this.$$element.removeAttr(d) : this.$$element.attr(d, b));
                    (c = this.$$observers) && q(c[a], function(a) {
                        try {
                            a(b);
                        } catch (c) {
                            l(c);
                        }
                    });
                },
                $observe: function(a, b) {
                    var c = this, d = c.$$observers || (c.$$observers = {}), e = d[a] || (d[a] = []);
                    e.push(b);
                    L.$evalAsync(function() {
                        e.$$inter || b(c[a]);
                    });
                    return b;
                }
            };
            var Ea = b.startSymbol(), oa = b.endSymbol(), Z = "{{" == Ea || "}}" == oa ? Ga : function(a) {
                return a.replace(/\{\{/g, Ea).replace(/}}/g, oa);
            }, V = /^ngAttr[A-Z]/;
            return A;
        } ];
    }
    function ma(b) {
        return Xa(b.replace(ue, ""));
    }
    function uc(b, a) {
        var c = "", d = b.split(/\s+/), e = a.split(/\s+/), f = 0;
        a: for (;f < d.length; f++) {
            for (var g = d[f], k = 0; k < e.length; k++) if (g == e[k]) continue a;
            c += (0 < c.length ? " " : "") + g;
        }
        return c;
    }
    function Pd() {
        var b = {}, a = /^(\S+)(\s+as\s+(\w+))?$/;
        this.register = function(a, d) {
            Ca(a, "controller");
            S(a) ? F(b, a) : b[a] = d;
        };
        this.$get = [ "$injector", "$window", function(c, d) {
            return function(e, f) {
                var g, k, m;
                z(e) && (g = e.match(a), k = g[1], m = g[3], e = b.hasOwnProperty(k) ? b[k] : hc(f.$scope, k, !0) || hc(d, k, !0), 
                Ua(e, k, !0));
                g = c.instantiate(e, f);
                if (m) {
                    if (!f || "object" !== typeof f.$scope) throw y("$controller")("noscp", k || e.name, m);
                    f.$scope[m] = g;
                }
                return g;
            };
        } ];
    }
    function Qd() {
        this.$get = [ "$window", function(b) {
            return x(b.document);
        } ];
    }
    function Rd() {
        this.$get = [ "$log", function(b) {
            return function(a, c) {
                b.error.apply(b, arguments);
            };
        } ];
    }
    function vc(b) {
        var a = {}, c, d, e;
        if (!b) return a;
        q(b.split("\n"), function(b) {
            e = b.indexOf(":");
            c = K(aa(b.substr(0, e)));
            d = aa(b.substr(e + 1));
            c && (a[c] = a[c] ? a[c] + ", " + d : d);
        });
        return a;
    }
    function wc(b) {
        var a = S(b) ? b : s;
        return function(c) {
            a || (a = vc(b));
            return c ? a[K(c)] || null : a;
        };
    }
    function xc(b, a, c) {
        if (C(c)) return c(b, a);
        q(c, function(c) {
            b = c(b, a);
        });
        return b;
    }
    function Ud() {
        var b = /^\s*(\[|\{[^\{])/, a = /[\}\]]\s*$/, c = /^\)\]\}',?\n/, d = {
            "Content-Type": "application/json;charset=utf-8"
        }, e = this.defaults = {
            transformResponse: [ function(d) {
                z(d) && (d = d.replace(c, ""), b.test(d) && a.test(d) && (d = cc(d)));
                return d;
            } ],
            transformRequest: [ function(a) {
                return S(a) && "[object File]" !== ya.call(a) && "[object Blob]" !== ya.call(a) ? ta(a) : a;
            } ],
            headers: {
                common: {
                    Accept: "application/json, text/plain, */*"
                },
                post: ga(d),
                put: ga(d),
                patch: ga(d)
            },
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN"
        }, f = this.interceptors = [], g = this.responseInterceptors = [];
        this.$get = [ "$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function(a, b, c, d, p, n) {
            function r(a) {
                function b(a) {
                    var d = F({}, a, {
                        data: xc(a.data, a.headers, c.transformResponse)
                    });
                    return 200 <= a.status && 300 > a.status ? d : p.reject(d);
                }
                var c = {
                    method: "get",
                    transformRequest: e.transformRequest,
                    transformResponse: e.transformResponse
                }, d = function(a) {
                    var b = e.headers, c = F({}, a.headers), d, f, b = F({}, b.common, b[K(a.method)]);
                    a: for (d in b) {
                        a = K(d);
                        for (f in c) if (K(f) === a) continue a;
                        c[d] = b[d];
                    }
                    (function(a) {
                        var b;
                        q(a, function(c, d) {
                            C(c) && (b = c(), null != b ? a[d] = b : delete a[d]);
                        });
                    })(c);
                    return c;
                }(a);
                F(c, a);
                c.headers = d;
                c.method = Ia(c.method);
                var f = [ function(a) {
                    d = a.headers;
                    var c = xc(a.data, wc(d), a.transformRequest);
                    v(c) && q(d, function(a, b) {
                        "content-type" === K(b) && delete d[b];
                    });
                    v(a.withCredentials) && !v(e.withCredentials) && (a.withCredentials = e.withCredentials);
                    return t(a, c, d).then(b, b);
                }, s ], g = p.when(c);
                for (q(u, function(a) {
                    (a.request || a.requestError) && f.unshift(a.request, a.requestError);
                    (a.response || a.responseError) && f.push(a.response, a.responseError);
                }); f.length; ) {
                    a = f.shift();
                    var m = f.shift(), g = g.then(a, m);
                }
                g.success = function(a) {
                    g.then(function(b) {
                        a(b.data, b.status, b.headers, c);
                    });
                    return g;
                };
                g.error = function(a) {
                    g.then(null, function(b) {
                        a(b.data, b.status, b.headers, c);
                    });
                    return g;
                };
                return g;
            }
            function t(c, f, g) {
                function h(a, b, c, e) {
                    E && (200 <= a && 300 > a ? E.put(x, [ a, b, vc(c), e ]) : E.remove(x));
                    n(b, a, c, e);
                    d.$$phase || d.$apply();
                }
                function n(a, b, d, e) {
                    b = Math.max(b, 0);
                    (200 <= b && 300 > b ? u.resolve : u.reject)({
                        data: a,
                        status: b,
                        headers: wc(d),
                        config: c,
                        statusText: e
                    });
                }
                function t() {
                    var a = Pa(r.pendingRequests, c);
                    -1 !== a && r.pendingRequests.splice(a, 1);
                }
                var u = p.defer(), q = u.promise, E, H, x = L(c.url, c.params);
                r.pendingRequests.push(c);
                q.then(t, t);
                (c.cache || e.cache) && (!1 !== c.cache && "GET" == c.method) && (E = S(c.cache) ? c.cache : S(e.cache) ? e.cache : w);
                if (E) if (H = E.get(x), B(H)) {
                    if (H && C(H.then)) return H.then(t, t), H;
                    I(H) ? n(H[1], H[0], ga(H[2]), H[3]) : n(H, 200, {}, "OK");
                } else E.put(x, q);
                v(H) && ((H = Pb(c.url) ? b.cookies()[c.xsrfCookieName || e.xsrfCookieName] : s) && (g[c.xsrfHeaderName || e.xsrfHeaderName] = H), 
                a(c.method, x, f, h, g, c.timeout, c.withCredentials, c.responseType));
                return q;
            }
            function L(a, b) {
                if (!b) return a;
                var c = [];
                Tc(b, function(a, b) {
                    null === a || v(a) || (I(a) || (a = [ a ]), q(a, function(a) {
                        S(a) && (sa(a) ? a = a.toISOString() : S(a) && (a = ta(a)));
                        c.push(Ba(b) + "=" + Ba(a));
                    }));
                });
                0 < c.length && (a += (-1 == a.indexOf("?") ? "?" : "&") + c.join("&"));
                return a;
            }
            var w = c("$http"), u = [];
            q(f, function(a) {
                u.unshift(z(a) ? n.get(a) : n.invoke(a));
            });
            q(g, function(a, b) {
                var c = z(a) ? n.get(a) : n.invoke(a);
                u.splice(b, 0, {
                    response: function(a) {
                        return c(p.when(a));
                    },
                    responseError: function(a) {
                        return c(p.reject(a));
                    }
                });
            });
            r.pendingRequests = [];
            (function(a) {
                q(arguments, function(a) {
                    r[a] = function(b, c) {
                        return r(F(c || {}, {
                            method: a,
                            url: b
                        }));
                    };
                });
            })("get", "delete", "head", "jsonp");
            (function(a) {
                q(arguments, function(a) {
                    r[a] = function(b, c, d) {
                        return r(F(d || {}, {
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
    function ve(b) {
        if (8 >= Q && (!b.match(/^(get|post|head|put|delete|options)$/i) || !P.XMLHttpRequest)) return new P.ActiveXObject("Microsoft.XMLHTTP");
        if (P.XMLHttpRequest) return new P.XMLHttpRequest();
        throw y("$httpBackend")("noxhr");
    }
    function Vd() {
        this.$get = [ "$browser", "$window", "$document", function(b, a, c) {
            return we(b, ve, b.defer, a.angular.callbacks, c[0]);
        } ];
    }
    function we(b, a, c, d, e) {
        function f(a, b, c) {
            var f = e.createElement("script"), g = null;
            f.type = "text/javascript";
            f.src = a;
            f.async = !0;
            g = function(a) {
                Ya(f, "load", g);
                Ya(f, "error", g);
                e.body.removeChild(f);
                f = null;
                var k = -1, t = "unknown";
                a && ("load" !== a.type || d[b].called || (a = {
                    type: "error"
                }), t = a.type, k = "error" === a.type ? 404 : 200);
                c && c(k, t);
            };
            rb(f, "load", g);
            rb(f, "error", g);
            8 >= Q && (f.onreadystatechange = function() {
                z(f.readyState) && /loaded|complete/.test(f.readyState) && (f.onreadystatechange = null, 
                g({
                    type: "load"
                }));
            });
            e.body.appendChild(f);
            return g;
        }
        var g = -1;
        return function(e, m, h, l, p, n, r, t) {
            function L() {
                u = g;
                X && X();
                A && A.abort();
            }
            function w(a, d, e, f, g) {
                J && c.cancel(J);
                X = A = null;
                0 === d && (d = e ? 200 : "file" == ua(m).protocol ? 404 : 0);
                a(1223 === d ? 204 : d, e, f, g || "");
                b.$$completeOutstandingRequest(D);
            }
            var u;
            b.$$incOutstandingRequestCount();
            m = m || b.url();
            if ("jsonp" == K(e)) {
                var M = "_" + (d.counter++).toString(36);
                d[M] = function(a) {
                    d[M].data = a;
                    d[M].called = !0;
                };
                var X = f(m.replace("JSON_CALLBACK", "angular.callbacks." + M), M, function(a, b) {
                    w(l, a, d[M].data, "", b);
                    d[M] = D;
                });
            } else {
                var A = a(e);
                A.open(e, m, !0);
                q(p, function(a, b) {
                    B(a) && A.setRequestHeader(b, a);
                });
                A.onreadystatechange = function() {
                    if (A && 4 == A.readyState) {
                        var a = null, b = null, c = "";
                        u !== g && (a = A.getAllResponseHeaders(), b = "response" in A ? A.response : A.responseText);
                        u === g && 10 > Q || (c = A.statusText);
                        w(l, u || A.status, b, a, c);
                    }
                };
                r && (A.withCredentials = !0);
                if (t) try {
                    A.responseType = t;
                } catch (da) {
                    if ("json" !== t) throw da;
                }
                A.send(h || null);
            }
            if (0 < n) var J = c(L, n); else n && C(n.then) && n.then(L);
        };
    }
    function Sd() {
        var b = "{{", a = "}}";
        this.startSymbol = function(a) {
            return a ? (b = a, this) : b;
        };
        this.endSymbol = function(b) {
            return b ? (a = b, this) : a;
        };
        this.$get = [ "$parse", "$exceptionHandler", "$sce", function(c, d, e) {
            function f(f, h, l) {
                for (var p, n, r = 0, t = [], L = f.length, w = !1, u = []; r < L; ) -1 != (p = f.indexOf(b, r)) && -1 != (n = f.indexOf(a, p + g)) ? (r != p && t.push(f.substring(r, p)), 
                t.push(r = c(w = f.substring(p + g, n))), r.exp = w, r = n + k, w = !0) : (r != L && t.push(f.substring(r)), 
                r = L);
                (L = t.length) || (t.push(""), L = 1);
                if (l && 1 < t.length) throw yc("noconcat", f);
                if (!h || w) return u.length = L, r = function(a) {
                    try {
                        for (var b = 0, c = L, g; b < c; b++) {
                            if ("function" == typeof (g = t[b])) if (g = g(a), g = l ? e.getTrusted(l, g) : e.valueOf(g), 
                            null == g) g = ""; else switch (typeof g) {
                              case "string":
                                break;

                              case "number":
                                g = "" + g;
                                break;

                              default:
                                g = ta(g);
                            }
                            u[b] = g;
                        }
                        return u.join("");
                    } catch (k) {
                        a = yc("interr", f, k.toString()), d(a);
                    }
                }, r.exp = f, r.parts = t, r;
            }
            var g = b.length, k = a.length;
            f.startSymbol = function() {
                return b;
            };
            f.endSymbol = function() {
                return a;
            };
            return f;
        } ];
    }
    function Td() {
        this.$get = [ "$rootScope", "$window", "$q", function(b, a, c) {
            function d(d, g, k, m) {
                var h = a.setInterval, l = a.clearInterval, p = c.defer(), n = p.promise, r = 0, t = B(m) && !m;
                k = B(k) ? k : 0;
                n.then(null, null, d);
                n.$$intervalId = h(function() {
                    p.notify(r++);
                    0 < k && r >= k && (p.resolve(r), l(n.$$intervalId), delete e[n.$$intervalId]);
                    t || b.$apply();
                }, g);
                e[n.$$intervalId] = p;
                return n;
            }
            var e = {};
            d.cancel = function(b) {
                return b && b.$$intervalId in e ? (e[b.$$intervalId].reject("canceled"), a.clearInterval(b.$$intervalId), 
                delete e[b.$$intervalId], !0) : !1;
            };
            return d;
        } ];
    }
    function bd() {
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
    function Qb(b) {
        b = b.split("/");
        for (var a = b.length; a--; ) b[a] = ib(b[a]);
        return b.join("/");
    }
    function zc(b, a, c) {
        b = ua(b, c);
        a.$$protocol = b.protocol;
        a.$$host = b.hostname;
        a.$$port = Z(b.port) || xe[b.protocol] || null;
    }
    function Ac(b, a, c) {
        var d = "/" !== b.charAt(0);
        d && (b = "/" + b);
        b = ua(b, c);
        a.$$path = decodeURIComponent(d && "/" === b.pathname.charAt(0) ? b.pathname.substring(1) : b.pathname);
        a.$$search = ec(b.search);
        a.$$hash = decodeURIComponent(b.hash);
        a.$$path && "/" != a.$$path.charAt(0) && (a.$$path = "/" + a.$$path);
    }
    function pa(b, a) {
        if (0 === a.indexOf(b)) return a.substr(b.length);
    }
    function bb(b) {
        var a = b.indexOf("#");
        return -1 == a ? b : b.substr(0, a);
    }
    function Rb(b) {
        return b.substr(0, bb(b).lastIndexOf("/") + 1);
    }
    function Bc(b, a) {
        this.$$html5 = !0;
        a = a || "";
        var c = Rb(b);
        zc(b, this, b);
        this.$$parse = function(a) {
            var e = pa(c, a);
            if (!z(e)) throw Sb("ipthprfx", a, c);
            Ac(e, this, b);
            this.$$path || (this.$$path = "/");
            this.$$compose();
        };
        this.$$compose = function() {
            var a = Cb(this.$$search), b = this.$$hash ? "#" + ib(this.$$hash) : "";
            this.$$url = Qb(this.$$path) + (a ? "?" + a : "") + b;
            this.$$absUrl = c + this.$$url.substr(1);
        };
        this.$$rewrite = function(d) {
            var e;
            if ((e = pa(b, d)) !== s) return d = e, (e = pa(a, e)) !== s ? c + (pa("/", e) || e) : b + d;
            if ((e = pa(c, d)) !== s) return c + e;
            if (c == d + "/") return c;
        };
    }
    function Tb(b, a) {
        var c = Rb(b);
        zc(b, this, b);
        this.$$parse = function(d) {
            var e = pa(b, d) || pa(c, d), e = "#" == e.charAt(0) ? pa(a, e) : this.$$html5 ? e : "";
            if (!z(e)) throw Sb("ihshprfx", d, a);
            Ac(e, this, b);
            d = this.$$path;
            var f = /^\/[A-Z]:(\/.*)/;
            0 === e.indexOf(b) && (e = e.replace(b, ""));
            f.exec(e) || (d = (e = f.exec(d)) ? e[1] : d);
            this.$$path = d;
            this.$$compose();
        };
        this.$$compose = function() {
            var c = Cb(this.$$search), e = this.$$hash ? "#" + ib(this.$$hash) : "";
            this.$$url = Qb(this.$$path) + (c ? "?" + c : "") + e;
            this.$$absUrl = b + (this.$$url ? a + this.$$url : "");
        };
        this.$$rewrite = function(a) {
            if (bb(b) == bb(a)) return a;
        };
    }
    function Ub(b, a) {
        this.$$html5 = !0;
        Tb.apply(this, arguments);
        var c = Rb(b);
        this.$$rewrite = function(d) {
            var e;
            if (b == bb(d)) return d;
            if (e = pa(c, d)) return b + a + e;
            if (c === d + "/") return c;
        };
        this.$$compose = function() {
            var c = Cb(this.$$search), e = this.$$hash ? "#" + ib(this.$$hash) : "";
            this.$$url = Qb(this.$$path) + (c ? "?" + c : "") + e;
            this.$$absUrl = b + a + this.$$url;
        };
    }
    function sb(b) {
        return function() {
            return this[b];
        };
    }
    function Cc(b, a) {
        return function(c) {
            if (v(c)) return this[b];
            this[b] = a(c);
            this.$$compose();
            return this;
        };
    }
    function Wd() {
        var b = "", a = !1;
        this.hashPrefix = function(a) {
            return B(a) ? (b = a, this) : b;
        };
        this.html5Mode = function(b) {
            return B(b) ? (a = b, this) : a;
        };
        this.$get = [ "$rootScope", "$browser", "$sniffer", "$rootElement", function(c, d, e, f) {
            function g(a) {
                c.$broadcast("$locationChangeSuccess", k.absUrl(), a);
            }
            var k, m, h = d.baseHref(), l = d.url(), p;
            a ? (p = l.substring(0, l.indexOf("/", l.indexOf("//") + 2)) + (h || "/"), m = e.history ? Bc : Ub) : (p = bb(l), 
            m = Tb);
            k = new m(p, "#" + b);
            k.$$parse(k.$$rewrite(l));
            f.on("click", function(a) {
                if (!a.ctrlKey && !a.metaKey && 2 != a.which) {
                    for (var e = x(a.target); "a" !== K(e[0].nodeName); ) if (e[0] === f[0] || !(e = e.parent())[0]) return;
                    var g = e.prop("href");
                    S(g) && "[object SVGAnimatedString]" === g.toString() && (g = ua(g.animVal).href);
                    if (m === Ub) {
                        var h = e.attr("href") || e.attr("xlink:href");
                        if (0 > h.indexOf("://")) if (g = "#" + b, "/" == h[0]) g = p + g + h; else if ("#" == h[0]) g = p + g + (k.path() || "/") + h; else {
                            for (var l = k.path().split("/"), h = h.split("/"), n = 0; n < h.length; n++) "." != h[n] && (".." == h[n] ? l.pop() : h[n].length && l.push(h[n]));
                            g = p + g + l.join("/");
                        }
                    }
                    l = k.$$rewrite(g);
                    g && (!e.attr("target") && l && !a.isDefaultPrevented()) && (a.preventDefault(), 
                    l != d.url() && (k.$$parse(l), c.$apply(), P.angular["ff-684208-preventDefault"] = !0));
                }
            });
            k.absUrl() != l && d.url(k.absUrl(), !0);
            d.onUrlChange(function(a) {
                k.absUrl() != a && (c.$evalAsync(function() {
                    var b = k.absUrl();
                    k.$$parse(a);
                    c.$broadcast("$locationChangeStart", a, b).defaultPrevented ? (k.$$parse(b), d.url(b)) : g(b);
                }), c.$$phase || c.$digest());
            });
            var n = 0;
            c.$watch(function() {
                var a = d.url(), b = k.$$replace;
                n && a == k.absUrl() || (n++, c.$evalAsync(function() {
                    c.$broadcast("$locationChangeStart", k.absUrl(), a).defaultPrevented ? k.$$parse(a) : (d.url(k.absUrl(), b), 
                    g(a));
                }));
                k.$$replace = !1;
                return n;
            });
            return k;
        } ];
    }
    function Xd() {
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
                var b = c.console || {}, e = b[a] || b.log || D;
                a = !1;
                try {
                    a = !!e.apply;
                } catch (m) {}
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
    function qa(b, a) {
        if ("__defineGetter__" === b || "__defineSetter__" === b || "__lookupGetter__" === b || "__lookupSetter__" === b || "__proto__" === b) throw ja("isecfld", a);
        return b;
    }
    function Na(b, a) {
        if (b) {
            if (b.constructor === b) throw ja("isecfn", a);
            if (b.document && b.location && b.alert && b.setInterval) throw ja("isecwindow", a);
            if (b.children && (b.nodeName || b.prop && b.attr && b.find)) throw ja("isecdom", a);
            if (b === Object) throw ja("isecobj", a);
        }
        return b;
    }
    function tb(b, a, c, d, e) {
        e = e || {};
        a = a.split(".");
        for (var f, g = 0; 1 < a.length; g++) {
            f = qa(a.shift(), d);
            var k = b[f];
            k || (k = {}, b[f] = k);
            b = k;
            b.then && e.unwrapPromises && (va(d), "$$v" in b || function(a) {
                a.then(function(b) {
                    a.$$v = b;
                });
            }(b), b.$$v === s && (b.$$v = {}), b = b.$$v);
        }
        f = qa(a.shift(), d);
        Na(b, d);
        Na(b[f], d);
        return b[f] = c;
    }
    function Dc(b, a, c, d, e, f, g) {
        qa(b, f);
        qa(a, f);
        qa(c, f);
        qa(d, f);
        qa(e, f);
        return g.unwrapPromises ? function(g, m) {
            var h = m && m.hasOwnProperty(b) ? m : g, l;
            if (null == h) return h;
            (h = h[b]) && h.then && (va(f), "$$v" in h || (l = h, l.$$v = s, l.then(function(a) {
                l.$$v = a;
            })), h = h.$$v);
            if (!a) return h;
            if (null == h) return s;
            (h = h[a]) && h.then && (va(f), "$$v" in h || (l = h, l.$$v = s, l.then(function(a) {
                l.$$v = a;
            })), h = h.$$v);
            if (!c) return h;
            if (null == h) return s;
            (h = h[c]) && h.then && (va(f), "$$v" in h || (l = h, l.$$v = s, l.then(function(a) {
                l.$$v = a;
            })), h = h.$$v);
            if (!d) return h;
            if (null == h) return s;
            (h = h[d]) && h.then && (va(f), "$$v" in h || (l = h, l.$$v = s, l.then(function(a) {
                l.$$v = a;
            })), h = h.$$v);
            if (!e) return h;
            if (null == h) return s;
            (h = h[e]) && h.then && (va(f), "$$v" in h || (l = h, l.$$v = s, l.then(function(a) {
                l.$$v = a;
            })), h = h.$$v);
            return h;
        } : function(f, g) {
            var h = g && g.hasOwnProperty(b) ? g : f;
            if (null == h) return h;
            h = h[b];
            if (!a) return h;
            if (null == h) return s;
            h = h[a];
            if (!c) return h;
            if (null == h) return s;
            h = h[c];
            if (!d) return h;
            if (null == h) return s;
            h = h[d];
            return e ? null == h ? s : h = h[e] : h;
        };
    }
    function Ec(b, a, c) {
        if (Vb.hasOwnProperty(b)) return Vb[b];
        var d = b.split("."), e = d.length, f;
        if (a.csp) f = 6 > e ? Dc(d[0], d[1], d[2], d[3], d[4], c, a) : function(b, f) {
            var g = 0, k;
            do k = Dc(d[g++], d[g++], d[g++], d[g++], d[g++], c, a)(b, f), f = s, b = k; while (g < e);
            return k;
        }; else {
            var g = "var p;\n";
            q(d, function(b, d) {
                qa(b, c);
                g += "if(s == null) return undefined;\ns=" + (d ? "s" : '((k&&k.hasOwnProperty("' + b + '"))?k:s)') + '["' + b + '"];\n' + (a.unwrapPromises ? 'if (s && s.then) {\n pw("' + c.replace(/(["\r\n])/g, "\\$1") + '");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n' : "");
            });
            var g = g + "return s;", k = new Function("s", "k", "pw", g);
            k.toString = $(g);
            f = a.unwrapPromises ? function(a, b) {
                return k(a, b, va);
            } : k;
        }
        "hasOwnProperty" !== b && (Vb[b] = f);
        return f;
    }
    function Yd() {
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
            va = function(b) {
                a.logPromiseWarnings && !Fc.hasOwnProperty(b) && (Fc[b] = !0, e.warn("[$parse] Promise found in the expression `" + b + "`. Automatic unwrapping of promises in Angular expressions is deprecated."));
            };
            return function(d) {
                var e;
                switch (typeof d) {
                  case "string":
                    if (b.hasOwnProperty(d)) return b[d];
                    e = new Wb(a);
                    e = new cb(e, c, a).parse(d);
                    "hasOwnProperty" !== d && (b[d] = e);
                    return e;

                  case "function":
                    return d;

                  default:
                    return D;
                }
            };
        } ];
    }
    function $d() {
        this.$get = [ "$rootScope", "$exceptionHandler", function(b, a) {
            return ye(function(a) {
                b.$evalAsync(a);
            }, a);
        } ];
    }
    function ye(b, a) {
        function c(a) {
            return a;
        }
        function d(a) {
            return g(a);
        }
        var e = function() {
            var g = [], h, l;
            return l = {
                resolve: function(a) {
                    if (g) {
                        var c = g;
                        g = s;
                        h = f(a);
                        c.length && b(function() {
                            for (var a, b = 0, d = c.length; b < d; b++) a = c[b], h.then(a[0], a[1], a[2]);
                        });
                    }
                },
                reject: function(a) {
                    l.resolve(k(a));
                },
                notify: function(a) {
                    if (g) {
                        var c = g;
                        g.length && b(function() {
                            for (var b, d = 0, e = c.length; d < e; d++) b = c[d], b[2](a);
                        });
                    }
                },
                promise: {
                    then: function(b, f, k) {
                        var l = e(), L = function(d) {
                            try {
                                l.resolve((C(b) ? b : c)(d));
                            } catch (e) {
                                l.reject(e), a(e);
                            }
                        }, w = function(b) {
                            try {
                                l.resolve((C(f) ? f : d)(b));
                            } catch (c) {
                                l.reject(c), a(c);
                            }
                        }, u = function(b) {
                            try {
                                l.notify((C(k) ? k : c)(b));
                            } catch (d) {
                                a(d);
                            }
                        };
                        g ? g.push([ L, w, u ]) : h.then(L, w, u);
                        return l.promise;
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
                        function d(e, f) {
                            var g = null;
                            try {
                                g = (a || c)();
                            } catch (k) {
                                return b(k, !1);
                            }
                            return g && C(g.then) ? g.then(function() {
                                return b(e, f);
                            }, function(a) {
                                return b(a, !1);
                            }) : b(e, f);
                        }
                        return this.then(function(a) {
                            return d(a, !0);
                        }, function(a) {
                            return d(a, !1);
                        });
                    }
                }
            };
        }, f = function(a) {
            return a && C(a.then) ? a : {
                then: function(c) {
                    var d = e();
                    b(function() {
                        d.resolve(c(a));
                    });
                    return d.promise;
                }
            };
        }, g = function(a) {
            var b = e();
            b.reject(a);
            return b.promise;
        }, k = function(c) {
            return {
                then: function(f, g) {
                    var k = e();
                    b(function() {
                        try {
                            k.resolve((C(g) ? g : d)(c));
                        } catch (b) {
                            k.reject(b), a(b);
                        }
                    });
                    return k.promise;
                }
            };
        };
        return {
            defer: e,
            reject: g,
            when: function(k, h, l, p) {
                var n = e(), r, t = function(b) {
                    try {
                        return (C(h) ? h : c)(b);
                    } catch (d) {
                        return a(d), g(d);
                    }
                }, L = function(b) {
                    try {
                        return (C(l) ? l : d)(b);
                    } catch (c) {
                        return a(c), g(c);
                    }
                }, w = function(b) {
                    try {
                        return (C(p) ? p : c)(b);
                    } catch (d) {
                        a(d);
                    }
                };
                b(function() {
                    f(k).then(function(a) {
                        r || (r = !0, n.resolve(f(a).then(t, L, w)));
                    }, function(a) {
                        r || (r = !0, n.resolve(L(a)));
                    }, function(a) {
                        r || n.notify(w(a));
                    });
                });
                return n.promise;
            },
            all: function(a) {
                var b = e(), c = 0, d = I(a) ? [] : {};
                q(a, function(a, e) {
                    c++;
                    f(a).then(function(a) {
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
    function ge() {
        this.$get = [ "$window", "$timeout", function(b, a) {
            var c = b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame, d = b.cancelAnimationFrame || b.webkitCancelAnimationFrame || b.mozCancelAnimationFrame || b.webkitCancelRequestAnimationFrame, e = !!c, f = e ? function(a) {
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
            f.supported = e;
            return f;
        } ];
    }
    function Zd() {
        var b = 10, a = y("$rootScope"), c = null;
        this.digestTtl = function(a) {
            arguments.length && (b = a);
            return b;
        };
        this.$get = [ "$injector", "$exceptionHandler", "$parse", "$browser", function(d, e, f, g) {
            function k() {
                this.$id = fb();
                this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
                this["this"] = this.$root = this;
                this.$$destroyed = !1;
                this.$$asyncQueue = [];
                this.$$postDigestQueue = [];
                this.$$listeners = {};
                this.$$listenerCount = {};
                this.$$isolateBindings = {};
            }
            function m(b) {
                if (n.$$phase) throw a("inprog", n.$$phase);
                n.$$phase = b;
            }
            function h(a, b) {
                var c = f(a);
                Ua(c, b);
                return c;
            }
            function l(a, b, c) {
                do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c]; while (a = a.$parent);
            }
            function p() {}
            k.prototype = {
                constructor: k,
                $new: function(a) {
                    a ? (a = new k(), a.$root = this.$root, a.$$asyncQueue = this.$$asyncQueue, a.$$postDigestQueue = this.$$postDigestQueue) : (this.$$childScopeClass || (this.$$childScopeClass = function() {
                        this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null;
                        this.$$listeners = {};
                        this.$$listenerCount = {};
                        this.$id = fb();
                        this.$$childScopeClass = null;
                    }, this.$$childScopeClass.prototype = this), a = new this.$$childScopeClass());
                    a["this"] = a;
                    a.$parent = this;
                    a.$$prevSibling = this.$$childTail;
                    this.$$childHead ? this.$$childTail = this.$$childTail.$$nextSibling = a : this.$$childHead = this.$$childTail = a;
                    return a;
                },
                $watch: function(a, b, d) {
                    var e = h(a, "watch"), f = this.$$watchers, g = {
                        fn: b,
                        last: p,
                        get: e,
                        exp: a,
                        eq: !!d
                    };
                    c = null;
                    if (!C(b)) {
                        var k = h(b || D, "listener");
                        g.fn = function(a, b, c) {
                            k(c);
                        };
                    }
                    if ("string" == typeof a && e.constant) {
                        var m = g.fn;
                        g.fn = function(a, b, c) {
                            m.call(this, a, b, c);
                            Qa(f, g);
                        };
                    }
                    f || (f = this.$$watchers = []);
                    f.unshift(g);
                    return function() {
                        Qa(f, g);
                        c = null;
                    };
                },
                $watchCollection: function(a, b) {
                    var c = this, d, e, g, k = 1 < b.length, h = 0, m = f(a), l = [], n = {}, p = !0, q = 0;
                    return this.$watch(function() {
                        d = m(c);
                        var a, b, f;
                        if (S(d)) if (eb(d)) for (e !== l && (e = l, q = e.length = 0, h++), a = d.length, 
                        q !== a && (h++, e.length = q = a), b = 0; b < a; b++) f = e[b] !== e[b] && d[b] !== d[b], 
                        f || e[b] === d[b] || (h++, e[b] = d[b]); else {
                            e !== n && (e = n = {}, q = 0, h++);
                            a = 0;
                            for (b in d) d.hasOwnProperty(b) && (a++, e.hasOwnProperty(b) ? (f = e[b] !== e[b] && d[b] !== d[b], 
                            f || e[b] === d[b] || (h++, e[b] = d[b])) : (q++, e[b] = d[b], h++));
                            if (q > a) for (b in h++, e) e.hasOwnProperty(b) && !d.hasOwnProperty(b) && (q--, 
                            delete e[b]);
                        } else e !== d && (e = d, h++);
                        return h;
                    }, function() {
                        p ? (p = !1, b(d, d, c)) : b(d, g, c);
                        if (k) if (S(d)) if (eb(d)) {
                            g = Array(d.length);
                            for (var a = 0; a < d.length; a++) g[a] = d[a];
                        } else for (a in g = {}, d) hb.call(d, a) && (g[a] = d[a]); else g = d;
                    });
                },
                $digest: function() {
                    var d, f, g, k, h = this.$$asyncQueue, l = this.$$postDigestQueue, q, A, s = b, J, T = [], x, O, E;
                    m("$digest");
                    c = null;
                    do {
                        A = !1;
                        for (J = this; h.length; ) {
                            try {
                                E = h.shift(), E.scope.$eval(E.expression);
                            } catch (H) {
                                n.$$phase = null, e(H);
                            }
                            c = null;
                        }
                        a: do {
                            if (k = J.$$watchers) for (q = k.length; q--; ) try {
                                if (d = k[q]) if ((f = d.get(J)) !== (g = d.last) && !(d.eq ? za(f, g) : "number" === typeof f && "number" === typeof g && isNaN(f) && isNaN(g))) A = !0, 
                                c = d, d.last = d.eq ? Ha(f, null) : f, d.fn(f, g === p ? f : g, J), 5 > s && (x = 4 - s, 
                                T[x] || (T[x] = []), O = C(d.exp) ? "fn: " + (d.exp.name || d.exp.toString()) : d.exp, 
                                O += "; newVal: " + ta(f) + "; oldVal: " + ta(g), T[x].push(O)); else if (d === c) {
                                    A = !1;
                                    break a;
                                }
                            } catch (B) {
                                n.$$phase = null, e(B);
                            }
                            if (!(k = J.$$childHead || J !== this && J.$$nextSibling)) for (;J !== this && !(k = J.$$nextSibling); ) J = J.$parent;
                        } while (J = k);
                        if ((A || h.length) && !s--) throw n.$$phase = null, a("infdig", b, ta(T));
                    } while (A || h.length);
                    for (n.$$phase = null; l.length; ) try {
                        l.shift()();
                    } catch (y) {
                        e(y);
                    }
                },
                $destroy: function() {
                    if (!this.$$destroyed) {
                        var a = this.$parent;
                        this.$broadcast("$destroy");
                        this.$$destroyed = !0;
                        this !== n && (q(this.$$listenerCount, Bb(null, l, this)), a.$$childHead == this && (a.$$childHead = this.$$nextSibling), 
                        a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), 
                        this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = null, 
                        this.$$listeners = {}, this.$$watchers = this.$$asyncQueue = this.$$postDigestQueue = [], 
                        this.$destroy = this.$digest = this.$apply = D, this.$on = this.$watch = function() {
                            return D;
                        });
                    }
                },
                $eval: function(a, b) {
                    return f(a)(this, b);
                },
                $evalAsync: function(a) {
                    n.$$phase || n.$$asyncQueue.length || g.defer(function() {
                        n.$$asyncQueue.length && n.$digest();
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
                        return m("$apply"), this.$eval(a);
                    } catch (b) {
                        e(b);
                    } finally {
                        n.$$phase = null;
                        try {
                            n.$digest();
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
                        c[Pa(c, b)] = null;
                        l(e, 1, a);
                    };
                },
                $emit: function(a, b) {
                    var c = [], d, f = this, g = !1, k = {
                        name: a,
                        targetScope: f,
                        stopPropagation: function() {
                            g = !0;
                        },
                        preventDefault: function() {
                            k.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    }, h = [ k ].concat(Aa.call(arguments, 1)), m, l;
                    do {
                        d = f.$$listeners[a] || c;
                        k.currentScope = f;
                        m = 0;
                        for (l = d.length; m < l; m++) if (d[m]) try {
                            d[m].apply(null, h);
                        } catch (n) {
                            e(n);
                        } else d.splice(m, 1), m--, l--;
                        if (g) break;
                        f = f.$parent;
                    } while (f);
                    return k;
                },
                $broadcast: function(a, b) {
                    for (var c = this, d = this, f = {
                        name: a,
                        targetScope: this,
                        preventDefault: function() {
                            f.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    }, g = [ f ].concat(Aa.call(arguments, 1)), k, h; c = d; ) {
                        f.currentScope = c;
                        d = c.$$listeners[a] || [];
                        k = 0;
                        for (h = d.length; k < h; k++) if (d[k]) try {
                            d[k].apply(null, g);
                        } catch (m) {
                            e(m);
                        } else d.splice(k, 1), k--, h--;
                        if (!(d = c.$$listenerCount[a] && c.$$childHead || c !== this && c.$$nextSibling)) for (;c !== this && !(d = c.$$nextSibling); ) c = c.$parent;
                    }
                    return f;
                }
            };
            var n = new k();
            return n;
        } ];
    }
    function cd() {
        var b = /^\s*(https?|ftp|mailto|tel|file):/, a = /^\s*(https?|ftp|file):|data:image\//;
        this.aHrefSanitizationWhitelist = function(a) {
            return B(a) ? (b = a, this) : b;
        };
        this.imgSrcSanitizationWhitelist = function(b) {
            return B(b) ? (a = b, this) : a;
        };
        this.$get = function() {
            return function(c, d) {
                var e = d ? a : b, f;
                if (!Q || 8 <= Q) if (f = ua(c).href, "" !== f && !f.match(e)) return "unsafe:" + f;
                return c;
            };
        };
    }
    function ze(b) {
        if ("self" === b) return b;
        if (z(b)) {
            if (-1 < b.indexOf("***")) throw wa("iwcard", b);
            b = b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08").replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*");
            return RegExp("^" + b + "$");
        }
        if (gb(b)) return RegExp("^" + b.source + "$");
        throw wa("imatcher");
    }
    function Gc(b) {
        var a = [];
        B(b) && q(b, function(b) {
            a.push(ze(b));
        });
        return a;
    }
    function be() {
        this.SCE_CONTEXTS = fa;
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
                throw wa("unsafe");
            };
            c.has("$sanitize") && (e = c.get("$sanitize"));
            var f = d(), g = {};
            g[fa.HTML] = d(f);
            g[fa.CSS] = d(f);
            g[fa.URL] = d(f);
            g[fa.JS] = d(f);
            g[fa.RESOURCE_URL] = d(g[fa.URL]);
            return {
                trustAs: function(a, b) {
                    var c = g.hasOwnProperty(a) ? g[a] : null;
                    if (!c) throw wa("icontext", a, b);
                    if (null === b || b === s || "" === b) return b;
                    if ("string" !== typeof b) throw wa("itype", a);
                    return new c(b);
                },
                getTrusted: function(c, d) {
                    if (null === d || d === s || "" === d) return d;
                    var f = g.hasOwnProperty(c) ? g[c] : null;
                    if (f && d instanceof f) return d.$$unwrapTrustedValue();
                    if (c === fa.RESOURCE_URL) {
                        var f = ua(d.toString()), l, p, n = !1;
                        l = 0;
                        for (p = b.length; l < p; l++) if ("self" === b[l] ? Pb(f) : b[l].exec(f.href)) {
                            n = !0;
                            break;
                        }
                        if (n) for (l = 0, p = a.length; l < p; l++) if ("self" === a[l] ? Pb(f) : a[l].exec(f.href)) {
                            n = !1;
                            break;
                        }
                        if (n) return d;
                        throw wa("insecurl", d.toString());
                    }
                    if (c === fa.HTML) return e(d);
                    throw wa("unsafe");
                },
                valueOf: function(a) {
                    return a instanceof f ? a.$$unwrapTrustedValue() : a;
                }
            };
        } ];
    }
    function ae() {
        var b = !0;
        this.enabled = function(a) {
            arguments.length && (b = !!a);
            return b;
        };
        this.$get = [ "$parse", "$sniffer", "$sceDelegate", function(a, c, d) {
            if (b && c.msie && 8 > c.msieDocumentMode) throw wa("iequirks");
            var e = ga(fa);
            e.isEnabled = function() {
                return b;
            };
            e.trustAs = d.trustAs;
            e.getTrusted = d.getTrusted;
            e.valueOf = d.valueOf;
            b || (e.trustAs = e.getTrusted = function(a, b) {
                return b;
            }, e.valueOf = Ga);
            e.parseAs = function(b, c) {
                var d = a(c);
                return d.literal && d.constant ? d : function(a, c) {
                    return e.getTrusted(b, d(a, c));
                };
            };
            var f = e.parseAs, g = e.getTrusted, k = e.trustAs;
            q(fa, function(a, b) {
                var c = K(b);
                e[Xa("parse_as_" + c)] = function(b) {
                    return f(a, b);
                };
                e[Xa("get_trusted_" + c)] = function(b) {
                    return g(a, b);
                };
                e[Xa("trust_as_" + c)] = function(b) {
                    return k(a, b);
                };
            });
            return e;
        } ];
    }
    function ce() {
        this.$get = [ "$window", "$document", function(b, a) {
            var c = {}, d = Z((/android (\d+)/.exec(K((b.navigator || {}).userAgent)) || [])[1]), e = /Boxee/i.test((b.navigator || {}).userAgent), f = a[0] || {}, g = f.documentMode, k, m = /^(Moz|webkit|O|ms)(?=[A-Z])/, h = f.body && f.body.style, l = !1, p = !1;
            if (h) {
                for (var n in h) if (l = m.exec(n)) {
                    k = l[0];
                    k = k.substr(0, 1).toUpperCase() + k.substr(1);
                    break;
                }
                k || (k = "WebkitOpacity" in h && "webkit");
                l = !!("transition" in h || k + "Transition" in h);
                p = !!("animation" in h || k + "Animation" in h);
                !d || l && p || (l = z(f.body.style.webkitTransition), p = z(f.body.style.webkitAnimation));
            }
            return {
                history: !(!b.history || !b.history.pushState || 4 > d || e),
                hashchange: "onhashchange" in b && (!g || 7 < g),
                hasEvent: function(a) {
                    if ("input" == a && 9 == Q) return !1;
                    if (v(c[a])) {
                        var b = f.createElement("div");
                        c[a] = "on" + a in b;
                    }
                    return c[a];
                },
                csp: Va(),
                vendorPrefix: k,
                transitions: l,
                animations: p,
                android: d,
                msie: Q,
                msieDocumentMode: g
            };
        } ];
    }
    function ee() {
        this.$get = [ "$rootScope", "$browser", "$q", "$exceptionHandler", function(b, a, c, d) {
            function e(e, k, m) {
                var h = c.defer(), l = h.promise, p = B(m) && !m;
                k = a.defer(function() {
                    try {
                        h.resolve(e());
                    } catch (a) {
                        h.reject(a), d(a);
                    } finally {
                        delete f[l.$$timeoutId];
                    }
                    p || b.$apply();
                }, k);
                l.$$timeoutId = k;
                f[k] = h;
                return l;
            }
            var f = {};
            e.cancel = function(b) {
                return b && b.$$timeoutId in f ? (f[b.$$timeoutId].reject("canceled"), delete f[b.$$timeoutId], 
                a.defer.cancel(b.$$timeoutId)) : !1;
            };
            return e;
        } ];
    }
    function ua(b, a) {
        var c = b;
        Q && (V.setAttribute("href", c), c = V.href);
        V.setAttribute("href", c);
        return {
            href: V.href,
            protocol: V.protocol ? V.protocol.replace(/:$/, "") : "",
            host: V.host,
            search: V.search ? V.search.replace(/^\?/, "") : "",
            hash: V.hash ? V.hash.replace(/^#/, "") : "",
            hostname: V.hostname,
            port: V.port,
            pathname: "/" === V.pathname.charAt(0) ? V.pathname : "/" + V.pathname
        };
    }
    function Pb(b) {
        b = z(b) ? ua(b) : b;
        return b.protocol === Hc.protocol && b.host === Hc.host;
    }
    function fe() {
        this.$get = $(P);
    }
    function mc(b) {
        function a(d, e) {
            if (S(d)) {
                var f = {};
                q(d, function(b, c) {
                    f[c] = a(c, b);
                });
                return f;
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
        a("filter", Ae);
        a("json", Be);
        a("limitTo", Ce);
        a("lowercase", De);
        a("number", Kc);
        a("orderBy", Lc);
        a("uppercase", Ee);
    }
    function Ae() {
        return function(b, a, c) {
            if (!I(b)) return b;
            var d = typeof c, e = [];
            e.check = function(a) {
                for (var b = 0; b < e.length; b++) if (!e[b](a)) return !1;
                return !0;
            };
            "function" !== d && (c = "boolean" === d && c ? function(a, b) {
                return Ta.equals(a, b);
            } : function(a, b) {
                if (a && b && "object" === typeof a && "object" === typeof b) {
                    for (var d in a) if ("$" !== d.charAt(0) && hb.call(a, d) && c(a[d], b[d])) return !0;
                    return !1;
                }
                b = ("" + b).toLowerCase();
                return -1 < ("" + a).toLowerCase().indexOf(b);
            });
            var f = function(a, b) {
                if ("string" == typeof b && "!" === b.charAt(0)) return !f(a, b.substr(1));
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
                        for (var d in a) if ("$" !== d.charAt(0) && f(a[d], b)) return !0;
                    }
                    return !1;

                  case "array":
                    for (d = 0; d < a.length; d++) if (f(a[d], b)) return !0;
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
                for (var g in a) (function(b) {
                    "undefined" !== typeof a[b] && e.push(function(c) {
                        return f("$" == b ? c : c && c[b], a[b]);
                    });
                })(g);
                break;

              case "function":
                e.push(a);
                break;

              default:
                return b;
            }
            d = [];
            for (g = 0; g < b.length; g++) {
                var k = b[g];
                e.check(k) && d.push(k);
            }
            return d;
        };
    }
    function Ic(b) {
        var a = b.NUMBER_FORMATS;
        return function(b, d) {
            v(d) && (d = a.CURRENCY_SYM);
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
        if (null == b || !isFinite(b) || S(b)) return "";
        var f = 0 > b;
        b = Math.abs(b);
        var g = b + "", k = "", m = [], h = !1;
        if (-1 !== g.indexOf("e")) {
            var l = g.match(/([\d\.]+)e(-?)(\d+)/);
            l && "-" == l[2] && l[3] > e + 1 ? (g = "0", b = 0) : (k = g, h = !0);
        }
        if (h) 0 < e && (-1 < b && 1 > b) && (k = b.toFixed(e)); else {
            g = (g.split(Nc)[1] || "").length;
            v(e) && (e = Math.min(Math.max(a.minFrac, g), a.maxFrac));
            b = +(Math.round(+(b.toString() + "e" + e)).toString() + "e" + -e);
            b = ("" + b).split(Nc);
            g = b[0];
            b = b[1] || "";
            var l = 0, p = a.lgSize, n = a.gSize;
            if (g.length >= p + n) for (l = g.length - p, h = 0; h < l; h++) 0 === (l - h) % n && 0 !== h && (k += c), 
            k += g.charAt(h);
            for (h = l; h < g.length; h++) 0 === (g.length - h) % p && 0 !== h && (k += c), 
            k += g.charAt(h);
            for (;b.length < e; ) b += "0";
            e && "0" !== e && (k += d + b.substr(0, e));
        }
        m.push(f ? a.negPre : a.posPre);
        m.push(k);
        m.push(f ? a.negSuf : a.posSuf);
        return m.join("");
    }
    function Xb(b, a, c) {
        var d = "";
        0 > b && (d = "-", b = -b);
        for (b = "" + b; b.length < a; ) b = "0" + b;
        c && (b = b.substr(b.length - a));
        return d + b;
    }
    function Y(b, a, c, d) {
        c = c || 0;
        return function(e) {
            e = e["get" + b]();
            if (0 < c || e > -c) e += c;
            0 === e && -12 == c && (e = 12);
            return Xb(e, a, d);
        };
    }
    function ub(b, a) {
        return function(c, d) {
            var e = c["get" + b](), f = Ia(a ? "SHORT" + b : b);
            return d[f][e];
        };
    }
    function Jc(b) {
        function a(a) {
            var b;
            if (b = a.match(c)) {
                a = new Date(0);
                var f = 0, g = 0, k = b[8] ? a.setUTCFullYear : a.setFullYear, m = b[8] ? a.setUTCHours : a.setHours;
                b[9] && (f = Z(b[9] + b[10]), g = Z(b[9] + b[11]));
                k.call(a, Z(b[1]), Z(b[2]) - 1, Z(b[3]));
                f = Z(b[4] || 0) - f;
                g = Z(b[5] || 0) - g;
                k = Z(b[6] || 0);
                b = Math.round(1e3 * parseFloat("0." + (b[7] || 0)));
                m.call(a, f, g, k, b);
            }
            return a;
        }
        var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(c, e) {
            var f = "", g = [], k, m;
            e = e || "mediumDate";
            e = b.DATETIME_FORMATS[e] || e;
            z(c) && (c = Fe.test(c) ? Z(c) : a(c));
            Ab(c) && (c = new Date(c));
            if (!sa(c)) return c;
            for (;e; ) (m = Ge.exec(e)) ? (g = g.concat(Aa.call(m, 1)), e = g.pop()) : (g.push(e), 
            e = null);
            q(g, function(a) {
                k = He[a];
                f += k ? k(c, b.DATETIME_FORMATS) : a.replace(/(^'|'$)/g, "").replace(/''/g, "'");
            });
            return f;
        };
    }
    function Be() {
        return function(b) {
            return ta(b, !0);
        };
    }
    function Ce() {
        return function(b, a) {
            if (!I(b) && !z(b)) return b;
            a = Infinity === Math.abs(Number(a)) ? Number(a) : Z(a);
            if (z(b)) return a ? 0 <= a ? b.slice(0, a) : b.slice(a, b.length) : "";
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
                return Sa(b) ? function(b, c) {
                    return a(c, b);
                } : a;
            }
            function f(a, b) {
                var c = typeof a, d = typeof b;
                return c == d ? (sa(a) && sa(b) && (a = a.valueOf(), b = b.valueOf()), "string" == c && (a = a.toLowerCase(), 
                b = b.toLowerCase()), a === b ? 0 : a < b ? -1 : 1) : c < d ? -1 : 1;
            }
            if (!I(a) || !c) return a;
            c = I(c) ? c : [ c ];
            c = Vc(c, function(a) {
                var c = !1, d = a || Ga;
                if (z(a)) {
                    if ("+" == a.charAt(0) || "-" == a.charAt(0)) c = "-" == a.charAt(0), a = a.substring(1);
                    d = b(a);
                    if (d.constant) {
                        var g = d();
                        return e(function(a, b) {
                            return f(a[g], b[g]);
                        }, c);
                    }
                }
                return e(function(a, b) {
                    return f(d(a), d(b));
                }, c);
            });
            for (var g = [], k = 0; k < a.length; k++) g.push(a[k]);
            return g.sort(e(function(a, b) {
                for (var d = 0; d < c.length; d++) {
                    var e = c[d](a, b);
                    if (0 !== e) return e;
                }
                return 0;
            }, d));
        };
    }
    function xa(b) {
        C(b) && (b = {
            link: b
        });
        b.restrict = b.restrict || "AC";
        return $(b);
    }
    function Oc(b, a, c, d) {
        function e(a, c) {
            c = c ? "-" + jb(c, "-") : "";
            d.removeClass(b, (a ? vb : wb) + c);
            d.addClass(b, (a ? wb : vb) + c);
        }
        var f = this, g = b.parent().controller("form") || xb, k = 0, m = f.$error = {}, h = [];
        f.$name = a.name || a.ngForm;
        f.$dirty = !1;
        f.$pristine = !0;
        f.$valid = !0;
        f.$invalid = !1;
        g.$addControl(f);
        b.addClass(Oa);
        e(!0);
        f.$addControl = function(a) {
            Ca(a.$name, "input");
            h.push(a);
            a.$name && (f[a.$name] = a);
        };
        f.$removeControl = function(a) {
            a.$name && f[a.$name] === a && delete f[a.$name];
            q(m, function(b, c) {
                f.$setValidity(c, !0, a);
            });
            Qa(h, a);
        };
        f.$setValidity = function(a, b, c) {
            var d = m[a];
            if (b) d && (Qa(d, c), d.length || (k--, k || (e(b), f.$valid = !0, f.$invalid = !1), 
            m[a] = !1, e(!0, a), g.$setValidity(a, !0, f))); else {
                k || e(b);
                if (d) {
                    if (-1 != Pa(d, c)) return;
                } else m[a] = d = [], k++, e(!1, a), g.$setValidity(a, !1, f);
                d.push(c);
                f.$valid = !1;
                f.$invalid = !0;
            }
        };
        f.$setDirty = function() {
            d.removeClass(b, Oa);
            d.addClass(b, yb);
            f.$dirty = !0;
            f.$pristine = !1;
            g.$setDirty();
        };
        f.$setPristine = function() {
            d.removeClass(b, yb);
            d.addClass(b, Oa);
            f.$dirty = !1;
            f.$pristine = !0;
            q(h, function(a) {
                a.$setPristine();
            });
        };
    }
    function ra(b, a, c, d) {
        b.$setValidity(a, c);
        return c ? d : s;
    }
    function Pc(b, a) {
        var c, d;
        if (a) for (c = 0; c < a.length; ++c) if (d = a[c], b[d]) return !0;
        return !1;
    }
    function Ie(b, a, c, d, e) {
        S(e) && (b.$$hasNativeValidators = !0, b.$parsers.push(function(f) {
            if (b.$error[a] || Pc(e, d) || !Pc(e, c)) return f;
            b.$setValidity(a, !1);
        }));
    }
    function zb(b, a, c, d, e, f) {
        var g = a.prop(Je), k = a[0].placeholder, m = {};
        d.$$validityState = g;
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
        var l = function(e) {
            if (!h) {
                var f = a.val();
                if (Q && "input" === (e || m).type && a[0].placeholder !== k) k = a[0].placeholder; else if (Sa(c.ngTrim || "T") && (f = aa(f)), 
                e = g && d.$$hasNativeValidators, d.$viewValue !== f || "" === f && e) b.$$phase ? d.$setViewValue(f) : b.$apply(function() {
                    d.$setViewValue(f);
                });
            }
        };
        if (e.hasEvent("input")) a.on("input", l); else {
            var p, n = function() {
                p || (p = f.defer(function() {
                    l();
                    p = null;
                }));
            };
            a.on("keydown", function(a) {
                a = a.keyCode;
                91 === a || (15 < a && 19 > a || 37 <= a && 40 >= a) || n();
            });
            if (e.hasEvent("paste")) a.on("paste cut", n);
        }
        a.on("change", l);
        d.$render = function() {
            a.val(d.$isEmpty(d.$viewValue) ? "" : d.$viewValue);
        };
        var r = c.ngPattern;
        r && ((e = r.match(/^\/(.*)\/([gim]*)$/)) ? (r = RegExp(e[1], e[2]), e = function(a) {
            return ra(d, "pattern", d.$isEmpty(a) || r.test(a), a);
        }) : e = function(c) {
            var e = b.$eval(r);
            if (!e || !e.test) throw y("ngPattern")("noregexp", r, e, ha(a));
            return ra(d, "pattern", d.$isEmpty(c) || e.test(c), c);
        }, d.$formatters.push(e), d.$parsers.push(e));
        if (c.ngMinlength) {
            var t = Z(c.ngMinlength);
            e = function(a) {
                return ra(d, "minlength", d.$isEmpty(a) || a.length >= t, a);
            };
            d.$parsers.push(e);
            d.$formatters.push(e);
        }
        if (c.ngMaxlength) {
            var q = Z(c.ngMaxlength);
            e = function(a) {
                return ra(d, "maxlength", d.$isEmpty(a) || a.length <= q, a);
            };
            d.$parsers.push(e);
            d.$formatters.push(e);
        }
    }
    function Yb(b, a) {
        b = "ngClass" + b;
        return [ "$animate", function(c) {
            function d(a, b) {
                var c = [], d = 0;
                a: for (;d < a.length; d++) {
                    for (var e = a[d], l = 0; l < b.length; l++) if (e == b[l]) continue a;
                    c.push(e);
                }
                return c;
            }
            function e(a) {
                if (!I(a)) {
                    if (z(a)) return a.split(" ");
                    if (S(a)) {
                        var b = [];
                        q(a, function(a, c) {
                            a && (b = b.concat(c.split(" ")));
                        });
                        return b;
                    }
                }
                return a;
            }
            return {
                restrict: "AC",
                link: function(f, g, k) {
                    function m(a, b) {
                        var c = g.data("$classCounts") || {}, d = [];
                        q(a, function(a) {
                            if (0 < b || c[a]) c[a] = (c[a] || 0) + b, c[a] === +(0 < b) && d.push(a);
                        });
                        g.data("$classCounts", c);
                        return d.join(" ");
                    }
                    function h(b) {
                        if (!0 === a || f.$index % 2 === a) {
                            var h = e(b || []);
                            if (!l) {
                                var r = m(h, 1);
                                k.$addClass(r);
                            } else if (!za(b, l)) {
                                var q = e(l), r = d(h, q), h = d(q, h), h = m(h, -1), r = m(r, 1);
                                0 === r.length ? c.removeClass(g, h) : 0 === h.length ? c.addClass(g, r) : c.setClass(g, r, h);
                            }
                        }
                        l = ga(b);
                    }
                    var l;
                    f.$watch(k[b], h, !0);
                    k.$observe("class", function(a) {
                        h(f.$eval(k[b]));
                    });
                    "ngClass" !== b && f.$watch("$index", function(c, d) {
                        var g = c & 1;
                        if (g !== (d & 1)) {
                            var h = e(f.$eval(k[b]));
                            g === a ? (g = m(h, 1), k.$addClass(g)) : (g = m(h, -1), k.$removeClass(g));
                        }
                    });
                }
            };
        } ];
    }
    var Je = "validity", K = function(b) {
        return z(b) ? b.toLowerCase() : b;
    }, hb = Object.prototype.hasOwnProperty, Ia = function(b) {
        return z(b) ? b.toUpperCase() : b;
    }, Q, x, Da, Aa = [].slice, Ke = [].push, ya = Object.prototype.toString, Ra = y("ng"), Ta = P.angular || (P.angular = {}), Wa, Ma, ka = [ "0", "0", "0" ];
    Q = Z((/msie (\d+)/.exec(K(navigator.userAgent)) || [])[1]);
    isNaN(Q) && (Q = Z((/trident\/.*; rv:(\d+)/.exec(K(navigator.userAgent)) || [])[1]));
    D.$inject = [];
    Ga.$inject = [];
    var I = function() {
        return C(Array.isArray) ? Array.isArray : function(b) {
            return "[object Array]" === ya.call(b);
        };
    }(), aa = function() {
        return String.prototype.trim ? function(b) {
            return z(b) ? b.trim() : b;
        } : function(b) {
            return z(b) ? b.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : b;
        };
    }();
    Ma = 9 > Q ? function(b) {
        b = b.nodeName ? b : b[0];
        return b.scopeName && "HTML" != b.scopeName ? Ia(b.scopeName + ":" + b.nodeName) : b.nodeName;
    } : function(b) {
        return b.nodeName ? b.nodeName : b[0].nodeName;
    };
    var Va = function() {
        if (B(Va.isActive_)) return Va.isActive_;
        var b = !(!W.querySelector("[ng-csp]") && !W.querySelector("[data-ng-csp]"));
        if (!b) try {
            new Function("");
        } catch (a) {
            b = !0;
        }
        return Va.isActive_ = b;
    }, Yc = /[A-Z]/g, ad = {
        full: "1.2.21",
        major: 1,
        minor: 2,
        dot: 21,
        codeName: "wizard-props"
    };
    R.expando = "ng339";
    var Za = R.cache = {}, ne = 1, rb = P.document.addEventListener ? function(b, a, c) {
        b.addEventListener(a, c, !1);
    } : function(b, a, c) {
        b.attachEvent("on" + a, c);
    }, Ya = P.document.removeEventListener ? function(b, a, c) {
        b.removeEventListener(a, c, !1);
    } : function(b, a, c) {
        b.detachEvent("on" + a, c);
    };
    R._data = function(b) {
        return this.cache[b[this.expando]] || {};
    };
    var ie = /([\:\-\_]+(.))/g, je = /^moz([A-Z])/, Hb = y("jqLite"), ke = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, Ib = /<|&#?\w+;/, le = /<([\w:]+)/, me = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, ba = {
        option: [ 1, '<select multiple="multiple">', "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    ba.optgroup = ba.option;
    ba.tbody = ba.tfoot = ba.colgroup = ba.caption = ba.thead;
    ba.th = ba.td;
    var La = R.prototype = {
        ready: function(b) {
            function a() {
                c || (c = !0, b());
            }
            var c = !1;
            "complete" === W.readyState ? setTimeout(a) : (this.on("DOMContentLoaded", a), R(P).on("load", a));
        },
        toString: function() {
            var b = [];
            q(this, function(a) {
                b.push("" + a);
            });
            return "[" + b.join(", ") + "]";
        },
        eq: function(b) {
            return 0 <= b ? x(this[b]) : x(this[this.length + b]);
        },
        length: 0,
        push: Ke,
        sort: [].sort,
        splice: [].splice
    }, nb = {};
    q("multiple selected checked disabled readOnly required open".split(" "), function(b) {
        nb[K(b)] = b;
    });
    var rc = {};
    q("input select option textarea button form details".split(" "), function(b) {
        rc[Ia(b)] = !0;
    });
    q({
        data: Mb,
        removeData: Lb
    }, function(b, a) {
        R[a] = b;
    });
    q({
        data: Mb,
        inheritedData: mb,
        scope: function(b) {
            return x.data(b, "$scope") || mb(b.parentNode || b, [ "$isolateScope", "$scope" ]);
        },
        isolateScope: function(b) {
            return x.data(b, "$isolateScope") || x.data(b, "$isolateScopeNoTemplate");
        },
        controller: oc,
        injector: function(b) {
            return mb(b, "$injector");
        },
        removeAttr: function(b, a) {
            b.removeAttribute(a);
        },
        hasClass: Nb,
        css: function(b, a, c) {
            a = Xa(a);
            if (B(c)) b.style[a] = c; else {
                var d;
                8 >= Q && (d = b.currentStyle && b.currentStyle[a], "" === d && (d = "auto"));
                d = d || b.style[a];
                8 >= Q && (d = "" === d ? s : d);
                return d;
            }
        },
        attr: function(b, a, c) {
            var d = K(a);
            if (nb[d]) if (B(c)) c ? (b[a] = !0, b.setAttribute(a, d)) : (b[a] = !1, b.removeAttribute(d)); else return b[a] || (b.attributes.getNamedItem(a) || D).specified ? d : s; else if (B(c)) b.setAttribute(a, c); else if (b.getAttribute) return b = b.getAttribute(a, 2), 
            null === b ? s : b;
        },
        prop: function(b, a, c) {
            if (B(c)) b[a] = c; else return b[a];
        },
        text: function() {
            function b(b, d) {
                var e = a[b.nodeType];
                if (v(d)) return e ? b[e] : "";
                b[e] = d;
            }
            var a = [];
            9 > Q ? (a[1] = "innerText", a[3] = "nodeValue") : a[1] = a[3] = "textContent";
            b.$dv = "";
            return b;
        }(),
        val: function(b, a) {
            if (v(a)) {
                if ("SELECT" === Ma(b) && b.multiple) {
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
            if (v(a)) return b.innerHTML;
            for (var c = 0, d = b.childNodes; c < d.length; c++) Ja(d[c]);
            b.innerHTML = a;
        },
        empty: pc
    }, function(b, a) {
        R.prototype[a] = function(a, d) {
            var e, f, g = this.length;
            if (b !== pc && (2 == b.length && b !== Nb && b !== oc ? a : d) === s) {
                if (S(a)) {
                    for (e = 0; e < g; e++) if (b === Mb) b(this[e], a); else for (f in a) b(this[e], f, a[f]);
                    return this;
                }
                e = b.$dv;
                g = e === s ? Math.min(g, 1) : g;
                for (f = 0; f < g; f++) {
                    var k = b(this[f], a, d);
                    e = e ? e + k : k;
                }
                return e;
            }
            for (e = 0; e < g; e++) b(this[e], a, d);
            return this;
        };
    });
    q({
        removeData: Lb,
        dealoc: Ja,
        on: function a(c, d, e, f) {
            if (B(f)) throw Hb("onargs");
            var g = la(c, "events"), k = la(c, "handle");
            g || la(c, "events", g = {});
            k || la(c, "handle", k = oe(c, g));
            q(d.split(" "), function(d) {
                var f = g[d];
                if (!f) {
                    if ("mouseenter" == d || "mouseleave" == d) {
                        var l = W.body.contains || W.body.compareDocumentPosition ? function(a, c) {
                            var d = 9 === a.nodeType ? a.documentElement : a, e = c && c.parentNode;
                            return a === e || !!(e && 1 === e.nodeType && (d.contains ? d.contains(e) : a.compareDocumentPosition && a.compareDocumentPosition(e) & 16));
                        } : function(a, c) {
                            if (c) for (;c = c.parentNode; ) if (c === a) return !0;
                            return !1;
                        };
                        g[d] = [];
                        a(c, {
                            mouseleave: "mouseout",
                            mouseenter: "mouseover"
                        }[d], function(a) {
                            var c = a.relatedTarget;
                            c && (c === this || l(this, c)) || k(a, d);
                        });
                    } else rb(c, d, k), g[d] = [];
                    f = g[d];
                }
                f.push(e);
            });
        },
        off: nc,
        one: function(a, c, d) {
            a = x(a);
            a.on(c, function f() {
                a.off(c, d);
                a.off(c, f);
            });
            a.on(c, d);
        },
        replaceWith: function(a, c) {
            var d, e = a.parentNode;
            Ja(a);
            q(new R(c), function(c) {
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
            q(new R(c), function(c) {
                1 !== a.nodeType && 11 !== a.nodeType || a.appendChild(c);
            });
        },
        prepend: function(a, c) {
            if (1 === a.nodeType) {
                var d = a.firstChild;
                q(new R(c), function(c) {
                    a.insertBefore(c, d);
                });
            }
        },
        wrap: function(a, c) {
            c = x(c)[0];
            var d = a.parentNode;
            d && d.replaceChild(c, a);
            c.appendChild(a);
        },
        remove: function(a) {
            Ja(a);
            var c = a.parentNode;
            c && c.removeChild(a);
        },
        after: function(a, c) {
            var d = a, e = a.parentNode;
            q(new R(c), function(a) {
                e.insertBefore(a, d.nextSibling);
                d = a;
            });
        },
        addClass: lb,
        removeClass: kb,
        toggleClass: function(a, c, d) {
            c && q(c.split(" "), function(c) {
                var f = d;
                v(f) && (f = !Nb(a, c));
                (f ? lb : kb)(a, c);
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
        clone: Kb,
        triggerHandler: function(a, c, d) {
            c = (la(a, "events") || {})[c];
            c = ga(c || []);
            d = d || [];
            var e = [ {
                preventDefault: D,
                stopPropagation: D
            } ];
            q(c, function(c) {
                c.apply(a, e.concat(d));
            });
        }
    }, function(a, c) {
        R.prototype[c] = function(c, e, f) {
            for (var g, k = 0; k < this.length; k++) v(g) ? (g = a(this[k], c, e, f), B(g) && (g = x(g))) : Jb(g, a(this[k], c, e, f));
            return B(g) ? g : this;
        };
        R.prototype.bind = R.prototype.on;
        R.prototype.unbind = R.prototype.off;
    });
    $a.prototype = {
        put: function(a, c) {
            this[Ka(a, this.nextUid)] = c;
        },
        get: function(a) {
            return this[Ka(a, this.nextUid)];
        },
        remove: function(a) {
            var c = this[a = Ka(a, this.nextUid)];
            delete this[a];
            return c;
        }
    };
    var qe = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, re = /,/, se = /^\s*(_?)(\S+?)\1\s*$/, pe = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, ab = y("$injector"), Le = y("$animate"), Md = [ "$provide", function(a) {
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
                enter: function(a, c, g, k) {
                    g ? g.after(a) : (c && c[0] || (c = g.parent()), c.append(a));
                    k && d(k);
                },
                leave: function(a, c) {
                    a.remove();
                    c && d(c);
                },
                move: function(a, c, d, k) {
                    this.enter(a, c, d, k);
                },
                addClass: function(a, c, g) {
                    c = z(c) ? c : I(c) ? c.join(" ") : "";
                    q(a, function(a) {
                        lb(a, c);
                    });
                    g && d(g);
                },
                removeClass: function(a, c, g) {
                    c = z(c) ? c : I(c) ? c.join(" ") : "";
                    q(a, function(a) {
                        kb(a, c);
                    });
                    g && d(g);
                },
                setClass: function(a, c, g, k) {
                    q(a, function(a) {
                        lb(a, c);
                        kb(a, g);
                    });
                    k && d(k);
                },
                enabled: D
            };
        } ];
    } ], ia = y("$compile");
    ic.$inject = [ "$provide", "$$sanitizeUriProvider" ];
    var ue = /^(x[\:\-_]|data[\:\-_])/i, yc = y("$interpolate"), Me = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, xe = {
        http: 80,
        https: 443,
        ftp: 21
    }, Sb = y("$location");
    Ub.prototype = Tb.prototype = Bc.prototype = {
        $$html5: !1,
        $$replace: !1,
        absUrl: sb("$$absUrl"),
        url: function(a, c) {
            if (v(a)) return this.$$url;
            var d = Me.exec(a);
            d[1] && this.path(decodeURIComponent(d[1]));
            (d[2] || d[1]) && this.search(d[3] || "");
            this.hash(d[5] || "", c);
            return this;
        },
        protocol: sb("$$protocol"),
        host: sb("$$host"),
        port: sb("$$port"),
        path: Cc("$$path", function(a) {
            return "/" == a.charAt(0) ? a : "/" + a;
        }),
        search: function(a, c) {
            switch (arguments.length) {
              case 0:
                return this.$$search;

              case 1:
                if (z(a)) this.$$search = ec(a); else if (S(a)) q(a, function(c, e) {
                    null == c && delete a[e];
                }), this.$$search = a; else throw Sb("isrcharg");
                break;

              default:
                v(c) || null === c ? delete this.$$search[a] : this.$$search[a] = c;
            }
            this.$$compose();
            return this;
        },
        hash: Cc("$$hash", Ga),
        replace: function() {
            this.$$replace = !0;
            return this;
        }
    };
    var ja = y("$parse"), Fc = {}, va, Ne = Function.prototype.call, Oe = Function.prototype.apply, Qc = Function.prototype.bind, db = {
        "null": function() {
            return null;
        },
        "true": function() {
            return !0;
        },
        "false": function() {
            return !1;
        },
        undefined: D,
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
        "=": D,
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
    }, Pe = {
        n: "\n",
        f: "\f",
        r: "\r",
        t: "	",
        v: "",
        "'": "'",
        '"': '"'
    }, Wb = function(a) {
        this.options = a;
    };
    Wb.prototype = {
        constructor: Wb,
        lex: function(a) {
            this.text = a;
            this.index = 0;
            this.ch = s;
            this.lastCh = ":";
            for (this.tokens = []; this.index < this.text.length; ) {
                this.ch = this.text.charAt(this.index);
                if (this.is("\"'")) this.readString(this.ch); else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek())) this.readNumber(); else if (this.isIdent(this.ch)) this.readIdent(); else if (this.is("(){}[].,;:?")) this.tokens.push({
                    index: this.index,
                    text: this.ch
                }), this.index++; else if (this.isWhitespace(this.ch)) {
                    this.index++;
                    continue;
                } else {
                    a = this.ch + this.peek();
                    var c = a + this.peek(2), d = db[this.ch], e = db[a], f = db[c];
                    f ? (this.tokens.push({
                        index: this.index,
                        text: c,
                        fn: f
                    }), this.index += 3) : e ? (this.tokens.push({
                        index: this.index,
                        text: a,
                        fn: e
                    }), this.index += 2) : d ? (this.tokens.push({
                        index: this.index,
                        text: this.ch,
                        fn: d
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
            throw ja("lexerr", a, c, this.text);
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
                literal: !0,
                constant: !0,
                fn: function() {
                    return a;
                }
            });
        },
        readIdent: function() {
            for (var a = this, c = "", d = this.index, e, f, g, k; this.index < this.text.length; ) {
                k = this.text.charAt(this.index);
                if ("." === k || this.isIdent(k) || this.isNumber(k)) "." === k && (e = this.index), 
                c += k; else break;
                this.index++;
            }
            if (e) for (f = this.index; f < this.text.length; ) {
                k = this.text.charAt(f);
                if ("(" === k) {
                    g = c.substr(e - d + 1);
                    c = c.substr(0, e - d);
                    this.index = f;
                    break;
                }
                if (this.isWhitespace(k)) f++; else break;
            }
            d = {
                index: d,
                text: c
            };
            if (db.hasOwnProperty(c)) d.fn = db[c], d.literal = !0, d.constant = !0; else {
                var m = Ec(c, this.options, this.text);
                d.fn = F(function(a, c) {
                    return m(a, c);
                }, {
                    assign: function(d, e) {
                        return tb(d, c, e, a.text, a.options);
                    }
                });
            }
            this.tokens.push(d);
            g && (this.tokens.push({
                index: e,
                text: "."
            }), this.tokens.push({
                index: e + 1,
                text: g
            }));
        },
        readString: function(a) {
            var c = this.index;
            this.index++;
            for (var d = "", e = a, f = !1; this.index < this.text.length; ) {
                var g = this.text.charAt(this.index), e = e + g;
                if (f) "u" === g ? (f = this.text.substring(this.index + 1, this.index + 5), f.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + f + "]"), 
                this.index += 4, d += String.fromCharCode(parseInt(f, 16))) : d += Pe[g] || g, f = !1; else if ("\\" === g) f = !0; else {
                    if (g === a) {
                        this.index++;
                        this.tokens.push({
                            index: c,
                            text: e,
                            string: d,
                            literal: !0,
                            constant: !0,
                            fn: function() {
                                return d;
                            }
                        });
                        return;
                    }
                    d += g;
                }
                this.index++;
            }
            this.throwError("Unterminated quote", c);
        }
    };
    var cb = function(a, c, d) {
        this.lexer = a;
        this.$filter = c;
        this.options = d;
    };
    cb.ZERO = F(function() {
        return 0;
    }, {
        constant: !0
    });
    cb.prototype = {
        constructor: cb,
        parse: function(a) {
            this.text = a;
            this.tokens = this.lexer.lex(a);
            a = this.statements();
            0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]);
            a.literal = !!a.literal;
            a.constant = !!a.constant;
            return a;
        },
        primary: function() {
            var a;
            if (this.expect("(")) a = this.filterChain(), this.consume(")"); else if (this.expect("[")) a = this.arrayDeclaration(); else if (this.expect("{")) a = this.object(); else {
                var c = this.expect();
                (a = c.fn) || this.throwError("not a primary expression", c);
                a.literal = !!c.literal;
                a.constant = !!c.constant;
            }
            for (var d; c = this.expect("(", "[", "."); ) "(" === c.text ? (a = this.functionCall(a, d), 
            d = null) : "[" === c.text ? (d = a, a = this.objectIndex(a)) : "." === c.text ? (d = a, 
            a = this.fieldAccess(a)) : this.throwError("IMPOSSIBLE");
            return a;
        },
        throwError: function(a, c) {
            throw ja("syntax", c.text, a, c.index + 1, this.text, this.text.substring(c.index));
        },
        peekToken: function() {
            if (0 === this.tokens.length) throw ja("ueoe", this.text);
            return this.tokens[0];
        },
        peek: function(a, c, d, e) {
            if (0 < this.tokens.length) {
                var f = this.tokens[0], g = f.text;
                if (g === a || g === c || g === d || g === e || !(a || c || d || e)) return f;
            }
            return !1;
        },
        expect: function(a, c, d, e) {
            return (a = this.peek(a, c, d, e)) ? (this.tokens.shift(), a) : !1;
        },
        consume: function(a) {
            this.expect(a) || this.throwError("is unexpected, expecting [" + a + "]", this.peek());
        },
        unaryFn: function(a, c) {
            return F(function(d, e) {
                return a(d, e, c);
            }, {
                constant: c.constant
            });
        },
        ternaryFn: function(a, c, d) {
            return F(function(e, f) {
                return a(e, f) ? c(e, f) : d(e, f);
            }, {
                constant: a.constant && c.constant && d.constant
            });
        },
        binaryFn: function(a, c, d) {
            return F(function(e, f) {
                return c(e, f, a, d);
            }, {
                constant: a.constant && d.constant
            });
        },
        statements: function() {
            for (var a = []; ;) if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && a.push(this.filterChain()), 
            !this.expect(";")) return 1 === a.length ? a[0] : function(c, d) {
                for (var e, f = 0; f < a.length; f++) {
                    var g = a[f];
                    g && (e = g(c, d));
                }
                return e;
            };
        },
        filterChain: function() {
            for (var a = this.expression(), c; ;) if (c = this.expect("|")) a = this.binaryFn(a, c.fn, this.filter()); else return a;
        },
        filter: function() {
            for (var a = this.expect(), c = this.$filter(a.text), d = []; ;) if (a = this.expect(":")) d.push(this.expression()); else {
                var e = function(a, e, k) {
                    k = [ k ];
                    for (var m = 0; m < d.length; m++) k.push(d[m](a, e));
                    return c.apply(a, k);
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
            c = this.ternary(), function(d, f) {
                return a.assign(d, c(d, f), f);
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
            return this.expect("+") ? this.primary() : (a = this.expect("-")) ? this.binaryFn(cb.ZERO, a.fn, this.unary()) : (a = this.expect("!")) ? this.unaryFn(a.fn, this.unary()) : this.primary();
        },
        fieldAccess: function(a) {
            var c = this, d = this.expect().text, e = Ec(d, this.options, this.text);
            return F(function(c, d, k) {
                return e(k || a(c, d));
            }, {
                assign: function(e, g, k) {
                    return tb(a(e, k), d, g, c.text, c.options);
                }
            });
        },
        objectIndex: function(a) {
            var c = this, d = this.expression();
            this.consume("]");
            return F(function(e, f) {
                var g = a(e, f), k = d(e, f), m;
                qa(k, c.text);
                if (!g) return s;
                (g = Na(g[k], c.text)) && (g.then && c.options.unwrapPromises) && (m = g, "$$v" in g || (m.$$v = s, 
                m.then(function(a) {
                    m.$$v = a;
                })), g = g.$$v);
                return g;
            }, {
                assign: function(e, f, g) {
                    var k = d(e, g);
                    return Na(a(e, g), c.text)[k] = f;
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
            return function(f, g) {
                for (var k = [], m = c ? c(f, g) : f, h = 0; h < d.length; h++) k.push(d[h](f, g));
                h = a(f, g, m) || D;
                Na(m, e.text);
                var l = e.text;
                if (h) {
                    if (h.constructor === h) throw ja("isecfn", l);
                    if (h === Ne || h === Oe || Qc && h === Qc) throw ja("isecff", l);
                }
                k = h.apply ? h.apply(m, k) : h(k[0], k[1], k[2], k[3], k[4]);
                return Na(k, e.text);
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
            return F(function(c, d) {
                for (var g = [], k = 0; k < a.length; k++) g.push(a[k](c, d));
                return g;
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
            return F(function(c, d) {
                for (var e = {}, m = 0; m < a.length; m++) {
                    var h = a[m];
                    e[h.key] = h.value(c, d);
                }
                return e;
            }, {
                literal: !0,
                constant: c
            });
        }
    };
    var Vb = {}, wa = y("$sce"), fa = {
        HTML: "html",
        CSS: "css",
        URL: "url",
        RESOURCE_URL: "resourceUrl",
        JS: "js"
    }, V = W.createElement("a"), Hc = ua(P.location.href, !0);
    mc.$inject = [ "$provide" ];
    Ic.$inject = [ "$locale" ];
    Kc.$inject = [ "$locale" ];
    var Nc = ".", He = {
        yyyy: Y("FullYear", 4),
        yy: Y("FullYear", 2, 0, !0),
        y: Y("FullYear", 1),
        MMMM: ub("Month"),
        MMM: ub("Month", !0),
        MM: Y("Month", 2, 1),
        M: Y("Month", 1, 1),
        dd: Y("Date", 2),
        d: Y("Date", 1),
        HH: Y("Hours", 2),
        H: Y("Hours", 1),
        hh: Y("Hours", 2, -12),
        h: Y("Hours", 1, -12),
        mm: Y("Minutes", 2),
        m: Y("Minutes", 1),
        ss: Y("Seconds", 2),
        s: Y("Seconds", 1),
        sss: Y("Milliseconds", 3),
        EEEE: ub("Day"),
        EEE: ub("Day", !0),
        a: function(a, c) {
            return 12 > a.getHours() ? c.AMPMS[0] : c.AMPMS[1];
        },
        Z: function(a) {
            a = -1 * a.getTimezoneOffset();
            return a = (0 <= a ? "+" : "") + (Xb(Math[0 < a ? "floor" : "ceil"](a / 60), 2) + Xb(Math.abs(a % 60), 2));
        }
    }, Ge = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, Fe = /^\-?\d+$/;
    Jc.$inject = [ "$locale" ];
    var De = $(K), Ee = $(Ia);
    Lc.$inject = [ "$parse" ];
    var dd = $({
        restrict: "E",
        compile: function(a, c) {
            8 >= Q && (c.href || c.name || c.$set("href", ""), a.append(W.createComment("IE fix")));
            if (!c.href && !c.xlinkHref && !c.name) return function(a, c) {
                var f = "[object SVGAnimatedString]" === ya.call(c.prop("href")) ? "xlink:href" : "href";
                c.on("click", function(a) {
                    c.attr(f) || a.preventDefault();
                });
            };
        }
    }), Fb = {};
    q(nb, function(a, c) {
        if ("multiple" != a) {
            var d = ma("ng-" + c);
            Fb[d] = function() {
                return {
                    priority: 100,
                    link: function(a, f, g) {
                        a.$watch(g[d], function(a) {
                            g.$set(c, !!a);
                        });
                    }
                };
            };
        }
    });
    q([ "src", "srcset", "href" ], function(a) {
        var c = ma("ng-" + a);
        Fb[c] = function() {
            return {
                priority: 99,
                link: function(d, e, f) {
                    var g = a, k = a;
                    "href" === a && "[object SVGAnimatedString]" === ya.call(e.prop("href")) && (k = "xlinkHref", 
                    f.$attr[k] = "xlink:href", g = null);
                    f.$observe(c, function(a) {
                        a && (f.$set(k, a), Q && g && e.prop(g, f[k]));
                    });
                }
            };
        };
    });
    var xb = {
        $addControl: D,
        $removeControl: D,
        $setValidity: D,
        $setDirty: D,
        $setPristine: D
    };
    Oc.$inject = [ "$element", "$attrs", "$scope", "$animate" ];
    var Rc = function(a) {
        return [ "$timeout", function(c) {
            return {
                name: "form",
                restrict: a ? "EAC" : "E",
                controller: Oc,
                compile: function() {
                    return {
                        pre: function(a, e, f, g) {
                            if (!f.action) {
                                var k = function(a) {
                                    a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                                };
                                rb(e[0], "submit", k);
                                e.on("$destroy", function() {
                                    c(function() {
                                        Ya(e[0], "submit", k);
                                    }, 0, !1);
                                });
                            }
                            var m = e.parent().controller("form"), h = f.name || f.ngForm;
                            h && tb(a, h, g, h);
                            if (m) e.on("$destroy", function() {
                                m.$removeControl(g);
                                h && tb(a, h, s, h);
                                F(g, xb);
                            });
                        }
                    };
                }
            };
        } ];
    }, ed = Rc(), rd = Rc(!0), Qe = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, Re = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, Se = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, Sc = {
        text: zb,
        number: function(a, c, d, e, f, g) {
            zb(a, c, d, e, f, g);
            e.$parsers.push(function(a) {
                var c = e.$isEmpty(a);
                if (c || Se.test(a)) return e.$setValidity("number", !0), "" === a ? null : c ? a : parseFloat(a);
                e.$setValidity("number", !1);
                return s;
            });
            Ie(e, "number", Te, null, e.$$validityState);
            e.$formatters.push(function(a) {
                return e.$isEmpty(a) ? "" : "" + a;
            });
            d.min && (a = function(a) {
                var c = parseFloat(d.min);
                return ra(e, "min", e.$isEmpty(a) || a >= c, a);
            }, e.$parsers.push(a), e.$formatters.push(a));
            d.max && (a = function(a) {
                var c = parseFloat(d.max);
                return ra(e, "max", e.$isEmpty(a) || a <= c, a);
            }, e.$parsers.push(a), e.$formatters.push(a));
            e.$formatters.push(function(a) {
                return ra(e, "number", e.$isEmpty(a) || Ab(a), a);
            });
        },
        url: function(a, c, d, e, f, g) {
            zb(a, c, d, e, f, g);
            a = function(a) {
                return ra(e, "url", e.$isEmpty(a) || Qe.test(a), a);
            };
            e.$formatters.push(a);
            e.$parsers.push(a);
        },
        email: function(a, c, d, e, f, g) {
            zb(a, c, d, e, f, g);
            a = function(a) {
                return ra(e, "email", e.$isEmpty(a) || Re.test(a), a);
            };
            e.$formatters.push(a);
            e.$parsers.push(a);
        },
        radio: function(a, c, d, e) {
            v(d.name) && c.attr("name", fb());
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
            var f = d.ngTrueValue, g = d.ngFalseValue;
            z(f) || (f = !0);
            z(g) || (g = !1);
            c.on("click", function() {
                a.$apply(function() {
                    e.$setViewValue(c[0].checked);
                });
            });
            e.$render = function() {
                c[0].checked = e.$viewValue;
            };
            e.$isEmpty = function(a) {
                return a !== f;
            };
            e.$formatters.push(function(a) {
                return a === f;
            });
            e.$parsers.push(function(a) {
                return a ? f : g;
            });
        },
        hidden: D,
        button: D,
        submit: D,
        reset: D,
        file: D
    }, Te = [ "badInput" ], jc = [ "$browser", "$sniffer", function(a, c) {
        return {
            restrict: "E",
            require: "?ngModel",
            link: function(d, e, f, g) {
                g && (Sc[K(f.type)] || Sc.text)(d, e, f, g, c, a);
            }
        };
    } ], wb = "ng-valid", vb = "ng-invalid", Oa = "ng-pristine", yb = "ng-dirty", Ue = [ "$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", function(a, c, d, e, f, g) {
        function k(a, c) {
            c = c ? "-" + jb(c, "-") : "";
            g.removeClass(e, (a ? vb : wb) + c);
            g.addClass(e, (a ? wb : vb) + c);
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
        var m = f(d.ngModel), h = m.assign;
        if (!h) throw y("ngModel")("nonassign", d.ngModel, ha(e));
        this.$render = D;
        this.$isEmpty = function(a) {
            return v(a) || "" === a || null === a || a !== a;
        };
        var l = e.inheritedData("$formController") || xb, p = 0, n = this.$error = {};
        e.addClass(Oa);
        k(!0);
        this.$setValidity = function(a, c) {
            n[a] !== !c && (c ? (n[a] && p--, p || (k(!0), this.$valid = !0, this.$invalid = !1)) : (k(!1), 
            this.$invalid = !0, this.$valid = !1, p++), n[a] = !c, k(c, a), l.$setValidity(a, c, this));
        };
        this.$setPristine = function() {
            this.$dirty = !1;
            this.$pristine = !0;
            g.removeClass(e, yb);
            g.addClass(e, Oa);
        };
        this.$setViewValue = function(d) {
            this.$viewValue = d;
            this.$pristine && (this.$dirty = !0, this.$pristine = !1, g.removeClass(e, Oa), 
            g.addClass(e, yb), l.$setDirty());
            q(this.$parsers, function(a) {
                d = a(d);
            });
            this.$modelValue !== d && (this.$modelValue = d, h(a, d), q(this.$viewChangeListeners, function(a) {
                try {
                    a();
                } catch (d) {
                    c(d);
                }
            }));
        };
        var r = this;
        a.$watch(function() {
            var c = m(a);
            if (r.$modelValue !== c) {
                var d = r.$formatters, e = d.length;
                for (r.$modelValue = c; e--; ) c = d[e](c);
                r.$viewValue !== c && (r.$viewValue = c, r.$render());
            }
            return c;
        });
    } ], Gd = function() {
        return {
            require: [ "ngModel", "^?form" ],
            controller: Ue,
            link: function(a, c, d, e) {
                var f = e[0], g = e[1] || xb;
                g.$addControl(f);
                a.$on("$destroy", function() {
                    g.$removeControl(f);
                });
            }
        };
    }, Id = $({
        require: "ngModel",
        link: function(a, c, d, e) {
            e.$viewChangeListeners.push(function() {
                a.$eval(d.ngChange);
            });
        }
    }), kc = function() {
        return {
            require: "?ngModel",
            link: function(a, c, d, e) {
                if (e) {
                    d.required = !0;
                    var f = function(a) {
                        if (d.required && e.$isEmpty(a)) e.$setValidity("required", !1); else return e.$setValidity("required", !0), 
                        a;
                    };
                    e.$formatters.push(f);
                    e.$parsers.unshift(f);
                    d.$observe("required", function() {
                        f(e.$viewValue);
                    });
                }
            }
        };
    }, Hd = function() {
        return {
            require: "ngModel",
            link: function(a, c, d, e) {
                var f = (a = /\/(.*)\//.exec(d.ngList)) && RegExp(a[1]) || d.ngList || ",";
                e.$parsers.push(function(a) {
                    if (!v(a)) {
                        var c = [];
                        a && q(a.split(f), function(a) {
                            a && c.push(aa(a));
                        });
                        return c;
                    }
                });
                e.$formatters.push(function(a) {
                    return I(a) ? a.join(", ") : s;
                });
                e.$isEmpty = function(a) {
                    return !a || !a.length;
                };
            }
        };
    }, Ve = /^(true|false|\d+)$/, Jd = function() {
        return {
            priority: 100,
            compile: function(a, c) {
                return Ve.test(c.ngValue) ? function(a, c, f) {
                    f.$set("value", a.$eval(f.ngValue));
                } : function(a, c, f) {
                    a.$watch(f.ngValue, function(a) {
                        f.$set("value", a);
                    });
                };
            }
        };
    }, jd = xa({
        compile: function(a) {
            a.addClass("ng-binding");
            return function(a, d, e) {
                d.data("$binding", e.ngBind);
                a.$watch(e.ngBind, function(a) {
                    d.text(a == s ? "" : a);
                });
            };
        }
    }), ld = [ "$interpolate", function(a) {
        return function(c, d, e) {
            c = a(d.attr(e.$attr.ngBindTemplate));
            d.addClass("ng-binding").data("$binding", c);
            e.$observe("ngBindTemplate", function(a) {
                d.text(a);
            });
        };
    } ], kd = [ "$sce", "$parse", function(a, c) {
        return {
            compile: function(d) {
                d.addClass("ng-binding");
                return function(d, f, g) {
                    f.data("$binding", g.ngBindHtml);
                    var k = c(g.ngBindHtml);
                    d.$watch(function() {
                        return (k(d) || "").toString();
                    }, function(c) {
                        f.html(a.getTrustedHtml(k(d)) || "");
                    });
                };
            }
        };
    } ], md = Yb("", !0), od = Yb("Odd", 0), nd = Yb("Even", 1), pd = xa({
        compile: function(a, c) {
            c.$set("ngCloak", s);
            a.removeClass("ng-cloak");
        }
    }), qd = [ function() {
        return {
            scope: !0,
            controller: "@",
            priority: 500
        };
    } ], lc = {};
    q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(a) {
        var c = ma("ng-" + a);
        lc[c] = [ "$parse", function(d) {
            return {
                compile: function(e, f) {
                    var g = d(f[c]);
                    return function(c, d) {
                        d.on(K(a), function(a) {
                            c.$apply(function() {
                                g(c, {
                                    $event: a
                                });
                            });
                        });
                    };
                }
            };
        } ];
    });
    var td = [ "$animate", function(a) {
        return {
            transclude: "element",
            priority: 600,
            terminal: !0,
            restrict: "A",
            $$tlb: !0,
            link: function(c, d, e, f, g) {
                var k, m, h;
                c.$watch(e.ngIf, function(f) {
                    Sa(f) ? m || (m = c.$new(), g(m, function(c) {
                        c[c.length++] = W.createComment(" end ngIf: " + e.ngIf + " ");
                        k = {
                            clone: c
                        };
                        a.enter(c, d.parent(), d);
                    })) : (h && (h.remove(), h = null), m && (m.$destroy(), m = null), k && (h = Eb(k.clone), 
                    a.leave(h, function() {
                        h = null;
                    }), k = null));
                });
            }
        };
    } ], ud = [ "$http", "$templateCache", "$anchorScroll", "$animate", "$sce", function(a, c, d, e, f) {
        return {
            restrict: "ECA",
            priority: 400,
            terminal: !0,
            transclude: "element",
            controller: Ta.noop,
            compile: function(g, k) {
                var m = k.ngInclude || k.src, h = k.onload || "", l = k.autoscroll;
                return function(g, k, r, q, L) {
                    var w = 0, u, s, x, A = function() {
                        s && (s.remove(), s = null);
                        u && (u.$destroy(), u = null);
                        x && (e.leave(x, function() {
                            s = null;
                        }), s = x, x = null);
                    };
                    g.$watch(f.parseAsResourceUrl(m), function(f) {
                        var m = function() {
                            !B(l) || l && !g.$eval(l) || d();
                        }, r = ++w;
                        f ? (a.get(f, {
                            cache: c
                        }).success(function(a) {
                            if (r === w) {
                                var c = g.$new();
                                q.template = a;
                                a = L(c, function(a) {
                                    A();
                                    e.enter(a, null, k, m);
                                });
                                u = c;
                                x = a;
                                u.$emit("$includeContentLoaded");
                                g.$eval(h);
                            }
                        }).error(function() {
                            r === w && A();
                        }), g.$emit("$includeContentRequested")) : (A(), q.template = null);
                    });
                };
            }
        };
    } ], Kd = [ "$compile", function(a) {
        return {
            restrict: "ECA",
            priority: -400,
            require: "ngInclude",
            link: function(c, d, e, f) {
                d.html(f.template);
                a(d.contents())(c);
            }
        };
    } ], vd = xa({
        priority: 450,
        compile: function() {
            return {
                pre: function(a, c, d) {
                    a.$eval(d.ngInit);
                }
            };
        }
    }), wd = xa({
        terminal: !0,
        priority: 1e3
    }), xd = [ "$locale", "$interpolate", function(a, c) {
        var d = /{}/g;
        return {
            restrict: "EA",
            link: function(e, f, g) {
                var k = g.count, m = g.$attr.when && f.attr(g.$attr.when), h = g.offset || 0, l = e.$eval(m) || {}, p = {}, n = c.startSymbol(), r = c.endSymbol(), t = /^when(Minus)?(.+)$/;
                q(g, function(a, c) {
                    t.test(c) && (l[K(c.replace("when", "").replace("Minus", "-"))] = f.attr(g.$attr[c]));
                });
                q(l, function(a, e) {
                    p[e] = c(a.replace(d, n + k + "-" + h + r));
                });
                e.$watch(function() {
                    var c = parseFloat(e.$eval(k));
                    if (isNaN(c)) return "";
                    c in l || (c = a.pluralCat(c - h));
                    return p[c](e, f, !0);
                }, function(a) {
                    f.text(a);
                });
            }
        };
    } ], yd = [ "$parse", "$animate", function(a, c) {
        var d = y("ngRepeat");
        return {
            transclude: "element",
            priority: 1e3,
            terminal: !0,
            $$tlb: !0,
            link: function(e, f, g, k, m) {
                var h = g.ngRepeat, l = h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/), p, n, r, t, s, w, u = {
                    $id: Ka
                };
                if (!l) throw d("iexp", h);
                g = l[1];
                k = l[2];
                (l = l[3]) ? (p = a(l), n = function(a, c, d) {
                    w && (u[w] = a);
                    u[s] = c;
                    u.$index = d;
                    return p(e, u);
                }) : (r = function(a, c) {
                    return Ka(c);
                }, t = function(a) {
                    return a;
                });
                l = g.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
                if (!l) throw d("iidexp", g);
                s = l[3] || l[1];
                w = l[2];
                var B = {};
                e.$watchCollection(k, function(a) {
                    var g, k, l = f[0], p, u = {}, y, E, H, z, D, v, I = [];
                    if (eb(a)) D = a, p = n || r; else {
                        p = n || t;
                        D = [];
                        for (H in a) a.hasOwnProperty(H) && "$" != H.charAt(0) && D.push(H);
                        D.sort();
                    }
                    y = D.length;
                    k = I.length = D.length;
                    for (g = 0; g < k; g++) if (H = a === D ? g : D[g], z = a[H], z = p(H, z, g), Ca(z, "`track by` id"), 
                    B.hasOwnProperty(z)) v = B[z], delete B[z], u[z] = v, I[g] = v; else {
                        if (u.hasOwnProperty(z)) throw q(I, function(a) {
                            a && a.scope && (B[a.id] = a);
                        }), d("dupes", h, z);
                        I[g] = {
                            id: z
                        };
                        u[z] = !1;
                    }
                    for (H in B) B.hasOwnProperty(H) && (v = B[H], g = Eb(v.clone), c.leave(g), q(g, function(a) {
                        a.$$NG_REMOVED = !0;
                    }), v.scope.$destroy());
                    g = 0;
                    for (k = D.length; g < k; g++) {
                        H = a === D ? g : D[g];
                        z = a[H];
                        v = I[g];
                        I[g - 1] && (l = I[g - 1].clone[I[g - 1].clone.length - 1]);
                        if (v.scope) {
                            E = v.scope;
                            p = l;
                            do p = p.nextSibling; while (p && p.$$NG_REMOVED);
                            v.clone[0] != p && c.move(Eb(v.clone), null, x(l));
                            l = v.clone[v.clone.length - 1];
                        } else E = e.$new();
                        E[s] = z;
                        w && (E[w] = H);
                        E.$index = g;
                        E.$first = 0 === g;
                        E.$last = g === y - 1;
                        E.$middle = !(E.$first || E.$last);
                        E.$odd = !(E.$even = 0 === (g & 1));
                        v.scope || m(E, function(a) {
                            a[a.length++] = W.createComment(" end ngRepeat: " + h + " ");
                            c.enter(a, null, x(l));
                            l = a;
                            v.scope = E;
                            v.clone = a;
                            u[v.id] = v;
                        });
                    }
                    B = u;
                });
            }
        };
    } ], zd = [ "$animate", function(a) {
        return function(c, d, e) {
            c.$watch(e.ngShow, function(c) {
                a[Sa(c) ? "removeClass" : "addClass"](d, "ng-hide");
            });
        };
    } ], sd = [ "$animate", function(a) {
        return function(c, d, e) {
            c.$watch(e.ngHide, function(c) {
                a[Sa(c) ? "addClass" : "removeClass"](d, "ng-hide");
            });
        };
    } ], Ad = xa(function(a, c, d) {
        a.$watch(d.ngStyle, function(a, d) {
            d && a !== d && q(d, function(a, d) {
                c.css(d, "");
            });
            a && c.css(a);
        }, !0);
    }), Bd = [ "$animate", function(a) {
        return {
            restrict: "EA",
            require: "ngSwitch",
            controller: [ "$scope", function() {
                this.cases = {};
            } ],
            link: function(c, d, e, f) {
                var g = [], k = [], m = [], h = [];
                c.$watch(e.ngSwitch || e.on, function(d) {
                    var p, n;
                    p = 0;
                    for (n = m.length; p < n; ++p) m[p].remove();
                    p = m.length = 0;
                    for (n = h.length; p < n; ++p) {
                        var r = k[p];
                        h[p].$destroy();
                        m[p] = r;
                        a.leave(r, function() {
                            m.splice(p, 1);
                        });
                    }
                    k.length = 0;
                    h.length = 0;
                    if (g = f.cases["!" + d] || f.cases["?"]) c.$eval(e.change), q(g, function(d) {
                        var e = c.$new();
                        h.push(e);
                        d.transclude(e, function(c) {
                            var e = d.element;
                            k.push(c);
                            a.enter(c, e.parent(), e);
                        });
                    });
                });
            }
        };
    } ], Cd = xa({
        transclude: "element",
        priority: 800,
        require: "^ngSwitch",
        link: function(a, c, d, e, f) {
            e.cases["!" + d.ngSwitchWhen] = e.cases["!" + d.ngSwitchWhen] || [];
            e.cases["!" + d.ngSwitchWhen].push({
                transclude: f,
                element: c
            });
        }
    }), Dd = xa({
        transclude: "element",
        priority: 800,
        require: "^ngSwitch",
        link: function(a, c, d, e, f) {
            e.cases["?"] = e.cases["?"] || [];
            e.cases["?"].push({
                transclude: f,
                element: c
            });
        }
    }), Fd = xa({
        link: function(a, c, d, e, f) {
            if (!f) throw y("ngTransclude")("orphan", ha(c));
            f(function(a) {
                c.empty();
                c.append(a);
            });
        }
    }), fd = [ "$templateCache", function(a) {
        return {
            restrict: "E",
            terminal: !0,
            compile: function(c, d) {
                "text/ng-template" == d.type && a.put(d.id, c[0].text);
            }
        };
    } ], We = y("ngOptions"), Ed = $({
        terminal: !0
    }), gd = [ "$compile", "$parse", function(a, c) {
        var d = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, e = {
            $setViewValue: D
        };
        return {
            restrict: "E",
            require: [ "select", "?ngModel" ],
            controller: [ "$element", "$scope", "$attrs", function(a, c, d) {
                var m = this, h = {}, l = e, p;
                m.databound = d.ngModel;
                m.init = function(a, c, d) {
                    l = a;
                    p = d;
                };
                m.addOption = function(c) {
                    Ca(c, '"option value"');
                    h[c] = !0;
                    l.$viewValue == c && (a.val(c), p.parent() && p.remove());
                };
                m.removeOption = function(a) {
                    this.hasOption(a) && (delete h[a], l.$viewValue == a && this.renderUnknownOption(a));
                };
                m.renderUnknownOption = function(c) {
                    c = "? " + Ka(c) + " ?";
                    p.val(c);
                    a.prepend(p);
                    a.val(c);
                    p.prop("selected", !0);
                };
                m.hasOption = function(a) {
                    return h.hasOwnProperty(a);
                };
                c.$on("$destroy", function() {
                    m.renderUnknownOption = D;
                });
            } ],
            link: function(e, g, k, m) {
                function h(a, c, d, e) {
                    d.$render = function() {
                        var a = d.$viewValue;
                        e.hasOption(a) ? (y.parent() && y.remove(), c.val(a), "" === a && w.prop("selected", !0)) : v(a) && w ? c.val("") : e.renderUnknownOption(a);
                    };
                    c.on("change", function() {
                        a.$apply(function() {
                            y.parent() && y.remove();
                            d.$setViewValue(c.val());
                        });
                    });
                }
                function l(a, c, d) {
                    var e;
                    d.$render = function() {
                        var a = new $a(d.$viewValue);
                        q(c.find("option"), function(c) {
                            c.selected = B(a.get(c.value));
                        });
                    };
                    a.$watch(function() {
                        za(e, d.$viewValue) || (e = ga(d.$viewValue), d.$render());
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
                function p(e, f, g) {
                    function k() {
                        var a = {
                            "": []
                        }, c = [ "" ], d, h, s, t, v;
                        t = g.$modelValue;
                        v = x(e) || [];
                        var A = n ? Zb(v) : v, E, N, C;
                        N = {};
                        s = !1;
                        var F, K;
                        if (r) if (w && I(t)) for (s = new $a([]), C = 0; C < t.length; C++) N[m] = t[C], 
                        s.put(w(e, N), t[C]); else s = new $a(t);
                        for (C = 0; E = A.length, C < E; C++) {
                            h = C;
                            if (n) {
                                h = A[C];
                                if ("$" === h.charAt(0)) continue;
                                N[n] = h;
                            }
                            N[m] = v[h];
                            d = p(e, N) || "";
                            (h = a[d]) || (h = a[d] = [], c.push(d));
                            r ? d = B(s.remove(w ? w(e, N) : q(e, N))) : (w ? (d = {}, d[m] = t, d = w(e, d) === w(e, N)) : d = t === q(e, N), 
                            s = s || d);
                            F = l(e, N);
                            F = B(F) ? F : "";
                            h.push({
                                id: w ? w(e, N) : n ? A[C] : C,
                                label: F,
                                selected: d
                            });
                        }
                        r || (z || null === t ? a[""].unshift({
                            id: "",
                            label: "",
                            selected: !s
                        }) : s || a[""].unshift({
                            id: "?",
                            label: "",
                            selected: !0
                        }));
                        N = 0;
                        for (A = c.length; N < A; N++) {
                            d = c[N];
                            h = a[d];
                            y.length <= N ? (t = {
                                element: D.clone().attr("label", d),
                                label: h.label
                            }, v = [ t ], y.push(v), f.append(t.element)) : (v = y[N], t = v[0], t.label != d && t.element.attr("label", t.label = d));
                            F = null;
                            C = 0;
                            for (E = h.length; C < E; C++) s = h[C], (d = v[C + 1]) ? (F = d.element, d.label !== s.label && F.text(d.label = s.label), 
                            d.id !== s.id && F.val(d.id = s.id), d.selected !== s.selected && (F.prop("selected", d.selected = s.selected), 
                            Q && F.prop("selected", d.selected))) : ("" === s.id && z ? K = z : (K = u.clone()).val(s.id).prop("selected", s.selected).text(s.label), 
                            v.push({
                                element: K,
                                label: s.label,
                                id: s.id,
                                selected: s.selected
                            }), F ? F.after(K) : t.element.append(K), F = K);
                            for (C++; v.length > C; ) v.pop().element.remove();
                        }
                        for (;y.length > N; ) y.pop()[0].element.remove();
                    }
                    var h;
                    if (!(h = t.match(d))) throw We("iexp", t, ha(f));
                    var l = c(h[2] || h[1]), m = h[4] || h[6], n = h[5], p = c(h[3] || ""), q = c(h[2] ? h[1] : m), x = c(h[7]), w = h[8] ? c(h[8]) : null, y = [ [ {
                        element: f,
                        label: ""
                    } ] ];
                    z && (a(z)(e), z.removeClass("ng-scope"), z.remove());
                    f.empty();
                    f.on("change", function() {
                        e.$apply(function() {
                            var a, c = x(e) || [], d = {}, h, k, l, p, t, u, v;
                            if (r) for (k = [], p = 0, u = y.length; p < u; p++) for (a = y[p], l = 1, t = a.length; l < t; l++) {
                                if ((h = a[l].element)[0].selected) {
                                    h = h.val();
                                    n && (d[n] = h);
                                    if (w) for (v = 0; v < c.length && (d[m] = c[v], w(e, d) != h); v++) ; else d[m] = c[h];
                                    k.push(q(e, d));
                                }
                            } else {
                                h = f.val();
                                if ("?" == h) k = s; else if ("" === h) k = null; else if (w) for (v = 0; v < c.length; v++) {
                                    if (d[m] = c[v], w(e, d) == h) {
                                        k = q(e, d);
                                        break;
                                    }
                                } else d[m] = c[h], n && (d[n] = h), k = q(e, d);
                                1 < y[0].length && y[0][1].id !== h && (y[0][1].selected = !1);
                            }
                            g.$setViewValue(k);
                        });
                    });
                    g.$render = k;
                    e.$watch(k);
                }
                if (m[1]) {
                    var n = m[0];
                    m = m[1];
                    var r = k.multiple, t = k.ngOptions, z = !1, w, u = x(W.createElement("option")), D = x(W.createElement("optgroup")), y = u.clone();
                    k = 0;
                    for (var A = g.children(), C = A.length; k < C; k++) if ("" === A[k].value) {
                        w = z = A.eq(k);
                        break;
                    }
                    n.init(m, z, y);
                    r && (m.$isEmpty = function(a) {
                        return !a || 0 === a.length;
                    });
                    t ? p(e, g, m) : r ? l(e, g, m) : h(e, g, m, n);
                }
            }
        };
    } ], id = [ "$interpolate", function(a) {
        var c = {
            addOption: D,
            removeOption: D
        };
        return {
            restrict: "E",
            priority: 100,
            compile: function(d, e) {
                if (v(e.value)) {
                    var f = a(d.text(), !0);
                    f || e.$set("value", d.text());
                }
                return function(a, d, e) {
                    var h = d.parent(), l = h.data("$selectController") || h.parent().data("$selectController");
                    l && l.databound ? d.prop("selected", !1) : l = c;
                    f ? a.$watch(f, function(a, c) {
                        e.$set("value", a);
                        a !== c && l.removeOption(c);
                        l.addOption(a);
                    }) : l.addOption(e.value);
                    d.on("$destroy", function() {
                        l.removeOption(e.value);
                    });
                };
            }
        };
    } ], hd = $({
        restrict: "E",
        terminal: !0
    });
    P.angular.bootstrap ? console.log("WARNING: Tried to load angular more than once.") : ((Da = P.jQuery) && Da.fn.on ? (x = Da, 
    F(Da.fn, {
        scope: La.scope,
        isolateScope: La.isolateScope,
        controller: La.controller,
        injector: La.injector,
        inheritedData: La.inheritedData
    }), Gb("remove", !0, !0, !1), Gb("empty", !1, !1, !1), Gb("html", !1, !1, !0)) : x = R, 
    Ta.element = x, $c(Ta), x(W).ready(function() {
        Xc(W, fc);
    }));
})(window, document);

!window.angular.$$csp() && window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}.ng-hide-add-active,.ng-hide-remove{display:block!important;}</style>');

(function(window, angular, undefined) {
    "use strict";
    angular.module("ngAnimate", [ "ng" ]).directive("ngAnimateChildren", function() {
        var NG_ANIMATE_CHILDREN = "$$ngAnimateChildren";
        return function(scope, element, attrs) {
            var val = attrs.ngAnimateChildren;
            if (angular.isString(val) && val.length === 0) {
                element.data(NG_ANIMATE_CHILDREN, true);
            } else {
                scope.$watch(val, function(value) {
                    element.data(NG_ANIMATE_CHILDREN, !!value);
                });
            }
        };
    }).factory("$$animateReflow", [ "$$rAF", "$document", function($$rAF, $document) {
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
        var NG_ANIMATE_CHILDREN = "$$ngAnimateChildren";
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
        function prepareElement(element) {
            return element && angular.element(element);
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
            function blockElementAnimations(element) {
                var data = element.data(NG_ANIMATE_STATE) || {};
                data.running = true;
                element.data(NG_ANIMATE_STATE, data);
            }
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
                    element = angular.element(element);
                    parentElement = prepareElement(parentElement);
                    afterElement = prepareElement(afterElement);
                    blockElementAnimations(element);
                    $delegate.enter(element, parentElement, afterElement);
                    $rootScope.$$postDigest(function() {
                        element = stripCommentsFromElement(element);
                        performAnimation("enter", "ng-enter", element, parentElement, afterElement, noop, doneCallback);
                    });
                },
                leave: function(element, doneCallback) {
                    element = angular.element(element);
                    cancelChildAnimations(element);
                    blockElementAnimations(element);
                    $rootScope.$$postDigest(function() {
                        performAnimation("leave", "ng-leave", stripCommentsFromElement(element), null, null, function() {
                            $delegate.leave(element);
                        }, doneCallback);
                    });
                },
                move: function(element, parentElement, afterElement, doneCallback) {
                    element = angular.element(element);
                    parentElement = prepareElement(parentElement);
                    afterElement = prepareElement(afterElement);
                    cancelChildAnimations(element);
                    blockElementAnimations(element);
                    $delegate.move(element, parentElement, afterElement);
                    $rootScope.$$postDigest(function() {
                        element = stripCommentsFromElement(element);
                        performAnimation("move", "ng-move", element, parentElement, afterElement, noop, doneCallback);
                    });
                },
                addClass: function(element, className, doneCallback) {
                    element = angular.element(element);
                    element = stripCommentsFromElement(element);
                    performAnimation("addClass", className, element, null, null, function() {
                        $delegate.addClass(element, className);
                    }, doneCallback);
                },
                removeClass: function(element, className, doneCallback) {
                    element = angular.element(element);
                    element = stripCommentsFromElement(element);
                    performAnimation("removeClass", className, element, null, null, function() {
                        $delegate.removeClass(element, className);
                    }, doneCallback);
                },
                setClass: function(element, add, remove, doneCallback) {
                    element = angular.element(element);
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
                var skipAnimations;
                if (runner.isClassBased) {
                    skipAnimations = ngAnimateState.running || ngAnimateState.disabled || lastAnimation && !lastAnimation.isClassBased;
                }
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
                    fireDOMOperation();
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
                if (rootAnimateState.disabled) {
                    return true;
                }
                if (isMatchingElement(element, $rootElement)) {
                    return rootAnimateState.running;
                }
                var allowChildAnimations, parentRunningAnimation, hasParent;
                do {
                    if (parentElement.length === 0) break;
                    var isRoot = isMatchingElement(parentElement, $rootElement);
                    var state = isRoot ? rootAnimateState : parentElement.data(NG_ANIMATE_STATE) || {};
                    if (state.disabled) {
                        return true;
                    }
                    if (isRoot) {
                        hasParent = true;
                    }
                    if (allowChildAnimations !== false) {
                        var animateChildrenFlag = parentElement.data(NG_ANIMATE_CHILDREN);
                        if (angular.isDefined(animateChildrenFlag)) {
                            allowChildAnimations = animateChildrenFlag;
                        }
                    }
                    parentRunningAnimation = parentRunningAnimation || state.running || state.last && !state.last.isClassBased;
                } while (parentElement = parentElement.parent());
                return !hasParent || !allowChildAnimations && parentRunningAnimation;
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
                    node.setAttribute("style", oldStyle + "; " + style);
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
        templateUrl: "/frontend/template/tabs/tabset.html",
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
        templateUrl: "/frontend/template/tabs/tab.html",
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

(function(q, g, r) {
    "use strict";
    function F(a) {
        var d = [];
        t(d, g.noop).chars(a);
        return d.join("");
    }
    function m(a) {
        var d = {};
        a = a.split(",");
        var b;
        for (b = 0; b < a.length; b++) d[a[b]] = !0;
        return d;
    }
    function G(a, d) {
        function b(a, c, b, h) {
            c = g.lowercase(c);
            if (u[c]) for (;f.last() && v[f.last()]; ) e("", f.last());
            w[c] && f.last() == c && e("", c);
            (h = x[c] || !!h) || f.push(c);
            var n = {};
            b.replace(H, function(a, c, d, b, e) {
                n[c] = s(d || b || e || "");
            });
            d.start && d.start(c, n, h);
        }
        function e(a, c) {
            var b = 0, e;
            if (c = g.lowercase(c)) for (b = f.length - 1; 0 <= b && f[b] != c; b--) ;
            if (0 <= b) {
                for (e = f.length - 1; e >= b; e--) d.end && d.end(f[e]);
                f.length = b;
            }
        }
        var c, l, f = [], n = a, h;
        for (f.last = function() {
            return f[f.length - 1];
        }; a; ) {
            h = "";
            l = !0;
            if (f.last() && y[f.last()]) a = a.replace(RegExp("(.*)<\\s*\\/\\s*" + f.last() + "[^>]*>", "i"), function(c, a) {
                a = a.replace(I, "$1").replace(J, "$1");
                d.chars && d.chars(s(a));
                return "";
            }), e("", f.last()); else {
                if (0 === a.indexOf("<!--")) c = a.indexOf("--", 4), 0 <= c && a.lastIndexOf("-->", c) === c && (d.comment && d.comment(a.substring(4, c)), 
                a = a.substring(c + 3), l = !1); else if (z.test(a)) {
                    if (c = a.match(z)) a = a.replace(c[0], ""), l = !1;
                } else if (K.test(a)) {
                    if (c = a.match(A)) a = a.substring(c[0].length), c[0].replace(A, e), l = !1;
                } else L.test(a) && ((c = a.match(B)) ? (c[4] && (a = a.substring(c[0].length), 
                c[0].replace(B, b)), l = !1) : (h += "<", a = a.substring(1)));
                l && (c = a.indexOf("<"), h += 0 > c ? a : a.substring(0, c), a = 0 > c ? "" : a.substring(c), 
                d.chars && d.chars(s(h)));
            }
            if (a == n) throw M("badparse", a);
            n = a;
        }
        e();
    }
    function s(a) {
        if (!a) return "";
        var d = N.exec(a);
        a = d[1];
        var b = d[3];
        if (d = d[2]) p.innerHTML = d.replace(/</g, "&lt;"), d = "textContent" in p ? p.textContent : p.innerText;
        return a + d + b;
    }
    function C(a) {
        return a.replace(/&/g, "&amp;").replace(O, function(a) {
            var b = a.charCodeAt(0);
            a = a.charCodeAt(1);
            return "&#" + (1024 * (b - 55296) + (a - 56320) + 65536) + ";";
        }).replace(P, function(a) {
            return "&#" + a.charCodeAt(0) + ";";
        }).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function t(a, d) {
        var b = !1, e = g.bind(a, a.push);
        return {
            start: function(a, l, f) {
                a = g.lowercase(a);
                !b && y[a] && (b = a);
                b || !0 !== D[a] || (e("<"), e(a), g.forEach(l, function(b, f) {
                    var k = g.lowercase(f), l = "img" === a && "src" === k || "background" === k;
                    !0 !== Q[k] || !0 === E[k] && !d(b, l) || (e(" "), e(f), e('="'), e(C(b)), e('"'));
                }), e(f ? "/>" : ">"));
            },
            end: function(a) {
                a = g.lowercase(a);
                b || !0 !== D[a] || (e("</"), e(a), e(">"));
                a == b && (b = !1);
            },
            chars: function(a) {
                b || e(C(a));
            }
        };
    }
    var M = g.$$minErr("$sanitize"), B = /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/, A = /^<\/\s*([\w:-]+)[^>]*>/, H = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, L = /^</, K = /^<\//, I = /\x3c!--(.*?)--\x3e/g, z = /<!DOCTYPE([^>]*?)>/i, J = /<!\[CDATA\[(.*?)]]\x3e/g, O = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, P = /([^\#-~| |!])/g, x = m("area,br,col,hr,img,wbr");
    q = m("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr");
    r = m("rp,rt");
    var w = g.extend({}, r, q), u = g.extend({}, q, m("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")), v = g.extend({}, r, m("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")), y = m("script,style"), D = g.extend({}, x, u, v, w), E = m("background,cite,href,longdesc,src,usemap"), Q = g.extend({}, E, m("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width")), p = document.createElement("pre"), N = /^(\s*)([\s\S]*?)(\s*)$/;
    g.module("ngSanitize", []).provider("$sanitize", function() {
        this.$get = [ "$$sanitizeUri", function(a) {
            return function(d) {
                var b = [];
                G(d, t(b, function(b, c) {
                    return !/^unsafe/.test(a(b, c));
                }));
                return b.join("");
            };
        } ];
    });
    g.module("ngSanitize").filter("linky", [ "$sanitize", function(a) {
        var d = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>]/, b = /^mailto:/;
        return function(e, c) {
            function l(a) {
                a && k.push(F(a));
            }
            function f(a, b) {
                k.push("<a ");
                g.isDefined(c) && (k.push('target="'), k.push(c), k.push('" '));
                k.push('href="');
                k.push(a);
                k.push('">');
                l(b);
                k.push("</a>");
            }
            if (!e) return e;
            for (var n, h = e, k = [], m, p; n = h.match(d); ) m = n[0], n[2] == n[3] && (m = "mailto:" + m), 
            p = n.index, l(h.substr(0, p)), f(m, n[0].replace(b, "")), h = h.substring(p + n[0].length);
            l(h);
            return a(k.join(""));
        };
    } ]);
})(window, window.angular);

(function(n, e, A) {
    "use strict";
    function x(s, g, h) {
        return {
            restrict: "ECA",
            terminal: !0,
            priority: 400,
            transclude: "element",
            link: function(a, c, b, f, w) {
                function y() {
                    p && (p.remove(), p = null);
                    k && (k.$destroy(), k = null);
                    l && (h.leave(l, function() {
                        p = null;
                    }), p = l, l = null);
                }
                function v() {
                    var b = s.current && s.current.locals;
                    if (e.isDefined(b && b.$template)) {
                        var b = a.$new(), d = s.current;
                        l = w(b, function(d) {
                            h.enter(d, null, l || c, function() {
                                !e.isDefined(t) || t && !a.$eval(t) || g();
                            });
                            y();
                        });
                        k = d.scope = b;
                        k.$emit("$viewContentLoaded");
                        k.$eval(u);
                    } else y();
                }
                var k, l, p, t = b.autoscroll, u = b.onload || "";
                a.$on("$routeChangeSuccess", v);
                v();
            }
        };
    }
    function z(e, g, h) {
        return {
            restrict: "ECA",
            priority: -400,
            link: function(a, c) {
                var b = h.current, f = b.locals;
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
            }, h = f.keys = [];
            a = a.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function(a, e, b, c) {
                a = "?" === c ? c : null;
                c = "*" === c ? c : null;
                h.push({
                    name: b,
                    optional: !!a
                });
                e = e || "";
                return "" + (a ? "" : e) + "(?:" + (a ? e : "") + (c && "(.+?)" || "([^/]+)") + (a || "") + ")" + (a || "");
            }).replace(/([\/$\*])/g, "\\$1");
            f.regexp = RegExp("^" + a + "$", b ? "i" : "");
            return f;
        }
        var h = {};
        this.when = function(a, c) {
            h[a] = e.extend({
                reloadOnSearch: !0
            }, c, a && g(a, c));
            if (a) {
                var b = "/" == a[a.length - 1] ? a.substr(0, a.length - 1) : a + "/";
                h[b] = e.extend({
                    redirectTo: a
                }, g(b, c));
            }
            return this;
        };
        this.otherwise = function(a) {
            this.when(null, a);
            return this;
        };
        this.$get = [ "$rootScope", "$location", "$routeParams", "$q", "$injector", "$http", "$templateCache", "$sce", function(a, c, b, f, g, n, v, k) {
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
                        b = k.getTrustedResourceUrl(b), e.isDefined(b) && (d.loadedTemplateUrl = b, c = n.get(b, {
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
                e.forEach(h, function(f, h) {
                    var q;
                    if (q = !b) {
                        var g = c.path();
                        q = f.keys;
                        var l = {};
                        if (f.regexp) if (g = f.regexp.exec(g)) {
                            for (var k = 1, p = g.length; k < p; ++k) {
                                var n = q[k - 1], r = g[k];
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
                return b || h[null] && s(h[null], {
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
                routes: h,
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

function FastClick(layer, options) {
    "use strict";
    var oldOnClick;
    options = options || {};
    this.trackingClick = false;
    this.trackingClickStart = 0;
    this.targetElement = null;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.lastTouchIdentifier = 0;
    this.touchBoundary = options.touchBoundary || 10;
    this.layer = layer;
    this.tapDelay = options.tapDelay || 200;
    if (FastClick.notNeeded(layer)) {
        return;
    }
    function bind(method, context) {
        return function() {
            return method.apply(context, arguments);
        };
    }
    var methods = [ "onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel" ];
    var context = this;
    for (var i = 0, l = methods.length; i < l; i++) {
        context[methods[i]] = bind(context[methods[i]], context);
    }
    if (deviceIsAndroid) {
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

var deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0;

var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);

var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);

var deviceIsIOSWithBadTarget = deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);

var deviceIsBlackBerry10 = navigator.userAgent.indexOf("BB10") > 0;

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
        if (deviceIsIOS && target.type === "file" || target.disabled) {
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
        return !deviceIsAndroid;

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
    if (deviceIsAndroid && targetElement.tagName.toLowerCase() === "select") {
        return "mousedown";
    }
    return "click";
};

FastClick.prototype.focus = function(targetElement) {
    "use strict";
    var length;
    if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf("date") !== 0 && targetElement.type !== "time") {
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
    if (deviceIsIOS) {
        selection = window.getSelection();
        if (selection.rangeCount && !selection.isCollapsed) {
            return true;
        }
        if (!deviceIsIOS4) {
            if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
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
    if (event.timeStamp - this.lastClickTime < this.tapDelay) {
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
    if (event.timeStamp - this.lastClickTime < this.tapDelay) {
        this.cancelNextClick = true;
        return true;
    }
    this.cancelNextClick = false;
    this.lastClickTime = event.timeStamp;
    trackingClickStart = this.trackingClickStart;
    this.trackingClick = false;
    this.trackingClickStart = 0;
    if (deviceIsIOSWithBadTarget) {
        touch = event.changedTouches[0];
        targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
        targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
    }
    targetTagName = targetElement.tagName.toLowerCase();
    if (targetTagName === "label") {
        forElement = this.findControl(targetElement);
        if (forElement) {
            this.focus(targetElement);
            if (deviceIsAndroid) {
                return false;
            }
            targetElement = forElement;
        }
    } else if (this.needsFocus(targetElement)) {
        if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === "input") {
            this.targetElement = null;
            return false;
        }
        this.focus(targetElement);
        this.sendClick(targetElement, event);
        if (!deviceIsIOS || targetTagName !== "select") {
            this.targetElement = null;
            event.preventDefault();
        }
        return false;
    }
    if (deviceIsIOS && !deviceIsIOS4) {
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
    if (deviceIsAndroid) {
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
    var blackberryVersion;
    if (typeof window.ontouchstart === "undefined") {
        return true;
    }
    chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [ , 0 ])[1];
    if (chromeVersion) {
        if (deviceIsAndroid) {
            metaViewport = document.querySelector("meta[name=viewport]");
            if (metaViewport) {
                if (metaViewport.content.indexOf("user-scalable=no") !== -1) {
                    return true;
                }
                if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
                    return true;
                }
            }
        } else {
            return true;
        }
    }
    if (deviceIsBlackBerry10) {
        blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
        if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
            metaViewport = document.querySelector("meta[name=viewport]");
            if (metaViewport) {
                if (metaViewport.content.indexOf("user-scalable=no") !== -1) {
                    return true;
                }
                if (document.documentElement.scrollWidth <= window.outerWidth) {
                    return true;
                }
            }
        }
    }
    if (layer.style.msTouchAction === "none") {
        return true;
    }
    return false;
};

FastClick.attach = function(layer, options) {
    "use strict";
    return new FastClick(layer, options);
};

if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
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
        templateUrl: "/frontend/views/datepicker/datepicker.html",
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
        templateUrl: "/frontend/views/datepicker/day.html",
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
        templateUrl: "/frontend/views/datepicker/month.html",
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
        templateUrl: "/frontend/views/datepicker/year.html",
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
        templateUrl: "/frontend/views/datepicker/popup.html",
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

app.controller("navigationController", function($scope, menuDataService) {
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
    navigation.menuItems = menuDataService;
});

app.controller("sliderController", function(sliderDataService) {
    var slider = this;
    slider.slides = [ {
        active: false
    }, {
        active: false
    }, {
        active: false
    } ];
    slider.slides = sliderDataService;
    slider.slides[0].active = true;
    slider.setActive = function(currentSlide) {
        for (var i = 0; i < slider.slides.length; i++) {
            slider.slides[i].active = false;
        }
        currentSlide.active = !currentSlide.active;
    };
});

app.controller("statusUpdateCtrl", function(asyncDataService, dataService, currentUserService, currentProfileService) {
    var statusUpdate = this;
    statusUpdate.currentProfile = currentProfileService;
    statusUpdate.currentUser = currentUserService;
    statusUpdate.errorHappened = false;
    var result = asyncDataService.getStatuses(statusUpdate.currentProfile.loginName);
    result.success(function(data) {
        statusUpdate.updates = data;
    }).error(function() {
        statusUpdate.errorHappened = true;
    });
    statusUpdate.toggleLike = function(update) {
        if (update.hasLiked) {
            var index = update.likes.indexOf(statusUpdate.currentUser.name);
            asyncDataService.toggleLike(update.id, false).success(function() {
                update.likes.splice(index, 1);
                update.hasLiked = false;
            });
        } else {
            asyncDataService.toggleLike(update.id, true).success(function() {
                var newLike = {
                    name: statusUpdate.currentUser.name,
                    urlToProfilePage: statusUpdate.currentUser.profileUrl
                };
                update.likes.push(newLike);
                update.hasLiked = true;
            });
        }
    };
    statusUpdate.addUpdate = function(update) {
        if (update) {
            var result = asyncDataService.postStatus(update);
            result.success(function(data) {
                statusUpdate.updates.unshift({
                    id: data.pageId,
                    image: statusUpdate.currentUser.imageUrl,
                    name: statusUpdate.currentUser.name,
                    body: update,
                    comments: [],
                    likes: []
                });
            });
        }
    };
    statusUpdate.toggleComments = function(update) {
        update.commentsVisible = !update.commentsVisible;
    };
    statusUpdate.addComment = function(update, comment) {
        var result = asyncDataService.postComment(update.id, comment);
        result.success(function() {
            update.comments.push({
                name: statusUpdate.currentUser.name,
                comment: comment,
                urlToProfilePage: statusUpdate.currentUser.profileUrl,
                urlToProfileImage: statusUpdate.currentUser.imageUrl
            });
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
        if (text) {
            return text.replace(/\n/g, "<br/>");
        } else return "";
    };
});

app.controller("CalendarCtrl", function($scope, $http, helperService, dataService, asyncDataService) {
    var calendar = this;
    calendar.dataLoaded = false;
    calendar.errorHappened = false;
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
            calendar.errorHappened = true;
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

app.controller("searchCtrl", function($scope) {
    var search = this;
    search.tabs = [ {
        active: true
    }, {
        active: false
    } ];
    if (location.search.indexOf("sider=true") > 0) {
        search.tabs[1].active = true;
    }
});

app.directive("slider", function() {
    return {
        restrict: "A",
        transclude: true,
        templateUrl: "/frontend/views/slider.html"
    };
});

app.directive("statusupdate", function() {
    return {
        restrict: "A",
        transclude: true,
        templateUrl: "/frontend/views/status_update.html",
        scope: {
            field: "@"
        }
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
            image: "/frontend/img/statusimageplaceholder1.png",
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
            image: "/frontend/img/statusimageplaceholder2.png",
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
    this.getStatuses = function(user) {
        var serviceUrl = "/api/statuses";
        if (user) {
            serviceUrl += "/" + user;
        }
        return $http({
            method: "GET",
            url: serviceUrl
        });
    };
    this.postStatus = function(text) {
        return $http({
            method: "POST",
            url: "/api/newstatus",
            data: {
                message: text
            }
        });
    };
    this.postComment = function(id, text) {
        var urlString = "/api/statuscomment/" + id;
        return $http({
            method: "POST",
            url: urlString,
            data: {
                comment: text
            }
        });
    };
    this.toggleLike = function(id, isLike) {
        var urlString = "/api/status/" + id;
        if (isLike) {
            urlString += "/like";
        } else {
            urlString += "/unlike";
        }
        return $http({
            method: "POST",
            url: urlString
        });
    };
});
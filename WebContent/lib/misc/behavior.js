/*
 * jQuery JavaScript Library v1.7.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Wed Mar 21 12:46:34 2012 -0700
 */
(function(window, undefined) {
	var document = window.document, navigator = window.navigator, location = window.location;
	var jQuery = (function() {
		var jQuery = function(selector, context) {
			return new jQuery.fn.init(selector, context, rootjQuery);
		}, _jQuery = window.jQuery, _$ = window.$, rootjQuery, quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, rnotwhite = /\S/, trimLeft = /^\s+/, trimRight = /\s+$/, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, rvalidchars = /^[\],:{}\s]*$/, rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g, rwebkit = /(webkit)[ \/]([\w.]+)/, ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/, rmsie = /(msie) ([\w.]+)/, rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/, rdashAlpha = /-([a-z]|[0-9])/ig, rmsPrefix = /^-ms-/, fcamelCase = function(
				all, letter) {
			return (letter + "").toUpperCase();
		}, userAgent = navigator.userAgent, browserMatch, readyList, DOMContentLoaded, toString = Object.prototype.toString, hasOwn = Object.prototype.hasOwnProperty, push = Array.prototype.push, slice = Array.prototype.slice, trim = String.prototype.trim, indexOf = Array.prototype.indexOf, class2type = {};
		jQuery.fn = jQuery.prototype = {
			constructor : jQuery,
			init : function(selector, context, rootjQuery) {
				var match, elem, ret, doc;
				if (!selector) {
					return this;
				}
				if (selector.nodeType) {
					this.context = this[0] = selector;
					this.length = 1;
					return this;
				}
				if (selector === "body" && !context && document.body) {
					this.context = document;
					this[0] = document.body;
					this.selector = selector;
					this.length = 1;
					return this;
				}
				if (typeof selector === "string") {
					if (selector.charAt(0) === "<"
							&& selector.charAt(selector.length - 1) === ">"
							&& selector.length >= 3) {
						match = [ null, selector, null ];
					} else {
						match = quickExpr.exec(selector);
					}
					if (match && (match[1] || !context)) {
						if (match[1]) {
							context = context instanceof jQuery ? context[0]
									: context;
							doc = (context ? context.ownerDocument || context
									: document);
							ret = rsingleTag.exec(selector);
							if (ret) {
								if (jQuery.isPlainObject(context)) {
									selector = [ document.createElement(ret[1]) ];
									jQuery.fn.attr
											.call(selector, context, true);
								} else {
									selector = [ doc.createElement(ret[1]) ];
								}
							} else {
								ret = jQuery.buildFragment([ match[1] ],
										[ doc ]);
								selector = (ret.cacheable ? jQuery
										.clone(ret.fragment) : ret.fragment).childNodes;
							}
							return jQuery.merge(this, selector);
						} else {
							elem = document.getElementById(match[2]);
							if (elem && elem.parentNode) {
								if (elem.id !== match[2]) {
									return rootjQuery.find(selector);
								}
								this.length = 1;
								this[0] = elem;
							}
							this.context = document;
							this.selector = selector;
							return this;
						}
					} else {
						if (!context || context.jquery) {
							return (context || rootjQuery).find(selector);
						} else {
							return this.constructor(context).find(selector);
						}
					}
				} else {
					if (jQuery.isFunction(selector)) {
						return rootjQuery.ready(selector);
					}
				}
				if (selector.selector !== undefined) {
					this.selector = selector.selector;
					this.context = selector.context;
				}
				return jQuery.makeArray(selector, this);
			},
			selector : "",
			jquery : "1.7.2",
			length : 0,
			size : function() {
				return this.length;
			},
			toArray : function() {
				return slice.call(this, 0);
			},
			get : function(num) {
				return num == null ? this.toArray()
						: (num < 0 ? this[this.length + num] : this[num]);
			},
			pushStack : function(elems, name, selector) {
				var ret = this.constructor();
				if (jQuery.isArray(elems)) {
					push.apply(ret, elems);
				} else {
					jQuery.merge(ret, elems);
				}
				ret.prevObject = this;
				ret.context = this.context;
				if (name === "find") {
					ret.selector = this.selector + (this.selector ? " " : "")
							+ selector;
				} else {
					if (name) {
						ret.selector = this.selector + "." + name + "("
								+ selector + ")";
					}
				}
				return ret;
			},
			each : function(callback, args) {
				return jQuery.each(this, callback, args);
			},
			ready : function(fn) {
				jQuery.bindReady();
				readyList.add(fn);
				return this;
			},
			eq : function(i) {
				i = +i;
				return i === -1 ? this.slice(i) : this.slice(i, i + 1);
			},
			first : function() {
				return this.eq(0);
			},
			last : function() {
				return this.eq(-1);
			},
			slice : function() {
				return this.pushStack(slice.apply(this, arguments), "slice",
						slice.call(arguments).join(","));
			},
			map : function(callback) {
				return this.pushStack(jQuery.map(this, function(elem, i) {
					return callback.call(elem, i, elem);
				}));
			},
			end : function() {
				return this.prevObject || this.constructor(null);
			},
			push : push,
			sort : [].sort,
			splice : [].splice
		};
		jQuery.fn.init.prototype = jQuery.fn;
		jQuery.extend = jQuery.fn.extend = function() {
			var options, name, src, copy, copyIsArray, clone, target = arguments[0]
					|| {}, i = 1, length = arguments.length, deep = false;
			if (typeof target === "boolean") {
				deep = target;
				target = arguments[1] || {};
				i = 2;
			}
			if (typeof target !== "object" && !jQuery.isFunction(target)) {
				target = {};
			}
			if (length === i) {
				target = this;
				--i;
			}
			for (; i < length; i++) {
				if ((options = arguments[i]) != null) {
					for (name in options) {
						src = target[name];
						copy = options[name];
						if (target === copy) {
							continue;
						}
						if (deep
								&& copy
								&& (jQuery.isPlainObject(copy) || (copyIsArray = jQuery
										.isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && jQuery.isArray(src) ? src : [];
							} else {
								clone = src && jQuery.isPlainObject(src) ? src
										: {};
							}
							target[name] = jQuery.extend(deep, clone, copy);
						} else {
							if (copy !== undefined) {
								target[name] = copy;
							}
						}
					}
				}
			}
			return target;
		};
		jQuery
				.extend({
					noConflict : function(deep) {
						if (window.$ === jQuery) {
							window.$ = _$;
						}
						if (deep && window.jQuery === jQuery) {
							window.jQuery = _jQuery;
						}
						return jQuery;
					},
					isReady : false,
					readyWait : 1,
					holdReady : function(hold) {
						if (hold) {
							jQuery.readyWait++;
						} else {
							jQuery.ready(true);
						}
					},
					ready : function(wait) {
						if ((wait === true && !--jQuery.readyWait)
								|| (wait !== true && !jQuery.isReady)) {
							if (!document.body) {
								return setTimeout(jQuery.ready, 1);
							}
							jQuery.isReady = true;
							if (wait !== true && --jQuery.readyWait > 0) {
								return;
							}
							readyList.fireWith(document, [ jQuery ]);
							if (jQuery.fn.trigger) {
								jQuery(document).trigger("ready").off("ready");
							}
						}
					},
					bindReady : function() {
						if (readyList) {
							return;
						}
						readyList = jQuery.Callbacks("once memory");
						if (document.readyState === "complete") {
							return setTimeout(jQuery.ready, 1);
						}
						if (document.addEventListener) {
							document.addEventListener("DOMContentLoaded",
									DOMContentLoaded, false);
							window
									.addEventListener("load", jQuery.ready,
											false);
						} else {
							if (document.attachEvent) {
								document.attachEvent("onreadystatechange",
										DOMContentLoaded);
								window.attachEvent("onload", jQuery.ready);
								var toplevel = false;
								try {
									toplevel = window.frameElement == null;
								} catch (e) {
								}
								if (document.documentElement.doScroll
										&& toplevel) {
									doScrollCheck();
								}
							}
						}
					},
					isFunction : function(obj) {
						return jQuery.type(obj) === "function";
					},
					isArray : Array.isArray || function(obj) {
						return jQuery.type(obj) === "array";
					},
					isWindow : function(obj) {
						return obj != null && obj == obj.window;
					},
					isNumeric : function(obj) {
						return !isNaN(parseFloat(obj)) && isFinite(obj);
					},
					type : function(obj) {
						return obj == null ? String(obj) : class2type[toString
								.call(obj)]
								|| "object";
					},
					isPlainObject : function(obj) {
						if (!obj || jQuery.type(obj) !== "object"
								|| obj.nodeType || jQuery.isWindow(obj)) {
							return false;
						}
						try {
							if (obj.constructor
									&& !hasOwn.call(obj, "constructor")
									&& !hasOwn.call(obj.constructor.prototype,
											"isPrototypeOf")) {
								return false;
							}
						} catch (e) {
							return false;
						}
						var key;
						for (key in obj) {
						}
						return key === undefined || hasOwn.call(obj, key);
					},
					isEmptyObject : function(obj) {
						for ( var name in obj) {
							return false;
						}
						return true;
					},
					error : function(msg) {
						throw new Error(msg);
					},
					parseJSON : function(data) {
						if (typeof data !== "string" || !data) {
							return null;
						}
						data = jQuery.trim(data);
						if (window.JSON && window.JSON.parse) {
							return window.JSON.parse(data);
						}
						if (rvalidchars.test(data.replace(rvalidescape, "@")
								.replace(rvalidtokens, "]").replace(
										rvalidbraces, ""))) {
							return (new Function("return " + data))();
						}
						jQuery.error("Invalid JSON: " + data);
					},
					parseXML : function(data) {
						if (typeof data !== "string" || !data) {
							return null;
						}
						var xml, tmp;
						try {
							if (window.DOMParser) {
								tmp = new DOMParser();
								xml = tmp.parseFromString(data, "text/xml");
							} else {
								xml = new ActiveXObject("Microsoft.XMLDOM");
								xml.async = "false";
								xml.loadXML(data);
							}
						} catch (e) {
							xml = undefined;
						}
						if (!xml
								|| !xml.documentElement
								|| xml.getElementsByTagName("parsererror").length) {
							jQuery.error("Invalid XML: " + data);
						}
						return xml;
					},
					noop : function() {
					},
					globalEval : function(data) {
						if (data && rnotwhite.test(data)) {
							(window.execScript || function(data) {
								window["eval"].call(window, data);
							})(data);
						}
					},
					camelCase : function(string) {
						return string.replace(rmsPrefix, "ms-").replace(
								rdashAlpha, fcamelCase);
					},
					nodeName : function(elem, name) {
						return elem.nodeName
								&& elem.nodeName.toUpperCase() === name
										.toUpperCase();
					},
					each : function(object, callback, args) {
						var name, i = 0, length = object.length, isObj = length === undefined
								|| jQuery.isFunction(object);
						if (args) {
							if (isObj) {
								for (name in object) {
									if (callback.apply(object[name], args) === false) {
										break;
									}
								}
							} else {
								for (; i < length;) {
									if (callback.apply(object[i++], args) === false) {
										break;
									}
								}
							}
						} else {
							if (isObj) {
								for (name in object) {
									if (callback.call(object[name], name,
											object[name]) === false) {
										break;
									}
								}
							} else {
								for (; i < length;) {
									if (callback
											.call(object[i], i, object[i++]) === false) {
										break;
									}
								}
							}
						}
						return object;
					},
					trim : trim ? function(text) {
						return text == null ? "" : trim.call(text);
					} : function(text) {
						return text == null ? "" : text.toString().replace(
								trimLeft, "").replace(trimRight, "");
					},
					makeArray : function(array, results) {
						var ret = results || [];
						if (array != null) {
							var type = jQuery.type(array);
							if (array.length == null || type === "string"
									|| type === "function" || type === "regexp"
									|| jQuery.isWindow(array)) {
								push.call(ret, array);
							} else {
								jQuery.merge(ret, array);
							}
						}
						return ret;
					},
					inArray : function(elem, array, i) {
						var len;
						if (array) {
							if (indexOf) {
								return indexOf.call(array, elem, i);
							}
							len = array.length;
							i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
							for (; i < len; i++) {
								if (i in array && array[i] === elem) {
									return i;
								}
							}
						}
						return -1;
					},
					merge : function(first, second) {
						var i = first.length, j = 0;
						if (typeof second.length === "number") {
							for ( var l = second.length; j < l; j++) {
								first[i++] = second[j];
							}
						} else {
							while (second[j] !== undefined) {
								first[i++] = second[j++];
							}
						}
						first.length = i;
						return first;
					},
					grep : function(elems, callback, inv) {
						var ret = [], retVal;
						inv = !!inv;
						for ( var i = 0, length = elems.length; i < length; i++) {
							retVal = !!callback(elems[i], i);
							if (inv !== retVal) {
								ret.push(elems[i]);
							}
						}
						return ret;
					},
					map : function(elems, callback, arg) {
						var value, key, ret = [], i = 0, length = elems.length, isArray = elems instanceof jQuery
								|| length !== undefined
								&& typeof length === "number"
								&& ((length > 0 && elems[0] && elems[length - 1])
										|| length === 0 || jQuery
										.isArray(elems));
						if (isArray) {
							for (; i < length; i++) {
								value = callback(elems[i], i, arg);
								if (value != null) {
									ret[ret.length] = value;
								}
							}
						} else {
							for (key in elems) {
								value = callback(elems[key], key, arg);
								if (value != null) {
									ret[ret.length] = value;
								}
							}
						}
						return ret.concat.apply([], ret);
					},
					guid : 1,
					proxy : function(fn, context) {
						if (typeof context === "string") {
							var tmp = fn[context];
							context = fn;
							fn = tmp;
						}
						if (!jQuery.isFunction(fn)) {
							return undefined;
						}
						var args = slice.call(arguments, 2), proxy = function() {
							return fn.apply(context, args.concat(slice
									.call(arguments)));
						};
						proxy.guid = fn.guid = fn.guid || proxy.guid
								|| jQuery.guid++;
						return proxy;
					},
					access : function(elems, fn, key, value, chainable,
							emptyGet, pass) {
						var exec, bulk = key == null, i = 0, length = elems.length;
						if (key && typeof key === "object") {
							for (i in key) {
								jQuery.access(elems, fn, i, key[i], 1,
										emptyGet, value);
							}
							chainable = 1;
						} else {
							if (value !== undefined) {
								exec = pass === undefined
										&& jQuery.isFunction(value);
								if (bulk) {
									if (exec) {
										exec = fn;
										fn = function(elem, key, value) {
											return exec.call(jQuery(elem),
													value);
										};
									} else {
										fn.call(elems, value);
										fn = null;
									}
								}
								if (fn) {
									for (; i < length; i++) {
										fn(elems[i], key, exec ? value.call(
												elems[i], i, fn(elems[i], key))
												: value, pass);
									}
								}
								chainable = 1;
							}
						}
						return chainable ? elems : bulk ? fn.call(elems)
								: length ? fn(elems[0], key) : emptyGet;
					},
					now : function() {
						return (new Date()).getTime();
					},
					uaMatch : function(ua) {
						ua = ua.toLowerCase();
						var match = rwebkit.exec(ua) || ropera.exec(ua)
								|| rmsie.exec(ua)
								|| ua.indexOf("compatible") < 0
								&& rmozilla.exec(ua) || [];
						return {
							browser : match[1] || "",
							version : match[2] || "0"
						};
					},
					sub : function() {
						function jQuerySub(selector, context) {
							return new jQuerySub.fn.init(selector, context);
						}
						jQuery.extend(true, jQuerySub, this);
						jQuerySub.superclass = this;
						jQuerySub.fn = jQuerySub.prototype = this();
						jQuerySub.fn.constructor = jQuerySub;
						jQuerySub.sub = this.sub;
						jQuerySub.fn.init = function init(selector, context) {
							if (context && context instanceof jQuery
									&& !(context instanceof jQuerySub)) {
								context = jQuerySub(context);
							}
							return jQuery.fn.init.call(this, selector, context,
									rootjQuerySub);
						};
						jQuerySub.fn.init.prototype = jQuerySub.fn;
						var rootjQuerySub = jQuerySub(document);
						return jQuerySub;
					},
					browser : {}
				});
		jQuery.each("Boolean Number String Function Array Date RegExp Object"
				.split(" "), function(i, name) {
			class2type["[object " + name + "]"] = name.toLowerCase();
		});
		browserMatch = jQuery.uaMatch(userAgent);
		if (browserMatch.browser) {
			jQuery.browser[browserMatch.browser] = true;
			jQuery.browser.version = browserMatch.version;
		}
		if (jQuery.browser.webkit) {
			jQuery.browser.safari = true;
		}
		if (rnotwhite.test("\xA0")) {
			trimLeft = /^[\s\xA0]+/;
			trimRight = /[\s\xA0]+$/;
		}
		rootjQuery = jQuery(document);
		if (document.addEventListener) {
			DOMContentLoaded = function() {
				document.removeEventListener("DOMContentLoaded",
						DOMContentLoaded, false);
				jQuery.ready();
			};
		} else {
			if (document.attachEvent) {
				DOMContentLoaded = function() {
					if (document.readyState === "complete") {
						document.detachEvent("onreadystatechange",
								DOMContentLoaded);
						jQuery.ready();
					}
				};
			}
		}
		function doScrollCheck() {
			if (jQuery.isReady) {
				return;
			}
			try {
				document.documentElement.doScroll("left");
			} catch (e) {
				setTimeout(doScrollCheck, 1);
				return;
			}
			jQuery.ready();
		}
		return jQuery;
	})();
	var flagsCache = {};
	function createFlags(flags) {
		var object = flagsCache[flags] = {}, i, length;
		flags = flags.split(/\s+/);
		for (i = 0, length = flags.length; i < length; i++) {
			object[flags[i]] = true;
		}
		return object;
	}
	jQuery.Callbacks = function(flags) {
		flags = flags ? (flagsCache[flags] || createFlags(flags)) : {};
		var list = [], stack = [], memory, fired, firing, firingStart, firingLength, firingIndex, add = function(
				args) {
			var i, length, elem, type, actual;
			for (i = 0, length = args.length; i < length; i++) {
				elem = args[i];
				type = jQuery.type(elem);
				if (type === "array") {
					add(elem);
				} else {
					if (type === "function") {
						if (!flags.unique || !self.has(elem)) {
							list.push(elem);
						}
					}
				}
			}
		}, fire = function(context, args) {
			args = args || [];
			memory = !flags.memory || [ context, args ];
			fired = true;
			firing = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			for (; list && firingIndex < firingLength; firingIndex++) {
				if (list[firingIndex].apply(context, args) === false
						&& flags.stopOnFalse) {
					memory = true;
					break;
				}
			}
			firing = false;
			if (list) {
				if (!flags.once) {
					if (stack && stack.length) {
						memory = stack.shift();
						self.fireWith(memory[0], memory[1]);
					}
				} else {
					if (memory === true) {
						self.disable();
					} else {
						list = [];
					}
				}
			}
		}, self = {
			add : function() {
				if (list) {
					var length = list.length;
					add(arguments);
					if (firing) {
						firingLength = list.length;
					} else {
						if (memory && memory !== true) {
							firingStart = length;
							fire(memory[0], memory[1]);
						}
					}
				}
				return this;
			},
			remove : function() {
				if (list) {
					var args = arguments, argIndex = 0, argLength = args.length;
					for (; argIndex < argLength; argIndex++) {
						for ( var i = 0; i < list.length; i++) {
							if (args[argIndex] === list[i]) {
								if (firing) {
									if (i <= firingLength) {
										firingLength--;
										if (i <= firingIndex) {
											firingIndex--;
										}
									}
								}
								list.splice(i--, 1);
								if (flags.unique) {
									break;
								}
							}
						}
					}
				}
				return this;
			},
			has : function(fn) {
				if (list) {
					var i = 0, length = list.length;
					for (; i < length; i++) {
						if (fn === list[i]) {
							return true;
						}
					}
				}
				return false;
			},
			empty : function() {
				list = [];
				return this;
			},
			disable : function() {
				list = stack = memory = undefined;
				return this;
			},
			disabled : function() {
				return !list;
			},
			lock : function() {
				stack = undefined;
				if (!memory || memory === true) {
					self.disable();
				}
				return this;
			},
			locked : function() {
				return !stack;
			},
			fireWith : function(context, args) {
				if (stack) {
					if (firing) {
						if (!flags.once) {
							stack.push([ context, args ]);
						}
					} else {
						if (!(flags.once && memory)) {
							fire(context, args);
						}
					}
				}
				return this;
			},
			fire : function() {
				self.fireWith(this, arguments);
				return this;
			},
			fired : function() {
				return !!fired;
			}
		};
		return self;
	};
	var sliceDeferred = [].slice;
	jQuery
			.extend({
				Deferred : function(func) {
					var doneList = jQuery.Callbacks("once memory"), failList = jQuery
							.Callbacks("once memory"), progressList = jQuery
							.Callbacks("memory"), state = "pending", lists = {
						resolve : doneList,
						reject : failList,
						notify : progressList
					}, promise = {
						done : doneList.add,
						fail : failList.add,
						progress : progressList.add,
						state : function() {
							return state;
						},
						isResolved : doneList.fired,
						isRejected : failList.fired,
						then : function(doneCallbacks, failCallbacks,
								progressCallbacks) {
							deferred.done(doneCallbacks).fail(failCallbacks)
									.progress(progressCallbacks);
							return this;
						},
						always : function() {
							deferred.done.apply(deferred, arguments).fail
									.apply(deferred, arguments);
							return this;
						},
						pipe : function(fnDone, fnFail, fnProgress) {
							return jQuery
									.Deferred(
											function(newDefer) {
												jQuery
														.each(
																{
																	done : [
																			fnDone,
																			"resolve" ],
																	fail : [
																			fnFail,
																			"reject" ],
																	progress : [
																			fnProgress,
																			"notify" ]
																},
																function(
																		handler,
																		data) {
																	var fn = data[0], action = data[1], returned;
																	if (jQuery
																			.isFunction(fn)) {
																		deferred[handler]
																				(function() {
																					returned = fn
																							.apply(
																									this,
																									arguments);
																					if (returned
																							&& jQuery
																									.isFunction(returned.promise)) {
																						returned
																								.promise()
																								.then(
																										newDefer.resolve,
																										newDefer.reject,
																										newDefer.notify);
																					} else {
																						newDefer[action
																								+ "With"]
																								(
																										this === deferred ? newDefer
																												: this,
																										[ returned ]);
																					}
																				});
																	} else {
																		deferred[handler]
																				(newDefer[action]);
																	}
																});
											}).promise();
						},
						promise : function(obj) {
							if (obj == null) {
								obj = promise;
							} else {
								for ( var key in promise) {
									obj[key] = promise[key];
								}
							}
							return obj;
						}
					}, deferred = promise.promise({}), key;
					for (key in lists) {
						deferred[key] = lists[key].fire;
						deferred[key + "With"] = lists[key].fireWith;
					}
					deferred.done(function() {
						state = "resolved";
					}, failList.disable, progressList.lock).fail(function() {
						state = "rejected";
					}, doneList.disable, progressList.lock);
					if (func) {
						func.call(deferred, deferred);
					}
					return deferred;
				},
				when : function(firstParam) {
					var args = sliceDeferred.call(arguments, 0), i = 0, length = args.length, pValues = new Array(
							length), count = length, pCount = length, deferred = length <= 1
							&& firstParam
							&& jQuery.isFunction(firstParam.promise) ? firstParam
							: jQuery.Deferred(), promise = deferred.promise();
					function resolveFunc(i) {
						return function(value) {
							args[i] = arguments.length > 1 ? sliceDeferred
									.call(arguments, 0) : value;
							if (!(--count)) {
								deferred.resolveWith(deferred, args);
							}
						};
					}
					function progressFunc(i) {
						return function(value) {
							pValues[i] = arguments.length > 1 ? sliceDeferred
									.call(arguments, 0) : value;
							deferred.notifyWith(promise, pValues);
						};
					}
					if (length > 1) {
						for (; i < length; i++) {
							if (args[i] && args[i].promise
									&& jQuery.isFunction(args[i].promise)) {
								args[i].promise().then(resolveFunc(i),
										deferred.reject, progressFunc(i));
							} else {
								--count;
							}
						}
						if (!count) {
							deferred.resolveWith(deferred, args);
						}
					} else {
						if (deferred !== firstParam) {
							deferred.resolveWith(deferred,
									length ? [ firstParam ] : []);
						}
					}
					return promise;
				}
			});
	jQuery.support = (function() {
		var support, all, a, select, opt, input, fragment, tds, events, eventName, i, isSupported, div = document
				.createElement("div"), documentElement = document.documentElement;
		div.setAttribute("className", "t");
		div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
		all = div.getElementsByTagName("*");
		a = div.getElementsByTagName("a")[0];
		if (!all || !all.length || !a) {
			return {};
		}
		select = document.createElement("select");
		opt = select.appendChild(document.createElement("option"));
		input = div.getElementsByTagName("input")[0];
		support = {
			leadingWhitespace : (div.firstChild.nodeType === 3),
			tbody : !div.getElementsByTagName("tbody").length,
			htmlSerialize : !!div.getElementsByTagName("link").length,
			style : /top/.test(a.getAttribute("style")),
			hrefNormalized : (a.getAttribute("href") === "/a"),
			opacity : /^0.55/.test(a.style.opacity),
			cssFloat : !!a.style.cssFloat,
			checkOn : (input.value === "on"),
			optSelected : opt.selected,
			getSetAttribute : div.className !== "t",
			enctype : !!document.createElement("form").enctype,
			html5Clone : document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>",
			submitBubbles : true,
			changeBubbles : true,
			focusinBubbles : false,
			deleteExpando : true,
			noCloneEvent : true,
			inlineBlockNeedsLayout : false,
			shrinkWrapBlocks : false,
			reliableMarginRight : true,
			pixelMargin : true
		};
		jQuery.boxModel = support.boxModel = (document.compatMode === "CSS1Compat");
		input.checked = true;
		support.noCloneChecked = input.cloneNode(true).checked;
		select.disabled = true;
		support.optDisabled = !opt.disabled;
		try {
			delete div.test;
		} catch (e) {
			support.deleteExpando = false;
		}
		if (!div.addEventListener && div.attachEvent && div.fireEvent) {
			div.attachEvent("onclick", function() {
				support.noCloneEvent = false;
			});
			div.cloneNode(true).fireEvent("onclick");
		}
		input = document.createElement("input");
		input.value = "t";
		input.setAttribute("type", "radio");
		support.radioValue = input.value === "t";
		input.setAttribute("checked", "checked");
		input.setAttribute("name", "t");
		div.appendChild(input);
		fragment = document.createDocumentFragment();
		fragment.appendChild(div.lastChild);
		support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
		support.appendChecked = input.checked;
		fragment.removeChild(input);
		fragment.appendChild(div);
		if (div.attachEvent) {
			for (i in {
				submit : 1,
				change : 1,
				focusin : 1
			}) {
				eventName = "on" + i;
				isSupported = (eventName in div);
				if (!isSupported) {
					div.setAttribute(eventName, "return;");
					isSupported = (typeof div[eventName] === "function");
				}
				support[i + "Bubbles"] = isSupported;
			}
		}
		fragment.removeChild(div);
		fragment = select = opt = div = input = null;
		jQuery(function() {
			var container, outer, inner, table, td, offsetSupport, marginDiv, conMarginTop, style, html, positionTopLeftWidthHeight, paddingMarginBorderVisibility, paddingMarginBorder, body = document
					.getElementsByTagName("body")[0];
			if (!body) {
				return;
			}
			conMarginTop = 1;
			paddingMarginBorder = "padding:0;margin:0;border:";
			positionTopLeftWidthHeight = "position:absolute;top:0;left:0;width:1px;height:1px;";
			paddingMarginBorderVisibility = paddingMarginBorder
					+ "0;visibility:hidden;";
			style = "style='" + positionTopLeftWidthHeight
					+ paddingMarginBorder + "5px solid #000;";
			html = "<div " + style + "display:block;'><div style='"
					+ paddingMarginBorder
					+ "0;display:block;overflow:hidden;'></div></div>"
					+ "<table " + style + "' cellpadding='0' cellspacing='0'>"
					+ "<tr><td></td></tr></table>";
			container = document.createElement("div");
			container.style.cssText = paddingMarginBorderVisibility
					+ "width:0;height:0;position:static;top:0;margin-top:"
					+ conMarginTop + "px";
			body.insertBefore(container, body.firstChild);
			div = document.createElement("div");
			container.appendChild(div);
			div.innerHTML = "<table><tr><td style='" + paddingMarginBorder
					+ "0;display:none'></td><td>t</td></tr></table>";
			tds = div.getElementsByTagName("td");
			isSupported = (tds[0].offsetHeight === 0);
			tds[0].style.display = "";
			tds[1].style.display = "none";
			support.reliableHiddenOffsets = isSupported
					&& (tds[0].offsetHeight === 0);
			if (window.getComputedStyle) {
				div.innerHTML = "";
				marginDiv = document.createElement("div");
				marginDiv.style.width = "0";
				marginDiv.style.marginRight = "0";
				div.style.width = "2px";
				div.appendChild(marginDiv);
				support.reliableMarginRight = (parseInt((window
						.getComputedStyle(marginDiv, null) || {
					marginRight : 0
				}).marginRight, 10) || 0) === 0;
			}
			if (typeof div.style.zoom !== "undefined") {
				div.innerHTML = "";
				div.style.width = div.style.padding = "1px";
				div.style.border = 0;
				div.style.overflow = "hidden";
				div.style.display = "inline";
				div.style.zoom = 1;
				support.inlineBlockNeedsLayout = (div.offsetWidth === 3);
				div.style.display = "block";
				div.style.overflow = "visible";
				div.innerHTML = "<div style='width:5px;'></div>";
				support.shrinkWrapBlocks = (div.offsetWidth !== 3);
			}
			div.style.cssText = positionTopLeftWidthHeight
					+ paddingMarginBorderVisibility;
			div.innerHTML = html;
			outer = div.firstChild;
			inner = outer.firstChild;
			td = outer.nextSibling.firstChild.firstChild;
			offsetSupport = {
				doesNotAddBorder : (inner.offsetTop !== 5),
				doesAddBorderForTableAndCells : (td.offsetTop === 5)
			};
			inner.style.position = "fixed";
			inner.style.top = "20px";
			offsetSupport.fixedPosition = (inner.offsetTop === 20 || inner.offsetTop === 15);
			inner.style.position = inner.style.top = "";
			outer.style.overflow = "hidden";
			outer.style.position = "relative";
			offsetSupport.subtractsBorderForOverflowNotVisible = (inner.offsetTop === -5);
			offsetSupport.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== conMarginTop);
			if (window.getComputedStyle) {
				div.style.marginTop = "1%";
				support.pixelMargin = (window.getComputedStyle(div, null) || {
					marginTop : 0
				}).marginTop !== "1%";
			}
			if (typeof container.style.zoom !== "undefined") {
				container.style.zoom = 1;
			}
			body.removeChild(container);
			marginDiv = div = container = null;
			jQuery.extend(support, offsetSupport);
		});
		return support;
	})();
	var rbrace = /^(?:\{.*\}|\[.*\])$/, rmultiDash = /([A-Z])/g;
	jQuery
			.extend({
				cache : {},
				uuid : 0,
				expando : "jQuery"
						+ (jQuery.fn.jquery + Math.random()).replace(/\D/g, ""),
				noData : {
					"embed" : true,
					"object" : "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
					"applet" : true
				},
				hasData : function(elem) {
					elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]]
							: elem[jQuery.expando];
					return !!elem && !isEmptyDataObject(elem);
				},
				data : function(elem, name, data, pvt) {
					if (!jQuery.acceptData(elem)) {
						return;
					}
					var privateCache, thisCache, ret, internalKey = jQuery.expando, getByName = typeof name === "string", isNode = elem.nodeType, cache = isNode ? jQuery.cache
							: elem, id = isNode ? elem[internalKey]
							: elem[internalKey] && internalKey, isEvents = name === "events";
					if ((!id || !cache[id] || (!isEvents && !pvt && !cache[id].data))
							&& getByName && data === undefined) {
						return;
					}
					if (!id) {
						if (isNode) {
							elem[internalKey] = id = ++jQuery.uuid;
						} else {
							id = internalKey;
						}
					}
					if (!cache[id]) {
						cache[id] = {};
						if (!isNode) {
							cache[id].toJSON = jQuery.noop;
						}
					}
					if (typeof name === "object" || typeof name === "function") {
						if (pvt) {
							cache[id] = jQuery.extend(cache[id], name);
						} else {
							cache[id].data = jQuery
									.extend(cache[id].data, name);
						}
					}
					privateCache = thisCache = cache[id];
					if (!pvt) {
						if (!thisCache.data) {
							thisCache.data = {};
						}
						thisCache = thisCache.data;
					}
					if (data !== undefined) {
						thisCache[jQuery.camelCase(name)] = data;
					}
					if (isEvents && !thisCache[name]) {
						return privateCache.events;
					}
					if (getByName) {
						ret = thisCache[name];
						if (ret == null) {
							ret = thisCache[jQuery.camelCase(name)];
						}
					} else {
						ret = thisCache;
					}
					return ret;
				},
				removeData : function(elem, name, pvt) {
					if (!jQuery.acceptData(elem)) {
						return;
					}
					var thisCache, i, l, internalKey = jQuery.expando, isNode = elem.nodeType, cache = isNode ? jQuery.cache
							: elem, id = isNode ? elem[internalKey]
							: internalKey;
					if (!cache[id]) {
						return;
					}
					if (name) {
						thisCache = pvt ? cache[id] : cache[id].data;
						if (thisCache) {
							if (!jQuery.isArray(name)) {
								if (name in thisCache) {
									name = [ name ];
								} else {
									name = jQuery.camelCase(name);
									if (name in thisCache) {
										name = [ name ];
									} else {
										name = name.split(" ");
									}
								}
							}
							for (i = 0, l = name.length; i < l; i++) {
								delete thisCache[name[i]];
							}
							if (!(pvt ? isEmptyDataObject
									: jQuery.isEmptyObject)(thisCache)) {
								return;
							}
						}
					}
					if (!pvt) {
						delete cache[id].data;
						if (!isEmptyDataObject(cache[id])) {
							return;
						}
					}
					if (jQuery.support.deleteExpando || !cache.setInterval) {
						delete cache[id];
					} else {
						cache[id] = null;
					}
					if (isNode) {
						if (jQuery.support.deleteExpando) {
							delete elem[internalKey];
						} else {
							if (elem.removeAttribute) {
								elem.removeAttribute(internalKey);
							} else {
								elem[internalKey] = null;
							}
						}
					}
				},
				_data : function(elem, name, data) {
					return jQuery.data(elem, name, data, true);
				},
				acceptData : function(elem) {
					if (elem.nodeName) {
						var match = jQuery.noData[elem.nodeName.toLowerCase()];
						if (match) {
							return !(match === true || elem
									.getAttribute("classid") !== match);
						}
					}
					return true;
				}
			});
	jQuery.fn.extend({
		data : function(key, value) {
			var parts, part, attr, name, l, elem = this[0], i = 0, data = null;
			if (key === undefined) {
				if (this.length) {
					data = jQuery.data(elem);
					if (elem.nodeType === 1
							&& !jQuery._data(elem, "parsedAttrs")) {
						attr = elem.attributes;
						for (l = attr.length; i < l; i++) {
							name = attr[i].name;
							if (name.indexOf("data-") === 0) {
								name = jQuery.camelCase(name.substring(5));
								dataAttr(elem, name, data[name]);
							}
						}
						jQuery._data(elem, "parsedAttrs", true);
					}
				}
				return data;
			}
			if (typeof key === "object") {
				return this.each(function() {
					jQuery.data(this, key);
				});
			}
			parts = key.split(".", 2);
			parts[1] = parts[1] ? "." + parts[1] : "";
			part = parts[1] + "!";
			return jQuery.access(this, function(value) {
				if (value === undefined) {
					data = this.triggerHandler("getData" + part, [ parts[0] ]);
					if (data === undefined && elem) {
						data = jQuery.data(elem, key);
						data = dataAttr(elem, key, data);
					}
					return data === undefined && parts[1] ? this.data(parts[0])
							: data;
				}
				parts[1] = value;
				this.each(function() {
					var self = jQuery(this);
					self.triggerHandler("setData" + part, parts);
					jQuery.data(this, key, value);
					self.triggerHandler("changeData" + part, parts);
				});
			}, null, value, arguments.length > 1, null, false);
		},
		removeData : function(key) {
			return this.each(function() {
				jQuery.removeData(this, key);
			});
		}
	});
	function dataAttr(elem, key, data) {
		if (data === undefined && elem.nodeType === 1) {
			var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
			data = elem.getAttribute(name);
			if (typeof data === "string") {
				try {
					data = data === "true" ? true : data === "false" ? false
							: data === "null" ? null
									: jQuery.isNumeric(data) ? +data : rbrace
											.test(data) ? jQuery
											.parseJSON(data) : data;
				} catch (e) {
				}
				jQuery.data(elem, key, data);
			} else {
				data = undefined;
			}
		}
		return data;
	}
	function isEmptyDataObject(obj) {
		for ( var name in obj) {
			if (name === "data" && jQuery.isEmptyObject(obj[name])) {
				continue;
			}
			if (name !== "toJSON") {
				return false;
			}
		}
		return true;
	}
	function handleQueueMarkDefer(elem, type, src) {
		var deferDataKey = type + "defer", queueDataKey = type + "queue", markDataKey = type
				+ "mark", defer = jQuery._data(elem, deferDataKey);
		if (defer && (src === "queue" || !jQuery._data(elem, queueDataKey))
				&& (src === "mark" || !jQuery._data(elem, markDataKey))) {
			setTimeout(function() {
				if (!jQuery._data(elem, queueDataKey)
						&& !jQuery._data(elem, markDataKey)) {
					jQuery.removeData(elem, deferDataKey, true);
					defer.fire();
				}
			}, 0);
		}
	}
	jQuery
			.extend({
				_mark : function(elem, type) {
					if (elem) {
						type = (type || "fx") + "mark";
						jQuery._data(elem, type,
								(jQuery._data(elem, type) || 0) + 1);
					}
				},
				_unmark : function(force, elem, type) {
					if (force !== true) {
						type = elem;
						elem = force;
						force = false;
					}
					if (elem) {
						type = type || "fx";
						var key = type + "mark", count = force ? 0 : ((jQuery
								._data(elem, key) || 1) - 1);
						if (count) {
							jQuery._data(elem, key, count);
						} else {
							jQuery.removeData(elem, key, true);
							handleQueueMarkDefer(elem, type, "mark");
						}
					}
				},
				queue : function(elem, type, data) {
					var q;
					if (elem) {
						type = (type || "fx") + "queue";
						q = jQuery._data(elem, type);
						if (data) {
							if (!q || jQuery.isArray(data)) {
								q = jQuery._data(elem, type, jQuery
										.makeArray(data));
							} else {
								q.push(data);
							}
						}
						return q || [];
					}
				},
				dequeue : function(elem, type) {
					type = type || "fx";
					var queue = jQuery.queue(elem, type), fn = queue.shift(), hooks = {};
					if (fn === "inprogress") {
						fn = queue.shift();
					}
					if (fn) {
						if (type === "fx") {
							queue.unshift("inprogress");
						}
						jQuery._data(elem, type + ".run", hooks);
						fn.call(elem, function() {
							jQuery.dequeue(elem, type);
						}, hooks);
					}
					if (!queue.length) {
						jQuery.removeData(elem,
								type + "queue " + type + ".run", true);
						handleQueueMarkDefer(elem, type, "queue");
					}
				}
			});
	jQuery.fn
			.extend({
				queue : function(type, data) {
					var setter = 2;
					if (typeof type !== "string") {
						data = type;
						type = "fx";
						setter--;
					}
					if (arguments.length < setter) {
						return jQuery.queue(this[0], type);
					}
					return data === undefined ? this : this.each(function() {
						var queue = jQuery.queue(this, type, data);
						if (type === "fx" && queue[0] !== "inprogress") {
							jQuery.dequeue(this, type);
						}
					});
				},
				dequeue : function(type) {
					return this.each(function() {
						jQuery.dequeue(this, type);
					});
				},
				delay : function(time, type) {
					time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
					type = type || "fx";
					return this.queue(type, function(next, hooks) {
						var timeout = setTimeout(next, time);
						hooks.stop = function() {
							clearTimeout(timeout);
						};
					});
				},
				clearQueue : function(type) {
					return this.queue(type || "fx", []);
				},
				promise : function(type, object) {
					if (typeof type !== "string") {
						object = type;
						type = undefined;
					}
					type = type || "fx";
					var defer = jQuery.Deferred(), elements = this, i = elements.length, count = 1, deferDataKey = type
							+ "defer", queueDataKey = type + "queue", markDataKey = type
							+ "mark", tmp;
					function resolve() {
						if (!(--count)) {
							defer.resolveWith(elements, [ elements ]);
						}
					}
					while (i--) {
						if ((tmp = jQuery.data(elements[i], deferDataKey,
								undefined, true)
								|| (jQuery.data(elements[i], queueDataKey,
										undefined, true) || jQuery.data(
										elements[i], markDataKey, undefined,
										true))
								&& jQuery.data(elements[i], deferDataKey,
										jQuery.Callbacks("once memory"), true))) {
							count++;
							tmp.add(resolve);
						}
					}
					resolve();
					return defer.promise(object);
				}
			});
	var rclass = /[\n\t\r]/g, rspace = /\s+/, rreturn = /\r/g, rtype = /^(?:button|input)$/i, rfocusable = /^(?:button|input|object|select|textarea)$/i, rclickable = /^a(?:rea)?$/i, rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, getSetAttribute = jQuery.support.getSetAttribute, nodeHook, boolHook, fixSpecified;
	jQuery.fn
			.extend({
				attr : function(name, value) {
					return jQuery.access(this, jQuery.attr, name, value,
							arguments.length > 1);
				},
				removeAttr : function(name) {
					return this.each(function() {
						jQuery.removeAttr(this, name);
					});
				},
				prop : function(name, value) {
					return jQuery.access(this, jQuery.prop, name, value,
							arguments.length > 1);
				},
				removeProp : function(name) {
					name = jQuery.propFix[name] || name;
					return this.each(function() {
						try {
							this[name] = undefined;
							delete this[name];
						} catch (e) {
						}
					});
				},
				addClass : function(value) {
					var classNames, i, l, elem, setClass, c, cl;
					if (jQuery.isFunction(value)) {
						return this.each(function(j) {
							jQuery(this).addClass(
									value.call(this, j, this.className));
						});
					}
					if (value && typeof value === "string") {
						classNames = value.split(rspace);
						for (i = 0, l = this.length; i < l; i++) {
							elem = this[i];
							if (elem.nodeType === 1) {
								if (!elem.className && classNames.length === 1) {
									elem.className = value;
								} else {
									setClass = " " + elem.className + " ";
									for (c = 0, cl = classNames.length; c < cl; c++) {
										if (!~setClass.indexOf(" "
												+ classNames[c] + " ")) {
											setClass += classNames[c] + " ";
										}
									}
									elem.className = jQuery.trim(setClass);
								}
							}
						}
					}
					return this;
				},
				removeClass : function(value) {
					var classNames, i, l, elem, className, c, cl;
					if (jQuery.isFunction(value)) {
						return this.each(function(j) {
							jQuery(this).removeClass(
									value.call(this, j, this.className));
						});
					}
					if ((value && typeof value === "string")
							|| value === undefined) {
						classNames = (value || "").split(rspace);
						for (i = 0, l = this.length; i < l; i++) {
							elem = this[i];
							if (elem.nodeType === 1 && elem.className) {
								if (value) {
									className = (" " + elem.className + " ")
											.replace(rclass, " ");
									for (c = 0, cl = classNames.length; c < cl; c++) {
										className = className.replace(" "
												+ classNames[c] + " ", " ");
									}
									elem.className = jQuery.trim(className);
								} else {
									elem.className = "";
								}
							}
						}
					}
					return this;
				},
				toggleClass : function(value, stateVal) {
					var type = typeof value, isBool = typeof stateVal === "boolean";
					if (jQuery.isFunction(value)) {
						return this.each(function(i) {
							jQuery(this).toggleClass(
									value.call(this, i, this.className,
											stateVal), stateVal);
						});
					}
					return this
							.each(function() {
								if (type === "string") {
									var className, i = 0, self = jQuery(this), state = stateVal, classNames = value
											.split(rspace);
									while ((className = classNames[i++])) {
										state = isBool ? state : !self
												.hasClass(className);
										self[state ? "addClass" : "removeClass"]
												(className);
									}
								} else {
									if (type === "undefined"
											|| type === "boolean") {
										if (this.className) {
											jQuery._data(this, "__className__",
													this.className);
										}
										this.className = this.className
												|| value === false ? ""
												: jQuery._data(this,
														"__className__")
														|| "";
									}
								}
							});
				},
				hasClass : function(selector) {
					var className = " " + selector + " ", i = 0, l = this.length;
					for (; i < l; i++) {
						if (this[i].nodeType === 1
								&& (" " + this[i].className + " ").replace(
										rclass, " ").indexOf(className) > -1) {
							return true;
						}
					}
					return false;
				},
				val : function(value) {
					var hooks, ret, isFunction, elem = this[0];
					if (!arguments.length) {
						if (elem) {
							hooks = jQuery.valHooks[elem.type]
									|| jQuery.valHooks[elem.nodeName
											.toLowerCase()];
							if (hooks
									&& "get" in hooks
									&& (ret = hooks.get(elem, "value")) !== undefined) {
								return ret;
							}
							ret = elem.value;
							return typeof ret === "string" ? ret.replace(
									rreturn, "") : ret == null ? "" : ret;
						}
						return;
					}
					isFunction = jQuery.isFunction(value);
					return this
							.each(function(i) {
								var self = jQuery(this), val;
								if (this.nodeType !== 1) {
									return;
								}
								if (isFunction) {
									val = value.call(this, i, self.val());
								} else {
									val = value;
								}
								if (val == null) {
									val = "";
								} else {
									if (typeof val === "number") {
										val += "";
									} else {
										if (jQuery.isArray(val)) {
											val = jQuery.map(val, function(
													value) {
												return value == null ? ""
														: value + "";
											});
										}
									}
								}
								hooks = jQuery.valHooks[this.type]
										|| jQuery.valHooks[this.nodeName
												.toLowerCase()];
								if (!hooks
										|| !("set" in hooks)
										|| hooks.set(this, val, "value") === undefined) {
									this.value = val;
								}
							});
				}
			});
	jQuery
			.extend({
				valHooks : {
					option : {
						get : function(elem) {
							var val = elem.attributes.value;
							return !val || val.specified ? elem.value
									: elem.text;
						}
					},
					select : {
						get : function(elem) {
							var value, i, max, option, index = elem.selectedIndex, values = [], options = elem.options, one = elem.type === "select-one";
							if (index < 0) {
								return null;
							}
							i = one ? index : 0;
							max = one ? index + 1 : options.length;
							for (; i < max; i++) {
								option = options[i];
								if (option.selected
										&& (jQuery.support.optDisabled ? !option.disabled
												: option
														.getAttribute("disabled") === null)
										&& (!option.parentNode.disabled || !jQuery
												.nodeName(option.parentNode,
														"optgroup"))) {
									value = jQuery(option).val();
									if (one) {
										return value;
									}
									values.push(value);
								}
							}
							if (one && !values.length && options.length) {
								return jQuery(options[index]).val();
							}
							return values;
						},
						set : function(elem, value) {
							var values = jQuery.makeArray(value);
							jQuery(elem).find("option").each(
									function() {
										this.selected = jQuery.inArray(jQuery(
												this).val(), values) >= 0;
									});
							if (!values.length) {
								elem.selectedIndex = -1;
							}
							return values;
						}
					}
				},
				attrFn : {
					val : true,
					css : true,
					html : true,
					text : true,
					data : true,
					width : true,
					height : true,
					offset : true
				},
				attr : function(elem, name, value, pass) {
					var ret, hooks, notxml, nType = elem.nodeType;
					if (!elem || nType === 3 || nType === 8 || nType === 2) {
						return;
					}
					if (pass && name in jQuery.attrFn) {
						return jQuery(elem)[name](value);
					}
					if (typeof elem.getAttribute === "undefined") {
						return jQuery.prop(elem, name, value);
					}
					notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
					if (notxml) {
						name = name.toLowerCase();
						hooks = jQuery.attrHooks[name]
								|| (rboolean.test(name) ? boolHook : nodeHook);
					}
					if (value !== undefined) {
						if (value === null) {
							jQuery.removeAttr(elem, name);
							return;
						} else {
							if (hooks
									&& "set" in hooks
									&& notxml
									&& (ret = hooks.set(elem, value, name)) !== undefined) {
								return ret;
							} else {
								elem.setAttribute(name, "" + value);
								return value;
							}
						}
					} else {
						if (hooks && "get" in hooks && notxml
								&& (ret = hooks.get(elem, name)) !== null) {
							return ret;
						} else {
							ret = elem.getAttribute(name);
							return ret === null ? undefined : ret;
						}
					}
				},
				removeAttr : function(elem, value) {
					var propName, attrNames, name, l, isBool, i = 0;
					if (value && elem.nodeType === 1) {
						attrNames = value.toLowerCase().split(rspace);
						l = attrNames.length;
						for (; i < l; i++) {
							name = attrNames[i];
							if (name) {
								propName = jQuery.propFix[name] || name;
								isBool = rboolean.test(name);
								if (!isBool) {
									jQuery.attr(elem, name, "");
								}
								elem.removeAttribute(getSetAttribute ? name
										: propName);
								if (isBool && propName in elem) {
									elem[propName] = false;
								}
							}
						}
					}
				},
				attrHooks : {
					type : {
						set : function(elem, value) {
							if (rtype.test(elem.nodeName) && elem.parentNode) {
								jQuery.error("type property can't be changed");
							} else {
								if (!jQuery.support.radioValue
										&& value === "radio"
										&& jQuery.nodeName(elem, "input")) {
									var val = elem.value;
									elem.setAttribute("type", value);
									if (val) {
										elem.value = val;
									}
									return value;
								}
							}
						}
					},
					value : {
						get : function(elem, name) {
							if (nodeHook && jQuery.nodeName(elem, "button")) {
								return nodeHook.get(elem, name);
							}
							return name in elem ? elem.value : null;
						},
						set : function(elem, value, name) {
							if (nodeHook && jQuery.nodeName(elem, "button")) {
								return nodeHook.set(elem, value, name);
							}
							elem.value = value;
						}
					}
				},
				propFix : {
					tabindex : "tabIndex",
					readonly : "readOnly",
					"for" : "htmlFor",
					"class" : "className",
					maxlength : "maxLength",
					cellspacing : "cellSpacing",
					cellpadding : "cellPadding",
					rowspan : "rowSpan",
					colspan : "colSpan",
					usemap : "useMap",
					frameborder : "frameBorder",
					contenteditable : "contentEditable"
				},
				prop : function(elem, name, value) {
					var ret, hooks, notxml, nType = elem.nodeType;
					if (!elem || nType === 3 || nType === 8 || nType === 2) {
						return;
					}
					notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
					if (notxml) {
						name = jQuery.propFix[name] || name;
						hooks = jQuery.propHooks[name];
					}
					if (value !== undefined) {
						if (hooks
								&& "set" in hooks
								&& (ret = hooks.set(elem, value, name)) !== undefined) {
							return ret;
						} else {
							return (elem[name] = value);
						}
					} else {
						if (hooks && "get" in hooks
								&& (ret = hooks.get(elem, name)) !== null) {
							return ret;
						} else {
							return elem[name];
						}
					}
				},
				propHooks : {
					tabIndex : {
						get : function(elem) {
							var attributeNode = elem
									.getAttributeNode("tabindex");
							return attributeNode && attributeNode.specified ? parseInt(
									attributeNode.value, 10)
									: rfocusable.test(elem.nodeName)
											|| rclickable.test(elem.nodeName)
											&& elem.href ? 0 : undefined;
						}
					}
				}
			});
	jQuery.attrHooks.tabindex = jQuery.propHooks.tabIndex;
	boolHook = {
		get : function(elem, name) {
			var attrNode, property = jQuery.prop(elem, name);
			return property === true || typeof property !== "boolean"
					&& (attrNode = elem.getAttributeNode(name))
					&& attrNode.nodeValue !== false ? name.toLowerCase()
					: undefined;
		},
		set : function(elem, value, name) {
			var propName;
			if (value === false) {
				jQuery.removeAttr(elem, name);
			} else {
				propName = jQuery.propFix[name] || name;
				if (propName in elem) {
					elem[propName] = true;
				}
				elem.setAttribute(name, name.toLowerCase());
			}
			return name;
		}
	};
	if (!getSetAttribute) {
		fixSpecified = {
			name : true,
			id : true,
			coords : true
		};
		nodeHook = jQuery.valHooks.button = {
			get : function(elem, name) {
				var ret;
				ret = elem.getAttributeNode(name);
				return ret
						&& (fixSpecified[name] ? ret.nodeValue !== ""
								: ret.specified) ? ret.nodeValue : undefined;
			},
			set : function(elem, value, name) {
				var ret = elem.getAttributeNode(name);
				if (!ret) {
					ret = document.createAttribute(name);
					elem.setAttributeNode(ret);
				}
				return (ret.nodeValue = value + "");
			}
		};
		jQuery.attrHooks.tabindex.set = nodeHook.set;
		jQuery.each([ "width", "height" ], function(i, name) {
			jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
				set : function(elem, value) {
					if (value === "") {
						elem.setAttribute(name, "auto");
						return value;
					}
				}
			});
		});
		jQuery.attrHooks.contenteditable = {
			get : nodeHook.get,
			set : function(elem, value, name) {
				if (value === "") {
					value = "false";
				}
				nodeHook.set(elem, value, name);
			}
		};
	}
	if (!jQuery.support.hrefNormalized) {
		jQuery.each([ "href", "src", "width", "height" ], function(i, name) {
			jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
				get : function(elem) {
					var ret = elem.getAttribute(name, 2);
					return ret === null ? undefined : ret;
				}
			});
		});
	}
	if (!jQuery.support.style) {
		jQuery.attrHooks.style = {
			get : function(elem) {
				return elem.style.cssText.toLowerCase() || undefined;
			},
			set : function(elem, value) {
				return (elem.style.cssText = "" + value);
			}
		};
	}
	if (!jQuery.support.optSelected) {
		jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
			get : function(elem) {
				var parent = elem.parentNode;
				if (parent) {
					parent.selectedIndex;
					if (parent.parentNode) {
						parent.parentNode.selectedIndex;
					}
				}
				return null;
			}
		});
	}
	if (!jQuery.support.enctype) {
		jQuery.propFix.enctype = "encoding";
	}
	if (!jQuery.support.checkOn) {
		jQuery.each([ "radio", "checkbox" ], function() {
			jQuery.valHooks[this] = {
				get : function(elem) {
					return elem.getAttribute("value") === null ? "on"
							: elem.value;
				}
			};
		});
	}
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
			set : function(elem, value) {
				if (jQuery.isArray(value)) {
					return (elem.checked = jQuery.inArray(jQuery(elem).val(),
							value) >= 0);
				}
			}
		});
	});
	var rformElems = /^(?:textarea|input|select)$/i, rtypenamespace = /^([^\.]*)?(?:\.(.+))?$/, rhoverHack = /(?:^|\s)hover(\.\S+)?\b/, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rquickIs = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, quickParse = function(
			selector) {
		var quick = rquickIs.exec(selector);
		if (quick) {
			quick[1] = (quick[1] || "").toLowerCase();
			quick[3] = quick[3]
					&& new RegExp("(?:^|\\s)" + quick[3] + "(?:\\s|$)");
		}
		return quick;
	}, quickIs = function(elem, m) {
		var attrs = elem.attributes || {};
		return ((!m[1] || elem.nodeName.toLowerCase() === m[1])
				&& (!m[2] || (attrs.id || {}).value === m[2]) && (!m[3] || m[3]
				.test((attrs["class"] || {}).value)));
	}, hoverHack = function(events) {
		return jQuery.event.special.hover ? events : events.replace(rhoverHack,
				"mouseenter$1 mouseleave$1");
	};
	jQuery.event = {
		add : function(elem, types, handler, data, selector) {
			var elemData, eventHandle, events, t, tns, type, namespaces, handleObj, handleObjIn, quick, handlers, special;
			if (elem.nodeType === 3 || elem.nodeType === 8 || !types
					|| !handler || !(elemData = jQuery._data(elem))) {
				return;
			}
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}
			if (!handler.guid) {
				handler.guid = jQuery.guid++;
			}
			events = elemData.events;
			if (!events) {
				elemData.events = events = {};
			}
			eventHandle = elemData.handle;
			if (!eventHandle) {
				elemData.handle = eventHandle = function(e) {
					return typeof jQuery !== "undefined"
							&& (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch
							.apply(eventHandle.elem, arguments)
							: undefined;
				};
				eventHandle.elem = elem;
			}
			types = jQuery.trim(hoverHack(types)).split(" ");
			for (t = 0; t < types.length; t++) {
				tns = rtypenamespace.exec(types[t]) || [];
				type = tns[1];
				namespaces = (tns[2] || "").split(".").sort();
				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType)
						|| type;
				special = jQuery.event.special[type] || {};
				handleObj = jQuery.extend({
					type : type,
					origType : tns[1],
					data : data,
					handler : handler,
					guid : handler.guid,
					selector : selector,
					quick : selector && quickParse(selector),
					namespace : namespaces.join(".")
				}, handleObjIn);
				handlers = events[type];
				if (!handlers) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;
					if (!special.setup
							|| special.setup.call(elem, data, namespaces,
									eventHandle) === false) {
						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle, false);
						} else {
							if (elem.attachEvent) {
								elem.attachEvent("on" + type, eventHandle);
							}
						}
					}
				}
				if (special.add) {
					special.add.call(elem, handleObj);
					if (!handleObj.handler.guid) {
						handleObj.handler.guid = handler.guid;
					}
				}
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObj);
				} else {
					handlers.push(handleObj);
				}
				jQuery.event.global[type] = true;
			}
			elem = null;
		},
		global : {},
		remove : function(elem, types, handler, selector, mappedTypes) {
			var elemData = jQuery.hasData(elem) && jQuery._data(elem), t, tns, type, origType, namespaces, origCount, j, events, special, handle, eventType, handleObj;
			if (!elemData || !(events = elemData.events)) {
				return;
			}
			types = jQuery.trim(hoverHack(types || "")).split(" ");
			for (t = 0; t < types.length; t++) {
				tns = rtypenamespace.exec(types[t]) || [];
				type = origType = tns[1];
				namespaces = tns[2];
				if (!type) {
					for (type in events) {
						jQuery.event.remove(elem, type + types[t], handler,
								selector, true);
					}
					continue;
				}
				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType)
						|| type;
				eventType = events[type] || [];
				origCount = eventType.length;
				namespaces = namespaces ? new RegExp("(^|\\.)"
						+ namespaces.split(".").sort().join("\\.(?:.*\\.)?")
						+ "(\\.|$)") : null;
				for (j = 0; j < eventType.length; j++) {
					handleObj = eventType[j];
					if ((mappedTypes || origType === handleObj.origType)
							&& (!handler || handler.guid === handleObj.guid)
							&& (!namespaces || namespaces
									.test(handleObj.namespace))
							&& (!selector || selector === handleObj.selector || selector === "**"
									&& handleObj.selector)) {
						eventType.splice(j--, 1);
						if (handleObj.selector) {
							eventType.delegateCount--;
						}
						if (special.remove) {
							special.remove.call(elem, handleObj);
						}
					}
				}
				if (eventType.length === 0 && origCount !== eventType.length) {
					if (!special.teardown
							|| special.teardown.call(elem, namespaces) === false) {
						jQuery.removeEvent(elem, type, elemData.handle);
					}
					delete events[type];
				}
			}
			if (jQuery.isEmptyObject(events)) {
				handle = elemData.handle;
				if (handle) {
					handle.elem = null;
				}
				jQuery.removeData(elem, [ "events", "handle" ], true);
			}
		},
		customEvent : {
			"getData" : true,
			"setData" : true,
			"changeData" : true
		},
		trigger : function(event, data, elem, onlyHandlers) {
			if (elem && (elem.nodeType === 3 || elem.nodeType === 8)) {
				return;
			}
			var type = event.type || event, namespaces = [], cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType;
			if (rfocusMorph.test(type + jQuery.event.triggered)) {
				return;
			}
			if (type.indexOf("!") >= 0) {
				type = type.slice(0, -1);
				exclusive = true;
			}
			if (type.indexOf(".") >= 0) {
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			if ((!elem || jQuery.event.customEvent[type])
					&& !jQuery.event.global[type]) {
				return;
			}
			event = typeof event === "object" ? event[jQuery.expando] ? event
					: new jQuery.Event(type, event) : new jQuery.Event(type);
			event.type = type;
			event.isTrigger = true;
			event.exclusive = exclusive;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace ? new RegExp("(^|\\.)"
					+ namespaces.join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
			ontype = type.indexOf(":") < 0 ? "on" + type : "";
			if (!elem) {
				cache = jQuery.cache;
				for (i in cache) {
					if (cache[i].events && cache[i].events[type]) {
						jQuery.event.trigger(event, data, cache[i].handle.elem,
								true);
					}
				}
				return;
			}
			event.result = undefined;
			if (!event.target) {
				event.target = elem;
			}
			data = data != null ? jQuery.makeArray(data) : [];
			data.unshift(event);
			special = jQuery.event.special[type] || {};
			if (special.trigger && special.trigger.apply(elem, data) === false) {
				return;
			}
			eventPath = [ [ elem, special.bindType || type ] ];
			if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
				bubbleType = special.delegateType || type;
				cur = rfocusMorph.test(bubbleType + type) ? elem
						: elem.parentNode;
				old = null;
				for (; cur; cur = cur.parentNode) {
					eventPath.push([ cur, bubbleType ]);
					old = cur;
				}
				if (old && old === elem.ownerDocument) {
					eventPath.push([
							old.defaultView || old.parentWindow || window,
							bubbleType ]);
				}
			}
			for (i = 0; i < eventPath.length && !event.isPropagationStopped(); i++) {
				cur = eventPath[i][0];
				event.type = eventPath[i][1];
				handle = (jQuery._data(cur, "events") || {})[event.type]
						&& jQuery._data(cur, "handle");
				if (handle) {
					handle.apply(cur, data);
				}
				handle = ontype && cur[ontype];
				if (handle && jQuery.acceptData(cur)
						&& handle.apply(cur, data) === false) {
					event.preventDefault();
				}
			}
			event.type = type;
			if (!onlyHandlers && !event.isDefaultPrevented()) {
				if ((!special._default || special._default.apply(
						elem.ownerDocument, data) === false)
						&& !(type === "click" && jQuery.nodeName(elem, "a"))
						&& jQuery.acceptData(elem)) {
					if (ontype
							&& elem[type]
							&& ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0)
							&& !jQuery.isWindow(elem)) {
						old = elem[ontype];
						if (old) {
							elem[ontype] = null;
						}
						jQuery.event.triggered = type;
						elem[type]();
						jQuery.event.triggered = undefined;
						if (old) {
							elem[ontype] = old;
						}
					}
				}
			}
			return event.result;
		},
		dispatch : function(event) {
			event = jQuery.event.fix(event || window.event);
			var handlers = ((jQuery._data(this, "events") || {})[event.type] || []), delegateCount = handlers.delegateCount, args = [].slice
					.call(arguments, 0), run_all = !event.exclusive
					&& !event.namespace, special = jQuery.event.special[event.type]
					|| {}, handlerQueue = [], i, j, cur, jqcur, ret, selMatch, matched, matches, handleObj, sel, related;
			args[0] = event;
			event.delegateTarget = this;
			if (special.preDispatch
					&& special.preDispatch.call(this, event) === false) {
				return;
			}
			if (delegateCount && !(event.button && event.type === "click")) {
				jqcur = jQuery(this);
				jqcur.context = this.ownerDocument || this;
				for (cur = event.target; cur != this; cur = cur.parentNode
						|| this) {
					if (cur.disabled !== true) {
						selMatch = {};
						matches = [];
						jqcur[0] = cur;
						for (i = 0; i < delegateCount; i++) {
							handleObj = handlers[i];
							sel = handleObj.selector;
							if (selMatch[sel] === undefined) {
								selMatch[sel] = (handleObj.quick ? quickIs(cur,
										handleObj.quick) : jqcur.is(sel));
							}
							if (selMatch[sel]) {
								matches.push(handleObj);
							}
						}
						if (matches.length) {
							handlerQueue.push({
								elem : cur,
								matches : matches
							});
						}
					}
				}
			}
			if (handlers.length > delegateCount) {
				handlerQueue.push({
					elem : this,
					matches : handlers.slice(delegateCount)
				});
			}
			for (i = 0; i < handlerQueue.length
					&& !event.isPropagationStopped(); i++) {
				matched = handlerQueue[i];
				event.currentTarget = matched.elem;
				for (j = 0; j < matched.matches.length
						&& !event.isImmediatePropagationStopped(); j++) {
					handleObj = matched.matches[j];
					if (run_all || (!event.namespace && !handleObj.namespace)
							|| event.namespace_re
							&& event.namespace_re.test(handleObj.namespace)) {
						event.data = handleObj.data;
						event.handleObj = handleObj;
						ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler)
								.apply(matched.elem, args);
						if (ret !== undefined) {
							event.result = ret;
							if (ret === false) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}
			if (special.postDispatch) {
				special.postDispatch.call(this, event);
			}
			return event.result;
		},
		props : "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which"
				.split(" "),
		fixHooks : {},
		keyHooks : {
			props : "char charCode key keyCode".split(" "),
			filter : function(event, original) {
				if (event.which == null) {
					event.which = original.charCode != null ? original.charCode
							: original.keyCode;
				}
				return event;
			}
		},
		mouseHooks : {
			props : "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement"
					.split(" "),
			filter : function(event, original) {
				var eventDoc, doc, body, button = original.button, fromElement = original.fromElement;
				if (event.pageX == null && original.clientX != null) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;
					event.pageX = original.clientX
							+ (doc && doc.scrollLeft || body && body.scrollLeft || 0)
							- (doc && doc.clientLeft || body && body.clientLeft || 0);
					event.pageY = original.clientY
							+ (doc && doc.scrollTop || body && body.scrollTop || 0)
							- (doc && doc.clientTop || body && body.clientTop || 0);
				}
				if (!event.relatedTarget && fromElement) {
					event.relatedTarget = fromElement === event.target ? original.toElement
							: fromElement;
				}
				if (!event.which && button !== undefined) {
					event.which = (button & 1 ? 1 : (button & 2 ? 3
							: (button & 4 ? 2 : 0)));
				}
				return event;
			}
		},
		fix : function(event) {
			if (event[jQuery.expando]) {
				return event;
			}
			var i, prop, originalEvent = event, fixHook = jQuery.event.fixHooks[event.type]
					|| {}, copy = fixHook.props ? this.props
					.concat(fixHook.props) : this.props;
			event = jQuery.Event(originalEvent);
			for (i = copy.length; i;) {
				prop = copy[--i];
				event[prop] = originalEvent[prop];
			}
			if (!event.target) {
				event.target = originalEvent.srcElement || document;
			}
			if (event.target.nodeType === 3) {
				event.target = event.target.parentNode;
			}
			if (event.metaKey === undefined) {
				event.metaKey = event.ctrlKey;
			}
			return fixHook.filter ? fixHook.filter(event, originalEvent)
					: event;
		},
		special : {
			ready : {
				setup : jQuery.bindReady
			},
			load : {
				noBubble : true
			},
			focus : {
				delegateType : "focusin"
			},
			blur : {
				delegateType : "focusout"
			},
			beforeunload : {
				setup : function(data, namespaces, eventHandle) {
					if (jQuery.isWindow(this)) {
						this.onbeforeunload = eventHandle;
					}
				},
				teardown : function(namespaces, eventHandle) {
					if (this.onbeforeunload === eventHandle) {
						this.onbeforeunload = null;
					}
				}
			}
		},
		simulate : function(type, elem, event, bubble) {
			var e = jQuery.extend(new jQuery.Event(), event, {
				type : type,
				isSimulated : true,
				originalEvent : {}
			});
			if (bubble) {
				jQuery.event.trigger(e, null, elem);
			} else {
				jQuery.event.dispatch.call(elem, e);
			}
			if (e.isDefaultPrevented()) {
				event.preventDefault();
			}
		}
	};
	jQuery.event.handle = jQuery.event.dispatch;
	jQuery.removeEvent = document.removeEventListener ? function(elem, type,
			handle) {
		if (elem.removeEventListener) {
			elem.removeEventListener(type, handle, false);
		}
	} : function(elem, type, handle) {
		if (elem.detachEvent) {
			elem.detachEvent("on" + type, handle);
		}
	};
	jQuery.Event = function(src, props) {
		if (!(this instanceof jQuery.Event)) {
			return new jQuery.Event(src, props);
		}
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;
			this.isDefaultPrevented = (src.defaultPrevented
					|| src.returnValue === false || src.getPreventDefault
					&& src.getPreventDefault()) ? returnTrue : returnFalse;
		} else {
			this.type = src;
		}
		if (props) {
			jQuery.extend(this, props);
		}
		this.timeStamp = src && src.timeStamp || jQuery.now();
		this[jQuery.expando] = true;
	};
	function returnFalse() {
		return false;
	}
	function returnTrue() {
		return true;
	}
	jQuery.Event.prototype = {
		preventDefault : function() {
			this.isDefaultPrevented = returnTrue;
			var e = this.originalEvent;
			if (!e) {
				return;
			}
			if (e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
			}
		},
		stopPropagation : function() {
			this.isPropagationStopped = returnTrue;
			var e = this.originalEvent;
			if (!e) {
				return;
			}
			if (e.stopPropagation) {
				e.stopPropagation();
			}
			e.cancelBubble = true;
		},
		stopImmediatePropagation : function() {
			this.isImmediatePropagationStopped = returnTrue;
			this.stopPropagation();
		},
		isDefaultPrevented : returnFalse,
		isPropagationStopped : returnFalse,
		isImmediatePropagationStopped : returnFalse
	};
	jQuery
			.each(
					{
						mouseenter : "mouseover",
						mouseleave : "mouseout"
					},
					function(orig, fix) {
						jQuery.event.special[orig] = {
							delegateType : fix,
							bindType : fix,
							handle : function(event) {
								var target = this, related = event.relatedTarget, handleObj = event.handleObj, selector = handleObj.selector, ret;
								if (!related
										|| (related !== target && !jQuery
												.contains(target, related))) {
									event.type = handleObj.origType;
									ret = handleObj.handler.apply(this,
											arguments);
									event.type = fix;
								}
								return ret;
							}
						};
					});
	if (!jQuery.support.submitBubbles) {
		jQuery.event.special.submit = {
			setup : function() {
				if (jQuery.nodeName(this, "form")) {
					return false;
				}
				jQuery.event
						.add(
								this,
								"click._submit keypress._submit",
								function(e) {
									var elem = e.target, form = jQuery
											.nodeName(elem, "input")
											|| jQuery.nodeName(elem, "button") ? elem.form
											: undefined;
									if (form && !form._submit_attached) {
										jQuery.event
												.add(
														form,
														"submit._submit",
														function(event) {
															event._submit_bubble = true;
														});
										form._submit_attached = true;
									}
								});
			},
			postDispatch : function(event) {
				if (event._submit_bubble) {
					delete event._submit_bubble;
					if (this.parentNode && !event.isTrigger) {
						jQuery.event.simulate("submit", this.parentNode, event,
								true);
					}
				}
			},
			teardown : function() {
				if (jQuery.nodeName(this, "form")) {
					return false;
				}
				jQuery.event.remove(this, "._submit");
			}
		};
	}
	if (!jQuery.support.changeBubbles) {
		jQuery.event.special.change = {
			setup : function() {
				if (rformElems.test(this.nodeName)) {
					if (this.type === "checkbox" || this.type === "radio") {
						jQuery.event
								.add(
										this,
										"propertychange._change",
										function(event) {
											if (event.originalEvent.propertyName === "checked") {
												this._just_changed = true;
											}
										});
						jQuery.event
								.add(this, "click._change",
										function(event) {
											if (this._just_changed
													&& !event.isTrigger) {
												this._just_changed = false;
												jQuery.event.simulate("change",
														this, event, true);
											}
										});
					}
					return false;
				}
				jQuery.event.add(this, "beforeactivate._change", function(e) {
					var elem = e.target;
					if (rformElems.test(elem.nodeName)
							&& !elem._change_attached) {
						jQuery.event.add(elem, "change._change",
								function(event) {
									if (this.parentNode && !event.isSimulated
											&& !event.isTrigger) {
										jQuery.event.simulate("change",
												this.parentNode, event, true);
									}
								});
						elem._change_attached = true;
					}
				});
			},
			handle : function(event) {
				var elem = event.target;
				if (this !== elem || event.isSimulated || event.isTrigger
						|| (elem.type !== "radio" && elem.type !== "checkbox")) {
					return event.handleObj.handler.apply(this, arguments);
				}
			},
			teardown : function() {
				jQuery.event.remove(this, "._change");
				return rformElems.test(this.nodeName);
			}
		};
	}
	if (!jQuery.support.focusinBubbles) {
		jQuery.each({
			focus : "focusin",
			blur : "focusout"
		}, function(orig, fix) {
			var attaches = 0, handler = function(event) {
				jQuery.event.simulate(fix, event.target, jQuery.event
						.fix(event), true);
			};
			jQuery.event.special[fix] = {
				setup : function() {
					if (attaches++ === 0) {
						document.addEventListener(orig, handler, true);
					}
				},
				teardown : function() {
					if (--attaches === 0) {
						document.removeEventListener(orig, handler, true);
					}
				}
			};
		});
	}
	jQuery.fn
			.extend({
				on : function(types, selector, data, fn, one) {
					var origFn, type;
					if (typeof types === "object") {
						if (typeof selector !== "string") {
							data = data || selector;
							selector = undefined;
						}
						for (type in types) {
							this.on(type, selector, data, types[type], one);
						}
						return this;
					}
					if (data == null && fn == null) {
						fn = selector;
						data = selector = undefined;
					} else {
						if (fn == null) {
							if (typeof selector === "string") {
								fn = data;
								data = undefined;
							} else {
								fn = data;
								data = selector;
								selector = undefined;
							}
						}
					}
					if (fn === false) {
						fn = returnFalse;
					} else {
						if (!fn) {
							return this;
						}
					}
					if (one === 1) {
						origFn = fn;
						fn = function(event) {
							jQuery().off(event);
							return origFn.apply(this, arguments);
						};
						fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
					}
					return this.each(function() {
						jQuery.event.add(this, types, fn, data, selector);
					});
				},
				one : function(types, selector, data, fn) {
					return this.on(types, selector, data, fn, 1);
				},
				off : function(types, selector, fn) {
					if (types && types.preventDefault && types.handleObj) {
						var handleObj = types.handleObj;
						jQuery(types.delegateTarget).off(
								handleObj.namespace ? handleObj.origType + "."
										+ handleObj.namespace
										: handleObj.origType,
								handleObj.selector, handleObj.handler);
						return this;
					}
					if (typeof types === "object") {
						for ( var type in types) {
							this.off(type, selector, types[type]);
						}
						return this;
					}
					if (selector === false || typeof selector === "function") {
						fn = selector;
						selector = undefined;
					}
					if (fn === false) {
						fn = returnFalse;
					}
					return this.each(function() {
						jQuery.event.remove(this, types, fn, selector);
					});
				},
				bind : function(types, data, fn) {
					return this.on(types, null, data, fn);
				},
				unbind : function(types, fn) {
					return this.off(types, null, fn);
				},
				live : function(types, data, fn) {
					jQuery(this.context).on(types, this.selector, data, fn);
					return this;
				},
				die : function(types, fn) {
					jQuery(this.context).off(types, this.selector || "**", fn);
					return this;
				},
				delegate : function(selector, types, data, fn) {
					return this.on(types, selector, data, fn);
				},
				undelegate : function(selector, types, fn) {
					return arguments.length == 1 ? this.off(selector, "**")
							: this.off(types, selector, fn);
				},
				trigger : function(type, data) {
					return this.each(function() {
						jQuery.event.trigger(type, data, this);
					});
				},
				triggerHandler : function(type, data) {
					if (this[0]) {
						return jQuery.event.trigger(type, data, this[0], true);
					}
				},
				toggle : function(fn) {
					var args = arguments, guid = fn.guid || jQuery.guid++, i = 0, toggler = function(
							event) {
						var lastToggle = (jQuery._data(this, "lastToggle"
								+ fn.guid) || 0)
								% i;
						jQuery._data(this, "lastToggle" + fn.guid,
								lastToggle + 1);
						event.preventDefault();
						return args[lastToggle].apply(this, arguments) || false;
					};
					toggler.guid = guid;
					while (i < args.length) {
						args[i++].guid = guid;
					}
					return this.click(toggler);
				},
				hover : function(fnOver, fnOut) {
					return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
				}
			});
	jQuery
			.each(
					("blur focus focusin focusout load resize scroll unload click dblclick "
							+ "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "
							+ "change select submit keydown keypress keyup error contextmenu")
							.split(" "),
					function(i, name) {
						jQuery.fn[name] = function(data, fn) {
							if (fn == null) {
								fn = data;
								data = null;
							}
							return arguments.length > 0 ? this.on(name, null,
									data, fn) : this.trigger(name);
						};
						if (jQuery.attrFn) {
							jQuery.attrFn[name] = true;
						}
						if (rkeyEvent.test(name)) {
							jQuery.event.fixHooks[name] = jQuery.event.keyHooks;
						}
						if (rmouseEvent.test(name)) {
							jQuery.event.fixHooks[name] = jQuery.event.mouseHooks;
						}
					});
	/*
	 * Sizzle CSS Selector Engine Copyright 2011, The Dojo Foundation Released
	 * under the MIT, BSD, and GPL Licenses. More information:
	 * http://sizzlejs.com/
	 */
	(function() {
		var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, expando = "sizcache"
				+ (Math.random() + "").replace(".", ""), done = 0, toString = Object.prototype.toString, hasDuplicate = false, baseHasDuplicate = true, rBackslash = /\\/g, rReturn = /\r\n/g, rNonWord = /\W/;
		[ 0, 0 ].sort(function() {
			baseHasDuplicate = false;
			return 0;
		});
		var Sizzle = function(selector, context, results, seed) {
			results = results || [];
			context = context || document;
			var origContext = context;
			if (context.nodeType !== 1 && context.nodeType !== 9) {
				return [];
			}
			if (!selector || typeof selector !== "string") {
				return results;
			}
			var m, set, checkSet, extra, ret, cur, pop, i, prune = true, contextXML = Sizzle
					.isXML(context), parts = [], soFar = selector;
			do {
				chunker.exec("");
				m = chunker.exec(soFar);
				if (m) {
					soFar = m[3];
					parts.push(m[1]);
					if (m[2]) {
						extra = m[3];
						break;
					}
				}
			} while (m);
			if (parts.length > 1 && origPOS.exec(selector)) {
				if (parts.length === 2 && Expr.relative[parts[0]]) {
					set = posProcess(parts[0] + parts[1], context, seed);
				} else {
					set = Expr.relative[parts[0]] ? [ context ] : Sizzle(parts
							.shift(), context);
					while (parts.length) {
						selector = parts.shift();
						if (Expr.relative[selector]) {
							selector += parts.shift();
						}
						set = posProcess(selector, set, seed);
					}
				}
			} else {
				if (!seed && parts.length > 1 && context.nodeType === 9
						&& !contextXML && Expr.match.ID.test(parts[0])
						&& !Expr.match.ID.test(parts[parts.length - 1])) {
					ret = Sizzle.find(parts.shift(), context, contextXML);
					context = ret.expr ? Sizzle.filter(ret.expr, ret.set)[0]
							: ret.set[0];
				}
				if (context) {
					ret = seed ? {
						expr : parts.pop(),
						set : makeArray(seed)
					} : Sizzle.find(parts.pop(), parts.length === 1
							&& (parts[0] === "~" || parts[0] === "+")
							&& context.parentNode ? context.parentNode
							: context, contextXML);
					set = ret.expr ? Sizzle.filter(ret.expr, ret.set) : ret.set;
					if (parts.length > 0) {
						checkSet = makeArray(set);
					} else {
						prune = false;
					}
					while (parts.length) {
						cur = parts.pop();
						pop = cur;
						if (!Expr.relative[cur]) {
							cur = "";
						} else {
							pop = parts.pop();
						}
						if (pop == null) {
							pop = context;
						}
						Expr.relative[cur](checkSet, pop, contextXML);
					}
				} else {
					checkSet = parts = [];
				}
			}
			if (!checkSet) {
				checkSet = set;
			}
			if (!checkSet) {
				Sizzle.error(cur || selector);
			}
			if (toString.call(checkSet) === "[object Array]") {
				if (!prune) {
					results.push.apply(results, checkSet);
				} else {
					if (context && context.nodeType === 1) {
						for (i = 0; checkSet[i] != null; i++) {
							if (checkSet[i]
									&& (checkSet[i] === true || checkSet[i].nodeType === 1
											&& Sizzle.contains(context,
													checkSet[i]))) {
								results.push(set[i]);
							}
						}
					} else {
						for (i = 0; checkSet[i] != null; i++) {
							if (checkSet[i] && checkSet[i].nodeType === 1) {
								results.push(set[i]);
							}
						}
					}
				}
			} else {
				makeArray(checkSet, results);
			}
			if (extra) {
				Sizzle(extra, origContext, results, seed);
				Sizzle.uniqueSort(results);
			}
			return results;
		};
		Sizzle.uniqueSort = function(results) {
			if (sortOrder) {
				hasDuplicate = baseHasDuplicate;
				results.sort(sortOrder);
				if (hasDuplicate) {
					for ( var i = 1; i < results.length; i++) {
						if (results[i] === results[i - 1]) {
							results.splice(i--, 1);
						}
					}
				}
			}
			return results;
		};
		Sizzle.matches = function(expr, set) {
			return Sizzle(expr, null, null, set);
		};
		Sizzle.matchesSelector = function(node, expr) {
			return Sizzle(expr, null, null, [ node ]).length > 0;
		};
		Sizzle.find = function(expr, context, isXML) {
			var set, i, len, match, type, left;
			if (!expr) {
				return [];
			}
			for (i = 0, len = Expr.order.length; i < len; i++) {
				type = Expr.order[i];
				if ((match = Expr.leftMatch[type].exec(expr))) {
					left = match[1];
					match.splice(1, 1);
					if (left.substr(left.length - 1) !== "\\") {
						match[1] = (match[1] || "").replace(rBackslash, "");
						set = Expr.find[type](match, context, isXML);
						if (set != null) {
							expr = expr.replace(Expr.match[type], "");
							break;
						}
					}
				}
			}
			if (!set) {
				set = typeof context.getElementsByTagName !== "undefined" ? context
						.getElementsByTagName("*")
						: [];
			}
			return {
				set : set,
				expr : expr
			};
		};
		Sizzle.filter = function(expr, set, inplace, not) {
			var match, anyFound, type, found, item, filter, left, i, pass, old = expr, result = [], curLoop = set, isXMLFilter = set
					&& set[0] && Sizzle.isXML(set[0]);
			while (expr && set.length) {
				for (type in Expr.filter) {
					if ((match = Expr.leftMatch[type].exec(expr)) != null
							&& match[2]) {
						filter = Expr.filter[type];
						left = match[1];
						anyFound = false;
						match.splice(1, 1);
						if (left.substr(left.length - 1) === "\\") {
							continue;
						}
						if (curLoop === result) {
							result = [];
						}
						if (Expr.preFilter[type]) {
							match = Expr.preFilter[type](match, curLoop,
									inplace, result, not, isXMLFilter);
							if (!match) {
								anyFound = found = true;
							} else {
								if (match === true) {
									continue;
								}
							}
						}
						if (match) {
							for (i = 0; (item = curLoop[i]) != null; i++) {
								if (item) {
									found = filter(item, match, i, curLoop);
									pass = not ^ found;
									if (inplace && found != null) {
										if (pass) {
											anyFound = true;
										} else {
											curLoop[i] = false;
										}
									} else {
										if (pass) {
											result.push(item);
											anyFound = true;
										}
									}
								}
							}
						}
						if (found !== undefined) {
							if (!inplace) {
								curLoop = result;
							}
							expr = expr.replace(Expr.match[type], "");
							if (!anyFound) {
								return [];
							}
							break;
						}
					}
				}
				if (expr === old) {
					if (anyFound == null) {
						Sizzle.error(expr);
					} else {
						break;
					}
				}
				old = expr;
			}
			return curLoop;
		};
		Sizzle.error = function(msg) {
			throw new Error("Syntax error, unrecognized expression: " + msg);
		};
		var getText = Sizzle.getText = function(elem) {
			var i, node, nodeType = elem.nodeType, ret = "";
			if (nodeType) {
				if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
					if (typeof elem.textContent === "string") {
						return elem.textContent;
					} else {
						if (typeof elem.innerText === "string") {
							return elem.innerText.replace(rReturn, "");
						} else {
							for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
								ret += getText(elem);
							}
						}
					}
				} else {
					if (nodeType === 3 || nodeType === 4) {
						return elem.nodeValue;
					}
				}
			} else {
				for (i = 0; (node = elem[i]); i++) {
					if (node.nodeType !== 8) {
						ret += getText(node);
					}
				}
			}
			return ret;
		};
		var Expr = Sizzle.selectors = {
			order : [ "ID", "NAME", "TAG" ],
			match : {
				ID : /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
				CLASS : /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
				NAME : /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
				ATTR : /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
				TAG : /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
				CHILD : /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
				POS : /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
				PSEUDO : /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
			},
			leftMatch : {},
			attrMap : {
				"class" : "className",
				"for" : "htmlFor"
			},
			attrHandle : {
				href : function(elem) {
					return elem.getAttribute("href");
				},
				type : function(elem) {
					return elem.getAttribute("type");
				}
			},
			relative : {
				"+" : function(checkSet, part) {
					var isPartStr = typeof part === "string", isTag = isPartStr
							&& !rNonWord.test(part), isPartStrNotTag = isPartStr
							&& !isTag;
					if (isTag) {
						part = part.toLowerCase();
					}
					for ( var i = 0, l = checkSet.length, elem; i < l; i++) {
						if ((elem = checkSet[i])) {
							while ((elem = elem.previousSibling)
									&& elem.nodeType !== 1) {
							}
							checkSet[i] = isPartStrNotTag || elem
									&& elem.nodeName.toLowerCase() === part ? elem || false
									: elem === part;
						}
					}
					if (isPartStrNotTag) {
						Sizzle.filter(part, checkSet, true);
					}
				},
				">" : function(checkSet, part) {
					var elem, isPartStr = typeof part === "string", i = 0, l = checkSet.length;
					if (isPartStr && !rNonWord.test(part)) {
						part = part.toLowerCase();
						for (; i < l; i++) {
							elem = checkSet[i];
							if (elem) {
								var parent = elem.parentNode;
								checkSet[i] = parent.nodeName.toLowerCase() === part ? parent
										: false;
							}
						}
					} else {
						for (; i < l; i++) {
							elem = checkSet[i];
							if (elem) {
								checkSet[i] = isPartStr ? elem.parentNode
										: elem.parentNode === part;
							}
						}
						if (isPartStr) {
							Sizzle.filter(part, checkSet, true);
						}
					}
				},
				"" : function(checkSet, part, isXML) {
					var nodeCheck, doneName = done++, checkFn = dirCheck;
					if (typeof part === "string" && !rNonWord.test(part)) {
						part = part.toLowerCase();
						nodeCheck = part;
						checkFn = dirNodeCheck;
					}
					checkFn("parentNode", part, doneName, checkSet, nodeCheck,
							isXML);
				},
				"~" : function(checkSet, part, isXML) {
					var nodeCheck, doneName = done++, checkFn = dirCheck;
					if (typeof part === "string" && !rNonWord.test(part)) {
						part = part.toLowerCase();
						nodeCheck = part;
						checkFn = dirNodeCheck;
					}
					checkFn("previousSibling", part, doneName, checkSet,
							nodeCheck, isXML);
				}
			},
			find : {
				ID : function(match, context, isXML) {
					if (typeof context.getElementById !== "undefined" && !isXML) {
						var m = context.getElementById(match[1]);
						return m && m.parentNode ? [ m ] : [];
					}
				},
				NAME : function(match, context) {
					if (typeof context.getElementsByName !== "undefined") {
						var ret = [], results = context
								.getElementsByName(match[1]);
						for ( var i = 0, l = results.length; i < l; i++) {
							if (results[i].getAttribute("name") === match[1]) {
								ret.push(results[i]);
							}
						}
						return ret.length === 0 ? null : ret;
					}
				},
				TAG : function(match, context) {
					if (typeof context.getElementsByTagName !== "undefined") {
						return context.getElementsByTagName(match[1]);
					}
				}
			},
			preFilter : {
				CLASS : function(match, curLoop, inplace, result, not, isXML) {
					match = " " + match[1].replace(rBackslash, "") + " ";
					if (isXML) {
						return match;
					}
					for ( var i = 0, elem; (elem = curLoop[i]) != null; i++) {
						if (elem) {
							if (not
									^ (elem.className && (" " + elem.className + " ")
											.replace(/[\t\n\r]/g, " ").indexOf(
													match) >= 0)) {
								if (!inplace) {
									result.push(elem);
								}
							} else {
								if (inplace) {
									curLoop[i] = false;
								}
							}
						}
					}
					return false;
				},
				ID : function(match) {
					return match[1].replace(rBackslash, "");
				},
				TAG : function(match, curLoop) {
					return match[1].replace(rBackslash, "").toLowerCase();
				},
				CHILD : function(match) {
					if (match[1] === "nth") {
						if (!match[2]) {
							Sizzle.error(match[0]);
						}
						match[2] = match[2].replace(/^\+|\s*/g, "");
						var test = /(-?)(\d*)(?:n([+\-]?\d*))?/
								.exec(match[2] === "even" && "2n"
										|| match[2] === "odd" && "2n+1"
										|| !/\D/.test(match[2]) && "0n+"
										+ match[2] || match[2]);
						match[2] = (test[1] + (test[2] || 1)) - 0;
						match[3] = test[3] - 0;
					} else {
						if (match[2]) {
							Sizzle.error(match[0]);
						}
					}
					match[0] = done++;
					return match;
				},
				ATTR : function(match, curLoop, inplace, result, not, isXML) {
					var name = match[1] = match[1].replace(rBackslash, "");
					if (!isXML && Expr.attrMap[name]) {
						match[1] = Expr.attrMap[name];
					}
					match[4] = (match[4] || match[5] || "").replace(rBackslash,
							"");
					if (match[2] === "~=") {
						match[4] = " " + match[4] + " ";
					}
					return match;
				},
				PSEUDO : function(match, curLoop, inplace, result, not) {
					if (match[1] === "not") {
						if ((chunker.exec(match[3]) || "").length > 1
								|| /^\w/.test(match[3])) {
							match[3] = Sizzle(match[3], null, null, curLoop);
						} else {
							var ret = Sizzle.filter(match[3], curLoop, inplace,
									true ^ not);
							if (!inplace) {
								result.push.apply(result, ret);
							}
							return false;
						}
					} else {
						if (Expr.match.POS.test(match[0])
								|| Expr.match.CHILD.test(match[0])) {
							return true;
						}
					}
					return match;
				},
				POS : function(match) {
					match.unshift(true);
					return match;
				}
			},
			filters : {
				enabled : function(elem) {
					return elem.disabled === false && elem.type !== "hidden";
				},
				disabled : function(elem) {
					return elem.disabled === true;
				},
				checked : function(elem) {
					return elem.checked === true;
				},
				selected : function(elem) {
					if (elem.parentNode) {
						elem.parentNode.selectedIndex;
					}
					return elem.selected === true;
				},
				parent : function(elem) {
					return !!elem.firstChild;
				},
				empty : function(elem) {
					return !elem.firstChild;
				},
				has : function(elem, i, match) {
					return !!Sizzle(match[3], elem).length;
				},
				header : function(elem) {
					return (/h\d/i).test(elem.nodeName);
				},
				text : function(elem) {
					var attr = elem.getAttribute("type"), type = elem.type;
					return elem.nodeName.toLowerCase() === "input"
							&& "text" === type
							&& (attr === type || attr === null);
				},
				radio : function(elem) {
					return elem.nodeName.toLowerCase() === "input"
							&& "radio" === elem.type;
				},
				checkbox : function(elem) {
					return elem.nodeName.toLowerCase() === "input"
							&& "checkbox" === elem.type;
				},
				file : function(elem) {
					return elem.nodeName.toLowerCase() === "input"
							&& "file" === elem.type;
				},
				password : function(elem) {
					return elem.nodeName.toLowerCase() === "input"
							&& "password" === elem.type;
				},
				submit : function(elem) {
					var name = elem.nodeName.toLowerCase();
					return (name === "input" || name === "button")
							&& "submit" === elem.type;
				},
				image : function(elem) {
					return elem.nodeName.toLowerCase() === "input"
							&& "image" === elem.type;
				},
				reset : function(elem) {
					var name = elem.nodeName.toLowerCase();
					return (name === "input" || name === "button")
							&& "reset" === elem.type;
				},
				button : function(elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && "button" === elem.type
							|| name === "button";
				},
				input : function(elem) {
					return (/input|select|textarea|button/i)
							.test(elem.nodeName);
				},
				focus : function(elem) {
					return elem === elem.ownerDocument.activeElement;
				}
			},
			setFilters : {
				first : function(elem, i) {
					return i === 0;
				},
				last : function(elem, i, match, array) {
					return i === array.length - 1;
				},
				even : function(elem, i) {
					return i % 2 === 0;
				},
				odd : function(elem, i) {
					return i % 2 === 1;
				},
				lt : function(elem, i, match) {
					return i < match[3] - 0;
				},
				gt : function(elem, i, match) {
					return i > match[3] - 0;
				},
				nth : function(elem, i, match) {
					return match[3] - 0 === i;
				},
				eq : function(elem, i, match) {
					return match[3] - 0 === i;
				}
			},
			filter : {
				PSEUDO : function(elem, match, i, array) {
					var name = match[1], filter = Expr.filters[name];
					if (filter) {
						return filter(elem, i, match, array);
					} else {
						if (name === "contains") {
							return (elem.textContent || elem.innerText
									|| getText([ elem ]) || "")
									.indexOf(match[3]) >= 0;
						} else {
							if (name === "not") {
								var not = match[3];
								for ( var j = 0, l = not.length; j < l; j++) {
									if (not[j] === elem) {
										return false;
									}
								}
								return true;
							} else {
								Sizzle.error(name);
							}
						}
					}
				},
				CHILD : function(elem, match) {
					var first, last, doneName, parent, cache, count, diff, type = match[1], node = elem;
					switch (type) {
					case "only":
					case "first":
						while ((node = node.previousSibling)) {
							if (node.nodeType === 1) {
								return false;
							}
						}
						if (type === "first") {
							return true;
						}
						node = elem;
					case "last":
						while ((node = node.nextSibling)) {
							if (node.nodeType === 1) {
								return false;
							}
						}
						return true;
					case "nth":
						first = match[2];
						last = match[3];
						if (first === 1 && last === 0) {
							return true;
						}
						doneName = match[0];
						parent = elem.parentNode;
						if (parent
								&& (parent[expando] !== doneName || !elem.nodeIndex)) {
							count = 0;
							for (node = parent.firstChild; node; node = node.nextSibling) {
								if (node.nodeType === 1) {
									node.nodeIndex = ++count;
								}
							}
							parent[expando] = doneName;
						}
						diff = elem.nodeIndex - last;
						if (first === 0) {
							return diff === 0;
						} else {
							return (diff % first === 0 && diff / first >= 0);
						}
					}
				},
				ID : function(elem, match) {
					return elem.nodeType === 1
							&& elem.getAttribute("id") === match;
				},
				TAG : function(elem, match) {
					return (match === "*" && elem.nodeType === 1)
							|| !!elem.nodeName
							&& elem.nodeName.toLowerCase() === match;
				},
				CLASS : function(elem, match) {
					return (" "
							+ (elem.className || elem.getAttribute("class")) + " ")
							.indexOf(match) > -1;
				},
				ATTR : function(elem, match) {
					var name = match[1], result = Sizzle.attr ? Sizzle.attr(
							elem, name)
							: Expr.attrHandle[name] ? Expr.attrHandle[name]
									(elem) : elem[name] != null ? elem[name]
									: elem.getAttribute(name), value = result
							+ "", type = match[2], check = match[4];
					return result == null ? type === "!="
							: !type && Sizzle.attr ? result != null
									: type === "=" ? value === check
											: type === "*=" ? value
													.indexOf(check) >= 0
													: type === "~=" ? (" "
															+ value + " ")
															.indexOf(check) >= 0
															: !check ? value
																	&& result !== false
																	: type === "!=" ? value !== check
																			: type === "^=" ? value
																					.indexOf(check) === 0
																					: type === "$=" ? value
																							.substr(value.length
																									- check.length) === check
																							: type === "|=" ? value === check
																									|| value
																											.substr(
																													0,
																													check.length + 1) === check
																											+ "-"
																									: false;
				},
				POS : function(elem, match, i, array) {
					var name = match[2], filter = Expr.setFilters[name];
					if (filter) {
						return filter(elem, i, match, array);
					}
				}
			}
		};
		var origPOS = Expr.match.POS, fescape = function(all, num) {
			return "\\" + (num - 0 + 1);
		};
		for ( var type in Expr.match) {
			Expr.match[type] = new RegExp(Expr.match[type].source
					+ (/(?![^\[]*\])(?![^\(]*\))/.source));
			Expr.leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source
					+ Expr.match[type].source.replace(/\\(\d+)/g, fescape));
		}
		Expr.match.globalPOS = origPOS;
		var makeArray = function(array, results) {
			array = Array.prototype.slice.call(array, 0);
			if (results) {
				results.push.apply(results, array);
				return results;
			}
			return array;
		};
		try {
			Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType;
		} catch (e) {
			makeArray = function(array, results) {
				var i = 0, ret = results || [];
				if (toString.call(array) === "[object Array]") {
					Array.prototype.push.apply(ret, array);
				} else {
					if (typeof array.length === "number") {
						for ( var l = array.length; i < l; i++) {
							ret.push(array[i]);
						}
					} else {
						for (; array[i]; i++) {
							ret.push(array[i]);
						}
					}
				}
				return ret;
			};
		}
		var sortOrder, siblingCheck;
		if (document.documentElement.compareDocumentPosition) {
			sortOrder = function(a, b) {
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}
				if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
					return a.compareDocumentPosition ? -1 : 1;
				}
				return a.compareDocumentPosition(b) & 4 ? -1 : 1;
			};
		} else {
			sortOrder = function(a, b) {
				if (a === b) {
					hasDuplicate = true;
					return 0;
				} else {
					if (a.sourceIndex && b.sourceIndex) {
						return a.sourceIndex - b.sourceIndex;
					}
				}
				var al, bl, ap = [], bp = [], aup = a.parentNode, bup = b.parentNode, cur = aup;
				if (aup === bup) {
					return siblingCheck(a, b);
				} else {
					if (!aup) {
						return -1;
					} else {
						if (!bup) {
							return 1;
						}
					}
				}
				while (cur) {
					ap.unshift(cur);
					cur = cur.parentNode;
				}
				cur = bup;
				while (cur) {
					bp.unshift(cur);
					cur = cur.parentNode;
				}
				al = ap.length;
				bl = bp.length;
				for ( var i = 0; i < al && i < bl; i++) {
					if (ap[i] !== bp[i]) {
						return siblingCheck(ap[i], bp[i]);
					}
				}
				return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(
						ap[i], b, 1);
			};
			siblingCheck = function(a, b, ret) {
				if (a === b) {
					return ret;
				}
				var cur = a.nextSibling;
				while (cur) {
					if (cur === b) {
						return -1;
					}
					cur = cur.nextSibling;
				}
				return 1;
			};
		}
		(function() {
			var form = document.createElement("div"), id = "script"
					+ (new Date()).getTime(), root = document.documentElement;
			form.innerHTML = "<a name='" + id + "'/>";
			root.insertBefore(form, root.firstChild);
			if (document.getElementById(id)) {
				Expr.find.ID = function(match, context, isXML) {
					if (typeof context.getElementById !== "undefined" && !isXML) {
						var m = context.getElementById(match[1]);
						return m ? m.id === match[1]
								|| typeof m.getAttributeNode !== "undefined"
								&& m.getAttributeNode("id").nodeValue === match[1] ? [ m ]
								: undefined
								: [];
					}
				};
				Expr.filter.ID = function(elem, match) {
					var node = typeof elem.getAttributeNode !== "undefined"
							&& elem.getAttributeNode("id");
					return elem.nodeType === 1 && node
							&& node.nodeValue === match;
				};
			}
			root.removeChild(form);
			root = form = null;
		})();
		(function() {
			var div = document.createElement("div");
			div.appendChild(document.createComment(""));
			if (div.getElementsByTagName("*").length > 0) {
				Expr.find.TAG = function(match, context) {
					var results = context.getElementsByTagName(match[1]);
					if (match[1] === "*") {
						var tmp = [];
						for ( var i = 0; results[i]; i++) {
							if (results[i].nodeType === 1) {
								tmp.push(results[i]);
							}
						}
						results = tmp;
					}
					return results;
				};
			}
			div.innerHTML = "<a href='#'></a>";
			if (div.firstChild
					&& typeof div.firstChild.getAttribute !== "undefined"
					&& div.firstChild.getAttribute("href") !== "#") {
				Expr.attrHandle.href = function(elem) {
					return elem.getAttribute("href", 2);
				};
			}
			div = null;
		})();
		if (document.querySelectorAll) {
			(function() {
				var oldSizzle = Sizzle, div = document.createElement("div"), id = "__sizzle__";
				div.innerHTML = "<p class='TEST'></p>";
				if (div.querySelectorAll
						&& div.querySelectorAll(".TEST").length === 0) {
					return;
				}
				Sizzle = function(query, context, extra, seed) {
					context = context || document;
					if (!seed && !Sizzle.isXML(context)) {
						var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/
								.exec(query);
						if (match
								&& (context.nodeType === 1 || context.nodeType === 9)) {
							if (match[1]) {
								return makeArray(context
										.getElementsByTagName(query), extra);
							} else {
								if (match[2] && Expr.find.CLASS
										&& context.getElementsByClassName) {
									return makeArray(context
											.getElementsByClassName(match[2]),
											extra);
								}
							}
						}
						if (context.nodeType === 9) {
							if (query === "body" && context.body) {
								return makeArray([ context.body ], extra);
							} else {
								if (match && match[3]) {
									var elem = context.getElementById(match[3]);
									if (elem && elem.parentNode) {
										if (elem.id === match[3]) {
											return makeArray([ elem ], extra);
										}
									} else {
										return makeArray([], extra);
									}
								}
							}
							try {
								return makeArray(context
										.querySelectorAll(query), extra);
							} catch (qsaError) {
							}
						} else {
							if (context.nodeType === 1
									&& context.nodeName.toLowerCase() !== "object") {
								var oldContext = context, old = context
										.getAttribute("id"), nid = old || id, hasParent = context.parentNode, relativeHierarchySelector = /^\s*[+~]/
										.test(query);
								if (!old) {
									context.setAttribute("id", nid);
								} else {
									nid = nid.replace(/'/g, "\\$&");
								}
								if (relativeHierarchySelector && hasParent) {
									context = context.parentNode;
								}
								try {
									if (!relativeHierarchySelector || hasParent) {
										return makeArray(context
												.querySelectorAll("[id='" + nid
														+ "'] " + query), extra);
									}
								} catch (pseudoError) {
								} finally {
									if (!old) {
										oldContext.removeAttribute("id");
									}
								}
							}
						}
					}
					return oldSizzle(query, context, extra, seed);
				};
				for ( var prop in oldSizzle) {
					Sizzle[prop] = oldSizzle[prop];
				}
				div = null;
			})();
		}
		(function() {
			var html = document.documentElement, matches = html.matchesSelector
					|| html.mozMatchesSelector || html.webkitMatchesSelector
					|| html.msMatchesSelector;
			if (matches) {
				var disconnectedMatch = !matches.call(document
						.createElement("div"), "div"), pseudoWorks = false;
				try {
					matches.call(document.documentElement, "[test!='']:sizzle");
				} catch (pseudoError) {
					pseudoWorks = true;
				}
				Sizzle.matchesSelector = function(node, expr) {
					expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
					if (!Sizzle.isXML(node)) {
						try {
							if (pseudoWorks || !Expr.match.PSEUDO.test(expr)
									&& !/!=/.test(expr)) {
								var ret = matches.call(node, expr);
								if (ret || !disconnectedMatch || node.document
										&& node.document.nodeType !== 11) {
									return ret;
								}
							}
						} catch (e) {
						}
					}
					return Sizzle(expr, null, null, [ node ]).length > 0;
				};
			}
		})();
		(function() {
			var div = document.createElement("div");
			div.innerHTML = "<div class='test e'></div><div class='test'></div>";
			if (!div.getElementsByClassName
					|| div.getElementsByClassName("e").length === 0) {
				return;
			}
			div.lastChild.className = "e";
			if (div.getElementsByClassName("e").length === 1) {
				return;
			}
			Expr.order.splice(1, 0, "CLASS");
			Expr.find.CLASS = function(match, context, isXML) {
				if (typeof context.getElementsByClassName !== "undefined"
						&& !isXML) {
					return context.getElementsByClassName(match[1]);
				}
			};
			div = null;
		})();
		function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
			for ( var i = 0, l = checkSet.length; i < l; i++) {
				var elem = checkSet[i];
				if (elem) {
					var match = false;
					elem = elem[dir];
					while (elem) {
						if (elem[expando] === doneName) {
							match = checkSet[elem.sizset];
							break;
						}
						if (elem.nodeType === 1 && !isXML) {
							elem[expando] = doneName;
							elem.sizset = i;
						}
						if (elem.nodeName.toLowerCase() === cur) {
							match = elem;
							break;
						}
						elem = elem[dir];
					}
					checkSet[i] = match;
				}
			}
		}
		function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
			for ( var i = 0, l = checkSet.length; i < l; i++) {
				var elem = checkSet[i];
				if (elem) {
					var match = false;
					elem = elem[dir];
					while (elem) {
						if (elem[expando] === doneName) {
							match = checkSet[elem.sizset];
							break;
						}
						if (elem.nodeType === 1) {
							if (!isXML) {
								elem[expando] = doneName;
								elem.sizset = i;
							}
							if (typeof cur !== "string") {
								if (elem === cur) {
									match = true;
									break;
								}
							} else {
								if (Sizzle.filter(cur, [ elem ]).length > 0) {
									match = elem;
									break;
								}
							}
						}
						elem = elem[dir];
					}
					checkSet[i] = match;
				}
			}
		}
		if (document.documentElement.contains) {
			Sizzle.contains = function(a, b) {
				return a !== b && (a.contains ? a.contains(b) : true);
			};
		} else {
			if (document.documentElement.compareDocumentPosition) {
				Sizzle.contains = function(a, b) {
					return !!(a.compareDocumentPosition(b) & 16);
				};
			} else {
				Sizzle.contains = function() {
					return false;
				};
			}
		}
		Sizzle.isXML = function(elem) {
			var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
			return documentElement ? documentElement.nodeName !== "HTML"
					: false;
		};
		var posProcess = function(selector, context, seed) {
			var match, tmpSet = [], later = "", root = context.nodeType ? [ context ]
					: context;
			while ((match = Expr.match.PSEUDO.exec(selector))) {
				later += match[0];
				selector = selector.replace(Expr.match.PSEUDO, "");
			}
			selector = Expr.relative[selector] ? selector + "*" : selector;
			for ( var i = 0, l = root.length; i < l; i++) {
				Sizzle(selector, root[i], tmpSet, seed);
			}
			return Sizzle.filter(later, tmpSet);
		};
		Sizzle.attr = jQuery.attr;
		Sizzle.selectors.attrMap = {};
		jQuery.find = Sizzle;
		jQuery.expr = Sizzle.selectors;
		jQuery.expr[":"] = jQuery.expr.filters;
		jQuery.unique = Sizzle.uniqueSort;
		jQuery.text = Sizzle.getText;
		jQuery.isXMLDoc = Sizzle.isXML;
		jQuery.contains = Sizzle.contains;
	})();
	var runtil = /Until$/, rparentsprev = /^(?:parents|prevUntil|prevAll)/, rmultiselector = /,/, isSimple = /^.[^:#\[\.,]*$/, slice = Array.prototype.slice, POS = jQuery.expr.match.globalPOS, guaranteedUnique = {
		children : true,
		contents : true,
		next : true,
		prev : true
	};
	jQuery.fn
			.extend({
				find : function(selector) {
					var self = this, i, l;
					if (typeof selector !== "string") {
						return jQuery(selector).filter(function() {
							for (i = 0, l = self.length; i < l; i++) {
								if (jQuery.contains(self[i], this)) {
									return true;
								}
							}
						});
					}
					var ret = this.pushStack("", "find", selector), length, n, r;
					for (i = 0, l = this.length; i < l; i++) {
						length = ret.length;
						jQuery.find(selector, this[i], ret);
						if (i > 0) {
							for (n = length; n < ret.length; n++) {
								for (r = 0; r < length; r++) {
									if (ret[r] === ret[n]) {
										ret.splice(n--, 1);
										break;
									}
								}
							}
						}
					}
					return ret;
				},
				has : function(target) {
					var targets = jQuery(target);
					return this.filter(function() {
						for ( var i = 0, l = targets.length; i < l; i++) {
							if (jQuery.contains(this, targets[i])) {
								return true;
							}
						}
					});
				},
				not : function(selector) {
					return this.pushStack(winnow(this, selector, false), "not",
							selector);
				},
				filter : function(selector) {
					return this.pushStack(winnow(this, selector, true),
							"filter", selector);
				},
				is : function(selector) {
					return !!selector
							&& (typeof selector === "string" ? POS
									.test(selector) ? jQuery(selector,
									this.context).index(this[0]) >= 0 : jQuery
									.filter(selector, this).length > 0 : this
									.filter(selector).length > 0);
				},
				closest : function(selectors, context) {
					var ret = [], i, l, cur = this[0];
					if (jQuery.isArray(selectors)) {
						var level = 1;
						while (cur && cur.ownerDocument && cur !== context) {
							for (i = 0; i < selectors.length; i++) {
								if (jQuery(cur).is(selectors[i])) {
									ret.push({
										selector : selectors[i],
										elem : cur,
										level : level
									});
								}
							}
							cur = cur.parentNode;
							level++;
						}
						return ret;
					}
					var pos = POS.test(selectors)
							|| typeof selectors !== "string" ? jQuery(
							selectors, context || this.context) : 0;
					for (i = 0, l = this.length; i < l; i++) {
						cur = this[i];
						while (cur) {
							if (pos ? pos.index(cur) > -1 : jQuery.find
									.matchesSelector(cur, selectors)) {
								ret.push(cur);
								break;
							} else {
								cur = cur.parentNode;
								if (!cur || !cur.ownerDocument
										|| cur === context
										|| cur.nodeType === 11) {
									break;
								}
							}
						}
					}
					ret = ret.length > 1 ? jQuery.unique(ret) : ret;
					return this.pushStack(ret, "closest", selectors);
				},
				index : function(elem) {
					if (!elem) {
						return (this[0] && this[0].parentNode) ? this.prevAll().length
								: -1;
					}
					if (typeof elem === "string") {
						return jQuery.inArray(this[0], jQuery(elem));
					}
					return jQuery.inArray(elem.jquery ? elem[0] : elem, this);
				},
				add : function(selector, context) {
					var set = typeof selector === "string" ? jQuery(selector,
							context) : jQuery.makeArray(selector
							&& selector.nodeType ? [ selector ] : selector), all = jQuery
							.merge(this.get(), set);
					return this.pushStack(isDisconnected(set[0])
							|| isDisconnected(all[0]) ? all : jQuery
							.unique(all));
				},
				andSelf : function() {
					return this.add(this.prevObject);
				}
			});
	function isDisconnected(node) {
		return !node || !node.parentNode || node.parentNode.nodeType === 11;
	}
	jQuery.each({
		parent : function(elem) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents : function(elem) {
			return jQuery.dir(elem, "parentNode");
		},
		parentsUntil : function(elem, i, until) {
			return jQuery.dir(elem, "parentNode", until);
		},
		next : function(elem) {
			return jQuery.nth(elem, 2, "nextSibling");
		},
		prev : function(elem) {
			return jQuery.nth(elem, 2, "previousSibling");
		},
		nextAll : function(elem) {
			return jQuery.dir(elem, "nextSibling");
		},
		prevAll : function(elem) {
			return jQuery.dir(elem, "previousSibling");
		},
		nextUntil : function(elem, i, until) {
			return jQuery.dir(elem, "nextSibling", until);
		},
		prevUntil : function(elem, i, until) {
			return jQuery.dir(elem, "previousSibling", until);
		},
		siblings : function(elem) {
			return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
		},
		children : function(elem) {
			return jQuery.sibling(elem.firstChild);
		},
		contents : function(elem) {
			return jQuery.nodeName(elem, "iframe") ? elem.contentDocument
					|| elem.contentWindow.document : jQuery
					.makeArray(elem.childNodes);
		}
	}, function(name, fn) {
		jQuery.fn[name] = function(until, selector) {
			var ret = jQuery.map(this, fn, until);
			if (!runtil.test(name)) {
				selector = until;
			}
			if (selector && typeof selector === "string") {
				ret = jQuery.filter(selector, ret);
			}
			ret = this.length > 1 && !guaranteedUnique[name] ? jQuery
					.unique(ret) : ret;
			if ((this.length > 1 || rmultiselector.test(selector))
					&& rparentsprev.test(name)) {
				ret = ret.reverse();
			}
			return this.pushStack(ret, name, slice.call(arguments).join(","));
		};
	});
	jQuery.extend({
		filter : function(expr, elems, not) {
			if (not) {
				expr = ":not(" + expr + ")";
			}
			return elems.length === 1 ? jQuery.find.matchesSelector(elems[0],
					expr) ? [ elems[0] ] : [] : jQuery.find
					.matches(expr, elems);
		},
		dir : function(elem, dir, until) {
			var matched = [], cur = elem[dir];
			while (cur
					&& cur.nodeType !== 9
					&& (until === undefined || cur.nodeType !== 1 || !jQuery(
							cur).is(until))) {
				if (cur.nodeType === 1) {
					matched.push(cur);
				}
				cur = cur[dir];
			}
			return matched;
		},
		nth : function(cur, result, dir, elem) {
			result = result || 1;
			var num = 0;
			for (; cur; cur = cur[dir]) {
				if (cur.nodeType === 1 && ++num === result) {
					break;
				}
			}
			return cur;
		},
		sibling : function(n, elem) {
			var r = [];
			for (; n; n = n.nextSibling) {
				if (n.nodeType === 1 && n !== elem) {
					r.push(n);
				}
			}
			return r;
		}
	});
	function winnow(elements, qualifier, keep) {
		qualifier = qualifier || 0;
		if (jQuery.isFunction(qualifier)) {
			return jQuery.grep(elements, function(elem, i) {
				var retVal = !!qualifier.call(elem, i, elem);
				return retVal === keep;
			});
		} else {
			if (qualifier.nodeType) {
				return jQuery.grep(elements, function(elem, i) {
					return (elem === qualifier) === keep;
				});
			} else {
				if (typeof qualifier === "string") {
					var filtered = jQuery.grep(elements, function(elem) {
						return elem.nodeType === 1;
					});
					if (isSimple.test(qualifier)) {
						return jQuery.filter(qualifier, filtered, !keep);
					} else {
						qualifier = jQuery.filter(qualifier, filtered);
					}
				}
			}
		}
		return jQuery.grep(elements, function(elem, i) {
			return (jQuery.inArray(elem, qualifier) >= 0) === keep;
		});
	}
	function createSafeFragment(document) {
		var list = nodeNames.split("|"), safeFrag = document
				.createDocumentFragment();
		if (safeFrag.createElement) {
			while (list.length) {
				safeFrag.createElement(list.pop());
			}
		}
		return safeFrag;
	}
	var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|"
			+ "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g, rleadingWhitespace = /^\s+/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, rtagName = /<([\w:]+)/, rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style)/i, rnocache = /<(?:script|object|embed|option|style)/i, rnoshimcache = new RegExp(
			"<(?:" + nodeNames + ")[\\s/>]", "i"), rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /\/(java|ecma)script/i, rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)/, wrapMap = {
		option : [ 1, "<select multiple='multiple'>", "</select>" ],
		legend : [ 1, "<fieldset>", "</fieldset>" ],
		thead : [ 1, "<table>", "</table>" ],
		tr : [ 2, "<table><tbody>", "</tbody></table>" ],
		td : [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col : [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area : [ 1, "<map>", "</map>" ],
		_default : [ 0, "", "" ]
	}, safeFragment = createSafeFragment(document);
	wrapMap.optgroup = wrapMap.option;
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	if (!jQuery.support.htmlSerialize) {
		wrapMap._default = [ 1, "div<div>", "</div>" ];
	}
	jQuery.fn
			.extend({
				text : function(value) {
					return jQuery
							.access(
									this,
									function(value) {
										return value === undefined ? jQuery
												.text(this)
												: this
														.empty()
														.append(
																(this[0]
																		&& this[0].ownerDocument || document)
																		.createTextNode(value));
									}, null, value, arguments.length);
				},
				wrapAll : function(html) {
					if (jQuery.isFunction(html)) {
						return this.each(function(i) {
							jQuery(this).wrapAll(html.call(this, i));
						});
					}
					if (this[0]) {
						var wrap = jQuery(html, this[0].ownerDocument).eq(0)
								.clone(true);
						if (this[0].parentNode) {
							wrap.insertBefore(this[0]);
						}
						wrap.map(
								function() {
									var elem = this;
									while (elem.firstChild
											&& elem.firstChild.nodeType === 1) {
										elem = elem.firstChild;
									}
									return elem;
								}).append(this);
					}
					return this;
				},
				wrapInner : function(html) {
					if (jQuery.isFunction(html)) {
						return this.each(function(i) {
							jQuery(this).wrapInner(html.call(this, i));
						});
					}
					return this.each(function() {
						var self = jQuery(this), contents = self.contents();
						if (contents.length) {
							contents.wrapAll(html);
						} else {
							self.append(html);
						}
					});
				},
				wrap : function(html) {
					var isFunction = jQuery.isFunction(html);
					return this.each(function(i) {
						jQuery(this).wrapAll(
								isFunction ? html.call(this, i) : html);
					});
				},
				unwrap : function() {
					return this.parent().each(function() {
						if (!jQuery.nodeName(this, "body")) {
							jQuery(this).replaceWith(this.childNodes);
						}
					}).end();
				},
				append : function() {
					return this.domManip(arguments, true, function(elem) {
						if (this.nodeType === 1) {
							this.appendChild(elem);
						}
					});
				},
				prepend : function() {
					return this.domManip(arguments, true, function(elem) {
						if (this.nodeType === 1) {
							this.insertBefore(elem, this.firstChild);
						}
					});
				},
				before : function() {
					if (this[0] && this[0].parentNode) {
						return this.domManip(arguments, false, function(elem) {
							this.parentNode.insertBefore(elem, this);
						});
					} else {
						if (arguments.length) {
							var set = jQuery.clean(arguments);
							set.push.apply(set, this.toArray());
							return this.pushStack(set, "before", arguments);
						}
					}
				},
				after : function() {
					if (this[0] && this[0].parentNode) {
						return this.domManip(arguments, false, function(elem) {
							this.parentNode
									.insertBefore(elem, this.nextSibling);
						});
					} else {
						if (arguments.length) {
							var set = this.pushStack(this, "after", arguments);
							set.push.apply(set, jQuery.clean(arguments));
							return set;
						}
					}
				},
				remove : function(selector, keepData) {
					for ( var i = 0, elem; (elem = this[i]) != null; i++) {
						if (!selector
								|| jQuery.filter(selector, [ elem ]).length) {
							if (!keepData && elem.nodeType === 1) {
								jQuery
										.cleanData(elem
												.getElementsByTagName("*"));
								jQuery.cleanData([ elem ]);
							}
							if (elem.parentNode) {
								elem.parentNode.removeChild(elem);
							}
						}
					}
					return this;
				},
				empty : function() {
					for ( var i = 0, elem; (elem = this[i]) != null; i++) {
						if (elem.nodeType === 1) {
							jQuery.cleanData(elem.getElementsByTagName("*"));
						}
						while (elem.firstChild) {
							elem.removeChild(elem.firstChild);
						}
					}
					return this;
				},
				clone : function(dataAndEvents, deepDataAndEvents) {
					dataAndEvents = dataAndEvents == null ? false
							: dataAndEvents;
					deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents
							: deepDataAndEvents;
					return this.map(function() {
						return jQuery.clone(this, dataAndEvents,
								deepDataAndEvents);
					});
				},
				html : function(value) {
					return jQuery
							.access(
									this,
									function(value) {
										var elem = this[0] || {}, i = 0, l = this.length;
										if (value === undefined) {
											return elem.nodeType === 1 ? elem.innerHTML
													.replace(rinlinejQuery, "")
													: null;
										}
										if (typeof value === "string"
												&& !rnoInnerhtml.test(value)
												&& (jQuery.support.leadingWhitespace || !rleadingWhitespace
														.test(value))
												&& !wrapMap[(rtagName
														.exec(value) || [ "",
														"" ])[1].toLowerCase()]) {
											value = value.replace(rxhtmlTag,
													"<$1></$2>");
											try {
												for (; i < l; i++) {
													elem = this[i] || {};
													if (elem.nodeType === 1) {
														jQuery
																.cleanData(elem
																		.getElementsByTagName("*"));
														elem.innerHTML = value;
													}
												}
												elem = 0;
											} catch (e) {
											}
										}
										if (elem) {
											this.empty().append(value);
										}
									}, null, value, arguments.length);
				},
				replaceWith : function(value) {
					if (this[0] && this[0].parentNode) {
						if (jQuery.isFunction(value)) {
							return this.each(function(i) {
								var self = jQuery(this), old = self.html();
								self.replaceWith(value.call(this, i, old));
							});
						}
						if (typeof value !== "string") {
							value = jQuery(value).detach();
						}
						return this
								.each(function() {
									var next = this.nextSibling, parent = this.parentNode;
									jQuery(this).remove();
									if (next) {
										jQuery(next).before(value);
									} else {
										jQuery(parent).append(value);
									}
								});
					} else {
						return this.length ? this.pushStack(jQuery(jQuery
								.isFunction(value) ? value() : value),
								"replaceWith", value) : this;
					}
				},
				detach : function(selector) {
					return this.remove(selector, true);
				},
				domManip : function(args, table, callback) {
					var results, first, fragment, parent, value = args[0], scripts = [];
					if (!jQuery.support.checkClone && arguments.length === 3
							&& typeof value === "string"
							&& rchecked.test(value)) {
						return this.each(function() {
							jQuery(this).domManip(args, table, callback, true);
						});
					}
					if (jQuery.isFunction(value)) {
						return this.each(function(i) {
							var self = jQuery(this);
							args[0] = value.call(this, i, table ? self.html()
									: undefined);
							self.domManip(args, table, callback);
						});
					}
					if (this[0]) {
						parent = value && value.parentNode;
						if (jQuery.support.parentNode && parent
								&& parent.nodeType === 11
								&& parent.childNodes.length === this.length) {
							results = {
								fragment : parent
							};
						} else {
							results = jQuery.buildFragment(args, this, scripts);
						}
						fragment = results.fragment;
						if (fragment.childNodes.length === 1) {
							first = fragment = fragment.firstChild;
						} else {
							first = fragment.firstChild;
						}
						if (first) {
							table = table && jQuery.nodeName(first, "tr");
							for ( var i = 0, l = this.length, lastIndex = l - 1; i < l; i++) {
								callback
										.call(
												table ? root(this[i], first)
														: this[i],
												results.cacheable
														|| (l > 1 && i < lastIndex) ? jQuery
														.clone(fragment, true,
																true)
														: fragment);
							}
						}
						if (scripts.length) {
							jQuery.each(scripts, function(i, elem) {
								if (elem.src) {
									jQuery.ajax({
										type : "GET",
										global : false,
										url : elem.src,
										async : false,
										dataType : "script"
									});
								} else {
									jQuery.globalEval((elem.text
											|| elem.textContent
											|| elem.innerHTML || "").replace(
											rcleanScript, "/*$0*/"));
								}
								if (elem.parentNode) {
									elem.parentNode.removeChild(elem);
								}
							});
						}
					}
					return this;
				}
			});
	function root(elem, cur) {
		return jQuery.nodeName(elem, "table") ? (elem
				.getElementsByTagName("tbody")[0] || elem
				.appendChild(elem.ownerDocument.createElement("tbody"))) : elem;
	}
	function cloneCopyEvent(src, dest) {
		if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
			return;
		}
		var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(
				dest, oldData), events = oldData.events;
		if (events) {
			delete curData.handle;
			curData.events = {};
			for (type in events) {
				for (i = 0, l = events[type].length; i < l; i++) {
					jQuery.event.add(dest, type, events[type][i]);
				}
			}
		}
		if (curData.data) {
			curData.data = jQuery.extend({}, curData.data);
		}
	}
	function cloneFixAttributes(src, dest) {
		var nodeName;
		if (dest.nodeType !== 1) {
			return;
		}
		if (dest.clearAttributes) {
			dest.clearAttributes();
		}
		if (dest.mergeAttributes) {
			dest.mergeAttributes(src);
		}
		nodeName = dest.nodeName.toLowerCase();
		if (nodeName === "object") {
			dest.outerHTML = src.outerHTML;
		} else {
			if (nodeName === "input"
					&& (src.type === "checkbox" || src.type === "radio")) {
				if (src.checked) {
					dest.defaultChecked = dest.checked = src.checked;
				}
				if (dest.value !== src.value) {
					dest.value = src.value;
				}
			} else {
				if (nodeName === "option") {
					dest.selected = src.defaultSelected;
				} else {
					if (nodeName === "input" || nodeName === "textarea") {
						dest.defaultValue = src.defaultValue;
					} else {
						if (nodeName === "script" && dest.text !== src.text) {
							dest.text = src.text;
						}
					}
				}
			}
		}
		dest.removeAttribute(jQuery.expando);
		dest.removeAttribute("_submit_attached");
		dest.removeAttribute("_change_attached");
	}
	jQuery.buildFragment = function(args, nodes, scripts) {
		var fragment, cacheable, cacheresults, doc, first = args[0];
		if (nodes && nodes[0]) {
			doc = nodes[0].ownerDocument || nodes[0];
		}
		if (!doc.createDocumentFragment) {
			doc = document;
		}
		if (args.length === 1 && typeof first === "string"
				&& first.length < 512 && doc === document
				&& first.charAt(0) === "<" && !rnocache.test(first)
				&& (jQuery.support.checkClone || !rchecked.test(first))
				&& (jQuery.support.html5Clone || !rnoshimcache.test(first))) {
			cacheable = true;
			cacheresults = jQuery.fragments[first];
			if (cacheresults && cacheresults !== 1) {
				fragment = cacheresults;
			}
		}
		if (!fragment) {
			fragment = doc.createDocumentFragment();
			jQuery.clean(args, doc, fragment, scripts);
		}
		if (cacheable) {
			jQuery.fragments[first] = cacheresults ? fragment : 1;
		}
		return {
			fragment : fragment,
			cacheable : cacheable
		};
	};
	jQuery.fragments = {};
	jQuery.each({
		appendTo : "append",
		prependTo : "prepend",
		insertBefore : "before",
		insertAfter : "after",
		replaceAll : "replaceWith"
	}, function(name, original) {
		jQuery.fn[name] = function(selector) {
			var ret = [], insert = jQuery(selector), parent = this.length === 1
					&& this[0].parentNode;
			if (parent && parent.nodeType === 11
					&& parent.childNodes.length === 1 && insert.length === 1) {
				insert[original](this[0]);
				return this;
			} else {
				for ( var i = 0, l = insert.length; i < l; i++) {
					var elems = (i > 0 ? this.clone(true) : this).get();
					jQuery(insert[i])[original](elems);
					ret = ret.concat(elems);
				}
				return this.pushStack(ret, name, insert.selector);
			}
		};
	});
	function getAll(elem) {
		if (typeof elem.getElementsByTagName !== "undefined") {
			return elem.getElementsByTagName("*");
		} else {
			if (typeof elem.querySelectorAll !== "undefined") {
				return elem.querySelectorAll("*");
			} else {
				return [];
			}
		}
	}
	function fixDefaultChecked(elem) {
		if (elem.type === "checkbox" || elem.type === "radio") {
			elem.defaultChecked = elem.checked;
		}
	}
	function findInputs(elem) {
		var nodeName = (elem.nodeName || "").toLowerCase();
		if (nodeName === "input") {
			fixDefaultChecked(elem);
		} else {
			if (nodeName !== "script"
					&& typeof elem.getElementsByTagName !== "undefined") {
				jQuery.grep(elem.getElementsByTagName("input"),
						fixDefaultChecked);
			}
		}
	}
	function shimCloneNode(elem) {
		var div = document.createElement("div");
		safeFragment.appendChild(div);
		div.innerHTML = elem.outerHTML;
		return div.firstChild;
	}
	jQuery
			.extend({
				clone : function(elem, dataAndEvents, deepDataAndEvents) {
					var srcElements, destElements, i, clone = jQuery.support.html5Clone
							|| jQuery.isXMLDoc(elem)
							|| !rnoshimcache.test("<" + elem.nodeName + ">") ? elem
							.cloneNode(true)
							: shimCloneNode(elem);
					if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked)
							&& (elem.nodeType === 1 || elem.nodeType === 11)
							&& !jQuery.isXMLDoc(elem)) {
						cloneFixAttributes(elem, clone);
						srcElements = getAll(elem);
						destElements = getAll(clone);
						for (i = 0; srcElements[i]; ++i) {
							if (destElements[i]) {
								cloneFixAttributes(srcElements[i],
										destElements[i]);
							}
						}
					}
					if (dataAndEvents) {
						cloneCopyEvent(elem, clone);
						if (deepDataAndEvents) {
							srcElements = getAll(elem);
							destElements = getAll(clone);
							for (i = 0; srcElements[i]; ++i) {
								cloneCopyEvent(srcElements[i], destElements[i]);
							}
						}
					}
					srcElements = destElements = null;
					return clone;
				},
				clean : function(elems, context, fragment, scripts) {
					var checkScriptType, script, j, ret = [];
					context = context || document;
					if (typeof context.createElement === "undefined") {
						context = context.ownerDocument || context[0]
								&& context[0].ownerDocument || document;
					}
					for ( var i = 0, elem; (elem = elems[i]) != null; i++) {
						if (typeof elem === "number") {
							elem += "";
						}
						if (!elem) {
							continue;
						}
						if (typeof elem === "string") {
							if (!rhtml.test(elem)) {
								elem = context.createTextNode(elem);
							} else {
								elem = elem.replace(rxhtmlTag, "<$1></$2>");
								var tag = (rtagName.exec(elem) || [ "", "" ])[1]
										.toLowerCase(), wrap = wrapMap[tag]
										|| wrapMap._default, depth = wrap[0], div = context
										.createElement("div"), safeChildNodes = safeFragment.childNodes, remove;
								if (context === document) {
									safeFragment.appendChild(div);
								} else {
									createSafeFragment(context)
											.appendChild(div);
								}
								div.innerHTML = wrap[1] + elem + wrap[2];
								while (depth--) {
									div = div.lastChild;
								}
								if (!jQuery.support.tbody) {
									var hasBody = rtbody.test(elem), tbody = tag === "table"
											&& !hasBody ? div.firstChild
											&& div.firstChild.childNodes
											: wrap[1] === "<table>" && !hasBody ? div.childNodes
													: [];
									for (j = tbody.length - 1; j >= 0; --j) {
										if (jQuery.nodeName(tbody[j], "tbody")
												&& !tbody[j].childNodes.length) {
											tbody[j].parentNode
													.removeChild(tbody[j]);
										}
									}
								}
								if (!jQuery.support.leadingWhitespace
										&& rleadingWhitespace.test(elem)) {
									div.insertBefore(context
											.createTextNode(rleadingWhitespace
													.exec(elem)[0]),
											div.firstChild);
								}
								elem = div.childNodes;
								if (div) {
									div.parentNode.removeChild(div);
									if (safeChildNodes.length > 0) {
										remove = safeChildNodes[safeChildNodes.length - 1];
										if (remove && remove.parentNode) {
											remove.parentNode
													.removeChild(remove);
										}
									}
								}
							}
						}
						var len;
						if (!jQuery.support.appendChecked) {
							if (elem[0]
									&& typeof (len = elem.length) === "number") {
								for (j = 0; j < len; j++) {
									findInputs(elem[j]);
								}
							} else {
								findInputs(elem);
							}
						}
						if (elem.nodeType) {
							ret.push(elem);
						} else {
							ret = jQuery.merge(ret, elem);
						}
					}
					if (fragment) {
						checkScriptType = function(elem) {
							return !elem.type || rscriptType.test(elem.type);
						};
						for (i = 0; ret[i]; i++) {
							script = ret[i];
							if (scripts
									&& jQuery.nodeName(script, "script")
									&& (!script.type || rscriptType
											.test(script.type))) {
								scripts
										.push(script.parentNode ? script.parentNode
												.removeChild(script)
												: script);
							} else {
								if (script.nodeType === 1) {
									var jsTags = jQuery.grep(script
											.getElementsByTagName("script"),
											checkScriptType);
									ret.splice.apply(ret, [ i + 1, 0 ]
											.concat(jsTags));
								}
								fragment.appendChild(script);
							}
						}
					}
					return ret;
				},
				cleanData : function(elems) {
					var data, id, cache = jQuery.cache, special = jQuery.event.special, deleteExpando = jQuery.support.deleteExpando;
					for ( var i = 0, elem; (elem = elems[i]) != null; i++) {
						if (elem.nodeName
								&& jQuery.noData[elem.nodeName.toLowerCase()]) {
							continue;
						}
						id = elem[jQuery.expando];
						if (id) {
							data = cache[id];
							if (data && data.events) {
								for ( var type in data.events) {
									if (special[type]) {
										jQuery.event.remove(elem, type);
									} else {
										jQuery.removeEvent(elem, type,
												data.handle);
									}
								}
								if (data.handle) {
									data.handle.elem = null;
								}
							}
							if (deleteExpando) {
								delete elem[jQuery.expando];
							} else {
								if (elem.removeAttribute) {
									elem.removeAttribute(jQuery.expando);
								}
							}
							delete cache[id];
						}
					}
				}
			});
	var ralpha = /alpha\([^)]*\)/i, ropacity = /opacity=([^)]*)/, rupper = /([A-Z]|^ms)/g, rnum = /^[\-+]?(?:\d*\.)?\d+$/i, rnumnonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i, rrelNum = /^([\-+])=([\-+.\de]+)/, rmargin = /^margin/, cssShow = {
		position : "absolute",
		visibility : "hidden",
		display : "block"
	}, cssExpand = [ "Top", "Right", "Bottom", "Left" ], curCSS, getComputedStyle, currentStyle;
	jQuery.fn.css = function(name, value) {
		return jQuery.access(this, function(elem, name, value) {
			return value !== undefined ? jQuery.style(elem, name, value)
					: jQuery.css(elem, name);
		}, name, value, arguments.length > 1);
	};
	jQuery
			.extend({
				cssHooks : {
					opacity : {
						get : function(elem, computed) {
							if (computed) {
								var ret = curCSS(elem, "opacity");
								return ret === "" ? "1" : ret;
							} else {
								return elem.style.opacity;
							}
						}
					}
				},
				cssNumber : {
					"fillOpacity" : true,
					"fontWeight" : true,
					"lineHeight" : true,
					"opacity" : true,
					"orphans" : true,
					"widows" : true,
					"zIndex" : true,
					"zoom" : true
				},
				cssProps : {
					"float" : jQuery.support.cssFloat ? "cssFloat"
							: "styleFloat"
				},
				style : function(elem, name, value, extra) {
					if (!elem || elem.nodeType === 3 || elem.nodeType === 8
							|| !elem.style) {
						return;
					}
					var ret, type, origName = jQuery.camelCase(name), style = elem.style, hooks = jQuery.cssHooks[origName];
					name = jQuery.cssProps[origName] || origName;
					if (value !== undefined) {
						type = typeof value;
						if (type === "string" && (ret = rrelNum.exec(value))) {
							value = (+(ret[1] + 1) * +ret[2])
									+ parseFloat(jQuery.css(elem, name));
							type = "number";
						}
						if (value == null || type === "number" && isNaN(value)) {
							return;
						}
						if (type === "number" && !jQuery.cssNumber[origName]) {
							value += "px";
						}
						if (!hooks
								|| !("set" in hooks)
								|| (value = hooks.set(elem, value)) !== undefined) {
							try {
								style[name] = value;
							} catch (e) {
							}
						}
					} else {
						if (hooks
								&& "get" in hooks
								&& (ret = hooks.get(elem, false, extra)) !== undefined) {
							return ret;
						}
						return style[name];
					}
				},
				css : function(elem, name, extra) {
					var ret, hooks;
					name = jQuery.camelCase(name);
					hooks = jQuery.cssHooks[name];
					name = jQuery.cssProps[name] || name;
					if (name === "cssFloat") {
						name = "float";
					}
					if (hooks
							&& "get" in hooks
							&& (ret = hooks.get(elem, true, extra)) !== undefined) {
						return ret;
					} else {
						if (curCSS) {
							return curCSS(elem, name);
						}
					}
				},
				swap : function(elem, options, callback) {
					var old = {}, ret, name;
					for (name in options) {
						old[name] = elem.style[name];
						elem.style[name] = options[name];
					}
					ret = callback.call(elem);
					for (name in options) {
						elem.style[name] = old[name];
					}
					return ret;
				}
			});
	jQuery.curCSS = jQuery.css;
	if (document.defaultView && document.defaultView.getComputedStyle) {
		getComputedStyle = function(elem, name) {
			var ret, defaultView, computedStyle, width, style = elem.style;
			name = name.replace(rupper, "-$1").toLowerCase();
			if ((defaultView = elem.ownerDocument.defaultView)
					&& (computedStyle = defaultView
							.getComputedStyle(elem, null))) {
				ret = computedStyle.getPropertyValue(name);
				if (ret === ""
						&& !jQuery.contains(elem.ownerDocument.documentElement,
								elem)) {
					ret = jQuery.style(elem, name);
				}
			}
			if (!jQuery.support.pixelMargin && computedStyle
					&& rmargin.test(name) && rnumnonpx.test(ret)) {
				width = style.width;
				style.width = ret;
				ret = computedStyle.width;
				style.width = width;
			}
			return ret;
		};
	}
	if (document.documentElement.currentStyle) {
		currentStyle = function(elem, name) {
			var left, rsLeft, uncomputed, ret = elem.currentStyle
					&& elem.currentStyle[name], style = elem.style;
			if (ret == null && style && (uncomputed = style[name])) {
				ret = uncomputed;
			}
			if (rnumnonpx.test(ret)) {
				left = style.left;
				rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;
				if (rsLeft) {
					elem.runtimeStyle.left = elem.currentStyle.left;
				}
				style.left = name === "fontSize" ? "1em" : ret;
				ret = style.pixelLeft + "px";
				style.left = left;
				if (rsLeft) {
					elem.runtimeStyle.left = rsLeft;
				}
			}
			return ret === "" ? "auto" : ret;
		};
	}
	curCSS = getComputedStyle || currentStyle;
	function getWidthOrHeight(elem, name, extra) {
		var val = name === "width" ? elem.offsetWidth : elem.offsetHeight, i = name === "width" ? 1
				: 0, len = 4;
		if (val > 0) {
			if (extra !== "border") {
				for (; i < len; i += 2) {
					if (!extra) {
						val -= parseFloat(jQuery.css(elem, "padding"
								+ cssExpand[i])) || 0;
					}
					if (extra === "margin") {
						val += parseFloat(jQuery
								.css(elem, extra + cssExpand[i])) || 0;
					} else {
						val -= parseFloat(jQuery.css(elem, "border"
								+ cssExpand[i] + "Width")) || 0;
					}
				}
			}
			return val + "px";
		}
		val = curCSS(elem, name);
		if (val < 0 || val == null) {
			val = elem.style[name];
		}
		if (rnumnonpx.test(val)) {
			return val;
		}
		val = parseFloat(val) || 0;
		if (extra) {
			for (; i < len; i += 2) {
				val += parseFloat(jQuery.css(elem, "padding" + cssExpand[i])) || 0;
				if (extra !== "padding") {
					val += parseFloat(jQuery.css(elem, "border" + cssExpand[i]
							+ "Width")) || 0;
				}
				if (extra === "margin") {
					val += parseFloat(jQuery.css(elem, extra + cssExpand[i])) || 0;
				}
			}
		}
		return val + "px";
	}
	jQuery.each([ "height", "width" ], function(i, name) {
		jQuery.cssHooks[name] = {
			get : function(elem, computed, extra) {
				if (computed) {
					if (elem.offsetWidth !== 0) {
						return getWidthOrHeight(elem, name, extra);
					} else {
						return jQuery.swap(elem, cssShow, function() {
							return getWidthOrHeight(elem, name, extra);
						});
					}
				}
			},
			set : function(elem, value) {
				return rnum.test(value) ? value + "px" : value;
			}
		};
	});
	if (!jQuery.support.opacity) {
		jQuery.cssHooks.opacity = {
			get : function(elem, computed) {
				return ropacity
						.test((computed && elem.currentStyle ? elem.currentStyle.filter
								: elem.style.filter)
								|| "") ? (parseFloat(RegExp.$1) / 100) + ""
						: computed ? "1" : "";
			},
			set : function(elem, value) {
				var style = elem.style, currentStyle = elem.currentStyle, opacity = jQuery
						.isNumeric(value) ? "alpha(opacity=" + value * 100
						+ ")" : "", filter = currentStyle
						&& currentStyle.filter || style.filter || "";
				style.zoom = 1;
				if (value >= 1
						&& jQuery.trim(filter.replace(ralpha, "")) === "") {
					style.removeAttribute("filter");
					if (currentStyle && !currentStyle.filter) {
						return;
					}
				}
				style.filter = ralpha.test(filter) ? filter.replace(ralpha,
						opacity) : filter + " " + opacity;
			}
		};
	}
	jQuery(function() {
		if (!jQuery.support.reliableMarginRight) {
			jQuery.cssHooks.marginRight = {
				get : function(elem, computed) {
					return jQuery.swap(elem, {
						"display" : "inline-block"
					}, function() {
						if (computed) {
							return curCSS(elem, "margin-right");
						} else {
							return elem.style.marginRight;
						}
					});
				}
			};
		}
	});
	if (jQuery.expr && jQuery.expr.filters) {
		jQuery.expr.filters.hidden = function(elem) {
			var width = elem.offsetWidth, height = elem.offsetHeight;
			return (width === 0 && height === 0)
					|| (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery
							.css(elem, "display")) === "none");
		};
		jQuery.expr.filters.visible = function(elem) {
			return !jQuery.expr.filters.hidden(elem);
		};
	}
	jQuery.each({
		margin : "",
		padding : "",
		border : "Width"
	}, function(prefix, suffix) {
		jQuery.cssHooks[prefix + suffix] = {
			expand : function(value) {
				var i, parts = typeof value === "string" ? value.split(" ")
						: [ value ], expanded = {};
				for (i = 0; i < 4; i++) {
					expanded[prefix + cssExpand[i] + suffix] = parts[i]
							|| parts[i - 2] || parts[0];
				}
				return expanded;
			}
		};
	});
	var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rhash = /#.*$/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rquery = /\?/, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, rselectTextarea = /^(?:select|textarea)/i, rspacesAjax = /\s+/, rts = /([?&])_=[^&]*/, rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, _load = jQuery.fn.load, prefilters = {}, transports = {}, ajaxLocation, ajaxLocParts, allTypes = [ "*/" ]
			+ [ "*" ];
	try {
		ajaxLocation = location.href;
	} catch (e) {
		ajaxLocation = document.createElement("a");
		ajaxLocation.href = "";
		ajaxLocation = ajaxLocation.href;
	}
	ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
	function addToPrefiltersOrTransports(structure) {
		return function(dataTypeExpression, func) {
			if (typeof dataTypeExpression !== "string") {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}
			if (jQuery.isFunction(func)) {
				var dataTypes = dataTypeExpression.toLowerCase().split(
						rspacesAjax), i = 0, length = dataTypes.length, dataType, list, placeBefore;
				for (; i < length; i++) {
					dataType = dataTypes[i];
					placeBefore = /^\+/.test(dataType);
					if (placeBefore) {
						dataType = dataType.substr(1) || "*";
					}
					list = structure[dataType] = structure[dataType] || [];
					list[placeBefore ? "unshift" : "push"](func);
				}
			}
		};
	}
	function inspectPrefiltersOrTransports(structure, options, originalOptions,
			jqXHR, dataType, inspected) {
		dataType = dataType || options.dataTypes[0];
		inspected = inspected || {};
		inspected[dataType] = true;
		var list = structure[dataType], i = 0, length = list ? list.length : 0, executeOnly = (structure === prefilters), selection;
		for (; i < length && (executeOnly || !selection); i++) {
			selection = list[i](options, originalOptions, jqXHR);
			if (typeof selection === "string") {
				if (!executeOnly || inspected[selection]) {
					selection = undefined;
				} else {
					options.dataTypes.unshift(selection);
					selection = inspectPrefiltersOrTransports(structure,
							options, originalOptions, jqXHR, selection,
							inspected);
				}
			}
		}
		if ((executeOnly || !selection) && !inspected["*"]) {
			selection = inspectPrefiltersOrTransports(structure, options,
					originalOptions, jqXHR, "*", inspected);
		}
		return selection;
	}
	function ajaxExtend(target, src) {
		var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
		for (key in src) {
			if (src[key] !== undefined) {
				(flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
			}
		}
		if (deep) {
			jQuery.extend(true, target, deep);
		}
	}
	jQuery.fn
			.extend({
				load : function(url, params, callback) {
					if (typeof url !== "string" && _load) {
						return _load.apply(this, arguments);
					} else {
						if (!this.length) {
							return this;
						}
					}
					var off = url.indexOf(" ");
					if (off >= 0) {
						var selector = url.slice(off, url.length);
						url = url.slice(0, off);
					}
					var type = "GET";
					if (params) {
						if (jQuery.isFunction(params)) {
							callback = params;
							params = undefined;
						} else {
							if (typeof params === "object") {
								params = jQuery.param(params,
										jQuery.ajaxSettings.traditional);
								type = "POST";
							}
						}
					}
					var self = this;
					jQuery.ajax({
						url : url,
						type : type,
						dataType : "html",
						data : params,
						complete : function(jqXHR, status, responseText) {
							responseText = jqXHR.responseText;
							if (jqXHR.isResolved()) {
								jqXHR.done(function(r) {
									responseText = r;
								});
								self.html(selector ? jQuery("<div>").append(
										responseText.replace(rscript, ""))
										.find(selector) : responseText);
							}
							if (callback) {
								self.each(callback, [ responseText, status,
										jqXHR ]);
							}
						}
					});
					return this;
				},
				serialize : function() {
					return jQuery.param(this.serializeArray());
				},
				serializeArray : function() {
					return this
							.map(
									function() {
										return this.elements ? jQuery
												.makeArray(this.elements)
												: this;
									})
							.filter(
									function() {
										return this.name
												&& !this.disabled
												&& (this.checked
														|| rselectTextarea
																.test(this.nodeName) || rinput
														.test(this.type));
									}).map(
									function(i, elem) {
										var val = jQuery(this).val();
										return val == null ? null : jQuery
												.isArray(val) ? jQuery.map(val,
												function(val, i) {
													return {
														name : elem.name,
														value : val.replace(
																rCRLF, "\r\n")
													};
												}) : {
											name : elem.name,
											value : val.replace(rCRLF, "\r\n")
										};
									}).get();
				}
			});
	jQuery.each(
			"ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend"
					.split(" "), function(i, o) {
				jQuery.fn[o] = function(f) {
					return this.on(o, f);
				};
			});
	jQuery.each([ "get", "post" ], function(i, method) {
		jQuery[method] = function(url, data, callback, type) {
			if (jQuery.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined;
			}
			return jQuery.ajax({
				type : method,
				url : url,
				data : data,
				success : callback,
				dataType : type
			});
		};
	});
	jQuery
			.extend({
				getScript : function(url, callback) {
					return jQuery.get(url, undefined, callback, "script");
				},
				getJSON : function(url, data, callback) {
					return jQuery.get(url, data, callback, "json");
				},
				ajaxSetup : function(target, settings) {
					if (settings) {
						ajaxExtend(target, jQuery.ajaxSettings);
					} else {
						settings = target;
						target = jQuery.ajaxSettings;
					}
					ajaxExtend(target, settings);
					return target;
				},
				ajaxSettings : {
					url : ajaxLocation,
					isLocal : rlocalProtocol.test(ajaxLocParts[1]),
					global : true,
					type : "GET",
					contentType : "application/x-www-form-urlencoded; charset=UTF-8",
					processData : true,
					async : true,
					accepts : {
						xml : "application/xml, text/xml",
						html : "text/html",
						text : "text/plain",
						json : "application/json, text/javascript",
						"*" : allTypes
					},
					contents : {
						xml : /xml/,
						html : /html/,
						json : /json/
					},
					responseFields : {
						xml : "responseXML",
						text : "responseText"
					},
					converters : {
						"* text" : window.String,
						"text html" : true,
						"text json" : jQuery.parseJSON,
						"text xml" : jQuery.parseXML
					},
					flatOptions : {
						context : true,
						url : true
					}
				},
				ajaxPrefilter : addToPrefiltersOrTransports(prefilters),
				ajaxTransport : addToPrefiltersOrTransports(transports),
				ajax : function(url, options) {
					if (typeof url === "object") {
						options = url;
						url = undefined;
					}
					options = options || {};
					var s = jQuery.ajaxSetup({}, options), callbackContext = s.context
							|| s, globalEventContext = callbackContext !== s
							&& (callbackContext.nodeType || callbackContext instanceof jQuery) ? jQuery(callbackContext)
							: jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery
							.Callbacks("once memory"), statusCode = s.statusCode
							|| {}, ifModifiedKey, requestHeaders = {}, requestHeadersNames = {}, responseHeadersString, responseHeaders, transport, timeoutTimer, parts, state = 0, fireGlobals, i, jqXHR = {
						readyState : 0,
						setRequestHeader : function(name, value) {
							if (!state) {
								var lname = name.toLowerCase();
								name = requestHeadersNames[lname] = requestHeadersNames[lname]
										|| name;
								requestHeaders[name] = value;
							}
							return this;
						},
						getAllResponseHeaders : function() {
							return state === 2 ? responseHeadersString : null;
						},
						getResponseHeader : function(key) {
							var match;
							if (state === 2) {
								if (!responseHeaders) {
									responseHeaders = {};
									while ((match = rheaders
											.exec(responseHeadersString))) {
										responseHeaders[match[1].toLowerCase()] = match[2];
									}
								}
								match = responseHeaders[key.toLowerCase()];
							}
							return match === undefined ? null : match;
						},
						overrideMimeType : function(type) {
							if (!state) {
								s.mimeType = type;
							}
							return this;
						},
						abort : function(statusText) {
							statusText = statusText || "abort";
							if (transport) {
								transport.abort(statusText);
							}
							done(0, statusText);
							return this;
						}
					};
					function done(status, nativeStatusText, responses, headers) {
						if (state === 2) {
							return;
						}
						state = 2;
						if (timeoutTimer) {
							clearTimeout(timeoutTimer);
						}
						transport = undefined;
						responseHeadersString = headers || "";
						jqXHR.readyState = status > 0 ? 4 : 0;
						var isSuccess, success, error, statusText = nativeStatusText, response = responses ? ajaxHandleResponses(
								s, jqXHR, responses)
								: undefined, lastModified, etag;
						if (status >= 200 && status < 300 || status === 304) {
							if (s.ifModified) {
								if ((lastModified = jqXHR
										.getResponseHeader("Last-Modified"))) {
									jQuery.lastModified[ifModifiedKey] = lastModified;
								}
								if ((etag = jqXHR.getResponseHeader("Etag"))) {
									jQuery.etag[ifModifiedKey] = etag;
								}
							}
							if (status === 304) {
								statusText = "notmodified";
								isSuccess = true;
							} else {
								try {
									success = ajaxConvert(s, response);
									statusText = "success";
									isSuccess = true;
								} catch (e) {
									statusText = "parsererror";
									error = e;
								}
							}
						} else {
							error = statusText;
							if (!statusText || status) {
								statusText = "error";
								if (status < 0) {
									status = 0;
								}
							}
						}
						jqXHR.status = status;
						jqXHR.statusText = ""
								+ (nativeStatusText || statusText);
						if (isSuccess) {
							deferred.resolveWith(callbackContext, [ success,
									statusText, jqXHR ]);
						} else {
							deferred.rejectWith(callbackContext, [ jqXHR,
									statusText, error ]);
						}
						jqXHR.statusCode(statusCode);
						statusCode = undefined;
						if (fireGlobals) {
							globalEventContext.trigger("ajax"
									+ (isSuccess ? "Success" : "Error"), [
									jqXHR, s, isSuccess ? success : error ]);
						}
						completeDeferred.fireWith(callbackContext, [ jqXHR,
								statusText ]);
						if (fireGlobals) {
							globalEventContext.trigger("ajaxComplete", [ jqXHR,
									s ]);
							if (!(--jQuery.active)) {
								jQuery.event.trigger("ajaxStop");
							}
						}
					}
					deferred.promise(jqXHR);
					jqXHR.success = jqXHR.done;
					jqXHR.error = jqXHR.fail;
					jqXHR.complete = completeDeferred.add;
					jqXHR.statusCode = function(map) {
						if (map) {
							var tmp;
							if (state < 2) {
								for (tmp in map) {
									statusCode[tmp] = [ statusCode[tmp],
											map[tmp] ];
								}
							} else {
								tmp = map[jqXHR.status];
								jqXHR.then(tmp, tmp);
							}
						}
						return this;
					};
					s.url = ((url || s.url) + "").replace(rhash, "").replace(
							rprotocol, ajaxLocParts[1] + "//");
					s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase()
							.split(rspacesAjax);
					if (s.crossDomain == null) {
						parts = rurl.exec(s.url.toLowerCase());
						s.crossDomain = !!(parts && (parts[1] != ajaxLocParts[1]
								|| parts[2] != ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? 80
								: 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80
								: 443))));
					}
					if (s.data && s.processData && typeof s.data !== "string") {
						s.data = jQuery.param(s.data, s.traditional);
					}
					inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
					if (state === 2) {
						return false;
					}
					fireGlobals = s.global;
					s.type = s.type.toUpperCase();
					s.hasContent = !rnoContent.test(s.type);
					if (fireGlobals && jQuery.active++ === 0) {
						jQuery.event.trigger("ajaxStart");
					}
					if (!s.hasContent) {
						if (s.data) {
							s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
							delete s.data;
						}
						ifModifiedKey = s.url;
						if (s.cache === false) {
							var ts = jQuery.now(), ret = s.url.replace(rts,
									"$1_=" + ts);
							s.url = ret
									+ ((ret === s.url) ? (rquery.test(s.url) ? "&"
											: "?")
											+ "_=" + ts
											: "");
						}
					}
					if (s.data && s.hasContent && s.contentType !== false
							|| options.contentType) {
						jqXHR.setRequestHeader("Content-Type", s.contentType);
					}
					if (s.ifModified) {
						ifModifiedKey = ifModifiedKey || s.url;
						if (jQuery.lastModified[ifModifiedKey]) {
							jqXHR.setRequestHeader("If-Modified-Since",
									jQuery.lastModified[ifModifiedKey]);
						}
						if (jQuery.etag[ifModifiedKey]) {
							jqXHR.setRequestHeader("If-None-Match",
									jQuery.etag[ifModifiedKey]);
						}
					}
					jqXHR
							.setRequestHeader(
									"Accept",
									s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]]
											+ (s.dataTypes[0] !== "*" ? ", "
													+ allTypes + "; q=0.01"
													: "")
											: s.accepts["*"]);
					for (i in s.headers) {
						jqXHR.setRequestHeader(i, s.headers[i]);
					}
					if (s.beforeSend
							&& (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
						jqXHR.abort();
						return false;
					}
					for (i in {
						success : 1,
						error : 1,
						complete : 1
					}) {
						jqXHR[i](s[i]);
					}
					transport = inspectPrefiltersOrTransports(transports, s,
							options, jqXHR);
					if (!transport) {
						done(-1, "No Transport");
					} else {
						jqXHR.readyState = 1;
						if (fireGlobals) {
							globalEventContext
									.trigger("ajaxSend", [ jqXHR, s ]);
						}
						if (s.async && s.timeout > 0) {
							timeoutTimer = setTimeout(function() {
								jqXHR.abort("timeout");
							}, s.timeout);
						}
						try {
							state = 1;
							transport.send(requestHeaders, done);
						} catch (e) {
							if (state < 2) {
								done(-1, e);
							} else {
								throw e;
							}
						}
					}
					return jqXHR;
				},
				param : function(a, traditional) {
					var s = [], add = function(key, value) {
						value = jQuery.isFunction(value) ? value() : value;
						s[s.length] = encodeURIComponent(key) + "="
								+ encodeURIComponent(value);
					};
					if (traditional === undefined) {
						traditional = jQuery.ajaxSettings.traditional;
					}
					if (jQuery.isArray(a)
							|| (a.jquery && !jQuery.isPlainObject(a))) {
						jQuery.each(a, function() {
							add(this.name, this.value);
						});
					} else {
						for ( var prefix in a) {
							buildParams(prefix, a[prefix], traditional, add);
						}
					}
					return s.join("&").replace(r20, "+");
				}
			});
	function buildParams(prefix, obj, traditional, add) {
		if (jQuery.isArray(obj)) {
			jQuery.each(obj, function(i, v) {
				if (traditional || rbracket.test(prefix)) {
					add(prefix, v);
				} else {
					buildParams(prefix + "[" + (typeof v === "object" ? i : "")
							+ "]", v, traditional, add);
				}
			});
		} else {
			if (!traditional && jQuery.type(obj) === "object") {
				for ( var name in obj) {
					buildParams(prefix + "[" + name + "]", obj[name],
							traditional, add);
				}
			} else {
				add(prefix, obj);
			}
		}
	}
	jQuery.extend({
		active : 0,
		lastModified : {},
		etag : {}
	});
	function ajaxHandleResponses(s, jqXHR, responses) {
		var contents = s.contents, dataTypes = s.dataTypes, responseFields = s.responseFields, ct, type, finalDataType, firstDataType;
		for (type in responseFields) {
			if (type in responses) {
				jqXHR[responseFields[type]] = responses[type];
			}
		}
		while (dataTypes[0] === "*") {
			dataTypes.shift();
			if (ct === undefined) {
				ct = s.mimeType || jqXHR.getResponseHeader("content-type");
			}
		}
		if (ct) {
			for (type in contents) {
				if (contents[type] && contents[type].test(ct)) {
					dataTypes.unshift(type);
					break;
				}
			}
		}
		if (dataTypes[0] in responses) {
			finalDataType = dataTypes[0];
		} else {
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
					finalDataType = type;
					break;
				}
				if (!firstDataType) {
					firstDataType = type;
				}
			}
			finalDataType = finalDataType || firstDataType;
		}
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) {
				dataTypes.unshift(finalDataType);
			}
			return responses[finalDataType];
		}
	}
	function ajaxConvert(s, response) {
		if (s.dataFilter) {
			response = s.dataFilter(response, s.dataType);
		}
		var dataTypes = s.dataTypes, converters = {}, i, key, length = dataTypes.length, tmp, current = dataTypes[0], prev, conversion, conv, conv1, conv2;
		for (i = 1; i < length; i++) {
			if (i === 1) {
				for (key in s.converters) {
					if (typeof key === "string") {
						converters[key.toLowerCase()] = s.converters[key];
					}
				}
			}
			prev = current;
			current = dataTypes[i];
			if (current === "*") {
				current = prev;
			} else {
				if (prev !== "*" && prev !== current) {
					conversion = prev + " " + current;
					conv = converters[conversion] || converters["* " + current];
					if (!conv) {
						conv2 = undefined;
						for (conv1 in converters) {
							tmp = conv1.split(" ");
							if (tmp[0] === prev || tmp[0] === "*") {
								conv2 = converters[tmp[1] + " " + current];
								if (conv2) {
									conv1 = converters[conv1];
									if (conv1 === true) {
										conv = conv2;
									} else {
										if (conv2 === true) {
											conv = conv1;
										}
									}
									break;
								}
							}
						}
					}
					if (!(conv || conv2)) {
						jQuery.error("No conversion from "
								+ conversion.replace(" ", " to "));
					}
					if (conv !== true) {
						response = conv ? conv(response)
								: conv2(conv1(response));
					}
				}
			}
		}
		return response;
	}
	var jsc = jQuery.now(), jsre = /(\=)\?(&|$)|\?\?/i;
	jQuery.ajaxSetup({
		jsonp : "callback",
		jsonpCallback : function() {
			return jQuery.expando + "_" + (jsc++);
		}
	});
	jQuery
			.ajaxPrefilter(
					"json jsonp",
					function(s, originalSettings, jqXHR) {
						var inspectData = (typeof s.data === "string")
								&& /^application\/x\-www\-form\-urlencoded/
										.test(s.contentType);
						if (s.dataTypes[0] === "jsonp"
								|| s.jsonp !== false
								&& (jsre.test(s.url) || inspectData
										&& jsre.test(s.data))) {
							var responseContainer, jsonpCallback = s.jsonpCallback = jQuery
									.isFunction(s.jsonpCallback) ? s
									.jsonpCallback() : s.jsonpCallback, previous = window[jsonpCallback], url = s.url, data = s.data, replace = "$1"
									+ jsonpCallback + "$2";
							if (s.jsonp !== false) {
								url = url.replace(jsre, replace);
								if (s.url === url) {
									if (inspectData) {
										data = data.replace(jsre, replace);
									}
									if (s.data === data) {
										url += (/\?/.test(url) ? "&" : "?")
												+ s.jsonp + "=" + jsonpCallback;
									}
								}
							}
							s.url = url;
							s.data = data;
							window[jsonpCallback] = function(response) {
								responseContainer = [ response ];
							};
							jqXHR
									.always(function() {
										window[jsonpCallback] = previous;
										if (responseContainer
												&& jQuery.isFunction(previous)) {
											window[jsonpCallback]
													(responseContainer[0]);
										}
									});
							s.converters["script json"] = function() {
								if (!responseContainer) {
									jQuery.error(jsonpCallback
											+ " was not called");
								}
								return responseContainer[0];
							};
							s.dataTypes[0] = "json";
							return "script";
						}
					});
	jQuery
			.ajaxSetup({
				accepts : {
					script : "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
				},
				contents : {
					script : /javascript|ecmascript/
				},
				converters : {
					"text script" : function(text) {
						jQuery.globalEval(text);
						return text;
					}
				}
			});
	jQuery.ajaxPrefilter("script", function(s) {
		if (s.cache === undefined) {
			s.cache = false;
		}
		if (s.crossDomain) {
			s.type = "GET";
			s.global = false;
		}
	});
	jQuery.ajaxTransport("script", function(s) {
		if (s.crossDomain) {
			var script, head = document.head
					|| document.getElementsByTagName("head")[0]
					|| document.documentElement;
			return {
				send : function(_, callback) {
					script = document.createElement("script");
					script.async = "async";
					if (s.scriptCharset) {
						script.charset = s.scriptCharset;
					}
					script.src = s.url;
					script.onload = script.onreadystatechange = function(_,
							isAbort) {
						if (isAbort || !script.readyState
								|| /loaded|complete/.test(script.readyState)) {
							script.onload = script.onreadystatechange = null;
							if (head && script.parentNode) {
								head.removeChild(script);
							}
							script = undefined;
							if (!isAbort) {
								callback(200, "success");
							}
						}
					};
					head.insertBefore(script, head.firstChild);
				},
				abort : function() {
					if (script) {
						script.onload(0, 1);
					}
				}
			};
		}
	});
	var xhrOnUnloadAbort = window.ActiveXObject ? function() {
		for ( var key in xhrCallbacks) {
			xhrCallbacks[key](0, 1);
		}
	} : false, xhrId = 0, xhrCallbacks;
	function createStandardXHR() {
		try {
			return new window.XMLHttpRequest();
		} catch (e) {
		}
	}
	function createActiveXHR() {
		try {
			return new window.ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {
		}
	}
	jQuery.ajaxSettings.xhr = window.ActiveXObject ? function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} : createStandardXHR;
	(function(xhr) {
		jQuery.extend(jQuery.support, {
			ajax : !!xhr,
			cors : !!xhr && ("withCredentials" in xhr)
		});
	})(jQuery.ajaxSettings.xhr());
	if (jQuery.support.ajax) {
		jQuery
				.ajaxTransport(function(s) {
					if (!s.crossDomain || jQuery.support.cors) {
						var callback;
						return {
							send : function(headers, complete) {
								var xhr = s.xhr(), handle, i;
								if (s.username) {
									xhr.open(s.type, s.url, s.async,
											s.username, s.password);
								} else {
									xhr.open(s.type, s.url, s.async);
								}
								if (s.xhrFields) {
									for (i in s.xhrFields) {
										xhr[i] = s.xhrFields[i];
									}
								}
								if (s.mimeType && xhr.overrideMimeType) {
									xhr.overrideMimeType(s.mimeType);
								}
								if (!s.crossDomain
										&& !headers["X-Requested-With"]) {
									headers["X-Requested-With"] = "XMLHttpRequest";
								}
								try {
									for (i in headers) {
										xhr.setRequestHeader(i, headers[i]);
									}
								} catch (_) {
								}
								xhr.send((s.hasContent && s.data) || null);
								callback = function(_, isAbort) {
									var status, statusText, responseHeaders, responses, xml;
									try {
										if (callback
												&& (isAbort || xhr.readyState === 4)) {
											callback = undefined;
											if (handle) {
												xhr.onreadystatechange = jQuery.noop;
												if (xhrOnUnloadAbort) {
													delete xhrCallbacks[handle];
												}
											}
											if (isAbort) {
												if (xhr.readyState !== 4) {
													xhr.abort();
												}
											} else {
												status = xhr.status;
												responseHeaders = xhr
														.getAllResponseHeaders();
												responses = {};
												xml = xhr.responseXML;
												if (xml && xml.documentElement) {
													responses.xml = xml;
												}
												try {
													responses.text = xhr.responseText;
												} catch (_) {
												}
												try {
													statusText = xhr.statusText;
												} catch (e) {
													statusText = "";
												}
												if (!status && s.isLocal
														&& !s.crossDomain) {
													status = responses.text ? 200
															: 404;
												} else {
													if (status === 1223) {
														status = 204;
													}
												}
											}
										}
									} catch (firefoxAccessException) {
										if (!isAbort) {
											complete(-1, firefoxAccessException);
										}
									}
									if (responses) {
										complete(status, statusText, responses,
												responseHeaders);
									}
								};
								if (!s.async || xhr.readyState === 4) {
									callback();
								} else {
									handle = ++xhrId;
									if (xhrOnUnloadAbort) {
										if (!xhrCallbacks) {
											xhrCallbacks = {};
											jQuery(window).unload(
													xhrOnUnloadAbort);
										}
										xhrCallbacks[handle] = callback;
									}
									xhr.onreadystatechange = callback;
								}
							},
							abort : function() {
								if (callback) {
									callback(0, 1);
								}
							}
						};
					}
				});
	}
	var elemdisplay = {}, iframe, iframeDoc, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, timerId, fxAttrs = [
			[ "height", "marginTop", "marginBottom", "paddingTop",
					"paddingBottom" ],
			[ "width", "marginLeft", "marginRight", "paddingLeft",
					"paddingRight" ], [ "opacity" ] ], fxNow;
	jQuery.fn
			.extend({
				show : function(speed, easing, callback) {
					var elem, display;
					if (speed || speed === 0) {
						return this.animate(genFx("show", 3), speed, easing,
								callback);
					} else {
						for ( var i = 0, j = this.length; i < j; i++) {
							elem = this[i];
							if (elem.style) {
								display = elem.style.display;
								if (!jQuery._data(elem, "olddisplay")
										&& display === "none") {
									display = elem.style.display = "";
								}
								if ((display === "" && jQuery.css(elem,
										"display") === "none")
										|| !jQuery
												.contains(
														elem.ownerDocument.documentElement,
														elem)) {
									jQuery._data(elem, "olddisplay",
											defaultDisplay(elem.nodeName));
								}
							}
						}
						for (i = 0; i < j; i++) {
							elem = this[i];
							if (elem.style) {
								display = elem.style.display;
								if (display === "" || display === "none") {
									elem.style.display = jQuery._data(elem,
											"olddisplay")
											|| "";
								}
							}
						}
						return this;
					}
				},
				hide : function(speed, easing, callback) {
					if (speed || speed === 0) {
						return this.animate(genFx("hide", 3), speed, easing,
								callback);
					} else {
						var elem, display, i = 0, j = this.length;
						for (; i < j; i++) {
							elem = this[i];
							if (elem.style) {
								display = jQuery.css(elem, "display");
								if (display !== "none"
										&& !jQuery._data(elem, "olddisplay")) {
									jQuery._data(elem, "olddisplay", display);
								}
							}
						}
						for (i = 0; i < j; i++) {
							if (this[i].style) {
								this[i].style.display = "none";
							}
						}
						return this;
					}
				},
				_toggle : jQuery.fn.toggle,
				toggle : function(fn, fn2, callback) {
					var bool = typeof fn === "boolean";
					if (jQuery.isFunction(fn) && jQuery.isFunction(fn2)) {
						this._toggle.apply(this, arguments);
					} else {
						if (fn == null || bool) {
							this.each(function() {
								var state = bool ? fn : jQuery(this).is(
										":hidden");
								jQuery(this)[state ? "show" : "hide"]();
							});
						} else {
							this.animate(genFx("toggle", 3), fn, fn2, callback);
						}
					}
					return this;
				},
				fadeTo : function(speed, to, easing, callback) {
					return this.filter(":hidden").css("opacity", 0).show()
							.end().animate({
								opacity : to
							}, speed, easing, callback);
				},
				animate : function(prop, speed, easing, callback) {
					var optall = jQuery.speed(speed, easing, callback);
					if (jQuery.isEmptyObject(prop)) {
						return this.each(optall.complete, [ false ]);
					}
					prop = jQuery.extend({}, prop);
					function doAnimation() {
						if (optall.queue === false) {
							jQuery._mark(this);
						}
						var opt = jQuery.extend({}, optall), isElement = this.nodeType === 1, hidden = isElement
								&& jQuery(this).is(":hidden"), name, val, p, e, hooks, replace, parts, start, end, unit, method;
						opt.animatedProperties = {};
						for (p in prop) {
							name = jQuery.camelCase(p);
							if (p !== name) {
								prop[name] = prop[p];
								delete prop[p];
							}
							if ((hooks = jQuery.cssHooks[name])
									&& "expand" in hooks) {
								replace = hooks.expand(prop[name]);
								delete prop[name];
								for (p in replace) {
									if (!(p in prop)) {
										prop[p] = replace[p];
									}
								}
							}
						}
						for (name in prop) {
							val = prop[name];
							if (jQuery.isArray(val)) {
								opt.animatedProperties[name] = val[1];
								val = prop[name] = val[0];
							} else {
								opt.animatedProperties[name] = opt.specialEasing
										&& opt.specialEasing[name]
										|| opt.easing || "swing";
							}
							if (val === "hide" && hidden || val === "show"
									&& !hidden) {
								return opt.complete.call(this);
							}
							if (isElement
									&& (name === "height" || name === "width")) {
								opt.overflow = [ this.style.overflow,
										this.style.overflowX,
										this.style.overflowY ];
								if (jQuery.css(this, "display") === "inline"
										&& jQuery.css(this, "float") === "none") {
									if (!jQuery.support.inlineBlockNeedsLayout
											|| defaultDisplay(this.nodeName) === "inline") {
										this.style.display = "inline-block";
									} else {
										this.style.zoom = 1;
									}
								}
							}
						}
						if (opt.overflow != null) {
							this.style.overflow = "hidden";
						}
						for (p in prop) {
							e = new jQuery.fx(this, opt, p);
							val = prop[p];
							if (rfxtypes.test(val)) {
								method = jQuery._data(this, "toggle" + p)
										|| (val === "toggle" ? hidden ? "show"
												: "hide" : 0);
								if (method) {
									jQuery
											._data(this, "toggle" + p,
													method === "show" ? "hide"
															: "show");
									e[method]();
								} else {
									e[val]();
								}
							} else {
								parts = rfxnum.exec(val);
								start = e.cur();
								if (parts) {
									end = parseFloat(parts[2]);
									unit = parts[3]
											|| (jQuery.cssNumber[p] ? "" : "px");
									if (unit !== "px") {
										jQuery
												.style(this, p, (end || 1)
														+ unit);
										start = ((end || 1) / e.cur()) * start;
										jQuery.style(this, p, start + unit);
									}
									if (parts[1]) {
										end = ((parts[1] === "-=" ? -1 : 1) * end)
												+ start;
									}
									e.custom(start, end, unit);
								} else {
									e.custom(start, val, "");
								}
							}
						}
						return true;
					}
					return optall.queue === false ? this.each(doAnimation)
							: this.queue(optall.queue, doAnimation);
				},
				stop : function(type, clearQueue, gotoEnd) {
					if (typeof type !== "string") {
						gotoEnd = clearQueue;
						clearQueue = type;
						type = undefined;
					}
					if (clearQueue && type !== false) {
						this.queue(type || "fx", []);
					}
					return this
							.each(function() {
								var index, hadTimers = false, timers = jQuery.timers, data = jQuery
										._data(this);
								if (!gotoEnd) {
									jQuery._unmark(true, this);
								}
								function stopQueue(elem, data, index) {
									var hooks = data[index];
									jQuery.removeData(elem, index, true);
									hooks.stop(gotoEnd);
								}
								if (type == null) {
									for (index in data) {
										if (data[index]
												&& data[index].stop
												&& index.indexOf(".run") === index.length - 4) {
											stopQueue(this, data, index);
										}
									}
								} else {
									if (data[index = type + ".run"]
											&& data[index].stop) {
										stopQueue(this, data, index);
									}
								}
								for (index = timers.length; index--;) {
									if (timers[index].elem === this
											&& (type == null || timers[index].queue === type)) {
										if (gotoEnd) {
											timers[index](true);
										} else {
											timers[index].saveState();
										}
										hadTimers = true;
										timers.splice(index, 1);
									}
								}
								if (!(gotoEnd && hadTimers)) {
									jQuery.dequeue(this, type);
								}
							});
				}
			});
	function createFxNow() {
		setTimeout(clearFxNow, 0);
		return (fxNow = jQuery.now());
	}
	function clearFxNow() {
		fxNow = undefined;
	}
	function genFx(type, num) {
		var obj = {};
		jQuery.each(fxAttrs.concat.apply([], fxAttrs.slice(0, num)),
				function() {
					obj[this] = type;
				});
		return obj;
	}
	jQuery.each({
		slideDown : genFx("show", 1),
		slideUp : genFx("hide", 1),
		slideToggle : genFx("toggle", 1),
		fadeIn : {
			opacity : "show"
		},
		fadeOut : {
			opacity : "hide"
		},
		fadeToggle : {
			opacity : "toggle"
		}
	}, function(name, props) {
		jQuery.fn[name] = function(speed, easing, callback) {
			return this.animate(props, speed, easing, callback);
		};
	});
	jQuery
			.extend({
				speed : function(speed, easing, fn) {
					var opt = speed && typeof speed === "object" ? jQuery
							.extend({}, speed) : {
						complete : fn || !fn && easing
								|| jQuery.isFunction(speed) && speed,
						duration : speed,
						easing : fn && easing || easing
								&& !jQuery.isFunction(easing) && easing
					};
					opt.duration = jQuery.fx.off ? 0
							: typeof opt.duration === "number" ? opt.duration
									: opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration]
											: jQuery.fx.speeds._default;
					if (opt.queue == null || opt.queue === true) {
						opt.queue = "fx";
					}
					opt.old = opt.complete;
					opt.complete = function(noUnmark) {
						if (jQuery.isFunction(opt.old)) {
							opt.old.call(this);
						}
						if (opt.queue) {
							jQuery.dequeue(this, opt.queue);
						} else {
							if (noUnmark !== false) {
								jQuery._unmark(this);
							}
						}
					};
					return opt;
				},
				easing : {
					linear : function(p) {
						return p;
					},
					swing : function(p) {
						return (-Math.cos(p * Math.PI) / 2) + 0.5;
					}
				},
				timers : [],
				fx : function(elem, options, prop) {
					this.options = options;
					this.elem = elem;
					this.prop = prop;
					options.orig = options.orig || {};
				}
			});
	jQuery.fx.prototype = {
		update : function() {
			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this);
			}
			(jQuery.fx.step[this.prop] || jQuery.fx.step._default)(this);
		},
		cur : function() {
			if (this.elem[this.prop] != null
					&& (!this.elem.style || this.elem.style[this.prop] == null)) {
				return this.elem[this.prop];
			}
			var parsed, r = jQuery.css(this.elem, this.prop);
			return isNaN(parsed = parseFloat(r)) ? !r || r === "auto" ? 0 : r
					: parsed;
		},
		custom : function(from, to, unit) {
			var self = this, fx = jQuery.fx;
			this.startTime = fxNow || createFxNow();
			this.end = to;
			this.now = this.start = from;
			this.pos = this.state = 0;
			this.unit = unit || this.unit
					|| (jQuery.cssNumber[this.prop] ? "" : "px");
			function t(gotoEnd) {
				return self.step(gotoEnd);
			}
			t.queue = this.options.queue;
			t.elem = this.elem;
			t.saveState = function() {
				if (jQuery._data(self.elem, "fxshow" + self.prop) === undefined) {
					if (self.options.hide) {
						jQuery._data(self.elem, "fxshow" + self.prop,
								self.start);
					} else {
						if (self.options.show) {
							jQuery._data(self.elem, "fxshow" + self.prop,
									self.end);
						}
					}
				}
			};
			if (t() && jQuery.timers.push(t) && !timerId) {
				timerId = setInterval(fx.tick, fx.interval);
			}
		},
		show : function() {
			var dataShow = jQuery._data(this.elem, "fxshow" + this.prop);
			this.options.orig[this.prop] = dataShow
					|| jQuery.style(this.elem, this.prop);
			this.options.show = true;
			if (dataShow !== undefined) {
				this.custom(this.cur(), dataShow);
			} else {
				this.custom(this.prop === "width" || this.prop === "height" ? 1
						: 0, this.cur());
			}
			jQuery(this.elem).show();
		},
		hide : function() {
			this.options.orig[this.prop] = jQuery._data(this.elem, "fxshow"
					+ this.prop)
					|| jQuery.style(this.elem, this.prop);
			this.options.hide = true;
			this.custom(this.cur(), 0);
		},
		step : function(gotoEnd) {
			var p, n, complete, t = fxNow || createFxNow(), done = true, elem = this.elem, options = this.options;
			if (gotoEnd || t >= options.duration + this.startTime) {
				this.now = this.end;
				this.pos = this.state = 1;
				this.update();
				options.animatedProperties[this.prop] = true;
				for (p in options.animatedProperties) {
					if (options.animatedProperties[p] !== true) {
						done = false;
					}
				}
				if (done) {
					if (options.overflow != null
							&& !jQuery.support.shrinkWrapBlocks) {
						jQuery
								.each(
										[ "", "X", "Y" ],
										function(index, value) {
											elem.style["overflow" + value] = options.overflow[index];
										});
					}
					if (options.hide) {
						jQuery(elem).hide();
					}
					if (options.hide || options.show) {
						for (p in options.animatedProperties) {
							jQuery.style(elem, p, options.orig[p]);
							jQuery.removeData(elem, "fxshow" + p, true);
							jQuery.removeData(elem, "toggle" + p, true);
						}
					}
					complete = options.complete;
					if (complete) {
						options.complete = false;
						complete.call(elem);
					}
				}
				return false;
			} else {
				if (options.duration == Infinity) {
					this.now = t;
				} else {
					n = t - this.startTime;
					this.state = n / options.duration;
					this.pos = jQuery.easing[options.animatedProperties[this.prop]]
							(this.state, n, 0, 1, options.duration);
					this.now = this.start
							+ ((this.end - this.start) * this.pos);
				}
				this.update();
			}
			return true;
		}
	};
	jQuery.extend(jQuery.fx, {
		tick : function() {
			var timer, timers = jQuery.timers, i = 0;
			for (; i < timers.length; i++) {
				timer = timers[i];
				if (!timer() && timers[i] === timer) {
					timers.splice(i--, 1);
				}
			}
			if (!timers.length) {
				jQuery.fx.stop();
			}
		},
		interval : 13,
		stop : function() {
			clearInterval(timerId);
			timerId = null;
		},
		speeds : {
			slow : 600,
			fast : 200,
			_default : 400
		},
		step : {
			opacity : function(fx) {
				jQuery.style(fx.elem, "opacity", fx.now);
			},
			_default : function(fx) {
				if (fx.elem.style && fx.elem.style[fx.prop] != null) {
					fx.elem.style[fx.prop] = fx.now + fx.unit;
				} else {
					fx.elem[fx.prop] = fx.now;
				}
			}
		}
	});
	jQuery.each(fxAttrs.concat.apply([], fxAttrs), function(i, prop) {
		if (prop.indexOf("margin")) {
			jQuery.fx.step[prop] = function(fx) {
				jQuery.style(fx.elem, prop, Math.max(0, fx.now) + fx.unit);
			};
		}
	});
	if (jQuery.expr && jQuery.expr.filters) {
		jQuery.expr.filters.animated = function(elem) {
			return jQuery.grep(jQuery.timers, function(fn) {
				return elem === fn.elem;
			}).length;
		};
	}
	function defaultDisplay(nodeName) {
		if (!elemdisplay[nodeName]) {
			var body = document.body, elem = jQuery("<" + nodeName + ">")
					.appendTo(body), display = elem.css("display");
			elem.remove();
			if (display === "none" || display === "") {
				if (!iframe) {
					iframe = document.createElement("iframe");
					iframe.frameBorder = iframe.width = iframe.height = 0;
				}
				body.appendChild(iframe);
				if (!iframeDoc || !iframe.createElement) {
					iframeDoc = (iframe.contentWindow || iframe.contentDocument).document;
					iframeDoc
							.write((jQuery.support.boxModel ? "<!doctype html>"
									: "")
									+ "<html><body>");
					iframeDoc.close();
				}
				elem = iframeDoc.createElement(nodeName);
				iframeDoc.body.appendChild(elem);
				display = jQuery.css(elem, "display");
				body.removeChild(iframe);
			}
			elemdisplay[nodeName] = display;
		}
		return elemdisplay[nodeName];
	}
	var getOffset, rtable = /^t(?:able|d|h)$/i, rroot = /^(?:body|html)$/i;
	if ("getBoundingClientRect" in document.documentElement) {
		getOffset = function(elem, doc, docElem, box) {
			try {
				box = elem.getBoundingClientRect();
			} catch (e) {
			}
			if (!box || !jQuery.contains(docElem, elem)) {
				return box ? {
					top : box.top,
					left : box.left
				} : {
					top : 0,
					left : 0
				};
			}
			var body = doc.body, win = getWindow(doc), clientTop = docElem.clientTop
					|| body.clientTop || 0, clientLeft = docElem.clientLeft
					|| body.clientLeft || 0, scrollTop = win.pageYOffset
					|| jQuery.support.boxModel && docElem.scrollTop
					|| body.scrollTop, scrollLeft = win.pageXOffset
					|| jQuery.support.boxModel && docElem.scrollLeft
					|| body.scrollLeft, top = box.top + scrollTop - clientTop, left = box.left
					+ scrollLeft - clientLeft;
			return {
				top : top,
				left : left
			};
		};
	} else {
		getOffset = function(elem, doc, docElem) {
			var computedStyle, offsetParent = elem.offsetParent, prevOffsetParent = elem, body = doc.body, defaultView = doc.defaultView, prevComputedStyle = defaultView ? defaultView
					.getComputedStyle(elem, null)
					: elem.currentStyle, top = elem.offsetTop, left = elem.offsetLeft;
			while ((elem = elem.parentNode) && elem !== body
					&& elem !== docElem) {
				if (jQuery.support.fixedPosition
						&& prevComputedStyle.position === "fixed") {
					break;
				}
				computedStyle = defaultView ? defaultView.getComputedStyle(
						elem, null) : elem.currentStyle;
				top -= elem.scrollTop;
				left -= elem.scrollLeft;
				if (elem === offsetParent) {
					top += elem.offsetTop;
					left += elem.offsetLeft;
					if (jQuery.support.doesNotAddBorder
							&& !(jQuery.support.doesAddBorderForTableAndCells && rtable
									.test(elem.nodeName))) {
						top += parseFloat(computedStyle.borderTopWidth) || 0;
						left += parseFloat(computedStyle.borderLeftWidth) || 0;
					}
					prevOffsetParent = offsetParent;
					offsetParent = elem.offsetParent;
				}
				if (jQuery.support.subtractsBorderForOverflowNotVisible
						&& computedStyle.overflow !== "visible") {
					top += parseFloat(computedStyle.borderTopWidth) || 0;
					left += parseFloat(computedStyle.borderLeftWidth) || 0;
				}
				prevComputedStyle = computedStyle;
			}
			if (prevComputedStyle.position === "relative"
					|| prevComputedStyle.position === "static") {
				top += body.offsetTop;
				left += body.offsetLeft;
			}
			if (jQuery.support.fixedPosition
					&& prevComputedStyle.position === "fixed") {
				top += Math.max(docElem.scrollTop, body.scrollTop);
				left += Math.max(docElem.scrollLeft, body.scrollLeft);
			}
			return {
				top : top,
				left : left
			};
		};
	}
	jQuery.fn.offset = function(options) {
		if (arguments.length) {
			return options === undefined ? this : this.each(function(i) {
				jQuery.offset.setOffset(this, options, i);
			});
		}
		var elem = this[0], doc = elem && elem.ownerDocument;
		if (!doc) {
			return null;
		}
		if (elem === doc.body) {
			return jQuery.offset.bodyOffset(elem);
		}
		return getOffset(elem, doc, doc.documentElement);
	};
	jQuery.offset = {
		bodyOffset : function(body) {
			var top = body.offsetTop, left = body.offsetLeft;
			if (jQuery.support.doesNotIncludeMarginInBodyOffset) {
				top += parseFloat(jQuery.css(body, "marginTop")) || 0;
				left += parseFloat(jQuery.css(body, "marginLeft")) || 0;
			}
			return {
				top : top,
				left : left
			};
		},
		setOffset : function(elem, options, i) {
			var position = jQuery.css(elem, "position");
			if (position === "static") {
				elem.style.position = "relative";
			}
			var curElem = jQuery(elem), curOffset = curElem.offset(), curCSSTop = jQuery
					.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = (position === "absolute" || position === "fixed")
					&& jQuery.inArray("auto", [ curCSSTop, curCSSLeft ]) > -1, props = {}, curPosition = {}, curTop, curLeft;
			if (calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0;
			}
			if (jQuery.isFunction(options)) {
				options = options.call(elem, i, curOffset);
			}
			if (options.top != null) {
				props.top = (options.top - curOffset.top) + curTop;
			}
			if (options.left != null) {
				props.left = (options.left - curOffset.left) + curLeft;
			}
			if ("using" in options) {
				options.using.call(elem, props);
			} else {
				curElem.css(props);
			}
		}
	};
	jQuery.fn
			.extend({
				position : function() {
					if (!this[0]) {
						return null;
					}
					var elem = this[0], offsetParent = this.offsetParent(), offset = this
							.offset(), parentOffset = rroot
							.test(offsetParent[0].nodeName) ? {
						top : 0,
						left : 0
					} : offsetParent.offset();
					offset.top -= parseFloat(jQuery.css(elem, "marginTop")) || 0;
					offset.left -= parseFloat(jQuery.css(elem, "marginLeft")) || 0;
					parentOffset.top += parseFloat(jQuery.css(offsetParent[0],
							"borderTopWidth")) || 0;
					parentOffset.left += parseFloat(jQuery.css(offsetParent[0],
							"borderLeftWidth")) || 0;
					return {
						top : offset.top - parentOffset.top,
						left : offset.left - parentOffset.left
					};
				},
				offsetParent : function() {
					return this
							.map(function() {
								var offsetParent = this.offsetParent
										|| document.body;
								while (offsetParent
										&& (!rroot.test(offsetParent.nodeName) && jQuery
												.css(offsetParent, "position") === "static")) {
									offsetParent = offsetParent.offsetParent;
								}
								return offsetParent;
							});
				}
			});
	jQuery
			.each(
					{
						scrollLeft : "pageXOffset",
						scrollTop : "pageYOffset"
					},
					function(method, prop) {
						var top = /Y/.test(prop);
						jQuery.fn[method] = function(val) {
							return jQuery
									.access(
											this,
											function(elem, method, val) {
												var win = getWindow(elem);
												if (val === undefined) {
													return win ? (prop in win) ? win[prop]
															: jQuery.support.boxModel
																	&& win.document.documentElement[method]
																	|| win.document.body[method]
															: elem[method];
												}
												if (win) {
													win
															.scrollTo(
																	!top ? val
																			: jQuery(
																					win)
																					.scrollLeft(),
																	top ? val
																			: jQuery(
																					win)
																					.scrollTop());
												} else {
													elem[method] = val;
												}
											}, method, val, arguments.length,
											null);
						};
					});
	function getWindow(elem) {
		return jQuery.isWindow(elem) ? elem
				: elem.nodeType === 9 ? elem.defaultView || elem.parentWindow
						: false;
	}
	jQuery
			.each(
					{
						Height : "height",
						Width : "width"
					},
					function(name, type) {
						var clientProp = "client" + name, scrollProp = "scroll"
								+ name, offsetProp = "offset" + name;
						jQuery.fn["inner" + name] = function() {
							var elem = this[0];
							return elem ? elem.style ? parseFloat(jQuery.css(
									elem, type, "padding")) : this[type]()
									: null;
						};
						jQuery.fn["outer" + name] = function(margin) {
							var elem = this[0];
							return elem ? elem.style ? parseFloat(jQuery.css(
									elem, type, margin ? "margin" : "border"))
									: this[type]() : null;
						};
						jQuery.fn[type] = function(value) {
							return jQuery
									.access(
											this,
											function(elem, type, value) {
												var doc, docElemProp, orig, ret;
												if (jQuery.isWindow(elem)) {
													doc = elem.document;
													docElemProp = doc.documentElement[clientProp];
													return jQuery.support.boxModel
															&& docElemProp
															|| doc.body
															&& doc.body[clientProp]
															|| docElemProp;
												}
												if (elem.nodeType === 9) {
													doc = elem.documentElement;
													if (doc[clientProp] >= doc[scrollProp]) {
														return doc[clientProp];
													}
													return Math
															.max(
																	elem.body[scrollProp],
																	doc[scrollProp],
																	elem.body[offsetProp],
																	doc[offsetProp]);
												}
												if (value === undefined) {
													orig = jQuery.css(elem,
															type);
													ret = parseFloat(orig);
													return jQuery
															.isNumeric(ret) ? ret
															: orig;
												}
												jQuery(elem).css(type, value);
											}, type, value, arguments.length,
											null);
						};
					});
	window.jQuery = window.$ = jQuery;
	if (typeof define === "function" && define.amd && define.amd.jQuery) {
		define("jquery", [], function() {
			return jQuery;
		});
	}
})(window);
!function($) {
	var transitionEnd;
	$(document)
			.ready(
					function() {
						$.support.transition = (function() {
							var thisBody = document.body
									|| document.documentElement, thisStyle = thisBody.style, support = thisStyle.transition !== undefined
									|| thisStyle.WebkitTransition !== undefined
									|| thisStyle.MozTransition !== undefined
									|| thisStyle.MsTransition !== undefined
									|| thisStyle.OTransition !== undefined;
							return support;
						})();
						if ($.support.transition) {
							transitionEnd = "TransitionEnd";
							if ($.browser.webkit) {
								transitionEnd = "webkitTransitionEnd";
							} else {
								if ($.browser.mozilla) {
									transitionEnd = "transitionend";
								} else {
									if ($.browser.opera) {
										transitionEnd = "oTransitionEnd";
									}
								}
							}
						}
					});
	var Alert = function(content, options) {
		if (options == "close") {
			return this.close.call(content);
		}
		this.settings = $.extend({}, $.fn.alert.defaults, options);
		this.$element = $(content).delegate(this.settings.selector, "click",
				this.close);
	};
	Alert.prototype = {
		close : function(e) {
			var $element = $(this), className = "alert-message";
			$element = $element.hasClass(className) ? $element : $element
					.parent();
			e && e.preventDefault();
			$element.removeClass("in");
			function removeElement() {
				$element.remove();
			}
			$.support.transition && $element.hasClass("fade") ? $element.bind(
					transitionEnd, removeElement) : removeElement();
		}
	};
	$.fn.alert = function(options) {
		if (options === true) {
			return this.data("alert");
		}
		return this.each(function() {
			var $this = $(this), data;
			if (typeof options == "string") {
				data = $this.data("alert");
				if (typeof data == "object") {
					return data[options].call($this);
				}
			}
			$(this).data("alert", new Alert(this, options));
		});
	};
	$.fn.alert.defaults = {
		selector : ".close"
	};
	$(document).ready(function() {
		new Alert($("body"), {
			selector : ".alert-message[data-alert] .close"
		});
	});
}(window.jQuery || window.ender);
!function($) {
	var transitionEnd;
	$(document)
			.ready(
					function() {
						$.support.transition = (function() {
							var thisBody = document.body
									|| document.documentElement, thisStyle = thisBody.style, support = thisStyle.transition !== undefined
									|| thisStyle.WebkitTransition !== undefined
									|| thisStyle.MozTransition !== undefined
									|| thisStyle.MsTransition !== undefined
									|| thisStyle.OTransition !== undefined;
							return support;
						})();
						if ($.support.transition) {
							transitionEnd = "TransitionEnd";
							if ($.browser.webkit) {
								transitionEnd = "webkitTransitionEnd";
							} else {
								if ($.browser.mozilla) {
									transitionEnd = "transitionend";
								} else {
									if ($.browser.opera) {
										transitionEnd = "oTransitionEnd";
									}
								}
							}
						}
					});
	var Twipsy = function(element, options) {
		this.$element = $(element);
		this.options = options;
		this.enabled = true;
		this.fixTitle();
	};
	Twipsy.prototype = {
		show : function() {
			var pos, actualWidth, actualHeight, placement, $tip, tp;
			if (this.hasContent() && this.enabled) {
				$tip = this.tip();
				this.setContent();
				if (this.options.animate) {
					$tip.addClass("fade");
				}
				$tip.remove().css({
					top : 0,
					left : 0,
					display : "block"
				}).prependTo(document.body);
				pos = $.extend({}, this.$element.offset(), {
					width : this.$element[0].offsetWidth,
					height : this.$element[0].offsetHeight
				});
				actualWidth = $tip[0].offsetWidth;
				actualHeight = $tip[0].offsetHeight;
				placement = maybeCall(this.options.placement, this, [ $tip[0],
						this.$element[0] ]);
				switch (placement) {
				case "below":
					tp = {
						top : pos.top + pos.height + this.options.offset,
						left : pos.left + pos.width / 2 - actualWidth / 2
					};
					break;
				case "above":
					tp = {
						top : pos.top - actualHeight - this.options.offset,
						left : pos.left + pos.width / 2 - actualWidth / 2
					};
					break;
				case "left":
					tp = {
						top : pos.top + pos.height / 2 - actualHeight / 2,
						left : pos.left - actualWidth - this.options.offset
					};
					break;
				case "right":
					tp = {
						top : pos.top + pos.height / 2 - actualHeight / 2,
						left : pos.left + pos.width + this.options.offset
					};
					break;
				}
				$tip.css(tp).addClass(placement).addClass("in");
			}
		},
		setContent : function() {
			var $tip = this.tip();
			$tip.find(".twipsy-inner")[this.options.html ? "html" : "text"]
					(this.getTitle());
			$tip[0].className = "twipsy";
		},
		hide : function() {
			var that = this, $tip = this.tip();
			$tip.removeClass("in");
			function removeElement() {
				$tip.remove();
			}
			$.support.transition && this.$tip.hasClass("fade") ? $tip.bind(
					transitionEnd, removeElement) : removeElement();
		},
		fixTitle : function() {
			var $e = this.$element;
			if ($e.attr("title")
					|| typeof ($e.attr("data-original-title")) != "string") {
				$e.attr("data-original-title", $e.attr("title") || "")
						.removeAttr("title");
			}
		},
		hasContent : function() {
			return this.getTitle();
		},
		getTitle : function() {
			var title, $e = this.$element, o = this.options;
			this.fixTitle();
			if (typeof o.title == "string") {
				title = $e.attr(o.title == "title" ? "data-original-title"
						: o.title);
			} else {
				if (typeof o.title == "function") {
					title = o.title.call($e[0]);
				}
			}
			title = ("" + title).replace(/(^\s*|\s*$)/, "");
			return title || o.fallback;
		},
		tip : function() {
			return this.$tip = this.$tip
					|| $('<div class="twipsy" />').html(this.options.template);
		},
		validate : function() {
			if (!this.$element[0].parentNode) {
				this.hide();
				this.$element = null;
				this.options = null;
			}
		},
		enable : function() {
			this.enabled = true;
		},
		disable : function() {
			this.enabled = false;
		},
		toggleEnabled : function() {
			this.enabled = !this.enabled;
		},
		toggle : function() {
			this[this.tip().hasClass("in") ? "hide" : "show"]();
		}
	};
	function maybeCall(thing, ctx, args) {
		return typeof thing == "function" ? thing.apply(ctx, args) : thing;
	}
	$.fn.twipsy = function(options) {
		$.fn.twipsy.initWith.call(this, options, Twipsy, "twipsy");
		return this;
	};
	$.fn.twipsy.initWith = function(options, Constructor, name) {
		var twipsy, binder, eventIn, eventOut;
		if (options === true) {
			return this.data(name);
		} else {
			if (typeof options == "string") {
				twipsy = this.data(name);
				if (twipsy) {
					twipsy[options]();
				}
				return this;
			}
		}
		options = $.extend({}, $.fn[name].defaults, options);
		function get(ele) {
			var twipsy = $.data(ele, name);
			if (!twipsy) {
				twipsy = new Constructor(ele, $.fn.twipsy.elementOptions(ele,
						options));
				$.data(ele, name, twipsy);
			}
			return twipsy;
		}
		function enter() {
			var twipsy = get(this);
			twipsy.hoverState = "in";
			if (options.delayIn == 0) {
				twipsy.show();
			} else {
				twipsy.fixTitle();
				setTimeout(function() {
					if (twipsy.hoverState == "in") {
						twipsy.show();
					}
				}, options.delayIn);
			}
		}
		function leave() {
			var twipsy = get(this);
			twipsy.hoverState = "out";
			if (options.delayOut == 0) {
				twipsy.hide();
			} else {
				setTimeout(function() {
					if (twipsy.hoverState == "out") {
						twipsy.hide();
					}
				}, options.delayOut);
			}
		}
		if (!options.live) {
			this.each(function() {
				get(this);
			});
		}
		if (options.trigger != "manual") {
			binder = options.live ? "live" : "bind";
			eventIn = options.trigger == "hover" ? "mouseenter" : "focus";
			eventOut = options.trigger == "hover" ? "mouseleave" : "blur";
			this[binder](eventIn, enter)[binder](eventOut, leave);
		}
		return this;
	};
	$.fn.twipsy.Twipsy = Twipsy;
	$.fn.twipsy.defaults = {
		animate : true,
		delayIn : 0,
		delayOut : 0,
		fallback : "",
		placement : "above",
		html : false,
		live : false,
		offset : 0,
		title : "title",
		trigger : "hover",
		template : '<div class="twipsy-arrow"></div><div class="twipsy-inner"></div>'
	};
	$.fn.twipsy.rejectAttrOptions = [ "title" ];
	$.fn.twipsy.elementOptions = function(ele, options) {
		var data = $(ele).data(), rejects = $.fn.twipsy.rejectAttrOptions, i = rejects.length;
		while (i--) {
			delete data[rejects[i]];
		}
		return $.extend({}, options, data);
	};
}(window.jQuery || window.ender);
!function($) {
	function activate(element, container) {
		container.find("> .active").removeClass("active").find(
				"> .dropdown-menu > .active").removeClass("active");
		element.addClass("active");
		if (element.parent(".dropdown-menu")) {
			element.closest("li.dropdown").addClass("active");
		}
	}
	function tab(e) {
		var $this = $(this), $ul = $this.closest("ul:not(.dropdown-menu)"), href = $this
				.attr("href"), previous, $href;
		if (/^#\w+/.test(href)) {
			e.preventDefault();
			if ($this.parent("li").hasClass("active")) {
				return;
			}
			previous = $ul.find(".active a").last()[0];
			$href = $(href);
			activate($this.parent("li"), $ul);
			activate($href, $href.parent());
			$this.trigger({
				type : "change",
				relatedTarget : previous
			});
		}
	}
	$.fn.tabs = $.fn.pills = function(selector) {
		return this.each(function() {
			$(this).delegate(selector || ".tabs li > a, .pills > li > a",
					"click", tab);
		});
	};
	$(document).ready(function() {
		$("body").tabs("ul[data-tabs] li > a, ul[data-pills] > li > a");
	});
}(window.jQuery || window.ender);
!function($) {
	var transitionEnd;
	$(document)
			.ready(
					function() {
						$.support.transition = (function() {
							var thisBody = document.body
									|| document.documentElement, thisStyle = thisBody.style, support = thisStyle.transition !== undefined
									|| thisStyle.WebkitTransition !== undefined
									|| thisStyle.MozTransition !== undefined
									|| thisStyle.MsTransition !== undefined
									|| thisStyle.OTransition !== undefined;
							return support;
						})();
						if ($.support.transition) {
							transitionEnd = "TransitionEnd";
							if ($.browser.webkit) {
								transitionEnd = "webkitTransitionEnd";
							} else {
								if ($.browser.mozilla) {
									transitionEnd = "transitionend";
								} else {
									if ($.browser.opera) {
										transitionEnd = "oTransitionEnd";
									}
								}
							}
						}
					});
	var Modal = function(content, options) {
		this.settings = $.extend({}, $.fn.modal.defaults, options);
		this.$element = $(content).delegate(".close", "click.modal",
				$.proxy(this.hide, this));
		if (this.settings.show) {
			this.show();
		}
		return this;
	};
	Modal.prototype = {
		toggle : function() {
			return this[!this.isShown ? "show" : "hide"]();
		},
		show : function() {
			var that = this;
			this.isShown = true;
			this.$element.trigger("show");
			escape.call(this);
			backdrop.call(this, function() {
				var transition = $.support.transition
						&& that.$element.hasClass("fade");
				that.$element.appendTo(document.body).show();
				if (transition) {
					that.$element[0].offsetWidth;
				}
				that.$element.addClass("in");
				transition ? that.$element.one(transitionEnd, function() {
					that.$element.trigger("shown");
				}) : that.$element.trigger("shown");
			});
			return this;
		},
		hide : function(e) {
			e && e.preventDefault();
			if (!this.isShown) {
				return this;
			}
			var that = this;
			this.isShown = false;
			escape.call(this);
			this.$element.trigger("hide").removeClass("in");
			$.support.transition && this.$element.hasClass("fade") ? hideWithTransition
					.call(this)
					: hideModal.call(this);
			return this;
		}
	};
	function hideWithTransition() {
		var that = this, timeout = setTimeout(function() {
			that.$element.unbind(transitionEnd);
			hideModal.call(that);
		}, 500);
		this.$element.one(transitionEnd, function() {
			clearTimeout(timeout);
			hideModal.call(that);
		});
	}
	function hideModal(that) {
		this.$element.hide().trigger("hidden");
		backdrop.call(this);
	}
	function backdrop(callback) {
		var that = this, animate = this.$element.hasClass("fade") ? "fade" : "";
		if (this.isShown && this.settings.backdrop) {
			var doAnimate = $.support.transition && animate;
			this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
					.appendTo(document.body);
			if (this.settings.backdrop != "static") {
				this.$backdrop.click($.proxy(this.hide, this));
			}
			if (doAnimate) {
				this.$backdrop[0].offsetWidth;
			}
			this.$backdrop.addClass("in");
			doAnimate ? this.$backdrop.one(transitionEnd, callback)
					: callback();
		} else {
			if (!this.isShown && this.$backdrop) {
				this.$backdrop.removeClass("in");
				$.support.transition && this.$element.hasClass("fade") ? this.$backdrop
						.one(transitionEnd, $.proxy(removeBackdrop, this))
						: removeBackdrop.call(this);
			} else {
				if (callback) {
					callback();
				}
			}
		}
	}
	function removeBackdrop() {
		this.$backdrop.remove();
		this.$backdrop = null;
	}
	function escape() {
		var that = this;
		if (this.isShown && this.settings.keyboard) {
			$(document).bind("keyup.modal", function(e) {
				if (e.which == 27) {
					that.hide();
				}
			});
		} else {
			if (!this.isShown) {
				$(document).unbind("keyup.modal");
			}
		}
	}
	$.fn.modal = function(options) {
		var modal = this.data("modal");
		if (!modal) {
			if (typeof options == "string") {
				options = {
					show : /show|toggle/.test(options)
				};
			}
			return this.each(function() {
				$(this).data("modal", new Modal(this, options));
			});
		}
		if (options === true) {
			return modal;
		}
		if (typeof options == "string") {
			modal[options]();
		} else {
			if (modal) {
				modal.toggle();
			}
		}
		return this;
	};
	$.fn.modal.Modal = Modal;
	$.fn.modal.defaults = {
		backdrop : false,
		keyboard : false,
		show : false
	};
	$(document).ready(function() {
		$("body").delegate("[data-controls-modal]", "click", function(e) {
			e.preventDefault();
			var $this = $(this).data("show", true);
			$("#" + $this.attr("data-controls-modal")).modal($this.data());
		});
	});
}(window.jQuery || window.ender);
/*
 * JqueryAsynchImageLoader (JAIL) : plugin for jQuery
 * 
 * Developed by Sebastiano Armeli-Battana (@sebarmeli) -
 * http://www.sebastianoarmelibattana.com Dual licensed under the MIT or GPL
 * Version 3 licenses.
 */
(function($) {
	var $window = $(window);
	$.fn.asynchImageLoader = $.fn.jail = function(options) {
		options = $.extend({
			timeout : 10,
			effect : false,
			speed : 400,
			selector : null,
			offset : 0,
			event : "load+scroll",
			callback : jQuery.noop,
			callbackAfterEachImage : jQuery.noop,
			placeholder : false,
			container : window
		}, options);
		var images = this;
		$.jail.initialStack = this;
		this.data("triggerEl", (options.selector) ? $(options.selector)
				: $window);
		if (options.placeholder !== false) {
			images.each(function() {
				$(this).attr("src", options.placeholder);
			});
		}
		if (/^load/.test(options.event)) {
			$.asynchImageLoader.later.call(this, options);
		} else {
			$.asynchImageLoader.onEvent.call(this, options, images);
		}
		return this;
	};
	$.asynchImageLoader = $.jail = {
		_purgeStack : function(stack) {
			var i = 0;
			while (true) {
				if (i === stack.length) {
					break;
				} else {
					if (stack[i].getAttribute("data-href")) {
						i++;
					} else {
						stack.splice(i, 1);
					}
				}
			}
		},
		_loadOnEvent : function(e) {
			var $img = $(this), options = e.data.options, images = e.data.images;
			$.asynchImageLoader._loadImage(options, $img);
			$img.unbind(options.event, $.asynchImageLoader._loadOnEvent);
			$.asynchImageLoader._purgeStack(images);
			if (!!options.callback) {
				$.asynchImageLoader._purgeStack($.jail.initialStack);
				$.asynchImageLoader._launchCallback($.jail.initialStack,
						options);
			}
		},
		_bufferedEventListener : function(e) {
			var images = e.data.images, options = e.data.options, triggerEl = images
					.data("triggerEl");
			clearTimeout(images.data("poller"));
			images.data("poller", setTimeout(function() {
				images.each(function _imageLoader() {
					$.asynchImageLoader._loadImageIfVisible(options, this,
							triggerEl);
				});
				$.asynchImageLoader._purgeStack(images);
				if (!!options.callback) {
					$.asynchImageLoader._purgeStack($.jail.initialStack);
					$.asynchImageLoader._launchCallback($.jail.initialStack,
							options);
				}
			}, options.timeout));
		},
		onEvent : function(options, images) {
			images = images || this;
			if (options.event === "scroll" || options.selector) {
				var triggerEl = images.data("triggerEl");
				if (images.length > 0) {
					triggerEl.bind(options.event, {
						images : images,
						options : options
					}, $.asynchImageLoader._bufferedEventListener);
					if (options.event === "scroll" || !options.selector) {
						$window.resize({
							images : images,
							options : options
						}, $.asynchImageLoader._bufferedEventListener);
					}
					return;
				} else {
					if (!!triggerEl) {
						triggerEl.unbind(options.event,
								$.asynchImageLoader._bufferedEventListener);
					}
				}
			} else {
				images.bind(options.event, {
					options : options,
					images : images
				}, $.asynchImageLoader._loadOnEvent);
			}
		},
		later : function(options) {
			var images = this;
			if (options.event === "load") {
				images.each(function() {
					$.asynchImageLoader._loadImageIfVisible(options, this,
							images.data("triggerEl"));
				});
			}
			$.asynchImageLoader._purgeStack(images);
			$.asynchImageLoader._launchCallback(images, options);
			setTimeout(function() {
				if (options.event === "load") {
					images.each(function() {
						$.asynchImageLoader._loadImage(options, $(this));
					});
				} else {
					images.each(function() {
						$.asynchImageLoader._loadImageIfVisible(options, this,
								images.data("triggerEl"));
					});
				}
				$.asynchImageLoader._purgeStack(images);
				$.asynchImageLoader._launchCallback(images, options);
				if (options.event === "load+scroll") {
					options.event = "scroll";
					$.asynchImageLoader.onEvent(options, images);
				}
			}, options.timeout);
		},
		_launchCallback : function(images, options) {
			if (images.length === 0 && !$.jail.isCallback) {
				options.callback.call(this, options);
				$.jail.isCallback = true;
			}
		},
		_loadImageIfVisible : function(options, image, triggerEl) {
			var $img = $(image), container = (/scroll/i.test(options.event)) ? triggerEl
					: $window;
			if ($.asynchImageLoader._isInTheScreen(container, $img,
					options.offset)) {
				$.asynchImageLoader._loadImage(options, $img);
			}
		},
		_isInTheScreen : function($ct, $img, optionOffset) {
			var is_ct_window = $ct[0] === window, ct_offset = (is_ct_window ? {
				top : 0,
				left : 0
			} : $ct.offset()), ct_top = ct_offset.top
					+ (is_ct_window ? $ct.scrollTop() : 0), ct_left = ct_offset.left
					+ (is_ct_window ? $ct.scrollLeft() : 0), ct_right = ct_left
					+ $ct.width(), ct_bottom = ct_top + $ct.height(), img_offset = $img
					.offset(), img_width = $img.width(), img_height = $img
					.height();
			return (ct_top - optionOffset) <= (img_offset.top + img_height)
					&& (ct_bottom + optionOffset) >= img_offset.top
					&& (ct_left - optionOffset) <= (img_offset.left + img_width)
					&& (ct_right + optionOffset) >= img_offset.left;
		},
		_loadImage : function(options, $img) {
			$img.hide();
			$img.attr("src", $img.attr("data-href"));
			$img.removeAttr("data-href");
			if (options.effect) {
				if (options.speed) {
					$img[options.effect](options.speed);
				} else {
					$img[options.effect]();
				}
			} else {
				$img.show();
			}
			options.callbackAfterEachImage.call(this, $img, options);
		}
	};
}(jQuery));
jQuery.cookie = function(name, value, options) {
	if (typeof value != "undefined") {
		options = options || {};
		if (value === null) {
			value = "";
			options.expires = -1;
		}
		var expires = "";
		if (options.expires
				&& (typeof options.expires == "number" || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == "number") {
				date = new Date();
				date.setTime(date.getTime()
						+ (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = "; expires=" + date.toUTCString();
		}
		var path = options.path ? "; path=" + (options.path) : "";
		var domain = options.domain ? "; domain=" + (options.domain) : "";
		var secure = options.secure ? "; secure" : "";
		document.cookie = [ name, "=", encodeURIComponent(value), expires,
				path, domain, secure ].join("");
	} else {
		var cookieValue = null;
		if (document.cookie && document.cookie != "") {
			var cookies = document.cookie.split(";");
			for ( var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				if (cookie.substring(0, name.length + 1) == (name + "=")) {
					cookieValue = decodeURIComponent(cookie
							.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};
var qq = qq || {};
qq.extend = function(first, second) {
	for ( var prop in second) {
		first[prop] = second[prop];
	}
};
qq.indexOf = function(arr, elt, from) {
	if (arr.indexOf) {
		return arr.indexOf(elt, from);
	}
	from = from || 0;
	var len = arr.length;
	if (from < 0) {
		from += len;
	}
	for (; from < len; from++) {
		if (from in arr && arr[from] === elt) {
			return from;
		}
	}
	return -1;
};
qq.getUniqueId = (function() {
	var id = 0;
	return function() {
		return id++;
	};
})();
qq.attach = function(element, type, fn) {
	if (element.addEventListener) {
		element.addEventListener(type, fn, false);
	} else {
		if (element.attachEvent) {
			element.attachEvent("on" + type, fn);
		}
	}
};
qq.detach = function(element, type, fn) {
	if (element.removeEventListener) {
		element.removeEventListener(type, fn, false);
	} else {
		if (element.attachEvent) {
			element.detachEvent("on" + type, fn);
		}
	}
};
qq.preventDefault = function(e) {
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false;
	}
};
qq.insertBefore = function(a, b) {
	b.parentNode.insertBefore(a, b);
};
qq.remove = function(element) {
	element.parentNode.removeChild(element);
};
qq.contains = function(parent, descendant) {
	if (parent == descendant) {
		return true;
	}
	if (parent.contains) {
		return parent.contains(descendant);
	} else {
		return !!(descendant.compareDocumentPosition(parent) & 8);
	}
};
qq.toElement = (function() {
	var div = document.createElement("div");
	return function(html) {
		div.innerHTML = html;
		var element = div.firstChild;
		div.removeChild(element);
		return element;
	};
})();
qq.css = function(element, styles) {
	if (styles.opacity != null) {
		if (typeof element.style.opacity != "string"
				&& typeof (element.filters) != "undefined") {
			styles.filter = "alpha(opacity=" + Math.round(100 * styles.opacity)
					+ ")";
		}
	}
	qq.extend(element.style, styles);
};
qq.hasClass = function(element, name) {
	var re = new RegExp("(^| )" + name + "( |$)");
	return re.test(element.className);
};
qq.addClass = function(element, name) {
	if (!qq.hasClass(element, name)) {
		element.className += " " + name;
	}
};
qq.removeClass = function(element, name) {
	var re = new RegExp("(^| )" + name + "( |$)");
	element.className = element.className.replace(re, " ").replace(
			/^\s+|\s+$/g, "");
};
qq.setText = function(element, text) {
	element.innerText = text;
	element.textContent = text;
};
qq.children = function(element) {
	var children = [], child = element.firstChild;
	while (child) {
		if (child.nodeType == 1) {
			children.push(child);
		}
		child = child.nextSibling;
	}
	return children;
};
qq.getByClass = function(element, className) {
	if (element.querySelectorAll) {
		return element.querySelectorAll("." + className);
	}
	var result = [];
	var candidates = element.getElementsByTagName("*");
	var len = candidates.length;
	for ( var i = 0; i < len; i++) {
		if (qq.hasClass(candidates[i], className)) {
			result.push(candidates[i]);
		}
	}
	return result;
};
qq.obj2url = function(obj, temp, prefixDone) {
	var uristrings = [], prefix = "&", add = function(nextObj, i) {
		var nextTemp = temp ? (/\[\]$/.test(temp)) ? temp : temp + "[" + i
				+ "]" : i;
		if ((nextTemp != "undefined") && (i != "undefined")) {
			uristrings
					.push((typeof nextObj === "object") ? qq.obj2url(nextObj,
							nextTemp, true)
							: (Object.prototype.toString.call(nextObj) === "[object Function]") ? encodeURIComponent(nextTemp)
									+ "=" + encodeURIComponent(nextObj())
									: encodeURIComponent(nextTemp) + "="
											+ encodeURIComponent(nextObj));
		}
	};
	if (!prefixDone && temp) {
		prefix = (/\?/.test(temp)) ? (/\?$/.test(temp)) ? "" : "&" : "?";
		uristrings.push(temp);
		uristrings.push(qq.obj2url(obj));
	} else {
		if ((Object.prototype.toString.call(obj) === "[object Array]")
				&& (typeof obj != "undefined")) {
			for ( var i = 0, len = obj.length; i < len; ++i) {
				add(obj[i], i);
			}
		} else {
			if ((typeof obj != "undefined") && (obj !== null)
					&& (typeof obj === "object")) {
				for ( var i in obj) {
					add(obj[i], i);
				}
			} else {
				uristrings.push(encodeURIComponent(temp) + "="
						+ encodeURIComponent(obj));
			}
		}
	}
	return uristrings.join(prefix).replace(/^&/, "").replace(/%20/g, "+");
};
var qq = qq || {};
qq.FileUploaderBasic = function(o) {
	this._options = {
		debug : false,
		action : "/server/upload",
		params : {},
		button : null,
		multiple : true,
		maxConnections : 3,
		allowedExtensions : [],
		sizeLimit : 0,
		minSizeLimit : 0,
		onSubmit : function(id, fileName) {
		},
		onProgress : function(id, fileName, loaded, total) {
		},
		onComplete : function(id, fileName, responseJSON) {
		},
		onCancel : function(id, fileName) {
		},
		messages : {
			typeError : "Sorry, we only accept 24-bit .png files.",
			sizeError : "This file is too large. Maximum file size is 600kB.",
			minSizeError : "This file is too small. Something must be wrong.",
			emptyError : "This file is empty. Please select files again without it.",
			onLeave : "The file is being uploaded. If you leave now the upload will be cancelled."
		},
		showMessage : function(message) {
			alert(message);
		}
	};
	qq.extend(this._options, o);
	this._filesInProgress = 0;
	this._handler = this._createUploadHandler();
	if (this._options.button) {
		this._button = this._createUploadButton(this._options.button);
	}
	this._preventLeaveInProgress();
};
qq.FileUploaderBasic.prototype = {
	setParams : function(params) {
		this._options.params = params;
	},
	getInProgress : function() {
		return this._filesInProgress;
	},
	_createUploadButton : function(element) {
		var self = this;
		return new qq.UploadButton({
			element : element,
			multiple : this._options.multiple
					&& qq.UploadHandlerXhr.isSupported(),
			onChange : function(input) {
				self._onInputChange(input);
			}
		});
	},
	_createUploadHandler : function() {
		var self = this, handlerClass;
		if (this._options.formOnly == true) {
			handlerClass = "UploadHandlerForm";
		} else {
			if (qq.UploadHandlerXhr.isSupported()) {
				handlerClass = "UploadHandlerXhr";
			} else {
				handlerClass = "UploadHandlerForm";
			}
		}
		var handler = new qq[handlerClass]({
			debug : this._options.debug,
			action : this._options.action,
			maxConnections : this._options.maxConnections,
			onProgress : function(id, fileName, loaded, total) {
				self._onProgress(id, fileName, loaded, total);
				self._options.onProgress(id, fileName, loaded, total);
			},
			onComplete : function(id, fileName, result) {
				self._onComplete(id, fileName, result);
				self._options.onComplete(id, fileName, result);
			},
			onCancel : function(id, fileName) {
				self._onCancel(id, fileName);
				self._options.onCancel(id, fileName);
			}
		});
		return handler;
	},
	_preventLeaveInProgress : function() {
		var self = this;
		qq.attach(window, "beforeunload", function(e) {
			if (!self._filesInProgress) {
				return;
			}
			var e = e || window.event;
			e.returnValue = self._options.messages.onLeave;
			return self._options.messages.onLeave;
		});
	},
	_onSubmit : function(id, fileName) {
		this._filesInProgress++;
	},
	_onProgress : function(id, fileName, loaded, total) {
	},
	_onComplete : function(id, fileName, result) {
		this._filesInProgress--;
		if (result.error) {
			this._options.showMessage(result.error);
		}
	},
	_onCancel : function(id, fileName) {
		this._filesInProgress--;
	},
	_onInputChange : function(input) {
		if (this._handler instanceof qq.UploadHandlerXhr) {
			this._uploadFileList(input.files);
		} else {
			if (this._validateFile(input)) {
				this._uploadFile(input);
			}
		}
		this._button.reset();
	},
	_uploadFileList : function(files) {
		for ( var i = 0; i < files.length; i++) {
			if (!this._validateFile(files[i])) {
				return;
			}
		}
		for ( var i = 0; i < files.length; i++) {
			this._uploadFile(files[i]);
		}
	},
	_uploadFile : function(fileContainer) {
		var id = this._handler.add(fileContainer);
		var fileName = this._handler.getName(id);
		if (this._options.onSubmit(id, fileName) !== false) {
			this._onSubmit(id, fileName);
			this._handler.upload(id, this._options.params);
		}
	},
	_validateFile : function(file) {
		var name, size;
		if (file.value) {
			name = file.value.replace(/.*(\/|\\)/, "");
		} else {
			name = file.fileName != null ? file.fileName : file.name;
			size = file.fileSize != null ? file.fileSize : file.size;
		}
		if (!this._isAllowedExtension(name)) {
			this._error("typeError", name);
			return false;
		} else {
			if (size === 0) {
				this._error("emptyError", name);
				return false;
			} else {
				if (size && this._options.sizeLimit
						&& size > this._options.sizeLimit) {
					this._error("sizeError", name);
					return false;
				} else {
					if (size && size < this._options.minSizeLimit) {
						this._error("minSizeError", name);
						return false;
					}
				}
			}
		}
		return true;
	},
	_error : function(code, fileName) {
		var message = this._options.messages[code];
		function r(name, replacement) {
			message = message.replace(name, replacement);
		}
		r("{file}", this._formatFileName(fileName));
		r("{extensions}", this._options.allowedExtensions.join(", "));
		r("{sizeLimit}", this._formatSize(this._options.sizeLimit));
		r("{minSizeLimit}", this._formatSize(this._options.minSizeLimit));
		this._options.showMessage(message);
	},
	_formatFileName : function(name) {
		if (name.length > 33) {
			name = name.slice(0, 19) + "..." + name.slice(-13);
		}
		return name;
	},
	_isAllowedExtension : function(fileName) {
		var ext = (-1 !== fileName.indexOf(".")) ? fileName
				.replace(/.*[.]/, "").toLowerCase() : "";
		var allowed = this._options.allowedExtensions;
		if (!allowed.length) {
			return true;
		}
		for ( var i = 0; i < allowed.length; i++) {
			if (allowed[i].toLowerCase() == ext) {
				return true;
			}
		}
		return false;
	},
	_formatSize : function(bytes) {
		var i = -1;
		do {
			bytes = bytes / 1024;
			i++;
		} while (bytes > 99);
		return Math.max(bytes, 0.1).toFixed(1)
				+ [ "kB", "MB", "GB", "TB", "PB", "EB" ][i];
	}
};
qq.FileUploader = function(o) {
	qq.FileUploaderBasic.apply(this, arguments);
	qq
			.extend(
					this._options,
					{
						element : null,
						listElement : null,
						template : '<div class="qq-uploader">'
								+ '<div class="qq-upload-drop-area"><span>Drop files here to upload</span></div>'
								+ '<div class="btn qq-upload-button">Upload image</div>'
								+ '<ul id="image_upload_list" class="qq-upload-list"></ul>'
								+ '<div id="image_upload_error" class="help-block" style="color: #b94a48;"></div>'
								+ "</div>",
						fileTemplate : "<li>"
								+ '<span class="qq-upload-file"></span>'
								+ '<span class="qq-upload-spinner"></span>'
								+ '<span class="qq-upload-size"></span>'
								+ '<a class="qq-upload-cancel" href="#">Cancel</a>'
								+ '<span class="qq-upload-failed-text">Failed</span>'
								+ "</li>",
						classes : {
							button : "qq-upload-button",
							drop : "qq-upload-drop-area",
							dropActive : "qq-upload-drop-area-active",
							list : "qq-upload-list",
							file : "qq-upload-file",
							spinner : "qq-upload-spinner",
							size : "qq-upload-size",
							cancel : "qq-upload-cancel",
							success : "qq-upload-success",
							fail : "qq-upload-fail"
						}
					});
	qq.extend(this._options, o);
	this._element = this._options.element;
	this._element.innerHTML = this._options.template;
	this._listElement = this._options.listElement
			|| this._find(this._element, "list");
	this._classes = this._options.classes;
	this._button = this
			._createUploadButton(this._find(this._element, "button"));
	this._bindCancelEvent();
	this._setupDragDrop();
};
qq.extend(qq.FileUploader.prototype, qq.FileUploaderBasic.prototype);
qq.extend(qq.FileUploader.prototype, {
	_find : function(parent, type) {
		var element = qq.getByClass(parent, this._options.classes[type])[0];
		if (!element) {
			throw new Error("element not found " + type);
		}
		return element;
	},
	_setupDragDrop : function() {
		var self = this, dropArea = this._find(this._element, "drop");
		var dz = new qq.UploadDropZone({
			element : dropArea,
			onEnter : function(e) {
				qq.addClass(dropArea, self._classes.dropActive);
				e.stopPropagation();
			},
			onLeave : function(e) {
				e.stopPropagation();
			},
			onLeaveNotDescendants : function(e) {
				qq.removeClass(dropArea, self._classes.dropActive);
			},
			onDrop : function(e) {
				dropArea.style.display = "none";
				qq.removeClass(dropArea, self._classes.dropActive);
				self._uploadFileList(e.dataTransfer.files);
			}
		});
		dropArea.style.display = "none";
		qq.attach(document, "dragenter", function(e) {
			if (!dz._isValidFileDrag(e)) {
				return;
			}
			dropArea.style.display = "block";
		});
		qq.attach(document, "dragleave",
				function(e) {
					if (!dz._isValidFileDrag(e)) {
						return;
					}
					var relatedTarget = document.elementFromPoint(e.clientX,
							e.clientY);
					if (!relatedTarget || relatedTarget.nodeName == "HTML") {
						dropArea.style.display = "none";
					}
				});
	},
	_onSubmit : function(id, fileName) {
		qq.FileUploaderBasic.prototype._onSubmit.apply(this, arguments);
		this._addToList(id, fileName);
	},
	_onProgress : function(id, fileName, loaded, total) {
		qq.FileUploaderBasic.prototype._onProgress.apply(this, arguments);
		var item = this._getItemByFileId(id);
		var size = this._find(item, "size");
		size.style.display = "inline";
		var text;
		if (loaded != total) {
			text = Math.round(loaded / total * 100) + "% from "
					+ this._formatSize(total);
		} else {
			text = this._formatSize(total);
		}
		qq.setText(size, text);
	},
	_onComplete : function(id, fileName, result) {
		qq.FileUploaderBasic.prototype._onComplete.apply(this, arguments);
		var item = this._getItemByFileId(id);
		qq.remove(this._find(item, "cancel"));
		qq.remove(this._find(item, "spinner"));
		if (result.success) {
			qq.addClass(item, this._classes.success);
		} else {
			qq.addClass(item, this._classes.fail);
		}
	},
	_addToList : function(id, fileName) {
		var item = qq.toElement(this._options.fileTemplate);
		item.qqFileId = id;
		var fileElement = this._find(item, "file");
		qq.setText(fileElement, this._formatFileName(fileName));
		this._find(item, "size").style.display = "none";
		this._listElement.appendChild(item);
	},
	_getItemByFileId : function(id) {
		var item = this._listElement.firstChild;
		while (item) {
			if (item.qqFileId == id) {
				return item;
			}
			item = item.nextSibling;
		}
	},
	_bindCancelEvent : function() {
		var self = this, list = this._listElement;
		qq.attach(list, "click", function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;
			if (qq.hasClass(target, self._classes.cancel)) {
				qq.preventDefault(e);
				var item = target.parentNode;
				self._handler.cancel(item.qqFileId);
				qq.remove(item);
			}
		});
	}
});
qq.UploadDropZone = function(o) {
	this._options = {
		element : null,
		onEnter : function(e) {
		},
		onLeave : function(e) {
		},
		onLeaveNotDescendants : function(e) {
		},
		onDrop : function(e) {
		}
	};
	qq.extend(this._options, o);
	this._element = this._options.element;
	this._disableDropOutside();
	this._attachEvents();
};
qq.UploadDropZone.prototype = {
	_disableDropOutside : function(e) {
		if (!qq.UploadDropZone.dropOutsideDisabled) {
			qq.attach(document, "dragover", function(e) {
				if (e.dataTransfer) {
					e.dataTransfer.dropEffect = "none";
					e.preventDefault();
				}
			});
			qq.UploadDropZone.dropOutsideDisabled = true;
		}
	},
	_attachEvents : function() {
		var self = this;
		qq.attach(self._element, "dragover", function(e) {
			if (!self._isValidFileDrag(e)) {
				return;
			}
			var effect = e.dataTransfer.effectAllowed;
			if (effect == "move" || effect == "linkMove") {
				e.dataTransfer.dropEffect = "move";
			} else {
				e.dataTransfer.dropEffect = "copy";
			}
			e.stopPropagation();
			e.preventDefault();
		});
		qq.attach(self._element, "dragenter", function(e) {
			if (!self._isValidFileDrag(e)) {
				return;
			}
			self._options.onEnter(e);
		});
		qq.attach(self._element, "dragleave",
				function(e) {
					if (!self._isValidFileDrag(e)) {
						return;
					}
					self._options.onLeave(e);
					var relatedTarget = document.elementFromPoint(e.clientX,
							e.clientY);
					if (qq.contains(this, relatedTarget)) {
						return;
					}
					self._options.onLeaveNotDescendants(e);
				});
		qq.attach(self._element, "drop", function(e) {
			if (!self._isValidFileDrag(e)) {
				return;
			}
			e.preventDefault();
			self._options.onDrop(e);
		});
	},
	_isValidFileDrag : function(e) {
		var dt = e.dataTransfer, isWebkit = navigator.userAgent
				.indexOf("AppleWebKit") > -1;
		return dt
				&& dt.effectAllowed != "none"
				&& (dt.files || (!isWebkit && dt.types.contains && dt.types
						.contains("Files")));
	}
};
qq.UploadButton = function(o) {
	this._options = {
		element : null,
		multiple : false,
		name : "file",
		onChange : function(input) {
		},
		hoverClass : "qq-upload-button-hover",
		focusClass : "qq-upload-button-focus"
	};
	qq.extend(this._options, o);
	this._element = this._options.element;
	qq.css(this._element, {
		position : "relative",
		overflow : "hidden",
		direction : "ltr"
	});
	this._input = this._createInput();
};
qq.UploadButton.prototype = {
	getInput : function() {
		return this._input;
	},
	reset : function() {
		if (this._input.parentNode) {
			qq.remove(this._input);
		}
		qq.removeClass(this._element, this._options.focusClass);
		this._input = this._createInput();
	},
	_createInput : function() {
		var input = document.createElement("input");
		if (this._options.multiple) {
			input.setAttribute("multiple", "multiple");
		}
		input.setAttribute("type", "file");
		input.setAttribute("name", this._options.name);
		qq.css(input, {
			position : "absolute",
			right : 0,
			top : 0,
			fontFamily : "Arial",
			fontSize : "118px",
			margin : 0,
			padding : 0,
			cursor : "normal",
			opacity : 0
		});
		this._element.appendChild(input);
		var self = this;
		qq.attach(input, "change", function() {
			self._options.onChange(input);
		});
		qq.attach(input, "mouseover", function() {
			qq.addClass(self._element, self._options.hoverClass);
		});
		qq.attach(input, "mouseout", function() {
			qq.removeClass(self._element, self._options.hoverClass);
		});
		qq.attach(input, "focus", function() {
			qq.addClass(self._element, self._options.focusClass);
		});
		qq.attach(input, "blur", function() {
			qq.removeClass(self._element, self._options.focusClass);
		});
		if (window.attachEvent) {
			input.setAttribute("tabIndex", "-1");
		}
		return input;
	}
};
qq.UploadHandlerAbstract = function(o) {
	this._options = {
		debug : false,
		action : "/upload.php",
		maxConnections : 999,
		onProgress : function(id, fileName, loaded, total) {
		},
		onComplete : function(id, fileName, response) {
		},
		onCancel : function(id, fileName) {
		}
	};
	qq.extend(this._options, o);
	this._queue = [];
	this._params = [];
};
qq.UploadHandlerAbstract.prototype = {
	log : function(str) {
		if (this._options.debug && window.console) {
			console.log("[uploader] " + str);
		}
	},
	add : function(file) {
	},
	upload : function(id, params) {
		var len = this._queue.push(id);
		var copy = {};
		qq.extend(copy, params);
		this._params[id] = copy;
		if (len <= this._options.maxConnections) {
			this._upload(id, this._params[id]);
		}
	},
	cancel : function(id) {
		this._cancel(id);
		this._dequeue(id);
	},
	cancelAll : function() {
		for ( var i = 0; i < this._queue.length; i++) {
			this._cancel(this._queue[i]);
		}
		this._queue = [];
	},
	getName : function(id) {
	},
	getSize : function(id) {
	},
	getQueue : function() {
		return this._queue;
	},
	_upload : function(id) {
	},
	_cancel : function(id) {
	},
	_dequeue : function(id) {
		var i = qq.indexOf(this._queue, id);
		this._queue.splice(i, 1);
		var max = this._options.maxConnections;
		if (this._queue.length >= max && i < max) {
			var nextId = this._queue[max - 1];
			this._upload(nextId, this._params[nextId]);
		}
	}
};
qq.UploadHandlerForm = function(o) {
	qq.UploadHandlerAbstract.apply(this, arguments);
	this._inputs = {};
};
qq.extend(qq.UploadHandlerForm.prototype, qq.UploadHandlerAbstract.prototype);
qq
		.extend(
				qq.UploadHandlerForm.prototype,
				{
					add : function(fileInput) {
						fileInput.setAttribute("name", "qqfile");
						var id = "qq-upload-handler-iframe" + qq.getUniqueId();
						this._inputs[id] = fileInput;
						if (fileInput.parentNode) {
							qq.remove(fileInput);
						}
						return id;
					},
					getName : function(id) {
						return this._inputs[id].value.replace(/.*(\/|\\)/, "");
					},
					_cancel : function(id) {
						this._options.onCancel(id, this.getName(id));
						delete this._inputs[id];
						var iframe = document.getElementById(id);
						if (iframe) {
							iframe.setAttribute("src", "javascript:false;");
							qq.remove(iframe);
						}
					},
					_upload : function(id, params) {
						var input = this._inputs[id];
						if (!input) {
							throw new Error(
									"file with passed id was not added, or already uploaded or cancelled");
						}
						var fileName = this.getName(id);
						var iframe = this._createIframe(id);
						var form = this._createForm(iframe, params, input);
						form.appendChild(input);
						var self = this;
						this._attachLoadEvent(iframe, function() {
							self.log("iframe loaded");
							var response = self._getIframeContentJSON(iframe);
							self._options.onComplete(id, fileName, response);
							self._dequeue(id);
							delete self._inputs[id];
							setTimeout(function() {
								qq.remove(iframe);
							}, 1);
						});
						form.submit();
						qq.remove(form);
						return id;
					},
					_attachLoadEvent : function(iframe, callback) {
						qq
								.attach(
										iframe,
										"load",
										function() {
											if (!iframe.parentNode) {
												return;
											}
											if (iframe.contentDocument
													&& iframe.contentDocument.body
													&& iframe.contentDocument.body.innerHTML == "false") {
												return;
											}
											callback();
										});
					},
					_getIframeContentJSON : function(iframe) {
						var doc = iframe.contentDocument ? iframe.contentDocument
								: iframe.contentWindow.document, response;
						this.log("converting iframe's innerHTML to JSON");
						this.log("innerHTML = " + doc.body.innerHTML);
						try {
							response = eval("(" + doc.body.innerHTML + ")");
						} catch (err) {
							response = {};
						}
						return response;
					},
					_createIframe : function(id) {
						var iframe = qq
								.toElement('<iframe src="javascript:false;" name="'
										+ id + '" />');
						iframe.setAttribute("id", id);
						iframe.style.display = "none";
						document.body.appendChild(iframe);
						return iframe;
					},
					_createForm : function(iframe, params, input) {
						var form = qq
								.toElement('<form method="post" enctype="multipart/form-data"></form>');
						var queryString = qq.obj2url(params,
								this._options.action);
						form.setAttribute("action", queryString);
						form.setAttribute("target", iframe.name);
						form.style.display = "none";
						document.body.appendChild(form);
						return form;
					},
					_createS3Form : function(iframe, params, input, tid, sig,
							policy, success_redirect) {
					}
				});
qq.UploadHandlerXhr = function(o) {
	qq.UploadHandlerAbstract.apply(this, arguments);
	this._files = [];
	this._xhrs = [];
	this._loaded = [];
};
qq.UploadHandlerXhr.isSupported = function() {
	var input = document.createElement("input");
	input.type = "file";
	return ("multiple" in input && typeof File != "undefined" && typeof (new XMLHttpRequest()).upload != "undefined");
};
qq.extend(qq.UploadHandlerXhr.prototype, qq.UploadHandlerAbstract.prototype);
qq
		.extend(
				qq.UploadHandlerXhr.prototype,
				{
					add : function(file) {
						if (!(file instanceof File)) {
							throw new Error(
									"Passed obj in not a File (in qq.UploadHandlerXhr)");
						}
						return this._files.push(file) - 1;
					},
					getName : function(id) {
						var file = this._files[id];
						return file.fileName != null ? file.fileName
								: file.name;
					},
					getSize : function(id) {
						var file = this._files[id];
						return file.fileSize != null ? file.fileSize
								: file.size;
					},
					getLoaded : function(id) {
						return this._loaded[id] || 0;
					},
					_upload : function(id, params) {
						var file = this._files[id], name = this.getName(id), size = this
								.getSize(id);
						this._loaded[id] = 0;
						var xhr = this._xhrs[id] = new XMLHttpRequest();
						var self = this;
						xhr.upload.onprogress = function(e) {
							if (e.lengthComputable) {
								self._loaded[id] = e.loaded;
								self._options.onProgress(id, name, e.loaded,
										e.total);
							}
						};
						xhr.onreadystatechange = function() {
							if (xhr.readyState == 4) {
								self._onComplete(id, xhr);
							}
						};
						params = params || {};
						params["method"] = "xhr";
						var queryString = qq.obj2url(params,
								this._options.action);
						xhr.open("POST", queryString, true);
						xhr.setRequestHeader("X-Requested-With",
								"XMLHttpRequest");
						xhr.setRequestHeader("X-File-Name",
								encodeURIComponent(name));
						xhr.setRequestHeader("Content-Type",
								"application/octet-stream");
						xhr.send(file);
					},
					_onComplete : function(id, xhr) {
						if (!this._files[id]) {
							return;
						}
						var name = this.getName(id);
						var size = this.getSize(id);
						this._options.onProgress(id, name, size, size);
						if (xhr.status == 200) {
							this.log("xhr - server response received");
							this.log("responseText = " + xhr.responseText);
							var response;
							try {
								response = eval("(" + xhr.responseText + ")");
							} catch (err) {
								response = {};
							}
							this._options.onComplete(id, name, response);
						} else {
							this._options.onComplete(id, name, {});
						}
						this._files[id] = null;
						this._xhrs[id] = null;
						this._dequeue(id);
					},
					_cancel : function(id) {
						this._options.onCancel(id, this.getName(id));
						this._files[id] = null;
						if (this._xhrs[id]) {
							this._xhrs[id].abort();
							this._xhrs[id] = null;
						}
					}
				});
/*
 * jQuery Color Animations v@VERSION https://github.com/jquery/jquery-color
 * 
 * Copyright 2012 jQuery Foundation and other contributors Released under the
 * MIT license. http://jquery.org/license
 * 
 * Date: @DATE
 */
(function(jQuery, undefined) {
	var stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", rplusequals = /^([\-+])=\s*(\d+\.?\d*)/, stringParsers = [
			{
				re : /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				parse : function(execResult) {
					return [ execResult[1], execResult[2], execResult[3],
							execResult[4] ];
				}
			},
			{
				re : /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				parse : function(execResult) {
					return [ execResult[1] * 2.55, execResult[2] * 2.55,
							execResult[3] * 2.55, execResult[4] ];
				}
			},
			{
				re : /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
				parse : function(execResult) {
					return [ parseInt(execResult[1], 16),
							parseInt(execResult[2], 16),
							parseInt(execResult[3], 16) ];
				}
			},
			{
				re : /#([a-f0-9])([a-f0-9])([a-f0-9])/,
				parse : function(execResult) {
					return [ parseInt(execResult[1] + execResult[1], 16),
							parseInt(execResult[2] + execResult[2], 16),
							parseInt(execResult[3] + execResult[3], 16) ];
				}
			},
			{
				re : /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				space : "hsla",
				parse : function(execResult) {
					return [ execResult[1], execResult[2] / 100,
							execResult[3] / 100, execResult[4] ];
				}
			} ], color = jQuery.Color = function(color, green, blue, alpha) {
		return new jQuery.Color.fn.parse(color, green, blue, alpha);
	}, spaces = {
		rgba : {
			props : {
				red : {
					idx : 0,
					type : "byte"
				},
				green : {
					idx : 1,
					type : "byte"
				},
				blue : {
					idx : 2,
					type : "byte"
				}
			}
		},
		hsla : {
			props : {
				hue : {
					idx : 0,
					type : "degrees"
				},
				saturation : {
					idx : 1,
					type : "percent"
				},
				lightness : {
					idx : 2,
					type : "percent"
				}
			}
		}
	}, propTypes = {
		"byte" : {
			floor : true,
			max : 255
		},
		"percent" : {
			max : 1
		},
		"degrees" : {
			mod : 360,
			floor : true
		}
	}, support = color.support = {}, supportElem = jQuery("<p>")[0], colors, each = jQuery.each;
	supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";
	support.rgba = supportElem.style.backgroundColor.indexOf("rgba") > -1;
	each(spaces, function(spaceName, space) {
		space.cache = "_" + spaceName;
		space.props.alpha = {
			idx : 3,
			type : "percent",
			def : 1
		};
	});
	function clamp(value, prop, allowEmpty) {
		var type = propTypes[prop.type] || {};
		if (value == null) {
			return (allowEmpty || !prop.def) ? null : prop.def;
		}
		value = type.floor ? ~~value : parseFloat(value);
		if (isNaN(value)) {
			return prop.def;
		}
		if (type.mod) {
			return (value + type.mod) % type.mod;
		}
		return 0 > value ? 0 : type.max < value ? type.max : value;
	}
	function stringParse(string) {
		var inst = color(), rgba = inst._rgba = [];
		string = string.toLowerCase();
		each(
				stringParsers,
				function(i, parser) {
					var parsed, match = parser.re.exec(string), values = match
							&& parser.parse(match), spaceName = parser.space
							|| "rgba";
					if (values) {
						parsed = inst[spaceName](values);
						inst[spaces[spaceName].cache] = parsed[spaces[spaceName].cache];
						rgba = inst._rgba = parsed._rgba;
						return false;
					}
				});
		if (rgba.length) {
			if (rgba.join() === "0,0,0,0") {
				jQuery.extend(rgba, colors.transparent);
			}
			return inst;
		}
		return colors[string];
	}
	color.fn = jQuery
			.extend(
					color.prototype,
					{
						parse : function(red, green, blue, alpha) {
							if (red === undefined) {
								this._rgba = [ null, null, null, null ];
								return this;
							}
							if (red.jquery || red.nodeType) {
								red = jQuery(red).css(green);
								green = undefined;
							}
							var inst = this, type = jQuery.type(red), rgba = this._rgba = [];
							if (green !== undefined) {
								red = [ red, green, blue, alpha ];
								type = "array";
							}
							if (type === "string") {
								return this.parse(stringParse(red)
										|| colors._default);
							}
							if (type === "array") {
								each(spaces.rgba.props,
										function(key, prop) {
											rgba[prop.idx] = clamp(
													red[prop.idx], prop);
										});
								return this;
							}
							if (type === "object") {
								if (red instanceof color) {
									each(
											spaces,
											function(spaceName, space) {
												if (red[space.cache]) {
													inst[space.cache] = red[space.cache]
															.slice();
												}
											});
								} else {
									each(
											spaces,
											function(spaceName, space) {
												var cache = space.cache;
												each(
														space.props,
														function(key, prop) {
															if (!inst[cache]
																	&& space.to) {
																if (key === "alpha"
																		|| red[key] == null) {
																	return;
																}
																inst[cache] = space
																		.to(inst._rgba);
															}
															inst[cache][prop.idx] = clamp(
																	red[key],
																	prop, true);
														});
												if (inst[cache]
														&& jQuery
																.inArray(
																		null,
																		inst[cache]
																				.slice(
																						0,
																						3)) < 0) {
													inst[cache][3] = 1;
													if (space.from) {
														inst._rgba = space
																.from(inst[cache]);
													}
												}
											});
								}
								return this;
							}
						},
						is : function(compare) {
							var is = color(compare), same = true, inst = this;
							each(
									spaces,
									function(_, space) {
										var localCache, isCache = is[space.cache];
										if (isCache) {
											localCache = inst[space.cache]
													|| space.to
													&& space.to(inst._rgba)
													|| [];
											each(
													space.props,
													function(_, prop) {
														if (isCache[prop.idx] != null) {
															same = (isCache[prop.idx] === localCache[prop.idx]);
															return same;
														}
													});
										}
										return same;
									});
							return same;
						},
						_space : function() {
							var used = [], inst = this;
							each(spaces, function(spaceName, space) {
								if (inst[space.cache]) {
									used.push(spaceName);
								}
							});
							return used.pop();
						},
						transition : function(other, distance) {
							var end = color(other), spaceName = end._space(), space = spaces[spaceName], startColor = this
									.alpha() === 0 ? color("transparent")
									: this, start = startColor[space.cache]
									|| space.to(startColor._rgba), result = start
									.slice();
							end = end[space.cache];
							each(
									space.props,
									function(key, prop) {
										var index = prop.idx, startValue = start[index], endValue = end[index], type = propTypes[prop.type]
												|| {};
										if (endValue === null) {
											return;
										}
										if (startValue === null) {
											result[index] = endValue;
										} else {
											if (type.mod) {
												if (endValue - startValue > type.mod / 2) {
													startValue += type.mod;
												} else {
													if (startValue - endValue > type.mod / 2) {
														startValue -= type.mod;
													}
												}
											}
											result[index] = clamp(
													(endValue - startValue)
															* distance
															+ startValue, prop);
										}
									});
							return this[spaceName](result);
						},
						blend : function(opaque) {
							if (this._rgba[3] === 1) {
								return this;
							}
							var rgb = this._rgba.slice(), a = rgb.pop(), blend = color(opaque)._rgba;
							return color(jQuery.map(rgb, function(v, i) {
								return (1 - a) * blend[i] + a * v;
							}));
						},
						toRgbaString : function() {
							var prefix = "rgba(", rgba = jQuery.map(this._rgba,
									function(v, i) {
										return v == null ? (i > 2 ? 1 : 0) : v;
									});
							if (rgba[3] === 1) {
								rgba.pop();
								prefix = "rgb(";
							}
							return prefix + rgba.join() + ")";
						},
						toHslaString : function() {
							var prefix = "hsla(", hsla = jQuery.map(
									this.hsla(), function(v, i) {
										if (v == null) {
											v = i > 2 ? 1 : 0;
										}
										if (i && i < 3) {
											v = Math.round(v * 100) + "%";
										}
										return v;
									});
							if (hsla[3] === 1) {
								hsla.pop();
								prefix = "hsl(";
							}
							return prefix + hsla.join() + ")";
						},
						toHexString : function(includeAlpha) {
							var rgba = this._rgba.slice(), alpha = rgba.pop();
							if (includeAlpha) {
								rgba.push(~~(alpha * 255));
							}
							return "#" + jQuery.map(rgba, function(v) {
								v = (v || 0).toString(16);
								return v.length === 1 ? "0" + v : v;
							}).join("");
						},
						toString : function() {
							return this._rgba[3] === 0 ? "transparent" : this
									.toRgbaString();
						}
					});
	color.fn.parse.prototype = color.fn;
	function hue2rgb(p, q, h) {
		h = (h + 1) % 1;
		if (h * 6 < 1) {
			return p + (q - p) * h * 6;
		}
		if (h * 2 < 1) {
			return q;
		}
		if (h * 3 < 2) {
			return p + (q - p) * ((2 / 3) - h) * 6;
		}
		return p;
	}
	spaces.hsla.to = function(rgba) {
		if (rgba[0] == null || rgba[1] == null || rgba[2] == null) {
			return [ null, null, null, rgba[3] ];
		}
		var r = rgba[0] / 255, g = rgba[1] / 255, b = rgba[2] / 255, a = rgba[3], max = Math
				.max(r, g, b), min = Math.min(r, g, b), diff = max - min, add = max
				+ min, l = add * 0.5, h, s;
		if (min === max) {
			h = 0;
		} else {
			if (r === max) {
				h = (60 * (g - b) / diff) + 360;
			} else {
				if (g === max) {
					h = (60 * (b - r) / diff) + 120;
				} else {
					h = (60 * (r - g) / diff) + 240;
				}
			}
		}
		if (diff === 0) {
			s = 0;
		} else {
			if (l <= 0.5) {
				s = diff / add;
			} else {
				s = diff / (2 - add);
			}
		}
		return [ Math.round(h) % 360, s, l, a == null ? 1 : a ];
	};
	spaces.hsla.from = function(hsla) {
		if (hsla[0] == null || hsla[1] == null || hsla[2] == null) {
			return [ null, null, null, hsla[3] ];
		}
		var h = hsla[0] / 360, s = hsla[1], l = hsla[2], a = hsla[3], q = l <= 0.5 ? l
				* (1 + s)
				: l + s - l * s, p = 2 * l - q;
		return [ Math.round(hue2rgb(p, q, h + (1 / 3)) * 255),
				Math.round(hue2rgb(p, q, h) * 255),
				Math.round(hue2rgb(p, q, h - (1 / 3)) * 255), a ];
	};
	each(
			spaces,
			function(spaceName, space) {
				var props = space.props, cache = space.cache, to = space.to, from = space.from;
				color.fn[spaceName] = function(value) {
					if (to && !this[cache]) {
						this[cache] = to(this._rgba);
					}
					if (value === undefined) {
						return this[cache].slice();
					}
					var ret, type = jQuery.type(value), arr = (type === "array" || type === "object") ? value
							: arguments, local = this[cache].slice();
					each(props, function(key, prop) {
						var val = arr[type === "object" ? key : prop.idx];
						if (val == null) {
							val = local[prop.idx];
						}
						local[prop.idx] = clamp(val, prop);
					});
					if (from) {
						ret = color(from(local));
						ret[cache] = local;
						return ret;
					} else {
						return color(local);
					}
				};
				each(
						props,
						function(key, prop) {
							if (color.fn[key]) {
								return;
							}
							color.fn[key] = function(value) {
								var vtype = jQuery.type(value), fn = (key === "alpha" ? (this._hsla ? "hsla"
										: "rgba")
										: spaceName), local = this[fn](), cur = local[prop.idx], match;
								if (vtype === "undefined") {
									return cur;
								}
								if (vtype === "function") {
									value = value.call(this, cur);
									vtype = jQuery.type(value);
								}
								if (value == null && prop.empty) {
									return this;
								}
								if (vtype === "string") {
									match = rplusequals.exec(value);
									if (match) {
										value = cur + parseFloat(match[2])
												* (match[1] === "+" ? 1 : -1);
									}
								}
								local[prop.idx] = value;
								return this[fn](local);
							};
						});
			});
	color.hook = function(hook) {
		var hooks = hook.split(" ");
		each(
				hooks,
				function(i, hook) {
					jQuery.cssHooks[hook] = {
						set : function(elem, value) {
							var parsed, curElem, backgroundColor = "";
							if (jQuery.type(value) !== "string"
									|| (parsed = stringParse(value))) {
								value = color(parsed || value);
								if (!support.rgba && value._rgba[3] !== 1) {
									curElem = hook === "backgroundColor" ? elem.parentNode
											: elem;
									while ((backgroundColor === "" || backgroundColor === "transparent")
											&& curElem && curElem.style) {
										try {
											backgroundColor = jQuery.css(
													curElem, "backgroundColor");
											curElem = curElem.parentNode;
										} catch (e) {
										}
									}
									value = value
											.blend(backgroundColor
													&& backgroundColor !== "transparent" ? backgroundColor
													: "_default");
								}
								value = value.toRgbaString();
							}
							try {
								elem.style[hook] = value;
							} catch (e) {
							}
						}
					};
					jQuery.fx.step[hook] = function(fx) {
						if (!fx.colorInit) {
							fx.start = color(fx.elem, hook);
							fx.end = color(fx.end);
							fx.colorInit = true;
						}
						jQuery.cssHooks[hook].set(fx.elem, fx.start.transition(
								fx.end, fx.pos));
					};
				});
	};
	color.hook(stepHooks);
	jQuery.cssHooks.borderColor = {
		expand : function(value) {
			var expanded = {};
			each([ "Top", "Right", "Bottom", "Left" ], function(i, part) {
				expanded["border" + part + "Color"] = value;
			});
			return expanded;
		}
	};
	colors = jQuery.Color.names = {
		aqua : "#00ffff",
		black : "#000000",
		blue : "#0000ff",
		fuchsia : "#ff00ff",
		gray : "#808080",
		green : "#008000",
		lime : "#00ff00",
		maroon : "#800000",
		navy : "#000080",
		olive : "#808000",
		purple : "#800080",
		red : "#ff0000",
		silver : "#c0c0c0",
		teal : "#008080",
		white : "#ffffff",
		yellow : "#ffff00",
		transparent : [ null, null, null, 0 ],
		_default : "#ffffff"
	};
})(jQuery);
function vote(node) {
	if (node.className == "score voted") {
		node.className = "score";
		var votes = parseInt(node.innerHTML) - 1;
		node.innerHTML = votes;
	} else {
		if (node.className == "score") {
			node.className = "score voted";
			var votes = parseInt(node.innerHTML) + 1;
			node.innerHTML = votes;
		}
	}
	var ping = new Image();
	ping.src = node.href + "&i=1";
	return false;
}
function saveitem(node) {
	if (node.className == "save saved") {
		node.className = "save";
	} else {
		if (node.className == "save") {
			node.className = "save saved";
		}
	}
	var ping = new Image();
	ping.src = node.href + "&i=1";
	return false;
}
function cb_support(resp) {
	document.getElementById("support_ticket_submit").disabled = false;
	document.getElementById("support_ticket_submit").className = "btn primary large";
	if (resp.status == 0 || resp.responseText == "") {
		document.getElementById("status_field_error").style.display = "block";
		document.getElementById("field_wrapper_subject").className = "clearfix error";
		document.getElementById("err-msg-subject").style.display = "block";
		document.getElementById("field_wrapper_message").className = "clearfix error";
		document.getElementById("err-msg-message").style.display = "block";
		document.getElementById("field_wrapper_name").className = "clearfix error";
		document.getElementById("err-msg-name").style.display = "block";
		document.getElementById("field_wrapper_email").className = "clearfix error";
		document.getElementById("err-msg-email").style.display = "block";
	} else {
		if (resp.status == 200) {
			var data = jQuery.parseJSON(resp.responseText);
			if ("errors" in data) {
				if ("title" in data["errors"]) {
					document.getElementById("status_field_error").style.display = "block";
					document.getElementById("field_wrapper_subject").className = "clearfix error";
					document.getElementById("err-msg-subject").style.display = "block";
				}
				if ("comments" in data["errors"]) {
					document.getElementById("status_field_error").style.display = "block";
					document.getElementById("field_wrapper_message").className = "clearfix error";
					document.getElementById("err-msg-message").style.display = "block";
				}
				if ("enduser_name" in data["errors"]) {
					document.getElementById("status_field_error").style.display = "block";
					document.getElementById("field_wrapper_name").className = "clearfix error";
					document.getElementById("err-msg-name").style.display = "block";
				}
				if ("enduser_email" in data["errors"]) {
					document.getElementById("status_field_error").style.display = "block";
					document.getElementById("field_wrapper_email").className = "clearfix error";
					document.getElementById("err-msg-email").style.display = "block";
				}
			} else {
				document.getElementById("status_success").style.display = "block";
				document.getElementById("field_name").value = "";
				document.getElementById("field_email").value = "";
				document.getElementById("field_subject").value = "";
				document.getElementById("field_message").value = "";
			}
		} else {
			document.getElementById("status_unknown_error").style.display = "block";
		}
	}
}
function create_support_ticket() {
	document.getElementById("support_ticket_submit").disabled = true;
	document.getElementById("support_ticket_submit").className = "btn primary large disabled";
	document.getElementById("field_wrapper_name").className = "clearfix";
	document.getElementById("err-msg-name").style.display = "none";
	document.getElementById("field_wrapper_email").className = "clearfix";
	document.getElementById("err-msg-email").style.display = "none";
	document.getElementById("field_wrapper_subject").className = "clearfix";
	document.getElementById("err-msg-subject").style.display = "none";
	document.getElementById("field_wrapper_message").className = "clearfix";
	document.getElementById("err-msg-message").style.display = "none";
	document.getElementById("status_success").style.display = "none";
	document.getElementById("status_field_error").style.display = "none";
	document.getElementById("status_unknown_error").style.display = "none";
	params = {};
	params["name"] = document.getElementById("field_name").value;
	params["email"] = document.getElementById("field_email").value;
	params["subject"] = document.getElementById("field_subject").value;
	params["message"] = document.getElementById("field_message").value;
	Groove.createTicket(params, cb_support);
}
webpackHotUpdate(0,{

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(9), RootInstanceProvider = __webpack_require__(17), ReactMount = __webpack_require__(19), React = __webpack_require__(71); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {\n\nvar React = __webpack_require__(71);\nmodule.exports = function (locals) {\n  var tags = [];\n  var locals_for_with = locals || {};\n  (function(styles) {\n    tags.push(React.createElement(\"section\", {\n      className: styles.content\n    }, React.createElement(\"h1\", {}, \"We also use css-loader for modular CSS\"), React.createElement(\"p\", {}, \"Huzzah! hgfhgfjhghjgkjhjlhkjh\")));\n  }).call(this, \"styles\" in locals_for_with ? locals_for_with.styles : typeof styles !== \"undefined\" ? styles : undefined);\n  if (tags.length === 1 && !Array.isArray(tags[0])) {\n    return tags.pop();\n  }\n  tags.unshift(\"div\", null);\n  return React.createElement.apply(React, tags);\n}\n\n/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(181); if (makeExportsHot(module, __webpack_require__(71))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error(\"Cannot not apply hot update to \" + \"content.jade\" + \": \" + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))\n\n/*****************\n ** WEBPACK FOOTER\n ** ./dev/src/example/jade/content.jade\n ** module id = 187\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./dev/src/example/jade/content.jade?");

/***/ }

})
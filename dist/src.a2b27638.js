// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/core/createState.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createState;

function createState(initialState) {
  var state = initialState;
  var listeners = [];

  var getState = function getState() {
    return state;
  };

  var setState = function setState(nextState) {
    if (typeof nextState === "function") {
      var prevState = state;
      state = nextState(prevState);
    } else {
      state = nextState;
    }

    listeners.forEach(function (listener) {
      return listener();
    });
  };

  var subscribe = function subscribe(listener) {
    listeners.push(listener);
  };

  return {
    getState: getState,
    setState: setState,
    subscribe: subscribe
  };
}
},{}],"src/store/task.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createState2 = _interopRequireDefault(require("../core/createState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var initialState = [{
  id: 1598588336036,
  title: "12",
  description: "34",
  from: "2020-08-07T11:18",
  to: "2020-08-15T11:18",
  complete: false
}, {
  id: 1598588344144,
  title: "5",
  description: "3",
  from: "2020-08-05T11:19",
  to: "2020-08-14T11:19",
  complete: false
}, {
  id: 1598588344145,
  title: "5",
  description: "3",
  from: "2020-08-05T11:19",
  to: "2020-08-29T18:19",
  complete: false
}];

var _createState = (0, _createState2.default)(initialState),
    getState = _createState.getState,
    setState = _createState.setState,
    subscribe = _createState.subscribe;

var getTaskById = function getTaskById(id) {
  return getState().filter(function (task) {
    return task.id === parseInt(id);
  });
};

var addTask = function addTask(task) {
  setState(function (prevState) {
    return [].concat(_toConsumableArray(prevState), [_objectSpread({}, task)]);
  });
};

var removeTask = function removeTask(id) {
  setState(function (prevState) {
    return prevState.filter(function (task) {
      return task.id !== parseInt(id);
    });
  });
};

var completeTask = function completeTask(id) {
  setState(function (prevState) {
    return prevState.map(function (task) {
      if (task.id === parseInt(id)) {
        task.complete = task.complete ? false : true;
      }

      return task;
    });
  });
};

var editTask = function editTask(newTask) {
  setState(function (prevState) {
    return prevState.map(function (task) {
      if (task.id !== parseInt(newTask.id)) {
        return task;
      }

      return _objectSpread(_objectSpread({}, task), newTask);
    });
  });
};

var task = {
  getState: getState,
  setState: setState,
  subscribe: subscribe,
  getTaskById: getTaskById,
  addTask: addTask,
  removeTask: removeTask,
  completeTask: completeTask,
  editTask: editTask
};
var _default = task;
exports.default = _default;
},{"../core/createState":"src/core/createState.js"}],"src/components/Button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Button;

function Button(_ref) {
  var text = _ref.text,
      color = _ref.color,
      id = _ref.id,
      dataToggle = _ref.dataToggle,
      dataTarget = _ref.dataTarget,
      dataDismiss = _ref.dataDismiss,
      dataId = _ref.dataId;
  return "\n    <button\n        class=\"btn ".concat(color, "\"\n        id=").concat(id, "\n        data-toggle=").concat(dataToggle, "\n        data-target=").concat(dataTarget, "\n        data-dismiss=").concat(dataDismiss, "\n        data-id=\"").concat(dataId, "\"\n        >\n        ").concat(text, "\n    </button>\n      ");
}
},{}],"src/containers/Todolist/Header.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _task = _interopRequireDefault(require("../../store/task"));

var _Button = _interopRequireDefault(require("../../components/Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Header = /*#__PURE__*/function () {
  function Header(element) {
    _classCallCheck(this, Header);

    this.element = element;

    _task.default.subscribe(this.init.bind(this));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      return "\n        <div class=\"row\">\n            <div class=\"col-md-6\">\n            <h3 class=\"text-left text-primary font-weight-bold\">\n                Todo List\n            </h3>\n            </div>\n            <div class=\"col-md-6 text-right\">\n            ".concat((0, _Button.default)({
        text: "Add new task",
        color: "btn-primary",
        id: "btnThem",
        dataToggle: "modal",
        dataTarget: "#myModal"
      }), "\n            </div>\n        </div>\n        ");
    }
  }, {
    key: "init",
    value: function init() {
      this.element.innerHTML = this.render();
    }
  }]);

  return Header;
}();

exports.default = Header;
},{"../../store/task":"src/store/task.js","../../components/Button":"src/components/Button.js"}],"src/components/StatusIcon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StatusIcon;

function StatusIcon(_ref) {
  var id = _ref.id,
      complete = _ref.complete;
  return "\n    <input class=\"status todoStatus-js ".concat(complete ? "complete" : "", "\" type=\"checkbox\" data-id=\"").concat(id, "\">\n      ");
}
},{}],"src/components/DeleteIcon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DeleteIcon;

function DeleteIcon(_ref) {
  var id = _ref.id;
  return "\n    <button class=\"delete-icon delete-js\" data-id=\"".concat(id, "\"></button>\n        ");
}
},{}],"src/utils/convertIso.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

//2020-08-14T11:19
var convertIso = function convertIso(date) {
  var newDate = new Date(date);
  var day = newDate.getDate(),
      month = newDate.getMonth() + 1,
      year = newDate.getFullYear(),
      hour = newDate.getHours(),
      minute = newDate.getMinutes();
  hour = hour < 10 ? "0" + newDate.getHours() : newDate.getHours();
  month = month < 10 ? "0" + newDate.getMonth() : newDate.getMonth();
  minute = minute < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes();
  return "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hour, ":").concat(minute);
};

var _default = convertIso;
exports.default = _default;
},{}],"src/utils/dueDate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dueDate;

var _convertIso = _interopRequireDefault(require("./convertIso"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * normal
 * warning
 * overDate
 */
function dueDate(dueDate) {
  var alarm = 1000 * 60 * 60 * 24 * 1; // 1 day //8640000

  var today = (0, _convertIso.default)(Date.now());
  dueDate = (0, _convertIso.default)(dueDate);
  var timeLeft = new Date(dueDate) - new Date(today);

  if (timeLeft < 0) {
    return "overdate";
  }

  if (timeLeft < alarm) {
    return "warning";
  }

  return "normal";
}
},{"./convertIso":"src/utils/convertIso.js"}],"src/components/Task.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Task;

var _StatusIcon = _interopRequireDefault(require("./StatusIcon"));

var _DeleteIcon = _interopRequireDefault(require("./DeleteIcon"));

var _Button = _interopRequireDefault(require("./Button"));

var _dueDate = _interopRequireDefault(require("../utils/dueDate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Task(_ref) {
  var id = _ref.id,
      title = _ref.title,
      description = _ref.description,
      from = _ref.from,
      to = _ref.to,
      complete = _ref.complete;
  var color = "";

  if (complete) {
    color = "complete";
  } else {
    color = (0, _dueDate.default)(to);
  }

  return "\n    <div class=\"task ".concat(color, "\" data-id=\"").concat(id, "\">\n    ").concat((0, _StatusIcon.default)({
    id: id,
    complete: complete
  }), "\n      <div class=\"task__content\">\n          <label class=\"task__title\" id=\"js-task-title\">").concat(title, "</label>\n          <p class=\"task__des\" id=\"js-task-des\">").concat(description, "</p>\n      </div>\n      <div class=\"task__date\">\n          <p class=\"task__from\" id=\"js-task-from\">").concat(from, "</p>\n          <p class=\"task__to\" id=\"js-task-to\">").concat(to, "</p>\n      </div>\n      ").concat((0, _Button.default)({
    text: "Edit",
    color: "text-info",
    id: "modalEditBtn",
    dataToggle: "modal",
    dataTarget: "#modalEdit",
    dataId: id
  }), "\n      ").concat((0, _DeleteIcon.default)({
    id: id
  }), "\n    </div>\n    ");
}
},{"./StatusIcon":"src/components/StatusIcon.js","./DeleteIcon":"src/components/DeleteIcon.js","./Button":"src/components/Button.js","../utils/dueDate":"src/utils/dueDate.js"}],"src/containers/Todolist/TaskList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Task = _interopRequireDefault(require("../../components/Task"));

var _task = _interopRequireDefault(require("../../store/task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Modal = /*#__PURE__*/function () {
  function Modal(element) {
    _classCallCheck(this, Modal);

    this.element = element;

    _task.default.subscribe(this.init.bind(this));
  }

  _createClass(Modal, [{
    key: "handleDOM",
    value: function handleDOM() {
      var btnDelTaskEls = document.querySelectorAll(".delete-js");
      btnDelTaskEls.forEach(function (element) {
        return element.addEventListener("click", function () {
          _task.default.removeTask(element.getAttribute("data-id"));
        });
      });
      var btnStatusTaskEls = document.querySelectorAll(".todoStatus-js");
      btnStatusTaskEls.forEach(function (element) {
        return element.addEventListener("click", function () {
          _task.default.completeTask(element.getAttribute("data-id"));
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var tasklist = _task.default.getState();

      return "\n      <div class=\"card-body\">\n        <div class=\"task-list\" id=\"task-list\">\n             ".concat(tasklist && tasklist.map(function (task) {
        return (0, _Task.default)(task);
      }).join(''), "\n        </div>\n    </div>");
    }
  }, {
    key: "init",
    value: function init() {
      this.element.innerHTML = this.render();
      this.handleDOM();
    }
  }]);

  return Modal;
}();

exports.default = Modal;
},{"../../components/Task":"src/components/Task.js","../../store/task":"src/store/task.js"}],"src/containers/Todolist/Footer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _task = _interopRequireDefault(require("../../store/task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Footer = /*#__PURE__*/function () {
  function Footer(element) {
    _classCallCheck(this, Footer);

    this.element = element;

    _task.default.subscribe(this.init.bind(this));
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      return "\n    <div>\n     \n      </div>\n      ";
    }
  }, {
    key: "init",
    value: function init() {
      this.element.innerHTML = this.render();
    }
  }]);

  return Footer;
}();

exports.default = Footer;
},{"../../store/task":"src/store/task.js"}],"src/containers/Todolist/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Header = _interopRequireDefault(require("./Header"));

var _TaskList = _interopRequireDefault(require("./TaskList"));

var _Footer = _interopRequireDefault(require("./Footer"));

var _task = _interopRequireDefault(require("../../store/task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Counter = /*#__PURE__*/function () {
  function Counter(element) {
    _classCallCheck(this, Counter);

    this.element = element;
    this.todoListHeaderInstance = null;
    this.todoListTaskListInstance = null;
    this.todoLisFooterInstance = null;
  }

  _createClass(Counter, [{
    key: "handleDom",
    value: function handleDom() {
      var todoListHeader = document.getElementById("card-header");
      var todoListTaskList = document.getElementById("card-body");
      var todoListFooter = document.getElementById("card-footer");

      if (!this.todoListHeaderInstance) {
        this.todoListHeaderInstance = new _Header.default(todoListHeader);
      }

      if (!this.todoListTaskListInstance) {
        this.todoListTaskListInstance = new _TaskList.default(todoListTaskList);
      }

      if (!this.todoLisFooterInstance) {
        this.todoLisFooterInstance = new _Footer.default(todoListFooter);
      }

      this.todoListHeaderInstance.init();
      this.todoListTaskListInstance.init();
      this.todoLisFooterInstance.init();
      $("#modalEdit").on("show.bs.modal", function (e) {
        var taskId = $(e.relatedTarget).data("id");
        $("#btn-edit-task").attr("data-id", taskId);

        var currentTask = _task.default.getTaskById(taskId);

        var _currentTask$ = currentTask[0],
            title = _currentTask$.title,
            description = _currentTask$.description,
            from = _currentTask$.from,
            to = _currentTask$.to;
        document.getElementById("title-edit").value = title;
        document.getElementById("description-edit").value = description;
        document.getElementById("from-edit").value = from;
        document.getElementById("to-edit").value = to;
      });
    }
  }, {
    key: "render",
    value: function render() {
      return "\n    <div class=\"todo center\">\n        <div class=\"container\">\n          <div class=\"card text-center\" id=\"card\">\n        \n          <div class=\"card-header myCardHeader\" id=\"card-header\"></div>\n\n          <div class=\"card-body\" id=\"card-body\"></div>\n\n          <div class=\"card-footer myCardFooter\" id=\"card-footer\"></div>\n\n          </div>\n      </div>\n    \n\n      ";
    }
  }, {
    key: "init",
    value: function init() {
      this.element.innerHTML = this.render();
      this.handleDom();
    }
  }]);

  return Counter;
}();

exports.default = Counter;
},{"./Header":"src/containers/Todolist/Header.js","./TaskList":"src/containers/Todolist/TaskList.js","./Footer":"src/containers/Todolist/Footer.js","../../store/task":"src/store/task.js"}],"src/containers/History/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var History = /*#__PURE__*/function () {
  function History(element) {
    _classCallCheck(this, History);

    this.element = element;
  }

  _createClass(History, [{
    key: "handleDom",
    value: function handleDom() {}
  }, {
    key: "render",
    value: function render() {
      return "\n    <div class=\"history center\">\n       history\n      </div>\n      ";
    }
  }, {
    key: "init",
    value: function init() {
      this.element.innerHTML = this.render();
      this.handleDom();
    }
  }]);

  return History;
}();

exports.default = History;
},{}],"src/containers/Modal/AddTodo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _task = _interopRequireDefault(require("../../store/task"));

var _Button = _interopRequireDefault(require("../../components/Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AddTodo = /*#__PURE__*/function () {
  function AddTodo(element) {
    _classCallCheck(this, AddTodo);

    this.element = element;
    this.addTask = this.addTask.bind(this);
  }

  _createClass(AddTodo, [{
    key: "addTask",
    value: function addTask() {
      var id = Date.now();
      var title = document.getElementById("title").value;
      var description = document.getElementById("description").value;
      var from = document.getElementById("from").value;
      var to = document.getElementById("to").value;
      var newTask = {
        id: id,
        title: title,
        description: description,
        from: from,
        to: to,
        complete: false
      };

      _task.default.addTask(newTask);

      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      document.getElementById("from").value = "";
      document.getElementById("to").value = "";
    }
  }, {
    key: "handleDOM",
    value: function handleDOM() {
      var addTaskEl = document.querySelector("#btn-add-task");
      addTaskEl && addTaskEl.addEventListener("click", this.addTask);
    }
  }, {
    key: "render",
    value: function render() {
      return "\n      <div class=\"modal-dialog\">\n        <div class=\"modal-content p-3\">\n          <header class=\"head-form mb-0 mt-4 text-center\">\n            <h2 id=\"header-title\">Add New Task</h2>\n          </header>\n\n          <!-- Modal body -->\n          <div class=\"modal-body\">\n            <form role=\"form\">\n              <div class=\"form-group row\">\n                <div class=\"input-group\">\n                  <label\n                    for=\"example-datetime-local-input\"\n                    class=\"col-2 col-form-label\"\n                    >Title</label\n                  >\n                  <input\n                    type=\"text\"\n                    name=\"title\"\n                    id=\"title\"\n                    class=\"col-10 form-control input-sm\"\n                    placeholder=\"Title\"\n                  />\n                </div>\n\n                <span class=\"sp-thongbao\" id=\"tbMaNV\"></span>\n              </div>\n\n              <div class=\"form-group row\">\n                <label\n                  for=\"example-datetime-local-input\"\n                  class=\"col-2 col-form-label\"\n                  >Description</label\n                >\n                <input\n                  type=\"text\"\n                  name=\"description\"\n                  id=\"description\"\n                  class=\"col-10 form-control input-sm\"\n                  placeholder=\"Description\"\n                />\n              </div>\n              <div class=\"form-group row\">\n                <label\n                  for=\"example-datetime-local-input\"\n                  class=\"col-2 col-form-label\"\n                  >From</label\n                >\n                <input\n                  class=\"form-control col-10\"\n                  type=\"datetime-local\"\n                  id=\"from\"\n                />\n              </div>\n              <div class=\"form-group row\">\n                <label\n                  for=\"example-datetime-local-input\"\n                  class=\"col-2 col-form-label\"\n                  >Due date</label\n                >\n                <input\n                  class=\"form-control col-10\"\n                  type=\"datetime-local\"\n                  id=\"to\"\n                />\n              </div>\n            </form>\n          </div>\n\n          <!-- Modal footer -->\n          <div class=\"modal-footer\" id=\"modal-footer\">\n          ".concat((0, _Button.default)({
        text: "Đóng",
        color: "btn-secondary",
        id: "btnDong",
        dataDismiss: "modal"
      }), "\n          ").concat((0, _Button.default)({
        text: "Add new task",
        color: "btn-success",
        id: "btn-add-task",
        dataDismiss: "modal"
      }), "\n          </div>\n        </div>\n      </div>\n    ");
    }
  }, {
    key: "init",
    value: function init() {
      this.element.innerHTML = this.render();
      this.handleDOM();
    }
  }]);

  return AddTodo;
}();

exports.default = AddTodo;
},{"../../store/task":"src/store/task.js","../../components/Button":"src/components/Button.js"}],"src/containers/Modal/EditTodo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _task = _interopRequireDefault(require("../../store/task"));

var _Button = _interopRequireDefault(require("../../components/Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EditTodo = /*#__PURE__*/function () {
  function EditTodo(element) {
    _classCallCheck(this, EditTodo);

    this.element = element;
    this.editTask = this.editTask.bind(this);
  }

  _createClass(EditTodo, [{
    key: "editTask",
    value: function editTask(id) {
      id = parseInt(id);
      var title = document.getElementById("title-edit").value;
      var description = document.getElementById("description-edit").value;
      var from = document.getElementById("from-edit").value;
      var to = document.getElementById("to-edit").value;
      var newTask = {
        id: id,
        title: title,
        description: description,
        from: from,
        to: to,
        complete: false
      };

      _task.default.editTask(newTask);

      document.getElementById("title-edit").value = "";
      document.getElementById("description-edit").value = "";
      document.getElementById("from-edit").value = "";
      document.getElementById("to-edit").value = "";
    }
  }, {
    key: "handleDOM",
    value: function handleDOM() {
      var addTaskEl = document.querySelector("#btn-edit-task");
      var that = this;
      addTaskEl && addTaskEl.addEventListener("click", function (e) {
        that.editTask(e.target.getAttribute("data-id"));
      });
    }
  }, {
    key: "render",
    value: function render() {
      return "\n      <div class=\"modal-dialog\">\n        <div class=\"modal-content p-3\">\n          <header class=\"head-form mb-0 mt-4 text-center\">\n            <h2 id=\"header-title\">Edit Task</h2>\n          </header>\n\n          <!-- Modal body -->\n          <div class=\"modal-body\">\n            <form role=\"form\">\n              <div class=\"form-group row\">\n                <div class=\"input-group\">\n                  <label\n                    for=\"example-datetime-local-input\"\n                    class=\"col-2 col-form-label\"\n                    >Title</label\n                  >\n                  <input\n                    type=\"text\"\n                    name=\"title\"\n                    id=\"title-edit\"\n                    class=\"col-10 form-control input-sm\"\n                    placeholder=\"Title\"\n                  />\n                </div>\n\n                <span class=\"sp-thongbao\" id=\"tbMaNV\"></span>\n              </div>\n\n              <div class=\"form-group row\">\n                <label\n                  for=\"example-datetime-local-input\"\n                  class=\"col-2 col-form-label\"\n                  >Description</label\n                >\n                <input\n                  type=\"text\"\n                  name=\"description\"\n                  id=\"description-edit\"\n                  class=\"col-10 form-control input-sm\"\n                  placeholder=\"Description\"\n                />\n              </div>\n              <div class=\"form-group row\">\n                <label\n                  for=\"example-datetime-local-input\"\n                  class=\"col-2 col-form-label\"\n                  >From</label\n                >\n                <input\n                  class=\"form-control col-10\"\n                  type=\"datetime-local\"\n                  id=\"from-edit\"\n                />\n              </div>\n              <div class=\"form-group row\">\n                <label\n                  for=\"example-datetime-local-input\"\n                  class=\"col-2 col-form-label\"\n                  >Due date</label\n                >\n                <input\n                  class=\"form-control col-10\"\n                  type=\"datetime-local\"\n                  id=\"to-edit\"\n                />\n              </div>\n            </form>\n          </div>\n\n          <!-- Modal footer -->\n          <div class=\"modal-footer\" id=\"modal-footer\">\n          ".concat((0, _Button.default)({
        text: "Đóng",
        color: "btn-secondary",
        id: "btnDong",
        dataDismiss: "modal"
      }), "\n          ").concat((0, _Button.default)({
        text: "Edit",
        color: "btn-success",
        id: "btn-edit-task",
        dataDismiss: "modal"
      }), "\n          </div>\n        </div>\n      </div>\n    ");
    }
  }, {
    key: "init",
    value: function init() {
      this.element.innerHTML = this.render();
      this.handleDOM();
    }
  }]);

  return EditTodo;
}();

exports.default = EditTodo;
},{"../../store/task":"src/store/task.js","../../components/Button":"src/components/Button.js"}],"src/store/history.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createState2 = _interopRequireDefault(require("../core/createState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  url: "/"
};

var _createState = (0, _createState2.default)(initialState),
    getState = _createState.getState,
    setState = _createState.setState,
    subscribe = _createState.subscribe;

var to = function to(url) {
  setState({
    url: url
  });
};

var history = {
  getState: getState,
  setState: setState,
  subscribe: subscribe,
  to: to
};
var _default = history;
exports.default = _default;
},{"../core/createState":"src/core/createState.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _Todolist = _interopRequireDefault(require("./containers/Todolist"));

var _History = _interopRequireDefault(require("./containers/History"));

var _AddTodo = _interopRequireDefault(require("./containers/Modal/AddTodo"));

var _EditTodo = _interopRequireDefault(require("./containers/Modal/EditTodo"));

var _history = _interopRequireDefault(require("./store/history"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var App = /*#__PURE__*/function () {
  function App(element) {
    _classCallCheck(this, App);

    this.element = element;
    this.todoListInstance = null;
    this.historyInstance = null;
    this.addTodoInstance = null;
    this.editTodoInstance = null;
  }

  _createClass(App, [{
    key: "handleDom",
    value: function handleDom() {
      var contentElement = document.getElementById("content");
      var addTodoElement = document.getElementById("myModal");
      var editTodoElement = document.getElementById("modalEdit");

      if (!this.historyInstance) {
        this.historyInstance = new _History.default(contentElement);
      }

      if (!this.todoListInstance) {
        this.todoListInstance = new _Todolist.default(contentElement);
      }

      if (!this.addTodoInstance) {
        this.addTodoInstance = new _AddTodo.default(addTodoElement);
      }

      if (!this.editTodoInstance) {
        this.editTodoInstance = new _EditTodo.default(editTodoElement);
      }

      switch (_history.default.getState().url) {
        case "/":
          this.todoListInstance.init();
          this.addTodoInstance.init();
          this.editTodoInstance.init();
          break;

        case "/history":
          this.historyInstance.init();
          break;

        default:
          this.todoListInstance.init();
          this.addTodoInstance.init();
          this.editTodoInstance.init();
          break;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return "\n    <main class=\"content\" id=\"content\">\n     \n    </main>\n    <div class=\"modal fade todo__modal\" id=\"myModal\"></div>\n    <div class=\"modal fade todo__modal\" id=\"modalEdit\"></div>\n    ";
    }
  }, {
    key: "init",
    value: function init() {
      this.element.innerHTML = this.render();
      this.handleDom();
    }
  }]);

  return App;
}();

var appElement = document.getElementById("root");
var appInstance = new App(appElement);
appInstance.init();
},{"./containers/Todolist":"src/containers/Todolist/index.js","./containers/History":"src/containers/History/index.js","./containers/Modal/AddTodo":"src/containers/Modal/AddTodo.js","./containers/Modal/EditTodo":"src/containers/Modal/EditTodo.js","./store/history":"src/store/history.js"}],"C:/Users/tung1/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "14799" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/tung1/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map
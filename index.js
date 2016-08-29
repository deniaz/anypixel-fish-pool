(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/license-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the license.
 */

'use strict';

module.exports = require('./lib/anypixel');

},{"./lib/anypixel":2}],2:[function(require,module,exports){
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/license-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the license.
 */

'use strict';

module.exports.config = require('./config');
module.exports.canvas = require('./canvas');
module.exports.events = require('./events');
module.exports.events.setStateListenerOn(document);

},{"./canvas":3,"./config":4,"./events":5}],3:[function(require,module,exports){
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/license-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the license.
 */

'use strict';

var config = require('./config');
var canvas = module.exports = {};

var domCanvas = document.getElementById(config.canvasId);

domCanvas.width = config.width;
domCanvas.height = config.height;

/**
 * Returns the 2D canvas context
 */
canvas.getContext2D = function getContext2D() {
	return domCanvas.getContext('2d');
}

/**
 * Returns the 3D canvas context
 */
canvas.getContext3D = function getContext3D() {
	return domCanvas.getContext('webgl', {preserveDrawingBuffer: true});
}
},{"./config":4}],4:[function(require,module,exports){
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/license-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the license.
 */

'use strict';

/**
 * Expose some configuration data. The user can overwrite this if their setup is different.
 */
var config = module.exports = {};

config.canvasId = 'button-canvas';
config.width = 140;
config.height = 42;
},{}],5:[function(require,module,exports){
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/license-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the license.
 */

'use strict';

/**
 * Listen for the 'buttonStates' event from a DOM target and emit onButtonDown / Up events
 * depending on the reported button state
 */
var events = module.exports = {};

events.setStateListenerOn = function setStateListenerOn(target) {
		
	if (target.anypixelListener) {
		return;
	}
	
	target.anypixelListener = true;

	target.addEventListener('buttonStates', function(data) {
		data.detail.forEach(function(button) {
			var x = button.p.x;
			var y = button.p.y;
			var state = button.s;
			var event = state === 1 ? 'onButtonDown' : 'onButtonUp';
			var key = x + ':' + y;

			if (state === 1) {
				events.pushedButtons[key] = {x: x, y: y};
			} else {
				delete events.pushedButtons[key];
			}
			
			target.dispatchEvent(new CustomEvent(event, {detail: {x: x, y: y}}));
		});
	});
}

/**
 * A map of currently-pushed buttons, provided for utility
 */
events.pushedButtons = {};

},{}],6:[function(require,module,exports){
'use strict';

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var anypixel = require('anypixel');
var ctx = anypixel.canvas.getContext2D();


var game = new _game2.default(ctx);

document.addEventListener('onButtonDown', function (ev) {});
document.addEventListener('onButtonUp', function (ev) {});

},{"./game":8,"anypixel":1}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var colors = ['#0099CC', '#BADA55', '#AA0000'];

var DIRECTION = {
  UP: -1,
  DOWN: 1
};

var Fish = function () {
  function Fish(ctx) {
    _classCallCheck(this, Fish);

    this.ctx = ctx;

    this.id = Math.floor(Math.random() * 256) + 1;

    this.active = true;
    this.age = Math.floor(Math.random() * 128);
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.width = 4;
    this.height = 2;

    this.direction = Math.random() < 0.5 ? DIRECTION.UP : DIRECTION.DOWN;

    this.coords = {
      x: Math.floor(Math.random() * (ctx.canvas.width - this.width)),
      y: Math.floor(Math.random() * (ctx.canvas.height - this.height))
    };

    this.velocity = {
      x: 2,
      y: 1
    };
  }

  _createClass(Fish, [{
    key: 'isActive',
    value: function isActive() {
      return this.active;
    }
  }, {
    key: 'isInBounds',
    value: function isInBounds() {
      var _coords = this.coords;
      var x = _coords.x;
      var y = _coords.y;
      var _ctx$canvas = this.ctx.canvas;
      var width = _ctx$canvas.width;
      var height = _ctx$canvas.height;

      return x >= 0 && x <= width - this.width && y >= 0 && y <= height - this.height;
    }
  }, {
    key: 'hitsVerticalBorder',
    value: function hitsVerticalBorder() {
      var _coords2 = this.coords;
      var x = _coords2.x;
      var y = _coords2.y;
      var _ctx$canvas2 = this.ctx.canvas;
      var width = _ctx$canvas2.width;
      var height = _ctx$canvas2.height;

      return x <= 0 || x >= width - this.width;
    }
  }, {
    key: 'hitsHorizontalBorder',
    value: function hitsHorizontalBorder() {
      var _coords3 = this.coords;
      var x = _coords3.x;
      var y = _coords3.y;
      var _ctx$canvas3 = this.ctx.canvas;
      var width = _ctx$canvas3.width;
      var height = _ctx$canvas3.height;

      return y <= 0 || y >= height - this.height;
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.coords.x, this.coords.y, this.width, this.height);
    }
  }, {
    key: 'update',
    value: function update() {
      this.coords.x = this.coords.x + this.velocity.x;
      this.age++;

      if (this.hitsVerticalBorder()) {
        this.velocity.x = this.velocity.x * -1;
      }

      this.velocity.y = 0.25 * Math.sin(this.age * Math.PI / 64);

      if (this.hitsHorizontalBorder()) {
        this.coords.y = this.coords.y < 1 ? this.height : this.ctx.canvas.height - this.height * 2;

        if (this.coords.y > 1 && this.velocity.y < 0) {
          this.velocity.y = this.velocity.y * -1;
          console.info(this.coords.y, this.velocity.y);
        }
      } else {
        this.coords.y = this.coords.y + this.velocity.y;
      }
      // if (!this.isInBounds()) {
      //   console.info('Not in bound');
      //
      //
      //   // this.coords.x = this.coords.x + this.velocity.x*3;
      //   // this.coords.y = this.coords.y + this.velocity.y*3;
      // }

      // this.active = this.active && this.isInBounds();
    }
  }]);

  return Fish;
}();

exports.default = Fish;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fish = require('./fish');

var _fish2 = _interopRequireDefault(_fish);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FPS = 15;
var MAX_FISHES = 25;
var FONT_STYLE = '18px Arial';

var Game = function () {
  function Game(ctx) {
    _classCallCheck(this, Game);

    this.ctx = ctx;
    this.ctx.font = FONT_STYLE;

    this.fishes = [];

    for (var i = 0; i < MAX_FISHES; i++) {
      this.fishes.push(new _fish2.default(this.ctx));
    }

    this.startLoop();
  }

  _createClass(Game, [{
    key: 'startLoop',
    value: function startLoop() {
      var _this = this;

      this.interval = setInterval(function () {
        _this.render();
      }, 1000 / FPS);
    }
  }, {
    key: 'render',
    value: function render() {
      var _ctx$canvas = this.ctx.canvas;
      var width = _ctx$canvas.width;
      var height = _ctx$canvas.height;

      this.ctx.clearRect(0, 0, width, height);

      this.fishes.forEach(function (fish) {
        return fish.update();
      });
      this.fishes = this.fishes.filter(function (fish) {
        return fish.isActive();
      });

      if (this.fishes.length < MAX_FISHES) {
        this.fishes.push(new _fish2.default(this.ctx));
      }

      this.fishes.forEach(function (fish) {
        return fish.draw();
      });
    }
  }]);

  return Game;
}();

exports.default = Game;

},{"./fish":7}]},{},[6]);

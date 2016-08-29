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

var anypixel = require('anypixel');
var ctx = anypixel.canvas.getContext2D();
ctx.font = 'bold 18px Arial';

var text = 'Digital. High Five.';
var textLength = ctx.measureText(text).width + 6;
var brand = 'Namics.';
var brandLength = ctx.measureText(brand).width;

var textX = ctx.canvas.width;
var textY = ctx.canvas.height / 2 + 6;

setInterval(function () {
  ctx.fillStyle = '#D21E1E';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = '#000000';
  ctx.fillText(text, textX--, textY);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(brand, textLength + textX, textY);

  if (textX < (textLength + brandLength) * -1) {
    textX = ctx.canvas.width;
  }
  // console.info(textX, textLength);
}, 1000 / 30);

},{"anypixel":1}]},{},[6]);

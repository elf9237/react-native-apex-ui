
'use strict';

import merge from 'lodash/merge';
var baseTheme = require('./baseTheme');

function getUiTheme(uiTheme, ...more) {
	return merge(baseTheme, uiTheme, ...more);
}

module.exports = getUiTheme;

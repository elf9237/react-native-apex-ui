
'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
var Button = require('./Button');
var TouchableRipple = require('../TouchableRipple');

const {StyleSheet, View, Text,} = ReactNative;

function RippleButton(props) {
	return (
		<Button 
			{...props} 
			touchableComponent={TouchableRipple} 
		/>
	);
}

module.exports = RippleButton;

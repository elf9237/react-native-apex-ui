
'use strict';

const ReactNativeApexUI = {
	//events
	WindowEventEmitter: require('./EventEmitter/WindowEventEmitter'),

	//tools
	UiThemeProvider: require('./styles/UiThemeProvider'),
	getUiTheme: require('./styles/getUiTheme'),
	PlatformStyleSheet: require('./utils/PlatformStyleSheet'),

	//componets
	VectorIcon: require('./VectorIcon'),
	List: require('./List'),
	Button: require('./Button'),
	AppHeader: require('./AppHeader'),
	Paper: require('./Paper'),
	LayerContainer: require('./Layer/LayerContainer'),
	Popover: require('./Popover'),
	Dialog: require('./Dialog'),
	Sideboard: require('./Sideboard'),
	HeaderDrawer: require('./HeaderDrawer'),

	PureListView: require('./PureListView'),
	ViewPager: require('./ViewPager'),
	Carousel: require('./Carousel'),
	StaticContainer: require('./StaticContainer'),

	TouchableRipple: require('./TouchableRipple'),
	RippleButton: require('./Button/RippleButton'),
	Toast: require('./Toast'),
	Tag: require('./Tag'),
	Toptip: require('./Toptip'),
	Tooltip: require('./Tooltip'),
	
	
	
};

module.exports = ReactNativeApexUI;
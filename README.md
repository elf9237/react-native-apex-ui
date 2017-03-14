
# ![logo](https://raw.githubusercontent.com/glinjy/react-native-apex-ui/master/img/logo.png) react-native-apex-ui

A react native cross platform ui kit.

![ui](https://raw.githubusercontent.com/glinjy/react-native-apex-ui/master/img/ui.png)

### include 
* Button
* Dialog
* Drawer
* ActionSheet
* Toast
* Tooltip 
* Carousel
* Popover
* Tag
* TouchableRipple
* ...

### Installation

* step 1
```
npm i react-native-apex-ui --save
```

* step 2
```
react-native link react-native-vector-icons
```

### Get Started

#### `UiThemeProvider`
At the beginning, apex ui components require a `UiThemeProvider` to be provided. You can’t use any components without wrapping the root component in `<UiThemeProvider>`:

```js
import {UiThemeProvider} from 'react-native-apex-ui';

const App = () => (
  <UiThemeProvider>
    <Root />
  </UiThemeProvider>
);
```

Following that, you can use any of the components:

```js
import {RippleButton, Toast} from 'react-native-apex-ui';

class SimpleToastExample extends Component {
	state = {
		open: false,
	};

	handleRequestOpen = () => {
		this.setState({
			open: true,
		});
	}

	handleRequestClose = () => {
		this.setState({
			open: false,
		});
	};

	render() {
		return (
			<View>
				<RippleButton 
					caption='BUTTON'
					backgroundColor='#2c8cff'
					captionColor='#fff'
					onPress={this.handleRequestOpen}
				/>
				<Toast 
					open={this.state.open}
					message='Hello toast!'
					onRequestClose={this.handleRequestClose}
				/>
			</View>
		);
	}
}
```

### Examples

check out [RNApexUIExample](https://github.com/glinjy/RNApexUIExample/)

### Thanks

* [apexsoft](http://apexsoft.com.cn/)
* [material-ui](http://www.material-ui.com/)

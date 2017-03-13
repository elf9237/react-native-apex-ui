# <img src='https://github.com/glinjy/react-native-apex-ui/img/logo.png' height='60'> react-native-apex-ui

A React Native Cross platform UI kit.

![ui](https://github.com/glinjy/react-native-apex-ui/img/ui.png)

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

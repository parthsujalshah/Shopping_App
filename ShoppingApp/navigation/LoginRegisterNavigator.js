import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ShopScreen from '../screens/Shop';

const LoginRegisterNavigator = createStackNavigator({
    Login: {screen: LoginScreen},
    Register: {screen: RegisterScreen},
    Shop: {screen: ShopScreen}
}, {
    headerMode: 'none'
});

export default createAppContainer(LoginRegisterNavigator);
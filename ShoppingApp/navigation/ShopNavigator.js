import {createAppContainer} from 'react-navigation'
import {createDrawerNavigator} from 'react-navigation-drawer'

import ShopScreen from '../screens/Shop';
import CartScreen from '../screens/Cart';
import DetailsScreen from '../screens/Details';
import EditProductsScreen from '../screens/EditProduct';
import OrdersScreen from '../screens/Orders';

const ShopNavigator = createDrawerNavigator({
    Shop: {screen: ShopScreen},
    Cart: {screen: CartScreen},
    Details: {screen: DetailsScreen},
    EditProducts: {screen: EditProductsScreen},
    Orders: {screen: OrdersScreen}
}, {
    headerMode: 'none'
});

export default createAppContainer(ShopNavigator);
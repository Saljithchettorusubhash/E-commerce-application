import AuthRouter from '../routes/auth.route.js';
import UserRouter from '../routes/user.route.js';
import addressRoute from '../routes/address.route.js';
import paymentRoute from '../routes/payement.route.js';
import productCategoryRoute from '../routes/ProductCategory.route.js';
import productRoute from '../routes/product.route.js'
import variationRoute from '../routes/variation.route.js'
import variationOption from '../routes/variationOption.route.js'
import productConfigurationRoute from '../routes/productConfiguration.route.js'
import ShoopingCartRoute from '../routes/ShoppingCart.route.js'
import orderRoute  from '../routes/order.route.js';
import discountRoute  from '../routes/discountCode.route.js';
import shippingMethodRoute  from '../routes/shippingMethod.route.js';
import orderStausHistoryRoute from '../routes/orderStatusHistory.route.js';



class RoutesLoader  {
    static initRoutes(app, version) {
        console.log(`routes loaded: ${version}`);
        app.use(`/api/${version}/auth`, AuthRouter);
        app.use(`/api/${version}/users`,UserRouter);
        app.use(`/api/${version}/address`,addressRoute);
        app.use(`/api/${version}/payment`,paymentRoute);
        app.use(`/api/${version}/product-category`,productCategoryRoute);
        app.use(`/api/${version}/product`,productRoute);
        app.use(`/api/${version}/variation`,variationRoute);
        app.use(`/api/${version}/variation-option`,variationOption);
        app.use(`/api/${version}/product-configuration`,productConfigurationRoute);
        app.use(`/api/${version}/shopping-cart`,ShoopingCartRoute);
        app.use(`/api/${version}/order`,orderRoute);
        app.use(`/api/${version}/discount`,discountRoute);
        app.use(`/api/${version}/shipping-method`,shippingMethodRoute);
        app.use(`/api/${version}/order-status-history`,orderStausHistoryRoute);
    }
}

export { RoutesLoader };

var home = require('../app/controllers/home');
var admin = require('../app/controllers/admin');
var order = require('../app/controllers/order');


module.exports = function (app, passport) {
    app.get('/', home.home);
    app.get('/admin/users', admin.users);
    app.get('/admin/orders', admin.orders);
    app.get('/admin/users/orders', admin.users);

    app.post('/order/create/', order.create);
    app.get('/order/checkout/', order.checkout);
    app.get('/order/success/', order.success);
    app.get('/order/failed/', order.failed);
}

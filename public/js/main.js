'use strict';

var addUser = require('./order');
$(function(){
    $('#checkout-form').on('submit', addUser.handleFormSubmit);
});
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var addUser = require('./order');
$(function(){
    $('#checkout-form').on('submit', addUser.handleFormSubmit);
});
},{"./order":2}],2:[function(require,module,exports){
'user strict';

var handleFormSubmit = function handleFormSubmit(e) {
    e.preventDefault();
    console.log("asd");
    var formData = {};
    $('input', this).each(function () {
        formData[$(this).attr('name')] = $(this).val();
    });
    formData.country = $('select[name="country"] option:selected').val();
    $.ajax({
            type: "POST",
            url: "http://localhost:3001/order/create",
            data: formData
        }
    ).then(function (response) {
        console.log(response);
        alert("Success! You successfully added an order")
        document.getElementById("checkout-form").reset();

    })
};

exports.handleFormSubmit = handleFormSubmit;
},{}]},{},[1]);

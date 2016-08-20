'user strict';

var handleFormSubmit = function handleFormSubmit(e) {
    e.preventDefault();
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
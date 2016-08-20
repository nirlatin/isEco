var _ = require("underscore");

module.exports = class PrivateDetails {

    constructor(firstName, lastName, email, country) {
        this.country = null;
        this.firstName = null;
        this.lastName = null;

        this._setName(firstName, lastName);
        this._setEmail(email);
        this._setCountry(country);
    }

    _setName(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.name = this.firstName + " " + this.lastName;
    }

    _setEmail(email) {
        this.email = email;
    }

    _setCountry(country) {
        if (!PrivateDetails.isCountryAllow(country))
            throw new Error("COUNTRY_NOT_ALLOW", "country not allow");
        this.country = country;
    }

    static getCountries() {
        return [{key: "ISRAEL", value: "Israel"}, {key: "SINGAPORE", value: "Singapore"}];
    }

    static isCountryAllow(reqCountry) {
        var countryFound = false;
        var countries = this.getCountries();
        countries.forEach(function (country) {
            console.log(reqCountry)
            console.log(country.key)
            if (reqCountry == country.key)
                countryFound = true;

        })
        return countryFound;
    }

}

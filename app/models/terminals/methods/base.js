module.exports = class base {

    constructor(enforcer) {
        if (new.target === base) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        if (this.init === undefined) {
            throw new TypeError(" insert Must override method");
        }
        if (this.request === undefined) {
            throw new TypeError(" insert Must override method");
        }
        if (this.create === undefined) {
            throw new TypeError(" insert Must override method");
        }
        if (this.success === undefined) {
            throw new TypeError(" insert Must override method");
        }
        if (this.failed === undefined) {
            throw new TypeError(" insert Must override method");
        }

        if (this.validate === undefined) {
            throw new TypeError(" insert Must override method");
        }

    }
}



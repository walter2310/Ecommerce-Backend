
class ValidationUserError extends Error {
    constructor(message) {
        super(message)
        this.name = 'ValidationUserError'
    };
};

class ConnectionError extends Error {
    constructor(message) {
        super(message)
        this.name = 'ConnectionError'
    };
};

class ValidationFieldError extends Error {
    constructor(message) {
        super(message)
        this.name = 'ValidationFieldError'
    };
};

class PaymentTransitionError extends Error {
    constructor(message) {
        super(message)
        this.name = 'PaymentTransitionError'
    };
};

module.exports = { 
    ValidationUserError,
    ConnectionError,
    ValidationFieldError,
    PaymentTransitionError
}
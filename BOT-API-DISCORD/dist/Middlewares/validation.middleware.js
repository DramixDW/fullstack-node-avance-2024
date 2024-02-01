"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const ValidationMiddleware = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    const errors = result.array();
    if (errors.length > 0) {
        // bad request
        res.status(400);
        return res.send({
            errors
        });
    }
    // on passe à suite
    next();
};
exports.ValidationMiddleware = ValidationMiddleware;

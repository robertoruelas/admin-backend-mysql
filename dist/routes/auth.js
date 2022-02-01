"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const router = (0, express_1.Router)();
router.get('/', auth_1.getToken);
router.post('/', auth_1.postLogin);
exports.default = router;
//# sourceMappingURL=auth.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('encuestas', 'sRif', 'GXq5z84VCc6@HC&%admink^fSYDw*jcgE@=9G7rifr&=4b=%kEx6L*BEa', {
    host: '45.55.16.27',
    dialect: 'mysql',
    //logging: false
});
exports.default = db;
//# sourceMappingURL=connection.js.map
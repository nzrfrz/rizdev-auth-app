"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomColorGenerator = void 0;
const randomColorGenerator = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
};
exports.randomColorGenerator = randomColorGenerator;
//# sourceMappingURL=randomColorGenerator.js.map
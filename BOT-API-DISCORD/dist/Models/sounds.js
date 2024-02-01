"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sound = void 0;
const typeorm_1 = require("typeorm");
const category_1 = require("./category");
let Sound = class Sound {
};
exports.Sound = Sound;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Sound.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 64,
        unique: true
    }),
    __metadata("design:type", String)
], Sound.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 260
    }),
    __metadata("design:type", String)
], Sound.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_1.Category, (cat) => cat.sounds),
    __metadata("design:type", category_1.Category)
], Sound.prototype, "category", void 0);
exports.Sound = Sound = __decorate([
    (0, typeorm_1.Entity)()
], Sound);

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("@nestjs-modules/ioredis");
const ioredis_2 = require("ioredis");
const lodash_1 = require("lodash");
let AppService = class AppService {
    constructor(redis) {
        this.redis = redis;
        this.key = 'nuo.lei.redis.key';
    }
    async addScore(request) {
        return this.redis.zadd(this.key, request.score, request.name);
    }
    async getScoreList() {
        const res = await this.redis.zrevrange(this.key, 0, 200, 'WITHSCORES');
        const data = (0, lodash_1.chunk)(res, 2);
        return data.map(([name, score]) => {
            return {
                name,
                score: parseInt(score),
            };
        });
    }
    async getRank(name) {
        const res = await this.redis.zrevrank(this.key, name);
        console.log(res);
        return res;
    }
    async getScore(name) {
        const res = await this.redis.zscore(this.key, name);
        console.log(res);
        return {
            name,
            score: Math.floor(Number(res)),
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [ioredis_2.default])
], AppService);
//# sourceMappingURL=app.service.js.map
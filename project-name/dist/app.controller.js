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
exports.AppController = void 0;
const app_service_1 = require("./app.service");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const socket_client_1 = require("./socket-module/socket.client");
let AppController = class AppController {
    constructor(appService, socketClient) {
        this.appService = appService;
        this.socketClient = socketClient;
    }
    async addScore(params) {
        console.log(`add score ${JSON.stringify(params)}`);
        const res = await this.appService.addScore(params);
        const allScore = await this.appService.getScoreList();
        this.socketClient.server.emit('getScoreList', allScore);
        allScore.map((item) => {
            this.appService.getRank(item.name).then((data) => {
                console.log(`getRank_${item.name}`);
                this.socketClient.server.emit(`getRank_${item.name}`, data);
            });
        });
        return res;
    }
    async getScoreList(client) {
        console.log(123);
        client.emit('getScoreList');
        return (await this.appService.getScoreList());
    }
    async getScore(name) {
        console.log(`get score ${JSON.stringify(name)}`);
        return await this.appService.getScore(name);
    }
    async getRank(name) {
        console.log(`get rank ${JSON.stringify(name)}`);
        return this.appService.getRank(name);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "addScore", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getScoreList", null);
__decorate([
    (0, common_1.Get)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getScore", null);
__decorate([
    (0, common_1.Get)(':name/rank'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getRank", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('score'),
    __metadata("design:paramtypes", [app_service_1.AppService,
        socket_client_1.SocketClient])
], AppController);
//# sourceMappingURL=app.controller.js.map
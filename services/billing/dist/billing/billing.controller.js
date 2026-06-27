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
exports.BillingController = void 0;
const common_1 = require("@nestjs/common");
const billing_service_1 = require("./billing.service");
const create_invoice_dto_1 = require("./dto/create-invoice.dto");
const process_payment_dto_1 = require("./dto/process-payment.dto");
const swagger_1 = require("@nestjs/swagger");
let BillingController = class BillingController {
    constructor(billingService) {
        this.billingService = billingService;
    }
    async createInvoice(createInvoiceDto) {
        return this.billingService.createInvoice(createInvoiceDto.patientId, createInvoiceDto.doctorId, createInvoiceDto.appointmentId, createInvoiceDto.amount, createInvoiceDto.description);
    }
    async getInvoice(invoiceId) {
        return this.billingService.getInvoice(invoiceId);
    }
    async getPatientInvoices(patientId) {
        return this.billingService.getPatientInvoices(patientId);
    }
    async issueInvoice(invoiceId) {
        return this.billingService.issueInvoice(invoiceId);
    }
    async recordPayment(invoiceId, processPaymentDto) {
        return this.billingService.recordPayment(invoiceId, processPaymentDto.amount, processPaymentDto.method, processPaymentDto.transactionId);
    }
    async getWallet(userId) {
        return this.billingService.getWallet(userId);
    }
    async addToWallet(userId, amount) {
        return this.billingService.addToWallet(userId, amount);
    }
    async deductFromWallet(userId, amount) {
        return this.billingService.deductFromWallet(userId, amount);
    }
    async getPaymentHistory(patientId) {
        return this.billingService.getPaymentHistory(patientId);
    }
};
exports.BillingController = BillingController;
__decorate([
    (0, common_1.Post)("invoices"),
    (0, swagger_1.ApiOperation)({ summary: "Create a new invoice" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Invoice created successfully" }),
    (0, swagger_1.ApiBody)({ type: create_invoice_dto_1.CreateInvoiceDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invoice_dto_1.CreateInvoiceDto]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Get)("invoices/:invoiceId"),
    (0, swagger_1.ApiOperation)({ summary: "Get invoice by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Invoice details" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Invoice not found" }),
    __param(0, (0, common_1.Param)("invoiceId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "getInvoice", null);
__decorate([
    (0, common_1.Get)("patients/:patientId/invoices"),
    (0, swagger_1.ApiOperation)({ summary: "Get all invoices for a patient" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of invoices" }),
    __param(0, (0, common_1.Param)("patientId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "getPatientInvoices", null);
__decorate([
    (0, common_1.Put)("invoices/:invoiceId/issue"),
    (0, swagger_1.ApiOperation)({ summary: "Issue a draft invoice" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Invoice issued successfully" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Only draft invoices can be issued" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Invoice not found" }),
    __param(0, (0, common_1.Param)("invoiceId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "issueInvoice", null);
__decorate([
    (0, common_1.Post)("invoices/:invoiceId/payments"),
    (0, swagger_1.ApiOperation)({ summary: "Process a payment for an invoice" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Payment processed successfully" }),
    (0, swagger_1.ApiBody)({ type: process_payment_dto_1.ProcessPaymentDto }),
    __param(0, (0, common_1.Param)("invoiceId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, process_payment_dto_1.ProcessPaymentDto]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "recordPayment", null);
__decorate([
    (0, common_1.Get)("wallets/:userId"),
    (0, swagger_1.ApiOperation)({ summary: "Get user wallet" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Wallet details" }),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "getWallet", null);
__decorate([
    (0, common_1.Post)("wallets/:userId/add"),
    (0, swagger_1.ApiOperation)({ summary: "Add funds to wallet" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Funds added successfully" }),
    (0, swagger_1.ApiBody)({ schema: { properties: { amount: { type: "number" } } } }),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Body)("amount")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "addToWallet", null);
__decorate([
    (0, common_1.Post)("wallets/:userId/deduct"),
    (0, swagger_1.ApiOperation)({ summary: "Deduct funds from wallet" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Funds deducted successfully" }),
    (0, swagger_1.ApiBody)({ schema: { properties: { amount: { type: "number" } } } }),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Body)("amount")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "deductFromWallet", null);
__decorate([
    (0, common_1.Get)("patients/:patientId/payments"),
    (0, swagger_1.ApiOperation)({ summary: "Get payment history for a patient" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of payments" }),
    __param(0, (0, common_1.Param)("patientId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "getPaymentHistory", null);
exports.BillingController = BillingController = __decorate([
    (0, swagger_1.ApiTags)("billing"),
    (0, common_1.Controller)("billing"),
    __metadata("design:paramtypes", [billing_service_1.BillingService])
], BillingController);
//# sourceMappingURL=billing.controller.js.map
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
var BillingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const billing_entity_1 = require("./entities/billing.entity");
let BillingService = BillingService_1 = class BillingService {
    constructor(invoiceRepository, paymentRepository, walletRepository) {
        this.invoiceRepository = invoiceRepository;
        this.paymentRepository = paymentRepository;
        this.walletRepository = walletRepository;
        this.logger = new common_1.Logger(BillingService_1.name);
    }
    async createInvoice(patientId, doctorId, appointmentId, amount, description) {
        try {
            const invoiceNumber = `INV-${Date.now()}`;
            const tax = amount * 0.18;
            const totalAmount = amount + tax;
            const invoice = this.invoiceRepository.create({
                patientId,
                doctorId,
                appointmentId,
                invoiceNumber,
                amount,
                tax,
                totalAmount,
                description,
                status: billing_entity_1.InvoiceStatus.DRAFT,
                lineItems: [
                    {
                        description: "Consultation Fee",
                        quantity: 1,
                        unitPrice: amount,
                        amount,
                    },
                ],
            });
            return await this.invoiceRepository.save(invoice);
        }
        catch (error) {
            this.logger.error(`Error creating invoice: ${error.message}`);
            throw error;
        }
    }
    async getInvoice(invoiceId) {
        const invoice = await this.invoiceRepository.findOne({
            where: { id: invoiceId },
        });
        if (!invoice) {
            throw new common_1.NotFoundException("Invoice not found");
        }
        return invoice;
    }
    async getPatientInvoices(patientId) {
        return this.invoiceRepository.find({
            where: { patientId },
            order: { createdAt: "DESC" },
        });
    }
    async issueInvoice(invoiceId) {
        const invoice = await this.invoiceRepository.findOne({
            where: { id: invoiceId },
        });
        if (!invoice) {
            throw new common_1.NotFoundException("Invoice not found");
        }
        if (invoice.status !== billing_entity_1.InvoiceStatus.DRAFT) {
            throw new common_1.BadRequestException("Only draft invoices can be issued");
        }
        invoice.status = billing_entity_1.InvoiceStatus.ISSUED;
        invoice.issueDate = new Date();
        invoice.dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        return await this.invoiceRepository.save(invoice);
    }
    async recordPayment(invoiceId, amount, method, transactionId) {
        const invoice = await this.invoiceRepository.findOne({
            where: { id: invoiceId },
        });
        if (!invoice) {
            throw new common_1.NotFoundException("Invoice not found");
        }
        const payment = this.paymentRepository.create({
            invoiceId,
            patientId: invoice.patientId,
            amount,
            method,
            transactionId,
            status: billing_entity_1.PaymentStatus.PROCESSING,
        });
        const saved = await this.paymentRepository.save(payment);
        saved.status = billing_entity_1.PaymentStatus.COMPLETED;
        saved.processedAt = new Date();
        await this.paymentRepository.save(saved);
        invoice.status = billing_entity_1.InvoiceStatus.PAID;
        invoice.paidDate = new Date();
        await this.invoiceRepository.save(invoice);
        return saved;
    }
    async getWallet(userId) {
        let wallet = await this.walletRepository.findOne({
            where: { userId },
        });
        if (!wallet) {
            wallet = this.walletRepository.create({ userId, balance: 0 });
            wallet = await this.walletRepository.save(wallet);
        }
        return wallet;
    }
    async addToWallet(userId, amount) {
        const wallet = await this.getWallet(userId);
        wallet.balance = Number((Number(wallet.balance) + amount).toFixed(2));
        wallet.transactionCount += 1;
        wallet.lastTransactionAt = new Date();
        return await this.walletRepository.save(wallet);
    }
    async deductFromWallet(userId, amount) {
        const wallet = await this.getWallet(userId);
        if (Number(wallet.balance) < amount) {
            throw new common_1.BadRequestException("Insufficient wallet balance");
        }
        wallet.balance = Number((Number(wallet.balance) - amount).toFixed(2));
        wallet.transactionCount += 1;
        wallet.lastTransactionAt = new Date();
        return await this.walletRepository.save(wallet);
    }
    async getPaymentHistory(patientId) {
        return this.paymentRepository.find({
            where: { patientId },
            order: { createdAt: "DESC" },
        });
    }
};
exports.BillingService = BillingService;
exports.BillingService = BillingService = BillingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(billing_entity_1.InvoiceEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(billing_entity_1.PaymentEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(billing_entity_1.WalletEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BillingService);
//# sourceMappingURL=billing.service.js.map
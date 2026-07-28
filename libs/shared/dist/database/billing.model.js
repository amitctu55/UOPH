"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletTransactionSchema = exports.WalletTransaction = exports.WalletSchema = exports.Wallet = exports.PaymentSchema = exports.Payment = exports.InvoiceSchema = exports.Invoice = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = __importStar(require("mongoose"));
let Invoice = class Invoice {
};
exports.Invoice = Invoice;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose.Types.ObjectId)
], Invoice.prototype, "patientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }),
    __metadata("design:type", mongoose.Types.ObjectId)
], Invoice.prototype, "appointmentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], Invoice.prototype, "billNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Invoice.prototype, "amountSubtotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Invoice.prototype, "taxAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Invoice.prototype, "discountAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Invoice.prototype, "totalAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['unpaid', 'partially_paid', 'paid'],
        default: 'unpaid'
    }),
    __metadata("design:type", String)
], Invoice.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Invoice.prototype, "dueDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Invoice.prototype, "issueDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], Invoice.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], Invoice.prototype, "updatedAt", void 0);
exports.Invoice = Invoice = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: 'bills'
    })
], Invoice);
exports.InvoiceSchema = mongoose_1.SchemaFactory.createForClass(Invoice);
exports.InvoiceSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        const { __v } = ret, rest = __rest(ret, ["__v"]);
        return rest;
    }
});
exports.InvoiceSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret) => {
        const { __v } = ret, rest = __rest(ret, ["__v"]);
        return rest;
    }
});
let Payment = class Payment {
};
exports.Payment = Payment;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', required: true }),
    __metadata("design:type", mongoose.Types.ObjectId)
], Payment.prototype, "billId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Payment.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['credit_card', 'debit_card', 'upi', 'net_banking', 'wallet'],
        required: true
    }),
    __metadata("design:type", String)
], Payment.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, unique: true }),
    __metadata("design:type", String)
], Payment.prototype, "transactionId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['stripe', 'razorpay', 'paypal'],
        required: true
    }),
    __metadata("design:type", String)
], Payment.prototype, "paymentGateway", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    }),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Payment.prototype, "paidAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], Payment.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], Payment.prototype, "updatedAt", void 0);
exports.Payment = Payment = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: 'payments'
    })
], Payment);
exports.PaymentSchema = mongoose_1.SchemaFactory.createForClass(Payment);
exports.PaymentSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        const { __v } = ret, rest = __rest(ret, ["__v"]);
        return rest;
    }
});
exports.PaymentSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret) => {
        const { __v } = ret, rest = __rest(ret, ["__v"]);
        return rest;
    }
});
let Wallet = class Wallet {
    constructor() {
        this.balance = 0;
    }
};
exports.Wallet = Wallet;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }),
    __metadata("design:type", mongoose.Types.ObjectId)
], Wallet.prototype, "patientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, default: 0 }),
    __metadata("design:type", Number)
], Wallet.prototype, "balance", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], Wallet.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], Wallet.prototype, "updatedAt", void 0);
exports.Wallet = Wallet = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: 'patient_wallets'
    })
], Wallet);
exports.WalletSchema = mongoose_1.SchemaFactory.createForClass(Wallet);
exports.WalletSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        const { __v } = ret, rest = __rest(ret, ["__v"]);
        return rest;
    }
});
exports.WalletSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret) => {
        const { __v } = ret, rest = __rest(ret, ["__v"]);
        return rest;
    }
});
let WalletTransaction = class WalletTransaction {
};
exports.WalletTransaction = WalletTransaction;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet', required: true }),
    __metadata("design:type", mongoose.Types.ObjectId)
], WalletTransaction.prototype, "walletId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['credit', 'debit'],
        required: true
    }),
    __metadata("design:type", String)
], WalletTransaction.prototype, "transactionType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], WalletTransaction.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 255 }),
    __metadata("design:type", String)
], WalletTransaction.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }),
    __metadata("design:type", mongoose.Types.ObjectId)
], WalletTransaction.prototype, "relatedPaymentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], WalletTransaction.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], WalletTransaction.prototype, "updatedAt", void 0);
exports.WalletTransaction = WalletTransaction = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: 'wallet_transactions'
    })
], WalletTransaction);
exports.WalletTransactionSchema = mongoose_1.SchemaFactory.createForClass(WalletTransaction);
exports.WalletTransactionSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        const { __v } = ret, rest = __rest(ret, ["__v"]);
        return rest;
    }
});
exports.WalletTransactionSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret) => {
        const { __v } = ret, rest = __rest(ret, ["__v"]);
        return rest;
    }
});
//# sourceMappingURL=billing.model.js.map
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
export type InvoiceDocument = HydratedDocument<Invoice>;
export type PaymentDocument = HydratedDocument<Payment>;
export type WalletDocument = HydratedDocument<Wallet>;
export type WalletTransactionDocument = HydratedDocument<WalletTransaction>;
export declare class Invoice {
    patientId: mongoose.Types.ObjectId;
    appointmentId?: mongoose.Types.ObjectId;
    billNumber: string;
    amountSubtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    status: string;
    dueDate?: Date;
    issueDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const InvoiceSchema: mongoose.Schema<Invoice, mongoose.Model<Invoice, any, any, any, any, any, Invoice>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Invoice, mongoose.Document<unknown, {}, Invoice, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Invoice & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    patientId?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, Invoice, mongoose.Document<unknown, {}, Invoice, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Invoice & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    appointmentId?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId | undefined, Invoice, mongoose.Document<unknown, {}, Invoice, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Invoice & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    billNumber?: mongoose.SchemaDefinitionProperty<string, Invoice, mongoose.Document<unknown, {}, Invoice, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Invoice & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    amountSubtotal?: mongoose.SchemaDefinitionProperty<number, Invoice, mongoose.Document<unknown, {}, Invoice, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Invoice & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    taxAmount?: mongoose.SchemaDefinitionProperty<number, Invoice, mongoose.Document<unknown, {}, Invoice, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Invoice & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    discountAmount?: mongoose.SchemaDefinitionProperty<number, Invoice, mongoose.Document<unknown, {}, Invoice, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Invoice & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    totalAmount?: mongoose.SchemaDefinitionProperty<number, Invoice, mongoose.Document<unknown, {}, Invoice, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Invoice & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: mongoose.SchemaDefinitionProperty<string, Invoice, mongoose.Document<unknown, {}, Invoice, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Invoice & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    dueDate?: mongoose.SchemaDefinitionProperty<Date | undefined, Invoice, mongoose.Document<unknown, {}, Invoice, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Invoice & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    issueDate?: mongoose.SchemaDefinitionProperty<Date | undefined, Invoice, mongoose.Document<unknown, {}, Invoice, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Invoice & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    createdAt?: mongoose.SchemaDefinitionProperty<Date, Invoice, mongoose.Document<unknown, {}, Invoice, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Invoice & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    updatedAt?: mongoose.SchemaDefinitionProperty<Date, Invoice, mongoose.Document<unknown, {}, Invoice, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Invoice & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Invoice>;
export declare class Payment {
    billId: mongoose.Types.ObjectId;
    amount: number;
    paymentMethod: string;
    transactionId?: string;
    paymentGateway: string;
    status: string;
    paidAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const PaymentSchema: mongoose.Schema<Payment, mongoose.Model<Payment, any, any, any, any, any, Payment>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Payment, mongoose.Document<unknown, {}, Payment, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Payment & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    billId?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, Payment, mongoose.Document<unknown, {}, Payment, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Payment & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    amount?: mongoose.SchemaDefinitionProperty<number, Payment, mongoose.Document<unknown, {}, Payment, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Payment & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    paymentMethod?: mongoose.SchemaDefinitionProperty<string, Payment, mongoose.Document<unknown, {}, Payment, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Payment & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    transactionId?: mongoose.SchemaDefinitionProperty<string | undefined, Payment, mongoose.Document<unknown, {}, Payment, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Payment & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    paymentGateway?: mongoose.SchemaDefinitionProperty<string, Payment, mongoose.Document<unknown, {}, Payment, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Payment & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: mongoose.SchemaDefinitionProperty<string, Payment, mongoose.Document<unknown, {}, Payment, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Payment & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    paidAt?: mongoose.SchemaDefinitionProperty<Date | undefined, Payment, mongoose.Document<unknown, {}, Payment, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Payment & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    createdAt?: mongoose.SchemaDefinitionProperty<Date, Payment, mongoose.Document<unknown, {}, Payment, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Payment & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    updatedAt?: mongoose.SchemaDefinitionProperty<Date, Payment, mongoose.Document<unknown, {}, Payment, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Payment & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Payment>;
export declare class Wallet {
    patientId: mongoose.Types.ObjectId;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const WalletSchema: mongoose.Schema<Wallet, mongoose.Model<Wallet, any, any, any, any, any, Wallet>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Wallet, mongoose.Document<unknown, {}, Wallet, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Wallet & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    patientId?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, Wallet, mongoose.Document<unknown, {}, Wallet, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Wallet & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    balance?: mongoose.SchemaDefinitionProperty<number, Wallet, mongoose.Document<unknown, {}, Wallet, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Wallet & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    createdAt?: mongoose.SchemaDefinitionProperty<Date, Wallet, mongoose.Document<unknown, {}, Wallet, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Wallet & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    updatedAt?: mongoose.SchemaDefinitionProperty<Date, Wallet, mongoose.Document<unknown, {}, Wallet, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Wallet & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Wallet>;
export declare class WalletTransaction {
    walletId: mongoose.Types.ObjectId;
    transactionType: string;
    amount: number;
    description?: string;
    relatedPaymentId?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const WalletTransactionSchema: mongoose.Schema<WalletTransaction, mongoose.Model<WalletTransaction, any, any, any, any, any, WalletTransaction>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, WalletTransaction, mongoose.Document<unknown, {}, WalletTransaction, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<WalletTransaction & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    walletId?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, WalletTransaction, mongoose.Document<unknown, {}, WalletTransaction, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<WalletTransaction & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    transactionType?: mongoose.SchemaDefinitionProperty<string, WalletTransaction, mongoose.Document<unknown, {}, WalletTransaction, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<WalletTransaction & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    amount?: mongoose.SchemaDefinitionProperty<number, WalletTransaction, mongoose.Document<unknown, {}, WalletTransaction, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<WalletTransaction & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: mongoose.SchemaDefinitionProperty<string | undefined, WalletTransaction, mongoose.Document<unknown, {}, WalletTransaction, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<WalletTransaction & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    relatedPaymentId?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId | undefined, WalletTransaction, mongoose.Document<unknown, {}, WalletTransaction, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<WalletTransaction & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    createdAt?: mongoose.SchemaDefinitionProperty<Date, WalletTransaction, mongoose.Document<unknown, {}, WalletTransaction, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<WalletTransaction & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    updatedAt?: mongoose.SchemaDefinitionProperty<Date, WalletTransaction, mongoose.Document<unknown, {}, WalletTransaction, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<WalletTransaction & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, WalletTransaction>;

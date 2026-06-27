import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { BillingService } from "./billing.service";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";
import { ProcessPaymentDto } from "./dto/process-payment.dto";
import { InvoiceEntity } from "./entities/billing.entity";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";

@ApiTags("billing")
@Controller("billing")
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post("invoices")
  @ApiOperation({ summary: "Create a new invoice" })
  @ApiResponse({ status: 201, description: "Invoice created successfully" })
  @ApiBody({ type: CreateInvoiceDto })
  async createInvoice(@Body() createInvoiceDto: CreateInvoiceDto): Promise<InvoiceEntity> {
    return this.billingService.createInvoice(
      createInvoiceDto.patientId,
      createInvoiceDto.doctorId,
      createInvoiceDto.appointmentId,
      createInvoiceDto.amount,
      createInvoiceDto.description
    );
  }

  @Get("invoices/:invoiceId")
  @ApiOperation({ summary: "Get invoice by ID" })
  @ApiResponse({ status: 200, description: "Invoice details" })
  @ApiResponse({ status: 404, description: "Invoice not found" })
  async getInvoice(@Param("invoiceId") invoiceId: string): Promise<InvoiceEntity> {
    return this.billingService.getInvoice(invoiceId);
  }

  @Get("patients/:patientId/invoices")
  @ApiOperation({ summary: "Get all invoices for a patient" })
  @ApiResponse({ status: 200, description: "List of invoices" })
  async getPatientInvoices(@Param("patientId") patientId: string): Promise<InvoiceEntity[]> {
    return this.billingService.getPatientInvoices(patientId);
  }

  @Put("invoices/:invoiceId/issue")
  @ApiOperation({ summary: "Issue a draft invoice" })
  @ApiResponse({ status: 200, description: "Invoice issued successfully" })
  @ApiResponse({ status: 400, description: "Only draft invoices can be issued" })
  @ApiResponse({ status: 404, description: "Invoice not found" })
  async issueInvoice(@Param("invoiceId") invoiceId: string): Promise<InvoiceEntity> {
    return this.billingService.issueInvoice(invoiceId);
  }

  @Post("invoices/:invoiceId/payments")
  @ApiOperation({ summary: "Process a payment for an invoice" })
  @ApiResponse({ status: 201, description: "Payment processed successfully" })
  @ApiBody({ type: ProcessPaymentDto })
  async recordPayment(
    @Param("invoiceId") invoiceId: string,
    @Body() processPaymentDto: ProcessPaymentDto
  ): Promise<any> {
    return this.billingService.recordPayment(
      invoiceId,
      processPaymentDto.amount,
      processPaymentDto.method,
      processPaymentDto.transactionId
    );
  }

  @Get("wallets/:userId")
  @ApiOperation({ summary: "Get user wallet" })
  @ApiResponse({ status: 200, description: "Wallet details" })
  async getWallet(@Param("userId") userId: string): Promise<any> {
    return this.billingService.getWallet(userId);
  }

  @Post("wallets/:userId/add")
  @ApiOperation({ summary: "Add funds to wallet" })
  @ApiResponse({ status: 200, description: "Funds added successfully" })
  @ApiBody({ schema: { properties: { amount: { type: "number" } } } })
  async addToWallet(@Param("userId") userId: string, @Body("amount") amount: number): Promise<any> {
    return this.billingService.addToWallet(userId, amount);
  }

  @Post("wallets/:userId/deduct")
  @ApiOperation({ summary: "Deduct funds from wallet" })
  @ApiResponse({ status: 200, description: "Funds deducted successfully" })
  @ApiBody({ schema: { properties: { amount: { type: "number" } } } })
  async deductFromWallet(
    @Param("userId") userId: string,
    @Body("amount") amount: number
  ): Promise<any> {
    return this.billingService.deductFromWallet(userId, amount);
  }

  @Get("patients/:patientId/payments")
  @ApiOperation({ summary: "Get payment history for a patient" })
  @ApiResponse({ status: 200, description: "List of payments" })
  async getPaymentHistory(@Param("patientId") patientId: string): Promise<any[]> {
    return this.billingService.getPaymentHistory(patientId);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IPayment } from './interfaces/payment.interface';
import { CreatePaymentDto, UpdatePaymentDto } from './dto';
import { Payment } from './schemas/payment.schema';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
  ) {}

  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<{ totalPage: number; items: Payment[] }> {
    const { limit, page, filter } = paginationQuery;

    const regerFilter = new RegExp(filter);
    const count = await this.paymentModel
      .find({
        $or: [
          {
            username: regerFilter,
          },
          { lastName: regerFilter },
          { firstName: regerFilter },
        ],
      })
      .countDocuments();

    const items = await this.paymentModel
      .find({
        $or: [
          {
            username: regerFilter,
          },
          { lastName: regerFilter },
          { firstName: regerFilter },
        ],
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ date: 'desc' })
      .exec();

    const totalPage = count / limit;

    return {
      totalPage: totalPage < 1 ? 1 : Math.round(totalPage),
      items: items,
    };
  }

  public async findOne(PaymentId: string): Promise<Payment> {
    const Payment = await this.paymentModel.findById({ _id: PaymentId }).exec();

    if (!Payment) {
      throw new NotFoundException(`Payment #${PaymentId} not found`);
    }

    return Payment;
  }

  public async create(createPaymentDto: CreatePaymentDto): Promise<IPayment> {
    const newPayment = await this.paymentModel.create(createPaymentDto);
    return newPayment;
  }

  public async update(
    PaymentId: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<IPayment> {
    const existingPayment = await this.paymentModel.findByIdAndUpdate(
      { _id: PaymentId },
      updatePaymentDto,
    );

    if (!existingPayment) {
      throw new NotFoundException(`Payment #${PaymentId} not found`);
    }

    return existingPayment;
  }

  public async remove(PaymentId: string): Promise<any> {
    const deletedPayment = await this.paymentModel.findByIdAndRemove(PaymentId);
    return deletedPayment;
  }
}

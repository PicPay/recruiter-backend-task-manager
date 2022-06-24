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

    const totalPage = count / (limit || count);

    return {
      totalPage: totalPage < 1 ? 1 : Math.round(totalPage),
      items: items,
    };
  }

  public async findOne(paymentId: string): Promise<Payment> {
    const payment = await this.paymentModel.findById({ _id: paymentId }).exec();

    if (!payment) {
      throw new NotFoundException(`Payment #${paymentId} not found`);
    }

    return payment;
  }

  public async create(createPaymentDto: CreatePaymentDto): Promise<IPayment> {
    const newPayment = await this.paymentModel.create(createPaymentDto);
    return newPayment;
  }

  public async update(
    paymentId: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<IPayment> {
    const existingPayment = await this.paymentModel.findByIdAndUpdate(
      { _id: paymentId },
      updatePaymentDto,
    );

    if (!existingPayment) {
      throw new NotFoundException(`Payment #${paymentId} not found`);
    }

    return existingPayment;
  }

  public async remove(paymentId: string): Promise<any> {
    const deletedPayment = await this.paymentModel.findByIdAndRemove(paymentId);
    return deletedPayment;
  }
}

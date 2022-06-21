import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  NotFoundException,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, UpdatePaymentDto } from './dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('payments')
@Controller('payments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PaymentsController {
  constructor(private PaymentsService: PaymentsService) {}

  @Get()
  public async getAllPayment(
    @Res() res: Response,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const Payments = await this.PaymentsService.findAll(paginationQuery);
    return res.status(HttpStatus.OK).json(Payments);
  }

  @Get('/:id')
  public async getPayment(
    @Res() res: Response,
    @Param('id') PaymentId: string,
  ) {
    if (!PaymentId) {
      throw new NotFoundException('Payment ID does not exist');
    }

    const Payment = await this.PaymentsService.findOne(PaymentId);

    return res.status(HttpStatus.OK).json(Payment);
  }

  @Post()
  public async addPayment(
    @Res() res: Response,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    try {
      const Payment = await this.PaymentsService.create(createPaymentDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Payment has been created successfully',
        Payment,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Payment not created!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  public async updatePayment(
    @Res() res: Response,
    @Param('id') PaymentId: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    try {
      const Payment = await this.PaymentsService.update(
        PaymentId,
        updatePaymentDto,
      );
      if (!Payment) {
        throw new NotFoundException('Payment does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Payment has been successfully updated',
        Payment,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Payment not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  public async deletePayment(
    @Res() res: Response,
    @Param('id') PaymentId: string,
  ) {
    if (!PaymentId) {
      throw new NotFoundException('Payment ID does not exist');
    }

    const Payment = await this.PaymentsService.remove(PaymentId);

    return res.status(HttpStatus.OK).json({
      message: 'Payment has been deleted',
      Payment,
    });
  }
}

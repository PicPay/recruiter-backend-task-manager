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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('payments')
@Controller('payments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Get()
  @ApiOperation({
    summary: 'Traz os pagamentos. Endpoint protegido.',
  })
  @ApiParam({
    name: 'Query',
    description: 'As queries são para fazer paginação e filtro',
    allowEmptyValue: true,
    examples: {
      a: {
        summary: 'Sem paginação e sem filtro',
        value: {} as PaginationQueryDto,
      },
      b: {
        summary: 'Com paginação',
        value: {
          limit: 10,
          page: 1,
        } as PaginationQueryDto,
      },
      c: {
        summary: 'Com filtro',
        description:
          'O filter permite pesquisar por usuários, sendo os campos username, firstName e lastName do schema CreatePaymentDto e traz ordenado por data de criação.',
        externalValue: 'CreatePaymentDto',
        value: {
          filter: 'cdaveley2w',
        } as PaginationQueryDto,
      },
      d: {
        summary: 'Com filtro e paginação',
        description:
          'O filter permite pesquisar por usuários, sendo os campos username, firstName e lastName do schema CreatePaymentDto e traz ordenado por data de criação.',
        value: {
          filter: 'cdaveley2w',
          limit: 10,
          page: 1,
        } as PaginationQueryDto,
      },
    },
  })
  public async getAllPayment(
    @Res() res: Response,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const payments = await this.paymentsService.findAll(paginationQuery);
    return res.status(HttpStatus.OK).json(payments);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Traz um único pagamento. Endpoint protegido.',
  })
  public async getPayment(
    @Res() res: Response,
    @Param('id') paymentId: string,
  ) {
    if (!paymentId) {
      throw new NotFoundException('Payment ID does not exist');
    }

    const payment = await this.paymentsService.findOne(paymentId);

    return res.status(HttpStatus.OK).json(payment);
  }

  @Post()
  @ApiOperation({
    summary: 'Adiciona um pagamento. Endpoint protegido.',
  })
  public async addPayment(
    @Res() res: Response,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    try {
      const payment = await this.paymentsService.create(createPaymentDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Payment has been created successfully',
        payment,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Payment not created!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Atualiza um pagamento. Endpoint protegido.',
  })
  public async updatePayment(
    @Res() res: Response,
    @Param('id') paymentId: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    try {
      const payment = await this.paymentsService.update(
        paymentId,
        updatePaymentDto,
      );
      if (!payment) {
        throw new NotFoundException('Payment does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Payment has been successfully updated',
        payment,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Payment not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Remove um pagamento. Endpoint protegido.',
  })
  public async deletePayment(
    @Res() res: Response,
    @Param('id') paymentId: string,
  ) {
    if (!paymentId) {
      throw new NotFoundException('Payment ID does not exist');
    }

    const payment = await this.paymentsService.remove(paymentId);

    if (!payment) {
      throw new NotFoundException('Payment does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Payment has been deleted',
      payment,
    });
  }
}

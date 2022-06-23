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
  constructor(private PaymentsService: PaymentsService) {}

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
    const Payments = await this.PaymentsService.findAll(paginationQuery);
    return res.status(HttpStatus.OK).json(Payments);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Traz um único pagamento. Endpoint protegido.',
  })
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
  @ApiOperation({
    summary: 'Adiciona um pagamento. Endpoint protegido.',
  })
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
  @ApiOperation({
    summary: 'Atualiza um pagamento. Endpoint protegido.',
  })
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
  @ApiOperation({
    summary: 'Remove um pagamento. Endpoint protegido.',
  })
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

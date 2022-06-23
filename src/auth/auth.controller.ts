import {
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from 'src/users/schemas/user.schema';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary:
      'login da aplicação, retornando um session token que deve ser usado para a segurança da App',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Usuários disponíveis para uso nesse backend',
    examples: {
      a: {
        summary: 'Usuário PicPay',
        value: {
          username: 'picpay-web',
          password: 'picpay@123',
        } as LoginDto,
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Sucesso ao realizar login' })
  async login(
    @Request() req: Request & { user: User },
    @Res() res: Response,
    @Body() loginDto: LoginDto,
  ) {
    const access = await this.authService.login(req.user);
    return res.status(HttpStatus.OK).json({
      message: 'login has been successfully',
      ...access,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('profile')
  @ApiOperation({
    summary: 'Realiza a atualização dos dados do usuário. Endpoint protegido.',
  })
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      a: {
        summary: 'Exemplo vázio',
        value: {
          firstName: 'string',
          lastName: 'string',
          bio: 'string',
          avatar: 'string',
        },
      },
      b: {
        summary: 'Exemplo com atualização',
        value: {
          firstName: 'PicPay',
          lastName: 'Serviços Financeiros',
          bio: 'O PicPay é um aplicativo fintech brasileiro, criado por pessoas do estado do Espírito Santo, disponível para download em celular dos sistemas operacionais Android e iOS, que funciona como uma carteira digital. O programa permite fazer compras pelo smartphone com cartão de crédito ou valor de transferência.',
          avatar:
            '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',
        } as UpdateUserDto,
      },
    },
  })
  public async updateUser(
    @Request() req: Request & { user: { username: string; userId: string } },
    @Res() res: Response,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const { userId } = req.user;
      const user = await this.usersService.update(userId, updateUserDto);
      if (!user) {
        throw new NotFoundException('user does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'user has been successfully updated',
        user,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not found!',
        status: 400,
      });
    }
  }
}

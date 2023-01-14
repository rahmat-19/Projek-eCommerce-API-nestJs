import { Body, Controller, Get, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProdukDto } from 'src/products/dto/create-produk.dto';
import { CreateTransactionDto } from './dto/create-transactions.dto';
import { Transactions } from './entities/transactions.entity';
import { TransactionsService } from './transactions.service';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async create(@Request() req, @Body() createTransactionDto : CreateTransactionDto) {
      try{          
          return{
              data: await this.transactionsService.create(createTransactionDto, req.user.id),
              statusCode: HttpStatus.CREATED,
              message: 'success',
          };
      } catch(e){
          console.log((e.code));
      }
  }

  @Get()
  async getAll(@Paginate() query: PaginateQuery): Promise<Paginated<Transactions>>{
    try{
      return await this.transactionsService.findAll(query)
    } catch(e){
      console.log(e);
        
    }
  }
}

import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Transactions } from './entities/transactions.entity';
import { TransactionsService } from './transactions.service';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getAll(@Paginate() query: PaginateQuery): Promise<Paginated<Transactions>>{
    try{
      return await this.transactionsService.findAll(query)
    } catch(e){
      console.log(e);
        
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CronExpression } from '@nestjs/schedule/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { Produk } from 'src/produks/entities/produk.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transactions.dto';
import { Transactions } from './entities/transactions.entity';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transactions)
        private transationRepository : Repository<Transactions>,
        @InjectRepository(User)
        private userRepository : Repository<User>,
        @InjectRepository(Produk)
        private produkRepository : Repository<Produk>,
    ){}

    async create(createTransactionDto: CreateTransactionDto) {
        const selectedProduk = await this.produkRepository.findOne({where: {id: createTransactionDto.produkId}})

        const order = new Transactions()
        order.user = await this.userRepository.findOne({where: {id: createTransactionDto.userId}})
        order.produk = selectedProduk
        order.paymentStatus = createTransactionDto.paymentStatus
        order.deliveryStatus = createTransactionDto.deliveryStatus
        order.total = selectedProduk.price
        order.expDate = new Date(new Date().getTime() + (24 * 60 * 60 * 1000))

        const result = await this.transationRepository.insert(order)
        return this.transationRepository.findOneOrFail({
            where: {
            id: result.identifiers[0].id,
            },
        })
    }

    async findOne(id: string) {
    try {
        return await this.transationRepository.findOneOrFail({
            where: {
                id,
            },
            relations: ['user', 'produk']
            });
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
            throw new HttpException(
                {
                statusCode: HttpStatus.NOT_FOUND,
                error: 'Data not found',
                },
                HttpStatus.NOT_FOUND,
            );
            } else {
            throw e;
            }
        }
    }

    async findAll() {
        return await this.transationRepository.findAndCount({
            relations: ['produk', 'user'],
        });
    }

    async payment(transactionId: string){
        try {
          await this.transationRepository.findOneOrFail({
            where: {
              id: transactionId,
            },
            withDeleted: true
          });
        } catch (e) {
          if (e instanceof EntityNotFoundError) {
            throw new HttpException(
              {
                statusCode: HttpStatus.NOT_FOUND,
                error: 'Data not found',
              },
              HttpStatus.NOT_FOUND,
            );
          } else {
            throw e;
          }
        }

        const transaction = new Transactions()
        transaction.paymentStatus = true

        await this.transationRepository.update(transactionId, transaction)
      }

    async remove(id: string){
        try {
          await this.transationRepository.findOneOrFail({
            where: {
              id,
            },
          });
        } catch (e) {
          if (e instanceof EntityNotFoundError) {
            throw new HttpException(
              {
                statusCode: HttpStatus.NOT_FOUND,
                error: 'Data not found',
              },
              HttpStatus.NOT_FOUND,
            );
          } else {
            throw e;
          }
        }

        const result = await this.transationRepository.softDelete(id);
        if (result){
          const transaction = new Transactions()
          transaction.status = "Cancelled"

          await this.transationRepository.update(id, {status: "Cancelled"})
        }
      }

      @Cron(CronExpression.EVERY_SECOND)
      async validateExpDate() {

        const [allTransaction, count] = await this.transationRepository.findAndCount();
        const dateNow = new Date(new Date().getTime());
        const filterTransation = allTransaction.filter(data => dateNow >= data.expDate && data.paymentStatus == false && data.status.toLowerCase() !== 'cancelled');
        const idTransactionByFilter = filterTransation.map(data => data.id);
        if (idTransactionByFilter){
          idTransactionByFilter.map(data => {
            this.transationRepository.createQueryBuilder()
            .softDelete()
            .where("id = :id", {id: data})
            .execute()

            this.transationRepository.createQueryBuilder()
            .withDeleted()
            .update()
            .set({
              status: "Cancelled"
            })
            .where("id = :id", {id: data})
            .execute()

            console.log(`status id ${idTransactionByFilter} successfully changed to CANCELLED`);

          })
        }

      }
}

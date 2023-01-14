import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { DecreaseDto } from './dto/decrease.dto';
import { IncreaseDto } from './dto/increase.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
  ){}
  async create(createCartDto: CreateCartDto, id: string) {
    const product = await this.productRepository.findOne({
      where: {
        id: createCartDto.productId
      }
    })

    console.log(product);
    const checkProductExist = await this.cartRepository.findOne({
      where: [
        {
          product: {
            id: product.id
          },
          userId: id
        }
      ]
    })

    console.log("ini product exist: ");



    if (!product) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          messages: 'Product not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (checkProductExist) {
      this.increaseQty(checkProductExist.id);
    }

    const cart = new Cart()
    cart.createdBy = await (await this.userRepository.findOne({ where: { id: id}})).email
    cart.userId = id
    cart.product = product
    cart.qty = createCartDto.qty
    cart.price = createCartDto.price

    const result = await this.cartRepository.insert(cart)

    return this.cartRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
      relations: ['product']
    });
  }

  async findAll (query: PaginateQuery): Promise<Paginated<Cart>>{
    return paginate(query, this.cartRepository, {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'ASC']],
      defaultLimit: 5,
    })
  }

  async findOne(id: string) {
    try {
      return await this.cartRepository.findOneOrFail({
        where: {
          id: id,
        },
        relations: ['product']
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

  async update(updateCartDto: UpdateCartDto, id: string) {
    try {
      await this.cartRepository.findOneOrFail({
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

    const cart = new Cart()
    cart.qty = updateCartDto.qty
    cart.price = updateCartDto.price

    await this.cartRepository.update(id, cart);

    return this.cartRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.cartRepository.findOneOrFail({
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

    await this.cartRepository.delete(id);
  }

  async increaseQty(id: string) {
    let data
    try {
      data = await this.cartRepository.findOneOrFail({
        where: {
          id,
        },
        relations: ['product']
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

    if (data.qty + 1 > data.product.stok) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          messages: 'out of stock'
        },
        HttpStatus.BAD_REQUEST
      );
    } else {

      await this.cartRepository.update(id, {qty: data.qty + 1});

    }



    // await this.cartRepository.createQueryBuilder()
    // .update(Cart)
    // .set({
    //   qty: ()=> `qty + ${1}`
    // })
    // .where("id = :id", { id: id })
    // .execute()
  }

  async decreaseQty(id: string) {
    let data
    try {
      data = await this.cartRepository.findOneOrFail({
        where: {
          id,
        },
        relations: ['product']
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

    if (data.qty - 1 < 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          messages: 'out of stock'
        },
        HttpStatus.BAD_REQUEST
      );
    } else {
      await this.cartRepository.update(id, {qty: data.qty - 1});

    }

    // await this.cartRepository.createQueryBuilder()
    // .update(Cart)
    // .set({
    //   qty: ()=> `qty - ${1}`
    // })
    // .where("id = :id", { id: id })
    // .execute()
  }
}

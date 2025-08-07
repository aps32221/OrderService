import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderDetail } from './orderdetail.entity';
import { OptionDetail } from '../optiondetail/optiondetail.entity';

@Injectable()
export class OrderDetailService {
  constructor(
    @Inject('ORDER_DETAIL_REPOSITORY')
    private orderDetailRepository: Repository<OrderDetail>,
    @Inject('OPTION_DETAIL_REPOSITORY')
    private optionDetailRepository: Repository<OptionDetail>, // Assuming this is a mistake, should be OptionDetail
  ) {}

  async getOrderDetail(): Promise<OrderDetail[]> {
    return await this.orderDetailRepository.find();
  }

  async getOrderDetailById(id: string): Promise<OrderDetail | null> {
    const orderDetail = await this.orderDetailRepository.findOne({
      where: { id: id },
      relations: ['item', 'order', 'optionDetails'],
    });
    if (orderDetail === null) return null;
    return orderDetail;
  }

  async getOrderDetailByOrderId(
    orderId: string,
  ): Promise<OrderDetail[] | null> {
    const orderDetails = await this.orderDetailRepository.find({
      where: { order: { id: orderId } },
      relations: [
        'item',
        'optionDetails',
        'optionDetails.option',
        'optionDetails.optionType',
        'item.optionTypes',
        'item.optionTypes.options',
      ],
    });
    if (orderDetails.length === 0) return null;
    return orderDetails;
  }

  async createOrderDetail(
    orderDetail: Partial<OrderDetail[]>,
  ): Promise<OrderDetail[]> {
    const ret = await this.orderDetailRepository.save(
      orderDetail.map((ele) =>
        this.orderDetailRepository.create({
          ...ele,
        }),
      ),
    );
    const flatMap = orderDetail.flatMap((ele, idx) =>
      ele!.optionDetails.map((optionDetail) =>
        this.optionDetailRepository.create({
          ...optionDetail,
          orderDetail: ret[idx],
        }),
      ),
    );
    await this.optionDetailRepository.save(flatMap);
    return ret;
  }
  async deleteOrderDetail(id: string): Promise<OrderDetail | null> {
    const orderDetail = await this.orderDetailRepository.findOne({
      where: { id: id },
      withDeleted: true,
    });
    if (orderDetail === null) return null;
    return await this.orderDetailRepository.remove(orderDetail);
  }
}

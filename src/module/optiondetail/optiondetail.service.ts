import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OptionDetail } from './optiondetail.entity';

@Injectable()
export class OptionDetailService {
  constructor(
    @Inject('OPTION_DETAIL_REPOSITORY')
    private optionDetailRepository: Repository<OptionDetail>,
  ) {}

  async getOptionDetail(): Promise<OptionDetail[]> {
    return await this.optionDetailRepository.find();
  }

  async getOptionDetailById(id: string): Promise<OptionDetail | null> {
    const optionDetail = await this.optionDetailRepository.findOne({
      where: { id: id },
      relations: ['option'],
    });
    if (optionDetail === null) return null;
    return optionDetail;
  }
  async createOptionDetail(
    optionDetail: Partial<OptionDetail>,
  ): Promise<OptionDetail> {
    return await this.optionDetailRepository.save(
      this.optionDetailRepository.create({
        ...optionDetail,
      }),
    );
  }
  async deleteOptionDetail(id: string): Promise<OptionDetail | null> {
    const optionDetail = await this.optionDetailRepository.findOne({
      where: { id: id },
      withDeleted: true,
    });
    if (optionDetail === null) return null;
    return await this.optionDetailRepository.remove(optionDetail);
  }
}

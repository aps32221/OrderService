import { Inject, Injectable, Logger } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Option } from './option.entity';
import { OptionType } from '../optiontype/optiontype.entity';

@Injectable()
export class OptionService {
  constructor(
    @Inject('OPTION_REPOSITORY') private optionRepository: Repository<Option>,
    @Inject('OPTION_TYPE_REPOSITORY')
    private optionTypeRepository: Repository<OptionType>,
  ) {}

  async getOption(): Promise<Option[]> {
    return await this.optionRepository.find();
  }

  async createOption(option: Partial<Option>): Promise<Option> {
    return await this.optionRepository.save(
      this.optionRepository.create({
        ...option,
      }),
    );
  }

  async createOptions(options: Partial<Option>[]): Promise<Option[]> {
    return await this.optionRepository.save(
      this.optionRepository.create(options),
    );
  }

  async createOptionWithType(
    typeId: string[],
    option: Partial<Option>,
  ): Promise<OptionType[]> {
    await this.optionRepository.save(this.optionRepository.create(option));
    const result = await this.optionTypeRepository.find({
      relations: {
        options: true,
      },
      where: {
        id: In(typeId),
      },
    });
    Logger.log(result);
    return result;
  }

  async deleteOption(id: string, itemId: string): Promise<OptionType[]> {
    const option = await this.optionRepository.findOne({
      where: { id: id },
      withDeleted: true,
    });
    if (option !== null) await this.optionRepository.softDelete(id);
    return await this.optionTypeRepository.find({
      relations: {
        options: true,
      },
      where: {
        item: In([itemId]),
      },
    });
  }
}

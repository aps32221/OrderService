import { Inject, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { OptionType } from './optiontype.entity';

@Injectable()
export class OptionTypeService {
  constructor(
    @Inject('OPTION_TYPE_REPOSITORY')
    private OptionTypeRepository: Repository<OptionType>,
  ) {}

  async getOptionType(): Promise<OptionType[]> {
    return await this.OptionTypeRepository.find();
  }

  async createOptionType(optionType: Partial<OptionType>): Promise<OptionType> {
    return await this.OptionTypeRepository.save(
      this.OptionTypeRepository.create({
        ...optionType,
        item: optionType.item,
      }),
    );
  }

  async createOptionTypes(
    optionTypes: Partial<OptionType>[],
  ): Promise<OptionType[]> {
    optionTypes = optionTypes.map((optionType) => {
      if (optionType.id === '' || optionType.id === undefined) {
        return { name: optionType.name };
      } else return optionType;
    });
    const result = await this.OptionTypeRepository.save(
      this.OptionTypeRepository.create(optionTypes),
    );
    return await this.OptionTypeRepository.find({
      relations: {
        options: true,
      },
      where: {
        id: In(result.map((optionType) => optionType.id)),
      },
    });
  }

  async deleteOptionType(id: string, itemId: string): Promise<OptionType[]> {
    const optionType = await this.OptionTypeRepository.findOne({
      where: { id: id },
      // withDeleted: true,
    });
    if (optionType !== null) await this.OptionTypeRepository.softDelete(id);
    return await this.OptionTypeRepository.find({
      relations: {
        options: true,
      },
      where: {
        item: In([itemId]),
      },
    });
  }
}

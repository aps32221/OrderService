import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { OptionService } from './option.service';
import { Option } from './option.entity';
import { Response } from 'express';
import { OptionType } from '../optiontype/optiontype.entity';
import { CreateOptionByTypeDto } from 'src/dto/user.dto';
@Controller()
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Get()
  async getAllOption(): Promise<Option[]> {
    return await this.optionService.getOption();
  }

  @Post('/type')
  async createOption(
    @Res() res: Response,
    @Body() data: CreateOptionByTypeDto,
  ): Promise<any> {
    let options: OptionType[] | null = null;
    try {
      options = await this.optionService.createOptionWithType(
        data.typeId,
        data.option,
      );
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (options !== null) res.status(HttpStatus.CREATED).send(options);
  }

  @Delete(':id/:itemId')
  async deleteOption(
    @Res() res: Response,
    @Param('id') id: string,
    @Param('itemId') itemId: string,
  ) {
    let option: OptionType[] = [];
    try {
      option = await this.optionService.deleteOption(id, itemId);
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (option !== null) res.status(HttpStatus.OK).send(option);
  }
}

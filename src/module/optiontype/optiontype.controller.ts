import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { OptionTypeService } from './optiontype.service';
import { OptionType } from './optiontype.entity';
import { Response } from 'express';

@Controller()
export class OptionTypeController {
  constructor(private readonly optionTypeService: OptionTypeService) {}

  @Get()
  async getAllOptionType() {
    return await this.optionTypeService.getOptionType();
  }

  @Post()
  async createOptionType(
    @Res() res: Response,
    @Body() optionType: Partial<OptionType>[],
  ) {
    let optionTypes: OptionType[] | null = null;
    try {
      optionTypes = await this.optionTypeService.createOptionTypes(optionType);
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (optionTypes !== null) res.status(HttpStatus.CREATED).send(optionTypes);
  }

  @Delete(':id/:itemId')
  async deleteOptionType(
    @Res() res: Response,
    @Param('id') id: string,
    @Param('itemId') itemId: string,
  ) {
    let optionType: OptionType[] = [];
    try {
      optionType = await this.optionTypeService.deleteOptionType(id, itemId);
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (optionType !== null) res.status(HttpStatus.OK).send(optionType);
  }
}

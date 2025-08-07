import { Controller, Delete, Get, Post } from '@nestjs/common';
import { OptionDetailService } from './optiondetail.service';
import { OptionDetail } from './optiondetail.entity';

@Controller()
export class OptionDetailController {
  constructor(private readonly optionDetailService: OptionDetailService) {}

  @Get()
  async getAllOptionDetail() {
    return await this.optionDetailService.getOptionDetail();
  }

  @Get(':id')
  async getOptionDetailById(id: string) {
    return await this.optionDetailService.getOptionDetailById(id);
  }

  @Post()
  async createOptionDetail(optionDetail: Partial<OptionDetail>) {
    return await this.optionDetailService.createOptionDetail(optionDetail);
  }

  @Delete(':id')
  async deleteOptionDetail(id: string) {
    return await this.optionDetailService.deleteOptionDetail(id);
  }
}

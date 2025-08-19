import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  Logger,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { CreateItemByType, DeleteItemById } from 'src/dto/user.dto';
import { randomUUID } from 'crypto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async getAllItem(): Promise<Item[]> {
    return await this.itemService.getItem();
  }

  @Get('shop/:id')
  async getItemByShopId(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    let items: Item[] | null = null;
    try {
      items = await this.itemService.getItemByShopId(id);
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (items !== null) res.status(HttpStatus.OK).send(items);
  }

  @Get(':id')
  async getItemById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    let item: Item | null = null;
    try {
      item = await this.itemService.getItemById(id);
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (item !== null) res.status(HttpStatus.OK).send(item);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', '..', 'image'),
        filename: (req, file, cb) => {
          const name = randomUUID();
          return cb(null, `${name}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createItem(
    @Res() res: Response,
    @Body() item: CreateItemByType,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // ... Set of file validator instances here
          new MaxFileSizeValidator({ maxSize: 512000000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<void> {
    let items: Item | null = null;
    try {
      console.log(file);
      item.item.image = `/image/${file.filename}`;
      items = await this.itemService.createItem(item.item, item.typeId);
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    if (items !== null)
      res
        .status(HttpStatus.CREATED)
        .send(await this.itemService.getItemByShopId(item.item.shop!.id));
  }

  @Delete(':itemId/:shopId')
  async deleteItem(
    @Res() res: Response,
    @Param() { itemId, shopId }: DeleteItemById,
  ): Promise<void> {
    try {
      await this.itemService.deleteItem(itemId);
    } catch (err) {
      Logger.error(err);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
    res
      .status(HttpStatus.OK)
      .send(await this.itemService.getItemByShopId(shopId));
  }
}

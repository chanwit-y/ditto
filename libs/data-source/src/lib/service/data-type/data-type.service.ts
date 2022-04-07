import { Injectable } from '@nestjs/common';
import { DataType } from '@prisma/client';
import { VaridateType } from '../../@types/VaridateType';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DataTypeService {
  constructor(private _prisma: PrismaService) {}

  private varidate(data:DataType): VaridateType[] {
    let result: VaridateType[] = [];
    if (!!!data.name) result.push({ message: 'name is requrie!' });
    
    return result;
  }

  private transform(data: Partial<DataType>):DataType {
    return {
      id: 0,
      name: data.name ?? "",
      description: data.description ?? "",
    };
  }

  public async findAll() {
    try {
      return await this._prisma.dataType.findMany();
    } catch (ex) {
      throw ex;
    }
  }

  public async findById(id: number) {
    try {
      return await this._prisma.dataType.findUnique({ where: { id } });
    } catch (ex) {
      throw ex;
    }
  }

  public async count() {
    try {
      return await this._prisma.dataType.count();
    } catch (ex) {
      throw ex;
    }
  }

  public async upsert(data: DataType) {
    try {
      const varidate = this.varidate(data);
      if (varidate.length > 0) throw varidate;

      return await this._prisma.dataType.upsert({
	create: this.transform(data),
	update: data,
	where: { id: data.id },
      });
    } catch (ex) {
      throw ex;
    }
  }

  public async create(data: Partial<DataType>) {
    try {
      const varidate = this.varidate(this.transform(data));
      if (varidate.length > 0) throw varidate;

      return await this._prisma.dataType.create({
	data: this.transform(data),
      });
    } catch (ex) {
      throw ex;
    }
  }

  public async update(data: DataType) {
    try {
      const varidate = this.varidate(data);
      if (varidate.length > 0) throw varidate;

      return await this._prisma.dataType.update({
	data: data,
	where: { id: data.id },
      });
    } catch (ex) {
      throw ex;
    }
  }
}
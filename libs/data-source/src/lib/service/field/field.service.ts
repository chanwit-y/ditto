import { Injectable } from '@nestjs/common';
import { Field } from '@prisma/client';
import { VaridateType } from '../../@types/VaridateType';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FieldService {
  constructor(private _prisma: PrismaService) {}

  private varidate(data: Field): VaridateType[] {
    let result: VaridateType[] = [];
    if (!!!data.name) result.push({ message: 'name is requrie!' });

    return result;
  }

  private transform(data: Partial<Field>): Field {
    return {
      id: 0,
      name: data?.name ?? '',
      description: data?.description ?? '',
      length: data?.length ?? 0,
      tabelId: 0,
      dataTypeId: 0,
    };
  }

  public async findAll() {
    try {
      return await this._prisma.field.findMany();
    } catch (ex) {
      throw ex;
    }
  }

  public async findById(id: number) {
    try {
      return await this._prisma.field.findUnique({ where: { id } });
    } catch (ex) {
      throw ex;
    }
  }

  public async count() {
    try {
      return await this._prisma.field.count();
    } catch (ex) {
      throw ex;
    }
  }

  public async upsert(data: Field) {
    try {
      const varidate = this.varidate(data);
      if (varidate.length > 0) throw varidate;

      return await this._prisma.field.upsert({
        create: this.transform(data),
        update: data,
        where: { id: data.id },
      });
    } catch (ex) {
      throw ex;
    }
  }

  public async create(data: Partial<Field>) {
    try {
      const varidate = this.varidate(this.transform(data));
      if (varidate.length > 0) throw varidate;

      return await this._prisma.field.create({
        data: this.transform(data),
      });
    } catch (ex) {
      throw ex;
    }
  }

  public async update(data: Field) {
    try {
      const varidate = this.varidate(data);
      if (varidate.length > 0) throw varidate;

      return await this._prisma.field.update({
        data: data,
        where: { id: data.id },
      });
    } catch (ex) {
      throw ex;
    }
  }
}

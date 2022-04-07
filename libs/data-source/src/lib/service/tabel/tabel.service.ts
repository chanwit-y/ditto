import { Injectable } from '@nestjs/common';
import { Tabel } from '@prisma/client';
import { VaridateType } from '../../@types/VaridateType';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TabelService {
  constructor(private _prisma: PrismaService) {}

  private varidate(data: Tabel): VaridateType[] {
    let result: VaridateType[] = [];
    if (!!!data.name) result.push({ message: 'name is requrie!' });

    return result;
  }

  public async findAll() {
    try {
      return await this._prisma.tabel.findMany({
        include: {
          fields: {
            include: {
              dataType: true,
            },
          },
        },
      });
    } catch (ex) {
      throw ex;
    }
  }

  public async findById(id: number) {
    try {
      return await this._prisma.tabel.findUnique({
        include: {
          fields: {
            include: {
              dataType: true,
            },
          },
        },
        where: { id },
      });
    } catch (ex) {
      throw ex;
    }
  }

  public async count() {
    try {
      return await this._prisma.tabel.count();
    } catch (ex) {
      throw ex;
    }
  }

  public async upsert(data: Tabel) {
    try {
      const varidate = this.varidate(data);
      if (varidate.length > 0) throw varidate;

      return await this._prisma.tabel.upsert({
        create: {
          name: data.name,
          description: data.description,
        },
        update: data,
        where: { id: data.id },
      });
    } catch (ex) {
      throw ex;
    }
  }

  public async create(data: Partial<Tabel>) {
    try {
      const varidate = this.varidate({
        id: 0,
        name: data?.name ?? '',
        description: '',
      });
      if (varidate.length > 0) throw varidate;

      return await this._prisma.tabel.create({
        data: {
          name: data.name ?? '',
          description: data.description,
        },
      });
    } catch (ex) {
      throw ex;
    }
  }

  public async update(data: Tabel) {
    try {
      const varidate = this.varidate(data);
      if (varidate.length > 0) throw varidate;

      return await this._prisma.tabel.update({
        data: data,
        where: { id: data.id },
      });
    } catch (ex) {
      throw ex;
    }
  }
}

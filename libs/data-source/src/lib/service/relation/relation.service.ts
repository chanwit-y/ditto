import { Injectable } from '@nestjs/common';
import { Relation } from '@prisma/client';
import { VaridateType } from '../../@types/VaridateType';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RelationService {
  constructor(private _prisma: PrismaService) {}

  private varidate(data:Relation): VaridateType[] {
    let result: VaridateType[] = [];
    if (!!!data.name) result.push({ message: 'name is requrie!' });
    
    return result;
  }

  private transform(data: Partial<Relation>):Relation {
    return {
      id: 0,
      name: data?.name ?? '',
    } as Relation;
  }

  public async findAll() {
    try {
      return await this._prisma.relation.findMany();
    } catch (ex) {
      throw ex;
    }
  }

  public async findById(id: number) {
    try {
      return await this._prisma.relation.findUnique({ where: { id } });
    } catch (ex) {
      throw ex;
    }
  }

  public async count() {
    try {
      return await this._prisma.relation.count();
    } catch (ex) {
      throw ex;
    }
  }

  public async upsert(data: Relation) {
    try {
      const varidate = this.varidate(data);
      if (varidate.length > 0) throw varidate;

      return await this._prisma.relation.upsert({
	create: this.transform(data),
	update: data,
	where: { id: data.id },
      });
    } catch (ex) {
      throw ex;
    }
  }

  public async create(data: Partial<Relation>) {
    try {
      const varidate = this.varidate(this.transform(data));
      if (varidate.length > 0) throw varidate;

      return await this._prisma.relation.create({
	data: this.transform(data),
      });
    } catch (ex) {
      throw ex;
    }
  }

  public async update(data: Relation) {
    try {
      const varidate = this.varidate(data);
      if (varidate.length > 0) throw varidate;

      return await this._prisma.relation.update({
	data: data,
	where: { id: data.id },
      });
    } catch (ex) {
      throw ex;
    }
  }
}
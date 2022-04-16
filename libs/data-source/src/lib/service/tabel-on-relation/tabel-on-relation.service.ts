import { Injectable } from "@nestjs/common";
import { TabelOnRelation } from "@prisma/client";
import { VaridateType } from "../../@types/VaridateType";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class TabelOnRelationService {
  constructor(private _prisma: PrismaService) {}

  private varidate(data: TabelOnRelation): VaridateType[] {
    let result: VaridateType[] = [];
    if (!!!data.main) result.push({ message: "main is requrie!" });
    if (!!!data.cross) result.push({ message: "cross is requrie!" });

    return result;
  }

  private transform(data: Partial<TabelOnRelation>): TabelOnRelation {
    return {} as TabelOnRelation;
  }

  public async findAll() {
    try {
      return await this._prisma.tabelOnRelation.findMany();
    } catch (ex) {
      throw ex;
    }
  }

  public async findById(tabelId: number, relationId: number) {
    try {
      return await this._prisma.tabelOnRelation.findUnique({
        where: {
          tabelId_relationId: {
            tabelId: tabelId,
            relationId: relationId,
          },
        },
      });
    } catch (ex) {
      throw ex;
    }
  }

  public async count() {
    try {
      return await this._prisma.tabelOnRelation.count();
    } catch (ex) {
      throw ex;
    }
  }

  public async upsert(data: TabelOnRelation) {
    try {
      const varidate = this.varidate(data);
      if (varidate.length > 0) throw varidate;

      return await this._prisma.tabelOnRelation.upsert({
        create: this.transform(data),
        update: data,
        where: {
          tabelId_relationId: {
            tabelId: data.tabelId,
            relationId: data.relationId,
          },
        },
      });
    } catch (ex) {
      throw ex;
    }
  }

  public async create(data: Partial<TabelOnRelation>) {
    try {
      const varidate = this.varidate(this.transform(data));
      if (varidate.length > 0) throw varidate;

      return await this._prisma.tabelOnRelation.create({
        data: this.transform(data),
      });
    } catch (ex) {
      throw ex;
    }
  }

  public async update(data: TabelOnRelation) {
    try {
      const varidate = this.varidate(data);
      if (varidate.length > 0) throw varidate;

      return await this._prisma.tabelOnRelation.update({
        data: data,
        where: {
          tabelId_relationId: {
            tabelId: data.tabelId,
            relationId: data.relationId,
          },
        },
      });
    } catch (ex) {
      throw ex;
    }
  }
}

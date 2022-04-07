import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { VaridateType } from '../../@types/VaridateType';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private _prisma: PrismaService) {}

  private varidate(data: Project): VaridateType[] {
    let result: VaridateType[] = [];
    if (!!!data.name) result.push({ message: 'name is requrie!' });
    
    return result;
  }

  public async findAll() {
    try {
      return await this._prisma.project.findMany();
    } catch (ex) {
      throw ex;
    }
  }

  public async findById(id: number) {
    try {
      return await this._prisma.project.findUnique({ where: { id } });
    } catch (ex) {
      throw ex;
    }
  }

  public async count() {
    try {
      return await this._prisma.project.count();
    } catch (ex) {
      throw ex;
    }
  }

  public async upsert(data: Project) {
    try {
      const varidate = this.varidate(data);
      if (varidate.length > 0) throw varidate;

      return await this._prisma.project.upsert({
	create: {
	  name: data.name ?? "",
	},
	update: data,
	where: { id: data.id },
      });
    } catch (ex) {
      throw ex;
    }
  }

  public async create(data: Partial<Project>) {
    try {
      const varidate = this.varidate({
	      id: 0,
	      name: data?.name ??  "" ,
      });
      if (varidate.length > 0) throw varidate;

      return await this._prisma.project.create({
	data: {
	  name: data.name ?? "",
	},
      });
    } catch (ex) {
      throw ex;
    }
  }

  public async update(data:Project) {
    try {
      const varidate = this.varidate(data);
      if (varidate.length > 0) throw varidate;

      return await this._prisma.project.update({
	data: data,
	where: { id: data.id },
      });
    } catch (ex) {
      throw ex;
    }
  }
}

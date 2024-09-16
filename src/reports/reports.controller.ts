import {
  Controller,
  Get,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from '../task/task.service';
import { ReportsService } from './reports.service';
import {
  ApiBearerAuth,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { RolesGuard } from '../guard/role.strategy';
import { Role } from '../guard/role.guard';

@Controller('reports')
@ApiBearerAuth()
@ApiTags('Reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly taskService: TaskService,
  ) {}

  @ApiOkResponse({
    description: 'Generate Report in pdf, csv or excel format',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiNotAcceptableResponse({ description: 'Invalid format' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('MANAGER')
  @Role('ADMIN')
  @Get('/generate-pdf')
  async generatePdf(
    @Query('format') fomart: string,
    @Request() req: { user: { id: number } },
    @Res() res: Response,
  ) {
    const tasks = await this.taskService.findAll(req.user.id);
    let report;

    switch (fomart) {
      case 'pdf':
        report = await this.reportsService.genetateReports(tasks);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
          'Content-Disposition',
          'attachment; filename="report.pdf"',
        );
        break;

      case 'csv':
        report = await this.reportsService.generateCsvReports(tasks);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader(
          'Content-Disposition',
          'attachment; filename="report.csv"',
        );
        break;

      case 'excel':
        report = await this.reportsService.generateExcelReports(tasks);
        res.setHeader(
          'Content-Type',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );
        res.setHeader(
          'Content-Disposition',
          'attachment; filename="report.xlsx"',
        );
        break;

      default:
        return res.status(409).send('Invalid format');
    }
    return res.status(200).send(report);
  }
}

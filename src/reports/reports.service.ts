import { Injectable } from '@nestjs/common';
import { Tasks } from '@prisma/client';
import { Workbook } from 'exceljs';
import { PDFDocument, rgb } from 'pdf-lib';

@Injectable()
export class ReportsService {
  constructor() {}
  async genetateReports(tasks: Tasks[]): Promise<Buffer> {
    const pdfDocs = await PDFDocument.create();
    const page = pdfDocs.addPage([600, 400]);

    page.drawText('Report of tasks', {
      x: 50,
      y: 350,
      size: 20,
      color: rgb(0, 0, 0),
    });

    tasks.forEach((task, index) => {
      const yPositon = 320 - index * 20;
      page.drawText(`${task.title} - ${task.status}`, {
        x: 50,
        y: yPositon,
        size: 12,
      });
    });
    const pdfBytes = await pdfDocs.save();
    return Buffer.from(pdfBytes);
  }

  async generateCsvReports(tasks: Tasks[]): Promise<any> {
    const csvData: string[] = [];
    csvData.push(
      ['id', 'title', 'description', 'status', 'createdAt', 'updatedAt'].join(
        ',',
      ),
    );
    tasks.forEach((task) => {
      csvData.push(
        [
          task.id,
          task.title,
          task.description,
          task.status,
          task.createdAt,
          task.updatedAt,
        ].join(','),
      );
    });

    const csv = Buffer.from(csvData.join('\n'));
    return csv;
  }

  async generateExcelReports(tasks: Tasks[]): Promise<any> {
    const workbook = new Workbook();

    const worksheet = workbook.addWorksheet('Tasks');
    worksheet.columns = [
      { header: 'id', key: 'id', width: 10 },
      { header: 'title', key: 'title', width: 30 },
      { header: 'description', key: 'description', width: 40 },
      { header: 'priority', key: 'priority', width: 10 },
      { header: 'status', key: 'status', width: 10 },
      { header: 'createdAt', key: 'createdAt', width: 10 },
      { header: 'updatedAt', key: 'updatedAt', width: 20 },
    ];

    tasks.forEach((task) => {
      worksheet.addRow({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      });
    });
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}

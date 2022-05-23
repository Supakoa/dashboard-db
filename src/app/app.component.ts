import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  name: string = 'supakit';
  count: number = 0;

  ngOnInit(): void {
    setInterval(() => {
      console.log('interval time. = ', ++this.count);
    }, 10000);
  }

  title = 'dashboard-db';

  chartData = [
    {
      data: [330, 600, 260, 700],
      label: 'Active',
    },
    {
      data: [120, 455, 100, 340],
      label: 'Idle',
    },
  ];

  chartLabels = ['January', 'February', 'March', 'April'];

  chartOptions = {
    responsive: true,
  };

  onChartHover = (_e: any) => {
    window.console.log('onChartHover', _e);
  };

  onChartClick = (_e: any) => {
    window.console.log('onChartClick', _e);
  };

  newDataPoint(dataArr: Array<number>) {
    this.chartData.forEach((dataset, index) => {
      this.chartData[index] = Object.assign({}, this.chartData[index], {
        data: [...this.chartData[index].data, dataArr[index]],
      });
    });
  }
}

import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { of } from 'rxjs';
import { ChartData } from './models/chart-data';
import { CheckPoolReq } from './models/request/check-pool-req';
import { CallService } from './service/call.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  timing: number = 5000;
  title: string = 'dashboard-db';
  name: string = 'supakit';
  count: number = 0;
  status: string = 'idle';
  chartColors = [{ backgroundColor: 'rgba(255,0,0,0.3)' }];
  chartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            suggestedMax: 100,
            suggestedMin: 50,
            max: 400,
          },
        },
      ],
    },
  };
  chartLabels: string[] = [];
  chartDataArr: ChartData[] = [{ data: [], label: 'IDLE' }];
  checkPoolReq: CheckPoolReq = {
    state: 'idle',
    time: '',
  };
  constructor(private ws: CallService) {}

  ngOnInit(): void {
    this.callWsCheckPool();
  }

  onChartHover = (_e: any) => {
    window.console.log('onChartHover', _e);
  };

  onChartClick = (_e: any) => {
    window.console.log('onChartClick', _e);
  };

  onChangeTiming(e: any) {
    const { value } = e.target;
    this.timing = value;
  }

  private setMaxConfig(max: number): void {
    let { ticks } = this.chartOptions.scales.yAxes[0];
    ticks.suggestedMax = 1000;
  }

  private callWsCheckPool(): void {
    console.log('time: ', this.timing);

    setInterval(() => {
      this.checkPoolReq.time = new Date().toLocaleTimeString();
      this.ws.postDb(this.checkPoolReq).subscribe((res) => {
        const { data } = this.chartDataArr[0];
        const { rows } = res;
        this.setMaxConfig(rows);
        data.push(Number(rows?.toPrecision(1)));
        this.chartLabels.push(res?.time);
        console.log('interval time. = %d, %d', ++this.count, rows);
      });
    }, this.timing);
  }
}

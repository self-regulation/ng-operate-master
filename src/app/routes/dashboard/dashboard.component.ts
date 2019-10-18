import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { DoughnutPie } from '@shared/utils/doughnutpie';
import { basicLine, ActiveUserData, AverageTimeData, DefaultPie } from '@shared';
import { SimpleBar } from '@shared/utils/simpleBar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  operatSystem: any = null;
  unit: any = 'hour';
  activeUserTrend: any = null;
  averageTimeData: any = null;
  serverSystem: any = null;
  array = [
    ['服务器异常信息1', '服务器异常信息2', '服务器异常信息3', '服务器异常信息4', '服务器异常信息5'],
    ['服务器异常信息6', '服务器异常信息7', '服务器异常信息8', '服务器异常信息9', '服务器异常信息10'],
    ['服务器异常信息11', '服务器异常信息12', '服务器异常信息13', '服务器异常信息14', '服务器异常信息15']];
  salesPieData = [
    {
      x: '已使用',
      y: 10,
    },
    {
      x: '未使用',
      y: 4,
    },

  ];
  total: string;
  isVisible = false;


  data = [];
  now: any = +new Date(1997, 9, 3);
  oneDay = 24 * 3600 * 1000;
  value = Math.random() * 1000;

  // public lineOption: EChartOption;
  public pieOption: EChartOption;


  pageIndex = 1;
  pageSize = 10;
  totals = 1;
  listOfData = [];
  loading = true;

  constructor() { }

  ngOnInit() {
    this.operatSystem = DoughnutPie({
      legendData: ['Windows', 'ios', 'Android'],
      seriesName: '操作系统',
      seriesData: [
        { value: 535, name: 'Android' },
        { value: 388, name: 'ios' },
        { value: 266, name: 'Windows' },

      ]
    });

    // this.lineOption = basicLine({
    //   title: '玩家人流量',
    //   xData: ['2019-09-18', '2019-09-19', '2019-09-20', '2019-09-21', '2019-09-22', '2019-09-23', '2019-09-24', '2019-09-25', '2019-09-26', '2019-09-27', '2019-09-28', '2019-09-29', '2019-09-30', '2019-10-01'
    //     , '2019-10-02', '2019-10-03', '2019-10-04', '2019-10-05', '2019-10-06', '2019-10-07', '2019-10-08', '2019-10-09', '2019-10-10', '2019-10-11', '2019-10-12', '2019-10-13', '2019-10-14', '2019-10-15', '2019-10-16', '2019-10-17', '2019-10-18'],
    //   seriesData: [678, 345, 765, 345, 764, 234, 789, 345, 1234, 656, 342, 432, 675, 134, 765, 444, 764, 223, 889, 776, 1234, 1245, 1356, 1567, 1785, 1345, 1899, 1999, 2345, 2567, 3214],
    //   unit: '人',
    //   legend: ['玩家人数']
    // });

    this.activeUserTrend = basicLine({
      title: '活跃玩家趋势',
      xData: (ActiveUserData()).xData,
      seriesData: ActiveUserData().seriesData,
      unit: '人',
      legend: ['启动游戏人数']
    });

    this.averageTimeData = SimpleBar({
      xData: AverageTimeData().xData,
      seriesData: AverageTimeData().seriesData,
      viewTitle: '平均单日使用时长',
      unit: '分',
      legend: ['平均使用时长']
    });


    this.serverSystem = DefaultPie({
      title: '服务器使用情况',
      seriesData: [
        { value: 10, name: '已使用' },
        { value: 3, name: '未使用' },
      ],
      unit: '%',
      legend: ['已使用', '未使用']
    });

    this.searchData();
  }
  randomData() {
    this.now = new Date(+this.now + this.oneDay);
    this.value = this.value + Math.random() * 21 - 10;
    return {
      name: this.now.toString(),
      value: [
        [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
        Math.round(this.value)
      ]
    }
  }
  showDetail() {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  format(val: number) {
    return `<span style="font-weight: blod !important;">${val}</span>台`;
  }


  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = false;
    this.totals = 200;
    this.listOfData = [
      {
        key: '10.11.133.151',
        servername: 'server1',
        cpu: '40%',
        gpu: '50%',
        ram: '60%',
        player: '11',
      },
      {
        key: '10.11.133.151',
        servername: 'server2',
        cpu: '40%',
        gpu: '50%',
        ram: '60%',
        player: '11',
      },
      {
        key: '10.11.133.151',
        servername: 'server3',
        cpu: '40%',
        gpu: '50%',
        ram: '60%',
        player: '11',
      },
    ];
  }
}

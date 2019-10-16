import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  sysTime: any = '';


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

  public lineOption: EChartOption;
  public pieOption: EChartOption;


  pageIndex = 1;
  pageSize = 10;
  totals = 1;
  listOfData = [];
  loading = true;

  constructor() { }

  ngOnInit() {
    this.sysTime

    for (var i = 0; i < 1000; i++) {
      this.data.push(this.randomData());
    }
    this.lineOption = {
      title: {
        text: '玩家人流量'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          params = params[0];
          var date = new Date(params.name);
          return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }
      },
      series: [{
        name: '模拟数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: this.data
      }]
    };

    this.pieOption = {
      // title : {
      //     text: '某站点用户访问来源',
      //     subtext: '纯属虚构',
      //     x:'center'
      // },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} 台({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['已使用', '未使用']
      },
      series: [
        {
          name: '服务器使用率',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 10, name: '已使用' },
            { value: 3, name: '未使用' },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 5,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

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

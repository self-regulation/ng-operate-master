import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { DoughnutPie } from '@shared/utils/doughnutpie';
import { basicLine, AverageTimeData, DefaultPie } from '@shared';
import { SimpleBar } from '@shared/utils/simpleBar';
import { DashboardServer } from './dashboard.server';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  providers: [DashboardServer]
})
export class DashboardComponent implements OnInit {
  operatSystem: any = null;
  serverSystem: any = null;

  now: any = +new Date(1997, 9, 3);
  oneDay = 24 * 3600 * 1000;
  value = Math.random() * 1000;

  monitorLoading: any = {
    newUserInfo: false,
    rechargeInfo: false,
    activeUserInfo: false,
    userRetainInfo: false,
    userTrendInfo: false,
    onlineTimeInfo: false,
  };
  newUserInfo: any = null;  //新增玩家
  rechargeInfo: any = null;  //充值额信息
  activeUserInfo: any = null; //活跃玩家信息
  userRetainInfo: any = null; //玩家留存
  userTrendInfo: any = null;  //玩家活跃趋势信息
  userActiveInfo: any = null; //活跃玩家信息（用于获取实时在线用户等）
  onlineTimeInfo: any = null;  //玩家在线时长统计
  serverInfoList: any = []; //服务器信息

  trendUnit: any = 'hour'; //玩家活跃趋势粒度
  onlineUnit: any = 'hour'; //玩家在线时长粒度
  curTime: any = moment().format("YYYY-MM-DD");

  pageNum: number = 1;
  pageSize: number = 5;
  pageSizeOptions = [5, 10, 20, 30, 40, 50];
  totals = 0;
  tableLoading = true;
  constructor(private dashboardServer: DashboardServer) { }

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

    this.serverSystem = DefaultPie({
      title: '服务器使用情况',
      seriesData: [
        { value: 10, name: '已使用' },
        { value: 3, name: '未使用' },
      ],
      unit: '%',
      legend: ['已使用', '未使用']
    });


    this.getNewUserInfo();
    this.getRechargeInfo();
    this.getActiveUserInfo();
    this.getUserRetainInfo();
    this.getUserTrend();
    this.getOnlineTime({
      startTime: moment().startOf('day').format("YYYY-MM-DD HH:mm:ss"),
      endTime: moment().format("YYYY-MM-DD HH:mm:ss")
    });
    this.getServerInfo();
  }
  //查询新增玩家
  getNewUserInfo() {
    this.dashboardServer.getNewUserInfo().subscribe((res: any) => {
      this.monitorLoading.newUserInfo = true;
      if (res.code == 0) {
        this.newUserInfo = res.data;
      } else {
        this.newUserInfo = null;
      }
    });
  }
  //充值金额查询
  getRechargeInfo() {
    this.dashboardServer.getRecharge().subscribe((res: any) => {
      console.log(res);
      this.monitorLoading.rechargeInfo = true;
      if (res.code == 0) {
        this.rechargeInfo = res.data;
      } else {
        this.rechargeInfo = null;
      }
    });
  }
  //活跃玩家查询
  getActiveUserInfo() {
    this.dashboardServer.getActiveUser().subscribe((res: any) => {
      this.monitorLoading.activeUserInfo = true;
      if (res.code == 0) {
        this.activeUserInfo = res.data;
      } else {
        this.activeUserInfo = null;
      }
    });
  }
  //玩家留存查询
  getUserRetainInfo() {
    this.dashboardServer.getUserRetainInfo().subscribe((res: any) => {
      this.monitorLoading.userRetainInfo = true;
      if (res.code == 0) {
        this.userRetainInfo = res.data;
      } else {
        this.userRetainInfo = null;
      }
    });
  }
  //玩家活跃趋势
  getUserTrend(params?: any) {
    this.monitorLoading.userTrendInfo = false;
    this.dashboardServer.getUserTrend(params ? params : null).subscribe((res: any) => {
      this.monitorLoading.userTrendInfo = true;
      if (res.code == 0) {
        this.userActiveInfo = res.data;
        if (res.data && res.data.data.length > 0) {
          let xData = [], seriesData = [], minNum, maxNum;
          xData = res.data.data.map((item: any) => {
            return item.Time;
          });
          seriesData = res.data.data.map((item: any) => {
            return item.Count;
          });
          // console.log("@@@@@@@@@@@@@");
          // console.log(Math.min(...seriesData) + '#######' + Math.max(...seriesData));
          // console.log(Math.floor(Math.min(...seriesData) / 10) * 10 + '#######' + Math.ceil(Math.max(...seriesData) / 9.5) * 10);
          minNum = Math.floor(Math.min(...seriesData) / 10) * 10;
          maxNum = Math.ceil(Math.max(...seriesData) / 9.5) * 10;
          this.userTrendInfo = basicLine(
            {
              name: '启动游戏人数',
              type: 'line',
              data: seriesData
            },
            xData,
            ['启动游戏人数'],
            '人',
            '玩家活跃趋势',
            minNum,
            maxNum,
            10
          );
        } else {
          this.userTrendInfo = null;
        }
      } else {
        this.userTrendInfo = null;
      }
    });
  }
  //玩家在线时长统计
  getOnlineTime(params: any) {
    this.monitorLoading.onlineTimeInfo = false;
    this.dashboardServer.getOnlineTime(params).subscribe((res: any) => {
      this.monitorLoading.onlineTimeInfo = true;
      if (res.code == 0) {
        if (JSON.stringify(res.data) != '{}') {
          let seriesData = [];
          for (let item in res.data) {
            let data = {};
            data["value"] = res.data[item];
            switch (item) {
              case '0,1':
                data["name"] = '小于1H';
                seriesData.push(data);
                break;
              case '1,2':
                data["name"] = '1H~2H';
                seriesData.push(data);
                break;
              case '2,3':
                data["name"] = '2H~3H';
                seriesData.push(data);
                break;
              case '3,5':
                data["name"] = '3H~5H';
                seriesData.push(data);
                break;
              case '5,8':
                data["name"] = '5H~8H';
                seriesData.push(data);
                break;
              case '8,12':
                data["name"] = '8H~12H';
                seriesData.push(data);
                break;
              case '12,720':
                data["name"] = '大于12H';
                seriesData.push(data);
                break;
            }
          }
          this.onlineTimeInfo = DoughnutPie({
            legendData: ['小于1H', '1H~2H', '2H~3H', '3H~5H', '5H~8H', '8H~12H', '大于12H'],
            seriesName: '游戏时间统计',
            seriesData: seriesData
          });
        } else {
          this.onlineTimeInfo = null
        }

      } else {
        this.onlineTimeInfo = null;
      }
      console.log(res);
    });
  }

  changeOnlineUnit($event) {
    this.onlineUnit = $event;
    let params = {
      startTime: '',
      endTime: ''
    };
    if ($event == 'hour') {
      params.startTime = moment().startOf('day').format("YYYY-MM-DD HH:mm:ss");
      params.endTime = moment().format("YYYY-MM-DD HH:mm:ss");
    } else if ($event == 'day') {
      params.startTime = moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss');
      params.endTime = moment().format('YYYY-MM-DD HH:mm:ss');
    } else if ($event == 'week') {
      params.startTime = moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss');
      params.endTime = moment().format('YYYY-MM-DD HH:mm:ss');
    }
    this.getOnlineTime(params);
  }

  //玩家活跃趋势
  changeTrendUnit($event) {
    console.log($event);
    this.trendUnit = $event;
    let params = {
      startTime: '',
      endTime: ''
    };
    if ($event == 'hour') {
      params = null;
    } else if ($event == 'day') {
      params.startTime = moment().subtract(7, 'days').format('YYYY-MM-DD'),
        params.endTime = moment().format('YYYY-MM-DD')
    } else if ($event == 'week') {
      params.startTime = moment().subtract(30, 'days').format('YYYY-MM-DD'),
        params.endTime = moment().format('YYYY-MM-DD')
    }
    this.getUserTrend(params);
  }

  //服务器信息
  getServerInfo() {
    this.tableLoading = true;
    let params = {
      pageNum: this.pageNum,
      pageSize: this.pageSize
    };
    this.dashboardServer.getServerInfo(params).subscribe((res: any) => {
      this.tableLoading = false;
      if (res.code == 0) {
        this.totals = res.data.total;
        this.serverInfoList = res.data.list;
      } else {
        this.serverInfoList = [];
      }
    });
  }

  changePage($event) {
    this.pageNum = $event;
    this.getServerInfo();
  }

  changePageSize($event) {
    this.pageSize = $event;
    this.getServerInfo();
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

  format(val: number) {
    return `<span style="font-weight: blod !important;">${val}</span>台`;
  }

  getFlagByNum(param: any): any {
    if (param) {
      return (param.split('%')[0] - 0) >= 0 ? true : false
    }
    return true;
  }
}

import { Component } from '@angular/core';

@Component({
  selector: "home-page",
  // styleUrls: ["./home.component.less"],
  // templateUrl: "./home.component.html",
  template: `
    <div class="home-page">
    <div class="home-logo">
    <a >
      <img src="../../../assets/tmp/img/seasun.png" alt="云游戏"/>
      <p style="font-size: 48px;color:#fff;font-weight:bold;float:right;">&nbsp;&nbsp;·&nbsp;&nbsp;云游戏</p>
      
    </a>
    <div class="text-right">
    </div>
  </div>
    </div>
    `,
  styles: [
    `

            .home-page {
                background: url('../../../assets/tmp/img/login-bg.png') repeat;
                width: 100%;
                height: 100%;
                background-size: 25% auto;
                position: relative;
                overflow: hidden;
                min-height: 1000px;
                zoom: 1;
              }
              .home-page:after{
                display: block;
                clear:both;
                content:"";
                visibility:hidden;
                height:0;
              }
              .home-logo{
                position:absolute;
                top:30%;
                left:40%;

              }
              .home-logo img{
                width: 193px;
                height: 65px;
              }

              .home-logo p{
                color: #ffffff;
                font-size: 14px;
                margin-bottom:0px;
              }      

        `
  ]
})
export class HomePageComponent {
  constructor() {

  }
}
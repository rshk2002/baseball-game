import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { User } from '../model/user';
import { ConfigService } from '../config/config.service';
import { ClrDatagridSortOrder } from '@clr/angular';
import { ClrDatagridStateInterface } from '@clr/angular';
import { FetchResult, Inventory } from '../inventory/inventory';

@Component({
  selector: 'app-ranking',
  // providers: [Inventory],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RankingComponent implements OnInit {
  updateTime = '';
  // ascSort = ClrDatagridSortOrder.ASC
  // descSort = ClrDatagridSortOrder.DESC
  // tslint:disable: comment-format
  users: User[];
  total: number;
  loading: boolean = true;

  from: number;
  to: number;

  constructor(private config: ConfigService, private inventory: Inventory) {
    console.log('>>> ranking component constructor');
    // 통계 가져오는 방법1. 전체통계 한꺼번에 가져오는 경우 활성화
    // this.getStatsAll();

    // 통계 가져오는 방법2. server-driven
    // serverdriven 사용하는 경우 활성화
    this.reset();
  }

  ngOnInit() {
    console.log('>>> ranking component ngOnInit');
  }

  isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  // 한번에 전체 통계 가져오기
  getStatsAll() {
    console.log('>>> getStatsAll()');
    this.config.users = [];
    this.config.reqStatsAll().subscribe(
      res => {
        console.log('res: ', res);
        this.updateTime = res.updateTime;
        console.log(this.updateTime);
        const resStats = JSON.parse(res['stats']);

        for (const data of resStats['data']) {
          const user: User = new User();
          user.nickname = data[0];
          user.gameCnt = data[1];
          user.winCnt = data[2];
          user.winTryCnt = data[3];
          user.tryCntAll = data[4];
          if (this.isNullOrUndefined(data[5])) {
            user.winTryAvg = data[5];
          } else {
            user.winTryAvg = +data[5].toFixed(1);
          }
          user.tryCntAvg = +data[6].toFixed(1);
          user.winRate = +(data[7].toFixed(1) * 100);

          this.config.users.push(user);
        }
        console.log(this.config.users);
      },
      err => {
        console.error('reqStats().subscribe ERROR');
      }
    );
  }

  // server-driven
  reset() {
    console.log('>>> reset()');
    this.users = [];
    this.loading = true;
  }

  // state에서 페이지 정보 받아 한페이지 서버에서 가져오기
  refresh(state: ClrDatagridStateInterface) {
    this.reset(); // users는 비우고 다시 해당 페이지 데이터만 가져와야함.
    console.log('>>> refresh() ---------------------------------------------------------');
    console.log('state: ', state);
    console.log('state.page.from: ', state.page.from);
    console.log('state.page.to: ', state.page.to);
    console.log('state.page.size: ', state.page.size);
    this.from = state.page.from;
    this.to = state.page.to;
    console.log('this.from', this.from);
    console.log('this.to', this.to);

    this.inventory
      .fetch(state.page.from, state.page.size)
      .then((result: FetchResult) => {
        console.log('>>> inventory.then()');
        this.users = result.users;
        this.total = result.total;
        this.updateTime = result.updateTime;
        this.loading = false;
        console.log('this.result: ', result);
        console.log('this.users: ', this.users);
        console.log('this.total: ', this.total);
      });
  }
}

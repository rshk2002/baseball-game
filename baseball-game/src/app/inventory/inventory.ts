import { User } from '../model/user';
import { ConfigService } from '../config/config.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Inventory {
  public updateTime = '';
  public total: number;
  private currentQuery: User[] = [];

  constructor(private config: ConfigService) {
    console.log('>>> Inventory constructor');
  }

  private isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  // 한페이지 데이터 서버에서 가져오기
  fetch(from: number, size: number): Promise<FetchResult> {
    console.log('>>> fetch()');
    console.log('from, size: ', from, size);

    this.currentQuery = [];

    return new Promise((resolve, reject) => {
      console.log('>>> Promise');
      const rowRange = [from, from + size];
      // from, from+size-1: 페이지 시작과 마지막 row index
      // (서버에서[f:t]로 가져올 때 -1됨)
      this.config.reqStatsPage(rowRange).subscribe(
        res => {
          console.log('res: ', res);
          res = JSON.parse(JSON.stringify(res));
          const resStats = res['stats'];
          console.log('resStats: ', resStats);
          console.log('res[\'total\']', res['total']);
          this.total = res['total'];
          console.log('this.total', this.total);
          this.updateTime = res.updateTime;
          console.log(this.updateTime);
          for (const data of resStats) {
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
            // console.log('user: ', user);
            this.currentQuery.push(user);
          }
          const result: FetchResult = {
            users: this.currentQuery,
            total: this.total,
            updateTime: this.updateTime
          };
          console.log('this.total: ', this.total);
          console.log('this.currentQuery: ', this.currentQuery);
          console.log('result: ', result);
          resolve(result);
        },
        err => {
          console.warn('reqStats().subscribe ERROR');
        }
      );
    });
  }

}

export interface FetchResult {
  total: number;
  users: User[];
  updateTime: string;
}

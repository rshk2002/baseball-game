import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Input } from '../model/input';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private BASE_URL = environment.apiUrl;

  public userKey = '';
  public phase = -1;

  public messages: Input[] = [];

  public nickname = '';
  public offenseNum = '';

  public users: User[] = [];

  constructor(private http: HttpClient) {
    console.log('>>> ConfigService constructor');
  }

  // server2.py로 보내는 요청
  // 닉네임 생성
  reqCreate2(body: any): Observable<any> {
    console.log('>>> reqCreate2()');
    return this.http.post<any>(
      this.BASE_URL + '/create/' + this.nickname,
      body
    );
  }
  // 사용자가 입력한 숫자 제출하고 결과 받아옴
  reqSubmit2(body: any): Observable<any> {
    console.log('>>> reqSubmit2()');
    return this.http.post<any>(this.BASE_URL + '/judge/' + this.userKey, body);
  }
  // 서버에서 통계 전체 가져옴
  reqStatsAll(): Observable<any> {
    console.log('>>> reqStatAll()');
    return this.http.get<any>(this.BASE_URL + '/stats/all');
  }
  // 서버에서 통계 부분적으로 가져옴
  reqStatsPage(rowRange: Array<number>): Observable<any> {
    console.log('>>> reqStatsPage()');
    console.log('rowRange[0]: ', rowRange[0]);
    console.log('rowRange[1]: ', rowRange[1]);
    return this.http.get<any>(
      this.BASE_URL + '/stats/page/' + rowRange[0] + '/' + rowRange[1]
    );
  }

  // server.py로 보내는 요청
  // reqCreate(): Observable<any> {
  //   return this.http.get<any>(this.BASE_URL + '/create');
  // }
  // reqSubmit(body: any): Observable<any> {
  //   return this.http.post<any>(this.BASE_URL + '/judge', body);
  // }
}

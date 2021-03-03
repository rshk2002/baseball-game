import { Component, OnInit } from '@angular/core';
// import { AppComponent } from '../app.component';
import { Input } from '../model/input';
import { ConfigService } from 'src/app/config/config.service';


@Component({
  selector: 'app-select-num',
  templateUrl: './select-num.component.html',
  styleUrls: ['./select-num.component.css']
})


export class SelectNumComponent implements OnInit {
  showResult = false;
  // messages: Input[] = [];
  offenseNumList: number[];
  tryCnt = 0;

  constructor(private config: ConfigService) {
    // config.showForm = true;
    console.log('[select-num.component.ts] constructor start');
    console.log('[select-num.component.ts] this.config.userkey', this.config.userKey); //play.component에서 할당한 키
  }

  ngOnInit() {
  }

  checkInput(offenseNum: string) {
    console.log("offenseNum: ", offenseNum)
    if (offenseNum === '000') {
      // 000입력시 정답처리
      this.submit2(0, 0, 0);
    } else {
      const oNum0: number = parseInt(offenseNum.charAt(0));
      const oNum1: number = parseInt(offenseNum.charAt(1));
      const oNum2: number = parseInt(offenseNum.charAt(2));
      const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

      if (oNum0 in digits && oNum1 in digits && oNum2 in digits && oNum0 !== oNum1 && oNum1 !== oNum2 && oNum0 !== oNum2) {
        this.submit2(oNum0, oNum1, oNum2);
      } else {
        alert('0-9 중 서로 다른 세 수를 입력하세요.(예: 045)');
      }
    }
  }

  submit2(oNum0: number, oNum1: number, oNum2: number) {
    const input: Input = new Input();
    // console.log('submit() offenseNum: ', offenseNum);
    // console.log('type of offenseNum: ', typeof(offenseNum));
    input.num0 = oNum0;
    input.num1 = oNum1;
    input.num2 = oNum2;
    const num012 = String(oNum0).concat(String(oNum1), String(oNum2));
    this.config.offenseNum = num012;
    console.log('[select-num.component.ts] offenseNum.charat[0]: ', oNum0);
    console.log('[select-num.component.ts] offenseNum.charat[1]: ', oNum1);
    console.log('[select-num.component.ts] offenseNum.charat[2]: ', oNum2);
    console.log('[select-num.component.ts] config.offenseNum: ', this.config.offenseNum);
    // this.showResult = true;
    console.log('[select-num.component.ts] this.userKey:', this.config.userKey);

    const body = {
      offenseNum: num012
    };
    console.log('[select-num.component.ts] body:', body);

    this.config.reqSubmit2(body).subscribe(
      res => {
        console.log('[select-num.component.ts] submit2() response arrived: ', res);
        input.strikeCnt = res.result[0];
        input.ballCnt = res.result[1];
        input.outCnt = res.result[2];
        if (res.result[0] === 3) {
          input.msg = '정답입니다 XD';
          this.config.phase = 2;
        } else {
          input.msg = '다시 시도하세요.';
        }

        console.log('[select-num.component.ts]', this.config.messages);
      },
      err => {
        console.log('[select-num.component.ts] ERROR while reqSubmit2!');
      }
    );
    this.config.messages.push(input);
  }

  // submit(oNum0: number, oNum1: number, oNum2: number) {
  // const input: Input = new Input();

  //   // console.log('submit() offenseNum: ', offenseNum);
  //   // console.log('type of offenseNum: ', typeof(offenseNum));
  //   input.num0 = oNum0;
  //   input.num1 = oNum1;
  //   input.num2 = oNum2;
  //   console.log('offenseNum.charat[0]: ', oNum0);
  //   console.log('offenseNum.charat[1]: ', oNum1);
  //   console.log('offenseNum.charat[2]: ', oNum2);
  //   this.offenseNumList = [oNum0, oNum1, oNum2];
  //   // this.showResult = true;
  //   console.log('submit() this.userKey:', this.config.userKey);
  //   const body = {
  //     key: this.config.userKey,
  //     offenseNum: this.offenseNumList
  //   };
  //   console.log('submit() body:', body);
  //   this.config.reqSubmit(body).subscribe(
  //     res => {
  //       console.log('submit() response arrived: ', res);
  //       // const msg = this.toMessage(this.gameCnt, this.offenseNumList, res['result'][0], res['result'][1], res['result'][2])
  //       // this.messages.push(msg)
  //       // if(this.strikeCnt===3){
  //       //   this.messages.push("정답입니다.")
  //       // }
  //       input.strikeCnt = res.result[0];
  //       input.ballCnt = res.result[1];
  //       input.outCnt = res.result[2];
  //       if (res.result[0] === 3) {
  //         input.msg = '정답입니다 XD';
  //         // this.config.showForm = false;
  //         // this.config.showReplayBtn = true;
  //         this.config.phase = 2;

  //       } else {
  //         input.msg = '다시 시도하세요.';
  //       }

  //       console.log(this.config.messages);
  //     },
  //     err => {
  //       console.log('ERROR while reqSubmit!');
  //     }
  //   );
  //   this.config.messages.push(input);
  // }
}

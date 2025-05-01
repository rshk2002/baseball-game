import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-play',
  standalone: true, // ✅ 추가
  imports: [CommonModule, FormsModule],
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  offenseNum: string;
  status = '';
  userKey = '';
  nicknameValues = '';

  nicknameForm = new FormGroup({
    sample: new FormControl('', Validators.required),
  });

  constructor(public config: ConfigService) {}

  ngOnInit() {
    console.log('>>> play ngOnInit');
  }

  onKey(value: string) {
    this.nicknameValues += value + ' | ';
  }

  setNickname(nickname) {
    console.log('>>> setNickname()');
    if (nickname === undefined) {    // 닉네임 입력 안 할 경우
      this.config.nickname = '익명';
    } else {
      this.config.nickname = nickname;
    }
    this.config.phase = 0; // play game 단계로 넘어감
    console.log('config.nickname: ', this.config.nickname);
  }

  playGame2() {
    console.log('>>> playGame2');
    const body = {};
    this.config.reqCreate2(body).subscribe(
      res => {
        console.log(' res: ', res);
        if (res['status'] === 'ok') {
          console.log(' status===ok');
          this.config.userKey = res['key'];
          this.config.phase = 1; // select-num.component.html 이 표시됨
        } else {
          console.error('status===Not ok! res[status]:', res['status']);
        }
      },
      err => {
        console.error('playGame2 Error!');
        this.config.phase = -2;
        console.error('this.config.phase :' + this.config.phase);
        this.status = 'Failure T^T';
      }
    );
  }
  replayGame() {
    this.config.phase = 2;
    this.config.messages.length = 0;
    this.playGame2();
  }
}

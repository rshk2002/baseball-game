import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

type PlayStep = 'nickname' | 'game' | 'result';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
})
export class PlayComponent {
  step: PlayStep = 'nickname';
  nickname: string = '';
  resultMessage: string = '';
  apiURL: string = 'http://localhost:5001';
  guess: string = '';
  gameKey: string = '';
  guessHistory: { input: string; result: [number, number, number] }[] = [];
  gameEnded: boolean = false;

  constructor(private http: HttpClient) {}

  startGame() {
    const trimmed = this.nickname.trim();
    if (!trimmed) return;

    // 닉네임으로 keyfile 생성
    this.http
      .post<{ key: string; status: string }>(
        `${this.apiURL}/create/${trimmed}`,
        {}
      )
      .subscribe({
        next: (res) => {
          this.gameKey = res.key;
          this.step = 'game';
        },
        error: (err) => {
          alert('닉네임 생성 중 오류가 발생했습니다.');
          console.error(err);
        },
      });
  }

  submitGuess() {
    const trimmed = this.guess.trim();

    if (!/^\d{3}$/.test(trimmed)) {
      alert('숫자 3자리를 입력해주세요.');
      return;
    }

    // judge
    // TODO: 중복 숫자 검증도 나중에 추가 가능

    this.http
      .post<{ key: string; status: string; result: [number, number, number] }>(
        `${this.apiURL}/judge/${this.gameKey}`,
        {
          offenseNum: trimmed,
        }
      )
      .subscribe({
        next: (res) => {
          console.log('판정 결과:', res.result);

          const [strike, ball, out] = res.result;

          this.guessHistory.push({
            input: trimmed,
            result: res.result,
          });

          this.resultMessage = `${strike} STRIKE, ${ball} BALL, ${out} OUT`;
          this.guess = ''; // 입력 초기화

          if (strike === 3) {
            this.gameEnded = true;
          }

          this.guess = '';
        },
        error: (err) => {
          alert('숫자 제출 중 오류가 발생했습니다.');
          console.error(err);
        },
      });

    console.log('사용자 입력:', trimmed);

    // 임시로 게임 종료
    // this.finishGame();
  }

  resetGame() {
    this.nickname = '';
    this.guess = '';
    this.resultMessage = '';
    this.guessHistory = [];
    this.gameEnded = false;
    this.step = 'nickname';
  }

  finishGame() {
    this.resultMessage = `${this.nickname}님, 게임이 끝났습니다! 🎉`;
    this.step = 'result';
  }
}

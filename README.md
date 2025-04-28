# ⚾ Baseball Game (숫자 야구 게임)

숫자를 입력하여 정답을 추리하는 웹 기반 숫자 야구 게임입니다.  
Python 서버와 HTML/JavaScript 기반의 프론트엔드로 구성되어 있습니다.


## 📌 목차

1. 프로젝트 소개 (Overview)
2. 실행 방법 (Getting Started)
```
# 1. 저장소 클론
git clone https://github.com/yourname/baseball-game.git
cd baseball-game

# 2. Python 서버 실행

cd baseball-game-server
python3 -m venv venv
. venv/bin/activate
pip install -r requirements.txt
./flask_run.sh

## api documentation
http://localhost:5001

# 3. 프론트엔드 실행
cd ../baseball-game
npm install
ng serve


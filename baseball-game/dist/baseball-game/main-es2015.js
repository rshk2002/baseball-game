(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div style=\"text-align:center\">\n  <h1>\n    Welcome to {{ title }}!\n  </h1>\n</div>\n<div>\n  +-------------------------------------------------------------------------+<br>\n    숫자야구 게임 규칙 <br>\n  +-------------------------------------------------------------------------+<br>\n    컴퓨터가 수비수가 되어 세 자릿수를 하나 골랐습니다. <br>\n    각 숫자는 0~9중에 하나며, 중복되는 숫자는 없습니다. <br>\n    모든 숫자와 위치를 맞히면 승리합니다. <br>\n    숫자와 순서가 둘 다 맞으면 스트라이크입니다. <br>\n    숫자만 맞고 순서가 틀리면 볼입니다. <br>\n    숫자가 틀리면 아웃입니다. <br>\n  +-------------------------------------------------------------------------+<br><br>\n</div>\n<div *ngIf=\"showStartBtn\">\n  <button class=\"btn btn-primary\" (click)=\"playGame()\">START</button>\n</div>\n<p>{{status}}</p>\n\n<app-select-num *ngIf=\"showNum\"></app-select-num>\n<!--<div *ngIf=\"showRestartBtn\">\n  <button class=\"btn btn-primary\" (click)=\"playGame()\">RESTART</button>\n</div>-->\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/select-num/select-num.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/select-num/select-num.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- (click) passes input value to add() and then clears the input -->\n<div *ngIf=\"showForm\">\n0-9 중 서로 다른 세 수를 입력하세요(예: 012)<br>\n  <label>\n    <input id = \"userInput\" type=\"text\" minlength=\"3\" maxlength=\"3\" #userInput (keyup.enter)=\"checkInput(userInput.value); userInput.value='';\">\n  </label>\n  <button (click)=\"checkInput(userInput.value); userInput.value='';\" > submit </button>\n</div>\n<div id=\"showResult\" *ngIf=\"showResult\" >\n  <br>\n  <!-- <p class = \"result\" *ngFor=\"let message of messages\">{{message}}</p> -->\n\n  <div *ngFor=\"let input of messages; let i = index;\" >\n    <!-- <span *ngIf=\"(i+1)%2===0\">*</span> -->\n    {{i+1}}번째 시도: {{input.num0}}{{input.num1}}{{input.num2}} > strike: {{input.strikeCnt}}, ball: {{input.ballCnt}}, out: {{input.outCnt}} --- {{input.msg}}\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "* {\n    text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxrQkFBa0I7QUFDdEIiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIioge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_config_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/config/config.service */ "./src/app/config/config.service.ts");



let AppComponent = class AppComponent {
    constructor(config) {
        this.config = config;
        this.title = 'Ultimate Baseball Game';
        this.showNum = false;
        this.showResult = true;
        this.showStartBtn = true;
        this.showRestartBtn = false;
        this.status = '';
        this.userKey = '';
    }
    playGame() {
        console.log('playGame start');
        this.showStartBtn = false;
        // this.showRestartBtn = false;
        this.config.reqCreate().subscribe(res => {
            console.log(res);
            if (res['status'] === 'ok') {
                this.showNum = true;
                this.userKey = res['key'];
            }
            else {
                console.log('Not ok! - ' + res['status']);
            }
        }, err => {
            console.log('Error!');
            this.status = 'Failure :( ';
        });
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_config_config_service__WEBPACK_IMPORTED_MODULE_2__["ConfigService"]])
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/fesm2015/clr-angular.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _select_num_select_num_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./select-num/select-num.component */ "./src/app/select-num/select-num.component.ts");








let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
            _select_num_select_num_component__WEBPACK_IMPORTED_MODULE_7__["SelectNumComponent"],
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
            _clr_angular__WEBPACK_IMPORTED_MODULE_4__["ClarityModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/config/config.service.ts":
/*!******************************************!*\
  !*** ./src/app/config/config.service.ts ***!
  \******************************************/
/*! exports provided: ConfigService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigService", function() { return ConfigService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");




let ConfigService = class ConfigService {
    constructor(http) {
        this.http = http;
        this.BASE_URL = src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl;
    }
    reqCreate() {
        return this.http.get(this.BASE_URL + '/create');
    }
    reqSubmit(body) {
        return this.http.post(this.BASE_URL + '/judge', body);
    }
};
ConfigService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], ConfigService);



/***/ }),

/***/ "./src/app/model/input.ts":
/*!********************************!*\
  !*** ./src/app/model/input.ts ***!
  \********************************/
/*! exports provided: Input */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return Input; });
class Input {
}


/***/ }),

/***/ "./src/app/select-num/select-num.component.css":
/*!*****************************************************!*\
  !*** ./src/app/select-num/select-num.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "p.result{\n    margin:2px\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VsZWN0LW51bS9zZWxlY3QtbnVtLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSTtBQUNKIiwiZmlsZSI6InNyYy9hcHAvc2VsZWN0LW51bS9zZWxlY3QtbnVtLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJwLnJlc3VsdHtcbiAgICBtYXJnaW46MnB4XG59Il19 */"

/***/ }),

/***/ "./src/app/select-num/select-num.component.ts":
/*!****************************************************!*\
  !*** ./src/app/select-num/select-num.component.ts ***!
  \****************************************************/
/*! exports provided: SelectNumComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectNumComponent", function() { return SelectNumComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app.component */ "./src/app/app.component.ts");
/* harmony import */ var _model_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../model/input */ "./src/app/model/input.ts");
/* harmony import */ var src_app_config_config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/config/config.service */ "./src/app/config/config.service.ts");





let SelectNumComponent = class SelectNumComponent {
    constructor(appComponent, config) {
        this.appComponent = appComponent;
        this.config = config;
        this.showForm = true;
        this.showResult = false;
        this.userKey = this.appComponent.userKey;
        this.messages = [];
        this.tryCnt = 0;
    }
    ngOnInit() {
    }
    // toMessage(gameCnt, offenseNumList, strikeCnt, ballCnt, outCnt) {
    //   const msg: string = gameCnt + '번째 시도: ' + offenseNumList + ' --> strike: ' + strikeCnt + ', ball: ' + ballCnt + ', out: ' + outCnt;
    //   return msg;
    // }
    checkInput(offenseNum) {
        const oNum0 = parseInt(offenseNum.charAt(0));
        const oNum1 = parseInt(offenseNum.charAt(1));
        const oNum2 = parseInt(offenseNum.charAt(2));
        const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        if (oNum0 in digits && oNum1 in digits && oNum2 in digits && oNum0 !== oNum1 && oNum1 !== oNum2 && oNum0 !== oNum2) {
            this.submit(oNum0, oNum1, oNum2);
        }
        else {
            alert('0-9 중 서로 다른 세 수를 입력하세요.(예: 045)');
        }
    }
    submit(oNum0, oNum1, oNum2) {
        const input = new _model_input__WEBPACK_IMPORTED_MODULE_3__["Input"]();
        this.tryCnt = this.tryCnt + 1;
        input.tryCnt = this.tryCnt;
        // console.log('submit() offenseNum: ', offenseNum);
        // console.log('type of offenseNum: ', typeof(offenseNum));
        input.num0 = oNum0;
        input.num1 = oNum1;
        input.num2 = oNum2;
        console.log('offenseNum.charat[0]: ', oNum0);
        console.log('offenseNum.charat[1]: ', oNum1);
        console.log('offenseNum.charat[2]: ', oNum2);
        this.offenseNumList = [oNum0, oNum1, oNum2];
        this.showResult = true;
        console.log('submit() this.userKey:', this.userKey);
        const body = {
            key: this.userKey,
            offenseNum: this.offenseNumList
        };
        console.log('submit() body:', body);
        this.config.reqSubmit(body).subscribe(res => {
            console.log('submit() response arrived: ', res);
            // const msg = this.toMessage(this.gameCnt, this.offenseNumList, res['result'][0], res['result'][1], res['result'][2])
            // this.messages.push(msg)
            // if(this.strikeCnt===3){
            //   this.messages.push("정답입니다.")
            // }
            input.strikeCnt = res.result[0];
            input.ballCnt = res.result[1];
            input.outCnt = res.result[2];
            if (res.result[0] === 3) {
                input.msg = '정답입니다 XD';
                this.showForm = false;
                // this.appComponent.showRestartBtn = true;
            }
            else {
                input.msg = '다시 시도하세요.';
            }
            console.log(this.messages);
        }, err => {
            console.log('ERROR while reqSubmit!');
        });
        this.messages.push(input);
    }
};
SelectNumComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-select-num',
        template: __webpack_require__(/*! raw-loader!./select-num.component.html */ "./node_modules/raw-loader/index.js!./src/app/select-num/select-num.component.html"),
        styles: [__webpack_require__(/*! ./select-num.component.css */ "./src/app/select-num/select-num.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"], src_app_config_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"]])
], SelectNumComponent);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    // apiUrl: 'http://192.168.20.59:5000'
    // apiUrl: 'http://192.168.20.62:5000'
    apiUrl: 'http://34.83.202.136:5000'
    // apiUrl: 'http://localhost:5000'
    //apiUrl: ui_domain
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /mnt/c/Users/SEHUI/Projects/git/baseballgame_Angular_Flask/baseball-game/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map
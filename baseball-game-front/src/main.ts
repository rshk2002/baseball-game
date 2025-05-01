import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []), // 기존 라우터, zone 감지 등 유지
    provideHttpClient()             // 여기에만 추가
  ]
})
  .catch((err) => console.error(err));

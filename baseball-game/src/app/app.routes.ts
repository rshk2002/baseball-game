// app.routes.ts
import { Routes } from '@angular/router';

import { SelectNumComponent } from './select-num/select-num.component';
import { SettingsComponent } from './settings/settings.component';
import { InstructionComponent } from './instruction/instruction.component';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { RankingComponent } from './ranking/ranking.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'play', component: PlayComponent },
  { path: 'instructions', component: InstructionComponent },
  { path: 'ranking', component: RankingComponent }
];

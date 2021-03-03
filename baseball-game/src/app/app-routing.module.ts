import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectNumComponent } from './select-num/select-num.component';
import { SettingsComponent } from './settings/settings.component';
import { InstructionComponent } from './instruction/instruction.component';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { RankingComponent } from './ranking/ranking.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'play', component: PlayComponent },
  { path: 'instructions', component: InstructionComponent },
  { path: 'ranking', component: RankingComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, { useHash: true })]
})

export class AppRoutingModule {

}

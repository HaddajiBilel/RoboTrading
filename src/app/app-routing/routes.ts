import { Routes } from '@angular/router';

import { WelcomeComponent } from '../pages/welcome/welcome.component';
import { MonitorComponent } from '../pages/monitor/monitor.component';

export const routes: Routes =[

  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'monitor', component: MonitorComponent }
];
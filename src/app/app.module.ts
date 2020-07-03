import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  } from '@angular/core';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';

//NG-Zorro UI dependencies
import { IconsProviderModule } from './icons-provider.module';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { NzInputModule } from 'ng-zorro-antd/input';

//components 
import { ChartComponent } from './pages/monitor/chart/chart.component';
import { ModelComponent } from './pages/monitor/model/model.component';
import { MonitorComponent } from './pages/monitor/monitor.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
registerLocaleData(en);

//Services
import { ApiCommService } from './services/api-comm.service'


@NgModule({
  declarations: [
    AppComponent,
    MonitorComponent,
    WelcomeComponent,
    ModelComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzCollapseModule,
    NzSelectModule,
    NzGridModule,
    NzSpaceModule,
    NzCardModule,
    NzButtonModule,
    NzInputNumberModule,
    NzInputModule,
    NzRadioModule,
    NzModalModule,
    NzDescriptionsModule,
    NzDividerModule,
    NzMessageModule,
    NzToolTipModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, ApiCommService],
  bootstrap: [AppComponent]
})
export class AppModule { }

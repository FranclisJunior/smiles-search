import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home.component';
import { SidebarModule } from 'src/app/shared/components/sidebar/sidebar.module';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';
import { BreadcrumbModule } from 'src/app/shared/components/breadcrumb/breadcrumb.module';
import { SpinnerModule } from 'src/app/core/component/spinner/spinner.module';
import { SearchFlightsComponent } from '../search-flights /search-flights.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessageModule } from 'src/app/core/component/control-message/control-message.module';
import { LoadingButtonModule } from 'src/app/core/component/loading-button/loading-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ControlMessageModule,
    LoadingButtonModule,
    RouterModule,
    HeaderModule,
    BreadcrumbModule,
    SidebarModule,
    FooterModule,
    SpinnerModule
  ],
  declarations: [HomeComponent, SearchFlightsComponent],
  providers: [HomeComponent, SearchFlightsComponent]
})
export class HomeModule { }

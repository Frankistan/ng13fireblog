// MODULES
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CustomMaterialModule } from './modules/custom-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

// COMPONENTS
import { AppComponent } from './app.component';
import { BtnMenuComponent } from './layout/btn-menu/btn-menu.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavToolbarComponent } from './layout/nav-toolbar/nav-toolbar.component';
import { TableComponent } from './pages/table/table.component';
import { BtnLanguageSelectorComponent } from './layout/btn-language-selector/btn-language-selector.component';
import { I18nService } from './services/i18n.service';
import { SidenavContentComponent } from './layout/sidenav-content/sidenav-content.component';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        NavToolbarComponent,
        BtnMenuComponent,
        TableComponent,
        BtnLanguageSelectorComponent,
        SidenavContentComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CustomMaterialModule,
        FlexLayoutModule,
        TranslateModule.forRoot(),
    ],
    providers: [I18nService],
    bootstrap: [AppComponent]
})
export class AppModule { }

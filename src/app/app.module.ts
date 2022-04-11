// MODULES
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CustomFirebaseModule } from './modules/custom-firebase.module';
import { CustomMaterialModule } from './modules/custom-material.module';
import { CustomTinymceModule } from './modules/custom-tinymce.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MomentModule } from "ngx-moment";
import { TranslateModule } from '@ngx-translate/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
// MIX
import { environment } from '@env/environment';
// SERVICES
import { I18nService } from './services/i18n.service';
import { CustomTitleService } from './services/custom-title.service';
import { NotificationService } from './services/notification.service';
import { SettingsService } from './services/settings.service';
import { StoreService } from './services/store.service';
import { PaginatorService } from './services/paginator.service';
// DIRECTIVES
import { NavBarButtonsDirective } from './directives/nav-bar-buttons.directive';
// GUARDS
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { DiscardChangesGuard } from './guards/discard-changes.guard';
// COMPONENTS
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthToolbarComponent } from './layout/toolbar/auth-toolbar/auth-toolbar.component';
import { BtnLanguageSelectorComponent } from './layout/btn-language-selector/btn-language-selector.component';
import { BtnMenuComponent } from './layout/btn-menu/btn-menu.component';
import { BtnMoreComponent } from './layout/btn-more/btn-more.component';
import { BtnProfileComponent } from './layout/btn-profile/btn-profile.component';
import { BtnSearchComponent } from './layout/btn-search/btn-search.component';
import { BtnSortByComponent } from './layout/btn-sort-by/btn-sort-by.component';
import { BtnViewComponent } from './layout/btn-view/btn-view.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DefaultToolbarComponent } from './layout/toolbar/default-toolbar/default-toolbar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { NavToolbarComponent } from './layout/toolbar/nav-toolbar/nav-toolbar.component';
import { PostComponent } from './pages/post/post/post.component';
import { PostFormComponent } from './pages/post/post-form/post-form.component';
import { PostListComponent } from './pages/post/post-list/post-list.component';
import { PostListElementComponent } from './pages/post/post-list-element/post-list-element.component';
import { PostShowComponent } from './pages/post/post-show/post-show.component';
import { PostToolbarComponent } from './layout/toolbar/post-toolbar/post-toolbar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SidenavContentComponent } from './layout/sidenav-content/sidenav-content.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { TableComponent } from './pages/table/table.component';



@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        BtnLanguageSelectorComponent,
        BtnMenuComponent,
        BtnMoreComponent,
        BtnSearchComponent,
        BtnSortByComponent,
        BtnViewComponent,
        DashboardComponent,
        LoginComponent,
        NavBarButtonsDirective,
        NavToolbarComponent,
        PostComponent,
        PostFormComponent,
        PostListComponent,
        PostListElementComponent,
        PostShowComponent,
        ProfileComponent,
        ResetPasswordComponent,
        SettingsComponent,
        SidenavContentComponent,
        SignupComponent,
        TableComponent,
        PostToolbarComponent,
        AuthToolbarComponent,
        DefaultToolbarComponent,
        BtnProfileComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        CustomFirebaseModule,
        CustomMaterialModule,
        CustomTinymceModule,
        FlexLayoutModule,
        FormsModule,
        MomentModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        ScrollingModule,
    ],
    providers: [
        I18nService,
        CustomTitleService,
        NotificationService,
        AuthGuard,
        LoggedInGuard,
        SettingsService,
        // DiscardChangesGuard,
        StoreService,
        PaginatorService,
        CustomTitleService,
        {
            provide: APP_INITIALIZER,
            useFactory: initFunction,
            deps: [CustomTitleService, I18nService],
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

export function initFunction(customTitleService: CustomTitleService, i18nService: I18nService) {
    return () => {
        i18nService.init(environment.defaultLanguage, environment.supportedLanguages);
        customTitleService.init();
    }
}
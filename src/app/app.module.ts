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
import { MaterialFileInputModule } from 'ngx-material-file-input';
// MIX
import { environment } from '@env/environment';
// SERVICES
import { CustomTitleService } from './services/custom-title.service';
import { I18nService } from './services/i18n.service';
import { NotificationService } from './services/notification.service';
import { PaginatorService } from './services/paginator.service';
import { ProfileService } from './services/profile.service';
import { SettingsService } from './services/settings.service';
import { StoreService } from './services/store.service';
// DIRECTIVES
import { NavBarButtonsDirective } from './directives/nav-bar-buttons.directive';
// GUARDS
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { DiscardChangesGuard } from './guards/discard-changes.guard';
// COMPONENTS
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuardModule } from '@angular/fire/auth-guard';
import { AuthToolbarComponent } from './layout/toolbar/auth-toolbar/auth-toolbar.component';
import { BtnLanguageSelectorComponent } from './layout/btn-language-selector/btn-language-selector.component';
import { BtnMenuComponent } from './layout/btn-menu/btn-menu.component';
import { BtnMoreComponent } from './layout/btn-more/btn-more.component';
import { BtnProfileComponent } from './layout/btn-profile/btn-profile.component';
import { BtnSearchComponent } from './layout/btn-search/btn-search.component';
import { BtnViewComponent } from './layout/btn-view/btn-view.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DefaultToolbarComponent } from './layout/toolbar/default-toolbar/default-toolbar.component';
import { FabCreatePostComponent } from './layout/fab-create-post/fab-create-post.component';
import { FabEditPostComponent } from './layout/fab-edit-post/fab-edit-post.component';
import { FileUploadComponent } from './layout/file-upload/file-upload.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { NavToolbarComponent } from './layout/toolbar/nav-toolbar/nav-toolbar.component';
import { PostComponent } from './pages/post/post/post.component';
import { PostFormComponent } from './pages/post/post-form/post-form.component';
import { PostListComponent } from './pages/post/post-list/post-list.component';
import { PostShowComponent } from './pages/post/post-show/post-show.component';
import { PostToolbarComponent } from './layout/toolbar/post-toolbar/post-toolbar.component';
import { PostVirtualElementComponent } from './pages/post/post-virtual-list/post-virtual-element/post-virtual-element.component';
import { PostVirtualListComponent } from './pages/post/post-virtual-list/post-virtual-list.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SidenavContentComponent } from './layout/sidenav-content/sidenav-content.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { FeaturedImageComponent } from './layout/featured-image/featured-image.component';
import { FileUploadDialogComponent } from './layout/dialogs/file-upload-dialog/file-upload-dialog.component';
import { TestUploadDialogComponent } from './test/test-upload-dialog/test-upload-dialog.component';
import { DropzoneDirective } from './directives/dropzone.directive';


/*
https://openbase.com/
https://fonts.google.com/
https://material.angular.io/
https://firebase.google.com/
https://tburleson-layouts-demos.firebaseapp.com/
https://css2sass.herokuapp.com/

*/

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        BtnLanguageSelectorComponent,
        DropzoneDirective,
        BtnMenuComponent,
        BtnMoreComponent,
        BtnSearchComponent,
        BtnViewComponent,
        DashboardComponent,
        LoginComponent,
        NavBarButtonsDirective,
        NavToolbarComponent,
        PostComponent,
        PostFormComponent,
        PostShowComponent,
        ProfileComponent,
        ResetPasswordComponent,
        SettingsComponent,
        SidenavContentComponent,
        SignupComponent,
        PostListComponent,
        PostToolbarComponent,
        AuthToolbarComponent,
        DefaultToolbarComponent,
        BtnProfileComponent,
        PostVirtualListComponent,
        PostVirtualElementComponent,
        FabEditPostComponent,
        FabCreatePostComponent,
        FileUploadComponent,
        FeaturedImageComponent,
        FileUploadDialogComponent,
        TestUploadDialogComponent,
        DropzoneDirective,

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
        AuthGuardModule,
        MaterialFileInputModule,
    ],
    entryComponents: [FileUploadDialogComponent],
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
        ProfileService,
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
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { PostComponent } from './pages/post/post/post.component';
import { PostFormComponent } from './pages/post/post-form/post-form.component';
import { PostShowComponent } from './pages/post/post-show/post-show.component';
import { PostVirtualListComponent } from './pages/post/post-virtual-list/post-virtual-list.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
// import { AuthGuard } from './guards/auth.guard';
// import { LoggedInGuard } from './guards/logged-in.guard';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate, AuthGuard } from '@angular/fire/auth-guard';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ImageEditorComponent } from './layout/image-editor/image-editor.component';
import { UploadComponent } from './layout/upload/upload.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth/login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/posts']);

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { title: marker('title.home'), authGuardPipe: redirectUnauthorizedToLogin }
    },
    {
        path: "settings",
        component: SettingsComponent,
        canActivate: [AuthGuard],
        data: { title: marker('title.settings'), authGuardPipe: redirectUnauthorizedToLogin }
    },
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: { title: marker('title.profile'), authGuardPipe: redirectUnauthorizedToLogin }
    },
    {
        path: "uploads",
        component: UploadComponent,
        canActivate: [AuthGuard],
        data: { title: marker('title.uploads'), authGuardPipe: redirectUnauthorizedToLogin }
    },
    {
        path: "image-editor",
        component: ImageEditorComponent,
        canActivate: [AuthGuard],
        data: { title: marker('title.image_editor'), authGuardPipe: redirectUnauthorizedToLogin }
    },
    {
        path: "feeds",
        component: UploadComponent,
        canActivate: [AuthGuard],
        data: { title: marker('title.feeds'), authGuardPipe: redirectUnauthorizedToLogin }
    },
    {
        path: "auth",
        component: AuthComponent,
        ...canActivate(redirectLoggedInToHome),
        children: [
            {
                path: "login",
                component: LoginComponent,
                data: { title: marker('title.login') }
            },
            {
                path: "signup",
                component: SignupComponent,
                data: { title: marker('title.signup') }
            },
            {
                path: "reset-password",
                component: ResetPasswordComponent,
                data: { title: marker('title.reset_password') }
            }]
    },
    {
        path: "posts",
        ...canActivate(redirectUnauthorizedToLogin),
        component: PostComponent,
        children: [
            {
                path: "",
                component: PostVirtualListComponent,
                // component: PostListComponent,
                data: { title: marker('title.posts.list') }
            },
            {
                path: "create",
                component: PostFormComponent,
                // canDeactivate: [DiscardChangesGuard],
                data: { title: marker('title.posts.create') }
            },

            {
                path: ":id",
                component: PostShowComponent,
                data: { title: marker('title.posts.show') }
            },
            {
                path: ":id/edit",
                component: PostFormComponent,
                // canDeactivate: [DiscardChangesGuard],
                data: { title: marker('title.posts.edit') }
            }],

    },
    // otherwise redirect to home
    {
        path: "**",
        redirectTo: "auth/login",
        pathMatch: "full",
    },
    // { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

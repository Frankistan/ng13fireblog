import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TableComponent } from './pages/table/table.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { PostListComponent } from './pages/post/post-list/post-list.component';
import { PostFormComponent } from './pages/post/post-form/post-form.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { AuthComponent } from './pages/auth/auth.component';
// import { AuthGuard } from './guards/auth.guard';
// import { LoggedInGuard } from './guards/logged-in.guard';

import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
import { PostComponent } from './pages/post/post/post.component';
import { DiscardChangesGuard } from './guards/discard-changes.guard';
import { PostShowComponent } from './pages/post/post-show/post-show.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ListComponent } from './test/list/list.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth/login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/posts']);

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent,
        ...canActivate(redirectUnauthorizedToLogin),
        data: { title: marker('title.home') }
    },
    {
        path: "settings",
        component: SettingsComponent,
        // canActivate: [AuthGuard],
        ...canActivate(redirectUnauthorizedToLogin),
        data: { title: marker('title.settings') }
    },
    {
        path: "profile",
        component: ProfileComponent,
        // canActivate: [AuthGuard],
        ...canActivate(redirectUnauthorizedToLogin),
        data: { title: marker('title.profile') }
    },
    {
        path: "auth",
        component: AuthComponent,
        // canActivate: [LoggedInGuard],
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
        // canActivate: [AuthGuard],
        ...canActivate(redirectUnauthorizedToLogin),
        component: PostComponent,
        children: [
            {
                path: "",
                component: ListComponent,
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

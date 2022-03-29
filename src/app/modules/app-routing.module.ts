import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '@app/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: DashboardComponent,
        /* data: {
            title: extract("home"),
            animation: {
                value: "home"
            }
        } */
    },
    // otherwise redirect to home
    { path: "**", redirectTo: "" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

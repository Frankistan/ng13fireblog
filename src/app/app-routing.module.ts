import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TableComponent } from './pages/table/table.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: DashboardComponent,
        data: { title: marker('home') }
    },
    {
        path: "posts",
        component: TableComponent,
        data: { title: marker('posts') }
    },
    // otherwise redirect to home
    { path: "**", redirectTo: "" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

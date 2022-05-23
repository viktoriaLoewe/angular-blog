import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { AuthService } from '../shared/auth/auth.service';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../shared/auth/auth.guard';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from 'src/material.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatNativeDateModule,
    MaterialExampleModule,
    MatTableModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component:DashboardPageComponent, canActivate: [AuthGuard]},
          // canActivate: [AuthGuard]
          {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
          // canActivate: [AuthGuard]
          {path: 'post/:id/edit', component:EditPageComponent, canActivate: [AuthGuard]}
        ]
      }
    ])
  ],
  exports: [RouterModule, MatTableModule],
  providers: [AuthService]
})
export class AdminModule {

}

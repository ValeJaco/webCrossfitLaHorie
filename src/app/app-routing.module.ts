import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserDetailsComponent} from "./pages/user-details/user-details.component";
import {SeanceDetailsComponent} from "./pages/seance-details/seance-details.component";
import {AuthGuard} from "./security/auth.guard";
import {UsersListComponent} from "./pages/users-list/users-list.component";
import {SeancesListComponent} from "./pages/seances-list/seances-list.component";
import {AuthenticationComponent} from "./pages/authentification/authentication.component";
import {PlanningListComponent} from "./pages/planning-list/planning-list.component";
import {PlanningDetailsComponent} from "./pages/planning-details/planning-details.component";
import {MyIncomingSeancesComponent} from "./pages/my-incoming-seances/my-incoming-seances.component";
import {ChangePasswordComponent} from "./pages/change-password/change-password.component";

const routes: Routes = [
  {path: '', redirectTo: 'seances', pathMatch: 'full'},
  {
    path: 'seances/:id',
    component: SeanceDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'seances',
    component: SeancesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mySeances',
    component: MyIncomingSeancesComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'planning/:id',
    component: PlanningDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'planning',
    component: PlanningListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/:id',
    component: UserDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: AuthenticationComponent
  },
  {
    path: 'change',
    component: ChangePasswordComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

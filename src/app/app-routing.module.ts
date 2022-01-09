import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserDetailsComponent} from "./pages/user-details/user-details.component";
import {SeanceDetailsComponent} from "./pages/seance-details/seance-details.component";
import {AuthGuard} from "./security/auth.guard";
import {UsersListComponent} from "./pages/users-list/users-list.component";
import {SeancesListComponent} from "./pages/seances-list/seances-list.component";
import {AuthentificationComponent} from "./pages/authentification/authentification.component";

const routes: Routes = [
  {path: '', redirectTo: 'seances', pathMatch: 'full'},
  {
    path: 'seances',
    component: SeancesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'seances/:id',
    component: SeanceDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/:id',
    component: UserDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: AuthentificationComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

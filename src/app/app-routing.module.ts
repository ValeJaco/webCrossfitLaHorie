import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserFormComponent} from "./pages/user-form/user-form.component";
import {SeanceFormComponent} from "./pages/seance-form/seance-form.component";
import {AuthGuard} from "./security/auth.guard";
import {UsersListComponent} from "./pages/users-list/users-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'seances', pathMatch: 'full'},
  {
    path: 'seances',
    component: SeanceFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/:id',
    component: UserFormComponent,
    canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

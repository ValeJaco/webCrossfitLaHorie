export class Role {

  id: number;
  name: string;
  authority: string;

  constructor(role?: Role) {
    if (role) {
      this.id = role.id;
      this.name = role.name;
      this.authority = role.authority;
    }
  }
}

import { UserCreateService } from './../user-create.service';
import { Component, OnInit } from '@angular/core';
import { User } from './users.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userCreateService: UserCreateService, private snackBar: MatSnackBar) { }

  users: User[] = [];

  ngOnInit(): void {
    this.userCreateService.getUsers().subscribe(data => this.users = data as User[]);
  }

  deleteUser(userId): void {
    this.userCreateService.deleteUser(userId).subscribe(data => {
      this.userCreateService.getUsers().subscribe(data => this.users = data as User[]);
      this.openSnackBar('Usuário deletado com sucesso.')
    });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { User } from '../users/users.model';
import { UserCreateService } from '../user-create.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent implements OnInit {

  constructor(private userCreateService: UserCreateService, private snackBar: MatSnackBar) { }

  user: User = {
    nome: '',
    idade: 0,
    foto: ''
  }

  users: User[] = [];

  ngOnInit(): void {
    this.userCreateService.getUsers().subscribe(data => this.users = data as User[]);
  }

  createUser(): void {
    if (!this.user.nome) {
      return this.openSnackBar('Informe um nome válido.')
    } else if (this.users.filter(user => user.nome === this.user.nome).length > 0) {
      return this.openSnackBar('Usuário já cadastrado.')
    }

    this.userCreateService.createUser(this.user).subscribe(response => {
      this.openSnackBar('Usuário cadastrado com sucesso.')
    });


    this.user = {
      nome: '',
      idade: 0,
      foto: ''
    }
  }

  handleResetInput(): void {
    this.user = {
      nome: '',
      idade: 0,
      foto: ''
    }
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    })
  }
}

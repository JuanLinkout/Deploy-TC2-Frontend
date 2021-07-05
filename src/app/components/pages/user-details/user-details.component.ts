import { UserCreateService } from './../user-create.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../users/users.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private userCreateService: UserCreateService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  user: User = {
    nome: '',
    idade: 0,
    foto: ''
  };

  users: User[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userCreateService.getUser(params.get('_id')).subscribe((data: User) => {
        if (!data._id) {
          return this.router.navigateByUrl('/');
        }

        this.user = { ...data as User };
      });
    });

    this.userCreateService.getUsers().subscribe(data => this.users = data as User[]);
  }

  updateUser(user: User): void {
    if (!this.user.nome) {
      return this.openSnackBar('Informe um nome válido.')
    } else if (this.users.filter(user => user.nome === this.user.nome && user._id != this.user._id).length > 0) {
      return this.openSnackBar('Usuário já cadastrado.')
    }

    this.userCreateService.updateUser(user).subscribe(data => {
      this.openSnackBar('Usuário alterado com sucesso.');
      this.router.navigateByUrl('/');
    });
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

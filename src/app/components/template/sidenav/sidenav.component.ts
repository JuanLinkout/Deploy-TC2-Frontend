import { Component, OnInit } from '@angular/core';
import { User } from '../../pages/users/users.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  navLinks = [
    {
      icon: 'home',
      nome: 'Home',
      path: '/'
    },
    {
      icon: 'person_add',
      nome: 'Cadastrar Usuário',
      path: '/user/create'
    },
    {
      icon: 'group',
      nome: 'Usuários',
      path: '/users'
    }
  ];

  constructor() { }

  users: User[] = [];

  ngOnInit(): void {
  }

}

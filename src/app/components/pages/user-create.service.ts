import { Injectable } from '@angular/core';
import { User } from './users/users.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserCreateService {

  constructor(private http: HttpClient) { }

  private users: User[] = [];

  getUsers(): Observable<Object> {
    return this.http.get("https://tundra-shining-candy.glitch.me/api/users");
  }

  getUser(userId: string): Observable<Object> {
    return this.http.get("https://tundra-shining-candy.glitch.me/api/users/" + userId);
  }

  createUser(user: User): Observable<Object> {
    if (!user.foto) user.foto = 'https://thispersondoesnotexist.com/image';

    const newUser = JSON.parse(JSON.stringify(user));
    return this.http.post("https://tundra-shining-candy.glitch.me/api/users/", newUser);
  }

  deleteUser(userId: string): Observable<Object> {
    return this.http.delete("https://tundra-shining-candy.glitch.me/api/users/" + userId);
  }

  updateUser(updatedUser: User): Observable<Object> {
    return this.http.put("https://tundra-shining-candy.glitch.me/api/users/" + updatedUser._id, updatedUser);
  }
}

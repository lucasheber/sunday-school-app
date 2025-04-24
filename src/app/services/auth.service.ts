import { inject, Injectable } from '@angular/core';
import { Auth, User, user, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, signOut } from '@angular/fire/auth';
import { from, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly auth = inject(Auth);

    constructor() { }

    getUser(): Observable<User | null> {
        return user(this.auth);
    }

    isLoggedIn$(): Observable<boolean> {
        return this.getUser().pipe(
            map((user) => !!user)
        );
    }

    login(email: string, password: string): Observable<UserCredential> {
        return from(signInWithEmailAndPassword(this.auth, email, password));
    }

    signup(email: string, password: string): Observable<UserCredential> {
        return from(createUserWithEmailAndPassword(this.auth, email, password));
    }

    logout(): Observable<void> {
        return from(signOut(this.auth));
    }
}
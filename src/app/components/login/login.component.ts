import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        this.authService.setToken(res.access_token);
        this.router.navigate(['/chat']);
      },
      error: (err) => {
        console.error('Ошибка входа', err);
        alert('Не удалось войти. Проверьте свои данные.');
      }
    });
  }
}

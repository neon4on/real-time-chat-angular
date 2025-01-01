import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.register(this.user).subscribe({
      next: () => {
        alert('Регистрация успешна! Теперь вы можете войти.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Ошибка регистрации', err);
        alert('Не удалось зарегистрироваться. Проверьте свои данные.');
      }
    });
  }
}

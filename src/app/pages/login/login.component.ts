import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService , DataLogin } from '../../core/services/auth.service';
import { Data, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  register(data: DataLogin) {
    this.isLoading = true;
    this.authService.login(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res);
        localStorage.setItem('token', res.token);
        this.authService.decodeToken(res.token);
        this.authService.userData.next(true);
        console.log(localStorage.getItem('token'));
        this.toastrService.success('Login Successfull', 'Success');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
         this.authService.userData.next(false);
        this.toastrService.error('Resgisteration Failed', 'Error');
      },
    });
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(3)]),
  });

  showloginForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log(
      this.register({
        password: this.passowrdController?.value,
        email: this.emailController?.value,
      })
    );
  }

  get emailController() {
    return this.loginForm.get('email');
  }

  get passowrdController() {
    return this.loginForm.get('password');
  }
}

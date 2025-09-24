import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { AuthService , Data} from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  register(data: Data) {
    this.isLoading = true;
    this.authService.register(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        localStorage.setItem('token', res.token);
        this.authService.decodeToken(res.token);
         this.authService.userData.next(true);
        this.toastrService.success('Resgisteration SuccessFull', 'Success');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
        this.authService.userData.next(false);
        this.toastrService.error('Resgisteration Failed', 'Error');
      },
    });
  }

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.min(3),
        Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/),
      ]),
      rePassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: this.matchPasswordValidation }
  );

  showRegisterForm() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    console.log(
      this.register({
        name: this.nameController?.value,
        phone: this.phoneController?.value,
        rePassword: this.rePasswordController?.value,
        password: this.passowrdController?.value,
        email: this.emailController?.value,
      })
    );
  }

  matchPasswordValidation(group: AbstractControl): null | Record<string, any> {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    if (password === rePassword) {
      return null;
    } else {
      return { noMatch: true };
    }
  }

  get nameController() {
    return this.registerForm.get('name');
  }

  get emailController() {
    return this.registerForm.get('email');
  }

  get passowrdController() {
    return this.registerForm.get('password');
  }

  get rePasswordController() {
    return this.registerForm.get('rePassword');
  }

  get phoneController() {
    return this.registerForm.get('phone');
  }
}

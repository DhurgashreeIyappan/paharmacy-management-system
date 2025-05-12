import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { AuthService } from '../../services/auth.service';  
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {  // Inject Router
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log('Form Submitted');
  
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
  
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log('User registered successfully', res);
          this.router.navigate(['/login']);  // Redirect to login page
        },
        error: (err) => console.error('Registration failed', err)
      });
    } else {
      console.warn('Form is invalid');
    }
  }
}

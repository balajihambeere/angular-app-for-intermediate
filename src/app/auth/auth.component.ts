import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnInit {
    authForm: FormGroup;
    authType: String = '';
    title: String = '';
    isSubmitting = false;
    buttonTitle: String = '';

    constructor(private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService) {
        this.authForm = this.fb.group({
            'username': ['', Validators.compose([Validators.required, Validators.email])],
            'password': ['', Validators.required]
        });
    }

    ngOnInit() {
        this.route.url.subscribe(data => {
            this.authType = data[data.length - 1].path;
            this.title = (this.authType === 'login') ? 'Please login here..' : 'Create a new account';
            this.buttonTitle = (this.authType === 'login') ? 'Login' : 'Create Account';
            if (this.authType === 'register') {
                this.authForm.addControl('confirmPassword', new FormControl(''));
            }
        });
    }

    submitForm() {
        this.isSubmitting = true;
        const credentials = this.authForm.value;
        this.authService.auth(this.authType, credentials).subscribe(data => {
            if (this.authType === 'register') {
                this.router.navigateByUrl('login');
            } else {
                this.router.navigateByUrl('/customers');
            }
        });
    }
}

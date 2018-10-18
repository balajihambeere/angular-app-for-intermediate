import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular CRUD App';
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
     this.authService.populate();
  }

  logout() {
    this.authService.purgeAuth();
    this.router.navigateByUrl('/customers');
  }
}

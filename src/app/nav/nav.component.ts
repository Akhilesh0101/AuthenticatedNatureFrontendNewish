import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AutharizeService } from '../services/autharize.service';


@Component({
  selector: 'app-nav',
  standalone: false,
  
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  isLoggedIn: boolean = false;

  constructor(private userService: UserService, private router: Router,private authService: AutharizeService,) {}
  ngOnInit(): void {
    // Subscribe to login status observable
    this.authService.loginStatus$.subscribe((status) => {
      this.isLoggedIn = status;
    });
   }

  // Log the user out
  logout(): void {
    this.authService.logout();
  }

}

 



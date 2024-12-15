import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import * as AOS from 'aos';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  bestSellers: Product[] = [];
  showPopup: boolean = false;  // To control showing the popup
  isAuthenticated: boolean= true;
  isLoggedIn:boolean=false;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router:Router,
    private userService:UserService,
    private jwtHelper: JwtHelperService
    // private jwtHelper: JwtHelperService,
  ) {
    this.checkRemindTime();  // Check if the popup should be displayed based on the remind time


  }
  isUserAuthenticated = (): boolean => {
    const token = sessionStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }

    return false;
  }

  logOut = () => {
    localStorage.removeItem("jwt");
  }
  // Check if the popup should be shown based on "Remind Me Later" time
  checkRemindTime() {
    // Skip popup if user is logged in
    const user = this.userService.getStoredUserData() ;
    if (user && user.UserName) {
      this.showPopup = false;
      return;  // Skip further logic if logged in
    }

    const remindTime = localStorage.getItem('remindTime');
    if (remindTime) {
      const currentTime = new Date().getTime();
      if (currentTime >= parseInt(remindTime)) {
        this.showPopup = true;  // Show the popup again after 1 minute
      }
    } else {
      this.showPopup = true;  // Show popup immediately if it's the first time
    }
  }


  // Close the popup when the user closes it
  closePopup() {
    this.showPopup = false;
  }

  // Handle the "Remind Me Later" event when the user clicks "Remind Me Later"
  remindLater() {
    this.showPopup = false;  // Close the popup after reminding the user
    // Save the remind time in localStorage (e.g., 1 minute from now)
    const remindTime = new Date().getTime() + 20000;  // 1 minute later
    localStorage.setItem('remindTime', remindTime.toString());
  }

  ngOnInit(): void {
     // Show the popup after 20 seconds, only if the user is not authenticated
     const user = this.userService.getStoredUserData();
     this.isLoggedIn = user && user.Email ? true : false;
     
     
    this.productService.getProducts();
    console.log('Products:', this.products); // Check if all products are valid
    this.bestSellers = [...this.products]  // Make a copy of the products
      .sort(() => 0.5 - Math.random()) // Randomize the products
      .slice(0, 3); // Get first 3 random products
    AOS.init();  
     }
     addToCart(product: Product) {
      if (product && product.ProductId) {  // Check if product is valid
        this.cartService.addToCart(product);
        alert(`${product.ProductName} added to cart!`);
      } else {
        console.error('Invalid product:', product); // Log if the product is invalid
      }
    }
    
  
    // Buy product immediately and proceed to payment
    buyNow(product: Product) {
      // Check if the product is in stock
      if (product.StockQuantity > 0) {
        this.cartService.addToCart(product);
        // Navigate to the payment page
        this.router.navigate(['/payment']);
      } else {
        alert(`${product.ProductName} is out of stock.`);
      }
    }
    onButtonClick(product:Product) {
      if (this.isAuthenticated) {
        // If authenticated, call the addingCart method
        this.addToCart(product);
      } else {
        // If not authenticated, redirect to login
        this.router.navigate(['user']);
      }
    }
   
  

}

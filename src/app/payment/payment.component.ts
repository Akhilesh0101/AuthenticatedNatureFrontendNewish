import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AddressService } from '../services/address.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cartItems = [];
  savedAddresses: any[] = [];
  newAddress: any = {
    Street: '',
    Phone: '',
    City: '',
    State: '',
    Country: '',
    ZipCode: ''
  };
  selectedAddress: any = null;
  isNewAddress: boolean = false;

  constructor(
    private addressService: AddressService,
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch saved addresses when the component initializes
    this.addressService.getSavedAddresses().subscribe((addresses) => {
      this.savedAddresses = addresses;
    });

    // Get cart items
    this.cartItems = this.cartService.getCartItems();
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + item.product.Price * item.quantity;
    }, 0);
  }

  // Methods to handle address selection and saving
  addNewAddress(): void {
    this.isNewAddress = true;
    this.selectedAddress = null;
  }

  selectAddress(address: any): void {
    this.selectedAddress = address;  // Set the selected address
    this.isNewAddress = false;  // Switch off the "new address" form if a saved address is selected
  }

  // Method to edit an existing address
  editAddress(address: any): void {
    this.isNewAddress = true; // Switch to new address form to allow editing
    this.newAddress = { ...address }; // Pre-fill the form with the existing address data
    this.selectedAddress = null; // Deselect the current selected address
  }

  // Method to save the new or edited address
  saveNewAddress(): void {
    if (this.newAddress.UserId) {
      // If there's a UserId, it means we're editing an existing address
      this.addressService.updateAddress(this.newAddress).subscribe(() => {
        // Update the savedAddresses list with the edited address
        const index = this.savedAddresses.findIndex(addr => addr.AddressId === this.newAddress.AddressId);
        if (index !== -1) {
          this.savedAddresses[index] = this.newAddress;
        }
        this.isNewAddress = false; // Close the address form
        this.selectedAddress = this.newAddress; // Set the edited address as selected
        this.resetNewAddressForm();
      });
    } else {
      // If no UserId, we are adding a new address
      this.addressService.addAddress(this.newAddress).subscribe(() => {
        this.savedAddresses.push(this.newAddress); // Add the new address to the list
        this.isNewAddress = false;
        this.selectedAddress = this.newAddress;
        this.resetNewAddressForm();
      });
    }
  }

  // Method to reset the new address form
  resetNewAddressForm(): void {
    this.newAddress = {
      Street: '',
      Phone: '',
      City: '',
      State: '',
      Country: '',
      ZipCode: ''
    };
  }

  // Method to delete an address
  deleteAddress(address: any): void {
    this.addressService.removeAddress(address.AddressId).subscribe(() => {
      // After deletion, filter out the deleted address from the savedAddresses list
      this.savedAddresses = this.savedAddresses.filter((addr) => addr.AddressId !== address.AddressId);
      if (this.selectedAddress === address) {
        this.selectedAddress = null;
      }
    }, error => {
      alert('Error deleting address!');
    });
  }

  // Proceed to payment method
  proceedToPay(): void {
    if (this.selectedAddress) {
      // Proceed with payment logic
      console.log('Payment successful for shipping to:', this.selectedAddress);
      this.router.navigate(['/successpay']);  // Navigate to the success page
      this.cartService.clearCart();
    } else {
      alert('Please select or enter an address for shipping.');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AddressService } from '../services/address.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  imports:[ReactiveFormsModule,CommonModule,FormsModule],
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  address: any = {
    Street: '',
    PhoneNumber: '',
  
    City: '',
    State: '',
    Country: '',
    ZipCode: ''
  };

  savedAddresses: any[] = [];
  isEditMode: boolean = false;
  addressToEdit: any = null;

  constructor(private addressService: AddressService, private router: Router) {}

  ngOnInit(): void {
    // Fetch saved addresses when the component is initialized
    this.addressService.getSavedAddresses().subscribe(
      (addresses) => {
        this.savedAddresses = addresses;
      },
      (error) => {
        console.error('Error fetching saved addresses:', error);
      }
    );
  }

  saveAddress(): void {
    if (this.isEditMode && this.addressToEdit) {
      // Update the existing address if in edit mode
      this.addressService.updateAddress(this.address).subscribe(
        (updatedAddress) => {
          const index = this.savedAddresses.findIndex((addr) => addr.AddressId === updatedAddress.AddressId);
          if (index !== -1) {
            this.savedAddresses[index] = updatedAddress; // Update the list
          }
          this.resetAddressForm();
          this.router.navigate(['/payment']);  // Navigate to payment page
        },
        (error) => {
          console.error('Error updating address:', error);
        }
      );
    } else {
      // Add a new address if not in edit mode
      this.addressService.addAddress(this.address).subscribe(
        (newAddress) => {
          this.savedAddresses.push(newAddress); // Add the new address to the list
          this.resetAddressForm();
          this.router.navigate(['/payment']);  // Navigate to payment page
        },
        (error) => {
          console.error('Error adding address:', error);
        }
      );
    }
  }

  resetAddressForm(): void {
    this.address = {
      Street: '',
      PhoneNumber: '',
      UserId: '',
      City: '',
      State: '',
      Country: '',
      ZipCode: ''
    };
    this.isEditMode = false;
    this.addressToEdit = null;
  }

  removeAddress(address: any): void {
    this.addressService.removeAddress(address).subscribe(
      () => {
        this.savedAddresses = this.savedAddresses.filter((addr) => addr.UserId !== address.UserId);
      },
      (error) => {
        console.error('Error removing address:', error);
      }
    );
  }

  editAddress(address: any): void {
    this.address = { ...address }; // Clone the address to avoid direct mutation
    this.isEditMode = true;
    this.addressToEdit = address;
  }
}

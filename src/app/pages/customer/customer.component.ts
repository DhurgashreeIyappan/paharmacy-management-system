import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router for redirection

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {  // ngOnInit instead of ngAfterViewInit
  customerName = 'John Doe';  // Default name, will be updated after login
  products: Product[] = [
    { id: 1, name: 'Dolo', description: 'Pain Reliever', price: 10.99 },
    { id: 2, name: 'Paracetamol', description: 'Fever Reducer', price: 5.49 },
    { id: 3, name: 'Ibuprofen', description: 'Anti-inflammatory', price: 12.99 },
    { id: 4, name: 'Aspirin', description: 'Blood Thinner', price: 8.99 },
    { id: 5, name: 'Amoxicillin', description: 'Antibiotic', price: 15.99 },
  ];
  cart: CartItem[] = [];
  userEmail: string | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router // Inject Router for redirection
  ) {}

  ngOnInit(): void {
    // Get the logged-in user's email from AuthService
    this.userEmail = this.authService.getUserEmail();

    // If user is not logged in, log the error and redirect to login page
    if (!this.userEmail) {
      console.error('User not logged in');
      this.router.navigate(['/login']); // Redirect to the login page
    } else {
      // If user is logged in, fetch more user-specific data, e.g., their name
      this.customerName = this.userEmail.split('@')[0]; // Extract customer name from email
    }
  }

  addToCart(product: Product): void {
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  placeOrder(): void {
    if (!this.userEmail) {
      console.error('User not logged in');
      alert('Please log in to place an order.');
      this.router.navigate(['/login']); // Redirect to login page
      return;
    }

    const orderDetails = {
      userEmail: this.userEmail,
      products: this.cart.map(item => ({
        productId: item.id,  // Ensure product ID is passed, instead of the whole object
        productName: item.name,
        description: item.description,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: this.getTotal(),
    };

    console.log('Order Details:', orderDetails); 
    
    this.http.post('http://localhost:5000/api/order/place-order', orderDetails)
      .subscribe(response => {
        console.log('Order placed successfully', response);
        this.cart = []; // Clear the cart after placing the order
        alert('Your order has been placed successfully!');
        this.router.navigate(['/order-history']); // Redirect to order history page
      }, error => {
        console.error('Error placing order', error);
        alert('There was an issue placing your order. Please try again later.');
      });
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [{
    product: 'https://via.placeholder.com/150',
    name: 'Test Name',
    price: 100,
    quantity: 2,
    id: 1
  },
  {
    product: 'https://via.placeholder.com/150',
    name: 'Test Name',
    price: 190,
    quantity: 3,
    id: 2
  }] }
  
  dataSource: Array<CartItem> = []
  displayedCols: Array<string> = ['product', 'name', 'price', 'quantity', 'total', 'actions']

  constructor(private _cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this._cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart
      this.dataSource = this.cart.items
    })
  }

  getTotal(items: Array<CartItem>): number {
    return this._cartService.getTotal(items)
  }

  onClearCart(): void {
    this._cartService.clearCart()
  }

  onRemoveRow(item: CartItem): void {
    this._cartService.removeRow(item)
  }

  onAddQuantity(item: CartItem): void {
    this._cartService.addToCart(item)
  }

  onRemoveQuantity(item: CartItem): void {
    this._cartService.removeFromCart(item)
  }

  onCheckout(): void {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async(res: any) => {
      let stripe = await loadStripe('pk_test_51O2hEGAYLwWuVWAWtYpACwZcCxwQLPrEsvaGx5AkG0oOmTClFqcvhcFBUdORICCS5obva7VA07vGfBPHtOGsB01o00agmpfboh')
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }

}

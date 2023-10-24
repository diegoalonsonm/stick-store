import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styles: [
  ]
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false
  product: Product | undefined = {
    id: 1,
    title: 'IPhone',
    price: 1000,
    category: 'tech',
    description: 'blue iphone 15',
    image: 'https://placehold.com/150'
  }
  @Output() addToCart = new EventEmitter<Product>()

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product)
  }

}

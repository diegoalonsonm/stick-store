import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styles: [
  ]
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>()

  sort = 'desc'
  itemsShowCount = 5

  constructor(){}

  ngOnInit(): void {
  }

  onSortUpdated(newSort: string): void {
    this.sort = newSort
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count
  }

  onColumnsUpdated(colsNumber: number): void {
    this.columnsCountChange.emit(colsNumber)
  }

}

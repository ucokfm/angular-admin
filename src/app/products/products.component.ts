import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product, ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnDestroy, OnInit {
  products: Array<Product>;
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscription = this.productService.products$.subscribe(products => {
      this.products = products;
      this.ref.detectChanges();
    });
    this.productService.find();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

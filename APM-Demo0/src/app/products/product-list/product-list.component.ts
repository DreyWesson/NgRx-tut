import { Component, OnInit, OnDestroy } from '@angular/core';


import { Product } from '../product';
import { ProductService } from '../product.service';
import * as fromRoot from './../state/app.state';

import { Store, select } from '@ngrx/store';
import * as fromProduct from './../state/product.reducer';
import * as productActions from './../state/product.actions';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  componentActive = true;
  pageTitle = 'Products';
  errorMessage: string;
  displayCode: boolean;
  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(private productService: ProductService,
              private store: Store<fromProduct.State>) { }

  ngOnInit(): void {
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.store.dispatch(new productActions.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));

    this.store.pipe(select('products')).subscribe(
      (products: fromProduct.ProductState) => this.displayCode = products.showProductCode
    );
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());

  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}

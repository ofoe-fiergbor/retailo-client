import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/service/product/product.model';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-shop-product-card',
  templateUrl: './shop-product-card.component.html',
  styleUrls: ['./shop-product-card.component.css'],
})
export class ShopProductCardComponent implements OnInit {
  @Input() product!: ProductModel;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  addToCart() {
    let productCopy = JSON.parse(JSON.stringify(this.product))
    productCopy.quantity = 1
    this.productService.addProductToCart(productCopy);
  }
}

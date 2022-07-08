import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {FormControl, FormGroup} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AppState} from "../../state/app.state";
import {getCart} from "../../state/shop/shop.selector";
import {UtilService} from "../../service/util/util.service";
import {addProductToCart, clearCart, removeProductFromCart} from "../../state/shop/shop.action";
import {ProductModel} from "../../service/product/product.model";
import {TransactionService} from "../../service/transaction/transaction.service";
import {CheckoutProductRequestBody} from "../../service/transaction/transaction.model";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ShoppingCartComponent implements OnInit {
  dataSource: ProductModel[] = []
  totalCostOfProducts: number = 0;
  columnsToDisplay = [
    'id',
    'name',
    'price',
    'quantity',
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement?: ProductModel;

  constructor(
    private store: Store<AppState>,
    private util: UtilService,
    private transactionService: TransactionService
  ) {
  }

  formGroup = new FormGroup({
    quantity: new FormControl(1)
  })

  ngOnInit(): void {
    this.store.select(getCart)
      .subscribe(data => {
        this.dataSource = data
        this.totalCostOfProducts = this.util.totalCostCalculator(data)
      })
  }


  addToCart(element: ProductModel) {
    let elementCopy = this.util.deepCopyObject(element)
    elementCopy.quantity = this.formGroup.value.quantity
    this.store.dispatch(addProductToCart(elementCopy));
  }

  removeProductFromCart(product: ProductModel) {
    this.store.dispatch(removeProductFromCart(product))
  }

  checkout() {
    this.transactionService
      .checkoutShoppingCart(
        {userId: this.util.getUserDetails()?.id!, products: this.getProducts()}
      ).subscribe(
      data => {
        console.log(data)
        this.store.dispatch(clearCart())
        this.util.openSnackBar("You have successfully checked out your shopping cart.")
      }, error => {
        console.log(error)
        this.util.openSnackBar("Something went wrong. Try again later.")
      })

  }

  getProducts = (): CheckoutProductRequestBody[] => {
    let result: CheckoutProductRequestBody[] = []
    this.dataSource.forEach(product => {
      result.push({
        productId: product.id,
        price: product.price,
        quantity: product.quantity
      })
    })
    return result;
  }

}


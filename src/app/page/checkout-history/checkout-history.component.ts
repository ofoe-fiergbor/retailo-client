import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../service/transaction/transaction.service";
import {UtilService} from "../../service/util/util.service";
import {CheckoutHistoryTransaction} from "../../service/transaction/transaction.model";
import {MatDialog} from '@angular/material/dialog';
import {HistoryDialogComponent} from "../../component/history-dialog/history-dialog.component";

@Component({
  selector: 'app-checkout-history',
  templateUrl: './checkout-history.component.html',
  styleUrls: ['./checkout-history.component.css']
})
export class CheckoutHistoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'amount', 'quantity'];
  dataSource: CheckoutHistoryTransaction[] = []

  constructor(
    private transactionService: TransactionService,
    private util: UtilService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.transactionService.getCheckoutHistory(this.util.getUserDetails()?.id!)
      .subscribe(data => {
        this.dataSource = data.history
        console.log("history", data.history)
      })
  }

  clickRow(transaction: CheckoutHistoryTransaction) {
    console.log("SELECTED TRANSACTION: ", transaction)
    this.openDialog(transaction)
  }

  openDialog(transaction: CheckoutHistoryTransaction) {
    this.dialog.open(HistoryDialogComponent, {data: transaction});
  }

}




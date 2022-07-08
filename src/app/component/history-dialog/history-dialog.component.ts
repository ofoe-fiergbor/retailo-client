import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CheckoutHistoryTransaction} from "../../service/transaction/transaction.model";

@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.css']
})
export class HistoryDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: CheckoutHistoryTransaction) {
  }

  ngOnInit(): void {
  }

}

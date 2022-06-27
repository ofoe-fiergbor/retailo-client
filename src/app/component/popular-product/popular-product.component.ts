import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-popular-product',
  templateUrl: './popular-product.component.html',
  styleUrls: ['./popular-product.component.css']
})
export class PopularProductComponent implements OnInit {
  @Input() name!: string
  @Input() price!: number
  constructor() { }

  ngOnInit(): void {
  }

}

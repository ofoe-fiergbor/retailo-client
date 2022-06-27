import { Component, OnInit } from '@angular/core';
import {PopularProduct, popularProducts} from "../../../assets/popularProducts";

@Component({
  selector: 'app-popular-collection',
  templateUrl: './popular-collection.component.html',
  styleUrls: ['./popular-collection.component.css']
})
export class PopularCollectionComponent implements OnInit {
  popularProducts = popularProducts
  constructor() { }

  ngOnInit(): void {
  }

}

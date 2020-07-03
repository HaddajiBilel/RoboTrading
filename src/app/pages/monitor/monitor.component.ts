import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  selectedStock: String = 'AAPL';
  training: Boolean = false;
  stockChanged(stock: String): void{
    this.selectedStock = stock;
  }
  train(training: Boolean): void{
    this.training = training;
  }
  ngOnInit(): void {
  }

}

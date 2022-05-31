import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { StockService } from 'src/app/service/stock.service';


@Component({
  selector: 'app-stocks-graph',
  templateUrl: './stocks-graph.component.html',
  styleUrls: ['./stocks-graph.component.css']
})
export class StocksGraphComponent implements OnInit {

  @ViewChild('myCanvas')
  canvas!: ElementRef;
   context!: CanvasRenderingContext2D;
   lineChartType: ChartType = 'line';
   chartData!: any[];
   chartLabels!: any[];
   chartOptions: any;
   @Input() data:any;
  constructor(private stockService:StockService,private datePipe:DatePipe) { }

  ngOnChanges(){
    let xValues:any=[];
    let yValues:any=[];
    if(this.data){
      for(let res of this.data){
        xValues.push(res.price);
        yValues.push(this.datePipe.transform(res.updatedOn,'medium'));
      }
    }
   
    this.chartData = [{
      data: xValues,
      label: 'Stocks',
      fill: false
    }];
    this.chartLabels = yValues;
 
  }

  ngOnInit(): void {
    this.chartOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    }
  };

}

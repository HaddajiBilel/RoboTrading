import { Component, OnInit,Input } from '@angular/core';
import { ApiCommService } from '../../../services/api-comm.service';
import { SimpleChanges } from '@angular/core';

var upColor = '#ec0000';
var upBorderColor = '#8A0000';
var downColor = '#00da3c';
var downBorderColor = '#008F28';
  

  
 export function calculateMA(dayCount, data) {
    var result = [];
    for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += data.values[i - j][1];
        }
        result.push(sum / dayCount);
    }
    return result;
  }


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  
    @Input() selectedStock ; 
    @Input() train: Boolean;
  stockData: { categoryData: Array<Date>[]; values: Array<Number>[]; }
    data=[]
  options: any;
  Window = '252';
  constructor(private dataService: ApiCommService) {
    
    
  }

  generateData(rawData): void {
    let Data=[]
    for (let i = 0; i < rawData.length; i++)
        Data[i]=[
            rawData[i]["timestamp"]
            ,Number(rawData[i]["open"])
            ,Number(rawData[i]["close"])
            ,Number(rawData[i]["low"])
            ,Number(rawData[i]["high"])]
    this.data=Data.reverse();
  }

  splitData(rawData): void{
    let categoryData = [];
    let values = []
    for (let i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i])
    }
    this.stockData={"categoryData": categoryData,"values":values}
  }

  handleWindowChange(window: String){
    console.log(this.Window)
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.train == true){
        this.dataService.trainNewModel(this.selectedStock).subscribe((Data:any[])=>{
            console.log('[trainData]',Data)
          })
    }
    else{
        this.dataService.getStockData(this.selectedStock, this.Window).subscribe((Data: any[])=>{
            this.generateData(Data)
            this.splitData(this.data)
            
            this.options = {
        title: {
            text: this.selectedStock + ' Stock Prices',
            left: 0
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['stock', 'MA5', 'MA10', 'MA20', 'MA30']
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: this.stockData.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        },
        yAxis: {
            scale: true,
            splitArea: {
                show: true
            }
        },
        dataZoom: [
            {
                type: 'inside',
                start: 50,
                end: 100
            },
            {
                show: true,
                type: 'slider',
                top: '90%',
                start: 50,
                end: 100
            }
        ],
        series: [
            {
                name: 'stock',
                type: 'candlestick',
                data: this.stockData.values,
                itemStyle: {
                    color: upColor,
                    color0: downColor,
                    borderColor: upBorderColor,
                    borderColor0: downBorderColor
                },
                markPoint: {
                    label: {
                        normal: {
                            formatter: function (param) {
                                return param != null ? Math.round(param.value) : '';
                            }
                        }
                    },
                    data: [
                        {
                            name: 'AAPL',
                            coord: ['2013/5/31', 2300],
                            value: 2300,
                            itemStyle: {
                                color: 'rgb(41,60,85)'
                            }
                        },
                        {
                            name: 'highest value',
                            type: 'max',
                            valueDim: 'highest'
                        },
                        {
                            name: 'lowest value',
                            type: 'min',
                            valueDim: 'lowest'
                        },
                        {
                            name: 'average value on close',
                            type: 'average',
                            valueDim: 'close'
                        }
                    ],
                    tooltip: {
                        formatter: function (param) {
                            return param.name + '<br>' + (param.data.coord || '');
                        }
                    }
                },
                markLine: {
                    symbol: ['none', 'none'],
                    data: [
                        [
                            {
                                name: 'from lowest to highest',
                                type: 'min',
                                valueDim: 'lowest',
                                symbol: 'circle',
                                symbolSize: 10,
                                label: {
                                    show: false
                                },
                                emphasis: {
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            {
                                type: 'max',
                                valueDim: 'highest',
                                symbol: 'circle',
                                symbolSize: 10,
                                label: {
                                    show: false
                                },
                                emphasis: {
                                    label: {
                                        show: false
                                    }
                                }
                            }
                        ],
                        {
                            name: 'min line on close',
                            type: 'min',
                            valueDim: 'close'
                        },
                        {
                            name: 'max line on close',
                            type: 'max',
                            valueDim: 'close'
                        }
                    ]
                }
            },
            {
                name: 'Predictions',
                type: 'line',
                data: calculateMA(5, this.stockData),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            },
            {
                name: 'MA5',
                type: 'line',
                data: calculateMA(5, this.stockData),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            },
            {
                name: 'MA10',
                type: 'line',
                data: calculateMA(10, this.stockData),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            },
            {
                name: 'MA20',
                type: 'line',
                data: calculateMA(20, this.stockData),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            },
            {
                name: 'MA30',
                type: 'line',
                data: calculateMA(30, this.stockData),
                smooth: true,
                lineStyle: {
                    opacity: 0.5
                }
            },
    
        ]
            };
        })
    }
  }
  ngOnInit(): void {
    
}
  
}
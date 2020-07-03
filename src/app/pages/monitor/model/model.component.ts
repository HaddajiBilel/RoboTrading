import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiCommService } from '../../../services/api-comm.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {

  @Output() onSelect= new EventEmitter<String>();
  @Output() training= new EventEmitter<Boolean>()
  gridStyle = {
    width: '15%',
    textAlign: 'center'
  };

  //Frontend Model params
  listOfInput: string[] = ['close','volume'];
  epochInput: Number = 2;
  sequenceInput: Number = 50;
  batchInput: Number = 32;
  LossFunctionInput: string='mse';
  optimizersInput: string='adam';
  
  //Backend model input params
  listOfSelectedValue: string[];
  epochValue: Number;
  sequenceValue: Number;
  batchValue: Number;
  
  isPredicting = false
  isTraning = false
  listOfIndicators: string[] = ['close','volume'];
  stocks: string[] = [];
  models: string[] = [];
  selectedModel: string;
  selectedStock: string;
  constructor(private dataService: ApiCommService, private message: NzMessageService) {}

  train(): void {
    
    this.dataService.patchModelParams({
    
      "inputData":this.listOfInput, 
      "sequenceLength":this.sequenceInput, 
      "epochs":this.epochInput, 
      "batchSize":this.batchInput, 
      "lossFunction":"mse", 
      "optimizer":"adam"
      }).subscribe(()=>{
        this.dataService.getHyperParams().subscribe((Data: any[])=>{
          this.listOfSelectedValue = Data["data"]["columns"];
          this.epochValue = Data["training"]["epochs"];
          this.sequenceValue = Data["data"]["sequence_length"];
          this.batchValue = Data["training"]["batch_size"];
          console.log("update View")
      })
      });
  //this.training.emit(true);
  
  }


  predict(): void {
    this.isPredicting = true;
    setTimeout(() => {
      this.isPredicting = false;
    }, 5000);
  }
  
  addStock(symbol: string): void {
    
    this.message.loading("Adding or Updating stock please wait", { nzDuration: 5000 });
    this.dataService.addStock(symbol).subscribe((Data: any[])=>{
      if (Data[symbol] == "Updated successfully and Indicators created"){
        if (this.stocks.includes(symbol)){
          this.message.create('success', symbol + " Updated successfully");
        }
        else{
          this.stocks.push(symbol)
          this.message.create('success', symbol + ' created successfully')
        }
      }

      
    })

  }


  stockChange(value: string): void {
    this.onSelect.emit(value);
    this.models=[]
    this.dataService.getModels(value).subscribe((Data: any[])=>{
      for (let item in Data) {
        this.models.push(Data[item]["model"])
      }
    })
    this.selectedModel = this.models[0];
  }


  createLoadingMessage(msg: string): void {
    this.message.loading(msg, { nzDuration: 5000 });
  }
  
  ngOnInit(): void {

    this.dataService.getHyperParams().subscribe((Data: any[])=>{
      console.log(Data)

      this.listOfSelectedValue = Data["data"]["columns"];
      this.epochValue = Data["training"]["epochs"];
      this.sequenceValue = Data["data"]["sequence_length"];
      this.batchValue = Data["training"]["batch_size"];

      })

    this.dataService.getStocks().subscribe((Data: any[])=>{
      
      for (let item in Data) {
        this.stocks.push(Data[item]["symbol"])
      }
      this.selectedStock = this.stocks[0];

      this.dataService.getModels(this.stocks[0]).subscribe((Models: any[])=>{
        for (let item in Models) {
          this.models.push(Models[item]["model"])
        }
      })
      this.selectedModel = this.models[0];

    })

    this.dataService.getIndicators().subscribe((Data: any[])=>{
      for(let key in Data[0]){
        this.listOfIndicators.push(key)
    }
    this.listOfIndicators.splice(2,1)

    })


  }

}

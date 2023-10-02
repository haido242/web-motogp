import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  constructor(
    private apiService: ApiService
  ) { }
  ngOnInit(): void {
    this.getTableData();
   
  }

  data: any[] = [];

  getTableData() {
    this.apiService.getData().subscribe((data: any[])=>{
      console.log(data);
      this.data = data;
      this.sortData();
    })

  }
  sortData(){
    //sort by total point
    this.data.sort((a, b) => {
      return this.getTotalPoint(b) - this.getTotalPoint(a);
    });
  }
  getTotalPoint(item: any) {
    const pointSum = Object.keys(item)
      .filter(key => key >= 'qat' && key <= 'val')
      .reduce((acc, key) => acc + Number(item[key]), 0);
    return pointSum;
  }

}

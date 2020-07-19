import { Component, OnInit } from '@angular/core';
import { StreamsetService } from '../streamset.service'
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-create-topology',
  templateUrl: './create-topology.component.html',
  styleUrls: ['./create-topology.component.scss']
})
export class CreateTopologyComponent implements OnInit {

  displayedColumns: string[] = ['SlNo', 'Pipeline', 'PipelineId', 'Description', 'Action'];
  dataSource = new MatTableDataSource<any[]>();
  #dataSource;
  disableSelection: boolean = false;
  disablediv: boolean = true;
  selectedPipelines: any[] = [];
  selectedTopology:String="";

  constructor(private streamsetService: StreamsetService) { }

  ngOnInit(): void {
    this.streamsetService.getPipelines().subscribe((data) => {
      //console.log(data)
      let count = 0;
      let element_data: any[] = [];
      data.data.forEach(element => {
        const tableData = {
          SlNo: ++count,
          title: element.pipelineConfig.title,
          pipelineId: element.pipelineConfig.pipelineId,
          description: element.pipelineConfig.description,
          action: "Select Pipeline"
        }
        element_data.push(tableData)
      });
      //console.log(element_data)
      this.dataSource.data = element_data;
    })

  }

  public generateTopology(element) {

    element.action = "Selected";
    this.disableSelection = true;
    this.selectedPipelines.push(element)
    //console.log(this.selectedPipelines)
    this.disablediv = false;
  }

  public selectNextPipeline() {
    if (this.dataSource.data.length > 1) {
      let array = this.dataSource.data;
      let selectedPipelines = this.selectedPipelines;
      let pipelineName;
      array.forEach((element: any) => {
        var ItemIndex = selectedPipelines.findIndex(value => value.pipelineId == element.pipelineId);
        //console.log("Item Value ",array[ItemIndex],"    ", ItemIndex)
        pipelineName=array[ItemIndex];
        array.splice(ItemIndex, 1);
        //pipelineName=array[ItemIndex].title;
        //console.log("Item Value ",array[ItemIndex-1],"    ", ItemIndex)
      });

      //console.log(this.dataSource.data)
      this.dataSource.data = []
      this.dataSource.data = array;
      this.disableSelection = false;
      this.disablediv = true;
      this.selectedTopology =this.selectedTopology + pipelineName.title + " --> "
      //console.log(pipelineName.title)
    }
    else {
      alert("You have Reached the End. Please Click on Create Topology")
    }

  }

  public createTopology() {

    this.selectedTopology = this.selectedTopology + this.selectedPipelines[this.selectedPipelines.length-1].title
    //console.log(this.selectedPipelines[this.selectedPipelines.length-1])

    let payload: any[] = [];
    let count = 0;
    this.selectedPipelines.forEach((element: any) => {
      const data = {
        "pipelineCount": ++count,
        "pipelineId": element.pipelineId
      }
      payload.push(data)
    });
    console.log(payload);
    this.streamsetService.sendTopologyData(payload)
    alert("Topology Created Successfully")
  }

}
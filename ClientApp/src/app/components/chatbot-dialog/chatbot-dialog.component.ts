import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-chatbot-dialog',
  templateUrl: './chatbot-dialog.component.html',
  styleUrls: ['./chatbot-dialog.component.css']
})
export class ChatbotDialogComponent implements OnInit{
  isLoading = true;
  // private positionRelativeToElement: ElementRef

  // constructor(public dialogRef: MatDialogRef<ChatbotDialogComponent>,
  //   @Inject(MAT_DIALOG_DATA) public options: { positionRelativeToElement: ElementRef }) {

  //   this.positionRelativeToElement = options.positionRelativeToElement
  // }

  // ngOnInit() {
  //   const matDialogConfig = new MatDialogConfig()
  //   const rect: DOMRect = this.positionRelativeToElement.nativeElement.getBoundingClientRect()

  //   matDialogConfig.position = { right: `10px`, top: `${rect.bottom + 2}px` }
  //   this.dialogRef.updatePosition(matDialogConfig.position)
  // }

  ngOnInit() {
    console.log(this.isLoading)
  }

  loadingDone(){
    console.log("done loading");
    this.isLoading = false;
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot-dialog',
  templateUrl: './chatbot-dialog.component.html',
  styleUrls: ['./chatbot-dialog.component.css']
})
export class ChatbotDialogComponent implements OnInit{
  isLoading = true;

  ngOnInit() {
    console.log(this.isLoading)
  }

  loadingDone(){
    console.log("done loading");
    this.isLoading = false;
  }
}

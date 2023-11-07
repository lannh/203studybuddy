import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { DialogService } from '../../services/dialog.service'
import { DialogPosition, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChatbotDialogComponent } from '../chatbot-dialog/chatbot-dialog.component';

@Component({
  selector: 'app-chatbot-btn',
  templateUrl: './chatbot-btn.component.html',
  styleUrls: ['./chatbot-btn.component.css']
})
export class ChatbotBtnComponent {
  isOpen = false;
  private dialogRef!: MatDialogRef<ChatbotDialogComponent>;
  // constructor(private dialogService: DialogService) {}

  // public openDialog() {
  //   this.dialogRef = this.dialogService.openDialog({
  //     positionRelativeToElement: this.myButtonRef,
  //     hasBackdrop: true
  //   })

  //   this.dialogRef.afterClosed().subscribe(
  //     () => {
  //       this.dialogRef = null
  //     }
  //   )
  // }

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.isOpen = true;

    this.dialogRef = this.dialog.open(ChatbotDialogComponent, {
      width: '600px',
      height: '500px',
      // position: dialogPosition
      position: { right: '30px', bottom: '110px'}

    });

    this.dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this.isOpen = false;
    });
  }

  closeDialog() {
    this.dialogRef.close();
    this.isOpen = false;
  }
}

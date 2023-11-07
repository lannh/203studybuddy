import { ElementRef, Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'


import { ChatbotDialogComponent } from '../components/chatbot-dialog/chatbot-dialog.component'


/**
 * Service to create modal dialog windows.
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  public openDialog({ positionRelativeToElement,
    hasBackdrop = false, height = '135px', width = '290px' }:
    {
      positionRelativeToElement: ElementRef, hasBackdrop?: boolean,
      height?: string, width?: string
    }): MatDialogRef<ChatbotDialogComponent> {

    const dialogRef: MatDialogRef<ChatbotDialogComponent> =
      this.dialog.open(ChatbotDialogComponent, {
        hasBackdrop: hasBackdrop,
        height: height,
        width: width,
        data: { positionRelativeToElement: positionRelativeToElement }
      })
    return dialogRef
  }
}
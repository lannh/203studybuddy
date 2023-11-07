import { Injectable, Output, EventEmitter } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class SideBarService {

  isOpen = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    console.log("sidebar service emit event")
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }

}
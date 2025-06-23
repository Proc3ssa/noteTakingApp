import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
@Output() openModal = new EventEmitter<void>();

  notifyParent(){
  this.openModal.emit();
  }
}

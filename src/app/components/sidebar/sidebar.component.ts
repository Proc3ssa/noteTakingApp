import { Component, EventEmitter, Output } from '@angular/core';
import { RouterEvent, RouterLink } from '@angular/router';
RouterEvent
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
@Output() openModal = new EventEmitter<void>();

  notifyParent(){
  this.openModal.emit();
  }
}

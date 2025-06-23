import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-notes',
  imports: [SidebarComponent, CommonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {

  showModal = true;

  openModalHandler(){
    this.showModal = true;
  }

  closeModalHandler(){
    this.showModal = false;
  }

}

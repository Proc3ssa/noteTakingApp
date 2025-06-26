import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SpaceComponent } from '../../components/space/space.component';
import { ɵnoSideEffects } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FoldersComponent } from '../../components/folders/folders.component';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FoldersComponent, SpaceComponent, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

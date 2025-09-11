import {Component} from '@angular/core';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NzLayoutModule, NzMenuModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}

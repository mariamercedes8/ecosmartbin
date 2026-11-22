import { Component } from '@angular/core';
import { BinManagerComponent } from './components/bin-manager/bin-manager.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BinManagerComponent],
  template: `<app-bin-manager />`
})
export class App {}
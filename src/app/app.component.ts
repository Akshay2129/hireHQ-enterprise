import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpService } from './service/http.service';
import { delay, Observable, of } from 'rxjs';
import { LoadingService } from './service/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hirehq-enterprise-web';

  loading$: Observable<boolean> = of(false);


  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$.pipe(delay(0));
  }
}

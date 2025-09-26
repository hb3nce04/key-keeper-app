import {Component, inject, OnInit} from '@angular/core';
import {NzContentComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {Navbar} from './navbar/navbar';
import {BehaviorSubject, filter, map} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    NzContentComponent,
    NzLayoutComponent,
    RouterOutlet,
    Navbar,
    AsyncPipe
  ],
  templateUrl: 'layout.html',
  styleUrl: 'layout.scss',
})
export class Layout implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router)

  protected readonly title$ = new BehaviorSubject<string>("");

  ngOnInit(): void {
    this.title$.next(this.getTitleFromRoute());
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.getTitleFromRoute())
      )
      .subscribe(title => this.title$.next(title));
  }

  private getTitleFromRoute(): string {
    let r = this.route;
    while (r.firstChild) {
      r = r.firstChild;
    }
    return r.snapshot.data?.['title'] || '';
  }
}

import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, filter} from 'rxjs';
import {ActivatedRouteSnapshot, Data, NavigationEnd, Router} from '@angular/router';

export interface BreadcrumbModel {
  label: string;
  url: string;
}

@Injectable({providedIn: 'root'})
export class BreadcrumbService {
  private router: Router = inject(Router);

  private readonly _breadcrumbs$ = new BehaviorSubject<BreadcrumbModel[]>([]);
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
    ).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: BreadcrumbModel[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);
      console.log(breadcrumbs)
      this._breadcrumbs$.next(breadcrumbs);
    })
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot | null, parentUrl: string[], breadcrumbs: BreadcrumbModel[]) {
    if (route) {
      const url = parentUrl.concat(route.url.map(url => url.path))

      if (route.data['breadcrumb']) {
        const breadcrumb = {
          label: this.getLabel(route.data),
          url:  '/' + url.join('/'),
        }
        breadcrumbs.push(breadcrumb);
      }

      this.addBreadcrumb(route.firstChild, url, breadcrumbs);
    }
  }

  private getLabel(data: Data) {
    return typeof data['breadcrumb'] === 'function' ? data['breadcrumb'](data) : data['breadcrumb'];
  }
}

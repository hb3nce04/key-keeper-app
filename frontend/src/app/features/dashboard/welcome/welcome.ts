import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {RoleService} from '../../../core/services/role.service';
import {StatisticsService} from './statistics.service';
import {StatisticsDto} from './statistics.dto';
import {Cards} from './cards/cards';
import {CardType} from './cards/card/card.type';

@Component({
  selector: 'app-home',
  template: `
    <div class="welcome">
      <h1>Üdvözöllek, {{ this.authService.getUsername() }}!</h1>
      <div>
        Jogosultságod: <b>{{ this.roleService.getRoleName(this.authService.isAdmin()) }}</b>
      </div>
    </div>
    <app-cards class="cards" [cards]="cards"/>
  `,
  imports: [
    Cards
  ],
  styles: `
    h1 {
      text-align: center;
    }

    .welcome {
      text-align: center;
      margin-bottom: 10px;
    }
  `
})
export class Welcome implements OnInit {
  protected authService = inject(AuthService);
  protected roleService = inject(RoleService);
  protected statisticsService = inject(StatisticsService);

  cards!: CardType[];

  ngOnInit(): void {
    this.statisticsService.getStatistics().subscribe(
      (data: StatisticsDto) => {
        this.cards = [
          {
            title: "Igénylések száma",
            content: `${data.borrowingCount} darab`
          },
          {
            title: "Kulcsok száma",
            content: `${data.keyCount} darab`
          },
          {
            title: "Helyiségek száma",
            content: `${data.roomCount} darab`
          },
          {
            title: "Igénylők száma",
            content: `${data.requesterCount} darab`
          },
          {
            title: "Felhasználók száma",
            content: `${data.userCount} darab`
          },
        ]
      }
    )
  }
}

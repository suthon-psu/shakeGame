import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-slot-picker',
  templateUrl: './slot-picker.page.html',
  styleUrls: ['./slot-picker.page.scss'],
})
export class SlotPickerPage implements OnInit {
  team: number
  slots = {}
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.team = parseInt(this.route.snapshot.paramMap.get('team'));
    this.db.object(`rooms/default/${this.team == 1 ? 'blue' : 'red'}/slots`)
      .valueChanges().subscribe(slots => this.slots = slots)
  }

  joinGame(num){
    this.db.object(`rooms/default/${this.team == 1 ? 'blue' : 'red'}/slots/slot${num}`)
      .set(this.gameService.uuid);
    
    this.gameService.team = this.team
    this.gameService.slot = num
    this.router.navigate(['/game-play'])    
  }

}

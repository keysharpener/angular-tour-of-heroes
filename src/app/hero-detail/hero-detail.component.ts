import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService }  from '../hero.service';
import { Hero } from '../hero';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private location: Location, private heroService : HeroService, private messageService: MessageService) { }
  hero: Hero;
  ngOnInit(): void {
    this.heroService.getHeroById(+this.route.snapshot.paramMap.get("id"))
    .subscribe(h=> this.hero = h);
  }
  save(){
    this.heroService.save(this.hero).subscribe(()=> this.location.back());
  }
  goBack() : void{
    this.location.back();
  }
  delete(){
    this.heroService.delete(this.hero).subscribe(_=> {
      this.messageService.add(`Delete hero ${this.hero}`);
      this.location.back();
    })
  }
}

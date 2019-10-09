import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-actor',  // if you want to use this component just use the <app-actor></app-actor> tag. This acts as the id.
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];

  section:number = 1;

  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  title: string = "";
  year: number = 0;
  aYear: number = 0;
  movieId: string = "";

  // the component has access to DatabaseService. Injects the service into the component.
  constructor(private dbService:DatabaseService)  { }  // will be invoked once a new instance is created.

  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {  // on initialization; things to do after the initialization of the object
    this.onGetActors();
    this.onGetMovies();
  }


  // getAllActors(){
  //   this.dbService.getActors().subscribe((data:any[]) =>{  // "data" is a handler
  //     alert(data.length);
  //   }); // Need to subscribe so we show an interest that we are interested in the data (observable) 
  //       // that is given by getActors(). Aka. Please provide the data to me once the data is available, I am waiting.
  // }
  

  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }

  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }


  //Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  //Create a new Movie, POST request
  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();  // onGetMovies();
    });
  }

  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete Movie by year
  onDeleteMovieYear() {
    this.dbService.deleteMovieYear(this.aYear).subscribe(result => {
      this.onGetMovies();
    });
  }

  // add actor to movie
  onSelectActor(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  onSelectMovie(item) {
    this.title = item.title;
    this.year = item.year;
    this.movieId = item._id;
    
  }


  // list number of actors & movies


  
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
  }

}

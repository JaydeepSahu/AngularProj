import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesServiceService {

  constructor(private _http:HttpClient) { }

  GetAllMovies(){
    return this._http.get('../../assets/Movies.json');
  }
}

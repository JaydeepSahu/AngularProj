import { Component } from "@angular/core";
import { MoviesServiceService } from "../Services/movies-service.service";
import { Movie } from "../DataModels/movie";
import { Seat } from "../DataModels/seat";
import { Result } from "../DataModels/result";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.css"],
})
export class MoviesComponent {
  constructor(private _movies: MoviesServiceService) { }
  movie!: Movie;
  seats!: Seat[][];
  selectedSeat: Seat[] = [];
  ngOnInit() {
    this._movies.GetAllMovies().subscribe((data: any) => {
      console.log(data);
      this.movie = data;
      this.seats = [];
      debugger;
      for (let i = 0; i < this.movie.Rows.length; i++) {
        const row = this.movie.Rows[i];
        const seatRow: Seat[] = [];
        for (let j = row.Start; j <= row.End; j++) {
          const status = row.AlreadyBooked.includes(j) ? "booked" : "empty";
          seatRow.push({ row: row.row, col: j, status: status });
        }
        this.seats.push(seatRow);
      }
    });
  }

  selectSeat(seat: Seat) {
    debugger;
    if (seat.status == 'booked') {
      return;
    }
    if (seat.status == 'selected') {
      seat.status = 'empty';
      const index = this.selectedSeat.findIndex(s => s.row == seat.row && s.col == seat.col);
      if (index >= 0) {
        this.selectedSeat.splice(index, 1);
      }
    }
    else {
      seat.status = 'selected';
      this.selectedSeat.push(seat);
    }
    console.warn(this.selectedSeat)
  }
  res!: Result;

  getBookedSeats(){
    return this.selectedSeat.length;
  }

  getTax(){
    return 0.2*this.getTotalAmount();
  }

  getTotalPayable(){
    return this.getTax()+this.getTotalAmount();
  }

  getTotalAmount(): number {
    const BookedSeats = this.getBookedSeats();
    const BasicPrice = this.movie.BasicPrice;
    let totalPrice = 0;
    for (let index = 0; index < BookedSeats; index++) {
      const element = this.selectedSeat[index];
      const pricePerRow = BasicPrice + (element.row-2) * 50;
      totalPrice += pricePerRow;
    }
    return totalPrice;
  }
}

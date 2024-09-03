import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  seats = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31, 32, 33, 34, 35],
    [36, 37, 38, 39, 40, 41, 42],
    [43, 44, 45, 46, 47, 48, 49],
    [50, 51, 52]
  ];

  bookedSeats: number[] = [2, 3, 4, 10, 15, 16]; // Some seats are already booked
  message: string = '';

  bookSeats(numSeats: number): void {
    const booked = [];

    for (let row of this.seats) {
      const availableSeats = row.filter(seat => !this.bookedSeats.includes(seat));

      if (availableSeats.length >= numSeats) {
        for (let i = 0; i < numSeats; i++) {
          const seat = availableSeats[i];
          this.bookedSeats.push(seat);
          booked.push(seat);
        }
        this.message = `Successfully booked seats: ${booked.join(', ')}`;
        return;
      }
    }

    // If no single row has enough seats, book nearby seats across rows
    for (let i = 0; i < numSeats; i++) {
      for (let row of this.seats) {
        const availableSeat = row.find(seat => !this.bookedSeats.includes(seat));
        if (availableSeat !== undefined) {
          this.bookedSeats.push(availableSeat);
          booked.push(availableSeat);
          if (booked.length === numSeats) {
            this.message = `Successfully booked seats: ${booked.join(', ')}`;
            return;
          }
        }
      }
    }

    this.message = booked.length === numSeats 
      ? `Successfully booked seats: ${booked.join(', ')}`
      : `Could only book ${booked.length} seat(s): ${booked.join(', ')}`;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.html',
})
export class App implements OnInit {
  movies = [{id:1,title:'peli1',year:2021},{id:2,title:'peli2',year:2022}];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.api.getAllMovies().subscribe(
      (data) => {
        console.log('Películas recibidas desde Django:', data);
        this.movies = data;  // <- ya activa la carga real
      },
      (error) => {
        console.error('Error al obtener películas:', error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonList, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonList, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, CommonModule, FormsModule, TranslocoModule]
})
export class ClassesPage implements OnInit {

  public readonly classes = [
    {
      'name': 'Math',
      'description': 'Learn about numbers and equations',
    },
    {
      'name': 'Science',
      'description': 'Explore the wonders of the universe',
    },
    {
      'name': 'History',
      'description': 'Discover the past and its impact on the present',
    },
    {
      'name': 'Art',
      'description': 'Express yourself through creativity and imagination',
    },
  ]


  constructor() { }


  ngOnInit() {
  }

}

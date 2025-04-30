import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButton, IonButtons, IonList, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonChip, IonIcon } from '@ionic/angular/standalone';
import { TranslocoModule } from '@jsverse/transloco';
import { Observable } from 'rxjs';
import { collection } from 'firebase/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Class } from 'src/models/class';
import { addIcons } from 'ionicons';
import { people, peopleOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButton, IonButtons, IonList, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonChip, IonIcon, CommonModule, FormsModule, TranslocoModule]
})
export class ClassesPage implements OnInit {

  public readonly classes$: Observable<Class[]>;

  constructor(private firestore: Firestore) {
    const classesCollection = collection(this.firestore, 'classes');
    this.classes$ = collectionData(classesCollection, { idField: 'id' }) as Observable<any[]>;
  }

  ngOnInit() {
    addIcons({ personOutline, peopleOutline })
  }

}

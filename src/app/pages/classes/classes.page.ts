import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButton, IonButtons, IonList, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonChip, IonIcon, IonModal } from '@ionic/angular/standalone';
import { TranslocoModule } from '@jsverse/transloco';
import { Observable } from 'rxjs';
import { collection } from 'firebase/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Class } from 'src/models/class';
import { addIcons } from 'ionicons';
import { peopleOutline, personOutline } from 'ionicons/icons';
import { TeacherModalComponent } from 'src/app/components/teacher-modal/teacher-modal.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButton, IonButtons, IonList, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonChip, IonIcon, IonModal, CommonModule, FormsModule, TranslocoModule]
})
export class ClassesPage implements OnInit {

  public readonly classes$: Observable<Class[]>;

  constructor(private firestore: Firestore, private modalCtrl: ModalController) {
    const classesCollection = collection(this.firestore, 'classes');
    this.classes$ = collectionData(classesCollection, { idField: 'id' }) as Observable<any[]>;
  }

  ngOnInit() {
    addIcons({ personOutline, peopleOutline })
  }

  async viewTeachers(classe: Class) {
    await this.openModal(classe);
  }

  private async openModal(classe: Class) {
    const modal = await this.modalCtrl.create({
      component: TeacherModalComponent,
      componentProps: { classe },
      initialBreakpoint: 0.5,
      breakpoints: [0.5, 0.25, 0.75],
      expandToScroll: false,
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();
    console.log('Modal dismissed with data:', data, 'and role:', role);


  }

}

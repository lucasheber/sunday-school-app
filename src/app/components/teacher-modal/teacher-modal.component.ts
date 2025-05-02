import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import {
  ModalController,
  NavParams,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonLabel,
  IonItem,
  IonList,
  IonIcon,
} from '@ionic/angular/standalone';
import { TranslocoModule } from '@jsverse/transloco';
import { collection, query, where, getDocs, documentId, orderBy } from 'firebase/firestore';
import { addIcons } from 'ionicons';
import { add, calendar, calendarOutline } from 'ionicons/icons';
import { Observable } from 'rxjs';
import { Class } from 'src/models/class';
import { Schedule } from 'src/models/schedule';
import { Teacher } from 'src/models/teacher';

@Component({
  selector: 'app-teacher-modal',
  templateUrl: './teacher-modal.component.html',
  styleUrls: ['./teacher-modal.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonLabel, IonItem, IonList, TranslocoModule, IonIcon, FormsModule, CommonModule],
  standalone: true,
})
export class TeacherModalComponent implements OnInit {
  classe: Class = {} as Class;
  teachers: Teacher[] = [];
  schedules: Schedule[] = [];

  constructor(
    private firestore: Firestore,
    private modalCtrl: ModalController,
    public navParams: NavParams
  ) {
    addIcons({ calendarOutline });
  }

  async ngOnInit() {
    addIcons({ calendarOutline });

    this.classe = this.navParams.get('classe');

    await this.loadTeachers();
    await this.loadSchedules();
  }



  async loadTeachers() {

    const teacherCollection = collection(this.firestore, 'teachers');
    const teachersQuery = query(teacherCollection);
    const teachersSnapshot = await getDocs(teachersQuery);

    this.teachers = teachersSnapshot.docs.map(doc => {
      const data = doc.data() as Teacher;
      return {
        id: doc.id,
        name: data.name,
        position: data.position,
      };
    });

    console.log('Teachers:', this.teachers);
  }

  async loadSchedules() {
    const schedulesQuery = query(
      collection(this.firestore, 'schedules'),
      where('classId', '==', this.classe.id),
      orderBy('timestamp')
    );

    getDocs(schedulesQuery).then(snapshot => {
      this.schedules = snapshot.docs.map(doc => {
        return doc.data() as Schedule;
      });
      console.log('Schedules:', this.schedules);
    }).catch(error => {
      console.error('Error fetching schedules:', error);
    });
  }

  getTeacherName(teacherId: string, shorten = false): string {
    const teacher = this.teachers.find(t => t.id === teacherId);
    return teacher ? (shorten ? `${teacher.position.shorten} ${teacher.name}` : teacher.name) : 'Unknown';
  }

  getNextSunday(fromDate = new Date()) {
    const date = new Date(fromDate); // clone
    const day = date.getDay();
    const diff = (7 - day) % 7 || 7; // ensure at least 1 day ahead
    date.setDate(date.getDate() + diff);
    return date.toISOString().split('T')[0]; // format YYYY-MM-DD
  }

  // Get the next sunday date and return color if param is equal
  getColor(dateStr: string): string {

    const date = new Date(dateStr);
    const sunday = new Date(this.getNextSunday());

    if (date < sunday) return 'success';
    else if (date > sunday) return 'light';

    return 'warning';
  }


  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

}

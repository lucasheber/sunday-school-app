import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonIcon, IonChip, IonNote, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { TranslocoModule } from '@jsverse/transloco';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { addIcons } from 'ionicons';
import { bookOutline } from 'ionicons/icons';
import { Schedule } from 'src/models/schedule';
import { Teacher } from 'src/models/teacher';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonChip,
    IonNote,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonSelect,
    IonSelectOption,
    CommonModule,
    IonMenuButton,
    TranslocoModule,
  ],
})
export class HomePage {

  public schedules: Schedule[] = [];
  public results: Schedule[] = [];
  public teachers: Teacher[] = [];

  constructor(private firestore: Firestore) {

    addIcons({ bookOutline });

    const schedulesQuery = query(
      collection(this.firestore, 'schedules'),
      orderBy('timestamp')
    )

    getDocs(schedulesQuery).then(snapshot => {
      this.results = this.schedules = snapshot.docs.map(doc => {
        return doc.data() as Schedule;
      });
      console.log('Schedules:', this.schedules);
    }).catch(error => {
      console.error('Error fetching schedules:', error);
    });
  }

  async ngOnInit() {
    await this.loadTeachers();
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

  getTeacherName(teacherId: string, shorten = false): string {
    const teacher = this.teachers.find(t => t.id === teacherId);
    return teacher ? (shorten ? `${teacher.position.shorten} ${teacher.name}` : teacher.name) : 'Unknown';
  }

  filter(event: CustomEvent) {
    const today = new Date();
    const selected = event.detail.value;

    if (selected === 'all') {
      this.results = this.schedules;
      return;
    };

    this.results = this.schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.date);

      if (selected === 'notLearned') {
        return scheduleDate >= today;
      }
      if (selected === 'learned') {
        return scheduleDate < today;
      }

      return false;
    });
  }
}

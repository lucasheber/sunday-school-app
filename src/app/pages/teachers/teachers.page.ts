import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimationController, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonMenuButton, IonSearchbar, IonList, IonItem, IonAvatar, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonModal } from '@ionic/angular/standalone';
import { TranslocoModule } from '@jsverse/transloco';
import { addIcons } from 'ionicons';
import { eye, trash } from 'ionicons/icons';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.page.html',
  styleUrls: ['./teachers.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonMenuButton, IonSearchbar, IonList, IonItem, IonAvatar, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonModal, CommonModule, FormsModule, TranslocoModule]
})
export class TeachersPage implements OnInit {
  @ViewChild('firstSliding') firstSliding: IonItemSliding | undefined;

  urlAvatar = 'https://gravatar.com/avatar/3268f1aa00bd5439c2ce2dfe10d541ab?s=400&d=robohash&r=x';
  isModalOpen = false;
  selectedTeacher: any = null;


  public readonly teachers = [
    { name: 'John Doe', subject: 'Mathematics', avatar: this.urlAvatar, isSliding: false },
    { name: 'Jane Smith', subject: 'Science', avatar: this.urlAvatar, isSliding: false },
    { name: 'Emily Johnson', subject: 'History', avatar: this.urlAvatar, isSliding: true },
    { name: 'Michael Brown', subject: 'English', avatar: this.urlAvatar, isSliding: false },
    { name: 'Sarah Davis', subject: 'Physical Education', avatar: this.urlAvatar, isSliding: false },
  ];


  public data = this.teachers.map((teacher) => teacher);
  public results = [...this.data];;

  constructor(private animationCtrl: AnimationController) {
    addIcons({ eye, trash });
  }

  async ngOnInit() {
    addIcons({ trash, eye });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.firstSliding?.open('end');
      setTimeout(() => {
        this.firstSliding?.close();
      }, 1500); // auto-close after 1.5s
    }, 1000); // delay to wait for view render
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root!.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root!.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.results = this.data.filter((d: any) => d.name.toLowerCase().includes(query));
  }

  deleteTeacher(teacher: any) {
    const index = this.teachers.indexOf(teacher);
    if (index > -1) {
      this.teachers.splice(index, 1);
    }

    this.results = [...this.teachers];
  }

  viewTeacher(teacher: any) {
    console.log('View teacher:', teacher);
    this.selectedTeacher = teacher;
    this.isModalOpen = true;
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from 'src/app/interfaces/usuario'; // Asegúrate de que la interfaz Usuario esté importada

@Component({
  selector: 'app-uaccount',
  templateUrl: './uaccount.page.html',
  styleUrls: ['./uaccount.page.scss'],
})
export class UaccountPage implements OnInit {

  userData: Usuario | undefined; 
  loading: boolean = true; 

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.firestore.collection('usuarios').doc(user.uid).valueChanges().subscribe(data => {
          this.userData = data as Usuario;
          this.loading = false; 
        });
      } else {
        this.loading = false; 
      }
    });
  }
}
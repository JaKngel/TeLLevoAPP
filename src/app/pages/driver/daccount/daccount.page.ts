import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from 'src/app/interfaces/usuario'; // Asegúrate de que la interfaz Usuario esté importada

@Component({
  selector: 'app-daccount',
  templateUrl: './daccount.page.html',
  styleUrls: ['./daccount.page.scss'],
})
export class DaccountPage implements OnInit {

  driverData: Usuario | undefined; 
  loading: boolean = true; 

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.loadDriverData();
  }

  loadDriverData() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.firestore.collection('usuarios').doc(user.uid).valueChanges().subscribe(data => {
          this.driverData = data as Usuario;
          this.loading = false; 
        });
      } else {
        this.loading = false; 
      }
    });
  }
}
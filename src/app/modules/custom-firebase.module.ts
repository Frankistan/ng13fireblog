import { NgModule } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage } from '@angular/fire/storage';
import { environment } from "@env/environment";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


@NgModule({
    declarations: [],
    imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage())
    ],
})
export class CustomFirebaseModule { }

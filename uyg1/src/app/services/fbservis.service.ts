import { Uye } from './../models/uye';
import { kayit } from './../models/kayit';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class FbservisService {

  private dbKayit = '/Kayitlar';
  private dbUye = '/Uyeler';

  kayitRef: AngularFireList<kayit> = null;
  uyeRef: AngularFireList<Uye> = null;
    constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
  ) {
    this.kayitRef = db.list(this.dbKayit);
    this.uyeRef = db.list(this.dbUye);
  }
  OturumKontrol() {
    if (localStorage.getItem("user")) {
      return true;
    } else {
      return false;
    }
  }
  OturumAc(mail: string, parola: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }
  UyeOl(uye: Uye) {
    return this.afAuth.createUserWithEmailAndPassword(uye.mail, uye.parola);
  }
  OturumKapat() {
    return this.afAuth.signOut();
  }
  UyeEkle(uye: Uye) {
    return this.uyeRef.push(uye);
  }

  KayitListele(){
   return this.kayitRef;
  }
  KayitEkle(kayit: kayit){
    return this.kayitRef.push(kayit);
  }
  KayitDuzenle(kayit:kayit){
    return this.kayitRef.update(kayit.key,kayit);
  }
  KayitSil(key:string){
    return this.kayitRef.remove(key);
  }


}

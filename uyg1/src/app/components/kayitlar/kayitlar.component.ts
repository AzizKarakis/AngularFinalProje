import { Sonuc } from './../../models/sonuc';
import { FbservisService } from './../../services/fbservis.service';
import { kayit } from './../../models/kayit';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-kayitlar',
  templateUrl: './kayitlar.component.html',
  styleUrls: ['./kayitlar.component.css']
})
export class KayitlarComponent implements OnInit {
  secKayit:kayit= new kayit();
  sonuc:Sonuc= new Sonuc();
  kayitlar: any;

  constructor(
    public fbservis:FbservisService,
    public router:Router
  ) { }

  ngOnInit() {
    this.secKayit.key=null;
    this.KayitListele();
  }
  OturumKapat(){
    this.fbservis.OturumKapat().then(d=>{
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    })
  }
  KayitListele() {
    this.fbservis.KayitListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.kayitlar = data;
    });

  }
  KayitDuzenle(kayit: kayit) {
    Object.assign(this.secKayit, kayit);
  }
  Kaydet() {
    var tarih = new Date();
    this.secKayit.duzTarih = tarih.getTime().toString();

    if (this.secKayit.key == null) {
      this.secKayit.kayTarih = tarih.getTime().toString();
      this.fbservis.KayitEkle(this.secKayit).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Eklendi";
      });
    }
    else {
      this.fbservis.KayitDuzenle(this.secKayit).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Düzenlendi";
      });
    }
  }
  KayitSil(kayit: kayit) {
    this.fbservis.KayitSil(kayit.key).then(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Silindi";
    });
  }

}

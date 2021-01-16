import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public fbServis:FbservisService,
    public router:Router
  ) { }

  ngOnInit() {
  }
  OturumKapat(){
    this.fbServis.OturumKapat().then(d=>{
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Advertisement } from '@models/advertisement';
import { AdvertisementService } from '@services/advertisement.service';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
})
export class AdvertisementComponent implements OnInit {
  advertisements: Array<Advertisement>;

  constructor(private advertisementService: AdvertisementService) { }

  ngOnInit() {
    this.advertisementService.getAdvertisements().subscribe(
      response => {
        this.advertisements = response;
      },
      error => {

      },
    );
  }

}

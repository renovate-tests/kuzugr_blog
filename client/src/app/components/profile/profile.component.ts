import { Component, OnInit } from '@angular/core';
import { BlogInformation } from '../../shared/models/blog-information';
import { BlogInformationService } from '../../shared/services/blog-information.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  blogInformation: BlogInformation;
  blogInformationLoaded: boolean;

  constructor(private blogInformationService: BlogInformationService) {}

  ngOnInit() {
    this.blogInformationLoaded = false;
    this.getBlogInformation();
  }

  getBlogInformation() {
    this.blogInformationService.getBlogInformation().subscribe(
      (response) => {
        this.blogInformation = response;
        this.blogInformationLoaded = true;
      },
      (errot) => {},
    );
  }
}

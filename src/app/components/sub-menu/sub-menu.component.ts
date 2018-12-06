import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Title} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from './../../services/get-data/get-data.service';

// Language
import { default as LANG_VI } from './../../../lang/lang_vi';
import { default as LANG_JP } from './../../../lang/lang_jp';
import * as $ from 'jquery';


@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',

  styleUrls: ['./sub-menu.component.css'],
  providers: [
    GetDataService]
})

export class SubMenuComponent implements OnInit {

  public LANGUAGE : any;
  public isVietnamese: boolean = true;
  lang: string = "vi";
  public
  headerURL: string;
  headerData;
  CategoriesURL: string;
  CategoriesData;
  introductionURL: string;
  introductionData;
  getJobsURL: string;
  jobs;
  getServicesURL: string;
  services;
  courseDataItem: any;
  servicesItem;
  jobsItem;
  introductonItem;
  jpintroduction;
  jpcourse;
  jpjobs;
  jbservices;

  // Side navigation item
  apiCategories: string;
  intro: any;
  service: any;
  career: any;
  linkIntoVietnamese: any;
  linkServiceVietnamese: any;
  linkCareerVietnamese: any;
  introData: any = [];
  serviceData: any = [];
  careerData: any = [];
  itemContents: any = {
    vietnameseName: '',
    japaneseName: '',
    vietnameseContents : '',
    japaneseContents : ''
  };
  slug: any = {
    vietnameseSlug : '',
    japaneseSlug : ''
  };

  headers = [];
  constructor(
    private _titleService: Title,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _route: ActivatedRoute,
    private router: Router
  ) {
    // Get data introduction
    this.apiCategories = this._getDataService.getCategoriesURL();
    this.http.get(this.apiCategories).subscribe(data => {
      this.intro = data;
      for (let i=0; i< this.intro.length; i++) {
        if (this.intro[i].Parent && (this.intro[i].Parent.Name === this.LANGUAGE.INTRODUCTION_PAGE || this.intro[i].Parent.Japanese_Name === this.LANGUAGE.INTRODUCTION_PAGE)) {
          this.introData.push(this.intro[i]);
        }
      }
    });

    // Get data services
    this.apiCategories = this._getDataService.getCategoriesURL();
    this.http.get(this.apiCategories).subscribe(data => {
      this.service = data;
      for (let i=0; i< this.service.length; i++) {
        if (this.service[i].Parent && (this.service[i].Parent.Name === this.LANGUAGE.SERVICE_AND_PARTNER || this.service[i].Parent.Japanese_Name === this.LANGUAGE.SERVICE_AND_PARTNER)) {
          this.serviceData.push(this.service[i]);
        }
      }
    });

    // Get data career
    this.apiCategories = this._getDataService.getCategoriesURL();
    this.http.get(this.apiCategories).subscribe(data => {
      this.career = data;
      for (let i=0; i< this.career.length; i++) {
        if (this.career[i].Parent && (this.career[i].Parent.Name === this.LANGUAGE.CAREER_OPPOTUNITY || this.career[i].Parent.Japanese_Name === this.LANGUAGE.CAREER_OPPOTUNITY)) {
          this.careerData.push(this.career[i]);
        }
      }
    });
  }

  ngOnInit() {

     // Change language
     this._route.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.isVietnamese = true;
        this.LANGUAGE = LANG_VI;
      } else {
        this.isVietnamese = false;
        this.LANGUAGE = LANG_JP;
      }
    }); 

    this._route.queryParams.subscribe(data => {
      this.lang = data.lang;
    });
  }

  selectIntro(intro) {
    this.router.navigate(['/','gioi-thieu'], {relativeTo: this._route, queryParams: { lang: this.lang == 'vi' ?'vi':'jp'}});
    let tempContents; 
    let vietnameseSlug; 
      let itemContentURL = this.apiCategories + '/' + intro._id;
      this.http.get(itemContentURL).subscribe(data => {
        tempContents = data;
        this.itemContents.vietnameseContents = tempContents.contents.Content;
        this.itemContents.vietnameseName =  tempContents.contents.Name;
        vietnameseSlug = tempContents.contents.Name;
        this.slug.vietnameseSlug = vietnameseSlug.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
        window.location.hash = (this.slug.vietnameseSlug);
        this.itemContents.japaneseContents = tempContents.contents.Japanese_Content;
        this.itemContents.japaneseName =  tempContents.contents.Japanese_Name;
      });
  }

  selectService(service) {
    this.router.navigate(['/','dich-vu-doi-tac'], {relativeTo: this._route, queryParams: { lang: this.lang == 'vi' ?'vi':'jp', id :  service._id }});
  }

  selectCareer(career) {
    this.router.navigate(['/','co-hoi-nghe-nghiep'], {relativeTo: this._route, queryParams: { lang: this.lang == 'vi' ?'vi':'jp', id :  career._id }});
  }
}
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataService } from './../../../services/get-data/get-data.service';
import { ScrollTopService } from './../../../services/scroll-top/scroll-top.service';
import { GetImagesService } from './../../../services/get-image-slider/get-images.service';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

import { default as LANG_VI } from '../../../../lang/lang_vi';
import { default as LANG_JP } from '../../../../lang/lang_jp';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [ScrollTopService, GetDataService, GetImagesService]
})

export class EventComponent implements OnInit {
  serverURL: string;
  lang: string;
  introductionURL: string;
  introductionsData;
  introduction;
  public LANGUAGE: any = LANG_VI;

  // Event variable
  eventsURL: any;
  eventsData: any;
  eventsFrist: any;
  ImageFrist: any;
  eventsSecond: any;
  ImageSecond: any;
  eventsThrid: any;
  ImageThrid: any;
  eventNameFrist: any;
  eventJapanNameFrist: any;
  eventObjectFrist: any;
  eventJpObjectFrist: any;
  eventNameSecond: any;
  eventJapanNameSecond: any;
  eventObjectSecond: any;
  eventJpObjectSecond: any;
  eventNameThrid: any;
  eventJapanNameThrid: any;
  eventObjectThrid: any;
  eventJpObjectThrid: any;

  constructor(
    private _scrollTop: ScrollTopService,
    private http: HttpClient,
    private _getDataService: GetDataService,
    private _route: ActivatedRoute,
    private _getImageService: GetImagesService
  ) {
    this.serverURL = this._getDataService.serverURL;
  }

  ngOnInit() {
    // Change language
    this._route.queryParams.subscribe(data => {
      if (data.lang === 'vi') {
        this.LANGUAGE = LANG_VI;
      } else {
        this.LANGUAGE = LANG_JP;
      }
    });

    this.eventsURL = this._getDataService.getNewsURL();
    this.http.get(this.eventsURL).subscribe(data =>{
      this.eventsData = data;
      for(var i = 0; i < this.eventsData.length; i++){

      this.eventsFrist = this.eventsData[this.eventsData.length - 1];
      this.ImageFrist = this.serverURL + this.eventsData[this.eventsData.length - 1].Thumbnail.url;
      
      this.eventsSecond = this.eventsData[this.eventsData.length - 2];
      this.ImageSecond = this.serverURL + this.eventsData[this.eventsData.length - 2].Thumbnail.url; 

      this.eventsThrid = this.eventsData[this.eventsData.length - 3];
      this.ImageThrid = this.serverURL + this.eventsData[this.eventsData.length - 3].Thumbnail.url;  

      } 
      this.eventNameFrist = this.eventsFrist.Name;
      this.eventJapanNameFrist = this.eventsFrist.Japanese_Name;
      this.eventObjectFrist = this.eventsFrist.Object;
      this.eventJpObjectFrist = this.eventsFrist.Object_Japanese;

      this.eventNameSecond = this.eventsSecond.Name;
      this.eventJapanNameSecond = this.eventsSecond.Japanese_Name;
      this.eventObjectSecond = this.eventsSecond.Object;
      this.eventJpObjectSecond = this.eventsSecond.Object_Japanese;
  
      this.eventNameThrid = this.eventsThrid.Name;
      this.eventJapanNameThrid = this.eventsThrid.Japanese_Name;
      this.eventObjectThrid = this.eventsThrid.Object;
      this.eventJpObjectThrid = this.eventsThrid.Object_Japanese;

    });

    this._scrollTop.setScrollTop();
    this._route.queryParams.subscribe(data => {
      this.lang = data.lang;
    });

    
  }

  
}
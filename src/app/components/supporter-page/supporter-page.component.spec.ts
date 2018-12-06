import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupporterPageComponent } from './supporter-page.component';

describe('AdminDashboardComponent', () => {
  let component: SupporterPageComponent;
  let fixture: ComponentFixture<SupporterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupporterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupporterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

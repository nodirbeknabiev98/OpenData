import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionServerComponent } from './section-server.component';

describe('SectionHealthComponent', () => {
  let component: SectionServerComponent;
  let fixture: ComponentFixture<SectionServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionServerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

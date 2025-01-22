import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiographsComponent } from './radiographs.component';

describe('RadiographsComponent', () => {
  let component: RadiographsComponent;
  let fixture: ComponentFixture<RadiographsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadiographsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadiographsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

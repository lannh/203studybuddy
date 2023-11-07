import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialContentComponent } from './tutorial-content.component';

describe('TutorialContentComponent', () => {
  let component: TutorialContentComponent;
  let fixture: ComponentFixture<TutorialContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

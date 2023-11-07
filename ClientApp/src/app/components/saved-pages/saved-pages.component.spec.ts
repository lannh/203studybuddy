import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPagesComponent } from './saved-pages.component';

describe('SavedPagesComponent', () => {
  let component: SavedPagesComponent;
  let fixture: ComponentFixture<SavedPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedPagesComponent]
    });
    fixture = TestBed.createComponent(SavedPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

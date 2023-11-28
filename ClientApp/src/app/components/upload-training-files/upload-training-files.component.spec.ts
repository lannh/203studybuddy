import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTrainingFilesComponent } from './upload-training-files.component';

describe('UploadTrainingFilesComponent', () => {
  let component: UploadTrainingFilesComponent;
  let fixture: ComponentFixture<UploadTrainingFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadTrainingFilesComponent]
    });
    fixture = TestBed.createComponent(UploadTrainingFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

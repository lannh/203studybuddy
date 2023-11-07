import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotBtnComponent } from './chatbot-btn.component';

describe('ChatbotBtnComponent', () => {
  let component: ChatbotBtnComponent;
  let fixture: ComponentFixture<ChatbotBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatbotBtnComponent]
    });
    fixture = TestBed.createComponent(ChatbotBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

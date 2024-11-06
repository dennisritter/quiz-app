import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsCpQuizComponent } from './aws-cp-quiz.component';

describe('AwsCpQuizComponent', () => {
  let component: AwsCpQuizComponent;
  let fixture: ComponentFixture<AwsCpQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwsCpQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwsCpQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

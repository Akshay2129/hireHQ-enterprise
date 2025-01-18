import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkPrivacyPolicyComponent } from './uk-privacy-policy.component';

describe('UkPrivacyPolicyComponent', () => {
  let component: UkPrivacyPolicyComponent;
  let fixture: ComponentFixture<UkPrivacyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UkPrivacyPolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkJobLogsComponent } from './bulk-job-logs.component';

describe('BulkJobLogsComponent', () => {
  let component: BulkJobLogsComponent;
  let fixture: ComponentFixture<BulkJobLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkJobLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkJobLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

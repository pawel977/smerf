import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuePlayerItemComponent } from './queue-player-item.component';

describe('QueuePlayerItemComponent', () => {
  let component: QueuePlayerItemComponent;
  let fixture: ComponentFixture<QueuePlayerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueuePlayerItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuePlayerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

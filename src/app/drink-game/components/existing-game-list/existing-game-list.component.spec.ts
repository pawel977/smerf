import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingGameListComponent } from './existing-game-list.component';

describe('ExistingGameListComponent', () => {
  let component: ExistingGameListComponent;
  let fixture: ComponentFixture<ExistingGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingGameListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitGameByNameComponent } from './init-game-by-name.component';

describe('InitGameByNameComponent', () => {
  let component: InitGameByNameComponent;
  let fixture: ComponentFixture<InitGameByNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitGameByNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitGameByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

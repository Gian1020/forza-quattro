import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Colonna } from './colonna';

describe('Colonna', () => {
  let component: Colonna;
  let fixture: ComponentFixture<Colonna>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Colonna]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Colonna);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

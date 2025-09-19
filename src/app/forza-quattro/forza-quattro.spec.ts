import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForzaQuattro } from './forza-quattro';

describe('ForzaQuattro', () => {
  let component: ForzaQuattro;
  let fixture: ComponentFixture<ForzaQuattro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForzaQuattro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForzaQuattro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

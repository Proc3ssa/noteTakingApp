import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConentantComponent } from './modal-conentant.component';

describe('ModalConentantComponent', () => {
  let component: ModalConentantComponent;
  let fixture: ComponentFixture<ModalConentantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalConentantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConentantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

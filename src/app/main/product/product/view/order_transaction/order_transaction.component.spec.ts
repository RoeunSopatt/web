import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTransactionComponent } from './order_transaction.component';

describe('OrderTransactionComponent', () => {
  let component: OrderTransactionComponent;
  let fixture: ComponentFixture<OrderTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

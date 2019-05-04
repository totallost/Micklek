import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardManagementComponent } from './item-card-management.component';

describe('ItemCardManagementComponent', () => {
  let component: ItemCardManagementComponent;
  let fixture: ComponentFixture<ItemCardManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCardManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

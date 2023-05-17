import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGwComponent } from './my-gw.component';

describe('MyGwComponent', () => {
  let component: MyGwComponent;
  let fixture: ComponentFixture<MyGwComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyGwComponent]
    });
    fixture = TestBed.createComponent(MyGwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

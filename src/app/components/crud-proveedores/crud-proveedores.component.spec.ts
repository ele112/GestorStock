import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudProveedoresComponent } from './crud-proveedores.component';

describe('CrudProveedoresComponent', () => {
  let component: CrudProveedoresComponent;
  let fixture: ComponentFixture<CrudProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
  });
});

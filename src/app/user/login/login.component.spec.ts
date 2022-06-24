import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule, BrowserAnimationsModule, FormsModule, RouterTestingModule, MatSnackBarModule, MatSelectModule, MatFormFieldModule, MatInputModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate user', () => {
    fixture.detectChanges();
    spyOn(service, 'getUser').and.callFake(() => {
      return of('token');
    });
    component.onSubmit();    
    expect(service.getUser).toHaveBeenCalled();
  });

  it('generate otp', () => {
    fixture.detectChanges();
    spyOn(service, 'generateOtp').and.callFake(() => {
      return of('otp');
    });
    component.generateOtp();    
    expect(service.generateOtp).toHaveBeenCalled();
  });

  it('validate otp', () => {
    fixture.detectChanges();
    spyOn(service, 'validateOtp').and.callFake(() => {
      return of('Valid');
    });
    component.validateOtp();    
    expect(service.validateOtp).toHaveBeenCalled();
  });
});

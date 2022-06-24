import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

export const MockUser = {userName: 'codingTrinity', password: 'Coding@12345'};

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be register new user', () => {
    service.registerUser('data').subscribe(resp => {
      expect(MockUser.userName).toEqual('codingTrinity');
    })
    const req = httpMock.expectOne("http://localhost:6091/estockmarket-command/api/v1.0/command/user/register");
    expect(req.request.method).toBe('POST');
    httpMock.verify();
  });

  it('to get the list of users', () => {
    service.getUser('data').subscribe(resp => {
      expect(MockUser.userName).toEqual('codingTrinity');
    })
    const req = httpMock.expectOne("http://localhost:6091/estockmarket-query/api/v1.0/query/user/authenticate");
    expect(req.request.method).toBe('POST');
    httpMock.verify();
  });

  it('generate otp', () => {
    service.generateOtp('email').subscribe(resp => {
      expect('otppage').toEqual(resp);
    })
    const req = httpMock.expectOne("http://localhost:6091/estockmarket-query/api/v1.0/query/user/generateOtp?email=email");
    expect(req.request.method).toBe('GET');
    httpMock.verify();
  });

  it('validate otp', () => {
    service.validateOtp('codingTrinity@gmail.com',789678).subscribe(resp => {
      expect('Entered otp is Valid').toEqual(resp);
    })
    const req = httpMock.expectOne("http://localhost:6091/estockmarket-query/api/v1.0/query/user/validateOtp?email=codingTrinity@gmail.com&otpnum=789678");
    expect(req.request.method).toBe('GET');
    httpMock.verify();
  });
});

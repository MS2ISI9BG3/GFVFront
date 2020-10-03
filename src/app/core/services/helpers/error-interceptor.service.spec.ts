import { TestBed } from '@angular/core/testing';
import { ErrorInterceptorService } from './error-interceptor.service';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ErrorInterceptorService', () => {
  
  let authentificationService: AuthenticationService;

  /*let mockRouter:any;
    class MockRouter {
        navigate = jasmine.createSpy('navigate');
    }*/

  beforeEach(() => TestBed.configureTestingModule({ 
    providers: [ErrorInterceptorService, AuthenticationService/*, { provide: Router, useValue: mockRouter }*/],
    imports: [HttpClientModule, RouterTestingModule]
  }));

  it('should be created', () => {
    const service: ErrorInterceptorService = TestBed.get(ErrorInterceptorService);
    expect(service).toBeTruthy();
  });
});

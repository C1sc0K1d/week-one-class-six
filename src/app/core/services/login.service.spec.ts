import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { MessageService } from '../helpers/message.service';
import { environment } from 'src/environments/environment';
import { UserListResponse, UserResponse } from 'src/app/shared/responses/user-response';

describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService, MessageService]
    });
    service = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(MessageService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a user variable', () => {
    expect(service.getUser()).toBe('login');
  });

  it('should set the user variable', () => {
    localStorage.setItem('userName', 'John');
    service.setUser('John');
    expect(service.getUser()).toBe('John');
    localStorage.removeItem('userName');
  });

  it('should check if user is admin', () => {
    localStorage.setItem('isAdmin', 'true');
    service.setIsAdmin(true);
    expect(service.getIsAdmin()).toBe(true);
    localStorage.removeItem('isAdmin');
  });

  it('should logout', () => {
    service.setUser('John');
    service.logout();
    expect(service.getUser()).toBe('login');
  });

  it('should login a user', () => {
    const usr = { userName: 'Jão', password: 'password' };
    const userResponse: UserResponse = { user: usr};
    service.login(usr).subscribe(response => {
      expect(response).toEqual(userResponse);
    });

    const req = httpTestingController.expectOne(environment.baseUrl + '/user/login');
    expect(req.request.method).toEqual('POST');
    req.flush(userResponse);
  });

  it('should get a list of users', () => {
    const usrs = [{ userName: 'Pedro', password: '1234' }, { userName: 'Clara', password: '4321' }];
    const usersResponse: UserListResponse = { users : usrs };
    service.getUsers().subscribe(response => {
      expect(response).toEqual(usersResponse);
    });

    const req = httpTestingController.expectOne(environment.baseUrl + '/user');
    expect(req.request.method).toEqual('GET');
    req.flush(usersResponse);
  });
});
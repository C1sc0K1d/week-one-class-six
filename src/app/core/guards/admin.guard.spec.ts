import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let service: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

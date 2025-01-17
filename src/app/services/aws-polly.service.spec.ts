import { TestBed } from '@angular/core/testing';

import { AwsPollyService } from './aws-polly.service';

describe('AwsPollyService', () => {
  let service: AwsPollyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsPollyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

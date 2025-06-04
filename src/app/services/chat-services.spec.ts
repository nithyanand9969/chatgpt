import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ChatServices } from './chat-services';

describe('ChatServices', () => {
  let service: ChatServices;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ChatServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

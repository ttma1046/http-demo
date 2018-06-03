// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HeroesService } from './heroes.service';

describe('HeroesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroesService]
    });
  });

  it('should be created', inject([HeroesService], (service: HeroesService) => {
    expect(service).toBeTruthy();
  }));
});

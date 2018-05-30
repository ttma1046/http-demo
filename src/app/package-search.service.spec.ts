import { TestBed, inject } from '@angular/core/testing';

import { PackageSearchService } from './package-search.service';

describe('PackageSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackageSearchService]
    });
  });

  it('should be created', inject([PackageSearchService], (service: PackageSearchService) => {
    expect(service).toBeTruthy();
  }));
});

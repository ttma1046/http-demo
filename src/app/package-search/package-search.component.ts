import { Component, OnInit } from '@angular/core';
import { PackageSearchService } from '../package-search.service';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NpmPackageInfo } from '../entities/npmpackageinfo';
@Component({
    selector: 'app-package-search',
    templateUrl: './package-search.component.html',
    styleUrls: ['./package-search.component.css']
})
export class PackageSearchComponent implements OnInit {

    withRefresh = false;
    packages$: Observable<NpmPackageInfo[]>;
    private searchText$ = new Subject<string>();

    search(packageName: string) {
        this.searchText$.next(packageName);
    }

    constructor(private searchService: PackageSearchService) { }

    ngOnInit() {
        this.packages$ = this.searchText$.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(packageName =>
                this.searchService.search(packageName, this.withRefresh))
            );
    }

 toggleRefresh() { this.withRefresh = ! this.withRefresh; }
}


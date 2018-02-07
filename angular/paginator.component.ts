import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
//import {PaginatorObject, PaginatorSettings} from "../../../../../../../restapi/src/rest_api/utils/Paginator";

@Component(
    {
        selector:'paginator-pages',
        templateUrl:'./paginator.component.html',
        styleUrls:['./paginator.css']
    }
)
export class PaginatorComponent implements OnChanges
{
    @Input() settings:any;
    @Input() results:any;

    @Output() fetchData = new EventEmitter();

    protected pages:any[] = [];

    ngOnChanges(changes)
    {
        if(changes.hasOwnProperty('results'))
        {
            if(this.results != null)
                this.pages.length = this.results.allPages;
        }
    }
    constructor()
    {

    }

    nextPage()
    {
        this.settings.forcePage = false;
        if((this.settings.toPage + 1) > this.results.allPages)
            return;
        this.settings.toPage++;
        this.fetchData.emit(this.settings);
    }
    prevPage()
    {
        this.settings.forcePage = false;
        if((this.settings.toPage - 1) <= 0)
            return;
        this.settings.toPage--;
        this.fetchData.emit(this.settings);
    }
    toPage(toPage:number)
    {
        this.settings.toPage = toPage;
        this.settings.forcePage = true;
        this.fetchData.emit(this.settings);
        this.settings.toPage++;
    }

}
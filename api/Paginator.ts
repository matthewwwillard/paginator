export interface PaginatorSettings
{
    perPage:number;
    currentPage:number;
    toPage:number;
    forcePage:boolean;
}
export class PaginatorObject
{
    currentPage:number;
    allPages:number;
    viewData:any[] = [];
    allData:any[];
    hasError:boolean = false;
    errMessage:string;

}
export class Paginator
{
    public static async PaginateData(data:any[], settings:PaginatorSettings)
    {
        let paginatorObject:PaginatorObject = new PaginatorObject();
        try
        {
            let direction = 1;

            if(settings.toPage < settings.currentPage && (settings.forcePage == null || !settings.forcePage))
                direction = -1;
            if((settings.forcePage =! null && settings.forcePage))
            {
                settings.currentPage = settings.toPage;
            }

            let from = settings.currentPage * (settings.perPage);
            let to = from + (settings.perPage * direction);

            if(direction < 0)
            {
                from = from - settings.perPage;
                to = to - settings.perPage;
            }


            if(to > data.length)
                to = data.length;

            if(from > data.length)
                from = data.length;

            paginatorObject.allPages = Math.round(data.length / settings.perPage);
            paginatorObject.allData = data;

            paginatorObject.currentPage = settings.currentPage + direction;

            console.log(from, to);

            if(from < to)
                for(let i = from; i < (data.length > to ? to : data.length); i++)
                {
                    paginatorObject.viewData.push(data[i]);
                }
            else
                for(let i = to; i < (data.length - settings.perPage > 0 ? from : 0); i++)
                {
                    paginatorObject.viewData.push(data[i]);
                }

        }
        catch (err)
        {
            paginatorObject = new PaginatorObject();
            paginatorObject.hasError = true;
            paginatorObject.errMessage = err.message;
        }
        return paginatorObject;
    }
    public static async PaginateTable(tablename, settings:PaginatorSettings)
    {

    }
}
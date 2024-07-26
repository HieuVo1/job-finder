export class ListRequest {
    pageIndex: number;
    pageSize: number;
    sortField: string;
    sortOrder: string;

    constructor() {
        this.pageIndex = 1;
        this.pageSize = 4;
        this.sortField = '';
        this.sortOrder = '';
    }
}
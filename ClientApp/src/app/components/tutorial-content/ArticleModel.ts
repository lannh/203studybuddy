// export interface Article {
//     label: string;
//     title: string;
//     description: string;
//     isSave: boolean;
// }

export class Article{
    id!: string;
    label!: string;
    title!: string;
    description!: string;
    isSave!: boolean;

    constructor(item?: RawArticle, iniLabel?: string, iniTitle?: string, 
        iniDescription?: string, iniIsSaved?: boolean, id?: string){
        if(item)
        {
            Object.assign(this, item);
            this.isSave = false;
        }
        else{
            this.label = iniLabel ? iniLabel : '';
            this.title = iniTitle ? iniTitle : '';
            this.description = iniDescription ? iniDescription : '';
            this.isSave = iniIsSaved ? iniIsSaved : false;
            this.id = id ? id : '';
        }
    }
}

export interface RawArticle {
    id: string;
    label: string;
    title: string;
    description: string;
}
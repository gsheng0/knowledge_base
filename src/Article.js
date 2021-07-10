export class Article{
    constructor(id, title, content){
        this.id = id;
        this.title = title;
        this.content = content;
    }

    getId() { return this.id; }
    getTitle() { return this.title; }
    getContent() { return this.content}
}

export class ArticlePreview{
    constructor(id, title){
        this.id = id;
        this.title = title;
    }

    getId() { return this.id; }
    getTitle() { return this.title; }
}
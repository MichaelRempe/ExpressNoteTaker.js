class Notes{
    constructor(title, content, id){
        this.title = title;
        this.content = content;
        this.id = id;
    }
    getTitle(){
        return this.title;
    }
    getContent(){
        return this.content;
    }
    getID(){
        return this.id;
    }
}

module.exports = Notes;
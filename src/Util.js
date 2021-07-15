export class Database {
    static request(suffix, type, data = undefined, onload = undefined){
        const call = new XMLHttpRequest();
        call.open(type, "http://localhost:8080/" + suffix);
        call.setRequestHeader('Content-Type', 'application/json');
        if(data !== undefined){
            call.send(data);
        }
        else{
            call.send();
        }
        if(onload !== undefined){
            call.onload = () => {
                onload(call);
            };
        }
    }

    static click(preview){
        let data = JSON.stringify({preview: preview});
        Database.request("select", "POST", data, (e) => {
            let reply = JSON.parse(e.response);
            console.log(reply);
        });
    }

    static getArticle(id, updateFunction){
        Database.request("get", "POST", id, (e) => {
            let reply = JSON.parse(e.response);
            updateFunction(reply);
            console.log(reply);
        });
    }

    static uploadArticle(article, onCompleteFunction){
        let data = JSON.stringify(article);
        Database.request("upload", "POST", data, (e) => {
            let reply = JSON.parse(e.response);
            onCompleteFunction(reply);
            console.log(reply);
        })
    }

    static updateArticle(article){
        let data = JSON.stringify({id: article.id, title: article.title, content: article.content, date: article.date});
        Database.request("update", "POST", data, (e) => {
            let reply = JSON.parse(e.response);
            console.log(reply);
        })
    }

    static getAllArticles(updateFunction){ 
        Database.request("view-all", "GET", {}, (e) => {
            let reply = JSON.parse(e.response);
            updateFunction(reply);
            console.log(reply);
        })
    }

    static searchForArticle(searchTerm, updateFunction){
        Database.request("search", "POST", searchTerm, (e) => {
            let reply = JSON.parse(e.response);
            updateFunction(reply);
            console.log(reply);
        })
    }

    static deleteArticle(id){
        Database.request("delete", "POST", id, (e) => {
            let reply = JSON.parse(e.response);
            console.log(reply);
        })
    }
}

export class General{
    static getUpdateFunction(variable) {
        return (e) => {
            variable = e;
        }
    }

    static lineBreak() { 
        return document.createElement("br");
    }

    static textElement(tag, text){
        let parent = document.createElement(tag);
        let textElement = document.createTextNode(text);
        parent.appendChild(textElement);
        return parent;
    }

    static clearElement(id){
        var div = document.getElementById(id);
        while(div.firstChild){
            div.removeChild(div.firstChild);
        }
    }

    static containerElement(classList){
        let container = document.createElement("div");

        return container;
    }

    static inputElement(placeHolder){
        let input = document.createElement("input");
        input.classList.add("form-control");
        input.placeholder = placeHolder;
        return input;
    }

    static textAreaElement(placeHolder){
        let textArea = document.createElement("textarea");
        textArea.classList.add("form-control");
        textArea.placeholder = placeHolder;
        textArea.rows = 30;
        return textArea;
    }

    static formElement(){
        let form = document.createElement("form");
        return form;
    }

    static buttonElement(text){
        let button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-outline-success");
        button.classList.add("my-2");
        button.classList.add("my-sm-0")
        button.textContent = text;
        button.style.marginTop="40px";
        return button;
    }
}

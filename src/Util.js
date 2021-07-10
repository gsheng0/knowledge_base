import updatePage from "./index";

export class Database {
    static request(suffix, type, data = undefined, onload = undefined){
        const call = new XMLHttpRequest();
        call.open(type, "localhost:8080/" + suffix);
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
        Database.request("select", "POST", data, () => {
           updatePage(article)
        });
    }
}
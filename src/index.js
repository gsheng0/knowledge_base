import {General, Database} from "./Util";

function init(){
    document.getElementById("search").addEventListener("keydown", (e) => {
        if(e.key === "Enter")
        {
            let searchTerm = document.getElementById("search").value;
            Database.searchForArticle(searchTerm, () => {});
        }
    })
}

function parseArticle(article){
    var titleContainer = document.getElementById("title");
    var contentContainer = document.getElementById("content");

    titleContainer.appendChild(General.textElement("h1", article.title));
    contentContainer.appendChild(General.textElement("h5", article.date));
    
    let content = article.content;
    let index = 0;
    while(content.indexOf("<code>", index) !== -1){
        let tagIndex = content.indexOf("<code>", index);
        var segment, segmentElement;
        if(tagIndex !== index){
            segment = content.substring(index, tagIndex);
            segmentElement = General.textElement("p", segment);
            contentContainer.appendChild(segmentElement);
            index = tagIndex;
        }
        else {
            segment = content.substring(tagIndex + 6, content.indexOf("</code>", index));
            let segmentIndex = 0;
            while(segment.indexOf("\n", segmentIndex) !== -1){
                let segmentTagIndex = segment.indexOf("\n", segmentIndex);
                let innerSegment = segment.substring(segmentIndex, segmentTagIndex);
                let innerSegmentElement = General.textElement("code", innerSegment);
                let tabCount = countTabs(innerSegment);
                innerSegmentElement.style.paddingLeft = tabCount * 40 + "px";
                innerSegmentElement.classList.add("code");
                contentContainer.appendChild(innerSegmentElement);
                contentContainer.appendChild(General.lineBreak());
                segmentIndex = segmentTagIndex + 1;
            }
            let innerSegmentElement = General.textElement("code", segment.substring(segmentIndex));
            innerSegmentElement.classList.add("code");
            contentContainer.appendChild(innerSegmentElement);
            contentContainer.appendChild(General.lineBreak());
            index = content.indexOf("</code>", index) + 7;
        }
    }
}

function countTabs(line){
    let out = 0;
    let index  = 0;
    while(line.indexOf("\t", index) !== -1){
        out +=1;
        index += line.indexOf("\t", index) + 1;
    }
    return out;
}



function clearPage(){
    General.clearElement("title");
    General.clearElement("content");
}

export function updatePage(article) {

}

function test() {
    let testString = "<code>" + 
    "public class HelloWorld \n" +
    "{ \n" + 
    "\tpublic static void main(String[] args)\n" + 
    "\t{\n" + 
    "\t\tSystem.out.println(\"Hello World\");\n" + 
    "\t}\n" + 
    "}</code>" + 
    "Hi this is a code break" + 
    "<code>" + 
    "public class HelloWorld \n" +
    "{ \n" + 
    "\tpublic static void main(String[] args)\n" + 
    "\t{\n" + 
    "\t\tSystem.out.println(\"Hello World\");\n" + 
    "\t}\n" + 
    "}</code>"
    let testObj = {
        title: "This is a temporary title",
        content: testString,
        date: "today",
        id: 13
    }
    parseArticle(testObj);
}
init();
test();
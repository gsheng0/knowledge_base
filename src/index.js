import {General} from "./Util";


function parseArticle(article){
    var titleContainer = document.getElementById("title");
    var contentContainer = document.getElementById("content");

    titleContainer.appendChild(General.textElement("h1", article.title));
    contentContainer.appendChild(General.textElement("h5", article.date));
    
    let content = article.content;
    let index = 0;
    while(content.indexOf("<code>", index) !== -1){
        let tagIndex = content.indexOf("<code>");
        var segment, segmentElement;
        if(tagIndex !== 0){
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
                contentContainer.appendChild(innerSegmentElement);
                contentContainer.appendChild(General.lineBreak());
                segmentIndex = segmentTagIndex + 1;
            }
            contentContainer.appendChild(General.textElement("code", segment.substring(segmentIndex)));
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
let temp = document.createElement("code");

let testString = "<code>" + 
"public class HelloWorld \n" +
"{ \n" + 
"\tpublic static void main(String[] args)\n" + 
"\t{\n" + 
"\t\tSystem.out.println(\"Hello World\");\n" + 
"\t}\n" + 
"}</code>";
console.log(testString);
function clearPage(){
    General.clearElement("title");
    General.clearElement("content");
}

export function updatePage(article) {

}
let testObj = {
    title: "This is a temporary title",
    content: testString,
    date: "today",
    id: 13
}
parseArticle(testObj);
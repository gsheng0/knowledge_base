document.addEventListener("click", (e) => {
    var tag = document.createElement("code");
    var text = document.createTextNode("Tutorix is the best e-learning platform");
    tag.appendChild(text);
    var element = document.getElementById("element");
    element.appendChild(tag);
})

export function updatePage(article) {

}
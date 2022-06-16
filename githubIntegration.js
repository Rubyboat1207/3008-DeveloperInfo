function GetListOfFilesFromGithub(path) {
    var url = "https://api.github.com/repos/Rubyboat1207/3008-DeveloperInfo/contents/" + path;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();
    var json = JSON.parse(xhr.responseText);
    var files = [];
    for (var i = 1; i < json.length; i++) {
        files.push(json[i].name);
    }
    return files;
}

function GetImages() {
    var files = GetListOfFilesFromGithub("images");
    var images = [];
    for (var i = 0; i < files.length; i++) {
        if (files[i].includes(".png") || files[i].includes(".jpg") || files[i].includes(".jpeg")) {
            images.push(files[i]);
        }
    }
    return images;
}

function GetPrefabs() {
    var files = GetListOfFilesFromGithub("");
    var images = [];
    for (var i = 0; i < files.length; i++) {
        if (files[i].includes(".prefab")) {
            images.push(files[i]);
        }
    }
    return images;
}

function CleanFileNames(files) {
    var cleanedFiles = [];
    for (var i = 0; i < files.length; i++) {
        let name = files[i].replace(/_[0-9][0-9]|.prefab/, "").replace(/_/g, " ");
        cleanedFiles.push(name.split(".")[0]);
    }
    return cleanedFiles;
}

function removeAllAnimations() {
    let animationNames = ["animateZoom", "animateBack" ];
    //for every element with either of the animation names, remove the class if its finished
    for (var i = 0; i < animationNames.length; i++) {
        let elements = document.getElementsByClassName(animationNames[i]);
        for (var j = 0; j < elements.length; j++) {
            elements[j].classList.remove(animationNames[i]);
        }
    }
}

function getImageURL(path) {
    return "https://raw.githubusercontent.com/Rubyboat1207/3008-DeveloperInfo/main/images/" + path + ".png";
}

function getInfo() {
    var infoURLs = GetListOfFilesFromGithub("info");
    var info = [];
    for (var i = 0; i < infoURLs.length; i++) {
        let url = "https://raw.githubusercontent.com/Rubyboat1207/3008-DeveloperInfo/main/info/" + infoURLs[i];
        //download the file
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send();
        //parse the file
        var json = JSON.parse(xhr.responseText);
        //add the info to the array
        info.push(json);
    }
    return info;
}

function PannelClick(element) {
    //if the element has the class animateZoom and animateBack, remove animateBack
    if (element.classList.contains("animateZoom") && element.classList.contains("animateBack")) {
        element.classList.remove("animateBack");
        element.classList.remove("animateZoom");
    }


    //for every element with the class zoomBack, remove the class
    var zoomBack = document.getElementsByClassName("animateBack");
    for (var i = 0; i < zoomBack.length; i++) {
        zoomBack[i].classList.remove("animateBack");
    }

    //for every element with the class animateZoom, remove the class
    var elements = document.getElementsByClassName("animateZoom");
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add("animateBack");

        elements[i].classList.remove("animateZoom");
        //add the zoomBack class to the element
    }

    //add the class to the element that was clicked
    element.classList.add("animateZoom");

    //scroll smoothly to the element with easing
    var scrollTo = element.offsetTop - 300;
    window.scrollTo({
        top: scrollTo,
        behavior: "smooth"
    });
}

function getAllmaterials(materials) {
    let out = "<span class=\"description\">";
    for (var i = 0; i < materials.length; i++) {
        out += materials[i] + "<br>";
    }
    return out + "</span>";
}

//The Part you need to care about
document.addEventListener("DOMContentLoaded", () => {
    let info = getInfo();
    console.log(info)

    for(var i = 0; i < info.length; i++) {
        document.getElementById("imgs").innerHTML += "<div class=\"img\" onclick=\"PannelClick(this)\">"+
            "<p class=\"imgtxt\">" + info[i].name + "</p>"+
            "<p class=\"subtitle\">" + info[i].id + "</p>"+
            "<img src='" + getImageURL(info[i].id) + "'><br>"+
            "<span class=\"description hiddentxt\">Description:</span><span class=\"description\">" + info[i].description + "</span><br><span class=\"description hiddentxt\">Materials:</span>"+
            getAllmaterials(info[i].materials) + 
        "</div>";
    }
});
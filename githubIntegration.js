function GetListOfFilesFromGithub() {
    var url = "https://api.github.com/repos/Rubyboat1207/3008-DeveloperInfo/contents";
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
    var files = GetListOfFilesFromGithub();
    var images = [];
    for (var i = 0; i < files.length; i++) {
        if (files[i].includes(".png") || files[i].includes(".jpg") || files[i].includes(".jpeg")) {
            images.push(files[i]);
        }
    }
    return images;
}

function GetPrefabs() {
    var files = GetListOfFilesFromGithub();
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

function getImageURLs() {
    var imageURLs = GetImages()
    var images = [];
    for (var i = 0; i < imageURLs.length; i++) {
        images.push("https://raw.githubusercontent.com/Rubyboat1207/3008-DeveloperInfo/main/" + imageURLs[i]);
    }
    return images;
}

//The Part you need to care about
document.addEventListener("DOMContentLoaded", () => {
    let images = getImageURLs();
    let prefabs = GetPrefabs();
    let cleanedFileNames = CleanFileNames(prefabs);

    let imgContainer = [];
    for (var i = 0; i < images.length; i++) {
        imgContainer.push({"image": images[i], "fileNames": cleanedFileNames[i]});
    }
    //sort in alphabetical order
    imgContainer.sort((a, b) => (a.fileNames > b.fileNames) ? 1 : -1);

    console.log(imgContainer)

    for(let i = 0; i < imgContainer.length; i++) {
        document.getElementById("imgs").innerHTML += "<div class=\"img\"><p class=\"imgtxt\">" + imgContainer[i].fileNames + "</p><p class=\"subtitle\">" + prefabs[i].substring(0, prefabs[i].length - 7) + "</p><img src='" + imgContainer[i].image + "'><br></div>";
    }
});
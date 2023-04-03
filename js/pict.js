document.addEventListener('DOMContentLoaded', () =>{
    const urlPicture = window.location.href.split('?');
    const url = `https://api.nasa.gov/planetary/apod?api_key=FAnOcGq9VhZeEA2BgTKco6SRqhf3azcfmWo5kOnU&${urlPicture[1]}`
    console.log(url)
    const container = document.querySelector('.container')
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.send();
        xhr.onload = function(){
            if(200 != xhr.status){
                alert('Nothing not found for your request!')
            }else{
                const result = xhr.response;
                creatPage(result)
            }}
           function creatPage(element){
                container.innerHTML = `
                <h2 style="text-align: center;">${element.title}</h2>
                <img src="${element.url}" alt="${element.title}">
                <div style="display: flex; justify-content: space-between">
                    <span>${element.copyright}</span>
                    <span>${element.date}</span>
                </div>
                <p>${element.explanation}</p>
                `
            }       

})
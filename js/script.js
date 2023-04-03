document.addEventListener('DOMContentLoaded', () =>{
    const submitBtn = document.querySelector('#btn-submit');
    const xhr = new XMLHttpRequest();
    const resultDiv = document.querySelector('#result-div');
    // console.log(submitBtn)
    submitBtn.addEventListener('click', e =>{
        e.preventDefault();
        const startDate = document.querySelector('#start-date').value;
        const endDate = document.querySelector('#end-date').value;
        const url = `https://api.nasa.gov/planetary/apod?api_key=FAnOcGq9VhZeEA2BgTKco6SRqhf3azcfmWo5kOnU&start_date=${startDate}&end_date=${endDate}`;
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.send();
        xhr.onload = function(){
            if(200 != xhr.status){
                alert('Nothing not found for your request!')
            }else{
                const result = xhr.response;
                createElement(result);
                console.log(result);
            }}
    })
    function createElement(elements){
        resultDiv.innerHTML = '<h4 class="d-inline-block">Search result</h4>';
        const div = document.createElement('div');
        div.classList.add('d-flex');
        div.classList.add('justify-content-between');
        div.classList.add('flex-wrap');
        div.classList.add('gap-2');
        div.classList.add('border');
        div.classList.add('border-secondary')
        div.classList.add('p-2');
        elements.forEach(element => {
            div.innerHTML += `
            <div class="card" style="width: 16rem;">
                <img src="${element.url}" class="card-img-top" alt="${element.title}">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${toCut(element.explanation)}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <a href="picture.html?date=${element.date}" class="btn btn-primary" target=”__blank”>More</a>
                        <span id="date">${element.date}</span>
                    </div>
                </div>
            </div>
            `
        });
        const h4 = document.createElement('h4');
        h4.classList.add('p-l-4');
        h4.classList.add('d-inline-block')
        h4.textContent = '(' + elements.length +')';
        resultDiv.append(h4);
        resultDiv.append(div);
    }
    function toCut(str){
        if(str.split('').length >= 160){
            return str.split('', 160).join('') + '...';
        }
    }
})
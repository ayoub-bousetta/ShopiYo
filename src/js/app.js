let shareBtn =document.getElementById('socialBtn');
let socialBar = document.getElementById('social');


const shome =()=>{

    //console.log(socialBar.classList)
        socialBar.classList.toggle('active');
        shareBtn.classList.toggle('hide');
        shareBtn.classList.toggle('fa-share-alt');
        shareBtn.classList.toggle('fa-times');
    }

shareBtn.addEventListener('click',shome);
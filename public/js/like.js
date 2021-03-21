const like = document.querySelectorAll("#submitForm");
for (let each of like) {
    each.addEventListener('submit', function (e) {
        e.preventDefault();
        const data = new FormData(this);
        const real = new URLSearchParams();
        const val = data.get("id");
        real.append("id", val);

        fetch('/likes', {
            method: 'post',
            body: real
        }).then(res => {

        })
        const count = each.getElementsByClassName('counts');
        count[0].innerText = parseInt(count[0].innerText) + 1;
        each.querySelector('.likes').setAttribute('disabled', "");

        fetch('/likes', {
            method: 'get'

        }).then(res => {

        })
        const liked = each.querySelector('.likes');
        if(liked.getAttribute('disabled') === ""){
            liked.classList.remove('likes');
            liked.classList.add('liked');
           }else{
           
           }
    });
};

const submits = document.querySelector('.cSubmit');
const search = document.getElementById('find');
const sElement = document.querySelector('#find');
const input = document.querySelector('.cInput');
const form = document.querySelector('.cForm');
const frnd = "";
const label = document.querySelector('.cLabel');
search.addEventListener('submit', e => {
    e.preventDefault();
    const fdata = new FormData(e.target);
    const freal = new URLSearchParams();
    const fval = fdata.get("username");
    freal.append("username", fval);
    if(fval.length>0){
    fetch('/find', {
        method: 'post',
        body: freal
    }).then(res => {
        return res.json();
    }).then(response => {
        if(submits.getAttribute('disabled') === ""){
            submits.value = "Follow";
            submits.removeAttribute("disabled");
        };
        if (response.user.username === response.frnd.username) {
            console.log('Sorry you cant find yourself');
        } else {
            search.getElementsByTagName('input')[0].value = "";
            input.setAttribute('value', response.frnd._id);
            label.innerText = response.frnd.firstName + " " + response.frnd.lastName;
            response.user.friends.find(f => {
                if (f === response.frnd._id) {
                    submits.value = "Following";
                    submits.setAttribute("disabled", "");
                    return submits;
                }
            });
            form.removeAttribute('hidden');
        }
    })
};


});

form.addEventListener('submit', e => {
    e.preventDefault();
    const adata = new FormData(e.target);
    const areal = new URLSearchParams();
    const aval = adata.get("id");
    areal.append("id", aval);
    fetch('/add', {
        method: 'post',
        body: areal
    }).then(res => {
        return res.json();
    }).then(response => {

    })
    submits.value = "Following";
    submits.setAttribute("disabled", "")
    window.location.reload();
});

const liked = document.querySelectorAll('.likes'); 
for(let a of liked){
    if(a.getAttribute('disabled') === ""){
        a.classList.remove('likes');
        a.classList.add('liked');
       }else{
       
       }
};

const file = document.querySelector('.upload');
file.addEventListener('change', e =>{
    document.querySelector('.lupload').innerText = 'Change Photo';
    document.querySelector('.supload').removeAttribute('style');
});





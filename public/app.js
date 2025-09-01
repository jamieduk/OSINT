// app.js - client logic

const qinput=document.getElementById('qinput');
const searchBtn=document.getElementById('searchBtn');
const socialBtn=document.getElementById('socialBtn');
const results=document.getElementById('results');
const imgfile=document.getElementById('imgfile');
const imgSearchBtn=document.getElementById('imgSearchBtn');
const preview=document.getElementById('preview');
const ngrokInput=document.getElementById('ngrokUrl'); // new text input for ngrok URL

function openUrl(url){window.open(url,'_blank');}

// Collapsible section
const collBtn=document.querySelector('.collapsible-btn');
const collContent=document.querySelector('.collapsible-content');
collBtn.addEventListener('click',()=>{
    collContent.style.display=collContent.style.display==='block'?'none':'block';
    collBtn.textContent=collContent.style.display==='block'?'More Options ▲':'More Options ▼';
});

// Search username / email / phone
searchBtn.addEventListener('click',()=>{
    const v=qinput.value.trim();
    if(!v) return alert('enter value');
    results.innerHTML='';
    const links=[];
    links.push({label:'CheckUsernames - aggregated',url:`https://checkusernames.com/?q=${encodeURIComponent(v)}`} );
    links.push({label:'Epieos (site)',url:`https://epieos.com/search?q=${encodeURIComponent(v)}`} );
    links.push({label:'Thatsthem - people search',url:`https://thatsthem.com/search?term=${encodeURIComponent(v)}`} );
    links.push({label:'SocialSearcher - web',url:`https://www.social-searcher.com/search?q=${encodeURIComponent(v)}`} );
    links.push({label:'OSINT Framework - Usernames',url:`https://osintframework.com/`} );

    links.forEach(l=>{
        const b=document.createElement('button');
        b.textContent=l.label;
        b.onclick=()=>openUrl(l.url);
        results.appendChild(b);
    });
});

// SocialSearcher API fetch
socialBtn.addEventListener('click',async()=>{
    const v=qinput.value.trim();
    if(!v) return alert('enter value');
    try{
        const r=await fetch(`/api/socialsearch?q=${encodeURIComponent(v)}`);
        if(!r.ok) throw new Error(await r.text());
        const j=await r.json();
        results.innerHTML=`<pre>${JSON.stringify(j,null,2)}</pre>`;
    }catch(err){
        alert('SocialSearch failed: '+err.message);
    }
});

// Image search
imgSearchBtn.addEventListener('click',async()=>{
    const f=imgfile.files[0];
    if(!f) return alert('select image');
    const r=new FileReader();
    r.onload=async()=>{
        const dataUrl=r.result;
        preview.innerHTML=`<img src="${dataUrl}" alt="preview" style="max-width:300px">`;

        // Upload image to server
        const formData=new FormData();
        formData.append('photo',f);
        const resp=await fetch('/upload-image',{method:'POST',body:formData});
        const j=await resp.json();
        if(!j.url) return alert('Upload failed');

        const baseUrl=ngrokInput.value.trim() || window.location.origin;
        const fullUrl=baseUrl+j.url;

        const links=[
            {label:'Google Images (manual)',url:`https://images.google.com/searchbyimage?image_url=${encodeURIComponent(fullUrl)}`},
            {label:'Bing Visual Search',url:`https://www.bing.com/images/search?q=imgurl:${encodeURIComponent(fullUrl)}&view=detailv2`},
            {label:'TinEye',url:`https://tineye.com/search?url=${encodeURIComponent(fullUrl)}`},
            {label:'PimEyes',url:`https://pimeyes.com/en/search?search=${encodeURIComponent(fullUrl)}`}
        ];

        const div=document.createElement('div');
        links.forEach(l=>{
            const b=document.createElement('button');
            b.textContent=l.label;
            b.onclick=()=>openUrl(l.url);
            div.appendChild(b);
        });
        results.appendChild(div);
    };
    r.readAsDataURL(f);
});


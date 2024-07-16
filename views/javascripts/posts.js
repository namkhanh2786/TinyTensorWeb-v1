let popup = document.getElementById("popup1")
let admin = document.getElementById("admin")

admin.addEventListener("click", ()=> {
    style = window.getComputedStyle(popup)
    display = style.getPropertyValue('display')
    height = style.getPropertyValue('height')

    console.log(height);

    // if(display == "flex"){
    //     popup.style.display = "none"
    // } else if (display == "none"){
    //     popup.style.display = "flex"
    // }

    let h = '200px';
    if (height === '200px') h = '0px';
    popup.style.height = h;
})

let home = document.getElementById("home")
let posts = document.getElementById("posts")

home.addEventListener("click", function(){
    location.replace("index.html")
})

posts.addEventListener("click", function(){
    location.replace("index.html")
})

let postdesc = document.getElementById("postdesc")
let show = document.getElementById("show")

if (postdesc.innerHTML.length > 300){
    postdesc.innerHTML = postdesc.innerHTML.substring(0, 300) + ". . ."
    show.style.display = "flex"
} else {
    show.style.display = "none"
}


let postdetails = document.getElementById('details')
let blurbg = document.getElementById("blurbg")
let post = document.getElementById("post")

post.addEventListener("click", function(){
    postdetails.style.display = "flex"
    blurbg.style.display = "flex"
})




let exit = document.getElementById("exitbutton")

exit.addEventListener("click", function(){
    console.log("clicked")
    style = window.getComputedStyle(postdetails)
    blurstyle = window.getComputedStyle(blurbg)

    displaystyle = style.getPropertyValue('display')
    blurdisplaystyle = blurstyle.getPropertyValue('display')
    if (displaystyle == "flex"){
        postdetails.style.display = "none"
        blurbg.style.display = "none"
    } else {
        postdetails.style.display = "flex"
        blurbg.style.display = "flex"
    }
})

let postdetail = document.getElementById("postdetail")


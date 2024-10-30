const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


const frames = {
    cureentIndex: 0,
    maxIndex: 647
}

const images = []
let imageeLoaded = 0;


function preloadImages() {
    for(var i = 1; i <= frames.maxIndex; i++) {
        const imgUrl = `./compressed_images/frame_${i.toString().padStart(4, '0')}.jpg`;
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => {
            imageeLoaded++;
            if(imageeLoaded == frames.maxIndex) {
                loadImage(frames.cureentIndex);
                startAnimation();
            }
        }
        images.push(img);
    }
}

function loadImage(index) {
    if(index >= 0 && index <= frames.maxIndex) {
        const img = images[index];
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        
        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX , scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        ctx.clearRect(0 ,0, canvas.width , canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        frames.cureentIndex = index;
    }
}

function startAnimation() {
    var tl = gsap.timeline({
        scrollTrigger : {
            trigger: ".parent",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
        }
    })
    
    function updateFrame(index) {
        return {
            cureentIndex: index,
            onUpdate: function() {
                loadImage(Math.floor(frames.cureentIndex));
            }
        }
    }

    tl.to(frames , updateFrame(50) , "a")
    .to("canvas", {scale: 1.5}, "a")

    tl.to(frames , updateFrame(300) , "b")
    .to("canvas", {scale: .5}, "b")

    tl.to(frames , updateFrame(400) , "c")
    .to(".cntre", {opacity: 0 , scale: .1}, "c")
    tl.to(frames , updateFrame(646) , "d")
    .to(".cntre", {opacity: 1 , scale: 1}, "d")

    tl.to(frames , updateFrame(647) , "e")
    .to("canvas", {scale: 1}, "e")

}



preloadImages();

// Initialize Lenis
const lenis = new Lenis();

// Listen for the scroll event and log the event data

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

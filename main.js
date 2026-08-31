/* =====================================================
   SETUP
===================================================== */

gsap.registerPlugin(ScrollTrigger);


let lenis;


/* =====================================================
   LENIS
===================================================== */

if (typeof Lenis !== "undefined") {

    lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: .8,
        touchMultiplier: 1.2
    });


    lenis.on(
        "scroll",
        ScrollTrigger.update
    );


    gsap.ticker.add(
        (time) => {

            lenis.raf(time * 1000);

        }
    );


    gsap.ticker.lagSmoothing(0);

}


/* =====================================================
   ALBUM DATA
===================================================== */

const albums = [

    {
        member: "JANA",

        title: "My Sunshine",

        image: "assets/images/album-1.jpg",

        to: "HAPPY BIRTHDAY, MY SUNSHINE,",

        text:
            "Happy birthday, My sunshine, I am not a good person when it comes to express my feelings. I just want you to know that I love you so much and I am so happy you're my dearest friend.knowing you was the best part of college and I am grateful that I get to see you in real life. You are really a sunshine to me, your laughter and smile are full of warmness. I hope you a year full of happiness and relief. I'll always be by your side and here for you no matter what, Always :(",

        from: "_Jana"
    },


    {
        member: "YOONGI",

        title: "Don't Lose Yourself",

        image: "assets/images/album-2.jpg",

        to: "A LITTLE REMINDER,",

        text:
            "No matter what happens in life, no matter how badly life treats you, don't lose yourself. That is the most precious thing you have. It's what makes you different and beautiful. Future's gonna be okay.",

        from: "_Yoongi"
    },


    {
        member: "J-HOPE",

        title: "Eternal Hope",

        image: "assets/images/album-3.jpg",

        to: "FOR YOU,",

        text:
            "I'll be your eternal hope and comfort.",

        from: "_J-hope"
    },


    {
        member: "JIMIN",

        title: "It's Okay",

        image: "assets/images/album-4.jpg",

        to: "FOR YOU,",

        text:
            "You're the reason why I live. It's okay to not be okay.",

        from: "_Jimin"
    },


    {
        member: "NAMJOON",

        title: "Fly Together",

        image: "assets/images/album-5.jpg",

        to: "FOR THE HARD DAYS,",

        text:
            "It's hard to admit but we can't solve every kinds of problems. Sometimes it just feels too much to bear myself. But when things are too tough I think of the faces who I love, and who love me, like you. I hope we could stay strong and fly together, whatever's underneath the ground.",

        from: "_namjoon"
    },


    {
        member: "TAEHYUNG",

        title: "For A Long Time",

        image: "assets/images/album-6.jpg",

        to: "ONE LITTLE PROMISE,",

        text:
            "Purple is the last color of the rainbow. Purple means I will trust and love you for a long time.",

        from: "_Taehyung"
    },


    {
        member: "JUNGKOOK",

        title: "Believe In Yourself",

        image: "assets/images/album-7.jpg",

        to: "KEEP GOING,",

        text:
            "Believe in yourself and keep going. Don't think about what others think.",

        from: "_Jungkook"
    },


    {
        member: "JIN",

        title: "You Can Do It",

        image: "assets/images/album-8.jpg",

        to: "AND FINALLY,",

        text:
            "Believe in yourself, You can do it.",

        from: "_Jin"
    }

];


let currentAlbum = 0;

let albumOpen = false;


/* =====================================================
   DOM
===================================================== */

const loader =
    document.getElementById("loader");


const loaderLine =
    document.querySelector(".loader-line span");


const ticketScreen =
    document.getElementById("ticketScreen");


const ticket =
    document.getElementById("ticket");


const experience =
    document.getElementById("experience");


const albumTrack =
    document.getElementById("albumTrack");


const albumCurrent =
    document.getElementById("albumCurrent");


const albumProgress =
    document.getElementById("albumProgress");


const albumOpenScene =
    document.getElementById("albumOpen");


const albumBackdrop =
    document.getElementById("albumBackdrop");


const albumClose =
    document.getElementById("albumClose");


const cdPlayer =
    document.getElementById("cdPlayer");


const disc =
    document.querySelector(".disc");


const memoryLetter =
    document.getElementById("memoryLetter");


const memoryImage =
    document.getElementById("memoryImage");


const photoFallback =
    document.querySelector(".letter-photo .photo-fallback");


const playlistImage =
    document.querySelector(".playlist-photo img");


const playlistFallback =
    document.querySelector(".playlist-photo .photo-fallback");


/* =====================================================
   CREATE ALBUMS
===================================================== */

albums.forEach(
    (album, index) => {

        const card =
            document.createElement("article");


        card.className =
            "album-card";


        card.dataset.index =
            index;


        card.innerHTML = `

            <div class="album-shadow"></div>

            <div class="album-cover">

                <div
                    class="cover-art"
                    style="background-image:
                    url('${album.image}')"
                ></div>

                <div class="cover-fallback">

                    <span>
                        ${String(index + 1).padStart(2, "0")}
                    </span>

                </div>

                <div class="album-info">

                    <span>
                        ${String(index + 1).padStart(2, "0")}
                    </span>

                    <span>
                        ${album.member}
                    </span>

                </div>

                <div class="album-name">
                    ${album.title}
                </div>

            </div>

        `;


        albumTrack.appendChild(card);

    }
);


const albumCards =
    [
        ...document.querySelectorAll(".album-card")
    ];


/* =====================================================
   IMAGE FALLBACKS
===================================================== */

document
    .querySelectorAll(".cover-art")
    .forEach(
        (art) => {

            const bg =
                art.style.backgroundImage;


            const url =
                bg
                    .replace(/^url\(["']?/, "")
                    .replace(/["']?\)$/, "");


            const image =
                new Image();


            image.src =
                url;


            image.onerror =
                () => {

                    art.style.display =
                        "none";

                };

        }
    );


memoryImage.onerror =
    () => {

        memoryImage.style.display =
            "none";

        photoFallback.style.display =
            "flex";

    };


playlistImage.onerror =
    () => {

        playlistImage.style.display =
            "none";

        playlistFallback.style.display =
            "flex";

    };


playlistImage.onload =
    () => {

        playlistImage.style.display =
            "block";

        playlistFallback.style.display =
            "none";

    };


/* =====================================================
   POSITION ALBUMS
===================================================== */

function positionAlbums(progress = 0) {

    const total =
        albums.length;


    const raw =
        progress * (total - 1);


    currentAlbum =
        Math.min(
            total - 1,
            Math.max(
                0,
                Math.round(raw)
            )
        );


    const center =
        raw;


    albumCards.forEach(
        (card, index) => {

            const offset =
                index - center;


            const x =
                offset * 420;


            const z =
                -Math.abs(offset) * 180;


            const rotateY =
                offset * -16;


            const rotateZ =
                offset * 2;


            const scale =
                Math.max(
                    .62,
                    1 - Math.abs(offset) * .16
                );


            const opacity =
                Math.max(
                    0,
                    1 - Math.abs(offset) * .32
                );


            gsap.set(
                card,
                {

                    xPercent: -50,

                    yPercent: -50,

                    x,

                    z,

                    rotateY,

                    rotateZ,

                    scale,

                    opacity,

                    zIndex:
                        100 -
                        Math.round(
                            Math.abs(offset)
                        )

                }
            );

        }
    );


    updateAlbumUI();

}


/* =====================================================
   ALBUM UI
===================================================== */

function updateAlbumUI() {

    albumCurrent.textContent =
        String(currentAlbum + 1)
            .padStart(2, "0");


    albumProgress.style.width =
        `${((currentAlbum + 1) / albums.length) * 100}%`;

}


/* =====================================================
   ALBUM SCROLL
===================================================== */

gsap.timeline({

    scrollTrigger: {

        trigger: "#albumsSection",

        start: "top top",

        end: "bottom bottom",

        scrub: 1,

        onUpdate: self => {

            positionAlbums(
                self.progress
            );

        }

    }

});


/* =====================================================
   INTRO PARALLAX
===================================================== */

gsap.to(
    ".intro-content",
    {

        y: -100,

        opacity: .25,

        ease: "none",

        scrollTrigger: {

            trigger: "#intro",

            start: "top top",

            end: "bottom top",

            scrub: true

        }

    }
);


gsap.to(
    ".intro-background",
    {

        scale: 1.15,

        ease: "none",

        scrollTrigger: {

            trigger: "#intro",

            start: "top top",

            end: "bottom top",

            scrub: true

        }

    }
);


/* =====================================================
   PLAYLIST ANIMATIONS
===================================================== */

gsap.from(
    ".playlist-copy",
    {

        y: 100,

        opacity: 0,

        duration: 1,

        scrollTrigger: {

            trigger: "#playlist",

            start: "top 70%",

            toggleActions:
                "play none none reverse"

        }

    }
);


gsap.from(
    ".playlist-record",
    {

        y: 120,

        rotate: -8,

        opacity: 0,

        duration: 1.2,

        ease: "power3.out",

        scrollTrigger: {

            trigger: "#playlist",

            start: "top 70%",

            toggleActions:
                "play none none reverse"

        }

    }
);


/* =====================================================
   ENDING
===================================================== */

gsap.from(
    ".ending-content",
    {

        y: 80,

        opacity: 0,

        scrollTrigger: {

            trigger: "#ending",

            start: "top 70%",

            toggleActions:
                "play none none reverse"

        }

    }
);


/* =====================================================
   OPEN ALBUM
===================================================== */

albumTrack.addEventListener(
    "click",
    (event) => {

        const card =
            event.target.closest(".album-card");


        if (!card) return;


        const index =
            Number(card.dataset.index);


        openAlbum(index);

    }
);


function openAlbum(index) {

    currentAlbum =
        index;


    const data =
        albums[index];


    albumOpen =
        true;


    /*
       Update CD
    */

    document
        .getElementById("openAlbumNumber")
        .textContent =
        `${data.member} / ${String(index + 1).padStart(2, "0")}`;


    document
        .getElementById("discNumber")
        .textContent =
        String(index + 1)
            .padStart(2, "0");


    document
        .getElementById("openMember")
        .textContent =
        data.member;


    document
        .getElementById("openTitle")
        .textContent =
        data.title;


    /*
       Update letter
    */

    document
        .getElementById("letterNumber")
        .textContent =
        `${String(index + 1).padStart(2, "0")} / 08`;


    document
        .getElementById("letterTo")
        .textContent =
        data.to;


    document
        .getElementById("letterTitle")
        .textContent =
        data.title;


    document
        .getElementById("letterText")
        .textContent =
        data.text;


    document
        .getElementById("letterFrom")
        .textContent =
        data.from;


    /*
       Load photo
    */

    memoryImage.style.display =
        "none";


    photoFallback.style.display =
        "flex";


    memoryImage.src =
        data.image;


    memoryImage.onload =
        () => {

            memoryImage.style.display =
                "block";

            photoFallback.style.display =
                "none";

        };


    /*
       Show album
    */

    albumOpenScene.style.visibility =
        "visible";


    albumOpenScene.style.pointerEvents =
        "auto";


    /*
       Reset animation
    */

    gsap.set(
        albumBackdrop,
        {
            opacity: 0
        }
    );


    gsap.set(
        cdPlayer,
        {

            x: -80,

            opacity: 0,

            rotateY: -12

        }
    );


    gsap.set(
        memoryLetter,
        {

            x: 80,

            y: 70,

            opacity: 0,

            rotate: 3

        }
    );


    /*
       Opening animation
    */

    const tl =
        gsap.timeline();


    tl.to(
        albumBackdrop,
        {

            opacity: 1,

            duration: .7,

            ease: "power2.out"

        }
    );


    tl.to(
        cdPlayer,
        {

            x: 0,

            opacity: 1,

            rotateY: 0,

            duration: 1,

            ease: "power3.out"

        },
        "-=.35"
    );


    tl.to(
        memoryLetter,
        {

            x: 0,

            y: 0,

            opacity: 1,

            rotate: 0,

            duration: 1,

            ease: "power3.out"

        },
        "-=.7"
    );


    /*
       Spin disc
    */

    gsap.killTweensOf(disc);


    gsap.to(
        disc,
        {

            rotation: 360,

            duration: 8,

            repeat: -1,

            ease: "none"

        }
    );

}


/* =====================================================
   CLOSE ALBUM
===================================================== */

albumClose.addEventListener(
    "click",
    closeAlbum
);


function closeAlbum() {

    const tl =
        gsap.timeline({

            onComplete: () => {

                albumOpenScene.style.visibility =
                    "hidden";

                albumOpenScene.style.pointerEvents =
                    "none";

                albumOpen =
                    false;

            }

        });


    tl.to(
        memoryLetter,
        {

            x: 70,

            y: 50,

            opacity: 0,

            duration: .45,

            ease: "power2.in"

        }
    );


    tl.to(
        cdPlayer,
        {

            x: -70,

            opacity: 0,

            duration: .45,

            ease: "power2.in"

        },
        "-=.25"
    );


    tl.to(
        albumBackdrop,
        {

            opacity: 0,

            duration: .5

        },
        "-=.25"
    );

}


/* =====================================================
   PREVIOUS ALBUM
===================================================== */

document
    .getElementById("prevAlbum")
    .addEventListener(
        "click",
        () => {

            let next =
                currentAlbum - 1;


            if (next < 0) {

                next =
                    albums.length - 1;

            }


            changeOpenAlbum(next);

        }
    );


/* =====================================================
   NEXT ALBUM
===================================================== */

document
    .getElementById("nextAlbum")
    .addEventListener(
        "click",
        () => {

            let next =
                currentAlbum + 1;


            if (
                next >= albums.length
            ) {

                next = 0;

            }


            changeOpenAlbum(next);

        }
    );


function changeOpenAlbum(index) {

    const data =
        albums[index];


    currentAlbum =
        index;


    gsap.to(
        memoryLetter,
        {

            x: 30,

            opacity: 0,

            duration: .25

        }
    );


    gsap.to(
        cdPlayer,
        {

            x: -30,

            opacity: 0,

            duration: .25,

            onComplete: () => {

                openAlbum(index);

            }

        }
    );

}


/* =====================================================
   KEYBOARD
===================================================== */

window.addEventListener(
    "keydown",
    (event) => {

        if (!albumOpen) return;


        if (
            event.key === "Escape"
        ) {

            closeAlbum();

        }


        if (
            event.key === "ArrowRight"
        ) {

            document
                .getElementById("nextAlbum")
                .click();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            document
                .getElementById("prevAlbum")
                .click();

        }

    }
);


/* =====================================================
   TICKET ENTRY
===================================================== */

ticket.addEventListener(
    "click",
    () => {

        const tl =
            gsap.timeline();


        tl.to(
            ticket,
            {

                scale: .97,

                duration: .15

            }
        );


        tl.to(
            ticket,
            {

                scale: 1.35,

                opacity: 0,

                y: -30,

                duration: .7,

                ease: "power3.in"

            }
        );


        tl.to(
            ticketScreen,
            {

                opacity: 0,

                duration: .7,

                onComplete: () => {

                    ticketScreen.style.display =
                        "none";

                }

            },
            "-=.35"
        );


        tl.set(
            experience,
            {

                visibility: "visible"

            }
        );


        tl.to(
            experience,
            {

                opacity: 1,

                duration: .8

            }
        );


        tl.call(
            () => {

                ScrollTrigger.refresh();

            }
        );

    }
);


/* =====================================================
   LOADER
===================================================== */

window.addEventListener(
    "load",
    () => {

        const tl =
            gsap.timeline();


        tl.to(
            loaderLine,
            {

                width: "100%",

                duration: .9,

                ease: "power2.inOut"

            }
        );


        tl.to(
            loader,
            {

                opacity: 0,

                duration: .6,

                onComplete: () => {

                    loader.style.display =
                        "none";

                }

            }
        );

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

positionAlbums(0);
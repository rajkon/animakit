
let wait = ms => new Promise((r, j) => setTimeout(r, ms));

let box;
let pageX;
let pageY;
let showX;
let showY;


// This is isn't declared as `async` because it already returns a promise
function delay(duration) {
    // `delay` returns a promise
    return new Promise(function (resolve, reject) {
        // Only `delay` is able to resolve or reject the promise
        setTimeout(function () {
            resolve(42); // After 3 seconds, resolve the promise with value 42
        }, duration);
    });
}

function firstOne() {

    box = document.getElementsByTagName('html');
    box[0].addEventListener("mousemove", updateDisplay, false);
    box[0].addEventListener("mouseenter", updateDisplay, false);
    box[0].addEventListener("mouseleave", updateDisplay, false);

    pageX = document.getElementById("x");
    pageY = document.getElementById("y");
    showX = pageX.textContent;
    showY = pageY.textContent;
    //---- speech

    let currSaidTxt = "";

    const dog_svg = document.getElementById('dogimgid');

    let count = 0;
    let curr_tween_params;
    let curr_func;
    //TweenMax.to("h2.title", 1, { opacity: 0.3 });
    TweenMax.set(dog_svg, { autoAlpha: 0 });

    //window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    //let finalTranscript = '';
    //let recognition = new window.SpeechRecognition();
    //recognition.interimResults = true;
    //recognition.maxAlternatives = 10;
    //recognition.continuous = true;
    //recognition.onresult = (event) => {



    let sentences = [
        "show dog",
        "dog rotate scale"
    ];

    for (var index = 0; index < sentences.length; index++) {
            act(sentences[index], index);
    }

    function act(sentence, indx) {
        console.log('sleeping');
        console.log('sentence:' + sentence);
        setTimeout(async function () {
            //let interimTranscript = '';
            //for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
            //    let transcript = event.results[i][0].transcript;
            //    if (event.results[i].isFinal) {
            //        interimTranscript += transcript;
            //    } else {
            //        interimTranscript += transcript;
            //    }
            //}
            //console.log('interim:' + interimTranscript);
            count = count + 1;
            console.log('count:' + count);
            interimTranscript = sentence;
            console.log('sentence ' + sentence);



            document.getElementById('txtdiv').innerHTML = interimTranscript;
            console.log('document.getElementById(txtdiv).innerHtml:' + document.getElementById('txtdiv').innerHtml);

            console.log('currentSaidTxt :' + currSaidTxt + ' == interimTranscript ' + interimTranscript + ' ?');

            if (currSaidTxt === interimTranscript) {
                console.log('no change in currSaidTxt: ' + currSaidTxt);
            } else {
                console.log(' changed currSaidTxt was: ' + currSaidTxt);
                currSaidTxt = interimTranscript;

                const res = await superagent
                    .get('/ret_func')
                    .set('Content-Type', 'application/json')
                    .then(res => {
                        
                        console.log('called ret_func');
                        console.log(typeof res);

                        console.log('curr_tween_params is of type:' + typeof res);
                        console.log('res:' + res);
                        curr_tween_params = res.body;
                        console.log("success!!!");
                        // res.body, res.headers, res.status
                    })
                    .catch(err => {
                        // err.message, err.response
                    });

                /*
                $(function () {
                     $.ajax({
                        type: "GET",
                        url: "/ret_func",
                        
                        contentType: 'application/json',
                        success: function (response) {
                            console.log('called ret_func');
                            console.log(typeof response);
                       
                            console.log('curr_tween_params is of type:' + typeof response);
                            console.log('response:' + response);
                            console.log('response.x : ' + response.x);
                            curr_tween_params = response;
                            console.log("success!!!");
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            alert("error");
                        },
                    });
                });
                */
                console.log("curr_tween_params.body: ", JSON.stringify(curr_tween_params)    );
                
            }

            if (currSaidTxt.includes("dog") && currSaidTxt.includes("show")) {
                console.log("said dog show!!");
                console.log('dog ele:' + dog_svg)

                console.log('showX:' + showX + 'showY:' + showY);
                let x_curr = curr_tween_params.x;
                let scl = curr_tween_params.scale;
                let atAlph = curr_tween_params.autoAlpha;
                console.log('x:' + x_curr + ' scl: ' + scl + ' atAlp: ' + atAlph);

                console.log('x_curr:' + x_curr);
                
                TweenMax.to(dog_svg, 3, {
                    x: x_curr,
                    scale: scl,
                    ease: (curr_tween_params.ease == 'Elastic.easeOut' ? Elastic.easeOut : ""),
                    autoAlpha: atAlph,
                });

                /*
                TweenMax.to(dog_svg, 3, {
                    x: 100,
                    scale: .8,
                    ease: Elastic.easeOut,
                    autoAlpha: 1,
                });*/
                
            }

            if (currSaidTxt.includes("rectangle") && currSaidTxt.includes("show")) {
                console.log("said rectangle show!!");


                console.log('showX:' + showX + 'showY:' + showY.innerText);
                TweenMax.to(".green", 3, {
                    x: 100,
                    scale: .8,
                    ease: Elastic.easeOut,
                    autoAlpha: 1,
                });
            }

            if (currSaidTxt.includes("dog") && currSaidTxt.includes("move")) {
                console.log("said dog move!!");
                console.log('dog ele:' + dog_svg)

                console.log('showX:' + showX.innerText + 'showY:' + showY.innerText);
                TweenMax.to(dog_svg, 3, { x: (showX.innerText - 50), y: (showY.innerText - 300), rotation: 0, scale: 1.0 });
            }

            if (currSaidTxt.includes("dog") && currSaidTxt.includes("rotate") && currSaidTxt.includes("scale")) {
                console.log("said dog rotate scale!!");
                console.log('dog ele:' + dog_svg)
                TweenMax.to(dog_svg, 3, { rotation: 360, scale: 0.5 });
            }

            if (currSaidTxt.includes("rectangle") && currSaidTxt.includes("scale") && currSaidTxt.includes("green") && currSaidTxt.includes("rotate")) {
                console.log("said green rectangle rotate scale!!");
                TweenMax.to(".green", 3, { rotation: 360, scale: 0.5, autoAlpha: 1 });
            }

            console.log('sleeping......');
            //wait(2000);
            console.log('indx:' + indx);

        }, 4000 * index);
    }



}

//}
//recognition.start();

function updateDisplay(event) {
    pageX.textContent = event.clientX;
    pageY.textContent = event.clientY;
}


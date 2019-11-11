<template>
  <div id="Animakit">
    in animkit
    <div id="txtdiv">Test</div>

   

    <p>
      <code>pageX</code>:
      <span id="x">n/a</span>
    </p>
    <p>
      <code>pageY</code>:
      <span id="y">n/a</span>
    </p>
    <img id="dogimgid" src="../assets/dog_svg.svg" alt="dog svg" height="87px" width="100px" />


     <div class="box rcorners1">green</div>

     
  </div>
</template>

<style>
.wrapper {
  margin-top:16px;
}

.box {
  display:block;
  position:relative;
}

.rcorners1 {
  
  border-radius: 25px;
  background: #73AD21;
  padding: 20px; 
  width: 150px;
  height: 150px;  
}

</style>
            <script src="TweenMax.min.js"></script>

          <script>
</script>


<script>
let box;
let pageX;
let pageY;
let showX;
let showY;
let wait = ms => new Promise((r, j) => setTimeout(r, ms));
let currSaidTxt;


export default {
  name: "Animakit",

  methods: {
    firstOne: function() {
      box = document.getElementsByTagName("html");
      box[0].addEventListener("mousemove", this.updateDisplay, false);
      box[0].addEventListener("mouseenter", this.updateDisplay, false);
      box[0].addEventListener("mouseleave", this.updateDisplay, false);

      //---- speech

      let currSaidTxt = "";

      const dog_svg = document.getElementById("dogimgid");
      console.log("is dogimgid obj: " + document.getElementById("dogimgid"));
      let count = -1;
      let curr_tween_params;

      //TweenMax.to("h2.title", 1, { opacity: 0.3 });
      //TweenMax.set(dog_svg, { autoAlpha: 0 });

      //window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      //let finalTranscript = '';
      //let recognition = new window.SpeechRecognition();
      //recognition.interimResults = true;
      //recognition.maxAlternatives = 10;
      //recognition.continuous = true;
      //recognition.onresult = (event) => {

      let sentences = ["show dog", "dog rotate scale", "show rectangle", "rectangle rotate green scale" ];
      //let sentences = ["show rectangle"]; 
      //let sentences = ["rectangle rotate green scale"]; 
      for (var index = 0; index < sentences.length; index++) {
        setTimeout(() => {
          count = count + 1;
          console.log("count:" + count);
           this.act(sentences[count], count);
          }, index * 2000);   
      }
    },

    act: function(sentence, indx) {

      console.log("sentence:" + sentence);
      const dog_svg = document.getElementById("dogimgid");
      console.log("is dogimgid obj: " + document.getElementById("dogimgid"));

      let curr_tween_params;
      let interimTranscript = "";
      //for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
      //    let transcript = event.results[i][0].transcript;
      //    if (event.results[i].isFinal) {
      //        interimTranscript += transcript;
      //    } else {
      //        interimTranscript += transcript;
      //    }
      //}
      //console.log('interim:' + interimTranscript);

      interimTranscript = sentence;
      console.log("sentence " + sentence);

      document.getElementById("txtdiv").innerHTML = interimTranscript;
      console.log(
        "document.getElementById(txtdiv).innerHtml:" +
          document.getElementById("txtdiv").innerHtml
      );

      console.log(
        "currentSaidTxt :" +
          currSaidTxt +
          " == interimTranscript " +
          interimTranscript +
          " ?"
      );

      if (currSaidTxt === interimTranscript) {
        console.log("no change in currSaidTxt: " + currSaidTxt);
      } else {
        console.log(" changed currSaidTxt was: " + currSaidTxt);
        currSaidTxt = interimTranscript;

        

        this.apiCallForTweenParams(interimTranscript).then(curr_tween_params => {

          pageX = document.getElementById("x");
          pageY = document.getElementById("y");
          showX = pageX.textContent;
          showY = pageY.textContent;

          console.log('curr_tween_params from server: ' + JSON.stringify(curr_tween_params));
          //first sentence "show dog"
          if (currSaidTxt.includes("dog") && currSaidTxt.includes("show")) {
            console.log("said dog show!!");
            console.log("dog ele:" + dog_svg);
            console.log("showX:" + showX + "showY:" + showY);
            this.executeTween(dog_svg, curr_tween_params);
          }

          if (
            currSaidTxt.includes("rectangle") &&
            currSaidTxt.includes("show")
          ) {
            console.log("said rectangle show!!");

            console.log("showX:" + showX + "showY:" + showY);
            gsap.to(".box", {
              duration: 3,
              x: 100,
              scale: 0.8,
              ease: Elastic.easeOut,
              autoAlpha: 1
            });
          }

          if (currSaidTxt.includes("dog") && currSaidTxt.includes("move")) {
            console.log("said dog move!!");
            console.log("dog ele:" + dog_svg);

            console.log(
              "showX:" + showX.innerText + "showY:" + showY.innerText
            );
            TweenMax.to(dog_svg, 3, {
              x: showX.innerText - 50,
              y: showY.innerText - 300,
              rotation: 0,
              scale: 1.0
            });
          }
          //second sentence  "dog rotate scale"
          if (
            currSaidTxt.includes("dog") &&
            currSaidTxt.includes("rotate") &&
            currSaidTxt.includes("scale")
          ) {
            console.log("said dog rotate scale!!");
            console.log("dog ele:" + dog_svg);
            TweenMax.to(dog_svg, 3, curr_tween_params);
          }

          if (
            currSaidTxt.includes("rectangle") &&
            currSaidTxt.includes("scale") &&
            currSaidTxt.includes("green") &&
            currSaidTxt.includes("rotate")
          ) {
            console.log("said green rectangle rotate scale!!");
            console.log("rotating green.: " + JSON.stringify(curr_tween_params));
            gsap.to(".rcorners1", curr_tween_params);
            // gsap.to(".green",{
            //   duration: 3,  
            //   rotation: 360,
            //   scale: 0.5,
            //   autoAlpha: 1
            // }); 

            //TweenMax.to(".green", {rotation: 27, x: 100, duration: 1});
            // TweenMax.to(".green", 3, {
            //   rotation: 360,
            //   scale: 0.5,
            //   autoAlpha: 1
            // }); 
          }
        });
      } // end - changed currSaidTxt
      console.log("sleeping......");
      //wait(2000);
      console.log("indx:" + indx);
    },
    //}
    //recognition.start();

    updateDisplay: function(event) {
      pageX = document.getElementById("x");
      pageY = document.getElementById("y");
      pageX.textContent = event.clientX;
      pageY.textContent = event.clientY;
    },

    apiCallForTweenParams: function(interimTranscript) {
      //let blah =  Object.is(pageX, undefined) ? 0 : "defined";
      //console.log('blah : ' + blah);
          pageX = document.getElementById("x");
          pageY = document.getElementById("y");
          showX = pageX.textContent;
          showY = pageY.textContent;

      console.log("pageX.textContent: " + pageX.textContent+ " pageY.textContent: " + pageY.textContent);
      //for the begining set (x,y) to (0,0)
     
      return axios
        .post("http://localhost:3000/ret_func",{"text": interimTranscript, "coordinates": {x: pageX.textContent, y: pageY.textContent}})
        //.set("Content-Type", "application/json")
        .then(res => {
          console.log("called ret_func");
          console.log("typeof res:" + typeof res);

          console.log("res is of type:" + typeof res);
          console.log("res:" + JSON.stringify(res));

          let curr_tween_params = res.data;
          console.log("curr_tween_params: ", JSON.stringify(curr_tween_params));
          console.log("success calling api!!!");
          // res.body, res.headers, res.status
          return curr_tween_params;
        })
        .catch(err => {
          console.log("err.message:" + err.message);
          console.log("err:" + err);
          // err.message, err.response
        });
    },
    executeTween: function(svg_obj, paramObj) {
      //{"duration":3,"x":100,"scale":0.8,"ease":"Elastic.easeOut","autoAlpha":1}
      console.log("paramObj:" + JSON.stringify(paramObj));
      let _duration = paramObj.duration;
      let _x = paramObj.x;
      let _scale = paramObj.scale;
      let _autoAlpha = paramObj.autoAlpha;
      let _easeOut = paramObj.ease;

      console.log("x:" + _x + " scl: " + _scale + " atAlp: " + _autoAlpha);

      console.log("_autoAlpha:" + paramObj.autoAlpha);
      console.log("from server x:" + _x);
      var objForTween = {};
      if (_x) {
        objForTween["x"] = _x;
      }
      if (_scale) {
        objForTween["scale"] = _scale;
      }
      if (_autoAlpha) {
        objForTween["ease"] = _easeOut;
      }
      if (_easeOut) {
        objForTween["autoAlpha"] = _autoAlpha;
      }
      if (_duration) {
        objForTween["autoAlpha"] = _autoAlpha;
      }

      TweenMax.to(svg_obj, 3, objForTween);

      //TweenMax.to(svg_obj, 3, {
      //    x: _x,
      //    scale: _scale,
      //    ease: _easeOut,
      //    autoAlpha: _autoAlpha
      //});
    }
  },
  mounted() {
    console.log("called mounted");
    this.firstOne();
  }
};

/*
                              TweenMax.to(dog_svg, 3, {
                                  x: 100,
                                  scale: .8,
                                  ease: Elastic.easeOut,
                                  autoAlpha: 1,
                              });*/

import { TweenMax } from "gsap";
import { gsap } from "gsap";
import { Elastic } from "gsap";
import axios from "axios";
</script>



// Your JavaScript code goes here

var Rangebox = document.getElementById("SelectLevel");
var numberOfOptionsbox = document.getElementById("SelectOptions");
var numberOfOptions = 4;
var barSpeed = 0;
var score = 0;
const askmebutton = document.getElementById("askMe");
const barContainer = document.getElementById("bar-container");
const answerbutton = document.querySelectorAll('.answerbutton');
const askmeContiner = document.getElementById("askmeContiner");
const Timebox = document.getElementById("selectTime");
const answerContainer = document.getElementById("answerContainer");
var UserGotItRight = false;
barContainer.style.display = 'none';
reSetBarSpeed();
// testing the bar
var barDiv = document.getElementById("bar");
barDiv.style.width = '0%';
var i = 0; 
function bar() {         //  create a loop function
    setTimeout(function() {   //  call a 3s setTimeout when the loop is called
      barDiv.style.width = (i/ barSpeed * 1.55) + '%';
      i++;                    //  increment the counter


    if (i < (66 * barSpeed)) {           //  if the counter < 10, call the loop function
    bar();             //  ..  again which will trigger another 
    }                      //  ..  setTimeout()
    else {
        console.log('done');
        i = 0;
        barDiv.style.width = '0%';
        askmebutton.disabled = false;
        if (UserGotItRight) {
            askmepleae();
            UserGotItRight = false;
            barSpeed /= 1.5;
        } else {
            switch (true) {
                case (score === 0):
                    alert('،لقد انتهى الوقت' + ' الإجابة الصحيحة هي : ' + rightanswer + '، لم تكسب أي نقطة ');
                    break;
                case (score === 1):
                    alert('،لقد انتهى الوقت' + ' الإجابة الصحيحة هي : ' + rightanswer + '، كسبت نقطة واحدة ');
                    break;
                case (score === 2):
                    alert('،لقد انتهى الوقت' + ' الإجابة الصحيحة هي : ' + rightanswer + '، كسبت نقطتان ');
                    break;
                case (score > 2 && score < 11):
                    alert('،لقد انتهى الوقت' + ' الإجابة الصحيحة هي : ' + rightanswer + '، كسبت ' + score + ' نقاط');
                    break;
                case (score > 10):
                    alert('،لقد انتهى الوقت' + ' الإجابة الصحيحة هي : ' + rightanswer + '، كسبت ' + score + ' نقطة، أبدعت!');
                    break;
            }


            askmeContiner.style.display = 'block';
            const answerbutton = document.querySelectorAll('.answerbutton');
            answerbutton.forEach(element => {
                element.disabled = true;

            });
            score = 0;
            reSetBarSpeed();
        }

    }
}, 1)

}

function reSetBarSpeed() {
    if (window.innerWidth > 550) {
        barSpeed = parseInt(Timebox.value);
    } else {
        barSpeed = parseInt(Timebox.value) * 3;
    }

}
Timebox.onchange = reSetBarSpeed;
function UpdateRange() {
var range = Rangebox.value;

switch (range) {
    case "0":
        min = 78;
        break;
    case "1":
        min = 58;
        break;
    case "2":
        min = 42;
        break;
    case "3":
        min = 29;
        break;
    case "4":
        min = 19;
        break;
    case "5":
        min = 1;
        break;
    default:
        min = 1;
        break;
}
}
function updateNumberOfOptions() {
    var numberOfOptions = numberOfOptionsbox.value;
    console.log('numberOfOptions', numberOfOptions);
    return numberOfOptions;
}
max = 114;
function askmepleae() {
    askmeContiner.style.display = 'none';
    askmebutton.disabled = true;
    bar();
    UpdateRange();
    numberOfOptions = updateNumberOfOptions();
    console.log('min', min);
    console.log('max', max);
    fetch('/sources/en.json')
        .then(response => response.json())
        .then(data => {
            // Process the JSON response here
            console.log(data);
            randomSurah =  randomNumber(min, max);
            rightanswernumber = randomSurah;

            numberOfAyahs = data.data.surahs[randomSurah].ayahs.length;
            randomayah = randomNumber(1, numberOfAyahs - 1);

            console.log('randomSurah', randomSurah , 'numberOfAyahs', numberOfAyahs, 'randomayah', randomayah);

            ayah = data.data.surahs[randomSurah].ayahs[randomayah].text;
            if (ayah.includes("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ")) {
                ayah = ayah.replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ", "");
            }

        const AyahContainer = document.querySelector('#AyahContainer');
        const basmlah = document.createElement('p');
        basmlah.textContent = '!' ; // "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
        const Ayahp = document.createElement('p');
        Ayahp.textContent = "﴾ " + ayah + " ﴿";
        AyahContainer.innerHTML = '';
        AyahContainer.appendChild(basmlah);
        AyahContainer.appendChild(Ayahp); 
        basmlah.classList.add('basmlahp');   
        Ayahp.classList.add('Ayahp');


        rightanswer = data.data.surahs[randomSurah].name;
        numberOFwrongeAnswers = numberOfOptions - 1;
        wronganswers = []; // Initialize the wronganswers array
        for (i = 0 ; i < numberOFwrongeAnswers; i++) {
            minWrong = rightanswernumber - 8 < min ? min : rightanswernumber - randomNumber(3 , 8);
            maxWrong = rightanswernumber + 8 > max ? max : rightanswernumber + randomNumber(3 , 8);
            console.log('minWrong', minWrong, 'maxWrong', maxWrong);
            
            randomSurah = randomNumber(minWrong, maxWrong);


            if (data.data.surahs[randomSurah].ayahs.length == numberOfAyahs && data.data.surahs[randomSurah].ayahs[randomayah].text.includes(ayah) ){ // make sure there is no two right answers
                    --i;
                    continue; 
                    console.log('right answer duplecet skiped');
                             
            } 
                if (wronganswers.includes(data.data.surahs[randomSurah].name)){ // to avoid duplicates wrong answers  
                    i --;
                    console.log('wrong answers duplecet skiped');
                    continue;   

            }       
                 wronganswers[i] = data.data.surahs[randomSurah].name;
                    

            
            
                                                     }

        answers = [];
        answers[0] = rightanswer;
        const wrongeAnswers = numberOFwrongeAnswers; // Add missing variable declaration
        for (let i = 1; i < wrongeAnswers + 1; i++){ // Correct the loop condition
            answers[i] = wronganswers[i-1]; 
        } 

       answers.sort(() => Math.random() - 0.5);
       answerContainer.innerHTML = '';
       answerContainer.style.visibility = 'visible';


        for (let i = 0; i < answers.length ; i++) {
            let answer = document.createElement('button');
            answer.textContent = answers[i];
            answer.classList.add('answerbutton');
            answer.onclick = function() {
            checkanswer(answers[i], answer);
            }
            answerContainer.appendChild(answer);
        }
        barContainer.style.display = 'flex';


        })

        



        .catch(error => {
            // Handle any errors here
            console.error(error);
        });         


    }

    function checkanswer(answer , thisAnswer) {
            if (answer == rightanswer) {  // if user got right answer 
                thisAnswer.style.backgroundColor = 'green';
                score ++;
                UserGotItRight = true;
                const answerbutton = document.querySelectorAll('.answerbutton');
                answerbutton.forEach(element => {
                    element.disabled = true;
                });
                i = 66 * barSpeed;
                
                } else { // if user got wrong answer
                    thisAnswer.style.backgroundColor = 'red';
                    thisAnswer.disabled = true;

                userGotItRight = false;
                i += 30 * barSpeed;
                }

        }
    
        /*
        code : 200
        status : "OK"
        data : {
            surahs : [
                0 : ....
                1 : ....
                114 : {
                    name : 'الناس'
                    ayahs : [
                        0 : {
                            number : 1
                            text : 'قل أعوذ برب الناس'
                            numberInSurah : 1
                            juz : 30
                            manzil : 7
                            page : 604
                            ruku : 1
                            hizbQuarter : 1
                            sajda : false
                        }
                    ]


                }


            }


        }
        

        */
      
function randomNumber(min, max) {  
return Math.floor(Math.random() * (max - min + 1) + min - 1); 
}    

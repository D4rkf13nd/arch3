const quizData = [
 {
    question: "AA pipe fitting installed close to the ground on the exterior of a building, providing two or move connections through which the fire department can pump water to a standpipe or sprinkler system",
    answer: "SIAMESE"
},
    {
    question: "A portable apparatus for putting out a small fire by ejecting pressurized water or special chemicals classified according to the type of fire it is able to extinguish",
    answer: "FIRE EXTINGUISHER"
    },
    {
    question: "A fire involving ordinary combustible materials such as wood, paper, and cloth, on which the quenching or cooling effect of water is of primary importance",
    answer: "CLASS A FIRE"
    },
    {
    question: "A fire involving flammable liquids, such as gasoline, oil, and grease, which must be extinguished by excluding air and inviting the release of combustible vapors.",
    answer: "CLASS B FIRE"
    },
    {
    question: "A fire involving live electrical equipment, which requires a nonconducting extinguishing medium",
    answer: "CLASS C FIRE"
    },
    {
    question: "A fire involving certain combustible metals, such as magnesium or sodium, which requires a nonreactive, heat-absorbing extinguishing medium",
    answer: "CLASS D FIRE"
    },
    {
    question: "A passage through or around a wall constructed as required for an occupancy separation, protected by an automatic-closing fire door, and leading to an area of refuge in the same building or on approximately the same level in an adjacent building",
    answer: "HORIZONTAL EXIT"
    },
    {
    question: "A continuous path of travel from any point in a building to the outside at ground level",
    answer: "MEANS OF EGRESS"
    },
    {
    question: "An enclosed and protected path of escape for the occupants of a building in the event of fire, leading from an exit access to an exit discharge",
    answer: "EXIT"
    },
    {
    question: "The portion of an exit access that occupants are required to traverse before entering two separate and distinct paths of egress travel",
    answer: "COMMON PATH OF TRAVEL"
    },
    {
    question: "A passageway serving as a required exit, enclosed by walls of fire-resistive construction. Building codes limit the length of dead-end corridors",
    answer: "EXIT CORRIDOR"
    },
    {
    question: " A door providing access to a means of egress, swinging in the direction of exit travel, and usually equipped with a panic bar",
    answer: "EXIT DOOR"
    },
    {
    question: " An area affording safety from fire or smoke coming from the area from which escape is made and where persons unable to use stairways can remain temporarily to await assistance during an emergency evacuation. Also called area of rescue assistance.",
    answer: "Area of Refuge"
    },
    {
    question: "The enclosing of an exit stairway by walls of fire-resistive construction, accessible by a vestibule or by an open exterior balcony, and ventilated by natural or mechanical means to limit the penetration of smoke and heat. Building codes usually require one or more of the exit stairways for a high-rise building be protected by a smokeproof enclosure",
    answer: "Smokeproof Enclosure"
    },
    {
    question: "A stairway leading to an exit passageway, an exit court, or public way, enclosed by fire resistive construction with self-closing fire doors that swing in the direction of exit travel",
    answer: "EXIT STAIRWAY"
    },
    {
    question: "A landing or porch projecting from the wall of a building and serving as a required means of egress",
    answer: "EXTERIOR EXIT BALCONY"
    },
    {
    question: "An exit stairway down an outside wall of a building, constructed to the same standards as an interior exit stairway",
    answer: "FIRE ESCAPE"
    },
    {
    question: "An exit door opening directly to an exit court or public way",
    answer: "EXTERIOR EXIT"
    },
    {
    question: "A means of egress connecting a required exit or exit court with a public way, having no openings other than required exits and enclosed by fire-resistive construction as required for the walls, floors, and ceiling of the building served",
    answer: "exit passageway"
    },
    {
    question: "That portion of a means of egress that leads from an exit to an exit court or public way. Also called egress court",
    answer: "Exit Discharge"
    },
    {
    question: "A yard or court providing egress to a public way for one or more required exits",
    answer: "EXIT COURT"
    },
    {
    question: "A street, alley, or similar parcel of land open to the sky and deeded, dedicated, or otherwise permanently appropriated for the free passage and use of the general public",
    answer: "Public Way"
    },
    {
    question: "A joist set on top of the sill and forming the perimeter of a wood-framed floor. Also called header",
    answer: "Rim Joist"
    },
    {
        question: " A relatively short beam, joist, or rafter supported by a wall at one end and by a header at the other. Also called stringer",
        answer: "tailpiece"
    }
    ,{
        question: "An arrangement of braces or blocking between joists or rafters to prevent their rotation or lateral displacement, esp. when their depth- to-width ratio exceeds 6. Bridging may not be required when the ends of the members are fixed against rotation and their edges are held in line by subflooring or sheathing.",
        answer: "Bridging"
    }
];


let quizOrder = [];
let currentAnswers = [];
let currentQuestion = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createQuiz() {
    // If quizOrder is not set, initialize and shuffle
    if (!quizOrder.length) {
        quizOrder = Array.from({length: quizData.length}, (_, i) => i);
        shuffleArray(quizOrder);
    }
    if (!currentAnswers.length || currentAnswers.length !== quizData.length) {
        currentAnswers = new Array(quizData.length).fill("");
    }
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';

    quizOrder.forEach((qIdx, index) => {
        const question = quizData[qIdx];
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-container';
        if (index === 0) questionDiv.classList.add('active');

        questionDiv.innerHTML = `
            <div class="question">${index + 1}. ${question.question}</div>
            <div class="identification-input" style="display:flex;gap:8px;align-items:center;">
                <input type="text" id="input-${index}" data-q="${index}" autocomplete="off" placeholder="Type your answer..." value="${currentAnswers[index] || ''}" oninput="handleInput(${index})" />
                <button type="button" class="send-btn" id="send-${index}" onclick="sendAnswer(${index})" aria-label="Send answer" style="background:none;border:none;cursor:pointer;padding:0 6px;display:flex;align-items:center;">
                  <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' fill='none' viewBox='0 0 24 24'><path fill='var(--accent)' d='M2.01 21 23 12 2.01 3 2 10l15 2-15 2z'/></svg>
                </button>
            </div>
            <div class="feedback" id="feedback-${index}" aria-live="polite"></div>
        `;
        quizContainer.appendChild(questionDiv);
    });
    // Restore any previous answers (when resetting or revisiting)
    quizOrder.forEach((qIdx, index) => {
        if (currentAnswers[index] && currentAnswers[index] !== "") {
            const input = document.getElementById(`input-${index}`);
            if (input) input.value = currentAnswers[index];
        }
    });
    // Hide score page if visible
    const scorePage = document.getElementById('scorePage');
    if (scorePage) scorePage.style.display = 'none';
    updateNavigation();
}

// For identification: handle input and update answer
function handleInput(questionIndex) {
    const input = document.getElementById(`input-${questionIndex}`);
    currentAnswers[questionIndex] = input.value;
    // Remove feedback and enable input until send is pressed
    const feedbackEl = document.getElementById(`feedback-${questionIndex}`);
    feedbackEl.textContent = '';
    input.classList.remove('correct', 'wrong');
    updateNavigation();
}

function sendAnswer(questionIndex) {
    const input = document.getElementById(`input-${questionIndex}`);
    const feedbackEl = document.getElementById(`feedback-${questionIndex}`);
    const qIdx = quizOrder[questionIndex];
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = quizData[qIdx].answer.trim().toLowerCase();
        // Accept alternate answer for SMOKEPROOF ENCLOSURE  
        let isCorrect = false;
        if (correctAnswer === 'smokeproof enclosure') {
            if (userAnswer === 'smoke proof enclosure') {
                isCorrect = true;
            }
        }
        // Accept alternate answers for DRY-PIPE SYSTEM 
        if (correctAnswer === 'dry-pipe system') {
            if (userAnswer === 'dry pipe system') {
                isCorrect = true;
            }
        }
        // Accept alternate answers for WET-PIPE SYSTEM 
        if (correctAnswer === 'wet-pipe system') {
            if (userAnswer === 'wet pipe system') {
                isCorrect = true;
            }
        }
        // Accept alternate answers for FIRE-RESISTANCE RATING
        if (correctAnswer === 'fire-resistance rating') {
            if (userAnswer === 'fire resistance rating') {
                isCorrect = true;
            }
        }
        // Accept alternate answers for FIRE-DETECTION SYSTEM 
        if (correctAnswer === 'fire-detection system') {
            if (userAnswer === 'fire detection system') {
                isCorrect = true;
            }
        }
        // Accept alternate answers for FUEL-CONTRIBUTION RATING 
        if (correctAnswer === 'fuel-contribution rating') {
            if (userAnswer === 'fuel contribution rating') {
                isCorrect = true;
            }
        }
            // Accept alternate answers for SPRAY-ON FIREPROOFING
            if (correctAnswer === 'spray-on fireproofing') {
                if (userAnswer === 'spray on fireproofing' || userAnswer === 'spray on fire proofing') {
                    isCorrect = true;
                }
            }
            // Accept alternate answers for SPRAY-ON FIREPROOFING
            if (correctAnswer === 'spray-on fireproofing') {
                if (userAnswer === 'spray on fireproofing' || userAnswer === 'spray on fire proofing') {
                    isCorrect = true;
                }
            }
            // Accept alternate answers for FIREPROOFING 
            if (correctAnswer === 'fireproofing') {
                if (userAnswer === 'fire proofing') {
                    isCorrect = true;
                }
            }
    if (userAnswer !== "") {
        input.disabled = true;
            if (userAnswer === correctAnswer || userAnswer.replace(/\s+/g, " ") === correctAnswer.replace(/\s+/g, " ") || isCorrect) {
                feedbackEl.textContent = 'Correct!';
                feedbackEl.style.color = '#2e7d32';
                input.classList.add('correct');
            } else {
                feedbackEl.textContent = `Incorrect. Correct answer: ${quizData[qIdx].answer}`;
                feedbackEl.style.color = '#c62828';
                input.classList.add('wrong');
            }
        setTimeout(() => {
            if (questionIndex < quizData.length - 1) {
                const questions = document.querySelectorAll('.question-container');
                questions[questionIndex].classList.remove('active');
                currentQuestion = questionIndex + 1;
                questions[currentQuestion].classList.add('active');
                updateNavigation();
                // Focus the next input if not already answered
                const nextInput = document.getElementById(`input-${currentQuestion}`);
                if (nextInput && !nextInput.disabled) nextInput.focus();
            }
        }, 500);
    } else {
        feedbackEl.textContent = '';
    }
    updateNavigation();
}

function checkAnswers() {
    let score = 0;
    const questions = document.querySelectorAll('.question-container');

    questions.forEach((question, index) => {
        const input = question.querySelector('input[type="text"]');
        const userAnswer = (input ? input.value.trim().toLowerCase() : "");
        const qIdx = quizOrder[index];
        const correctAnswer = quizData[qIdx].answer.trim().toLowerCase();
            // Accept alternate answer for LIQUID-FILLED COLUMN
            let isCorrect = false;
            if (correctAnswer === 'liquid-filled column') {
                if (userAnswer === 'liquid filled column') {
                    isCorrect = true;
                }
            }
            // Accept alternate answers for SMOKE-DEVELOPED RATING
            if (correctAnswer === 'smoke-developed rating') {
                if (userAnswer === 'smoke developed rating') {
                    isCorrect = true;
                }
            }
            // Accept alternate answers for FIRE-RATED
            if (correctAnswer === 'fire-rated') {
                if (userAnswer === 'fire rated') {
                    isCorrect = true;
                }
            }
            // Accept alternate answers for FIRE-RESISTANCE RATING
            if (correctAnswer === 'fire-resistance rating') {
                if (userAnswer === 'fire resistance rating') {
                    isCorrect = true;
                }
            }
            // Accept alternate answers for FLAME-SPREAD RATING
            if (correctAnswer === 'flame-spread rating') {
                if (userAnswer === 'flame spread rating') {
                    isCorrect = true;
                }
            }
            // Accept alternate answers for SPRAY-ON FIREPROOFING 
            if (correctAnswer === 'spray-on fireproofing') {
                if (userAnswer === 'spray on fireproofing') {
                    isCorrect = true;
                }
            }
            // Accept alternate answers for FIREPROOFING 
            if (correctAnswer === 'fireproofing') {
                if (userAnswer === 'fire proofing') {
                    isCorrect = true;
                }
            }
        input.disabled = true;
        const feedbackEl = document.getElementById(`feedback-${index}`);
            if (userAnswer === correctAnswer || userAnswer.replace(/\s+/g, " ") === correctAnswer.replace(/\s+/g, " ") || isCorrect) {
                score++;
                feedbackEl.textContent = 'Correct!';
                feedbackEl.style.color = '#2e7d32';
            } else {
                feedbackEl.textContent = `Incorrect. Correct answer: ${quizData[qIdx].answer}`;
                feedbackEl.style.color = '#c62828';
            }
    });

    // Hide all questions
    questions.forEach(q => q.style.display = 'none');

    // Show score page
    let scorePage = document.getElementById('scorePage');
    if (!scorePage) {
        scorePage = document.createElement('div');
        scorePage.id = 'scorePage';
        scorePage.className = 'score-page';
        document.getElementById('quiz').appendChild(scorePage);
    }
    scorePage.style.display = 'flex';

    const percentage = (score / quizData.length) * 100;
    scorePage.style.backgroundColor = percentage >= 70 ? '#c8e6c9' : '#ffcdd2';
    let extraMsg = '';
    if (percentage === 100) {
        extraMsg = 'iloveyoumoree baby koo galing galing talaga';
    } else if (percentage > 80) {
        extraMsg = 'kunti nalang ma perfect mo po yan baby ko';
    } else if (percentage >= 75) {
        extraMsg = 'galing naman ng baby kooo';
    } else if (percentage >= 50) {
        extraMsg = 'kaya mo yan baby';
    }
    scorePage.innerHTML = `<div style="font-weight:700;font-size:1.2rem;margin-bottom:8px;">Your score: ${score}/${quizData.length} (${percentage.toFixed(2)}%)</div>`
        + (extraMsg ? `<div class="encouragement">${extraMsg}</div>` : '')
        + `<button class="retry-btn" onclick="resetQuiz()" style="margin-top:18px;display:inline-block;">Try Again</button>`;

    // Hide navigation
    document.querySelector('.submit-btn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('prevBtn').style.display = 'none';
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        const questions = document.querySelectorAll('.question-container');
        questions[currentQuestion].classList.remove('active');
        currentQuestion++;
        questions[currentQuestion].classList.add('active');
        updateNavigation();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        const questions = document.querySelectorAll('.question-container');
        questions[currentQuestion].classList.remove('active');
        currentQuestion--;
        questions[currentQuestion].classList.add('active');
        updateNavigation();
    }
}


function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.querySelector('.submit-btn');
    const counter = document.getElementById('questionCounter');
    const progress = document.getElementById('progress');

    prevBtn.disabled = currentQuestion === 0;

    // Only show submit button on last question and if answered
    const answered = currentAnswers[currentQuestion] && currentAnswers[currentQuestion].trim() !== "";
    if (currentQuestion === quizData.length - 1) {
        submitBtn.style.display = 'block';
        submitBtn.disabled = !answered;
    } else {
        submitBtn.style.display = 'none';
    }

    counter.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    progress.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
    // Hide next button if present
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.style.display = 'none';
    prevBtn.style.display = 'block';
}

function resetQuiz() {
    // Shuffle question order for new try
    quizOrder = Array.from({length: quizData.length}, (_, i) => i);
    shuffleArray(quizOrder);
    currentAnswers = new Array(quizData.length).fill("");
    currentQuestion = 0;
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';
    createQuiz();

    // Hide score page if present
    const scorePage = document.getElementById('scorePage');
    if (scorePage) scorePage.style.display = 'none';

    document.querySelector('.submit-btn').style.display = 'none';
    // Hide all retry buttons except the one on score page
    document.querySelectorAll('.retry-btn').forEach(btn => btn.style.display = 'none');
    document.getElementById('nextBtn').style.display = 'block';
    document.getElementById('prevBtn').style.display = 'block';
    updateNavigation();
}

// Initialize the quiz when the page loads
window.onload = function() {
    quizOrder = Array.from({length: quizData.length}, (_, i) => i);
    shuffleArray(quizOrder);
    currentAnswers = new Array(quizData.length).fill("");
    createQuiz();
};

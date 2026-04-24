// Starta spelet från försida
function startGame() {
    const splashScreen = document.getElementById('splashScreen');
    const gameContainer = document.getElementById('gameContainer');
    
    splashScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    
    // Initiera spelbrädet om det inte redan är gjort
    const gameBoard = document.querySelector('.game-board');
    if (gameBoard.innerHTML === '') {
        initializeGame();
    }
}

// Jeopardy Game Data
const gameData = {
    categories: [
    {
            name: "BRÖLLOPSTAJM",
            questions: [
                { value: 100, question: "Hur många dagar är det kvar till bröllopet?", answer: "70 dagar kvar!", image: "./Bilder/Hanna/Frågor/bröllopspardom.png" },
                { value: 200, question: "UTMANING: På bröllop vill man ju vara extra fin i håret, eller hur? Utmana ett annat lag och skapa varsin håruppsättning på en lagmedlem – använd det som finns tillgängligt. Ju galnare, mer kreativ och överdriven frisyr, desto bättre! Hanna utser vinnaren.", answer: "💇‍♀️", image: "./Bilder/Hanna/Frågor/hannalugg.png" },
                { value: 300, question: "Hanna och Per ska gifta sig på Stora Holm Säteri. Men vad är ett säteri egentligen?", answer: "En större herrgård. Historiskt sett ägdes och beboddes den av en adelsman.", image: "./Bilder/Hanna/Frågor/storaholm.png" },
                { value: 400, question: "När man gifter sig ska man ha nått av varje - i vilka kategorier? ", answer: "Något nytt, något gammalt, något lånat, något blått", image: "./Bilder/Hanna/Frågor/ringar.jpg" },
                { value: 500, question: "Innan Per kom in i bilden fanns det tydligen en annan kille som fångade Hannas uppmärksamhet. Hur gammal var Hanna här?", answer: "17 år", image: "./Bilder/Hanna/Frågor/hannakollar.jpg" }
            ]
        },
        {
            
            name: "PER",
            questions: [
                { value: 100, question: "Hur lång är Per? Svara i cm.", answer: "202 cm", image: "./Bilder/Hanna/Frågor/perlång.png" },
                { value: 200, question: "Hur gammal var Per när han och Hanna träffades?", answer: "29 år (13 Nov 2015)", image: "./Bilder/Hanna/Frågor/perliten.jpg" },
                { value: 300, question: "När Per är bakis, vad beställer han på pizzerian?", answer: "Calzone", image: "./Bilder/Hanna/Frågor/perbakis.jpg" },
                { value: 400, question: "Hur friade Per till Hanna?", answer: "När hon var som svagast. Hon låg utslagen och bakfull på soffan och jag ställde mig på knä. Hade köpt ”frågeringar” som brände i fickan och kunde inte hålla sig till något vackrare tillfälle.", image: "./Bilder/Hanna/Frågor/perskål.jpg" },
                { value: 500, question: "UTMANING: Iscensätt frieriet.", answer: "👀", image: "./Bilder/Hanna/Frågor/hannaper2.jpg" }
            ]
        },
        {
            name: "HANNA",
            questions: [
                { value: 100, question: "Vilken är Hannas mest använda Emoji?", answer: "Hanna får visa!", image: "./Bilder/Hanna/Frågor/mobil.jpg" },
                { value: 200, question: "Vad var Hannas allra första jobb?", answer: "Städare på hotell Christian IV i Kristianstad. Hon berättar gärna om när hon träffade Brolle Jr där.", image: "./Bilder/Hanna/Frågor/barn.jpg" },
                { value: 300, question: "UTMANING: Hanna är ju en riktigt läcker ingenjör. Utmana ett annat lag och bygg ett så högt torn som möjligt!", answer: "Högst torn vinner poängen!", image: "./Bilder/Hanna/Frågor/hannaingenjör.jpg" },
                { value: 400, question: "Vad heter Hannas föräldrar? (Bonus: vad heter hennes bröder?)", answer: "Catharina & Jesper! (Tvillingarna heter Johan och Nils)", image: "./Bilder/Hanna/Frågor/familj.png" },
                { value: 500, question: "Hanna gillar fordon av olika slag – men vilka körkort har hon?", answer: "B, C", image: "./Bilder/Hanna/Frågor/fordon.jpg" }
            ]
        },
        {
            name: "LÖVED",
            questions: [
                { value: 100, question: "Vilket är Sveriges vanligaste lövträd?", answer: "Björk", image: "./Bilder/Hanna/Frågor/träd.jpg" },
                { value: 200, question: "Vad behövs för att ved ska brinna bra? Nämn minst tre saker.", answer: "Syre, torr ved, lämplig storlek, tändkälla", image: "./Bilder/Hanna/Frågor/eld.jpg" },
                { value: 300, question: "Familjen Löved bor på Odensvägen i Sävedalen – vilket år köpte de huset?", answer: "2024", image: "./Bilder/Hanna/Frågor/sävedalen.jpg" },
                { value: 400, question: "UTMANING: Skriv en kärleksdikt från Hanna till Per. Orden löv och ved måste vara med. Ni har 2 minuter!", answer: "👀", image: "./Bilder/Hanna/Frågor/hannaper1.jpg" },
                { value: 500, question: "Det sägs att det finns 5 Löve(d) languages. Nämn dem! (Bonus: vilket är Hannas kärleksspråk?)", answer: "Bekräftande ord, kvalitetstid, gåvor, tjänster och fysisk beröring", image: "./Bilder/Hanna/Frågor/hjärta.jpg" }
            ]
        },
        {
            name: "VAD SKER?",
            questions: [
                { value: 100, question: "Vad sker här???!!!", answer: "Hanna är på Peace and Love i Borlänge, året är 2011 och de 'hänger med tältgrannarna'.", image: "./Bilder/Hanna/Frågor/grädde.jpg" },
                { value: 200, question: "UTMANING! Vem skulle tacka nej till något gott i glaset? Inte Hanna i alla fall! Utmana ett annat lag och blanda ihop varsin drink till Hanna – använd det som finns tillgängligt. När kreationerna är klara får Hanna provsmaka och kora vinnaren: godast (eller mest kreativa!) tar hem poängen.", answer: "🍻", image: "./Bilder/Hanna/Frågor/hannaöl.jpg" },
                { value: 300, question: "Var är Hanna på bilden?", answer: "Way Out West 2012", image: "./Bilder/Hanna/Frågor/wow.jpg" },
                { value: 400, question: "Vilken låt spelade Hanna mest troligt här?", answer: "Wonderwall?", image: "./Bilder/Hanna/Frågor/gitarr.jpg" },
                { value: 500, question: "Varför var Hanna utklädd till en pudel?", answer: "Vi skulle på fest", image: "./Bilder/Hanna/Frågor/pudel.jpg"  }
            ]
        }
    ]
};

let currentQuestion = null;
let answerVisible = false;

// Initialize the game board
function initializeGame() {
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';

    gameData.categories.forEach((category, categoryIndex) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';

        const headerDiv = document.createElement('div');
        headerDiv.className = 'category-header';
        headerDiv.textContent = category.name;
        categoryDiv.appendChild(headerDiv);

        const questionsDiv = document.createElement('div');
        questionsDiv.className = 'questions';

        category.questions.forEach((q) => {
            const questionBox = document.createElement('div');
            questionBox.className = 'question-box';
            questionBox.textContent = q.value;
            questionBox.dataset.categoryIndex = categoryIndex;
            questionBox.dataset.questionIndex = category.questions.indexOf(q);
            questionBox.addEventListener('click', () => showQuestion(categoryIndex, category.questions.indexOf(q), questionBox));

            questionsDiv.appendChild(questionBox);
        });

        categoryDiv.appendChild(questionsDiv);
        gameBoard.appendChild(categoryDiv);
    });
}

// Show question in modal
function showQuestion(categoryIndex, questionIndex, element) {
    if (element.classList.contains('answered')) return;

    const question = gameData.categories[categoryIndex].questions[questionIndex];
    currentQuestion = { categoryIndex, questionIndex, element };
    answerVisible = false;

    const modal = document.getElementById('questionModal');
    const questionText = document.getElementById('questionText');
    const answerText = document.getElementById('answerText');
    const imageContainer = document.getElementById('imageContainer');

    // Clear previous content
    imageContainer.innerHTML = '';
    answerText.style.display = 'none';
    document.querySelector('.show-answer-btn').textContent = 'Visa svar';

    // Add image if exists
    if (question.image) {
        const img = document.createElement('img');
        img.src = question.image;
        img.alt = 'Question image';
        imageContainer.appendChild(img);
    }

    questionText.textContent = question.question;
    answerText.textContent = question.answer;

    modal.style.display = 'block';
}

// Toggle answer visibility
function toggleAnswer() {
    const answerText = document.getElementById('answerText');
    const btn = document.querySelector('.show-answer-btn');

    if (!answerVisible) {
        answerText.style.display = 'block';
        btn.textContent = 'Stäng';
        answerVisible = true;
    } else {
        closeModal();
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('questionModal');
    modal.style.display = 'none';

    // Mark question as answered
    if (currentQuestion) {
        currentQuestion.element.classList.add('answered');
    }

    currentQuestion = null;
    answerVisible = false;
}

// Reset game and go back to splash screen
function resetGame() {
    const answered = document.querySelectorAll('.question-box.answered');
    answered.forEach(el => el.classList.remove('answered'));
    closeModal();
    
    const splashScreen = document.getElementById('splashScreen');
    const gameContainer = document.getElementById('gameContainer');
    
    splashScreen.style.display = 'flex';
    gameContainer.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('questionModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Initialize game on load
document.addEventListener('DOMContentLoaded', initializeGame);

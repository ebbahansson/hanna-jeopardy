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
                { value: 200, question: "UTMANING: På bröllop vill man ju vara extra fin i håret. Gör en bröllopsuppsättning på Hanna! Tema: EXTRA ALLT. Ni har 3 minuter på er.", answer: "💇‍♀️", image: "./Bilder/Hanna/Frågor/hannalugg.jpg" },
                { value: 300, question: "Detta är kanske chockerande för er alla men Hanna är faktiskt redan gift. Bröllopet skedde i \"målarrummet\" med en man som hette Anton, enligt säkra källor. Men när var detta historiska bröllop?", answer: "Dagis", image: "./Bilder/Hanna/Frågor/grädde.jpg" },
                { value: 400, question: "Att hitta bröllopsklänningar kan vara en djungel. Tyvärr finns bara dessa tre kvar i affären, vilken skulle Hanna ha valt?", answer: "👗", image: "./Bilder/Hanna/Frågor/klanningkombo.png"}
            ]
        },
        {
            
            name: "PER",
            questions: [
                { value: 100, question: "Hur lång är Per? Svara i cm.", answer: "202 cm", image: "./Bilder/Hanna/Frågor/perlång.png" },
                { value: 200, question: "När Per är bakis, vad beställer han på pizzerian?", answer: "Calzone", image: "./Bilder/Hanna/Frågor/perbakis.jpg"},
                { value: 300, question: "Hur friade Per till Hanna?", answer: "När hon var som svagast. Hon låg utslagen och bakfull på soffan och jag ställde mig på knä. Hade köpt ”frågeringar” som brände i fickan och kunde inte hålla sig till något vackrare tillfälle.", image: "./Bilder/Hanna/Frågor/perskål.jpg"},
                { value: 400, question: "UTMANING: Iscensätt frieriet.", answer: "👀", image: "./Bilder/Hanna/Frågor/hannaper2.jpg" }
            ]
        },
        {
            name: "HANNA",
            questions: [
                { value: 100, question: "Vilken är Hannas mest använda Emoji?", answer: "Hanna får visa!", image: "./Bilder/Hanna/Frågor/mobil.jpg" },
                { value: 200, question: "Hanna gillar fordon av olika slag – men vilka körkort har hon?", answer: "B, C", image: "./Bilder/Hanna/Frågor/fordon.jpg"},
                { value: 300, question: "UTMANING: Hanna är ju en riktigt läcker ingenjör. Utmana Hanna och bygg ett så högt torn som möjligt!", answer: "Högst torn vinner poängen!", image: "./Bilder/Hanna/Frågor/hannaingenjör.jpg" },
                { value: 400, question: "Vad heter Hannas föräldrar? (Bonus: vad heter hennes bröder?)", answer: "Catharina & Jesper! (Tvillingarna heter Johan och Nils)", image: "./Bilder/Hanna/Frågor/familj.png" }
            ]
        },
        {
            name: "LÖVED",
            questions: [
                { value: 100, question: "Från WinBLAD till LÖVed. Hanna har utöver växtinspirerande efternamn även gröna fingrar. Vad är det hon försöker odla på denna bilden från 2016? ", answer: "Avokado 🥑", image: "./Bilder/Hanna/Frågor/växt.jpg" },
                { value: 200, question: "Det sägs att det finns 5 Löve(d) languages. Nämn dem! (Bonus: vilket är Hannas kärleksspråk?)", answer: "Bekräftande ord, kvalitetstid, gåvor, tjänster och fysisk beröring", image: "./Bilder/Hanna/Frågor/hjärta.jpg"},
                { value: 300, question: "Familjen Löved bor på Odensvägen i Sävedalen – vilket år köpte de huset?", answer: "2024", image: "./Bilder/Hanna/Frågor/savedalen.jpg" },
                { value: 400, question: "UTMANING: Skriv en kärleksdikt från Hanna till Per. Orden löv och ved måste vara med. Ni har 2 minuter!", answer: "👀", image: "./Bilder/Hanna/Frågor/hannaper1.jpg" }
            ]
        },
        {
            name: "VAD SKER?",
            questions: [
                { value: 100, question: "Vad sker här???!!! Vilket år???", answer: "Peace & Love, 2011", image: "./Bilder/Hanna/Frågor/gitarr.jpg" },
                { value: 200, question: "UTMANING! Vem skulle tacka nej till något gott i glaset? Inte Hanna i alla fall! Utmana ett annat lag och blanda ihop varsin drink till Hanna – använd det som finns tillgängligt.", answer: "🍻", image: "./Bilder/Hanna/Frågor/hannaöl.jpg" },
                { value: 300, question: "Vad sker här???!!! Vilket år???", answer: "Way Out West, 2012", image: "./Bilder/Hanna/Frågor/wow.jpg" },
                { value: 400, question: "Vad sker här???!!! Vilket år???", answer: "Gymnasiefest, 2013", image: "./Bilder/Hanna/Frågor/pudel.jpg" }
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

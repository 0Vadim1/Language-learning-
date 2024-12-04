$(document).ready(function () {
   const words = [
    { word: "cat", translation: "кіт", explanation: "Кішка — це домашня тварина." },
    { word: "dog", translation: "собака", explanation: "Собака — це вірний друг людини." },
    { word: "apple", translation: "яблуко", explanation: "Яблуко — це плід дерева, який зазвичай має червоний або зелений колір." },
    { word: "house", translation: "будинок", explanation: "Будинок — це місце для проживання людей." },
    { word: "car", translation: "авто", explanation: "Автомобіль — це транспортний засіб на колесах, що використовується для перевезення людей." },
    { word: "tree", translation: "дерево", explanation: "Дерево — це рослина з дерев'яним стовбуром." },
    { word: "book", translation: "книга", explanation: "Книга — це друковане або написане видання, що містить текст, зображення або іншу інформацію." },
    { word: "pen", translation: "ручка", explanation: "Ручка — це інструмент для написання або малювання." },
    { word: "sun", translation: "сонце", explanation: "Сонце — це зірка, навколо якої обертається наша планета." },
    { word: "moon", translation: "місяць", explanation: "Місяць — це природний супутник Землі." }
];


    let currentWordIndex = 0;
    let correctCount = 0;
    let incorrectCount = 0;
 // Функція для перемішування масиву
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Обмін елементів
        }
    }

    // Перемішуємо слова перед початком гри
    shuffleArray(words);
   // Функція для перемішування слів
    function shuffleWords() {
        words.sort(() => Math.random() - 0.5);
    }
    // Функція для показу слова
    function showWord() {
        const wordData = words[currentWordIndex];
        $('#word').text(wordData.word);
        $('#translation').val('');
        $('#word-card').removeClass('show');
        setTimeout(function () {
            $('#word-card').addClass('show');
        }, 300);
    }

    // Перевірка перекладу
    $('#check-btn').click(function () {
        const inputTranslation = $('#translation').val().trim();
        const correctTranslation = words[currentWordIndex].translation;
 // Перевірка на порожнє поле
        if (inputTranslation === "") {
            alert("Будь ласка, введіть переклад перед перевіркою!");
            return; // Виходимо з функції, щоб не перевіряти далі
        }
        if (inputTranslation.toLowerCase() === correctTranslation.toLowerCase()) {
            correctCount++;
            $('#correct-count').text(correctCount);
        } else {
            incorrectCount++;
            $('#incorrect-count').text(incorrectCount);
        }

        // Оновлюємо прогрес бар
        const progressPercentage = ((currentWordIndex + 1) / words.length) * 100;
        $('#progress-bar').css('width', `${progressPercentage}%`);

        currentWordIndex++;

        // Якщо всі слова завершені
        if (currentWordIndex < words.length) {
            showWord();
        } else {
            showResults();
        }
    });

    // Показуємо результати
    function showResults() {
        const resultMessage = `Ви відповіли ${correctCount} з ${words.length} слів!`;
        const levelMessage = calculateLevel(correctCount);
        $('#result-message').text(resultMessage);
        $('#level-message').text(levelMessage);  // Виведення рівня
        $('#modal').show();
    }

    // Функція для визначення рівня знань
    function calculateLevel(correctAnswers) {
        if (correctAnswers <= 3) {
            return "Рівень: Початківець";
        } else if (correctAnswers <= 6) {
            return "Рівень: Середній";
        } else {
            return "Рівень: Просунутий";
        }
    }

    // Почати гру заново
    $('#restart-btn').click(function () {
		shuffleWords(); // Перемішуємо слова
        currentWordIndex = 0;
        correctCount = 0;
        incorrectCount = 0;
        $('#correct-count').text(correctCount);
        $('#incorrect-count').text(incorrectCount);
        $('#progress-bar').css('width', '0%');
        $('#modal').hide();
        showWord();
    });
 // Почати гру заново
    $('#restart-btn1').click(function () {
		shuffleWords(); // Перемішуємо слова
        currentWordIndex = 0;
        correctCount = 0;
        incorrectCount = 0;
        $('#correct-count').text(correctCount);
        $('#incorrect-count').text(incorrectCount);
        $('#progress-bar').css('width', '0%');
        $('#modal').hide();
        showWord();
    });

    // Відкриття списку слів
    $('#open-list-btn').click(function () {
        $('#word-list-modal').show();
        const wordList = $('#word-list');
        wordList.empty();

        words.forEach(word => {
            const listItem = $('<li></li>');
            listItem.append(`<span>${word.word}</span><p>${word.explanation}</p>`);
            wordList.append(listItem);
        });
    });

    // Закрити список слів
    function closeWordList() {
        $('#word-list-modal').hide();
    }

    // Подія для кнопки закриття
    $('#word-list-modal button').click(function () {
        closeWordList();
    });

    // Початкове слово
    showWord();
	 shuffleWords(); // Перемішуємо слова
});

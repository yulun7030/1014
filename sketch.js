let questions = [
  {
    question: "台灣最高的山是哪一座？",
    options: ["阿里山", "玉山", "雪山", "陽明山"],
    answer: 1 // 陣列索引 1 代表 "玉山"
  },
  {
    question: "水在常溫常壓下的沸點是幾度(攝氏)？",
    options: ["50度", "80度", "100度", "120度"],
    answer: 2 // 陣列索引 2 代表 "100度"
  },
  {
    question: "一天有幾個小時？",
    options: ["12", "20", "24", "30"],
    answer: 2
  }
];

let currentQuestion = 0;
let score = 0;
let state = "PLAYING"; // 遊戲狀態：PLAYING 或 GAMEOVER

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
}

function draw() {
  // 背景設定為你喜歡的灰藍色調
  background(176, 196, 222); 
  
  if (state === "PLAYING") {
    displayQuestion();
  } else if (state === "GAMEOVER") {
    displayGameOver();
  }
}

function displayQuestion() {
  fill(0);
  textSize(24);
  text("選擇題測驗", width / 2, 40);
  
  // 顯示分數與目前題號
  textSize(16);
  text(`分數: ${score}`, 50, 40);
  text(`第 ${currentQuestion + 1} / ${questions.length} 題`, width - 60, 40);
  
  // 顯示題目
  textSize(28);
  fill(50);
  text(questions[currentQuestion].question, width / 2, 120);
  
  // 繪製選項按鈕
  for (let i = 0; i < 4; i++) {
    let btnX = width / 2 - 150;
    let btnY = 180 + i * 50;
    
    // 檢查滑鼠是否懸停在按鈕上
    if (mouseX > btnX && mouseX < btnX + 300 && mouseY > btnY && mouseY < btnY + 40) {
      fill(200, 220, 240); // 懸停顏色
    } else {
      fill(255); // 預設白色
    }
    
    rect(btnX, btnY, 300, 40, 10);
    
    fill(0);
    textSize(20);
    text(questions[currentQuestion].options[i], width / 2, btnY + 20);
  }
}

function displayGameOver() {
  fill(0);
  textSize(32);
  text("測驗結束！", width / 2, height / 2 - 40);
  textSize(24);
  text(`你的總得分是：${score} / ${questions.length}`, width / 2, height / 2 + 10);
  
  // 重新開始按鈕
  let btnX = width / 2 - 75;
  let btnY = height / 2 + 50;
  
  if (mouseX > btnX && mouseX < btnX + 150 && mouseY > btnY && mouseY < btnY + 40) {
    fill(200, 220, 240);
  } else {
    fill(255);
  }
  rect(btnX, btnY, 150, 40, 10);
  fill(0);
  textSize(18);
  text("重新開始", width / 2, btnY + 20);
}

function mousePressed() {
  if (state === "PLAYING") {
    // 點擊選項邏輯
    for (let i = 0; i < 4; i++) {
      let btnX = width / 2 - 150;
      let btnY = 180 + i * 50;
      
      if (mouseX > btnX && mouseX < btnX + 300 && mouseY > btnY && mouseY < btnY + 40) {
        if (i === questions[currentQuestion].answer) {
          score++; // 答對加分
        }
        
        currentQuestion++;
        if (currentQuestion >= questions.length) {
          state = "GAMEOVER";
        }
      }
    }
  } else if (state === "GAMEOVER") {
    // 點擊重新開始邏輯
    let btnX = width / 2 - 75;
    let btnY = height / 2 + 50;
    if (mouseX > btnX && mouseX < btnX + 150 && mouseY > btnY && mouseY < btnY + 40) {
      currentQuestion = 0;
      score = 0;
      state = "PLAYING";
    }
  }
}
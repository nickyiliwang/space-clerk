$(function() {
  // database
  const storeItems = [
    // TODO make all prices even
    {
      name: "Abductor",
      price: 10314
    },
    {
      name: "Blaster",
      price: 1241
    },
    {
      name: "McD Combo",
      price: 1299
    },
    {
      name: "Gooooo",
      price: 13413
    },
    {
      name: "Kale",
      price: 0
    },
    {
      name: "Mask",
      price: 6666
    },
    {
      name: "Nokia",
      price: 6310
    },
    {
      name: "Probe",
      price: 3456
    },

    {
      name: "Protein",
      price: 4577
    },
    {
      name: "StarGate",
      price: 324345
    }
  ];

  const customers = [
    {
      image: "./Assets/people/alien-giuditta-valentia-gentile.svg",
      quote: "Hello, I would like to invade Earth with:"
    },
    {
      image: "./Assets/people/rob-prosymbols.svg",
      quote: "Beep Boop, Beep Boop, Beep:"
    },
    {
      image: "./Assets/people/spaceman-creative-mania.svg",
      quote: "Supply me these items HAL:"
    },
    {
      image:
        "https://i.pinimg.com/originals/18/a8/be/18a8be07025301bb2eb5bfabf6e581ba.jpg",
      quote: "HURRY UP! I HAVE TURTLES TO DEAL WITH, GIVE ME: "
    },
    {
      image: "./Assets/people/monster1.svg",
      quote: "Hello, I would like to buy:"
    },
    {
      image: "./Assets/people/monster2.png",
      quote: "Hello, I would like to buy:"
    },
    {
      image: "./Assets/people/monster3.svg",
      quote: "Hello, I would like to buy:"
    },
    {
      image: "./Assets/people/monster4.svg",
      quote: "Hello, I would like to buy:"
    },
    {
      image: "./Assets/people/monster5.svg",
      quote: "Hello, I would like to buy:"
    },
    {
      image: "./Assets/people/space-doggo.svg",
      quote: "Woof Woof Woof ! Woooof:"
    }
  ];
  // end of database

  // Displays Variables
  let display = $("#display");
  let managerSpeechBubble = $(".manager-speech-bubble");
  let customerSpeechBubble = $(".customer-speech-bubble");
  let customerImage = $(".customer-image");
  let customer = $(".customer");
  let playerModal = $(".player-modal");
  let item1 = $("customerItem1");
  let item2 = $("customerItem2");
  let item3 = $("customerItem3");
  // Button Constance
  const equal = $("#equals");
  const clear = $("#clear");
  const number = $(".number");
  const operators = $(".operator");
  const start = $(".start");
  const quit = $(".quit");
  // Global Variables
  let playerScore = 0;
  let result;
  let answerToCompare;
  let operatorCount = 0;
  let resultToCalculate;
  let recordedKeyPressArr = [];
  let gameTime = 100;
  let gameStartTimer = null;

  // Helper functions
  const randomizeNumber = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  // converts input array to strings and display it
  function handleDisplay(value) {
    recordedKeyPressArr.push(value);
    resultToCalculate = recordedKeyPressArr.join("");
    display.val(resultToCalculate);
  }
  // Exit App
  quit.on("click", function() {
    window.location.href = "https://junocollege.com/";
  });
  // listen for backspace, enter and number keys
  $("html").on("keydown", function(e) {
    if (e.keyCode === 8) {
      recordedKeyPressArr.splice(-1, 1);
      resultToCalculate = recordedKeyPressArr.join("");
      display.val(resultToCalculate);
    } else if (e.keyCode === 13) {
      equal.click();
    } else if (
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      (e.keyCode >= 96 && e.keyCode <= 105)
    ) {
      handleDisplay(e.keyCode - 48);
    }
  });

  // addClass
  function handleAddClass() {
    playerModal.addClass("disappear");
    customer.addClass("open");
  }
  // removeClass
  function handleRemoveClass() {
    playerModal.removeClass("disappear");
    customer.removeClass("open");
  }

  // Restart Game
  function restartGame() {
    playerScore = 0;
    gameTime = 100;
    gameStartTimer = setInterval(() => {
      gameTime--;
      managerSpeechBubble.text(
        `CHOP CHOP ! YOU HAVE ${gameTime} SECONDS LEFT, SO FAR YOU HAVE CHECKED OUT ${playerScore} CUSTOMERS`
      );

      if (gameTime === 0) {
        clearInterval(gameStartTimer);
        handleRemoveClass();
      }
    }, 1000);
  }
  // end of Helper functions

  //Cash Register Logic//////////////////////////////
  // Numbers
  number.on("click", function() {
    handleDisplay(this.textContent);
    operatorCount = 0;
  });

  // Operators
  operators.on("click", function() {
    // prevents 2 operator inputs
    if (operatorCount === 0) {
      operatorCount++;
      handleDisplay(this.textContent);
    } else {
      // clicking on another operator will replace the previous operator
      recordedKeyPressArr.splice(-1, 1);
      handleDisplay(this.textContent);
    }
  });

  // Equal
  equal.on("click", function() {
    result = math.evaluate(resultToCalculate);
    recordedKeyPressArr = [result];

    // check for answer
    if (result === answerToCompare) {
      clear.click();
      generateNewCustomer();
      playerScore++;
    }
  });

  // All clear
  clear.on("click", function() {
    display.val("0");
    operatorCount = 0;
    recordedKeyPressArr = [];
  });

  // End of Cash Register Logic//////////////////////

  // Start of Game Logic

  function generateNewCustomer() {
    item1 = storeItems[randomizeNumber(10)];
    item2 = storeItems[randomizeNumber(10)];
    item3 = storeItems[randomizeNumber(10)];

    answerToCompare = item1.price * 2 + item2.price / 2 + item3.price;
    // Cheat: answerToCompare = 2;

    // console.log(answerToCompare);

    let generateRandomCustomer = customers[randomizeNumber(10)];
    customerImage.attr("src", generateRandomCustomer.image);
    customerSpeechBubble.text(
      `${generateRandomCustomer.quote} 2 of ${item1.name}, half of ${item2.name}, and an ${item3.name}`
    );
  }

  start.on("click", function() {
    managerSpeechBubble.text(
      `CHOP CHOP ! YOU HAVE ${gameTime} SECONDS LEFT, SO FAR YOU HAVE CHECKED OUT ${playerScore} CUSTOMERS`
    );

    generateNewCustomer();
    handleAddClass();

    if (gameTime > 0) {
      gameStartTimer = setInterval(() => {
        gameTime--;
        managerSpeechBubble.text(
          `CHOP CHOP ! YOU HAVE ${gameTime} SECONDS LEFT, SO FAR YOU HAVE CHECKED OUT ${playerScore} CUSTOMERS`
        );
        if (gameTime === 0) {
          clearInterval(gameStartTimer);
          handleRemoveClass();
          start.text("Retry ?");
          $(".game-intro").text("Final Score");
          $(".game-intro-p").text(
            `Game Over! Your final score is ${playerScore}`
          );
          start.on("click", restartGame);
        }
      }, 1000);
    }
  });
});

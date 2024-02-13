const dialogueEnter = [
'Ya got money?',
'My wife left me.',
'I`m so alone.',
'I got hats!',
'Whaddya Want?',
'I know you\'re playing this in class.',
'Get sum stuff!',
'He\'s watching.',
'¿Papa frita?',
"Sup, scrub?",
"Not this guy/girl/thing again.",
"Not this thing again.",
"Whats the point of bulding forts we goin night night",
"Shoo.",
"Enviar fotos de los pies?",
"Oh! I-I didn't see you there!",
"Money pays the bills. So pay me too.",
"Yes, father?",
"bopeebo.",
"Lookin' for some b a s e d stuff?",
"Save them.",
"Henya?",
'A little busy right now.',
"Just in time! I'm watching the Fortnite World Cup!",
"It's all a game.",
"Give me you.",
"Here to discuss FNaF lore?",
"I miss my kids.",
"Hide baby peach.",
"Hee hee hee ha",
"50% off on the @8^!@# in back."
];
const dialogueBought = [
  "+5 social credit",
  "Money well spent.",
  "Scammer get scammed.",
  "I got da moneys now.",
  "all your money are belong to us.",
  "Thank you, come again.",
  "Great, now I just need 10,000 more dollars before I can pay tom nook's rent",
  "OUR money.",
  "A hat a day keeps the police away.",
  "This is almost as cool as drinking milk in Jim Carrey's house.",
  "This is almost as neat as that time I watched madagascar in the white house",
  "Tra La La, the 'c' button actaully does something."
];
const dialogueLeave = [
'Yeah whatever, bye.',
'I never liked you anyway.',
'Bruh moment.',
'See you later.',
"You'll be back.",
"D:",
"*Waves cutely awaiting your return",
"#ratio",
"Adventure awaits, scrub.",
"Now back to watching Pokimane.",
"Am I scary yet?",
"They didn't even say goodbye...",
"Sorry we couldn't skype tonight, but that's alright.",
"Bye bozo.",
"Zad...",
"And bid thee farewell.",
"Fine, get bent.",
"bruh.",
"God speed!",
"qwerty."
];

function OpenDialogue(txt = null) {
  var txt = txt;
  if (txt === null) {
    txt = dialogueEnter[Math.floor(Math.random() * dialogueEnter.length)];
    if (Math.random() < 0.01) txt = 'Ẳ̵̡̫͎͍̞͎A̴̧̡̟͔̦̳͍͚̯͍̓͆͝Â̷̗̲̻̇́̋́̈́͝͝(̸̯̺̌̄̃̍̿͑̄̓͗̅̒́͘)̶̨̘̤͓̞̪̲̂̾̽̊̀̀̎̉̎̐͘̕͝ͅ/̷̧̛̦̞̯̄́̑̀̂̀̉̈́͋̈\̷̰̳̼̻̽̓͋͆̏͐̏͛̾̌̆̕/̴̻͎͇̺̭͆͌̂̔̂́̅̈́͑̂͘͘͘͝6̸̨̨͖̹͇̙͎̯̏͆ ̷̧̢̟̣̤̥̫̜̮͎̀͑̈̎̅͐̽̀̄̾͐͒̑͝U̷̢͖̖̟͙̙̖͈̟̱͙̽̊͋̆͜ŝ̷̢̨̛̛̹͈̼̖̜͙͔͇̯̿̽̾̌͋̏̂̈́̕';
  }
  if (!dialogueOpen) {
    dialogueOpen = true;
    world.push(new Dialogue(txt, ((Math.random() < 0.9) ? "dialogue.png" : "dialogueChad.png")));
  } else if (dialogueQueue < 5){
    dialogueQueue.push(txt);
  }
}

function ShopEnter() {
  const txt = dialogueEnter[Math.floor(Math.random() * dialogueEnter.length)];

    OpenDialogue(txt);
}

function ShopLeave() {
  const txt = dialogueLeave[Math.floor(Math.random() * dialogueLeave.length)];

  OpenDialogue(txt);
}
function AddChat(msg) {
  chatQueue.push([msg, 0]);
}


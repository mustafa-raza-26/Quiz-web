// questions.js - Quiz Question Bank
// category values map to the category cards on categories.html:
//   html        -> HTML5 Mastery
//   css         -> Styling & Layouts
//   js          -> JavaScript Core
//   programming -> Algorithms
//   general     -> Global IQ
//   'mixed' is not a stored category; it pulls from all of the above.

const QUIZ_QUESTIONS = [
  // ---------- HTML ----------
  {
    category: "html",
    question: "What is the primary purpose of the HTML5 <main> element?",
    options: [
      "To contain the primary content of the document",
      "To display the main navigation menu",
      "To define the header section of a page",
      "To wrap the footer content"
    ],
    correct: 0,
    difficulty: "easy"
  },
  {
    category: "html",
    question: "Which attribute makes an <input> field mandatory before form submission?",
    options: ["mandatory", "required", "validate", "needed"],
    correct: 1,
    difficulty: "easy"
  },
  {
    category: "html",
    question: "Which tag is used to embed a scalable vector graphic directly in HTML?",
    options: ["<img>", "<canvas>", "<svg>", "<vector>"],
    correct: 2,
    difficulty: "medium"
  },
  {
    category: "html",
    question: "What does the 'alt' attribute on an <img> tag primarily provide?",
    options: [
      "An alternative image source if the first fails",
      "A text description for accessibility and fallback",
      "The image's alignment on the page",
      "An animation trigger"
    ],
    correct: 1,
    difficulty: "easy"
  },
  {
    category: "html",
    question: "Which semantic element best represents a self-contained piece of content, like a blog post?",
    options: ["<section>", "<div>", "<article>", "<aside>"],
    correct: 2,
    difficulty: "medium"
  },
  {
    category: "html",
    question: "What is the correct way to add a JavaScript file that should execute after the document has been parsed?",
    options: [
      "<script defer src=\"app.js\"></script>",
      "<script async-off src=\"app.js\"></script>",
      "<script lazy src=\"app.js\"></script>",
      "<script postload src=\"app.js\"></script>"
    ],
    correct: 0,
    difficulty: "medium"
  },
  {
    category: "html",
    question: "Which HTML5 API allows a web page to store key-value data in the browser with no expiration?",
    options: ["sessionStorage", "cookies", "localStorage", "IndexedCache"],
    correct: 2,
    difficulty: "medium"
  },
  {
    category: "html",
    question: "What does the 'data-*' attribute prefix let you do in HTML?",
    options: [
      "Bind CSS animations",
      "Store custom data private to the page or application",
      "Load external databases",
      "Trigger server-side validation"
    ],
    correct: 1,
    difficulty: "hard"
  },

  // ---------- CSS ----------
  {
    category: "css",
    question: "Which CSS property is used to control the stacking order of elements?",
    options: ["display", "z-index", "position", "float"],
    correct: 1,
    difficulty: "medium"
  },
  {
    category: "css",
    question: "What does 'box-sizing: border-box' change about an element's sizing?",
    options: [
      "It includes padding and border within the element's set width/height",
      "It removes the element's border entirely",
      "It forces the element to fill its parent",
      "It disables margin collapsing"
    ],
    correct: 0,
    difficulty: "medium"
  },
  {
    category: "css",
    question: "In Flexbox, which property aligns items along the cross axis?",
    options: ["justify-content", "align-items", "flex-direction", "align-self-end"],
    correct: 1,
    difficulty: "medium"
  },
  {
    category: "css",
    question: "Which CSS unit is relative to the root element's font size?",
    options: ["em", "vh", "rem", "%"],
    correct: 2,
    difficulty: "easy"
  },
  {
    category: "css",
    question: "What does the CSS Grid property 'fr' represent?",
    options: [
      "A fixed pixel measurement",
      "A fraction of the remaining free space in the grid container",
      "A percentage of the viewport height",
      "A rotation value"
    ],
    correct: 1,
    difficulty: "hard"
  },
  {
    category: "css",
    question: "Which pseudo-class selects an element when the mouse pointer is over it?",
    options: [":focus", ":active", ":hover", ":visited"],
    correct: 2,
    difficulty: "easy"
  },
  {
    category: "css",
    question: "What is the default value of the 'position' property for an HTML element?",
    options: ["relative", "fixed", "absolute", "static"],
    correct: 3,
    difficulty: "medium"
  },
  {
    category: "css",
    question: "Which CSS feature lets you apply a blur effect to whatever is behind an element?",
    options: ["filter: blur()", "backdrop-filter", "box-shadow", "opacity"],
    correct: 1,
    difficulty: "hard"
  },

  // ---------- JavaScript ----------
  {
    category: "js",
    question: "What is the result of '2' + 2 in JavaScript?",
    options: ["4", "NaN", "'22'", "undefined"],
    correct: 2,
    difficulty: "medium"
  },
  {
    category: "js",
    question: "Which keyword declares a variable that cannot be reassigned?",
    options: ["let", "var", "const", "static"],
    correct: 2,
    difficulty: "easy"
  },
  {
    category: "js",
    question: "What does the Array method '.map()' return?",
    options: [
      "The original array, mutated in place",
      "A single accumulated value",
      "A new array with the results of calling a function on every element",
      "A boolean indicating success"
    ],
    correct: 2,
    difficulty: "medium"
  },
  {
    category: "js",
    question: "In JavaScript, what does 'async/await' primarily help you write more cleanly?",
    options: ["CSS animations", "Promise-based asynchronous code", "DOM queries", "Type declarations"],
    correct: 1,
    difficulty: "medium"
  },
  {
    category: "js",
    question: "What is a closure in JavaScript?",
    options: [
      "A function bundled with references to its surrounding lexical scope",
      "A way to close a browser tab from script",
      "A loop that terminates early",
      "A CSS class applied via JS"
    ],
    correct: 0,
    difficulty: "hard"
  },
  {
    category: "js",
    question: "Which operator checks both value and type equality?",
    options: ["==", "=", "===", "!="],
    correct: 2,
    difficulty: "easy"
  },
  {
    category: "js",
    question: "What does 'JSON.stringify()' do?",
    options: [
      "Parses a JSON string into an object",
      "Converts a JavaScript value into a JSON string",
      "Validates JSON syntax",
      "Removes whitespace from a string"
    ],
    correct: 1,
    difficulty: "easy"
  },
  {
    category: "js",
    question: "What will 'typeof null' return in JavaScript?",
    options: ["'null'", "'undefined'", "'object'", "'number'"],
    correct: 2,
    difficulty: "hard"
  },

  // ---------- Algorithms / Programming ----------
  {
    category: "programming",
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Automated Program Integration",
      "Advanced Protocol Interaction",
      "Applied Process Intelligence"
    ],
    correct: 0,
    difficulty: "easy"
  },
  {
    category: "programming",
    question: "What is the time complexity of binary search on a sorted array of n elements?",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
    correct: 2,
    difficulty: "medium"
  },
  {
    category: "programming",
    question: "Which data structure follows Last-In-First-Out (LIFO) order?",
    options: ["Queue", "Stack", "Linked List", "Tree"],
    correct: 1,
    difficulty: "easy"
  },
  {
    category: "programming",
    question: "What is the worst-case time complexity of Quicksort?",
    options: ["O(n log n)", "O(n)", "O(n^2)", "O(log n)"],
    correct: 2,
    difficulty: "hard"
  },
  {
    category: "programming",
    question: "In Big O notation, what does O(1) describe?",
    options: [
      "Constant time, regardless of input size",
      "Linear time proportional to input size",
      "Time that grows exponentially",
      "Time that never terminates"
    ],
    correct: 0,
    difficulty: "medium"
  },
  {
    category: "programming",
    question: "Which technique solves a problem by breaking it into overlapping subproblems and caching results?",
    options: ["Recursion only", "Dynamic programming", "Bubble sort", "Linear search"],
    correct: 1,
    difficulty: "hard"
  },
  {
    category: "programming",
    question: "What does a hash table use to map keys to values efficiently?",
    options: ["A hash function", "A binary tree traversal", "A sorted array scan", "A linked list scan"],
    correct: 0,
    difficulty: "medium"
  },
  {
    category: "programming",
    question: "Which sorting algorithm repeatedly steps through the list, swapping adjacent elements if they're in the wrong order?",
    options: ["Merge sort", "Bubble sort", "Quicksort", "Heap sort"],
    correct: 1,
    difficulty: "easy"
  },

  // ---------- General / Global IQ ----------
  {
    category: "general",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1,
    difficulty: "easy"
  },
  {
    category: "general",
    question: "The Great Wall of China was primarily built to protect against invasions from which direction?",
    options: ["South", "East", "North", "West"],
    correct: 2,
    difficulty: "medium"
  },
  {
    category: "general",
    question: "Which currency is used in Japan?",
    options: ["Won", "Yuan", "Yen", "Ringgit"],
    correct: 2,
    difficulty: "easy"
  },
  {
    category: "general",
    question: "The Amazon Rainforest is located primarily in which continent?",
    options: ["Africa", "Asia", "South America", "Australia"],
    correct: 2,
    difficulty: "easy"
  },
  {
    category: "general",
    question: "Who is credited with developing the theory of general relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Galileo Galilei"],
    correct: 1,
    difficulty: "medium"
  },
  {
    category: "general",
    question: "Which ocean is the largest by surface area?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3,
    difficulty: "easy"
  },
  {
    category: "general",
    question: "The United Nations was founded in which year?",
    options: ["1918", "1945", "1955", "1960"],
    correct: 1,
    difficulty: "hard"
  },
  {
    category: "general",
    question: "Which gas do plants primarily absorb from the atmosphere for photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    correct: 2,
    difficulty: "medium"
  }
];

export default QUIZ_QUESTIONS;

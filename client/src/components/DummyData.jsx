export const dummyData = [
  {
    id: "1",
    title: "How to fix 'Cannot read properties of undefined' in React?",
    description: "Getting undefined error while accessing component props in a child component.",
    tags: ["reactjs", "javascript", "frontend"],
    author: "John Doe",
    vote: 12,
    view: 241,
    answers: [
      {
        id: "a1",
        body: "<p>You need to check if the prop exists before accessing it. Use optional chaining like <code>prop?.value</code>.</p>",
        votes: 5,
        isAccepted: true
      },
      {
        id: "a2",
        body: "<p>Make sure you pass props correctly from the parent component.</p>",
        votes: 1,
        isAccepted: false
      }
    ],
    time: "5 mins ago",
    date: "2025-02-11T10:40:00"
  },

  {
    id: "2",
    title: "Best way to optimize SQL joins?",
    description: "Query becomes slow with multiple joins, looking for query optimization recommendations.",
    tags: ["mysql", "sql", "database", "performance"],
    author: "Sarah Lin",
    vote: 5,
    view: 109,
    answers: [],
    time: "12 mins ago",
    date: "2025-02-11T10:30:00"
  },

  {
    id: "3",
    title: "Next.js routing issue after deployment",
    description: "Routes work locally but break after deployment to Vercel.",
    tags: ["nextjs", "react", "typescript"],
    author: "Alex Carter",
    vote: 3,
    view: 302,
    answers: [
      {
        id: "a3",
        body: "<p>You need to configure <strong>rewrites</strong> in your Vercel settings.</p>",
        votes: 3,
        isAccepted: false
      }
    ],
    time: "22 mins ago",
    date: "2025-02-11T10:15:00"
  },

  {
    id: "4",
    title: "CSS grid layout collapsing on small screens",
    description: "Grid columns collapse unexpectedly below certain breakpoints, need responsive fix.",
    tags: ["css", "grid", "responsive-design"],
    author: "Emily Khan",
    vote: 7,
    view: 189,
    answers: [
      {
        id: "a4",
        body: "<p>Try using <code>minmax()</code> with <code>auto-fit</code> for responsive grids.</p>",
        votes: 2,
        isAccepted: false
      },
      {
        id: "a5",
        body: "<p>Add a proper CSS media query for small screens.</p>",
        votes: 1,
        isAccepted: false
      }
    ],
    time: "32 mins ago",
    date: "2025-02-11T09:50:00"
  },

  {
    id: "5",
    title: "How to debounce an API search in JavaScript?",
    description: "Looking for best practice debounce technique for fetch search.",
    tags: ["javascript", "fetch", "async", "debounce"],
    author: "David Miles",
    vote: 14,
    view: 450,
    answers: [
      {
        id: "a6",
        body: "<p>Use <code>setTimeout</code> with a cleanup function to debounce API calls.</p>",
        votes: 4,
        isAccepted: true
      },
      {
        id: "a7",
        body: "<p>Lodash also provides a <code>_.debounce()</code> utility.</p>",
        votes: 2,
        isAccepted: false
      }
    ],
    time: "45 mins ago",
    date: "2025-02-11T09:35:00"
  },

  {
    id: "6",
    title: "Docker container not exposing port properly",
    description: "Local app works but deployment won't allow external access on listed ports.",
    tags: ["docker", "devops", "networking"],
    author: "Steve Harper",
    vote: 9,
    view: 380,
    answers: [],
    time: "1 hour ago",
    date: "2025-02-11T09:00:00"
  },

  {
    id: "7",
    title: "Fixing failed build in Flutter Android",
    description: "Gradle build fails intermittently with JVM memory error.",
    tags: ["flutter", "android", "gradle"],
    author: "Raj Patel",
    vote: 2,
    view: 120,
    answers: [
      {
        id: "a8",
        body: "<p>Increase Gradle memory in <code>gradle.properties</code> using <code>-Xmx2048m</code>.</p>",
        votes: 1,
        isAccepted: false
      }
    ],
    time: "2 hours ago",
    date: "2025-02-11T08:00:00"
  },

  {
    id: "8",
    title: "Why does Python list copy behave unexpectedly?",
    description: "Changing one list affects another even after using assign operator.",
    tags: ["python", "list", "copy", "mutability"],
    author: "Maria Lopez",
    vote: 22,
    view: 600,
    answers: [
      {
        id: "a9",
        body: "<p>You used <code>=</code> which does not copy the list. Use <code>list.copy()</code> or slicing.</p>",
        votes: 10,
        isAccepted: true
      },
      {
        id: "a10",
        body: "<p>Use <code>deepcopy</code> if your list contains nested objects.</p>",
        votes: 3,
        isAccepted: false
      }
    ],
    time: "3 hours ago",
    date: "2025-02-11T07:30:00"
  },

  {
    id: "9",
    title: "How to fix 'Promise pending' in Node.js?",
    description: "Returning async results but response logs promise instead of value.",
    tags: ["nodejs", "async-await", "promise"],
    author: "Tom Lee",
    vote: 6,
    view: 200,
    answers: [],
    time: "4 hours ago",
    date: "2025-02-11T06:50:00"
  },

  {
    id: "10",
    title: "Typescript error: Argument type 'string[]' not assignable",
    description: "Passing array of strings into function expecting different type.",
    tags: ["typescript", "react", "interfaces"],
    author: "Ankit Sharma",
    vote: 18,
    view: 720,
    answers: [
      {
        id: "a11",
        body: "<p>You need to define your function parameter as <code>string[]</code>.</p>",
        votes: 5,
        isAccepted: false
      },
      {
        id: "a12",
        body: "<p>Make sure the interface matches the argument type.</p>",
        votes: 2,
        isAccepted: false
      }
    ],
    time: "5 hours ago",
    date: "2025-02-11T06:10:00"
  }
];

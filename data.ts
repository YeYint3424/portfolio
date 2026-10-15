export interface JourneyMilestone {
  id: string;
  range: string;
  title: string;
  org: string;
  kicker: string;
  summary: string;
  focus: string[];
  projectSlugs?: string[];
  achievement?: string;
  photoLabel: string;
}

export interface ProjectFeatureGroup {
  group: string;
  items: string[];
}

export interface Project {
  slug: string;
  title: string;
  team: string | null;
  period: string;
  stack: string[];
  summary: string;
  overview: string;
  contribution: string;
  features?: string[] | ProjectFeatureGroup[];
  journeyId: string;
  achievement?: string;
  link: string | null;
}

// The "Tech Journey" — chronological milestones from first line of code to today.
// Dates and organizations are taken directly from the resume (docs/Ye_Yint_Myint_Myat.pdf).
const journey: JourneyMilestone[] = [
  {
    id: "programming-fundamentals",
    range: "April 2022 – July 2022",
    title: "Programming Fundamentals",
    org: "ACE Inspiration",
    kicker: "Where I Started",
    summary:
      "I started my programming journey by attending the Programming Fundamental Course at ACE Inspiration — learning the logic and problem-solving foundations every developer builds on.",
    focus: [
      "Programming fundamentals",
      "Programming logic",
      "Problem solving",
      "Basic software development concepts",
    ],
    photoLabel: "PERSONAL PHOTO — APRIL 2022",
  },
  {
    id: "advanced-java",
    range: "August 2022 – April 2023",
    title: "Advanced Java",
    org: "ACE Inspiration",
    kicker: "Discovering Frontend",
    summary:
      "After the fundamentals, I continued into the Advanced Java Course at ACE Inspiration. My final project, Entrance-X, became the moment I started learning frontend development — designing the UI and connecting it to real backend logic.",
    focus: [
      "Advanced Java",
      "Frontend UI/UX design",
      "Bridging backend logic with frontend development",
      "End-to-end application development",
    ],
    projectSlugs: ["entrance-x"],
    photoLabel: "PERSONAL PHOTO — JAVA TRAINING",
  },
  {
    id: "java-ojt",
    range: "May 2023 – August 2023",
    title: "On-the-Job Training — Java",
    org: "ACE Inspiration",
    kicker: "Real Team Experience",
    summary:
      "I joined ACE Inspiration's On-the-Job Training program, working with Java in a team environment. Our team, Hundred Percent, built JROMS and came out as Project Winner.",
    focus: [
      "Java in a team environment",
      "Multi-role application architecture",
      "Collaborative delivery under deadlines",
    ],
    projectSlugs: ["students-management-system", "jroms"],
    achievement: "Project Winner — JROMS",
    photoLabel: "PERSONAL PHOTO — JROMS TEAM",
  },
  {
    id: "react-ojt",
    range: "September 2023 – December 2023",
    title: "On-the-Job Training — React",
    org: "Ace Data Systems",
    kicker: "Entering Professional Development",
    summary:
      "After joining Ace Data Systems, I began On-the-Job Training with React — moving from Java-centric development into modern, component-based frontend engineering.",
    focus: [
      "React",
      "Component-based development",
      "Modern JavaScript",
      "API integration",
      "Reusable UI components",
    ],
    photoLabel: "PERSONAL PHOTO — REACT TRAINING",
  },
  {
    id: "ace-data-systems",
    range: "January 2024 – November 2024",
    title: "Professional Frontend — Ace Data Systems",
    org: "Ace Data Systems",
    kicker: "Going Pro",
    summary:
      "From January 2024, I worked with Ace Data Systems on AQME, a mobile-first insurance platform — my first professional work with React and Next.js in production.",
    focus: [
      "React & Next.js in production",
      "Mobile-first UI from Figma",
      "Real-time API integration",
      "Performance & accessibility optimization",
    ],
    projectSlugs: ["aqme-insurance"],
    photoLabel: "PERSONAL PHOTO — ACE DATA SYSTEMS",
  },
  {
    id: "d3-sg",
    range: "January 2025 – Present",
    title: "Professional Journey — D3-SG",
    org: "D3-SG (outsourcing)",
    kicker: "D3-SG — Today",
    summary:
      "Since January 2025, I've been working with D3-SG through company outsourcing, building AXURANCE and contributing full-stack to AGB Fiber Internet's CRM — the current chapter of my journey.",
    focus: [
      "Modern frontend development",
      "Production web application development",
      "Cross-team collaboration",
      "Full-stack contribution (AGB Fiber CRM)",
    ],
    projectSlugs: ["axurance-insurance", "agb-fiber-crm"],
    photoLabel: "PERSONAL PHOTO — D3-SG",
  },
];

// Real projects, sourced from docs/Ye_Yint_Myint_Myat.pdf. No invented dates, tech, or outcomes.
const projects: Project[] = [
  {
    slug: "entrance-x",
    title: "Entrance-X — Event Ticket System",
    team: "Team God-X",
    period: "March 25 – April 29",
    stack: [
      "Spring Boot",
      "JPA Repository",
      "Java",
      "HTML",
      "CSS",
      "JavaScript",
      "Thymeleaf",
      "Bootstrap",
    ],
    summary:
      "Event ticketing platform for Team God-X — coded 80% of the UI and 90% of the frontend, with QR-coded ticket delivery and an admin approval workflow.",
    overview:
      "Entrance-X is an event ticketing platform built to be easy to use for both customers and event organizers. It gives admins an at-a-glance dashboard showing the total number of users and organizers on the site.",
    contribution:
      "I designed the platform's UI and led the frontend build — coding roughly 80% of the UI and 90% of the frontend. This was my final project for the Advanced Java course, and the point where I started connecting Java backend concepts with real frontend development.",
    features: [
      {
        group: "User",
        items: [
          "Can easily search for events in the search bar",
          "Can purchase tickets through an online payment system",
          "Receives a QR-coded ticket once an Admin approves the purchase",
        ],
      },
      {
        group: "Organizer",
        items: [
          "Can add events, pending Admin approval",
          "Adds a payment QR code and full event details when creating an event",
          "Has access to an event history",
        ],
      },
      {
        group: "Admin",
        items: [
          "Approves organizers, events, and tickets",
          "Manages User and Organizer accounts",
        ],
      },
    ],
    journeyId: "advanced-java",
    link: null,
  },
  {
    slug: "students-management-system",
    title: "Students Management System",
    team: null,
    period: "June 3 – June 30",
    stack: [
      "Spring Boot",
      "JPA Repository",
      "Java",
      "HTML",
      "CSS",
      "JavaScript",
      "Thymeleaf",
      "Bootstrap",
      "JUnit",
      "Jasper Report",
    ],
    summary:
      "A responsive student enrollment system — designed 100% of the UI, usable seamlessly on both laptop and phone.",
    overview:
      "A school management system where students can browse every course on offer, register, and get approved by an Admin, while Admins manage courses, students, and user roles.",
    contribution:
      "I designed 100% of the UI, focusing on a responsive experience that works cleanly on both laptop and mobile.",
    features: [
      "Users can see every course offered by the school, even before signing up",
      "After signing up, users can register for a course",
      "A user becomes a student once an Admin approves them",
      "Students have access to their student list",
      "Admins can add courses and manage students and users",
      "Promoting a User to Admin grants full Admin and Default-Admin functions",
    ],
    journeyId: "java-ojt",
    link: null,
  },
  {
    slug: "jroms",
    title: "Job Recruitment & Offering Management System (JROMS)",
    team: "Team Hundred Percent",
    period: "July 3 – August 29",
    stack: [
      "Spring Boot",
      "Spring Data JPA",
      "JPA Repository",
      "Java",
      "HTML",
      "CSS",
      "jQuery",
      "JavaScript",
      "Thymeleaf",
      "Bootstrap",
      "JUnit",
      "Jasper Report",
    ],
    summary:
      "A multi-role recruitment platform built with Team Hundred Percent — named Project Winner during our Java On-the-Job Training.",
    overview:
      "JROMS is a multi-role hiring platform spanning Candidates, Junior-HR, Senior-HR, Admin, Default-Admin, Interviewer, and Department-Head roles, each with its own scope of access to vacancies, interviews, offers, and reports.",
    contribution:
      "Built with Team Hundred Percent during our Java On-the-Job Training, with a strong focus on user experience and a highly responsive UI across every role in the system.",
    features: [
      {
        group: "Candidate",
        items: [
          "Can see which vacancies are active and urgent",
          "Can filter by position and department",
          "Can submit an application for each vacancy",
        ],
      },
      {
        group: "Junior-HR",
        items: [
          "Can add positions and interviews",
          "Can download CVs and reports",
          "Can view the dashboard and mail inbox",
        ],
      },
      {
        group: "Senior-HR",
        items: [
          "Everything Junior-HR can do",
          "Can change candidate selections and send interview/offer emails",
          "Can employ candidates and recall failed, rejected, or cancelled candidates",
        ],
      },
      {
        group: "Admin",
        items: [
          "Everything Senior-HR can do",
          "Can add or deactivate users and change roles (except other admins)",
          "Can add/edit departments and set interview status",
        ],
      },
      {
        group: "Default-Admin",
        items: ["Everything Admin can do, plus can deactivate other admins"],
      },
      {
        group: "Interviewer / Department-Head",
        items: [
          "Can give candidate reviews and set interview status",
          "Can view the department dashboard and employee list",
        ],
      },
    ],
    journeyId: "java-ojt",
    achievement: "Project Winner",
    link: null,
  },
  {
    slug: "aqme-insurance",
    title: "Insurance System — AQME",
    team: "Ace Data Systems",
    period: "Joined January 2024 – November 2024",
    stack: [
      "Next.js",
      "Node.js",
      "Express.js",
      "Zustand",
      "TypeScript",
      "Redis",
      "Docker",
      "PostgreSQL",
      "Strapi",
      "Tailwind CSS",
    ],
    summary:
      "A mobile-first insurance system for Ace Data Systems — my first professional React/Next.js work, built from Figma prototypes.",
    overview:
      "An insurance platform built mobile-first from Figma prototypes, with real-time data pulled through integrated APIs.",
    contribution:
      "I developed and implemented the responsive UI from Figma, integrated API calls for real-time data, optimized components for performance and accessibility, and ensured a seamless experience across mobile devices.",
    journeyId: "ace-data-systems",
    link: null,
  },
  {
    slug: "axurance-insurance",
    title: "Insurance System — AXURANCE",
    team: "D3-SG",
    period: "Started January 2025",
    stack: [
      "Next.js",
      "Node.js",
      "Express.js",
      "Zustand",
      "TypeScript",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    summary:
      "The insurance platform I currently build at D3-SG — a responsive, mobile-first UI with real-time API-driven data.",
    overview:
      "AXURANCE is a responsive, mobile-first insurance platform built from Figma prototypes, currently in active development.",
    contribution:
      "I design and develop the mobile-first UI, integrate APIs for real-time data, collaborate with backend developers on API requirements, and handle cross-device compatibility testing and debugging.",
    journeyId: "d3-sg",
    link: null,
  },
  {
    slug: "agb-fiber-crm",
    title: "AGB Fiber Internet Tachileik (CRM)",
    team: null,
    period: "November 2025 – December 2025",
    stack: ["Java", "Spring Boot", "Thymeleaf", "HTML", "CSS", "JavaScript", "Tailwind CSS"],
    summary:
      "A CRM system for AGB Fiber Internet — my first full-stack contribution, spanning both backend and UI.",
    overview: "A CRM system built for AGB Fiber Internet Tachileik.",
    contribution:
      "A full-stack contribution — not just the frontend. I built the backend with Java and Spring Boot (rendered via Thymeleaf) and designed and implemented the UI with HTML, CSS, JavaScript, and Tailwind CSS.",
    journeyId: "d3-sg",
    link: null,
  },
];

export const data = {
  name: "Ye Yint Myint Myat",
  role: "Frontend Engineer",
  email: "yeyintmyintmyat.dev@gmail.com",
  phone: "+959 900 000 000",
  address: "Ho Chi Minh City, Vietnam",
  objective:
    "A Frontend Engineer with hands-on experience building responsive, user-focused web interfaces using React.js and Next.js since January 2024. Skilled at solving problems and collaborating within teams, with a passion for crafting clean, performant user experiences and a growing interest in extending that skill set to React Native for cross-platform mobile development.",

  education: {
    major: "Information Technology",
    school: "Van Lang Saigon College",
    period: "October 2025 – Current",
  },

  skills: [
    {
      label: "⚡ Languages",
      tags: ["Java", "JavaScript", "TypeScript"],
    },
    {
      label: "🎨 Frontend",
      tags: [
        "HTML",
        "CSS",
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "Bootstrap",
        "JQuery",
        "JSP",
      ],
    },
    {
      label: "🔧 Backend",
      tags: ["Node.js", "Express.js", "Servlet", "Java"],
    },
    {
      label: "🏗️ Frameworks",
      tags: [
        "Spring Boot",
        "Spring Data JPA",
        "Zustand",
        "Redux Toolkit",
        "Thymeleaf",
        "JUnit",
      ],
    },
    {
      label: "🗄️ Database & Infra",
      tags: ["MySQL", "MongoDB", "PostgreSQL", "Redis", "Docker", "Strapi"],
    },
    {
      label: "🛠️ Tools",
      tags: ["Figma", "Postman", "VS Code", "IntelliJ", "Eclipse"],
    },
  ],

  journey,
  projects,

  certifications: [
    {
      icon: "📘",
      name: "Programming Fundamental Course",
      org: "ACE Inspiration",
    },
    { icon: "☕", name: "Java Web Development", org: "ACE Inspiration" },
    { icon: "☕", name: "On Job Training — Java", org: "ACE Inspiration" },
    { icon: "⚛️", name: "On Job Training — React JS", org: "Ace Data Systems" },
  ],
};

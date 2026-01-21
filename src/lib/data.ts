export type Student = {
  id: string;
  name: string;
  email: string;
  course: string;
  year: number;
  avatar: string;
  resumeScore: number;
  resumeText: string;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  description: string;
  location: string;
  type: 'Full-time' | 'Internship';
  salary: string;
};

export type Application = {
  id: string;
  job: Job;
  student: Student;
  status: 'Applied' | 'Interviewing' | 'Offered' | 'Rejected';
  appliedDate: string;
};

export type Company = {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
};

export const students: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.j@university.edu',
    course: 'Computer Science',
    year: 4,
    avatar: 'https://picsum.photos/seed/101/100/100',
    resumeScore: 88,
    resumeText: `Alex Johnson
alex.j@university.edu | (123) 456-7890 | linkedin.com/in/alexjohnson

Education
B.S. in Computer Science, State University (Expected Graduation: May 2024)
GPA: 3.8/4.0

Skills
- Programming Languages: Python, Java, JavaScript, C++
- Web Technologies: React, Node.js, HTML, CSS, Express
- Databases: MongoDB, SQL
- Tools: Git, Docker, Jenkins

Projects
- AI-Powered Chatbot: Developed a customer service chatbot using NLP.
- E-commerce Website: Built a full-stack e-commerce platform with React and Node.js.

Experience
- Software Engineer Intern, Tech Solutions Inc. (Summer 2023)
  - Contributed to the development of a new web application.
  - Wrote and tested code, fixed bugs, and collaborated with the team.`,
  },
  {
    id: '2',
    name: 'Brenda Smith',
    email: 'brenda.s@university.edu',
    course: 'Mechanical Engineering',
    year: 4,
    avatar: 'https://picsum.photos/seed/102/100/100',
    resumeScore: 92,
    resumeText: `Brenda Smith
brenda.s@university.edu | (123) 555-4321 | linkedin.com/in/brendasmith

Education
B.S. in Mechanical Engineering, State University (Expected Graduation: May 2024)
GPA: 3.9/4.0

Skills
- CAD Software: SolidWorks, AutoCAD
- Simulation: ANSYS, MATLAB
- Programming: Python, C
- Prototyping: 3D Printing, CNC Machining

Projects
- Robotic Arm Design: Designed and built a 5-axis robotic arm for a competition.
- Aerodynamic Analysis of a Drone: Performed simulations to optimize drone performance.

Experience
- Mechanical Engineer Intern, Innovate Dynamics (Summer 2023)
  - Assisted in the design and testing of new product components.
  - Created detailed technical drawings and documentation.`,
  },
  // Add more students
];

export const companies: Company[] = [
  { id: '1', name: 'Innovate Tech', logo: 'https://picsum.photos/seed/201/100/100', website: 'innovate.tech', description: 'A leading firm in AI and machine learning solutions.' },
  { id: '2', name: 'QuantumLeap', logo: 'https://picsum.photos/seed/202/100/100', website: 'quantumleap.com', description: 'Pioneering the future of quantum computing.' },
  { id: '3', name: 'DataScout', logo: 'https://picsum.photos/seed/203/100/100', website: 'datascout.ai', description: 'Big data analytics and business intelligence services.' },
  { id: '4', name: 'Nexus Robotics', logo: 'https://picsum.photos/seed/204/100/100', website: 'nexusrobotics.com', description: 'Building the next generation of autonomous systems.' },
];

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Innovate Tech',
    companyLogo: 'https://picsum.photos/seed/201/100/100',
    description: 'Join our team to build next-gen AI platforms. Strong skills in Python and cloud services required.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
  },
  {
    id: '2',
    title: 'Frontend Developer (React)',
    company: 'QuantumLeap',
    companyLogo: 'https://picsum.photos/seed/202/100/100',
    description: 'We are looking for a React developer to create stunning user interfaces for our quantum computing platform.',
    location: 'Remote',
    type: 'Full-time',
    salary: '$110,000 - $140,000',
  },
  {
    id: '3',
    title: 'Data Analyst Intern',
    company: 'DataScout',
    companyLogo: 'https://picsum.photos/seed/203/100/100',
    description: 'An exciting internship opportunity for students passionate about data analysis and visualization.',
    location: 'New York, NY',
    type: 'Internship',
    salary: '$30/hour',
  },
  {
    id: '4',
    title: 'Mechanical Design Engineer',
    company: 'Nexus Robotics',
    companyLogo: 'https://picsum.photos/seed/204/100/100',
    description: 'Design and develop cutting-edge robotic systems. Proficiency in SolidWorks and simulation tools is a must.',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$90,000 - $115,000',
  },
];

export const applications: Application[] = [
  {
    id: '1',
    job: jobs[0],
    student: students[0],
    status: 'Interviewing',
    appliedDate: '2024-05-10',
  },
  {
    id: '2',
    job: jobs[2],
    student: students[0],
    status: 'Applied',
    appliedDate: '2024-05-15',
  },
  {
    id: '3',
    job: jobs[3],
    student: students[1],
    status: 'Offered',
    appliedDate: '2024-05-01',
  },
];

import { db } from '@/db';
import { careerPaths } from '@/db/schema';

async function main() {
    const sampleCareerPaths = [
        {
            title: 'Software Engineer',
            description: 'Designs, develops, and maintains software applications. Focuses on writing efficient, scalable, and reliable code. Involved in the full software development lifecycle, from concept to deployment.',
            requirements: ['Bachelor\'s degree in CS or related', '2+ years programming experience', 'Strong problem-solving skills', 'Understanding of data structures and algorithms'],
            salaryRange: '$70,000 - $150,000',
            skillsNeeded: ['JavaScript', 'Python', 'Java', 'C++', 'Git', 'Algorithms', 'System Design', 'Testing'],
            createdAt: new Date('2024-03-01T10:00:00Z').toISOString(),
        },
        {
            title: 'Data Scientist',
            description: 'Analyzes complex data sets to extract insights and build predictive models. Utilizes statistical methods, machine learning, and programming to solve business problems and inform strategic decisions.',
            requirements: ['Master\'s or PhD in Statistics/Math/CS or related', 'Proficiency in Python/R', 'Strong machine learning knowledge', 'Experience with data manipulation and analysis'],
            salaryRange: '$80,000 - $160,000',
            skillsNeeded: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization', 'Big Data Technologies', 'Communication'],
            createdAt: new Date('2024-03-01T11:00:00Z').toISOString(),
        },
        {
            title: 'DevOps Engineer',
            description: 'Bridges the gap between software development and operations. Focuses on automating the software delivery process, managing infrastructure, and ensuring systems are stable and scalable.',
            requirements: ['Strong Linux/Unix experience', 'Knowledge of cloud platforms (AWS, Azure, GCP)', 'Containerization and orchestration skills', 'Experience with CI/CD pipelines'],
            salaryRange: '$75,000 - $140,000',
            skillsNeeded: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD', 'Jenkins', 'Terraform', 'Ansible', 'Monitoring'],
            createdAt: new Date('2024-03-01T12:00:00Z').toISOString(),
        },
        {
            title: 'Full-Stack Developer',
            description: 'Works on both the frontend (user interface) and backend (server-side logic and database) of web applications. Requires versatility in different programming languages and frameworks.',
            requirements: ['Extensive web development experience', 'Proficiency in frontend and backend technologies', 'Database design and management knowledge', 'Ability to work across the stack'],
            salaryRange: '$65,000 - $130,000',
            skillsNeeded: ['React', 'Angular', 'Vue.js', 'Node.js', 'Python/Django', 'Ruby on Rails', 'SQL', 'NoSQL', 'RESTful APIs', 'HTML/CSS'],
            createdAt: new Date('2024-03-01T13:00:00Z').toISOString(),
        },
        {
            title: 'Backend Developer',
            description: 'Focuses on the server-side logic, databases, APIs, and overall infrastructure that powers web and mobile applications. Ensures robust, scalable, and secure system functionality.',
            requirements: ['Strong programming skills (e.g., Python, Java, Node.js)', 'Database expertise (SQL/NoSQL)', 'API development and integration experience', 'Understanding of server architectures'],
            salaryRange: '$60,000 - $125,000',
            skillsNeeded: ['Node.js', 'Python', 'Java', 'SQL', 'MongoDB', 'REST APIs', 'Microservices', 'Authentication', 'Security'],
            createdAt: new Date('2024-03-01T14:00:00Z').toISOString(),
        },
        {
            title: 'Frontend Developer',
            description: 'Builds and maintains the user-facing part of websites and web applications. Responsible for implementing visual and interactive elements that users directly interact with.',
            requirements: ['Proficiency in HTML, CSS, JavaScript', 'Experience with modern JavaScript frameworks (React, Angular, Vue)', 'Understanding of responsive design principles', 'Knowledge of UI/UX best practices'],
            salaryRange: '$55,000 - $110,000',
            skillsNeeded: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js', 'Angular', 'TypeScript', 'Webpack', 'Accessibility', 'Responsive Design'],
            createdAt: new Date('2024-03-01T15:00:00Z').toISOString(),
        },
        {
            title: 'Machine Learning Engineer',
            description: 'Designs, builds, and deploys machine learning models into production systems. Combines strong software engineering skills with deep knowledge of machine learning algorithms and MLOps practices.',
            requirements: ['Strong programming skills (Python)', 'Solid understanding of ML algorithms', 'Experience with ML frameworks (TensorFlow, PyTorch)', 'Data handling and feature engineering'],
            salaryRange: '$90,000 - $170,000',
            skillsNeeded: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Numpy', 'Pandas', 'MLOps', 'Data Engineering', 'Cloud Platforms', 'Jupyter Notebooks'],
            createdAt: new Date('2024-03-01T16:00:00Z').toISOString(),
        },
        {
            title: 'Product Manager',
            description: 'Defines the "what" and "why" of product development. Responsible for product strategy, roadmap, and requirements, ensuring the product meets market needs and business goals. Acts as a liaison between business, design, and engineering teams.',
            requirements: ['Experience in product management or related roles', 'Strong communication and leadership skills', 'Understanding of software development lifecycle', 'Market research and competitive analysis abilities'],
            salaryRange: '$85,000 - $165,000',
            skillsNeeded: ['Market Research', 'Roadmapping', 'User Stories', 'Agile Methodologies', 'Data Analysis', 'Communication', 'Leadership', 'UX Principles', 'Jira', 'Figma'],
            createdAt: new Date('2024-03-01T17:00:00Z').toISOString(),
        },
        {
            title: 'Cybersecurity Analyst',
            description: 'Protects computer systems, networks, and data from security threats. Monitors for breaches, implements security measures, and responds to security incidents to safeguard sensitive information.',
            requirements: ['Knowledge of networking protocols', 'Understanding of cybersecurity principles', 'Experience with security tools and technologies', 'Certifications (e.g., CompTIA Security+, CISSP preferred)'],
            salaryRange: '$70,000 - $130,000',
            skillsNeeded: ['Network Security', 'Incident Response', 'Vulnerability Assessment', 'Penetration Testing', 'Firewalls', 'SIEM', 'Encryption', 'Compliance', 'Linux'],
            createdAt: new Date('2024-03-02T09:00:00Z').toISOString(),
        },
        {
            title: 'Cloud Architect',
            description: 'Designs and implements cloud infrastructure solutions. Responsible for developing cloud strategies, planning migrations, and optimizing cloud environments for performance, cost, and security.',
            requirements: ['Extensive experience with cloud platforms (AWS, Azure, GCP)', 'Strong understanding of distributed systems', 'Experience with infrastructure as code (IaC)', 'Solution design and architecture skills'],
            salaryRange: '$100,000 - $200,000',
            skillsNeeded: ['AWS', 'Azure', 'GCP', 'Terraform', 'CloudFormation', 'Kubernetes', 'Serverless', 'Networking', 'Security Architecture', 'Cost Optimization'],
            createdAt: new Date('2024-03-02T10:00:00Z').toISOString(),
        },
    ];

    await db.insert(careerPaths).values(sampleCareerPaths);

    console.log('✅ CareerPaths seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});
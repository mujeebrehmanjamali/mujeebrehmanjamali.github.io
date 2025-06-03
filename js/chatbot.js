// AI Chatbot Assistant for Dr. Mujeeb ur Rehman Jamali Portfolio

class PortfolioChatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.knowledgeBase = this.initializeKnowledgeBase();
        this.init();
    }

    initializeKnowledgeBase() {
        return {
            personal: {
                name: "Dr. Mujeeb ur Rehman Jamali",
                title: "Researcher & Data Scientist",
                currentPosition: "Lecturer at Government College University Hyderabad",
                email: "mujeeb.jamali@gcuh.edu.pk",
                phone: "+92 336 1365002",
                orcid: "0009-0003-8746-8692"
            },
            education: {
                phd: "Ph.D in Computer Science (2015-2022) from University of Sindh Jamshoro, Pakistan"
            },
            experience: [
                {
                    position: "Lecturer",
                    organization: "Government College University Hyderabad",
                    period: "Current",
                    description: "Leading research in machine learning and data science, teaching graduate courses"
                },
                {
                    position: "Assistant Professor",
                    organization: "Emaan Institute of Management and Sciences, Karachi",
                    period: "January 2024 - Previous",
                    description: "Curriculum development and research supervision"
                },
                {
                    position: "Senior Data Processing Officer",
                    organization: "University of Sindh",
                    period: "October 2009 - March 2023",
                    description: "Large-scale data processing and management systems"
                }
            ],
            research: [
                "Machine Learning and Artificial Intelligence",
                "Cloud Computing and Big Data Systems",
                "Cybersecurity and Cryptography",
                "Non-Relational Database Systems",
                "Android Development",
                "Natural Language Processing",
                "Blockchain Technology"
            ],
            publications: [
                "Architectural Design for Data Security in Cloud-based Big Data Systems (2024)",
                "RSS Feeds Filtering using Natural Language Processing (2024)",
                "Data Integrity Algorithm Performance in Non-Relational Databases (2023)",
                "User-Centric Context-Aware Location-Based Service for ATMs (2023)",
                "Blockchain Technology Performance of Asymmetric Algorithms (2023)"
            ],
            skills: [
                "Python", "Java", "JavaScript", "Machine Learning", "Deep Learning",
                "Cloud Computing", "Cybersecurity", "Big Data Analytics", "Android Development"
            ],
            profiles: {
                orcid: "https://orcid.org/0009-0003-8746-8692",
                googleScholar: "https://scholar.google.com/citations?user=5APZ-gEAAAAJ",
                researchGate: "https://www.researchgate.net/profile/Mujeeb-Ur-Rehman-Jamali",
                academia: "https://independent.academia.edu/MujeebJamali1",
                facebook: "https://www.facebook.com/share/19UpnriJzF/",
                linkedin: "https://www.linkedin.com/feed/",
                twitter: "https://twitter.com/placeholder"
            }
        };
    }

    init() {
        this.createChatbotHTML();
        this.attachEventListeners();
        this.addWelcomeMessage();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div id="chatbot-container" class="chatbot-container">
                <div id="chatbot-toggle" class="chatbot-toggle">
                    <i class="fas fa-comments"></i>
                    <span class="chatbot-badge">AI Assistant</span>
                </div>
                
                <div id="chatbot-window" class="chatbot-window">
                    <div class="chatbot-header">
                        <div class="chatbot-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="chatbot-info">
                            <h4>Dr. Jamali's AI Assistant</h4>
                            <span class="chatbot-status">Online</span>
                        </div>
                        <button id="chatbot-close" class="chatbot-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div id="chatbot-messages" class="chatbot-messages">
                        <!-- Messages will be added here -->
                    </div>
                    
                    <div class="chatbot-quick-actions">
                        <button class="quick-action-btn" data-action="research">Research Areas</button>
                        <button class="quick-action-btn" data-action="publications">Publications</button>
                        <button class="quick-action-btn" data-action="contact">Contact Info</button>
                        <button class="quick-action-btn" data-action="cv">Download CV</button>
                    </div>
                    
                    <div class="chatbot-input-container">
                        <input type="text" id="chatbot-input" placeholder="Ask me about Dr. Jamali's research, experience, or expertise..." maxlength="500">
                        <button id="chatbot-send" class="chatbot-send">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('chatbot-close');
        const send = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');
        const quickActions = document.querySelectorAll('.quick-action-btn');

        toggle.addEventListener('click', () => this.toggleChatbot());
        close.addEventListener('click', () => this.closeChatbot());
        send.addEventListener('click', () => this.sendMessage());
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        quickActions.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                this.handleQuickAction(action);
            });
        });
    }

    toggleChatbot() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbot-window');
        const toggle = document.getElementById('chatbot-toggle');
        
        if (this.isOpen) {
            window.classList.add('active');
            toggle.classList.add('active');
        } else {
            window.classList.remove('active');
            toggle.classList.remove('active');
        }
    }

    closeChatbot() {
        this.isOpen = false;
        document.getElementById('chatbot-window').classList.remove('active');
        document.getElementById('chatbot-toggle').classList.remove('active');
    }

    addWelcomeMessage() {
        const welcomeMessage = `
            👋 Hello! I'm Dr. Mujeeb ur Rehman Jamali's AI assistant. 
            
            I can help you learn about:
            • Research areas and expertise
            • Publications and academic work
            • Professional experience
            • Contact information
            • Technical skills and projects
            
            Feel free to ask me anything or use the quick action buttons below!
        `;
        
        this.addMessage(welcomeMessage, 'bot');
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Process message and respond
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.processMessage(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000); // Random delay for realism
    }

    processMessage(message) {
        const lowerMessage = message.toLowerCase();

        // First try advanced query processing
        const advancedResponse = this.processAdvancedQuery(message);
        if (advancedResponse) {
            return advancedResponse;
        }

        // Research-related queries
        if (lowerMessage.includes('research') || lowerMessage.includes('expertise')) {
            return this.getResearchInfo();
        }

        // Publications
        if (lowerMessage.includes('publication') || lowerMessage.includes('paper') || lowerMessage.includes('article')) {
            return this.getPublicationsInfo();
        }

        // Experience
        if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
            return this.getExperienceInfo();
        }

        // Education
        if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('phd')) {
            return this.getEducationInfo();
        }

        // Contact
        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
            return this.getContactInfo();
        }

        // Skills
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('programming')) {
            return this.getSkillsInfo();
        }

        // CV/Resume
        if (lowerMessage.includes('cv') || lowerMessage.includes('resume')) {
            return this.getCVInfo();
        }

        // Profiles
        if (lowerMessage.includes('profile') || lowerMessage.includes('orcid') || lowerMessage.includes('scholar')) {
            return this.getProfilesInfo();
        }

        // Greetings
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "👋 Hello! I'm Dr. Jamali's AI assistant. I'm here to help you learn about his research in machine learning, cybersecurity, cloud computing, and data science. What would you like to know?";
        }

        // Thanks
        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return "You're very welcome! I'm glad I could help you learn more about Dr. Jamali's work. Feel free to ask if you have any other questions about his research or expertise! 😊";
        }

        // Default response
        return this.getDefaultResponse();
    }

    getResearchInfo() {
        const research = this.knowledgeBase.research;
        return `🔬 Dr. Jamali's research expertise includes:\n\n${research.map(area => `• ${area}`).join('\n')}\n\nHis work focuses particularly on the intersection of machine learning, cloud computing, and cybersecurity. Would you like to know more about any specific research area?`;
    }

    getPublicationsInfo() {
        const publications = this.knowledgeBase.publications.slice(0, 3);
        return `📚 Recent publications by Dr. Jamali:\n\n${publications.map(pub => `• ${pub}`).join('\n')}\n\n...and many more! You can find his complete publication list on his research profiles. Would you like the links to his academic profiles?`;
    }

    getExperienceInfo() {
        const experience = this.knowledgeBase.experience;
        return `💼 Dr. Jamali's professional experience:\n\n${experience.map(exp => `• ${exp.position} at ${exp.organization} (${exp.period})`).join('\n')}\n\nHe has over 14 years of experience in academia and data science. Would you like more details about any specific position?`;
    }

    getEducationInfo() {
        return `🎓 Education:\n\n• ${this.knowledgeBase.education.phd}\n\nDr. Jamali completed his doctoral research in computer science with a focus on advanced computing technologies and data systems.`;
    }

    getContactInfo() {
        const contact = this.knowledgeBase.personal;
        return `📞 Contact Information:\n\n• Email: ${contact.email}\n• Phone: ${contact.phone}\n• Institution: ${contact.currentPosition}\n\nYou can also reach out through the contact form on this website or connect via his research profiles!`;
    }

    getSkillsInfo() {
        const skills = this.knowledgeBase.skills;
        return `💻 Technical Skills:\n\n${skills.map(skill => `• ${skill}`).join('\n')}\n\nDr. Jamali combines theoretical knowledge with practical implementation skills across multiple domains.`;
    }

    getCVInfo() {
        return `📄 You can view and download Dr. Jamali's complete CV from the Resume section of this website. The CV includes detailed information about his education, experience, publications, and research contributions.\n\nWould you like me to direct you to the resume section?`;
    }

    getProfilesInfo() {
        const profiles = this.knowledgeBase.profiles;
        return `🌐 Research & Social Profiles:\n\n📚 Academic Profiles:\n• ORCID: ${profiles.orcid}\n• Google Scholar: ${profiles.googleScholar}\n• ResearchGate: ${profiles.researchGate}\n• Academia.edu: ${profiles.academia}\n\n📱 Social Media:\n• Facebook: ${profiles.facebook}\n• LinkedIn: ${profiles.linkedin}\n• Twitter: ${profiles.twitter}\n\nThese profiles contain his complete academic record, research contributions, and professional updates.`;
    }

    getDefaultResponse() {
        const responses = [
            "I'd be happy to help you learn more about Dr. Jamali! You can ask me about his research, publications, experience, or contact information.",
            "That's an interesting question! I can provide information about Dr. Jamali's research areas, academic background, or professional experience. What would you like to know?",
            "I'm here to help you discover more about Dr. Jamali's expertise in machine learning, cybersecurity, and data science. What specific aspect interests you?",
            "Feel free to ask me about Dr. Jamali's publications, research projects, or professional background. I'm here to assist!",
            "I can help you explore Dr. Jamali's work in cloud computing, big data systems, and artificial intelligence. What would you like to learn about?",
            "Dr. Jamali has extensive experience in both academia and industry. I can share details about his research contributions, teaching experience, or technical expertise. What interests you most?"
        ];

        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Enhanced message processing with better AI-like responses
    processAdvancedQuery(message) {
        const lowerMessage = message.toLowerCase();

        // Machine Learning specific
        if (lowerMessage.includes('machine learning') || lowerMessage.includes('ml') || lowerMessage.includes('ai')) {
            return "🤖 Dr. Jamali is an expert in Machine Learning and AI! His work includes:\n\n• Deep Learning and Neural Networks\n• Predictive Modeling and Data Analysis\n• AI applications in cybersecurity\n• Machine learning for big data systems\n\nHe has published several papers on ML applications in cloud computing and data security. Would you like to know about any specific ML project or publication?";
        }

        // Cloud Computing specific
        if (lowerMessage.includes('cloud') || lowerMessage.includes('big data')) {
            return "☁️ Dr. Jamali's cloud computing expertise is impressive! He specializes in:\n\n• Cloud-based Big Data Systems\n• Data Security in Cloud Environments\n• Distributed Computing Architectures\n• Cloud Performance Optimization\n\nHis recent publication 'Architectural Design for Data Security in Cloud-based Big Data Systems' (2024) is particularly noteworthy. Want to learn more about his cloud research?";
        }

        // Cybersecurity specific
        if (lowerMessage.includes('security') || lowerMessage.includes('crypto') || lowerMessage.includes('blockchain')) {
            return "🔒 Cybersecurity is one of Dr. Jamali's core strengths! His expertise covers:\n\n• Cryptographic Algorithms (Symmetric & Asymmetric)\n• Blockchain Technology Performance\n• Data Integrity and Protection\n• Authentication Systems\n• E-commerce Security\n\nHe has conducted empirical studies on blockchain performance and authentication challenges. Interested in any specific security topic?";
        }

        // Database specific
        if (lowerMessage.includes('database') || lowerMessage.includes('nosql')) {
            return "🗄️ Dr. Jamali has significant expertise in database systems, particularly:\n\n• Non-Relational Document-Oriented Databases\n• Data Integrity Algorithms\n• Database Performance Evaluation\n• NoSQL Systems\n• Data Management in Cloud Environments\n\nHis research on data integrity in non-relational databases has been published in peer-reviewed journals. Want to know more about his database research?";
        }

        // Teaching/Academic
        if (lowerMessage.includes('teach') || lowerMessage.includes('student') || lowerMessage.includes('course')) {
            return "👨‍🏫 As a Lecturer at Government College University Hyderabad, Dr. Jamali:\n\n• Teaches graduate and undergraduate computer science courses\n• Supervises student research projects and thesis work\n• Mentors students in advanced computing topics\n• Develops innovative curriculum for emerging technologies\n\nHe combines theoretical knowledge with practical industry experience to provide comprehensive education. Are you interested in his teaching philosophy or specific courses?";
        }

        return null; // Return null if no advanced match found
    }

    handleQuickAction(action) {
        let response = '';
        
        switch(action) {
            case 'research':
                response = this.getResearchInfo();
                break;
            case 'publications':
                response = this.getPublicationsInfo();
                break;
            case 'contact':
                response = this.getContactInfo();
                break;
            case 'cv':
                response = this.getCVInfo();
                break;
        }
        
        this.addMessage(response, 'bot');
    }

    addMessage(message, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;
        
        const avatar = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <div class="message-text">${message.replace(/\n/g, '<br>')}</div>
                <div class="message-time">${timestamp}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add animation
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 100);
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'typing-indicator';
        indicator.className = 'chatbot-message bot-message typing-indicator';
        indicator.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        document.getElementById('chatbot-messages').appendChild(indicator);
        document.getElementById('chatbot-messages').scrollTop = document.getElementById('chatbot-messages').scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new PortfolioChatbot();
});

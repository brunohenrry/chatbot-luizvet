const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector("#send-btn");

const inputInitHeight = chatInput.scrollHeight;
let unknownCount = 0; // Contador de mensagens não compreendidas consecutivas

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    const chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes("horário") || lowerCaseMessage.includes("atendimento")) {
        return "A LuizVet atende das 7h às 19h, todos os dias da semana.";
    } else if (lowerCaseMessage.includes("nome") || lowerCaseMessage.includes("empresa")) {
        return "Bem-vindo à LuizVet! Como posso ajudar você hoje?";
    } else if (lowerCaseMessage.includes("website") || lowerCaseMessage.includes("site")) {
        return "Você pode acessar nosso website em www.luizvet.com para obter mais informações.";
    } else if (lowerCaseMessage.includes("whatsapp") || lowerCaseMessage.includes("zap") || lowerCaseMessage.includes("número")) {
        return "Você pode entrar em contato conosco pelo WhatsApp no <a href='https://api.whatsapp.com/send?phone=5516991220545' target='_blank'>link aqui</a>.";
    } else if (lowerCaseMessage.includes("instagram") || lowerCaseMessage.includes("insta") || lowerCaseMessage.includes("ig")) {
        return "Siga-nos no Instagram em @obstluiz para ficar por dentro das novidades!";
    } else if (lowerCaseMessage.includes("faz") || lowerCaseMessage.includes("serviços")) {
        return "A LuizVet oferece serviços de atendimento veterinário a domicílio, consultas, exames e muito mais. Como posso ajudar você hoje?";
    } else if (lowerCaseMessage.includes("ajuda") || lowerCaseMessage.includes("help")) {
        return `Bem-vindo ao chat da LuizVet! Aqui estão algumas dicas para você:
- Pergunte sobre horários de atendimento e serviços. Exemplo: "Qual é o horário de atendimento?"
- Peça informações sobre o nosso website, WhatsApp ou Instagram. Exemplo: "Qual é o site da LuizVet?"
- Digite "Ajuda" a qualquer momento para ver essas instruções novamente.
- Se eu não entender sua pergunta, tentarei ajudá-lo de qualquer maneira.
`;
    } else {
        unknownCount++;
        if (unknownCount === 2) {
            unknownCount = 0;
            return `Peço desculpas, mas não consegui entender sua pergunta duas vezes seguidas. Digite "ajuda" para ver as instruções novamente ou entre em contato com o veterinário no número <a href='https://api.whatsapp.com/send?phone=5516991220545' target='_blank'>link aqui</a> para assistência personalizada.`;
        } else {
            return "Desculpe, não compreendi sua pergunta. Por favor, pergunte sobre os horários de atendimento da LuizVet, informações do website, serviços oferecidos ou qualquer outra dúvida.";
        }
    }
}

const typeMessage = (message) => {
    const responseLi = createChatLi("", "incoming");
    chatbox.appendChild(responseLi);

    const typingSpeed = 10; // Velocidade da animação de digitação (em milissegundos)

    let i = 0;
    const typingInterval = setInterval(() => {
        if (i <= message.length) {
            responseLi.querySelector("p").innerHTML = message.substr(0, i);
            i++;
            chatbox.scrollTo(0, chatbox.scrollHeight);
        } else {
            clearInterval(typingInterval);
        }
    }, typingSpeed);
}

const handleChat = () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const response = generateResponse(userMessage);
        typeMessage(response);
    }, 600);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

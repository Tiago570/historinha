// Mapeamento dos backgrounds para cada etapa
const backgrounds = {
    initial: "url('https://images2.alphacoders.com/131/thumb-1920-1311163.png')",
    muralha: "url('https://images5.alphacoders.com/505/thumbbig-505623.webp')",
    combate: "url('https://images7.alphacoders.com/656/thumbbig-656796.webp')",
    ataque: "url('https://images5.alphacoders.com/135/thumb-1920-1353799.jpeg')",
    fuga: "url('https://images7.alphacoders.com/121/thumbbig-1214527.webp')",
    manobra: "url('images/manobra3d.png')",
    canhao: "url('images/canhao.png')",
    fim1: "url('https://images3.alphacoders.com/111/thumb-1920-1113796.jpg')",
    fim2: "url('https://images7.alphacoders.com/112/thumb-1920-1123785.jpg')",
    fim3: "url('https://images5.alphacoders.com/121/thumb-1920-1213796.jpg')",
    fim4: "url('https://images3.alphacoders.com/122/thumb-1920-1223796.jpg')",
    fim5: "url('https://images.alphacoders.com/final-dificil.jpg')"
};

// Função principal para gerenciar as escolhas do jogador
function choose(choice) {
    const narrative = document.getElementById('narrative');
    const choicesContainer = document.getElementById('choices');

    switch (choice) {
        case 'choice1': // Caminho inicial - Ir para a muralha
            changeBackground('muralha');
            narrative.innerText = "Você corre para a muralha e vê os titãs se aproximando. O que fazer?";
            updateChoices([
                { text: "Atacar com coragem.", action: "choice1-1" },
                { text: "Observar e planejar.", action: "choice1-2" }
            ]);
            break;

        case 'choice1-1': // Atacar os titãs diretamente
            changeBackground('ataque');
            narrative.innerText = "Você avança contra os titãs, mas eles são muitos. Como agir?";
            updateChoices([
                { text: "Recuar para um ponto mais alto.", action: "choice1-1-1" },
                { text: "Atacar o líder dos titãs.", action: "choice1-1-2" }
            ]);
            break;

        case 'choice1-1-1': // Recuar
            changeBackground('fuga');
            narrative.innerText = "Você tenta recuar, mas os titãs continuam te cercando. O que fazer?";
            updateChoices([
                { text: "Procurar reforços.", action: "choice1-1-1-1" },
                { text: "Tentar lutar sozinho.", action: "end1" }
            ]);
            break;

        case 'choice1-1-2': // Atacar o líder dos titãs
            changeBackground('manobra');
            narrative.innerText = "Você usa o equipamento de manobra para atacar o líder. Qual será sua próxima ação?";
            updateChoices([
                { text: "Focar no líder.", action: "end2" },
                { text: "Tentar ajudar outros soldados.", action: "end3" }
            ]);
            break;

        case 'choice1-2': // Observar e planejar
            changeBackground('combate');
            narrative.innerText = "Você decide planejar melhor. O que fazer agora?";
            updateChoices([
                { text: "Buscar armas mais poderosas.", action: "choice1-2-1" },
                { text: "Montar uma defesa organizada.", action: "end4" }
            ]);
            break;

        case 'choice1-2-1': // Buscar armas mais poderosas
            changeBackground('canhao');
            narrative.innerText = "Você encontra um canhão. Vai usar para atacar ou recuar?";
            updateChoices([
                { text: "Usar o canhão para atacar.", action: "end5" },
                { text: "Recuar para se reagrupar.", action: "choice1-2-1-1" }
            ]);
            break;

        case 'choice1-2-1-1': // Recuar
            changeBackground('fuga');
            narrative.innerText = "Você decide recuar. Agora, qual será sua próxima ação?";
            updateChoices([
                { text: "Procurar ajuda.", action: "end3" },
                { text: "Fugir para outra área.", action: "end2" }
            ]);
            break;

        default: // Finais
            handleEnding(choice);
            break;
    }
}

// Função para alterar o background
function changeBackground(key) {
    if (backgrounds[key]) {
        document.body.style.backgroundImage = backgrounds[key];
    } else {
        console.error(`Background '${key}' não encontrado.`);
    }
}

// Função para atualizar as escolhas do jogador
function updateChoices(choices) {
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = ''; // Limpa escolhas antigas
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.onclick = () => choose(choice.action);
        choicesContainer.appendChild(button);
    });
}

// Função para lidar com os finais
function handleEnding(choice) {
    const endings = {
        end1: { text: "Você lutou bravamente, mas foi derrotado. Fim: Sacrifício Heróico.", background: "fim1" },
        end2: { text: "Você escapou, mas perdeu a cidade. Fim: Sobrevivente Culpado.", background: "fim2" },
        end3: { text: "Você conseguiu salvar outros soldados. Fim: Líder Estratégico.", background: "fim3" },
        end4: { text: "Você montou uma defesa bem-sucedida. Fim: Defensor Corajoso.", background: "fim4" },
        end5: { text: "Você destruiu o titã líder. Fim: Vitória Gloriosa.", background: "fim5" }
    };

    const ending = endings[choice];
    if (ending) {
        changeBackground(ending.background);
        const narrative = document.getElementById('narrative');
        narrative.innerText = ending.text;

        // Remove os botões, já que é o fim
        const choicesContainer = document.getElementById('choices');
        choicesContainer.innerHTML = '';
    } else {
        console.error(`Final '${choice}' não encontrado.`);
    }
}

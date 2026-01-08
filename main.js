class Personagem {
    constructor(nome, idade, raca, especialidade, reino, organizacao, vivo){
        this.nome = nome;
        this.idade = idade;
        this.raca = raca;
        this.especialidade = especialidade;
        this.reino = reino;
        this.organizacao = organizacao;
        this.vivo = vivo;
    }
}

const personagens = new Set()
personagens.add(new Personagem('Sudoki', 22, 'Humano', 'Arqueiro', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Jasper', 22, 'Humano', 'Mercenario', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Billat', 18, 'Humano', 'Investigador', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Sifor', 120, 'Humano', 'Investigador', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Astas', 240, 'Humano', 'Mago', 'Astas', 'não', true))
personagens.add(new Personagem('Fukushi', 234, 'Humano', 'Feiticeiro', 'Fukushi', 'não', true))
personagens.add(new Personagem('Samir', 200, 'Humano', 'Lutador', 'Samir', 'não', true))
personagens.add(new Personagem('Apoena', 300, 'Humano', 'Investigador', 'Apoena', 'não', true))
personagens.add(new Personagem('Dionne', 20, 'Humano', 'Mago', 'Fukushi', 'Jinsei no Unmei', false))
personagens.add(new Personagem('Maggye', 60, 'Humano', 'Mago', 'Samir', 'Jinsei no Unmei', false))
personagens.add(new Personagem('Freire', 25, 'Humano', 'Caçador', 'Astas', 'Jinsei no Unmei', false))
personagens.add(new Personagem('Mia', 15, 'Cachorro', 'Caçador', 'Astas', 'Jinsei no Unmei', null))
personagens.add(new Personagem('Kalleb', 24, 'Híbrido', 'Investigador', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Hooda', 24, 'Híbrido', 'Investigador', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('MAGICO', 95, 'Humano', 'Mago', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('LD3', 83, 'Humano', 'Lutador', 'Samir', 'Jinsei no Unmei', true))

personagens.add(new Personagem('Dinathy', 19, 'Híbrido', 'Investigador', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Killer', 19, 'Híbrido', 'Investigador', 'Astas', 'Jinsei no Unmei', true))
personagens.add(new Personagem('Wir', 60, 'Humano', 'mago', 'Apoena', 'Redemons', true))

sortearPersonagem()

function agendarMeiaNoite() {
    const agora = new Date();
    const amanha = new Date(agora);
    
    amanha.setDate(amanha.getDate() + 1);
    amanha.setHours(0, 0, 0, 0);

    const tempoAteMeiaNoite = amanha - agora;

    setTimeout(() => {
        sortearPersonagem();
        
        setInterval(sortearPersonagem, 24 * 60 * 60 * 1000);
    }, tempoAteMeiaNoite);
}

function sortearPersonagem() {
    if (personagens.size === 0) return console.log("Set vazio.");
    
    const selecionado = obterPersonagemDoDia()
    console.log("Personagem do Dia:", selecionado.nome);
    console.table(selecionado);
}

agendarMeiaNoite();

function obterPersonagemDoDia() {
    const itens = Array.from(personagens);
    const hoje = new Date();
    // Cria um número baseado no dia, mês e ano (ex: 20260108)
    const seed = hoje.getFullYear() * 10000 + (hoje.getMonth() + 1) * 100 + hoje.getDate();
    
    // Usa o resto da divisão para escolher o índice
    const indiceDessaData = seed % itens.length;
    return itens[indiceDessaData];
}
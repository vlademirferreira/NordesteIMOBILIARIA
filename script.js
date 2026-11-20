// =========================================================================
// GERENCIAMENTO DO CATÁLOGO DE IMÓVEIS (INCLUIR, EDITAR OU REMOVER AQUI)
// Substitua os exemplos abaixo pelos imóveis reais disponíveis na imobiliária.
// Para imagens locais, salve na pasta 'img/' e use: imagem: "img/nome-da-foto.jpg"
// =========================================================================
const imoveisCadastrados = [
    {
        id: 1,
        titulo: "Apartamento Alto Padrão Meireles",
        tipo: "Apartamento", // Opções: "Apartamento", "Casa", "Terreno"
        finalidade: "Venda", // Opções: "Venda", "Aluguel"
        localizacao: "Fortaleza", // Opções: "Fortaleza", "Eusébio", "Caucaia"
        bairro: "Meireles",
        quartos: 3,
        banheiros: 4,
        vagas: 2,
        valor: "R$ 1.250.000",
        imagem: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 2,
        titulo: "Casa Contemporânea em Condomínio",
        tipo: "Casa",
        finalidade: "Venda",
        localizacao: "Eusébio",
        bairro: "Lagoa Redonda / Eusébio",
        quartos: 4,
        banheiros: 5,
        vagas: 4,
        valor: "R$ 1.680.000",
        imagem: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 3,
        titulo: "Apartamento Moderno Aldeota",
        tipo: "Apartamento",
        finalidade: "Aluguel",
        localizacao: "Fortaleza",
        bairro: "Aldeota",
        quartos: 2,
        banheiros: 2,
        vagas: 1,
        valor: "R$ 3.800 / mês",
        imagem: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80"
    }
];

const WHATSAPP_NUMERO = "5585921918766";

// Elementos da página
const gridImoveis = document.getElementById("imoveis-grid");
const semResultados = document.getElementById("sem-resultados");
const filtroFinalidade = document.getElementById("filtro-finalidade");
const filtroTipo = document.getElementById("filtro-tipo");
const filtroLocal = document.getElementById("filtro-local");
const btnFiltrar = document.getElementById("btn-filtrar");
const btnLimparFiltros = document.getElementById("btn-limpar-filtros");

// Função para renderizar os cartões de imóveis
function renderizarImoveis(lista) {
    gridImoveis.innerHTML = "";

    if (lista.length === 0) {
        semResultados.style.display = "block";
        return;
    }

    semResultados.style.display = "none";

    lista.forEach(imovel => {
        // Cria mensagem personalizada para o WhatsApp da Nordeste Imobiliária D&F
        const mensagemWpp = `Olá! Tenho interesse no imóvel *${imovel.titulo}* (${imovel.finalidade} - ${imovel.localizacao}) anunciado no site da Nordeste Imobiliária D&F. Poderia me passar mais informações?`;
        const linkWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagemWpp)}`;

        // Tratamento para terrenos (caso quartos/vagas sejam 0)
        const specsHTML = imovel.tipo === "Terreno"
            ? `<div class="spec-item"><i class="ph ph-ruler"></i> Lote Disponível</div>`
            : `
                <div class="spec-item"><i class="ph ph-bed"></i> ${imovel.quartos} Quarto(s)</div>
                <div class="spec-item"><i class="ph ph-bathtub"></i> ${imovel.banheiros} Banheiro(s)</div>
                <div class="spec-item"><i class="ph ph-car"></i> ${imovel.vagas} Vaga(s)</div>
              `;

        const card = document.createElement("article");
        card.className = "imovel-card";
        card.innerHTML = `
            <div class="imovel-img-wrapper">
                <span class="tag-finalidade">${imovel.finalidade}</span>
                <span class="tag-tipo">${imovel.tipo}</span>
                <img src="${imovel.imagem}" alt="${imovel.titulo}" loading="lazy">
            </div>
            <div class="imovel-body">
                <div class="imovel-local">
                    <i class="ph ph-map-pin"></i> ${imovel.bairro} - ${imovel.localizacao}
                </div>
                <h3 class="imovel-title">${imovel.titulo}</h3>
                <div class="imovel-specs">
                    ${specsHTML}
                </div>
                <div class="imovel-footer">
                    <div class="imovel-preco">${imovel.valor}</div>
                    <a href="${linkWhatsApp}" target="_blank" class="btn btn-gold">
                        <i class="ph ph-whatsapp-logo"></i> Tenho Interesse
                    </a>
                </div>
            </div>
        `;
        gridImoveis.appendChild(card);
    });
}

// Função de filtragem
function filtrarImoveis() {
    const finalidade = filtroFinalidade.value;
    const tipo = filtroTipo.value;
    const local = filtroLocal.value;

    const filtrados = imoveisCadastrados.filter(imovel => {
        const matchFinalidade = finalidade === "todos" || imovel.finalidade === finalidade;
        const matchTipo = tipo === "todos" || imovel.tipo === tipo;
        const matchLocal = local === "todos" || imovel.localizacao === local;
        return matchFinalidade && matchTipo && matchLocal;
    });

    renderizarImoveis(filtrados);
}

// Eventos
btnFiltrar.addEventListener("click", () => {
    filtrarImoveis();
    document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
});

btnLimparFiltros.addEventListener("click", () => {
    filtroFinalidade.value = "todos";
    filtroTipo.value = "todos";
    filtroLocal.value = "todos";
    renderizarImoveis(imoveisCadastrados);
});

// Menu Mobile
const mobileToggle = document.getElementById("mobile-toggle");
const navMenu = document.getElementById("nav-menu");

mobileToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// Inicializa o catálogo ao carregar a página
renderizarImoveis(imoveisCadastrados);

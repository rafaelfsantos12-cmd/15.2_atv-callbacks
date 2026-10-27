console.log("O programa está funcionando!");

function processarTransacaoPix(chavePix, valor, callbackAcao) {
    console.log("\n--- PROCESSANDO PAGAMENTO PIX ---");
    if (valor <= 0) {
        console.log("Erro: o valor deve ser maior que zero!");
        return;
    }
    const transacao = {
        id: Math.floor(Math.random() * 100000),
        chavePix,
        valor,
        data: new Date().toLocaleTimeString()
    };
    console.log("Transação aprovada!");
    console.log("ID:", transacao.id);
    console.log("Valor: R$", transacao.valor);
    console.log("Data:", transacao.data);
    callbackAcao(transacao);
}

function emitirComprovantePorEmail(transacao) {
    console.log("\n--- COMPROVANTE POR E-MAIL ---");
    console.log("Pagamento confirmado com sucesso!");
    console.log("ID:", transacao.id);
    console.log("Valor: R$", transacao.valor.toFixed(2));
    console.log("Destinatário:", transacao.chavePix);
}

function creditarCashback(transacao) {
    const cashback = transacao.valor * 0.02;
    console.log("\n--- CASHBACK ---");
    console.log("Valor da compra: R$", transacao.valor.toFixed(2));
    console.log("Cashback de 2%: R$", cashback.toFixed(2));
    console.log("Cashback creditado com sucesso!");
}

function auditarTransacaoSuspeita(transacao) {
    console.log("\n--- AUDITORIA ANTIFRAUDE ---");
    if (transacao.valor > 5000) {
        console.log("ALERTA: BANDEIRA VERMELHA!");
        console.log("Transação enviada para análise antifraude.");
        console.log("ID:", transacao.id);
        console.log("Valor: R$", transacao.valor.toFixed(2));
    } else {
        console.log("Transação sem alerta pelo critério de valor.");
    }
}

function enviarWebhookAssincrono(transacao, callbackFinalizacao) {
    console.log("\n--- WEBHOOK ---");
    console.log("Notificação agendada às:", new Date().toLocaleTimeString());
    console.log("Aguardando resposta da loja externa...");
    setTimeout(function () {
        console.log("\nWebhook executado às:", new Date().toLocaleTimeString());
        console.log("ID da transação:", transacao.id);
        callbackFinalizacao(transacao);
    }, 2000);
}

console.log("\n===== TESTE 1 =====");
processarTransacaoPix(
    "cliente@email.com",
    150,
    emitirComprovantePorEmail
);

console.log("\n===== TESTE 2 =====");
processarTransacaoPix(
    "11999999999",
    250,
    creditarCashback
);

console.log("\n===== TESTE 3 =====");
processarTransacaoPix(
    "12345678900",
    6500,
    auditarTransacaoSuspeita
);

console.log("\n===== TESTE 4 =====");
processarTransacaoPix(
    "cliente@exemplo.com",
    100,
    (transacao) => {
        const desconto = 5;
        const valorFinal = transacao.valor - desconto;
        console.log("\n--- DESCONTO ---");
        console.log("Valor original: R$", transacao.valor.toFixed(2));
        console.log("Desconto: R$", desconto.toFixed(2));
        console.log("Valor final: R$", valorFinal.toFixed(2));
    }
);

console.log("\n===== TESTE 5 =====");
processarTransacaoPix(
    "cliente@email.com",
    0,
    emitirComprovantePorEmail
);

console.log("\n===== TESTE 6 =====");
const transacaoWebhook = {
    id: 12345,
    chavePix: "loja@exemplo.com",
    valor: 350,
    data: new Date().toLocaleTimeString()
};
enviarWebhookAssincrono(transacaoWebhook, (transacao) => {
    console.log("Callback de finalização executada!");
    console.log("Pagamento confirmado para a loja.");
    console.log("Transação:", transacao.id);
});
console.log("\nO programa continua enquanto o webhook aguarda...")
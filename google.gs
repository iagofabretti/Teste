function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Criar array com os dados na ordem correta (52 colunas)
    var row = [
      // Dados Gerais (A-F)
      data.timestamp || new Date().toLocaleString('pt-BR'),
      data.cliente || '',
      data.destino || '',
      data['data-viagem'] || '',
      data['data-retorno'] || '',
      data['observacoes-gerais'] || '',
      
      // Serviço Aéreo (G-P)
      data['cia-aerea'] || '',
      data['numero-voo-ida'] || '',
      data['horario-partida-ida'] || '',
      data['horario-chegada-ida'] || '',
      data['numero-voo-volta'] || '',
      data['horario-partida-volta'] || '',
      data['horario-chegada-volta'] || '',
      data['classe-voo'] || '',
      data['bagagem-despachada'] || '',
      data['observacoes-aereo'] || '',
      
      // Hospedagem (Q-X)
      data['nome-hotel'] || '',
      data['endereco-hotel'] || '',
      data['data-checkin'] || '',
      data['data-checkout'] || '',
      data['tipo-quarto'] || '',
      data['regime-alimentacao'] || '',
      data['transfer-hotel'] || '',
      data['observacoes-hospedagem'] || '',
      
      // Locação de Veículos (Y-AF)
      data['necessita-locacao'] || '',
      data['locadora'] || '',
      data['categoria-veiculo'] || '',
      data['data-retirada-veiculo'] || '',
      data['data-devolucao-veiculo'] || '',
      data['local-retirada'] || '',
      data['local-devolucao'] || '',
      data['observacoes-locacao'] || '',
      
      // Seguro Viagem (AG-AL)
      data['necessita-seguro'] || '',
      data['seguradora'] || '',
      data['tipo-cobertura'] || '',
      data['valor-cobertura'] || '',
      data['numero-apolice'] || '',
      data['observacoes-seguro'] || '',
      
      // Serviços Gerais (AM-AW)
      data['passeio-1'] || '',
      data['data-passeio-1'] || '',
      data['horario-passeio-1'] || '',
      data['passeio-2'] || '',
      data['data-passeio-2'] || '',
      data['horario-passeio-2'] || '',
      data['passeio-3'] || '',
      data['data-passeio-3'] || '',
      data['horario-passeio-3'] || '',
      data['transfer-adicional'] || '',
      data['observacoes-servicos-gerais'] || '',
      
      // Assinatura e Termos (AX-AZ)
      data.termos_aceitos || '',
      data.data_aceite_termos || '',
      data.assinatura_digital || ''
    ];
    
    // Adicionar linha na planilha
    sheet.appendRow(row);

    // 🚀 Chamar a função que converte a assinatura base64 em imagem e adiciona o link
    try {
      converterAssinaturasParaImagens();
    } catch (convErr) {
      Logger.log("Erro ao converter assinatura: " + convErr);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Dados salvos com sucesso'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}


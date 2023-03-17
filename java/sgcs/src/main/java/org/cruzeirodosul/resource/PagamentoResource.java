package org.cruzeirodosul.resource;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.cruzeirodosul.model.Pagamento;
import org.cruzeirodosul.service.PagamentoService;

public class PagamentoResource {

	@Inject
	PagamentoService pagamentoService;

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public Pagamento post(Pagamento pagamento) {
		return pagamentoService.efeturarPagamento(pagamento);
	}

}

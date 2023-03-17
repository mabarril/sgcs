package org.cruzeirodosul.service;

import javax.inject.Inject;

import org.cruzeirodosul.dao.PagamentoDao;
import org.cruzeirodosul.model.Pagamento;

public class PagamentoService {

	@Inject
	PagamentoDao pagamentoDao;

	public Pagamento efeturarPagamento(Pagamento pagamento) {
		try {
			System.out.println("oi");
			return pagamentoDao.efetuarPagamento(pagamento);

		} catch (Exception e) {
			System.out.println("xiiii");
			return null;
		}

	}

}

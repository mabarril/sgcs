package org.cruzeirodosul.dao;

import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceException;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.cruzeirodosul.model.Pagamento;

public class PagamentoDao {

	@Inject
	EntityManager em;

	public List<Pagamento> listaPagamento() {

		TypedQuery<Pagamento> query = em.createNamedQuery("LISTA_PAGAMENTO", Pagamento.class);

		try {
			return query.getResultList();
		} catch (NoResultException e) {
			return null;
		}

	}

	@Transactional
	public Pagamento efetuarPagamento(Pagamento pagamento) throws Exception {

		try {
			em.persist(pagamento);
		} catch (PersistenceException e) {
			System.out.println("deu merda");
			throw new PersistenceException(e.getMessage().toString());
		} catch (Exception e) {
			System.out.println("deu merda 2");
			throw new Exception(e.getMessage().toString());
		}

		return pagamento;

	}

}

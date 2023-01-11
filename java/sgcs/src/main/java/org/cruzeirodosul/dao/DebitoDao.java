package org.cruzeirodosul.dao;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;

import org.cruzeirodosul.model.Debito;

@RequestScoped
public class DebitoDao {

	private String BUSCAR_DEBITO_DE_UM_DESBRAVADOR = "SELECT * FROM DEBITOS WHERE IDCADASTRO=:IDCADASTRO";

	@Inject
	EntityManager em;

	public List<Debito> buscarDebitoDeUmDesbravador(Long idCadastro) {

		Query query = em.createQuery(BUSCAR_DEBITO_DE_UM_DESBRAVADOR, Debito.class);
		query.setParameter("ID_CADASTRO", idCadastro);

		try {
			return query.getResultList();
		} catch (NoResultException e) {
			return null;
		}

	}

}

package org.cruzeirodosul.dao;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.cruzeirodosul.model.Debito;
import org.cruzeirodosul.model.Desbravador;

@RequestScoped
public class DebitoDao {

	@Inject
	EntityManager em;

	public List<Debito> buscarDebitoDeUmDesbravador(Integer idCadastro) {
		
		TypedQuery<Debito> query = em.createNamedQuery("BUSCAR_DEBITO_DE_UM_DESBRAVADOR", Debito.class);

		query.setParameter("IDCADASTRO", idCadastro);

		try {
			return query.getResultList();
		} catch (NoResultException e) {
			return null;
		}

	}

}

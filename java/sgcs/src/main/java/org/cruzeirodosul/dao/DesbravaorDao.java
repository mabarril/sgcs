package org.cruzeirodosul.dao;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceException;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.cruzeirodosul.model.Desbravador;

@RequestScoped
public class DesbravaorDao {

	@Inject
	EntityManager em;

	public List<Desbravador> ListarDesbravadores() {

		TypedQuery<Desbravador> query = em.createNamedQuery("LISTAR_DESBRAVADOR", Desbravador.class);

		try {
			return query.getResultList();
		} catch (NoResultException e) {
			return null;
		}

	}

	public Desbravador buscarDesbravador(Integer id) {

		try {
			return em.find(Desbravador.class, id);
		} catch (NoResultException e) {
			return null;
		}

	}

	@Transactional
	public Desbravador inserirDesbravador(Desbravador desbravador) throws Exception {

		try {
			em.persist(desbravador);
		} catch (PersistenceException e) {
			System.out.println("deu merda");
			throw new PersistenceException(e.getMessage().toString());
		} catch (Exception e) {
			System.out.println("deu merda 2");
			throw new Exception(e.getMessage().toString());
		}

		return desbravador;

	}

}

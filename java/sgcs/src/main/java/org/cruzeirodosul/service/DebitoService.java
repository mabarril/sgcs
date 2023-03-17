package org.cruzeirodosul.service;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.cruzeirodosul.dao.DebitoDao;
import org.cruzeirodosul.model.Debito;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

@ApplicationScoped
public class DebitoService {

	@Inject
	DebitoDao debitoDao;

	public List<Debito> buscarDebitoDesbravador(@PathParam Integer idDesbravador) {
		return debitoDao.buscarDebitoDeUmDesbravador(idDesbravador);

	}

}

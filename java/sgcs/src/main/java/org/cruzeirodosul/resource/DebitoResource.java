package org.cruzeirodosul.resource;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.cruzeirodosul.model.Debito;
import org.cruzeirodosul.service.DebitoService;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

@Path("/debito")
public class DebitoResource {

	@Inject
	private DebitoService debitoService;

	@GET
	@Path("{idDesbravador}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Debito> buscarDebitoDesbravador(@PathParam Integer idDesbravador) {
		return debitoService.buscarDebitoDesbravador(idDesbravador);

	}

}

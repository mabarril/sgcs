package org.cruzeirodosul.resource;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.cruzeirodosul.dao.DesbravaorDao;
import org.cruzeirodosul.model.Desbravador;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

@Path("/desbravador")
public class DesbravadorResource {

	@Inject
	DesbravaorDao desbravadorDao;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Desbravador> listaTodosDesbravadores() {

		return desbravadorDao.ListarDesbravadores();

	}

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Desbravador buscaDesbravador(@PathParam Integer id) {
		return desbravadorDao.buscarDesbravador(id);

	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public Desbravador post(Desbravador desbravador) {

		try {
			System.out.println("oi");
			return desbravadorDao.inserirDesbravador(desbravador);
			
		} catch (Exception e) {
			System.out.println("xiiii");
			return null;	
		}

		
	}
}

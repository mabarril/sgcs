package org.cruzeirodosul.resource;

import java.math.BigInteger;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.cruzeirodosul.model.Desbravador;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

@Path("/cadastro")
public class CadastroResource {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Desbravador> listaTodosDesbravadores() {

		return Desbravador.listAll();

	}

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Desbravador buscaDesbravador(@PathParam BigInteger id) {
		return Desbravador.findById(id);

	}

}

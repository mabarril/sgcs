package org.cruzeirodosul.dao;

import java.math.BigInteger;
import java.util.List;

import javax.inject.Singleton;

import org.cruzeirodosul.model.Debito;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

@Singleton
public class DebitoDao implements PanacheRepository<Debito> {

	public List<Debito> findByIdCadastro(BigInteger idCadastro) {

		return find("idcadastro", idCadastro).list();

	}

}
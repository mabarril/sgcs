package org.cruzeirodosul.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedNativeQueries;
import javax.persistence.NamedNativeQuery;
import javax.persistence.Table;

@Entity
@Table(name = "desbravador")
@NamedNativeQueries({
		@NamedNativeQuery(name = "LISTAR_DESBRAVADOR", query = "select id, nome from desbravador", resultClass = Desbravador.class),
		@NamedNativeQuery(name = "BUSCAR_DESBRAVADOR_ID", query = "SELECT ID, NOME FROM desbravador WHERE ID=:ID", resultClass = Desbravador.class) })
public class Desbravador {

	@Id
	private Integer id;
	@Column(name = "nome")
	private String nome;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	@Override
	public String toString() {
		return "Desbravador{ id = " + id + ", nome = " + nome + "}";
	}

}

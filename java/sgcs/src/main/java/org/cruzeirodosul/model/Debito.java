package org.cruzeirodosul.model;

import java.math.BigDecimal;
import java.sql.Date;

import javax.json.bind.annotation.JsonbDateFormat;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedNativeQueries;
import javax.persistence.NamedNativeQuery;
import javax.persistence.Table;

@Entity
@Table(name = "debitos")
@NamedNativeQueries({
		@NamedNativeQuery(name = "BUSCAR_DEBITO_DE_UM_DESBRAVADOR", query = "SELECT id, idcadastro, idmatricula, descdebito, valordebito, idtipdebito, idpgto, vctodebito FROM debitos WHERE idcadastro =:IDCADASTRO", resultClass = Debito.class), })
public class Debito {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "idcadastro")
	private Integer idcadastro;
	@Column(name = "idmatricula")
	private Integer idmatricula;
	@Column(name = "descdebito")
	private String descdebito;
	@Column(name = "valordebito")
	private BigDecimal valordebito;
	@Column(name = "idtipdebito")
	private Integer idtipdebito;
	@Column(name = "vctodebito")
	@JsonbDateFormat("yyyy-MM-dd")
	private Date vctodebito;
	@Column(name = "idpgto")
	private Integer idpgto;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getIdcadastro() {
		return idcadastro;
	}

	public void setIdcadastro(Integer idcadastro) {
		this.idcadastro = idcadastro;
	}

	public Integer getIdmatricula() {
		return idmatricula;
	}

	public void setIdmatricula(Integer idmatricula) {
		this.idmatricula = idmatricula;
	}

	public String getDescdebito() {
		return descdebito;
	}

	public void setDescdebito(String descdebito) {
		this.descdebito = descdebito;
	}

	public BigDecimal getValordebito() {
		return valordebito;
	}

	public void setValordebito(BigDecimal valordebito) {
		this.valordebito = valordebito;
	}

	public Integer getIdtipdebito() {
		return idtipdebito;
	}

	public void setIdtipdebito(Integer idtipdebito) {
		this.idtipdebito = idtipdebito;
	}

	public Date getVctodebito() {
		return vctodebito;
	}

	public void setVctodebito(Date vctodebito) {
		this.vctodebito = vctodebito;
	}

	public Integer getIdpgto() {
		return idpgto;
	}

	public void setIdpgto(Integer idpgto) {
		this.idpgto = idpgto;
	}

}

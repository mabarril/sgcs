package org.cruzeirodosul.model;

import java.sql.Date;

import javax.json.bind.annotation.JsonbDateFormat;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "debitos")
public class Debito {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "idcadastro")
	private Long idcadastro;
	@Column(name = "idmatricula")
	private Long idmatricula;
	@Column(name = "descdebito")
	private String descdebito;
	@Column(name = "valordebito")
	private float valordebito;
	@Column(name = "idtipdebito")
	private Integer idtipdebito;
	@Column(name = "vctodebito")
	@JsonbDateFormat("yyyy-MM-dd")
	private Date vctodebito;
	@Column(name = "idpgto")
	private Long idpgto;

	public Long getId() {
		return id;
	}

	public void setIddebito(Long id) {
		this.id = id;
	}

	public Long getIdcadastro() {
		return idcadastro;
	}

	public void setIdcadastro(Long idcadastro) {
		this.idcadastro = idcadastro;
	}

	public Long getIdmatricula() {
		return idmatricula;
	}

	public void setIdmatricula(Long idmatricula) {
		this.idmatricula = idmatricula;
	}

	public String getDescdebito() {
		return descdebito;
	}

	public void setDescdebito(String descdebito) {
		this.descdebito = descdebito;
	}

	public float getValordebito() {
		return valordebito;
	}

	public void setValordebito(float valordebito) {
		this.valordebito = valordebito;
	}

	public int getIdtipdebito() {
		return idtipdebito;
	}

	public void setIdtipdebito(int idtipdebito) {
		this.idtipdebito = idtipdebito;
	}

	public Date getVctodebito() {
		return vctodebito;
	}

	public void setVctodebito(Date vctodebito) {
		this.vctodebito = vctodebito;
	}

	public Long getIdpgto() {
		return idpgto;
	}

	public void setIdpgto(Long idpgto) {
		this.idpgto = idpgto;
	}

}

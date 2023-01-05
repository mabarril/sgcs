package org.cruzeirodosul.model;

import java.math.BigInteger;
import java.sql.Date;

import javax.json.bind.annotation.JsonbDateFormat;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table(name = "debitos")
public class Debito extends PanacheEntityBase {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long iddebito;
	private BigInteger idcadastro;
	private Long idmatricula;
	private String descdebito;
	private float valordebito;
	private int idtipdebito;
	@JsonbDateFormat("yyyy-MM-dd")
	private Date vctodebito;
	private Long idpgto;

	
	
	public Long getIddebito() {
		return iddebito;
	}



	public void setIddebito(Long iddebito) {
		this.iddebito = iddebito;
	}



	public BigInteger getIdcadastro() {
		return idcadastro;
	}



	public void setIdcadastro(BigInteger idcadastro) {
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

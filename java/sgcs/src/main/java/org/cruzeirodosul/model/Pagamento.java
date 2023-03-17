package org.cruzeirodosul.model;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedNativeQueries;
import javax.persistence.NamedNativeQuery;
import javax.persistence.Table;

@Entity
@Table(name = "pagamento")
@NamedNativeQueries({
		@NamedNativeQuery(name = "LISTA_PAGAMENTO", query = "SELECT id, dtpagamento, valorpagamento, resppagamento, tipopagamento FROM pagamento", resultClass = Pagamento.class), })
public class Pagamento {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "dtpagamento")
	private Date dtPagamento;

	@Column(name = "valorpagamento")
	private BigDecimal valorPagamento;

	@Column(name = "resppagamento")
	private String respPagamento;

	@Column(name = "tipopagamento")
	private Integer tipoPagamento;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getDtPagamento() {
		return dtPagamento;
	}

	public void setDtPagamento(Date dtPagamento) {
		this.dtPagamento = dtPagamento;
	}

	public BigDecimal getValorPagamento() {
		return valorPagamento;
	}

	public void setValorPagamento(BigDecimal valorPagamento) {
		this.valorPagamento = valorPagamento;
	}

	public String getRespPagamento() {
		return respPagamento;
	}

	public void setRespPagamento(String respPagamento) {
		this.respPagamento = respPagamento;
	}

	public Integer getTipoPagamento() {
		return tipoPagamento;
	}

	public void setTipoPagamento(Integer tipoPagamento) {
		this.tipoPagamento = tipoPagamento;
	}

}

package action;

import models.CompanyDAO;

public class DatasourceAction {
	private String datasource;
	private int companyId;
	
	public int getCompanyId() {
		return companyId;
	}

	public void setCompanyId(int companyId) {
		this.companyId = companyId;
	}

	public String getDatasource() {
		return datasource;
	}

	public void setDatasource(String datasource) {
		this.datasource = datasource;
	}	

	public String execute() {  
		CompanyDAO.setDatasource(datasource, companyId);
		return "success";
	}
}

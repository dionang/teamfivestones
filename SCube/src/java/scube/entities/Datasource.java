/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package scube.entities;

/**
 *
 * @author HongYuan
 */
public class Datasource {
    private int datasourceId;
    private int companyId;
    private String datasourceUrl;

    public Datasource(int datasourceId, int companyId, String datasourceUrl) {
        this.datasourceId = datasourceId;
        this.companyId = companyId;
        this.datasourceUrl = datasourceUrl;
    }

    public int getDatasourceId() {
        return datasourceId;
    }

    public void setDatasourceId(int datasourceId) {
        this.datasourceId = datasourceId;
    }

    public int getCompanyId() {
        return companyId;
    }

    public void setCompanyId(int companyId) {
        this.companyId = companyId;
    }

    public String getDatasourceUrl() {
        return datasourceUrl;
    }

    public void setDatasourceUrl(String datasourceUrl) {
        this.datasourceUrl = datasourceUrl;
    }
}

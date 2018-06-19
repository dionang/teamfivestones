/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package scube.entities;

import scube.dao.CompanyDAO;

/**
 *
 * @author Dion
 */
public class Developer extends Account {
    public Developer(int accountId, int companyId, String accountType, String username, String name) {
        super(accountId, companyId, accountType, username, name);
    }
    
    public boolean setDatasource(String datasourceUrl) {
        boolean status = CompanyDAO.setDatasource(datasourceUrl, getCompanyId());
        return status;
    }
}

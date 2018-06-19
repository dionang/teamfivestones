/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package scube.entities;

import scube.dao.AccountDAO;

/**
 *
 * @author Dion
 */
public class CompanyAccount extends Account {
    private String datasourceURL;
    public CompanyAccount(int accountId, int companyId, String accountType, String username, String name) {
        super(accountId, companyId, accountType, username, name);
    }
    
    public boolean createDevAccount(String username, String password, String name){
        boolean status = AccountDAO.addAccount(username, password, getCompanyId(), "developer", name);
        return status;
    }
    
    public boolean createManagerAccount(String username, String password, String name){
        boolean status = AccountDAO.addAccount(username, password, getCompanyId(), "manager", name);
        return status;
    }
    
    public boolean createUserAccount(String username, String password, String name){
        boolean status = AccountDAO.addAccount(username, password, getCompanyId(), "user", name);
        return status;
    }
}

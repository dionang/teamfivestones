/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package scube.entities;

import java.util.ArrayList;
import scube.dao.AccountDAO;

/**
 *
 * @author Dion
 */
public class Manager extends Account {
    public Manager(int accountId, int companyId, String accountType, String username, String name) {
        super(accountId, companyId, accountType, username, name);
    }
    
    public boolean createManagerAccount(String username, String password, String name){
        boolean status = AccountDAO.addAccount(username, password, getCompanyId(), "manager", name);
        return status;
    }
    
    public boolean createUserAccount(String username, String password, String name){
        boolean status = AccountDAO.addAccount(username, password, getCompanyId(), "user", name);
        return status;
    }
    
    public ArrayList<Account> getAllUsers(int companyId){
        return AccountDAO.getAccountsByCompanyId(companyId);
    }
    
    
    // will change later
    public String createReport() {
        return "create report";
    }
    
    // will change later
    public String generateReport() {
        return "generate report";
    }
}

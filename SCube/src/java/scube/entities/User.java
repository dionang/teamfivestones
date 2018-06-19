/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package scube.entities;

/**
 *
 * @author Dion
 */
public class User extends Account{
    public User(int accountId, int companyId, String accountType, String username, String name) {
        super(accountId, companyId, accountType, username, name);
    }
    
    // will change later
    public String generateReport() {
        return "generate report";
    }
}

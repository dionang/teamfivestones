package models;

import java.sql.*;
import entities.Account;

public class AccountDAO {
	public static Account login(String username, String enteredPassword) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * FROM account WHERE username = ?");
            stmt.setString(1, username);
            rs = stmt.executeQuery();
            
            if(rs.next()){
            	int accountId = rs.getInt("accountId");
            	int companyId = rs.getInt("companyId");
            	String accountType = rs.getString("accountType");
            	String name = rs.getString("name");
            	String pwHash = rs.getString("passwordHash");
                
            	if(pwHash.equals(enteredPassword)) {
            		return new Account(accountId, companyId, accountType, name);
            	} else {
            		return null;
            	}
            } else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
}

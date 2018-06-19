package scube.dao;

import java.sql.*;
import org.mindrot.jbcrypt.BCrypt;
import scube.entities.*;

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
                String passwordHash = rs.getString("passwordHash");

                if(BCrypt.checkpw(enteredPassword, passwordHash)) {
                    switch(accountType){
                        case "admin":       return new Account(accountId, companyId, accountType, username, name);
                        case "company":     return new CompanyAccount(accountId, companyId, accountType, username, name);  
                        case "developer":   return new Developer(accountId, companyId, accountType, username, name);  
                        case "manager":     return new Manager(accountId, companyId, accountType, username, name);  
                        case "user":        return new User(accountId, companyId, accountType, username, name);  
                    }
                    return new Account(accountId, companyId, accountType, username, name);
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static boolean addAccount(String username, String password, int companyId,
            String accountType, String name) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        String passwordHash = BCrypt.hashpw(password, BCrypt.gensalt());

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO account VALUES (?,?,?,?,?,?)");
            stmt.setNull(1, Types.INTEGER);
            stmt.setString(2, username);
            stmt.setString(3, passwordHash);
            stmt.setInt(4, companyId);
            stmt.setString(5, accountType);
            stmt.setString(6, name);
            
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
}

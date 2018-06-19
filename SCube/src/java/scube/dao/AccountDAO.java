package scube.dao;

import java.sql.*;
import org.mindrot.jbcrypt.BCrypt;
import scube.entities.Account;

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
                System.out.println(enteredPassword);
                System.out.println(passwordHash);
                System.out.println(passwordHash.length());

                if(BCrypt.checkpw(enteredPassword, passwordHash)) {
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

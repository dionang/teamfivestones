package scube.dao;

import java.sql.*;
import java.util.ArrayList;
import org.mindrot.jbcrypt.BCrypt;
import scube.entities.*;

public class AccountDAO {
    //Create operations
    public static boolean addAccount(String username, String password, int companyId,
            String accountType, String name) {
        // username already exists
        if(getAccountByUsername(username) != null){
            return false;
        }
        
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
    
    // Read operations
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
                        case "company"  :   return new CompanyAccount(accountId, companyId, accountType, username, name);  
                        case "developer":   return new Developer(accountId, companyId, accountType, username, name);  
                        case "manager"  :   return new Manager(accountId, companyId, accountType, username, name);  
                        case "user"     :   return new User(accountId, companyId, accountType, username, name);  
                        default         :   return new Account(accountId, companyId, accountType, username, name);
                    }
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
        
    public static ArrayList<Account> getAllUsersOfCompany(int companyId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * from account WHERE companyId = ?");
            stmt.setInt(1, companyId);
            rs = stmt.executeQuery();
            
            ArrayList<Account> accounts = new ArrayList<>();
            while(rs.next()){
                Account acc = new Account(rs.getInt("accountId"), rs.getInt("companyId"),
                        rs.getString("accountType"), rs.getString("username"), rs.getString("name"));
                accounts.add(acc);
            }
            return accounts;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static Account getAccountById(int accountId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * FROM account WHERE accountId = ?");
            stmt.setInt(1, accountId);
            rs = stmt.executeQuery();

            if(rs.next()){
                int companyId = rs.getInt("companyId");
                String accountType = rs.getString("accountType");
                String username = rs.getString("username");
                String name = rs.getString("name");
                return new Account(accountId, companyId, accountType, username, name);
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
    
    public static Account getAccountByUsername(String username) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * FROM account WHERE username = ?");
            stmt.setString(1, username);
            rs = stmt.executeQuery();

            if(rs.next()){
                int companyId = rs.getInt("companyId");
                String accountType = rs.getString("accountType");
                int accountId = rs.getInt("accountId");
                String name = rs.getString("name");
                return new Account(accountId, companyId, accountType, username, name);
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
    
    // Update operations
    public static boolean changePassword(int accountId, String newPassword) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            String passwordHash = BCrypt.hashpw(newPassword, BCrypt.gensalt());
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("UPDATE account SET passwordHash = ? WHERE accountId = ?");
            stmt.setString(1, passwordHash);            
            stmt.setInt(2, accountId);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    // Delete operations
    public static boolean deleteAccount(int accountId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE FROM account WHERE accountId = ?");
            stmt.setInt(1, accountId);
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

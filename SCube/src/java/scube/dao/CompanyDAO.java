package scube.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.mindrot.jbcrypt.BCrypt;

public class CompanyDAO {
    // Create operations
    public static int addCompany(String companyName, String accessToken) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        String tokenHash = BCrypt.hashpw(accessToken, BCrypt.gensalt());
        
        try {
            int nextId = getNextId();
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO company VALUES (?,?,?)");
            stmt.setInt(1, nextId);
            stmt.setString(2, companyName);
            stmt.setString(3, tokenHash);
            stmt.executeUpdate();
            return nextId;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return 0;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    // Read operations
    public static boolean validateAccessToken(String accessToken, int companyId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT accessToken FROM template t, company c WHERE t.companyId = c.companyId and templateId = ?");
            stmt.setInt(1, companyId);
            rs = stmt.executeQuery();
            if(rs.next()){
                return BCrypt.checkpw(accessToken, rs.getString("accessToken"));
            }
            return false;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static int getNextId(){
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT max(companyId)+1 as next from company");
            rs = stmt.executeQuery();
            if(rs.next()){
                return rs.getInt("next");
            }
            return 0;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return 0;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static String getCompanyNameFromId(int companyId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT companyName from company WHERE companyId = ?");
            stmt.setInt(1, companyId);
            rs = stmt.executeQuery();
            if(rs.next()){
                return rs.getString("companyName");
            }
            return "";
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return "";
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static boolean setAccessToken(String accessToken, int companyId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("UPDATE company SET accessToken = ? WHERE companyId = ?");
            stmt.setString(1, accessToken);
            stmt.setInt(2, companyId);
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

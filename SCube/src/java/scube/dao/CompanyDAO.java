package scube.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;

public class CompanyDAO {
    // Create operations
    public static boolean addCompany(String companyName, String address, String phoneNo, String fax, 
            String logoUrl, Integer pocId, String datasourceUrl, String accessToken) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO company VALUES (?,?,?,?,?,?,?,?,?)");
            stmt.setNull(1, Types.INTEGER);
            stmt.setString(2, companyName);
            stmt.setString(3, address);
            stmt.setString(4, phoneNo);
            stmt.setString(5, fax);
            stmt.setString(6, logoUrl);
            stmt.setInt(7, pocId);
            stmt.setString(8, datasourceUrl);
            stmt.setString(9, accessToken);
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
                return accessToken.equals(rs.getString("accessToken"));
            }
            return false;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
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
    
    // Update operations
    public static boolean setFax(String fax, int companyId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("UPDATE company SET fax = ? WHERE companyId = ?");
            stmt.setString(1, fax);
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
    
    public static boolean setLogoUrl(String logoUrl, int companyId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("UPDATE company SET logoUrl = ? WHERE companyId = ?");
            stmt.setString(1, logoUrl);
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
    
    public static boolean setPoc(int pocId, int companyId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("UPDATE company SET pocId = ? WHERE companyId = ?");
            stmt.setInt(1, pocId);
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
    
    public static boolean setDatasource(String datasourceUrl, int companyId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("UPDATE company SET datasourceUrl = ? WHERE companyId = ?");
            stmt.setString(1, datasourceUrl);
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

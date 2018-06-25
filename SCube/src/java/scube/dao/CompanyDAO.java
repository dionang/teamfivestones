package scube.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class CompanyDAO {
    // Read operations
    public static String getCompanyNameFromId(int companyId){
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT companyName from company WHERE companyId = ?");
            stmt.setInt(1, companyId);
            rs = stmt.executeQuery();
            if(rs.next()){
                String companyName = rs.getString("companyName");
                return companyName;
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
    
    
}

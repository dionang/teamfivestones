package models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class CompanyDAO {
	public static void setDatasource(String datasourceUrl, int companyId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("UPDATE company SET datasourceUrl = ? WHERE companyId = ?");
            stmt.setString(1, datasourceUrl);
            stmt.setInt(2, companyId);
            stmt.executeUpdate();
    
        } catch (SQLException e) {
            
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
}

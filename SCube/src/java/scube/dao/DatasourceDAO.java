package scube.dao;

import java.sql.*;
import java.util.ArrayList;
import scube.entities.*;

public class DatasourceDAO {
    
    //Add a datasource (URL) into the 'datasource' table
    public static boolean addDatasource(int companyId, String datasourceUrl) {       
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO datasource VALUES (?,?,?)");
            
            //datasourceId will auto increment at every call
            stmt.setNull(1, Types.INTEGER);
            
            stmt.setInt(2, companyId);
            stmt.setString(3, datasourceUrl);       
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    } 
    
    //retrieve all datasources (URL) from datasource table for API call
    public static ArrayList<Datasource> getAllDatasources(int companyId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * from datasource WHERE companyId = ?");
            stmt.setInt(1, companyId);
            rs = stmt.executeQuery();
            
            ArrayList<Datasource> datasourceList = new ArrayList<>();
            while(rs.next()){
                Datasource ds = new Datasource(rs.getInt("datasourceId"), rs.getInt("companyId"),
                        rs.getString("datasourceUrl"));
                datasourceList.add(ds);
            }
            return datasourceList;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    } 
}

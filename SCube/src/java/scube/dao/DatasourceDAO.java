package scube.dao;
import scube.entities.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;


public class DatasourceDAO {
    
    //Add a datasource (URL) into the 'datasource' table
    public static boolean addDatasource(int companyId, String datasourceUrl,String datasourceName,String remark) {       
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO datasource VALUES (?,?,?,?,?)");
            stmt.setNull(1, Types.INTEGER);
            stmt.setInt(2, companyId);
            stmt.setString(3, datasourceUrl);
            stmt.setString(4, datasourceName);
            stmt.setString(5, remark);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    } 
    public static boolean addDataset(String datasetName,String path,String type,int datasourceId) {       
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO dataset VALUES (?,?,?,?,?)");
            stmt.setNull(1, Types.INTEGER);
            stmt.setString(2, datasetName);
            stmt.setString(3, path);
            stmt.setString(4, type);
            stmt.setInt(5, datasourceId);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    } 
    public static boolean addListOption(int datasetId, String fieldName,String type,String infoType) {       
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO listoption VALUES (?,?,?,?)");
            stmt.setInt(1, datasetId);
            stmt.setString(2, fieldName);
            stmt.setString(3, type);
            stmt.setString(4, infoType);
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
                        rs.getString("datasourceUrl"),rs.getString("datasourceName"),rs.getString("remark"));
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
       //retrieve all datasources (URL) from datasource table for API call
    public static int getLatestDatasoureId() {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        int id=0;
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT datasourceId FROM datasource ORDER BY datasourceId DESC LIMIT 1;");
            
            rs = stmt.executeQuery();
            
            while(rs.next()){
                id=rs.getInt("datasourceId");
            }
            return id;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return 0;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    public static ArrayList<Dataset> getAllDatasetByDatasourece(int datasoureceId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * from dataset WHERE datasoureceId = ?");
            stmt.setInt(1, datasoureceId);
            rs = stmt.executeQuery();
            
            ArrayList<Dataset> datasetList = new ArrayList<>();
            while(rs.next()){
                Dataset ds = new Dataset(rs.getInt("datasetId"), rs.getString("datasetName"),
                        rs.getString("path"),rs.getString("type"),rs.getInt("datasoureId"));
                datasetList.add(ds);
            }
            return datasetList;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    public static ArrayList<List> getAllListOptionByDataset(int datasetId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * from listoption WHERE datasetId = ?");
            stmt.setInt(1, datasetId);
            rs = stmt.executeQuery();
            
            ArrayList<List> list = new ArrayList<>();
            while(rs.next()){
                List l = new List(rs.getInt("datasetId"), 
                        rs.getString("path"),rs.getString("type"),rs.getString("infoType"));
                list.add(l);
            }
            return list;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static Datasource retrieveDatasourceById(int datasourceId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * from datasource WHERE datasourceId = ?");
            stmt.setInt(1, datasourceId);
            rs = stmt.executeQuery();
            
            if(rs.next()){
                Datasource datasource = new Datasource(rs.getInt("datasourceId"), rs.getInt("companyId"), rs.getString("datasourceUrl"), 
                        rs.getString("datasourceName"), rs.getString("remark"));
                
                return datasource;
            }
            return null;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return null;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    
    public static boolean updateDatasource(int datasourceId,int companyId, String datasourceUrl,String datasourceName,String remark) {       
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("UPDATE datasource SET datasourceUrl=?, datasourceName=?,remark=? where datasourceId=? and companyId=?");
            stmt.setString(1, datasourceUrl);
            stmt.setString(2, datasourceName);
            stmt.setString(3, remark);
            stmt.setInt(4, datasourceId);
            stmt.setInt(5, companyId);
            
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    } 
    
    public static boolean deleteDatasource(int datasourceId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
          try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE FROM datasource WHERE datasourceId = ?");
            stmt.setInt(1, datasourceId);
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

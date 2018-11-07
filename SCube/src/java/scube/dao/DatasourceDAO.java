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
    public static boolean addListOption(String fNValue,String fieldName,String type,String infoType,int datasetId) {       
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO listoption VALUES (?,?,?,?,?,?)");
            stmt.setNull(1, Types.INTEGER);
            stmt.setString(2, fNValue);
            stmt.setString(3, fieldName);
            stmt.setString(4, type);
            stmt.setString(5, infoType);
            stmt.setInt(6, datasetId);
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
    public static ArrayList<Datasource> getDatasourcesByName(int companyId,String datasourceName) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * from datasource WHERE companyId = ? and datasourceName=?");
            stmt.setInt(1, companyId);
            stmt.setString(2, datasourceName);
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
    public static int getLatestDatasourceId() {
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
     public static int getLatestDatasetId() {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        int id=0;
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT datasetId FROM dataset ORDER BY datasetId DESC LIMIT 1;");
            
            rs = stmt.executeQuery();
            
            while(rs.next()){
                id=rs.getInt("datasetId");
            }
            return id;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return 0;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
    public static ArrayList<Dataset> getAllDatasetByDatasource(int datasoureceId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * from dataset WHERE datasourceId = ? order by datasetId asc");
            stmt.setInt(1, datasoureceId);
            rs = stmt.executeQuery();
            
            ArrayList<Dataset> datasetList = new ArrayList<>();
            while(rs.next()){
                Dataset ds = new Dataset(rs.getInt("datasetId"), rs.getString("datasetName"),
                        rs.getString("path"),rs.getString("type"),rs.getInt("datasourceId"));
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
    public static ArrayList<Dataset> getListTypeDataset(int datasoureceId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT * from dataset WHERE datasourceId = ? and type='list' order by datasetId asc");
            stmt.setInt(1, datasoureceId);
            rs = stmt.executeQuery();
            
            ArrayList<Dataset> datasetList = new ArrayList<>();
            while(rs.next()){
                Dataset ds = new Dataset(rs.getInt("datasetId"), rs.getString("datasetName"),
                        rs.getString("path"),rs.getString("type"),rs.getInt("datasourceId"));
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
                List l = new List(rs.getInt("listId"), rs.getString("fNValue"),
                        rs.getString("fieldName"),rs.getString("type"),rs.getString("infoType"),rs.getInt("datasetId"));
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
    
    public static String retrievePath(int datasetId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("SELECT path from dataset WHERE datasetId = ?");
            stmt.setInt(1, datasetId);
            rs = stmt.executeQuery();
            
            if(rs.next()){
                return rs.getString("path");
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
    public static boolean updateDataset(int datasetId,String datasetName, String path,String type,int datasourceId) {       
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("UPDATE dataset SET datasetName=?, path=?,type=? where datasetId=? and datasourceId=?");
            
            stmt.setString(1, datasetName);
            stmt.setString(2, path);
            stmt.setString(3, type);
            stmt.setInt(4, datasetId);
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
     public static boolean updateList(int listId,String fNValue,String fieldName, String type,String infoType,int datasetId) {       
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("UPDATE listoption SET fNValue=?,fieldName=?, type=?,infoType=? where listId=? and datasetId=?");
            stmt.setString(1, fNValue);
            stmt.setString(2, fieldName);
            stmt.setString(3, type);
            stmt.setString(4, infoType);
            stmt.setInt(5, listId);
            stmt.setInt(6, datasetId);
            
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
    public static boolean deleteDataset(int datasetId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
          try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE FROM dataset WHERE datasetId = ?");
            stmt.setInt(1, datasetId);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

    }
     public static boolean deleteDatasetByDatasourece(int datasourceId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
          try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE FROM dataset WHERE datasourceId = ?");
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
    
     public static boolean deleteListOption(int datasetId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
          try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE FROM listoption WHERE datasetId = ?");
            stmt.setInt(1, datasetId);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace(System.out);
            return false;
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

    }
      public static boolean deleteListOptionById(int listId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
          try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE FROM listoption WHERE listId = ?");
            stmt.setInt(1, listId);
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
